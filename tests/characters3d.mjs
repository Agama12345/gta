// Test prawdziwych modeli postaci (Quaternius, CC0) i biblioteki animacji.
// Ładuje pliki GLB z `public/assets/models/chars/`, sprawdza dopasowanie kości,
// przeliczanie animacji (retargeting), skalę, gniazda broni i manifest NPC.
//
// Uruchomienie: node tests/characters3d.mjs

import * as fs from 'fs';
import { JSDOM } from 'jsdom';
import { clone as cloneSkinned } from 'three/addons/utils/SkeletonUtils.js';

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost/',
  pretendToBeVisual: true,
});
global.window = dom.window;
global.document = dom.window.document;
global.HTMLElement = dom.window.HTMLElement;
global.self = dom.window;

const THREE = await import('three');
const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');
const { buildBoneMap, collectRigRoles, rigSignature, retargetLibrary } = await import(
  '../src/entities/clipRetarget.js'
);
const { CharacterRig, LIBRARY_STATE_MAP, LIBRARY_REF_SPEED, normalizeRig } = await import(
  '../src/entities/characterRig.js'
);
const { NPCS } = await import('../src/data/dialogue.js');

const CHARS = 'public/assets/models/chars';
let failures = 0;
function check(name, cond, extra = '') {
  if (cond) console.log(`  ✔ ${name}`);
  else {
    failures += 1;
    console.error(`  ✘ ${name} ${extra}`);
  }
}

function load(file) {
  return new Promise((resolve, reject) => {
    const buf = fs.readFileSync(`${CHARS}/${file}`);
    new GLTFLoader().parse(
      buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength),
      '',
      resolve,
      reject
    );
  });
}

console.log('POSTACIE 3D — biblioteka animacji');
const manifest = JSON.parse(fs.readFileSync(`${CHARS}/models.json`, 'utf8'));
check('manifest ma bibliotekę animacji', typeof manifest.library === 'string', manifest.library);
const lib = await load(manifest.library);
check('biblioteka zawiera klipy', lib.animations.length >= 25, String(lib.animations.length));
const needed = Object.values(LIBRARY_STATE_MAP);
const libNames = new Set(lib.animations.map((c) => c.name));
const missingClips = needed.filter((n) => !libNames.has(n));
check('wszystkie stany mają klip w bibliotece', missingClips.length === 0, missingClips.join(','));
check(
  'każdy stan ma sensowną prędkość odniesienia',
  Object.keys(LIBRARY_REF_SPEED).every((k) => LIBRARY_REF_SPEED[k] > 0.5)
);

console.log('\nPOSTACIE 3D — modele i szkielety');
const hero = await load(manifest.hero);
normalizeRig(hero.scene, 1.82);
const heroBox = new THREE.Box3().setFromObject(hero.scene);
const heroHeight = heroBox.max.y - heroBox.min.y;
check('bohater ma ~1,82 m wysokości', Math.abs(heroHeight - 1.82) < 0.15, heroHeight.toFixed(2));
check('bohater stoi na ziemi', Math.abs(heroBox.min.y) < 0.05, heroBox.min.y.toFixed(3));
const heroRoles = collectRigRoles(hero.scene);
// zestaw ról wspólny dla każdego humanoidalnego szkieletu (KayKit, Mixamo, UAL)
const wanted = ['hips', 'spine1', 'spine3', 'head', 'upperArmL', 'upperArmR', 'handL', 'handR', 'upperLegL', 'upperLegR', 'lowerLegL', 'lowerLegR', 'footL', 'footR'];
const missingRoles = wanted.filter((r) => !heroRoles[r]);
check('szkielet bohatera ma wszystkie potrzebne kości', missingRoles.length === 0, missingRoles.join(','));
check('kości dłoni rozpoznane', !!heroRoles.handL && !!heroRoles.handR, `${heroRoles.handL?.name}/${heroRoles.handR?.name}`);
check('model bohatera ma własne animacje (KayKit)', hero.animations.length >= 50, String(hero.animations.length));

const libRoles = collectRigRoles(lib.scene);
check('biblioteka używa innego nazewnictwa kości', !!libRoles.hips && libRoles.hips.name.startsWith('DEF-'), libRoles.hips?.name);

const map = buildBoneMap(lib.scene, hero.scene);
check('wspólnych kości jest co najmniej 15', Object.keys(map).length >= 15, String(Object.keys(map).length));

console.log('\nPOSTACIE 3D — przeliczanie animacji');
// Bohater (KayKit) ma własne 76 klipów, więc bibliotekę przeliczamy na model
// Quaternius — to jego dotyczy retargeting.
const quat = await load(manifest.npcs.marena);
const quatRoles = collectRigRoles(quat.scene);
const t0 = performance.now();
const converted = retargetLibrary({ scene: lib.scene, clips: lib.animations }, quat.scene, LIBRARY_STATE_MAP);
const ms = performance.now() - t0;
check('przeliczono wszystkie stany', Object.keys(converted.clips).length === needed.length, `${Object.keys(converted.clips).length}/${needed.length}`);
check('brak brakujących klipów', converted.missing.length === 0, converted.missing.join(','));
check(`przeliczenie jest szybkie (${Math.round(ms)} ms)`, ms < 3000, `${Math.round(ms)} ms`);

const walk = converted.clips.walk;
const trackNames = walk.tracks.map((tr) => tr.name.replace('.quaternion', ''));
const legBone = quatRoles.upperLegL.name;
const headBone = quatRoles.head.name;
check('ścieżki trafiają w kości modelu', trackNames.includes(legBone) && trackNames.includes(headBone), trackNames.slice(0, 4).join(','));
check('klip ma ruch bioder', walk.tracks.some((tr) => tr.name === `${quatRoles.hips.name}.position`));
const finite = walk.tracks.every((tr) => Array.from(tr.values).every((v) => Number.isFinite(v)));
check('brak NaN w animacji', finite);

// jakość ruchu: stopa nie może uciekać nad głowę ani zapadać się pod ziemię
normalizeRig(quat.scene, 1.82);
const mixer = new THREE.AnimationMixer(quat.scene);
const action = mixer.clipAction(walk);
action.play();
quat.scene.updateMatrixWorld(true);
const foot = quatRoles.footL;
const hips = quatRoles.hips;
const p = new THREE.Vector3();
let minZ = Infinity;
let maxZ = -Infinity;
let minFootY = Infinity;
let minHipsY = Infinity;
let maxHipsY = -Infinity;
for (let i = 0; i < 40; i += 1) {
  mixer.setTime((walk.duration * i) / 40);
  foot.getWorldPosition(p);
  minZ = Math.min(minZ, p.z);
  maxZ = Math.max(maxZ, p.z);
  minFootY = Math.min(minFootY, p.y);
  hips.getWorldPosition(p);
  minHipsY = Math.min(minHipsY, p.y);
  maxHipsY = Math.max(maxHipsY, p.y);
}
const stride = maxZ - minZ;
check('krok ma sensowną długość (0,4–1,2 m)', stride > 0.4 && stride < 1.2, stride.toFixed(2));
check('stopa nie zapada się pod ziemię', minFootY > -0.12, minFootY.toFixed(2));
check('biodra na wysokości 0,7–1,0 m', minHipsY > 0.7 && maxHipsY < 1.05, `${minHipsY.toFixed(2)}–${maxHipsY.toFixed(2)}`);
action.stop();

console.log('\nPOSTACIE 3D — sterownik i mieszkańcy');
const freshHero = await load(manifest.hero);
const rig = new CharacterRig(freshHero, {
  targetHeight: 1.82,
  library: { scene: lib.scene, clips: lib.animations },
});
check('sterownik dostał animacje z biblioteki', rig.has('walk') && rig.has('attack') && rig.has('talk'), Object.keys(rig.actions).join(','));
check('gniazdo prawej dłoni działa', !!rig.sockets.rightHand, rig.sockets.rightHand?.name ?? 'brak');
check('gniazdo lewej dłoni działa', !!rig.sockets.leftHand, rig.sockets.leftHand?.name ?? 'brak');
// materiały: tkaniny bez metaliczności, metale lekko błyszczące
let clothOk = 0;
let metalOk = 0;
rig.group.traverse((o) => {
  if (!o.isMesh || !o.material) return;
  const mats = Array.isArray(o.material) ? o.material : [o.material];
  for (const m of mats) {
    if (!('metalness' in m)) continue;
    if (/metal|gold|armor/i.test(m.name ?? '')) metalOk += m.metalness > 0.2 ? 1 : -100;
    else clothOk += m.metalness < 0.1 && m.roughness >= 0.5 ? 1 : -100;
  }
});
check('tkaniny nie są metaliczne', clothOk > 5, String(clothOk));
check('metale zachowały połysk', metalOk >= 0, String(metalOk));
const box = new THREE.Box3().setFromObject(rig.group);
check('model po normalizacji ma ~1,8 m', Math.abs(box.max.y - box.min.y - 1.82) < 0.1, (box.max.y - box.min.y).toFixed(2));
rig.play('walk', { speed: 2.9 });
check('tempo chodu dopasowane do prędkości', rig.actions.walk.timeScale > 1.4, rig.actions.walk.timeScale.toFixed(2));
rig.dispose();

const npcIds = Object.keys(NPCS);
const mapped = Object.keys(manifest.npcs ?? {});
const withoutModel = npcIds.filter((id) => !mapped.includes(id));
check('każdy NPC ma własny model', withoutModel.length === 0, withoutModel.join(','));
check('manifest nie zawiera nieistniejących NPC', mapped.every((id) => npcIds.includes(id)), mapped.filter((id) => !npcIds.includes(id)).join(','));

const files = new Set(Object.values(manifest.npcs ?? {}).concat(manifest.hero));
for (const file of files) {
  const exists = fs.existsSync(`${CHARS}/${file}`);
  if (!exists) check(`plik ${file} istnieje`, false);
}
check('wszystkie pliki modeli istnieją', [...files].every((f) => fs.existsSync(`${CHARS}/${f}`)), [...files].join(','));

// inny szkielet w projekcie (KayKit, przeciwnicy) — retarget musi go obsłużyć
const otherGltf = await load('Skeleton_Warrior.glb');
const otherRoles = collectRigRoles(otherGltf.scene);
check('obcy szkielet rozpoznany', !!otherRoles.hips && !!otherRoles.handR, Object.keys(otherRoles).length);
check('obcy model ma własne animacje', otherGltf.animations.length >= 8, String(otherGltf.animations.length));
const otherMap = buildBoneMap(lib.scene, otherGltf.scene);
check('animacje biblioteki pasują też do obcego szkieletu', Object.keys(otherMap).length >= 14, String(Object.keys(otherMap).length));
const quatHero = await load(manifest.npcs.marena); // Quaternius — inny szkielet niż KayKit
check('sygnatury szkieletów się różnią', rigSignature(hero.scene) !== rigSignature(quatHero.scene));

// uszkodzony eksport (NaN w wagach skórowania) musi zostać naprawiony w locie
const brokenGltf = await load(manifest.npcs.iskra);
const brokenScene = cloneSkinned(brokenGltf.scene);
let brokenMesh = null;
brokenScene.traverse((o) => { if (o.isSkinnedMesh && !brokenMesh) brokenMesh = o; });
const w = brokenMesh.geometry.attributes.skinWeight;
w.setX(0, NaN);
w.needsUpdate = true;
const brokenRig = new CharacterRig({ scene: brokenScene, animations: brokenGltf.animations }, {
  targetHeight: 1.78,
  library: { scene: lib.scene, clips: lib.animations },
});
const brokenBox = new THREE.Box3().setFromObject(brokenRig.group);
const brokenH = brokenBox.max.y - brokenBox.min.y;
check('model z NaN w wagach został naprawiony', brokenRig.repaired >= 1, String(brokenRig.repaired));
check('naprawiony model ma poprawną wysokość', Number.isFinite(brokenH) && brokenH > 1.5 && brokenH < 2.2, brokenH.toFixed(2));
brokenRig.dispose();

console.log('\nPOSTACIE 3D — wszyscy mieszkańcy');
let npcOk = 0;
let tintedOk = 0;
for (const [id, file] of Object.entries(manifest.npcs)) {
  const gltf = await load(file);
  const def = NPCS[id];
  const rig = new CharacterRig(gltf, {
    targetHeight: def.visual?.bulk ? 1.85 * Math.min(1.15, def.visual.bulk) : 1.78,
    name: def.name,
    library: { scene: lib.scene, clips: lib.animations },
    tint: def.visual,
  });
  const box = new THREE.Box3().setFromObject(rig.group);
  const h = box.max.y - box.min.y;
  const states = ['idle', 'walk', 'talk'].every((st) => rig.has(st));
  if (states && h > 1.55 && h < 2.3) npcOk += 1;
  else check(`${def.name}: model i animacje`, false, `${h.toFixed(2)} m, stany: ${Object.keys(rig.actions).join(',')}`);
  // czy kolory z definicji trafiły na materiały
  let changed = 0;
  rig.group.traverse((o) => {
    if (!o.isMesh || !o.material) return;
    const mats = Array.isArray(o.material) ? o.material : [o.material];
    for (const m of mats) {
      const hex = m.color ? `#${m.color.getHexString()}` : '';
      if (Object.values(def.visual ?? {}).some((c) => typeof c === 'string' && c.toLowerCase() === hex)) changed += 1;
    }
  });
  let textured = false;
  rig.group.traverse((o) => {
    if (!o.isMesh || !o.material) return;
    const mats = Array.isArray(o.material) ? o.material : [o.material];
    // model teksturowany (KayKit) nie potrzebuje tintu — ma własną teksturę
    if (mats.some((m) => m?.map || /texture/i.test(m?.name ?? ''))) textured = true;
  });
  if (changed > 0 || textured) tintedOk += 1;
  rig.dispose();
}
check(`wszyscy mieszkańcy mają model i animacje (${npcOk}/${Object.keys(manifest.npcs).length})`, npcOk === Object.keys(manifest.npcs).length);
check(`kolory postaci trafiły na modele (${tintedOk}/${Object.keys(manifest.npcs).length})`, tintedOk >= Object.keys(manifest.npcs).length - 1);

console.log('\nPOSTACIE 3D — mieszkańcy w grze');
const { NPC } = await import('../src/entities/npc.js');
const fakeGame = {
  scene: new THREE.Scene(),
  assets: { custom: { hero: { scene: hero.scene, animations: [], height: 1.86, library: { scene: lib.scene, clips: lib.animations } }, npcs: {} }, chars: {} },
  audio: { step() {}, gainFor: () => 1, _panFor: () => 0 },
  dayNight: { hour: 12 },
  dialogue: { npcId: null },
  ui: {},
};
// modele mieszkańców w postaci, jaką widzi gra
for (const [id, file] of Object.entries(manifest.npcs)) {
  const gltf = await load(file);
  fakeGame.assets.custom.npcs[id] = {
    scene: gltf.scene,
    animations: [],
    height: 1.8,
    file,
    library: { scene: lib.scene, clips: lib.animations },
  };
}
let npcAlive = 0;
const testPlayer = { pos: new THREE.Vector3(NPCS.borys.pos[0] + 2, 0, NPCS.borys.pos[1]) };
for (const [id, def] of Object.entries(NPCS)) {
  try {
    const npc = new NPC(fakeGame, id, def);
    for (let i = 0; i < 8; i += 1) npc.update(0.2, testPlayer);
    if (npc.rig?.group?.parent && npc.model.visible !== undefined) npcAlive += 1;
    npc.rig?.dispose?.();
  } catch (err) {
    check(`${def.name}: konstrukcja i ruch`, false, err?.message ?? String(err));
  }
}
check(`wszyscy mieszkańcy działają w grze (${npcAlive}/${Object.keys(NPCS).length})`, npcAlive === Object.keys(NPCS).length);

if (failures) {
  console.error(`\n${failures} test(ów) nie przeszło.`);
  process.exit(1);
}
console.log('\nModele postaci 3D OK');
