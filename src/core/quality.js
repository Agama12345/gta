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
    particles: 0.5, lodDistance: 55, lights: 2,
  },
  {
    id: 1, name: 'niski',
    pixelRatio: 1.0, shadows: true, shadowMap: 1024, shadowEvery: 3,
    fogScale: 0.72, terrainNear: 32, terrainBudget: 4, grass: 2400,
    particles: 0.7, lodDistance: 75, lights: 3,
  },
  {
    id: 2, name: 'średni',
    pixelRatio: 1.25, shadows: true, shadowMap: 1536, shadowEvery: 2,
    fogScale: 0.88, terrainNear: 40, terrainBudget: 5, grass: 4000,
    particles: 0.85, lodDistance: 95, lights: 4,
  },
  {
    id: 3, name: 'wysoki',
    pixelRatio: 1.5, shadows: true, shadowMap: 2048, shadowEvery: 2,
    fogScale: 1.0, terrainNear: 48, terrainBudget: 7, grass: 6000,
    particles: 1, lodDistance: 120, lights: 6,
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
  // od tej odległości roślinność rysuje się uproszczoną bryłą (4-5x mniej trójkątów)
  if (game.world) {
    game.world.lodDistance = tier.lodDistance;
    // ile lamp (ognisk, pochodni, kapliczek) świeci naraz — patrz `world.update`
    game.world.lightBudget = tier.lights;
  }
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
    // 20,5 ms to ~49 klatek: poniżej tego gry nie da się nazwać płynną, a przy
    // odświeżaniu 60 Hz vsync i tak nie pokaże nic pomiędzy 16,7 a 33 ms.
    if (this.ema > 20.5) {
      this.badTime += dt;
      this.goodTime = 0;
    } else if (this.ema < 13) {
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

/**
 * Skalowanie rozdzielczości w locie.
 *
 * Poziomy jakości zmieniają ustawienia skokowo i tylko wtedy, gdy gracz ma
 * naprawdę słaby sprzęt. To narzędzie działa szybciej i subtelniej: mierzy
 * płynność i dokręca rozdzielczość renderu w zakresie 55–100% — jeśli karta
 * nie wyrabia, obraz robi się odrobinę miększy, ale **nie ma przycięć**.
 * Gracz rzadko to zauważa, a klatki trzymają się celu.
 */
export class DynamicResolution {
  constructor(game, { min = 0.55, max = 1, target = 16.7, step = 0.06 } = {}) {
    this.game = game;
    this.min = min;
    this.max = max;
    this.target = target;
    this.step = step;
    this.scale = max;
    this.ema = target;
    this.timer = 0;
    this.enabled = true;
    this.samples = 0;
  }

  /** Bazowy pixelRatio z aktualnego poziomu jakości (bez naszego skalowania). */
  baseRatio() {
    const tier = this.game?.qualityTier ?? 3;
    const t = QUALITY_TIERS[Math.max(0, Math.min(QUALITY_TIERS.length - 1, tier))];
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    return Math.max(0.6, Math.min(dpr, t.pixelRatio));
  }

  apply() {
    const renderer = this.game?.renderer;
    if (!renderer?.setPixelRatio) return;
    renderer.setPixelRatio(this.baseRatio() * this.scale);
    if (typeof window !== 'undefined' && renderer.setSize) {
      renderer.setSize(window.innerWidth, window.innerHeight, false);
    }
  }

  update(dt) {
    if (!this.enabled) return;
    const ms = dt * 1000;
    if (!(ms > 0) || ms > 400) return;
    this.ema += (ms - this.ema) * 0.1;
    this.samples += 1;
    this.timer += dt;
    if (this.samples < 30) return; // nie reaguj na klatki startowe
    if (this.timer < 0.5) return;
    this.timer = 0;
    let next = this.scale;
    // próg „za wolno” ustawiony tuż nad 60 Hz: 18,3 ms to ~55 klatek, czyli
    // moment, w którym przycięcia zaczynają być widoczne
    if (this.ema > this.target * 1.1) next = Math.max(this.min, this.scale - this.step);
    else if (this.ema < this.target * 0.86) next = Math.min(this.max, this.scale + this.step * 0.5);
    if (Math.abs(next - this.scale) > 0.001) {
      this.scale = next;
      this.apply();
      this.game.onResolutionChange?.(this.scale);
    }
  }
}
