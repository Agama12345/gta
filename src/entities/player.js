import * as THREE from 'three';
import { clamp, damp, dampAngle } from '../core/utils.js';
import { heightAt, isWater, WATER_LEVEL, WORLD_RADIUS } from '../world/terrain.js';
import { makeHumanoid, makeSword, makeShield } from '../world/models.js';
import { Inventory } from '../systems/inventory.js';
import { ITEMS } from '../data/items.js';

export const SPELLS = [
  {
    id: 'dawn', name: 'Znak Świtu', glyph: '✧', mana: 28, cd: 8, level: 1,
    desc: 'Fala światła rani wszystkich wrogów w promieniu 5 m i leczy cię za 12 punktów.',
  },
  {
    id: 'frenzy', name: 'Wilczy Zew', glyph: '✶', mana: 24, cd: 18, level: 3,
    desc: 'Na 10 sekund zyskujesz +35% obrażeń i +20% szybkości ruchu.',
  },
  {
    id: 'blink', name: 'Blask Świtu', glyph: '☀', mana: 40, cd: 26, level: 5,
    desc: 'Leczy 45% maksymalnego życia i osłania cię na 4 sekundy.',
  },
];

export const ATTRS = [
  { id: 'str', name: 'Siła', glyph: 'S', desc: 'Obrażenia broni i siła ciosów' },
  { id: 'agi', name: 'Zręczność', glyph: 'Z', desc: 'Szansa na trafienie krytyczne i szybkość' },
  { id: 'end', name: 'Wytrzymałość', glyph: 'W', desc: 'Życie, pancerz i kondycja' },
  { id: 'foc', name: 'Skupienie', glyph: 'M', desc: 'Mana i moc zaklęć' },
];

export function xpToNext(level) {
  return Math.round(120 + level * 85 + Math.pow(level, 1.55) * 26);
}

export class Player {
  constructor(game) {
    this.game = game;
    this.group = new THREE.Group();
    this.inventory = new Inventory();

    // pozycja startowa — brama Wilczej Doliny
    this.pos = new THREE.Vector3(2, heightAt(2, 342), 342);
    this.vel = new THREE.Vector3();
    this.yaw = Math.PI;
    this.radius = 0.42;

    this.level = 1;
    this.xp = 0;
    this.attrs = { str: 5, agi: 5, end: 5, foc: 5 };
    this.points = 0;

    this.hp = 100;
    this.stamina = 100;
    this.mana = 40;

    this.state = 'idle';
    this.stateTime = 0;
    this.combo = 0;
    this.attackHitApplied = false;
    this.attackCooldown = 0;
    this.dodgeCooldown = 0;
    this.invuln = 0;
    this.hurtFlash = 0;
    this.hitFlash = 0;
    this.dead = false;

    this.cooldowns = { dawn: 0, frenzy: 0, blink: 0 };
    this.buffs = { attack: 0, attackTime: 0, speedTime: 0, shield: 0 };
    this.walkPhase = 0;
    this.sprinting = false;
    this.staminaLock = false;
    this.regenDelay = 0;
    this.lastGroundY = this.pos.y;
    this.sinceCombat = 99;
    this.totalKills = 0;

    this._buildModel();
    this.recalc();
    this.hp = this.maxHP;
    this.mana = this.maxMana;
    this.stamina = this.maxStamina;
    this.syncModel();
  }

  _buildModel() {
    const built = makeHumanoid({
      skin: '#dcb08a',
      tunic: '#4f6350',
      pants: '#463f36',
      boots: '#2b241f',
      hair: '#4a3020',
      cloak: '#384f44',
      bulk: 1.04,
      scar: true,
      armor: '#7c8577',
    });
    this.model = built.group;
    this.parts = built.parts;

    this._buildGear();

    const sword = makeSword({ blade: '#d9e2e8', guard: '#b08a3e', grip: '#3a2a1c' });
    sword.position.set(0, -0.72, 0.06);
    sword.rotation.set(-0.35, 0, 0.12);
    sword.scale.setScalar(0.9);
    this.weaponMesh = sword;
    this.parts.arms[1].add(sword);

    const shield = makeShield('#5d5341');
    shield.position.set(0, -0.7, 0.02);
    shield.rotation.y = Math.PI / 2;
    shield.scale.setScalar(0.86);
    this.parts.arms[0].add(shield);

    this.group.add(this.model);
    this.group.position.copy(this.pos);
    this.group.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });

    // ciepła latarnia — rozjaśnia noc wokół bohatera
    this.lantern = new THREE.PointLight('#ffcf9a', 0, 13, 2);
    this.lantern.position.set(0, 1.5, 0.25);
    this.group.add(this.lantern);
    const lanternGlass = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 6, 5),
      new THREE.MeshBasicMaterial({ color: '#ffd9a0', transparent: true, opacity: 0.9 })
    );
    lanternGlass.position.set(0.2, 1.0, 0.18);
    lanternGlass.castShadow = false;
    this.group.add(lanternGlass);

    this.shadowBlob = new THREE.Mesh(
      new THREE.CircleGeometry(0.62, 16),
      new THREE.MeshBasicMaterial({ color: '#000000', transparent: true, opacity: 0.24, depthWrite: false })
    );
    this.shadowBlob.rotation.x = -Math.PI / 2;
    this.shadowBlob.position.y = 0.04;
    this.group.add(this.shadowBlob);
  }

  /** Doposażenie modelu: naramienniki, karwasze, runa na piersi, hełm i peleryna z segmentów. */
  _buildGear() {
    const { body, arms, legs, head, torso } = this.parts;

    const steel = new THREE.MeshStandardMaterial({ color: '#8d968c', roughness: 0.42, metalness: 0.72 });
    const steelDark = new THREE.MeshStandardMaterial({ color: '#5f675f', roughness: 0.5, metalness: 0.65 });
    const leather = new THREE.MeshStandardMaterial({ color: '#4a3524', roughness: 0.9 });
    const runeMat = new THREE.MeshStandardMaterial({
      color: '#3a2a52',
      roughness: 0.35,
      metalness: 0.4,
      emissive: '#a86bf0',
      emissiveIntensity: 0.9,
    });
    const capeMat = new THREE.MeshStandardMaterial({
      color: '#33503f',
      roughness: 0.95,
      side: THREE.DoubleSide,
    });
    const capeMatInner = new THREE.MeshStandardMaterial({
      color: '#28402f',
      roughness: 0.98,
      side: THREE.DoubleSide,
    });

    // naramienniki (rosną wraz z ramieniem, więc nie rozjeżdżają się w animacji)
    for (const arm of arms) {
      const pad = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6, 0, Math.PI * 2, 0, Math.PI * 0.62), steel);
      pad.position.set(0, 0.02, 0);
      pad.scale.set(1.15, 0.85, 1.15);
      pad.castShadow = true;
      arm.add(pad);

      const bracer = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.075, 0.2, 7), steelDark);
      bracer.position.set(0, -0.62, 0);
      bracer.castShadow = true;
      arm.add(bracer);
    }

    // napierśnik z runą światła
    const chest = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.42, 0.1), steel);
    chest.position.set(0, 1.2, 0.19);
    chest.castShadow = true;
    body.add(chest);

    const rune = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.017, 6, 12), runeMat);
    rune.position.set(0, 1.22, 0.25);
    rune.castShadow = false;
    body.add(rune);
    this.runeMesh = rune;

    const strap = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.68, 0.06), leather);
    strap.position.set(-0.12, 1.16, 0.19);
    strap.rotation.z = 0.5;
    body.add(strap);

    // nagolenice
    for (const leg of legs) {
      const greave = new THREE.Mesh(new THREE.CylinderGeometry(0.105, 0.09, 0.26, 7), steelDark);
      greave.position.set(0, -0.42, 0.01);
      greave.castShadow = true;
      leg.add(greave);
    }

    // hełm: skórzany kaptur z obręczą
    const hood = new THREE.Mesh(
      new THREE.SphereGeometry(0.235, 9, 7, 0, Math.PI * 2, 0, Math.PI * 0.72),
      new THREE.MeshStandardMaterial({ color: '#3d4a41', roughness: 0.95 })
    );
    hood.position.set(0, 0.045, -0.01);
    hood.castShadow = true;
    head.add(hood);

    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.022, 6, 14), steel);
    rim.rotation.x = Math.PI / 2;
    rim.position.set(0, 0.03, 0);
    head.add(rim);

    // peleryna: 4 segmenty, każdy sterowany osobno (wiatr + bieg)
    const cape = new THREE.Group();
    cape.position.set(0, 1.42, -0.17);
    body.add(cape);
    const segments = [];
    let parent = cape;
    for (let i = 0; i < 4; i++) {
      const width = 0.5 - i * 0.055;
      const seg = new THREE.Group();
      seg.position.y = i === 0 ? 0 : -0.24;
      const panel = new THREE.Mesh(new THREE.BoxGeometry(width, 0.26, 0.025), i === 0 ? capeMat : capeMatInner);
      panel.position.y = -0.12;
      panel.castShadow = true;
      seg.add(panel);
      parent.add(seg);
      parent = seg;
      segments.push(seg);
    }
    this.cape = { root: cape, segments };
    if (this.parts.cloak) this.parts.cloak.visible = false;

    // stary, prosty miecz i tarcza zostają — ale dostają lepsze materiały
    const bladeMat = new THREE.MeshStandardMaterial({ color: '#dbe4ea', roughness: 0.22, metalness: 0.92 });
    const guardMat = new THREE.MeshStandardMaterial({ color: '#c99a44', roughness: 0.35, metalness: 0.85 });
    this._bladeMaterial = bladeMat;
    this._guardMaterial = guardMat;
  }

  // ---------------- statystyki ----------------
  recalc() {
    const eq = this.inventory.equipStats();
    const a = this.attrs;
    this.maxHP = Math.round(64 + a.end * 9 + this.level * 7 + eq.hp);
    this.maxMana = Math.round(22 + a.foc * 7 + this.level * 4 + eq.mana);
    this.maxStamina = Math.round(96 + a.end * 3.2);
    this.attackPower = 5 + a.str * 1.7 + this.level * 1.3 + eq.attack;
    this.armor = a.end * 0.55 + eq.armor;
    this.critChance = clamp(0.04 + a.agi * 0.014 + eq.crit * 0.01, 0, 0.65);
    this.moveSpeed = 5.0 + a.agi * 0.045 + eq.speed;
    this.spellPower = 14 + a.foc * 2.6 + this.level * 1.6;
    this.hp = Math.min(this.hp, this.maxHP);
    this.mana = Math.min(this.mana, this.maxMana);
    this.stamina = Math.min(this.stamina, this.maxStamina);
  }

  get xpNeeded() {
    return xpToNext(this.level);
  }

  gainXp(amount) {
    this.xp += amount;
    let ups = 0;
    while (this.xp >= this.xpNeeded) {
      this.xp -= this.xpNeeded;
      this.level += 1;
      this.points += 3;
      ups += 1;
      if (ups > 8) break;
    }
    if (ups > 0) {
      this.recalc();
      this.hp = this.maxHP;
      this.mana = this.maxMana;
      this.stamina = this.maxStamina;
      this.game.onLevelUp(this.level);
    }
    this.game.ui?.refreshHud();
  }

  spendPoint(attrId) {
    if (this.points <= 0) return false;
    if (!(attrId in this.attrs)) return false;
    this.attrs[attrId] += 1;
    this.points -= 1;
    this.recalc();
    return true;
  }

  // ---------------- walka ----------------
  canAct() {
    return !this.dead && this.state !== 'dodge' && this.state !== 'hurt';
  }

  attack() {
    if (this.dead || this.attackCooldown > 0) return false;
    if (this.state === 'attack' && this.stateTime < 0.34) return false;
    if (this.state === 'dodge' || this.state === 'cast') return false;
    this.state = 'attack';
    this.stateTime = 0;
    this.attackHitApplied = false;
    this.combo = (this.combo + 1) % 3;
    this.attackCooldown = 0.42;
    this.stamina = Math.max(0, this.stamina - 6);
    this.sinceCombat = 0;

    // skieruj postać w stronę kamery, jeśli nie ma ruchu
    if (this.vel.lengthSq() < 0.6) {
      this.yaw = this.game.cameraRig.yaw + Math.PI;
    }
    this.game.fx.slash(new THREE.Vector3(this.pos.x, this.pos.y + 0.25, this.pos.z), this.yaw, {
      color: this.combo === 2 ? '#ffd27a' : '#f2e6d0',
      radius: this.combo === 2 ? 2.2 : 1.9,
      arc: this.combo === 2 ? Math.PI * 1.5 : Math.PI * 1.05,
    });
    this.game.audio?.swing(this.combo);
    return true;
  }

  dodge() {
    if (this.dead || this.dodgeCooldown > 0 || this.stamina < 20) return false;
    if (this.state === 'dodge') return false;
    this.state = 'dodge';
    this.stateTime = 0;
    this.invuln = Math.max(this.invuln, 0.34);
    this.dodgeCooldown = 0.72;
    this.stamina -= 20;
    this.sinceCombat = 0;
    const dir = this.vel.lengthSq() > 0.4 ? this.vel.clone().normalize() : new THREE.Vector3(Math.sin(this.yaw), 0, Math.cos(this.yaw));
    this.dodgeDir = dir;
    this.game.fx.burst(new THREE.Vector3(this.pos.x, this.pos.y + 0.2, this.pos.z), {
      color: '#cfc6b0', count: 8, speed: 2.2, up: 0.9, life: 0.45, size: 0.8,
    });
    this.game.audio?.dodge();
    return true;
  }

  castSpell(index) {
    const spell = SPELLS[index];
    if (!spell || this.dead) return false;
    if (this.level < spell.level) {
      this.game.ui?.log(`Zaklęcie „${spell.name}” odblokuje się na poziomie ${spell.level}.`, 'warn');
      return false;
    }
    if (this.cooldowns[spell.id] > 0) return false;
    if (this.mana < spell.mana) {
      this.game.ui?.log('Za mało many.', 'warn');
      return false;
    }
    if (this.state === 'dodge') return false;

    this.mana -= spell.mana;
    this.cooldowns[spell.id] = spell.cd;
    this.state = 'cast';
    this.stateTime = 0;
    this.sinceCombat = 0;
    this.game.audio?.cast();

    if (spell.id === 'dawn') {
      const center = this.pos.clone().add(new THREE.Vector3(0, 1.0, 0));
      this.game.fx.magicBurst(center, '#ffe3a8');
      this.game.damageEnemiesInRadius(this.pos, 5.2, this.spellPower * 1.15, 'Znak Świtu');
      this.heal(12);
      this.game.ui?.flashScreen('#ffdca0', 0.35);
    } else if (spell.id === 'frenzy') {
      this.buffs.attack = 0.35;
      this.buffs.attackTime = 10;
      this.buffs.speedTime = 10;
      this.game.fx.magicBurst(this.pos.clone().add(new THREE.Vector3(0, 1, 0)), '#ffb45c');
      this.game.ui?.log('Wilczy Zew: +35% obrażeń, +20% szybkości.', 'gold');
    } else if (spell.id === 'blink') {
      this.heal(Math.round(this.maxHP * 0.45));
      this.buffs.shield = 4;
      this.game.fx.heal(this.pos, '#fff0c0');
      this.game.fx.magicBurst(this.pos.clone().add(new THREE.Vector3(0, 1, 0)), '#fff3c4');
      this.game.ui?.log('Blask Świtu otacza cię tarczą.', 'good');
    }
    return true;
  }

  useItem(id) {
    const def = ITEMS[id];
    if (!def?.use || !this.inventory.has(id)) return false;
    if (def.use.heal) {
      if (this.hp >= this.maxHP) return false;
      this.heal(def.use.heal);
      this.game.fx.heal(this.pos, '#9fe08a');
    }
    if (def.use.mana) {
      if (this.mana >= this.maxMana) return false;
      this.mana = Math.min(this.maxMana, this.mana + def.use.mana);
      this.game.fx.heal(this.pos, '#8fc4ff');
    }
    if (def.use.buff) {
      this.buffs.attack = Math.max(this.buffs.attack, def.use.buff.attack / Math.max(1, this.attackPower));
      this.buffs.attackTime = def.use.buff.duration;
      this.game.fx.magicBurst(this.pos.clone().add(new THREE.Vector3(0, 1, 0)), '#ff9a45');
    }
    this.inventory.remove(id, 1);
    this.game.audio?.drink();
    this.game.ui?.log(`Użyto: ${def.name}.`, 'good');
    return true;
  }

  heal(amount) {
    const before = this.hp;
    this.hp = Math.min(this.maxHP, this.hp + amount);
    const gained = Math.round(this.hp - before);
    if (gained > 0) this.game.ui?.floatNumber(this.pos, `+${gained}`, 'heal');
  }

  takeDamage(raw, source = 'wróg') {
    if (this.dead) return 0;
    if (this.invuln > 0) {
      this.game.ui?.floatNumber(this.pos, 'unik', 'mana');
      return 0;
    }
    const mitigated = raw * (100 / (100 + this.armor * 2.4));
    const variance = 0.92 + Math.random() * 0.16;
    let dmg = Math.max(1, Math.round(mitigated * variance));
    if (this.buffs.shield > 0) dmg = Math.round(dmg * 0.45);

    this.hp -= dmg;
    this.sinceCombat = 0;
    this.regenDelay = 4.5;
    this.hurtFlash = 0.4;
    this.invuln = 0.35;
    this.state = 'hurt';
    this.stateTime = 0;
    this.game.ui?.floatNumber(this.pos.clone().add(new THREE.Vector3(0, 0.7, 0)), `-${dmg}`, 'player');
    this.game.ui?.flashScreen('#c1443a', 0.32);
    this.game.cameraRig.addShake(0.42);
    this.game.audio?.hurt();
    this.game.fx.sparks(this.pos.clone().add(new THREE.Vector3(0, 1.1, 0)), '#e05a4a', 8);

    if (this.hp <= 0) {
      this.hp = 0;
      this.die();
    }
    return dmg;
  }

  die() {
    this.dead = true;
    this.state = 'dead';
    this.stateTime = 0;
    this.game.onPlayerDeath();
  }

  respawn() {
    this.dead = false;
    this.state = 'idle';
    this.hp = this.maxHP;
    this.mana = this.maxMana;
    this.stamina = this.maxStamina;
    this.pos.set(0, heightAt(0, 342) + 0.1, 342);
    this.vel.set(0, 0, 0);
    this.invuln = 2.5;
    this.buffs.attackTime = 0;
    this.buffs.speedTime = 0;
    this.recalc();
  }

  // ---------------- aktualizacja ----------------
  update(dt, input) {
    this.stateTime += dt;
    this.attackCooldown = Math.max(0, this.attackCooldown - dt);
    this.dodgeCooldown = Math.max(0, this.dodgeCooldown - dt);
    this.invuln = Math.max(0, this.invuln - dt);
    this.hurtFlash = Math.max(0, this.hurtFlash - dt);
    this.regenDelay = Math.max(0, this.regenDelay - dt);
    this.sinceCombat += dt;

    for (const k of Object.keys(this.cooldowns)) this.cooldowns[k] = Math.max(0, this.cooldowns[k] - dt);
    if (this.buffs.attackTime > 0) {
      this.buffs.attackTime -= dt;
      if (this.buffs.attackTime <= 0) this.buffs.attack = 0;
    }
    if (this.buffs.speedTime > 0) this.buffs.speedTime -= dt;
    if (this.buffs.shield > 0) this.buffs.shield -= dt;

    if (this.dead) {
      this._animateDeath(dt);
      return;
    }

    const axes = input?.axes() ?? { x: 0, y: 0 };
    const moving = axes.x !== 0 || axes.y !== 0;
    const cam = this.game.cameraRig;
    const forward = cam.forward();
    const right = cam.right();
    const wish = new THREE.Vector3(
      forward.x * -axes.y + right.x * axes.x,
      0,
      forward.z * -axes.y + right.z * axes.x
    );
    if (wish.lengthSq() > 1) wish.normalize();

    // sprint
    const wantSprint = (input?.isDown('ShiftLeft') || input?.isDown('ShiftRight')) && moving && this.stamina > 0;
    if (this.stamina <= 0) this.staminaLock = true;
    if (this.staminaLock && this.stamina > 30) this.staminaLock = false;
    this.sprinting = wantSprint && !this.staminaLock && this.state !== 'attack' && this.state !== 'dodge';

    if (this.sprinting) {
      this.stamina = Math.max(0, this.stamina - 13 * dt);
    } else if (this.sinceCombat > 1.6) {
      this.stamina = Math.min(this.maxStamina, this.stamina + 17 * dt);
    }

    // regeneracja
    if (this.regenDelay <= 0 && this.sinceCombat > 3.5) {
      this.hp = Math.min(this.maxHP, this.hp + this.maxHP * 0.012 * dt);
      this.mana = Math.min(this.maxMana, this.mana + this.maxMana * 0.035 * dt);
    } else if (this.sinceCombat > 3.5) {
      this.mana = Math.min(this.maxMana, this.mana + this.maxMana * 0.02 * dt);
    }

    let speed = this.moveSpeed * (this.sprinting ? 1.62 : 1) * (this.buffs.speedTime > 0 ? 1.2 : 1);
    if (this.state === 'attack') speed *= 0.34;
    if (this.state === 'cast') speed *= 0.2;
    if (this.state === 'hurt') speed *= 0.15;

    if (this.state === 'dodge') {
      const t = clamp(1 - this.stateTime / 0.42, 0, 1);
      const dSpeed = 12.5 * t * t + 2;
      this.vel.x = this.dodgeDir.x * dSpeed;
      this.vel.z = this.dodgeDir.z * dSpeed;
      this.yaw = dampAngle(this.yaw, Math.atan2(this.dodgeDir.x, this.dodgeDir.z), 18, dt);
      if (this.stateTime > 0.42) this.state = 'idle';
    } else if (moving) {
      const targetVX = wish.x * speed;
      const targetVZ = wish.z * speed;
      this.vel.x = damp(this.vel.x, targetVX, 13, dt);
      this.vel.z = damp(this.vel.z, targetVZ, 13, dt);
      if (this.state === 'idle' || this.state === 'attack') {
        const targetYaw = Math.atan2(wish.x, wish.z);
        this.yaw = dampAngle(this.yaw, targetYaw, this.state === 'attack' ? 6 : 12, dt);
      }
    } else {
      this.vel.x = damp(this.vel.x, 0, 16, dt);
      this.vel.z = damp(this.vel.z, 0, 16, dt);
    }

    if (this.state === 'attack' || this.state === 'cast' || this.state === 'hurt') {
      this.vel.multiplyScalar(1 - Math.min(1, dt * 5));
    }

    // ruch i kolizje
    const next = this.pos.clone();
    next.x += this.vel.x * dt;
    next.z += this.vel.z * dt;

    const r = Math.hypot(next.x, next.z);
    if (r > WORLD_RADIUS - 6) {
      const s = (WORLD_RADIUS - 6) / r;
      next.x *= s;
      next.z *= s;
      this.vel.multiplyScalar(0.4);
    }
    const groundNext = heightAt(next.x, next.z);
    // tylko głęboka woda jeziora blokuje ruch — bagno i mokradła są przechodnie
    const deepWater = isWater(next.x, next.z) && groundNext < WATER_LEVEL - 0.9;
    if (!deepWater) {
      this.pos.x = next.x;
      this.pos.z = next.z;
    } else {
      this.vel.multiplyScalar(0.2);
      this.waterHint = (this.waterHint ?? 0) - dt;
      if (this.waterHint <= 0) {
        this.waterHint = 6;
        this.game.ui?.log('Głęboka woda — dalej nie popłynę.', 'info');
      }
    }

    const ground = heightAt(this.pos.x, this.pos.z);
    this.pos.y = damp(this.pos.y, ground, 18, dt);

    // granice obozowiska bandytów itp. — prosta kolizja z domami
    this._resolveBuildingCollisions();

    // animacje i atak
    this._animate(dt, moving, speed);

    // pył spod stóp na twardym gruncie
    const horizontal = Math.hypot(this.vel.x, this.vel.z);
    if (moving && horizontal > 1.2) {
      this.dustTimer = (this.dustTimer ?? 0) - dt;
      if (this.dustTimer <= 0) {
        this.dustTimer = this.sprinting ? 0.16 : 0.3;
        const p = new THREE.Vector3(this.pos.x, this.pos.y + 0.06, this.pos.z);
        this.game.fx?.burst?.(p, {
          color: '#c8bba4',
          count: this.sprinting ? 5 : 3,
          speed: 0.7,
          up: 0.55,
          size: 0.55,
          life: 0.5,
          gravity: 2.2,
        });
      }
    }
    if (this.state === 'attack' && !this.attackHitApplied && this.stateTime > 0.17) {
      this.attackHitApplied = true;
      this._applyMeleeHit();
    }
    if (this.state === 'attack' && this.stateTime > 0.52) this.state = 'idle';
    if (this.state === 'cast' && this.stateTime > 0.42) this.state = 'idle';
    if (this.state === 'hurt' && this.stateTime > 0.3) this.state = 'idle';

    this.syncModel();
  }

  _applyMeleeHit() {
    const radius = this.combo === 2 ? 3.0 : 2.6;
    const forward = new THREE.Vector3(Math.sin(this.yaw), 0, Math.cos(this.yaw));
    const targets = [];
    for (const e of this.game.enemies?.list ?? []) {
      if (e.dead || !e.active) continue;
      const to = new THREE.Vector3(e.pos.x - this.pos.x, 0, e.pos.z - this.pos.z);
      const d = to.length();
      if (d > radius + e.def.radius) continue;
      to.normalize();
      if (forward.dot(to) < (this.combo === 2 ? -0.3 : 0.28)) continue;
      targets.push({ e, d });
    }
    targets.sort((a, b) => a.d - b.d);
    const count = this.combo === 2 ? 3 : 2;
    for (let i = 0; i < Math.min(count, targets.length); i++) {
      const e = targets[i].e;
      const crit = Math.random() < this.critChance;
      let dmg = this.attackPower * (this.combo === 2 ? 1.35 : i === 0 ? 1 : 0.75);
      dmg *= 1 + this.buffs.attack;
      dmg *= 0.9 + Math.random() * 0.2;
      if (crit) dmg *= 1.75;
      e.takeDamage(dmg, { crit, source: 'Gracz', knockback: 3.2 });
      const hitPos = new THREE.Vector3(e.pos.x, e.pos.y + 1.1, e.pos.z);
      this.game.fx.sparks(hitPos, crit ? '#ffd27a' : '#f2e3c4', crit ? 12 : 6);
      this.game.cameraRig.addShake(crit ? 0.28 : 0.14);
      this.game.audio?.hit(crit);
    }
    if (targets.length > 0) this.game.ui?.refreshHud();
  }

  _resolveBuildingCollisions() {
    const colliders = this.game.world?.colliders ?? [];
    for (const c of colliders) {
      const dx = this.pos.x - c.x;
      const dz = this.pos.z - c.z;
      const dist = Math.hypot(dx, dz);
      const minDist = c.r + this.radius;
      if (dist < minDist && dist > 0.0001) {
        const push = (minDist - dist) / dist;
        this.pos.x += dx * push;
        this.pos.z += dz * push;
      }
    }
  }

  _animate(dt, moving, speed) {
    const speedMag = Math.hypot(this.vel.x, this.vel.z);
    const norm = clamp(speedMag / Math.max(3, this.moveSpeed), 0, 2.2);
    this.walkPhase += dt * (4.2 + norm * 6.5) * (moving ? 1 : 0.4);

    const { body, arms, legs, head, cloak } = this.parts;

    // podstawowy oddech
    body.position.y = Math.sin(this.walkPhase * 0.7) * 0.02;

    if (this.state === 'attack') {
      const t = clamp(this.stateTime / 0.52, 0, 1);
      const swing = Math.sin(t * Math.PI);
      const dir = this.combo === 2 ? -1 : 1;
      arms[1].rotation.x = -1.9 * swing + 0.4;
      arms[1].rotation.z = -0.5 * swing * dir;
      arms[0].rotation.x = 0.5 * swing;
      body.rotation.y = -0.5 * swing * dir + (this.combo === 1 ? 0.35 * swing : 0);
      legs[0].rotation.x = 0.25 * swing;
      legs[1].rotation.x = -0.2 * swing;
      head.rotation.y = 0.2 * swing * dir;
    } else if (this.state === 'dodge') {
      const t = clamp(this.stateTime / 0.42, 0, 1);
      body.rotation.x = -t * Math.PI * 2;
      arms[0].rotation.x = -1.2;
      arms[1].rotation.x = -1.2;
      legs[0].rotation.x = 0.8;
      legs[1].rotation.x = 0.5;
      body.position.y = Math.sin(t * Math.PI) * 0.35;
    } else if (this.state === 'cast') {
      const t = clamp(this.stateTime / 0.42, 0, 1);
      const up = Math.sin(t * Math.PI) * 1.1;
      arms[0].rotation.x = -2.4 * up;
      arms[1].rotation.x = -2.4 * up;
      arms[0].rotation.z = 0.5 * up;
      arms[1].rotation.z = -0.5 * up;
      body.rotation.x = -0.12 * up;
    } else if (this.state === 'hurt') {
      const t = clamp(this.stateTime / 0.3, 0, 1);
      body.rotation.x = 0.35 * Math.sin(t * Math.PI);
      arms[0].rotation.x = -0.4;
      arms[1].rotation.x = -0.2;
    } else if (moving) {
      const swing = Math.sin(this.walkPhase) * 0.9 * clamp(norm, 0.35, 1.7);
      legs[0].rotation.x = swing;
      legs[1].rotation.x = -swing;
      arms[0].rotation.x = -swing * 0.65;
      arms[1].rotation.x = swing * 0.65;
      arms[0].rotation.z = 0.08;
      arms[1].rotation.z = -0.08;
      body.rotation.x = 0.05 + norm * 0.05;
      body.rotation.y = 0;
      body.position.y = Math.abs(Math.sin(this.walkPhase)) * 0.055;
      head.rotation.y = 0;
    } else {
      const idle = Math.sin(this.walkPhase * 0.55);
      legs[0].rotation.x = damp(legs[0].rotation.x, 0, 10, dt);
      legs[1].rotation.x = damp(legs[1].rotation.x, 0, 10, dt);
      arms[0].rotation.x = damp(arms[0].rotation.x, idle * 0.06, 6, dt);
      arms[1].rotation.x = damp(arms[1].rotation.x, -idle * 0.05, 6, dt);
      arms[0].rotation.z = damp(arms[0].rotation.z, 0.1, 6, dt);
      arms[1].rotation.z = damp(arms[1].rotation.z, -0.1, 6, dt);
      body.rotation.x = damp(body.rotation.x, 0, 8, dt);
      body.rotation.y = damp(body.rotation.y, 0, 8, dt);
      head.rotation.y = damp(head.rotation.y, 0, 6, dt);
      body.position.y = Math.sin(this.walkPhase * 0.9) * 0.012;
    }

    if (cloak) {
      const flutter = clamp(speedMag * 0.06, 0, 0.4);
      cloak.rotation.x = Math.PI + Math.sin(this.walkPhase * 0.9) * 0.04 - flutter * 0.5;
      cloak.rotation.z = Math.sin(this.walkPhase * 0.6) * 0.03;
    }

    // peleryna — im szybciej biegniesz, tym mocniej odchyla się do tyłu
    if (this.cape) {
      const speedMag2 = Math.hypot(this.vel.x, this.vel.z);
      const flutter = clamp(speedMag2 * 0.075, 0, 0.5);
      const t = this.walkPhase * 0.8;
      const segs = this.cape.segments;
      for (let i = 0; i < segs.length; i++) {
        const lag = 1 + i * 0.35;
        segs[i].rotation.x = 0.16 + flutter * (0.55 + i * 0.35) + Math.sin(t + i * 0.7) * 0.045 * lag;
        segs[i].rotation.z = Math.sin(t * 0.8 + i * 0.5) * 0.05 + clamp(this.vel.x * 0.02, -0.12, 0.12);
      }
      this.cape.root.rotation.x = -0.05 - flutter * 0.3;
    }
    if (this.runeMesh) {
      const pulse = 0.65 + Math.sin(this.walkPhase * 1.2) * 0.18 + (this.state === 'cast' ? 1.2 : 0);
      this.runeMesh.material.emissiveIntensity = pulse;
      this.runeMesh.rotation.z += dt * 0.6;
    }
    if (head) head.rotation.x = Math.sin(this.walkPhase * 0.5) * 0.02;

    // migotanie nietykalności
    if (this.invuln > 0 && this.state !== 'dodge') {
      this.model.visible = Math.floor(this.invuln * 18) % 2 === 0;
    } else {
      this.model.visible = true;
    }
  }

  _animateDeath(dt) {
    const { body } = this.parts;
    body.rotation.x = damp(body.rotation.x, -Math.PI / 2, 3, dt);
    this.model.position.y = damp(this.model.position.y, 0.25, 3, dt);
    this.shadowBlob.visible = false;
  }

  syncModel() {
    this.group.position.copy(this.pos);
    this.group.rotation.y = this.yaw;
    const ground = heightAt(this.pos.x, this.pos.z);
    this.shadowBlob.position.y = ground - this.pos.y + 0.05;
    this.shadowBlob.visible = !this.dead;
  }

  serialize() {
    return {
      pos: [this.pos.x, this.pos.z],
      level: this.level,
      xp: this.xp,
      attrs: { ...this.attrs },
      points: this.points,
      hp: this.hp,
      mana: this.mana,
      inventory: this.inventory.serialize(),
    };
  }

  load(data) {
    if (!data) return;
    this.level = data.level ?? 1;
    this.xp = data.xp ?? 0;
    this.attrs = { ...this.attrs, ...(data.attrs ?? {}) };
    this.points = data.points ?? 0;
    this.inventory.load(data.inventory);
    this.recalc();
    this.hp = data.hp ?? this.maxHP;
    this.mana = data.mana ?? this.maxMana;
    this.stamina = this.maxStamina;
    if (data.pos) this.pos.set(data.pos[0], heightAt(data.pos[0], data.pos[1]), data.pos[1]);
    this.syncModel();
  }
}
