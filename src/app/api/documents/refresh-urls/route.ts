import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * Route pour régénérer les URLs signées des documents
 * Les URLs signées expirent après 1 an, cette route permet de les renouveler
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Vérifier l'authentification
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    // Récupérer tous les documents de l'utilisateur
    const { data: documents, error: fetchError } = await supabase
      .from('documents')
      .select('id, file_url')
      .eq('user_id', user.id)

    if (fetchError) {
      return NextResponse.json(
        { error: 'Erreur récupération documents', details: fetchError.message },
        { status: 500 }
      )
    }

    if (!documents || documents.length === 0) {
      return NextResponse.json({ message: 'Aucun document à rafraîchir', updated: 0 })
    }

    let updated = 0
    const errors: string[] = []

    // Rafraîchir chaque URL
    for (const doc of documents) {
      try {
        // Extraire le chemin du fichier depuis l'ancienne URL
        const urlObj = new URL(doc.file_url)
        const pathMatch = urlObj.pathname.match(/\/storage\/v1\/object\/sign\/documents\/(.+)/)

        if (!pathMatch) {
          errors.push(`Document ${doc.id}: Impossible d'extraire le chemin`)
          continue
        }

        const filePath = decodeURIComponent(pathMatch[1])

        // Générer nouvelle URL signée
        const { data: urlData, error: urlError } = await supabase.storage
          .from('documents')
          .createSignedUrl(filePath, 31536000) // 1 an

        if (urlError || !urlData) {
          errors.push(`Document ${doc.id}: ${urlError?.message || 'Erreur inconnue'}`)
          continue
        }

        // Mettre à jour la base de données
        const { error: updateError } = await supabase
          .from('documents')
          .update({ file_url: urlData.signedUrl })
          .eq('id', doc.id)

        if (updateError) {
          errors.push(`Document ${doc.id}: ${updateError.message}`)
          continue
        }

        updated++
      } catch (error: any) {
        errors.push(`Document ${doc.id}: ${error.message}`)
      }
    }

    return NextResponse.json({
      success: true,
      total: documents.length,
      updated,
      failed: errors.length,
      errors: errors.length > 0 ? errors : undefined,
    })
  } catch (error: any) {
    console.error('❌ [API /refresh-urls] Erreur:', error)
    return NextResponse.json(
      { error: 'Erreur serveur', details: error.message },
      { status: 500 }
    )
  }
}
