// Dźwięk generowany w locie przez WebAudio — bez plików zewnętrznych.
// Warstwy: wiatr, morze, las (ptaki), noc (świerszcze, sowy), deszcz, ogień.
// Wszystko stereo i filtrowane, żeby krajobraz „brzmiał” inaczej w każdym miejscu.
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
    this.env = { night: 0, sea: 0, forest: 0, fire: 0, rain: 0, wind: 0.5, underwater: 0 };
    this._timers = { bird: 2, owl: 9, wolf: 16, cricket: 1.5, fire: 0.6, wave: 3, drip: 5 };
    this._firePos = null;
    this.listener = { x: 0, z: 0, yaw: 0 };
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
    this._startAmbient();
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
    this.sea.filter.frequency.setTargetAtTime(360 + e.sea * 420, now, 0.8);
    this.wind.gain.gain.setTargetAtTime(0.03 + e.wind * 0.06, now, 1.2);
    this.rain.gain.gain.setTargetAtTime(e.rain * 0.1, now, 1.5);
    this.rain2.gain.gain.setTargetAtTime(e.rain * 0.035, now, 1.5);

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
    this._noise(0.2, { filterFreq: 2600 + combo * 600, gain: 0.13, q: 1.4 });
    this._noise(0.1, { filterFreq: 900, gain: 0.05, type: 'highpass', delay: 0.03 });
    this._tone(170 + combo * 40, 0.11, { type: 'triangle', gain: 0.05, slide: -70 });
  }
  hit(crit = false) {
    this._noise(0.13, { filterFreq: crit ? 700 : 1300, gain: crit ? 0.26 : 0.17, type: 'lowpass', reverb: 0.4 });
    this._tone(crit ? 130 : 210, 0.16, { type: 'square', gain: crit ? 0.12 : 0.06, slide: -60 });
    // chrzęst
    this._noise(0.07, { filterFreq: 2600, gain: 0.07, delay: 0.02 });
  }
  parry() {
    this._tone(1760, 0.5, { type: 'triangle', gain: 0.07, slide: -420, reverb: 0.6 });
    this._tone(2637, 0.42, { type: 'sine', gain: 0.05, slide: -600, delay: 0.01, reverb: 0.6 });
    this._noise(0.12, { filterFreq: 5200, gain: 0.09, type: 'highpass' });
  }
  enemyHit() {
    this._noise(0.11, { filterFreq: 640, gain: 0.11, type: 'lowpass' });
  }
  enemySwing() {
    this._noise(0.22, { filterFreq: 1200, gain: 0.1, pan: 0.3 });
  }
  hurt() {
    this._tone(150, 0.34, { type: 'sawtooth', gain: 0.14, slide: -60 });
    this._noise(0.22, { filterFreq: 380, gain: 0.13, type: 'lowpass' });
  }
  dodge() {
    this._noise(0.3, { filterFreq: 900, gain: 0.1, type: 'highpass' });
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
    this._tone(86, 0.55, { type: 'sawtooth', gain: 0.1, slide: -26, pan: 0.2 });
    this._noise(0.4, { filterFreq: 300, gain: 0.05, type: 'lowpass', pan: 0.2 });
  }
  slam() {
    this._tone(64, 0.6, { type: 'sine', gain: 0.3, slide: -30, reverb: 0.5 });
    this._noise(0.55, { filterFreq: 280, gain: 0.25, type: 'lowpass', reverb: 0.5 });
  }
  drink() {
    this._tone(420, 0.16, { type: 'sine', gain: 0.08, slide: 200 });
    this._tone(620, 0.2, { type: 'sine', gain: 0.05, delay: 0.08, slide: 160 });
  }

  // ----------------------------------------------------------------- otoczenie
  birdChirp(strength = 1) {
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

  /** Kroki — barwa zależna od podłoża. */
  step(surface = 'grass') {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const minGap = surface === 'water' ? 0.24 : 0.26;
    if (now - this.lastStep < minGap) return;
    this.lastStep = now;
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

  // ---------------------------------------------------------------------- UI
  uiClick() { this._tone(660, 0.07, { type: 'triangle', gain: 0.05 }); }
  uiOpen() {
    this._tone(440, 0.12, { type: 'sine', gain: 0.05, slide: 80 });
    this._tone(590, 0.14, { type: 'sine', gain: 0.04, delay: 0.05, slide: 60 });
  }
  quest() { [392, 523, 659].forEach((f, i) => this._tone(f, 0.5, { type: 'triangle', gain: 0.06, delay: i * 0.09, reverb: 0.4 })); }
  objective() { [523, 698].forEach((f, i) => this._tone(f, 0.35, { type: 'sine', gain: 0.05, delay: i * 0.07 })); }
  questComplete() { [392, 523, 659, 784].forEach((f, i) => this._tone(f, 0.6, { type: 'triangle', gain: 0.07, delay: i * 0.11, reverb: 0.4 })); }
  levelUp() { [523, 659, 784, 1046].forEach((f, i) => this._tone(f, 0.7, { type: 'sine', gain: 0.09, delay: i * 0.1, reverb: 0.5 })); }
  coin() {
    this._tone(1180, 0.1, { type: 'triangle', gain: 0.06 });
    this._tone(1560, 0.12, { type: 'triangle', gain: 0.05, delay: 0.05 });
  }
  death() { [330, 261, 196, 130].forEach((f, i) => this._tone(f, 0.9, { type: 'triangle', gain: 0.09, delay: i * 0.16, slide: -20, reverb: 0.6 })); }
  victory() { [523, 659, 784, 1046, 1318].forEach((f, i) => this._tone(f, 1.2, { type: 'triangle', gain: 0.08, delay: i * 0.16, reverb: 0.6 })); }
}
