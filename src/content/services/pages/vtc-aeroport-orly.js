// ── Page service : VTC aéroport Paris-Orly ───────────────────────────
// Contenu unique par langue. Prix : ligne « airport » du tableau des tarifs
// (forfait unique CDG / Orly ↔ Paris), mention « tarif indicatif ».
// ────────────────────────────────────────────────────────────────────

export default {
  i18n: {
    fr: {
      h1: 'VTC aéroport d’Orly : chauffeur privé entre Paris et Paris-Orly',
      intro: [
        'Vous prenez un vol à l’aéroport Paris-Orly ou vous y atterrissez ? CDG TRANSFERT VTC vous conduit entre Paris, l’Île-de-France et Orly en voiture avec chauffeur, 24 heures sur 24 et 7 jours sur 7. La réservation se fait en ligne en quelques minutes : vous obtenez une estimation immédiate, puis votre course est confirmée par téléphone ou par WhatsApp.',
        'L’aéroport d’Orly se trouve à environ 14 kilomètres au sud de Paris, à cheval sur le Val-de-Marne et l’Essonne. C’est l’aéroport le plus proche de la capitale : il accueille surtout des vols vers la France métropolitaine, l’Europe, le Maghreb et l’outre-mer. Avec un chauffeur privé, vous partez de votre adresse et arrivez devant votre terminal, sans correspondance en métro ni en Orlyval avec vos valises.',
      ],
      sections: [
        { h2: 'Tarif d’un VTC entre Paris et l’aéroport d’Orly', rates: true, paras: [
          'Orly et Roissy-Charles-de-Gaulle partagent le même tarif pour un trajet depuis ou vers Paris : seul le véhicule choisi fait varier le prix. Les montants ci-dessous sont ceux de notre grille ; ils sont indicatifs et vous sont confirmés avant la course.',
          'Pour un trajet entre Orly et une commune hors de Paris, ou entre Orly et un autre aéroport, le prix est établi sur devis : renseignez vos adresses dans le formulaire et nous vous faisons une proposition.',
        ] },
        { h2: 'Temps de trajet entre Paris et Orly selon l’heure', paras: [
          'Depuis le centre de Paris, comptez généralement de 25 à 45 minutes pour rejoindre Orly. L’itinéraire passe le plus souvent par l’autoroute A6 ou la route nationale 7, deux axes très fréquentés le matin en direction de Paris et en fin d’après-midi vers la banlieue sud.',
        ], times: [
          ['La nuit (22 h – 6 h)', '20 à 30 min'],
          ['En journée hors heures de pointe (10 h – 16 h)', '30 à 45 min'],
          ['Heures de pointe (7 h – 10 h et 16 h – 20 h)', '45 min à 1 h 15'],
          ['Le week-end', '25 à 40 min'],
        ], after: [
          'Orly est soumis à un couvre-feu : aucun avion n’y décolle ni n’y atterrit entre 23 h 30 et 6 h. Les premiers départs ont donc lieu très tôt le matin ; précisez l’heure de votre vol lors de la confirmation de votre course pour convenir ensemble de l’heure de prise en charge.',
        ] },
        { h2: 'Où retrouver votre chauffeur à l’aéroport d’Orly', paras: [
          'Depuis 2019, les anciens terminaux Sud et Ouest ont laissé place à quatre terminaux numérotés : Orly 1, Orly 2, Orly 3 et Orly 4. Ils sont reliés entre eux à pied, Orly 3 servant de bâtiment de jonction. Votre carte d’embarquement ou l’application de votre compagnie indique le terminal de votre vol.',
          'Lors de la confirmation de votre course, précisez votre numéro de vol et votre heure d’arrivée prévue. Le lieu exact de prise en charge vous est confirmé par téléphone ou WhatsApp avant la course.',
        ], list: [
          'À l’arrivée : passez la récupération des bagages, puis appelez votre chauffeur au numéro communiqué lors de la confirmation.',
          'Au départ : le chauffeur vous dépose devant le terminal de votre compagnie, au plus près de l’enregistrement.',
          'Si votre vol change d’heure, prévenez-nous par téléphone ou WhatsApp dès que possible.',
        ] },
        { h2: 'Ce qui est inclus dans votre transfert Orly', list: [
          'Le trajet direct entre l’adresse de prise en charge et la destination indiquées à la réservation.',
          'Le véhicule de la catégorie choisie, conduit par un chauffeur VTC.',
          'Le prix confirmé avant la course, selon le tableau des tarifs.',
          'Vos bagages dans la limite de la capacité du véhicule : 3 en Mercedes Classe E, Classe S ou Tesla Model Y, 6 en Mercedes Classe V.',
          'La confirmation de votre course par téléphone ou WhatsApp.',
        ], paras: [
          'Le site ne demande aucun paiement : vous envoyez une demande de réservation, et le prix vous est confirmé avant le départ.',
        ] },
        { h2: 'Orly ou Roissy : un même service, deux trajets différents', paras: [
          'Orly est plus proche de Paris que Roissy-Charles-de-Gaulle, et le trajet y est en général plus court, notamment depuis la rive gauche et le sud de la capitale. Le tarif reste toutefois le même depuis Paris intra-muros. Vous vous rendez à Roissy ? Consultez notre page dédiée à l’aéroport CDG ; vous arrivez en train avant de prendre l’avion ? Nous assurons aussi les transferts entre les gares parisiennes et Orly.',
        ] },
      ],
      faq: [
        { q: 'Combien coûte un VTC entre Paris et l’aéroport d’Orly ?', a: 'Selon le véhicule : 65 € en Tesla Model Y, 99 € en Mercedes Classe E, 130 € en Mercedes Classe V et 170 € en Mercedes Classe S. Ces tarifs sont indicatifs et confirmés avant la course.' },
        { q: 'Combien de temps faut-il pour aller de Paris à Orly ?', a: 'De 20 à 30 minutes la nuit, 30 à 45 minutes en journée hors heures de pointe et jusqu’à 1 h 15 aux heures de pointe, selon le trafic.' },
        { q: 'Pouvez-vous m’emmener à Orly pour un vol à 6 h du matin ?', a: 'Oui. CDG TRANSFERT VTC est disponible 24 h/24 et 7 j/7 : précisez l’heure de votre vol lors de la confirmation de votre course pour convenir de l’heure de prise en charge.' },
        { q: 'Desservez-vous tous les terminaux d’Orly ?', a: 'Oui : Orly 1, Orly 2, Orly 3 et Orly 4. Précisez votre numéro de vol lors de la confirmation de votre course.' },
        { q: 'Le prix est-il le même pour Orly et pour Roissy-CDG ?', a: 'Oui, depuis ou vers Paris intra-muros, le tarif est identique pour les deux aéroports et dépend uniquement du véhicule choisi.' },
        { q: 'Comment réserver un chauffeur pour Orly ?', a: 'Remplissez le formulaire de réservation de cette page ou appelez le +33 6 65 69 96 78. Votre course est ensuite confirmée par téléphone ou WhatsApp.' },
      ],
    },
    en: {
      h1: 'Orly airport transfer: private chauffeur between Paris and Paris-Orly',
      intro: [
        'Flying from Paris-Orly or landing there? CDG TRANSFERT VTC drives you between Paris, the Île-de-France region and Orly airport in a chauffeur-driven car, 24 hours a day, 7 days a week. Booking online takes a few minutes: you get an instant estimate, and your ride is then confirmed by phone or WhatsApp.',
        'Orly airport lies about 14 kilometres south of Paris, straddling the Val-de-Marne and Essonne departments. It is the airport closest to the capital and mainly handles flights to mainland France, Europe, North Africa and the French overseas territories. With a private chauffeur you leave from your own address and arrive in front of your terminal, with no metro or Orlyval changes while carrying your suitcases.',
      ],
      sections: [
        { h2: 'Fares for a chauffeur between Paris and Orly airport', rates: true, paras: [
          'Orly and Roissy-Charles de Gaulle share the same fare for a trip from or to Paris: only the vehicle you choose changes the price. The amounts below come from our price list; they are indicative and confirmed before the ride.',
          'For a trip between Orly and a town outside Paris, or between Orly and another airport, the price is given on quote: enter your addresses in the form and we will send you a proposal.',
        ] },
        { h2: 'Travel time between Paris and Orly by time of day', paras: [
          'From central Paris, Orly is usually 25 to 45 minutes away. The route generally follows the A6 motorway or the N7 road, both very busy in the morning towards Paris and in the late afternoon towards the southern suburbs.',
        ], times: [
          ['At night (10 pm – 6 am)', '20 to 30 min'],
          ['Daytime, off-peak (10 am – 4 pm)', '30 to 45 min'],
          ['Rush hour (7 – 10 am and 4 – 8 pm)', '45 min to 1 h 15'],
          ['At weekends', '25 to 40 min'],
        ], after: [
          'Orly has a night curfew: no aircraft takes off or lands there between 11:30 pm and 6 am. The first departures are therefore very early in the morning; give us your flight time when we confirm your ride so that we can agree on the pick-up time together.',
        ] },
        { h2: 'Where to meet your chauffeur at Orly airport', paras: [
          'Since 2019, the former South and West terminals have been replaced by four numbered terminals: Orly 1, Orly 2, Orly 3 and Orly 4. They are connected on foot, with Orly 3 acting as the link building. Your boarding pass or your airline’s app shows the terminal of your flight.',
          'When we confirm your ride, give us your flight number and expected arrival time. The exact pick-up point is confirmed by phone or WhatsApp before the ride.',
        ], list: [
          'On arrival: go through baggage reclaim, then call your chauffeur on the number given in the confirmation.',
          'On departure: the chauffeur drops you off in front of your airline’s terminal, as close as possible to check-in.',
          'If your flight time changes, let us know by phone or WhatsApp as soon as possible.',
        ] },
        { h2: 'What your Orly transfer includes', list: [
          'The direct trip between the pick-up address and the destination given when booking.',
          'A vehicle of the category you chose, driven by a VTC chauffeur.',
          'The fare confirmed before the ride, based on the price list.',
          'Your luggage within the vehicle’s capacity: 3 bags in a Mercedes E-Class, S-Class or Tesla Model Y, 6 in a Mercedes V-Class.',
          'Confirmation of your ride by phone or WhatsApp.',
        ], paras: [
          'The website takes no payment: you send a booking request, and the fare is confirmed before departure.',
        ] },
        { h2: 'Orly or Roissy: the same service, two different trips', paras: [
          'Orly is closer to Paris than Roissy-Charles de Gaulle, and the drive is usually shorter, especially from the Left Bank and the south of the city. The fare from central Paris is nonetheless the same. Heading to Roissy? See our page dedicated to CDG airport. Arriving by train before your flight? We also provide transfers between the Paris railway stations and Orly.',
        ] },
      ],
      faq: [
        { q: 'How much is a chauffeur between Paris and Orly airport?', a: 'It depends on the vehicle: €65 in a Tesla Model Y, €99 in a Mercedes E-Class, €130 in a Mercedes V-Class and €170 in a Mercedes S-Class. These fares are indicative and confirmed before the ride.' },
        { q: 'How long does it take from Paris to Orly?', a: 'From 20 to 30 minutes at night, 30 to 45 minutes during off-peak daytime hours and up to 1 h 15 at rush hour, depending on traffic.' },
        { q: 'Can you take me to Orly for a 6 am flight?', a: 'Yes. CDG TRANSFERT VTC is available 24/7: give us your flight time when we confirm your ride so that we can agree on the pick-up time.' },
        { q: 'Do you serve every terminal at Orly?', a: 'Yes: Orly 1, Orly 2, Orly 3 and Orly 4. Give us your flight number when we confirm your ride.' },
        { q: 'Is the fare the same for Orly and Roissy-CDG?', a: 'Yes, from or to central Paris the fare is identical for both airports and depends only on the vehicle you choose.' },
        { q: 'How do I book a chauffeur for Orly?', a: 'Fill in the booking form on this page or call +33 6 65 69 96 78. Your ride is then confirmed by phone or WhatsApp.' },
      ],
    },
    ru: {
      h1: 'Трансфер в аэропорт Орли: частный водитель между Парижем и Париж-Орли',
      intro: [
        'Вылетаете из аэропорта Париж — Орли или прилетаете туда? CDG TRANSFERT VTC отвезёт вас между Парижем, регионом Иль-де-Франс и аэропортом Орли на автомобиле с водителем — круглосуточно и без выходных. Бронирование онлайн занимает несколько минут: вы сразу видите ориентировочную стоимость, а затем поездка подтверждается по телефону или в WhatsApp.',
        'Аэропорт Орли расположен примерно в 14 километрах к югу от Парижа, на границе департаментов Валь-де-Марн и Эссонна. Это ближайший к столице аэропорт: отсюда летают в основном рейсы по Франции, в Европу, страны Магриба и заморские территории Франции. С частным водителем вы выезжаете от своего адреса и выходите прямо у терминала — без пересадок в метро или на Orlyval с чемоданами.',
      ],
      sections: [
        { h2: 'Стоимость трансфера между Парижем и аэропортом Орли', rates: true, paras: [
          'Для поездки из Парижа или в Париж у Орли и Руасси — Шарль-де-Голль одинаковый тариф: цена зависит только от выбранного автомобиля. Суммы ниже взяты из нашего прайс-листа; они ориентировочные и подтверждаются до поездки.',
          'Поездка между Орли и городом за пределами Парижа или между Орли и другим аэропортом рассчитывается по запросу: укажите адреса в форме, и мы пришлём предложение.',
        ] },
        { h2: 'Время в пути между Парижем и Орли в зависимости от часа', paras: [
          'От центра Парижа до Орли обычно 25–45 минут. Маршрут чаще всего проходит по автомагистрали A6 или по национальной дороге N7 — обе сильно загружены утром в сторону Парижа и ближе к вечеру в сторону южных пригородов.',
        ], times: [
          ['Ночью (22:00 – 6:00)', '20–30 мин'],
          ['Днём вне часов пик (10:00 – 16:00)', '30–45 мин'],
          ['Часы пик (7:00 – 10:00 и 16:00 – 20:00)', 'от 45 мин до 1 ч 15 мин'],
          ['В выходные', '25–40 мин'],
        ], after: [
          'В Орли действует ночной запрет на полёты: с 23:30 до 6:00 самолёты здесь не взлетают и не садятся. Поэтому первые рейсы отправляются очень рано утром; сообщите время вылета при подтверждении поездки, чтобы мы вместе согласовали время подачи автомобиля.',
        ] },
        { h2: 'Где встретиться с водителем в аэропорту Орли', paras: [
          'С 2019 года бывшие терминалы «Юг» и «Запад» заменены четырьмя пронумерованными терминалами: Orly 1, Orly 2, Orly 3 и Orly 4. Между ними можно пройти пешком, а Orly 3 служит соединительным зданием. Терминал вашего рейса указан в посадочном талоне или в приложении авиакомпании.',
          'При подтверждении поездки сообщите номер рейса и ожидаемое время прилёта. Точное место посадки подтверждается по телефону или в WhatsApp до поездки.',
        ], list: [
          'При прилёте: получите багаж и позвоните водителю по номеру из подтверждения.',
          'При вылете: водитель высадит вас у терминала вашей авиакомпании, как можно ближе к стойкам регистрации.',
          'Если время рейса изменилось, сообщите нам по телефону или в WhatsApp как можно скорее.',
        ] },
        { h2: 'Что входит в трансфер в Орли', list: [
          'Прямая поездка между адресом посадки и пунктом назначения, указанными при бронировании.',
          'Автомобиль выбранной категории с водителем VTC.',
          'Цена, подтверждённая до поездки, согласно таблице тарифов.',
          'Багаж в пределах вместимости автомобиля: 3 места в Mercedes E-класса, S-класса или Tesla Model Y, 6 мест в Mercedes V-класса.',
          'Подтверждение поездки по телефону или в WhatsApp.',
        ], paras: [
          'На сайте не нужно ничего оплачивать: вы отправляете заявку на бронирование, а цена подтверждается до выезда.',
        ] },
        { h2: 'Орли или Руасси: одна услуга, два разных маршрута', paras: [
          'Орли ближе к Парижу, чем Руасси — Шарль-де-Голль, и дорога туда обычно короче, особенно с левого берега Сены и из южных районов города. При этом тариф из Парижа в пределах периферийного кольца одинаковый. Летите из Руасси? Откройте нашу страницу об аэропорте CDG. Приезжаете на поезде перед вылетом? Мы также выполняем трансферы между вокзалами Парижа и Орли.',
        ] },
      ],
      faq: [
        { q: 'Сколько стоит трансфер между Парижем и аэропортом Орли?', a: 'В зависимости от автомобиля: 65 € на Tesla Model Y, 99 € на Mercedes E-класса, 130 € на Mercedes V-класса и 170 € на Mercedes S-класса. Тарифы ориентировочные и подтверждаются до поездки.' },
        { q: 'Сколько времени ехать из Парижа в Орли?', a: 'Ночью 20–30 минут, днём вне часов пик 30–45 минут, а в часы пик — до 1 ч 15 мин, в зависимости от трафика.' },
        { q: 'Можно ли поехать в Орли к рейсу в 6 утра?', a: 'Да. CDG TRANSFERT VTC работает круглосуточно: сообщите время вылета при подтверждении поездки, чтобы согласовать время подачи автомобиля.' },
        { q: 'Вы обслуживаете все терминалы Орли?', a: 'Да: Orly 1, Orly 2, Orly 3 и Orly 4. Сообщите номер рейса при подтверждении поездки.' },
        { q: 'Цена одинаковая для Орли и Руасси-CDG?', a: 'Да, из Парижа или в Париж тариф для обоих аэропортов одинаковый и зависит только от выбранного автомобиля.' },
        { q: 'Как забронировать водителя в Орли?', a: 'Заполните форму бронирования на этой странице или позвоните по номеру +33 6 65 69 96 78. Затем поездка подтверждается по телефону или в WhatsApp.' },
      ],
    },
    ro: {
      h1: 'Transfer aeroport Orly: șofer privat între Paris și Paris-Orly',
      intro: [
        'Zburați de pe aeroportul Paris-Orly sau aterizați acolo? CDG TRANSFERT VTC vă duce între Paris, regiunea Île-de-France și aeroportul Orly cu mașină și șofer, 24 de ore din 24, 7 zile din 7. Rezervarea online durează câteva minute: obțineți imediat o estimare, iar cursa vă este apoi confirmată prin telefon sau WhatsApp.',
        'Aeroportul Orly se află la aproximativ 14 kilometri sud de Paris, între departamentele Val-de-Marne și Essonne. Este aeroportul cel mai apropiat de capitală și deservește mai ales zboruri spre Franța continentală, Europa, Maghreb și teritoriile franceze de peste mări. Cu un șofer privat plecați de la adresa dumneavoastră și ajungeți în fața terminalului, fără schimbări de metrou sau de Orlyval cu bagajele după dumneavoastră.',
      ],
      sections: [
        { h2: 'Tariful unui VTC între Paris și aeroportul Orly', rates: true, paras: [
          'Orly și Roissy-Charles de Gaulle au același tarif pentru o cursă din sau spre Paris: doar vehiculul ales schimbă prețul. Sumele de mai jos provin din lista noastră de prețuri; sunt orientative și vă sunt confirmate înainte de cursă.',
          'Pentru o cursă între Orly și o localitate din afara Parisului, sau între Orly și un alt aeroport, prețul se stabilește la cerere: completați adresele în formular și vă trimitem o ofertă.',
        ] },
        { h2: 'Durata drumului între Paris și Orly în funcție de oră', paras: [
          'Din centrul Parisului, până la Orly faceți de obicei între 25 și 45 de minute. Traseul trece de regulă pe autostrada A6 sau pe drumul național N7, două artere foarte aglomerate dimineața spre Paris și după-amiaza târziu spre suburbiile din sud.',
        ], times: [
          ['Noaptea (22:00 – 6:00)', '20 – 30 min'],
          ['Ziua, în afara orelor de vârf (10:00 – 16:00)', '30 – 45 min'],
          ['Orele de vârf (7:00 – 10:00 și 16:00 – 20:00)', '45 min – 1 h 15'],
          ['În weekend', '25 – 40 min'],
        ], after: [
          'Pe aeroportul Orly există o interdicție de zbor pe timp de noapte: între 23:30 și 6:00 niciun avion nu decolează și nu aterizează. Primele plecări sunt deci foarte devreme dimineața; comunicați-ne ora zborului la confirmarea cursei pentru a stabili împreună ora de preluare.',
        ] },
        { h2: 'Unde vă găsiți șoferul la aeroportul Orly', paras: [
          'Din 2019, fostele terminale Sud și Vest au fost înlocuite de patru terminale numerotate: Orly 1, Orly 2, Orly 3 și Orly 4. Ele sunt legate între ele pe jos, Orly 3 fiind clădirea de legătură. Cartea de îmbarcare sau aplicația companiei aeriene indică terminalul zborului dumneavoastră.',
          'La confirmarea cursei, comunicați-ne numărul zborului și ora estimată de sosire. Locul exact de preluare vă este confirmat prin telefon sau WhatsApp înainte de cursă.',
        ], list: [
          'La sosire: treceți pe la banda de bagaje, apoi sunați-vă șoferul la numărul comunicat în confirmare.',
          'La plecare: șoferul vă lasă în fața terminalului companiei dumneavoastră, cât mai aproape de check-in.',
          'Dacă ora zborului se schimbă, anunțați-ne prin telefon sau WhatsApp cât mai repede.',
        ] },
        { h2: 'Ce include transferul la Orly', list: [
          'Cursa directă între adresa de preluare și destinația indicate la rezervare.',
          'Vehiculul din categoria aleasă, condus de un șofer VTC.',
          'Prețul confirmat înainte de cursă, conform tabelului de tarife.',
          'Bagajele în limita capacității vehiculului: 3 în Mercedes Clasa E, Clasa S sau Tesla Model Y, 6 în Mercedes Clasa V.',
          'Confirmarea cursei prin telefon sau WhatsApp.',
        ], paras: [
          'Site-ul nu cere nicio plată: trimiteți o cerere de rezervare, iar prețul vă este confirmat înainte de plecare.',
        ] },
        { h2: 'Orly sau Roissy: același serviciu, două trasee diferite', paras: [
          'Orly este mai aproape de Paris decât Roissy-Charles de Gaulle, iar drumul este în general mai scurt, mai ales din malul stâng și din sudul capitalei. Tariful din Paris rămâne totuși același. Mergeți la Roissy? Consultați pagina noastră dedicată aeroportului CDG. Ajungeți cu trenul înainte de zbor? Asigurăm și transferuri între gările din Paris și Orly.',
        ] },
      ],
      faq: [
        { q: 'Cât costă un VTC între Paris și aeroportul Orly?', a: 'În funcție de vehicul: 65 € cu Tesla Model Y, 99 € cu Mercedes Clasa E, 130 € cu Mercedes Clasa V și 170 € cu Mercedes Clasa S. Tarifele sunt orientative și confirmate înainte de cursă.' },
        { q: 'Cât durează drumul de la Paris la Orly?', a: 'Între 20 și 30 de minute noaptea, 30 – 45 de minute ziua în afara orelor de vârf și până la 1 h 15 la orele de vârf, în funcție de trafic.' },
        { q: 'Mă puteți duce la Orly pentru un zbor la ora 6 dimineața?', a: 'Da. CDG TRANSFERT VTC este disponibil 24/7: comunicați-ne ora zborului la confirmarea cursei pentru a stabili ora de preluare.' },
        { q: 'Deserviți toate terminalele aeroportului Orly?', a: 'Da: Orly 1, Orly 2, Orly 3 și Orly 4. Comunicați-ne numărul zborului la confirmarea cursei.' },
        { q: 'Prețul este același pentru Orly și Roissy-CDG?', a: 'Da, din sau spre Paris tariful este identic pentru cele două aeroporturi și depinde doar de vehiculul ales.' },
        { q: 'Cum rezerv un șofer pentru Orly?', a: 'Completați formularul de rezervare de pe această pagină sau sunați la +33 6 65 69 96 78. Cursa vă este apoi confirmată prin telefon sau WhatsApp.' },
      ],
    },
  },
}
