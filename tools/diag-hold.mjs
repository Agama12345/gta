// Render postaci bez GPU: rasteryzacja trójkątów z buforem głębi.
// Pozwala zobaczyć, co naprawdę jest w modelu (dodatkowe siatki, dziury,
// proporcje) mimo braku WebGL w środowisku.
//   node tools/render-char.mjs [plik.glb] [klatka]
import fs from 'node:fs';
import zlib from 'node:zlib';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost/', pretendToBeVisual: true });
global.window = dom.window;
global.document = dom.window.document;
global.HTMLElement = dom.window.HTMLElement;
global.self = dom.window;
// GLTFLoader czeka na `onload` obrazka — w Node nikt go nie wywoła
const fakeImage = () => {
  const listeners = {};
  const img = {
    width: 4, height: 4, style: {},
    addEventListener: (type, fn) => { (listeners[type] ??= []).push(fn); },
    removeEventListener: () => {},
    setAttribute: () => {},
    getAttribute: () => null,
  };
  Object.defineProperty(img, 'src', {
    set() {
      setTimeout(() => {
        img.onload?.({});
        (listeners.load ?? []).forEach((fn) => fn({}));
      }, 0);
    },
    get() { return ''; },
  });
  return img;
};
dom.window.document.createElementNS = () => fakeImage();

const THREE = await import('three');
const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');
const { CharacterRig } = await import('../src/entities/characterRig.js');
const { makePropMesh, swordMesh, shieldMesh } = await import('../src/entities/weaponProps.js');

const CHARS = 'public/assets/models/chars';
const file = process.argv[2] ?? 'q_adventurer.glb';
const out = process.argv[3] ?? '/tmp/char.png';
// obrót modelu (w radianach) — 0 = widok z tyłu, PI = twarz do kamery
const yaw = Number(process.argv[4] ?? 0);
// broń: node tools/diag-hold.mjs q_adventurer.glb out.png 3.14 sword -0.55,0,0.1 rightHand
const propKey = process.argv[5] ?? null;
const [rx, ry, rz] = String(process.argv[6] ?? '0,0,0').split(',').map(Number);
const handName = process.argv[7] ?? 'rightHand';
const W = 420;
const H = 560;

function load(f) {
  return new Promise((res, rej) => {
    const buf = fs.readFileSync(`${CHARS}/${f}`);
    new GLTFLoader().parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength), '', res, rej);
  });
}

const manifest = JSON.parse(fs.readFileSync(`${CHARS}/models.json`, 'utf8'));
const libGltf = await load(manifest.library);
const gltf = await load(file);
const rig = new CharacterRig(gltf, {
  library: { scene: libGltf.scene, clips: libGltf.animations },
  name: 'bohater',
  // tak samo jak w grze: część siatek bywa chowana (np. plecak bohatera)
  hideParts: manifest.heroHide,
});
// modele broni ładujemy z tej samej biblioteki co gra
const PROP_FILES = { sword: 'w_sword_1handed.glb', shield: 'w_shield_round.glb', axe: 'w_axe_1handed.glb', dagger: 'w_dagger.glb', staff: 'w_staff.glb' };
let propAssets = null;
if (propKey) {
  const f = PROP_FILES[propKey];
  const buf = fs.readFileSync(`public/assets/models/props/${f}`);
  const g = await new Promise((res, rej) => new GLTFLoader().parse(
    buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength), 'public/assets/models/props/', res, rej));
  propAssets = { props: { [propKey]: { scene: g.scene, height: 1 } } };
  const s = new THREE.Box3().setFromObject(g.scene).getSize(new THREE.Vector3());
  propAssets.props[propKey].height = Math.max(s.x, s.y, s.z);
}

rig.play('idle');
rig.mixer.update(0.6);
rig.group.updateMatrixWorld(true);

if (propKey) {
  // te same funkcje co w grze, żeby podgląd nie kłamał
  const mesh = propKey === 'shield' ? shieldMesh(propAssets)
    : propKey === 'sword' ? swordMesh(propAssets)
      : makePropMesh(propAssets, propKey, { length: 1.05, grip: 0.2 });
  mesh.rotation.set(rx, ry, rz);
  const ok = rig.attach(mesh, handName);
  console.log('broń przypięta do', handName, ok);
  rig.group.updateMatrixWorld(true);
}

// --- zbieramy trójkąty w przestrzeni świata
rig.group.rotation.y = yaw;
rig.group.updateMatrixWorld(true);
const box = new THREE.Box3().setFromObject(rig.group);
const center = new THREE.Vector3();
box.getCenter(center);
const height = box.max.y - box.min.y;
const scale = (H * 0.86) / height;
const v = new THREE.Vector3();
const tris = [];
const color = new THREE.Color();
let meshCount = 0;

rig.group.traverse((o) => {
  if (!o.isMesh || !o.geometry?.attributes?.position) return;
  meshCount += 1;
  const pos = o.geometry.attributes.position;
  const idx = o.geometry.index;
  const mat = Array.isArray(o.material) ? o.material[0] : o.material;
  color.set(mat?.color ?? 0x888888);
  const vcol = o.geometry.attributes.color;
  const n = idx ? idx.count : pos.count;
  for (let i = 0; i < n; i += 3) {
    const p = [];
    for (let k = 0; k < 3; k++) {
      const vi = idx ? idx.getX(i + k) : i + k;
      v.fromBufferAttribute(pos, vi);
      if (o.isSkinnedMesh && o.applyBoneTransform) o.applyBoneTransform(vi, v);
      v.applyMatrix4(o.matrixWorld);
      p.push({ x: (v.x - center.x) * scale + W / 2, y: H * 0.93 - (v.y - box.min.y) * scale, z: v.z });
    }
    const vi0 = idx ? idx.getX(i) : i;
    const c = vcol
      ? { r: color.r * vcol.getX(vi0), g: color.g * vcol.getY(vi0), b: color.b * vcol.getZ(vi0) }
      : { r: color.r, g: color.g, b: color.b }; // kopia — `color` jest wspólny dla wszystkich
    tris.push({ p, c });
  }
});

// --- rasteryzacja z prostym oświetleniem i buforem głębi
const rgb = new Float32Array(W * H * 3);
const depth = new Float32Array(W * H).fill(Infinity);
for (let i = 0; i < W * H; i++) {
  const g = 0.10 + 0.16 * (i / (W * H));
  rgb[i * 3] = g * 0.9;
  rgb[i * 3 + 1] = g;
  rgb[i * 3 + 2] = g * 1.05;
}
for (const t of tris) {
  const [a, b, c2] = t.p;
  const minX = Math.max(0, Math.floor(Math.min(a.x, b.x, c2.x)));
  const maxX = Math.min(W - 1, Math.ceil(Math.max(a.x, b.x, c2.x)));
  const minY = Math.max(0, Math.floor(Math.min(a.y, b.y, c2.y)));
  const maxY = Math.min(H - 1, Math.ceil(Math.max(a.y, b.y, c2.y)));
  const area = (b.x - a.x) * (c2.y - a.y) - (c2.x - a.x) * (b.y - a.y);
  if (Math.abs(area) < 1e-6) continue;
  // normalna do cieniowania
  const ux = b.x - a.x;
  const uy = b.y - a.y;
  const uz = b.z - a.z;
  const vx = c2.x - a.x;
  const vy = c2.y - a.y;
  const vz = c2.z - a.z;
  const nx = uy * vz - uz * vy;
  const ny = uz * vx - ux * vz;
  const nz = ux * vy - uy * vx;
  const nl = Math.hypot(nx, ny, nz) || 1;
  const light = Math.max(0.25, Math.min(1.2, 0.55 + (-nx / nl) * 0.3 + (ny / nl) * 0.45 + (nz / nl) * 0.25));
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const w0 = ((b.x - a.x) * (c2.y - a.y) - (c2.x - a.x) * (b.y - a.y));
      const w1 = ((b.x - x) * (c2.y - y) - (c2.x - x) * (b.y - y)) / w0;
      const w2 = ((c2.x - x) * (a.y - y) - (a.x - x) * (c2.y - y)) / w0;
      const w3 = 1 - w1 - w2;
      if (w1 < 0 || w2 < 0 || w3 < 0) continue;
      const z = a.z * w1 + b.z * w2 + c2.z * w3;
      const o = y * W + x;
      if (z >= depth[o]) continue;
      depth[o] = z;
      const cc = t.c;
      rgb[o * 3] = Math.min(1, cc.r * light);
      rgb[o * 3 + 1] = Math.min(1, cc.g * light);
      rgb[o * 3 + 2] = Math.min(1, cc.b * light);
    }
  }
}

// --- PNG
function crc32(b) {
  let c;
  const table = (crc32.table ??= (() => {
    const t = new Int32Array(256);
    for (let n = 0; n < 256; n += 1) {
      c = n;
      for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      t[n] = c;
    }
    return t;
  })());
  let crc = -1;
  for (let i = 0; i < b.length; i += 1) crc = (crc >>> 8) ^ table[(crc ^ b[i]) & 0xff];
  return (crc ^ -1) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}
const raw = Buffer.alloc((W * 3 + 1) * H);
for (let y = 0; y < H; y += 1) {
  const row = y * (W * 3 + 1);
  raw[row] = 0;
  for (let x = 0; x < W; x += 1) {
    const si = (y * W + x) * 3;
    const di = row + 1 + x * 3;
    // kolory w grze są liniowe — do podglądu robimy korektę gamma jak monitor
    raw[di] = Math.round(Math.pow(Math.min(1, rgb[si]), 1 / 2.2) * 255);
    raw[di + 1] = Math.round(Math.pow(Math.min(1, rgb[si + 1]), 1 / 2.2) * 255);
    raw[di + 2] = Math.round(Math.pow(Math.min(1, rgb[si + 2]), 1 / 2.2) * 255);
  }
}
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8;
ihdr[9] = 2;
fs.writeFileSync(out, Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk('IHDR', ihdr),
  chunk('IDAT', zlib.deflateSync(raw, { level: 6 })),
  chunk('IEND', Buffer.alloc(0)),
]));
const names = [];
rig.group.traverse((o) => { if (o.isMesh) names.push(o.name); });
console.log(`${file}: ${meshCount} siatek, ${tris.length} trójkątów, wzrost ${height.toFixed(2)} m`);
console.log('siatki:', names.join(', '));
console.log('zapisano', out);
