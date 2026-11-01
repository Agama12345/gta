// Zrzuty ekranu z prawdziwej gry w przeglądarce (WebGL przez SwiftShader).
//
// Podgląd `tools/preview.mjs` rysuje scenę na CPU i nie ma tekstur ani światła,
// więc nie pokazuje, jak gra wygląda naprawdę. Tutaj uruchamiamy grę w
// headless Chromium z programowym WebGL i robimy serię zdjęć.
//
//   node scripts/shots-now.mjs [katalog]
//
// Wymaga działającego `npm run dev` na porcie 5173.
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

const OUT = process.argv[2] || 'screenshots';
fs.mkdirSync(OUT, { recursive: true });

const executablePath = await chromium.executablePath();
const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  env: { ...process.env, LD_LIBRARY_PATH: '/tmp/al2023/lib:/tmp' },
  args: [
    ...chromium.args.filter((a) => a !== '--single-process' && a !== '--no-zygote'),
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
    '--window-size=1280,720',
  ],
  defaultViewport: { width: 1280, height: 720 },
});

const page = await browser.newPage();
const logs = [];
page.on('console', (m) => { if (m.type() === 'error') logs.push(`[błąd] ${m.text()}`); });
page.on('pageerror', (e) => logs.push(`[wyjątek] ${e.message}`));

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const snap = async (name) => {
  await page.screenshot({ path: `${OUT}/${name}.png` });
  console.log('zapisano', `${OUT}/${name}.png`);
};

await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle2', timeout: 120000 });
await page.waitForFunction('window.__game && window.__game.state === "title"', { timeout: 120000 });
await wait(2500);
await snap('01-menu');

await page.evaluate(() => {
  const g = window.__game;
  g.audio?.unlock?.();
  g.startNew();
});
await wait(6000);

// wysokość terenu liczy moduł świata — gra nie wystawia jej na obiekcie
await page.evaluate(async () => {
  window.__terrainMod = await import('/src/world/terrain.js');
});

// pojedyncza klatka: ustawia gracza i kamerę, czeka na przeliczenie świata
const place = async (x, z, yaw, pitch, dist) => {
  await page.evaluate((x, z, yaw, pitch, dist) => {
    const g = window.__game;
    const p = g.player;
    p.pos.set(x, window.__terrainMod.heightAt(x, z), z);
    p.syncModel?.();
    g.cameraRig.yaw = yaw;
    g.cameraRig.pitch = pitch;
    g.cameraRig.distance = dist;
    g.cameraRig.targetDistance = dist;
    g.cameraRig.initialized = false;
    g.world.update?.(0.016, 1, p.pos);
  }, x, z, yaw, pitch, dist);
  await wait(1800);
};

const world = await page.evaluate(() => {
  const g = window.__game;
  return { village: [0, 936], trading: [455, 650] };
});

await place(world.village[0], world.village[1] + 20, Math.PI, 0.16, 5.2);
await snap('02-wioska');

await place(world.village[0], world.village[1] - 6, Math.PI, 0.06, 2.6);
await snap('03-bohater');

await place(world.trading[0], world.trading[1] + 6, 2.6, 0.14, 9);
await snap('04-targ');

await place(-1400, -560, 1.1, 0.1, 8);
await snap('05-las');

await place(1100, 1180, 0.6, 0.12, 10);
await snap('06-wybrzeze');

await place(640, -400, 2.4, 0.14, 9);
await snap('07-gory');

// noc: latarnie i ogniska
await page.evaluate(() => {
  const g = window.__game;
  g.dayNight?.setHour?.(22);
  g._updateLighting?.();
});
await wait(2500);
await snap('08-noc');

// UI: ekwipunek i mapa
await page.evaluate(() => { window.__game.dayNight?.setHour?.(10); window.__game._updateLighting?.(); window.__game.ui.openHero('inventory'); });
await wait(1500);
await snap('09-ekwipunek');
await page.evaluate(() => { window.__game.ui.closePanels(); window.__game.ui.openMap(); });
await wait(1800);
await snap('10-mapa');
await page.evaluate(() => { window.__game.ui.closePanels(); window.__game.ui.toggleDebug?.(); });
await wait(1500);
await snap('11-licznik-f3');

const stats = await page.evaluate(() => {
  const g = window.__game;
  const info = g.renderer?.info?.render ?? {};
  let meshes = 0;
  g.scene.traverse((o) => { if (o.isMesh || o.isInstancedMesh) meshes += 1; });
  return { meshes, calls: info.calls, tris: info.triangles, quality: g.qualityName };
});
console.log('scena:', JSON.stringify(stats));
if (logs.length) console.log('problemy w konsoli:\n' + logs.slice(0, 10).join('\n'));
await browser.close();
