// System rozwoju bohatera: rangi perków + sumowanie ich efektów.
// Trzymamy to osobno od `Player`, żeby zapis gry i testy były proste.

import { PERKS, PERK_IDS, PERK_TREES, canRank, perksByTree } from '../data/perks.js';

export const BASE_MODS = {
  armor: 0,
  damage: 0,
  crit: 0,
  lowHpDamage: 0,
  finisher: 0,
  hp: 0,
  stealth: 0,
  backstab: 0.6, // bazowy cios w plecy: +60% obrażeń
  staminaCost: 0,
  attackSpeed: 0,
  loot: 0,
  speed: 0,
  dodge: 0,
  mana: 0,
  spellPower: 0,
  manaRegen: 0,
  ward: 0,
  wardTime: 0,
  resist: 0,
  healOnKill: 0,
};

export class Perks {
  constructor(player) {
    this.player = player;
    this.ranks = {};
    this.points = 1; // jedna ranga na start, żeby system był widoczny od razu
    this.spent = 0;
    this._mods = { ...BASE_MODS };
  }

  rank(id) {
    return this.ranks[id] ?? 0;
  }

  totalRanks() {
    return PERK_IDS.reduce((sum, id) => sum + this.rank(id), 0);
  }

  canBuy(id) {
    return this.points > 0 && canRank(this.ranks, id);
  }

  buy(id) {
    if (!this.canBuy(id)) return false;
    this.ranks[id] = this.rank(id) + 1;
    this.points -= 1;
    this.spent += 1;
    this.player.recalc();
    return true;
  }

  /** Zwrot rang (do testów / resetu przy nowej grze). */
  reset() {
    this.ranks = {};
    this.points = 1;
    this.spent = 0;
    this.player.recalc();
  }

  addPoints(n = 1) {
    this.points += n;
    this.player.game?.ui?.toast?.(
      `Punkt rozwoju: ${n}. Otwórz rozwój klawiszem P.`,
      'xp'
    );
  }

  /** Suma efektów wszystkich rang (przeliczana leniwie). */
  get mods() {
    return this._mods;
  }

  recalc() {
    const mods = { ...BASE_MODS };
    for (const id of PERK_IDS) {
      const rank = this.rank(id);
      if (!rank) continue;
      const def = PERKS[id];
      for (const [key, value] of Object.entries(def.effect)) {
        mods[key] = (mods[key] ?? 0) + value * rank;
      }
    }
    this._mods = mods;
    return mods;
  }

  /** Opis stanu drzewka dla interfejsu. */
  treeState() {
    return PERK_TREES.map((tree) => ({
      ...tree,
      perks: perksByTree(tree.id).map((id) => ({
        id,
        ...PERKS[id],
        rank: this.rank(id),
        canBuy: this.canBuy(id),
      })),
    }));
  }

  serialize() {
    return { ranks: { ...this.ranks }, points: this.points, spent: this.spent };
  }

  load(data) {
    if (!data) return;
    this.ranks = {};
    for (const [id, rank] of Object.entries(data.ranks ?? {})) {
      const def = PERKS[id];
      if (!def) continue;
      this.ranks[id] = Math.max(0, Math.min(def.maxRank, Math.floor(rank)));
    }
    this.points = Math.max(0, Math.floor(data.points ?? 0));
    this.spent = Math.max(0, Math.floor(data.spent ?? this.totalRanks()));
    this.player.recalc();
  }
}
