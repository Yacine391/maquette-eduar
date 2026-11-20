// ── Hook usePriceEstimate — estimation de prix ───────────────────────
// Aucune API appelée : lookup JS côté client dans la grille des tarifs.
// Zone tarifaire : voir src/utils/priceZone.js ; prix : src/constants/rates.js
// Usage : const { price, compute, reset } = usePriceEstimate()
// ────────────────────────────────────────────────────────────────────
import { useState, useCallback } from 'react'
import { estimatePrice } from '../utils/estimatePrice'

export function usePriceEstimate() {
  const [price, setPrice]   = useState(null)
  const [loading, setLoading] = useState(false)

  // compute({ vehicleId, pickup, dropoff }) → calcule et stocke le prix estimé
  const compute = useCallback(({ vehicleId, pickup = '', dropoff = '' }) => {
    setLoading(true)
    setTimeout(() => {
      setPrice(estimatePrice(vehicleId, pickup, dropoff))
      setLoading(false)
    }, 600)
  }, [])

  const reset = useCallback(() => {
    setPrice(null)
    setLoading(false)
  }, [])

  return { price, loading, compute, reset }
}
