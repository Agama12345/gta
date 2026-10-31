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
import { buildGroundLayers, layerToRGBA, layerToHeightRGBA, layerStats, GROUND_TINTS } from './groundTextures.js';

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
        map: toTexture(layerToRGBA(layer, size, GROUND_TINTS[key]), size),
        height: toTexture(layerToHeightRGBA(layer, size), size),
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
    out.macroMean = new THREE.Vector2(out.rock.meanH, out.sand.meanH);
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
uniform vec4 uPaths[GRD_PATHS];
uniform sampler2D uGrassMap;
uniform sampler2D uGrassH;
uniform sampler2D uDirtMap;
uniform sampler2D uDirtH;
uniform sampler2D uRockMap;
uniform sampler2D uRockH;
uniform sampler2D uSandMap;
uniform sampler2D uSandH;
uniform vec2 uPathEdge;
uniform float uDetailGain;
uniform vec2 uMacroMean;
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

  // krawędź drogi rozmyta szumem, żeby nie była linijką
  float grdEdgeNoise = (texture2D(uDirtH, vGrdPos.xz * 0.031).r - 0.5) * 3.4;
  float grdRoad = 1.0 - smoothstep(uPathEdge.x, uPathEdge.y, grdBestD + grdEdgeNoise);

  float grdGrassW = max(vGrdW.x, 0.0) * (1.0 - grdRoad) * (1.0 - grdRockW);
  float grdSandW = max(vGrdW.y, 0.0) * (1.0 - grdRockW * 0.85) * (1.0 - grdRoad);
  float grdSnowW = max(vGrdW.z, 0.0) * (1.0 - grdRockW * 0.9) * (1.0 - grdRoad);
  float grdMudW = max(vGrdW.w, 0.0) * (1.0 - grdRockW * 0.5) * (1.0 - grdRoad);
  float grdDirtW = max(grdMudW, grdRoad);
  float grdTotal = grdGrassW + grdSandW + grdSnowW + grdDirtW + grdRockW + 1e-4;

  vec2 guv = vGrdPos.xz * 0.16;
  vec2 duv = vGrdPos.xz * 0.11;
  vec2 ruv = vGrdPos.xz * 0.075;
  vec2 suv = vGrdPos.xz * 0.24;
  vec2 tuv = vec2(grdLat, grdAlon) * 0.34;

  vec3 tGrass = mix(texture2D(uGrassMap, guv).rgb,
                    texture2D(uGrassMap, guv * 2.71 + vec2(0.31, 0.67)).rgb, 0.35);
  vec3 tDirt = mix(texture2D(uDirtMap, duv).rgb, texture2D(uDirtMap, tuv).rgb,
                   clamp(grdRoad, 0.0, 1.0) * 0.9);
  vec3 tRock = texture2D(uRockMap, ruv).rgb;
  vec3 tSand = texture2D(uSandMap, suv).rgb;

  vec3 grdCol = (tGrass * grdGrassW + tDirt * grdDirtW + tRock * grdRockW
               + tSand * (grdSandW + grdSnowW)) / grdTotal;
  // wielkoskalowa wariacja: rozbija powtarzalność kafla na dużych łąkach
  float grdMacro = texture2D(uRockH, vGrdPos.xz * 0.0075).r;
  float grdMacro2 = texture2D(uSandH, vGrdPos.xz * 0.0021).r;
  float grdVar = 1.0 + (grdMacro - uMacroMean.x) * 0.55 + (grdMacro2 - uMacroMean.y) * 0.45;
  diffuseColor.rgb *= clamp(grdCol * uDetailGain, 0.55, 1.6) * grdVar;

  // wysokość podłoża do bumpa (mieszana tak samo jak kolor)
  float grdH = (texture2D(uGrassH, guv).r * grdGrassW
              + texture2D(uDirtH, duv).r * grdDirtW
              + texture2D(uRockH, ruv).r * grdRockW
              + texture2D(uSandH, suv).r * (grdSandW + grdSnowW)) / grdTotal;
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
export function createGroundMaterial({ paths = [], edge = [2.4, 7.0] } = {}) {
  const tex = createGroundTextures();
  const material = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.96,
    metalness: 0.0,
    dithering: true,
  });
  if (!tex) return material;

  const pathVectors = paths.map(([ax, az, bx, bz]) => new THREE.Vector4(ax, az, bx, bz));
  material.userData.groundTextures = tex;
  material.customProgramCacheKey = () => `ground-splat-${pathVectors.length}`;
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uPaths = { value: pathVectors };
    shader.uniforms.uGrassMap = { value: tex.grass.map };
    shader.uniforms.uGrassH = { value: tex.grass.height };
    shader.uniforms.uDirtMap = { value: tex.dirt.map };
    shader.uniforms.uDirtH = { value: tex.dirt.height };
    shader.uniforms.uRockMap = { value: tex.rock.map };
    shader.uniforms.uRockH = { value: tex.rock.height };
    shader.uniforms.uSandMap = { value: tex.sand.map };
    shader.uniforms.uSandH = { value: tex.sand.height };
    shader.uniforms.uPathEdge = { value: new THREE.Vector2(edge[0], edge[1]) };
    shader.uniforms.uDetailGain = { value: tex.detailGain };
    shader.uniforms.uMacroMean = { value: tex.macroMean };
    shader.uniforms.uBumpScale = { value: 0.22 };
    shader.vertexShader = injectVertexShader(shader.vertexShader);
    shader.fragmentShader = injectFragmentShader(shader.fragmentShader, pathVectors.length);
  };
  return material;
}
