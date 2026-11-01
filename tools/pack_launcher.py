#!/usr/bin/env python3
"""Pakuje katalog launcher/ do downloads/ArcaneSpire-launcher.zip.

Uzycie:  python3 tools/pack_launcher.py   (albo: npm run launcher-pack)

Dzieki temu w repozytorium lezy gotowy plik, ktory uzytkownik moze pobrac
jednym klikiem z GitHuba - bez budowania czegokolwiek.
"""
import os
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'launcher')
OUT_DIR = os.path.join(ROOT, 'downloads')
OUT = os.path.join(OUT_DIR, 'ArcaneSpire-launcher.zip')


def main() -> int:
    os.makedirs(OUT_DIR, exist_ok=True)
    count = 0
    total = 0
    with zipfile.ZipFile(OUT, 'w', zipfile.ZIP_DEFLATED) as zf:
        skip = {'src', 'assets'}
        for dirpath, dirs, files in os.walk(SRC):
            dirs[:] = [d for d in dirs if d not in skip]
            for name in sorted(files):
                if name.endswith('.zip'):
                    continue
                path = os.path.join(dirpath, name)
                arc = os.path.relpath(path, ROOT).replace(os.sep, '/')
                zf.write(path, arc)
                count += 1
                total += os.path.getsize(path)
    size = os.path.getsize(OUT)
    print(f'✔ Paczka launchera: {count} plików, {total / 1024:.1f} kB -> {size / 1024:.1f} kB')
    print(f'  plik: {os.path.relpath(OUT, ROOT)}')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
