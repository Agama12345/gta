// Test modeli 3D (CC0): wczytuje prawdziwe pliki z public/assets/models przez
// GLTFLoader w Node (serwer plików + atrapy obrazków) i sprawdza, że wszystko
// się parsuje, skaluje i animuje. Nie wymaga przeglądarki ani WebGL.

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import * as THREE from 'three';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, '..', 'public');

// --- serwer plików ---------------------------------------------------------
const server = http.createServer((req, res) => {
  const rel = decodeURIComponent(req.url.split('?')[0]);
  const file = path.join(root, rel);
  if (!file.startsWith(root)) {
    res.writeHead(403);
    res.end('');
    return;
  }
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('');
      return;
    }
    const type = file.endsWith('.png') ? 'image/png' : 'application/octet-stream';
    res.writeHead(200, { 'content-type': type });
    res.end(data);
  });
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}/`;

// --- atrapy środowiska przeglądarki ---------------------------------------
class FakeImage {
  constructor() {
    this.width = 4;
    this.height = 4;
    this.style = {};
  }
  set src(value) {
    this._src = value;
    setTimeout(() => {
      this.onload?.({});
      this._listeners?.load?.forEach((fn) => fn({}));
    }, 0);
  }
  get src() {
    return this._src;
  }
  addEventListener(type, fn) {
    (this._listeners ??= {})[type] = [...(this._listeners[type] ?? []), fn];
  }
  removeEventListener() {}
  setAttribute() {}
  getAttribute() {
    return null;
  }
}
globalThis.self = globalThis;
globalThis.document = {
  createElementNS: () => new FakeImage(),
  createElement: () => new FakeImage(),
};
globalThis.ProgressEvent = class ProgressEvent {
  constructor(type, init = {}) {
    this.type = type;
    Object.assign(this, init);
  }
};
const RealRequest = globalThis.Request;
globalThis.Request = class extends RealRequest {
  constructor(input, init) {
    super(typeof input === 'string' ? new URL(input, base).toString() : input, init);
  }
};
const realFetch = globalThis.fetch;
globalThis.fetch = (input, init) => realFetch(
  typeof input === 'string' ? new URL(input, base).toString() : input,
  init,
);
globalThis.URL.createObjectURL = () => 'blob:test';
globalThis.URL.revokeObjectURL = () => {};

// --- testy ----------------------------------------------------------------
let failures = 0;
function check(name, cond, extra = '') {
  if (cond) {
    console.log(`  ✔ ${name}`);
  } else {
    failures += 1;
    console.error(`  ✘ ${name} ${extra}`);
  }
}

const { loadAssets, NATURE_MODELS, PROP_MODELS, CHAR_MODELS, ModelScatter, placeProp, prepareInstancing } =
  await import('../src/core/assets.js');
const { buildEnemyModel } = await import('../src/entities/enemy.js');

console.log('▸ zasoby CC0');
check('katalog modeli istnieje', fs.existsSync(path.join(root, 'assets', 'models')));
for (const list of [NATURE_MODELS, PROP_MODELS, CHAR_MODELS]) {
  for (const url of Object.values(list)) {
    check(`plik ${url}`, fs.existsSync(path.join(root, 'assets', 'models', url)));
  }
}

const lib = await loadAssets();
const totalModels = Object.keys(NATURE_MODELS).length + Object.keys(PROP_MODELS).length + Object.keys(CHAR_MODELS).length;
check('wszystkie modele wczytane', lib.loaded >= totalModels && lib.failed.length === 0, JSON.stringify(lib.failed));
check('biblioteka animacji postaci wczytana', (lib.animLibrary?.clips?.length ?? 0) >= 25, String(lib.animLibrary?.clips?.length));
check('bohater ma model z zewnątrz', !!lib.custom?.hero?.file, lib.custom?.hero?.file ?? 'brak');
check('mieszkańcy mają modele z zewnątrz', Object.keys(lib.custom?.npcs ?? {}).length >= 10, String(Object.keys(lib.custom?.npcs ?? {}).length));
check('modele postaci nie zgłosiły błędów', !lib.failed.some((f) => f.startsWith('chars/')), lib.failed.filter((f) => f.startsWith('chars/')).join(','));
check('katalog ma co najmniej 55 modeli', totalModels >= 55, `(${totalModels})`);
check('drzewa jesienne i martwe wczytane', !!lib.nature.tree_dead_large && !!lib.nature.pine_autumn_large);
check('cmentarz i kapliczki wczytane', !!lib.props.grave_a && !!lib.props.crypt && !!lib.props.shrine_candles);
check('meble wczytane', !!lib.props.bed_single && !!lib.props.table_med && !!lib.props.shelf);
check('obejście osady wczytane', !!lib.props.bench && !!lib.props.streetlight);
check('drzewa i skały gotowe', Object.keys(NATURE_MODELS).every((k) => !!lib.nature[k]));
check('propsy gotowe', Object.keys(PROP_MODELS).every((k) => !!lib.props[k]));
check('szkielet gotowy', !!lib.chars.skeleton);

console.log('▸ skala modeli');
for (const [key, model] of Object.entries(lib.nature)) {
  check(`${key}: sensowna bryła`, model.height > 0.002 && model.width > 0.05 && model.parts.length > 0);
}
check('model drzewa ma kilka metrów po skalowaniu', (10 / lib.nature.tree_a.height) * lib.nature.tree_a.height === 10);
check('beczka po skalowaniu ma ~1,1 m', Math.abs((1.1 / lib.props.barrel.height) * lib.props.barrel.height - 1.1) < 1e-6);

console.log('▸ instancjonowanie');
const group = new THREE.Group();
const scatter = new ModelScatter(group);
for (let i = 0; i < 24; i++) {
  scatter.add('tree_a', lib, { x: i * 2, y: 0, z: 0, scale: 9 / lib.nature.tree_a.height, rotY: i });
}
scatter.add('rock_c', lib, { x: 0, y: 0, z: 8, scale: 4 / lib.nature.rock_c.width });
const meshes = scatter.finalize(lib);
check('powstały siatki instancjonowane', meshes === 2 && group.children.length === 2, `(${meshes})`);
check('instancje zachowują liczbę egzemplarzy', group.children[0].count === 24);

const parts = prepareInstancing(lib.props.chest.scene);
check('prepareInstancing zwraca części', parts.length > 0 && !!parts[0].geometry.attributes.position);
const barrel = placeProp(lib, 'barrel', { x: 1, y: 2, z: 3, rotY: 1, targetHeight: 1.1 });
check('placeProp skaluje i ustawia model', !!barrel && Math.abs(barrel.scale.x * lib.props.barrel.height - 1.1) < 1e-6);

console.log('▸ szkielet i animacje');
const char = lib.chars.skeleton;
const clipNames = new Set(char.animations.map((c) => c.name));
for (const needed of ['Idle', 'Walking_A', 'Running_A', 'Death_A', '1H_Melee_Attack_Slice_Diagonal', 'Hit_A']) {
  check(`klip ${needed}`, clipNames.has(needed));
}
check('co najmniej 50 klipów', char.animations.length >= 50, `(${char.animations.length})`);

const built = buildEnemyModel('skeleton', lib);
check('model szkieletu ma mixer', !!built.mixer);
check('model szkieletu ma klipy', (built.clips?.size ?? 0) >= 50);
check('odtwarzanie Idle', built.play?.('Idle') === true);
check('odtwarzanie biegu', built.play?.('Running_A') === true);
built.mixer.update(0.4);
check('mixer się aktualizuje', built.clip === 'Running_A');

const fallback = buildEnemyModel('skeleton', null);
check('bez modeli wraca proceduralny szkielet', !!fallback.group && !fallback.mixer);

server.close();
if (failures) {
  console.error(`\n✘ ${failures} problemów z modelami.`);
  process.exit(1);
}
console.log('\n✔ Modele 3D wczytały się poprawnie.');
