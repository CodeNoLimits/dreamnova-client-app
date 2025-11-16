import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { sessionId, deviceInfo } = await request.json()

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID manquant' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Mettre à jour la session pour indiquer qu'elle est appairée
    const { data: session, error: sessionError } = await supabase
      .from('pairing_sessions')
      .select('user_id')
      .eq('id', sessionId)
      .single()

    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Session invalide ou expirée' },
        { status: 404 }
      )
    }

    // Mettre à jour le statut de la session
    const { error: updateError } = await supabase
      .from('pairing_sessions')
      .update({
        status: 'paired',
        mobile_device: deviceInfo || 'Mobile Device',
        paired_at: new Date().toISOString(),
      })
      .eq('id', sessionId)

    if (updateError) {
      console.error('Erreur mise à jour session:', updateError)
      return NextResponse.json(
        { error: 'Erreur lors du pairing' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Téléphone connecté avec succès',
    })
  } catch (error) {
    console.error('Erreur pairing mobile:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

