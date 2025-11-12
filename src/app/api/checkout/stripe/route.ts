import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createCheckoutSession, PLAN_CONFIGS, isAlmaAvailable } from '@/adapters/payment'

/**
 * API Route: Créer une session de checkout Stripe
 * POST /api/checkout/stripe
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Vérifier l'authentification
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const body = await request.json()
    const { planId, trialDays, allowAlma } = body

    if (!planId) {
      return NextResponse.json({ error: 'Plan ID requis' }, { status: 400 })
    }

    // Vérifier que le plan existe
    if (!(planId in PLAN_CONFIGS)) {
      return NextResponse.json({ error: 'Plan invalide' }, { status: 400 })
    }

    const plan = PLAN_CONFIGS[planId as keyof typeof PLAN_CONFIGS]

    // Récupérer le profil utilisateur
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .single()

    // Vérifier que Stripe est bien initialisé
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes('placeholder')) {
      return NextResponse.json(
        {
          error:
            'Configuration Stripe manquante. Veuillez configurer STRIPE_SECRET_KEY dans .env.local',
        },
        { status: 500 }
      )
    }

    // Créer la session Stripe
    try {
      const session = await createCheckoutSession({
        planId: planId as keyof typeof PLAN_CONFIGS,
        userId: user.id,
        userEmail: user.email!,
        trialDays,
        allowAlma: allowAlma && isAlmaAvailable(plan.price),
        successUrl: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/checkout/cancel`,
        metadata: {
          userName: profile?.full_name || 'Client DreamNova',
        },
      })

      return NextResponse.json({
        sessionId: session.id,
        url: session.url,
      })
    } catch (stripeError: any) {
      console.error('Erreur Stripe API:', stripeError)
      // Erreur spécifique Stripe
      if (stripeError.message?.includes('Invalid API Key')) {
        return NextResponse.json(
          {
            error:
              'Clé API Stripe invalide. Veuillez vérifier votre configuration STRIPE_SECRET_KEY dans .env.local',
          },
          { status: 500 }
        )
      }
      throw stripeError
    }
  } catch (error: any) {
    console.error('Erreur création session Stripe:', error)
    return NextResponse.json(
      {
        error:
          error.message ||
          'Erreur lors de la création de la session de paiement. Veuillez réessayer.',
      },
      { status: 500 }
    )
  }
}
