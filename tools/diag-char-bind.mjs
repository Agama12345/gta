import fs from 'node:fs';
import { JSDOM } from 'jsdom';
const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost/', pretendToBeVisual: true });
global.window = dom.window; global.document = dom.window.document; global.HTMLElement = dom.window.HTMLElement; global.self = dom.window;
const THREE = await import('three');
const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');
const CHARS = 'public/assets/models/chars';
const file = process.argv[2] ?? 'q_adventurer.glb';
const buf = fs.readFileSync(`${CHARS}/${file}`);
const gltf = await new Promise((res, rej) => new GLTFLoader().parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength), '', res, rej));
gltf.scene.updateMatrixWorld(true);
const rows = [];
gltf.scene.traverse((o) => {
  if (!o.isSkinnedMesh) return;
  const bb = new THREE.Box3().setFromObject(o);
  rows.push(`${o.name}: pos=${o.position.toArray().map(v=>v.toFixed(2))} scale=${o.scale.x.toFixed(3)} bind=${o.bindMatrix.elements.slice(12,15).map(v=>v.toFixed(2))} box=[${bb.min.y.toFixed(2)},${bb.max.y.toFixed(2)}] bones=${o.skeleton.bones.length}`);
});
console.log(rows.join('\n'));
