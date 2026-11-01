// ---------------------------------------------------------------------------
// Scalanie siatek postaci.
//
// Modele Quaternius (i większość darmowych paczek) składają się z kilkunastu
// osobnych siatek: tułów, głowa, włosy, oczy, buty, plecak... Wszystkie dzielą
// jeden szkielet i różnią się tylko kolorem materiału. Silnik rysował każdą
// z osobna — piętnaście wywołań rysowania na jedną postać, a przy graczu,
// mieszkańcach i wrogach robiło się z tego kilkaset.
//
// Tutaj zamieniamy „kolor materiału” na kolor wierzchołka i sklejamy wszystko
// w jedną siatkę. Efekt: jedna postać = jedno wywołanie rysowania, ten sam
// wygląd, a przy okazji jedno miejsce, w którym można dołożyć fakturę tkaniny.
// ---------------------------------------------------------------------------
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const KEEP_ATTRS = ['position', 'normal', 'uv', 'skinIndex', 'skinWeight', 'color'];

/**
 * Przepisuje atrybut do zwykłej tablicy.
 *
 * GLTFLoader potrafi zwrócić atrybuty przeplatane (`InterleavedBufferAttribute`).
 * Ich `clone()` dzieli bufor z innymi, więc po sklejeniu geometrii wychodziły
 * śmieci (postać miała 2,6 m i geometryczną bryłę 2 cm). Tutaj zawsze robimy
 * własną, gęstą tablicę.
 */
function plainAttribute(attr) {
  const { itemSize, count, normalized } = attr;
  const out = new Float32Array(count * itemSize);
  for (let i = 0; i < count; i++) {
    out[i * itemSize] = attr.getX(i);
    if (itemSize > 1) out[i * itemSize + 1] = attr.getY(i);
    if (itemSize > 2) out[i * itemSize + 2] = attr.getZ(i);
    if (itemSize > 3) out[i * itemSize + 3] = attr.getW(i);
  }
  return new THREE.BufferAttribute(out, itemSize, normalized);
}

/** Czy siatkę można bezpiecznie scalić (kolor zamiast tekstury). */
function mergeable(mesh) {
  if (!mesh.isSkinnedMesh || !mesh.geometry) return false;
  if (mesh.visible === false) return false; // części ukryte (np. plecak bohatera)
  const geo = mesh.geometry;
  if (!geo.attributes.position || !geo.attributes.skinIndex || !geo.attributes.skinWeight) return false;
  if (geo.morphAttributes && Object.keys(geo.morphAttributes).length) return false;
  const mat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
  if (!mat || mat.transparent || mat.alphaTest > 0) return false;
  return true;
}

/**
 * Scala siatki postaci w jedną (kolor materiału → kolor wierzchołka).
 * @param {THREE.Object3D} root model postaci (po klonowaniu!)
 * @returns {{merged:boolean, before:number, after:number}}
 */
export function mergeSkinnedParts(root) {
  if (!root) return { merged: false, before: 0, after: 0 };
  const meshes = [];
  root.traverse((o) => {
    if (o.isMesh) meshes.push(o);
  });
  const before = meshes.length;
  const candidates = meshes.filter(mergeable);
  if (candidates.length < 2) return { merged: false, before, after: before };

  // Grupujemy po teksturze: części z jedną teksturą (atlas) można skleić,
  // części bez tekstury traktujemy jako osobną grupę („mapa = brak”).
  const groups = new Map();
  for (const mesh of candidates) {
    const mat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
    const key = mat.map ? mat.map.uuid : 'brak';
    let g = groups.get(key);
    if (!g) {
      g = { map: mat.map ?? null, meshes: [], skeleton: mesh.skeleton };
      groups.set(key, g);
    }
    g.meshes.push(mesh);
  }

  root.updateMatrixWorld(true);
  const sameBones = (a, b) => a && b && a.bones.length === b.bones.length
    && a.bones.every((bone, i) => bone === b.bones[i]);

  let mergedCount = 0;
  let removedCount = 0;
  for (const group of groups.values()) {
    if (group.meshes.length < 2) continue;
    const skeleton = group.meshes[0].skeleton;
    if (!skeleton || !group.meshes.every((m) => sameBones(m.skeleton, skeleton))) continue;

    const baseMesh = group.meshes[0];
    const baseInvWorld = new THREE.Matrix4().copy(baseMesh.matrixWorld).invert();
    const baseInvBind = new THREE.Matrix4().copy(baseMesh.bindMatrix).invert();
    const parts = [];
    const color = new THREE.Color();
    for (const mesh of group.meshes) {
      const src = mesh.geometry;
      const geo = new THREE.BufferGeometry();
      for (const name of KEEP_ATTRS) {
        const attr = src.attributes[name];
        if (attr) {
          geo.setAttribute(name, plainAttribute(attr));
        } else if (name === 'uv') {
          // brak UV zdarza się w prostych bryłach — dopełniamy zerami
          geo.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(src.attributes.position.count * 2), 2));
        }
      }
      if (src.index) geo.setIndex(new THREE.BufferAttribute(src.index.array.slice(), 1));
      // Model Quaternius ma wierzchołki w milimetrowej skali, a powiększenie
      // siedzi na węźle siatki — każdy fragment przenosimy do wspólnej
      // „przestrzeni bindowania” pierwszej siatki:
      //   p' = B_base⁻¹ · (base.matrixWorld⁻¹ · mesh.matrixWorld) · B_mesh · p
      const xform = new THREE.Matrix4()
        .multiplyMatrices(baseInvBind, baseInvWorld)
        .multiply(mesh.matrixWorld)
        .multiply(mesh.bindMatrix);
      geo.applyMatrix4(xform);
      const mat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
      color.copy(mat.color ?? new THREE.Color(0xffffff));
      // faktura tkaniny ma średnią < 1 — podbijamy kolor, żeby ubrania nie pociemniały
      if (!group.map) color.multiplyScalar(1 / clothMean);
      const count = geo.attributes.position.count;
      const cols = new Float32Array(count * 3);
      const srcCol = src.attributes.color;
      for (let i = 0; i < count; i++) {
        cols[i * 3] = color.r * (srcCol ? srcCol.getX(i) : 1);
        cols[i * 3 + 1] = color.g * (srcCol ? srcCol.getY(i) : 1);
        cols[i * 3 + 2] = color.b * (srcCol ? srcCol.getZ(i) : 1);
      }
      geo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
      parts.push(geo);
    }

    const merged = mergeGeometries(parts, false);
    for (const p of parts) p.dispose();
    if (!merged) continue;

    const material = group.map
      ? new THREE.MeshStandardMaterial({ vertexColors: true, map: group.map, metalness: 0, roughness: 0.8 })
      : new THREE.MeshStandardMaterial({
        vertexColors: true,
        metalness: 0,
        roughness: 0.72,
        // delikatna faktura tkaniny/skóry — bez niej postać to plama koloru
        map: sharedClothTexture(),
      });
    material.name = group.map ? 'postac-scalona-atlas' : 'postac-scalona';
    const mesh = new THREE.SkinnedMesh(merged, material);
    mesh.name = 'postac';
    mesh.bind(skeleton, baseMesh.bindMatrix);
    mesh.bindMode = baseMesh.bindMode;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.frustumCulled = false;
    mesh.position.copy(baseMesh.position);
    mesh.quaternion.copy(baseMesh.quaternion);
    mesh.scale.copy(baseMesh.scale);
    const parent = baseMesh.parent ?? root;
    parent.add(mesh);
    for (const m of group.meshes) m.parent?.remove(m);
    removedCount += group.meshes.length;
    mergedCount += 1;
  }

  // ukryte części też usuwamy z drzewa — nie mają czego rysować
  for (const m of meshes) {
    if (m.visible === false) m.parent?.remove(m);
  }

  return {
    merged: mergedCount > 0,
    before,
    after: before - removedCount + mergedCount,
    mergedCount,
  };
}

let clothTex = null;
let clothMean = 0.75;

/**
 * Kafelkowa faktura tkaniny: splot + drobne przetarcia.
 * Mnożnik wokół 1.0 (średnia jasność ~0.5), żeby nie zmieniać koloru ubrań.
 */
export function sharedClothTexture(size = 128) {
  if (clothTex) return clothTex;
  const data = new Uint8Array(size * size * 4);
  const hash = (x, y) => {
    let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263);
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  };
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      // splot: przeplatanie wątku i osnowy
      const weave = (Math.sin(x * 1.6) * 0.5 + 0.5) * (Math.sin(y * 1.6) * 0.5 + 0.5);
      const grain = hash(x, y) * 0.35 + hash(x + 7, y + 13) * 0.25;
      // przetarcia: rzadkie jaśniejsze smugi
      const wear = hash(x >> 3, y >> 4) > 0.93 ? 0.22 : 0;
      const v = 0.72 + (weave - 0.25) * 0.12 + (grain - 0.3) * 0.14 + wear * 0.5;
      const b = Math.max(0, Math.min(255, Math.round(v * 255)));
      const i = (y * size + x) * 4;
      data[i] = b;
      data[i + 1] = b;
      data[i + 2] = b;
      data[i + 3] = 255;
    }
  }
  let sum = 0;
  for (let i = 0; i < size * size; i++) sum += data[i * 4] / 255;
  clothMean = sum / (size * size);
  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.generateMipmaps = true;
  tex.colorSpace = THREE.NoColorSpace; // dane liniowe — mnożnik szczegółu
  tex.repeat.set(3, 3);
  tex.needsUpdate = true;
  clothTex = tex;
  return tex;
}
