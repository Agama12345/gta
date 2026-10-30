// Definicje przedmiotów, ekwipunku i przepisów rzemieślniczych.

export const RARITY = {
  common: { name: 'Zwykły', color: '#cfc8b8', cls: 'rare-common' },
  rare: { name: 'Rzadki', color: '#6fa8d6', cls: 'rare-rare' },
  epic: { name: 'Epicki', color: '#b680d8', cls: 'rare-epic' },
  legend: { name: 'Legendarny', color: '#ebb55c', cls: 'rare-legend' },
};

export const ITEMS = {
  // --- broń ---
  rusty_sword: {
    name: 'Rdzawy miecz', icon: 'sword', type: 'weapon', slot: 'weapon', rarity: 'common',
    stats: { attack: 6 }, value: 12,
    desc: 'Pamiątka po ojcu. Tępy, ale wciąż potrafi przeciąć skórę bandyty.',
  },
  wolf_blade: {
    name: 'Wilcze Ostrze', icon: 'sword', type: 'weapon', slot: 'weapon', rarity: 'rare',
    stats: { attack: 13, crit: 4 }, value: 90,
    desc: 'Kute w Wilczej Dolinie. Krawędź zdobią wygrawerowane ślady pazurów.',
  },
  iron_axe: {
    name: 'Żelazny Topór', icon: 'axe', type: 'weapon', slot: 'weapon', rarity: 'rare',
    stats: { attack: 16, speed: -0.2 }, value: 110,
    desc: 'Ciężki, niezgrabny, ale rozłupuje czaszki trupów jak drewno.',
  },
  dawn_blade: {
    name: 'Klinga Świtu', icon: 'shard', type: 'weapon', slot: 'weapon', rarity: 'legend',
    stats: { attack: 28, crit: 8, hp: 25 }, value: 0,
    desc: 'Ostrze wykute ze starożytnego metalu i trzech okruchów. Świeci, gdy zbliża się mrok.',
    glow: '#ffd27a',
  },
  hunter_bow: {
    name: 'Łuk myśliwski', icon: 'bow', type: 'weapon', slot: 'weapon', rarity: 'rare',
    stats: { attack: 11, crit: 6 }, value: 80,
    desc: 'Cisowy łuk z Wilczej Doliny. Wymaga cierpliwości, nie siły.',
  },

  // --- zbroje ---
  leather_vest: {
    name: 'Skórzana kurtka', icon: 'armor', type: 'armor', slot: 'armor', rarity: 'common',
    stats: { armor: 4, hp: 10 }, value: 25,
    desc: 'Wytarta skóra, przeszyta rzemykami. Pachnie dymem ogniska.',
  },
  chainmail: {
    name: 'Kolczuga', icon: 'armor', type: 'armor', slot: 'armor', rarity: 'rare',
    stats: { armor: 11, hp: 18 }, value: 140,
    desc: 'Każde ogniwo kute osobno. Waży tyle, że słychać cię z daleka.',
  },
  wolf_cloak: {
    name: 'Płaszcz z wilczej skóry', icon: 'armor', type: 'armor', slot: 'armor', rarity: 'epic',
    stats: { armor: 8, hp: 22, speed: 0.45 }, value: 180,
    desc: 'Wilki wyją ciszej, gdy go nosisz. Ciepły nawet w mgle.',
  },
  watcher_plate: {
    name: 'Płyta Strażnika', icon: 'armor', type: 'armor', slot: 'armor', rarity: 'epic',
    stats: { armor: 18, hp: 30, mana: -10 }, value: 240,
    desc: 'Zdjęta z zapomnianego strażnika kurhanu. Wciąż chłodna.',
  },

  // --- hełmy ---
  leather_hood: {
    name: 'Kaptur podróżny', icon: 'helm', type: 'helm', slot: 'helm', rarity: 'common',
    stats: { armor: 2, mana: 10 }, value: 18,
    desc: 'Chroni od deszczu i ciekawskich spojrzeń.',
  },
  watcher_helm: {
    name: 'Hełm Strażnika', icon: 'helm', type: 'helm', slot: 'helm', rarity: 'rare',
    stats: { armor: 6, hp: 12 }, value: 85,
    desc: 'Pęknięty wizerunek wilka patrzy z żelaznego nausznika.',
  },

  // --- amulety ---
  wolf_amulet: {
    name: 'Amulet Wilka', icon: 'amulet', type: 'trinket', slot: 'trinket', rarity: 'rare',
    stats: { hp: 20, attack: 2 }, value: 95,
    desc: 'Kieł zawieszony na rzemieniu. Bije ciepłem, gdy coś czai się w ciemności.',
  },
  spark_ring: {
    name: 'Pierścień Iskry', icon: 'ring', type: 'trinket', slot: 'trinket', rarity: 'rare',
    stats: { mana: 30, attack: 2 }, value: 90,
    desc: 'W środku drga drobna iskra — nigdy nie gaśnie.',
  },
  seer_bone: {
    name: 'Kość Wieszczki', icon: 'bone', type: 'trinket', slot: 'trinket', rarity: 'epic',
    stats: { crit: 7, mana: 20 }, value: 150,
    desc: 'Szept kurhanu zamknięty w żebrze. Mówi tylko wtedy, gdy słuchasz.',
  },

  // --- mikstury i jedzenie ---
  health_potion: {
    name: 'Mikstura leczenia', icon: 'potion', type: 'consumable', rarity: 'common', stack: 9,
    value: 18, use: { heal: 45 },
    desc: 'Gorzka, ziołowa. Zamyka rany i przegania zawroty głowy.',
  },
  mana_potion: {
    name: 'Mikstura many', icon: 'potion', type: 'consumable', rarity: 'common', stack: 9,
    value: 20, use: { mana: 40 },
    desc: 'Zimna jak woda z górskiego strumienia. Rozjaśnia myśli.',
  },
  might_elixir: {
    name: 'Eliksir mocy', icon: 'elixir', type: 'consumable', rarity: 'rare', stack: 5,
    value: 45, use: { buff: { attack: 10, duration: 30 } },
    desc: 'Na 30 sekund ramiona stają się cięższe od stali.',
  },
  wolf_meat: {
    name: 'Wilcze mięso', icon: 'meat', type: 'consumable', rarity: 'common', stack: 9,
    value: 8, use: { heal: 18 },
    desc: 'Suche i żylaste, ale lepsze niż pusty żołądek.',
  },
  lake_fish: {
    name: 'Ryba z jeziora', icon: 'meat', type: 'consumable', rarity: 'common', stack: 9,
    value: 10, use: { heal: 22 },
    desc: 'Zimna woda daje tłuste, srebrne ryby. Nad ogniem smakują lepiej niż w plecaku.',
  },
  bread: {
    name: 'Chleb podróżny', icon: 'bread', type: 'consumable', rarity: 'common', stack: 9,
    value: 5, use: { heal: 12 },
    desc: 'Upieczony o świcie. Wciąż ciepły.',
  },

  // --- materiały ---
  wolf_pelt: {
    name: 'Wilcze futro', icon: 'pelt', type: 'material', rarity: 'common', stack: 30,
    value: 14, desc: 'Gęste, szare futro. Kowal zapłaci za nie bez targowania.',
  },
  iron_ore: {
    name: 'Ruda żelaza', icon: 'ore', type: 'material', rarity: 'common', stack: 30,
    value: 10, desc: 'Bryłka z kamieniołomu. Trzeba ją jeszcze oczyścić.',
  },
  herbs: {
    name: 'Zioła lecznicze', icon: 'herb', type: 'material', rarity: 'common', stack: 30,
    value: 7, desc: 'Rosną przy ścieżkach. Pachną miętą i dymem.',
  },
  ancient_metal: {
    name: 'Starożytny metal', icon: 'metal', type: 'material', rarity: 'rare', stack: 12,
    value: 55, desc: 'Nie rdzewieje i jest zimny jak kamień w studni.',
  },
  crystal_mana: {
    name: 'Kryształ many', icon: 'crystal', type: 'material', rarity: 'rare', stack: 12,
    value: 40, desc: 'W środku krąży światło. Trzymaj go nisko, gdy jesteś w kurhanie.',
  },
  shard_dawn: {
    name: 'Okruch Ostrza Świtu', icon: 'shard', type: 'quest', rarity: 'legend', stack: 3,
    value: 0, desc: 'Fragment legendarnej klingi. Trzy okruchy tworzą całość.',
  },
  old_key: {
    name: 'Zardzewiały klucz', icon: 'key', type: 'quest', rarity: 'rare', stack: 1,
    value: 0, desc: 'Do czego pasuje? Ktoś w wiosce będzie wiedział.',
  },
  stolen_grain: {
    name: 'Worek zboża', icon: 'grain', type: 'quest', rarity: 'common', stack: 1,
    value: 0, desc: 'Zrabowany w Wilczej Dolinie. Wciąż pachnie młócką.',
  },
};

export const EQUIP_SLOTS = [
  { id: 'weapon', label: 'Broń', glyph: 'sword' },
  { id: 'armor', label: 'Zbroja', glyph: 'armor' },
  { id: 'helm', label: 'Hełm', glyph: 'helm' },
  { id: 'trinket', label: 'Amulet', glyph: 'amulet' },
];

export const RECIPES = [
  { id: 'health_potion', name: 'Mikstura leczenia', out: { id: 'health_potion', qty: 2 }, cost: 8, mats: { herbs: 2 } },
  { id: 'mana_potion', name: 'Mikstura many', out: { id: 'mana_potion', qty: 2 }, cost: 10, mats: { herbs: 1, crystal_mana: 1 } },
  { id: 'might_elixir', name: 'Eliksir mocy', out: { id: 'might_elixir', qty: 1 }, cost: 20, mats: { herbs: 3, crystal_mana: 1 } },
  { id: 'wolf_blade', name: 'Wilcze Ostrze', out: { id: 'wolf_blade', qty: 1 }, cost: 30, mats: { wolf_pelt: 2, iron_ore: 2 } },
  { id: 'iron_axe', name: 'Żelazny Topór', out: { id: 'iron_axe', qty: 1 }, cost: 40, mats: { iron_ore: 3, wolf_pelt: 1 } },
  { id: 'chainmail', name: 'Kolczuga', out: { id: 'chainmail', qty: 1 }, cost: 60, mats: { iron_ore: 4, wolf_pelt: 1 } },
  { id: 'wolf_amulet', name: 'Amulet Wilka', out: { id: 'wolf_amulet', qty: 1 }, cost: 45, mats: { wolf_pelt: 2, crystal_mana: 1 } },
  { id: 'wolf_cloak', name: 'Płaszcz z wilczej skóry', out: { id: 'wolf_cloak', qty: 1 }, cost: 90, mats: { wolf_pelt: 4, iron_ore: 1 } },
  {
    id: 'dawn_blade', name: 'Klinga Świtu', out: { id: 'dawn_blade', qty: 1 }, cost: 150,
    mats: { ancient_metal: 2, shard_dawn: 3, iron_ore: 2 }, legendary: true,
  },
];

export const SHOP_STOCK = [
  'health_potion', 'health_potion', 'mana_potion', 'bread', 'leather_hood', 'leather_vest', 'hunter_bow', 'iron_ore', 'herbs',
];

export function itemName(id) {
  return ITEMS[id]?.name ?? id;
}

export function itemValue(id) {
  return ITEMS[id]?.value ?? 0;
}

export function itemStatSummary(id) {
  const it = ITEMS[id];
  if (!it?.stats) return '';
  const names = { attack: 'Atak', armor: 'Pancerz', hp: 'Życie', mana: 'Mana', crit: 'Kryt', speed: 'Szybkość' };
  return Object.entries(it.stats)
    .map(([k, v]) => `${names[k] ?? k} ${v > 0 ? '+' : ''}${v}`)
    .join(' · ');
}
