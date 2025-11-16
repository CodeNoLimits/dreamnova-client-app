#!/usr/bin/env node

/**
 * Script pour régénérer toutes les URLs signées des documents existants
 * Corrige l'erreur "Bucket not found" pour les anciens documents
 */

const { createClient } = require('@supabase/supabase-js')

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Variables d\'environnement manquantes')
  console.error('NEXT_PUBLIC_SUPABASE_URL:', SUPABASE_URL ? '✓' : '✗')
  console.error('SUPABASE_SERVICE_ROLE_KEY:', SUPABASE_SERVICE_KEY ? '✓' : '✗')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function fixDocumentURLs() {
  console.log('🔧 Correction des URLs des documents...\n')

  // 1. Récupérer TOUS les documents
  console.log('📥 Récupération de tous les documents...')
  const { data: documents, error: fetchError } = await supabase
    .from('documents')
    .select('*')
    .order('created_at', { ascending: false })

  if (fetchError) {
    console.error('❌ Erreur récupération documents:', fetchError)
    process.exit(1)
  }

  if (!documents || documents.length === 0) {
    console.log('✅ Aucun document à traiter')
    return
  }

  console.log(`📊 ${documents.length} document(s) trouvé(s)\n`)

  let fixed = 0
  let failed = 0
  const errors = []

  // 2. Traiter chaque document
  for (const doc of documents) {
    console.log(`\n🔄 Traitement: ${doc.file_name}`)
    console.log(`   ID: ${doc.id}`)
    console.log(`   User: ${doc.user_id}`)
    console.log(`   URL actuelle: ${doc.file_url?.substring(0, 80)}...`)

    try {
      // Extraire le chemin du fichier depuis l'ancienne URL
      let filePath

      if (doc.file_url.includes('/storage/v1/object/')) {
        // Format: https://xxx.supabase.co/storage/v1/object/public/documents/xxx
        // OU:     https://xxx.supabase.co/storage/v1/object/sign/documents/xxx
        const match = doc.file_url.match(/\/storage\/v1\/object\/(?:public|sign)\/documents\/(.+?)(?:\?|$)/)
        if (match) {
          filePath = decodeURIComponent(match[1])
        }
      }

      if (!filePath) {
        console.error(`   ❌ Impossible d'extraire le chemin du fichier`)
        failed++
        errors.push(`${doc.file_name}: Chemin invalide`)
        continue
      }

      console.log(`   📁 Chemin: ${filePath}`)

      // Vérifier que le fichier existe dans Storage
      const { data: fileExists, error: checkError } = await supabase.storage
        .from('documents')
        .list(filePath.split('/')[0], {
          limit: 100,
          search: filePath.split('/')[1]
        })

      if (checkError) {
        console.error(`   ❌ Erreur vérification fichier:`, checkError.message)
        failed++
        errors.push(`${doc.file_name}: ${checkError.message}`)
        continue
      }

      // Générer nouvelle URL signée (1 an)
      console.log(`   🔐 Génération nouvelle URL signée...`)
      const { data: urlData, error: urlError } = await supabase.storage
        .from('documents')
        .createSignedUrl(filePath, 31536000) // 365 jours

      if (urlError || !urlData) {
        console.error(`   ❌ Erreur création URL:`, urlError?.message || 'Unknown')
        failed++
        errors.push(`${doc.file_name}: ${urlError?.message || 'URL creation failed'}`)
        continue
      }

      console.log(`   ✅ Nouvelle URL générée`)
      console.log(`   🔗 ${urlData.signedUrl.substring(0, 80)}...`)

      // Mettre à jour la base de données
      const { error: updateError } = await supabase
        .from('documents')
        .update({ file_url: urlData.signedUrl })
        .eq('id', doc.id)

      if (updateError) {
        console.error(`   ❌ Erreur mise à jour DB:`, updateError.message)
        failed++
        errors.push(`${doc.file_name}: ${updateError.message}`)
        continue
      }

      console.log(`   ✅ Base de données mise à jour`)
      fixed++

    } catch (error) {
      console.error(`   ❌ Erreur traitement:`, error.message)
      failed++
      errors.push(`${doc.file_name}: ${error.message}`)
    }
  }

  // 3. Résumé
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('📊 RÉSUMÉ')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`Total documents:     ${documents.length}`)
  console.log(`✅ Corrigés:         ${fixed}`)
  console.log(`❌ Échecs:           ${failed}`)

  if (errors.length > 0) {
    console.log('\n⚠️  ERREURS:')
    errors.forEach(err => console.log(`   - ${err}`))
  }

  console.log('\n✅ Script terminé!')
}

fixDocumentURLs().catch(error => {
  console.error('\n💥 ERREUR FATALE:', error)
  process.exit(1)
})
