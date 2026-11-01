// Test fabuły: przejście całego wątku od pierwszego zadania do pokonania Kaldrasa.

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
const ls = {
  getItem: (k) => (k in store ? store[k] : null),
  setItem: (k, v) => { store[k] = String(v); },
  removeItem: (k) => { delete store[k]; },
};
global.window = dom.window;
global.document = dom.window.document;
Object.defineProperty(global, 'navigator', { value: dom.window.navigator, configurable: true });
global.HTMLElement = dom.window.HTMLElement;
global.HTMLCanvasElement = dom.window.HTMLCanvasElement;
global.localStorage = ls;
Object.defineProperty(dom.window, 'localStorage', { value: ls, configurable: true });
Object.defineProperty(dom.window, 'innerWidth', { value: 1280, configurable: true });
Object.defineProperty(dom.window, 'innerHeight', { value: 720, configurable: true });
global.innerWidth = 1280;
global.innerHeight = 720;
const noop = () => {};
const ctxStub = () => new Proxy({
  createImageData: (w, h) => ({ data: new Uint8ClampedArray(w * h * 4) }),
  createRadialGradient: () => ({ addColorStop: noop }),
  createLinearGradient: () => ({ addColorStop: noop }),
  measureText: () => ({ width: 10 }),
}, { get: (t, k) => t[k] ?? noop, set: (t, k, v) => ((t[k] = v), true) });
dom.window.HTMLCanvasElement.prototype.getContext = () => ctxStub();

const { Game } = await import('../src/game.js');
const { heightAt } = await import('../src/world/terrain.js');

let failures = 0;
const check = (name, cond, extra = '') => {
  if (cond) console.log(`  ✔ ${name}`);
  else {
    failures += 1;
    console.error(`  ✘ ${name} ${extra}`);
  }
};
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const game = new Game(document.getElementById('scene'), {
  renderer: { shadowMap: {}, setPixelRatio: noop, setSize: noop, render: noop },
});
game.startNew();
const p = game.player;
const eryn = game.npcs.find((n) => n.id === 'eryn');
const step = (n = 1) => {
  for (let i = 0; i < n; i++) game.updateGame(1 / 60);
};
const teleport = (x, z) => {
  p.pos.set(x, heightAt(x, z), z);
  game.cameraRig.initialized = false;
  step(1);
};
const killType = (type, count = 99) => {
  const targets = game.enemies.list.filter((e) => e.active && !e.dead && e.type === type);
  for (const e of targets.slice(0, count)) e.takeDamage(99999, { knockback: 0 });
};
const talkToEryn = () => {
  teleport(eryn.pos.x + 1, eryn.pos.z);
  game.interact();
};

console.log('▸ zadanie 1: wilki');
talkToEryn();
game.dialogue.handleAction('accept:wolves');
document.getElementById('qi-btn')?.click();
check('zadanie wilków aktywne', game.quests.active === 'wolves');
check('gra wróciła do rozgrywki', game.state === 'playing', game.state);
killType('wolf', 5);
check('pięć wilków pokonanych', game.quests.objectiveState(game.quests.activeQuest.objectives[0]).done);
check('jeszcze nie można oddać', !game.quests.canComplete());
talkToEryn();
check('Eryn proponuje oddanie zadania', game.ui.dialogueOpen);
game.dialogue.handleAction('complete:wolves');
check('zadanie 1 ukończone', game.quests.completed.has('wolves'));
document.getElementById('qi-btn')?.click();
game.resumeFromUi();

console.log('▸ zadanie 2: zboże i Rudy Wilk');
talkToEryn();
game.dialogue.handleAction('accept:grain');
document.getElementById('qi-btn')?.click();
const chest = game.world.interactables.find((n) => n.id === 'bandit_chest');
teleport(chest.pos.x + 1, chest.pos.z);
game.interact();
check('worek zboża zdobyty', p.inventory.has('stolen_grain'));
killType('bandit_leader', 1);
check('Rudy Wilk pokonany', game.quests.objectiveState(game.quests.activeQuest.objectives[1]).done);
talkToEryn();
game.dialogue.handleAction('complete:grain');
check('zadanie 2 ukończone', game.quests.completed.has('grain'));
document.getElementById('qi-btn')?.click();
game.resumeFromUi();

console.log('▸ zadanie 3: kurhan');
talkToEryn();
game.dialogue.handleAction('accept:barrow');
document.getElementById('qi-btn')?.click();
game.dayNight.setHour(23);
step(3);
const wraith = game.enemies.list.find((e) => e.type === 'wraith');
check('wieszczka pojawiła się nocą', wraith.active && !wraith.dead);
wraith.takeDamage(99999, { knockback: 0 });
check('wieszczka pokonana', game.quests.objectiveState(game.quests.activeQuest.objectives[0]).done);
check('okruch zdobyty', p.inventory.has('shard_dawn'));
talkToEryn();
game.dialogue.handleAction('complete:barrow');
check('zadanie 3 ukończone', game.quests.completed.has('barrow'));
document.getElementById('qi-btn')?.click();
game.resumeFromUi();

console.log('▸ zadanie 4: Klinga Świtu');
talkToEryn();
game.dialogue.handleAction('accept:forge');
document.getElementById('qi-btn')?.click();
check('zadanie kowalskie aktywne', game.quests.active === 'forge');
check('są dwa okruchy (Rudy + wieszczka)', p.inventory.count('shard_dawn') === 2, String(p.inventory.count('shard_dawn')));

// pozostałe okruchy
const shardNode = game.world.interactables.find((n) => n.id === 'forge_shard');
teleport(shardNode.pos.x + 1, shardNode.pos.z);
game.interact();
check('trzy okruchy zebrane', p.inventory.count('shard_dawn') === 3, String(p.inventory.count('shard_dawn')));

const metalA = game.world.interactables.find((n) => n.id === 'barrow_metal');
teleport(metalA.pos.x + 1, metalA.pos.z);
game.interact();
const metalB = game.world.interactables.find((n) => n.id === 'forge_metal');
teleport(metalB.pos.x + 1, metalB.pos.z);
game.interact();
check('dwa kawałki starożytnego metalu', p.inventory.count('ancient_metal') >= 2, String(p.inventory.count('ancient_metal')));

p.inventory.gold = 600;
const station = game.world.interactables.find((n) => n.id === 'ancient_anvil');
teleport(station.pos.x + 1, station.pos.z);
game.interact();
check('kuźnia otwarta', !game.ui.craftPanel.classList.contains('hidden'));
game.craftItem('dawn_blade', 'ancient_forge');
check('Klinga Świtu wykuta', p.inventory.has('dawn_blade'));
game.ui.closePanels();
game.quests.evaluate(true);
check('zadanie 4 gotowe', game.quests.canComplete('forge'), JSON.stringify(game.quests.progress.forge));
talkToEryn();
game.dialogue.handleAction('complete:forge');
check('zadanie 4 ukończone', game.quests.completed.has('forge'));
document.getElementById('qi-btn')?.click();
game.resumeFromUi();

console.log('▸ zadanie 5: Mgliste Wrota');
talkToEryn();
game.dialogue.handleAction('accept:boss');
document.getElementById('qi-btn')?.click();
check('ostatnie zadanie aktywne', game.quests.active === 'boss');
const boss = game.enemies.list.find((e) => e.def.boss);
check('boss żyje', !!boss && !boss.dead);
teleport(boss.pos.x + 6, boss.pos.z + 6);
step(5);
boss.takeDamage(99999, { knockback: 0 });
check('Kaldras pokonany', game.bossDefeated === true);

await wait(3600);
check('zadanie finałowe ukończone', game.quests.completed.has('boss'), game.quests.active);
check('ekran zwycięstwa', !game.ui.victoryScreen.classList.contains('hidden'), game.state);
check('stan zwycięstwa', game.state === 'victory', game.state);

console.log('');
if (failures > 0) {
  console.error(`✘ ${failures} test(ów) fabuły nie przeszło.`);
  process.exit(1);
}
console.log('✔ Cała fabuła przechodzi od początku do końca.');
