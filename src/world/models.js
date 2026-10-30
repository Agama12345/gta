import * as THREE from 'three';
import { RNG, clamp } from '../core/utils.js';

// Wszystkie modele 3D są generowane proceduralnie z brył — gra nie potrzebuje
// żadnych zewnętrznych plików .glb, więc działa od razu po uruchomieniu.

const materialCache = new Map();

export function mat(color, opts = {}) {
  const key = color + JSON.stringify(opts);
  if (materialCache.has(key)) return materialCache.get(key);
  const m = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    roughness: opts.rough ?? 0.86,
    metalness: opts.metal ?? 0.04,
    flatShading: opts.flat ?? true,
    emissive: opts.emissive ? new THREE.Color(opts.emissive) : new THREE.Color(0x000000),
    emissiveIntensity: opts.emissiveIntensity ?? 1,
    transparent: !!opts.transparent,
    opacity: opts.opacity ?? 1,
    side: opts.side ?? THREE.FrontSide,
  });
  materialCache.set(key, m);
  return m;
}

function mesh(geo, material, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(geo, material);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

const box = (w, h, d) => new THREE.BoxGeometry(w, h, d);

// ---------------------------------------------------------------------------
// DOMY
// ---------------------------------------------------------------------------
export function makeHouse({ w = 5.4, d = 4.6, h = 3.0, wall = '#b9a17c', roof = '#5d3f33', rot = 0 } = {}) {
  const g = new THREE.Group();
  const base = mesh(box(w, h, d), mat(wall, { rough: 0.92 }));
  base.position.y = h / 2;
  g.add(base);

  // belki konstrukcyjne
  const beamMat = mat('#4a3527', { rough: 0.9 });
  for (const sx of [-1, 1]) {
    const beam = mesh(box(0.22, h, 0.22), beamMat, (sx * w) / 2 - sx * 0.11, h / 2, d / 2 + 0.02);
    g.add(beam);
  }
  const lintel = mesh(box(w + 0.1, 0.24, 0.22), beamMat, 0, h - 0.5, d / 2 + 0.03);
  g.add(lintel);

  // dach (piramida 4-boczna)
  const roofH = Math.max(w, d) * 0.46;
  const roofGeo = new THREE.ConeGeometry(Math.hypot(w, d) * 0.5 + 0.45, roofH, 4, 1);
  const roofMesh = mesh(roofGeo, mat(roof, { rough: 0.95 }), 0, h + roofH / 2 - 0.05, 0);
  roofMesh.rotation.y = Math.PI / 4;
  roofMesh.scale.set(1, 1, d / w);
  g.add(roofMesh);

  // komin
  const chimney = mesh(box(0.6, 1.5, 0.6), mat('#5a5148'), w * 0.27, h + roofH * 0.42, -d * 0.18);
  g.add(chimney);

  // drzwi
  const door = mesh(box(0.95, 1.9, 0.12), mat('#3e2a1c', { rough: 0.85 }), 0, 0.95, d / 2 + 0.08);
  g.add(door);
  const handle = mesh(new THREE.SphereGeometry(0.06, 6, 5), mat('#c9a24a', { metal: 0.8, rough: 0.4 }), 0.3, 1.0, d / 2 + 0.16);
  g.add(handle);

  // okna (emitujące ciepłe światło)
  const winMat = mat('#f3c07a', { emissive: '#ffb45c', emissiveIntensity: 0.85, rough: 0.35 });
  for (const sx of [-1, 1]) {
    const win = mesh(box(0.8, 0.8, 0.1), winMat, sx * (w * 0.3), h * 0.62, d / 2 + 0.07);
    g.add(win);
    const frame = mesh(box(0.92, 0.92, 0.06), mat('#40301f'), sx * (w * 0.3), h * 0.62, d / 2 + 0.04);
    g.add(frame);
  }

  g.rotation.y = rot;
  g.userData.footprint = { w: w + 1.2, d: d + 1.2 };
  return g;
}

// ---------------------------------------------------------------------------
// ROŚLINNOŚĆ
// ---------------------------------------------------------------------------
export function makeTree(seed = 1, { kind = 'oak' } = {}) {
  const rng = new RNG(seed);
  const g = new THREE.Group();
  const scale = rng.float(0.85, 1.35);

  if (kind === 'pine') {
    const trunk = mesh(new THREE.CylinderGeometry(0.24, 0.36, 5.6, 6), mat('#4a3626'), 0, 2.8, 0);
    g.add(trunk);
    const pineMat = mat('#3c5c36', { rough: 0.95 });
    for (let i = 0; i < 4; i++) {
      const r = 2.5 - i * 0.5;
      const cone = mesh(new THREE.ConeGeometry(r, 2.4, 7), pineMat, 0, 3.4 + i * 1.5, 0);
      cone.rotation.y = rng.float(0, Math.PI);
      g.add(cone);
    }
  } else if (kind === 'dead') {
    const trunk = mesh(new THREE.CylinderGeometry(0.16, 0.42, 5.0, 6), mat('#3a322a'), 0, 2.5, 0);
    g.add(trunk);
    const branchMat = mat('#332c25');
    for (let i = 0; i < 4; i++) {
      const a = rng.float(0, Math.PI * 2);
      const len = rng.float(1.4, 2.4);
      const br = mesh(new THREE.CylinderGeometry(0.05, 0.14, len, 5), branchMat);
      br.position.set(Math.cos(a) * len * 0.32, 3.2 + i * 0.5, Math.sin(a) * len * 0.32);
      br.rotation.set(Math.cos(a) * 1.1, 0, -Math.sin(a) * 1.1);
      g.add(br);
    }
  } else {
    const trunk = mesh(new THREE.CylinderGeometry(0.3, 0.44, 3.4, 6), mat('#523a26'), 0, 1.7, 0);
    g.add(trunk);
    const leafA = mat('#4d7a41', { rough: 0.94 });
    const leafB = mat('#5d8a4c', { rough: 0.94 });
    const clusters = 3 + Math.floor(rng.float(0, 2.6));
    for (let i = 0; i < clusters; i++) {
      const a = rng.float(0, Math.PI * 2);
      const rad = rng.float(0.4, 1.5);
      const size = rng.float(1.4, 2.4);
      const leaf = mesh(
        new THREE.IcosahedronGeometry(size, 0),
        i % 2 ? leafA : leafB,
        Math.cos(a) * rad,
        3.4 + rng.float(0, 1.9),
        Math.sin(a) * rad
      );
      leaf.rotation.set(rng.float(0, 3), rng.float(0, 3), rng.float(0, 3));
      g.add(leaf);
    }
  }

  g.scale.setScalar(scale);
  g.rotation.y = rng.float(0, Math.PI * 2);
  return g;
}

export function makeBush(seed = 1) {
  const rng = new RNG(seed);
  const g = new THREE.Group();
  const m = mat(rng.chance(0.5) ? '#4d7040' : '#5b8346', { rough: 0.96 });
  const n = 2 + Math.floor(rng.float(0, 2));
  for (let i = 0; i < n; i++) {
    const s = rng.float(0.5, 0.95);
    const b = mesh(new THREE.IcosahedronGeometry(s, 0), m, rng.float(-0.5, 0.5), s * 0.8, rng.float(-0.5, 0.5));
    b.rotation.set(rng.float(0, 3), rng.float(0, 3), rng.float(0, 3));
    g.add(b);
  }
  return g;
}

export function makeGrassTuft(seed = 1) {
  const rng = new RNG(seed);
  const g = new THREE.Group();
  const m = mat(rng.chance(0.4) ? '#84a257' : '#6d8f47', { rough: 1, flat: true });
  const blades = 3 + Math.floor(rng.float(0, 3));
  for (let i = 0; i < blades; i++) {
    const h = rng.float(0.35, 0.7);
    const blade = mesh(new THREE.ConeGeometry(0.07, h, 3), m, rng.float(-0.15, 0.15), h / 2, rng.float(-0.15, 0.15));
    blade.rotation.z = rng.float(-0.35, 0.35);
    blade.rotation.x = rng.float(-0.35, 0.35);
    blade.castShadow = false;
    g.add(blade);
  }
  return g;
}

export function makeRock(seed = 1, scale = 1) {
  const rng = new RNG(seed);
  const geo = new THREE.DodecahedronGeometry(1, 0);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    pos.setXYZ(
      i,
      pos.getX(i) * rng.float(0.7, 1.25),
      pos.getY(i) * rng.float(0.55, 1.05),
      pos.getZ(i) * rng.float(0.7, 1.25)
    );
  }
  geo.computeVertexNormals();
  const m = mesh(geo, mat(rng.chance(0.5) ? '#8b8880' : '#77746d', { rough: 0.95 }));
  m.scale.setScalar(scale);
  m.rotation.set(rng.float(0, 0.4), rng.float(0, 6.28), rng.float(0, 0.4));
  return m;
}

// ---------------------------------------------------------------------------
// POSTACIE
// ---------------------------------------------------------------------------
/**
 * Buduje humanoidalną postać z animowanymi kończynami.
 * Zwraca { group, parts } — części są grupami obrotowymi (ramiona/nogi).
 */
export function makeHumanoid(opts = {}) {
  const {
    skin = '#d3a67e',
    tunic = '#6b4a2f',
    pants = '#3e342a',
    boots = '#2f2823',
    hair = '#3b2a1c',
    cloak = null,
    hood = null,
    beard = false,
    scar = false,
    bulk = 1,
    eyeColor = null,
    armor = null,
  } = opts;

  const group = new THREE.Group();
  const torsoY = 1.12;
  const torsoH = 0.72 * bulk;
  const torsoW = 0.6 * bulk;

  const body = new THREE.Group();
  body.position.y = 0;
  group.add(body);

  const torso = mesh(box(torsoW, torsoH, 0.34 * bulk), mat(tunic), 0, torsoY, 0);
  body.add(torso);

  if (armor) {
    const plate = mesh(box(torsoW + 0.05, torsoH * 0.8, 0.38 * bulk), mat(armor, { metal: 0.72, rough: 0.42 }), 0, torsoY + 0.02, 0);
    body.add(plate);
    const belt = mesh(box(torsoW + 0.02, 0.12, 0.4 * bulk), mat('#3a2a1b'), 0, torsoY - torsoH * 0.44, 0);
    body.add(belt);
  } else {
    const belt = mesh(box(torsoW + 0.02, 0.11, 0.37 * bulk), mat('#4a3524'), 0, torsoY - torsoH * 0.42, 0);
    body.add(belt);
    const buckle = mesh(box(0.13, 0.13, 0.05), mat('#b8913f', { metal: 0.8, rough: 0.35 }), 0, torsoY - torsoH * 0.42, 0.19);
    body.add(buckle);
  }

  const neck = mesh(new THREE.CylinderGeometry(0.09, 0.11, 0.13, 6), mat(skin), 0, torsoY + torsoH / 2 + 0.05, 0);
  body.add(neck);

  const head = new THREE.Group();
  head.position.y = torsoY + torsoH / 2 + 0.24;
  body.add(head);

  const skull = mesh(new THREE.SphereGeometry(0.21, 8, 7), mat(skin), 0, 0, 0);
  head.add(skull);

  const hairMesh = mesh(new THREE.SphereGeometry(0.225, 8, 6, 0, Math.PI * 2, 0, Math.PI * 0.62), mat(hair), 0, 0.025, 0);
  head.add(hairMesh);

  if (beard) {
    const beardMesh = mesh(new THREE.ConeGeometry(0.14, 0.3, 6), mat(hair), 0, -0.16, 0.09);
    beardMesh.rotation.x = Math.PI;
    head.add(beardMesh);
  }

  const eyeMat = mat(eyeColor || '#1a1410', { emissive: eyeColor ? eyeColor : '#000000', emissiveIntensity: eyeColor ? 1.6 : 0, rough: 0.2 });
  for (const sx of [-1, 1]) {
    const eye = mesh(new THREE.SphereGeometry(0.033, 6, 5), eyeMat, sx * 0.085, 0.02, 0.19);
    eye.castShadow = false;
    head.add(eye);
  }
  if (scar) {
    const s = mesh(box(0.025, 0.19, 0.02), mat('#8c4b42'), 0.1, 0.03, 0.2);
    s.rotation.z = 0.32;
    head.add(s);
  }

  // ramiona
  const arms = [];
  for (const sx of [-1, 1]) {
    const pivot = new THREE.Group();
    pivot.position.set(sx * (torsoW / 2 + 0.09), torsoY + torsoH / 2 - 0.08, 0);
    const upper = mesh(new THREE.CylinderGeometry(0.075, 0.065, 0.36, 6), mat(tunic), 0, -0.18, 0);
    pivot.add(upper);
    const fore = mesh(new THREE.CylinderGeometry(0.065, 0.058, 0.34, 6), mat(skin), 0, -0.5, 0);
    pivot.add(fore);
    const hand = mesh(new THREE.SphereGeometry(0.075, 6, 5), mat(skin), 0, -0.7, 0);
    pivot.add(hand);
    body.add(pivot);
    arms.push(pivot);
  }

  // nogi
  const legs = [];
  for (const sx of [-1, 1]) {
    const pivot = new THREE.Group();
    pivot.position.set(sx * 0.17, 0.78, 0);
    const thigh = mesh(new THREE.CylinderGeometry(0.1, 0.09, 0.42, 6), mat(pants), 0, -0.21, 0);
    pivot.add(thigh);
    const shin = mesh(new THREE.CylinderGeometry(0.088, 0.075, 0.34, 6), mat(pants), 0, -0.58, 0);
    pivot.add(shin);
    const foot = mesh(box(0.17, 0.1, 0.28), mat(boots), 0, -0.78, 0.05);
    pivot.add(foot);
    body.add(pivot);
    legs.push(pivot);
  }

  let cloakMesh = null;
  if (cloak) {
    // płaszcz: rozcięty z tyłu cylinder, opadający od ramion do kolan
    const cloakGeo = new THREE.CylinderGeometry(0.34 * bulk, 0.46 * bulk, 1.05, 8, 1, true, Math.PI * 0.62, Math.PI * 1.76);
    cloakMesh = mesh(cloakGeo, mat(cloak, { side: THREE.DoubleSide, rough: 0.92 }), 0, torsoY - 0.18, -0.03);
    cloakMesh.castShadow = true;
    body.add(cloakMesh);

    const collarGeo = new THREE.CylinderGeometry(0.3 * bulk, 0.34 * bulk, 0.16, 8, 1, true, Math.PI * 0.55, Math.PI * 1.9);
    const collar = mesh(collarGeo, mat(cloak, { side: THREE.DoubleSide, rough: 0.9 }), 0, torsoY + torsoH / 2 - 0.02, -0.02);
    body.add(collar);
  }

  if (hood) {
    const hoodMesh = mesh(new THREE.ConeGeometry(0.27, 0.42, 7), mat(hood, { rough: 0.94 }), 0, 0.14, -0.03);
    hoodMesh.rotation.x = -0.15;
    head.add(hoodMesh);
    const collar = mesh(new THREE.CylinderGeometry(0.3, 0.34, 0.16, 7), mat(hood), 0, torsoY + torsoH / 2 + 0.1, 0);
    body.add(collar);
  }

  group.userData.height = 1.85 * Math.min(1.15, bulk);
  return { group, parts: { body, head, arms, legs, torso, cloak: cloakMesh } };
}

export function makeSword({ blade = '#cdd6dd', guard = '#b08a3e', grip = '#3a2a1c', glow = null } = {}) {
  const g = new THREE.Group();
  const bladeMat = mat(blade, { metal: 0.92, rough: 0.22, emissive: glow || '#000000', emissiveIntensity: glow ? 0.7 : 0 });
  const b = mesh(box(0.075, 1.05, 0.022), bladeMat, 0, 0.72, 0);
  g.add(b);
  const tip = mesh(new THREE.ConeGeometry(0.055, 0.2, 4), bladeMat, 0, 1.33, 0);
  g.add(tip);
  const guardMesh = mesh(box(0.3, 0.06, 0.08), mat(guard, { metal: 0.85, rough: 0.35 }), 0, 0.19, 0);
  g.add(guardMesh);
  const gripMesh = mesh(new THREE.CylinderGeometry(0.035, 0.04, 0.24, 6), mat(grip), 0, 0.05, 0);
  g.add(gripMesh);
  const pommel = mesh(new THREE.SphereGeometry(0.055, 6, 5), mat(guard, { metal: 0.85, rough: 0.35 }), 0, -0.09, 0);
  g.add(pommel);
  if (glow) {
    const light = new THREE.PointLight(glow, 1.4, 4.5, 2);
    light.position.y = 0.8;
    g.add(light);
  }
  return g;
}

export function makeShield(color = '#6d5a3d') {
  const g = new THREE.Group();
  const face = mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.06, 8), mat(color, { rough: 0.8 }), 0, 0, 0);
  face.rotation.x = Math.PI / 2;
  g.add(face);
  const boss = mesh(new THREE.SphereGeometry(0.10, 7, 6), mat('#9c8a6a', { metal: 0.6, rough: 0.45 }), 0, 0, 0.06);
  g.add(boss);
  const rim = mesh(new THREE.TorusGeometry(0.34, 0.028, 5, 12), mat('#4c3d2a', { metal: 0.5, rough: 0.5 }), 0, 0, 0.01);
  g.add(rim);
  return g;
}

export function makeWolf(seed = 1) {
  const rng = new RNG(seed);
  const g = new THREE.Group();
  const fur = mat(rng.chance(0.5) ? '#4a443c' : '#57504a', { rough: 0.95 });
  const furDark = mat('#332f2a', { rough: 0.95 });
  const body = new THREE.Group();
  g.add(body);

  const torso = mesh(box(0.44, 0.44, 1.05), fur, 0, 0.72, 0);
  body.add(torso);
  const hind = mesh(box(0.42, 0.38, 0.35), fur, 0, 0.72, -0.58);
  body.add(hind);

  const neck = mesh(box(0.28, 0.3, 0.3), fur, 0, 0.85, 0.58);
  body.add(neck);
  const head = new THREE.Group();
  head.position.set(0, 0.9, 0.78);
  body.add(head);
  const skull = mesh(box(0.3, 0.28, 0.36), fur, 0, 0, 0);
  head.add(skull);
  const snout = mesh(box(0.16, 0.15, 0.26), furDark, 0, -0.06, 0.28);
  head.add(snout);
  const nose = mesh(box(0.08, 0.06, 0.05), mat('#1b1815'), 0, -0.03, 0.42);
  head.add(nose);
  for (const sx of [-1, 1]) {
    const ear = mesh(new THREE.ConeGeometry(0.075, 0.2, 4), furDark, sx * 0.11, 0.2, -0.02);
    head.add(ear);
    const eye = mesh(new THREE.SphereGeometry(0.032, 5, 4), mat('#d8a13a', { emissive: '#e0a33c', emissiveIntensity: 1.1 }), sx * 0.13, 0.04, 0.16);
    eye.castShadow = false;
    head.add(eye);
  }
  const tail = mesh(new THREE.ConeGeometry(0.11, 0.55, 5), furDark, 0, 0.92, -0.82);
  tail.rotation.x = -0.85;
  body.add(tail);

  const legs = [];
  for (const [sx, sz] of [[-1, 1], [1, 1], [-1, -1], [1, -1]]) {
    const pivot = new THREE.Group();
    pivot.position.set(sx * 0.17, 0.58, sz * 0.34);
    const legMesh = mesh(new THREE.CylinderGeometry(0.065, 0.055, 0.55, 5), fur, 0, -0.27, 0);
    pivot.add(legMesh);
    const paw = mesh(box(0.14, 0.09, 0.19), furDark, 0, -0.55, 0.03);
    pivot.add(paw);
    body.add(pivot);
    legs.push({ pivot, front: sz > 0, side: sx });
  }

  g.userData.height = 1.15;
  return { group: g, parts: { body, head, legs, tail } };
}

export function makeSkeleton() {
  const bone = mat('#cfc6ae', { rough: 0.72 });
  const boneDark = mat('#a99c82', { rough: 0.8 });
  const g = new THREE.Group();
  const body = new THREE.Group();
  g.add(body);

  const spine = mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.55, 5), bone, 0, 1.12, 0);
  body.add(spine);
  for (let i = 0; i < 4; i++) {
    const rib = mesh(new THREE.TorusGeometry(0.17 - i * 0.012, 0.022, 4, 8, Math.PI * 1.35), bone, 0, 1.28 - i * 0.11, 0);
    rib.rotation.x = Math.PI / 2;
    rib.rotation.z = Math.PI * 0.32;
    body.add(rib);
  }
  const pelvis = mesh(box(0.3, 0.14, 0.2), boneDark, 0, 0.8, 0);
  body.add(pelvis);

  const head = new THREE.Group();
  head.position.y = 1.52;
  body.add(head);
  const skull = mesh(new THREE.SphereGeometry(0.17, 7, 6), bone, 0, 0, 0);
  skull.scale.set(1, 1.05, 1.12);
  head.add(skull);
  const jaw = mesh(box(0.2, 0.08, 0.17), boneDark, 0, -0.13, 0.04);
  head.add(jaw);
  const eyeMat = mat('#7fe0c0', { emissive: '#59e0b6', emissiveIntensity: 2.2, rough: 0.2 });
  for (const sx of [-1, 1]) {
    const eye = mesh(new THREE.SphereGeometry(0.045, 6, 5), eyeMat, sx * 0.07, 0.02, 0.15);
    eye.castShadow = false;
    head.add(eye);
  }

  const arms = [];
  for (const sx of [-1, 1]) {
    const pivot = new THREE.Group();
    pivot.position.set(sx * 0.22, 1.36, 0);
    const upper = mesh(new THREE.CylinderGeometry(0.038, 0.034, 0.38, 5), bone, 0, -0.19, 0);
    pivot.add(upper);
    const fore = mesh(new THREE.CylinderGeometry(0.033, 0.03, 0.36, 5), bone, 0, -0.55, 0);
    pivot.add(fore);
    const hand = mesh(box(0.09, 0.1, 0.06), boneDark, 0, -0.75, 0);
    pivot.add(hand);
    body.add(pivot);
    arms.push(pivot);
  }

  const legs = [];
  for (const sx of [-1, 1]) {
    const pivot = new THREE.Group();
    pivot.position.set(sx * 0.12, 0.79, 0);
    const thigh = mesh(new THREE.CylinderGeometry(0.048, 0.042, 0.42, 5), bone, 0, -0.21, 0);
    pivot.add(thigh);
    const shin = mesh(new THREE.CylinderGeometry(0.042, 0.036, 0.4, 5), bone, 0, -0.6, 0);
    pivot.add(shin);
    const foot = mesh(box(0.11, 0.06, 0.22), boneDark, 0, -0.81, 0.05);
    pivot.add(foot);
    body.add(pivot);
    legs.push(pivot);
  }

  // rdzawy miecz w prawej dłoni
  g.userData.height = 1.75;
  return { group: g, parts: { body, head, arms, legs, skeleton: true } };
}

// ---------------------------------------------------------------------------
// REKWIZYTY
// ---------------------------------------------------------------------------
export function makeCampfire() {
  const g = new THREE.Group();
  const stoneMat = mat('#6a6660', { rough: 0.95 });
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2;
    const s = makeRock(i + 4, 0.22);
    s.position.set(Math.cos(a) * 0.72, 0.08, Math.sin(a) * 0.72);
    g.add(s);
  }
  const logMat = mat('#3f2b1b');
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI;
    const log = mesh(new THREE.CylinderGeometry(0.09, 0.11, 1.15, 5), logMat, 0, 0.16, 0);
    log.rotation.z = Math.PI / 2;
    log.rotation.y = a;
    g.add(log);
  }
  const flameMat = new THREE.MeshBasicMaterial({ color: '#ffb04a', transparent: true, opacity: 0.9 });
  const flame = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.95, 6), flameMat);
  flame.position.y = 0.6;
  flame.castShadow = false;
  g.add(flame);
  const coreMat = new THREE.MeshBasicMaterial({ color: '#ffe1a0', transparent: true, opacity: 0.95 });
  const core = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.6, 5), coreMat);
  core.position.y = 0.45;
  g.add(core);

  const light = new THREE.PointLight('#ff9a45', 9, 17, 2);
  light.position.y = 1.15;
  light.castShadow = false;
  g.add(light);

  let t = 0;
  return {
    group: g,
    light,
    update(dt) {
      t += dt;
      const f = 0.85 + Math.sin(t * 8.3) * 0.08 + Math.sin(t * 3.1) * 0.06;
      flame.scale.set(f, f * 1.1, f);
      core.scale.set(f, f * 1.15, f);
      light.intensity = 7.5 + Math.sin(t * 6.7) * 1.4 + Math.sin(t * 11.3) * 0.7;
    },
  };
}

export function makeAnvil() {
  const g = new THREE.Group();
  const iron = mat('#4a4a4e', { metal: 0.75, rough: 0.45 });
  const base = mesh(box(0.5, 0.55, 0.5), mat('#4a3626'), 0, 0.27, 0);
  g.add(base);
  const body = mesh(box(0.7, 0.28, 0.32), iron, 0, 0.68, 0);
  g.add(body);
  const horn = mesh(new THREE.ConeGeometry(0.16, 0.42, 4), iron, 0.5, 0.68, 0);
  horn.rotation.z = -Math.PI / 2;
  g.add(horn);
  return g;
}

export function makeForgeFurnace() {
  const g = new THREE.Group();
  const stone = mat('#5b5650', { rough: 0.96 });
  const body = mesh(box(2.1, 1.9, 1.6), stone, 0, 0.95, 0);
  g.add(body);
  const chimney = mesh(box(0.8, 2.6, 0.8), stone, 0.5, 2.6, -0.3);
  g.add(chimney);
  const glow = new THREE.MeshBasicMaterial({ color: '#ff7b2a' });
  const mouth = new THREE.Mesh(box(0.9, 0.7, 0.1), glow);
  mouth.position.set(-0.35, 1.0, 0.82);
  g.add(mouth);
  const light = new THREE.PointLight('#ff7a35', 6, 13, 2);
  light.position.set(0, 1.4, 1.3);
  g.add(light);
  return { group: g, light };
}

export function makeWell() {
  const g = new THREE.Group();
  const stone = mat('#6d6961', { rough: 0.95 });
  const rim = mesh(new THREE.CylinderGeometry(1.05, 1.1, 0.85, 10), stone, 0, 0.42, 0);
  g.add(rim);
  const water = new THREE.Mesh(new THREE.CylinderGeometry(0.86, 0.86, 0.06, 10), mat('#22343c', { rough: 0.15, metal: 0.6 }));
  water.position.y = 0.8;
  g.add(water);
  const postMat = mat('#4c3626');
  for (const sx of [-1, 1]) {
    const post = mesh(box(0.14, 2.1, 0.14), postMat, sx * 0.85, 1.85, 0);
    g.add(post);
  }
  const beam = mesh(box(2.0, 0.14, 0.16), postMat, 0, 2.9, 0);
  g.add(beam);
  const roof = mesh(new THREE.ConeGeometry(1.5, 0.75, 4), mat('#5a3f30'), 0, 3.35, 0);
  roof.rotation.y = Math.PI / 4;
  roof.scale.set(1, 1, 0.7);
  g.add(roof);
  return g;
}

export function makeSignpost() {
  const g = new THREE.Group();
  const wood = mat('#4e3823', { rough: 0.94 });
  const post = mesh(new THREE.CylinderGeometry(0.11, 0.13, 2.6, 6), wood, 0, 1.3, 0);
  g.add(post);
  const dirs = [
    { r: 0.4, label: 0 },
    { r: 2.5, label: 1 },
    { r: 4.4, label: 2 },
  ];
  for (const d of dirs) {
    const arm = mesh(box(1.1, 0.26, 0.07), wood, Math.cos(d.r) * 0.5, 2.2 - d.label * 0.32, Math.sin(d.r) * 0.5);
    arm.rotation.y = -d.r;
    g.add(arm);
  }
  return g;
}

export function makeFence(length = 4, seed = 3) {
  const rng = new RNG(seed);
  const g = new THREE.Group();
  const wood = mat('#58402b', { rough: 0.95 });
  const n = Math.max(2, Math.round(length / 1.1));
  for (let i = 0; i < n; i++) {
    const p = mesh(box(0.11, rng.float(1.0, 1.35), 0.11), wood, (i / (n - 1) - 0.5) * length, 0.58, 0);
    p.rotation.z = rng.float(-0.05, 0.05);
    g.add(p);
  }
  for (const y of [0.5, 0.95]) {
    const rail = mesh(box(length, 0.08, 0.06), wood, 0, y, 0);
    g.add(rail);
  }
  return g;
}

export function makeTent(color = '#5b4a35') {
  const g = new THREE.Group();
  const cloth = mat(color, { rough: 0.96, side: THREE.DoubleSide });
  const t = mesh(new THREE.ConeGeometry(1.5, 2.2, 4), cloth, 0, 1.1, 0);
  t.rotation.y = Math.PI / 4;
  t.scale.set(1, 1, 0.9);
  g.add(t);
  const pole = mesh(new THREE.CylinderGeometry(0.05, 0.05, 2.6, 5), mat('#42301f'), 0, 1.3, 0);
  g.add(pole);
  return g;
}

export function makeBarrel() {
  const g = new THREE.Group();
  const wood = mat('#5a4029', { rough: 0.9 });
  const body = mesh(new THREE.CylinderGeometry(0.36, 0.32, 0.9, 9), wood, 0, 0.45, 0);
  g.add(body);
  for (const y of [0.16, 0.75]) {
    const ring = mesh(new THREE.TorusGeometry(0.36, 0.025, 4, 10), mat('#3c3a36', { metal: 0.7, rough: 0.5 }), 0, y, 0);
    ring.rotation.x = Math.PI / 2;
    g.add(ring);
  }
  return g;
}

export function makeCrate(s = 0.8) {
  const g = new THREE.Group();
  const wood = mat('#6a4d31', { rough: 0.94 });
  const b = mesh(box(s, s, s), wood, 0, s / 2, 0);
  g.add(b);
  const trim = mat('#4a3524');
  for (const [x, z] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
    const e = mesh(box(0.07, s + 0.02, 0.07), trim, (x * s) / 2, s / 2, (z * s) / 2);
    g.add(e);
  }
  return g;
}

export function makeChest({ locked = false } = {}) {
  const g = new THREE.Group();
  const wood = mat('#5b3c22', { rough: 0.88 });
  const metal = mat('#8f7a45', { metal: 0.75, rough: 0.42 });
  const base = mesh(box(1.0, 0.55, 0.62), wood, 0, 0.28, 0);
  g.add(base);
  const lid = mesh(new THREE.CylinderGeometry(0.31, 0.31, 1.0, 8, 1, false, 0, Math.PI), wood, 0, 0.55, 0);
  lid.rotation.z = Math.PI / 2;
  lid.rotation.y = Math.PI / 2;
  g.add(lid);
  for (const x of [-0.32, 0.32]) {
    const band = mesh(box(0.09, 0.6, 0.66), metal, x, 0.4, 0);
    g.add(band);
  }
  const lock = mesh(box(0.18, 0.22, 0.08), metal, 0, 0.42, 0.33);
  g.add(lock);
  let glow = null;
  if (!locked) {
    glow = new THREE.PointLight('#e2b878', 1.6, 3.6, 2);
    glow.position.y = 0.8;
    g.add(glow);
  }
  g.userData.locked = locked;
  g.userData.lid = lid;
  g.userData.glow = glow;
  return g;
}

export function makeMenhir(h = 2.4, seed = 2) {
  const rng = new RNG(seed);
  const geo = new THREE.BoxGeometry(0.85, h, 0.7, 1, 3, 1);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    pos.setXYZ(i, pos.getX(i) + rng.float(-0.07, 0.07), pos.getY(i), pos.getZ(i) + rng.float(-0.06, 0.06));
  }
  geo.computeVertexNormals();
  const m = mesh(geo, mat('#66645c', { rough: 0.96 }), 0, h / 2, 0);
  m.rotation.y = rng.float(0, 1);
  return m;
}

export function makeStoneArch() {
  const g = new THREE.Group();
  const stone = mat('#5f5c55', { rough: 0.96 });
  for (const sx of [-1, 1]) {
    const pillar = mesh(box(1.1, 5.4, 1.1), stone, sx * 2.2, 2.7, 0);
    g.add(pillar);
    const cap = mesh(box(1.4, 0.4, 1.4), stone, sx * 2.2, 5.5, 0);
    g.add(cap);
  }
  const lintel = mesh(box(6.4, 0.9, 1.2), stone, 0, 6.0, 0);
  g.add(lintel);
  const rune = new THREE.Mesh(box(4.2, 0.16, 0.1), new THREE.MeshBasicMaterial({ color: '#7fd8c0' }));
  rune.position.set(0, 5.5, 0.62);
  g.add(rune);
  const light = new THREE.PointLight('#5fd0b0', 3.5, 12, 2);
  light.position.y = 4.6;
  g.add(light);
  return g;
}

export function makePillar(height = 4) {
  const g = new THREE.Group();
  const stone = mat('#6a6760', { rough: 0.95 });
  const shaft = mesh(new THREE.CylinderGeometry(0.45, 0.52, height, 7), stone, 0, height / 2, 0);
  g.add(shaft);
  const cap = mesh(box(1.1, 0.3, 1.1), stone, 0, height, 0);
  g.add(cap);
  return g;
}

export function makeCrystal(color = '#66d6c4', scale = 1) {
  const g = new THREE.Group();
  const m = new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 1.7,
    transparent: true,
    opacity: 0.88,
    roughness: 0.2,
    metalness: 0.2,
    flatShading: true,
  });
  for (let i = 0; i < 3; i++) {
    const c = new THREE.Mesh(new THREE.ConeGeometry(0.22 * scale, 1.1 * scale, 5), m);
    c.position.set(Math.cos(i * 2.1) * 0.22 * scale, (0.55 + Math.random() * 0.1) * scale, Math.sin(i * 2.1) * 0.22 * scale);
    c.rotation.z = Math.cos(i * 2.1) * 0.24;
    c.rotation.x = Math.sin(i * 2.1) * 0.24;
    c.castShadow = false;
    g.add(c);
  }
  const light = new THREE.PointLight(color, 2.2, 7, 2);
  light.position.y = 0.8 * scale;
  g.add(light);
  return g;
}

export function makeOreNode(seed = 5) {
  const g = new THREE.Group();
  const rock = makeRock(seed, 0.95);
  g.add(rock);
  const oreMat = mat('#8a939c', { metal: 0.85, rough: 0.35, emissive: '#3a4d5c', emissiveIntensity: 0.35 });
  const rng = new RNG(seed + 9);
  for (let i = 0; i < 6; i++) {
    const c = mesh(new THREE.OctahedronGeometry(rng.float(0.11, 0.2), 0), oreMat);
    const a = rng.float(0, Math.PI * 2);
    const r = rng.float(0.3, 0.85);
    c.position.set(Math.cos(a) * r, rng.float(0.2, 0.9), Math.sin(a) * r);
    c.rotation.set(rng.float(0, 3), rng.float(0, 3), rng.float(0, 3));
    g.add(c);
  }
  return g;
}

export function makeHerbPatch(seed = 4) {
  const g = new THREE.Group();
  const rng = new RNG(seed);
  const stemMat = mat('#3f6a35');
  const leafMat = mat('#5f9a4a', { rough: 0.9 });
  const flowerMat = mat('#e4c96a', { emissive: '#7a6a22', emissiveIntensity: 0.5 });
  for (let i = 0; i < 5; i++) {
    const a = rng.float(0, Math.PI * 2);
    const r = rng.float(0, 0.4);
    const h = rng.float(0.3, 0.52);
    const stem = mesh(new THREE.CylinderGeometry(0.015, 0.02, h, 4), stemMat, Math.cos(a) * r, h / 2, Math.sin(a) * r);
    g.add(stem);
    const leaf = mesh(new THREE.SphereGeometry(0.07, 5, 4), leafMat, Math.cos(a) * r, h * 0.6, Math.sin(a) * r);
    leaf.scale.set(1.7, 0.45, 1.1);
    g.add(leaf);
    const flower = mesh(new THREE.SphereGeometry(0.06, 5, 4), flowerMat, Math.cos(a) * r, h, Math.sin(a) * r);
    g.add(flower);
  }
  return g;
}

export function makeBanner(color = '#7a2f2f') {
  const g = new THREE.Group();
  const pole = mesh(new THREE.CylinderGeometry(0.05, 0.06, 3.0, 5), mat('#3e2d1d'), 0, 1.5, 0);
  g.add(pole);
  const cloth = mesh(box(0.9, 1.4, 0.04), mat(color, { rough: 0.95, side: THREE.DoubleSide }), 0.47, 2.2, 0);
  g.add(cloth);
  const spike = mesh(new THREE.ConeGeometry(0.08, 0.26, 4), mat('#9a8b5f', { metal: 0.7, rough: 0.4 }), 0, 3.1, 0);
  g.add(spike);
  return g;
}

export function makeBonePile(seed = 7) {
  const g = new THREE.Group();
  const rng = new RNG(seed);
  const bone = mat('#cfc5ac', { rough: 0.8 });
  for (let i = 0; i < 5; i++) {
    const b = mesh(new THREE.CylinderGeometry(0.05, 0.05, rng.float(0.4, 0.8), 5), bone, rng.float(-0.5, 0.5), 0.06, rng.float(-0.5, 0.5));
    b.rotation.set(Math.PI / 2 + rng.float(-0.4, 0.4), rng.float(0, 3), rng.float(-0.4, 0.4));
    g.add(b);
  }
  const skull = mesh(new THREE.SphereGeometry(0.17, 6, 5), bone, 0.2, 0.16, 0.15);
  skull.scale.set(1, 1.05, 1.15);
  g.add(skull);
  return g;
}

export function makeGrave(seed = 8) {
  const g = new THREE.Group();
  const rng = new RNG(seed);
  const stone = mat(rng.chance(0.5) ? '#5e5b55' : '#696660', { rough: 0.96 });
  const slab = mesh(box(0.7, rng.float(0.9, 1.5), 0.16), stone, 0, 0.55, 0);
  slab.rotation.z = rng.float(-0.12, 0.12);
  slab.rotation.x = rng.float(-0.08, 0.08);
  g.add(slab);
  const dirt = mesh(new THREE.SphereGeometry(0.7, 6, 4), mat('#3f3a30', { rough: 1 }), 0, 0.05, -0.8);
  dirt.scale.set(1, 0.22, 1.4);
  g.add(dirt);
  return g;
}

export function makePortal(color = '#8b5fd6') {
  const g = new THREE.Group();
  const ringMat = new THREE.MeshStandardMaterial({
    color: '#4a3a58',
    emissive: color,
    emissiveIntensity: 1.5,
    roughness: 0.5,
    metalness: 0.4,
  });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.18, 8, 24), ringMat);
  ring.position.y = 3.0;
  ring.castShadow = false;
  g.add(ring);
  const inner = new THREE.Mesh(
    new THREE.CircleGeometry(2.3, 24),
    new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.22, side: THREE.DoubleSide })
  );
  inner.position.y = 3.0;
  g.add(inner);
  const light = new THREE.PointLight(color, 5, 16, 2);
  light.position.y = 3.0;
  g.add(light);
  let t = 0;
  return {
    group: g,
    update(dt) {
      t += dt;
      inner.material.opacity = 0.16 + Math.sin(t * 1.8) * 0.07;
      ring.rotation.z = Math.sin(t * 0.4) * 0.05;
    },
  };
}

export function makeShrine() {
  const g = new THREE.Group();
  const stone = mat('#6d6a62', { rough: 0.95 });
  const base = mesh(new THREE.CylinderGeometry(1.2, 1.35, 0.4, 8), stone, 0, 0.2, 0);
  g.add(base);
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    const p = mesh(new THREE.CylinderGeometry(0.16, 0.2, 1.7, 6), stone, Math.cos(a) * 0.62, 1.2, Math.sin(a) * 0.62);
    g.add(p);
  }
  const bowl = mesh(new THREE.CylinderGeometry(0.55, 0.32, 0.35, 8), stone, 0, 2.1, 0);
  g.add(bowl);
  const flameMat = new THREE.MeshBasicMaterial({ color: '#9fe8d8', transparent: true, opacity: 0.9 });
  const flame = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.7, 6), flameMat);
  flame.position.y = 2.6;
  g.add(flame);
  const light = new THREE.PointLight('#7fe8d0', 5, 12, 2);
  light.position.y = 2.7;
  g.add(light);
  let t = 0;
  return {
    group: g,
    light,
    update(dt) {
      t += dt;
      flame.scale.setScalar(0.9 + Math.sin(t * 7) * 0.08);
      light.intensity = 4.2 + Math.sin(t * 5.3) * 0.8;
    },
  };
}

export function makeBoat() {
  const g = new THREE.Group();
  const hullMat = mat('#5b4227', { rough: 0.9, side: THREE.DoubleSide });
  const hull = mesh(new THREE.CylinderGeometry(0.8, 0.55, 3.2, 8, 1, true, 0, Math.PI), hullMat, 0, 0.55, 0);
  hull.rotation.z = Math.PI / 2;
  hull.rotation.y = Math.PI / 2;
  g.add(hull);
  const seat = mesh(box(1.0, 0.1, 0.4), mat('#4a3524'), 0, 0.62, 0);
  g.add(seat);
  return g;
}

export function makeWolfTotem() {
  const g = new THREE.Group();
  const wood = mat('#4a3626', { rough: 0.95 });
  const pole = mesh(new THREE.CylinderGeometry(0.14, 0.18, 2.4, 6), wood, 0, 1.2, 0);
  g.add(pole);
  const skullMat = mat('#d3cbb4', { rough: 0.8 });
  const skull = mesh(box(0.44, 0.36, 0.5), skullMat, 0, 2.55, 0);
  g.add(skull);
  const snout = mesh(box(0.22, 0.18, 0.3), skullMat, 0, 2.46, 0.36);
  g.add(snout);
  for (const sx of [-1, 1]) {
    const ear = mesh(new THREE.ConeGeometry(0.09, 0.22, 4), skullMat, sx * 0.16, 2.82, -0.05);
    g.add(ear);
    const eye = mesh(new THREE.SphereGeometry(0.04, 5, 4), mat('#d24a2a', { emissive: '#ff5324', emissiveIntensity: 1.6 }), sx * 0.13, 2.6, 0.24);
    g.add(eye);
  }
  return g;
}

export function tintEmissive(obj, color) {
  obj.traverse((o) => {
    if (o.isMesh && o.material && o.material.emissive) {
      o.material = o.material.clone();
      o.material.emissive = new THREE.Color(color);
      o.material.emissiveIntensity = 1.1;
    }
  });
}

export function scaleTo(obj, h) {
  const box3 = new THREE.Box3().setFromObject(obj);
  const size = new THREE.Vector3();
  box3.getSize(size);
  if (size.y > 0) obj.scale.multiplyScalar(clamp(h / size.y, 0.1, 10));
  return obj;
}
