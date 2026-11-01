// ---------------------------------------------------------------------------
// PELERYNA / PŁASZCZ Z RUCHEM TKANINY
//
// Modele z paczek mają sztywną pelerynę (albo nie mają jej wcale). Tutaj
// dokładamy własną tkaninę: siatkę z podziałem, przypiętą do kości kręgosłupa
// i falującą zależnie od prędkości, wiatru i obrotu postaci. Dzięki temu
// płaszcz „żyje” — opóźnia się przy skręcie, unosi przy biegu i opada
// po zatrzymaniu, tak jak w grach z prawdziwą symulacją szmat.
// ---------------------------------------------------------------------------
import * as THREE from 'three';

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const _v2 = new THREE.Vector3();

export class Cape {
  /**
   * @param {import('./characterRig.js').CharacterRig} rig
   * @param {object} opts
   */
  constructor(rig, {
    color = '#3c4a3f',
    length = 1.02,
    width = 0.62,
    segmentsX = 6,
    segmentsY = 9,
    side = 'back',
  } = {}) {
    this.rig = rig;
    this.obstacles = [];
    this.length = length;
    this.width = width;
    this.speedSmooth = 0;
    this.sway = 0;
    this.prevYaw = null;
    this.time = 0;

    // Peleryna to wycinek stożka dopasowany do pleców (otwarty z przodu),
    // a nie płaski prostokąt — dzięki temu okrywa ramiona i nie znika w ciele.
    const geo = new THREE.CylinderGeometry(
      1, 1, 1, Math.max(8, segmentsX * 2), segmentsY, true,
      Math.PI / 2 + 0.5, Math.PI * 2 - 1.0,
    );
    geo.scale(width * 0.36, length, width * 0.36);
    geo.translate(0, -length / 2, 0);
    this.base = Float32Array.from(geo.attributes.position.array);

    const mat = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.94,
      metalness: 0.02,
      side: THREE.DoubleSide,
      flatShading: false,
    });
    this.material = mat;
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.frustumCulled = false;
    this.mesh.name = 'cape';

    // Peleryna wisi na grupie postaci (nie na kości): kości modeli z paczek
    // mają własne osie i skale, więc rodzicielstwo kończyło się tkaniną
    // wystającą w bok. Zamiast tego śledzimy kość pleców i ustawiamy pelerynę
    // w metrach, a w `update` liczymy jej opadanie na przeszkody (skały, mury).
    const height = rig?.height ?? 1.8;
    this.shoulderY = height * 0.76;
    this.bone = null;
    if (rig?.source) {
      for (const name of ['chest', 'spine2', 'spine', 'hips']) {
        const bone = rig.source.getObjectByName(name);
        if (bone) {
          this.bone = bone;
          break;
        }
      }
    }
    if (rig?.group) {
      this.mesh.position.set(0, this.shoulderY, -0.14);
      rig.group.add(this.mesh);
    }
    this.attached = true;
  }

  /**
   * @param {number} dt
   * @param {{speed?: number, yaw?: number, wind?: number, wet?: boolean}} s
   */
  update(dt, s = {}) {
    const speed = Math.max(0, s.speed ?? 0);
    const wind = s.wind ?? 0.35;
    this.time += dt;
    // wygładzenie prędkości i opóźnienie obrotu (tkanina „zostaje z tyłu”)
    this.speedSmooth += (speed - this.speedSmooth) * Math.min(1, dt * 6);
    const yaw = s.yaw ?? 0;
    if (this.prevYaw == null) this.prevYaw = yaw;
    let dyaw = yaw - this.prevYaw;
    while (dyaw > Math.PI) dyaw -= Math.PI * 2;
    while (dyaw < -Math.PI) dyaw += Math.PI * 2;
    this.prevYaw = yaw;
    this.sway += (dyaw * 9 - this.sway) * Math.min(1, dt * 8);
    this.sway = Math.max(-1.1, Math.min(1.1, this.sway));

    // peleryna trzyma się pleców: podąża za kością piersi, ale zawsze prosto
    if (this.bone && this.rig?.group) {
      this.bone.updateWorldMatrix(true, false);
      const world = this.bone.getWorldPosition(_v2);
      this.rig.group.worldToLocal(world);
      this.mesh.position.x += (world.x - this.mesh.position.x) * Math.min(1, dt * 8);
      this.mesh.position.y = this.shoulderY;
      this.mesh.position.z = -0.14;
    }

    const geo = this.mesh.geometry;
    const pos = geo.attributes.position;
    const arr = pos.array;
    const runF = clamp01(this.speedSmooth / 3.2);
    const lift = 0.12 + runF * 0.62;
    const flutter = 0.05 + runF * 0.16;
    // pozycja peleryny w świecie — potrzebna do sprawdzenia, czy nie wchodzi w mur
    const base = _v2.setFromMatrixPosition(this.mesh.matrixWorld);
    for (let i = 0; i < pos.count; i += 1) {
      const bx = this.base[i * 3];
      const by = this.base[i * 3 + 1];
      const bz = this.base[i * 3 + 2];
      const t = clamp01(-by / this.length); // 0 u góry, 1 u dołu
      const ang = Math.atan2(bx, bz);
      const wave = Math.sin(this.time * (3.4 + runF * 4.2) - t * 4.6 + ang * 3.1);
      const wave2 = Math.sin(this.time * (1.7 + runF * 2.0) - t * 2.1 + ang * 1.3);
      // im niżej, tym większy ruch — góra peleryny jest przypięta
      const amp = t * t;
      let ox = bx + wave2 * 0.04 * amp + this.sway * 0.13 * amp;
      let oy = by - lift * amp + wave * 0.024 * amp;
      let oz = bz - (wind + runF * 0.5) * 0.18 * amp + wave * flutter * amp;
      // tkanina nie wchodzi w skały i mury — opada na przeszkodzie
      if (this.obstacles?.length && amp > 0.25) {
        const wx = base.x + ox;
        const wz = base.z - oz;
        for (const ob of this.obstacles) {
          const dx = wx - ob.x;
          const dz = wz - ob.z;
          if (Math.abs(dx) > ob.r || Math.abs(dz) > ob.r) continue;
          const d = Math.hypot(dx, dz);
          if (d < ob.r && d > 0.0001) {
            const push = (ob.r - d) / ob.r;
            ox += (dx / d) * push * 0.16;
            oz += (dz / d) * push * 0.16;
            oy += push * 0.06 * amp;
          }
        }
      }
      arr[i * 3] = ox;
      arr[i * 3 + 1] = oy;
      arr[i * 3 + 2] = oz;
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
    geo.computeBoundingSphere();

    // kolor tkaniny lekko się zmienia przy deszczu (mokra tkanina ciemnieje)
    if (this.mesh.material) {
      const target = s.wet ? 0.62 : 1;
      this.mesh.material.color.offsetHSL(0, 0, (target - 1) * 0.02);
    }
  }

  dispose() {
    this.mesh.removeFromParent();
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }
}

/** Kolor peleryny zależny od postaci — każdy ma inny płaszcz. */
export const CAPE_COLORS = {
  bohater: '#3d5347',
  eryn: '#4a3f5e',
  borys: '#5a3a28',
  marena: '#40543a',
  zorzan: '#39312a',
  wilk: '#5b1f24',
  iskra: '#3b3f6b',
  pustelnik: '#4a4034',
  kupiec: '#543d2a',
  rybak: '#2f4550',
};
