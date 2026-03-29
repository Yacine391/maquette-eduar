/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // ── Design Tokens CDG TRANSFERT VTC ──────────────────────────
        canvas:       '#050507',   // Onyx Deep — background principal
        'canvas-2':   '#0A0A0C',   // Surface secondaire
        'canvas-3':   '#111115',   // Surface tertiaire / cards
        gold:         '#C5A059',   // Bronze Champagne — accent principal
        'gold-hover': '#D6B471',   // Hover state
        'gold-dim':   '#9A7A3F',   // Gold atténué
        'gold-light': '#E8CC8C',   // Gold clair pour effets subtils
        offwhite:     '#F4F4F6',   // Texte principal
        silver:       '#8E8E93',   // Texte secondaire
        'silver-dim': '#5A5A60',   // Texte tertiaire
        divider:      '#1E1E24',   // Séparateurs
      },
      fontFamily: {
        // Cormorant Garamond : ultra-luxe (skill: Luxury Serif)
        serif:  ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        // Montserrat : géométrique, lisible (skill: Luxury Serif pairing)
        sans:   ['Montserrat', 'Inter', 'sans-serif'],
      },
      fontSize: {
        // Type scale luxury
        'display': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'hero':    ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.1',  letterSpacing: '-0.01em' }],
      },
      spacing: {
        section: '7rem',
        'section-sm': '4rem',
      },
      backdropBlur: {
        xs: '4px',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'line-grow': {
          '0%':   { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'price-pop': {
          '0%':   { opacity: '0', transform: 'scale(0.8) translateY(10px)' },
          '70%':  { transform: 'scale(1.05) translateY(-2px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-up':    'fade-up 0.6s ease-out forwards',
        'fade-in':    'fade-in 0.4s ease-out forwards',
        shimmer:      'shimmer 2.5s linear infinite',
        'line-grow':  'line-grow 0.8s ease-out forwards',
        'price-pop':  'price-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        float:        'float 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
