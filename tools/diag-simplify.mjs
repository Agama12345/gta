import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
import * as THREE from 'three';
const root='/home/user/gta/public';
const server=http.createServer((req,res)=>{const f=path.join(root,decodeURIComponent(req.url.split('?')[0]));fs.readFile(f,(e,d)=>{if(e){res.writeHead(404);res.end('');return;}res.writeHead(200);res.end(d);});});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const base=`http://127.0.0.1:${server.address().port}/`;
class FakeImage{constructor(){this.width=4;this.height=4;this.style={};}set src(v){this._src=v;setTimeout(()=>this.onload?.({}),0);}get src(){return this._src;}addEventListener(){}removeEventListener(){}setAttribute(){}getAttribute(){return null;}}
globalThis.self=globalThis;globalThis.document={createElementNS:()=>new FakeImage(),createElement:()=>new FakeImage()};
globalThis.createImageBitmap=async()=>({width:4,height:4,close(){}});
globalThis.ProgressEvent=class{constructor(t,i={}){this.type=t;Object.assign(this,i);}};
const R=globalThis.Request;globalThis.Request=class extends R{constructor(i,n){super(typeof i==='string'?new URL(i,base).toString():i,n);}};
const rf=globalThis.fetch;globalThis.fetch=(i,n)=>rf(typeof i==='string'?new URL(i,base).toString():i,n);
globalThis.URL.createObjectURL=()=>'blob:test';globalThis.URL.revokeObjectURL=()=>{};
const { naturalizeFoliage, prepareInstancing } = await import('/home/user/gta/src/core/assets.js');
const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');
const { SimplifyModifier } = await import('three/addons/modifiers/SimplifyModifier.js');
for (const name of ['q_oak_a','q_pine_a','q_willow_a','q_bush_a']) {
  const gltf = await new GLTFLoader().loadAsync(base+`assets/models/nature/${name}.glb`);
  const parts = prepareInstancing(naturalizeFoliage(gltf.scene), { mergeAll: true });
  const g = parts[0].geometry;
  const tri = g.attributes.position.count/3;
  const t0=performance.now();
  const mod = new SimplifyModifier();
  const simplified = mod.modify(g, Math.floor(g.attributes.position.count * 0.5));
  console.log(name, 'tri', tri, '→', simplified.attributes.position.count/3, `(${(performance.now()-t0).toFixed(0)} ms)`, 'atrybuty:', Object.keys(simplified.attributes).join(','));
}
server.close();
