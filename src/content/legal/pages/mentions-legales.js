// ── Mentions légales (LCEN, art. 6 III) — 4 langues, le français fait foi
// Informations fournies par le client (src/constants/business.js →
// LEGAL_ENTITY). Liens : [texte](url).
// ────────────────────────────────────────────────────────────────────
import { BUSINESS, LEGAL_ENTITY as E } from '../../../constants/business.js'
import { pagePath } from '../../../routes.js'

const SITE = BUSINESS.url.replace(/\/$/, '')
const [Y, M, D] = E.evtcValidUntil.split('-')
const until = {
  fr: `${Number(D)} août ${Y}`, en: `${Number(D)} August ${Y}`, ru: `${Number(D)} августа ${Y} г.`, ro: `${Number(D)} august ${Y}`,
}
if (M !== '08') throw new Error('mentions-legales : mettre à jour le mois de validité EVTC')

export default {
  i18n: {
    fr: {
      h1: 'Mentions légales',
      intro: [
        `Conformément à l’article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique (LCEN), voici les informations relatives à l’éditeur et à l’hébergeur du site ${SITE}.`,
      ],
      sections: [
        { h2: 'Éditeur du site', list: [
          `Dénomination : ${E.legalName}`,
          `Forme juridique : ${E.form.fr}, au capital social de ${E.capital}`,
          `Siège social : ${E.address}`,
          `Immatriculation : ${E.rcs} — SIRET : ${E.siret}`,
          `Numéro de TVA intracommunautaire : ${E.vat}`,
          `Téléphone : ${BUSINESS.phoneDisplay}`,
          `E-mail : ${BUSINESS.email}`,
        ] },
        { h2: 'Directeur de la publication', paras: [
          `${E.president}, président et représentant légal de ${E.legalName}.`,
        ] },
        { h2: 'Activité réglementée : transport de personnes en VTC', paras: [
          `${E.legalName} exerce une activité d’exploitant de voitures de transport avec chauffeur (VTC), régie par le Code des transports (articles L3120-1 et suivants et L3122-1 et suivants). Elle est inscrite au registre des exploitants de voitures de transport avec chauffeur (REVTC) sous le numéro ${E.evtc}, valable jusqu’au ${until.fr}.`,
          `La société dispose d’une assurance responsabilité civile professionnelle et d’une protection juridique.`,
        ] },
        { h2: 'Hébergeur', list: [
          `${E.host.name}`,
          `Adresse : ${E.host.address.replace('USA', 'États-Unis')}`,
          `Contact : [formulaire de contact officiel](${E.host.contact})`,
          `Site : [vercel.com](${E.host.site})`,
        ] },
        { h2: 'Propriété intellectuelle', paras: [
          `L’ensemble des contenus de ce site (textes, photographies, logo, mise en page) est la propriété de ${E.legalName}, sauf mention contraire. Toute reproduction, représentation ou adaptation, totale ou partielle, sans autorisation écrite préalable est interdite (Code de la propriété intellectuelle).`,
          'Les marques et noms cités (notamment Mercedes-Benz, Tesla, Disneyland Paris et les aéroports parisiens) appartiennent à leurs titulaires respectifs ; ils sont mentionnés uniquement pour décrire les véhicules et les destinations, sans lien de partenariat.',
        ] },
        { h2: 'Crédits', list: [
          `Photographies des véhicules et du blog : ${E.legalName}.`,
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
        `In accordance with article 6 of the French law no. 2004-575 of 21 June 2004 on confidence in the digital economy (LCEN), here is the information about the publisher and the host of ${SITE}.`,
      ],
      sections: [
        { h2: 'Publisher', list: [
          `Company name: ${E.legalName}`,
          `Legal form: ${E.form.en}, with a share capital of ${E.capital}`,
          `Registered office: ${E.address}`,
          `Registration: ${E.rcs} — SIRET: ${E.siret}`,
          `EU VAT number: ${E.vat}`,
          `Phone: ${BUSINESS.phoneDisplay}`,
          `E-mail: ${BUSINESS.email}`,
        ] },
        { h2: 'Publication director', paras: [
          `${E.president}, president and legal representative of ${E.legalName}.`,
        ] },
        { h2: 'Regulated activity: VTC passenger transport', paras: [
          `${E.legalName} operates private hire vehicles with chauffeur (VTC), an activity governed by the French Transport Code (articles L3120-1 et seq. and L3122-1 et seq.). It is listed in the register of VTC operators (REVTC) under number ${E.evtc}, valid until ${until.en}.`,
          'The company holds professional liability insurance and legal protection insurance.',
        ] },
        { h2: 'Host', list: [
          `${E.host.name}`,
          `Address: ${E.host.address}`,
          `Contact: [official contact form](${E.host.contact})`,
          `Website: [vercel.com](${E.host.site})`,
        ] },
        { h2: 'Intellectual property', paras: [
          `All content on this website (texts, photographs, logo, layout) belongs to ${E.legalName} unless stated otherwise. Any reproduction, representation or adaptation, in whole or in part, without prior written permission is prohibited (French Intellectual Property Code).`,
          'The brands and names mentioned (including Mercedes-Benz, Tesla, Disneyland Paris and the Paris airports) belong to their respective owners; they are only used to describe vehicles and destinations, with no partnership.',
        ] },
        { h2: 'Credits', list: [
          `Photographs of the vehicles and of the blog: ${E.legalName}.`,
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
        `В соответствии со статьёй 6 французского закона № 2004-575 от 21 июня 2004 года о доверии к цифровой экономике (LCEN) ниже приведены сведения об издателе и хостинге сайта ${SITE}.`,
      ],
      sections: [
        { h2: 'Издатель сайта', list: [
          `Наименование: ${E.legalName}`,
          `Организационно-правовая форма: ${E.form.ru}, уставный капитал ${E.capital}`,
          `Юридический адрес: ${E.address}`,
          `Регистрация: ${E.rcs} — SIRET: ${E.siret}`,
          `Номер плательщика НДС в ЕС: ${E.vat}`,
          `Телефон: ${BUSINESS.phoneDisplay}`,
          `E-mail: ${BUSINESS.email}`,
        ] },
        { h2: 'Ответственный за публикацию', paras: [
          `${E.president}, президент и законный представитель ${E.legalName}.`,
        ] },
        { h2: 'Регулируемая деятельность: перевозка пассажиров VTC', paras: [
          `${E.legalName} осуществляет деятельность оператора автомобилей с водителем (VTC), регулируемую Транспортным кодексом Франции (статьи L3120-1 и далее, L3122-1 и далее). Компания внесена в реестр операторов VTC (REVTC) под номером ${E.evtc}, действительным до ${until.ru}`,
          'Компания имеет страхование профессиональной гражданской ответственности и страхование правовой защиты.',
        ] },
        { h2: 'Хостинг', list: [
          `${E.host.name}`,
          `Адрес: ${E.host.address}`,
          `Контакт: [официальная форма обратной связи](${E.host.contact})`,
          `Сайт: [vercel.com](${E.host.site})`,
        ] },
        { h2: 'Интеллектуальная собственность', paras: [
          `Все материалы сайта (тексты, фотографии, логотип, оформление) принадлежат ${E.legalName}, если не указано иное. Любое полное или частичное воспроизведение без предварительного письменного разрешения запрещено (Кодекс интеллектуальной собственности Франции).`,
          'Упомянутые марки и названия (в том числе Mercedes-Benz, Tesla, Disneyland Paris и парижские аэропорты) принадлежат их владельцам и используются только для описания автомобилей и направлений, без партнёрских отношений.',
        ] },
        { h2: 'Авторы и источники', list: [
          `Фотографии автомобилей и блога: ${E.legalName}.`,
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
        `În conformitate cu articolul 6 din legea franceză nr. 2004-575 din 21 iunie 2004 privind încrederea în economia digitală (LCEN), iată informațiile despre editorul și furnizorul de găzduire al site-ului ${SITE}.`,
      ],
      sections: [
        { h2: 'Editorul site-ului', list: [
          `Denumire: ${E.legalName}`,
          `Formă juridică: ${E.form.ro}, cu un capital social de ${E.capital}`,
          `Sediul social: ${E.address}`,
          `Înmatriculare: ${E.rcs} — SIRET: ${E.siret}`,
          `Cod de TVA intracomunitar: ${E.vat}`,
          `Telefon: ${BUSINESS.phoneDisplay}`,
          `E-mail: ${BUSINESS.email}`,
        ] },
        { h2: 'Directorul de publicație', paras: [
          `${E.president}, președinte și reprezentant legal al ${E.legalName}.`,
        ] },
        { h2: 'Activitate reglementată: transport de persoane VTC', paras: [
          `${E.legalName} desfășoară activitatea de operator de vehicule de transport cu șofer (VTC), reglementată de Codul transporturilor din Franța (articolele L3120-1 și următoarele, L3122-1 și următoarele). Este înscrisă în registrul operatorilor VTC (REVTC) cu numărul ${E.evtc}, valabil până la ${until.ro}.`,
          'Societatea are o asigurare de răspundere civilă profesională și o asigurare de protecție juridică.',
        ] },
        { h2: 'Găzduire', list: [
          `${E.host.name}`,
          `Adresă: ${E.host.address}`,
          `Contact: [formularul de contact oficial](${E.host.contact})`,
          `Site: [vercel.com](${E.host.site})`,
        ] },
        { h2: 'Proprietate intelectuală', paras: [
          `Toate conținuturile acestui site (texte, fotografii, logo, aspect grafic) aparțin ${E.legalName}, cu excepția mențiunilor contrare. Orice reproducere, totală sau parțială, fără acord scris prealabil este interzisă (Codul proprietății intelectuale din Franța).`,
          'Mărcile și denumirile citate (în special Mercedes-Benz, Tesla, Disneyland Paris și aeroporturile pariziene) aparțin titularilor lor; sunt menționate doar pentru a descrie vehiculele și destinațiile, fără vreun parteneriat.',
        ] },
        { h2: 'Credite', list: [
          `Fotografiile vehiculelor și ale blogului: ${E.legalName}.`,
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
