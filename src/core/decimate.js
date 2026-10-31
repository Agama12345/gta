// ---------------------------------------------------------------------------
// Uproszczanie geometrii do dalszego planu (LOD).
//
// Do `SimplifyModifier` z three.js nie ma co podchodzić: wymaga indeksowanej,
// „czystej” siatki, gubi kolory wierzchołków i na modelach z paczek CC0
// wywala się („No next vertex”). Tutaj jest prostsza i pewniejsza metoda:
// **grupowanie wierzchołków w siatce przestrzennej**. Wierzchołki w jednej
// komórce stają się jednym punktem, trójkąty zdegenerowane wypadają.
//
// Dla drzewa widzianego z 300 m to nie odróżnialne, a schodzi z ~2900 do
// kilkuset trójkątów. Kolory wierzchołków są uśredniane, więc roślinność
// nie zmienia barwy po przejściu na dalszy plan.
// ---------------------------------------------------------------------------
import * as THREE from 'three';

/**
 * @param {THREE.BufferGeometry} geo geometria źródłowa (może być nieindeksowana)
 * @param {number} cells ile komórek siatki na najdłuższy bok modelu
 * @returns {THREE.BufferGeometry|null}
 */
export function decimateGeometry(geo, cells = 22) {
  const pos = geo?.attributes?.position;
  if (!pos || pos.count < 12) return null;
  const col = geo.attributes.color;
  const uv = geo.attributes.uv;
  const idx = geo.index;

  geo.computeBoundingBox();
  const size = new THREE.Vector3();
  geo.boundingBox.getSize(size);
  const span = Math.max(size.x, size.y, size.z);
  if (!(span > 0)) return null;
  const cell = span / Math.max(4, cells);

  const keyToIndex = new Map();
  const outPos = [];
  const outCol = [];
  const outUv = [];
  const counts = [];
  const remap = (vi) => {
    const x = pos.getX(vi);
    const y = pos.getY(vi);
    const z = pos.getZ(vi);
    const kx = Math.round(x / cell);
    const ky = Math.round(y / cell);
    const kz = Math.round(z / cell);
    const key = `${kx},${ky},${kz}`;
    let found = keyToIndex.get(key);
    if (found === undefined) {
      found = outPos.length / 3;
      keyToIndex.set(key, found);
      outPos.push(kx * cell, ky * cell, kz * cell);
      outCol.push(col ? col.getX(vi) : 1, col ? col.getY(vi) : 1, col ? col.getZ(vi) : 1);
      outUv.push(uv ? uv.getX(vi) : 0, uv ? uv.getY(vi) : 0);
      counts.push(1);
    } else if (col) {
      // uśrednianie koloru w obrębie komórki
      const n = (counts[found] += 1);
      outCol[found * 3] += (col.getX(vi) - outCol[found * 3]) / n;
      outCol[found * 3 + 1] += (col.getY(vi) - outCol[found * 3 + 1]) / n;
      outCol[found * 3 + 2] += (col.getZ(vi) - outCol[found * 3 + 2]) / n;
    }
    if (uv) {
      const n = counts[found];
      outUv[found * 2] += (uv.getX(vi) - outUv[found * 2]) / n;
      outUv[found * 2 + 1] += (uv.getY(vi) - outUv[found * 2 + 1]) / n;
    }
    return found;
  };

  const outIdx = [];
  const triCount = idx ? idx.count / 3 : pos.count / 3;
  for (let t = 0; t < triCount; t++) {
    const a = remap(idx ? idx.getX(t * 3) : t * 3);
    const b = remap(idx ? idx.getX(t * 3 + 1) : t * 3 + 1);
    const c = remap(idx ? idx.getX(t * 3 + 2) : t * 3 + 2);
    if (a === b || b === c || a === c) continue; // zdegenerowany po sklejeniu
    outIdx.push(a, b, c);
  }
  if (outIdx.length < 12) return null;

  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.Float32BufferAttribute(outPos, 3));
  if (col) out.setAttribute('color', new THREE.Float32BufferAttribute(outCol, 3));
  if (uv) out.setAttribute('uv', new THREE.Float32BufferAttribute(outUv, 2));
  out.setIndex(outIdx);
  out.computeVertexNormals();
  out.computeBoundingSphere();
  return out;
}

/**
 * Sprawdza, czy uproszczenie ma sens (czy naprawdę zdejmuje trójkąty).
 * Zwraca geometrię lub `null`, gdy zysk jest znikomy.
 */
export function farLod(geo, { minTris = 700, ratio = 0.1 } = {}) {
  const tris = (geo.index ? geo.index.count : geo.attributes.position.count) / 3;
  if (tris < minTris) return null;
  try {
    geo.computeBoundingBox();
    const size = new THREE.Vector3();
    geo.boundingBox.getSize(size);
    const span = Math.max(size.x, size.y, size.z);
    // liczba komórek tak dobrana, by zostało ok. `ratio` trójkątów
    // celujemy w ~`ratio` trójkątów: liczba komórek rośnie z liczbą trójkątów
    const cells = Math.max(5, Math.round(Math.cbrt(tris * ratio) * 4.2));
    const out = decimateGeometry(geo, cells);
    if (!out) return null;
    const outTris = out.index.count / 3;
    if (outTris >= tris * 0.62) return null; // zbyt mały zysk — szkoda pamięci
    out.userData = { sourceTris: tris, farTris: outTris, span };
    return out;
  } catch (err) {
    return null;
  }
}
