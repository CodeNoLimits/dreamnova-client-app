'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
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
  const [activeTab, setActiveTab] = useState<'liste' | 'guide' | 'architecture' | 'status' | 'costs' | 'revenue' | 'marketing'>('liste')

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
            <h1 className="text-3xl font-bold text-slate-900">Centre Développeur</h1>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-bold rounded-full">
              DEV ONLY
            </span>
          </div>
          <p className="text-slate-600">
            Documentation technique, API PDP, coûts cloud, revenus potentiels & stratégie marketing
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
          <button
            onClick={() => setActiveTab('costs')}
            className={`px-4 py-2 font-medium transition-colors border-b-2 ${
              activeTab === 'costs'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            ☁️ Coûts Cloud
          </button>
          <button
            onClick={() => setActiveTab('revenue')}
            className={`px-4 py-2 font-medium transition-colors border-b-2 ${
              activeTab === 'revenue'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            📈 Revenus Potentiels
          </button>
          <button
            onClick={() => setActiveTab('marketing')}
            className={`px-4 py-2 font-medium transition-colors border-b-2 ${
              activeTab === 'marketing'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            🎯 Plan Marketing
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

        {/* TAB: COÛTS CLOUD */}
        {activeTab === 'costs' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Overview */}
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-2xl">cloud</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-900 mb-2">
                    Estimation Coûts Infrastructure Cloud (AWS)
                  </h2>
                  <p className="text-slate-700">
                    Basé sur les recherches de janvier 2025, voici les coûts estimés pour héberger DreamNova Compta sur AWS avec une architecture scalable et sécurisée.
                  </p>
                </div>
              </div>
            </Card>

            {/* Phases de croissance */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Phase 1 */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-green-600">rocket_launch</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Phase 1: MVP</h3>
                    <p className="text-sm text-slate-600">0-100 clients</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">EC2 (t3.medium × 2)</span>
                    <span className="font-medium text-slate-900">$70/mois</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">RDS Postgres (20GB)</span>
                    <span className="font-medium text-slate-900">$50/mois</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">S3 Storage (50GB)</span>
                    <span className="font-medium text-slate-900">$12/mois</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">CloudFront CDN</span>
                    <span className="font-medium text-slate-900">$20/mois</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">Backup & Monitoring</span>
                    <span className="font-medium text-slate-900">$15/mois</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t-2 border-slate-300">
                    <span className="font-bold text-slate-900">TOTAL MENSUEL</span>
                    <span className="font-bold text-green-600 text-lg">$167/mois</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Annuel (×12)</span>
                    <span className="font-bold text-green-600">$2,004</span>
                  </div>
                </div>
              </Card>

              {/* Phase 2 */}
              <Card className="p-6 border-2 border-primary-300 bg-primary-50/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary-600">trending_up</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Phase 2: Croissance</h3>
                    <p className="text-sm text-slate-600">100-1,000 clients</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">EC2 (t3.large × 3)</span>
                    <span className="font-medium text-slate-900">$250/mois</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">RDS Postgres (100GB)</span>
                    <span className="font-medium text-slate-900">$180/mois</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">S3 Storage (500GB)</span>
                    <span className="font-medium text-slate-900">$45/mois</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">CloudFront CDN</span>
                    <span className="font-medium text-slate-900">$80/mois</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">Load Balancer + Auto-scaling</span>
                    <span className="font-medium text-slate-900">$60/mois</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">Backup & Monitoring Premium</span>
                    <span className="font-medium text-slate-900">$35/mois</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t-2 border-slate-300">
                    <span className="font-bold text-slate-900">TOTAL MENSUEL</span>
                    <span className="font-bold text-primary-600 text-lg">$650/mois</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Annuel (×12)</span>
                    <span className="font-bold text-primary-600">$7,800</span>
                  </div>
                </div>
              </Card>

              {/* Phase 3 */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-purple-600">rocket</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Phase 3: Scale</h3>
                    <p className="text-sm text-slate-600">1,000+ clients</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">EC2 (t3.xlarge × 5)</span>
                    <span className="font-medium text-slate-900">$600/mois</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">RDS Postgres (500GB + Replicas)</span>
                    <span className="font-medium text-slate-900">$450/mois</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">S3 Storage (2TB)</span>
                    <span className="font-medium text-slate-900">$150/mois</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">CloudFront CDN (High Traffic)</span>
                    <span className="font-medium text-slate-900">$200/mois</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">Load Balancer + Auto-scaling</span>
                    <span className="font-medium text-slate-900">$120/mois</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">ElastiCache Redis</span>
                    <span className="font-medium text-slate-900">$80/mois</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">CloudWatch + Security</span>
                    <span className="font-medium text-slate-900">$70/mois</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t-2 border-slate-300">
                    <span className="font-bold text-slate-900">TOTAL MENSUEL</span>
                    <span className="font-bold text-purple-600 text-lg">$1,670/mois</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Annuel (×12)</span>
                    <span className="font-bold text-purple-600">$20,040</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Costs additionnels */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Coûts Additionnels à Prévoir</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-orange-600 mt-1">security</span>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Sécurité & Compliance</h4>
                    <p className="text-sm text-slate-600 mb-2">
                      Certificats SSL, WAF, DDoS protection, audits de sécurité
                    </p>
                    <p className="font-bold text-orange-600">$50-150/mois</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-blue-600 mt-1">mail</span>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Services Email (Resend/SendGrid)</h4>
                    <p className="text-sm text-slate-600 mb-2">
                      Emails transactionnels, notifications, marketing
                    </p>
                    <p className="font-bold text-blue-600">$10-80/mois</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-green-600 mt-1">analytics</span>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Analytics & Monitoring</h4>
                    <p className="text-sm text-slate-600 mb-2">
                      Mixpanel, Amplitude, Sentry, DataDog
                    </p>
                    <p className="font-bold text-green-600">$50-200/mois</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-purple-600 mt-1">backup</span>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Backup & Disaster Recovery</h4>
                    <p className="text-sm text-slate-600 mb-2">
                      Snapshots automatiques, réplication multi-région
                    </p>
                    <p className="font-bold text-purple-600">$30-100/mois</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Tableau récap */}
            <Card className="p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
              <h3 className="text-2xl font-bold mb-6">Résumé Coûts Infrastructure Année 1</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4">Période</th>
                      <th className="text-left py-3 px-4">Phase</th>
                      <th className="text-right py-3 px-4">Coût Mensuel</th>
                      <th className="text-right py-3 px-4">Coût Total</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-b border-slate-700/50">
                      <td className="py-3 px-4">Mois 1-3</td>
                      <td className="py-3 px-4">MVP (0-50 clients)</td>
                      <td className="text-right py-3 px-4">$167</td>
                      <td className="text-right py-3 px-4 font-bold text-white">$501</td>
                    </tr>
                    <tr className="border-b border-slate-700/50">
                      <td className="py-3 px-4">Mois 4-9</td>
                      <td className="py-3 px-4">Croissance (50-500 clients)</td>
                      <td className="text-right py-3 px-4">$650</td>
                      <td className="text-right py-3 px-4 font-bold text-white">$3,900</td>
                    </tr>
                    <tr className="border-b border-slate-700/50">
                      <td className="py-3 px-4">Mois 10-12</td>
                      <td className="py-3 px-4">Scale (500+ clients)</td>
                      <td className="text-right py-3 px-4">$1,670</td>
                      <td className="text-right py-3 px-4 font-bold text-white">$5,010</td>
                    </tr>
                    <tr className="border-t-2 border-yellow-500">
                      <td className="py-4 px-4 font-bold text-lg" colSpan={2}>TOTAL ANNÉE 1 (Infrastructure)</td>
                      <td className="text-right py-4 px-4"></td>
                      <td className="text-right py-4 px-4 font-bold text-yellow-400 text-2xl">$9,411</td>
                    </tr>
                    <tr className="border-t border-slate-700/50">
                      <td className="py-3 px-4 text-slate-400" colSpan={3}>+ Services additionnels (Email, Analytics, Security)</td>
                      <td className="text-right py-3 px-4 text-yellow-400">+$2,000</td>
                    </tr>
                    <tr className="border-t-2 border-green-500 bg-green-900/20">
                      <td className="py-4 px-4 font-bold text-xl text-green-400" colSpan={3}>
                        BUDGET TOTAL INFRASTRUCTURE ANNÉE 1
                      </td>
                      <td className="text-right py-4 px-4 font-bold text-green-400 text-3xl">
                        ~$11,500
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-slate-400 text-sm">
                * Estimations basées sur AWS Pricing Calculator 2025. Les coûts réels peuvent varier selon l'utilisation.
              </p>
            </Card>
          </motion.div>
        )}

        {/* TAB: REVENUS POTENTIELS */}
        {activeTab === 'revenue' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Overview */}
            <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-2xl">trending_up</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-900 mb-2">
                    Revenus Potentiels - Marché E-facture France 2026
                  </h2>
                  <p className="text-slate-700">
                    Basé sur des recherches approfondies (janvier 2025), voici les revenus potentiels pour DreamNova Compta sur le marché français de l'e-facture.
                  </p>
                </div>
              </div>
            </Card>

            {/* Contexte marché */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-6 bg-blue-50">
                <h3 className="font-bold text-slate-900 mb-2">🇫🇷 Marché France</h3>
                <p className="text-3xl font-bold text-blue-600 mb-1">2.5M</p>
                <p className="text-sm text-slate-600">TPE-PME concernées par l'obligation</p>
                <p className="text-xs text-slate-500 mt-2">Sept 2026: Grandes entreprises<br/>Sept 2027: TPE-PME</p>
              </Card>
              
              <Card className="p-6 bg-purple-50">
                <h3 className="font-bold text-slate-900 mb-2">💰 Économies État</h3>
                <p className="text-3xl font-bold text-purple-600 mb-1">€4.5Mrd</p>
                <p className="text-sm text-slate-600">Économies annuelles estimées</p>
                <p className="text-xs text-slate-500 mt-2">Fraude VAT: ~€15Mrd/an<br/>Gain efficacité: ~€4.5Mrd/an</p>
              </Card>
              
              <Card className="p-6 bg-orange-50">
                <h3 className="font-bold text-slate-900 mb-2">📈 Marché Global</h3>
                <p className="text-3xl font-bold text-orange-600 mb-1">$15.5Mrd</p>
                <p className="text-sm text-slate-600">E-invoicing mondial en 2026</p>
                <p className="text-xs text-slate-500 mt-2">Croissance: 16.2% CAGR<br/>SaaS: 68.9% du marché</p>
              </Card>
            </div>

            {/* Modèle de pricing */}
            <Card className="p-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Modèle de Pricing Proposé</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Starter */}
                <div className="border-2 border-slate-200 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Starter</h4>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-slate-900">€29</span>
                    <span className="text-slate-600">/mois</span>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-700 mb-6">
                    <li>✓ 0-50 factures/mois</li>
                    <li>✓ 1 PDP incluse (Pennylane)</li>
                    <li>✓ Audit conformité</li>
                    <li>✓ Support email</li>
                  </ul>
                  <p className="text-xs text-slate-500">Idéal: Micro-entreprises, indépendants</p>
                </div>

                {/* Business */}
                <div className="border-2 border-primary-500 rounded-lg p-6 bg-primary-50 relative">
                  <span className="absolute top-2 right-2 bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                    POPULAIRE
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Business</h4>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-primary-600">€79</span>
                    <span className="text-slate-600">/mois</span>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-700 mb-6">
                    <li>✓ 50-500 factures/mois</li>
                    <li>✓ 3 PDP incluses</li>
                    <li>✓ Audit + ROI + Recommandations</li>
                    <li>✓ Support prioritaire</li>
                    <li>✓ API access</li>
                  </ul>
                  <p className="text-xs text-slate-500">Idéal: TPE, PME (10-50 employés)</p>
                </div>

                {/* Enterprise */}
                <div className="border-2 border-slate-200 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Enterprise</h4>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-slate-900">€199</span>
                    <span className="text-slate-600">/mois</span>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-700 mb-6">
                    <li>✓ Illimité factures</li>
                    <li>✓ Toutes PDP illimitées</li>
                    <li>✓ Multi-entités</li>
                    <li>✓ Support dédié 24/7</li>
                    <li>✓ API + Webhooks</li>
                    <li>✓ Onboarding personnalisé</li>
                  </ul>
                  <p className="text-xs text-slate-500">Idéal: PME, ETI (50+ employés)</p>
                </div>
              </div>
            </Card>

            {/* Projections revenus */}
            <Card className="p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
              <h3 className="text-2xl font-bold mb-6">Projections Revenus Année 1</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4">Période</th>
                      <th className="text-center py-3 px-4">Clients</th>
                      <th className="text-center py-3 px-4">MRR Moyen</th>
                      <th className="text-right py-3 px-4">MRR Total</th>
                      <th className="text-right py-3 px-4">ARR Cumulé</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-b border-slate-700/50">
                      <td className="py-3 px-4">Mois 1-3 (MVP)</td>
                      <td className="text-center py-3 px-4">10 → 25</td>
                      <td className="text-center py-3 px-4">€45</td>
                      <td className="text-right py-3 px-4 text-white">€1,125</td>
                      <td className="text-right py-3 px-4 text-green-400">€3,375</td>
                    </tr>
                    <tr className="border-b border-slate-700/50">
                      <td className="py-3 px-4">Mois 4-6 (Traction)</td>
                      <td className="text-center py-3 px-4">25 → 75</td>
                      <td className="text-center py-3 px-4">€55</td>
                      <td className="text-right py-3 px-4 text-white">€4,125</td>
                      <td className="text-right py-3 px-4 text-green-400">€15,750</td>
                    </tr>
                    <tr className="border-b border-slate-700/50">
                      <td className="py-3 px-4">Mois 7-9 (Croissance)</td>
                      <td className="text-center py-3 px-4">75 → 200</td>
                      <td className="text-center py-3 px-4">€65</td>
                      <td className="text-right py-3 px-4 text-white">€13,000</td>
                      <td className="text-right py-3 px-4 text-green-400">€54,750</td>
                    </tr>
                    <tr className="border-b border-slate-700/50">
                      <td className="py-3 px-4">Mois 10-12 (Scale)</td>
                      <td className="text-center py-3 px-4">200 → 500</td>
                      <td className="text-center py-3 px-4">€70</td>
                      <td className="text-right py-3 px-4 text-white">€35,000</td>
                      <td className="text-right py-3 px-4 text-green-400">€159,750</td>
                    </tr>
                    <tr className="border-t-2 border-green-500 bg-green-900/20">
                      <td className="py-4 px-4 font-bold text-xl text-green-400" colSpan={4}>
                        ARR FIN ANNÉE 1
                      </td>
                      <td className="text-right py-4 px-4 font-bold text-green-400 text-3xl">
                        ~€420,000
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-slate-400 text-sm">Clients fin année 1</p>
                  <p className="text-2xl font-bold text-white">500</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">MRR fin année 1</p>
                  <p className="text-2xl font-bold text-white">€35,000</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Taux croissance mensuel</p>
                  <p className="text-2xl font-bold text-green-400">+25%</p>
                </div>
              </div>
            </Card>

            {/* Hypothèses et notes */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Hypothèses et Notes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">✅ Hypothèses Optimistes</h4>
                  <ul className="space-y-2 text-slate-700">
                    <li>• Mix: 40% Starter, 50% Business, 10% Enterprise</li>
                    <li>• Churn: 3-5% mensuel</li>
                    <li>• CAC: €150 → €100 (amélioration progressive)</li>
                    <li>• LTV: €2,500 → €3,500</li>
                    <li>• Ratio LTV/CAC: 25x à 35x (excellent)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">⚠️ Risques à Considérer</h4>
                  <ul className="space-y-2 text-slate-700">
                    <li>• Compétition intense (107 PDP immatriculées)</li>
                    <li>• Report possible mandat septembre 2026</li>
                    <li>• Adoption lente TPE (résistance changement)</li>
                    <li>• Besoin marketing agressif (acquisition)</li>
                    <li>• Intégrations PDP complexes</li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* TAB: PLAN MARKETING 6 MOIS */}
        {activeTab === 'marketing' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Overview */}
            <Card className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-2xl">campaign</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-900 mb-2">
                    Plan Marketing 6 Mois - Acquisition B2B SaaS
                  </h2>
                  <p className="text-slate-700">
                    Stratégie complète basée sur les meilleures pratiques B2B SaaS 2025: SEO, Content Marketing, et Customer Acquisition.
                  </p>
                </div>
              </div>
            </Card>

            {/* Budget allocation */}
            <Card className="p-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Allocation Budget Marketing (Mois 1-6)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-bold text-green-900 mb-2">Organique (60-70%)</h4>
                  <p className="text-3xl font-bold text-green-600 mb-2">€3,500/mois</p>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Content Marketing + SEO</li>
                    <li>• Community Building</li>
                    <li>• Partnerships (PDP)</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-bold text-blue-900 mb-2">Paid Ads (20-30%)</h4>
                  <p className="text-3xl font-bold text-blue-600 mb-2">€1,500/mois</p>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Google Ads (Search)</li>
                    <li>• LinkedIn Ads (ABM)</li>
                    <li>• Retargeting</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-bold text-purple-900 mb-2">Expérimental (10-20%)</h4>
                  <p className="text-3xl font-bold text-purple-600 mb-2">€1,000/mois</p>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• Webinaires</li>
                    <li>• Influenceurs B2B</li>
                    <li>• Tests nouveaux canaux</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-4 bg-slate-900 text-white rounded-lg flex justify-between items-center">
                <span className="text-lg font-bold">Budget Marketing Total (Mois 1-6)</span>
                <span className="text-3xl font-bold">€6,000/mois</span>
              </div>
            </Card>

            {/* Timeline 6 mois */}
            <Card className="p-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Timeline Détaillée 6 Mois</h3>
              <div className="space-y-6">
                {/* Mois 1-2 */}
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Mois 1-2: Fondations & MVP Marketing</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-bold text-green-700 mb-2">🎯 Objectifs</p>
                      <ul className="space-y-1 text-slate-700">
                        <li>• 10-25 clients beta</li>
                        <li>• 50-100 prospects qualifiés</li>
                        <li>• 10 articles SEO publiés</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-green-700 mb-2">✅ Actions</p>
                      <ul className="space-y-1 text-slate-700">
                        <li>• Setup Google Analytics + Search Console</li>
                        <li>• Création 10 articles piliers SEO</li>
                        <li>• Landing pages (Starter, Business, Enterprise)</li>
                        <li>• Outreach direct LinkedIn (50 TPE/semaine)</li>
                        <li>• Setup email marketing (Resend)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Mois 3-4 */}
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Mois 3-4: Traction & Content Scaling</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-bold text-blue-700 mb-2">🎯 Objectifs</p>
                      <ul className="space-y-1 text-slate-700">
                        <li>• 25-75 clients payants</li>
                        <li>• 200-500 prospects qualifiés</li>
                        <li>• Top 10 Google pour 5 keywords</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-blue-700 mb-2">✅ Actions</p>
                      <ul className="space-y-1 text-slate-700">
                        <li>• 20 articles SEO additionnels</li>
                        <li>• Google Ads lancés (Search + Display)</li>
                        <li>• LinkedIn Ads (ABM ciblé)</li>
                        <li>• 2 webinaires "E-facture 2026"</li>
                        <li>• Partenariats avec 3 PDP (co-marketing)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Mois 5-6 */}
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Mois 5-6: Growth & Optimization</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-bold text-purple-700 mb-2">🎯 Objectifs</p>
                      <ul className="space-y-1 text-slate-700">
                        <li>• 75-200 clients payants</li>
                        <li>• 1000+ prospects qualifiés</li>
                        <li>• Top 3 Google pour 10 keywords</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-purple-700 mb-2">✅ Actions</p>
                      <ul className="space-y-1 text-slate-700">
                        <li>• Optimisation SEO (backlinks, E-E-A-T)</li>
                        <li>• Scaling Google Ads (ROI prouvé)</li>
                        <li>• Customer referral program lancé</li>
                        <li>• Content distribution multi-canal</li>
                        <li>• Influenceurs B2B comptabilité</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Stratégie SEO détaillée */}
            <Card className="p-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Stratégie SEO 2025: Qualité {'>'} Quantité</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">🎯 Keywords Prioritaires</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-3 bg-green-50 rounded border border-green-200">
                      <p className="font-bold text-green-900">High Intent (Priority 1)</p>
                      <ul className="mt-1 space-y-1 text-green-800">
                        <li>• "e-facture obligatoire 2026"</li>
                        <li>• "plateforme dématerialisation partenaire"</li>
                        <li>• "logiciel facture électronique tpe"</li>
                        <li>• "audit conformité e-facture"</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-blue-50 rounded border border-blue-200">
                      <p className="font-bold text-blue-900">Informational (Priority 2)</p>
                      <ul className="mt-1 space-y-1 text-blue-800">
                        <li>• "comment préparer e-facture 2026"</li>
                        <li>• "pennylanepennylane vs tiime vs sellsy"</li>
                        <li>• "chorus pro c'est quoi"</li>
                        <li>• "factur-x format"</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">📝 Content Strategy</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-bold text-slate-700">E-E-A-T Focus (Google 2025)</p>
                      <ul className="mt-1 space-y-1 text-slate-600 list-disc list-inside">
                        <li>Expertise: Auteurs experts comptabilité</li>
                        <li>Experience: Cas clients réels</li>
                        <li>Authoritativeness: Backlinks PDP officielles</li>
                        <li>Trustworthiness: Certificats, testimonials</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-slate-700">Types de Content</p>
                      <ul className="mt-1 space-y-1 text-slate-600 list-disc list-inside">
                        <li>Guides complets (3000+ mots)</li>
                        <li>Comparatifs PDP (data-driven)</li>
                        <li>Tutorials vidéo (YouTube SEO)</li>
                        <li>Case studies clients</li>
                        <li>Outils gratuits (calculateur amendes)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* KPIs et métriques */}
            <Card className="p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
              <h3 className="text-2xl font-bold mb-6">KPIs Marketing (Suivi Mensuel)</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-slate-400 text-sm mb-1">MQLs (Leads Qualifiés)</p>
                  <p className="text-3xl font-bold">100+</p>
                  <p className="text-xs text-green-400 mt-1">Croissance: +30%/mois</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">SQLs (Sales Qualified)</p>
                  <p className="text-3xl font-bold">30+</p>
                  <p className="text-xs text-green-400 mt-1">Conv rate: 30%</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Organic Traffic</p>
                  <p className="text-3xl font-bold">5K+</p>
                  <p className="text-xs text-green-400 mt-1">Visiteurs/mois M6</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">CAC (Customer Acq.)</p>
                  <p className="text-3xl font-bold">€100</p>
                  <p className="text-xs text-green-400 mt-1">Target: €80 M6</p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-400 text-sm mb-1">LTV/CAC Ratio</p>
                  <p className="text-3xl font-bold text-green-400">25x</p>
                  <p className="text-xs text-slate-400 mt-1">Excellent ({'>'}3x = bon)</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Payback Period</p>
                  <p className="text-3xl font-bold text-green-400">3 mois</p>
                  <p className="text-xs text-slate-400 mt-1">Target: {'<'}12 mois</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}


      </div>
    </DashboardLayout>
  )
}
