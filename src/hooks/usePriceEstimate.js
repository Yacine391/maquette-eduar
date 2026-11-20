// ── Hook usePriceEstimate — estimation de prix ───────────────────────
// Aucune API appelée : lookup JS côté client dans la grille des tarifs.
// La "zone" est déduite de mots-clés dans l'adresse saisie.
// Usage : const { price, compute, reset } = usePriceEstimate()
// ────────────────────────────────────────────────────────────────────
import { useState, useCallback } from 'react'
import { priceEstimates } from '../constants/rates'

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

export function usePriceEstimate() {
  const [price, setPrice]   = useState(null)
  const [loading, setLoading] = useState(false)

  // compute({ vehicleId, dropoff }) → calcule et stocke le prix estimé
  const compute = useCallback(({ vehicleId, pickup = '', dropoff = '' }) => {
    setLoading(true)
    setTimeout(() => {
      const zone   = detectZone(pickup, dropoff)
      const table  = priceEstimates[vehicleId] ?? priceEstimates['eco']
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
