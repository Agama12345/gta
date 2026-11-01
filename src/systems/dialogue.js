import { NPCS } from '../data/dialogue.js';
import { QUESTS } from '../data/quests.js';
import { ITEMS } from '../data/items.js';

export class DialogueSystem {
  constructor(game) {
    this.game = game;
    this.npcId = null;
    this.nodes = null;
    this.current = null;
    this.open = false;
  }

  ctx() {
    const g = this.game;
    const qs = g.quests;
    return {
      active: qs.active,
      availableQuest: qs.availableQuest(),
      allDone: qs.completed.size >= Object.keys(QUESTS).length,
      canComplete: qs.active ? qs.canComplete(qs.active) : false,
      questDone: (id) => qs.questDone(id),
      hasItem: (id) => g.player.inventory.has(id),
      night: g.dayNight.isNight,
      playerLevel: g.player.level,
      hour: g.dayNight.hour,
    };
  }

  start(npcId) {
    const def = NPCS[npcId];
    if (!def) return false;
    this.npcId = npcId;
    this.nodes = def.tree(this.ctx());
    this.current = 'start';
    this.open = true;
    this.game.quests.onTalk(npcId);
    this.render();
    this.game.audio?.uiOpen();
    return true;
  }

  render() {
    if (!this.open || !this.nodes?.[this.current]) return;
    const node = this.nodes[this.current];
    const def = NPCS[this.npcId];
    const choices = (node.choices ?? []).map((c, i) => ({ ...c, index: i }));
    this.game.voice?.speak(node.text, this.npcId);
    this.game.ui.showDialogue({
      speaker: node.speaker ?? def.name,
      role: def.role,
      text: node.text,
      choices,
      onChoose: (i) => this.choose(i),
      onClose: () => this.close(),
    });
  }

  choose(index) {
    const node = this.nodes[this.current];
    const choice = node?.choices?.[index];
    if (!choice) return;
    if (choice.action) {
      this.handleAction(choice.action);
      return;
    }
    if (choice.next) {
      this.current = choice.next;
      this.render();
      this.game.audio?.uiClick();
    }
  }

  handleAction(action) {
    const [cmd, arg] = action.split(':');
    const g = this.game;
    if (cmd === 'close') {
      this.close();
      return;
    }
    if (cmd === 'accept') {
      const quest = QUESTS[arg];
      if (!quest) return;
      g.quests.accept(arg);
      this.game.voice?.speak(`${quest.name}. ${quest.intro ?? ''}`.trim(), 'narrator');
      this.game.ui?.hideDialogue();
      this.open = false;
      this.game.ui?.showQuestIntro(quest, () => {
        g.resumeFromUi();
      });
      return;
    }
    if (cmd === 'complete') {
      const quest = QUESTS[arg];
      g.quests.complete(arg);
      this.close();
      if (quest) {
        g.ui?.showQuestOutro(quest, () => g.resumeFromUi());
      }
      return;
    }
    if (cmd === 'shop') {
      this.close();
      g.ui?.openShop(arg);
      return;
    }
    if (cmd === 'craft') {
      this.close();
      g.ui?.openCrafting('village');
      return;
    }
    if (cmd === 'rest') {
      this.close();
      g.restAtCampfire();
      return;
    }
  }

  close() {
    this.open = false;
    this.npcId = null;
    this.nodes = null;
    this.game.voice?.stop();
    this.game.ui?.hideDialogue();
    if (!this.game.ui?.anyPanelOpen?.()) this.game.resumeFromUi();
  }
}

export function npcGreeting(id, ctx) {
  const npc = NPCS[id];
  if (!npc) return '';
  return npc.name;
}

export function lootLine(id, qty) {
  return `${ITEMS[id]?.name ?? id}${qty > 1 ? ` ×${qty}` : ''}`;
}
