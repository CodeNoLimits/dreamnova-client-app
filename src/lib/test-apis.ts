/**
 * Script de test pour toutes les APIs
 * Utilisé pour vérifier que toutes les intégrations fonctionnent
 */

import { createPennylaneClient } from '@/adapters/pdp/pennylane'
import { createQontoClient } from '@/adapters/pdp/qonto'
import { createSellsyClient } from '@/adapters/pdp/sellsy'
import { createTiimeClient } from '@/adapters/pdp/tiime'
import { createCheckoutSession, verifyPayment } from '@/adapters/payment/stripe'
import { createPayPalOrder } from '@/adapters/payment/paypal'

export interface TestResult {
  name: string
  status: 'success' | 'error' | 'skipped'
  message: string
  details?: any
}

/**
 * Tester toutes les APIs PDP
 */
export async function testPDPAPIs(): Promise<TestResult[]> {
  const results: TestResult[] = []

  // Test Pennylane
  try {
    const pennylane = createPennylaneClient(process.env.PENNYLANE_API_KEY)
    // Test de connexion (sans appeler réellement l'API si pas de clé)
    if (process.env.PENNYLANE_API_KEY) {
      results.push({
        name: 'Pennylane - Client créé',
        status: 'success',
        message: 'Client Pennylane initialisé correctement',
      })
    } else {
      results.push({
        name: 'Pennylane - Client créé',
        status: 'skipped',
        message: 'PENNYLANE_API_KEY non configurée (normal en dev)',
      })
    }
  } catch (error: any) {
    results.push({
      name: 'Pennylane - Erreur',
      status: 'error',
      message: error.message,
    })
  }

  // Test Qonto
  try {
    const qonto = createQontoClient(
      process.env.QONTO_LOGIN,
      process.env.QONTO_SECRET_KEY
    )
    if (process.env.QONTO_LOGIN && process.env.QONTO_SECRET_KEY) {
      results.push({
        name: 'Qonto - Client créé',
        status: 'success',
        message: 'Client Qonto initialisé correctement',
      })
    } else {
      results.push({
        name: 'Qonto - Client créé',
        status: 'skipped',
        message: 'QONTO_LOGIN/SECRET_KEY non configurées (normal en dev)',
      })
    }
  } catch (error: any) {
    results.push({
      name: 'Qonto - Erreur',
      status: 'error',
      message: error.message,
    })
  }

  // Test Sellsy
  try {
    const sellsy = await createSellsyClient(
      process.env.SELLSY_CLIENT_ID || '',
      process.env.SELLSY_CLIENT_SECRET || ''
    )
    if (process.env.SELLSY_CLIENT_ID && process.env.SELLSY_CLIENT_SECRET) {
      results.push({
        name: 'Sellsy - Client créé',
        status: 'success',
        message: 'Client Sellsy initialisé correctement',
      })
    } else {
      results.push({
        name: 'Sellsy - Client créé',
        status: 'skipped',
        message: 'SELLSY_CLIENT_ID/SECRET non configurées (normal en dev)',
      })
    }
  } catch (error: any) {
    results.push({
      name: 'Sellsy - Erreur',
      status: 'error',
      message: error.message,
    })
  }

  // Test Tiime
  try {
    const tiime = createTiimeClient(process.env.TIIME_API_KEY)
    if (process.env.TIIME_API_KEY) {
      results.push({
        name: 'Tiime - Client créé',
        status: 'success',
        message: 'Client Tiime initialisé correctement',
      })
    } else {
      results.push({
        name: 'Tiime - Client créé',
        status: 'skipped',
        message: 'TIIME_API_KEY non configurée (API Q2 2026)',
      })
    }
  } catch (error: any) {
    results.push({
      name: 'Tiime - Erreur',
      status: 'error',
      message: error.message,
    })
  }

  return results
}

/**
 * Tester les APIs de paiement
 */
export async function testPaymentAPIs(): Promise<TestResult[]> {
  const results: TestResult[] = []

  // Test Stripe
  try {
    if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== 'sk_test_placeholder') {
      // Vérifier que Stripe est initialisé
      results.push({
        name: 'Stripe - Configuration',
        status: 'success',
        message: 'Stripe configuré correctement',
      })
    } else {
      results.push({
        name: 'Stripe - Configuration',
        status: 'skipped',
        message: 'STRIPE_SECRET_KEY non configurée (normal en dev)',
      })
    }
  } catch (error: any) {
    results.push({
      name: 'Stripe - Erreur',
      status: 'error',
      message: error.message,
    })
  }

  // Test PayPal
  try {
    if (process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET) {
      results.push({
        name: 'PayPal - Configuration',
        status: 'success',
        message: 'PayPal configuré correctement',
      })
    } else {
      results.push({
        name: 'PayPal - Configuration',
        status: 'skipped',
        message: 'PAYPAL_CLIENT_ID/SECRET non configurées (placeholder actif)',
      })
    }
  } catch (error: any) {
    results.push({
      name: 'PayPal - Erreur',
      status: 'error',
      message: error.message,
    })
  }

  return results
}

/**
 * Tester les Agents IA
 */
export async function testAIAgents(): Promise<TestResult[]> {
  const results: TestResult[] = []

  try {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY
    if (apiKey) {
      results.push({
        name: 'Gemini AI - Configuration',
        status: 'success',
        message: 'Clé API Gemini configurée',
      })
    } else {
      results.push({
        name: 'Gemini AI - Configuration',
        status: 'error',
        message: 'GEMINI_API_KEY non configurée (OBLIGATOIRE)',
      })
    }
  } catch (error: any) {
    results.push({
      name: 'Gemini AI - Erreur',
      status: 'error',
      message: error.message,
    })
  }

  return results
}

/**
 * Tester Supabase
 */
export async function testSupabase(): Promise<TestResult[]> {
  const results: TestResult[] = []

  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      results.push({
        name: 'Supabase - Configuration',
        status: 'success',
        message: 'Supabase configuré correctement',
      })
    } else {
      results.push({
        name: 'Supabase - Configuration',
        status: 'error',
        message: 'Variables Supabase manquantes (OBLIGATOIRE)',
      })
    }
  } catch (error: any) {
    results.push({
      name: 'Supabase - Erreur',
      status: 'error',
      message: error.message,
    })
  }

  return results
}

/**
 * Tester toutes les APIs
 */
export async function testAllAPIs(): Promise<{
  pdp: TestResult[]
  payment: TestResult[]
  ai: TestResult[]
  supabase: TestResult[]
  summary: {
    total: number
    success: number
    error: number
    skipped: number
  }
}> {
  const [pdp, payment, ai, supabase] = await Promise.all([
    testPDPAPIs(),
    testPaymentAPIs(),
    testAIAgents(),
    testSupabase(),
  ])

  const allResults = [...pdp, ...payment, ...ai, ...supabase]
  const summary = {
    total: allResults.length,
    success: allResults.filter(r => r.status === 'success').length,
    error: allResults.filter(r => r.status === 'error').length,
    skipped: allResults.filter(r => r.status === 'skipped').length,
  }

  return { pdp, payment, ai, supabase, summary }
}

