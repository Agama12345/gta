import * as THREE from 'three';
import { clamp, fbm, lerp, smoothstep, dist2 } from '../core/utils.js';
import { biomeWeights } from './biomes.js';

// ---------------------------------------------------------------------------
// Skala świata.
// Autorska mapa (780 m promienia) jest rozciągnięta 2,6× w poziomie i 1,35×
// w pionie — daje to krainę 3,6 × 3,6 km (13 km², ponad 5× większą niż
// poprzednia), a góry pozostają strome. Wszystkie współrzędne w kodzie
// (lokacje, ścieżki, dialogi) podajemy w metrach świata.
// ---------------------------------------------------------------------------
export const WORLD_SCALE = 2.6;
export const HEIGHT_SCALE = 1.35;
const AUTHOR_RADIUS = 780;

export const WORLD_RADIUS = 2500;
export const WORLD_SIZE = WORLD_RADIUS * 2;
export const WATER_LEVEL = 19.5 * HEIGHT_SCALE;
export const CHUNK_SIZE = 250;
export const CHUNK_COUNT = Math.round(WORLD_SIZE / CHUNK_SIZE); // 24 × 24

// Siatka wysokości: 8 m między próbkami (451 × 451 punktów).
const GRID_SEG = Math.round(WORLD_SIZE / 8); // 550
const GRID_N = GRID_SEG + 1;

// Linia brzegowa (w metrach autorskich) — dalej zaczyna się ocean.
const COAST_BASE = 640;
export const COAST_RADIUS = COAST_BASE * WORLD_SCALE;      // ~1485 m
export const LAND_RADIUS = (COAST_BASE - 40) * WORLD_SCALE; // bezpieczny ląd

const AUTHOR_LOCATIONS = {
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
  // nowe miejsca nad morzem
  lighthouse: { x: 430, z: 470, name: 'Latarnia na Cyplu', sub: 'Ostatnie światło przed morzem' },
  wreck: { x: 640, z: 250, name: 'Wrak „Zimnej Fali”', sub: 'Resztki statku na mieliźnie' },
  fisherhut: { x: 0, z: 620, name: 'Chaty Rybaków', sub: 'Drewno, sieci i sól' },
  island: { x: 700, z: -430, name: 'Samotna Skała', sub: 'Wyspa na horyzoncie' },
};

export const LOCATIONS = Object.fromEntries(
  Object.entries(AUTHOR_LOCATIONS).map(([k, v]) => [
    k,
    { ...v, x: v.x * WORLD_SCALE, z: v.z * WORLD_SCALE },
  ])
);

// Drogi łączące krainy — [x1, z1, x2, z2] (autorskie, przeliczane niżej)
const AUTHOR_PATHS = [
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
  // trakty nadmorskie
  [175, 250, 430, 470],
  [430, 470, 640, 250],
  [0, 360, 0, 620],
];

export const PATHS = AUTHOR_PATHS.map(([ax, az, bx, bz]) => [
  ax * WORLD_SCALE, az * WORLD_SCALE, bx * WORLD_SCALE, bz * WORLD_SCALE,
]);

// Grzbiety górskie: łamane z wysokością i szerokością (przestrzeń autorska).
const RIDGES = [
  { pts: [[360, -520], [400, -300], [392, -60], [352, 120], [420, 300]], h: 128, w: 130, seed: 1.7 },
  { pts: [[470, -560], [520, -300], [500, -60], [560, 220]], h: 150, w: 140, seed: 4.2 },
  { pts: [[180, -540], [300, -430], [430, -330], [520, -200]], h: 112, w: 115, seed: 7.3 },
  { pts: [[-640, 210], [-500, 80], [-380, -40], [-300, -140]], h: 96, w: 115, seed: 2.9 },
  { pts: [[-620, -420], [-420, -520], [-180, -570], [0, -520]], h: 92, w: 125, seed: 5.1 },
  { pts: [[120, 60], [40, -80], [-40, -200]], h: 52, w: 80, seed: 9.4 },
  // grzbiety nadmorskie — klify nad zatoką
  { pts: [[300, 470], [430, 560], [540, 600]], h: 78, w: 92, seed: 3.3 },
  { pts: [[-470, 380], [-600, 460], [-680, 540]], h: 64, w: 86, seed: 6.6 },
];

// Wyspy na oceanie (przestrzeń autorska).
const ISLANDS = [
  { x: 700, z: -430, r: 46, h: 44, seed: 2.1 },
  { x: 690, z: 330, r: 30, h: 34, seed: 8.4 },
  { x: -690, z: -520, r: 26, h: 30, seed: 5.7 },
];

// Mielizna łącząca brzeg z największą wyspą.
const SHOAL = [[540, -360], [610, -392], [660, -412], [700, -430]];

// ---------------------------------------------------------------------------
// RZEKI I DODATKOWE JEZIORA
// Rzeki płyną w niskich dolinach: rzeźba terenu jest w nich delikatnie wcięta,
// a tafla wody (osobna siatka w `world.js`) biegnie po lokalnej wysokości.
// Dzięki temu strumień w górach nie musi być „kanałem na poziomie morza”.
// ---------------------------------------------------------------------------
const AUTHOR_RIVERS = [
  {
    name: 'Rzeka Szeptu', width: 9, depth: 1.05,
    pts: [[250, 180], [205, 265], [150, 330], [100, 366], [60, 400], [46, 470], [70, 540], [88, 660], [92, 700]],
  },
  {
    name: 'Rzeka Milcząca', width: 7.5, depth: 0.95,
    pts: [[-430, 335], [-355, 352], [-285, 376], [-215, 402], [-150, 435], [-95, 468], [-40, 500], [20, 528], [70, 556], [96, 585]],
  },
  {
    name: 'Rzeka Bagienna', width: 8, depth: 1.0,
    pts: [[-215, -420], [-275, -395], [-335, -372], [-395, -358], [-455, -368], [-515, -390], [-570, -420], [-612, -452]],
  },
  {
    name: 'Rzeka Popielna', width: 8.5, depth: 1.0,
    pts: [[420, -300], [430, -360], [420, -430], [396, -500], [362, -562], [318, -616], [268, -660], [212, -694]],
  },
  {
    name: 'Potok Kamienny', width: 5.5, depth: 0.8,
    pts: [[120, -120], [96, -180], [78, -244], [70, -310], [74, -372], [88, -430]],
  },
];

const AUTHOR_LAKES = [
  { name: 'Jezioro Ciemne', x: -90, z: -150, r: 82, inner: 30, level: 19.4, depth: 3.2 },
  { name: 'Jezioro Wierzbowe', x: 150, z: 470, r: 74, inner: 26, level: 19.6, depth: 3.0 },
  { name: 'Staw Wierzbowy', x: -338, z: 192, r: 22, inner: 8, level: 30.2, depth: 2.6 },
  { name: 'Jezioro Mgliste', x: 315, z: -215, r: 30, inner: 11, level: 53.5, depth: 3.4 },
  { name: 'Jezioro Kamienne', x: 269, z: -377, r: 26, inner: 10, level: 62.0, depth: 3.0 },
];

/**
 * Bieg rzeki: dzielimy polilinię na krótkie odcinki i dokładamy meandry,
 * a potem przedłużamy ujście aż do morza (albo do zaklęśnięcia terenu).
 * Rzeka wygląda wtedy jak ciek, a nie jak odcinek narysowany linijką.
 */
function meanderPath(pts, width, seed) {
  const out = [];
  const rnd = (i) => Math.sin(i * 12.9898 + seed * 78.233) * 0.5 + 0.5;
  const step = 14;
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, az] = pts[i];
    const [bx, bz] = pts[i + 1];
    const len = Math.hypot(bx - ax, bz - az);
    const n = Math.max(2, Math.ceil(len / step));
    const nx = -(bz - az) / (len || 1);
    const nz = (bx - ax) / (len || 1);
    const phase = rnd(i) * Math.PI * 2;
    for (let k = 0; k < n; k++) {
      const t = k / n;
      const amp = width * (0.55 + 0.45 * Math.sin(phase + t * 4.2 + i));
      const wobble = Math.sin(phase + t * Math.PI * 2 + i * 1.7) * amp;
      const taper = Math.sin(t * Math.PI) * 0.9 + 0.1;
      out.push([ax + (bx - ax) * t + nx * wobble * taper, az + (bz - az) * t + nz * wobble * taper]);
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
}

export const RIVERS = AUTHOR_RIVERS.map((r, idx) => ({
  ...r,
  width: r.width * WORLD_SCALE,
  depth: r.depth * HEIGHT_SCALE,
  path: meanderPath(
    r.pts.map(([x, z]) => [x * WORLD_SCALE, z * WORLD_SCALE]),
    r.width * WORLD_SCALE,
    idx + 1
  ),
}));

export const LAKES = AUTHOR_LAKES.map((l) => ({
  ...l,
  x: l.x * WORLD_SCALE,
  z: l.z * WORLD_SCALE,
  r: l.r * WORLD_SCALE,
  inner: l.inner * WORLD_SCALE,
  bed: (l.level - l.depth) * HEIGHT_SCALE,
  level: l.level * HEIGHT_SCALE,
  depth: l.depth * HEIGHT_SCALE,
}));

// Miejsca wyrównane (osady, obozy, plateau kuźni) — w metrach świata.
const AUTHOR_FLATS = [
  { ...AUTHOR_LOCATIONS.village, r: 62, inner: 40, lift: 0.2 },
  { ...AUTHOR_LOCATIONS.trading, r: 48, inner: 30, lift: 0.3 },
  { ...AUTHOR_LOCATIONS.forge, r: 34, inner: 16, lift: 16 },
  { ...AUTHOR_LOCATIONS.barrow, r: 40, inner: 20, lift: 6 },
  { ...AUTHOR_LOCATIONS.ruins, r: 48, inner: 26, lift: 2.5 },
  { ...AUTHOR_LOCATIONS.bandits, r: 34, inner: 18, lift: 0 },
  { ...AUTHOR_LOCATIONS.quarry, r: 36, inner: 18, lift: -4 },
  { ...AUTHOR_LOCATIONS.castle, r: 44, inner: 24, lift: 12 },
  { ...AUTHOR_LOCATIONS.hermit, r: 34, inner: 16, lift: 0 },
  { ...AUTHOR_LOCATIONS.swamp, r: 70, inner: 40, lift: 9.5 },
  { ...AUTHOR_LOCATIONS.pass, r: 46, inner: 26, lift: 0 },
  { ...AUTHOR_LOCATIONS.circle, r: 34, inner: 16, lift: 3 },
  { ...AUTHOR_LOCATIONS.mine, r: 30, inner: 14, lift: 2 },
  { ...AUTHOR_LOCATIONS.highlands, r: 28, inner: 13, lift: 1 },
  { ...AUTHOR_LOCATIONS.lighthouse, r: 44, inner: 24, lift: 5 },
  { ...AUTHOR_LOCATIONS.wreck, r: 40, inner: 22, lift: -1.4 },
  { ...AUTHOR_LOCATIONS.fisherhut, r: 52, inner: 30, lift: 0.4 },
];

// Miejsca (wioski, obozy) są większe niż w oryginale, ale nie 2,6× — zabudowa
// i ścieżki w ich wnętrzu powstały w metrach autorskich, więc skala 1,45
// zostawia wokół nich sensowny, płaski plac.
const SITE_SCALE = 1.45;
const FLAT_SPOTS = AUTHOR_FLATS.map((s) => ({
  x: s.x * WORLD_SCALE,
  z: s.z * WORLD_SCALE,
  r: s.r * SITE_SCALE,
  inner: s.inner * SITE_SCALE,
  lift: s.lift,
}));

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

// Wysokość w metrach autorskich (bez skalowania) — cała rzeźba liczona jest
// w jednej, spójnej przestrzeni, więc zmiana skali mapy nie psuje proporcji.
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

  // skalne granie — im wyżej, tym bardziej poszarpany grzbiet
  if (h > 96) {
    const crag = Math.abs(fbm(x * 0.045 + 3.3, z * 0.045 - 8.1, 3));
    h += crag * smoothstep(96, 150, h) * 34;
  }

  // ---- linia brzegowa: kraina opada do oceanu -----------------------------
  const r = Math.hypot(x, z);
  const coastNoise = fbm(x * 0.0035 + 50.2, z * 0.0035 - 21.7, 3) * 0.5 + 0.5;
  const coast = COAST_BASE + coastNoise * 62;

  // plaża i klif, potem dno morskie
  if (r > coast - 40) {
    const shallow = smoothstep(coast - 40, coast + 26, r);
    const deep = smoothstep(coast, coast + 150, r);
    const coastal = lerp(h, 21 + coastNoise * 6 + (fbm(x * 0.03, z * 0.03, 2) * 2.2), shallow);
    h = lerp(coastal, -30 + coastNoise * 9, deep);
  }

  // wyspy wynurzają się z morza (po obniżeniu dna, inaczej fala by je zmyła)
  for (let i = 0; i < ISLANDS.length; i++) {
    const isl = ISLANDS[i];
    const d = dist2(x, z, isl.x, isl.z);
    if (d < isl.r * 2.2) {
      const t = 1 - smoothstep(isl.r * 0.3, isl.r * 1.85, d);
      const bump = isl.h * Math.pow(t, 1.4) * (0.75 + 0.45 * (fbm(x * 0.05 + isl.seed, z * 0.05, 2) * 0.5 + 0.5));
      h = Math.max(h, -16 + bump);
    }
  }

  // mielizna do Samotnej Skały — można przejść suchą nogą przy odpływie
  const shoal = distToPolyline(x, z, SHOAL);
  if (shoal < 18) {
    const t = 1 - smoothstep(0, 18, shoal);
    const crest = 20.6 + (fbm(x * 0.06 + 7.1, z * 0.06 - 3.3, 2) * 0.5 + 0.5) * 2.6;
    h = Math.max(h, lerp(h, crest, t));
  }

  // niecka jeziora — płaskie dno i łagodny brzeg
  const dl = dist2(x, z, AUTHOR_LOCATIONS.lake.x, AUTHOR_LOCATIONS.lake.z);
  if (dl < 152) {
    const basin = 1 - smoothstep(94, 150, dl);
    h = lerp(h, 12.4, basin * 0.94);
  }

  // bagno — wilgotna, niska kotlina
  const ds = dist2(x, z, AUTHOR_LOCATIONS.swamp.x, AUTHOR_LOCATIONS.swamp.z);
  if (ds < 220) h -= 3.5 * smoothstep(220, 60, ds);

  // dolina wokół wioski
  const dv = dist2(x, z, AUTHOR_LOCATIONS.village.x, AUTHOR_LOCATIONS.village.z);
  h -= 4.5 * smoothstep(230, 70, dv) * smoothstep(18, 62, dv);

  return Math.max(h, -34);
}

const flats = FLAT_SPOTS.map((s) => {
  const target = Math.max(3.2, rawHeight(s.x / WORLD_SCALE, s.z / WORLD_SCALE) + s.lift);
  return { ...s, target: target * HEIGHT_SCALE };
});

function exactHeight(x, z) {
  const ax = x / WORLD_SCALE;
  const az = z / WORLD_SCALE;
  let h = rawHeight(ax, az) * HEIGHT_SCALE;
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

// ---------------------------------------------------------------------------
// RZEKI I JEZIORA — wcinamy je w gotową siatkę wysokości, po wyrównaniach.
// Dno rzeki biegnie po profilu wymuszonym monotonicznie (woda nie płynie
// pod górkę), a tafla wody to osobna wstęga w `world.js`.
// ---------------------------------------------------------------------------
const gridX = (i) => -WORLD_RADIUS + (i / GRID_SEG) * WORLD_SIZE;
const gridZ = (j) => -WORLD_RADIUS + (j / GRID_SEG) * WORLD_SIZE;
const cellOf = (v) => clamp(Math.round(((v + WORLD_RADIUS) / WORLD_SIZE) * GRID_SEG), 0, GRID_SEG);

function baseHeightAtWorld(x, z) {
  const i = clamp(Math.round(((x + WORLD_RADIUS) / WORLD_SIZE) * GRID_SEG), 0, GRID_SEG);
  const j = clamp(Math.round(((z + WORLD_RADIUS) / WORLD_SIZE) * GRID_SEG), 0, GRID_SEG);
  return heightGrid[j * GRID_N + i];
}



/** Profile rzek: próbki co ~10 m, wygładzone i wymuszone „w dół”. */
function buildProfiles() {
  const out = [];
  for (const river of RIVERS) {
    const pts = river.path;
    const samples = [];
    let total = 0;
    for (let i = 0; i < pts.length - 1; i++) {
      const [ax, az] = pts[i];
      const [bx, bz] = pts[i + 1];
      const len = Math.hypot(bx - ax, bz - az);
      const step = Math.max(8, len / Math.ceil(len / 12));
      const n = Math.max(1, Math.ceil(len / step));
      for (let k = 0; k < n; k++) {
        const t = k / n;
        const x = ax + (bx - ax) * t;
        const z = az + (bz - az) * t;
        samples.push({ x, z, d: total + len * t });
      }
      total += len;
    }
    const last = pts[pts.length - 1];
    samples.push({ x: last[0], z: last[1], d: total });

    // Ujście: jeśli ciek kończy się na lądzie, dokładamy bieg w dół zbocza,
    // aż wpada do morza albo do lokalnego zagłębienia.
    {
      let [ex, ez] = [last[0], last[1]];
      let [qx, qz] = [pts[pts.length - 2][0], pts[pts.length - 2][1]];
      let dx = ex - qx;
      let dz = ez - qz;
      const dl = Math.hypot(dx, dz) || 1;
      dx /= dl;
      dz /= dl;
      for (let guard = 0; guard < 60; guard++) {
        const here = heightAt(ex, ez);
        if (here <= WATER_LEVEL + 0.8) break;
        let best = null;
        for (let k = -5; k <= 5; k++) {
          const ang = Math.atan2(dx, dz) + k * 0.17;
          const nx = Math.sin(ang);
          const nz = Math.cos(ang);
          const tx = ex + nx * 18;
          const tz = ez + nz * 18;
          if (Math.hypot(tx, tz) > WORLD_RADIUS - 20) continue;
          const h = heightAt(tx, tz);
          const cost = h + Math.abs(k) * 0.7;
          if (!best || cost < best.cost) best = { cost, tx, tz, h, nx, nz };
        }
        if (!best) break;
        if (best.h > here + 2.2) break; // w górę rzeka już nie popłynie
        ex = best.tx;
        ez = best.tz;
        dx = best.nx;
        dz = best.nz;
        total += 18;
        samples.push({ x: ex, z: ez, d: total });
      }
    }

    // wysokość bazowa terenu w próbkach (biliniowo — tak samo, jak widzi ją gra)
    for (const smp of samples) smp.base = heightAt(smp.x, smp.z);

    // wygładzenie (średnia krocząca) — profil nie skacze po pagórkach
    const smooth = samples.map((smp, i) => {
      let sum = 0;
      let cnt = 0;
      for (let k = -3; k <= 3; k++) {
        const s2 = samples[i + k];
        if (!s2) continue;
        sum += s2.base;
        cnt += 1;
      }
      return sum / cnt;
    });
    // Tafla trzyma się lokalnego terenu: nigdy nie wisi nad zboczem (bo wtedy
    // woda „leciałaby” nad suchą ziemią), a wygładzenie daje spokojny spadek.
    const level = smooth.map((h) => h - 0.2);
    for (let pass = 0; pass < 2; pass++) {
      for (let i = 1; i < level.length - 1; i++) {
        level[i] = (level[i - 1] + level[i] * 2 + level[i + 1]) / 4;
      }
    }
    for (let i = 0; i < level.length; i++) {
      let lowest = samples[i].base;
      for (let k = -2; k <= 2; k++) {
        const s2 = samples[i + k];
        if (s2) lowest = Math.min(lowest, s2.base);
      }
      samples[i].level = Math.min(level[i], lowest - 0.25);
    }
    out.push({ ...river, samples, length: total });
  }
  return out;
}

const riverProfiles = buildProfiles();


function carveRivers() {
  for (const river of riverProfiles) {
    const half = river.width * 0.42;
    const outer = river.width * 1.55;
    const samples = river.samples;
    for (let i = 0; i < samples.length - 1; i++) {
      const a = samples[i];
      const b = samples[i + 1];
      const minX = Math.min(a.x, b.x) - outer;
      const maxX = Math.max(a.x, b.x) + outer;
      const minZ = Math.min(a.z, b.z) - outer;
      const maxZ = Math.max(a.z, b.z) + outer;
      const i0 = cellOf(minX);
      const i1 = cellOf(maxX);
      const j0 = cellOf(minZ);
      const j1 = cellOf(maxZ);
      const vx = b.x - a.x;
      const vz = b.z - a.z;
      const vlen2 = vx * vx + vz * vz || 1;
      for (let j = j0; j <= j1; j++) {
        const z = gridZ(j);
        for (let i = i0; i <= i1; i++) {
          const x = gridX(i);
          const t = clamp(((x - a.x) * vx + (z - a.z) * vz) / vlen2, 0, 1);
          const px = a.x + vx * t;
          const pz = a.z + vz * t;
          const d = Math.hypot(x - px, z - pz);
          if (d > outer) continue;
          const level = a.level + (b.level - a.level) * t;
          const bed = level - river.depth;
          const shore = bed + river.depth * 0.95;
          const idx = j * GRID_N + i;
          const h = heightGrid[idx];
          // koryto nie może się wcinać głęboko poniżej miejscowego terenu —
          // inaczej na stromym zboczu powstaje kanion zamiast dolinki
          const floor = baseGridCopy[idx] - (river.depth + 2.6);
          if (d <= half) {
            heightGrid[idx] = Math.min(h, Math.max(bed, floor));
          } else {
            const t2 = smoothstep(half, outer, d);
            const target = Math.max(lerp(bed, shore, t2), floor);
            heightGrid[idx] = Math.min(h, target);
          }
        }
      }
    }
  }

  // jeziora: misa z płaskim dnem i uszczelnioną groblą. Dla każdego kierunku
  // szukamy miejsca, w którym naturalny teren wznosi się ponad taflę — i tylko
  // do niego dociągamy groblę, więc woda nigdy nie „wycieka” po zboczu.
  for (const lake of LAKES) {
    const RAYS = 84;
    const MAX_D = lake.r * 4.2;
    const closeAt = new Float32Array(RAYS).fill(MAX_D);
    for (let k = 0; k < RAYS; k++) {
      const a = (k / RAYS) * Math.PI * 2;
      const dx = Math.cos(a);
      const dz = Math.sin(a);
      for (let d = lake.r * 0.9; d <= MAX_D; d += 5) {
        if (heightAtRaw(dx * d + lake.x, dz * d + lake.z) >= lake.level + 0.45) {
          closeAt[k] = d;
          break;
        }
      }
    }
    const reach = MAX_D + 40;
    const i0 = cellOf(lake.x - reach);
    const i1 = cellOf(lake.x + reach);
    const j0 = cellOf(lake.z - reach);
    const j1 = cellOf(lake.z + reach);
    for (let j = j0; j <= j1; j++) {
      const z = gridZ(j);
      for (let i = i0; i <= i1; i++) {
        const x = gridX(i);
        const dx = x - lake.x;
        const dz = z - lake.z;
        const d = Math.hypot(dx, dz);
        if (d > reach) continue;
        const idx = j * GRID_N + i;
        const h = heightGrid[idx];
        if (d <= lake.inner) {
          heightGrid[idx] = lake.bed;
          continue;
        }
        if (d <= lake.r) {
          const t = (d - lake.inner) / Math.max(1, lake.r - lake.inner);
          heightGrid[idx] = lerp(lake.bed, lake.level + 0.25, smoothstep(0.12, 1, t));
          continue;
        }
        const k = Math.round((((Math.atan2(dz, dx) + Math.PI * 2) % (Math.PI * 2)) / (Math.PI * 2)) * RAYS) % RAYS;
        const damEnd = Math.min(closeAt[k], MAX_D);
        if (d <= damEnd) {
          const t = (d - lake.r) / Math.max(1, damEnd - lake.r);
          heightGrid[idx] = Math.max(h, lerp(lake.level + 1.0, lake.level + 0.45, t));
        } else if (d <= damEnd + 45) {
          const t = smoothstep(0, 1, (d - damEnd) / 45);
          heightGrid[idx] = Math.max(h, lerp(lake.level + 0.45, h, t));
        }
      }
    }
  }
}

/** Tafla wody rzek — wyeksportowana, żeby świat mógł zbudować wstęgę. */
function buildRiverSurfaces() {
  return riverProfiles.map((r) => {
    const points = r.samples.map((smp) => ({
      x: smp.x,
      z: smp.z,
      y: heightAt(smp.x, smp.z) + r.depth * 0.8,
    }));
    // wygładzenie tafli, żeby nie „schodkowała” po komórkach siatki
    for (let pass = 0; pass < 2; pass++) {
      for (let i = 1; i < points.length - 1; i++) {
        points[i].y = (points[i - 1].y + points[i].y * 2 + points[i + 1].y) / 4;
      }
    }
    // …ale tafla nigdy nie może zniknąć pod ziemią po wygładzeniu
    for (const pt of points) {
      pt.y = Math.max(pt.y, heightAt(pt.x, pt.z) + 0.12);
    }
    let minX = Infinity; let maxX = -Infinity;
    let minZ = Infinity; let maxZ = -Infinity;
    for (const pt of points) {
      minX = Math.min(minX, pt.x); maxX = Math.max(maxX, pt.x);
      minZ = Math.min(minZ, pt.z); maxZ = Math.max(maxZ, pt.z);
    }
    const pad = r.width * 2;
    // indeks przestrzenny segmentów (siatka 60 m), żeby zapytania o wodę
    // w dowolnym punkcie mapy nie przeglądały całej rzeki
    const CELL = 60;
    const buckets = new Map();
    const keyOf = (x, z) => `${Math.floor(x / CELL)},${Math.floor(z / CELL)}`;
    for (let i = 0; i < points.length - 1; i++) {
      const k = keyOf(points[i].x, points[i].z);
      let arr = buckets.get(k);
      if (!arr) buckets.set(k, (arr = []));
      arr.push(i);
    }
    return {
      name: r.name,
      width: r.width,
      depth: r.depth,
      points,
      buckets,
      cellSize: CELL,
      minX: minX - pad, maxX: maxX + pad, minZ: minZ - pad, maxZ: maxZ + pad,
    };
  });
}

const baseGridCopy = Float32Array.from(heightGrid);
function heightAtRaw(x, z) {
  const i = clamp(Math.round(((x + WORLD_RADIUS) / WORLD_SIZE) * GRID_SEG), 0, GRID_SEG);
  const j = clamp(Math.round(((z + WORLD_RADIUS) / WORLD_SIZE) * GRID_SEG), 0, GRID_SEG);
  return baseGridCopy[j * GRID_N + i];
}

carveRivers();
export const RIVER_SURFACES = buildRiverSurfaces();
export const LAKE_SURFACES = LAKES.map((l) => ({
  name: l.name, x: l.x, z: l.z, r: l.r, level: l.level,
}));
export const terrainBuildTime = performance.now() - gridStart;

/**
 * Wysokość terenu — interpolacja po DOKŁADNIE tych samych trójkątach, z których
 * zbudowana jest siatka. Dzięki temu stopy, koła i kolizje siedzą na ziemi,
 * a nie 20 cm nad nią (wcześniej: interpolacja dwuliniowa ≠ triangulacja).
 */
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
  if (tx + tz <= 1) {
    return h00 + tx * (h10 - h00) + tz * (h01 - h00);
  }
  return h11 + (1 - tx) * (h01 - h11) + (1 - tz) * (h10 - h11);
}

export function slopeAt(x, z) {
  const e = 6;
  const hx = heightAt(x + e, z) - heightAt(x - e, z);
  const hz = heightAt(x, z + e) - heightAt(x, z - e);
  return Math.hypot(hx, hz) / (2 * e);
}

/** Poziom tafli wody w danym punkcie (morze, jezioro albo rzeka). */
export function waterLevelAt(x, z) {
  let level = WATER_LEVEL;
  for (const l of LAKE_SURFACES) {
    if (l.level <= WATER_LEVEL + 0.2) continue;
    const d = dist2(x, z, l.x, l.z);
    if (d < l.r * 1.02) level = Math.max(level, l.level);
  }
  for (const r of RIVER_SURFACES) {
    if (x < r.minX || x > r.maxX || z < r.minZ || z > r.maxZ) continue;
    const s = surfaceOnRiver(r, x, z);
    if (s && s.y > level) level = s.y;
  }
  return level;
}

/** Czy w tym miejscu jest woda (morze, jezioro, rzeka albo bagno). */
export function isWater(x, z) {
  return heightAt(x, z) < waterLevelAt(x, z) - 0.05;
}

/** Głębokość wody (0 = sucho). */
export function waterDepth(x, z) {
  return Math.max(0, waterLevelAt(x, z) - heightAt(x, z));
}

export function isSea(x, z) {
  return Math.hypot(x, z) > COAST_RADIUS - 60 && isWater(x, z);
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
  seaFloor: new THREE.Color('#3b4a4a'),
};

const tmpC = new THREE.Color();
const tmpC2 = new THREE.Color();

const BIOME = {
  temperate: {
    grass: new THREE.Color('#5d7f42'), grassDark: new THREE.Color('#415f31'),
    meadow: new THREE.Color('#8aa062'), dry: new THREE.Color('#a8a066'),
    rock: new THREE.Color('#84817a'), rockDark: new THREE.Color('#5e5d58'),
    sand: new THREE.Color('#9c8f68'),
  },
  desert: {
    grass: new THREE.Color('#c2a06a'), grassDark: new THREE.Color('#a8874f'),
    meadow: new THREE.Color('#d9c08c'), dry: new THREE.Color('#e0cb9c'),
    rock: new THREE.Color('#a2663f'), rockDark: new THREE.Color('#7a4529'),
    sand: new THREE.Color('#dcbe86'),
  },
  savanna: {
    grass: new THREE.Color('#8f8a4e'), grassDark: new THREE.Color('#6d6a3a'),
    meadow: new THREE.Color('#b3a566'), dry: new THREE.Color('#c9b97a'),
    rock: new THREE.Color('#8b7a63'), rockDark: new THREE.Color('#6a5a48'),
    sand: new THREE.Color('#b7a071'),
  },
  ice: {
    grass: new THREE.Color('#8d9c93'), grassDark: new THREE.Color('#6d7b74'),
    meadow: new THREE.Color('#c3cec9'), dry: new THREE.Color('#dbe4e2'),
    rock: new THREE.Color('#7b858b'), rockDark: new THREE.Color('#565f66'),
    sand: new THREE.Color('#c8cfca'),
  },
};

const accent = new THREE.Color();
const rockTmp = new THREE.Color();

/**
 * Kolor terenu: biom × nachylenie × wysokość.
 * Skały są teraz widoczne od łagodniejszych zboczy (0,38) — w górach dominuje
 * kamień, żwir i odsłonięte granie, a nie jednolita trawa, jak dotąd.
 */
export function terrainColorAt(x, z, h, slope, out = tmpC) {
  const S = WORLD_SCALE;
  const H = HEIGHT_SCALE;
  const w = biomeWeights(x, z);
  const forest = forestMask(x, z);
  const n = fbm(x * 0.09 + 5, z * 0.09 - 2, 3) * 0.5 + 0.5;
  const n2 = fbm(x * 0.028 - 9, z * 0.03 + 3, 2) * 0.5 + 0.5;

  // ---- baza: mieszanka palet biomów -------------------------------------
  out.setRGB(0, 0, 0);
  let total = 0;
  for (const key of ['temperate', 'desert', 'savanna', 'ice']) {
    const ww = key === 'temperate' ? w.temperate : w[key];
    if (ww <= 0.001) continue;
    const pal = BIOME[key];
    accent.copy(pal.grass).lerp(pal.meadow, n).lerp(pal.dry, n2 * 0.5);
    const patch = fbm(x * 0.006 - 21.5, z * 0.006 + 4.7, 3) * 0.5 + 0.5;
    accent.lerp(pal.grassDark, smoothstep(0.32, 0.72, patch) * 0.5);
    out.r += accent.r * ww;
    out.g += accent.g * ww;
    out.b += accent.b * ww;
    total += ww;
  }
  if (total > 0) out.multiplyScalar(1 / total);

  // las i bagno tylko na umiarkowanym terenie
  if (w.temperate > 0.2 && forest > 0.42) {
    out.lerp(C.forest, smoothstep(0.42, 0.85, forest) * 0.8 * w.temperate);
  }
  if (w.swamp > 0.01) out.lerp(C.mud, w.swamp * 0.85);

  const pathD = distanceToPath(x, z);
  if (pathD < 7.8) out.lerp(C.dirt, smoothstep(7.8, 2.0, pathD) * 0.7);

  // ---- skały: zbocza, żwir i granie -------------------------------------
  const pal = w.desert > 0.5 ? BIOME.desert : w.ice > 0.5 ? BIOME.ice : w.savanna > 0.5 ? BIOME.savanna : BIOME.temperate;
  if (slope > 0.38) {
    rockTmp.copy(pal.rock);
    out.lerp(rockTmp, smoothstep(0.38, 1.25, slope) * 0.88);
  }
  if (slope > 1.1) out.lerp(pal.rockDark, smoothstep(1.1, 2.3, slope) * 0.7);
  const rockLine = 96 * H;
  if (h > rockLine) out.lerp(pal.rock, smoothstep(rockLine, 150 * H, h) * 0.8);
  // żwir i piarg pod ścianami — szum o wysokiej częstotliwości
  const scree = fbm(x * 0.12 + 44.1, z * 0.12 - 17.3, 3) * 0.5 + 0.5;
  if (slope > 0.55 && scree > 0.55) out.lerp(pal.rockDark, smoothstep(0.55, 0.9, scree) * 0.35);

  // popiół wokół starożytnej kuźni
  const df = dist2(x, z, LOCATIONS.forge.x, LOCATIONS.forge.z);
  if (df < 30 * S) out.lerp(C.ash, smoothstep(30 * S, 10 * S, df) * 0.55);

  // ---- śnieg: wysoko i w tundrze (na pustyni i sawannie nie ma śniegu) ---
  const snowAllowed = clamp(w.ice + w.temperate * 0.92 + w.savanna * 0.12, 0, 1);
  const snowLine = (150 + n2 * 26) * H - w.ice * 130;
  if (w.ice > 0.15 && slope < 1.7) out.lerp(C.snow, w.ice * 0.7);
  if (h > snowLine && snowAllowed > 0.15) {
    out.lerp(C.snow, smoothstep(snowLine, snowLine + 26 * H, h) * (1 - smoothstep(2.2, 3.4, slope)) * snowAllowed);
  }
  if (h > snowLine + 22 * H && snowAllowed > 0.2) {
    out.lerp(C.snow, 0.45 * (1 - smoothstep(2.6, 3.6, slope)) * snowAllowed);
  }

  // ---- wybrzeże: piach, mokry piach i dno morskie -----------------------
  const beachTop = WATER_LEVEL + 2.6;
  if (h < beachTop) out.lerp(C.sand, smoothstep(beachTop, WATER_LEVEL - 1.4, h) * 0.88);
  if (h < WATER_LEVEL - 2.5) out.lerp(C.seaFloor, smoothstep(WATER_LEVEL - 2.5, WATER_LEVEL - 22, h) * 0.92);

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
  const skirtDrop = step * 1.05 + 2.5;
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
    this.updatesPerFrame = 2;
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
    if (d < 300) return 32; // 7,8 m (siatka wysokości ma 8 m, więcej nie da)
    if (d < 620) return 16; // 15,6 m
    return 8; // 31 m
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
      this.ensureChunk(chunk, d < 340 ? 32 : 8);
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
// WODA
// Jedna wielka tafla pokrywa całą krainę: morze opasujące ląd, jezioro i oczka
// na bagnie są częścią tej samej powierzchni, więc nie ma szwów ani z-fightingu.
// Fale liczone są na CPU (kilkanaście tysięcy wierzchołków), a normalne
// odświeżane co kilka klatek — wygląda jak woda, a nie jak lustro.
// ---------------------------------------------------------------------------
const SEA_SEGMENTS = 112;

function buildSeaGeometry() {
  const span = WORLD_RADIUS * 2.9;
  const geo = new THREE.PlaneGeometry(span, span, SEA_SEGMENTS, SEA_SEGMENTS);
  geo.rotateX(-Math.PI / 2);
  return geo;
}

/**
 * Piana przy linii brzegowej morza i wysp.
 * Promienie idą z zewnątrz do środka — pierwsze zetknięcie z lądem to brzeg.
 */
function buildCoastFoam() {
  const RAYS = 620;
  const positions = [];
  const colors = [];
  const indices = [];
  const white = new THREE.Color('#eaf6f8');
  const foam = new THREE.Color('#9fc6cd');
  const tmp = new THREE.Color();
  const ring = [];

  for (let k = 0; k < RAYS; k++) {
    const a = (k / RAYS) * Math.PI * 2;
    const dx = Math.cos(a);
    const dz = Math.sin(a);
    let hit = -1;
    let prev = WATER_LEVEL - 8;
    for (let r = WORLD_RADIUS * 0.99; r > 60; r -= 7) {
      const h = heightAt(dx * r, dz * r);
      if (h > WATER_LEVEL - 0.35) {
        // doprecyzowanie metodą połowienia
        let lo = r;
        let hi = r + 7;
        for (let it = 0; it < 6; it++) {
          const mid = (lo + hi) * 0.5;
          if (heightAt(dx * mid, dz * mid) > WATER_LEVEL - 0.35) lo = mid;
          else hi = mid;
        }
        hit = lo;
        prev = hi;
        break;
      }
    }
    if (hit < 0) {
      ring.push(null);
      continue;
    }
    const inner = hit - 2.2;
    const outer = prev + 13;
    const base = positions.length / 3;
    positions.push(dx * outer, 0, dz * outer, dx * inner, 0, dz * inner);
    tmp.copy(white).lerp(foam, 0.15);
    colors.push(tmp.r, tmp.g, tmp.b);
    tmp.copy(foam).multiplyScalar(0.82);
    colors.push(tmp.r, tmp.g, tmp.b);
    ring.push({ outer, inner, base });
  }

  for (let k = 0; k < RAYS; k++) {
    const a = ring[k];
    const b = ring[(k + 1) % RAYS];
    if (!a || !b) continue;
    indices.push(a.base, a.base + 1, b.base, b.base, a.base + 1, b.base + 1);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  geo.computeBoundingSphere();
  return geo;
}

/** Piana wokół jeziora i mokradeł — lokalna siatka wokół środka zbiornika. */
function buildBasinFoam(cx, cz, span, cell) {
  const n = Math.ceil((span * 2) / cell) + 1;
  const x0 = cx - span;
  const z0 = cz - span;
  const shallow = 1.8;
  const depth = new Float32Array(n * n);
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      depth[j * n + i] = WATER_LEVEL - heightAt(x0 + i * cell, z0 + j * cell);
    }
  }
  const positions = [];
  const colors = [];
  const indices = [];
  const water = new THREE.Color('#2f6579');
  const white = new THREE.Color('#e8f6f8');
  const tmp = new THREE.Color();
  const map = new Int32Array(n * n).fill(-1);
  const pushVert = (i, j) => {
    const k = j * n + i;
    if (map[k] >= 0) return map[k];
    const d = depth[k];
    const t = Math.max(0, Math.min(1, d / shallow));
    tmp.copy(white).lerp(water, t);
    const idx = positions.length / 3;
    positions.push(x0 + i * cell, 0, z0 + j * cell);
    colors.push(tmp.r, tmp.g, tmp.b);
    map[k] = idx;
    return idx;
  };
  for (let j = 0; j < n - 1; j++) {
    for (let i = 0; i < n - 1; i++) {
      const d00 = depth[j * n + i];
      const d10 = depth[j * n + i + 1];
      const d01 = depth[(j + 1) * n + i];
      const d11 = depth[(j + 1) * n + i + 1];
      const maxD = Math.max(d00, d10, d01, d11);
      const minD = Math.min(d00, d10, d01, d11);
      if (maxD <= 0.02 || minD > shallow) continue;
      const a = pushVert(i, j);
      const b = pushVert(i + 1, j);
      const c = pushVert(i, j + 1);
      const d = pushVert(i + 1, j + 1);
      indices.push(a, c, b, b, c, d);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  geo.computeBoundingSphere();
  return geo;
}

export function createWater() {
  const group = new THREE.Group();
  group.name = 'water';

  const seaMat = new THREE.MeshStandardMaterial({
    color: '#28576e',
    transparent: true,
    opacity: 0.9,
    roughness: 0.2,
    metalness: 0.22,
    flatShading: false,
  });
  seaMat.side = THREE.DoubleSide;

  const seaGeo = buildSeaGeometry();
  const sea = new THREE.Mesh(seaGeo, seaMat);
  sea.position.y = WATER_LEVEL;
  sea.name = 'sea';
  sea.receiveShadow = false;
  group.add(sea);

  const foamMat = new THREE.MeshBasicMaterial({
    color: '#ffffff',
    vertexColors: true,
    transparent: true,
    opacity: 0.46,
    depthWrite: false,
  });
  const coastFoam = new THREE.Mesh(buildCoastFoam(), foamMat);
  coastFoam.position.y = WATER_LEVEL + 0.09;
  coastFoam.name = 'coast-foam';
  group.add(coastFoam);

  const lakeFoam = new THREE.Mesh(
    buildBasinFoam(LOCATIONS.lake.x, LOCATIONS.lake.z, 190 * WORLD_SCALE, 12),
    foamMat
  );
  lakeFoam.position.y = WATER_LEVEL + 0.1;
  group.add(lakeFoam);

  const swampBase = heightAt(LOCATIONS.swamp.x, LOCATIONS.swamp.z);
  const swampFoam = new THREE.Mesh(
    buildBasinFoam(LOCATIONS.swamp.x, LOCATIONS.swamp.z, 150 * WORLD_SCALE, 14),
    foamMat
  );
  swampFoam.position.y = Math.max(swampBase + 0.3, WATER_LEVEL + 0.06);
  group.add(swampFoam);

  // ---- rzeki i jeziora ----------------------------------------------------
  // Tafla rzek to wstęga wodna prowadzona po osi koryta; jeziora dostają
  // własne tafle tam, gdzie leżą wyżej niż morze (górskie stawy i oczka).
  const freshMat = new THREE.MeshStandardMaterial({
    color: '#2e6472',
    transparent: true,
    opacity: 0.84,
    roughness: 0.14,
    metalness: 0.28,
    vertexColors: true,
    side: THREE.DoubleSide,
  });
  const fresh = new THREE.Group();
  fresh.name = 'fresh-water';
  group.add(fresh);
  const freshSurfaces = [];

  const RIVER_ACROSS = 5;
  for (const river of RIVER_SURFACES) {
    const pts = river.points;
    const half = river.width * 1.12;
    const positions = [];
    const colors = [];
    const indices = [];
    const phases = [];
    const baseY = [];
    const deepColor = new THREE.Color('#22525f');
    const edgeColor = new THREE.Color('#a9d6d6');
    const tmp = new THREE.Color();
    let dist = 0;
    for (let i = 0; i < pts.length; i++) {
      const prev = pts[Math.max(0, i - 1)];
      const nextP = pts[Math.min(pts.length - 1, i + 1)];
      let tx = nextP.x - prev.x;
      let tz = nextP.z - prev.z;
      const len = Math.hypot(tx, tz) || 1;
      tx /= len;
      tz /= len;
      const nx = -tz;
      const nz = tx;
      const p = pts[i];
      if (i > 0) dist += Math.hypot(p.x - pts[i - 1].x, p.z - pts[i - 1].z);
      // źródło i ujście zwężają się łagodnie
      const fade = Math.min(1, Math.min(i, pts.length - 1 - i) / 5);
      const w = half * (0.5 + 0.5 * fade);
      for (let k = 0; k <= RIVER_ACROSS; k++) {
        const u = (k / RIVER_ACROSS) * 2 - 1;
        const x = p.x + nx * u * w;
        const z = p.z + nz * u * w;
        const y = p.y + 0.06 * (1 - u * u) - 0.45 * Math.pow(Math.abs(u), 3);
        positions.push(x, y, z);
        baseY.push(y);
        phases.push(dist * 0.32 + u * 1.7);
        tmp.copy(deepColor).lerp(edgeColor, Math.pow(Math.abs(u), 3));
        colors.push(tmp.r, tmp.g, tmp.b);
      }
    }
    const stride = RIVER_ACROSS + 1;
    for (let i = 0; i < pts.length - 1; i++) {
      for (let k = 0; k < RIVER_ACROSS; k++) {
        const a = i * stride + k;
        const b = a + 1;
        const c = a + stride;
        const d = c + 1;
        indices.push(a, c, b, b, c, d);
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    const mesh = new THREE.Mesh(geo, freshMat);
    mesh.name = `river-${river.name}`;
    mesh.receiveShadow = false;
    fresh.add(mesh);
    freshSurfaces.push({
      mesh,
      kind: 'river',
      baseY: Float32Array.from(baseY),
      phases: Float32Array.from(phases),
      width: river.width,
      colors: geo.attributes.color,
      baseColors: Float32Array.from(colors),
    });
  }

  const LAKE_RINGS = 7;
  const LAKE_SEG = 56;
  for (const lake of LAKE_SURFACES) {
    if (lake.level <= WATER_LEVEL + 1.5) continue; // morze już ją przykrywa
    const positions = [];
    const colors = [];
    const indices = [];
    const phases = [];
    const baseY = [];
    const deepColor = new THREE.Color('#1f4a56');
    const edgeColor = new THREE.Color('#9fcbcb');
    const tmp = new THREE.Color();
    for (let r = 0; r <= LAKE_RINGS; r++) {
      const rad = (r / LAKE_RINGS) * lake.r * 0.98;
      for (let a = 0; a < LAKE_SEG; a++) {
        const ang = (a / LAKE_SEG) * Math.PI * 2;
        positions.push(lake.x + Math.cos(ang) * rad, lake.level, lake.z + Math.sin(ang) * rad);
        baseY.push(lake.level);
        phases.push(rad * 0.22 + ang * 1.3);
        tmp.copy(deepColor).lerp(edgeColor, Math.pow(r / LAKE_RINGS, 2.6));
        colors.push(tmp.r, tmp.g, tmp.b);
      }
    }
    for (let r = 0; r < LAKE_RINGS; r++) {
      for (let a = 0; a < LAKE_SEG; a++) {
        const a2 = (a + 1) % LAKE_SEG;
        const i0 = r * LAKE_SEG + a;
        const i1 = r * LAKE_SEG + a2;
        const i2 = (r + 1) * LAKE_SEG + a;
        const i3 = (r + 1) * LAKE_SEG + a2;
        indices.push(i0, i2, i1, i1, i2, i3);
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    const mesh = new THREE.Mesh(geo, freshMat);
    mesh.name = `lake-${lake.name}`;
    fresh.add(mesh);
    freshSurfaces.push({
      mesh,
      kind: 'lake',
      baseY: Float32Array.from(baseY),
      phases: Float32Array.from(phases),
      colors: geo.attributes.color,
      baseColors: Float32Array.from(colors),
    });
  }

  let freshTime = 0;
  const updateFresh = (dt) => {
    freshTime += dt;
    for (const srf of freshSurfaces) {
      const posAttr = srf.mesh.geometry.attributes.position;
      const arr = posAttr.array;
      const amp = srf.kind === 'river' ? 0.035 : 0.05;
      for (let i = 0; i < srf.baseY.length; i++) {
        arr[i * 3 + 1] = srf.baseY[i] + Math.sin(freshTime * 1.9 + srf.phases[i]) * amp;
      }
      posAttr.needsUpdate = true;
      // ruchome smugi — jasna „piana” pełznąca z nurtem
      const col = srf.colors;
      const baseCol = srf.baseColors;
      for (let i = 0; i < srf.baseY.length; i++) {
        const pulse = 0.5 + 0.5 * Math.sin(freshTime * 1.5 - srf.phases[i] * 1.6);
        const boost = srf.kind === 'river' ? pulse * 0.16 : pulse * 0.07;
        col.array[i * 3] = Math.min(1, baseCol[i * 3] + boost);
        col.array[i * 3 + 1] = Math.min(1, baseCol[i * 3 + 1] + boost);
        col.array[i * 3 + 2] = Math.min(1, baseCol[i * 3 + 2] + boost * 0.9);
      }
      col.needsUpdate = true;
    }
    freshMat.opacity = 0.83 + Math.sin(freshTime * 0.7) * 0.02;
  };

  // ---- fale ---------------------------------------------------------------
  const base = Float32Array.from(seaGeo.attributes.position.array);
  const pos = seaGeo.attributes.position;
  const wave = (x, z, t) =>
    Math.sin(x * 0.055 + t * 0.85) * 0.19 +
    Math.cos(z * 0.071 + t * 0.62) * 0.15 +
    Math.sin((x + z) * 0.021 + t * 1.31) * 0.24;
  // pochodne cząstkowe — normalna liczona wprost, bez przemiatania trójkątów
  const waveSlope = (x, z, t) => [
    Math.cos(x * 0.055 + t * 0.85) * 0.19 * 0.055 +
      Math.cos((x + z) * 0.021 + t * 1.31) * 0.24 * 0.021,
    -Math.sin(z * 0.071 + t * 0.62) * 0.15 * 0.071 +
      Math.cos((x + z) * 0.021 + t * 1.31) * 0.24 * 0.021,
  ];

  const nrm = seaGeo.attributes.normal;
  const refreshNormals = (t) => {
    for (let i = 0; i < pos.count; i++) {
      const [dx, dz] = waveSlope(base[i * 3], base[i * 3 + 2], t);
      const len = Math.hypot(dx, 1, dz) || 1;
      nrm.array[i * 3] = -dx / len;
      nrm.array[i * 3 + 1] = 1 / len;
      nrm.array[i * 3 + 2] = -dz / len;
    }
    nrm.needsUpdate = true;
  };
  for (let i = 0; i < pos.count; i++) {
    pos.array[i * 3 + 1] = wave(base[i * 3], base[i * 3 + 2], 0);
  }
  pos.needsUpdate = true;
  refreshNormals(0);

  let t = 0;
  let frame = 0;

  return {
    mesh: group,
    sea,
    level: WATER_LEVEL,
    update(dt) {
      t += dt;
      frame += 1;
      const arr = pos.array;
      for (let i = 0; i < pos.count; i++) {
        arr[i * 3 + 1] = wave(base[i * 3], base[i * 3 + 2], t);
      }
      pos.needsUpdate = true;
      if (frame % 2 === 0) refreshNormals(t);

      foamMat.opacity = 0.4 + Math.sin(t * 0.9) * 0.1 + Math.sin(t * 2.3) * 0.04;
      const lift = Math.sin(t * 0.9) * 0.03;
      coastFoam.position.y = WATER_LEVEL + 0.09 + lift;
      lakeFoam.position.y = WATER_LEVEL + 0.1 + lift;
      swampFoam.position.y = Math.max(swampBase + 0.3, WATER_LEVEL + 0.06) + lift;
      seaMat.opacity = 0.88 + Math.sin(t * 0.4) * 0.02;
      updateFresh(dt);
    },
  };
}


/** Odległość do najbliższej rzeki (w metrach świata, 0 = w korycie). */
export function distanceToRiver(x, z) {
  let best = Infinity;
  for (const r of RIVERS) {
    const d = distToPolyline(x, z, r.path);
    if (d < best) best = d;
  }
  return best;
}

/** Szerokość rzeki w danym miejscu (0 = poza korytem). */
export function riverWidthAt(x, z) {
  let best = null;
  for (const r of RIVERS) {
    const d = distToPolyline(x, z, r.path);
    if (!best || d < best.d) best = { d, r };
  }
  if (!best || best.d > best.r.width * 0.5) return 0;
  return best.r.width;
}

/** Najbliższy punkt tafli rzeki (null = poza rzeką). */
function surfaceOnRiver(river, x, z) {
  let best = null;
  const pts = river.points;
  const reach = river.width * 0.95;
  const cs = river.cellSize;
  const cx = Math.floor(x / cs);
  const cz = Math.floor(z / cs);
  const candidates = [];
  for (let ox = -1; ox <= 1; ox++) {
    for (let oz = -1; oz <= 1; oz++) {
      const arr = river.buckets.get(`${cx + ox},${cz + oz}`);
      if (arr) candidates.push(...arr);
    }
  }
  for (const i of candidates) {
    const a = pts[i];
    const b = pts[i + 1];
    const vx = b.x - a.x;
    const vz = b.z - a.z;
    const t = clamp(((x - a.x) * vx + (z - a.z) * vz) / (vx * vx + vz * vz || 1), 0, 1);
    const d = Math.hypot(x - (a.x + vx * t), z - (a.z + vz * t));
    if (d <= reach && (!best || d < best.d)) {
      best = { d, y: a.y + (b.y - a.y) * t, width: river.width, name: river.name };
    }
  }
  return best;
}

/** Czy gracz brodzi w strumieniu (ale nie w morzu ani jeziorze). */
export function isInRiver(x, z) {
  const w = riverWidthAt(x, z);
  return w > 0 && distanceToRiver(x, z) < w * 0.5;
}

/** Wysokość tafli rzeki w danym punkcie (null = poza rzeką). */
export function riverSurfaceAt(x, z) {
  let best = null;
  for (const r of RIVER_SURFACES) {
    if (x < r.minX || x > r.maxX || z < r.minZ || z > r.maxZ) continue;
    const hit = surfaceOnRiver(r, x, z);
    if (hit && (!best || hit.d < best.d)) best = hit;
  }
  return best;
}

/**
 * Przecięcia dróg z rzekami — tam stawiamy mosty.
 * Zwraca [{ x, z, angle, width }] w metrach świata.
 */
export function pathRiverCrossings() {
  const out = [];
  for (const [ax, az, bx, bz] of PATHS) {
    const vx = bx - ax;
    const vz = bz - az;
    for (const river of RIVERS) {
      const pts = river.path;
      for (let i = 0; i < pts.length - 1; i++) {
        const cx = pts[i][0];
        const cz = pts[i][1];
        const dx = pts[i + 1][0] - cx;
        const dz = pts[i + 1][1] - cz;
        const den = vx * dz - vz * dx;
        if (Math.abs(den) < 1e-6) continue;
        const t = ((cx - ax) * dz - (cz - az) * dx) / den;
        const u = ((cx - ax) * vz - (cz - az) * vx) / den;
        if (t < 0 || t > 1 || u < 0 || u > 1) continue;
        const x = ax + vx * t;
        const z = az + vz * t;
        if (out.some((o) => dist2(o.x, o.z, x, z) < 30)) continue;
        out.push({ x, z, angle: Math.atan2(vx, vz), width: river.width });
      }
    }
  }
  return out;
}
