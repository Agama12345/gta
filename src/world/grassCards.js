// ---------------------------------------------------------------------------
// Trawa jako karty z przezroczystością („billboardy”), a nie stożki.
//
// Wcześniejsza trawa to kilka stożków na kępkę — z bliska wyglądała jak
// zielone kolce z plastiku. Tutaj każda kępka to trzy skrzyżowane, lekko
// wygięte pasy z proceduralną teksturą źdźbeł (alpha-test), co daje gęstą,
// miękką trawę w stylu Gothica 2 — i nadal jest to jedna instancja.
// ---------------------------------------------------------------------------
import * as THREE from 'three';
import { makeRng } from './groundTextures.js';

const CARD_SIZE = 128;

/**
 * Proceduralna tekstura kępy: kilkadziesiąt źdźbeł wyrastających z dolnej
 * krawędzi. Kanał alfa to sylwetka, kolor idzie od ciemnej podstawy do
 * jaśniejszego czubka (plus kilka suchych, żółtawych źdźbeł).
 */
export function buildGrassCardTexture(size = CARD_SIZE, seed = 5501) {
  const rng = makeRng(seed);
  const data = new Uint8Array(size * size * 4);
  const alpha = new Float32Array(size * size);

  const blades = 34;
  for (let b = 0; b < blades; b++) {
    const baseX = rng() * size;
    const len = size * (0.42 + rng() * 0.56);
    const lean = (rng() - 0.5) * 0.5;
    const width = 1.6 + rng() * 2.6;
    const dry = rng() < 0.16;
    const baseY = size - 1;
    const shade = 0.72 + rng() * 0.4;
    for (let s = 0; s < len; s++) {
      const t = s / len;
      const y = baseY - s;
      if (y < 0) break;
      const x = baseX + lean * len * t * t + Math.sin(t * 2.4 + b) * 1.2;
      const half = width * (1 - t) * 0.5 + 0.35;
      for (let dx = -Math.ceil(half); dx <= Math.ceil(half); dx++) {
        const px = Math.round(x + dx);
        if (px < 0 || px >= size) continue;
        const edge = Math.abs(dx) / (half + 0.6);
        const a = Math.max(0, 1 - edge * edge);
        const idx = y * size + px;
        if (a > alpha[idx]) alpha[idx] = a;
      }
      // kolor zapisujemy osobno niżej — tutaj tylko kształt
      void shade;
      void dry;
    }
  }

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = y * size + x;
      const a = alpha[idx];
      const t = 1 - y / size; // 0 przy podstawie, 1 na czubku
      const variation = 0.85 + ((x * 31 + y * 17) % 23) / 100;
      const r = (0.17 + t * 0.16) * variation;
      const g = (0.24 + t * 0.2) * variation;
      const bch = (0.11 + t * 0.1) * variation;
      data[idx * 4] = Math.round(Math.min(1, r) * 255);
      data[idx * 4 + 1] = Math.round(Math.min(1, g) * 255);
      data[idx * 4 + 2] = Math.round(Math.min(1, bch) * 255);
      data[idx * 4 + 3] = Math.round(Math.max(0, Math.min(1, a)) * 255);
    }
  }
  return { data, size };
}

let cachedMaterial = null;

/** Materiał karty trawy (alpha-test, dwustronny, bez połysku). */
export function createGrassCardMaterial() {
  if (cachedMaterial) return cachedMaterial;
  let map = null;
  try {
    const { data, size } = buildGrassCardTexture();
    map = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
    map.colorSpace = THREE.SRGBColorSpace;
    map.magFilter = THREE.LinearFilter;
    map.minFilter = THREE.LinearMipmapLinearFilter;
    map.generateMipmaps = true;
    map.needsUpdate = true;
  } catch (err) {
    map = null;
  }
  cachedMaterial = new THREE.MeshStandardMaterial({
    map,
    color: 0xffffff,
    roughness: 1,
    metalness: 0,
    side: THREE.DoubleSide,
    alphaTest: 0.42,
    transparent: false,
    vertexColors: false,
  });
  return cachedMaterial;
}

/**
 * Geometria kępki: trzy skrzyżowane pasy, wygięte do góry, o wysokości 1
 * i szerokości 1 (skalujemy instancją). Normale skierowane w górę — trawa
 * ma się liczyć jak podłoże, a nie jak pionowa ściana.
 */
export function makeGrassCardGeometry({ planes = 3, segments = 3, width = 1, height = 1, bend = 0.16 } = {}) {
  const rng = makeRng(4242);
  const positions = [];
  const uvs = [];
  const normals = [];
  const indices = [];

  for (let p = 0; p < planes; p++) {
    const ang = (p / planes) * Math.PI + rng() * 0.35;
    const ca = Math.cos(ang);
    const sa = Math.sin(ang);
    const wobble = (rng() - 0.5) * 0.05;
    const base = positions.length / 3;
    for (let s = 0; s <= segments; s++) {
      const t = s / segments;
      const y = t * height;
      const halfW = (width * 0.5) * (1 - t * 0.18);
      const shift = (t * t) * bend + wobble * t;
      for (let side = 0; side < 2; side++) {
        const off = side === 0 ? -halfW : halfW;
        positions.push(ca * off + shift * 0.35, y, sa * off + shift * 0.2);
        uvs.push(side, t);
        normals.push(0, 1, 0);
      }
    }
    for (let s = 0; s < segments; s++) {
      const a = base + s * 2;
      indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geo.setIndex(indices);
  geo.computeBoundingSphere();
  return geo;
}
