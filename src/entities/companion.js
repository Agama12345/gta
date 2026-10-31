import * as THREE from 'three';
import { clamp, damp, dampAngle } from '../core/utils.js';
import { makeWolf } from '../world/models.js';
import { heightAt, isWater, waterLevelAt } from '../world/terrain.js';

/**
 * Szara — wilczy towarzysz bohatera.
 *
 * Chodzi za graczem, warczy gdy w pobliżu jest wróg i rzuca się na niego,
 * gryząc co ~1,4 s. Jest nieśmiertelna (fabularnie: to duch watahy), więc nie
 * komplikuje walki — ma być ozdobą, wsparciem i żywym elementem świata.
 */
export class Companion {
  constructor(game) {
    this.game = game;
    this.group = new THREE.Group();
    this.name = 'Szara';

    const built = makeWolf(11);
    this.model = built.group;
    this.parts = built.parts;
    this.group.add(this.model);
    this.group.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });

    this.pos = new THREE.Vector3();
    this.vel = new THREE.Vector3();
    this.yaw = 0;
    this.phase = Math.random() * 10;
    this.state = 'follow';
    this.target = null;
    this.attackCooldown = 0;
    this.barkTimer = 6 + Math.random() * 6;
    this.sitBlend = 0;
    this.growlPulse = 0;

    this.blob = new THREE.Mesh(
      new THREE.CircleGeometry(0.55, 14),
      new THREE.MeshBasicMaterial({ color: '#000000', transparent: true, opacity: 0.22, depthWrite: false })
    );
    this.blob.rotation.x = -Math.PI / 2;
    this.group.add(this.blob);

    this._placeNearPlayer(true);
  }

  _placeNearPlayer(immediate = false) {
    const p = this.game.player;
    if (!p) return;
    const angle = (p.yaw ?? 0) + Math.PI * 0.65;
    const x = p.pos.x + Math.sin(angle) * 2.2;
    const z = p.pos.z + Math.cos(angle) * 2.2;
    this.pos.set(x, heightAt(x, z), z);
    if (immediate) this.group.position.copy(this.pos);
  }

  update(dt) {
    const player = this.game.player;
    if (!player || player.dead) {
      this._animate(dt, false);
      this.syncModel();
      return;
    }

    const dx = this.pos.x - player.pos.x;
    const dz = this.pos.z - player.pos.z;
    const distToPlayer = Math.hypot(dx, dz);

    // zgubiony? wraca obok gracza
    if (distToPlayer > 46) {
      this._placeNearPlayer(true);
      return;
    }

    // wybór celu: najbliższy żywy wróg w promieniu 14 m od gracza
    let best = null;
    let bestD = Infinity;
    for (const enemy of this.game.enemies?.list ?? []) {
      if (enemy.dead || !enemy.active) continue;
      const toPlayer = Math.hypot(enemy.pos.x - player.pos.x, enemy.pos.z - player.pos.z);
      if (toPlayer > 14) continue;
      const d = Math.hypot(enemy.pos.x - this.pos.x, enemy.pos.z - this.pos.z);
      if (d < bestD) {
        bestD = d;
        best = enemy;
      }
    }
    this.target = best;

    let moveX = 0;
    let moveZ = 0;
    let speed = 0;

    if (best) {
      this.state = 'hunt';
      const toX = best.pos.x - this.pos.x;
      const toZ = best.pos.z - this.pos.z;
      const len = Math.hypot(toX, toZ) || 1;
      const reach = 1.15 + (best.def?.radius ?? 0.5);
      if (len > reach) {
        speed = player.moveSpeed * 1.25;
        moveX = toX / len;
        moveZ = toZ / len;
      }
      this.attackCooldown = Math.max(0, this.attackCooldown - dt);
      if (len <= reach + 0.35 && this.attackCooldown <= 0) {
        this._bite(best);
      }
    } else if (distToPlayer > 2.9) {
      this.state = 'follow';
      const toX = player.pos.x - this.pos.x;
      const toZ = player.pos.z - this.pos.z;
      const len = Math.hypot(toX, toZ) || 1;
      const urgency = clamp((distToPlayer - 2.9) / 9, 0.25, 1.35);
      speed = player.moveSpeed * (0.85 + urgency * 0.6);
      moveX = toX / len;
      moveZ = toZ / len;
    } else {
      this.state = 'idle';
      this.barkTimer -= dt;
      if (this.barkTimer <= 0) {
        this.barkTimer = 14 + Math.random() * 16;
        this.growlPulse = 1;
      }
    }
    this.growlPulse = Math.max(0, this.growlPulse - dt * 1.5);

    // ruch z lekkim wyprzedzeniem i omijaniem głębokiej wody
    this.vel.x = damp(this.vel.x, moveX * speed, 9, dt);
    this.vel.z = damp(this.vel.z, moveZ * speed, 9, dt);

    if (speed > 0.01) {
      const nextX = this.pos.x + this.vel.x * dt;
      const nextZ = this.pos.z + this.vel.z * dt;
      const groundNext = heightAt(nextX, nextZ);
      const deep = isWater(nextX, nextZ) && groundNext < waterLevelAt(nextX, nextZ) - 0.8;
      if (!deep) {
        this.pos.x = nextX;
        this.pos.z = nextZ;
      } else {
        this.vel.multiplyScalar(0.2);
      }
    }

    // trzymanie dystansu — nie wchodzi graczowi w model
    if (distToPlayer < 1.5 && distToPlayer > 0.001) {
      const push = (1.5 - distToPlayer) / distToPlayer;
      this.pos.x += dx * push;
      this.pos.z += dz * push;
    }

    const ground = heightAt(this.pos.x, this.pos.z);
    this.pos.y = damp(this.pos.y, ground, 16, dt);

    const speedMag = Math.hypot(this.vel.x, this.vel.z);
    if (speedMag > 0.35) {
      const want = Math.atan2(this.vel.x, this.vel.z);
      this.yaw = dampAngle(this.yaw, want, 9, dt);
    } else if (best || distToPlayer < 6) {
      const target = best ? best.pos : player.pos;
      const want = Math.atan2(target.x - this.pos.x, target.z - this.pos.z);
      this.yaw = dampAngle(this.yaw, want, 4, dt);
    }

    this._animate(dt, speedMag > 0.35);
    this.syncModel();
  }

  _bite(enemy) {
    this.attackCooldown = 1.4;
    const player = this.game.player;
    const damage = 5 + (player?.level ?? 1) * 1.4 + Math.random() * 3;
    try {
      enemy.takeDamage(damage, { source: 'Szara', knockback: 1.4 });
    } catch {
      /* wróg mógł zginąć w tej samej klatce */
    }
    const hit = new THREE.Vector3(enemy.pos.x, enemy.pos.y + 0.7, enemy.pos.z);
    this.game.fx?.sparks?.(hit, '#cfd4c6', 5);
    this.game.audio?.hit?.(false);
    this.growlPulse = 1;
  }

  _animate(dt, moving) {
    const { body, head, legs, tail } = this.parts;
    this.phase += dt * (moving ? 10 : 2.4);

    if (moving) {
      const stride = Math.sin(this.phase) * 0.75;
      const stride2 = Math.sin(this.phase + Math.PI) * 0.75;
      legs[0].pivot.rotation.x = stride;
      legs[1].pivot.rotation.x = stride2;
      legs[2].pivot.rotation.x = stride2 * 0.9;
      legs[3].pivot.rotation.x = stride * 0.9;
      body.position.y = Math.abs(Math.sin(this.phase)) * 0.05;
      body.rotation.x = 0.04;
      this.sitBlend = damp(this.sitBlend, 0, 8, dt);
    } else {
      for (const leg of legs) leg.pivot.rotation.x = damp(leg.pivot.rotation.x, 0, 8, dt);
      body.position.y = damp(body.position.y, Math.sin(this.phase * 0.8) * 0.012, 6, dt);
      body.rotation.x = damp(body.rotation.x, 0, 6, dt);
      const wantSit = this.state === 'idle' ? 1 : 0;
      this.sitBlend = damp(this.sitBlend, wantSit, 2.2, dt);
      if (this.sitBlend > 0.02) {
        body.rotation.x = -0.05 * this.sitBlend;
        body.position.y -= 0.16 * this.sitBlend;
        legs[2].pivot.rotation.x = -1.2 * this.sitBlend;
        legs[3].pivot.rotation.x = -1.2 * this.sitBlend;
      }
    }

    // ogon merda szybciej, gdy pies jest zadowolony, i sztywnieje przy polowaniu
    const wagging = this.state === 'hunt' ? 0.25 : 1.9;
    tail.rotation.z = Math.sin(this.phase * wagging) * (this.state === 'hunt' ? 0.08 : 0.35);
    tail.rotation.x = -0.85 - (this.state === 'hunt' ? 0.25 : 0) + Math.sin(this.phase * 0.9) * 0.05;

    // głowa: patrzy na cel, przy warknięciu unosi pysk
    const look = this.state === 'hunt' ? 0.12 : 0;
    head.rotation.x = damp(head.rotation.x, -look - this.growlPulse * 0.2, 6, dt);
  }

  syncModel() {
    this.group.position.copy(this.pos);
    this.group.rotation.y = this.yaw;
    const ground = heightAt(this.pos.x, this.pos.z);
    this.blob.position.y = ground - this.pos.y + 0.03;
  }
}
