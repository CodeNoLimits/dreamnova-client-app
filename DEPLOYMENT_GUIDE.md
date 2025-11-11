# 🚀 Guide de Déploiement - DreamNova Client App

Guide complet pour déployer l'application sur différentes plateformes.

## 📋 Prérequis

- Node.js >= 18.0.0
- Compte Vercel OU Netlify
- Clé API Google Gemini (https://makersuite.google.com/app/apikey)
- Git configuré

## 🎯 Méthode Rapide - Vercel (Recommandé)

### Option 1: Déploiement depuis GitHub

1. **Push vers GitHub** (déjà fait ✅)
   ```bash
   git push origin main
   ```

2. **Importer sur Vercel**
   - Allez sur https://vercel.com/new
   - Cliquez "Import Git Repository"
   - Sélectionnez `dreamnova-client-app`
   - Configurez les variables d'environnement :
     - `NEXT_PUBLIC_GEMINI_API_KEY`: Votre clé Gemini
     - `GEMINI_API_KEY`: Même clé Gemini
   - Cliquez "Deploy"

3. **C'est tout!** 🎉
   - Vercel détecte automatiquement Next.js
   - Build et déploiement automatiques
   - URL de production générée

### Option 2: Déploiement via CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Ou directement en production
vercel --prod
```

## 🌐 Méthode Alternative - Netlify

### Déploiement depuis GitHub

1. **Push vers GitHub** (déjà fait ✅)

2. **Importer sur Netlify**
   - Allez sur https://app.netlify.com/start
   - Cliquez "Import from Git"
   - Sélectionnez `dreamnova-client-app`
   - Build settings (auto-détectés via netlify.toml):
     - Build command: `npm run build`
     - Publish directory: `out`
   - Variables d'environnement :
     - `NEXT_PUBLIC_GEMINI_API_KEY`: Votre clé Gemini
     - `GEMINI_API_KEY`: Même clé Gemini
   - Cliquez "Deploy"

### Déploiement via CLI

```bash
# Installer Netlify CLI
npm i -g netlify-cli

# Se connecter
netlify login

# Initialiser
netlify init

# Déployer
./deploy/netlify.sh
```

## ⚙️ Configuration des Variables d'Environnement

### Variables Obligatoires

| Variable | Description | Où l'obtenir |
|----------|-------------|--------------|
| `NEXT_PUBLIC_GEMINI_API_KEY` | Clé API Gemini (client) | https://makersuite.google.com/app/apikey |
| `GEMINI_API_KEY` | Clé API Gemini (serveur) | Même lien |

### Variables Optionnelles (Phase 2)

| Variable | Description |
|----------|-------------|
| `DATABASE_PROVIDER` | supabase \| mongodb \| vercel-postgres |
| `DATABASE_URL` | URL de connexion BDD |
| `AUTH_PROVIDER` | supabase \| clerk \| auth0 |
| `STORAGE_PROVIDER` | cloudinary \| s3 \| vercel-blob |

## 🔧 Configuration Plateforme par Plateforme

### Vercel

**Avantages:**
- ✅ Détection automatique Next.js
- ✅ Edge Functions natives
- ✅ Analytics intégrés
- ✅ Previews automatiques PR
- ✅ CDN global ultra-rapide

**Configuration recommandée:**
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install"
}
```

### Netlify

**Avantages:**
- ✅ Interface simple
- ✅ Edge Functions
- ✅ Forms natives
- ✅ Split testing A/B

**Configuration (netlify.toml déjà créé):**
```toml
[build]
  command = "npm run build"
  publish = "out"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 📊 Checklist Post-Déploiement

- [ ] Vérifier l'URL de production fonctionne
- [ ] Tester le flux d'onboarding complet
- [ ] Vérifier que l'IA Gemini répond
- [ ] Tester sur mobile (responsive)
- [ ] Vérifier Lighthouse score > 90
- [ ] Configurer domaine personnalisé (optionnel)
- [ ] Configurer monitoring (Vercel Analytics / Netlify Analytics)
- [ ] Configurer alertes erreurs (Sentry optionnel)

## 🎨 Optimisations Recommandées

### Performance

```bash
# Analyser le bundle
npm run build
npx @next/bundle-analyzer
```

### SEO

- [ ] Ajouter robots.txt
- [ ] Ajouter sitemap.xml
- [ ] Configurer Open Graph images
- [ ] Vérifier balises meta

### Monitoring

**Vercel Analytics:**
```bash
npm i @vercel/analytics
```

**Sentry (optionnel):**
```bash
npm i @sentry/nextjs
npx @sentry/wizard -i nextjs
```

## 🚨 Dépannage

### Erreur: Build Failed

**Vérifier:**
1. Node version >= 18
2. Variables d'env configurées
3. `npm install` fonctionne localement
4. `npm run build` fonctionne localement

### Erreur: Gemini API

**Vérifier:**
1. Clé API valide
2. Variable `NEXT_PUBLIC_GEMINI_API_KEY` configurée
3. Quota API non dépassé

### Erreur: 404 sur routes

**Vercel:** Auto-géré par Next.js
**Netlify:** Vérifier que netlify.toml contient les redirects

## 📞 Support

- **Issues GitHub**: https://github.com/CodeNoLimits/dreamnova-client-app/issues
- **Documentation Vercel**: https://vercel.com/docs
- **Documentation Netlify**: https://docs.netlify.com

---

**Bonne chance avec votre déploiement! 🚀**
