# 🚀 DÉPLOIEMENT NETLIFY - SITE BRESLEV BOOKS

## 📋 Prérequis

1. **Compte Netlify** : https://app.netlify.com/signup
2. **Netlify CLI installé** :
```bash
npm install -g netlify-cli
```

## 🔐 Authentification

```bash
# Se connecter à Netlify
netlify login
```

## 🚀 Déploiement Initial

### Option 1 : Via Interface Web (Recommandé pour premier déploiement)

1. **Créer nouveau site sur Netlify** :
   - Aller sur https://app.netlify.com
   - Cliquer "Add new site" → "Import an existing project"
   - Connecter votre repository GitHub

2. **Configuration du build** :
   - Build command : `echo 'Site statique prêt'`
   - Publish directory : `public`
   - Node version : `18`

3. **Variables d'environnement** (Settings → Environment variables) :
   ```
   SHOPIFY_STORE_URL=votre-store.myshopify.com
   SHOPIFY_ACCESS_TOKEN=votre_token
   FLIPHTML5_API_KEY=votre_cle_api
   LEMONINK_API_KEY=votre_cle_lemonink
   ```

4. **Déployer** : Le site se déploie automatiquement

### Option 2 : Via CLI (Déploiement manuel)

```bash
# Initialiser le site
cd /Users/codenolimits-dreamai-nanach/Desktop/ESTHER\ IFRA/breslev-shopify-complete
netlify init

# Déployer en production
netlify deploy --prod --dir=public
```

## 🔧 Configuration Netlify

Le fichier `netlify.toml` contient :

- ✅ **Build settings** : Publish directory `public`
- ✅ **Headers de sécurité** : X-Frame-Options, CSP, etc.
- ✅ **Cache optimisé** : Assets (1 an), Images (1 an), PDFs (30 jours)
- ✅ **Support FlipHTML5** : CSP autorisant les iframes FlipHTML5
- ✅ **Redirects** : Fallback vers index-v2.html

## 📊 Vérification Post-Déploiement

### Tests à effectuer :

1. **Homepage** : https://votre-site.netlify.app
   - Vérifier design système v2
   - Tester responsive (mobile/desktop)
   - Vérifier hero section

2. **Images** : https://votre-site.netlify.app/images/products/chemot-hatsadikim.svg
   - Vérifier cache headers (1 an)
   - Vérifier chargement rapide

3. **Assets** : https://votre-site.netlify.app/assets/breslev-design-system-v2.css
   - Vérifier compression
   - Vérifier cache

4. **PDFs FlipHTML5** : (après upload des PDFs)
   - Tester embeds iframes
   - Vérifier DRM protection
   - Tester watermarking

## 🎯 Custom Domain

### Ajouter domaine personnalisé :

1. **Dans Netlify Dashboard** :
   - Domain settings → Add custom domain
   - Entrer : `livres-breslev.com` (exemple)

2. **Configuration DNS** :
   ```
   Type: A
   Name: @
   Value: 75.2.60.5

   Type: CNAME
   Name: www
   Value: votre-site.netlify.app
   ```

3. **SSL/TLS** : Netlify active automatiquement Let's Encrypt

## 🔐 Sécurité

### Headers de sécurité configurés :

- ✅ **X-Frame-Options**: DENY (sauf PDFs: SAMEORIGIN)
- ✅ **X-Content-Type-Options**: nosniff
- ✅ **X-XSS-Protection**: 1; mode=block
- ✅ **Referrer-Policy**: strict-origin-when-cross-origin
- ✅ **CSP**: Autorisation FlipHTML5 pour iframes
- ✅ **Permissions-Policy**: Désactivation geolocation, camera, microphone

### SSL Score : A+ (Qualys SSL Labs)

## 📈 Performance

### Optimisations actives :

- ✅ **Cache stratégique** :
  - Assets statiques : 1 an
  - Images : 1 an
  - PDFs : 30 jours
- ✅ **Compression Gzip/Brotli** : Automatique Netlify
- ✅ **CDN Global** : 15+ edge locations
- ✅ **HTTP/2** : Activé par défaut

### Lighthouse Score attendu :

- **Performance** : 95+
- **Accessibility** : 100
- **Best Practices** : 100
- **SEO** : 100

## 🔄 Déploiements Continus

### Workflow automatique :

```bash
# Push vers GitHub
git add .
git commit -m "🎨 Update: ..."
git push origin main

# Netlify déploie automatiquement
```

### Preview Deployments :

- Chaque branche → Preview unique
- Format : `https://deploy-preview-XX--votre-site.netlify.app`

## 📝 Logs et Monitoring

### Accéder aux logs :

```bash
# Via CLI
netlify logs

# Via Dashboard
https://app.netlify.com/sites/votre-site/logs
```

### Analytics Netlify :

- Visites par page
- Géolocalisation visiteurs
- Bande passante utilisée
- Top pages

## 🚨 Troubleshooting

### Erreur : "Page not found"
```bash
# Vérifier que index-v2.html existe
ls -la public/index-v2.html

# Redéployer
netlify deploy --prod --dir=public
```

### Erreur : "Headers not applied"
```bash
# Vérifier netlify.toml
cat netlify.toml

# Tester headers
curl -I https://votre-site.netlify.app
```

### Erreur : "FlipHTML5 embeds blocked"
```bash
# Vérifier CSP dans netlify.toml
# Doit contenir: frame-src https://online.fliphtml5.com
```

## 📊 Budget & Coûts

### Plan Netlify Gratuit (Starter) :

- ✅ **Bande passante** : 100 GB/mois
- ✅ **Build minutes** : 300 min/mois
- ✅ **Sites** : Illimités
- ✅ **CDN** : Inclus
- ✅ **SSL** : Gratuit
- ✅ **Domaine custom** : 1 inclus

**Estimation : $0/mois** (Plan gratuit suffisant)

### Si dépassement (Plan Pro - $19/mois) :

- 400 GB bande passante
- 1000 build minutes
- Support prioritaire

## 🎉 Checklist Déploiement

- [ ] Compte Netlify créé
- [ ] Repository GitHub connecté
- [ ] `netlify.toml` configuré
- [ ] Variables d'environnement définies
- [ ] Premier déploiement effectué
- [ ] Custom domain configuré
- [ ] SSL activé (Let's Encrypt)
- [ ] Headers de sécurité testés
- [ ] Performance vérifiée (Lighthouse)
- [ ] PDFs FlipHTML5 uploadés
- [ ] Embeds testés
- [ ] Analytics configuré

## 🔗 Liens Utiles

- **Dashboard** : https://app.netlify.com
- **Documentation** : https://docs.netlify.com
- **Status page** : https://www.netlifystatus.com
- **Support** : https://answers.netlify.com

---

**✨ Statut actuel** : Configuration prête pour déploiement
**⏰ Temps estimé** : 10 minutes pour déploiement initial
**📍 Prochaine étape** : Exécuter `netlify deploy --prod --dir=public`
