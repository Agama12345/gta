// „Odpalenie” gry bez karty graficznej: cała logika, świat, postacie i pętla
// klatki na atrapie renderera. Sprawdzamy, czy gra faktycznie startuje i czy
// po kilkuset klatkach nic nie wybucha (scalanie siatek, zmiana jakości,
// dynamiczna rozdzielczość, trawa, woda).
//   node tools/smoke-play.mjs [klatki]
import { JSDOM } from 'jsdom';

const dom = new JSDOM(`<!doctype html><html><body>
  <div id="ui"></div><div id="loading"><div class="loading-sub"></div></div>
  <canvas id="scene" width="1280" height="720"></canvas></body></html>`, {
  pretendToBeVisual: true,
  url: 'http://localhost/',
});
global.window = dom.window;
global.document = dom.window.document;
Object.defineProperty(global, 'navigator', { value: dom.window.navigator, configurable: true });
global.HTMLElement = dom.window.HTMLElement;
global.HTMLCanvasElement = dom.window.HTMLCanvasElement;
global.self = dom.window;
global.localStorage = {
  _d: {}, getItem(k) { return this._d[k] ?? null; }, setItem(k, v) { this._d[k] = String(v); }, removeItem(k) { delete this._d[k]; },
};
Object.defineProperty(window, 'localStorage', { value: global.localStorage, configurable: true });
window.innerWidth = 1280;
window.innerHeight = 720;
Object.defineProperty(window, 'innerWidth', { value: 1280, configurable: true });
Object.defineProperty(window, 'innerHeight', { value: 720, configurable: true });
global.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 16);
const noop = () => {};
const ctxStub = () => new Proxy({
  createImageData: (w, h) => ({ data: new Uint8ClampedArray(w * h * 4), width: w, height: h }),
  getImageData: (x, y, w, h) => ({ data: new Uint8ClampedArray(w * h * 4), width: w, height: h }),
  measureText: () => ({ width: 10 }),
  createRadialGradient: () => ({ addColorStop: noop }),
  createLinearGradient: () => ({ addColorStop: noop }),
}, { get: (t, k) => (k in t ? t[k] : noop), set: (t, k, v) => ((t[k] = v), true) });
dom.window.HTMLCanvasElement.prototype.getContext = () => ctxStub();

const THREE = await import('three');
const { Game } = await import('../src/game.js');

// atrapa renderera: liczymy, ile razy zamalowano scenę i ile siatek widzi
const stats = { frames: 0, objects: 0, pixelRatio: 1 };
const renderer = {
  domElement: document.getElementById('scene'),
  shadowMap: { enabled: true, needsUpdate: true },
  outputColorSpace: '',
  setPixelRatio(v) { stats.pixelRatio = v; },
  getPixelRatio() { return stats.pixelRatio; },
  setSize: noop,
  setClearColor: noop,
  render(scene) {
    stats.frames += 1;
    if (stats.frames % 60 === 0) {
      let n = 0;
      scene.traverse((o) => { if ((o.isMesh || o.isInstancedMesh) && o.visible !== false) n += 1; });
      stats.objects = n;
    }
  },
  capabilities: { isWebGL2: true, maxTextureSize: 4096 },
  info: { render: { calls: 0, triangles: 0 } },
  dispose: noop,
};

const canvas = document.getElementById('scene');
const errors = [];
const game = new Game(canvas, { renderer });
try {
  game.ui.applyVideoSettings = () => {}; // bez panelu opcji
  game.start();
} catch (err) {
  errors.push(`start: ${err.message}`);
}

const N = Number(process.argv[2] ?? 180);
for (let i = 0; i < N; i++) {
  try {
    game.state = i > 2 ? 'playing' : game.state;
    game.clock.getDelta = () => 1 / 60;
    game.tick();
  } catch (err) {
    errors.push(`tick ${i}: ${err.message}`);
    if (errors.length > 4) break;
  }
}

const world = game.world;
const player = game.player;
console.log(`klatki: ${stats.frames}, obiektów rysowalnych: ${stats.objects}, pixelRatio: ${stats.pixelRatio.toFixed(2)}`);
console.log(`poziom jakości: ${game.qualityTier ?? '-'} (${game.qualityName ?? '-'}), skala rozdzielczości: ${game.dynamicRes?.scale?.toFixed(2) ?? '-'}`);
console.log(`gracz: model=${player?.rig ? 'GLB' : 'proceduralny'}, siatek=${(() => { let n = 0; player?.group?.traverse((o) => { if (o.isMesh) n += 1; }); return n; })()}`);
console.log(`scalanie statyki: ${JSON.stringify(world?.mergeStats ?? {})}`);
console.log(`mieszkańcy: ${game.npcs?.length ?? 0}, wrogowie: ${game.enemies?.list?.length ?? 0}`);
if (errors.length) {
  console.error('BŁĘDY:\n' + errors.join('\n'));
  process.exit(1);
}
console.log('Gra wystartowała i przeszła symulację bez błędów.');
