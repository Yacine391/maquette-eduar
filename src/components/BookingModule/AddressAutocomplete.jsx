// ── AddressAutocomplete — Autocomplétion adresses françaises ─────────
// Utilise l'API officielle Base Adresse Nationale (gouv.fr) :
// https://api-adresse.data.gouv.fr — gratuite, sans clé API.
// ────────────────────────────────────────────────────────────────────
import { useState, useRef, useEffect, useCallback } from 'react'

// Délai de debounce en ms (évite de spammer l'API à chaque frappe)
const DEBOUNCE_MS = 300

export default function AddressAutocomplete({ id, name, value, onChange, placeholder, required, label }) {
  const [suggestions, setSuggestions] = useState([])
  const [open,        setOpen]        = useState(false)
  const [loading,     setLoading]     = useState(false)
  const [activeIdx,   setActiveIdx]   = useState(-1)
  const debounceRef = useRef(null)
  const containerRef = useRef(null)

  // ── Fermer si clic extérieur ──
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
        setActiveIdx(-1)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // ── Appel API avec debounce ──
  const fetchSuggestions = useCallback((query) => {
    clearTimeout(debounceRef.current)
    if (!query || query.length < 3) {
      setSuggestions([])
      setOpen(false)
      return
    }
    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(
          `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=6&autocomplete=1`
        )
        if (!res.ok) throw new Error('API error')
        const data = await res.json()
        const results = (data.features ?? []).map(f => ({
          label: f.properties.label,
          city:  f.properties.city,
          type:  f.properties.type,
        }))
        setSuggestions(results)
        setOpen(results.length > 0)
        setActiveIdx(-1)
      } catch {
        setSuggestions([])
        setOpen(false)
      } finally {
        setLoading(false)
      }
    }, DEBOUNCE_MS)
  }, [])

  const handleChange = (e) => {
    onChange(e) // mettre à jour le state parent
    fetchSuggestions(e.target.value)
  }

  const handleSelect = (label) => {
    // Simuler un event onChange avec la valeur sélectionnée
    onChange({ target: { name, value: label } })
    setSuggestions([])
    setOpen(false)
    setActiveIdx(-1)
  }

  // ── Navigation clavier dans la liste ──
  const handleKeyDown = (e) => {
    if (!open) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx(i => Math.min(i + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx(i => Math.max(i - 1, -1))
    } else if (e.key === 'Enter' && activeIdx >= 0) {
      e.preventDefault()
      handleSelect(suggestions[activeIdx].label)
    } else if (e.key === 'Escape') {
      setOpen(false)
      setActiveIdx(-1)
    }
  }

  // Icône type d'adresse
  const typeIcon = (type) => {
    if (type === 'housenumber') return '📍'
    if (type === 'street')      return '🛣️'
    if (type === 'municipality') return '🏙️'
    return '📌'
  }

  return (
    <div ref={containerRef} className="relative">
      <label htmlFor={id} className="label-luxury">{label} {required && '*'}</label>

      <div className="relative">
        <input
          id={id}
          type="text"
          name={name}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          placeholder={placeholder}
          required={required}
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={`${id}-listbox`}
          aria-activedescendant={activeIdx >= 0 ? `${id}-option-${activeIdx}` : undefined}
          className="input-luxury pr-10"
        />

        {/* Icône loupe / spinner */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          {loading ? (
            <span className="w-4 h-4 border border-gold/30 border-t-gold rounded-full animate-spin block" />
          ) : (
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-gold/40" fill="currentColor">
              <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.013 3.5-4.619 3.5-7.327A8.25 8.25 0 003 12c0 2.708 1.556 5.314 3.5 7.327a19.58 19.58 0 002.683 2.282 16.974 16.974 0 001.144.742zM21.75 12a9.75 9.75 0 11-19.5 0 9.75 9.75 0 0119.5 0zM12 10.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>

      {/* ── Liste de suggestions ── */}
      {open && suggestions.length > 0 && (
        <ul
          id={`${id}-listbox`}
          role="listbox"
          className="absolute z-50 left-0 right-0 top-full mt-1
            bg-canvas-2 border border-gold/20
            shadow-[0_8px_32px_rgba(0,0,0,0.6)]
            max-h-64 overflow-y-auto"
        >
          {suggestions.map((s, i) => (
            <li
              key={i}
              id={`${id}-option-${i}`}
              role="option"
              aria-selected={i === activeIdx}
              onMouseDown={(e) => { e.preventDefault(); handleSelect(s.label) }}
              onMouseEnter={() => setActiveIdx(i)}
              className={`flex items-start gap-3 px-4 py-3 cursor-pointer
                border-b border-divider last:border-0
                transition-colors duration-150
                ${i === activeIdx ? 'bg-gold/10 text-gold' : 'text-offwhite hover:bg-gold/5'}`}
            >
              <span className="text-sm mt-0.5 flex-shrink-0">{typeIcon(s.type)}</span>
              <div className="min-w-0">
                <p className="text-sm font-sans leading-tight truncate">{s.label}</p>
              </div>
            </li>
          ))}
          {/* Attribution obligatoire */}
          <li className="px-4 py-1.5 text-[9px] text-silver-dim/40 font-sans tracking-wide">
            © Base Adresse Nationale — data.gouv.fr
          </li>
        </ul>
      )}
    </div>
  )
}
