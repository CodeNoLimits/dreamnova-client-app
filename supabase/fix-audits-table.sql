-- Migration: Corriger types colonnes table audits
-- Permet de sauvegarder les audits correctement

-- 1. Changer ca_annuel de numeric vers text (pour accepter "100k-500k")
ALTER TABLE audits
ALTER COLUMN ca_annuel TYPE TEXT;

-- 2. Changer employees de numeric vers text (pour accepter "10-50")
ALTER TABLE audits
ALTER COLUMN employees TYPE TEXT;

-- 3. S'assurer que les colonnes optionnelles permettent NULL
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

-- 4. Vérifier la structure finale
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'audits'
ORDER BY ordinal_position;
