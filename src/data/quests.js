// Fabuła i zadania. Główny wątek prowadzi od wioski do Mglistych Wrót.

export const QUESTS = {
  wolves: {
    name: 'Wilki u bram',
    giver: 'eryn',
    level: 1,
    intro:
      'Stary Eryn rozgrzebuje ogień kijem. „Trzy noce z rzędu wilki podchodzą pod płoty. Zabito dwie owce, a pastuch twierdzi, że wśród nich biegł jeden… większy. Zajmij się nimi, zanim stado wejdzie do wioski.”',
    objectives: [
      { id: 'kill', type: 'kill', enemy: 'wolf', target: 5, text: 'Zabij wilki wokół Wilczej Doliny (0/5)' },
      { id: 'return', type: 'talk', npc: 'eryn', text: 'Wróć do Starego Eryna' },
    ],
    reward: { gold: 90, xp: 160, items: [['health_potion', 2], ['bread', 1]] },
    outro: 'Eryn kiwa głową. „Pięć? To więcej, niż myślałem. Bierz monety, zasłużyłeś.”',
    next: 'grain',
  },
  grain: {
    name: 'Zrabowane zboże',
    giver: 'eryn',
    level: 2,
    intro:
      '„Banda Rudego Wilka zabrała nam zapas zboża na zimę. Obozowisko leży na zachód, za rozdrożem. Przynieś worek, a jeśli Rudy stanie ci na drodze… cóż, nikt w wiosce nie będzie płakać.”',
    objectives: [
      { id: 'grain', type: 'collect', item: 'stolen_grain', target: 1, text: 'Odzyskaj worek zboża z obozu bandytów' },
      { id: 'leader', type: 'kill', enemy: 'bandit_leader', target: 1, text: 'Pokonaj Rudego Wilka' },
      { id: 'return', type: 'talk', npc: 'eryn', text: 'Wróć do Starego Eryna' },
    ],
    reward: { gold: 140, xp: 260, items: [['iron_ore', 3], ['health_potion', 2]] },
    outro:
      'Eryn przez chwilę milczy. „Rudy Wilk nie żyje. To znaczy, że w dolinie zrobi się spokojniej… albo ktoś inny zajmie jego miejsce.” Wskazuje na północ. „Kurhan Szeptu. Słyszałeś kiedyś, jak ziemia mówi?”',
    next: 'barrow',
  },
  barrow: {
    name: 'Szept Kurhanu',
    giver: 'eryn',
    level: 3,
    intro:
      '„W kurhanie na północy pochowano kiedyś wieszczkę. Nocami jej głos niesie się po dolinie i woła imiona tych, którzy umrą. Idź tam po zmroku i ucisz ją. Mówią, że strzeże okruchu ostrza — tego, o którym mówił twój ojciec.”',
    objectives: [
      { id: 'wraith', type: 'kill', enemy: 'wraith', target: 1, text: 'Pokonaj Wieszczkę z Kurhanu (tylko nocą)' },
      { id: 'shard', type: 'collect', item: 'shard_dawn', target: 1, text: 'Zdobądź Okruch Ostrza Świtu' },
      { id: 'return', type: 'talk', npc: 'eryn', text: 'Wróć do Starego Eryna' },
    ],
    reward: { gold: 180, xp: 340, items: [['crystal_mana', 2], ['mana_potion', 2]] },
    outro:
      'Eryn patrzy na okruch w twojej dłoni i po raz pierwszy wygląda na starego. „Trzy okruchy. Tak mówiła przepowiednia: jeden w garści bandyty, jeden w trumnie wieszczki, jeden w kamieniu Kowalskiej Góry. Zanieś je do kuźni, chłopcze. I wykuj ostrze, zanim Kaldras się obudzi.”',
    next: 'forge',
  },
  forge: {
    name: 'Starożytne Ostrze',
    giver: 'eryn',
    level: 4,
    intro:
      'Borys kowal rozkłada na anvilu trzy okruchy. „Starożytny metal jest w kamieniołomie, na południu. Wykuję ci klingę, ale musisz sam przynieść wszystko. Trzy okruchy, dwa kawałki metalu i cierpliwość.”',
    objectives: [
      { id: 'metal', type: 'collect', item: 'ancient_metal', target: 2, text: 'Zdobądź starożytny metal (2)' },
      { id: 'shards', type: 'collect', item: 'shard_dawn', target: 3, text: 'Zdobądź trzy okruchy Ostrza Świtu (3)' },
      { id: 'craft', type: 'own', item: 'dawn_blade', target: 1, text: 'Wykuj Klingę Świtu w kuźni' },
    ],
    reward: { gold: 200, xp: 420, items: [['might_elixir', 2]] },
    outro:
      'Ostrze wychodzi z ognia białe jak poranek. Borys cofa się o krok. „Nie dotykałem czegoś takiego od trzydziestu lat. Idź. Wrota na południu czekają, a Kaldras nie będzie czekał wiecznie.”',
    next: 'boss',
  },
  boss: {
    name: 'Mgliste Wrota',
    giver: 'eryn',
    level: 5,
    intro:
      'Eryn stoi na skraju wioski i patrzy na południe, gdzie nad ruinami zbiera się mgła. „Kaldras był kiedyś strażnikiem tych wrót. Potem coś po drugiej stronie zaczęło mu odpowiadać. Zamknij je. Na zawsze.”',
    objectives: [
      { id: 'kaldras', type: 'kill', enemy: 'kaldras', target: 1, text: 'Pokonaj Kaldrasa w Mglistych Wrotach' },
    ],
    reward: { gold: 500, xp: 1000, items: [] },
    outro: 'Mgła opada. Po raz pierwszy od trzydziestu lat Wilcza Dolina widzi świt.',
    final: true,
  },
};

export const QUEST_ORDER = ['wolves', 'grain', 'barrow', 'forge', 'boss'];

export const LORE = [
  'Trzydzieści lat temu Kaldras zamknął Mgliste Wrota od zewnątrz i został po ich stronie.',
  'Ostrze Świtu wykuto ze spadającej gwiazdy. Rozpadło się na trzy okruchy, gdy jego właściciel zginął.',
  'Wieszczka z Kurhanu nie jest duchem — to przekleństwo, które zostało po kobiecie, co zbyt długo patrzyła w mgłę.',
  'Rudy Wilk sprzedawał zboże na południe. Ale to nie głód był jego prawdziwym interesem.',
  'Borys kowal pracował przy starożytnej kuźni, zanim spaliła mu się ręka. Nie lubi o tym mówić.',
  'Wilki z Doliny nie atakują bez powodu. Ktoś je niepokoi.',
];
