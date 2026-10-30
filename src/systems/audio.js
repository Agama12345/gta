// Dźwięk generowany w locie przez WebAudio — bez plików zewnętrznych.
export class AudioSystem {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.musicGain = null;
    this.sfxGain = null;
    this.enabled = true;
    this.musicOn = true;
    this.started = false;
    this.lastStep = 0;
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

  _startAmbient() {
    if (!this.ctx) return;
    // delikatny szum wiatru
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    src.loop = true;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 480;
    const gain = this.ctx.createGain();
    gain.gain.value = 0.035;
    src.connect(filter).connect(gain).connect(this.musicGain);
    src.start();

    // dron harmoniczny
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
      const lfo = this.ctx.createOscillator();
      lfo.frequency.value = 0.05 + i * 0.03;
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.value = 0.12;
      lfo.connect(lfoGain).connect(osc.frequency);
      lfo.start();
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

  _tone(freq, dur, { type = 'sine', gain = 0.2, slide = 0, delay = 0 } = {}) {
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
    osc.connect(g).connect(this.sfxGain);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  _noise(dur, { filterFreq = 1200, q = 1, gain = 0.16, type = 'bandpass', delay = 0 } = {}) {
    if (!this.ctx || !this.enabled) return;
    const t0 = this.ctx.currentTime + delay;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const f = this.ctx.createBiquadFilter();
    f.type = type;
    f.frequency.setValueAtTime(filterFreq, t0);
    f.frequency.exponentialRampToValueAtTime(Math.max(120, filterFreq * 0.45), t0 + dur);
    f.Q.value = q;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(gain, t0);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    src.connect(f).connect(g).connect(this.sfxGain);
    src.start(t0);
    src.stop(t0 + dur + 0.02);
  }

  swing(combo = 0) {
    this._noise(0.18, { filterFreq: 2400 + combo * 500, gain: 0.12, q: 1.6 });
    this._tone(180 + combo * 40, 0.12, { type: 'triangle', gain: 0.06, slide: -80 });
  }
  hit(crit = false) {
    this._noise(0.12, { filterFreq: crit ? 900 : 1500, gain: crit ? 0.24 : 0.16, type: 'lowpass' });
    this._tone(crit ? 140 : 220, 0.14, { type: 'square', gain: crit ? 0.12 : 0.06, slide: -60 });
  }
  enemyHit() {
    this._noise(0.1, { filterFreq: 700, gain: 0.1, type: 'lowpass' });
  }
  enemySwing() {
    this._noise(0.2, { filterFreq: 1400, gain: 0.09 });
  }
  hurt() {
    this._tone(160, 0.3, { type: 'sawtooth', gain: 0.14, slide: -70 });
    this._noise(0.2, { filterFreq: 400, gain: 0.12, type: 'lowpass' });
  }
  dodge() {
    this._noise(0.28, { filterFreq: 900, gain: 0.1, type: 'highpass' });
  }
  cast() {
    [520, 760, 1020].forEach((f, i) => this._tone(f, 0.4, { type: 'sine', gain: 0.09, delay: i * 0.05, slide: 120 }));
    this._noise(0.3, { filterFreq: 2600, gain: 0.06, type: 'highpass' });
  }
  bow() {
    this._noise(0.14, { filterFreq: 3000, gain: 0.1, type: 'highpass' });
  }
  growl() {
    this._tone(90, 0.5, { type: 'sawtooth', gain: 0.1, slide: -30 });
  }
  slam() {
    this._tone(70, 0.55, { type: 'sine', gain: 0.3, slide: -35 });
    this._noise(0.5, { filterFreq: 300, gain: 0.24, type: 'lowpass' });
  }
  drink() {
    this._tone(420, 0.16, { type: 'sine', gain: 0.08, slide: 200 });
    this._tone(620, 0.2, { type: 'sine', gain: 0.05, delay: 0.08, slide: 160 });
  }
  uiClick() {
    this._tone(660, 0.07, { type: 'triangle', gain: 0.05 });
  }
  uiOpen() {
    this._tone(440, 0.12, { type: 'sine', gain: 0.05, slide: 80 });
    this._tone(590, 0.14, { type: 'sine', gain: 0.04, delay: 0.05, slide: 60 });
  }
  quest() {
    [392, 523, 659].forEach((f, i) => this._tone(f, 0.5, { type: 'triangle', gain: 0.06, delay: i * 0.09 }));
  }
  objective() {
    [523, 698].forEach((f, i) => this._tone(f, 0.35, { type: 'sine', gain: 0.05, delay: i * 0.07 }));
  }
  questComplete() {
    [392, 523, 659, 784].forEach((f, i) => this._tone(f, 0.6, { type: 'triangle', gain: 0.07, delay: i * 0.11 }));
  }
  levelUp() {
    [523, 659, 784, 1046].forEach((f, i) => this._tone(f, 0.7, { type: 'sine', gain: 0.09, delay: i * 0.1 }));
  }
  coin() {
    this._tone(1180, 0.1, { type: 'triangle', gain: 0.06 });
    this._tone(1560, 0.12, { type: 'triangle', gain: 0.05, delay: 0.05 });
  }
  step() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    if (now - this.lastStep < 0.3) return;
    this.lastStep = now;
    this._noise(0.09, { filterFreq: 500, gain: 0.035, type: 'lowpass' });
  }
  death() {
    [330, 261, 196, 130].forEach((f, i) => this._tone(f, 0.9, { type: 'triangle', gain: 0.09, delay: i * 0.16, slide: -20 }));
  }
  victory() {
    [523, 659, 784, 1046, 1318].forEach((f, i) => this._tone(f, 1.2, { type: 'triangle', gain: 0.08, delay: i * 0.16 }));
  }
}
