import fs from 'node:fs';
import { JSDOM } from 'jsdom';
const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost/', pretendToBeVisual: true });
global.window = dom.window; global.document = dom.window.document; global.HTMLElement = dom.window.HTMLElement; global.self = dom.window;
const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');
const { CharacterRig } = await import('../src/entities/characterRig.js');
const CHARS = 'public/assets/models/chars';
const load = (f) => new Promise((res, rej) => {
  const b = fs.readFileSync(`${CHARS}/${f}`);
  new GLTFLoader().parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength), '', res, rej);
});
const file = process.argv[2] ?? 'q_adventurer.glb';
const g = await load(file);
const rig = new CharacterRig(g, { name: 'x' });
const seen = new Map();
rig.group.traverse((o) => {
  if (!o.isMesh) return;
  const m = Array.isArray(o.material) ? o.material[0] : o.material;
  const c = m.color;
  const key = `${m.name} #${c.getHexString()} lin=[${c.r.toFixed(3)},${c.g.toFixed(3)},${c.b.toFixed(3)}] map=${!!m.map} metal=${m.metalness} rough=${m.roughness}`;
  if (!seen.has(key)) seen.set(key, []);
  seen.get(key).push(o.name);
});
for (const [k, v] of seen) console.log(k, '→', v.slice(0, 3).join(', '));
