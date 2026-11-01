// Podgląd gruntu z teksturami — ray-marching po polu wysokości, mieszanie
// warstw liczone w JS tak samo jak w shaderze (tools/groundMaterial).
// Pozwala ocenić wygląd mapy bez GPU.
//   node tools/ground-preview.mjs --x 120 --z 40 --yaw 2.0 --out /tmp/ground.png
import fs from 'node:fs';
import * as THREE from 'three';
import zlib from 'node:zlib';
import {
  heightAt, terrainColorAt, groundWeightsAt, slopeAt, distanceToPath,
  WATER_LEVEL, PATHS, WORLD_RADIUS,
} from '../src/world/terrain.js';
import { buildGroundLayers, GROUND_TINTS } from '../src/world/groundTextures.js';

const argv = process.argv.slice(2);
const arg = (name, def) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] !== undefined ? Number(argv[i + 1]) : def;
};
const W = arg('w', 640);
const H = arg('h', 360);
const eyeX = arg('x', 120);
const eyeZ = arg('z', 40);
const eyeY = arg('y', 1.7);
const yaw = arg('yaw', 2.0);
const pitch = arg('pitch', 0.05);
const fov = arg('fov', 62);
const maxDist = arg('dist', 900);
const out = argv.includes('--out') ? argv[argv.indexOf('--out') + 1] : '/tmp/ground.png';

// --- tekstury (te same, które trafiają do shadera) --------------------------
const SIZE = 512;
const L = buildGroundLayers(SIZE);
const channels = {
  grass: { lum: L.grass.lum, hgt: L.grass.hgt, tint: GROUND_TINTS.grass },
  dirt: { lum: L.dirt.lum, hgt: L.dirt.hgt, tint: GROUND_TINTS.dirt },
  rock: { lum: L.rock.lum, hgt: L.rock.hgt, tint: GROUND_TINTS.rock },
  sand: { lum: L.sand.lum, hgt: L.sand.hgt, tint: GROUND_TINTS.sand },
};
function sampleTex(ch, scale, u, v, heightFlag) {
  const src = heightFlag ? ch.hgt : ch.lum;
  const x = u * scale * SIZE;
  const y = v * scale * SIZE;
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const fx = x - xi;
  const fy = y - yi;
  const at = (px, py) => {
    const ix = ((px % SIZE) + SIZE) % SIZE;
    const iy = ((py % SIZE) + SIZE) % SIZE;
    return src[iy * SIZE + ix];
  };
  const a = at(xi, yi);
  const b = at(xi + 1, yi);
  const c = at(xi, yi + 1);
  const d = at(xi + 1, yi + 1);
  const ab = a + (b - a) * fx;
  const cd = c + (d - c) * fx;
  return ab + (cd - ab) * fy;
}

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smoothstep = (e0, e1, x) => {
  const t = clamp01((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
};

const gw = [0, 0, 0, 0];
const col = new THREE.Color();

function normalAt(x, z) {
  const e = 2.5;
  const hx = heightAt(x - e, z) - heightAt(x + e, z);
  const hz = heightAt(x, z - e) - heightAt(x, z + e);
  const len = Math.hypot(hx, 2 * e, hz) || 1;
  return [hx / len, (2 * e) / len, hz / len];
}

// --- światło ---------------------------------------------------------------
const sun = (() => {
  const v = [-0.42, 0.78, -0.46];
  const l = Math.hypot(...v);
  return v.map((c) => c / l);
})();

function shade(x, z, h) {
  terrainColorAt(x, z, h, slopeAt(x, z), col);
  const n = normalAt(x, z);
  const rockW = 1 - smoothstep(0.55, 0.88, clamp01(n[1]));

  // droga: odległość do osi traktu (odpowiednik pętli w shaderze)
  const pathD = distanceToPath(x, z);
  const road = 1 - smoothstep(2.4, 7.0, pathD);
  groundWeightsAt(x, z, h, slopeAt(x, z), gw);

  const grassW = gw[0] * (1 - road) * (1 - rockW);
  const sandW = gw[1] * (1 - rockW * 0.85) * (1 - road);
  const snowW = gw[2] * (1 - rockW * 0.9) * (1 - road);
  const dirtW = Math.max(gw[3] * (1 - rockW * 0.5) * (1 - road), road);
  const total = grassW + sandW + snowW + dirtW + rockW + 1e-4;

  const g = channels.grass;
  const d = channels.dirt;
  const r = channels.rock;
  const s = channels.sand;

  const g1 = sampleTex(g, 0.16, x, z, false);
  const g2 = sampleTex(g, 0.16 * 2.71, x + 0.31, z + 0.67, false);
  const grassTex = g1 * 0.65 + g2 * 0.35;
  const dirtTex = sampleTex(d, 0.11, x, z, false);
  const rockTex = sampleTex(r, 0.075, x, z, false);
  const sandTex = sampleTex(s, 0.24, x, z, false);

  const detail = (grassTex * grassW + dirtTex * dirtW + rockTex * rockW + sandTex * (sandW + snowW)) / total;
  const macro = sampleTex(r, 0.0075, x, z, true);
  const macro2 = sampleTex(s, 0.0021, x, z, true);
  const variance = 1 + (macro - 0.566) * 0.55 + (macro2 - 0.492) * 0.45;
  const mul = Math.min(1.6, Math.max(0.55, detail * 1.754)) * variance;

  const albedo = [col.r * mul, col.g * mul, col.b * mul];
  const ndl = Math.max(0, n[0] * sun[0] + n[1] * sun[1] + n[2] * sun[2]);
  const light = 0.36 + 0.78 * ndl * Math.min(1, 0.55 + n[1] * 0.7);
  return [albedo[0] * light, albedo[1] * light, albedo[2] * light];
}

// --- niebo -----------------------------------------------------------------
function sky(dy) {
  const t = clamp01(dy * 1.4);
  return [0.62 + t * 0.2, 0.72 + t * 0.16, 0.84 + t * 0.1];
}

// --- render ----------------------------------------------------------------
const eyeH = heightAt(eyeX, eyeZ) + eyeY;
const cam = [eyeX, eyeH, eyeZ];
const dir = [Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), Math.cos(yaw) * Math.cos(pitch)];
const right = [-dir[2], 0, dir[0]];
const rl = Math.hypot(...right) || 1;
const rightN = right.map((c) => c / rl);
const up = [
  dir[1] * rightN[2] - dir[2] * rightN[1],
  dir[2] * rightN[0] - dir[0] * rightN[2],
  dir[0] * rightN[1] - dir[1] * rightN[0],
];
const aspect = W / H;
const tanFov = Math.tan((fov * Math.PI) / 180 / 2);

const buf = new Float32Array(W * H * 3);

for (let py = 0; py < H; py++) {
  const sy = (1 - (2 * (py + 0.5)) / H) * tanFov; // góra ekranu = +Y
  for (let px = 0; px < W; px++) {
    const sx = ((2 * (px + 0.5)) / W - 1) * tanFov * aspect;
    let dx = dir[0] + rightN[0] * sx - up[0] * sy;
    let dy = dir[1] + rightN[1] * sx - up[1] * sy;
    let dz = dir[2] + rightN[2] * sx - up[2] * sy;
    const dl = Math.hypot(dx, dy, dz);
    dx /= dl; dy /= dl; dz /= dl;

    let hit = null;
    let t = 0.4;
    let prev = cam[1] - heightAt(cam[0], cam[2]);
    let step = 1.2;
    while (t < maxDist) {
      const wx = cam[0] + dx * t;
      const wz = cam[2] + dz * t;
      const wy = cam[1] + dy * t;
      if (Math.abs(wx) > WORLD_RADIUS || Math.abs(wz) > WORLD_RADIUS) break;
      const diff = wy - heightAt(wx, wz);
      if (diff < 0) {
        // zawęź trafienie bisekcją
        let lo = t - step;
        let hi = t;
        for (let k = 0; k < 8; k++) {
          const mid = (lo + hi) / 2;
          const mx = cam[0] + dx * mid;
          const mz = cam[2] + dz * mid;
          const my = cam[1] + dy * mid;
          if (my - heightAt(mx, mz) < 0) hi = mid;
          else lo = mid;
        }
        hit = [cam[0] + dx * hi, cam[1] + dy * hi, cam[2] + dz * hi, hi];
        break;
      }
      prev = diff;
      step = Math.min(60, 1.0 + t * 0.02 + diff * 0.25);
      t += step;
    }

    let rgb;
    if (hit) {
      const [hx, hy, hz, dist] = hit;
      rgb = shade(hx, hz, hy);
      // woda: tafla na poziomie lustra
      const water = WATER_LEVEL;
      if (hy < water && !(distanceToPath(hx, hz) < 3)) {
        const depth = Math.min(1, (water - hy) / 6);
        rgb = [0.16 + depth * 0.05, 0.30 + depth * 0.06, 0.38 + depth * 0.06];
        const glare = Math.pow(Math.max(0, Math.sin(pitch)), 3);
        rgb = rgb.map((c) => c + glare * 0.12);
      }
      // mgła
      const fogT = clamp01((dist - 60) / 900);
      const fog = [0.74, 0.79, 0.85];
      rgb = rgb.map((c, i) => c * (1 - fogT * 0.85) + fog[i] * fogT * 0.85);
    } else {
      rgb = sky(dy);
    }
    const o = (py * W + px) * 3;
    buf[o] = clamp01(rgb[0]);
    buf[o + 1] = clamp01(rgb[1]);
    buf[o + 2] = clamp01(rgb[2]);
  }
}

// --- PNG -------------------------------------------------------------------
function crc32(b) {
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
  raw[y * (W * 3 + 1)] = 0;
  for (let x = 0; x < W; x += 1) {
    const si = (y * W + x) * 3;
    const di = y * (W * 3 + 1) + 1 + x * 3;
    raw[di] = Math.round(buf[si] * 255);
    raw[di + 1] = Math.round(buf[si + 1] * 255);
    raw[di + 2] = Math.round(buf[si + 2] * 255);
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
console.log(`zapisano ${out} (${W}×${H}); traktów: ${PATHS.length}`);
