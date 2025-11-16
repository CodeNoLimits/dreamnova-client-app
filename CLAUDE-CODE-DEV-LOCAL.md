# 🖥️ CLAUDE CODE - DÉVELOPPEMENT LOCAL SHOPIFY

## ⚡ SETUP RAPIDE (2 minutes)

```bash
# 1. Installer Shopify CLI
npm install -g @shopify/cli @shopify/theme

# 2. Se connecter au store
shopify login --store=esther-ifrah.myshopify.com

# 3. Aller dans le dossier
cd /Users/codenolimits-dreamai-nanach/Desktop/ESTHER\ IFRA/breslev-shopify-complete

# 4. Lancer développement local
shopify theme dev
```

**Résultat:** URL temporaire générée (ex: `https://abc123.myshopify.com?preview_theme_id=123`)

---

## 🔄 COMMENT ÇA MARCHE

**Shopify Theme Dev:**
- ✅ Crée un tunnel vers Shopify
- ✅ Synchronise fichiers en temps réel
- ✅ Hot reload automatique
- ✅ Preview sur URL Shopify temporaire
- ✅ Pas de serveur local classique

**Différence avec Next.js:**
- ❌ Pas de `localhost:3000`
- ✅ URL Shopify temporaire à la place
- ✅ Même principe de hot reload

---

## 📋 CE QUI FONCTIONNE EN LOCAL

### ✅ Fonctionne avec `shopify theme dev`
- Templates Liquid
- Sections
- Snippets
- CSS/JS
- Assets
- Hot reload

### ❌ Ne fonctionne PAS en local
- Apps Shopify (FlipHTML5, LemonInk, Sky Pilot)
- Checkout Shopify
- Webhooks
- Metafields dynamiques

**Solution:** Tester apps sur store réel (thème non publié)

---

## 🎯 WORKFLOW RECOMMANDÉ

### 1. Développement Local (Templates/CSS/JS)
```bash
shopify theme dev
```
- Modifier fichiers
- Voir changements en temps réel
- Hot reload automatique

### 2. Tests Apps (Store réel)
```bash
shopify theme push --unpublished
```
- Push vers thème non publié
- Tester apps sur store réel
- Preview dans admin Shopify

---

## 📂 FICHIERS À CRÉER EN LOCAL

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

## ✅ CHECKLIST POUR CLAUDE CODE

- [ ] Installer Shopify CLI
- [ ] Se connecter au store
- [ ] Lancer `shopify theme dev`
- [ ] Créer templates manquants
- [ ] Tester en local
- [ ] Push vers store pour tests apps

---

## 🆘 TROUBLESHOOTING

**Erreur de connexion:**
```bash
shopify logout
shopify login
```

**Fichiers ne se synchronisent pas:**
```bash
shopify theme dev --reset
```

**URL temporaire perdue:**
- Relancer `shopify theme dev`
- URL sera dans le terminal

---

**Claude Code peut utiliser `shopify theme dev` pour développement local! 🚀**

