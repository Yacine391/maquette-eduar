// ── Page service : VTC gares de Paris ────────────────────────────────
// Contenu unique par langue. Prix : lignes « city » (Paris ↔ Paris) et
// « airport » (Paris ↔ CDG / Orly) du tableau des tarifs.
// ────────────────────────────────────────────────────────────────────

export default {
  i18n: {
    fr: {
      h1: 'VTC gares de Paris : chauffeur privé à la descente du train',
      intro: [
        'Vous arrivez en TGV, en Eurostar ou en train de nuit dans l’une des grandes gares parisiennes, ou vous devez y être à l’heure pour un départ ? CDG TRANSFERT VTC vous prend en charge à la gare et vous conduit à votre hôtel, à votre domicile, à votre rendez-vous ou directement à l’aéroport, 24 heures sur 24 et 7 jours sur 7.',
        'Les files aux stations de taxis des gares peuvent être longues aux heures d’affluence, et le métro avec des valises n’est jamais simple. En réservant un chauffeur privé, vous connaissez le prix à l’avance et votre trajet est organisé avant même de descendre du train. Vous réservez en ligne, puis votre course est confirmée par téléphone ou par WhatsApp.',
      ],
      sections: [
        { h2: 'Tarifs d’un VTC depuis une gare parisienne', rates: true, paras: [
          'Entre une gare parisienne et une adresse dans Paris, ou entre deux gares, s’applique le tarif « Paris Centre-ville ». Entre une gare parisienne et l’aéroport de Roissy-Charles-de-Gaulle ou d’Orly, s’applique le forfait aéroport. Ces tarifs sont indicatifs et vous sont confirmés avant la course.',
          'Pour une gare située hors de Paris (Marne-la-Vallée–Chessy, Massy TGV…) ou une destination en banlieue, le prix est établi sur devis.',
        ] },
        { h2: 'Les gares parisiennes que nous desservons', list: [
          'Gare du Nord (10e) : Eurostar vers Londres, Bruxelles et Amsterdam, TGV vers Lille et le nord de la France.',
          'Gare de l’Est (10e) : TGV vers Reims, Metz, Nancy, Strasbourg, ainsi que vers l’Allemagne et le Luxembourg.',
          'Gare de Lyon (12e) : TGV vers Lyon, Marseille, Nice, Montpellier, les Alpes, la Suisse et l’Italie.',
          'Gare de Bercy (12e), voisine de la gare de Lyon.',
          'Gare Montparnasse (14e et 15e) : TGV vers Bordeaux, Nantes, Rennes et la Bretagne.',
          'Gare Saint-Lazare (8e) : trains vers la Normandie (Rouen, Le Havre, Caen).',
          'Gare d’Austerlitz (13e) : trains Intercités vers Orléans, Limoges et Toulouse, et trains de nuit.',
        ], paras: [
          'Quelle que soit la gare, indiquez-la comme adresse de prise en charge ou de destination dans le formulaire de réservation.',
        ] },
        { h2: 'Temps de trajet indicatifs depuis les gares', paras: [
          'Dans Paris, la durée d’un trajet entre deux gares ou entre une gare et votre adresse dépend surtout de l’heure : la circulation est dense en semaine de 8 h à 10 h et de 17 h à 20 h. Voici quelques trajets courants :',
        ], timesHead: 'trip', times: [
          ['Gare du Nord ↔ aéroport Roissy-CDG', '35 min à 1 h 15'],
          ['Gare de l’Est ↔ aéroport Roissy-CDG', '35 min à 1 h 15'],
          ['Gare de Lyon ↔ aéroport d’Orly', '25 à 50 min'],
          ['Gare Montparnasse ↔ aéroport d’Orly', '25 à 50 min'],
          ['Gare du Nord ↔ gare de Lyon', '15 à 35 min'],
          ['Gare Saint-Lazare ↔ gare Montparnasse', '15 à 35 min'],
        ] },
        { h2: 'Où retrouver votre chauffeur à la gare', paras: [
          'Les grandes gares parisiennes disposent de zones réservées à la dépose et à la prise en charge des voyageurs. Lors de la confirmation de votre course, précisez la gare, votre numéro de train et son heure d’arrivée prévue. Le lieu exact de rendez-vous vous est confirmé par téléphone ou WhatsApp avant la course.',
        ], list: [
          'À l’arrivée : dès la descente du train, appelez votre chauffeur au numéro communiqué lors de la confirmation.',
          'Au départ : le chauffeur vous dépose au plus près de l’entrée de la gare ; prévoyez le temps de rejoindre votre quai.',
          'En cas de changement d’horaire de votre train, prévenez-nous par téléphone ou WhatsApp.',
        ] },
        { h2: 'Ce qui est inclus dans votre transfert depuis une gare', list: [
          'Le trajet direct entre la gare et votre destination, ou l’inverse.',
          'Le véhicule de la catégorie choisie, avec son chauffeur.',
          'Le prix confirmé avant la course, selon le tableau des tarifs.',
          'Vos bagages dans la limite de la capacité du véhicule : 2 grandes valises et 2 petites en Mercedes Classe E ou Classe S, 4 valises en Tesla, 6 valises en Mercedes Classe V.',
          'Les péages, l’eau à bord, la facture et jusqu’à 1 h d’attente après l’arrivée du train ; un retard de train n’est jamais facturé.',
        ], paras: [
          'Aucun paiement n’est demandé sur le site : vous envoyez une demande de réservation et le prix vous est confirmé avant le départ.',
          'Une correspondance entre un train et un avion ? Nous assurons aussi les transferts entre les gares parisiennes et les aéroports de Roissy-CDG, d’Orly et de Beauvais.',
        ] },
      ],
      faq: [
        { q: 'Combien coûte un VTC entre une gare parisienne et l’aéroport CDG ou Orly ?', a: 'Selon le véhicule : 65 € en Tesla, 99 € en Mercedes Classe E, 130 € en Mercedes Classe V et 170 € en Mercedes Classe S. Tarifs indicatifs, confirmés avant la course.' },
        { q: 'Combien coûte un VTC entre une gare et une adresse dans Paris ?', a: 'C’est le tarif Paris Centre-ville : 50 € en Tesla, 65 € en Mercedes Classe E, 80 € en Mercedes Classe V et 100 € en Mercedes Classe S. Tarifs indicatifs, confirmés avant la course.' },
        { q: 'Quelles gares de Paris desservez-vous ?', a: 'Toutes les grandes gares parisiennes : gare du Nord, gare de l’Est, gare de Lyon, gare de Bercy, gare Montparnasse, gare Saint-Lazare et gare d’Austerlitz.' },
        { q: 'Faites-vous le trajet entre deux gares parisiennes ?', a: 'Oui, par exemple entre la gare du Nord et la gare de Lyon pour une correspondance. Le tarif Paris Centre-ville s’applique.' },
        { q: 'Pouvez-vous me prendre à l’arrivée d’un train de nuit tôt le matin ?', a: 'Oui, CDG TRANSFERT VTC est disponible 24 h/24 et 7 j/7. Précisez votre numéro de train et son heure d’arrivée lors de la confirmation de votre course.' },
        { q: 'Comment réserver un chauffeur à la gare ?', a: 'Remplissez le formulaire de réservation de cette page en indiquant la gare comme adresse, ou appelez le +33 6 65 69 96 78. Votre course est ensuite confirmée par téléphone ou WhatsApp.' },
        { q: 'Que se passe-t-il si mon train a du retard ?', a: 'Votre train est suivi en temps réel : un retard n’est jamais facturé, même de 4 ou 5 heures. L’attente est incluse jusqu’à 1 h après l’arrivée du train ; au-delà, elle est facturée au tarif horaire de la catégorie du véhicule.' },
      ],
    },
    en: {
      h1: 'Paris train station transfers: a private chauffeur as you step off the train',
      intro: [
        'Arriving by TGV, Eurostar or night train at one of the main Paris stations, or need to be there on time for a departure? CDG TRANSFERT VTC picks you up at the station and drives you to your hotel, your home, your meeting or straight to the airport, 24 hours a day, 7 days a week.',
        'Taxi rank queues at the stations can be long at busy times, and the metro with suitcases is never easy. When you book a private chauffeur, you know the fare in advance and your trip is arranged before you even step off the train. You book online, and your ride is then confirmed by phone or WhatsApp.',
      ],
      sections: [
        { h2: 'Fares for a chauffeur from a Paris station', rates: true, paras: [
          'Between a Paris station and an address in Paris, or between two stations, the “Paris City Centre” fare applies. Between a Paris station and Roissy-Charles de Gaulle or Orly airport, the airport fare applies. These fares are indicative and confirmed before the ride.',
          'For a station outside Paris (Marne-la-Vallée–Chessy, Massy TGV…) or a destination in the suburbs, the price is given on quote.',
        ] },
        { h2: 'The Paris stations we serve', list: [
          'Gare du Nord (10th): Eurostar to London, Brussels and Amsterdam, TGV to Lille and northern France.',
          'Gare de l’Est (10th): TGV to Reims, Metz, Nancy, Strasbourg, as well as to Germany and Luxembourg.',
          'Gare de Lyon (12th): TGV to Lyon, Marseille, Nice, Montpellier, the Alps, Switzerland and Italy.',
          'Gare de Bercy (12th), next to Gare de Lyon.',
          'Gare Montparnasse (14th and 15th): TGV to Bordeaux, Nantes, Rennes and Brittany.',
          'Gare Saint-Lazare (8th): trains to Normandy (Rouen, Le Havre, Caen).',
          'Gare d’Austerlitz (13th): Intercités trains to Orléans, Limoges and Toulouse, and night trains.',
        ], paras: [
          'Whichever the station, enter it as the pick-up address or the destination in the booking form.',
        ] },
        { h2: 'Indicative travel times from the stations', paras: [
          'Within Paris, the time between two stations or between a station and your address depends mostly on the hour: traffic is heavy on weekdays from 8 to 10 am and from 5 to 8 pm. Here are a few common trips:',
        ], timesHead: 'trip', times: [
          ['Gare du Nord ↔ Roissy-CDG airport', '35 min to 1 h 15'],
          ['Gare de l’Est ↔ Roissy-CDG airport', '35 min to 1 h 15'],
          ['Gare de Lyon ↔ Orly airport', '25 to 50 min'],
          ['Gare Montparnasse ↔ Orly airport', '25 to 50 min'],
          ['Gare du Nord ↔ Gare de Lyon', '15 to 35 min'],
          ['Gare Saint-Lazare ↔ Gare Montparnasse', '15 to 35 min'],
        ] },
        { h2: 'Where to meet your chauffeur at the station', paras: [
          'The main Paris stations have areas set aside for dropping off and picking up travellers. When we confirm your ride, give us the station, your train number and its expected arrival time. The exact meeting point is confirmed by phone or WhatsApp before the ride.',
        ], list: [
          'On arrival: as soon as you step off the train, call your chauffeur on the number given in the confirmation.',
          'On departure: the chauffeur drops you off as close as possible to the station entrance; allow time to reach your platform.',
          'If your train schedule changes, let us know by phone or WhatsApp.',
        ] },
        { h2: 'What your station transfer includes', list: [
          'The direct trip between the station and your destination, or the other way round.',
          'A vehicle of the category you chose, with its chauffeur.',
          'The fare confirmed before the ride, based on the price list.',
          'Your luggage within the vehicle’s capacity: 2 large and 2 small suitcases in a Mercedes E-Class or S-Class, 4 suitcases in a Tesla, 6 suitcases in a Mercedes V-Class.',
          'Tolls, water on board, an invoice and up to 1 hour of waiting after the train arrives; train delays are never charged.',
        ], paras: [
          'No payment is taken on the website: you send a booking request and the fare is confirmed before departure.',
          'Connecting from a train to a flight? We also provide transfers between the Paris stations and Roissy-CDG, Orly and Beauvais airports.',
        ] },
      ],
      faq: [
        { q: 'How much is a chauffeur between a Paris station and CDG or Orly airport?', a: 'It depends on the vehicle: €65 in a Tesla, €99 in a Mercedes E-Class, €130 in a Mercedes V-Class and €170 in a Mercedes S-Class. Indicative fares, confirmed before the ride.' },
        { q: 'How much is a chauffeur between a station and an address in Paris?', a: 'The Paris City Centre fare applies: €50 in a Tesla, €65 in a Mercedes E-Class, €80 in a Mercedes V-Class and €100 in a Mercedes S-Class. Indicative fares, confirmed before the ride.' },
        { q: 'Which Paris stations do you serve?', a: 'All the main Paris stations: Gare du Nord, Gare de l’Est, Gare de Lyon, Gare de Bercy, Gare Montparnasse, Gare Saint-Lazare and Gare d’Austerlitz.' },
        { q: 'Do you drive between two Paris stations?', a: 'Yes, for example between Gare du Nord and Gare de Lyon for a connection. The Paris City Centre fare applies.' },
        { q: 'Can you pick me up from a night train early in the morning?', a: 'Yes, CDG TRANSFERT VTC is available 24/7. Give us your train number and its arrival time when we confirm your ride.' },
        { q: 'How do I book a chauffeur at the station?', a: 'Fill in the booking form on this page with the station as the address, or call +33 6 65 69 96 78. Your ride is then confirmed by phone or WhatsApp.' },
        { q: 'What happens if my train is delayed?', a: 'Your train is tracked in real time: a delay is never charged, even one of 4 or 5 hours. Waiting time is included for up to 1 hour after the train arrives; beyond that, it is charged at the hourly rate of the vehicle category.' },
      ],
    },
    ru: {
      h1: 'Трансфер с вокзалов Парижа: частный водитель прямо с поезда',
      intro: [
        'Приезжаете на TGV, Eurostar или ночном поезде на один из крупных вокзалов Парижа или вам нужно вовремя успеть на поезд? CDG TRANSFERT VTC встретит вас на вокзале и отвезёт в отель, домой, на деловую встречу или прямо в аэропорт — круглосуточно и без выходных.',
        'Очереди на стоянках такси у вокзалов в часы наплыва бывают длинными, а метро с чемоданами — всегда непросто. Заказав частного водителя, вы заранее знаете цену, а поездка организована ещё до того, как вы выйдете из поезда. Вы бронируете онлайн, а затем поездка подтверждается по телефону или в WhatsApp.',
      ],
      sections: [
        { h2: 'Стоимость трансфера с вокзала Парижа', rates: true, paras: [
          'Между парижским вокзалом и адресом в Париже, а также между двумя вокзалами действует тариф «Центр Парижа». Между парижским вокзалом и аэропортом Руасси — Шарль-де-Голль или Орли действует тариф для аэропортов. Тарифы ориентировочные и подтверждаются до поездки.',
          'Для вокзала за пределами Парижа (Марн-ла-Валле — Шесси, Масси TGV…) или пункта назначения в пригороде стоимость рассчитывается по запросу.',
        ] },
        { h2: 'Вокзалы Парижа, которые мы обслуживаем', list: [
          'Северный вокзал (Gare du Nord, 10-й округ): Eurostar в Лондон, Брюссель и Амстердам, TGV в Лилль и на север Франции.',
          'Восточный вокзал (Gare de l’Est, 10-й округ): TGV в Реймс, Мец, Нанси, Страсбург, а также в Германию и Люксембург.',
          'Лионский вокзал (Gare de Lyon, 12-й округ): TGV в Лион, Марсель, Ниццу, Монпелье, Альпы, Швейцарию и Италию.',
          'Вокзал Берси (Gare de Bercy, 12-й округ), рядом с Лионским вокзалом.',
          'Вокзал Монпарнас (Gare Montparnasse, 14-й и 15-й округа): TGV в Бордо, Нант, Ренн и Бретань.',
          'Вокзал Сен-Лазар (Gare Saint-Lazare, 8-й округ): поезда в Нормандию (Руан, Гавр, Кан).',
          'Аустерлицкий вокзал (Gare d’Austerlitz, 13-й округ): поезда Intercités в Орлеан, Лимож и Тулузу, а также ночные поезда.',
        ], paras: [
          'Какой бы ни был вокзал, укажите его в форме бронирования как адрес посадки или пункт назначения.',
        ] },
        { h2: 'Ориентировочное время в пути от вокзалов', paras: [
          'В Париже время поездки между двумя вокзалами или от вокзала до вашего адреса зависит прежде всего от часа: по будням движение плотное с 8:00 до 10:00 и с 17:00 до 20:00. Вот несколько популярных маршрутов:',
        ], timesHead: 'trip', times: [
          ['Северный вокзал ↔ аэропорт Руасси-CDG', 'от 35 мин до 1 ч 15 мин'],
          ['Восточный вокзал ↔ аэропорт Руасси-CDG', 'от 35 мин до 1 ч 15 мин'],
          ['Лионский вокзал ↔ аэропорт Орли', '25–50 мин'],
          ['Вокзал Монпарнас ↔ аэропорт Орли', '25–50 мин'],
          ['Северный вокзал ↔ Лионский вокзал', '15–35 мин'],
          ['Вокзал Сен-Лазар ↔ вокзал Монпарнас', '15–35 мин'],
        ] },
        { h2: 'Где встретиться с водителем на вокзале', paras: [
          'На крупных вокзалах Парижа есть специальные зоны для высадки и посадки пассажиров. При подтверждении поездки сообщите вокзал, номер поезда и ожидаемое время прибытия. Точное место встречи подтверждается по телефону или в WhatsApp до поездки.',
        ], list: [
          'При прибытии: сразу после выхода из поезда позвоните водителю по номеру из подтверждения.',
          'При отправлении: водитель высадит вас как можно ближе ко входу в вокзал; оставьте время, чтобы дойти до платформы.',
          'Если расписание вашего поезда изменилось, сообщите нам по телефону или в WhatsApp.',
        ] },
        { h2: 'Что входит в трансфер с вокзала', list: [
          'Прямая поездка между вокзалом и пунктом назначения или в обратном направлении.',
          'Автомобиль выбранной категории с водителем.',
          'Цена, подтверждённая до поездки, согласно таблице тарифов.',
          'Багаж в пределах вместимости автомобиля: 2 больших и 2 маленьких чемодана в Mercedes E-класса или S-класса, 4 чемодана в Tesla, 6 чемоданов в Mercedes V-класса.',
          'Платные дороги, вода в салоне, счёт и до 1 часа ожидания после прибытия поезда; задержка поезда не оплачивается.',
        ], paras: [
          'На сайте ничего не нужно оплачивать: вы отправляете заявку на бронирование, а цена подтверждается до выезда.',
          'Пересадка с поезда на самолёт? Мы также выполняем трансферы между вокзалами Парижа и аэропортами Руасси-CDG, Орли и Бове.',
        ] },
      ],
      faq: [
        { q: 'Сколько стоит трансфер между вокзалом Парижа и аэропортом CDG или Орли?', a: 'В зависимости от автомобиля: 65 € на Tesla, 99 € на Mercedes E-класса, 130 € на Mercedes V-класса и 170 € на Mercedes S-класса. Тарифы ориентировочные и подтверждаются до поездки.' },
        { q: 'Сколько стоит поездка между вокзалом и адресом в Париже?', a: 'Действует тариф «Центр Парижа»: 50 € на Tesla, 65 € на Mercedes E-класса, 80 € на Mercedes V-класса и 100 € на Mercedes S-класса. Тарифы ориентировочные и подтверждаются до поездки.' },
        { q: 'Какие вокзалы Парижа вы обслуживаете?', a: 'Все крупные вокзалы Парижа: Северный, Восточный, Лионский, Берси, Монпарнас, Сен-Лазар и Аустерлицкий.' },
        { q: 'Вы возите между двумя вокзалами Парижа?', a: 'Да, например между Северным и Лионским вокзалами при пересадке. Действует тариф «Центр Парижа».' },
        { q: 'Можно ли встретить меня с ночного поезда рано утром?', a: 'Да, CDG TRANSFERT VTC работает круглосуточно. Сообщите номер поезда и время его прибытия при подтверждении поездки.' },
        { q: 'Как заказать водителя на вокзал?', a: 'Заполните форму бронирования на этой странице, указав вокзал в качестве адреса, или позвоните по номеру +33 6 65 69 96 78. Затем поездка подтверждается по телефону или в WhatsApp.' },
        { q: 'Что будет, если мой поезд задержится?', a: 'Мы отслеживаем ваш поезд в реальном времени: задержка никогда не оплачивается, даже на 4–5 часов. Ожидание включено в течение 1 часа после прибытия поезда; сверх этого оно оплачивается по почасовому тарифу категории автомобиля.' },
      ],
    },
    ro: {
      h1: 'VTC gările din Paris: șofer privat la coborârea din tren',
      intro: [
        'Ajungeți cu TGV-ul, cu Eurostar sau cu un tren de noapte într-una dintre marile gări din Paris, ori trebuie să fiți acolo la timp pentru o plecare? CDG TRANSFERT VTC vă preia de la gară și vă duce la hotel, acasă, la o întâlnire sau direct la aeroport, 24 de ore din 24, 7 zile din 7.',
        'Cozile la stațiile de taxi din gări pot fi lungi la orele aglomerate, iar metroul cu valize nu este niciodată simplu. Rezervând un șofer privat, cunoașteți prețul dinainte, iar drumul este organizat înainte chiar să coborâți din tren. Rezervați online, apoi cursa vă este confirmată prin telefon sau WhatsApp.',
      ],
      sections: [
        { h2: 'Tarifele unui VTC dintr-o gară din Paris', rates: true, paras: [
          'Între o gară din Paris și o adresă din Paris, sau între două gări, se aplică tariful „Centrul Parisului”. Între o gară din Paris și aeroportul Roissy-Charles de Gaulle sau Orly se aplică tariful pentru aeroport. Tarifele sunt orientative și vă sunt confirmate înainte de cursă.',
          'Pentru o gară din afara Parisului (Marne-la-Vallée–Chessy, Massy TGV…) sau o destinație din suburbii, prețul se stabilește la cerere.',
        ] },
        { h2: 'Gările din Paris pe care le deservim', list: [
          'Gare du Nord (arondismentul 10): Eurostar spre Londra, Bruxelles și Amsterdam, TGV spre Lille și nordul Franței.',
          'Gare de l’Est (arondismentul 10): TGV spre Reims, Metz, Nancy, Strasbourg, precum și spre Germania și Luxemburg.',
          'Gare de Lyon (arondismentul 12): TGV spre Lyon, Marsilia, Nisa, Montpellier, Alpi, Elveția și Italia.',
          'Gare de Bercy (arondismentul 12), lângă Gare de Lyon.',
          'Gare Montparnasse (arondismentele 14 și 15): TGV spre Bordeaux, Nantes, Rennes și Bretania.',
          'Gare Saint-Lazare (arondismentul 8): trenuri spre Normandia (Rouen, Le Havre, Caen).',
          'Gare d’Austerlitz (arondismentul 13): trenuri Intercités spre Orléans, Limoges și Toulouse, și trenuri de noapte.',
        ], paras: [
          'Oricare ar fi gara, indicați-o ca adresă de preluare sau ca destinație în formularul de rezervare.',
        ] },
        { h2: 'Durate orientative de drum din gări', paras: [
          'În Paris, durata unei curse între două gări sau între o gară și adresa dumneavoastră depinde mai ales de oră: traficul este intens în zilele lucrătoare între 8:00 și 10:00 și între 17:00 și 20:00. Iată câteva trasee frecvente:',
        ], timesHead: 'trip', times: [
          ['Gare du Nord ↔ aeroportul Roissy-CDG', '35 min – 1 h 15'],
          ['Gare de l’Est ↔ aeroportul Roissy-CDG', '35 min – 1 h 15'],
          ['Gare de Lyon ↔ aeroportul Orly', '25 – 50 min'],
          ['Gare Montparnasse ↔ aeroportul Orly', '25 – 50 min'],
          ['Gare du Nord ↔ Gare de Lyon', '15 – 35 min'],
          ['Gare Saint-Lazare ↔ Gare Montparnasse', '15 – 35 min'],
        ] },
        { h2: 'Unde vă găsiți șoferul la gară', paras: [
          'Marile gări din Paris au zone rezervate pentru lăsarea și preluarea călătorilor. La confirmarea cursei, comunicați-ne gara, numărul trenului și ora estimată de sosire. Locul exact de întâlnire vă este confirmat prin telefon sau WhatsApp înainte de cursă.',
        ], list: [
          'La sosire: imediat ce coborâți din tren, sunați-vă șoferul la numărul comunicat în confirmare.',
          'La plecare: șoferul vă lasă cât mai aproape de intrarea în gară; lăsați-vă timp să ajungeți la peron.',
          'Dacă orarul trenului se schimbă, anunțați-ne prin telefon sau WhatsApp.',
        ] },
        { h2: 'Ce include transferul de la gară', list: [
          'Cursa directă între gară și destinația dumneavoastră, sau invers.',
          'Vehiculul din categoria aleasă, cu șoferul său.',
          'Prețul confirmat înainte de cursă, conform tabelului de tarife.',
          'Bagajele în limita capacității vehiculului: 2 valize mari și 2 mici în Mercedes Clasa E sau Clasa S, 4 valize în Tesla, 6 valize în Mercedes Clasa V.',
          'Taxele de autostradă, apa la bord, factura și până la 1 oră de așteptare după sosirea trenului; întârzierea trenului nu se facturează.',
        ], paras: [
          'Site-ul nu cere nicio plată: trimiteți o cerere de rezervare, iar prețul vă este confirmat înainte de plecare.',
          'Aveți o legătură între tren și avion? Asigurăm și transferuri între gările din Paris și aeroporturile Roissy-CDG, Orly și Beauvais.',
        ] },
      ],
      faq: [
        { q: 'Cât costă un VTC între o gară din Paris și aeroportul CDG sau Orly?', a: 'În funcție de vehicul: 65 € cu Tesla, 99 € cu Mercedes Clasa E, 130 € cu Mercedes Clasa V și 170 € cu Mercedes Clasa S. Tarife orientative, confirmate înainte de cursă.' },
        { q: 'Cât costă un VTC între o gară și o adresă din Paris?', a: 'Se aplică tariful Centrul Parisului: 50 € cu Tesla, 65 € cu Mercedes Clasa E, 80 € cu Mercedes Clasa V și 100 € cu Mercedes Clasa S. Tarife orientative, confirmate înainte de cursă.' },
        { q: 'Ce gări din Paris deserviți?', a: 'Toate marile gări din Paris: Gare du Nord, Gare de l’Est, Gare de Lyon, Gare de Bercy, Gare Montparnasse, Gare Saint-Lazare și Gare d’Austerlitz.' },
        { q: 'Faceți cursa între două gări din Paris?', a: 'Da, de exemplu între Gare du Nord și Gare de Lyon pentru o legătură. Se aplică tariful Centrul Parisului.' },
        { q: 'Mă puteți prelua de la un tren de noapte dis-de-dimineață?', a: 'Da, CDG TRANSFERT VTC este disponibil 24/7. Comunicați-ne numărul trenului și ora de sosire la confirmarea cursei.' },
        { q: 'Cum rezerv un șofer la gară?', a: 'Completați formularul de rezervare de pe această pagină, cu gara ca adresă, sau sunați la +33 6 65 69 96 78. Cursa vă este apoi confirmată prin telefon sau WhatsApp.' },
        { q: 'Ce se întâmplă dacă trenul meu întârzie?', a: 'Trenul dumneavoastră este urmărit în timp real: o întârziere nu este niciodată facturată, chiar și de 4 sau 5 ore. Așteptarea este inclusă până la 1 oră după sosirea trenului; peste acest timp, se facturează la tariful orar al categoriei vehiculului.' },
      ],
    },
  },
}
