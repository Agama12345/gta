# Plan rozwoju — „Runy Przeznaczenia”

Lista robocza prowadzona na bieżąco. Każda pozycja ma powód, konkretne kroki
i sposób sprawdzenia, że naprawdę działa (bez tego nie da się odróżnić
„zrobione” od „wygląda na zrobione”).

---

## 1. Silnik: jeszcze mniej wywołań rysowania (stwory i drobnica)

**Stan:** ~2,9 tys. obiektów rysowalnych (było 4,1 tys.). Statyka scalona po
*kolorze wierzchołka*, nie po materiale — z 3 839 siatek zostało 1 757, a każdy
obiekt interaktywny (169 szt.) to teraz jedna siatka zamiast ośmiu. Postacie
(gracz, mieszkańcy, szkielety, bestie) są sklejone w **jedną siatkę**.
Roślinność ma własny decymator (`src/core/decimate.js`): przy graczu 60%
trójkątów, w dalszych kaflach 28% — w kadrze z 17,8 mln zrobiło się 13,6 mln,
a rasteryzacja z 7,7 do 4,9 mln.

**Do zrobienia:**
- [ ] wrogowie proceduralni: scalić nieanimowane części (korpus, hełm, pasy)
      w jedną siatkę na typ, animować tylko kości/uchwyty,
- [ ] ten sam typ wroga w wielu miejscach → `InstancedMesh` zamiast kopii,
- [x] poziom szczegółowości roślinności: własny decymator (`decimate.js`,
      grupowanie wierzchołków w siatce — zachowuje kolory i UV),
- [ ] cienie tylko dla obiektów w promieniu mapy cienia (±46 m).

**Kryterium:** licznik `obiektów rysowalnych` w `node tools/preview.mjs --tris --draws`
poniżej 2 500 (jest 2 956), klatka stabilna na karcie klasy GTX 1050.

---

## 2. Materiały ubrań bohatera

**Stan:** postać ma jeden materiał z kolorem wierzchołka i wspólną fakturą
tkaniny (splot + przetarcia). Kolory są nadal „płaskie” — brak przeszyć,
zagięć i różnic między skórą, lnem i wełną.

**Do zrobienia:**
- [ ] osobne faktury: len (gruby splot), wełna (meszek), skóra (pory),
- [ ] przeszycia na krawędziach: maska z UV + linia o innym odcieniu,
- [ ] normalna z faktury (bump z wysokości) — tkanina zacznie łapać światło,
- [ ] przybrudzenia u dołu spodni i na butach (gradient po wysokości w UV),
- [ ] lekkie zróżnicowanie koloru między częściami garderoby (nie jedna plama).

**Kryterium:** `node tools/render-char.mjs q_adventurer.glb /tmp/postac.png 3.14159`
— przy zbliżeniu widać splot i przeszycia, nie jednolity kolor.

---

## 3. Animacje walki

**Stan:** klipy pochodzą z Universal Animation Library (CC0) i są przenoszone
na szkielet postaci. Chód i bieg wyglądają dobrze; atak to pojedynczy klip bez
wind-upu, trafienia i odrzutu.

**Do zrobienia:**
- [ ] atak złożony z trzech faz: zamach → cięcie → powrót (osobne klipy,
      sklejone crossfade'em w `CharacterRig.playCombo`),
- [ ] reakcja na trafienie zależna od kierunku (przód/tył/bok),
- [ ] dopasowanie stóp do podłoża (stopa nie zapada się na zboczu),
- [ ] prędkość klipu zsynchronizowana z prędkością ruchu (już częściowo jest),
- [ ] test: `node tests/characters3d.mjs` + wizualna kontrola klatek.

**Kryterium:** walka czytelna z kamery zza pleców — widać zamach, cięcie
i odrzut przeciwnika, bez „ślizgania” stóp.

---

## 4. Gęstość terenu (to, co widać pod nogami)

**Stan:** grunt ma cztery warstwy (trawa, ziemia, skała, piasek) mieszane po
nachyleniu i wysokości, droga z koleinami liczona w shaderze, do tego kępki
trawy. W praktyce obraz jest jednak zbyt jednolity: brak drobnych kamieni,
kęp suchych traw i łach piasku wzdłuż wody.

**Do zrobienia:**
- [ ] drobne kamienie (50–200 szt. w promieniu 60 m, instancje, losowa skala),
- [ ] „łachy” piasku i żwiru przy brzegach — maska liczona raz przy budowie kafla,
- [ ] suche, wyższe kępy trawy na skrajach lasu (inny wariant karty),
- [ ] ślady bytności: wydeptane ścieżki między zagrodami a traktem,
- [ ] test: `node tools/ground-preview.mjs` — porównanie przed/po.

**Kryterium:** stojąc w dowolnym miejscu widać w promieniu 20 m co najmniej
trzy różne rodzaje podłoża, a nie jednolitą zieleń.

---

## Zrobione (dla kontekstu)

- mapa 5 × 5 km z oceanem, 20+ lokacji, rzeki i jeziora,
- tekstury gruntu generowane w kodzie (trawa, żwir z kamykami, warstwy skalne,
  piasek ze zmarszczkami) + droga z koleinami liczona w shaderze,
- fale wody na GPU (mapa normalnych przesuwana w czasie) — 0 ms na CPU,
- trawa: pole 6 000 kępek przesuwane z graczem, wysokości doliczane partiami,
- poziomy jakości + automatyczne dopasowanie + dynamiczna rozdzielczość,
- scalanie statyki po kolorze wierzchołka (materiały różniące się tylko barwą
  trafiają do jednej siatki), osobno obiekty interaktywne,
- LOD roślinności (własny decymator, zachowuje kolory i UV),
- postacie: realistyczne proporcje (Quaternius), animacje z UAL przez retargeting,
  jedna siatka na postać, faktura tkaniny, plecak bohatera schowany.
