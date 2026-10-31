// Pomiar pola trawy (bez GPU): ile kosztuje przesunięcie pola i jak wyglądają
// instancje. Uruchomienie: node tools/perf-grass.mjs
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html><body><canvas id="scene"></canvas></body></html>', {
  pretendToBeVisual: true,
  url: 'http://localhost/',
});
global.window = dom.window;
global.document = dom.window.document;
global.HTMLElement = dom.window.HTMLElement;
global.localStorage = { _d: {}, getItem(k) { return this._d[k] ?? null; }, setItem(k, v) { this._d[k] = String(v); }, removeItem(k) { delete this._d[k]; } };
Object.defineProperty(window, 'localStorage', { value: global.localStorage, configurable: true });
const noop = () => {};
dom.window.HTMLCanvasElement.prototype.getContext = () => new Proxy(
  { createImageData: (w, h) => ({ data: new Uint8ClampedArray(w * h * 4) }), measureText: () => ({ width: 10 }),
    createRadialGradient: () => ({ addColorStop: noop }), createLinearGradient: () => ({ addColorStop: noop }) },
  { get: (t, k) => (k in t ? t[k] : noop), set: (t, k, v) => ((t[k] = v), true) }
);

const THREE = await import('three');
const { World } = await import('../src/world/world.js');
const { heightAt } = await import('../src/world/terrain.js');

const game = { scene: new THREE.Scene(), assets: null };
const world = new World(game);
const f = world.grassField;
console.log('pole trawy:', f ? `pojemność ${f.capacity}, instancje ${f.preparedFor}` : 'brak');

const bench = (label, x, z) => {
  f.anchorX = 1e9;
  const frames = Math.ceil(f.preparedFor / 1500);
  const times = [];
  let px = x;
  let pz = z;
  for (let i = 0; i < frames; i += 1) {
    const t = performance.now();
    world._updateGrass(px, pz);
    times.push(performance.now() - t);
    px += 6; // imituj ruch gracza między klatkami
    pz += 4;
  }
  const total = times.reduce((a, b) => a + b, 0);
  console.log(`${label}: ${frames} klatek, razem ${total.toFixed(1)} ms, max ${Math.max(...times).toFixed(1)} ms/klatkę`);
};

bench('start w wiosce', 0, 40);
bench('łąka', 320, -260);
bench('góry', -900, 700);

// kontrola jakości: po ustabilizowaniu pola instancje siedzą na ziemi
f.anchorX = 1e9;
while (f.cursor < f.preparedFor) world._updateGrass(320, -260);
const arr = f.mesh.instanceMatrix.array;
let bad = 0;
let counted = 0;
for (let i = 0; i < f.preparedFor; i += 1) {
  const y = arr[i * 16 + 13];
  if (y === -9999) continue;
  counted += 1;
  const x = arr[i * 16 + 12] + f.holder.position.x;
  const z = arr[i * 16 + 14] + f.holder.position.z;
  const h = heightAt(x, z);
  if (!Number.isFinite(y) || Math.abs(y - (h - 0.03)) > 0.05) bad += 1;
}
console.log(`kępki na ziemi: ${counted}, błędy wysokości: ${bad}`);
