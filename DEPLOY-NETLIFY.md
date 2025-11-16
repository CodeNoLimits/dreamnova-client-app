# 🚀 DÉPLOIEMENT NETLIFY - ESTHER IFRAH

## ✅ CONFIGURATION CRÉÉE

### Fichiers créés :
- ✅ `netlify.toml` - Configuration Netlify complète
- ✅ Headers de sécurité configurés
- ✅ Cache optimisé pour assets
- ✅ Redirects configurés

## 📋 ÉTAPES DE DÉPLOIEMENT

### Option 1: Via Netlify CLI (Recommandé)

```bash
# 1. Installer Netlify CLI (si pas déjà fait)
npm install -g netlify-cli

# 2. Se connecter
netlify login

# 3. Initialiser le site
cd breslev-shopify-complete
netlify init

# 4. Déployer
netlify deploy --prod
```

### Option 2: Via Netlify Dashboard

1. Aller sur [app.netlify.com](https://app.netlify.com)
2. Cliquer sur "Add new site" → "Import an existing project"
3. Connecter votre repository Git (GitHub/GitLab/Bitbucket)
4. Configurer :
   - **Build command:** (vide, site statique)
   - **Publish directory:** `public`
5. Cliquer sur "Deploy site"

### Option 3: Drag & Drop

1. Aller sur [app.netlify.com/drop](https://app.netlify.com/drop)
2. Glisser-déposer le dossier `public`
3. Le site sera déployé automatiquement

## 🔧 CONFIGURATION

### Variables d'environnement (si nécessaire)

Dans Netlify Dashboard → Site settings → Environment variables :

```
NODE_VERSION=18
```

### Domaines personnalisés

1. Netlify Dashboard → Domain settings
2. Ajouter domaine personnalisé (ex: preview.estherifrah.com)
3. Configurer DNS selon instructions Netlify

## 📊 MONITORING

### Analytics Netlify (optionnel)
- Activer dans Site settings → Analytics
- Voir les statistiques de visite

### Form submissions (si formulaires)
- Configurer dans Site settings → Forms

## ✅ VÉRIFICATION POST-DÉPLOIEMENT

1. ✅ Site accessible
2. ✅ HTTPS activé
3. ✅ Headers de sécurité présents
4. ✅ Assets chargés correctement
5. ✅ Redirects fonctionnent

## 🔗 URL DE DÉPLOIEMENT

Après déploiement, vous obtiendrez une URL du type :
```
https://[nom-du-site].netlify.app
```

---

**Site prêt pour déploiement Netlify! 🚀**

