/**
 * Gestion des limites de conversion de documents
 * - Utilisateurs gratuits: 2 documents/mois
 * - Utilisateurs payants: Illimité
 */

import { createClient } from '@/lib/supabase/server'
import { PlanType } from './subscription'

export interface ConversionLimitResult {
  allowed: boolean
  remaining: number
  total: number
  isPaid: boolean
  reason?: string
}

/**
 * Vérifie si l'utilisateur peut convertir un document
 */
export async function checkConversionLimit(userId: string): Promise<ConversionLimitResult> {
  const supabase = await createClient()

  // 1. Vérifier l'abonnement
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('plan_type, status')
    .eq('user_id', userId)
    .eq('status', 'active')
    .single()

  // Vérifier si c'est testeur ou manubousky (accès max)
  const { data: { user } } = await supabase.auth.getUser()
  const email = user?.email?.toLowerCase()
  const isMaxAccess = email === 'tester@example.com' || email === 'manubousky@gmail.com'

  // Si utilisateur payant ou accès max → illimité
  const isPaid = !!subscription || isMaxAccess

  if (isPaid) {
    return {
      allowed: true,
      remaining: -1, // Illimité
      total: -1,
      isPaid: true,
    }
  }

  // 2. Utilisateur gratuit → compter les conversions ce mois
  const FREE_LIMIT = 2
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const { count, error } = await supabase
    .from('documents')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', startOfMonth.toISOString())

  if (error) {
    console.error('Erreur comptage documents:', error)
    return {
      allowed: false,
      remaining: 0,
      total: FREE_LIMIT,
      isPaid: false,
      reason: 'Erreur lors de la vérification des limites',
    }
  }

  const used = count || 0
  const remaining = Math.max(0, FREE_LIMIT - used)
  const allowed = remaining > 0

  return {
    allowed,
    remaining,
    total: FREE_LIMIT,
    isPaid: false,
    reason: allowed
      ? undefined
      : `Limite atteinte (${FREE_LIMIT} documents/mois). Passez à un plan payant pour un accès illimité.`,
  }
}

/**
 * Récupère les stats de conversion pour l'utilisateur
 */
export async function getConversionStats(userId: string) {
  const supabase = await createClient()

  // Conversions ce mois
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const { count: thisMonth } = await supabase
    .from('documents')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', startOfMonth.toISOString())

  // Total conversions
  const { count: total } = await supabase
    .from('documents')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)

  // Par format
  const { data: byFormat } = await supabase
    .from('documents')
    .select('converted_format')
    .eq('user_id', userId)
    .not('converted_format', 'is', null)

  const formatCounts: Record<string, number> = {}
  byFormat?.forEach(doc => {
    if (doc.converted_format) {
      formatCounts[doc.converted_format] = (formatCounts[doc.converted_format] || 0) + 1
    }
  })

  return {
    thisMonth: thisMonth || 0,
    total: total || 0,
    byFormat: formatCounts,
  }
}
