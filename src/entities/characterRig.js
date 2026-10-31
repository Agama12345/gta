import * as THREE from 'three';

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
  attack: ['attack', 'attack1', 'slash', 'swordslash', 'melee', 'swordattack', 'attack01'],
  attack2: ['attack2', 'attack02', 'slash2', 'combo2', 'swordslash2'],
  attack3: ['attack3', 'attack03', 'heavyslash', 'finisher', 'combo3'],
  block: ['block', 'blocking', 'guard', 'shieldblock', 'parry'],
  dodge: ['dodge', 'roll', 'evade', 'backflip', 'dodgeforward'],
  cast: ['cast', 'spell', 'magic', 'castspell', 'channel'],
  hurt: ['hurt', 'hit', 'damage', 'impact', 'flinch', 'hurt01'],
  death: ['death', 'die', 'dying', 'death01', 'dead'],
  talk: ['talk', 'speak', 'talk01', 'gesture', 'conversation'],
  sit: ['sit', 'rest', 'sitting', 'sitidle'],
  wave: ['wave', 'greet', 'hello'],
  eat: ['eat', 'drink', 'consume'],
};

const norm = (s) => String(s ?? '').toLowerCase().replace(/[^a-z0-9]/g, '');

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

/** Szuka kości-gniazda po nazwie (obsługuje prefiks `mixamorig:`). */
export function findSocket(root, names) {
  let found = null;
  if (!root) return null;
  const wanted = names.map(norm);
  root.traverse((o) => {
    if (found || !o.name) return;
    const key = norm(o.name);
    if (wanted.some((w) => key === w || key.endsWith(w))) found = o;
  });
  return found;
}

/** Skaluje model do docelowego wzrostu i ustawia stopy na y = 0. */
export function normalizeRig(scene, targetHeight = 1.85) {
  const holder = new THREE.Group();
  holder.add(scene);
  scene.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(scene);
  const size = new THREE.Vector3();
  box.getSize(size);
  const height = Math.max(0.001, size.y);
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
 * Sterownik animacji postaci z zewnętrznego pliku.
 * Używa AnimationMixer + crossfade; poziom sterowania jest ten sam dla
 * bohatera i mieszkańców (stany: idle, walk, run, attack, hurt, death, talk…).
 */
export class CharacterRig {
  constructor(gltf, { targetHeight = 1.85, name = 'postać' } = {}) {
    this.name = name;
    this.source = gltf.scene;
    const { holder, scale } = normalizeRig(this.source, targetHeight);
    this.group = holder;
    this.scale = scale;
    this.mixer = new THREE.AnimationMixer(this.source);
    const { clips, unmatched } = matchClips(gltf.animations ?? []);
    this.clips = clips;
    this.unmatched = unmatched;
    this.actions = {};
    for (const [state, clip] of Object.entries(clips)) {
      const action = this.mixer.clipAction(clip);
      action.enabled = true;
      action.setLoop(THREE.LoopRepeat, Infinity);
      if (state === 'death') action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = state === 'death';
      action.weight = 0;
      this.actions[state] = action;
    }
    this.current = null;
    this.sockets = {
      rightHand: findSocket(this.source, HAND_ALIASES.right),
      leftHand: findSocket(this.source, HAND_ALIASES.left),
      head: findSocket(this.source, HAND_ALIASES.head),
      spine: findSocket(this.source, HAND_ALIASES.spine),
    };
    this.hasClips = Object.keys(this.actions).length > 0;
    if (this.actions.idle) {
      this.actions.idle.play();
      this.actions.idle.weight = 1;
      this.current = 'idle';
    }
  }

  /** Czy model ma dany klip (np. `run`). */
  has(state) {
    return !!this.actions[state];
  }

  /**
   * Płynne przejście do stanu. Gdy klip nie istnieje, bierzemy najbliższy
   * sensowny (np. bieg → chód → postawa stojąca).
   */
  play(state, { fade = 0.22, rate = 1, reset = false } = {}) {
    const fallback = {
      run: ['walk', 'idle'], walk: ['run', 'idle'], attack2: ['attack', 'idle'],
      attack3: ['attack', 'idle'], dodge: ['run', 'walk', 'idle'], cast: ['attack', 'idle'],
      block: ['idle'], hurt: ['idle'], talk: ['idle'], sit: ['idle'], wave: ['talk', 'idle'],
      eat: ['talk', 'idle'], death: ['hurt', 'idle'],
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

  /** Podpina przedmiot (miecz, tarczę) do kości dłoni. */
  attach(object, socket = 'rightHand') {
    const bone = this.sockets[socket];
    if (!bone) return false;
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
