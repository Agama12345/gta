// Test menu: buduje PRAWDZIWY obiekt Game w jsdom (z podstawionym rendererem)
// i sprawdza ekran tytułowy, pauzę, martwe ekrany i wszystkie przyciski menu.
// Cel: wychwycić sytuacje, w których menu „nie działa” przed zobaczeniem go w grze.

import { JSDOM } from 'jsdom';

const dom = new JSDOM(
  `<!doctype html><html lang="pl"><body>
    <div id="app">
      <canvas id="scene" width="1280" height="720"></canvas>
      <div id="ui"></div>
      <div id="loading"><div class="loading-sub"></div></div>
    </div>
  </body></html>`,
  { pretendToBeVisual: true, url: 'http://localhost/' }
);

global.window = dom.window;
global.document = dom.window.document;
Object.defineProperty(global, 'navigator', { value: dom.window.navigator, configurable: true });
global.HTMLElement = dom.window.HTMLElement;
global.HTMLCanvasElement = dom.window.HTMLCanvasElement;
global.Element = dom.window.Element;
global.Node = dom.window.Node;
global.getComputedStyle = dom.window.getComputedStyle.bind(dom.window);

const storage = {
  _d: {},
  getItem(k) { return this._d[k] ?? null; },
  setItem(k, v) { this._d[k] = String(v); },
  removeItem(k) { delete this._d[k]; },
};
global.localStorage = storage;
Object.defineProperty(dom.window, 'localStorage', { value: storage, configurable: true });
Object.defineProperty(dom.window, 'innerWidth', { value: 1280, configurable: true });
Object.defineProperty(dom.window, 'innerHeight', { value: 720, configurable: true });
Object.defineProperty(dom.window, 'devicePixelRatio', { value: 1, configurable: true });
global.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 16);
global.cancelAnimationFrame = (id) => clearTimeout(id);
global.performance = global.performance ?? { now: () => Date.now() };

const noop = () => {};
const ctxStub = () =>
  new Proxy(
    {
      createImageData: (w, h) => ({ data: new Uint8ClampedArray(w * h * 4), width: w, height: h }),
      getImageData: (x, y, w, h) => ({ data: new Uint8ClampedArray(w * h * 4), width: w, height: h }),
      createRadialGradient: () => ({ addColorStop: noop }),
      createLinearGradient: () => ({ addColorStop: noop }),
      measureText: () => ({ width: 10 }),
      getImageData: () => ({ data: new Uint8ClampedArray(4) }),
    },
    { get: (t, k) => (k in t ? t[k] : noop), set: (t, k, v) => ((t[k] = v), true) }
  );
dom.window.HTMLCanvasElement.prototype.getContext = function () { return ctxStub(); };

// ---------------------------------------------------------------------------
// Podstawiony renderer + hak na błędy konsoli
// ---------------------------------------------------------------------------
const renderer = {
  shadowMap: { enabled: false, type: 0 },
  setPixelRatio: noop,
  setSize: noop,
  render: noop,
  domElement: dom.window.document.getElementById('scene'),
};

const consoleErrors = [];
const origError = console.error;
const origWarn = console.warn;
console.error = (...a) => { consoleErrors.push(a.map(String).join(' ')); origError(...a); };
console.warn = (...a) => { consoleErrors.push(a.map(String).join(' ')); origWarn(...a); };

const windowErrors = [];
dom.window.addEventListener('error', (e) => windowErrors.push(String(e.message ?? e.error)));
process.on('unhandledRejection', (e) => windowErrors.push(`unhandledRejection: ${e}`));

const { Game } = await import('../src/game.js');

let failures = 0;
function check(name, cond, extra = '') {
  if (cond) console.log(`  ✔ ${name}`);
  else {
    failures += 1;
    origError(`  ✘ ${name} ${extra}`);
  }
}
const q = (sel) => dom.window.document.querySelector(sel);
const qa = (sel) => [...dom.window.document.querySelectorAll(sel)];

// ---------------------------------------------------------------------------
console.log('MENU — ekran tytułowy od zera');
let game;
try {
  game = new Game(dom.window.document.getElementById('scene'), { renderer });
} catch (err) {
  origError('  ✘ konstrukcja Game rzuciła wyjątek:', err);
  process.exit(1);
}
check('Game powstał bez wyjątku', !!game);
check('stan początkowy to title', game.state === 'title', game.state);
check('ekran tytułowy istnieje', !!q('#title-screen'));
check('ekran tytułowy jest widoczny', q('#title-screen') && !q('#title-screen').classList.contains('hidden'));
check('HUD ukryty w menu', game.ui.hud.style.display === 'none', game.ui.hud.style.display);

const buttons = qa('#title-buttons button');
check('menu ma 5 przycisków', buttons.length === 5, `jest ${buttons.length}`);
check('Nowa wyprawa na pierwszym miejscu', buttons[0]?.textContent.trim() === 'Nowa wyprawa');
check('Kontynuuj zablokowane bez zapisu', buttons[1]?.disabled === true);
check('karta wyprawy wypełniona', (q('#title-foot')?.textContent ?? '').includes('Poziom'));
check('wskazówka niepusta', (q('#title-tip')?.textContent ?? '').trim().length > 3);
check('tytuł gry poprawny', (q('.menu-title')?.textContent ?? '').includes('Runy Przeznaczenia'));

// klawiatura: strzałki przenoszą fokus
const before = dom.window.document.activeElement;
game._onKeyDown('ArrowDown');
const after = dom.window.document.activeElement;
check('ArrowDown przenosi fokus w menu', before !== after || after?.tagName === 'BUTTON', `${before?.tagName} -> ${after?.tagName}`);

// Ustawienia / Sterowanie / O grze
q('#title-buttons [data-menu="settings"]').click();
check('Ustawienia otwierają panel', !!q('#info-panel') && !q('#info-panel').classList.contains('hidden'));
const infoText = q('#info-body')?.textContent ?? '';
check('panel ustawień ma treść', infoText.length > 20, infoText.slice(0, 40));
check('panel ma przełącznik dźwięku', !!q('#set-mute'), infoText.slice(0, 80));
q('#info-panel [data-close="info"]')?.click();
check('panel zamyka się krzyżykiem', q('#info-panel').classList.contains('hidden'));

q('#title-buttons [data-menu="controls"]').click();
check('Sterowanie otwiera panel', !q('#info-panel').classList.contains('hidden'));
check('Sterowanie opisuje klawisze', (q('#info-body')?.textContent ?? '').includes('W') );
q('#info-panel [data-close="info"]')?.click();

q('#title-buttons [data-menu="about"]').click();
check('O grze otwiera panel', !q('#info-panel').classList.contains('hidden'));
q('#info-panel [data-close="info"]')?.click();

// ---------------------------------------------------------------------------
console.log('\nMENU — start nowej wyprawy');
game.startNew();
check('po starcie stan to playing', game.state === 'playing', game.state);
check('ekran tytułowy ukryty', q('#title-screen').classList.contains('hidden'));
check('HUD widoczny', game.ui.hud.style.display !== 'none', game.ui.hud.style.display);
check('gracz istnieje i ma pozycję', !!game.player?.pos);
check('pierwsza ramka nie rzuca', (() => {
  try { game._frame?.(0.016); return true; } catch (e) { origError('frame:', e); return false; }
})());

// pauza
game.pauseGame();
check('pauza: stan ui', game.state === 'ui', game.state);
check('ekran pauzy widoczny', !q('#pause-screen').classList.contains('hidden'));
check('pauza ma 6 przycisków', qa('#pause-buttons button').length === 6, String(qa('#pause-buttons button').length));
check('karta pauzy opisuje bohatera', (q('#pause-info')?.textContent ?? '').includes('Kael'));
q('#pause-buttons [data-pause="settings"]').click();
check('ustawienia z pauzy działają', !q('#info-panel').classList.contains('hidden'));
q('#info-panel [data-close="info"]')?.click();
if (!q('#pause-screen').classList.contains('hidden')) game.showPause?.();
q('#pause-buttons [data-pause="resume"]').click();
check('powrót do gry', game.state === 'playing', game.state);

// zapis + powrót do menu = „Kontynuuj” odblokowane
game.saveGame();
game.returnToTitle();
check('powrót do tytułu', game.state === 'title', game.state);
check('ekran tytułowy wrócił', !q('#title-screen').classList.contains('hidden'));
check('Kontynuuj odblokowane po zapisie', q('#btn-continue')?.disabled === false);
check('karta pokazuje poziom z zapisu', (q('#title-foot')?.textContent ?? '').includes('Złoto'));

// wczytanie zapisu
q('#btn-continue').click();
check('wczytanie zapisu wchodzi do gry', game.state === 'playing', game.state);

// śmierć i zwycięstwo
game.onPlayerDeath?.();
check('ekran śmierci widoczny', !q('#death-screen').classList.contains('hidden'), game.state);
q('#death-screen [data-death="respawn"]').click();
check('respawn wraca do gry', game.state === 'playing', game.state);
game.ui.showVictory({ level: 5, xp: 1200, gold: 300, kills: 20, quests: 5 });
check('ekran zwycięstwa widoczny', !q('#victory-screen').classList.contains('hidden'));
q('#victory-screen [data-victory="continue"]').click();
check('powrót ze zwycięstwa', q('#victory-screen').classList.contains('hidden') && game.state === 'playing', game.state);

// ---------------------------------------------------------------------------
console.log('\nMENU — ustawienia grafiki');
game.returnToTitle();
game.ui.showSettings();
const panel = q('#info-panel');
check('panel ma suwak cieni', !!panel.querySelector('#set-shadows'));
check('panel ma zasięg widzenia', !!panel.querySelector('#set-view'));
check('panel ma pole widzenia', !!panel.querySelector('#set-fov'));
panel.querySelector('#set-shadows').click();
check('cienie można wyłączyć', panel.querySelector('#set-shadows').textContent.trim() === 'Wyłączone');
const fov = panel.querySelector('#set-fov');
fov.value = '70';
fov.dispatchEvent(new dom.window.Event('input'));
check('pole widzenia trafia do kamery', Math.round(game.camera.fov) === 70, String(game.camera.fov));
check('ustawienie zapisane w localStorage', (global.localStorage.getItem('runy-video') ?? '').includes('70'));
game.ui.setVideoSetting('fov', 62);
game.ui.setVideoSetting('shadows', true);
panel.querySelector('[data-close="info"]').click();

// ---------------------------------------------------------------------------
console.log('\nEKWIPUNEK — nowy układ');
game.returnToTitle();
game.startNew();
const inv = game.player.inventory;
inv.add('rusty_sword', 1);
inv.add('health_potion', 3);
inv.add('herbs', 4);
game.ui.openHero('inventory');
check('panel bohatera otwarty', !game.ui.heroPanel.classList.contains('hidden'));
check('układ trzykolumnowy', !!q('.hero-sheet') && qa('.sheet-col').length === 3);
check('cztery sloty ekwipunku', qa('.eq-row').length === 4, String(qa('.eq-row').length));
check('torba ma pełną siatkę', qa('.bag-cell').length >= 24, String(qa('.bag-cell').length));
check('karta przedmiotu istnieje', !!q('#item-detail .item-card'));
check('puste pole zachęca do wyboru', (q('#item-detail')?.textContent ?? '').includes('Wybierz przedmiot'));

q('.bag-cell[data-item="health_potion"]')?.click();
check('wybór pokazuje nazwę', (q('#item-detail h3')?.textContent ?? '').includes('Mikstura'));
check('mikstura ma przycisk „Użyj”', !!q('#item-detail [data-use]'));
check('komórka podświetlona', q('.bag-cell[data-item="health_potion"]')?.classList.contains('is-selected'));

q('.bag-cell[data-item="rusty_sword"]')?.click();
check('miecz ma przycisk „Załóż”', !!q('#item-detail [data-equip]'));
q('#item-detail [data-equip]')?.click();
check('miecz założony', game.player.inventory.equipped.weapon === 'rusty_sword');
check('slot pokazuje nazwę broni', (qa('.eq-row')[0]?.textContent ?? '').includes('Rdzawy'));

// Enter zakłada/używa wybranego
q('.bag-cell[data-item="health_potion"]')?.click();
const hpBefore = game.player.hp;
game.player.takeDamage(30, 'test');
game._onKeyDown('Enter');
check('Enter używa mikstury', game.player.hp > hpBefore - 30, `${hpBefore} -> ${game.player.hp}`);

// filtry
q('[data-inv-filter="gear"]')?.click();
const gearCells = qa('.bag-cell[data-item]').length;
check('filtr „Ekwipunek” zawęża listę', gearCells >= 1 && gearCells < 4, String(gearCells));
q('[data-inv-filter="all"]')?.click();

// karta postaci: paski atrybutów
game.ui.openHero('character');
check('atrybuty mają paski', qa('.attr-bar').length === 4, String(qa('.attr-bar').length));
game.ui.closePanels();

// ---------------------------------------------------------------------------
console.log('\nMAPA — odkrywanie miejsc');
game.returnToTitle();
game.startNew();
check('na starcie znana jest tylko wioska', game.discovered.size === 1 && game.discovered.has('village'));
const pois = game.ui.poiList();
check('lista punktów mapy jest pełna', pois.length >= 15, String(pois.length));
const target2 = pois.find((x) => x.id === 'forge') ?? pois[1];
game.player.pos.x = target2.x;
game.player.pos.z = target2.z;
game.discoveryTimer = 0;
game._checkDiscovery(0.7);
check('wejście w promień odkrywa miejsce', game.discovered.has(target2.id), target2.id);
check('kolejne punkty nadal ukryte', game.discovered.size === 2, String(game.discovered.size));
game.ui.openMap();
check('mapa pokazuje licznik odkryć', (q('#map-sub')?.textContent ?? '').includes('/'), q('#map-sub')?.textContent ?? '');
game.ui.closePanels();
game.saveGame();
const rawSave = JSON.parse(global.localStorage.getItem('runy-przeznaczenia-save'));
check('odkrycia trafiają do zapisu', Array.isArray(rawSave.discovered) && rawSave.discovered.includes(target2.id));

// ---------------------------------------------------------------------------
console.log('\nMENU — higiena');
const fs = await import('node:fs');
const indexHtml = fs.readFileSync('index.html', 'utf8');
const stylesCss = fs.readFileSync('src/ui/styles.css', 'utf8');
const externals = [...`${indexHtml}\n${stylesCss}`.matchAll(/https?:\/\/[^"'\s)]+/g)].map((m) => m[0]);
check('brak zewnętrznych zależności w index.html i CSS', externals.length === 0, externals.join(', '));
check('kroje pisma są w paczce', fs.existsSync('src/assets/fonts/cinzel.woff2') && fs.existsSync('src/assets/fonts/inter.woff2'));
check('CSS nie używa @import z sieci', !stylesCss.includes('@import url(http'));

const { ALL_SAMPLE_FILES } = await import('../src/systems/audio.js');
const missingAudio = ALL_SAMPLE_FILES.filter((f) => !fs.existsSync(`public/${f}`));
check('wszystkie sample audio są na dysku', missingAudio.length === 0, missingAudio.slice(0, 3).join(', '));
check('sample audio towarzyszą licencji CC BY', fs.existsSync('public/assets/audio/LICENSE.txt'));
check('watchdog startu jest w index.html', indexHtml.includes('Gra nie wystartowała'));
check('brak błędów JS w oknie', windowErrors.length === 0, windowErrors.join(' | '));
const hardErrors = consoleErrors.filter((e) => !/Modele zewnętrzne|Mapa nie została|WebGL|THREE\.WebGLRenderer/i.test(e));
check('brak błędów w konsoli', hardErrors.length === 0, hardErrors.slice(0, 3).join(' | '));

origError(failures ? `\n${failures} niepowodzeń` : '\nMenu OK');
process.exit(failures ? 1 : 0);
