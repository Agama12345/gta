// Tablica zleceń — poboczne kontrakty równoległe do głównego wątku.
// Gracz może mieć naraz trzy zlecenia; po oddaniu wpada złoto i PD,
// a zlecenie wraca na tablicę po czasie (`repeat`, w sekundach gry).

import { CONTRACTS, CONTRACT_IDS } from '../data/contracts.js';
import { ITEMS } from '../data/items.js';

const MAX_ACTIVE = 3;

export class Contracts {
  constructor(game) {
    this.game = game;
    this.active = [];        // [{ id, acceptedAt }]
    this.cooldowns = {};     // id -> sekundy do odświeżenia
    this.completedCount = 0;
    this.time = 0;
    this.changed = true;
  }

  isActive(id) {
    return this.active.some((c) => c.id === id);
  }

  isOnCooldown(id) {
    return (this.cooldowns[id] ?? 0) > 0;
  }

  canAccept(id) {
    const def = CONTRACTS[id];
    if (!def) return false;
    if (this.isActive(id) || this.isOnCooldown(id)) return false;
    return this.active.length < MAX_ACTIVE;
  }

  accept(id) {
    if (!this.canAccept(id)) return false;
    const def = CONTRACTS[id];
    if ((this.game.player?.level ?? 1) < (def.level ?? 1)) {
      this.game.ui?.log(`Zlecenie „${def.name}” wymaga poziomu ${def.level}.`, 'warn');
      return false;
    }
    this.active.push({ id, acceptedAt: this.time });
    this.changed = true;
    this.game.ui?.log(`Przyjęto zlecenie: ${def.name}`, 'gold');
    this.game.ui?.toast(def.name, 'Zlecenie przyjęte');
    this.game.audio?.quest?.();
    this.game.ui?.refreshHud();
    return true;
  }

  abandon(id) {
    const before = this.active.length;
    this.active = this.active.filter((c) => c.id !== id);
    if (this.active.length !== before) {
      this.changed = true;
      this.game.ui?.refreshHud();
      return true;
    }
    return false;
  }

  progress(id) {
    const def = CONTRACTS[id];
    const entry = this.active.find((c) => c.id === id);
    if (!def) return [];
    const store = entry?.counters ?? (entry ? (entry.counters = {}) : null);
    return def.objectives.map((obj) => {
      const have = store?.[obj.id] ?? 0;
      return { ...obj, have: Math.min(have, obj.target ?? 1), target: obj.target ?? 1 };
    });
  }

  /** Śledzenie postępów: zabójstwa i przedmioty w plecaku. */
  update(dt) {
    this.time += dt;
    let dirty = false;
    for (const id of Object.keys(this.cooldowns)) {
      if (this.cooldowns[id] > 0) {
        this.cooldowns[id] = Math.max(0, this.cooldowns[id] - dt);
        if (this.cooldowns[id] === 0) dirty = true;
      }
    }
    for (const entry of this.active) {
      entry.counters ??= {};
    }
    if (dirty) this.changed = true;
  }

  onKill(enemyType) {
    let changed = false;
    for (const entry of this.active) {
      const def = CONTRACTS[entry.id];
      if (!def) continue;
      entry.counters ??= {};
      for (const obj of def.objectives) {
        if (obj.type !== 'kill' || obj.enemy !== enemyType) continue;
        const have = entry.counters[obj.id] ?? 0;
        if (have >= obj.target) continue;
        entry.counters[obj.id] = have + 1;
        changed = true;
        if (entry.counters[obj.id] >= obj.target) {
          this.game.ui?.log(`Zlecenie gotowe do oddania: ${def.name}`, 'good');
          this.game.audio?.objective?.();
        }
      }
    }
    if (changed) {
      this.changed = true;
      this.game.ui?.refreshHud();
    }
  }

  /** Zlecenia na przedmioty liczą się z plecaka (mogą być już zebrane). */
  _syncInventoryObjectives() {
    const inv = this.game.player?.inventory;
    if (!inv) return;
    let changed = false;
    for (const entry of this.active) {
      const def = CONTRACTS[entry.id];
      if (!def) continue;
      entry.counters ??= {};
      for (const obj of def.objectives) {
        if (obj.type !== 'collect') continue;
        const have = Math.min(inv.count(obj.item), obj.target);
        if ((entry.counters[obj.id] ?? 0) !== have) {
          entry.counters[obj.id] = have;
          changed = true;
        }
      }
    }
    if (changed) this.changed = true;
  }

  isComplete(id) {
    const def = CONTRACTS[id];
    const entry = this.active.find((c) => c.id === id);
    if (!def || !entry) return false;
    return def.objectives.every((o) => (entry.counters?.[o.id] ?? 0) >= (o.target ?? 1));
  }

  turnIn(id) {
    if (!this.isComplete(id)) return false;
    const def = CONTRACTS[id];
    const p = this.game.player;
    const inv = p.inventory;

    // zlecenia na przedmioty zabierają towar z plecaka
    for (const obj of def.objectives) {
      if (obj.type === 'collect') inv.remove(obj.item, obj.target);
    }

    const gold = Math.round((def.reward.gold ?? 0) * (1 + (p.mods?.loot ?? 0)));
    inv.gold += gold;
    for (const [itemId, qty] of def.reward.items ?? []) inv.add(itemId, qty);
    p.gainXp(def.reward.xp ?? 0);

    this.active = this.active.filter((c) => c.id !== id);
    this.cooldowns[id] = def.repeat ?? 300;
    this.completedCount += 1;
    this.changed = true;

    this.game.ui?.log(`Zlecenie oddane: ${def.name} (+${gold} złota)`, 'good');
    this.game.ui?.toast(def.name, 'Zlecenie wykonane');
    this.game.audio?.questComplete?.();
    this.game.ui?.refreshHud();
    this.game.saveGame?.();
    return true;
  }

  /** Lista pozycji do tablicy: dostępne, przyjęte, w odnowieniu. */
  board() {
    this._syncInventoryObjectives();
    return CONTRACT_IDS.map((id) => {
      const def = CONTRACTS[id];
      const active = this.isActive(id);
      const cooldown = this.cooldowns[id] ?? 0;
      return {
        id,
        ...def,
        active,
        cooldown,
        complete: active && this.isComplete(id),
        canAccept: this.canAccept(id),
        tooLowLevel: (this.game.player?.level ?? 1) < (def.level ?? 1),
        progress: active ? this.progress(id) : [],
      };
    });
  }

  activeLines() {
    this._syncInventoryObjectives();
    return this.active.map((entry) => {
      const def = CONTRACTS[entry.id];
      const prog = this.progress(entry.id);
      const done = this.isComplete(entry.id);
      const first = prog.find((p) => p.have < p.target) ?? prog[0];
      return {
        id: entry.id,
        name: def?.name ?? entry.id,
        text: done ? 'Gotowe — oddaj na tablicy' : `${first?.text?.replace(/\s*\(\d+\/\d+\)$/, '') ?? ''} ${first?.have ?? 0}/${first?.target ?? 1}`,
        done,
      };
    });
  }

  serialize() {
    return {
      active: this.active.map((a) => ({ id: a.id, acceptedAt: a.acceptedAt, counters: { ...(a.counters ?? {}) } })),
      cooldowns: { ...this.cooldowns },
      completedCount: this.completedCount,
      time: this.time,
    };
  }

  load(data) {
    if (!data) return;
    this.active = (data.active ?? []).filter((a) => CONTRACTS[a.id]).map((a) => ({
      id: a.id,
      acceptedAt: a.acceptedAt ?? 0,
      counters: { ...(a.counters ?? {}) },
    }));
    this.cooldowns = { ...(data.cooldowns ?? {}) };
    this.completedCount = data.completedCount ?? 0;
    this.time = data.time ?? 0;
    this.changed = true;
  }

  /** Opis nagród do interfejsu. */
  rewardText(id) {
    const def = CONTRACTS[id];
    if (!def) return '';
    const items = (def.reward.items ?? []).map(([item, qty]) => `${ITEMS[item]?.name ?? item}${qty > 1 ? ` ×${qty}` : ''}`);
    return [`${def.reward.gold} złota`, `${def.reward.xp} PD`, ...items].join(' · ');
  }
}
