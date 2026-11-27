// ── Pages légales : libellés, title et description (4 langues) ────────
// Chargé partout (pied de page). Le texte complet de chaque page est dans
// pages/<slug>.js, chargé uniquement sur la page concernée. Le texte
// français fait foi ; les traductions sont fournies à titre informatif.
// Marqueurs [À COMPLÉTER : …] / [À VÉRIFIER : …] : informations à fournir
// ou à vérifier par le client (mis en évidence sur la page, bandeau
// « Projet à valider par le client » tant qu'il en reste).
// title ≤ 60 caractères, description ≤ 155 (vérifié par tests/seo.test.js).
// ────────────────────────────────────────────────────────────────────

export const LEGAL_META = {
  'mentions-legales': {
    fr: { nav: 'Mentions légales', title: 'Mentions légales | CDG Transfert VTC', description: 'Mentions légales de cdgtransfertvtc.fr : éditeur CDG TRANSFERT VTC (SAS), directeur de la publication, hébergeur, registre VTC, propriété intellectuelle.' },
    en: { nav: 'Legal notice', title: 'Legal notice | CDG Transfert VTC', description: 'Legal notice of cdgtransfertvtc.fr: publisher CDG TRANSFERT VTC (SAS), publication director, host, VTC register, intellectual property.' },
    ru: { nav: 'Правовая информация', title: 'Правовая информация | CDG Transfert VTC', description: 'Правовая информация сайта cdgtransfertvtc.fr: издатель CDG TRANSFERT VTC (SAS), ответственный за публикацию, хостинг, реестр VTC.' },
    ro: { nav: 'Mențiuni legale', title: 'Mențiuni legale | CDG Transfert VTC', description: 'Mențiunile legale ale site-ului cdgtransfertvtc.fr: editor CDG TRANSFERT VTC (SAS), director de publicație, găzduire, registrul VTC.' },
  },
  confidentialite: {
    fr: { nav: 'Confidentialité', title: 'Politique de confidentialité | CDG Transfert VTC', description: 'Données collectées par le formulaire de réservation, finalités, durées de conservation, destinataires, cookies et vos droits (RGPD, CNIL).' },
    en: { nav: 'Privacy', title: 'Privacy policy | CDG Transfert VTC', description: 'Data collected by the booking form, purposes, retention periods, recipients, cookies and your rights under the GDPR.' },
    ru: { nav: 'Конфиденциальность', title: 'Политика конфиденциальности | CDG Transfert VTC', description: 'Какие данные собирает форма бронирования, цели, сроки хранения, получатели, cookie и ваши права по GDPR.' },
    ro: { nav: 'Confidențialitate', title: 'Politica de confidențialitate | CDG Transfert VTC', description: 'Datele colectate prin formularul de rezervare, scopuri, durate de păstrare, destinatari, cookie-uri și drepturile dvs. (GDPR).' },
  },
  cgv: {
    fr: { nav: 'CGV', title: 'Conditions générales de vente | CDG Transfert VTC', description: 'CGV du transport VTC : réservation, prix fixe, péages inclus, suivi des vols, attente, annulation gratuite jusqu’à 24 h, mise à disposition, réclamations.' },
    en: { nav: 'Terms', title: 'Terms and conditions | CDG Transfert VTC', description: 'Terms of our VTC chauffeur service: booking, fixed price, tolls included, flight tracking, waiting time, free cancellation up to 24 h, hourly hire.' },
    ru: { nav: 'Условия продажи', title: 'Общие условия продажи | CDG Transfert VTC', description: 'Условия услуг VTC: бронирование, фиксированная цена, платные дороги включены, ожидание, бесплатная отмена за 24 часа.' },
    ro: { nav: 'Condiții generale', title: 'Condiții generale de vânzare | CDG Transfert VTC', description: 'Condițiile serviciului VTC: rezervare, preț fix, taxe incluse, urmărirea zborului, așteptare, anulare gratuită până la 24 de ore.' },
  },
}

// Bandeau et mentions communes
export const LEGAL_UI = {
  fr: { draft: 'Projet à valider par le client', draftText: 'Cette page contient encore des informations à compléter ou à vérifier (signalées en surbrillance).', updated: 'Dernière mise à jour', authoritative: null, legal: 'Informations légales' },
  en: { draft: 'Draft — to be validated by the company', draftText: 'This page still contains information to be completed or checked (highlighted).', updated: 'Last updated', authoritative: 'This translation is provided for information only: the French version is the only legally binding text.', legal: 'Legal information' },
  ru: { draft: 'Проект — требует утверждения компанией', draftText: 'На этой странице ещё есть сведения, которые нужно дополнить или проверить (выделены).', updated: 'Последнее обновление', authoritative: 'Перевод предоставлен для информации: юридическую силу имеет только французская версия.', legal: 'Правовая информация' },
  ro: { draft: 'Proiect — de validat de companie', draftText: 'Această pagină conține încă informații de completat sau de verificat (evidențiate).', updated: 'Ultima actualizare', authoritative: 'Această traducere este oferită doar cu titlu informativ: numai versiunea în limba franceză are valoare juridică.', legal: 'Informații legale' },
}
export const LEGAL_UPDATED = '2026-11-27'
