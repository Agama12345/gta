// Przygotowuje paczkę gry do pobrania przez launcher Arcane Spire.
// Wynik trafia do releases/runy-przeznaczenia/ i jest commitowany do repozytorium,
// dzięki czemu launcher nie potrzebuje Node.js ani budowania u użytkownika.
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'releases', 'runy-przeznaczenia');

function git(cmd, fallback = '') {
  try {
    return execSync(`git ${cmd}`, { cwd: root, encoding: 'utf8' }).trim();
  } catch {
    return fallback;
  }
}

console.log('▶ Budowanie gry…');
execSync(`npx vite build --outDir "${path.relative(root, outDir)}" --emptyOutDir`, {
  cwd: root,
  stdio: 'inherit',
});

const sha = git('rev-parse HEAD', 'dev');
const date = new Date().toISOString();
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const meta = {
  game: 'runy-przeznaczenia',
  title: 'Runy Przeznaczenia',
  version: pkg.version,
  commit: sha,
  builtAt: date,
};
fs.writeFileSync(path.join(outDir, 'version.json'), JSON.stringify(meta, null, 2));

// Kopia ikony trafia do paczki, żeby launcher mógł jej użyć bez pobierania całości.
const icon = path.join(root, 'public', 'icon-256.png');
if (fs.existsSync(icon)) fs.copyFileSync(icon, path.join(outDir, 'icon-256.png'));

const files = [];
function walk(dir, base = '') {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) walk(path.join(dir, entry.name), rel);
    else files.push({ path: rel, size: fs.statSync(path.join(dir, entry.name)).size });
  }
}
walk(outDir);
const total = files.reduce((a, f) => a + f.size, 0);
// Manifest pozwala launcher'owi pobierać pojedyncze pliki i wykrywać zmiany.
fs.writeFileSync(
  path.join(outDir, 'manifest.json'),
  JSON.stringify({ ...meta, files }, null, 2)
);

console.log(`✔ Paczka gotowa: ${files.length} plików, ${(total / 1024 / 1024).toFixed(2)} MB`);
console.log(`  katalog: ${path.relative(root, outDir)}`);
console.log(`  wersja:  ${meta.version} @ ${sha.slice(0, 7)}`);
