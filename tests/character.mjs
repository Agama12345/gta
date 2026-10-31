// Test warstwy modeli postaci: dopasowanie klipów, skalowanie, gniazda kości,
// mapowanie stanów gry i ładowanie manifestu `chars/models.json`.
// Nie potrzebuje przeglądarki ani żadnego pliku GLB w repozytorium.

import * as THREE from 'three';

// jsdom tylko dla `document`, którego potrzebuje reszta modułów gry
import { JSDOM } from 'jsdom';
const dom = new JSDOM('<!doctype html><html><body><div id="ui"></div></body></html>', {
  pretendToBeVisual: true,
  url: 'http://localhost/',
});
global.window = dom.window;
global.document = dom.window.document;
Object.defineProperty(global, 'navigator', { value: dom.window.navigator, configurable: true });
global.HTMLElement = dom.window.HTMLElement;

const { matchClips, findSocket, normalizeRig, animStateFor, CharacterRig, CLIP_ALIASES } =
  await import('../src/entities/characterRig.js');
const { loadCustomCharacters } = await import('../src/core/assets.js');

let failures = 0;
function check(name, cond, extra = '') {
  if (cond) console.log(`  ✔ ${name}`);
  else {
    failures += 1;
    console.error(`  ✘ ${name} ${extra}`);
  }
}

console.log('POSTACIE — dopasowanie klipów');
const clips = [
  { name: 'Armature|Idle_01', duration: 2 },
  { name: 'WalkFwd', duration: 1 },
  { name: 'mixamorig_run', duration: 0.8 },
  { name: 'SwordSlash_2', duration: 0.6 },
  { name: 'Death01', duration: 1.5 },
  { name: 'HappyDance', duration: 3 },
];
const matched = matchClips(clips);
check('idle rozpoznany', matched.clips.idle?.name === 'Armature|Idle_01', matched.clips.idle?.name);
check('walk rozpoznany', matched.clips.walk?.name === 'WalkFwd', matched.clips.walk?.name);
check('run rozpoznany', matched.clips.run?.name === 'mixamorig_run', matched.clips.run?.name);
check('atak rozpoznany', matched.clips.attack?.name === 'SwordSlash_2', matched.clips.attack?.name);
check('śmierć rozpoznana', matched.clips.death?.name === 'Death01', matched.clips.death?.name);
check('nieznany klip zgłoszony', matched.unmatched.includes('HappyDance'), matched.unmatched.join(','));
check('każdy stan ma aliasy', Object.values(CLIP_ALIASES).every((a) => Array.isArray(a) && a.length >= 2));

console.log('\nPOSTACIE — kości i skala');
const root = new THREE.Group();
const hips = new THREE.Object3D();
hips.name = 'mixamorig:Hips';
const hand = new THREE.Object3D();
hand.name = 'mixamorig:RightHand';
hips.add(hand);
root.add(hips);
check('gniazdo prawej dłoni znalezione', findSocket(root, ['righthand']) === hand);
check('gniazdo głowy nie istnieje', findSocket(root, ['head']) === null);

const body = new THREE.Mesh(new THREE.BoxGeometry(0.4, 2, 0.3), new THREE.MeshBasicMaterial());
body.position.y = 1; // stopy na 0, czubek na 2
const holder = new THREE.Group();
holder.add(body);
const norm = normalizeRig(new THREE.Group().add(body), 1.8);
check('skala doprowadza wzrost do 1,8 m', Math.abs(norm.scale - 0.9) < 0.001, String(norm.scale));
const boxAfter = new THREE.Box3().setFromObject(body);
check('stopy po normalizacji są przy y≈0', Math.abs(boxAfter.min.y) < 0.01, String(boxAfter.min.y));

console.log('\nPOSTACIE — stany gry');
check('bieg', animStateFor({ moving: true, run: true }) === 'run');
check('chód', animStateFor({ moving: true }) === 'walk');
check('stanie', animStateFor({}) === 'idle');
check('atak z kombinacji 2', animStateFor({ state: 'attack', combo: 1 }) === 'attack2');
check('blok', animStateFor({ blocking: true }) === 'block');
check('śmierć ma priorytet', animStateFor({ blocking: true, dead: true }) === 'death');

console.log('\nPOSTACIE — brak modeli = brak błędów');
const fakeLib = { custom: { hero: null, npcs: {} }, failed: [], loaded: 0 };
const origFetch = global.fetch;
global.fetch = async () => ({ ok: false, status: 404, text: async () => '' });
await loadCustomCharacters({ loadAsync: async () => { throw new Error('nie ma'); } }, fakeLib);
check('brak manifestu nie rzuca i nie ładuje niczego', fakeLib.custom.hero === null && fakeLib.failed.length === 0);

const fakeClip = (name) => new THREE.AnimationClip(name, 1, [
  new THREE.VectorKeyframeTrack('.position', [0, 1], [0, 0, 0, 0, 0, 0]),
]);
const fakeGltf = {
  scene: new THREE.Group(),
  animations: [fakeClip('Idle'), fakeClip('Walk')],
};
global.fetch = async () => ({
  ok: true,
  status: 200,
  text: async () => JSON.stringify({ hero: 'hero.glb', npcs: { eryn: 'npc_eryn.glb' } }),
});
const lib2 = { custom: { hero: null, npcs: {} }, failed: [], loaded: 0 };
await loadCustomCharacters({ loadAsync: async () => fakeGltf }, lib2);
check('manifest wczytuje bohatera', !!lib2.custom.hero);
check('manifest wczytuje mieszkańca', !!lib2.custom.npcs.eryn);
check('klipy trafiają do wpisu', lib2.custom.hero.animations.length === 2);

// brak pliku postaci przy poprawnym manifeście
const lib3 = { custom: { hero: null, npcs: {} }, failed: [], loaded: 0 };
await loadCustomCharacters({ loadAsync: async () => { throw new Error('404'); } }, lib3);
check('błędny plik trafia na listę failed', lib3.failed.length === 2, lib3.failed.join(','));

global.fetch = origFetch;

console.log('\nPOSTACIE — sterownik animacji');
const rig = new CharacterRig({ scene: fakeGltf.scene, animations: fakeGltf.animations }, { name: 'test' });
check('rig ma akcje idle/walk', rig.has('idle') && rig.has('walk'));
check('rig ma mixer', !!rig.mixer);
check('brak kości dłoni nie wywala przypinania', rig.attach(new THREE.Object3D(), 'rightHand') === false);
rig.play('run'); // brak klipu biegu → powinien zejść do walk
check('fallback run → walk', rig.current === 'walk', String(rig.current));
rig.update(0.016);
rig.dispose();
check('dispose nie rzuca', true);

console.error(failures ? `\n${failures} niepowodzeń` : '\nWarstwa postaci OK');
process.exit(failures ? 1 : 0);
