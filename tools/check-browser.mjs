// ---------------------------------------------------------------------------
// Kod w `src/` idzie do przeglądarki — nie wolno mu używać API Node.
//
// Raz wkradło się `process.env.DEBUG_MERGE` w scalaniu siatek: testy w Node
// przechodziły, a w przeglądarce gra wywalała się przy starcie (`process is
// not defined`) i nie dało się jej w ogóle uruchomić. Ten test pilnuje, żeby
// to się nie powtórzyło.
//
//   node tools/check-browser.mjs
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';

const ZAKAZANE = [
  [/\bprocess\.(env|argv|exit|platform|cwd)\b/g, 'process.* (tylko Node)'],
  [/\brequire\s*\(/g, 'require() (moduły CommonJS)'],
  [/from\s+['"]node:/g, "import z 'node:…'"],
  [/\b__dirname\b/g, '__dirname'],
  [/\bBuffer\.(from|alloc|isBuffer)\b/g, 'Buffer.*'],
];

function pliki(dir, out = []) {
  for (const wpis of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, wpis.name);
    if (wpis.isDirectory()) pliki(p, out);
    else if (/\.(js|mjs)$/.test(wpis.name)) out.push(p);
  }
  return out;
}

let bledy = 0;
for (const plik of pliki('src')) {
  const tekst = fs.readFileSync(plik, 'utf8');
  const linie = tekst.split('\n');
  for (const [wzorzec, opis] of ZAKAZANE) {
    wzorzec.lastIndex = 0;
    let m;
    while ((m = wzorzec.exec(tekst))) {
      const nr = tekst.slice(0, m.index).split('\n').length;
      // komentarze i przykłady w dokumentacji nie łamią działania kodu
      const linia = linie[nr - 1] ?? '';
      if (/^\s*(\/\/|\*|\/\*)/.test(linia)) continue;
      console.error(`${plik}:${nr} — ${opis}: ${m[0]}`);
      bledy += 1;
    }
  }
}

if (bledy) {
  console.error(`\n${bledy} użyć API Node w kodzie przeglądarki.`);
  process.exit(1);
}
console.log('Kod przeglądarki OK — brak API Node w src/.');
