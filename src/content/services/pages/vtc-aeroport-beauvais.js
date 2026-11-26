// ── Page service : VTC aéroport Paris-Beauvais (Beauvais-Tillé) ──────
// Contenu unique par langue. Prix : ligne « beauvais » du tableau des
// tarifs (Beauvais ↔ Paris), mention « tarif indicatif ».
// ────────────────────────────────────────────────────────────────────

export default {
  i18n: {
    fr: {
      h1: 'VTC aéroport de Beauvais : chauffeur privé entre Paris et Beauvais-Tillé',
      intro: [
        'L’aéroport de Paris-Beauvais, situé à Tillé dans l’Oise, est à environ 85 kilomètres au nord de Paris. Il accueille principalement des compagnies à bas coûts, avec de nombreux vols tôt le matin ou tard le soir, à des heures où les transports en commun sont rares. CDG TRANSFERT VTC vous y conduit depuis Paris, ou vous ramène chez vous, 24 heures sur 24 et 7 jours sur 7.',
        'Avec un chauffeur privé, vous partez directement de votre domicile ou de votre hôtel, sans rejoindre d’abord un point de départ de navette en autocar. Vous réservez en ligne, vous voyez immédiatement une estimation, puis votre course est confirmée par téléphone ou par WhatsApp.',
      ],
      sections: [
        { h2: 'Tarif d’un VTC entre Paris et l’aéroport de Beauvais', rates: true, paras: [
          'Le prix d’un transfert entre Paris et Beauvais dépend de la catégorie de véhicule. Les montants ci-dessous sont ceux de notre grille de tarifs : ils sont indicatifs et vous sont confirmés avant la course.',
          'Si vous partez d’une commune hors de Paris ou d’un autre aéroport (Roissy-CDG, Orly), le prix est établi sur devis : indiquez simplement vos adresses dans le formulaire de réservation.',
          'À plusieurs, le prix de la course se partage : un van Mercedes Classe V transporte jusqu’à 6 passagers et 6 valises en un seul trajet.',
        ] },
        { h2: 'Temps de trajet entre Paris et Beauvais selon l’heure', paras: [
          'Comptez en moyenne entre 1 h 15 et 1 h 30 depuis le centre de Paris. Le trajet emprunte principalement l’autoroute A16 ; la sortie de Paris par le nord, souvent encombrée aux heures de pointe, peut allonger sensiblement la durée.',
        ], times: [
          ['La nuit (22 h – 6 h)', '1 h à 1 h 15'],
          ['En journée hors heures de pointe (10 h – 16 h)', '1 h 15 à 1 h 30'],
          ['Heures de pointe (7 h – 10 h et 16 h – 20 h)', '1 h 30 à 2 h 15'],
          ['Le week-end', '1 h 10 à 1 h 30'],
        ], after: [
          'Les compagnies à bas coûts ferment souvent l’enregistrement et l’embarquement tôt avant le départ : précisez l’heure de votre vol lors de la confirmation de votre course afin de fixer ensemble une heure de prise en charge qui vous laisse une marge confortable.',
        ] },
        { h2: 'Où retrouver votre chauffeur à l’aéroport de Beauvais', paras: [
          'L’aéroport compte deux terminaux, le Terminal 1 et le Terminal 2, situés à quelques minutes à pied l’un de l’autre. Votre carte d’embarquement ou l’application de votre compagnie précise le terminal de votre vol.',
          'Lors de la confirmation de votre course, précisez votre numéro de vol et votre heure d’arrivée prévue. Le lieu exact de prise en charge vous est confirmé par téléphone ou WhatsApp avant la course.',
        ], list: [
          'À l’arrivée : une fois sorti de la zone de récupération des bagages, appelez votre chauffeur au numéro communiqué lors de la confirmation.',
          'Au départ : le chauffeur vous dépose devant le terminal de votre vol.',
          'En cas de retard ou de changement d’horaire, prévenez-nous par téléphone ou WhatsApp.',
        ] },
        { h2: 'Ce qui est inclus dans votre transfert Beauvais', list: [
          'Le trajet direct entre votre adresse à Paris et l’aéroport de Beauvais, ou l’inverse.',
          'Le véhicule de la catégorie choisie, avec son chauffeur.',
          'Le prix confirmé avant la course, selon le tableau des tarifs.',
          'Vos bagages dans la limite de la capacité du véhicule : 2 grandes valises et 2 petites en Mercedes Classe E ou Classe S, 4 valises en Tesla, 6 valises en Mercedes Classe V.',
          'Les péages, l’eau à bord, la facture et jusqu’à 1 h d’attente après l’atterrissage ; un retard de vol n’est jamais facturé.',
          'La confirmation de votre course par téléphone ou WhatsApp.',
        ], paras: [
          'Aucun paiement n’est demandé sur le site : vous envoyez une demande de réservation et le prix vous est confirmé avant le départ.',
        ] },
        { h2: 'Pourquoi choisir un VTC pour aller à Beauvais ?', paras: [
          'Pour un vol à 6 h ou 7 h du matin, rejoindre Beauvais en transports en commun impose souvent de partir en pleine nuit. Un chauffeur vient vous chercher à l’heure convenue, à votre porte, et vous dépose directement à l’aéroport. Au retour, il vous ramène à votre adresse sans changement ni correspondance, même tard le soir.',
          'Pour un trajet de plus d’une heure, le confort compte : la Tesla et la Mercedes Classe E conviennent à un ou deux voyageurs, la Mercedes Classe S offre le plus haut niveau de confort, et le van Mercedes Classe V accueille les familles et les groupes.',
        ] },
      ],
      faq: [
        { q: 'Combien coûte un VTC entre Paris et l’aéroport de Beauvais ?', a: 'Selon le véhicule : 150 € en Tesla, 200 € en Mercedes Classe E, 250 € en Mercedes Classe V et 300 € en Mercedes Classe S. Ces tarifs sont indicatifs et confirmés avant la course.' },
        { q: 'Combien de temps dure le trajet entre Paris et Beauvais ?', a: 'Environ 1 h à 1 h 15 la nuit, 1 h 15 à 1 h 30 en journée hors heures de pointe et jusqu’à 2 h 15 aux heures de pointe, selon le trafic.' },
        { q: 'Pouvez-vous m’emmener à Beauvais pour un vol très tôt le matin ?', a: 'Oui, CDG TRANSFERT VTC est disponible 24 h/24 et 7 j/7. Précisez l’heure de votre vol lors de la confirmation de votre course pour convenir de l’heure de prise en charge.' },
        { q: 'À quelle distance de Paris se trouve l’aéroport de Beauvais ?', a: 'L’aéroport de Paris-Beauvais se trouve à Tillé, dans l’Oise, à environ 85 kilomètres au nord de Paris.' },
        { q: 'Faites-vous le trajet entre Beauvais et Roissy-CDG ou Orly ?', a: 'Oui, sur devis, car ces trajets ne figurent pas dans le tableau des tarifs. Indiquez vos adresses dans le formulaire pour recevoir une proposition.' },
        { q: 'Combien de passagers pour un transfert vers Beauvais ?', a: 'Jusqu’à 3 passagers en Mercedes Classe E ou Classe S, 4 en Tesla et 6 en van Mercedes Classe V.' },
        { q: 'Que se passe-t-il si mon vol a du retard ?', a: 'Votre vol est suivi en temps réel : un retard n’est jamais facturé, même de 4 ou 5 heures. L’attente est incluse jusqu’à 1 h après l’atterrissage ; au-delà (bagages, formalités…), elle est facturée au tarif horaire de la catégorie du véhicule.' },
      ],
    },
    en: {
      h1: 'Beauvais airport transfer: private chauffeur between Paris and Beauvais-Tillé',
      intro: [
        'Paris-Beauvais airport, located in Tillé in the Oise department, is about 85 kilometres north of Paris. It mainly serves low-cost airlines, with many flights early in the morning or late at night, when public transport is scarce. CDG TRANSFERT VTC takes you there from Paris, or brings you back home, 24 hours a day, 7 days a week.',
        'With a private chauffeur you leave straight from your home or hotel, without first travelling to a coach shuttle departure point. You book online, see an instant estimate, and your ride is then confirmed by phone or WhatsApp.',
      ],
      sections: [
        { h2: 'Fares for a chauffeur between Paris and Beauvais airport', rates: true, paras: [
          'The price of a transfer between Paris and Beauvais depends on the vehicle category. The amounts below come from our price list: they are indicative and confirmed before the ride.',
          'If you are leaving from a town outside Paris or from another airport (Roissy-CDG, Orly), the price is given on quote: simply enter your addresses in the booking form.',
          'When travelling as a group, the fare is shared: a Mercedes V-Class van carries up to 6 passengers and 6 suitcases in a single trip.',
        ] },
        { h2: 'Travel time between Paris and Beauvais by time of day', paras: [
          'Allow 1 h 15 to 1 h 30 on average from central Paris. The route mainly follows the A16 motorway; leaving Paris to the north, often congested at rush hour, can add a lot of time.',
        ], times: [
          ['At night (10 pm – 6 am)', '1 h to 1 h 15'],
          ['Daytime, off-peak (10 am – 4 pm)', '1 h 15 to 1 h 30'],
          ['Rush hour (7 – 10 am and 4 – 8 pm)', '1 h 30 to 2 h 15'],
          ['At weekends', '1 h 10 to 1 h 30'],
        ], after: [
          'Low-cost airlines often close check-in and boarding well before departure: give us your flight time when we confirm your ride so that we can set a pick-up time together that leaves you a comfortable margin.',
        ] },
        { h2: 'Where to meet your chauffeur at Beauvais airport', paras: [
          'The airport has two terminals, Terminal 1 and Terminal 2, a few minutes’ walk from each other. Your boarding pass or your airline’s app shows the terminal of your flight.',
          'When we confirm your ride, give us your flight number and expected arrival time. The exact pick-up point is confirmed by phone or WhatsApp before the ride.',
        ], list: [
          'On arrival: once you have left baggage reclaim, call your chauffeur on the number given in the confirmation.',
          'On departure: the chauffeur drops you off in front of your flight’s terminal.',
          'If your flight is delayed or rescheduled, let us know by phone or WhatsApp.',
        ] },
        { h2: 'What your Beauvais transfer includes', list: [
          'The direct trip between your address in Paris and Beauvais airport, or the other way round.',
          'A vehicle of the category you chose, with its chauffeur.',
          'The fare confirmed before the ride, based on the price list.',
          'Your luggage within the vehicle’s capacity: 2 large and 2 small suitcases in a Mercedes E-Class or S-Class, 4 suitcases in a Tesla, 6 suitcases in a Mercedes V-Class.',
          'Tolls, water on board, an invoice and up to 1 hour of waiting after landing; flight delays are never charged.',
          'Confirmation of your ride by phone or WhatsApp.',
        ], paras: [
          'No payment is taken on the website: you send a booking request and the fare is confirmed before departure.',
        ] },
        { h2: 'Why choose a private chauffeur for Beauvais?', paras: [
          'For a 6 or 7 am flight, getting to Beauvais by public transport often means leaving in the middle of the night. A chauffeur picks you up at the agreed time, at your door, and drops you off right at the airport. On the way back, you are driven to your address with no changes or connections, even late at night.',
          'On a trip of more than an hour, comfort matters: the Tesla and the Mercedes E-Class suit one or two travellers, the Mercedes S-Class offers the highest level of comfort, and the Mercedes V-Class van welcomes families and groups.',
        ] },
      ],
      faq: [
        { q: 'How much is a chauffeur between Paris and Beauvais airport?', a: 'It depends on the vehicle: €150 in a Tesla, €200 in a Mercedes E-Class, €250 in a Mercedes V-Class and €300 in a Mercedes S-Class. These fares are indicative and confirmed before the ride.' },
        { q: 'How long is the drive between Paris and Beauvais?', a: 'About 1 h to 1 h 15 at night, 1 h 15 to 1 h 30 during off-peak daytime hours and up to 2 h 15 at rush hour, depending on traffic.' },
        { q: 'Can you take me to Beauvais for a very early flight?', a: 'Yes, CDG TRANSFERT VTC is available 24/7. Give us your flight time when we confirm your ride so that we can agree on the pick-up time.' },
        { q: 'How far is Beauvais airport from Paris?', a: 'Paris-Beauvais airport is in Tillé, in the Oise department, about 85 kilometres north of Paris.' },
        { q: 'Do you drive between Beauvais and Roissy-CDG or Orly?', a: 'Yes, on quote, as these trips are not in the price list. Enter your addresses in the form to receive a proposal.' },
        { q: 'How many passengers can travel to Beauvais?', a: 'Up to 3 passengers in a Mercedes E-Class or S-Class, 4 in a Tesla and 6 in a Mercedes V-Class van.' },
        { q: 'What happens if my flight is delayed?', a: 'Your flight is tracked in real time: a delay is never charged, even one of 4 or 5 hours. Waiting time is included for up to 1 hour after landing; beyond that (baggage, formalities…), it is charged at the hourly rate of the vehicle category.' },
      ],
    },
    ru: {
      h1: 'Трансфер в аэропорт Бове: частный водитель между Парижем и Бове-Тилле',
      intro: [
        'Аэропорт Париж — Бове находится в коммуне Тилле в департаменте Уаза, примерно в 85 километрах к северу от Парижа. Он принимает в основном лоукостеров, и многие рейсы вылетают рано утром или прилетают поздно вечером — в часы, когда общественный транспорт почти не ходит. CDG TRANSFERT VTC отвезёт вас туда из Парижа или доставит обратно домой круглосуточно и без выходных.',
        'С частным водителем вы выезжаете прямо от дома или отеля, и вам не нужно сначала добираться до остановки автобусного шаттла. Вы бронируете онлайн, сразу видите ориентировочную стоимость, а затем поездка подтверждается по телефону или в WhatsApp.',
      ],
      sections: [
        { h2: 'Стоимость трансфера между Парижем и аэропортом Бове', rates: true, paras: [
          'Цена трансфера между Парижем и Бове зависит от категории автомобиля. Суммы ниже взяты из нашего прайс-листа: они ориентировочные и подтверждаются до поездки.',
          'Если вы выезжаете из города за пределами Парижа или из другого аэропорта (Руасси-CDG, Орли), стоимость рассчитывается по запросу: просто укажите адреса в форме бронирования.',
          'В компании стоимость поездки делится на всех: минивэн Mercedes V-класса перевозит до 6 пассажиров и 6 чемоданов за одну поездку.',
        ] },
        { h2: 'Время в пути между Парижем и Бове в зависимости от часа', paras: [
          'От центра Парижа в среднем 1 ч 15 мин – 1 ч 30 мин. Маршрут проходит в основном по автомагистрали A16; выезд из Парижа на север, часто загруженный в часы пик, может заметно увеличить время в пути.',
        ], times: [
          ['Ночью (22:00 – 6:00)', 'от 1 ч до 1 ч 15 мин'],
          ['Днём вне часов пик (10:00 – 16:00)', 'от 1 ч 15 мин до 1 ч 30 мин'],
          ['Часы пик (7:00 – 10:00 и 16:00 – 20:00)', 'от 1 ч 30 мин до 2 ч 15 мин'],
          ['В выходные', 'от 1 ч 10 мин до 1 ч 30 мин'],
        ], after: [
          'Лоукостеры часто закрывают регистрацию и посадку задолго до вылета: сообщите время рейса при подтверждении поездки, чтобы мы вместе выбрали время подачи автомобиля с комфортным запасом.',
        ] },
        { h2: 'Где встретиться с водителем в аэропорту Бове', paras: [
          'В аэропорту два терминала — Терминал 1 и Терминал 2, между ними несколько минут пешком. Терминал вашего рейса указан в посадочном талоне или в приложении авиакомпании.',
          'При подтверждении поездки сообщите номер рейса и ожидаемое время прилёта. Точное место посадки подтверждается по телефону или в WhatsApp до поездки.',
        ], list: [
          'При прилёте: выйдя из зоны выдачи багажа, позвоните водителю по номеру из подтверждения.',
          'При вылете: водитель высадит вас у терминала вашего рейса.',
          'Если рейс задерживается или переносится, сообщите нам по телефону или в WhatsApp.',
        ] },
        { h2: 'Что входит в трансфер в Бове', list: [
          'Прямая поездка между вашим адресом в Париже и аэропортом Бове или в обратном направлении.',
          'Автомобиль выбранной категории с водителем.',
          'Цена, подтверждённая до поездки, согласно таблице тарифов.',
          'Багаж в пределах вместимости автомобиля: 2 больших и 2 маленьких чемодана в Mercedes E-класса или S-класса, 4 чемодана в Tesla, 6 чемоданов в Mercedes V-класса.',
          'Платные дороги, вода в салоне, счёт и до 1 часа ожидания после посадки; задержка рейса не оплачивается.',
          'Подтверждение поездки по телефону или в WhatsApp.',
        ], paras: [
          'На сайте ничего не нужно оплачивать: вы отправляете заявку на бронирование, а цена подтверждается до выезда.',
        ] },
        { h2: 'Почему стоит выбрать частного водителя до Бове?', paras: [
          'Чтобы успеть на рейс в 6 или 7 утра на общественном транспорте, часто приходится выезжать посреди ночи. Водитель заберёт вас в согласованное время прямо от двери и высадит у аэропорта. На обратном пути он доставит вас по вашему адресу без пересадок, даже поздно вечером.',
          'В поездке дольше часа важен комфорт: Tesla и Mercedes E-класса подходят для одного-двух пассажиров, Mercedes S-класса — самый комфортный автомобиль нашего автопарка, а минивэн Mercedes V-класса рассчитан на семьи и группы.',
        ] },
      ],
      faq: [
        { q: 'Сколько стоит трансфер между Парижем и аэропортом Бове?', a: 'В зависимости от автомобиля: 150 € на Tesla, 200 € на Mercedes E-класса, 250 € на Mercedes V-класса и 300 € на Mercedes S-класса. Тарифы ориентировочные и подтверждаются до поездки.' },
        { q: 'Сколько времени ехать из Парижа в Бове?', a: 'Ночью около 1 ч – 1 ч 15 мин, днём вне часов пик 1 ч 15 мин – 1 ч 30 мин, а в часы пик — до 2 ч 15 мин, в зависимости от трафика.' },
        { q: 'Можно ли поехать в Бове к очень раннему рейсу?', a: 'Да, CDG TRANSFERT VTC работает круглосуточно и без выходных. Сообщите время вылета при подтверждении поездки, чтобы согласовать время подачи автомобиля.' },
        { q: 'Как далеко аэропорт Бове от Парижа?', a: 'Аэропорт Париж — Бове находится в коммуне Тилле (департамент Уаза), примерно в 85 километрах к северу от Парижа.' },
        { q: 'Вы ездите между Бове и аэропортами Руасси-CDG или Орли?', a: 'Да, по запросу, так как этих маршрутов нет в таблице тарифов. Укажите адреса в форме, чтобы получить предложение.' },
        { q: 'Сколько пассажиров можно отвезти в Бове?', a: 'До 3 пассажиров в Mercedes E-класса или S-класса, 4 — в Tesla и 6 — в минивэне Mercedes V-класса.' },
        { q: 'Что будет, если мой рейс задержится?', a: 'Мы отслеживаем ваш рейс в реальном времени: задержка никогда не оплачивается, даже на 4–5 часов. Ожидание включено в течение 1 часа после посадки; сверх этого (багаж, формальности…) оно оплачивается по почасовому тарифу категории автомобиля.' },
      ],
    },
    ro: {
      h1: 'Transfer aeroport Beauvais: șofer privat între Paris și Beauvais-Tillé',
      intro: [
        'Aeroportul Paris-Beauvais, situat la Tillé, în departamentul Oise, se află la aproximativ 85 de kilometri nord de Paris. Este folosit mai ales de companiile low-cost, cu multe zboruri dis-de-dimineață sau seara târziu, la ore la care transportul public este rar. CDG TRANSFERT VTC vă duce acolo din Paris sau vă aduce înapoi acasă, 24 de ore din 24, 7 zile din 7.',
        'Cu un șofer privat plecați direct de acasă sau de la hotel, fără să mergeți mai întâi la punctul de plecare al unui autocar-navetă. Rezervați online, vedeți imediat o estimare, iar cursa vă este apoi confirmată prin telefon sau WhatsApp.',
      ],
      sections: [
        { h2: 'Tariful unui VTC între Paris și aeroportul Beauvais', rates: true, paras: [
          'Prețul unui transfer între Paris și Beauvais depinde de categoria vehiculului. Sumele de mai jos provin din lista noastră de prețuri: sunt orientative și vă sunt confirmate înainte de cursă.',
          'Dacă plecați dintr-o localitate din afara Parisului sau de pe alt aeroport (Roissy-CDG, Orly), prețul se stabilește la cerere: completați adresele în formularul de rezervare.',
          'În grup, prețul cursei se împarte: un van Mercedes Clasa V transportă până la 6 pasageri și 6 valize într-o singură cursă.',
        ] },
        { h2: 'Durata drumului între Paris și Beauvais în funcție de oră', paras: [
          'Socotiți în medie între 1 h 15 și 1 h 30 din centrul Parisului. Traseul urmează în principal autostrada A16; ieșirea din Paris spre nord, des aglomerată la orele de vârf, poate prelungi considerabil durata.',
        ], times: [
          ['Noaptea (22:00 – 6:00)', '1 h – 1 h 15'],
          ['Ziua, în afara orelor de vârf (10:00 – 16:00)', '1 h 15 – 1 h 30'],
          ['Orele de vârf (7:00 – 10:00 și 16:00 – 20:00)', '1 h 30 – 2 h 15'],
          ['În weekend', '1 h 10 – 1 h 30'],
        ], after: [
          'Companiile low-cost închid adesea check-in-ul și îmbarcarea cu mult înainte de plecare: comunicați-ne ora zborului la confirmarea cursei pentru a stabili împreună o oră de preluare care să vă lase o marjă confortabilă.',
        ] },
        { h2: 'Unde vă găsiți șoferul la aeroportul Beauvais', paras: [
          'Aeroportul are două terminale, Terminalul 1 și Terminalul 2, la câteva minute de mers pe jos unul de altul. Cartea de îmbarcare sau aplicația companiei indică terminalul zborului dumneavoastră.',
          'La confirmarea cursei, comunicați-ne numărul zborului și ora estimată de sosire. Locul exact de preluare vă este confirmat prin telefon sau WhatsApp înainte de cursă.',
        ], list: [
          'La sosire: după ce ieșiți din zona de bagaje, sunați-vă șoferul la numărul comunicat în confirmare.',
          'La plecare: șoferul vă lasă în fața terminalului zborului dumneavoastră.',
          'În caz de întârziere sau de schimbare a orarului, anunțați-ne prin telefon sau WhatsApp.',
        ] },
        { h2: 'Ce include transferul la Beauvais', list: [
          'Cursa directă între adresa dumneavoastră din Paris și aeroportul Beauvais, sau invers.',
          'Vehiculul din categoria aleasă, cu șoferul său.',
          'Prețul confirmat înainte de cursă, conform tabelului de tarife.',
          'Bagajele în limita capacității vehiculului: 2 valize mari și 2 mici în Mercedes Clasa E sau Clasa S, 4 valize în Tesla, 6 valize în Mercedes Clasa V.',
          'Taxele de autostradă, apa la bord, factura și până la 1 oră de așteptare după aterizare; întârzierea zborului nu se facturează.',
          'Confirmarea cursei prin telefon sau WhatsApp.',
        ], paras: [
          'Site-ul nu cere nicio plată: trimiteți o cerere de rezervare, iar prețul vă este confirmat înainte de plecare.',
        ] },
        { h2: 'De ce să alegeți un șofer privat pentru Beauvais?', paras: [
          'Pentru un zbor la 6 sau 7 dimineața, a ajunge la Beauvais cu transportul public înseamnă adesea să plecați în miez de noapte. Un șofer vă ia de la ușă la ora convenită și vă lasă direct la aeroport. La întoarcere, vă duce la adresa dumneavoastră fără schimbări, chiar și seara târziu.',
          'Pe un drum de peste o oră, confortul contează: Tesla și Mercedes Clasa E sunt potrivite pentru unul sau doi călători, Mercedes Clasa S oferă cel mai înalt nivel de confort, iar van-ul Mercedes Clasa V primește familiile și grupurile.',
        ] },
      ],
      faq: [
        { q: 'Cât costă un VTC între Paris și aeroportul Beauvais?', a: 'În funcție de vehicul: 150 € cu Tesla, 200 € cu Mercedes Clasa E, 250 € cu Mercedes Clasa V și 300 € cu Mercedes Clasa S. Tarifele sunt orientative și confirmate înainte de cursă.' },
        { q: 'Cât durează drumul între Paris și Beauvais?', a: 'Aproximativ 1 h – 1 h 15 noaptea, 1 h 15 – 1 h 30 ziua în afara orelor de vârf și până la 2 h 15 la orele de vârf, în funcție de trafic.' },
        { q: 'Mă puteți duce la Beauvais pentru un zbor foarte devreme?', a: 'Da, CDG TRANSFERT VTC este disponibil 24/7. Comunicați-ne ora zborului la confirmarea cursei pentru a stabili ora de preluare.' },
        { q: 'La ce distanță de Paris se află aeroportul Beauvais?', a: 'Aeroportul Paris-Beauvais se află la Tillé, în departamentul Oise, la aproximativ 85 de kilometri nord de Paris.' },
        { q: 'Faceți cursa între Beauvais și Roissy-CDG sau Orly?', a: 'Da, la cerere, deoarece aceste trasee nu figurează în tabelul de tarife. Completați adresele în formular pentru a primi o ofertă.' },
        { q: 'Câți pasageri pot merge la Beauvais?', a: 'Până la 3 pasageri în Mercedes Clasa E sau Clasa S, 4 în Tesla și 6 în van-ul Mercedes Clasa V.' },
        { q: 'Ce se întâmplă dacă zborul meu întârzie?', a: 'Zborul dumneavoastră este urmărit în timp real: o întârziere nu este niciodată facturată, chiar și de 4 sau 5 ore. Așteptarea este inclusă până la 1 oră după aterizare; peste acest timp (bagaje, formalități…), se facturează la tariful orar al categoriei vehiculului.' },
      ],
    },
  },
}
