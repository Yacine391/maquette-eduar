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

### Phase 3 — Performance, accessibilité, sécurité (novembre 2026) ✅
- [x] HTML pré-généré au build + hydratation, CSS intégré, aucune requête bloquante
- [x] Polices auto-hébergées (variables, woff2, swap), préchargement des 3 fichiers du haut de page
- [x] Images AVIF/WebP aux tailles affichées (srcset/sizes, width/height, lazy), couvertures recadrées par gabarit de carte, logo et favicon légers, grain de fond pré-calculé
- [x] JS différé : EmailJS à l'envoi, galerie à l'ouverture ; hydratation découpée (startTransition)
- [x] Accessibilité : contrastes ≥ 4,5:1, ARIA combobox, repères main/nav, lien d'évitement, lang synchronisé
- [x] En-têtes de sécurité (vercel.json) : CSP stricte + Trusted Types, HSTS preload, COOP, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy, cache immuable
- [x] Lighthouse local : 100 / 100 / 100 / 100 mobile et desktop, Navigation agentique 2/2

### Phase 4 — SEO local et IA (novembre 2026) ✅
- [x] 7 pages services pré-rendues : aéroport CDG, Orly, Beauvais, gares de Paris, Disneyland Paris, mise à disposition, van 7 places (≥ 600 mots par langue, temps de trajet, lieu de rendez-vous, inclus, FAQ, bouton Réserver en haut et en bas)
- [x] 4 langues avec URL propres (FR à la racine, `/en`, `/ru`, `/ro`), hreflang réciproques, `<html lang>`, sélecteur de langue en liens
- [x] Balises par page : title ≤ 60, description ≤ 155, canonical, Open Graph, Twitter
- [x] JSON-LD : TaxiService + LocalBusiness (NAP, zone, 24/7, priceRange), Service + Offer (tarifs du tableau), FAQPage, BreadcrumbList — validé sur validator.schema.org (0 erreur, 0 avertissement)
- [x] sitemap.xml (32 URL), robots.txt (moteurs + robots d'IA), llms.txt générés au build
- [x] Maillage interne : menu, pied de page « Nos services », cartes de l'accueil, services associés
- [x] Lighthouse local maintenu à 100 / 100 / 100 / 100 (mobile et desktop), Navigation agentique 3/3

---

## En attente du client

- [ ] Confirmer les arguments « Pourquoi nous choisir » (30 min d'avance, eau minérale offerte, facturation électronique immédiate, véhicules banalisés sur demande)
- [ ] Confirmer le bandeau sous le hero (24/7 · Mercedes & Tesla · Prix fixe · Suivi de vol)
- [ ] Confirmer la note des tarifs de l'accueil (« péage et attente inclus ») — les nouvelles pages n'en parlent pas
- [ ] Confirmer la mention « Réponse sous 1h » (carte e-mail de la section Contact)
- [ ] Confirmer la capacité du van Mercedes Classe V : 6 passagers + chauffeur (« 7 places »), 6 bagages
- [ ] Vérifier dans le tableau de bord EmailJS l'adresse de réception et le contenu des 2 modèles, puis autoriser un test d'envoi réel

## À faire

- [ ] Pages légales : Mentions légales, Politique de confidentialité, CGV (les liens du pied de page ne mènent encore nulle part ; obligatoires pour un site professionnel)
- [ ] Après mise en ligne : vérifier les URL propres sur Vercel (`/en`, `/en/vtc-aeroport-cdg`, redirection de `/en/`), les scores PageSpeed Insights et le test des résultats enrichis de Google
- [ ] Google Search Console : soumettre `https://cdgtransfertvtc.fr/sitemap.xml`, demander l'indexation des pages services
- [ ] Fiche Google Business Profile : vérifier que nom, téléphone et zone sont identiques au site (NAP) et y ajouter le lien du site
- [ ] Décider d'une politique Content-Signal (autorisation ou non de l'entraînement des IA) pour robots.txt
- [ ] Optionnel : inscrire le domaine sur hstspreload.org (l'en-tête HSTS est prêt)
