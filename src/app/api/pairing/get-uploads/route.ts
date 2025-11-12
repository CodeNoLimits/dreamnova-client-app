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

    // Récupérer les uploads associés à cette session
    const { data: uploads, error } = await supabase
      .from('mobile_uploads')
      .select('*')
      .eq('session_id', sessionId)
      .eq('processed', false)
      .order('created_at', { ascending: false })

    if (error) {
      // Si la table n'existe pas, retourner un tableau vide
      return NextResponse.json({
        uploads: [],
      })
    }

    // Marquer les uploads comme traités
    if (uploads && uploads.length > 0) {
      const uploadIds = uploads.map((u: any) => u.id)
      await supabase
        .from('mobile_uploads')
        .update({ processed: true })
        .in('id', uploadIds)
    }

    return NextResponse.json({
      uploads: uploads || [],
    })
  } catch (error) {
    console.error('Erreur récupération uploads:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

