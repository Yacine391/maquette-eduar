import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { generateBlog, CONTENT_DIR } from './scripts/blog/generate.mjs'

// Blog : content/blog/*.md → src/content/blog/generated/ au début de chaque
// build, et à chaque modification d'un article en développement
function blogContent() {
  return {
    name: 'blog-content',
    buildStart() { generateBlog() },
    configureServer(server) {
      server.watcher.add(CONTENT_DIR)
      const regen = (file) => {
        if (!file.startsWith(CONTENT_DIR + path.sep) || !file.endsWith('.md')) return
        try { generateBlog(); server.ws.send({ type: 'full-reload' }) }
        catch (e) { server.config.logger.error(e.message) }
      }
      for (const ev of ['add', 'change', 'unlink']) server.watcher.on(ev, regen)
    },
  }
}

export default defineConfig({
  plugins: [blogContent(), react()],
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
    rollupOptions: {
      output: {
        // React dans un fichier à part : il change rarement, reste en cache
        // d'un déploiement à l'autre (seul le code du site est retéléchargé)
        manualChunks: (id) => (/node_modules\/(react|react-dom|scheduler)\//.test(id) ? 'react' : undefined),
      },
    },
  },
})
