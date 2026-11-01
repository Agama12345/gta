// Głosy postaci — synteza mowy systemu (Windows / Edge / Chrome).
// Każdy mieszkaniec ma własną barwę, tempo i głośność, a kwestia jest czytana
// zdanie po zdaniu z pauzami, tak jak mówi aktor — nie monotonnym strumieniem.
//
// Dodatkowo: analiza emocji (pytanie, wykrzyknik, urwane zdanie), podświetlanie
// wypowiadanego słowa (onboundary) i wybór głosu żeński/męski, gdy system ma oba.

const PROFILES = {
  // ---- mieszkańcy Wilczej Doliny ----
  eryn: { pitch: 0.72, rate: 0.84, volume: 1.0, hint: 'męski', timbre: 'stary, spokojny' },
  borys: { pitch: 0.58, rate: 0.92, volume: 1.05, hint: 'męski', timbre: 'niski, chropowaty' },
  marena: { pitch: 1.26, rate: 0.96, volume: 0.95, hint: 'żeński', timbre: 'ciepły' },
  zorzan: { pitch: 0.88, rate: 1.08, volume: 0.95, hint: 'męski', timbre: 'handlowy, szybki' },
  wilk: { pitch: 0.68, rate: 0.98, volume: 1.05, hint: 'męski', timbre: 'wojskowy' },
  iskra: { pitch: 1.42, rate: 1.12, volume: 0.9, hint: 'żeński', timbre: 'młody' },
  pustelnik: { pitch: 0.66, rate: 0.76, volume: 0.85, hint: 'męski', timbre: 'szept' },
  kupiec: { pitch: 0.9, rate: 1.04, volume: 0.95, hint: 'męski', timbre: 'obcy akcent' },
  rybak: { pitch: 0.8, rate: 0.9, volume: 1.0, hint: 'męski', timbre: 'zmęczony' },
  // ---- istoty nieludzkie ----
  duch: { pitch: 1.12, rate: 0.7, volume: 0.8, hint: 'żeński', timbre: 'widmowy', echo: true },
  kaldras: { pitch: 0.4, rate: 0.72, volume: 1.1, hint: 'męski', timbre: 'zgłębiony', echo: true },
  narrator: { pitch: 0.9, rate: 0.94, volume: 0.95, hint: 'męski', timbre: 'narrator' },
  player: { pitch: 0.95, rate: 1.0, volume: 1.0, hint: 'męski', timbre: 'bohater' },
};

const DEFAULT_PROFILE = { pitch: 0.92, rate: 0.95, volume: 1, hint: 'męski', timbre: 'głos' };

/** Barwa wyliczana z nazwy — nowe postacie nie zostają bez własnego głosu. */
function hashProfile(id) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 9973;
  const pitch = 0.62 + (h % 60) / 100;           // 0.62 – 1.22
  const rate = 0.82 + ((h >> 3) % 30) / 100;     // 0.82 – 1.12
  return { pitch, rate, volume: 1, hint: h % 2 ? 'żeński' : 'męski', timbre: 'mieszkaniec' };
}

export function profileFor(id) {
  return PROFILES[id] ?? hashProfile(String(id ?? 'narrator'));
}

export class VoiceSystem {
  constructor(game) {
    this.game = game;
    this.supported = typeof window !== 'undefined'
      && 'speechSynthesis' in window
      && typeof window.SpeechSynthesisUtterance === 'function';
    this.enabled = true;
    this.voice = null;
    this.polish = false;
    this.voicesReady = false;
    this.current = null;
    this.speaking = false;
    this.lastText = '';
    this.queue = [];
    this._token = 0;
    this._resolveVoices = this._resolveVoices.bind(this);

    if (!this.supported) return;
    try {
      this._resolveVoices();
      window.speechSynthesis.onvoiceschanged = this._resolveVoices;
      window.speechSynthesis.addEventListener?.('voiceschanged', this._resolveVoices);
      [250, 700, 1500, 3000, 6000].forEach((ms) => setTimeout(() => {
        if (!this.voicesReady) this._resolveVoices();
      }, ms));
    } catch (err) {
      this.supported = false;
    }
  }

  _resolveVoices() {
    if (!this.supported) return;
    let list = [];
    try {
      list = window.speechSynthesis.getVoices() || [];
    } catch (err) {
      list = [];
    }
    if (!list.length) return;
    const polish = list.filter((v) => (v.lang || '').toLowerCase().startsWith('pl'));
    this._all = list;
    this.polish = polish.length > 0;
    this.voice = polish[0] ?? list.find((v) => (v.lang || '').toLowerCase().startsWith('en')) ?? list[0];
    this.voicesReady = true;
    this.onReady?.(this);
  }

  get available() {
    return this.supported && this.voicesReady && !!this.voice;
  }

  status() {
    if (!this.supported) return 'Synteza mowy niedostępna w tej przeglądarce.';
    if (!this.voicesReady) return 'Wczytywanie głosów…';
    const count = (this._all ?? []).filter((v) => (v.lang || '').toLowerCase().startsWith('pl')).length;
    if (!this.polish) return 'Brak polskiego głosu w systemie — dialogi są tylko pisane.';
    return `Głos: ${this.voice.name}${count > 1 ? ` (polskich głosów: ${count})` : ''}`;
  }

  _pickVoice(profile) {
    const list = (this._all || []).filter((v) => (v.lang || '').toLowerCase().startsWith('pl'));
    if (!list.length) return this.voice;
    const female = list.find((v) => /female|paulina|zofia|aria|kobieta|ewa|kinga/i.test(v.name));
    const male = list.find((v) => /male|marek|adam|jacek|mezczyzna|mężczyzna|jan/i.test(v.name));
    if (profile.hint === 'żeński' && female) return female;
    if (profile.hint === 'męski' && male) return male;
    return this.enabledVoices?.[0] ?? list[0];
  }

  /** Tekst oczyszczony z cudzysłowów, myślników scenicznych i nawiasów. */
  _clean(text) {
    return String(text ?? '')
      .replace(/\((?:[^)]*)\)/g, ' ')
      .replace(/[„”"«»]/g, '')
      .replace(/—|–/g, ', ')
      .replace(/\.\.\./g, '…')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /** Dzieli kwestię na zdania (krótkie fragmenty brzmią jak mowa, nie jak lektor). */
  _sentences(text) {
    const clean = this._clean(text);
    if (!clean) return [];
    const parts = clean.match(/[^.!?…]+[.!?…]*/g) ?? [clean];
    return parts.map((p) => p.trim()).filter(Boolean);
  }

  /** Emocja zdania: pytanie, wykrzyknik, urwane, spokojne. */
  _emotion(sentence) {
    if (/\?/.test(sentence)) return { pitch: 1.1, rate: 1.02, pause: 260, mood: 'pytanie' };
    if (/!/.test(sentence)) return { pitch: 1.06, rate: 1.08, pause: 300, mood: 'gniew' };
    if (/…/.test(sentence)) return { pitch: 1.04, rate: 0.82, pause: 420, mood: 'wahanie' };
    if (sentence.length < 14) return { pitch: 0.99, rate: 0.96, pause: 180, mood: 'krótko' };
    return { pitch: 1, rate: 1, pause: 210, mood: 'spokój' };
  }

  /**
   * Czyta kwestię postaci. Zwraca true, gdy mowa ruszyła.
   * @param {string} text
   * @param {string} speakerId
   * @param {{ onWord?: (index:number, word:string)=>void, onDone?: ()=>void }} hooks
   */
  speak(text, speakerId = 'narrator', hooks = {}) {
    if (!this.supported || !this.enabled) return false;
    const sentences = this._sentences(text);
    if (!sentences.length) return false;
    const joined = sentences.join(' ');
    if (joined === this.lastText) return false;
    this.lastText = joined;
    this.stop(true);

    const profile = profileFor(speakerId);
    const token = ++this._token;
    this.speaking = true;
    this.currentProfile = profile;
    this._wordOffset = 0;

    const speakSentence = (i) => {
      if (token !== this._token || !this.enabled) return;
      if (i >= sentences.length) {
        this.speaking = false;
        this.current = null;
        hooks.onDone?.();
        return;
      }
      const sentence = sentences[i];
      const emo = this._emotion(sentence);
      try {
        const u = new window.SpeechSynthesisUtterance(sentence.slice(0, 260));
        u.lang = this.polish ? 'pl-PL' : (this.voice?.lang || 'pl-PL');
        const v = this._pickVoice(profile);
        if (v) u.voice = v;
        u.pitch = Math.max(0.1, Math.min(2, profile.pitch * emo.pitch));
        u.rate = Math.max(0.5, Math.min(2, profile.rate * emo.rate));
        u.volume = Math.max(0, Math.min(1, profile.volume ?? 1));
        if (hooks.onWord) {
          u.onboundary = (ev) => {
            if (token !== this._token) return;
            const raw = sentence.slice(ev.charIndex ?? 0).split(/[\s,.!?…]+/)[0] ?? '';
            hooks.onWord(this._wordOffset + (ev.charIndex ?? 0), raw);
          };
        }
        u.onend = () => {
          if (token !== this._token) return;
          this._wordOffset += sentence.length + 1;
          setTimeout(() => speakSentence(i + 1), emo.pause * (profile.rate < 0.85 ? 1.2 : 1));
        };
        u.onerror = () => {
          if (token !== this._token) return;
          this.speaking = false;
          this.current = null;
          speakSentence(i + 1);
        };
        this.current = u;
        this.currentEmotion = emo.mood;
        window.speechSynthesis.speak(u);
      } catch (err) {
        this.speaking = false;
        this.current = null;
      }
    };

    try {
      window.speechSynthesis.cancel();
      speakSentence(0);
      return true;
    } catch (err) {
      this.speaking = false;
      return false;
    }
  }

  /** Krótka kwestia w tle (NPC rzuca zdanie, gdy przechodzisz obok). */
  say(text, speakerId) {
    return this.speak(text, speakerId);
  }

  stop(silent = false) {
    this.lastText = silent ? this.lastText : '';
    this._token += 1;
    if (this.supported) {
      try {
        window.speechSynthesis.cancel();
      } catch (err) { /* ignorujemy */ }
    }
    this.speaking = false;
    this.current = null;
  }

  /** Próbne odczytanie próbki głosem postaci (ekran ustawień). */
  preview(speakerId = 'eryn') {
    const samples = {
      eryn: 'Wilcza Dolina nie jest bogata, ale ma dach i ogień.',
      marena: 'Zioła zbieraj o świcie, wtedy mają najwięcej mocy.',
      borys: 'Stal trzeba kuć z cierpliwością, chłopcze.',
      kaldras: 'Wrota były zamknięte. Kto je otworzył?',
    };
    this.stop();
    this.lastText = '';
    return this.speak(samples[speakerId] ?? samples.eryn, speakerId);
  }

  toggle() {
    this.enabled = !this.enabled;
    if (!this.enabled) this.stop();
    else this.lastText = '';
    return this.enabled;
  }
}
