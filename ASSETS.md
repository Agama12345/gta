# Darmowe modele, tekstury, animacje i dźwięki — lista dla „Runy Przeznaczenia”

> **Aktualizacja: modele są już w grze.** Poniższa lista to katalog źródeł na przyszłość.
> Do repozytorium wciągnąłem już konkretne, darmowe (CC0) modele i podłączyłem je w kodzie:
>
> | Co | Skąd | Ile | Gdzie w grze |
> |---|------|-----|--------------|
> | Drzewa (iglaste, liściaste, młode), głazy, grążel, rośliny wodne | **KayKit — Medieval Hexagon Pack** (CC0) | 12 modeli | lasy, zbocza, brzegi jeziora — instancjonowane (tysiące drzew w kilku wywołaniach rysowania) |
> | Beczki, skrzynie, kufry, beczułki, pochodnie, stoły, krzesła | **KayKit — Dungeon Remastered** (CC0) | 8 modeli | wioska, targ, obóz bandytów, kuźnia, chaty rybaków, latarnia, ruiny; kufry z łupem to prawdziwe modele |
> | Szkielet-wojownik z 97 animacjami | **KayKit — Character Pack: Skeletons** (CC0) | 1 model | „Strażnik Kurhanu” i „Zapomniany Górnik” — chodzą, biegają, atakują i padają na animacjach z paczki |
> | Nagrobki, krypta, trumny, kapliczki, latarnie, kości, martwe drzewa, jesienne sosny | **KayKit — Halloween Bits** (CC0) | 19 modeli | cmentarz przy kurhanie, bagno wieszczki, ruiny, górskie zbocza |
> | Łóżka, stoły, krzesła, półki, szafki, książki, dywan, lampa, obraz | **KayKit — Furniture Bits** (CC0) | 12 modeli | obejścia chat, gospoda, kuźnia, chata rybaka |
> | Ława, latarnia uliczna, wieża wodna, skrzynia, krzew | **KayKit — City Builder Bits** (CC0) | 5 modeli | Wilcza Dolina i Kotlina Kupców |
>
> Pliki leżą w `public/assets/models/`, pełna lista źródeł i licencji: `public/assets/models/LICENSE.txt`.
>
> | Co | Skąd | Ile | Gdzie w grze |
> |---|------|-----|--------------|
> | Kroki na sześciu podłożach (trawa, ziemia, śnieg, drewno, kamień, metal), lądowania | **Oculus Audio Pack 1 / Meta Open Sound** (CC BY 4.0) | 66 plików OGG | chód, bieg i upadek bohatera oraz mieszkańców |
> | Pętle otoczenia: las, noc, brzeg jeziora, morze, deszcz, wiatr, wodospad, ptaki | **Oculus Audio Pack 1** (CC BY 4.0) | 10 plików | miksowane wagami środowiska w `AudioSystem.update()` |
> | Fechtunek, uderzenia, kości, monety, drzwi, zwierzęta, potwory | **Oculus Audio Pack 1** (CC BY 4.0) | 39 plików | walka, łupy, kuźnia, zagrody, jaskinie |
> | Interfejs: kliknięcia, powiadomienia, księga, plecak | **Oculus Audio Pack 1** (CC BY 4.0) | 11 plików | menu, ekwipunek, dziennik |
> | Stingerki: poziom, zwycięstwo, porażka, chóry nocne, kuranty | **Oculus Audio Pack 1** (CC BY 4.0) | 6 plików | awans, finał, śmierć, atmosfera |
>
> Dźwięki leżą w `public/assets/audio/` (mono, 32 kHz — 7,1 MB całości).
> Wymagane uznanie autorstwa: „Sound effects from the Oculus Audio Pack, © Meta Platforms, Inc.,
> licensed under CC BY 4.0” — pełny tekst w `public/assets/audio/LICENSE.txt`.
> Gdy plików brakuje (albo gra działa offline), `AudioSystem` wraca do syntezy proceduralnej.
> Jeśli plik zginie, gra automatycznie wraca do modeli proceduralnych — nic się nie wysypuje.


## 0. Kroje pisma (wbudowane w grę)

| Krój | Skąd | Licencja | Gdzie |
|------|------|----------|-------|
| **Cinzel** (nagłówki) i **Inter** (interfejs) | Google Fonts / SIL Open Font License 1.1 | OFL 1.1 | `src/assets/fonts/*.woff2` — podzbiory z polskimi znakami (42 kB + 124 kB) |

Wcześniej style pobierały krój z `fonts.googleapis.com` przez `@import`. Bez internetu
(wydanie `.exe`) przeglądarka czekała na to zapytanie i **menu zostawało bez wyglądu**.
Teraz pliki są w paczce, więc menu rysuje się natychmiast i offline.

Wszystko poniżej jest **darmowe i legalne do użycia w grze** (najczęściej CC0 — bez podawania autora,
także komercyjnie). Linki prowadzą prosto do pobrania, **bez konta i bez płacenia**.

> Poniższe pozycje to propozycje **do dalszego wzbogacania** gry (tekstury 4K, realistyczne skany
> Poly Haven itd.). Żeby coś z tego trafiło do gry, wystarczy wrzucić plik do `public/assets/` —
> podłączenie jest już przygotowane w `src/core/assets.js`.

---

## 1. Tekstury trawy i gruntu (3 zestawy)

| # | Zestaw | Pobierz | Licencja | Po co |
|---|--------|---------|----------|-------|
| 1 | **Grass 001–008** (ambientCG) | https://ambientcg.com/list?category=Ground&type=Material · np. https://ambientcg.com/view?id=Grass001 | CC0 | 8 wariantów trawy — łąki, step, sucha darń |
| 2 | **Grass Ground / Leafy Grass** (Poly Haven) | https://polyhaven.com/a/grass_ground | CC0 | zmęczona trawa z ziemią, idealna pod ścieżki |
| 3 | **Forest Ground / Forest Leaves** (Poly Haven) | https://polyhaven.com/a/forest_ground_04 | CC0 | ściółka leśna pod drzewami |

Wskazówka techniczna: bierz **1K** (mapa koloru + normalna + roughness). 4K nie ma sensu na terenie
widzianym z 30 m — a w przeglądarce/WebView2 waży 16× więcej.

## 2. Tekstury skalne, piaskowe i śnieżne (3)

| # | Zestaw | Pobierz | Licencja | Po co |
|---|--------|---------|----------|-------|
| 1 | **Rock 064 / Rocks 02** (ambientCG / Poly Haven) | https://ambientcg.com/view?id=Rock064 | CC0 | klify i granie |
| 2 | **Coast Sand Rocks** (Poly Haven) | https://polyhaven.com/a/coast_sand_rocks_02 | CC0 | plaża i wydmy pustyni |
| 3 | **Snow 015** (ambientCG) | https://ambientcg.com/view?id=Snow015 | CC0 | tundra, szczyty |

## 3. Modele drzew 3D (3 paczki)

| # | Paczka | Pobierz | Licencja | Format |
|---|--------|---------|----------|--------|
| 1 | **Poly Haven — drzewa** (dąb, brzoza, sosna, małe drzewa) | https://polyhaven.com/models/nature/trees | CC0 | blend/fbx/gltf |
| 2 | **Quaternius — Ultimate Nature Pack** (stylizowane, niska liczba trójkątów) | https://quaternius.com/packs/ultimatenature.html | CC0 | glTF/FBX/OBJ |
| 3 | **3DArt — paczki jodeł i brzóz (CC0)** | https://www.3dart.it/en/download-free-tree-models-in-fbx-format/ | CC0 | FBX/BLEND |

Dla stylu Gothica 1/2 najlepiej wypada mieszanka: **Poly Haven** (realistyczna kora i gałęzie)
+ **Quaternius** (tanie, czytelne korony do masowego obsadzania lasu).

## 4. Drobna roślinność: krzaki, paprocie, trawa 3D (3)

| # | Paczka | Pobierz | Licencja |
|---|--------|---------|----------|
| 1 | **Quaternius — Simple Nature Pack** (13 drzew, krzaki, kamienie) | https://quaternius.com/packs/simplenature.html | CC0 |
| 2 | **KayKit — Nature / Forest Bits** | https://kaylousberg.itch.io/ | CC0 (darmowe paczki) |
| 3 | **Kenney — Nature Kit** (setki klocków natury) | https://kenney.nl/assets/nature-kit | CC0 |

## 5. Postacie i przeciwnicy (3)

| # | Paczka | Pobierz | Licencja | Uwaga |
|---|--------|---------|----------|-------|
| 1 | **Quaternius — Ultimate Modular Characters** | https://quaternius.com/packs/ultimatemodularcharacters.html | CC0 | zrigowane, z animacjami |
| 2 | **KayKit — Adventurers / Skeletons** | https://kaylousberg.itch.io/kaykit-adventurers | CC0 | rycerz, mag, łucznik, szkielet |
| 3 | **Kenney — Animated Characters** | https://kenney.nl/assets/animated-characters | CC0 | ludziki z animacjami |

## 6. Animacje (3 źródła — wszystkie darmowe)

| # | Źródło | Link | Licencja | Co daje |
|---|--------|------|----------|---------|
| 1 | **Quaternius Universal Animation Library** (120+ klipów: chód, bieg, walka, śmierć, pływanie) | https://quaternius.itch.io/universal-animation-library | CC0 | gotowe pod rig humanoidalny |
| 2 | **Mixamo** (Adobe, ~2500 animacji, auto-rig) | https://www.mixamo.com | darmowe do użytku w projektach (konto Adobe) | szybkie prototypy, retarget |
| 3 | **Mesh2Motion** (open source, 160+ animacji, offline) | https://mesh2motion.org | MIT (kod) / CC0 (animacje) | działa lokalnie, bez chmury |

## 7. Dźwięki (3 źródła)

| # | Źródło | Link | Licencja | Po co |
|---|--------|------|----------|-------|
| 1 | **Freesound** (kroki, wiatr, fale, kuźnia) | https://freesound.org | CC0 / CC-BY (filtr: CC0) | realistyczne tło |
| 2 | **Sonniss — GDC Game Audio Bundle** (dziesiątki GB!) | https://sonniss.com/gameaudiogdc | royalty-free | biblioteka na lata |
| 3 | **Kenney Audio** (UI, uderzenia, monety) | https://kenney.nl/assets/category:Audio | CC0 | interfejs i walka |

## 8. Muzyka (3)

| # | Źródło | Link | Licencja |
|---|--------|------|----------|
| 1 | **Free Music Archive — Medieval / Fantasy** | https://freemusicarchive.org | CC-BY / CC0 (sprawdź utwór) |
| 2 | **Kevin MacLeod (Incompetech)** | https://incompetech.com/music/royalty-free/ | CC-BY (z podaniem autora) |
| 3 | **OpenGameArt — muzyka RPG** | https://opengameart.org/art-search-advanced?field_art_type_tid%5B%5D=12 | CC0 / CC-BY |

## 9. Efekty: cząstki, mgła, iskry (3)

| # | Paczka | Link | Licencja |
|---|--------|------|----------|
| 1 | **Kenney — Particle Pack** | https://kenney.nl/assets/particle-pack | CC0 |
| 2 | **Quaternius — VFX / Magic** | https://quaternius.com | CC0 |
| 3 | **OpenGameArt — efekty 2D/3D** | https://opengameart.org/art-search-advanced?field_art_type_tid%5B%5D=7 | mieszane (filtr CC0) |

## 10. Interfejs: ramki, ikony, kursory (3)

| # | Paczka | Link | Licencja |
|---|--------|------|----------|
| 1 | **Kenney — UI Pack / Fantasy UI Borders** | https://kenney.nl/assets/ui-pack-rpg-expansion | CC0 |
| 2 | **Game-icons.net** (4000+ ikon przedmiotów i zaklęć) | https://game-icons.net | CC-BY 3.0 (podaj autora) |
| 3 | **OpenGameArt — GUI** | https://opengameart.org/art-search-advanced?field_art_type_tid%5B%5D=9 | CC0 / CC-BY |

## 11. Tekstury ubrań, skóry, metalu (3)

| # | Zestaw | Link | Licencja |
|---|--------|------|----------|
| 1 | **Leather / Fabric (Poly Haven)** | https://polyhaven.com/textures/fabric | CC0 |
| 2 | **Metal 032 (ambientCG)** | https://ambientcg.com/view?id=Metal032 | CC0 |
| 3 | **Bark Brown 02 (Poly Haven)** | https://polyhaven.com/a/bark_brown_02 | CC0 |

---

## Kolejność, w jakiej bym to podrzucał

1. **Trawa i grunt (3 tekstury)** — największa różnica w wyglądzie za najmniejszy wysiłek.
2. **Drzewa (Poly Haven)** — natychmiast „gothicowy” las zamiast stożków.
3. **Animacje (Quaternius Universal)** — chód/bieg/walka na gotowym rigu.
4. **Dźwięki (Sonniss + Freesound)** — kroki, wiatr, kuźnia, fale.
5. **Ikony (game-icons.net)** — spójny ekwipunek i pasek zaklęć.

## Jak to podrzucić do gry

1. Rozpakuj paczkę.
2. Wrzuć pliki `.glb` do `public/assets/models/`, tekstury do `public/assets/textures/`.
3. Napisz mi, co tam leży (albo po prostu nazwy plików) — podłączę je w kodzie i zostawię
   procedurę awaryjną, jeśli plik zginie.

**Uwaga o licencjach:** CC0 nie wymaga podawania autora, ale i tak trzymam listę źródeł w
`ASSETS.md`, żeby przy ewentualnej publikacji wszystko było jasne. Przy CC-BY (Mixamo, game-icons.net,
Kevin MacLeod) trzeba podać autora w ekranie „O grze” — dopiszę to, jeśli z nich skorzystamy.
