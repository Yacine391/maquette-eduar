// ── Conditions officielles du client (4 langues) — source unique ──────
// Suivi des arrivées, attente incluse 1 h, annulation 24 h, inclus dans le
// prix, sièges enfants, réseau de chauffeurs partenaires, mise à disposition.
// Affichées sur l'accueil (tarifs, flotte), sur chaque page service (bloc
// « Attente, annulation et services inclus »), dans le formulaire et dans
// llms.txt. Les chiffres viennent de constants/rates.js et vehicles.js.
// ────────────────────────────────────────────────────────────────────
import { HOURLY } from '../constants/rates.js'
import { PARTNER_FLEET as F } from '../constants/vehicles.js'

const { minHours: H, kmPerHour: KM } = HOURLY

export const CONDITIONS = {
  fr: {
    title: 'Attente, annulation et services inclus',
    tracking: 'Suivi de votre vol ou de votre train en temps réel : un retard n’est jamais facturé, même de 4 ou 5 heures.',
    waiting: 'Attente incluse jusqu’à 1 h après l’atterrissage ou l’arrivée du train ; au-delà (bagages, formalités…), elle est facturée au tarif horaire de la catégorie du véhicule (tarif de mise à disposition).',
    cancel: 'Annulation gratuite jusqu’à 24 h avant la prise en charge ; moins de 24 h avant, la course est facturée à 100 %.',
    included: 'Péages toujours inclus, eau à bord et facture fournie pour chaque course.',
    childSeats: 'Sièges auto et rehausseurs sur demande, pour tous les véhicules : indiquez leur nombre dans le formulaire de réservation.',
    fleet: `Notre Mercedes Classe E est conduite par le responsable de CDG TRANSFERT VTC lui-même. Avec un réseau de chauffeurs partenaires vérifiés, nous disposons aussi de ${F.luxe} Classe S, ${F.van} Classe V, ${F.business} Classe E et ${F.eco} Tesla : plusieurs véhicules peuvent être réservés ensemble pour un groupe.`,
    hourly: `Mise à disposition : minimum ${H} h ; ${KM} km inclus par heure réservée (par exemple ${5 * KM} km pour 5 h), quelle que soit la catégorie ; au-delà, sur devis.`,
    ratesNote: 'Tarifs fixes, péages inclus, confirmés avant la course · 1 h d’attente incluse à l’aéroport ou à la gare',
  },
  en: {
    title: 'Waiting time, cancellation and what is included',
    tracking: 'Your flight or train is tracked in real time: a delay is never charged, even one of 4 or 5 hours.',
    waiting: 'Waiting time is included for up to 1 hour after landing or after the train arrives; beyond that (baggage, formalities…), it is charged at the hourly rate of the vehicle category (chauffeur-by-the-hour rate).',
    cancel: 'Free cancellation up to 24 hours before pick-up; with less than 24 hours’ notice, the full fare (100%) is charged.',
    included: 'Tolls always included, water on board and an invoice for every ride.',
    childSeats: 'Child seats and booster seats on request, for every vehicle: just state how many in the booking form.',
    fleet: `Our Mercedes E-Class is driven by the head of CDG TRANSFERT VTC himself. Together with a network of vetted partner chauffeurs, we also have ${F.luxe} S-Class, ${F.van} V-Class, ${F.business} E-Class and ${F.eco} Tesla cars, so several vehicles can be booked together for a group.`,
    hourly: `Chauffeur by the hour: ${H}-hour minimum; ${KM} km included per hour booked (e.g. ${5 * KM} km for 5 hours), whatever the category; beyond that, on quote.`,
    ratesNote: 'Fixed fares, tolls included, confirmed before the ride · 1 hour of waiting included at the airport or station',
  },
  ru: {
    title: 'Ожидание, отмена и что входит в цену',
    tracking: 'Мы отслеживаем ваш рейс или поезд в реальном времени: задержка никогда не оплачивается, даже на 4–5 часов.',
    waiting: 'Ожидание включено в течение 1 часа после посадки самолёта или прибытия поезда; сверх этого (багаж, формальности…) оно оплачивается по почасовому тарифу категории автомобиля (тариф «водитель на час»).',
    cancel: 'Бесплатная отмена не позднее чем за 24 часа до подачи автомобиля; при отмене менее чем за 24 часа поездка оплачивается полностью (100 %).',
    included: 'Оплата платных дорог всегда включена, вода в салоне и счёт на каждую поездку.',
    childSeats: 'Детские автокресла и бустеры — по запросу, для всех автомобилей: укажите их количество в форме бронирования.',
    fleet: `За рулём нашего Mercedes E-класса — сам руководитель CDG TRANSFERT VTC. Вместе с сетью проверенных водителей-партнёров у нас также есть ${F.luxe} автомобиля S-класса, ${F.van} V-класса, ${F.business} E-класса и ${F.eco} Tesla, поэтому для группы можно заказать сразу несколько автомобилей.`,
    hourly: `Водитель на час: минимум ${H} часа; ${KM} км включено за каждый забронированный час (например, ${5 * KM} км за 5 часов) для любой категории; сверх этого — по запросу.`,
    ratesNote: 'Фиксированные тарифы, платные дороги включены, цена подтверждается до поездки · 1 час ожидания в аэропорту или на вокзале включён',
  },
  ro: {
    title: 'Așteptare, anulare și ce este inclus',
    tracking: 'Urmărim zborul sau trenul dumneavoastră în timp real: o întârziere nu este niciodată facturată, chiar și de 4 sau 5 ore.',
    waiting: 'Așteptarea este inclusă până la 1 oră după aterizare sau după sosirea trenului; peste acest timp (bagaje, formalități…), se facturează la tariful orar al categoriei vehiculului (tariful „șofer la dispoziție”).',
    cancel: 'Anulare gratuită cu până la 24 de ore înainte de preluare; cu mai puțin de 24 de ore înainte, cursa se facturează integral (100 %).',
    included: 'Taxele de autostradă sunt mereu incluse, apă la bord și factură pentru fiecare cursă.',
    childSeats: 'Scaune auto și înălțătoare pentru copii la cerere, pentru toate vehiculele: indicați numărul lor în formularul de rezervare.',
    fleet: `Mercedesul nostru Clasa E este condus chiar de responsabilul CDG TRANSFERT VTC. Împreună cu o rețea de șoferi parteneri verificați, dispunem și de ${F.luxe} Clasa S, ${F.van} Clasa V, ${F.business} Clasa E și ${F.eco} Tesla, așa că pentru un grup se pot rezerva mai multe vehicule deodată.`,
    hourly: `Șofer la dispoziție: minimum ${H} ore; ${KM} km incluși pentru fiecare oră rezervată (de exemplu ${5 * KM} km pentru 5 ore), indiferent de categorie; peste această limită, la cerere.`,
    ratesNote: 'Tarife fixe, taxe de autostradă incluse, confirmate înainte de cursă · 1 oră de așteptare inclusă la aeroport sau la gară',
  },
}

// Liste affichée sur les pages services (ordre de lecture)
export const conditionsList = (lang) => {
  const c = CONDITIONS[lang]
  return [c.tracking, c.waiting, c.cancel, c.included, c.childSeats, c.fleet]
}
