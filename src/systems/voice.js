// Głosy postaci — synteza mowy systemu (Windows/Edge/Chrome).
// Każdy mieszkaniec ma własną barwę (wysokość i tempo), a kwestie są czytane
// dokładnie wtedy, gdy pojawiają się na ekranie. Gdy w systemie nie ma
// polskiego głosu, gra działa dalej — tylko bez mowy.
const VOICE_PROFILES = {
  eryn: { pitch: 0.72, rate: 0.86, hint: 'męski' },
  borys: { pitch: 0.6, rate: 0.9, hint: 'męski' },
  marena: { pitch: 1.24, rate: 0.98, hint: 'żeński' },
  bogdan: { pitch: 0.85, rate: 1.05, hint: 'męski' },
  hagar: { pitch: 0.66, rate: 0.82, hint: 'męski' },
  rudolf: { pitch: 0.78, rate: 0.94, hint: 'męski' },
  duch: { pitch: 1.05, rate: 0.72, hint: 'żeński' },
  kaldras: { pitch: 0.45, rate: 0.78, hint: 'męski' },
  narrator: { pitch: 0.9, rate: 0.92, hint: 'męski' },
};

const DEFAULT_PROFILE = { pitch: 0.92, rate: 0.95, hint: 'męski' };

export class VoiceSystem {
  constructor(game) {
    this.game = game;
    this.supported = typeof window !== 'undefined' && 'speechSynthesis' in window
      && typeof window.SpeechSynthesisUtterance === 'function';
    this.enabled = true;
    this.voice = null;
    this.polish = false;
    this.voicesReady = false;
    this.current = null;
    this.lastText = '';
    this._resolveVoices = this._resolveVoices.bind(this);
    if (!this.supported) return;
    try {
      this._resolveVoices();
      // WebView2/Chrome nie zawsze mają addEventListener na speechSynthesis —
      // ustawiamy i właściwość, i zdarzenie, i kilka prób opóźnionych.
      window.speechSynthesis.onvoiceschanged = this._resolveVoices;
      window.speechSynthesis.addEventListener?.('voiceschanged', this._resolveVoices);
      [300, 800, 1600, 3000, 5000].forEach((ms) => setTimeout(() => {
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
    if (!list.length) {
      this._tries = (this._tries ?? 0) + 1;
      return;
    }
    const polish = list.filter((v) => (v.lang || '').toLowerCase().startsWith('pl'));
    this._all = list;
    this.polish = polish.length > 0;
    // preferuj głosy żeńskie/męskie zgodnie z postacią (tylko jeśli są warianty)
    this.voice = polish[0] ?? list.find((v) => (v.lang || '').toLowerCase().startsWith('en')) ?? list[0];
    this.voicesReady = true;
    this.onReady?.(this);
  }

  get available() {
    return this.supported && this.voicesReady && !!this.voice;
  }

  /** Krótki opis stanu — pokazywany w ustawieniach. */
  status() {
    if (!this.supported) return 'Synteza mowy niedostępna w tej przeglądarce.';
    if (!this.voicesReady) return 'Wczytywanie głosów…';
    if (!this.polish) return 'Brak polskiego głosu w systemie — dialogi są tylko pisane.';
    return `Głos: ${this.voice.name}`;
  }

  _pickVoice(profile) {
    const list = this._all || [];
    const polish = list.filter((v) => (v.lang || '').toLowerCase().startsWith('pl'));
    if (!polish.length) return this.voice;
    // heurystyka: głosy żeńskie mają zwykle „female/Aria/Paulina/Zofia”
    const female = polish.find((v) => /female|paulina|zofia|aria|kobieta/i.test(v.name));
    const male = polish.find((v) => /male|marek|adam|jacek|mezczyzna|mężczyzna/i.test(v.name));
    if (profile.hint === 'żeński' && female) return female;
    if (profile.hint === 'męski' && male) return male;
    return polish[0];
  }

  /** Czyści tekst z cudzysłowów i znaków, których syntezator nie lubi. */
  _clean(text) {
    return String(text ?? '')
      .replace(/[„”"«»]/g, '')
      .replace(/—|–/g, ', ')
      .replace(/\.\.\./g, '…')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Czyta kwestię. Zwraca true, jeśli mowa faktycznie się zaczęła.
   * @param {string} text
   * @param {string} speakerId
   */
  speak(text, speakerId = 'narrator') {
    if (!this.supported || !this.enabled) return false;
    const clean = this._clean(text);
    if (!clean) return false;
    if (clean === this.lastText) return false;
    this.lastText = clean;
    const profile = VOICE_PROFILES[speakerId] ?? DEFAULT_PROFILE;
    try {
      window.speechSynthesis.cancel();
      const u = new window.SpeechSynthesisUtterance(clean.slice(0, 480));
      u.lang = this.polish ? 'pl-PL' : (this.voice?.lang || 'pl-PL');
      const v = this._pickVoice(profile);
      if (v) u.voice = v;
      u.pitch = profile.pitch;
      u.rate = profile.rate;
      u.volume = 1;
      u.onstart = () => { this.speaking = true; };
      u.onend = () => { this.speaking = false; this.current = null; };
      u.onerror = () => { this.speaking = false; this.current = null; };
      this.current = u;
      window.speechSynthesis.speak(u);
      return true;
    } catch (err) {
      return false;
    }
  }

  /** Czyta i wyświetla dymek (dla postaci niezależnych). */
  say(text, speakerId) {
    this.speak(text, speakerId);
  }

  stop() {
    this.lastText = '';
    if (!this.supported) return;
    try {
      window.speechSynthesis.cancel();
    } catch (err) { /* ignorujemy */ }
    this.speaking = false;
    this.current = null;
  }

  toggle() {
    this.enabled = !this.enabled;
    if (!this.enabled) this.stop();
    else this.lastText = '';
    return this.enabled;
  }
}
