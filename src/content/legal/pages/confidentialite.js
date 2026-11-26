// ── Politique de confidentialité (RGPD, loi Informatique et Libertés,
// lignes directrices CNIL) — 4 langues, le français fait foi.
// Données réellement collectées : formulaire (src/components/BookingModule),
// stockage local anti-spam (src/utils/bookingGuard.js), API Adresse
// (src/components/BookingModule/AddressAutocomplete.jsx), EmailJS, Vercel.
// Inventaire des traceurs : aucun cookie, aucune mesure d'audience, aucun
// script tiers (vérifié dans un navigateur sur le site en production).
// Liens : [texte](url). Aucun détail non vérifié sur les prestataires :
// renvoi à leurs politiques officielles.
// ────────────────────────────────────────────────────────────────────
import { BUSINESS, LEGAL_ENTITY as E } from '../../../constants/business.js'
import { RATE } from '../../../utils/bookingGuard.js'
import { pagePath } from '../../../routes.js'

const KEY = RATE.key
const URLS = {
  emailjs: 'https://www.emailjs.com/legal/privacy-policy/',
  vercel: 'https://vercel.com/legal/privacy-policy',
  vercelDpa: 'https://vercel.com/legal/dpa',
  google: 'https://policies.google.com/privacy',
  dpf: 'https://www.dataprivacyframework.gov/list',
  ban: 'https://adresse.data.gouv.fr',
  cnil: 'https://www.cnil.fr',
  cnilPlainte: 'https://www.cnil.fr/fr/plaintes',
}

export default {
  i18n: {
    fr: {
      h1: 'Politique de confidentialité',
      intro: [
        `Cette politique explique quelles données personnelles ${BUSINESS.name} collecte lorsque vous utilisez ce site ou réservez une course, pourquoi, combien de temps elles sont conservées et comment exercer vos droits, conformément au règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés.`,
      ],
      sections: [
        { h2: 'Responsable du traitement', paras: [
          `${BUSINESS.name}, ${E.form.fr}, SIREN ${E.siren}, dont le siège est situé ${E.address}. Contact : ${BUSINESS.email} — ${BUSINESS.phoneDisplay}.`,
          `${BUSINESS.name} n’a pas désigné de délégué à la protection des données ; toute question relative à vos données peut être adressée à ${BUSINESS.email}.`,
        ] },
        { h2: 'Données collectées', paras: [
          'Formulaire de réservation : nous ne demandons que ce qui est nécessaire pour traiter votre demande.',
        ], list: [
          'Obligatoires : nom, numéro de téléphone (pour confirmer la course par téléphone ou WhatsApp), date et heure, adresse de prise en charge, destination, catégorie de véhicule.',
          'Facultatifs : adresse e-mail (pour recevoir un récapitulatif de votre demande) et nombre de sièges auto ou rehausseurs.',
          'Calculée automatiquement : l’estimation du prix, d’après le tableau des tarifs.',
        ], after: [
          'Lors de la confirmation par téléphone ou WhatsApp, puis pendant la course, vous pouvez nous communiquer d’autres informations utiles : numéro de vol ou de train, nombre de passagers et de bagages, âge des enfants pour les sièges, demande particulière. Ne nous transmettez pas d’information sensible inutile ; si vous signalez un besoin lié à une mobilité réduite, cette information n’est utilisée, avec votre accord, que pour organiser votre course.',
          'Si vous nous contactez directement (téléphone, WhatsApp, e-mail), nous conservons le contenu de nos échanges. Une facture est établie pour chaque course : elle comporte votre nom, la prestation et son prix.',
          'Données techniques : comme tout site web, notre hébergeur enregistre des journaux de connexion (adresse IP, date, page demandée, navigateur) nécessaires au fonctionnement et à la sécurité du site. Le site n’utilise aucun outil de mesure d’audience ni de publicité.',
        ] },
        { h2: 'Finalités et bases légales', list: [
          'Traiter votre demande de réservation, vous répondre, confirmer, organiser et réaliser la course : mesures précontractuelles et exécution du contrat (article 6.1.b du RGPD).',
          'Établir les factures et tenir la comptabilité : obligation légale (article 6.1.c).',
          'Protéger le site et le formulaire contre les abus (anti-spam, journaux techniques) : intérêt légitime à assurer la sécurité du service (article 6.1.f).',
          'Répondre à vos demandes d’exercice de droits et à vos réclamations : obligation légale.',
        ], after: [
          'Vos données ne sont jamais vendues ni utilisées pour de la prospection commerciale.',
        ] },
        { h2: 'Destinataires et sous-traitants', paras: [
          'Seules les personnes qui traitent votre course ont accès à vos données :',
        ], list: [
          `${BUSINESS.name} et, lorsque la course est confiée à un chauffeur partenaire, ce chauffeur, pour les seules informations nécessaires à la course (nom, téléphone, adresses, horaires, vol ou train).`,
          `EmailJS, prestataire d’envoi d’e-mails (service emailjs.com), qui achemine les demandes envoyées depuis le formulaire et le récapitulatif adressé au client ; voir sa politique : [emailjs.com/legal/privacy-policy](${URLS.emailjs}).`,
          `Google (messagerie Gmail de l’adresse ${BUSINESS.email}), qui reçoit ces e-mails. Politique : [policies.google.com/privacy](${URLS.google}).`,
          `${E.host.name} (hébergement du site, journaux techniques). Politique : [vercel.com/legal/privacy-policy](${URLS.vercel}) ; accord de traitement : [vercel.com/legal/dpa](${URLS.vercelDpa}).`,
          `API Adresse de la Base Adresse Nationale, service public de l’État français ([adresse.data.gouv.fr](${URLS.ban})) : pendant la saisie d’une adresse dans le formulaire, le texte saisi lui est envoyé pour proposer des suggestions. Aucune autre donnée du formulaire n’est transmise.`,
          'Les autorités administratives ou judiciaires, uniquement sur demande légale.',
        ], after: [
          'Aucun paiement en ligne n’est proposé sur le site. Si un paiement en ligne est mis en place (par exemple avec Stripe), cette politique sera mise à jour avant sa mise en service.',
        ] },
        { h2: 'Transferts hors de l’Union européenne', paras: [
          `Certains prestataires (notamment ${E.host.name}, Google et EmailJS) peuvent traiter des données hors de l’Union européenne, en particulier aux États-Unis. Un tel transfert doit reposer sur l’une des garanties prévues par le RGPD : une décision d’adéquation de la Commission européenne, comme celle du 10 juillet 2023 relative au cadre de protection des données UE–États-Unis (Data Privacy Framework) pour les entreprises certifiées, ou les clauses contractuelles types adoptées par la Commission européenne.`,
          `Les garanties retenues par chaque prestataire sont décrites dans sa politique de confidentialité (liens ci-dessus) ; la liste des entreprises certifiées est publiée sur [dataprivacyframework.gov](${URLS.dpf}).`,
        ] },
        { h2: 'Durées de conservation', list: [
          'Demande de réservation non suivie d’une course : 1 an à compter de la demande.',
          'Données des courses réalisées (identité, coordonnées, trajets) : 3 ans à compter de la dernière prestation.',
          'Factures et pièces comptables : 10 ans (article L123-22 du Code de commerce).',
          'Demandes d’exercice de droits : le temps de leur traitement, puis la durée de prescription applicable.',
          `Journaux techniques de l’hébergeur : durée limitée fixée par ${E.host.name}, selon sa politique de confidentialité.`,
          'Historique des e-mails chez EmailJS : selon les paramètres du compte et la politique d’EmailJS.',
          `Stockage local anti-spam du navigateur : 10 minutes (les dates d’envoi plus anciennes sont effacées à l’utilisation suivante).`,
        ], after: [
          'À l’issue de ces durées, les données sont supprimées ou anonymisées.',
        ] },
        { h2: 'Vos droits', paras: [
          'Vous disposez d’un droit d’accès, de rectification, d’effacement, d’opposition, de limitation du traitement et de portabilité de vos données, ainsi que du droit de définir des directives sur leur sort après votre décès.',
          `Pour les exercer, écrivez à ${BUSINESS.email} ou par courrier au siège (${E.address}). Nous vous répondons dans un délai d’un mois, qui peut être prolongé de deux mois pour une demande complexe ; dans ce cas, vous en êtes informé. Une pièce d’identité ne peut vous être demandée qu’en cas de doute raisonnable sur votre identité.`,
          `Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la Commission nationale de l’informatique et des libertés (CNIL) : [cnil.fr](${URLS.cnilPlainte}).`,
        ] },
        { h2: 'Cookies et traceurs', paras: [
          'Le site ne dépose aucun cookie et n’utilise aucun traceur soumis à votre consentement : pas de mesure d’audience, pas de publicité, pas de réseau social intégré, pas de carte intégrée, aucun script tiers. Les polices de caractères sont hébergées sur le site lui-même. C’est pourquoi aucun bandeau de consentement n’est affiché.',
          `Seul élément enregistré dans votre navigateur : lorsque vous envoyez une demande de réservation, la date et l’heure de cet envoi (sans aucune autre donnée) sont conservées dans le stockage local (« localStorage », clé « ${KEY} ») afin de limiter le formulaire à 3 demandes en 10 minutes et de le protéger contre les envois automatisés. Ce stockage, strictement nécessaire à la sécurité du service que vous demandez, est exempté de consentement (article 82 de la loi Informatique et Libertés). Il ne quitte jamais votre appareil et vous pouvez l’effacer à tout moment depuis les réglages de votre navigateur.`,
          'Les liens vers WhatsApp, Google ou d’autres sites ouvrent des services tiers, soumis à leurs propres politiques.',
        ] },
        { h2: 'Sécurité', paras: [
          'Le site est servi exclusivement en HTTPS, avec des en-têtes de sécurité stricts, et ne collecte que les données nécessaires. Les données transmises par le formulaire sont réduites à du texte simple avant leur envoi. L’accès aux demandes est réservé aux personnes qui traitent votre course.',
        ] },
        { h2: 'Décision automatisée', paras: [
          'Aucune décision produisant des effets juridiques à votre égard n’est prise sur le seul fondement d’un traitement automatisé, et aucun profilage n’est réalisé. L’estimation affichée par le formulaire est un simple calcul d’après le tableau des tarifs ; le prix vous est confirmé par une personne avant la course.',
        ] },
        { h2: 'Mise à jour de cette politique', paras: [
          `Cette politique peut évoluer, notamment en cas de nouveau service ou de changement de prestataire. La date de dernière mise à jour figure en haut de la page. Voir aussi les [mentions légales](${pagePath('fr', 'mentions-legales')}) et les [conditions générales de vente](${pagePath('fr', 'cgv')}).`,
        ] },
      ],
    },
    en: {
      h1: 'Privacy policy',
      intro: [
        `This policy explains which personal data ${BUSINESS.name} collects when you use this website or book a ride, why, how long it is kept and how to exercise your rights, in accordance with the General Data Protection Regulation (GDPR) and the French Data Protection Act.`,
      ],
      sections: [
        { h2: 'Data controller', paras: [
          `${BUSINESS.name}, ${E.form.en}, SIREN ${E.siren}, registered office ${E.address}. Contact: ${BUSINESS.email} — ${BUSINESS.phoneDisplay}.`,
          `${BUSINESS.name} has not appointed a data protection officer; any question about your data can be sent to ${BUSINESS.email}.`,
        ] },
        { h2: 'Data collected', paras: [
          'Booking form: we only ask for what is needed to process your request.',
        ], list: [
          'Required: name, phone number (to confirm the ride by phone or WhatsApp), date and time, pick-up address, destination, vehicle category.',
          'Optional: e-mail address (to receive a summary of your request) and number of child seats or boosters.',
          'Calculated automatically: the price estimate, based on the price list.',
        ], after: [
          'When the ride is confirmed by phone or WhatsApp, and during the ride, you may give us other useful information: flight or train number, number of passengers and bags, children’s ages for the seats, special requests. Do not send us unnecessary sensitive information; if you mention a reduced-mobility need, it is only used, with your agreement, to organise your ride.',
          'If you contact us directly (phone, WhatsApp, e-mail), we keep the content of our exchanges. An invoice is issued for every ride: it shows your name, the service and its price.',
          'Technical data: like any website, our host records connection logs (IP address, date, page requested, browser) needed for the website to work securely. The website uses no audience measurement or advertising tool.',
        ] },
        { h2: 'Purposes and legal bases', list: [
          'Processing your booking request, replying, confirming, organising and performing the ride: pre-contractual measures and performance of the contract (article 6.1.b GDPR).',
          'Issuing invoices and keeping accounts: legal obligation (article 6.1.c).',
          'Protecting the website and the form against abuse (anti-spam, technical logs): legitimate interest in securing the service (article 6.1.f).',
          'Answering requests to exercise your rights and complaints: legal obligation.',
        ], after: [
          'Your data is never sold or used for marketing.',
        ] },
        { h2: 'Recipients and processors', paras: [
          'Only the people handling your ride have access to your data:',
        ], list: [
          `${BUSINESS.name} and, when the ride is assigned to a partner chauffeur, that chauffeur, for the information needed for the ride only (name, phone, addresses, times, flight or train).`,
          `EmailJS, an e-mail delivery provider (emailjs.com), which delivers the requests sent from the form and the summary sent to the customer; see its policy: [emailjs.com/legal/privacy-policy](${URLS.emailjs}).`,
          `Google (Gmail mailbox ${BUSINESS.email}), which receives these e-mails. Policy: [policies.google.com/privacy](${URLS.google}).`,
          `${E.host.name} (website hosting, technical logs). Policy: [vercel.com/legal/privacy-policy](${URLS.vercel}); data processing agreement: [vercel.com/legal/dpa](${URLS.vercelDpa}).`,
          `API Adresse of the French National Address Database, a French government service ([adresse.data.gouv.fr](${URLS.ban})): while you type an address in the form, the text typed is sent to it to suggest addresses. No other form data is sent.`,
          'Administrative or judicial authorities, only upon a legal request.',
        ], after: [
          'No online payment is offered on the website. If online payment is introduced (for example with Stripe), this policy will be updated before it goes live.',
        ] },
        { h2: 'Transfers outside the European Union', paras: [
          `Some providers (in particular ${E.host.name}, Google and EmailJS) may process data outside the European Union, notably in the United States. Such a transfer must rely on one of the safeguards provided by the GDPR: an adequacy decision of the European Commission, such as the decision of 10 July 2023 on the EU–U.S. Data Privacy Framework for certified companies, or the standard contractual clauses adopted by the European Commission.`,
          `The safeguards used by each provider are described in its privacy policy (links above); the list of certified companies is published on [dataprivacyframework.gov](${URLS.dpf}).`,
        ] },
        { h2: 'Retention periods', list: [
          'Booking request not followed by a ride: 1 year from the request.',
          'Data of completed rides (identity, contact details, trips): 3 years from the last service.',
          'Invoices and accounting records: 10 years (article L123-22 of the French Commercial Code).',
          'Requests to exercise your rights: the time needed to handle them, then the applicable limitation period.',
          `Host technical logs: limited period set by ${E.host.name}, according to its privacy policy.`,
          'E-mail history at EmailJS: according to the account settings and EmailJS’s policy.',
          'Anti-spam local storage in your browser: 10 minutes (older send times are deleted at the next use).',
        ], after: [
          'At the end of these periods, the data is deleted or anonymised.',
        ] },
        { h2: 'Your rights', paras: [
          'You have the right to access, rectify and erase your data, to object to and restrict its processing, to data portability, and to set instructions on what happens to your data after your death.',
          `To exercise them, write to ${BUSINESS.email} or by post to the registered office (${E.address}). We reply within one month, which may be extended by two months for a complex request, in which case you will be informed. Proof of identity may only be requested if there is reasonable doubt about your identity.`,
          `If, after contacting us, you consider that your rights are not respected, you can lodge a complaint with the French data protection authority (CNIL): [cnil.fr](${URLS.cnilPlainte}).`,
        ] },
        { h2: 'Cookies and trackers', paras: [
          'The website sets no cookie and uses no tracker requiring your consent: no audience measurement, no advertising, no embedded social network or map, no third-party script. Fonts are hosted on the website itself. This is why no consent banner is displayed.',
          `The only item stored in your browser: when you send a booking request, the date and time of that request (and nothing else) are kept in local storage (“localStorage”, key “${KEY}”) to limit the form to 3 requests in 10 minutes and protect it against automated submissions. This storage is strictly necessary for the security of the service you request and is therefore exempt from consent (article 82 of the French Data Protection Act). It never leaves your device and you can clear it at any time in your browser settings.`,
          'Links to WhatsApp, Google or other websites open third-party services, subject to their own policies.',
        ] },
        { h2: 'Security', paras: [
          'The website is served over HTTPS only, with strict security headers, and collects only the data needed. Data sent through the form is reduced to plain text before sending. Access to requests is restricted to the people handling your ride.',
        ] },
        { h2: 'Automated decision-making', paras: [
          'No decision producing legal effects concerning you is based solely on automated processing, and no profiling takes place. The estimate shown by the form is a simple calculation based on the price list; the price is confirmed by a person before the ride.',
        ] },
        { h2: 'Updates to this policy', paras: [
          `This policy may change, in particular if a new service or provider is introduced. The date of the last update is shown at the top of the page. See also the [legal notice](${pagePath('en', 'mentions-legales')}) and the [terms and conditions](${pagePath('en', 'cgv')}).`,
        ] },
      ],
    },
    ru: {
      h1: 'Политика конфиденциальности',
      intro: [
        `В этой политике объясняется, какие персональные данные собирает ${BUSINESS.name}, когда вы пользуетесь сайтом или бронируете поездку, зачем, как долго они хранятся и как осуществить свои права в соответствии с Общим регламентом ЕС по защите данных (GDPR) и французским законом «Об информатике и свободах».`,
      ],
      sections: [
        { h2: 'Оператор данных', paras: [
          `${BUSINESS.name}, ${E.form.ru}, SIREN ${E.siren}, юридический адрес: ${E.address}. Контакты: ${BUSINESS.email} — ${BUSINESS.phoneDisplay}.`,
          `${BUSINESS.name} не назначала инспектора по защите данных; любые вопросы о ваших данных можно направить на ${BUSINESS.email}.`,
        ] },
        { h2: 'Какие данные собираются', paras: [
          'Форма бронирования: мы запрашиваем только то, что нужно для обработки заявки.',
        ], list: [
          'Обязательно: имя, номер телефона (для подтверждения поездки по телефону или в WhatsApp), дата и время, адрес посадки, пункт назначения, категория автомобиля.',
          'По желанию: адрес электронной почты (чтобы получить сводку заявки) и количество детских кресел или бустеров.',
          'Рассчитывается автоматически: ориентировочная цена по таблице тарифов.',
        ], after: [
          'При подтверждении по телефону или в WhatsApp и во время поездки вы можете сообщить другие полезные сведения: номер рейса или поезда, число пассажиров и багажа, возраст детей для кресел, особые пожелания. Не сообщайте лишних чувствительных данных; если вы указываете потребность, связанную с ограниченной подвижностью, она используется с вашего согласия только для организации поездки.',
          'Если вы связываетесь с нами напрямую (телефон, WhatsApp, e-mail), мы храним содержание переписки. На каждую поездку выставляется счёт с вашим именем, услугой и ценой.',
          'Технические данные: как и любой сайт, наш хостинг ведёт журналы подключений (IP-адрес, дата, страница, браузер), необходимые для работы и безопасности сайта. Сайт не использует инструменты веб-аналитики и рекламы.',
        ] },
        { h2: 'Цели и правовые основания', list: [
          'Обработка заявки, ответ, подтверждение, организация и выполнение поездки: преддоговорные меры и исполнение договора (ст. 6.1.b GDPR).',
          'Выставление счетов и бухгалтерский учёт: юридическая обязанность (ст. 6.1.c).',
          'Защита сайта и формы от злоупотреблений (антиспам, технические журналы): законный интерес в безопасности услуги (ст. 6.1.f).',
          'Ответы на запросы об осуществлении прав и на жалобы: юридическая обязанность.',
        ], after: [
          'Ваши данные никогда не продаются и не используются для рекламных рассылок.',
        ] },
        { h2: 'Получатели и обработчики', paras: [
          'Доступ к вашим данным есть только у тех, кто занимается вашей поездкой:',
        ], list: [
          `${BUSINESS.name} и, если поездка поручена водителю-партнёру, этот водитель — только в объёме, необходимом для поездки (имя, телефон, адреса, время, рейс или поезд).`,
          `EmailJS — сервис отправки электронной почты (emailjs.com), доставляющий заявки из формы и сводку клиенту; см. его политику: [emailjs.com/legal/privacy-policy](${URLS.emailjs}).`,
          `Google (почтовый ящик Gmail ${BUSINESS.email}), который получает эти письма. Политика: [policies.google.com/privacy](${URLS.google}).`,
          `${E.host.name} (хостинг сайта, технические журналы). Политика: [vercel.com/legal/privacy-policy](${URLS.vercel}); соглашение об обработке данных: [vercel.com/legal/dpa](${URLS.vercelDpa}).`,
          `API Adresse Национальной базы адресов, государственный сервис Франции ([adresse.data.gouv.fr](${URLS.ban})): при вводе адреса в форму введённый текст отправляется ему для подсказок. Другие данные формы не передаются.`,
          'Административные или судебные органы — только по законному запросу.',
        ], after: [
          'Онлайн-оплата на сайте не предусмотрена. Если она появится (например, через Stripe), политика будет обновлена до её запуска.',
        ] },
        { h2: 'Передача данных за пределы ЕС', paras: [
          `Некоторые поставщики (в частности, ${E.host.name}, Google и EmailJS) могут обрабатывать данные за пределами Европейского союза, в частности в США. Такая передача должна основываться на одной из гарантий, предусмотренных GDPR: решении Европейской комиссии об адекватности, например решении от 10 июля 2023 года о Рамочной программе защиты данных ЕС–США (Data Privacy Framework) для сертифицированных компаний, или стандартных договорных положениях, утверждённых Европейской комиссией.`,
          `Гарантии, применяемые каждым поставщиком, описаны в его политике конфиденциальности (ссылки выше); список сертифицированных компаний опубликован на [dataprivacyframework.gov](${URLS.dpf}).`,
        ] },
        { h2: 'Сроки хранения', list: [
          'Заявка без последующей поездки: 1 год с даты заявки.',
          'Данные выполненных поездок (личность, контакты, маршруты): 3 года после последней услуги.',
          'Счета и бухгалтерские документы: 10 лет (статья L123-22 Торгового кодекса Франции).',
          'Запросы об осуществлении прав: время их обработки, затем применимый срок исковой давности.',
          `Технические журналы хостинга: ограниченный срок, установленный ${E.host.name} согласно его политике конфиденциальности.`,
          'История писем в EmailJS: согласно настройкам аккаунта и политике EmailJS.',
          'Локальное хранилище браузера для защиты от спама: 10 минут (более старые отметки удаляются при следующем использовании).',
        ], after: [
          'По истечении этих сроков данные удаляются или обезличиваются.',
        ] },
        { h2: 'Ваши права', paras: [
          'Вы имеете право на доступ к своим данным, их исправление и удаление, на возражение против обработки и её ограничение, на переносимость данных, а также на указания о судьбе данных после вашей смерти.',
          `Чтобы воспользоваться ими, напишите на ${BUSINESS.email} или по почте на юридический адрес (${E.address}). Мы отвечаем в течение одного месяца; для сложного запроса срок может быть продлён на два месяца, о чём вы будете уведомлены. Документ, удостоверяющий личность, может быть запрошен только при обоснованных сомнениях.`,
          `Если после обращения к нам вы считаете, что ваши права нарушены, вы можете подать жалобу во французский орган по защите данных (CNIL): [cnil.fr](${URLS.cnilPlainte}).`,
        ] },
        { h2: 'Cookie и трекеры', paras: [
          'Сайт не устанавливает cookie и не использует трекеры, требующие согласия: нет веб-аналитики, рекламы, встроенных соцсетей или карт, сторонних скриптов. Шрифты размещены на самом сайте. Поэтому баннер согласия не показывается.',
          `Единственное, что сохраняется в браузере: при отправке заявки дата и время отправки (без каких-либо других данных) записываются в локальное хранилище («localStorage», ключ «${KEY}»), чтобы ограничить форму тремя заявками за 10 минут и защитить её от автоматических отправок. Это хранилище строго необходимо для безопасности запрошенной вами услуги и не требует согласия (статья 82 французского закона «Об информатике и свободах»). Оно не покидает ваше устройство, и вы можете очистить его в настройках браузера.`,
          'Ссылки на WhatsApp, Google и другие сайты ведут к сторонним сервисам со своими политиками.',
        ] },
        { h2: 'Безопасность', paras: [
          'Сайт работает только по HTTPS со строгими заголовками безопасности и собирает лишь необходимые данные. Данные из формы перед отправкой приводятся к простому тексту. Доступ к заявкам есть только у тех, кто занимается вашей поездкой.',
        ] },
        { h2: 'Автоматизированные решения', paras: [
          'Решения, влекущие для вас юридические последствия, не принимаются исключительно автоматически, профилирование не проводится. Оценка в форме — простой расчёт по таблице тарифов; цену подтверждает человек до поездки.',
        ] },
        { h2: 'Обновление политики', paras: [
          `Политика может меняться, в частности при появлении новой услуги или поставщика. Дата последнего обновления указана вверху страницы. См. также [правовую информацию](${pagePath('ru', 'mentions-legales')}) и [общие условия продажи](${pagePath('ru', 'cgv')}).`,
        ] },
      ],
    },
    ro: {
      h1: 'Politica de confidențialitate',
      intro: [
        `Această politică explică ce date personale colectează ${BUSINESS.name} atunci când folosiți site-ul sau rezervați o cursă, de ce, cât timp sunt păstrate și cum vă puteți exercita drepturile, în conformitate cu Regulamentul general privind protecția datelor (GDPR) și cu legea franceză privind informatica și libertățile.`,
      ],
      sections: [
        { h2: 'Operatorul de date', paras: [
          `${BUSINESS.name}, ${E.form.ro}, SIREN ${E.siren}, cu sediul la ${E.address}. Contact: ${BUSINESS.email} — ${BUSINESS.phoneDisplay}.`,
          `${BUSINESS.name} nu a desemnat un responsabil cu protecția datelor; orice întrebare privind datele dumneavoastră poate fi trimisă la ${BUSINESS.email}.`,
        ] },
        { h2: 'Date colectate', paras: [
          'Formularul de rezervare: cerem doar ceea ce este necesar pentru a procesa cererea.',
        ], list: [
          'Obligatorii: nume, număr de telefon (pentru confirmarea cursei prin telefon sau WhatsApp), data și ora, adresa de preluare, destinația, categoria vehiculului.',
          'Opționale: adresa de e-mail (pentru a primi un rezumat al cererii) și numărul de scaune auto sau înălțătoare.',
          'Calculată automat: estimarea prețului, după tabelul de tarife.',
        ], after: [
          'La confirmarea prin telefon sau WhatsApp și în timpul cursei ne puteți comunica și alte informații utile: numărul zborului sau al trenului, numărul de pasageri și de bagaje, vârsta copiilor pentru scaune, cereri speciale. Nu ne transmiteți informații sensibile inutile; dacă semnalați o nevoie legată de mobilitatea redusă, aceasta este folosită, cu acordul dumneavoastră, doar pentru organizarea cursei.',
          'Dacă ne contactați direct (telefon, WhatsApp, e-mail), păstrăm conținutul schimburilor. Pentru fiecare cursă se emite o factură cu numele dumneavoastră, serviciul și prețul.',
          'Date tehnice: ca orice site, furnizorul de găzduire înregistrează jurnale de conectare (adresă IP, dată, pagină, browser), necesare funcționării și securității site-ului. Site-ul nu folosește instrumente de măsurare a audienței sau de publicitate.',
        ] },
        { h2: 'Scopuri și temeiuri juridice', list: [
          'Procesarea cererii de rezervare, răspunsul, confirmarea, organizarea și efectuarea cursei: demersuri precontractuale și executarea contractului (art. 6.1.b GDPR).',
          'Emiterea facturilor și ținerea contabilității: obligație legală (art. 6.1.c).',
          'Protejarea site-ului și a formularului împotriva abuzurilor (anti-spam, jurnale tehnice): interes legitim pentru securitatea serviciului (art. 6.1.f).',
          'Răspunsul la cererile de exercitare a drepturilor și la reclamații: obligație legală.',
        ], after: [
          'Datele dumneavoastră nu sunt niciodată vândute sau folosite pentru marketing.',
        ] },
        { h2: 'Destinatari și persoane împuternicite', paras: [
          'Doar persoanele care se ocupă de cursa dumneavoastră au acces la date:',
        ], list: [
          `${BUSINESS.name} și, când cursa este încredințată unui șofer partener, acest șofer, doar pentru informațiile necesare cursei (nume, telefon, adrese, ore, zbor sau tren).`,
          `EmailJS, furnizor de trimitere de e-mailuri (serviciul emailjs.com), care transmite cererile trimise din formular și rezumatul trimis clientului; vedeți politica sa: [emailjs.com/legal/privacy-policy](${URLS.emailjs}).`,
          `Google (căsuța Gmail ${BUSINESS.email}), care primește aceste e-mailuri. Politica: [policies.google.com/privacy](${URLS.google}).`,
          `${E.host.name} (găzduirea site-ului, jurnale tehnice). Politica: [vercel.com/legal/privacy-policy](${URLS.vercel}); acordul de prelucrare: [vercel.com/legal/dpa](${URLS.vercelDpa}).`,
          `API Adresse a Bazei Naționale de Adrese, serviciu public al statului francez ([adresse.data.gouv.fr](${URLS.ban})): în timp ce tastați o adresă în formular, textul introdus îi este trimis pentru sugestii. Nicio altă dată din formular nu este transmisă.`,
          'Autoritățile administrative sau judiciare, doar la cerere legală.',
        ], after: [
          'Site-ul nu oferă plată online. Dacă va fi introdusă (de exemplu prin Stripe), această politică va fi actualizată înainte de lansare.',
        ] },
        { h2: 'Transferuri în afara Uniunii Europene', paras: [
          `Unii furnizori (în special ${E.host.name}, Google și EmailJS) pot prelucra date în afara Uniunii Europene, mai ales în Statele Unite. Un astfel de transfer trebuie să se bazeze pe una dintre garanțiile prevăzute de GDPR: o decizie de adecvare a Comisiei Europene, precum cea din 10 iulie 2023 privind Cadrul UE–SUA de protecție a datelor (Data Privacy Framework) pentru companiile certificate, sau clauzele contractuale standard adoptate de Comisia Europeană.`,
          `Garanțiile folosite de fiecare furnizor sunt descrise în politica sa de confidențialitate (linkurile de mai sus); lista companiilor certificate este publicată pe [dataprivacyframework.gov](${URLS.dpf}).`,
        ] },
        { h2: 'Durate de păstrare', list: [
          'Cerere de rezervare neurmată de o cursă: 1 an de la cerere.',
          'Datele curselor efectuate (identitate, date de contact, trasee): 3 ani de la ultima prestație.',
          'Facturi și documente contabile: 10 ani (articolul L123-22 din Codul comercial francez).',
          'Cereri de exercitare a drepturilor: timpul necesar soluționării, apoi termenul de prescripție aplicabil.',
          `Jurnalele tehnice ale furnizorului de găzduire: o durată limitată stabilită de ${E.host.name}, conform politicii sale de confidențialitate.`,
          'Istoricul e-mailurilor la EmailJS: în funcție de setările contului și de politica EmailJS.',
          'Stocarea locală anti-spam din browser: 10 minute (datele de trimitere mai vechi sunt șterse la următoarea utilizare).',
        ], after: [
          'La sfârșitul acestor durate, datele sunt șterse sau anonimizate.',
        ] },
        { h2: 'Drepturile dumneavoastră', paras: [
          'Aveți dreptul de acces, rectificare, ștergere, opoziție, restricționare a prelucrării și portabilitate a datelor, precum și dreptul de a stabili instrucțiuni privind datele după deces.',
          `Pentru a le exercita, scrieți la ${BUSINESS.email} sau prin poștă la sediu (${E.address}). Răspundem în termen de o lună, care poate fi prelungit cu două luni pentru o cerere complexă, caz în care veți fi informat. Un act de identitate poate fi cerut doar dacă există îndoieli rezonabile.`,
          `Dacă, după ce ne-ați contactat, considerați că drepturile nu vă sunt respectate, puteți depune o plângere la autoritatea franceză de protecție a datelor (CNIL): [cnil.fr](${URLS.cnilPlainte}).`,
        ] },
        { h2: 'Cookie-uri și trackere', paras: [
          'Site-ul nu plasează niciun cookie și nu folosește trackere supuse consimțământului: fără măsurarea audienței, fără publicitate, fără rețele sociale sau hărți integrate, fără scripturi terțe. Fonturile sunt găzduite pe site. De aceea nu este afișat niciun banner de consimțământ.',
          `Singurul element salvat în browser: când trimiteți o cerere de rezervare, data și ora trimiterii (fără nicio altă dată) sunt păstrate în stocarea locală („localStorage”, cheia „${KEY}”) pentru a limita formularul la 3 cereri în 10 minute și a-l proteja de trimiterile automate. Această stocare este strict necesară securității serviciului solicitat și este scutită de consimțământ (articolul 82 din legea franceză privind informatica și libertățile). Nu părăsește niciodată dispozitivul și o puteți șterge oricând din setările browserului.`,
          'Linkurile către WhatsApp, Google sau alte site-uri deschid servicii terțe, supuse propriilor politici.',
        ] },
        { h2: 'Securitate', paras: [
          'Site-ul este servit exclusiv prin HTTPS, cu antete de securitate stricte, și colectează doar datele necesare. Datele din formular sunt reduse la text simplu înainte de trimitere. Accesul la cereri este rezervat persoanelor care se ocupă de cursa dumneavoastră.',
        ] },
        { h2: 'Decizii automatizate', paras: [
          'Nicio decizie care produce efecte juridice asupra dumneavoastră nu se bazează exclusiv pe o prelucrare automată și nu se face profilare. Estimarea afișată de formular este un simplu calcul după tabelul de tarife; prețul vă este confirmat de o persoană înainte de cursă.',
        ] },
        { h2: 'Actualizarea politicii', paras: [
          `Această politică poate evolua, în special la introducerea unui serviciu sau furnizor nou. Data ultimei actualizări apare în partea de sus a paginii. Consultați și [mențiunile legale](${pagePath('ro', 'mentions-legales')}) și [condițiile generale de vânzare](${pagePath('ro', 'cgv')}).`,
        ] },
      ],
    },
  },
}
