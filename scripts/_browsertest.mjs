import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';
const executablePath = await chromium.executablePath();
console.log('chromium:', executablePath);
const browser = await puppeteer.launch({
  executablePath, headless: true,
  env: { ...process.env, LD_LIBRARY_PATH: '/tmp/al2023/lib:/tmp' },
  args: [...chromium.args.filter((a) => a !== '--single-process' && a !== '--no-zygote'),
    '--no-sandbox', '--disable-dev-shm-usage', '--use-gl=angle',
    '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--window-size=1280,720'],
  defaultViewport: { width: 1280, height: 720 },
});
const page = await browser.newPage();
await page.goto('http://127.0.0.1:5173/', { waitUntil: 'domcontentloaded', timeout: 60000 });
const gl = await page.evaluate(() => {
  const c = document.createElement('canvas');
  const g = c.getContext('webgl2');
  return g ? g.getParameter(g.VERSION) + ' | ' + g.getParameter(g.RENDERER) : 'brak webgl2';
});
console.log('webgl:', gl);
await browser.close();
