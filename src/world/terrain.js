import * as THREE from 'three';
import { clamp, fbm, lerp, smoothstep, dist2 } from '../core/utils.js';

export const WORLD_RADIUS = 105;
export const WORLD_SIZE = WORLD_RADIUS * 2;
export const WATER_LEVEL = 1.35;

export const LOCATIONS = {
  village: { x: 0, z: 32, name: 'Wilcza Dolina', sub: 'Wioska pod Mgłą' },
  crossroads: { x: 0, z: 6, name: 'Rozdroże Trzech Dróg', sub: '' },
  forge: { x: 44, z: 4, name: 'Kowalska Góra', sub: 'Starożytna kuźnia' },
  bandits: { x: -48, z: -12, name: 'Obozowisko Rudego Wilka', sub: '' },
  barrow: { x: 46, z: -42, name: 'Kurhan Szeptu', sub: 'Zapomniane grobowce' },
  ruins: { x: -16, z: -52, name: 'Mgliste Wrota', sub: 'Siedziba Kaldrasa' },
  quarry: { x: -34, z: 46, name: 'Kamieniołom', sub: '' },
  lake: { x: -54, z: 58, name: 'Jezioro Milczące', sub: '' },
};

export const PATHS = [
  [0, 32, 0, 6],
  [0, 6, 44, 4],
  [0, 6, -48, -12],
  [0, 6, -16, -52],
  [0, 32, 46, -42],
  [0, 32, -34, 46],
];

const FLAT_SPOTS = [
  { ...LOCATIONS.village, r: 31, inner: 22, lift: 0.15 },
  { ...LOCATIONS.forge, r: 17, inner: 8, lift: 7.2 },
  { ...LOCATIONS.barrow, r: 16, inner: 7.5, lift: 1.8 },
  { ...LOCATIONS.ruins, r: 21, inner: 11, lift: 1.2 },
  { ...LOCATIONS.bandits, r: 16, inner: 8, lift: 0.0 },
  { ...LOCATIONS.quarry, r: 13, inner: 6, lift: -2.2 },
];

function rawHeight(x, z) {
  const n = fbm(x * 0.0115 + 12.7, z * 0.0115 - 4.3, 4);
  const detail = fbm(x * 0.042 - 3.1, z * 0.042 + 7.7, 3);
  let h = 3.35 + n * 4.6 + detail * 0.85;

  const r = Math.hypot(x, z);
  // górski pierścień na skraju mapy
  const rim = smoothstep(70, 101, r);
  h += rim * rim * 30 + rim * 4.5;

  // jezioro
  const dl = dist2(x, z, LOCATIONS.lake.x, LOCATIONS.lake.z);
  h -= 7.5 * smoothstep(26, 4, dl);

  // delikatna dolina wokół wioski, żeby horyzont był ciekawszy
  h += 2.4 * smoothstep(60, 22, r) * smoothstep(8, 24, r);

  h = Math.max(h, 1.55 + 0.22 * fbm(x * 0.09, z * 0.09, 2));
  return h;
}

const flats = FLAT_SPOTS.map((s) => ({ ...s, target: rawHeight(s.x, s.z) + s.lift }));

function exactHeight(x, z) {
  let h = rawHeight(x, z);
  for (let i = 0; i < flats.length; i++) {
    const f = flats[i];
    const d = dist2(x, z, f.x, f.z);
    if (d < f.r) {
      const t = smoothstep(f.r, f.inner, d);
      h = lerp(h, f.target, t);
    }
  }
  return h;
}

// Pola wysokości: siatka próbek, po której interpolujemy wysokość w grze.
// Dzięki temu postacie stoją dokładnie na renderowanym terenie, a zapytania
// o wysokość są bardzo tanie (bez szumu proceduralnego w każdej klatce).
const GRID_SEGMENTS = 176;
const GRID_N = GRID_SEGMENTS + 1;
const heightGrid = new Float32Array(GRID_N * GRID_N);
for (let j = 0; j < GRID_N; j++) {
  const z = -WORLD_RADIUS + (j / GRID_SEGMENTS) * WORLD_SIZE;
  for (let i = 0; i < GRID_N; i++) {
    const x = -WORLD_RADIUS + (i / GRID_SEGMENTS) * WORLD_SIZE;
    heightGrid[j * GRID_N + i] = exactHeight(x, z);
  }
}

export function heightAt(x, z) {
  const fx = ((x + WORLD_RADIUS) / WORLD_SIZE) * GRID_SEGMENTS;
  const fz = ((z + WORLD_RADIUS) / WORLD_SIZE) * GRID_SEGMENTS;
  let i = Math.floor(fx);
  let j = Math.floor(fz);
  if (i < 0) i = 0;
  if (j < 0) j = 0;
  if (i > GRID_SEGMENTS - 1) i = GRID_SEGMENTS - 1;
  if (j > GRID_SEGMENTS - 1) j = GRID_SEGMENTS - 1;
  const tx = clamp(fx - i, 0, 1);
  const tz = clamp(fz - j, 0, 1);
  const h00 = heightGrid[j * GRID_N + i];
  const h10 = heightGrid[j * GRID_N + i + 1];
  const h01 = heightGrid[(j + 1) * GRID_N + i];
  const h11 = heightGrid[(j + 1) * GRID_N + i + 1];
  const a = h00 + (h10 - h00) * tx;
  const b = h01 + (h11 - h01) * tx;
  return a + (b - a) * tz;
}

export function isWater(x, z) {
  return heightAt(x, z) < WATER_LEVEL - 0.02;
}

export function slopeAt(x, z) {
  const e = 1.4;
  const hx = heightAt(x + e, z) - heightAt(x - e, z);
  const hz = heightAt(x, z + e) - heightAt(x, z - e);
  return Math.hypot(hx, hz) / (2 * e);
}

export function distanceToPath(x, z) {
  let best = Infinity;
  for (const [ax, az, bx, bz] of PATHS) {
    const vx = bx - ax;
    const vz = bz - az;
    const t = clamp(((x - ax) * vx + (z - az) * vz) / (vx * vx + vz * vz), 0, 1);
    const d = dist2(x, z, ax + vx * t, az + vz * t);
    if (d < best) best = d;
  }
  return best;
}

// ---------------------------------------------------------------------------
// Siatka terenu
// ---------------------------------------------------------------------------
export function createTerrain(segments = GRID_SEGMENTS) {
  const geo = new THREE.PlaneGeometry(WORLD_SIZE, WORLD_SIZE, segments, segments);
  geo.rotateX(-Math.PI / 2);

  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const cGrass = new THREE.Color('#6c8a4e');
  const cGrassDry = new THREE.Color('#8c9355');
  const cGrassDark = new THREE.Color('#4d6b3b');
  const cDirt = new THREE.Color('#8a7452');
  const cRock = new THREE.Color('#8a8880');
  const cRockDark = new THREE.Color('#63625c');
  const cSand = new THREE.Color('#9b8d68');
  const tmp = new THREE.Color();
  const tmp2 = new THREE.Color();

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const y = heightAt(x, z);
    pos.setY(i, y);

    const slope = slopeAt(x, z);
    const n = fbm(x * 0.12 + 5, z * 0.12 - 2, 3) * 0.5 + 0.5;
    const n2 = fbm(x * 0.05 - 9, z * 0.05 + 3, 2) * 0.5 + 0.5;

    tmp.copy(cGrassDark).lerp(cGrass, n).lerp(cGrassDry, n2 * 0.42);
    const pathD = distanceToPath(x, z);
    if (pathD < 3.4) {
      tmp.lerp(cDirt, smoothstep(3.4, 1.2, pathD) * 0.82);
    }
    if (slope > 0.42) tmp.lerp(cRock, smoothstep(0.42, 1.15, slope));
    if (slope > 0.95) tmp.lerp(cRockDark, smoothstep(0.95, 1.9, slope) * 0.55);
    if (y < WATER_LEVEL + 1.0) tmp.lerp(cSand, smoothstep(WATER_LEVEL + 1.0, WATER_LEVEL - 0.6, y) * 0.85);
    if (y > flats[1].target - 1.4) tmp.lerp(tmp2.set('#7a7568'), 0.16);

    colors[i * 3] = tmp.r;
    colors[i * 3 + 1] = tmp.g;
    colors[i * 3 + 2] = tmp.b;
  }

  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();

  const mat = new THREE.MeshLambertMaterial({
    vertexColors: true,
    flatShading: true,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.receiveShadow = true;
  mesh.name = 'terrain';
  mesh.matrixAutoUpdate = false;
  mesh.updateMatrix();

  return mesh;
}

// ---------------------------------------------------------------------------
// Woda (jezioro)
// ---------------------------------------------------------------------------
export function createWater() {
  const size = 78;
  const seg = 40;
  const geo = new THREE.PlaneGeometry(size, size, seg, seg);
  geo.rotateX(-Math.PI / 2);
  const mat = new THREE.MeshStandardMaterial({
    color: '#2c5460',
    transparent: true,
    opacity: 0.82,
    roughness: 0.18,
    metalness: 0.55,
    flatShading: true,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(LOCATIONS.lake.x, WATER_LEVEL, LOCATIONS.lake.z);
  mesh.receiveShadow = false;
  mesh.name = 'water';

  const base = geo.attributes.position.array.slice();
  let t = 0;
  return {
    mesh,
    update(dt) {
      t += dt;
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = base[i * 3];
        const z = base[i * 3 + 2];
        pos.setY(i, Math.sin(x * 0.35 + t * 1.4) * 0.11 + Math.cos(z * 0.42 + t * 1.05) * 0.09);
      }
      pos.needsUpdate = true;
      geo.computeVertexNormals();
    },
  };
}
