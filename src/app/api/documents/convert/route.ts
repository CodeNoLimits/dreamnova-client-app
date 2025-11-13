import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { convertToFacturX, isFacturXPDF } from '@/lib/facturx'
import { checkConversionLimit } from '@/lib/conversion-limits'

export async function POST(request: NextRequest) {
  try {
    console.log('📤 [API /convert] Début upload')

    const supabase = await createClient()

    // Vérifier l'authentification
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      console.error('❌ [API /convert] Non authentifié')
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      )
    }

    console.log('✅ [API /convert] User:', user.email)

    // ✅ Vérifier les limites de conversion
    const limitCheck = await checkConversionLimit(user.id)
    console.log('📊 [API /convert] Limites:', {
      allowed: limitCheck.allowed,
      remaining: limitCheck.remaining,
      isPaid: limitCheck.isPaid,
    })

    if (!limitCheck.allowed) {
      console.error('❌ [API /convert] Limite atteinte')
      return NextResponse.json(
        {
          error: 'Limite de conversion atteinte',
          details: limitCheck.reason,
          remaining: limitCheck.remaining,
          total: limitCheck.total,
          isPaid: limitCheck.isPaid,
        },
        { status: 403 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      console.error('❌ [API /convert] Aucun fichier')
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      )
    }

    console.log('✅ [API /convert] Fichier:', file.name, file.type, `${(file.size / 1024).toFixed(2)} KB`)

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
    console.log('📤 [API /convert] Upload Storage:', fileName)

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('documents')
      .upload(fileName, finalBuffer, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      console.error('❌ [API /convert] Erreur upload:', uploadError)
      return NextResponse.json(
        { error: 'Erreur lors du téléchargement', details: uploadError.message },
        { status: 500 }
      )
    }

    console.log('✅ [API /convert] Upload OK:', uploadData.path)

    // ✅ Obtenir une URL signée (valide 1 an pour bucket privé)
    const { data: urlData, error: urlError } = await supabase.storage
      .from('documents')
      .createSignedUrl(fileName, 31536000) // 1 an en secondes

    if (urlError || !urlData) {
      console.error('❌ [API /convert] Erreur création URL:', urlError)
      return NextResponse.json(
        { error: 'Erreur création URL de téléchargement' },
        { status: 500 }
      )
    }

    // Enregistrer dans la table documents
    console.log('💾 [API /convert] Insertion DB...')
    const { data: documentData, error: dbError } = await supabase
      .from('documents')
      .insert({
        user_id: user.id,
        file_name: convertedFileName, // ✅ Utiliser le nom converti (avec _facturx.pdf)
        file_type: file.type,
        file_size: finalBuffer.length, // Taille après conversion
        file_url: urlData.signedUrl,
        converted_format: isConverted ? 'factur-x' : null,
        status: isConverted ? 'converted' : 'uploaded',
      })
      .select()
      .single()

    if (dbError) {
      console.error('❌ [API /convert] Erreur DB:', dbError)
      return NextResponse.json(
        { error: 'Erreur lors de l\'enregistrement', details: dbError.message },
        { status: 500 }
      )
    }

    console.log('✅ [API /convert] Document enregistré:', documentData.id)

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
  } catch (error: any) {
    console.error('❌ [API /convert] Erreur globale:', error)
    return NextResponse.json(
      { error: 'Erreur serveur', details: error.message },
      { status: 500 }
    )
  }
}

