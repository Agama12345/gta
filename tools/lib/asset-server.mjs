// Wspólny „serwer plików” dla narzędzi uruchamianych w Node: jsdom nie potrafi
// pobrać modeli z `public/`, więc podstawiamy lokalny serwer HTTP i podmieniamy
// `fetch`, `Request` oraz `Image` tak, żeby GLTFLoader i tekstury działały.
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

/** @returns {Promise<{base:string, close:()=>void}>} */
export async function serveAssets(dom, { root = 'public' } = {}) {
  const rootAbs = path.resolve(root);
  const server = http.createServer((req, res) => {
    const rel = decodeURIComponent(req.url.split('?')[0]);
    const file = path.join(rootAbs, rel);
    if (!file.startsWith(rootAbs)) {
      res.writeHead(403);
      res.end();
      return;
    }
    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end();
        return;
      }
      const type = file.endsWith('.png') ? 'image/png'
        : file.endsWith('.json') ? 'application/json'
          : file.endsWith('.glb') ? 'model/gltf-binary'
            : file.endsWith('.ogg') ? 'audio/ogg' : 'application/octet-stream';
      res.writeHead(200, { 'content-type': type });
      res.end(data);
    });
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const base = `http://127.0.0.1:${server.address().port}/`;
  install(dom, base);
  return { base, close: () => server.close() };
}

function install(dom, base) {
  class FakeImage {
    constructor() {
      this.width = 4;
      this.height = 4;
      this.style = {};
    }
    set src(value) {
      this._src = value;
      setTimeout(() => {
        this.onload?.({});
        this._listeners?.load?.forEach((fn) => fn({}));
      }, 0);
    }
    get src() {
      return this._src;
    }
    addEventListener(type, fn) {
      (this._listeners ??= {})[type] = [...(this._listeners[type] ?? []), fn];
    }
    removeEventListener() {}
    setAttribute() {}
    getAttribute() {
      return null;
    }
  }
  dom.window.document.createElementNS = () => new FakeImage();
  const realCreateElement = dom.window.document.createElement.bind(dom.window.document);
  dom.window.document.createElement = (tag) => (
    String(tag).toLowerCase() === 'img' ? new FakeImage() : realCreateElement(tag)
  );
  globalThis.ProgressEvent ??= class ProgressEvent {
    constructor(type, init = {}) {
      this.type = type;
      Object.assign(this, init);
    }
  };
  const RealRequest = globalThis.Request;
  globalThis.Request = class extends RealRequest {
    constructor(input, init) {
      super(typeof input === 'string' ? new URL(input, base).toString() : input, init);
    }
  };
  const realFetch = globalThis.fetch;
  globalThis.fetch = (input, init) => realFetch(
    typeof input === 'string' ? new URL(input, base).toString() : input,
    init,
  );
  globalThis.URL.createObjectURL = () => 'blob:preview';
  globalThis.URL.revokeObjectURL = () => {};
}
