import * as THREE from 'three';
import { clamp } from '../core/utils.js';

const particleGeo = new THREE.SphereGeometry(0.075, 4, 3);
const sparkGeo = new THREE.BoxGeometry(0.07, 0.07, 0.22);
const matCache = new Map();

function basicMat(color, opacity = 1) {
  const key = color + opacity;
  if (!matCache.has(key)) {
    matCache.set(key, new THREE.MeshBasicMaterial({ color, transparent: opacity < 1, opacity }));
  }
  return matCache.get(key);
}

export class FX {
  constructor(scene) {
    this.scene = scene;
    this.particles = [];
    this.rings = [];
    this.projectiles = [];
    this.decals = [];
    this.pool = [];
    this.time = 0;
  }

  _getMesh(geo, color, opacity = 1) {
    return new THREE.Mesh(geo, basicMat(color, opacity));
  }

  burst(pos, { color = '#ffcf7a', count = 10, speed = 3.2, up = 2.2, size = 1, life = 0.6, gravity = 9, spread = 1 } = {}) {
    for (let i = 0; i < count; i++) {
      const m = this._getMesh(particleGeo, color);
      m.position.copy(pos);
      m.scale.setScalar(size * (0.6 + Math.random() * 0.8));
      m.castShadow = false;
      this.scene.add(m);
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * speed;
      this.particles.push({
        mesh: m,
        vx: Math.cos(a) * r * spread,
        vy: up * (0.4 + Math.random()),
        vz: Math.sin(a) * r * spread,
        life,
        maxLife: life,
        gravity,
        spin: Math.random() * 6,
      });
    }
  }

  slash(pos, yaw, { color = '#ffe3ae', radius = 1.9, life = 0.22, arc = Math.PI * 1.1 } = {}) {
    const geo = new THREE.TorusGeometry(radius, 0.07, 4, 14, arc);
    const m = this._getMesh(geo, color, 0.95);
    m.material = m.material.clone();
    m.position.copy(pos);
    m.position.y += 1.0;
    m.rotation.x = Math.PI / 2;
    m.rotation.z = -yaw - arc * 0.35;
    m.castShadow = false;
    this.scene.add(m);
    this.rings.push({ mesh: m, life, maxLife: life, grow: 1.9, spin: 7, fade: true });
  }

  shockwave(pos, { color = '#ffd28a', radius = 1, speed = 14, life = 0.55, y = 0.1 } = {}) {
    const geo = new THREE.RingGeometry(0.6, 0.9, 24);
    const m = this._getMesh(geo, color, 0.9);
    m.material = m.material.clone();
    m.position.set(pos.x, pos.y + y, pos.z);
    m.rotation.x = -Math.PI / 2;
    m.castShadow = false;
    this.scene.add(m);
    this.rings.push({ mesh: m, life, maxLife: life, grow: speed / 2.4, fade: true, expand: speed });
    this.burst(pos, { color, count: 14, speed: 5, up: 1.6, life: 0.5, size: 1.1 });
  }

  sparks(pos, color = '#ffd27a', count = 6) {
    for (let i = 0; i < count; i++) {
      const m = this._getMesh(sparkGeo, color);
      m.position.copy(pos);
      m.castShadow = false;
      this.scene.add(m);
      this.particles.push({
        mesh: m,
        vx: (Math.random() - 0.5) * 6,
        vy: Math.random() * 4 + 1,
        vz: (Math.random() - 0.5) * 6,
        life: 0.4,
        maxLife: 0.4,
        gravity: 14,
        spin: 14,
        spark: true,
      });
    }
  }

  heal(pos, color = '#9fe08a') {
    for (let i = 0; i < 16; i++) {
      const m = this._getMesh(particleGeo, color);
      const a = (i / 16) * Math.PI * 2;
      m.position.set(pos.x + Math.cos(a) * 0.7, pos.y + 0.2, pos.z + Math.sin(a) * 0.7);
      m.castShadow = false;
      this.scene.add(m);
      this.particles.push({
        mesh: m,
        vx: Math.cos(a) * 0.5,
        vy: 2.4,
        vz: Math.sin(a) * 0.5,
        life: 1.1,
        maxLife: 1.1,
        gravity: -0.8,
        spin: 3,
      });
    }
  }

  magicBurst(pos, color = '#8fe0ff') {
    this.shockwave(pos, { color, radius: 2, speed: 18, life: 0.6, y: 0.5 });
    for (let i = 0; i < 3; i++) {
      const geo = new THREE.TorusGeometry(0.8 + i * 0.35, 0.05, 4, 18);
      const m = this._getMesh(geo, color, 0.9);
      m.material = m.material.clone();
      m.position.set(pos.x, pos.y + 1.0 + i * 0.25, pos.z);
      m.castShadow = false;
      this.scene.add(m);
      this.rings.push({ mesh: m, life: 0.45 + i * 0.12, maxLife: 0.45 + i * 0.12, grow: 4.2, fade: true, spin: i % 2 ? 6 : -6 });
    }
  }

  arrow(pos, dir, speed = 26, owner = 'enemy') {
    const g = new THREE.Group();
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.75, 4), basicMat('#8a6b45'));
    shaft.rotation.x = Math.PI / 2;
    g.add(shaft);
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.18, 4), basicMat('#b9c2c9'));
    tip.rotation.x = Math.PI / 2;
    tip.position.z = 0.45;
    g.add(tip);
    const fletch = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.22, 4), basicMat('#c9c2b0'));
    fletch.rotation.x = -Math.PI / 2;
    fletch.position.z = -0.36;
    g.add(fletch);
    g.position.copy(pos);
    g.lookAt(pos.clone().add(dir));
    this.scene.add(g);
    this.projectiles.push({
      mesh: g,
      dir: dir.clone().normalize(),
      speed,
      life: 2.4,
      owner,
      trail: 0,
      gravity: 1.4,
      isArrow: true,
    });
  }

  orb(pos, dir, color = '#b98fe8', speed = 12) {
    const g = new THREE.Group();
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.24, 1), basicMat(color, 0.95));
    g.add(core);
    const halo = new THREE.Mesh(new THREE.SphereGeometry(0.44, 8, 6), basicMat(color, 0.28));
    g.add(halo);
    const light = new THREE.PointLight(color, 2.6, 6, 2);
    g.add(light);
    g.position.copy(pos);
    this.scene.add(g);
    this.projectiles.push({
      mesh: g,
      dir: dir.clone().normalize(),
      speed,
      life: 3.2,
      owner: 'enemy',
      isOrb: true,
      color,
      trail: 0,
      gravity: 0,
    });
  }

  update(dt) {
    this.time += dt;

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= dt;
      if (p.life <= 0) {
        this.scene.remove(p.mesh);
        if (p.mesh.geometry !== particleGeo && p.mesh.geometry !== sparkGeo) p.mesh.geometry.dispose();
        this.particles.splice(i, 1);
        continue;
      }
      p.vy -= p.gravity * dt;
      p.mesh.position.x += p.vx * dt;
      p.mesh.position.y += p.vy * dt;
      p.mesh.position.z += p.vz * dt;
      p.mesh.rotation.x += p.spin * dt;
      p.mesh.rotation.y += p.spin * dt * 0.7;
      const t = p.life / p.maxLife;
      p.mesh.scale.multiplyScalar(0.97);
      p.mesh.visible = t > 0.05;
    }

    for (let i = this.rings.length - 1; i >= 0; i--) {
      const r = this.rings[i];
      r.life -= dt;
      const t = clamp(r.life / r.maxLife, 0, 1);
      if (r.life <= 0) {
        this.scene.remove(r.mesh);
        r.mesh.geometry.dispose();
        this.rings.splice(i, 1);
        continue;
      }
      r.mesh.scale.multiplyScalar(1 + r.grow * dt);
      if (r.spin) r.mesh.rotation.z += r.spin * dt;
      if (r.fade) {
        r.mesh.material.transparent = true;
        r.mesh.material.opacity = t * 0.9;
      }
    }

    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.life -= dt;
      if (p.life <= 0) {
        this.scene.remove(p.mesh);
        this.projectiles.splice(i, 1);
        continue;
      }
      p.dir.y -= p.gravity * dt * 0.4;
      p.mesh.position.addScaledVector(p.dir, p.speed * dt);
      p.mesh.lookAt(p.mesh.position.clone().add(p.dir));
      if (p.isOrb) {
        p.mesh.children[0].rotation.x += dt * 8;
        p.trail -= dt;
        if (p.trail <= 0) {
          p.trail = 0.05;
          this.particles.push({
            mesh: (() => {
              const m = this._getMesh(particleGeo, p.color, 0.8);
              m.position.copy(p.mesh.position);
              this.scene.add(m);
              return m;
            })(),
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            vz: (Math.random() - 0.5) * 0.8,
            life: 0.4,
            maxLife: 0.4,
            gravity: 0,
            spin: 4,
          });
        }
      }
    }
  }

  clear() {
    for (const p of this.particles) this.scene.remove(p.mesh);
    for (const r of this.rings) this.scene.remove(r.mesh);
    for (const p of this.projectiles) this.scene.remove(p.mesh);
    this.particles.length = 0;
    this.rings.length = 0;
    this.projectiles.length = 0;
  }
}
