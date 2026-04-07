// ── Hook usePriceSimulator — simulation de prix ──────────────────────
// MAQUETTE : aucune API appelée. Lookup purement JS côté client.
// La "zone" est déduite de mots-clés dans l'adresse saisie.
// Usage : const { price, compute, reset } = usePriceSimulator()
// ────────────────────────────────────────────────────────────────────
import { useState, useCallback } from 'react'
import { priceSimulator } from '../constants/rates'

// Détection de zone — vérifie pickup ET dropoff
function detectZone(pickup = '', dropoff = '') {
  const text = (pickup + ' ' + dropoff).toLowerCase()
  // CDG (Roissy) — plus loin que Orly
  if (text.includes('cdg') || text.includes('roissy') || text.includes('charles de gaulle')) {
    return 'cdg'
  }
  // Orly
  if (text.includes('orly')) {
    return 'orly'
  }
  // Beauvais / banlieue éloignée
  if (text.includes('beauvais') || text.includes('vincennes') || text.includes('boulogne') || text.includes('saint-')) {
    return 'suburb'
  }
  // Longue distance
  const nums = (pickup + ' ' + dropoff).match(/\d+/)
  if (nums && parseInt(nums[0]) > 100) return 'long'
  // Paris intra-muros par défaut
  return 'city'
}

export function usePriceSimulator() {
  const [price, setPrice]   = useState(null)
  const [loading, setLoading] = useState(false)

  // compute({ vehicleId, dropoff }) → calcule et stocke le prix simulé
  const compute = useCallback(({ vehicleId, pickup = '', dropoff = '' }) => {
    setLoading(true)
    setTimeout(() => {
      const zone   = detectZone(pickup, dropoff)
      const table  = priceSimulator[vehicleId] ?? priceSimulator['eco']
      const result = table[zone] ?? table['city']
      setPrice(result)
      setLoading(false)
    }, 600)
  }, [])

  const reset = useCallback(() => {
    setPrice(null)
    setLoading(false)
  }, [])

  return { price, loading, compute, reset }
}
