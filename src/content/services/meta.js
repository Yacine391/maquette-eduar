// ── Pages services : métadonnées (4 langues) ─────────────────────────
// Chargées sur toutes les pages (menu, pied de page, cartes « Nos services »,
// liens « Services associés »). Le texte complet de chaque page est dans
// pages/<slug>.js, chargé uniquement sur la page concernée.
//   rates       : lignes du tableau des tarifs affichées (src/constants/rates.js)
//   vehicleCols : colonnes de véhicules affichées (toutes par défaut)
//   areaServed  : zones du JSON-LD ('Paris', 'IDF', 'Beauvais', 'CDG', 'ORY', 'BVA')
// title ≤ 60 caractères, description ≤ 155 (vérifié par tests/seo.test.js).
// ────────────────────────────────────────────────────────────────────
import { SERVICE_SLUGS } from '../../routes.js'

const META = {
  'vtc-aeroport-cdg': {
    rates: ['airport'],
    related: ['vtc-aeroport-orly', 'vtc-gares-paris', 'van-7-places-paris', 'vtc-disneyland-paris'],
    areaServed: ['Paris', 'CDG'],
    i18n: {
      fr: {
        nav: 'Aéroport CDG',
        title: 'VTC Paris ↔ CDG à prix fixe 24h/24 | CDG Transfert VTC',
        description: 'Chauffeur privé VTC entre Paris et Roissy-Charles-de-Gaulle, 24h/24. Dès 65 €, tarif confirmé avant la course. Réservez en ligne ou par téléphone.',
        card: 'Transferts entre Paris et Roissy-Charles-de-Gaulle, terminaux 1, 2 et 3, de jour comme de nuit.',
        serviceType: 'Transfert aéroport Paris-Charles-de-Gaulle en VTC',
      },
      en: {
        nav: 'CDG Airport',
        title: 'Paris ↔ CDG airport chauffeur 24/7 | CDG Transfert VTC',
        description: 'Private VTC chauffeur between Paris and Charles de Gaulle airport (Roissy), 24/7. From €65, fare confirmed before the ride. Book online or by phone.',
        card: 'Transfers between Paris and Charles de Gaulle airport, terminals 1, 2 and 3, day and night.',
        serviceType: 'Paris-Charles de Gaulle airport transfer by private chauffeur',
      },
      ru: {
        nav: 'Аэропорт CDG',
        title: 'Трансфер Париж ↔ аэропорт CDG 24/7 | CDG Transfert VTC',
        description: 'Частный водитель между Парижем и аэропортом Шарль-де-Голль (Руасси) круглосуточно. От 65 €, цена подтверждается до поездки. Бронирование онлайн.',
        card: 'Трансферы между Парижем и аэропортом Шарль-де-Голль, терминалы 1, 2 и 3, днём и ночью.',
        serviceType: 'Трансфер в аэропорт Париж — Шарль-де-Голль с частным водителем',
      },
      ro: {
        nav: 'Aeroport CDG',
        title: 'VTC Paris ↔ aeroport CDG 24/7 | CDG Transfert VTC',
        description: 'Șofer privat VTC între Paris și aeroportul Charles de Gaulle (Roissy), 24/7. De la 65 €, tarif confirmat înainte de cursă. Rezervați online sau la telefon.',
        card: 'Transferuri între Paris și aeroportul Charles de Gaulle, terminalele 1, 2 și 3, zi și noapte.',
        serviceType: 'Transfer aeroport Paris-Charles de Gaulle cu șofer privat',
      },
    },
  },
  'vtc-aeroport-orly': {
    rates: ['airport'],
    related: ['vtc-aeroport-cdg', 'vtc-gares-paris', 'vtc-disneyland-paris', 'mise-a-disposition-chauffeur'],
    areaServed: ['Paris', 'ORY'],
    i18n: {
      fr: {
        nav: 'Aéroport d’Orly',
        title: 'VTC Paris ↔ Orly à prix fixe 24h/24 | CDG Transfert VTC',
        description: 'Chauffeur privé VTC entre Paris et l’aéroport d’Orly (Orly 1 à 4), 24h/24. Dès 65 €, tarif confirmé avant la course. Réservez en ligne ou par téléphone.',
        card: 'Transferts entre Paris et l’aéroport d’Orly, terminaux Orly 1, 2, 3 et 4, tôt le matin comme tard le soir.',
        serviceType: 'Transfert aéroport Paris-Orly en VTC',
      },
      en: {
        nav: 'Orly Airport',
        title: 'Paris ↔ Orly airport chauffeur 24/7 | CDG Transfert VTC',
        description: 'Private VTC chauffeur between Paris and Orly airport (Orly 1 to 4), 24/7. From €65, fare confirmed before the ride. Book online or by phone.',
        card: 'Transfers between Paris and Orly airport, terminals Orly 1, 2, 3 and 4, early in the morning or late at night.',
        serviceType: 'Paris-Orly airport transfer by private chauffeur',
      },
      ru: {
        nav: 'Аэропорт Орли',
        title: 'Трансфер Париж ↔ аэропорт Орли 24/7 | CDG Transfert VTC',
        description: 'Частный водитель между Парижем и аэропортом Орли (терминалы Orly 1–4) круглосуточно. От 65 €, цена подтверждается до поездки. Бронь онлайн или по телефону.',
        card: 'Трансферы между Парижем и аэропортом Орли, терминалы Orly 1, 2, 3 и 4, рано утром и поздно вечером.',
        serviceType: 'Трансфер в аэропорт Париж — Орли с частным водителем',
      },
      ro: {
        nav: 'Aeroportul Orly',
        title: 'VTC Paris ↔ aeroport Orly 24/7 | CDG Transfert VTC',
        description: 'Șofer privat VTC între Paris și aeroportul Orly (Orly 1–4), 24/7. De la 65 €, tarif confirmat înainte de cursă. Rezervați online sau prin telefon.',
        card: 'Transferuri între Paris și aeroportul Orly, terminalele Orly 1, 2, 3 și 4, dis-de-dimineață sau seara târziu.',
        serviceType: 'Transfer aeroport Paris-Orly cu șofer privat',
      },
    },
  },
  'vtc-aeroport-beauvais': {
    rates: ['beauvais'],
    related: ['vtc-aeroport-cdg', 'vtc-aeroport-orly', 'van-7-places-paris', 'vtc-gares-paris'],
    areaServed: ['Paris', 'Beauvais', 'BVA'],
    i18n: {
      fr: {
        nav: 'Aéroport de Beauvais',
        title: 'VTC Paris ↔ aéroport de Beauvais 24h/24 | CDG Transfert VTC',
        description: 'Chauffeur privé VTC entre Paris et l’aéroport de Beauvais-Tillé, de jour comme de nuit. De 150 € à 300 € selon le véhicule, tarif confirmé avant la course.',
        card: 'Transferts entre Paris et l’aéroport de Beauvais, y compris pour les vols très matinaux et les arrivées tardives.',
        serviceType: 'Transfert aéroport Paris-Beauvais en VTC',
      },
      en: {
        nav: 'Beauvais Airport',
        title: 'Paris ↔ Beauvais airport chauffeur 24/7 | CDG Transfert VTC',
        description: 'Private VTC chauffeur between Paris and Beauvais-Tillé airport, day and night. From €150 to €300 depending on the vehicle, fare confirmed before the ride.',
        card: 'Transfers between Paris and Beauvais airport, including very early flights and late arrivals.',
        serviceType: 'Paris-Beauvais airport transfer by private chauffeur',
      },
      ru: {
        nav: 'Аэропорт Бове',
        title: 'Трансфер Париж ↔ аэропорт Бове 24/7 | CDG Transfert VTC',
        description: 'Частный водитель между Парижем и аэропортом Бове-Тилле днём и ночью. От 150 € до 300 € в зависимости от автомобиля, цена подтверждается до поездки.',
        card: 'Трансферы между Парижем и аэропортом Бове, в том числе к очень ранним рейсам и после поздних прилётов.',
        serviceType: 'Трансфер в аэропорт Париж — Бове с частным водителем',
      },
      ro: {
        nav: 'Aeroportul Beauvais',
        title: 'VTC Paris ↔ aeroport Beauvais 24/7 | CDG Transfert VTC',
        description: 'Șofer privat VTC între Paris și aeroportul Beauvais-Tillé, zi și noapte. Între 150 € și 300 € în funcție de vehicul, tarif confirmat înainte de cursă.',
        card: 'Transferuri între Paris și aeroportul Beauvais, inclusiv pentru zborurile foarte matinale și sosirile târzii.',
        serviceType: 'Transfer aeroport Paris-Beauvais cu șofer privat',
      },
    },
  },
  'vtc-gares-paris': {
    rates: ['city', 'airport'],
    related: ['vtc-aeroport-cdg', 'vtc-aeroport-orly', 'mise-a-disposition-chauffeur', 'van-7-places-paris'],
    areaServed: ['Paris', 'CDG', 'ORY'],
    i18n: {
      fr: {
        nav: 'Gares de Paris',
        title: 'VTC gare du Nord, gare de Lyon… 24h/24 | CDG Transfert VTC',
        description: 'Chauffeur privé VTC depuis et vers les gares de Paris : Nord, Est, Lyon, Montparnasse, Saint-Lazare, Austerlitz. Dès 50 €, tarif confirmé avant la course.',
        card: 'Gare du Nord, de Lyon, de l’Est, Montparnasse, Saint-Lazare, Austerlitz : vers votre adresse ou l’aéroport.',
        serviceType: 'Transfert VTC depuis et vers les gares de Paris',
      },
      en: {
        nav: 'Paris train stations',
        title: 'Paris train station transfers 24/7 | CDG Transfert VTC',
        description: 'Private VTC chauffeur to and from Paris stations: Gare du Nord, de l’Est, de Lyon, Montparnasse, Saint-Lazare. From €50, fare confirmed before the ride.',
        card: 'Gare du Nord, Gare de Lyon, Gare de l’Est, Montparnasse, Saint-Lazare, Austerlitz: to your address or the airport.',
        serviceType: 'Chauffeur transfer from and to the Paris railway stations',
      },
      ru: {
        nav: 'Вокзалы Парижа',
        title: 'Трансфер с вокзалов Парижа 24/7 | CDG Transfert VTC',
        description: 'Частный водитель с вокзалов Парижа и на вокзалы: Северный, Восточный, Лионский, Монпарнас, Сен-Лазар. От 50 €, цена подтверждается до поездки.',
        card: 'Северный, Лионский, Восточный вокзалы, Монпарнас, Сен-Лазар, Аустерлиц: до вашего адреса или аэропорта.',
        serviceType: 'Трансфер с водителем с вокзалов Парижа и на вокзалы',
      },
      ro: {
        nav: 'Gările din Paris',
        title: 'VTC gările din Paris 24/7 | CDG Transfert VTC',
        description: 'Șofer privat VTC din și spre gările Parisului: Gare du Nord, de l’Est, de Lyon, Montparnasse, Saint-Lazare. De la 50 €, tarif confirmat înainte de cursă.',
        card: 'Gare du Nord, Gare de Lyon, Gare de l’Est, Montparnasse, Saint-Lazare, Austerlitz: spre adresa dumneavoastră sau aeroport.',
        serviceType: 'Transfer cu șofer din și spre gările din Paris',
      },
    },
  },
  'vtc-disneyland-paris': {
    rates: [],
    related: ['van-7-places-paris', 'vtc-aeroport-cdg', 'vtc-aeroport-orly', 'vtc-gares-paris'],
    areaServed: ['Paris', 'IDF', 'CDG', 'ORY'],
    i18n: {
      fr: {
        nav: 'Disneyland Paris',
        title: 'VTC Paris ↔ Disneyland Paris 24h/24 | CDG Transfert VTC',
        description: 'Chauffeur privé VTC vers Disneyland Paris depuis Paris, Roissy-CDG ou Orly. Van 6 passagers pour les familles. Prix sur devis, confirmé avant la course.',
        card: 'Transferts en famille vers les parcs et hôtels de Disneyland Paris, depuis Paris, Roissy-CDG ou Orly.',
        serviceType: 'Transfert VTC vers Disneyland Paris',
      },
      en: {
        nav: 'Disneyland Paris',
        title: 'Paris ↔ Disneyland Paris chauffeur 24/7 | CDG Transfert VTC',
        description: 'Private VTC chauffeur to Disneyland Paris from Paris, Roissy-CDG or Orly. 6-passenger van for families. Price on quote, confirmed before the ride.',
        card: 'Family transfers to the Disneyland Paris parks and hotels, from Paris, Roissy-CDG or Orly.',
        serviceType: 'Chauffeur transfer to Disneyland Paris',
      },
      ru: {
        nav: 'Диснейленд Париж',
        title: 'Трансфер Париж ↔ Диснейленд 24/7 | CDG Transfert VTC',
        description: 'Частный водитель в Диснейленд Париж из Парижа, аэропортов CDG и Орли. Минивэн на 6 пассажиров для семей. Цена по запросу, подтверждается до поездки.',
        card: 'Семейные трансферы к паркам и отелям Диснейленд Париж из Парижа, Руасси-CDG или Орли.',
        serviceType: 'Трансфер с водителем в Диснейленд Париж',
      },
      ro: {
        nav: 'Disneyland Paris',
        title: 'VTC Paris ↔ Disneyland Paris 24/7 | CDG Transfert VTC',
        description: 'Șofer privat VTC spre Disneyland Paris din Paris, Roissy-CDG sau Orly. Van de 6 pasageri pentru familii. Preț la cerere, confirmat înainte de cursă.',
        card: 'Transferuri în familie spre parcurile și hotelurile Disneyland Paris, din Paris, Roissy-CDG sau Orly.',
        serviceType: 'Transfer cu șofer spre Disneyland Paris',
      },
    },
  },
  'mise-a-disposition-chauffeur': {
    rates: [],
    related: ['vtc-aeroport-cdg', 'vtc-gares-paris', 'van-7-places-paris', 'vtc-disneyland-paris'],
    areaServed: ['Paris', 'IDF'],
    i18n: {
      fr: {
        nav: 'Mise à disposition',
        title: 'Mise à disposition de chauffeur à Paris | CDG Transfert VTC',
        description: 'Chauffeur privé à votre disposition à Paris et en Île-de-France : rendez-vous, salons, soirées, visites. Prix sur devis, confirmé avant la course.',
        card: 'Un chauffeur et son véhicule réservés pour une demi-journée, une journée ou une soirée, selon votre programme.',
        serviceType: 'Mise à disposition de chauffeur VTC',
      },
      en: {
        nav: 'Chauffeur by the hour',
        title: 'Hourly chauffeur hire in Paris | CDG Transfert VTC',
        description: 'A private chauffeur at your disposal in Paris and Île-de-France: meetings, trade fairs, evenings, sightseeing. Price on quote, confirmed before the ride.',
        card: 'A chauffeur and car reserved for half a day, a full day or an evening, following your schedule.',
        serviceType: 'Hourly chauffeur hire (VTC)',
      },
      ru: {
        nav: 'Водитель на час',
        title: 'Водитель с автомобилем на час в Париже | CDG Transfert VTC',
        description: 'Частный водитель с автомобилем в вашем распоряжении в Париже и Иль-де-Франс: встречи, выставки, вечера, экскурсии. Цена по запросу, подтверждается заранее.',
        card: 'Водитель и автомобиль закреплены за вами на полдня, целый день или вечер — по вашей программе.',
        serviceType: 'Аренда автомобиля с водителем на час (VTC)',
      },
      ro: {
        nav: 'Șofer la dispoziție',
        title: 'Șofer privat la dispoziție în Paris | CDG Transfert VTC',
        description: 'Șofer privat și mașină la dispoziția dumneavoastră în Paris și Île-de-France: întâlniri, târguri, seri, vizite. Preț la cerere, confirmat înainte de cursă.',
        card: 'Un șofer și mașina sa rezervate pentru o jumătate de zi, o zi întreagă sau o seară, după programul dumneavoastră.',
        serviceType: 'Șofer VTC la dispoziție, cu ora',
      },
    },
  },
  'van-7-places-paris': {
    rates: ['airport', 'city', 'beauvais'],
    vehicleCols: ['van'],
    related: ['vtc-disneyland-paris', 'vtc-aeroport-cdg', 'vtc-aeroport-beauvais', 'mise-a-disposition-chauffeur'],
    i18n: {
      fr: {
        nav: 'Van 7 places',
        title: 'Van 7 places avec chauffeur à Paris | CDG Transfert VTC',
        description: 'Van Mercedes Classe V avec chauffeur à Paris : 6 passagers et 6 bagages. Aéroports CDG et Orly 130 €, Beauvais 250 €. Tarif confirmé avant la course.',
        card: 'Mercedes Classe V pour 6 passagers et 6 bagages : familles, groupes et équipes, vers les aéroports et partout à Paris.',
        serviceType: 'Van avec chauffeur (Mercedes Classe V, 6 passagers)',
      },
      en: {
        nav: '7-seater van',
        title: '7-seater van with driver in Paris | CDG Transfert VTC',
        description: 'Mercedes V-Class van with driver in Paris: 6 passengers and 6 bags. CDG and Orly airports €130, Beauvais €250. Fare confirmed before the ride.',
        card: 'Mercedes V-Class for 6 passengers and 6 bags: families, groups and teams, to the airports and anywhere in Paris.',
        serviceType: 'Van with driver (Mercedes V-Class, 6 passengers)',
      },
      ru: {
        nav: 'Минивэн на 7 мест',
        title: 'Минивэн на 7 мест с водителем в Париже | CDG Transfert VTC',
        description: 'Минивэн Mercedes V-класса с водителем в Париже: 6 пассажиров и 6 мест багажа. Аэропорты CDG и Орли 130 €, Бове 250 €. Цена подтверждается до поездки.',
        card: 'Mercedes V-класса для 6 пассажиров и 6 мест багажа: семьи, группы и команды — в аэропорты и по всему Парижу.',
        serviceType: 'Минивэн с водителем (Mercedes V-класса, 6 пассажиров)',
      },
      ro: {
        nav: 'Van de 7 locuri',
        title: 'Van de 7 locuri cu șofer în Paris | CDG Transfert VTC',
        description: 'Van Mercedes Clasa V cu șofer în Paris: 6 pasageri și 6 bagaje. Aeroporturile CDG și Orly 130 €, Beauvais 250 €. Tarif confirmat înainte de cursă.',
        card: 'Mercedes Clasa V pentru 6 pasageri și 6 bagaje: familii, grupuri și echipe, spre aeroporturi și oriunde în Paris.',
        serviceType: 'Van cu șofer (Mercedes Clasa V, 6 pasageri)',
      },
    },
  },
}

export const SERVICE_META = Object.fromEntries(SERVICE_SLUGS.map(slug => [slug, { slug, ...META[slug] }]))
export const SERVICE_META_LIST = SERVICE_SLUGS.map(slug => SERVICE_META[slug])
