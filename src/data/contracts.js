// Zlecenia z tablicy ogłoszeń — poboczne zadania, które można brać równolegle
// z głównym wątkiem. Każde ma własne cele i nagrodę, a po wykonaniu wraca na tablicę
// po pewnym czasie (odnawialne), żeby świat nie „skończył się” po głównym wątku.

export const CONTRACTS = {
  wolf_cull: {
    name: 'Wilcze łby',
    giver: 'Rada Wioski',
    level: 1,
    repeat: 240,
    desc: 'Wilki podchodzą pod zagrody. Rada płaci od łba — bez pytań.',
    objectives: [{ id: 'kill', type: 'kill', enemy: 'wolf', target: 4, text: 'Zabij wilki (0/4)' }],
    reward: { gold: 70, xp: 90, items: [['bread', 1]] },
  },
  herb_run: {
    name: 'Zapas zielarki',
    giver: 'Marena Zielarka',
    level: 1,
    repeat: 300,
    desc: 'Marena potrzebuje wiązki ziół na okłady. Zbiera się je na łąkach i skrajach lasu.',
    objectives: [{ id: 'herbs', type: 'collect', item: 'herbs', target: 5, text: 'Zbierz zioła (0/5)' }],
    reward: { gold: 45, xp: 70, items: [['health_potion', 2]] },
  },
  bone_patrol: {
    name: 'Patrol w kurhanie',
    giver: 'Straż Wioski',
    level: 3,
    repeat: 360,
    desc: 'Szkielety wychodzą z kurhanu i podchodzą pod trakt. Przerzedź je, zanim dotrą do wioski.',
    objectives: [{ id: 'kill', type: 'kill', enemy: 'skeleton', target: 3, text: 'Pokonaj szkielety (0/3)' }],
    reward: { gold: 120, xp: 180, items: [['mana_potion', 2]] },
  },
  ore_order: {
    name: 'Zamówienie kowala',
    giver: 'Borys Kowal',
    level: 2,
    repeat: 300,
    desc: 'Borys potrzebuje rudy. Każdy wozowy ładunek się liczy — zwłaszcza przed zimą.',
    objectives: [{ id: 'ore', type: 'collect', item: 'iron_ore', target: 4, text: 'Dostarcz rudę żelaza (0/4)' }],
    reward: { gold: 95, xp: 140, items: [['iron_axe', 1]] },
  },
  bandit_heads: {
    name: 'Bandyckie głowy',
    giver: 'Rada Wioski',
    level: 3,
    repeat: 420,
    desc: 'Banda z rozdroża znów napada na kupców. Rada płaci za każdego bandytę.',
    objectives: [{ id: 'kill', type: 'kill', enemy: 'bandit', target: 3, text: 'Pokonaj bandytów (0/3)' }],
    reward: { gold: 160, xp: 220, items: [['leather_hood', 1]] },
  },
  ghost_watch: {
    name: 'Nocna wachta',
    giver: 'Straż Wioski',
    level: 4,
    repeat: 480,
    desc: 'Zjawiska chodzą po ruinach po zmroku. Ktoś musi je rozproszyć.',
    objectives: [{ id: 'kill', type: 'kill', enemy: 'wraith', target: 2, text: 'Rozprosz zjawiska (0/2)' }],
    reward: { gold: 180, xp: 260, items: [['crystal_mana', 1]] },
  },
};

export const CONTRACT_IDS = Object.keys(CONTRACTS);
