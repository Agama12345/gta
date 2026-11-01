// ---------------------------------------------------------------------------
// MODELE PRZECIWNIKÓW Z PACZEK CC0
//
// Wcześniej bandyci, wilki i golemy były składane z prymitywów (pudełka i
// kule). Teraz stoją na prawdziwych modelach:
//   * bandyci  — KayKit „Character Pack: Adventurers” (łotr, barbarzyńca, rycerz),
//   * szkielety — KayKit „Character Pack: Skeletons”,
//   * wilki     — Quaternius „Animated Animals”,
//   * bagniaki  — Quaternius „Easy Enemies” (pająk),
//   * golemy    — bryły z prawdziwych skał Quaterniusa (siatki z teksturami).
//
// Wszystkie animacje są odtwarzane z klipów dołączonych do modeli, więc ruch
// jest „namalowany” przez autora paczki, a nie wyliczany sinusem.
// ---------------------------------------------------------------------------
import * as THREE from 'three';
import { clone as cloneSkinned } from 'three/addons/utils/SkeletonUtils.js';
import { mergeSkinnedParts } from './characterMerge.js';
import { CharacterRig } from './characterRig.js';

/**
 * Stany, których używa `enemy.js`, na stany `CharacterRig`.
 * Dzięki temu logika walki nie musi wiedzieć, jaki model stoi za przeciwnikiem.
 */
const LEGACY_STATE = {
  Idle: 'idle',
  Walking_A: 'walk',
  Running_A: 'run',
  '1H_Melee_Attack_Slice_Diagonal': 'attack',
  '1H_Melee_Attack_Chop': 'attack',
  '2H_Melee_Attack_Chop': 'attack2',
  '1H_Ranged_Shoot': 'attack',
  Hit_A: 'hurt',
  Death_A: 'death',
};

/**
 * Postać dwunożna na silniku `CharacterRig` (klon szkieletu, normalizacja
 * wzrostu, przypięcie broni do kości dłoni).
 * @returns {null | {group: THREE.Group, parts: object, mixer, play, clips, rig}}
 */
export function buildBipedEnemy(assets, key, { height = 1.85, tint = null, label = 'przeciwnik' } = {}) {
  const entry = assets?.charEntry?.(key) ?? assets?.chars?.[key];
  if (!entry) return null;
  let rig;
  try {
    rig = new CharacterRig(entry, {
      targetHeight: height,
      name: label,
      tint,
      library: null,
    });
  } catch (err) {
    console.warn(`Model przeciwnika „${label}” nie wystartował`, err);
    return null;
  }

  // Zestaw klipów jako mapa nazwa → klip: po tym poznaje się, czy model
  // w ogóle ma animacje (i tego oczekują testy oraz `enemy.js`).
  const clipMap = new Map();
  for (const clip of entry.animations ?? []) clipMap.set(clip.name, clip);

  let legacyNow = null;
  const play = (name, { once = false, fade = 0.18 } = {}) => {
    const state = LEGACY_STATE[name] ?? name.toLowerCase();
    const action = rig.play(state, { fade, reset: once });
    if (!action) return false;
    legacyNow = name;
    // ataki i trafienia odgrywamy raz — inaczej cios „zapętla się” w miejscu
    if (once) {
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
      action.reset();
      action.play();
    } else {
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.clampWhenFinished = false;
    }
    return true;
  };

  return {
    group: rig.group,
    parts: { skinned: true },
    mixer: rig.mixer,
    clips: clipMap,
    play,
    rig,
    get clip() { return legacyNow; },
    get state() { return rig.current; },
  };
}

/**
 * Zwierzę/robak: model z własnymi klipami (nazwy typu `AnimalArmature|Walk`).
 * Stany gry tłumaczymy na konkretne nazwy klipów podane w `states`.
 */
export class BeastRig {
  constructor(entry, { targetHeight = 1, states = {}, name = 'bestia' } = {}) {
    this.name = name;
    this.source = cloneSkinned(entry.scene);
    this.states = states;

    this.source.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
        o.frustumCulled = false;
      }
    });

    // Bestie z paczek CC0 mają po kilka osobnych brył (łapy, uszy, ogon...).
    // Sklejamy je w jedną siatkę, zanim cokolwiek przeskalujemy — po scaleniu
    // skala węzłów bywa już inna niż w oryginale.
    this.mergeStats = mergeSkinnedParts(this.source);

    // normalizacja wzrostu — modele zwierząt są w różnych skalach (część w cm)
    this.source.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(this.source);
    const size = new THREE.Vector3();
    box.getSize(size);
    const h = Math.max(0.001, size.y);
    const k = targetHeight / h;
    this.source.scale.multiplyScalar(k);
    // po przeskalowaniu stawiamy model na ziemi (środek bryły → 0)
    this.source.position.y = -box.min.y * k;

    this.group = new THREE.Group();
    this.group.add(this.source);

    this.mixer = new THREE.AnimationMixer(this.source);
    this.actions = {};
    this.byName = new Map();
    for (const clip of entry.animations ?? []) this.byName.set(clip.name, clip);
    for (const [state, clipName] of Object.entries(states)) {
      const clip = this.byName.get(clipName) ?? [...this.byName.values()].find((c) => c.name.toLowerCase().endsWith(clipName.toLowerCase()));
      if (!clip) continue;
      const action = this.mixer.clipAction(clip);
      action.enabled = true;
      action.setLoop(state === 'death' ? THREE.LoopOnce : THREE.LoopRepeat, state === 'death' ? 1 : Infinity);
      action.clampWhenFinished = state === 'death';
      action.weight = 0;
      this.actions[state] = action;
    }
    this.current = null;
    if (this.actions.idle) {
      this.actions.idle.play();
      this.actions.idle.setEffectiveWeight(1);
      this.current = 'idle';
    }
    this.scale = k;
  }

  play(state, { fade = 0.2, reset = false, rate = 1 } = {}) {
    const action = this.actions[state] ?? this.actions.idle;
    if (!action) return null;
    const key = this.actions[state] ? state : 'idle';
    if (key === this.current && !reset) {
      action.timeScale = rate;
      return action;
    }
    const prev = this.current ? this.actions[this.current] : null;
    action.reset();
    action.enabled = true;
    action.timeScale = rate;
    action.setEffectiveWeight(1);
    action.play();
    if (prev && prev !== action) prev.crossFadeTo(action, fade, false);
    else action.fadeIn(fade);
    this.current = key;
    return action;
  }

  update(dt) {
    this.mixer.update(dt);
  }
}

const LEGACY_BEAST_STATE = {
  Idle: 'idle',
  Walking_A: 'walk',
  Running_A: 'run',
  '1H_Melee_Attack_Slice_Diagonal': 'attack',
  '1H_Melee_Attack_Chop': 'attack',
  Hit_A: 'hurt',
  Death_A: 'death',
};

/** Owija `BeastRig` w interfejs, jakiego oczekuje `enemy.js`. */
export function buildBeastEnemy(assets, key, { height = 1, states = {}, name = 'bestia' } = {}) {
  const entry = assets?.charEntry?.(key) ?? assets?.chars?.[key];
  if (!entry) return null;
  let rig;
  try {
    rig = new BeastRig(entry, { targetHeight: height, states, name });
  } catch (err) {
    console.warn(`Model „${name}” nie wystartował`, err);
    return null;
  }
  const play = (clipName, { once = false, fade = 0.18 } = {}) => {
    const state = LEGACY_BEAST_STATE[clipName] ?? clipName;
    const action = rig.play(state, { fade, reset: once });
    if (action && once) {
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
    }
    return !!action;
  };
  return {
    group: rig.group,
    parts: { skinned: true },
    mixer: rig.mixer,
    clips: rig.actions,
    play,
    rig,
  };
}

// ---------------------------------------------------------------------------
// GOLEM Z PRAWDZIWYCH SKAŁ
//
// W paczkach CC0 nie ma animowanego golema, ale są teksturowane skały
// (Quaternius, Ultimate Nature Pack). Składamy z nich bryłę strażnika:
// tułów, głowa, ramiona i nogi to prawdziwe siatki skalne z teksturą,
// a świecące szczeliny i oczy dodają mu magiczny charakter.
// ---------------------------------------------------------------------------
function rockPart(assets, keys, rngSeed = 1) {
  for (const key of keys) {
    const model = assets?.nature?.[key];
    const part = model?.parts?.find((p) => p.geometry?.attributes?.position);
    if (!part) continue;
    const geo = part.geometry.clone();
    geo.computeBoundingBox();
    const box = geo.boundingBox;
    const center = new THREE.Vector3();
    box.getCenter(center);
    geo.translate(-center.x, -center.y, -center.z);
    const size = new THREE.Vector3();
    box.getSize(size);
    geo.computeBoundingSphere();
    return {
      geometry: geo,
      material: part.material,
      size,
      seed: rngSeed,
    };
  }
  return null;
}

function rockMesh(rock, { sx = 1, sy = 1, sz = 1, rot = null } = {}) {
  if (!rock) return null;
  const mesh = new THREE.Mesh(rock.geometry, rock.material);
  // normalizujemy do ~1 m, żeby skalowanie było przewidywalne
  const unit = 1 / Math.max(0.0001, Math.max(rock.size.x, rock.size.y, rock.size.z));
  mesh.scale.set(unit * sx, unit * sy, unit * sz);
  if (rot) mesh.rotation.set(rot[0] ?? 0, rot[1] ?? 0, rot[2] ?? 0);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export function buildRockGolem(assets) {
  const rng = (() => {
    let s = 1337;
    return () => {
      s = (s * 1664525 + 1013904223) % 4294967296;
      return s / 4294967296;
    };
  })();
  const rocks = [
    rockPart(assets, ['q_rock_b', 'q_rock_a', 'q_rock_c'], 1),
    rockPart(assets, ['q_rock_c', 'q_rock_a', 'q_rock_moss'], 2),
    rockPart(assets, ['q_rock_moss', 'q_rock_a', 'q_rock_b'], 3),
  ].filter(Boolean);
  if (!rocks.length) return null;
  const [big, mid, mossy] = [rocks[0], rocks[1] ?? rocks[0], rocks[2] ?? rocks[0]];

  // Proporcje jak u człowieka, tylko masywniejsze — wcześniejsza wersja miała
  // za krótkie nogi i ramiona wtopione w tułów, więc wyglądała jak kupa głazów.
  const group = new THREE.Group();
  const body = new THREE.Group();
  group.add(body);

  const glowMat = new THREE.MeshStandardMaterial({
    color: '#9ff0d4', emissive: '#4fe0b8', emissiveIntensity: 2.0, roughness: 0.35,
  });

  // ---- nogi (od pasa w dół) ----
  const legs = [];
  const shins = [];
  for (const sx of [-1, 1]) {
    const hip = new THREE.Group();
    hip.position.set(sx * 0.5, 1.9, 0);
    body.add(hip);
    const thigh = rockMesh(big, { sx: 0.82, sy: 1.0, sz: 0.82, rot: [rng() * 0.4, rng() * 6.28, (rng() - 0.5) * 0.3] });
    thigh.position.y = -0.42;
    hip.add(thigh);
    const knee = new THREE.Group();
    knee.position.y = -0.88;
    hip.add(knee);
    const calf = rockMesh(mid, { sx: 0.7, sy: 0.95, sz: 0.7, rot: [rng() * 0.4, rng() * 6.28, (rng() - 0.5) * 0.3] });
    calf.position.y = -0.36;
    knee.add(calf);
    const foot = rockMesh(mossy, { sx: 0.7, sy: 0.3, sz: 0.95, rot: [0, rng() * 6.28, 0] });
    foot.position.set(0, -0.74, 0.12);
    knee.add(foot);
    legs.push(hip);
    shins.push(knee);
  }

  // ---- tułów ----
  const pelvis = rockMesh(mid, { sx: 0.95, sy: 0.6, sz: 0.75, rot: [0, rng() * 6.28, 0] });
  pelvis.position.set(0, 1.94, 0);
  body.add(pelvis);
  const torso = rockMesh(big, { sx: 1.55, sy: 1.5, sz: 1.15, rot: [0.08, rng() * 6.28, 0.05] });
  torso.position.set(0, 2.78, 0);
  body.add(torso);
  const chest = rockMesh(mid, { sx: 1.2, sy: 0.7, sz: 0.95, rot: [0.3, rng() * 6.28, 0] });
  chest.position.set(0, 3.36, 0.05);
  body.add(chest);

  // świecące „serce” w szczelinie piersi
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.24, 0), glowMat);
  core.position.set(0, 2.84, 0.6);
  core.castShadow = false;
  body.add(core);

  // ---- głowa ----
  const head = new THREE.Group();
  head.position.set(0, 3.8, 0.08);
  body.add(head);
  const skull = rockMesh(mid, { sx: 0.8, sy: 0.78, sz: 0.8, rot: [0.15, rng() * 6.28, 0] });
  head.add(skull);
  const brow = rockMesh(mossy, { sx: 0.86, sy: 0.28, sz: 0.7, rot: [0, rng() * 6.28, 0] });
  brow.position.set(0, 0.22, 0.04);
  head.add(brow);
  for (const sx of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.08, 7, 6), glowMat);
    eye.position.set(sx * 0.17, 0.02, 0.34);
    eye.castShadow = false;
    head.add(eye);
  }

  // ---- ramiona ----
  const arms = [];
  const forearms = [];
  for (const sx of [-1, 1]) {
    const shoulder = new THREE.Group();
    shoulder.position.set(sx * 1.0, 3.42, 0);
    body.add(shoulder);
    const pad = rockMesh(big, { sx: 0.78, sy: 0.62, sz: 0.78, rot: [rng() * 0.5, rng() * 6.28, rng() * 0.5] });
    shoulder.add(pad);
    const upper = rockMesh(mid, { sx: 0.55, sy: 0.95, sz: 0.55, rot: [rng() * 0.3, rng() * 6.28, rng() * 0.3] });
    upper.position.y = -0.62;
    shoulder.add(upper);
    const elbow = new THREE.Group();
    elbow.position.y = -1.14;
    shoulder.add(elbow);
    const fore = rockMesh(mid, { sx: 0.5, sy: 0.9, sz: 0.5, rot: [rng() * 0.3, rng() * 6.28, rng() * 0.3] });
    fore.position.y = -0.38;
    elbow.add(fore);
    const fist = rockMesh(big, { sx: 0.62, sy: 0.6, sz: 0.62, rot: [rng(), rng() * 6.28, rng()] });
    fist.position.y = -0.88;
    elbow.add(fist);
    arms.push(shoulder);
    forearms.push(elbow);
  }

  // mech i gruz na plecach
  for (let i = 0; i < 4; i++) {
    const chunk = rockMesh(mossy, { sx: 0.34, sy: 0.26, sz: 0.34, rot: [rng(), rng() * 6.28, rng()] });
    chunk.position.set((rng() - 0.5) * 1.1, 3.0 + (rng() - 0.5) * 0.8, -0.62);
    body.add(chunk);
  }

  const parts = {
    body,
    head,
    arms,
    forearms,
    legs,
    shins,
    core,
    glow: core,
    skinned: false,
  };
  return { group, parts };
}
