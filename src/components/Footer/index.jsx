// ── Footer — Mentions légales + brand ───────────────────────────────
// ────────────────────────────────────────────────────────────────────
import logo from '../../assets/logo.png'

export default function Footer({ t }) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-zinc-800/60 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* ── Logo + brand ── */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="CDG Transfert VTC" className="h-8 w-auto opacity-70" />
          <span className="font-serif text-sm tracking-widest text-silver">CDG TRANSFERT VTC</span>
        </div>

        {/* ── Mentions légales ── */}
        <div className="text-center text-xs text-silver/50 space-y-1">
          <p>© {year} CDG TRANSFERT VTC — {t('footer_rights')}</p>
          <p className="italic text-silver/30">{t('footer_mockup')}</p>
        </div>

        {/* ── Lien mentions ── */}
        <button className="text-xs text-silver/50 hover:text-gold transition-colors duration-300">
          {t('footer_legal')}
        </button>
      </div>
    </footer>
  )
}
