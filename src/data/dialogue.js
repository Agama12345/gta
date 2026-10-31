// Mieszkańcy Wilczej Doliny — wygląd, pozycje i dialogi.
// Drzewka dialogowe reagują na stan zadań, poziom gracza i porę dnia.

import { WORLD_SCALE } from '../world/terrain.js';

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
                ? '„Mgliste Wrota są na północy, za kamiennym łukiem. Idź i nie oglądaj się za siebie.”'
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


const pustelnikTree = () => ({
  start: {
    speaker: 'Pustelnik Ivar',
    text: '„Przychodzisz z dołu, z hałasu. Siadaj. W ciemnym lesie nikt nie pyta, po co przyszedł — tylko czy przyniósł własne milczenie.”',
    choices: [
      { label: '„Co wiesz o Mglistych Wrotach?”', next: 'gates' },
      { label: '„Mogę odpocząć przy twoim ogniu?”', next: 'rest' },
      { label: '„Muszę iść.”', action: 'close' },
    ],
  },
  gates: {
    speaker: 'Pustelnik Ivar',
    text: '„Wrota nie zostały zbudowane po to, by coś wpuszczać. Zbudowano je, żeby coś trzymać w środku. Kaldras stanął w progu i zapomniał, po której stronie stoi. Gdy go spotkasz, nie pytaj go o imię — odpowie cudzym.”',
    choices: [
      { label: '„Skąd to wiesz?”', next: 'who' },
      { label: '„Wróćmy do ognia.”', next: 'start' },
    ],
  },
  who: {
    speaker: 'Pustelnik Ivar',
    text: '„Byłem przy wrotach, gdy je zamykano. Miałem wtedy inne imię i inne oczy. Zostało mi to, co widzisz: ogień, mech i trzy zdania prawdy na krzyż.”',
    choices: [{ label: '„Rozumiem.”', next: 'start' }],
  },
  rest: {
    speaker: 'Pustelnik Ivar',
    text: '„Ogień jest twój, dopóki płonie. Ale pamiętaj — las nie śpi, gdy ty śpisz.”',
    choices: [
      { label: 'Usiądź przy ogniu', action: 'rest' },
      { label: '„Dziękuję.”', next: 'start' },
    ],
  },
});

const kupiecTree = () => ({
  start: {
    speaker: 'Kupiec Bogdan',
    text: '„Kotlina Kupców! Najlepsze ceny od Wilczej Doliny do przełęczy, a i tam nie ma czego szukać. Czego szukasz — stali, ziół, czy może plotki?”',
    choices: [
      { label: '„Pokaż towar.”', action: 'shop:bogdan' },
      { label: '„Co słychać na trakcie?”', next: 'news' },
      { label: '„Muszę iść.”', action: 'close' },
    ],
  },
  news: {
    speaker: 'Kupiec Bogdan',
    text: '„Na trakcie coraz więcej znaków. Bandyci Rudego Wilka siedzą na północnym zachodzie i liczą każdego, kto idzie z ładunkiem. Za przełęczą ktoś zabił trzy wozy. A nad jeziorem rybacy mówią, że woda w nocy paruje — i to nie od zimna.”',
    choices: [
      { label: '„A Kamienny Krąg?”', next: 'circle' },
      { label: '„Wróćmy do interesów.”', next: 'start' },
    ],
  },
  circle: {
    speaker: 'Kupiec Bogdan',
    text: '„Kamienny Krąg stoi na wschód od traktu, na polanie, której nikt nie kosi. Kamienie pamiętają więcej niż my. Ja tam nie chodzę — ale towar z kręgu zawsze jest w cenie.”',
    choices: [{ label: '„Ciekawe.”', next: 'start' }],
  },
});

const rybakTree = (ctx) => ({
  start: {
    speaker: 'Rybak Tobiasz',
    text: ctx.active
      ? '„Wracaj do swoich spraw, chłopcze. Morze nie czeka, a sieci trzeba łatać.”'
      : '„Całe życie na tej wodzie i wciąż mnie zaskakuje. Raz oddaje połów, raz zabiera dom. Usiądź przy ogniu, jeśli chcesz posłuchać.”',
    choices: [
      { label: '„Co to za wrak na mieliźnie?”', next: 'wreck' },
      { label: '„Po co latarnia na cyplu?”', next: 'light' },
      { label: '„Czym handlujesz?”', action: 'shop:fisher' },
      { label: '„Muszę iść.”', action: 'close' },
    ],
  },
  wreck: {
    speaker: 'Rybak Tobiasz',
    text: '„„Zimna Fala”. Płynęła z ładunkiem, którego nikt nie chciał odprawić w porcie. Zderzyła się z mielizną podczas sztormu — trzy noce przed twoim przyjściem. Nikt z załogi nie wypłynął. Skrzynię, którą widzisz we wraku, zostawili dla siebie. Weź ją, jeśli masz odwagę.”',
    choices: [{ label: '„Sprawdzę.”', next: 'start' }],
  },
  light: {
    speaker: 'Rybak Tobiasz',
    text: '„Latarnik zniknął zimą. Od tamtej pory światło pali się samo — nikt go nie zapala, a jednak płonie. Mówią, że dopóki się pali, morze nie zabierze Wilczej Doliny. Ja tam nie chodzę po zmroku.”',
    choices: [{ label: '„Dziwne.”', next: 'start' }],
  },
});


// ---------------------------------------------------------------------------
// DODATKOWE ROZMOWY — każdy mieszkaniec ma własne tematy: pogodę, wieści,
// plotki i „co słychać w dolinie”. Dzięki temu rozmowa nie kończy się na
// jednym pytaniu o zadanie, tylko pozwala pociągnąć temat (jak w Gothicu).
// ---------------------------------------------------------------------------
const CHATTER = {
  eryn: {
    weather: [
      '„Deszcz idzie od morza. Czujesz? Wilki też go czują — będą głodne.”',
      '„Mgła nad kurhanem gęstsza niż zwykle. To nie zima, chłopcze. To coś pod ziemią.”',
      '„Słońce w końcu wyszło. Trzy dni temu myślałem, że utoniemy w błocie.”',
    ],
    news: [
      '„Kupcy mówią, że na trakcie znowu znikają wozy. Rada nie chce tego słuchać, ale ja słucham.”',
      '„Rybacy z nadmorskich chat przysłali sól i wieść: na mieliźnie leży wrak, którego nikt nie zgłosił.”',
      '„Marena znowu nie spała. Twierdzi, że coś chodziło wokół jej zielnika. Może i chodziło.”',
    ],
    rumor: [
      '„Powiadają, że Kaldras nie umarł — tylko stoi po drugiej stronie wrót i czeka, żeby ktoś je uchylił.”',
      '„Twój ojciec był tu lubiany. Ale kiedy wracał z Kowalskiej Góry, nie chciał mówić, co widział.”',
      '„Stara studnia za kuźnią jest zasypana nie bez powodu. Nie kop tam, dobrze radzę.”',
    ],
  },
  borys: {
    weather: [
      '„Wilgoć w powietrzu. Stal będzie rdzewieć szybciej niż schnąć.”',
      '„Mróz przyjdzie w tym tygodniu. Węgiel z kopalni będzie na wagę złota.”',
      '„Taka pogoda to dobra pogoda. Ogień trzyma ciepło, metal się nie skręca.”',
    ],
    news: [
      '„Górnicy z Kopalni Żelaznej mówią, że w sztolni słychać stukanie. Nie ich stukanie.”',
      '„Rada zamówiła cztery nowe lemiesze. Cztery! Jakbyśmy mieli czym orać.”',
      '„Zorzan sprzedaje „starą“ rudę z nowych wykopalisk. Uważaj na jego ceny.”',
    ],
    rumor: [
      '„Mówią, że w moim piecu pali się coś więcej niż węgiel. Bzdura. Ale piec pamięta.”',
      '„Rudy Wilk kupował u mnie noże. Płacił dobrze i nie pytał o nic. To powinno mi było dać do myślenia.”',
      '„Kamieniołom na zachodzie był kiedyś kopalnią czegoś, co nie ma nazwy po ludzku.”',
    ],
  },
  marena: {
    weather: [
      '„Po deszczu zioła mają więcej mocy. Zbieraj wtedy, jeśli możesz.”',
      '„Noc bez księżyca — nie chodź wtedy do kurhanu. Wieszczka widzi wtedy najlepiej.”',
      '„Takie słońce wysusza korzenie. Podleję grządki dwa razy.”',
    ],
    news: [
      '„Iskra znalazła dziś krwawnik o siedmiu liściach. Mówi, że to znak. Może i znak.”',
      '„W bagnie zakwitło coś, czego nie znam. Nie podchodź tam bez pochodni.”',
      '„Wiejska studnia ma metaliczny posmak. Ktoś musiał coś wrzucić.”',
    ],
    rumor: [
      '„Mój mistrz twierdził, że Ostrze Świtu wyrosło z gwiazdy, która spadła w jezioro. Woda pamięta więcej niż ludzie.”',
      '„Pustelnik z Ciemnego Lasu leczy lepiej niż ja. Ale nie pytaj go o przeszłość.”',
      '„Każda mikstura ma cenę. Ta, którą ci sprzedaję, kosztuje tylko monety.”',
    ],
  },
  zorzan: {
    weather: [
      '„Deszcz psuje towar. Dlatego mam ceny jak mam.”',
      '„W taki upał sprzedaję więcej wody niż mikstur. Ludzie są przewidywalni.”',
      '„Mgła na trakcie? Doskonale. Bandyci też jej nie lubią.”',
    ],
    news: [
      '„Z południa idą wieści o wojnie. Nie naszej wojnie, więc nie moja sprawa.”',
      '„Rada Wilczej Doliny płaci za wilcze łby. Wiesz, ile ja płacę za skóry? Mniej.”',
      '„Kupcy z Kotliny mówią, że trakt jest bezpieczniejszy. Nie wierzę im.”',
    ],
    rumor: [
      '„Widziałem, jak ktoś w nocy szedł do Mglistych Wrót i wrócił odmieniony. Nie pytaj kto.”',
      '„Twoje ostrze? Wykute z trzech okruchów? Sprzedaj mi je, a będziesz bogaty. Nie? Trudno.”',
      '„Kiedyś handlowałem w Warowni Popiołu. Dopóki nie zaczęli tam chodzić ci, którzy nie powinni.”',
    ],
  },
  wilk: {
    weather: [
      '„W deszczu warta jest dwa razy dłuższa. Wiesz dlaczego? Bo nikt nie chce jej pełnić.”',
      '„Noc będzie ciemna. Trzymaj się blisko ognia.”',
      '„Zimno. Dobrze. Mniej bandytów na trakcie.”',
    ],
    news: [
      '„Trzy noce temu ktoś próbował przejść przez bramę po zmroku. Nie miał twarzy, którą bym pamiętał.”',
      '„Rada chce więcej patroli, ale ja mam czterech ludzi i dwie włócznie.”',
      '„Mówiłem Erynowi, że powinniśmy zamknąć trakt na noc. Nie posłuchał.”',
    ],
    rumor: [
      '„Służyłem w Warowni Popiołu, zanim się zawaliła. Nie opowiadam o tym przy ogniu.”',
      '„Rudy Wilk był kiedyś strażnikiem. Potem zobaczył coś w kurhanie i przestał wracać do domu.”',
      '„Mój ojciec mówił: jeśli wilk patrzy ci w oczy i nie ucieka, to nie jest wilk.”',
    ],
  },
  iskra: {
    weather: [
      '„Po deszczu robaki wychodzą z ziemi. Wiesz, ile one mówią? Ja nie wiem, ale mówią.”',
      '„Marena mówi, że mam nie biegać w nocy po lesie. Biegam.”',
      '„Śnieg? Nigdy nie widziałam śniegu w dolinie. Podobno na północy jest cały biały.”',
    ],
    news: [
      '„Znalazłam dziś ptasie gniazdo w starym dębie. Było puste. Nie podoba mi się to.”',
      '„Borys dał mi ćwiek z żelaza. Mówi, że to na szczęście. Noszę go.”',
      '„Wiesz, że w kurhanie słychać czasem śpiew? Marena mówi, że mi się wydaje.”',
    ],
    rumor: [
      '„Kiedy dorosnę, zostanę zielarką jak Marena. Albo łowczynią. Albo obiema.”',
      '„Chłopcy z wioski mówią, że widzieli światło nad jeziorem. Ja też widziałam.”',
      '„Mama mówi, że masz oczy ojca. Nie wiem, czy to komplement.”',
    ],
  },
  pustelnik: {
    weather: [
      '„Las wie, jaka będzie zima. Wiewiórki już się przeniosły niżej.”',
      '„Deszcz tu nie dociera. To nie drzewa, to coś innego.”',
      '„Mgła w tym lesie nie jest z wody. Pamiętaj.”',
    ],
    news: [
      '„Nie mam wieści. Wieści to rzecz ludzi, którzy mają coś do stracenia.”',
      '„Słyszałem dzwon z Warowni. Dzwon, który nie bije od trzydziestu lat.”',
      '„Marena przysłała mi miód. Dobra kobieta. Niepotrzebnie.”',
    ],
    rumor: [
      '„Kaldras? Znałem go. Był uparty jak kamień i dwa razy cięższy.”',
      '„Mgliste Wrota nie zostały zbudowane. Zostały znalezione. To różnica.”',
      '„Twoje ostrze ma trzy części, bo ktoś je złamał z premedytacją. Ktoś, kto bał się, co zrobi jeden człowiek.”',
    ],
  },
  kupiec: {
    weather: [
      '„Deszcz na targu to najgorszy interes. Chmury, wracajcie za góry.”',
      '„W taki upał wino się psuje. Dlatego sprzedaję je szybciej.”',
      '„Mgła na trakcie oznacza mniej kupujących. I więcej złodziei.”',
    ],
    news: [
      '„Z Kotliny idą wieści, że droga na południe jest zamknięta. Znowu.”',
      '„Zorzan z Wilczej Doliny sprzedaje towary, których nie powinien mieć. Ciekawe, skąd.”',
      '„Rada kupiecka podniosła cła. Znowu. Wszyscy udają, że to nie ich wina.”',
    ],
    rumor: [
      '„Kiedyś handlowałem z kimś z Mglistych Wrót. Zapłacił złotem, które było zimne jak lód.”',
      '„Słyszałem, że w kamieniołomie znaleziono drzwi. Kamienne drzwi, które nie prowadzą do jaskini.”',
      '„Kowalska Góra? Byłem. Wróciłem. To więcej, niż mogą powiedzieć inni.”',
    ],
  },
  rybak: {
    weather: [
      '„Wiatr od morza. Będzie sztorm przed zmrokiem — słychać w falach.”',
      '„Taka cisza na wodzie oznacza jedno: ryby poszły głębiej.”',
      '„Mgła nad zatoką. Nie wypływaj dziś, nawet jeśli ci zapłacą.”',
    ],
    news: [
      '„Sieci przychodzą porwane. Nie przez ryby — przez coś, co je je.”',
      '„Widziałem światło na Samotnej Skale. Latarnia jest zgaszona od tygodni, więc nie wiem, co to było.”',
      '„Z wraku „Zimnej Fali” wyciągnąłem skrzynię. Była pusta, ale zamknięta od środka.”',
    ],
    rumor: [
      '„Morze oddaje to, co zabierze. Czasem w całości, czasem tylko kości.”',
      '„Mój brat popłynął na północ. Mówił, że za mgłą jest drugi brzeg. Nie wrócił.”',
      '„Kupujesz ryby, ale nie pytasz, z czego żyją. To dobrze. Nie chcesz wiedzieć.”',
    ],
  },
  duch: {
    weather: [
      '„Zimno. Zawsze zimno. Nie pamiętam ciepła.”',
      '„Wiatr niesie imiona. Twoje jeszcze nie.”',
      '„Mgła rośnie. Ona też.”',
    ],
    news: [
      '„Wrota były zamknięte. On je otworzył od środka. Nie wiem, dlaczego.”',
      '„Trzydzieści lat. Liczyłem każdą zimę. Było ich więcej, niż myślisz.”',
      '„Kaldras nie śpi. Czeka, aż ktoś zapyta go o imię.”',
    ],
    rumor: [
      '„Nie jestem duchem. Jestem tym, co zostało, gdy duch odszedł.”',
      '„Twoja matka stała tu kiedyś. Płakała. Nie zapytałem dlaczego.”',
      '„Ostrze Świtu nie zostało złamane w bitwie. Zostało złamane, by go powstrzymać.”',
    ],
  },
};

const pickLine = (arr, seed) => arr[Math.abs(seed) % arr.length];

/** Dokłada każdemu mieszkańcowi tematy do rozmowy (pogoda, wieści, plotki). */
function withSmallTalk(treeFn, npcId) {
  return (ctx) => {
    const nodes = treeFn(ctx);
    const start = nodes.start;
    if (!start) return nodes;
    const chat = CHATTER[npcId];
    if (!chat) return nodes;
    const seed = Math.floor((ctx.hour ?? 12) * 3 + (ctx.playerLevel ?? 1) * 7 + (ctx.night ? 5 : 0));

    nodes.smalltalk = {
      speaker: start.speaker,
      text: '„O co chcesz zapytać?”',
      choices: [
        { label: '„Co mówią o pogodzie?”', next: 'chat_weather' },
        { label: '„Jakie wieści z doliny?”', next: 'chat_news' },
        { label: '„A co ludzie szepczą?”', next: 'chat_rumor' },
        { label: '„Wróćmy do rzeczy.”', next: 'start' },
      ],
    };
    nodes.chat_weather = {
      speaker: start.speaker,
      text: pickLine(chat.weather, seed),
      choices: [
        { label: '„Jeszcze o czymś innym.”', next: 'smalltalk' },
        { label: '„Wróćmy do rzeczy.”', next: 'start' },
      ],
    };
    nodes.chat_news = {
      speaker: start.speaker,
      text: pickLine(chat.news, seed + 1),
      choices: [
        { label: '„Jeszcze o czymś innym.”', next: 'smalltalk' },
        { label: '„Wróćmy do rzeczy.”', next: 'start' },
      ],
    };
    nodes.chat_rumor = {
      speaker: start.speaker,
      text: pickLine(chat.rumor, seed + 2),
      choices: [
        { label: '„Jeszcze o czymś innym.”', next: 'smalltalk' },
        { label: '„Wróćmy do rzeczy.”', next: 'start' },
      ],
    };
    if (!start.choices.some((c) => c.next === 'smalltalk')) {
      start.choices.splice(Math.max(0, start.choices.length - 1), 0, {
        label: '„Opowiedz mi, co słychać.”',
        next: 'smalltalk',
      });
    }
    return nodes;
  };
}

/** Krótkie kwestie wypowiadane, gdy przechodzisz obok postaci. */
export const BARKS = {
  eryn: ['„Chłopcze, uważaj na trakcie.”', '„Wioska nie zapomni, co dla niej zrobisz.”', '„Odpocznij, póki możesz.”'],
  borys: ['„Stal nie czeka.”', '„Jak chcesz broń, to przyjdź z materiałem.”', '„Nie stój w ogniu, chłopcze.”'],
  marena: ['„Zioła na wyciągnięcie ręki.”', '„Uważaj na mgłę.”', '„Wróć, gdy cię zranią.”'],
  zorzan: ['„Towar pierwsza klasa!”', '„Kupuj, póki mam.”', '„Złoto lubi się wymieniać.”'],
  wilk: ['„Stój i mów, kim jesteś.”', '„Nocą trzymaj się blisko ognia.”', '„Warta trwa.”'],
  iskra: ['„Cześć! Chcesz zobaczyć mój zielnik?”', '„Marena mówi, że za dużo pytam.”'],
  pustelnik: ['„Nie zbliżaj się do drzew, które milczą.”'],
  kupiec: ['„Targ otwarty od świtu.”', '„Ceny? Uczciwe jak zawsze.”'],
  rybak: ['„Ryby świeże, prosto z sieci.”', '„Morze dziś spokojne. Za spokojne.”'],
  duch: ['„Zimno…”', '„Słyszysz mnie?”'],
};

export const NPCS = {
  eryn: {
    name: 'Stary Eryn', role: 'Starosta Wilczej Doliny',
    pos: [8, 344], rot: -0.45, radius: 4.2,
    visual: { tunic: '#5c4a33', pants: '#3a3228', hair: '#b9b0a0', beard: true, skin: '#c79a71', bulk: 1.0, cloak: '#4a4034' },
    tree: withSmallTalk(erynTree, 'eryn'),
  },
  borys: {
    name: 'Borys Kowal', role: 'Kowal',
    pos: [-16, 353], rot: 1.6, radius: 4.2,
    visual: { tunic: '#4a3a2c', pants: '#33291f', hair: '#2a1d14', beard: true, skin: '#b98258', bulk: 1.16, armor: '#5b5548', scar: true },
    tree: withSmallTalk(borysTree, 'borys'),
  },
  marena: {
    name: 'Marena Zielarka', role: 'Zielarka',
    pos: [23, 340], rot: -1.1, radius: 4.2,
    visual: { tunic: '#3f5a42', pants: '#3a3b2e', hair: '#8a6b45', skin: '#d2a67d', bulk: 0.94, cloak: '#2f4a37' },
    tree: withSmallTalk(marenaTree, 'marena'),
  },
  zorzan: {
    name: 'Kupiec Zorzan', role: 'Wędrowny kupiec',
    pos: [11, 371], rot: 1.0, radius: 4.2,
    visual: { tunic: '#5a3f52', pants: '#382e3a', hair: '#241a16', skin: '#c9976d', bulk: 1.02, cloak: '#45304a', hood: '#3a2840' },
    tree: withSmallTalk(zorzanTree, 'zorzan'),
  },
  wilk: {
    name: 'Strażnik Wilk', role: 'Straż wioski',
    pos: [4, 313], rot: 0.15, radius: 4.0,
    visual: { tunic: '#4c4e52', pants: '#33373b', hair: '#3a2b1f', skin: '#cba07a', bulk: 1.1, armor: '#5e6367' },
    tree: withSmallTalk(wilkTree, 'wilk'),
  },
  iskra: {
    name: 'Iskra', role: 'Uczennica zielarki',
    pos: [27, 344], rot: 2.4, radius: 4.0,
    visual: { tunic: '#5d6a4c', pants: '#3c4032', hair: '#b8542f', skin: '#e0b48a', bulk: 0.84 },
    tree: withSmallTalk(iskraTree, 'iskra'),
  },
  pustelnik: {
    name: 'Pustelnik Ivar', role: 'Samotnik z Ciemnego Lasu',
    pos: [-556, -196], rot: 0.9, radius: 4.4,
    visual: { tunic: '#46503c', pants: '#33372c', hair: '#c8c2b2', beard: true, skin: '#c39a76', bulk: 0.9, cloak: '#37402f', hood: '#3c4636' },
    tree: withSmallTalk(pustelnikTree, 'pustelnik'),
  },
  kupiec: {
    name: 'Kupiec Bogdan', role: 'Handlarz z Kotliny',
    pos: [172, 256], rot: 2.2, radius: 4.4,
    visual: { tunic: '#5b4636', pants: '#3a3026', hair: '#2d2119', skin: '#c08a5e', bulk: 1.08, cloak: '#6a4a3a', hood: '#4a3628' },
    tree: withSmallTalk(kupiecTree, 'kupiec'),
  },
  rybak: {
    name: 'Rybak Tobiasz', role: 'Rybak z nadmorskich chat',
    pos: [-8, 610], rot: 2.7, radius: 4.4,
    visual: { tunic: '#4c5a5e', pants: '#333c40', hair: '#5a4a33', beard: true, skin: '#c09468', bulk: 1.05, cloak: '#3b4a4e', hood: '#33403f' },
    tree: withSmallTalk(rybakTree, 'rybak'),
  },
  duch: {
    name: 'Cień pod Łukiem', role: 'Zjawisko',
    pos: [-148, -534], rot: 0.4, radius: 5.0, ghost: true, hidden: true,
    visual: { tunic: '#3d4a52', pants: '#2f3a40', hair: '#20282c', skin: '#8fa6ad', bulk: 1.0, cloak: '#2a3a44', eyeColor: '#8fe0ff' },
    tree: withSmallTalk(ghostTree, 'duch'),
  },
};

export const SHOPS = {
  fisher: {
    name: 'Rybak Tobiasz',
    stock: ['lake_fish', 'lake_fish', 'lake_fish', 'bread', 'health_potion', 'herbs'],
  },
  zorzan: {
    name: 'Kupiec Zorzan',
    stock: ['health_potion', 'mana_potion', 'bread', 'leather_hood', 'leather_vest', 'hunter_bow', 'iron_ore', 'herbs', 'health_potion'],
  },
  marena: {
    name: 'Marena Zielarka',
    stock: ['health_potion', 'mana_potion', 'might_elixir', 'herbs', 'herbs', 'crystal_mana'],
  },
  bogdan: {
    name: 'Kupiec Bogdan',
    stock: ['health_potion', 'mana_potion', 'bread', 'iron_ore', 'ancient_metal', 'iron_axe', 'hunter_bow', 'leather_vest', 'might_elixir'],
  },
};

// Wskazówki wyświetlane przy ładowaniu ekranu.
export const TIPS = [
  'Walka wręcz nagradza cierpliwość — unik w odpowiednim momencie otwiera kontratak.',
  'Nocą wilki są szybsze, a w kurhanie pojawia się coś, czego nie ma w dzień.',
  'Odpoczynek przy ognisku leczy rany i przesuwa czas do świtu.',
  'Zbieraj zioła i rudę — rzemiosło bywa cenniejsze niż złoto.',
  'Krytyczne trafienia zależą od zręczności, ale każde ostrze ma swoją wagę.',
  'Krainę otacza morze — na horyzoncie pali się latarnia, a przez mieliznę można dojść do Samotnej Skały.',
  'Postacie mówią na głos. Klawisz V wyłącza i włącza głosy, jeśli przeszkadzają.',
  'W chacie rybaków na północnym brzegu kupisz ryby i usłyszysz, co spotkało „Zimną Falę”.',
  'Pogoda zmienia się sama: słońce, chmury, deszcz, mgła. W ulewie wilki trudniej cię wytropią.',
];

// Pozycje w danych podajemy w metrach „autorskich” (czytelne liczby), a gra
// dostaje je już przeliczone na metry świata — dzięki temu powiększenie mapy
// nie wymaga poprawiania każdej współrzędnej w dialogach.
for (const def of Object.values(NPCS)) {
  if (Array.isArray(def.pos)) def.pos = [def.pos[0] * WORLD_SCALE, def.pos[1] * WORLD_SCALE];
  if (Array.isArray(def.home)) def.home = [def.home[0] * WORLD_SCALE, def.home[1] * WORLD_SCALE];
}
