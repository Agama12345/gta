import * as THREE from 'three';
import { Input } from './core/input.js';
import { DayNight } from './core/time.js';
import { clamp, dist2 } from './core/utils.js';
import { World } from './world/world.js';
import { Sky, skyColors } from './world/sky.js';
import { LOCATIONS, heightAt, forestMask, COAST_RADIUS, WATER_LEVEL, isWater } from './world/terrain.js';
import { Player } from './entities/player.js';
import { Companion } from './entities/companion.js';
import { NPC } from './entities/npc.js';
import { EnemyManager } from './entities/enemy.js';
import { FX } from './systems/fx.js';
import { ThirdPersonCamera } from './systems/camera.js';
import { UI } from './ui/ui.js';
import { QuestSystem } from './systems/quests.js';
import { Contracts } from './systems/contracts.js';
import { DialogueSystem } from './systems/dialogue.js';
import { AudioSystem } from './systems/audio.js';
import { VoiceSystem } from './systems/voice.js';
import { Weather } from './systems/weather.js';
import { NPCS } from './data/dialogue.js';
import { ITEMS, RECIPES } from './data/items.js';

const SAVE_KEY = 'runy-przeznaczenia-save';
// Klucz z pierwszej wersji gry — migracja starych zapisów.
const LEGACY_SAVE_KEY = 'ostrze-switu-save';

export class Game {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.options = options;
    this.assets = options.assets ?? null;
    this.state = 'title';
    this.clock = new THREE.Clock();
    this.time = 0;
    this.npcs = [];
    this.kills = 0;
    this.autosaveTimer = 0;
    this.lastRegion = null;
    this.titleAngle = 0;
    this.running = false;

    this._initRenderer();
    this._initScene();
    this._initGame();
    this._bindInput();
    this._bindResize();
  }

  // ------------------------------------------------------------------
  _initRenderer() {
    if (this.options.renderer) {
      this.renderer = this.options.renderer;
      return;
    }
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.4;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
  }

  _initScene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog('#b9d2dc', 140, 1150);

    this.camera = new THREE.PerspectiveCamera(62, window.innerWidth / window.innerHeight, 0.12, 3200);
    this.camera.position.set(0, 12, 58);

    this.hemi = new THREE.HemisphereLight('#cfe0ea', '#4a4433', 0.9);
    this.scene.add(this.hemi);

    this.sun = new THREE.DirectionalLight('#fff3d6', 1.8);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(2048, 2048);
    this.sun.shadow.camera.near = 1;
    this.sun.shadow.camera.far = 300;
    this.sun.shadow.camera.left = -60;
    this.sun.shadow.camera.right = 60;
    this.sun.shadow.camera.top = 60;
    this.sun.shadow.camera.bottom = -60;
    this.sun.shadow.bias = -0.0006;
    this.sun.shadow.normalBias = 0.045;
    this.scene.add(this.sun);
    this.sun.target.position.set(0, 0, 0);
    this.scene.add(this.sun.target);

    this.ambient = new THREE.AmbientLight('#4a5468', 0.45);
    this.scene.add(this.ambient);
    this.sky = new Sky(this.scene);
    this.weather = new Weather(this.scene);

    // gwiazdy
    const starGeo = new THREE.BufferGeometry();
    const starCount = 1400;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const a = Math.random() * Math.PI * 2;
      const b = Math.acos(Math.random() * 1.4 - 0.4);
      const r = 320;
      positions[i * 3] = Math.sin(b) * Math.cos(a) * r;
      positions[i * 3 + 1] = Math.abs(Math.cos(b)) * r * 0.85 + 30;
      positions[i * 3 + 2] = Math.sin(b) * Math.sin(a) * r;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({ color: '#dfe8ff', size: 1.7, transparent: true, opacity: 0, fog: false, depthWrite: false })
    );
    this.stars.frustumCulled = false;
    this.scene.add(this.stars);

    this.cameraRig = new ThirdPersonCamera(this.camera);
    this.cameraRig.yaw = 0;
  }

  /** Wilczy towarzysz — tworzony raz, przeżywa respawn gracza. */
  _ensureCompanion() {
    if (this.companion && this.companion.group && this.companion.group.parent) {
      this.companion._placeNearPlayer(true);
      return this.companion;
    }
    if (this.companion) {
      try { this.scene.remove(this.companion.group); } catch { /* scena już wyczyszczona */ }
    }
    this.companion = new Companion(this);
    this.scene.add(this.companion.group);
    return this.companion;
  }

  _initGame() {
    this.dayNight = new DayNight(8.5);
    this.audio = new AudioSystem();
    this.voice = new VoiceSystem(this);
    this.fx = new FX(this.scene);

    this.player = new Player(this);
    this.player.group.rotation.y = this.player.yaw;
    this.scene.add(this.player.group);
    this._ensureCompanion();

    this.world = new World(this);
    this.enemies = new EnemyManager(this);
    this.quests = new QuestSystem(this);
    this.contracts = new Contracts(this);
    this.ui = new UI(this, document.getElementById('ui'));
    this.dialogue = new DialogueSystem(this);

    for (const [id, def] of Object.entries(NPCS)) {
      this.npcs.push(new NPC(this, id, def));
    }
    this.npcs.forEach((n) => {
      if (n.id === 'duch') n.setVisible(false);
    });

    this.ui.showTitle();
    this.ui.hud.style.display = 'none';
    this.dayNight.apply();
    this._updateLighting();

    this.input = new Input(this.canvas);
  }

  _bindInput() {
    this.input.on((type, data) => {
      if (type === 'keydown') this._onKeyDown(data);
      if (type === 'mousedown' && data === 0) {
        if (this.state === 'playing') this.player.attack();
      }
      if (type === 'mousedown' && data === 2) {
        if (this.state === 'playing') this.player.startBlock();
      }
      if (type === 'mouseup' && data === 2) {
        this.player?.endBlock?.();
      }
      if (type === 'lockchange' && !data && this.state === 'playing' && !this.ui.anyPanelOpen()) {
        // utrata blokady kursora nie zatrzymuje gry — rozglądanie działa też przeciąganiem
      }
    });

    // awaryjne wyjście z paneli klawiszem Esc obsługiwane w _onKeyDown
  }

  _onKeyDown(code) {
    if (this.state === 'title') {
      if (code === 'Enter') {
        this.audio.unlock();
        if (localStorage.getItem(SAVE_KEY)) this.loadGame();
        else this.startNew();
      }
      return;
    }
    if (code === 'Escape') {
      if (this.ui.dialogueOpen) {
        this.dialogue.close();
        return;
      }
      if (this.ui.infoOpen) {
        this.ui.hideInfo();
        if (this.state === 'playing') this.pauseGame();
        return;
      }
      if (this.ui.anyPanelOpen()) {
        this.ui.closePanels();
        return;
      }
      if (this.state === 'playing') this.pauseGame();
      else if (this.state === 'ui' && !this.ui.anyScreenOpen()) this.resumeFromUi();
      else if (this.state === 'ui' && !this.ui.pauseScreen.classList.contains('hidden')) this.resumeFromUi();
      return;
    }

    // nawigacja klawiaturą po menu (strzałki + Enter)
    if ((this.state === 'title' || this.state === 'ui') && (code === 'ArrowDown' || code === 'ArrowUp')) {
      if (this.ui.moveMenuFocus(code === 'ArrowDown' ? 1 : -1)) return;
    }

    if (this.state !== 'playing') return;

    switch (code) {
      case 'KeyI':
      case 'Tab':
        this.ui.openHero('inventory');
        break;
      case 'KeyC':
        this.ui.openHero('character');
        break;
      case 'KeyK':
        this.ui.openHero('quests');
        break;
      case 'KeyM':
        this.ui.openMap();
        break;
      case 'KeyV':
        this.toggleVoice();
        break;
      case 'KeyX':
        this.player.toggleStealth();
        break;
      case 'KeyP':
        this.ui.openHero('perks');
        break;
      case 'KeyF':
        this.interact();
        break;
      case 'KeyQ':
        this.player.castSpell(0);
        break;
      case 'KeyE':
        this.player.castSpell(1);
        break;
      case 'KeyR':
        this.player.castSpell(2);
        break;
      case 'Space':
        this.player.dodge();
        break;
      case 'Digit1':
        this.useQuickSlot(0);
        break;
      case 'Digit2':
        this.useQuickSlot(1);
        break;
      default:
        break;
    }
  }

  _bindResize() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  // ------------------------------------------------------------------
  // STANY
  // ------------------------------------------------------------------
  startNew() {
    this.audio.unlock();
    // świeży gracz
    this.scene.remove(this.player.group);
    this.player = new Player(this);
    this.player.yaw = Math.PI;
    this.scene.add(this.player.group);
    this._ensureCompanion();

    this.quests = new QuestSystem(this);
    this.contracts = new Contracts(this);
    this.dialogue = new DialogueSystem(this);
    this.enemies.reset();
    this.fx.clear();
    this.kills = 0;

    const inv = this.player.inventory;
    inv.gold = 25;
    inv.add('rusty_sword', 1);
    inv.equip('rusty_sword');
    inv.add('leather_vest', 1);
    inv.equip('leather_vest');
    inv.add('health_potion', 3);
    inv.add('bread', 2);
    this.player.recalc();
    this.player.hp = this.player.maxHP;
    this.player.mana = this.player.maxMana;
    this.player.stamina = this.player.maxStamina;
    this.player.pos.set(2, heightAt(2, 342), 342);
    this.player.yaw = Math.PI;
    this.player.syncModel();

    this.dayNight.setHour(8.5);
    this.cameraRig.yaw = 0;
    this.cameraRig.pitch = 0.2;
    this.cameraRig.initialized = false;
    this.npcs.forEach((n) => n.setVisible(n.id !== 'duch'));
    this.world.interactables.forEach((n) => {
      if (n.kind === 'chest') {
        n.data.looted = false;
        if (n.mesh) {
          n.mesh.visible = true;
          const lid = n.mesh.userData?.lid;
          if (lid) {
            lid.rotation.z = Math.PI / 2;
            lid.rotation.y = Math.PI / 2;
            lid.position.y = 0.55;
          }
          if (n.mesh.userData?.glow) n.mesh.userData.glow.visible = true;
        }
      }
      n.available = true;
    });

    this.state = 'playing';
    this.ui.hideTitle();
    this.ui.hud.style.display = '';
    this.ui.hideDeath();
    this.ui.refreshHud();
    this.ui.showLocation('Wilcza Dolina', 'Wioska pod Mgłą');
    this.ui.log('Kael budzi się przy bramie Wilczej Doliny. Stary Eryn czeka przy ognisku.', 'gold');
    this.ui.toast('Wilcza Dolina', 'Idź do ogniska i porozmawiaj z Eryn' );
    this.input.enabled = true;
    this.saveGame();
    this.lastRegion = 'village';
  }

  pauseGame() {
    if (this.state !== 'playing') return;
    this.state = 'ui';
    this.ui.showPause();
    this.input.exitLock();
  }

  openUI() {
    if (this.state === 'playing') {
      this.state = 'ui';
      this.input.exitLock();
    }
  }

  resumeFromUi() {
    if (this.ui.anyPanelOpen() || this.ui.dialogueOpen) return;
    if (!this.ui.deathScreen.classList.contains('hidden')) return;
    if (!this.ui.victoryScreen.classList.contains('hidden')) return;
    this.ui.hidePause();
    this.state = 'playing';
    this.input.enabled = true;
    this.clock.getDelta();
  }

  returnToTitle() {
    this.saveGame();
    this.state = 'title';
    this.ui.hidePause();
    this.ui.hideDeath();
    this.ui.hideVictory();
    this.ui.closePanels();
    this.ui.hideDialogue();
    this.ui.hud.style.display = 'none';
    this.ui.showTitle();
    this.input.exitLock();
  }

  // ------------------------------------------------------------------
  // PĘTLA
  // ------------------------------------------------------------------
  start() {
    this.running = true;
    this.clock.start();
    const loop = () => {
      requestAnimationFrame(loop);
      this.tick();
    };
    loop();
  }

  tick() {
    const dt = Math.min(0.05, this.clock.getDelta());
    this.time += dt;

    if (this.state === 'playing') {
      this.updateGame(dt);
    } else if (this.state === 'dead') {
      this.player.update(dt, null);
      this.fx.update(dt);
      this.enemies.list.forEach((e) => e.update(dt));
      this._updateCamera(dt);
    } else if (this.state === 'title') {
      this._titleCamera(dt);
    } else if (this.state === 'ui' || this.state === 'victory') {
      // świat stoi, ale zachowujemy ostatnią klatkę
    }

    if (this.state !== 'title') this.ui.update(dt);
    this.renderer.render(this.scene, this.camera);
  }

  updateGame(dt) {
    this.contracts?.update(dt);
    const mouse = this.input.consumeMouse();
    if (mouse.x !== 0 || mouse.y !== 0) {
      const sens = this.input.locked ? 0.0022 : 0.0042;
      this.cameraRig.look(mouse.x, mouse.y, sens);
    }

    this.dayNight.update(dt);
    this._updateLighting();

    this.player.update(dt, this.input);
    this.companion?.update(dt);
    this.enemies.update(dt);
    this.world.update(dt, this.time, this.player.pos);
    this.fx.update(dt);
    for (const npc of this.npcs) npc.update(dt, this.player);
    this.npcs.forEach((n) => {
      if (n.id === 'duch') {
        const questReady = this.quests.questDone('barrow') || this.quests.active === 'forge' || this.quests.active === 'boss';
        n.setVisible(questReady && dist2(this.player.pos.x, this.player.pos.z, n.pos.x, n.pos.z) < 40);
      }
    });

    this._updateCamera(dt);
    this._updateInteractions();
    this._updateRegion();

    this.weather?.update(dt, this.camera);
    this._updateAudio(dt);

    if (this.player.hp <= 0 && this.state === 'playing') {
      // stan śmierci ustawiany w takeDamage
    }

    this.autosaveTimer += dt;
    if (this.autosaveTimer > 50) {
      this.autosaveTimer = 0;
      this.saveGame();
    }
  }

  /** Włączanie/wyłączanie głosów postaci (klawisz V). */
  toggleVoice() {
    const on = this.voice?.toggle?.();
    if (on === undefined) return;
    const msg = on
      ? `Głosy włączone — ${this.voice.status()}`
      : 'Głosy wyłączone. Klawisz V włącza je ponownie.';
    this.ui?.log(msg, 'info');
  }

  /** Dźwięk otoczenia: morze, las, wiatr, ogień, noc, deszcz. */
  _updateAudio(dt) {
    const a = this.audio;
    if (!a || !a.ctx) return;
    const p = this.player.pos;
    a.setListener(p.x, p.z, this.player.yaw);

    const dist = Math.hypot(p.x, p.z);
    const sea = clamp((dist - (COAST_RADIUS - 620)) / 620, 0, 1);
    const forest = forestMask(p.x, p.z);
    const altitude = clamp((heightAt(p.x, p.z) - 45) / 170, 0, 1);

    // ogień: najbliższe palenisko w promieniu 18 m
    let fire = 0;
    let firePos = null;
    for (const n of this.world.interactables) {
      if (n.kind !== 'rest') continue;
      const d = dist2(p.x, p.z, n.pos.x, n.pos.z);
      if (d < 18) {
        fire = Math.max(fire, 1 - d / 18);
        firePos = n.pos;
      }
    }
    a._firePos = firePos;

    a.update(dt, {
      night: this.dayNight.nightF ?? (this.dayNight.isNight ? 1 : 0),
      sea,
      forest,
      fire,
      wind: 0.35 + altitude * 0.65,
      rain: this.weather?.rain ?? 0,
    });
  }

  _updateCamera(dt) {
    const speed = Math.hypot(this.player.vel.x, this.player.vel.z);
    this.cameraRig.colliders = this.world?.colliders ?? null;
    this.cameraRig.update(dt, this.player.pos, speed);
    // gdy kamera jest tuż przy postaci, chowamy model, żeby nie zasłaniał widoku
    if (this.player && !this.player.dead) {
      this.player.model.visible = this.cameraRig.currentDistance > 1.75;
    }
  }

  _titleCamera(dt) {
    this.titleAngle += dt * 0.045;
    const r = 46;
    const cx = Math.cos(this.titleAngle) * r;
    const cz = 350 + Math.sin(this.titleAngle) * r;
    this.camera.position.set(cx, heightAt(cx, cz) + 9.5, cz);
    this.camera.lookAt(0, heightAt(0, 350) + 3.4, 350);
    this.dayNight.update(dt);
    this._updateLighting();
    this.fx.update(dt);
    this.world.update(dt, this.time, this.camera.position);
    this.ui.setClock(this.dayNight.clockString, this.dayNight.isNight);
  }

  _updateLighting() {
    const dn = this.dayNight;
    const p = this.player?.pos ?? new THREE.Vector3();
    // po zachodzie słońce zastępuje księżyc — światło nigdy nie pada z dołu
    const lightDir = dn.sunDir.clone();
    if (lightDir.y < 0.16) lightDir.y = 0.16 + Math.abs(lightDir.y) * 0.45;
    lightDir.normalize();
    this.sun.position.set(p.x + lightDir.x * 70, p.y + Math.max(16, lightDir.y * 80), p.z + lightDir.z * 70);
    this.sun.target.position.set(p.x, p.y, p.z);
    this.sun.target.updateMatrixWorld();
    this.sun.color.copy(dn.sunColor);
    this.sun.intensity = dn.sunIntensity;
    this.hemi.color.copy(dn.ambientColor);
    this.hemi.groundColor.set(dn.nightF > 0.5 ? '#161c24' : '#3a3428');
    this.hemi.intensity = dn.ambientIntensity;
    this.ambient.intensity = 0.18 + dn.ambientIntensity * 0.3;
    const sky = skyColors(dn);
    this.sky.update(sky.top, sky.horizon);
    if (this.scene.fog) {
      this.scene.fog.color.set(sky.horizon).lerp(dn.fogColor, 0.45);
      this.scene.fog.near = dn.nightF > 0.6 ? 45 : 140;
      this.scene.fog.far = (dn.nightF > 0.6 ? 320 : 1150) * (this.weather?.fogScale ?? 1);
    }
    this.stars.material.opacity = clamp(dn.nightF * 1.05, 0, 0.95);
    if (this.player?.lantern) this.player.lantern.intensity = 3.6 * clamp(dn.nightF * 1.2, 0, 1);
    this.stars.position.set(p.x, 0, p.z);
    this.ui?.setClock(dn.clockString, dn.isNight);
  }

  _updateInteractions() {
    if (this.ui.dialogueOpen || this.ui.anyPanelOpen()) {
      this.ui.setInteract(null);
      return;
    }
    const nearNpc = this._nearestNpc();
    if (nearNpc) {
      this.pendingInteract = { type: 'npc', npc: nearNpc };
      this.ui.setInteract(`Rozmawiaj: ${nearNpc.name}`);
      return;
    }
    const node = this.world.findNearest(this.player.pos);
    if (node) {
      this.pendingInteract = { type: 'node', node };
      this.ui.setInteract(node.label);
      return;
    }
    this.pendingInteract = null;
    this.ui.setInteract(null);
  }

  _nearestNpc() {
    let best = null;
    let bd = Infinity;
    for (const n of this.npcs) {
      if (!n.visible) continue;
      const d = dist2(n.pos.x, n.pos.z, this.player.pos.x, this.player.pos.z);
      if (d < (n.radius ?? 4) && d < bd) {
        best = n;
        bd = d;
      }
    }
    return best;
  }

  _updateRegion() {
    const p = this.player.pos;
    const regions = [
      { id: 'village', ...LOCATIONS.village, r: 58 },
      { id: 'trading', ...LOCATIONS.trading, r: 36 },
      { id: 'forge', ...LOCATIONS.forge, r: 26 },
      { id: 'bandits', ...LOCATIONS.bandits, r: 26 },
      { id: 'barrow', ...LOCATIONS.barrow, r: 30 },
      { id: 'ruins', ...LOCATIONS.ruins, r: 36 },
      { id: 'quarry', ...LOCATIONS.quarry, r: 24 },
      { id: 'lake', ...LOCATIONS.lake, r: 90 },
      { id: 'castle', ...LOCATIONS.castle, r: 40 },
      { id: 'hermit', ...LOCATIONS.hermit, r: 26 },
      { id: 'swamp', ...LOCATIONS.swamp, r: 90 },
      { id: 'pass', ...LOCATIONS.pass, r: 40 },
      { id: 'circle', ...LOCATIONS.circle, r: 24 },
      { id: 'mine', ...LOCATIONS.mine, r: 22 },
      { id: 'crossroads', ...LOCATIONS.crossroads, r: 18 },
    ];
    let current = null;
    for (const r of regions) {
      if (dist2(p.x, p.z, r.x, r.z) < r.r) {
        current = r;
        break;
      }
    }
    const id = current?.id ?? 'wild';
    if (id !== this.lastRegion) {
      this.lastRegion = id;
      if (current) this.ui.showLocation(current.name, current.sub);
      else {
        const h = this.player.pos.y;
        this.ui.showLocation(h > 120 ? 'Górskie granie' : 'Dzicz', 'Wilcza Dolina i okolice');
      }
    }
  }

  // ------------------------------------------------------------------
  // INTERAKCJE
  // ------------------------------------------------------------------
  interact() {
    if (this.state !== 'playing') return;
    const nearNpc = this._nearestNpc();
    if (nearNpc) {
      this.dialogue.start(nearNpc.id);
      this.pendingInteract = null;
      return;
    }
    const node = this.world.findNearest(this.player.pos);
    if (!node) return;
    this._useNode(node);
  }

  _useNode(node) {
    const p = this.player;
    const inv = p.inventory;
    if (node.kind === 'station') {
      this.ui.openCrafting(node.data.station);
      return;
    }
    if (node.kind === 'sign') {
      this.ui.openMap();
      return;
    }
    if (node.kind === 'board') {
      this.ui.openContracts();
      return;
    }
    if (node.kind === 'rest') {
      this.restAtCampfire();
      return;
    }
    if (node.kind === 'shrine') {
      const cost = node.data.cost ?? 20;
      if (inv.gold < cost) {
        this.ui.log(`Kapliczka milczy. Potrzebujesz ${cost} złota.`, 'warn');
        return;
      }
      inv.gold -= cost;
      p.hp = p.maxHP;
      p.mana = p.maxMana;
      p.gainXp(40);
      this.fx.magicBurst(new THREE.Vector3(node.pos.x, node.pos.y + 1.6, node.pos.z), '#7fe8d0');
      this.ui.log('Kapliczka przyjmuje ofiarę. Światło wypełnia twoje ciało. (+40 PD)', 'good');
      this.audio.quest();
      this.ui.refreshHud();
      return;
    }
    if (node.kind === 'resource') {
      if (this.world.harvest(node)) {
        const item = node.data.item;
        inv.add(item, node.data.qty ?? 1);
        this.ui.log(`Zebrano: ${ITEMS[item]?.name ?? item} ×${node.data.qty ?? 1}`, 'good');
        this.audio.coin();
        this.fx.burst(new THREE.Vector3(node.pos.x, node.pos.y + 0.5, node.pos.z), {
          color: '#cfe08a', count: 8, speed: 1.6, up: 2, life: 0.6,
        });
        this.quests.evaluate(true);
        this.ui.refreshHud();
        if (this.ui.anyPanelOpen()) this.ui.renderInventory?.();
      }
      return;
    }
    if (node.kind === 'chest') {
      if (!node.data.looted) {
        node.data.looted = true;
        const lines = [];
        for (const [id, qty] of node.data.loot ?? []) {
          if (id === 'gold') {
            inv.gold += qty;
            lines.push(`${qty} złota`);
          } else {
            inv.add(id, qty);
            lines.push(`${ITEMS[id]?.name ?? id}${qty > 1 ? ` ×${qty}` : ''}`);
          }
        }
        this.ui.toast('Skrzynia otwarta', lines.join(' · '));
        this.ui.log(`Skrzynia: ${lines.join(', ')}`, 'gold');
        this.audio.coin();
        this.fx.burst(new THREE.Vector3(node.pos.x, node.pos.y + 0.8, node.pos.z), {
          color: '#ffd27a', count: 18, speed: 2.6, up: 3, life: 0.8,
        });
        this.quests.evaluate(true);
        this.ui.refreshHud();
        if (node.mesh) {
          const lid = node.mesh.userData?.lid;
          if (lid) {
            lid.rotation.z = Math.PI / 2 - 1.15;
            lid.position.y = 0.78;
          }
          if (node.mesh.userData?.glow) node.mesh.userData.glow.visible = false;
        }
      } else {
        this.ui.log('Skrzynia jest pusta.', 'warn');
      }
    }
  }

  restAtCampfire() {
    const p = this.player;
    this.dayNight.skipTo(6.6);
    p.hp = p.maxHP;
    p.mana = p.maxMana;
    p.stamina = p.maxStamina;
    p.recalc();
    this.world.nodes.forEach((n) => {
      if (n.kind === 'resource' && !n.data?.once) {
        n.available = true;
        n.timer = 0;
        if (n.mesh) n.mesh.visible = true;
      }
    });
    this.enemies.reset();
    p.invuln = 2;
    this.ui.log('Odpoczywałeś przy ognisku do świtu. Rany się zagoiły.', 'good');
    this.ui.toast('Świt', 'Odpoczynek przywrócił siły');
    this.ui.refreshHud();
    this.fx.heal(p.pos, '#ffcf7a');
    this.saveGame();
  }

  // ------------------------------------------------------------------
  // WALKA / POSTĘP
  // ------------------------------------------------------------------
  damageEnemiesInRadius(center, radius, amount, source = 'Zaklęcie') {
    let hits = 0;
    for (const e of this.enemies.list) {
      if (!e.active || e.dead) continue;
      const d = dist2(e.pos.x, e.pos.z, center.x, center.z);
      if (d > radius + e.radius) continue;
      const falloff = 1 - clamp(d / (radius * 1.4), 0, 0.55);
      e.takeDamage(amount * falloff, { magic: true, knockback: 2.5 });
      hits += 1;
    }
    return hits;
  }

  combatAlert(enemy) {
    for (const other of this.enemies.list) {
      if (other === enemy || other.dead || !other.active || other.aggro) continue;
      if (other.type !== enemy.type) continue;
      if (dist2(other.pos.x, other.pos.z, enemy.pos.x, enemy.pos.z) < 13) {
        other.aggro = true;
        other.state = 'chase';
      }
    }
  }

  onEnemyAggro(enemy) {
    if (enemy.boss) {
      this.ui.log('„Kaldras: Kolejny z rodu Kaelów. Jak twój ojciec.”', 'bad');
      this.game?.audio?.growl?.();
      this.audio.growl();
    } else if (enemy.def.model === 'wolf') {
      this.audio.growl();
    }
  }

  onNightCreatureFade(enemy) {
    this.ui.log('Wieszczka rozpływa się wraz ze świtem.', 'warn');
  }

  onEnemyKilled(enemy) {
    this.kills += 1;
    this.player.totalKills += 1;
    const p = this.player;
    const inv = p.inventory;

    const baseXp = enemy.def.xp ?? 20;
    const lvlBonus = 1 + Math.max(0, enemy.level - enemy.def.level) * 0.12;
    p.gainXp(Math.round(baseXp * lvlBonus));

    const [gmin, gmax] = enemy.def.gold ?? [0, 0];
    const lootBonus = 1 + (p.mods?.loot ?? 0);
    const gold = Math.round((gmin + Math.random() * (gmax - gmin)) * lootBonus);
    if (gold > 0) {
      inv.gold += gold;
      this.ui.log(`+${gold} złota`, 'gold');
    }

    const lootLines = [];
    for (const drop of enemy.def.loot ?? []) {
      if (Math.random() <= drop.chance) {
        inv.add(drop.id, 1);
        lootLines.push(ITEMS[drop.id]?.name ?? drop.id);
      }
    }
    if (lootLines.length) this.ui.log(`Łup: ${lootLines.join(', ')}`, 'good');

    // Łaska świtu: część życia wraca po pokonaniu wroga
    const heal = p.mods?.healOnKill ?? 0;
    if (heal > 0) {
      const before = p.hp;
      p.hp = Math.min(p.maxHP, p.hp + p.maxHP * heal);
      if (p.hp > before) {
        this.ui.floatNumber(p.pos.clone().add(new THREE.Vector3(0, 1.2, 0)), `+${Math.round(p.hp - before)}`, 'heal');
        this.fx.heal(p.pos.clone().add(new THREE.Vector3(0, 0.9, 0)));
      }
    }

    this.quests.onKill(enemy.type);
    this.contracts?.onKill(enemy.type);

    if (this.quests.active === 'boss' && this.quests.canComplete('boss')) {
      setTimeout(() => {
        if (this.quests.active === 'boss') this.quests.complete('boss');
      }, 1400);
    }

    if (enemy.boss) {
      this.bossDefeated = true;
      this.ui.toast('Kaldras pokonany', 'Mgliste Wrota zamknięte');
      this.audio.victory();
      this.cameraRig.addShake(1.2);
      this.fx.magicBurst(enemy.pos.clone().add(new THREE.Vector3(0, 2, 0)), '#ffd27a');
    } else if (enemy.elite) {
      this.ui.toast(`${enemy.name} pokonany`, '');
      this.audio.questComplete();
    }
    this.ui.refreshHud();
  }

  /** Reakcja świata na udane sparowanie ciosu. */
  onParry(source) {
    this.audio?.parry?.();
    if (source && typeof source.onParried === 'function') source.onParried();
    this.quests?.onParry?.();
    this.ui?.log('Sparowałeś cios — wróg traci równowagę. Kontra!', 'good');
  }

  onLevelUp(level) {
    this.audio.levelUp();
    this.ui.toast(`Poziom ${level}`, '+3 punkty atrybutów (C) i 1 punkt rozwoju (P)');
    this.ui.log(`Awans na poziom ${level}! Otrzymujesz 3 punkty atrybutów.`, 'gold');
    this.fx.magicBurst(this.player.pos.clone().add(new THREE.Vector3(0, 1, 0)), '#ffe3a8');
    this.ui.refreshHud();
  }

  onQuestCompleted(id) {
    this.saveGame();
    if (id === 'boss') {
      setTimeout(() => {
        if (this.state === 'playing' || this.state === 'ui') {
          this.state = 'victory';
          this.input.exitLock();
          this.ui.showVictory({
            level: this.player.level,
            xp: Math.round(this.player.xp),
            gold: Math.floor(this.player.inventory.gold),
            kills: this.kills,
            quests: this.quests.completed.size,
          });
        }
      }, 1800);
    }
  }

  onPlayerDeath() {
    if (this.state !== 'playing') return;
    this.state = 'dead';
    const lost = Math.floor(this.player.inventory.gold * 0.1);
    this.player.inventory.gold -= lost;
    this.ui.log('Mgła cię zabrała. Budzisz się w wiosce.', 'bad');
    this.ui.showDeath(lost);
    this.audio.death();
    this.input.exitLock();
    this.cameraRig.addShake(0.6);
  }

  respawnPlayer() {
    this.player.respawn();
    this.ui.hideDeath();
    this.state = 'playing';
    this.ui.refreshHud();
    this.ui.log('Wracasz do Wilczej Doliny. Blizny zostaną.', 'warn');
    for (const e of this.enemies.list) e.aggro = false;
    this.enemies.projectiles.length = 0;
  }

  // ------------------------------------------------------------------
  // EKWIPUNEK / HANDEL / RZEMIOSŁO
  // ------------------------------------------------------------------
  buyItem(shopId, itemId) {
    const def = ITEMS[itemId];
    if (!def) return;
    const price = Math.round(def.value * 1.5);
    const inv = this.player.inventory;
    if (inv.gold < price) {
      this.ui.log('Za mało złota.', 'warn');
      return;
    }
    if (!inv.add(itemId, 1)) {
      this.ui.log('Torba jest pełna.', 'warn');
      return;
    }
    inv.gold -= price;
    this.audio.coin();
    this.ui.log(`Kupiono: ${def.name} (-${price} złota)`, 'good');
    this.ui.refreshHud();
  }

  sellItem(itemId) {
    const def = ITEMS[itemId];
    const inv = this.player.inventory;
    if (!def || !inv.has(itemId)) return;
    if (inv.isEquipped(itemId)) {
      this.ui.log('Najpierw zdejmij ten przedmiot.', 'warn');
      return;
    }
    const price = Math.max(1, Math.round(def.value * 0.45));
    inv.remove(itemId, 1);
    inv.gold += price;
    this.audio.coin();
    this.ui.log(`Sprzedano: ${def.name} (+${price} złota)`, 'good');
    this.ui.refreshHud();
  }

  craftItem(recipeId, station = 'village') {
    const recipe = RECIPES.find((r) => r.id === recipeId);
    if (!recipe) return;
    const inv = this.player.inventory;
    const isAncient = station === 'ancient' || station === 'ancient_forge';
    if (recipe.legendary && !isAncient) {
      this.ui.log('Klingę Świtu można wykować tylko w Starożytnej Kuźni na Kowalskiej Górze.', 'warn');
      return;
    }
    for (const [id, qty] of Object.entries(recipe.mats)) {
      if (!inv.has(id, qty)) {
        this.ui.log(`Brakuje: ${ITEMS[id]?.name ?? id}.`, 'warn');
        return;
      }
    }
    if (inv.gold < recipe.cost) {
      this.ui.log('Za mało złota na pracę kowala.', 'warn');
      return;
    }
    for (const [id, qty] of Object.entries(recipe.mats)) inv.remove(id, qty);
    inv.gold -= recipe.cost;
    inv.add(recipe.out.id, recipe.out.qty);
    this.audio.questComplete();
    this.ui.toast('Wykuto', `${ITEMS[recipe.out.id].name}${recipe.out.qty > 1 ? ` ×${recipe.out.qty}` : ''}`);
    this.ui.log(`Wykowano: ${recipe.out.id ? ITEMS[recipe.out.id].name : recipe.name}`, 'gold');
    this.fx.magicBurst(this.player.pos.clone().add(new THREE.Vector3(0, 1, 0)), recipe.legendary ? '#ffd27a' : '#ff9a45');
    this.quests.evaluate(true);
    this.ui.refreshHud();
    this.saveGame();
  }

  useQuickSlot(index) {
    const cons = this.player.inventory.consumables();
    const item = cons[index];
    if (!item) {
      this.ui.log('Brak mikstur w tym slocie.', 'warn');
      return;
    }
    if (this.player.useItem(item.id)) this.ui.refreshHud();
  }

  // ------------------------------------------------------------------
  // CEL ZADANIA
  // ------------------------------------------------------------------
  questTargetPos() {
    const qs = this.quests;
    const q = qs.activeQuest;
    if (!q) {
      if (qs.availableQuest()) return new THREE.Vector3(NPCS.eryn.pos[0], 0, NPCS.eryn.pos[1]);
      return null;
    }
    if (qs.canComplete()) {
      const giver = NPCS[q.giver] ?? NPCS.eryn;
      return new THREE.Vector3(giver.pos[0], 0, giver.pos[1]);
    }
    const obj = q.objectives.find((o) => !qs.objectiveState(o).done);
    if (!obj) return null;
    if (obj.type === 'talk') {
      const npc = NPCS[obj.npc];
      return npc ? new THREE.Vector3(npc.pos[0], 0, npc.pos[1]) : null;
    }
    if (obj.type === 'kill') {
      let best = null;
      let bd = Infinity;
      for (const e of this.enemies.list) {
        if (e.dead || !e.active || e.type !== obj.enemy) continue;
        const d = dist2(e.pos.x, e.pos.z, this.player.pos.x, this.player.pos.z);
        if (d < bd) {
          bd = d;
          best = e;
        }
      }
      if (best) return new THREE.Vector3(best.pos.x, 0, best.pos.z);
      const fallback = {
        wolf: LOCATIONS.village, bandit: LOCATIONS.bandits, bandit_leader: LOCATIONS.bandits,
        skeleton: LOCATIONS.barrow, wraith: LOCATIONS.barrow, kaldras: LOCATIONS.ruins,
        wolf_alpha: LOCATIONS.village, bog_lurker: LOCATIONS.swamp, stone_golem: LOCATIONS.circle,
        mine_guard: LOCATIONS.mine, castle_wraith: LOCATIONS.castle, wolf_rider: LOCATIONS.pass,
      };
      const l = fallback[obj.enemy];
      return l ? new THREE.Vector3(l.x, 0, l.z) : null;
    }
    if (obj.type === 'collect') {
      const map = {
        stolen_grain: LOCATIONS.bandits,
        shard_dawn: LOCATIONS.barrow,
        ancient_metal: LOCATIONS.quarry,
      };
      const l = map[obj.item] ?? LOCATIONS.village;
      return new THREE.Vector3(l.x, 0, l.z);
    }
    if (obj.type === 'own') {
      const l = this.player.pos;
      const villageAnvil = { x: -8.6, z: 21.6 };
      return new THREE.Vector3(villageAnvil.x, 0, villageAnvil.z);
    }
    return null;
  }

  // ------------------------------------------------------------------
  // ZAPIS
  // ------------------------------------------------------------------
  saveGame(manual = false) {
    if (!this.player || this.state === 'title') return;
    if (this.player.dead && !manual) return;
    try {
      const data = {
        version: 1,
        savedAt: Date.now(),
        player: this.player.serialize(),
        quests: this.quests.serialize(),
        contracts: this.contracts?.serialize(),
        hour: this.dayNight.hour,
        day: this.dayNight.day,
        kills: this.kills,
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(data));
      if (manual) {
        this.ui.toast('Zapisano', 'Postęp bezpieczny');
        this.ui.log('Gra zapisana.', 'good');
      }
    } catch (e) {
      console.warn('Nie udało się zapisać gry', e);
    }
  }

  loadGame() {
    const raw = localStorage.getItem(SAVE_KEY) ?? localStorage.getItem(LEGACY_SAVE_KEY);
    if (!raw) {
      this.startNew();
      return;
    }
    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      this.startNew();
      return;
    }
    this.audio.unlock();
    this.scene.remove(this.player.group);
    this.player = new Player(this);
    this.scene.add(this.player.group);
    this._ensureCompanion();
    this.player.load(data.player);
    if (this.player.hp <= 0) this.player.hp = Math.max(1, Math.round(this.player.maxHP * 0.5));
    this.quests = new QuestSystem(this);
    this.contracts = new Contracts(this);
    this.quests.load(data.quests);
    this.contracts.load(data.contracts);
    this.dialogue = new DialogueSystem(this);
    this.enemies.reset();
    this.fx.clear();
    this.kills = data.kills ?? 0;
    this.dayNight.setHour(data.hour ?? 8.5);
    this.dayNight.day = data.day ?? 1;
    this.cameraRig.initialized = false;
    this.cameraRig.yaw = this.player.yaw - Math.PI;

    this.state = 'playing';
    this.ui.hideTitle();
    this.ui.hud.style.display = '';
    this.ui.hideDeath();
    this.ui.refreshHud();
    this.ui.log('Wracasz do Wilczej Doliny.', 'gold');
    this.ui.toast('Kontynuacja', 'Witaj z powrotem, Kaelu');
    this.input.enabled = true;
    this._updateLighting();
  }
}
