import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

// ---------------------------------------------------------------------------
// ZASOBY ZEWNĘTRZNE (darmowe modele CC0)
//
// Modele leżą w public/assets/models i są dociągane przy starcie gry.
// Pochodzą z darmowych paczek CC0 (KayKit — Kay Lousberg), patrz LICENSE.txt.
// Jeśli plików nie ma (np. ktoś podmieni paczkę), gra po prostu zostaje przy
// modelach proceduralnych — nic się nie wysypuje.
// ---------------------------------------------------------------------------
const BASE = 'assets/models/';

export const NATURE_MODELS = {
  tree_a: 'nature/tree_single_A.gltf',
  tree_b: 'nature/tree_single_B.gltf',
  tree_c: 'nature/trees_B_large.gltf',
  tree_small: 'nature/trees_A_small.gltf',
  tree_medium: 'nature/trees_B_medium.gltf',
  trees_cluster: 'nature/trees_A_large.gltf',
  rock_a: 'nature/rock_single_A.gltf',
  rock_b: 'nature/rock_single_B.gltf',
  rock_c: 'nature/rock_single_C.gltf',
  rock_d: 'nature/rock_single_D.gltf',
  rock_e: 'nature/rock_single_E.gltf',
  lily: 'nature/waterlily_A.gltf',
  waterplant: 'nature/waterplant_A.gltf',
};

export const PROP_MODELS = {
  barrel: 'props/barrel_large.gltf.glb',
  crate: 'props/box_large.gltf.glb',
  chest: 'props/chest.glb',
  keg: 'props/keg.gltf.glb',
  torch: 'props/torch_lit.gltf.glb',
  table: 'props/table_long.gltf.glb',
  chair: 'props/chair.gltf.glb',
  crates: 'props/crates_stacked.gltf.glb',
};

export const CHAR_MODELS = {
  skeleton: 'chars/Skeleton_Warrior.glb',
};

/** Wysokość bryły modelu (bez skalowania). */
function measure(obj) {
  const box = new THREE.Box3().setFromObject(obj);
  const size = new THREE.Vector3();
  box.getSize(size);
  return { height: Math.max(0.001, size.y), width: Math.max(size.x, size.z), box };
}

/**
 * Skleja siatki modelu w jeden zestaw geometrii na materiał (zachowuje tekstury).
 * Wynik nadaje się do InstancedMesh — tysiące drzew rysowanych jednym wywołaniem.
 */
export function prepareInstancing(scene) {
  scene.updateMatrixWorld(true);
  const groups = new Map();
  scene.traverse((o) => {
    if (!o.isMesh || !o.geometry) return;
    const material = o.material;
    let g = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
    for (const key of Object.keys(g.attributes)) {
      if (!['position', 'normal', 'uv'].includes(key)) g.deleteAttribute(key);
    }
    if (!g.attributes.uv) {
      const n = g.attributes.position.count;
      g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(n * 2), 2));
    }
    if (!g.attributes.normal) g.computeVertexNormals();
    g.applyMatrix4(o.matrixWorld);
    const key = material.uuid;
    if (!groups.has(key)) groups.set(key, { material, geometries: [] });
    groups.get(key).geometries.push(g);
  });

  const parts = [];
  for (const { material, geometries } of groups.values()) {
    const merged = geometries.length === 1 ? geometries[0] : mergeGeometries(geometries, false);
    if (!merged) continue;
    if (geometries.length > 1) for (const g of geometries) g.dispose();
    merged.computeBoundingSphere();
    merged.computeBoundingBox();
    parts.push({ geometry: merged, material });
  }
  return parts;
}

class AssetLibrary {
  constructor() {
    this.models = {};
    this.nature = {};
    this.props = {};
    this.chars = {};
    this.failed = [];
    this.loaded = 0;
  }

  get ready() {
    return this.loaded > 0;
  }

  has(kind, key) {
    return !!this[kind]?.[key];
  }
}

async function loadOne(loader, url) {
  const gltf = await loader.loadAsync(BASE + url);
  return gltf;
}

/**
 * Dociąga wszystkie modele. Nigdy nie rzuca błędem — brak pliku to tylko wpis
 * na liście `failed`.
 */
export async function loadAssets(onProgress) {
  const lib = new AssetLibrary();
  const loader = new GLTFLoader();
  const jobs = [];
  const total = Object.keys(NATURE_MODELS).length + Object.keys(PROP_MODELS).length + Object.keys(CHAR_MODELS).length;
  let done = 0;
  const tick = () => {
    done += 1;
    onProgress?.(done / total);
  };

  for (const [key, url] of Object.entries(NATURE_MODELS)) {
    jobs.push(loadOne(loader, url).then((gltf) => {
      const scene = gltf.scene;
      const info = measure(scene);
      lib.nature[key] = {
        parts: prepareInstancing(scene),
        height: info.height,
        width: info.width,
        raw: scene,
      };
      lib.loaded += 1;
    }).catch((err) => { lib.failed.push(`nature/${key}: ${err?.message ?? err}`); }).finally(tick));
  }

  for (const [key, url] of Object.entries(PROP_MODELS)) {
    jobs.push(loadOne(loader, url).then((gltf) => {
      const scene = gltf.scene;
      const info = measure(scene);
      lib.props[key] = { scene, height: info.height, width: info.width };
      lib.loaded += 1;
    }).catch((err) => { lib.failed.push(`props/${key}: ${err?.message ?? err}`); }).finally(tick));
  }

  for (const [key, url] of Object.entries(CHAR_MODELS)) {
    jobs.push(loadOne(loader, url).then((gltf) => {
      const info = measure(gltf.scene);
      lib.chars[key] = {
        scene: gltf.scene,
        animations: gltf.animations ?? [],
        height: info.height,
      };
      lib.loaded += 1;
    }).catch((err) => { lib.failed.push(`chars/${key}: ${err?.message ?? err}`); }).finally(tick));
  }

  await Promise.all(jobs);
  if (lib.failed.length) console.warn('Nie wszystkie modele się wczytały:', lib.failed);
  return lib;
}

/**
 * Zbiera transformacje i tworzy na końcu po jednym InstancedMesh na materiał.
 * Dzięki temu 3 tys. drzew to kilka wywołań rysowania, a nie 3 tys.
 */
export class ModelScatter {
  constructor(group) {
    this.group = group;
    this.buckets = new Map();
    this._matrix = new THREE.Matrix4();
    this._quat = new THREE.Quaternion();
    this._pos = new THREE.Vector3();
    this._scale = new THREE.Vector3();
  }

  add(key, lib, { x, y, z, rotY = 0, scale = 1, tilt = 0, color = null }) {
    const model = lib.nature[key];
    if (!model) return false;
    const list = this.buckets.get(key) ?? [];
    this._quat.setFromEuler(new THREE.Euler(tilt * 0.4, rotY, tilt * 0.6));
    this._pos.set(x, y, z);
    this._scale.setScalar(scale);
    this._matrix.compose(this._pos, this._quat, this._scale);
    list.push({ matrix: this._matrix.clone(), color });
    this.buckets.set(key, list);
    return true;
  }

  /**
   * Tworzy InstancedMesh z podziałem na kafle świata (domyślnie 1 km). Dzięki
   * temu silnik odrzuca całe kafle poza kamerą — kilka tysięcy drzew nie musi
   * być rysowane, gdy patrzysz w drugą stronę.
   */
  finalize(lib, cellSize = 1000) {
    let meshes = 0;
    const white = new THREE.Color(0xffffff);
    for (const [key, list] of this.buckets) {
      const model = lib.nature[key];
      if (!model || !list.length) continue;
      const cells = new Map();
      for (const entry of list) {
        const cx = Math.floor(entry.matrix.elements[12] / cellSize);
        const cz = Math.floor(entry.matrix.elements[14] / cellSize);
        const id = `${cx}:${cz}`;
        if (!cells.has(id)) cells.set(id, []);
        cells.get(id).push(entry);
      }
      for (const [cellId, entries] of cells) {
        const anyColor = entries.some((e) => e.color);
        for (const part of model.parts) {
          const mesh = new THREE.InstancedMesh(part.geometry, part.material, entries.length);
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          mesh.name = `inst-${key}-${cellId}`;
          for (let i = 0; i < entries.length; i++) {
            mesh.setMatrixAt(i, entries[i].matrix);
            if (anyColor) mesh.setColorAt(i, entries[i].color ?? white);
          }
          mesh.instanceMatrix.needsUpdate = true;
          if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
          mesh.computeBoundingSphere();
          mesh.frustumCulled = true;
          this.group.add(mesh);
          meshes += 1;
        }
      }
    }
    this.buckets.clear();
    return meshes;
  }
}

/** Klon modelu (z teksturami) przeskalowany do zadanej wysokości w metrach. */
export function placeProp(lib, key, { x, y, z, rotY = 0, targetHeight = null }) {
  const entry = lib.props[key];
  if (!entry) return null;
  const obj = entry.scene.clone(true);
  const scale = targetHeight ? targetHeight / entry.height : 1;
  obj.scale.setScalar(scale);
  obj.position.set(x, y, z);
  obj.rotation.y = rotY;
  obj.traverse((o) => {
    if (o.isMesh) {
      o.castShadow = true;
      o.receiveShadow = true;
    }
  });
  return obj;
}
