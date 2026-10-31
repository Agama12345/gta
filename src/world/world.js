import * as THREE from 'three';
import {
  heightAt, isWater, distanceToPath, slopeAt, forestMask,
  LOCATIONS, WATER_LEVEL, WORLD_RADIUS, WORLD_SCALE, LAND_RADIUS, COAST_RADIUS,
  TerrainManager, createWater,
  RIVER_SURFACES, LAKE_SURFACES, pathRiverCrossings, riverSurfaceAt,
  distanceToRiver,
} from './terrain.js';
import { RNG, dist2 } from '../core/utils.js';
import {
  makeHouse, makeTree, makeBush, makeRock, makeFence, makeWell, makeCampfire,
  makeForgeFurnace, makeAnvil, makeTent, makeBarrel, makeCrate, makeChest,
  makeMenhir, makeStoneArch, makePillar, makeCrystal, makeOreNode, makeHerbPatch,
  makeBanner, makeBonePile, makeGrave, makePortal, makeShrine, makeBoat,
  makeWolfTotem, makeSignpost, makeFern, makeReed, makeGull,
  makeLighthouse, makeShipwreck, makeFishRack, makeNetFrame,
  makeCactus, makeAcacia, makeDeadBush, makeIceSpire, makeSnowRock, mat,
  makeBridge,
} from './models.js';
import { dominantBiome } from './biomes.js';
import { PropBatcher, flattenGroup } from './mergeProps.js';
import { ModelScatter, placeProp } from '../core/assets.js';

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
    this._buildCoast();
    this._buildBridges();
    this._buildRiverProps();
    this._buildLakeShores();
    this._buildWildSites();
    this._buildAssetProps();
    this._buildBoard();
    this._scatterNature();

    this.batcher.finalize(true);

    // Światła punktowe (ogniska, pochodnie, kapliczki) liczą się w shaderze
    // tylko gdy są włączone — dlatego trzymamy je na liście i wygaszamy
    // te, które są daleko od gracza. Bez tego kilkadziesiąt latarni
    // obciąża każdy piksel ekranu.
    this.lights = [];
    this.group.traverse((o) => {
      if (o.isPointLight) this.lights.push(o);
    });

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
    if (playerPos && this.lights?.length) {
      const nightF = 1 - (time?.dayF ?? 1);
      const range = 95 + nightF * 55;
      for (const l of this.lights) {
        if (l.userData.alwaysOn) continue;
        const d = dist2(l.position.x, l.position.z, playerPos.x, playerPos.z);
        const want = d < range;
        if (l.visible !== want) l.visible = want;
      }
    }
    this._updateGulls(dt);
    if (this.beacon) {
      const nightF = 1 - (time?.dayF ?? 1);
      this.beacon.beamMat.opacity = Math.max(0, nightF - 0.22) * 0.38;
      this.beacon.lamp.intensity = 1.2 + nightF * 7;
    }
    if (time) this._updateFireflies(dt, 1 - (time.dayF ?? 1));
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

  /** Tafla rzeki w danym punkcie (dla dźwięku nurtu i wody pod stopami). */
  riverWaterAt(x, z) {
    return riverSurfaceAt(x, z);
  }

  /** Lista jezior z poziomem tafli — potrzebna do dźwięku i minimapy. */
  lakeSurfaces() {
    return this._lakeSurfaces ?? (this._lakeSurfaces = LAKE_SURFACES);
  }

  // =========================================================================
  // DZIKIE MIEJSCA — obozowiska, kapliczki, strażnice i jamy rozsiane po mapie
  // =========================================================================
  _buildWildSites() {
    const rng = new RNG(31337);
    const taken = [];
    const tooClose = (x, z, r) => taken.some((t) => dist2(t.x, t.z, x, z) < r);
    const nearLocation = (x, z, r) => Object.values(LOCATIONS).some(
      (l) => l && l.x !== undefined && dist2(l.x, l.z, x, z) < r
    );
    for (const b of this.bridges) taken.push({ x: b.x, z: b.z });

    const siteKinds = ['camp', 'shrine', 'watchtower', 'den', 'grove', 'cart', 'charcoal', 'fisher'];
    let placed = 0;
    for (let attempt = 0; attempt < 2600 && placed < 22; attempt++) {
      const a = rng.float(0, Math.PI * 2);
      const rad = rng.float(230, WORLD_RADIUS * 0.82);
      const x = Math.cos(a) * rad;
      const z = Math.sin(a) * rad;
      if (isWater(x, z)) continue;
      if (heightAt(x, z) < WATER_LEVEL + 1.6) continue;
      if (slopeAt(x, z) > 0.5) continue;
      if (distanceToPath(x, z) < 14) continue;
      if (nearLocation(x, z, 150)) continue;
      if (tooClose(x, z, 210)) continue;
      if (distanceToRiver(x, z) < 12) continue;
      taken.push({ x, z });
      placed += 1;
      const kind = siteKinds[Math.floor(rng.float(0, siteKinds.length))];
      this._buildWildSite(kind, x, z, rng);
    }
  }

  _buildWildSite(kind, x, z, rng) {
    const rot = rng.float(0, Math.PI * 2);
    const y = heightAt(x, z);
    const spread = (r) => {
      const a = rng.float(0, Math.PI * 2);
      const rr = rng.float(0, r);
      return [x + Math.cos(a) * rr, z + Math.sin(a) * rr];
    };

    if (kind === 'camp') {
      this.addStatic(makeTent(rng.chance(0.5) ? '#5b4a35' : '#4a3d2f'), x, z, rot, { collide: 1.6 });
      const [fx, fz] = spread(2.6);
      const fire = makeCampfire();
      fire.light.intensity = 5;
      fire.light.distance = 11;
      fire.group.position.set(fx, heightAt(fx, fz), fz);
      this.group.add(fire.group);
      this.animated.push(fire);
      for (let i = 0; i < 3; i++) {
        const [px, pz] = spread(4);
        const prop = i === 0 ? makeCrate(0.7) : i === 1 ? makeBarrel() : makeChest();
        this.addStatic(prop, px, pz, rng.float(0, 6.28), { collide: 0.7 });
      }
      // palenisko z kamieni
      for (let i = 0; i < 7; i++) {
        const a = (i / 7) * Math.PI * 2;
        this.addStatic(makeRock(rng.int(1, 997), 0.32), fx + Math.cos(a) * 1.25, fz + Math.sin(a) * 1.25, a, {});
      }
      return;
    }

    if (kind === 'shrine') {
      const shrine = makeShrine();
      shrine.group.position.set(x, y, z);
      shrine.group.rotation.y = rot;
      this.group.add(shrine.group);
      this.animated.push(shrine);
      this.colliders.push({ x, z, r: 1.4 });
      this.addStatic(makeMenhir(2.6, rng.int(1, 99)), x + Math.cos(rot + 1.2) * 3.4, z + Math.sin(rot + 1.2) * 3.4, rot, { collide: 0.7 });
      this.addStatic(makeMenhir(1.8, rng.int(1, 99)), x + Math.cos(rot - 1.6) * 3.1, z + Math.sin(rot - 1.6) * 3.1, rot, { collide: 0.6 });
      this.addInteractive({
        id: `wild_shrine_${Math.round(x)}_${Math.round(z)}`,
        kind: 'shrine', x, z, radius: 3.4,
        label: 'Leśna kapliczka — złóż ofiarę (15 złota)', mesh: null,
        data: { cost: 15 },
      });
      for (let i = 0; i < 5; i++) {
        const [px, pz] = spread(7);
        if (isWater(px, pz) || slopeAt(px, pz) > 0.7) continue;
        this.addStatic(makeRock(rng.int(1, 997), rng.float(0.4, 1.1)), px, pz, rng.float(0, 6.28), {});
      }
      return;
    }

    if (kind === 'watchtower') {
      const stone = mat('#6d675d');
      const wood = mat('#4f3c28', { rough: 0.95 });
      const g = new THREE.Group();
      const base = mesh(box(4.4, 5.6, 4.4), stone, 0, 2.8, 0);
      g.add(base);
      const broken = mesh(box(1.6, 2.2, 1.5), stone, 1.1, 6.6, -1.0);
      broken.rotation.y = 0.6;
      g.add(broken);
      const deck = mesh(box(5.2, 0.28, 5.2), wood, 0, 5.7, 0);
      g.add(deck);
      for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
        const post = mesh(box(0.22, 2.0, 0.22), wood, sx * 2.2, 6.7, sz * 2.2);
        g.add(post);
      }
      this.addStatic(g, x, z, rot, { collide: 2.6, whole: true });
      this.addStatic(makeSignpost(), x + 3.4, z + 1.2, rot + 0.7, { collide: 0.5 });
      for (let i = 0; i < 4; i++) {
        const [px, pz] = spread(9);
        if (isWater(px, pz)) continue;
        this.addStatic(makeBush(rng.int(1, 999)), px, pz, rng.float(0, 6.28), {});
      }
      return;
    }

    if (kind === 'den') {
      const g = new THREE.Group();
      const earth = mat('#5a4a38', { rough: 1 });
      const mound = mesh(new THREE.SphereGeometry(3.4, 9, 7, 0, Math.PI * 2, 0, Math.PI * 0.55), earth, 0, 0.1, 0);
      mound.scale.y = 0.72;
      mound.receiveShadow = true;
      g.add(mound);
      const mouth = mesh(new THREE.SphereGeometry(1.15, 8, 6), mat('#241d16', { rough: 1 }), 0, 0.55, 2.9);
      mouth.scale.set(1.15, 0.85, 0.5);
      g.add(mouth);
      g.add(makeWolfTotem());
      this.addStatic(g, x, z, rot, { whole: true, collide: 3.2 });
      for (let i = 0; i < 4; i++) {
        const [px, pz] = spread(5.5);
        this.addStatic(makeBonePile(rng.int(1, 99)), px, pz, rng.float(0, 6.28), {});
      }
      return;
    }

    if (kind === 'grove') {
      for (let i = 0; i < 7; i++) {
        const a = (i / 7) * Math.PI * 2 + rng.float(-0.2, 0.2);
        const r = rng.float(7, 10);
        const px = x + Math.cos(a) * r;
        const pz = z + Math.sin(a) * r;
        if (isWater(px, pz)) continue;
        this.addStatic(makeTree(rng.int(1, 9999)), px, pz, rng.float(0, 6.28), { collide: 0.75 });
      }
      this.addStatic(makeMenhir(3.0, rng.int(1, 99)), x, z, rot, { collide: 0.8 });
      this.addStatic(makeHerbPatch(rng.int(1, 99)), x + 1.8, z + 1.4, 0.4, {});
      for (let i = 0; i < 8; i++) {
        const [px, pz] = spread(6);
        if (isWater(px, pz)) continue;
        this.addStatic(makeBush(rng.int(1, 999)), px, pz, rng.float(0, 6.28), {});
      }
      return;
    }

    if (kind === 'cart') {
      const wood = mat('#5b4329', { rough: 0.95 });
      const g = new THREE.Group();
      const bed = mesh(box(2.6, 0.24, 1.5), wood, 0, 0.72, 0);
      bed.rotation.z = 0.06;
      g.add(bed);
      for (const sx of [-1, 1]) {
        const wheel = mesh(new THREE.TorusGeometry(0.52, 0.08, 5, 12), mat('#42301f'), sx * 1.05, 0.54, sx > 0 ? 0.62 : -0.62);
        wheel.rotation.y = Math.PI / 2;
        wheel.rotation.z = sx > 0 ? 0.25 : 0;
        g.add(wheel);
      }
      const shaft = mesh(box(2.2, 0.12, 0.12), wood, 1.9, 0.55, 0);
      shaft.rotation.z = -0.24;
      g.add(shaft);
      const load = mesh(box(1.4, 0.7, 1.1), mat('#7a6a4c'), 0, 1.1, 0);
      g.add(load);
      this.addStatic(g, x, z, rot, { whole: true, collide: 1.8 });
      for (let i = 0; i < 3; i++) {
        const [px, pz] = spread(3);
        this.addStatic(makeCrate(0.6), px, pz, rng.float(0, 6.28), { collide: 0.6 });
      }
      this.addStatic(makeChest(), x - 1.6, z + 1.1, rot + 0.4, { collide: 0.8 });
      return;
    }

    if (kind === 'charcoal') {
      const g = new THREE.Group();
      const mound = mesh(new THREE.ConeGeometry(2.4, 2.1, 9), mat('#3d3a34', { rough: 1 }), 0, 1.0, 0);
      g.add(mound);
      const cap = mesh(new THREE.ConeGeometry(1.3, 1.0, 9), mat('#565049', { rough: 1 }), 0, 2.3, 0);
      g.add(cap);
      this.addStatic(g, x, z, rot, { whole: true, collide: 2.4 });
      const fire = makeCampfire();
      fire.group.position.set(x + 3.2, heightAt(x + 3.2, z + 0.8), z + 0.8);
      this.group.add(fire.group);
      this.animated.push(fire);
      for (let i = 0; i < 4; i++) {
        const [px, pz] = spread(5);
        this.addStatic(makeBarrel(), px, pz, rng.float(0, 6.28), { collide: 0.6 });
      }
      return;
    }

    // fisher — mały pomost nad rzeką albo nad jeziorem
    const surf = riverSurfaceAt(x, z);
    const lake = LAKE_SURFACES.reduce((best, l) => {
      const d = dist2(l.x, l.z, x, z) - l.r;
      return !best || d < best.d ? { l, d } : best;
    }, null);
    const waterY = surf ? surf.y : (lake ? lake.l.level : WATER_LEVEL);
    const g = new THREE.Group();
    const wood = mat('#4b3826', { rough: 0.96 });
    for (let i = 0; i < 5; i++) {
      const plank = mesh(box(3.0, 0.09, 0.34), wood, 0, 0.62 - i * 0.02, -i * 0.42);
      g.add(plank);
    }
    for (const sx of [-1, 1]) {
      for (const sz of [0, -1.6]) {
        const post = mesh(cyl(0.08, 0.1, 2.0, 5), wood, sx * 1.3, 0.1, sz);
        g.add(post);
      }
    }
    g.position.set(x, waterY - 0.45, z);
    g.rotation.y = rot;
    g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    this.group.add(g);
    this.addStatic(makeNetFrame(), x + Math.cos(rot) * 2.6, z + Math.sin(rot) * 2.6, rot + 1.2, { collide: 0.8 });
    this.addStatic(makeCrate(0.55), x - 1.2, z + 1.4, rot, { collide: 0.5 });
  }


  // =========================================================================
  // RZEKI I JEZIORA — mosty, trzciny, kamienie, łodzie
  // =========================================================================
  _buildBridges() {
    const rng = new RNG(8181);
    this.bridges = [];
    for (const c of pathRiverCrossings()) {
      const surf = riverSurfaceAt(c.x, c.z);
      const y = surf ? surf.y : heightAt(c.x, c.z);
      if (y <= WATER_LEVEL + 0.9) continue; // przy morzu wystarczy bród
      const bridge = makeBridge({
        length: c.width * 2.1 + 7,
        width: 4.8,
        height: 2.6,
        seed: rng.int(1, 999),
      });
      bridge.position.set(c.x, y + 0.55, c.z);
      bridge.rotation.y = c.angle;
      bridge.traverse((o) => {
        if (o.isMesh) {
          o.castShadow = true;
          o.receiveShadow = true;
        }
      });
      bridge.name = 'bridge';
      this.group.add(bridge);
      this.bridges.push({
        x: c.x, z: c.z, angle: c.angle, width: c.width,
        deckY: y + 0.55 + 0.07,
        halfWidth: 4.8 / 2 - 0.35,
        halfLength: (c.width * 2.1 + 7) / 2,
      });
    }
  }

  /**
   * Wysokość pomostu, jeśli stoimy na moście (null = nie ma mostu).
   * Dzięki temu bohater idzie po deskach, a nie brodzi w korycie pod nimi.
   */
  bridgeDeckAt(x, z) {
    for (const b of this.bridges ?? []) {
      const dx = x - b.x;
      const dz = z - b.z;
      const cos = Math.cos(-b.angle);
      const sin = Math.sin(-b.angle);
      const lx = dx * cos - dz * sin;
      const lz = dx * sin + dz * cos;
      if (Math.abs(lx) <= b.halfWidth && Math.abs(lz) <= b.halfLength) {
        // delikatne wybrzuszenie pomostu, jak w modelu
        const camber = 0.55 * (1 - Math.pow((lz / (b.halfLength || 1)) * 2, 2) * 0.35);
        return b.deckY - 0.55 + camber;
      }
    }
    return null;
  }

  _buildRiverProps() {
    const rng = new RNG(5150);
    for (const river of RIVER_SURFACES) {
      const pts = river.points;
      const width = river.width;
      for (let i = 3; i < pts.length - 2; i += 2) {
        const a = pts[i - 1];
        const b = pts[i + 1];
        let tx = b.x - a.x;
        let tz = b.z - a.z;
        const len = Math.hypot(tx, tz) || 1;
        tx /= len;
        tz /= len;
        const nx = -tz;
        const nz = tx;
        const p = pts[i];
        const surfY = p.y;
        for (const side of [-1, 1]) {
          if (!rng.chance(0.45)) continue;
          const off = width * 0.55 + rng.float(0.5, 4.5);
          const x = p.x + nx * off * side;
          const z = p.z + nz * off * side;
          if (heightAt(x, z) < surfY + 0.05) continue;
          if (slopeAt(x, z) > 0.7) continue;
          if (distanceToPath(x, z) < 4) continue;
          const reed = makeReed(rng.int(1, 997));
          this.addStatic(reed, x, z, rng.float(0, Math.PI * 2), {});
        }
        if (rng.chance(0.34)) {
          const x = p.x + nx * rng.float(-width * 0.32, width * 0.32);
          const z = p.z + nz * rng.float(-width * 0.32, width * 0.32);
          const rock = makeRock(rng.int(1, 997), rng.float(0.35, 0.85));
          this.addStatic(rock, x, z, rng.float(0, Math.PI * 2), { yOffset: 0.05 });
        }
        if (rng.chance(0.06) && distanceToPath(p.x, p.z) > 14) {
          // przewalone drzewo nad wodą
          const logX = p.x + nx * (width * 0.5 + 1.5);
          const logZ = p.z + nz * (width * 0.5 + 1.5);
          const log = mesh(cyl(0.28, 0.34, rng.float(5, 8), 6), mat('#4b3a28'), 0, 0.3, 0);
          log.rotation.z = Math.PI / 2;
          const grp = new THREE.Group();
          grp.add(log);
          this.addStatic(grp, logX, logZ, Math.atan2(nx, nz) + rng.float(-0.4, 0.4), { yOffset: 0.15 });
        }
      }
    }
  }

  _buildLakeShores() {
    const rng = new RNG(6262);
    for (const lake of LAKE_SURFACES) {
      if (lake.level <= WATER_LEVEL + 0.5) continue;
      const count = Math.round(lake.r * 1.6);
      for (let i = 0; i < count; i++) {
        const ang = rng.float(0, Math.PI * 2);
        const rad = lake.r * rng.float(0.98, 1.16);
        const x = lake.x + Math.cos(ang) * rad;
        const z = lake.z + Math.sin(ang) * rad;
        if (heightAt(x, z) < lake.level + 0.1) continue;
        if (rng.chance(0.55)) {
          this.addStatic(makeReed(rng.int(1, 997)), x, z, rng.float(0, Math.PI * 2), {});
        } else if (rng.chance(0.5)) {
          this.addStatic(makeRock(rng.int(1, 997), rng.float(0.4, 1.1)), x, z, rng.float(0, Math.PI * 2), {});
        }
      }
      // łódź przy jednym z jezior
      if (lake.name === 'Jezioro Wierzbowe') {
        const boat = makeBoat();
        const x = lake.x + lake.r * 0.72;
        const z = lake.z + lake.r * 0.32;
        boat.position.set(x, lake.level + 0.18, z);
        boat.rotation.y = rng.float(0, Math.PI * 2);
        this.group.add(boat);
        this.animated.push({
          update: (dt) => {
            boat.position.y = lake.level + 0.18 + Math.sin(performance.now() * 0.0009) * 0.06;
            boat.rotation.z = Math.sin(performance.now() * 0.0007) * 0.02;
          },
        });
      }
    }
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
      label: 'Stara skrzynia', mesh: this._chestModel(), rotY: 0.7,
      data: { loot: [['bread', 2], ['gold', 35], ['leather_hood', 1]] },
    });
  }

  // =========================================================================
  // TABLICA ZLECEŃ — poboczne kontrakty
  // =========================================================================
  _buildBoard() {
    const x = LOCATIONS.village.x + 16;
    const z = LOCATIONS.village.z - 12;
    const g = new THREE.Group();
    const wood = mat('#4a3624');
    g.add(mesh(box(0.22, 3.0, 0.22), wood, -1.35, 1.5, 0));
    g.add(mesh(box(0.22, 3.0, 0.22), wood, 1.35, 1.5, 0));
    g.add(mesh(box(3.1, 0.18, 0.3), wood, 0, 3.0, 0));
    g.add(mesh(box(3.0, 1.7, 0.12), mat('#7a5b38'), 0, 2.1, 0));
    const papers = ['#e6dcc2', '#d8cba8', '#e0d3b4', '#cfc3a2'];
    for (let i = 0; i < 4; i++) {
      const paper = mesh(box(0.62, 0.78, 0.02), mat(papers[i]), -1.0 + i * 0.66, 2.2 + (i % 2) * 0.18, 0.08);
      paper.rotation.z = (i % 2 ? 1 : -1) * 0.05;
      g.add(paper);
    }
    g.add(mesh(box(0.34, 0.5, 0.34), new THREE.MeshStandardMaterial({
      color: '#ffd9a0', emissive: '#ffae4a', emissiveIntensity: 1.2, roughness: 0.6,
    }), 1.35, 3.3, 0.2));
    const lamp = new THREE.PointLight('#ffbe6e', 1.6, 9, 2);
    lamp.position.set(1.35, 3.4, 0.4);
    g.add(lamp);
    this.addStatic(g, x, z, -0.4, { whole: true, collide: 1.2 });
    this.addInteractive({
      id: 'job_board', kind: 'board', x: x + 2.2, z: z + 0.6, radius: 3.8,
      label: 'Tablica zleceń', mesh: null,
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
      label: 'Kufer kupiecki', mesh: this._chestModel(), rotY: -0.5,
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
      label: 'Skrzynia bandytów', mesh: this._chestModel(), rotY: 0.5,
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
      label: 'Zapomniana skrzynia', mesh: this._chestModel(), rotY: -0.7,
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
      label: 'Skrzynia strażnika', mesh: this._chestModel(), rotY: 1.0,
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
      label: 'Skrzynia górników', mesh: this._chestModel(), rotY: 0.3,
      data: { loot: [['iron_ore', 4], ['gold', 40], ['might_elixir', 1]] },
    });
  }

  // =========================================================================
  // JEZIORO
  // =========================================================================
  _buildLake() {
    const cx = LOCATIONS.lake.x;
    const cz = LOCATIONS.lake.z;
    const K = WORLD_SCALE; // odległości w tym miejscu rosną razem z mapą
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
    const dx = cx + 92 * K;
    const dz = cz - 61 * K;
    dock.position.set(dx, WATER_LEVEL + 0.55, dz);
    dock.rotation.y = -0.58 - Math.PI / 2;
    this.group.add(dock);

    const boat = makeBoat();
    boat.position.set(cx + 77 * K, WATER_LEVEL + 0.15, cz - 50 * K);
    boat.rotation.y = 0.8;
    this.group.add(boat);

    for (let i = 0; i < 14; i++) {
      const a = i * 0.45;
      const r = 126 * K + (i % 3) * 20;
      const x = cx + Math.cos(a) * r;
      const z = cz + Math.sin(a) * r;
      if (!isWater(x, z) && distanceToPath(x, z) > 8) {
        this.batcher.add(makeRock(500 + i, 0.8 + (i % 3) * 0.5), x, heightAt(x, z), z, a);
      }
    }
    this.addInteractive({
      id: 'lake_herbs', kind: 'resource', x: cx + 80 * K, z: cz + 100 * K, radius: 3,
      label: 'Zbierz zioła', mesh: makeHerbPatch(66), cooldown: 45,
      data: { item: 'herbs', qty: 3 },
    });
    this.addInteractive({
      id: 'lake_fishing', kind: 'resource', x: cx + 102 * K, z: cz - 67 * K, radius: 3.2,
      label: 'Złów rybę (wędka rybacka)', mesh: null, cooldown: 40,
      data: { item: 'lake_fish', qty: 1 },
    });
    this.addInteractive({
      id: 'lake_chest', kind: 'chest', x: cx + 120 * K, z: cz + 51 * K, radius: 3.2,
      label: 'Zamulona skrzynia', mesh: this._chestModel(), rotY: 1.4,
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
      label: 'Skrzynia strażnika warowni', mesh: this._chestModel(), rotY: 0.2,
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
      label: 'Kufer pustelnika', mesh: this._chestModel(), rotY: -0.9,
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
      label: 'Zapadnięta skrzynia', mesh: this._chestModel(), rotY: 0.9,
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
      label: 'Skrzynia celników', mesh: this._chestModel(), rotY: 0.8,
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
      label: 'Skrzynia górnicza', mesh: this._chestModel(), rotY: -0.4,
      data: { loot: [['iron_ore', 5], ['ancient_metal', 1], ['gold', 65]] },
    });
    this.batcher.add(makeCrate(0.9), cx + 7, heightAt(cx + 7, cz + 8), cz + 8, 0.2);
    this.batcher.add(makeBarrel(), cx - 8, heightAt(cx - 8, cz + 9), cz + 9, 0.6);

    // wyposażenie z paczki CC0: beczki, skrzynie, pochodnie i stół górników
    this.addAssetProp('crates', cx + 10, cz + 4, 0.4, { targetHeight: 1.4, collide: 0.8 });
    this.addAssetProp('barrel', cx - 6, cz + 7, 1.2, { targetHeight: 1.1, collide: 0.5 });
    this.addAssetProp('barrel', cx - 7.4, cz + 8.2, 2.6, { targetHeight: 1.0, collide: 0.5 });
    this.addAssetProp('table', cx + 3, cz + 9, 0.3, { targetHeight: 0.85, collide: 0.9 });
    this.addAssetProp('chair', cx + 4.4, cz + 10, 2.0, { targetHeight: 1.0 });
    this.addAssetProp('torch', cx - 3.4, cz - 4.2, 0, { targetHeight: 2.4 });
    this.addAssetProp('torch', cx + 3.6, cz - 4.4, 0, { targetHeight: 2.4 });
    this.addAssetProp('torch', cx + 12, cz + 10, 0, { targetHeight: 2.4 });

    this.addInteractive({
      id: 'mine_sign', kind: 'sign', x: cx + 6, z: cz - 10, radius: 3.2,
      label: 'Tabliczka górników (mapa)', mesh: makeSignpost(),
    });
    this.addLight('#ff9440', 2.4, 10, cx - 3.4, cz - 4.2, 2.2);
    this.addLight('#ff9440', 2.4, 10, cx + 3.6, cz - 4.4, 2.2);
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
      label: 'Skrzynia strażnicy', mesh: this._chestModel(), rotY: 0.9,
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
  // =========================================================================
  // DROBNE PROPSY Z PACZKI CC0 (beczki, skrzynie, beczułki, stoły, pochodnie)
  // =========================================================================
  _buildAssetProps() {
    const lib = this.game.assets;
    if (!lib?.ready) return;
    const P = (key, lx, lz, dx, dz, rotY, targetHeight, collide = 0) => {
      const x = lx + dx;
      const z = lz + dz;
      if (isWater(x, z)) return;
      this.addAssetProp(key, x, z, rotY, { targetHeight, collide });
    };
    const V = LOCATIONS.village;
    const T = LOCATIONS.trading;
    const B = LOCATIONS.bandits;
    const F = LOCATIONS.forge;
    const C = LOCATIONS.fisherhut;
    const LH = LOCATIONS.lighthouse;
    const RU = LOCATIONS.ruins;

    // Wilcza Dolina — obejście gospody i targ
    P('barrel', V.x, V.z, 9, -6, 0.4, 1.1, 0.5);
    P('barrel', V.x, V.z, 10.4, -6.8, 1.1, 1.0, 0.5);
    P('crate', V.x, V.z, -12, 4, 0.7, 0.9, 0.5);
    P('crates', V.x, V.z, -13.5, 5.4, 0.3, 1.3, 0.7);
    P('table', V.x, V.z, 4, -12, 0.2, 0.85, 0.8);
    P('chair', V.x, V.z, 5.6, -12.6, -0.6, 1.0, 0);
    P('chair', V.x, V.z, 2.4, -11.6, 2.3, 1.0, 0);
    P('torch', V.x, V.z, -4, 14, 0, 2.4, 0);
    P('torch', V.x, V.z, 12, 12, 0, 2.4, 0);

    // Kotlina Kupców — stragany
    P('crate', T.x, T.z, -6, 3, 0.9, 0.9, 0.5);
    P('crates', T.x, T.z, -7.4, 5, -0.4, 1.4, 0.7);
    P('barrel', T.x, T.z, 7, 2, 2.1, 1.1, 0.5);
    P('keg', T.x, T.z, 8.4, -2, 0.6, 1.0, 0.4);
    P('table', T.x, T.z, -2, -6, 1.2, 0.85, 0.8);

    // Obozowisko bandytów — łupy
    P('keg', B.x, B.z, 5, 4, 0.8, 1.0, 0.4);
    P('keg', B.x, B.z, 6.4, 5.2, 1.9, 1.0, 0.4);
    P('crates', B.x, B.z, -6, -4, 0.2, 1.4, 0.7);
    P('barrel', B.x, B.z, -7.2, 3, 1.4, 1.1, 0.5);
    P('torch', B.x, B.z, 0, -9, 0, 2.4, 0);

    // Kuźnia
    P('barrel', F.x, F.z, 6, 5, 0.5, 1.1, 0.5);
    P('crate', F.x, F.z, -6, 6, 1.6, 0.9, 0.5);
    P('torch', F.x, F.z, 8, -6, 0, 2.4, 0);

    // Chaty rybaków
    P('barrel', C.x, C.z, -3, 8, 0.9, 1.1, 0.5);
    P('barrel', C.x, C.z, -1.6, 8.9, 2.4, 1.0, 0.5);
    P('crates', C.x, C.z, 9, 3, 1.1, 1.3, 0.7);
    P('table', C.x, C.z, 3, -6, 0.4, 0.85, 0.8);

    // Latarnia i ruiny
    P('crate', LH.x, LH.z, 4, 3, 0.3, 0.9, 0.5);
    P('torch', RU.x, RU.z, -6, 6, 0, 2.4, 0);
    P('torch', RU.x, RU.z, 7, -5, 0, 2.4, 0);

    // ---- cmentarz przy kurhanie ------------------------------------------
    const BA = LOCATIONS.barrow;
    const graveRing = [
      ['grave_a', -7, -8], ['grave_b', -3, -11], ['gravemarker_a', 2, -12],
      ['gravemarker_b', 6, -10], ['grave_a', 9, -6], ['crypt', -12, -3],
      ['coffin', 12, 2], ['coffin_decorated', -9, 6], ['shrine_ornate', 0, 9],
    ];
    for (const [key, dx, dz] of graveRing) {
      P(key, BA.x, BA.z, dx, dz, (dx + dz) * 0.31, key.startsWith('crypt') ? 2.6 : 1.3, key === 'crypt' ? 1.8 : 0);
    }
    P('fence_broken', BA.x, BA.z, -16, -12, 0.8, 1.1, 0);
    P('fence_broken', BA.x, BA.z, 16, -11, -0.6, 1.1, 0);
    P('skull', BA.x, BA.z, 4, 6, 0.3, 0.35, 0);
    P('bone_a', BA.x, BA.z, 5.4, 7.2, 1.2, 0.3, 0);
    P('ribcage', BA.x, BA.z, -5.5, 4.4, 2.2, 0.5, 0);
    P('lantern_standing', BA.x, BA.z, 0, -6, 0, 1.5, 0.4);
    P('shrine_candles', BA.x, BA.z, 0, 11, 0, 1.0, 0);

    // ---- bagno: szczątki, latarnie, kapliczka ----------------------------
    const SW = LOCATIONS.swamp;
    P('skull', SW.x, SW.z, 6, 3, 0.7, 0.35, 0);
    P('skull', SW.x, SW.z, -8, -4, 2.1, 0.35, 0);
    P('bone_a', SW.x, SW.z, -9, -3, 0.4, 0.3, 0);
    P('ribcage', SW.x, SW.z, 12, -7, -0.5, 0.5, 0);
    P('shrine_candles', SW.x, SW.z, -14, 8, 1.4, 1.0, 0);
    P('lantern_standing', SW.x, SW.z, 16, 9, 0, 1.5, 0.4);
    P('fence_broken', SW.x, SW.z, 3, 14, 2.6, 1.1, 0);
    P('post_lantern', SW.x, SW.z, -4, 15, 0, 2.3, 0.3);

    // ---- osada: obejścia, ławy, studnia z żurawiem -----------------------
    P('bench', V.x, V.z, -8, -14, 0.5, 0.9, 0.6);
    P('bench', V.x, V.z, 14, 4, -1.1, 0.9, 0.6);
    P('stool', V.x, V.z, 6.8, -13.2, 1.2, 0.9, 0);
    P('stool', V.x, V.z, 1.6, -10.8, -0.6, 0.9, 0);
    P('rug', V.x, V.z, 4.2, -11.6, 0.2, 0.02, 0);
    P('lamp_table', V.x, V.z, 5.0, -10.4, 0, 1.1, 0);
    P('streetlight', V.x, V.z, 0, -18, 0, 3.2, 0.4);
    P('streetlight', V.x, V.z, -16, 2, 0, 3.2, 0.4);
    P('watertower', V.x, V.z, 20, -8, 0.6, 6.5, 2.2);
    P('books', V.x, V.z, 3.0, -12.4, 2.2, 0.3, 0);
    P('shelf', V.x, V.z, -14, -6, 1.4, 1.8, 0.7);
    P('cabinet', V.x, V.z, 16, -12, -0.9, 1.7, 0.7);
    P('painting', V.x, V.z, -11, 8, 2.9, 1.0, 0);
    P('big_box', V.x, V.z, -9, 11, 0.3, 1.0, 0.5);

    // ---- Kotlina Kupców: ławy, skrzynie, latarnie ------------------------
    P('bench', T.x, T.z, 4, 6, 0.9, 0.9, 0.6);
    P('bench', T.x, T.z, -9, -3, -0.4, 0.9, 0.6);
    P('big_box', T.x, T.z, 11, 6, 1.3, 1.0, 0.5);
    P('streetlight', T.x, T.z, 0, 12, 0, 3.2, 0.4);
    P('stool', T.x, T.z, -2, -8, 0.5, 0.9, 0);
    P('books', T.x, T.z, -4.2, -6.6, 1.1, 0.3, 0);

    // ---- kuźnia i kopalnia ----------------------------------------------
    P('big_box', F.x, F.z, -8, -8, 0.7, 1.0, 0.5);
    P('post_lantern', F.x, F.z, 4, -9, 0, 2.3, 0.3);
    P('stool', F.x, F.z, 8, 6, 0.2, 0.9, 0);
    P('bed_single', F.x, F.z, -12, 4, 1.2, 1.3, 0);

    // ---- chata rybaka: wnętrze na zewnątrz (sieci, ława, beczki) --------
    P('bench', C.x, C.z, 6, -2, 0.3, 0.9, 0.6);
    P('bed_single', C.x, C.z, -6, -6, 1.8, 1.3, 0);
    P('table_med', C.x, C.z, 2, 8, 0.8, 0.85, 0.7);
    P('books', C.x, C.z, 2.6, 9.2, 0.4, 0.3, 0);

    // ---- ruiny: sarkofag i ołtarz ---------------------------------------
    P('crypt', RU.x, RU.z, -14, -10, 0.9, 2.6, 1.8);
    P('shrine_candles', RU.x, RU.z, 8, 10, 1.2, 1.0, 0);
    P('coffin_decorated', RU.x, RU.z, -8, 12, 2.4, 0.9, 0.6);
    P('skull', RU.x, RU.z, 3, 13, 1.0, 0.35, 0);
  }

  // =========================================================================
  // WYBRZEŻE — latarnia, wrak, chaty rybaków
  // =========================================================================
  _buildCoast() {
    // ---- latarnia na cyplu -------------------------------------------------
    const lx = LOCATIONS.lighthouse.x;
    const lz = LOCATIONS.lighthouse.z;
    const tower = makeLighthouse({ h: 17 });
    tower.position.set(lx, heightAt(lx, lz) - 0.3, lz);
    tower.rotation.y = Math.atan2(-lx, -lz);
    this.group.add(tower);
    this.colliders.push({ x: lx, z: lz, r: 4.4 });

    const lanternY = heightAt(lx, lz) - 0.3 + (tower.userData.lanternY ?? 20);
    const lamp = new THREE.PointLight('#ffcf8f', 5.5, 90, 2);
    lamp.position.set(lx, lanternY, lz);
    this.group.add(lamp);

    // obracająca się smuga światła — widoczna z daleka nocą
    const beamGeo = new THREE.ConeGeometry(7, 66, 12, 1, true);
    beamGeo.translate(0, -33, 0);
    beamGeo.rotateX(Math.PI / 2);
    const beamMat = new THREE.MeshBasicMaterial({
      color: '#ffe0a8', transparent: true, opacity: 0, depthWrite: false,
      blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
    });
    const beam = new THREE.Mesh(beamGeo, beamMat);
    beam.position.set(lx, lanternY, lz);
    beam.rotation.x = -0.06;
    this.group.add(beam);
    this.beacon = { beam, beamMat, lamp };
    this.animated.push({
      update: (dt) => {
        beam.rotation.y += dt * 0.55;
      },
    });

    this.addInteractive({
      id: 'lighthouse_chest', kind: 'chest', x: lx + 7, z: lz + 4, radius: 3.2,
      label: 'Skrzynia latarnika', mesh: this._chestModel(), rotY: 0.7,
      data: { loot: [['gold', 90], ['health_potion', 2], ['iron_ore', 3]] },
    });
    this.addStatic(makeFence(6, 12), lx - 9, lz + 8, 0.4);
    this.addStatic(makeSignpost(), lx - 4, lz - 9, 1.1);

    // ---- wrak na mieliźnie ------------------------------------------------
    const wx = LOCATIONS.wreck.x;
    const wz = LOCATIONS.wreck.z;
    const wreck = makeShipwreck();
    wreck.position.set(wx, heightAt(wx, wz) + 0.2, wz);
    wreck.rotation.y = -0.9;
    this.group.add(wreck);
    this.colliders.push({ x: wx, z: wz, r: 5.0 });
    this.addInteractive({
      id: 'wreck_chest', kind: 'chest', x: wx + 4.5, z: wz - 3.2, radius: 3.2,
      label: 'Skrzynia ze wraku', mesh: this._chestModel(), rotY: -0.5,
      data: { loot: [['gold', 120], ['crystal_mana', 1], ['leather_vest', 1]] },
    });
    this.addInteractive({
      id: 'wreck_flotsam', kind: 'resource', x: wx - 6, z: wz + 5, radius: 3.4,
      label: 'Zbierz drewno z wraku', mesh: makeCrate(0.7), cooldown: 70,
      data: { item: 'wood', qty: 4 },
    });
    for (let i = 0; i < 7; i++) {
      const a = i * 1.7;
      const x = wx + Math.cos(a) * (7 + i);
      const z = wz + Math.sin(a) * (7 + i);
      if (heightAt(x, z) > WATER_LEVEL - 0.5) this.batcher.add(makeRock(900 + i, 0.7 + (i % 3) * 0.4), x, heightAt(x, z), z, a);
    }

    // ---- chaty rybaków -----------------------------------------------------
    const fx = LOCATIONS.fisherhut.x;
    const fz = LOCATIONS.fisherhut.z;
    const spots = [
      { dx: -9, dz: 4, w: 6.2, d: 5.0, rot: 0.35, wall: '#a89a7c' },
      { dx: 8, dz: 10, w: 5.0, d: 4.2, rot: -1.1, wall: '#9d9179' },
      { dx: 3, dz: -12, w: 4.6, d: 4.0, rot: 2.2, wall: '#b0a184' },
    ];
    for (const s of spots) {
      const house = makeHouse({ w: s.w, d: s.d, h: 2.7, wall: s.wall, roof: '#4a3a2e', rot: s.rot });
      this.addStatic(house, fx + s.dx, fz + s.dz, s.rot, { collide: 3.6 });
    }
    this.addStatic(makeFishRack(), fx - 3, fz + 9, 0.2);
    this.addStatic(makeFishRack(), fx + 11, fz - 2, 1.5);
    this.addStatic(makeNetFrame(), fx - 12, fz - 6, 0.9);
    this.addStatic(makeBarrel(), fx + 2.5, fz + 6, 0);
    this.addStatic(makeCrate(0.8), fx - 1.5, fz + 5.5, 0.6);
    const fire = makeCampfire();
    this.addStatic(fire.group, fx + 6, fz + 3, 0, { whole: true });
    this.animated.push(fire);
    this.addInteractive({
      id: 'fisher_rest', kind: 'rest', x: fx + 6, z: fz + 3, radius: 3.6,
      label: 'Odpocznij przy ogniu rybaków', mesh: null,
      data: {},
    });
    this.addInteractive({
      id: 'fisher_fish', kind: 'resource', x: fx - 14, z: fz + 12, radius: 3.4,
      label: 'Złów rybę z pomostu', mesh: null, cooldown: 40,
      data: { item: 'lake_fish', qty: 1 },
    });
    this.addInteractive({
      id: 'fisher_herbs', kind: 'resource', x: fx + 16, z: fz + 6, radius: 3,
      label: 'Zbierz zioła nadmorskie', mesh: makeHerbPatch(88), cooldown: 45,
      data: { item: 'herbs', qty: 2 },
    });
    // pomost wchodzący w morze
    const pier = new THREE.Group();
    for (let i = 0; i < 12; i++) {
      pier.add(mesh(box(2.6, 0.16, 0.9), mat('#5a422a'), 0, 0.2, i * 0.95));
    }
    for (const sx of [-1, 1]) {
      for (let i = 0; i < 4; i++) {
        pier.add(mesh(cyl(0.13, 0.13, 3.2, 5), mat('#42301f'), sx * 1.15, -1.2, i * 3.2));
      }
    }
    const px = fx - 16;
    const pz = fz + 20;
    pier.position.set(px, Math.max(heightAt(px, pz), WATER_LEVEL) + 0.5, pz);
    pier.rotation.y = Math.atan2(fx - px, fz - pz);
    this.group.add(pier);

    // ---- samotna skała: ołtarz na wyspie ----------------------------------
    const ix = LOCATIONS.island.x;
    const iz = LOCATIONS.island.z;
    if (heightAt(ix, iz) > WATER_LEVEL) {
      this.addStatic(makeMenhir(3.4, 21), ix, iz, 0.4);
      this.addStatic(makeMenhir(2.6, 33), ix + 4, iz + 3, 1.7);
      this.addInteractive({
        id: 'island_chest', kind: 'chest', x: ix + 2, z: iz - 3, radius: 3.2,
        label: 'Zamknięta skrzynia', mesh: this._chestModel(), rotY: 2.4,
        data: { loot: [['gold', 180], ['ancient_metal', 1], ['mana_potion', 2]] },
      });
    }
  }

  _scatterNature() {
    const S = WORLD_SCALE;
    const rng = new RNG(424242);
    // modele CC0 (jeśli są wczytane) — drzewa i skały jako instancje
    const lib = this.game.assets ?? null;
    const useModels = !!(lib && lib.ready && Object.keys(lib.nature).length);
    const scatter = useModels ? new ModelScatter(this.group) : null;
    const treeKeys = ['tree_a', 'tree_b', 'tree_c', 'tree_medium', 'trees_cluster'];
    // martwe drzewa i jesienne sosny — dla bagien i wyższych zboczy
    const deadTreeKeys = ['tree_dead_large', 'tree_dead_medium'];
    const autumnTreeKeys = ['pine_autumn_large', 'pine_gold_large'];
    const undergrowthKeys = ['tree_small', 'tree_medium'];
    const rockKeys = ['rock_a', 'rock_b', 'rock_c', 'rock_d', 'rock_e'];
    const clearR = {
      village: 64, trading: 46, forge: 30, bandits: 30, barrow: 34, ruins: 40,
      quarry: 26, castle: 44, hermit: 26, swamp: 24, pass: 30, circle: 24,
      mine: 24, crossroads: 18, lake: 0, highlands: 0,
      lighthouse: 30, wreck: 26, fisherhut: 40, island: 20,
    };
    const blocked = Object.entries(LOCATIONS)
      .filter(([k]) => (clearR[k] ?? 24) > 0)
      .map(([k, l]) => ({ x: l.x, z: l.z, r: (clearR[k] ?? 24) * 1.45 }));
    blocked.push({ x: 2 * S, z: 342 * S, r: 14 * 1.45 });
    const isBlocked = (x, z, pad = 0) => {
      for (const b of blocked) if (dist2(x, z, b.x, b.z) < b.r + pad) return true;
      return false;
    };
    const landR = LAND_RADIUS;
    const pick = (arr) => arr[Math.floor(rng.next() * arr.length)];

    // warianty drzew (gotowe geometrie — szybkie kopiowanie)
    const treeVariants = [];
    for (let i = 0; i < 8; i++) {
      const kind = i < 3 ? 'pine' : i < 5 ? 'oak' : i < 7 ? 'birch' : 'pine';
      const g = makeTree(1100 + i * 37, { kind });
      const geo = flattenGroup(g);
      if (geo) treeVariants.push({ geo, pine: kind === 'pine', dead: false });
    }
    const deadGeo = flattenGroup(makeTree(999, { kind: 'dead' }));
    if (deadGeo) treeVariants.push({ geo: deadGeo, pine: false, dead: true });
    const broadleaf = treeVariants.filter((v) => !v.dead && !v.pine);
    const conifers = treeVariants.filter((v) => !v.dead && v.pine);

    const rockVariants = [];
    for (let i = 0; i < 7; i++) {
      const geo = flattenGroup(makeRock(2000 + i, 1));
      if (geo) rockVariants.push(geo);
    }
    const bushVariants = [];
    for (let i = 0; i < 5; i++) {
      const geo = flattenGroup(makeBush(3000 + i));
      if (geo) bushVariants.push(geo);
    }
    const cactusVariants = [];
    for (let i = 0; i < 3; i++) {
      const geo = flattenGroup(makeCactus(5100 + i * 17));
      if (geo) cactusVariants.push(geo);
    }
    const acaciaVariants = [];
    for (let i = 0; i < 3; i++) {
      const geo = flattenGroup(makeAcacia(5200 + i * 23));
      if (geo) acaciaVariants.push(geo);
    }
    const deadBushVariants = [];
    for (let i = 0; i < 3; i++) {
      const geo = flattenGroup(makeDeadBush(5300 + i * 11));
      if (geo) deadBushVariants.push(geo);
    }
    const iceSpireVariants = [];
    for (let i = 0; i < 3; i++) {
      const geo = flattenGroup(makeIceSpire(5400 + i * 13, 1));
      if (geo) iceSpireVariants.push(geo);
    }
    const snowRockVariants = [];
    for (let i = 0; i < 3; i++) {
      const geo = flattenGroup(makeSnowRock(5500 + i * 19, 1));
      if (geo) snowRockVariants.push(geo);
    }
    const fernVariants = [];
    for (let i = 0; i < 3; i++) {
      const geo = flattenGroup(makeFern(3500 + i));
      if (geo) fernVariants.push(geo);
    }
    const reedVariants = [];
    for (let i = 0; i < 3; i++) {
      const geo = flattenGroup(makeReed(4000 + i));
      if (geo) reedVariants.push(geo);
    }

    // ---- lasy -------------------------------------------------------------
    let trees = 0;
    const targetTrees = 7000;
    for (let attempt = 0; attempt < targetTrees * 6 && trees < targetTrees; attempt++) {
      const a = rng.float(0, Math.PI * 2);
      const r = 90 + Math.pow(rng.next(), 0.6) * (landR - 90);
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      if (isWater(x, z) || distanceToPath(x, z) < 9) continue;
      if (isBlocked(x, z)) continue;
      if (slopeAt(x, z) > 1.6) continue;
      const h = heightAt(x, z);
      if (h > 182) continue; // powyżej granicy lasu
      const forest = forestMask(x, z);
      const nearSwamp = dist2(x, z, LOCATIONS.swamp.x, LOCATIONS.swamp.z) < 210 * S;
      const biome = dominantBiome(x, z);
      // gęstość roślinności zależy od biomu: pustynia prawie pusta, tundra rzadka
      const density = biome === 'desert' ? 0.14 : biome === 'ice' ? 0.35 : biome === 'savanna' ? 0.5 : 1;
      if (forest < 0.3 && !nearSwamp && rng.next() > 0.055 * density) continue;

      let variant;
      if (biome === 'desert') {
        variant = rng.chance(0.58) ? pick(cactusVariants) : rng.chance(0.5) ? pick(acaciaVariants) : pick(deadBushVariants);
      } else if (biome === 'savanna') {
        variant = rng.chance(0.62) ? pick(acaciaVariants) : rng.chance(0.5) ? pick(deadBushVariants) : pick(broadleaf);
      } else if (biome === 'ice') {
        variant = rng.chance(0.55) ? pick(conifers) : rng.chance(0.5) ? pick(deadBushVariants) : (treeVariants.find((v) => v.dead) ?? pick(conifers));
      } else {
        // sosny wyżej i na suchym gruncie, liściaste w dolinach
        const deadVariant = treeVariants.find((v) => v.dead);
        const usePine = h > 95 || (h > 55 && rng.chance(0.45));
        variant = nearSwamp
          ? (rng.chance(0.7) && deadVariant ? deadVariant : pick(broadleaf))
          : (usePine ? pick(conifers) : pick(broadleaf));
      }
      if (!variant || !variant.geo) continue;
      const scale = biome === 'desert' ? rng.float(0.8, 1.5) : rng.float(1.0, 1.95);
      // ponad połowę drzew stawiamy z prawdziwych modeli (sosny/dęby z paczki CC0)
      if (scatter && biome !== 'desert' && rng.chance(0.62)) {
        // wybór gatunku: bagno → uschłe, wysokie zbocze → jesienne iglaki
        const key = nearSwamp && rng.chance(0.55)
          ? pick(deadTreeKeys)
          : (h > 120 && rng.chance(0.4) ? pick(autumnTreeKeys) : pick(treeKeys));
        const model = lib.nature[key];
        // drzewa iglaste skalujemy po wysokości, szerokie korony po rozpiętości
        const scl = key === 'trees_cluster'
          ? rng.float(9, 14) / (model?.width || 1)
          : rng.float(7.5, 12.5) / (model?.height || 1);
        if (model && scatter.add(key, lib, {
          x, y: h, z,
          rotY: rng.float(0, Math.PI * 2),
          scale: scl,
          tilt: rng.float(-0.06, 0.06),
          color: new THREE.Color().setScalar(0.82 + rng.float(0, 0.3)),
        })) {
          if (rng.chance(0.4)) this.colliders.push({ x, z, r: 0.55 });
          trees += 1;
          continue;
        }
      }
      if (scatter && nearSwamp && rng.chance(0.5)) {
        const key = pick(deadTreeKeys);
        const model = lib.nature[key];
        if (model && scatter.add(key, lib, {
          x, y: h, z,
          rotY: rng.float(0, Math.PI * 2),
          scale: rng.float(6.5, 11) / (model.height || 1),
          tilt: rng.float(-0.1, 0.1),
          color: new THREE.Color().setScalar(0.75 + rng.float(0, 0.25)),
        })) {
          trees += 1;
          continue;
        }
      }
      this.batcher.addGeometry(variant.geo, x, h, z, rng.float(0, Math.PI * 2), scale);
      if (scale > 1.3 && biome !== 'desert') this.colliders.push({ x, z, r: 0.5 * scale });
      trees += 1;

      // podszycie: młode drzewka z paczki CC0 gęsto przy większych drzewach
      if (scatter && biome !== 'desert' && rng.chance(0.22)) {
        const key = pick(undergrowthKeys);
        const model = lib.nature[key];
        if (model) {
          const ux = x + rng.float(-3.5, 3.5);
          const uz = z + rng.float(-3.5, 3.5);
          if (!isBlocked(ux, uz) && !isWater(ux, uz)) {
            scatter.add(key, lib, {
              x: ux, y: heightAt(ux, uz), z: uz,
              rotY: rng.float(0, Math.PI * 2),
              scale: rng.float(2.4, 4.6) / model.height,
              tilt: rng.float(-0.05, 0.05),
              color: new THREE.Color().setScalar(0.8 + rng.float(0, 0.28)),
            });
          }
        }
      }
    }

    // ---- głazy i skalne żebra --------------------------------------------
    let rocks = 0;
    for (let attempt = 0; attempt < 11000 && rocks < 2000; attempt++) {
      const a = rng.float(0, Math.PI * 2);
      const r = 70 + Math.pow(rng.next(), 0.55) * (landR - 70);
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      if (isWater(x, z) || distanceToPath(x, z) < 8) continue;
      if (isBlocked(x, z)) continue;
      const h = heightAt(x, z);
      const steep = slopeAt(x, z);
      if (steep < 0.6 && h < 120 && rng.next() > 0.16) continue;
      const biome = dominantBiome(x, z);
      const rockSize = rng.float(0.8, 2.4);
      if (scatter && biome !== 'ice' && rockSize < 2.0 && rng.chance(0.55)) {
        const key = pick(rockKeys);
        const model = lib.nature[key];
        // skały z paczki są niskie i szerokie — skalujemy po szerokości (1,4–3,6 m)
        const width = model.width || model.height;
        if (model && scatter.add(key, lib, {
          x, y: h - 0.05, z,
          rotY: rng.float(0, 6.28),
          scale: (0.9 + rockSize * 0.9) / width,
          tilt: rng.float(-0.25, 0.25),
          color: new THREE.Color().setScalar(0.85 + rng.float(0, 0.3)),
        })) {
          if (rockSize > 1.6) this.colliders.push({ x, z, r: rockSize * 0.5 });
          rocks += 1;
          continue;
        }
      }
      const geo = biome === 'ice' ? pick(snowRockVariants) : pick(rockVariants);
      const scale = rockSize;
      this.batcher.addGeometry(geo, x, h, z, rng.float(0, 6.28), scale);
      if (scale > 1.6) this.colliders.push({ x, z, r: scale * 0.55 });
      rocks += 1;
    }

    let outcrops = 0;
    for (let attempt = 0; attempt < 2800 && outcrops < 340; attempt++) {
      const a = rng.float(0, Math.PI * 2);
      const r = 100 + Math.pow(rng.next(), 0.5) * (landR - 100);
      const cx = Math.cos(a) * r;
      const cz = Math.sin(a) * r;
      if (isWater(cx, cz) || distanceToPath(cx, cz) < 12) continue;
      if (isBlocked(cx, cz, 8)) continue;
      const ch = heightAt(cx, cz);
      const steep = slopeAt(cx, cz);
      if (steep < 0.45 && ch < 110) continue;
      const biome = dominantBiome(cx, cz);
      if (biome === 'ice') {
        // lodowe granie zamiast głazów
        const spikes = 2 + Math.floor(rng.next() * 3);
        for (let i = 0; i < spikes; i++) {
          const geo = pick(iceSpireVariants);
          const ox = cx + rng.float(-4, 4);
          const oz = cz + rng.float(-4, 4);
          const scale = rng.float(0.8, 2.0);
          this.batcher.addGeometry(geo, ox, heightAt(ox, oz) - 0.2, oz, rng.float(0, 6.28), scale);
          if (scale > 1.4) this.colliders.push({ x: ox, z: oz, r: scale * 0.5 });
        }
        outcrops += 1;
        continue;
      }
      const piles = 3 + Math.floor(rng.next() * 5);
      for (let i = 0; i < piles; i++) {
        const spread = 1.5 + rng.float(0, 5.5);
        const ox = cx + rng.float(-spread, spread);
        const oz = cz + rng.float(-spread, spread);
        if (isWater(ox, oz)) continue;
        const geo = pick(rockVariants);
        const scale = rng.float(0.7, 2.9) * (i === 0 ? 1.35 : 1);
        this.batcher.addGeometry(geo, ox, heightAt(ox, oz) - 0.15, oz, rng.float(0, 6.28), scale);
        if (scale > 1.5) this.colliders.push({ x: ox, z: oz, r: scale * 0.6 });
      }
      outcrops += 1;
    }

    // ---- uschłe drzewa na wysokościach ------------------------------------
    let deadTrees = 0;
    for (let attempt = 0; attempt < 2200 && deadTrees < 260; attempt++) {
      const a = rng.float(0, Math.PI * 2);
      const r = 150 + Math.pow(rng.next(), 0.5) * (landR - 150);
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      if (isWater(x, z) || distanceToPath(x, z) < 9) continue;
      if (isBlocked(x, z)) continue;
      const h = heightAt(x, z);
      if (h < 130) continue;
      const dead = treeVariants.find((v) => v.dead);
      if (!dead) break;
      const scale = rng.float(0.9, 1.7);
      this.batcher.addGeometry(dead.geo, x, h, z, rng.float(0, 6.28), scale);
      if (scale > 1.25) this.colliders.push({ x, z, r: 0.35 * scale });
      deadTrees += 1;
    }

    // ---- krzewy, paprocie, trzciny ---------------------------------------
    let bushes = 0;
    for (let attempt = 0; attempt < 8000 && bushes < 2200; attempt++) {
      const a = rng.float(0, Math.PI * 2);
      const r = 70 + Math.pow(rng.next(), 0.55) * (landR - 70);
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      if (isWater(x, z) || distanceToPath(x, z) < 6) continue;
      if (isBlocked(x, z, -12)) continue;
      if (slopeAt(x, z) > 1.2) continue;
      const geo = pick(bushVariants);
      this.batcher.addGeometry(geo, x, heightAt(x, z), z, rng.float(0, 6.28), rng.float(0.8, 1.8));
      bushes += 1;
    }

    let ferns = 0;
    for (let attempt = 0; attempt < 6000 && ferns < 1600; attempt++) {
      const a = rng.float(0, Math.PI * 2);
      const r = 90 + Math.pow(rng.next(), 0.55) * (landR - 90);
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      if (isWater(x, z) || distanceToPath(x, z) < 5) continue;
      if (isBlocked(x, z, -10)) continue;
      if (forestMask(x, z) < 0.45) continue;
      if (slopeAt(x, z) > 1.3) continue;
      const geo = pick(fernVariants);
      this.batcher.addGeometry(geo, x, heightAt(x, z), z, rng.float(0, 6.28), rng.float(0.7, 1.5));
      ferns += 1;
    }

    // trzciny: pas przybrzeżny morza, jeziora i bagna
    let reeds = 0;
    for (let attempt = 0; attempt < 8000 && reeds < 1300; attempt++) {
      const a = rng.float(0, Math.PI * 2);
      const r = 200 + Math.pow(rng.next(), 0.5) * (landR - 200);
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      const h = heightAt(x, z);
      if (h > WATER_LEVEL + 1.9 || h < WATER_LEVEL - 1.4) continue;
      if (isBlocked(x, z, -20)) continue;
      const geo = pick(reedVariants);
      this.batcher.addGeometry(geo, x, h, z, rng.float(0, 6.28), rng.float(0.8, 1.6));
      reeds += 1;
    }

    this._scatterWaterPlants(scatter, lib);
    this._scatterGrass();
    this._buildFireflies();
    this._buildGulls();
    if (scatter) {
      this.instancedModels = scatter.finalize(lib);
      console.log(`Modele CC0: ${this.instancedModels} siatek instancjonowanych (${lib.loaded} plików)`);
    }
  }

  /**
   * Stawia model z paczki CC0 (beczka, skrzynia, pochodnia...). Jeśli modelu nie
   * ma, używa proceduralnego odpowiednika — gra wygląda dobrze w obu przypadkach.
   */
  /** Grążel i wodne rośliny z paczki CC0 — tylko na płytkiej wodzie jeziora. */
  _scatterWaterPlants(scatter, lib) {
    if (!scatter || !lib?.nature) return;
    const rng = new RNG(90210);
    const pick = (arr) => arr[Math.floor(rng.next() * arr.length)];
    const L = LOCATIONS.lake;
    const keys = ['lily', 'waterplant'];
    let placed = 0;
    for (let i = 0; i < 900 && placed < 240; i++) {
      const a = rng.float(0, Math.PI * 2);
      const r = 40 + Math.sqrt(rng.next()) * 240;
      const x = L.x + Math.cos(a) * r;
      const z = L.z + Math.sin(a) * r;
      const h = heightAt(x, z);
      if (h > WATER_LEVEL - 0.25 || h < WATER_LEVEL - 2.6) continue;
      const key = pick(keys);
      const model = lib.nature[key];
      if (!model) continue;
      if (scatter.add(key, lib, {
        x, y: WATER_LEVEL - 0.12, z,
        rotY: rng.float(0, Math.PI * 2),
        scale: rng.float(1.1, 2.2) / (model.width || model.height || 1),
        color: new THREE.Color().setScalar(0.85 + rng.float(0, 0.25)),
      })) placed += 1;
    }
  }

  /** Skrzynia: prawdziwy model CC0, a gdy go brak — proceduralna. */
  _chestModel() {
    const lib = this.game.assets;
    if (lib?.ready && lib.props.chest) {
      const obj = placeProp(lib, 'chest', { x: 0, y: 0, z: 0, rotY: 0, targetHeight: 0.95 });
      if (obj) return obj;
    }
    return makeChest();
  }

  addAssetProp(key, x, z, rotY = 0, { targetHeight = null, yOffset = 0, collide = 0 } = {}) {
    const lib = this.game.assets;
    if (!lib?.ready) return null;
    const obj = placeProp(lib, key, {
      x, y: heightAt(x, z) + yOffset, z, rotY, targetHeight,
    });
    if (!obj) return null;
    obj.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
    this.group.add(obj);
    if (collide) this.colliders.push({ x, z, r: collide });
    return obj;
  }

  /** Mewy krążące nad wybrzeżem — ożywiają horyzont. */
  _buildGulls() {
    const rng = new RNG(555);
    this.gulls = [];
    const gullsGroup = new THREE.Group();
    gullsGroup.name = 'gulls';
    for (let i = 0; i < 26; i++) {
      const a = rng.float(0, Math.PI * 2);
      const r = COAST_RADIUS * rng.float(0.72, 1.02);
      const cx = Math.cos(a) * r;
      const cz = Math.sin(a) * r;
      const g = makeGull();
      g.position.set(cx, WATER_LEVEL + rng.float(16, 46), cz);
      g.scale.setScalar(rng.float(0.8, 1.3));
      gullsGroup.add(g);
      this.gulls.push({
        mesh: g,
        cx, cz,
        radius: rng.float(24, 80),
        speed: rng.float(0.12, 0.3) * (rng.chance(0.5) ? 1 : -1),
        phase: rng.float(0, Math.PI * 2),
        y: g.position.y,
      });
    }
    this.group.add(gullsGroup);
  }

  _updateGulls(dt) {
    if (!this.gulls) return;
    this.gullTime = (this.gullTime ?? 0) + dt;
    const t = this.gullTime;
    for (const g of this.gulls) {
      const a = g.phase + t * g.speed;
      const x = g.cx + Math.cos(a) * g.radius;
      const z = g.cz + Math.sin(a) * g.radius;
      g.mesh.position.set(x, g.y + Math.sin(t * 0.7 + g.phase) * 2.4, z);
      g.mesh.rotation.y = -a + (g.speed > 0 ? Math.PI : 0);
      g.mesh.rotation.z = Math.sin(t * 1.6 + g.phase) * 0.22;
    }
  }

  /** Świetliki nad łąkami i skrajem lasu — widoczne tylko nocą. */
  _buildFireflies() {
    const rng = new RNG(77123);
    const positions = [];
    const phases = [];
    for (let i = 0; i < 1100; i++) {
      const a = rng.float(0, Math.PI * 2);
      const r = 60 + Math.pow(rng.next(), 0.7) * (LAND_RADIUS - 60);
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      const h = heightAt(x, z);
      if (h < WATER_LEVEL + 1) continue;
      if (heightAt(x, z) > 150) continue;
      positions.push(x, h + 0.6 + rng.float(0, 1.6), z);
      phases.push(rng.float(0, Math.PI * 2));
    }
    if (positions.length === 0) return;

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color: '#ffe4a3',
      size: 0.26,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(geo, mat);
    points.name = 'fireflies';
    points.frustumCulled = false;
    (this.group ?? this.scene).add(points);
    this.fireflies = { points, mat, geo, base: Float32Array.from(geo.attributes.position.array), phases, t: 0 };
  }

  _updateFireflies(dt, nightF) {
    const ff = this.fireflies;
    if (!ff) return;
    ff.t += dt;
    // w dzień gasną, nocą rozbłyskują
    const target = Math.max(0, Math.min(1, (nightF - 0.25) / 0.5)) * 0.95;
    ff.mat.opacity += (target - ff.mat.opacity) * Math.min(1, dt * 2.5);
    if (ff.mat.opacity < 0.01) return;
    const arr = ff.geo.attributes.position.array;
    const t = ff.t;
    for (let i = 0; i < arr.length / 3; i++) {
      const ph = ff.phases[i];
      arr[i * 3] = ff.base[i * 3] + Math.sin(t * 0.6 + ph) * 1.4;
      arr[i * 3 + 1] = ff.base[i * 3 + 1] + Math.sin(t * 1.1 + ph * 1.7) * 0.45;
      arr[i * 3 + 2] = ff.base[i * 3 + 2] + Math.cos(t * 0.5 + ph * 1.3) * 1.4;
    }
    ff.geo.attributes.position.needsUpdate = true;
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
        const r = rng.float(10 * WORLD_SCALE, 105 * WORLD_SCALE);
        const x = spot.x + Math.cos(a) * r;
        const z = spot.z + Math.sin(a) * r;
        if (Math.abs(x) > WORLD_RADIUS - 10 || Math.abs(z) > WORLD_RADIUS - 10) continue;
        if (isWater(x, z) || distanceToPath(x, z) < 8) continue;
        if (slopeAt(x, z) > 1.2) continue;
        if (dominantBiome(x, z) === 'desert' && rng.next() > 0.25) continue;
        dummy.position.set(x, heightAt(x, z) - 0.04, z);
        dummy.rotation.set(0, rng.float(0, 6.28), 0);
        dummy.scale.setScalar(rng.float(0.8, 1.7));
        dummy.updateMatrix();
        inst.setMatrixAt(placed, dummy.matrix);
        const biome = dominantBiome(x, z);
        if (biome === 'desert') {
          color.setHSL(0.12 + rng.float(-0.02, 0.02), rng.float(0.25, 0.4), rng.float(0.38, 0.5));
        } else if (biome === 'savanna') {
          color.setHSL(0.14 + rng.float(-0.02, 0.03), rng.float(0.3, 0.45), rng.float(0.34, 0.45));
        } else if (biome === 'ice') {
          color.setHSL(0.28 + rng.float(-0.03, 0.03), rng.float(0.08, 0.2), rng.float(0.55, 0.72));
        } else {
          color.setHSL(0.22 + rng.float(-0.03, 0.05), rng.float(0.3, 0.52), rng.float(0.28, 0.42));
        }
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
