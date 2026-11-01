// Wspólny „silnik chodu” dla bohatera i mieszkańców.
//
// Animacja nóg nie jest już prostą sinusoidą: cykl jest liczony w metrach
// (krok = pokonany dystans, nie czas — stopy nie ślizgają się po ziemi),
// a staw skokowy pracuje jak u człowieka: pięta → płasko → odbicie palcami.
// Dodatkowo stopy dopasowują się do nierówności terenu (lekkie IK).

/** Długość jednego kroku (m) — dwa kroki to pełny cykl animacji. */
export const STRIDE_WALK = 0.72;
export const STRIDE_RUN = 1.05;

/** Prędkość kątowa cyklu (rad/s) wynikająca z faktycznie pokonywanego dystansu. */
export function phaseRate(speed, run = false) {
  const stride = run ? STRIDE_RUN : STRIDE_WALK;
  return (Math.max(0, speed) / (2 * stride)) * Math.PI * 2;
}

/** Interpolacja liniowa po kluczach [t, wartość] posortowanych rosnąco. */
function curve(keys, t) {
  const x = ((t % 1) + 1) % 1;
  for (let i = 0; i < keys.length - 1; i++) {
    const [t0, v0] = keys[i];
    const [t1, v1] = keys[i + 1];
    if (x >= t0 && x <= t1) {
      const k = t1 === t0 ? 0 : (x - t0) / (t1 - t0);
      // wygładzenie (smoothstep) — bez „klików” na granicach klatek
      const s = k * k * (3 - 2 * k);
      return v0 + (v1 - v0) * s;
    }
  }
  return keys[0][1];
}

// 0 = kontakt pięty, 0.5 = środek podporu, 0.62 = odbicie, 0.8 = środek wymachu
const ANKLE_KEYS = [
  [0, 0.24], [0.1, 0.1], [0.2, 0.0], [0.45, -0.06],
  [0.6, -0.5], [0.68, -0.62], [0.8, -0.18], [0.92, 0.12], [1, 0.24],
];
const KNEE_KEYS = [
  [0, -0.1], [0.08, -0.3], [0.2, -0.16], [0.42, -0.12],
  [0.56, -0.5], [0.66, -0.95], [0.8, -0.85], [0.92, -0.26], [1, -0.1],
];
const HIP_KEYS = [
  [0, 0.36], [0.25, 0.22], [0.5, -0.02], [0.62, -0.3],
  [0.8, -0.12], [0.92, 0.18], [1, 0.36],
];

/**
 * Ustawia jeden cykl chodu dla obu nóg.
 * @param {object} parts części modelu (legs, shins, ankles)
 * @param {number} phase faza cyklu w radianach
 * @param {object} o { amp, run, spread }
 */
export function applyGait(parts, phase, o = {}) {
  const { legs = [], shins = [], ankles = [] } = parts;
  const amp = o.amp ?? 1;
  const run = !!o.run;
  const t0 = phase / (Math.PI * 2);
  for (let i = 0; i < 2; i++) {
    const leg = legs[i];
    if (!leg) continue;
    const t = t0 + (i === 0 ? 0 : 0.5);
    leg.rotation.x = curve(HIP_KEYS, t) * amp * (run ? 1.22 : 1);
    if (shins[i]) shins[i].rotation.x = curve(KNEE_KEYS, t) * amp * (run ? 1.18 : 1);
    if (ankles[i]) {
      // w biegu stopa pracuje mocniej, w chodzie delikatniej
      ankles[i].rotation.x = curve(ANKLE_KEYS, t) * amp * (run ? 1.15 : 0.85);
    }
  }
}

/**
 * Dopasowanie stóp do terenu: podniesiona noga (wymach) nie zahacza,
 * a noga podporowa „dosiada” zbocze.
 * @param {object} parts części modelu
 * @param {number[]} lifts różnica wysokości gruntu względem pozycji ciała (na stopę)
 */
export function applyFootIK(parts, lifts) {
  const { legs = [], shins = [], ankles = [] } = parts;
  for (let i = 0; i < 2; i++) {
    const lift = lifts[i] ?? 0;
    if (Math.abs(lift) < 0.005) continue;
    const l = Math.max(-0.3, Math.min(0.3, lift));
    if (legs[i]) legs[i].rotation.x += l * 0.45;
    if (shins[i]) shins[i].rotation.x -= l * 1.5;
    if (ankles[i]) ankles[i].rotation.x -= l * 0.8;
  }
}

/** Skręt tułowia i barków przeciwny do nóg + stabilizacja głowy. */
export function applyTorsoCounter(parts, phase, amp = 1) {
  const { body, head, arms = [] } = parts;
  if (body) body.rotation.y += Math.sin(phase) * 0.09 * amp;
  if (head) {
    head.rotation.y -= Math.sin(phase) * 0.05 * amp;
    head.rotation.z = Math.sin(phase * 2) * 0.012 * amp;
  }
  // barki opadają naprzemiennie — inaczej sylwetka wygląda sztywno
  if (arms[0]) arms[0].rotation.z += Math.sin(phase) * 0.03 * amp;
  if (arms[1]) arms[1].rotation.z -= Math.sin(phase) * 0.03 * amp;
}
