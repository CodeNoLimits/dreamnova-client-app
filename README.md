# DreamNova Client App 🚀

Application client DreamNova pour la conformité à la facturation électronique 2026. Interface world-class inspirée des leaders SaaS (Stripe, Vercel, Linear, Notion).

## 🎯 Fonctionnalités

- ✅ Audit de conformité en 3 étapes
- ✅ Calcul de risque automatisé
- ✅ Analyse par IA (Google Gemini)
- ✅ Design world-class avec animations fluides
- ✅ Architecture modulaire multi-plateforme
- ✅ Responsive & accessible (WCAG AA)

## 🏗️ Architecture

```
src/
├── app/              # Next.js App Router
├── components/
│   ├── ui/          # Composants UI réutilisables
│   └── features/    # Composants métier
├── adapters/        # Abstractions providers (AI, DB, etc.)
├── lib/            # Utilitaires et helpers
├── services/       # Services métier
└── types/          # Types TypeScript
```

### Architecture Modulaire

L'application utilise le **pattern Adapter** pour garantir la versatilité multi-plateforme :

- **AI Provider**: Gemini (extensible à OpenAI, Anthropic)
- **Deployment**: Vercel, Netlify, Render
- **Database**: Supabase, MongoDB, Vercel Postgres (à venir)
- **Storage**: Cloudinary, S3, Vercel Blob (à venir)

Changement de provider en **< 30 minutes** via variables d'environnement.

## 🚀 Démarrage Rapide

### Prérequis

- Node.js >= 18.0.0
- npm ou yarn

### Installation

```bash
# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.local.example .env.local
# Éditer .env.local et ajouter votre GEMINI_API_KEY

# Lancer en développement
npm run dev

# Ouvrir http://localhost:3000
```

### Build & Deploy

```bash
# Build de production
npm run build

# Preview local
npm run start

# Deploy sur Vercel (recommandé)
vercel

# Deploy sur Netlify
netlify deploy --prod
```

## 🎨 Design System

Inspiré des meilleurs sites SaaS :

- **Typographie**: Inter (corps), Cal Sans (titres)
- **Couleurs**: Palette moderne avec primary blue, success green, danger red
- **Animations**: Framer Motion pour transitions fluides
- **Composants**: Design system cohérent et réutilisable

## 📊 Stack Technique

- **Framework**: Next.js 14 (App Router)
- **UI**: React 18, TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **AI**: Google Gemini (via adapter modulaire)
- **State**: Zustand (à venir)
- **Deployment**: Vercel / Netlify

## 🔧 Configuration

### Variables d'environnement

```env
# Platform
DEPLOYMENT_PLATFORM=vercel

# AI
GEMINI_API_KEY=your_key_here

# Database (optionnel)
DATABASE_PROVIDER=supabase
DATABASE_URL=

# Auth (optionnel)
AUTH_PROVIDER=supabase
```

### Scripts disponibles

```bash
npm run dev         # Développement
npm run build       # Build production
npm run start       # Serveur production
npm run lint        # Linter
npm run type-check  # Vérification TypeScript
```

## 📈 Métriques

| Métrique | Target | Status |
|----------|--------|--------|
| Lighthouse Performance | >90 | 🎯 |
| First Contentful Paint | <1.2s | 🎯 |
| Time to Interactive | <3.5s | 🎯 |
| Cumulative Layout Shift | <0.1 | 🎯 |

## 🔐 Sécurité

- ✅ RGPD compliant
- ✅ HTTPS obligatoire
- ✅ Variables sensibles en .env
- ✅ Validation des inputs
- ✅ Protection CSRF (Next.js)

## 📝 Licence

Propriétaire - DreamNova © 2025

## 🤝 Contribution

Ce projet est privé. Pour toute question, contactez l'équipe DreamNova.

---

**Construit avec ❤️ par DreamNova** | [Documentation](https://docs.dreamnova.ai) | [Support](mailto:support@dreamnova.ai)
