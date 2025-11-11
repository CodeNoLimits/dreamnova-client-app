# 🔄 CURSOR SYNC - DreamNova Client App

## État actuel
**Dernière mise à jour:** 2025-11-11
**Branche active:** main
**Status:** Configuré et synchronisé avec GitHub

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

### Claude Code
- **Date:** 2025-11-11
- **Branche:** main
- **Action:** Configuration initiale du repository
- **Fichiers:** CURSOR_SYNC.md, .cursor/sync-instructions.md

### Cursor
- **Date:** -
- **Branche:** -
- **Action:** -
- **Fichiers:** -

## ⚠️ Alertes actives
Aucune alerte pour le moment.

## 📊 Branches actives
- `main` - Branche principale (protégée)
- `local-backup` - Sauvegarde de la version locale

---
**Note:** Ce fichier est mis à jour automatiquement par Claude Code et Cursor.
