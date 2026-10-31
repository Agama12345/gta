// Profil klatki bez GPU: ile czasu zajmuje logika świata i systemów w jednym
// kroku symulacji. Uruchomienie: node tools/perf-frame.mjs [liczba_klatek]
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html><body><div id="ui"></div><canvas id="scene"></canvas></body></html>', {
  pretendToBeVisual: true,
  url: 'http://localhost/',
});
global.window = dom.window;
global.document = dom.window.document;
global.HTMLElement = dom.window.HTMLElement;
global.localStorage = { _d: {}, getItem(k) { return this._d[k] ?? null; }, setItem(k, v) { this._d[k] = String(v); }, removeItem(k) { delete this._d[k]; } };
Object.defineProperty(window, 'localStorage', { value: global.localStorage, configurable: true });
window.innerWidth = 1280;
window.innerHeight = 720;
const noop = () => {};
dom.window.HTMLCanvasElement.prototype.getContext = () => new Proxy(
  { createImageData: (w, h) => ({ data: new Uint8ClampedArray(w * h * 4), width: w, height: h }),
    getImageData: (x, y, w, h) => ({ data: new Uint8ClampedArray(w * h * 4), width: w, height: h }),
    measureText: () => ({ width: 10 }),
    createRadialGradient: () => ({ addColorStop: noop }),
    createLinearGradient: () => ({ addColorStop: noop }) },
  { get: (t, k) => (k in t ? t[k] : noop), set: (t, k, v) => ((t[k] = v), true) }
);

const THREE = await import('three');
const { World } = await import('../src/world/world.js');
const { Player } = await import('../src/entities/player.js');
const { NPCSystem } = await import('../src/systems/npc.js').catch(() => ({ NPCSystem: null }));
const { DayNight } = await import('../src/core/time.js');

const game = {
  scene: new THREE.Scene(),
  assets: null,
  camera: new THREE.PerspectiveCamera(60, 16 / 9, 0.1, 4000),
  settings: { quality: 'wysoki' },
  hud: null,
  ui: { toast: noop },
};
const world = new World(game);
game.world = world;
const player = new Player(game);
game.player = player;
const time = new DayNight(game);
game.time = time;

const N = Number(process.argv[2] ?? 240);
const times = [];
let px = 0;
let pz = 40;
for (let i = 0; i < N; i += 1) {
  // imitacja biegu: 8 m/s
  pz += 8 / 60;
  player.position?.set?.(px, 0, pz);
  const t = performance.now();
  world.update(1 / 60, { x: px, z: pz }, game.camera);
  time.update?.(1 / 60);
  times.push(performance.now() - t);
}
times.sort((a, b) => a - b);
const avg = times.reduce((a, b) => a + b, 0) / times.length;
const p95 = times[Math.floor(times.length * 0.95)];
console.log(`klatki: ${N}`);
console.log(`średnia: ${avg.toFixed(2)} ms, mediana: ${times[Math.floor(N / 2)].toFixed(2)} ms, p95: ${p95.toFixed(2)} ms, max: ${times[N - 1].toFixed(2)} ms`);
