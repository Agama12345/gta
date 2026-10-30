import * as THREE from 'three';
import { clamp, fbm, lerp, smoothstep, dist2 } from '../core/utils.js';

// ---------------------------------------------------------------------------
// Skala świata — duża, otwarta kraina w stylu klasycznych RPG.
// 1560 × 1560 m (ok. 2,4 km²): góry, przełęcze, lasy, polany, bagno i jezioro.
// ---------------------------------------------------------------------------
export const WORLD_RADIUS = 780;
export const WORLD_SIZE = WORLD_RADIUS * 2;
export const WATER_LEVEL = 19.5;
export const CHUNK_SIZE = 130;
export const CHUNK_COUNT = Math.round(WORLD_SIZE / CHUNK_SIZE); // 12 × 12

// Siatka wysokości: 5 m między próbkami (313 × 313 punktów).
const GRID_SEG = 312;
const GRID_N = GRID_SEG + 1;

export const LOCATIONS = {
  village: { x: 0, z: 360, name: 'Wilcza Dolina', sub: 'Wioska pod Mgłą' },
  trading: { x: 175, z: 250, name: 'Kotlina Kupców', sub: 'Targ na starym trakcie' },
  crossroads: { x: 0, z: 150, name: 'Rozdroże Trzech Dróg', sub: '' },
  forge: { x: 330, z: 40, name: 'Kowalska Góra', sub: 'Starożytna kuźnia' },
  bandits: { x: -420, z: -60, name: 'Obozowisko Rudego Wilka', sub: 'Zbójecki obóz' },
  barrow: { x: 430, z: -330, name: 'Kurhan Szeptu', sub: 'Zapomniane grobowce' },
  ruins: { x: -150, z: -560, name: 'Mgliste Wrota', sub: 'Siedziba Kaldrasa' },
  quarry: { x: -330, z: 330, name: 'Kamieniołom', sub: 'Stare wyrobisko' },
  lake: { x: -500, z: 330, name: 'Jezioro Milczące', sub: 'Zimna woda' },
  castle: { x: -40, z: -220, name: 'Warownia Popiołu', sub: 'Ruiny strażnicy' },
  hermit: { x: -560, z: -200, name: 'Pustelnia', sub: 'Ciemny Las' },
  swamp: { x: -200, z: -430, name: 'Bagno Wieszczki', sub: 'Mgła i zgnilizna' },
  pass: { x: 250, z: -150, name: 'Przełęcz Kalmoru', sub: 'Przejście przez góry' },
  circle: { x: 470, z: 250, name: 'Kamienny Krąg', sub: 'Polana szeptów' },
  mine: { x: 205, z: -430, name: 'Kopalnia Żelazna', sub: 'Zawalona sztolnia' },
  highlands: { x: 470, z: -60, name: 'Wyżyny Kalmoru', sub: '' },
};

// Drogi łączące krainy — [x1, z1, x2, z2]
export const PATHS = [
  [0, 360, 0, 150],
  [0, 150, 175, 250],
  [0, 150, 330, 40],
  [0, 150, -420, -60],
  [0, 360, -330, 330],
  [0, 360, -540, 420],
  [0, 150, -40, -220],
  [0, 150, 250, -150],
  [250, -150, 430, -330],
  [250, -150, 205, -430],
  [-40, -220, -200, -430],
  [-200, -430, -150, -560],
  [-200, -430, -560, -200],
  [330, 40, 470, 250],
  [430, -330, 205, -430],
  [175, 250, -330, 330],
  [-540, 420, -330, 330],
];

// Grzbiety górskie: łamane z wysokością i szerokością.
const RIDGES = [
  { pts: [[360, -520], [400, -300], [392, -60], [352, 120], [420, 300]], h: 128, w: 130, seed: 1.7 },
  { pts: [[470, -560], [520, -300], [500, -60], [560, 220]], h: 150, w: 140, seed: 4.2 },
  { pts: [[180, -540], [300, -430], [430, -330], [520, -200]], h: 112, w: 115, seed: 7.3 },
  { pts: [[-640, 210], [-500, 80], [-380, -40], [-300, -140]], h: 96, w: 115, seed: 2.9 },
  { pts: [[-620, -420], [-420, -520], [-180, -570], [0, -520]], h: 92, w: 125, seed: 5.1 },
  { pts: [[120, 60], [40, -80], [-40, -200]], h: 52, w: 80, seed: 9.4 },
];

// Miejsca wyrównane (osady, obozy, plateau kuźni).
const FLAT_SPOTS = [
  { ...LOCATIONS.village, r: 62, inner: 40, lift: 0.2 },
  { ...LOCATIONS.trading, r: 48, inner: 30, lift: 0.3 },
  { ...LOCATIONS.forge, r: 34, inner: 16, lift: 16 },
  { ...LOCATIONS.barrow, r: 40, inner: 20, lift: 6 },
  { ...LOCATIONS.ruins, r: 48, inner: 26, lift: 2.5 },
  { ...LOCATIONS.bandits, r: 34, inner: 18, lift: 0 },
  { ...LOCATIONS.quarry, r: 36, inner: 18, lift: -4 },
  { ...LOCATIONS.castle, r: 44, inner: 24, lift: 12 },
  { ...LOCATIONS.hermit, r: 34, inner: 16, lift: 0 },
  { ...LOCATIONS.swamp, r: 70, inner: 40, lift: -9 },
  { ...LOCATIONS.pass, r: 46, inner: 26, lift: 0 },
  { ...LOCATIONS.circle, r: 34, inner: 16, lift: 3 },
  { ...LOCATIONS.mine, r: 30, inner: 14, lift: 2 },
];

function distToSegment(px, pz, ax, az, bx, bz) {
  const vx = bx - ax;
  const vz = bz - az;
  const t = clamp(((px - ax) * vx + (pz - az) * vz) / (vx * vx + vz * vz || 1), 0, 1);
  return dist2(px, pz, ax + vx * t, az + vz * t);
}

function distToPolyline(x, z, pts) {
  let best = Infinity;
  for (let i = 0; i < pts.length - 1; i++) {
    const d = distToSegment(x, z, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1]);
    if (d < best) best = d;
  }
  return best;
}

function rawHeight(x, z) {
  const big = fbm(x * 0.0026 + 11.3, z * 0.0026 - 7.1, 4);
  const mid = fbm(x * 0.0105 - 3.7, z * 0.0105 + 5.2, 3);
  const roll = fbm(x * 0.021 + 17.4, z * 0.021 - 8.8, 2);
  const fine = fbm(x * 0.045 + 1.9, z * 0.045 - 2.4, 2);

  let h = 32 + big * 17 + mid * 6.4 + roll * 3.1 + fine * 1.5;

  // pasma górskie — łączone maksimum, żeby szczyty nie piętrzyły się bez końca
  let ridge = 0;
  for (let i = 0; i < RIDGES.length; i++) {
    const r = RIDGES[i];
    const d = distToPolyline(x, z, r.pts);
    if (d < r.w) {
      const t = 1 - smoothstep(0, r.w, d);
      const crest = Math.pow(t, 1.55);
      if (crest < 0.002) continue;
      const rough = 0.62 + 0.66 * (fbm(x * 0.017 + r.seed, z * 0.017 - r.seed, 3) * 0.5 + 0.5);
      const contrib = r.h * crest * rough;
      if (contrib > ridge) ridge = contrib;
    }
  }
  h += ridge;

  // pierścień gór na skraju krainy — nieregularny, żeby kraina nie była misą
  const r = Math.hypot(x, z);
  const rimNoise = fbm(x * 0.0035 + 50.2, z * 0.0035 - 21.7, 2) * 0.5 + 0.5;
  const rimStart = 560 + rimNoise * 120;
  const rim = smoothstep(rimStart, 772, r);
  if (rim > 0) h += Math.pow(rim, 1.35) * (150 + rimNoise * 84) + rim * 9;
  // gwarantowany wał na samej krawędzi mapy — gracz nie zobaczy końca świata
  const edge = smoothstep(700, 776, r);
  if (edge > 0) h = Math.max(h, edge * 195);

  // niecka jeziora
  const dl = dist2(x, z, LOCATIONS.lake.x, LOCATIONS.lake.z);
  if (dl < 130) h -= 17 * smoothstep(130, 18, dl);

  // bagno — wilgotna, niska kotlina
  const ds = dist2(x, z, LOCATIONS.swamp.x, LOCATIONS.swamp.z);
  if (ds < 220) h -= 11 * smoothstep(220, 60, ds);

  // dolina wokół wioski
  const dv = dist2(x, z, LOCATIONS.village.x, LOCATIONS.village.z);
  h -= 4.5 * smoothstep(230, 70, dv) * smoothstep(18, 62, dv);

  return Math.max(h, 1.4);
}

const flats = FLAT_SPOTS.map((s) => ({ ...s, target: Math.max(3.2, rawHeight(s.x, s.z) + s.lift) }));

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

// ---------------------------------------------------------------------------
// Siatka wysokości — jedna, wspólna dla całej gry (teren i logika).
// ---------------------------------------------------------------------------
const heightGrid = new Float32Array(GRID_N * GRID_N);
const gridStart = performance.now();
for (let j = 0; j < GRID_N; j++) {
  const z = -WORLD_RADIUS + (j / GRID_SEG) * WORLD_SIZE;
  for (let i = 0; i < GRID_N; i++) {
    const x = -WORLD_RADIUS + (i / GRID_SEG) * WORLD_SIZE;
    heightGrid[j * GRID_N + i] = exactHeight(x, z);
  }
}
export const terrainBuildTime = performance.now() - gridStart;

export function heightAt(x, z) {
  const fx = ((x + WORLD_RADIUS) / WORLD_SIZE) * GRID_SEG;
  const fz = ((z + WORLD_RADIUS) / WORLD_SIZE) * GRID_SEG;
  let i = Math.floor(fx);
  let j = Math.floor(fz);
  if (i < 0) i = 0;
  if (j < 0) j = 0;
  if (i > GRID_SEG - 1) i = GRID_SEG - 1;
  if (j > GRID_SEG - 1) j = GRID_SEG - 1;
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

export function slopeAt(x, z) {
  const e = 3.4;
  const hx = heightAt(x + e, z) - heightAt(x - e, z);
  const hz = heightAt(x, z + e) - heightAt(x, z - e);
  return Math.hypot(hx, hz) / (2 * e);
}

export function isWater(x, z) {
  if (dist2(x, z, LOCATIONS.lake.x, LOCATIONS.lake.z) > 118) return false;
  return heightAt(x, z) < WATER_LEVEL - 0.05;
}

export function distanceToPath(x, z) {
  let best = Infinity;
  for (const [ax, az, bx, bz] of PATHS) {
    const d = distToSegment(x, z, ax, az, bx, bz);
    if (d < best) best = d;
  }
  return best;
}

export function forestMask(x, z) {
  const n = fbm(x * 0.0042 + 31.7, z * 0.0042 - 12.1, 3) * 0.5 + 0.5;
  const edge = fbm(x * 0.016 - 5.5, z * 0.016 + 9.2, 2) * 0.5 + 0.5;
  return clamp(n * 0.75 + edge * 0.45 - 0.28, 0, 1);
}

// ---------------------------------------------------------------------------
// Kolory terenu — wspólne dla siatki i minimapy.
// ---------------------------------------------------------------------------
const C = {
  meadow: new THREE.Color('#8aa062'),
  meadowDry: new THREE.Color('#a8a066'),
  grass: new THREE.Color('#5d7f42'),
  grassDark: new THREE.Color('#415f31'),
  forest: new THREE.Color('#34502c'),
  dirt: new THREE.Color('#8a7350'),
  rock: new THREE.Color('#84817a'),
  rockDark: new THREE.Color('#5e5d58'),
  snow: new THREE.Color('#e6ecf0'),
  sand: new THREE.Color('#9c8f68'),
  mud: new THREE.Color('#55503a'),
  ash: new THREE.Color('#5c5a55'),
};

const tmpC = new THREE.Color();
const tmpC2 = new THREE.Color();

export function terrainColorAt(x, z, h, slope, out = tmpC) {
  const forest = forestMask(x, z);
  const n = fbm(x * 0.09 + 5, z * 0.09 - 2, 3) * 0.5 + 0.5;
  const n2 = fbm(x * 0.028 - 9, z * 0.03 + 3, 2) * 0.5 + 0.5;

  out.copy(C.grass).lerp(C.meadow, n).lerp(C.meadowDry, n2 * 0.5);
  // duże łaty ciemniejszej darni — przełamują jednolitość łąk
  const patch = fbm(x * 0.006 - 21.5, z * 0.006 + 4.7, 3) * 0.5 + 0.5;
  out.lerp(C.grassDark, smoothstep(0.32, 0.72, patch) * 0.55);
  if (forest > 0.42) out.lerp(C.forest, smoothstep(0.42, 0.85, forest) * 0.8);

  const pathD = distanceToPath(x, z);
  if (pathD < 3.4) out.lerp(C.dirt, smoothstep(3.4, 0.9, pathD) * 0.72);

  // bagno
  const ds = dist2(x, z, LOCATIONS.swamp.x, LOCATIONS.swamp.z);
  if (ds < 220) out.lerp(C.mud, smoothstep(220, 70, ds) * 0.72);

  // skały i śnieg
  if (slope > 0.45) out.lerp(C.rock, smoothstep(0.45, 1.2, slope));
  if (slope > 1.0) out.lerp(C.rockDark, smoothstep(1.0, 2.0, slope) * 0.6);
  if (h > 104) out.lerp(C.rock, smoothstep(104, 148, h) * 0.75);
  // popiół wokół starożytnej kuźni
  const df = dist2(x, z, LOCATIONS.forge.x, LOCATIONS.forge.z);
  if (df < 30) out.lerp(C.ash, smoothstep(30, 10, df) * 0.55);
  const snowLine = 152 + n2 * 26;
  if (h > snowLine) out.lerp(C.snow, smoothstep(snowLine, snowLine + 26, h) * (1 - smoothstep(1.5, 2.4, slope)));
  if (h > snowLine + 22) out.lerp(C.snow, 0.4 * (1 - smoothstep(1.8, 2.6, slope)));

  // piach i muł tylko przy brzegu jeziora (bagno ma własny, ciemny grunt)
  if (h < WATER_LEVEL + 2.2) {
    const lakeD = dist2(x, z, LOCATIONS.lake.x, LOCATIONS.lake.z);
    if (lakeD < 132) out.lerp(C.sand, smoothstep(WATER_LEVEL + 2.2, WATER_LEVEL - 1.2, h) * 0.8 * smoothstep(150, 110, lakeD));
  }

  // lekka wariacja, by uniknąć plam
  out.lerp(tmpC2.setRGB(out.r * 1.06, out.g * 1.04, out.b * 0.98), 0.18);
  return out;
}

// ---------------------------------------------------------------------------
// Chunkowy teren z poziomami szczegółu (LOD).
// ---------------------------------------------------------------------------
function buildChunkGeometry(cx, cz, res) {
  const x0 = cx * CHUNK_SIZE - WORLD_RADIUS;
  const z0 = cz * CHUNK_SIZE - WORLD_RADIUS;
  const step = CHUNK_SIZE / res;
  const n = res + 1;
  const vertCount = n * n;
  const skirtDrop = step * 2.4 + 4;
  const skirtVerts = res * 8; // 4 krawędzie × res segmentów × 2 wierzchołki

  const positions = new Float32Array((vertCount + skirtVerts) * 3);
  const colors = new Float32Array((vertCount + skirtVerts) * 3);
  const uvs = new Float32Array((vertCount + skirtVerts) * 2);
  const normals = new Float32Array((vertCount + skirtVerts) * 3);
  const heights = new Float32Array(vertCount);
  const tmp = new THREE.Color();
  const e = 2.5;

  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      const k = j * n + i;
      const x = x0 + i * step;
      const z = z0 + j * step;
      const h = heightAt(x, z);
      heights[k] = h;
      positions[k * 3] = x;
      positions[k * 3 + 1] = h;
      positions[k * 3 + 2] = z;
      const slope = slopeAt(x, z);
      terrainColorAt(x, z, h, slope, tmp);
      colors[k * 3] = tmp.r;
      colors[k * 3 + 1] = tmp.g;
      colors[k * 3 + 2] = tmp.b;
      uvs[k * 2] = x / 22;
      uvs[k * 2 + 1] = z / 22;
      // normalna liczona z pola wysokości — identyczna na styku chunków,
      // więc nie ma widocznych szwów ani prostokątów na łąkach
      const nx = heightAt(x - e, z) - heightAt(x + e, z);
      const nz = heightAt(x, z - e) - heightAt(x, z + e);
      const len = Math.hypot(nx, 2 * e, nz) || 1;
      normals[k * 3] = nx / len;
      normals[k * 3 + 1] = (2 * e) / len;
      normals[k * 3 + 2] = nz / len;
    }
  }

  const indices = [];
  for (let j = 0; j < res; j++) {
    for (let i = 0; i < res; i++) {
      const a = j * n + i;
      const b = a + 1;
      const c = a + n;
      const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }

  // fartuchy wzdłuż czterech krawędzi — zasłaniają szczeliny między poziomami LOD
  let v = vertCount;
  const pushSkirt = (k) => {
    positions[v * 3] = positions[k * 3];
    positions[v * 3 + 1] = heights[k] - skirtDrop;
    positions[v * 3 + 2] = positions[k * 3 + 2];
    colors[v * 3] = colors[k * 3];
    colors[v * 3 + 1] = colors[k * 3 + 1];
    colors[v * 3 + 2] = colors[k * 3 + 2];
    uvs[v * 2] = uvs[k * 2];
    uvs[v * 2 + 1] = uvs[k * 2 + 1];
    normals[v * 3] = normals[k * 3];
    normals[v * 3 + 1] = normals[k * 3 + 1];
    normals[v * 3 + 2] = normals[k * 3 + 2];
    return v++;
  };
  const edges = [
    (i) => i,
    (i) => res * n + i,
    (i) => i * n,
    (i) => i * n + res,
  ];
  for (const edge of edges) {
    for (let i = 0; i < res; i++) {
      const k1 = edge(i);
      const k2 = edge(i + 1);
      const s1 = pushSkirt(k1);
      const s2 = pushSkirt(k2);
      indices.push(k1, s1, k2, k2, s1, s2);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions.subarray(0, v * 3), 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors.subarray(0, v * 3), 3));
  geo.setAttribute('uv', new THREE.BufferAttribute(uvs.subarray(0, v * 2), 2));
  geo.setAttribute('normal', new THREE.BufferAttribute(normals.subarray(0, v * 3), 3));
  geo.setIndex(indices);
  geo.computeBoundingSphere();
  return geo;
}


// Proceduralna tekstura detalu gruntu — rozbija jednolite płaszczyzny łąk.
function makeDetailTexture() {
  try {
    const size = 256;
    const c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    const ctx = c.getContext('2d');
    if (!ctx || typeof ctx.fillRect !== 'function') return null;
    ctx.fillStyle = '#f2f3ee';
    ctx.fillRect(0, 0, size, size);
    let seed = 1337;
    const rnd = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
    // ciemniejsze źdźbła
    for (let i = 0; i < 2600; i++) {
      const x = rnd() * size;
      const y = rnd() * size;
      const w = 1 + rnd() * 2.5;
      const h = 1 + rnd() * 4;
      ctx.fillStyle = `rgba(96,116,66,${0.10 + rnd() * 0.16})`;
      ctx.fillRect(x, y, w, h);
    }
    // jaśniejsze, wyschnięte plamy
    for (let i = 0; i < 900; i++) {
      const x = rnd() * size;
      const y = rnd() * size;
      ctx.fillStyle = `rgba(236,228,176,${0.10 + rnd() * 0.14})`;
      ctx.fillRect(x, y, 2 + rnd() * 5, 1 + rnd() * 2);
    }
    // ziemiste smugi
    for (let i = 0; i < 260; i++) {
      const x = rnd() * size;
      const y = rnd() * size;
      ctx.fillStyle = `rgba(148,126,92,${0.06 + rnd() * 0.1})`;
      ctx.fillRect(x, y, 3 + rnd() * 9, 2 + rnd() * 4);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  } catch (err) {
    return null;
  }
}

export class TerrainManager {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.name = 'terrain-chunks';
    scene.add(this.group);

    const detail = makeDetailTexture();
    this.material = new THREE.MeshLambertMaterial({ vertexColors: true, map: detail ?? null });
    this.chunks = new Map();
    this.queue = [];
    this.lastLodPos = new THREE.Vector2(1e9, 1e9);
    this.updatesPerFrame = 3;
    this.stats = { built: 0, triangles: 0 };

    for (let cz = 0; cz < CHUNK_COUNT; cz++) {
      for (let cx = 0; cx < CHUNK_COUNT; cx++) {
        this.chunks.set(`${cx},${cz}`, {
          cx, cz, res: 0, mesh: null,
          centerX: cx * CHUNK_SIZE - WORLD_RADIUS + CHUNK_SIZE / 2,
          centerZ: cz * CHUNK_SIZE - WORLD_RADIUS + CHUNK_SIZE / 2,
        });
      }
    }
  }

  lodForDistance(d) {
    if (d < 190) return 26; // 5 m
    if (d < 420) return 13; // 10 m
    return 7; // 18,6 m
  }

  ensureChunk(chunk, res) {
    if (chunk.res === res && chunk.mesh) return;
    if (chunk.mesh) {
      this.group.remove(chunk.mesh);
      chunk.mesh.geometry.dispose();
    }
    const geo = buildChunkGeometry(chunk.cx, chunk.cz, res);
    const mesh = new THREE.Mesh(geo, this.material);
    mesh.receiveShadow = true;
    mesh.castShadow = false;
    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();
    mesh.name = `chunk-${chunk.cx}-${chunk.cz}`;
    this.group.add(mesh);
    chunk.mesh = mesh;
    chunk.res = res;
    this.stats.built += 1;
  }

  // Budowa początkowa: wszystko w najniższym LOD, okolica gracza od razu dokładna.
  buildInitial(pos) {
    for (const chunk of this.chunks.values()) {
      if (chunk.centerX < -WORLD_RADIUS || chunk.centerZ < -WORLD_RADIUS) continue;
      const d = Math.hypot(chunk.centerX - pos.x, chunk.centerZ - pos.z);
      this.ensureChunk(chunk, d < 260 ? 26 : 7);
    }
  }

  update(pos, dt) {
    const moved = Math.hypot(pos.x - this.lastLodPos.x, pos.z - this.lastLodPos.y);
    if (moved > 35) {
      this.lastLodPos.set(pos.x, pos.z);
      this.queue = [];
      for (const chunk of this.chunks.values()) {
        const d = Math.hypot(chunk.centerX - pos.x, chunk.centerZ - pos.z);
        const want = this.lodForDistance(d);
        if (chunk.res !== want) this.queue.push({ chunk, want, d });
      }
      this.queue.sort((a, b) => a.d - b.d);
    }

    // przebudowa kilku chunków na klatkę (bez zacięć)
    let budget = this.updatesPerFrame;
    while (budget > 0 && this.queue.length) {
      const job = this.queue.shift();
      if (job.chunk.res === job.want) continue;
      this.ensureChunk(job.chunk, job.want);
      budget -= 1;
    }
  }

  get triangles() {
    let t = 0;
    for (const c of this.chunks.values()) if (c.mesh) t += c.mesh.geometry.index.count / 3;
    return t;
  }
}

// Zgodność ze starym API (używane w testach).
export function createTerrain() {
  return buildChunkGeometry(0, 0, 8);
}

// ---------------------------------------------------------------------------
// Woda: jezioro + oczka na bagnie.
// ---------------------------------------------------------------------------
export function createWater() {
  const group = new THREE.Group();
  group.name = 'water';
  const mat = new THREE.MeshStandardMaterial({
    color: '#33606e',
    transparent: true,
    opacity: 0.86,
    roughness: 0.14,
    metalness: 0.6,
    flatShading: true,
  });

  const lake = new THREE.Mesh(new THREE.CircleGeometry(118, 56), mat);
  lake.geometry.rotateX(-Math.PI / 2);
  lake.position.set(LOCATIONS.lake.x, WATER_LEVEL, LOCATIONS.lake.z);
  lake.name = 'lake';
  group.add(lake);

  const pooled = [];
  const swampBase = heightAt(LOCATIONS.swamp.x, LOCATIONS.swamp.z);
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2 + 0.6;
    const r = 22 + (i % 3) * 16;
    const x = LOCATIONS.swamp.x + Math.cos(a) * r;
    const z = LOCATIONS.swamp.z + Math.sin(a) * r;
    const geo = new THREE.CircleGeometry(9 + (i % 4) * 3.5, 12);
    const m = new THREE.Mesh(geo, mat);
    m.rotation.x = -Math.PI / 2;
    m.rotation.z = a;
    m.position.set(x, Math.max(swampBase + 0.35, heightAt(x, z) + 0.28), z);
    group.add(m);
    pooled.push(m);
  }

  const base = lake.geometry.attributes.position.array.slice();
  let t = 0;
  return {
    mesh: group,
    update(dt) {
      t += dt;
      const pos = lake.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = base[i * 3];
        const y = base[i * 3 + 1];
        pos.setZ(i, Math.sin(x * 0.12 + t * 1.2) * 0.16 + Math.cos(y * 0.15 + t * 0.9) * 0.12);
      }
      pos.needsUpdate = true;
      lake.geometry.computeVertexNormals();
      for (let i = 0; i < pooled.length; i++) {
        pooled[i].position.y = Math.max(swampBase + 0.35, pooled[i].position.y) + Math.sin(t * 0.8 + i) * 0.0006;
      }
    },
  };
}
