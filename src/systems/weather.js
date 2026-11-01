import * as THREE from 'three';
import { RNG } from '../core/utils.js';

// Pogoda: pogodnie → chmury → deszcz → mgła i z powrotem.
// Deszcz to jedna chmura punktów przesuwana razem z graczem, więc krople są
// zawsze tam, gdzie patrzy — bez symulowania całej mapy.
const STATE = {
  clear: { rain: 0, fog: 1.0, label: 'Pogodnie' },
  overcast: { rain: 0, fog: 0.72, label: 'Zachmurzenie' },
  rain: { rain: 1, fog: 0.55, label: 'Deszcz' },
  storm: { rain: 1.35, fog: 0.42, label: 'Burza' },
  mist: { rain: 0, fog: 0.35, label: 'Mgła' },
};

export class Weather {
  constructor(scene) {
    this.scene = scene;
    this.rng = new RNG(90210);
    this.state = 'clear';
    this.target = 'clear';
    this.blend = 1;
    this.timer = 150 + this.rng.float(0, 120);
    this.rain = 0;
    this.fogScale = 1;
    this.label = STATE.clear.label;

    const COUNT = 2600;
    const positions = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    this.span = 70;
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = this.rng.float(-this.span, this.span);
      positions[i * 3 + 1] = this.rng.float(0, 46);
      positions[i * 3 + 2] = this.rng.float(-this.span, this.span);
      speeds[i] = this.rng.float(24, 40);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: '#c8d8e8',
      size: 0.09,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      sizeAttenuation: true,
    });
    this.points = new THREE.Points(geo, mat);
    this.points.frustumCulled = false;
    this.points.name = 'rain';
    this.speeds = speeds;
    scene.add(this.points);

    // mgła przy ziemi: kilka dużych, miękkich płatów
    this.mistGroup = new THREE.Group();
    this.mistGroup.name = 'mist';
    const mistMat = new THREE.MeshBasicMaterial({
      color: '#cfd8dc', transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide,
    });
    this.mistMat = mistMat;
    this.mistPuffs = [];
    for (let i = 0; i < 14; i++) {
      const puff = new THREE.Mesh(new THREE.PlaneGeometry(90, 26), mistMat);
      puff.rotation.x = -Math.PI / 2;
      puff.position.set(this.rng.float(-60, 60), this.rng.float(1, 5), this.rng.float(-60, 60));
      this.mistGroup.add(puff);
      this.mistPuffs.push(puff);
    }
    scene.add(this.mistGroup);
  }

  _pickNext() {
    const r = this.rng.next();
    if (r < 0.4) return 'clear';
    if (r < 0.66) return 'overcast';
    if (r < 0.86) return 'rain';
    if (r < 0.95) return 'mist';
    return 'storm';
  }

  update(dt, camera) {
    this.timer -= dt;
    if (this.timer <= 0) {
      this.state = this.target;
      this.target = this._pickNext();
      this.blend = 0;
      this.timer = 90 + this.rng.float(0, 160);
    }
    if (this.blend < 1) this.blend = Math.min(1, this.blend + dt / 12);

    const from = STATE[this.state];
    const to = STATE[this.target];
    const k = this.blend * this.blend * (3 - 2 * this.blend);
    this.rain = from.rain + (to.rain - from.rain) * k;
    this.fogScale = from.fog + (to.fog - from.fog) * k;
    this.label = (k > 0.5 ? to : from).label;

    // chmura deszczu podąża za kamerą
    const pos = this.points.geometry.attributes.position;
    const arr = pos.array;
    const cx = camera?.position.x ?? 0;
    const cz = camera?.position.z ?? 0;
    const cy = camera?.position.y ?? 10;
    const fall = 1 + this.rain * 0.6;
    for (let i = 0; i < this.speeds.length; i++) {
      arr[i * 3 + 1] -= this.speeds[i] * fall * dt;
      arr[i * 3] += dt * 3.4;
      if (arr[i * 3] > this.span) arr[i * 3] -= this.span * 2;
      if (arr[i * 3 + 1] < -6) {
        arr[i * 3 + 1] += 52;
        arr[i * 3] = this.rng.float(-this.span, this.span);
        arr[i * 3 + 2] = this.rng.float(-this.span, this.span);
      }
    }
    pos.needsUpdate = true;
    this.points.position.set(cx, cy + 14, cz);
    this.points.material.opacity = Math.min(0.55, this.rain * 0.42);

    // mgła nad łąkami
    const mistAmount = Math.max(0, this.rain < 0.05 ? 1 - this.fogScale : 0);
    this.mistMat.opacity = mistAmount * 0.3;
    this.mistGroup.position.set(cx, cy - 6, cz);
    for (let i = 0; i < this.mistPuffs.length; i++) {
      const p = this.mistPuffs[i];
      p.position.x += Math.sin(this.timer * 0.1 + i) * dt * 1.6;
      p.position.z += Math.cos(this.timer * 0.08 + i) * dt * 1.2;
    }
  }
}
