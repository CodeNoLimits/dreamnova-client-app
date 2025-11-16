# GUIDE D'INTEGRATION - BRESLEV BOOKS SHOPIFY

**Agent 9: INTEGRATION & API**
**Date**: 10 Novembre 2024
**Version**: 1.0

---

## TABLE DES MATIERES

1. [FlipHTML5 Business Integration](#1-fliphtml5-business-integration)
2. [Sky Pilot - Abonnements](#2-sky-pilot-abonnements)
3. [LemonInk - DRM Protection](#3-lemonink-drm-protection)
4. [Analytics & Tracking](#4-analytics--tracking)
5. [Newsletter Integration](#5-newsletter-integration)
6. [Weglot - Multi-langue](#6-weglot-multi-langue)
7. [Webhooks Configuration](#7-webhooks-configuration)
8. [Testing & Validation](#8-testing--validation)

---

## 1. FLIPHTML5 BUSINESS INTEGRATION

### 1.1 Configuration API

**Plan requis**: FlipHTML5 Business ($299/an)

#### API Key Configuration
```javascript
// Dans assets/fliphtml5-config.js
const FLIPHTML5_CONFIG = {
  apiKey: '{{ settings.fliphtml5_api_key }}', // A configurer dans settings_schema.json
  apiUrl: 'https://api.fliphtml5.com/v3/',
  businessId: '{{ settings.fliphtml5_business_id }}',

  // DRM Settings
  drm: {
    enabled: true,
    preventCopy: true,
    preventPrint: true,
    preventDownload: true,
    watermarkEnabled: true
  }
};
```

#### Settings Schema
```json
{
  "name": "FlipHTML5",
  "settings": [
    {
      "type": "text",
      "id": "fliphtml5_api_key",
      "label": "FlipHTML5 API Key",
      "info": "Obtenir depuis FlipHTML5 Dashboard > Settings > API"
    },
    {
      "type": "text",
      "id": "fliphtml5_business_id",
      "label": "FlipHTML5 Business ID",
      "info": "Votre ID compte business"
    },
    {
      "type": "checkbox",
      "id": "fliphtml5_drm_enabled",
      "label": "Activer protection DRM",
      "default": true
    }
  ]
}
```

### 1.2 Integration Lecteur

Le lecteur est deja integre dans `templates/page.digital-reader.liquid`

**Parametres de tracking**:
```javascript
// Tracking lecture
fliphtml5.on('pageChange', function(page) {
  // Sauvegarder progression
  fetch('/apps/proxy/reading-progress', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      book_id: '{{ product.id }}',
      customer_id: '{{ customer.id }}',
      page: page,
      total_pages: fliphtml5.getTotalPages(),
      timestamp: Date.now()
    })
  });
});
```

### 1.3 Protection DRM

Protection implementee avec:
- Copy protection (Ctrl+C desactive)
- Print protection (Ctrl+P bloque)
- Download protection (pas de telechargement)
- Watermark visible + invisible

**Fichier**: `snippets/drm-protection.liquid`

---

## 2. SKY PILOT - ABONNEMENTS

### 2.1 Configuration Produits

**App**: Sky Pilot Digital Products
**Cout**: $9.99/mois + $0.10 par telechargement

#### Creation Produits Abonnement

**Produit 1: Abonnement Mensuel**
- Prix: 29 EUR
- SKU: `BRESLEV-SUB-MONTHLY`
- Recurring: Oui (mensuel)
- Trial: 7 jours gratuits (optionnel)

**Produit 2: Abonnement Annuel**
- Prix: 279 EUR (economie 20%)
- SKU: `BRESLEV-SUB-YEARLY`
- Recurring: Oui (annuel)
- Trial: 14 jours gratuits (optionnel)

#### Configuration Sky Pilot Dashboard

1. Aller dans Shopify Admin > Apps > Sky Pilot
2. Cliquer "Add Product" pour chaque abonnement
3. Configurer:
   - Upload Type: External Link
   - URL: `https://breslev.fr/pages/reader`
   - Access Control: Membre actif uniquement
   - Email Template: Personnalise en francais

### 2.2 Webhooks Sky Pilot

**Endpoint**: `https://breslev.fr/apps/sky-pilot/webhook`

**Evenements a ecouter**:
```json
{
  "webhooks": [
    {
      "event": "subscription.created",
      "action": "Creer metafield customer.subscription.status = active"
    },
    {
      "event": "subscription.renewed",
      "action": "Prolonger customer.subscription.expires_at"
    },
    {
      "event": "subscription.cancelled",
      "action": "Changer customer.subscription.status = cancelled"
    },
    {
      "event": "subscription.expired",
      "action": "Bloquer acces livres numeriques"
    }
  ]
}
```

**Implementation Webhook Handler**:
```javascript
// Dans server.js ou app Shopify
app.post('/apps/sky-pilot/webhook', async (req, res) => {
  const event = req.body;

  switch(event.type) {
    case 'subscription.created':
      await updateCustomerMetafield(event.customer_id, {
        'subscription.status': 'active',
        'subscription.plan': event.plan_name,
        'subscription.started_at': new Date(),
        'subscription.expires_at': event.next_billing_date
      });
      break;

    case 'subscription.cancelled':
      await updateCustomerMetafield(event.customer_id, {
        'subscription.status': 'cancelled',
        'subscription.cancelled_at': new Date()
      });
      break;
  }

  res.status(200).json({success: true});
});
```

### 2.3 Integration Espace Membre

Deja integre dans `templates/customers/account.liquid`

**Verification acces**:
```liquid
{% if customer.metafields.subscription.status == 'active' %}
  <!-- Afficher bibliotheque complete -->
  {% render 'digital-library', customer: customer %}
{% else %}
  <!-- Afficher promo abonnement -->
  {% render 'subscription-cta' %}
{% endif %}
```

---

## 3. LEMONINK - DRM PROTECTION

### 3.1 Configuration API

**App**: LemonInk DRM Protection
**Cout**: $29/mois + $0.15 par watermark

#### API Key Setup
```javascript
// Dans settings_schema.json
{
  "name": "LemonInk DRM",
  "settings": [
    {
      "type": "text",
      "id": "lemonink_api_key",
      "label": "LemonInk API Key",
      "info": "Obtenir depuis app.lemonink.co/settings/api"
    },
    {
      "type": "text",
      "id": "lemonink_account_id",
      "label": "LemonInk Account ID"
    }
  ]
}
```

### 3.2 Watermarking Implementation

**Fichier**: `snippets/drm-protection.liquid` (deja cree)

**Watermark visible**:
```javascript
function addVisibleWatermark() {
  const watermark = document.createElement('div');
  watermark.className = 'drm-watermark';
  watermark.textContent = '{{ customer.email }} - {{ "now" | date: "%Y-%m-%d" }}';
  watermark.style.cssText = `
    position: fixed;
    bottom: 10px;
    right: 10px;
    opacity: 0.3;
    font-size: 10px;
    color: #666;
    pointer-events: none;
    z-index: 9999;
  `;
  document.body.appendChild(watermark);
}
```

**Watermark invisible (forensique)**:
```javascript
// Canvas fingerprinting
function generateFingerprint() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Creer signature unique basee sur:
  // - Email client
  // - Timestamp achat
  // - Device fingerprint

  const signature = btoa(JSON.stringify({
    email: '{{ customer.email }}',
    purchase_date: '{{ order.created_at }}',
    device: navigator.userAgent,
    screen: `${screen.width}x${screen.height}`
  }));

  // Encoder dans pixels invisibles
  ctx.fillText(signature, 0, 0);

  return canvas.toDataURL();
}
```

### 3.3 Email Integration

Lors du telechargement, envoyer email client au watermark:

```javascript
// Appel API LemonInk
async function watermarkPDF(pdfUrl, customerEmail) {
  const response = await fetch('https://api.lemonink.co/v1/watermark', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer {{ settings.lemonink_api_key }}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      pdf_url: pdfUrl,
      watermark_text: customerEmail,
      watermark_type: 'forensic', // invisible
      position: 'random' // position aleatoire
    })
  });

  const {watermarked_url} = await response.json();
  return watermarked_url;
}
```

---

## 4. ANALYTICS & TRACKING

### 4.1 Google Analytics 4

**Fichier**: `snippets/analytics-tracking.liquid` (a creer)

```liquid
<!-- Google Analytics 4 -->
{% if settings.ga4_measurement_id != blank %}
<script async src="https://www.googletagmanager.com/gtag/js?id={{ settings.ga4_measurement_id }}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '{{ settings.ga4_measurement_id }}', {
    'user_id': '{{ customer.id }}',
    'user_properties': {
      'subscription_status': '{{ customer.metafields.subscription.status }}',
      'customer_type': '{% if customer.orders_count > 0 %}returning{% else %}new{% endif %}'
    }
  });

  // E-commerce tracking
  {% if template contains 'product' %}
  gtag('event', 'view_item', {
    currency: 'EUR',
    value: {{ product.price | money_without_currency }},
    items: [{
      item_id: '{{ product.id }}',
      item_name: '{{ product.title | escape }}',
      item_category: '{{ product.type }}',
      price: {{ product.price | money_without_currency }}
    }]
  });
  {% endif %}
</script>
{% endif %}
```

### 4.2 Facebook Pixel

```liquid
<!-- Facebook Pixel -->
{% if settings.facebook_pixel_id != blank %}
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');

  fbq('init', '{{ settings.facebook_pixel_id }}');
  fbq('track', 'PageView');

  {% if template contains 'product' %}
  fbq('track', 'ViewContent', {
    content_ids: ['{{ product.id }}'],
    content_type: 'product',
    value: {{ product.price | money_without_currency }},
    currency: 'EUR'
  });
  {% endif %}

  {% if template == 'cart' %}
  fbq('track', 'AddToCart', {
    content_ids: [{% for item in cart.items %}'{{ item.product_id }}'{% unless forloop.last %},{% endunless %}{% endfor %}],
    content_type: 'product',
    value: {{ cart.total_price | money_without_currency }},
    currency: 'EUR'
  });
  {% endif %}
</script>
{% endif %}
```

### 4.3 Google Tag Manager

```liquid
<!-- Google Tag Manager -->
{% if settings.gtm_container_id != blank %}
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','{{ settings.gtm_container_id }}');</script>

<!-- Data Layer -->
<script>
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'event': 'pageView',
    'pageType': '{{ template | replace: '.', '-' }}',
    'customerId': '{{ customer.id }}',
    'customerEmail': '{{ customer.email }}',
    'subscriptionStatus': '{{ customer.metafields.subscription.status }}'
  });
</script>
{% endif %}
```

---

## 5. NEWSLETTER INTEGRATION

### 5.1 Klaviyo Setup

**App**: Klaviyo Email Marketing
**Cout**: Gratuit jusqu'a 250 contacts

#### API Configuration
```json
{
  "name": "Klaviyo",
  "settings": [
    {
      "type": "text",
      "id": "klaviyo_api_key",
      "label": "Klaviyo Private API Key"
    },
    {
      "type": "text",
      "id": "klaviyo_list_id",
      "label": "Klaviyo List ID",
      "info": "ID de votre liste principale"
    }
  ]
}
```

### 5.2 Newsletter Form

**Fichier**: `snippets/newsletter-form.liquid` (a creer)

```liquid
<div class="newsletter-section">
  <h3>Restez informes des nouveautes</h3>
  <p>Recevez nos nouvelles publications et offres exclusives</p>

  <form id="newsletter-form" class="newsletter-form">
    <input
      type="email"
      name="email"
      placeholder="Votre email"
      required
    />
    <button type="submit">S'inscrire</button>
  </form>

  <div id="newsletter-message"></div>
</div>

<script>
document.getElementById('newsletter-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const email = this.email.value;
  const messageDiv = document.getElementById('newsletter-message');

  try {
    const response = await fetch('https://a.klaviyo.com/api/v2/list/{{ settings.klaviyo_list_id }}/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        api_key: '{{ settings.klaviyo_api_key }}',
        profiles: [{
          email: email,
          properties: {
            '$source': 'Breslev Books Newsletter',
            'signup_date': new Date().toISOString()
          }
        }]
      })
    });

    if(response.ok) {
      messageDiv.innerHTML = '<p class="success">Merci! Vous etes inscrit.</p>';
      this.reset();
    } else {
      throw new Error('Erreur inscription');
    }
  } catch(error) {
    messageDiv.innerHTML = '<p class="error">Erreur. Reessayez.</p>';
  }
});
</script>

<style>
.newsletter-section {
  background: #f5f5f5;
  padding: 40px 20px;
  text-align: center;
}

.newsletter-form {
  display: flex;
  gap: 10px;
  max-width: 500px;
  margin: 20px auto;
}

.newsletter-form input {
  flex: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.newsletter-form button {
  padding: 12px 30px;
  background: #2c5282;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.newsletter-form button:hover {
  background: #1a365d;
}
</style>
```

### 5.3 Automatisations Email

**Flows a creer dans Klaviyo**:

1. **Welcome Series**:
   - Email 1: Bienvenue + code promo 10%
   - Email 2 (J+3): Presentation catalogue
   - Email 3 (J+7): Presentation abonnement

2. **Abandon de panier**:
   - Email 1 (1h): Rappel panier
   - Email 2 (24h): Code promo 15%
   - Email 3 (72h): Derniere chance

3. **Post-achat**:
   - Email 1: Confirmation + lien telechargement
   - Email 2 (J+7): Demande avis
   - Email 3 (J+30): Recommandations

---

## 6. WEGLOT - MULTI-LANGUE

### 6.1 Configuration

**App**: Weglot Translate
**Cout**: $99/mois (10,000 mots)

**Langues**: FR (defaut), HE (hebreu), EN (anglais)

#### Settings
```json
{
  "name": "Weglot",
  "settings": [
    {
      "type": "text",
      "id": "weglot_api_key",
      "label": "Weglot API Key"
    },
    {
      "type": "checkbox",
      "id": "weglot_auto_translate",
      "label": "Traduction automatique",
      "default": true
    }
  ]
}
```

### 6.2 Language Switcher

**Fichier**: `snippets/language-switcher.liquid`

```liquid
<div class="language-switcher">
  <button class="language-current" id="lang-btn">
    <span class="flag">{{ 'flag-' | append: request.locale | append: '.svg' | asset_url }}</span>
    <span class="lang-code">{{ request.locale | upcase }}</span>
  </button>

  <div class="language-dropdown" id="lang-dropdown">
    {% for locale in shop.published_locales %}
      {% unless locale.iso_code == request.locale %}
        <a href="{{ request.path | append: '?locale=' | append: locale.iso_code }}" class="lang-option">
          <span class="flag">{{ 'flag-' | append: locale.iso_code | append: '.svg' | asset_url }}</span>
          <span class="lang-name">{{ locale.name }}</span>
        </a>
      {% endunless %}
    {% endfor %}
  </div>
</div>

<style>
.language-switcher {
  position: relative;
}

.language-current {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
}

.language-dropdown {
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  z-index: 1000;
}

.language-dropdown.active {
  display: block;
}

.lang-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  text-decoration: none;
  color: #333;
}

.lang-option:hover {
  background: #f5f5f5;
}
</style>

<script>
document.getElementById('lang-btn').addEventListener('click', function() {
  document.getElementById('lang-dropdown').classList.toggle('active');
});
</script>
```

### 6.3 RTL Support (Hebreu)

```css
/* Dans assets/breslev-main.css */
html[dir="rtl"] {
  direction: rtl;
  text-align: right;
}

html[dir="rtl"] .book-card {
  flex-direction: row-reverse;
}

html[dir="rtl"] .header-main {
  flex-direction: row-reverse;
}

/* Inverser marges/paddings pour RTL */
html[dir="rtl"] .ml-2 { margin-left: 0; margin-right: 0.5rem; }
html[dir="rtl"] .mr-2 { margin-right: 0; margin-left: 0.5rem; }
```

---

## 7. WEBHOOKS CONFIGURATION

### 7.1 Shopify Webhooks

**Configuration dans Shopify Admin > Settings > Notifications > Webhooks**

```json
{
  "webhooks": [
    {
      "topic": "orders/create",
      "address": "https://breslev.fr/webhooks/order-created",
      "format": "json"
    },
    {
      "topic": "customers/create",
      "address": "https://breslev.fr/webhooks/customer-created",
      "format": "json"
    },
    {
      "topic": "products/update",
      "address": "https://breslev.fr/webhooks/product-updated",
      "format": "json"
    }
  ]
}
```

### 7.2 Webhook Handlers

**Fichier**: `server.js` ou Shopify App

```javascript
// Order Created - Envoyer email + activer acces numerique
app.post('/webhooks/order-created', async (req, res) => {
  const order = req.body;

  // Verifier si contient produit numerique
  const hasDigital = order.line_items.some(item =>
    item.properties.some(p => p.name === '_digital' && p.value === 'true')
  );

  if(hasDigital) {
    // Activer acces
    await grantDigitalAccess(order.customer.id, order.line_items);

    // Envoyer email avec liens
    await sendDigitalDownloadEmail(order.customer.email, order.line_items);
  }

  res.status(200).json({success: true});
});

// Customer Created - Ajouter a Klaviyo
app.post('/webhooks/customer-created', async (req, res) => {
  const customer = req.body;

  await fetch('https://a.klaviyo.com/api/v2/list/LIST_ID/members', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      api_key: process.env.KLAVIYO_API_KEY,
      profiles: [{
        email: customer.email,
        properties: {
          '$first_name': customer.first_name,
          '$last_name': customer.last_name,
          'signup_date': customer.created_at
        }
      }]
    })
  });

  res.status(200).json({success: true});
});
```

---

## 8. TESTING & VALIDATION

### 8.1 Checklist Pre-Production

**FlipHTML5**:
- [ ] API Key configuree
- [ ] Lecteur charge correctement
- [ ] DRM protection active
- [ ] Watermark visible
- [ ] Tracking lecture fonctionne

**Sky Pilot**:
- [ ] Produits abonnement crees
- [ ] Webhooks configures
- [ ] Email template traduit
- [ ] Acces membre fonctionne
- [ ] Renouvellement teste

**LemonInk**:
- [ ] API Key configuree
- [ ] Watermark PDF fonctionne
- [ ] Email client dans watermark
- [ ] Fingerprinting actif

**Analytics**:
- [ ] GA4 tracking events
- [ ] Facebook Pixel firing
- [ ] GTM container charge
- [ ] E-commerce events

**Newsletter**:
- [ ] Formulaire fonctionne
- [ ] Klaviyo integration OK
- [ ] Automatisations activees

**Weglot**:
- [ ] Langues FR/HE/EN actives
- [ ] Switcher fonctionne
- [ ] RTL support hebreu

### 8.2 Tests Scenarios

**Scenario 1: Achat livre numerique**
1. Client achete livre numerique
2. Webhook order/create declenche
3. Email envoye avec lien lecteur
4. Client accede lecteur
5. DRM + watermark actifs
6. Progression sauvegardee

**Scenario 2: Abonnement mensuel**
1. Client souscrit abonnement 29EUR
2. Sky Pilot cree subscription
3. Webhook active metafields
4. Client accede bibliotheque
5. Peut lire tous livres
6. Tracking analytics

**Scenario 3: Newsletter**
1. Visiteur inscrit newsletter
2. Profil cree dans Klaviyo
3. Email bienvenue envoye
4. Flow automatisation demarre

---

## 9. CONFIGURATION FINALE

### 9.1 Settings Schema Complet

**Fichier**: `config/settings_schema.json`

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
        "type": "text",
        "id": "fliphtml5_api_key",
        "label": "FlipHTML5 API Key",
        "info": "Obtenir depuis FlipHTML5 Dashboard"
      },
      {
        "type": "text",
        "id": "fliphtml5_business_id",
        "label": "FlipHTML5 Business ID"
      },
      {
        "type": "checkbox",
        "id": "fliphtml5_drm_enabled",
        "label": "Activer DRM",
        "default": true
      }
    ]
  },
  {
    "name": "LemonInk DRM",
    "settings": [
      {
        "type": "text",
        "id": "lemonink_api_key",
        "label": "LemonInk API Key"
      },
      {
        "type": "text",
        "id": "lemonink_account_id",
        "label": "LemonInk Account ID"
      }
    ]
  },
  {
    "name": "Analytics",
    "settings": [
      {
        "type": "text",
        "id": "ga4_measurement_id",
        "label": "Google Analytics 4 Measurement ID",
        "info": "Format: G-XXXXXXXXXX"
      },
      {
        "type": "text",
        "id": "facebook_pixel_id",
        "label": "Facebook Pixel ID"
      },
      {
        "type": "text",
        "id": "gtm_container_id",
        "label": "Google Tag Manager Container ID",
        "info": "Format: GTM-XXXXXX"
      }
    ]
  },
  {
    "name": "Newsletter",
    "settings": [
      {
        "type": "text",
        "id": "klaviyo_api_key",
        "label": "Klaviyo Private API Key"
      },
      {
        "type": "text",
        "id": "klaviyo_list_id",
        "label": "Klaviyo List ID"
      }
    ]
  },
  {
    "name": "Weglot",
    "settings": [
      {
        "type": "text",
        "id": "weglot_api_key",
        "label": "Weglot API Key"
      }
    ]
  }
]
```

---

## CONCLUSION

Toutes les integrations sont documentees et prets a etre configurees.

**Prochaines etapes**:
1. Obtenir toutes les API keys
2. Configurer settings_schema.json
3. Tester chaque integration
4. Valider webhooks
5. Go live!

**Support**:
- FlipHTML5: support@fliphtml5.com
- Sky Pilot: support@skypilot.io
- LemonInk: support@lemonink.co
- Klaviyo: support@klaviyo.com
- Weglot: support@weglot.com

**Agent 9 - Mission complete!**
