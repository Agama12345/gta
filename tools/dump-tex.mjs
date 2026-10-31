// Zrzut tekstur gruntu do PNG (bez GPU) — do oceny ziarna, koloru i szwów.
//   node tools/dump-tex.mjs [rozmiar] [katalog]
// Każda warstwa ląduje jako osobny plik, powiększona ×2 metodą nearest,
// żeby było widać pojedyncze piksele — tak samo jak trawa w grze.
import fs from 'node:fs';
import zlib from 'node:zlib';
import { buildGroundLayers, GROUND_TINTS } from '../src/world/groundTextures.js';

const SIZE = Number(process.argv[2] ?? 512);
const outDir = process.argv[3] ?? '/tmp/tex';
fs.mkdirSync(outDir, { recursive: true });

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
function writePNG(path, W, H, rgb) {
  const raw = Buffer.alloc((W * 3 + 1) * H);
  for (let y = 0; y < H; y += 1) {
    const row = y * (W * 3 + 1);
    raw[row] = 0;
    for (let x = 0; x < W; x += 1) {
      const si = (y * W + x) * 3;
      const di = row + 1 + x * 3;
      raw[di] = Math.max(0, Math.min(255, Math.round(rgb[si])));
      raw[di + 1] = Math.max(0, Math.min(255, Math.round(rgb[si + 1])));
      raw[di + 2] = Math.max(0, Math.min(255, Math.round(rgb[si + 2])));
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(W, 0);
  ihdr.writeUInt32BE(H, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  fs.writeFileSync(path, Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 6 })),
    chunk('IEND', Buffer.alloc(0)),
  ]));
}

const t0 = Date.now();
const L = buildGroundLayers(SIZE);
const gen = Date.now() - t0;
for (const name of ['grass', 'dirt', 'rock', 'sand']) {
  const layer = L[name];
  const tint = GROUND_TINTS[name];
  const S = SIZE * 2;
  const rgb = new Uint8Array(S * S * 3);
  for (let y = 0; y < S; y += 1) {
    for (let x = 0; x < S; x += 1) {
      const src = Math.floor(y / 2) * SIZE + Math.floor(x / 2);
      const o = (y * S + x) * 3;
      rgb[o] = layer.lum[src] * tint[0] * 255;
      rgb[o + 1] = layer.lum[src] * tint[1] * 255;
      rgb[o + 2] = layer.lum[src] * tint[2] * 255;
    }
  }
  writePNG(`${outDir}/${name}.png`, S, S, rgb);
  // wysokość jako odcień szarości — widać, czy relief ma sens
  const hgt = new Uint8Array(S * S * 3);
  for (let y = 0; y < S; y += 1) {
    for (let x = 0; x < S; x += 1) {
      const src = Math.floor(y / 2) * SIZE + Math.floor(x / 2);
      const v = layer.hgt[src] * 255;
      const o = (y * S + x) * 3;
      hgt[o] = hgt[o + 1] = hgt[o + 2] = v;
    }
  }
  writePNG(`${outDir}/${name}-hgt.png`, S, S, hgt);
}
console.log(`zapisano ${outDir} (${SIZE}px), generowanie ${gen} ms`);
