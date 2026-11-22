// ── Hook useTranslation — traductions sans bibliothèque ──────────────
// Pas de bibliothèque externe. Simple lookup dans l'objet translations.
// Usage : const { t, lang, setLang } = useTranslation()
// ────────────────────────────────────────────────────────────────────
import { useState, useCallback, useEffect } from 'react'
import { translations } from '../constants/translations'

export function useTranslation() {
  // Langue active par défaut : français
  const [lang, setLang] = useState('fr')

  // L'attribut lang de <html> suit la langue affichée (lecteurs d'écran, SEO)
  useEffect(() => { document.documentElement.lang = lang }, [lang])

  // t('clé') → retourne la chaîne traduite, fallback sur FR si absente
  const t = useCallback(
    (key) => translations[lang]?.[key] ?? translations['fr'][key] ?? key,
    [lang]
  )

  return { t, lang, setLang }
}
