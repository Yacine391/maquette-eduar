// ── Point d'entrée React ─────────────────────────────────────────────
// CDG TRANSFERT VTC — site en production (cdgtransfertvtc.fr)
// En production, dist/index.html contient déjà le HTML pré-généré
// (scripts/prerender.mjs) : on l'hydrate. En développement (vite), la
// racine est vide : rendu client classique.
// ────────────────────────────────────────────────────────────────────
import { StrictMode, startTransition } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
// Polices auto-hébergées, variables (woff2, font-display: swap) : un seul
// fichier par famille et par style couvre toutes les graisses utilisées
import '@fontsource-variable/cormorant-garamond/wght.css'
import '@fontsource-variable/cormorant-garamond/wght-italic.css'
import '@fontsource-variable/montserrat/wght.css'
import './index.css'

const root = document.getElementById('root')
const app  = <StrictMode><App /></StrictMode>

// Hydratation en transition : React la découpe en tranches de ~5 ms et rend
// la main au navigateur entre deux (pas de longue tâche au chargement)
if (root.hasChildNodes()) startTransition(() => { hydrateRoot(root, app) })
else createRoot(root).render(app)
