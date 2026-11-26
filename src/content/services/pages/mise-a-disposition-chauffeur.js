// ── Page service : mise à disposition d'un chauffeur (à l'heure) ─────
// Contenu unique par langue. Prix à l'heure : ligne « hourly » du tableau
// des tarifs (constants/rates.js), minimum 3 h, 20 km inclus par heure.
// ────────────────────────────────────────────────────────────────────

export default {
  i18n: {
    fr: {
      h1: 'Mise à disposition d’un chauffeur privé à Paris et en Île-de-France',
      intro: [
        'Plusieurs rendez-vous dans la journée, un salon professionnel, un dîner suivi d’un spectacle ou une journée de visites ? Avec la mise à disposition, un chauffeur et son véhicule vous sont réservés pour la durée convenue : il vous conduit d’un lieu à l’autre selon votre programme, sans que vous ayez à réserver chaque trajet séparément.',
        'CDG TRANSFERT VTC propose ce service à Paris et dans toute l’Île-de-France, 24 heures sur 24 et 7 jours sur 7, avec la même flotte que pour nos transferts : Mercedes Classe E, Mercedes Classe S, van Mercedes Classe V et Tesla.',
      ],
      sections: [
        { h2: 'Comment fonctionne la mise à disposition ?', paras: [
          'Vous définissez une heure de début, une durée et, si vous le connaissez, l’enchaînement de vos rendez-vous. Le chauffeur vous prend en charge à l’adresse convenue, vous dépose à chaque étape et vous retrouve pour la suivante. Votre programme évolue en cours de route ? Vous en parlez directement avec votre chauffeur.',
        ], list: [
          'Demi-journée, journée complète ou soirée : la durée est fixée avec vous, avec un minimum de 3 heures.',
          'Un seul interlocuteur et un seul véhicule pour tous vos déplacements de la journée.',
          'Départ et fin de prestation à l’adresse de votre choix, à Paris ou en Île-de-France, y compris à l’aéroport ou à la gare.',
        ] },
        { h2: 'Pour quelles occasions ?', list: [
          'Rendez-vous professionnels successifs dans Paris et à La Défense.',
          'Salons et congrès : Paris Expo Porte de Versailles, Paris Nord Villepinte, Palais des Congrès.',
          'Accueil de clients ou de partenaires à l’aéroport, puis déplacements pendant leur séjour.',
          'Dîners, soirées, spectacles et événements, avec un retour à l’heure qui vous convient.',
          'Journée de visite de Paris ou excursion au château de Versailles.',
          'Événements familiaux et cérémonies.',
        ] },
        { h2: 'Prix d’une mise à disposition : à l’heure', rates: true, paras: [
          'La mise à disposition est facturée à l’heure, selon la catégorie du véhicule. Les tarifs ci-dessous sont ceux de notre grille : ils sont indicatifs et vous sont confirmés avant la prestation.',
          'La durée minimale est de 3 heures. 20 km sont inclus par heure réservée, quelle que soit la catégorie : une mise à disposition de 5 heures comprend donc 100 km au maximum. Au-delà, le kilométrage supplémentaire est établi sur devis. Les péages restent inclus, de l’eau vous attend à bord et une facture vous est remise.',
          'Pour réserver, appelez-nous, écrivez-nous sur WhatsApp ou utilisez le formulaire de cette page en précisant :',
        ], list: [
          'la date, l’heure de début et la durée souhaitée (3 heures minimum) ;',
          'l’adresse de départ et, si possible, les étapes prévues ;',
          'le nombre de passagers et de bagages, ainsi que les sièges auto ou rehausseurs nécessaires ;',
          'le véhicule souhaité.',
        ], after: [
          'Nous vous rappelons pour confirmer votre programme et le prix total de la prestation.',
        ] },
        { h2: 'Temps de trajet indicatifs entre les principaux lieux d’affaires', paras: [
          'Pour bâtir votre programme, voici quelques durées indicatives en voiture. Aux heures de pointe en semaine, prévoyez une marge plus large.',
        ], timesHead: 'trip', times: [
          ['Paris centre ↔ La Défense', '20 à 45 min'],
          ['Paris centre ↔ Paris Expo Porte de Versailles', '15 à 35 min'],
          ['Paris centre ↔ Paris Nord Villepinte', '35 min à 1 h'],
          ['Paris centre ↔ château de Versailles', '35 min à 1 h'],
          ['Paris centre ↔ aéroport Roissy-CDG', '30 min à 1 h 30'],
        ] },
        { h2: 'Quel véhicule pour votre mise à disposition ?', paras: [
          'Pour des rendez-vous d’affaires, la Mercedes Classe E est notre véhicule de référence, et la Mercedes Classe S offre le plus haut niveau de confort de notre flotte pour accueillir un client important. La Tesla, 100 % électrique, convient aux déplacements en ville. Pour une délégation ou une famille, le van Mercedes Classe V accueille jusqu’à 6 passagers et 6 valises.',
          'Vous hésitez ? Décrivez-nous votre programme et le nombre de participants : nous vous proposons le véhicule le plus adapté.',
          'Aucun paiement n’est demandé sur le site : le prix vous est confirmé avant la prestation.',
        ] },
      ],
      faq: [
        { q: 'Combien coûte la mise à disposition d’un chauffeur à Paris ?', a: 'Elle est facturée à l’heure, selon le véhicule : 55 € en Tesla, 70 € en Mercedes Classe E, 80 € en Mercedes Classe V et 100 € en Mercedes Classe S. Tarifs indicatifs, confirmés avant la prestation.' },
        { q: 'Quelle est la durée d’une mise à disposition ?', a: 'Trois heures au minimum ; au-delà, elle est fixée avec vous selon votre programme : demi-journée, journée complète ou soirée.' },
        { q: 'Combien de kilomètres sont inclus ?', a: '20 km par heure réservée, quelle que soit la catégorie : une mise à disposition de 5 heures comprend donc 100 km au maximum. Au-delà, le kilométrage supplémentaire est établi sur devis.' },
        { q: 'Le chauffeur peut-il m’emmener à plusieurs rendez-vous ?', a: 'Oui, c’est le principe de la mise à disposition : le chauffeur vous conduit d’une étape à l’autre pendant toute la durée convenue.' },
        { q: 'La mise à disposition est-elle possible en dehors de Paris ?', a: 'Oui, dans toute l’Île-de-France, par exemple à La Défense, à Versailles ou au parc des expositions de Paris Nord Villepinte.' },
        { q: 'Comment réserver une mise à disposition ?', a: 'Appelez le +33 6 65 69 96 78, écrivez-nous sur WhatsApp ou envoyez une demande avec le formulaire de réservation en précisant la durée souhaitée : nous vous rappelons pour confirmer votre programme et le prix.' },
        { q: 'Quels véhicules sont disponibles ?', a: 'Mercedes Classe E, Mercedes Classe S, van Mercedes Classe V (jusqu’à 6 passagers) et Tesla.' },
      ],
    },
    en: {
      h1: 'Private chauffeur at your disposal in Paris and Île-de-France',
      intro: [
        'Several meetings in one day, a trade fair, dinner followed by a show or a day of sightseeing? With chauffeur hire by the hour, a chauffeur and car are reserved for you for the agreed time: you are driven from one place to the next according to your schedule, without booking each trip separately.',
        'CDG TRANSFERT VTC offers this service in Paris and throughout the Île-de-France region, 24 hours a day, 7 days a week, with the same fleet as our transfers: Mercedes E-Class, Mercedes S-Class, Mercedes V-Class van and Tesla.',
      ],
      sections: [
        { h2: 'How does chauffeur hire by the hour work?', paras: [
          'You set a start time, a duration and, if you know it, the order of your appointments. The chauffeur picks you up at the agreed address, drops you off at each stop and meets you again for the next one. Your plans change along the way? Simply discuss it with your chauffeur.',
        ], list: [
          'Half day, full day or evening: the duration is agreed with you, with a 3-hour minimum.',
          'One point of contact and one vehicle for all your trips of the day.',
          'Start and end of the service at the address of your choice, in Paris or Île-de-France, including the airport or a station.',
        ] },
        { h2: 'For which occasions?', list: [
          'Back-to-back business meetings in Paris and La Défense.',
          'Trade fairs and conferences: Paris Expo Porte de Versailles, Paris Nord Villepinte, Palais des Congrès.',
          'Welcoming clients or partners at the airport, then driving them during their stay.',
          'Dinners, evenings, shows and events, with a ride home at the time that suits you.',
          'A day of sightseeing in Paris or a trip to the Palace of Versailles.',
          'Family events and ceremonies.',
        ] },
        { h2: 'Price of chauffeur hire: charged by the hour', rates: true, paras: [
          'Chauffeur hire is charged by the hour, according to the vehicle category. The rates below come from our price list: they are indicative and confirmed before the service.',
          'The minimum booking is 3 hours. 20 km are included per hour booked, whatever the category: a 5-hour booking therefore includes up to 100 km. Any extra mileage is on quote. Tolls are still included, there is water on board and you receive an invoice.',
          'To book, call us, send a WhatsApp message or use the form on this page, stating:',
        ], list: [
          'the date, start time and desired duration (3 hours minimum);',
          'the starting address and, if possible, the planned stops;',
          'the number of passengers and bags, and any child seats or booster seats needed;',
          'the vehicle you would like.',
        ], after: [
          'We will call you back to confirm your schedule and the total price of the service.',
        ] },
        { h2: 'Indicative travel times between the main business venues', paras: [
          'To help you plan, here are some indicative driving times. At weekday rush hours, allow a wider margin.',
        ], timesHead: 'trip', times: [
          ['Central Paris ↔ La Défense', '20 to 45 min'],
          ['Central Paris ↔ Paris Expo Porte de Versailles', '15 to 35 min'],
          ['Central Paris ↔ Paris Nord Villepinte', '35 min to 1 h'],
          ['Central Paris ↔ Palace of Versailles', '35 min to 1 h'],
          ['Central Paris ↔ Roissy-CDG airport', '30 min to 1 h 30'],
        ] },
        { h2: 'Which vehicle for your chauffeur hire?', paras: [
          'For business meetings, the Mercedes E-Class is our reference vehicle, and the Mercedes S-Class offers the highest level of comfort in our fleet to welcome an important client. The fully electric Tesla suits trips around town. For a delegation or a family, the Mercedes V-Class van seats up to 6 passengers with 6 suitcases.',
          'Not sure? Describe your schedule and the number of people: we will suggest the most suitable vehicle.',
          'No payment is taken on the website: the price is confirmed before the service.',
        ] },
      ],
      faq: [
        { q: 'How much does it cost to hire a chauffeur by the hour in Paris?', a: 'It is charged by the hour, according to the vehicle: €55 in a Tesla, €70 in a Mercedes E-Class, €80 in a Mercedes V-Class and €100 in a Mercedes S-Class. Indicative rates, confirmed before the service.' },
        { q: 'How long can I hire a chauffeur for?', a: 'Three hours minimum; beyond that, the duration is agreed with you according to your schedule: half a day, a full day or an evening.' },
        { q: 'How many kilometres are included?', a: '20 km per hour booked, whatever the category: a 5-hour booking therefore includes up to 100 km. Any extra mileage is on quote.' },
        { q: 'Can the chauffeur take me to several meetings?', a: 'Yes, that is the whole idea: the chauffeur drives you from one stop to the next for the entire agreed time.' },
        { q: 'Is chauffeur hire available outside Paris?', a: 'Yes, throughout Île-de-France, for example in La Défense, Versailles or at the Paris Nord Villepinte exhibition centre.' },
        { q: 'How do I book a chauffeur by the hour?', a: 'Call +33 6 65 69 96 78, send us a WhatsApp message or send a request with the booking form stating the duration you need: we will call you back to confirm your schedule and the price.' },
        { q: 'Which vehicles are available?', a: 'Mercedes E-Class, Mercedes S-Class, Mercedes V-Class van (up to 6 passengers) and Tesla.' },
      ],
    },
    ru: {
      h1: 'Частный водитель в вашем распоряжении в Париже и Иль-де-Франс',
      intro: [
        'Несколько встреч за день, профессиональная выставка, ужин и спектакль или день экскурсий? При аренде водителя на час автомобиль с водителем закрепляется за вами на согласованное время: водитель возит вас с места на место по вашей программе, и вам не нужно бронировать каждую поездку отдельно.',
        'CDG TRANSFERT VTC предлагает эту услугу в Париже и во всём регионе Иль-де-Франс — круглосуточно и без выходных, на тех же автомобилях, что и для трансферов: Mercedes E-класса, Mercedes S-класса, минивэн Mercedes V-класса и Tesla.',
      ],
      sections: [
        { h2: 'Как работает аренда водителя на час?', paras: [
          'Вы задаёте время начала, продолжительность и, если знаете, порядок ваших встреч. Водитель забирает вас по согласованному адресу, высаживает на каждом этапе и встречает для следующей поездки. Планы меняются по ходу дня? Просто обсудите это с водителем.',
        ], list: [
          'Полдня, целый день или вечер: продолжительность согласуется с вами, минимум 3 часа.',
          'Один контакт и один автомобиль для всех поездок за день.',
          'Начало и окончание услуги по выбранному вами адресу в Париже или Иль-де-Франс, в том числе в аэропорту или на вокзале.',
        ] },
        { h2: 'Для каких случаев?', list: [
          'Несколько деловых встреч подряд в Париже и в квартале Дефанс.',
          'Выставки и конгрессы: Paris Expo Porte de Versailles, Paris Nord Villepinte, Дворец конгрессов.',
          'Встреча клиентов или партнёров в аэропорту и поездки во время их пребывания.',
          'Ужины, вечеринки, спектакли и мероприятия с возвращением в удобное для вас время.',
          'День экскурсий по Парижу или поездка в Версальский дворец.',
          'Семейные праздники и церемонии.',
        ] },
        { h2: 'Стоимость аренды водителя: почасовая оплата', rates: true, paras: [
          'Аренда водителя оплачивается по часам в зависимости от категории автомобиля. Тарифы ниже взяты из нашей таблицы: они ориентировочные и подтверждаются до начала услуги.',
          'Минимальный срок — 3 часа. За каждый забронированный час включено 20 км для любой категории: аренда на 5 часов включает не более 100 км. Дополнительный пробег рассчитывается по запросу. Платные дороги по-прежнему включены, в салоне есть вода, а по итогам вы получаете счёт.',
          'Чтобы забронировать, позвоните нам, напишите в WhatsApp или воспользуйтесь формой на этой странице и укажите:',
        ], list: [
          'дату, время начала и желаемую продолжительность (минимум 3 часа);',
          'адрес отправления и, по возможности, запланированные остановки;',
          'количество пассажиров и багажа, а также нужные детские автокресла или бустеры;',
          'желаемый автомобиль.',
        ], after: [
          'Мы перезвоним, чтобы подтвердить программу и итоговую стоимость услуги.',
        ] },
        { h2: 'Ориентировочное время в пути между деловыми центрами', paras: [
          'Чтобы помочь вам составить программу, приводим ориентировочное время поездки на автомобиле. В часы пик по будням закладывайте больший запас.',
        ], timesHead: 'trip', times: [
          ['Центр Парижа ↔ Дефанс', '20–45 мин'],
          ['Центр Парижа ↔ Paris Expo Porte de Versailles', '15–35 мин'],
          ['Центр Парижа ↔ Paris Nord Villepinte', 'от 35 мин до 1 ч'],
          ['Центр Парижа ↔ Версальский дворец', 'от 35 мин до 1 ч'],
          ['Центр Парижа ↔ аэропорт Руасси-CDG', 'от 30 мин до 1 ч 30 мин'],
        ] },
        { h2: 'Какой автомобиль выбрать?', paras: [
          'Для деловых встреч наш основной автомобиль — Mercedes E-класса, а Mercedes S-класса обеспечивает самый высокий уровень комфорта в нашем автопарке, если нужно встретить важного клиента. Полностью электрическая Tesla подходит для поездок по городу. Для делегации или семьи минивэн Mercedes V-класса вмещает до 6 пассажиров и 6 чемоданов.',
          'Не знаете, что выбрать? Опишите вашу программу и число участников — мы предложим наиболее подходящий автомобиль.',
          'На сайте ничего не нужно оплачивать: цена подтверждается до начала услуги.',
        ] },
      ],
      faq: [
        { q: 'Сколько стоит аренда водителя на час в Париже?', a: 'Оплата почасовая, в зависимости от автомобиля: 55 € на Tesla, 70 € на Mercedes E-класса, 80 € на Mercedes V-класса и 100 € на Mercedes S-класса. Тарифы ориентировочные и подтверждаются до начала услуги.' },
        { q: 'На какой срок можно арендовать водителя?', a: 'Минимум на три часа; дальше продолжительность согласуется с вами по вашей программе: полдня, целый день или вечер.' },
        { q: 'Сколько километров включено?', a: '20 км за каждый забронированный час для любой категории: аренда на 5 часов включает не более 100 км. Дополнительный пробег рассчитывается по запросу.' },
        { q: 'Может ли водитель отвезти меня на несколько встреч?', a: 'Да, в этом и суть услуги: водитель возит вас от одного пункта к другому в течение всего согласованного времени.' },
        { q: 'Можно ли арендовать водителя за пределами Парижа?', a: 'Да, во всём регионе Иль-де-Франс, например в Дефанс, Версаль или в выставочный центр Paris Nord Villepinte.' },
        { q: 'Как забронировать водителя на час?', a: 'Позвоните по номеру +33 6 65 69 96 78, напишите нам в WhatsApp или отправьте заявку через форму бронирования, указав нужную продолжительность: мы перезвоним, чтобы подтвердить программу и стоимость.' },
        { q: 'Какие автомобили доступны?', a: 'Mercedes E-класса, Mercedes S-класса, минивэн Mercedes V-класса (до 6 пассажиров) и Tesla.' },
      ],
    },
    ro: {
      h1: 'Șofer privat la dispoziția dumneavoastră în Paris și Île-de-France',
      intro: [
        'Mai multe întâlniri în aceeași zi, un târg profesional, o cină urmată de un spectacol sau o zi de vizite? Cu serviciul de șofer la dispoziție, un șofer și mașina sa vă sunt rezervate pentru durata convenită: vă duce dintr-un loc în altul după programul dumneavoastră, fără să rezervați fiecare cursă separat.',
        'CDG TRANSFERT VTC oferă acest serviciu în Paris și în toată regiunea Île-de-France, 24 de ore din 24, 7 zile din 7, cu aceeași flotă ca pentru transferuri: Mercedes Clasa E, Mercedes Clasa S, van Mercedes Clasa V și Tesla.',
      ],
      sections: [
        { h2: 'Cum funcționează serviciul de șofer la dispoziție?', paras: [
          'Stabiliți o oră de început, o durată și, dacă o cunoașteți, ordinea întâlnirilor. Șoferul vă preia de la adresa convenită, vă lasă la fiecare etapă și vă reîntâlnește pentru următoarea. Programul se schimbă pe parcurs? Discutați direct cu șoferul.',
        ], list: [
          'Jumătate de zi, zi întreagă sau seară: durata se stabilește împreună cu dumneavoastră, cu un minimum de 3 ore.',
          'Un singur interlocutor și un singur vehicul pentru toate deplasările zilei.',
          'Începutul și sfârșitul serviciului la adresa aleasă, în Paris sau Île-de-France, inclusiv la aeroport sau la gară.',
        ] },
        { h2: 'Pentru ce ocazii?', list: [
          'Întâlniri de afaceri succesive în Paris și la La Défense.',
          'Târguri și congrese: Paris Expo Porte de Versailles, Paris Nord Villepinte, Palais des Congrès.',
          'Primirea clienților sau partenerilor la aeroport, apoi deplasări pe durata șederii lor.',
          'Cine, seri, spectacole și evenimente, cu întoarcere la ora care vă convine.',
          'O zi de vizită a Parisului sau o excursie la Palatul Versailles.',
          'Evenimente de familie și ceremonii.',
        ] },
        { h2: 'Prețul serviciului de șofer la dispoziție: cu ora', rates: true, paras: [
          'Serviciul de șofer la dispoziție se facturează cu ora, în funcție de categoria vehiculului. Tarifele de mai jos provin din grila noastră: sunt orientative și vă sunt confirmate înainte de serviciu.',
          'Durata minimă este de 3 ore. Pentru fiecare oră rezervată sunt incluși 20 km, indiferent de categorie: o rezervare de 5 ore include deci cel mult 100 km. Kilometrii suplimentari se stabilesc la cerere. Taxele de autostradă rămân incluse, la bord aveți apă și primiți factură.',
          'Pentru a rezerva, sunați-ne, scrieți-ne pe WhatsApp sau folosiți formularul de pe această pagină, precizând:',
        ], list: [
          'data, ora de început și durata dorită (minimum 3 ore);',
          'adresa de plecare și, dacă este posibil, etapele prevăzute;',
          'numărul de pasageri și de bagaje, precum și scaunele auto sau înălțătoarele necesare;',
          'vehiculul dorit.',
        ], after: [
          'Vă sunăm înapoi pentru a confirma programul și prețul total al serviciului.',
        ] },
        { h2: 'Durate orientative de drum între principalele locuri de afaceri', paras: [
          'Pentru a vă construi programul, iată câteva durate orientative cu mașina. La orele de vârf din zilele lucrătoare, prevedeți o marjă mai mare.',
        ], timesHead: 'trip', times: [
          ['Centrul Parisului ↔ La Défense', '20 – 45 min'],
          ['Centrul Parisului ↔ Paris Expo Porte de Versailles', '15 – 35 min'],
          ['Centrul Parisului ↔ Paris Nord Villepinte', '35 min – 1 h'],
          ['Centrul Parisului ↔ Palatul Versailles', '35 min – 1 h'],
          ['Centrul Parisului ↔ aeroportul Roissy-CDG', '30 min – 1 h 30'],
        ] },
        { h2: 'Ce vehicul să alegeți?', paras: [
          'Pentru întâlnirile de afaceri, Mercedes Clasa E este vehiculul nostru de referință, iar Mercedes Clasa S oferă cel mai înalt nivel de confort din flota noastră pentru a primi un client important. Tesla, 100 % electrică, este potrivită pentru deplasările prin oraș. Pentru o delegație sau o familie, van-ul Mercedes Clasa V primește până la 6 pasageri și 6 valize.',
          'Nu sunteți sigur? Descrieți-ne programul și numărul de participanți: vă propunem vehiculul cel mai potrivit.',
          'Site-ul nu cere nicio plată: prețul vă este confirmat înainte de serviciu.',
        ] },
      ],
      faq: [
        { q: 'Cât costă un șofer la dispoziție în Paris?', a: 'Se facturează cu ora, în funcție de vehicul: 55 € cu Tesla, 70 € cu Mercedes Clasa E, 80 € cu Mercedes Clasa V și 100 € cu Mercedes Clasa S. Tarife orientative, confirmate înainte de serviciu.' },
        { q: 'Pentru cât timp pot rezerva un șofer la dispoziție?', a: 'Minimum trei ore; peste această durată, se stabilește împreună cu dumneavoastră, după program: o jumătate de zi, o zi întreagă sau o seară.' },
        { q: 'Câți kilometri sunt incluși?', a: '20 km pentru fiecare oră rezervată, indiferent de categorie: o rezervare de 5 ore include deci cel mult 100 km. Kilometrii suplimentari se stabilesc la cerere.' },
        { q: 'Mă poate duce șoferul la mai multe întâlniri?', a: 'Da, acesta este principiul serviciului: șoferul vă duce de la o etapă la alta pe toată durata convenită.' },
        { q: 'Serviciul este disponibil și în afara Parisului?', a: 'Da, în toată regiunea Île-de-France, de exemplu la La Défense, la Versailles sau la centrul expozițional Paris Nord Villepinte.' },
        { q: 'Cum rezerv un șofer la dispoziție?', a: 'Sunați la +33 6 65 69 96 78, scrieți-ne pe WhatsApp sau trimiteți o cerere prin formularul de rezervare, precizând durata dorită: vă sunăm înapoi pentru a confirma programul și prețul.' },
        { q: 'Ce vehicule sunt disponibile?', a: 'Mercedes Clasa E, Mercedes Clasa S, van Mercedes Clasa V (până la 6 pasageri) și Tesla.' },
      ],
    },
  },
}
