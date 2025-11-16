#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js')

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

async function testAuditSave() {
  console.log('🧪 Test sauvegarde audit...\n')

  const testData = {
    user_id: '65626209-ef73-4b59-975d-8c436e2d8abb',
    company_name: 'Test Company',
    employees: '10-50',
    sector: 'Commerce',
    ca_annuel: '100k-500k',
    volume_b2b_mensuel: 100,
    volume_b2c_mensuel: 50,
    solution_actuelle: 'Excel',
    format_actuel: 'PDF',
    score_conformite: 75,
    niveau_risque: 'MODÉRÉ',
    amendes_annuelles: 5000,
    amendes_mensuelles: 417,
    amendes_3_ans: 15000,
    pdp_recommandé: 'Pennylane',
    duree_migration_estimee: '2-4 semaines',
    cout_estime: '5000-10000'
  }

  console.log('Données de test:', testData)

  const { data, error } = await supabase
    .from('audits')
    .insert(testData)
    .select()

  if (error) {
    console.error('\n❌ ERREUR SAUVEGARDE:')
    console.error('Message:', error.message)
    console.error('Details:', error.details)
    console.error('Hint:', error.hint)
    console.error('Code:', error.code)
  } else {
    console.log('\n✅ Insertion réussie!')
    console.log('ID audit:', data[0].id)

    // Supprimer le test
    console.log('\n🗑️ Suppression du test...')
    await supabase.from('audits').delete().eq('id', data[0].id)
    console.log('✅ Test nettoyé')
  }
}

testAuditSave().catch(console.error)
