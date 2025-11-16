import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Vérifier l'authentification
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const sessionId = searchParams.get('session')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID manquant' },
        { status: 400 }
      )
    }

    // Vérifier l'état de la session
    const { data: session, error } = await supabase
      .from('pairing_sessions')
      .select('*')
      .eq('id', sessionId)
      .eq('user_id', user.id)
      .single()

    if (error || !session) {
      // Si la table n'existe pas, retourner un état par défaut
      return NextResponse.json({
        isPaired: false,
        status: 'pending',
      })
    }

    // Vérifier si la session a expiré
    const expiresAt = new Date(session.expires_at)
    if (expiresAt < new Date()) {
      return NextResponse.json({
        isPaired: false,
        status: 'expired',
      })
    }

    return NextResponse.json({
      isPaired: session.status === 'paired',
      status: session.status,
      mobileDevice: session.mobile_device || null,
    })
  } catch (error) {
    console.error('Erreur vérification session:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

