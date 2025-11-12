import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createPayPalOrder, PAYPAL_PLANS } from '@/adapters/payment/paypal'

/**
 * API Route: Créer un ordre PayPal
 * POST /api/checkout/paypal
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
    const { planId } = body

    if (!planId) {
      return NextResponse.json({ error: 'Plan ID requis' }, { status: 400 })
    }

    // Vérifier que le plan existe (one-shot uniquement)
    if (!(planId in PAYPAL_PLANS)) {
      return NextResponse.json({ error: 'Plan PayPal invalide' }, { status: 400 })
    }

    // Récupérer le profil utilisateur
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .single()

    // Créer l'ordre PayPal
    const result = await createPayPalOrder({
      planId: planId as keyof typeof PAYPAL_PLANS,
      userId: user.id,
      userEmail: user.email!,
      userName: profile?.full_name || 'Client DreamNova',
      successUrl: `${process.env.NEXT_PUBLIC_URL}/checkout/success?paypal_order_id={orderId}`,
      cancelUrl: `${process.env.NEXT_PUBLIC_URL}/checkout/cancel`,
    })
    
    const { orderId, approvalUrl } = result

    return NextResponse.json({
      orderId,
      approvalUrl,
    })
  } catch (error: any) {
    console.error('Erreur création ordre PayPal:', error)
    return NextResponse.json({ error: error.message || 'Erreur serveur' }, { status: 500 })
  }
}
