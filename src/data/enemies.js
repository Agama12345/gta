// Definicje przeciwników i miejsc ich pojawiania się.

export const ENEMY_TYPES = {
  bandit: {
    name: 'Bandyta z Wilczej Bandy',
    model: 'humanoid',
    visual: { tunic: '#6a3f2c', pants: '#3a3128', cloak: '#4a2f24', hood: '#3d2a20', skin: '#c99a70', hair: '#2b1d13', bulk: 1 },
    level: 2, hp: 62, damage: 9, speed: 3.5, aggro: 16, attackRange: 2.3, attackCooldown: 1.4,
    xp: 28, gold: [4, 13], behavior: 'melee', weapon: 'iron', radius: 0.5,
    loot: [{ id: 'bread', chance: 0.25 }, { id: 'health_potion', chance: 0.1 }, { id: 'iron_ore', chance: 0.12 }],
  },
  bandit_archer: {
    name: 'Łucznik z Wilczej Bandy',
    model: 'humanoid',
    visual: { tunic: '#4e4230', pants: '#38322a', hood: '#3a3226', skin: '#c99a70', hair: '#2b1d13', bulk: 0.95 },
    level: 3, hp: 46, damage: 12, speed: 3.0, aggro: 21, attackRange: 17, preferredRange: 11, attackCooldown: 2.1,
    xp: 34, gold: [6, 16], behavior: 'ranged', weapon: 'bow', radius: 0.45,
    loot: [{ id: 'herbs', chance: 0.25 }, { id: 'bread', chance: 0.2 }],
  },
  bandit_leader: {
    name: 'Rudy Wilk',
    model: 'humanoid', elite: true,
    visual: { tunic: '#5d2e22', pants: '#3a3128', cloak: '#7a2f2f', skin: '#c08858', hair: '#a2542a', beard: true, scar: true, bulk: 1.16, armor: '#7a6a4a' },
    level: 4, hp: 260, damage: 16, speed: 3.7, aggro: 20, attackRange: 2.6, attackCooldown: 1.2,
    xp: 150, gold: [45, 70], behavior: 'melee', weapon: 'axe', radius: 0.62,
    loot: [{ id: 'wolf_amulet', chance: 1 }, { id: 'health_potion', chance: 1 }, { id: 'shard_dawn', chance: 1 }],
    bossBanner: 'Przywódca bandy',
  },
  wolf: {
    name: 'Wilk z Doliny',
    model: 'wolf',
    visual: { fur: '#4d473f' },
    level: 1, hp: 40, damage: 7, speed: 4.9, aggro: 18, attackRange: 2.0, attackCooldown: 1.25,
    xp: 20, gold: [0, 2], behavior: 'beast', radius: 0.55,
    loot: [{ id: 'wolf_pelt', chance: 0.85 }, { id: 'wolf_meat', chance: 0.45 }],
  },
  skeleton: {
    name: 'Strażnik Kurhanu',
    model: 'skeleton',
    visual: {},
    level: 3, hp: 84, damage: 13, speed: 3.0, aggro: 15, attackRange: 2.4, attackCooldown: 1.5,
    xp: 48, gold: [6, 18], behavior: 'melee', radius: 0.5,
    loot: [{ id: 'iron_ore', chance: 0.35 }, { id: 'ancient_metal', chance: 0.18 }, { id: 'health_potion', chance: 0.12 }],
  },
  wraith: {
    name: 'Wieszczka z Kurhanu',
    model: 'wraith', elite: true, nightOnly: true,
    visual: {},
    level: 5, hp: 210, damage: 15, speed: 3.3, aggro: 22, attackRange: 13, preferredRange: 8, attackCooldown: 2.0,
    xp: 170, gold: [30, 55], behavior: 'ranged', radius: 0.6,
    loot: [{ id: 'shard_dawn', chance: 1 }, { id: 'crystal_mana', chance: 1 }, { id: 'seer_bone', chance: 1 }],
    bossBanner: 'Szept Kurhanu',
  },
  kaldras: {
    name: 'Kaldras, Zwiastun Mroku',
    model: 'kaldras', boss: true,
    visual: {},
    level: 8, hp: 1100, damage: 26, speed: 3.5, aggro: 30, attackRange: 3.2, attackCooldown: 1.6,
    xp: 800, gold: [200, 300], behavior: 'boss', radius: 0.9,
    loot: [{ id: 'watcher_plate', chance: 1 }, { id: 'crystal_mana', chance: 1 }, { id: 'ancient_metal', chance: 1 }],
    bossBanner: 'Zwiastun Mroku',
  },
};

// Punkty pojawiania się — [x, z, typ, poziom]
export const SPAWNS = [
  // wilki wokół wioski
  [-22, 18, 'wolf', 1], [-30, 30, 'wolf', 1], [22, 22, 'wolf', 1], [14, 46, 'wolf', 2],
  [-14, 54, 'wolf', 1], [34, 34, 'wolf', 1], [-38, 12, 'wolf', 2],
  // obozowisko bandytów
  [-48, -12, 'bandit', 2], [-43, -18, 'bandit', 2], [-54, -20, 'bandit', 3],
  [-44, -4, 'bandit', 2], [-58, -8, 'bandit', 3], [-50, -24, 'bandit_leader', 4],
  [-40, -26, 'bandit_archer', 3], [-56, -30, 'bandit_archer', 3],
  // szlaki
  [16, -8, 'wolf', 2], [28, -22, 'wolf', 3], [-12, -30, 'bandit', 3],
  // kurhan
  [46, -24, 'skeleton', 3], [40, -38, 'skeleton', 3], [52, -46, 'skeleton', 4],
  [40, -50, 'skeleton', 4],
  [46, -42, 'wraith', 5],
  // Mgliste Wrota
  [-6, -38, 'skeleton', 4], [-26, -40, 'skeleton', 4], [-30, -62, 'skeleton', 5],
  [-2, -64, 'skeleton', 5],
  [-16, -52, 'kaldras', 8],
];

export const REGION_BY_POINT = (x, z) => {
  if (Math.hypot(x - 0, z - 32) < 32) return 'village';
  if (Math.hypot(x + 48, z + 12) < 24) return 'bandits';
  if (Math.hypot(x - 46, z + 42) < 22) return 'barrow';
  if (Math.hypot(x + 16, z + 52) < 28) return 'ruins';
  if (Math.hypot(x - 44, z - 4) < 20) return 'forge';
  return 'wild';
};
