# Runy Przeznaczenia — trójwymiarowa gra RPG w przeglądarce

> Wilcza Dolina umiera powoli. Mgła podnosi się od północy, a pod Mglistymi Wrotami
> coś nosi twarz strażnika, który zamknął je trzydzieści lat temu.
> Odnajdź trzy okruchy Ostrza Świtu i wykuj je na nowo — zanim będzie za późno.

## Co to jest

Pełna, samodzielna gra RPG 3D działająca w przeglądarce. Cały świat, modele, animacje
i dźwięk są generowane proceduralnie w kodzie — projekt nie potrzebuje żadnych
zewnętrznych assetów ani serwera gry. Wystarczy otworzyć stronę.

**Stack:** JavaScript (ES2022) + Three.js + Vite. Bez frameworków UI (czysty DOM/CSS).

## Pobranie i uruchomienie na komputerze

Gra jest rozpowszechniana przez launcher **Arcane Spire** — bibliotekę i sklep z grami
w stylu Steama, z automatycznymi aktualizacjami z GitHuba.

### Gotowy plik do pobrania (Windows 10/11)

**[ArcaneSpire.exe](https://github.com/Agama12345/gta/releases/download/launcher-latest/ArcaneSpire.exe)**
(~145 kB, jeden plik, .NET Framework 4.8 jest już w systemie)

1. Pobierz plik i uruchom go (jeśli SmartScreen ostrzega: *Więcej informacji → Uruchom mimo to*).
2. Ustawienia → **„Zainstaluj launcher w systemie”** — skrót na pulpicie i w menu Start.
3. W sklepie wybierz grę → **ZAINSTALUJ** → pasek pobierania → **GRAJ**.

W bibliotece czekają dwie gry:

| Gra | Co to jest |
| --- | --- |
| **Runy Przeznaczenia** | RPG akcji 3D, świat 1560 × 1560 m, 15 krain, góry, jezioro, fabuła |
| **OreRush** | zręcznościówka w przeglądarce: kop, zbieraj rudę, uciekaj przed kamieniami |

Każda zmiana kodu w repozytorium to nowy commit — launcher wykrywa go przy starcie
i podmienia pliki gry (i sam siebie) przed uruchomieniem.

### Wersja skryptowa / awaryjna

[`ArcaneSpire-launcher.zip`](https://github.com/Agama12345/gta/raw/arena/68dc2b6a-gta/downloads/ArcaneSpire-launcher.zip)
— PowerShell + WinForms, ta sama logika, gdyby .exe nie wystartował.
Szczegóły w [`launcher/README.md`](launcher/README.md).

## Uruchomienie (wersja dla programistów)

```bash
npm install
npm run dev        # -> http://localhost:5173
npm run release    # paczka do releases/runy-przeznaczenia (dla launchera)
```

Wersja produkcyjna:

```bash
npm run build      # wynik w dist/
npm run preview    # serwer podglądu
```

Testy (działają bez przeglądarki, na jsdom):

```bash
npm test                      # test dymny: świat, gracz, walka, UI
node tests/integration.mjs    # pełna pętla gry, zapis, śmierć, boss
node tests/story.mjs          # przejście całego wątku fabularnego
```

## Sterowanie

| Klawisz | Akcja |
| --- | --- |
| `W A S D` | ruch |
| `Shift` | bieg (zużywa kondycję) |
| Lewy przycisk myszy | atak (3-ciosowa kombinacja, trzeci cios jest szeroki) |
| `Spacja` | unik / przewrót (chwila nietykalności) |
| `Q` `E` `R` | zaklęcia: Znak Świtu, Wilczy Zew, Blask Świtu |
| `1` `2` | mikstury z paska szybkiego dostępu |
| `F` | interakcja: rozmowa, kuźnia, zioła, skrzynie, kapliczka |
| `I` / `C` / `K` | ekwipunek / postać / zadania |
| `M` | mapa świata |
| `Esc` | pauza, zapis, wyjście do menu |

Mysz: rozglądanie po kliknięciu w planszę (pointer lock), a gdy przeglądarka go
zablokuje — rozglądanie przeciągnięciem przy wciśniętym przycisku. Na dotyku:
lewa strona ekranu to ruch, prawa to kamera.

## Co jest w grze

**Świat 3D — duża, otwarta kraina.** Teren 1560 × 1560 m (ok. 2,4 km²), ukształtowany
proceduralnie: sześć pasm górskich, przełęcze, pagórki, polany, lasy, bagno, jezioro
i skalny wał na krawędzi mapy. Brzeg jeziora jest wycinany z rzeczywistego zarysu
niecki, więc linia wody zgadza się z terenem; w głęboką wodę wejść nie można. Piętnaście miejsc: Wilcza Dolina, Kotlina Kupców,
Rozdroże Trzech Dróg, Kowalska Góra, obóz bandytów, Kurhan Szeptu, Mgliste Wrota,
kamieniołom, Jezioro Milczące, Warownia Popiołu, Pustelnia, Bagno Wieszczki,
Przełęcz Kalmoru, Kamienny Krąg i Kopalnia Żelazna — połączonych siecią dróg.
Teren dzieli się na 12 × 12 chunków z trzema poziomami szczegółu (5 m / 10 m / 18 m
siatki), ma analityczne normalne (brak szwów), proceduralną teksturę detalu
i cieniowanie stoków. Pełny cykl dnia i nocy (doba = 6 minut) ze wschodami,
zmierzchem, gwiazdami i światłem księżyca.

**Walka.** Ciosy łączone w kombinacje, uniki z nietykalnością, trafienia krytyczne,
pociski (strzały, kule wieszczki), trzy zaklęcia, wstrząsy kamery, cząstki, efekty
cięcia. Dziesięć typów przeciwników (wilki i alfa, bandyci, łucznicy, weterani,
szkielety, zjawy, bagniaki, kamienne golemy, zapomniani górnicy) + trzy starcia
z bossami (Rudy Wilk, Wieszczka z Kurhanu, Kaldras z drugą fazą walki).
Kaldras śpi w ruinach do czasu podjęcia finałowego zadania.

**Rozwój.** Poziomy i doświadczenie, cztery atrybuty (siła, zręczność,
wytrzymałość, skupienie), ekwipunek na cztery sloty, rzadkości przedmiotów,
30+ itemów, sklepy, sprzedaż.

**Rzemiosło.** Kuźnia Borysa i Starożytna Kuźnia na Kowalskiej Górze —
mikstury, zbroje i legendarna Klinga Świtu, którą można wykować tylko z trzech
okruchów, starożytnego metalu i w odpowiednim miejscu.

**Fabuła.** Pięć powiązanych zadań, drzewka dialogowe reagujące na stan zadań,
porę dnia i poziom gracza, dziewięcioro mieszkańców z własnymi historiami
(w tym pustelnik w Ciemnym Lesie i kupiec w Kotlinie), przedmioty fabularne
i finał z wyborem tonu opowieści.

**Świat żyje.** Odpoczynek przy ognisku przesuwa czas do świtu, nocą w kurhanie
pojawia się wieszczka, dniem znika, wrogowie wracają po czasie, zioła i rudy
odrastają, skrzynie otwierają się na dobre. Przeciwnicy poza zasięgiem wzroku
nie są animowani (duża mapa, ~80 punktów spawnu). W głęboką wodę jeziora wejść
nie można — bagno i mokradła są przechodnie.

**UI.** HUD z paskami życia, many, kondycji i doświadczenia, minimapa, kompas
z celem zadania, dziennik zadań, dziennik zdarzeń, plakietki wrogów, liczby obrażeń,
mapa świata, ekrany: tytułowy, pauzy, śmierci i zwycięstwa. Zapis w `localStorage`
(automatyczny i ręczny).

## Struktura kodu

```
src/
├── main.js              # bootstrap, ekran ładowania, obsługa błędów
├── game.js              # stan gry, pętla, światła, walka, zapis, interakcje
├── core/
│   ├── input.js         # klawiatura, mysz, dotyk
│   ├── time.js          # cykl dnia i nocy (krzywa światła)
│   └── utils.js         # matematyka, szum, RNG deterministyczny
├── world/
│   ├── terrain.js       # wysokości (siatka + interpolacja), teren, woda, ścieżki
│   ├── models.js        # proceduralne modele: ludzie, wilki, szkielety, budynki
│   ├── mergeProps.js    # scalanie setek brył w kilka siatek (wydajność)
│   ├── sky.js           # gradientowe niebo zależne od godziny
│   └── world.js         # składanie krainy, kolizje, punkty interakcji
├── entities/
│   ├── player.js        # gracz, statystyki, ataki, zaklęcia, animacja
│   ├── enemy.js         # AI (bezpośrednie, dystansowe, bestia, boss), respawn
│   └── npc.js           # mieszkańcy, dialogi, zjawy
├── systems/
│   ├── camera.js        # kamera trzeciej osoby z kolizjami
│   ├── fx.js            # cząstki, cięcia, fale, pociski
│   ├── inventory.js     # torba, ekwipunek, złoto
│   ├── quests.js        # cele, postęp, nagrody
│   ├── dialogue.js      # silnik rozmów
│   └── audio.js         # dźwięk syntezowany w WebAudio (bez plików)
├── data/                # przedmioty, przeciwnicy, zadania, dialogi, spawn
└── ui/                  # HUD, panele, mapa, ikony SVG, style
```

### Jak to działa (skrót)

* **Teren** to jedna siatka wysokości 313 × 313 próbek (co 5 m). Wysokość liczy
  proceduralny szum (fbm), pasma gór (odległość od łamanej), pierścień gór na krawędzi
  i „spłaszczenia” w miejscach osad. Gra używa tej samej siatki z interpolacją,
  więc postacie stoją dokładnie na tym, co widać (budowa siatki ≈ 150 ms).
* **Wydajność**: geometria terenu jest dzielona na chunki (130 m) z LOD zależnym od
  odległości; drzewa, skały, płoty i domy są łączone w statyczne siatki per chunk,
  trawa to jedna `InstancedMesh`. Scena rysuje zwykle 100–400 wywołań na klatkę.
* **Modele** to bryły (Box/Cylinder/Cone/Icosahedron) składane w grupy z animowanymi
  stawami — ruch, atak, unik, trafienie, śmierć i gesty rozmówców są animowane w kodzie.

## Rozbudowa

* **Nowy przeciwnik** — dopisz wpis w `src/data/enemies.js` (statystyki, model, łup)
  i punkt spawnu w `SPAWNS`. Model wybierasz z gotowych: `humanoid`, `wolf`,
  `skeleton`, `wraith`, `golem`, `lurker`, `kaldras`.
* **Nowa kraina** — dodaj wpis do `LOCATIONS` w `src/world/terrain.js`, spłaszczenie
  w `FLAT_SPOTS`, ścieżkę w `PATHS`, zabudowę w `world.js` oraz etykietę w `POI_LABELS`
  (`src/ui/ui.js`).
* **Nowy przedmiot** — wpis w `src/data/items.js` (statystyki, ikona z `src/ui/icons.js`).
* **Nowe zadanie** — wpis w `src/data/quests.js` + kolejność w `QUEST_ORDER`,
  drzewko dialogowe w `src/data/dialogue.js`.
* **Własne modele 3D** — jeśli kiedyś powstanie plik `.glb`, wystarczy podmienić
  budowę modelu w `buildEnemyModel()` / `Player._buildModel()` na `GLTFLoader`;
  cała reszta (animacje stawów) wymaga wtedy mapowania nazw kości.

## Uwagi

* Gra wymaga WebGL 2 (każda współczesna przeglądarka).
* Czcionki tytułowe pobierane są z Google Fonts; bez internetu UI korzysta
  z czcionek systemowych i nadal jest w pełni czytelne.
* Zapis gry trzymany jest w `localStorage` pod kluczem `runy-przeznaczenia-save`
  (starsze zapisy `ostrze-switu-save` są migrowane automatycznie).

---

*Powodzenia, Kaelu. Mgła nie czeka.*
