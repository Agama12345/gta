// ---------------------------------------------------------------------------
// Podgląd sceny bez WebGL — rasteryzator „software” do kontroli jakości.
//
// Uruchamia prawdziwą grę w jsdom, buduje świat, ustawia gracza w podanym
// miejscu i rysuje klatkę do PNG (z-buffer + cieniowanie płaskie). Dzięki temu
// zmiany wizualne można obejrzeć w środowisku bez przeglądarki i bez GPU.
//
//   node tools/preview.mjs --x 120 --z 40 --yaw 0.4 --pitch 0.15 --out /tmp/a.png
// ---------------------------------------------------------------------------

import fs from 'node:fs';
import zlib from 'node:zlib';
import { JSDOM } from 'jsdom';

const argv = process.argv.slice(2);
const arg = (name, def) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] !== undefined ? Number(argv[i + 1]) : def;
};
const argStr = (name, def) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] !== undefined ? argv[i + 1] : def;
};

const W = arg('w', 640);
const H = arg('h', 360);
const out = argStr('out', '/tmp/preview.png');

// --- środowisko przeglądarki (to samo, co w testach) ------------------------
const dom = new JSDOM(
  `<!doctype html><html><body>
    <div id="loading"><div class="loading-sub"></div></div>
    <div id="ui"></div>
    <canvas id="scene" width="1280" height="720"></canvas>
  </body></html>`,
  { pretendToBeVisual: true, url: 'http://localhost/' }
);
const store = {};
const ls = {
  getItem: (k) => (k in store ? store[k] : null),
  setItem: (k, v) => { store[k] = String(v); },
  removeItem: (k) => { delete store[k]; },
};
global.window = dom.window;
global.document = dom.window.document;
Object.defineProperty(global, 'navigator', { value: dom.window.navigator, configurable: true });
global.HTMLElement = dom.window.HTMLElement;
global.HTMLCanvasElement = dom.window.HTMLCanvasElement;
global.localStorage = ls;
Object.defineProperty(dom.window, 'localStorage', { value: ls, configurable: true });
global.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 16);
Object.defineProperty(dom.window, 'innerWidth', { value: W, configurable: true });
Object.defineProperty(dom.window, 'innerHeight', { value: H, configurable: true });
global.innerWidth = W;
global.innerHeight = H;
const noop = () => {};
const ctxStub = () =>
  new Proxy(
    {
      createImageData: (w, h) => ({ data: new Uint8ClampedArray(w * h * 4), width: w, height: h }),
      getImageData: (x, y, w, h) => ({ data: new Uint8ClampedArray(w * h * 4), width: w, height: h }),
      createRadialGradient: () => ({ addColorStop: noop }),
      createLinearGradient: () => ({ addColorStop: noop }),
      measureText: () => ({ width: 10 }),
      save: noop, restore: noop, translate: noop, rotate: noop, scale: noop,
      beginPath: noop, moveTo: noop, lineTo: noop, arc: noop, closePath: noop,
      fill: noop, stroke: noop, fillRect: noop, clearRect: noop, drawImage: noop,
      putImageData: noop, fillText: noop, strokeText: noop, strokeRect: noop, clip: noop, rect: noop,
    },
    { get: (t, k) => (k in t ? t[k] : undefined), set: (t, k, v) => ((t[k] = v), true) }
  );
dom.window.HTMLCanvasElement.prototype.getContext = function () { return ctxStub(); };

// --- dostęp do plików gry (modele!) ---------------------------------------
// Podgląd korzysta z serwera Vite, jeśli działa (npm run dev); inaczej podnosi
// własny serwer statyczny na katalog `public`.
const withAssets = !argv.includes('--no-assets');
let assetBase = null;
let staticServer = null;
if (withAssets) {
  const probeUrl = 'http://127.0.0.1:5173/assets/models/nature/rock_single_A.gltf';
  let ok = false;
  try {
    const res = await fetch(probeUrl, { method: 'HEAD' });
    ok = res.ok;
  } catch {
    ok = false;
  }
  if (ok) {
    assetBase = 'http://127.0.0.1:5173/';
  } else {
    const http = await import('node:http');
    const path = await import('node:path');
    const root = path.resolve('public');
    staticServer = http.createServer((req, res) => {
      const rel = decodeURIComponent(req.url.split('?')[0]);
      const file = path.join(root, rel);
      if (!file.startsWith(root)) {
        res.writeHead(403);
        res.end();
        return;
      }
      fs.readFile(file, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end();
          return;
        }
        res.writeHead(200, { 'content-type': file.endsWith('.png') ? 'image/png' : 'application/octet-stream' });
        res.end(data);
      });
    });
    await new Promise((r) => staticServer.listen(0, '127.0.0.1', r));
    assetBase = `http://127.0.0.1:${staticServer.address().port}/`;
  }
  globalThis.self = globalThis;
  class FakeImage {
    constructor() {
      this.width = 4;
      this.height = 4;
      this.style = {};
    }
    set src(value) {
      this._src = value;
      setTimeout(() => {
        this.onload?.({});
        this._listeners?.load?.forEach((fn) => fn({}));
      }, 0);
    }
    get src() {
      return this._src;
    }
    addEventListener(type, fn) {
      (this._listeners ??= {})[type] = [...(this._listeners[type] ?? []), fn];
    }
    removeEventListener() {}
    setAttribute() {}
    getAttribute() {
      return null;
    }
  }
  dom.window.document.createElementNS = () => new FakeImage();
  const realCreateElement = dom.window.document.createElement.bind(dom.window.document);
  dom.window.document.createElement = (tag) => (String(tag).toLowerCase() === 'img' ? new FakeImage() : realCreateElement(tag));
  global.ProgressEvent = class ProgressEvent {
    constructor(type, init = {}) {
      this.type = type;
      Object.assign(this, init);
    }
  };
  const RealRequest = globalThis.Request;
  globalThis.Request = class extends RealRequest {
    constructor(input, init) {
      super(typeof input === 'string' ? new URL(input, assetBase).toString() : input, init);
    }
  };
  const realFetch = globalThis.fetch;
  globalThis.fetch = (input, init) => realFetch(
    typeof input === 'string' ? new URL(input, assetBase).toString() : input,
    init
  );
  globalThis.URL.createObjectURL = () => 'blob:preview';
  globalThis.URL.revokeObjectURL = () => {};
}

const THREE = await import('three');
const { Game } = await import('../src/game.js');
const { loadAssets } = await import('../src/core/assets.js');
const { heightAt } = await import('../src/world/terrain.js');

const fakeRenderer = {
  shadowMap: {},
  domElement: document.getElementById('scene'),
  setPixelRatio: noop,
  setSize: noop,
  render: noop,
  outputColorSpace: null,
  toneMapping: null,
  toneMappingExposure: 1,
};
const assets = withAssets ? await loadAssets() : null;
if (assets?.failed?.length) console.warn('modele z błędem:', assets.failed.slice(0, 5));
const game = new Game(document.getElementById('scene'), { renderer: fakeRenderer, assets });
game.startNew();

// --- co stoi w pobliżu kamery (diagnostyka) --------------------------------
const placed = [];
const origAdd = game.world.addAssetProp.bind(game.world);
game.world.addAssetProp = (key, x, z, rotY, opts) => {
  const obj = origAdd(key, x, z, rotY, opts);
  if (obj) placed.push({ key, x, z, obj });
  return obj;
};

// --- ustawienie kamery -----------------------------------------------------
const px = arg('x', game.player.pos.x);
const pz = arg('z', game.player.pos.z);
game.player.pos.set(px, heightAt(px, pz), pz);
game.cameraRig.yaw = arg('yaw', game.cameraRig.yaw + Math.PI);
game.cameraRig.pitch = arg('pitch', 0.18);
game.cameraRig.distance = arg('dist', game.cameraRig.distance);
game.cameraRig.targetDistance = game.cameraRig.distance;
game.cameraRig.initialized = false;
for (let i = 0; i < 30; i += 1) {
  game.cameraRig.update(1 / 30, game.player.pos, 0, 0);
  game.player.update(1 / 60, null);
}
const camera = game.camera;
camera.aspect = W / H;
camera.updateProjectionMatrix();
camera.updateMatrixWorld(true);
game.world?.update?.(0.016, 1, game.player.pos);
game.scene.updateMatrixWorld(true);

if (argv.includes('--stats')) {
  const wb = new THREE.Box3();
  for (const [label, obj] of [['miecz', game.player.weaponMesh], ['tarcza', game.player.shieldMesh]]) {
    if (!obj) continue;
    obj.updateMatrixWorld(true);
    wb.setFromObject(obj);
    const sz = wb.getSize(new THREE.Vector3());
    console.log(`${label}: świat ${sz.x.toFixed(2)}×${sz.y.toFixed(2)}×${sz.z.toFixed(2)} m, skala świata ${obj.getWorldScale(new THREE.Vector3()).toArray().map((v) => v.toFixed(3)).join('×')}`);
  }
  const cp = camera.position;
  const nearPlaced = placed
    .map((q) => ({ ...q, d: Math.hypot(q.x - cp.x, q.z - cp.z) }))
    .filter((q) => q.d < 12)
    .sort((a, b) => a.d - b.d);
  // wszystkie siatki (nie-instancjonowane) w promieniu 25 m
  const bx = new THREE.Box3();
  const cand = [];
  game.scene.traverse((o) => {
    if (!o.isMesh || o.isInstancedMesh || !o.geometry) return;
    if (!o.geometry.boundingBox) o.geometry.computeBoundingBox();
    if (!o.geometry.boundingBox) return;
    bx.copy(o.geometry.boundingBox).applyMatrix4(o.matrixWorld);
    const c3 = bx.getCenter(new THREE.Vector3());
    const d3 = Math.hypot(c3.x - cp.x, c3.z - cp.z);
    if (d3 > 25) return;
    const sz = bx.getSize(new THREE.Vector3());
    const chain = [];
    let pn = o.parent;
    while (pn && chain.length < 3) { if (pn.name) chain.push(pn.name); pn = pn.parent; }
    cand.push(`${o.name || o.geometry.type}[${o.material?.name ?? ''}/${o.material?.color ? '#' + o.material.color.getHexString() : 'vb'}] ${d3.toFixed(1)}m ${sz.x.toFixed(1)}×${sz.y.toFixed(1)}×${sz.z.toFixed(1)} <${chain.join('<') || 'scena'}>`);
  });
  console.log('siatki < 25 m:', cand.length);
  for (const c of cand.slice(0, 20)) console.log('   ', c);
  // instancje (drzewa, skały, trawa) w pobliżu kamery
  const instRows = [];
  const mm = new THREE.Matrix4();
  const pp = new THREE.Vector3();
  const qq = new THREE.Quaternion();
  const ss = new THREE.Vector3();
  game.scene.traverse((o) => {
    if (!o.isInstancedMesh) return;
    for (let i = 0; i < o.count; i += 1) {
      o.getMatrixAt(i, mm);
      mm.premultiply(o.matrixWorld);
      mm.decompose(pp, qq, ss);
      const dd = Math.hypot(pp.x - cp.x, pp.z - cp.z);
      if (dd < 10) instRows.push(`${o.name || o.geometry.type}#${i} skala ${ss.x.toFixed(2)}/${ss.y.toFixed(2)} d=${dd.toFixed(1)}`);
    }
  });
  console.log('instancje < 10 m:', instRows.slice(0, 8).join(' | ') || 'brak');
  // czy tekstury z paczek faktycznie się wczytały (podgląd bez przeglądarki)
  let withMap = 0;
  let withoutMap = 0;
  const seen = new Set();
  game.scene.traverse((o) => {
    if (!o.isMesh || !o.material) return;
    const mats = Array.isArray(o.material) ? o.material : [o.material];
    for (const m of mats) {
      if (!m || seen.has(m.uuid)) continue;
      seen.add(m.uuid);
      if (m.map) withMap += 1;
      else if (/texture/i.test(m.name ?? '')) withoutMap += 1;
    }
  });
  console.log(`materiały z teksturą: ${withMap}, bez tekstury (a powinny): ${withoutMap}`);
  // które propsz z paczek stoją najbliżej gracza (po nazwie atlasu)
  const kit = [];
  game.world.group.traverse((o) => {
    if (!o.isMesh) return;
    const mats = Array.isArray(o.material) ? o.material : [o.material];
    if (!mats.some((m) => /texture/i.test(m?.name ?? ''))) return;
    const wp = o.getWorldPosition(new THREE.Vector3());
    const dd = Math.hypot(wp.x - px, wp.z - pz);
    if (dd < 30) kit.push(`${mats[0]?.name}/${o.parent?.name || o.name || '?'}@${dd.toFixed(0)}`);
  });
  console.log('propsy z paczek < 30 m:', [...new Set(kit)].slice(0, 12).join(', ') || 'brak');
  console.log('propsy z paczki < 12 m:', nearPlaced.map((q) => `${q.key}@${q.d.toFixed(1)}`).join(', ') || 'brak');
  const bad = Object.entries(assets?.props ?? {})
    .map(([k, v]) => [k, v.height])
    .filter(([, h]) => h < 0.05 || h > 4.5);
  console.log('podejrzane wysokości propsów:', bad.map(([k, h]) => `${k}=${h.toFixed(3)}`).join(', ') || 'brak');
  // Duże obiekty w pobliżu gracza — szukanie „ścian” zasłaniających kamerę.
  const big = [];
  const b2 = new THREE.Box3();
  game.scene.traverse((o) => {
    if (!o.isMesh || !o.geometry) return;
    if (!o.geometry.boundingBox) o.geometry.computeBoundingBox();
    if (!o.geometry.boundingBox) return;
    b2.copy(o.geometry.boundingBox).applyMatrix4(o.matrixWorld);
    const s2 = b2.getSize(new THREE.Vector3());
    const c2 = b2.getCenter(new THREE.Vector3());
    const d2 = Math.hypot(c2.x - px, c2.z - pz);
    if (d2 < 40 && Math.max(s2.x, s2.y, s2.z) > 6) {
      const chain = [];
      let p = o;
      while (p && chain.length < 4) {
        if (p.name) chain.push(p.name);
        p = p.parent;
      }
      big.push([`${chain.join('<') || '?'}`, d2.toFixed(0), `y ${b2.min.y.toFixed(0)}..${b2.max.y.toFixed(0)}`, `rozm ${s2.x.toFixed(0)}×${s2.y.toFixed(0)}×${s2.z.toFixed(0)}`]);
    }
  });
  big.sort((a, b) => Number(a[1]) - Number(b[1]));
  console.log('DUŻE obiekty < 40 m:', big.length);
  for (const b of big.slice(0, 12)) console.log('   ', b.join(' | '));
}
if (argv.includes('--near')) {
  const box = new THREE.Box3();
  const center = new THREE.Vector3();
  const near = [];
  let total = 0;
  game.scene.traverse((o) => {
    if (!o.isMesh) return;
    total += 1;
    if (!o.geometry) return;
    if (!o.geometry.boundingBox) o.geometry.computeBoundingBox();
    if (!o.geometry.boundingBox) return;
    box.copy(o.geometry.boundingBox).applyMatrix4(o.matrixWorld);
    box.getCenter(center);
    const d = Math.hypot(center.x - px, center.z - pz);
    if (d < 90) {
      const size = box.getSize(new THREE.Vector3());
      const chain = [];
      let p = o.parent;
      while (p && chain.length < 3) { if (p.name) chain.push(p.name); p = p.parent; }
      near.push([
        `${o.name || '(bez nazwy)'}/${o.geometry.type}/${o.material?.type ?? '?'}`,
        d.toFixed(0),
        `y ${box.min.y.toFixed(0)}..${box.max.y.toFixed(0)}`,
        `rozm ${size.x.toFixed(0)}×${size.z.toFixed(0)}`,
        `rodzic: ${chain.join('<') || 'scena'}`,
      ]);
    }
  });
  near.sort((a, b) => a[1] - b[1]);
  console.log('meshy:', total, '| w promieniu 90 m:', near.length);
  for (const n of near.slice(0, 18)) console.log('   ', n.join(' | '));
}

// --- rasteryzator ----------------------------------------------------------
const buffer = new Uint8ClampedArray(W * H * 3);
const depth = new Float32Array(W * H).fill(Infinity);

// tło: niebo
for (let y = 0; y < H; y += 1) {
  const t = y / H;
  const r = 150 + 45 * t;
  const g = 175 + 35 * t;
  const b = 205 + 20 * t;
  for (let x = 0; x < W; x += 1) {
    const i = (y * W + x) * 3;
    buffer[i] = r;
    buffer[i + 1] = g;
    buffer[i + 2] = b;
  }
}

const sunDir = new THREE.Vector3(0.5, 0.85, 0.3).normalize();
const viewProj = new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
const va = new THREE.Vector3();
const vb = new THREE.Vector3();
const vc = new THREE.Vector3();
const nrm = new THREE.Vector3();
const e1 = new THREE.Vector3();
const e2 = new THREE.Vector3();
const tmpA = new THREE.Vector4();
const tmpB = new THREE.Vector4();
const tmpC = new THREE.Vector4();
const camPos = camera.position.clone();
const debugNear = argv.includes('--debug-near') ? new Map() : null;
const probePixel = argv.includes('--probe') ? [Math.floor(W * 0.25), Math.floor(H * 0.5)] : null;
const probeHits = new Map();
let tris = 0;

function toClip(v, target) {
  target.set(v.x, v.y, v.z, 1).applyMatrix4(viewProj);
  return target;
}

/** Przecina wielokąt w clip-space z płaszczyzną bliską (z + w >= 0). */
function clipNear(poly) {
  const out = [];
  const EPS = 1e-6;
  for (let i = 0; i < poly.length; i += 1) {
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];
    const da = a.z + a.w;
    const db = b.z + b.w;
    if (da >= -EPS) out.push(a);
    if ((da >= -EPS) !== (db >= -EPS)) {
      const t = da / (da - db);
      out.push({
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t,
        z: a.z + (b.z - a.z) * t,
        w: a.w + (b.w - a.w) * t,
      });
    }
  }
  return out;
}

const toSRGB = (v) => (v <= 0.0031308 ? v * 12.92 : 1.055 * Math.pow(v, 1 / 2.4) - 0.055);

function shade(color, n, dist) {
  const lambert = Math.max(0, n.dot(sunDir));
  const light = 0.45 + 0.85 * lambert;
  const fog = Math.min(0.72, Math.max(0, (dist - 90) / 900));
  const r = toSRGB(Math.min(1, color.r * light)) * 255;
  const g = toSRGB(Math.min(1, color.g * light)) * 255;
  const b = toSRGB(Math.min(1, color.b * light)) * 255;
  return [
    r + (168 - r) * fog,
    g + (188 - g) * fog,
    b + (208 - b) * fog,
  ];
}

const tri = [tmpA, tmpB, tmpC];
const cA = new THREE.Color();
const cB = new THREE.Color();
const cC = new THREE.Color();

function rasterize(a, b, c, color, dist, label = '?') {
  const area = (b.x - a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y);
  if (Math.abs(area) < 1e-9) return;
  const minX = Math.max(0, Math.floor(Math.min(a.x, b.x, c.x)));
  const maxX = Math.min(W - 1, Math.ceil(Math.max(a.x, b.x, c.x)));
  const minY = Math.max(0, Math.floor(Math.min(a.y, b.y, c.y)));
  const maxY = Math.min(H - 1, Math.ceil(Math.max(a.y, b.y, c.y)));
  if (minX > maxX || minY > maxY) return;
  const inv = 1 / area;
  const [r, g, bl] = color;
  for (let y = minY; y <= maxY; y += 1) {
    const py = y + 0.5;
    for (let x = minX; x <= maxX; x += 1) {
      const px2 = x + 0.5;
      const w0 = ((b.x - px2) * (c.y - py) - (c.x - px2) * (b.y - py)) * inv;
      const w1 = ((c.x - px2) * (a.y - py) - (a.x - px2) * (c.y - py)) * inv;
      const w2 = 1 - w0 - w1;
      if (w0 < 0 || w1 < 0 || w2 < 0) continue;
      const z = w0 * a.z + w1 * b.z + w2 * c.z;
      const idx = y * W + x;
      if (z >= depth[idx]) continue;
      depth[idx] = z;
      if (probePixel && x === probePixel[0] && y === probePixel[1]) probeHits.set(label, (probeHits.get(label) ?? 0) + 1);
      const o = idx * 3;
      buffer[o] = r;
      buffer[o + 1] = g;
      buffer[o + 2] = bl;
    }
  }
}

const m4 = new THREE.Matrix4();
const instanceMatrix = new THREE.Matrix4();
const worldMat = new THREE.Matrix4();

function drawGeometry(geometry, matrix, material, useVertexColors, count, meshRef = null) {
  const skinned = !!(meshRef?.isSkinnedMesh && meshRef.applyBoneTransform);
  const pos = geometry.attributes.position;
  if (!pos) return;
  const index = geometry.index;
  const colors = useVertexColors ? geometry.attributes.color : null;
  const baseColor = material?.color ?? new THREE.Color(0.6, 0.6, 0.6);
  const total = index ? index.count : pos.count;
  const step = total > 24000 ? Math.ceil(total / 24000) : 1;
  m4.copy(matrix);
  const A = new THREE.Vector4();
  const B = new THREE.Vector4();
  const C = new THREE.Vector4();
  for (let i = 0; i + 2 < total; i += 3 * step) {
    const ia = index ? index.getX(i) : i;
    const ib = index ? index.getX(i + 1) : i + 1;
    const ic = index ? index.getX(i + 2) : i + 2;
    if (skinned) {
      skinVertex(meshRef, ia, va);
      skinVertex(meshRef, ib, vb);
      skinVertex(meshRef, ic, vc);
    } else {
      va.fromBufferAttribute(pos, ia).applyMatrix4(m4);
      vb.fromBufferAttribute(pos, ib).applyMatrix4(m4);
      vc.fromBufferAttribute(pos, ic).applyMatrix4(m4);
    }
    toClip(va, A);
    toClip(vb, B);
    toClip(vc, C);
    if (A.w <= 0 && B.w <= 0 && C.w <= 0) continue;
    const poly = clipNear([A, B, C]);
    if (poly.length < 3) continue;
    // normalna z oryginalnych wierzchołków (po transformacji)
    e1.copy(vb).sub(va);
    e2.copy(vc).sub(va);
    nrm.copy(e1).cross(e2).normalize();
    const center = va.clone().add(vb).add(vc).multiplyScalar(1 / 3);
    if (nrm.dot(camPos.clone().sub(center)) < 0) nrm.negate();
    let col = baseColor;
    if (colors) {
      cA.fromBufferAttribute(colors, ia);
      cB.fromBufferAttribute(colors, ib);
      cC.fromBufferAttribute(colors, ic);
      col = cA.clone().add(cB).add(cC).multiplyScalar(1 / 3);
    }
    const dist = center.distanceTo(camPos);
    if (debugNear && dist < 7) {
      const label = meshRef ? `${meshRef.name || meshRef.geometry.type}/${meshRef.material?.name ?? '?'}/${meshRef.material?.type ?? '?'}` : 'instanced';
      debugNear.set(label, (debugNear.get(label) ?? 0) + 1);
    }
    const shaded = shade(col, nrm, dist);
    const screen = poly.map((v) => ({
      x: ((v.x / v.w) * 0.5 + 0.5) * W,
      y: (1 - ((v.y / v.w) * 0.5 + 0.5)) * H,
      z: v.z / v.w,
    }));
    for (let k = 1; k + 1 < screen.length; k += 1) {
      rasterize(
        screen[0], screen[k], screen[k + 1], shaded, dist,
        meshRef ? `${meshRef.name || meshRef.geometry.type}/${meshRef.material?.name ?? '?'}` : 'instanced'
      );
      tris += 1;
    }
  }
}

/** Pozycja wierzchołka po skórowaniu (dla SkinnedMesh). */
const skinnedPoint = new THREE.Vector3();
function skinVertex(mesh, index, target) {
  target.fromBufferAttribute(mesh.geometry.attributes.position, index);
  if (mesh.isSkinnedMesh && mesh.applyBoneTransform) mesh.applyBoneTransform(index, target);
  return target.applyMatrix4(mesh.matrixWorld);
}

game.scene.traverse((o) => {
  if (o.visible === false) return;
  if (o.isInstancedMesh) {
    const mat = o.material;
    const useVC = !!o.geometry.attributes.color;
    const step = o.count > 900 ? Math.ceil(o.count / 900) : 1;
    for (let i = 0; i < o.count; i += step) {
      o.getMatrixAt(i, instanceMatrix);
      instanceMatrix.premultiply(o.matrixWorld);
      drawGeometry(o.geometry, instanceMatrix, mat, useVC, 1);
    }
    return;
  }
  if (!o.isMesh) return;
  if (o.material?.transparent && (o.material.opacity ?? 1) < 0.4) return;
  if (o.name === 'sky' || o.name === 'clouds') return;
  drawGeometry(o.geometry, o.matrixWorld, o.material, !!o.geometry.attributes.color, 1, o);
});

// --- zapis PNG -------------------------------------------------------------
function crc32(buf) {
  let c;
  const table = crc32.table ?? (crc32.table = (() => {
    const t = new Int32Array(256);
    for (let n = 0; n < 256; n += 1) {
      c = n;
      for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      t[n] = c;
    }
    return t;
  })());
  let crc = -1;
  for (let i = 0; i < buf.length; i += 1) crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  return (crc ^ -1) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const tp = Buffer.from(type, 'ascii');
  const body = Buffer.concat([tp, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}
const raw = Buffer.alloc((W * 3 + 1) * H);
for (let y = 0; y < H; y += 1) {
  raw[y * (W * 3 + 1)] = 0;
  for (let x = 0; x < W; x += 1) {
    const si = (y * W + x) * 3;
    const di = y * (W * 3 + 1) + 1 + x * 3;
    raw[di] = buffer[si];
    raw[di + 1] = buffer[si + 1];
    raw[di + 2] = buffer[si + 2];
  }
}
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8;
ihdr[9] = 2;
const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk('IHDR', ihdr),
  chunk('IDAT', zlib.deflateSync(raw, { level: 6 })),
  chunk('IEND', Buffer.alloc(0)),
]);
fs.writeFileSync(out, png);
if (probePixel) {
  console.log('piksel', probePixel.join(','), '→', [...probeHits.entries()].map(([k, v]) => `${k}×${v}`).join(' | ') || 'nic');
  // promień przez piksel — co naprawdę zasłania widok
  const ndc = new THREE.Vector2((probePixel[0] / W) * 2 - 1, -((probePixel[1] / H) * 2 - 1));
  const ray = new THREE.Raycaster();
  ray.setFromCamera(ndc, camera);
  const hits = ray.intersectObjects(game.scene.children, true).slice(0, 6);
  for (const h of hits) {
    const chain = [];
    let p = h.object;
    while (p && chain.length < 5) {
      chain.push(`${p.name || p.type}${p.scale && p.scale.x !== 1 ? `(×${p.scale.x.toFixed(1)})` : ''}`);
      p = p.parent;
    }
    console.log(`   trafienie ${h.distance.toFixed(1)} m: ${chain.join(' < ')} [${h.object.material?.type ?? 'instanced'}]`);
  }
}
if (debugNear) {
  const rows2 = [...debugNear.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  console.log('trójkąty bliżej niż 7 m:', rows2.map(([k, v]) => `${k} ×${v}`).join('\n  '));
}
console.log(`zapisano ${out} (${W}×${H}), trójkątów: ${tris}, pozycja gracza: ${px.toFixed(0)}, ${pz.toFixed(0)}`);
staticServer?.close();
