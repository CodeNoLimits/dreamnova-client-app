# 🛍️ SHOPIFY CLI - DÉPLOIEMENT PRODUCTION

## 📦 Installation Shopify CLI

### Prérequis

```bash
# Vérifier Node.js (v18+)
node --version

# Vérifier npm
npm --version
```

### Installation

```bash
# Installer Shopify CLI globalement
npm install -g @shopify/cli @shopify/theme

# Vérifier installation
shopify version
```

**Version actuelle** : `@shopify/cli@3.87.0` (ou supérieure)

## 🔐 Authentification Shopify

### Se connecter à votre store

```bash
# Authentification interactive
shopify auth login

# Ou avec store spécifique
shopify auth login --store=votre-store.myshopify.com
```

### Créer Partner Account (si nécessaire)

1. Aller sur https://partners.shopify.com
2. Créer compte développeur
3. Créer Development Store ou connecter store existant

## 🎨 Structure du Thème Shopify

### Organisation des fichiers

Notre projet est organisé comme un thème Shopify complet :

```
breslev-shopify-complete/
├── assets/                    # CSS, JS, images
│   ├── breslev-design-system-v2.css
│   ├── cart-logic.js
│   └── multi-currency.js
├── config/                    # Configuration thème
│   ├── settings_schema.json
│   └── settings_data.json
├── layout/                    # Layouts principaux
│   └── theme.liquid
├── locales/                   # Traductions
│   ├── fr.json
│   ├── he.json
│   └── en.json
├── sections/                  # Sections réutilisables
│   ├── header.liquid
│   ├── hero-section.liquid
│   ├── footer.liquid
│   └── product-grid.liquid
├── snippets/                  # Composants
│   ├── book-card.liquid
│   └── trust-badges.liquid
├── templates/                 # Templates pages
│   ├── index.json
│   ├── product.book.liquid
│   └── collection.books.liquid
└── public/                    # Assets statiques (Netlify)
    └── index-v2.html          # Preview
```

## 🚀 Déploiement vers Shopify

### Étape 1 : Initialiser le thème

```bash
cd /Users/codenolimits-dreamai-nanach/Desktop/ESTHER\ IFRA/breslev-shopify-complete

# Initialiser connexion Shopify
shopify theme init
```

### Étape 2 : Pousser le thème vers Shopify

```bash
# Push vers thème de développement
shopify theme push --development

# Ou directement vers thème live (ATTENTION)
shopify theme push --live
```

**⚠️ Recommandation** : Toujours tester en développement d'abord

### Étape 3 : Preview en temps réel

```bash
# Lancer serveur de développement
shopify theme dev

# Output:
# 🎨 Preview: https://votre-store.myshopify.com?preview_theme_id=XXXXX
# 📝 Editor: https://votre-store.myshopify.com/admin/themes/XXXXX/editor
```

### Étape 4 : Publier le thème

```bash
# Publier comme thème actif
shopify theme publish
```

## 🔧 Configuration Shopify Store

### Apps à installer

#### 1. **SKY PILOT** (Digital Products)
```bash
# Aller dans Shopify Admin
https://votre-store.myshopify.com/admin/apps

# Installer Sky Pilot
# Configuration: voir config/sky-pilot-config.json
```

**Configuration** :
- Abonnement mensuel : 29€
- Abonnement annuel : 279€
- Email de livraison automatique
- Webhooks configurés

#### 2. **LemonInk** (Watermarking DRM)
```
# Installer depuis Shopify App Store
https://apps.shopify.com/lemonink

# Configuration watermark
- Template: {{ customer.email }} - {{ order.name }}
- Position: Footer de chaque page
- Opacité: 30%
```

#### 3. **Multi-Currency Converter**
```
# App recommandée: Currency Converter Plus
# Ou utiliser Shopify Payments multi-currency natif

# Devises supportées:
- EUR (Euro)
- USD (Dollar US)
- ILS (Shekel)
- CAD (Dollar Canadien)
```

#### 4. **FlipHTML5** (Reader Integration)
```
# Pas d'app Shopify, intégration custom
# Via iframes dans product.book.liquid
# Configuration: voir config/fliphtml5-mapping.json
```

### Webhooks à configurer

```bash
# Aller dans Settings → Notifications → Webhooks

# Ajouter webhooks:
1. orders/create → https://votre-backend.com/webhooks/order-created
2. customers/create → https://votre-backend.com/webhooks/customer-created
3. order_transactions/create → SKY PILOT webhook
```

### Shipping Zones

```bash
# Settings → Shipping and delivery → Shipping zones

# Zone 1: France
- Livraison standard: 5€ (3-5 jours)
- Livraison express: 12€ (1-2 jours)
- Gratuit si > 50€

# Zone 2: Israel
- Livraison standard: 15€ (7-14 jours)
- Livraison express: 35€ (3-5 jours)

# Zone 3: Canada
- Livraison standard: 18€ (10-20 jours)
- Livraison express: 45€ (5-7 jours)
```

### Payment Methods

```bash
# Settings → Payments

# Activer:
✓ Shopify Payments (Stripe)
✓ PayPal Express
✓ Apple Pay
✓ Google Pay
✓ Credit Cards (Visa, Mastercard, Amex)
```

## 📊 Products & Collections

### Import des produits

```bash
# Utiliser CSV import
# Fichier: config/products-import.csv

# Shopify Admin → Products → Import
# Uploader le CSV avec:
- Handle (URL)
- Title
- Body HTML (description)
- Vendor (Éditions Breslev)
- Product Category (Books)
- Type (Livre / Brochure)
- Tags
- Variants
- Images URLs
- Metafields (FlipHTML5 IDs)
```

### Collections à créer

```bash
# 1. Collection: "Tous les Livres"
Type: Manual
Products: Tous les 20 livres

# 2. Collection: "Brochures"
Type: Manual
Products: Toutes les 10 brochures

# 3. Collection: "Likoutey Moharan"
Type: Automated
Condition: Tag contains "Likoutey Moharan"

# 4. Collection: "Best Sellers"
Type: Manual
Products: Top 6 livres

# 5. Collection: "Nouveautés"
Type: Automated
Condition: Created date within last 30 days
```

## 🎨 Theme Customization

### Via Online Editor

```bash
# Accéder à l'éditeur
https://votre-store.myshopify.com/admin/themes/current/editor

# Personnaliser:
1. Logo (upload dans assets/)
2. Couleurs (via settings_schema.json)
3. Fonts (Playfair Display + Montserrat)
4. Hero section (image, texte)
5. Footer (liens, réseaux sociaux)
```

### Settings Schema

Le fichier `config/settings_schema.json` contient 60+ paramètres :

- **Général** : Logo, slogan, coordonnées
- **Couleurs** : Palette noir/blanc/orange
- **Typography** : Fonts Google
- **Hero** : Image, titre, CTA
- **Social Media** : Links Facebook, Instagram, etc.
- **API Keys** : FlipHTML5, LemonInk, Analytics

## 🧪 Testing

### Checklist avant mise en production

```bash
# 1. Test checkout complet
- Ajouter produit au panier
- Procéder paiement test
- Vérifier email confirmation
- Vérifier SKY PILOT delivery

# 2. Test multi-currency
- Changer devise (EUR → USD → ILS)
- Vérifier conversion prix
- Vérifier checkout dans chaque devise

# 3. Test responsive
- Mobile (375px)
- Tablet (768px)
- Desktop (1920px)

# 4. Test FlipHTML5
- Ouvrir produit livre
- Cliquer "Lire en ligne"
- Vérifier iframe charge
- Vérifier DRM (pas de download)

# 5. Test abonnement
- Créer compte
- S'abonner plan mensuel
- Vérifier accès tous les livres
- Tester cancel abonnement
```

## 📈 SEO & Analytics

### Google Analytics

```bash
# Dans settings_schema.json
"google_analytics_id": "G-XXXXXXXXXX"

# Ou via Shopify Admin
Settings → Online Store → Preferences → Google Analytics
```

### Meta Tags

```html
<!-- Déjà configuré dans layout/theme.liquid -->
<meta name="description" content="{{ page_description | escape }}">
<meta property="og:title" content="{{ page_title | escape }}">
<meta property="og:image" content="{{ page_image | img_url: '1200x630' }}">
```

### Sitemap

```bash
# Généré automatiquement par Shopify
https://votre-store.myshopify.com/sitemap.xml

# Soumettre à Google Search Console
https://search.google.com/search-console
```

## 🚨 Troubleshooting

### Erreur : "Theme validation failed"

```bash
# Vérifier syntaxe Liquid
shopify theme check

# Corriger erreurs
# Repousser
shopify theme push
```

### Erreur : "App not installed"

```bash
# Vérifier dans Shopify Admin → Apps
# Installer apps manquantes:
- Sky Pilot
- LemonInk
- Currency Converter
```

### Erreur : "Payment not working"

```bash
# Activer Shopify Payments
Settings → Payments → Activate Shopify Payments

# Ajouter informations bancaires
# Activer devises multiples
```

## 💰 Budget Shopify

### Plan Shopify requis : **Shopify Plus** (recommandé)

**Basic Shopify** : $39/mois
- Features suffisantes pour démarrage
- Support produits digitaux
- Multi-currency (avec app)

**Shopify** : $105/mois
- Reports professionnels
- Plus d'options personnalisation

**Advanced Shopify** : $399/mois
- Shipping avancé
- Reports avancés

**Shopify Plus** : $2000+/mois
- Pour croissance importante
- API avancées
- Support dédié

### Apps coûts mensuels

```
SKY PILOT (Digital Downloads) : $29/mois
LemonInk (DRM Watermark)      : $25/mois
Currency Converter            : $15/mois
Analytics Pro                 : $20/mois
TOTAL APPS                    : ~$89/mois
```

**Budget total Shopify** : $128/mois (Basic) à $2089/mois (Plus)

## 🎯 Checklist Déploiement Production

- [ ] Shopify CLI installé et configuré
- [ ] Thème poussé vers development
- [ ] Preview testé et validé
- [ ] Apps installées (Sky Pilot, LemonInk, etc.)
- [ ] Webhooks configurés
- [ ] Products importés (30 produits)
- [ ] Collections créées (5 collections)
- [ ] Shipping zones configurés
- [ ] Payment methods activés
- [ ] Multi-currency configuré
- [ ] FlipHTML5 embeds testés
- [ ] DRM protection vérifiée
- [ ] Checkout test complet
- [ ] SEO optimisé
- [ ] Analytics configuré
- [ ] Custom domain pointé
- [ ] SSL activé
- [ ] Thème publié en production

## 🔗 Liens Utiles

- **Shopify Admin** : https://votre-store.myshopify.com/admin
- **Shopify CLI Docs** : https://shopify.dev/docs/themes/tools/cli
- **Theme Kit** : https://shopify.dev/docs/themes/tools/theme-kit
- **Liquid Reference** : https://shopify.dev/docs/api/liquid
- **Partner Dashboard** : https://partners.shopify.com

---

**✨ Statut** : Prêt pour déploiement Shopify
**⏰ Temps estimé** : 2-3 heures pour configuration complète
**📍 Prochaine étape** : `shopify theme dev` pour preview
