import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { WORLD_RADIUS, CHUNK_SIZE } from './terrain.js';

// Łączy wiele prostych brył w jedną siatkę z kolorami wierzchołków.
// Obiekty trafiają do osobnych koszy per chunk, więc silnik może je odrzucać
// poza kadrem (frustum culling) i nie rysuje całej mapy na raz.

const tmpColor = new THREE.Color();

function prepare(geo, color) {
  let g = geo.index ? geo.toNonIndexed() : geo.clone();
  for (const key of Object.keys(g.attributes)) {
    // UV nie są potrzebne — batcher rysuje wszystko kolorami wierzchołków,
    // a każde odrzucone 8 bajtów na wierzchołek to kilkadziesiąt MB mniej.
    if (!['position', 'normal'].includes(key)) g.deleteAttribute(key);
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
  const material = new THREE.MeshLambertMaterial({ vertexColors: true });
  const mesh = new THREE.Mesh(merged, material);
  mesh.castShadow = castShadow;
  mesh.receiveShadow = true;
  mesh.matrixAutoUpdate = false;
  mesh.updateMatrix();
  return mesh;
}

const propMaterial = new THREE.MeshLambertMaterial({ vertexColors: true });

export class PropBatcher {
  constructor(scene) {
    this.scene = scene;
    this.buckets = new Map();
    this.meshes = [];
    this.totalParts = 0;
    this._matrix = new THREE.Matrix4();
  }

  key(x, z) {
    const cx = Math.floor((x + WORLD_RADIUS) / CHUNK_SIZE);
    const cz = Math.floor((z + WORLD_RADIUS) / CHUNK_SIZE);
    return `${cx},${cz}`;
  }

  bucket(x, z) {
    const k = this.key(x, z);
    let b = this.buckets.get(k);
    if (!b) {
      b = [];
      this.buckets.set(k, b);
    }
    return b;
  }

  /** Dodaje grupę (np. dom, drzewo) z jej własnymi kolorami. */
  add(group, x, y, z, rotY = 0, scale = 1) {
    group.position.set(x, y, z);
    group.rotation.set(0, rotY, 0);
    if (scale !== 1) group.scale.setScalar(scale);
    const geo = flattenGroup(group);
    if (!geo) return;
    this.bucket(x, z).push(geo);
    this.totalParts += 1;
    // zwalniamy pamięć oryginałów
    group.traverse((o) => {
      if (o.isMesh) o.geometry?.dispose();
    });
  }

  /** Dodaje gotową geometrię (np. wariant drzewa) z transformacją. */
  addGeometry(geo, x, y, z, rotY = 0, scale = 1) {
    const g = geo.clone();
    this._matrix.makeRotationY(rotY);
    this._matrix.scale(new THREE.Vector3(scale, scale, scale));
    this._matrix.setPosition(x, y, z);
    g.applyMatrix4(this._matrix);
    this.bucket(x, z).push(g);
    this.totalParts += 1;
  }

  finalize(castShadow = true) {
    for (const [key, parts] of this.buckets) {
      if (!parts.length) continue;
      const merged = parts.length === 1 ? parts[0] : mergeGeometries(parts, false);
      if (parts.length > 1) for (const p of parts) p.dispose();
      const mesh = new THREE.Mesh(merged, propMaterial);
      mesh.castShadow = castShadow;
      mesh.receiveShadow = true;
      mesh.matrixAutoUpdate = false;
      mesh.updateMatrix();
      mesh.name = `props-${key}`;
      mesh.geometry.computeBoundingSphere();
      this.scene.add(mesh);
      this.meshes.push(mesh);
    }
    this.buckets.clear();
  }

  dispose() {
    for (const m of this.meshes) {
      this.scene.remove(m);
      m.geometry.dispose();
    }
    this.meshes.length = 0;
  }
}
