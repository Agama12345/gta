// Test integracyjny całej gry (bez WebGL): nowa gra, ruch, dialog, walka, handel,
// rzemiosło, zapis/wczytanie, śmierć i interakcje ze światem.

import { JSDOM } from 'jsdom';

const dom = new JSDOM(
  `<!doctype html><html><body>
    <div id="loading"><div class="loading-sub"></div></div>
    <div id="ui"></div>
    <canvas id="scene" width="1280" height="720"></canvas>
  </body></html>`,
  { pretendToBeVisual: true, url: 'http://localhost/' }
);

const store = {};
const localStorageStub = {
  getItem: (k) => (k in store ? store[k] : null),
  setItem: (k, v) => { store[k] = String(v); },
  removeItem: (k) => { delete store[k]; },
};

global.window = dom.window;
global.document = dom.window.document;
Object.defineProperty(global, 'navigator', { value: dom.window.navigator, configurable: true });
global.HTMLElement = dom.window.HTMLElement;
global.HTMLCanvasElement = dom.window.HTMLCanvasElement;
global.localStorage = localStorageStub;
Object.defineProperty(dom.window, 'localStorage', { value: localStorageStub, configurable: true });
global.performance = global.performance ?? { now: () => Date.now() };
global.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 16);
Object.defineProperty(dom.window, 'innerWidth', { value: 1280, configurable: true });
Object.defineProperty(dom.window, 'innerHeight', { value: 720, configurable: true });
global.innerWidth = 1280;
global.innerHeight = 720;

const noop = () => {};
const ctxStub = () =>
  new Proxy(
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
dom.window.HTMLCanvasElement.prototype.getContext = function () {
  return ctxStub();
};

const { Game } = await import('../src/game.js');
const { heightAt } = await import('../src/world/terrain.js');
const { NPCS } = await import('../src/data/dialogue.js');
const { ITEMS } = await import('../src/data/items.js');

let failures = 0;
const check = (name, cond, extra = '') => {
  if (cond) console.log(`  ✔ ${name}`);
  else {
    failures += 1;
    console.error(`  ✘ ${name} ${extra}`);
  }
};

const fakeRenderer = {
  shadowMap: {},
  domElement: document.getElementById('scene'),
  setPixelRatio: noop,
  setSize: noop,
  render: noop,
  outputColorSpace: null,
  toneMapping: null,
  toneMappingExposure: 1,
};

console.log('▸ start gry');
const canvas = document.getElementById('scene');
const game = new Game(canvas, { renderer: fakeRenderer });
check('stan początkowy: title', game.state === 'title');
check('świat zbudowany', !!game.world?.group);
check('NPC w wiosce', game.npcs.length >= 7);
game.ui._ensureMap();
check('mapa wygenerowana', !!game.ui.mapCanvas);

game.startNew();
check('nowa gra wystartowała', game.state === 'playing');
check('starter: miecz', !!game.player.inventory.equipped.weapon);
check('starter: zbroja', !!game.player.inventory.equipped.armor);
check('starter: mikstury', game.player.inventory.count('health_potion') >= 3);
check('HUD widoczny', game.ui.hud.style.display !== 'none');

console.log('▸ pętla i ruch');
const p = game.player;
const startPos = p.pos.clone();
game.input.keys.add('KeyW');
for (let i = 0; i < 120; i++) {
  game.updateGame(1 / 60);
  game.ui.update(1 / 60);
}
game.input.keys.delete('KeyW');
check('gracz się poruszył', p.pos.distanceTo(startPos) > 3, `(${p.pos.distanceTo(startPos).toFixed(2)})`);
check('brak NaN w pozycji', Number.isFinite(p.pos.x) && Number.isFinite(p.pos.z));
check('gra wciąż działa', game.state === 'playing');

console.log('▸ interakcja ze światem');
const ore = game.world.interactables.find((n) => n.id === 'quarry_ore_0');
p.pos.set(ore.pos.x + 0.5, heightAt(ore.pos.x, ore.pos.z), ore.pos.z);
game.updateGame(1 / 60);
const oreBefore = p.inventory.count('iron_ore');
game.interact();
check('wydobyto rudę', p.inventory.count('iron_ore') > oreBefore);
check('węzeł na cooldownie', !ore.available);
const chest = game.world.interactables.find((n) => n.id === 'bandit_chest');
p.pos.set(chest.pos.x + 1, heightAt(chest.pos.x, chest.pos.z), chest.pos.z);
game.updateGame(1 / 60);
const goldBefore = p.inventory.gold;
game.interact();
check('skrzynia daje złoto', p.inventory.gold > goldBefore);
check('skrzynia daje zboże', p.inventory.has('stolen_grain'));

console.log('▸ dialog i zadania');
const eryn = game.npcs.find((n) => n.id === 'eryn');
p.pos.set(eryn.pos.x + 1, heightAt(eryn.pos.x, eryn.pos.z), eryn.pos.z);
game.updateGame(1 / 60);
game.interact();
check('dialog z Eryn otwarty', game.ui.dialogueOpen);
check('gra wstrzymana na dialogu', game.state === 'ui');
game.dialogue.handleAction('accept:wolves');
check('zadanie przyjęte', game.quests.active === 'wolves');
const introBtn = document.getElementById('qi-btn');
introBtn?.click();
check('po intro gra wraca', game.state === 'playing' || game.ui.anyPanelOpen());

for (const wolf of game.enemies.list.filter((e) => e.type === 'wolf').slice(0, 5)) {
  wolf.takeDamage(999, { crit: false });
}
game.quests.onTalk('eryn');
check('zadanie wilków gotowe', game.quests.canComplete('wolves'), JSON.stringify(game.quests.progress.wolves));
const goldAfterQuest = p.inventory.gold;
game.dialogue.start('eryn');
game.dialogue.handleAction('complete:wolves');
check('nagroda za wilki', p.inventory.gold > goldAfterQuest);
check('nowe zadanie dostępne', game.quests.availableQuest()?.id === 'grain');
document.getElementById('qi-btn')?.click();
game.resumeFromUi();

console.log('▸ walka');
const bandit = game.enemies.list.find((e) => e.type === 'bandit');
p.pos.set(bandit.pos.x + 2, heightAt(bandit.pos.x + 2, bandit.pos.z), bandit.pos.z);
bandit.pos.set(p.pos.x + 2, heightAt(p.pos.x + 2, p.pos.z), p.pos.z);
bandit.home.copy(bandit.pos);
bandit.aggro = true;
p.hp = p.maxHP;
const php = p.hp;
for (let i = 0; i < 300; i++) {
  game.updateGame(1 / 60);
  p.invuln = 0;
}
check('bandyta rani gracza', p.hp < php, `(${php} → ${Math.round(p.hp)})`);
// po walce wracamy do pełni sił (test nie ma sprawdzać śmierci w tym miejscu)
if (p.dead) game.respawnPlayer();
p.hp = p.maxHP;
p.stamina = p.maxStamina;
p.invuln = 0;
for (let i = 0; i < 5; i++) game.updateGame(1 / 60);
game.player.state = 'idle';
game.player.dodge();
check('unik działa', p.state === 'dodge');
for (let i = 0; i < 40; i++) game.updateGame(1 / 60);

console.log('▸ zaklęcia');
p.level = 5;
p.recalc();
p.hp = p.maxHP - 100;
p.mana = p.maxMana;
const hpBeforeHeal = p.hp;
p.castSpell(2);
check('Blask Świtu leczy', p.hp > hpBeforeHeal);
check('mana zużyta', p.mana < p.maxMana);
p.castSpell(0);
check('Znak Świtu działa', p.cooldowns.dawn > 0);

console.log('▸ handel, rzemiosło, odpoczynek');
p.inventory.gold = 500;
const potionsBefore = p.inventory.count('health_potion');
game.buyItem('zorzan', 'health_potion');
check('zakup mikstury', p.inventory.count('health_potion') === potionsBefore + 1);
check('złoto zeszło', p.inventory.gold < 500);
p.inventory.add('wolf_pelt', 2);
p.inventory.add('iron_ore', 2);
const ironBefore = p.inventory.count('iron_ore');
game.craftItem('wolf_blade', 'village');
check('wykuto Wilcze Ostrze', p.inventory.has('wolf_blade'));
check('materiały zużyte', p.inventory.count('iron_ore') === ironBefore - 2);
game.craftItem('dawn_blade', 'village');
check('Klinga Świtu wymaga starożytnej kuźni', !p.inventory.has('dawn_blade'));
p.inventory.add('ancient_metal', 2);
p.inventory.add('shard_dawn', 3);
p.inventory.add('iron_ore', 2);
game.craftItem('dawn_blade', 'ancient_forge');
check('Klinga Świtu wykuta', p.inventory.has('dawn_blade'));

p.hp = 20;
game.restAtCampfire();
check('odpoczynek leczy', p.hp === p.maxHP);
check('odpoczynek przesuwa czas', game.dayNight.hour > 5 && game.dayNight.hour < 8);

console.log('▸ zapis i wczytanie');
game.saveGame();
check('zapis istnieje', !!localStorage.getItem('ostrze-switu-save'));
const levelBefore = p.level;
const questsBefore = [...game.quests.completed];
game.player.pos.set(10, 2, 10);
game.loadGame();
check('wczytanie przywraca poziom', game.player.level === levelBefore);
check('wczytanie przywraca zadania', game.quests.completed.size === questsBefore.length);
check('wczytanie ustawia stan gry', game.state === 'playing');

console.log('▸ śmierć i odrodzenie');
const goldAtDeath = game.player.inventory.gold;
game.player.takeDamage(99999);
check('stan śmierci', game.state === 'dead');
check('ekran śmierci widoczny', !game.ui.deathScreen.classList.contains('hidden'));
check('kara złotem', game.player.inventory.gold < goldAtDeath);
game.respawnPlayer();
check('odrodzenie w wiosce', game.state === 'playing' && game.player.hp > 0);

console.log('▸ noc i boss');
game.dayNight.setHour(23);
game._updateLighting?.();
for (let i = 0; i < 5; i++) game.updateGame(1 / 60);
const wraith = game.enemies.list.find((e) => e.type === 'wraith');
check('wieszczka aktywna nocą', wraith.active);
game.dayNight.setHour(9);
game.updateGame(1 / 60);
game.enemies.update(1 / 60);
for (let i = 0; i < 3; i++) game.updateGame(1 / 60);
check('wieszczka znika dniem', !wraith.active);
const boss = game.enemies.list.find((e) => e.def.boss);
check('boss na mapie', !!boss && boss.maxHP > 500);
boss.pos.set(game.player.pos.x + 3, game.player.pos.y, game.player.pos.z);
boss.aggro = true;
for (let i = 0; i < 60; i++) {
  boss.update(1 / 60);
  game.ui.update(1 / 60);
}
check('boss walczy bez błędów', true);

console.log('');
if (failures > 0) {
  console.error(`✘ ${failures} test(ów) nie przeszło.`);
  process.exit(1);
}
console.log('✔ Test integracyjny zakończony sukcesem.');
