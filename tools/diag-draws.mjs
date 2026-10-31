// Skąd się biorą obiekty rysowalne: wypisuje grupy z największą liczbą siatek
// i nazwy ich dzieci (żeby wiedzieć, co jeszcze scalić).
//   node tools/diag-draws.mjs
import { JSDOM } from 'jsdom';
const dom = new JSDOM('<!doctype html><html><body><div id="ui"></div><canvas id="scene" width="640" height="360"></canvas></body></html>', { pretendToBeVisual: true, url: 'http://localhost/' });
global.window = dom.window; global.document = dom.window.document;
Object.defineProperty(global, 'navigator', { value: dom.window.navigator, configurable: true });
global.HTMLElement = dom.window.HTMLElement; global.HTMLCanvasElement = dom.window.HTMLCanvasElement; global.self = dom.window;
global.localStorage = { _d: {}, getItem(k) { return this._d[k] ?? null; }, setItem(k, v) { this._d[k] = String(v); }, removeItem() {} };
const noop = () => {};
const grad = { addColorStop: noop };
const ctx = () => new Proxy({ createImageData: (w, h) => ({ data: new Uint8ClampedArray(w * h * 4) }), getImageData: (x, y, w, h) => ({ data: new Uint8ClampedArray(w * h * 4) }), measureText: () => ({ width: 10 }), createRadialGradient: () => grad, createLinearGradient: () => grad }, { get: (t, k) => (k in t ? t[k] : noop), set: (t, k, v) => ((t[k] = v), true) });
dom.window.HTMLCanvasElement.prototype.getContext = () => ctx();
const renderer = {
  domElement: document.getElementById('scene'), shadowMap: { enabled: false }, outputColorSpace: '',
  setPixelRatio: noop, getPixelRatio: () => 1, setSize: noop, setClearColor: noop, render: noop, dispose: noop,
  capabilities: { isWebGL2: true, maxTextureSize: 4096 }, info: { render: { calls: 0, triangles: 0 } },
};
const { serveAssets } = await import('./lib/asset-server.mjs');
await serveAssets(dom);
const { Game } = await import('../src/game.js');
const { loadAssets } = await import('../src/core/assets.js');
const assets = await loadAssets();
const game = new Game(document.getElementById('scene'), { renderer, assets });
global.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 16);
try { game.ui.applyVideoSettings = () => {}; game.start(); } catch (err) { console.log('start:', err.message); }
const countMeshes = () => { let n = 0; game.scene.traverse((o) => { if ((o.isMesh || o.isInstancedMesh) && o.visible !== false) n += 1; }); return n; };
console.log('po starcie:', countMeshes(), 'statystyki scalania:', JSON.stringify(game.world?.mergeStats ?? {}));
await new Promise((r) => setTimeout(r, 4000));
console.log('po wczytaniu modeli:', countMeshes());
for (let i = 0; i < 8; i++) { game.clock.getDelta = () => 1 / 60; game.state = 'playing'; try { game.tick(); } catch {} }
console.log('po 8 klatkach:', countMeshes());

const count = (o) => { let n = 0; o.traverse((c) => { if ((c.isMesh || c.isInstancedMesh) && c.visible !== false) n += 1; }); return n; };
// najgłębsze siatki kategoryzujemy po tym, co je otacza
const rest = new Map();
game.scene.traverse((o) => {
  if (!(o.isMesh || o.isInstancedMesh) || o.visible === false) return;
  let p = o.parent;
  while (p && p !== game.scene && !p.name) p = p.parent;
  const k = `${o.material?.name || o.material?.type || '?'} | ${p?.name || '(scena)'} | ${o.castShadow ? 'cień' : ''}`;
  rest.set(k, (rest.get(k) ?? 0) + 1);
});
let sampleShown = 0;
game.scene.traverse((o) => {
  if (sampleShown >= 6) return;
  if (!o.isMesh || o.isInstancedMesh) return;
  if (o.material?.name === 'scalone-' + o.material.name.slice(8)) {
    // pomijamy scalone
    if (o.material.name.startsWith('scalone-')) return;
  }
  const chain = [];
  let p = o.parent;
  while (p && p !== game.scene) { chain.push(`${p.name || p.type}${p.userData?.kind ? `(${p.userData.kind})` : ''}`); p = p.parent; }
  if (!chain.includes('world')) return;
  console.log('   łańcuch:', chain.join(' < '), '| geo:', Object.keys(o.geometry.attributes).join(','), '| mat:', o.material.name || o.material.type, o.material.color?.getHexString?.());
  sampleShown += 1;
});
console.log('--- co zostało ---');
[...rest.entries()].sort((a, b) => b[1] - a[1]).slice(0, 14).forEach(([k, n]) => console.log(`${String(n).padStart(5)}  ${k}`));
const buckets = new Map();
game.scene.traverse((o) => {
  if (!(o.isMesh || o.isInstancedMesh) || o.visible === false) return;
  let p = o.parent;
  const chain = [];
  while (p && p !== game.scene) { if (p.name) chain.push(p.name); p = p.parent; }
  const key = `${(o.name || o.type).replace(/[-_]?\d+/g, '#')} @ ${chain.slice(0, 2).join('/') || '?'}`;
  buckets.set(key, (buckets.get(key) ?? 0) + 1);
});
console.log('--- siatki wg nazwy i rodzica ---');
[...buckets.entries()].sort((a, b) => b[1] - a[1]).slice(0, 25).forEach(([k, n]) => console.log(`${String(n).padStart(5)}  ${k}`));
console.log('--- dzieci sceny ---');
game.scene.children.forEach((c) => {
  const n = count(c);
  if (n > 4) console.log(`${String(n).padStart(5)}  ${c.name || c.type}  (dzieci: ${c.children.length}, pierwsze: ${c.children.slice(0, 3).map((k) => k.name || k.type).join(', ')})`);
});
console.log('--- dzieci swiata ---');
count; // noop
const w = game.world;
(w.scene ?? w.group ?? game.scene).children.forEach((c) => {
  const n = count(c);
  if (n > 3) console.log(`${String(n).padStart(5)}  ${c.name || c.type}  (dzieci: ${c.children.length}, pierwsze: ${c.children.slice(0, 4).map((k) => k.name || k.type).join(', ')})`);
});
const mats = new Map();
const fam = new Map();
game.scene.traverse((o) => {
  if (!o.isMesh || o.isInstancedMesh || o.isSkinnedMesh || o.visible === false) return;
  const m = o.material;
  if (!m) return;
  mats.set(m.uuid, (mats.get(m.uuid) ?? 0) + 1);
  const f = [m.type, m.map?.uuid ?? '-', m.transparent ? 'T' : 'O', m.alphaTest ? 'A' : '-', m.emissive?.getHexString?.() ?? '-', m.side].join('|');
  fam.set(f, (fam.get(f) ?? 0) + 1);
});
console.log(`materiały: ${mats.size}, rodzin: ${fam.size}`);
[...fam.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12).forEach(([k, n]) => console.log(`${String(n).padStart(5)}  ${k}`));
const rows = [];
game.scene.children.forEach((child) => {
  const total = count(child);
  if (!total) return;
  const kids = [];
  child.children.forEach((c) => kids.push([c.name || c.type, count(c), c.isInstancedMesh ? 'inst' : (c.type === 'Group' ? 'grupa' : 'siatka')]));
  kids.sort((a, b) => b[1] - a[1]);
  rows.push([child.name || child.type, total, kids.slice(0, 6)]);
});
rows.sort((a, b) => b[1] - a[1]);
for (const [name, total, kids] of rows.slice(0, 4)) {
  console.log(`${String(total).padStart(5)}  ${name}`);
  for (const [k, n, t] of kids) console.log(`         ${String(n).padStart(5)}  ${k}${t === 'inst' ? ' [instancje]' : ''}`);
}
let inWorld = 0;
w.group?.traverse?.((o) => { if ((o.isMesh || o.isInstancedMesh) && o.visible !== false) inWorld += 1; });
let outside = 0;
game.scene.children.forEach((c) => { if (c === w.group) return; let n = 0; c.traverse((o) => { if ((o.isMesh || o.isInstancedMesh) && o.visible !== false) n += 1; }); outside += n; });
console.log('w świecie:', inWorld, 'poza światem:', outside);
let trulyVisible = 0;
game.scene.traverseVisible((o) => { if (o.isMesh || o.isInstancedMesh) trulyVisible += 1; });
console.log('realnie rysowane (cała hierarchia widoczna):', trulyVisible);
const prot = new Set();
for (const it of w.interactables ?? []) it.mesh?.traverse?.((o) => prot.add(o));
let protMeshes = 0;
w.group?.traverse?.((o) => { if (o.isMesh && prot.has(o)) protMeshes += 1; });
console.log('interaktywne siatki:', protMeshes, 'liczba interaktywnych:', (w.interactables ?? []).length);

process.exit(0);
