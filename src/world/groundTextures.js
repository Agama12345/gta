// ---------------------------------------------------------------------------
// Tekstury podłoża generowane w kodzie (bez ani jednego pliku z sieci).
//
// Warstwa leży POD siatką terenu: kolor biomu dalej pochodzi z wierzchołków
// (palety biomów w `terrain.js`), a te tekstury dodają prawdziwą strukturę
// bliskiego planu — źdźbła trawy, ubity grunt kolein, spękaną skałę i ziarno
// piasku. Wszystko jest okresowe (kafel bez szwów) i liczone raz przy starcie
// gry w czystym JS, więc działa też bez canvasu 2D (testy, jsdom).
// ---------------------------------------------------------------------------

const TAU = Math.PI * 2;

/** Szybki hash 2D → [0, 1). Okresowość zapewnia zawijanie współrzędnych. */
function hash2i(x, y, seed) {
  let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263) ^ Math.imul(seed | 0, 2246822519);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

/** Deterministyczny generator losowy (mulberry32). */
export function makeRng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Szum wartościowy na siatce o zadanym okresie (kafel bez szwów). */
function vnoise(x, y, period, seed) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const p = Math.max(1, period | 0);
  const w = (n) => ((n % p) + p) % p;
  const x0 = w(xi);
  const x1 = w(xi + 1);
  const y0 = w(yi);
  const y1 = w(yi + 1);
  const a = hash2i(x0, y0, seed);
  const b = hash2i(x1, y0, seed);
  const c = hash2i(x0, y1, seed);
  const d = hash2i(x1, y1, seed);
  const ab = a + (b - a) * u;
  const cd = c + (d - c) * u;
  return ab + (cd - ab) * v;
}

/** Wielooktawowy szum okresowy. `period` w komórkach siatki. */
function pfbm(x, y, period, octaves, seed, gain = 0.5) {
  let sum = 0;
  let amp = 1;
  let norm = 0;
  let p = period;
  let fx = x * period;
  let fy = y * period;
  for (let i = 0; i < octaves; i++) {
    sum += vnoise(fx, fy, p, seed + i * 131) * amp;
    norm += amp;
    amp *= gain;
    p *= 2;
    fx *= 2;
    fy *= 2;
  }
  return sum / norm;
}

/** Miękki punkt z zawijaniem na krawędziach tekstury. */
function blob(buf, size, cx, cy, r, value, strength) {
  const r2 = r * r;
  const x0 = Math.floor(cx - r);
  const x1 = Math.ceil(cx + r);
  const y0 = Math.floor(cy - r);
  const y1 = Math.ceil(cy + r);
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      const dx = x + 0.5 - cx;
      const dy = y + 0.5 - cy;
      const d2 = dx * dx + dy * dy;
      if (d2 > r2) continue;
      const fall = 1 - Math.sqrt(d2) / r;
      const w = fall * fall * strength;
      const ix = ((x % size) + size) % size;
      const iy = ((y % size) + size) % size;
      const k = iy * size + ix;
      buf[k] += (value - buf[k]) * w;
    }
  }
}

/** Twardy piksel (bez rozmycia) z zawijaniem — do cienkich źdźbeł i ziaren. */
function dot(buf, size, cx, cy, value, strength = 1) {
  const ix = ((Math.round(cx) % size) + size) % size;
  const iy = ((Math.round(cy) % size) + size) % size;
  const k = iy * size + ix;
  buf[k] += (value - buf[k]) * strength;
}

/**
 * Okresowa siatka Voronoi (F1, F2) — daje bloki skalne i ostre szczeliny
 * między nimi. Zwraca { f1, f2, cell }.
 */
function voronoi(u, v, cells, seed) {
  const x = u * cells;
  const y = v * cells;
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  let f1 = 9;
  let f2 = 9;
  let cell = 0;
  for (let oy = -1; oy <= 1; oy++) {
    for (let ox = -1; ox <= 1; ox++) {
      const gx = xi + ox;
      const gy = yi + oy;
      const wx = ((gx % cells) + cells) % cells;
      const wy = ((gy % cells) + cells) % cells;
      const px = gx + hash2i(wx, wy, seed);
      const py = gy + hash2i(wx, wy, seed + 7);
      const dx = px - x;
      const dy = py - y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < f1) {
        f2 = f1;
        f1 = d;
        cell = hash2i(wx, wy, seed + 13);
      } else if (d < f2) {
        f2 = d;
      }
    }
  }
  return { f1, f2, cell };
}

function clamp01(v) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

// ---------------------------------------------------------------------------
// TRAWA — gęste, ostre źdźbła, kępy i wyschnięte łaty.
// ---------------------------------------------------------------------------
function buildGrass(size, seed) {
  const rng = makeRng(seed);
  const n = size * size;
  const lum = new Float32Array(n);
  const hgt = new Float32Array(n);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const v = y / size;
      const clump = pfbm(u, v, 4, 3, 17);
      const mid = pfbm(u, v, 11, 3, 91);
      const fine = pfbm(u, v, 40, 2, 29);
      const dry = pfbm(u, v, 2, 2, 53);
      const idx = y * size + x;
      lum[idx] = clamp01(0.34 + clump * 0.16 + mid * 0.14 + (fine - 0.5) * 0.26 + Math.max(0, dry - 0.6) * 0.34);
      hgt[idx] = clamp01(0.22 + clump * 0.24 + mid * 0.2 + (fine - 0.5) * 0.3);
    }
  }

  // źdźbła: cienkie kreski, w większości pionowe, ostre (bez rozmycia)
  const blades = Math.round(size * 26);
  for (let i = 0; i < blades; i++) {
    const bx = rng() * size;
    const by = rng() * size;
    const len = size * (0.012 + rng() * 0.05);
    const ang = -Math.PI / 2 + (rng() - 0.5) * 1.5;
    const dx = Math.cos(ang);
    const dy = Math.sin(ang);
    const bright = rng() < 0.28 ? 0.24 + rng() * 0.18 : 0.45 + rng() * 0.45;
    const thick = rng() < 0.18 ? 1 : 0;
    const steps = Math.max(3, Math.round(len));
    const bend = (rng() - 0.5) * 2.2;
    for (let s = 0; s < steps; s++) {
      const t = s / steps;
      const px = bx + dx * len * t + bend * t * t;
      const py = by + dy * len * t;
      const val = bright * (0.72 + t * 0.55);
      dot(lum, size, px, py, val, 0.9);
      if (thick) dot(lum, size, px + 1, py, val, 0.55);
      dot(hgt, size, px, py, 0.3 + t * 0.75, 0.9);
    }
  }

  // kępki: rozetki z kilku krótkich źdźbeł w jednym miejscu
  const tufts = Math.round(size * 1.4);
  for (let i = 0; i < tufts; i++) {
    const cx = rng() * size;
    const cy = rng() * size;
    const count = 4 + Math.floor(rng() * 7);
    for (let b = 0; b < count; b++) {
      const ang = -Math.PI / 2 + (rng() - 0.5) * 2.2;
      const len = size * (0.014 + rng() * 0.03);
      const bright = 0.4 + rng() * 0.4;
      for (let s = 0; s < len; s += 1) {
        const t = s / len;
        dot(lum, size, cx + Math.cos(ang) * s, cy + Math.sin(ang) * s, bright * (0.8 + t * 0.4), 0.85);
        dot(hgt, size, cx + Math.cos(ang) * s, cy + Math.sin(ang) * s, 0.4 + t * 0.6, 0.85);
      }
    }
  }

  return { lum, hgt };
}

// ---------------------------------------------------------------------------
// GRUNT / DROGA — ubita ziemia, grudki, kamyki, spękania, koleiny.
// ---------------------------------------------------------------------------
function buildDirt(size, seed) {
  const rng = makeRng(seed);
  const n = size * size;
  const lum = new Float32Array(n);
  const hgt = new Float32Array(n);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const v = y / size;
      const base = pfbm(u, v, 6, 4, 23);
      const clods = pfbm(u, v, 18, 3, 47);
      const grain = pfbm(u, v, 60, 2, 77);
      const idx = y * size + x;
      lum[idx] = clamp01(0.40 + base * 0.24 + clods * 0.2 + (grain - 0.5) * 0.24);
      hgt[idx] = clamp01(0.28 + base * 0.28 + clods * 0.2 + (grain - 0.5) * 0.3);
    }
  }

  // koleiny — dwie ciemniejsze smugi biegnące wzdłuż osi Y kafla
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const wobble = (pfbm(0, y / size, 3, 2, 41) - 0.5) * 0.05;
      const d1 = Math.abs(u - (0.32 + wobble));
      const d2 = Math.abs(u - (0.68 + wobble));
      const rut = Math.exp(-(d1 * d1) / 0.0009) + Math.exp(-(d2 * d2) / 0.0009);
      const idx = y * size + x;
      lum[idx] = clamp01(lum[idx] - rut * 0.14);
      hgt[idx] = clamp01(hgt[idx] - rut * 0.2);
    }
  }

  // kamyki: jasny wierzch, ciemny cień z drugiej strony, twarda krawędź
  const pebbles = Math.round(size * 2.6);
  for (let i = 0; i < pebbles; i++) {
    const px = rng() * size;
    const py = rng() * size;
    const r = 0.7 + rng() * 2.6;
    const bright = 0.58 + rng() * 0.34;
    blob(hgt, size, px, py, r, 0.9, 0.95);
    blob(lum, size, px, py, r, bright, 0.92);
    blob(lum, size, px + r * 0.45, py + r * 0.55, r * 1.05, 0.26, 0.75);
    dot(lum, size, px - r * 0.3, py - r * 0.35, Math.min(1, bright + 0.18), 0.6);
  }

  // sucha ziemia: spękania i rysy
  for (let c = 0; c < 30; c++) {
    let cx = rng() * size;
    let cy = rng() * size;
    let ang = rng() * TAU;
    const seg = 6 + Math.floor(rng() * 12);
    for (let s = 0; s < seg; s++) {
      ang += (rng() - 0.5) * 0.9;
      const step = 1.2 + rng() * 2.4;
      cx += Math.cos(ang) * step;
      cy += Math.sin(ang) * step;
      dot(lum, size, cx, cy, 0.2, 0.55);
      dot(hgt, size, cx, cy, 0.02, 0.7);
    }
  }

  return { lum, hgt };
}

// ---------------------------------------------------------------------------
// SKAŁA — bloki skalne (Voronoi), szczeliny, warstwy i ziarno.
// ---------------------------------------------------------------------------
function buildRock(size, seed) {
  const rng = makeRng(seed);
  const n = size * size;
  const lum = new Float32Array(n);
  const hgt = new Float32Array(n);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const v = y / size;
      // zaburzenie domeny — bloki nie są foremnymi wielokątami
      const wu = u + (pfbm(u, v, 5, 2, 101) - 0.5) * 0.12;
      const wv = v + (pfbm(u, v, 5, 2, 211) - 0.5) * 0.12;
      const { f1, f2, cell } = voronoi(wu, wv, 15, 61);
      const widthNoise = pfbm(u, v, 12, 2, 303);
      const seamW = 0.05 + widthNoise * 0.14;
      const seam = clamp01((f2 - f1) / seamW); // 0 na szczelinie, 1 w środku bloku
      const grain = pfbm(u, v, 55, 3, 13);
      const patch = pfbm(u, v, 8, 3, 91);
      const idx = y * size + x;
      const blockTone = 0.36 + cell * 0.22 + patch * 0.16 + (grain - 0.5) * 0.24;
      const seamDark = 0.72 + 0.28 * seam;
      lum[idx] = clamp01((blockTone + 0.1) * seamDark);
      hgt[idx] = clamp01((0.55 + cell * 0.16 + (grain - 0.5) * 0.32) * (0.45 + 0.55 * seam));
    }
  }

  // warstwy skalne (delikatne, żeby nie wyglądało jak kordurka)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const v = y / size;
      const warp = (pfbm(u, v, 3, 3, 31) - 0.5) * 0.06;
      const band = Math.sin((v + warp + pfbm(u, v, 6, 2, 177) * 0.08) * TAU * 4) * 0.5 + 0.5;
      const idx = y * size + x;
      lum[idx] = clamp01(lum[idx] * (0.9 + band * 0.16));
      hgt[idx] = clamp01(hgt[idx] * (0.94 + band * 0.1));
    }
  }

  // spękania: łamane linie w poprzek bloków
  for (let c = 0; c < 40; c++) {
    let cx = rng() * size;
    let cy = rng() * size;
    let ang = rng() * TAU;
    const seg = 10 + Math.floor(rng() * 22);
    for (let s = 0; s < seg; s++) {
      ang += (rng() - 0.5) * 1.1;
      const step = 1.1 + rng() * 2.2;
      cx += Math.cos(ang) * step;
      cy += Math.sin(ang) * step;
      dot(lum, size, cx, cy, 0.14, 0.6);
      dot(hgt, size, cx, cy, 0.02, 0.75);
    }
  }

  // jasne odłamki kwarcu w szczelinach — drobne iskry
  for (let i = 0; i < size * 1.6; i++) {
    const px = rng() * size;
    const py = rng() * size;
    dot(lum, size, px, py, 0.82 + rng() * 0.16, 0.5);
  }

  return { lum, hgt };
}

// ---------------------------------------------------------------------------
// PIASEK / ŚNIEG — drobne ziarno i zmarszczki.
// ---------------------------------------------------------------------------
function buildSand(size, seed) {
  const rng = makeRng(seed);
  const n = size * size;
  const lum = new Float32Array(n);
  const hgt = new Float32Array(n);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const v = y / size;
      const warp = (pfbm(u, v, 4, 3, 71) - 0.5) * 0.16;
      const ripple = Math.sin((v + warp) * TAU * 9) * 0.5 + 0.5;
      const grain = pfbm(u, v, 70, 2, 19);
      const fine = pfbm(u, v, 150, 1, 83);
      const idx = y * size + x;
      lum[idx] = clamp01(0.46 + ripple * 0.12 + (grain - 0.5) * 0.3 + (fine - 0.5) * 0.2);
      hgt[idx] = clamp01(0.32 + ripple * 0.34 + (grain - 0.5) * 0.32 + (fine - 0.5) * 0.18);
    }
  }

  // pojedyncze grubsze ziarna i kamyczki
  for (let i = 0; i < size * 4; i++) {
    const px = rng() * size;
    const py = rng() * size;
    const bright = rng() > 0.45 ? 0.86 : 0.22;
    dot(lum, size, px, py, bright, 0.55);
    dot(hgt, size, px, py, bright, 0.5);
  }

  return { lum, hgt };
}

const TINTS = {
  grass: [0.93, 1.0, 0.82],
  dirt: [1.0, 0.95, 0.85],
  rock: [0.97, 0.98, 1.0],
  sand: [1.0, 0.96, 0.87],
};

/**
 * Liczy wszystkie warstwy podłoża.
 * Zwraca { grass, dirt, rock, sand } — każda z `lum` (kolor) i `hgt` (wysokość).
 */
export function buildGroundLayers(size = 512) {
  return {
    size,
    grass: buildGrass(size, 8101),
    dirt: buildDirt(size, 4423),
    rock: buildRock(size, 9377),
    sand: buildSand(size, 2711),
  };
}

/** Pakuje warstwę do RGBA (kolor) — wartości ~0,5 to poziom neutralny. */
export function layerToRGBA(layer, size, tint) {
  const out = new Uint8Array(size * size * 4);
  for (let i = 0; i < size * size; i++) {
    const l = clamp01(layer.lum[i]);
    out[i * 4] = Math.round(clamp01(l * tint[0]) * 255);
    out[i * 4 + 1] = Math.round(clamp01(l * tint[1]) * 255);
    out[i * 4 + 2] = Math.round(clamp01(l * tint[2]) * 255);
    out[i * 4 + 3] = 255;
  }
  return out;
}

/** Pakuje wysokość do RGBA (używane jako mapa bumpa). */
export function layerToHeightRGBA(layer, size) {
  const out = new Uint8Array(size * size * 4);
  for (let i = 0; i < size * size; i++) {
    const h = Math.round(clamp01(layer.hgt[i]) * 255);
    out[i * 4] = h;
    out[i * 4 + 1] = h;
    out[i * 4 + 2] = h;
    out[i * 4 + 3] = 255;
  }
  return out;
}

/** Średnia jasność i średnia wysokość warstwy — do normalizacji mnożnika w shaderze. */
export function layerStats(layer, size) {
  let sumL = 0;
  let sumH = 0;
  for (let i = 0; i < size * size; i++) {
    sumL += layer.lum[i];
    sumH += layer.hgt[i];
  }
  const n = size * size;
  return { lum: sumL / n, hgt: sumH / n };
}

export const GROUND_TINTS = TINTS;
