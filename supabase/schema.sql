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
-- 4. TABLE INVOICES (Factures converties)
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
-- 5. ROW LEVEL SECURITY (RLS)
-- ============================================

-- Activer RLS sur toutes les tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

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
-- 9. POLITIQUES RLS - INVOICES
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

-- ============================================
-- ✅ FIN DU SCRIPT
-- ============================================
-- Après avoir exécuté ce script:
-- 1. Vérifiez que les tables sont créées (Table Editor)
-- 2. Récupérez vos clés API (Settings → API)
-- 3. Ajoutez-les dans .env.local

