import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Przenoszenie animacji między szkieletami (retargeting).
//
// Biblioteka animacji (Quaternius Universal Animation Library, CC0) jest
// zrobiona na innym szkielecie niż modele postaci — inne nazwy kości, inna
// postawa spoczynkowa. Zamiast zgadywać nazwy i liczyć na szczęście, liczymy
// **kierunki kości w świecie** i obracamy kości modelu tak, aby wskazywały
// dokładnie tam, gdzie wskazują w animacji źródłowej. Dzięki temu działa to
// dla dowolnego szkieletu humanoidalnego — także dla modeli, które dodasz
// później z zewnątrz.
//
// Role kości są wspólne (biodra, kręgosłup, ręce, nogi, stopy), a nazwy
// rozpoznajemy po aliasach: `DEF-upper_arm.L`, `mixamorig:LeftArm`,
// `UpperArmL`, `LeftArm`, `PALM.L` — wszystko trafia w tę samą rolę.
// ---------------------------------------------------------------------------

/** Role kręgosłupa — dopasowywane po nazwie bez końcówki strony. */
const SPINE_ROLES = [
  ['hips', /^(hips|pelvis|hip)$/],
  ['spine1', /^(abdomen|spine1|spine01|spine)$/],
  ['spine2', /^(torso|spine2|spine02)$/],
  ['spine3', /^(chest|spine3|spine03|upperchest)$/],
  ['neck', /^(neck|neck1)$/],
  ['head', /^head$/],
];

/** Role kończyn — wymagają strony (L/P), inaczej pomijamy (zbyt ryzykowne). */
const LIMB_ROLES = [
  ['shoulder', /^(shoulder|clavicle)$/],
  ['upperArm', /^(upperarm|arm|arm1)$/],
  ['lowerArm', /^(lowerarm|forearm|elbow|arm2)$/],
  ['hand', /^(hand|palm|wrist)$/],
  ['upperLeg', /^(upperleg|thigh|upleg|leg1)$/],
  ['lowerLeg', /^(lowerleg|shin|calf|leg2)$/],
  ['foot', /^(foot|ankle)$/],
  ['toe', /^(toe|toes|ball)$/],
];

const LIMB_NAMES = new Set(LIMB_ROLES.map(([r]) => r));

/** Kolejność rodzic → dziecko (dla wyliczania rotacji lokalnych). */
const CHILD_OF = {
  hips: 'spine1',
  spine1: 'spine2',
  spine2: 'spine3',
  spine3: 'neck',
  neck: 'head',
  shoulderL: 'upperArmL',
  shoulderR: 'upperArmR',
  upperArmL: 'lowerArmL',
  upperArmR: 'lowerArmR',
  lowerArmL: 'handL',
  lowerArmR: 'handR',
  upperLegL: 'lowerLegL',
  upperLegR: 'lowerLegR',
  lowerLegL: 'footL',
  lowerLegR: 'footR',
  footL: 'toeL',
  footR: 'toeR',
};

/** Normalizuje nazwę kości: `DEF-upper_arm.L` → `upperarml`. */
export function normBoneName(name) {
  return String(name ?? '')
    .toLowerCase()
    .replace(/^mixamorig:?/, '')
    .replace(/[^a-z0-9]/g, '')
    .replace(/^def/, '')
    .replace(/^(human|character)?armature/, '')
    .replace(/^bip0?1/, '')
    .replace(/^bone_?/, '');
}

/**
 * Rozpoznaje rolę kości. Zwraca `null`, gdy nazwa nic nie mówi
 * (np. `Root`, `Bone`, `WeaponSocket`, palce).
 */
export function roleOfBone(name) {
  const s = normBoneName(name);
  if (!s) return null;
  let base = s;
  let side = null;
  if (s.endsWith('left')) {
    side = 'L';
    base = s.slice(0, -4);
  } else if (s.endsWith('right')) {
    side = 'R';
    base = s.slice(0, -5);
  } else if (/[lr]$/.test(s)) {
    const trimmed = s.slice(0, -1);
    if (LIMB_ROLES.some(([, re]) => re.test(trimmed))) {
      side = s.slice(-1).toUpperCase();
      base = trimmed;
    }
  }
  for (const [role, re] of SPINE_ROLES) if (re.test(base)) return role;
  for (const [role, re] of LIMB_ROLES) {
    if (!re.test(base)) continue;
    return side ? role + side : null; // bez strony nie zgadujemy
  }
  return null;
}

/** Zbiera kości szkieletu w role (pierwsze trafienie wygrywa). */
export function collectRigRoles(root) {
  const roles = {};
  if (!root) return roles;
  root.traverse((node) => {
    if (!node.name) return;
    const role = roleOfBone(node.name);
    if (!role || roles[role]) return;
    roles[role] = node;
  });
  return roles;
}

/** Sygnatura szkieletu — pozwala współdzielić przeliczone klipy. */
export function rigSignature(root) {
  const roles = collectRigRoles(root);
  return Object.keys(roles).sort().map((r) => `${r}:${roles[r].name}`).join('|');
}

/**
 * Dopasowuje role obu szkieletów.
 * @returns {Record<string, {role: string, src: THREE.Object3D, dst: THREE.Object3D}>}
 */
export function buildBoneMap(srcRoot, dstRoot) {
  const src = collectRigRoles(srcRoot);
  const dst = collectRigRoles(dstRoot);
  const map = {};
  for (const role of Object.keys(src)) {
    if (!dst[role]) continue;
    map[role] = { role, src: src[role], dst: dst[role] };
  }
  return map;
}

function depthOf(node) {
  let d = 0;
  let p = node?.parent;
  while (p) {
    d += 1;
    p = p.parent;
  }
  return d;
}

function nearestMappedAncestor(dstRoot, map, role) {
  let node = map[role]?.dst?.parent;
  const byNode = new Map(Object.values(map).map((m) => [m.dst, m.role]));
  while (node && node !== dstRoot.parent) {
    const found = byNode.get(node);
    if (found) return found;
    node = node.parent;
  }
  return null;
}

const _p = new THREE.Vector3();
const _p2 = new THREE.Vector3();
const _q = new THREE.Quaternion();
const _q2 = new THREE.Quaternion();
const _qParent = new THREE.Quaternion();
const _swing = new THREE.Quaternion();
const _dir = new THREE.Vector3();
const _dirRest = new THREE.Vector3();
const _mat = new THREE.Matrix4();

/**
 * Przelicza klip animacji ze szkieletu źródłowego na szkielet docelowy.
 *
 * @param {THREE.AnimationClip} clip
 * @param {THREE.Object3D} srcRoot  korzeń szkieletu źródłowego (z kościami)
 * @param {THREE.Object3D} dstRoot  korzeń szkieletu docelowego
 * @param {object} [opts]
 * @param {Record<string, {src: THREE.Object3D, dst: THREE.Object3D}>} [opts.boneMap]
 * @param {string} [opts.name]      nazwa nowego klipu (domyślnie jak źródłowy)
 * @param {number} [opts.fps=30]    gęstość próbkowania
 * @param {boolean} [opts.rootMotion=false]  przenosić też ruch bioder w pionie/poziomie
 * @returns {THREE.AnimationClip | null}
 */
export function retargetClip(clip, srcRoot, dstRoot, opts = {}) {
  if (!clip || !srcRoot || !dstRoot) return null;
  const { name = clip.name, fps = 30, rootMotion = true } = opts;
  const map = opts.boneMap ?? buildBoneMap(srcRoot, dstRoot);
  const roles = Object.keys(map).filter((r) => r !== 'toeL' && r !== 'toeR');
  if (roles.length < 4) return null; // za mało wspólnych kości — nie ma sensu

  srcRoot.updateMatrixWorld(true);
  dstRoot.updateMatrixWorld(true);

  // ---- stan spoczynkowy obu szkieletów ----
  const srcRestPos = {};
  const srcRestQuat = {};
  const dstRestQuat = {};
  const dstRestPos = {};
  for (const role of roles) {
    const s = map[role].src;
    const d = map[role].dst;
    s.getWorldPosition(_p);
    s.getWorldQuaternion(_q);
    srcRestPos[role] = _p.clone();
    srcRestQuat[role] = _q.clone();
    d.getWorldPosition(_p);
    d.getWorldQuaternion(_q);
    dstRestPos[role] = _p.clone();
    dstRestQuat[role] = _q.clone();
  }

  // ---- kierunki kości (od kości do jej „dziecka” w tym samym szkielecie) ----
  const srcDirOk = {};
  const dstRestDir = {};
  for (const role of roles) {
    const childRole = CHILD_OF[role];
    const srcChild = childRole ? map[childRole]?.src : null;
    const dstChild = childRole ? map[childRole]?.dst : null;
    if (!srcChild || !dstChild) continue;
    srcChild.getWorldPosition(_p2);
    _dirRest.copy(_p2).sub(srcRestPos[role]);
    if (_dirRest.lengthSq() < 1e-10) continue;
    _dirRest.normalize();
    dstRestDir[role] = _dirRest.clone();
    srcDirOk[role] = true;
  }

  const parentRole = {};
  for (const role of roles) parentRole[role] = nearestMappedAncestor(dstRoot, map, role);
  const order = [...roles].sort((a, b) => depthOf(map[a].dst) - depthOf(map[b].dst));

  const frames = Math.max(2, Math.round(clip.duration * fps) + 1);
  const times = new Float32Array(frames);
  for (let i = 0; i < frames; i += 1) times[i] = (clip.duration * i) / (frames - 1);

  const values = {};
  for (const role of roles) values[role] = new Float32Array(frames * 4);
  const hipsRole = map.hips ? 'hips' : null;
  const hipsPos = hipsRole && rootMotion ? new Float32Array(frames * 3) : null;
  const hipsScale = hipsRole && srcRestPos.hips.y > 0.01 ? dstRestPos.hips.y / srcRestPos.hips.y : 1;
  const hipsParentWorld = hipsRole ? map.hips.dst.parent : null;

  const worldQuat = {}; // przeliczone rotacje świata w danej klatce
  const mixer = new THREE.AnimationMixer(srcRoot);
  const action = mixer.clipAction(clip);
  action.setLoop(THREE.LoopRepeat, Infinity);
  action.play();

  for (let f = 0; f < frames; f += 1) {
    const t = times[f];
    mixer.setTime(t);
    srcRoot.updateMatrixWorld(true);

    for (const role of order) {
      const srcBone = map[role].src;
      // kierunek kości w animacji źródłowej
      let oriented = false;
      if (srcDirOk[role]) {
        const child = map[CHILD_OF[role]].src;
        child.getWorldPosition(_p2);
        srcBone.getWorldPosition(_p);
        _dir.copy(_p2).sub(_p);
        if (_dir.lengthSq() > 1e-10) {
          _dir.normalize();
          _swing.setFromUnitVectors(dstRestDir[role], _dir);
          _q.copy(_swing).multiply(dstRestQuat[role]);
          oriented = true;
        }
      }
      if (!oriented) {
        // zapas: przenosimy „delty” obrotu w świecie
        srcBone.getWorldQuaternion(_q2);
        _q.copy(_q2).multiply(_q2.copy(srcRestQuat[role]).invert()).multiply(dstRestQuat[role]);
      }
      worldQuat[role] = worldQuat[role] ?? new THREE.Quaternion();
      worldQuat[role].copy(_q);

      // rotacja lokalna względem rodzica w szkielecie docelowym
      const parent = parentRole[role];
      if (parent && worldQuat[parent]) _qParent.copy(worldQuat[parent]);
      else {
        const p = map[role].dst.parent;
        if (p) p.getWorldQuaternion(_qParent);
        else _qParent.identity();
      }
      const local = _qParent.invert().multiply(_q);
      const o = f * 4;
      values[role][o] = local.x;
      values[role][o + 1] = local.y;
      values[role][o + 2] = local.z;
      values[role][o + 3] = local.w;
    }

    if (hipsPos && hipsParentWorld) {
      map.hips.src.getWorldPosition(_p);
      _p.sub(srcRestPos.hips).multiplyScalar(hipsScale).add(dstRestPos.hips);
      _mat.copy(hipsParentWorld.matrixWorld).invert();
      _p.applyMatrix4(_mat);
      const o = f * 3;
      hipsPos[o] = _p.x;
      hipsPos[o + 1] = _p.y;
      hipsPos[o + 2] = _p.z;
    }
  }

  action.stop();
  mixer.uncacheClip(clip);

  const tracks = [];
  for (const role of roles) {
    tracks.push(
      new THREE.QuaternionKeyframeTrack(`${map[role].dst.name}.quaternion`, Array.from(times), Array.from(values[role]))
    );
  }
  if (hipsPos) tracks.push(new THREE.VectorKeyframeTrack(`${map.hips.dst.name}.position`, Array.from(times), Array.from(hipsPos)));
  return new THREE.AnimationClip(name, clip.duration, tracks);
}

/**
 * Przelicza zestaw klipów i zwraca nowe, gotowe do `clipAction`.
 * Klipy z tej samej sygnatury szkieletu są liczone raz i współdzielone.
 *
 * @param {{scene: THREE.Object3D, clips: THREE.AnimationClip[]}} library
 * @param {THREE.Object3D} dstRoot
 * @param {Record<string, string>} stateToClip  { idle: 'Idle_Loop', ... }
 * @returns {{clips: Record<string, THREE.AnimationClip>, missing: string[]}}
 */
export function retargetLibrary(library, dstRoot, stateToClip, opts = {}) {
  const out = { clips: {}, missing: [] };
  if (!library?.scene || !library.clips?.length) {
    out.missing = Object.values(stateToClip ?? {});
    return out;
  }
  library._cache = library._cache ?? new Map();
  const signature = rigSignature(dstRoot);
  const cached = library._cache.get(signature);
  if (cached) {
    for (const [state, clip] of Object.entries(cached)) {
      if (stateToClip[state]) out.clips[state] = clip;
    }
    const wanted = new Set(Object.values(stateToClip));
    out.missing = [...wanted].filter((n) => !library.clips.some((c) => c.name === n));
    return out;
  }

  const byName = new Map(library.clips.map((c) => [c.name, c]));
  const boneMap = opts.boneMap ?? buildBoneMap(library.scene, dstRoot);
  const built = {};
  for (const [state, clipName] of Object.entries(stateToClip)) {
    const clip = byName.get(clipName);
    if (!clip) {
      out.missing.push(clipName);
      continue;
    }
    const converted = retargetClip(clip, library.scene, dstRoot, {
      boneMap,
      name: state,
      fps: opts.fps ?? 30,
      rootMotion: opts.rootMotion ?? true,
    });
    if (!converted) {
      out.missing.push(clipName);
      continue;
    }
    built[state] = converted;
    out.clips[state] = converted;
  }
  library._cache.set(signature, built);
  return out;
}
