// Dźwięk: warstwa proceduralna (WebAudio, generowana w locie) + warstwa
// sample’owa z paczki Oculus Audio Pack (CC BY 4.0, Meta) — kroki na sześciu
// podłożach, pętle lasu/nocy/jeziora/morza/deszczu/wiatru, fechtunek, UI,
// stingerki muzyczne. Sample ładują się w tle; jeśli ich nie ma (albo gra
// działa bez sieci), wszystko dalej gra proceduralnie.

// ---------------------------------------------------------------------------
// Manifest sampli (ścieżki względem katalogu public/)
// ---------------------------------------------------------------------------
const wav = (dir, names) => names.map((n) => `assets/audio/${dir}/${n}.ogg`);

/** Kroki — 6 podłoży × 5 wariantów na chód/bieg + lądowania. */
export const STEP_SAMPLES = (() => {
  const out = {};
  for (const surf of ['grass', 'dirt', 'snow', 'wood', 'stone', 'metal']) {
    for (const gait of ['walk', 'run']) {
      out[`${surf}_${gait}`] = wav('steps', [1, 2, 3, 4, 5].map((i) => `${surf}_${gait}_${i}`));
    }
  }
  for (const surf of ['grass', 'dirt', 'snow']) {
    out[`land_${surf}`] = wav('steps', [1, 2].map((i) => `land_${surf}_${i}`));
  }
  return out;
})();

/** Jednorazowe efekty: broń, uderzenia, przedmioty, zwierzęta, potwory. */
export const FOLEY_SAMPLES = {
  swing: wav('foley', ['sword_swing_1', 'sword_swing_2', 'sword_swing_3', 'sword_swing_4']),
  swing_heavy: wav('foley', ['sword_swing_1', 'sword_swing_2']),
  clash: wav('foley', ['sword_clash']),
  scrape: wav('foley', ['sword_scrape']),
  draw: wav('foley', ['sword_draw']),
  sheath: wav('foley', ['sword_sheath']),
  impact: wav('foley', ['impact_1', 'impact_2', 'impact_3', 'impact_4', 'impact_5']),
  metal: wav('foley', ['metal_hit_1', 'metal_hit_2', 'metal_hit_3']),
  coins: wav('foley', ['coins']),
  gear: wav('foley', ['gear_1', 'gear_2', 'gear_3']),
  bones: wav('foley', ['bones']),
  door_open: wav('foley', ['door_open']),
  door_close: wav('foley', ['door_close']),
  dog: wav('foley', ['dog_bark_1', 'dog_bark_2']),
  horse: wav('foley', ['horse_neigh']),
  chicken: wav('foley', ['chicken']),
  creature: wav('foley', ['creature_1', 'creature_2', 'creature_3']),
  creature_reverb: wav('foley', ['creature_reverb']),
  ogre_hurt: wav('foley', ['ogre_hurt_1', 'ogre_hurt_2']),
  ogre_death: wav('foley', ['ogre_death']),
  ogre_effort: wav('foley', ['ogre_effort']),
  troll_hurt: wav('foley', ['troll_hurt']),
  troll_death: wav('foley', ['troll_death']),
};

/** Interfejs: kliknięcia, powiadomienia, księga, plecak. */
export const UI_SAMPLES = {
  click: wav('ui', ['click']),
  back: wav('ui', ['back']),
  open: wav('ui', ['open']),
  close: wav('ui', ['close']),
  alert: wav('ui', ['alert']),
  notify: wav('ui', ['notify_1', 'notify_2', 'notify_3']),
  book_open: wav('ui', ['book_open']),
  book_close: wav('ui', ['book_close']),
  bag_open: wav('ui', ['bag_open']),
};

/** Stingerki i tła muzyczne (orkiestrowe). */
export const MUSIC_SAMPLES = {
  levelup: wav('music', ['levelup']),
  victory: wav('music', ['victory']),
  loss: wav('music', ['loss']),
  night_strings: wav('music', ['night_strings']),
  chimes: wav('music', ['chimes']),
  organ: wav('music', ['organ']),
};

/** Pętle otoczenia (miksowane wagami środowiska). */
export const AMBIENCE_SAMPLES = {
  forest: wav('ambience', ['forest_loop']),
  night: wav('ambience', ['night_loop']),
  lake: wav('ambience', ['lake_loop']),
  sea: wav('ambience', ['sea_loop']),
  rain: wav('ambience', ['rain_loop']),
  wind: wav('ambience', ['wind_loop']),
  waterfall: wav('ambience', ['waterfall_loop']),
  birds: wav('ambience', ['birds_1', 'birds_2', 'birds_3']),
};

/** Wszystkie pliki sampli — używane też przez testy (kontrola kompletności). */
export const ALL_SAMPLE_FILES = [
  ...Object.values(STEP_SAMPLES).flat(),
  ...Object.values(FOLEY_SAMPLES).flat(),
  ...Object.values(UI_SAMPLES).flat(),
  ...Object.values(MUSIC_SAMPLES).flat(),
  ...Object.values(AMBIENCE_SAMPLES).flat(),
];

export class AudioSystem {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.musicGain = null;
    this.sfxGain = null;
    this.ambientGain = null;
    this.enabled = true;
    this.musicOn = true;
    this.started = false;
    this.lastStep = 0;
    this.env = { night: 0, sea: 0, forest: 0, fire: 0, rain: 0, wind: 0.5, underwater: 0, river: 0, lake: 0 };
    this._timers = { bird: 2, owl: 9, wolf: 16, cricket: 1.5, fire: 0.6, wave: 3, drip: 5, church: 45, chime: 60 };
    this._firePos = null;
    this.listener = { x: 0, z: 0, yaw: 0 };
    // warstwa sample'owa
    this.buffers = new Map();
    this.samplesLoading = false;
    this.samplesReady = false;
    this.samplesLoaded = 0;
    this.samplesTotal = ALL_SAMPLE_FILES.length;
    this._sampleGain = null;
    this._ambientMix = {};
  }

  unlock() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.55;
    this.master.connect(this.ctx.destination);

    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.value = 0.8;
    this.sfxGain.connect(this.master);

    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.value = 0.12;
    this.musicGain.connect(this.master);

    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.value = 0.5;
    this.ambientGain.connect(this.master);

    // delikatny pogłos „otwartej przestrzeni” — wszystko brzmi mniej płasko
    this.reverb = this.ctx.createConvolver();
    this.reverb.buffer = this._makeImpulse(1.9, 2.6);
    this.reverbGain = this.ctx.createGain();
    this.reverbGain.gain.value = 0.22;
    this.reverb.connect(this.reverbGain).connect(this.master);

    this.noiseBuffer = this._makeNoise();

    // osobna szyna dla sampli (łatwo ściszyć, gdy plików nie ma)
    this._sampleGain = this.ctx.createGain();
    this._sampleGain.gain.value = 0.95;
    this._sampleGain.connect(this.master);

    this._startAmbient();
    this._loadSamples();
  }

  // =========================================================================
  // Warstwa sample'owa
  // =========================================================================
  _url(rel) {
    const base = (import.meta.env?.BASE_URL) ?? './';
    return `${base}${rel}`;
  }

  /** Doładowuje sample etapami: kroki i UI najpierw, potem resztę. */
  async _loadSamples() {
    if (!this.ctx || this.samplesLoading) return;
    this.samplesLoading = true;
    // Partie po 4 pliki: nie zapychamy łącza i nie zamrażamy pierwszej klatki.
    const stage = async (files) => {
      const queue = [...new Set(files)];
      const workers = Array.from({ length: 4 }, async () => {
        while (queue.length) await this._loadOne(queue.shift());
      });
      await Promise.all(workers);
    };
    try {
      await stage([...Object.values(STEP_SAMPLES).flat(), ...Object.values(UI_SAMPLES).flat()]);
      await stage([...Object.values(FOLEY_SAMPLES).flat(), ...Object.values(MUSIC_SAMPLES).flat()]);
      await stage(Object.values(AMBIENCE_SAMPLES).flat());
    } catch (err) {
      // brak plików nie jest błędem — zostaje dźwięk proceduralny
      console.warn('Sample dźwiękowe niedostępne — gram proceduralnie', err);
    }
    this.samplesLoading = false;
    this.samplesReady = true;
    this._startSampleAmbience();
  }

  async _loadOne(rel) {
    if (this.buffers.has(rel)) return this.buffers.get(rel);
    try {
      const res = await fetch(this._url(rel));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.arrayBuffer();
      const buf = await new Promise((resolve, reject) => {
        this.ctx.decodeAudioData(data, resolve, reject);
      });
      this.buffers.set(rel, buf);
      this.samplesLoaded += 1;
      return buf;
    } catch (err) {
      this.buffers.set(rel, null);
      return null;
    }
  }

  /** Losowy bufor z listy wariantów (null, jeśli jeszcze nie wczytany). */
  _pick(key, group) {
    const list = (group ?? STEP_SAMPLES)[key];
    if (!list || !list.length) return null;
    const rel = list[Math.floor(Math.random() * list.length)];
    const buf = this.buffers.get(rel);
    return buf || null;
  }

  /**
   * Odtwarza samplowany efekt. Zwraca true, jeśli dźwięk faktycznie poszedł —
   * dzięki temu procedury mogą wtedy pominąć własną syntezę.
   */
  _sample(key, {
    group = FOLEY_SAMPLES, gain = 0.6, rate = 1, pan = 0, reverb = 0, bus = 'sfx', delay = 0,
  } = {}) {
    if (!this.ctx || !this.enabled || !this._sampleGain) return false;
    const buf = this._pick(key, group);
    if (!buf) return false;
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    src.playbackRate.value = Math.max(0.5, Math.min(2, rate));
    const g = this.ctx.createGain();
    g.gain.value = gain;
    let node = src.connect(g);
    const p = this._panner(pan);
    if (p) node = node.connect(p);
    const target = bus === 'ambient' && this.ambientGain ? this.ambientGain : this._sampleGain;
    node.connect(target);
    if (reverb && this.reverb) {
      const send = this.ctx.createGain();
      send.gain.value = reverb * 0.5;
      node.connect(send).connect(this.reverb);
    }
    const when = this.ctx.currentTime + delay;
    src.start(when);
    return true;
  }

  /** Pętle otoczenia z plików — cicho startują i są miksowane w update(). */
  _startSampleAmbience() {
    if (!this.ctx || !this.ambientGain) return;
    for (const [key, list] of Object.entries(AMBIENCE_SAMPLES)) {
      if (key === 'birds') continue;
      const buf = this.buffers.get(list[0]);
      if (!buf) continue;
      const src = this.ctx.createBufferSource();
      src.buffer = buf;
      src.loop = true;
      const g = this.ctx.createGain();
      g.gain.value = 0;
      src.connect(g).connect(this.ambientGain);
      // każda pętla startuje w innym miejscu — brak „klapsa” przy starcie
      src.start(0, Math.random() * buf.duration * 0.5);
      this._ambientMix[key] = { src, gain: g, level: 0 };
    }
  }

  /** Wygładzone wejście warstwy pętli — bez trzasków przy zmianie pogody. */
  _setAmbient(key, level, smooth = 1.5) {
    const node = this._ambientMix[key];
    if (!node) return;
    const target = Math.max(0, Math.min(1, level));
    if (Math.abs(target - node.level) < 0.004) return;
    node.level = target;
    node.gain.gain.setTargetAtTime(target, this.ctx.currentTime, smooth);
  }


  _makeNoise() {
    const len = this.ctx.sampleRate * 2;
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    return buf;
  }

  /** Impuls pogłosu — szum z wykładniczym wybrzmiewaniem (imituje otwartą dolinę). */
  _makeImpulse(seconds, decay) {
    const rate = this.ctx.sampleRate;
    const len = Math.floor(rate * seconds);
    const buf = this.ctx.createBuffer(2, len, rate);
    for (let ch = 0; ch < 2; ch++) {
      const data = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) {
        const t = i / len;
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, decay);
      }
    }
    return buf;
  }

  _loopNoise(filterType, freq, q, gainValue) {
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    src.loop = true;
    const filter = this.ctx.createBiquadFilter();
    filter.type = filterType;
    filter.frequency.value = freq;
    filter.Q.value = q;
    const gain = this.ctx.createGain();
    gain.gain.value = gainValue;
    src.connect(filter).connect(gain).connect(this.ambientGain);
    src.start();
    return { src, filter, gain };
  }

  _startAmbient() {
    if (!this.ctx) return;

    // ---- wiatr: dwa pasma szumu, wolno modulowane --------------------------
    this.wind = this._loopNoise('lowpass', 520, 0.7, 0.05);
    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = 0.06;
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 240;
    lfo.connect(lfoGain).connect(this.wind.filter.frequency);
    lfo.start();

    // ---- morze: szeroki szum z falowaniem --------------------------------
    this.sea = this._loopNoise('bandpass', 420, 0.6, 0);
    const seaLfo = this.ctx.createOscillator();
    seaLfo.frequency.value = 0.11;
    const seaLfoGain = this.ctx.createGain();
    seaLfoGain.gain.value = 0.5;
    seaLfo.connect(seaLfoGain).connect(this.sea.gain.gain);
    seaLfo.start();

    // ---- noc: niski, ciepły dron lasu ------------------------------------
    this.night = this._loopNoise('lowpass', 260, 0.9, 0);
    this.nightBed = this.ctx.createGain();
    this.nightBed.gain.value = 0;

    // ---- deszcz ----------------------------------------------------------
    this.rain = this._loopNoise('highpass', 1800, 0.4, 0);
    this.rain2 = this._loopNoise('bandpass', 5200, 0.5, 0);

    // ---- rzeka: szum nurtu, modulowany wolno (bulgotanie) ------------------
    this.river = this._loopNoise('bandpass', 950, 1.4, 0);
    const riverLfo = this.ctx.createOscillator();
    riverLfo.frequency.value = 0.42;
    const riverLfoGain = this.ctx.createGain();
    riverLfoGain.gain.value = 260;
    riverLfo.connect(riverLfoGain).connect(this.river.filter.frequency);
    riverLfo.start();

    // ---- jezioro: szeroki, ciemny szum z lekkim pluskiem ------------------
    this.lake = this._loopNoise('lowpass', 480, 0.7, 0);
    const lakeLfo = this.ctx.createOscillator();
    lakeLfo.frequency.value = 0.09;
    const lakeLfoGain = this.ctx.createGain();
    lakeLfoGain.gain.value = 0.35;
    lakeLfo.connect(lakeLfoGain).connect(this.lake.gain.gain);
    lakeLfo.start();

    // ---- dron harmoniczny (muzyka tła) -----------------------------------
    const drone = this.ctx.createGain();
    drone.gain.value = 0.12;
    drone.connect(this.musicGain);
    [55, 82.5, 110].forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      osc.type = i === 2 ? 'triangle' : 'sine';
      osc.frequency.value = f;
      const g = this.ctx.createGain();
      g.gain.value = 0.3 / (i + 1);
      osc.connect(g).connect(drone);
      osc.start();
      const mod = this.ctx.createOscillator();
      mod.frequency.value = 0.05 + i * 0.03;
      const modGain = this.ctx.createGain();
      modGain.gain.value = 0.12;
      mod.connect(modGain).connect(osc.frequency);
      mod.start();
    });
    this.started = true;
  }

  setVolume(v) {
    if (!this.master) return;
    this.master.gain.value = v;
  }

  toggleMute() {
    this.enabled = !this.enabled;
    if (this.master) this.master.gain.value = this.enabled ? 0.55 : 0;
    return this.enabled;
  }

  /** Ustawia pozycję słuchacza (do panoramy dźwięków otoczenia). */
  setListener(x, z, yaw = 0) {
    this.listener.x = x;
    this.listener.z = z;
    this.listener.yaw = yaw;
  }

  /** Środowisko: noc, bliskość morza, lasu i ognia (0..1). */
  setEnvironment(env) {
    Object.assign(this.env, env);
  }

  _panner(pan) {
    if (!this.ctx.createStereoPanner) return null;
    const p = this.ctx.createStereoPanner();
    p.pan.value = Math.max(-1, Math.min(1, pan));
    return p;
  }

  /** Tłumienie głośności wraz z odległością źródła (0..1). */
  gainFor(x, z) {
    if (x == null || z == null) return 1;
    const d = Math.hypot(x - this.listener.x, z - this.listener.z);
    return 1 / (1 + d / 10);
  }

  /** Panorama na podstawie pozycji źródła względem gracza. */
  _panFor(x, z) {
    if (x == null || z == null) return 0;
    const dx = x - this.listener.x;
    const dz = z - this.listener.z;
    const dist = Math.hypot(dx, dz) || 1;
    // obrót o kąt patrzenia — lewa strona = -1, prawa = +1
    const cos = Math.cos(-this.listener.yaw);
    const sin = Math.sin(-this.listener.yaw);
    const rx = dx * cos - dz * sin;
    return Math.max(-1, Math.min(1, rx / dist)) * Math.min(1, dist / 25);
  }

  update(dt, env = {}) {
    if (!this.ctx) return;
    this.setEnvironment(env);
    const e = this.env;
    const now = this.ctx.currentTime;
    const t = (this.time = (this.time ?? 0) + dt);

    // płynne przejścia warstw
    this.sea.gain.gain.setTargetAtTime(0.02 + e.sea * 0.16, now, 0.6);
    // rzeka i jezioro: im bliżej wody, tym głośniej — z delikatnym falowaniem
    const riverWobble = 0.9 + Math.sin(t * 0.9) * 0.1;
    this.river.gain.gain.setTargetAtTime(e.river * 0.2 * riverWobble, now, 0.5);
    this.river.filter.frequency.setTargetAtTime(760 + e.river * 620, now, 0.6);
    this.lake.gain.gain.setTargetAtTime(e.lake * 0.13, now, 0.9);
    this.lake.filter.frequency.setTargetAtTime(360 + e.lake * 260, now, 1.1);
    this.sea.filter.frequency.setTargetAtTime(360 + e.sea * 420, now, 0.8);
    this.wind.gain.gain.setTargetAtTime(0.03 + e.wind * 0.06, now, 1.2);
    this.rain.gain.gain.setTargetAtTime(e.rain * 0.1, now, 1.5);
    this.rain2.gain.gain.setTargetAtTime(e.rain * 0.035, now, 1.5);

    // ---- pętle z plików: las, noc, jezioro, morze, deszcz, wiatr, wodospad ---
    if (this._ambientMix) {
      const day = 1 - e.night;
      this._setAmbient('forest', e.forest * day * 0.5);
      this._setAmbient('night', e.night * (0.3 + e.forest * 0.35) * 0.55);
      this._setAmbient('lake', e.lake * 0.65);
      this._setAmbient('sea', e.sea * 0.8);
      this._setAmbient('rain', e.rain * 0.65, 0.9);
      this._setAmbient('wind', 0.18 + e.wind * 0.3, 2.4);
      this._setAmbient('waterfall', Math.max(e.river, e.lake) * 0.22);
    }

    // ---- zdarzenia ambientowe -------------------------------------------
    const timers = this._timers;
    timers.bird -= dt;
    if (timers.bird <= 0) {
      timers.bird = 1.2 + Math.random() * 4.5;
      const dayF = 1 - e.night;
      if (dayF > 0.35 && (e.forest > 0.15 || Math.random() < 0.4)) this.birdChirp(dayF);
    }
    timers.cricket -= dt;
    if (timers.cricket <= 0) {
      timers.cricket = 0.7 + Math.random() * 2.2;
      if (e.night > 0.5 && e.forest > 0.1) this.cricket(e.night);
    }
    timers.owl -= dt;
    if (timers.owl <= 0) {
      timers.owl = 14 + Math.random() * 26;
      if (e.night > 0.6) this.owl();
    }
    timers.wolf -= dt;
    if (timers.wolf <= 0) {
      timers.wolf = 26 + Math.random() * 50;
      if (e.night > 0.45 && e.forest > 0.2) this.distantHowl();
    }
    timers.wave -= dt;
    if (timers.wave <= 0) {
      timers.wave = 2.4 + Math.random() * 3.4;
      if (e.sea > 0.05) this.waveWash(e.sea);
    }
    timers.fire -= dt;
    if (timers.fire <= 0) {
      timers.fire = 0.25 + Math.random() * 0.9;
      if (e.fire > 0.02) this.crackle(e.fire);
    }
    // woda: kapanie w jaskini/deszczu
    timers.drip -= dt;
    if (timers.drip <= 0) {
      timers.drip = 3 + Math.random() * 7;
      if (e.rain > 0.3) this.drip();
    }

    // nocą z oddali niesie się organowy chorał z kaplicy na cmentarzu
    timers.church -= dt;
    if (timers.church <= 0) {
      timers.church = 70 + Math.random() * 110;
      if (e.night > 0.55) {
        this._sample('organ', {
          group: MUSIC_SAMPLES,
          gain: 0.16,
          rate: 0.94 + Math.random() * 0.06,
          pan: (Math.random() * 2 - 1) * 0.6,
          reverb: 0.7,
          bus: 'music',
        });
      }
    }

    // w dzień, przy osadzie, dzwonią kuranty na wietrze
    timers.chime -= dt;
    if (timers.chime <= 0) {
      timers.chime = 45 + Math.random() * 80;
      if (e.night < 0.5 && e.forest < 0.75) {
        this._sample('chimes', {
          group: MUSIC_SAMPLES,
          gain: 0.12,
          rate: 0.95 + Math.random() * 0.1,
          pan: (Math.random() * 2 - 1) * 0.7,
          reverb: 0.5,
          bus: 'ambient',
        });
      }
    }
  }

  // ---------------------------------------------------------------- jedno strzały
  _tone(freq, dur, { type = 'sine', gain = 0.2, slide = 0, delay = 0, pan = 0, reverb = 0 } = {}) {
    if (!this.ctx || !this.enabled) return;
    const t0 = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(20, freq + slide), t0 + dur);
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(gain, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0008, t0 + dur);
    let node = osc;
    if (pan) {
      const p = this._panner(pan);
      if (p) { osc.connect(g).connect(p); p.connect(this.sfxGain); if (reverb) p.connect(this.reverb); }
      else osc.connect(g).connect(this.sfxGain);
    } else {
      osc.connect(g).connect(this.sfxGain);
      if (reverb) g.connect(this.reverb);
    }
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
    return node;
  }

  _noise(dur, { filterFreq = 1200, q = 1, gain = 0.16, type = 'bandpass', delay = 0, pan = 0, attack = 0.005, reverb = 0 } = {}) {
    if (!this.ctx || !this.enabled) return;
    const t0 = this.ctx.currentTime + delay;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    src.playbackRate.value = 0.85 + Math.random() * 0.35;
    const f = this.ctx.createBiquadFilter();
    f.type = type;
    f.frequency.setValueAtTime(filterFreq, t0);
    f.frequency.exponentialRampToValueAtTime(Math.max(120, filterFreq * 0.45), t0 + dur);
    f.Q.value = q;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(gain, t0 + attack);
    g.gain.exponentialRampToValueAtTime(0.0008, t0 + dur);
    src.connect(f).connect(g);
    const p = pan ? this._panner(pan) : null;
    if (p) { g.connect(p); p.connect(this.sfxGain); } else g.connect(this.sfxGain);
    if (reverb) g.connect(this.reverb);
    src.start(t0);
    src.stop(t0 + dur + 0.02);
  }

  // ------------------------------------------------------------------- walka
  swing(combo = 0) {
    // nagrany świst ostrza; wariant ciężki dla ciosu kończącego
    if (this._sample(combo === 2 ? 'swing_heavy' : 'swing', {
      gain: combo === 2 ? 0.55 : 0.42,
      rate: (combo === 2 ? 0.86 : 1.02) + Math.random() * 0.1,
      pan: 0.15,
    })) {
      if (combo === 2) this._tone(120, 0.16, { type: 'triangle', gain: 0.05, slide: -50 });
      return;
    }
    this._noise(0.2, { filterFreq: 2600 + combo * 600, gain: 0.13, q: 1.4 });
    this._noise(0.1, { filterFreq: 900, gain: 0.05, type: 'highpass', delay: 0.03 });
    this._tone(170 + combo * 40, 0.11, { type: 'triangle', gain: 0.05, slide: -70 });
  }
  hit(crit = false) {
    const played = this._sample('impact', {
      gain: crit ? 0.62 : 0.45,
      rate: crit ? 0.86 : 1.0 + Math.random() * 0.12,
      reverb: 0.12,
    });
    // metaliczny zgrzyt, gdy cios trafia w zbroję
    if (Math.random() < 0.35) this._sample(Math.random() < 0.5 ? 'metal' : 'clash', { gain: 0.2, rate: 1.1 });
    if (played) return;
    this._noise(0.13, { filterFreq: crit ? 700 : 1300, gain: crit ? 0.26 : 0.17, type: 'lowpass', reverb: 0.4 });
    this._tone(crit ? 130 : 210, 0.16, { type: 'square', gain: crit ? 0.12 : 0.06, slide: -60 });
    // chrzęst
    this._noise(0.07, { filterFreq: 2600, gain: 0.07, delay: 0.02 });
  }
  parry() {
    if (this._sample(Math.random() < 0.6 ? 'clash' : 'scrape', { gain: 0.5, rate: 1.05, reverb: 0.35 })) {
      this._tone(1760, 0.35, { type: 'triangle', gain: 0.03, slide: -420, reverb: 0.6 });
      return;
    }
    this._tone(1760, 0.5, { type: 'triangle', gain: 0.07, slide: -420, reverb: 0.6 });
    this._tone(2637, 0.42, { type: 'sine', gain: 0.05, slide: -600, delay: 0.01, reverb: 0.6 });
    this._noise(0.12, { filterFreq: 5200, gain: 0.09, type: 'highpass' });
  }
  block(hard = false) {
    if (this._sample(hard ? 'clash' : 'metal', {
      gain: hard ? 0.45 : 0.32,
      rate: hard ? 0.95 : 0.82,
      reverb: 0.25,
    })) return;
    // tępy stuk drewna/ metalu o tarczę; parowanie ma wyższy, czystszy dźwięk
    this._tone(hard ? 1180 : 520, hard ? 0.3 : 0.18, {
      type: hard ? 'triangle' : 'square', gain: hard ? 0.1 : 0.07, slide: hard ? -260 : -120, reverb: 0.4,
    });
    this._noise(0.12, { filterFreq: hard ? 3800 : 1500, gain: hard ? 0.12 : 0.09, type: hard ? 'highpass' : 'lowpass' });
  }
  enemyHit() {
    if (this._sample('impact', { gain: 0.24, rate: 0.92 + Math.random() * 0.1, pan: 0.3 })) return;
    this._noise(0.11, { filterFreq: 640, gain: 0.11, type: 'lowpass' });
  }
  enemySwing() {
    if (this._sample('swing', { gain: 0.2, rate: 0.9 + Math.random() * 0.1, pan: 0.35 })) return;
    this._noise(0.22, { filterFreq: 1200, gain: 0.1, pan: 0.3 });
  }
  hurt() {
    this._tone(150, 0.34, { type: 'sawtooth', gain: 0.14, slide: -60 });
    this._noise(0.22, { filterFreq: 380, gain: 0.13, type: 'lowpass' });
  }
  dodge() {
    this._sample('gear', { gain: 0.2, rate: 1.1 });
    this._sample('swing', { gain: 0.12, rate: 1.35 });
    this._noise(0.3, { filterFreq: 900, gain: 0.06, type: 'highpass' });
    this._noise(0.12, { filterFreq: 400, gain: 0.06, type: 'lowpass', delay: 0.24 });
  }
  cast() {
    [520, 760, 1020].forEach((f, i) => this._tone(f, 0.4, { type: 'sine', gain: 0.09, delay: i * 0.05, slide: 120, reverb: 0.5 }));
    this._noise(0.34, { filterFreq: 2600, gain: 0.06, type: 'highpass', reverb: 0.6 });
  }
  bow() {
    this._noise(0.14, { filterFreq: 3200, gain: 0.1, type: 'highpass' });
  }
  growl() {
    if (this._sample(Math.random() < 0.4 ? 'creature_reverb' : 'creature', { gain: 0.3, rate: 0.85 + Math.random() * 0.2, pan: 0.2, reverb: 0.2 })) return;
    this._tone(86, 0.55, { type: 'sawtooth', gain: 0.1, slide: -26, pan: 0.2 });
    this._noise(0.4, { filterFreq: 300, gain: 0.05, type: 'lowpass', pan: 0.2 });
  }
  slam() {
    this._sample('ogre_effort', { gain: 0.28, rate: 0.95 });
    this._tone(64, 0.6, { type: 'sine', gain: 0.24, slide: -30, reverb: 0.5 });
    this._noise(0.55, { filterFreq: 280, gain: 0.25, type: 'lowpass', reverb: 0.5 });
  }
  drink() {
    this._tone(420, 0.16, { type: 'sine', gain: 0.08, slide: 200 });
    this._tone(620, 0.2, { type: 'sine', gain: 0.05, delay: 0.08, slide: 160 });
  }

  // ----------------------------------------------------------------- otoczenie
  birdChirp(strength = 1) {
    if (strength > 0.5 && this._sample('birds', { gain: 0.16 * strength, group: AMBIENCE_SAMPLES, bus: 'ambient', rate: 0.95 + Math.random() * 0.12 })) return;
    const base = 2100 + Math.random() * 1600;
    const pan = (Math.random() * 2 - 1) * 0.8;
    const notes = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < notes; i++) {
      const f = base * (0.9 + Math.random() * 0.35);
      this._tone(f, 0.07, {
        type: 'sine', gain: 0.028 * strength, slide: f * (Math.random() < 0.5 ? 0.35 : -0.3),
        delay: i * (0.07 + Math.random() * 0.06), pan,
      });
    }
  }
  cricket(night = 1) {
    const pan = (Math.random() * 2 - 1) * 0.9;
    const f = 4200 + Math.random() * 900;
    for (let i = 0; i < 3; i++) {
      this._tone(f, 0.022, { type: 'square', gain: 0.012 * night, delay: i * 0.055, pan });
    }
  }
  owl() {
    const pan = (Math.random() * 2 - 1) * 0.8;
    this._tone(330, 0.34, { type: 'sine', gain: 0.028, slide: -40, pan, reverb: 0.6 });
    this._tone(292, 0.42, { type: 'sine', gain: 0.024, slide: -30, delay: 0.42, pan, reverb: 0.6 });
  }
  distantHowl() {
    const pan = (Math.random() * 2 - 1) * 0.85;
    const f = 320 + Math.random() * 60;
    this._tone(f, 0.9, { type: 'sine', gain: 0.03, slide: 130, pan, reverb: 0.9 });
    this._tone(f * 1.5, 1.2, { type: 'sine', gain: 0.018, slide: -90, delay: 0.5, pan, reverb: 0.9 });
  }
  waveWash(strength = 1) {
    this._noise(1.6 + Math.random() * 1.2, {
      filterFreq: 900 + Math.random() * 500,
      gain: 0.05 * strength, type: 'lowpass', attack: 0.6, reverb: 0.3,
      pan: (Math.random() * 2 - 1) * 0.5,
    });
  }
  crackle(strength = 1) {
    this._noise(0.05 + Math.random() * 0.09, {
      filterFreq: 1800 + Math.random() * 2600, gain: 0.02 + 0.05 * strength,
      q: 0.8, attack: 0.002,
      pan: this._panFor(this._firePos?.x, this._firePos?.z),
    });
  }
  drip() {
    this._tone(1200 + Math.random() * 900, 0.09, { type: 'sine', gain: 0.03, slide: -500, pan: (Math.random() * 2 - 1) * 0.7, reverb: 0.7 });
  }

  /** Kroki — barwa zależna od podłoża (nagrania, a bez nich synteza). */
  step(surface = 'grass', opts = {}) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const run = !!opts.run;
    const minGap = surface === 'water' ? 0.22 : run ? 0.2 : 0.26;
    if (now - this.lastStep < minGap) return;
    this.lastStep = now;

    const key = `${surface}_${run ? 'run' : 'walk'}`;
    const scale = opts.gain ?? 1;
    if (this._sample(key, {
      group: STEP_SAMPLES,
      gain: (run ? 0.46 : 0.34) * (0.85 + Math.random() * 0.3) * scale,
      rate: (run ? 1.02 : 0.96) + Math.random() * 0.1,
      pan: opts.pan ?? (Math.random() * 2 - 1) * 0.14,
    })) {
      // szelest ekwipunku i ubrania co jakiś czas — inaczej kroki są „sterylne”
      if (Math.random() < 0.22) {
        this._sample('gear', { gain: 0.1, rate: 0.9 + Math.random() * 0.25 });
      }
      return;
    }

    switch (surface) {
      case 'water':
        this._noise(0.26, { filterFreq: 1500, gain: 0.09, type: 'highpass', attack: 0.01 });
        this._noise(0.18, { filterFreq: 500, gain: 0.05, type: 'lowpass', delay: 0.03 });
        break;
      case 'stone':
        this._noise(0.07, { filterFreq: 2400, gain: 0.055, q: 2.2, attack: 0.002 });
        this._tone(190, 0.06, { type: 'square', gain: 0.02, slide: -60 });
        break;
      case 'wood':
        this._tone(170, 0.09, { type: 'triangle', gain: 0.045, slide: -70 });
        this._noise(0.06, { filterFreq: 900, gain: 0.035 });
        break;
      case 'dirt':
        this._noise(0.11, { filterFreq: 800, gain: 0.05, type: 'lowpass', attack: 0.004 });
        break;
      case 'snow':
        this._noise(0.16, { filterFreq: 3200, gain: 0.04, type: 'highpass', attack: 0.02 });
        break;
      default: // trawa
        this._noise(0.13, { filterFreq: 1600, gain: 0.045, type: 'bandpass', q: 0.6, attack: 0.008 });
        this._noise(0.09, { filterFreq: 420, gain: 0.03, type: 'lowpass', delay: 0.01 });
    }
  }

  /** Lądowanie po skoku/upadku — ciężar zależy od wysokości. */
  land(surface = 'grass', strength = 1) {
    if (!this.ctx) return;
    const s = Math.max(0.2, Math.min(1.4, strength));
    const played = this._sample(`land_${surface}`, {
      group: STEP_SAMPLES,
      gain: 0.34 * s,
      rate: 1.02 - s * 0.06 + Math.random() * 0.06,
    });
    if (!played) {
      this._noise(0.16, { filterFreq: 420, gain: 0.09 * s, type: 'lowpass', attack: 0.004 });
      this._tone(72, 0.22, { type: 'sine', gain: 0.07 * s, slide: -30 });
    }
    if (Math.random() < 0.5) this._sample('gear', { gain: 0.14 * s });
  }

  // ---------------------------------------------------------------------- UI
  uiClick() {
    if (this._sample('click', { group: UI_SAMPLES, gain: 0.32, rate: 0.97 + Math.random() * 0.07 })) return;
    this._tone(660, 0.07, { type: 'triangle', gain: 0.05 });
  }
  uiOpen() {
    if (this._sample('open', { group: UI_SAMPLES, gain: 0.3 })) {
      this._tone(440, 0.12, { type: 'sine', gain: 0.02, slide: 80 });
      return;
    }
    this._tone(440, 0.12, { type: 'sine', gain: 0.05, slide: 80 });
    this._tone(590, 0.14, { type: 'sine', gain: 0.04, delay: 0.05, slide: 60 });
  }
  uiClose() {
    if (this._sample('close', { group: UI_SAMPLES, gain: 0.26 })) return;
    this.uiClick();
  }
  uiNotify() {
    if (this._sample('notify', { group: UI_SAMPLES, gain: 0.22 })) return;
    this.objective();
  }
  quest() { [392, 523, 659].forEach((f, i) => this._tone(f, 0.5, { type: 'triangle', gain: 0.06, delay: i * 0.09, reverb: 0.4 })); }
  objective() { [523, 698].forEach((f, i) => this._tone(f, 0.35, { type: 'sine', gain: 0.05, delay: i * 0.07 })); }
  questComplete() {
    this._sample('chimes', { group: MUSIC_SAMPLES, gain: 0.28, rate: 1.02, bus: 'music' });
    [392, 523, 659, 784].forEach((f, i) => this._tone(f, 0.6, { type: 'triangle', gain: 0.05, delay: i * 0.11, reverb: 0.4 }));
  }
  /** Stingerki orkiestrowe: levelup / victory / loss. */
  stinger(kind, gain = 0.5) {
    return this._sample(kind, { group: MUSIC_SAMPLES, gain, bus: 'music' });
  }
  levelUp() {
    if (this.stinger('levelup', 0.55)) return;
    [523, 659, 784, 1046].forEach((f, i) => this._tone(f, 0.7, { type: 'sine', gain: 0.09, delay: i * 0.1, reverb: 0.5 }));
  }
  coin() {
    if (this._sample('coins', { gain: 0.34, rate: 0.98 + Math.random() * 0.12 })) {
      this._tone(1560, 0.1, { type: 'triangle', gain: 0.02, delay: 0.04 });
      return;
    }
    this._tone(1180, 0.1, { type: 'triangle', gain: 0.06 });
    this._tone(1560, 0.12, { type: 'triangle', gain: 0.05, delay: 0.05 });
  }
  death() {
    if (this.stinger('loss', 0.6)) return;
    [330, 261, 196, 130].forEach((f, i) => this._tone(f, 0.9, { type: 'triangle', gain: 0.09, delay: i * 0.16, slide: -20, reverb: 0.6 }));
  }
  victory() {
    if (this.stinger('victory', 0.6)) return;
    [523, 659, 784, 1046, 1318].forEach((f, i) => this._tone(f, 1.2, { type: 'triangle', gain: 0.08, delay: i * 0.16, reverb: 0.6 }));
  }
}
