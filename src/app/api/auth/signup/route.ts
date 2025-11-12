import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, password, companyName } = await request.json()

    if (!email || !password || !companyName) {
      return NextResponse.json(
        { error: 'Email, password et nom d\'entreprise requis' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Inscription
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          company_name: companyName,
        },
      },
    })

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      )
    }

    // Créer le profil utilisateur dans la table profiles
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          email: authData.user.email,
          company_name: companyName,
          created_at: new Date().toISOString(),
        })

      if (profileError) {
        console.error('Error creating profile:', profileError)
        // Ne pas échouer si le profil existe déjà
      }
    }

    return NextResponse.json({
      success: true,
      user: authData.user,
      message: 'Compte créé avec succès. Vérifiez votre email pour confirmer.',
    })
  } catch (error: any) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: error.message || 'Erreur lors de l\'inscription' },
      { status: 500 }
    )
  }
}

