// Ile faktycznie zmniejszana jest głowa bohatera i jak wyglądają proporcje.
import * as THREE from 'three';
import fs from 'node:fs';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { autoHeadScale } from '../src/entities/characterRig.js';
// GLTFLoader w Node potrzebuje `self` dla tekstur (podstawiamy atrapę)
globalThis.self = globalThis;
globalThis.URL.createObjectURL = () => 'blob:x';
for (const file of process.argv.slice(2)) {
  const buf = fs.readFileSync(file);
  const gltf = await new GLTFLoader().parseAsync(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength), '');
  gltf.scene.updateMatrixWorld(true);
  let headBone = null;
  gltf.scene.traverse((o) => {
    if (!headBone && o.isBone && /^(head|Head)$/.test(o.name)) headBone = o;
  });
  const box = new THREE.Box3().setFromObject(gltf.scene);
  const size = new THREE.Vector3();
  box.getSize(size);
  const v = new THREE.Vector3();
  headBone?.getWorldPosition(v);
  const k = autoHeadScale(gltf.scene, headBone);
  console.log(`${file.split('/').pop()}: wysokość ${size.y.toFixed(2)}, głowa od ${v.y.toFixed(2)} (${((box.max.y - v.y) / size.y * 100).toFixed(1)}% wzrostu), skalowanie głowy ${k.toFixed(3)}`);
}
