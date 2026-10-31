// ---------------------------------------------------------------------------
// Sprawdzenie, czy drogi nie urywają się na granicach kafli terenu.
//
// Shader gruntu rysuje tylko cztery odcinki traktu wybrane dla danego kafla
// (dawniej: dwadzieścia — koszt na piksel). Jeśli wybór jest zły, droga
// przechodząca przez kafel po prostu znika, a w grze wygląda to jak dziura
// w ziemi. Tutaj liczymy to na sucho: dla siatki punktów w każdym kaflu
// porównujemy odległość do **wszystkich** dróg z odległością do tych czterech.
//
//   node tools/check-roads.mjs
// ---------------------------------------------------------------------------
import { PATHS, CHUNK_SIZE, CHUNK_COUNT, WORLD_RADIUS } from '../src/world/terrain.js';

const EDGE = 7.0;      // koniec rozmycia krawędzi drogi w shaderze
const MAX_SEGMENTS = 6;
const STEP = 8;        // siatka próbkowania w metrach

function distToPath(px, pz, [ax, az, bx, bz]) {
  const dx = bx - ax;
  const dz = bz - az;
  const len2 = Math.max(1e-6, dx * dx + dz * dz);
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (pz - az) * dz) / len2));
  const qx = ax + dx * t;
  const qz = az + dz * t;
  return Math.hypot(px - qx, pz - qz);
}

function boxDist(px, pz, minX, minZ, maxX, maxZ) {
  const dx = px < minX ? minX - px : px > maxX ? px - maxX : 0;
  const dz = pz < minZ ? minZ - pz : pz > maxZ ? pz - maxZ : 0;
  return Math.hypot(dx, dz);
}

function pickSegments(minX, minZ, maxX, maxZ) {
  const scored = [];
  for (let i = 0; i < PATHS.length; i++) {
    const [ax, az, bx, bz] = PATHS[i];
    const len = Math.hypot(bx - ax, bz - az);
    const steps = Math.max(1, Math.min(48, Math.round(len / 24)));
    let best = Infinity;
    for (let k = 0; k <= steps; k++) {
      const t = k / steps;
      const d = boxDist(ax + (bx - ax) * t, az + (bz - az) * t, minX, minZ, maxX, maxZ);
      if (d < best) best = d;
      if (best === 0) break;
    }
    scored.push([best, i]);
  }
  scored.sort((a, b) => a[0] - b[0]);
  return scored.slice(0, MAX_SEGMENTS).map(([, i]) => i);
}

let checked = 0;
let holes = 0;
let chunkHoles = 0;
let worst = null;
for (let cz = 0; cz < CHUNK_COUNT; cz += 1) {
  for (let cx = 0; cx < CHUNK_COUNT; cx += 1) {
    const minX = cx * CHUNK_SIZE - WORLD_RADIUS;
    const minZ = cz * CHUNK_SIZE - WORLD_RADIUS;
    const maxX = minX + CHUNK_SIZE;
    const maxZ = minZ + CHUNK_SIZE;
    const picked = pickSegments(minX, minZ, maxX, maxZ).map((i) => PATHS[i]);
    let local = 0;
    for (let x = minX + STEP / 2; x < maxX; x += STEP) {
      for (let z = minZ + STEP / 2; z < maxZ; z += STEP) {
        let all = Infinity;
        for (const seg of PATHS) all = Math.min(all, distToPath(x, z, seg));
        if (all > EDGE) continue;               // tu nie ma drogi i nie ma być
        checked += 1;
        let kept = Infinity;
        for (const seg of picked) kept = Math.min(kept, distToPath(x, z, seg));
        if (kept > EDGE) {
          holes += 1;
          local += 1;
          if (!worst || all < worst.all) worst = { x, z, all, kept, cx, cz };
        }
      }
    }
    if (local) chunkHoles += 1;
  }
}

console.log(`punkty na drogach: ${checked}, dziur: ${holes} (w ${chunkHoles} kaflach)`);
if (holes) {
  console.log('najgorsze miejsce:', worst);
  process.exit(1);
}
console.log('Drogi pokrywają się w całości — brak przerw na granicach kafli.');
