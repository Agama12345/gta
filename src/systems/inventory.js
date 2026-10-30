import { ITEMS, EQUIP_SLOTS } from '../data/items.js';

export class Inventory {
  constructor() {
    this.gold = 0;
    this.items = new Map();
    this.equipped = { weapon: null, armor: null, helm: null, trinket: null };
    this.capacity = 24;
  }

  count(id) {
    return this.items.get(id) ?? 0;
  }

  has(id, qty = 1) {
    return this.count(id) >= qty;
  }

  isFull() {
    return this.items.size >= this.capacity;
  }

  add(id, qty = 1) {
    const def = ITEMS[id];
    if (!def) return false;
    if (def.type !== 'consumable' && def.type !== 'material' && this.items.has(id) === false && this.isFull()) {
      return false;
    }
    const max = def.stack ?? 1;
    const cur = this.items.get(id) ?? 0;
    const next = Math.min(cur + qty, Math.max(max, cur + qty));
    this.items.set(id, next);
    return true;
  }

  remove(id, qty = 1) {
    const cur = this.count(id);
    if (cur < qty) return false;
    if (cur - qty <= 0) this.items.delete(id);
    else this.items.set(id, cur - qty);
    return true;
  }

  equip(id) {
    const def = ITEMS[id];
    if (!def?.slot) return false;
    if (!this.has(id)) return false;
    const slot = def.slot;
    const prev = this.equipped[slot];
    this.remove(id, 1);
    this.equipped[slot] = id;
    if (prev) this.add(prev, 1);
    return true;
  }

  unequip(slot) {
    const id = this.equipped[slot];
    if (!id) return false;
    if (this.isFull()) return false;
    this.equipped[slot] = null;
    this.add(id, 1);
    return true;
  }

  isEquipped(id) {
    return Object.values(this.equipped).includes(id);
  }

  equipStats() {
    const total = { attack: 0, armor: 0, hp: 0, mana: 0, crit: 0, speed: 0 };
    for (const slot of EQUIP_SLOTS) {
      const id = this.equipped[slot.id];
      if (!id) continue;
      const stats = ITEMS[id]?.stats;
      if (!stats) continue;
      for (const [k, v] of Object.entries(stats)) total[k] = (total[k] ?? 0) + v;
    }
    return total;
  }

  list() {
    return [...this.items.entries()].map(([id, qty]) => ({ id, qty, def: ITEMS[id] })).filter((e) => e.def);
  }

  consumables() {
    return this.list().filter((e) => e.def.type === 'consumable');
  }

  serialize() {
    return {
      gold: this.gold,
      items: [...this.items.entries()],
      equipped: { ...this.equipped },
    };
  }

  load(data) {
    if (!data) return;
    this.gold = data.gold ?? 0;
    this.items = new Map(data.items ?? []);
    this.equipped = { weapon: null, armor: null, helm: null, trinket: null, ...(data.equipped ?? {}) };
  }
}
