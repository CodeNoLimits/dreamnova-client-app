/**
 * SERVEUR LOCAL POUR PREVIEW SHOPIFY THEME
 * Port 8000 - Simulation Breslev Books
 */

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 8000;

// Middleware
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'public'))); // Servir images
app.use(express.json());

// ==========================================
// DONNÉES MOCK - LIVRES BRESLEV
// ==========================================

const mockProducts = [
  {
    id: 1,
    title: "Chemot Hatsadikim",
    vendor: "Rabbi Nathan",
    price: 2500, // en centimes
    compare_at_price: 3000,
    featured_image: "/images/products/chemot-hatsadikim.svg",
    type: "livre",
    tags: ["nouveau", "best-seller"],
    description: "Recueil des noms des grands maîtres de Breslev. Un guide spirituel essentiel pour comprendre la lignée des Tsadikim.",
    available: true,
    has_digital: true,
    bundle_price: 3500
  },
  {
    id: 2,
    title: "La Vie d'un Breslever",
    vendor: "Esther Ifrah",
    price: 1800,
    compare_at_price: null,
    featured_image: "/images/products/vie-breslever.svg",
    type: "livre",
    tags: ["nouveau"],
    description: "Guide pratique pour vivre selon les enseignements de Rabbi Nachman au quotidien.",
    available: true,
    has_digital: true,
    bundle_price: 2500
  },
  {
    id: 3,
    title: "Likoutey Moharane 1",
    vendor: "Rabbi Nachman",
    price: 3500,
    compare_at_price: 4200,
    featured_image: "/images/products/likoutey-moharane-1.svg",
    type: "livre",
    tags: ["best-seller"],
    description: "Les enseignements fondamentaux de Rabbi Nachman. Volume 1 des enseignements sacrés.",
    available: true,
    has_digital: true,
    bundle_price: 5000
  },
  {
    id: 4,
    title: "Sippurei Maasiyot",
    vendor: "Rabbi Nachman",
    price: 2800,
    compare_at_price: null,
    featured_image: "/images/products/sippurei-maasiyot.svg",
    type: "livre",
    tags: [],
    description: "Les contes mystiques de Rabbi Nachman. Histoires profondes et transformatrices.",
    available: true,
    has_digital: true,
    bundle_price: 3800
  },
  {
    id: 5,
    title: "Tikoun Phonétique",
    vendor: "Éditions Breslev",
    price: 1500,
    compare_at_price: null,
    featured_image: "/images/products/tikoun-phonetique.svg",
    type: "brochure",
    tags: [],
    description: "Guide de prononciation pour les prières et textes sacrés.",
    available: true,
    has_digital: true,
    bundle_price: 2000
  },
  {
    id: 6,
    title: "Likoutey Tefilot",
    vendor: "Rabbi Nathan",
    price: 2200,
    compare_at_price: null,
    featured_image: "/images/products/likoutey-tefilot.svg",
    type: "livre",
    tags: ["best-seller"],
    description: "Recueil de prières basées sur les enseignements de Rabbi Nachman.",
    available: true,
    has_digital: true,
    bundle_price: 3000
  }
];

const mockCustomer = {
  id: 1,
  email: "david@example.com",
  first_name: "David",
  name: "David Cohen",
  subscription: {
    status: "active",
    expires_at: "2025-12-31",
    plan: "Annuel"
  }
};

const mockCollection = {
  title: "Tous les livres",
  description: "Découvrez notre collection complète de livres Breslev en français",
  products: mockProducts,
  products_count: mockProducts.length
};

// ==========================================
// HELPER - RENDU LIQUID SIMPLIFIÉ
// ==========================================

function renderLiquid(liquidContent, data = {}) {
  let rendered = liquidContent;

  // Remplacer variables simples {{ variable }}
  rendered = rendered.replace(/\{\{\s*(\w+(?:\.\w+)*)\s*\}\}/g, (match, path) => {
    const keys = path.split('.');
    let value = data;
    for (const key of keys) {
      value = value?.[key];
    }
    return value !== undefined ? value : match;
  });

  // Gérer | money filter
  rendered = rendered.replace(/\{\{\s*(\w+(?:\.\w+)*)\s*\|\s*money\s*\}\}/g, (match, path) => {
    const keys = path.split('.');
    let value = data;
    for (const key of keys) {
      value = value?.[key];
    }
    if (typeof value === 'number') {
      return (value / 100).toFixed(2) + '€';
    }
    return match;
  });

  // Gérer | img_url filter
  rendered = rendered.replace(/\{\{\s*(\w+(?:\.\w+)*)\s*\|\s*img_url:\s*'([^']+)'\s*\}\}/g, (match, path) => {
    return '/assets/placeholder-book.jpg'; // Placeholder
  });

  // Gérer | asset_url filter
  rendered = rendered.replace(/\{\{\s*'([^']+)'\s*\|\s*asset_url\s*\}\}/g, (match, file) => {
    return `/assets/${file}`;
  });

  // Gérer {% if %} basique
  rendered = rendered.replace(/\{%\s*if\s+(\w+)\s*%\}(.*?)\{%\s*endif\s*%\}/gs, (match, condition, content) => {
    return data[condition] ? content : '';
  });

  // Supprimer comments Liquid
  rendered = rendered.replace(/\{%\s*comment\s*%\}.*?\{%\s*endcomment\s*%\}/gs, '');

  return rendered;
}

// ==========================================
// ROUTES
// ==========================================

// Page d'accueil
app.get('/', (req, res) => {
  try {
    const heroLiquid = fs.readFileSync(path.join(__dirname, 'sections/hero-breslev.liquid'), 'utf8');
    const heroHTML = renderLiquid(heroLiquid, {
      section: {
        settings: {
          title: "La Sagesse de Rabbi Nachman",
          subtitle: "Découvrez les enseignements qui transforment des vies"
        }
      }
    });

    // Cartes produits
    let productsHTML = '<div class="books-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 30px; padding: 40px 20px;">';

    mockProducts.forEach(product => {
      productsHTML += `
        <div class="book-card" style="background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <div class="book-cover" style="position: relative; padding-top: 150%; background: #f5f5f5;">
            <img src="/assets/placeholder-book.jpg" alt="${product.title}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;">
            ${product.tags.includes('nouveau') ? '<span class="badge-new" style="position: absolute; top: 10px; right: 10px; background: #ffd700; color: #1a1a1a; padding: 5px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: bold;">Nouveau</span>' : ''}
          </div>
          <div class="book-info" style="padding: 20px;">
            <h3 style="font-family: 'Playfair Display', serif; font-size: 1.1rem; color: #1a237e; margin: 0 0 10px 0;">${product.title}</h3>
            <p style="font-size: 0.9rem; color: #666; margin: 0 0 10px 0;">${product.vendor}</p>
            <div class="book-price" style="display: flex; align-items: baseline; gap: 10px; margin: 10px 0;">
              ${product.compare_at_price ? `<span style="font-size: 0.9rem; color: #999; text-decoration: line-through;">${(product.compare_at_price / 100).toFixed(2)}€</span>` : ''}
              <span style="font-size: 1.3rem; font-weight: bold; color: #1a237e;">${(product.price / 100).toFixed(2)}€</span>
            </div>
            <button style="width: 100%; padding: 10px 15px; background: #1a237e; color: white; border: none; border-radius: 5px; font-weight: bold; cursor: pointer;">
              🛒 Ajouter au panier
            </button>
          </div>
        </div>
      `;
    });

    productsHTML += '</div>';

    const html = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Breslev Books - Esther Ifrah</title>
        <link rel="stylesheet" href="/breslev-main.css">
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Crimson+Text:wght@400;600&display=swap" rel="stylesheet">
      </head>
      <body>
        <header style="background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); padding: 20px; position: sticky; top: 0; z-index: 100;">
          <div style="max-width: 1400px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
            <div style="font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: bold; color: #1a237e;">
              📚 Breslev Books
            </div>
            <nav style="display: flex; gap: 30px;">
              <a href="/" style="color: #1a237e; text-decoration: none;">Accueil</a>
              <a href="/collections/all" style="color: #1a237e; text-decoration: none;">Catalogue</a>
              <a href="/pages/abonnement" style="color: #1a237e; text-decoration: none;">Abonnement</a>
              <a href="/account" style="color: #1a237e; text-decoration: none;">Mon compte</a>
            </nav>
          </div>
        </header>

        ${heroHTML}

        <div style="max-width: 1400px; margin: 0 auto;">
          <h2 style="text-align: center; font-family: 'Playfair Display', serif; font-size: 2.5rem; color: #1a237e; margin: 60px 0 30px 0;">
            📚 Notre Catalogue
          </h2>
          ${productsHTML}
        </div>

        <script src="/breslev-security.js"></script>
      </body>
      </html>
    `;

    res.send(html);
  } catch (error) {
    res.status(500).send(`Erreur: ${error.message}`);
  }
});

// Collection
app.get('/collections/:handle', (req, res) => {
  try {
    let productsHTML = '<div class="books-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 30px; padding: 40px 20px; max-width: 1400px; margin: 0 auto;">';

    mockProducts.forEach(product => {
      productsHTML += `
        <div class="book-card" style="background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.3s;">
          <a href="/products/${product.id}" style="text-decoration: none; color: inherit;">
            <div class="book-cover" style="position: relative; padding-top: 150%; background: #f5f5f5;">
              <img src="/assets/placeholder-book.jpg" alt="${product.title}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div class="book-info" style="padding: 20px;">
              <h3 style="font-family: 'Playfair Display', serif; font-size: 1.1rem; color: #1a237e;">${product.title}</h3>
              <p style="color: #666; margin: 10px 0;">${product.vendor}</p>
              <div style="font-size: 1.3rem; font-weight: bold; color: #1a237e;">${(product.price / 100).toFixed(2)}€</div>
            </div>
          </a>
        </div>
      `;
    });

    productsHTML += '</div>';

    const html = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${mockCollection.title} - Breslev Books</title>
        <link rel="stylesheet" href="/breslev-main.css">
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
      </head>
      <body>
        <header style="background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); padding: 20px;">
          <div style="max-width: 1400px; margin: 0 auto;">
            <a href="/" style="font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: bold; color: #1a237e; text-decoration: none;">
              📚 Breslev Books
            </a>
          </div>
        </header>

        <div style="text-align: center; padding: 60px 20px;">
          <h1 style="font-family: 'Playfair Display', serif; font-size: 3rem; color: #1a237e; margin-bottom: 15px;">
            ${mockCollection.title}
          </h1>
          <p style="font-size: 1.2rem; color: #666; max-width: 800px; margin: 0 auto;">
            ${mockCollection.description}
          </p>
        </div>

        ${productsHTML}
      </body>
      </html>
    `;

    res.send(html);
  } catch (error) {
    res.status(500).send(`Erreur: ${error.message}`);
  }
});

// Page produit
app.get('/products/:id', (req, res) => {
  const product = mockProducts.find(p => p.id == req.params.id) || mockProducts[0];

  const html = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${product.title} - Breslev Books</title>
      <link rel="stylesheet" href="/breslev-main.css">
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
    </head>
    <body>
      <header style="background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); padding: 20px;">
        <div style="max-width: 1400px; margin: 0 auto;">
          <a href="/" style="font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: bold; color: #1a237e; text-decoration: none;">
            📚 Breslev Books
          </a>
        </div>
      </header>

      <div style="max-width: 1400px; margin: 0 auto; padding: 40px 20px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px;">
          <div>
            <div style="background: #f5f5f5; border-radius: 8px; overflow: hidden;">
              <img src="/assets/placeholder-book.jpg" alt="${product.title}" style="width: 100%; height: auto;">
            </div>
          </div>

          <div>
            <h1 style="font-family: 'Playfair Display', serif; font-size: 2.5rem; color: #1a237e; margin: 0 0 10px 0;">
              ${product.title}
            </h1>
            <p style="font-size: 1.1rem; color: #666; margin-bottom: 20px;">Par ${product.vendor}</p>

            <div style="display: flex; align-items: baseline; gap: 15px; margin: 30px 0;">
              ${product.compare_at_price ? `<span style="font-size: 1.2rem; color: #999; text-decoration: line-through;">${(product.compare_at_price / 100).toFixed(2)}€</span>` : ''}
              <span style="font-size: 2rem; font-weight: bold; color: #1a237e;">${(product.price / 100).toFixed(2)}€</span>
            </div>

            <p style="font-size: 1.1rem; line-height: 1.6; color: #333; margin-bottom: 30px;">
              ${product.description}
            </p>

            <button style="width: 100%; padding: 18px; background: #1a237e; color: white; border: none; border-radius: 8px; font-size: 1.2rem; font-weight: bold; cursor: pointer; margin-bottom: 20px;">
              🛒 Ajouter au panier
            </button>

            ${product.has_digital ? `
              <div style="background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%); padding: 25px; border-radius: 8px; text-align: center;">
                <h3 style="margin: 0 0 10px 0; font-size: 1.3rem;">💎 Offre Bundle</h3>
                <p style="margin: 0 0 15px 0;">Livre physique + Version numérique</p>
                <p style="font-size: 2rem; font-weight: bold; margin: 0 0 15px 0;">${(product.bundle_price / 100).toFixed(2)}€</p>
                <span style="color: #856404; font-weight: bold;">Économisez 15%</span>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  res.send(html);
});

// Page abonnement
app.get('/pages/abonnement', (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Abonnement - Breslev Books</title>
      <link rel="stylesheet" href="/breslev-main.css">
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
    </head>
    <body>
      <header style="background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); padding: 20px;">
        <div style="max-width: 1400px; margin: 0 auto;">
          <a href="/" style="font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: bold; color: #1a237e; text-decoration: none;">
            📚 Breslev Books
          </a>
        </div>
      </header>

      <div style="padding: 60px 20px; background: linear-gradient(135deg, #f5f5f5 0%, #e8eaf6 100%);">
        <h1 style="text-align: center; font-family: 'Playfair Display', serif; font-size: 2.5rem; color: #1a237e; margin-bottom: 50px;">
          📚 Abonnement Illimité - Toute la Bibliothèque Numérique
        </h1>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; max-width: 900px; margin: 0 auto;">
          <!-- Plan Mensuel -->
          <div style="background: white; border-radius: 12px; padding: 40px 30px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h3 style="font-family: 'Playfair Display', serif; font-size: 1.5rem; color: #1a237e; margin: 20px 0;">
              Abonnement Mensuel
            </h3>
            <div style="margin: 30px 0;">
              <span style="font-size: 48px; font-weight: bold; color: #1a237e;">29€</span>
              <span style="font-size: 1.2rem; color: #666;">/mois</span>
            </div>
            <ul style="list-style: none; padding: 0; text-align: left; margin: 30px 0;">
              <li style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">✅ Accès aux 30 titres numériques</li>
              <li style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">✅ Nouveautés incluses automatiquement</li>
              <li style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">✅ Lecture sur 3 appareils simultanés</li>
              <li style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">✅ Support prioritaire par email</li>
              <li style="padding: 10px 0;">✅ Annulation à tout moment</li>
            </ul>
            <button style="width: 100%; padding: 15px 30px; background: #1a237e; color: white; border: none; border-radius: 30px; font-size: 1rem; font-weight: bold; cursor: pointer;">
              Essai Gratuit 7 Jours
            </button>
          </div>

          <!-- Plan Annuel -->
          <div style="background: white; border-radius: 12px; padding: 40px 30px; text-align: center; transform: scale(1.05); border: 2px solid #ffd700; box-shadow: 0 8px 30px rgba(26, 35, 126, 0.2); position: relative;">
            <div style="position: absolute; top: -15px; right: 20px; background: #ffd700; color: #1a1a1a; padding: 5px 20px; border-radius: 20px; font-weight: bold;">
              Économisez 20%
            </div>
            <h3 style="font-family: 'Playfair Display', serif; font-size: 1.5rem; color: #1a237e; margin: 20px 0;">
              Abonnement Annuel
            </h3>
            <div style="margin: 30px 0;">
              <span style="font-size: 48px; font-weight: bold; color: #1a237e;">279€</span>
              <span style="font-size: 1.2rem; color: #666;">/an</span>
              <div style="font-size: 0.9rem; color: #999; text-decoration: line-through; margin-top: 5px;">Au lieu de 348€</div>
            </div>
            <ul style="list-style: none; padding: 0; text-align: left; margin: 30px 0;">
              <li style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">✅ Tous les avantages du mensuel</li>
              <li style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">✅ <strong>2 mois GRATUITS</strong></li>
              <li style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">✅ Accès anticipé aux nouveautés</li>
              <li style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">✅ Webinaires exclusifs avec Esther Ifrah</li>
              <li style="padding: 10px 0;">✅ Lecture sur 5 appareils</li>
            </ul>
            <button style="width: 100%; padding: 15px 30px; background: #ffd700; color: #1a237e; border: none; border-radius: 30px; font-size: 1rem; font-weight: bold; cursor: pointer;">
              Essai Gratuit 14 Jours
            </button>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  res.send(html);
});

// Placeholder image
app.get('/assets/placeholder-book.jpg', (req, res) => {
  // SVG placeholder
  const svg = `
    <svg width="400" height="600" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="600" fill="#1a237e"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="24" font-family="Arial">
        📚 Livre Breslev
      </text>
    </svg>
  `;
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(svg);
});

// ==========================================
// LANCEMENT SERVEUR
// ==========================================

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════╗
║                                                        ║
║   🚀 SERVEUR LOCAL BRESLEV BOOKS LANCÉ!               ║
║                                                        ║
║   📍 URL: http://localhost:${PORT}                      ║
║                                                        ║
║   📄 Pages disponibles:                                ║
║   → http://localhost:${PORT}/                           ║
║   → http://localhost:${PORT}/collections/all            ║
║   → http://localhost:${PORT}/products/1                 ║
║   → http://localhost:${PORT}/pages/abonnement           ║
║                                                        ║
║   ⌨️  Ctrl+C pour arrêter                              ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
  `);
});
