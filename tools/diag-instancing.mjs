import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import * as THREE from 'three';
const root = '/home/user/gta/public';
const server = http.createServer((req, res) => {
  const file = path.join(root, decodeURIComponent(req.url.split('?')[0]));
  fs.readFile(file, (err, data) => { if (err) { res.writeHead(404); res.end(''); return; } res.writeHead(200); res.end(data); });
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}/`;
class FakeImage { constructor(){this.width=4;this.height=4;this.style={};} set src(v){this._src=v;setTimeout(()=>{this.onload?.({});},0);} get src(){return this._src;} addEventListener(){} removeEventListener(){} setAttribute(){} getAttribute(){return null;} }
globalThis.self = globalThis;
globalThis.document = { createElementNS: () => new FakeImage(), createElement: () => new FakeImage() };
globalThis.createImageBitmap = async () => ({ width: 4, height: 4, close() {} });
globalThis.ProgressEvent = class { constructor(t, i = {}) { this.type = t; Object.assign(this, i); } };
const RealRequest = globalThis.Request;
globalThis.Request = class extends RealRequest { constructor(input, init) { super(typeof input === 'string' ? new URL(input, base).toString() : input, init); } };
const realFetch = globalThis.fetch;
globalThis.fetch = (input, init) => realFetch(typeof input === 'string' ? new URL(input, base).toString() : input, init);
globalThis.URL.createObjectURL = () => 'blob:test';
globalThis.URL.revokeObjectURL = () => {};

const { naturalizeFoliage, prepareInstancing } = await import('/home/user/gta/src/core/assets.js');
const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');
for (const name of ['q_oak_a', 'q_birch_b', 'q_bush_a']) {
  const gltf = await new GLTFLoader().loadAsync(base + `assets/models/nature/${name}.glb`);
  const scene = naturalizeFoliage(gltf.scene);
  const parts = prepareInstancing(scene, { mergeAll: true });
  console.log(name, 'części:', parts.length, parts.map(p => `${p.material.type}/${p.geometry.attributes.position.count}v`).join(' '));
  const partsNo = prepareInstancing(gltf.scene, { mergeAll: false });
  console.log('   bez scalania:', partsNo.length);
}
server.close();
