// Muzyka tła — generowana na żywo (bez plików), w duchu średniowiecza:
// drony kwintowe, miękkie pady akordowe, harfa i bęben w walce.
// System jest sterowany nastrojem: spokój / wioska / noc / walka / boss.
//
// Wszystko gra na tym samym AudioContext co efekty (patrz `systems/audio.js`),
// więc wyciszenie gry wycisza i muzykę, a ustawienia głośności działają wspólnie.

const SEMITONE = (n) => Math.pow(2, n / 12);

// Progresje w kopii doryckiej — brzmi „starożytnie”, ale nie fałszywie.
const PROGRESSIONS = {
  calm: [
    [0, 3, 7], // d-moll
    [-4, 0, 3], // B-dur
    [-2, 2, 5], // C-dur
    [-5, -1, 2], // A-dur
  ],
  village: [
    [0, 4, 7], // D-dur (cieplej)
    [5, 9, 12], // G-dur
    [-2, 2, 5], // C-dur
    [-5, -1, 2], // A-dur
  ],
  night: [
    [0, 3, 7],
    [-4, 0, 3],
    [-7, -4, 0],
    [-2, 2, 5],
  ],
  combat: [
    [0, 3, 7],
    [-2, 2, 5],
    [-4, 0, 3],
    [-5, -1, 2],
  ],
  boss: [
    [0, 3, 7],
    [-1, 3, 6],
    [-4, 0, 3],
    [-6, -2, 1],
  ],
};

const ROOT = { calm: 146.83, village: 174.61, night: 130.81, combat: 146.83, boss: 116.54 }; // D3/F3/C3/D3/Bb2

export class MusicSystem {
  constructor(audio) {
    this.audio = audio;
    this.enabled = true;
    this.mode = 'calm';
    this.targetMode = 'calm';
    this.intensity = 0;
    this.time = 0;
    this.beat = 0;
    this.bar = 0;
    this.step = 0;
    this.chordIndex = 0;
    this.nextEvent = 0;
    this.nodes = null;
    this.volume = 0.16;
    this._moodFade = 0;
  }

  get ctx() {
    return this.audio?.ctx ?? null;
  }

  get ready() {
    return !!this.ctx && !!this.audio?.musicGain;
  }

  start() {
    if (!this.ready || this.nodes) return false;
    const ctx = this.ctx;
    const out = this.audio.musicGain;

    // ---- dron: dwie piły o niskim odchyleniu + filtr dolnoprzepustowy ------
    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.0001;
    const droneFilter = ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.value = 520;
    droneFilter.Q.value = 0.7;
    droneGain.connect(droneFilter).connect(out);

    const droneOsc = [];
    for (const [freq, detune, gain] of [[1, -6, 0.5], [1, 7, 0.42], [1.5, 3, 0.22], [2, -4, 0.12]]) {
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.value = ROOT.calm * freq;
      osc.detune.value = detune;
      const g = ctx.createGain();
      g.gain.value = gain;
      osc.connect(g).connect(droneGain);
      osc.start();
      droneOsc.push(osc);
    }

    // ---- pad akordowy: trzy głosy z wolno otwieraną obwiednią -------------
    const padGain = ctx.createGain();
    padGain.gain.value = 0.0001;
    const padFilter = ctx.createBiquadFilter();
    padFilter.type = 'lowpass';
    padFilter.frequency.value = 1100;
    padFilter.Q.value = 0.4;
    padGain.connect(padFilter).connect(out);

    const padVoices = [];
    for (let i = 0; i < 3; i++) {
      const osc = ctx.createOscillator();
      osc.type = i === 1 ? 'triangle' : 'sine';
      osc.frequency.value = ROOT.calm * SEMITONE([0, 3, 7][i]);
      const g = ctx.createGain();
      g.gain.value = 0.0;
      osc.connect(g).connect(padGain);
      osc.start();
      padVoices.push({ osc, gain: g });
    }

    out.gain.value = this.volume;
    this.nodes = { droneGain, droneFilter, droneOsc, padGain, padFilter, padVoices, out };
    this._fadeTo(1, 6);
    return true;
  }

  _fadeTo(target, seconds = 3) {
    if (!this.nodes) return;
    const now = this.ctx.currentTime;
    const g = this.nodes.droneGain.gain;
    g.cancelScheduledValues(now);
    g.setTargetAtTime(Math.max(0.0001, target * 0.5), now, seconds / 3);
    if (seconds >= 2.5) {
      this.nodes.padGain.gain.cancelScheduledValues(now);
      this.nodes.padGain.gain.setTargetAtTime(Math.max(0.0001, target * 0.16), now, seconds / 3);
    }
  }

  setEnabled(on) {
    this.enabled = on;
    if (!this.nodes) {
      if (on) this.start();
      return this.enabled;
    }
    this._fadeTo(on ? 1 : 0.0001, 1.4);
    return this.enabled;
  }

  toggle() {
    return this.setEnabled(!this.enabled);
  }

  setVolume(v) {
    this.volume = Math.max(0, Math.min(1, v));
    if (this.audio?.musicGain) this.audio.musicGain.gain.value = this.volume;
  }

  /** Nastrój: calm | village | night | combat | boss. */
  setMood(mode) {
    if (!PROGRESSIONS[mode]) return;
    this.targetMode = mode;
  }

  /**
   * Wywoływane co klatkę. Muzyka jest planowana „z wyprzedzeniem” na zegarze
   * AudioContext, więc nie zależy od płynności klatek.
   */
  update(dt, { combat = 0, night = 0, village = 0, boss = false } = {}) {
    if (!this.ready) return;
    if (!this.nodes && this.enabled) this.start();
    if (!this.nodes) return;

    // wybór nastroju: walka > boss > wioska > noc > spokój
    const target = boss ? 'boss' : combat > 0.15 ? 'combat' : village > 0.35 ? 'village' : night > 0.5 ? 'night' : 'calm';
    this.setMood(target);

    this.intensity += ((combat > 0.15 ? 1 : 0) - this.intensity) * Math.min(1, dt * 0.8);

    if (this.mode !== this.targetMode) {
      this._moodFade += dt;
      if (this._moodFade > 1.6) {
        this.mode = this.targetMode;
        this._moodFade = 0;
        this.chordIndex = 0;
        this._applyRoot();
      }
    }

    const now = this.ctx.currentTime;
    if (this.nextEvent === 0) this.nextEvent = now + 0.4;

    const bpm = this.mode === 'combat' || this.mode === 'boss' ? 96 : this.mode === 'village' ? 74 : 62;
    const beatDur = 60 / bpm;
    while (this.nextEvent < now + 0.25) {
      this._scheduleStep(this.nextEvent, beatDur);
      this.nextEvent += beatDur;
    }
  }

  _applyRoot() {
    if (!this.nodes) return;
    const root = ROOT[this.mode] ?? ROOT.calm;
    const now = this.ctx.currentTime;
    const [a, b, c, d] = this.nodes.droneOsc;
    a.frequency.setTargetAtTime(root, now, 1.2);
    b.frequency.setTargetAtTime(root, now, 1.2);
    c.frequency.setTargetAtTime(root * 1.5, now, 1.4);
    d.frequency.setTargetAtTime(root * 2, now, 1.6);
    this.nodes.droneFilter.frequency.setTargetAtTime(
      this.mode === 'combat' ? 900 : this.mode === 'night' ? 380 : 560, now, 2
    );
    this.nodes.padFilter.frequency.setTargetAtTime(this.mode === 'boss' ? 1500 : 1050, now, 2);
  }

  _scheduleStep(when, beatDur) {
    const prog = PROGRESSIONS[this.mode] ?? PROGRESSIONS.calm;
    const root = ROOT[this.mode] ?? ROOT.calm;
    const step = this.step++ % 8;
    const isCombat = this.mode === 'combat' || this.mode === 'boss';

    // akord zmienia się co dwa takty; pad „oddycha”
    if (step === 0) {
      this.chordIndex = (this.chordIndex + 1) % prog.length;
      const chord = prog[this.chordIndex];
      const voices = this.nodes.padVoices;
      voices.forEach((v, i) => {
        const semi = chord[i] + (this.mode === 'night' ? -12 : 0);
        v.osc.frequency.setTargetAtTime(root * SEMITONE(semi) * 1.0, when, 0.35);
        v.gain.gain.cancelScheduledValues(when);
        v.gain.gain.setValueAtTime(0.0001, when);
        v.gain.gain.linearRampToValueAtTime(0.055, when + 1.1);
        v.gain.gain.linearRampToValueAtTime(0.03, when + beatDur * 7);
      });
    }

    // harfa: rozłożony akord co dwa uderzenia (w walce gęściej)
    const chord = prog[this.chordIndex];
    const arpEvery = isCombat ? 2 : 4;
    if (step % arpEvery === 0) {
      const note = chord[(step / arpEvery) % chord.length | 0];
      this._harp(root * SEMITONE(note) * 2, when, isCombat ? 0.5 : 0.85);
      if (!isCombat && Math.random() < 0.45) {
        this._harp(root * SEMITONE(chord[(step / arpEvery + 1) % chord.length | 0]) * 2, when + beatDur * 0.5, 0.6);
      }
    }

    // melodia: pentatonika, spokojna, z przerwami
    if (!isCombat && step % 4 === 2 && Math.random() < 0.6) {
      const scale = [0, 2, 3, 5, 7, 9, 10, 12];
      const semi = scale[Math.floor(Math.random() * scale.length)];
      this._flute(root * SEMITONE(semi) * 4, when + beatDur * 0.25, beatDur * 1.6);
    }

    // bęben: tylko w walce i u bossa
    if (isCombat) {
      const strong = step % 4 === 0;
      this._drum(when, strong ? 0.9 : 0.45, strong ? 62 : 84);
      if (this.mode === 'boss' && step % 8 === 6) this._drum(when + beatDur * 0.5, 0.6, 110);
    }
  }

  // ---- instrumenty -------------------------------------------------------
  _harp(freq, when, gainScale = 1) {
    const ctx = this.ctx;
    if (!ctx || !this.enabled) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = Math.max(40, Math.min(2600, freq));
    const peak = 0.05 * gainScale * (this.enabled ? 1 : 0);
    g.gain.setValueAtTime(0.0001, when);
    g.gain.linearRampToValueAtTime(peak, when + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0004, when + 1.5);
    osc.connect(g).connect(this.nodes.out);
    if (this.audio.reverb) g.connect(this.audio.reverb);
    osc.start(when);
    osc.stop(when + 1.6);
  }

  _flute(freq, when, dur) {
    const ctx = this.ctx;
    if (!ctx || !this.enabled) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 2200;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(Math.max(80, Math.min(2400, freq)), when);
    // delikatne vibrato — flet nie brzmi sterylnie
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 5.2;
    lfoGain.gain.value = freq * 0.006;
    lfo.connect(lfoGain).connect(osc.frequency);
    g.gain.setValueAtTime(0.0001, when);
    g.gain.linearRampToValueAtTime(0.032, when + 0.22);
    g.gain.linearRampToValueAtTime(0.024, when + dur * 0.7);
    g.gain.exponentialRampToValueAtTime(0.0004, when + dur);
    osc.connect(filter).connect(g).connect(this.nodes.out);
    if (this.audio.reverb) g.connect(this.audio.reverb);
    lfo.start(when);
    osc.start(when);
    osc.stop(when + dur + 0.1);
    lfo.stop(when + dur + 0.1);
  }

  _drum(when, gainScale, baseFreq) {
    const ctx = this.ctx;
    if (!ctx || !this.enabled) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, when);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.45, when + 0.16);
    g.gain.setValueAtTime(0.0001, when);
    g.gain.linearRampToValueAtTime(0.11 * gainScale, when + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0004, when + 0.32);
    osc.connect(g).connect(this.nodes.out);
    osc.start(when);
    osc.stop(when + 0.36);

    // szum uderzenia
    const noise = ctx.createBufferSource();
    if (this.audio.noiseBuffer) noise.buffer = this.audio.noiseBuffer;
    if (!noise.buffer) return;
    const ng = ctx.createGain();
    const nf = ctx.createBiquadFilter();
    nf.type = 'lowpass';
    nf.frequency.value = 420;
    ng.gain.setValueAtTime(0.05 * gainScale, when);
    ng.gain.exponentialRampToValueAtTime(0.0004, when + 0.12);
    noise.connect(nf).connect(ng).connect(this.nodes.out);
    noise.start(when);
    noise.stop(when + 0.14);
  }

  stop() {
    const ctx = this.ctx;
    if (!ctx || !this.nodes) return;
    const now = ctx.currentTime;
    this.nodes.droneGain.gain.setTargetAtTime(0.0001, now, 0.4);
    this.nodes.padGain.gain.setTargetAtTime(0.0001, now, 0.4);
    const nodes = this.nodes;
    setTimeout(() => {
      for (const osc of nodes.droneOsc) { try { osc.stop(); } catch { /* już zatrzymany */ } }
      for (const v of nodes.padVoices) { try { v.osc.stop(); } catch { /* już zatrzymany */ } }
    }, 1600);
    this.nodes = null;
  }
}
