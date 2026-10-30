// Mieszkańcy Wilczej Doliny — wygląd, pozycje i dialogi.
// Drzewka dialogowe reagują na stan zadań, poziom gracza i porę dnia.

const erynTree = (ctx) => {
  const nodes = {
    start: {
      speaker: 'Stary Eryn',
      text: ctx.active === 'wolves'
        ? '„Wilki wciąż grasują. Ludzie boją się wychodzić po zmroku. Policz je, chłopcze — pięć sztuk i będziemy spać spokojnie.”'
        : ctx.active === 'grain'
          ? '„Obozowisko Rudego Wilka leży na zachód od rozdroża. Worek zboża musi wrócić do wioski. A Rudy… Rudy nie musi.”'
          : ctx.active === 'barrow'
            ? '„Kurhan jest na północnym wschodzie, za rozstajem. Idź tam po zmroku, inaczej wieszczka nie pokaże się wcale.”'
            : ctx.active === 'forge'
              ? '„Borys czeka przy anvilu. Trzy okruchy, dwa kawałki starożytnego metalu. Kowalska Góra ma jedno i drugie, jeśli dobrze szukać.”'
              : ctx.active === 'boss'
                ? '„Mgliste Wrota są na południu, za kamiennym łukiem. Idź i nie oglądaj się za siebie.”'
                : '„Wilcza Dolina nie jest bogata, ale ma dach i ogień. Rozgość się — choć nie na długo, bo mamy problemy.”',
      choices: [],
    },
  };

  const start = nodes.start;
  const current = ctx.active;

  if (!current) {
    const available = ctx.availableQuest;
    if (available) {
      start.choices.push({
        label: `„Co się dzieje?” — przyjmij zadanie: ${available.name}`,
        action: `accept:${available.id}`,
        special: true,
      });
    } else if (ctx.allDone) {
      start.choices.push({ label: '„Wrota są zamknięte. Wioska może odetchnąć.”', action: 'close' });
    } else {
      start.choices.push({ label: '„Wrócę, gdy będę gotów.”', action: 'close' });
    }
    start.choices.push({ label: '„Opowiedz mi o Kaldrasie.”', next: 'lore' });
    start.choices.push({ label: '„Muszę iść.”', action: 'close' });
  } else if (ctx.canComplete) {
    start.choices.push({ label: '„Zrobione. Wszystko, jak prosiłeś.”', action: `complete:${current}`, special: true });
    start.choices.push({ label: '„Jeszcze nie teraz.”', action: 'close' });
  } else {
    start.choices.push({ label: '„Wrócę, gdy skończę.”', action: 'close' });
    start.choices.push({ label: '„Opowiedz mi o Kaldrasie.”', next: 'lore' });
    if (ctx.active === 'barrow' && !ctx.night) {
      start.choices.push({ label: '„Jak mam walczyć z duchem?”', next: 'wraith' });
    }
  }

  nodes.lore = {
    speaker: 'Stary Eryn',
    text:
      '„Kaldras był strażnikiem Mglistych Wrót, jeszcze przed twoim urodzeniem. Trzydzieści lat temu mgła zaczęła szeptać. On wszedł między wrota i zamknął je od zewnątrz — własnym ciałem. Myśleliśmy, że to koniec. Nie było. Teraz to, co po drugiej stronie, nosi jego twarz.”',
    choices: [
      { label: '„Jak go pokonać?”', next: 'howto' },
      { label: '„Wróćmy do spraw wioski.”', next: 'start' },
    ],
  };
  nodes.howto = {
    speaker: 'Stary Eryn',
    text:
      '„Ostrzem Świtu. Twoja matka nosiła je do końca. Rozpadło się na trzy okruchy — jeden zabrał Rudy Wilk, jeden strzeże wieszczka, jeden leży w kamieniu na Kowalskiej Górze. Kowal Borys wie, co z tym zrobić.”',
    choices: [{ label: '„Rozumiem.”', next: 'start' }],
  };
  nodes.wraith = {
    speaker: 'Stary Eryn',
    text:
      '„Duch nie krwawi. Ale boi się światła i stali, która pamięta ogień. Użyj Znaku Świtu, gdy się zbliży. I nie stój w miejscu — jej szept wysysa siły.”',
    choices: [{ label: '„Dzięki.”', next: 'start' }],
  };
  return nodes;
};

const borysTree = (ctx) => {
  const nodes = {
    start: {
      speaker: 'Borys Kowal',
      text: ctx.questDone('barrow')
        ? '„Okruch z kurhanu? Pokaż. Hmm. Zimny jak sedno zimy. Rozłóż wszystko na anvilu — wykuję ci klingę, jakiej ta dolina nie widziała.”'
        : '„Stal się nie tnie, jeśli jej nie szanujesz. Co chcesz, żebym ci zrobił?”',
      choices: [
        { label: 'Otwórz kuźnię (rzemiosło)', action: 'craft' },
        { label: '„Opowiedz o starożytnej kuźni.”', next: 'forge_lore' },
        { label: '„Muszę iść.”', action: 'close' },
      ],
    },
    forge_lore: {
      speaker: 'Borys Kowal',
      text:
        '„Kowalska Góra to nie moja robota. Ktoś tam kuł metal, zanim ludzie nauczyli się czytać. Została im tylko ta przeklęta kuźnia i kamienie, które świecą w nocy. Spaliłem sobie rękę, próbując ją rozpalić. Nie idź tam bez powodu.”',
      choices: [{ label: '„Zapamiętam.”', next: 'start' }],
    },
  };
  if (ctx.hasItem('dawn_blade')) {
    nodes.start.text = '„Klinga Świtu. Wyszła lepiej, niż śmiałem marzyć. Uważaj na nią — ostrze pamięta każde cięcie.”';
  }
  return nodes;
};

const marenaTree = (ctx) => ({
  start: {
    speaker: 'Marena Zielarka',
    text: ctx.night
      ? '„Nocą zioła zamykają się, ale mikstury są gotowe. Czego potrzebujesz?”'
      : '„Zioła zbieram o świcie, gdy rosa jeszcze nie opadnie. Mów, co ci dolega.”',
    choices: [
      { label: 'Kup mikstury', action: 'shop:marena' },
      { label: '„Co wiesz o kurhanie?”', next: 'barrow_lore' },
      { label: 'Odpocznij przy ognisku (do świtu)', action: 'rest' },
      { label: '„Muszę iść.”', action: 'close' },
    ],
  },
  barrow_lore: {
    speaker: 'Marena Zielarka',
    text:
      '„Wieszczka z Kurhanu nie jest zła. Była kobietą, która patrzyła w mgłę dłużej, niż powinna. Teraz powtarza to, co usłyszała — imiona. Jeśli usłyszysz swoje, nie odpowiadaj.”',
    choices: [{ label: '„A jeśli odpowiem?”', next: 'barrow_lore2' }, { label: '„Dzięki.”', next: 'start' }],
  },
  barrow_lore2: {
    speaker: 'Marena Zielarka',
    text: '„Wtedy przyjdzie po ciebie. Ale nie martw się — twoje imię jeszcze nie pada w jej szeptach. Jeszcze.”',
    choices: [{ label: '…', next: 'start' }],
  },
});

const zorzanTree = (ctx) => ({
  start: {
    speaker: 'Kupiec Zorzan',
    text: '„Towar z południa, ceny z północy. Tak się handluje w tej dolinie. Co cię interesuje?”',
    choices: [
      { label: 'Otwórz sklep', action: 'shop:zorzan' },
      { label: '„Sprzedasz mi coś na bandytów?”', next: 'bandits' },
      { label: '„Skąd przywozisz towar?”', next: 'lore' },
      { label: '„Muszę iść.”', action: 'close' },
    ],
  },
  bandits: {
    speaker: 'Kupiec Zorzan',
    text: '„Rudy Wilk kupował ode mnie noże. Dużo noży. Płacił dobrze, więc nie pytałem. Teraz wiem, po co były.”',
    choices: [{ label: '„Zapłacisz za to kiedyś.”', next: 'start' }],
  },
  lore: {
    speaker: 'Kupiec Zorzan',
    text: '„Z południa, gdzie nie ma już dróg, tylko mgła. Handluję z tymi, którzy jeszcze wracają. Coraz mniej ich wraca.”',
    choices: [{ label: '„Wróćmy do interesów.”', next: 'start' }],
  },
});

const wilkTree = (ctx) => ({
  start: {
    speaker: 'Strażnik Wilk',
    text: ctx.playerLevel < 3
      ? '„Nowy? Trzymaj się blisko wioski i nie ufaj wilkom, co nie uciekają. Atakuj z dystansu albo z zaskoczenia.”'
      : '„Widzę, że umiesz machnąć mieczem. Uważaj tylko na tych z łukami — strzelają zanim zdążysz zamachnąć.”',
    choices: [
      { label: '„Jak walczyć z bandytami?”', next: 'tips' },
      { label: '„Gdzie znajdę rudę?”', next: 'ore' },
      { label: '„Dzięki.”', action: 'close' },
    ],
  },
  tips: {
    speaker: 'Strażnik Wilk',
    text:
      '„Bandyci walczą w grupie. Zwab jednego na bok, potem drugiego. Unik to twój najlepszy przyjaciel — naciśnij spację, gdy tylko zobaczysz zamach. A gdy zabraknie sił, uciekaj, nie udawaj bohatera.”',
    choices: [{ label: '„Zapamiętam.”', next: 'start' }],
  },
  ore: {
    speaker: 'Strażnik Wilk',
    text:
      '„Ruda leży w kamieniołomie na południu, przy starych wozach. Starożytny metal znajdziesz w kurhanie — ale tam nie chodzi się samemu.”',
    choices: [{ label: '„Dzięki.”', next: 'start' }],
  },
});

const iskraTree = (ctx) => ({
  start: {
    speaker: 'Iskra',
    text: '„Uczę się magii od Marianny, ale ona twierdzi, że mam za dużo zapału, a za mało cierpliwości. Ty umiesz czarować? Pokaż coś!”',
    choices: [
      { label: '„Pokażę ci Znak Świtu.”', next: 'spell' },
      { label: '„Jakub to twój…?”', next: 'family' },
      { label: '„Muszę iść.”', action: 'close' },
    ],
  },
  spell: {
    speaker: 'Iskra',
    text: '„Ojej! To było jak prawdziwe światło! Naucz mnie kiedyś, dobrze? Obiecuję, że nie podpalę wioski. Przynajmniej nie od razu.”',
    choices: [{ label: '„Kiedyś.”', next: 'start' }],
  },
  family: {
    speaker: 'Iskra',
    text: '„Jakub był moim bratem. Zginął przy kurhanie dwa lata temu. Mówią, że to wilki... ale wilki nie zostawiają śladów stali na kościach.”',
    choices: [{ label: '„Przykro mi.”', next: 'start' }],
  },
});

const ghostTree = (ctx) => ({
  start: {
    speaker: 'Cień pod Łukiem',
    text: '„Znałem twoją matkę. Nosiła ostrze, którego nikt nie potrafił wykować na nowo. Kaldras nie jest potworem — jest strażnikiem, który zapomniał, kogo pilnuje. Oszczędź go, jeśli możesz.”',
    choices: [
      { label: '„Kim jesteś?”', next: 'who' },
      { label: '„Muszę iść.”', action: 'close' },
    ],
  },
  who: {
    speaker: 'Cień pod Łukiem',
    text: '„Nikim ważnym. Kiedyś nazywano mnie Corem. Teraz jestem tylko mgłą, która pamięta imiona.”',
    choices: [{ label: '…', next: 'start' }],
  },
});

export const NPCS = {
  eryn: {
    name: 'Stary Eryn', role: 'Starosta Wilczej Doliny',
    pos: [4.5, 26], rot: -2.2, radius: 4.2,
    visual: { tunic: '#5c4a33', pants: '#3a3228', hair: '#b9b0a0', beard: true, skin: '#c79a71', bulk: 1.0, cloak: '#4a4034' },
    tree: erynTree,
  },
  borys: {
    name: 'Borys Kowal', role: 'Kowal',
    pos: [-8, 23], rot: 1.9, radius: 4.2,
    visual: { tunic: '#4a3a2c', pants: '#33291f', hair: '#2a1d14', beard: true, skin: '#b98258', bulk: 1.16, armor: '#5b5548', scar: true },
    tree: borysTree,
  },
  marena: {
    name: 'Marena Zielarka', role: 'Zielarka',
    pos: [10, 38], rot: -1.2, radius: 4.2,
    visual: { tunic: '#3f5a42', pants: '#3a3b2e', hair: '#8a6b45', skin: '#d2a67d', bulk: 0.94, cloak: '#2f4a37' },
    tree: marenaTree,
  },
  zorzan: {
    name: 'Kupiec Zorzan', role: 'Wędrowny kupiec',
    pos: [-11, 41], rot: 1.1, radius: 4.2,
    visual: { tunic: '#5a3f52', pants: '#382e3a', hair: '#241a16', skin: '#c9976d', bulk: 1.02, cloak: '#45304a', hood: '#3a2840' },
    tree: zorzanTree,
  },
  wilk: {
    name: 'Strażnik Wilk', role: 'Straż wioski',
    pos: [0, 15], rot: 0.2, radius: 4.0,
    visual: { tunic: '#4c4e52', pants: '#33373b', hair: '#3a2b1f', skin: '#cba07a', bulk: 1.1, armor: '#5e6367' },
    tree: wilkTree,
  },
  iskra: {
    name: 'Iskra', role: 'Uczennica zielarki',
    pos: [13, 29], rot: 2.6, radius: 4.0,
    visual: { tunic: '#5d6a4c', pants: '#3c4032', hair: '#b8542f', skin: '#e0b48a', bulk: 0.84 },
    tree: iskraTree,
  },
  duch: {
    name: 'Cień pod Łukiem', role: 'Zjawisko',
    pos: [-16, -42], rot: 0.4, radius: 5.0, ghost: true, hidden: true,
    visual: { tunic: '#3d4a52', pants: '#2f3a40', hair: '#20282c', skin: '#8fa6ad', bulk: 1.0, cloak: '#2a3a44', eyeColor: '#8fe0ff' },
    tree: ghostTree,
  },
};

export const SHOPS = {
  zorzan: {
    name: 'Kupiec Zorzan',
    stock: ['health_potion', 'mana_potion', 'bread', 'leather_hood', 'leather_vest', 'hunter_bow', 'iron_ore', 'herbs', 'health_potion'],
  },
  marena: {
    name: 'Marena Zielarka',
    stock: ['health_potion', 'mana_potion', 'might_elixir', 'herbs', 'herbs', 'crystal_mana'],
  },
};

// Wskazówki wyświetlane przy ładowaniu ekranu.
export const TIPS = [
  'Walka wręcz nagradza cierpliwość — unik w odpowiednim momencie otwiera kontratak.',
  'Nocą wilki są szybsze, a w kurhanie pojawia się coś, czego nie ma w dzień.',
  'Odpoczynek przy ognisku leczy rany i przesuwa czas do świtu.',
  'Zbieraj zioła i rudę — rzemiosło bywa cenniejsze niż złoto.',
  'Krytyczne trafienia zależą od zręczności, ale każde ostrze ma swoją wagę.',
];
