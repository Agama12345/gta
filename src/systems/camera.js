import * as THREE from 'three';
import { clamp, damp, lerp } from '../core/utils.js';
import { heightAt } from '../world/terrain.js';

// Kamera trzeciej osoby z kolizją z terenem i wstrząsami.
export class ThirdPersonCamera {
  constructor(camera) {
    this.camera = camera;
    this.yaw = Math.PI;
    this.pitch = 0.24;
    this.distance = 5.4;
    this.targetDistance = 5.4;
    this.pivot = new THREE.Vector3();
    this.shake = 0;
    this.shakeTime = 0;
    this.lookTarget = new THREE.Vector3();
    this.offset = new THREE.Vector3();
    this.initialized = false;
    this.fov = 62;
    this.closeness = 1;
    this.currentDistance = 5.4;
  }

  look(dx, dy, sens = 0.0022) {
    this.yaw -= dx * sens;
    this.pitch = clamp(this.pitch + dy * sens, -0.42, 1.02);
  }

  addShake(amount) {
    this.shake = Math.min(1.4, this.shake + amount);
  }

  update(dt, playerPos, playerVel = 0, zoomBias = 0) {
    return this._update(dt, playerPos, playerVel, zoomBias);
  }

  _update(dt, playerPos, playerVel = 0, zoomBias = 0) {
    // lekki zoom przy biegu
    this.targetDistance = lerp(this.targetDistance, 5.1 + Math.min(2.4, playerVel * 0.14) + zoomBias, 1 - Math.exp(-3 * dt));
    this.distance = damp(this.distance, this.targetDistance, 5.5, dt);

    const pivotTarget = new THREE.Vector3(playerPos.x, playerPos.y + 1.55, playerPos.z);
    if (!this.initialized) {
      this.pivot.copy(pivotTarget);
      this.initialized = true;
    }
    this.pivot.x = damp(this.pivot.x, pivotTarget.x, 14, dt);
    this.pivot.y = damp(this.pivot.y, pivotTarget.y, 9, dt);
    this.pivot.z = damp(this.pivot.z, pivotTarget.z, 14, dt);

    const cosP = Math.cos(this.pitch);
    const desired = new THREE.Vector3(
      this.pivot.x + Math.sin(this.yaw) * cosP * this.distance,
      this.pivot.y + Math.sin(this.pitch) * this.distance + 0.35,
      this.pivot.z + Math.cos(this.yaw) * cosP * this.distance
    );

    // kolizja z terenem
    const ground = heightAt(desired.x, desired.z) + 0.7;
    if (desired.y < ground) desired.y = ground;

    // kolizja z przeszkodami (domy, skały) — kamera nie wchodzi w ściany
    if (this.colliders && this.colliders.length) {
      const dir = desired.clone().sub(this.pivot);
      const steps = 7;
      let allowed = 1;
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const px = this.pivot.x + dir.x * t;
        const pz = this.pivot.z + dir.z * t;
        const py = heightAt(px, pz) + 0.5;
        let blocked = py > this.pivot.y + dir.y * t + 0.1;
        if (!blocked) {
          for (const c of this.colliders) {
            // tylko duże przeszkody (domy, mury) — drobne meble nie szarpią kamerą
            if (c.r < 1.6) continue;
            const dx = px - c.x;
            const dz = pz - c.z;
            if (dx * dx + dz * dz < c.r * c.r * 0.9) {
              blocked = true;
              break;
            }
          }
        }
        if (blocked) {
          allowed = Math.max(0.34, (i - 1) / steps);
          break;
        }
      }
      if (allowed < 1) {
        this.closeness = allowed;
        desired.copy(this.pivot).add(dir.multiplyScalar(allowed));
        const g2 = heightAt(desired.x, desired.z) + 0.6;
        if (desired.y < g2) desired.y = g2;
      } else {
        this.closeness = 1;
      }
    }

    // wzniesienia między graczem a kamerą — podnieś kamerę, żeby nie patrzyła w zbocze
    const rayDir = desired.clone().sub(this.pivot);
    let lift = 0;
    for (let i = 1; i <= 8; i++) {
      const t = i / 8;
      const px = this.pivot.x + rayDir.x * t;
      const pz = this.pivot.z + rayDir.z * t;
      const need = heightAt(px, pz) + 0.9 - (this.pivot.y + rayDir.y * t);
      if (need > 0) lift = Math.max(lift, need / Math.max(0.25, t));
    }
    const targetLift = Math.min(lift, 14);
    this.lift = damp(this.lift ?? 0, targetLift, targetLift > (this.lift ?? 0) ? 7 : 3.5, dt);
    desired.y += this.lift;

    this.camera.position.copy(desired);
    this.currentDistance = this.camera.position.distanceTo(this.pivot);

    // wstrząsy
    if (this.shake > 0.001) {
      this.shakeTime += dt;
      const s = this.shake;
      this.camera.position.x += Math.sin(this.shakeTime * 46) * s * 0.16;
      this.camera.position.y += Math.cos(this.shakeTime * 39) * s * 0.13;
      this.camera.position.z += Math.sin(this.shakeTime * 53) * s * 0.16;
      this.shake = Math.max(0, this.shake - dt * 2.6);
    }

    this.lookTarget.set(
      this.pivot.x - Math.sin(this.yaw) * 1.2,
      this.pivot.y + Math.sin(-this.pitch) * 0.4,
      this.pivot.z - Math.cos(this.yaw) * 1.2
    );
    this.camera.lookAt(this.lookTarget);
    this.camera.rotation.z += Math.sin(this.shakeTime * 21) * this.shake * 0.05;

    if (this.camera.fov !== this.fov) {
      this.camera.fov = damp(this.camera.fov, this.fov, 4, dt);
      this.camera.updateProjectionMatrix();
    }
  }

  forward() {
    return new THREE.Vector3(-Math.sin(this.yaw), 0, -Math.cos(this.yaw));
  }

  right() {
    return new THREE.Vector3(Math.cos(this.yaw), 0, -Math.sin(this.yaw));
  }
}
