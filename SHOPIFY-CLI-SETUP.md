# 🔧 SETUP SHOPIFY CLI - ÉTAT ACTUEL

## 📊 VÉRIFICATION INSTALLATION

**Status:** À vérifier sur votre machine

---

## 🔍 CE QUI EST NÉCESSAIRE

### 1. Installation Shopify CLI

```bash
# Vérifier si installé
which shopify
shopify version

# Si pas installé, installer:
npm install -g @shopify/cli @shopify/theme
```

### 2. Connexion au Store

**Deux options:**

#### Option A: Connexion Interactive
```bash
shopify login
```
- Ouvre navigateur
- Connexion Shopify
- Génère token automatiquement

#### Option B: Connexion avec Store ID
```bash
shopify login --store=esther-ifrah.myshopify.com
```

**Pas besoin de clés API manuelles** - Shopify CLI gère tout!

---

## 🔑 CLÉS NÉCESSAIRES (POUR LES APPS)

### Apps Shopify (Pas pour CLI, mais pour fonctionnalités)

**1. FlipHTML5 Business**
- Licence Key: À obtenir après achat ($299/an)
- À mettre dans: `assets/fliphtml5-config.js` ligne 4

**2. LemonInk**
- API Key: À obtenir sur lemonink.co
- À mettre dans: Settings Shopify → `lemonink_api_key`

**3. Sky Pilot**
- Pas de clé API nécessaire
- Juste installer l'app depuis Shopify App Store
- Créer produits abonnement dans Shopify

**4. Weglot**
- Pas de clé API nécessaire
- Installer depuis App Store
- Configurer traductions

---

## ✅ CHECKLIST SETUP

### Shopify CLI
- [ ] Installer: `npm install -g @shopify/cli @shopify/theme`
- [ ] Vérifier: `shopify version`
- [ ] Se connecter: `shopify login`
- [ ] Tester: `shopify theme dev`

### Store Shopify
- [ ] Compte Shopify créé
- [ ] Store créé (esther-ifrah.myshopify.com)
- [ ] Accès admin disponible

### Apps (Après setup store)
- [ ] FlipHTML5 Business (licence key)
- [ ] LemonInk (API key)
- [ ] Sky Pilot (installer app)
- [ ] Weglot (installer app)

---

## 🚀 COMMANDES RAPIDES

```bash
# Vérifier installation
shopify version

# Se connecter
shopify login

# Lancer dev local
cd breslev-shopify-complete
shopify theme dev

# Push vers store
shopify theme push --unpublished
```

---

## 📝 NOTES IMPORTANTES

**Shopify CLI:**
- ✅ Pas besoin de clés API manuelles
- ✅ Connexion via navigateur (OAuth)
- ✅ Token géré automatiquement
- ✅ Stocké localement (~/.config/shopify)

**Apps Shopify:**
- ⚠️ Besoin de clés/licences séparées
- ⚠️ À configurer après installation apps
- ⚠️ Pas nécessaire pour développement local

---

**Status:** Shopify CLI peut être installé maintenant, pas besoin de clés pour commencer!

