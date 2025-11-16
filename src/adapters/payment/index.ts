/**
 * Payment Adapters Index
 * Centralise les exports pour les intégrations paiement
 */

// Stripe (abonnements + one-shot + Alma)
export * from './stripe'

// PayPal (one-shot uniquement)
export * from './paypal'

/**
 * Choisir le provider de paiement selon le type
 */
export function getPaymentProvider(planId: string): 'stripe' | 'paypal' {
  // Plans mensuels → toujours Stripe (abonnements)
  if (planId.includes('monthly')) {
    return 'stripe'
  }

  // Plans one-shot → client peut choisir
  // Par défaut Stripe (avec Alma disponible)
  return 'stripe'
}

/**
 * Déterminer si Alma est disponible pour ce montant
 */
export function isAlmaAvailable(amount: number): boolean {
  // Alma disponible pour montants entre 50€ et 20,000€
  return amount >= 5000 && amount <= 2000000 // en centimes
}
