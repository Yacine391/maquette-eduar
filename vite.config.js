import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    // Année du build : identique dans le HTML pré-généré et dans le bundle
    // client (pas d'écart à l'hydratation). Le pied de page la met à jour
    // côté navigateur si l'année a changé depuis.
    __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
  },
  build: {
    // Pas de <link rel="modulepreload"> : le JS est chargé par le loader
    // inline (voir scripts/prerender.mjs et la CSP de vercel.json).
    modulePreload: false,
    // Aucune image intégrée en base64 : fichiers séparés, mis en cache un an
    // et chargés en différé (et pas de « data: » à autoriser dans la CSP)
    assetsInlineLimit: 0,
  },
})
