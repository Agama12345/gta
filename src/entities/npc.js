import * as THREE from 'three';
import { dampAngle, dist2, TAU } from '../core/utils.js';
import { heightAt, LOCATIONS, distanceToPath } from '../world/terrain.js';
import { makeHumanoid } from '../world/models.js';
import { applyGait, applyFootIK, phaseRate, applyTorsoCounter } from '../core/gait.js';
import { CharacterRig, animStateFor } from './characterRig.js';
import { Cape, CAPE_COLORS } from './cape.js';

export class NPC {
  constructor(game, id, def) {
    this.game = game;
    this.id = id;
    this.def = def;
    this.name = def.name;
    this.role = def.role;
    this.radius = def.radius ?? 3.6;
    this.baseY = heightAt(def.pos[0], def.pos[1]);
    this.pos = new THREE.Vector3(def.pos[0], this.baseY, def.pos[1]);
    this.yaw = def.rot ?? 0;
    this.phase = Math.random() * TAU;
    this.visible = !def.hidden;
    this.walkPhase = Math.random() * TAU;
    this.speed = def.speed ?? 1.5;
    this.basePos = this.pos.clone();
    // wieczorem każdy wraca w stronę domostw (kilka metrów w głąb osady)
    this.nightPos = this._makeNightSpot(def, this.basePos);
    this.moving = false;
    // praca przy warsztacie: kowal uderza młotem, zielarka sięga po zioła
    this.workAnim = def.workAnim ?? (id === 'borys' ? 'attack' : id === 'marena' ? 'use' : id === 'rybak' ? 'cast' : null);
    this._workTimer = 6 + Math.random() * 10;
    this._working = 0;

    // Model mieszkańca z zewnątrz (jeśli człowiek taki dostarczył)
    const customModel = game.assets?.custom?.npcs?.[id];
    if (customModel) {
      try {
        this.rig = new CharacterRig(customModel, {
          targetHeight: def.visual?.bulk ? 1.85 * Math.min(1.15, def.visual.bulk) : 1.78,
          name: def.name,
          library: customModel.library,
          tint: def.visual,
          hideParts: customModel.hideParts,
        });
        this.model = this.rig.group;
        this.parts = null;
        // peleryna z ruchem tkaniny (zjawy nie noszą płaszczy — są zjawami)
        if (!def.ghost) {
          try {
            const color = CAPE_COLORS[id] ?? def.visual?.cloak ?? '#43392c';
            this.cape = new Cape(this.rig, { color, length: 0.98, width: 0.58 });
          } catch {
            this.cape = null;
          }
        }
      } catch (err) {
        console.warn(`Model mieszkańca „${def.name}” nie wystartował`, err);
        this.rig = null;
      }
    }
    if (!this.model) {
      const built = makeHumanoid(def.visual);
      this.model = built.group;
      this.parts = built.parts;
    }
    this.model.position.copy(this.pos);
    this.model.rotation.y = this.yaw;
    this.model.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
        if (def.ghost && o.material) {
          o.material = o.material.clone();
          o.material.transparent = true;
          o.material.opacity = 0.42;
          if (o.material.emissive) {
            o.material.emissive = new THREE.Color('#4f8fa8');
            o.material.emissiveIntensity = 0.5;
          }
          o.castShadow = false;
        }
      }
    });
    this.model.visible = this.visible;

    if (def.ghost) {
      this.light = new THREE.PointLight('#7fd8e8', 2.4, 8, 2);
      this.light.position.y = 1.4;
      this.model.add(this.light);
    }

    game.scene.add(this.model);
  }

  _makeNightSpot(def, from) {
    const ref = def.homeRef
      ? { x: def.homeRef[0], z: def.homeRef[1] }
      : LOCATIONS.village;
    const dx = ref.x - from.x;
    const dz = ref.z - from.z;
    const d = Math.hypot(dx, dz) || 1;
    const step = def.nightRadius ?? 5.5;
    const x = from.x + (dx / d) * step + Math.sin(this.phase * 3.1) * 1.2;
    const z = from.z + (dz / d) * step + Math.cos(this.phase * 2.3) * 1.2;
    return new THREE.Vector3(x, heightAt(x, z), z);
  }

  /** O której postać idzie spać (nie dotyczy duchów i nocnych stworzeń). */
  _isNight(hour) {
    return hour >= 21.5 || hour < 5.5;
  }

  setVisible(v) {
    this.visible = v;
    this.model.visible = v;
  }

  update(dt, player) {
    // ---- rytm dnia: w dzień przy swoim warsztacie, nocą wraca pod dach ----
    const hour = this.game.dayNight?.hour ?? 12;
    if (!this.def.ghost && !this.def.noSchedule) {
      const target = this._isNight(hour) ? this.nightPos : this.basePos;
      const dx = target.x - this.pos.x;
      const dz = target.z - this.pos.z;
      const dist = Math.hypot(dx, dz);
      this.moving = dist > 0.35;
      if (this.moving) {
        const step = Math.min(dist, this.speed * dt);
        this.pos.x += (dx / dist) * step;
        this.pos.z += (dz / dist) * step;
        this.pos.y = heightAt(this.pos.x, this.pos.z);
        this.yaw = dampAngle(this.yaw, Math.atan2(dx, dz), 6, dt);
        // faza z dystansu — krok odpowiada temu, jak szybko postać naprawdę idzie
        this.walkPhase += dt * phaseRate(this.speed, false);

        // własne kroki mieszkańca — świat brzmi żywo, a nie tylko pod nogami gracza
        const contact = Math.floor(this.walkPhase / Math.PI);
        if (contact !== this._lastStep) {
          this._lastStep = contact;
          const audio = this.game.audio;
          if (audio?.step) {
            const surface = this._surface();
            audio.step(surface, {
              pan: audio._panFor?.(this.pos.x, this.pos.z) ?? 0,
              gain: Math.max(0.12, audio.gainFor?.(this.pos.x, this.pos.z) ?? 1),
            });
          }
        }
      }
      this.model.position.copy(this.pos);
    }

    const d = dist2(this.pos.x, this.pos.z, player.pos.x, player.pos.z);
    if (d < 9 && !this.moving) {
      const targetYaw = Math.atan2(player.pos.x - this.pos.x, player.pos.z - this.pos.z);
      this.yaw = dampAngle(this.yaw, targetYaw, 3, dt);
    }
    this.model.rotation.y = this.yaw;
    this.phase += dt;

    if (this.rig) {
      this.cape?.update(dt, {
        speed: this.moving ? this.speed : 0,
        yaw: this.yaw,
        wind: 0.3 + (this.game.weather?.rain ?? 0) * 0.8,
      });
      const talking = this.game.dialogue?.npcId === this.id;
      // trwająca „czynność” (uderzenie młotem, sięgnięcie po zioła) ma pierwszeństwo
      if (this._working > 0) {
        this._working -= dt;
        this.rig.update(dt);
        if (this._working <= 0) this.rig.play('idle', { fade: 0.3 });
        return;
      }
      this._workTimer -= dt;
      if (!this.moving && !talking && this.workAnim && this._workTimer <= 0 && this.rig.has(this.workAnim)) {
        this._workTimer = 9 + Math.random() * 12;
        this._working = (this.rig.clips[this.workAnim]?.duration ?? 1.2) * 0.92;
        this.rig.play(this.workAnim, { fade: 0.18, reset: true });
        this.rig.update(dt);
        return;
      }
      this.rig.play(animStateFor({ moving: this.moving, run: false, talking: !!talking }), {
        speed: this.moving ? this.speed : null,
        fade: talking ? 0.35 : 0.22,
      });
      this.rig.update(dt);
      return;
    }

    const { arms, body, head } = this.parts;
    const breathing = Math.sin(this.phase * 1.4) * 0.018;
    body.position.y = breathing;
    if (this.def.ghost) {
      body.position.y = Math.sin(this.phase * 0.9) * 0.14;
      body.rotation.z = Math.sin(this.phase * 0.5) * 0.03;
      arms[0].rotation.z = 0.35 + Math.sin(this.phase * 0.8) * 0.12;
      arms[1].rotation.z = -0.35 - Math.sin(this.phase * 0.8 + 1) * 0.12;
    } else {
      arms[0].rotation.z = 0.06 + Math.sin(this.phase * 0.7) * 0.04;
      arms[1].rotation.z = -0.06 - Math.sin(this.phase * 0.7 + 0.5) * 0.04;
      arms[0].rotation.x = Math.sin(this.phase * 0.55) * 0.08;
      arms[1].rotation.x = -Math.sin(this.phase * 0.55) * 0.06;
    }
    head.rotation.y = Math.sin(this.phase * 0.4) * 0.22;
    head.rotation.x = Math.sin(this.phase * 0.33) * 0.05;

    // krok, gdy postać idzie na nocleg lub wraca do pracy
    const legs = this.parts.legs ?? [];
    const shins = this.parts.shins ?? [];
    const forearms = this.parts.forearms ?? [];
    if (legs.length >= 2) {
      if (this.moving) {
        // ten sam silnik chodu co u bohatera — pełny cykl stopy, nie tylko sinusoida
        applyGait(this.parts, this.walkPhase, { amp: 0.8 });
        const groundNow = heightAt(this.pos.x, this.pos.z);
        const lat = 0.18;
        const lifts = [0, 1].map((i) => {
          const sx = i === 0 ? -1 : 1;
          const lx = Math.cos(this.yaw) * sx * lat + Math.sin(this.yaw) * 0.12;
          const lz = -Math.sin(this.yaw) * sx * lat + Math.cos(this.yaw) * 0.12;
          return heightAt(this.pos.x + lx, this.pos.z + lz) - groundNow;
        });
        applyFootIK(this.parts, lifts);
        applyTorsoCounter(this.parts, this.walkPhase, 0.8);

        const swing = Math.sin(this.walkPhase) * 0.42;
        arms[0].rotation.x = -swing;
        arms[1].rotation.x = swing;
        if (forearms[0]) forearms[0].rotation.x = -0.28 - Math.max(0, swing) * 0.5;
        if (forearms[1]) forearms[1].rotation.x = -0.28 - Math.max(0, -swing) * 0.5;
        head.rotation.z = 0;
      } else {
        legs[0].rotation.x = dampAngle(legs[0].rotation.x, 0, 6, dt);
        legs[1].rotation.x = dampAngle(legs[1].rotation.x, 0, 6, dt);
        if (shins[0]) shins[0].rotation.x = dampAngle(shins[0].rotation.x, -0.04, 6, dt);
        if (shins[1]) shins[1].rotation.x = dampAngle(shins[1].rotation.x, -0.02, 6, dt);
      }
    }
  }

  /** Podłoże pod stopami mieszkańca — do barwy kroków. */
  _surface() {
    const { x, z } = this.pos;
    if (distanceToPath(x, z) < 4) return 'dirt';
    if (heightAt(x, z) > 200) return 'snow';
    return 'grass';
  }

  get interactPos() {
    return new THREE.Vector3(this.pos.x, this.pos.y + 1.0, this.pos.z);
  }
}
