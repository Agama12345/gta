// Sprawdza, czy nowe modele (broń, drobnica) wczytują się i jakie mają wymiary.
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
globalThis.self = globalThis;
globalThis.URL.createObjectURL = () => 'blob:x';
globalThis.ProgressEvent ??= class ProgressEvent {
  constructor(type, init = {}) { this.type = type; Object.assign(this, init); }
};
const dir = 'public/assets/models/props';
// GLTFLoader pobiera pliki przez fetch — w Node potrzeba prawdziwego serwera
const root = path.resolve('public');
const server = http.createServer((req, res) => {
  const file = path.join(root, decodeURIComponent(req.url.split('?')[0]));
  if (!file.startsWith(root) || !fs.existsSync(file)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': file.endsWith('.png') ? 'image/png' : 'application/octet-stream' });
  res.end(fs.readFileSync(file));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}/`;
const files = process.argv.length > 2 ? process.argv.slice(2) : fs.readdirSync(dir).filter((f) => f.endsWith('.gltf') || f.endsWith('.glb'));
for (const f of files) {
  const file = path.join(dir, f);
  try {
    const gltf = await new GLTFLoader().loadAsync(base + 'assets/models/props/' + f);
    const box = new THREE.Box3().setFromObject(gltf.scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    let tris = 0; let maps = 0;
    gltf.scene.traverse((o) => {
      if (!o.isMesh) return;
      tris += (o.geometry.index ? o.geometry.index.count : o.geometry.attributes.position.count) / 3;
      if (o.material?.map) maps += 1;
    });
    console.log(`${f.padEnd(26)} ${Math.round(tris).toString().padStart(6)} trójkątów, ${size.x.toFixed(2)}×${size.y.toFixed(2)}×${size.z.toFixed(2)} m, y ${box.min.y.toFixed(2)}..${box.max.y.toFixed(2)}, tekstury ${maps}`);
  } catch (err) {
    console.log(`${f.padEnd(26)} BŁĄD: ${err.message}`);
  }
}
server.close();
