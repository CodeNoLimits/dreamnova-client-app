# 🚨 MESSAGE URGENT POUR CLAUDE CODE - DÉVELOPPEMENT LOCAL

## ⚡ OUI, TU PEUX FAIRE TOURNER EN LOCAL!

**Shopify CLI permet développement local avec hot reload!**

---

## 🖥️ COMMANDES EXACTES

```bash
# 1. Installer Shopify CLI (si pas déjà fait)
npm install -g @shopify/cli @shopify/theme

# 2. Se connecter au store
shopify login --store=esther-ifrah.myshopify.com

# 3. Aller dans le dossier
cd /Users/codenolimits-dreamai-nanach/Desktop/ESTHER\ IFRA/breslev-shopify-complete

# 4. LANCER LE SERVEUR LOCAL
shopify theme dev
```

**Résultat:**
- ✅ URL temporaire générée (ex: `https://abc123.myshopify.com?preview_theme_id=123`)
- ✅ Hot reload automatique
- ✅ Changements visibles en temps réel
- ✅ Pas de localhost:3000 (URL Shopify temporaire à la place)

---

## 🔄 COMMENT ÇA MARCHE

**`shopify theme dev`:**
- Crée un tunnel vers Shopify
- Synchronise fichiers en temps réel
- Hot reload comme Next.js
- Preview sur URL Shopify temporaire

**C'est comme `npm run dev` mais pour Shopify!**

---

## ✅ CE QUI FONCTIONNE EN LOCAL

### Templates/CSS/JS
- ✅ Templates Liquid
- ✅ Sections
- ✅ Snippets
- ✅ CSS/JS
- ✅ Hot reload

### Apps (ne fonctionnent qu'en production)
- ❌ FlipHTML5 (besoin store réel)
- ❌ LemonInk (besoin store réel)
- ❌ Sky Pilot (besoin store réel)

**Solution:** Tester apps après `shopify theme push --unpublished`

---

## 📋 WORKFLOW RECOMMANDÉ

### 1. Développement Local
```bash
shopify theme dev
```
- Créer/modifier templates
- Voir changements en temps réel
- Hot reload automatique

### 2. Tests Apps
```bash
shopify theme push --unpublished
```
- Push vers thème non publié
- Tester apps sur store réel

---

## 🎯 FICHIERS À CRÉER EN LOCAL

**Templates:**
- `templates/product.book.liquid`
- `templates/collection.books.liquid`
- `templates/page.reader.liquid`

**Sections:**
- `sections/book-catalog.liquid`

**Snippets:**
- `snippets/watermark.liquid`

**Tous testables avec `shopify theme dev`!**

---

## 🔗 COORDINATION AVEC CURSOR

**Cursor a créé:**
- ✅ `assets/fliphtml5-config.js`
- ✅ `assets/shipping-config.js`
- ✅ `sections/subscription-plans.liquid`
- ✅ `snippets/drm-protection.liquid`
- ✅ `templates/customers/account.liquid`

**Claude Code doit créer:**
- ⏳ Templates manquants (3 fichiers)
- ⏳ Sections manquantes (1 fichier)
- ⏳ Snippets manquants (1 fichier)

**Pas de conflit** - Fichiers différents!

---

## ✅ ACTION IMMÉDIATE

**Lance:**
```bash
cd /Users/codenolimits-dreamai-nanach/Desktop/ESTHER\ IFRA/breslev-shopify-complete
shopify theme dev
```

**Puis crée les fichiers manquants et teste en temps réel!**

---

**OUI, développement local possible avec Shopify CLI! 🚀**

