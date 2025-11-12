# 🔄 CURSOR SYNC - DreamNova Client App

## État actuel
**Dernière mise à jour:** 2025-11-12 17:15
**Branche active:** claude-20251112-171522
**Status:** 🔨 Claude Code en train de créer l'application complète
**Cursor:** ⚠️ NE PAS MODIFIER - Claude travaille sur cette branche

## 📋 Contexte du projet
Application cliente DreamNova pour la facturation électronique 2026.
- **Type:** React + TypeScript + Vite
- **Repository:** https://github.com/CodeNoLimits/dreamnova-client-app
- **Structure:** Application externe (client-facing)

## 🤖 Coordination Claude Code ↔ Cursor

### Règles de travail
1. **Claude Code:** Travaille sur branches `claude-*`
2. **Cursor:** Travaille sur branches `cursor-*`
3. **Toujours vérifier** `git status` avant toute modification
4. **Ne jamais travailler** directement sur `main`

### Workflow de branches
```bash
# Claude Code
BRANCH_NAME="claude-$(date +%Y%m%d-%H%M%S)"
git checkout -b "$BRANCH_NAME"
git commit -m "🤖 Claude Code: [description]"

# Cursor
BRANCH_NAME="cursor-$(date +%Y%m%d-%H%M%S)"
git checkout -b "$BRANCH_NAME"
git commit -m "🖱️ Cursor: [description]"
```

## 📝 Dernières modifications

### Claude Code - PHASE 1 TERMINÉE ✅
- **Date:** 2025-11-12 17:35
- **Branche:** claude-20251112-171522
- **Action:** Phase 1 COMPLÈTE - Agents IA + Calculateur + Pricing
- **Fichiers créés/modifiés:**
  - ✅ src/adapters/ai/agents.ts (3 agents Gemini: Audit, ROI, PDP)
  - ✅ src/components/features/PenaltyCalculator.tsx (calculateur amendes interactif)
  - ✅ src/app/pricing/page.tsx (vérifié - pricing hybride conforme)
  - ✅ CLAUDE_HANDOFF_TO_CURSOR.md (documentation complète pour Cursor)
- **Status:** 🎯 PRÊT POUR CURSOR - Voir CLAUDE_HANDOFF_TO_CURSOR.md
- **Prochaines étapes:**
  1. Wizard audit 3 étapes (utilise agents déjà créés)
  2. Dashboard client avec score conformité
  3. Génération rapports PDF
  4. Intégration paiement Alma

### Claude Code (précédent)
- **Date:** 2025-11-11
- **Branche:** main
- **Action:** Configuration initiale du repository
- **Fichiers:** CURSOR_SYNC.md, .cursor/sync-instructions.md

### Cursor
- **Date:** 2025-01-27
- **Branche:** Synchronisation initiale
- **Action:** Synchronisation avec Claude Code et configuration de l'environnement interne
- **Fichiers:** dreamnova-internal/CURSOR_SYNC.md

## ⚠️ Alertes actives

### 🎯 CURSOR: PHASE 1 DISPONIBLE
**Commit:** `e3f0b1c` - Phase 1 - Agents IA, Calculateur, Pricing
**Action requise:**
```bash
git checkout claude-20251112-171522
git pull origin claude-20251112-171522
```

**Lire OBLIGATOIREMENT:** `CLAUDE_HANDOFF_TO_CURSOR.md`

**Claude va continuer après confirmation de Cursor.**

## 📊 Branches actives
- `main` - Branche principale (protégée)
- `local-backup` - Sauvegarde de la version locale

---
**Note:** Ce fichier est mis à jour automatiquement par Claude Code et Cursor.
