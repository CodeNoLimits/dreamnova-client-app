# API CONFIGURATION - BRESLEV BOOKS

**Agent 9: INTEGRATION & API**
**Date**: 10 Novembre 2024

---

## TABLE DES MATIERES

1. [Variables d'Environnement](#1-variables-denvironnement)
2. [API Keys & Credentials](#2-api-keys--credentials)
3. [Webhooks Configuration](#3-webhooks-configuration)
4. [Settings Schema](#4-settings-schema)
5. [Security & Best Practices](#5-security--best-practices)

---

## 1. VARIABLES D'ENVIRONNEMENT

### 1.1 Fichier .env (Developpement Local)

```bash
# SHOPIFY
SHOPIFY_STORE_URL=breslev-books.myshopify.com
SHOPIFY_API_KEY=your_shopify_api_key
SHOPIFY_API_SECRET=your_shopify_api_secret
SHOPIFY_ACCESS_TOKEN=your_shopify_access_token

# FLIPHTML5
FLIPHTML5_API_KEY=your_fliphtml5_api_key
FLIPHTML5_BUSINESS_ID=your_business_id
FLIPHTML5_API_URL=https://api.fliphtml5.com/v3/

# LEMONINK DRM
LEMONINK_API_KEY=your_lemonink_api_key
LEMONINK_ACCOUNT_ID=your_lemonink_account_id
LEMONINK_API_URL=https://api.lemonink.co/v1/

# SKY PILOT
SKYPILOT_API_KEY=your_skypilot_api_key
SKYPILOT_WEBHOOK_SECRET=your_webhook_secret

# GOOGLE ANALYTICS 4
GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# FACEBOOK PIXEL
FACEBOOK_PIXEL_ID=1234567890123456

# GOOGLE TAG MANAGER
GTM_CONTAINER_ID=GTM-XXXXXX

# KLAVIYO
KLAVIYO_PRIVATE_API_KEY=pk_xxxxxxxxxxxxx
KLAVIYO_PUBLIC_API_KEY=your_public_key
KLAVIYO_LIST_ID=your_list_id

# WEGLOT
WEGLOT_API_KEY=wg_xxxxxxxxxxxxx
WEGLOT_PROJECT_ID=your_project_id

# STRIPE (Paiements)
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxx

# EMAIL (SendGrid/Mailgun)
SENDGRID_API_KEY=SG.xxxxxxxxxxxx
EMAIL_FROM=noreply@breslev.fr
EMAIL_SUPPORT=support@breslev.fr

# SECURITY
JWT_SECRET=your_jwt_secret_key_here
ENCRYPTION_KEY=your_encryption_key_32_chars
SESSION_SECRET=your_session_secret

# CLOUDINARY (Images)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# REDIS (Cache - optionnel)
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=your_redis_password

# NODE
NODE_ENV=development
PORT=3000
```

### 1.2 Variables Production (Shopify Theme Settings)

Ces variables doivent etre configurees dans **Shopify Admin > Online Store > Themes > Customize > Theme Settings**.

---

## 2. API KEYS & CREDENTIALS

### 2.1 FlipHTML5 Business

**Obtenir l'API Key**:
1. Connexion: https://fliphtml5.com/login
2. Dashboard > Settings > API
3. Cliquer "Generate API Key"
4. Copier la cle (commence par `fh5_`)

**Configuration**:
```json
{
  "api_key": "fh5_xxxxxxxxxxxxxxxxxxxxx",
  "business_id": "12345",
  "api_url": "https://api.fliphtml5.com/v3/",
  "plan": "Business ($299/an)",
  "features": {
    "drm_protection": true,
    "white_label": true,
    "custom_domain": true,
    "analytics": true
  }
}
```

**Endpoints utilises**:
- `POST /books/upload` - Upload PDF
- `GET /books/{id}` - Recuperer livre
- `POST /books/{id}/protect` - Activer DRM
- `GET /analytics/{book_id}` - Stats lecture

---

### 2.2 LemonInk DRM

**Obtenir l'API Key**:
1. Connexion: https://app.lemonink.co
2. Settings > API Keys
3. Create New API Key
4. Copier cle + Account ID

**Configuration**:
```json
{
  "api_key": "lemon_xxxxxxxxxxxxxxxxxxxxx",
  "account_id": "acc_12345",
  "api_url": "https://api.lemonink.co/v1/",
  "plan": "Professional ($29/mois)",
  "watermark_types": [
    "forensic",
    "visible",
    "text",
    "image"
  ]
}
```

**Endpoints utilises**:
- `POST /watermark` - Watermarker PDF
- `GET /watermark/{id}` - Statut watermark
- `POST /protect` - Protection avancee
- `GET /tracking/{id}` - Tracking violations

**Exemple requete watermark**:
```javascript
const response = await fetch('https://api.lemonink.co/v1/watermark', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${LEMONINK_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    pdf_url: 'https://breslev.fr/books/product.pdf',
    watermark_text: 'client@email.com',
    watermark_type: 'forensic',
    position: 'random',
    opacity: 0.3
  })
});

const {watermarked_url, watermark_id} = await response.json();
```

---

### 2.3 Sky Pilot (Digital Products & Subscriptions)

**Configuration App**:
1. Shopify Admin > Apps > Sky Pilot
2. Settings > API
3. Copier API Key + Webhook Secret

**Configuration**:
```json
{
  "api_key": "skp_xxxxxxxxxxxxxxxxxxxxx",
  "webhook_secret": "whsec_xxxxxxxxxxxxxxxxxxxxx",
  "webhook_url": "https://breslev.fr/webhooks/sky-pilot",
  "plan": "Pro ($9.99/mois)",
  "products": [
    {
      "id": "monthly_subscription",
      "shopify_product_id": "7891234567890",
      "price": "29.00 EUR",
      "recurring": "monthly",
      "access_type": "digital_library"
    },
    {
      "id": "yearly_subscription",
      "shopify_product_id": "7891234567891",
      "price": "279.00 EUR",
      "recurring": "yearly",
      "access_type": "digital_library"
    }
  ]
}
```

**Webhooks Sky Pilot**:
```json
{
  "webhooks": [
    {
      "event": "subscription.created",
      "url": "https://breslev.fr/webhooks/sky-pilot",
      "secret": "whsec_xxxxxxxxxxxxxxxxxxxxx"
    },
    {
      "event": "subscription.renewed",
      "url": "https://breslev.fr/webhooks/sky-pilot",
      "secret": "whsec_xxxxxxxxxxxxxxxxxxxxx"
    },
    {
      "event": "subscription.cancelled",
      "url": "https://breslev.fr/webhooks/sky-pilot",
      "secret": "whsec_xxxxxxxxxxxxxxxxxxxxx"
    },
    {
      "event": "subscription.expired",
      "url": "https://breslev.fr/webhooks/sky-pilot",
      "secret": "whsec_xxxxxxxxxxxxxxxxxxxxx"
    }
  ]
}
```

---

### 2.4 Klaviyo (Email Marketing)

**Obtenir API Keys**:
1. Connexion: https://www.klaviyo.com/login
2. Account > Settings > API Keys
3. Create Private API Key
4. Copier Public Key (site) + Private Key (backend)

**Configuration**:
```json
{
  "private_api_key": "pk_xxxxxxxxxxxxxxxxxxxxx",
  "public_api_key": "AbCdEf",
  "list_id": "XyZ123",
  "api_url": "https://a.klaviyo.com/api/",
  "plan": "Free (jusqu'a 250 contacts)",
  "lists": [
    {
      "id": "XyZ123",
      "name": "Newsletter Breslev",
      "type": "main"
    },
    {
      "id": "AbC456",
      "name": "Subscribers",
      "type": "premium"
    }
  ]
}
```

**Endpoints utilises**:
- `POST /v2/list/{list_id}/subscribe` - Ajouter contact
- `GET /v1/metrics` - Stats campagnes
- `POST /v1/campaigns` - Creer campagne
- `POST /v2/people` - Mettre a jour profil

---

### 2.5 Weglot (Multi-langue)

**Obtenir API Key**:
1. Connexion: https://dashboard.weglot.com
2. Projects > Votre projet
3. Settings > API
4. Copier API Key

**Configuration**:
```json
{
  "api_key": "wg_xxxxxxxxxxxxxxxxxxxxx",
  "project_id": "12345",
  "original_language": "fr",
  "destination_languages": ["he", "en"],
  "plan": "Business ($99/mois - 10,000 mots)",
  "features": {
    "auto_translate": true,
    "seo_optimized": true,
    "custom_translations": true
  }
}
```

**Script integration**:
```html
<script type="text/javascript" src="https://cdn.weglot.com/weglot.min.js"></script>
<script>
  Weglot.initialize({
    api_key: 'wg_xxxxxxxxxxxxxxxxxxxxx',
    originalLanguage: 'fr',
    destinationLanguages: 'he,en'
  });
</script>
```

---

### 2.6 Google Analytics 4

**Obtenir Measurement ID**:
1. Google Analytics: https://analytics.google.com
2. Admin > Property > Data Streams
3. Cliquer sur votre stream
4. Copier Measurement ID (format: G-XXXXXXXXXX)

**Configuration**:
```json
{
  "measurement_id": "G-XXXXXXXXXX",
  "stream_name": "Breslev Books Website",
  "enhanced_measurement": true,
  "events": [
    "page_view",
    "view_item",
    "add_to_cart",
    "begin_checkout",
    "purchase",
    "subscription_created"
  ]
}
```

---

### 2.7 Facebook Pixel

**Obtenir Pixel ID**:
1. Facebook Events Manager: https://business.facebook.com/events_manager
2. Data Sources > Pixels
3. Copier Pixel ID (16 chiffres)

**Configuration**:
```json
{
  "pixel_id": "1234567890123456",
  "events": [
    "PageView",
    "ViewContent",
    "AddToCart",
    "InitiateCheckout",
    "Purchase"
  ]
}
```

---

### 2.8 Google Tag Manager

**Obtenir Container ID**:
1. Google Tag Manager: https://tagmanager.google.com
2. Containers > Votre container
3. Copier Container ID (format: GTM-XXXXXX)

**Configuration**:
```json
{
  "container_id": "GTM-XXXXXX",
  "workspace": "Default Workspace",
  "tags": [
    "Google Analytics 4",
    "Facebook Pixel",
    "Custom Events"
  ]
}
```

---

## 3. WEBHOOKS CONFIGURATION

### 3.1 Shopify Webhooks

**Configuration dans**: Shopify Admin > Settings > Notifications > Webhooks

```json
{
  "webhooks": [
    {
      "topic": "orders/create",
      "address": "https://breslev.fr/webhooks/order-created",
      "format": "json",
      "api_version": "2024-01"
    },
    {
      "topic": "orders/paid",
      "address": "https://breslev.fr/webhooks/order-paid",
      "format": "json",
      "api_version": "2024-01"
    },
    {
      "topic": "customers/create",
      "address": "https://breslev.fr/webhooks/customer-created",
      "format": "json",
      "api_version": "2024-01"
    },
    {
      "topic": "customers/update",
      "address": "https://breslev.fr/webhooks/customer-updated",
      "format": "json",
      "api_version": "2024-01"
    },
    {
      "topic": "products/update",
      "address": "https://breslev.fr/webhooks/product-updated",
      "format": "json",
      "api_version": "2024-01"
    }
  ]
}
```

### 3.2 Webhook Verification

**Verifier signature Shopify**:
```javascript
const crypto = require('crypto');

function verifyShopifyWebhook(data, hmacHeader) {
  const secret = process.env.SHOPIFY_API_SECRET;
  const hash = crypto
    .createHmac('sha256', secret)
    .update(data, 'utf8')
    .digest('base64');

  return hash === hmacHeader;
}

// Usage dans Express
app.post('/webhooks/order-created', (req, res) => {
  const hmac = req.headers['x-shopify-hmac-sha256'];
  const body = req.rawBody; // Raw body requis

  if (!verifyShopifyWebhook(body, hmac)) {
    return res.status(401).send('Unauthorized');
  }

  // Traiter webhook...
  res.status(200).send('OK');
});
```

---

## 4. SETTINGS SCHEMA

### 4.1 config/settings_schema.json

```json
[
  {
    "name": "theme_info",
    "theme_name": "Breslev Books",
    "theme_version": "1.0.0",
    "theme_author": "Breslev Publishing",
    "theme_documentation_url": "https://breslev.fr/docs",
    "theme_support_url": "https://breslev.fr/support"
  },
  {
    "name": "FlipHTML5",
    "settings": [
      {
        "type": "header",
        "content": "FlipHTML5 Business Configuration"
      },
      {
        "type": "text",
        "id": "fliphtml5_api_key",
        "label": "FlipHTML5 API Key",
        "info": "Obtenir depuis FlipHTML5 Dashboard > Settings > API",
        "default": ""
      },
      {
        "type": "text",
        "id": "fliphtml5_business_id",
        "label": "FlipHTML5 Business ID",
        "default": ""
      },
      {
        "type": "checkbox",
        "id": "fliphtml5_drm_enabled",
        "label": "Activer protection DRM",
        "default": true
      }
    ]
  },
  {
    "name": "LemonInk DRM",
    "settings": [
      {
        "type": "header",
        "content": "LemonInk DRM Protection"
      },
      {
        "type": "text",
        "id": "lemonink_api_key",
        "label": "LemonInk API Key",
        "info": "Obtenir depuis app.lemonink.co/settings/api",
        "default": ""
      },
      {
        "type": "text",
        "id": "lemonink_account_id",
        "label": "LemonInk Account ID",
        "default": ""
      },
      {
        "type": "checkbox",
        "id": "lemonink_forensic_enabled",
        "label": "Activer watermark forensique",
        "default": true
      }
    ]
  },
  {
    "name": "Analytics",
    "settings": [
      {
        "type": "header",
        "content": "Google Analytics 4"
      },
      {
        "type": "text",
        "id": "ga4_measurement_id",
        "label": "GA4 Measurement ID",
        "info": "Format: G-XXXXXXXXXX",
        "default": ""
      },
      {
        "type": "header",
        "content": "Facebook Pixel"
      },
      {
        "type": "text",
        "id": "facebook_pixel_id",
        "label": "Facebook Pixel ID",
        "info": "16 chiffres depuis Events Manager",
        "default": ""
      },
      {
        "type": "header",
        "content": "Google Tag Manager"
      },
      {
        "type": "text",
        "id": "gtm_container_id",
        "label": "GTM Container ID",
        "info": "Format: GTM-XXXXXX",
        "default": ""
      }
    ]
  },
  {
    "name": "Newsletter",
    "settings": [
      {
        "type": "header",
        "content": "Klaviyo Email Marketing"
      },
      {
        "type": "text",
        "id": "klaviyo_api_key",
        "label": "Klaviyo Private API Key",
        "info": "Commence par pk_",
        "default": ""
      },
      {
        "type": "text",
        "id": "klaviyo_list_id",
        "label": "Klaviyo List ID",
        "info": "ID de votre liste principale",
        "default": ""
      }
    ]
  },
  {
    "name": "Weglot",
    "settings": [
      {
        "type": "header",
        "content": "Weglot Multi-langue"
      },
      {
        "type": "text",
        "id": "weglot_api_key",
        "label": "Weglot API Key",
        "info": "Commence par wg_",
        "default": ""
      },
      {
        "type": "checkbox",
        "id": "weglot_auto_translate",
        "label": "Traduction automatique",
        "default": true
      }
    ]
  }
]
```

---

## 5. SECURITY & BEST PRACTICES

### 5.1 Protection des API Keys

**JAMAIS commit les API keys dans Git**:
```bash
# .gitignore
.env
.env.local
.env.production
config/secrets.json
```

**Utiliser variables d'environnement**:
```javascript
// ❌ MAUVAIS
const API_KEY = 'fh5_1234567890abcdef';

// ✅ BON
const API_KEY = process.env.FLIPHTML5_API_KEY;
```

### 5.2 Rotation des Cles

**Planifier rotation tous les 90 jours**:
- FlipHTML5: Regenerer API key
- LemonInk: Creer nouvelle cle
- Klaviyo: Regenerer cle
- Stripe: Rotation automatique

### 5.3 Rate Limiting

**Implementer rate limiting**:
```javascript
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requetes
  message: 'Trop de requetes, reessayez plus tard'
});

app.use('/api/', apiLimiter);
```

### 5.4 Logging

**Logger tous les appels API**:
```javascript
function logAPICall(service, endpoint, status) {
  console.log({
    timestamp: new Date().toISOString(),
    service: service,
    endpoint: endpoint,
    status: status,
    environment: process.env.NODE_ENV
  });
}

// Usage
logAPICall('FlipHTML5', '/books/upload', 200);
```

### 5.5 Error Handling

**Gerer les erreurs API proprement**:
```javascript
async function callExternalAPI(url, options) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Call Failed:', error);
    // Logger dans systeme de monitoring
    // Fallback gracieux
    return null;
  }
}
```

---

## CHECKLIST CONFIGURATION

### Pre-Production
- [ ] Toutes les API keys obtenues
- [ ] Variables environnement configurees
- [ ] Settings schema complet
- [ ] Webhooks configures
- [ ] Tests effectues

### Production
- [ ] API keys production activees
- [ ] Webhooks pointe vers production
- [ ] SSL/HTTPS actif
- [ ] Rate limiting actif
- [ ] Monitoring en place

### Security
- [ ] API keys non committees
- [ ] Rotation planifiee
- [ ] Logging active
- [ ] Error handling robuste
- [ ] Backup des configurations

---

## SUPPORT

**En cas de probleme**:
- FlipHTML5: support@fliphtml5.com
- LemonInk: support@lemonink.co
- Sky Pilot: support@skypilot.io
- Klaviyo: support@klaviyo.com
- Weglot: support@weglot.com
- Shopify: help.shopify.com

**Documentation**:
- FlipHTML5 API: https://api.fliphtml5.com/docs
- LemonInk API: https://docs.lemonink.co
- Shopify API: https://shopify.dev/docs
- Klaviyo API: https://developers.klaviyo.com

---

**Agent 9 - API Configuration Complete!**
