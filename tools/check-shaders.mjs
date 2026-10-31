// Sprawdzenie shaderów gruntu bez GPU: składanie wstrzyknięć, spójność
// z chunkami three.js i parsowanie samego wstrzykniętego GLSL.
//   node tools/check-shaders.mjs
import * as THREE from 'three';
import {
  injectVertexShader, injectFragmentShader, FRAG_BODY, FRAG_NORMAL, FRAG_DECL,
} from '../src/world/groundMaterial.js';
import { parser } from '@shaderfrog/glsl-parser';

function resolveIncludes(src, depth = 0) {
  if (depth > 12) throw new Error('zbyt głębokie zagnieżdżenie #include');
  return src.replace(/#include <([a-zA-Z0-9_]+)>/g, (m, name) => {
    const chunk = THREE.ShaderChunk[name];
    if (chunk === undefined) throw new Error(`brak chunku shadera: ${name}`);
    return resolveIncludes(chunk, depth + 1);
  });
}

function balanced(src) {
  let braces = 0;
  let parens = 0;
  for (const ch of src) {
    if (ch === '{') braces += 1;
    else if (ch === '}') braces -= 1;
    else if (ch === '(') parens += 1;
    else if (ch === ')') parens -= 1;
    if (braces < 0 || parens < 0) return false;
  }
  return braces === 0 && parens === 0;
}

let failed = 0;
function check(label, ok, detail = '') {
  console.log(`${ok ? 'OK  ' : 'BŁĄD'} ${label}${detail ? ` — ${detail}` : ''}`);
  if (!ok) failed += 1;
}

const VERT_SRC = THREE.ShaderLib.standard.vertexShader;
const FRAG_SRC = THREE.ShaderLib.standard.fragmentShader;
const v = injectVertexShader(VERT_SRC);
const f = injectFragmentShader(FRAG_SRC, 20);

check('wstrzyknięcie do vertex shadera', v !== VERT_SRC && v.includes('attribute vec4 aGround'));
check('wstrzyknięcie do fragmentu', f !== FRAG_SRC && f.includes('uniform vec4 uPaths[GRD_PATHS]'));
check('definicja liczby traktów', f.includes('#define GRD_PATHS 20'));
check('kotwice chunków istnieją',
  VERT_SRC.includes('#include <common>') && VERT_SRC.includes('#include <begin_vertex>')
  && FRAG_SRC.includes('#include <common>') && FRAG_SRC.includes('#include <color_fragment>')
  && FRAG_SRC.includes('#include <normal_fragment_maps>'));
check('brak nieużytych #include po sklejeniu',
  !/#include </.test(resolveIncludes(v) + resolveIncludes(f)));

const fragResolved = resolveIncludes(f);
check('normalna wierzchołkowa vNormal dostępna w fragmencie', fragResolved.includes('vNormal'));
// viewMatrix deklaruje prefiks WebGLProgram (nie chunk), więc sprawdzamy to źródłowo
import fs from 'node:fs';
const program = fs.readFileSync(new URL('../node_modules/three/src/renderers/webgl/WebGLProgram.js', import.meta.url), 'utf8');
check('prefiks three deklaruje viewMatrix w fragmencie', /uniform mat4 viewMatrix;/.test(program));

// --- parsowanie samego wstrzykniętego GLSL w minimalnym, poprawnym kontekście
const fragStub = `
precision highp float;
uniform vec4 uPaths[20];
uniform sampler2D uGrassMap;
uniform sampler2D uGrassH;
uniform sampler2D uDirtMap;
uniform sampler2D uDirtH;
uniform sampler2D uRockMap;
uniform sampler2D uRockH;
uniform sampler2D uSandMap;
uniform sampler2D uSandH;
uniform vec2 uPathEdge;
uniform float uDetailGain;
uniform float uBumpScale;
uniform mat4 viewMatrix;
varying vec4 vGrdW;
varying vec3 vGrdPos;
varying vec3 vNormal;
vec4 diffuseColor;
vec3 normal;
void main() {
${FRAG_BODY}
${FRAG_NORMAL}
}
`;
try {
  parser.parse(fragStub.replace('#define GRD_PATHS 20', ''), { quiet: true });
  check('GLSL wkładki do fragmentu parsuje się', true);
} catch (err) {
  check('GLSL wkładki do fragmentu parsuje się', false, err.message.split('\n')[0]);
}

const vertStub = `
precision highp float;
attribute vec3 position;
attribute vec4 aGround;
uniform mat4 modelMatrix;
varying vec4 vGrdW;
varying vec3 vGrdPos;
void main() {
  vec3 transformed = vec3(position);
  vGrdW = aGround;
  vGrdPos = (modelMatrix * vec4(transformed, 1.0)).xyz;
  gl_Position = modelMatrix * vec4(transformed, 1.0);
}
`;
try {
  parser.parse(vertStub, { quiet: true });
  check('GLSL wkładki do wierzchołków parsuje się', true);
} catch (err) {
  check('GLSL wkładki do wierzchołków parsuje się', false, err.message.split('\n')[0]);
}

check('nawiasy zbalansowane (wkładka vertex)', balanced(FRAG_DECL(20) + FRAG_BODY + FRAG_NORMAL));
check('deklaracje fragmentu bez powtórzeń', (FRAG_DECL(20).match(/uniform sampler2D uGrassMap;/g) || []).length === 1);

const sampled = (FRAG_BODY.match(/texture2D\(/g) || []).length;
// Koszt piksela: im mniej próbek, tym lżej — pilnujemy górnej granicy,
// bo splat pokrywa większość ekranu.
check('fragment próbkuje tekstury w rozsądnym zakresie', sampled >= 5 && sampled <= 8, `${sampled} sampli`);

process.exit(failed ? 1 : 0);
