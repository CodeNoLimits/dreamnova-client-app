/**
 * Adapter Stripe pour DreamNova Compta
 * - Abonnements mensuels (STARTER 50€, GROWTH 80€, PREMIUM 180€)
 * - Paiements one-shot avec Alma (split 3-4x)
 * - Customer Portal pour gestion abonnements
 * - Webhooks pour automatisation
 */

import Stripe from 'stripe'

// Initialisation Stripe (avec fallback si clé manquante)
const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder'
const stripe = new Stripe(stripeKey, {
  apiVersion: '2025-10-29.clover',
  typescript: true,
})

// IDs des prix Stripe (à créer dans le dashboard Stripe)
export const STRIPE_PRICES = {
  // Plans mensuels (abonnements)
  STARTER_MONTHLY: process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER || 'price_starter_monthly',
  GROWTH_MONTHLY: process.env.NEXT_PUBLIC_STRIPE_PRICE_GROWTH || 'price_growth_monthly',
  PREMIUM_MONTHLY: process.env.NEXT_PUBLIC_STRIPE_PRICE_PREMIUM || 'price_premium_monthly',

  // Plans one-shot (avec Alma disponible)
  URGENCE_ONESHOT: process.env.NEXT_PUBLIC_STRIPE_PRICE_URGENCE || 'price_urgence_oneshot',
  TRANSFORMATION_ONESHOT: process.env.NEXT_PUBLIC_STRIPE_PRICE_TRANSFORMATION || 'price_transformation_oneshot',
  PREMIUM_ONESHOT: process.env.NEXT_PUBLIC_STRIPE_PRICE_PREMIUM_ONESHOT || 'price_premium_oneshot',
}

// Mapping des plans
export const PLAN_CONFIGS = {
  'starter-monthly': {
    name: 'Starter',
    price: 5000, // 50.00€ en centimes
    currency: 'eur',
    interval: 'month' as const,
    priceId: STRIPE_PRICES.STARTER_MONTHLY,
    features: [
      'Audit de conformité complet',
      'Connexion 1 PDP (Pennylane, Tiime, Qonto, Sellsy)',
      'Dashboard basique',
      '100 factures/mois',
      'Support email',
    ],
  },
  'growth-monthly': {
    name: 'Growth',
    price: 8000, // 80.00€
    currency: 'eur',
    interval: 'month' as const,
    priceId: STRIPE_PRICES.GROWTH_MONTHLY,
    features: [
      'Tout du plan Starter',
      'Connexion 3 PDP simultanées',
      'Dashboard avancé avec graphiques',
      '500 factures/mois',
      'Conversion Factur-X automatique',
      'Rapports PDF personnalisés',
      'Support prioritaire',
    ],
  },
  'premium-monthly': {
    name: 'Premium',
    price: 18000, // 180.00€
    currency: 'eur',
    interval: 'month' as const,
    priceId: STRIPE_PRICES.PREMIUM_MONTHLY,
    features: [
      'Tout du plan Growth',
      'Connexion PDP illimitées',
      'Factures illimitées',
      'API dédiée',
      'Conformité NIS2 + CSRD',
      'Support 24/7',
      'Gestionnaire de compte dédié',
    ],
  },
  'urgence-oneshot': {
    name: 'Urgence',
    price: 850000, // 8500.00€
    currency: 'eur',
    interval: null,
    priceId: STRIPE_PRICES.URGENCE_ONESHOT,
    features: [
      'Migration urgente (2-4 semaines)',
      'Setup PDP certifiée',
      'Formation équipe (2h)',
      'Support 30 jours',
    ],
  },
  'transformation-oneshot': {
    name: 'Transformation',
    price: 1500000, // 15000.00€
    currency: 'eur',
    interval: null,
    priceId: STRIPE_PRICES.TRANSFORMATION_ONESHOT,
    features: [
      'Migration complète (1-2 mois)',
      'Setup multi-PDP',
      'Formation équipe complète (1 jour)',
      'Audit CSRD + NIS2',
      'Support 90 jours',
    ],
  },
  'premium-oneshot': {
    name: 'Premium',
    price: 2500000, // 25000.00€
    currency: 'eur',
    interval: null,
    priceId: STRIPE_PRICES.PREMIUM_ONESHOT,
    features: [
      'Transformation complète (2-3 mois)',
      'Architecture sur-mesure',
      'Intégration ERP/CRM',
      'Conformité totale 2026',
      'Formation avancée (3 jours)',
      'Support 1 an',
      'Gestionnaire de compte dédié',
    ],
  },
}

/**
 * Interface pour les options de checkout
 */
export interface CheckoutOptions {
  planId: keyof typeof PLAN_CONFIGS
  userId: string
  userEmail: string
  metadata?: Record<string, string>
  successUrl?: string
  cancelUrl?: string
  allowAlma?: boolean // Pour activer le split payment Alma
  trialDays?: number // Pour les abonnements mensuels
}

/**
 * Créer une session de checkout Stripe
 * Supporte les abonnements ET les paiements one-shot avec Alma
 */
export async function createCheckoutSession(options: CheckoutOptions): Promise<Stripe.Checkout.Session> {
  const {
    planId,
    userId,
    userEmail,
    metadata = {},
    successUrl = `${process.env.NEXT_PUBLIC_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl = `${process.env.NEXT_PUBLIC_URL}/checkout/cancel`,
    allowAlma = false,
    trialDays,
  } = options

  const plan = PLAN_CONFIGS[planId]
  if (!plan) {
    throw new Error(`Plan inconnu: ${planId}`)
  }

  // Déterminer les moyens de paiement
  const paymentMethodTypes: Stripe.Checkout.SessionCreateParams.PaymentMethodType[] = ['card']

  // Ajouter Alma pour les paiements one-shot (≥1000€)
  if (allowAlma && !plan.interval && plan.price >= 100000) {
    // Alma est disponible dans Stripe comme "customer_balance"
    // Mais pour split payment 3-4x, utiliser l'intégration native Alma
    paymentMethodTypes.push('customer_balance')
  }

  // Paramètres communs
  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    payment_method_types: paymentMethodTypes,
    line_items: [
      {
        price_data: {
          currency: plan.currency,
          product_data: {
            name: `DreamNova Compta - ${plan.name}`,
            description: plan.features.join(' • '),
            images: [`${process.env.NEXT_PUBLIC_URL}/images/logo-dreamnova.png`],
          },
          unit_amount: plan.price,
          ...(plan.interval && {
            recurring: {
              interval: plan.interval,
              interval_count: 1,
            },
          }),
        },
        quantity: 1,
      },
    ],
    mode: plan.interval ? 'subscription' : 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    client_reference_id: userId,
    customer_email: userEmail,
    metadata: {
      planId,
      userId,
      ...metadata,
    },
    // Activer le Customer Portal pour les abonnements
    ...(plan.interval && {
      subscription_data: {
        trial_period_days: trialDays || 0,
        metadata: {
          planId,
          userId,
        },
      },
    }),
    // Collecter l'adresse de facturation
    billing_address_collection: 'required',
    // Autoriser les codes promotionnels
    allow_promotion_codes: true,
    // Langue française
    locale: 'fr',
  }

  const session = await stripe.checkout.sessions.create(sessionParams)

  return session
}

/**
 * Vérifier le statut d'un paiement
 */
export async function verifyPayment(sessionId: string): Promise<{
  paid: boolean
  customerId?: string
  subscriptionId?: string
  paymentIntentId?: string
}> {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['customer', 'subscription', 'payment_intent'],
  })

  return {
    paid: session.payment_status === 'paid',
    customerId: typeof session.customer === 'string' ? session.customer : session.customer?.id,
    subscriptionId: typeof session.subscription === 'string' ? session.subscription : session.subscription?.id,
    paymentIntentId:
      typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id,
  }
}

/**
 * Créer un lien vers le Customer Portal
 * Permet aux clients de gérer leur abonnement (changement plan, annulation, etc.)
 */
export async function createCustomerPortalSession(customerId: string, returnUrl?: string): Promise<string> {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl || `${process.env.NEXT_PUBLIC_URL}/dashboard`,
  })

  return session.url
}

/**
 * Annuler un abonnement à la fin de la période
 */
export async function cancelSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
  return await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  })
}

/**
 * Annuler un abonnement immédiatement
 */
export async function cancelSubscriptionImmediately(subscriptionId: string): Promise<Stripe.Subscription> {
  return await stripe.subscriptions.cancel(subscriptionId)
}

/**
 * Mettre à jour un abonnement (changement de plan)
 */
export async function updateSubscription(
  subscriptionId: string,
  newPriceId: string
): Promise<Stripe.Subscription> {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  return await stripe.subscriptions.update(subscriptionId, {
    items: [
      {
        id: subscription.items.data[0].id,
        price: newPriceId,
      },
    ],
    proration_behavior: 'create_prorations', // Proratiser le changement
  })
}

/**
 * Récupérer les détails d'un abonnement
 */
export async function getSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
  return await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ['customer', 'default_payment_method'],
  })
}

/**
 * Récupérer tous les abonnements d'un client
 */
export async function getCustomerSubscriptions(customerId: string): Promise<Stripe.Subscription[]> {
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: 'all',
    expand: ['data.default_payment_method'],
  })

  return subscriptions.data
}

/**
 * Créer un client Stripe
 */
export async function createCustomer(email: string, name: string, metadata?: Record<string, string>): Promise<Stripe.Customer> {
  return await stripe.customers.create({
    email,
    name,
    metadata,
  })
}

/**
 * Webhooks Stripe - Types d'événements à écouter
 */
export const WEBHOOK_EVENTS = {
  CHECKOUT_COMPLETED: 'checkout.session.completed',
  SUBSCRIPTION_CREATED: 'customer.subscription.created',
  SUBSCRIPTION_UPDATED: 'customer.subscription.updated',
  SUBSCRIPTION_DELETED: 'customer.subscription.deleted',
  PAYMENT_SUCCEEDED: 'invoice.payment_succeeded',
  PAYMENT_FAILED: 'invoice.payment_failed',
} as const

/**
 * Construire un événement webhook Stripe (avec vérification signature)
 */
export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string,
  secret: string
): Stripe.Event {
  return stripe.webhooks.constructEvent(payload, signature, secret)
}

/**
 * Exporter l'instance Stripe pour usage avancé
 */
export { stripe }

/**
 * Notes pour l'intégration Alma:
 *
 * Alma est disponible directement dans Stripe depuis 2024.
 * Pour activer Alma:
 * 1. Dashboard Stripe → Settings → Payment methods
 * 2. Activer "Buy now, pay later" → Alma
 * 3. Configurer les split payment (2x, 3x, 4x)
 * 4. Alma apparaît automatiquement au checkout pour montants ≥50€
 *
 * Montants Alma:
 * - Minimum: 50€
 * - Maximum: 20,000€
 * - Split disponibles: 2x, 3x, 4x (jusqu'à 12x pour B2B)
 *
 * Commission Alma:
 * - 2x: ~1.5% + 0.25€
 * - 3x: ~2.5% + 0.25€
 * - 4x: ~3.5% + 0.25€
 *
 * Documentation:
 * - https://stripe.com/docs/payments/alma
 * - https://docs.almapay.com/
 */
