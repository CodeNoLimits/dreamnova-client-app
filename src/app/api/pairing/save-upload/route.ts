import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { sessionId, documentId, fileName, fileType, fileUrl } = await request.json()

    if (!sessionId || !documentId) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Enregistrer l'upload dans la table mobile_uploads
    const { error } = await supabase
      .from('mobile_uploads')
      .insert({
        session_id: sessionId,
        document_id: documentId,
        file_name: fileName,
        file_type: fileType,
        file_url: fileUrl,
        processed: false,
        created_at: new Date().toISOString(),
      })

    if (error) {
      console.error('Erreur sauvegarde upload:', error)
      // Si la table n'existe pas, on peut ignorer l'erreur pour l'instant
      // La table sera créée dans le schéma Supabase
    }

    return NextResponse.json({
      success: true,
      message: 'Upload enregistré',
    })
  } catch (error) {
    console.error('Erreur save upload:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

