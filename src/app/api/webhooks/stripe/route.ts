import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { constructWebhookEvent, WEBHOOK_EVENTS } from '@/adapters/payment'
import Stripe from 'stripe'

// Initialiser Stripe pour récupérer les détails d'abonnement
const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder'
const stripe = new Stripe(stripeKey, {
  apiVersion: '2025-10-29.clover',
  typescript: true,
})

/**
 * API Route: Webhooks Stripe
 * POST /api/webhooks/stripe
 *
 * Événements gérés:
 * - checkout.session.completed → Créer/Mettre à jour l'abonnement
 * - customer.subscription.updated → Mettre à jour l'abonnement
 * - customer.subscription.deleted → Annuler l'abonnement
 * - invoice.payment_succeeded → Enregistrer le paiement
 * - invoice.payment_failed → Gérer l'échec de paiement
 */
export async function POST(request: NextRequest) {
  const supabase = await createClient()

  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json({ error: 'Signature manquante' }, { status: 400 })
    }

    // Vérifier la signature du webhook
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    if (!webhookSecret) {
      console.warn('⚠️ STRIPE_WEBHOOK_SECRET non configuré. Webhook non vérifié.')
      return NextResponse.json({ error: 'Webhook secret non configuré' }, { status: 500 })
    }
    const event = constructWebhookEvent(body, signature, webhookSecret)

    console.log('📨 Webhook Stripe reçu:', event.type)

    // Gérer les différents types d'événements
    switch (event.type) {
      case WEBHOOK_EVENTS.CHECKOUT_COMPLETED: {
        const session = event.data.object as Stripe.Checkout.Session

        const metadata = session.metadata
        const userId = metadata?.userId || session.client_reference_id
        const planId = metadata?.planId

        if (!userId) {
          console.error('❌ User ID manquant dans le webhook')
          break
        }

        // Si c'est un abonnement
        if (session.mode === 'subscription' && session.subscription) {
          // Récupérer les détails de l'abonnement Stripe pour vérifier le statut trial
          const stripeSubscription = await stripe.subscriptions.retrieve(session.subscription as string)
          const isTrialing = stripeSubscription.status === 'trialing'
          
          await supabase.from('subscriptions').upsert({
            user_id: userId,
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: session.subscription as string,
            plan_id: planId,
            plan_type: planId?.replace('-monthly', '') || planId,
            plan_name: planId ? planId.split('-')[0].toUpperCase() : null,
            status: isTrialing ? 'trialing' : 'active',
            started_at: new Date((stripeSubscription as any).current_period_start * 1000).toISOString(),
            expires_at: new Date((stripeSubscription as any).current_period_end * 1000).toISOString(),
          })

          console.log(`✅ Abonnement créé pour user: ${userId} (${isTrialing ? 'TRIAL' : 'ACTIVE'})`)
        }

        // Si c'est un paiement one-shot
        if (session.mode === 'payment' && session.payment_intent) {
          await supabase.from('subscriptions').insert({
            user_id: userId,
            stripe_customer_id: session.customer as string,
            stripe_payment_intent_id: session.payment_intent as string,
            plan_id: planId,
            status: 'paid',
            amount_paid: session.amount_total,
          })

          console.log('✅ Paiement one-shot enregistré pour user:', userId)
        }

        // TODO: Envoyer email de confirmation
        break
      }

      case WEBHOOK_EVENTS.SUBSCRIPTION_UPDATED: {
        const subscription = event.data.object as Stripe.Subscription

        await supabase
          .from('subscriptions')
          .update({
            status: subscription.status,
            current_period_start: new Date((subscription as any).current_period_start * 1000).toISOString(),
            current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end,
          })
          .eq('stripe_subscription_id', subscription.id)

        console.log('✅ Abonnement mis à jour:', subscription.id)
        break
      }

      case WEBHOOK_EVENTS.SUBSCRIPTION_DELETED: {
        const subscription = event.data.object as Stripe.Subscription

        await supabase
          .from('subscriptions')
          .update({
            status: 'canceled',
            canceled_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id)

        console.log('✅ Abonnement annulé:', subscription.id)
        // TODO: Envoyer email d'annulation
        break
      }

      case WEBHOOK_EVENTS.PAYMENT_SUCCEEDED: {
        const invoice = event.data.object as Stripe.Invoice

        console.log('✅ Paiement réussi pour invoice:', invoice.id)
        // TODO: Envoyer email de reçu
        break
      }

      case WEBHOOK_EVENTS.PAYMENT_FAILED: {
        const invoice = event.data.object as Stripe.Invoice

        console.log('❌ Paiement échoué pour invoice:', invoice.id)
        // TODO: Envoyer email d'échec + relancer le paiement
        break
      }

      default:
        console.log('⚠️ Événement non géré:', event.type)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('❌ Erreur webhook Stripe:', error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
