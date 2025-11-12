/**
 * PDP (Plateformes de Dématérialisation Partenaires) Adapters Index
 * Centralise les exports pour les intégrations comptables
 *
 * 4 PDP supportées:
 * 1. Pennylane (PRIORITÉ #1) - API complète, Factur-X natif
 * 2. Qonto - Banking + Facturation
 * 3. Sellsy - CRM + Facturation
 * 4. Tiime - Simplicité, API en développement (Q2 2026)
 */

export * from './pennylane'
export * from './qonto'
export * from './sellsy'
export * from './tiime'

/**
 * Types de PDP disponibles
 */
export type PDPProvider = 'pennylane' | 'qonto' | 'sellsy' | 'tiime'

/**
 * Configuration des PDP
 */
export const PDP_CONFIGS = {
  pennylane: {
    name: 'Pennylane',
    apiAvailable: true,
    facturXNative: true,
    pricing: { min: 50, max: 300, currency: 'EUR/mois' },
    bestFor: ['PME', 'ETI', 'Volume élevé factures', 'API nécessaire'],
    certifiedPDP: true, // Certifié par DGFIP
    priority: 1, // Plus haute priorité
  },
  qonto: {
    name: 'Qonto',
    apiAvailable: true,
    facturXNative: false, // À vérifier
    pricing: { min: 49, max: 99, currency: 'EUR/mois' },
    bestFor: ['Startups', 'PME', 'Besoin bancaire', 'Paiements automatisés'],
    certifiedPDP: false, // Vérifier statut PDP
    priority: 2,
  },
  sellsy: {
    name: 'Sellsy',
    apiAvailable: true,
    facturXNative: false, // À vérifier
    pricing: { min: 59, max: 99, currency: 'EUR/mois' },
    bestFor: ['PME/ETI', 'Besoin CRM', 'Gestion commerciale', 'Devis + Factures'],
    certifiedPDP: false, // Vérifier statut PDP
    priority: 3,
  },
  tiime: {
    name: 'Tiime',
    apiAvailable: false, // Q2 2026
    facturXNative: false, // Prévu roadmap
    pricing: { min: 19, max: 59, currency: 'EUR/mois' },
    bestFor: ['TPE', 'Débutants', 'Budget limité', 'Simplicité'],
    certifiedPDP: false, // À venir Q4 2026
    priority: 4,
  },
} as const

/**
 * Recommander la meilleure PDP selon le profil entreprise
 */
export function recommendPDP(profile: {
  volume_mensuel: number
  secteur: string
  budget_mensuel: number
  besoin_crm: boolean
  besoin_bancaire: boolean
  niveau_expertise: 'debutant' | 'intermediaire' | 'expert'
}): PDPProvider {
  const { volume_mensuel, budget_mensuel, besoin_crm, besoin_bancaire, niveau_expertise } = profile

  // Pennylane = défaut pour la plupart des cas
  if (volume_mensuel > 100 && budget_mensuel >= 50) {
    return 'pennylane'
  }

  // Qonto si besoin bancaire
  if (besoin_bancaire && budget_mensuel >= 49) {
    return 'qonto'
  }

  // Sellsy si besoin CRM
  if (besoin_crm && budget_mensuel >= 59) {
    return 'sellsy'
  }

  // Tiime pour débutants avec petit budget
  if (niveau_expertise === 'debutant' && budget_mensuel < 50) {
    return 'tiime'
  }

  // Par défaut: Pennylane (meilleure conformité 2026)
  return 'pennylane'
}

/**
 * Vérifier si une PDP est certifiée
 */
export function isPDPCertified(provider: PDPProvider): boolean {
  return PDP_CONFIGS[provider].certifiedPDP
}

/**
 * Obtenir le prix minimum pour une PDP
 */
export function getPDPMinPrice(provider: PDPProvider): number {
  return PDP_CONFIGS[provider].pricing.min
}
