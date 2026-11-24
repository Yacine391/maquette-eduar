// ── Page service : VTC Disneyland Paris (Marne-la-Vallée) ────────────
// Contenu unique par langue. Trajet absent du tableau des tarifs : prix
// « sur devis » uniquement (aucun montant affiché ni en JSON-LD).
// ────────────────────────────────────────────────────────────────────

export default {
  i18n: {
    fr: {
      h1: 'VTC Disneyland Paris : chauffeur privé depuis Paris et les aéroports',
      intro: [
        'Vous partez en famille à Disneyland Paris ? CDG TRANSFERT VTC vous conduit de votre hôtel parisien, de votre domicile, de la gare ou directement de l’aéroport jusqu’aux parcs et aux hôtels du domaine, à Marne-la-Vallée. Le service est disponible 24 heures sur 24 et 7 jours sur 7, à l’aller comme au retour.',
        'Disneyland Paris se trouve à environ 32 kilomètres à l’est de Paris, en Seine-et-Marne, et se rejoint par l’autoroute A4. Avec des enfants, une poussette et plusieurs valises, un chauffeur privé vous évite les correspondances en RER ou en navette : vous partez de votre porte et arrivez à destination sans changement.',
      ],
      sections: [
        { h2: 'Prix d’un VTC pour Disneyland Paris : sur devis', paras: [
          'Le trajet vers Disneyland Paris ne figure pas dans notre tableau des tarifs : son prix est établi sur devis, selon le point de départ, le véhicule et le nombre de passagers. Indiquez vos adresses de départ et d’arrivée dans le formulaire de réservation : le prix vous est confirmé avant la course, par téléphone ou WhatsApp.',
          'Pour un aller-retour, envoyez une demande pour chaque trajet ou précisez-le lors de la confirmation par téléphone ou WhatsApp.',
        ] },
        { h2: 'Temps de trajet indicatifs vers Disneyland Paris', paras: [
          'La durée dépend surtout de la circulation sur l’autoroute A4 et sur la Francilienne (A104), chargées aux heures de pointe en semaine. Voici des durées indicatives :',
        ], timesHead: 'trip', times: [
          ['Paris centre ↔ Disneyland Paris', '40 min à 1 h 15'],
          ['Aéroport Roissy-CDG ↔ Disneyland Paris', '35 à 55 min'],
          ['Aéroport d’Orly ↔ Disneyland Paris', '40 min à 1 h 10'],
          ['Aéroport de Beauvais ↔ Disneyland Paris', '1 h 30 à 2 h 30'],
        ], after: [
          'Vous atterrissez à Roissy-Charles-de-Gaulle ? C’est l’aéroport le plus proche du domaine : en voiture, vous rejoignez votre hôtel sans repasser par Paris.',
        ] },
        { h2: 'Où le chauffeur vous dépose et vous retrouve', paras: [
          'Le domaine de Disneyland Paris comprend deux parcs à thème, le Disney Village et plusieurs hôtels, à proximité de la gare de Marne-la-Vallée–Chessy et du centre commercial du Val d’Europe. Indiquez le nom de votre hôtel ou l’entrée des parcs comme adresse de destination.',
          'Pour le retour, le lieu exact de prise en charge vous est confirmé par téléphone ou WhatsApp avant la course.',
        ], list: [
          'Précisez le nombre de passagers, dont les enfants, et le nombre de bagages, poussettes comprises.',
          'Indiquez votre numéro de vol ou de train si vous arrivez directement de l’aéroport ou d’une gare.',
          'Gardez votre téléphone à portée de main le jour du trajet pour rester joignable.',
        ] },
        { h2: 'Quel véhicule choisir pour une famille ?', paras: [
          'Pour une famille de quatre personnes, la Tesla accueille 4 passagers et 4 valises. Au-delà, ou avec beaucoup de valises, le van Mercedes Classe V transporte jusqu’à 6 passagers et 7 valises en un seul véhicule. Les berlines Mercedes Classe E et Classe S accueillent 3 passagers, 2 grandes valises et 2 petites. Pour un grand groupe, plusieurs véhicules peuvent être réservés ensemble grâce à notre réseau de chauffeurs partenaires vérifiés.',
          'Sièges auto et rehausseurs sont disponibles sur demande, pour tous les véhicules : indiquez leur nombre dans le formulaire de réservation, ainsi que l’âge des enfants lors de la confirmation par téléphone ou WhatsApp.',
        ] },
        { h2: 'Ce qui est inclus dans votre transfert Disneyland', list: [
          'Le trajet direct entre votre adresse de départ et Disneyland Paris, ou l’inverse.',
          'Le véhicule de la catégorie choisie, avec son chauffeur.',
          'Le prix établi sur devis et confirmé avant la course.',
          'Vos bagages dans la limite de la capacité du véhicule.',
          'Les péages, l’eau à bord et la facture de la course.',
        ], paras: [
          'Aucun paiement n’est demandé sur le site. CDG TRANSFERT VTC est un service de transport indépendant, sans lien avec Disneyland Paris.',
        ] },
      ],
      faq: [
        { q: 'Combien coûte un VTC entre Paris et Disneyland Paris ?', a: 'Ce trajet ne figure pas dans le tableau des tarifs : le prix est établi sur devis et confirmé avant la course. Indiquez vos adresses dans le formulaire de réservation pour recevoir une proposition.' },
        { q: 'Combien de temps faut-il pour aller de Paris à Disneyland Paris ?', a: 'Comptez de 40 minutes à 1 h 15 depuis le centre de Paris, selon la circulation sur l’autoroute A4.' },
        { q: 'Pouvez-vous nous conduire de l’aéroport CDG à Disneyland Paris ?', a: 'Oui. Le trajet dure en général de 35 à 55 minutes ; le prix est établi sur devis. Précisez votre numéro de vol lors de la confirmation de votre course.' },
        { q: 'Quel véhicule pour une famille avec enfants et bagages ?', a: 'Le van Mercedes Classe V accueille jusqu’à 6 passagers et 7 valises, la Tesla 4 passagers et 4 valises. Sièges auto et rehausseurs sont disponibles sur demande pour tous les véhicules.' },
        { q: 'Pouvez-vous nous déposer à notre hôtel Disney ?', a: 'Oui, indiquez le nom de votre hôtel comme destination. Le lieu exact de dépose ou de prise en charge vous est confirmé avant la course.' },
        { q: 'Faites-vous l’aller-retour Paris – Disneyland dans la journée ?', a: 'Oui, sur devis. Précisez l’heure de l’aller et celle du retour lors de la confirmation par téléphone ou WhatsApp.' },
      ],
    },
    en: {
      h1: 'Disneyland Paris transfer: private chauffeur from Paris and the airports',
      intro: [
        'Heading to Disneyland Paris with the family? CDG TRANSFERT VTC drives you from your Paris hotel, your home, the station or straight from the airport to the parks and hotels of the resort in Marne-la-Vallée. The service is available 24 hours a day, 7 days a week, there and back.',
        'Disneyland Paris lies about 32 kilometres east of Paris, in the Seine-et-Marne department, and is reached by the A4 motorway. With children, a pushchair and several suitcases, a private chauffeur spares you RER or shuttle changes: you leave from your door and arrive at your destination without changing.',
      ],
      sections: [
        { h2: 'Price of a chauffeur to Disneyland Paris: on quote', paras: [
          'The trip to Disneyland Paris is not in our price list: its price is given on quote, depending on the starting point, the vehicle and the number of passengers. Enter your pick-up and drop-off addresses in the booking form: the price is confirmed before the ride, by phone or WhatsApp.',
          'For a return trip, send a request for each leg or mention it when we confirm your ride by phone or WhatsApp.',
        ] },
        { h2: 'Indicative travel times to Disneyland Paris', paras: [
          'The journey time depends mostly on traffic on the A4 motorway and the Francilienne ring road (A104), both busy at weekday rush hours. Here are some indicative durations:',
        ], timesHead: 'trip', times: [
          ['Central Paris ↔ Disneyland Paris', '40 min to 1 h 15'],
          ['Roissy-CDG airport ↔ Disneyland Paris', '35 to 55 min'],
          ['Orly airport ↔ Disneyland Paris', '40 min to 1 h 10'],
          ['Beauvais airport ↔ Disneyland Paris', '1 h 30 to 2 h 30'],
        ], after: [
          'Landing at Roissy-Charles de Gaulle? It is the closest airport to the resort: by car, you reach your hotel without going through Paris.',
        ] },
        { h2: 'Where the chauffeur drops you off and picks you up', paras: [
          'The Disneyland Paris resort includes two theme parks, Disney Village and several hotels, close to the Marne-la-Vallée–Chessy station and the Val d’Europe shopping centre. Enter the name of your hotel or the park entrance as your destination.',
          'For the return trip, the exact pick-up point is confirmed by phone or WhatsApp before the ride.',
        ], list: [
          'State the number of passengers, including children, and the number of bags, pushchairs included.',
          'Give your flight or train number if you are coming straight from the airport or a station.',
          'Keep your phone at hand on the day of the trip so that you can be reached.',
        ] },
        { h2: 'Which vehicle should a family choose?', paras: [
          'For a family of four, the Tesla seats 4 passengers with 4 suitcases. For more people, or lots of suitcases, the Mercedes V-Class van carries up to 6 passengers and 7 suitcases in a single vehicle. The Mercedes E-Class and S-Class saloons take 3 passengers, 2 large and 2 small suitcases. For a large group, several vehicles can be booked together through our network of vetted partner chauffeurs.',
          'Child seats and booster seats are available on request for every vehicle: state how many in the booking form, and give the children’s ages when we confirm your ride by phone or WhatsApp.',
        ] },
        { h2: 'What your Disneyland transfer includes', list: [
          'The direct trip between your starting address and Disneyland Paris, or the other way round.',
          'A vehicle of the category you chose, with its chauffeur.',
          'The price given on quote and confirmed before the ride.',
          'Your luggage within the vehicle’s capacity.',
          'Tolls, water on board and an invoice for the ride.',
        ], paras: [
          'No payment is taken on the website. CDG TRANSFERT VTC is an independent transport service, not affiliated with Disneyland Paris.',
        ] },
      ],
      faq: [
        { q: 'How much is a chauffeur between Paris and Disneyland Paris?', a: 'This trip is not in the price list: the price is given on quote and confirmed before the ride. Enter your addresses in the booking form to receive a proposal.' },
        { q: 'How long does it take from Paris to Disneyland Paris?', a: 'Allow 40 minutes to 1 h 15 from central Paris, depending on traffic on the A4 motorway.' },
        { q: 'Can you drive us from CDG airport to Disneyland Paris?', a: 'Yes. The trip usually takes 35 to 55 minutes; the price is given on quote. Give us your flight number when we confirm your ride.' },
        { q: 'Which vehicle for a family with children and luggage?', a: 'The Mercedes V-Class van seats up to 6 passengers with 7 suitcases, the Tesla 4 passengers with 4 suitcases. Child seats and booster seats are available on request for every vehicle.' },
        { q: 'Can you drop us off at our Disney hotel?', a: 'Yes, enter the name of your hotel as the destination. The exact drop-off or pick-up point is confirmed before the ride.' },
        { q: 'Do you offer a same-day return trip between Paris and Disneyland?', a: 'Yes, on quote. Give us the time of the outbound and return legs when we confirm your ride by phone or WhatsApp.' },
      ],
    },
    ru: {
      h1: 'Трансфер в Диснейленд Париж: частный водитель из Парижа и аэропортов',
      intro: [
        'Едете всей семьёй в Диснейленд Париж? CDG TRANSFERT VTC отвезёт вас из парижского отеля, из дома, с вокзала или прямо из аэропорта к паркам и отелям курорта в Марн-ла-Валле. Услуга доступна круглосуточно и без выходных, в обе стороны.',
        'Диснейленд Париж находится примерно в 32 километрах к востоку от Парижа, в департаменте Сена и Марна; туда ведёт автомагистраль A4. С детьми, коляской и несколькими чемоданами частный водитель избавит вас от пересадок на RER или шаттл: вы выезжаете от своей двери и доезжаете до места без пересадок.',
      ],
      sections: [
        { h2: 'Стоимость трансфера в Диснейленд Париж: по запросу', paras: [
          'Поездки в Диснейленд Париж нет в нашей таблице тарифов: её стоимость рассчитывается по запросу в зависимости от места отправления, автомобиля и числа пассажиров. Укажите адреса отправления и прибытия в форме бронирования — цена подтверждается до поездки по телефону или в WhatsApp.',
          'Если нужна поездка туда и обратно, отправьте заявку на каждую поездку или сообщите об этом при подтверждении по телефону или в WhatsApp.',
        ] },
        { h2: 'Ориентировочное время в пути до Диснейленда', paras: [
          'Время в пути зависит прежде всего от движения на автомагистрали A4 и на кольцевой дороге Франсильен (A104), загруженных в часы пик по будням. Вот ориентировочные значения:',
        ], timesHead: 'trip', times: [
          ['Центр Парижа ↔ Диснейленд Париж', 'от 40 мин до 1 ч 15 мин'],
          ['Аэропорт Руасси-CDG ↔ Диснейленд Париж', '35–55 мин'],
          ['Аэропорт Орли ↔ Диснейленд Париж', 'от 40 мин до 1 ч 10 мин'],
          ['Аэропорт Бове ↔ Диснейленд Париж', 'от 1 ч 30 мин до 2 ч 30 мин'],
        ], after: [
          'Прилетаете в Руасси — Шарль-де-Голль? Это ближайший к курорту аэропорт: на автомобиле вы доберётесь до отеля, не заезжая в Париж.',
        ] },
        { h2: 'Где водитель высаживает и встречает вас', paras: [
          'Курорт Диснейленд Париж включает два тематических парка, Disney Village и несколько отелей; рядом находятся вокзал Марн-ла-Валле — Шесси и торговый центр Валь-д’Эроп. Укажите в качестве пункта назначения название отеля или вход в парки.',
          'Для обратной поездки точное место посадки подтверждается по телефону или в WhatsApp до поездки.',
        ], list: [
          'Укажите число пассажиров, включая детей, и количество багажа вместе с колясками.',
          'Сообщите номер рейса или поезда, если едете прямо из аэропорта или с вокзала.',
          'В день поездки держите телефон под рукой, чтобы оставаться на связи.',
        ] },
        { h2: 'Какой автомобиль выбрать для семьи?', paras: [
          'Для семьи из четырёх человек подойдёт Tesla: 4 пассажира и 4 чемодана. Если вас больше или чемоданов много, минивэн Mercedes V-класса перевозит до 6 пассажиров и 7 чемоданов в одном автомобиле. Седаны Mercedes E-класса и S-класса рассчитаны на 3 пассажиров, 2 больших и 2 маленьких чемодана. Для большой группы можно заказать сразу несколько автомобилей благодаря сети проверенных водителей-партнёров.',
          'Детские автокресла и бустеры доступны по запросу для всех автомобилей: укажите их количество в форме бронирования, а возраст детей — при подтверждении по телефону или в WhatsApp.',
        ] },
        { h2: 'Что входит в трансфер в Диснейленд', list: [
          'Прямая поездка между адресом отправления и Диснейленд Париж или в обратном направлении.',
          'Автомобиль выбранной категории с водителем.',
          'Цена, рассчитанная по запросу и подтверждённая до поездки.',
          'Багаж в пределах вместимости автомобиля.',
          'Платные дороги, вода в салоне и счёт за поездку.',
        ], paras: [
          'На сайте ничего не нужно оплачивать. CDG TRANSFERT VTC — независимая транспортная служба, не связанная с Диснейленд Париж.',
        ] },
      ],
      faq: [
        { q: 'Сколько стоит трансфер между Парижем и Диснейленд Париж?', a: 'Этого маршрута нет в таблице тарифов: стоимость рассчитывается по запросу и подтверждается до поездки. Укажите адреса в форме бронирования, чтобы получить предложение.' },
        { q: 'Сколько времени ехать из Парижа в Диснейленд Париж?', a: 'От центра Парижа — от 40 минут до 1 ч 15 мин, в зависимости от движения на автомагистрали A4.' },
        { q: 'Можете ли вы отвезти нас из аэропорта CDG в Диснейленд Париж?', a: 'Да. Поездка обычно занимает 35–55 минут; стоимость рассчитывается по запросу. Сообщите номер рейса при подтверждении поездки.' },
        { q: 'Какой автомобиль выбрать для семьи с детьми и багажом?', a: 'Минивэн Mercedes V-класса вмещает до 6 пассажиров и 7 чемоданов, Tesla — 4 пассажира и 4 чемодана. Детские автокресла и бустеры доступны по запросу для всех автомобилей.' },
        { q: 'Можете ли вы довезти нас до отеля Disney?', a: 'Да, укажите название отеля в качестве пункта назначения. Точное место высадки или посадки подтверждается до поездки.' },
        { q: 'Можно ли съездить из Парижа в Диснейленд и обратно за один день?', a: 'Да, по запросу. Сообщите время поездки туда и обратно при подтверждении по телефону или в WhatsApp.' },
      ],
    },
    ro: {
      h1: 'Transfer Disneyland Paris: șofer privat din Paris și de la aeroporturi',
      intro: [
        'Plecați în familie la Disneyland Paris? CDG TRANSFERT VTC vă duce de la hotelul din Paris, de acasă, de la gară sau direct de la aeroport până la parcurile și hotelurile complexului din Marne-la-Vallée. Serviciul este disponibil 24 de ore din 24, 7 zile din 7, la dus și la întors.',
        'Disneyland Paris se află la aproximativ 32 de kilometri est de Paris, în departamentul Seine-et-Marne, și se ajunge acolo pe autostrada A4. Cu copii, un cărucior și mai multe valize, un șofer privat vă scutește de schimbările de RER sau de autobuz-navetă: plecați de la ușa dumneavoastră și ajungeți la destinație fără schimbări.',
      ],
      sections: [
        { h2: 'Prețul unui VTC spre Disneyland Paris: la cerere', paras: [
          'Cursa spre Disneyland Paris nu figurează în tabelul nostru de tarife: prețul se stabilește la cerere, în funcție de punctul de plecare, vehicul și numărul de pasageri. Completați adresele de plecare și de sosire în formularul de rezervare: prețul vă este confirmat înainte de cursă, prin telefon sau WhatsApp.',
          'Pentru dus-întors, trimiteți câte o cerere pentru fiecare cursă sau menționați acest lucru la confirmarea prin telefon sau WhatsApp.',
        ] },
        { h2: 'Durate orientative de drum spre Disneyland Paris', paras: [
          'Durata depinde mai ales de trafic pe autostrada A4 și pe centura Francilienne (A104), aglomerate la orele de vârf în zilele lucrătoare. Iată câteva durate orientative:',
        ], timesHead: 'trip', times: [
          ['Centrul Parisului ↔ Disneyland Paris', '40 min – 1 h 15'],
          ['Aeroportul Roissy-CDG ↔ Disneyland Paris', '35 – 55 min'],
          ['Aeroportul Orly ↔ Disneyland Paris', '40 min – 1 h 10'],
          ['Aeroportul Beauvais ↔ Disneyland Paris', '1 h 30 – 2 h 30'],
        ], after: [
          'Aterizați la Roissy-Charles de Gaulle? Este aeroportul cel mai apropiat de complex: cu mașina ajungeți la hotel fără să mai treceți prin Paris.',
        ] },
        { h2: 'Unde vă lasă și unde vă preia șoferul', paras: [
          'Complexul Disneyland Paris cuprinde două parcuri tematice, Disney Village și mai multe hoteluri, aproape de gara Marne-la-Vallée–Chessy și de centrul comercial Val d’Europe. Indicați ca destinație numele hotelului sau intrarea în parcuri.',
          'Pentru întoarcere, locul exact de preluare vă este confirmat prin telefon sau WhatsApp înainte de cursă.',
        ], list: [
          'Precizați numărul de pasageri, inclusiv copiii, și numărul de bagaje, cu tot cu cărucioare.',
          'Indicați numărul zborului sau al trenului dacă veniți direct de la aeroport sau de la gară.',
          'În ziua cursei, țineți telefonul la îndemână pentru a putea fi contactat.',
        ] },
        { h2: 'Ce vehicul să alegeți pentru o familie?', paras: [
          'Pentru o familie de patru persoane, Tesla primește 4 pasageri și 4 valize. Pentru mai multe persoane sau multe valize, van-ul Mercedes Clasa V transportă până la 6 pasageri și 7 valize într-un singur vehicul. Berlinele Mercedes Clasa E și Clasa S primesc 3 pasageri, 2 valize mari și 2 mici. Pentru un grup mare se pot rezerva mai multe vehicule deodată, prin rețeaua noastră de șoferi parteneri verificați.',
          'Scaunele auto și înălțătoarele pentru copii sunt disponibile la cerere pentru toate vehiculele: indicați numărul lor în formularul de rezervare, iar vârsta copiilor la confirmarea prin telefon sau WhatsApp.',
        ] },
        { h2: 'Ce include transferul la Disneyland', list: [
          'Cursa directă între adresa de plecare și Disneyland Paris, sau invers.',
          'Vehiculul din categoria aleasă, cu șoferul său.',
          'Prețul stabilit la cerere și confirmat înainte de cursă.',
          'Bagajele în limita capacității vehiculului.',
          'Taxele de autostradă, apa la bord și factura cursei.',
        ], paras: [
          'Site-ul nu cere nicio plată. CDG TRANSFERT VTC este un serviciu de transport independent, fără legătură cu Disneyland Paris.',
        ] },
      ],
      faq: [
        { q: 'Cât costă un VTC între Paris și Disneyland Paris?', a: 'Această cursă nu figurează în tabelul de tarife: prețul se stabilește la cerere și este confirmat înainte de cursă. Completați adresele în formularul de rezervare pentru a primi o ofertă.' },
        { q: 'Cât durează drumul de la Paris la Disneyland Paris?', a: 'Socotiți între 40 de minute și 1 h 15 din centrul Parisului, în funcție de trafic pe autostrada A4.' },
        { q: 'Ne puteți duce de la aeroportul CDG la Disneyland Paris?', a: 'Da. Cursa durează de obicei între 35 și 55 de minute; prețul se stabilește la cerere. Comunicați-ne numărul zborului la confirmarea cursei.' },
        { q: 'Ce vehicul pentru o familie cu copii și bagaje?', a: 'Van-ul Mercedes Clasa V primește până la 6 pasageri și 7 valize, Tesla 4 pasageri și 4 valize. Scaunele auto și înălțătoarele pentru copii sunt disponibile la cerere pentru toate vehiculele.' },
        { q: 'Ne puteți lăsa la hotelul Disney?', a: 'Da, indicați numele hotelului ca destinație. Locul exact de lăsare sau de preluare vă este confirmat înainte de cursă.' },
        { q: 'Faceți dus-întors Paris – Disneyland în aceeași zi?', a: 'Da, la cerere. Comunicați-ne ora cursei de dus și pe cea a cursei de întoarcere la confirmarea prin telefon sau WhatsApp.' },
      ],
    },
  },
}
