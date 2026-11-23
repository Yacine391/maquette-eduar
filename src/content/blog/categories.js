// ── Catégories du blog ───────────────────────────────────────────────
// Slug (dossier content/blog/<slug>/ et URL /blog/<slug>), nom, langue,
// title (≤ 40 caractères avant « | CDG Transfert VTC »), description
// (≤ 155), intro unique de 150 à 250 mots (vérifié par tests/seo.test.js)
// et pages services liées. Aucun prix ni promesse non confirmée.
// ────────────────────────────────────────────────────────────────────

export const CATEGORIES = [
  {
    slug: 'transferts-cdg',
    lang: 'fr',
    name: 'Transferts aéroport Charles-de-Gaulle',
    short: 'Aéroport CDG',
    title: 'Transferts aéroport CDG : nos guides',
    description: 'Guides pratiques pour vos transferts entre Paris et Roissy-Charles-de-Gaulle : temps de trajet, terminaux, départs et arrivées en VTC.',
    services: ['vtc-aeroport-cdg', 'vtc-gares-paris', 'van-7-places-paris'],
    intro: [
      'Roissy-Charles-de-Gaulle est le premier aéroport de France et la principale porte d’entrée internationale de Paris. Situé à environ 25 kilomètres au nord-est de la capitale, il compte trois terminaux, dont le Terminal 2, divisé en sept halls de 2A à 2G. Bien préparer son trajet entre l’aéroport et Paris permet d’éviter le stress des correspondances et des heures de pointe sur l’autoroute A1.',
      'Cette rubrique rassemble des guides pratiques pour vos transferts en voiture avec chauffeur vers et depuis CDG : temps de trajet selon l’heure et le jour, repères pour s’orienter entre les terminaux, conseils pour fixer l’heure de départ avant un vol ou pour retrouver son chauffeur à l’arrivée. Chaque article donne des repères concrets, sans jargon, pour que vous sachiez à quoi vous attendre avant même de quitter votre hôtel ou votre domicile.',
      'Pour connaître le prix d’un transfert, reportez-vous au tableau des tarifs du site et à notre page consacrée au VTC aéroport CDG : les tarifs y sont indicatifs et confirmés avant la course. Vous pouvez aussi envoyer une demande de réservation en ligne ; votre course est ensuite confirmée par téléphone ou WhatsApp.',
    ],
  },
  {
    slug: 'transferts-orly',
    lang: 'fr',
    name: 'Transferts aéroport d’Orly',
    short: 'Aéroport d’Orly',
    title: 'Transferts aéroport d’Orly : nos guides',
    description: 'Guides pratiques pour vos transferts entre Paris et l’aéroport d’Orly : terminaux Orly 1 à 4, temps de trajet, vols matinaux et arrivées tardives.',
    services: ['vtc-aeroport-orly', 'vtc-gares-paris', 'van-7-places-paris'],
    intro: [
      'L’aéroport de Paris-Orly est le plus proche de la capitale : il se trouve à environ 14 kilomètres au sud de Paris, entre le Val-de-Marne et l’Essonne. Ses quatre terminaux, numérotés de Orly 1 à Orly 4, sont reliés entre eux à pied. Il accueille surtout des vols vers la France, l’Europe, le Maghreb et l’outre-mer, et il est soumis à un couvre-feu : aucun avion n’y décolle ni n’y atterrit entre 23 h 30 et 6 h.',
      'Dans cette rubrique, vous trouverez des guides pour organiser vos transferts entre Paris, l’Île-de-France et Orly : durée du trajet selon l’heure, itinéraires par l’autoroute A6 ou la route nationale 7, repères pour trouver votre terminal, conseils pour les premiers vols du matin et pour les arrivées en fin de soirée. L’objectif est simple : vous aider à partir à la bonne heure et à rejoindre votre chauffeur sans difficulté.',
      'Les tarifs d’un transfert entre Paris et Orly figurent dans le tableau du site et sur notre page VTC aéroport d’Orly : ils sont indicatifs et confirmés avant la course.',
    ],
  },
  {
    slug: 'transferts-beauvais',
    lang: 'fr',
    name: 'Transferts aéroport de Beauvais',
    short: 'Aéroport de Beauvais',
    title: 'Transferts aéroport de Beauvais : guides',
    description: 'Guides pour rejoindre l’aéroport de Paris-Beauvais depuis Paris en VTC : distance, temps de trajet, vols très matinaux et retours tardifs.',
    services: ['vtc-aeroport-beauvais', 'van-7-places-paris', 'vtc-gares-paris'],
    intro: [
      'L’aéroport de Paris-Beauvais, situé à Tillé dans l’Oise, se trouve à environ 85 kilomètres au nord de Paris. Il est surtout utilisé par des compagnies à bas coûts, avec de nombreux vols tôt le matin ou tard le soir, à des heures où les transports en commun sont rares. Ses deux terminaux sont à quelques minutes à pied l’un de l’autre.',
      'Parce que le trajet dure plus d’une heure, il mérite d’être préparé. Cette rubrique réunit nos guides pour rejoindre Beauvais depuis Paris ou en revenir : temps de trajet selon l’heure, itinéraire principal par l’autoroute A16, conseils pour fixer l’heure de départ quand les compagnies ferment l’enregistrement tôt, choix du véhicule quand on voyage en famille ou en groupe avec des bagages.',
      'Les tarifs d’un transfert entre Paris et Beauvais sont indiqués dans le tableau du site et sur notre page VTC aéroport de Beauvais. Ce sont des tarifs indicatifs, confirmés avant la course ; un trajet au départ d’une autre commune ou d’un autre aéroport est établi sur devis.',
    ],
  },
  {
    slug: 'gares-parisiennes',
    lang: 'fr',
    name: 'Gares parisiennes',
    short: 'Gares parisiennes',
    title: 'Gares parisiennes : guides et conseils',
    description: 'Gare du Nord, gare de Lyon, Montparnasse, Saint-Lazare… Nos guides pour arriver ou partir en train à Paris et rejoindre votre adresse en VTC.',
    services: ['vtc-gares-paris', 'vtc-aeroport-cdg', 'vtc-aeroport-orly'],
    intro: [
      'Paris compte sept grandes gares, chacune tournée vers une partie de la France ou de l’Europe : la gare du Nord pour Londres, Bruxelles et le nord, la gare de l’Est pour l’est et l’Allemagne, la gare de Lyon pour le sud-est, la Suisse et l’Italie, Montparnasse pour l’ouest et le sud-ouest, Saint-Lazare pour la Normandie, Austerlitz et Bercy pour le centre de la France et les trains de nuit.',
      'Arriver dans une grande gare avec des bagages, trouver la bonne sortie ou enchaîner un train et un avion demande un peu d’organisation. Cette rubrique propose des guides pratiques pour chaque situation : se repérer dans les gares les plus fréquentées, prévoir le temps d’une correspondance entre deux gares, rejoindre Roissy-Charles-de-Gaulle ou Orly après un trajet en TGV, ou retrouver son chauffeur à la descente du train.',
      'Les tarifs d’un trajet entre une gare parisienne et une adresse dans Paris, ou entre une gare et un aéroport, figurent dans le tableau du site : ils sont indicatifs et confirmés avant la course.',
    ],
  },
  {
    slug: 'disneyland-paris',
    lang: 'fr',
    name: 'Disneyland Paris et parcs',
    short: 'Disneyland Paris',
    title: 'Disneyland Paris en VTC : nos guides',
    description: 'Guides pour rejoindre Disneyland Paris et les parcs de loisirs d’Île-de-France en famille : temps de trajet, hôtels, bagages et choix du véhicule.',
    services: ['vtc-disneyland-paris', 'van-7-places-paris', 'vtc-aeroport-cdg'],
    intro: [
      'Disneyland Paris se trouve à Marne-la-Vallée, en Seine-et-Marne, à environ 32 kilomètres à l’est de Paris. Le domaine réunit deux parcs à thème, le Disney Village et plusieurs hôtels, à côté de la gare de Marne-la-Vallée–Chessy. D’autres parcs de loisirs attirent aussi les familles autour de Paris, comme le Parc Astérix, situé dans l’Oise au nord de l’aéroport Roissy-Charles-de-Gaulle.',
      'Voyager avec des enfants, une poussette et plusieurs valises change la manière de préparer le trajet. Cette rubrique rassemble nos conseils pour rejoindre les parcs depuis Paris ou directement depuis l’aéroport : temps de trajet selon l’heure, organisation d’un aller-retour dans la journée, choix d’un véhicule assez grand pour toute la famille et ses bagages, repères pour la dépose devant les hôtels.',
      'Les trajets vers Disneyland Paris ne figurent pas dans le tableau des tarifs : leur prix est établi sur devis et confirmé avant la course. CDG TRANSFERT VTC est un service de transport indépendant, sans lien avec Disneyland Paris ni avec les autres parcs cités.',
    ],
  },
  {
    slug: 'tourisme-paris',
    lang: 'fr',
    name: 'Visiter Paris avec chauffeur',
    short: 'Tourisme à Paris',
    title: 'Visiter Paris avec chauffeur : guides',
    description: 'Idées et conseils pour visiter Paris et ses environs avec un chauffeur privé : monuments, quartiers, château de Versailles et journées sur mesure.',
    services: ['mise-a-disposition-chauffeur', 'van-7-places-paris', 'vtc-aeroport-cdg'],
    intro: [
      'Paris se visite à pied, mais les distances entre les grands sites sont parfois longues : de la tour Eiffel à Montmartre, du Louvre au château de Versailles, il faut souvent traverser la ville ou en sortir. Avec un chauffeur et un véhicule à disposition, vous enchaînez les visites à votre rythme, sans chercher de station de métro ni de place pour vous garer, et vous gardez vos achats dans la voiture.',
      'Cette rubrique propose des idées d’itinéraires et des conseils pratiques pour organiser une journée de visite : quels quartiers regrouper, combien de temps prévoir entre deux sites selon la circulation, comment combiner Paris et Versailles, que faire avec des enfants ou des personnes qui marchent peu. Les durées indiquées sont des repères, à adapter selon le jour et la saison.',
      'Pour une journée ou une demi-journée avec chauffeur, consultez notre page consacrée à la mise à disposition : le prix est établi sur devis selon la durée, les horaires et le véhicule, et il vous est confirmé avant la prestation.',
    ],
  },
  {
    slug: 'voyages-affaires',
    lang: 'fr',
    name: 'Déplacements professionnels et salons',
    short: 'Voyages d’affaires',
    title: 'Voyages d’affaires et salons à Paris',
    description: 'Conseils pour vos déplacements professionnels à Paris : salons, La Défense, rendez-vous successifs, accueil de clients à l’aéroport avec chauffeur.',
    services: ['mise-a-disposition-chauffeur', 'vtc-aeroport-cdg', 'vtc-aeroport-orly'],
    intro: [
      'Paris accueille chaque année de nombreux salons et congrès, au parc des expositions de la porte de Versailles, à Paris Nord Villepinte près de Roissy ou au Palais des Congrès. Le quartier d’affaires de La Défense, les sièges sociaux du centre de Paris et les aéroports forment un réseau de trajets que les voyageurs professionnels parcourent souvent dans la même journée.',
      'Cette rubrique s’adresse aux personnes qui se déplacent pour leur travail et à celles qui organisent les déplacements d’une équipe ou de clients. Vous y trouverez des repères de temps de trajet entre les principaux lieux d’affaires, des conseils pour enchaîner plusieurs rendez-vous, pour accueillir un client à sa descente d’avion ou pour organiser les transferts d’une délégation pendant un salon.',
      'Pour une journée de rendez-vous, la mise à disposition d’un chauffeur permet de garder le même véhicule du matin au soir ; son prix est établi sur devis. Les transferts entre Paris et les aéroports CDG et Orly figurent dans le tableau des tarifs du site, avec des tarifs indicatifs confirmés avant la course.',
    ],
  },
  {
    slug: 'evenements',
    lang: 'fr',
    name: 'Mariages, soirées et événements',
    short: 'Événements',
    title: 'Mariages, soirées et événements en VTC',
    description: 'Conseils pour organiser les déplacements d’un mariage, d’une soirée ou d’un événement à Paris : invités, horaires, van pour les groupes, retours.',
    services: ['mise-a-disposition-chauffeur', 'van-7-places-paris', 'vtc-gares-paris'],
    intro: [
      'Un mariage, un anniversaire, un dîner d’entreprise ou une soirée de gala posent toujours la même question : comment faire venir les invités à l’heure et les ramener en toute sécurité ? Entre les lieux de réception parfois éloignés des transports en commun, les invités qui arrivent par le train ou l’avion et les retours tard dans la nuit, les déplacements méritent d’être prévus à l’avance.',
      'Cette rubrique réunit des conseils pour organiser les trajets d’un événement à Paris et en Île-de-France : établir un planning des arrivées et des départs, regrouper les invités dans un van, prévoir les allers-retours entre la cérémonie et la réception, accueillir des proches à la gare ou à l’aéroport. Ce sont des repères pratiques, à adapter à la taille de votre événement et à ses horaires.',
      'Pour garder un chauffeur pendant plusieurs heures, consultez notre page de mise à disposition ; pour un groupe jusqu’à 6 passagers, notre page sur le van Mercedes Classe V. Les prestations hors du tableau des tarifs sont établies sur devis et confirmées avant la course.',
    ],
  },
  {
    slug: 'conseils-voyageurs',
    lang: 'fr',
    name: 'Conseils pratiques voyageurs',
    short: 'Conseils voyageurs',
    title: 'Conseils pratiques pour voyageurs',
    description: 'Conseils pratiques pour voyager vers ou depuis Paris : bagages, horaires, choix du véhicule, réservation d’un chauffeur et repères dans les aéroports.',
    services: ['vtc-aeroport-cdg', 'vtc-aeroport-orly', 'vtc-aeroport-beauvais'],
    intro: [
      'Un voyage réussi commence souvent par un trajet sans mauvaise surprise jusqu’à l’aéroport ou la gare. Combien de bagages tiennent dans une berline ? À quelle heure partir pour un vol international ? Que prévoir pour un trajet avec un bébé, une personne âgée ou un groupe ? Comment se passe une réservation de VTC et que faut-il indiquer au chauffeur ?',
      'Cette rubrique répond à ces questions avec des conseils pratiques et généraux, utiles quel que soit votre point de départ. Vous y trouverez des repères pour préparer vos bagages et vos documents de voyage, estimer le temps nécessaire avant un départ, choisir la catégorie de véhicule adaptée au nombre de passagers et comprendre les étapes d’une réservation avec CDG TRANSFERT VTC, de la demande en ligne à la confirmation par téléphone ou WhatsApp.',
      'Les règles propres à chaque compagnie aérienne ou ferroviaire (franchise de bagages, heure limite d’enregistrement, documents exigés) peuvent changer : vérifiez-les toujours auprès de votre transporteur. Nos tarifs sont indiqués dans le tableau du site, à titre indicatif, et confirmés avant la course.',
    ],
  },
  {
    slug: 'english-guides',
    lang: 'en',
    name: 'Paris airport guides in English',
    short: 'English guides',
    title: 'Paris airport guides in English',
    description: 'Practical guides in English for travellers arriving in Paris: CDG, Orly and Beauvais airports, travel times into the city and private chauffeurs.',
    services: ['vtc-aeroport-cdg', 'vtc-aeroport-orly', 'vtc-aeroport-beauvais'],
    intro: [
      'Paris is served by three airports used by international travellers. Charles de Gaulle (CDG), in Roissy, is about 25 kilometres north-east of the city and handles most long-haul flights. Orly (ORY), about 14 kilometres to the south, mainly serves France, Europe, North Africa and the French overseas territories. Beauvais (BVA), around 85 kilometres to the north, is used mostly by low-cost airlines.',
      'This section gathers our guides in English for visitors who do not read French. You will find practical information on getting from each airport into Paris, typical travel times by time of day, where to meet a private chauffeur, how the booking and confirmation process works, and tips for travelling with family, luggage or a tight connection between a flight and a train.',
      'Fares for transfers between Paris and the airports are listed in the price table on our website. They are indicative and confirmed before the ride. Trips that are not in the table, such as Disneyland Paris or a town outside Paris, are priced on quote. Booking requests can be sent online, by phone or on WhatsApp.',
    ],
  },
]

export const CATEGORY = Object.fromEntries(CATEGORIES.map(c => [c.slug, c]))
