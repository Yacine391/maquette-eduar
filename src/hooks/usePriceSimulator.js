// ── Hook usePriceSimulator — simulation de prix ──────────────────────
// MAQUETTE : aucune API appelée. Lookup purement JS côté client.
// La "zone" est déduite de mots-clés dans l'adresse saisie.
// Usage : const { price, compute, reset } = usePriceSimulator()
// ────────────────────────────────────────────────────────────────────
import { useState, useCallback } from 'react'
import { priceSimulator } from '../constants/rates'

// Détection naive de zone d'après le texte de la destination
function detectZone(dropoff = '') {
  const d = dropoff.toLowerCase()
  if (d.includes('cdg') || d.includes('orly') || d.includes('aéroport') || d.includes('airport')) {
    return 'airport'
  }
  if (d.includes('versailles') || d.includes('vincennes') || d.includes('boulogne') || d.includes('saint-')) {
    return 'suburb'
  }
  // Heuristique distance : si l'input contient un chiffre > 100 → longue distance
  const nums = dropoff.match(/\d+/)
  if (nums && parseInt(nums[0]) > 100) return 'long'
  // Par défaut : Paris centre-ville
  return 'city'
}

export function usePriceSimulator() {
  const [price, setPrice]   = useState(null)
  const [loading, setLoading] = useState(false)

  // compute({ vehicleId, dropoff }) → calcule et stocke le prix simulé
  const compute = useCallback(({ vehicleId, dropoff }) => {
    setLoading(true)
    // Délai artificiel pour simuler un appel réseau (UX réaliste)
    setTimeout(() => {
      const zone   = detectZone(dropoff)
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
