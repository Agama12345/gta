# Postacie: bohater i mieszkańcy (modele 3D + animacje)

Tutaj leżą **prawdziwe, rigowane modele postaci**, których używa gra. Wcześniej
były to sylwetki składane w kodzie z brył — teraz bohater i wszyscy mieszkańcy
mają szkielety, twarze, ubrania i animacje z biblioteki ruchu.

```
public/assets/models/chars/
├── models.json                 ← manifest: kto, z jakiego pliku
├── postac_bohater.glb          ← Kael (bohater)
├── postac_starosta.glb         ← Stary Eryn
├── postac_kowal.glb            ← Borys Kowal
├── postac_zielarka.glb         ← Marena Zielarka
├── postac_kupiec.glb           ← Kupiec Zorzan
├── postac_uczennica.glb        ← Iskra
├── postac_pustelnik.glb        ← Pustelnik Ivar
├── postac_rybak.glb            ← Rybak Tobiasz / Kupiec Bogdan
├── postac_duch.glb             ← Cień pod Łukiem
├── animacje/ual.glb            ← biblioteka animacji (31 klipów)
└── Skeleton_Warrior.glb        ← szkielet-wojownik (przeciwnicy, KayKit)
```

## Skąd te modele

* **Postacie** — Quaternius, paczki *Ultimate Modular Men* / *Ultimate Modular
  Women* (licencja **CC0 1.0**, autor: Quaternius).
* **Animacje** — Quaternius, *Universal Animation Library* (standard, **CC0 1.0**),
  spakowane do jednego pliku `animacje/ual.glb` (bez siatki manekina, tylko kości
  i 31 klipów — od `Idle_Loop` przez `Sword_Attack`, `Roll`, `Sitting_Idle_Loop`
  po `Swim_Fwd_Loop`).

## Jak to działa w grze

1. `src/core/assets.js` czyta `models.json` i wczytuje modele **oraz** bibliotekę
   animacji (`"library": "animacje/ual.glb"`).
2. `src/entities/clipRetarget.js` przelicza animacje z biblioteki na szkielet
   każdej postaci: dopasowuje kości po rolach (`DEF-upper_arm.L`, `UpperArmL`,
   `mixamorig:LeftArm` → ta sama rola) i przenosi **kierunki kości w świecie**,
   a nie surowe liczby. Efekt: jedna biblioteka ruchu obsługuje dowolny
   humanoidalny szkielet.
3. `src/entities/characterRig.js` zarządza stanami (`idle`, `walk`, `run`,
   `attack`, `block`, `dodge`, `cast`, `hurt`, `death`, `talk`, `sit`…),
   płynnym przejściem (crossfade) i tempem animacji dopasowanym do prędkości
   (`LIBRARY_REF_SPEED`) — dzięki temu stopy nie ślizgają się po ziemi.
4. Do kości dłoni (`Hand.R` / `Hand.L`) przypina się miecz i tarcza bohatera.
   Model bez tych kości nie zepsuje gry: broń trafia wtedy na plecy.
5. Kolory ubrań mieszkańców biorą się z definicji postaci (`visual.tunic`,
   `visual.hair`, …) i są nakładane na materiały modelu — dwóch NPC na tej samej
   siatce wygląda inaczej.
6. Uszkodzone eksporty (NaN w wagach skórowania) są naprawiane w locie
   (`repairSkinWeights`), a gdy modelu brakuje — gra wraca do sylwetki
   proceduralnej. Nic nie może wysypać rozgrywki.

## Podmiana na własne modele

Wystarczy wrzucić plik i poprawić `models.json`:

```json
{
  "library": "animacje/ual.glb",
  "hero": "moj_bohater.glb",
  "npcs": {
    "eryn": "moj_eryn.glb",
    "borys": { "file": "moj_borys.glb", "anims": "moj_borys_animacje.glb" }
  }
}
```

* Klucz `hero` to bohater, klucze w `npcs` to identyfikatory z `NPCS`
  w `src/data/dialogue.js`.
* Wpis może być nazwą pliku albo obiektem `{ file, anims }`.
* Model nie musi mieć animacji — jeśli ich brak, gra użyje biblioteki `ual.glb`
  i sama przeliczy ruch na jego szkielet.
* `"library"` można pominąć, wtedy używane są wyłącznie klipy wbudowane w model.

### Wymagania dla pliku

| Element | Wymagane |
|---|---|
| Format | `.glb` lub `.gltf` + `.bin` (glTF 2.0) |
| Układ | Y do góry, postać patrzy w **+Z**, stopy w y = 0 |
| Jednostki | metry, wzrost ~1,7–1,9 m (gra i tak przeskaluje) |
| Szkielet | humanoidalny; nazwy kości mogą być dowolne (role rozpoznajemy po aliasach) |
| Dłonie | mile widziane `Hand.R`/`Hand.L` (albo `Palm`, `Wrist`) — do nich trafia broń |
| Animacje | opcjonalne; nazwy typu `Idle`, `Walk`, `Run`, `Attack`, `Death` są rozpoznawane automatycznie |
| Tekstury | wbudowane w `.glb` albo obok jako `.png` (zostaną wczytane) |

## Sprawdzenie

```bash
node tests/characters3d.mjs     # 34 asercje na prawdziwych plikach
npm test                        # cały zestaw
```

Test weryfikuje m.in.: wysokość po normalizacji, komplet kości, przeliczenie
31 klipów, brak `NaN`, długość kroku w animacji chodu, gniazda dłoni, pokrycie
wszystkich NPC w manifeście i naprawę uszkodzonego modelu.
