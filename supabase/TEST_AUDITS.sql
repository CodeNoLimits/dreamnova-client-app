-- ============================================
-- TEST ET DIAGNOSTIC - TABLE AUDITS
-- ============================================
-- COPIEZ ET EXÉCUTEZ DANS SUPABASE SQL EDITOR
-- Ce script vous permet de vérifier si les audits existent et si les politiques RLS fonctionnent

-- ============================================
-- 1. VÉRIFIER QUE LA TABLE EXISTE
-- ============================================
SELECT 
  'Table audits existe' AS test,
  EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = 'audits') AS result;

-- ============================================
-- 2. COMPTER TOUS LES AUDITS (sans RLS)
-- ============================================
-- ⚠️ Cette requête nécessite les droits admin
SELECT 
  'Total audits (admin)' AS test,
  COUNT(*) AS count
FROM audits;

-- ============================================
-- 3. VÉRIFIER LA STRUCTURE DE LA TABLE
-- ============================================
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'audits'
ORDER BY ordinal_position;

-- ============================================
-- 4. VÉRIFIER LES POLITIQUES RLS
-- ============================================
SELECT 
  policyname,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public' AND tablename = 'audits'
ORDER BY policyname;

-- ============================================
-- 5. VÉRIFIER QUE RLS EST ACTIVÉ
-- ============================================
SELECT 
  'RLS activé' AS test,
  relrowsecurity AS enabled
FROM pg_class
WHERE relname = 'audits';

-- ============================================
-- 6. LISTER LES AUDITS AVEC USER_ID (admin)
-- ============================================
-- ⚠️ Cette requête nécessite les droits admin
-- Remplacez 'VOTRE_USER_ID' par votre user_id réel
SELECT 
  id,
  user_id,
  company_name,
  score_conformite,
  niveau_risque,
  created_at,
  CASE 
    WHEN audit_data IS NOT NULL THEN 'OUI'
    ELSE 'NON'
  END AS a_audit_data
FROM audits
ORDER BY created_at DESC
LIMIT 10;

-- ============================================
-- 7. TESTER UNE REQUÊTE SIMULÉE (comme le client)
-- ============================================
-- Cette requête simule ce que fait le client
-- Elle devrait fonctionner si les politiques RLS sont correctes
-- ⚠️ Remplacez 'VOTRE_USER_ID' par votre user_id réel
/*
SELECT 
  id,
  company_name,
  score_conformite,
  niveau_risque,
  created_at
FROM audits
WHERE user_id = 'VOTRE_USER_ID'::uuid
ORDER BY created_at DESC;
*/

-- ============================================
-- 8. VÉRIFIER LES INDEX
-- ============================================
SELECT 
  indexname,
  indexdef
FROM pg_indexes
WHERE tablename = 'audits';

-- ============================================
-- 9. VÉRIFIER LES CONTRAINTES
-- ============================================
SELECT 
  conname AS constraint_name,
  contype AS constraint_type,
  pg_get_constraintdef(oid) AS definition
FROM pg_constraint
WHERE conrelid = 'audits'::regclass;

-- ============================================
-- ✅ INTERPRÉTATION DES RÉSULTATS
-- ============================================
-- 
-- Si test 1 = false → La table n'existe pas, exécutez FIX_AUDITS_COMPLETE.sql
-- Si test 2 = 0 → Aucun audit dans la base (normal si vous n'en avez pas créé)
-- Si test 4 = 0 politiques → Les politiques RLS n'existent pas, exécutez FIX_AUDITS_COMPLETE.sql
-- Si test 5 = false → RLS n'est pas activé, exécutez FIX_AUDITS_COMPLETE.sql
-- Si test 6 ne retourne rien → Aucun audit pour votre user_id
-- Si test 7 échoue → Problème de politique RLS ou user_id incorrect
--
-- ============================================

