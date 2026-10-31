// Pomiar kosztu budowy terenu (bez GPU).
//   node tools/perf-terrain.mjs
import * as THREE from 'three';
import * as T from '../src/world/terrain.js';

const t0 = Date.now();
await import('../src/world/terrain.js');
console.log('moduł terenu (siatka wysokości):', Date.now() - t0, 'ms');

const tm = new T.TerrainManager(new THREE.Group());
const t1 = Date.now();
tm.buildInitial({ x: 0, z: 0 });
console.log('buildInitial (576 chunków):', Date.now() - t1, 'ms, trójkątów:', tm.triangles);

for (const res of [32, 48, 64]) {
  const chunk = { cx: 11, cz: 11, res: -1, mesh: null };
  const start = performance.now();
  tm.ensureChunk(chunk, res);
  console.log(`przebudowa chunka res=${res}: ${(performance.now() - start).toFixed(1)} ms`);
}
console.log('tri po przebudowach:', tm.triangles);
