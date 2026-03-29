# Roadmap — CDG TRANSFERT VTC Maquette

> Durée estimée totale : **6–10h de développement**

---

## Phase 0 — Setup & scaffolding ✅
> ~30 min · Vite + React + Tailwind + fonts + logo asset

- [x] Initialiser le projet Vite + React
- [x] Configurer Tailwind CSS (`tailwind.config.js` + `postcss.config.js`)
- [x] Importer les polices (Playfair Display, Inter) via Google Fonts dans `index.html`
- [x] Ajouter le logo `src/assets/logo.png`
- [x] Créer `index.html`, `src/main.jsx`, `src/index.css`

**Validé** : `npm run build` → ✓ build réussi.

---

## Phase 1 — Design system & constants ✅
> ~45 min · tokens, translations (FR/EN/RU), vehicle data, rate table

- [x] Tokens de couleur dans `tailwind.config.js` (`canvas`, `gold`, `gold-hover`, `offwhite`, `silver`)
- [x] Polices dans Tailwind (`font-serif`, `font-sans`) + espacement `section`
- [x] `src/constants/translations.js` — objet `{ fr, en, ru }` complet (nav, hero, booking, fleet, rates, contact, footer)
- [x] `src/constants/vehicles.js` — 4 véhicules (BUSINESS, Luxe, Van, Éco) avec ordre strict
- [x] `src/constants/rates.js` — tableau des tarifs + table `priceSimulator`

**Validé** : données importées sans erreur dans le build de production.

---

## Phase 2 — Composants (7 blocs séquentiels) ✅

### 2a · Header ✅
- [x] Logo (`src/assets/logo.png`) + wordmark "CDG TRANSFERT VTC"
- [x] Liens de navigation : Accueil · Flotte · Réservation · Contact (ancres)
- [x] Sélecteur de langue FR / EN / RU — boutons actifs gold
- [x] Hook `useTranslation` → labels swappés au clic sans rechargement
- [x] Menu burger mobile (hamburger → croix animée)
- [x] Header sticky avec fond `bg-canvas/95 backdrop-blur` après 60px de scroll

### 2b · Hero section ✅
- [x] Fond plein écran CSS gradient multi-couches (pas d'image copyrigthée)
- [x] Grille de lignes dorées décoratives (opacity 6%)
- [x] Titre H1 Playfair Display : traduit par `t('hero_headline')`
- [x] Séparateur doré + sous-titre + flèche de scroll animée
- [x] Bouton CTA → scroll vers `#booking`

### 2c · Booking module ⭐ *(priorité absolue)* ✅
- [x] Champs : Date, Heure, Pickup, Dropoff
- [x] Sélecteur catégorie véhicule (4 boutons visuels)
- [x] Hook `usePriceSimulator` → détection de zone (airport/city/suburb/long) → lookup table
- [x] Prix affiché avec animation CSS (`animate-price-reveal`)
- [x] Délai artificiel 600ms pour simuler un appel API
- [x] Note "prix simulé" traduite en 3 langues
- [x] Zéro backend — tout en JS client

### 2d · Section flotte *(ordre strict)* ✅
- [x] **BUSINESS** — Mercedes Classe E · badge "Recommandé" · bordure `#C5A059` · `featured: true`
- [x] **Luxe** — Mercedes Classe S
- [x] **Van** — Mercedes Classe V
- [x] **Éco** — Peugeot 508 / Skoda Octavia
- [x] `hover:scale-105` + gold inner glow (`shadow-[inset 0 0 0 1px #C5A059]`) · `0.3s ease-in-out`
- [x] Silhouette SVG générique (pas d'image copyrigthée)
- [x] Capacités passagers + bagages par carte
- [x] Description traduite (fr/en/ru)

### 2e · Section tarifs ✅
- [x] Tableau statique : CDG/Orly→Paris · Paris Centre · Versailles · Longue distance
- [x] 4 colonnes de prix : Business · Luxe · Van · Éco
- [x] "Sur devis" / "On quote" / "По запросу" selon la langue
- [x] Lignes alternées + hover gold

### 2f · Contact ✅
- [x] Description traduite (fr/en/ru)
- [x] Téléphone avec icône SVG inline + lien `tel:`
- [x] Email avec icône SVG inline + lien `mailto:`
- [x] Hover → couleur gold sur les cartes

### 2g · Footer ✅
- [x] Logo + brand name
- [x] Copyright + mention "tous droits réservés" traduite
- [x] Note "maquette non contractuelle" traduite
- [x] Lien "Mentions légales"

---

## Phase 3 — Micro-interactions & polish ✅

- [x] `scroll-behavior: smooth` global (CSS)
- [x] Header sticky avec fond opaque progressif au scroll (`useEffect` + `window.scroll`)
- [x] Boutons CTA : transition vers `#D6B471` · `0.3s ease-in-out`
- [x] Animation prix booking : keyframe `priceReveal` (fade + slide + scale)
- [x] Gold inner glow sur cartes flotte au hover
- [x] i18n switcher : swap H2 + labels sans rechargement (state React)
- [x] Scrollbar custom dark/gold
- [x] Menu mobile burger animé (hamburger → croix)

---

## Phase 4 — Responsive & QA pixel-perfect ✅

- [x] Breakpoints Tailwind appliqués : `sm` / `md` / `lg` / `xl`
  - Header : nav cachée sur mobile → burger
  - BookingModule : grid 1 col → 2 col (md)
  - Fleet : grid 1 → 2 → 4 colonnes
  - Contact : flex col → row (md)
  - Footer : flex col → row (md)
- [x] Build de production validé sans erreur ni warning Tailwind
- [x] Bundle CSS : 18.98 kB (gzip: 4.34 kB) — optimal

---

## Phase 5 — Build & livraison ✅

- [x] `npm run build` — ✓ 44 modules transformés, 0 erreur
- [x] Bundle : `dist/assets/index.js` 166 kB (gzip 53 kB), CSS 19 kB (gzip 4 kB)
- [x] Code commenté (rappels maquette dans chaque fichier)
- [x] `npm run preview` — disponible pour démo locale

---

## Légende

| Couleur | Catégorie |
|---|---|
| 🟠 Orange | Priorité absolue (booking module) |
| 🟢 Vert | Composants UI |
| 🟣 Violet | Infrastructure & data |
| 🔴 Rouge | Animations & UX |
| 🔵 Bleu | QA & responsive |
| 🟡 Vert clair | Livraison |

---

## Structure finale

```
src/
  assets/logo.png
  constants/
    translations.js   ← FR/EN/RU complet
    vehicles.js       ← 4 véhicules (ordre strict)
    rates.js          ← tarifs + priceSimulator lookup
  hooks/
    useTranslation.js ← lang state + t() helper
    usePriceSimulator.js ← détection zone + lookup 600ms
  components/
    Header/index.jsx
    Hero/index.jsx
    BookingModule/index.jsx  ← priorité absolue ⭐
    Fleet/index.jsx
    Rates/index.jsx
    Contact/index.jsx
    Footer/index.jsx
  App.jsx
  main.jsx
  index.css
```
