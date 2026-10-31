// ---------------------------------------------------------------------------
// Woda: fale liczone na GPU.
//
// Wcześniej każda klatka liczyła na CPU wysokość 12 769 wierzchołków morza
// (trzy sinusy i cosinus na wierzchołek) plus — co drugą klatkę — normalne
// z pochodnych, a do tego wysokości i kolory wszystkich rzek i jezior.
// W pomiarze wychodziło z tego ok. 15% czasu klatki na samo merdanie wodą,
// która i tak jest rzadką siatką (wierzchołek co ~130 m).
//
// Teraz wierzchołki stoją nieruchomo, a powierzchnia dostaje **proceduralną
// mapę normalnych** przesuwaną w czasie. Efekt jest lepszy wizualnie (drobna
// fala odbija światło na całej tafli), a koszt na klatkę to dwie aktualizacje
// uniformu.
// ---------------------------------------------------------------------------
import * as THREE from 'three';

/**
 * Kafelkowa mapa normalnych fali (256², bez szwów).
 *
 * Suma fal o całkowitych liczbach okresów na kafel — dzięki temu tekstura
 * zawija się idealnie. Zapisujemy **nachylenie** powierzchni (x, y), nie
 * kolor, bo shader i tak buduje z tego normalną.
 */
export function createWaveNormalTexture(size = 256) {
  const waves = [
    { nx: 3, ny: 1, amp: 1.0, phase: 0.0 },
    { nx: -2, ny: 3, amp: 0.7, phase: 1.7 },
    { nx: 5, ny: -2, amp: 0.45, phase: 3.1 },
    { nx: 7, ny: 4, amp: 0.3, phase: 0.6 },
    { nx: -9, ny: 5, amp: 0.18, phase: 2.2 },
    { nx: 12, ny: -11, amp: 0.12, phase: 4.4 },
  ];
  const data = new Uint8Array(size * size * 4);
  const TAU = Math.PI * 2;
  // nachylenia bywają duże — normalizujemy je do zakresu ±1 skalowaniem
  let maxSlope = 0.0001;
  const sx = new Float32Array(size * size);
  const sy = new Float32Array(size * size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const v = y / size;
      let dx = 0;
      let dy = 0;
      for (const w of waves) {
        const arg = TAU * (w.nx * u + w.ny * v) + w.phase;
        const c = Math.cos(arg) * w.amp * TAU;
        dx += c * w.nx;
        dy += c * w.ny;
      }
      const i = y * size + x;
      sx[i] = dx;
      sy[i] = dy;
      const m = Math.max(Math.abs(dx), Math.abs(dy));
      if (m > maxSlope) maxSlope = m;
    }
  }
  const k = 1 / maxSlope;
  for (let i = 0; i < size * size; i++) {
    data[i * 4] = Math.round((sx[i] * k * 0.5 + 0.5) * 255);
    data[i * 4 + 1] = Math.round((sy[i] * k * 0.5 + 0.5) * 255);
    data[i * 4 + 2] = 255;
    data[i * 4 + 3] = 255;
  }
  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.generateMipmaps = true;
  tex.colorSpace = THREE.NoColorSpace;
  tex.needsUpdate = true;
  return tex;
}

let sharedTex = null;

export const WATER_VERT_DECL = 'varying vec3 vWatPos;';
export const WATER_VERT_SETUP = 'vWatPos = (modelMatrix * vec4(transformed, 1.0)).xyz;';

export function WATER_FRAG_DECL() {
  return `
uniform sampler2D uWaveTex;
uniform float uWaveTime;
uniform vec3 uWaveParams; // x: skala UV, y: siła normalnej, z: prędkość
varying vec3 vWatPos;
`;
}

/** Normalne fali: dwie warstwy tej samej tekstury, przesuwane w różne strony. */
export const WATER_FRAG_NORMAL = `
  {
    float wScale = uWaveParams.x;
    float wStr = uWaveParams.y;
    float wSpd = uWaveParams.z * uWaveTime;
    vec2 uv1 = vWatPos.xz * wScale + vec2(wSpd * 0.031, wSpd * 0.019);
    vec2 uv2 = vWatPos.xz * (wScale * 2.7) - vec2(wSpd * 0.017, wSpd * 0.026);
    vec2 s1 = texture2D(uWaveTex, uv1).xy * 2.0 - 1.0;
    vec2 s2 = texture2D(uWaveTex, uv2).xy * 2.0 - 1.0;
    vec3 wNorm = normalize(vec3((s1.x + s2.x * 0.6) * wStr, 1.0, (s1.y + s2.y * 0.6) * wStr));
    normal = normalize((viewMatrix * vec4(wNorm, 0.0)).xyz);
  }
`;

/**
 * Dokłada fale do materiału wody (MeshStandardMaterial).
 * @returns {{time: {value:number}}} uchwyt do uniformu czasu
 */
export function injectWaterWaves(material, { scale = 0.05, strength = 0.55, speed = 1 } = {}) {
  if (sharedTex === null) sharedTex = createWaveNormalTexture();
  const time = { value: 0 };
  const tex = sharedTex;
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uWaveTex = { value: tex };
    shader.uniforms.uWaveTime = time;
    shader.uniforms.uWaveParams = { value: new THREE.Vector3(scale, strength, speed) };
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>\n${WATER_VERT_DECL}`)
      .replace('#include <begin_vertex>', `#include <begin_vertex>\n${WATER_VERT_SETUP}`);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\n${WATER_FRAG_DECL()}`)
      .replace('#include <normal_fragment_maps>', WATER_FRAG_NORMAL);
  };
  material.userData.waveTime = time;
  material.customProgramCacheKey = () => 'woda-fale-v1';
  return { time };
}
