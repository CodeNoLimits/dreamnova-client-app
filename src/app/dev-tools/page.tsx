'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

/**
 * PAGE DÉVELOPPEUR - ACCESSIBLE UNIQUEMENT EN MODE TESTER
 * Guide complet pour intégrer les API des PDP (Plateformes de Dématérialisation Partenaires)
 */

interface PDPInfo {
  name: string
  logo: string
  priority: 'CRITIQUE' | 'HAUTE' | 'MOYENNE' | 'BASSE'
  difficulte: 'Facile' | 'Moyenne' | 'Difficile'
  popularite: number // sur 5
  status: 'Immatriculée' | 'En attente' | 'Non inscrite'
  apiDocs: string
  devPortal: string
  auth: 'OAuth 2.0' | 'API Key' | 'JWT' | 'Certificat'
  scopes: string[]
  delaiValidation: string
  cout: string
  prerequis: string[]
  etapes: string[]
  endpoints: string[]
  formats: string[]
  description: string
}

const PDP_LIST: PDPInfo[] = [
  {
    name: 'Pennylane',
    logo: '💼',
    priority: 'CRITIQUE',
    difficulte: 'Moyenne',
    popularite: 5,
    status: 'Immatriculée',
    apiDocs: 'https://pennylane.readme.io',
    devPortal: 'app.pennylane.com → Paramètres → Connectivité → Développeurs',
    auth: 'OAuth 2.0',
    scopes: ['customer_invoices:read', 'customer_invoices:write', 'customers:read', 'suppliers:read'],
    delaiValidation: '1-3 jours ouvrés',
    cout: 'Gratuit (inclus avec abonnement Essentiel+)',
    prerequis: [
      'Compte Pennylane actif',
      'Abonnement Pennylane Essentiel ou supérieur',
      'Rôle Administrateur/Gérant',
      'Entreprise avec SIRET valide',
    ],
    etapes: [
      '1. Créer compte Pennylane sur https://www.pennylane.com/fr/signup',
      '2. Souscrire abonnement Essentiel (minimum)',
      '3. Aller dans Paramètres Entreprise → Connectivité → Onglet Développeurs',
      '4. Cliquer "Générer un token API"',
      "5. Copier API Token (ne sera affiché qu'une fois)",
      "6. Tester l'API sur pennylane.readme.io",
      '7. Migrer vers API V2 (V1 obsolète depuis juillet 2025)',
    ],
    endpoints: [
      'GET /api/v2/customer_invoices - Liste factures clients',
      'POST /api/v2/customer_invoices - Créer facture',
      'GET /api/v2/customers - Liste clients',
      'GET /api/v2/suppliers - Liste fournisseurs',
      'GET /api/v2/invoices/facturx - Récupérer Factur-X',
    ],
    formats: ['Factur-X', 'PDF/A-3', 'UBL', 'CII'],
    description: "Plateforme leader en France, sélectionnée par l'administration fiscale avec mention 'Excellent'. Compatible Factur-X natif.",
  },
  {
    name: 'Chorus Pro',
    logo: '🏛️',
    priority: 'CRITIQUE',
    difficulte: 'Difficile',
    popularite: 5,
    status: 'Immatriculée',
    apiDocs: 'https://developer.chorus-pro.gouv.fr',
    devPortal: 'portail.chorus-pro.gouv.fr',
    auth: 'Certificat',
    scopes: ['depot_facture', 'consultation_facture', 'statut_facture'],
    delaiValidation: '5-15 jours ouvrés',
    cout: 'Gratuit (plateforme publique)',
    prerequis: [
      'SIRET valide',
      'Inscription sur portail Chorus Pro',
      'Demande habilitation AIFE (Agence Informatique Finances Etat)',
      'Certificat électronique (IGC-A)',
      'Contrat PISTE (pour habilitation)',
    ],
    etapes: [
      '1. Créer compte structure sur https://portail.chorus-pro.gouv.fr',
      '2. Remplir formulaire habilitation AIFE (PDF à télécharger)',
      '3. Obtenir certificat IGC-A (RGS**)',
      '4. Envoyer dossier complet par email sécurisé',
      '5. Attendre validation (5-15 jours)',
      '6. Recevoir certificats API',
      '7. Configurer environnement test',
      '8. Passer en production après validation',
    ],
    endpoints: [
      'POST /facturesv1/deposer - Déposer facture',
      'GET /facturesv1/consulter/{id} - Consulter facture',
      'GET /facturesv1/statut/{id} - Statut traitement',
      'GET /facturesv1/rechercher - Recherche factures',
    ],
    formats: ['UBL', 'CII', 'Factur-X', 'PDF signé'],
    description: 'Plateforme gouvernementale OBLIGATOIRE pour facturation B2G (entreprise → État). Processus complexe mais gratuit.',
  },
  {
    name: 'Sellsy',
    logo: '📊',
    priority: 'HAUTE',
    difficulte: 'Facile',
    popularite: 4,
    status: 'Immatriculée',
    apiDocs: 'https://api.sellsy.com/doc/v2',
    devPortal: 'app.sellsy.com → Paramètres → API',
    auth: 'OAuth 2.0',
    scopes: ['invoices.read', 'invoices.write', 'clients.read', 'documents.read'],
    delaiValidation: '1-2 jours',
    cout: 'Inclus dans tous les plans',
    prerequis: [
      'Compte Sellsy actif',
      'Plan Sellsy (Starter, Business ou Enterprise)',
      'Email vérifié',
    ],
    etapes: [
      '1. Se connecter à https://app.sellsy.com',
      '2. Aller dans Paramètres → API & Webhooks',
      '3. Cliquer "Créer une application OAuth"',
      '4. Remplir: Nom app, URL callback, Scopes',
      '5. Valider et copier Client ID + Secret',
      '6. Tester avec environnement sandbox',
      '7. Implémenter OAuth flow dans DreamNova',
    ],
    endpoints: [
      'GET /v2/invoices - Liste factures',
      'POST /v2/invoices - Créer facture',
      'GET /v2/clients - Liste clients',
      'GET /v2/invoices/{id}/pdf - Télécharger PDF',
      'GET /v2/invoices/{id}/facturx - Télécharger Factur-X',
    ],
    formats: ['Factur-X', 'PDF', 'UBL'],
    description: 'Logiciel pré-comptable populaire. API simple, OAuth standard, bonne documentation. Excellent pour TPE/PME.',
  },
  {
    name: 'Tiime',
    logo: '⚡',
    priority: 'HAUTE',
    difficulte: 'Facile',
    popularite: 4,
    status: 'Immatriculée',
    apiDocs: 'https://developers.tiime.fr',
    devPortal: 'app.tiime.fr → Intégrations',
    auth: 'API Key',
    scopes: ['invoices', 'clients', 'expenses'],
    delaiValidation: 'Immédiat',
    cout: 'Gratuit (plateforme gratuite)',
    prerequis: [
      'Compte Tiime (gratuit)',
      'Email vérifié',
    ],
    etapes: [
      '1. Créer compte sur https://www.tiime.fr',
      '2. Aller dans Paramètres → Intégrations',
      '3. Générer clé API',
      '4. Copier API Key',
      '5. Tester immédiatement',
    ],
    endpoints: [
      'GET /api/invoices - Liste factures',
      'POST /api/invoices - Créer facture',
      'GET /api/clients - Liste clients',
      'GET /api/invoices/{id}/facturx - Factur-X natif',
    ],
    formats: ['Factur-X (natif)', 'PDF'],
    description: 'Plateforme 100% gratuite, Factur-X natif. Idéal pour indépendants et micro-entreprises. API simple.',
  },
  {
    name: 'Sage',
    logo: '🟢',
    priority: 'HAUTE',
    difficulte: 'Moyenne',
    popularite: 5,
    status: 'Immatriculée',
    apiDocs: 'https://developer.sage.com',
    devPortal: 'Sage Network',
    auth: 'OAuth 2.0',
    scopes: ['accounting:read', 'accounting:write', 'invoices:read'],
    delaiValidation: '2-5 jours',
    cout: 'Inclus (clients Sage)',
    prerequis: [
      'Licence Sage (100, Business Cloud, X3)',
      'Accès Sage Network',
      'Compte développeur Sage',
    ],
    etapes: [
      "1. S'inscrire sur https://developer.sage.com",
      '2. Créer application OAuth',
      '3. Configurer scopes et redirects',
      '4. Attendre validation équipe Sage',
      '5. Recevoir Client ID + Secret',
      '6. Tester avec sandbox',
    ],
    endpoints: [
      'GET /accounting/v3.1/invoices',
      'POST /accounting/v3.1/invoices',
      'GET /accounting/v3.1/customers',
    ],
    formats: ['Factur-X', 'UBL', 'CII', 'PDF/A'],
    description: 'Leader mondial ERP. Idéal pour grandes entreprises. Intégration profonde avec Sage 100/X3.',
  },
  {
    name: 'Axonaut',
    logo: '🔷',
    priority: 'MOYENNE',
    difficulte: 'Facile',
    popularite: 3,
    status: 'Immatriculée',
    apiDocs: 'https://axonaut.com/api',
    devPortal: 'app.axonaut.com → Paramètres',
    auth: 'API Key',
    scopes: [],
    delaiValidation: 'Immédiat',
    cout: 'Gratuit',
    prerequis: ['Compte Axonaut'],
    etapes: [
      '1. Créer compte Axonaut',
      '2. Générer API Key dans Paramètres',
      '3. Tester',
    ],
    endpoints: [
      'GET /api/v2/invoices',
      'POST /api/v2/invoices',
    ],
    formats: ['PDF', 'Factur-X'],
    description: 'Concurrent direct de Sellsy. Interface simple, bon pour TPE.',
  },
  {
    name: 'Cegid',
    logo: '🔵',
    priority: 'MOYENNE',
    difficulte: 'Moyenne',
    popularite: 4,
    status: 'Immatriculée',
    apiDocs: 'https://developers.cegid.com',
    devPortal: 'Cegid Store',
    auth: 'OAuth 2.0',
    scopes: ['invoices', 'accounting'],
    delaiValidation: '3-7 jours',
    cout: 'Payant (selon plan)',
    prerequis: ['Licence Cegid', 'Contrat partenaire'],
    etapes: [
      '1. Demander accès développeur',
      '2. Signer contrat partenaire',
      '3. Accéder à Cegid Store',
      '4. Créer app OAuth',
    ],
    endpoints: [
      'GET /api/invoices',
      'POST /api/invoices',
    ],
    formats: ['Factur-X', 'UBL'],
    description: 'Solide pour cabinets comptables et grandes structures.',
  },
]

export default function DevToolsPage() {
  const [selectedPDP, setSelectedPDP] = useState<PDPInfo | null>(null)
  const [activeTab, setActiveTab] = useState<'liste' | 'guide' | 'architecture' | 'status'>('liste')

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITIQUE': return 'bg-red-500 text-white'
      case 'HAUTE': return 'bg-orange-500 text-white'
      case 'MOYENNE': return 'bg-blue-500 text-white'
      case 'BASSE': return 'bg-slate-400 text-white'
      default: return 'bg-slate-300 text-slate-800'
    }
  }

  const getDifficultyColor = (difficulte: string) => {
    switch (difficulte) {
      case 'Facile': return 'text-success-600'
      case 'Moyenne': return 'text-warning-600'
      case 'Difficile': return 'text-danger-600'
      default: return 'text-slate-600'
    }
  }

  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">🛠️</span>
            <h1 className="text-3xl font-bold text-slate-900">Outils Développeur</h1>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-bold rounded-full">
              MODE TESTER
            </span>
          </div>
          <p className="text-slate-600">
            Guide complet pour intégrer les API des Plateformes de Dématérialisation Partenaires (PDP)
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('liste')}
            className={`px-4 py-2 font-medium transition-colors border-b-2 ${
              activeTab === 'liste'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            📋 Liste des PDP
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-4 py-2 font-medium transition-colors border-b-2 ${
              activeTab === 'guide'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            📖 Guide Pennylane
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-4 py-2 font-medium transition-colors border-b-2 ${
              activeTab === 'architecture'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            🏗️ Architecture
          </button>
          <button
            onClick={() => setActiveTab('status')}
            className={`px-4 py-2 font-medium transition-colors border-b-2 ${
              activeTab === 'status'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            ✅ Checklist
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'liste' && (
          <div className="space-y-4">
            <Card className="p-6 bg-blue-50 border-blue-200">
              <h3 className="text-lg font-bold text-blue-900 mb-2">ℹ️ Qu'est-ce qu'une PDP ?</h3>
              <p className="text-blue-800 text-sm mb-4">
                Les <strong>Plateformes de Dématérialisation Partenaires (PDP)</strong> - maintenant appelées{' '}
                <strong>Plateformes Agréées (PA)</strong> - sont des services immatriculés par la DGFiP pour
                gérer la facturation électronique obligatoire à partir de septembre 2026.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong className="text-blue-900">📅 Dates clés:</strong>
                  <ul className="list-disc list-inside text-blue-800 mt-1">
                    <li>1er sept 2026: Grandes entreprises + ETI</li>
                    <li>1er sept 2027: PME + Micro-entreprises</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-blue-900">📊 Chiffres:</strong>
                  <ul className="list-disc list-inside text-blue-800 mt-1">
                    <li>107 plateformes immatriculées</li>
                    <li>70+ sous réserve</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Liste des PDP */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {PDP_LIST.map((pdp) => (
              <div
                key={pdp.name}
                className="cursor-pointer"
                onClick={() => setSelectedPDP(pdp)}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{pdp.logo}</span>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{pdp.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-0.5 text-xs font-bold rounded ${getPriorityColor(pdp.priority)}`}>
                            {pdp.priority}
                          </span>
                          <span className={`text-sm font-medium ${getDifficultyColor(pdp.difficulte)}`}>
                            {pdp.difficulte}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-yellow-500 text-lg">
                        {'⭐'.repeat(pdp.popularite)}
                      </div>
                      <span className="text-xs text-slate-500">{pdp.popularite}/5</span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 mb-4">{pdp.description}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Authentification:</span>
                      <span className="font-medium text-slate-900">{pdp.auth}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Délai validation:</span>
                      <span className="font-medium text-slate-900">{pdp.delaiValidation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Coût:</span>
                      <span className="font-medium text-slate-900">{pdp.cout}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="flex flex-wrap gap-1">
                      {pdp.formats.map((format) => (
                        <span
                          key={format}
                          className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded"
                        >
                          {format}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="space-y-6">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                📖 Guide complet: Obtenir les clés API Pennylane
              </h2>

              {/* Étape 1 */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold">
                    1
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">Créer un compte Pennylane</h3>
                </div>
                <div className="ml-11 space-y-2">
                  <p className="text-slate-700">
                    Va sur{' '}
                    <a
                      href="https://www.pennylane.com/fr/signup"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline font-medium"
                    >
                      https://www.pennylane.com/fr/signup
                    </a>
                  </p>
                  <ul className="list-disc list-inside text-slate-700 space-y-1">
                    <li>Remplis les informations entreprise (SIRET obligatoire)</li>
                    <li>Vérifie ton email</li>
                    <li>Complète ton profil</li>
                  </ul>
                </div>
              </div>

              {/* Étape 2 */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold">
                    2
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">Souscrire à l'abonnement Essentiel</h3>
                </div>
                <div className="ml-11 space-y-2">
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-800 text-sm">
                      ⚠️ <strong>Important:</strong> L'accès API nécessite minimum l'abonnement{' '}
                      <strong>Essentiel</strong> (environ 59€/mois HT)
                    </p>
                  </div>
                  <ul className="list-disc list-inside text-slate-700 space-y-1">
                    <li>Va dans Paramètres → Abonnement</li>
                    <li>Choisis "Essentiel" ou supérieur</li>
                    <li>Configure le paiement</li>
                  </ul>
                </div>
              </div>

              {/* Étape 3 */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold">
                    3
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">Générer le token API</h3>
                </div>
                <div className="ml-11 space-y-2">
                  <ol className="list-decimal list-inside text-slate-700 space-y-2">
                    <li>Connecte-toi à app.pennylane.com</li>
                    <li>Clique sur ton nom en haut à droite → <strong>Paramètres entreprise</strong></li>
                    <li>Menu latéral → <strong>Connectivité</strong></li>
                    <li>Onglet <strong>Développeurs</strong></li>
                    <li>Clique <strong>"Générer un token API"</strong></li>
                    <li>
                      <strong className="text-danger-600">IMPORTANT:</strong> Copie le token{' '}
                      <strong className="text-danger-600">immédiatement</strong> (il ne sera plus affiché)
                    </li>
                  </ol>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg font-mono text-sm">
                    <div className="text-slate-500 mb-1">Exemple de token:</div>
                    <code className="text-slate-900">pk_live_abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567</code>
                  </div>
                </div>
              </div>

              {/* Étape 4 */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold">
                    4
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">Donner le token à Claude</h3>
                </div>
                <div className="ml-11 space-y-2">
                  <p className="text-slate-700">Une fois que tu as ton token API:</p>
                  <ol className="list-decimal list-inside text-slate-700 space-y-1">
                    <li>
                      Envoie-moi le token par message (je le stockerai de manière sécurisée dans les variables
                      d'environnement Vercel)
                    </li>
                    <li>Je configurerai le connecteur OAuth Pennylane</li>
                    <li>Je testerai la connexion avec ton compte</li>
                    <li>Je déploierai en production</li>
                  </ol>
                </div>
              </div>

              {/* Étape 5 */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-success-600 text-white flex items-center justify-center font-bold">
                    ✓
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">Tester l'intégration</h3>
                </div>
                <div className="ml-11 space-y-2">
                  <p className="text-slate-700">Une fois configuré:</p>
                  <ul className="list-disc list-inside text-slate-700 space-y-1">
                    <li>Tu verras "Pennylane" dans la page Intégrations</li>
                    <li>Clique "Connecter" pour autoriser DreamNova</li>
                    <li>Tes factures seront automatiquement importées</li>
                    <li>Les audits utiliseront les vraies données Pennylane</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Documentation */}
            <Card className="p-6 bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900 mb-3">📚 Ressources utiles</h3>
              <div className="space-y-2 text-sm">
                <a
                  href="https://pennylane.readme.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-primary-600 hover:underline"
                >
                  → Documentation API Pennylane (pennylane.readme.io)
                </a>
                <a
                  href="https://help.pennylane.com/fr/articles/18770-utiliser-les-api-publiques-pennylane"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-primary-600 hover:underline"
                >
                  → Guide: Utiliser les API publiques Pennylane
                </a>
                <a
                  href="https://help.pennylane.com/fr/articles/18773-creer-un-environnement-de-test"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-primary-600 hover:underline"
                >
                  → Créer un environnement de test (Sandbox)
                </a>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="space-y-6">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">🏗️ Architecture des API Bridges</h2>

              <div className="space-y-8">
                {/* Diagramme */}
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg">
                  <pre className="text-sm font-mono whitespace-pre overflow-x-auto">
                    {`┌─────────────────────────────────────────────────────────────┐
│                    DREAMNOVA CLIENT                         │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ /dashboard  │  │ /documents  │  │ /audit      │        │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘        │
│         │                │                │                 │
│         └────────────────┴────────────────┘                 │
│                          │                                  │
│         ┌────────────────▼────────────────┐                │
│         │   Bridge Manager (Orchestrator) │                │
│         │   src/lib/bridge-manager.ts     │                │
│         └────────────────┬────────────────┘                │
│                          │                                  │
│    ┌─────────────────────┼─────────────────────┐          │
│    │                     │                     │           │
│ ┌──▼─────┐        ┌──────▼──────┐       ┌─────▼────┐     │
│ │Pennylane│       │Chorus Pro   │       │  Sellsy  │     │
│ │Connector│       │Connector    │       │Connector │     │
│ └──┬─────┘        └──────┬──────┘       └─────┬────┘     │
└────┼───────────────────────┼──────────────────┼──────────┘
     │                     │                     │
     │                     │                     │
┌────▼──────────┐   ┌──────▼─────────┐   ┌─────▼────────┐
│  Pennylane    │   │  Chorus Pro    │   │   Sellsy     │
│  API          │   │  API           │   │   API        │
│ (OAuth 2.0)   │   │ (Certificat)   │   │ (OAuth 2.0)  │
└───────────────┘   └────────────────┘   └──────────────┘`}
                  </pre>
                </div>

                {/* Structure fichiers */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">📁 Structure des fichiers</h3>
                  <div className="p-4 bg-slate-900 text-green-400 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`src/
├── lib/
│   ├── api-bridges/
│   │   ├── pennylane/
│   │   │   ├── auth.ts          # OAuth 2.0
│   │   │   ├── invoices.ts      # Récupération factures
│   │   │   ├── customers.ts     # Récupération clients
│   │   │   └── types.ts         # Types TypeScript
│   │   ├── chorus-pro/
│   │   │   ├── auth.ts          # Authentification certificat
│   │   │   ├── invoices.ts      # Dépôt/consultation
│   │   │   └── types.ts
│   │   ├── sellsy/
│   │   │   ├── auth.ts          # OAuth 2.0
│   │   │   ├── invoices.ts
│   │   │   └── types.ts
│   │   └── tiime/
│   │       ├── auth.ts          # API Key
│   │       ├── invoices.ts
│   │       └── types.ts
│   ├── bridge-manager.ts        # Orchestrateur central
│   └── encryption.ts            # Chiffrement tokens
├── app/
│   ├── api/
│   │   ├── pdp/
│   │   │   ├── connect/route.ts       # Initier OAuth
│   │   │   ├── callback/route.ts      # Callback OAuth
│   │   │   ├── disconnect/route.ts    # Déconnexion
│   │   │   └── sync/route.ts          # Synchronisation manuelle
│   │   └── integrations/
│   │       └── route.ts               # Liste connexions
│   └── integrations/
│       └── page.tsx                   # Page UI intégrations
└── supabase/
    └── api_connections.sql            # Table connexions API`}</pre>
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">⚙️ Technologies utilisées</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="p-4">
                      <h4 className="font-bold text-slate-900 mb-2">Frontend</h4>
                      <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                        <li>Next.js 14 (App Router)</li>
                        <li>TypeScript</li>
                        <li>Tailwind CSS</li>
                        <li>Framer Motion</li>
                      </ul>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-bold text-slate-900 mb-2">Backend</h4>
                      <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                        <li>Next.js API Routes</li>
                        <li>Supabase (base de données)</li>
                        <li>Node.js crypto (chiffrement)</li>
                        <li>OAuth 2.0 libraries</li>
                      </ul>
                    </Card>
                  </div>
                </div>

                {/* Sécurité */}
                <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
                  <h3 className="text-lg font-bold text-red-900 mb-3">🔒 Sécurité</h3>
                  <ul className="list-disc list-inside text-sm text-red-800 space-y-1">
                    <li>
                      <strong>Tokens chiffrés:</strong> AES-256-CBC pour tous les access/refresh tokens
                    </li>
                    <li>
                      <strong>HTTPS obligatoire:</strong> Toutes les communications API en HTTPS
                    </li>
                    <li>
                      <strong>Row Level Security:</strong> Chaque user ne voit que ses propres connexions
                    </li>
                    <li>
                      <strong>Refresh automatique:</strong> Les tokens expirés sont renouvelés automatiquement
                    </li>
                    <li>
                      <strong>Logs d'audit:</strong> Toutes les actions API sont enregistrées
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'status' && (
          <div className="space-y-6">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">✅ Checklist d'implémentation</h2>

              <div className="space-y-8">
                {/* Phase 1 */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold">
                      1
                    </span>
                    <h3 className="text-xl font-bold text-slate-900">Préparation (TOI)</h3>
                    <span className="text-sm text-slate-500">⏱️ 2-3 jours</span>
                  </div>
                  <div className="ml-11 space-y-2">
                    <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 text-primary-600 rounded" />
                      <span className="text-slate-700">Choisir 2-3 PDP prioritaires (Pennylane + Chorus Pro recommandés)</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 text-primary-600 rounded" />
                      <span className="text-slate-700">S'inscrire au programme développeur Pennylane</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 text-primary-600 rounded" />
                      <span className="text-slate-700">S'inscrire au programme développeur Chorus Pro (si B2G)</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 text-primary-600 rounded" />
                      <span className="text-slate-700">Obtenir clés API Pennylane (après validation)</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 text-primary-600 rounded" />
                      <span className="text-slate-700">Transmettre les clés API à Claude</span>
                    </label>
                  </div>
                </div>

                {/* Phase 2 */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold">
                      2
                    </span>
                    <h3 className="text-xl font-bold text-slate-900">Développement (CLAUDE)</h3>
                    <span className="text-sm text-slate-500">⏱️ 1-2 jours</span>
                  </div>
                  <div className="ml-11 space-y-2">
                    <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 text-primary-600 rounded" />
                      <span className="text-slate-700">Créer table api_connections dans Supabase</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 text-primary-600 rounded" />
                      <span className="text-slate-700">Implémenter système de chiffrement des tokens</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 text-primary-600 rounded" />
                      <span className="text-slate-700">Développer connecteur OAuth Pennylane</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 text-primary-600 rounded" />
                      <span className="text-slate-700">Créer routes API: /connect, /callback, /sync, /disconnect</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 text-primary-600 rounded" />
                      <span className="text-slate-700">Créer page UI /integrations</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 text-primary-600 rounded" />
                      <span className="text-slate-700">Implémenter refresh automatique des tokens</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 text-primary-600 rounded" />
                      <span className="text-slate-700">Créer cron job synchronisation quotidienne</span>
                    </label>
                  </div>
                </div>

                {/* Phase 3 */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold">
                      3
                    </span>
                    <h3 className="text-xl font-bold text-slate-900">Tests (ENSEMBLE)</h3>
                    <span className="text-sm text-slate-500">⏱️ 1 jour</span>
                  </div>
                  <div className="ml-11 space-y-2">
                    <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 text-primary-600 rounded" />
                      <span className="text-slate-700">Tester connexion OAuth Pennylane (environnement test)</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 text-primary-600 rounded" />
                      <span className="text-slate-700">Vérifier récupération des factures</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 text-primary-600 rounded" />
                      <span className="text-slate-700">Tester refresh automatique des tokens</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 text-primary-600 rounded" />
                      <span className="text-slate-700">Tester déconnexion et reconnexion</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 text-primary-600 rounded" />
                      <span className="text-slate-700">Vérifier sécurité (tokens chiffrés, RLS)</span>
                    </label>
                  </div>
                </div>

                {/* Phase 4 */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-full bg-success-600 text-white flex items-center justify-center font-bold">
                      ✓
                    </span>
                    <h3 className="text-xl font-bold text-slate-900">Déploiement Production</h3>
                    <span className="text-sm text-slate-500">⏱️ 2-3h</span>
                  </div>
                  <div className="ml-11 space-y-2">
                    <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 text-primary-600 rounded" />
                      <span className="text-slate-700">Ajouter clés API dans variables Vercel</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 text-primary-600 rounded" />
                      <span className="text-slate-700">Configurer URLs de callback (production)</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 text-primary-600 rounded" />
                      <span className="text-slate-700">Tester en production avec compte réel</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 text-primary-600 rounded" />
                      <span className="text-slate-700">Documenter le processus pour les clients</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 text-primary-600 rounded" />
                      <span className="text-slate-700">Créer vidéo tutoriel "Comment connecter son Pennylane"</span>
                    </label>
                  </div>
                </div>
              </div>
            </Card>

            {/* Estimation totale */}
            <Card className="p-6 bg-primary-50 border-primary-200">
              <h3 className="text-lg font-bold text-primary-900 mb-3">⏱️ Estimation totale</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-primary-700 font-medium">Phase Préparation</div>
                  <div className="text-2xl font-bold text-primary-900">2-3 jours</div>
                  <div className="text-primary-600 text-xs">(TOI - inscriptions PDP)</div>
                </div>
                <div>
                  <div className="text-primary-700 font-medium">Phase Développement</div>
                  <div className="text-2xl font-bold text-primary-900">1-2 jours</div>
                  <div className="text-primary-600 text-xs">(CLAUDE - code)</div>
                </div>
                <div>
                  <div className="text-primary-700 font-medium">Phase Tests + Déploiement</div>
                  <div className="text-2xl font-bold text-primary-900">1 jour</div>
                  <div className="text-primary-600 text-xs">(ENSEMBLE)</div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-primary-200">
                <div className="flex items-center justify-between">
                  <span className="text-primary-700 font-medium">TOTAL</span>
                  <span className="text-3xl font-bold text-primary-900">4-6 jours</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Modal détails PDP */}
        {selectedPDP && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedPDP(null)}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <Card className="max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-5xl">{selectedPDP.logo}</span>
                    <div>
                      <h2 className="text-3xl font-bold text-slate-900">{selectedPDP.name}</h2>
                      <p className="text-slate-600 mt-1">{selectedPDP.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPDP(null)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <span className="material-symbols-outlined text-slate-600">close</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Infos générales */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">📊 Informations</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-600">Priorité:</span>
                        <span className={`ml-2 px-2 py-0.5 text-xs font-bold rounded ${getPriorityColor(selectedPDP.priority)}`}>
                          {selectedPDP.priority}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-600">Difficulté:</span>
                        <span className={`ml-2 font-medium ${getDifficultyColor(selectedPDP.difficulte)}`}>
                          {selectedPDP.difficulte}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-600">Authentification:</span>
                        <span className="ml-2 font-medium text-slate-900">{selectedPDP.auth}</span>
                      </div>
                      <div>
                        <span className="text-slate-600">Délai validation:</span>
                        <span className="ml-2 font-medium text-slate-900">{selectedPDP.delaiValidation}</span>
                      </div>
                      <div>
                        <span className="text-slate-600">Coût:</span>
                        <span className="ml-2 font-medium text-slate-900">{selectedPDP.cout}</span>
                      </div>
                      <div>
                        <span className="text-slate-600">Statut:</span>
                        <span className="ml-2 px-2 py-0.5 bg-success-100 text-success-700 text-xs rounded">
                          {selectedPDP.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Prérequis */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">✅ Prérequis</h3>
                    <ul className="list-disc list-inside space-y-1 text-slate-700">
                      {selectedPDP.prerequis.map((prereq, i) => (
                        <li key={i}>{prereq}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Étapes */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">🚀 Étapes d'intégration</h3>
                    <ol className="space-y-2">
                      {selectedPDP.etapes.map((etape, i) => (
                        <li key={i} className="text-slate-700">
                          {etape}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Scopes */}
                  {selectedPDP.scopes.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">🔐 Scopes OAuth</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedPDP.scopes.map((scope) => (
                          <span
                            key={scope}
                            className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full font-mono"
                          >
                            {scope}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Endpoints */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">🔌 Endpoints API</h3>
                    <div className="space-y-2 font-mono text-sm">
                      {selectedPDP.endpoints.map((endpoint, i) => (
                        <div key={i} className="p-2 bg-slate-50 border border-slate-200 rounded">
                          {endpoint}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Formats */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">📄 Formats supportés</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPDP.formats.map((format) => (
                        <span
                          key={format}
                          className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded font-medium"
                        >
                          {format}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Documentation */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">📚 Documentation</h3>
                    <div className="space-y-2 text-sm">
                      <a
                        href={selectedPDP.apiDocs}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-primary-600 hover:underline"
                      >
                        → Documentation API: {selectedPDP.apiDocs}
                      </a>
                      <div className="text-slate-700">
                        → Portail développeur: {selectedPDP.devPortal}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      variant="primary"
                      onClick={() => {
                        window.open(selectedPDP.apiDocs, '_blank')
                      }}
                    >
                      Voir la documentation
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setSelectedPDP(null)}
                    >
                      Fermer
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
