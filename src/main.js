import './ui/styles.css';
import { Game } from './game.js';
import { loadAssets } from './core/assets.js';

const loading = document.getElementById('loading');
const canvas = document.getElementById('scene');

function showError(err) {
  console.error(err);
  if (!loading) return;
  loading.innerHTML = `
    <div class="loading-inner">
      <div class="loading-sigil" style="color:#c1443a">⚠</div>
      <h1>Coś poszło nie tak</h1>
      <p class="loading-sub">${String(err?.message ?? err)}</p>
      <p style="color:#8a8478;font-size:12px;line-height:1.7">
        Gra potrzebuje przeglądarki z obsługą WebGL 2.<br/>
        Spróbuj odświeżyć stronę lub włączyć akcelerację sprzętową.
      </p>
    </div>`;
  loading.classList.remove('hidden');
}

async function boot() {
  // pozwól przeglądarce narysować ekran ładowania
  await new Promise((r) => requestAnimationFrame(() => setTimeout(r, 70)));

  const subtitle = document.querySelector('.loading-sub');
  if (subtitle) subtitle.textContent = 'Budzenie Wilczej Doliny…';

  // darmowe modele CC0 (drzewa, skały, beczki, szkielety) — jeśli ich nie ma,
  // gra działa dalej na modelach proceduralnych
  let assets = null;
  try {
    if (subtitle) subtitle.textContent = 'Wczytywanie modeli…';
    assets = await loadAssets((p) => {
      if (subtitle) subtitle.textContent = `Wczytywanie modeli… ${Math.round(p * 100)}%`;
    });
  } catch (err) {
    console.warn('Modele zewnętrzne niedostępne — zostają proceduralne', err);
    assets = null;
  }

  if (subtitle) subtitle.textContent = 'Budzenie Wilczej Doliny…';

  let game;
  try {
    game = new Game(canvas, { assets });
  } catch (err) {
    showError(err);
    return;
  }

  window.__game = game;

  if (subtitle) subtitle.textContent = 'Rysowanie mapy okolic…';
  await new Promise((r) => setTimeout(r, 30));

  try {
    game.ui._ensureMap();
  } catch (e) {
    console.warn('Mapa nie została wygenerowana', e);
  }

  game.start();

  setTimeout(() => {
    loading.classList.add('hidden');
    setTimeout(() => loading.remove(), 900);
  }, 420);

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

boot();
