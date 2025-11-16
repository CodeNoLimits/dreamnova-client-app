# TODO CONFORMITÉ RÉGLEMENTAIRE - ACTION IMMÉDIATE

## 🔴 BLOQUANT - À FAIRE AVANT MISE EN PRODUCTION

### ✅ Checklist Phase 1 (3-5 jours)

#### [ ] 1. Créer page Mentions Légales
**Fichier:** `src/app/mentions-legales/page.tsx`

**Template:**
```tsx
'use client'

import React from 'react'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-6 py-20 max-w-4xl">
        <Card className="p-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-8">Mentions Légales</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Éditeur du site</h2>
            <p className="text-slate-700">
              <strong>[RAISON SOCIALE]</strong><br/>
              [Forme juridique] au capital de [MONTANT]€<br/>
              Siège social: [ADRESSE COMPLÈTE]<br/>
              RCS [Ville] [Numéro]<br/>
              SIRET: [Numéro]<br/>
              TVA intracommunautaire: [Numéro]
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact</h2>
            <p className="text-slate-700">
              Email: <a href="mailto:contact@dreamnova.fr" className="text-primary-600 hover:underline">contact@dreamnova.fr</a><br/>
              Téléphone: [NUMÉRO]
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Directeur de publication</h2>
            <p className="text-slate-700">
              [Nom Prénom], [Fonction]
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Hébergement</h2>
            <p className="text-slate-700">
              Netlify, Inc.<br/>
              2325 3rd Street, Suite 296<br/>
              San Francisco, CA 94107<br/>
              USA<br/>
              <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                https://www.netlify.com
              </a>
            </p>
          </section>

          <div className="mt-12">
            <Link href="/">
              <Button variant="ghost">Retour à l'accueil</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
```

**⚠️ À REMPLACER:**
- `[RAISON SOCIALE]`
- `[Forme juridique]` (SAS, SARL, etc.)
- `[MONTANT]` du capital
- `[ADRESSE COMPLÈTE]`
- `[RCS Ville Numéro]`
- `[SIRET]`
- `[TVA intracommunautaire]`
- `[NUMÉRO]` de téléphone
- `[Nom Prénom]` directeur publication
- `[Fonction]`

---

#### [ ] 2. Créer page CGV
**Fichier:** `src/app/cgv/page.tsx`

**Sections obligatoires:**
1. Prix et modalités de paiement
2. Délais d'accès au service
3. Droit de rétractation (14 jours)
4. Garanties
5. Responsabilité
6. Médiation consommateur (https://www.economie.gouv.fr/mediation-conso)
7. Loi applicable (droit français)
8. Juridiction compétente

**⚠️ IMPORTANT:**
- Mentionner prix TTC et HT
- Indiquer modalités Stripe, Alma, Klarna
- Préciser délai d'accès après paiement
- Formulaire de rétractation type
- Lien vers plateforme médiation consommateur

**Template recommandé:** LegalPlace ou Captain Contrat (200-300€)

---

#### [ ] 3. Créer page CGU
**Fichier:** `src/app/cgu/page.tsx`

**Sections obligatoires:**
1. Objet du service
2. Acceptation des CGU
3. Inscription et compte utilisateur
4. Obligations de l'utilisateur
5. Propriété intellectuelle
6. Responsabilité et garanties
7. Durée et résiliation
8. Modification des CGU
9. Loi applicable

**⚠️ IMPORTANT:**
- Définir clairement les services fournis
- Préciser conditions d'utilisation (pas de revente, etc.)
- Mentionner propriété intellectuelle DreamNova
- Limiter responsabilité (dans limites légales)

**Template recommandé:** LegalPlace ou Captain Contrat (200-300€)

---

#### [ ] 4. Créer Politique de Confidentialité RGPD
**Fichier:** `src/app/politique-confidentialite/page.tsx`

**Sections RGPD OBLIGATOIRES:**

```tsx
'use client'

import React from 'react'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-6 py-20 max-w-4xl">
        <Card className="p-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-8">
            Politique de Confidentialité
          </h1>
          <p className="text-sm text-slate-600 mb-8">
            Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}
          </p>

          {/* 1. Responsable de traitement */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              1. Responsable de traitement des données
            </h2>
            <p className="text-slate-700">
              Le responsable du traitement des données personnelles est:<br/>
              <strong>[RAISON SOCIALE]</strong><br/>
              [ADRESSE]<br/>
              Email: <a href="mailto:dpo@dreamnova.fr" className="text-primary-600">dpo@dreamnova.fr</a>
            </p>
          </section>

          {/* 2. Données collectées */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              2. Données personnelles collectées
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Données d'identification:</h3>
                <ul className="list-disc list-inside text-slate-700">
                  <li>Nom, prénom</li>
                  <li>Adresse email</li>
                  <li>Numéro de téléphone</li>
                  <li>Raison sociale de l'entreprise</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Données de facturation:</h3>
                <ul className="list-disc list-inside text-slate-700">
                  <li>Adresse de facturation</li>
                  <li>Informations de paiement (via Stripe - non stockées)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Données techniques:</h3>
                <ul className="list-disc list-inside text-slate-700">
                  <li>Adresse IP</li>
                  <li>Cookies (voir section Cookies)</li>
                  <li>Logs de connexion</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. Finalités */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              3. Finalités des traitements
            </h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border p-2 text-left">Finalité</th>
                  <th className="border p-2 text-left">Base juridique</th>
                  <th className="border p-2 text-left">Durée</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr>
                  <td className="border p-2">Gestion compte utilisateur</td>
                  <td className="border p-2">Exécution du contrat</td>
                  <td className="border p-2">Durée du contrat + 3 ans</td>
                </tr>
                <tr>
                  <td className="border p-2">Facturation et paiement</td>
                  <td className="border p-2">Obligation légale</td>
                  <td className="border p-2">10 ans (obligation comptable)</td>
                </tr>
                <tr>
                  <td className="border p-2">Support client</td>
                  <td className="border p-2">Exécution du contrat</td>
                  <td className="border p-2">3 ans après dernier contact</td>
                </tr>
                <tr>
                  <td className="border p-2">Newsletter marketing</td>
                  <td className="border p-2">Consentement</td>
                  <td className="border p-2">Jusqu'à retrait consentement</td>
                </tr>
                <tr>
                  <td className="border p-2">Analyse statistiques</td>
                  <td className="border p-2">Intérêt légitime</td>
                  <td className="border p-2">13 mois (cookies)</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* 4. Destinataires */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              4. Destinataires des données
            </h2>
            <p className="text-slate-700 mb-4">
              Vos données personnelles peuvent être transmises à:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2">
              <li>
                <strong>Supabase</strong> (hébergement base de données) - Région UE (Francfort, Allemagne)
              </li>
              <li>
                <strong>Stripe</strong> (paiements) - Certifié PCI-DSS niveau 1
              </li>
              <li>
                <strong>Netlify</strong> (hébergement site web) - USA avec clauses contractuelles types
              </li>
              <li>
                <strong>OpenRouter/Google Gemini</strong> (IA) - Données anonymisées
              </li>
            </ul>
          </section>

          {/* 5. Transferts hors UE */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              5. Transferts de données hors Union Européenne
            </h2>
            <p className="text-slate-700">
              Certaines données sont transférées vers les États-Unis (Netlify).
              Ces transferts sont encadrés par les <strong>clauses contractuelles types</strong> de la
              Commission européenne et le <strong>Data Privacy Framework</strong>.
            </p>
          </section>

          {/* 6. Droits RGPD */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              6. Vos droits RGPD
            </h2>
            <p className="text-slate-700 mb-4">
              Conformément au RGPD, vous disposez des droits suivants:
            </p>
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 space-y-3">
              <div>
                <strong className="text-primary-900">✓ Droit d'accès:</strong>
                <span className="text-slate-700"> Obtenir une copie de vos données</span>
              </div>
              <div>
                <strong className="text-primary-900">✓ Droit de rectification:</strong>
                <span className="text-slate-700"> Corriger vos données inexactes</span>
              </div>
              <div>
                <strong className="text-primary-900">✓ Droit à l'effacement:</strong>
                <span className="text-slate-700"> Supprimer vos données (sous conditions)</span>
              </div>
              <div>
                <strong className="text-primary-900">✓ Droit à la portabilité:</strong>
                <span className="text-slate-700"> Récupérer vos données dans un format exploitable</span>
              </div>
              <div>
                <strong className="text-primary-900">✓ Droit d'opposition:</strong>
                <span className="text-slate-700"> Vous opposer à certains traitements</span>
              </div>
              <div>
                <strong className="text-primary-900">✓ Droit à la limitation:</strong>
                <span className="text-slate-700"> Limiter temporairement le traitement</span>
              </div>
            </div>
            <p className="text-slate-700 mt-4">
              Pour exercer vos droits, contactez-nous à:{' '}
              <a href="mailto:dpo@dreamnova.fr" className="text-primary-600 font-semibold">
                dpo@dreamnova.fr
              </a>
            </p>
          </section>

          {/* 7. Réclamation CNIL */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              7. Réclamation auprès de la CNIL
            </h2>
            <p className="text-slate-700">
              Vous avez le droit d'introduire une réclamation auprès de la CNIL:{' '}
              <a
                href="https://www.cnil.fr/fr/plaintes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                https://www.cnil.fr/fr/plaintes
              </a>
            </p>
          </section>

          {/* 8. Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              8. Politique de cookies
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Cookies strictement nécessaires:</h3>
                <ul className="list-disc list-inside text-slate-700">
                  <li>Session Supabase (authentification)</li>
                  <li>Préférences utilisateur</li>
                </ul>
                <p className="text-sm text-slate-600 mt-1">
                  Ces cookies ne nécessitent pas de consentement.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Cookies de performance:</h3>
                <ul className="list-disc list-inside text-slate-700">
                  <li>Analyse d'utilisation (anonymisé)</li>
                </ul>
                <p className="text-sm text-slate-600 mt-1">
                  Nécessite votre consentement (bannière cookies).
                </p>
              </div>
              <p className="text-slate-700 mt-4">
                Vous pouvez paramétrer vos cookies via votre navigateur ou notre
                bannière de consentement.
              </p>
            </div>
          </section>

          {/* 9. Sécurité */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              9. Sécurité des données
            </h2>
            <p className="text-slate-700">
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées:
            </p>
            <ul className="list-disc list-inside text-slate-700 mt-2 space-y-1">
              <li>Chiffrement TLS 1.3 (HTTPS)</li>
              <li>Chiffrement au repos (Supabase)</li>
              <li>Authentification sécurisée (OAuth 2.0 + JWT)</li>
              <li>Sauvegardes régulières</li>
              <li>Logs d'accès surveillés</li>
            </ul>
          </section>

          {/* 10. Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              10. Contact
            </h2>
            <p className="text-slate-700">
              Pour toute question concernant vos données personnelles:
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mt-4">
              <p className="font-semibold">Délégué à la Protection des Données (DPO)</p>
              <p>Email: <a href="mailto:dpo@dreamnova.fr" className="text-primary-600">dpo@dreamnova.fr</a></p>
              <p>Adresse: [ADRESSE DreamNova]</p>
            </div>
          </section>

          <div className="mt-12 pt-8 border-t border-slate-200">
            <Link href="/">
              <Button variant="ghost">Retour à l'accueil</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
```

**⚠️ À REMPLACER:**
- `[RAISON SOCIALE]`
- `[ADRESSE]`
- Email DPO
- Vérifier liste destinataires (ajouter/retirer selon services réels)

**⚠️ IMPORTANT:**
- Cette politique DOIT être revue par un avocat RGPD
- Template CNIL: https://www.cnil.fr/fr/modele-de-politique-de-confidentialite

---

#### [ ] 5. Créer Footer avec liens légaux
**Fichier:** `src/components/layout/Footer.tsx`

```tsx
'use client'

import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 mt-20 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Colonne 1: About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-dreamnova rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="text-xl font-display font-bold">DreamNova Compta</span>
            </div>
            <p className="text-slate-400 text-sm">
              Votre partenaire conformité e-facture 2026.
              Automatisation IA pour PME et ETI.
            </p>
          </div>

          {/* Colonne 2: Légal */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Légal</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link
                  href="/mentions-legales"
                  className="hover:text-primary-400 transition-colors"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  href="/cgv"
                  className="hover:text-primary-400 transition-colors"
                >
                  CGV
                </Link>
              </li>
              <li>
                <Link
                  href="/cgu"
                  className="hover:text-primary-400 transition-colors"
                >
                  CGU
                </Link>
              </li>
              <li>
                <Link
                  href="/politique-confidentialite"
                  className="hover:text-primary-400 transition-colors"
                >
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3: Ressources */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Ressources</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link
                  href="/reglementation"
                  className="hover:text-primary-400 transition-colors"
                >
                  Réglementation 2026
                </Link>
              </li>
              <li>
                <Link
                  href="/formation"
                  className="hover:text-primary-400 transition-colors"
                >
                  Formation
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-primary-400 transition-colors"
                >
                  Tarifs
                </Link>
              </li>
              <li>
                <Link
                  href="/audit"
                  className="hover:text-primary-400 transition-colors"
                >
                  Audit gratuit
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 4: Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Contact</h4>
            <div className="text-sm text-slate-300 space-y-2">
              <p>
                Email:{' '}
                <a
                  href="mailto:contact@dreamnova.fr"
                  className="text-primary-400 hover:underline"
                >
                  contact@dreamnova.fr
                </a>
              </p>
              <p>
                Tél: <span className="text-slate-400">[À définir]</span>
              </p>
              <p className="pt-4">
                <strong>DPO:</strong>{' '}
                <a
                  href="mailto:dpo@dreamnova.fr"
                  className="text-primary-400 hover:underline"
                >
                  dpo@dreamnova.fr
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Barre copyright */}
        <div className="border-t border-slate-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p>
              © {new Date().getFullYear()} DreamNova. Tous droits réservés.
            </p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">shield</span>
                Données hébergées en UE
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">verified</span>
                RGPD Compliant
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

**Intégration dans `src/app/layout.tsx`:**
```tsx
import Footer from '@/components/layout/Footer'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {children}
        <Footer />  {/* ← AJOUTER ICI */}
      </body>
    </html>
  )
}
```

---

#### [ ] 6. Retirer ou valider certifications
**Fichier:** `src/app/page.tsx` (lignes 183-195)

**Option A: RETIRER (si non obtenues)**
```tsx
// SUPPRIMER cette section complètement
```

**Option B: VALIDER (si obtenues)**
- [ ] Vérifier certificat ISO 27001 réel
- [ ] Vérifier attestation GDPR compliance
- [ ] Vérifier qualification SecNumCloud

---

#### [ ] 7. Retirer ou obtenir autorisations logos
**Fichier:** `src/app/page.tsx` (lignes 162-177)

**Option A: RETIRER (recommandé)**
```tsx
// SUPPRIMER section "Approuvé par les plus grandes entreprises"
```

**Option B: OBTENIR AUTORISATIONS**
Contacter CHAQUE entreprise:
- [ ] Sage: partenariats@sage.com
- [ ] Cegid: partenariats@cegid.com
- [ ] Pennylane: partnerships@pennylane.com
- [ ] Tiime: contact@tiime.fr
- [ ] Qonto: partnerships@qonto.com

⚠️ Attendre autorisation ÉCRITE avant affichage

---

## 🟡 IMPORTANT - Phase 2 (J+7)

#### [ ] 8. Implémenter bannière cookies RGPD

**Solution recommandée: Axeptio**
```bash
npm install @axeptio/react-sdk
```

`src/app/layout.tsx`:
```tsx
import Script from 'next/script'

// Dans <head>
<Script
  id="axeptio"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      window.axeptioSettings = {
        clientId: "VOTRE_CLIENT_ID",  // ← À OBTENIR sur axeptio.eu
        cookiesVersion: "dreamnova-2025",
      };
      (function(d, s) {
        var t = d.getElementsByTagName(s)[0], e = d.createElement(s);
        e.async = true; e.src = "//static.axept.io/sdk.js";
        t.parentNode.insertBefore(e, t);
      })(document, "script");
    `
  }}
/>
```

**Alternative gratuite: Tarteaucitron.js**
```html
<script src="https://cdn.jsdelivr.net/gh/AmauriC/tarteaucitron.js@1.9.4/tarteaucitron.min.js"></script>
```

---

## 🟢 AMÉLIORATION - Phase 3 (J+30)

#### [ ] 9. Ajouter ARIA labels
Fichiers à modifier:
- [ ] `src/app/dashboard/page.tsx:792`
- [ ] `src/components/features/Hero.tsx:104-106`

```tsx
// Avant
<button>
  <span className="material-symbols-outlined">visibility</span>
</button>

// Après
<button aria-label="Voir les détails de l'audit">
  <span className="material-symbols-outlined">visibility</span>
</button>
```

---

#### [ ] 10. Audit accessibilité
- [ ] Installer axe DevTools (Chrome extension)
- [ ] Tester tous les formulaires
- [ ] Vérifier contrastes couleurs
- [ ] Tester navigation clavier (Tab)
- [ ] Tester lecteur d'écran (NVDA)

---

## VALIDATION FINALE

#### [ ] Checklist avant déploiement
- [ ] 4 pages légales créées et remplies
- [ ] Footer ajouté avec liens
- [ ] Certifications vérifiées ou retirées
- [ ] Logos partenaires retirés ou autorisés
- [ ] Bannière cookies implémentée
- [ ] ARIA labels ajoutés
- [ ] Tests accessibilité effectués
- [ ] **Validation avocat e-commerce obtenue** ⚠️ CRITIQUE

#### [ ] Vérification production
```bash
# Test liens
curl https://dreamnova.netlify.app/mentions-legales
curl https://dreamnova.netlify.app/cgv
curl https://dreamnova.netlify.app/cgu
curl https://dreamnova.netlify.app/politique-confidentialite

# Vérifier Footer présent
curl https://dreamnova.netlify.app/ | grep "Mentions légales"
```

---

## RESSOURCES

### Templates juridiques (payant mais validé)
- **LegalPlace:** https://www.legalplace.fr/ (200-500€)
- **Captain Contrat:** https://www.captaincontrat.com/ (300-600€)

### Validation gratuite
- **CNIL Pack conformité PME:** https://www.cnil.fr/fr/conformite-rgpd-comment-recenser-vos-traitements-de-donnees-personnelles

### Contact avocat
**Si budget >1000€:**
- Cabinet Alain Bensoussan: https://www.alain-bensoussan.com/

**Si budget <500€:**
- Mon DPO: https://www.mondpo.com/ (DPO externe 100€/mois)

---

## QUESTIONS FRÉQUENTES

**Q: Puis-je déployer sans ces pages?**
Non. Risque d'amendes dès première transaction.

**Q: Les templates gratuits suffisent?**
Oui pour démarrer. Mais validation avocat RECOMMANDÉE avant forte croissance.

**Q: Combien de temps pour créer les 4 pages?**
- Avec templates: 1-2 jours
- Sans templates: 3-5 jours
- Avec avocat: 5-7 jours (+ délais)

**Q: Bannière cookies obligatoire?**
Oui si cookies non strictement nécessaires (analytics, marketing, etc.)

---

**⚠️ RAPPEL:** Cette application n'est PAS déployable en production sans ces modifications.
