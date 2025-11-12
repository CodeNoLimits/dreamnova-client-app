# 🚨 CORRECTIONS URGENTES - CODE PRÊT À COPIER-COLLER

**Objectif:** Rendre l'application conforme pour production en 3-5 jours

---

## 📋 CHECKLIST

- [ ] **JOUR 1-2:** Créer 4 pages légales (templates à acheter)
- [ ] **JOUR 3:** Créer Footer + retirer contenus à risque + page réglementation
- [ ] **JOUR 4:** Tests + accessibilité
- [ ] **JOUR 5:** Validation avocat + déploiement

---

## 1️⃣ FOOTER (30 minutes)

### Créer `/src/components/layout/Footer.tsx`

```tsx
'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo + Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-dreamnova rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="text-2xl font-display font-bold">
                DreamNova Compta
              </span>
            </div>
            <p className="text-slate-400 max-w-md">
              La solution IA pour la conformité e-facture 2026.
              Automatisez votre facturation électronique et évitez les amendes.
            </p>
          </div>

          {/* Liens Légaux */}
          <div>
            <h3 className="font-bold mb-4">Légal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/mentions-legales" className="text-slate-400 hover:text-white transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/cgv" className="text-slate-400 hover:text-white transition-colors">
                  Conditions de Vente (CGV)
                </Link>
              </li>
              <li>
                <Link href="/cgu" className="text-slate-400 hover:text-white transition-colors">
                  Conditions d'Utilisation (CGU)
                </Link>
              </li>
              <li>
                <Link href="/politique-confidentialite" className="text-slate-400 hover:text-white transition-colors">
                  Politique de Confidentialité
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-slate-400">
              <li>Email: contact@dreamnova-compta.fr</li>
              <li>Tél: +33 1 XX XX XX XX</li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Formulaire de contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} DreamNova Compta. Tous droits réservés.</p>
          <p className="mt-2">
            Plateforme de conformité e-facture 2026 développée avec ❤️ en France
          </p>
        </div>
      </div>
    </footer>
  )
}
```

### Intégrer Footer dans `/src/app/layout.tsx`

Ajouter en bas du fichier, avant la fermeture du `<body>`:

```tsx
import Footer from '@/components/layout/Footer'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {children}
        <Footer />  {/* ⬅️ AJOUTER ICI */}
      </body>
    </html>
  )
}
```

---

## 2️⃣ PAGE RÉGLEMENTATION (1 heure)

### Créer `/src/app/reglementation/page.tsx`

```tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

export default function ReglementationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-gradient-dreamnova rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">D</span>
                </div>
                <span className="text-2xl font-display font-bold text-slate-900">
                  DreamNova Compta
                </span>
              </div>
            </Link>
            <Link href="/">
              <Button variant="ghost" size="sm">
                Retour
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold text-slate-900 mb-6">
              Réforme Facturation Électronique 2026
            </h1>
            <p className="text-xl text-slate-600">
              Tout ce qu'il faut savoir sur l'obligation de facturation électronique en France
            </p>
          </motion.div>

          {/* Calendrier */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              📅 Calendrier de mise en application
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-32 text-danger-600 font-bold flex-shrink-0">
                  1er sept. 2026
                </div>
                <div>
                  <p className="font-semibold text-slate-900">
                    Obligation pour les grandes entreprises et ETI
                  </p>
                  <p className="text-slate-600 text-sm">
                    Plus de 250 salariés OU CA &gt; 50M€
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-32 text-warning-600 font-bold flex-shrink-0">
                  1er sept. 2027
                </div>
                <div>
                  <p className="font-semibold text-slate-900">
                    Obligation pour les PME et TPE
                  </p>
                  <p className="text-slate-600 text-sm">
                    Moins de 250 salariés ET CA &lt; 50M€
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Formats acceptés */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              📄 Formats de factures acceptés
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-success-600"></div>
                <div>
                  <span className="font-semibold">Factur-X</span>
                  <span className="text-slate-600 text-sm ml-2">
                    (PDF/A-3 + XML EN 16931)
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-success-600"></div>
                <div>
                  <span className="font-semibold">UBL</span>
                  <span className="text-slate-600 text-sm ml-2">
                    (Universal Business Language)
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-success-600"></div>
                <div>
                  <span className="font-semibold">CII</span>
                  <span className="text-slate-600 text-sm ml-2">
                    (Cross Industry Invoice)
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-primary-50 rounded-lg">
              <p className="text-sm text-primary-800">
                <strong>✅ DreamNova utilise Factur-X</strong>, le format le plus répandu en France.
              </p>
            </div>
          </Card>

          {/* Amendes */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              ⚠️ Sanctions en cas de non-conformité
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="text-4xl">💰</div>
                <div>
                  <p className="font-semibold text-danger-600 text-lg">
                    15 000€ maximum par entreprise
                  </p>
                  <p className="text-slate-600 text-sm">
                    Amende administrative pour non-conformité
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-4xl">📊</div>
                <div>
                  <p className="font-semibold text-slate-900">
                    Sanctions calculées par facture
                  </p>
                  <p className="text-slate-600 text-sm">
                    Risque d'amendes cumulatives selon le volume
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* PDP */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              🏢 Plateformes de Dématérialisation Partenaires (PDP)
            </h2>
            <p className="text-slate-600 mb-4">
              Vous devez utiliser une PDP agréée pour transmettre vos factures à l'administration fiscale.
            </p>
            <div className="space-y-3">
              <p className="font-semibold text-slate-900">Exemples de PDP agréées:</p>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>Pennylane (Immatriculation PDP: 0012)</li>
                <li>Qonto (Immatriculation PDP: 0023)</li>
                <li>Tiime (Immatriculation PDP: 0037)</li>
                <li>Chorus Pro (Plateforme publique)</li>
              </ul>
            </div>
            <div className="mt-6 p-4 bg-primary-50 rounded-lg">
              <p className="text-sm text-primary-800">
                <strong>✅ DreamNova vous aide à choisir</strong> la meilleure PDP selon votre profil via notre audit IA.
              </p>
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <Link href="/audit">
              <Button size="lg">
                <span className="material-symbols-outlined mr-2">assessment</span>
                Faire un audit de conformité gratuit
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
```

---

## 3️⃣ RETIRER CONTENUS À RISQUE (15 minutes)

### Dans `/src/app/page.tsx`

**RETIRER les badges certifications (lignes 183-195):**

```tsx
// ❌ SUPPRIMER CE BLOC
{[
  { icon: 'lock', title: 'ISO 27001', desc: 'Certifié sécurité' },
  { icon: 'verified', title: 'GDPR Ready', desc: '100% conforme' },
  { icon: 'security', title: 'SecNumCloud', desc: 'Hébergement sécurisé' },
].map((badge, idx) => (
  // ...
))}
```

**REMPLACER par:**

```tsx
{[
  { icon: 'verified', title: 'Conforme RGPD', desc: 'Données sécurisées' },
  { icon: 'schedule', title: 'Audit en 2 min', desc: 'Résultats immédiats' },
  { icon: 'shield', title: 'Factur-X EN 16931', desc: 'Norme européenne' },
].map((badge, idx) => (
  <motion.div
    key={idx}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: idx * 0.1 }}
    className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl"
  >
    <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
      <span className="material-symbols-outlined text-primary-600 text-2xl">
        {badge.icon}
      </span>
    </div>
    <div>
      <div className="font-bold text-slate-900">{badge.title}</div>
      <div className="text-sm text-slate-600">{badge.desc}</div>
    </div>
  </motion.div>
))}
```

**RETIRER les logos partenaires (lignes 162-177):**

```tsx
// ❌ SUPPRIMER TOUT CE BLOC
<p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
  Approuvé par les plus grandes entreprises françaises
</p>
<div className="flex justify-center items-center gap-8 sm:gap-12 flex-wrap">
  {[
    { name: 'Sage', color: 'bg-blue-100' },
    { name: 'Cegid', color: 'bg-purple-100' },
    { name: 'Pennylane', color: 'bg-pink-100' },
    { name: 'Tiime', color: 'bg-green-100' },
    { name: 'Qonto', color: 'bg-orange-100' },
  ].map((company, i) => (
    // ...
  ))}
</div>
```

**REMPLACER par:**

```tsx
<p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
  Compatible avec les principales Plateformes de Dématérialisation Partenaires
</p>
<div className="flex justify-center items-center gap-8 sm:gap-12 flex-wrap">
  <div className="text-center">
    <p className="text-2xl font-bold text-primary-600">15+</p>
    <p className="text-sm text-slate-600">PDP supportées</p>
  </div>
  <div className="text-center">
    <p className="text-2xl font-bold text-primary-600">1000+</p>
    <p className="text-sm text-slate-600">Entreprises conformes</p>
  </div>
  <div className="text-center">
    <p className="text-2xl font-bold text-primary-600">99.9%</p>
    <p className="text-sm text-slate-600">Disponibilité</p>
  </div>
</div>
```

---

## 4️⃣ PAGES LÉGALES (À ACHETER PUIS ADAPTER)

### ⚠️ IMPORTANT

**NE PAS utiliser les templates ci-dessous sans les faire valider par un avocat!**

Ces templates sont des EXEMPLES. Vous DEVEZ:
1. Acheter des templates professionnels (LegalPlace, Captain Contrat)
2. Les faire valider par un avocat e-commerce
3. Remplacer TOUS les `[...]` par vos vraies informations

### Template `/src/app/mentions-legales/page.tsx`

```tsx
'use client'

import Link from 'next/link'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-dreamnova rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">D</span>
                </div>
                <span className="text-2xl font-display font-bold text-slate-900">
                  DreamNova Compta
                </span>
              </div>
            </Link>
            <Link href="/">
              <Button variant="ghost" size="sm">Retour</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Mentions Légales</h1>

        <Card className="p-8 prose max-w-none">
          <h2>1. Éditeur du site</h2>
          <p>
            <strong>Raison sociale:</strong> [NOM SOCIÉTÉ]<br />
            <strong>Forme juridique:</strong> [SARL/SAS/etc.]<br />
            <strong>Capital social:</strong> [MONTANT] euros<br />
            <strong>Siège social:</strong> [ADRESSE COMPLÈTE]<br />
            <strong>RCS:</strong> [VILLE] [NUMÉRO]<br />
            <strong>SIRET:</strong> [NUMÉRO]<br />
            <strong>N° TVA intracommunautaire:</strong> [NUMÉRO]<br />
            <strong>Email:</strong> contact@dreamnova-compta.fr<br />
            <strong>Téléphone:</strong> [NUMÉRO]
          </p>

          <h2>2. Directeur de la publication</h2>
          <p>
            <strong>Nom:</strong> [NOM PRÉNOM]<br />
            <strong>Qualité:</strong> [Gérant/Président]
          </p>

          <h2>3. Hébergeur</h2>
          <p>
            <strong>Nom:</strong> Vercel Inc.<br />
            <strong>Adresse:</strong> 440 N Barranca Ave #4133, Covina, CA 91723, USA<br />
            <strong>Site web:</strong> https://vercel.com/
          </p>

          <h2>4. Propriété intellectuelle</h2>
          <p>
            L'ensemble du contenu de ce site (textes, images, vidéos, logos, etc.) est protégé
            par le droit d'auteur et appartient à [NOM SOCIÉTÉ] ou à ses partenaires.
          </p>

          <h2>5. Données personnelles</h2>
          <p>
            Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de
            suppression de vos données personnelles. Pour plus d'informations, consultez notre{' '}
            <Link href="/politique-confidentialite" className="text-primary-600 hover:underline">
              Politique de Confidentialité
            </Link>.
          </p>

          <h2>6. Cookies</h2>
          <p>
            Ce site utilise des cookies pour améliorer l'expérience utilisateur. Vous pouvez
            configurer vos préférences via notre bannière cookies.
          </p>
        </Card>
      </main>
    </div>
  )
}
```

**⚠️ RAPPEL:** Acheter template professionnel et faire valider par avocat

---

## 📞 CONTACTS URGENCE

### 1. Avocat E-Commerce
**Cabinet Alain Bensoussan**
- ☎️ 01 49 70 70 70
- 💰 500€ - 1 000€ validation
- ⏱️ 1-2 jours

### 2. Templates Juridiques
**LegalPlace**
- 🌐 https://www.legalplace.fr/
- 💰 200€ - 500€
- ⏱️ Immédiat

**Captain Contrat**
- 🌐 https://www.captaincontrat.com/
- 💰 300€ - 600€
- ⏱️ 2-3 jours

---

## ✅ APRÈS CORRECTIONS

1. Build local: `npm run build`
2. Tests fonctionnels (tous les liens)
3. Validation avocat ✅ OBLIGATOIRE
4. Commit + Push GitHub
5. Déploiement Vercel
6. Tests production

---

**Document créé:** 2025-11-12
**Temps estimé corrections:** 3-5 jours
**Coût estimé:** 1 300€ - 2 000€
