import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { farLod, midLod } from './decimate.js';

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
  // KayKit Halloween Bits — martwe drzewa i jesienne sosny (górskie zbocza)
  tree_dead_large: 'halloween/tree_dead_large.gltf',
  tree_dead_medium: 'halloween/tree_dead_medium.gltf',
  pine_autumn_large: 'halloween/tree_pine_orange_large.gltf',
  pine_gold_large: 'halloween/tree_pine_yellow_large.gltf',
};

export const NATURE_MODELS_EXTRA = {
  // Quaternius — Ultimate Nature Pack (CC0): drzewa, palmy, kaktusy, krzaki, skały
  q_pine_a: 'nature/q_pine_a.glb',
  q_pine_b: 'nature/q_pine_b.glb',
  q_pine_c: 'nature/q_pine_c.glb',
  q_pine_snow: 'nature/q_pine_snow.glb',
  q_birch_a: 'nature/q_birch_a.glb',
  q_birch_b: 'nature/q_birch_b.glb',
  q_birch_dead: 'nature/q_birch_dead.glb',
  q_oak_a: 'nature/q_oak_a.glb',
  q_oak_b: 'nature/q_oak_b.glb',
  q_oak_c: 'nature/q_oak_c.glb',
  q_oak_dead: 'nature/q_oak_dead.glb',
  q_willow_a: 'nature/q_willow_a.glb',
  q_palm_a: 'nature/q_palm_a.glb',
  q_palm_b: 'nature/q_palm_b.glb',
  q_cactus_a: 'nature/q_cactus_a.glb',
  q_cactus_b: 'nature/q_cactus_b.glb',
  q_cactus_c: 'nature/q_cactus_c.glb',
  q_cactus_flower: 'nature/q_cactus_flower.glb',
  q_bush_a: 'nature/q_bush_a.glb',
  q_bush_b: 'nature/q_bush_b.glb',
  q_bush_berries: 'nature/q_bush_berries.glb',
  q_bush_snow: 'nature/q_bush_snow.glb',
  q_rock_a: 'nature/q_rock_q_a.glb',
  q_rock_b: 'nature/q_rock_q_b.glb',
  q_rock_c: 'nature/q_rock_q_c.glb',
  q_rock_moss: 'nature/q_rock_moss.glb',
  q_rock_snow: 'nature/q_rock_snow.glb',
  q_grass: 'nature/q_grass_q.glb',
  q_grass_short: 'nature/q_grass_q_short.glb',
  q_flowers: 'nature/q_flowers_q.glb',
  q_log: 'nature/q_log_q.glb',
  q_stump: 'nature/q_stump_q.glb',
  // Quaternius — Crops Pack (CC0): pola uprawne wokół osad
  q_wheat: 'crops/q_wheat.glb',
  q_wheat_short: 'crops/q_wheat_short.glb',
  q_corn: 'crops/q_corn.glb',
  q_pumpkin: 'crops/q_pumpkin.glb',
  q_carrot: 'crops/q_carrot.glb',
  q_lettuce: 'crops/q_lettuce.glb',
  q_tomato: 'crops/q_tomato.glb',
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
  // KayKit Halloween Bits — cmentarz, kurhan, kapliczki
  grave_a: 'halloween/grave_A.gltf',
  grave_b: 'halloween/grave_B.gltf',
  gravemarker_a: 'halloween/gravemarker_A.gltf',
  gravemarker_b: 'halloween/gravemarker_B.gltf',
  crypt: 'halloween/crypt.gltf',
  coffin: 'halloween/coffin.gltf',
  coffin_decorated: 'halloween/coffin_decorated.gltf',
  shrine_ornate: 'halloween/shrine.gltf',
  shrine_candles: 'halloween/shrine_candles.gltf',
  skull: 'halloween/skull.gltf',
  bone_a: 'halloween/bone_A.gltf',
  ribcage: 'halloween/ribcage.gltf',
  lantern_standing: 'halloween/lantern_standing.gltf',
  post_lantern: 'halloween/post_lantern.gltf',
  fence_broken: 'halloween/fence_broken.gltf',
  // KayKit Furniture Bits — wnętrza i obejścia
  bed_single: 'furniture/bed_single_A.gltf',
  bed_double: 'furniture/bed_double_A.gltf',
  table_med: 'furniture/table_medium.gltf',
  chair_a: 'furniture/chair_A.gltf',
  stool: 'furniture/chair_stool.gltf',
  shelf: 'furniture/shelf_A_small.gltf',
  cabinet: 'furniture/cabinet_small.gltf',
  books: 'furniture/book_set.gltf',
  rug: 'furniture/rug_rectangle_A.gltf',
  lamp_table: 'furniture/lamp_table.gltf',
  couch: 'furniture/couch.gltf',
  painting: 'furniture/pictureframe_medium.gltf',
  // KayKit City Builder Bits
  bench: 'city/bench.gltf',
  streetlight: 'city/streetlight.gltf',
  watertower: 'city/watertower.gltf',
  big_box: 'city/box_A.gltf',
  bush_topiary: 'city/bush.gltf',
};

export const CHAR_MODELS = {
  // przeciwnicy (CC0): KayKit — szkielety, Quaternius — zwierzęta i robactwo
  skeleton: 'chars/Skeleton_Warrior.glb',
  skeleton_warrior: 'chars/enemies/kk_Skeleton_Warrior.glb',
  skeleton_minion: 'chars/enemies/kk_Skeleton_Minion.glb',
  skeleton_mage: 'chars/enemies/kk_Skeleton_Mage.glb',
  wolf: 'chars/enemies/q_Wolf.glb',
  spider: 'chars/enemies/q_Spider.glb',
  rat: 'chars/enemies/q_Rat.glb',
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
export function prepareInstancing(scene, { mergeAll = false } = {}) {
  scene.updateMatrixWorld(true);
  const groups = new Map();
  let canMergeAll = mergeAll;
  const collected = [];
  scene.traverse((o) => {
    if (!o.isMesh || !o.geometry) return;
    const material = o.material;
    // teksturowanych modeli nie da się scalić w jeden materiał — zostają grupy
    if (mergeAll && (material?.map || material?.alphaTest > 0)) canMergeAll = false;
    let g = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
    for (const key of Object.keys(g.attributes)) {
      if (!['position', 'normal', 'uv', 'color'].includes(key)) g.deleteAttribute(key);
    }
    if (!g.attributes.uv) {
      const n = g.attributes.position.count;
      g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(n * 2), 2));
    }
    if (!g.attributes.normal) g.computeVertexNormals();
    g.applyMatrix4(o.matrixWorld);
    if (canMergeAll) {
      // kolor materiału wchodzi w kolor wierzchołków — jeden materiał na model
      const n = g.attributes.position.count;
      const col = new Float32Array(n * 3);
      const existing = g.attributes.color;
      const mr = material?.color?.r ?? 1;
      const mg = material?.color?.g ?? 1;
      const mb = material?.color?.b ?? 1;
      for (let i = 0; i < n; i++) {
        const vr = existing ? existing.getX(i) : 1;
        const vg = existing ? existing.getY(i) : 1;
        const vb = existing ? existing.getZ(i) : 1;
        col[i * 3] = vr * mr;
        col[i * 3 + 1] = vg * mg;
        col[i * 3 + 2] = vb * mb;
      }
      g.setAttribute('color', new THREE.BufferAttribute(col, 3));
      collected.push(g);
    } else {
      const key = material.uuid;
      if (!groups.has(key)) groups.set(key, { material, geometries: [] });
      groups.get(key).geometries.push(g);
    }
  });

  if (canMergeAll && collected.length) {
    const material = new THREE.MeshLambertMaterial({ vertexColors: true });
    const merged = collected.length === 1 ? collected[0] : mergeGeometries(collected, false);
    if (merged) {
      if (collected.length > 1) for (const g of collected) g.dispose();
      merged.computeBoundingSphere();
      merged.computeBoundingBox();
      // dalszy plan: uproszczona bryła (patrz `decimate.js`)
      merged.userData = merged.userData ?? {};
      // Roślinność: bryła „przy graczu” też jest upraszczana (60% trójkątów —
      // tego nie widać), a dalsze kafle dostają wersję 28%.
      const mid = midLod(merged);
      return [{ geometry: mid ?? merged, material, farGeometry: farLod(merged) }];
    }
  }
  for (const g of collected) g.dispose();

  const parts = [];
  for (const { material, geometries } of groups.values()) {
    const merged = geometries.length === 1 ? geometries[0] : mergeGeometries(geometries, false);
    if (!merged) continue;
    if (geometries.length > 1) for (const g of geometries) g.dispose();
    merged.computeBoundingSphere();
    merged.computeBoundingBox();
    const mid = midLod(merged);
    parts.push({ geometry: mid ?? merged, material, farGeometry: farLod(merged) });
  }
  return parts;
}

class AssetLibrary {
  constructor() {
    this.models = {};
    this.nature = {};
    this.props = {};
    this.chars = {};
    // modele postaci (Quaternius, CC0) + biblioteka animacji — patrz chars/README.md
    this.custom = { hero: null, npcs: {} };
    this.animLibrary = null;
    this.failed = [];
    this.loaded = 0;
  }

  get ready() {
    return this.loaded > 0;
  }

  has(kind, key) {
    return !!this[kind]?.[key];
  }

  /**
   * Model postaci po nazwie pliku (np. `kk_Rogue`) — najpierw z listy
   * przeciwników, potem z obsady bohatera i mieszkańców. Dzięki temu ten sam
   * plik GLB nie jest pobierany dwa razy, gdy używa go i NPC, i bandyta.
   */
  charEntry(key) {
    if (!key) return null;
    if (this.chars[key]) return this.chars[key];
    const pool = [this.custom.hero, ...Object.values(this.custom.npcs ?? {})].filter(Boolean);
    const want = String(key).toLowerCase();
    for (const entry of pool) {
      const file = String(entry.file ?? '').toLowerCase();
      const base = file.split('/').pop()?.replace(/\.glb$/, '') ?? '';
      if (base === want || file.includes(`/${want}.glb`)) return entry;
    }
    return null;
  }
}

async function loadOne(loader, url) {
  const gltf = await loader.loadAsync(BASE + url);
  return gltf;
}

/**
 * Opcjonalne modele bohatera i mieszkańców.
 *
 * Wystarczy wrzucić pliki do `public/assets/models/chars/` i dopisać je w
 * `chars/models.json`:
 *   { "hero": "hero.glb", "npcs": { "eryn": "npc_eryn.glb" } }
 *
 * Brak manifestu albo brak pliku = gra zostaje przy sylwetkach proceduralnych.
 * @returns {Promise<void>}
 */
export async function loadCustomCharacters(loader, lib, base = BASE) {
  let manifest = null;
  try {
    const res = await fetch(`${base}chars/models.json`, { cache: 'no-cache' });
    if (res.ok) {
      const text = await res.text();
      if (text.trim().startsWith('{')) manifest = JSON.parse(text);
    }
  } catch (err) {
    return; // brak manifestu to nie błąd
  }
  if (!manifest) return;

  // biblioteka animacji (jeden plik dla wszystkich postaci)
  if (manifest.library) {
    try {
      const gltf = await loader.loadAsync(`${base}chars/${manifest.library}`);
      lib.animLibrary = { scene: gltf.scene, clips: gltf.animations ?? [] };
      lib.loaded += 1;
    } catch (err) {
      lib.failed.push(`chars/biblioteka animacji: ${err?.message ?? err}`);
    }
  }

  const jobs = [];
  if (manifest.hero) jobs.push(['hero', manifest.hero]);
  for (const [id, file] of Object.entries(manifest.npcs ?? {})) jobs.push([`npc:${id}`, file]);

  await Promise.all(jobs.map(async ([key, spec]) => {
    // wpis może być nazwą pliku albo obiektem { file, anims }
    const file = typeof spec === 'string' ? spec : spec?.file;
    const animsFile = typeof spec === 'object' ? spec?.anims : null;
    if (!file) return;
    try {
      const gltf = await loader.loadAsync(`${base}chars/${file}`);
      let animations = gltf.animations ?? [];
      // klipy w osobnym pliku (np. eksport „animations only” z Mixamo/Blendera)
      if (animsFile) {
        try {
          const anim = await loader.loadAsync(`${base}chars/${animsFile}`);
          animations = anim.animations ?? animations;
        } catch (err) {
          lib.failed.push(`chars/${key} (animacje): ${err?.message ?? err}`);
        }
      }
      const entry = {
        scene: gltf.scene,
        animations,
        height: measure(gltf.scene).height,
        file,
        library: lib.animLibrary,
        hideParts: (typeof spec === 'object' ? spec?.hide : null) ?? (key === 'hero' ? manifest.heroHide : null),
      };
      if (key === 'hero') lib.custom.hero = entry;
      else lib.custom.npcs[key.slice(4)] = entry;
      lib.loaded += 1;
    } catch (err) {
      lib.failed.push(`chars/${key}: ${err?.message ?? err}`);
    }
  }));
}


/**
 * Urealnienie roślinności z paczek CC0.
 *
 * Modele z paczek (KayKit, Quaternius) mają mocno nasycone, „plastikowe”
 * kolory liści — w lesie wyglądają jak figurki. Tutaj przygaszamy zieleń:
 * mniejsza saturacja, ciemniejsza jasność, lekkie przesunięcie w stronę oliwki.
 * Działa tylko na materiałach dominująco zielonych, więc kora, kamienie i
 * kwiaty zostają nietknięte.
 */
export function naturalizeFoliage(root, { saturation = 0.55, darken = 0.82, hueShift = 0.02 } = {}) {
  if (!root) return root;
  const seen = new Set();
  const hsl = { h: 0, s: 0, l: 0 };
  root.traverse?.((obj) => {
    if (!obj.material) return;
    const list = Array.isArray(obj.material) ? obj.material : [obj.material];
    for (const m of list) {
      if (!m || seen.has(m) || !m.color) continue;
      seen.add(m);
      const c = m.color;
      const max = Math.max(c.r, c.g, c.b);
      const min = Math.min(c.r, c.g, c.b);
      // tylko zieleń (liście, trawa, igliwie)
      if (!(c.g >= max - 1e-4) || c.g <= min + 1e-4) continue;
      if (c.g < 0.05) continue;
      c.getHSL(hsl);
      const h = (hsl.h + hueShift) % 1;
      c.setHSL(h, Math.min(0.6, hsl.s * saturation), Math.max(0.06, hsl.l * darken));
      m.needsUpdate = true;
    }
  });
  addFoliageTonality(root);
  return root;
}

/**
 * Liście bez UV dostają tonalną wariację w kolorach wierzchołków.
 *
 * Modele z paczek nie mają ani tekstur, ani map UV — liście to jedna płaska
 * plama koloru, która z bliska wygląda jak plastik. Wariacja liczona z pozycji
 * wierzchołka (plus przyciemnienie od spodu) daje wrażenie gęstej korony.
 */
function addFoliageTonality(root) {
  root.traverse?.((obj) => {
    if (!obj.isMesh || !obj.geometry || !obj.material) return;
    const list = Array.isArray(obj.material) ? obj.material : [obj.material];
    const green = list.some((m) => m?.color && m.color.g > m.color.r + 0.01 && m.color.g > m.color.b + 0.01);
    if (!green) return;
    const geo = obj.geometry;
    if (!geo.attributes.position || geo.attributes.color) return;
    const pos = geo.attributes.position;
    const colors = new Float32Array(pos.count * 3);
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      // tani, deterministyczny „szum” z pozycji — bez tablic i losowania
      const n = Math.sin(x * 3.7 + y * 2.3) * Math.cos(z * 4.1 - y * 1.7);
      const shade = 0.78 + n * 0.16 + Math.max(-0.1, Math.min(0.12, y * 0.02));
      colors[i * 3] = shade;
      colors[i * 3 + 1] = shade * (0.98 + n * 0.04);
      colors[i * 3 + 2] = shade * (0.94 + n * 0.05);
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    for (const m of list) {
      if (!m) continue;
      m.vertexColors = true;
      m.metalness = 0;
      m.roughness = Math.max(0.85, m.roughness ?? 1);
      m.needsUpdate = true;
    }
  });
}
/**
 * Dociąga wszystkie modele. Nigdy nie rzuca błędem — brak pliku to tylko wpis
 * na liście `failed`.
 */
export async function loadAssets(onProgress) {
  const lib = new AssetLibrary();
  const loader = new GLTFLoader();
  const jobs = [];
  const total = Object.keys(NATURE_MODELS).length + Object.keys(NATURE_MODELS_EXTRA).length + Object.keys(PROP_MODELS).length + Object.keys(CHAR_MODELS).length;
  let done = 0;
  const tick = () => {
    done += 1;
    onProgress?.(done / total);
  };

  const natureAll = { ...NATURE_MODELS, ...NATURE_MODELS_EXTRA };
  for (const [key, url] of Object.entries(natureAll)) {
    jobs.push(loadOne(loader, url).then((gltf) => {
      const scene = naturalizeFoliage(gltf.scene);
      const info = measure(scene);
      lib.nature[key] = {
        parts: prepareInstancing(scene, { mergeAll: true }),
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

  // modele od człowieka ładują się równolegle z paczką CC0
  jobs.push(loadCustomCharacters(loader, lib));

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
  finalize(lib, cellSize = 1600) {
    let meshes = 0;
    this.cells = [];
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
          // podmiana geometrii przy przejściu na dalszy plan
          if (part.farGeometry) {
            mesh.userData.nearGeometry = part.geometry;
            mesh.userData.farGeometry = part.farGeometry;
          }
          for (let i = 0; i < entries.length; i++) {
            mesh.setMatrixAt(i, entries[i].matrix);
            if (anyColor) mesh.setColorAt(i, entries[i].color ?? white);
          }
          mesh.instanceMatrix.needsUpdate = true;
          if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
          mesh.computeBoundingSphere();
          mesh.frustumCulled = true;
          mesh.userData.cellId = cellId;
          this.group.add(mesh);
          meshes += 1;
          // środek kafla — po nim wyłączamy całe kafle poza zasięgiem mgły
          const cell = this.cells.find((c) => c.id === cellId);
          if (!cell) this.cells.push({ id: cellId, x: 0, z: 0, meshes: [mesh], count: 1, sumX: 0, sumZ: 0 });
          else {
            cell.meshes.push(mesh);
            cell.sumX += entries[0].matrix.elements[12];
            cell.sumZ += entries[0].matrix.elements[14];
            cell.count += 1;
          }
        }
      }
    }
    this.buckets.clear();
    for (const cell of this.cells) {
      const [cx, cz] = cell.id.split(':').map(Number);
      cell.x = (cx + 0.5) * cellSize;
      cell.z = (cz + 0.5) * cellSize;
      cell.radius = cellSize * 0.75;
    }
    return meshes;
  }

  /**
   * Ukrywa kafle instancji dalej niż `far` od kamery. Mgła i tak zamalowuje
   * wszystko powyżej ~1,2 km, a frustum trójki przepuszcza obiekty z boku —
   * to realnie zdejmuje dziesiątki procent trójkątów z klatki.
   */
  cullByDistance(camX, camZ, far = 1450, lodDistance = 170) {
    if (!this.cells) return 0;
    let hidden = 0;
    for (const cell of this.cells) {
      const d = Math.hypot(cell.x - camX, cell.z - camZ) - (cell.radius ?? 0);
      const visible = d < far;
      const useFar = d > lodDistance;
      for (const m of cell.meshes) {
        if (m.visible !== visible) m.visible = visible;
        // Dalszy plan rysujemy uproszczoną bryłą — z 300 m i tak widać tylko
        // sylwetkę, a to zdejmuje większość trójkątów z klatki.
        const near = m.userData?.nearGeometry;
        const farGeo = m.userData?.farGeometry;
        if (near && farGeo) {
          const want = useFar ? farGeo : near;
          if (m.geometry !== want) m.geometry = want;
        }
      }
      if (!visible) hidden += cell.count;
    }
    return hidden;
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
