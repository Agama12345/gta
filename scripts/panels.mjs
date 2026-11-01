import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
const OUT = process.env.SHOT_DIR || '/home/user/shots';
fs.mkdirSync(OUT, { recursive: true });
const browser = await puppeteer.launch({
  executablePath: await chromium.executablePath(),
  headless: true,
  env: { ...process.env, LD_LIBRARY_PATH: process.env.CHROMIUM_LIBS || '/tmp/al2023/lib' },
  args: [...chromium.args.filter((a) => a !== '--single-process' && a !== '--no-zygote'), '--no-sandbox', '--disable-dev-shm-usage', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
  defaultViewport: { width: 1280, height: 800 },
});
const page = await browser.newPage();
page.on('pageerror', (e) => console.log('[pageerror]', e.message));
await page.goto('http://127.0.0.1:5173/', { waitUntil: 'load', timeout: 60000 });
await page.waitForFunction('window.__game && window.__game.state === "title"', { timeout: 60000 });
await page.evaluate(() => {
  const g = window.__game;
  g.startNew();
  g.player.inventory.add('health_potion', 4);
  g.player.inventory.add('mana_potion', 2);
  g.player.inventory.add('wolf_pelt', 3);
  g.player.inventory.add('iron_ore', 2);
  g.player.inventory.add('herbs', 5);
  g.player.inventory.add('shard_dawn', 2);
  g.player.inventory.add('wolf_blade', 1);
  g.player.inventory.add('might_elixir', 1);
  g.player.inventory.add('wolf_meat', 2);
  g.player.inventory.add('bread', 1);
  g.player.points = 6;
  g.player.inventory.gold = 340;
  g.ui.openHero('inventory');
});
await new Promise((r) => setTimeout(r, 900));
await page.screenshot({ path: `${OUT}/p-inventory.png` });
await page.evaluate(() => window.__game.ui.renderHeroTab('character'));
await new Promise((r) => setTimeout(r, 500));
await page.screenshot({ path: `${OUT}/p-character.png` });
await page.evaluate(() => {
  const g = window.__game;
  g.ui.closePanels();
  g.quests.accept('wolves');
  g.ui.openHero('quests');
});
await new Promise((r) => setTimeout(r, 500));
await page.screenshot({ path: `${OUT}/p-quests.png` });
await page.evaluate(() => {
  const g = window.__game;
  g.ui.closePanels();
  g.ui.openCrafting('ancient_forge');
});
await new Promise((r) => setTimeout(r, 500));
await page.screenshot({ path: `${OUT}/p-craft.png` });
await page.evaluate(() => {
  const g = window.__game;
  g.ui.closePanels();
  g.ui.openMap();
});
await new Promise((r) => setTimeout(r, 700));
await page.screenshot({ path: `${OUT}/p-map.png` });
await browser.close();
