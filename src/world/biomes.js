// ---------------------------------------------------------------------------
// BIOMY
// Klimat krainy zmienia się z położeniem: umiarkowane łąki i lasy w środku,
// pustynia na południowym wschodzie, sawanna na zachodzie, tundra i lód na
// północy, bagno w kotlinie. Wszystko płynnie się przenika (wagi 0..1), więc
// nie ma ostrych granic — tak jak w Gothicu, gdzie las przechodzi w step.
// ---------------------------------------------------------------------------
import { clamp, smoothstep, dist2 } from '../core/utils.js';

// Kopia skali świata. Trzymamy ją tutaj (a nie import z terrain.js), żeby nie
// tworzyć cyklu importów: terrain.js importuje ten moduł do kolorowania terenu.
const WORLD_SCALE = 2.6;

export const BIOME_INFO = {
  temperate: { name: 'Umiarkowane łąki', short: 'Łąki' },
  desert: { name: 'Pustynia Czerwonych Piasków', short: 'Pustynia' },
  savanna: { name: 'Sawanna', short: 'Sawanna' },
  ice: { name: 'Tundra', short: 'Tundra' },
  swamp: { name: 'Bagno', short: 'Bagno' },
};

// Regiony w metrach „autorskich” (mnożone przez WORLD_SCALE).
const REGIONS = [
  { id: 'desert', x: 470, z: -330, r: 250, inner: 90 },
  // Sawanna leży na suchym, płaskim zachodzie — poprzednie miejsce wypadało
  // pod wodą, więc biom istniał tylko na papierze (piach i morze).
  { id: 'savanna', x: -338, z: 150, r: 255, inner: 85 },
  { id: 'ice', x: -180, z: -560, r: 240, inner: 80 },
  { id: 'swamp', x: -200, z: -430, r: 150, inner: 60 },
];

const REGIONS_WORLD = REGIONS.map((r) => ({
  ...r,
  x: r.x * WORLD_SCALE,
  z: r.z * WORLD_SCALE,
  r: r.r * WORLD_SCALE,
  inner: r.inner * WORLD_SCALE,
}));

function hash2(x, z) {
  const s = Math.sin(x * 12.9898 + z * 78.233) * 43758.5453;
  return s - Math.floor(s);
}

const cacheOut = { temperate: 1, desert: 0, savanna: 0, ice: 0, swamp: 0 };

/** Wagi biomów w punkcie (suma = 1). Zwraca bufor współdzielony — nie trzymaj go. */
export function biomeWeights(x, z, out = cacheOut) {
  out.temperate = 1;
  out.desert = 0;
  out.savanna = 0;
  out.ice = 0;
  out.swamp = 0;
  for (let i = 0; i < REGIONS_WORLD.length; i++) {
    const r = REGIONS_WORLD[i];
    const d = dist2(x, z, r.x, r.z);
    if (d > r.r) continue;
    // rozmyta granica: im dalej od jądra, tym mniej danego biomu
    const edge = 0.72 + 0.28 * hash2(Math.floor(x / 90), Math.floor(z / 90));
    const t = 1 - smoothstep(r.inner, r.r * edge, d);
    if (t <= 0) continue;
    const w = clamp(t, 0, 1);
    if (w > out[r.id]) out[r.id] = w;
  }
  const strong = out.desert + out.savanna + out.ice + out.swamp;
  out.temperate = clamp(1 - strong, 0.05, 1);
  const sum = out.temperate + strong || 1;
  out.temperate /= sum;
  out.desert /= sum;
  out.savanna /= sum;
  out.ice /= sum;
  out.swamp /= sum;
  return out;
}

/** Dominujący biom w punkcie. */
export function dominantBiome(x, z) {
  const w = biomeWeights(x, z);
  let best = 'temperate';
  let bestW = w.temperate;
  for (const k of ['desert', 'savanna', 'ice', 'swamp']) {
    if (w[k] > bestW) {
      best = k;
      bestW = w[k];
    }
  }
  return best;
}

/** Krótki opis krainy — pokazywany przy wejściu w nowy rejon. */
export function biomeLabel(x, z) {
  const id = dominantBiome(x, z);
  return BIOME_INFO[id]?.name ?? '';
}
