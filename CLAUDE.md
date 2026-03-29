# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**CDG TRANSFERT VTC** — Interactive front-end mockup (maquette) of a single-page landing site for a premium B2B VTC company. No backend, no real API, no database. Runs entirely in the browser.

## Stack

- **React** (Vite scaffold preferred)
- **Tailwind CSS** (utility-first styling)
- **No backend** — all form submissions and price calculations are purely simulated in JS

## Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Design System (Design Tokens — enforce strictly)

| Token | Value |
|---|---|
| Canvas / Background | `#0A0A0C` (Onyx Deep) |
| Accent / CTA | `#C5A059` (Bronze Champagne) |
| Accent hover | `#D6B471` |
| Primary text | `#F4F4F6` (Off-White) |
| Secondary text | `#8E8E93` (Matte Silver) |
| Title font | **Playfair Display** or Cinzel (Serif) |
| Body / UI font | **Inter** or Montserrat (Sans-Serif) |

Apply `double whitespace` spacing rhythm (generous padding/gap between sections).

## Page Architecture (strict DOM order)

1. **Header** — Logo (`assets/logo.png`) + "CDG TRANSFERT VTC" wordmark + nav links (Accueil, Flotte, Réservation, Contact) + language switcher (FR / EN / RU) with simulated title translation.
2. **Hero** — Full-bleed luxury background + headline "L'Excellence à Votre Service" + CTA button scrolling to the booking module.
3. **Booking Module** (simulated) — Form: Date, Time, Pickup, Dropoff, Vehicle category. On vehicle selection, a **fake price** is computed in JS and displayed — no real API call.
4. **Fleet Section** (strict vehicle order):
   - **BUSINESS** — Mercedes Classe E · featured card (gold border `#C5A059`, "Recommandé" badge)
   - **Luxe** — Mercedes Classe S
   - **Van** — Mercedes Classe V
   - **Eco** — other vehicles
5. **Rates Section** — Static table simulating the pricing/package structure.
6. **Contact** — Phone, email, short description.
7. **Footer** — Legal mentions, brand name.

## Component Structure

Separate logic from presentation. Suggested split:

```
src/
  components/
    Header/
    Hero/
    BookingModule/   ← contains fake price-calculation logic
    Fleet/
    Rates/
    Contact/
    Footer/
  hooks/             ← useTranslation (simulated i18n), usePriceSimulator
  constants/         ← translations object (FR/EN/RU), vehicle data, rate table
  assets/            ← logo.png (CDG TRANSFERT VTC logo officiel)
```

## Key Behaviours

- **Language switcher**: swaps H2 section titles and key labels via a simple JS object (`{ fr: {...}, en: {...}, ru: {...} }`). No i18n library required.
- **Price simulator**: maps `(vehicleCategory, distance/zone)` → a hardcoded price lookup table. Display result with a brief CSS animation.
- **Fleet cards**: `hover:scale-105` + inner gold glow (`box-shadow: inset 0 0 0 1px #C5A059`) transition `0.3s ease-in-out`.
- **Buttons**: transition to `#D6B471` on hover, `0.3s ease-in-out`.

## Constraints

- **No `.glb` files**, no 3D assets.
- **No images copied from vtcparis-transfert.fr** — use royalty-free placeholders or CSS gradients; vehicle names/prices are inspired by that site's structure.
- Code must be **heavily commented** so the client understands this is a mockup.
