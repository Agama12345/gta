// ---------------------------------------------------------------------------
// Sterowanie jakością obrazu.
//
// Jeden „poziom” zmienia wszystko naraz: rozdzielczość renderu, cienie, zasięg
// mgły, gęstość trawy i dokładność siatki terenu. Dzięki temu gra nie musi
// zgadywać, co u konkretnego gracza jest wąskim gardłem — po prostu schodzi
// z całością o oczko niżej, dopóki klatki nie wrócą do ~60 FPS.
// ---------------------------------------------------------------------------

export const QUALITY_TIERS = [
  {
    id: 0, name: 'oszczędny',
    pixelRatio: 0.85, shadows: false, shadowMap: 512, shadowEvery: 0,
    fogScale: 0.55, terrainNear: 24, terrainBudget: 3, grass: 1400,
    particles: 0.5,
  },
  {
    id: 1, name: 'niski',
    pixelRatio: 1.0, shadows: true, shadowMap: 1024, shadowEvery: 3,
    fogScale: 0.72, terrainNear: 32, terrainBudget: 4, grass: 2400,
    particles: 0.7,
  },
  {
    id: 2, name: 'średni',
    pixelRatio: 1.25, shadows: true, shadowMap: 1536, shadowEvery: 2,
    fogScale: 0.88, terrainNear: 40, terrainBudget: 5, grass: 4000,
    particles: 0.85,
  },
  {
    id: 3, name: 'wysoki',
    pixelRatio: 1.5, shadows: true, shadowMap: 2048, shadowEvery: 2,
    fogScale: 1.0, terrainNear: 48, terrainBudget: 7, grass: 6000,
    particles: 1,
  },
];

export function tierForQuality(quality) {
  if (quality >= 160) return 3;
  if (quality >= 100) return 2;
  if (quality >= 80) return 1;
  return 0;
}

/**
 * Nakłada poziom jakości na scenę. Wszystko jest opcjonalne — brak modułu nie
 * może wysypać gry.
 */
export function applyQualityTier(game, index, { shadowsOverride = null } = {}) {
  const tier = QUALITY_TIERS[Math.max(0, Math.min(QUALITY_TIERS.length - 1, index))];
  if (!game) return tier;
  const renderer = game.renderer;
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
  if (renderer) {
    try {
      renderer.setPixelRatio?.(Math.max(0.6, Math.min(dpr, tier.pixelRatio)));
      if (typeof window !== 'undefined') renderer.setSize?.(window.innerWidth, window.innerHeight);
      if (renderer.shadowMap) {
        renderer.shadowMap.enabled = shadowsOverride ?? tier.shadows;
        // zmiana rozmiaru mapy cieni wymaga wyrzucenia starej tekstury
        renderer.shadowMap.needsUpdate = true;
      }
    } catch (err) {
      console.warn('Nie udało się zmienić jakości grafiki', err);
    }
  }

  const sun = game.sun;
  if (sun) {
    sun.castShadow = shadowsOverride ?? tier.shadows;
    if (sun.shadow) {
      const size = tier.shadowMap;
      if (sun.shadow.mapSize.x !== size) {
        sun.shadow.mapSize.set(size, size);
        sun.shadow.map?.dispose?.();
        sun.shadow.map = null;
      }
    }
  }

  if (game.scene?.fog) {
    game.scene.fog.near = 90 * tier.fogScale;
    game.scene.fog.far = 1150 * tier.fogScale;
  }

  const terrain = game.world?.terrain;
  if (terrain) {
    terrain.nearRes = tier.terrainNear;
    terrain.frameBudget = tier.terrainBudget;
  }
  game.world?.setViewDistance?.(1150 * tier.fogScale);
  game.world?.setGrassDensity?.(tier.grass);

  game.shadowEvery = tier.shadowEvery;
  game.qualityTier = tier.id;
  game.qualityName = tier.name;
  return tier;
}

/**
 * Automatyczne dobieranie jakości do faktycznej płynności.
 * Schodzimy w dół szybko (2 s złych klatek), wracamy ostrożnie (6 s dobrych),
 * z histerezą, żeby obraz nie migotał między poziomami.
 */
export class AutoQuality {
  constructor(game, { startTier = 3 } = {}) {
    this.game = game;
    this.tier = startTier;
    this.ema = 16.7;
    this.badTime = 0;
    this.goodTime = 0;
    this.locked = false;
    this.lastChange = 0;
    this.samples = 0;
    this.fps = 60;
  }

  setTier(index, opts) {
    this.tier = Math.max(0, Math.min(QUALITY_TIERS.length - 1, index));
    this.lastChange = 0;
    return applyQualityTier(this.game, this.tier, opts);
  }

  update(dt) {
    if (this.locked) return;
    const ms = dt * 1000;
    if (!(ms > 0) || ms > 400) return; // pomijamy pauzy i przeładowania
    this.ema += (ms - this.ema) * 0.08;
    this.samples += 1;
    if (this.samples % 15 === 0) this.fps = 1000 / Math.max(1, this.ema);
    if (this.samples < 45) return; // daj silnikowi dojść do siebie po starcie

    this.lastChange += dt;
    if (this.ema > 26) {
      this.badTime += dt;
      this.goodTime = 0;
    } else if (this.ema < 15) {
      this.goodTime += dt;
      this.badTime = 0;
    } else {
      this.badTime = 0;
      this.goodTime = 0;
    }

    if (this.badTime > 2 && this.tier > 0 && this.lastChange > 1.5) {
      this.badTime = 0;
      this.setTier(this.tier - 1);
      this.game.ui?.toast?.(`Obniżono jakość grafiki (${QUALITY_TIERS[this.tier].name}), żeby gra chodziła płynniej.`, 'info');
    } else if (this.goodTime > 6 && this.tier < 3 && this.lastChange > 6) {
      this.goodTime = 0;
      this.setTier(this.tier + 1);
    }
  }
}
