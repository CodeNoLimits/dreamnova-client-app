/**
 * AGENT STYLE - Création Design System
 * Génère le design system complet pour Esther Ifrah
 */

const fs = require('fs');
const path = require('path');

class StyleAgent {
  constructor() {
    this.designSystem = {
      colors: {
        primary: {
          'bleu-royal': '#1a237e',
          'bleu-profond': '#0d47a1',
          'bleu-clair': '#3f51b5'
        },
        accent: {
          'or-sacre': '#ffd700',
          'or-clair': '#ffed4e',
          'or-fonce': '#ffc107'
        },
        neutral: {
          'blanc-pur': '#ffffff',
          'noir-elegant': '#1a1a1a',
          'gris-clair': '#f5f5f5',
          'gris-moyen': '#9e9e9e',
          'gris-fonce': '#424242'
        }
      },
      typography: {
        hebrew: {
          font: 'Frank Ruhl Libre',
          weights: [400, 700],
          sizes: {
            h1: '3rem',
            h2: '2.5rem',
            h3: '2rem',
            body: '1.125rem'
          }
        },
        french: {
          font: 'Playfair Display',
          weights: [400, 700],
          sizes: {
            h1: '3.5rem',
            h2: '2.5rem',
            h3: '2rem',
            body: '1.25rem'
          }
        },
        body: {
          font: 'Crimson Text',
          weights: [400, 600],
          size: '1.125rem',
          lineHeight: '1.8'
        }
      },
      spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
        xxl: '4rem'
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '30px',
        full: '9999px'
      },
      shadows: {
        sm: '0 2px 4px rgba(0,0,0,0.1)',
        md: '0 4px 6px rgba(0,0,0,0.1)',
        lg: '0 8px 20px rgba(26, 35, 126, 0.2)',
        glow: '0 0 30px rgba(255, 215, 0, 0.3)'
      }
    };
  }

  // Générer CSS Design System
  generateCSS() {
    let css = `/* ============================================
   DESIGN SYSTEM ESTHER IFRAH
   ============================================ */

:root {
  /* Couleurs Primaires */
  --color-primary-royal: #1a237e;
  --color-primary-profond: #0d47a1;
  --color-primary-clair: #3f51b5;
  
  /* Couleurs Accent */
  --color-accent-or: #ffd700;
  --color-accent-or-clair: #ffed4e;
  --color-accent-or-fonce: #ffc107;
  
  /* Couleurs Neutres */
  --color-white: #ffffff;
  --color-black: #1a1a1a;
  --color-gray-light: #f5f5f5;
  --color-gray-medium: #9e9e9e;
  --color-gray-dark: #424242;
  
  /* Gradients */
  --gradient-primary: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%);
  --gradient-accent: linear-gradient(135deg, #ffd700 0%, #ffc107 100%);
  
  /* Typographie Hébreu */
  --font-hebrew: 'Frank Ruhl Libre', serif;
  --font-hebrew-h1: 3rem;
  --font-hebrew-h2: 2.5rem;
  --font-hebrew-body: 1.125rem;
  
  /* Typographie Français */
  --font-french: 'Playfair Display', serif;
  --font-french-h1: 3.5rem;
  --font-french-h2: 2.5rem;
  --font-french-body: 1.25rem;
  
  /* Typographie Corps */
  --font-body: 'Crimson Text', serif;
  --font-body-size: 1.125rem;
  --font-body-line-height: 1.8;
  
  /* Spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
  --spacing-xxl: 4rem;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 30px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 2px 4px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 8px 20px rgba(26, 35, 126, 0.2);
  --shadow-glow: 0 0 30px rgba(255, 215, 0, 0.3);
}

/* Typographie */
.hebrew-text {
  font-family: var(--font-hebrew);
  direction: rtl;
  text-align: right;
}

.french-text {
  font-family: var(--font-french);
}

body {
  font-family: var(--font-body);
  font-size: var(--font-body-size);
  line-height: var(--font-body-line-height);
  color: var(--color-black);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-french);
  color: var(--color-primary-royal);
}

/* Boutons */
.btn {
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-xl);
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background: var(--color-accent-or);
  color: var(--color-primary-royal);
}

.btn-primary:hover {
  background: var(--color-accent-or-clair);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-secondary {
  background: transparent;
  color: var(--color-white);
  border: 2px solid var(--color-white);
}

.btn-secondary:hover {
  background: var(--color-white);
  color: var(--color-primary-royal);
}

/* Cards */
.card {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.6s ease-out;
}

@keyframes glow {
  0%, 100% {
    opacity: 1;
    text-shadow: var(--shadow-glow);
  }
  50% {
    opacity: 0.8;
    text-shadow: 0 0 40px rgba(255, 215, 0, 0.5);
  }
}

.animate-glow {
  animation: glow 3s ease-in-out infinite;
}

/* Responsive */
@media (max-width: 768px) {
  :root {
    --font-french-h1: 2.5rem;
    --font-hebrew-h1: 2rem;
    --spacing-xl: 2rem;
  }
}
`;

    return css;
  }

  // Sauvegarder design system
  save() {
    const assetsPath = path.join(__dirname, '../../assets');
    if (!fs.existsSync(assetsPath)) {
      fs.mkdirSync(assetsPath, { recursive: true });
    }

    // CSS Design System
    const css = this.generateCSS();
    fs.writeFileSync(path.join(assetsPath, 'design-system.css'), css);

    // JSON Schema
    fs.writeFileSync(
      path.join(__dirname, 'design-system.json'),
      JSON.stringify(this.designSystem, null, 2)
    );

    // Documentation
    const doc = `# 🎨 DESIGN SYSTEM ESTHER IFRAH

## 🎨 COULEURS

### Primaire
- Bleu Royal: #1a237e
- Bleu Profond: #0d47a1
- Bleu Clair: #3f51b5

### Accent
- Or Sacré: #ffd700
- Or Clair: #ffed4e
- Or Foncé: #ffc107

## 📝 TYPOGRAPHIE

### Hébreu
- Font: Frank Ruhl Libre
- Direction: RTL

### Français
- Font: Playfair Display
- Titres élégants

### Corps
- Font: Crimson Text
- Lisibilité optimale

## 📐 SPACING

- XS: 0.5rem
- SM: 1rem
- MD: 1.5rem
- LG: 2rem
- XL: 3rem

## 🎯 UTILISATION

\`\`\`css
/* Utiliser variables CSS */
color: var(--color-primary-royal);
font-family: var(--font-french);
padding: var(--spacing-lg);
\`\`\`

---

**Design System créé! ✅**
`;

    fs.writeFileSync(path.join(__dirname, 'DESIGN-SYSTEM-DOC.md'), doc);
  }
}

// Si exécuté directement
if (require.main === module) {
  const agent = new StyleAgent();
  console.log('🎨 Agent Style - Création design system...\n');
  
  agent.save();
  
  console.log('✅ Fichiers créés:');
  console.log('  - assets/design-system.css');
  console.log('  - design-system.json');
  console.log('  - DESIGN-SYSTEM-DOC.md');
}

module.exports = StyleAgent;

