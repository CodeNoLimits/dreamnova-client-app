# 🚨 CORRECTIONS URGENTES - GUIDE COMPLET

**Date**: 13 Novembre 2025  
**Tests effectués par**: Alexis  
**Statut**: En cours de correction

---

## ✅ DÉJÀ CORRIGÉ (Déployé)

1. ✅ **Barre orange "version bêta"** supprimée
2. ✅ **Onglet "Développeur"** visible mode testeur (testeur@example.com)
3. ✅ **Documents téléchargeables** (URLs signées)

---

## 🚨 À CORRIGER (Critique)

### 4. AUDITS NON SAUVEGARDÉS

**Problème** : Table `audits` a types colonnes incorrects

**SOLUTION** (5 minutes):
1. Va sur https://supabase.com/dashboard/project/dgflttnrpotuqivltiwd/sql/new
2. Copie-colle ce SQL:

```sql
ALTER TABLE audits ALTER COLUMN ca_annuel TYPE TEXT;
ALTER TABLE audits ALTER COLUMN employees TYPE TEXT;
ALTER TABLE audits ALTER COLUMN volume_b2c_mensuel DROP NOT NULL;
ALTER TABLE audits ALTER COLUMN solution_actuelle DROP NOT NULL;
ALTER TABLE audits ALTER COLUMN format_actuel DROP NOT NULL;
ALTER TABLE audits ALTER COLUMN pdp_recommandé DROP NOT NULL;
ALTER TABLE audits ALTER COLUMN duree_migration_estimee DROP NOT NULL;
ALTER TABLE audits ALTER COLUMN cout_estime DROP NOT NULL;
```

3. Clique "Run"
4. Teste un nouvel audit

---

### 5. PAGE LISTE AUDITS MANQUANTE

**Action**: Créer `/audits` qui liste TOUS les audits
**Status**: En cours par Claude

---

### 6. BOUTON RETOUR MANQUANT

**Action**: Ajouter bouton "← Retour" après audit
**Status**: En cours par Claude

---

## 📚 DOCUMENTATION

### Factur-X vs UBL vs CII

**FACTUR-X** (Recommandé 2026) 🔥:
- PDF/A-3 + XML EN 16931
- Lisible humains ET machines
- Format officiel DGFiP

**UBL**:
- XML pur
- Standard international
- Chorus Pro compatible

**CII**:
- XML UN/CEFACT
- Moins populaire

**UTILISER**: Factur-X (c'est le meilleur)

---

## 🎯 PROCHAINE ÉTAPE

**TOI**: Exécute SQL migration (5 min)
**CLAUDE**: Crée page /audits + bouton retour
**TEST**: On vérifie TOUT ensemble

🚀 **OBJECTIF: 30 MINUTES MAX**
