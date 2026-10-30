#!/usr/bin/env python3
"""Paczki do pobrania dla ludzi, którzy nie chcą launchera.

Tworzy w downloads/:
  RunyPrzeznaczenia.zip  — zbudowana gra + lokalny serwer + Uruchom-gre.cmd
  OreRush.zip            — gra zręcznościowa (jeden plik HTML) + skrót
  OreRush.html           — sama gra, do otwarcia jednym kliknięciem

Uzycie:  python3 tools/pack_downloads.py   (albo: npm run downloads)
"""
import os
import shutil
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOWNLOADS = os.path.join(ROOT, 'downloads')
RUNY = os.path.join(ROOT, 'releases', 'runy-przeznaczenia')
ORE = os.path.join(ROOT, 'releases', 'orerush')

RUN_CMD = r'''@echo off
rem ===================================================================
rem  RUNY PRZEZNACZENIA - uruchomienie bez instalacji
rem  Otwiera gre w oknie aplikacji (Edge/Chrome) na lokalnym serwerze.
rem  Zamykajac okno serwera, konczysz gre.
rem ===================================================================
chcp 65001 >nul 2>nul
setlocal
set "HERE=%~dp0"
set "PORT=8099"

if not exist "%HERE%serve.ps1" (
  echo Brak pliku serve.ps1 obok tego skryptu.
  pause
  exit /b 1
)

echo Uruchamiam lokalny serwer gry na porcie %PORT%...
start "Arcane Spire - serwer gry (zamknij, aby zakonczyc)" powershell.exe -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File "%HERE%serve.ps1" -Port %PORT% -Root "%HERE%"

timeout /t 2 /nobreak >nul
set "URL=http://127.0.0.1:%PORT%/index.html"

if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
  start "" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" --app=%URL% --window-size=1500,940 --no-first-run
  exit /b 0
)
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
  start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" --app=%URL% --window-size=1500,940 --no-first-run
  exit /b 0
)
start "" %URL%
exit /b 0
'''

READ_ME = '''RUNY PRZEZNACZENIA
==================

1. Rozpakuj caly folder (nie uruchamiaj plikow prosto z archiwum).
2. Kliknij dwa razy  Uruchom-gre.cmd
   Otworzy sie okno gry (Edge/Chrome w trybie aplikacji).
   Drugie, ukryte okno to serwer plikow — jego zamkniecie konczy gre.
3. Sterowanie: W A S D / strzalki — ruch, Spacja — atak, Shift — sprint,
   E — interakcja, Tab — ekwipunek, M — mapa, Esc — menu.

Jesli Windows zablokuje skrypt: prawy klawisz na pliku -> Wlasciwosci -> Odblokuj.
Alternatywa bez skryptow: w folderze uruchom w terminalu
   python -m http.server 8099
i wejdz na http://127.0.0.1:8099

Zapis gry trzymany jest w przegladarce (localStorage).
'''

ORE_READ_ME = '''ORERUSH
=======

Kliknij dwa razy  index.html  — gra otwiera sie w przegladarce.
Dziala tez bez internetu i bez serwera.

Sterowanie: W A S D / strzalki — ruch, Spacja — kilof, Shift — sprint, P — pauza.
Rekord zapisuje sie lokalnie w przegladarce.
'''


def add_file(zf, path, arcname):
    zf.write(path, arcname)


def pack_runy():
    if not os.path.isdir(RUNY):
        print('  [!] brak releases/runy-przeznaczenia — uruchom najpierw npm run release')
        return None
    out = os.path.join(DOWNLOADS, 'RunyPrzeznaczenia.zip')
    os.makedirs(DOWNLOADS, exist_ok=True)
    count = 0
    with zipfile.ZipFile(out, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as zf:
        for dirpath, _dirs, files in os.walk(RUNY):
            for name in sorted(files):
                full = os.path.join(dirpath, name)
                rel = os.path.relpath(full, RUNY).replace(os.sep, '/')
                add_file(zf, full, 'RunyPrzeznaczenia/' + rel)
                count += 1
        # lokalny serwer i skrót
        add_file(zf, os.path.join(ROOT, 'launcher', 'serve.ps1'), 'RunyPrzeznaczenia/serve.ps1')
        zf.writestr('RunyPrzeznaczenia/Uruchom-gre.cmd', RUN_CMD.replace('\n', '\r\n'))
        zf.writestr('RunyPrzeznaczenia/CZYTAJ.txt', READ_ME.replace('\n', '\r\n'))
        count += 3
    size = os.path.getsize(out)
    print(f'  RunyPrzeznaczenia.zip: {count} plików, {size / 1024:.0f} kB')
    return out


def pack_orerush():
    if not os.path.isdir(ORE):
        print('  [!] brak releases/orerush — uruchom npm run release')
        return None
    os.makedirs(DOWNLOADS, exist_ok=True)
    src = os.path.join(ORE, 'index.html')
    # sama gra jako pojedynczy plik
    single = os.path.join(DOWNLOADS, 'OreRush.html')
    shutil.copyfile(src, single)
    out = os.path.join(DOWNLOADS, 'OreRush.zip')
    with zipfile.ZipFile(out, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as zf:
        zf.write(src, 'OreRush/index.html')
        zf.writestr('OreRush/CZYTAJ.txt', ORE_READ_ME.replace('\n', '\r\n'))
    print(f'  OreRush.html: {os.path.getsize(single) / 1024:.0f} kB')
    print(f'  OreRush.zip:  {os.path.getsize(out) / 1024:.0f} kB')
    return out


def main():
    print('▶ Paczki do pobrania')
    pack_runy()
    pack_orerush()
    print('gotowe')


if __name__ == '__main__':
    main()
