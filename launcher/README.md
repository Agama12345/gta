# Arcane Spire 1.1 — launcher gier (Windows)

## Pobierz

**Zalecane — paczka ZIP (exe + skrypty pomocy):**
https://github.com/Agama12345/gta/releases/download/launcher-latest/ArcaneSpire.zip

**Sam plik exe:**
https://github.com/Agama12345/gta/releases/download/launcher-latest/ArcaneSpire.exe
(albo kopia w repozytorium: `downloads/ArcaneSpire.exe`)

Windows 10 (1903+) / Windows 11 — .NET Framework 4.8 jest częścią systemu. Rozmiar ~150 kB.

### Jak uruchomić

1. **Rozpakuj ZIP** (nie uruchamiaj pliku prosto z archiwum).
2. Kliknij dwa razy `uruchom.cmd` — odblokowuje plik (SmartScreen), uruchamia launcher,
   a jeśli okno nie wstanie w 20 sekund, pokazuje ostatnie kroki startu.
3. Możesz też uruchomić `ArcaneSpire.exe` bezpośrednio.

### Gdy launcher nie startuje

Kliknij `diagnostyka.cmd`. Na pulpicie powstanie **`diagnostyka.txt`** z:
wersją .NET Framework, informacjami o pliku, wynikiem autotestu, ostatnimi wpisami
`start.log` i `launcher.log` oraz błędami z dziennika zdarzeń Windows.

Ręcznie:

```cmd
ArcaneSpire.exe --selftest    :: sprawdzenia bez sieci i bez okna głównego
ArcaneSpire.exe --safe        :: tryb awaryjny: bez sprawdzania aktualizacji
```

Logi: `%LOCALAPPDATA%\ArcaneSpire\start.log` (krok po kroku start)
i `%LOCALAPPDATA%\ArcaneSpire\launcher.log`.

### Gdy nic nie pomaga

Wersja skryptowa (PowerShell 5.1, bez .exe):
[`ArcaneSpire-launcher.zip`](https://github.com/Agama12345/gta/raw/arena/68dc2b6a-gta/downloads/ArcaneSpire-launcher.zip)
→ rozpakuj → `ArcaneSpire.bat`.

## Co jest w środku

| Element | Opis |
| --- | --- |
| **Sklep** | kafelki gier, ceny, „Dodaj do biblioteki”, wyszukiwanie po bibliotece |
| **Biblioteka** | lista gier, karta gry, duży przycisk GRAJ/ZAINSTALUJ, czas gry, wersja, commit |
| **Pobierania** | kolejka jak w Steamie: postęp, prędkość, ETA, anulowanie, czyszczenie |
| **Konto** | rejestracja i logowanie lokalne (PBKDF2-SHA256, 60 000 iteracji), biblioteka i statystyki per konto |
| **Ustawienia** | auto-aktualizacje, autostart z Windows, folder danych, log, instalacja do systemu |
| **Aktualizacje** | wykrywanie nowego commitu na GitHubie + podmiana plików przed uruchomieniem gry; launcher aktualizuje też siebie |

Dwie gry w bibliotece: **Runy Przeznaczenia** (RPG 3D, świat 1560 m) i **OreRush**
(zręcznościówka w przeglądarce). Obie instalują się z GitHuba jednym kliknięciem,
z paskiem pobierania i automatycznymi aktualizacjami.

## Jak działa instalacja

1. Klik **ZAINSTALUJ** → launcher pyta GitHub API o ostatni commit gałęzi.
2. Pobiera ZIP paczki z `codeload.github.com` (bez limitów API), z postępem i prędkością.
3. Rozpakowuje **tylko** katalog `releases/<gra>/`, podmienia go atomowo (`www.new` → `www`).
4. Zapisuje `state.json` (SHA, wersja, rozmiar, data) — to podstawa wykrywania zmian.
5. **GRAJ** → lokalny serwer HTTP na `127.0.0.1` (TcpListener, bez uprawnień administratora)
   i Edge/Chrome w trybie `--app` z osobnym profilem, więc gra wygląda jak osobna aplikacja.

Auto-aktualizacja: przy starcie, po kliknięciu „Sprawdź aktualizacje” i co 5 minut
w tle. Każdy nowy commit w repozytorium = nowa wersja do pobrania.

## Dodawanie własnych gier

Biblioteka → **Właściwości** (albo przycisk „Dodaj grę”):

| Typ źródła | Kiedy |
| --- | --- |
| `web` | repozytorium GitHub + katalog z `index.html` — pełne aktualizacje |
| `file` | bezpośredni link do pliku (np. instalator) — pobierany z postępem |
| `external` | istniejąca strona/gra w internecie — otwierana w oknie aplikacji |

## Autotest

```cmd
ArcaneSpire.exe --selftest
```

Sprawdza: katalogi, JSON, GitHub API, pobranie i rozpakowanie paczki, lokalny serwer HTTP,
wykrycie przeglądarki i możliwość samoaktualizacji. Wynik pokazuje w okienku i zapisuje
w `%LOCALAPPDATA%\ArcaneSpire\launcher.log`.

## Wersja skryptowa (awaryjna)

Zostawiona na wypadek, gdyby .exe nie wystartował na starym systemie: `ArcaneSpire.bat`
uruchamia `ArcaneSpire.ps1` (PowerShell 5.1, ta sama logika biblioteki i aktualizacji,
skromniejszy interfejs).

## Kompilacja

Launcher buduje GitHub Actions na `windows-latest` (`.github/workflows/build-launcher.yml`):
`dotnet build` → `dotnet publish` (net48, WinForms) → plik trafia do wydania `launcher-latest`.
Ikona jest generowana z `launcher/assets/launcher-source.png` przez `python3 tools/make_icons.py`.

```bash
npm run icons          # ikony gry i launchera (PNG 16–512 + .ico)
npm run launcher-pack  # ZIP z wersją skryptową (downloads/)
npm run release        # paczki gier do releases/ (Runy + OreRush)
```
