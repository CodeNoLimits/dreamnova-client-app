-- ============================================
-- SCHEMA SUPABASE - DREAMNOVA COMPTA
-- ============================================
-- Exécutez ce script dans l'éditeur SQL de Supabase
-- Menu: SQL Editor → New Query → Coller ce code → Run

-- ============================================
-- 1. TABLE PROFILES (Profils utilisateurs)
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  company_name TEXT,
  company_siret TEXT,
  employees INTEGER,
  sector TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. TABLE AUDITS (Audits de conformité)
-- ============================================
CREATE TABLE IF NOT EXISTS audits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  company_name TEXT,
  
  -- Données entreprise
  employees INTEGER,
  sector TEXT,
  ca_annuel NUMERIC,
  
  -- Données facturation
  volume_b2b_mensuel INTEGER,
  volume_b2c_mensuel INTEGER,
  solution_actuelle TEXT,
  format_actuel TEXT,
  
  -- Résultats audit
  score_conformite INTEGER,
  niveau_risque TEXT, -- 'CRITIQUE' | 'ÉLEVÉ' | 'MODÉRÉ' | 'FAIBLE'
  amendes_annuelles NUMERIC,
  amendes_mensuelles NUMERIC,
  amendes_3_ans NUMERIC,
  
  -- Recommandations
  pdp_recommandé TEXT,
  duree_migration_estimee TEXT,
  cout_estime TEXT,
  
  -- Métadonnées
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. TABLE SUBSCRIPTIONS (Abonnements)
-- ============================================
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Type d'abonnement
  plan_type TEXT NOT NULL, -- 'starter' | 'growth' | 'premium' | 'urgence' | 'transformation' | 'premium'
  plan_name TEXT, -- 'STARTER', 'GROWTH', etc.
  
  -- Paiement
  amount NUMERIC,
  currency TEXT DEFAULT 'EUR',
  payment_method TEXT, -- 'monthly' | 'one-shot'
  payment_provider TEXT, -- 'stripe' | 'alma' | 'klarna'
  
  -- Statut
  status TEXT DEFAULT 'active', -- 'active' | 'cancelled' | 'expired' | 'pending'
  
  -- Dates
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE,
  
  -- Métadonnées
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 4. TABLE DOCUMENTS (Documents uploadés)
-- ============================================
CREATE TABLE IF NOT EXISTS documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Données fichier
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  file_url TEXT,
  
  -- Conversion
  converted_format TEXT, -- 'factur-x' | 'ubl' | 'cii' | null
  status TEXT DEFAULT 'uploaded', -- 'uploaded' | 'converting' | 'converted' | 'error'
  
  -- Métadonnées
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 5. TABLE PAIRING_SESSIONS (Sessions de pairing mobile)
-- ============================================
CREATE TABLE IF NOT EXISTS pairing_sessions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending' | 'paired' | 'expired'
  mobile_device TEXT,
  paired_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- ============================================
-- 6. TABLE MOBILE_UPLOADS (Uploads depuis mobile)
-- ============================================
CREATE TABLE IF NOT EXISTS mobile_uploads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES pairing_sessions(id) ON DELETE CASCADE NOT NULL,
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_url TEXT,
  processed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 7. TABLE INVOICES (Factures converties)
-- ============================================
CREATE TABLE IF NOT EXISTS invoices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Données facture
  invoice_number TEXT,
  amount NUMERIC,
  format TEXT, -- 'FACTURX' | 'UBL' | 'CII'
  status TEXT DEFAULT 'draft', -- 'draft' | 'sent' | 'received' | 'converted'
  
  -- Fichiers
  original_file_url TEXT,
  converted_file_url TEXT,
  
  -- Métadonnées
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  sent_at TIMESTAMP WITH TIME ZONE,
  converted_at TIMESTAMP WITH TIME ZONE
);

-- ============================================
-- 8. TABLE E_REPORTING_LOGS (Logs e-reporting)
-- ============================================
CREATE TABLE IF NOT EXISTS e_reporting_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Données transmission
  invoice_id UUID REFERENCES invoices(id) ON DELETE SET NULL,
  pdp_provider TEXT, -- 'pennylane' | 'qonto' | 'sellsy' | 'tiime' | 'ppf'
  transmission_id TEXT UNIQUE,
  
  -- Statut
  status TEXT DEFAULT 'pending', -- 'pending' | 'success' | 'failed' | 'retry'
  error_message TEXT,
  
  -- Métadonnées
  transmitted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 5. ROW LEVEL SECURITY (RLS)
-- ============================================

-- Activer RLS sur toutes les tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE pairing_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE mobile_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE e_reporting_logs ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 6. POLITIQUES RLS - PROFILES
-- ============================================

-- Les utilisateurs peuvent voir leur propre profil
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Les utilisateurs peuvent créer leur propre profil
CREATE POLICY "Users can create own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Les utilisateurs peuvent mettre à jour leur propre profil
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- ============================================
-- 7. POLITIQUES RLS - AUDITS
-- ============================================

-- Les utilisateurs peuvent voir leurs propres audits
CREATE POLICY "Users can view own audits"
  ON audits FOR SELECT
  USING (auth.uid() = user_id);

-- Les utilisateurs peuvent créer leurs propres audits
CREATE POLICY "Users can create own audits"
  ON audits FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Les utilisateurs peuvent mettre à jour leurs propres audits
CREATE POLICY "Users can update own audits"
  ON audits FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================
-- 8. POLITIQUES RLS - SUBSCRIPTIONS
-- ============================================

-- Les utilisateurs peuvent voir leurs propres abonnements
CREATE POLICY "Users can view own subscriptions"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Les utilisateurs peuvent créer leurs propres abonnements
CREATE POLICY "Users can create own subscriptions"
  ON subscriptions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Les utilisateurs peuvent mettre à jour leurs propres abonnements
CREATE POLICY "Users can update own subscriptions"
  ON subscriptions FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================
-- 9. POLITIQUES RLS - DOCUMENTS
-- ============================================

-- Les utilisateurs peuvent voir leurs propres documents
CREATE POLICY "Users can view own documents"
  ON documents FOR SELECT
  USING (auth.uid() = user_id);

-- Les utilisateurs peuvent créer leurs propres documents
CREATE POLICY "Users can create own documents"
  ON documents FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Les utilisateurs peuvent mettre à jour leurs propres documents
CREATE POLICY "Users can update own documents"
  ON documents FOR UPDATE
  USING (auth.uid() = user_id);

-- Les utilisateurs peuvent supprimer leurs propres documents
CREATE POLICY "Users can delete own documents"
  ON documents FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- 10. POLITIQUES RLS - PAIRING_SESSIONS
-- ============================================

-- Les utilisateurs peuvent voir leurs propres sessions
CREATE POLICY "Users can view own pairing sessions"
  ON pairing_sessions FOR SELECT
  USING (auth.uid() = user_id);

-- Les utilisateurs peuvent créer leurs propres sessions
CREATE POLICY "Users can create own pairing sessions"
  ON pairing_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Les utilisateurs peuvent mettre à jour leurs propres sessions
CREATE POLICY "Users can update own pairing sessions"
  ON pairing_sessions FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================
-- 11. POLITIQUES RLS - MOBILE_UPLOADS
-- ============================================

-- Les utilisateurs peuvent voir leurs propres uploads via leurs sessions
CREATE POLICY "Users can view own mobile uploads"
  ON mobile_uploads FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM pairing_sessions
      WHERE pairing_sessions.id = mobile_uploads.session_id
      AND pairing_sessions.user_id = auth.uid()
    )
  );

-- Les utilisateurs peuvent créer leurs propres uploads via leurs sessions
CREATE POLICY "Users can create own mobile uploads"
  ON mobile_uploads FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM pairing_sessions
      WHERE pairing_sessions.id = mobile_uploads.session_id
      AND pairing_sessions.user_id = auth.uid()
    )
  );

-- ============================================
-- 12. POLITIQUES RLS - INVOICES
-- ============================================

-- Les utilisateurs peuvent voir leurs propres factures
CREATE POLICY "Users can view own invoices"
  ON invoices FOR SELECT
  USING (auth.uid() = user_id);

-- Les utilisateurs peuvent créer leurs propres factures
CREATE POLICY "Users can create own invoices"
  ON invoices FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Les utilisateurs peuvent mettre à jour leurs propres factures
CREATE POLICY "Users can update own invoices"
  ON invoices FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================
-- 13. POLITIQUES RLS - E_REPORTING_LOGS
-- ============================================

-- Les utilisateurs peuvent voir leurs propres logs
CREATE POLICY "Users can view own e-reporting logs"
  ON e_reporting_logs FOR SELECT
  USING (auth.uid() = user_id);

-- Les utilisateurs peuvent créer leurs propres logs
CREATE POLICY "Users can create own e-reporting logs"
  ON e_reporting_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- 10. FUNCTION: Auto-create profile on signup
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, company_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'company_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour créer automatiquement un profil à l'inscription
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 11. FUNCTION: Update updated_at timestamp
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers pour mettre à jour updated_at automatiquement
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_audits_updated_at
  BEFORE UPDATE ON audits
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_documents_updated_at
  BEFORE UPDATE ON documents
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================
-- ✅ FIN DU SCRIPT
-- ============================================
-- Après avoir exécuté ce script:
-- 1. Vérifiez que les tables sont créées (Table Editor)
-- 2. Récupérez vos clés API (Settings → API)
-- 3. Ajoutez-les dans .env.local

