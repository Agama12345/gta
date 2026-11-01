import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({
  executablePath: await chromium.executablePath(), headless: true,
  env: { ...process.env, LD_LIBRARY_PATH: '/tmp/al2023/lib:/tmp' },
  args: [...chromium.args.filter((a) => a !== '--single-process' && a !== '--no-zygote'),
    '--no-sandbox', '--disable-dev-shm-usage', '--use-gl=angle', '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader', '--window-size=1280,720'],
  defaultViewport: { width: 1280, height: 720 },
});
const page = await browser.newPage();
await page.evaluateOnNewDocument(() => {
  window.addEventListener('error', (e) => {
    console.log('[onerror] ' + (e.message || '') + ' @ ' + (e.filename || '') + ':' + e.lineno + '\n' + (e.error?.stack || ''));
  });
  window.addEventListener('unhandledrejection', (e) => {
    console.log('[rejection] ' + (e.reason?.stack || e.reason?.message || e.reason));
  });
});
page.on('console', async (m) => {
  const text = m.text().slice(0, 400);
  let extra = '';
  if (text.includes('JSHandle@error')) {
    for (const arg of m.args()) {
      try { extra += ' | ' + await arg.evaluate((v) => (v && v.stack) ? v.stack : String(v)); } catch {}
    }
  }
  console.log(`[${m.type()}]`, text + extra);
});
page.on('pageerror', (e) => console.log('[wyjątek]', e.message.slice(0, 300)));
page.on('requestfailed', (r) => console.log('[req]', r.url().slice(-80), r.failure()?.errorText));
await page.goto('http://127.0.0.1:5173/', { waitUntil: 'domcontentloaded', timeout: 60000 });
for (let i = 0; i < 10; i++) {
  await new Promise((r) => setTimeout(r, 6000));
  const st = await page.evaluate(() => ({
    has: !!window.__game,
    state: window.__game?.state,
    loaded: window.__game?.assets?.loaded,
    failed: window.__game?.assets?.failed?.length,
    loading: document.querySelector('#loading')?.className ?? null,
  }));
  console.log(i, JSON.stringify(st));
  if (st.state) break;
}
await page.screenshot({ path: '/tmp/dbg.png' });
await browser.close();
