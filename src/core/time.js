import * as THREE from 'three';
import { clamp, lerp, smoothstep, TAU } from './utils.js';

// Cykl dnia i nocy. Pełna doba trwa 6 minut.
export const DAY_LENGTH = 360;

export class DayNight {
  constructor(initialHour = 8.5) {
    this.time = initialHour / 24;
    this.day = 1;
    this.sunDir = new THREE.Vector3();
    this.ambientColor = new THREE.Color();
    this.sunColor = new THREE.Color();
    this.fogColor = new THREE.Color();
    this.sunIntensity = 1;
    this.ambientIntensity = 0.5;
  }

  get hour() {
    return this.time * 24;
  }

  get isNight() {
    return this.hour < 6.1 || this.hour > 20.2;
  }

  get isDusk() {
    return this.hour > 17.4 && this.hour < 20.2;
  }

  get clockString() {
    const h = Math.floor(this.hour);
    const m = Math.floor((this.hour - h) * 60);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }

  update(dt) {
    this.time += dt / DAY_LENGTH;
    while (this.time >= 1) {
      this.time -= 1;
      this.day += 1;
    }
    this.apply();
  }

  setHour(h) {
    this.time = ((h % 24) + 24) % 24 / 24;
    this.apply();
  }

  skipTo(hour) {
    const target = ((hour % 24) + 24) % 24;
    if (target <= this.hour) this.day += 1;
    this.setHour(target);
  }

  // Krzywa światła oparta na godzinie — pełny dzień 7:00–17:00,
  // złota godzina 17:00–20:30 i 5:00–7:00, noc po 20:30.
  apply() {
    const h = this.hour;
    const angle = (this.time - 0.25) * TAU;
    const elevation = Math.sin(angle);
    this.elevation = elevation;

    let dayF;
    if (h >= 7 && h <= 17.8) dayF = 1;
    else if (h > 17.8 && h < 20.8) dayF = 1 - smoothstep(17.8, 20.8, h);
    else if (h >= 5 && h < 7) dayF = smoothstep(5, 7, h);
    else dayF = 0;

    const duskEvening = Math.max(0, 1 - Math.abs(h - 18.7) / 2.3);
    const duskMorning = Math.max(0, 1 - Math.abs(h - 6.1) / 1.9);
    const duskF = Math.max(duskEvening, duskMorning) * (h > 3 && h < 22 ? 1 : 0);

    // kierunek światła: słońce w dzień, księżyc nocą — nigdy z dołu
    this.sunDir.set(Math.cos(angle) * 0.62, Math.max(0.34, Math.abs(elevation)), Math.cos(angle) * 0.3 + 0.2).normalize();

    const daySun = new THREE.Color('#fff5e0');
    const duskSun = new THREE.Color('#ff9c5c');
    const nightSun = new THREE.Color('#8fa8d8');
    this.sunColor.copy(daySun).lerp(duskSun, duskF * 0.9).lerp(nightSun, Math.pow(1 - dayF, 2.2));

    const dayAmb = new THREE.Color('#b3c6d6');
    const duskAmb = new THREE.Color('#a08275');
    const nightAmb = new THREE.Color('#3d4e6b');
    this.ambientColor.copy(dayAmb).lerp(duskAmb, duskF * 0.7).lerp(nightAmb, Math.pow(1 - dayF, 1.6));

    const dayFog = new THREE.Color('#c2d6de');
    const duskFog = new THREE.Color('#b98a6a');
    const nightFog = new THREE.Color('#26344a');
    this.fogColor.copy(dayFog).lerp(duskFog, duskF * 0.85).lerp(nightFog, Math.pow(1 - dayF, 1.9));

    this.sunIntensity = lerp(0.62, 2.4, dayF);
    this.ambientIntensity = lerp(0.52, 0.88, dayF) + duskF * 0.12;
    this.dayF = dayF;
    this.nightF = 1 - dayF;
    this.duskF = duskF;
  }
}

export function headingFromYaw(yaw) {
  return clamp(((yaw % TAU) + TAU) % TAU, 0, TAU);
}
