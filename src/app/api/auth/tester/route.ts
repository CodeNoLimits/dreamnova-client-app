import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

/**
 * API Route: Authentification compte testeur permanent
 * POST /api/auth/tester
 *
 * Crée le compte testeur s'il n'existe pas, puis retourne une session valide
 */
export async function POST(request: NextRequest) {
  try {
    // Vérifier que les variables d'environnement sont configurées
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    // CRITIQUE: Vérifier que les variables sont présentes
    if (!supabaseUrl) {
      console.error('❌ NEXT_PUBLIC_SUPABASE_URL manquante')
      return NextResponse.json(
        { error: 'Configuration Supabase manquante: NEXT_PUBLIC_SUPABASE_URL' },
        { status: 500 }
      )
    }

    if (!supabaseServiceKey) {
      console.error('❌ SUPABASE_SERVICE_ROLE_KEY manquante')
      return NextResponse.json(
        {
          error: 'Configuration Supabase manquante: SUPABASE_SERVICE_ROLE_KEY',
          details: 'Ajoutez SUPABASE_SERVICE_ROLE_KEY dans .env.local (trouvez-la dans Supabase Dashboard → Settings → API → service_role key)'
        },
        { status: 500 }
      )
    }

    // Créer un client Supabase avec la Service Role Key (bypass RLS)
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Email de test standard RFC (garanti d'être accepté)
    const TESTER_EMAIL = 'tester@example.com'
    const TESTER_PASSWORD = 'TesterGrowth2026!'

    // Essayer de créer le compte (si existe déjà, on gérera l'erreur)
    console.log('📝 Tentative de création du compte testeur...')
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: TESTER_EMAIL,
      password: TESTER_PASSWORD,
      email_confirm: true, // AUTO-CONFIRMER l'email (bypass)
      user_metadata: {
        company_name: 'Compte Testeur Partagé',
        is_tester: true,
      }
    })

    let userId: string

    if (createError) {
      // Si l'erreur est "User already registered", le compte existe déjà
      if (createError.message?.includes('already registered') || createError.message?.includes('already exists')) {
        console.log('ℹ️ Compte testeur existe déjà, connexion directe...')

        // Se connecter pour récupérer l'ID utilisateur
        const { data: signInData, error: signInError } = await supabaseAdmin.auth.signInWithPassword({
          email: TESTER_EMAIL,
          password: TESTER_PASSWORD,
        })

        if (signInError || !signInData.user) {
          return NextResponse.json(
            { error: 'Erreur connexion compte testeur existant', details: signInError?.message },
            { status: 500 }
          )
        }

        userId = signInData.user.id
        console.log('✅ Compte testeur existant récupéré:', userId)
      } else {
        return NextResponse.json(
          { error: 'Erreur création compte testeur', details: createError.message },
          { status: 500 }
        )
      }
    } else {
      userId = newUser.user.id
      console.log('✅ Nouveau compte testeur créé:', userId)
    }

    // Créer/mettre à jour le profil
    const { error: profileError } = await supabaseAdmin.from('profiles').upsert({
      id: userId,
      full_name: 'Testeur Growth',
      company_name: 'Compte Testeur Partagé',
    }, { onConflict: 'id' })

    if (profileError) {
      console.error('Erreur profil:', profileError)
    }

    // Créer/mettre à jour l'abonnement Growth permanent (1 an)
    const { error: subError } = await supabaseAdmin.from('subscriptions').upsert({
      user_id: userId,
      plan_type: 'growth',
      plan_name: 'GROWTH',
      status: 'active',
      started_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    }, {
      onConflict: 'user_id',
    })

    if (subError) {
      console.error('Erreur abonnement:', subError)
    } else {
      console.log('✅ Abonnement Growth configuré pour testeur:', userId)
    }

    // Se connecter avec le compte pour obtenir une session
    console.log('🔐 Connexion au compte testeur...')
    const { data: signInData, error: signInError } = await supabaseAdmin.auth.signInWithPassword({
      email: TESTER_EMAIL,
      password: TESTER_PASSWORD,
    })

    if (signInError || !signInData.session) {
      console.error('❌ Erreur connexion testeur:', signInError)
      return NextResponse.json(
        { error: 'Erreur connexion testeur', details: signInError?.message || 'Session non créée' },
        { status: 500 }
      )
    }

    console.log('✅ Session créée avec succès')

    // Retourner la session
    return NextResponse.json({
      success: true,
      session: {
        access_token: signInData.session.access_token,
        refresh_token: signInData.session.refresh_token,
        user: signInData.user,
      }
    })

  } catch (error: any) {
    console.error('Erreur API auth/tester:', error)
    return NextResponse.json(
      { error: 'Erreur serveur', details: error.message },
      { status: 500 }
    )
  }
}
