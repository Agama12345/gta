import { QUESTS, QUEST_ORDER } from '../data/quests.js';
import { ITEMS } from '../data/items.js';

export class QuestSystem {
  constructor(game) {
    this.game = game;
    this.active = null;
    this.completed = new Set();
    this.progress = {};
    this.killCounters = {};
    this.talked = {};
    this.changed = true;
  }

  get activeQuest() {
    return this.active ? QUESTS[this.active] : null;
  }

  questDone(id) {
    return this.completed.has(id);
  }

  availableQuest() {
    for (const id of QUEST_ORDER) {
      if (this.completed.has(id)) continue;
      if (this.active === id) continue;
      if (this.active) return null;
      return { id, ...QUESTS[id] };
    }
    return null;
  }

  accept(id) {
    if (!QUESTS[id] || this.active) return false;
    this.active = id;
    this.progress[id] = {};
    this.killCounters[id] = {};
    this.talked[id] = {};
    if (id === 'boss' && this.game.bossDefeated) this.killCounters[id].kaldras = 1;
    this.changed = true;
    this.game.ui?.log(`Nowe zadanie: ${QUESTS[id].name}`, 'gold');
    this.game.ui?.toast(QUESTS[id].name, 'Nowe zadanie');
    this.game.audio?.quest();
    this.game.ui?.refreshHud();
    return true;
  }

  onKill(enemyType) {
    if (!this.active) return;
    const q = this.activeQuest;
    const obj = q.objectives.find((o) => o.type === 'kill' && o.enemy === enemyType);
    if (!obj) return;
    this.killCounters[this.active][obj.id] = (this.killCounters[this.active][obj.id] ?? 0) + 1;
    this.changed = true;
    this.game.ui?.refreshHud();
    this.evaluate(true);
  }

  onTalk(npcId) {
    if (!this.active) return;
    this.talked[this.active][`talk_${npcId}`] = true;
    this.changed = true;
    this.evaluate(true);
  }

  objectiveState(obj) {
    const q = this.active;
    if (!q) return { done: false, current: 0, target: obj.target ?? 1 };
    const counts = this.killCounters[q] ?? {};
    const prog = this.progress[q] ?? {};
    if (prog[obj.id]) return { done: true, current: obj.target ?? 1, target: obj.target ?? 1 };

    if (obj.type === 'kill') {
      const cur = counts[obj.id] ?? 0;
      return { done: cur >= (obj.target ?? 1), current: Math.min(cur, obj.target ?? 1), target: obj.target ?? 1 };
    }
    if (obj.type === 'collect' || obj.type === 'own') {
      const cur = this.game.player.inventory.count(obj.item);
      return { done: cur >= (obj.target ?? 1), current: Math.min(cur, obj.target ?? 1), target: obj.target ?? 1 };
    }
    if (obj.type === 'talk') {
      const hasKey = this.talked[q]?.[`talk_${obj.npc}`];
      return { done: !!hasKey, current: hasKey ? 1 : 0, target: 1 };
    }
    return { done: false, current: 0, target: 1 };
  }

  canComplete(id = this.active) {
    if (!id) return false;
    const q = QUESTS[id];
    if (!q) return false;
    return q.objectives.every((o) => this.objectiveState(o).done);
  }

  evaluate(announce = false) {
    if (!this.active) return;
    const q = this.activeQuest;
    const prog = this.progress[this.active];
    for (const obj of q.objectives) {
      if (prog[obj.id]) continue;
      const st = this.objectiveState(obj);
      if (st.done) {
        prog[obj.id] = true;
        this.changed = true;
        this.game.ui?.refreshHud();
        if (announce) {
          this.game.ui?.log(`Cel ukończony: ${obj.text.replace(/\s\(\d+\/\d+\)$/, '')}`, 'good');
          this.game.audio?.objective();
        }
      }
    }
    if (this.canComplete() && !this._readyAnnounced) {
      this._readyAnnounced = true;
      const giver = q.giver;
      const npcName = giver === 'eryn' ? 'Starego Eryna' : 'kowala Borysa';
      if (!q.final) this.game.ui?.toast('Zadanie gotowe', `Wróć do ${npcName}`);
      this.game.ui?.refreshHud();
    }
  }

  complete(id = this.active) {
    if (!id || !this.canComplete(id)) return false;
    const q = QUESTS[id];
    this.completed.add(id);
    this.active = null;
    this._readyAnnounced = false;

    const p = this.game.player;
    p.inventory.gold += q.reward.gold ?? 0;
    for (const [itemId, qty] of q.reward.items ?? []) {
      p.inventory.add(itemId, qty);
      this.game.ui?.log(`Otrzymano: ${ITEMS[itemId]?.name ?? itemId} ×${qty}`, 'gold');
    }
    p.gainXp(q.reward.xp ?? 0);
    this.game.ui?.log(`Zadanie ukończone: ${q.name} (+${q.reward.gold} złota, +${q.reward.xp} PD)`, 'good');
    this.game.ui?.toast(q.name, 'Zadanie ukończone');
    this.game.audio?.questComplete();
    this.game.ui?.refreshHud();
    this.game.onQuestCompleted(id);
    return true;
  }

  statusLines() {
    if (!this.active) {
      const avail = this.availableQuest();
      if (avail) return [{ text: `Nowe zadanie u Starego Eryna: ${avail.name}`, done: false }];
      if (this.completed.size >= QUEST_ORDER.length) return [{ text: 'Wszystkie zadania ukończone.', done: true }];
      return [{ text: 'Porozmawiaj z mieszkańcami wioski.', done: false }];
    }
    const q = this.activeQuest;
    return q.objectives.map((o) => {
      const st = this.objectiveState(o);
      let text = o.text.replace(/\(\d+\/\d+\)$/, '').trim();
      if (o.target > 1) text += ` (${st.current}/${st.target})`;
      return { text, done: st.done, raw: o };
    });
  }

  currentObjectiveText() {
    const lines = this.statusLines().filter((l) => !l.done);
    return lines[0]?.text ?? 'Zadanie gotowe — wróć do zleceniodawcy';
  }

  targetHint() {
    const q = this.activeQuest;
    if (!q) {
      const avail = this.availableQuest();
      return avail ? 'Stary Eryn — Wilcza Dolina' : null;
    }
    if (this.canComplete()) return 'Wróć do zleceniodawcy';
    const obj = q.objectives.find((o) => !this.objectiveState(o).done);
    if (!obj) return null;
    if (obj.type === 'talk') return 'Wilcza Dolina';
    if (obj.type === 'kill') {
      const map = {
        wolf: 'Okolice Wilczej Doliny', bandit: 'Obozowisko bandytów', bandit_leader: 'Obozowisko bandytów',
        skeleton: 'Kurhan / Mgliste Wrota', wraith: 'Kurhan Szeptu (noc)', kaldras: 'Mgliste Wrota',
      };
      return map[obj.enemy] ?? 'Dzicz';
    }
    if (obj.type === 'collect') {
      const map = { stolen_grain: 'Obozowisko bandytów', shard_dawn: 'Kurhan / obóz', ancient_metal: 'Kamieniołom / kurhan' };
      return map[obj.item] ?? 'Dzicz';
    }
    return q.name;
  }

  serialize() {
    return {
      active: this.active,
      completed: [...this.completed],
      progress: this.progress,
      killCounters: this.killCounters,
      talked: this.talked,
    };
  }

  load(data) {
    if (!data) return;
    this.active = data.active ?? null;
    this.completed = new Set(data.completed ?? []);
    this.progress = data.progress ?? {};
    this.killCounters = data.killCounters ?? {};
    this.talked = data.talked ?? {};
    this._readyAnnounced = false;
    this.changed = true;
  }
}
