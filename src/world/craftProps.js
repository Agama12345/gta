// ---------------------------------------------------------------------------
// Sprzęt, narzędzia i budowle, których nie było w paczkach CC0.
//
// Lista użytkownika wymieniała rzeczy, których żadna darmowa paczka nie ma
// w sensownej formie (szubienica, armata, widły, kosa, kilof, motyka, wiadro,
// zwój, worek z ziarnem, klucz, stragan). Zamiast czekać na pliki, rysujemy je
// z bryłek — tak samo jak resztę świata — i wstawiamy w miejsca, gdzie
// naturalnie stoją: kuźnia, targ, kopalnia, gospoda, rozdroże.
//
// Wszystko jest tanie: te grupy idą przez `PropBatcher`, więc cała wioska
// z narzędziami to nadal kilka wywołań rysowania, a nie sto.
// ---------------------------------------------------------------------------
import * as THREE from 'three';
import { mat } from './models.js';

const WOOD = '#5a3f26';
const WOOD_LIGHT = '#7a5a34';
const IRON = '#3f4247';
const STEEL = '#8e979e';
const ROPE = '#8a7a56';
const CLOTH_RED = '#7d3a32';
const CLOTH_CREAM = '#c9bb9a';

function mesh(geo, material, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(geo, material);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

const box = (w, h, d) => new THREE.BoxGeometry(w, h, d);
const cyl = (rt, rb, h, seg = 8) => new THREE.CylinderGeometry(rt, rb, h, seg);

/**
 * Szubienica: dwie belki, poprzeczka, pomost, pętla.
 * Stoi tam, gdzie prawo jest widoczne z daleka — na rozdrożu.
 */
export function makeGallows() {
  const g = new THREE.Group();
  const wood = mat(WOOD, { rough: 0.94 });
  const dark = mat('#3e2a1a', { rough: 0.95 });

  // pomost z desek
  const deck = mesh(box(2.6, 0.34, 2.2), dark, 0, 0.17, 0);
  g.add(deck);
  for (let i = 0; i < 5; i++) {
    g.add(mesh(box(2.5, 0.05, 0.34), wood, 0, 0.36, -0.8 + i * 0.4));
  }
  // schodki
  for (let i = 0; i < 3; i++) {
    g.add(mesh(box(1.2, 0.16, 0.34), wood, 0, 0.08 + i * 0.16, 1.2 + i * 0.34));
  }

  // słupy i poprzeczka
  const post = cyl(0.11, 0.13, 2.8, 6);
  g.add(mesh(post, wood, -0.95, 1.78, -0.55));
  g.add(mesh(post, wood, 0.95, 1.78, -0.55));
  const beam = mesh(box(2.5, 0.2, 0.2), wood, 0, 3.12, -0.55);
  g.add(beam);
  // zastrzały
  for (const sx of [-1, 1]) {
    const brace = mesh(box(0.13, 0.9, 0.13), wood, sx * 0.72, 2.72, -0.55);
    brace.rotation.z = sx * 0.5;
    g.add(brace);
  }

  // lina i pętla
  const rope = mat(ROPE, { rough: 0.98 });
  g.add(mesh(cyl(0.025, 0.025, 1.05, 5), rope, 0, 2.5, -0.55));
  const noose = mesh(new THREE.TorusGeometry(0.15, 0.026, 5, 10), rope, 0, 1.98, -0.55);
  noose.rotation.x = Math.PI / 2;
  g.add(noose);
  return g;
}

/**
 * Stragan z rynku: cztery słupy, płócienny daszek, lada i towar.
 * `variant` zmienia kolor płótna, żeby targ nie wyglądał na jeden sklep.
 */
export function makeMarketStall(variant = 0) {
  const g = new THREE.Group();
  const wood = mat(WOOD_LIGHT, { rough: 0.92 });
  const cloth = variant % 2 === 0 ? CLOTH_RED : CLOTH_CREAM;

  const w = 2.8;
  const d = 1.9;
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      g.add(mesh(cyl(0.065, 0.075, 2.3, 6), wood, (sx * w) / 2, 1.15, (sz * d) / 2));
    }
  }
  // lada
  g.add(mesh(box(w - 0.2, 0.1, d - 0.3), wood, 0, 0.92, 0));
  g.add(mesh(box(w - 0.3, 0.62, 0.1), mat('#4a3520'), 0, 0.61, (d - 0.3) / 2));
  // deski blatu
  for (let i = 0; i < 4; i++) {
    g.add(mesh(box(w - 0.25, 0.04, 0.22), mat('#8a6a44', { rough: 0.9 }), 0, 0.98, -0.6 + i * 0.4));
  }
  // daszek z dwóch połaci — lekko opadający do przodu
  for (const sx of [-1, 1]) {
    const sail = mesh(box(w / 2 + 0.25, 0.06, d + 0.7), mat(variant % 2 === 0 ? cloth : CLOTH_RED, { rough: 0.97, flat: true }));
    sail.position.set((sx * w) / 4, 2.28, 0);
    sail.rotation.z = sx * 0.16;
    g.add(sail);
  }
  // pasy płótna
  for (let i = 0; i < 3; i++) {
    g.add(mesh(box(w + 0.4, 0.05, 0.1), mat(cloth, { rough: 0.97 }), 0, 2.24, -0.55 + i * 0.55));
  }
  // towar na ladzie: skrzynki, kapusta, bochenki
  const crate = mat('#6d5334', { rough: 0.92 });
  g.add(mesh(box(0.5, 0.22, 0.4), crate, -0.75, 1.1, 0.15));
  g.add(mesh(box(0.5, 0.22, 0.4), crate, -0.75, 1.32, 0.15));
  const veg = mat('#6f8a44', { rough: 0.85 });
  for (let i = 0; i < 4; i++) {
    g.add(mesh(new THREE.SphereGeometry(0.11, 6, 5), veg, -0.9 + (i % 2) * 0.28, 1.5, 0.05 + Math.floor(i / 2) * 0.26));
  }
  const bread = mat('#a87b46', { rough: 0.88 });
  for (let i = 0; i < 3; i++) {
    const loaf = mesh(new THREE.SphereGeometry(0.12, 6, 4), bread, 0.2 + i * 0.3, 1.08, 0.2);
    loaf.scale.set(1.5, 0.8, 1);
    g.add(loaf);
  }
  return g;
}

/** Armata na lawecie — port i posterunek straży. */
export function makeCannon() {
  const g = new THREE.Group();
  const iron = mat(IRON, { metal: 0.7, rough: 0.5 });
  const wood = mat('#4b3520', { rough: 0.93 });

  // lufa
  const barrel = mesh(cyl(0.13, 0.19, 1.7, 10), iron, 0, 0.62, 0.1);
  barrel.rotation.x = Math.PI / 2 - 0.12;
  g.add(barrel);
  g.add(mesh(cyl(0.2, 0.2, 0.1, 10), mat('#2c2f33', { metal: 0.8, rough: 0.4 }), 0, 0.72, -0.75));
  // wzmocnienia
  for (const z of [-0.42, 0.1, 0.62]) {
    const ring = mesh(cyl(0.185, 0.185, 0.07, 10), mat('#2f3236', { metal: 0.8, rough: 0.45 }), 0, 0.63, z);
    ring.rotation.x = Math.PI / 2 - 0.12;
    g.add(ring);
  }
  // łoże
  g.add(mesh(box(0.62, 0.24, 1.5), wood, 0, 0.34, 0));
  g.add(mesh(box(0.44, 0.2, 0.5), wood, 0, 0.22, -0.72));
  // koła
  const wheel = new THREE.CylinderGeometry(0.34, 0.34, 0.1, 12);
  const rim = new THREE.TorusGeometry(0.34, 0.045, 5, 12);
  for (const sx of [-1, 1]) {
    for (const z of [-0.42, 0.42]) {
      const w = mesh(wheel, wood, sx * 0.36, 0.34, z);
      w.rotation.z = Math.PI / 2;
      g.add(w);
      const r = mesh(rim, mat('#2f2b26', { metal: 0.5, rough: 0.6 }), sx * 0.36, 0.34, z);
      r.rotation.y = Math.PI / 2;
      g.add(r);
    }
  }
  return g;
}

/** Wiadro z obręczami i pałąkiem. */
export function makeBucket() {
  const g = new THREE.Group();
  const wood = mat('#6d4f30', { rough: 0.95 });
  const band = mat('#5b5f64', { metal: 0.6, rough: 0.55 });
  g.add(mesh(new THREE.CylinderGeometry(0.15, 0.12, 0.3, 10, 1, true), wood, 0, 0.15, 0));
  g.add(mesh(new THREE.CircleGeometry(0.12, 10), wood, 0, 0.005, 0).rotateX(-Math.PI / 2));
  for (const y of [0.06, 0.24]) {
    g.add(mesh(new THREE.TorusGeometry(0.142, 0.012, 4, 10), band, 0, y, 0).rotateX(Math.PI / 2));
  }
  const handle = mesh(new THREE.TorusGeometry(0.15, 0.011, 4, 10, Math.PI), band, 0, 0.3, 0);
  g.add(handle);
  return g;
}

/** Kosa: kosidło, okucie, wygięte ostrze. */
export function makeScythe() {
  const g = new THREE.Group();
  const shaft = mesh(cyl(0.028, 0.032, 1.65, 6), mat(WOOD, { rough: 0.93 }), 0, 0.82, 0);
  shaft.rotation.z = 0.14;
  g.add(shaft);
  // dwa uchwyty
  g.add(mesh(cyl(0.022, 0.022, 0.16, 5), mat(WOOD_LIGHT), 0.16, 1.24, 0).rotateZ(Math.PI / 2));
  g.add(mesh(cyl(0.022, 0.022, 0.16, 5), mat(WOOD_LIGHT), 0.06, 0.66, 0).rotateZ(Math.PI / 2));
  // ostrze z trzech segmentów łuku
  const steel = mat(STEEL, { metal: 0.65, rough: 0.42 });
  let px = 0.16;
  let pz = 0.0;
  for (let i = 0; i < 3; i++) {
    const seg = mesh(box(0.42, 0.014, 0.075 - i * 0.012), steel, px + Math.cos(i * 0.22) * 0.2, 1.56, pz);
    seg.rotation.y = -0.5 - i * 0.24;
    g.add(seg);
  }
  return g;
}

/** Widły do siana — trzonek i trzy zęby. */
export function makePitchfork() {
  const g = new THREE.Group();
  const shaft = mesh(cyl(0.025, 0.028, 1.6, 6), mat(WOOD_LIGHT, { rough: 0.92 }), 0, 0.8, 0);
  g.add(shaft);
  const iron = mat(IRON, { metal: 0.55, rough: 0.55 });
  g.add(mesh(box(0.24, 0.05, 0.05), iron, 0, 1.6, 0));
  for (const sx of [-1, 0, 1]) {
    const tine = mesh(cyl(0.012, 0.016, 0.36, 5), iron, sx * 0.1, 1.77, 0);
    tine.rotation.z = sx * 0.06;
    g.add(tine);
  }
  return g;
}

/** Motyka: krótki trzonek i poprzeczne ostrze. */
export function makeHoe() {
  const g = new THREE.Group();
  g.add(mesh(cyl(0.023, 0.026, 1.15, 6), mat(WOOD_LIGHT, { rough: 0.93 }), 0, 0.58, 0));
  const neck = mesh(cyl(0.02, 0.02, 0.16, 5), mat(IRON, { metal: 0.5, rough: 0.6 }), 0, 1.12, 0.04);
  neck.rotation.x = 0.9;
  g.add(neck);
  const blade = mesh(box(0.24, 0.11, 0.02), mat('#6c7075', { metal: 0.5, rough: 0.55 }), 0, 1.15, 0.13);
  blade.rotation.x = 0.35;
  g.add(blade);
  return g;
}

/** Kilof: trzonek i obosieczna głowica. */
export function makePickaxe() {
  const g = new THREE.Group();
  g.add(mesh(cyl(0.026, 0.03, 0.95, 6), mat(WOOD, { rough: 0.93 }), 0, 0.48, 0));
  const head = mesh(box(0.62, 0.09, 0.09), mat(IRON, { metal: 0.6, rough: 0.5 }), 0, 0.93, 0);
  g.add(head);
  for (const sx of [-1, 1]) {
    const tip = mesh(new THREE.ConeGeometry(0.05, 0.24, 4), mat('#5c6167', { metal: 0.6, rough: 0.5 }), sx * 0.36, 0.93, 0);
    tip.rotation.z = sx * -Math.PI / 2;
    g.add(tip);
  }
  return g;
}

/** Włócznia: drzewce, oka, liściaste grot. */
export function makeSpear() {
  const g = new THREE.Group();
  g.add(mesh(cyl(0.022, 0.026, 1.95, 6), mat('#6b4a2b', { rough: 0.93 }), 0, 0.98, 0));
  const steel = mat(STEEL, { metal: 0.7, rough: 0.4 });
  g.add(mesh(cyl(0.03, 0.03, 0.06, 6), mat(IRON, { metal: 0.6, rough: 0.5 }), 0, 1.94, 0));
  const blade = mesh(new THREE.ConeGeometry(0.055, 0.3, 4), steel, 0, 2.12, 0);
  g.add(blade);
  return g;
}

/** Stojak na broń: dwie żerdzie i trzy włócznie. */
export function makeWeaponRack() {
  const g = new THREE.Group();
  const wood = mat(WOOD, { rough: 0.93 });
  for (const sx of [-1, 1]) {
    g.add(mesh(box(0.1, 1.7, 0.1), wood, sx * 0.6, 0.85, 0));
    g.add(mesh(box(0.34, 0.08, 0.34), wood, sx * 0.6, 0.04, 0));
  }
  g.add(mesh(box(1.32, 0.09, 0.09), wood, 0, 1.28, 0));
  g.add(mesh(box(1.32, 0.09, 0.09), wood, 0, 0.78, 0));
  for (let i = 0; i < 3; i++) {
    const spear = makeSpear();
    spear.position.set(-0.4 + i * 0.4, 0, 0.06);
    spear.rotation.z = -0.06 + i * 0.05;
    spear.scale.setScalar(0.85);
    g.add(spear);
  }
  return g;
}

/** Zwój / list: rulon pergaminu z pieczęcią. */
export function makeScroll() {
  const g = new THREE.Group();
  const paper = mat('#d8c9a4', { rough: 0.95 });
  const roll = new THREE.CylinderGeometry(0.022, 0.022, 0.24, 8);
  const a = mesh(roll, paper, 0, 0.022, -0.05);
  a.rotation.z = Math.PI / 2;
  g.add(a);
  const b = mesh(roll, paper, 0, 0.022, 0.05);
  b.rotation.z = Math.PI / 2;
  g.add(b);
  const sheet = mesh(box(0.24, 0.004, 0.1), paper, 0, 0.022, 0);
  g.add(sheet);
  const wax = mesh(new THREE.CylinderGeometry(0.03, 0.032, 0.008, 8), mat('#8c2f2a', { rough: 0.6 }), 0, 0.028, 0.02);
  g.add(wax);
  return g;
}

/** Worek z ziarnem: wypukły brzuch, przewiązana szyjka, rozsypane ziarno. */
export function makeGrainSack() {
  const g = new THREE.Group();
  const burlap = mat('#a08a5f', { rough: 0.98 });
  const body = mesh(new THREE.SphereGeometry(0.3, 8, 6), burlap, 0, 0.3, 0);
  body.scale.set(1, 1.12, 0.92);
  g.add(body);
  const neck = mesh(cyl(0.1, 0.19, 0.22, 8), burlap, 0, 0.62, 0);
  g.add(neck);
  g.add(mesh(new THREE.TorusGeometry(0.1, 0.014, 4, 8), mat(ROPE, { rough: 0.99 }), 0, 0.68, 0).rotateX(Math.PI / 2));
  // rozsypane ziarno
  const grain = mat('#c9a85f', { rough: 0.9 });
  for (let i = 0; i < 9; i++) {
    const a = i * 1.3;
    g.add(mesh(new THREE.SphereGeometry(0.018, 4, 3), grain, Math.cos(a) * 0.32, 0.015, Math.sin(a) * 0.32));
  }
  return g;
}

/** Klucz żelazny — duży, żeby dało się go zauważyć na stole. */
export function makeKey() {
  const g = new THREE.Group();
  const brass = mat('#8f7538', { metal: 0.7, rough: 0.42 });
  const bow = mesh(new THREE.TorusGeometry(0.045, 0.012, 4, 10), brass, 0, 0.012, 0);
  bow.rotation.x = Math.PI / 2;
  g.add(bow);
  g.add(mesh(cyl(0.011, 0.011, 0.16, 6), brass, 0, 0.012, 0.1).rotateX(Math.PI / 2));
  g.add(mesh(box(0.05, 0.02, 0.024), brass, 0.024, 0.012, 0.15));
  g.add(mesh(box(0.03, 0.02, 0.024), brass, 0.016, 0.012, 0.18));
  return g;
}

/** Kołowrót ze sznurem — przy studni i na nabrzeżu. */
export function makeWindlass() {
  const g = new THREE.Group();
  const wood = mat(WOOD, { rough: 0.93 });
  for (const sx of [-1, 1]) g.add(mesh(box(0.12, 1.0, 0.12), wood, sx * 0.5, 0.5, 0));
  const drum = mesh(cyl(0.16, 0.16, 1.0, 8), mat('#6b4f31', { rough: 0.95 }), 0, 1.0, 0);
  drum.rotation.z = Math.PI / 2;
  g.add(drum);
  for (const sx of [-1, 1]) {
    const arm = mesh(box(0.5, 0.06, 0.06), wood, sx * 0.75, 1.0, 0);
    arm.rotation.y = sx * 1.2;
    g.add(arm);
  }
  return g;
}

/** Stóg siana: kopiec ze snopków na żerdzi — w każdym gospodarstwie. */
export function makeHaystack(seed = 1) {
  const g = new THREE.Group();
  const hay = mat('#b49a5c', { rough: 0.99 });
  const hayDark = mat('#96804a', { rough: 0.99 });
  g.add(mesh(cyl(0.02, 0.06, 1.5, 5), mat(WOOD, { rough: 0.95 }), 0, 0.75, 0));
  const base = mesh(cyl(0.95, 1.05, 0.7, 9), hayDark, 0, 0.35, 0);
  g.add(base);
  const mid = mesh(new THREE.ConeGeometry(1.0, 1.5, 9), hay, 0, 1.3, 0);
  g.add(mid);
  const top = mesh(new THREE.ConeGeometry(0.55, 0.8, 8), hay, 0, 2.05, 0);
  g.add(top);
  // rozrzucone snopki
  for (let i = 0; i < 3; i++) {
    const a = seed + i * 2.1;
    const bale = mesh(new THREE.SphereGeometry(0.28, 6, 4), hay, Math.cos(a) * 1.5, 0.22, Math.sin(a) * 1.5);
    bale.scale.set(1.4, 0.8, 1);
    g.add(bale);
  }
  return g;
}

/** Stos drewna na opał: kłody w dwóch warstwach pod daszkiem z kory. */
export function makeWoodpile(seed = 1) {
  const g = new THREE.Group();
  const bark = mat('#4b3623', { rough: 0.97 });
  const cut = mat('#a37f4d', { rough: 0.9 });
  const log = new THREE.CylinderGeometry(0.12, 0.13, 1.5, 7);
  for (let row = 0; row < 3; row++) {
    const n = 5 - row;
    for (let i = 0; i < n; i++) {
      const x = (i - (n - 1) / 2) * 0.27;
      const l = mesh(log, bark, x, 0.14 + row * 0.24, 0);
      l.rotation.z = Math.PI / 2;
      l.rotation.y = (seed % 7) * 0.04;
      g.add(l);
      const face = mesh(new THREE.CircleGeometry(0.115, 7), cut, x, 0.14 + row * 0.24, 0.76);
      g.add(face);
    }
  }
  // zadaszenie z kory
  const roof = mesh(box(1.6, 0.08, 0.9), bark, 0, 0.95, 0);
  roof.rotation.x = 0.18;
  g.add(roof);
  return g;
}

/** Wóz dwukołowy z dyszlem — przed gospodą i na targu. */
export function makeCart() {
  const g = new THREE.Group();
  const wood = mat(WOOD, { rough: 0.92 });
  g.add(mesh(box(2.1, 0.12, 1.2), mat('#6b4f31', { rough: 0.94 }), 0, 0.62, 0));
  for (const sz of [-1, 1]) {
    g.add(mesh(box(2.1, 0.32, 0.07), wood, 0, 0.86, sz * 0.6));
  }
  g.add(mesh(box(0.07, 0.32, 1.2), wood, -1.0, 0.86, 0));
  const wheel = new THREE.CylinderGeometry(0.46, 0.46, 0.1, 12);
  for (const sz of [-1, 1]) {
    const w = mesh(wheel, wood, 0, 0.46, sz * 0.66);
    w.rotation.x = Math.PI / 2;
    g.add(w);
  }
  const axle = mesh(cyl(0.06, 0.06, 1.4, 6), wood, 0, 0.46, 0);
  axle.rotation.x = Math.PI / 2;
  g.add(axle);
  // dyszel
  const shaft = mesh(cyl(0.05, 0.06, 1.7, 6), wood, 1.55, 0.5, 0);
  shaft.rotation.z = Math.PI / 2 - 0.12;
  g.add(shaft);
  return g;
}
