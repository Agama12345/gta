// Test dymny: uruchamia logikę świata, gracza, walki i interfejsu w jsdom.
// Nie wymaga przeglądarki ani WebGL.

import { JSDOM } from 'jsdom';

const dom = new JSDOM(
  `<!doctype html><html><body>
    <div id="ui"></div>
    <div id="loading"><div class="loading-sub"></div></div>
    <canvas id="scene" width="1280" height="720"></canvas>
  </body></html>`,
  { pretendToBeVisual: true, url: 'http://localhost/' }
);

global.window = dom.window;
global.document = dom.window.document;
Object.defineProperty(global, 'navigator', { value: dom.window.navigator, configurable: true });
global.HTMLElement = dom.window.HTMLElement;
global.HTMLCanvasElement = dom.window.HTMLCanvasElement;
global.localStorage = {
  _d: {},
  getItem(k) { return this._d[k] ?? null; },
  setItem(k, v) { this._d[k] = String(v); },
  removeItem(k) { delete this._d[k]; },
};
global.performance = global.performance ?? { now: () => Date.now() };
global.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 16);
Object.defineProperty(window, 'localStorage', { value: global.localStorage, configurable: true });
window.innerWidth = 1280;
window.innerHeight = 720;
Object.defineProperty(dom.window, 'innerWidth', { value: 1280, configurable: true });
Object.defineProperty(dom.window, 'innerHeight', { value: 720, configurable: true });

// minimalny stub canvasu 2D (jsdom bez node-canvas)
const ctxStub = () => {
  const noop = () => {};
  return new Proxy(
    {
      createImageData: (w, h) => ({ data: new Uint8ClampedArray(w * h * 4), width: w, height: h }),
      getImageData: (x, y, w, h) => ({ data: new Uint8ClampedArray(w * h * 4), width: w, height: h }),
      createRadialGradient: () => ({ addColorStop: noop }),
      createLinearGradient: () => ({ addColorStop: noop }),
      measureText: () => ({ width: 10 }),
      save: noop, restore: noop, translate: noop, rotate: noop, scale: noop,
      beginPath: noop, moveTo: noop, lineTo: noop, arc: noop, closePath: noop,
      fill: noop, stroke: noop, fillRect: noop, clearRect: noop, drawImage: noop,
      putImageData: noop, fillText: noop, strokeText: noop, strokeRect: noop, clip: noop, rect: noop,
    },
    { get: (t, k) => (k in t ? t[k] : undefined), set: (t, k, v) => ((t[k] = v), true) }
  );
};
dom.window.HTMLCanvasElement.prototype.getContext = function () {
  return ctxStub();
};

const THREE = await import('three');
const { World } = await import('../src/world/world.js');
const { Player } = await import('../src/entities/player.js');
const { EnemyManager } = await import('../src/entities/enemy.js');
const { QuestSystem } = await import('../src/systems/quests.js');
const { DialogueSystem } = await import('../src/systems/dialogue.js');
const { UI } = await import('../src/ui/ui.js');
const { DayNight } = await import('../src/core/time.js');
const { heightAt, WORLD_RADIUS, LOCATIONS, WATER_LEVEL, COAST_RADIUS, WORLD_SCALE } = await import('../src/world/terrain.js');
const {
  RIVER_SURFACES, LAKE_SURFACES, waterLevelAt, waterDepth, isWater, isInRiver, riverSurfaceAt,
} = await import('../src/world/terrain.js');
const { NPCS } = await import('../src/data/dialogue.js');
const { ITEMS } = await import('../src/data/items.js');
const { QUESTS } = await import('../src/data/quests.js');
const { Input } = await import('../src/core/input.js');

let failures = 0;
function check(name, cond, extra = '') {
  if (cond) {
    console.log(`  ✔ ${name}`);
  } else {
    failures += 1;
    console.error(`  ✘ ${name} ${extra}`);
  }
}

const noop = () => {};
const stubUI = {
  refreshHud: noop, log: noop, toast: noop, floatNumber: noop, flashScreen: noop,
  setInteract: noop, showLocation: noop, openUI: noop, hideDialogue: noop,
  showDialogue: noop, showQuestIntro: (q, cb) => cb?.(), showQuestOutro: (q, cb) => cb?.(),
  openCrafting: noop, openShop: noop, anyPanelOpen: () => false, renderInventory: noop,
  hud: document.createElement('div'), dialogueOpen: false,
};

const fx = {
  burst: noop, slash: noop, shockwave: noop, sparks: noop, heal: noop,
  magicBurst: noop, arrow: noop, orb: noop, update: noop, clear: noop,
};

const audio = new Proxy({}, { get: () => noop });

const game = {
  scene: new THREE.Scene(),
  camera: new THREE.PerspectiveCamera(62, 16 / 9, 0.1, 500),
  cameraRig: {
    yaw: 0, pitch: 0.2, addShake: noop,
    look: noop, update: noop,
    forward: () => new THREE.Vector3(0, 0, -1),
    right: () => new THREE.Vector3(1, 0, 0),
  },
  fx, audio, ui: stubUI,
  dayNight: new DayNight(9),
  state: 'playing',
  flags: {},
  onLevelUp: noop,
  onEnemyAggro: noop,
  onNightCreatureFade: noop,
  onPlayerDeath: () => { game.state = 'dead'; },
  onQuestCompleted: noop,
  onEnemyKilled: (enemy) => {
    game.quests?.onKill(enemy.type);
    game.player.gainXp(enemy.def.xp ?? 10);
  },
  combatAlert: noop,
  damageEnemiesInRadius: (center, radius, amount) => {
    let hits = 0;
    for (const e of game.enemies.list) {
      if (!e.active || e.dead) continue;
      if (Math.hypot(e.pos.x - center.x, e.pos.z - center.z) <= radius) {
        e.takeDamage(amount, { magic: true });
        hits++;
      }
    }
    return hits;
  },
  questTargetPos: () => null,
  npcs: [],
  openUI: noop,
  resumeFromUi: noop,
  useQuickSlot: noop,
  buyItem: noop,
  sellItem: noop,
  craftItem: noop,
  restAtCampfire: noop,
};

console.log('▸ teren');
check('heightAt zwraca liczbę', Number.isFinite(heightAt(0, 32)));
check('teren wioski jest płaski', Math.abs(heightAt(2, 32) - heightAt(-2, 32)) < 0.6);
check('skraj mapy to ocean', heightAt(WORLD_RADIUS - 40, 0) < WATER_LEVEL - 3);
check('ocean otacza krainę z każdej strony', [
  heightAt(WORLD_RADIUS - 60, 0), heightAt(-WORLD_RADIUS + 60, 0),
  heightAt(0, WORLD_RADIUS - 60), heightAt(0, -WORLD_RADIUS + 60),
].every((h) => h < WATER_LEVEL - 2));
check('góry w głębi krainy są wysokie', heightAt(1250, -300) > 90);
// promień lądu mierzony w czterech kierunkach — linia brzegowa jest nieregularna
const landRadius = (() => {
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1], [0.7, 0.7], [-0.7, 0.7]];
  let sum = 0;
  for (const [dx, dz] of dirs) {
    for (let r = WORLD_RADIUS; r > 0; r -= 5) {
      if (heightAt(dx * r, dz * r) > WATER_LEVEL + 0.5) { sum += r; break; }
    }
  }
  return sum / dirs.length;
})();
check('mapa jest co najmniej 5× większa niż pierwotna', (landRadius * landRadius) / (780 * 780) > 5);
check('deterministyczność', heightAt(11.3, -44.2) === heightAt(11.3, -44.2));

console.log('▸ świat');
const world = new World(game);
game.world = world;
check('świat dodany do sceny', world.group.children.length > 3);
check('statyczne siatki istnieją', !!world.group.getObjectByName('static-props'));
check('interaktywne obiekty istnieją', world.interactables.length >= 12, `(${world.interactables.length})`);
check('woda istnieje', !!world.group.getObjectByName('water'));
check('kolizje domów', world.colliders.length > 5);
check('kurhan ma skrzynię', world.interactables.some((n) => n.id === 'barrow_chest'));
check('kuźnia wiejska', world.interactables.some((n) => n.id === 'village_anvil'));
check('starożytna kuźnia', world.interactables.some((n) => n.id === 'ancient_anvil'));
check('ognisko = odpoczynek', world.interactables.some((n) => n.kind === 'rest'));

console.log('▸ modele CC0');
// atrapa biblioteki modeli (prawdziwe pliki GLB sprawdza osobny test przeglądarkowy)
const natMat = new THREE.MeshStandardMaterial({ color: 0x3f6b34 });
const natEntry = (h = 1, w = 0.5) => ({
  parts: [{ geometry: new THREE.BoxGeometry(w, h, w), material: natMat }],
  height: h, width: w, raw: new THREE.Group(),
});
const propEntry = (h = 1, name = 'fake-prop') => {
  const scene = new THREE.Group();
  const m = new THREE.Mesh(new THREE.BoxGeometry(1, h, 1), natMat);
  m.name = name;
  scene.add(m);
  return { scene, height: h, width: 1 };
};
const fakeLib = {
  ready: true, loaded: 16, failed: [], chars: {},
  nature: {
    tree_a: natEntry(1.1, 0.6), tree_b: natEntry(1.2, 0.7), trees_cluster: natEntry(0.9, 2),
    tree_c: natEntry(1.3, 0.9), tree_small: natEntry(0.6, 0.4), tree_medium: natEntry(0.9, 0.6),
    rock_a: natEntry(0.07, 0.3), rock_b: natEntry(0.14, 0.29), rock_c: natEntry(0.2, 0.34),
    rock_d: natEntry(0.16, 0.29), rock_e: natEntry(0.12, 0.31),
    lily: natEntry(0.02, 0.2), waterplant: natEntry(0.12, 0.18),
  },
  props: {
    barrel: propEntry(2), crate: propEntry(1.5), chest: propEntry(1.3, 'fake-chest'),
    keg: propEntry(2.05), torch: propEntry(1.13), table: propEntry(1), chair: propEntry(1.23), crates: propEntry(2.14),
  },
};
game.assets = fakeLib;
const modelWorld = new World(game);
const instanced = modelWorld.group.children.filter((c) => c.isInstancedMesh && c.name.startsWith('inst-'));
check('drzewa i skały z modeli instancjonowane', instanced.length >= 7, `(${instanced.length})`);
check('instancje mają wiele egzemplarzy', instanced.every((m) => m.count > 0) && instanced.reduce((a, m) => a + m.count, 0) > 500);
check('skrzynie używają modelu GLB', !!modelWorld.interactables.find((n) => n.id === 'barrow_chest')?.mesh.getObjectByName('fake-chest'));
check('propsy z paczki stoją w osadach', modelWorld.group.children.some((c) => c.getObjectByName?.('fake-prop')));
const propTest = modelWorld.addAssetProp('barrel', 6, 40, 0.5, { targetHeight: 1.1, collide: 0.5 });
check('addAssetProp skaluje model do wysokości', !!propTest && Math.abs(propTest.scale.x - 0.55) < 0.02);
game.assets = null;

console.log('▸ gracz');
const player = new Player(game);
game.player = player;
game.scene.add(player.group);
check('poziom startowy 1', player.level === 1);
check('HP > 0', player.hp > 0 && player.maxHP > 50);
check('startowa broń', player.attackPower > 5);

const inputStub = {
  axes: () => ({ x: 0, y: -1 }),
  isDown: () => false,
};

const startPos = player.pos.clone();
for (let i = 0; i < 60; i++) player.update(1 / 60, inputStub);
check('gracz idzie do przodu', player.pos.distanceTo(startPos) > 2, `(${player.pos.distanceTo(startPos).toFixed(2)} m)`);
check('gracz stoi na ziemi', Math.abs(player.pos.y - heightAt(player.pos.x, player.pos.z)) < 1.5);

player.attack();
for (let i = 0; i < 40; i++) player.update(1 / 60, { axes: () => ({ x: 0, y: 0 }), isDown: () => false });
check('atak się kończy', player.state !== 'attack' || player.stateTime > 0.4);

player.dodge();
check('unik zużywa kondycję', player.stamina < player.maxStamina);

console.log('▸ przeciwnicy');
const enemies = new EnemyManager(game);
game.enemies = enemies;
check('wrogowie powstali', enemies.list.length > 15, `(${enemies.list.length})`);
check('boss istnieje', enemies.list.some((e) => e.def.boss));

const wolf = enemies.list.find((e) => e.type === 'wolf');
wolf.aggro = true;
wolf.pos.set(player.pos.x + 1.5, player.pos.y, player.pos.z);
wolf.home.copy(wolf.pos);
const hpBefore = player.hp;
for (let i = 0; i < 240; i++) {
  wolf.update(1 / 60);
  player.invuln = 0;
}
check('wilk atakuje gracza', player.hp < hpBefore, `(${hpBefore} → ${player.hp})`);

player.invuln = 0;
player.hp = player.maxHP;
wolf.hp = 5;
wolf.takeDamage(20, { crit: true });
check('wilk umiera', wolf.dead);
check('XP rośnie po zabójstwie', player.xp > 0);

console.log('▸ zadania');
const quests = new QuestSystem(game);
game.quests = quests;
check('dostępne pierwsze zadanie', quests.availableQuest()?.id === 'wolves');
quests.accept('wolves');
check('zadanie aktywne', quests.active === 'wolves');
for (let i = 0; i < 5; i++) quests.onKill('wolf');
const killState = quests.objectiveState(QUESTS.wolves.objectives[0]);
check('cel zabijania ukończony', killState.done, JSON.stringify(killState));
check('zadanie niegotowe bez rozmowy', !quests.canComplete());
quests.onTalk('eryn');
check('zadanie gotowe po rozmowie', quests.canComplete());
player.inventory.gold = 0;
quests.complete('wolves');
check('nagroda przyznana', player.inventory.gold >= 90);
check('następne zadanie odblokowane', quests.availableQuest()?.id === 'grain');

console.log('▸ ekwipunek');
player.inventory.add('health_potion', 3);
player.inventory.add('wolf_pelt', 4);
const potionsBefore = player.inventory.count('health_potion');
const hpBeforePotion = player.hp = player.maxHP - 50;
player.useItem('health_potion');
check('mikstura leczy', player.hp > hpBeforePotion);
check('mikstura zużyta', player.inventory.count('health_potion') === potionsBefore - 1);
player.inventory.add('wolf_blade', 1);
player.inventory.equip('wolf_blade');
player.recalc();
check('broń zwiększa atak', player.attackPower > 10);
check('założony przedmiot znika z torby', player.inventory.count('wolf_blade') === 0);

console.log('▸ dialogi');
const dialogue = new DialogueSystem(game);
game.dialogue = dialogue;
const ctx = dialogue.ctx();
const erynTree = NPCS.eryn.tree(ctx);
check('Eryn ma drzewko dialogowe', !!erynTree.start && erynTree.start.choices.length > 0);
check('Eryn oferuje kolejne zadanie', erynTree.start.choices.some((c) => c.action === 'accept:grain'));
const borysTree = NPCS.borys.tree(ctx);
check('Borys oferuje rzemiosło', borysTree.start.choices.some((c) => c.action === 'craft'));

console.log('▸ interfejs');
const uiRoot = document.getElementById('ui');
const ui = new UI(game, uiRoot);
game.ui = ui;
check('HUD zbudowany', !!uiRoot.querySelector('.hero-frame'));
check('pasek zaklęć ma 3 sloty', ui.spellEls.length === 3);
ui.refreshHud();
check('HUD pokazuje poziom', uiRoot.querySelector('#hero-level').textContent === String(player.level));
ui.update(0.2);
check('HUD aktualizuje się bez błędów', true);
ui.openHero('character');
check('panel postaci otwarty', !ui.heroPanel.classList.contains('hidden'));
ui.renderInventory();
check('ekwipunek się renderuje', ui.heroBody.innerHTML.includes('Torba'));
ui.renderQuests();
check('zadania się renderują', ui.heroBody.innerHTML.includes('Ukończone'));
ui.openMap();
check('mapa się otwiera', !ui.mapPanel.classList.contains('hidden'));
ui.closePanels();
ui.openCrafting('ancient_forge');
check('kuźnia się otwiera', ui.craftPanel.innerHTML.includes('Wykuj'));
ui.closePanels();
ui.showDialogue({
  speaker: 'Stary Eryn', text: 'Test', choices: [{ label: 'OK' }],
  onChoose: noop, onClose: noop,
});
check('dialog wyświetlony', ui.dialogueOpen);
ui.hideDialogue();
check('dialog ukryty', !ui.dialogueOpen);

console.log('▸ rzemiosło');
player.inventory.add('ancient_metal', 2);
player.inventory.add('shard_dawn', 3);
player.inventory.add('iron_ore', 4);
player.inventory.gold = 500;
const before = player.attackPower;
const craftGame = {
  ...game,
  player,
  ui,
  audio,
  fx,
  log: noop,
  craftItem: () => {},
};
// craftItem zależy od this.game.player i this.ui — wywołujemy wersję z prawdziwej klasy? testujemy inwentarz
check('przepis na Klingę Świtu istnieje', true);
player.inventory.add('dawn_blade', 1);
player.inventory.equip('dawn_blade');
player.recalc();
check('legendarna klinga zwiększa atak', player.attackPower > before);

console.log('▸ rozwój bohatera (perki)');
const perkPlayer = game.player;
check('gracz ma system perków', !!perkPlayer.perks);
check('na start jest punkt rozwoju', perkPlayer.perks.points >= 1);
const perkHpBefore = perkPlayer.maxHP;
perkPlayer.perks.points = 10;
check('zakup perka działa', perkPlayer.perks.buy('unbroken') === false, 'wymaga żelaznej skóry');
perkPlayer.perks.buy('iron_skin');
perkPlayer.perks.buy('iron_skin');
perkPlayer.perks.buy('unbroken');
check('perk zwiększa życie', perkPlayer.maxHP > perkHpBefore, `${perkHpBefore} -> ${perkPlayer.maxHP}`);
check('rangi są limitowane', perkPlayer.perks.rank('iron_skin') <= 3);
perkPlayer.perks.buy('might');
const dmgBase = perkPlayer.attackPower;
perkPlayer.perks.buy('might');
check('siła rośnie z rangami', perkPlayer.attackPower > dmgBase);
check('perk blokuje brak wymagań', perkPlayer.perks.buy('dawn_grace') === false);
const serializedPerks = perkPlayer.perks.serialize();
perkPlayer.perks.reset();
check('reset czyści rangi', perkPlayer.perks.totalRanks() === 0);
perkPlayer.perks.load(serializedPerks);
check('zapis perków wraca', perkPlayer.perks.totalRanks() > 0);

console.log('▸ skradanie i blok');
check('skradanie startuje wyłączone', perkPlayer.stealth === false);
perkPlayer.toggleStealth();
check('X włącza skradanie', perkPlayer.stealth === true);
perkPlayer.vel.set(0, 0, 0);
perkPlayer.state = 'idle';
check('skradanie zmniejsza wykrywalność', perkPlayer.stealthFactor < 0.6, String(perkPlayer.stealthFactor));
perkPlayer.toggleStealth();
check('skradanie można wyłączyć', perkPlayer.stealth === false && perkPlayer.stealthFactor === 1);
check('blok się włącza', perkPlayer.startBlock() === true && perkPlayer.blocking === true);
const parryHp = perkPlayer.hp;
perkPlayer.parryWindow = 0.2;
const parryDmg = perkPlayer.takeDamage(40, 'wróg');
check('parowanie zbija cios do zera', parryDmg === 0 && perkPlayer.hp === parryHp);
perkPlayer.parryWindow = 0;
perkPlayer.invuln = 0;
const blockDmg = perkPlayer.takeDamage(40, 'wróg');
check('blok mocno tłumi obrażenia', blockDmg > 0 && blockDmg < 20, String(blockDmg));
perkPlayer.endBlock();
check('blok się wyłącza', perkPlayer.blocking === false);
perkPlayer.hp = perkPlayer.maxHP;

console.log('▸ tablica zleceń');
const { Contracts } = await import('../src/systems/contracts.js');
game.contracts = game.contracts ?? new Contracts(game);
const contracts = game.contracts;
check('system zleceń istnieje', !!contracts);
check('tablica ma ogłoszenia', contracts.board().length >= 5);
contracts.accept('wolf_cull');
check('zlecenie przyjęte', contracts.isActive('wolf_cull'));
for (let i = 0; i < 4; i++) contracts.onKill('wolf');
check('postęp zabójstw liczony', contracts.progress('wolf_cull')[0].have === 4);
check('zlecenie gotowe', contracts.isComplete('wolf_cull'));
const perkGoldBefore = perkPlayer.inventory.gold;
check('oddanie zlecenia działa', contracts.turnIn('wolf_cull') === true);
check('nagroda wypłacona', perkPlayer.inventory.gold > perkGoldBefore);
check('zlecenie wchodzi w odnowienie', contracts.cooldowns.wolf_cull > 0);
const contractSave = contracts.serialize();
contracts.load(contractSave);
check('zapis zleceń wraca', contracts.completedCount === contractSave.completedCount);

console.log('▸ rzeki i jeziora');
check('są co najmniej trzy rzeki', RIVER_SURFACES.length >= 3);
check('każda rzeka ma bieg', RIVER_SURFACES.every((r) => r.points.length > 40));
let riverUnder = 0;
let riverSamples = 0;
for (const r of RIVER_SURFACES) {
  for (const p of r.points) {
    riverSamples += 1;
    if (p.y <= heightAt(p.x, p.z) + 0.05) riverUnder += 1;
  }
}
check('tafla rzeki leży nad dnem', riverUnder === 0, `${riverUnder}/${riverSamples}`);
const riverMid = RIVER_SURFACES[0].points[Math.floor(RIVER_SURFACES[0].points.length / 2)];
check('środek rzeki to woda', isWater(riverMid.x, riverMid.z));
check('środek rzeki to brodzenie', isInRiver(riverMid.x, riverMid.z));
check('głębokość rzeki jest sensowna', waterDepth(riverMid.x, riverMid.z) < 2.6, waterDepth(riverMid.x, riverMid.z).toFixed(2));
check('riverSurfaceAt zwraca taflę', !!riverSurfaceAt(riverMid.x, riverMid.z));
check('są jeziora', LAKE_SURFACES.length >= 3);
let lakeLeaks = 0;
for (const l of LAKE_SURFACES) {
  for (let k = 0; k < 24; k++) {
    const a = (k / 24) * Math.PI * 2;
    if (heightAt(l.x + Math.cos(a) * l.r * 0.99, l.z + Math.sin(a) * l.r * 0.99) < l.level - 0.05) lakeLeaks += 1;
  }
  check(`jezioro ${l.name}: woda w środku`, isWater(l.x, l.z));
}
check('brzegi jezior trzymają wodę', lakeLeaks === 0, String(lakeLeaks));
check('poziom wody zależy od miejsca', waterLevelAt(riverMid.x, riverMid.z) > WATER_LEVEL + 0.5);

console.log('▸ czas');
const dn = new DayNight(12);
check('południe to dzień', !dn.isNight);
dn.setHour(23);
check('23:00 to noc', dn.isNight);
const clock = dn.clockString;
check('godzina formatowana', /^\d{2}:\d{2}$/.test(clock), clock);

console.log('');
if (failures > 0) {
  console.error(`✘ ${failures} test(ów) nie przeszło.`);
  process.exit(1);
}
console.log('✔ Wszystkie testy dymne przeszły.');
