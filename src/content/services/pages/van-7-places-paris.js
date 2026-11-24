// ── Page service : van 7 places avec chauffeur (Mercedes Classe V) ───
// Contenu unique par langue. Prix : colonne « van » du tableau des tarifs
// (lignes aéroports, Paris, Beauvais), mention « tarif indicatif ».
// 7 places = 6 passagers + le chauffeur (src/constants/vehicles.js).
// ────────────────────────────────────────────────────────────────────

export default {
  i18n: {
    fr: {
      h1: 'Van 7 places avec chauffeur à Paris : le Mercedes Classe V pour 6 passagers',
      intro: [
        'Vous voyagez en famille, entre amis ou en équipe ? Le van Mercedes Classe V de CDG TRANSFERT VTC compte 7 places : 6 pour les passagers et 1 pour le chauffeur, avec de la place pour 7 valises. Tout le groupe voyage ensemble, dans un seul véhicule, entre Paris, l’Île-de-France et les aéroports de Roissy-Charles-de-Gaulle, d’Orly et de Beauvais.',
        'Le service est disponible 24 heures sur 24 et 7 jours sur 7. Vous réservez en ligne en choisissant la catégorie Van, vous voyez immédiatement une estimation du prix, puis votre course est confirmée par téléphone ou par WhatsApp.',
      ],
      sections: [
        { h2: 'Tarifs du van 7 places avec chauffeur', rates: true, paras: [
          'Les tarifs ci-dessous sont ceux de la colonne Van de notre grille : ils s’appliquent au véhicule entier, quel que soit le nombre de passagers jusqu’à 6. Ils sont indicatifs et vous sont confirmés avant la course.',
          'Pour un trajet qui ne figure pas dans ce tableau (Disneyland Paris, Versailles, une autre ville d’Île-de-France ou un trajet de longue distance), le prix est établi sur devis.',
        ] },
        { h2: 'Capacité : 6 passagers et 7 valises', paras: [
          'Le Mercedes Classe V accueille jusqu’à 6 passagers à l’arrière et jusqu’à 7 valises. C’est la solution la plus simple dès que votre groupe dépasse la capacité d’une berline (3 passagers, 2 grandes valises et 2 petites en Mercedes Classe E ou Classe S ; 4 passagers et 4 valises en Tesla).',
          'Un seul van évite de réserver deux voitures et permet à tout le groupe d’arriver en même temps. Pour un groupe plus nombreux, plusieurs vans ou berlines peuvent être réservés ensemble : avec notre réseau de chauffeurs partenaires vérifiés, nous disposons de 4 Classe V. Si vous transportez des bagages volumineux, comme des poussettes ou des sacs de sport, signalez-le lors de la confirmation de votre course.',
        ], list: [
          'Familles avec enfants, poussettes et valises.',
          'Groupes d’amis en voyage à Paris.',
          'Équipes et délégations en déplacement professionnel.',
          'Invités d’un événement à conduire ensemble d’un lieu à l’autre.',
        ] },
        { h2: 'Temps de trajet indicatifs en van depuis Paris', paras: [
          'Le van emprunte les mêmes itinéraires qu’une berline. La durée dépend surtout de l’heure et de la circulation :',
        ], timesHead: 'trip', times: [
          ['Paris centre ↔ aéroport Roissy-CDG', '30 min à 1 h 30'],
          ['Paris centre ↔ aéroport d’Orly', '20 min à 1 h 15'],
          ['Paris centre ↔ aéroport de Beauvais', '1 h à 2 h 15'],
          ['Paris centre ↔ Disneyland Paris', '40 min à 1 h 15'],
        ] },
        { h2: 'Où retrouver votre chauffeur', paras: [
          'À l’aéroport, à la gare, devant votre hôtel ou à votre domicile : le chauffeur vous prend en charge à l’adresse indiquée dans le formulaire. Lors de la confirmation de votre course, précisez votre numéro de vol ou de train si vous arrivez en avion ou en train ; le lieu exact de rendez-vous vous est confirmé par téléphone ou WhatsApp avant la course.',
        ], list: [
          'Gardez votre téléphone allumé à l’arrivée pour rester joignable.',
          'Regroupez les passagers et les bagages au même endroit pour faciliter le chargement.',
          'Si vos horaires changent, prévenez-nous par téléphone ou WhatsApp.',
        ] },
        { h2: 'Ce qui est inclus dans votre réservation de van', list: [
          'Le trajet direct entre l’adresse de prise en charge et la destination indiquées à la réservation.',
          'Le van Mercedes Classe V avec son chauffeur.',
          'Le prix confirmé avant la course, selon le tableau des tarifs.',
          'Jusqu’à 6 passagers et 7 valises.',
          'Les péages, l’eau à bord, la facture et jusqu’à 1 h d’attente après l’atterrissage ou l’arrivée du train.',
          'La confirmation de votre course par téléphone ou WhatsApp.',
        ], paras: [
          'Aucun paiement n’est demandé sur le site : vous envoyez une demande de réservation et le prix vous est confirmé avant le départ. Besoin du van pour plusieurs heures ? Consultez notre service de mise à disposition, facturé 80 € de l’heure en Classe V (minimum 3 h).',
        ] },
      ],
      faq: [
        { q: 'Combien coûte un van 7 places avec chauffeur à Paris ?', a: 'Avec le van Mercedes Classe V : 130 € entre Paris et l’aéroport CDG ou Orly, 80 € pour un trajet dans Paris et 250 € entre Paris et Beauvais. Tarifs indicatifs, confirmés avant la course.' },
        { q: 'Combien de passagers et de bagages peut-on transporter ?', a: 'Jusqu’à 6 passagers et 7 valises dans le van Mercedes Classe V. Au-delà, plusieurs véhicules peuvent être réservés ensemble grâce à notre réseau de chauffeurs partenaires vérifiés.' },
        { q: 'Pourquoi parle-t-on de van 7 places ?', a: 'Le Mercedes Classe V compte 7 places assises : 6 pour les passagers et 1 pour le chauffeur.' },
        { q: 'Le van est-il disponible la nuit et tôt le matin ?', a: 'Oui, CDG TRANSFERT VTC est disponible 24 h/24 et 7 j/7, y compris pour les vols très matinaux.' },
        { q: 'Peut-on réserver le van pour aller à Disneyland Paris ?', a: 'Oui, sur devis, car ce trajet ne figure pas dans le tableau des tarifs. Indiquez vos adresses dans le formulaire pour recevoir une proposition.' },
        { q: 'Comment réserver le van ?', a: 'Choisissez la catégorie Van dans le formulaire de réservation de cette page ou appelez le +33 6 65 69 96 78. Votre course est ensuite confirmée par téléphone ou WhatsApp.' },
      ],
    },
    en: {
      h1: '7-seater van with driver in Paris: the Mercedes V-Class for 6 passengers',
      intro: [
        'Travelling with family, friends or colleagues? The CDG TRANSFERT VTC Mercedes V-Class van has 7 seats: 6 for passengers and 1 for the driver, with room for 7 suitcases. The whole group travels together, in a single vehicle, between Paris, the Île-de-France region and Roissy-Charles de Gaulle, Orly and Beauvais airports.',
        'The service is available 24 hours a day, 7 days a week. You book online by choosing the Van category, see an instant fare estimate, and your ride is then confirmed by phone or WhatsApp.',
      ],
      sections: [
        { h2: 'Fares for the 7-seater van with driver', rates: true, paras: [
          'The fares below come from the Van column of our price list: they apply to the whole vehicle, whatever the number of passengers up to 6. They are indicative and confirmed before the ride.',
          'For a trip that is not in this table (Disneyland Paris, Versailles, another town in Île-de-France or a long-distance trip), the price is given on quote.',
        ] },
        { h2: 'Capacity: 6 passengers and 7 suitcases', paras: [
          'The Mercedes V-Class seats up to 6 passengers in the back and carries up to 7 suitcases. It is the simplest option as soon as your group exceeds the capacity of a saloon (3 passengers, 2 large and 2 small suitcases in a Mercedes E-Class or S-Class; 4 passengers and 4 suitcases in a Tesla).',
          'A single van means there is no need to book two cars, and the whole group arrives at the same time. For a larger group, several vans or saloons can be booked together: with our network of vetted partner chauffeurs, we have 4 V-Class vans. If you are carrying bulky items such as pushchairs or sports bags, mention it when we confirm your ride.',
        ], list: [
          'Families with children, pushchairs and suitcases.',
          'Groups of friends visiting Paris.',
          'Teams and delegations on business trips.',
          'Event guests to be driven together from one venue to another.',
        ] },
        { h2: 'Indicative travel times by van from Paris', paras: [
          'The van takes the same routes as a saloon. The journey time depends mostly on the hour and the traffic:',
        ], timesHead: 'trip', times: [
          ['Central Paris ↔ Roissy-CDG airport', '30 min to 1 h 30'],
          ['Central Paris ↔ Orly airport', '20 min to 1 h 15'],
          ['Central Paris ↔ Beauvais airport', '1 h to 2 h 15'],
          ['Central Paris ↔ Disneyland Paris', '40 min to 1 h 15'],
        ] },
        { h2: 'Where to meet your driver', paras: [
          'At the airport, the station, in front of your hotel or at your home: the driver picks you up at the address entered in the form. When we confirm your ride, give us your flight or train number if you are arriving by plane or train; the exact meeting point is confirmed by phone or WhatsApp before the ride.',
        ], list: [
          'Keep your phone switched on when you arrive so that you can be reached.',
          'Gather passengers and luggage in one place to make loading easier.',
          'If your times change, let us know by phone or WhatsApp.',
        ] },
        { h2: 'What your van booking includes', list: [
          'The direct trip between the pick-up address and the destination given when booking.',
          'The Mercedes V-Class van with its driver.',
          'The fare confirmed before the ride, based on the price list.',
          'Up to 6 passengers and 7 suitcases.',
          'Tolls, water on board, an invoice and up to 1 hour of waiting after landing or after the train arrives.',
          'Confirmation of your ride by phone or WhatsApp.',
        ], paras: [
          'No payment is taken on the website: you send a booking request and the fare is confirmed before departure. Need the van for several hours? See our chauffeur-by-the-hour service, charged at €80 per hour for the V-Class (3-hour minimum).',
        ] },
      ],
      faq: [
        { q: 'How much is a 7-seater van with driver in Paris?', a: 'With the Mercedes V-Class van: €130 between Paris and CDG or Orly airport, €80 for a trip within Paris and €250 between Paris and Beauvais. Indicative fares, confirmed before the ride.' },
        { q: 'How many passengers and bags can it carry?', a: 'Up to 6 passengers and 7 suitcases in the Mercedes V-Class van. For larger groups, several vehicles can be booked together through our network of vetted partner chauffeurs.' },
        { q: 'Why is it called a 7-seater van?', a: 'The Mercedes V-Class has 7 seats: 6 for passengers and 1 for the driver.' },
        { q: 'Is the van available at night and early in the morning?', a: 'Yes, CDG TRANSFERT VTC is available 24/7, including for very early flights.' },
        { q: 'Can we book the van to go to Disneyland Paris?', a: 'Yes, on quote, as this trip is not in the price list. Enter your addresses in the form to receive a proposal.' },
        { q: 'How do I book the van?', a: 'Choose the Van category in the booking form on this page or call +33 6 65 69 96 78. Your ride is then confirmed by phone or WhatsApp.' },
      ],
    },
    ru: {
      h1: 'Минивэн на 7 мест с водителем в Париже: Mercedes V-класса для 6 пассажиров',
      intro: [
        'Путешествуете с семьёй, друзьями или коллегами? В минивэне Mercedes V-класса от CDG TRANSFERT VTC 7 мест: 6 для пассажиров и 1 для водителя, а также место для 7 чемоданов. Вся группа едет вместе, в одном автомобиле, между Парижем, регионом Иль-де-Франс и аэропортами Руасси — Шарль-де-Голль, Орли и Бове.',
        'Услуга доступна круглосуточно и без выходных. Вы бронируете онлайн, выбрав категорию Van, сразу видите ориентировочную стоимость, а затем поездка подтверждается по телефону или в WhatsApp.',
      ],
      sections: [
        { h2: 'Стоимость минивэна на 7 мест с водителем', rates: true, paras: [
          'Тарифы ниже взяты из колонки «Ван» нашего прайс-листа: они действуют на весь автомобиль, независимо от числа пассажиров (до 6). Тарифы ориентировочные и подтверждаются до поездки.',
          'Для маршрута, которого нет в этой таблице (Диснейленд Париж, Версаль, другой город Иль-де-Франс или дальняя поездка), стоимость рассчитывается по запросу.',
        ] },
        { h2: 'Вместимость: 6 пассажиров и 7 чемоданов', paras: [
          'Mercedes V-класса вмещает до 6 пассажиров в салоне и до 7 чемоданов. Это самое простое решение, если ваша группа больше, чем помещается в седан (3 пассажира, 2 больших и 2 маленьких чемодана в Mercedes E-класса или S-класса; 4 пассажира и 4 чемодана в Tesla).',
          'Один минивэн избавляет от необходимости заказывать две машины, и вся группа приезжает одновременно. Для более многочисленной группы можно заказать сразу несколько минивэнов или седанов: вместе с сетью проверенных водителей-партнёров у нас 4 автомобиля V-класса. Если вы везёте крупногабаритный багаж, например коляски или спортивные сумки, сообщите об этом при подтверждении поездки.',
        ], list: [
          'Семьи с детьми, колясками и чемоданами.',
          'Компании друзей, путешествующие по Парижу.',
          'Команды и делегации в деловых поездках.',
          'Гости мероприятия, которых нужно отвезти вместе с одного места на другое.',
        ] },
        { h2: 'Ориентировочное время в пути на минивэне из Парижа', paras: [
          'Минивэн едет по тем же маршрутам, что и седан. Время в пути зависит прежде всего от часа и трафика:',
        ], timesHead: 'trip', times: [
          ['Центр Парижа ↔ аэропорт Руасси-CDG', 'от 30 мин до 1 ч 30 мин'],
          ['Центр Парижа ↔ аэропорт Орли', 'от 20 мин до 1 ч 15 мин'],
          ['Центр Парижа ↔ аэропорт Бове', 'от 1 ч до 2 ч 15 мин'],
          ['Центр Парижа ↔ Диснейленд Париж', 'от 40 мин до 1 ч 15 мин'],
        ] },
        { h2: 'Где встретиться с водителем', paras: [
          'В аэропорту, на вокзале, у отеля или у дома: водитель забирает вас по адресу, указанному в форме. При подтверждении поездки сообщите номер рейса или поезда, если прилетаете или приезжаете; точное место встречи подтверждается по телефону или в WhatsApp до поездки.',
        ], list: [
          'Не выключайте телефон по прибытии, чтобы оставаться на связи.',
          'Соберите пассажиров и багаж в одном месте, чтобы облегчить погрузку.',
          'Если ваши планы изменились, сообщите нам об этом по телефону или в WhatsApp.',
        ] },
        { h2: 'Что входит в бронирование минивэна', list: [
          'Прямая поездка между адресом посадки и пунктом назначения, указанными при бронировании.',
          'Минивэн Mercedes V-класса с водителем.',
          'Цена, подтверждённая до поездки, согласно таблице тарифов.',
          'До 6 пассажиров и 7 чемоданов.',
          'Платные дороги, вода в салоне, счёт и до 1 часа ожидания после посадки самолёта или прибытия поезда.',
          'Подтверждение поездки по телефону или в WhatsApp.',
        ], paras: [
          'На сайте ничего не нужно оплачивать: вы отправляете заявку на бронирование, а цена подтверждается до выезда. Нужен минивэн на несколько часов? Посмотрите нашу услугу «водитель на час»: 80 € в час за V-класс (минимум 3 часа).',
        ] },
      ],
      faq: [
        { q: 'Сколько стоит минивэн на 7 мест с водителем в Париже?', a: 'С минивэном Mercedes V-класса: 130 € между Парижем и аэропортом CDG или Орли, 80 € за поездку по Парижу и 250 € между Парижем и Бове. Тарифы ориентировочные и подтверждаются до поездки.' },
        { q: 'Сколько пассажиров и багажа помещается?', a: 'До 6 пассажиров и 7 чемоданов в минивэне Mercedes V-класса. Для больших групп можно заказать сразу несколько автомобилей благодаря сети проверенных водителей-партнёров.' },
        { q: 'Почему минивэн называют семиместным?', a: 'В Mercedes V-класса 7 посадочных мест: 6 для пассажиров и 1 для водителя.' },
        { q: 'Минивэн доступен ночью и рано утром?', a: 'Да, CDG TRANSFERT VTC работает круглосуточно и без выходных, в том числе для очень ранних рейсов.' },
        { q: 'Можно ли заказать минивэн до Диснейленд Париж?', a: 'Да, по запросу, так как этого маршрута нет в таблице тарифов. Укажите адреса в форме, чтобы получить предложение.' },
        { q: 'Как забронировать минивэн?', a: 'Выберите категорию Van в форме бронирования на этой странице или позвоните по номеру +33 6 65 69 96 78. Затем поездка подтверждается по телефону или в WhatsApp.' },
      ],
    },
    ro: {
      h1: 'Van de 7 locuri cu șofer în Paris: Mercedes Clasa V pentru 6 pasageri',
      intro: [
        'Călătoriți cu familia, cu prietenii sau cu colegii? Van-ul Mercedes Clasa V al CDG TRANSFERT VTC are 7 locuri: 6 pentru pasageri și 1 pentru șofer, cu loc pentru 7 valize. Tot grupul călătorește împreună, într-un singur vehicul, între Paris, regiunea Île-de-France și aeroporturile Roissy-Charles de Gaulle, Orly și Beauvais.',
        'Serviciul este disponibil 24 de ore din 24, 7 zile din 7. Rezervați online alegând categoria Van, vedeți imediat o estimare a prețului, iar cursa vă este apoi confirmată prin telefon sau WhatsApp.',
      ],
      sections: [
        { h2: 'Tarifele van-ului de 7 locuri cu șofer', rates: true, paras: [
          'Tarifele de mai jos provin din coloana Van a listei noastre de prețuri: se aplică întregului vehicul, oricare ar fi numărul de pasageri, până la 6. Sunt orientative și vă sunt confirmate înainte de cursă.',
          'Pentru o cursă care nu figurează în acest tabel (Disneyland Paris, Versailles, altă localitate din Île-de-France sau o cursă pe distanță lungă), prețul se stabilește la cerere.',
        ] },
        { h2: 'Capacitate: 6 pasageri și 7 valize', paras: [
          'Mercedes Clasa V primește până la 6 pasageri în spate și până la 7 valize. Este soluția cea mai simplă de îndată ce grupul depășește capacitatea unei berline (3 pasageri, 2 valize mari și 2 mici în Mercedes Clasa E sau Clasa S; 4 pasageri și 4 valize în Tesla).',
          'Un singur van vă scutește de rezervarea a două mașini, iar tot grupul ajunge în același timp. Pentru un grup mai numeros se pot rezerva mai multe vanuri sau berline deodată: împreună cu rețeaua noastră de șoferi parteneri verificați, dispunem de 4 vehicule Clasa V. Dacă transportați bagaje voluminoase, cum ar fi cărucioare sau genți de sport, menționați acest lucru la confirmarea cursei.',
        ], list: [
          'Familii cu copii, cărucioare și valize.',
          'Grupuri de prieteni în vizită la Paris.',
          'Echipe și delegații în deplasare profesională.',
          'Invitații unui eveniment, de dus împreună dintr-un loc în altul.',
        ] },
        { h2: 'Durate orientative de drum cu van-ul din Paris', paras: [
          'Van-ul folosește aceleași trasee ca o berlină. Durata depinde mai ales de oră și de trafic:',
        ], timesHead: 'trip', times: [
          ['Centrul Parisului ↔ aeroportul Roissy-CDG', '30 min – 1 h 30'],
          ['Centrul Parisului ↔ aeroportul Orly', '20 min – 1 h 15'],
          ['Centrul Parisului ↔ aeroportul Beauvais', '1 h – 2 h 15'],
          ['Centrul Parisului ↔ Disneyland Paris', '40 min – 1 h 15'],
        ] },
        { h2: 'Unde vă găsiți șoferul', paras: [
          'La aeroport, la gară, în fața hotelului sau acasă: șoferul vă preia de la adresa indicată în formular. La confirmarea cursei, comunicați-ne numărul zborului sau al trenului dacă sosiți cu avionul sau cu trenul; locul exact de întâlnire vă este confirmat prin telefon sau WhatsApp înainte de cursă.',
        ], list: [
          'Țineți telefonul pornit la sosire pentru a putea fi contactat.',
          'Adunați pasagerii și bagajele în același loc pentru a ușura încărcarea.',
          'Dacă orarul se schimbă, anunțați-ne prin telefon sau WhatsApp.',
        ] },
        { h2: 'Ce include rezervarea van-ului', list: [
          'Cursa directă între adresa de preluare și destinația indicate la rezervare.',
          'Van-ul Mercedes Clasa V cu șoferul său.',
          'Prețul confirmat înainte de cursă, conform tabelului de tarife.',
          'Până la 6 pasageri și 7 valize.',
          'Taxele de autostradă, apa la bord, factura și până la 1 oră de așteptare după aterizare sau după sosirea trenului.',
          'Confirmarea cursei prin telefon sau WhatsApp.',
        ], paras: [
          'Site-ul nu cere nicio plată: trimiteți o cerere de rezervare, iar prețul vă este confirmat înainte de plecare. Aveți nevoie de van pentru mai multe ore? Consultați serviciul nostru de șofer la dispoziție: 80 € pe oră pentru Clasa V (minimum 3 ore).',
        ] },
      ],
      faq: [
        { q: 'Cât costă un van de 7 locuri cu șofer în Paris?', a: 'Cu van-ul Mercedes Clasa V: 130 € între Paris și aeroportul CDG sau Orly, 80 € pentru o cursă în Paris și 250 € între Paris și Beauvais. Tarife orientative, confirmate înainte de cursă.' },
        { q: 'Câți pasageri și câte bagaje poate transporta?', a: 'Până la 6 pasageri și 7 valize în van-ul Mercedes Clasa V. Pentru grupuri mai mari se pot rezerva mai multe vehicule deodată, prin rețeaua noastră de șoferi parteneri verificați.' },
        { q: 'De ce se numește van de 7 locuri?', a: 'Mercedes Clasa V are 7 locuri: 6 pentru pasageri și 1 pentru șofer.' },
        { q: 'Van-ul este disponibil noaptea și dis-de-dimineață?', a: 'Da, CDG TRANSFERT VTC este disponibil 24/7, inclusiv pentru zborurile foarte matinale.' },
        { q: 'Putem rezerva van-ul pentru Disneyland Paris?', a: 'Da, la cerere, deoarece această cursă nu figurează în tabelul de tarife. Completați adresele în formular pentru a primi o ofertă.' },
        { q: 'Cum rezerv van-ul?', a: 'Alegeți categoria Van în formularul de rezervare de pe această pagină sau sunați la +33 6 65 69 96 78. Cursa vă este apoi confirmată prin telefon sau WhatsApp.' },
      ],
    },
  },
}
