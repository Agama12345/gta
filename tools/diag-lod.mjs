import fs from 'node:fs';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { farLod } from '../src/core/decimate.js';
const file = process.argv[2] ?? 'public/assets/models/nature/q_oak_a.glb';
const buf = fs.readFileSync(file);
const gltf = await new GLTFLoader().parseAsync(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength), '');
gltf.scene.traverse((o) => {
  if (!o.isMesh) return;
  const tris = (o.geometry.index ? o.geometry.index.count : o.geometry.attributes.position.count) / 3;
  const far = farLod(o.geometry);
  console.log(`  siatka ${Math.round(tris)} → ${far ? Math.round(far.index.count / 3) : 'brak LOD'}`);
});
