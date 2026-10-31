// ---------------------------------------------------------------------------
// Materiał gruntu: cztery warstwy tekstur (trawa, ubity grunt/droga, skała,
// piasek/śnieg) mieszane proceduralnie w shaderze.
//
// Dlaczego w shaderze, a nie w wierzchołkach: siatka terenu ma wierzchołki co
// ~8 m, więc droga szeroka na 5 m albo żwir na zboczu po prostu by się rozmyły.
// Tutaj waga drogi jest liczona z odległości do osi traktu (analitycznie, ostro
// na każdym pikselu), waga skały z nachylenia normalnej, a piasek/śnieg/bagno
// przychodzą z atrybutu wierzchołkowego `aGround` (te pola są rozległe).
// ---------------------------------------------------------------------------
import * as THREE from 'three';
import { buildGroundLayers, layerToRGBA, layerStats, GROUND_TINTS } from './groundTextures.js';

let cachedLayers = null;
let cachedTextures = null;

function toTexture(data, size) {
  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.generateMipmaps = true;
  // Tekstury są mnożnikami szczegółu — traktujemy je jako dane liniowe,
  // dzięki czemu średnia 0,5 daje po prostu mnożnik 1,0.
  tex.colorSpace = THREE.NoColorSpace;
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}

/** 64×64 kafelkowy szum — tło dla rozmycia krawędzi drogi i wariacji barwnej. */
export function createNoiseTexture(size = 64) {
  const data = new Uint8Array(size * size * 4);
  const hash = (x, y) => {
    let h = Math.imul((x | 0) * 374761393 + (y | 0) * 668265263, 1274126177);
    h = (h ^ (h >>> 13)) >>> 0;
    return h / 4294967296;
  };
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      // dwie oktawy: gładka baza + drobne ziarno
      const fx = x / size;
      const fy = y / size;
      const smooth = (u, v) => {
        const i = Math.floor(u * size);
        const j = Math.floor(v * size);
        const fu = u * size - i;
        const fv = v * size - j;
        const wu = fu * fu * (3 - 2 * fu);
        const wv = fv * fv * (3 - 2 * fv);
        const a = hash(i % size, j % size);
        const b = hash((i + 1) % size, j % size);
        const c = hash(i % size, (j + 1) % size);
        const d = hash((i + 1) % size, (j + 1) % size);
        return (a * (1 - wu) + b * wu) * (1 - wv) + (c * (1 - wu) + d * wu) * wv;
      };
      const v = smooth(fx, fy) * 0.7 + hash(x, y) * 0.3;
      const i4 = (y * size + x) * 4;
      const byte = Math.round(Math.min(1, Math.max(0, v)) * 255);
      data[i4] = byte;
      data[i4 + 1] = byte;
      data[i4 + 2] = byte;
      data[i4 + 3] = byte;
    }
  }
  return toTexture(data, size);
}

/** Buduje (raz) komplet tekstur gruntu. Zwraca null, gdy coś pójdzie nie tak. */
export function createGroundTextures(size = 512) {
  if (cachedTextures) return cachedTextures;
  try {
    cachedLayers = cachedLayers || buildGroundLayers(size);
    const out = {};
    const stats = {};
    for (const key of ['grass', 'dirt', 'rock', 'sand']) {
      const layer = cachedLayers[key];
      stats[key] = layerStats(layer, size);
      out[key] = {
        // kolor w RGB, wysokość w alfie — jedno próbkowanie zamiast dwóch
        map: toTexture(layerToRGBA(layer, size, GROUND_TINTS[key]), size),
        meanLum: stats[key].lum,
        meanH: stats[key].hgt,
      };
    }
    out.size = size;
    // mnożnik szczegółu ustawiamy tak, by ŚREDNIA jasność tekstur wynosiła 1,0 —
    // paleta biomów z wierzchołków zostaje wtedy nietknięta, a tekstura dokłada
    // tylko strukturę (bez „przyciemniania” całej mapy).
    const meanLum = (out.grass.meanLum + out.dirt.meanLum + out.rock.meanLum + out.sand.meanLum) / 4;
    out.detailGain = 1 / Math.max(0.2, meanLum);
    out.macroMean = out.rock.meanH;
    cachedTextures = out;
    return out;
  } catch (err) {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Wstrzyknięcia do shaderów wbudowanego materiału (MeshStandardMaterial).
// Trzymane jako osobne stałe, żeby dały się sprawdzić testem bez GPU.
// ---------------------------------------------------------------------------

export const VERT_DECL = `attribute vec4 aGround;
varying vec4 vGrdW;
varying vec3 vGrdPos;`;

export const VERT_SETUP = `vGrdW = aGround;
vGrdPos = (modelMatrix * vec4(transformed, 1.0)).xyz;`;

export function injectVertexShader(src) {
  return src
    .replace('#include <common>', `#include <common>\n${VERT_DECL}`)
    .replace('#include <begin_vertex>', `#include <begin_vertex>\n${VERT_SETUP}`);
}

export function FRAG_DECL(pathCount) {
  return `
#define GRD_PATHS ${pathCount}
// Tani szum wartościowy: dwie oktawy, bez tekstury. Wcześniej dwie dodatkowe
// próbki (rozmycie krawędzi drogi i wielkoskalowa wariacja) kosztowały dwa
// pobrania z pamięci tekstur na każdy piksel ziemi.
uniform sampler2D uNoiseMap;
uniform vec4 uPaths[GRD_PATHS];
uniform sampler2D uGrassMap;
uniform sampler2D uDirtMap;
uniform sampler2D uRockMap;
uniform sampler2D uSandMap;
uniform vec2 uPathEdge;
uniform float uDetailGain;
uniform float uMacroMean;
uniform float uBumpScale;
varying vec4 vGrdW;
varying vec3 vGrdPos;
`;
}

export const FRAG_BODY = `
  // ---- okładzina gruntu: 4 warstwy + droga -----------------------------
  float grdBestD = 1e9;
  float grdLat = 0.0;
  float grdAlon = 0.0;
  for (int i = 0; i < GRD_PATHS; i++) {
    vec4 seg = uPaths[i];
    vec2 pa = vGrdPos.xz - seg.xy;
    vec2 ba = seg.zw - seg.xy;
    float bl = max(dot(ba, ba), 1e-3);
    float t = clamp(dot(pa, ba) / bl, 0.0, 1.0);
    vec2 off = pa - ba * t;
    float dl = length(off);
    if (dl < grdBestD) {
      grdBestD = dl;
      grdLat = (ba.x * off.y - ba.y * off.x) / sqrt(bl);
      grdAlon = sqrt(bl) * t;
    }
  }

  vec3 grdNW = normalize((vec4(vNormal, 0.0) * viewMatrix).xyz);
  float grdUp = clamp(grdNW.y, 0.0, 1.0);
  float grdRockW = 1.0 - smoothstep(0.55, 0.88, grdUp);

  vec2 guv = vGrdPos.xz * 0.16;
  vec2 duv = vGrdPos.xz * 0.11;
  vec2 ruv = vGrdPos.xz * 0.075;
  vec2 suv = vGrdPos.xz * 0.24;
  vec2 tuv = vec2(grdLat, grdAlon) * 0.34;

  vec4 tG = texture2D(uGrassMap, guv);
  vec4 tD = texture2D(uDirtMap, duv);
  vec4 tR = texture2D(uRockMap, ruv);
  vec4 tS = texture2D(uSandMap, suv);

  // krawędź drogi rozmyta szumem (alfa = wysokość) i koleiny wzdłuż traktu
  float grdEdgeNoise = (texture2D(uNoiseMap, vGrdPos.xz * 0.045).r - 0.5) * 3.0;
  float grdRoad = 1.0 - smoothstep(uPathEdge.x, uPathEdge.y, grdBestD + grdEdgeNoise);
  if (grdRoad > 0.02) {
    vec4 tT = texture2D(uDirtMap, tuv);
    float k = clamp(grdRoad, 0.0, 1.0) * 0.9;
    tD = vec4(mix(tD.rgb, tT.rgb, k), mix(tD.a, tT.a, k));
  }

  float grdGrassW = max(vGrdW.x, 0.0) * (1.0 - grdRoad) * (1.0 - grdRockW);
  float grdSandW = max(vGrdW.y, 0.0) * (1.0 - grdRockW * 0.85) * (1.0 - grdRoad);
  float grdSnowW = max(vGrdW.z, 0.0) * (1.0 - grdRockW * 0.9) * (1.0 - grdRoad);
  float grdDirtW = max(max(vGrdW.w, 0.0) * (1.0 - grdRockW * 0.5), grdRoad);
  float grdTotal = grdGrassW + grdSandW + grdSnowW + grdDirtW + grdRockW + 1e-4;

  vec3 grdCol = (tG.rgb * grdGrassW + tD.rgb * grdDirtW + tR.rgb * grdRockW
               + tS.rgb * (grdSandW + grdSnowW)) / grdTotal;
  float grdH = (tG.a * grdGrassW + tD.a * grdDirtW + tR.a * grdRockW
              + tS.a * (grdSandW + grdSnowW)) / grdTotal;

  // wielkoskalowa wariacja: rozbija powtarzalność kafla na dużych łąkach
  float grdMacro = texture2D(uNoiseMap, vGrdPos.xz * 0.0075).r;
  float grdVar = 1.0 + (grdMacro - uMacroMean) * 0.7;
  diffuseColor.rgb *= clamp(grdCol * uDetailGain, 0.55, 1.6) * grdVar;
`;

export const FRAG_NORMAL = `
  // ---- bump z mieszanej wysokości podłoża ------------------------------
  {
    vec3 dpx = dFdx(vGrdPos);
    vec3 dpy = dFdy(vGrdPos);
    float dhx = dFdx(grdH);
    float dhy = dFdy(grdH);
    vec3 dpdx = dpx - grdNW * dot(dpx, grdNW);
    vec3 dpdy = dpy - grdNW * dot(dpy, grdNW);
    vec3 r1 = cross(dpdy, grdNW);
    vec3 r2 = cross(grdNW, dpdx);
    float det = dot(dpdx, r1);
    vec3 grad = sign(det) * (dhx * r1 + dhy * r2);
    vec3 nBump = normalize(abs(det) * grdNW - uBumpScale * grad);
    nBump = normalize(mix(grdNW, nBump, 0.85));
    normal = normalize((viewMatrix * vec4(nBump, 0.0)).xyz);
  }
`;

export function injectFragmentShader(src, pathCount) {
  return src
    .replace('#include <common>', `#include <common>\n${FRAG_DECL(pathCount)}`)
    .replace('#include <color_fragment>', `#include <color_fragment>\n${FRAG_BODY}`)
    .replace('#include <normal_fragment_maps>', FRAG_NORMAL);
}

/**
 * Materiał terenu. Zwraca MeshStandardMaterial z wstrzykniętym splatem.
 * Gdy tekstur nie da się zbudować, zwraca zwykły materiał z kolorem wierzchołków.
 */
export const MAX_PATH_SEGMENTS = 4;

let noiseTexture = null;

export function createGroundMaterial({ paths = [], edge = [2.4, 7.0] } = {}) {
  const tex = createGroundTextures();
  // Lambert zamiast PBR: teren pokrywa większość ekranu, a pełne modelowanie
  // PBR (roughness/metalness/IBL) nic tu nie wnosi poza kosztem piksela.
  const material = new THREE.MeshLambertMaterial({
    vertexColors: true,
    dithering: true,
  });
  if (!tex) return material;

  // Shader zawsze iteruje po czterech odcinkach — dla kafla, przez który nie
  // przechodzi żaden trakt, wstawiamy odcinki „w Polesiu” (milion metrów dala).
  // Jedna pętla po czterech zamiast dwudziestu to największa oszczędność
  // w całym shaderze gruntu: piksel ziemi liczy się taniej o ~16 pierwiastków.
  const dummy = new THREE.Vector4(1e6, 1e6, 1e6, 1e6);
  const pathVectors = [];
  for (let i = 0; i < MAX_PATH_SEGMENTS; i++) {
    const seg = paths[i];
    pathVectors.push(seg ? new THREE.Vector4(seg[0], seg[1], seg[2], seg[3]) : dummy.clone());
  }
  material.userData.groundTextures = tex;
  material.customProgramCacheKey = () => 'ground-splat-4';
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uPaths = { value: pathVectors };
    shader.uniforms.uGrassMap = { value: tex.grass.map };
    shader.uniforms.uDirtMap = { value: tex.dirt.map };
    shader.uniforms.uRockMap = { value: tex.rock.map };
    shader.uniforms.uSandMap = { value: tex.sand.map };
    shader.uniforms.uPathEdge = { value: new THREE.Vector2(edge[0], edge[1]) };
    shader.uniforms.uDetailGain = { value: tex.detailGain };
    // szum proceduralny ma średnią ~0,5 — wcześniej brała się z tekstury skały
    shader.uniforms.uMacroMean = { value: 0.5 };
    shader.uniforms.uBumpScale = { value: 0.22 };
    shader.uniforms.uNoiseMap = { value: noiseTexture ?? (noiseTexture = createNoiseTexture()) };
    shader.vertexShader = injectVertexShader(shader.vertexShader);
    shader.fragmentShader = injectFragmentShader(shader.fragmentShader, pathVectors.length);
  };
  return material;
}
