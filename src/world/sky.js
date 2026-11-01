import * as THREE from 'three';

// Deterministyczne chmury — te same między przerysowaniami nieba.
function makeClouds(seed, count) {
  let state = seed;
  const rand = () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
  const clouds = [];
  for (let i = 0; i < count; i++) {
    const puffs = [];
    const puffCount = 4 + Math.floor(rand() * 5);
    for (let j = 0; j < puffCount; j++) {
      puffs.push({
        dx: (rand() - 0.5) * 2.2,
        dy: (rand() - 0.5) * 0.9,
        r: 0.45 + rand() * 0.75,
        a: 0.16 + rand() * 0.24,
      });
    }
    clouds.push({
      x: rand(),
      y: rand(),
      r: 0.5 + rand() * 1.4,
      warm: rand() > 0.55,
      puffs,
    });
  }
  return clouds;
}

// Gradientowe niebo: tekstura panoramiczna aktualizowana wraz z cyklem dnia.
export class Sky {
  constructor(scene) {
    this.scene = scene;
    this.canvas = document.createElement('canvas');
    this.canvas.width = 1024;
    this.canvas.height = 512;
    this.ctx = this.canvas.getContext('2d');
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.colorSpace = THREE.SRGBColorSpace;
    this.texture.mapping = THREE.EquirectangularReflectionMapping;
    this.texture.magFilter = THREE.LinearFilter;
    this.texture.minFilter = THREE.LinearFilter;
    this.lastTop = null;
    this.lastHorizon = null;
    this.clouds = makeClouds(1337, 30);
    this.draw('#4a7cb0', '#c8d8dd');
    scene.background = this.texture;
  }

  draw(topHex, horizonHex) {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const top = new THREE.Color(topHex);
    const horizon = new THREE.Color(horizonHex);
    const ground = horizon.clone().multiplyScalar(0.62);
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    // niebo: góra → horyzont, poniżej horyzontu ciemniejsza "ziemia"
    grad.addColorStop(0, `#${top.getHexString()}`);
    grad.addColorStop(0.46, `#${top.clone().lerp(horizon, 0.65).getHexString()}`);
    grad.addColorStop(0.5, `#${horizon.getHexString()}`);
    grad.addColorStop(0.56, `#${horizon.clone().lerp(ground, 0.6).getHexString()}`);
    grad.addColorStop(1, `#${ground.getHexString()}`);
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // jasność nieba decyduje o gwiazdach i chmurach
    const lum = top.r * 0.3 + top.g * 0.59 + top.b * 0.11;

    if (lum < 0.16) {
      // gwiazdy — tylko w nocy, żeby nie "pływały" w dzień
      const starAlpha = Math.min(1, (0.16 - lum) / 0.12);
      for (let i = 0; i < 240; i++) {
        const sx = ((i * 197.3) % w);
        const sy = ((i * 83.7) % (h * 0.46));
        const size = 0.6 + ((i * 37) % 10) / 9;
        ctx.fillStyle = `rgba(255,255,255,${(0.25 + ((i * 13) % 60) / 100) * starAlpha})`;
        ctx.fillRect(sx, sy, size, size);
      }
    }

    if (lum > 0.05) {
      // chmury: kilka warstw miękkich plam; przy zachodzie ciepłe, w dzień białe
      const warm = horizon.clone().lerp(new THREE.Color('#ffffff'), 0.45);
      const cool = top.clone().lerp(new THREE.Color('#ffffff'), 0.72);
      const cloudAlpha = Math.min(0.85, 0.25 + lum * 0.9);
      for (const cloud of this.clouds) {
        const tint = cloud.warm ? warm : cool;
        const cx = cloud.x * w;
        const cy = (0.1 + cloud.y * 0.34) * h;
        const radius = cloud.r * w * 0.055;
        for (const puff of cloud.puffs) {
          const px = cx + puff.dx * radius * 1.9;
          const py = cy + puff.dy * radius * 0.55;
          const pr = radius * puff.r;
          const g2 = ctx.createRadialGradient(px, py, 0, px, py, pr);
          const alpha = cloudAlpha * puff.a;
          g2.addColorStop(0, `rgba(${(tint.r * 255) | 0},${(tint.g * 255) | 0},${(tint.b * 255) | 0},${alpha})`);
          g2.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = g2;
          ctx.beginPath();
          ctx.arc(px, py, pr, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    this.texture.needsUpdate = true;
    this.lastTop = topHex;
    this.lastHorizon = horizonHex;
  }

  update(topHex, horizonHex) {
    if (topHex === this.lastTop && horizonHex === this.lastHorizon) return;
    // próg, żeby nie przerysowywać tekstury co klatkę
    const a = new THREE.Color(topHex);
    const b = new THREE.Color(this.lastTop ?? '#000000');
    const c = new THREE.Color(horizonHex);
    const d = new THREE.Color(this.lastHorizon ?? '#000000');
    const diff = Math.abs(a.r - b.r) + Math.abs(a.g - b.g) + Math.abs(a.b - b.b) +
      Math.abs(c.r - d.r) + Math.abs(c.g - d.g) + Math.abs(c.b - d.b);
    if (diff < 0.012) return;
    this.draw(topHex, horizonHex);
  }
}

// Palety nieba dla różnych pór dnia.
export function skyColors(dayNight) {
  const dayF = dayNight.dayF ?? 1;
  const duskF = dayNight.duskF ?? 0;

  const dayTop = new THREE.Color('#3d76b4');
  const dayHorizon = new THREE.Color('#bcd6e0');
  const nightTop = new THREE.Color('#080f1e');
  const nightHorizon = new THREE.Color('#2b3d50');
  const duskTop = new THREE.Color('#3d3f74');
  const duskHorizon = new THREE.Color('#e59a5e');

  const top = nightTop.clone().lerp(dayTop, dayF);
  const horizon = nightHorizon.clone().lerp(dayHorizon, dayF);
  if (duskF > 0.01) {
    top.lerp(duskTop, duskF * 0.7);
    horizon.lerp(duskHorizon, duskF * 0.92);
  }
  return { top: `#${top.getHexString()}`, horizon: `#${horizon.getHexString()}` };
}
