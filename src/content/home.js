// ── Contenu SEO de l'accueil (4 langues) ─────────────────────────────
// title ≤ 60 caractères, description ≤ 155 (vérifié par tests/seo.test.js).
// FAQ affichée sur la page ET reprise en JSON-LD FAQPage (texte identique).
// Prix : uniquement ceux du tableau (src/constants/rates.js).
// ────────────────────────────────────────────────────────────────────

export const HOME = {
  fr: {
    title: 'VTC Paris aéroports CDG et Orly 24h/24 | CDG Transfert VTC',
    description: 'Chauffeur privé VTC à Paris : transferts aéroports CDG, Orly et Beauvais, gares, Disneyland, 24h/24. Mercedes et Tesla, prix confirmé avant la course.',
    faq: [
      { q: 'Comment réserver un VTC avec CDG TRANSFERT VTC ?',
        a: 'Utilisez le formulaire de réservation : indiquez la date, l’heure, l’adresse de prise en charge, la destination et la catégorie de véhicule. Vous pouvez aussi appeler le +33 6 65 69 96 78 ou écrire sur WhatsApp. Votre course est ensuite confirmée par téléphone ou WhatsApp.' },
      { q: 'Quels sont vos tarifs pour les aéroports ?',
        a: 'Entre Paris et les aéroports CDG ou Orly : 65 € en Tesla Model Y, 99 € en Mercedes Classe E, 130 € en Mercedes Classe V et 170 € en Mercedes Classe S. Entre Paris et Beauvais : de 150 € à 300 € selon le véhicule. Tarifs indicatifs, confirmés avant la course.' },
      { q: 'Êtes-vous disponibles la nuit et le week-end ?',
        a: 'Oui, CDG TRANSFERT VTC est disponible 24 h/24 et 7 j/7, y compris pour les vols très matinaux et les arrivées tardives.' },
      { q: 'Quelle zone desservez-vous ?',
        a: 'Paris et toute l’Île-de-France (Hauts-de-Seine, Seine-Saint-Denis, Val-de-Marne, Val-d’Oise, Yvelines, Essonne, Seine-et-Marne), Beauvais et les aéroports Charles-de-Gaulle, Orly et Beauvais. Les trajets de longue distance sont possibles sur devis.' },
      { q: 'Combien de passagers et de bagages pouvez-vous transporter ?',
        a: 'Mercedes Classe E et Classe S : 3 passagers et 3 bagages. Tesla Model Y : 4 passagers et 3 bagages. Van Mercedes Classe V : jusqu’à 6 passagers et 6 bagages.' },
      { q: 'Dois-je payer en ligne ?',
        a: 'Non. Le site permet d’obtenir une estimation et d’envoyer une demande de réservation, sans paiement en ligne. Le prix vous est confirmé avant la course.' },
    ],
  },
  en: {
    title: 'Paris airport transfers CDG & Orly 24/7 | CDG Transfert VTC',
    description: 'Private VTC chauffeur in Paris: CDG, Orly and Beauvais airport transfers, stations, Disneyland, 24/7. Mercedes and Tesla, fare confirmed before the ride.',
    faq: [
      { q: 'How do I book a ride with CDG TRANSFERT VTC?',
        a: 'Use the booking form: enter the date, time, pick-up address, destination and vehicle category. You can also call +33 6 65 69 96 78 or send a WhatsApp message. Your ride is then confirmed by phone or WhatsApp.' },
      { q: 'What are your airport fares?',
        a: 'Between Paris and CDG or Orly airport: €65 in a Tesla Model Y, €99 in a Mercedes E-Class, €130 in a Mercedes V-Class and €170 in a Mercedes S-Class. Between Paris and Beauvais: from €150 to €300 depending on the vehicle. Indicative fares, confirmed before the ride.' },
      { q: 'Are you available at night and at weekends?',
        a: 'Yes, CDG TRANSFERT VTC is available 24 hours a day, 7 days a week, including for very early flights and late arrivals.' },
      { q: 'Which area do you cover?',
        a: 'Paris and the whole Île-de-France region (Hauts-de-Seine, Seine-Saint-Denis, Val-de-Marne, Val-d’Oise, Yvelines, Essonne, Seine-et-Marne), Beauvais and Charles de Gaulle, Orly and Beauvais airports. Long-distance trips are available on quote.' },
      { q: 'How many passengers and bags can you carry?',
        a: 'Mercedes E-Class and S-Class: 3 passengers and 3 bags. Tesla Model Y: 4 passengers and 3 bags. Mercedes V-Class van: up to 6 passengers and 6 bags.' },
      { q: 'Do I have to pay online?',
        a: 'No. The website lets you get an estimate and send a booking request, with no online payment. The fare is confirmed before the ride.' },
    ],
  },
  ru: {
    title: 'VTC в Париже: аэропорты CDG и Орли 24/7 | CDG Transfert VTC',
    description: 'Частный водитель в Париже: трансферы в аэропорты CDG, Орли и Бове, на вокзалы и в Диснейленд, 24/7. Mercedes и Tesla, цена подтверждается до поездки.',
    faq: [
      { q: 'Как забронировать поездку с CDG TRANSFERT VTC?',
        a: 'Заполните форму бронирования: дата, время, адрес посадки, пункт назначения и категория автомобиля. Можно также позвонить по номеру +33 6 65 69 96 78 или написать в WhatsApp. Затем поездка подтверждается по телефону или в WhatsApp.' },
      { q: 'Сколько стоит трансфер в аэропорт?',
        a: 'Между Парижем и аэропортами CDG или Орли: 65 € на Tesla Model Y, 99 € на Mercedes E-класса, 130 € на Mercedes V-класса и 170 € на Mercedes S-класса. Между Парижем и Бове: от 150 € до 300 € в зависимости от автомобиля. Тарифы ориентировочные и подтверждаются до поездки.' },
      { q: 'Вы работаете ночью и в выходные?',
        a: 'Да, CDG TRANSFERT VTC работает круглосуточно и без выходных, в том числе для очень ранних рейсов и поздних прилётов.' },
      { q: 'Какую территорию вы обслуживаете?',
        a: 'Париж и весь регион Иль-де-Франс (Hauts-de-Seine, Seine-Saint-Denis, Val-de-Marne, Val-d’Oise, Yvelines, Essonne, Seine-et-Marne), Бове и аэропорты Шарль-де-Голль, Орли и Бове. Дальние поездки возможны по запросу.' },
      { q: 'Сколько пассажиров и багажа вы перевозите?',
        a: 'Mercedes E-класса и S-класса: 3 пассажира и 3 места багажа. Tesla Model Y: 4 пассажира и 3 места багажа. Минивэн Mercedes V-класса: до 6 пассажиров и 6 мест багажа.' },
      { q: 'Нужно ли платить онлайн?',
        a: 'Нет. На сайте можно получить оценку стоимости и отправить заявку на бронирование без онлайн-оплаты. Цена подтверждается до поездки.' },
    ],
  },
  ro: {
    title: 'VTC Paris aeroporturi CDG și Orly 24/7 | CDG Transfert VTC',
    description: 'Șofer privat VTC în Paris: transferuri la aeroporturile CDG, Orly și Beauvais, gări, Disneyland, 24/7. Mercedes și Tesla, preț confirmat înainte de cursă.',
    faq: [
      { q: 'Cum rezerv o cursă cu CDG TRANSFERT VTC?',
        a: 'Folosiți formularul de rezervare: indicați data, ora, adresa de preluare, destinația și categoria vehiculului. Puteți și să sunați la +33 6 65 69 96 78 sau să scrieți pe WhatsApp. Cursa vă este apoi confirmată prin telefon sau WhatsApp.' },
      { q: 'Care sunt tarifele pentru aeroporturi?',
        a: 'Între Paris și aeroporturile CDG sau Orly: 65 € cu Tesla Model Y, 99 € cu Mercedes Clasa E, 130 € cu Mercedes Clasa V și 170 € cu Mercedes Clasa S. Între Paris și Beauvais: de la 150 € la 300 € în funcție de vehicul. Tarife orientative, confirmate înainte de cursă.' },
      { q: 'Sunteți disponibili noaptea și în weekend?',
        a: 'Da, CDG TRANSFERT VTC este disponibil 24 de ore din 24, 7 zile din 7, inclusiv pentru zborurile foarte matinale și sosirile târzii.' },
      { q: 'Ce zonă deserviți?',
        a: 'Parisul și întreaga regiune Île-de-France (Hauts-de-Seine, Seine-Saint-Denis, Val-de-Marne, Val-d’Oise, Yvelines, Essonne, Seine-et-Marne), Beauvais și aeroporturile Charles de Gaulle, Orly și Beauvais. Cursele pe distanțe lungi sunt posibile la cerere.' },
      { q: 'Câți pasageri și câte bagaje puteți transporta?',
        a: 'Mercedes Clasa E și Clasa S: 3 pasageri și 3 bagaje. Tesla Model Y: 4 pasageri și 3 bagaje. Van Mercedes Clasa V: până la 6 pasageri și 6 bagaje.' },
      { q: 'Trebuie să plătesc online?',
        a: 'Nu. Site-ul vă permite să obțineți o estimare și să trimiteți o cerere de rezervare, fără plată online. Prețul vă este confirmat înainte de cursă.' },
    ],
  },
}
