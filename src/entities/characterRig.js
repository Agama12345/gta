import * as THREE from 'three';
import { mergeSkinnedParts } from './characterMerge.js';
import { clone as cloneSkinned } from 'three/addons/utils/SkeletonUtils.js';
import { retargetLibrary, collectRigRoles } from './clipRetarget.js';

/**
 * Kolory materiałów modelu (Quaternius nazywa je po kolorach: `Green`,
 * `Brown2`, `Skin`…). Mapujemy je na pola `visual` mieszkańca, żeby każdy NPC
 * wyglądał inaczej mimo współdzielonego siatki.
 */
const TINT_RULES = [
  [/^skin/, 'skin'],
  [/hair|beard|moustache|eyebrow/, 'hair'],
  [/^eye/, 'eyeColor'],
  [/^gold/, 'armor'],
  [/^metal/, null], // metale zostają w swoim kolorze
  [/^(black|grey|brown|darkbrown|lightbrown|brown2|brown_?02)/, 'pants'],
  [/boot|shoe/, 'boots'],
  [/cloak|cape|pack|bag/, 'cloak'],
  [/cloth|tunic|shirt|vest|dress|robe|linen|beige|white|blue|green|red|yellow/, 'tunic'],
];

/** Materiały z metalu (hełmy, sprzączki) odróżniamy od tkanin. */
const METAL_MATERIAL = /metal|armor|gold|steel|iron|buckle/i;

/**
 * Poprawia materiały modeli z zewnątrz. Domyślne `metallicFactor: 0.4` bez mapy
 * otoczenia robi z tkanin ciemny, plastikowy szmelc — a scena nie ma IBL.
 * Tkaniny i skóra dostają metalness 0, metale zostają lekko błyszczące.
 * @returns {number} liczba poprawionych materiałów
 */
export function tuneCharacterMaterials(root) {
  let tuned = 0;
  root.traverse((o) => {
    if (!o.isMesh || !o.material) return;
    const list = Array.isArray(o.material) ? o.material : [o.material];
    for (const mat of list) {
      if (!mat || !('metalness' in mat)) continue;
      const metal = METAL_MATERIAL.test(mat.name ?? '');
      mat.metalness = metal ? 0.35 : 0;
      mat.roughness = metal ? 0.4 : 0.62;
      tuned += 1;
    }
  });
  return tuned;
}

/** Nadaje modelowi barwy z definicji postaci (materiały są klonowane). */
export function tintCharacter(root, visual = {}) {
  if (!root || !visual) return 0;
  let painted = 0;
  root.traverse((o) => {
    if (!o.isMesh || !o.material) return;
    const list = Array.isArray(o.material) ? o.material : [o.material];
    const next = list.map((mat) => {
      const name = (mat?.name ?? '').toLowerCase();
      let field = null;
      for (const [re, f] of TINT_RULES) {
        if (re.test(name)) {
          field = f;
          break;
        }
      }
      const color = field ? visual[field] : null;
      if (!color) return mat;
      const clone = mat.clone();
      clone.color = new THREE.Color(color);
      painted += 1;
      return clone;
    });
    o.material = Array.isArray(o.material) ? next : next[0];
  });
  return painted;
}

// ---------------------------------------------------------------------------
// Warstwa zgodności dla modeli postaci dostarczanych z zewnątrz (GLB/GLTF).
//
// Gra domyślnie rysuje własne, przegubowe sylwetki proceduralne. Jeśli w
// katalogu `public/assets/chars/` pojawi się prawdziwy, rigowany model
// (kości + klipy animacji), ta warstwa przejmuje wygląd bohatera i mieszkańców:
//
//   • normalizuje skalę do ~1,8 m i ustawia model pionowo, twarzą w +Z,
//   • dopasowuje nazwy klipów (Idle / Walk / Run / Attack / …) po aliasach,
//   • udostępnia gniazda broni i tarczy (dłonie) szukane po nazwach kości,
//   • płynnie przełącza stany (crossfade) i skaluje tempo chodu do prędkości.
//
// Wszystko jest odporne na braki: brak modelu = zostaje sylwetka proceduralna.
// ---------------------------------------------------------------------------

/** Aliasy nazw klipów — dopasowanie po małych literach i bez znaków specjalnych. */
export const CLIP_ALIASES = {
  idle: ['idle', 'stand', 'standing', 'breathing', 'unarmedidle', 'idle01', 'idle1'],
  walk: ['walk', 'walking', 'walkforward', 'walkfwd', 'walk01', 'walk1'],
  run: ['run', 'running', 'sprint', 'jog', 'runforward', 'run01'],
  // ataki: nazwy z paczek KayKit („1H_Melee_Attack_Chop”) i z biblioteki UAL
  attack: ['attack', 'attack1', '1hmeleeattackchop', '1hmeleeattack', 'chop', 'slash', 'swordslash', 'melee', 'swordattack', 'attack01'],
  attack2: ['attack2', 'attack02', '1hmeleeattackslicehorizontal', '1hmeleeattackslice', 'slice', 'slash2', 'combo2', 'swordslash2'],
  attack3: ['attack3', 'attack03', '2hmeleeattackspin', '2hmeleeattackchop', 'heavyslash', 'finisher', 'combo3'],
  block: ['block', 'blocking', 'guard', 'shieldblock', 'parry'],
  dodge: ['dodge', 'roll', 'evade', 'backflip', 'dodgebackward', 'dodgeforward'],
  cast: ['cast', 'spell', 'magic', 'castspell', 'spellcastshoot', 'spellcastraise', 'channel'],
  hurt: ['hurt', 'hit', 'hita', 'hitb', 'damage', 'impact', 'flinch', 'hurt01'],
  death: ['death', 'die', 'dying', 'death01', 'deada', 'dead'],
  talk: ['talk', 'speak', 'talk01', 'interact', 'gesture', 'conversation'],
  sit: ['sit', 'rest', 'sitting', 'sitchairidle', 'sitidle'],
  wave: ['wave', 'cheer', 'greet', 'hello'],
  eat: ['eat', 'drink', 'useitem', 'consume'],
  pickup: ['pickup', 'take', 'grab'],
  jump: ['jumpstart', 'jumpfullshort', 'jumpidle', 'jump'],
  land: ['jumpland', 'land'],
};

const norm = (s) => String(s ?? '').toLowerCase().replace(/[^a-z0-9]/g, '');

/**
 * Stany gry → klipy z biblioteki Quaternius UAL (CC0). Używane, gdy model
 * postaci nie ma własnych animacji. Dobór jest celowy: `Sword_Idle` jako
 * garda, `Roll` jako unik, `Interact` jako sięganie po przedmiot.
 */
/** Prędkość, przy której klip wygląda naturalnie (m/s) — do dopasowania tempa. */
export const LIBRARY_REF_SPEED = { walk: 1.15, run: 2.9, sprint: 3.65, swim: 1.0, crouch: 0.8 };

export const LIBRARY_STATE_MAP = {
  idle: 'Idle_Loop',
  walk: 'Walk_Loop',
  run: 'Jog_Fwd_Loop',
  sprint: 'Sprint_Loop',
  attack: 'Sword_Attack',
  attack2: 'Sword_Attack_RM',
  attack3: 'Punch_Cross',
  block: 'Sword_Idle',
  dodge: 'Roll',
  cast: 'Spell_Simple_Shoot',
  hurt: 'Hit_Chest',
  death: 'Death01',
  talk: 'Idle_Talking_Loop',
  sit: 'Sitting_Idle_Loop',
  wave: 'Interact',
  eat: 'Interact',
  use: 'Interact',
  pickup: 'PickUp_Table',
  jump: 'Jump_Start',
  land: 'Jump_Land',
  crouch: 'Crouch_Idle_Loop',
  swim: 'Swim_Fwd_Loop',
  dance: 'Dance_Loop',
};

/**
 * Dopasowuje klipy animacji do stanów gry.
 * @param {THREE.AnimationClip[]} animations
 * @returns {{ clips: Record<string, THREE.AnimationClip>, unmatched: string[] }}
 */
export function matchClips(animations = []) {
  const clips = {};
  const pool = animations.map((clip) => ({ clip, key: norm(clip.name) }));

  for (const [state, aliases] of Object.entries(CLIP_ALIASES)) {
    // najpierw dokładna równość, potem „zawiera” — inaczej „walkback” złapie „walk”
    let hit = pool.find((p) => aliases.includes(p.key) && !p.used);
    if (!hit) hit = pool.find((p) => aliases.some((a) => p.key.startsWith(a)) && !p.used);
    if (!hit) hit = pool.find((p) => aliases.some((a) => p.key.includes(a)) && !p.used);
    if (hit) {
      hit.used = true;
      clips[state] = hit.clip;
    }
  }
  // zapas: jeśli jest tylko jeden klip „idle”, użyj go też jako pozy spoczynkowej
  if (!clips.idle && clips.talk) clips.idle = clips.talk;
  if (!clips.idle && animations.length) clips.idle = animations[0];
  return { clips, unmatched: pool.filter((p) => !p.used).map((p) => p.clip.name) };
}

const HAND_ALIASES = {
  right: ['righthand', 'handr', 'handright', 'rwrist', 'rightwrist', 'mixamorigrighthand', 'weaponsocketr'],
  left: ['lefthand', 'handl', 'handleft', 'lwrist', 'leftwrist', 'mixamoriglefthand', 'weaponsocketl'],
  head: ['head', 'mixamorighead', 'neck'],
  spine: ['spine2', 'spine1', 'spine', 'chest', 'mixamorigspine2'],
};

/**
 * Szuka kości-gniazda po nazwie (obsługuje prefiks `mixamorig:`).
 *
 * Ważne: w plikach GLB obok kości potrafią leżeć grupy o tej samej nazwie
 * (`Adventurer_Head` obejmująca siatki głowy, `Head_end` jako końcówka kości).
 * Gdybyśmy brali pierwsze trafienie, „kością” głowy zostawała grupa w punkcie
 * zero — a skalowanie takiej „głowy” kurczyło całą postać. Dlatego zbieramy
 * wszystkie trafienia i wybieramy najlepsze: prawdziwą kość, najpierw dopasowanie
 * dokładne, a nie „końcówkę” nazwy.
 */
export function findSocket(root, names) {
  if (!root) return null;
  const wanted = names.map(norm);
  const hits = [];
  root.traverse((o) => {
    if (!o.name) return;
    const key = norm(o.name);
    const rank = wanted.indexOf(key);
    const tail = rank < 0 ? wanted.findIndex((w) => key.endsWith(w)) : -1;
    if (rank < 0 && tail < 0) return;
    hits.push({ node: o, bone: !!o.isBone, exact: rank >= 0, order: rank >= 0 ? rank : tail });
  });
  if (!hits.length) return null;
  hits.sort((a, b) => Number(b.bone) - Number(a.bone) || Number(b.exact) - Number(a.exact) || a.order - b.order);
  return hits[0].node;
}

/**
 * Naprawia uszkodzone wagi skórowania (NaN lub zerowe).
 *
 * Modele z internetu czasem mają zepsuty eksport: wierzchołki bez przypisanej
 * kości wyglądają jak brakująca noga albo rozciągnięta siatka, a `Box3` liczy
 * wtedy `NaN` i postać znika. Zamiast odrzucać taki model, przypisujemy każdy
 * zepsuty wierzchołek do najbliższej kości.
 * @returns {number} liczba naprawionych siatek
 */
export function repairSkinWeights(root) {
  let repaired = 0;
  const v = new THREE.Vector3();
  const inv = new THREE.Matrix4();
  root.traverse((mesh) => {
    if (!mesh.isSkinnedMesh) return;
    const sw = mesh.geometry?.attributes?.skinWeight;
    const si = mesh.geometry?.attributes?.skinIndex;
    const pos = mesh.geometry?.attributes?.position;
    if (!sw || !si || !pos) return;
    let broken = false;
    for (let i = 0; i < sw.count; i += 1) {
      if (!Number.isFinite(sw.getX(i)) || !Number.isFinite(sw.getY(i)) || !Number.isFinite(sw.getZ(i)) || !Number.isFinite(sw.getW(i))) {
        broken = true;
        break;
      }
    }
    if (!broken) return;
    const bones = (mesh.skeleton?.bones ?? []).filter((b) => b && b.isObject3D);
    if (!bones.length) return;
    inv.copy(mesh.matrixWorld).invert();
    const boneLocal = bones.map((b) => {
      const p = new THREE.Vector3();
      b.getWorldPosition(p);
      return p.applyMatrix4(inv);
    });
    for (let i = 0; i < pos.count; i += 1) {
      v.fromBufferAttribute(pos, i);
      let best = 0;
      let bestD = Infinity;
      for (let b = 0; b < boneLocal.length; b += 1) {
        const d = boneLocal[b].distanceToSquared(v);
        if (d < bestD) {
          bestD = d;
          best = b;
        }
      }
      si.setXYZW(i, best, 0, 0, 0);
      sw.setXYZW(i, 1, 0, 0, 0);
    }
    si.needsUpdate = true;
    sw.needsUpdate = true;
    mesh.geometry.computeBoundingBox?.();
    mesh.geometry.computeBoundingSphere?.();
    repaired += 1;
  });
  return repaired;
}

/**
 * Wysokość ciała oszacowana po kościach.
 *
 * Liczymy od stopy do kości głowy — nie po „skrajnych” kościach szkieletu,
 * bo rigi mają dodatkowe kości pomocnicze (IK, kontrolki stóp, gniazda broni),
 * które potrafią leżeć metr nad głową i psuły skalowanie.
 */
function skeletonHeight(root) {
  const roles = collectRigRoles(root);
  const v = new THREE.Vector3();
  const y = (node) => {
    if (!node) return null;
    node.getWorldPosition(v);
    return Number.isFinite(v.y) ? v.y : null;
  };
  const head = y(roles.head);
  const foot = Math.min(...[y(roles.footL), y(roles.footR)].filter((n) => n !== null));
  if (head !== null && Number.isFinite(foot) && head > foot) return (head - foot) / 0.86;
  // zapas: kości bez „pomocniczych” nazw
  let top = -Infinity;
  let bottom = Infinity;
  root.traverse((o) => {
    if (!o.isBone) return;
    if (/ik|control|helper|pole|slot|end/i.test(o.name)) return;
    const py = y(o);
    if (py === null) return;
    top = Math.max(top, py);
    bottom = Math.min(bottom, py);
  });
  if (!Number.isFinite(top) || !Number.isFinite(bottom) || top <= bottom) return 0;
  return (top - bottom) / 0.9;
}

/** Skaluje model do docelowego wzrostu i ustawia stopy na y = 0. */
export function normalizeRig(scene, targetHeight = 1.85) {
  const holder = new THREE.Group();
  holder.add(scene);
  scene.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(scene);
  const size = new THREE.Vector3();
  box.getSize(size);
  const meshOk = Number.isFinite(size.y) && size.y > 0.01;
  const meshHeight = meshOk ? size.y : 0.001;
  const boneHeight = skeletonHeight(scene);
  // Bryła bywa wyższa od ciała (płaszcz, kapelusz, hełm), ale bywa też
  // bezużyteczna (NaN w uszkodzonym eksporcie) i wtedy ratuje nas szkielet.
  // Gdy oba pomiary się zgadzają — bierzemy mniejszy, żeby nie robić karła.
  let height = meshHeight;
  if (boneHeight > 0.2) {
    const ratio = boneHeight / meshHeight;
    height = meshOk && ratio > 0.6 && ratio < 1.4 ? Math.min(meshHeight, boneHeight) : meshHeight;
  } else if (!meshOk) {
    height = 1.8;
  }
  const scale = targetHeight / height;
  scene.scale.setScalar(scale);
  scene.updateMatrixWorld(true);
  const box2 = new THREE.Box3().setFromObject(scene);
  scene.position.y -= box2.min.y; // stopy na ziemi
  scene.traverse((o) => {
    if (o.isMesh || o.isSkinnedMesh) {
      o.castShadow = true;
      o.receiveShadow = true;
      if (o.material) {
        o.material.side = THREE.FrontSide;
        o.frustumCulled = false; // animowane siatki potrafią „znikać”
      }
    }
  });
  return { holder, scale, height };
}

/**
 * Dobiera skalę kości głowy tak, aby głowa zajmowała ~1/7,5 wzrostu.
 *
 * Mierzymy, ile wysokości modelu przypada na czaszkę (od nasady czaszki do
 * czubka), i tylko nadmiar ponad realistyczne proporcje ścinamy. Dzięki temu
 * jeden wzór obsługuje i kreskówkowe figurki, i realistyczne modele, i modele
 * dodane później — bez ręcznego dobierania współczynnika do każdego pliku.
 */
export function autoHeadScale(root, headBone) {
  if (!root || !headBone) return 1;
  const box = new THREE.Box3().setFromObject(root);
  const total = box.max.y - box.min.y;
  if (!Number.isFinite(total) || total < 0.2) return 1;
  const v = new THREE.Vector3();
  headBone.getWorldPosition(v);
  const headHeight = box.max.y - v.y;
  if (!Number.isFinite(headHeight) || headHeight <= 0.01) return 1;
  const ratio = headHeight / total;
  const realistic = 0.142; // ~1/7 wzrostu na czaszkę (z włosami)
  if (ratio <= realistic * 1.12) return 1;
  const k = realistic / ratio;
  return Math.min(1, Math.max(0.62, k));
}

/**
 * Sterownik animacji postaci z zewnętrznego pliku.
 * Używa AnimationMixer + crossfade; poziom sterowania jest ten sam dla
 * bohatera i mieszkańców (stany: idle, walk, run, attack, hurt, death, talk…).
 */
export class CharacterRig {
  constructor(gltf, opts = {}) {
    const { targetHeight = 1.85, name = 'postać', library = null } = opts;
    this.name = name;
    // klon szkieletu — kilka mieszkańców może używać tego samego pliku
    this.source = cloneSkinned(gltf.scene);
    this.repaired = repairSkinWeights(this.source);
    if (opts.tint) tintCharacter(this.source, opts.tint);
    tuneCharacterMaterials(this.source);
    // Części, których nie chcemy na postaci (np. plecak zasłaniający bohatera
    // z kamery zza pleców) — chowane po nazwie siatki.
    if (opts.hideParts?.length) {
      const re = new RegExp(opts.hideParts.join('|'), 'i');
      this.source.traverse((o) => {
        if (o.isMesh && re.test(o.name)) o.visible = false;
      });
    }
    // Jedna siatka na postać zamiast kilkunastu (kolor materiału → kolor wierzchołka).
    this.mergeStats = mergeSkinnedParts(this.source);
    this.mixer = new THREE.AnimationMixer(this.source);
    const { clips, unmatched } = matchClips(gltf.animations ?? []);
    this.clips = clips;
    this.unmatched = unmatched;
    this.actions = {};
    this.libraryAdded = [];
    // animacje z biblioteki przeliczamy PRZED normalizacją skali —
    // dzięki temu ruch bioder i proporcje są liczone w metrach
    if (library) this.addLibrary(library, { rebuild: false });
    const { holder, scale } = normalizeRig(this.source, targetHeight);
    this.group = holder;
    this.scale = scale;
    for (const [state, clip] of Object.entries(this.clips)) this._makeAction(state, clip);
    this.current = null;
    this.sockets = {
      rightHand: findSocket(this.source, HAND_ALIASES.right),
      leftHand: findSocket(this.source, HAND_ALIASES.left),
      head: findSocket(this.source, HAND_ALIASES.head),
      spine: findSocket(this.source, HAND_ALIASES.spine),
    };
    // Proporcje głowy. Część paczek CC0 (KayKit) ma głowy jak figurki —
    // ok. 1/5 wzrostu. Realistyczny dorosły ma ok. 1/7,5. Skalujemy więc
    // kość głowy **tylko wtedy, gdy model naprawdę jest „bobbleheadowy”**;
    // modele o poprawnych proporcjach (Quaternius) zostawiamy nietknięte,
    // bo ich zmniejszanie robiło z ludzi karłów z mikroskopijną głową.
    const headBone = this.sockets.head;
    if (headBone && headBone.scale) {
      const k = opts.headScale ?? autoHeadScale(this.source, headBone);
      if (k < 0.995) {
        headBone.scale.multiplyScalar(k);
        this.headScale = k;
      }
    }
    this.hasClips = Object.keys(this.actions).length > 0;
    if (this.actions.idle) {
      this.actions.idle.play();
      this.actions.idle.weight = 1;
      this.current = 'idle';
    }
  }

  /** Tworzy akcję dla klipu (raz na stan). */
  _makeAction(state, clip) {
    const action = this.mixer.clipAction(clip);
    action.enabled = true;
    action.setLoop(THREE.LoopRepeat, Infinity);
    if (state === 'death') action.setLoop(THREE.LoopOnce, 1);
    action.clampWhenFinished = state === 'death';
    action.weight = 0;
    this.actions[state] = action;
    return action;
  }

  /**
   * Dokłada animacje z biblioteki (Quaternius UAL) przeliczone na ten szkielet.
   * Klipy wbudowane w model mają priorytet — biblioteka tylko uzupełnia braki.
   * @returns {string[]} dodane stany
   */
  addLibrary(library, { rebuild = true } = {}) {
    if (!library?.scene || !library.clips?.length) return [];
    const { clips } = retargetLibrary(library, this.source, LIBRARY_STATE_MAP);
    const added = [];
    for (const [state, clip] of Object.entries(clips)) {
      if (this.clips[state]) continue; // własne animacje modelu są lepsze
      this.clips[state] = clip;
      added.push(state);
      if (rebuild) this._makeAction(state, clip);
    }
    if (rebuild && added.length && !this.current && this.actions.idle) {
      this.actions.idle.play();
      this.actions.idle.weight = 1;
      this.current = 'idle';
    }
    this.libraryAdded = [...new Set([...(this.libraryAdded ?? []), ...added])];
    this.hasClips = Object.keys(this.actions).length > 0;
    return added;
  }

  /** Czy model ma dany klip (np. `run`). */
  has(state) {
    return !!this.actions[state];
  }

  /**
   * Płynne przejście do stanu. Gdy klip nie istnieje, bierzemy najbliższy
   * sensowny (np. bieg → chód → postawa stojąca).
   */
  play(state, { fade = 0.22, rate = 1, reset = false, speed = null } = {}) {
    // tempo animacji dopasowane do faktycznej prędkości — bez „ślizgania stóp”
    if (speed != null) {
      const ref = LIBRARY_REF_SPEED[state];
      if (ref) rate = Math.min(1.9, Math.max(0.55, speed / ref));
    }
    const fallback = {
      run: ['walk', 'idle'], walk: ['run', 'idle'], attack2: ['attack', 'idle'],
      attack3: ['attack', 'idle'], dodge: ['run', 'walk', 'idle'], cast: ['attack', 'idle'],
      block: ['idle'], hurt: ['idle'], talk: ['idle'], sit: ['idle'], wave: ['talk', 'idle'],
      eat: ['talk', 'idle'], death: ['hurt', 'idle'], pickup: ['interact', 'idle'], jump: ['idle'],
      land: ['idle'], dance: ['idle'], swim: ['walk', 'idle'], crouch: ['idle'],
    }[state] ?? ['idle'];
    let key = this.actions[state] ? state : fallback.find((f) => this.actions[f]);
    if (!key) return null;
    if (key === this.current && !reset) {
      const a = this.actions[key];
      a.timeScale = rate;
      return a;
    }
    const next = this.actions[key];
    const prev = this.current ? this.actions[this.current] : null;
    next.reset();
    next.enabled = true;
    next.timeScale = rate;
    next.setEffectiveWeight(1);
    next.play();
    if (prev && prev !== next) {
      prev.crossFadeTo(next, fade, false);
    } else {
      next.fadeIn(fade);
    }
    this.current = key;
    return next;
  }

  /**
   * Podpina przedmiot (miecz, tarczę) do kości dłoni.
   * `orient` ustawia przedmiot tak, aby w postawie spoczynkowej był „prosto”
   * w świecie — modele z zewnątrz mają własne osie kości i bez tego miecz
   * potrafi wylecieć w bok.
   */
  attach(object, socket = 'rightHand', { orient = true } = {}) {
    const bone = this.sockets[socket];
    if (!bone) return false;
    // Kości modeli z zewnątrz bywają w skali 100 (eksport z Blendera), a sama
    // postać jest potem zmniejszana. Bez kompensacji miecz w dłoni rósł do
    // kilkudziesięciu metrów i zasłaniał cały ekran.
    bone.updateWorldMatrix(true, false);
    const ws = bone.getWorldScale(new THREE.Vector3());
    const k = Math.max(0.0001, (ws.x + ws.y + ws.z) / 3);
    object.scale.multiplyScalar(1 / k);
    object.position.multiplyScalar(1 / k);
    if (orient) {
      const world = new THREE.Quaternion();
      bone.getWorldQuaternion(world);
      object.quaternion.premultiply(world.invert());
    }
    bone.add(object);
    return true;
  }

  update(dt) {
    this.mixer.update(dt);
  }

  dispose() {
    this.mixer.stopAllAction();
    this.group.removeFromParent();
  }
}

/**
 * Zamienia stan gry na stan animacji.
 * @param {object} s { state, moving, speed, run, blocking, dead, talking }
 */
export function animStateFor(s = {}) {
  if (s.dead) return 'death';
  if (s.talking) return 'talk';
  if (s.state === 'attack') return s.combo === 2 ? 'attack3' : s.combo === 1 ? 'attack2' : 'attack';
  if (s.state === 'cast') return 'cast';
  if (s.state === 'dodge') return 'dodge';
  if (s.state === 'hurt') return 'hurt';
  if (s.blocking) return 'block';
  if (s.moving) return s.run ? 'run' : 'walk';
  return 'idle';
}
