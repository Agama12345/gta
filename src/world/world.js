import * as THREE from 'three';
import {
  heightAt, isWater, distanceToPath, slopeAt, forestMask,
  LOCATIONS, WATER_LEVEL, WORLD_RADIUS, CHUNK_SIZE, TerrainManager, createWater,
} from './terrain.js';
import { RNG, dist2 } from '../core/utils.js';
import {
  makeHouse, makeTree, makeBush, makeRock, makeFence, makeWell, makeCampfire,
  makeForgeFurnace, makeAnvil, makeTent, makeBarrel, makeCrate, makeChest,
  makeMenhir, makeStoneArch, makePillar, makeCrystal, makeOreNode, makeHerbPatch,
  makeBanner, makeBonePile, makeGrave, makePortal, makeShrine, makeBoat,
  makeWolfTotem, makeSignpost, mat,
} from './models.js';
import { PropBatcher, flattenGroup } from './mergeProps.js';

const box = (w, h, d) => new THREE.BoxGeometry(w, h, d);
const cyl = (rt, rb, h, s = 6) => new THREE.CylinderGeometry(rt, rb, h, s);

function mesh(geo, material, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(geo, material);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

export class World {
  constructor(game) {
    this.game = game;
    this.group = new THREE.Group();
    this.group.name = 'world';
    this.colliders = [];
    this.interactables = [];
    this.nodes = [];
    this.animated = [];
    this.propsGroup = new THREE.Group();
    this.propsGroup.name = 'static-props';
    this.group.add(this.propsGroup);
    this.batcher = new PropBatcher(this.propsGroup);
    this.rng = new RNG(20260413);

    this.terrain = new TerrainManager(this.group);
    this.water = createWater();
    this.group.add(this.water.mesh);

    this._buildVillage();
    this._buildTradingPost();
    this._buildForgeHill();
    this._buildBanditCamp();
    this._buildBarrow();
    this._buildRuins();
    this._buildQuarry();
    this._buildLake();
    this._buildCastle();
    this._buildHermitage();
    this._buildSwamp();
    this._buildPass();
    this._buildCircle();
    this._buildMine();
    this._buildCrossroads();
    this._buildHighlands();
    this._buildRoadCamp();
    this._scatterNature();

    this.batcher.finalize(true);

    game.scene.add(this.group);
    this.terrain.buildInitial(game.player?.pos ?? new THREE.Vector3(0, 0, 360));
  }

  // ---------------- pomocnicze ----------------
  addStatic(group, x, z, rotY = 0, { yOffset = 0, collide = null, whole = false } = {}) {
    const y = heightAt(x, z) + yOffset;
    if (whole) {
      group.position.set(x, y, z);
      group.rotation.y = rotY;
      this.group.add(group);
    } else {
      this.batcher.add(group, x, y, z, rotY);
    }
    if (collide) this.colliders.push({ x, z, r: collide });
    return group;
  }

  addInteractive({ id, kind, x, z, radius = 3, label, mesh: prop, data = {}, cooldown = 0, rotY = 0, yOffset = 0 }) {
    const g = prop ?? new THREE.Group();
    g.position.set(x, heightAt(x, z) + yOffset, z);
    g.rotation.y = rotY;
    g.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
    this.group.add(g);
    if (kind === 'resource' || kind === 'chest') {
      this.colliders.push({ x, z, r: kind === 'chest' ? 0.8 : 0.9 });
    }
    const node = {
      id, kind, pos: new THREE.Vector3(x, heightAt(x, z), z), radius, label, mesh: g,
      data, cooldown, timer: 0, available: true,
    };
    this.interactables.push(node);
    this.nodes.push(node);
    return node;
  }

  addLight(color, intensity, distance, x, z, yOffset = 3) {
    const light = new THREE.PointLight(color, intensity, distance, 2);
    light.position.set(x, heightAt(x, z) + yOffset, z);
    this.group.add(light);
    return light;
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

  update(dt, time, playerPos) {
    this.water.update(dt);
    for (const a of this.animated) a.update?.(dt);
    for (const n of this.nodes) {
      if (!n.available && n.timer > 0) {
        n.timer -= dt;
        if (n.timer <= 0) {
          n.available = true;
          if (n.mesh) n.mesh.visible = true;
        }
      }
    }
    if (playerPos) this.terrain.update(playerPos, dt);
  }

  harvest(node) {
    if (!node.available) return false;
    node.available = false;
    node.timer = node.cooldown;
    if (node.mesh) node.mesh.visible = false;
    return true;
  }

  // =========================================================================
  // WILCZA DOLINA — główna osada
  // =========================================================================
  _buildVillage() {
    const cx = LOCATIONS.village.x;
    const cz = LOCATIONS.village.z;
    const rng = new RNG(77);

    const houses = [
      { a: 0.5, r: 34, w: 6.2, d: 5.2, wall: '#b7a17c' },
      { a: 1.15, r: 40, w: 5.4, d: 4.8, wall: '#a89272' },
      { a: 2.05, r: 36, w: 6.4, d: 5.4, wall: '#bfa987' },
      { a: 2.8, r: 42, w: 5.2, d: 4.6, wall: '#ad9576' },
      { a: 3.6, r: 38, w: 6.0, d: 5.0, wall: '#b09a78' },
      { a: 4.3, r: 44, w: 5.8, d: 4.8, wall: '#b7a382' },
      { a: 5.1, r: 35, w: 5.0, d: 4.4, wall: '#b3a07f' },
      { a: 5.75, r: 46, w: 6.6, d: 5.6, wall: '#a58f70' },
    ];
    for (const h of houses) {
      const x = cx + Math.cos(h.a) * h.r;
      const z = cz + Math.sin(h.a) * h.r;
      const rot = -h.a + Math.PI / 2;
      this.addStatic(makeHouse({ w: h.w, d: h.d, wall: h.wall, roof: '#5b3d31' }), x, z, rot, {
        collide: Math.max(h.w, h.d) * 0.5,
      });
      this.batcher.add(makeBarrel(), x + Math.cos(h.a + 0.8) * 3.4, heightAt(x, z), z + Math.sin(h.a + 0.8) * 3.4, rng.float(0, 3));
      if (rng.chance(0.6)) {
        this.batcher.add(makeCrate(0.75), x + Math.cos(h.a - 0.9) * 3.2, heightAt(x, z), z + Math.sin(h.a - 0.9) * 3.2, rng.float(0, 3));
      }
    }

    // ognisko + ławy + miejsce odpoczynku
    const fire = makeCampfire();
    fire.group.position.set(cx, heightAt(cx, cz), cz);
    this.group.add(fire.group);
    this.animated.push(fire);
    this.colliders.push({ x: cx, z: cz, r: 1.2 });

    this.addInteractive({
      id: 'campfire_rest', kind: 'rest', x: cx, z: cz, radius: 4.2,
      label: 'Odpocznij przy ognisku (do świtu)', mesh: null,
    });

    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + 0.5;
      const bench = new THREE.Group();
      bench.add(mesh(box(2.6, 0.18, 0.55), mat('#4e3a25'), 0, 0.5, 0));
      for (const sx of [-0.95, 0.95]) bench.add(mesh(box(0.18, 0.5, 0.45), mat('#3d2d1d'), sx, 0.25, 0));
      const bx = cx + Math.cos(a) * 4.6;
      const bz = cz + Math.sin(a) * 4.6;
      this.addStatic(bench, bx, bz, -a, { collide: 1.2 });
    }

    // studnia
    this.addStatic(makeWell(), cx - 9, cz + 6, 0.4, { collide: 1.5 });

    // kuźnia Borysa
    const furnace = makeForgeFurnace();
    furnace.group.position.set(cx - 24, heightAt(cx - 24, cz - 10), cz - 10);
    furnace.group.rotation.y = 1.4;
    this.group.add(furnace.group);
    this.animated.push(furnace);
    this.colliders.push({ x: cx - 24, z: cz - 10, r: 1.7 });
    this.addInteractive({
      id: 'village_anvil', kind: 'station', x: cx - 19, z: cz - 8, radius: 3.6,
      label: 'Kuźnia Borysa — rzemiosło', mesh: makeAnvil(),
      data: { station: 'forge', name: 'Kuźnia Borysa' },
    });
    for (let i = 0; i < 3; i++) {
      this.batcher.add(makeCrate(0.6 + i * 0.1), cx - 21 + i * 1.4, heightAt(cx - 21, cz - 5), cz - 5 + (i % 2), i);
    }

    // stragany
    for (let s = 0; s < 2; s++) {
      const sx = cx + 16 + s * 6;
      const sz = cz + 12 - s * 3;
      const stall = new THREE.Group();
      for (const [ox, oz] of [[-1.5, -1], [1.5, -1], [-1.5, 1], [1.5, 1]]) {
        stall.add(mesh(cyl(0.08, 0.08, 2.5, 5), mat('#4a3524'), ox, 1.25, oz));
      }
      const canopy = mesh(new THREE.ConeGeometry(2.5, 0.9, 4), mat(s === 0 ? '#6b3f4a' : '#3f5a4a'), 0, 2.8, 0);
      canopy.rotation.y = Math.PI / 4;
      canopy.scale.set(1, 1, 0.82);
      stall.add(canopy);
      stall.add(mesh(box(2.6, 0.14, 1.3), mat('#5a4229'), 0, 0.95, 0));
      for (let i = 0; i < 4; i++) {
        const sack = mesh(new THREE.SphereGeometry(0.27, 6, 5), mat(i % 2 ? '#8a7a5a' : '#7a6647'), -0.95 + i * 0.62, 1.16, 0.2);
        sack.scale.y = 1.3;
        stall.add(sack);
      }
      this.addStatic(stall, sx, sz, 0.4, { collide: 1.8 });
    }

    // ogródek Mareny
    for (let i = 0; i < 6; i++) {
      const a = i * 1.1;
      this.batcher.add(makeHerbPatch(20 + i), cx + 26 + Math.cos(a) * 3, heightAt(cx + 26, cz - 18), cz - 18 + Math.sin(a) * 3, a);
    }
    const gardenFence = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const f = makeFence(4.4, i + 2);
      f.rotation.y = (i * Math.PI) / 2;
      f.position.set(Math.cos(i * Math.PI / 2 + Math.PI / 4) * 4.6, 0, Math.sin(i * Math.PI / 2 + Math.PI / 4) * 4.6);
      gardenFence.add(f);
    }
    this.addStatic(gardenFence, cx + 26, cz - 18, 0);
    this.addInteractive({
      id: 'village_herbs', kind: 'resource', x: cx + 24, z: cz - 21, radius: 3,
      label: 'Zbierz zioła', mesh: makeHerbPatch(91), cooldown: 45,
      data: { item: 'herbs', qty: 2 },
    });

    // palisada + brama od strony traktu (na południe, z = -)
    const gateZ = cz - 52;
    for (const sx of [-1, 1]) {
      const post = new THREE.Group();
      post.add(mesh(cyl(0.26, 0.32, 5.0, 6), mat('#4a3322'), 0, 2.5, 0));
      const torch = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.75, 5), new THREE.MeshBasicMaterial({ color: '#ffb45c' }));
      torch.position.y = 5.1;
      post.add(torch);
      this.addStatic(post, sx * 4.4, gateZ, 0, { collide: 0.6 });
      this.addLight('#ff9a45', 4.2, 14, sx * 4.4, gateZ, 5);
    }
    const fenceAngles = [0.15, 0.75, 1.35, 1.95, 2.55, 3.7, 4.3, 4.9, 5.5, 6.1];
    for (const a of fenceAngles) {
      const r = 54;
      const x = cx + Math.cos(a) * r;
      const z = cz + Math.sin(a) * r;
      if (Math.abs(x - cx) < 7 && z < cz) continue;
      this.batcher.add(makeFence(12, Math.floor(a * 10)), x, heightAt(x, z), z, -a + Math.PI / 2);
    }

    // banery i beczki przy bramie
    this.batcher.add(makeBanner('#3f5a4a'), cx + 8, heightAt(cx + 8, gateZ + 6), gateZ + 6, -0.4);
    this.batcher.add(makeBanner('#6b3f4a'), cx - 8, heightAt(cx - 8, gateZ + 6), gateZ + 6, 0.5);

    // skrzynia w wiosce (nagroda za eksplorację)
    this.addInteractive({
      id: 'village_chest', kind: 'chest', x: cx - 30, z: cz + 16, radius: 3.2,
      label: 'Stara skrzynia', mesh: makeChest(), rotY: 0.7,
      data: { loot: [['bread', 2], ['gold', 35], ['leather_hood', 1]] },
    });
  }

  // =========================================================================
  // KOTLINA KUPCÓW
  // =========================================================================
  _buildTradingPost() {
    const cx = LOCATIONS.trading.x;
    const cz = LOCATIONS.trading.z;
    const rng = new RNG(303);

    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2 + 0.3;
      const x = cx + Math.cos(a) * 26;
      const z = cz + Math.sin(a) * 26;
      this.addStatic(makeHouse({ w: 5.4, d: 4.6, wall: i % 2 ? '#c2ad8a' : '#b09a78', roof: i % 3 ? '#5d4034' : '#4c3a30' }), x, z, -a + Math.PI / 2, { collide: 3 });
      this.batcher.add(makeBarrel(), x + Math.cos(a + 1) * 3.4, heightAt(x, z), z + Math.sin(a + 1) * 3.4, rng.float(0, 3));
    }

    // wielki stragan targowy
    const hall = new THREE.Group();
    for (const [ox, oz] of [[-5, -3], [5, -3], [-5, 3], [5, 3]]) {
      hall.add(mesh(cyl(0.16, 0.16, 4.2, 6), mat('#4a3524'), ox, 2.1, oz));
    }
    const roof = mesh(new THREE.ConeGeometry(9, 2.4, 4), mat('#6b3f4a'), 0, 5.2, 0);
    roof.rotation.y = Math.PI / 4;
    roof.scale.set(1, 1, 0.72);
    hall.add(roof);
    for (let i = -1; i <= 1; i++) {
      hall.add(mesh(box(3.2, 0.16, 1.4), mat('#5a4229'), i * 3.4, 1, 0));
      for (let k = 0; k < 3; k++) {
        hall.add(mesh(new THREE.SphereGeometry(0.24, 5, 4), mat(k % 2 ? '#8a7a5a' : '#77624a'), i * 3.4 - 1 + k, 1.2, 0));
      }
    }
    this.addStatic(hall, cx, cz - 4, 0.2, { collide: 5.2 });

    // wozy i beczki
    for (let i = 0; i < 3; i++) {
      const a = 0.9 + i * 2.0;
      const x = cx + Math.cos(a) * 15;
      const z = cz + Math.sin(a) * 15;
      const cart = new THREE.Group();
      cart.add(mesh(box(3.0, 0.5, 1.6), mat('#5b432a'), 0, 0.9, 0));
      for (const [ox, oz] of [[-1, -0.9], [1, -0.9], [-1, 0.9], [1, 0.9]]) {
        const wheel = mesh(cyl(0.5, 0.5, 0.12, 10), mat('#3f2e1d'), ox, 0.5, oz);
        wheel.rotation.x = Math.PI / 2;
        cart.add(wheel);
      }
      cart.add(mesh(box(1.2, 0.9, 1.2), mat('#7a6647'), 0.6, 1.45, 0));
      this.addStatic(cart, x, z, a, { collide: 1.8 });
    }

    this.addStatic(makeWell(), cx + 12, cz + 12, 0.2, { collide: 1.5 });
    this.addStatic(makeSignpost(), cx - 14, cz + 10, 0.8, { collide: 0.5 });

    // palisada
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 + 0.2;
      const x = cx + Math.cos(a) * 34;
      const z = cz + Math.sin(a) * 34;
      if (Math.abs(x - cx) < 6 && z < cz) continue;
      this.batcher.add(makeFence(10, 40 + i), x, heightAt(x, z), z, -a + Math.PI / 2);
    }

    this.addInteractive({
      id: 'trading_station', kind: 'station', x: cx + 2, z: cz + 4, radius: 4.2,
      label: 'Targ w Kotlinie — handel', mesh: null,
      data: { station: 'market', name: 'Targ w Kotlinie' },
    });
    this.addInteractive({
      id: 'trading_chest', kind: 'chest', x: cx + 22, z: cz - 16, radius: 3.2,
      label: 'Kufer kupiecki', mesh: makeChest(), rotY: -0.5,
      data: { loot: [['gold', 90], ['mana_potion', 2], ['spark_ring', 1]] },
    });

    for (let i = 0; i < 4; i++) {
      const a = i * 1.9 + 0.4;
      this.batcher.add(makeHerbPatch(120 + i), cx + Math.cos(a) * 21, heightAt(cx + Math.cos(a) * 21, cz + Math.sin(a) * 21), cz + Math.sin(a) * 21, a);
    }
    this.addLight('#ffb45c', 3.4, 12, cx + 2, cz + 4, 3.4);
  }

  // =========================================================================
  // KOWALSKA GÓRA
  // =========================================================================
  _buildForgeHill() {
    const cx = LOCATIONS.forge.x;
    const cz = LOCATIONS.forge.z;
    const baseY = heightAt(cx, cz);

    const furnace = new THREE.Group();
    const stone = mat('#5a5a58');
    furnace.add(mesh(box(3.4, 2.8, 2.6), stone, 0, 1.4, 0));
    furnace.add(mesh(box(1.2, 3.6, 1.2), stone, 0.8, 3.8, -0.6));
    const mouth = new THREE.Mesh(box(1.5, 1.1, 0.14), new THREE.MeshBasicMaterial({ color: '#59c8e8' }));
    mouth.position.set(-0.4, 1.4, 1.32);
    furnace.add(mouth);
    const fireLight = new THREE.PointLight('#59c8e8', 8, 22, 2);
    fireLight.position.set(0, 2, 1.8);
    furnace.add(fireLight);
    furnace.position.set(cx + 5, baseY, cz - 4);
    furnace.rotation.y = -0.9;
    this.group.add(furnace);
    this.animated.push({ update: () => { fireLight.intensity = 6.5 + Math.sin(performance.now() * 0.004) * 1.6; } });
    this.colliders.push({ x: cx + 5, z: cz - 4, r: 2.4 });

    const anvil = new THREE.Group();
    anvil.add(mesh(box(1.6, 0.75, 0.85), mat('#3f444a', { metal: 0.75, rough: 0.4 }), 0, 1.05, 0));
    anvil.add(mesh(cyl(0.48, 0.64, 0.75, 6), mat('#4a4a4a'), 0, 0.38, 0));
    this.addInteractive({
      id: 'ancient_anvil', kind: 'station', x: cx, z: cz + 3, radius: 4,
      label: 'Starożytna kuźnia — rzemiosło', mesh: anvil,
      data: { station: 'ancient_forge', name: 'Starożytna kuźnia' },
    });

    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2;
      this.batcher.add(makeMenhir(2.2 + (i % 3) * 0.6, 30 + i), cx + Math.cos(a) * 14, heightAt(cx + Math.cos(a) * 14, cz + Math.sin(a) * 14), cz + Math.sin(a) * 14, a);
      this.colliders.push({ x: cx + Math.cos(a) * 14, z: cz + Math.sin(a) * 14, r: 0.7 });
    }
    for (let i = 0; i < 4; i++) {
      const a = 0.8 + i * 1.6;
      const crystal = makeCrystal('#6ee0d6', 1.2);
      const x = cx + Math.cos(a) * 9;
      const z = cz + Math.sin(a) * 9;
      crystal.position.set(x, heightAt(x, z), z);
      this.group.add(crystal);
    }

    const shardRock = new THREE.Group();
    shardRock.add(makeRock(741, 1.4));
    const shardCrystal = makeCrystal('#ffd27a', 0.8);
    shardCrystal.position.y = 0.9;
    shardRock.add(shardCrystal);
    this.addInteractive({
      id: 'forge_shard', kind: 'resource', x: cx - 8, z: cz + 7, radius: 3.2,
      label: 'Wyjmij okruch z kamiennej szczeliny', mesh: shardRock, cooldown: 999999,
      data: { item: 'shard_dawn', qty: 1, once: true },
    });
    this.addInteractive({
      id: 'forge_metal', kind: 'resource', x: cx + 10, z: cz + 6, radius: 3,
      label: 'Wykop starożytny metal', mesh: makeOreNode(140), cooldown: 130,
      data: { item: 'ancient_metal', qty: 1 },
    });
    for (let i = 0; i < 3; i++) {
      const a = -0.6 + i * 1.9;
      this.addInteractive({
        id: `ore_hill_${i}`, kind: 'resource', x: cx + Math.cos(a) * 19, z: cz + Math.sin(a) * 19, radius: 3,
        label: 'Wydobądź rudę żelaza', mesh: makeOreNode(40 + i), cooldown: 55,
        data: { item: 'iron_ore', qty: 2 },
      });
    }
  }

  // =========================================================================
  // OBOZOWISKO BANDYTÓW
  // =========================================================================
  _buildBanditCamp() {
    const cx = LOCATIONS.bandits.x;
    const cz = LOCATIONS.bandits.z;
    const rng = new RNG(515);

    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2 + 0.4;
      const x = cx + Math.cos(a) * (12 + (i % 2) * 6);
      const z = cz + Math.sin(a) * (12 + (i % 2) * 6);
      this.addStatic(makeTent(i % 2 ? '#5b4a35' : '#4f4030'), x, z, a, { collide: 1.7 });
    }
    const fire = makeCampfire();
    fire.group.position.set(cx, heightAt(cx, cz), cz);
    this.group.add(fire.group);
    this.animated.push(fire);
    this.colliders.push({ x: cx, z: cz, r: 1.2 });

    this.batcher.add(makeWolfTotem(), cx + 12, heightAt(cx + 12, cz + 9), cz + 9, 0.6);
    this.batcher.add(makeBanner('#7a2f2f'), cx - 13, heightAt(cx - 13, cz - 4), cz - 4, 1.2);
    this.batcher.add(makeBanner('#7a2f2f'), cx + 3, heightAt(cx + 3, cz + 15), cz + 15, -0.4);
    for (let i = 0; i < 6; i++) {
      const a = i * 1.05;
      this.batcher.add(makeCrate(0.6 + (i % 3) * 0.15), cx + Math.cos(a) * 15, heightAt(cx + Math.cos(a) * 15, cz + Math.sin(a) * 15), cz + Math.sin(a) * 15, i);
      this.batcher.add(makeBarrel(), cx + Math.cos(a + 0.4) * 17, heightAt(cx + Math.cos(a + 0.4) * 17, cz + Math.sin(a + 0.4) * 17), cz + Math.sin(a + 0.4) * 17, a);
    }
    for (let i = 0; i < 7; i++) {
      const a = i * 0.9;
      this.batcher.add(makeFence(8, i + 5), cx + Math.cos(a) * 23, heightAt(cx + Math.cos(a) * 23, cz + Math.sin(a) * 23), cz + Math.sin(a) * 23, -a + Math.PI / 2);
    }

    this.addInteractive({
      id: 'bandit_chest', kind: 'chest', x: cx - 10, z: cz - 7, radius: 3.2,
      label: 'Skrzynia bandytów', mesh: makeChest(), rotY: 0.5,
      data: { loot: [['stolen_grain', 1], ['old_key', 1], ['gold', 70], ['health_potion', 2], ['iron_ore', 2]] },
    });
    this.addInteractive({
      id: 'bandit_ore', kind: 'resource', x: cx + 18, z: cz + 14, radius: 3,
      label: 'Wydobądź rudę żelaza', mesh: makeOreNode(77), cooldown: 60,
      data: { item: 'iron_ore', qty: 2 },
    });
    this.addLight('#ff9a45', 4, 14, cx, cz, 2.5);
  }

  // =========================================================================
  // KURHAN SZEPTU
  // =========================================================================
  _buildBarrow() {
    const cx = LOCATIONS.barrow.x;
    const cz = LOCATIONS.barrow.z;
    const baseY = heightAt(cx, cz);

    const mound = new THREE.Mesh(
      new THREE.SphereGeometry(15, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5),
      mat('#4d4a41')
    );
    mound.scale.set(1, 0.62, 1);
    mound.position.set(cx, baseY - 0.5, cz - 6);
    mound.receiveShadow = true;
    mound.castShadow = true;
    this.group.add(mound);
    this.colliders.push({ x: cx, z: cz - 6, r: 8 });

    for (const sx of [-1, 1]) {
      this.batcher.add(mesh(box(0.8, 3.0, 0.8), mat('#5e5a52')), cx + sx * 1.5, heightAt(cx + sx * 1.5, cz + 9), cz + 9, 0);
    }
    this.batcher.add(mesh(box(4.0, 0.7, 1.0), mat('#5e5a52')), cx, baseY + 3.2, cz + 9, 0);

    for (let i = 0; i < 8; i++) {
      const a = 0.3 + i * 0.78;
      const x = cx + Math.cos(a) * 19;
      const z = cz + Math.sin(a) * 19;
      if (i % 2) this.batcher.add(makeGrave(60 + i), x, heightAt(x, z), z, a);
      else this.batcher.add(makeMenhir(2.0 + (i % 3) * 0.5, 70 + i), x, heightAt(x, z), z, a);
      this.colliders.push({ x, z, r: 0.8 });
    }
    this.batcher.add(makeBonePile(4), cx - 9, heightAt(cx - 9, cz + 14), cz + 14, 0.4);
    this.batcher.add(makeBonePile(9), cx + 10, heightAt(cx + 10, cz + 11), cz + 11, 1.4);

    this.addInteractive({
      id: 'barrow_chest', kind: 'chest', x: cx + 4, z: cz + 15, radius: 3.2,
      label: 'Zapomniana skrzynia', mesh: makeChest(), rotY: -0.7,
      data: { loot: [['crystal_mana', 2], ['gold', 55], ['ancient_metal', 1]] },
    });
    this.addInteractive({
      id: 'barrow_metal', kind: 'resource', x: cx - 16, z: cz + 11, radius: 3,
      label: 'Wykop starożytny metal', mesh: makeOreNode(123), cooldown: 100,
      data: { item: 'ancient_metal', qty: 1, rare: true },
    });
    this.addInteractive({
      id: 'barrow_grave_herb', kind: 'resource', x: cx + 16, z: cz - 6, radius: 3,
      label: 'Zbierz zioła', mesh: makeHerbPatch(31), cooldown: 45,
      data: { item: 'herbs', qty: 2 },
    });
  }

  // =========================================================================
  // MGLISTE WROTA
  // =========================================================================
  _buildRuins() {
    const cx = LOCATIONS.ruins.x;
    const cz = LOCATIONS.ruins.z;
    const baseY = heightAt(cx, cz);

    const portal = makePortal('#8b5fd6');
    portal.group.position.set(cx, baseY, cz - 8);
    this.group.add(portal.group);
    this.animated.push(portal);

    this.addStatic(makeStoneArch(), cx, cz + 12, 0, { collide: 2.6 });

    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 + 0.3;
      const x = cx + Math.cos(a) * 26;
      const z = cz + Math.sin(a) * 26;
      this.batcher.add(makePillar(4 + (i % 3) * 0.9), x, heightAt(x, z), z, a);
      this.colliders.push({ x, z, r: 0.9 });
    }
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      const x = cx + Math.cos(a) * 33;
      const z = cz + Math.sin(a) * 33;
      const wall = new THREE.Group();
      wall.add(mesh(box(6.0, 2.0 + (i % 3) * 0.9, 0.9), mat('#615e56'), 0, 1.2, 0));
      this.addStatic(wall, x, z, -a, { collide: 2.0 });
    }
    for (let i = 0; i < 4; i++) {
      const a = 0.8 + i * 1.6;
      const x = cx + Math.cos(a) * 20;
      const z = cz + Math.sin(a) * 20;
      const brazier = new THREE.Group();
      brazier.add(mesh(cyl(0.36, 0.24, 0.42, 7), mat('#4a4a4a'), 0, 1.7, 0));
      brazier.add(mesh(cyl(0.1, 0.18, 1.6, 5), mat('#3a3a3a'), 0, 0.8, 0));
      const flame = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.66, 5), new THREE.MeshBasicMaterial({ color: '#a678e8' }));
      flame.position.y = 2.15;
      brazier.add(flame);
      this.addStatic(brazier, x, z, 0);
      this.addLight('#9c6fe8', 4, 16, x, z, 2.4);
    }
    this.batcher.add(makeBonePile(15), cx + 8, heightAt(cx + 8, cz + 5), cz + 5, 0.2);
    this.batcher.add(makeBonePile(16), cx - 9, heightAt(cx - 9, cz - 2), cz - 2, 1.2);

    this.addInteractive({
      id: 'ruins_chest', kind: 'chest', x: cx + 17, z: cz + 17, radius: 3.2,
      label: 'Skrzynia strażnika', mesh: makeChest(), rotY: 1.0,
      data: { loot: [['ancient_metal', 1], ['gold', 90], ['might_elixir', 1], ['crystal_mana', 1]] },
    });
    this.addInteractive({
      id: 'ruins_herbs', kind: 'resource', x: cx - 21, z: cz + 20, radius: 3,
      label: 'Zbierz zioła', mesh: makeHerbPatch(55), cooldown: 45,
      data: { item: 'herbs', qty: 2 },
    });
  }

  // =========================================================================
  // KAMIENIOŁOM
  // =========================================================================
  _buildQuarry() {
    const cx = LOCATIONS.quarry.x;
    const cz = LOCATIONS.quarry.z;
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2;
      const r = 11 + (i % 4) * 4;
      const x = cx + Math.cos(a) * r;
      const z = cz + Math.sin(a) * r;
      const scale = 1.5 + (i % 3) * 0.9;
      this.batcher.add(makeRock(200 + i, scale), x, heightAt(x, z), z, a);
      this.colliders.push({ x, z, r: scale * 0.8 });
    }
    for (let i = 0; i < 4; i++) {
      const a = 0.5 + i * 1.6;
      this.addInteractive({
        id: `quarry_ore_${i}`, kind: 'resource', x: cx + Math.cos(a) * 7, z: cz + Math.sin(a) * 7, radius: 3.2,
        label: 'Wydobądź rudę żelaza', mesh: makeOreNode(300 + i), cooldown: 50,
        data: { item: 'iron_ore', qty: 2 },
      });
    }
    this.batcher.add(makeCrate(1.0), cx + 10, heightAt(cx + 10, cz + 10), cz + 10, 0.3);
    this.batcher.add(makeBarrel(), cx - 10, heightAt(cx - 10, cz + 8), cz + 8, 0.9);
    this.addInteractive({
      id: 'quarry_chest', kind: 'chest', x: cx + 5, z: cz - 14, radius: 3.2,
      label: 'Skrzynia górników', mesh: makeChest(), rotY: 0.3,
      data: { loot: [['iron_ore', 4], ['gold', 40], ['might_elixir', 1]] },
    });
  }

  // =========================================================================
  // JEZIORO
  // =========================================================================
  _buildLake() {
    const cx = LOCATIONS.lake.x;
    const cz = LOCATIONS.lake.z;
    // pomost na wschodnim brzegu, skierowany w głąb jeziora
    const dock = new THREE.Group();
    for (let i = 0; i < 8; i++) {
      dock.add(mesh(box(2.4, 0.14, 0.44), mat('#5a422a'), 0, 0.2, i * 0.5 - 2));
    }
    for (const sx of [-1, 1]) {
      for (const zz of [-2, 1.6]) {
        dock.add(mesh(cyl(0.11, 0.11, 2.4, 5), mat('#42301f'), sx * 1.0, -0.6, zz));
      }
    }
    const dx = cx + 92;
    const dz = cz - 61;
    dock.position.set(dx, WATER_LEVEL + 0.55, dz);
    dock.rotation.y = -0.58 - Math.PI / 2;
    this.group.add(dock);

    const boat = makeBoat();
    boat.position.set(cx + 77, WATER_LEVEL + 0.15, cz - 50);
    boat.rotation.y = 0.8;
    this.group.add(boat);

    for (let i = 0; i < 14; i++) {
      const a = i * 0.45;
      const r = 126 + (i % 3) * 9;
      const x = cx + Math.cos(a) * r;
      const z = cz + Math.sin(a) * r;
      if (!isWater(x, z) && distanceToPath(x, z) > 8) {
        this.batcher.add(makeRock(500 + i, 0.8 + (i % 3) * 0.5), x, heightAt(x, z), z, a);
      }
    }
    this.addInteractive({
      id: 'lake_herbs', kind: 'resource', x: cx + 80, z: cz + 100, radius: 3,
      label: 'Zbierz zioła', mesh: makeHerbPatch(66), cooldown: 45,
      data: { item: 'herbs', qty: 3 },
    });
    this.addInteractive({
      id: 'lake_fishing', kind: 'resource', x: cx + 102, z: cz - 67, radius: 3.2,
      label: 'Złów rybę (wędka rybacka)', mesh: null, cooldown: 40,
      data: { item: 'lake_fish', qty: 1 },
    });
    this.addInteractive({
      id: 'lake_chest', kind: 'chest', x: cx + 120, z: cz + 51, radius: 3.2,
      label: 'Zamulona skrzynia', mesh: makeChest(), rotY: 1.4,
      data: { loot: [['gold', 60], ['crystal_mana', 1], ['mana_potion', 2]] },
    });
  }

  // =========================================================================
  // WAROWNIA POPIOŁU (ruiny zamku)
  // =========================================================================
  _buildCastle() {
    const cx = LOCATIONS.castle.x;
    const cz = LOCATIONS.castle.z;
    const baseY = heightAt(cx, cz);
    const stone = mat('#6a675f');
    const darkStone = mat('#57544e');

    // dziedziniec
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      const x = cx + Math.cos(a) * 34;
      const z = cz + Math.sin(a) * 34;
      if (i === 0) continue; // brama
      const h = 5 + (i % 4) * 2.4;
      const wall = new THREE.Group();
      wall.add(mesh(box(19, h, 2.0), stone, 0, h / 2, 0));
      for (let c = -1; c <= 1; c++) {
        wall.add(mesh(box(1.6, 1.2, 2.2), darkStone, c * 6, h + 0.6, 0));
      }
      this.addStatic(wall, x, z, -a + Math.PI / 2, { collide: 3.2 });
    }

    // wieże
    for (const [tx, tz] of [[-28, -26], [30, -22], [0, -34]]) {
      const tower = new THREE.Group();
      tower.add(mesh(cyl(4.4, 5.0, 17, 10), stone, 0, 8.5, 0));
      tower.add(mesh(cyl(5.2, 5.2, 1.4, 10), darkStone, 0, 17.6, 0));
      const cone = mesh(new THREE.ConeGeometry(5.6, 5.5, 10), mat('#4a3a30'), 0, 21, 0);
      tower.add(cone);
      for (let w = 0; w < 3; w++) {
        const win = new THREE.Mesh(box(0.9, 1.6, 0.3), new THREE.MeshBasicMaterial({ color: w === 1 ? '#ffb45c' : '#1a1a1e' }));
        const wa = w * 2.1;
        win.position.set(Math.cos(wa) * 4.6, 9 + w * 3, Math.sin(wa) * 4.6);
        win.rotation.y = -wa;
        tower.add(win);
      }
      this.addStatic(tower, cx + tx, cz + tz, 0, { collide: 4.4 });
    }

    // brama
    for (const sx of [-1, 1]) {
      this.addStatic(mesh(box(2.6, 9, 3.0), darkStone), cx + sx * 8, cz + 34, 0, { collide: 1.6 });
    }
    this.addStatic(mesh(box(19, 2.0, 3.2), darkStone, 0, 0, 0), cx, cz + 34, 0, { yOffset: 9.6 });

    // dziedziniec: ognisko, stosy, kości
    this.batcher.add(makeCampfire().group, cx, heightAt(cx, cz - 4), cz - 4, 0);
    this.addLight('#ff8f45', 6, 22, cx, cz - 4, 2.6);
    this.batcher.add(makeBonePile(21), cx + 10, heightAt(cx + 10, cz + 6), cz + 6, 0.4);
    this.batcher.add(makeBonePile(22), cx - 12, heightAt(cx - 12, cz + 2), cz + 2, 1.1);
    this.batcher.add(makeBanner('#4a2a3a'), cx - 6, heightAt(cx - 6, cz + 14), cz + 14, 0.2);
    this.batcher.add(makeBanner('#4a2a3a'), cx + 6, heightAt(cx + 6, cz + 14), cz + 14, -0.2);

    this.addInteractive({
      id: 'castle_chest', kind: 'chest', x: cx - 18, z: cz - 12, radius: 3.4,
      label: 'Skrzynia strażnika warowni', mesh: makeChest(), rotY: 0.2,
      data: { loot: [['watcher_plate', 1], ['ancient_metal', 1], ['gold', 120], ['might_elixir', 1]] },
    });
    this.addInteractive({
      id: 'castle_metal', kind: 'resource', x: cx + 20, z: cz + 6, radius: 3,
      label: 'Wykop starożytny metal', mesh: makeOreNode(801), cooldown: 120,
      data: { item: 'ancient_metal', qty: 1 },
    });
    this.addInteractive({
      id: 'castle_herbs', kind: 'resource', x: cx + 4, z: cz + 22, radius: 3,
      label: 'Zbierz zioła', mesh: makeHerbPatch(802), cooldown: 45,
      data: { item: 'herbs', qty: 2 },
    });
  }

  // =========================================================================
  // PUSTELNIA W CIEMNYM LESIE
  // =========================================================================
  _buildHermitage() {
    const cx = LOCATIONS.hermit.x;
    const cz = LOCATIONS.hermit.z;

    const hut = makeHouse({ w: 4.6, d: 4.0, h: 2.6, wall: '#8a7a60', roof: '#3f3a30' });
    this.addStatic(hut, cx, cz, 0.6, { collide: 2.6 });

    const shrine = makeShrine();
    shrine.group.position.set(cx + 7, heightAt(cx + 7, cz + 6), cz + 6);
    this.group.add(shrine.group);
    this.animated.push(shrine);
    this.colliders.push({ x: cx + 7, z: cz + 6, r: 1.4 });

    for (let i = 0; i < 5; i++) {
      const a = i * 1.3;
      this.batcher.add(makeHerbPatch(900 + i), cx + Math.cos(a) * 5, heightAt(cx + Math.cos(a) * 5, cz + Math.sin(a) * 5 - 4), cz + Math.sin(a) * 5 - 4, a);
    }
    for (let i = 0; i < 10; i++) {
      const a = i * 0.63;
      const r = 14 + (i % 4) * 6;
      this.batcher.add(makeTree(1200 + i, { kind: i % 3 === 0 ? 'dead' : 'pine' }), cx + Math.cos(a) * r, heightAt(cx + Math.cos(a) * r, cz + Math.sin(a) * r), cz + Math.sin(a) * r, a);
    }
    for (let i = 0; i < 3; i++) {
      this.batcher.add(makeFence(4, 60 + i), cx - 6 + i * 4, heightAt(cx - 6 + i * 4, cz - 6), cz - 6, 0.1);
    }

    this.addInteractive({
      id: 'hermit_herbs', kind: 'resource', x: cx - 8, z: cz + 8, radius: 3,
      label: 'Zbierz zioła pustelnika', mesh: makeHerbPatch(950), cooldown: 50,
      data: { item: 'herbs', qty: 3 },
    });
    this.addInteractive({
      id: 'hermit_chest', kind: 'chest', x: cx + 4, z: cz - 7, radius: 3.2,
      label: 'Kufer pustelnika', mesh: makeChest(), rotY: -0.9,
      data: { loot: [['seer_bone', 1], ['mana_potion', 2], ['gold', 55]] },
    });
  }

  // =========================================================================
  // BAGNO WIESZCZKI
  // =========================================================================
  _buildSwamp() {
    const cx = LOCATIONS.swamp.x;
    const cz = LOCATIONS.swamp.z;
    const rng = new RNG(8123);

    for (let i = 0; i < 26; i++) {
      const a = rng.float(0, Math.PI * 2);
      const r = rng.float(10, 70);
      const x = cx + Math.cos(a) * r;
      const z = cz + Math.sin(a) * r;
      if (isWater(x, z)) continue;
      this.batcher.add(makeTree(3000 + i, { kind: i % 4 === 0 ? 'dead' : 'dead' }), x, heightAt(x, z), z, rng.float(0, 6));
    }
    for (let i = 0; i < 10; i++) {
      const a = rng.float(0, Math.PI * 2);
      const r = rng.float(8, 60);
      const x = cx + Math.cos(a) * r;
      const z = cz + Math.sin(a) * r;
      if (isWater(x, z)) continue;
      this.batcher.add(makeBonePile(3100 + i), x, heightAt(x, z), z, a);
    }
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      const x = cx + Math.cos(a) * 34;
      const z = cz + Math.sin(a) * 34;
      this.batcher.add(makeMenhir(1.6 + (i % 3) * 0.6, 3200 + i), x, heightAt(x, z), z, a);
      this.colliders.push({ x, z, r: 0.7 });
    }
    for (let i = 0; i < 4; i++) {
      const a = 0.9 + i * 1.4;
      const crystal = makeCrystal('#8fe0ff', 0.9);
      const x = cx + Math.cos(a) * 22;
      const z = cz + Math.sin(a) * 22;
      crystal.position.set(x, Math.max(heightAt(x, z), WATER_LEVEL), z);
      this.group.add(crystal);
    }

    this.addInteractive({
      id: 'swamp_herbs', kind: 'resource', x: cx + 16, z: cz - 26, radius: 3.2,
      label: 'Zbierz bagienne zioła', mesh: makeHerbPatch(3300), cooldown: 60,
      data: { item: 'herbs', qty: 4 },
    });
    this.addInteractive({
      id: 'swamp_chest', kind: 'chest', x: cx - 24, z: cz + 22, radius: 3.4,
      label: 'Zapadnięta skrzynia', mesh: makeChest(), rotY: 0.9,
      data: { loot: [['crystal_mana', 2], ['gold', 70], ['seer_bone', 1]] },
    });
    this.addInteractive({
      id: 'swamp_shard', kind: 'resource', x: cx + 4, z: cz + 44, radius: 3.2,
      label: 'Wyciągnij okruch z mułu', mesh: makeCrystal('#ffd27a', 0.9), cooldown: 999999,
      data: { item: 'shard_dawn', qty: 1, once: true },
    });
  }

  // =========================================================================
  // PRZEŁĘCZ KALMORU
  // =========================================================================
  _buildPass() {
    const cx = LOCATIONS.pass.x;
    const cz = LOCATIONS.pass.z;

    // wieża strażnicza
    const tower = new THREE.Group();
    tower.add(mesh(cyl(3.0, 3.6, 11, 8), mat('#6b675e'), 0, 5.5, 0));
    tower.add(mesh(cyl(3.8, 3.8, 1.2, 8), mat('#565249'), 0, 11.4, 0));
    const top = mesh(new THREE.ConeGeometry(4.0, 3.4, 8), mat('#4c4238'), 0, 13.6, 0);
    tower.add(top);
    this.addStatic(tower, cx + 18, cz - 12, 0.3, { collide: 3.2 });

    // kamienne posągi / menhiry po bokach drogi
    for (let i = 0; i < 6; i++) {
      const side = i % 2 ? 1 : -1;
      const t = Math.floor(i / 2) - 1;
      const x = cx + side * 13;
      const z = cz - 24 + t * 22;
      this.batcher.add(makeMenhir(3.4 + (i % 3) * 0.8, 4000 + i), x, heightAt(x, z), z, i);
      this.colliders.push({ x, z, r: 0.9 });
    }
    for (let i = 0; i < 8; i++) {
      const a = i * 0.8;
      this.batcher.add(makeRock(4100 + i, 1.2 + (i % 4) * 0.7), cx + Math.cos(a) * 26, heightAt(cx + Math.cos(a) * 26, cz + Math.sin(a) * 26), cz + Math.sin(a) * 26, a);
    }
    this.batcher.add(makeBanner('#5a3a2a'), cx - 16, heightAt(cx - 16, cz + 14), cz + 14, 0.4);
    this.batcher.add(makeBanner('#5a3a2a'), cx + 16, heightAt(cx + 16, cz + 14), cz + 14, -0.4);
    this.batcher.add(makeSignpost(), cx - 6, heightAt(cx - 6, cz - 18), cz - 18, 0.5);

    this.addInteractive({
      id: 'pass_chest', kind: 'chest', x: cx + 20, z: cz + 8, radius: 3.2,
      label: 'Skrzynia celników', mesh: makeChest(), rotY: 0.8,
      data: { loot: [['gold', 85], ['health_potion', 2], ['iron_ore', 3]] },
    });
    this.addInteractive({
      id: 'pass_ore', kind: 'resource', x: cx - 26, z: cz - 22, radius: 3,
      label: 'Wydobądź rudę żelaza', mesh: makeOreNode(4200), cooldown: 60,
      data: { item: 'iron_ore', qty: 2 },
    });
  }

  // =========================================================================
  // KAMIENNY KRĄG (polana)
  // =========================================================================
  _buildCircle() {
    const cx = LOCATIONS.circle.x;
    const cz = LOCATIONS.circle.z;
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const x = cx + Math.cos(a) * 12;
      const z = cz + Math.sin(a) * 12;
      this.batcher.add(makeMenhir(2.4 + (i % 4) * 0.7, 5000 + i), x, heightAt(x, z), z, a);
      this.colliders.push({ x, z, r: 0.8 });
    }
    const shrine = makeShrine();
    shrine.group.position.set(cx, heightAt(cx, cz), cz);
    this.group.add(shrine.group);
    this.animated.push(shrine);
    this.colliders.push({ x: cx, z: cz, r: 1.5 });

    for (let i = 0; i < 4; i++) {
      const a = 0.6 + i * 1.57;
      const crystal = makeCrystal('#9f7cf0', 1.0);
      const x = cx + Math.cos(a) * 6;
      const z = cz + Math.sin(a) * 6;
      crystal.position.set(x, heightAt(x, z), z);
      this.group.add(crystal);
    }
    for (let i = 0; i < 6; i++) {
      const a = i * 1.05;
      this.batcher.add(makeHerbPatch(5100 + i), cx + Math.cos(a) * 18, heightAt(cx + Math.cos(a) * 18, cz + Math.sin(a) * 18), cz + Math.sin(a) * 18, a);
    }
    this.addInteractive({
      id: 'circle_shrine', kind: 'shrine', x: cx, z: cz, radius: 4.2,
      label: 'Ołtarz kręgu — złóż ofiarę (40 złota)', mesh: null,
      data: { cost: 40, heal: true },
    });
  }

  // =========================================================================
  // KOPALNIA ŻELAZNA
  // =========================================================================
  _buildMine() {
    const cx = LOCATIONS.mine.x;
    const cz = LOCATIONS.mine.z;
    const baseY = heightAt(cx, cz);

    // hałda i wejście do sztolni
    for (let i = 0; i < 8; i++) {
      const a = i * 0.8;
      this.batcher.add(makeRock(6000 + i, 1.4 + (i % 3) * 0.8), cx + Math.cos(a) * 9, heightAt(cx + Math.cos(a) * 9, cz + Math.sin(a) * 9), cz + Math.sin(a) * 9, a);
    }
    const entrance = new THREE.Group();
    const timber = mat('#4a3826');
    entrance.add(mesh(box(0.7, 4.2, 0.7), timber, -2.2, 2.1, 0));
    entrance.add(mesh(box(0.7, 4.2, 0.7), timber, 2.2, 2.1, 0));
    entrance.add(mesh(box(5.4, 0.8, 0.8), timber, 0, 4.2, 0));
    entrance.add(mesh(box(6.4, 5.0, 3.0), mat('#3a3a38'), 0, 2.5, -1.7));
    const dark = new THREE.Mesh(box(3.6, 3.4, 0.2), new THREE.MeshBasicMaterial({ color: '#07080a' }));
    dark.position.set(0, 1.7, -0.1);
    entrance.add(dark);
    this.addStatic(entrance, cx, cz - 6, 0, { collide: 3.4 });
    this.addLight('#ff9a45', 3.2, 12, cx + 5, cz - 2, 2.4);

    for (let i = 0; i < 4; i++) {
      const a = 0.8 + i * 1.6;
      this.addInteractive({
        id: `mine_ore_${i}`, kind: 'resource', x: cx + Math.cos(a) * 13, z: cz + Math.sin(a) * 13, radius: 3.2,
        label: 'Wydobądź rudę żelaza', mesh: makeOreNode(6100 + i), cooldown: 45,
        data: { item: 'iron_ore', qty: 3 },
      });
    }
    this.addInteractive({
      id: 'mine_chest', kind: 'chest', x: cx - 12, z: cz + 4, radius: 3.2,
      label: 'Skrzynia górnicza', mesh: makeChest(), rotY: -0.4,
      data: { loot: [['iron_ore', 5], ['ancient_metal', 1], ['gold', 65]] },
    });
    this.batcher.add(makeCrate(0.9), cx + 7, heightAt(cx + 7, cz + 8), cz + 8, 0.2);
    this.batcher.add(makeBarrel(), cx - 8, heightAt(cx - 8, cz + 9), cz + 9, 0.6);
  }

  // =========================================================================
  // ROZDROŻE
  // =========================================================================
  _buildCrossroads() {
    this.addStatic(makeSignpost(), 0, 150, 0.4, { collide: 0.5 });
    const shrine = makeShrine();
    shrine.group.position.set(14, heightAt(14, 158), 158);
    this.group.add(shrine.group);
    this.animated.push(shrine);
    this.colliders.push({ x: 14, z: 158, r: 1.4 });
    this.addInteractive({
      id: 'crossroads_shrine', kind: 'shrine', x: 14, z: 158, radius: 4,
      label: 'Kapliczka — złóż ofiarę (20 złota)', mesh: null,
      data: { cost: 20 },
    });
    this.addInteractive({
      id: 'signpost', kind: 'sign', x: 0, z: 162, radius: 3.4,
      label: 'Przeczytaj drogowskaz (mapa)', mesh: null,
    });
    for (let i = 0; i < 4; i++) {
      const a = i * 1.5;
      this.batcher.add(makeTree(7000 + i), 26 + Math.cos(a) * 8, heightAt(26 + Math.cos(a) * 8, 140 + Math.sin(a) * 8), 140 + Math.sin(a) * 8, a);
    }
  }

  // =========================================================================
  // WYŻYNY KALMORU — strażnica na grani
  // =========================================================================
  _buildHighlands() {
    const cx = LOCATIONS.highlands.x;
    const cz = LOCATIONS.highlands.z;
    const stone = mat('#6f6a60');

    const base = new THREE.Group();
    base.add(mesh(box(7.0, 1.2, 7.0), stone, 0, 0.6, 0));
    base.add(mesh(box(5.2, 2.4, 5.2), mat('#5d594f'), 0, 2.0, 0));
    base.add(mesh(box(1.6, 1.4, 0.4), mat('#141518'), 0, 1.9, 2.7));
    this.addStatic(base, cx, cz, 0.4, { collide: 3.6 });

    for (let i = 0; i < 4; i++) {
      const a = 0.9 + i * 1.5;
      const x = cx + Math.cos(a) * 9;
      const z = cz + Math.sin(a) * 9;
      this.batcher.add(makeMenhir(2.0 + (i % 2) * 0.8, 8000 + i), x, heightAt(x, z), z, a);
      this.colliders.push({ x, z, r: 0.8 });
    }
    this.batcher.add(makeSignpost(), cx + 6, heightAt(cx + 6, cz + 5), cz + 5, 0.7);
    this.addInteractive({
      id: 'highlands_chest', kind: 'chest', x: cx - 5, z: cz + 6, radius: 3,
      label: 'Skrzynia strażnicy', mesh: makeChest(), rotY: 0.9,
      data: { loot: [['iron_ore', 3], ['gold', 60], ['might_elixir', 1]] },
    });
    this.addInteractive({
      id: 'highlands_ore', kind: 'resource', x: cx + 10, z: cz - 8, radius: 3,
      label: 'Wydobądź rudę żelaza', mesh: makeOreNode(8100), cooldown: 55,
      data: { item: 'iron_ore', qty: 2 },
    });
  }

  // =========================================================================
  // OBÓZ PRZY TRAKCIE
  // =========================================================================
  _buildRoadCamp() {
    const cx = 0;
    const cz = 250;
    this.addStatic(makeTent('#4f4432'), cx + 4, cz + 3, 0.8, { collide: 1.7 });
    const fire = makeCampfire();
    fire.group.position.set(cx, heightAt(cx, cz), cz);
    this.group.add(fire.group);
    this.animated.push(fire);
    this.colliders.push({ x: cx, z: cz, r: 1.1 });
    this.batcher.add(makeBarrel(), cx - 3.5, heightAt(cx - 3.5, cz + 1.5), cz + 1.5, 0.4);
    this.batcher.add(makeCrate(0.7), cx - 4.5, heightAt(cx - 4.5, cz - 1.2), cz - 1.2, 0.9);
    this.addLight('#ff9a45', 3, 12, cx, cz, 2.4);
    this.addInteractive({
      id: 'road_camp_rest', kind: 'rest', x: cx, z: cz, radius: 3.8,
      label: 'Odpocznij przy ogniu (do świtu)', mesh: null,
    });
  }

  // =========================================================================
  // ROŚLINNOŚĆ I SKAŁY
  // =========================================================================
  _scatterNature() {
    const rng = new RNG(424242);
    const clearR = {
      village: 64, trading: 46, forge: 30, bandits: 30, barrow: 34, ruins: 40,
      quarry: 26, castle: 44, hermit: 26, swamp: 24, pass: 30, circle: 24,
      mine: 24, crossroads: 18, lake: 0, highlands: 0,
    };
    const blocked = Object.entries(LOCATIONS)
      .filter(([k]) => (clearR[k] ?? 24) > 0)
      .map(([k, l]) => ({ x: l.x, z: l.z, r: clearR[k] ?? 24 }));
    blocked.push({ x: 2, z: 342, r: 14 });
    const isBlocked = (x, z, pad = 0) => {
      for (const b of blocked) if (dist2(x, z, b.x, b.z) < b.r + pad) return true;
      return false;
    };

    // warianty drzew (gotowe geometrie — szybkie kopiowanie)
    const treeVariants = [];
    for (let i = 0; i < 7; i++) {
      const kind = i < 3 ? 'pine' : i < 5 ? 'oak' : i < 6 ? 'oak' : 'pine';
      const g = makeTree(1100 + i * 37, { kind });
      const geo = flattenGroup(g);
      if (geo) treeVariants.push({ geo, pine: kind === 'pine', dead: false });
    }
    const deadGeo = flattenGroup(makeTree(999, { kind: 'dead' }));
    if (deadGeo) treeVariants.push({ geo: deadGeo, pine: false, dead: true });

    const rockVariants = [];
    for (let i = 0; i < 6; i++) {
      const geo = flattenGroup(makeRock(2000 + i, 1));
      if (geo) rockVariants.push(geo);
    }
    const bushVariants = [];
    for (let i = 0; i < 4; i++) {
      const geo = flattenGroup(makeBush(3000 + i));
      if (geo) bushVariants.push(geo);
    }

    let trees = 0;
    const targetTrees = 5200;
    for (let attempt = 0; attempt < targetTrees * 5 && trees < targetTrees; attempt++) {
      const a = rng.float(0, Math.PI * 2);
      const r = 70 + Math.pow(rng.next(), 0.62) * 690;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      if (isWater(x, z) || distanceToPath(x, z) < 6) continue;
      if (dist2(x, z, LOCATIONS.lake.x, LOCATIONS.lake.z) < 132 && heightAt(x, z) < WATER_LEVEL + 3.4) continue;
      if (isBlocked(x, z)) continue;
      if (slopeAt(x, z) > 1.15) continue;
      const h = heightAt(x, z);
      if (h > 135) continue; // powyżej granicy lasu
      const forest = forestMask(x, z);
      const nearSwamp = dist2(x, z, LOCATIONS.swamp.x, LOCATIONS.swamp.z) < 210;
      if (forest < 0.3 && !nearSwamp && rng.next() > 0.06) continue;
      const variant = nearSwamp
        ? treeVariants[treeVariants.length - 1]
        : treeVariants[Math.floor(rng.next() * treeVariants.length)];
      const scale = rng.float(1.0, 1.85);
      this.batcher.addGeometry(variant.geo, x, h, z, rng.float(0, Math.PI * 2), scale);
      if (scale > 1.3) this.colliders.push({ x, z, r: 0.5 * scale });
      trees += 1;
    }

    let rocks = 0;
    for (let attempt = 0; attempt < 5200 && rocks < 1500; attempt++) {
      const a = rng.float(0, Math.PI * 2);
      const r = 60 + Math.pow(rng.next(), 0.6) * 700;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      if (isWater(x, z) || distanceToPath(x, z) < 5) continue;
      if (isBlocked(x, z)) continue;
      const h = heightAt(x, z);
      const steep = slopeAt(x, z);
      if (steep < 0.5 && h < 90 && rng.next() > 0.16) continue;
      const geo = rockVariants[Math.floor(rng.next() * rockVariants.length)];
      const scale = rng.float(0.8, 2.2);
      this.batcher.addGeometry(geo, x, h, z, rng.float(0, 6.28), scale);
      if (scale > 1.6) this.colliders.push({ x, z, r: scale * 0.55 });
      rocks += 1;
    }

    let bushes = 0;
    for (let attempt = 0; attempt < 2500 && bushes < 950; attempt++) {
      const a = rng.float(0, Math.PI * 2);
      const r = 60 + Math.pow(rng.next(), 0.6) * 660;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      if (isWater(x, z) || distanceToPath(x, z) < 4) continue;
      if (isBlocked(x, z, -12)) continue;
      if (slopeAt(x, z) > 0.9) continue;
      const geo = bushVariants[Math.floor(rng.next() * bushVariants.length)];
      this.batcher.addGeometry(geo, x, heightAt(x, z), z, rng.float(0, 6.28), rng.float(0.8, 1.7));
      bushes += 1;
    }

    this._scatterGrass();
  }

  _scatterGrass() {
    // Trawa jako kępy cienkich źdźbeł — tylko w pobliżu miejsc, które gracz odwiedza.
    const rng = new RNG(999);
    const tuft = new THREE.Group();
    for (let b = 0; b < 6; b++) {
      const h = 0.4 + rng.float(0, 0.35);
      const blade = new THREE.Mesh(new THREE.ConeGeometry(0.05, h, 3), new THREE.MeshLambertMaterial({ color: '#6e8f4f' }));
      const a = (b / 6) * Math.PI * 2 + rng.float(-0.4, 0.4);
      const r = rng.float(0, 0.16);
      blade.position.set(Math.cos(a) * r, h / 2, Math.sin(a) * r);
      blade.rotation.set(rng.float(-0.3, 0.3), rng.float(0, 3), rng.float(-0.3, 0.3));
      tuft.add(blade);
    }
    const tuftGeo = flattenGroup(tuft);
    tuft.traverse((o) => { if (o.isMesh) o.geometry.dispose(); });

    const spots = Object.values(LOCATIONS);
    const perSpot = 520;
    const total = spots.length * perSpot;
    const grassMat = new THREE.MeshLambertMaterial({ color: '#6f9150' });
    const inst = new THREE.InstancedMesh(tuftGeo, grassMat, total);
    inst.castShadow = false;
    inst.receiveShadow = true;
    inst.frustumCulled = false;
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();
    let placed = 0;
    for (const spot of spots) {
      for (let i = 0; i < perSpot; i++) {
        const a = rng.float(0, Math.PI * 2);
        const r = rng.float(10, 95);
        const x = spot.x + Math.cos(a) * r;
        const z = spot.z + Math.sin(a) * r;
        if (Math.abs(x) > WORLD_RADIUS - 10 || Math.abs(z) > WORLD_RADIUS - 10) continue;
        if (isWater(x, z) || distanceToPath(x, z) < 3.4) continue;
        if (slopeAt(x, z) > 0.9) continue;
        dummy.position.set(x, heightAt(x, z) - 0.04, z);
        dummy.rotation.set(0, rng.float(0, 6.28), 0);
        dummy.scale.setScalar(rng.float(0.8, 1.7));
        dummy.updateMatrix();
        inst.setMatrixAt(placed, dummy.matrix);
        color.setHSL(0.22 + rng.float(-0.03, 0.05), rng.float(0.3, 0.52), rng.float(0.28, 0.42));
        inst.setColorAt(placed, color);
        placed += 1;
      }
    }
    inst.count = placed;
    inst.instanceMatrix.needsUpdate = true;
    if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
    this.group.add(inst);
    this.grassInstanced = inst;
  }
}
