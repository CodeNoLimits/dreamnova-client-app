-- Table pour stocker les connexions PDP des utilisateurs
CREATE TABLE IF NOT EXISTS public.pdp_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  pdp_name TEXT NOT NULL,
  api_key TEXT NOT NULL, -- ⚠️ À crypter en production
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_pdp_connections_user_id ON pdp_connections(user_id);
CREATE INDEX IF NOT EXISTS idx_pdp_connections_status ON pdp_connections(status);

-- RLS (Row Level Security)
ALTER TABLE pdp_connections ENABLE ROW LEVEL SECURITY;

-- Policy: Les utilisateurs peuvent voir leurs propres connexions
CREATE POLICY "Users can view own connections"
  ON pdp_connections FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Les utilisateurs peuvent créer leurs propres connexions
CREATE POLICY "Users can insert own connections"
  ON pdp_connections FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Les utilisateurs peuvent mettre à jour leurs propres connexions
CREATE POLICY "Users can update own connections"
  ON pdp_connections FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Les utilisateurs peuvent supprimer leurs propres connexions
CREATE POLICY "Users can delete own connections"
  ON pdp_connections FOR DELETE
  USING (auth.uid() = user_id);

