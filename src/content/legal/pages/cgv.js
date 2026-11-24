// ── Conditions générales de vente (transport VTC) — 4 langues, le
// français fait foi. Règles confirmées par le client uniquement (voir
// CLAUDE.md « Official client information ») ; tarifs : constants/rates.js.
// Projet à valider par le client tant qu'il reste des [À COMPLÉTER].
// Liens : [texte](url).
// ────────────────────────────────────────────────────────────────────
import { BUSINESS, LEGAL_ENTITY as E } from '../../../constants/business.js'
import { rateTable, HOURLY } from '../../../constants/rates.js'
import { pagePath } from '../../../routes.js'

// Tableau des tarifs de l'accueil, dans la langue de la page
const homeRates = (lang) => `${pagePath(lang, 'home')}#rates`

const C = (s) => `[À COMPLÉTER : ${s}]`
const H = rateTable.find(r => r.unit === 'hour')
const { minHours: MIN, kmPerHour: KM } = HOURLY

export default {
  i18n: {
    fr: {
      h1: 'Conditions générales de vente',
      intro: [
        `Les présentes conditions générales de vente (CGV) s’appliquent aux prestations de transport de personnes par voiture de transport avec chauffeur (VTC) proposées par ${BUSINESS.name}, ${E.form.fr}, SIREN ${E.siren}, siège : ${E.address} (voir les [mentions légales](${pagePath('fr', 'mentions-legales')})). Toute réservation implique leur acceptation.`,
      ],
      sections: [
        { h2: '1. Réservation préalable obligatoire', paras: [
          'Conformément au Code des transports, une voiture de transport avec chauffeur ne peut prendre en charge un client que sur réservation préalable : aucune course n’est effectuée sans réservation.',
          'La réservation peut être demandée par le formulaire du site, par téléphone, par WhatsApp ou par e-mail. L’envoi du formulaire constitue une demande de réservation : la réservation n’est ferme qu’après sa confirmation par téléphone ou WhatsApp, qui précise le prix. Le client fournit des informations exactes (adresses, horaires, numéro de vol ou de train, nombre de passagers et de bagages) ; il est responsable des conséquences d’une information erronée.',
        ] },
        { h2: '2. Prix', paras: [
          `Le prix de la course est fixe : il est confirmé au client avant la course. Les tarifs affichés sur le site, dans le [tableau des tarifs](${homeRates('fr')}), sont indicatifs jusqu’à cette confirmation. Les trajets qui ne figurent pas dans le tableau sont établis sur devis.`,
          `Les péages sont toujours inclus dans le prix. Les prix sont exprimés en euros ${C('préciser TTC ou HT et le taux de TVA applicable')}.`,
        ] },
        { h2: '3. Suivi des arrivées et temps d’attente', paras: [
          'Les vols et les trains des clients sont suivis en temps réel : un retard de vol ou de train n’est jamais facturé, même de 4 ou 5 heures.',
          `L’attente est incluse jusqu’à 1 h après l’atterrissage du vol ou l’arrivée du train. Au-delà (bagages, formalités…), elle est facturée au tarif horaire de la catégorie du véhicule : ${H.business} € de l’heure en Mercedes Classe E, ${H.luxe} € en Mercedes Classe S, ${H.van} € en Mercedes Classe V et ${H.eco} € en Tesla.`,
          `Prise en charge à une adresse (hors aéroport et gare) : ${C('temps d’attente inclus et conditions au-delà')}.`,
        ] },
        { h2: '4. Annulation et modification', list: [
          'Annulation gratuite jusqu’à 24 h avant l’heure de prise en charge.',
          'Annulation à moins de 24 h de la prise en charge : la course est facturée à 100 %.',
          `Client absent au rendez-vous convenu (« no-show ») : ${C('conditions applicables')}.`,
          'Toute demande de modification (horaire, adresse, véhicule) est à adresser au plus tôt par téléphone ou WhatsApp ; elle est acceptée sous réserve de disponibilité et peut modifier le prix, qui est alors confirmé à nouveau.',
        ], after: [
          'Si la course ne peut être assurée du fait de CDG TRANSFERT VTC, le client en est informé dès que possible ; la course annulée n’est pas facturée.',
          'Les contrats de transport de passagers sont exclus du droit de rétractation applicable aux contrats conclus à distance (article L221-2 du Code de la consommation) : les règles d’annulation ci-dessus s’appliquent.',
        ] },
        { h2: '5. Véhicules, passagers, bagages et enfants', paras: [
          'Capacités maximales : Mercedes Classe E et Classe S, 3 passagers, 2 grandes valises et 2 petites ; Mercedes Classe V, 6 passagers et 7 valises ; Tesla, 4 passagers et 4 valises. Au-delà, plusieurs véhicules peuvent être réservés ensemble, grâce au réseau de chauffeurs partenaires vérifiés.',
          'Les sièges auto et rehausseurs sont fournis sur demande pour tous les véhicules : leur nombre est à indiquer lors de la réservation, avec l’âge des enfants. Le port de la ceinture de sécurité est obligatoire pour tous les passagers.',
          'De l’eau est à la disposition des passagers à bord.',
        ] },
        { h2: '6. Mise à disposition (à l’heure)', paras: [
          `La mise à disposition d’un chauffeur et de son véhicule est facturée à l’heure, selon la catégorie : ${H.business} € de l’heure en Mercedes Classe E, ${H.van} € en Mercedes Classe V, ${H.luxe} € en Mercedes Classe S et ${H.eco} € en Tesla. Durée minimale : ${MIN} heures. ${KM} km sont inclus par heure réservée, quelle que soit la catégorie (par exemple ${5 * KM} km pour 5 heures) ; au-delà, le kilométrage supplémentaire est établi sur devis.`,
        ] },
        { h2: '7. Paiement et facture', paras: [
          `Aucun paiement n’est demandé sur le site. Moyens de paiement acceptés et moment du paiement : ${C('espèces, carte bancaire, virement… ; paiement à bord, à l’avance ou sur facture')}.`,
          'Une facture est remise pour chaque course.',
        ] },
        { h2: '8. Responsabilité et assurance', paras: [
          `${BUSINESS.name} exécute la course avec soin et dans le respect du Code de la route ; les durées de trajet indiquées sur le site sont des estimations qui dépendent de la circulation. Assurance responsabilité civile professionnelle couvrant le transport de personnes : ${C('nom de l’assureur et numéro de contrat')}.`,
          'Le client est responsable des dommages qu’il cause au véhicule ; les objets laissés dans le véhicule restent sous sa responsabilité.',
        ] },
        { h2: '9. Réclamations et médiation', paras: [
          `Toute réclamation est à adresser par e-mail à ${BUSINESS.email} ou par téléphone au ${BUSINESS.phoneDisplay}, en précisant la date et le trajet de la course.`,
          `Conformément aux articles L612-1 et suivants du Code de la consommation, le client consommateur peut, après une réclamation écrite restée sans solution, recourir gratuitement au médiateur de la consommation : ${C('nom, adresse postale et site internet du médiateur de la consommation')}.`,
        ] },
        { h2: '10. Données personnelles', paras: [
          `Les données communiquées pour la réservation sont traitées conformément à la [politique de confidentialité](${pagePath('fr', 'confidentialite')}).`,
        ] },
        { h2: '11. Droit applicable et litiges', paras: [
          'Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable est recherchée en priorité. À défaut, le client consommateur peut saisir la juridiction compétente selon les règles du Code de procédure civile et du Code de la consommation ; pour un client professionnel, les tribunaux de Paris sont compétents.',
        ] },
      ],
    },
    en: {
      h1: 'Terms and conditions of sale',
      intro: [
        `These terms and conditions of sale apply to the passenger transport services by private hire vehicle with chauffeur (VTC) provided by ${BUSINESS.name}, ${E.form.en}, SIREN ${E.siren}, registered office: ${E.address} (see the [legal notice](${pagePath('en', 'mentions-legales')})). Any booking implies their acceptance.`,
      ],
      sections: [
        { h2: '1. Prior booking required', paras: [
          'Under the French Transport Code, a VTC may only pick up a customer who has booked in advance: no ride is carried out without a booking.',
          'A booking can be requested through the website form, by phone, WhatsApp or e-mail. Sending the form is a booking request: the booking is only firm once confirmed by phone or WhatsApp, with the price. The customer provides accurate information (addresses, times, flight or train number, number of passengers and bags) and is responsible for the consequences of incorrect information.',
        ] },
        { h2: '2. Price', paras: [
          `The fare is fixed: it is confirmed to the customer before the ride. The fares shown on the website, in the [price list](${homeRates('en')}), are indicative until that confirmation. Trips not listed are quoted on request.`,
          `Tolls are always included. Prices are in euros ${C('préciser TTC ou HT et le taux de TVA applicable')}.`,
        ] },
        { h2: '3. Arrival tracking and waiting time', paras: [
          'Customers’ flights and trains are tracked in real time: a flight or train delay is never charged, even one of 4 or 5 hours.',
          `Waiting time is included for up to 1 hour after the flight lands or the train arrives. Beyond that (baggage, formalities…), it is charged at the hourly rate of the vehicle category: €${H.business} per hour in a Mercedes E-Class, €${H.luxe} in a Mercedes S-Class, €${H.van} in a Mercedes V-Class and €${H.eco} in a Tesla.`,
          `Pick-up at an address (other than an airport or station): ${C('temps d’attente inclus et conditions au-delà')}.`,
        ] },
        { h2: '4. Cancellation and changes', list: [
          'Free cancellation up to 24 hours before the pick-up time.',
          'Cancellation less than 24 hours before pick-up: the full fare (100%) is charged.',
          `Customer absent at the agreed meeting point (“no-show”): ${C('conditions applicables')}.`,
          'Any change request (time, address, vehicle) should be made as early as possible by phone or WhatsApp; it is accepted subject to availability and may change the price, which is then confirmed again.',
        ], after: [
          'If the ride cannot be performed because of CDG TRANSFERT VTC, the customer is informed as soon as possible and the cancelled ride is not charged.',
          'Passenger transport contracts are excluded from the right of withdrawal applying to distance contracts (article L221-2 of the French Consumer Code): the cancellation rules above apply.',
        ] },
        { h2: '5. Vehicles, passengers, luggage and children', paras: [
          'Maximum capacities: Mercedes E-Class and S-Class, 3 passengers, 2 large and 2 small suitcases; Mercedes V-Class, 6 passengers and 7 suitcases; Tesla, 4 passengers and 4 suitcases. Beyond that, several vehicles can be booked together through the network of vetted partner chauffeurs.',
          'Child seats and boosters are provided on request for every vehicle: state how many when booking, with the children’s ages. Seat belts are compulsory for all passengers.',
          'Water is available for passengers on board.',
        ] },
        { h2: '6. Chauffeur by the hour', paras: [
          `Hiring a chauffeur and vehicle is charged by the hour, according to the category: €${H.business} per hour in a Mercedes E-Class, €${H.van} in a Mercedes V-Class, €${H.luxe} in a Mercedes S-Class and €${H.eco} in a Tesla. Minimum duration: ${MIN} hours. ${KM} km are included per hour booked, whatever the category (e.g. ${5 * KM} km for 5 hours); any extra mileage is quoted on request.`,
        ] },
        { h2: '7. Payment and invoice', paras: [
          `No payment is taken on the website. Accepted payment methods and time of payment: ${C('espèces, carte bancaire, virement… ; paiement à bord, à l’avance ou sur facture')}.`,
          'An invoice is provided for every ride.',
        ] },
        { h2: '8. Liability and insurance', paras: [
          `${BUSINESS.name} performs the ride with care and in compliance with the Highway Code; travel times shown on the website are estimates depending on traffic. Professional liability insurance covering passenger transport: ${C('nom de l’assureur et numéro de contrat')}.`,
          'The customer is liable for any damage they cause to the vehicle; items left in the vehicle remain their responsibility.',
        ] },
        { h2: '9. Complaints and mediation', paras: [
          `Any complaint should be sent by e-mail to ${BUSINESS.email} or by phone to ${BUSINESS.phoneDisplay}, stating the date and route of the ride.`,
          `In accordance with articles L612-1 et seq. of the French Consumer Code, a consumer customer may, after an unresolved written complaint, use the consumer mediator free of charge: ${C('nom, adresse postale et site internet du médiateur de la consommation')}.`,
        ] },
        { h2: '10. Personal data', paras: [
          `Data provided for the booking is processed in accordance with the [privacy policy](${pagePath('en', 'confidentialite')}).`,
        ] },
        { h2: '11. Governing law and disputes', paras: [
          'These terms are governed by French law. In the event of a dispute, an amicable solution is sought first. Failing that, a consumer customer may refer the matter to the competent court under the French Code of Civil Procedure and Consumer Code; for a business customer, the courts of Paris have jurisdiction.',
        ] },
      ],
    },
    ru: {
      h1: 'Общие условия продажи',
      intro: [
        `Настоящие общие условия продажи применяются к услугам перевозки пассажиров на автомобиле с водителем (VTC), предоставляемым ${BUSINESS.name}, ${E.form.ru}, SIREN ${E.siren}, юридический адрес: ${E.address} (см. [правовую информацию](${pagePath('ru', 'mentions-legales')})). Любое бронирование означает их принятие.`,
      ],
      sections: [
        { h2: '1. Обязательное предварительное бронирование', paras: [
          'Согласно Транспортному кодексу Франции, автомобиль VTC может забрать клиента только по предварительному бронированию: поездки без брони не выполняются.',
          'Бронирование можно запросить через форму на сайте, по телефону, в WhatsApp или по e-mail. Отправка формы — это заявка: бронирование становится твёрдым только после подтверждения по телефону или в WhatsApp с указанием цены. Клиент предоставляет точные сведения (адреса, время, номер рейса или поезда, число пассажиров и багажа) и отвечает за последствия неверной информации.',
        ] },
        { h2: '2. Цена', paras: [
          `Цена поездки фиксированная и подтверждается клиенту до поездки. Тарифы на сайте, в [таблице тарифов](${homeRates('ru')}), являются ориентировочными до этого подтверждения. Маршруты вне таблицы рассчитываются по запросу.`,
          `Платные дороги всегда включены. Цены указаны в евро ${C('préciser TTC ou HT et le taux de TVA applicable')}.`,
        ] },
        { h2: '3. Отслеживание прибытия и ожидание', paras: [
          'Рейсы и поезда клиентов отслеживаются в реальном времени: задержка рейса или поезда никогда не оплачивается, даже на 4–5 часов.',
          `Ожидание включено в течение 1 часа после посадки самолёта или прибытия поезда. Сверх этого (багаж, формальности…) оно оплачивается по почасовому тарифу категории автомобиля: ${H.business} € в час за Mercedes E-класса, ${H.luxe} € за Mercedes S-класса, ${H.van} € за Mercedes V-класса и ${H.eco} € за Tesla.`,
          `Подача по адресу (кроме аэропорта и вокзала): ${C('temps d’attente inclus et conditions au-delà')}.`,
        ] },
        { h2: '4. Отмена и изменение', list: [
          'Бесплатная отмена не позднее чем за 24 часа до времени подачи.',
          'Отмена менее чем за 24 часа: поездка оплачивается полностью (100 %).',
          `Клиент не явился в условленное место (no-show): ${C('conditions applicables')}.`,
          'Любой запрос на изменение (время, адрес, автомобиль) направляйте как можно раньше по телефону или в WhatsApp; он принимается при наличии возможности и может изменить цену, которая подтверждается заново.',
        ], after: [
          'Если поездка не может быть выполнена по вине CDG TRANSFERT VTC, клиент уведомляется как можно скорее, а отменённая поездка не оплачивается.',
          'Договоры перевозки пассажиров исключены из права отказа, применяемого к дистанционным договорам (статья L221-2 Кодекса потребителя Франции): действуют правила отмены, указанные выше.',
        ] },
        { h2: '5. Автомобили, пассажиры, багаж и дети', paras: [
          'Максимальная вместимость: Mercedes E-класса и S-класса — 3 пассажира, 2 больших и 2 маленьких чемодана; Mercedes V-класса — 6 пассажиров и 7 чемоданов; Tesla — 4 пассажира и 4 чемодана. Сверх этого можно заказать несколько автомобилей благодаря сети проверенных водителей-партнёров.',
          'Детские автокресла и бустеры предоставляются по запросу для всех автомобилей: укажите их количество при бронировании вместе с возрастом детей. Ремень безопасности обязателен для всех пассажиров.',
          'В салоне для пассажиров есть вода.',
        ] },
        { h2: '6. Водитель на час', paras: [
          `Аренда водителя с автомобилем оплачивается по часам в зависимости от категории: ${H.business} € в час за Mercedes E-класса, ${H.van} € за Mercedes V-класса, ${H.luxe} € за Mercedes S-класса и ${H.eco} € за Tesla. Минимальная продолжительность: ${MIN} часа. За каждый забронированный час включено ${KM} км для любой категории (например, ${5 * KM} км за 5 часов); дополнительный пробег рассчитывается по запросу.`,
        ] },
        { h2: '7. Оплата и счёт', paras: [
          `На сайте оплата не взимается. Принимаемые способы и момент оплаты: ${C('espèces, carte bancaire, virement… ; paiement à bord, à l’avance ou sur facture')}.`,
          'На каждую поездку выдаётся счёт.',
        ] },
        { h2: '8. Ответственность и страхование', paras: [
          `${BUSINESS.name} выполняет поездку добросовестно и с соблюдением Правил дорожного движения; время в пути на сайте — оценка, зависящая от трафика. Страхование профессиональной ответственности при перевозке пассажиров: ${C('nom de l’assureur et numéro de contrat')}.`,
          'Клиент несёт ответственность за ущерб, причинённый им автомобилю; оставленные в автомобиле вещи остаются под его ответственностью.',
        ] },
        { h2: '9. Претензии и медиация', paras: [
          `Претензии направляйте по e-mail ${BUSINESS.email} или по телефону ${BUSINESS.phoneDisplay}, указав дату и маршрут поездки.`,
          `В соответствии со статьями L612-1 и далее Кодекса потребителя Франции клиент-потребитель после неурегулированной письменной претензии может бесплатно обратиться к медиатору по делам потребителей: ${C('nom, adresse postale et site internet du médiateur de la consommation')}.`,
        ] },
        { h2: '10. Персональные данные', paras: [
          `Данные для бронирования обрабатываются в соответствии с [политикой конфиденциальности](${pagePath('ru', 'confidentialite')}).`,
        ] },
        { h2: '11. Применимое право и споры', paras: [
          'Настоящие условия регулируются правом Франции. В случае спора в первую очередь ищется мирное решение. В противном случае клиент-потребитель может обратиться в компетентный суд согласно Гражданскому процессуальному кодексу и Кодексу потребителя Франции; для клиента-профессионала компетентны суды Парижа.',
        ] },
      ],
    },
    ro: {
      h1: 'Condiții generale de vânzare',
      intro: [
        `Prezentele condiții generale de vânzare se aplică serviciilor de transport de persoane cu vehicul cu șofer (VTC) oferite de ${BUSINESS.name}, ${E.form.ro}, SIREN ${E.siren}, sediu: ${E.address} (vedeți [mențiunile legale](${pagePath('ro', 'mentions-legales')})). Orice rezervare implică acceptarea lor.`,
      ],
      sections: [
        { h2: '1. Rezervare prealabilă obligatorie', paras: [
          'Conform Codului transporturilor din Franța, un vehicul VTC poate prelua un client doar pe baza unei rezervări prealabile: nicio cursă nu se efectuează fără rezervare.',
          'Rezervarea poate fi cerută prin formularul site-ului, prin telefon, WhatsApp sau e-mail. Trimiterea formularului este o cerere de rezervare: rezervarea devine fermă doar după confirmarea prin telefon sau WhatsApp, care precizează prețul. Clientul furnizează informații exacte (adrese, ore, numărul zborului sau al trenului, numărul de pasageri și de bagaje) și răspunde de consecințele unor informații greșite.',
        ] },
        { h2: '2. Preț', paras: [
          `Prețul cursei este fix și îi este confirmat clientului înainte de cursă. Tarifele afișate pe site, în [tabelul de tarife](${homeRates('ro')}), sunt orientative până la această confirmare. Traseele care nu figurează în tabel se stabilesc la cerere.`,
          `Taxele de autostradă sunt mereu incluse. Prețurile sunt exprimate în euro ${C('préciser TTC ou HT et le taux de TVA applicable')}.`,
        ] },
        { h2: '3. Urmărirea sosirilor și timpul de așteptare', paras: [
          'Zborurile și trenurile clienților sunt urmărite în timp real: o întârziere a zborului sau a trenului nu este niciodată facturată, chiar și de 4 sau 5 ore.',
          `Așteptarea este inclusă până la 1 oră după aterizarea zborului sau sosirea trenului. Peste acest timp (bagaje, formalități…), se facturează la tariful orar al categoriei vehiculului: ${H.business} € pe oră cu Mercedes Clasa E, ${H.luxe} € cu Mercedes Clasa S, ${H.van} € cu Mercedes Clasa V și ${H.eco} € cu Tesla.`,
          `Preluare de la o adresă (în afara aeroportului și a gării): ${C('temps d’attente inclus et conditions au-delà')}.`,
        ] },
        { h2: '4. Anulare și modificare', list: [
          'Anulare gratuită cu până la 24 de ore înainte de ora preluării.',
          'Anulare cu mai puțin de 24 de ore înainte de preluare: cursa se facturează integral (100 %).',
          `Client absent la locul convenit („no-show”): ${C('conditions applicables')}.`,
          'Orice cerere de modificare (oră, adresă, vehicul) se transmite cât mai devreme prin telefon sau WhatsApp; este acceptată în limita disponibilității și poate modifica prețul, care este atunci confirmat din nou.',
        ], after: [
          'Dacă cursa nu poate fi efectuată din cauza CDG TRANSFERT VTC, clientul este informat cât mai repede, iar cursa anulată nu se facturează.',
          'Contractele de transport de pasageri sunt excluse de la dreptul de retragere aplicabil contractelor la distanță (articolul L221-2 din Codul consumului din Franța): se aplică regulile de anulare de mai sus.',
        ] },
        { h2: '5. Vehicule, pasageri, bagaje și copii', paras: [
          'Capacități maxime: Mercedes Clasa E și Clasa S, 3 pasageri, 2 valize mari și 2 mici; Mercedes Clasa V, 6 pasageri și 7 valize; Tesla, 4 pasageri și 4 valize. Peste aceste limite se pot rezerva mai multe vehicule deodată, prin rețeaua de șoferi parteneri verificați.',
          'Scaunele auto și înălțătoarele sunt oferite la cerere pentru toate vehiculele: indicați numărul lor la rezervare, împreună cu vârsta copiilor. Centura de siguranță este obligatorie pentru toți pasagerii.',
          'La bord, pasagerii au apă la dispoziție.',
        ] },
        { h2: '6. Șofer la dispoziție (cu ora)', paras: [
          `Punerea la dispoziție a unui șofer și a vehiculului se facturează cu ora, în funcție de categorie: ${H.business} € pe oră cu Mercedes Clasa E, ${H.van} € cu Mercedes Clasa V, ${H.luxe} € cu Mercedes Clasa S și ${H.eco} € cu Tesla. Durata minimă: ${MIN} ore. Pentru fiecare oră rezervată sunt incluși ${KM} km, indiferent de categorie (de exemplu ${5 * KM} km pentru 5 ore); kilometrii suplimentari se stabilesc la cerere.`,
        ] },
        { h2: '7. Plată și factură', paras: [
          `Site-ul nu cere nicio plată. Mijloace de plată acceptate și momentul plății: ${C('espèces, carte bancaire, virement… ; paiement à bord, à l’avance ou sur facture')}.`,
          'Pentru fiecare cursă se emite o factură.',
        ] },
        { h2: '8. Răspundere și asigurare', paras: [
          `${BUSINESS.name} efectuează cursa cu grijă și cu respectarea Codului rutier; duratele de drum afișate pe site sunt estimări care depind de trafic. Asigurare de răspundere civilă profesională pentru transportul de persoane: ${C('nom de l’assureur et numéro de contrat')}.`,
          'Clientul răspunde de daunele pe care le provoacă vehiculului; obiectele lăsate în vehicul rămân în responsabilitatea sa.',
        ] },
        { h2: '9. Reclamații și mediere', paras: [
          `Orice reclamație se trimite prin e-mail la ${BUSINESS.email} sau prin telefon la ${BUSINESS.phoneDisplay}, precizând data și traseul cursei.`,
          `Conform articolelor L612-1 și următoarele din Codul consumului din Franța, clientul consumator poate apela gratuit, după o reclamație scrisă nesoluționată, la mediatorul de consum: ${C('nom, adresse postale et site internet du médiateur de la consommation')}.`,
        ] },
        { h2: '10. Date personale', paras: [
          `Datele comunicate pentru rezervare sunt prelucrate conform [politicii de confidențialitate](${pagePath('ro', 'confidentialite')}).`,
        ] },
        { h2: '11. Legea aplicabilă și litigii', paras: [
          'Prezentele condiții sunt guvernate de legea franceză. În caz de litigiu, se caută mai întâi o soluție amiabilă. În lipsa acesteia, clientul consumator poate sesiza instanța competentă conform Codului de procedură civilă și Codului consumului din Franța; pentru un client profesionist, competente sunt instanțele din Paris.',
        ] },
      ],
    },
  },
}
