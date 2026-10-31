# Własne modele (drobnica, broń, sprzęt)

Tutaj lądują modele **spoza paczek CC0** — np. z Creazilli albo zrobione samemu.
Gra nie wymaga przy nich zmian w kodzie: wystarczy wrzucić plik i dopisać go do
`manifest.json`.

## Jak dodać model

1. Skopiuj plik do tego katalogu (obsługiwane: **.glb**, **.gltf**, **.obj**, **.stl**).
   - `.glb` jest najlepszy: jedna paczka, żadnych zaginionych tekstur.
   - `.gltf` musi mieć obok siebie swój `.bin` i obrazki.
   - `.obj` bez `.mtl` będzie miał jednolity, szary materiał.
2. Dopisz wpis w `manifest.json`:

```json
{
  "anvil": "kowadlo.glb",
  "gallows": "szubienica.obj"
}
```

3. Uruchom grę. Prop trafia do `game.assets.props.anvil` i można go stawiać:

```js
this.addAssetProp('anvil', x, z, rotY, { targetHeight: 0.9, collide: 0.6 });
```

`targetHeight` to docelowa wysokość w metrach — model jest automatycznie
przeskalowany, więc nie trzeba zgadywać jednostek (Creazilla często daje
centymetry, Quaternius metry).

## Uwagi

- Klucze zaczynające się od `_` są ignorowane — służą do komentarzy.
- Model, którego nie da się wczytać, trafia do `assets.failed` i gra działa dalej
  (na proceduralnym odpowiedniku).
- Modele z tego katalogu są traktowane jak statyka: dostają cień i kolizję tylko
  wtedy, gdy podasz `collide`.
