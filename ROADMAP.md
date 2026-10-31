# Plan rozwoju — „Runy Przeznaczenia”

Lista robocza prowadzona na bieżąco. Każda pozycja ma powód, konkretne kroki
i sposób sprawdzenia, że naprawdę działa (bez tego nie da się odróżnić
„zrobione” od „wygląda na zrobione”).

---

## 1. Silnik: jeszcze mniej wywołań rysowania (stwory i drobnica)

**Stan:** scene ma ~4,2 tys. obiektów rysowalnych; statyka (domy, mosty,
drobnica) jest już scalona — z 3 802 siatek zostało 1 821. Postacie (gracz,
mieszkańcy, szkielety) są sklejone w **jedną siatkę** z kolorem wierzchołka.
Zostają modele proceduralne (golem, zjawa, wilk, bagniak) — po kilkadziesiąt
brył na sztukę.

**Do zrobienia:**
- [ ] wrogowie proceduralni: scalić nieanimowane części (korpus, hełm, pasy)
      w jedną siatkę na typ, animować tylko kości/uchwyty,
- [ ] ten sam typ wroga w wielu miejscach → `InstancedMesh` zamiast kopii,
- [ ] poziom szczegółowości roślinności: uproszczona geometria kafli dalej niż
      ~400 m (uwaga: `SimplifyModifier` gubi atrybuty i wywala się na luźnych
      wierzchołkach — trzeba własnego decymatora zachowującego kolory),
- [ ] cienie tylko dla obiektów w promieniu mapy cienia (±46 m).

**Kryterium:** licznik `obiektów rysowalnych` w `node tools/preview.mjs --tris --draws`
poniżej 2 500, klatka stabilna na karcie klasy GTX 1050.

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

## Zrobione (dla kontekstu)

- mapa 5 × 5 km z oceanem, 20+ lokacji, rzeki i jeziora,
- tekstury gruntu generowane w kodzie (trawa, żwir z kamykami, warstwy skalne,
  piasek ze zmarszczkami) + droga z koleinami liczona w shaderze,
- fale wody na GPU (mapa normalnych przesuwana w czasie) — 0 ms na CPU,
- trawa: pole 6 000 kępek przesuwane z graczem, wysokości doliczane partiami,
- poziomy jakości + automatyczne dopasowanie + dynamiczna rozdzielczość,
- postacie: realistyczne proporcje (Quaternius), animacje z UAL przez retargeting,
  jedna siatka na postać, faktura tkaniny, plecak bohatera schowany.
