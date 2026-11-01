# Runy Przeznaczenia — trójwymiarowa gra RPG

> Wilcza Dolina umiera powoli. Mgła podnosi się od północy, a pod Mglistymi Wrotami
> coś nosi twarz strażnika, który zamknął je trzydzieści lat temu.
> Odnajdź trzy okruchy Ostrza Świtu i wykuj je na nowo — zanim będzie za późno.

## Pobierz i zagraj

**Gra w jednym pliku `.exe` (~7 MB, z modelami 3D w środku)** — pobierz i uruchom, nic więcej nie trzeba:

### https://github.com/Agama12345/gta/releases/download/game-latest/RunyPrzeznaczenia.exe

Cała gra jest w środku pliku (serwer startuje lokalnie, gra otwiera się w oknie aplikacji).
Windows 10 (1903+) / 11 — .NET Framework 4.8 jest częścią systemu.
Jeśli SmartScreen ostrzega: *Więcej informacji → Uruchom mimo to*.
Diagnostyka: `RunyPrzeznaczenia.exe --selftest`.

Alternatywy: [paczka ZIP](https://github.com/Agama12345/gta/raw/arena/68dc2b6a-gta/downloads/RunyPrzeznaczenia.zip)
(rozpakuj → `Uruchom-gre.cmd`) albo launcher **Arcane Spire**
([`ArcaneSpire.exe`](https://github.com/Agama12345/gta/releases/download/launcher-latest/ArcaneSpire.exe)).

## Plan rozwoju

Lista tego, co jest w trakcie robienia (silnik, materiały ubrań, animacje walki):
[ROADMAP.md](ROADMAP.md).

## Co jest w świecie (wersja 1.3)

- **Mapa 5 × 5 km (25 km², ~5× więcej terenu niż wcześniej)** — góry, przełęcze, lasy,
  bagno, jezioro i wybrzeże. Wszystkie odległości w grze są liczone w metrach.
- **Pięć biomów:** umiarkowane łąki i lasy, **pustynia** (wydmy, kaktusy, czerwone skały),
  **sawanna** (akacje, sucha trawa), **tundra** (sopel lodu, śnieżne głazy, blade sosny)
  oraz **bagno**. Granice biomów przenikają się płynnie.
- **Teksturowany grunt (nowość 1.4):** powierzchnia nie jest już jednolitym kolorem —
  w shaderze mieszają się cztery proceduralne warstwy: **trawa** (gęste źdźbła),
  **ubity grunt i koleiny dróg**, **spękana skała** (bloki Voronoi) oraz **piasek/śnieg**.
  Waga drogi liczona jest analitycznie z osi traktów (z koleinami biegnącymi wzdłuż drogi),
  waga skały z nachylenia, a drobna siatka szczegółu rozbija powtarzalność kafla.
- **Trawa jako karty z przezroczystością** — trzy skrzyżowane, wygięte pasy z proceduralną
  teksturą źdźbeł zamiast stożków; 6000 kępek wędruje za graczem, gęstość zależy od biomu.
- **Skały w górach:** zbocza od 0,38 nachylenia pokrywa kamień, wyżej żwir i odsłonięte
  granie; do tego piargi, skalne żebra i głazy z mchem — teren przestał być jednolitą trawą.
- **Rzeki, jeziora i mosty:** trzy główne rzeki z meandrami (Szeptu, Milcząca, Bagienna)
  plus Popielna i Potok Kamienny, pięć jezior (Ciemne, Wierzbowe, Mgliste, Kamienne i Staw
  Wierzbowy) oraz cała woda stojąca. Każda rzeka ma własne koryto wtopione w teren,
  animowaną taflę z nurtem i pianą, trzciny i głazy na brzegach, przewalone pnie i **sześć
  mostów** na przecięciach z drogami — po deskach naprawdę się idzie (pomost jest częścią
  kolizji wysokości). W rzece można brodzić (nurt zwalnia), a poziom wody liczy się lokalnie,
  więc górskie jeziora leżą wyżej niż morze. Nad wodą słychać szum nurtu i plusk fali.
- **Ocean dokoła krainy** — linia brzegowa z plażami i klifami, fale, piana przybrzeżna,
  wyspy, mielizna do Samotnej Skały, mewy nad zatoką. Nie ma już niewidzialnej ściany na
  skraju mapy: dalej jest po prostu morze.
- **Nowe miejsca:** Latarnia na Cyplu (obraca smuga światła nocą), wrak „Zimnej Fali”,
  Chaty Rybaków z pomostem, suszarniami i rybakiem Tobiaszem (handel + własne dialogi).
- **Prawdziwe modele 3D (CC0, KayKit) obok proceduralnych — 58 plików:** 17 modeli natury
  (drzewa iglaste i liściaste, młode drzewka, pięć rodzajów głazów, grążele, rośliny wodne,
  martwe drzewa i jesienne sosny) rozsypywanych w tysiącach egzemplarzy przez `InstancedMesh`;
  8 modeli wyposażenia (beczki, skrzynie, kufry, beczułki, pochodnie, stoły, krzesła) w osadach
  i obozach; **cmentarz przy kurhanie** (nagrobki, krypta, trumny, kapliczki, latarnie, kości);
  **meble** (łóżka, stoły, krzesła, półki, szafki, książki, dywan, lampa, obraz) w obejściach
  chat, gospody i kuźni; ławy, latarnie uliczne i wieża wodna w osadach; oraz
  **szkielet-wojownik z 97 animacjami** (KayKit Skeletons) jako „Strażnik Kurhanu”
  i „Zapomniany Górnik” — chodzi, biegnie, zamachuje się mieczem i pada.
  Modele proceduralne (sosny z piętrami korony, dęby z korzeniami, brzozy, mchy) zostają
  jako uzupełnienie i jako zapas, gdyby plików nie było.
  Licencje i źródła: `public/assets/models/LICENSE.txt`.
- **Animacje ze stawami:** kolana, łokcie, **staw skokowy z piętą i palcami**, kołysanie
  bioder, skręt tułowia, przeciwfaza rąk i nóg, zamach i wyhamowanie ciosu, peleryna
  z segmentów, **pochylenie ciała na zboczu, przechył w zakręcie, skłon w biegu
  i amortyzacja kolan po lądowaniu**.
- **Chód liczony z dystansu, nie z czasu** (`src/core/gait.js`): kadencja wynika z tego,
  ile metrów naprawdę pokonujesz, więc stopy **nie ślizgają się** po ziemi przy zmianie
  prędkości. Staw skokowy pracuje jak u człowieka (pięta → płasko → odbicie palcami),
  a **każda stopa dopasowuje się do nierówności terenu** (lekkie IK) — dotyczy to również
  mieszkańców, którzy mają własne kroki słyszalne w panoramie dźwięku.
- **Realistyczniejsza sylwetka:** dłonie z nadgarstkiem, palcami i kciukiem, barki,
  nos, brwi, żuchwa i uszy — zamiast samych kul i walców.
- **Ekwipunek jak w „poważnym” RPG:** trzy kolumny — założone / torba / karta
  przedmiotu. Karta pokazuje rzadkość kolorowaną krawędzią, statystyki z **porównaniem
  do założonego** (zielone `+`, czerwone `−`), wartość i akcje; `Enter` zakłada lub
  używa wybranego przedmiotu, filtry i sortowanie są segmentowe, siatka ma stałe 6
  kolumn, a wybór nie przerysowuje całej torby. Karta postaci dostała paski atrybutów.
- **Menu i interfejs:** ekran tytułowy z kartą wyprawy (poziom, złoto, zadania, data zapisu,
  obracająca się wskazówka, zegar świata), menu pauzy z podsumowaniem stanu, obsługa
  klawiatury (↑ ↓ · Enter · Esc), czytelniejszy HUD z plakietkami stanu (skradanie, blok,
  bieg, most, deszcz) i dopracowany ekwipunek.
- **Menu działa offline i na słabszym sprzęcie:** kroje pisma (Cinzel, Inter) są w paczce
  zamiast pobierane z Google Fonts (stary `@import` potrafił zablokować cały arkusz stylów
  bez internetu — menu zostawało bez wyglądu), zniknęło rozmycie `backdrop-filter` nad
  canvasem, a ustawienia mają **cienie, zasięg widzenia, pole widzenia i ostrość obrazu**.
  Start pilnuje watchdog: zamiast wiecznego „Rozpalanie pochodni…” pojawia się konkretny
  komunikat z przyciskiem „Spróbuj ponownie”. Cały przepływ menu pokrywa `tests/menu.mjs`.
- **Odkrywanie mapy:** na starcie znana jest tylko Wilcza Dolina — pozostałe miejsca
  trzeba zobaczyć na własne oczy. Wejście w promień punktu odsłania go na mapie
  i minimapie, daje **+25 PD** i komunikat; nieodkryte punkty rysują się jako „?”.
  Odkrycia zapisują się razem ze stanem gry (HUD pokazuje licznik w panelu mapy).
- **Trawa w całej dolinie:** 1600 kępek w promieniu 48 m, przesuwanych za graczem —
  łąki wyglądają gęsto w każdym miejscu, a nie tylko wokół osad. Kolor i gęstość
  zależą od biomu (pustynia rzadko, las gęsto), poza ścieżkami i wodą.
- **Grunt z mikrorzeźbą:** teren ma teraz mapę detalu 512 px z wielkoskalowymi łatami
  (kafel przestaje się „powtarzać”) oraz **bump mapę** z kamykami i garby — ziemia
  pod stopami ma fakturę, nie tylko kolor.
- **Średniowieczna obsada:** bohater to łotr w kapturze (KayKit, CC0), kowal —
  barbarzyńca z gołym torsem, strażnik wioski — rycerz w pełnej zbroi, uczennica —
  mag w szacie, kupcy — łotrzy. Każdy z tych modeli ma **własne 76 animacji**:
  walkę jedną i dwuręczną, blok, uniki, czary, siadanie i śmierć. Uzupełnienie
  stanowią postacie Quaternius (starosta, zielarka, rybak, pustelnik, zjawa),
  którym animacje przelicza biblioteka ruchu. Miecz i tarcza bohatera siedzą
  w kościach dłoni i mają poprawną skalę (kości w tych modelach są w skali 100×).
- **Przeciwnicy to też prawdziwe modele:** bandyci i łucznicy stoją na modelach
  KayKit (łotr, łotr w kapturze, barbarzyńca, rycerz — przyciemnionych, żeby nie
  wyglądali jak mieszkańcy), szkielety na paczce „Skeletons” (z animacjami
  budzenia się z ziemi i śmierci), wilki i bagniaki to animowane zwierzęta
  Quaterniusa (galop, atak, padanie). Kamienny Strażnik jest złożony z prawdziwych
  teksturowanych skał z paczki natury, ze świecącym rdzeniem.
- **Zapełniona mapa:** poza 20 głównymi miejscami krainę wypełniają
  5 przysiółków (chaty, studnia, palenisko, skrzynia), 7 zagród z obsianymi
  polami (pszenica, kukurydza, dynia, marchew), 64 dzikie obozowiska, 84
  przydrożne znaki i kapliczki oraz 92 żyły rudy, zioła i skrzynie rozsiane po
  całej krainie. Na mapie świata przysiółki i zagrody mają własne znaczniki.
- **Peleryna z ruchem tkaniny:** bohater i mieszkańcy noszą płaszcze, które
  opóźniają się przy skręcie, unoszą przy biegu, falują na wietrze i opadają
  na przeszkodach.
- **Roślinność dobrana do biomu:** 32 nowe modele Quaternius (CC0) — sosny, dęby,
  brzozy i wierzby w klimacie umiarkowanym, palmy i kaktusy na pustyni, ośnieżone
  sosny w tundrze, do tego trawa, kwiaty, krzaki, kłody i pniaki jako poszycie.
  Sawanna dostała akacje i gęste trawy, bo wcześniej była pustą płaszczyzną.
- **Jedna biblioteka ruchu dla wszystkich:** 31 klipów *Universal Animation
  Library* (CC0) jest przeliczanych na szkielet każdej postaci w locie
  (`src/entities/clipRetarget.js`) — dopasowanie po rolach kości (biodra,
  kręgosłup, ręce, nogi), przenoszenie kierunków kości w świecie, ruch bioder
  i tempo chodu dobrane do prędkości. Dzięki temu chód, bieg, cios mieczem, unik,
  siad, rozmowa i pływanie wyglądają naturalnie, a nie „na sztywno”.
- **Życie w tle:** kowal uderza młotem przy warsztacie, zielarka sięga po zioła,
  rybak zarzuca wędkę, mieszkańcy odwracają się do gracza i rozmawiają, gdy
  klikniesz „Porozmawiaj”.
- **Podmiana na własne modele:** wrzucasz `.glb` do `public/assets/models/chars/`
  i dopisujesz wpis w `models.json`. Gra dopasuje skalę, znajdzie kości dłoni,
  rozpozna klipy po nazwach (także `Armature|Idle_01` i Mixamo), naprawi uszkodzone
  wagi skórowania, a przy braku pliku wróci do sylwetek proceduralnych.
  Instrukcja: `public/assets/models/chars/README.md`,
  walidacja: `node tests/characters3d.mjs`.
- **Nagrany dźwięk (130 plików, 7,1 MB) + synteza w zapasie:** kroki na sześciu
  podłożach (trawa, ziemia, śnieg, drewno, kamień, metal) w wersji chód/bieg, lądowania,
  świst i zgrzyt ostrza, uderzenia, monety, drzwi, zwierzęta, potwory, kliknięcia
  interfejsu i **orkiestrowe stingerki** (awans, zwycięstwo, porażka).
  Tło: miksowane pętle **lasu, nocy, brzegu jeziora, morza, deszczu, wiatru i wodospadu**.
  Źródło: Oculus Audio Pack (Meta, CC BY 4.0) — szczegóły w `public/assets/audio/LICENSE.txt`;
  gdy plików brakuje, wszystko wraca do syntezy proceduralnej.
- **Postacie mówią na głos** — dialogi czytane syntezą mowy systemu, każda postać ma
  własną barwę (wysokość i tempo). Klawisz **V** włącza/wyłącza głosy.
- **Pogoda:** słońce, zachmurzenie, deszcz, burza i mgła zmieniają się same; deszcz
  realnie zmniejsza zasięg, z jakiego wrogowie cię zauważają.
- **Drzewko rozwoju (klawisz P):** trzy ścieżki — Wojownik, Łowca, Mag — po sześć perków
  z rangami i wymaganiami. Punkty zdobywasz za każdy poziom; efekty (obrażenia, pancerz,
  kryt, życie, mana, moc zaklęć, cios w plecy, skradanie, łup złota) wchodzą od razu do statystyk.
- **Skradanie (klawisz X):** obniżona postawa, cichy krok i mniejszy zasięg wykrycia;
  cios w nieświadomego wroga bije mocniej (bazowo +60%, perk „Cios w plecy” dokłada kolejne rangi).
- **Blok i parowanie (prawy przycisk myszy):** blok tłumi 75% obrażeń kosztem kondycji,
  a blok rozpoczęty w ostatnich 0,25 s **paruje cios** — wróg traci równowagę i wystawia się na kontrę.
- **Trzyciosowa kombinacja:** ciosy w rytmie (do 1,1 s przerwy) tworzą łańcuch; trzeci to
  cięcie z nad głowy z odrzutem, a perk „Cios kończący” zwiększa jego moc.
- **Tablica zleceń w Wilczej Dolinie:** sześć pobocznych kontraktów (wilcze łby, zioła dla
  zielarki, patrol w kurhanie, ruda dla kowala, bandyci, nocna wachta) — do trzech naraz,
  z licznikami, nagrodami i odnawianiem po czasie. Działają równolegle do głównego wątku.
- **Rytm dnia mieszkańców:** wieczorem i nocą mieszkańcy wracają w stronę domostw
  (animowany chód), a o świcie wracają do swoich warsztatów — dzięki temu wioska żyje.

## Darmowe assety (modele, tekstury, animacje, dźwięki)

Lista sprawdzonych, **darmowych** źródeł (CC0 i podobne) z linkami — po 3 propozycje na
kategorię: trawa, skały, drzewa, roślinność, postacie, animacje, dźwięki, muzyka, efekty,
interfejs. Zobacz plik **[ASSETS.md](ASSETS.md)**.

Modele, które **już są w grze**, wraz z licencjami: **[public/assets/models/LICENSE.txt](public/assets/models/LICENSE.txt)**
(KayKit — Kay Lousberg, CC0 1.0). Test `tests/models.mjs` sprawdza przy każdym buildzie,
że wszystkie 22 pliki wczytują się, skalują i animują.

## Co to jest

Pełna, samodzielna gra RPG 3D — działa jako program na PC (własne okno) i w przeglądarce.
Teren, budynki, postacie, animacje i dźwięk są generowane proceduralnie w kodzie, a warstwę
wykończenia stanowią darmowe modele CC0 (KayKit) dołączone do repozytorium w
`public/assets/models/`. Gra nie potrzebuje serwera gry ani połączenia z internetem.

**Stack:** JavaScript (ES2022) + Three.js + Vite. Bez frameworków UI (czysty DOM/CSS).

## Pobranie i uruchomienie na komputerze

Gra jest rozpowszechniana przez launcher **Arcane Spire** — bibliotekę i sklep z grami
w stylu Steama, z automatycznymi aktualizacjami z GitHuba.

### Pobierz grę bez launchera (najszybsza droga)

| Gra | Plik | Jak uruchomić |
| --- | --- | --- |
| **Runy Przeznaczenia** | [`RunyPrzeznaczenia.zip`](https://github.com/Agama12345/gta/raw/arena/68dc2b6a-gta/downloads/RunyPrzeznaczenia.zip) (~2,1 MB) | rozpakuj → `Uruchom-gre.cmd` (otwiera grę w oknie aplikacji na lokalnym serwerze) |
| **OreRush** | [`OreRush.zip`](https://github.com/Agama12345/gta/raw/arena/68dc2b6a-gta/downloads/OreRush.zip) (7 kB) | rozpakuj → `index.html` (gra działa też offline, bez serwera) |

Paczki są generowane przez `npm run release && npm run downloads`.

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
