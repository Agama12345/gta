// Szybka diagnostyka wyglądu: kilka ujęć bez pełnego scenariusza.
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

const OUT = process.env.SHOT_DIR || '/home/user/shots';
fs.mkdirSync(OUT, { recursive: true });
const browser = await puppeteer.launch({
  executablePath: await chromium.executablePath(),
  headless: true,
  env: { ...process.env, LD_LIBRARY_PATH: process.env.CHROMIUM_LIBS || '/tmp/al2023/lib' },
  args: [
    ...chromium.args.filter((a) => a !== '--single-process' && a !== '--no-zygote'),
    '--no-sandbox', '--disable-dev-shm-usage', '--use-gl=angle', '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
  ],
  defaultViewport: { width: 1280, height: 800 },
});
const page = await browser.newPage();
const logs = [];
page.on('pageerror', (e) => logs.push('[pageerror] ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') logs.push('[error] ' + m.text()); });

await page.goto('http://127.0.0.1:5173/', { waitUntil: 'load', timeout: 60000 });
await page.waitForFunction('window.__game && window.__game.state === "title"', { timeout: 60000 });
await page.evaluate(() => window.__game.startNew());
// czekaj aż ekran ładowania zniknie i świat będzie gotowy
await page.waitForFunction('!document.getElementById("loading") || document.getElementById("loading").classList.contains("hidden")', { timeout: 120000 });
await new Promise((r) => setTimeout(r, 2500));

const shots = JSON.parse(process.env.SHOTS || '[]');
let i = 0;
for (const shot of shots) {
  await page.evaluate((cfg) => {
    const g = window.__game;
    if (cfg.hour !== undefined) { g.dayNight.setHour(cfg.hour); g._updateLighting(); }
    if (cfg.pos) {
      g.player.pos.set(cfg.pos[0], g.player.pos.y, cfg.pos[1]);
      g.player.syncModel();
      g.cameraRig.initialized = false;
    }
    if (cfg.yaw !== undefined) g.cameraRig.yaw = cfg.yaw;
    if (cfg.pitch !== undefined) g.cameraRig.pitch = cfg.pitch;
    if (cfg.zoom !== undefined) { g.cameraRig.distance = cfg.zoom; g.cameraRig.targetDistance = cfg.zoom; }
    if (cfg.state) g.state = cfg.state;
  }, shot);
  await new Promise((r) => setTimeout(r, shot.wait ?? 900));
  const name = `${OUT}/${shot.name ?? 'q' + i}.png`;
  await page.screenshot({ path: name });
  console.log('zapisano', name);
  i += 1;
}

const info = await page.evaluate(() => {
  const g = window.__game;
  const r = g.renderer.info.render;
  return {
    hour: g.dayNight.hour.toFixed(1), exposure: g.renderer.toneMappingExposure,
    sun: g.sun.intensity.toFixed(2), hemi: g.hemi.intensity.toFixed(2),
    background: g.scene.background?.image ? 'texture' : String(g.scene.background),
    fog: '#' + g.scene.fog.color.getHexString(),
    calls: r.calls, tris: r.triangles,
  };
});
console.log(JSON.stringify(info));
if (logs.length) console.log(logs.join('\n'));
await browser.close();
