// ── Page service : mise à disposition d'un chauffeur (à l'heure) ─────
// Contenu unique par langue. Prestation absente du tableau des tarifs :
// prix « sur devis » uniquement (aucun montant affiché ni en JSON-LD).
// ────────────────────────────────────────────────────────────────────

export default {
  i18n: {
    fr: {
      h1: 'Mise à disposition d’un chauffeur privé à Paris et en Île-de-France',
      intro: [
        'Plusieurs rendez-vous dans la journée, un salon professionnel, un dîner suivi d’un spectacle ou une journée de visites ? Avec la mise à disposition, un chauffeur et son véhicule vous sont réservés pour la durée convenue : il vous conduit d’un lieu à l’autre selon votre programme, sans que vous ayez à réserver chaque trajet séparément.',
        'CDG TRANSFERT VTC propose ce service à Paris et dans toute l’Île-de-France, 24 heures sur 24 et 7 jours sur 7, avec la même flotte que pour nos transferts : Mercedes Classe E, Mercedes Classe S, van Mercedes Classe V et Tesla Model Y.',
      ],
      sections: [
        { h2: 'Comment fonctionne la mise à disposition ?', paras: [
          'Vous définissez une heure de début, une durée et, si vous le connaissez, l’enchaînement de vos rendez-vous. Le chauffeur vous prend en charge à l’adresse convenue, vous dépose à chaque étape et vous retrouve pour la suivante. Votre programme évolue en cours de route ? Vous en parlez directement avec votre chauffeur.',
        ], list: [
          'Demi-journée, journée complète ou soirée : la durée est fixée avec vous lors du devis.',
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
        { h2: 'Prix d’une mise à disposition : sur devis', paras: [
          'La mise à disposition ne figure pas dans notre tableau des tarifs : son prix est établi sur devis, en fonction de la durée, des horaires, des trajets prévus et du véhicule choisi. Il vous est confirmé avant la prestation.',
          'Pour obtenir un devis, le plus simple est de nous appeler ou de nous écrire sur WhatsApp en précisant :',
        ], list: [
          'la date, l’heure de début et la durée souhaitée ;',
          'l’adresse de départ et, si possible, les étapes prévues ;',
          'le nombre de passagers et de bagages ;',
          'le véhicule souhaité.',
        ], after: [
          'Vous pouvez aussi envoyer une demande avec le formulaire de réservation de cette page : nous vous rappelons pour préciser votre programme.',
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
          'Pour des rendez-vous d’affaires, la Mercedes Classe E est notre véhicule de référence, et la Mercedes Classe S offre le plus haut niveau de confort de notre flotte pour accueillir un client important. La Tesla Model Y, 100 % électrique, convient aux déplacements en ville. Pour une délégation ou une famille, le van Mercedes Classe V accueille jusqu’à 6 passagers et 6 bagages.',
          'Vous hésitez ? Décrivez-nous votre programme et le nombre de participants : nous vous proposons le véhicule le plus adapté.',
          'Aucun paiement n’est demandé sur le site : le prix vous est confirmé avant la prestation.',
        ] },
      ],
      faq: [
        { q: 'Combien coûte la mise à disposition d’un chauffeur à Paris ?', a: 'Le prix est établi sur devis selon la durée, les horaires, les trajets et le véhicule. Il vous est confirmé avant la prestation.' },
        { q: 'Quelle est la durée d’une mise à disposition ?', a: 'Elle est fixée avec vous lors du devis : une demi-journée, une journée complète ou une soirée, selon votre programme.' },
        { q: 'Le chauffeur peut-il m’emmener à plusieurs rendez-vous ?', a: 'Oui, c’est le principe de la mise à disposition : le chauffeur vous conduit d’une étape à l’autre pendant toute la durée convenue.' },
        { q: 'La mise à disposition est-elle possible en dehors de Paris ?', a: 'Oui, dans toute l’Île-de-France, par exemple à La Défense, à Versailles ou au parc des expositions de Paris Nord Villepinte.' },
        { q: 'Comment demander un devis ?', a: 'Appelez le +33 6 65 69 96 78, écrivez-nous sur WhatsApp ou envoyez une demande avec le formulaire de réservation : nous vous rappelons pour préciser votre programme.' },
        { q: 'Quels véhicules sont disponibles ?', a: 'Mercedes Classe E, Mercedes Classe S, van Mercedes Classe V (jusqu’à 6 passagers) et Tesla Model Y.' },
      ],
    },
    en: {
      h1: 'Private chauffeur at your disposal in Paris and Île-de-France',
      intro: [
        'Several meetings in one day, a trade fair, dinner followed by a show or a day of sightseeing? With chauffeur hire by the hour, a chauffeur and car are reserved for you for the agreed time: you are driven from one place to the next according to your schedule, without booking each trip separately.',
        'CDG TRANSFERT VTC offers this service in Paris and throughout the Île-de-France region, 24 hours a day, 7 days a week, with the same fleet as our transfers: Mercedes E-Class, Mercedes S-Class, Mercedes V-Class van and Tesla Model Y.',
      ],
      sections: [
        { h2: 'How does chauffeur hire by the hour work?', paras: [
          'You set a start time, a duration and, if you know it, the order of your appointments. The chauffeur picks you up at the agreed address, drops you off at each stop and meets you again for the next one. Your plans change along the way? Simply discuss it with your chauffeur.',
        ], list: [
          'Half day, full day or evening: the duration is agreed with you when quoting.',
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
        { h2: 'Price of chauffeur hire by the hour: on quote', paras: [
          'Chauffeur hire by the hour is not in our price list: its price is given on quote, depending on the duration, times, planned trips and vehicle. It is confirmed before the service.',
          'To get a quote, the simplest way is to call us or send a WhatsApp message stating:',
        ], list: [
          'the date, start time and desired duration;',
          'the starting address and, if possible, the planned stops;',
          'the number of passengers and bags;',
          'the vehicle you would like.',
        ], after: [
          'You can also send a request with the booking form on this page: we will call you back to go over your schedule.',
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
          'For business meetings, the Mercedes E-Class is our reference vehicle, and the Mercedes S-Class offers the highest level of comfort in our fleet to welcome an important client. The fully electric Tesla Model Y suits trips around town. For a delegation or a family, the Mercedes V-Class van seats up to 6 passengers with 6 bags.',
          'Not sure? Describe your schedule and the number of people: we will suggest the most suitable vehicle.',
          'No payment is taken on the website: the price is confirmed before the service.',
        ] },
      ],
      faq: [
        { q: 'How much does it cost to hire a chauffeur by the hour in Paris?', a: 'The price is given on quote depending on the duration, times, trips and vehicle. It is confirmed before the service.' },
        { q: 'How long can I hire a chauffeur for?', a: 'The duration is agreed with you when quoting: half a day, a full day or an evening, depending on your schedule.' },
        { q: 'Can the chauffeur take me to several meetings?', a: 'Yes, that is the whole idea: the chauffeur drives you from one stop to the next for the entire agreed time.' },
        { q: 'Is chauffeur hire available outside Paris?', a: 'Yes, throughout Île-de-France, for example in La Défense, Versailles or at the Paris Nord Villepinte exhibition centre.' },
        { q: 'How do I ask for a quote?', a: 'Call +33 6 65 69 96 78, send us a WhatsApp message or send a request with the booking form: we will call you back to go over your schedule.' },
        { q: 'Which vehicles are available?', a: 'Mercedes E-Class, Mercedes S-Class, Mercedes V-Class van (up to 6 passengers) and Tesla Model Y.' },
      ],
    },
    ru: {
      h1: 'Частный водитель в вашем распоряжении в Париже и Иль-де-Франс',
      intro: [
        'Несколько встреч за день, профессиональная выставка, ужин и спектакль или день экскурсий? При аренде водителя на час автомобиль с водителем закрепляется за вами на согласованное время: водитель возит вас с места на место по вашей программе, и вам не нужно бронировать каждую поездку отдельно.',
        'CDG TRANSFERT VTC предлагает эту услугу в Париже и во всём регионе Иль-де-Франс — круглосуточно и без выходных, на тех же автомобилях, что и для трансферов: Mercedes E-класса, Mercedes S-класса, минивэн Mercedes V-класса и Tesla Model Y.',
      ],
      sections: [
        { h2: 'Как работает аренда водителя на час?', paras: [
          'Вы задаёте время начала, продолжительность и, если знаете, порядок ваших встреч. Водитель забирает вас по согласованному адресу, высаживает на каждом этапе и встречает для следующей поездки. Планы меняются по ходу дня? Просто обсудите это с водителем.',
        ], list: [
          'Полдня, целый день или вечер: продолжительность согласуется с вами при расчёте стоимости.',
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
        { h2: 'Стоимость аренды водителя на час: по запросу', paras: [
          'Аренды водителя на час нет в нашей таблице тарифов: стоимость рассчитывается по запросу в зависимости от продолжительности, времени, запланированных поездок и автомобиля. Она подтверждается до начала услуги.',
          'Чтобы получить расчёт, проще всего позвонить нам или написать в WhatsApp и указать:',
        ], list: [
          'дату, время начала и желаемую продолжительность;',
          'адрес отправления и, по возможности, запланированные остановки;',
          'количество пассажиров и багажа;',
          'желаемый автомобиль.',
        ], after: [
          'Можно также отправить заявку через форму бронирования на этой странице: мы перезвоним, чтобы уточнить вашу программу.',
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
          'Для деловых встреч наш основной автомобиль — Mercedes E-класса, а Mercedes S-класса обеспечивает самый высокий уровень комфорта в нашем автопарке, если нужно встретить важного клиента. Полностью электрическая Tesla Model Y подходит для поездок по городу. Для делегации или семьи минивэн Mercedes V-класса вмещает до 6 пассажиров и 6 мест багажа.',
          'Не знаете, что выбрать? Опишите вашу программу и число участников — мы предложим наиболее подходящий автомобиль.',
          'На сайте ничего не нужно оплачивать: цена подтверждается до начала услуги.',
        ] },
      ],
      faq: [
        { q: 'Сколько стоит аренда водителя на час в Париже?', a: 'Стоимость рассчитывается по запросу в зависимости от продолжительности, времени, маршрутов и автомобиля. Она подтверждается до начала услуги.' },
        { q: 'На какой срок можно арендовать водителя?', a: 'Продолжительность согласуется с вами при расчёте: полдня, целый день или вечер, в зависимости от вашей программы.' },
        { q: 'Может ли водитель отвезти меня на несколько встреч?', a: 'Да, в этом и суть услуги: водитель возит вас от одного пункта к другому в течение всего согласованного времени.' },
        { q: 'Можно ли арендовать водителя за пределами Парижа?', a: 'Да, во всём регионе Иль-де-Франс, например в Дефанс, Версаль или в выставочный центр Paris Nord Villepinte.' },
        { q: 'Как запросить расчёт стоимости?', a: 'Позвоните по номеру +33 6 65 69 96 78, напишите нам в WhatsApp или отправьте заявку через форму бронирования: мы перезвоним, чтобы уточнить программу.' },
        { q: 'Какие автомобили доступны?', a: 'Mercedes E-класса, Mercedes S-класса, минивэн Mercedes V-класса (до 6 пассажиров) и Tesla Model Y.' },
      ],
    },
    ro: {
      h1: 'Șofer privat la dispoziția dumneavoastră în Paris și Île-de-France',
      intro: [
        'Mai multe întâlniri în aceeași zi, un târg profesional, o cină urmată de un spectacol sau o zi de vizite? Cu serviciul de șofer la dispoziție, un șofer și mașina sa vă sunt rezervate pentru durata convenită: vă duce dintr-un loc în altul după programul dumneavoastră, fără să rezervați fiecare cursă separat.',
        'CDG TRANSFERT VTC oferă acest serviciu în Paris și în toată regiunea Île-de-France, 24 de ore din 24, 7 zile din 7, cu aceeași flotă ca pentru transferuri: Mercedes Clasa E, Mercedes Clasa S, van Mercedes Clasa V și Tesla Model Y.',
      ],
      sections: [
        { h2: 'Cum funcționează serviciul de șofer la dispoziție?', paras: [
          'Stabiliți o oră de început, o durată și, dacă o cunoașteți, ordinea întâlnirilor. Șoferul vă preia de la adresa convenită, vă lasă la fiecare etapă și vă reîntâlnește pentru următoarea. Programul se schimbă pe parcurs? Discutați direct cu șoferul.',
        ], list: [
          'Jumătate de zi, zi întreagă sau seară: durata se stabilește împreună cu dumneavoastră la ofertă.',
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
        { h2: 'Prețul serviciului de șofer la dispoziție: la cerere', paras: [
          'Serviciul de șofer la dispoziție nu figurează în tabelul nostru de tarife: prețul se stabilește la cerere, în funcție de durată, orar, traseele prevăzute și vehiculul ales. El vă este confirmat înainte de serviciu.',
          'Pentru a obține o ofertă, cel mai simplu este să ne sunați sau să ne scrieți pe WhatsApp, precizând:',
        ], list: [
          'data, ora de început și durata dorită;',
          'adresa de plecare și, dacă este posibil, etapele prevăzute;',
          'numărul de pasageri și de bagaje;',
          'vehiculul dorit.',
        ], after: [
          'Puteți trimite și o cerere prin formularul de rezervare de pe această pagină: vă sunăm înapoi pentru a stabili programul.',
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
          'Pentru întâlnirile de afaceri, Mercedes Clasa E este vehiculul nostru de referință, iar Mercedes Clasa S oferă cel mai înalt nivel de confort din flota noastră pentru a primi un client important. Tesla Model Y, 100 % electrică, este potrivită pentru deplasările prin oraș. Pentru o delegație sau o familie, van-ul Mercedes Clasa V primește până la 6 pasageri și 6 bagaje.',
          'Nu sunteți sigur? Descrieți-ne programul și numărul de participanți: vă propunem vehiculul cel mai potrivit.',
          'Site-ul nu cere nicio plată: prețul vă este confirmat înainte de serviciu.',
        ] },
      ],
      faq: [
        { q: 'Cât costă un șofer la dispoziție în Paris?', a: 'Prețul se stabilește la cerere în funcție de durată, orar, trasee și vehicul. El vă este confirmat înainte de serviciu.' },
        { q: 'Pentru cât timp pot rezerva un șofer la dispoziție?', a: 'Durata se stabilește împreună cu dumneavoastră la ofertă: o jumătate de zi, o zi întreagă sau o seară, după program.' },
        { q: 'Mă poate duce șoferul la mai multe întâlniri?', a: 'Da, acesta este principiul serviciului: șoferul vă duce de la o etapă la alta pe toată durata convenită.' },
        { q: 'Serviciul este disponibil și în afara Parisului?', a: 'Da, în toată regiunea Île-de-France, de exemplu la La Défense, la Versailles sau la centrul expozițional Paris Nord Villepinte.' },
        { q: 'Cum cer o ofertă?', a: 'Sunați la +33 6 65 69 96 78, scrieți-ne pe WhatsApp sau trimiteți o cerere prin formularul de rezervare: vă sunăm înapoi pentru a stabili programul.' },
        { q: 'Ce vehicule sunt disponibile?', a: 'Mercedes Clasa E, Mercedes Clasa S, van Mercedes Clasa V (până la 6 pasageri) și Tesla Model Y.' },
      ],
    },
  },
}
