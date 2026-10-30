import * as THREE from 'three';
import { clamp, damp, dampAngle, dist2, TAU } from '../core/utils.js';
import { heightAt, LOCATIONS } from '../world/terrain.js';
import { makeHumanoid, makeSword, makeSkeleton, makeWolf } from '../world/models.js';
import { ENEMY_TYPES, SPAWNS } from '../data/enemies.js';

const VILLAGE_SAFE = { x: LOCATIONS.village.x, z: LOCATIONS.village.z, r: 21 };

function buildKaldras() {
  const built = makeHumanoid({
    skin: '#8d949e',
    tunic: '#2e333c',
    pants: '#23272e',
    boots: '#1b1e23',
    hair: '#15171a',
    cloak: '#37182a',
    bulk: 1.7,
    armor: '#4a515c',
    eyeColor: '#ff5b3a',
  });
  const g = built.group;
  const parts = built.parts;

  // rogaty hełm
  const hornMat = new THREE.MeshStandardMaterial({ color: '#20232a', roughness: 0.6, metalness: 0.5, flatShading: true });
  for (const sx of [-1, 1]) {
    const horn = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.62, 5), hornMat);
    horn.position.set(sx * 0.2, 0.29, -0.03);
    horn.rotation.z = sx * 0.55;
    horn.rotation.x = -0.2;
    horn.castShadow = true;
    parts.head.add(horn);
  }
  const crown = new THREE.Mesh(new THREE.TorusGeometry(0.235, 0.035, 5, 10), hornMat);
  crown.rotation.x = Math.PI / 2;
  crown.position.y = 0.06;
  parts.head.add(crown);

  const blade = makeSword({ blade: '#6e7681', guard: '#2b2f36', grip: '#1e2126', glow: '#ff5b3a' });
  blade.scale.setScalar(1.85);
  blade.position.set(0, -0.72, 0.1);
  blade.rotation.set(-0.3, 0, 0.1);
  parts.arms[1].add(blade);

  const aura = new THREE.PointLight('#ff5b3a', 4.5, 9, 2);
  aura.position.y = 1.6;
  g.add(aura);
  g.userData.aura = aura;

  return { group: g, parts };
}

function buildWraith() {
  const g = new THREE.Group();
  const body = new THREE.Group();
  g.add(body);

  const robeMat = new THREE.MeshStandardMaterial({
    color: '#3a4a58', roughness: 0.9, transparent: true, opacity: 0.82,
    emissive: '#284a5c', emissiveIntensity: 0.4, side: THREE.DoubleSide, flatShading: true,
  });
  const robe = new THREE.Mesh(new THREE.ConeGeometry(0.62, 1.9, 8, 1, true), robeMat);
  robe.position.y = 1.0;
  robe.castShadow = true;
  body.add(robe);

  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.42, 0.7, 7), robeMat);
  torso.position.y = 1.65;
  body.add(torso);

  const hood = new THREE.Mesh(new THREE.ConeGeometry(0.36, 0.62, 7), robeMat);
  hood.position.y = 2.16;
  body.add(hood);

  const face = new THREE.Mesh(
    new THREE.SphereGeometry(0.19, 8, 6),
    new THREE.MeshStandardMaterial({ color: '#cfe8ef', emissive: '#6ec8e0', emissiveIntensity: 0.8, roughness: 0.5 })
  );
  face.position.set(0, 2.05, 0.08);
  body.add(face);

  const eyeMat = new THREE.MeshBasicMaterial({ color: '#bfefff' });
  for (const sx of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.035, 5, 4), eyeMat);
    eye.position.set(sx * 0.07, 2.07, 0.24);
    body.add(eye);
  }

  const arms = [];
  for (const sx of [-1, 1]) {
    const pivot = new THREE.Group();
    pivot.position.set(sx * 0.42, 1.85, 0);
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.05, 1.0, 5), robeMat);
    arm.position.y = -0.4;
    pivot.add(arm);
    const hand = new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 6, 5),
      new THREE.MeshBasicMaterial({ color: '#bfefff', transparent: true, opacity: 0.9 })
    );
    hand.position.y = -0.95;
    pivot.add(hand);
    body.add(pivot);
    arms.push(pivot);
  }

  const skirt = new THREE.Mesh(new THREE.ConeGeometry(0.55, 0.9, 8, 1, true),
    new THREE.MeshStandardMaterial({ color: '#2f3f4c', transparent: true, opacity: 0.55, side: THREE.DoubleSide, emissive: '#1f3d4c', emissiveIntensity: 0.6 }));
  skirt.position.y = 0.35;
  body.add(skirt);

  const light = new THREE.PointLight('#6ec8e0', 3.2, 9, 2);
  light.position.y = 1.9;
  g.add(light);

  return {
    group: g,
    parts: { body, head: body, arms, legs: [], wraith: true, skirt },
  };
}

export function buildEnemyModel(typeId) {
  const def = ENEMY_TYPES[typeId];
  if (def.model === 'wolf') {
    const w = makeWolf(11);
    return { group: w.group, parts: { ...w.parts, beast: true } };
  }
  if (def.model === 'skeleton') {
    const s = makeSkeleton();
    const sword = makeSword({ blade: '#b9b29d', guard: '#6b6250', grip: '#3a332a' });
    sword.scale.setScalar(0.85);
    sword.position.set(0, -0.75, 0.05);
    sword.rotation.x = -0.3;
    s.parts.arms[1].add(sword);
    return { group: s.group, parts: s.parts };
  }
  if (def.model === 'wraith') return buildWraith();
  if (def.model === 'kaldras') return buildKaldras();

  const built = makeHumanoid(def.visual);
  const weaponDef = def.weapon === 'axe'
    ? makeSword({ blade: '#b9c2c9', guard: '#6a5a3a', grip: '#3a2a1c' })
    : makeSword({ blade: '#c9d2d9', guard: '#8a7440', grip: '#3a2a1c' });
  weaponDef.scale.setScalar(def.weapon === 'axe' ? 1.15 : 1);
  weaponDef.position.set(0, -0.74, 0.05);
  weaponDef.rotation.x = -0.3;
  if (def.weapon !== 'bow') built.parts.arms[1].add(weaponDef);

  if (def.weapon === 'bow') {
    const bow = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.03, 4, 12, Math.PI * 1.2), new THREE.MeshStandardMaterial({ color: '#6a4a2a', roughness: 0.9 }));
    bow.position.set(0, -0.7, 0.1);
    bow.rotation.set(0, Math.PI / 2, Math.PI / 2);
    built.parts.arms[0].add(bow);
  }
  return built;
}

export class Enemy {
  constructor(manager, spawn) {
    this.manager = manager;
    this.game = manager.game;
    this.spawn = spawn;
    const base = ENEMY_TYPES[spawn.type];
    this.type = spawn.type;
    this.def = base;

    const lvlDelta = Math.max(0, spawn.level - base.level);
    const scale = 1 + lvlDelta * 0.16;
    this.level = spawn.level;
    this.maxHP = Math.round(base.hp * scale);
    this.hp = this.maxHP;
    this.damage = base.damage * (1 + lvlDelta * 0.13);
    this.name = base.name + (lvlDelta > 0 ? ` (poz. ${spawn.level})` : '');
    this.elite = !!base.elite;
    this.boss = !!base.boss;

    this.pos = new THREE.Vector3(spawn.x, heightAt(spawn.x, spawn.z), spawn.z);
    this.home = this.pos.clone();
    this.vel = new THREE.Vector3();
    this.yaw = Math.random() * TAU;
    this.state = 'idle';
    this.stateTime = 0;
    this.attackTimer = 0;
    this.attackWindup = 0;
    this.windupActive = false;
    this.dead = false;
    this.active = true;
    this.deathTime = 0;
    this.aggro = false;
    this.wanderTarget = null;
    this.wanderTimer = Math.random() * 3;
    this.staggerTime = 0;
    this.hitFlash = 0;
    this.phase = 1;
    this.specialTimer = 4 + Math.random() * 3;
    this.alerted = false;
    this.nameplateEl = null;

    const built = buildEnemyModel(spawn.type);
    this.model = built.group;
    this.parts = built.parts;
    this.baseY = 0;
    this.model.position.copy(this.pos);
    this.model.rotation.y = this.yaw;
    this.model.traverse((o) => {
      if (o.isMesh) o.castShadow = true;
    });

    if (base.model === 'wraith') {
      this.model.scale.setScalar(1.02);
      this.floatBase = 0.35;
    }
    if (base.boss) {
      this.model.scale.setScalar(1.32);
    }
    this.game.scene.add(this.model);

    // aura / poświata bossów
    if (base.boss || base.model === 'wraith') {
      this.glow = new THREE.PointLight(base.boss ? '#ff5b3a' : '#6ec8e0', 2.6, 8, 2);
      this.glow.position.y = 2;
      this.model.add(this.glow);
    }
  }

  get radius() {
    return this.def.radius ?? 0.5;
  }

  get isNightOnly() {
    return !!this.def.nightOnly;
  }

  takeDamage(amount, { crit = false, source = 'Gracz', knockback = 2, magic = false } = {}) {
    if (this.dead) return 0;
    const dmg = Math.max(1, Math.round(amount));
    this.hp -= dmg;
    this.hitFlash = 0.16;
    this.aggro = true;
    this.stateTime = 0;

    const uiPos = new THREE.Vector3(this.pos.x, this.pos.y + (this.def.model === 'wolf' ? 1.3 : 2.1), this.pos.z);
    this.game.ui?.floatNumber(uiPos, `${dmg}${crit ? '!' : ''}`, crit ? 'crit' : magic ? 'mana' : '');
    this.game.audio?.enemyHit();

    if (knockback > 0) {
      const dir = new THREE.Vector3(this.pos.x - this.game.player.pos.x, 0, this.pos.z - this.game.player.pos.z).normalize();
      this.pos.x += dir.x * knockback * 0.08;
      this.pos.z += dir.z * knockback * 0.08;
      if (!this.boss && !this.elite) {
        this.staggerTime = Math.min(0.4, knockback * 0.05);
        this.vel.x += dir.x * knockback * 0.6;
        this.vel.z += dir.z * knockback * 0.6;
      }
    }

    this.game.combatAlert(this);

    if (this.hp <= 0) {
      this.die();
    }
    return dmg;
  }

  die() {
    if (this.dead) return;
    this.dead = true;
    this.hp = 0;
    this.state = 'dead';
    this.deathTime = 0;
    this.aggro = false;
    this.game.onEnemyKilled(this);

    const fxPos = new THREE.Vector3(this.pos.x, this.pos.y + 1, this.pos.z);
    this.game.fx.burst(fxPos, {
      color: this.def.model === 'skeleton' ? '#d8cfb6' : this.def.model === 'wraith' ? '#8fe0ff' : '#c1443a',
      count: this.boss ? 40 : 16,
      speed: this.boss ? 8 : 4,
      up: 3,
      life: 0.9,
      size: this.boss ? 1.4 : 1,
    });
    if (this.boss) this.game.cameraRig.addShake(1.0);
    else this.game.cameraRig.addShake(0.14);
  }

  respawn() {
    this.hp = this.maxHP;
    this.dead = false;
    this.active = true;
    this.state = 'idle';
    this.aggro = false;
    this.deathTime = 0;
    this.phase = 1;
    this.pos.copy(this.home);
    this.model.position.copy(this.pos);
    this.model.visible = true;
    this.model.rotation.set(0, this.yaw, 0);
    this.model.scale.setScalar(this.def.boss ? 1.32 : this.def.model === 'wraith' ? 1.02 : 1);
    this.model.traverse((o) => {
      if (o.isMesh && o.material) {
        o.material.transparent = o.material.transparent || false;
      }
    });
  }

  _canSeePlayer() {
    const p = this.game.player;
    if (!p || p.dead) return false;
    const d = dist2(this.pos.x, this.pos.z, p.pos.x, p.pos.z);
    return d < this.def.aggro;
  }

  _playerInVillage() {
    const p = this.game.player;
    return dist2(p.pos.x, p.pos.z, VILLAGE_SAFE.x, VILLAGE_SAFE.z) < VILLAGE_SAFE.r;
  }

  update(dt) {
    if (!this.active) return;
    this.stateTime += dt;

    if (this.dead) {
      this.deathTime += dt;
      this.model.rotation.x = damp(this.model.rotation.x, -Math.PI / 2.1, 4, dt);
      this.model.position.y = damp(this.model.position.y, heightAt(this.pos.x, this.pos.z) + 0.1, 5, dt);
      if (this.def.model === 'wraith') {
        this.model.position.y += dt * 0.6;
        this.model.traverse((o) => {
          if (o.isMesh && o.material?.transparent) o.material.opacity = Math.max(0, 0.8 - this.deathTime);
        });
      }
      if (this.deathTime > 1.6) {
        this.active = false;
        this.model.visible = false;
      }
      return;
    }

    this.attackTimer = Math.max(0, this.attackTimer - dt);
    this.staggerTime = Math.max(0, this.staggerTime - dt);
    this.hitFlash = Math.max(0, this.hitFlash - dt);

    const p = this.game.player;
    const playerDist = dist2(this.pos.x, this.pos.z, p.pos.x, p.pos.z);
    const night = this.game.dayNight.isNight;

    // nocne potwory znikają o świcie
    if (this.isNightOnly && !night) {
      this.hp = 0;
      this.dead = true;
      this.active = false;
      this.model.visible = false;
      this.game.onNightCreatureFade(this);
      return;
    }
    if (this.isNightOnly && !this.active && night) {
      this.active = true;
      this.model.visible = true;
      this.hp = this.maxHP;
      this.dead = false;
      this.pos.copy(this.home);
    }

    const leash = this.boss ? 34 : 30;
    const awayFromHome = dist2(this.pos.x, this.pos.z, this.home.x, this.home.z);

    if (!this.aggro) {
      if (this._canSeePlayer() && !p.dead) {
        if (!(this._playerInVillage() && this.type !== 'wolf')) {
          this.aggro = true;
          this.state = 'chase';
          this.game.onEnemyAggro(this);
        }
      }
    }

    if (this.aggro && (awayFromHome > leash || p.dead || (this._playerInVillage() && this.type !== 'wolf' && this.boss === false))) {
      this.aggro = false;
      this.state = 'return';
    }

    if (this.boss) {
      this._updateBoss(dt, playerDist);
    } else if (this.aggro) {
      this._chase(dt, playerDist);
    } else {
      this._idle(dt);
    }

    // ruch
    this.pos.x += this.vel.x * dt;
    this.pos.z += this.vel.z * dt;
    this.vel.x = damp(this.vel.x, 0, this.state === 'chase' ? 3.2 : 6, dt);
    this.vel.z = damp(this.vel.z, 0, this.state === 'chase' ? 3.2 : 6, dt);

    // separacja od innych wrogów
    const others = this.manager.list;
    for (const o of others) {
      if (o === this || o.dead || !o.active) continue;
      const dx = this.pos.x - o.pos.x;
      const dz = this.pos.z - o.pos.z;
      const d = Math.hypot(dx, dz);
      const min = this.radius + o.radius + 0.15;
      if (d > 0.001 && d < min) {
        const push = ((min - d) / d) * 0.5;
        this.pos.x += dx * push;
        this.pos.z += dz * push;
      }
    }

    const ground = heightAt(this.pos.x, this.pos.z);
    const targetY = ground + (this.def.model === 'wraith' ? 0.55 + Math.sin(this.stateTime * 1.7) * 0.12 : 0);
    this.pos.y = damp(this.pos.y, targetY, 12, dt);

    this.model.position.copy(this.pos);
    this.model.rotation.y = this.yaw;
    if (!this.boss) this.model.rotation.x = damp(this.model.rotation.x, 0, 5, dt);

    this._animate(dt, playerDist);
  }

  _idle(dt) {
    this.wanderTimer -= dt;
    if (this.wanderTimer <= 0) {
      this.wanderTimer = 3 + Math.random() * 5;
      const a = Math.random() * TAU;
      const r = Math.random() * 6;
      this.wanderTarget = new THREE.Vector3(this.home.x + Math.cos(a) * r, 0, this.home.z + Math.sin(a) * r);
    }
    if (this.wanderTarget) {
      const dx = this.wanderTarget.x - this.pos.x;
      const dz = this.wanderTarget.z - this.pos.z;
      const d = Math.hypot(dx, dz);
      if (d > 0.6) {
        const sp = this.def.speed * 0.28;
        this.vel.x = (dx / d) * sp;
        this.vel.z = (dz / d) * sp;
        this.yaw = dampAngle(this.yaw, Math.atan2(dx, dz), 5, dt);
      } else {
        this.wanderTarget = null;
      }
    }
    this.state = 'idle';
  }

  _chase(dt, dist) {
    const p = this.game.player;
    const dx = p.pos.x - this.pos.x;
    const dz = p.pos.z - this.pos.z;
    const d = Math.max(0.001, Math.hypot(dx, dz));
    this.state = 'chase';

    const ranged = this.def.behavior === 'ranged';
    const desired = ranged ? (this.def.preferredRange ?? 9) : this.def.attackRange * 0.82;

    if (this.staggerTime <= 0) {
      if (d > desired) {
        const sp = this.def.speed * (this.state === 'attack' ? 0.5 : 1);
        this.vel.x = (dx / d) * sp;
        this.vel.z = (dz / d) * sp;
        this.yaw = dampAngle(this.yaw, Math.atan2(dx, dz), 8, dt);
      } else if (ranged && d < desired * 0.62) {
        this.vel.x = (-dx / d) * this.def.speed * 0.6;
        this.vel.z = (-dz / d) * this.def.speed * 0.6;
        this.yaw = dampAngle(this.yaw, Math.atan2(dx, dz), 8, dt);
      } else {
        this.yaw = dampAngle(this.yaw, Math.atan2(dx, dz), 10, dt);
      }
    }

    if (this.def.model === 'wolf' && this.specialTimer > 0) this.specialTimer -= dt;
    if (this.def.model === 'wolf' && this.specialTimer <= 0 && d > 3.5 && d < 10 && this.staggerTime <= 0) {
      this.specialTimer = 5.5;
      this.vel.x = (dx / d) * this.def.speed * 1.9;
      this.vel.z = (dz / d) * this.def.speed * 1.9;
      this.game.audio?.growl();
    }

    // atak
    if (this.attackTimer <= 0 && d <= this.def.attackRange && this.staggerTime <= 0) {
      this.attackTimer = this.def.attackCooldown;
      this.attackWindup = 0.32;
      this.windupActive = true;
      this.state = 'attack';
      this.stateTime = 0;
      this.pendingRanged = ranged;
    }
    if (this.windupActive) {
      this.attackWindup -= dt;
      if (this.attackWindup <= 0) {
        this.windupActive = false;
        this._executeAttack();
      }
    }
  }

  _executeAttack() {
    const p = this.game.player;
    const dist = dist2(this.pos.x, this.pos.z, p.pos.x, p.pos.z);
    if (this.pendingRanged) {
      const origin = new THREE.Vector3(this.pos.x, this.pos.y + 1.5, this.pos.z);
      const dir = new THREE.Vector3(p.pos.x - origin.x, p.pos.y + 1.0 - origin.y, p.pos.z - origin.z).normalize();
      if (this.def.model === 'wraith') {
        this.game.fx.orb(origin, dir, '#a88fe8', 13);
        this.game.audio?.cast();
      } else {
        this.game.fx.arrow(origin, dir, 30, 'enemy');
        this.game.audio?.bow();
      }
      this.manager.projectilesFromEnemy(this, origin, dir, this.damage);
      return;
    }
    if (dist <= this.def.attackRange + 0.7) {
      const crit = Math.random() < 0.1;
      const dmg = this.damage * (crit ? 1.5 : 1);
      p.takeDamage(dmg, this.name);
      this.game.audio?.enemySwing();
    }
  }

  _updateBoss(dt, playerDist) {
    const p = this.game.player;
    const dx = p.pos.x - this.pos.x;
    const dz = p.pos.z - this.pos.z;
    const d = Math.max(0.001, Math.hypot(dx, dz));

    // faza 2
    if (this.phase === 1 && this.hp < this.maxHP * 0.5) {
      this.phase = 2;
      this.game.ui?.log('„Kaldras: Dość tego teatru.”', 'bad');
      this.game.ui?.toast('Kaldras się przemienia', 'Faza druga — uważaj na ciosy obszarowe');
      this.game.cameraRig.addShake(0.8);
      this.game.fx.magicBurst(this.pos.clone().add(new THREE.Vector3(0, 1.4, 0)), '#ff5b3a');
      const base = ENEMY_TYPES.skeleton;
      for (let i = 0; i < 2; i++) {
        const a = Math.random() * TAU;
        this.manager.summon('skeleton', this.pos.x + Math.cos(a) * 3.5, this.pos.z + Math.sin(a) * 3.5, 4);
      }
      this.damage *= 1.12;
      this.def = { ...this.def, speed: this.def.speed * 1.1 };
    }

    this.specialTimer -= dt;
    this.state = this.state === 'attack' ? this.state : 'chase';

    if (this.specialTimer <= 0 && this.staggerTime <= 0) {
      this.specialTimer = this.phase === 2 ? 4.5 : 6.5;
      // cios obszarowy
      this.attackTimer = 1.0;
      this.windupActive = true;
      this.attackWindup = 0.85;
      this.pendingRanged = false;
      this.pendingSlam = true;
      this.game.ui?.log('Kaldras wznosi miecz — uciekaj!', 'warn');
      this.game.audio?.growl();
    }

    if (this.windupActive) {
      this.attackWindup -= dt;
      if (this.attackWindup <= 0) {
        this.windupActive = false;
        if (this.pendingSlam) {
          this.pendingSlam = false;
          this.game.fx.shockwave(this.pos, { color: '#ff7a4a', speed: 16, life: 0.6 });
          this.game.cameraRig.addShake(0.9);
          this.game.audio?.slam();
          if (playerDist < 6.5) {
            p.takeDamage(this.damage * 1.5, 'Kaldras');
            this.game.ui?.log('Cios Kaldrasa trafił!', 'bad');
          } else {
            this.game.ui?.log('Uskoczyłeś przed ciosem Kaldrasa.', 'good');
            p.gainXp?.(0);
          }
        }
      }
    } else if (d > 3.4 && this.staggerTime <= 0) {
      this.vel.x = (dx / d) * this.def.speed;
      this.vel.z = (dz / d) * this.def.speed;
      this.yaw = dampAngle(this.yaw, Math.atan2(dx, dz), 7, dt);
    }

    if (!this.windupActive && this.attackTimer <= 0 && d <= this.def.attackRange + 1.2 && this.staggerTime <= 0) {
      this.attackTimer = this.def.attackCooldown * (this.phase === 2 ? 0.8 : 1);
      this.attackWindup = 0.36;
      this.windupActive = true;
      this.pendingRanged = false;
    }
  }

  _animate(dt) {
    const { arms = [], legs = [], body, head } = this.parts;
    const moving = Math.hypot(this.vel.x, this.vel.z) > 0.4;
    const speedNorm = clamp(Math.hypot(this.vel.x, this.vel.z) / Math.max(1, this.def.speed), 0, 1.6);
    this.walkPhase = (this.walkPhase ?? 0) + dt * (3.5 + speedNorm * 7);

    if (this.def.model === 'wolf') {
      const sw = Math.sin(this.walkPhase * 1.4) * 0.7 * speedNorm;
      legs.forEach((l, i) => {
        l.pivot.rotation.x = i % 2 === 0 ? sw : -sw;
      });
      body.position.y = Math.abs(Math.sin(this.walkPhase * 1.4)) * 0.06;
      if (this.state === 'attack') {
        const t = clamp(this.stateTime / 0.4, 0, 1);
        body.rotation.x = -0.4 * Math.sin(t * Math.PI);
      } else {
        body.rotation.x = damp(body.rotation.x, 0, 6, dt);
      }
      if (this.parts.head) this.parts.head.rotation.x = Math.sin(this.walkPhase * 0.5) * 0.08;
      return;
    }

    if (this.def.model === 'wraith') {
      body.position.y = Math.sin(this.stateTime * 1.4) * 0.12;
      arms.forEach((a, i) => {
        a.rotation.x = -0.5 + Math.sin(this.stateTime * 1.7 + i) * 0.18;
        a.rotation.z = (i === 0 ? 1 : -1) * (0.25 + Math.sin(this.stateTime * 1.1) * 0.1);
      });
      if (this.state === 'attack') {
        const t = clamp(this.stateTime / 0.5, 0, 1);
        body.rotation.y = Math.sin(t * Math.PI) * 0.3;
        arms[0].rotation.x = -2.0 * Math.sin(t * Math.PI);
      }
      return;
    }

    const swing = Math.sin(this.walkPhase) * 0.8 * speedNorm;
    if (legs[0] && legs[1]) {
      legs[0].rotation.x = moving ? swing : damp(legs[0].rotation.x, 0, 8, dt);
      legs[1].rotation.x = moving ? -swing : damp(legs[1].rotation.x, 0, 8, dt);
    }
    if (moving) {
      arms[0].rotation.x = -swing * 0.5;
      arms[1].rotation.x = swing * 0.5;
      body.position.y = Math.abs(Math.sin(this.walkPhase)) * 0.04;
    }

    if (this.state === 'attack' || this.windupActive) {
      const total = this.pendingSlam ? 0.85 : 0.32;
      const t = clamp(1 - Math.max(0, this.attackWindup) / total, 0, 1);
      // uniesienie miecza, potem uderzenie
      const raise = Math.sin(t * Math.PI * 0.9);
      arms[1].rotation.x = -2.5 * raise;
      arms[1].rotation.z = -0.4 * raise;
      if (this.pendingSlam) {
        body.rotation.x = -0.2 * raise;
        arms[0].rotation.x = -1.6 * raise;
      }
      head.rotation.x = -0.2 * raise;
    } else {
      arms[1].rotation.x = damp(arms[1].rotation.x, moving ? swing * 0.5 : 0, 8, dt);
      arms[1].rotation.z = damp(arms[1].rotation.z, 0, 8, dt);
      arms[0].rotation.x = damp(arms[0].rotation.x, moving ? -swing * 0.5 : 0, 8, dt);
      body.rotation.x = damp(body.rotation.x, 0, 8, dt);
      head.rotation.x = damp(head.rotation.x, 0, 8, dt);
    }

    // błysk trafienia
    if (this.hitFlash > 0) {
      this.model.traverse((o) => {
        if (o.isMesh && o.material && o.material.emissive && !o.userData.flashSet) {
          o.userData.baseEmissive = o.material.emissive.clone();
          o.userData.flashSet = true;
        }
        if (o.isMesh && o.material?.emissive) {
          o.material.emissive.setHex(0x662222);
        }
      });
    } else {
      this.model.traverse((o) => {
        if (o.isMesh && o.material?.emissive && o.userData.flashSet) {
          o.material.emissive.copy(o.userData.baseEmissive ?? new THREE.Color(0x000000));
          o.userData.flashSet = false;
        }
      });
    }
  }
}

export class EnemyManager {
  constructor(game) {
    this.game = game;
    this.list = [];
    this.spawnPoints = [];
    this.respawnQueue = [];
    this.projectiles = [];
    this.timeOfDaySeen = null;
    this._buildSpawns();
  }

  _buildSpawns() {
    for (const [x, z, type, level] of SPAWNS) {
      const typeDef = ENEMY_TYPES[type];
      const spawn = { x, z, type, level, home: { x, z } };
      if (typeDef.boss && !this.game.flags?.bossEnabled) {
        // boss czeka, dopóki gracz nie dotrze do Mglistych Wrót
      }
      this.spawnPoints.push(spawn);
      const enemy = new Enemy(this, spawn);
      if (typeDef.nightOnly) {
        enemy.active = false;
        enemy.model.visible = false;
      }
      enemy.respawnTimer = 0;
      this.list.push(enemy);
    }
  }

  get alive() {
    return this.list.filter((e) => e.active && !e.dead);
  }

  update(dt) {
    const night = this.game.dayNight.isNight;
    const bossAlive = this.list.some((e) => e.def.boss && !e.dead);
    for (const e of this.list) {
      if (e.summoned && !bossAlive) {
        this.game.scene.remove(e.model);
        e.active = false;
        e.dead = true;
        e.summoned = false;
        continue;
      }
      e.update(dt);
    }

    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.life -= dt;
      p.timer -= dt;
      p.pos.addScaledVector(p.dir, p.speed * dt);
      if (p.life <= 0) {
        this.projectiles.splice(i, 1);
        continue;
      }
      // pocisk trafia w ziemię
      if (p.pos.y < heightAt(p.pos.x, p.pos.z) + 0.15) {
        this.game.fx.burst(p.pos, { color: p.color ?? '#c9c2b0', count: 4, speed: 1.4, up: 1, life: 0.35 });
        this.projectiles.splice(i, 1);
        continue;
      }
      // kolizja z graczem
      const pl = this.game.player;
      if (!pl.dead && dist2(p.pos.x, p.pos.z, pl.pos.x, pl.pos.z) < 0.9 && Math.abs(p.pos.y - (pl.pos.y + 0.9)) < 1.4) {
        pl.takeDamage(p.damage, p.source);
        this.game.fx.burst(p.pos, { color: p.color ?? '#c1443a', count: 6, speed: 2, up: 1, life: 0.4 });
        this.game.audio?.hit(false);
        this.projectiles.splice(i, 1);
      }
    }

    // nocne potwory — wskrzeszanie
    if (night && this.timeOfDaySeen !== 'night') {
      this.timeOfDaySeen = 'night';
      for (const e of this.list) {
        if (e.isNightOnly) {
          e.respawn();
          e.active = true;
          e.model.visible = true;
          e.hp = e.maxHP;
          e.pos.copy(e.home);
          e.aggro = false;
        }
      }
    } else if (!night && this.timeOfDaySeen !== 'day') {
      this.timeOfDaySeen = 'day';
    }

    // respawn zwykłych wrogów
    for (const e of this.list) {
      if (e.def.boss) continue;
      if (e.isNightOnly) continue;
      if (!e.dead && e.active) continue;
      if (e.dead && e.active) continue;
      if (e.respawnTimer === undefined) e.respawnTimer = 0;
      if (e.deathTime > 0) {
        e.respawnTimer += dt;
        if (e.respawnTimer > 75) {
          e.respawnTimer = 0;
          e.respawn();
          if (e.def.model === 'wraith') e.active = false;
        }
      }
    }
  }

  _spawnAllowed() {
    return true;
  }

  projectilesFromEnemy(enemy, origin, dir, damage) {
    this.projectiles.push({
      pos: origin.clone(),
      dir: dir.clone(),
      speed: enemy.def.model === 'wraith' ? 13 : 30,
      damage,
      source: enemy.name,
      life: 3,
      timer: 0,
      color: enemy.def.model === 'wraith' ? '#a88fe8' : '#d8c2a0',
    });
  }

  summon(type, x, z, level) {
    const spawn = { x, z, type, level };
    const def = ENEMY_TYPES[type];
    const enemy = new Enemy(this, spawn);
    enemy.aggro = true;
    enemy.summoned = true;
    this.list.push(enemy);
    this.game.fx.magicBurst(new THREE.Vector3(x, heightAt(x, z) + 0.8, z), '#8fe0ff');
    return enemy;
  }

  reset() {
    for (const e of this.list) {
      if (e.summoned) {
        this.game.scene.remove(e.model);
        e.active = false;
      }
    }
    this.list = this.list.filter((e) => !e.summoned);
    for (const e of this.list) {
      e.respawn();
      if (e.isNightOnly) {
        e.active = false;
        e.model.visible = false;
      }
    }
    this.projectiles.length = 0;
  }
}
