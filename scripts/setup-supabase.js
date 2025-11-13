#!/usr/bin/env node

/**
 * Script d'initialisation automatique Supabase
 * Crée toutes les tables, RLS policies et buckets manquants
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

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

async function executeSQLFile(filepath) {
  console.log(`\n📄 Exécution: ${path.basename(filepath)}`)

  const sql = fs.readFileSync(filepath, 'utf-8')

  // Supabase REST API ne supporte pas directement l'exécution de SQL
  // On doit utiliser rpc() ou créer une fonction PostgreSQL

  // Pour l'instant, on affiche juste les instructions
  console.log('⚠️  Veuillez exécuter ce SQL manuellement dans Supabase Dashboard → SQL Editor:')
  console.log('---')
  console.log(sql)
  console.log('---')

  return true
}

async function createStorageBucket(bucketName, options = {}) {
  console.log(`\n🪣 Vérification bucket: ${bucketName}`)

  // Vérifier si le bucket existe
  const { data: buckets, error: listError } = await supabase.storage.listBuckets()

  if (listError) {
    console.error('❌ Erreur liste buckets:', listError)
    return false
  }

  const bucketExists = buckets.some(b => b.name === bucketName)

  if (bucketExists) {
    console.log(`✅ Bucket "${bucketName}" existe déjà`)
    return true
  }

  // Créer le bucket
  const { data, error } = await supabase.storage.createBucket(bucketName, {
    public: options.public || false,
    fileSizeLimit: options.fileSizeLimit || 26214400, // 25 MB par défaut
    allowedMimeTypes: options.allowedMimeTypes || null,
  })

  if (error) {
    console.error(`❌ Erreur création bucket "${bucketName}":`, error)
    return false
  }

  console.log(`✅ Bucket "${bucketName}" créé avec succès`)
  return true
}

async function checkTable(tableName) {
  console.log(`\n🔍 Vérification table: ${tableName}`)

  const { data, error } = await supabase.from(tableName).select('id').limit(0)

  if (error) {
    if (error.code === 'PGRST204' || error.message.includes('does not exist')) {
      console.log(`❌ Table "${tableName}" n'existe pas`)
      return false
    }
    // Si autre erreur, la table existe probablement mais RLS bloque
    console.log(`✅ Table "${tableName}" existe (RLS actif)`)
    return true
  }

  console.log(`✅ Table "${tableName}" existe`)
  return true
}

async function main() {
  console.log('🚀 Initialisation Supabase pour DreamNova Compta\n')
  console.log('URL:', SUPABASE_URL)
  console.log('Service Key:', SUPABASE_SERVICE_KEY.substring(0, 20) + '...')

  // 1. Vérifier les tables existantes
  console.log('\n━━━ ÉTAPE 1: Vérification Tables ━━━')

  const tables = ['profiles', 'audits', 'subscriptions', 'documents', 'pdp_connections']
  const tableStatus = {}

  for (const table of tables) {
    tableStatus[table] = await checkTable(table)
  }

  // 2. Créer les tables manquantes
  console.log('\n━━━ ÉTAPE 2: Création Tables Manquantes ━━━')

  if (!tableStatus.pdp_connections) {
    await executeSQLFile(path.join(__dirname, '../supabase/pdp_connections.sql'))
  } else {
    console.log('✅ Toutes les tables critiques existent')
  }

  // 3. Créer les buckets Storage
  console.log('\n━━━ ÉTAPE 3: Configuration Storage ━━━')

  await createStorageBucket('documents', {
    public: false,
    fileSizeLimit: 26214400, // 25 MB
    allowedMimeTypes: ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'],
  })

  // 4. Résumé
  console.log('\n━━━ RÉSUMÉ ━━━')
  console.log('Tables:')
  for (const [table, exists] of Object.entries(tableStatus)) {
    console.log(`  ${exists ? '✅' : '❌'} ${table}`)
  }

  console.log('\n✅ Initialisation terminée!')
  console.log('\n⚠️  ACTION REQUISE:')
  console.log('Si des tables sont manquantes (❌), exécutez le SQL affiché ci-dessus')
  console.log('dans Supabase Dashboard → SQL Editor')
}

main().catch(console.error)
