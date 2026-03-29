/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // ── Design Tokens CDG TRANSFERT VTC ──────────────────────────
        canvas:    '#0A0A0C', // Onyx Deep — page background
        gold:      '#C5A059', // Bronze Champagne — accent / CTA
        'gold-hover': '#D6B471', // Accent hover state
        offwhite:  '#F4F4F6', // Primary text
        silver:    '#8E8E93', // Secondary text / labels
      },
      fontFamily: {
        serif:  ['"Playfair Display"', 'Cinzel', 'Georgia', 'serif'],
        sans:   ['Inter', 'Montserrat', 'sans-serif'],
      },
      // Double whitespace rhythm — section padding multiples
      spacing: {
        section: '7rem',
      },
    },
  },
  plugins: [],
}
