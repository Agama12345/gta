import * as THREE from 'three';

// Gradientowe niebo: tekstura panoramiczna aktualizowana wraz z cyklem dnia.
export class Sky {
  constructor(scene) {
    this.scene = scene;
    this.canvas = document.createElement('canvas');
    this.canvas.width = 8;
    this.canvas.height = 256;
    this.ctx = this.canvas.getContext('2d');
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.colorSpace = THREE.SRGBColorSpace;
    this.texture.mapping = THREE.EquirectangularReflectionMapping;
    this.texture.magFilter = THREE.LinearFilter;
    this.texture.minFilter = THREE.LinearFilter;
    this.lastTop = null;
    this.lastHorizon = null;
    this.draw('#4a7cb0', '#c8d8dd');
    scene.background = this.texture;
  }

  draw(topHex, horizonHex) {
    const ctx = this.ctx;
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
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, this.canvas.width, h);
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
