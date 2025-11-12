/**
 * Utilitaires pour gérer les abonnements et fonctionnalités
 */

export type PlanType = 'starter' | 'growth' | 'premium-monthly' | 'urgence' | 'transformation' | 'premium' | 'trial'

/**
 * Vérifie si un plan est en période d'essai
 */
export function isTrialPlan(planType: PlanType | null, startedAt: string | null): boolean {
  if (!planType || planType === 'trial') return true
  if (!startedAt) return false
  
  // Si started_at est récent (< 7 jours), c'est un essai
  const start = new Date(startedAt)
  const now = new Date()
  const daysSinceStart = (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  
  return daysSinceStart >= 0 && daysSinceStart < 7
}

export interface SubscriptionFeatures {
  // Limites
  maxInvoicesPerMonth: number
  maxPDPConnections: number
  
  // Fonctionnalités
  hasAdvancedDashboard: boolean
  hasPDFReports: boolean
  hasFacturXConversion: boolean
  hasMultipleWorkflows: boolean
  hasAPIAccess: boolean
  hasPrioritySupport: boolean
  hasDedicatedManager: boolean
  
  // Support
  supportLevel: 'email' | 'priority' | '24/7'
  supportResponseTime: string
}

/**
 * Vérifie si un email a accès maximum (admin/testeur)
 */
export function hasMaxAccess(email: string | null | undefined): boolean {
  if (!email) return false
  // manubousky@gmail.com a accès maximum
  return email.toLowerCase() === 'manubousky@gmail.com'
}

/**
 * Définit les fonctionnalités disponibles pour chaque plan
 */
export function getPlanFeatures(planType: PlanType | null, isTrial: boolean = false, userEmail?: string | null): SubscriptionFeatures {
  // Accès maximum pour manubousky@gmail.com
  if (hasMaxAccess(userEmail)) {
    return {
      maxInvoicesPerMonth: -1, // Illimité
      maxPDPConnections: -1, // Illimité
      hasAdvancedDashboard: true,
      hasPDFReports: true,
      hasFacturXConversion: true,
      hasMultipleWorkflows: true,
      hasAPIAccess: true,
      hasPrioritySupport: true,
      hasDedicatedManager: true,
      supportLevel: '24/7',
      supportResponseTime: 'Immédiat',
    }
  }

  // Par défaut, plan gratuit (aucun abonnement)
  if (!planType) {
    return {
      maxInvoicesPerMonth: 0,
      maxPDPConnections: 0,
      hasAdvancedDashboard: false,
      hasPDFReports: false,
      hasFacturXConversion: false,
      hasMultipleWorkflows: false,
      hasAPIAccess: false,
      hasPrioritySupport: false,
      hasDedicatedManager: false,
      supportLevel: 'email',
      supportResponseTime: '48h',
    }
  }

  // Période d'essai = accès à toutes les fonctionnalités Growth
  if (isTrial || planType === 'trial') {
    return {
      maxInvoicesPerMonth: 200,
      maxPDPConnections: 3,
      hasAdvancedDashboard: true,
      hasPDFReports: true,
      hasFacturXConversion: true,
      hasMultipleWorkflows: true,
      hasAPIAccess: false,
      hasPrioritySupport: true,
      hasDedicatedManager: false,
      supportLevel: 'priority',
      supportResponseTime: '24h',
    }
  }

  switch (planType) {
    case 'starter':
      return {
        maxInvoicesPerMonth: 50,
        maxPDPConnections: 1,
        hasAdvancedDashboard: false,
        hasPDFReports: false,
        hasFacturXConversion: false,
        hasMultipleWorkflows: false,
        hasAPIAccess: false,
        hasPrioritySupport: false,
        hasDedicatedManager: false,
        supportLevel: 'email',
        supportResponseTime: '48h',
      }

    case 'growth':
      return {
        maxInvoicesPerMonth: 200,
        maxPDPConnections: 3,
        hasAdvancedDashboard: true,
        hasPDFReports: true,
        hasFacturXConversion: true,
        hasMultipleWorkflows: true,
        hasAPIAccess: false,
        hasPrioritySupport: true,
        hasDedicatedManager: false,
        supportLevel: 'priority',
        supportResponseTime: '24h',
      }

    case 'premium-monthly':
      return {
        maxInvoicesPerMonth: -1, // Illimité
        maxPDPConnections: -1, // Illimité
        hasAdvancedDashboard: true,
        hasPDFReports: true,
        hasFacturXConversion: true,
        hasMultipleWorkflows: true,
        hasAPIAccess: true,
        hasPrioritySupport: true,
        hasDedicatedManager: true,
        supportLevel: '24/7',
        supportResponseTime: 'Immédiat',
      }

    case 'urgence':
    case 'transformation':
    case 'premium':
      // Plans one-shot ont toutes les fonctionnalités pendant la période de support
      return {
        maxInvoicesPerMonth: -1, // Illimité pendant la période
        maxPDPConnections: -1, // Illimité
        hasAdvancedDashboard: true,
        hasPDFReports: true,
        hasFacturXConversion: true,
        hasMultipleWorkflows: true,
        hasAPIAccess: planType === 'premium',
        hasPrioritySupport: true,
        hasDedicatedManager: planType === 'premium',
        supportLevel: 'priority',
        supportResponseTime: '24h',
      }

    default:
      return getPlanFeatures(null)
  }
}

/**
 * Vérifie si l'utilisateur a accès à une fonctionnalité
 */
export function hasFeatureAccess(
  planType: PlanType | null,
  feature: keyof SubscriptionFeatures,
  isTrial: boolean = false,
  userEmail?: string | null
): boolean {
  const features = getPlanFeatures(planType, isTrial, userEmail)
  return features[feature] === true || (typeof features[feature] === 'number' && features[feature] > 0)
}

/**
 * Vérifie si l'utilisateur peut utiliser une fonctionnalité avec limite
 */
export function canUseFeature(
  planType: PlanType | null,
  feature: 'invoices' | 'pdp',
  currentUsage: number,
  isTrial: boolean = false,
  userEmail?: string | null
): boolean {
  const features = getPlanFeatures(planType, isTrial, userEmail)
  
  if (feature === 'invoices') {
    return features.maxInvoicesPerMonth === -1 || currentUsage < features.maxInvoicesPerMonth
  }
  
  if (feature === 'pdp') {
    return features.maxPDPConnections === -1 || currentUsage < features.maxPDPConnections
  }
  
  return false
}

