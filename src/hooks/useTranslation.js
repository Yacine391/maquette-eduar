// ── Hook useTranslation — traductions sans bibliothèque ──────────────
// La langue vient de l'URL (une page pré-rendue par langue : /, /en, /ru,
// /ro). Usage : const { t } = useTranslation(lang)
// ────────────────────────────────────────────────────────────────────
import { useCallback, useEffect } from 'react'
import { translations } from '../constants/translations'

export function useTranslation(lang = 'fr') {
  // <html lang> est écrit au pré-rendu ; on le garde aligné en développement
  useEffect(() => { document.documentElement.lang = lang }, [lang])

  // t('clé') → chaîne traduite, repli sur le français si absente
  const t = useCallback(
    (key) => translations[lang]?.[key] ?? translations.fr[key] ?? key,
    [lang]
  )

  return { t, lang }
}
