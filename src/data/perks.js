// Drzewko rozwoju — trzy ścieżki: Wojownik, Łowca, Mag.
// Każda ranga daje kumulujący się efekt; suma trafia do `Player.mods`.

export const PERK_TREES = [
  { id: 'war', name: 'Wojownik', glyph: '⚔', color: '#d1795a', desc: 'Siła ramienia, ciężki pancerz i ciosy, po których ziemia drży.' },
  { id: 'hunt', name: 'Łowca', glyph: '🏹', color: '#8fbf72', desc: 'Cisza, szybkość i miejsce, w które trafia nóż.' },
  { id: 'mag', name: 'Mag', glyph: '✧', color: '#7fb6d9', desc: 'Mana, runy i światło, które leczy własną dłoń.' },
];

/**
 * effect: { klucz: wartość_na_rangę } — wszystko mnożnikowo/dodatkowo,
 * zgodnie z opisem w `src/systems/perks.js`.
 */
export const PERKS = {
  // ------------------------------------------------ WOJOWNIK
  iron_skin: {
    tree: 'war', name: 'Żelazna skóra', glyph: '🛡', maxRank: 3, req: null,
    effect: { armor: 0.09 },
    desc: 'Pancerz +9% za rangę.',
  },
  might: {
    tree: 'war', name: 'Potęga ramienia', glyph: '💪', maxRank: 4, req: null,
    effect: { damage: 0.06 },
    desc: 'Obrażenia broni +6% za rangę.',
  },
  sword_master: {
    tree: 'war', name: 'Mistrzostwo miecza', glyph: '🗡', maxRank: 3, req: { perk: 'might', rank: 1 },
    effect: { crit: 0.035 },
    desc: 'Szansa na cios krytyczny +3,5% za rangę.',
  },
  berserk: {
    tree: 'war', name: 'Wściekłość', glyph: '🔥', maxRank: 2, req: { perk: 'iron_skin', rank: 1 },
    effect: { lowHpDamage: 0.18 },
    desc: 'Poniżej 35% życia zadajesz +18% obrażeń za rangę.',
  },
  finisher: {
    tree: 'war', name: 'Cios kończący', glyph: '🌀', maxRank: 2, req: { perk: 'sword_master', rank: 1 },
    effect: { finisher: 0.35 },
    desc: 'Trzeci cios kombinacji bije +35% mocniej i odrzuca wrogów.',
  },
  unbroken: {
    tree: 'war', name: 'Nieustępliwość', glyph: '❤', maxRank: 3, req: { perk: 'iron_skin', rank: 2 },
    effect: { hp: 0.09 },
    desc: 'Maksymalne życie +9% za rangę.',
  },

  // ------------------------------------------------ ŁOWCA
  sneak: {
    tree: 'hunt', name: 'Cichy krok', glyph: '👣', maxRank: 3, req: null,
    effect: { stealth: -0.13 },
    desc: 'Wrogowie zauważają cię o 13% później (mnożnik zasięgu).',
  },
  backstab: {
    tree: 'hunt', name: 'Cios w plecy', glyph: '🔪', maxRank: 3, req: { perk: 'sneak', rank: 1 },
    effect: { backstab: 0.7 },
    desc: 'Atak na nieświadomego wroga zadaje +70% obrażeń za rangę.',
  },
  quick_hands: {
    tree: 'hunt', name: 'Szybkie ręce', glyph: '⚡', maxRank: 2, req: null,
    effect: { staminaCost: -0.16, attackSpeed: 0.06 },
    desc: 'Ataki i uniki kosztują o 16% mniej kondycji; broń szybsza o 6%.',
  },
  scavenger: {
    tree: 'hunt', name: 'Zbieracz', glyph: '💰', maxRank: 2, req: { perk: 'quick_hands', rank: 1 },
    effect: { loot: 0.25 },
    desc: 'Więcej złota z pokonanych wrogów (+25% za rangę).',
  },
  hawk_eye: {
    tree: 'hunt', name: 'Sokole oko', glyph: '👁', maxRank: 2, req: { perk: 'backstab', rank: 1 },
    effect: { crit: 0.04 },
    desc: 'Szansa na cios krytyczny +4% za rangę.',
  },
  fleet: {
    tree: 'hunt', name: 'Zwinność', glyph: '🌪', maxRank: 2, req: { perk: 'quick_hands', rank: 1 },
    effect: { speed: 0.05, dodge: 0.12 },
    desc: 'Szybkość ruchu +5%, dłuższy unik (+12%).',
  },

  // ------------------------------------------------ MAG
  wellspring: {
    tree: 'mag', name: 'Źródło many', glyph: '💧', maxRank: 3, req: null,
    effect: { mana: 0.18 },
    desc: 'Maksymalna mana +18% za rangę.',
  },
  rune_power: {
    tree: 'mag', name: 'Moc run', glyph: '✶', maxRank: 4, req: null,
    effect: { spellPower: 0.09 },
    desc: 'Moc zaklęć +9% za rangę.',
  },
  attunement: {
    tree: 'mag', name: 'Zestrojenie', glyph: '♨', maxRank: 2, req: { perk: 'wellspring', rank: 1 },
    effect: { manaRegen: 0.9 },
    desc: 'Mana regeneruje się szybciej (+0,9/s za rangę).',
  },
  ward: {
    tree: 'mag', name: 'Bariera', glyph: '◎', maxRank: 2, req: { perk: 'rune_power', rank: 1 },
    effect: { ward: 1.6, wardTime: 0.6 },
    desc: 'Każde zaklęcie daje osłonę na dłużej (+1,6 s za rangę).',
  },
  resistance: {
    tree: 'mag', name: 'Odporność', glyph: '◇', maxRank: 2, req: { perk: 'attunement', rank: 1 },
    effect: { resist: 0.12 },
    desc: 'Obrażenia magiczne i od klątw -12% za rangę.',
  },
  dawn_grace: {
    tree: 'mag', name: 'Łaska świtu', glyph: '☀', maxRank: 2, req: { perk: 'rune_power', rank: 2 },
    effect: { healOnKill: 0.05 },
    desc: 'Po pokonaniu wroga odzyskujesz 5% życia za rangę.',
  },
};

export const PERK_IDS = Object.keys(PERKS);

/** Czy gracz może wykupić kolejną rangę (wymagania + punkty). */
export function canRank(perks, id) {
  const def = PERKS[id];
  if (!def) return false;
  const have = perks[id] ?? 0;
  if (have >= def.maxRank) return false;
  if (def.req && (perks[def.req.perk] ?? 0) < def.req.rank) return false;
  return true;
}

export function perksByTree(tree) {
  return PERK_IDS.filter((id) => PERKS[id].tree === tree);
}
