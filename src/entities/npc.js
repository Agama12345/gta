import * as THREE from 'three';
import { damp, dampAngle, dist2, TAU } from '../core/utils.js';
import { heightAt } from '../world/terrain.js';
import { makeHumanoid } from '../world/models.js';

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

    const built = makeHumanoid(def.visual);
    this.model = built.group;
    this.parts = built.parts;
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

  setVisible(v) {
    this.visible = v;
    this.model.visible = v;
  }

  update(dt, player) {
    const d = dist2(this.pos.x, this.pos.z, player.pos.x, player.pos.z);
    if (d < 9) {
      const targetYaw = Math.atan2(player.pos.x - this.pos.x, player.pos.z - this.pos.z);
      this.yaw = dampAngle(this.yaw, targetYaw, 3, dt);
    }
    this.model.rotation.y = this.yaw;
    this.phase += dt;

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
  }

  get interactPos() {
    return new THREE.Vector3(this.pos.x, this.pos.y + 1.0, this.pos.z);
  }
}
