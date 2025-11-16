# 🔐 Configuration Supabase - DreamNova Compta

## 📋 Étapes de Configuration

### 1. Créer un projet Supabase

1. Aller sur [supabase.com](https://supabase.com)
2. Créer un compte (gratuit)
3. Créer un nouveau projet
4. Noter l'URL du projet et la clé anonyme (anon key)

### 2. Créer les Tables dans Supabase

Aller dans l'éditeur SQL de Supabase et exécuter :

```sql
-- Table des profils utilisateurs
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  company_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des audits
CREATE TABLE audits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT,
  score_conformite INTEGER,
  amendes_annuelles INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des abonnements
CREATE TABLE subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_type TEXT, -- 'starter' | 'growth' | 'premium' | 'urgence' | 'transformation' | 'premium'
  status TEXT DEFAULT 'active', -- 'active' | 'cancelled' | 'expired'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Politiques RLS pour audits
CREATE POLICY "Users can view own audits"
  ON audits FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own audits"
  ON audits FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Politiques RLS pour subscriptions
CREATE POLICY "Users can view own subscriptions"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own subscriptions"
  ON subscriptions FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### 3. Configurer les Variables d'Environnement

Créer un fichier `.env.local` à la racine du projet :

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon

# Gemini AI (déjà configuré)
NEXT_PUBLIC_GEMINI_API_KEY=votre_cle_gemini
GEMINI_API_KEY=votre_cle_gemini
```

### 4. Configurer l'Email dans Supabase

1. Aller dans Settings → Auth
2. Configurer les templates d'email (optionnel)
3. Vérifier que l'authentification email est activée

### 5. Tester l'Authentification

1. Lancer le serveur : `npm run dev`
2. Aller sur `/login`
3. Créer un compte de test
4. Vérifier l'email de confirmation (si activé)

## ✅ Vérification

- [ ] Projet Supabase créé
- [ ] Tables créées (profiles, audits, subscriptions)
- [ ] RLS activé et politiques créées
- [ ] Variables d'environnement configurées
- [ ] Test d'inscription fonctionnel
- [ ] Test de connexion fonctionnel

---

**Note:** En développement, vous pouvez désactiver la confirmation d'email dans Supabase Settings → Auth → Email Auth → "Confirm email" (OFF)

