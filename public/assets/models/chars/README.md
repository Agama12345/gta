# Modele bohatera i mieszkańców — instrukcja wrzucania

Tutaj trafiają **Twoje** modele postaci. Gra sama je wykryje i użyje — nie trzeba
nic zmieniać w kodzie ani niczego kompilować.

## 1. Co wrzucić

```
public/assets/models/chars/
├── models.json        ← manifest (opisanego niżej)
├── hero.glb           ← bohater (Kael)
├── npc_eryn.glb       ← mieszkaniec „eryn”
└── ...
```

`models.json`:

```json
{
  "hero": "hero.glb",
  "npcs": {
    "eryn": "npc_eryn.glb",
    "borys": "npc_borys.glb"
  }
}
```

Można też podać klipy w osobnym pliku (np. eksport „animation only”):

```json
{
  "hero": { "file": "hero.glb", "anims": "hero_animacje.glb" },
  "npcs": { "eryn": "npc_eryn.glb" }
}
```

Identyfikatory mieszkańców (`eryn`, `borys`, …) znajdziesz w `src/data/dialogue.js`
w obiekcie `NPCS`.

## 2. Wymagania techniczne

| Element | Wymaganie |
|---|---|
| Format | **.glb** (najlepiej) lub `.gltf` + tekstury obok w tym samym katalogu |
| Układ osi | **Y do góry**, postać patrzy w **+Z**, stopy w `y = 0` |
| Jednostki | metry; wzrost 1,7–1,9 m (gra sama przeskaluje do 1,82 / 1,78) |
| Szkielet | armature z kośćmi; nazwy dowolne, ale **dłonie** powinny zawierać `Hand`/`Wrist` (`RightHand`, `mixamorig:LeftHand`, `hand_R`…) |
| Animacje | w tym samym pliku co szkielet (albo osobny plik przez `anims`) |
| Rozmiar | do ~30 tys. trójkątów na postać, tekstury 1–2K |
| Cienie | gra sama włącza `castShadow`/`receiveShadow` |

## 3. Nazwy animacji (klipy)

Nazwa klipu jest dopasowywana po aliasach, bez względu na wielkość liter i znaki
specjalne (`Armature|Idle_01` też zadziała). Potrzebne stany:

| Stan | Przykładowe nazwy |
|---|---|
| postawa | `Idle`, `Stand`, `UnarmedIdle` |
| chód | `Walk`, `Walking`, `WalkFwd` |
| bieg | `Run`, `Sprint`, `Jog` |
| atak | `Attack`, `Slash`, `SwordSlash` (opcjonalnie `Attack2`, `Attack3`) |
| blok | `Block`, `Guard`, `Parry` |
| unik | `Dodge`, `Roll` |
| czar | `Cast`, `Spell` |
| obrażenia | `Hurt`, `Hit`, `Flinch` |
| śmierć | `Death`, `Die` |
| rozmowa | `Talk`, `Speak`, `Gesture` |

Minimum, żeby gra wyglądała dobrze: **Idle + Walk + Run + Attack + Death.**
Brakujące stany są zastępowane najbliższym sensownym (bieg → chód → postawa).
Pełna lista aliasów: `CLIP_ALIASES` w `src/entities/characterRig.js`.

## 4. Broń i tarcza

Gra przypina miecz do kości prawej dłoni, a tarczę do lewej. Jeśli kości nie da
się znaleźć, miecz trafia na plecy (nigdy nie wisi w powietrzu). Model broni jest
generowany proceduralnie — nie musisz go dostarczać.

## 5. Jak sprawdzić, czy zadziałało

```bash
node tests/character.mjs      # walidacja manifestu + mapowania klipów
npm run dev                   # i po prostu zajrzyj do gry
```

Konsola przeglądarki wypisze `Modele postaci: bohater + N mieszkańców`.
Brak pliku lub błąd wczytywania **nie psuje gry** — wracają sylwetki proceduralne.
