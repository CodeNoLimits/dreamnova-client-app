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

    // Créer la session Stripe
    const session = await createCheckoutSession({
      planId: planId as keyof typeof PLAN_CONFIGS,
      userId: user.id,
      userEmail: user.email!,
      trialDays,
      allowAlma: allowAlma && isAlmaAvailable(plan.price),
      successUrl: `${process.env.NEXT_PUBLIC_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${process.env.NEXT_PUBLIC_URL}/checkout/cancel`,
      metadata: {
        userName: profile?.full_name || 'Client DreamNova',
      },
    })

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    })
  } catch (error: any) {
    console.error('Erreur création session Stripe:', error)
    return NextResponse.json({ error: error.message || 'Erreur serveur' }, { status: 500 })
  }
}
