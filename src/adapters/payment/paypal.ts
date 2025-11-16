/**
 * Adapter PayPal pour DreamNova Compta
 * - Paiements one-shot uniquement (8K€, 15K€, 25K€)
 * - Alternative à Stripe pour les clients préférant PayPal
 * - Pas d'abonnements (utiliser Stripe pour ça)
 */

import axios from 'axios'

// Configuration PayPal
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID!
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET!
const PAYPAL_API_BASE =
  process.env.NODE_ENV === 'production'
    ? 'https://api-m.paypal.com' // Production
    : 'https://api-m.sandbox.paypal.com' // Sandbox

/**
 * Plans disponibles pour PayPal (one-shot uniquement)
 */
export const PAYPAL_PLANS = {
  'urgence-oneshot': {
    name: 'Urgence',
    description: 'Migration urgente (2-4 semaines) + Setup PDP + Formation 2h + Support 30j',
    amount: '8500.00',
    currency: 'EUR',
  },
  'transformation-oneshot': {
    name: 'Transformation',
    description: 'Migration complète (1-2 mois) + Multi-PDP + Formation complète + Audit CSRD/NIS2 + Support 90j',
    amount: '15000.00',
    currency: 'EUR',
  },
  'premium-oneshot': {
    name: 'Premium',
    description:
      'Transformation complète (2-3 mois) + Architecture sur-mesure + Intégration ERP/CRM + Formation 3j + Support 1 an',
    amount: '25000.00',
    currency: 'EUR',
  },
}

/**
 * Interface pour les options de paiement PayPal
 */
export interface PayPalPaymentOptions {
  planId: keyof typeof PAYPAL_PLANS
  userId: string
  userEmail: string
  userName: string
  metadata?: Record<string, string>
  successUrl?: string
  cancelUrl?: string
}

/**
 * Obtenir un token d'accès PayPal
 */
async function getAccessToken(): Promise<string> {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64')

  const response = await axios.post(
    `${PAYPAL_API_BASE}/v1/oauth2/token`,
    'grant_type=client_credentials',
    {
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )

  return response.data.access_token
}

/**
 * Créer un ordre PayPal
 */
export async function createPayPalOrder(options: PayPalPaymentOptions): Promise<{
  orderId: string
  approvalUrl: string
}> {
  const {
    planId,
    userId,
    userEmail,
    userName,
    metadata = {},
    successUrl = `${process.env.NEXT_PUBLIC_URL}/checkout/success`,
    cancelUrl = `${process.env.NEXT_PUBLIC_URL}/checkout/cancel`,
  } = options

  const plan = PAYPAL_PLANS[planId]
  if (!plan) {
    throw new Error(`Plan PayPal inconnu: ${planId}`)
  }

  const accessToken = await getAccessToken()

  const orderData = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        reference_id: userId,
        description: `DreamNova Compta - ${plan.name}`,
        custom_id: JSON.stringify({
          planId,
          userId,
          userEmail,
          ...metadata,
        }),
        amount: {
          currency_code: plan.currency,
          value: plan.amount,
          breakdown: {
            item_total: {
              currency_code: plan.currency,
              value: plan.amount,
            },
          },
        },
        items: [
          {
            name: `DreamNova Compta - ${plan.name}`,
            description: plan.description,
            unit_amount: {
              currency_code: plan.currency,
              value: plan.amount,
            },
            quantity: '1',
            category: 'DIGITAL_GOODS',
          },
        ],
        payee: {
          email_address: process.env.PAYPAL_MERCHANT_EMAIL,
        },
      },
    ],
    application_context: {
      brand_name: 'DreamNova Compta',
      landing_page: 'NO_PREFERENCE',
      user_action: 'PAY_NOW',
      return_url: successUrl,
      cancel_url: cancelUrl,
      locale: 'fr-FR',
      shipping_preference: 'NO_SHIPPING',
    },
    payer: {
      name: {
        given_name: userName.split(' ')[0] || 'Client',
        surname: userName.split(' ').slice(1).join(' ') || 'DreamNova',
      },
      email_address: userEmail,
    },
  }

  const response = await axios.post(`${PAYPAL_API_BASE}/v2/checkout/orders`, orderData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const order = response.data

  // Trouver l'URL d'approbation
  const approvalLink = order.links.find((link: any) => link.rel === 'approve')

  if (!approvalLink) {
    throw new Error('URL d\'approbation PayPal non trouvée')
  }

  return {
    orderId: order.id,
    approvalUrl: approvalLink.href,
  }
}

/**
 * Capturer un paiement PayPal après approbation
 */
export async function capturePayPalOrder(orderId: string): Promise<{
  captured: boolean
  transactionId?: string
  amount?: string
  currency?: string
  payerEmail?: string
  customData?: any
}> {
  const accessToken = await getAccessToken()

  const response = await axios.post(
    `${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  const captureData = response.data

  const captured = captureData.status === 'COMPLETED'
  const purchaseUnit = captureData.purchase_units?.[0]
  const capture = purchaseUnit?.payments?.captures?.[0]
  const customId = purchaseUnit?.custom_id

  let customData = null
  if (customId) {
    try {
      customData = JSON.parse(customId)
    } catch (e) {
      console.error('Erreur parsing custom_id PayPal:', e)
    }
  }

  return {
    captured,
    transactionId: capture?.id,
    amount: capture?.amount?.value,
    currency: capture?.amount?.currency_code,
    payerEmail: captureData.payer?.email_address,
    customData,
  }
}

/**
 * Récupérer les détails d'un ordre PayPal
 */
export async function getPayPalOrderDetails(orderId: string): Promise<any> {
  const accessToken = await getAccessToken()

  const response = await axios.get(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response.data
}

/**
 * Rembourser une transaction PayPal
 */
export async function refundPayPalTransaction(
  captureId: string,
  amount?: { value: string; currency: string },
  note?: string
): Promise<{
  refunded: boolean
  refundId?: string
}> {
  const accessToken = await getAccessToken()

  const refundData: any = {}

  if (amount) {
    refundData.amount = amount
  }

  if (note) {
    refundData.note_to_payer = note
  }

  const response = await axios.post(
    `${PAYPAL_API_BASE}/v2/payments/captures/${captureId}/refund`,
    refundData,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  const refund = response.data

  return {
    refunded: refund.status === 'COMPLETED',
    refundId: refund.id,
  }
}

/**
 * Vérifier un webhook PayPal (signature)
 */
export async function verifyPayPalWebhook(
  webhookId: string,
  headers: Record<string, string>,
  body: any
): Promise<boolean> {
  const accessToken = await getAccessToken()

  const verificationData = {
    transmission_id: headers['paypal-transmission-id'],
    transmission_time: headers['paypal-transmission-time'],
    cert_url: headers['paypal-cert-url'],
    auth_algo: headers['paypal-auth-algo'],
    transmission_sig: headers['paypal-transmission-sig'],
    webhook_id: webhookId,
    webhook_event: body,
  }

  try {
    const response = await axios.post(
      `${PAYPAL_API_BASE}/v1/notifications/verify-webhook-signature`,
      verificationData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    return response.data.verification_status === 'SUCCESS'
  } catch (error) {
    console.error('Erreur vérification webhook PayPal:', error)
    return false
  }
}

/**
 * Webhooks PayPal - Types d'événements à écouter
 */
export const PAYPAL_WEBHOOK_EVENTS = {
  ORDER_COMPLETED: 'CHECKOUT.ORDER.COMPLETED',
  ORDER_APPROVED: 'CHECKOUT.ORDER.APPROVED',
  PAYMENT_CAPTURE_COMPLETED: 'PAYMENT.CAPTURE.COMPLETED',
  PAYMENT_CAPTURE_DENIED: 'PAYMENT.CAPTURE.DENIED',
  PAYMENT_CAPTURE_PENDING: 'PAYMENT.CAPTURE.PENDING',
  PAYMENT_CAPTURE_REFUNDED: 'PAYMENT.CAPTURE.REFUNDED',
  PAYMENT_CAPTURE_REVERSED: 'PAYMENT.CAPTURE.REVERSED',
} as const

/**
 * Notes pour l'intégration PayPal:
 *
 * Configuration requise:
 * 1. Créer un compte PayPal Business
 * 2. Dashboard PayPal → Apps → Create App
 * 3. Copier Client ID et Secret dans .env.local
 * 4. Configurer les webhooks (Dashboard → Webhooks)
 *
 * Variables d'environnement:
 * - PAYPAL_CLIENT_ID
 * - PAYPAL_CLIENT_SECRET
 * - PAYPAL_MERCHANT_EMAIL
 * - PAYPAL_WEBHOOK_ID
 *
 * Sandbox (test):
 * - Créer un compte sandbox sur developer.paypal.com
 * - Utiliser les comptes test Buyer/Seller
 * - API: https://api-m.sandbox.paypal.com
 *
 * Production:
 * - Vérifier que le compte est vérifié
 * - API: https://api-m.paypal.com
 *
 * Frais PayPal France:
 * - Transactions nationales: 2.9% + 0.35€
 * - Transactions internationales: 3.9% + 0.35€
 * - Pas de frais d'abonnement
 *
 * Avantages PayPal:
 * - Familier pour les clients français
 * - Protection acheteur/vendeur
 * - Multi-devises
 * - Pas besoin de créer un compte pour payer
 *
 * Inconvénients:
 * - Pas d'abonnements natifs (utiliser Stripe pour ça)
 * - Frais légèrement plus élevés que Stripe
 * - Interface admin moins moderne
 *
 * Documentation:
 * - https://developer.paypal.com/docs/api/overview/
 * - https://developer.paypal.com/docs/checkout/
 */
