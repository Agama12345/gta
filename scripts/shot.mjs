// Zrzuty ekranu i diagnostyka w headless Chromium (WebGL przez SwiftShader).
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

const OUT = process.env.SHOT_DIR || '/home/user/shots';
fs.mkdirSync(OUT, { recursive: true });

const executablePath = await chromium.executablePath();
const libDir = process.env.CHROMIUM_LIBS || '/tmp/al2023/lib';
const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  env: { ...process.env, LD_LIBRARY_PATH: libDir },
  args: [
    ...chromium.args.filter((a) => a !== '--single-process' && a !== '--no-zygote'),
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
    '--window-size=1440,900',
  ],
  defaultViewport: { width: 1440, height: 900 },
});

const page = await browser.newPage();
const logs = [];
page.on('console', (m) => logs.push(`[${m.type()}] ${m.text()}`));
page.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}`));
page.on('requestfailed', (r) => logs.push(`[requestfailed] ${r.url()} ${r.failure()?.errorText}`));

await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle2', timeout: 60000 });
await page.waitForFunction('window.__game && window.__game.state === "title"', { timeout: 60000 });
await new Promise((r) => setTimeout(r, 1500));
await page.screenshot({ path: `${OUT}/01-title.png` });

// start nowej gry
await page.click('[data-menu="new"]');
await new Promise((r) => setTimeout(r, 2500));
await page.screenshot({ path: `${OUT}/02-village.png` });

// krótki spacer do przodu
await page.keyboard.down('KeyW');
await new Promise((r) => setTimeout(r, 1400));
await page.keyboard.up('KeyW');
await new Promise((r) => setTimeout(r, 400));
await page.screenshot({ path: `${OUT}/03-walk.png` });

// teleport pod ognisko i dialog z Eryn
await page.evaluate(() => {
  const g = window.__game;
  g.player.pos.set(4.0, g.player.pos.y, 27.5);
  g.player.syncModel();
});
await new Promise((r) => setTimeout(r, 700));
await page.evaluate(() => window.__game.interact());
await new Promise((r) => setTimeout(r, 700));
await page.screenshot({ path: `${OUT}/04-dialogue.png` });

const dialogueOpen = await page.evaluate(() => window.__game.ui.dialogueOpen);
if (dialogueOpen) {
  await page.evaluate(() => {
    const g = window.__game;
    const accept = g.dialogue.nodes.start.choices.findIndex((c) => c.action?.startsWith('accept'));
    if (accept >= 0) g.dialogue.choose(accept);
  });
  await new Promise((r) => setTimeout(r, 700));
  await page.screenshot({ path: `${OUT}/05-quest.png` });
  await page.evaluate(() => document.getElementById('qi-btn')?.click());
}

// panel ekwipunku
await page.evaluate(() => window.__game.ui.openHero('inventory'));
await new Promise((r) => setTimeout(r, 600));
await page.screenshot({ path: `${OUT}/06-inventory.png` });
await page.evaluate(() => window.__game.ui.closePanels());

// mapa
await page.evaluate(() => window.__game.ui.openMap());
await new Promise((r) => setTimeout(r, 800));
await page.screenshot({ path: `${OUT}/07-map.png` });
await page.evaluate(() => window.__game.ui.closePanels());

// noc w wiosce
await page.evaluate(() => {
  const g = window.__game;
  g.dayNight.setHour(22);
  g._updateLighting();
});
await new Promise((r) => setTimeout(r, 900));
await page.screenshot({ path: `${OUT}/08-night.png` });

// obóz bandytów
await page.evaluate(() => {
  const g = window.__game;
  g.dayNight.setHour(10);
  g._updateLighting();
  g.player.pos.set(-44, g.player.pos.y, -8);
  g.player.syncModel();
  g.cameraRig.initialized = false;
});
await new Promise((r) => setTimeout(r, 1200));
await page.screenshot({ path: `${OUT}/09-bandits.png` });

// walka — kilka ataków
await page.keyboard.down('KeyW');
await new Promise((r) => setTimeout(r, 500));
await page.keyboard.up('KeyW');
for (let i = 0; i < 3; i++) {
  await page.mouse.click(720, 450);
  await new Promise((r) => setTimeout(r, 350));
}
await page.evaluate(() => window.__game.player.castSpell(0));
await new Promise((r) => setTimeout(r, 350));
await page.screenshot({ path: `${OUT}/10-combat.png` });

// statystyki wydajności
const stats = await page.evaluate(() => {
  const g = window.__game;
  const r = g.renderer.info.render;
  return {
    state: g.state,
    fps: g.__fps ?? null,
    calls: r.calls,
    triangles: r.triangles,
    geometries: g.renderer.info.memory.geometries,
    textures: g.renderer.info.memory.textures,
    playerHp: Math.round(g.player.hp),
    enemies: g.enemies.list.filter((e) => e.active && !e.dead).length,
    webgl: !!g.renderer.getContext(),
  };
});

console.log('DIAGNOSTYKA', JSON.stringify(stats, null, 2));
console.log('LOG STRONY:\n' + logs.slice(0, 40).join('\n'));

await browser.close();
