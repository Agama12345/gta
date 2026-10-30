// Definicje przeciwników i miejsc ich pojawiania się na dużej mapie.

export const ENEMY_TYPES = {
  // ---------- Wilki i bestie ----------
  wolf: {
    name: 'Wilk z Doliny', model: 'wolf',
    level: 1, hp: 40, damage: 7, speed: 4.9, aggro: 20, attackRange: 2.1, attackCooldown: 1.25,
    xp: 20, gold: [0, 2], behavior: 'beast', radius: 0.55, scale: 1,
    loot: [{ id: 'wolf_pelt', chance: 0.85 }, { id: 'wolf_meat', chance: 0.45 }],
  },
  wolf_alpha: {
    name: 'Wilk Alfa', model: 'wolf', elite: true,
    level: 5, hp: 190, damage: 16, speed: 5.2, aggro: 26, attackRange: 2.5, attackCooldown: 1.1,
    xp: 120, gold: [10, 24], behavior: 'beast', radius: 0.7, scale: 1.45,
    loot: [{ id: 'wolf_pelt', chance: 1 }, { id: 'wolf_amulet', chance: 0.25 }, { id: 'wolf_meat', chance: 0.6 }],
    bossBanner: 'Przywódca stada',
  },
  bog_lurker: {
    name: 'Bagniak', model: 'lurker',
    level: 4, hp: 130, damage: 14, speed: 2.6, aggro: 18, attackRange: 2.6, attackCooldown: 1.7,
    xp: 70, gold: [4, 14], behavior: 'melee', radius: 0.8, scale: 1.1,
    loot: [{ id: 'herbs', chance: 0.5 }, { id: 'crystal_mana', chance: 0.15 }, { id: 'health_potion', chance: 0.15 }],
  },

  // ---------- Ludzie ----------
  bandit: {
    name: 'Bandyta z Wilczej Bandy', model: 'humanoid',
    visual: { tunic: '#6a3f2c', pants: '#3a3128', cloak: '#4a2f24', hood: '#3d2a20', skin: '#c99a70', hair: '#2b1d13', bulk: 1 },
    level: 2, hp: 62, damage: 9, speed: 3.5, aggro: 18, attackRange: 2.3, attackCooldown: 1.4,
    xp: 28, gold: [4, 13], behavior: 'melee', weapon: 'iron', radius: 0.5,
    loot: [{ id: 'bread', chance: 0.25 }, { id: 'health_potion', chance: 0.1 }, { id: 'iron_ore', chance: 0.12 }],
  },
  bandit_archer: {
    name: 'Łucznik z Wilczej Bandy', model: 'humanoid',
    visual: { tunic: '#4e4230', pants: '#38322a', hood: '#3a3226', skin: '#c99a70', hair: '#2b1d13', bulk: 0.95 },
    level: 3, hp: 46, damage: 12, speed: 3.0, aggro: 24, attackRange: 19, preferredRange: 12, attackCooldown: 2.1,
    xp: 34, gold: [6, 16], behavior: 'ranged', weapon: 'bow', radius: 0.45,
    loot: [{ id: 'herbs', chance: 0.25 }, { id: 'bread', chance: 0.2 }],
  },
  bandit_veteran: {
    name: 'Weteran Wilczej Bandy', model: 'humanoid', elite: true,
    visual: { tunic: '#503529', pants: '#332c24', cloak: '#5a2f24', skin: '#bd8f68', hair: '#2b1d13', beard: true, armor: '#6a5f4c', bulk: 1.14 },
    level: 5, hp: 210, damage: 19, speed: 3.6, aggro: 22, attackRange: 2.7, attackCooldown: 1.2,
    xp: 130, gold: [20, 40], behavior: 'melee', weapon: 'axe', radius: 0.6,
    loot: [{ id: 'iron_axe', chance: 0.2 }, { id: 'iron_ore', chance: 0.5 }, { id: 'might_elixir', chance: 0.2 }],
    bossBanner: 'Zastępca Rudego Wilka',
  },
  bandit_leader: {
    name: 'Rudy Wilk', model: 'humanoid', elite: true,
    visual: { tunic: '#5d2e22', pants: '#3a3128', cloak: '#7a2f2f', skin: '#c08858', hair: '#a2542a', beard: true, scar: true, bulk: 1.16, armor: '#7a6a4a' },
    level: 6, hp: 300, damage: 17, speed: 3.7, aggro: 22, attackRange: 2.6, attackCooldown: 1.2,
    xp: 220, gold: [55, 85], behavior: 'melee', weapon: 'axe', radius: 0.62,
    loot: [{ id: 'wolf_amulet', chance: 1 }, { id: 'health_potion', chance: 1 }, { id: 'shard_dawn', chance: 1 }],
    bossBanner: 'Przywódca bandy',
  },

  // ---------- Kurhan, ruiny, warownia ----------
  skeleton: {
    name: 'Strażnik Kurhanu', model: 'skeleton',
    level: 3, hp: 84, damage: 13, speed: 3.0, aggro: 16, attackRange: 2.4, attackCooldown: 1.5,
    xp: 48, gold: [6, 18], behavior: 'melee', radius: 0.5,
    loot: [{ id: 'iron_ore', chance: 0.35 }, { id: 'ancient_metal', chance: 0.18 }, { id: 'health_potion', chance: 0.12 }],
  },
  mine_guard: {
    name: 'Zapomniany Górnik', model: 'skeleton', elite: true,
    level: 5, hp: 190, damage: 18, speed: 3.2, aggro: 17, attackRange: 2.6, attackCooldown: 1.45,
    xp: 120, gold: [12, 26], behavior: 'melee', radius: 0.55, scale: 1.12,
    loot: [{ id: 'iron_ore', chance: 0.7 }, { id: 'ancient_metal', chance: 0.3 }],
  },
  castle_wraith: {
    name: 'Zjawisko z Warowni', model: 'wraith', nightOnly: true,
    visual: { tint: '#c08fa8' },
    level: 6, hp: 150, damage: 15, speed: 3.4, aggro: 24, attackRange: 14, preferredRange: 9, attackCooldown: 2.0,
    xp: 140, gold: [10, 24], behavior: 'ranged', radius: 0.6,
    loot: [{ id: 'crystal_mana', chance: 0.6 }, { id: 'seer_bone', chance: 0.1 }],
  },
  wraith: {
    name: 'Wieszczka z Kurhanu', model: 'wraith', elite: true, nightOnly: true,
    level: 5, hp: 240, damage: 15, speed: 3.3, aggro: 24, attackRange: 14, preferredRange: 9, attackCooldown: 2.0,
    xp: 180, gold: [35, 60], behavior: 'ranged', radius: 0.6,
    loot: [{ id: 'shard_dawn', chance: 1 }, { id: 'crystal_mana', chance: 1 }, { id: 'seer_bone', chance: 1 }],
    bossBanner: 'Szept Kurhanu',
  },

  // ---------- Golemy ----------
  stone_golem: {
    name: 'Kamienny Strażnik', model: 'golem', elite: true,
    level: 6, hp: 340, damage: 24, speed: 2.4, aggro: 20, attackRange: 3.4, attackCooldown: 2.2,
    xp: 200, gold: [30, 60], behavior: 'melee', radius: 0.95, scale: 1,
    loot: [{ id: 'ancient_metal', chance: 0.5 }, { id: 'iron_ore', chance: 0.8 }, { id: 'crystal_mana', chance: 0.3 }],
    bossBanner: 'Strażnik kręgu',
  },

  // ---------- Finał ----------
  kaldras: {
    name: 'Kaldras, Zwiastun Mroku', model: 'kaldras', boss: true,
    level: 9, hp: 1500, damage: 28, speed: 3.5, aggro: 34, attackRange: 3.4, attackCooldown: 1.6,
    xp: 900, gold: [250, 350], behavior: 'boss', radius: 0.9,
    loot: [{ id: 'watcher_plate', chance: 1 }, { id: 'crystal_mana', chance: 1 }, { id: 'ancient_metal', chance: 1 }],
    bossBanner: 'Zwiastun Mroku',
  },
};

import { WORLD_SCALE as WS } from '../world/terrain.js';

// Punkty pojawiania się — [x, z, typ, poziom] (metry autorskie, przeliczane niżej)
const RAW_SPAWNS = [
  // okolice wioski (pierwsze kroki)
  [-78, 300, 'wolf', 1], [-120, 250, 'wolf', 1], [96, 270, 'wolf', 1], [60, 440, 'wolf', 2],
  [-60, 470, 'wolf', 1], [130, 400, 'wolf', 2], [-150, 400, 'wolf', 2], [40, 250, 'wolf', 2],
  [-40, 210, 'wolf', 2], [80, 190, 'bandit', 2],

  // Kotlina Kupców
  [230, 300, 'wolf', 3], [270, 220, 'bandit', 3], [130, 300, 'bandit_archer', 3], [210, 330, 'wolf', 3],

  // obozowisko bandytów
  [-420, -60, 'bandit', 3], [-380, -110, 'bandit', 3], [-460, -140, 'bandit', 4],
  [-370, -20, 'bandit', 3], [-490, -40, 'bandit', 4], [-430, -160, 'bandit_leader', 6],
  [-360, -170, 'bandit_archer', 4], [-500, -190, 'bandit_archer', 4],
  [-440, 10, 'bandit_veteran', 5], [-330, -80, 'bandit_veteran', 5],

  // lasy i dzicz
  [180, 60, 'wolf', 3], [150, -40, 'wolf_alpha', 5], [320, 220, 'wolf', 4],
  [-280, 120, 'wolf', 3], [-250, 480, 'wolf', 3], [380, 470, 'wolf_alpha', 5],
  [-600, 60, 'wolf', 4], [-560, 520, 'wolf', 4], [520, 420, 'wolf', 4],
  [250, -420, 'bandit', 4],

  // kamieniołom
  [-330, 280, 'bandit', 4], [-290, 360, 'bandit', 4], [-380, 340, 'stone_golem', 6],

  // kurhan i krypta
  [430, -260, 'skeleton', 4], [380, -370, 'skeleton', 4], [480, -380, 'skeleton', 5],
  [400, -420, 'skeleton', 5], [430, -330, 'wraith', 5], [470, -290, 'skeleton', 5],

  // warownia popiołu
  [-40, -190, 'skeleton', 5], [-70, -250, 'skeleton', 5], [10, -260, 'skeleton', 6],
  [-30, -230, 'castle_wraith', 6], [-60, -180, 'castle_wraith', 6], [-40, -290, 'stone_golem', 6],

  // przełęcz Kalmoru
  [250, -150, 'bandit', 5], [230, -110, 'bandit_archer', 5], [290, -190, 'bandit_veteran', 6],
  [210, -170, 'bandit', 5], [300, -120, 'bandit_archer', 5],

  // kopalnia
  [205, -430, 'mine_guard', 5], [170, -400, 'mine_guard', 5], [240, -460, 'mine_guard', 6],
  [205, -470, 'mine_guard', 6],

  // bagno
  [-200, -430, 'bog_lurker', 4], [-240, -390, 'bog_lurker', 4], [-160, -470, 'bog_lurker', 5],
  [-250, -460, 'bog_lurker', 5], [-140, -390, 'wraith', 5], [-300, -480, 'bog_lurker', 5],

  // jezioro
  [-500, 330, 'bog_lurker', 4], [-450, 380, 'wolf', 4], [-560, 260, 'bog_lurker', 5],

  // pustelnia
  [-560, -200, 'wolf', 4], [-600, -260, 'wolf_alpha', 6], [-520, -150, 'wolf', 4],

  // kamienny krąg
  [470, 250, 'stone_golem', 6], [440, 210, 'stone_golem', 6], [510, 300, 'wolf', 5],

  // Mgliste Wrota
  [-150, -500, 'skeleton', 6], [-110, -580, 'skeleton', 6], [-200, -600, 'skeleton', 7],
  [-90, -540, 'skeleton', 6], [-150, -560, 'kaldras', 9],

  // dzicz na skraju mapy
  [620, 60, 'wolf_alpha', 6], [-660, 380, 'wolf_alpha', 6], [560, -480, 'skeleton', 7],
  [-620, -420, 'bog_lurker', 6],
];

export const SPAWNS = RAW_SPAWNS.map(([x, z, t, lv]) => [x * WS, z * WS, t, lv]);

export const REGION_BY_POINT = (x, z) => {
  const W = WS;
  if (Math.hypot(x, z - 360 * W) < 70 * W) return 'village';
  if (Math.hypot(x - 175 * W, z - 250 * W) < 44 * W) return 'trading';
  if (Math.hypot(x + 420 * W, z + 60 * W) < 40 * W) return 'bandits';
  if (Math.hypot(x - 430 * W, z + 330 * W) < 44 * W) return 'barrow';
  if (Math.hypot(x + 150 * W, z + 560 * W) < 50 * W) return 'ruins';
  if (Math.hypot(x - 330 * W, z - 40 * W) < 40 * W) return 'forge';
  if (Math.hypot(x + 330 * W, z - 330 * W) < 40 * W) return 'quarry';
  if (Math.hypot(x + 40 * W, z + 220 * W) < 46 * W) return 'castle';
  if (Math.hypot(x + 200 * W, z + 430 * W) < 90 * W) return 'swamp';
  if (Math.hypot(x - 250 * W, z + 150 * W) < 46 * W) return 'pass';
  if (Math.hypot(x - 205 * W, z + 430 * W) < 35 * W) return 'mine';
  if (Math.hypot(x - 470 * W, z - 250 * W) < 35 * W) return 'circle';
  if (Math.hypot(x + 560 * W, z + 200 * W) < 36 * W) return 'hermit';
  if (Math.hypot(x + 500 * W, z - 330 * W) < 100 * W) return 'lake';
  return 'wild';
};
