-- ============================================
-- CORRECTION COMPLÈTE - TABLE AUDITS
-- ============================================
-- COPIEZ ET EXÉCUTEZ DANS SUPABASE SQL EDITOR
-- Date: 2025-01-27
-- Problème: Audits ne s'affichent pas correctement

-- ============================================
-- 1. CORRIGER LES TYPES DE COLONNES
-- ============================================

-- Changer ca_annuel de numeric vers text (pour accepter "100k-500k")
ALTER TABLE audits
ALTER COLUMN ca_annuel TYPE TEXT USING ca_annuel::TEXT;

-- Changer employees de integer vers text (pour accepter "10-50")
ALTER TABLE audits
ALTER COLUMN employees TYPE TEXT USING employees::TEXT;

-- ============================================
-- 2. S'ASSURER QUE LES COLONNES OPTIONNELLES PERMETTENT NULL
-- ============================================

ALTER TABLE audits
ALTER COLUMN volume_b2c_mensuel DROP NOT NULL;

ALTER TABLE audits
ALTER COLUMN solution_actuelle DROP NOT NULL;

ALTER TABLE audits
ALTER COLUMN format_actuel DROP NOT NULL;

ALTER TABLE audits
ALTER COLUMN pdp_recommandé DROP NOT NULL;

ALTER TABLE audits
ALTER COLUMN duree_migration_estimee DROP NOT NULL;

ALTER TABLE audits
ALTER COLUMN cout_estime DROP NOT NULL;

-- ============================================
-- 3. AJOUTER COLONNE audit_data (si pas existe)
-- ============================================

ALTER TABLE audits ADD COLUMN IF NOT EXISTS audit_data JSONB;

-- Index GIN pour améliorer les performances de recherche dans le JSON
CREATE INDEX IF NOT EXISTS idx_audits_audit_data ON audits USING GIN (audit_data);

-- ============================================
-- 4. S'ASSURER QUE RLS EST ACTIVÉ
-- ============================================

ALTER TABLE audits ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 5. CRÉER/REPLACER LES POLITIQUES RLS
-- ============================================

-- Supprimer anciennes politiques si existent
DROP POLICY IF EXISTS "Users can view own audits" ON audits;
DROP POLICY IF EXISTS "Users can create own audits" ON audits;
DROP POLICY IF EXISTS "Users can update own audits" ON audits;
DROP POLICY IF EXISTS "Users can delete own audits" ON audits;

-- Créer nouvelles politiques
CREATE POLICY "Users can view own audits"
  ON audits FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own audits"
  ON audits FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own audits"
  ON audits FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own audits"
  ON audits FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- 6. VÉRIFICATION (pour debug)
-- ============================================

-- Vérifier que la table existe
SELECT
  'Table audits existe' AS check_1,
  EXISTS(SELECT 1 FROM pg_tables WHERE tablename = 'audits') AS exists;

-- Vérifier que RLS est activé
SELECT
  'RLS activé sur audits' AS check_2,
  relrowsecurity AS enabled
FROM pg_class
WHERE relname = 'audits';

-- Vérifier les politiques RLS
SELECT
  'Politiques RLS créées' AS check_3,
  COUNT(*) AS count
FROM pg_policies
WHERE schemaname = 'public' AND tablename = 'audits';

-- Vérifier la structure de la table
SELECT
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'audits'
ORDER BY ordinal_position;

-- ============================================
-- ✅ CORRECTION TERMINÉE
-- ============================================
-- Si tout s'est bien passé, vous devriez voir:
-- - check_1: exists = true
-- - check_2: enabled = true
-- - check_3: count >= 4 (4 politiques RLS)
-- - Structure: ca_annuel et employees en TEXT, audit_data présent

