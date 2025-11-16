# 🖥️ DÉVELOPPEMENT LOCAL SHOPIFY

## ⚠️ IMPORTANT: Shopify ≠ Next.js

**Shopify ne fonctionne PAS comme Next.js:**
- ❌ Pas de `npm run dev` sur localhost:3000
- ❌ Pas de serveur local classique
- ✅ Mais: Shopify CLI permet développement local avec tunnel

---

## 🚀 DÉVELOPPEMENT LOCAL AVEC SHOPIFY CLI

### Option 1: Shopify Theme Dev (Recommandé)

```bash
# 1. Installer Shopify CLI
npm install -g @shopify/cli @shopify/theme

# 2. Se connecter au store
shopify login --store=esther-ifrah.myshopify.com

# 3. Naviguer vers le dossier du thème
cd breslev-shopify-complete

# 4. Lancer le serveur de développement
shopify theme dev
```

**Ce que ça fait:**
- ✅ Crée un tunnel (URL temporaire)
- ✅ Synchronise fichiers en temps réel
- ✅ Hot reload automatique
- ✅ Preview sur URL Shopify temporaire

**URL générée:** `https://[random].myshopify.com?preview_theme_id=[id]`

---

### Option 2: Shopify Theme Push (Alternative)

```bash
# Push vers thème non publié
shopify theme push --unpublished

# Puis preview dans admin Shopify
# Online Store → Themes → Preview
```

---

## 🔄 COORDINATION AVEC CLAUDE CODE

### Workflow Recommandé

**1. Claude Code travaille sur:**
- Création des fichiers manquants
- Templates, sections, snippets
- Tests locaux avec `shopify theme dev`

**2. Cursor travaille sur:**
- Configuration apps
- Intégrations JavaScript
- Documentation
- Coordination

**3. Synchronisation:**
- Git pour versioning
- Fichier `CLAUDE-CODE-SYNC.md` pour état
- Communication via fichiers de sync

---

## 📋 SETUP POUR CLAUDE CODE

### Commandes à exécuter

```bash
# 1. Installer Shopify CLI
npm install -g @shopify/cli @shopify/theme

# 2. Se connecter
shopify login

# 3. Aller dans le dossier
cd /Users/codenolimits-dreamai-nanach/Desktop/ESTHER\ IFRA/breslev-shopify-complete

# 4. Lancer dev local
shopify theme dev
```

**Résultat:**
- URL temporaire générée
- Changements visibles en temps réel
- Hot reload automatique

---

## ⚠️ LIMITATIONS DÉVELOPPEMENT LOCAL SHOPIFY

**Ce qui fonctionne:**
- ✅ Liquid templates
- ✅ CSS/JS
- ✅ Sections
- ✅ Snippets

**Ce qui ne fonctionne PAS en local:**
- ❌ Apps Shopify (FlipHTML5, LemonInk, Sky Pilot)
- ❌ Checkout Shopify
- ❌ Webhooks
- ❌ Metafields dynamiques

**Solution:** Tester apps sur store réel (thème non publié)

---

## 🎯 RECOMMANDATION

### Pour Claude Code:

**1. Développement Local:**
```bash
shopify theme dev
```
- Pour templates, sections, CSS/JS
- Hot reload automatique
- URL temporaire pour preview

**2. Tests Apps:**
- Push vers thème non publié
- Tester sur store réel
- Apps fonctionnent uniquement sur store

**3. Coordination:**
- Utiliser `CLAUDE-CODE-SYNC.md` pour état
- Git pour versioning
- Communication via fichiers

---

## 📝 FICHIER POUR CLAUDE CODE

Créer `DEV-LOCAL-INSTRUCTIONS.md` avec:
- Commandes exactes
- Workflow local
- Limitations
- Coordination

---

## ✅ RÉSUMÉ

**Oui, développement local possible** avec `shopify theme dev`

**Mais:**
- URL temporaire (pas localhost:3000)
- Apps ne fonctionnent qu'en production
- Hot reload fonctionne
- Parfait pour templates/CSS/JS

**Claude Code peut utiliser `shopify theme dev` pour développement local!**

