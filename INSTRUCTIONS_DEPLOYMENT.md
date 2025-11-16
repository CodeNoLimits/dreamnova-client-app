# 📦 INSTRUCTIONS COMPLÈTES DE DÉPLOIEMENT

## 🎯 Objectif

Déployer le site Breslev Books sur:
1. **Netlify** (site preview/documentation)
2. **Shopify** (e-commerce production)

---

## 🚀 OPTION 1 : DÉPLOIEMENT NETLIFY (RECOMMANDÉ POUR PREVIEW)

### Méthode A : Script automatique

```bash
# Exécuter le script de déploiement
cd "/Users/codenolimits-dreamai-nanach/Desktop/ESTHER IFRA/breslev-shopify-complete"
./scripts/deploy-netlify.sh
```

**Avantages** :
- ✅ Déploiement en 1 commande
- ✅ Vérifications automatiques
- ✅ Ouvre le site automatiquement

### Méthode B : Via interface web (Plus fiable)

1. **Aller sur Netlify** : https://app.netlify.com
2. **Cliquer** : "Add new site" → "Deploy manually"
3. **Glisser-déposer** le dossier `public/`
4. **Attendre** : Déploiement automatique (30 secondes)
5. **Récupérer URL** : `https://[random-name].netlify.app`

**C'est la méthode la plus simple et fiable !**

### Méthode C : Via CLI manuel

```bash
cd "/Users/codenolimits-dreamai-nanach/Desktop/ESTHER IFRA/breslev-shopify-complete"

# Se connecter (si pas déjà fait)
netlify login

# Déployer
netlify deploy --dir=public

# Récupérer l'URL de preview
# Puis déployer en production si OK
netlify deploy --prod --dir=public
```

---

## 🛍️ OPTION 2 : DÉPLOIEMENT SHOPIFY (PRODUCTION E-COMMERCE)

### Étape 1 : Préparer les fichiers

Le projet est déjà organisé comme un thème Shopify :

```
✅ assets/      - CSS, JS
✅ config/      - Settings
✅ layout/      - Theme structure
✅ locales/     - Traductions (FR/HE/EN)
✅ sections/    - Sections réutilisables
✅ snippets/    - Composants
✅ templates/   - Pages templates
```

### Étape 2 : Authentification Shopify

```bash
# Se connecter
shopify auth login

# Ou avec store spécifique
shopify auth login --store=votre-store.myshopify.com
```

### Étape 3 : Déploiement en développement

```bash
cd "/Users/codenolimits-dreamai-nanach/Desktop/ESTHER IFRA/breslev-shopify-complete"

# Lancer preview live
shopify theme dev

# Output:
# 🎨 Preview: https://votre-store.myshopify.com?preview_theme_id=XXXXX
```

**Testez tout avant de publier !**

### Étape 4 : Pousser vers Shopify

```bash
# Push vers thème de développement
shopify theme push --development

# Ou directement vers production (ATTENTION)
shopify theme push --live
```

### Étape 5 : Publier en production

```bash
# Publier comme thème actif
shopify theme publish
```

---

## 📚 INTÉGRATION DES PDFS FLIPHTML5

### Étape 1 : Localiser les PDFs

Les PDFs doivent être dans :
```
public/pdfs/
├── chemot-hatsadikim.pdf
├── vie-breslever.pdf
├── likoutey-moharane-tome1.pdf
└── [... autres livres ...]
```

**Actuellement** : Aucun PDF trouvé dans le projet

**Action requise** : Copier les PDFs depuis leur emplacement actuel

Chercher dans :
```bash
# Option 1: Bureau
find ~/Desktop -name "*.pdf" -type f 2>/dev/null | grep -i "nachman\|breslev\|moharan"

# Option 2: Documents
find ~/Documents -name "*.pdf" -type f 2>/dev/null | grep -i "nachman\|breslev\|moharan"

# Option 3: Downloads
find ~/Downloads -name "*.pdf" -type f 2>/dev/null | grep -i "nachman\|breslev\|moharan"
```

### Étape 2 : Uploader vers FlipHTML5

#### Via interface web (méthode simple) :

1. **Créer compte** : https://fliphtml5.com/signup
2. **Upload PDF** : Dashboard → Upload new flipbook
3. **Configurer DRM** :
   - Enable watermark : ✅
   - Disable download : ✅
   - Disable print : ✅
4. **Récupérer embed code** : Settings → Share → Embed code
5. **Copier ID** : Dans l'URL `https://online.fliphtml5.com/[YOUR_ID]/[BOOK_ID]/`

#### Via script automatique :

```bash
# Après avoir mis vos PDFs dans public/pdfs/
./scripts/upload-to-fliphtml5.sh
```

**Note** : Éditer d'abord le script pour ajouter votre API key FlipHTML5

### Étape 3 : Mettre à jour le mapping

Éditer `config/fliphtml5-mapping.json` :

```json
{
  "chemot-hatsadikim": {
    "fliphtml5_id": "VOTRE_ID_ICI",
    "book_id": "VOTRE_BOOK_ID_ICI",
    "embed_url": "https://online.fliphtml5.com/..."
  }
}
```

---

## ✅ CHECKLIST COMPLÈTE DE DÉPLOIEMENT

### Netlify (Preview)

- [ ] Compte Netlify créé
- [ ] Site déployé via drag-and-drop ou CLI
- [ ] URL récupérée : `https://______.netlify.app`
- [ ] Site testé (design, responsive, navigation)
- [ ] Custom domain configuré (optionnel)
- [ ] SSL vérifié (automatique)

### Shopify (Production)

- [ ] Store Shopify créé
- [ ] Shopify CLI installé
- [ ] Authentification effectuée
- [ ] Thème poussé en développement
- [ ] Preview testé : `shopify theme dev`
- [ ] Apps installées :
  - [ ] Sky Pilot (digital delivery)
  - [ ] LemonInk (watermarking)
  - [ ] Multi-currency converter
- [ ] Products importés (30 produits)
- [ ] Collections créées (5 collections)
- [ ] Shipping configuré (France, Israel, Canada)
- [ ] Payment methods activés
- [ ] Thème publié en production

### PDFs FlipHTML5

- [ ] PDFs localisés sur ordinateur
- [ ] PDFs copiés dans `public/pdfs/`
- [ ] Compte FlipHTML5 créé
- [ ] PDFs uploadés sur FlipHTML5
- [ ] DRM configuré (watermark, no download)
- [ ] Embed codes récupérés
- [ ] Mapping JSON mis à jour
- [ ] Embeds testés dans Shopify

### SEO & Analytics

- [ ] Google Analytics configuré
- [ ] Meta tags vérifiés
- [ ] Sitemap soumis à Google
- [ ] Facebook Pixel configuré (optionnel)
- [ ] Search Console configuré

### Tests finaux

- [ ] Checkout complet testé
- [ ] Email confirmation reçu
- [ ] Digital delivery (Sky Pilot) testé
- [ ] Multi-currency testé
- [ ] Responsive testé (mobile/tablet/desktop)
- [ ] FlipHTML5 embeds testés
- [ ] Performance Lighthouse > 90

---

## 🚨 PROBLÈMES COURANTS & SOLUTIONS

### Problème : "Netlify deploy failed"

**Solution** :
```bash
# Vérifier que public/index-v2.html existe
ls -la public/index-v2.html

# Utiliser méthode manuelle (drag-and-drop sur netlify.com)
```

### Problème : "Shopify theme push failed"

**Solution** :
```bash
# Vérifier syntaxe Liquid
shopify theme check

# Corriger erreurs puis repousser
shopify theme push --development
```

### Problème : "PDFs not found"

**Solution** :
```bash
# Chercher PDFs sur tout le système
find ~ -name "*.pdf" -type f 2>/dev/null | grep -i "breslev\|nachman"

# Copier dans le bon dossier
cp /chemin/vers/pdfs/*.pdf public/pdfs/
```

### Problème : "FlipHTML5 embeds not loading"

**Solution** :
- Vérifier CSP dans `netlify.toml` autorise `https://online.fliphtml5.com`
- Vérifier que les IDs dans `fliphtml5-mapping.json` sont corrects
- Tester l'embed code directement dans HTML

---

## 📞 PROCHAINES ÉTAPES

### Après déploiement Netlify :

1. Tester le site : `https://[votre-site].netlify.app`
2. Vérifier design system v2
3. Tester navigation et liens
4. Vérifier responsive mobile
5. Configurer custom domain (optionnel)

### Après déploiement Shopify :

1. Tester checkout complet
2. Vérifier emails de confirmation
3. Tester livraison digitale Sky Pilot
4. Vérifier multi-currency
5. Tester abonnements
6. Lancer campagne marketing

### Pour les PDFs :

1. Localiser tous les PDFs des livres
2. Les copier dans `public/pdfs/`
3. Uploader sur FlipHTML5
4. Configurer DRM
5. Mettre à jour mapping
6. Tester embeds

---

## 📚 DOCUMENTATION COMPLÈTE

- **DEPLOY_NETLIFY.md** : Guide détaillé Netlify
- **SHOPIFY_CLI_PRODUCTION.md** : Guide complet Shopify
- **public/pdfs/README.md** : Instructions PDFs
- **RAPPORT-FINAL-COMPLET.md** : Rapport exécutif complet

---

## 🎉 RÉSUMÉ ULTRA-RAPIDE

**Pour déployer en 5 minutes** :

```bash
# 1. Netlify (preview)
# Aller sur app.netlify.com → "Deploy manually" → Glisser dossier public/

# 2. Shopify (production)
shopify auth login
shopify theme dev
# Tester puis:
shopify theme publish

# 3. PDFs
# Copier PDFs dans public/pdfs/
# Upload sur fliphtml5.com
# Mettre à jour config/fliphtml5-mapping.json
```

**C'est tout ! 🚀**

---

**Besoin d'aide ?**
- Netlify Support : https://answers.netlify.com
- Shopify Support : https://help.shopify.com
- FlipHTML5 Support : https://help.fliphtml5.com
