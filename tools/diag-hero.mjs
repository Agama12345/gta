// Diagnostyka bohatera: skala, role kości, dopasowanie animacji.
//   node tools/diag-hero.mjs [plik.glb]
import * as fs from 'fs';
import { JSDOM } from 'jsdom';
const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost/', pretendToBeVisual: true });
global.window = dom.window; global.document = dom.window.document; global.HTMLElement = dom.window.HTMLElement; global.self = dom.window;
const THREE = await import('three');
const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');
const { collectRigRoles, retargetLibrary } = await import('../src/entities/clipRetarget.js');
const { CharacterRig, normalizeRig } = await import('../src/entities/characterRig.js');

const CHARS = 'public/assets/models/chars';
const file = process.argv[2] ?? 'q_adventurer.glb';
function load(f) {
  return new Promise((res, rej) => {
    const buf = fs.readFileSync(`${CHARS}/${f}`);
    new GLTFLoader().parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength), '', res, rej);
  });
}
const gltf = await load(file);
const box = new THREE.Box3().setFromObject(gltf.scene);
const size = new THREE.Vector3(); box.getSize(size);
console.log(file, 'bryła:', size.toArray().map((v) => v.toFixed(2)).join(' × '));
const { height } = normalizeRig(gltf.scene.clone(true), 1.85);
console.log('zmierzona wysokość:', height.toFixed(2));
const lib = await load(JSON.parse(fs.readFileSync(`${CHARS}/models.json`, 'utf8')).library);
const rig = new CharacterRig(gltf, { library: { scene: lib.scene, clips: lib.animations }, name: 'bohater' });
const b2 = new THREE.Box3().setFromObject(rig.group);
console.log('po normalizacji:', (b2.max.y - b2.min.y).toFixed(2), 'm; klipy:', Object.keys(rig.actions).join(','));
console.log('dodane z biblioteki:', rig.libraryAdded.join(',') || 'brak');
const roles = collectRigRoles(rig.source);
console.log('role:', Object.entries(roles).filter(([, v]) => v).map(([k]) => k).join(','));
if (lib.animations?.length) {
  const res = retargetLibrary({ scene: lib.scene, clips: lib.animations }, rig.source, { idle: 'Idle_Loop' });
  console.log('przeliczony idle:', !!res.clips.idle);
}
for (const st of ['idle', 'walk', 'run']) {
  rig.play(st);
  rig.mixer.update(0.4);
  const b = new THREE.Box3().setFromObject(rig.group);
  console.log(`  ${st}: wys ${(b.max.y - b.min.y).toFixed(2)} m, opadanie ${b.min.y.toFixed(2)}`);
}
const b0 = new THREE.Box3().setFromObject(rig.group);
console.log('zaraz po konstrukcji:', (b0.max.y - b0.min.y).toFixed(2), 'headScale', rig.headScale);
const rig2 = new CharacterRig(gltf, { name: 'bohater', headScale: 1 });
const b1 = new THREE.Box3().setFromObject(rig2.group);
console.log('bez headScale:', (b1.max.y - b1.min.y).toFixed(2));
