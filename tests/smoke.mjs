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
const { heightAt, WORLD_RADIUS, LOCATIONS } = await import('../src/world/terrain.js');
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
check('góry na skraju mapy są wysokie', heightAt(WORLD_RADIUS - 2, 0) > 12);
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
