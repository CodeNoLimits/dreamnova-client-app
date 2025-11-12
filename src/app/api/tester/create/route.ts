import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

/**
 * API Route: Créer le compte testeur permanent
 * POST /api/tester/create
 *
 * Utilise la Service Role Key pour créer un compte confirmé automatiquement
 */
export async function POST(request: NextRequest) {
  try {
    // Vérifier que les variables d'environnement sont configurées
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Configuration Supabase manquante. Veuillez configurer SUPABASE_SERVICE_ROLE_KEY dans .env.local' },
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

    const TESTER_EMAIL = 'tester@example.com'
    const TESTER_PASSWORD = 'TesterGrowth2026!'

    // Essayer de créer le compte (si existe déjà, on le signalera)
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: TESTER_EMAIL,
      password: TESTER_PASSWORD,
      email_confirm: true, // AUTO-CONFIRMER l'email
      user_metadata: {
        company_name: 'Compte Testeur Partagé',
        is_tester: true,
      }
    })

    // Si le compte existe déjà
    if (createError && (createError.message?.includes('already registered') || createError.message?.includes('already exists'))) {
      // Se connecter pour récupérer l'ID
      const { data: signInData, error: signInError } = await supabaseAdmin.auth.signInWithPassword({
        email: TESTER_EMAIL,
        password: TESTER_PASSWORD,
      })

      if (signInError || !signInData.user) {
        return NextResponse.json(
          { error: 'Erreur récupération compte existant', details: signInError?.message },
          { status: 500 }
        )
      }

      // Le compte existe déjà
      return NextResponse.json({
        success: true,
        message: 'Compte testeur existe déjà',
        user: {
          id: signInData.user.id,
          email: signInData.user.email,
        }
      })
    }

    if (createError) {
      console.error('Erreur création compte testeur:', createError)
      return NextResponse.json(
        { error: 'Erreur lors de la création du compte testeur', details: createError.message },
        { status: 500 }
      )
    }

    if (!newUser.user) {
      return NextResponse.json(
        { error: 'Utilisateur non créé' },
        { status: 500 }
      )
    }

    // Créer le profil
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .upsert({
        id: newUser.user.id,
        full_name: 'Testeur Growth',
        company_name: 'Compte Testeur Partagé',
      }, { onConflict: 'id' })

    if (profileError) {
      console.error('Erreur création profil:', profileError)
    }

    // Créer l'abonnement Growth permanent
    const { error: subError } = await supabaseAdmin
      .from('subscriptions')
      .upsert({
        user_id: newUser.user.id,
        plan_type: 'growth',
        plan_name: 'GROWTH',
        status: 'active',
        started_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 an
      }, { onConflict: 'user_id' })

    if (subError) {
      console.error('Erreur création abonnement:', subError)
    }

    return NextResponse.json({
      success: true,
      message: 'Compte testeur créé avec succès',
      user: {
        id: newUser.user.id,
        email: newUser.user.email,
      }
    })

  } catch (error: any) {
    console.error('Erreur création compte testeur:', error)
    return NextResponse.json(
      { error: 'Erreur serveur', details: error.message },
      { status: 500 }
    )
  }
}
