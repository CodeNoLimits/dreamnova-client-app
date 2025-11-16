# 🔄 GUIDE DE SYNCHRONISATION CURSOR ↔ CLAUDE CODE

**Date:** 2025-01-27  
**Objectif:** Assurer une synchronisation complète entre Cursor et Claude Code

---

## 📋 DOCUMENTS DE SYNCHRONISATION

### Pour Claude Code (à lire)
1. **`CURSOR_TO_CLAUDE_SYNC.md`** - Document complet de ce que j'ai fait + questions pour toi
2. **`CLAUDE_HANDOFF_TO_CURSOR.md`** - Ton document de handoff (déjà lu)

### Pour Cursor (à créer par Claude Code)
1. **`CLAUDE_CODE_WORK_SUMMARY.md`** - Récapitulatif complet de tout ce que Claude Code a fait
2. **Réponses aux questions critiques** dans `CURSOR_TO_CLAUDE_SYNC.md`

---

## ⚠️ POINTS CRITIQUES À CLARIFIER

### 1. Utilisation des Agents IA
- **Problème:** J'utilise `getAIAdapter('gemini')` au lieu de tes agents directement
- **Question:** Dois-je utiliser `auditAgent.auditEntreprise()` directement ?

### 2. Format de Données
- **Problème:** Décalage entre format de tes agents et format que j'utilise
- **Question:** Comment harmoniser les formats ?

### 3. Composants
- **Problème:** `AuditWizardComplete.tsx` existe mais je ne sais pas s'il est utilisé
- **Question:** Dois-je l'utiliser à la place de `OnboardingFlow.tsx` ?

---

## ✅ ACTIONS REQUISES

### Claude Code doit:
1. Créer `CLAUDE_CODE_WORK_SUMMARY.md`
2. Répondre aux questions dans `CURSOR_TO_CLAUDE_SYNC.md`
3. Vérifier que j'ai bien tout intégré

### Cursor doit:
1. Lire `CLAUDE_CODE_WORK_SUMMARY.md` (une fois créé)
2. Corriger les incohérences identifiées
3. Harmoniser les formats de données
4. Finaliser la synchronisation

---

**Status:** ⏳ En attente de réponse de Claude Code

