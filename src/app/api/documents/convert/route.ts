import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { convertToFacturX, isFacturXPDF } from '@/lib/facturx'

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

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      )
    }

    // Vérifier le format
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Format non supporté. Formats acceptés: PDF, JPG, PNG' },
        { status: 400 }
      )
    }

    // Vérifier la taille (25MB max)
    const maxSize = 25 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Fichier trop volumineux. Maximum: 25MB' },
        { status: 400 }
      )
    }

    // Convertir le fichier en buffer
    const arrayBuffer = await file.arrayBuffer()
    const initialBuffer = Buffer.from(arrayBuffer)

    // ✅ Conversion Factur-X pour les PDFs
    let isConverted = false
    let originalFileName = file.name
    let convertedFileName = file.name
    let finalBuffer: Buffer = initialBuffer

    if (file.type === 'application/pdf') {
      try {
        // Vérifier si déjà en Factur-X
        const alreadyFacturX = await isFacturXPDF(initialBuffer)

        if (alreadyFacturX) {
          console.log('ℹ️ PDF déjà au format Factur-X')
          isConverted = true
        } else {
          console.log('🔄 Conversion en Factur-X...')
          // Convertir en Factur-X (PDF/A-3 + XML EN 16931)
          const convertedBuffer = await convertToFacturX(initialBuffer)
          finalBuffer = convertedBuffer as Buffer
          isConverted = true
          // Ajouter suffix au nom du fichier
          convertedFileName = file.name.replace('.pdf', '_facturx.pdf')
          console.log('✅ Conversion Factur-X réussie')
        }
      } catch (conversionError) {
        console.error('⚠️ Erreur conversion Factur-X:', conversionError)
        // On continue avec le PDF original
        isConverted = false
        finalBuffer = initialBuffer
      }
    }

    // Sauvegarder dans Supabase Storage
    const fileName = `${user.id}/${Date.now()}_${convertedFileName}`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('documents')
      .upload(fileName, finalBuffer, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      console.error('Erreur upload Supabase:', uploadError)
      return NextResponse.json(
        { error: 'Erreur lors du téléchargement' },
        { status: 500 }
      )
    }

    // Obtenir l'URL publique
    const { data: urlData } = supabase.storage
      .from('documents')
      .getPublicUrl(fileName)

    // Enregistrer dans la table documents
    const { data: documentData, error: dbError } = await supabase
      .from('documents')
      .insert({
        user_id: user.id,
        file_name: originalFileName,
        file_type: file.type,
        file_size: finalBuffer.length, // Taille après conversion
        file_url: urlData.publicUrl,
        converted_format: isConverted ? 'factur-x' : null,
        status: isConverted ? 'converted' : 'uploaded',
      })
      .select()
      .single()

    if (dbError) {
      console.error('Erreur DB:', dbError)
      return NextResponse.json(
        { error: 'Erreur lors de l\'enregistrement' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      document: {
        id: documentData.id,
        file_name: documentData.file_name,
        file_url: documentData.file_url,
        converted_format: documentData.converted_format,
        status: documentData.status,
      },
    })
  } catch (error) {
    console.error('Erreur conversion document:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

