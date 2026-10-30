import * as THREE from 'three';
import {
  createTerrain, createWater, heightAt, distanceToPath, slopeAt, isWater,
  LOCATIONS, WATER_LEVEL, WORLD_RADIUS,
} from './terrain.js';
import { RNG, dist2 } from '../core/utils.js';
import {
  makeHouse, makeTree, makeBush, makeRock, makeFence, makeWell, makeCampfire,
  makeForgeFurnace, makeAnvil, makeTent, makeBarrel, makeCrate, makeChest,
  makeMenhir, makeStoneArch, makePillar, makeCrystal, makeOreNode, makeHerbPatch,
  makeBanner, makeBonePile, makeGrave, makePortal, makeShrine, makeBoat,
  makeWolfTotem, makeSignpost, makeGrassTuft, makeSword, mat,
} from './models.js';
import { buildStaticMesh, flattenGroup, collectInto } from './mergeProps.js';

const VILLAGE = LOCATIONS.village;

export class World {
  constructor(game) {
    this.game = game;
    this.group = new THREE.Group();
    this.group.name = 'world';
    this.colliders = [];
    this.interactables = [];
    this.animated = [];
    this.staticParts = [];
    this.nodes = [];

    this.terrain = createTerrain(176);
    this.group.add(this.terrain);

    this.water = createWater();
    this.group.add(this.water.mesh);

    this._buildVillage();
    this._buildForgeHill();
    this._buildBanditCamp();
    this._buildBarrow();
    this._buildRuins();
    this._buildQuarry();
    this._buildLake();
    this._buildCrossroads();
    this._scatterNature();

    const staticMesh = buildStaticMesh(this.staticParts);
    if (staticMesh) {
      staticMesh.name = 'static-props';
      this.group.add(staticMesh);
    }

    game.scene.add(this.group);
  }

  // ---------- pomocnicze ----------
  addStatic(group) {
    collectInto(this.staticParts, group);
    this._disposeGroup(group);
    return group;
  }

  _disposeGroup(group) {
    group.traverse((o) => {
      if (o.isMesh) o.geometry?.dispose();
    });
  }

  addProp(group, x, z, rotY = 0, { yOffset = 0, collide = null } = {}) {
    group.position.set(x, heightAt(x, z) + yOffset, z);
    group.rotation.y = rotY;
    group.updateMatrixWorld(true);
    this.addStatic(group);
    if (collide) this.colliders.push({ x, z, r: collide });
  }

  addInteractive({ id, kind, x, z, radius = 3, label, mesh, data = {}, cooldown = 0, rotY = 0, yOffset = 0 }) {
    const g = mesh ?? new THREE.Group();
    g.position.set(x, heightAt(x, z) + yOffset, z);
    g.rotation.y = rotY;
    g.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
    this.group.add(g);
    // złoża, skrzynie i kamienie są bryłami — gracz nie powinien w nich stać
    if ((kind === 'resource' || kind === 'chest') && mesh) {
      this.colliders.push({ x, z, r: kind === 'chest' ? 0.75 : 0.8 });
    }
    const node = {
      id, kind, pos: new THREE.Vector3(x, heightAt(x, z), z), radius, label, mesh: g,
      data, cooldown, timer: 0, available: true,
    };
    this.interactables.push(node);
    this.nodes.push(node);
    return node;
  }

  findNearest(pos) {
    let best = null;
    let bestDist = Infinity;
    for (const n of this.interactables) {
      if (!n.available) continue;
      const d = dist2(pos.x, pos.z, n.pos.x, n.pos.z);
      if (d < n.radius && d < bestDist) {
        best = n;
        bestDist = d;
      }
    }
    return best;
  }

  // ---------- wioska ----------
  _buildVillage() {
    const houses = [
      { x: -16, z: 41, rot: 0.7, w: 5.6, d: 4.8, wall: '#b5a07b' },
      { x: -18, z: 25, rot: 1.55, w: 5.2, d: 4.6, wall: '#a89272' },
      { x: 16, z: 42, rot: -0.8, w: 6.0, d: 5.0, wall: '#bfa987' },
      { x: 18, z: 26, rot: -1.5, w: 5.0, d: 4.4, wall: '#ad9576' },
      { x: -5, z: 47, rot: 3.0, w: 5.4, d: 4.8, wall: '#b09a78' },
      { x: 8, z: 48, rot: -2.9, w: 5.8, d: 4.6, wall: '#b7a382' },
    ];
    for (const h of houses) {
      const house = makeHouse({ w: h.w, d: h.d, wall: h.wall, roof: '#5b3d31' });
      this.addProp(house, h.x, h.z, h.rot, { collide: Math.max(h.w, h.d) * 0.52 });
      // beczki i skrzynie przy domach
      this.addProp(makeBarrel(), h.x + Math.cos(h.rot) * 3.6, h.z + Math.sin(h.rot) * 3.6, 0);
    }

    // ognisko
    const fire = makeCampfire();
    fire.group.position.set(0, heightAt(0, 29), 29);
    this.group.add(fire.group);
    this.animated.push(fire);
    this.colliders.push({ x: 0, z: 29, r: 1.1 });

    this.addInteractive({
      id: 'campfire_rest', kind: 'rest', x: 0, z: 29, radius: 3.6,
      label: 'Odpocznij przy ognisku (do świtu)', mesh: null, yOffset: 0,
    });

    // ławy wokół ogniska
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2 + 0.4;
      const bench = new THREE.Group();
      const seat = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.16, 0.5), mat('#4e3a25'));
      seat.position.y = 0.45;
      bench.add(seat);
      for (const sx of [-0.8, 0.8]) {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.45, 0.4), mat('#3d2d1d'));
        leg.position.set(sx, 0.22, 0);
        bench.add(leg);
      }
      const bx = Math.cos(a) * 3.4;
      const bz = 29 + Math.sin(a) * 3.4;
      this.addProp(bench, bx, bz, -a, { collide: 1.1 });
    }

    // studnia
    this.addProp(makeWell(), -4.5, 34.5, 0.4, { collide: 1.4 });

    // kuźnia Borysa
    const furnace = makeForgeFurnace();
    furnace.group.position.set(-12, heightAt(-12, 20.5), 20.5);
    furnace.group.rotation.y = 1.8;
    this.group.add(furnace.group);
    this.animated.push(furnace);
    this.colliders.push({ x: -12, z: 20.5, r: 1.5 });
    this.addInteractive({
      id: 'village_anvil', kind: 'station', x: -8.6, z: 21.6, radius: 3.2,
      label: 'Kuźnia Borysa — rzemiosło', mesh: makeAnvil(),
      data: { station: 'forge', name: 'Kuźnia Borysa' },
    });
    this.addProp(makeCrate(), -10.5, 23.5, 0.4);
    this.addProp(makeCrate(0.7), -10.2, 23.9, 1.1);
    this.addProp(makeBarrel(), -13.6, 23.2, 0);

    // stragan Zorzana
    const stall = new THREE.Group();
    for (const [sx, sz] of [[-1.4, -1], [1.4, -1], [-1.4, 1], [1.4, 1]]) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 2.4, 5), mat('#4a3524'));
      post.position.set(sx, 1.2, sz);
      stall.add(post);
    }
    const canopy = new THREE.Mesh(new THREE.ConeGeometry(2.3, 0.9, 4), mat('#6b3f4a'));
    canopy.position.y = 2.7;
    canopy.rotation.y = Math.PI / 4;
    canopy.scale.set(1, 1, 0.8);
    stall.add(canopy);
    const table = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.14, 1.2), mat('#5a4229'));
    table.position.y = 0.9;
    stall.add(table);
    for (let i = 0; i < 4; i++) {
      const sack = new THREE.Mesh(new THREE.SphereGeometry(0.26, 6, 5), mat(i % 2 ? '#8a7a5a' : '#7a6647'));
      sack.position.set(-0.9 + i * 0.6, 1.12, 0.2);
      sack.scale.y = 1.25;
      stall.add(sack);
    }
    this.addProp(stall, -13.5, 43, 0.3, { collide: 1.7 });
    this.addProp(makeCrate(), -11.2, 44.4, 0.7);

    // ogródek Mareny
    for (let i = 0; i < 4; i++) {
      const patch = makeHerbPatch(20 + i);
      this.addProp(patch, 12 + Math.cos(i * 1.7) * 2.2, 41 + Math.sin(i * 1.7) * 2.2, 0);
    }
    const gardenFence = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const f = makeFence(3.2, i + 2);
      f.position.set(0, 0, 0);
      f.rotation.y = (i * Math.PI) / 2;
      f.position.set(Math.cos(i * Math.PI / 2 + Math.PI / 4) * 3.4, 0, Math.sin(i * Math.PI / 2 + Math.PI / 4) * 3.4);
      gardenFence.add(f);
    }
    this.addProp(gardenFence, 12, 41, 0);
    this.addInteractive({
      id: 'village_herbs', kind: 'resource', x: 10.6, z: 43.2, radius: 2.6,
      label: 'Zbierz zioła', mesh: makeHerbPatch(91), cooldown: 45,
      data: { item: 'herbs', qty: 2 },
    });

    // palisada z bramą
    const fenceAngles = [0.2, 0.9, 1.6, 3.6, 4.3, 5.0, 5.6];
    for (const a of fenceAngles) {
      const r = 23;
      const f = makeFence(9, Math.floor(a * 10));
      this.addProp(f, Math.cos(a) * r, 32 + Math.sin(a) * r * 0.95, -a + Math.PI / 2);
    }
    // słupy bramy
    for (const sx of [-1, 1]) {
      const post = new THREE.Group();
      const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.3, 4.2, 6), mat('#4a3322'));
      beam.position.y = 2.1;
      post.add(beam);
      const torch = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.7, 5), new THREE.MeshBasicMaterial({ color: '#ffb45c' }));
      torch.position.y = 4.4;
      post.add(torch);
      this.addProp(post, sx * 3.2, 19, 0, { collide: 0.4 });
      const light = new THREE.PointLight('#ff9a45', 3.2, 9, 2);
      light.position.set(sx * 3.2, heightAt(sx * 3.2, 19) + 4.2, 19);
      this.group.add(light);
    }

    // banery
    this.addProp(makeBanner('#3f5a4a'), 6.5, 22.5, -0.4);
    this.addProp(makeBanner('#6b3f4a'), -5.5, 21.5, 0.5);
  }

  // ---------- Kowalska Góra ----------
  _buildForgeHill() {
    const cx = LOCATIONS.forge.x;
    const cz = LOCATIONS.forge.z;
    const baseY = heightAt(cx, cz);

    // starożytna kuźnia
    const furnace = new THREE.Group();
    const stone = mat('#5a5a58', { rough: 0.95 });
    const body = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.6, 2.4), stone);
    body.position.y = 1.3;
    furnace.add(body);
    const chimney = new THREE.Mesh(new THREE.BoxGeometry(1.1, 3.4, 1.1), stone);
    chimney.position.set(0.7, 3.4, -0.5);
    furnace.add(chimney);
    const glowMat = new THREE.MeshBasicMaterial({ color: '#59c8e8' });
    const mouth = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.0, 0.12), glowMat);
    mouth.position.set(-0.4, 1.3, 1.22);
    furnace.add(mouth);
    const fireLight = new THREE.PointLight('#59c8e8', 7, 15, 2);
    fireLight.position.set(0, 1.8, 1.6);
    furnace.add(fireLight);
    furnace.position.set(cx + 3.4, baseY, cz - 2.2);
    furnace.rotation.y = -0.9;
    this.group.add(furnace);
    this.animated.push({ update: (dt) => { fireLight.intensity = 6 + Math.sin(performance.now() * 0.004) * 1.2; } });
    this.colliders.push({ x: cx + 3.4, z: cz - 2.2, r: 2.2 });

    const anvil = new THREE.Group();
    const anvilBody = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.7, 0.8), mat('#3f444a', { metal: 0.75, rough: 0.4 }));
    anvilBody.position.y = 1.0;
    anvil.add(anvilBody);
    const anvilBase = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.6, 0.7, 6), mat('#4a4a4a'));
    anvilBase.position.y = 0.35;
    anvil.add(anvilBase);
    this.addInteractive({
      id: 'ancient_anvil', kind: 'station', x: cx, z: cz + 1.5, radius: 3.6,
      label: 'Starożytna kuźnia — rzemiosło', mesh: anvil,
      data: { station: 'ancient_forge', name: 'Starożytna kuźnia' },
    });

    // kamienny krąg
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * Math.PI * 2;
      this.addProp(makeMenhir(1.8 + Math.random() * 0.9, 30 + i), cx + Math.cos(a) * 9.5, cz + Math.sin(a) * 9.5, a, { collide: 0.5 });
    }
    for (let i = 0; i < 3; i++) {
      const a = 0.8 + i * 2.1;
      const crystal = makeCrystal('#6ee0d6', 1.1);
      const crystalX = cx + Math.cos(a) * 6.5;
      const crystalZ = cz + Math.sin(a) * 6.5;
      crystal.position.set(crystalX, heightAt(crystalX, crystalZ), crystalZ);
      this.group.add(crystal);
    }

    // okruch Ostrza Świtu ukryty w kamieniu (trzecie źródło)
    const shardRock = new THREE.Group();
    shardRock.add(makeRock(741, 1.25));
    const shardCrystal = makeCrystal('#ffd27a', 0.75);
    shardCrystal.position.y = 0.85;
    shardRock.add(shardCrystal);
    this.addInteractive({
      id: 'forge_shard', kind: 'resource', x: cx - 5.4, z: cz + 5.2, radius: 2.9,
      label: 'Wyjmij okruch z kamiennej szczeliny', mesh: shardRock, cooldown: 999999,
      data: { item: 'shard_dawn', qty: 1, once: true },
    });

    this.addInteractive({
      id: 'forge_metal', kind: 'resource', x: cx + 6.4, z: cz + 4.4, radius: 2.6,
      label: 'Wykop starożytny metal', mesh: makeOreNode(140), cooldown: 120,
      data: { item: 'ancient_metal', qty: 1 },
    });

    // ruda na zboczu
    for (let i = 0; i < 3; i++) {
      const a = -0.6 + i * 1.9;
      const nx = cx + Math.cos(a) * 12;
      const nz = cz + Math.sin(a) * 12;
      this.addInteractive({
        id: `ore_hill_${i}`, kind: 'resource', x: nx, z: nz, radius: 2.6,
        label: 'Wydobądź rudę żelaza', mesh: makeOreNode(40 + i), cooldown: 50,
        data: { item: 'iron_ore', qty: 2 },
      });
    }
  }

  // ---------- obóz bandytów ----------
  _buildBanditCamp() {
    const cx = LOCATIONS.bandits.x;
    const cz = LOCATIONS.bandits.z;

    const tents = [
      { x: cx - 5, z: cz + 5, rot: 0.4, color: '#5b4a35' },
      { x: cx + 6, z: cz - 3, rot: -1.1, color: '#4f4030' },
      { x: cx - 2, z: cz - 6, rot: 2.1, color: '#5d4a38' },
    ];
    for (const t of tents) {
      this.addProp(makeTent(t.color), t.x, t.z, t.rot, { collide: 1.5 });
    }

    const fire = makeCampfire();
    fire.group.position.set(cx, heightAt(cx, cz), cz);
    this.group.add(fire.group);
    this.animated.push(fire);
    this.colliders.push({ x: cx, z: cz, r: 1.1 });

    this.addProp(makeWolfTotem(), cx + 8, cz + 6, 0.6, { collide: 0.5 });
    this.addProp(makeBanner('#7a2f2f'), cx - 8, cz - 2, 1.2);
    this.addProp(makeBanner('#7a2f2f'), cx + 2, cz + 9, -0.4);
    for (let i = 0; i < 4; i++) {
      this.addProp(makeCrate(0.7), cx + Math.cos(i * 2.3) * 9.5, cz + Math.sin(i * 2.3) * 9.5, i);
    }
    for (let i = 0; i < 3; i++) {
      this.addProp(makeBarrel(), cx - 3 + i * 1.1, cz + 8.5, i * 0.7);
    }
    // palisada obozu
    for (let i = 0; i < 6; i++) {
      const a = i * 1.05;
      this.addProp(makeFence(5.5, i + 5), cx + Math.cos(a) * 13, cz + Math.sin(a) * 13, -a + Math.PI / 2);
    }

    // skrzynia z łupami
    const chest = makeChest();
    this.addInteractive({
      id: 'bandit_chest', kind: 'chest', x: cx - 6.5, z: cz - 4, radius: 3.0,
      label: 'Skrzynia bandytów', mesh: chest, rotY: 0.5,
      data: {
        loot: [
          ['stolen_grain', 1], ['old_key', 1], ['gold', 65],
          ['health_potion', 2], ['iron_ore', 2],
        ],
      },
    });
    this.addInteractive({
      id: 'bandit_ore', kind: 'resource', x: cx + 11, z: cz + 9, radius: 2.6,
      label: 'Wydobądź rudę żelaza', mesh: makeOreNode(77), cooldown: 55,
      data: { item: 'iron_ore', qty: 2 },
    });
  }

  // ---------- kurhan ----------
  _buildBarrow() {
    const cx = LOCATIONS.barrow.x;
    const cz = LOCATIONS.barrow.z;
    const baseY = heightAt(cx, cz);

    // kopiec
    const moundGeo = new THREE.SphereGeometry(8.5, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.5);
    const mound = new THREE.Mesh(moundGeo, mat('#4d4a41', { rough: 1 }));
    mound.scale.set(1, 0.62, 1);
    mound.position.set(cx, baseY - 0.4, cz - 3);
    mound.receiveShadow = true;
    mound.castShadow = true;
    this.group.add(mound);
    this.colliders.push({ x: cx, z: cz - 3, r: 4.5 });

    // wejście do kurhanu
    for (const sx of [-1, 1]) {
      const doorPost = new THREE.Mesh(new THREE.BoxGeometry(0.7, 2.6, 0.7), mat('#5e5a52'));
      doorPost.position.set(cx + sx * 1.2, baseY + 1.3, cz + 5.6);
      doorPost.castShadow = true;
      this.group.add(doorPost);
    }
    const doorLintel = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.6, 0.9), mat('#5e5a52'));
    doorLintel.position.set(cx, baseY + 2.8, cz + 5.6);
    this.group.add(doorLintel);

    for (let i = 0; i < 5; i++) {
      const a = 0.3 + i * 1.1;
      this.addProp(makeGrave(60 + i), cx + Math.cos(a) * 11, cz + Math.sin(a) * 11, a);
    }
    for (let i = 0; i < 4; i++) {
      const a = 1.2 + i * 0.9;
      this.addProp(makeMenhir(1.9 + (i % 2) * 0.5, 70 + i), cx + Math.cos(a) * 13, cz + Math.sin(a) * 13, a, { collide: 0.45 });
    }
    this.addProp(makeBonePile(4), cx - 5, cz + 8, 0.4);
    this.addProp(makeBonePile(9), cx + 6, cz + 6, 1.4);

    this.addInteractive({
      id: 'barrow_chest', kind: 'chest', x: cx + 2, z: cz + 8.5, radius: 3.0,
      label: 'Zapomniana skrzynia', mesh: makeChest(), rotY: -0.7,
      data: { loot: [['crystal_mana', 2], ['gold', 45], ['ancient_metal', 1]] },
    });
    this.addInteractive({
      id: 'barrow_metal', kind: 'resource', x: cx - 9, z: cz + 6, radius: 2.8,
      label: 'Wykop starożytny metal', mesh: makeOreNode(123), cooldown: 90,
      data: { item: 'ancient_metal', qty: 1, rare: true },
    });
    this.addInteractive({
      id: 'barrow_grave_herb', kind: 'resource', x: cx + 9, z: cz - 4, radius: 2.6,
      label: 'Zbierz zioła', mesh: makeHerbPatch(31), cooldown: 45,
      data: { item: 'herbs', qty: 2 },
    });
  }

  // ---------- Mgliste Wrota ----------
  _buildRuins() {
    const cx = LOCATIONS.ruins.x;
    const cz = LOCATIONS.ruins.z;
    const baseY = heightAt(cx, cz);

    const portal = makePortal('#8b5fd6');
    portal.group.position.set(cx, baseY, cz - 4);
    this.group.add(portal.group);
    this.animated.push(portal);

    this.addProp(makeStoneArch(), cx, cz + 6, 0, { collide: 2.4 });

    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + 0.3;
      this.addProp(makePillar(3.4 + (i % 3) * 0.7), cx + Math.cos(a) * 15, cz + Math.sin(a) * 15, a, { collide: 0.7 });
    }
    // resztki murów
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const wall = new THREE.Group();
      const w = new THREE.Mesh(new THREE.BoxGeometry(4.2, 1.6 + Math.random() * 1.4, 0.7), mat('#615e56'));
      w.position.y = 0.9;
      wall.add(w);
      this.addProp(wall, cx + Math.cos(a) * 19, cz + Math.sin(a) * 19, -a, { collide: 1.4 });
    }
    for (let i = 0; i < 4; i++) {
      const a = 0.8 + i * 1.6;
      const brazier = new THREE.Group();
      const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.24, 0.4, 7), mat('#4a4a4a'));
      bowl.position.y = 1.5;
      brazier.add(bowl);
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.16, 1.4, 5), mat('#3a3a3a'));
      stem.position.y = 0.7;
      brazier.add(stem);
      const flame = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.6, 5), new THREE.MeshBasicMaterial({ color: '#a678e8' }));
      flame.position.y = 1.9;
      brazier.add(flame);
      this.addProp(brazier, cx + Math.cos(a) * 12, cz + Math.sin(a) * 12, 0);
      const light = new THREE.PointLight('#9c6fe8', 3.4, 10, 2);
      light.position.set(cx + Math.cos(a) * 12, heightAt(cx + Math.cos(a) * 12, cz + Math.sin(a) * 12) + 2, cz + Math.sin(a) * 12);
      this.group.add(light);
    }
    this.addProp(makeBonePile(15), cx + 5, cz + 3, 0.2);
    this.addProp(makeBonePile(16), cx - 6, cz - 1, 1.2);
    this.addInteractive({
      id: 'ruins_chest', kind: 'chest', x: cx + 10, z: cz + 10, radius: 3.0,
      label: 'Skrzynia strażnika', mesh: makeChest(), rotY: 1.0,
      data: { loot: [['ancient_metal', 1], ['gold', 80], ['might_elixir', 1], ['crystal_mana', 1]] },
    });
    this.addInteractive({
      id: 'ruins_herbs', kind: 'resource', x: cx - 12, z: cz + 12, radius: 2.6,
      label: 'Zbierz zioła', mesh: makeHerbPatch(55), cooldown: 45,
      data: { item: 'herbs', qty: 2 },
    });
  }

  // ---------- kamieniołom ----------
  _buildQuarry() {
    const cx = LOCATIONS.quarry.x;
    const cz = LOCATIONS.quarry.z;
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      this.addProp(makeRock(200 + i, 1.4 + Math.random() * 1.2), cx + Math.cos(a) * 8, cz + Math.sin(a) * 8, a, { collide: 1.3 });
    }
    for (let i = 0; i < 3; i++) {
      const a = 0.5 + i * 2.0;
      this.addInteractive({
        id: `quarry_ore_${i}`, kind: 'resource', x: cx + Math.cos(a) * 4.2, z: cz + Math.sin(a) * 4.2, radius: 2.8,
        label: 'Wydobądź rudę żelaza', mesh: makeOreNode(300 + i), cooldown: 45,
        data: { item: 'iron_ore', qty: 2 },
      });
    }
    this.addProp(makeCrate(1.0), cx + 6, cz + 6, 0.3);
    this.addProp(makeBarrel(), cx - 6, cz + 5, 0.9);
  }

  // ---------- jezioro ----------
  _buildLake() {
    const cx = LOCATIONS.lake.x;
    const cz = LOCATIONS.lake.z;
    // pomost
    const dock = new THREE.Group();
    for (let i = 0; i < 5; i++) {
      const plank = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.12, 0.34), mat('#5a422a'));
      plank.position.set(0, 0.2, i * 0.4 - 1.2);
      dock.add(plank);
    }
    for (const sx of [-0.7, 0.7]) {
      const pile = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 1.6, 5), mat('#42301f'));
      pile.position.set(sx, -0.4, 1.6);
      dock.add(pile);
    }
    dock.position.set(cx + 16, WATER_LEVEL + 0.15, cz + 4);
    dock.rotation.y = -0.6;
    this.group.add(dock);

    const boat = makeBoat();
    boat.position.set(cx + 14, WATER_LEVEL + 0.12, cz + 6.5);
    boat.rotation.y = 0.8;
    this.group.add(boat);

    for (let i = 0; i < 7; i++) {
      const a = -0.4 + i * 0.4;
      const rx = cx + Math.cos(a) * 22;
      const rz = cz + Math.sin(a) * 22;
      if (!isWater(rx, rz) && distanceToPath(rx, rz) > 5) {
        this.addProp(makeRock(500 + i, 0.7 + Math.random() * 0.6), rx, rz, a);
      }
    }
    this.addInteractive({
      id: 'lake_herbs', kind: 'resource', x: cx + 22, z: cz - 8, radius: 2.6,
      label: 'Zbierz zioła', mesh: makeHerbPatch(66), cooldown: 45,
      data: { item: 'herbs', qty: 3 },
    });
  }

  // ---------- rozdroże i kapliczki ----------
  _buildCrossroads() {
    this.addProp(makeSignpost(), 0, 6, 0.4, { collide: 0.4 });

    const shrine = makeShrine();
    shrine.group.position.set(9, heightAt(9, 9), 9);
    this.group.add(shrine.group);
    this.animated.push(shrine);
    this.colliders.push({ x: 9, z: 9, r: 1.2 });
    this.addInteractive({
      id: 'crossroads_shrine', kind: 'shrine', x: 9, z: 9, radius: 3.4,
      label: 'Kapliczka — złóż ofiarę (20 złota)', mesh: null,
      data: { cost: 20 },
    });

    // drogowskaz przy wiosce
    this.addInteractive({
      id: 'signpost', kind: 'sign', x: 0, z: 17.5, radius: 3,
      label: 'Przeczytaj drogowskaz (mapa)', mesh: null,
    });
  }

  // ---------- roślinność ----------
  _scatterNature() {
    const rng = new RNG(424242);
    const trees = [];
    const occupied = [
      { x: VILLAGE.x, z: VILLAGE.z, r: 27 },
      { x: LOCATIONS.forge.x, z: LOCATIONS.forge.z, r: 15 },
      { x: LOCATIONS.bandits.x, z: LOCATIONS.bandits.z, r: 16 },
      { x: LOCATIONS.barrow.x, z: LOCATIONS.barrow.z, r: 17 },
      { x: LOCATIONS.ruins.x, z: LOCATIONS.ruins.z, r: 23 },
      { x: LOCATIONS.quarry.x, z: LOCATIONS.quarry.z, r: 12 },
      { x: LOCATIONS.lake.x, z: LOCATIONS.lake.z, r: 24 },
    ];

    const isFree = (x, z, pad = 0) => {
      for (const o of occupied) if (dist2(x, z, o.x, o.z) < o.r + pad) return false;
      return true;
    };

    for (let i = 0; i < 240 && trees.length < 150; i++) {
      const a = rng.float(0, Math.PI * 2);
      const r = 30 + Math.pow(rng.next(), 0.65) * (WORLD_RADIUS - 34);
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      if (isWater(x, z) || distanceToPath(x, z) < 4.5) continue;
      if (!isFree(x, z, 0)) continue;
      if (slopeAt(x, z) > 0.95) continue;
      let tooClose = false;
      for (const t of trees) {
        if (dist2(x, z, t.x, t.z) < 4.4) {
          tooClose = true;
          break;
        }
      }
      if (tooClose) continue;

      const h = heightAt(x, z);
      const kind = h > 9 ? 'pine' : rng.chance(0.28) ? 'dead' : rng.chance(0.45) ? 'pine' : 'oak';
      trees.push({ x, z });
      this.addProp(makeTree(1000 + i, { kind }), x, z, rng.float(0, Math.PI * 2), { collide: kind === 'oak' ? 0.6 : 0.45 });
    }

    for (let i = 0; i < 90; i++) {
      const a = rng.float(0, Math.PI * 2);
      const r = 26 + rng.float(0, WORLD_RADIUS - 32);
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      if (isWater(x, z) || distanceToPath(x, z) < 3.2 || !isFree(x, z)) continue;
      const scale = rng.float(0.5, 1.5);
      this.addProp(makeRock(2000 + i, scale), x, z, rng.float(0, 6.28), { collide: scale > 1.1 ? scale * 0.7 : 0 });
    }

    const bushes = [];
    for (let i = 0; i < 110; i++) {
      const a = rng.float(0, Math.PI * 2);
      const r = 24 + rng.float(0, 70);
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      if (isWater(x, z) || distanceToPath(x, z) < 2.6) continue;
      let close = false;
      for (const b of bushes) if (dist2(x, z, b.x, b.z) < 2.4) { close = true; break; }
      if (close) continue;
      bushes.push({ x, z });
      this.addProp(makeBush(3000 + i), x, z, rng.float(0, 6.28));
    }

    // trawa jako jedna instancja
    const bladeGeo = new THREE.ConeGeometry(0.09, 0.55, 3);
    bladeGeo.translate(0, 0.27, 0);
    const grassMat = new THREE.MeshLambertMaterial({ color: '#5d7a3e' });
    const count = 1400;
    const inst = new THREE.InstancedMesh(bladeGeo, grassMat, count);
    inst.castShadow = false;
    inst.receiveShadow = false;
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();
    let placed = 0;
    for (let attempts = 0; attempts < count * 6 && placed < count; attempts++) {
      const a = rng.float(0, Math.PI * 2);
      const r = 8 + Math.pow(rng.next(), 0.5) * 88;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      if (isWater(x, z) || distanceToPath(x, z) < 2.2) continue;
      if (slopeAt(x, z) > 0.75) continue;
      const y = heightAt(x, z);
      dummy.position.set(x, y, z);
      dummy.rotation.set(rng.float(-0.2, 0.2), rng.float(0, 6.28), rng.float(-0.2, 0.2));
      dummy.scale.setScalar(rng.float(0.7, 1.7));
      dummy.updateMatrix();
      inst.setMatrixAt(placed, dummy.matrix);
      color.setHSL(0.24 + rng.float(-0.03, 0.05), rng.float(0.3, 0.5), rng.float(0.28, 0.42));
      inst.setColorAt(placed, color);
      placed += 1;
    }
    inst.count = placed;
    inst.instanceMatrix.needsUpdate = true;
    if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
    inst.frustumCulled = false;
    this.group.add(inst);
    this.grassInstanced = inst;
  }

  update(dt, time) {
    this.water.update(dt);
    for (const a of this.animated) if (a.update) a.update(dt);
    for (const n of this.nodes) {
      if (!n.available && n.timer > 0) {
        n.timer -= dt;
        if (n.timer <= 0) {
          n.available = true;
          if (n.mesh) n.mesh.visible = true;
        }
      }
    }
  }

  harvest(node) {
    if (!node.available) return false;
    node.available = false;
    node.timer = node.cooldown;
    if (node.mesh) node.mesh.visible = false;
    return true;
  }
}
