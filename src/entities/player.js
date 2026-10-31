import * as THREE from 'three';
import { clamp, damp, dampAngle, angleDelta } from '../core/utils.js';
import {
  heightAt, isWater, WORLD_RADIUS, WORLD_SCALE, waterDepth, waterLevelAt, isInRiver,
  distanceToPath, slopeAt,
} from '../world/terrain.js';
import { applyGait, applyFootIK, phaseRate } from '../core/gait.js';
import { makeHumanoid, makeSword, makeShield } from '../world/models.js';
import { CharacterRig, animStateFor } from './characterRig.js';
import { Inventory } from '../systems/inventory.js';
import { Perks } from '../systems/perks.js';
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
    const startX = 2 * WORLD_SCALE;
    const startZ = 342 * WORLD_SCALE;
    this.pos = new THREE.Vector3(startX, heightAt(startX, startZ), startZ);
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

    this.perks = new Perks(this);
    this.mods = this.perks.mods;
    this.stealth = false;          // skradanie (klawisz X)
    this.stealthNoise = 0;         // 0 = cisza, 1 = pełny hałas
    this.blocking = false;         // blok (prawy przycisk myszy)
    this.blockTime = 0;
    this.parryWindow = 0;
    this.comboWindow = 0;          // okno na przedłużenie kombinacji
    this.lastAttackEnd = 0;
    this.attackClock = 0;          // zegar ataków do liczenia kombinacji
    this.lastAttackAt = -10;

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
    // 1) Model bohatera dostarczony przez człowieka (GLB z kośćmi i klipami)
    const custom = this.game.assets?.custom?.hero;
    if (custom) {
      try {
        this.rig = new CharacterRig(custom, { targetHeight: 1.82, name: 'bohater' });
        this.model = this.rig.group;
        this.parts = null;
        this._buildRigWeapons();
        this.group.add(this.model);
        this.group.position.copy(this.pos);
        this._buildAura();
        return;
      } catch (err) {
        console.warn('Model bohatera nie wystartował — zostaje sylwetka proceduralna', err);
        this.rig = null;
      }
    }

    // 2) Sylwetka proceduralna (domyślna, zawsze dostępna)
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
    sword.position.set(0, -0.02, 0.06);
    sword.rotation.set(-0.35, 0, 0.12);
    sword.scale.setScalar(0.9);
    this.weaponMesh = sword;
    this.parts.hands[1].add(sword);

    const shield = makeShield('#5d5341');
    shield.position.set(0, -0.02, 0.02);
    shield.rotation.y = Math.PI / 2;
    shield.scale.setScalar(0.86);
    this.parts.hands[0].add(shield);

    this.group.add(this.model);
    this.group.position.copy(this.pos);
    this.group.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });

    this._buildAura();
  }

  /** Broń i tarcza dla modelu z zewnątrz — przypięte do kości dłoni. */
  _buildRigWeapons() {
    const sword = makeSword({ blade: '#d9e2e8', guard: '#b08a3e', grip: '#3a2a1c' });
    sword.scale.setScalar(0.9);
    this.weaponMesh = sword;

    const shield = makeShield('#5d5341');
    shield.scale.setScalar(0.86);

    const right = this.rig && this.rig.attach(sword, 'rightHand');
    if (right) {
      sword.position.set(0, 0.02, 0.02);
      sword.rotation.set(-0.55, 0, 0.1);
    } else {
      // brak kości dłoni — miecz wędruje na plecy, żeby nie wisiał w powietrzu
      sword.position.set(0.16, 1.32, -0.16);
      sword.rotation.set(0.5, 0, -1.15);
      this.group.add(sword);
    }
    const left = this.rig && this.rig.attach(shield, 'leftHand');
    if (left) {
      shield.position.set(0, 0.04, 0.02);
      shield.rotation.set(0, Math.PI / 2, 0);
    } else if (!right) {
      shield.position.set(-0.2, 1.2, -0.18);
      shield.rotation.set(0, Math.PI / 2, 0.2);
      this.group.add(shield);
    }
  }

  /** Latarnia, poświata i cień pod stopami — wspólne dla obu wariantów modelu. */
  _buildAura() {
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
    const m = this.perks?.recalc() ?? this.mods ?? {};
    this.mods = m;
    this.maxHP = Math.round((64 + a.end * 9 + this.level * 7 + eq.hp) * (1 + (m.hp ?? 0)));
    this.maxMana = Math.round((22 + a.foc * 7 + this.level * 4 + eq.mana) * (1 + (m.mana ?? 0)));
    this.maxStamina = Math.round(96 + a.end * 3.2);
    this.attackPower = (5 + a.str * 1.7 + this.level * 1.3 + eq.attack) * (1 + (m.damage ?? 0));
    this.armor = (a.end * 0.55 + eq.armor) * (1 + (m.armor ?? 0));
    this.critChance = clamp(0.04 + a.agi * 0.014 + eq.crit * 0.01 + (m.crit ?? 0), 0, 0.75);
    // mapa jest duża — bohater porusza się żwawiej niż w oryginale
    this.moveSpeed = (6.3 + a.agi * 0.055 + eq.speed) * (1 + (m.speed ?? 0));
    this.spellPower = (14 + a.foc * 2.6 + this.level * 1.6) * (1 + (m.spellPower ?? 0));
    this.staminaCostMul = clamp(1 + (m.staminaCost ?? 0), 0.4, 1.4);
    this.dodgeMul = 1 + (m.dodge ?? 0);
    this.attackSpeed = clamp(1 + (m.attackSpeed ?? 0), 0.6, 2);
    this.hp = Math.min(this.hp, this.maxHP);
    this.mana = Math.min(this.mana, this.maxMana);
    this.stamina = Math.min(this.stamina, this.maxStamina);
  }

  /** Mnożnik obrażeń zależny od stanu (wściekłość, finisher, cios w plecy). */
  damageMultiplier(enemy = null, comboIndex = 0) {
    const m = this.mods ?? {};
    let mult = 1 + this.buffs.attack;
    if (this.hp / this.maxHP < 0.35) mult += m.lowHpDamage ?? 0;
    if (comboIndex === 2) mult += m.finisher ?? 0;
    if (enemy && !enemy.aggro && !enemy.dead) mult += m.backstab ?? 0;
    return mult;
  }

  /** Czy włączone skradanie faktycznie działa (nie w biegu, nie w walce). */
  get sneaking() {
    return this.stealth && !this.sprinting && this.state !== 'attack' && !this.blocking;
  }

  /** Mnożnik zasięgu, z jakiego wrogowie cię zauważają. */
  get stealthFactor() {
    if (!this.sneaking) return 1;
    return clamp(0.42 + (this.mods?.stealth ?? 0), 0.15, 1);
  }

  toggleStealth() {
    this.stealth = !this.stealth;
    this.game.ui?.toast?.(this.stealth ? 'Skradanie włączone — wrogowie widzą cię później.' : 'Skradanie wyłączone.', 'info');
    this.game.audio?.uiClick?.();
    return this.stealth;
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
      this.perks.points += 1;
      this.perkPoints = this.perks.points;
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
    if (this.state === 'attack' && this.stateTime < 0.3) return false;
    if (this.state === 'dodge' || this.state === 'cast') return false;
    if (this.blocking) return false;
    // kombinacja: cios w oknie 1,1 s po poprzednim przedłuża łańcuch 1→2→3
    const chained = this.attackClock - this.lastAttackAt < 1.1;
    this.combo = chained ? Math.min(2, this.combo + 1) : 0;
    this.lastAttackAt = this.attackClock;
    this.comboWindow = 1.1;
    this.state = 'attack';
    this.stateTime = 0;
    this.attackHitApplied = false;
    this.attackCooldown = 0.42 / (this.attackSpeed ?? 1);
    this.stamina = Math.max(0, this.stamina - 6 * (this.staminaCostMul ?? 1));
    this.sinceCombat = 0;
    this.stealth = false;

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
    this.stealth = false;
    this.invuln = Math.max(this.invuln, 0.34 * (this.dodgeMul ?? 1));
    this.dodgeCooldown = 0.72;
    this.stamina -= 20 * (this.staminaCostMul ?? 1);
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

  startBlock() {
    if (this.dead || this.state === 'dodge' || this.state === 'cast') return false;
    this.blocking = true;
    this.blockTime = 0;
    this.parryWindow = 0.26;
    this.stealth = false;
    return true;
  }

  endBlock() {
    this.blocking = false;
    this.blockTime = 0;
  }

  /** Parowanie: blok rozpoczęty chwilę temu całkowicie zbija cios. */
  takeDamage(raw, source = 'wróg') {
    if (this.dead) return 0;
    if (this.invuln > 0) {
      this.game.ui?.floatNumber(this.pos, 'unik', 'mana');
      return 0;
    }
    if (this.blocking) {
      const front = this._blockCovers(source);
      if (front && this.parryWindow > 0) {
        this.parryWindow = 0;
        this.invuln = 0.25;
        this.stamina = Math.max(0, this.stamina - 8);
        this.game.ui?.floatNumber(this.pos.clone().add(new THREE.Vector3(0, 0.9, 0)), 'PAROWANIE', 'crit');
        this.game.audio?.block?.(true);
        this.game.cameraRig.addShake(0.2);
        this.game.fx.sparks(this.pos.clone().add(new THREE.Vector3(0, 1.1, 0)), '#ffe9a8', 14);
        this.game.onParry?.(source);
        return 0;
      }
      if (front) {
        const staminaCost = raw * 0.55;
        this.stamina = Math.max(0, this.stamina - staminaCost);
        if (this.stamina <= 0) {
          this.blocking = false;
          this.game.ui?.toast?.('Kondycja się skończyła — blok padł.', 'warn');
        }
        raw *= 0.25;
        this.game.audio?.block?.(false);
      }
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
    this.attackClock += dt;
    this.attackCooldown = Math.max(0, this.attackCooldown - dt);
    this.dodgeCooldown = Math.max(0, this.dodgeCooldown - dt);
    this.invuln = Math.max(0, this.invuln - dt);
    this.hurtFlash = Math.max(0, this.hurtFlash - dt);
    this.regenDelay = Math.max(0, this.regenDelay - dt);
    this.sinceCombat += dt;
    this.parryWindow = Math.max(0, this.parryWindow - dt);
    this.comboWindow = Math.max(0, this.comboWindow - dt);
    if (this.blocking) {
      this.blockTime += dt;
      // blok trzymany długo męczy — kondycja schodzi wolniej niż przy ciosach
      this.stamina = Math.max(0, this.stamina - 3.4 * dt);
      if (this.stamina <= 0) this.blocking = false;
    }
    // hałas: skradanie = cisza, sprint = pełny tupot
    const targetNoise = this.sneaking ? 0.18 : this.sprinting ? 1 : 0.55;
    this.stealthNoise = damp(this.stealthNoise ?? 0.5, targetNoise, 6, dt);

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
    if (this.sneaking) speed *= 0.52;
    else if (this.stealth) speed *= 0.8;
    if (this.blocking) speed *= 0.42;

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
    // tylko głęboka woda blokuje ruch — bagno, mokradła i brody są przechodnie.
    // Poziom tafli liczymy lokalnie, bo jeziora górskie i rzeki są ponad morzem.
    // W rzece zawsze można brodzić (tyle że wolniej — nurt ciągnie za nogi).
    const levelNext = waterLevelAt(next.x, next.z);
    const wading = isInRiver(next.x, next.z);
    const onBridge = this.game.world?.bridgeDeckAt?.(next.x, next.z) ?? null;
    const deepWater = onBridge === null && !wading && isWater(next.x, next.z) && groundNext < levelNext - 0.9;
    if (!deepWater) {
      if (wading) {
        // nurt spowalnia — brodzenie po rzece ma swój ciężar
        this.vel.x *= 0.985;
        this.vel.z *= 0.985;
      }
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

    // mostek: idziemy po deskach, nie po dnie koryta
    const deck = this.game.world?.bridgeDeckAt?.(this.pos.x, this.pos.z) ?? null;
    const ground = deck !== null ? Math.max(deck, heightAt(this.pos.x, this.pos.z)) : heightAt(this.pos.x, this.pos.z);
    const fallSpeed = (this.pos.y - ground) / Math.max(dt, 1e-3);
    this.pos.y = damp(this.pos.y, ground, 18, dt);
    // lądowanie po zejściu ze zbocza: krótkie ugięcie kolan i kompresja tułowia
    if (fallSpeed > 4.5) {
      this._land = Math.max(this._land ?? 0, Math.min(1, (fallSpeed - 4.5) / 9));
      // ciężkie lądowanie: stęknięcie zbroi i stuk butów o podłoże
      this.game.audio?.land?.(this._surfaceUnderfoot(), Math.min(1.3, (fallSpeed - 4.5) / 6));
    }

    // granice obozowiska bandytów itp. — prosta kolizja z domami
    this._resolveBuildingCollisions();

    // animacje i atak
    this._animate(dt, moving, speed);

    // kroki w rytmie kroków — barwa zależna od podłoża
    const speedNow = Math.hypot(this.vel.x, this.vel.z);
    if (speedNow > 0.9) {
      const contact = Math.floor(this.walkPhase / Math.PI);
      if (contact !== this.lastFootstep) {
        this.lastFootstep = contact;
        this.game.audio?.step(this._surfaceUnderfoot(), { run: this.sprinting, speed: speedNow });
      }
    }

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
    if (this.state === 'attack' && this.stateTime > 0.52) {
      this.state = 'idle';
      this.lastAttackEnd = this.attackClock;
    }
    if (this.state === 'cast' && this.stateTime > 0.42) this.state = 'idle';
    if (this.state === 'hurt' && this.stateTime > 0.3) this.state = 'idle';

    this.syncModel();
  }

  _blockCovers(source) {
    if (!source || typeof source === 'string') return true;
    const ex = source.pos?.x ?? source.x;
    const ez = source.pos?.z ?? source.z;
    if (ex === undefined) return true;
    const dx = ex - this.pos.x;
    const dz = ez - this.pos.z;
    const len = Math.hypot(dx, dz) || 1;
    const forward = new THREE.Vector3(Math.sin(this.yaw), 0, Math.cos(this.yaw));
    return forward.x * (dx / len) + forward.z * (dz / len) > -0.15;
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
      const sneakAttack = !e.aggro && this.sneaking;
      let dmg = this.attackPower * (this.combo === 2 ? 1.35 : i === 0 ? 1 : 0.75);
      dmg *= this.damageMultiplier(e, this.combo);
      dmg *= 0.9 + Math.random() * 0.2;
      if (crit) dmg *= 1.75;
      if (sneakAttack) {
        dmg *= 1;
        this.game.ui?.floatNumber(e.pos.clone().add(new THREE.Vector3(0, 1.9, 0)), 'CIOS W PLECY', 'crit');
      }
      e.takeDamage(dmg, { crit, source: 'Gracz', knockback: this.combo === 2 ? 4.6 : 3.2 });
      this.stealth = false;
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

    // ---- model z zewnątrz: animacje odtwarza mixer, nie kości proceduralne ----
    if (this.rig) {
      const state = animStateFor({
        state: this.state,
        combo: this.combo,
        moving,
        run: this.sprinting || speedMag > this.moveSpeed * 0.82,
        blocking: this.blocking,
        dead: this.hp <= 0,
        talking: false,
      });
      const rate = state === 'walk'
        ? clamp(speedMag / 1.7, 0.55, 1.7)
        : state === 'run' ? clamp(speedMag / 5.2, 0.7, 1.5) : 1;
      this.rig.play(state, { rate });
      this.rig.update(dt);
      if (this.shadowBlob) {
        const ground = heightAt(this.pos.x, this.pos.z);
        this.shadowBlob.position.y = ground - this.pos.y + 0.05;
        this.shadowBlob.visible = this.hp > 0;
      }
      if (this.invuln > 0 && this.state !== 'dodge') {
        this.model.visible = Math.floor(this.invuln * 18) % 2 === 0;
      } else {
        this.model.visible = true;
      }
      return;
    }

    const norm = clamp(speedMag / Math.max(3, this.moveSpeed), 0, 2.2);
    // Kadencja wynika z POKONANEGO DYSTANSU, nie z czasu — stopy nie ślizgają
    // się po ziemi przy zmianie prędkości (największy „tell” sztucznej animacji).
    if (moving) {
      this.walkPhase += dt * phaseRate(speedMag, this.sprinting || norm > 0.78);
    } else {
      this.walkPhase += dt * 0.6;
    }
    this.animPhase = (this.animPhase ?? 0) + dt;

    const { body, arms, legs, head, cloak } = this.parts;
    const forearms = this.parts.forearms ?? [];
    const shins = this.parts.shins ?? [];

    // delikatne oddychanie i balans ciałem (zawsze)
    const idleBreath = Math.sin(this.animPhase * 1.7) * 0.012;
    let bodyY = idleBreath;
    let bodyPitch = 0;
    let bodyRoll = 0;
    let bodyYaw = 0;

    if (this.state === 'attack') {
      // zamach → cięcie → wyhamowanie; łokieć i bark pracują razem
      const T = 0.52;
      const t = clamp(this.stateTime / T, 0, 1);
      const wind = clamp(t / 0.28, 0, 1);            // 0..1 podniesienie broni
      const strike = clamp((t - 0.28) / 0.34, 0, 1);  // 0..1 cięcie
      const recover = clamp((t - 0.62) / 0.38, 0, 1);
      const dir = this.combo === 1 ? -1 : 1;
      const swing = Math.sin(strike * Math.PI);

      if (this.combo === 2) {
        // cios kończący: miecz idzie nad głową i spada pionowo w dół
        arms[1].rotation.x = -2.9 * wind + 3.4 * strike - 0.5 * recover;
        arms[1].rotation.z = -0.12 * wind;
        arms[1].rotation.y = -0.1 * wind;
        if (forearms[1]) forearms[1].rotation.x = -1.25 * wind + 0.5 * strike;
        arms[0].rotation.x = -2.2 * wind + 2.4 * strike;
        arms[0].rotation.z = 0.3 * wind;
        if (forearms[0]) forearms[0].rotation.x = -1.0 * wind + 0.4 * strike;
        bodyPitch = 0.3 * strike - 0.26 * wind;
        bodyYaw = -0.08 * swing;
        bodyRoll = 0.06 * swing;
        bodyY = -0.09 * strike;
      } else if (this.combo === 1) {
        // cięcie poziome z biodra
        arms[1].rotation.x = -1.4 * wind + 1.9 * strike - 0.6 * recover;
        arms[1].rotation.z = -0.9 * wind + 0.9 * strike;
        arms[1].rotation.y = 0.9 * wind * dir - 1.1 * strike * dir;
        if (forearms[1]) forearms[1].rotation.x = -0.6 * wind + (0.3 - 0.7 * strike);
        arms[0].rotation.x = 0.2 * wind + 0.3 * strike;
        arms[0].rotation.z = 0.55 * wind;
        if (forearms[0]) forearms[0].rotation.x = -0.5 * wind;
        bodyYaw = -0.85 * swing * dir;
        bodyPitch = 0.06 * strike;
        bodyRoll = -0.16 * swing;
        bodyY = -0.02 * strike;
      } else {
        // pierwszy cios: skośne cięcie z prawego ramienia
        arms[1].rotation.x = -2.1 * wind + 3.1 * strike - 0.8 * recover;
        arms[1].rotation.z = (-0.55 * wind + 0.25 * strike) * dir;
        arms[1].rotation.y = 0.5 * wind * dir - 0.7 * strike * dir;
        if (forearms[1]) forearms[1].rotation.x = -0.9 * wind + (0.35 - 0.9 * strike);
        arms[0].rotation.x = 0.35 * wind + 0.5 * strike - 0.3 * recover;
        arms[0].rotation.z = 0.35 * wind;
        if (forearms[0]) forearms[0].rotation.x = -0.7 * wind - 0.2 * strike;
        bodyYaw = -0.55 * swing;
        bodyPitch = 0.12 * strike - 0.1 * wind;
        bodyRoll = -0.12 * swing;
        bodyY = -0.03 * strike;
      }

      legs[0].rotation.x = 0.28 * wind - 0.15 * strike;
      legs[1].rotation.x = -0.22 * wind + 0.2 * strike;
      if (shins[0]) shins[0].rotation.x = -0.35 * strike;
      if (shins[1]) shins[1].rotation.x = -0.2 * wind;
      head.rotation.y = 0.25 * swing * dir;
      head.rotation.x = -0.06 * wind;
    } else if (this.state === 'dodge') {
      const t = clamp(this.stateTime / 0.42, 0, 1);
      body.rotation.x = -t * Math.PI * 2;
      arms[0].rotation.x = -1.2;
      arms[1].rotation.x = -1.2;
      if (forearms[0]) forearms[0].rotation.x = -1.0;
      if (forearms[1]) forearms[1].rotation.x = -1.0;
      legs[0].rotation.x = 0.9;
      legs[1].rotation.x = 0.55;
      if (shins[0]) shins[0].rotation.x = -1.3;
      if (shins[1]) shins[1].rotation.x = -1.0;
      body.position.y = Math.sin(t * Math.PI) * 0.35;
    } else if (this.state === 'cast') {
      const t = clamp(this.stateTime / 0.42, 0, 1);
      const up = Math.sin(t * Math.PI) * 1.1;
      arms[0].rotation.x = -2.4 * up;
      arms[1].rotation.x = -2.4 * up;
      arms[0].rotation.z = 0.5 * up;
      arms[1].rotation.z = -0.5 * up;
      if (forearms[0]) forearms[0].rotation.x = -0.5 * up;
      if (forearms[1]) forearms[1].rotation.x = -0.5 * up;
      bodyPitch = -0.12 * up;
      arms[0].rotation.x = -2.4 * up;
    } else if (this.blocking) {
      // postawa blokująca: tarcza/ramię do przodu, nogi w rozkroku
      const brace = this.parryWindow > 0 ? 1 : 0.62;
      arms[0].rotation.x = damp(arms[0].rotation.x, -1.15 * brace, 18, dt);
      arms[0].rotation.z = damp(arms[0].rotation.z, 0.62, 16, dt);
      if (forearms[0]) forearms[0].rotation.x = damp(forearms[0].rotation.x, -1.35, 18, dt);
      arms[1].rotation.x = damp(arms[1].rotation.x, -0.55 * brace, 16, dt);
      arms[1].rotation.z = damp(arms[1].rotation.z, -0.35, 16, dt);
      if (forearms[1]) forearms[1].rotation.x = damp(forearms[1].rotation.x, -1.05, 16, dt);
      legs[0].rotation.x = damp(legs[0].rotation.x, 0.26, 12, dt);
      legs[1].rotation.x = damp(legs[1].rotation.x, -0.2, 12, dt);
      if (shins[0]) shins[0].rotation.x = damp(shins[0].rotation.x, -0.3, 12, dt);
      if (shins[1]) shins[1].rotation.x = damp(shins[1].rotation.x, -0.24, 12, dt);
      bodyPitch = 0.14;
      bodyY = -0.06;
    } else if (this.state === 'hurt') {
      const t = clamp(this.stateTime / 0.3, 0, 1);
      bodyPitch = 0.35 * Math.sin(t * Math.PI);
      arms[0].rotation.x = -0.4;
      arms[1].rotation.x = -0.2;
      if (shins[0]) shins[0].rotation.x = -0.3 * Math.sin(t * Math.PI);
      legs[0].rotation.x = -0.2 * Math.sin(t * Math.PI);
    } else if (moving) {
      // ---- chód / bieg -----------------------------------------------------
      const amp = clamp(0.32 + norm * 0.5, 0.35, 1.15);
      const ph = this.walkPhase;
      const sinL = Math.sin(ph);
      const sinR = Math.sin(ph + Math.PI);

      // cykl chodu: biodro, kolano i staw skokowy (pięta → płasko → palce)
      applyGait(this.parts, ph, { amp: clamp(amp, 0.4, 1.2), run: this.sprinting || norm > 0.78 });

      // stopy „czują” nierówności gruntu pod sobą
      const groundNow = heightAt(this.pos.x, this.pos.z);
      const lat = 0.18;
      const lifts = [0, 1].map((i) => {
        const sx = i === 0 ? -1 : 1;
        const lx = Math.cos(this.yaw) * sx * lat + Math.sin(this.yaw) * 0.14;
        const lz = -Math.sin(this.yaw) * sx * lat + Math.cos(this.yaw) * 0.14;
        return heightAt(this.pos.x + lx, this.pos.z + lz) - groundNow;
      });
      applyFootIK(this.parts, lifts);

      // ręce w przeciwfazie do nóg, łokcie lekko zgięte
      arms[0].rotation.x = sinR * amp * 0.62;
      arms[1].rotation.x = sinL * amp * 0.62;
      arms[0].rotation.z = 0.1 + Math.abs(sinR) * 0.04;
      arms[1].rotation.z = -0.1 - Math.abs(sinL) * 0.04;
      if (forearms[0]) forearms[0].rotation.x = -0.35 - Math.max(0, sinR) * 0.3;
      if (forearms[1]) forearms[1].rotation.x = -0.35 - Math.max(0, sinL) * 0.3;

      // biodra: podskok, kołysanie na boki, skręt tułowia
      bodyY = Math.abs(Math.sin(ph)) * (0.03 + norm * 0.035) - 0.015;
      bodyRoll = Math.sin(ph) * 0.035 * amp;
      bodyYaw = -sinL * 0.11 * amp;
      bodyPitch = 0.03 + norm * 0.07;
      // mostek i barki pracują przeciwnie do bioder
      if (arms[0]) arms[0].rotation.y = sinL * 0.12 * amp;
      if (arms[1]) arms[1].rotation.y = sinL * 0.12 * amp;
      head.rotation.y = sinL * 0.05;
      head.rotation.x = -0.02 - norm * 0.03;
    } else {
      // ---- stanie ----------------------------------------------------------
      const idle = Math.sin(this.animPhase * 1.15);
      const shift = Math.sin(this.animPhase * 0.42);
      legs[0].rotation.x = damp(legs[0].rotation.x, 0.02, 8, dt);
      legs[1].rotation.x = damp(legs[1].rotation.x, -0.02, 8, dt);
      if (shins[0]) shins[0].rotation.x = damp(shins[0].rotation.x, -0.04, 8, dt);
      if (shins[1]) shins[1].rotation.x = damp(shins[1].rotation.x, -0.02, 8, dt);
      arms[0].rotation.x = damp(arms[0].rotation.x, idle * 0.05 - 0.05, 5, dt);
      arms[1].rotation.x = damp(arms[1].rotation.x, -idle * 0.04 - 0.05, 5, dt);
      arms[0].rotation.z = damp(arms[0].rotation.z, 0.12 + shift * 0.02, 5, dt);
      arms[1].rotation.z = damp(arms[1].rotation.z, -0.12 - shift * 0.02, 5, dt);
      if (forearms[0]) forearms[0].rotation.x = damp(forearms[0].rotation.x, -0.22, 5, dt);
      if (forearms[1]) forearms[1].rotation.x = damp(forearms[1].rotation.x, -0.18, 5, dt);
      bodyRoll = shift * 0.018;
      bodyYaw = damp(body.rotation.y, 0, 4, dt) * 0 + shift * 0.02;
      head.rotation.y = damp(head.rotation.y, shift * 0.12, 3, dt);
      head.rotation.x = damp(head.rotation.x, idle * 0.02, 3, dt);
    }

    // ---- skradanie: obniżona, przygarbiona postawa ------------------------
    this._crouch = damp(this._crouch ?? 0, this.sneaking ? 1 : this.stealth ? 0.35 : 0, 7, dt);
    const c = this._crouch;
    if (c > 0.01) {
      legs[0].rotation.x += 0.5 * c;
      legs[1].rotation.x += 0.44 * c;
      if (shins[0]) shins[0].rotation.x -= 0.95 * c;
      if (shins[1]) shins[1].rotation.x -= 0.88 * c;
      arms[0].rotation.x -= 0.34 * c;
      arms[1].rotation.x -= 0.3 * c;
      if (forearms[0]) forearms[0].rotation.x -= 0.45 * c;
      if (forearms[1]) forearms[1].rotation.x -= 0.4 * c;
      bodyPitch += 0.3 * c;
      bodyY -= 0.24 * c;
      head.rotation.x -= 0.12 * c;
    }

    // ---- adaptacja do terenu, przechył w zakręcie, lądowanie --------------
    // Bohater „stoi” na zboczu: przód/tył i boki regulują pochylenie tułowia.
    const fwdX = Math.sin(this.yaw);
    const fwdZ = Math.cos(this.yaw);
    const sideX = Math.cos(this.yaw);
    const sideZ = -Math.sin(this.yaw);
    const probe = 1.15;
    const slopeF = (heightAt(this.pos.x + fwdX * probe, this.pos.z + fwdZ * probe)
      - heightAt(this.pos.x - fwdX * probe, this.pos.z - fwdZ * probe)) / (probe * 2);
    const slopeR = (heightAt(this.pos.x + sideX * probe, this.pos.z + sideZ * probe)
      - heightAt(this.pos.x - sideX * probe, this.pos.z - sideZ * probe)) / (probe * 2);
    this._slopeF = damp(this._slopeF ?? 0, clamp(slopeF, -0.55, 0.55), 6, dt);
    this._slopeR = damp(this._slopeR ?? 0, clamp(slopeR, -0.45, 0.45), 6, dt);
    bodyPitch += -this._slopeF * 0.75;
    bodyRoll += this._slopeR * 0.6;

    // przechył w zakręcie — ciało „idzie” za kierunkiem, zamiast się teleportować
    const yawRate = angleDelta(this._prevYaw ?? this.yaw, this.yaw) / Math.max(dt, 1e-4);
    this._prevYaw = this.yaw;
    const bankTarget = clamp(-yawRate * 0.075, -0.3, 0.3) * clamp(norm, 0, 1.2);
    this._bank = damp(this._bank ?? 0, bankTarget, 7, dt);
    bodyRoll += this._bank;

    // sprint: wyraźny skłon do przodu
    if (this.sprinting && moving) bodyPitch += 0.1 + norm * 0.04;

    // lądowanie: kolana amortyzują, tułów opada
    if (this._land > 0) {
      this._land = Math.max(0, this._land - dt * 2.6);
      const k = Math.sin(clamp(this._land, 0, 1) * Math.PI);
      bodyY -= 0.18 * k;
      bodyPitch += 0.14 * k;
      legs[0].rotation.x += 0.3 * k;
      legs[1].rotation.x += 0.24 * k;
      if (shins[0]) shins[0].rotation.x -= 0.55 * k;
      if (shins[1]) shins[1].rotation.x -= 0.45 * k;
    }

    // wygładzenie tułowia — bez tego przejścia między stanami „strzelają”
    body.rotation.y = damp(body.rotation.y, bodyYaw, 14, dt);
    body.rotation.z = damp(body.rotation.z, bodyRoll, 14, dt);
    if (this.state !== 'dodge') body.rotation.x = damp(body.rotation.x, bodyPitch, 14, dt);
    body.position.y = bodyY;

    if (cloak) {
      const flutter = clamp(speedMag * 0.06, 0, 0.4);
      cloak.rotation.x = Math.PI + Math.sin(this.walkPhase * 0.9) * 0.04 - flutter * 0.5;
      cloak.rotation.z = Math.sin(this.walkPhase * 0.6) * 0.03;
    }

    // peleryna — im szybciej biegniesz, tym mocniej odchyla się do tyłu
    if (this.cape) {
      const flutter = clamp(speedMag * 0.075, 0, 0.5);
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

    // migotanie nietykalności
    if (this.invuln > 0 && this.state !== 'dodge') {
      this.model.visible = Math.floor(this.invuln * 18) % 2 === 0;
    } else {
      this.model.visible = true;
    }
  }

  /** Rodzaj podłoża pod stopami — do barwy kroków. */
  _surfaceUnderfoot() {
    const { x, z } = this.pos;
    const depth = waterDepth(x, z);
    if (depth > 0.06) return 'water';
    if (distanceToPath(x, z) < 5) return 'dirt';
    const h = heightAt(x, z);
    if (slopeAt(x, z) > 0.85) return 'stone';
    if (h > 200) return 'snow';
    return 'grass';
  }

  _animateDeath(dt) {
    if (this.rig) {
      this.rig.play('death', { fade: 0.18 });
      this.rig.update(dt);
      if (this.shadowBlob) this.shadowBlob.visible = false;
      return;
    }
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
      perks: this.perks.serialize(),
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
    this.perks.load(data.perks);
    this.perkPoints = this.perks.points;
    this.inventory.load(data.inventory);
    this.recalc();
    this.hp = data.hp ?? this.maxHP;
    this.mana = data.mana ?? this.maxMana;
    this.stamina = this.maxStamina;
    if (data.pos) this.pos.set(data.pos[0], heightAt(data.pos[0], data.pos[1]), data.pos[1]);
    this.syncModel();
  }
}
