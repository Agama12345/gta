// Podgląd tekstur podłoża: zapisuje kafle 256×256 do PNG (bez przeglądarki).
//   node tools/dump-ground.mjs /tmp/ground
import fs from 'node:fs';
import zlib from 'node:zlib';
import { buildGroundLayers, layerToRGBA, layerToHeightRGBA, GROUND_TINTS } from '../src/world/groundTextures.js';

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
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}
function writePng(path, w, h, rgba) {
  const raw = Buffer.alloc((w * 3 + 1) * h);
  for (let y = 0; y < h; y += 1) {
    raw[y * (w * 3 + 1)] = 0;
    for (let x = 0; x < w; x += 1) {
      const si = (y * w + x) * 4;
      const di = y * (w * 3 + 1) + 1 + x * 3;
      raw[di] = rgba[si];
      raw[di + 1] = rgba[si + 1];
      raw[di + 2] = rgba[si + 2];
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  fs.writeFileSync(path, Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 6 })),
    chunk('IEND', Buffer.alloc(0)),
  ]));
}

const prefix = process.argv[2] || '/tmp/ground';
const t0 = Date.now();
const layers = buildGroundLayers(512);
const size = layers.size;
console.log(`warstwy policzone w ${Date.now() - t0} ms, kafel ${size}px`);

for (const key of ['grass', 'dirt', 'rock', 'sand']) {
  writePng(`${prefix}-${key}.png`, size, size, layerToRGBA(layers[key], size, GROUND_TINTS[key]));
  writePng(`${prefix}-${key}-h.png`, size, size, layerToHeightRGBA(layers[key], size));
}
console.log('zapisano', ['grass', 'dirt', 'rock', 'sand'].map((k) => `${prefix}-${k}.png`).join(', '));
