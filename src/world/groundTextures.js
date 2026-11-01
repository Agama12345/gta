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

/** Gładkie przejście 0→1 (odpowiednik GLSL-owego smoothstep). */
function smoothstep(a, b, x) {
  const t = clamp01((x - a) / (b - a || 1e-6));
  return t * t * (3 - 2 * t);
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
      const base = pfbm(u, v, 8, 4, 23);
      const clods = pfbm(u, v, 22, 3, 47);
      // Ostre ziarno. Bez niego ubita ziemia to rozmazana plama — a właśnie
      // ziarno (piasek, pył, okruchy) sprzedaje skalę bliskiego planu.
      const g1 = hash2i(x, y, 977);
      const g2 = hash2i(x + 17, y + 91, 331);
      const grain = g1 * 0.65 + g2 * 0.35;
      const idx = y * size + x;
      const mids = pfbm(u, v, 3, 3, 613);
      lum[idx] = clamp01(0.42 + base * 0.18 + (clods - 0.5) * 0.24 + (mids - 0.5) * 0.16 + (grain - 0.5) * 0.18);
      hgt[idx] = clamp01(0.30 + base * 0.22 + (clods - 0.5) * 0.32 + (grain - 0.5) * 0.26);
    }
  }

  // Grudki ziemi: jasny wierzchołek od góry, ciemny dołek pod spodem.
  // Rysowane przed kamykami, żeby kamyki leżały na wierzchu.
  const clumpCount = Math.round(size * 26);
  for (let i = 0; i < clumpCount; i++) {
    const cx = rng() * size;
    const cy = rng() * size;
    const r = 0.8 + rng() * 2.2;
    const bright = 0.5 + rng() * 0.2;
    blob(lum, size, cx - r * 0.3, cy - r * 0.4, r * 0.9, bright, 0.5);
    blob(lum, size, cx + r * 0.35, cy + r * 0.45, r * 1.1, bright - 0.22, 0.42);
    blob(hgt, size, cx, cy, r, 0.62 + rng() * 0.2, 0.5);
  }

  // Kamyki: twarda krawędź, jasny czubek, krótki cień po prawej-dolnej stronie.
  // Wielkość liczona od kafla: 1 px to ~1,2 cm, więc kamień 3–6 cm ma
  // promień 1,5–2,5 px, a otoczak 10 cm — 4 px. Skupiamy je w łatach żwiru,
  // bo równomiernie rozsypane ziarna wyglądają jak szum, nie jak kamienie.
  for (let i = 0; i < Math.round(size * 3.2); i++) {
    const px = rng() * size;
    const py = rng() * size;
    const patch = pfbm(px / size, py / size, 5, 2, 733);
    if (patch < 0.52 && rng() > 0.18) continue;
    const r = 1.3 + rng() * 2.6 + (patch > 0.7 ? 1.2 : 0);
    const bright = 0.6 + rng() * 0.32;
    blob(hgt, size, px, py, r, 0.95, 0.95);
    blob(lum, size, px, py, r * 0.94, bright, 0.9);
    blob(lum, size, px - r * 0.3, py - r * 0.34, r * 0.55, Math.min(1, bright + 0.22), 0.65);
    blob(lum, size, px + r * 0.85, py + r * 0.95, r * 1.05, 0.14, 0.7);
    blob(hgt, size, px + r * 0.85, py + r * 0.95, r * 1.2, 0.2, 0.5);
  }

  // Spękania: ciągła linia z jasną krawędzią (ziemia jest uniesiona obok rysy).
  const drawCrack = (cx0, cy0, ang0, segs, width) => {
    let cx = cx0;
    let cy = cy0;
    let ang = ang0;
    let left = segs * 3;
    while (left-- > 0) {
      ang += (rng() - 0.5) * 0.55;
      const step = 0.6;
      const nx = cx + Math.cos(ang) * step;
      const ny = cy + Math.sin(ang) * step;
      for (let w = 0; w <= width; w++) {
        dot(lum, size, nx + Math.cos(ang + 1.57) * w, ny + Math.sin(ang + 1.57) * w, 0.28, 0.6);
        dot(hgt, size, nx + Math.cos(ang + 1.57) * w, ny + Math.sin(ang + 1.57) * w, 0.08, 0.7);
      }
      dot(lum, size, nx - Math.cos(ang + 1.57) * (width + 1.5), ny - Math.sin(ang + 1.57) * (width + 1.5), 0.7, 0.45);
      cx = nx;
      cy = ny;
    }
  };
  for (let c = 0; c < Math.round(size / 16); c++) {
    drawCrack(rng() * size, rng() * size, rng() * TAU, 4 + Math.floor(rng() * 9), rng() < 0.3 ? 1 : 0);
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

  // Skała = warstwy osadowe. Pięć pasów przez kafel, każdy z własnym
  // odcieniem, ostrym górnym załamaniem i cieniem tuż pod nim. Do tego
  // zerodowana krawędź (szum) i pęknięcia — dzięki temu czyta się jak lico
  // skalne, a nie jak siatka bąbelków.
  const BANDS = 5;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const v = y / size;
      // Krawędź warstwy: załamana, z ostrymi "zębami" (ridged noise), a nie
      // gładka fala — inaczej skała wygląda jak ułożona z miękkich plastrów.
      const ridgeRaw = pfbm(u, v, 5, 3, 101);
      const ridged = 1 - Math.abs(2 * ridgeRaw - 1);
      const wob = (ridgeRaw - 0.5) * 0.4 + (ridged - 0.5) * 0.35;
      const fine = (pfbm(u, v, 24, 2, 211) - 0.5) * 0.14;
      const bands = v * BANDS + wob + fine + u * 0.35;
      const f = bands - Math.floor(bands);
      const bandIndex = ((Math.floor(bands) % BANDS) + BANDS) % BANDS;
      const bandTone = hash2i(0, bandIndex, 5501);
      // Załamanie: dolna część pasa to zacieniony uskok, górna — oświetlone lico.
      const ledge = smoothstep(0.0, 0.45, f);
      const crevice = Math.exp(-((f - 0.02) * (f - 0.02)) / 0.0012);
      // Erozja w poprzek warstw — nieregularne wżery.
      const erode = pfbm(u, v, 12, 3, 419);
      const pitted = smoothstep(0.42, 0.5, erode);
      const sp = hash2i(x, y, 733);
      const speck = sp > 0.985 ? 0.18 : sp < 0.015 ? -0.16 : 0;
      const grain = (hash2i(x + 5, y + 3, 907) - 0.5) * 0.1;
      const blotch = (pfbm(u, v, 3, 2, 631) - 0.5) * 0.16;
      const idx = y * size + x;

      // Wewnątrz warstwy: łuski i wykruszenia w skali kilkunastu centymetrów.
      const chisel = (pfbm(u, v, 16, 3, 887) - 0.5) * 0.2;
      const mineral = smoothstep(0.55, 0.75, pfbm(u, v, 8, 2, 967)) * 0.12;
      let l = 0.44 + bandTone * 0.24 + ledge * 0.26 - crevice * 0.26 - pitted * 0.1
        + blotch + chisel + mineral + speck + grain;
      lum[idx] = clamp01(l);
      hgt[idx] = clamp01(0.24 + ledge * 0.5 - crevice * 0.22 + pitted * 0.12 + grain * 0.5 + speck * 0.3);
    }
  }

  // Pęknięcia: łamane, lekko rozszerzające się szczeliny z jasną krawędzią.
  for (let i = 0; i < Math.round(size / 8); i++) {
    let cx = rng() * size;
    let cy = rng() * size;
    let ang = (rng() < 0.5 ? 0 : Math.PI) + (rng() - 0.5) * 0.5;
    const steps = 16 + Math.floor(rng() * 40);
    for (let s = 0; s < steps; s++) {
      if (rng() < 0.12) ang += (rng() - 0.5) * 1.4;
      cx += Math.cos(ang) * 0.6;
      cy += Math.sin(ang) * 0.6;
      dot(lum, size, cx, cy, 0.16, 0.55);
      dot(hgt, size, cx, cy, 0.05, 0.6);
      dot(lum, size, cx + Math.cos(ang + 1.57) * 1.2, cy + Math.sin(ang + 1.57) * 1.2, 0.82, 0.28);
    }
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
      // Zmarszczki: zaburzona fala z zaostrzonym grzbietem (wiatr układa piasek
      // w ostre grzbiety, a nie w sinusoidę).
      const warp = (pfbm(u, v, 4, 3, 71) - 0.5) * 0.2;
      const wave = Math.sin((v + warp) * TAU * 11) * 0.5 + 0.5;
      const ripple = Math.pow(wave, 0.65);
      const g1 = hash2i(x, y, 613);
      const g2 = hash2i(x + 31, y + 47, 887);
      const grain = g1 * 0.6 + g2 * 0.4;
      const idx = y * size + x;
      lum[idx] = clamp01(0.58 + (ripple - 0.5) * 0.16 + (grain - 0.5) * 0.22);
      hgt[idx] = clamp01(0.34 + ripple * 0.36 + (grain - 0.5) * 0.26);
    }
  }

  // Drobny żwir i muszelki — pojedyncze jaśniejsze i ciemniejsze ziarna.
  for (let i = 0; i < size * 6; i++) {
    const px = rng() * size;
    const py = rng() * size;
    const bright = rng() > 0.4 ? 0.9 : 0.3;
    dot(lum, size, px, py, bright, 0.4);
    dot(hgt, size, px, py, bright > 0.5 ? 0.85 : 0.2, 0.35);
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

/**
 * Pakuje warstwę do RGBA. Alfa trzyma WYSOKOŚĆ tej samej warstwy — dzięki
 * temu shader pobiera kolor i bump jednym próbkowaniem (4 próbki mniej na
 * każdy piksel ekranu).
 */
export function layerToRGBA(layer, size, tint) {
  const out = new Uint8Array(size * size * 4);
  for (let i = 0; i < size * size; i++) {
    const l = clamp01(layer.lum[i]);
    out[i * 4] = Math.round(clamp01(l * tint[0]) * 255);
    out[i * 4 + 1] = Math.round(clamp01(l * tint[1]) * 255);
    out[i * 4 + 2] = Math.round(clamp01(l * tint[2]) * 255);
    out[i * 4 + 3] = Math.round(clamp01(layer.hgt[i]) * 255);
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
