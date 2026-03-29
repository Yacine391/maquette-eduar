// ── Hook useTranslation — simulation i18n ────────────────────────────
// Pas de bibliothèque externe. Simple lookup dans l'objet translations.
// Usage : const { t, lang, setLang } = useTranslation()
// ────────────────────────────────────────────────────────────────────
import { useState, useCallback } from 'react'
import { translations } from '../constants/translations'

export function useTranslation() {
  // Langue active par défaut : français
  const [lang, setLang] = useState('fr')

  // t('clé') → retourne la chaîne traduite, fallback sur FR si absente
  const t = useCallback(
    (key) => translations[lang]?.[key] ?? translations['fr'][key] ?? key,
    [lang]
  )

  return { t, lang, setLang }
}
