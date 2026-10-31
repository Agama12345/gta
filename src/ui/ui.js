import * as THREE from 'three';
import { ITEMS, RARITY, EQUIP_SLOTS, RECIPES, itemStatSummary } from '../data/items.js';
import { SPELLS, ATTRS } from '../entities/player.js';
import { QUESTS, QUEST_ORDER, LORE } from '../data/quests.js';
import {
  LOCATIONS, WORLD_RADIUS, heightAt, WATER_LEVEL, PATHS, forestMask,
  RIVER_SURFACES, LAKE_SURFACES,
} from '../world/terrain.js';
import { TIPS } from '../data/dialogue.js';
import { clamp, dist2 } from '../core/utils.js';
import { SHOPS } from '../data/dialogue.js';
import { icon } from './icons.js';
import { biomeLabel } from '../world/biomes.js';

const fmt = (n) => Math.round(n).toLocaleString('pl-PL');
const clamp01 = (v) => Math.max(0, Math.min(1, v));

function qs(sel, root = document) {
  return root.querySelector(sel);
}

const POI_LABELS = [
  { ...LOCATIONS.village, short: 'Wilcza Dolina', color: '#e2b878' },
  { ...LOCATIONS.trading, short: 'Kotlina Kupców', color: '#d8b85a' },
  { ...LOCATIONS.crossroads, short: 'Rozdroże', color: '#cfc2a4' },
  { ...LOCATIONS.forge, short: 'Kowalska Góra', color: '#6ee0d6' },
  { ...LOCATIONS.bandits, short: 'Obóz bandytów', color: '#d0705a' },
  { ...LOCATIONS.barrow, short: 'Kurhan Szeptu', color: '#b49ae0' },
  { ...LOCATIONS.ruins, short: 'Mgliste Wrota', color: '#b977e8' },
  { ...LOCATIONS.quarry, short: 'Kamieniołom', color: '#c9c2b0' },
  { ...LOCATIONS.lake, short: 'Jezioro Zwierciadło', color: '#7fb8cc' },
  { ...LOCATIONS.castle, short: 'Warownia Popiołu', color: '#c08f6a' },
  { ...LOCATIONS.hermit, short: 'Pustelnia', color: '#9fc48a' },
  { ...LOCATIONS.swamp, short: 'Bagno Wieszczki', color: '#7f9670' },
  { ...LOCATIONS.pass, short: 'Przełęcz Kalmoru', color: '#b0a898' },
  { ...LOCATIONS.circle, short: 'Kamienny Krąg', color: '#9f7cf0' },
  { ...LOCATIONS.mine, short: 'Kopalnia', color: '#a89a80' },
  { name: 'Jezioro Mgliste', x: LAKE_SURFACES[3]?.x ?? 315, z: LAKE_SURFACES[3]?.z ?? -215, short: 'Jezioro Mgliste', color: '#7fb8cc' },
  { name: 'Jezioro Kamienne', x: LAKE_SURFACES[4]?.x ?? 269, z: LAKE_SURFACES[4]?.z ?? -377, short: 'Jezioro Kamienne', color: '#7fb8cc' },
];

// Kolor terenu w danym punkcie świata — wspólny dla mapy i minimapy.
function terrainSample(wx, wz) {
  const h = heightAt(wx, wz);
  const lakeD = Math.hypot(wx - LOCATIONS.lake.x, wz - LOCATIONS.lake.z);
  const swampD = Math.hypot(wx - LOCATIONS.swamp.x, wz - LOCATIONS.swamp.z);
  // jeziora (także te w górach) — woda widoczna na mapie i minimapie
  for (const l of LAKE_SURFACES) {
    const d = Math.hypot(wx - l.x, wz - l.z);
    if (d < l.r && h < l.level) {
      const depth = clamp01((l.level - h) / 4);
      return [34 + depth * 8, 74 + depth * 18, 96 + depth * 26];
    }
    if (d < l.r * 1.16 && h < l.level + 1.6) return [116, 108, 82];
  }
  if (h < WATER_LEVEL - 0.05) {
    const depth = clamp01((WATER_LEVEL - h) / 14);
    return [30 + depth * 10, 66 + depth * 26, 88 + depth * 30];
  }
  if (lakeD < 126 && h < WATER_LEVEL + 1.8) return [122, 112, 82];
  if (swampD < 200) return [74, 82, 58];
  if (h > 196) return [226, 229, 231];
  if (h > 154) return [162, 160, 154];
  if (h > 108) return [116, 112, 104];
  const forest = forestMask(wx, wz);
  const t = clamp((h - 22) / 40, 0, 1);
  let col = [
    96 - t * 16,
    112 - t * 10,
    68 - t * 12,
  ];
  if (forest > 0.55) col = [col[0] * 0.62 + 22, col[1] * 0.66 + 12, col[2] * 0.6 + 10];
  const shade = 0.86 + (h % 7) * 0.012;
  return [col[0] * shade, col[1] * shade, col[2] * shade];
}

function hillshade(wx, wz, e = 2.2) {
  const hx = heightAt(wx + e, wz) - heightAt(wx - e, wz);
  const hz = heightAt(wx, wz + e) - heightAt(wx, wz - e);
  return clamp(0.72 + Math.max(0, 0.62 + (-hx - hz) * 0.62) * 0.42, 0.55, 1.4);
}

export class UI {
  constructor(game, root) {
    this.game = game;
    this.root = root;
    this.logLines = [];
    this.nameplates = [];
    this.floatEls = [];
    this.toastTimer = 0;
    this.locationTimer = 0;
    this.interactText = null;
    this.mapCanvas = null;
    this.mapSize = 560;
    this.minimapAcc = 0;
    this.hudAcc = 0;
    this.platesAcc = 0;
    this.infoOpen = false;
    this.lastTab = 'character';
    this.selectedItem = null;
    this.shopId = null;
    this.craftStation = 'village';
    this.dialogueOpen = false;
    this._buildHud();
    this._buildPanels();
    this._buildScreens();
  }

  // =======================================================================
  // BUDOWA DOM
  // =======================================================================
  _buildHud() {
    const hud = document.createElement('div');
    hud.className = 'hud';
    hud.innerHTML = `
      <div class="compass">
        <div class="compass-strip" id="compass">
          <div class="inner" id="compass-inner"></div>
          <div class="needle"></div>
        </div>
        <div class="compass-obj" id="compass-obj"></div>
      </div>

      <div class="help-hint">
        <b>WASD</b> ruch · <b>Shift</b> bieg<br/>
        <b>LPM</b> atak · <b>Spacja</b> unik<br/>
        <b>Q/E/R</b> zaklęcia · <b>F</b> interakcja<br/>
        <b>I</b> ekwipunek · <b>C</b> postać · <b>K</b> zadania<br/>
        <b>M</b> mapa · <b>Esc</b> pauza
      </div>

      <div class="clock" id="clock">☀ 08:30</div>
      <div class="world-tag" id="world-tag"></div>

      <div class="quest-tracker" id="quest-tracker">
        <h4>Zadanie</h4>
        <div class="q-name" id="qt-name"></div>
        <div id="qt-objectives"></div>
      </div>

      <div class="minimap-wrap">
        <canvas id="minimap" width="264" height="264"></canvas>
        <div class="rim"></div>
      </div>

      <div class="loc-title" id="loc-title"><span></span><small></small></div>

      <div class="event-log" id="event-log"></div>

      <div class="interact-prompt" id="interact-prompt"><kbd>F</kbd><span></span></div>

      <div class="slot-bar" id="slot-bar"></div>
      <div class="spells" id="spells"></div>

      <div class="hero-frame">
        <div class="hero-top">
          <div class="hero-level" id="hero-level">1</div>
          <div>
            <div class="hero-name">Kael</div>
            <div class="hero-sub" id="hero-sub">Wędrowny najemnik · Poziom 1</div>
          </div>
          <div class="hero-gold" id="hero-gold">0 szt.</div>
        </div>
        <div class="hero-status" id="hero-status"></div>
        <div class="bar hp"><i id="bar-hp"></i><span class="bar-label" id="label-hp">100 / 100</span></div>
        <div class="bar stam"><i id="bar-stam"></i><span class="bar-label" style="font-size:9px" id="label-stam"></span></div>
        <div class="bar mana"><i id="bar-mana"></i><span class="bar-label" style="font-size:9px" id="label-mana"></span></div>
        <div class="bar xp"><i id="bar-xp"></i><span class="bar-label" style="font-size:8px" id="label-xp"></span></div>
      </div>

      <div class="toast" id="toast"></div>
      <div class="world-overlay" id="world-overlay"></div>
      <div class="flash-layer" id="flash-layer"></div>
      <div class="touch-controls" id="touch-controls">
        <button data-touch="attack">⚔</button>
        <button data-touch="dodge">⤾</button>
        <button data-touch="spell0">✧</button>
      </div>
    `;
    this.root.appendChild(hud);
    this.hud = hud;
    this.worldOverlay = qs('#world-overlay');
    this.logEl = qs('#event-log');
    this.toastEl = qs('#toast');
    this.flashEl = qs('#flash-layer');
    this.interactEl = qs('#interact-prompt');
    this.locEl = qs('#loc-title');

    // pasek zaklęć
    const spellsEl = qs('#spells');
    this.spellEls = SPELLS.map((s, i) => {
      const div = document.createElement('div');
      div.className = 'spell locked clickable';
      div.innerHTML = `<div class="glyph">${s.glyph}</div><div class="key">${['Q', 'E', 'R'][i]}</div>
        <div class="cool"></div><div class="cost">${s.mana}</div>`;
      div.title = `${s.name} — ${s.desc}`;
      div.addEventListener('click', () => {
        if (this.game.state === 'playing') this.game.player.castSpell(i);
      });
      spellsEl.appendChild(div);
      return div;
    });

    this.slotEls = [];
    const slotBar = qs('#slot-bar');
    for (let i = 0; i < 2; i++) {
      const d = document.createElement('div');
      d.className = 'quick clickable';
      d.innerHTML = `<span class="key">${i + 1}</span><span class="ico"></span><span class="count"></span>`;
      d.addEventListener('click', () => {
        if (this.game.state === 'playing') this.game.useQuickSlot(i);
      });
      slotBar.appendChild(d);
      this.slotEls.push(d);
    }

    const touch = qs('#touch-controls');
    if (!('ontouchstart' in window)) touch.style.display = 'none';
    touch.addEventListener('click', (e) => {
      const a = e.target.dataset?.touch;
      if (!a) return;
      const p = this.game.player;
      if (a === 'attack') p.attack();
      if (a === 'dodge') p.dodge();
      if (a === 'spell0') p.castSpell(0);
    });

    this.clockEl = qs('#clock');
    this.compassInner = qs('#compass-inner');
    this.compassObj = qs('#compass-obj');
    this._buildCompassTicks();
  }

  _buildCompassTicks() {
    const marks = [
      ['N', 0], ['NE', 45], ['E', 90], ['SE', 135], ['S', 180], ['SW', 225], ['W', 270], ['NW', 315],
    ];
    this.compassMarks = marks.map(([label, deg]) => {
      const s = document.createElement('span');
      s.className = 'tick-mark' + (label.length === 1 ? ' card' : '');
      s.textContent = label;
      s.dataset.deg = deg;
      this.compassInner.appendChild(s);
      return s;
    });
  }

  _buildPanels() {
    const layer = document.createElement('div');
    layer.id = 'panel-layer';
    this.root.appendChild(layer);
    this.panelLayer = layer;

    // ---- dymki postaci (barks) ----
    const bark = document.createElement('div');
    bark.className = 'bark-layer hidden';
    bark.innerHTML = `<div class="bark"><div class="bark-name"></div><div class="bark-text"></div></div>`;
    this.root.appendChild(bark);
    this.barkEl = bark;
    this.barkTimer = null;

    // ---- panel bohatera ----
    const hero = document.createElement('div');
    hero.className = 'modal-layer hidden';
    hero.id = 'hero-panel';
    hero.innerHTML = `
      <div class="panel">
        <div class="panel-head">
          <div>
            <h2>Kael</h2>
            <div class="sub" id="hero-panel-sub">Wędrowny najemnik</div>
          </div>
          <div class="spacer"></div>
          <button class="close-x" data-close="hero">✕</button>
        </div>
        <div class="panel-body">
          <div class="tabs">
            <button data-tab="character">Postać</button>
            <button data-tab="inventory">Ekwipunek</button>
            <button data-tab="quests">Zadania</button>
            <button data-tab="perks">Rozwój</button>
          </div>
          <div id="hero-tab-body"></div>
        </div>
      </div>`;
    layer.appendChild(hero);
    this.heroPanel = hero;
    hero.addEventListener('click', (e) => {
      const tab = e.target.closest('[data-tab]')?.dataset.tab;
      if (tab) {
        this.lastTab = tab;
        this.renderHeroTab(tab);
        this.game.audio?.uiClick();
        return;
      }
      if (e.target.closest('[data-close="hero"]')) this.closePanels();
    });
    this.heroBody = qs('#hero-tab-body', hero);

    // ---- tablica zleceń ----
    const board = document.createElement('div');
    board.className = 'modal-layer hidden';
    board.id = 'board-panel';
    board.innerHTML = `
      <div class="panel" style="width:min(820px,94vw)">
        <div class="panel-head">
          <div><h2>Tablica zleceń</h2><div class="sub" id="board-sub"></div></div>
          <div class="spacer"></div>
          <button class="close-x" data-close="board">✕</button>
        </div>
        <div class="panel-body"><div id="board-body"></div></div>
      </div>`;
    layer.appendChild(board);
    this.boardPanel = board;
    this.boardBody = qs('#board-body', board);
    board.addEventListener('click', (e) => {
      if (e.target.closest('[data-close="board"]')) {
        this.closePanels();
        return;
      }
      const accept = e.target.closest('[data-contract-accept]');
      if (accept) {
        this.game.contracts.accept(accept.dataset.contractAccept);
        this.renderBoard();
        return;
      }
      const turn = e.target.closest('[data-contract-turnin]');
      if (turn) {
        this.game.contracts.turnIn(turn.dataset.contractTurnin);
        this.renderBoard();
        return;
      }
      const drop = e.target.closest('[data-contract-drop]');
      if (drop) {
        this.game.contracts.abandon(drop.dataset.contractDrop);
        this.renderBoard();
      }
    });

    // ---- sklep ----
    const shop = document.createElement('div');
    shop.className = 'modal-layer hidden';
    shop.id = 'shop-panel';
    shop.innerHTML = `
      <div class="panel" style="width:min(720px,94vw)">
        <div class="panel-head">
          <div><h2 id="shop-title">Sklep</h2><div class="sub" id="shop-gold"></div></div>
          <div class="spacer"></div>
          <button class="close-x" data-close="shop">✕</button>
        </div>
        <div class="panel-body">
          <div class="tabs">
            <button data-shop-tab="buy" class="active">Kup</button>
            <button data-shop-tab="sell">Sprzedaj</button>
          </div>
          <div id="shop-body"></div>
        </div>
      </div>`;
    layer.appendChild(shop);
    this.shopPanel = shop;
    shop.addEventListener('click', (e) => {
      if (e.target.closest('[data-close="shop"]')) {
        this.closePanels();
        return;
      }
      const tab = e.target.closest('[data-shop-tab]')?.dataset.shopTab;
      if (tab) {
        this.shopTab = tab;
        this.renderShop();
        return;
      }
      const buy = e.target.closest('[data-buy]');
      if (buy) {
        this.game.buyItem(this.shopId, buy.dataset.buy);
        this.renderShop();
        return;
      }
      const sell = e.target.closest('[data-sell]');
      if (sell) {
        this.game.sellItem(sell.dataset.sell);
        this.renderShop();
      }
    });

    // ---- rzemiosło ----
    const craft = document.createElement('div');
    craft.className = 'modal-layer hidden';
    craft.id = 'craft-panel';
    craft.innerHTML = `
      <div class="panel" style="width:min(760px,94vw)">
        <div class="panel-head">
          <div><h2>Rzemiosło</h2><div class="sub" id="craft-sub"></div></div>
          <div class="spacer"></div>
          <button class="close-x" data-close="craft">✕</button>
        </div>
        <div class="panel-body"><div class="craft-list" id="craft-body"></div></div>
      </div>`;
    layer.appendChild(craft);
    this.craftPanel = craft;
    craft.addEventListener('click', (e) => {
      if (e.target.closest('[data-close="craft"]')) this.closePanels();
      const c = e.target.closest('[data-craft]');
      if (c) {
        this.game.craftItem(c.dataset.craft, this.craftStation);
        this.renderCrafting();
      }
    });

    // ---- mapa ----
    const map = document.createElement('div');
    map.className = 'modal-layer hidden';
    map.id = 'map-panel';
    map.innerHTML = `
      <div class="panel" style="width:min(900px,95vw)">
        <div class="panel-head">
          <div><h2>Mapa Krainy</h2><div class="sub">Mgła skrywa północ — ale nie przed tobą</div></div>
          <div class="spacer"></div>
          <button class="close-x" data-close="map">✕</button>
        </div>
        <div class="panel-body">
          <div class="map-canvas-wrap"><canvas id="bigmap" width="1024" height="640"></canvas></div>
          <div class="map-legend">
            <span><i style="background:#e9e2d4"></i> Ty</span>
            <span><i style="background:#e2b878"></i> Miejsca</span>
            <span><i style="background:#d0705a"></i> Wrogowie</span>
            <span><i style="background:#8fbf72"></i> Mieszkańcy</span>
            <span><i style="background:#8b5fd6"></i> Cel zadania</span>
          </div>
        </div>
      </div>`;
    layer.appendChild(map);
    this.mapPanel = map;
    map.addEventListener('click', (e) => {
      if (e.target.closest('[data-close="map"]')) this.closePanels();
    });

    // ---- quest intro/outro ----
    const intro = document.createElement('div');
    intro.className = 'modal-layer hidden';
    intro.id = 'quest-intro';
    intro.innerHTML = `
      <div class="panel" style="width:min(620px,94vw)">
        <div class="panel-head">
          <div><h2 id="qi-name">Zadanie</h2><div class="sub" id="qi-sub">Nowe zadanie</div></div>
        </div>
        <div class="panel-body">
          <p style="font-size:13.5px;line-height:1.85;color:#cfc6b6;font-style:italic" id="qi-text"></p>
          <div style="margin:18px 0 6px;font-family:var(--font-display);font-size:11px;letter-spacing:.14em;color:var(--gold);text-transform:uppercase">Cele</div>
          <div id="qi-objectives" style="font-size:12.5px;line-height:1.9;color:#b9b1a2"></div>
          <div style="margin-top:20px;text-align:right"><button class="primary" id="qi-btn">Przyjmuję</button></div>
        </div>
      </div>`;
    layer.appendChild(intro);
    this.questIntro = intro;
  }

  _buildScreens() {
    // ekran tytułowy
    const title = document.createElement('div');
    title.className = 'menu-screen';
    title.id = 'title-screen';
    title.innerHTML = `
      <div class="menu-shell">
        <div class="menu-hero">
          <div class="menu-sigil"><img class="rune-icon" src="./icon-128.png" alt="" /></div>
          <h1 class="menu-title">Runy Przeznaczenia</h1>
          <div class="menu-tagline">RPG · Wilcza Dolina · Mgliste Wrota</div>
          <div class="menu-buttons" id="title-buttons">
            <button class="primary" data-menu="new">Nowa wyprawa</button>
            <button data-menu="continue" id="btn-continue">Kontynuuj</button>
            <button data-menu="settings">Ustawienia</button>
            <button data-menu="controls">Sterowanie</button>
            <button data-menu="about">O grze</button>
          </div>
          <div class="menu-hint"><b>↑ ↓</b> wybór · <b>Enter</b> zatwierdź · <b>Esc</b> powrót</div>
        </div>
        <aside class="menu-card">
          <div class="card-head"><span class="card-dot"></span>Kronika wyprawy</div>
          <div class="card-body" id="title-foot"></div>
          <div class="card-tip" id="title-tip"></div>
          <div class="card-foot">
            <span>wersja 1.3</span>
            <span id="menu-clock">—</span>
          </div>
        </aside>
      </div>`;
    this.root.appendChild(title);
    this.titleScreen = title;

    // pauza
    const pause = document.createElement('div');
    pause.className = 'menu-screen hidden';
    pause.id = 'pause-screen';
    pause.innerHTML = `
      <div class="menu-shell">
        <div class="menu-hero">
          <div class="menu-sigil">❖</div>
          <h1 class="menu-title pause-title">Pauza</h1>
          <div class="menu-tagline" id="pause-sub">Wilcza Dolina czeka</div>
          <div class="menu-buttons" id="pause-buttons">
            <button class="primary" data-pause="resume">Powrót do gry</button>
            <button data-pause="save">Zapisz grę</button>
            <button data-pause="settings">Ustawienia</button>
            <button data-pause="controls">Sterowanie</button>
            <button data-pause="mute" id="btn-mute">Dźwięk: wł.</button>
            <button data-pause="title">Wyjdź do menu</button>
          </div>
          <div class="menu-hint"><b>Esc</b> wracasz do gry</div>
        </div>
        <aside class="menu-card" id="pause-card">
          <div class="card-head"><span class="card-dot"></span>Stan wyprawy</div>
          <div class="card-body" id="pause-info"></div>
          <div class="card-tip" id="pause-tip"></div>
          <div class="card-foot"><span id="pause-save-time"></span><span id="pause-clock">—</span></div>
        </aside>
      </div>`;
    this.root.appendChild(pause);
    this.pauseScreen = pause;

    // śmierć
    const death = document.createElement('div');
    death.className = 'menu-screen hidden';
    death.id = 'death-screen';
    death.innerHTML = `
      <div class="menu-inner">
        <div class="menu-sigil" style="color:#c1443a">☠</div>
        <h1 class="menu-title" style="font-size:clamp(28px,5vw,46px);background:linear-gradient(180deg,#e6b0a0,#8a3a30);-webkit-background-clip:text;background-clip:text">Zginąłeś</h1>
        <p class="victory-text">Mgła zamknęła się nad tobą. Ale Wilcza Dolina wciąż potrzebuje ostrza.</p>
        <div class="menu-buttons">
          <button class="primary" data-death="respawn">Powstań w wiosce</button>
          <button data-death="title">Wróć do menu</button>
        </div>
        <div class="menu-foot" id="death-foot"></div>
      </div>`;
    this.root.appendChild(death);
    this.deathScreen = death;

    // zwycięstwo
    const victory = document.createElement('div');
    victory.className = 'menu-screen hidden';
    victory.id = 'victory-screen';
    victory.innerHTML = `
      <div class="menu-inner">
        <div class="menu-sigil">☀</div>
        <h1 class="menu-title victory-title">Świt</h1>
        <p class="victory-text" id="victory-text"></p>
        <div class="menu-foot" id="victory-stats" style="margin-bottom:22px"></div>
        <div class="menu-buttons">
          <button class="primary" data-victory="continue">Wróć do świata</button>
          <button data-victory="title">Zakończ</button>
        </div>
      </div>`;
    this.root.appendChild(victory);
    this.victoryScreen = victory;

    // sterowanie / o grze (wspólny overlay)
    const info = document.createElement('div');
    info.className = 'modal-layer hidden';
    info.id = 'info-panel';
    info.innerHTML = `
      <div class="panel" style="width:min(640px,94vw)">
        <div class="panel-head">
          <div><h2 id="info-title">Sterowanie</h2><div class="sub" id="info-sub"></div></div>
          <div class="spacer"></div>
          <button class="close-x" data-close="info">✕</button>
        </div>
        <div class="panel-body" id="info-body"></div>
      </div>`;
    this.root.appendChild(info);
    this.infoPanel = info;

    title.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-menu]');
      if (!btn || btn.disabled) return;
      const a = btn.dataset.menu;
      this.game.audio?.unlock();
      this.game.music?.setEnabled?.(this.game.music?.enabled ?? true);
      this.game.music?.start?.();
      this.game.audio?.uiClick();
      if (a === 'new') this.game.startNew();
      if (a === 'continue') this.game.loadGame();
      if (a === 'settings') this.showSettings();
      if (a === 'controls') this.showControls();
      if (a === 'about') this.showAbout();
    });
    pause.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-pause]');
      if (!btn || btn.disabled) return;
      const a = btn.dataset.pause;
      this.game.audio?.uiClick();
      if (a === 'resume') this.game.resumeFromUi();
      if (a === 'save') this.game.saveGame(true);
      if (a === 'settings') this.showSettings();
      if (a === 'controls') this.showControls();
      if (a === 'mute') {
        const on = this.game.audio?.toggleMute();
        btn.textContent = `Dźwięk: ${on ? 'wł.' : 'wył.'}`;
      }
      if (a === 'title') this.game.returnToTitle();
    });
    death.addEventListener('click', (e) => {
      const a = e.target.closest('[data-death]')?.dataset.death;
      if (!a) return;
      if (a === 'respawn') this.game.respawnPlayer();
      if (a === 'title') this.game.returnToTitle();
    });
    victory.addEventListener('click', (e) => {
      const a = e.target.closest('[data-victory]')?.dataset.victory;
      if (!a) return;
      if (a === 'continue') this.hideVictory();
      if (a === 'title') this.game.returnToTitle();
    });
    info.addEventListener('click', (e) => {
      if (e.target.closest('[data-close="info"]')) {
        this.hideInfo();
        if (!this.anyScreenOpen()) this.game.resumeFromUi();
      }
    });
  }

  // -----------------------------------------------------------------------
  // MENU — stan, ustawienia, nawigacja klawiaturą
  // -----------------------------------------------------------------------
  _readSave() {
    try {
      const raw = localStorage.getItem('runy-przeznaczenia-save')
        ?? localStorage.getItem('ostrze-switu-save');
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      return null;
    }
  }

  _biomeLabel() {
    try {
      const pos = this.game.player?.pos;
      if (!pos) return '';
      return biomeLabel(pos.x, pos.z);
    } catch (err) {
      return '';
    }
  }

  /** Jedno miejsce, które opisuje stan obu menu (tytuł i pauza). */
  refreshMenuState() {
    const save = this._readSave();
    const btn = this.titleScreen?.querySelector('#btn-continue');
    if (btn) {
      btn.disabled = !save;
      btn.title = save ? 'Wczytaj ostatni zapis' : 'Brak zapisu — zacznij nową wyprawę';
    }

    const foot = this.titleScreen?.querySelector('#title-foot');
    if (foot) {
      if (save?.player) {
        const pl = save.player;
        const when = save.savedAt ? new Date(save.savedAt).toLocaleString('pl-PL') : '—';
        const quests = save.quests ? Object.keys(save.quests.progress ?? {}).length : 0;
        foot.innerHTML = `
          <div class="card-row"><span>Poziom</span><b>${pl.level ?? 1}</b></div>
          <div class="card-row"><span>Złoto</span><b>${fmt(pl.gold ?? pl.inventory?.gold ?? 0)}</b></div>
          <div class="card-row"><span>Zadania</span><b>${quests}</b></div>
          <div class="card-row"><span>Dzień</span><b>${save.day ?? 1}</b></div>
          <div class="card-when">Ostatni zapis: ${when}</div>`;
      } else {
        foot.innerHTML = `
          <div class="card-row"><span>Poziom</span><b>1</b></div>
          <div class="card-row"><span>Złoto</span><b>0</b></div>
          <div class="card-row"><span>Zadania</span><b>0</b></div>
          <div class="card-when">Brak zapisu — zacznij nową wyprawę.</div>`;
      }
    }

    const tip = this.titleScreen?.querySelector('#title-tip');
    if (tip) tip.innerHTML = `<span>Wskazówka</span>${this._nextTip()}`;
    const pauseTip = this.pauseScreen?.querySelector('#pause-tip');
    if (pauseTip) pauseTip.innerHTML = `<span>Wskazówka</span>${this._nextTip()}`;

    const mute = this.pauseScreen?.querySelector('#btn-mute');
    if (mute) mute.textContent = `Dźwięk: ${this.game.audio?.enabled ? 'wł.' : 'wył.'}`;

    const sub = this.pauseScreen?.querySelector('#pause-sub');
    const info = this.pauseScreen?.querySelector('#pause-info');
    const player = this.game.player;
    if (sub && player) {
      sub.textContent = `Poziom ${player.level} · ${fmt(player.inventory.gold)} szt. złota`;
    }
    if (info && player) {
      const quest = this.game.quests?.activeQuest?.name ?? 'brak';
      const region = this._biomeLabel();
      const saveTime = save?.savedAt ? new Date(save.savedAt).toLocaleTimeString('pl-PL') : '—';
      info.innerHTML = `
        <div class="card-row"><span>Bohater</span><b>Kael</b></div>
        <div class="card-row"><span>Poziom</span><b>${player.level} · ${fmt(player.xp ?? 0)} PD</b></div>
        <div class="card-row"><span>Zadanie</span><b>${quest}</b></div>
        <div class="card-row"><span>Okolica</span><b>${region || 'bez nazwy'}</b></div>
        <div class="card-row"><span>Zapis</span><b>${saveTime}</b></div>`;
    }
    const saveTime = this.pauseScreen?.querySelector('#pause-save-time');
    if (saveTime) saveTime.textContent = save ? 'zapis aktualny' : 'brak zapisu';
  }

  /** Losowa wskazówka do karty menu (bez powtarzania tej samej dwa razy). */
  _nextTip() {
    const pool = Array.isArray(TIPS) && TIPS.length ? TIPS : ['Rozmawiaj z mieszkańcami — każdy ma własny głos.'];
    let pick = pool[Math.floor(Math.random() * pool.length)];
    for (let guard = 0; guard < 6 && pick === this._lastTip; guard++) {
      pick = pool[Math.floor(Math.random() * pool.length)];
    }
    this._lastTip = pick;
    return typeof pick === 'string' ? pick : pick.text ?? '';
  }

  /** Klawiatura w menu: strzałki przełączają przyciski, Enter wybiera. */
  moveMenuFocus(delta) {
    const screen = [this.titleScreen, this.pauseScreen, this.deathScreen, this.victoryScreen]
      .find((el) => el && !el.classList.contains('hidden'));
    if (!screen) return false;
    const buttons = [...screen.querySelectorAll('.menu-buttons button')].filter((b) => !b.disabled);
    if (!buttons.length) return false;
    const current = buttons.indexOf(document.activeElement);
    const next = current < 0 ? 0 : (current + delta + buttons.length) % buttons.length;
    buttons[next].focus();
    this.game.audio?.uiClick();
    return true;
  }

  /** Ustawienia grafiki (zapamiętywane w przeglądarce). */
  videoSettings() {
    const def = { quality: 100, shadows: true, view: 100, fov: 62 };
    try {
      const raw = localStorage.getItem('runy-video');
      if (raw) return { ...def, ...JSON.parse(raw) };
    } catch (err) {
      /* brak dostępu do localStorage — zostają wartości domyślne */
    }
    return def;
  }

  setVideoSetting(key, value) {
    const cfg = { ...this.videoSettings(), [key]: value };
    try {
      localStorage.setItem('runy-video', JSON.stringify(cfg));
    } catch (err) {
      /* tryb prywatny — ustawienie działa do końca sesji */
    }
    this.applyVideoSettings(cfg);
  }

  /** Nakłada ustawienia grafiki na renderer, kamerę i mgłę. */
  applyVideoSettings(cfg = this.videoSettings()) {
    const g = this.game;
    const r = g.renderer;
    if (r) {
      try {
        r.setPixelRatio?.(Math.max(0.6, Math.min(2, cfg.quality / 100)));
        r.setSize?.(window.innerWidth, window.innerHeight);
        if (r.shadowMap) r.shadowMap.enabled = !!cfg.shadows;
      } catch (err) {
        console.warn('Nie udało się zmienić jakości grafiki', err);
      }
    }
    if (g.sun) g.sun.castShadow = !!cfg.shadows;
    if (g.camera) {
      g.camera.fov = cfg.fov;
      g.camera.updateProjectionMatrix?.();
    }
    if (g.scene?.fog) {
      const scale = cfg.view / 100;
      g.scene.fog.near = 90 * scale;
      g.scene.fog.far = 1150 * scale;
    }
    return cfg;
  }

  /** Panel ustawień — głośność, głosy, jakość obrazu. */
  showSettings() {
    const audio = this.game.audio;
    const voice = this.game.voice;
    const video = this.videoSettings();
    const vol = Math.round((audio?.master?.gain?.value ?? 0.55) * 100);
    const body = `
      <div class="settings">
        <div class="setting-row">
          <div><b>Głośność ogólna</b><div class="sub">Muzyka, otoczenie i efekty</div></div>
          <div class="setting-ctrl">
            <input type="range" id="set-volume" min="0" max="100" value="${vol}" />
            <span id="set-volume-val">${vol}%</span>
          </div>
        </div>
        <div class="setting-row">
          <div><b>Dźwięk</b><div class="sub">Wiatr, fale, walka, interfejs</div></div>
          <div class="setting-ctrl"><button id="set-mute">${audio?.enabled ? 'Włączony' : 'Wyłączony'}</button></div>
        </div>
        <div class="setting-row">
          <div><b>Muzyka tła</b><div class="sub">Harfa, drony i bębny w walce (klawisz B)</div></div>
          <div class="setting-ctrl">
            <button id="set-music">${this.game.music?.enabled === false ? 'Wyłączona' : 'Włączona'}</button>
            <input type="range" id="set-music-vol" min="0" max="100" value="${Math.round((this.game.music?.volume ?? 0.16) * 100)}" />
          </div>
        </div>
        <div class="setting-row">
          <div><b>Głosy postaci</b><div class="sub" id="set-voice-sub">${voice?.status?.() ?? 'niedostępne'}</div></div>
          <div class="setting-ctrl"><button id="set-voice">${voice?.enabled ? 'Włączone' : 'Wyłączone'}</button></div>
        </div>
        <div class="setting-row">
          <div><b>Ostrość obrazu</b><div class="sub">Niższa wartość = płynniej na słabszym komputerze</div></div>
          <div class="setting-ctrl">
            <input type="range" id="set-quality" min="60" max="200" step="10" value="${video.quality}" />
            <span id="set-quality-val">${video.quality}%</span>
          </div>
        </div>
        <div class="setting-row">
          <div><b>Cienie</b><div class="sub">Wyłącz, jeśli obraz klatkuje albo migocze</div></div>
          <div class="setting-ctrl"><button id="set-shadows">${video.shadows ? 'Włączone' : 'Wyłączone'}</button></div>
        </div>
        <div class="setting-row">
          <div><b>Zasięg widzenia</b><div class="sub">Mgła i odległość rysowania krajobrazu</div></div>
          <div class="setting-ctrl">
            <input type="range" id="set-view" min="60" max="140" step="10" value="${video.view}" />
            <span id="set-view-val">${video.view}%</span>
          </div>
        </div>
        <div class="setting-row">
          <div><b>Pole widzenia</b><div class="sub">Szersze = więcej świata, ale mocniejsze zniekształcenia</div></div>
          <div class="setting-ctrl">
            <input type="range" id="set-fov" min="55" max="80" step="1" value="${video.fov}" />
            <span id="set-fov-val">${video.fov}°</span>
          </div>
        </div>
        <div class="setting-row">
          <div><b>Sterowanie</b><div class="sub">Pełna lista klawiszy</div></div>
          <div class="setting-ctrl"><button id="set-keys">Pokaż</button></div>
        </div>
      </div>`;
    this.showInfo('Ustawienia', 'Zmiany działają od razu', body);
    const panel = this.infoPanel;
    panel.querySelector('#set-volume')?.addEventListener('input', (e) => {
      const v = Number(e.target.value);
      panel.querySelector('#set-volume-val').textContent = `${v}%`;
      this.game.audio?.setVolume((v / 100) * 0.55);
    });
    panel.querySelector('#set-mute')?.addEventListener('click', (e) => {
      const on = this.game.audio?.toggleMute();
      e.target.textContent = on ? 'Włączony' : 'Wyłączony';
    });
    panel.querySelector('#set-music')?.addEventListener('click', (e) => {
      const on = this.game.music?.toggle?.();
      this.game.music?.start?.();
      e.target.textContent = on ? 'Włączona' : 'Wyłączona';
    });
    panel.querySelector('#set-music-vol')?.addEventListener('input', (e) => {
      this.game.music?.setVolume?.(Number(e.target.value) / 100);
    });
    panel.querySelector('#set-voice')?.addEventListener('click', (e) => {
      const on = this.game.voice?.toggle();
      e.target.textContent = on ? 'Włączone' : 'Wyłączone';
      const sub = panel.querySelector('#set-voice-sub');
      if (sub) sub.textContent = this.game.voice?.status() ?? '';
      if (on) this.game.voice?.speak('Głosy postaci włączone.', 'narrator');
    });
    panel.querySelector('#set-quality')?.addEventListener('input', (e) => {
      const v = Number(e.target.value);
      panel.querySelector('#set-quality-val').textContent = `${v}%`;
      this.setVideoSetting('quality', v);
    });
    panel.querySelector('#set-shadows')?.addEventListener('click', (e) => {
      const on = !this.videoSettings().shadows;
      e.target.textContent = on ? 'Włączone' : 'Wyłączone';
      this.setVideoSetting('shadows', on);
    });
    panel.querySelector('#set-view')?.addEventListener('input', (e) => {
      const v = Number(e.target.value);
      panel.querySelector('#set-view-val').textContent = `${v}%`;
      this.setVideoSetting('view', v);
    });
    panel.querySelector('#set-fov')?.addEventListener('input', (e) => {
      const v = Number(e.target.value);
      panel.querySelector('#set-fov-val').textContent = `${v}°`;
      this.setVideoSetting('fov', v);
    });
    panel.querySelector('#set-keys')?.addEventListener('click', () => this.showControls());
  }

  // =======================================================================
  // EKRANY / PANELE
  // =======================================================================
  anyPanelOpen() {
    return [...this.panelLayer.children].some((c) => !c.classList.contains('hidden'));
  }

  anyScreenOpen() {
    return ['title-screen', 'pause-screen', 'death-screen', 'victory-screen'].some(
      (id) => !qs('#' + id).classList.contains('hidden')
    );
  }

  closePanels() {
    for (const c of this.panelLayer.children) c.classList.add('hidden');
    if (this.dialogueOpen) return;
    if (!this.anyScreenOpen()) this.game.resumeFromUi();
  }

  // ---------------- dymki mieszkańców ----------------
  /** Krótki dymek z kwestią postaci (barks) — znika sam po kilku sekundach. */
  showBark(text, name = '') {
    if (!this.barkEl || !text) return;
    qs('.bark-name', this.barkEl).textContent = name;
    qs('.bark-text', this.barkEl).textContent = text;
    this.barkEl.classList.remove('hidden');
    this.barkEl.classList.add('show');
    clearTimeout(this.barkTimer);
    this.barkTimer = setTimeout(() => {
      this.barkEl.classList.remove('show');
      setTimeout(() => this.barkEl.classList.add('hidden'), 400);
    }, Math.min(9000, 2600 + text.length * 42));
  }

  hideBark() {
    if (!this.barkEl) return;
    clearTimeout(this.barkTimer);
    this.barkEl.classList.remove('show');
    this.barkEl.classList.add('hidden');
  }

  // ---------------- tablica zleceń ----------------
  openContracts() {
    this.boardPanel.classList.remove('hidden');
    this.boardPanel.classList.add('show');
    this.renderBoard();
    this.game.openUI();
    this.game.audio?.uiOpen?.();
  }

  renderBoard() {
    const c = this.game.contracts;
    if (!c) return;
    const entries = c.board();
    qs('#board-sub').textContent = `Przyjęte: ${c.active.length}/3 · oddane: ${c.completedCount} · poziom ${this.game.player.level}`;

    const row = (e) => {
      const prog = e.progress.length
        ? `<div class="c-progress">${e.progress.map((o) => `<span class="${o.have >= o.target ? 'ok' : ''}">${o.have}/${o.target}</span>`).join(' · ')}</div>`
        : '';
      let action = '';
      if (e.active && e.complete) action = `<button class="perk-buy" data-contract-turnin="${e.id}">Oddaj zlecenie</button>`;
      else if (e.active) action = `<button class="perk-buy" data-contract-drop="${e.id}">Porzuć</button>`;
      else if (e.cooldown > 0) action = `<span class="c-wait">odnowi się za ${Math.ceil(e.cooldown)} s</span>`;
      else if (e.canAccept) action = `<button class="perk-buy" data-contract-accept="${e.id}">Przyjmij</button>`;
      else if (e.tooLowLevel) action = `<span class="c-wait">poziom ${e.level}</span>`;
      else action = `<span class="c-wait">brak miejsca</span>`;
      return `<div class="c-row ${e.active ? 'active' : ''} ${e.complete ? 'ready' : ''}">
        <div class="c-head">
          <div class="c-name">${e.name}</div>
          <div class="c-giver">${e.giver} · poziom ${e.level}</div>
        </div>
        <div class="c-desc">${e.desc}</div>
        ${prog}
        <div class="c-reward">${c.rewardText(e.id)}</div>
        <div class="c-action">${action}</div>
      </div>`;
    };

    const active = entries.filter((e) => e.active);
    const available = entries.filter((e) => !e.active);
    this.boardBody.innerHTML = `
      <div class="card">
        <h4>Przyjęte zlecenia</h4>
        ${active.length ? active.map(row).join('') : '<div class="empty-note">Nikogo jeszcze nie najmujesz. Weź zlecenie z listy poniżej.</div>'}
      </div>
      <div class="card" style="margin-top:14px">
        <h4>Ogłoszenia</h4>
        ${available.map(row).join('')}
      </div>`;
  }

  openHero(tab = 'character') {
    this.lastTab = tab;
    this.heroPanel.classList.remove('hidden');
    this.heroPanel.classList.add('show');
    this.renderHeroTab(tab);
    this.game.openUI();
  }

  renderHeroTab(tab) {
    for (const b of this.heroPanel.querySelectorAll('[data-tab]')) {
      b.classList.toggle('active', b.dataset.tab === tab);
    }
    if (tab === 'character') this.renderCharacter();
    if (tab === 'inventory') this.renderInventory();
    if (tab === 'quests') this.renderQuests();
    if (tab === 'perks') this.renderPerks();
  }

  renderCharacter() {
    const p = this.game.player;
    const eq = p.inventory.equipStats();
    const rows = ATTRS.map((a) => {
      const canAdd = p.points > 0;
      const val = p.attrs[a.id];
      const pct = Math.max(6, Math.min(100, (val / 30) * 100));
      return `<div class="attr-row">
        <div class="attr-glyph">${a.glyph}</div>
        <div class="attr-info">
          <div class="an">${a.name}<span class="attr-val">${val}</span></div>
          <div class="attr-bar"><span style="width:${pct.toFixed(0)}%"></span></div>
          <div class="ad">${a.desc}</div>
        </div>
        ${canAdd ? `<button class="attr-plus" data-attr="${a.id}" title="Dodaj punkt">+</button>` : ''}
      </div>`;
    }).join('');

    this.heroBody.innerHTML = `
      <div class="grid-2">
        <div>
          <div class="card">
            <h4>Atrybuty</h4>
            <div class="points-left">${p.points > 0 ? `Punkty do rozdania: <b>${p.points}</b>` : 'Brak wolnych punktów'}</div>
            ${rows}
          </div>
          <div class="card" style="margin-top:14px">
            <h4>Pochodzenie</h4>
            <p class="panel-note">Kael z Wilczej Doliny. Ojciec zginął pod Mglistymi Wrotami, matka nosiła Ostrze Świtu, dopóki nie rozpadło się na okruchy. Wychowałeś się na wilczym mięsie i opowieściach o świetle.</p>
          </div>
        </div>
        <div>
          <div class="card">
            <h4>Statystyki</h4>
            <div class="stat-row"><span class="k">Poziom</span><span class="v">${p.level}</span></div>
            <div class="stat-row"><span class="k">Doświadczenie</span><span class="v">${fmt(p.xp)} / ${fmt(p.xpNeeded)}</span></div>
            <div class="stat-row"><span class="k">Życie</span><span class="v">${Math.round(p.hp)} / ${p.maxHP}</span></div>
            <div class="stat-row"><span class="k">Mana</span><span class="v">${Math.round(p.mana)} / ${p.maxMana}</span></div>
            <div class="stat-row"><span class="k">Kondycja</span><span class="v">${Math.round(p.stamina)} / ${p.maxStamina}</span></div>
            <div class="stat-row"><span class="k">Atak</span><span class="v">${p.attackPower.toFixed(1)} ${eq.attack ? `(+${eq.attack})` : ''}</span></div>
            <div class="stat-row"><span class="k">Pancerz</span><span class="v">${p.armor.toFixed(1)}</span></div>
            <div class="stat-row"><span class="k">Trafienie krytyczne</span><span class="v">${(p.critChance * 100).toFixed(0)}%</span></div>
            <div class="stat-row"><span class="k">Moc zaklęć</span><span class="v">${p.spellPower.toFixed(0)}</span></div>
            <div class="stat-row"><span class="k">Złoto</span><span class="v">${fmt(p.inventory.gold)}</span></div>
          </div>
          <div class="card" style="margin-top:14px">
            <h4>Zaklęcia</h4>
            ${SPELLS.map((s) => `<div class="stat-row"><span class="k">${s.glyph} ${s.name}</span><span class="v" style="font-size:11px">${p.level >= s.level ? 'odblokowane' : `poziom ${s.level}`}</span></div>`).join('')}
          </div>
        </div>
      </div>`;

    this.heroBody.querySelectorAll('[data-attr]').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (this.game.player.spendPoint(btn.dataset.attr)) {
          this.game.audio?.uiClick();
          this.renderCharacter();
          this.refreshHud();
        }
      });
    });
  }

  renderInventory() {
    const p = this.game.player;
    const inv = p.inventory;
    this.invFilter = this.invFilter ?? 'all';
    this.invSort = this.invSort ?? 'type';
    const all = inv.list();
    const order = { weapon: 0, armor: 1, helm: 2, trinket: 3, consumable: 4, material: 5, quest: 6 };
    const sorters = {
      type: (a, b) => (order[a.def.type] ?? 9) - (order[b.def.type] ?? 9) || a.def.name.localeCompare(b.def.name, 'pl'),
      name: (a, b) => a.def.name.localeCompare(b.def.name, 'pl'),
      value: (a, b) => (b.def.value ?? 0) - (a.def.value ?? 0),
    };
    const filtered = this.invFilter === 'all' ? all : all.filter((e) => {
      if (this.invFilter === 'gear') return ['weapon', 'armor', 'helm', 'trinket'].includes(e.def.type);
      if (this.invFilter === 'use') return e.def.type === 'consumable';
      if (this.invFilter === 'mat') return e.def.type === 'material';
      return true;
    });
    const items = [...filtered].sort(sorters[this.invSort] ?? sorters.type);

    // ---- kolumna 1: założony ekwipunek -----------------------------------
    const eqStats = inv.equipStats();
    const eqRows = EQUIP_SLOTS.map((slot) => {
      const id = inv.equipped[slot.id];
      const it = id ? ITEMS[id] : null;
      if (!it) {
        return `<div class="eq-row is-empty">
          <span class="eq-box">${icon(slot.glyph, 20)}</span>
          <span class="eq-meta"><span class="eq-slot">${slot.label}</span><span class="eq-name">pusty</span></span>
        </div>`;
      }
      const rar = RARITY[it.rarity] ?? RARITY.common;
      const summary = itemStatSummary(id).split(' · ')[0] ?? '';
      return `<button class="eq-row ${rar.cls}" data-unequip="${slot.id}" title="Zdejmij: ${it.name}">
        <span class="eq-box">${icon(it.icon, 20)}</span>
        <span class="eq-meta">
          <span class="eq-slot">${slot.label}</span>
          <span class="eq-name">${it.name}</span>
        </span>
        <span class="eq-bonus">${summary}</span>
      </button>`;
    }).join('');

    // ---- kolumna 2: torba -------------------------------------------------
    const cells = items.map((e) => {
      const rar = RARITY[e.def.rarity] ?? RARITY.common;
      const sel = this.selectedItem === e.id ? ' is-selected' : '';
      return `<button class="bag-cell ${rar.cls}${sel}" data-item="${e.id}" title="${e.def.name}">
        ${icon(e.def.icon, 24)}
        ${e.qty > 1 ? `<span class="bag-count">${e.qty}</span>` : ''}
      </button>`;
    });
    const target = Math.max(24, Math.ceil(cells.length / 6) * 6);
    while (cells.length < target) cells.push('<span class="bag-cell is-empty" aria-hidden="true"></span>');

    const seg = (id, label) =>
      `<button class="seg-btn ${this.invFilter === id ? 'is-on' : ''}" data-inv-filter="${id}">${label}</button>`;
    const sortLabel = { type: 'Rodzaj', name: 'Nazwa', value: 'Wartość' }[this.invSort] ?? 'Rodzaj';

    this.heroBody.innerHTML = `
      <div class="hero-sheet">
        <section class="sheet-col">
          <div class="sheet-head"><span>Założone</span><span class="sheet-note">klik = zdejmij</span></div>
          <div class="eq-list">${eqRows}</div>
          <div class="eq-summary">
            <div class="kv"><span>Atak</span><b>${p.attackPower.toFixed(1)}${eqStats.attack ? ` <i>+${eqStats.attack}</i>` : ''}</b></div>
            <div class="kv"><span>Pancerz</span><b>${p.armor.toFixed(1)}</b></div>
            <div class="kv"><span>Złoto</span><b class="gold">${fmt(inv.gold)}</b></div>
            <div class="kv"><span>Miejsca</span><b>${inv.items.size}<span class="dim"> / ${inv.capacity}</span></b></div>
          </div>
        </section>

        <section class="sheet-col sheet-bag">
          <div class="sheet-head">
            <span>Torba</span>
            <div class="seg">${seg('all', 'Wszystko')}${seg('gear', 'Ekwipunek')}${seg('use', 'Mikstury')}${seg('mat', 'Materiały')}</div>
          </div>
          <div class="bag-grid" id="bag-grid">${cells.join('')}</div>
          ${filtered.length === 0 ? '<div class="sheet-empty">Ta kategoria jest pusta.</div>' : ''}
          <div class="sheet-foot">
            <span class="sheet-note">${filtered.length} ${filtered.length === 1 ? 'przedmiot' : 'przedmiotów'} · sortowanie: ${sortLabel}</span>
            <div class="seg seg-sm">
              <button class="seg-btn" data-inv-sort="1">Rodzaj</button>
              <button class="seg-btn" data-inv-sort="1">Nazwa</button>
              <button class="seg-btn" data-inv-sort="1">Wartość</button>
            </div>
          </div>
        </section>

        <aside class="sheet-col sheet-detail" id="item-detail">${this._renderItemDetail()}</aside>
      </div>`;

    // ---- zdarzenia --------------------------------------------------------
    this.heroBody.querySelectorAll('[data-inv-filter]').forEach((b) => {
      b.addEventListener('click', () => {
        this.invFilter = b.dataset.invFilter;
        this.game.audio?.uiClick();
        this.renderInventory();
      });
    });
    this.heroBody.querySelectorAll('[data-inv-sort]').forEach((b, i) => {
      b.addEventListener('click', () => {
        this.invSort = ['type', 'name', 'value'][i] ?? 'type';
        this.game.audio?.uiClick();
        this.renderInventory();
      });
    });
    this.heroBody.querySelectorAll('[data-item]').forEach((c) => {
      c.addEventListener('click', () => this.selectItem(c.dataset.item));
    });
    this.heroBody.querySelectorAll('[data-unequip]').forEach((c) => {
      c.addEventListener('click', () => {
        if (!this.game.player.inventory.equipped[c.dataset.unequip]) return;
        this.game.player.inventory.unequip(c.dataset.unequip);
        this.game.player.recalc();
        this.game.audio?.uiClick();
        this.renderInventory();
        this.refreshHud();
      });
    });
    this._bindItemDetail();
  }

  /** Wybór przedmiotu nie przerysowuje całej torby — tylko podświetlenie i opis. */
  selectItem(id) {
    this.selectedItem = id;
    this.game.audio?.uiClick();
    this.heroBody?.querySelectorAll('[data-item]').forEach((c) => {
      c.classList.toggle('is-selected', c.dataset.item === id);
    });
    const box = this.heroBody?.querySelector('#item-detail');
    if (box) {
      box.innerHTML = this._renderItemDetail();
      this._bindItemDetail();
    }
  }

  _renderItemDetail() {
    const p = this.game.player;
    const inv = p.inventory;
    const sel = this.selectedItem && inv.has(this.selectedItem) ? this.selectedItem : null;
    const def = sel ? ITEMS[sel] : null;
    if (!def) {
      return `<div class="item-card is-empty"><div class="item-empty">Wybierz przedmiot z torby,<br/>aby zobaczyć szczegóły.</div></div>`;
    }
    const rar = RARITY[def.rarity] ?? RARITY.common;
    const equippedId = def.slot ? inv.equipped[def.slot] : null;
    const equipped = equippedId ? ITEMS[equippedId] : null;
    const keys = [...new Set([...Object.keys(def.stats ?? {}), ...Object.keys(equipped?.stats ?? {})])];

    const statLines = keys.map((k) => {
      const v = def.stats?.[k] ?? 0;
      const cur = equipped?.stats?.[k] ?? 0;
      const diff = def.slot ? v - cur : 0;
      const delta = diff > 0 ? `<i class="delta up">+${diff}</i>`
        : diff < 0 ? `<i class="delta down">${diff}</i>` : '';
      return `<div class="stat-line"><span>${this._statName(k)}</span><b>${v > 0 ? '+' : ''}${v}</b>${delta}</div>`;
    }).join('');

    const effect = def.use
      ? `<div class="stat-line effect"><span>Efekt</span><b>${
        [def.use.heal ? `+${def.use.heal} życia` : '', def.use.mana ? `+${def.use.mana} many` : '',
          def.use.buff ? `+${def.use.buff.attack}% obrażeń / ${def.use.buff.duration}s` : '']
          .filter(Boolean).join(' · ') || 'natychmiastowy'
      }</b></div>`
      : '';

    const compare = equipped && equippedId !== sel
      ? `<div class="item-compare">Zamiast: <b>${equipped.name}</b></div>` : '';

    return `<div class="item-card ${rar.cls}">
      <div class="item-top">
        <span class="item-icon">${icon(def.icon, 30)}</span>
        <div class="item-head">
          <h3>${def.name}</h3>
          <div class="item-sub"><span class="rarity">${rar.name}</span> · ${this._typeName(def)}</div>
        </div>
      </div>
      <div class="item-stats">${statLines}${effect}</div>
      ${compare}
      <p class="item-desc">${def.desc ?? ''}</p>
      <div class="item-foot"><span>Wartość</span><b>${def.value ? `${fmt(def.value)} szt.` : '—'}</b></div>
      <div class="item-actions">
        ${def.slot ? `<button class="primary" data-equip="${sel}">Załóż</button>` : ''}
        ${def.use ? `<button class="primary" data-use="${sel}">Użyj</button>` : ''}
        <button data-close="hero">Zamknij</button>
      </div>
      <div class="item-hint">${def.slot ? 'Enter — załóż' : def.use ? 'Enter — użyj' : 'Enter — nic nie robi'} · Esc — zamknij</div>
    </div>`;
  }

  _bindItemDetail() {
    const box = this.heroBody?.querySelector('#item-detail');
    if (!box) return;
    box.querySelectorAll('[data-equip]').forEach((b) => {
      b.addEventListener('click', () => {
        if (this.game.player.inventory.equip(b.dataset.equip)) {
          this.game.player.recalc();
          this.game.audio?.uiClick();
          this.renderInventory();
          this.refreshHud();
        }
      });
    });
    box.querySelectorAll('[data-use]').forEach((b) => {
      b.addEventListener('click', () => {
        if (this.game.player.useItem(b.dataset.use)) {
          this.renderInventory();
          this.refreshHud();
        }
      });
    });
  }

  /** Enter w ekwipunku: założ albo użyj wybranego przedmiotu. */
  activateSelectedItem() {
    const id = this.selectedItem;
    if (!id || !this.game.player.inventory.has(id)) return false;
    const def = ITEMS[id];
    if (!def) return false;
    if (def.slot) {
      if (this.game.player.inventory.equip(id)) {
        this.game.player.recalc();
        this.renderInventory();
        this.refreshHud();
        this.game.audio?.uiClick();
        return true;
      }
    }
    if (def.use && this.game.player.useItem(id)) {
      this.renderInventory();
      this.refreshHud();
      return true;
    }
    return false;
  }

  _typeName(def) {
    return { weapon: 'Broń', armor: 'Zbroja', helm: 'Hełm', trinket: 'Amulet', consumable: 'Mikstura', material: 'Materiał', quest: 'Przedmiot fabularny' }[def.type] ?? def.type;
  }

  _statName(k) {
    return { attack: 'Atak', armor: 'Pancerz', hp: 'Życie', mana: 'Mana', crit: 'Kryt', speed: 'Szybkość' }[k] ?? k;
  }

  renderQuests() {
    const qs_ = this.game.quests;
    const active = qs_.activeQuest;
    const activeHtml = active
      ? `<div class="quest-entry active">
          <h4>${active.name}</h4>
          <div class="q-desc">${active.intro}</div>
          ${active.objectives.map((o) => {
            const st = qs_.objectiveState(o);
            let text = o.text.replace(/\(\d+\/\d+\)$/, '').trim();
            if ((o.target ?? 1) > 1) text += ` — ${st.current}/${st.target}`;
            return `<div class="q-obj ${st.done ? 'done' : ''}"><span class="tick">${st.done ? '✔' : '◇'}</span><span>${text}</span></div>`;
          }).join('')}
          <div class="reward">Nagroda: ${active.reward.gold} złota · ${active.reward.xp} PD${active.reward.items?.length ? ' · przedmioty' : ''}</div>
        </div>`
      : '<div class="empty-note">Brak aktywnego zadania. Porozmawiaj ze Starym Eryn w Wilczej Dolinie.</div>';

    const completedHtml = QUEST_ORDER.filter((id) => qs_.questDone(id))
      .map((id) => {
        const q = QUESTS[id];
        return `<div class="quest-entry done"><h4>✔ ${q.name}</h4><div class="q-desc">${q.outro ?? ''}</div></div>`;
      })
      .join('');

    this.heroBody.innerHTML = `
      <div class="grid-2">
        <div>
          <div class="card"><h4>W toku</h4>${activeHtml}</div>
          <div class="card" style="margin-top:14px"><h4>Ukończone</h4>${completedHtml || '<div class="empty-note">Jeszcze nic.</div>'}</div>
        </div>
        <div>
          <div class="card">
            <h4>Wieści z doliny</h4>
            ${LORE.map((l) => `<div class="q-obj" style="margin-bottom:9px"><span class="tick">·</span><span>${l}</span></div>`).join('')}
          </div>
          <div class="card" style="margin-top:14px">
            <h4>Zlecenia z tablicy</h4>
            ${(this.game.contracts?.activeLines() ?? []).length
              ? this.game.contracts.activeLines().map((c) => `<div class="q-obj ${c.done ? 'done' : ''}"><span class="tick">${c.done ? '✔' : '◇'}</span><span><b>${c.name}</b> — ${c.text}</span></div>`).join('')
              : '<div class="empty-note">Tablica w Wilczej Dolinie czeka na śmiałków.</div>'}
          </div>
          <div class="card" style="margin-top:14px">
            <h4>Wskazówka</h4>
            <p class="panel-note">${TIPS[Math.floor(Math.random() * TIPS.length)]}</p>
          </div>
        </div>
      </div>`;
  }

  // ---------------- rozwój (perki) ----------------
  renderPerks() {
    const p = this.game.player;
    const perks = p.perks;
    const state = perks.treeState();
    const mods = perks.mods;
    const rows = [
      ['Obrażenia', `+${Math.round((mods.damage ?? 0) * 100)}%`],
      ['Pancerz', `+${Math.round((mods.armor ?? 0) * 100)}%`],
      ['Kryt', `+${Math.round((mods.crit ?? 0) * 100)}%`],
      ['Życie', `+${Math.round((mods.hp ?? 0) * 100)}%`],
      ['Mana', `+${Math.round((mods.mana ?? 0) * 100)}%`],
      ['Moc zaklęć', `+${Math.round((mods.spellPower ?? 0) * 100)}%`],
      ['Cios w plecy', `+${Math.round((mods.backstab ?? 0) * 100)}%`],
      ['Skradanie', `${Math.round((1 + (mods.stealth ?? 0)) * 100)}% zasięgu`],
      ['Łup', `+${Math.round((mods.loot ?? 0) * 100)}% złota`],
    ];

    const treeHtml = state.map((tree) => `
      <div class="card perk-tree" style="border-left-color:${tree.color}">
        <h4 style="color:${tree.color}">${tree.glyph} ${tree.name}</h4>
        <div class="perk-list">
          ${tree.perks.map((perk) => {
            const ranks = Array.from({ length: perk.maxRank }, (_, i) => `<span class="pip ${i < perk.rank ? 'on' : ''}"></span>`).join('');
            const locked = perk.req && (perks.rank(perk.req.perk) ?? 0) < perk.req.rank;
            const reqName = locked ? PERKS[perk.req.perk].name : null;
            return `<div class="perk-row ${perk.rank >= perk.maxRank ? 'maxed' : ''} ${locked ? 'locked' : ''}">
              <div class="perk-glyph">${perk.glyph}</div>
              <div class="perk-info">
                <div class="perk-name">${perk.name} <span class="pips">${ranks}</span></div>
                <div class="perk-desc">${perk.desc}</div>
                ${locked ? `<div class="perk-req">Wymaga: ${reqName}</div>` : ''}
              </div>
              <button class="perk-buy" data-perk="${perk.id}" ${perk.canBuy ? '' : 'disabled'}>
                ${perk.rank >= perk.maxRank ? 'Maks.' : 'Rozwiń'}
              </button>
            </div>`;
          }).join('')}
        </div>
      </div>`).join('');

    this.heroBody.innerHTML = `
      <div class="perk-head">
        <div>
          <div class="points-left">Punkty rozwoju: <b>${perks.points}</b> · wykupione rangi: <b>${perks.totalRanks()}</b></div>
          <p class="panel-note">Punkty zdobywasz za każdy poziom doświadczenia. Kolejne rangi odblokowują się po wykupieniu wcześniejszych.</p>
        </div>
      </div>
      <div class="grid-2 perk-grid">
        <div class="perk-trees">${treeHtml}</div>
        <div>
          <div class="card">
            <h4>Efekty rozwoju</h4>
            ${rows.map(([k, v]) => `<div class="stat-row"><span class="k">${k}</span><span class="v">${v}</span></div>`).join('')}
          </div>
          <div class="card" style="margin-top:14px">
            <h4>Jak używać</h4>
            <p class="panel-note">Prawy przycisk myszy — blok (parowanie w pierwszych 0,25 s daje kontrę).<br/>
            Klawisz X — skradanie: wrogowie widzą cię później, a cios w nieświadomego celu bije mocniej.<br/>
            Trzy ciosy w rytmie tworzą kombinację, trzeci jest najsilniejszy.</p>
          </div>
        </div>
      </div>`;

    this.heroBody.querySelectorAll('[data-perk]').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (perks.buy(btn.dataset.perk)) {
          this.game.audio?.uiClick();
          this.renderPerks();
          this.refreshHud();
        }
      });
    });
  }

  // ---------------- sklep ----------------
  openShop(id) {
    this.shopId = id;
    this.shopTab = 'buy';
    this.shopPanel.classList.remove('hidden');
    this.shopPanel.classList.add('show');
    this.renderShop();
    this.game.openUI();
  }

  renderShop() {
    const shopDef = SHOPS[this.shopId];
    if (!shopDef) return;
    const inv = this.game.player.inventory;
    qs('#shop-title').textContent = shopDef.name;
    qs('#shop-gold').textContent = `Masz ${fmt(inv.gold)} złota`;
    for (const b of this.shopPanel.querySelectorAll('[data-shop-tab]')) {
      b.classList.toggle('active', b.dataset.shopTab === this.shopTab);
    }
    const body = qs('#shop-body');
    if (this.shopTab === 'buy') {
      const counts = {};
      for (const id of shopDef.stock) counts[id] = (counts[id] ?? 0) + 1;
      body.innerHTML = `<div class="shop-list">${Object.entries(counts).map(([id, qty]) => {
        const it = ITEMS[id];
        const price = Math.round(it.value * 1.5);
        return `<div class="shop-row">
          <div class="ico">${icon(it.icon, 20)}</div>
          <div class="info"><div class="nm">${it.name}</div><div class="sub">${itemStatSummary(id) || this._typeName(it)}${qty > 1 ? ` · dostępne: ${qty}` : ''}</div></div>
          <div class="price">${price} szt.</div>
          <button data-buy="${id}" ${inv.gold < price ? 'disabled' : ''}>Kup</button>
        </div>`;
      }).join('')}</div>`;
    } else {
      const items = inv.list().filter((e) => e.def.type !== 'quest');
      body.innerHTML = items.length
        ? `<div class="shop-list">${items.map((e) => {
            const price = Math.max(1, Math.round(e.def.value * 0.45));
            return `<div class="shop-row">
              <div class="ico">${icon(e.def.icon, 20)}</div>
              <div class="info"><div class="nm">${e.def.name}${e.qty > 1 ? ` ×${e.qty}` : ''}</div><div class="sub">${this._typeName(e.def)}</div></div>
              <div class="price">${price} szt.</div>
              <button data-sell="${e.id}">Sprzedaj</button>
            </div>`;
          }).join('')}</div>`
        : '<div class="empty-note">Nie masz nic na sprzedaż.</div>';
    }
  }

  // ---------------- rzemiosło ----------------
  openCrafting(station = 'village') {
    this.craftStation = station;
    this.craftPanel.classList.remove('hidden');
    this.craftPanel.classList.add('show');
    this.renderCrafting();
    this.game.openUI();
    this.game.audio?.uiOpen();
  }

  renderCrafting() {
    const inv = this.game.player.inventory;
    const stationName = this.craftStation === 'ancient' || this.craftStation === 'ancient_forge' ? 'Starożytna kuźnia' : 'Kuźnia Borysa';
    qs('#craft-sub').textContent = `${stationName} · złoto: ${fmt(inv.gold)}`;
    const body = qs('#craft-body');
    body.innerHTML = RECIPES.map((r) => {
      const needsAncient = !!r.legendary;
      const canStation = !needsAncient || this.craftStation === 'ancient' || this.craftStation === 'ancient_forge';
      const mats = Object.entries(r.mats).map(([id, qty]) => {
        const have = inv.count(id);
        return `<span style="color:${have >= qty ? '#8fbf72' : '#e08e84'}">${icon(ITEMS[id].icon, 13)} ${ITEMS[id].name} ${have}/${qty}</span>`;
      }).join(' · ');
      const goldOk = inv.gold >= r.cost;
      const matsOk = Object.entries(r.mats).every(([id, qty]) => inv.count(id) >= qty);
      const can = canStation && goldOk && matsOk;
      const outDef = ITEMS[r.out.id];
      return `<div class="shop-row">
        <div class="ico">${icon(outDef.icon, 20)}</div>
        <div class="info">
          <div class="nm" style="color:${RARITY[outDef.rarity].color}">${r.name}${r.out.qty > 1 ? ` ×${r.out.qty}` : ''}</div>
          <div class="sub">${mats}</div>
          <div class="sub" style="color:${goldOk ? 'var(--text-dim)' : '#e08e84'}">Koszt: ${r.cost} szt. złota</div>
          ${!canStation ? '<div class="sub" style="color:#e0a851">Wymaga Starożytnej Kuźni na Kowalskiej Górze</div>' : ''}
        </div>
        <button data-craft="${r.id}" ${can ? '' : 'disabled'}>Wykuj</button>
      </div>`;
    }).join('');
  }

  openMap() {
    this.mapPanel.classList.remove('hidden');
    this.mapPanel.classList.add('show');
    this.drawBigMap();
    this.game.openUI();
  }

  // ---------------- dialog ----------------
  showDialogue({ speaker, role, text, choices, onChoose, onClose, myLine = false }) {
    if (!this.dialogueEl) {
      const d = document.createElement('div');
      d.className = 'dialogue-layer';
      d.innerHTML = `
        <div class="dialogue-box">
          <div class="dialogue-portrait" id="dialogue-portrait"><span></span></div>
          <div class="dialogue-main">
            <div class="dialogue-head">
              <div class="dialogue-speaker"></div>
              <div class="dialogue-mood" id="dialogue-mood"></div>
            </div>
            <div class="dialogue-text"></div>
            <div class="dialogue-choices"></div>
            <div class="dialogue-hint">
              <span class="hint-keys">1–4 — wybór</span>
              <span class="hint-space">Spacja — dalej</span>
              <span>ESC — zakończ rozmowę</span>
            </div>
          </div>
          <button class="dialogue-voice" id="dialogue-voice" title="Przeczytaj kwestię ponownie">🔊</button>
        </div>`;
      this.root.appendChild(d);
      this.dialogueEl = d;
    }
    const d = this.dialogueEl;
    d.classList.remove('hidden');
    this.dialogueOpen = true;
    this.dialogueSpeaker = speaker;
    this.dialogueMyLine = !!myLine;

    // ---- portret: medalion z inicjałami i kolorem postaci ----
    const portrait = qs('#dialogue-portrait', d);
    if (portrait) {
      const initials = (speaker || '?')
        .split(/\s+/)
        .filter(Boolean)
        .slice(-2)
        .map((w) => w[0])
        .join('')
        .toUpperCase();
      const hue = [...String(speaker ?? '')].reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
      portrait.style.setProperty('--portrait-hue', hue);
      portrait.classList.toggle('player-line', myLine);
      const span = qs('span', portrait);
      if (span) span.textContent = initials || '?';
      portrait.title = role ? `${speaker} — ${role}` : speaker;
    }

    qs('.dialogue-speaker', d).textContent = role ? `${speaker} — ${role}` : speaker;

    const moodEl = qs('#dialogue-mood', d);
    const textEl = qs('.dialogue-text', d);
    const narrator = this.game.voice?.currentEmotion;

    // ---- efekt „pisania” + podświetlanie wypowiadanego słowa ----
    const full = String(text ?? '');
    this._dialogueFull = full;
    this._dialogueShown = 0;
    this._dialogueWordFrom = -1;
    this._dialogueWordTo = -1;
    textEl.innerHTML = '';
    const words = full.split(/(\s+)/);
    let idx = 0;
    for (const w of words) {
      const span = document.createElement('span');
      span.className = w.trim() ? 'dw' : 'ds';
      span.textContent = w;
      span.dataset.from = String(idx);
      span.dataset.to = String(idx + w.length);
      textEl.appendChild(span);
      idx += w.length;
    }
    const wordSpans = [...textEl.querySelectorAll('.dw')];
    wordSpans.forEach((w, i) => { w.style.animationDelay = `${Math.min(900, i * 26)}ms`; });

    const voice = this.game.voice;
    if (moodEl) {
      moodEl.textContent = '';
      moodEl.className = 'dialogue-mood';
    }

    const highlight = (charIndex) => {
      for (const w of wordSpans) {
        const from = Number(w.dataset.from);
        const to = Number(w.dataset.to);
        w.classList.toggle('speaking', charIndex >= from && charIndex < to);
      }
    };

    const speakLine = () => {
      if (moodEl) {
        const emo = this.game.voice?.currentEmotion;
        moodEl.textContent = emo === 'pytanie' ? '? pytanie' : emo === 'gniew' ? '! gniew' : emo === 'wahanie' ? '… wahanie' : '';
      }
      voice?.speak?.(full, this.game.dialogue?.npcId ?? (myLine ? 'player' : 'narrator'), {
        onWord: (i) => highlight(i),
      });
    };
    speakLine();

    const voiceBtn = qs('#dialogue-voice', d);
    if (voiceBtn) {
      const ok = voice?.available || voice?.supported;
      voiceBtn.style.display = ok ? '' : 'none';
      voiceBtn.title = voice?.status?.() ?? '';
      voiceBtn.onclick = (e) => {
        e.stopPropagation();
        voice?.stop?.();
        voice?.speak?.(full, this.game.dialogue?.npcId ?? (myLine ? 'player' : 'narrator'), {
          onWord: (i) => highlight(i),
        });
      };
    }

    const ch = qs('.dialogue-choices', d);
    ch.innerHTML = '';
    choices.forEach((c, i) => {
      const b = document.createElement('button');
      b.innerHTML = `<span class="num">${i + 1}</span><span class="arrow">▸</span>${c.label}`;
      if (c.special) b.classList.add('special');
      b.dataset.choice = String(i);
      b.addEventListener('click', () => {
        this.game.audio?.uiClick();
        onChoose(i);
      });
      ch.appendChild(b);
    });
    this.dialogueChoices = choices;
    this.dialogueOnChoose = onChoose;
    this.dialogueOnClose = onClose;
    this.game.openUI(true);
  }

  /** Podświetla wypowiadane słowo (wywoływane przez syntezę mowy). */
  highlightDialogueWord(charIndex) {
    if (!this.dialogueEl) return;
    for (const w of this.dialogueEl.querySelectorAll('.dialogue-text .dw')) {
      const from = Number(w.dataset.from);
      const to = Number(w.dataset.to);
      w.classList.toggle('speaking', charIndex >= from && charIndex < to);
    }
  }

  /** Wybór opcji dialogowej z klawiatury (1–4). */
  chooseDialogueByKey(index) {
    if (!this.dialogueOpen) return false;
    const choice = this.dialogueChoices?.[index];
    if (!choice) return false;
    this.game.audio?.uiClick();
    this.dialogueOnChoose?.(index);
    return true;
  }

  hideDialogue() {
    if (this.dialogueEl) this.dialogueEl.classList.add('hidden');
    this.dialogueOpen = false;
  }

  showQuestIntro(quest, onDone) {
    const el = this.questIntro;
    qs('#qi-name').textContent = quest.name;
    qs('#qi-sub').textContent = 'Nowe zadanie';
    qs('#qi-text').textContent = quest.intro;
    qs('#qi-objectives').innerHTML = quest.objectives.map((o) => `<div>◇ ${o.text.replace(/\(\d+\/\d+\)$/, '').trim()}</div>`).join('');
    el.classList.remove('hidden');
    el.classList.add('show');
    const btn = qs('#qi-btn');
    btn.textContent = quest.final ? 'Wyruszam' : 'Przyjmuję';
    btn.onclick = () => {
      el.classList.add('hidden');
      el.classList.remove('show');
      this.game.audio?.uiClick();
      onDone?.();
    };
    this.game.openUI(true);
  }

  showQuestOutro(quest, onDone) {
    const el = this.questIntro;
    qs('#qi-name').textContent = quest.name;
    qs('#qi-sub').textContent = 'Zadanie ukończone';
    qs('#qi-text').textContent = quest.outro ?? '';
    qs('#qi-objectives').innerHTML = `<div style="color:var(--gold)">Nagroda: ${quest.reward.gold} złota · ${quest.reward.xp} PD</div>`;
    el.classList.remove('hidden');
    el.classList.add('show');
    const btn = qs('#qi-btn');
    btn.textContent = 'Kontynuuj';
    btn.onclick = () => {
      el.classList.add('hidden');
      el.classList.remove('show');
      this.game.audio?.uiClick();
      onDone?.();
    };
    this.game.openUI(true);
  }

  /** Wspólny panel informacyjny (sterowanie, ustawienia, o grze). */
  showInfo(title, sub, html) {
    qs('#info-title').textContent = title;
    qs('#info-sub').textContent = sub ?? '';
    qs('#info-body').innerHTML = html;
    this.infoPanel.classList.remove('hidden');
    this.infoPanel.classList.add('show');
    this.infoOpen = true;
    this.infoFromTitle = this.game.state === 'title';
    this.game.openUI(true);
  }

  showControls() {
    qs('#info-title').textContent = 'Sterowanie';
    qs('#info-sub').textContent = 'Wszystko pod ręką';
    qs('#info-body').innerHTML = `
      <div class="grid-2">
        <div>
          ${[
            ['W A S D', 'Ruch postaci'], ['Shift', 'Bieg (zużywa kondycję)'],
            ['Lewy przycisk myszy', 'Atak (3-ciosowa kombinacja)'],
            ['Spacja', 'Unik / przewrót (nietykalność)'],
            ['Q / E / R', 'Zaklęcia: Znak Świtu, Wilczy Zew, Blask Świtu'],
            ['1 / 2', 'Mikstury z paska szybkiego dostępu'],
            ['Prawy przycisk myszy', 'Blok (parowanie w 0,25 s daje kontrę)'],
            ['X', 'Skradanie — ciszej, cios w plecy mocniejszy'],
            ['V', 'Głosy postaci — włącz / wyłącz'],
          ].map(([k, v]) => `<div class="kbd-row"><kbd>${k}</kbd><span>${v}</span></div>`).join('')}
        </div>
        <div>
          ${[
            ['F', 'Interakcja: rozmowa, kuźnia, zioła, skrzynie'],
            ['I', 'Ekwipunek'], ['C', 'Postać i atrybuty'], ['K', 'Zadania'],
            ['P', 'Rozwój — drzewko perków (Wojownik / Łowca / Mag)'],
            ['F', 'Tablica zleceń w Wilczej Dolinie — poboczne kontrakty'],
            ['M', 'Mapa świata'], ['Esc', 'Pauza, zapis, wyjście'],
            ['Mysz', 'Rozglądanie (po kliknięciu w planszę)'],
          ].map(([k, v]) => `<div class="kbd-row"><kbd>${k}</kbd><span>${v}</span></div>`).join('')}
        </div>
      </div>
      <p class="panel-note" style="margin-top:16px">Gra automatycznie zapisuje postęp co jakiś czas oraz po ukończeniu zadania. Na urządzeniach dotykowych lewa strona ekranu to ruch, prawa — rozglądanie.</p>`;
    this.infoPanel.classList.remove('hidden');
    this.infoPanel.classList.add('show');
    this.infoOpen = true;
    this.game.openUI(true);
  }

  hideInfo() {
    this.infoPanel.classList.add('hidden');
    this.infoPanel.classList.remove('show');
    this.infoOpen = false;
  }

  showAbout() {
    qs('#info-title').textContent = 'Runy Przeznaczenia';
    qs('#info-sub').textContent = 'RPG 3D w przeglądarce';
    qs('#info-body').innerHTML = `
      <p class="panel-note" style="font-size:13px;line-height:1.9">
      Trójwymiarowa gra RPG osadzona w Wilczej Dolinie — małej osadzie na skraju mgły.
      Wcielasz się w Kaela, syna kowala i nosiciela rozerwanej legendy o Ostrem Świtu.
      Odnajdź trzy okruchy ostrza, zanim Kaldras otworzy Mgliste Wrota.
      </p>
      <div class="grid-2" style="margin-top:16px">
        <div class="card"><h4>Co jest w grze</h4>
          <div class="stat-row"><span class="k">Świat 3D</span><span class="v">proceduralny teren, cykl dnia i nocy</span></div>
          <div class="stat-row"><span class="k">Walka</span><span class="v">kombinacje, uniki, krytyki, 3 zaklęcia</span></div>
          <div class="stat-row"><span class="k">Rozwój</span><span class="v">poziomy, atrybuty, ekwipunek</span></div>
          <div class="stat-row"><span class="k">Fabuła</span><span class="v">5 zadań, dialogi, wybory</span></div>
          <div class="stat-row"><span class="k">Rzemiosło</span><span class="v">kuźnia, mikstury, legendarna klinga</span></div>
          <div class="stat-row"><span class="k">Dźwięk</span><span class="v">nagrane kroki, pętle lasu, fechtunek, głosy</span></div>
        </div>
        <div class="card"><h4>Podpowiedź</h4>
          <p class="panel-note">Zacznij od rozmowy ze Starym Eryn przy ognisku w Wilczej Dolinie.
          Nocą w kurhanie pojawia się coś, czego nie ma w dzień. A prawdziwa kuźnia leży na Kowalskiej Górze.</p>
        </div>
      </div>
      <div class="card" style="margin-top:14px">
        <h4>Autorzy i licencje</h4>
        <div class="stat-row"><span class="k">Kod i świat</span><span class="v">własny — Three.js + proceduralny teren</span></div>
        <div class="stat-row"><span class="k">Modele 3D</span><span class="v">KayKit (CC0) — drzewa, ruiny, sprzęty, szkielety</span></div>
        <div class="stat-row"><span class="k">Dźwięk</span><span class="v">Oculus Audio Pack, © Meta, CC BY 4.0</span></div>
        <div class="stat-row"><span class="k">Pismo</span><span class="v">Cinzel i Inter — SIL OFL 1.1</span></div>
        <div class="stat-row"><span class="k">Wersja</span><span class="v">1.3 · pełna lista źródeł w ASSETS.md</span></div>
      </div>`;
    this.infoPanel.classList.remove('hidden');
    this.infoPanel.classList.add('show');
    this.infoOpen = true;
    this.game.openUI(true);
  }

  // =======================================================================
  // EKRANY STANU
  // =======================================================================
  showTitle() {
    this.refreshMenuState();
    this.titleScreen.classList.remove('hidden');
    clearInterval(this._menuTimer);
    // zegar świata i rotacja wskazówek — menu żyje, zamiast stać w miejscu
    this._menuTimer = setInterval(() => {
      if (this.titleScreen.classList.contains('hidden')) return;
      const clock = this.titleScreen.querySelector('#menu-clock');
      if (clock) clock.textContent = this.game.dayNight?.clockString ?? '—';
      if (Math.random() < 0.35) {
        const tip = this.titleScreen.querySelector('#title-tip');
        if (tip) tip.innerHTML = `<span>Wskazówka</span>${this._nextTip()}`;
      }
    }, 4000);
    // fokus na pierwszym przycisku — Enter od razu działa
    const first = this.titleScreen.querySelector('.menu-buttons button.primary:not([disabled])')
      ?? this.titleScreen.querySelector('.menu-buttons button:not([disabled])');
    first?.focus();
  }

  hideTitle() {
    clearInterval(this._menuTimer);
    this._menuTimer = null;
    this.titleScreen.classList.add('hidden');
  }

  showPause() {
    this.refreshMenuState();
    this.pauseScreen.classList.remove('hidden');
    const first = this.pauseScreen.querySelector('.menu-buttons button.primary:not([disabled])');
    first?.focus();
  }

  hidePause() {
    this.pauseScreen.classList.add('hidden');
  }

  showDeath(goldLost = 0) {
    qs('#death-foot').innerHTML = goldLost > 0 ? `Straciłeś ${goldLost} złota.` : 'Wioska wciąż czeka.';
    this.deathScreen.classList.remove('hidden');
  }

  hideDeath() {
    this.deathScreen.classList.add('hidden');
  }

  showVictory(stats) {
    qs('#victory-text').textContent =
      'Mgła cofa się od wrót, a nad Wilczą Doliną wschodzi słońce. Kaldras upada — nie jako potwór, lecz jako strażnik, który wreszcie może odejść. Wioska będzie opowiadać o tobie przez wiele zim.';
    qs('#victory-stats').innerHTML =
      `Poziom ${stats.level} · ${stats.xp} PD · ${stats.gold} złota · ${stats.kills} pokonanych wrogów · ${stats.quests}/5 zadań`;
    this.victoryScreen.classList.remove('hidden');
    this.game.audio?.victory();
  }

  hideVictory() {
    this.victoryScreen.classList.add('hidden');
    this.game.resumeFromUi();
  }

  // =======================================================================
  // HUD: aktualizacja
  // =======================================================================
  refreshHud() {
    const p = this.game.player;
    if (!p) return;
    qs('#hero-level').textContent = p.level;
    qs('#hero-sub').textContent = `Wędrowny najemnik · Poziom ${p.level}`;
    qs('#hero-gold').textContent = `${fmt(p.inventory.gold)} szt.`;
    qs('#bar-hp').style.width = `${clamp01(p.hp / p.maxHP) * 100}%`;
    qs('#bar-stam').style.width = `${clamp01(p.stamina / p.maxStamina) * 100}%`;
    qs('#bar-mana').style.width = `${clamp01(p.mana / p.maxMana) * 100}%`;
    qs('#bar-xp').style.width = `${clamp01(p.xp / p.xpNeeded) * 100}%`;
    qs('#label-hp').textContent = `${Math.ceil(p.hp)} / ${p.maxHP}`;
    qs('#label-stam').textContent = `${Math.ceil(p.stamina)}`;
    qs('#label-mana').textContent = `${Math.ceil(p.mana)} / ${p.maxMana}`;
    qs('#label-xp').textContent = `${fmt(p.xp)} / ${fmt(p.xpNeeded)} PD`;

    // znacznik pogody i krainy
    const tag = qs('#world-tag');
    if (tag) {
      const w = this.game.weather;
      const biome = this._biomeLabel?.() ?? '';
      const icon = w ? ({ Pogodnie: '☀', Zachmurzenie: '☁', Deszcz: '☂', Burza: '⚡', Mgła: '≋' }[w.label] ?? '☀') : '☀';
      const weather = w ? `${icon} ${w.label}` : '';
      tag.textContent = [weather, biome].filter(Boolean).join(' · ');
      tag.classList.toggle('night', !!this.game.dayNight?.isNight);
    }

    // stan bohatera: skradanie, blok, bieg, brodzenie w rzece
    const status = qs('#hero-status');
    if (status) {
      const chips = [];
      if (p.stealth) chips.push(['◐', 'Skradanie', 'stealth']);
      if (p.blocking) chips.push(['⛨', 'Blok', 'block']);
      if (p.sprinting) chips.push(['»', 'Bieg', 'sprint']);
      if (this.game.world?.bridgeDeckAt?.(p.pos.x, p.pos.z) !== null) chips.push(['⌒', 'Most', 'bridge']);
      if (this.game.weather?.rain > 0.25) chips.push(['☂', 'Deszcz', 'rain']);
      const html = chips.map(([g, t, c]) => `<span class="hchip ${c}"><b>${g}</b>${t}</span>`).join('');
      if (status.dataset.sig !== html) {
        status.innerHTML = html;
        status.dataset.sig = html;
      }
    }

    // niski poziom zdrowia — pulsująca obwódka
    this.hud.classList.toggle('low-hp', p.hp / p.maxHP < 0.3 && !p.dead);
    this.hud.classList.toggle('low-mana', p.mana < p.maxMana * 0.15);

    // zaklęcia
    SPELLS.forEach((s, i) => {
      const el = this.spellEls[i];
      const locked = p.level < s.level;
      el.classList.toggle('locked', locked);
      el.classList.toggle('ready', !locked && p.cooldowns[s.id] <= 0 && p.mana >= s.mana);
      const coolPct = p.cooldowns[s.id] > 0 ? p.cooldowns[s.id] / s.cd : 0;
      qs('.cool', el).style.transform = `scaleY(${coolPct})`;
    });

    // szybkie sloty
    const cons = p.inventory.consumables();
    this.slotEls.forEach((el, i) => {
      const item = cons[i];
      qs('.ico', el).innerHTML = item ? icon(item.def.icon, 20) : '·';
      qs('.count', el).textContent = item && item.qty > 1 ? item.qty : '';
      el.style.opacity = item ? '1' : '0.4';
    });

    // dziennik zadań
    const tracker = qs('#quest-tracker');
    const lines = this.game.quests.statusLines();
    const q = this.game.quests.activeQuest;
    qs('#qt-name').textContent = q ? q.name : 'Dziennik';
    qs('#qt-objectives').innerHTML = lines
      .map((l) => `<div class="q-obj ${l.done ? 'done' : ''}"><span class="tick">${l.done ? '✔' : '◇'}</span><span>${l.text}</span></div>`)
      .join('');
    // zlecenia z tablicy dopisujemy pod głównym wątkiem
    const contractLines = this.game.contracts?.activeLines?.() ?? [];
    if (contractLines.length) {
      qs('#qt-objectives').innerHTML += contractLines
        .map((c) => `<div class="q-obj contract ${c.done ? 'done' : ''}"><span class="tick">${c.done ? '✔' : '◈'}</span><span>${c.name}: ${c.text}</span></div>`)
        .join('');
    }
    const hasAnything = !!q || lines.length > 0 || contractLines.length > 0;
    tracker.style.display = hasAnything ? 'block' : 'none';
  }

  update(dt) {
    if (this.game.state === 'title') return;
    const p = this.game.player;
    if (!p) return;
    this.hudAcc += dt;
    if (this.hudAcc > 0.1) {
      this.hudAcc = 0;
      qs('#bar-hp').style.width = `${clamp01(p.hp / p.maxHP) * 100}%`;
      qs('#bar-stam').style.width = `${clamp01(p.stamina / p.maxStamina) * 100}%`;
      qs('#bar-mana').style.width = `${clamp01(p.mana / p.maxMana) * 100}%`;
      qs('#bar-xp').style.width = `${clamp01(p.xp / p.xpNeeded) * 100}%`;
      qs('#label-hp').textContent = `${Math.ceil(p.hp)} / ${p.maxHP}`;
      qs('#label-stam').textContent = `${Math.ceil(p.stamina)}`;
      qs('#label-mana').textContent = `${Math.ceil(p.mana)} / ${p.maxMana}`;
      qs('#label-xp').textContent = `${fmt(p.xp)} / ${fmt(p.xpNeeded)} PD`;
      this.refreshHud();
      qs('#hero-gold').textContent = `${fmt(p.inventory.gold)} szt.`;
      SPELLS.forEach((s, i) => {
        const el = this.spellEls[i];
        const locked = p.level < s.level;
        el.classList.toggle('locked', locked);
        el.classList.toggle('ready', !locked && p.cooldowns[s.id] <= 0 && p.mana >= s.mana);
        qs('.cool', el).style.transform = `scaleY(${p.cooldowns[s.id] > 0 ? p.cooldowns[s.id] / s.cd : 0})`;
      });
    }

    this._updateCompass();
    this.platesAcc += dt;
    if (this.platesAcc > 0.05) {
      this.platesAcc = 0;
      this._updateNameplates();
    }
    this._updateMinimap(dt);

    if (this.toastTimer > 0) {
      this.toastTimer -= dt;
      if (this.toastTimer <= 0) this.toastEl.classList.remove('show');
    }
    if (this.locationTimer > 0) {
      this.locationTimer -= dt;
      if (this.locationTimer <= 0) this.locEl.classList.remove('show');
    }
  }

  _updateCompass() {
    const heading = (((-this.game.cameraRig.yaw * 180) / Math.PI) % 360 + 360) % 360;
    const width = 260;
    const pxPerDeg = width / 120;
    for (const m of this.compassMarks) {
      let diff = ((Number(m.dataset.deg) - heading + 540) % 360) - 180;
      const x = width / 2 + diff * pxPerDeg;
      m.style.left = `${x}px`;
      m.style.opacity = Math.abs(diff) > 58 ? '0' : String(1 - Math.abs(diff) / 70);
    }
    const target = this.game.questTargetPos?.();
    if (target) {
      const p = this.game.player.pos;
      const bearing = ((Math.atan2(target.x - p.x, -(target.z - p.z)) * 180) / Math.PI + 360) % 360;
      const dist = Math.hypot(target.x - p.x, target.z - p.z);
      const rel = ((bearing - heading + 540) % 360) - 180;
      const arrow = Math.abs(rel) < 20 ? '▲' : rel > 0 ? '▶' : '◀';
      this.compassObj.innerHTML = `<span class="arrow">${arrow}</span>${this.game.quests.targetHint() ?? 'Cel'} · ${Math.round(dist)} m`;
    } else {
      this.compassObj.textContent = this.game.quests.targetHint() ?? '';
    }
  }

  _updateNameplates() {
    const cam = this.game.camera;
    const playerPos = this.game.player.pos;
    const enemies = this.game.enemies.list
      .filter((e) => e.active && !e.dead)
      .map((e) => ({ e, d: dist2(e.pos.x, e.pos.z, playerPos.x, playerPos.z) }))
      .filter((x) => x.d < 26)
      .sort((a, b) => a.d - b.d)
      .slice(0, 8)
      .map((x) => x.e);
    let used = 0;
    for (const e of enemies) {
      const d = dist2(e.pos.x, e.pos.z, playerPos.x, playerPos.z);
      if (d > 26) continue;
      const top = new THREE.Vector3(e.pos.x, e.pos.y + (e.def.model === 'wolf' ? 1.55 : 2.35) * (e.def.boss ? 1.3 : 1), e.pos.z);
      const proj = top.project(cam);
      if (proj.z > 1 || proj.z < -1) continue;
      const x = (proj.x * 0.5 + 0.5) * window.innerWidth;
      const y = (-proj.y * 0.5 + 0.5) * window.innerHeight;
      if (x < -80 || x > window.innerWidth + 80 || y < -40 || y > window.innerHeight + 40) continue;
      let el = this.nameplates[used];
      if (!el) {
        el = document.createElement('div');
        el.className = 'nameplate';
        el.innerHTML = '<div class="np-name"></div><div class="np-bar"><i></i></div>';
        this.worldOverlay.appendChild(el);
        this.nameplates.push(el);
      }
      used += 1;
      el.style.display = 'block';
      el.style.transform = `translate(-50%, -100%) translate(${x}px, ${y}px)`;
      el.classList.toggle('elite', e.elite || e.boss);
      const nameEl = el.firstChild;
      if (nameEl.textContent !== e.name) nameEl.textContent = e.name;
      el.lastChild.firstChild.style.width = `${clamp01(e.hp / e.maxHP) * 100}%`;
      el.style.opacity = String(clamp(1.5 - d / 26, 0.2, 1));
    }
    for (let i = used; i < this.nameplates.length; i++) this.nameplates[i].style.display = 'none';
  }

  // ---------------- minimapa ----------------
  _ensureMap() {
    if (this.mapCanvas) return;
    const size = this.mapSize;
    const c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    const ctx = c.getContext('2d');
    const img = ctx.createImageData(size, size);
    for (let py = 0; py < size; py++) {
      for (let px = 0; px < size; px++) {
        const wx = ((px + 0.5) / size) * 2 * WORLD_RADIUS - WORLD_RADIUS;
        const wz = ((py + 0.5) / size) * 2 * WORLD_RADIUS - WORLD_RADIUS;
        const col = terrainSample(wx, wz);
        const shade = hillshade(wx, wz, 4);
        const idx = (py * size + px) * 4;
        img.data[idx] = Math.min(255, col[0] * shade);
        img.data[idx + 1] = Math.min(255, col[1] * shade);
        img.data[idx + 2] = Math.min(255, col[2] * shade);
        img.data[idx + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);

    // ---- rzeki i jeziora -------------------------------------------------
    const toMap = (x, z) => ({
      x: ((x + WORLD_RADIUS) / (2 * WORLD_RADIUS)) * size,
      y: ((z + WORLD_RADIUS) / (2 * WORLD_RADIUS)) * size,
    });
    const waterScale = size / (2 * WORLD_RADIUS);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (const r of RIVER_SURFACES) {
      ctx.beginPath();
      r.points.forEach((pt, i) => {
        const m = toMap(pt.x, pt.z);
        if (i === 0) ctx.moveTo(m.x, m.y);
        else ctx.lineTo(m.x, m.y);
      });
      ctx.strokeStyle = 'rgba(28,58,74,0.95)';
      ctx.lineWidth = Math.max(2, r.width * 1.25 * waterScale);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(96,168,196,0.95)';
      ctx.lineWidth = Math.max(1.2, r.width * 0.85 * waterScale);
      ctx.stroke();
    }
    for (const l of LAKE_SURFACES) {
      if (l.level <= WATER_LEVEL + 1.5) continue;
      const m = toMap(l.x, l.z);
      const rad = l.r * waterScale;
      ctx.beginPath();
      ctx.arc(m.x, m.y, rad, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(38,86,108,0.95)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(150,206,220,0.75)';
      ctx.lineWidth = Math.max(1, size / 420);
      ctx.stroke();
    }

    // ścieżki
    ctx.strokeStyle = 'rgba(196,168,116,0.85)';
    ctx.lineWidth = Math.max(2, size / 260);
    ctx.lineJoin = 'round';
    for (const [ax, az, bx, bz] of PATHS) {
      ctx.beginPath();
      ctx.moveTo(((ax + WORLD_RADIUS) / (2 * WORLD_RADIUS)) * size, ((az + WORLD_RADIUS) / (2 * WORLD_RADIUS)) * size);
      ctx.lineTo(((bx + WORLD_RADIUS) / (2 * WORLD_RADIUS)) * size, ((bz + WORLD_RADIUS) / (2 * WORLD_RADIUS)) * size);
      ctx.stroke();
    }
    this.mapCanvas = c;
  }

  // Minimapa: kafelek terenu liczony na bieżąco wokół gracza (mapa jest duża,
  // więc skalowanie jednego obrazka dałoby rozmycie).
  _renderMinimapTile(p, viewRadius, res = 96) {
    if (!this.miniCanvas) {
      const c = document.createElement('canvas');
      c.width = res;
      c.height = res;
      this.miniCanvas = c;
      this.miniCtx = c.getContext('2d');
      this.miniImage = this.miniCtx.createImageData(res, res);
    }
    const img = this.miniImage;
    for (let py = 0; py < res; py++) {
      for (let px = 0; px < res; px++) {
        const wx = p.x + ((px + 0.5) / res - 0.5) * 2 * viewRadius;
        const wz = p.z + ((py + 0.5) / res - 0.5) * 2 * viewRadius;
        const col = terrainSample(wx, wz);
        const shade = hillshade(wx, wz, 1.6);
        const idx = (py * res + px) * 4;
        img.data[idx] = Math.min(255, col[0] * shade);
        img.data[idx + 1] = Math.min(255, col[1] * shade);
        img.data[idx + 2] = Math.min(255, col[2] * shade);
        img.data[idx + 3] = 255;
      }
    }
    this.miniCtx.putImageData(img, 0, 0);
    const toTile = (x, z) => ({
      x: ((x - p.x) / (2 * viewRadius) + 0.5) * res,
      y: ((z - p.z) / (2 * viewRadius) + 0.5) * res,
    });
    // rzeki na minimapie — rysowane wektorowo, żeby były ostre i tanie
    this.miniCtx.lineCap = 'round';
    this.miniCtx.lineJoin = 'round';
    for (const r of RIVER_SURFACES) {
      this.miniCtx.beginPath();
      r.points.forEach((pt, i) => {
        const t = toTile(pt.x, pt.z);
        if (i === 0) this.miniCtx.moveTo(t.x, t.y);
        else this.miniCtx.lineTo(t.x, t.y);
      });
      this.miniCtx.strokeStyle = 'rgba(74,146,174,0.95)';
      this.miniCtx.lineWidth = Math.max(1.6, (r.width / (2 * viewRadius)) * res * 0.85);
      this.miniCtx.stroke();
    }
    for (const l of LAKE_SURFACES) {
      if (l.level <= WATER_LEVEL + 1.5) continue;
      const t = toTile(l.x, l.z);
      this.miniCtx.beginPath();
      this.miniCtx.arc(t.x, t.y, (l.r / (2 * viewRadius)) * res, 0, Math.PI * 2);
      this.miniCtx.fillStyle = 'rgba(58,120,146,0.95)';
      this.miniCtx.fill();
    }
    this.miniCtx.strokeStyle = 'rgba(196,168,116,0.7)';
    this.miniCtx.lineWidth = 1;
    for (const [ax, az, bx, bz] of PATHS) {
      const a = toTile(ax, az);
      const b = toTile(bx, bz);
      this.miniCtx.beginPath();
      this.miniCtx.moveTo(a.x, a.y);
      this.miniCtx.lineTo(b.x, b.y);
      this.miniCtx.stroke();
    }
    return this.miniCanvas;
  }

  _worldToMap(x, z, size, scale = 1) {
    const s = size / (2 * WORLD_RADIUS);
    return { x: (x + WORLD_RADIUS) * s, y: (z + WORLD_RADIUS) * s };
  }

  _updateMinimap(dt) {
    this.minimapAcc += dt;
    if (this.minimapAcc < 0.1) return;
    this.minimapAcc = 0;
    this._ensureMap();
    const canvas = qs('#minimap');
    const ctx = canvas.getContext('2d');
    const size = canvas.width;
    const p = this.game.player.pos;
    const viewRadius = 46;
    ctx.clearRect(0, 0, size, size);
    ctx.save();
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = '#0b1116';
    ctx.fillRect(0, 0, size, size);

    const tile = this._renderMinimapTile(p, viewRadius);
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(tile, 0, 0, tile.width, tile.height, 0, 0, size, size);

    const toScreen = (x, z) => ({
      x: size / 2 + ((x - p.x) / viewRadius) * (size / 2),
      y: size / 2 + ((z - p.z) / viewRadius) * (size / 2),
    });

    for (const poi of POI_LABELS) {
      const s = toScreen(poi.x, poi.z);
      if (Math.hypot(s.x - size / 2, s.y - size / 2) > size / 2 - 6) continue;
      ctx.fillStyle = poi.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.6)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    for (const e of this.game.enemies.list) {
      if (!e.active || e.dead) continue;
      const s = toScreen(e.pos.x, e.pos.z);
      if (Math.hypot(s.x - size / 2, s.y - size / 2) > size / 2 - 4) continue;
      ctx.fillStyle = e.boss ? '#ff7a4a' : e.elite ? '#e0a851' : '#c05a4a';
      ctx.beginPath();
      ctx.arc(s.x, s.y, e.boss ? 4 : 2.6, 0, Math.PI * 2);
      ctx.fill();
    }

    for (const npc of this.game.npcs) {
      if (!npc.visible) continue;
      const s = toScreen(npc.pos.x, npc.pos.z);
      ctx.fillStyle = '#8fbf72';
      ctx.beginPath();
      ctx.arc(s.x, s.y, 2.6, 0, Math.PI * 2);
      ctx.fill();
    }

    const target = this.game.questTargetPos?.();
    if (target) {
      const s = toScreen(target.x, target.z);
      const clampedX = clamp(s.x, 10, size - 10);
      const clampedY = clamp(s.y, 10, size - 10);
      ctx.fillStyle = '#b977e8';
      ctx.beginPath();
      ctx.arc(clampedX, clampedY, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#e0c8ff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // gracz
    const yaw = this.game.player.yaw;
    ctx.save();
    ctx.translate(size / 2, size / 2);
    ctx.rotate(-yaw + Math.PI);
    ctx.fillStyle = '#f6efdf';
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.lineTo(5.5, 6);
    ctx.lineTo(0, 3);
    ctx.lineTo(-5.5, 6);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // igła północy
    ctx.fillStyle = 'rgba(226,184,120,0.9)';
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('N', size / 2, 16);
    ctx.restore();
  }

  drawBigMap() {
    this._ensureMap();
    const canvas = qs('#bigmap');
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    const scale = Math.max(W / this.mapSize, H / this.mapSize);
    ctx.imageSmoothingEnabled = true;
    // mapa świata (kwadrat) rozciągnięta na prostokąt z zachowaniem proporcji
    ctx.fillStyle = '#070a0d';
    ctx.fillRect(0, 0, W, H);
    const drawSize = Math.min(W, H);
    const offsetX = (W - drawSize) / 2;
    const offsetY = (H - drawSize) / 2;
    ctx.drawImage(this.mapCanvas, offsetX, offsetY, drawSize, drawSize);

    const toScreen = (x, z) => ({
      x: offsetX + ((x + WORLD_RADIUS) / (2 * WORLD_RADIUS)) * drawSize,
      y: offsetY + ((z + WORLD_RADIUS) / (2 * WORLD_RADIUS)) * drawSize,
    });

    // mgła na skraju mapy
    const grad = ctx.createRadialGradient(W / 2, H / 2, drawSize * 0.4, W / 2, H / 2, drawSize * 0.56);
    grad.addColorStop(0, 'rgba(6,8,11,0)');
    grad.addColorStop(0.75, 'rgba(6,8,11,0.35)');
    grad.addColorStop(1, 'rgba(6,8,11,0.9)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    ctx.textAlign = 'center';
    const placedLabels = [];
    for (const poi of POI_LABELS) {
      const sp = toScreen(poi.x, poi.z);
      ctx.fillStyle = poi.color;
      ctx.beginPath();
      ctx.arc(sp.x, sp.y, 6.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.55)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // etykiety nie mogą na siebie nachodzić — pomijamy dalsze w kolejności
      ctx.font = '600 14px Inter, sans-serif';
      const tw = ctx.measureText(poi.short).width;
      const candidates = [
        { dx: 0, dy: -15 }, { dx: 0, dy: 26 }, { dx: -tw / 2 - 12, dy: 5 }, { dx: tw / 2 + 12, dy: 5 },
      ];
      let chosen = null;
      for (const c of candidates) {
        const box = { x: sp.x + c.dx - tw / 2 - 3, y: sp.y + c.dy - 13, w: tw + 6, h: 18 };
        const overlaps = placedLabels.some((b) => box.x < b.x + b.w && box.x + box.w > b.x && box.y < b.y + b.h && box.y + box.h > b.y);
        if (!overlaps) { chosen = { ...c, box }; break; }
      }
      if (!chosen) continue;
      placedLabels.push(chosen.box);
      ctx.textAlign = chosen.dy === 5 ? (chosen.dx < 0 ? 'right' : 'left') : 'center';
      const tx = chosen.dy === 5 ? sp.x + chosen.dx : sp.x;
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'rgba(8,10,13,0.85)';
      ctx.strokeText(poi.short, tx, sp.y + chosen.dy);
      ctx.fillStyle = '#e8dfcd';
      ctx.fillText(poi.short, tx, sp.y + chosen.dy);
      ctx.textAlign = 'center';
    }

    const pl = this.game.player.pos;
    for (const e of this.game.enemies.list) {
      if (!e.active || e.dead) continue;
      if (!e.boss && dist2(e.pos.x, e.pos.z, pl.x, pl.z) > 170) continue;
      const s = toScreen(e.pos.x, e.pos.z);
      ctx.fillStyle = e.boss ? '#ff7a4a' : e.elite ? '#e0a851' : 'rgba(206,96,78,0.95)';
      ctx.beginPath();
      ctx.arc(s.x, s.y, e.boss ? 6 : 3.2, 0, Math.PI * 2);
      ctx.fill();
    }

    for (const npc of this.game.npcs) {
      if (!npc.visible) continue;
      const s = toScreen(npc.pos.x, npc.pos.z);
      ctx.fillStyle = '#8fbf72';
      ctx.beginPath();
      ctx.arc(s.x, s.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    const target = this.game.questTargetPos?.();
    if (target) {
      const s = toScreen(target.x, target.z);
      ctx.strokeStyle = '#b977e8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(s.x, s.y, 14, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = '#d8bcff';
      ctx.font = '600 13px Inter, sans-serif';
      ctx.fillText('CEL', s.x, s.y - 22);
    }

    const p = this.game.player.pos;
    const ps = toScreen(p.x, p.z);
    ctx.save();
    ctx.translate(ps.x, ps.y);
    ctx.rotate(-this.game.player.yaw + Math.PI);
    ctx.fillStyle = '#f8f1e2';
    ctx.beginPath();
    ctx.moveTo(0, -12);
    ctx.lineTo(8, 9);
    ctx.lineTo(0, 4);
    ctx.lineTo(-8, 9);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // ramka i skala
    ctx.strokeStyle = 'rgba(226,184,120,0.28)';
    ctx.lineWidth = 1;
    ctx.strokeRect(offsetX + 0.5, offsetY + 0.5, drawSize - 1, drawSize - 1);
    ctx.fillStyle = 'rgba(233,226,212,0.65)';
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'left';
    // pasek skali: 100 m w pikselach mapy
    const barPx = (100 / (2 * WORLD_RADIUS)) * drawSize;
    ctx.fillText('0', 24, H - 26);
    ctx.fillRect(24, H - 22, barPx, 2);
    ctx.fillText('100 m', 24 + barPx + 6, H - 22);
    ctx.textAlign = 'right';
    ctx.fillText('N ↑', W - 24, 30);
  }

  // =======================================================================
  // KOMUNIKATY
  // =======================================================================
  log(text, cls = '') {
    const div = document.createElement('div');
    div.className = `line ${cls}`;
    div.textContent = text;
    this.logEl.appendChild(div);
    while (this.logEl.children.length > 7) this.logEl.removeChild(this.logEl.firstChild);
    setTimeout(() => {
      div.style.transition = 'opacity 0.6s';
      div.style.opacity = '0';
      setTimeout(() => div.remove(), 700);
    }, 7000);
  }

  toast(title, sub = '') {
    this.toastEl.innerHTML = `${title}${sub ? `<small>${sub}</small>` : ''}`;
    this.toastEl.classList.add('show');
    this.toastTimer = 3.4;
  }

  floatNumber(worldPos, text, cls = '') {
    const cam = this.game.camera;
    const v = worldPos.clone().project(cam);
    if (v.z > 1) return;
    const x = (v.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-v.y * 0.5 + 0.5) * window.innerHeight;
    const el = document.createElement('div');
    el.className = `float-num ${cls}`;
    el.textContent = text;
    el.style.left = `${x + (Math.random() - 0.5) * 26}px`;
    el.style.top = `${y}px`;
    this.worldOverlay.appendChild(el);
    setTimeout(() => el.remove(), 950);
  }

  setInteract(text) {
    if (text === this.interactText) return;
    this.interactText = text;
    if (!text) {
      this.interactEl.classList.remove('show');
      return;
    }
    qs('span', this.interactEl).textContent = text;
    this.interactEl.classList.add('show');
  }

  showLocation(name, sub = '') {
    this.locEl.querySelector('span').textContent = name;
    this.locEl.querySelector('small').textContent = sub;
    this.locEl.classList.add('show');
    this.locationTimer = 3.6;
  }

  flashScreen(color, alpha = 0.3) {
    this.flashEl.style.transition = 'none';
    this.flashEl.style.background = color;
    this.flashEl.style.opacity = String(alpha);
    // wymuszenie reflow
    void this.flashEl.offsetWidth;
    this.flashEl.style.transition = 'opacity 0.45s ease';
    this.flashEl.style.opacity = '0';
  }

  setClock(clock, night) {
    if (!this.clockEl) return;
    this.clockEl.textContent = `${night ? '☾' : '☀'} ${clock}`;
  }
}
