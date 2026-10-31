// ---------------------------------------------------------------------------
// Broń i drobnica z paczki KayKit „Adventurers” (CC0).
//
// Modele są prawdziwe (miecze, topory, sztylety, kusze, kostury, tarcze, kufle),
// ale każdy ma własne osie i środek w połowie rękojeści — po prostu podpięty do
// kości dłoni wylatywałby w bok albo rósł do dwóch metrów. Tutaj:
//
//   * skalujemy model do żądanej długości w metrach,
//   * przesuwamy go tak, żeby **chwyt** (a nie środek bryły) siedział w dłoni,
//   * jeśli modelu nie ma (brak pliku), zwracamy `null` i gracz zostaje przy
//     broni proceduralnej — brak assetu nigdy nie może wysypać gry.
// ---------------------------------------------------------------------------
import * as THREE from 'three';

/**
 * @param {object} assets biblioteka modeli (`game.assets`)
 * @param {string} key klucz z `PROP_MODELS` (np. `sword`, `shield`, `mug`)
 * @param {object} opts
 * @param {number} opts.length docelowa długość w metrach (najdłuższy wymiar)
 * @param {number} opts.grip od 0 (dół) do 1 (góra) — gdzie wypada chwyt
 * @param {number} opts.yaw obrót wokół osi Y modelu (radiany)
 */
export function makePropMesh(assets, key, { length = 1, grip = 0.22, yaw = 0, offset = null } = {}) {
  const entry = assets?.props?.[key];
  if (!entry?.scene) return null;
  const holder = new THREE.Group();
  holder.name = `prop-${key}`;
  const inner = entry.scene.clone(true);
  // model ma własną, „naturalną” długość — dopasowujemy do `length`
  const h = Math.max(0.001, entry.height ?? 1);
  const k = length / h;
  inner.scale.setScalar(k);
  inner.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(inner);
  // chwyt = punkt `grip` pomiędzy dołem a górą bryły; przesuwamy tak,
  // by znalazł się w początku układu współrzędnych (czyli w dłoni)
  const gripY = box.min.y + (box.max.y - box.min.y) * grip;
  inner.position.y -= gripY;
  inner.position.x -= (box.min.x + box.max.x) / 2;
  inner.position.z -= (box.min.z + box.max.z) / 2;
  if (yaw) inner.rotation.y = yaw;
  // drobne dociągnięcie względem kości (np. tarcza wisi na przedramieniu,
  // a nie w samej dłoni)
  if (offset) inner.position.add(new THREE.Vector3(offset[0] ?? 0, offset[1] ?? 0, offset[2] ?? 0));
  holder.add(inner);
  holder.traverse((o) => {
    if (!o.isMesh) return;
    o.castShadow = true;
    o.receiveShadow = true;
    // drobnica nie potrzebuje własnych kopii materiału — dzieli je z biblioteką
    if (o.material) o.material.side = THREE.FrontSide;
  });
  return holder;
}

/** Miecz jednoręczny (~1,05 m) trzymany za rękojeść. */
export function swordMesh(assets, colorHint = null) {
  const mesh = makePropMesh(assets, 'sword', { length: 1.05, grip: 0.2 });
  if (mesh && colorHint) tint(mesh, colorHint);
  return mesh;
}

/** Tarcza (~0,75 m) trzymana za imak pośrodku. */
export function shieldMesh(assets) {
  // środek tarczy na wysokości przedramienia, kilka centymetrów przed ciałem
  return makePropMesh(assets, 'shield', { length: 0.75, grip: 0.5, offset: [0, 0.2, 0.06] });
}

/** Topór, kusza, kostur — dla przeciwników i mieszkańców. */
export function weaponByKind(assets, kind) {
  switch (kind) {
    case 'axe2':
      return makePropMesh(assets, 'axe2', { length: 1.35, grip: 0.18 });
    case 'axe':
      return makePropMesh(assets, 'axe', { length: 0.95, grip: 0.2 });
    case 'dagger':
      return makePropMesh(assets, 'dagger', { length: 0.42, grip: 0.25 });
    case 'crossbow':
      return makePropMesh(assets, 'crossbow', { length: 0.7, grip: 0.5, yaw: Math.PI / 2 });
    case 'staff':
      return makePropMesh(assets, 'staff', { length: 1.9, grip: 0.32 });
    case 'sword2':
      return makePropMesh(assets, 'sword2', { length: 1.45, grip: 0.16 });
    case 'sword':
    default:
      return swordMesh(assets);
  }
}

/** Delikatne przyciemnienie/rozjaśnienie całego modelu (klony materiałów). */
function tint(root, color) {
  const c = new THREE.Color(color);
  const cache = new Map();
  root.traverse((o) => {
    if (!o.isMesh || !o.material) return;
    let mat = cache.get(o.material);
    if (!mat) {
      mat = o.material.clone();
      if (mat.color) mat.color.multiply(c);
      cache.set(o.material, mat);
    }
    o.material = mat;
  });
}
