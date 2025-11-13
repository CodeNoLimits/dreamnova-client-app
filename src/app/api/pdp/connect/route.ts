import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    console.log('📡 [API PDP] Début connexion')

    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      console.error('❌ [API PDP] Non authentifié')
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    console.log('✅ [API PDP] User:', user.email)

    const { pdp, apiKey } = await request.json()

    if (!pdp || !apiKey) {
      return NextResponse.json(
        { error: 'PDP et clé API requis' },
        { status: 400 }
      )
    }

    // TODO: Valider apiKey avec service PDP (appel API externe)
    // Pour l'instant, on accepte n'importe quelle clé (à implémenter selon le PDP)

    console.log('💾 [API PDP] Sauvegarde connexion:', pdp)

    // Sauvegarder connexion en DB
    // Désactiver les anciennes connexions du même type
    await supabase
      .from('pdp_connections')
      .update({ status: 'inactive' })
      .eq('user_id', user.id)
      .eq('pdp_name', pdp)

    // Créer nouvelle connexion
    const { data: connection, error: dbError } = await supabase
      .from('pdp_connections')
      .insert({
        user_id: user.id,
        pdp_name: pdp,
        api_key: apiKey, // ⚠️ À crypter en production avec une clé de chiffrement
        status: 'active',
      })
      .select()
      .single()

    if (dbError) {
      console.error('❌ [API PDP] Erreur DB:', dbError)
      return NextResponse.json(
        { error: 'Erreur lors de la sauvegarde', details: dbError.message },
        { status: 500 }
      )
    }

    console.log('✅ [API PDP] Connexion créée:', connection.id)

    return NextResponse.json({
      success: true,
      connection: {
        id: connection.id,
        pdp_name: connection.pdp_name,
        status: connection.status,
      },
    })
  } catch (error: any) {
    console.error('❌ [API PDP] Erreur globale:', error)
    return NextResponse.json(
      { error: 'Erreur serveur', details: error.message },
      { status: 500 }
    )
  }
}

