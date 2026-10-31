import { JSDOM } from 'jsdom';
const dom = new JSDOM(`<!doctype html><html><body><div id="ui"></div><div id="loading"><div class="loading-sub"></div></div><canvas id="scene" width="1280" height="720"></canvas></body></html>`, { pretendToBeVisual: true, url: 'http://localhost/' });
global.window = dom.window; global.document = dom.window.document;
Object.defineProperty(global, 'navigator', { value: dom.window.navigator, configurable: true });
global.HTMLElement = dom.window.HTMLElement; global.HTMLCanvasElement = dom.window.HTMLCanvasElement;
global.self = dom.window;
global.localStorage = { _d:{}, getItem(k){return this._d[k]??null;}, setItem(k,v){this._d[k]=String(v);}, removeItem(k){delete this._d[k];} };
Object.defineProperty(window,'localStorage',{value:global.localStorage,configurable:true});
Object.defineProperty(window,'innerWidth',{value:1280,configurable:true});
Object.defineProperty(window,'innerHeight',{value:720,configurable:true});
const noop=()=>{};
global.requestAnimationFrame=()=>0; global.cancelAnimationFrame=noop;
const ctxStub=()=>new Proxy({createImageData:(w,h)=>({data:new Uint8ClampedArray(w*h*4),width:w,height:h}),getImageData:(x,y,w,h)=>({data:new Uint8ClampedArray(w*h*4),width:w,height:h}),measureText:()=>({width:10}),createRadialGradient:()=>({addColorStop:noop}),createLinearGradient:()=>({addColorStop:noop})},{get:(t,k)=>(k in t?t[k]:noop),set:(t,k,v)=>((t[k]=v),true)});
dom.window.HTMLCanvasElement.prototype.getContext=()=>ctxStub();
const { serveAssets } = await import('/home/user/gta/tools/lib/asset-server.mjs');
await serveAssets(dom);
const THREE = await import('three');
const { Game } = await import('/home/user/gta/src/game.js');
const { loadAssets } = await import('/home/user/gta/src/core/assets.js');
const { LOCATIONS, heightAt } = await import('/home/user/gta/src/world/terrain.js');
const assets = await loadAssets();
const stats={frames:0,pixelRatio:1};
const renderer={domElement:document.getElementById('scene'),shadowMap:{enabled:true,needsUpdate:true},outputColorSpace:'',setPixelRatio(v){stats.pixelRatio=v;},getPixelRatio(){return stats.pixelRatio;},setSize:noop,setClearColor:noop,render(){},capabilities:{isWebGL2:true,maxTextureSize:4096},info:{render:{calls:0,triangles:0}},dispose:noop};
const game = new Game(document.getElementById('scene'), { renderer, assets, disableStaticMerge: process.env.NOMERGE === '1' });
game.ui.applyVideoSettings=()=>{};
game.start();
const w = game.world;
const cx = LOCATIONS.village.x, cz = LOCATIONS.village.z;
console.log('wioska', cx, cz, 'wysokość', heightAt(cx,cz).toFixed(1));
const box = new THREE.Box3();
let near=0, big=0;
const samples=[];
game.scene.updateMatrixWorld(true);
game.scene.traverse((o) => {
  if (!o.isMesh && !o.isInstancedMesh) return;
  box.setFromObject(o);
  const sz = box.getSize(new THREE.Vector3());
  const d = Math.hypot((box.min.x+box.max.x)/2-cx, (box.min.z+box.max.z)/2-cz);
  if (d < 80) { near++; }
  if (sz.x>4 && sz.z>4 && sz.y>2 && d<300) { big++; if (samples.length<12) samples.push(`${o.name||'(bez nazwy)'} ${sz.x.toFixed(1)}x${sz.y.toFixed(1)}x${sz.z.toFixed(1)} d=${d.toFixed(0)} rodz=${o.parent?.name||'?'}`); }
});
console.log('siatki <80 m od wioski:', near, '| duże budynki <300 m:', big);
console.log(samples.join('\n'));
// --- co jest w static-props (wynik PropBatcher) ---
const pg = game.world.propsGroup;
let pm = 0;
const rows = [];
pg.traverse((o) => {
  if (!o.isMesh) return;
  pm += 1;
  box.setFromObject(o);
  const sz = box.getSize(new THREE.Vector3());
  const tris = o.geometry.index ? o.geometry.index.count / 3 : o.geometry.attributes.position.count / 3;
  rows.push(`${o.name || '(bez nazwy)'} | ${sz.x.toFixed(0)}×${sz.y.toFixed(0)}×${sz.z.toFixed(0)} | ${Math.round(tris / 1000)}t | y ${box.min.y.toFixed(1)}..${box.max.y.toFixed(1)}`);
});
console.log('static-props:', pm, 'siatki');
console.log(rows.slice(0, 10).join('\n'));
const rows2 = [];
game.world.group.traverse((o) => {
  if (!o.isMesh || !o.name.startsWith('scalone')) return;
  box.setFromObject(o);
  const tris = o.geometry.index ? o.geometry.index.count / 3 : o.geometry.attributes.position.count / 3;
  rows2.push(`${o.name} | ${Math.round(tris / 1000)}t | środek ${((box.min.x+box.max.x)/2).toFixed(0)},${((box.min.z+box.max.z)/2).toFixed(0)} | y ${box.min.y.toFixed(1)}..${box.max.y.toFixed(1)} | mat ${o.material.type} vc=${o.material.vertexColors ? 1 : 0} kolor=${o.material.color?.getHexString?.()}`);
});
console.log(rows2.join('\n'));
const hugeMeshes = [];
game.world.group.traverse((o) => {
  if (!o.isMesh) return;
  const tr = o.geometry.index ? o.geometry.index.count / 3 : o.geometry.attributes.position.count / 3;
  if (tr > 50000) hugeMeshes.push(o);
});
for (const o of hugeMeshes.slice(0, 3)) {
  o.geometry.computeBoundingBox();
  const b = o.geometry.boundingBox;
  const tris2 = o.geometry.index ? o.geometry.index.count / 3 : o.geometry.attributes.position.count / 3;
  const c = o.geometry.attributes.color;
  let cmin = 9, cmax = -9;
  for (let i = 0; i < Math.min(c.count, 4000); i++) {
    cmin = Math.min(cmin, c.getX(i), c.getY(i), c.getZ(i));
    cmax = Math.max(cmax, c.getX(i), c.getY(i), c.getZ(i));
  }
  console.log('DUŻA', o.name, 'tris', Math.round(tris2), 'geoBox', b.min.toArray().map((v) => v.toFixed(1)).join(','), '..', b.max.toArray().map((v) => v.toFixed(1)).join(','),
    '| visible', o.visible, '| frustum', o.frustumCulled, '| parent', o.parent?.name, '| matrixWorld', o.matrixWorld.elements.slice(12, 15).map((v) => v.toFixed(1)).join(','),
    '| kolory', cmin.toFixed(2), '..', cmax.toFixed(2), '| mat', o.material.type, o.material.vertexColors);
}
{
  const m = hugeMeshes[0];
  const pos = m.geometry.attributes.position;
  let near = 0, ground = 0;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    const d = Math.hypot(x - 0, z - 936);
    if (d < 60) { near += 1; if (y > 20 && y < 90) ground += 1; }
  }
  console.log('wierzchołki w promieniu 60 m od wioski:', near, 'z tego na wysokości 20..90 m:', ground, '(razem', pos.count, ')');
  const ys = [];
  for (let i = 0; i < pos.count; i += Math.max(1, Math.floor(pos.count / 200))) ys.push(pos.getY(i));
  ys.sort((a, b) => a - b);
  console.log('percentyle y: 5%', ys[Math.floor(ys.length*0.05)].toFixed(1), '50%', ys[Math.floor(ys.length*0.5)].toFixed(1), '95%', ys[Math.floor(ys.length*0.95)].toFixed(1));
}
console.log('wszystkie siatki w scene:', (() => { let n = 0; game.scene.traverse((o) => { if (o.isMesh || o.isInstancedMesh) n += 1; }); return n; })());
process.exit(0);
