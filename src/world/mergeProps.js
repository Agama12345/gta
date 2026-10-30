import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

// Łączy wiele prostych brył w jedną siatkę z kolorami wierzchołków.
// Dzięki temu setki drzew, skał i traw to zaledwie kilka wywołań rysowania.

const tmpColor = new THREE.Color();

function prepare(geo, color) {
  let g = geo.index ? geo.toNonIndexed() : geo.clone();
  for (const key of Object.keys(g.attributes)) {
    if (!['position', 'normal', 'uv'].includes(key)) g.deleteAttribute(key);
  }
  if (!g.attributes.uv) {
    const n = g.attributes.position.count;
    g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(n * 2), 2));
  }
  if (!g.attributes.normal) g.computeVertexNormals();
  const count = g.attributes.position.count;
  const colors = new Float32Array(count * 3);
  tmpColor.set(color);
  for (let i = 0; i < count; i++) {
    colors[i * 3] = tmpColor.r;
    colors[i * 3 + 1] = tmpColor.g;
    colors[i * 3 + 2] = tmpColor.b;
  }
  g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return g;
}

/**
 * Zbiera wszystkie siatki z grupy (po transformacjach) i skleja je.
 * Zwraca BufferGeometry gotową do jednego Mesha.
 */
export function flattenGroup(group) {
  const parts = [];
  group.updateMatrixWorld(true);
  group.traverse((o) => {
    if (!o.isMesh || !o.geometry) return;
    const color = o.material?.color ? o.material.color.getHexString() : '888888';
    const g = prepare(o.geometry, '#' + color);
    g.applyMatrix4(o.matrixWorld);
    parts.push(g);
  });
  if (parts.length === 0) return null;
  const merged = mergeGeometries(parts, false);
  for (const p of parts) p.dispose();
  return merged;
}

export function collectInto(target, group) {
  const geo = flattenGroup(group);
  if (geo) target.push(geo);
  return target;
}

export function buildStaticMesh(geometries, { castShadow = true } = {}) {
  if (!geometries.length) return null;
  const merged = geometries.length === 1 ? geometries[0] : mergeGeometries(geometries, false);
  if (geometries.length > 1) for (const g of geometries) g.dispose();
  const material = new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: false });
  const mesh = new THREE.Mesh(merged, material);
  mesh.castShadow = castShadow;
  mesh.receiveShadow = true;
  mesh.matrixAutoUpdate = false;
  mesh.updateMatrix();
  return mesh;
}
