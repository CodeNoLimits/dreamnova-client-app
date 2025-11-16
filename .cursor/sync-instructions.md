# 🎯 INSTRUCTIONS CURSOR - DreamNova Client App

## ⚡ Workflow obligatoire

### Avant TOUTE modification
```bash
git status && git branch && git log -1 --oneline
```

### Créer une branche pour Cursor
```bash
BRANCH_NAME="cursor-$(date +%Y%m%d-%H%M%S)"
git checkout -b "$BRANCH_NAME"
```

### Commits Cursor
```bash
git add .
git commit -m "🖱️ Cursor: [description claire de la modification]"
```

## 🚨 Règles critiques

### ✅ À FAIRE
- Toujours créer une branche `cursor-*` avant de modifier
- Vérifier `git status` avant chaque modification
- Lire `CURSOR_SYNC.md` pour voir les dernières modifications de Claude
- Commit réguliers avec messages descriptifs
- Mettre à jour `CURSOR_SYNC.md` après vos modifications

### ❌ NE JAMAIS FAIRE
- Modifier directement `main`
- Travailler sur une branche `claude-*`
- Ignorer les conflits
- Commit sans message clair
- Oublier de pull avant de commencer

## 📂 Structure du projet
```
dreamnova-client/
├── components/          # Composants React
├── services/           # Services (API, etc.)
├── types.ts            # Types TypeScript
├── constants.ts        # Constantes
├── App.tsx             # Application principale
└── vite.config.ts      # Configuration Vite
```

## 🔧 Commandes utiles
```bash
# Installer les dépendances
npm install

# Démarrer le dev server
npm run dev

# Build production
npm run build

# Vérifier les types
npm run type-check
```

## 🤝 Coordination avec Claude Code

Claude Code travaille sur les branches `claude-*`. Si vous voyez des modifications de Claude dans `CURSOR_SYNC.md`:

1. **Lire les modifications** dans CURSOR_SYNC.md
2. **Pull les dernières modifications** si nécessaire
3. **Éviter les conflits** en ne modifiant pas les mêmes fichiers
4. **Communiquer** via CURSOR_SYNC.md si besoin

## 📊 État actuel du projet
- **Repository:** https://github.com/CodeNoLimits/dreamnova-client-app
- **Branche principale:** main
- **Type:** Application React + TypeScript + Vite
- **Purpose:** Client app pour facturation électronique 2026

---
**Mis à jour:** 2025-11-11
