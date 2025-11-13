-- ============================================
-- CORRECTION COMPLÈTE - STORAGE + DOCUMENTS
-- ============================================
-- COPIEZ ET EXÉCUTEZ DANS SUPABASE SQL EDITOR
-- Date: 13 Novembre 2025
-- Problème: Upload échoue (pas de politiques RLS Storage)

-- ============================================
-- 1. CRÉER TABLE DOCUMENTS (si pas existe)
-- ============================================
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  file_url TEXT NOT NULL,
  converted_format TEXT,
  status TEXT DEFAULT 'uploaded',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. INDEX POUR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON public.documents(user_id);
CREATE INDEX IF NOT EXISTS idx_documents_created_at ON public.documents(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_documents_status ON public.documents(status);

-- ============================================
-- 3. RLS POUR TABLE DOCUMENTS
-- ============================================
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Supprimer anciennes politiques si existent
DROP POLICY IF EXISTS "Users can view own documents" ON public.documents;
DROP POLICY IF EXISTS "Users can insert own documents" ON public.documents;
DROP POLICY IF EXISTS "Users can update own documents" ON public.documents;
DROP POLICY IF EXISTS "Users can delete own documents" ON public.documents;

-- Créer nouvelles politiques
CREATE POLICY "Users can view own documents"
  ON public.documents
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own documents"
  ON public.documents
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own documents"
  ON public.documents
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own documents"
  ON public.documents
  FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- 4. CRÉER BUCKET STORAGE (si pas existe)
-- ============================================
-- NOTE: Si le bucket existe déjà, cette commande échouera sans conséquence
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', false)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 5. POLITIQUES RLS POUR STORAGE
-- ============================================
-- C'est LA PARTIE CRITIQUE qui manquait !

-- Supprimer anciennes politiques si existent
DROP POLICY IF EXISTS "Users can upload own documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can view own documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own documents" ON storage.objects;

-- ✅ UPLOAD (INSERT) - Utilisateurs authentifiés peuvent uploader dans leur dossier
CREATE POLICY "Users can upload own documents"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'documents'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- ✅ LECTURE (SELECT) - Utilisateurs peuvent voir leurs propres fichiers
CREATE POLICY "Users can view own documents"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'documents'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- ✅ MISE À JOUR (UPDATE) - Utilisateurs peuvent mettre à jour leurs fichiers
CREATE POLICY "Users can update own documents"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'documents'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- ✅ SUPPRESSION (DELETE) - Utilisateurs peuvent supprimer leurs fichiers
CREATE POLICY "Users can delete own documents"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'documents'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- ============================================
-- 6. TRIGGER POUR updated_at
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_documents_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_documents_updated_at ON public.documents;
CREATE TRIGGER update_documents_updated_at
  BEFORE UPDATE ON public.documents
  FOR EACH ROW EXECUTE FUNCTION public.handle_documents_updated_at();

-- ============================================
-- 7. VÉRIFICATION (pour debug)
-- ============================================
-- Vérifier que tout est OK
SELECT
  'Table documents créée' AS check_1,
  EXISTS(SELECT 1 FROM pg_tables WHERE tablename = 'documents') AS exists;

SELECT
  'RLS activé sur documents' AS check_2,
  relrowsecurity AS enabled
FROM pg_class
WHERE relname = 'documents';

SELECT
  'Bucket documents existe' AS check_3,
  EXISTS(SELECT 1 FROM storage.buckets WHERE id = 'documents') AS exists;

SELECT
  'Politiques Storage créées' AS check_4,
  COUNT(*) AS count
FROM pg_policies
WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname LIKE '%documents%';

-- ============================================
-- ✅ CORRECTION TERMINÉE
-- ============================================
-- Si tout s'est bien passé, vous devriez voir:
-- - check_1: exists = true
-- - check_2: enabled = true
-- - check_3: exists = true
-- - check_4: count >= 4 (4 politiques Storage)
--
-- Maintenant, les uploads devraient fonctionner !
