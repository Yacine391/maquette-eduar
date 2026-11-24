// ── Page service : VTC aéroport Paris-Charles-de-Gaulle (Roissy) ─────
// Contenu unique par langue. Prix : lignes du tableau (rates), jamais en dur
// hors FAQ (et alors identiques au tableau — vérifié par tests/seo.test.js).
// ────────────────────────────────────────────────────────────────────

export default {
  i18n: {
    fr: {
      h1: 'VTC aéroport CDG : chauffeur privé entre Paris et Roissy-Charles-de-Gaulle',
      intro: [
        'Vous arrivez à l’aéroport Paris-Charles-de-Gaulle ou vous devez y être à l’heure pour un vol ? CDG TRANSFERT VTC assure vos transferts en voiture avec chauffeur entre Paris, l’Île-de-France et l’aéroport de Roissy, 24 heures sur 24 et 7 jours sur 7. Vous réservez en ligne en quelques minutes, vous voyez immédiatement une estimation du prix, puis votre course est confirmée par téléphone ou par WhatsApp.',
        'Situé à environ 25 kilomètres au nord-est de Paris, l’aéroport Charles-de-Gaulle est relié à la capitale par les autoroutes A1 et A3, souvent chargées. Un chauffeur privé vous évite les correspondances en RER, les files aux stations de taxis et le transport de vos bagages dans les transports en commun : il vous prend en charge à l’adresse de votre choix et vous dépose devant votre terminal.',
      ],
      sections: [
        { h2: 'Tarif d’un VTC entre Paris et l’aéroport CDG', rates: true, paras: [
          'Le prix d’un transfert entre l’aéroport Charles-de-Gaulle et Paris dépend uniquement de la catégorie de véhicule choisie. Les tarifs ci-dessous sont ceux de notre grille : ils sont indicatifs et vous sont confirmés avant la course, lors de la confirmation par téléphone ou WhatsApp.',
          'Pour un trajet entre l’aéroport et une ville hors de Paris (La Défense, Versailles, Disneyland Paris…), le prix est établi sur devis : indiquez simplement vos adresses dans le formulaire de réservation.',
        ] },
        { h2: 'Temps de trajet entre Paris et Roissy-CDG selon l’heure', paras: [
          'Comptez en moyenne 45 minutes à 1 heure entre le centre de Paris et l’aéroport Charles-de-Gaulle. La durée varie fortement selon le jour et l’heure : l’autoroute A1 et le boulevard périphérique sont saturés aux heures de pointe, surtout le matin en direction de Paris et en fin de journée vers l’aéroport.',
        ], times: [
          ['La nuit (22 h – 6 h)', '30 à 40 min'],
          ['En journée hors heures de pointe (10 h – 16 h)', '40 à 55 min'],
          ['Heures de pointe (7 h – 10 h et 16 h – 20 h)', '55 min à 1 h 30'],
          ['Le week-end', '35 à 50 min'],
        ], after: [
          'Pour un départ, prévoyez une marge suffisante pour l’enregistrement et les contrôles de sûreté : précisez l’heure de votre vol lors de la confirmation de votre course afin de convenir ensemble de l’heure de prise en charge.',
        ] },
        { h2: 'Où retrouver votre chauffeur à l’aéroport Charles-de-Gaulle', paras: [
          'L’aéroport compte trois terminaux : le Terminal 1, bâtiment circulaire ; le Terminal 2, divisé en halls 2A à 2G ; et le Terminal 3, proche de la gare Roissypôle. Le train automatique gratuit CDGVAL relie le Terminal 1, le Terminal 3 et la gare du Terminal 2, où se trouvent aussi la gare TGV et la gare RER de l’aéroport.',
          'Lors de la confirmation de votre course, précisez votre numéro de vol, votre terminal si vous le connaissez et votre heure d’arrivée prévue. Le lieu exact de prise en charge vous est confirmé par téléphone ou WhatsApp avant la course.',
        ], list: [
          'À l’arrivée : récupérez vos bagages, puis contactez votre chauffeur au numéro communiqué lors de la confirmation.',
          'Au départ : le chauffeur vous dépose devant le terminal de votre compagnie ; vérifiez-le sur votre carte d’embarquement.',
          'Gardez votre téléphone allumé à l’atterrissage pour rester joignable.',
        ] },
        { h2: 'Ce qui est inclus dans votre transfert CDG', list: [
          'Le trajet de porte à porte entre l’adresse de prise en charge et la destination indiquées à la réservation.',
          'Le véhicule de la catégorie choisie, avec son chauffeur.',
          'Le prix confirmé avant la course, selon le tableau des tarifs.',
          'Vos bagages dans la limite de la capacité du véhicule : 2 grandes valises et 2 petites en Mercedes Classe E ou Classe S, 4 valises en Tesla, 7 valises en Mercedes Classe V.',
          'Les péages, l’eau à bord, la facture et jusqu’à 1 h d’attente après l’atterrissage ; un retard de vol n’est jamais facturé.',
          'La confirmation de votre course par téléphone ou WhatsApp.',
        ], paras: [
          'Aucun paiement n’est demandé sur le site : vous envoyez simplement une demande de réservation, et le prix vous est confirmé avant le départ.',
        ] },
        { h2: 'Quel véhicule choisir pour aller à Roissy ?', paras: [
          'Seul ou à deux avec des bagages standards, la Tesla, 100 % électrique, ou la Mercedes Classe E conviennent parfaitement. Pour un voyage d’affaires, la Mercedes Classe S offre le plus haut niveau de confort de notre flotte. En famille ou en groupe, le van Mercedes Classe V accueille jusqu’à 6 passagers et 7 valises, ce qui évite de réserver deux voitures.',
        ] },
      ],
      faq: [
        { q: 'Combien coûte un VTC entre Paris et l’aéroport CDG ?', a: 'Selon la catégorie de véhicule : 65 € en Tesla, 99 € en Mercedes Classe E, 130 € en Mercedes Classe V et 170 € en Mercedes Classe S. Ces tarifs sont indicatifs et confirmés avant la course.' },
        { q: 'Combien de temps faut-il pour aller de Paris à Roissy-Charles-de-Gaulle ?', a: 'Entre 30 et 40 minutes la nuit, 40 à 55 minutes en journée hors heures de pointe et jusqu’à 1 h 30 aux heures de pointe, selon le trafic.' },
        { q: 'Êtes-vous disponibles tôt le matin ou tard le soir ?', a: 'Oui, CDG TRANSFERT VTC est disponible 24 h/24 et 7 j/7, y compris pour les vols très matinaux et les arrivées de nuit.' },
        { q: 'Comment réserver un chauffeur pour l’aéroport CDG ?', a: 'Remplissez le formulaire de réservation de cette page (date, heure, adresses, véhicule) ou appelez le +33 6 65 69 96 78. Votre course est ensuite confirmée par téléphone ou WhatsApp.' },
        { q: 'Desservez-vous tous les terminaux de Roissy ?', a: 'Oui : le Terminal 1, le Terminal 2 (halls 2A à 2G) et le Terminal 3. Précisez votre terminal et votre numéro de vol lors de la confirmation de votre course.' },
        { q: 'Faites-vous les trajets entre CDG et Orly ?', a: 'Oui, sur devis, car ce trajet ne figure pas dans le tableau des tarifs. Indiquez les deux aéroports dans le formulaire pour recevoir une proposition.' },
        { q: 'Que se passe-t-il si mon vol a du retard ?', a: 'Votre vol est suivi en temps réel : un retard n’est jamais facturé, même de 4 ou 5 heures. L’attente est incluse jusqu’à 1 h après l’atterrissage ; au-delà (bagages, formalités…), elle est facturée au tarif horaire de la catégorie du véhicule.' },
      ],
    },
    en: {
      h1: 'CDG airport transfer: private chauffeur between Paris and Charles de Gaulle',
      intro: [
        'Landing at Paris-Charles de Gaulle or need to catch a flight on time? CDG TRANSFERT VTC provides chauffeur-driven transfers between Paris, the Île-de-France region and Roissy airport, 24 hours a day, 7 days a week. You book online in a few minutes, see an instant fare estimate, and your ride is then confirmed by phone or WhatsApp.',
        'Located about 25 kilometres north-east of Paris, Charles de Gaulle airport is linked to the city by the A1 and A3 motorways, which are often congested. A private chauffeur spares you RER train changes, taxi rank queues and dragging your luggage through public transport: you are picked up at the address of your choice and dropped off in front of your terminal.',
      ],
      sections: [
        { h2: 'Fares for a chauffeur between Paris and CDG airport', rates: true, paras: [
          'The price of a transfer between Charles de Gaulle airport and Paris depends only on the vehicle category you choose. The fares below come from our price list: they are indicative and confirmed before the ride, when your booking is confirmed by phone or WhatsApp.',
          'For a trip between the airport and a town outside Paris (La Défense, Versailles, Disneyland Paris…), the price is given on quote: simply enter your addresses in the booking form.',
        ] },
        { h2: 'Travel time between Paris and Roissy-CDG by time of day', paras: [
          'Allow 45 minutes to 1 hour on average between central Paris and Charles de Gaulle airport. The journey time varies a lot with the day and the hour: the A1 motorway and the Paris ring road are saturated at rush hour, especially in the morning towards Paris and in the late afternoon towards the airport.',
        ], times: [
          ['At night (10 pm – 6 am)', '30 to 40 min'],
          ['Daytime, off-peak (10 am – 4 pm)', '40 to 55 min'],
          ['Rush hour (7 – 10 am and 4 – 8 pm)', '55 min to 1 h 30'],
          ['At weekends', '35 to 50 min'],
        ], after: [
          'For a departure, leave enough time for check-in and security: give us your flight time when we confirm your ride so that we can agree on the pick-up time together.',
        ] },
        { h2: 'Where to meet your chauffeur at Charles de Gaulle airport', paras: [
          'The airport has three terminals: Terminal 1, a circular building; Terminal 2, split into halls 2A to 2G; and Terminal 3, next to the Roissypôle station. The free CDGVAL automatic train links Terminal 1, Terminal 3 and the Terminal 2 station, which also houses the airport’s TGV and RER stations.',
          'When we confirm your ride, give us your flight number, your terminal if you know it and your expected arrival time. The exact pick-up point is confirmed by phone or WhatsApp before the ride.',
        ], list: [
          'On arrival: collect your luggage, then contact your chauffeur on the number given in the confirmation.',
          'On departure: the chauffeur drops you off in front of your airline’s terminal; check it on your boarding pass.',
          'Keep your phone switched on after landing so that you can be reached.',
        ] },
        { h2: 'What your CDG transfer includes', list: [
          'The door-to-door trip between the pick-up address and the destination given when booking.',
          'A vehicle of the category you chose, with its chauffeur.',
          'The fare confirmed before the ride, based on the price list.',
          'Your luggage within the vehicle’s capacity: 2 large and 2 small suitcases in a Mercedes E-Class or S-Class, 4 suitcases in a Tesla, 7 suitcases in a Mercedes V-Class.',
          'Tolls, water on board, an invoice and up to 1 hour of waiting after landing; flight delays are never charged.',
          'Confirmation of your ride by phone or WhatsApp.',
        ], paras: [
          'No payment is taken on the website: you simply send a booking request, and the fare is confirmed before departure.',
        ] },
        { h2: 'Which vehicle should you choose for Roissy?', paras: [
          'Travelling alone or as a couple with standard luggage, the fully electric Tesla or the Mercedes E-Class are ideal. For a business trip, the Mercedes S-Class offers the highest level of comfort in our fleet. For families or groups, the Mercedes V-Class van seats up to 6 passengers with 7 suitcases, so there is no need to book two cars.',
        ] },
      ],
      faq: [
        { q: 'How much is a chauffeur between Paris and CDG airport?', a: 'It depends on the vehicle category: €65 in a Tesla, €99 in a Mercedes E-Class, €130 in a Mercedes V-Class and €170 in a Mercedes S-Class. These fares are indicative and confirmed before the ride.' },
        { q: 'How long does it take from Paris to Charles de Gaulle airport?', a: 'Between 30 and 40 minutes at night, 40 to 55 minutes during off-peak daytime hours and up to 1 h 30 at rush hour, depending on traffic.' },
        { q: 'Are you available early in the morning or late at night?', a: 'Yes, CDG TRANSFERT VTC is available 24/7, including for very early flights and night arrivals.' },
        { q: 'How do I book a chauffeur for CDG airport?', a: 'Fill in the booking form on this page (date, time, addresses, vehicle) or call +33 6 65 69 96 78. Your ride is then confirmed by phone or WhatsApp.' },
        { q: 'Do you serve every terminal at Roissy?', a: 'Yes: Terminal 1, Terminal 2 (halls 2A to 2G) and Terminal 3. Give us your terminal and flight number when we confirm your ride.' },
        { q: 'Do you drive between CDG and Orly?', a: 'Yes, on quote, as this trip is not in the price list. Enter both airports in the form to receive a proposal.' },
        { q: 'What happens if my flight is delayed?', a: 'Your flight is tracked in real time: a delay is never charged, even one of 4 or 5 hours. Waiting time is included for up to 1 hour after landing; beyond that (baggage, formalities…), it is charged at the hourly rate of the vehicle category.' },
      ],
    },
    ru: {
      h1: 'Трансфер в аэропорт CDG: частный водитель между Парижем и Шарль-де-Голлем',
      intro: [
        'Прилетаете в аэропорт Париж — Шарль-де-Голль или боитесь опоздать на рейс? CDG TRANSFERT VTC выполняет трансферы на автомобиле с водителем между Парижем, регионом Иль-де-Франс и аэропортом Руасси круглосуточно и без выходных. Вы бронируете онлайн за несколько минут, сразу видите ориентировочную стоимость, а затем поездка подтверждается по телефону или в WhatsApp.',
        'Аэропорт Шарль-де-Голль находится примерно в 25 километрах к северо-востоку от Парижа и связан с городом автомагистралями A1 и A3, которые часто загружены. Частный водитель избавляет от пересадок на RER, очередей на стоянках такси и перевозки багажа в общественном транспорте: он забирает вас по выбранному адресу и высаживает у вашего терминала.',
      ],
      sections: [
        { h2: 'Стоимость трансфера между Парижем и аэропортом CDG', rates: true, paras: [
          'Цена трансфера между аэропортом Шарль-де-Голль и Парижем зависит только от выбранной категории автомобиля. Тарифы ниже взяты из нашего прайс-листа: они ориентировочные и подтверждаются до поездки, когда бронирование подтверждается по телефону или в WhatsApp.',
          'Для поездки между аэропортом и городом за пределами Парижа (Дефанс, Версаль, Диснейленд Париж…) стоимость рассчитывается по запросу: просто укажите адреса в форме бронирования.',
        ] },
        { h2: 'Время в пути между Парижем и Руасси-CDG в зависимости от часа', paras: [
          'В среднем дорога от центра Парижа до аэропорта Шарль-де-Голль занимает от 45 минут до 1 часа. Время сильно зависит от дня и часа: автомагистраль A1 и парижская кольцевая дорога перегружены в часы пик, особенно утром в сторону Парижа и вечером в сторону аэропорта.',
        ], times: [
          ['Ночью (22:00 – 6:00)', '30–40 мин'],
          ['Днём вне часов пик (10:00 – 16:00)', '40–55 мин'],
          ['Часы пик (7:00 – 10:00 и 16:00 – 20:00)', 'от 55 мин до 1 ч 30 мин'],
          ['В выходные', '35–50 мин'],
        ], after: [
          'При вылете оставьте достаточно времени на регистрацию и досмотр: сообщите время рейса при подтверждении поездки, чтобы вместе согласовать время подачи автомобиля.',
        ] },
        { h2: 'Где встретиться с водителем в аэропорту Шарль-де-Голль', paras: [
          'В аэропорту три терминала: Терминал 1 — круглое здание; Терминал 2, разделённый на залы 2A–2G; и Терминал 3 рядом со станцией Руассиполь. Бесплатный автоматический поезд CDGVAL соединяет Терминал 1, Терминал 3 и станцию Терминала 2, где также находятся вокзалы TGV и RER аэропорта.',
          'При подтверждении поездки сообщите номер рейса, терминал (если знаете) и ожидаемое время прилёта. Точное место посадки подтверждается по телефону или в WhatsApp до поездки.',
        ], list: [
          'При прилёте: получите багаж и свяжитесь с водителем по номеру, указанному в подтверждении.',
          'При вылете: водитель высадит вас у терминала вашей авиакомпании — проверьте его в посадочном талоне.',
          'Не выключайте телефон после посадки, чтобы оставаться на связи.',
        ] },
        { h2: 'Что входит в трансфер CDG', list: [
          'Поездка «от двери до двери» между адресом посадки и пунктом назначения, указанными при бронировании.',
          'Автомобиль выбранной категории с водителем.',
          'Цена, подтверждённая до поездки, согласно прайс-листу.',
          'Багаж в пределах вместимости автомобиля: 2 больших и 2 маленьких чемодана в Mercedes E-класса или S-класса, 4 чемодана в Tesla, 7 чемоданов в Mercedes V-класса.',
          'Платные дороги, вода в салоне, счёт и до 1 часа ожидания после посадки; задержка рейса не оплачивается.',
          'Подтверждение поездки по телефону или в WhatsApp.',
        ], paras: [
          'На сайте оплата не взимается: вы просто отправляете заявку на бронирование, а цена подтверждается до отправления.',
        ] },
        { h2: 'Какой автомобиль выбрать для поездки в Руасси?', paras: [
          'Одному или вдвоём со стандартным багажом идеально подойдут полностью электрическая Tesla или Mercedes E-класса. Для деловой поездки Mercedes S-класса предлагает максимальный уровень комфорта в нашем автопарке. Для семьи или группы минивэн Mercedes V-класса вмещает до 6 пассажиров и 7 чемоданов — не нужно бронировать две машины.',
        ] },
      ],
      faq: [
        { q: 'Сколько стоит трансфер между Парижем и аэропортом CDG?', a: 'В зависимости от категории автомобиля: 65 € на Tesla, 99 € на Mercedes E-класса, 130 € на Mercedes V-класса и 170 € на Mercedes S-класса. Тарифы ориентировочные и подтверждаются до поездки.' },
        { q: 'Сколько ехать от Парижа до аэропорта Шарль-де-Голль?', a: 'От 30 до 40 минут ночью, 40–55 минут днём вне часов пик и до 1 ч 30 мин в часы пик, в зависимости от трафика.' },
        { q: 'Вы работаете рано утром и поздно вечером?', a: 'Да, CDG TRANSFERT VTC работает круглосуточно и без выходных, в том числе для очень ранних рейсов и ночных прилётов.' },
        { q: 'Как заказать водителя в аэропорт CDG?', a: 'Заполните форму бронирования на этой странице (дата, время, адреса, автомобиль) или позвоните по номеру +33 6 65 69 96 78. Затем поездка подтверждается по телефону или в WhatsApp.' },
        { q: 'Вы обслуживаете все терминалы Руасси?', a: 'Да: Терминал 1, Терминал 2 (залы 2A–2G) и Терминал 3. Сообщите терминал и номер рейса при подтверждении поездки.' },
        { q: 'Вы возите между CDG и Орли?', a: 'Да, по запросу: этого маршрута нет в прайс-листе. Укажите оба аэропорта в форме, чтобы получить предложение.' },
        { q: 'Что будет, если мой рейс задержится?', a: 'Мы отслеживаем ваш рейс в реальном времени: задержка никогда не оплачивается, даже на 4–5 часов. Ожидание включено в течение 1 часа после посадки; сверх этого (багаж, формальности…) оно оплачивается по почасовому тарифу категории автомобиля.' },
      ],
    },
    ro: {
      h1: 'Transfer aeroport CDG: șofer privat între Paris și Charles de Gaulle',
      intro: [
        'Aterizați la Paris-Charles de Gaulle sau trebuie să prindeți un zbor la timp? CDG TRANSFERT VTC asigură transferuri cu mașină și șofer între Paris, regiunea Île-de-France și aeroportul Roissy, 24 de ore din 24, 7 zile din 7. Rezervați online în câteva minute, vedeți imediat o estimare a prețului, iar cursa vă este apoi confirmată prin telefon sau WhatsApp.',
        'Situat la aproximativ 25 de kilometri nord-est de Paris, aeroportul Charles de Gaulle este legat de capitală prin autostrăzile A1 și A3, adesea aglomerate. Un șofer privat vă scutește de schimbările de tren RER, de cozile de la stațiile de taxi și de transportul bagajelor cu mijloacele de transport în comun: vă preia de la adresa aleasă și vă lasă în fața terminalului.',
      ],
      sections: [
        { h2: 'Tariful unui VTC între Paris și aeroportul CDG', rates: true, paras: [
          'Prețul unui transfer între aeroportul Charles de Gaulle și Paris depinde doar de categoria de vehicul aleasă. Tarifele de mai jos provin din grila noastră: sunt orientative și vă sunt confirmate înainte de cursă, la confirmarea prin telefon sau WhatsApp.',
          'Pentru un traseu între aeroport și un oraș din afara Parisului (La Défense, Versailles, Disneyland Paris…), prețul se stabilește la cerere: indicați pur și simplu adresele în formularul de rezervare.',
        ] },
        { h2: 'Durata drumului între Paris și Roissy-CDG în funcție de oră', paras: [
          'Socotiți în medie între 45 de minute și o oră între centrul Parisului și aeroportul Charles de Gaulle. Durata variază mult în funcție de zi și oră: autostrada A1 și centura Parisului sunt saturate la orele de vârf, mai ales dimineața spre Paris și seara spre aeroport.',
        ], times: [
          ['Noaptea (22:00 – 6:00)', '30–40 min'],
          ['Ziua, în afara orelor de vârf (10:00 – 16:00)', '40–55 min'],
          ['Ore de vârf (7:00 – 10:00 și 16:00 – 20:00)', 'între 55 min și 1 h 30'],
          ['În weekend', '35–50 min'],
        ], after: [
          'La plecare, prevedeți o marjă suficientă pentru check-in și controlul de securitate: comunicați-ne ora zborului la confirmarea cursei pentru a stabili împreună ora de preluare.',
        ] },
        { h2: 'Unde vă întâlniți cu șoferul la aeroportul Charles de Gaulle', paras: [
          'Aeroportul are trei terminale: Terminalul 1, o clădire circulară; Terminalul 2, împărțit în halele 2A–2G; și Terminalul 3, lângă gara Roissypôle. Trenul automat gratuit CDGVAL leagă Terminalul 1, Terminalul 3 și gara Terminalului 2, unde se află și gările TGV și RER ale aeroportului.',
          'La confirmarea cursei, comunicați-ne numărul zborului, terminalul dacă îl cunoașteți și ora estimată de sosire. Locul exact de preluare vă este confirmat prin telefon sau WhatsApp înainte de cursă.',
        ], list: [
          'La sosire: recuperați-vă bagajele, apoi contactați șoferul la numărul comunicat la confirmare.',
          'La plecare: șoferul vă lasă în fața terminalului companiei aeriene; verificați-l pe cartea de îmbarcare.',
          'Țineți telefonul pornit după aterizare pentru a putea fi contactat.',
        ] },
        { h2: 'Ce include transferul CDG', list: [
          'Traseul de la ușă la ușă între adresa de preluare și destinația indicate la rezervare.',
          'Vehiculul din categoria aleasă, cu șoferul său.',
          'Prețul confirmat înainte de cursă, conform grilei de tarife.',
          'Bagajele în limita capacității vehiculului: 2 valize mari și 2 mici în Mercedes Clasa E sau Clasa S, 4 valize în Tesla, 7 valize în Mercedes Clasa V.',
          'Taxele de autostradă, apa la bord, factura și până la 1 oră de așteptare după aterizare; întârzierea zborului nu se facturează.',
          'Confirmarea cursei prin telefon sau WhatsApp.',
        ], paras: [
          'Pe site nu se cere nicio plată: trimiteți doar o cerere de rezervare, iar prețul vă este confirmat înainte de plecare.',
        ] },
        { h2: 'Ce vehicul să alegeți pentru Roissy?', paras: [
          'Singur sau în doi, cu bagaje obișnuite, Tesla, 100 % electrică, sau Mercedes Clasa E sunt alegeri ideale. Pentru o călătorie de afaceri, Mercedes Clasa S oferă cel mai înalt nivel de confort din flota noastră. Pentru familii sau grupuri, vanul Mercedes Clasa V primește până la 6 pasageri și 7 valize, fără să fie nevoie de două mașini.',
        ] },
      ],
      faq: [
        { q: 'Cât costă un VTC între Paris și aeroportul CDG?', a: 'În funcție de categoria vehiculului: 65 € cu Tesla, 99 € cu Mercedes Clasa E, 130 € cu Mercedes Clasa V și 170 € cu Mercedes Clasa S. Tarifele sunt orientative și confirmate înainte de cursă.' },
        { q: 'Cât durează drumul de la Paris la aeroportul Charles de Gaulle?', a: 'Între 30 și 40 de minute noaptea, 40–55 de minute ziua în afara orelor de vârf și până la 1 h 30 la orele de vârf, în funcție de trafic.' },
        { q: 'Sunteți disponibili dimineața devreme sau seara târziu?', a: 'Da, CDG TRANSFERT VTC este disponibil 24/7, inclusiv pentru zborurile foarte matinale și sosirile de noapte.' },
        { q: 'Cum rezerv un șofer pentru aeroportul CDG?', a: 'Completați formularul de rezervare de pe această pagină (dată, oră, adrese, vehicul) sau sunați la +33 6 65 69 96 78. Cursa vă este apoi confirmată prin telefon sau WhatsApp.' },
        { q: 'Deserviți toate terminalele din Roissy?', a: 'Da: Terminalul 1, Terminalul 2 (halele 2A–2G) și Terminalul 3. Comunicați-ne terminalul și numărul zborului la confirmarea cursei.' },
        { q: 'Faceți curse între CDG și Orly?', a: 'Da, la cerere, deoarece acest traseu nu figurează în grila de tarife. Indicați ambele aeroporturi în formular pentru a primi o ofertă.' },
        { q: 'Ce se întâmplă dacă zborul meu întârzie?', a: 'Zborul dumneavoastră este urmărit în timp real: o întârziere nu este niciodată facturată, chiar și de 4 sau 5 ore. Așteptarea este inclusă până la 1 oră după aterizare; peste acest timp (bagaje, formalități…), se facturează la tariful orar al categoriei vehiculului.' },
      ],
    },
  },
}
