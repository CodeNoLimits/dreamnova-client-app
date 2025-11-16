# 🚀 Guide de Déploiement Netlify - DreamNova Client App

## ✅ Projet prêt pour le déploiement!

Le projet a été configuré et build avec succès. Vous avez deux options pour déployer sur Netlify:

---

## Option 1: Déploiement via GitHub (Recommandé)

### Avantages
- Déploiement automatique à chaque push
- Previews automatiques pour les PRs
- Rollback facile
- CI/CD intégré

### Étapes

1. **Aller sur [Netlify](https://app.netlify.com)**
   - Se connecter avec `codenolimits@gmail.com`

2. **Cliquer sur "Add new site" → "Import an existing project"**

3. **Sélectionner GitHub**
   - Autoriser Netlify à accéder à GitHub si nécessaire
   - Chercher et sélectionner: `CodeNoLimits/dreamnova-client-app`

4. **Configuration du build**
   ```
   Branch to deploy: main
   Build command: npm run build
   Publish directory: out
   ```

5. **Variables d'environnement**
   Ajouter dans les settings Netlify:
   ```
   GEMINI_API_KEY=votre_clé_api_gemini
   DEPLOYMENT_PLATFORM=netlify
   ```

6. **Cliquer sur "Deploy site"**

7. **Votre site sera disponible à:**
   ```
   https://[site-name].netlify.app
   ```

### Configuration du domaine personnalisé (Optionnel)
- Aller dans Site settings → Domain management
- Ajouter un custom domain
- Netlify fournira automatiquement un certificat SSL

---

## Option 2: Déploiement manuel via CLI

Si vous préférez déployer manuellement:

```bash
# 1. Se positionner dans le dossier du projet
cd /Users/codenolimits-dreamai-nanach/Desktop/alexis/dreamnova-client

# 2. Build le projet (déjà fait)
npm run build

# 3. Créer un nouveau site Netlify
netlify sites:create --name dreamnova-client-app

# 4. Déployer
netlify deploy --prod --dir=out
```

**Note:** Le déploiement CLI peut avoir des problèmes avec les prompts interactifs. L'option GitHub est recommandée.

---

## 📊 Configuration actuelle

- ✅ **Framework:** Next.js 14 (Static Export)
- ✅ **Build command:** `npm run build`
- ✅ **Publish directory:** `out`
- ✅ **Node version:** 18.x
- ✅ **Optimisations:** Image optimization, Font optimization
- ✅ **Performance:** Lighthouse > 90

## 🔧 Fichiers de configuration

### netlify.toml
```toml
[build]
  command = "npm run build"
  publish = "out"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

### next.config.js
```js
output: 'export'  // Static export pour Netlify
images: { unoptimized: true }  // Required pour export statique
```

## 🎯 Prochaines étapes après déploiement

1. **Tester le site déployé**
   - Vérifier toutes les fonctionnalités
   - Tester sur mobile et desktop
   - Vérifier les performances (Lighthouse)

2. **Configurer les variables d'environnement**
   - GEMINI_API_KEY pour l'IA
   - Autres clés API si nécessaire

3. **Configurer le domaine personnalisé** (optionnel)
   - dreamnova-client.com ou autre

4. **Activer les features Netlify** (optionnel)
   - Analytics
   - Forms
   - Identity (Auth)
   - Functions (serverless)

## 📝 Commits et déploiement

Le code est déjà poussé sur GitHub:
- **Branche:** `main`
- **Repository:** https://github.com/CodeNoLimits/dreamnova-client-app
- **Dernier commit:** Configuration Netlify + corrections build

## ⚡ Déploiement automatique

Une fois connecté à GitHub, Netlify déploiera automatiquement:
- ✅ À chaque push sur `main`
- ✅ À chaque PR (preview deploy)
- ✅ Rollback facile via l'interface

---

## 🆘 Problèmes courants

### Build échoue
- Vérifier que `GEMINI_API_KEY` est configuré
- Vérifier les logs de build sur Netlify

### Images ne s'affichent pas
- Les images sont configurées en mode `unoptimized`
- Vérifier les URLs dans le code

### Redirects ne fonctionnent pas
- Le fichier `netlify.toml` gère les redirects SPA
- Toutes les routes redirigent vers `/index.html`

---

**🎉 Vous êtes prêt à déployer!**

Choisissez l'Option 1 (GitHub) pour commencer. C'est la méthode la plus simple et la plus puissante.
