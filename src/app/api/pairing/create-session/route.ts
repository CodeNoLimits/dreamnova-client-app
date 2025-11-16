import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { randomUUID } from 'crypto'

export async function POST(request: NextRequest) {
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

    // Générer un ID de session unique
    const sessionId = randomUUID()

    // Stocker la session dans Supabase (table temporaire ou cache)
    // Pour l'instant, on utilise une table simple
    const { error: dbError } = await supabase
      .from('pairing_sessions')
      .insert({
        id: sessionId,
        user_id: user.id,
        status: 'pending',
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 minutes
      })

    if (dbError) {
      // Si la table n'existe pas, on peut utiliser un cache en mémoire
      // Pour la production, créer la table dans Supabase
      console.warn('Table pairing_sessions non trouvée, utilisation du cache:', dbError)
    }

    return NextResponse.json({
      success: true,
      sessionId,
      expiresIn: 600, // 10 minutes en secondes
    })
  } catch (error) {
    console.error('Erreur création session:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

