// ── Estimation du prix d'un trajet ───────────────────────────────────
// Fonction pure (sans React) : utilisée par le hook usePriceEstimate et
// par les tests (tests/priceZone.test.js).
// ────────────────────────────────────────────────────────────────────
import { priceEstimates } from '../constants/rates.js'
import { detectZone } from './priceZone.js'

/** Prix estimé (nombre en €) ou 'Sur devis' pour un trajet hors grille. */
export function estimatePrice(vehicleId, pickup, dropoff) {
  const table = priceEstimates[vehicleId] ?? priceEstimates.business
  return table[detectZone(pickup, dropoff)]
}
