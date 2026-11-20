# Roadmap — CDG Transfert VTC (site en production)

> Site en ligne : **https://cdgtransfertvtc.fr** — hébergé sur Vercel, déployé automatiquement depuis `main`.
> Client réel : chauffeur privé VTC à Paris, transferts CDG · Orly · Beauvais.

---

## Historique

### Phase 1 — Maquette (avril 2026) ✅
- [x] Vite + React + Tailwind, design system (Onyx / Bronze Champagne, Cormorant Garamond + Montserrat)
- [x] Sections : Header, Hero, Réservation, Flotte, Pourquoi nous, Avis, Tarifs, Contact, Footer
- [x] Traductions FR / EN / RU / RO sans bibliothèque
- [x] Envoi des demandes de réservation par EmailJS + bouton WhatsApp flottant
- [x] Photos réelles de la flotte + galerie plein écran
- [x] Autocomplétion d'adresses (API Adresse data.gouv.fr)

### Phase 2 — Mise en production (novembre 2026) ✅
- [x] Retrait du contenu de démonstration : faux avis et note 5.0, mentions « simulé » / « démonstration », chiffres fictifs du hero
- [x] Section « Votre avis compte » → lien direct de la fiche Google (`g.page/r/CfqSDSmBkk6BEBM/review`)
- [x] Note des tarifs : « Tarifs fixes, péage et attente inclus, annoncés avant la course »
- [x] SEO : H1 ciblé, JSON-LD TaxiService + LocalBusiness (areaServed, priceRange 50 € – 300 €), hreflang fr, sitemap, robots.txt
- [x] Parcours de réservation : message « Demande de réservation envoyée ! », téléphone obligatoire, contrôle e-mail et date, message de secours appel / WhatsApp pré-rempli, échec du récapitulatif client sans fausse erreur
- [x] Estimation de prix corrigée (classement par code postal) + tests `npm test`
- [x] Image de partage `og-image.jpg` 1200×630 + balises Open Graph / Twitter complètes
- [x] Documentation (CLAUDE.md, roadmap, en-têtes de fichiers) à jour pour la production

---

## En attente du client

- [ ] Confirmer les arguments « Pourquoi nous choisir » (30 min d'avance, eau minérale offerte, facturation électronique immédiate, véhicules banalisés sur demande)
- [ ] Confirmer le bandeau sous le hero (24/7 · Mercedes & Tesla · Prix fixe · Suivi de vol)
- [ ] Vérifier dans le tableau de bord EmailJS l'adresse de réception et le contenu des 2 modèles, puis autoriser un test d'envoi réel

## À faire

- [ ] Pages légales : Mentions légales, Politique de confidentialité, CGV (les liens du pied de page ne mènent encore nulle part ; obligatoires pour un site professionnel)
- [ ] Version anglaise `/en/` (pages réelles), puis ajouter `hreflang="en"` et l'URL au sitemap
- [ ] Optionnel : en-têtes de sécurité (CSP autorisant `api.emailjs.com`, `api-adresse.data.gouv.fr`, Google Fonts) via `vercel.json`
