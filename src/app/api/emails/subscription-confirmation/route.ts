import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * Route API pour envoyer un email de confirmation d'abonnement
 * Utilise Supabase pour envoyer l'email (via Auth ou Edge Function)
 */
export async function POST(request: NextRequest) {
  try {
    const { email, planName, planPrice, planType } = await request.json()

    if (!email || !planName) {
      return NextResponse.json(
        { error: 'Email et planName requis' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Pour l'instant, on log l'email (à remplacer par un vrai service d'email)
    // Options: Resend, SendGrid, ou Supabase Edge Function
    console.log('📧 Email de confirmation d\'abonnement:', {
      to: email,
      planName,
      planPrice,
      planType,
    })

    // TODO: Implémenter l'envoi réel d'email via:
    // - Resend API (recommandé)
    // - SendGrid
    // - Supabase Edge Function avec service email
    // - Ou utiliser Supabase Auth email templates

    // Pour l'instant, on simule un envoi réussi
    // En production, vous devrez configurer un service d'email réel

    return NextResponse.json({
      success: true,
      message: 'Email de confirmation envoyé (simulé)',
    })
  } catch (error: any) {
    console.error('Erreur lors de l\'envoi de l\'email:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de l\'email', details: error.message },
      { status: 500 }
    )
  }
}

