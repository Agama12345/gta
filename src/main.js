import './ui/styles.css';
import { Game } from './game.js';
import { loadAssets } from './core/assets.js';

const loading = document.getElementById('loading');
const canvas = document.getElementById('scene');

/** Etap startu — widoczny w konsoli i w panelu błędu (łatwiej zdiagnozować). */
window.__bootStage = 'start';

function removeLoading(delay = 0) {
  if (!loading || loading.dataset.done === '1') return;
  loading.dataset.done = '1';
  setTimeout(() => {
    loading.classList.add('hidden');
    setTimeout(() => loading.remove(), 900);
  }, delay);
}

/**
 * Panel błędu startu. Zamiast wiecznego „Rozpalanie pochodni…” gracz dostaje
 * konkretny powód, możliwość ponowienia i wskazówkę, co zrobić.
 */
function showError(err, hint = '') {
  console.error('[start]', err);
  const msg = String(err?.message ?? err ?? 'nieznany błąd');
  if (!loading) {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div style="position:fixed;inset:0;z-index:9999;display:grid;place-items:center;background:#08090d;color:#e9e2d4;font:14px/1.7 system-ui;padding:24px;text-align:center">
        <div><h2 style="color:#e2b878">Nie udało się uruchomić gry</h2><p>${msg}</p></div></div>`
    );
    return;
  }
  loading.dataset.done = '1';
  loading.classList.remove('hidden');
  loading.innerHTML = `
    <div class="loading-inner">
      <div class="loading-sigil" style="color:#c1443a">⚠</div>
      <h1>Nie udało się uruchomić gry</h1>
      <p class="loading-sub">${msg}</p>
      <p style="color:#8a8478;font-size:12px;line-height:1.8;margin:0 0 18px">
        ${hint || 'Gra potrzebuje przeglądarki z WebGL 2 i włączonej akceleracji sprzętowej.'}
        <br/>Etap startu: <code style="color:#b7ad98">${window.__bootStage}</code>
      </p>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
        <button class="primary" onclick="location.reload()">Spróbuj ponownie</button>
        <button onclick="this.closest('.loading-inner').querySelector('.boot-tips').hidden=false">Co zrobić?</button>
      </div>
      <div class="boot-tips" hidden style="margin-top:16px;text-align:left;font-size:12px;color:#9d968a;line-height:1.9">
        1. Zaktualizuj sterowniki karty graficznej.<br/>
        2. W przeglądarce włącz „Akcelerację sprzętową”.<br/>
        3. Zamknij inne karty z grami 3D — brakuje pamięci GPU.<br/>
        4. Uruchom ponownie komputer, jeśli błąd wraca.
      </div>
    </div>`;
}

/** Czy przeglądarka w ogóle potrafi WebGL 2? */
function webglSupport() {
  try {
    const probe = document.createElement('canvas');
    return !!(probe.getContext('webgl2') || probe.getContext('webgl'));
  } catch (err) {
    return false;
  }
}

/** Pilnowanie startu: gdyby cokolwiek zawisło, gracz nie zostaje z loaderem. */
function startWatchdog() {
  const started = performance.now();
  const timer = setInterval(() => {
    if (window.__game && window.__game.running) {
      clearInterval(timer);
      return;
    }
    const waited = (performance.now() - started) / 1000;
    if (waited > 25 && loading && !loading.dataset.done) {
      clearInterval(timer);
      showError(
        new Error('Start trwał zbyt długo (ponad 25 s).'),
        'Sprawdź, czy komputer nie jest przeciążony i czy karta graficzna obsługuje WebGL 2.'
      );
    }
  }, 1000);
}

async function boot() {
  startWatchdog();
  // pozwól przeglądarce narysować ekran ładowania
  await new Promise((r) => requestAnimationFrame(() => setTimeout(r, 70)));

  const subtitle = document.querySelector('.loading-sub');
  if (!webglSupport()) {
    showError(
      new Error('Ta przeglądarka nie udostępnia WebGL 2.'),
      'Włącz akcelerację sprzętową albo zagraj w wersji .exe dołączonej do wydania.'
    );
    return;
  }

  // 1. modele CC0 — brak plików nie zatrzymuje gry
  let assets = null;
  try {
    window.__bootStage = 'modele';
    if (subtitle) subtitle.textContent = 'Wczytywanie modeli…';
    assets = await loadAssets((p) => {
      if (subtitle) subtitle.textContent = `Wczytywanie modeli… ${Math.round(p * 100)}%`;
    });
  } catch (err) {
    console.warn('Modele zewnętrzne niedostępne — zostają proceduralne', err);
    assets = null;
  }

  // 2. świat i gra
  let game;
  try {
    window.__bootStage = 'świat';
    if (subtitle) subtitle.textContent = 'Budzenie Wilczej Doliny…';
    game = new Game(canvas, { assets });
  } catch (err) {
    window.__bootStage = 'błąd świata';
    showError(err);
    return;
  }

  window.__game = game;

  // 3. mapa okolic — opcjonalna, błąd nie blokuje wejścia do menu
  try {
    window.__bootStage = 'mapa';
    if (subtitle) subtitle.textContent = 'Rysowanie mapy okolic…';
    await new Promise((r) => setTimeout(r, 30));
    game.ui._ensureMap();
  } catch (e) {
    console.warn('Mapa nie została wygenerowana', e);
  }

  // 4. start pętli gry — ewentualny wyjątek pokazujemy, ale ekran tytułowy i tak wychodzi
  try {
    window.__bootStage = 'start';
    game.start();
  } catch (err) {
    console.error('[start] pętla gry', err);
    window.__bootStage = 'błąd pętli';
    game.ui?.showTitle?.();
    game.ui?.hud && (game.ui.hud.style.display = 'none');
    setTimeout(() => game.ui?.toast?.('Grafika zgłosiła błąd — gra działa w trybie awaryjnym.', 'warn'), 500);
  }

  window.__bootStage = 'gotowe';
  removeLoading(420);

  window.addEventListener('beforeunload', () => {
    if (game.state !== 'title') game.saveGame();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && game.state === 'playing') game.pauseGame();
  });
}

window.addEventListener('error', (e) => {
  if (!window.__game) showError(e.error ?? e.message);
});

boot().catch((err) => showError(err));
