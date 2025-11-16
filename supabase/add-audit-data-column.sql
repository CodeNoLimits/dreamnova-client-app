-- Migration: Ajouter colonne audit_data pour stocker JSON complet de l'audit
-- Date: 2025-01-13
-- Description: Permet de stocker tous les détails de l'audit (critères, recommandations, etc.)

-- Ajouter la colonne audit_data de type JSONB
ALTER TABLE audits ADD COLUMN IF NOT EXISTS audit_data JSONB;

-- Ajouter un index GIN pour améliorer les performances de recherche dans le JSON
CREATE INDEX IF NOT EXISTS idx_audits_audit_data ON audits USING GIN (audit_data);

-- Commenter la colonne pour documentation
COMMENT ON COLUMN audits.audit_data IS 'Stocke le résultat complet de l''audit au format JSON (critères détaillés, recommandations, comparaisons PDP, timeline, etc.)';
