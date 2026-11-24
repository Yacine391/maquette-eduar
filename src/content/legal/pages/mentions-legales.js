// ── Mentions légales (LCEN, art. 6 III) — 4 langues, le français fait foi
// Liens : [texte](url). Marqueurs [À COMPLÉTER : …] = informations à
// fournir par le client (mis en évidence sur la page).
// ────────────────────────────────────────────────────────────────────
import { BUSINESS, LEGAL_ENTITY as E } from '../../../constants/business.js'
import { pagePath } from '../../../routes.js'

const C = (s) => `[À COMPLÉTER : ${s}]`

export default {
  i18n: {
    fr: {
      h1: 'Mentions légales',
      intro: [
        `Conformément à l’article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique (LCEN), voici les informations relatives à l’éditeur et à l’hébergeur du site ${BUSINESS.url.replace(/\/$/, '')}.`,
      ],
      sections: [
        { h2: 'Éditeur du site', list: [
          `Dénomination : ${BUSINESS.name}`,
          `Forme juridique : ${E.form.fr}`,
          `Capital social : ${C('montant du capital social')}`,
          `Siège social : ${E.address}`,
          `SIREN : ${E.siren} — SIRET : ${E.siret}`,
          `Immatriculation au registre du commerce et des sociétés : ${C('RCS (ville du greffe) et numéro')}`,
          `Numéro de TVA intracommunautaire : ${C('numéro de TVA')}`,
          `Téléphone : ${BUSINESS.phoneDisplay}`,
          `E-mail : ${BUSINESS.email}`,
        ] },
        { h2: 'Directeur de la publication', paras: [
          `${C('nom et prénom du président de la SAS')}, en qualité de président de ${BUSINESS.name}.`,
        ] },
        { h2: 'Activité réglementée : transport de personnes en VTC', paras: [
          `${BUSINESS.name} exerce une activité d’exploitant de voitures de transport avec chauffeur (VTC), régie par le Code des transports (articles L3120-1 et suivants et L3122-1 et suivants).`,
        ], list: [
          `Numéro d’inscription au registre des exploitants de VTC : ${C('numéro d’inscription au registre EVTC')}`,
          `Carte professionnelle de conducteur VTC : ${C('numéro de la carte professionnelle du conducteur')}`,
          `Chauffeurs partenaires : ${C('préciser le statut des chauffeurs partenaires qui réalisent certaines courses (exploitants VTC inscrits au registre) et la manière dont le client en est informé')}`,
        ] },
        { h2: 'Hébergeur', list: [
          `${E.host.name}`,
          `Adresse : ${E.host.address.replace('USA', 'États-Unis')}`,
          `Téléphone : ${C('numéro de téléphone de l’hébergeur, mention exigée par la LCEN')}`,
          `Site : [vercel.com](${E.host.site})`,
        ] },
        { h2: 'Propriété intellectuelle', paras: [
          `L’ensemble des contenus de ce site (textes, photographies, logo, mise en page) est la propriété de ${BUSINESS.name}, sauf mention contraire. Toute reproduction, représentation ou adaptation, totale ou partielle, sans autorisation écrite préalable est interdite (Code de la propriété intellectuelle).`,
          'Les marques et noms cités (notamment Mercedes-Benz, Tesla, Disneyland Paris et les aéroports parisiens) appartiennent à leurs titulaires respectifs ; ils sont mentionnés uniquement pour décrire les véhicules et les destinations, sans lien de partenariat.',
        ] },
        { h2: 'Crédits', list: [
          `Photographies des véhicules et du blog : ${BUSINESS.name}.`,
          'Polices de caractères : Cormorant Garamond et Montserrat, sous licence SIL Open Font License 1.1, hébergées sur ce site.',
          'Suggestions d’adresses du formulaire : API Adresse de la Base Adresse Nationale ([adresse.data.gouv.fr](https://adresse.data.gouv.fr)).',
        ] },
        { h2: 'Données personnelles et cookies', paras: [
          `Le traitement de vos données et l’utilisation du stockage de votre navigateur sont décrits dans la [politique de confidentialité](${pagePath('fr', 'confidentialite')}). Les conditions de nos prestations figurent dans les [conditions générales de vente](${pagePath('fr', 'cgv')}).`,
        ] },
        { h2: 'Contact', paras: [
          `Pour toute question ou pour signaler un contenu, écrivez à ${BUSINESS.email} ou appelez le ${BUSINESS.phoneDisplay}.`,
        ] },
      ],
    },
    en: {
      h1: 'Legal notice',
      intro: [
        `In accordance with article 6 of the French law no. 2004-575 of 21 June 2004 on confidence in the digital economy (LCEN), here is the information about the publisher and the host of ${BUSINESS.url.replace(/\/$/, '')}.`,
      ],
      sections: [
        { h2: 'Publisher', list: [
          `Company name: ${BUSINESS.name}`,
          `Legal form: ${E.form.en}`,
          `Share capital: ${C('montant du capital social')}`,
          `Registered office: ${E.address}`,
          `SIREN: ${E.siren} — SIRET: ${E.siret}`,
          `Trade and companies register (RCS): ${C('RCS (ville du greffe) et numéro')}`,
          `EU VAT number: ${C('numéro de TVA')}`,
          `Phone: ${BUSINESS.phoneDisplay}`,
          `E-mail: ${BUSINESS.email}`,
        ] },
        { h2: 'Publication director', paras: [
          `${C('nom et prénom du président de la SAS')}, as president of ${BUSINESS.name}.`,
        ] },
        { h2: 'Regulated activity: VTC passenger transport', paras: [
          `${BUSINESS.name} operates private hire vehicles with chauffeur (VTC), an activity governed by the French Transport Code (articles L3120-1 et seq. and L3122-1 et seq.).`,
        ], list: [
          `Registration number in the register of VTC operators: ${C('numéro d’inscription au registre EVTC')}`,
          `VTC driver professional card: ${C('numéro de la carte professionnelle du conducteur')}`,
          `Partner chauffeurs: ${C('préciser le statut des chauffeurs partenaires qui réalisent certaines courses (exploitants VTC inscrits au registre) et la manière dont le client en est informé')}`,
        ] },
        { h2: 'Host', list: [
          `${E.host.name}`,
          `Address: ${E.host.address}`,
          `Phone: ${C('numéro de téléphone de l’hébergeur, mention exigée par la LCEN')}`,
          `Website: [vercel.com](${E.host.site})`,
        ] },
        { h2: 'Intellectual property', paras: [
          `All content on this website (texts, photographs, logo, layout) belongs to ${BUSINESS.name} unless stated otherwise. Any reproduction, representation or adaptation, in whole or in part, without prior written permission is prohibited (French Intellectual Property Code).`,
          'The brands and names mentioned (including Mercedes-Benz, Tesla, Disneyland Paris and the Paris airports) belong to their respective owners; they are only used to describe vehicles and destinations, with no partnership.',
        ] },
        { h2: 'Credits', list: [
          `Photographs of the vehicles and of the blog: ${BUSINESS.name}.`,
          'Typefaces: Cormorant Garamond and Montserrat, under the SIL Open Font License 1.1, hosted on this website.',
          'Address suggestions in the form: API Adresse of the French National Address Database ([adresse.data.gouv.fr](https://adresse.data.gouv.fr)).',
        ] },
        { h2: 'Personal data and cookies', paras: [
          `How your data and your browser storage are used is described in the [privacy policy](${pagePath('en', 'confidentialite')}). The terms of our services are set out in the [terms and conditions](${pagePath('en', 'cgv')}).`,
        ] },
        { h2: 'Contact', paras: [
          `For any question or to report content, write to ${BUSINESS.email} or call ${BUSINESS.phoneDisplay}.`,
        ] },
      ],
    },
    ru: {
      h1: 'Правовая информация',
      intro: [
        `В соответствии со статьёй 6 французского закона № 2004-575 от 21 июня 2004 года о доверии к цифровой экономике (LCEN) ниже приведены сведения об издателе и хостинге сайта ${BUSINESS.url.replace(/\/$/, '')}.`,
      ],
      sections: [
        { h2: 'Издатель сайта', list: [
          `Наименование: ${BUSINESS.name}`,
          `Организационно-правовая форма: ${E.form.ru}`,
          `Уставный капитал: ${C('montant du capital social')}`,
          `Юридический адрес: ${E.address}`,
          `SIREN: ${E.siren} — SIRET: ${E.siret}`,
          `Регистрация в торговом реестре (RCS): ${C('RCS (ville du greffe) et numéro')}`,
          `Номер плательщика НДС в ЕС: ${C('numéro de TVA')}`,
          `Телефон: ${BUSINESS.phoneDisplay}`,
          `E-mail: ${BUSINESS.email}`,
        ] },
        { h2: 'Ответственный за публикацию', paras: [
          `${C('nom et prénom du président de la SAS')}, президент компании ${BUSINESS.name}.`,
        ] },
        { h2: 'Регулируемая деятельность: перевозка пассажиров VTC', paras: [
          `${BUSINESS.name} осуществляет деятельность оператора автомобилей с водителем (VTC), регулируемую Транспортным кодексом Франции (статьи L3120-1 и далее, L3122-1 и далее).`,
        ], list: [
          `Номер в реестре операторов VTC: ${C('numéro d’inscription au registre EVTC')}`,
          `Профессиональная карта водителя VTC: ${C('numéro de la carte professionnelle du conducteur')}`,
          `Водители-партнёры: ${C('préciser le statut des chauffeurs partenaires qui réalisent certaines courses (exploitants VTC inscrits au registre) et la manière dont le client en est informé')}`,
        ] },
        { h2: 'Хостинг', list: [
          `${E.host.name}`,
          `Адрес: ${E.host.address}`,
          `Телефон: ${C('numéro de téléphone de l’hébergeur, mention exigée par la LCEN')}`,
          `Сайт: [vercel.com](${E.host.site})`,
        ] },
        { h2: 'Интеллектуальная собственность', paras: [
          `Все материалы сайта (тексты, фотографии, логотип, оформление) принадлежат ${BUSINESS.name}, если не указано иное. Любое полное или частичное воспроизведение без предварительного письменного разрешения запрещено (Кодекс интеллектуальной собственности Франции).`,
          'Упомянутые марки и названия (в том числе Mercedes-Benz, Tesla, Disneyland Paris и парижские аэропорты) принадлежат их владельцам и используются только для описания автомобилей и направлений, без партнёрских отношений.',
        ] },
        { h2: 'Авторы и источники', list: [
          `Фотографии автомобилей и блога: ${BUSINESS.name}.`,
          'Шрифты: Cormorant Garamond и Montserrat, лицензия SIL Open Font License 1.1, размещены на этом сайте.',
          'Подсказки адресов в форме: API Adresse Национальной базы адресов Франции ([adresse.data.gouv.fr](https://adresse.data.gouv.fr)).',
        ] },
        { h2: 'Персональные данные и cookie', paras: [
          `Использование ваших данных и хранилища браузера описано в [политике конфиденциальности](${pagePath('ru', 'confidentialite')}). Условия наших услуг изложены в [общих условиях продажи](${pagePath('ru', 'cgv')}).`,
        ] },
        { h2: 'Контакты', paras: [
          `По любым вопросам пишите на ${BUSINESS.email} или звоните по номеру ${BUSINESS.phoneDisplay}.`,
        ] },
      ],
    },
    ro: {
      h1: 'Mențiuni legale',
      intro: [
        `În conformitate cu articolul 6 din legea franceză nr. 2004-575 din 21 iunie 2004 privind încrederea în economia digitală (LCEN), iată informațiile despre editorul și furnizorul de găzduire al site-ului ${BUSINESS.url.replace(/\/$/, '')}.`,
      ],
      sections: [
        { h2: 'Editorul site-ului', list: [
          `Denumire: ${BUSINESS.name}`,
          `Formă juridică: ${E.form.ro}`,
          `Capital social: ${C('montant du capital social')}`,
          `Sediul social: ${E.address}`,
          `SIREN: ${E.siren} — SIRET: ${E.siret}`,
          `Înmatriculare în registrul comerțului (RCS): ${C('RCS (ville du greffe) et numéro')}`,
          `Cod de TVA intracomunitar: ${C('numéro de TVA')}`,
          `Telefon: ${BUSINESS.phoneDisplay}`,
          `E-mail: ${BUSINESS.email}`,
        ] },
        { h2: 'Directorul de publicație', paras: [
          `${C('nom et prénom du président de la SAS')}, în calitate de președinte al ${BUSINESS.name}.`,
        ] },
        { h2: 'Activitate reglementată: transport de persoane VTC', paras: [
          `${BUSINESS.name} desfășoară activitatea de operator de vehicule de transport cu șofer (VTC), reglementată de Codul transporturilor din Franța (articolele L3120-1 și următoarele, L3122-1 și următoarele).`,
        ], list: [
          `Număr de înscriere în registrul operatorilor VTC: ${C('numéro d’inscription au registre EVTC')}`,
          `Cardul profesional de șofer VTC: ${C('numéro de la carte professionnelle du conducteur')}`,
          `Șoferi parteneri: ${C('préciser le statut des chauffeurs partenaires qui réalisent certaines courses (exploitants VTC inscrits au registre) et la manière dont le client en est informé')}`,
        ] },
        { h2: 'Găzduire', list: [
          `${E.host.name}`,
          `Adresă: ${E.host.address}`,
          `Telefon: ${C('numéro de téléphone de l’hébergeur, mention exigée par la LCEN')}`,
          `Site: [vercel.com](${E.host.site})`,
        ] },
        { h2: 'Proprietate intelectuală', paras: [
          `Toate conținuturile acestui site (texte, fotografii, logo, aspect grafic) aparțin ${BUSINESS.name}, cu excepția mențiunilor contrare. Orice reproducere, totală sau parțială, fără acord scris prealabil este interzisă (Codul proprietății intelectuale din Franța).`,
          'Mărcile și denumirile citate (în special Mercedes-Benz, Tesla, Disneyland Paris și aeroporturile pariziene) aparțin titularilor lor; sunt menționate doar pentru a descrie vehiculele și destinațiile, fără vreun parteneriat.',
        ] },
        { h2: 'Credite', list: [
          `Fotografiile vehiculelor și ale blogului: ${BUSINESS.name}.`,
          'Fonturi: Cormorant Garamond și Montserrat, sub licența SIL Open Font License 1.1, găzduite pe acest site.',
          'Sugestiile de adrese din formular: API Adresse a Bazei Naționale de Adrese din Franța ([adresse.data.gouv.fr](https://adresse.data.gouv.fr)).',
        ] },
        { h2: 'Date personale și cookie-uri', paras: [
          `Folosirea datelor dumneavoastră și a stocării din browser este descrisă în [politica de confidențialitate](${pagePath('ro', 'confidentialite')}). Condițiile serviciilor noastre sunt prezentate în [condițiile generale de vânzare](${pagePath('ro', 'cgv')}).`,
        ] },
        { h2: 'Contact', paras: [
          `Pentru orice întrebare, scrieți la ${BUSINESS.email} sau sunați la ${BUSINESS.phoneDisplay}.`,
        ] },
      ],
    },
  },
}
