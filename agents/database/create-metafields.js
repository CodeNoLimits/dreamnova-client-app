/**
 * AGENT DATABASE - Création Metafields Shopify
 * Génère le script pour créer tous les metafields nécessaires
 */

const fs = require('fs');
const path = require('path');

class DatabaseAgent {
  constructor() {
    this.metafields = {
      products: [
        {
          namespace: 'book',
          key: 'has_digital',
          type: 'boolean',
          description: 'Le livre a une version numérique'
        },
        {
          namespace: 'book',
          key: 'bundle_price',
          type: 'money',
          description: 'Prix du pack physique + numérique'
        },
        {
          namespace: 'book',
          key: 'pages',
          type: 'number_integer',
          description: 'Nombre de pages'
        },
        {
          namespace: 'book',
          key: 'isbn',
          type: 'single_line_text_field',
          description: 'ISBN du livre'
        },
        {
          namespace: 'book',
          key: 'language',
          type: 'single_line_text_field',
          description: 'Langue (fr, he, en)'
        },
        {
          namespace: 'book',
          key: 'author',
          type: 'single_line_text_field',
          description: 'Auteur du livre'
        },
        {
          namespace: 'book',
          key: 'pdf_url',
          type: 'url',
          description: 'URL du PDF protégé'
        },
        {
          namespace: 'book',
          key: 'fliphtml5_id',
          type: 'single_line_text_field',
          description: 'ID FlipHTML5 pour lecture en ligne'
        }
      ],
      customers: [
        {
          namespace: 'subscription',
          key: 'status',
          type: 'single_line_text_field',
          description: 'Statut abonnement (active, cancelled, expired)'
        },
        {
          namespace: 'subscription',
          key: 'plan',
          type: 'single_line_text_field',
          description: 'Type de plan (monthly, yearly)'
        },
        {
          namespace: 'subscription',
          key: 'expires_at',
          type: 'date',
          description: 'Date expiration abonnement'
        },
        {
          namespace: 'subscription',
          key: 'next_billing',
          type: 'date',
          description: 'Prochaine facturation'
        },
        {
          namespace: 'subscription',
          key: 'amount',
          type: 'money',
          description: 'Montant abonnement'
        }
      ]
    };
  }

  // Générer script Shopify CLI
  generateShopifyScript() {
    let script = `#!/bin/bash
# Script création metafields Shopify
# Exécuter: bash create-metafields.sh

echo "💾 Création des metafields..."

`;

    // Metafields produits
    this.metafields.products.forEach(metafield => {
      script += `shopify app generate extension --type=metafield \\
  --name="${metafield.namespace}.${metafield.key}" \\
  --type="${metafield.type}"

`;
    });

    // Metafields customers
    this.metafields.customers.forEach(metafield => {
      script += `shopify app generate extension --type=metafield \\
  --name="${metafield.namespace}.${metafield.key}" \\
  --type="${metafield.type}"

`;
    });

    script += `echo "✅ Metafields créés!"
`;

    return script;
  }

  // Générer documentation
  generateDocumentation() {
    let doc = `# 💾 MÉTAFIELDS SHOPIFY - ESTHER IFRAH

## 📋 PRODUITS

`;

    this.metafields.products.forEach(mf => {
      doc += `### \`${mf.namespace}.${mf.key}\`
- **Type:** ${mf.type}
- **Description:** ${mf.description}

`;
    });

    doc += `## 👤 CUSTOMERS

`;

    this.metafields.customers.forEach(mf => {
      doc += `### \`${mf.namespace}.${mf.key}\`
- **Type:** ${mf.type}
- **Description:** ${mf.description}

`;
    });

    return doc;
  }

  // Sauvegarder fichiers
  save() {
    const scriptsPath = path.join(__dirname, 'scripts');
    if (!fs.existsSync(scriptsPath)) {
      fs.mkdirSync(scriptsPath, { recursive: true });
    }

    // Script Shopify CLI
    const script = this.generateShopifyScript();
    fs.writeFileSync(path.join(scriptsPath, 'create-metafields.sh'), script);
    fs.chmodSync(path.join(scriptsPath, 'create-metafields.sh'), '755');

    // Documentation
    const doc = this.generateDocumentation();
    fs.writeFileSync(path.join(__dirname, 'METAFIELDS-DOC.md'), doc);

    // JSON schema
    fs.writeFileSync(
      path.join(__dirname, 'metafields-schema.json'),
      JSON.stringify(this.metafields, null, 2)
    );
  }
}

// Si exécuté directement
if (require.main === module) {
  const agent = new DatabaseAgent();
  console.log('💾 Agent Database - Création metafields...\n');
  
  agent.save();
  
  console.log('✅ Fichiers créés:');
  console.log('  - scripts/create-metafields.sh');
  console.log('  - METAFIELDS-DOC.md');
  console.log('  - metafields-schema.json');
}

module.exports = DatabaseAgent;

