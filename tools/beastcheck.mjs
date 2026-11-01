import * as THREE from 'three';
import fs from 'node:fs';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
const dir = 'public/assets/models/chars/enemies';
for (const f of ['q_Wolf.glb', 'q_Spider.glb', 'q_Rat.glb', 'q_Fox.glb']) {
  const buf = fs.readFileSync(`${dir}/${f}`);
  const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
  const gltf = await new GLTFLoader().parseAsync(ab, '');
  const { BeastRig } = await import('../src/entities/enemyRigs.js');
  const rig = new BeastRig({ scene: gltf.scene, animations: gltf.animations }, { targetHeight: 1.2, states: { idle: 'Idle' }, name: f });
  const box = new THREE.Box3().setFromObject(rig.group);
  const size = new THREE.Vector3(); box.getSize(size);
  let meshes = 0, skinned = 0, maps = 0;
  rig.group.traverse(o => { if (o.isMesh) { meshes++; if (o.isSkinnedMesh) skinned++; if (o.material?.map) maps++; } });
  rig.play('idle'); rig.update(0.5);
  const b2 = new THREE.Box3().setFromObject(rig.group); const s2 = new THREE.Vector3(); b2.getSize(s2);
  console.log(f, 'merge', JSON.stringify(rig.mergeStats), 'siatki', meshes, 'skinned', skinned, 'tekstury', maps,
    'k', rig.scale.toFixed(3), 'box', JSON.stringify([size.x, size.y, size.z].map((v) => +v.toFixed(3))),
    'po animacji', JSON.stringify([s2.x, s2.y, s2.z].map((v) => +v.toFixed(3))));
  rig.group.traverse((o) => {
    if (o.isSkinnedMesh) {
      o.geometry.computeBoundingBox();
      const b = o.geometry.boundingBox;
      console.log('   geo', o.geometry.attributes.position.count, 'bindbox y', b.min.y.toFixed(2), b.max.y.toFixed(2), 'scale', o.scale.toArray().join(','), 'parent', o.parent?.type);
    }
  });
}
