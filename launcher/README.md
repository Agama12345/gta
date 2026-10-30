# Arcane Spire — launcher gier

Launcher w stylu Steama dla gier z GitHuba. Zero instalacji: **Windows 10/11 ma
wszystko, czego potrzebuje** (PowerShell 5.1 + WinForms).

```
launcher/
├── ArcaneSpire.bat     ← kliknij dwa razy, żeby uruchomić
├── ArcaneSpire.ps1     ← główny program (biblioteka, aktualizacje, UI)
├── serve.ps1           ← lokalny serwer plików gry (tylko 127.0.0.1)
├── install.ps1         ← instalator jednolinijkowy (skróty na pulpicie)
├── ArcaneSpire.ico     ← ikona (fioletowa runa)
└── ui/icon-128.png     ← logo w oknie
```

## Jak to działa

1. **Biblioteka** — lista gier w `%LOCALAPPDATA%\ArcaneSpire\library.json`.
   Domyślnie: *Runy Przeznaczenia* (gotowa) i *OreRush* (dodaj repozytorium).
2. **Wykrywanie zmian** — launcher pyta GitHub API o ostatni commit gałęzi.
   Inny SHA niż zapisany lokalnie ⇒ jest nowa wersja.
3. **Pobieranie** — jeden plik ZIP z `codeload.github.com` (nie limituje API),
   rozpakowywany tylko z katalogu `releases/<gra>`.
4. **Uruchomienie** — lokalny serwer HTTP na `127.0.0.1` (własny `TcpListener`,
   bez uprawnień administratora) + Edge/Chrome w trybie `--app` — gra wygląda
   jak osobna aplikacja, bez pasków przeglądarki.
5. **Auto-aktualizacja** — przy starcie, przy kliknięciu GRAJ i co 5 minut.
   Każda zmiana linijki kodu w repozytorium to nowy commit ⇒ launcher sam
   pobiera nową paczkę przed uruchomieniem gry.

## Instalacja u użytkownika

**Wariant A — jeden plik, jedno polecenie** (PowerShell):

```powershell
irm https://raw.githubusercontent.com/Agama12345/gta/arena/68dc2b6a-gta/launcher/install.ps1 | iex
```

Instaluje launcher w `%LOCALAPPDATA%\ArcaneSpire\app`, tworzy skrót na pulpicie
i w menu Start, potem go uruchamia.

**Wariant B — ZIP z GitHuba**: pobierz repozytorium jako ZIP, rozpakuj,
wejdź w `launcher\` i kliknij dwa razy `ArcaneSpire.bat`.

**Autotest** (diagnostyka połączenia i rozpakowywania, bez okna):

```cmd
ArcaneSpire.bat -SelfTest
```

Wynik trafia do `%LOCALAPPDATA%\ArcaneSpire\launcher.log`.

## Dodawanie gry (np. OreRush)

Przycisk **DODAJ GRĘ**:

| Pole | Znaczenie |
| --- | --- |
| Nazwa gry | cokolwiek, np. `OreRush` |
| Repozytorium GitHub | `twoj-nick/OreRush` |
| Gałąź | `main` |
| Katalog paczki w repo | np. `releases/orerush` (katalog z `index.html`) |
| Link bezpośredni | wypełnij **zamiast** repo, jeśli gra to pojedynczy plik/instalator |

Gra przeglądarkowa = `kind: web` (repo + katalog). Duży plik do pobrania
(np. build z Unreala) = `kind: file` (sam link) — launcher pobiera go z paskiem
postępu i uruchamia z dysku.

## Bezpieczeństwo

* serwer HTTP słucha **wyłącznie** na `127.0.0.1` i tylko w obrębie katalogu gry
  (ochrona przed `..`),
* launcher nie wysyła nigdzie danych poza zapytaniami do `api.github.com`
  i `codeload.github.com`,
* cała logika jest w czytelnych skryptach `.ps1` — można sprawdzić każdą linię.

## Znane ograniczenia

* Windows-only (używa WinForms). Na Linuksie/macu tę samą grę uruchomisz
  w przeglądarce: `npm run dev` albo `npm run preview`.
* Bez Edge/Chrome gra otworzy się w domyślnej przeglądarce (bez trybu okna).
* Limit GitHub API bez logowania to 60 zapytań/godzinę — launcher zużywa jedno
  na grę przy sprawdzaniu, więc jest daleko poniżej.
