'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

// Types from our 3 AI Agents
interface CompanyData {
  nom_entreprise: string
  secteur_activite: string
  taille_entreprise: string
  nombre_employes: number
  ca_annuel: number
  volume_factures_b2b: number
  volume_factures_b2c: number
  logiciel_actuel?: string
  format_actuel: string
}

interface AuditResult {
  score_conformite: number
  niveau_risque: 'CRITIQUE' | 'ÉLEVÉ' | 'MODÉRÉ' | 'FAIBLE'
  amendes_potentielles: {
    mensuelle: number
    annuelle: number
    pa_manquante: number
  }
  plan_migration: {
    duree_estimee: string
    cout_total: number
    etapes: string[]
  }
  points_critiques: string[]
  recommandations: string[]
}

interface ROICalculation {
  economies_amendes: {
    annuelle: number
    trois_ans: number
  }
  gains_productivite: {
    annuel: number
    trois_ans: number
  }
  roi: {
    mensuel: number
    annuel: number
    trois_ans: number
  }
  breakeven_mois: number
}

interface PDPRecommendation {
  provider: string
  score_match: number
  raisons: string[]
  prix_mensuel: number
  delai_integration: string
  fonctionnalites_cles: string[]
}

interface StoredAuditResults {
  company: CompanyData
  audit: AuditResult
  roi: ROICalculation
  pdp: PDPRecommendation
}

const AuditResultsPage = () => {
  const [results, setResults] = useState<StoredAuditResults | null>(null)
  const [isGenerating, setIsGenerating] = useState(true)

  useEffect(() => {
    // Get audit results from sessionStorage
    const storedResults = sessionStorage.getItem('auditResults')

    if (storedResults) {
      try {
        const data: StoredAuditResults = JSON.parse(storedResults)
        setResults(data)
        setIsGenerating(false)
      } catch (error) {
        console.error('Failed to parse stored results:', error)
        setIsGenerating(false)
      }
    } else {
      // Fallback if no stored results
      setIsGenerating(false)
    }
  }, [])

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Génération de votre rapport d'audit complet...</p>
          <p className="text-slate-500 text-sm mt-2">Analyse par nos 3 agents IA spécialisés</p>
        </div>
      </div>
    )
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <span className="material-symbols-outlined text-6xl text-slate-400 mb-4">error</span>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Aucun résultat trouvé</h2>
          <p className="text-slate-600 mb-6">Veuillez d'abord compléter l'audit de conformité.</p>
          <Link href="/">
            <Button>Démarrer un audit</Button>
          </Link>
        </Card>
      </div>
    )
  }

  // Vérification de sécurité : s'assurer que tous les objets nécessaires existent
  if (!results.audit || !results.company || !results.roi || !results.pdp) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <span className="material-symbols-outlined text-6xl text-slate-400 mb-4">error</span>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Données incomplètes</h2>
          <p className="text-slate-600 mb-6">
            Les résultats de l'audit sont incomplets. Veuillez refaire l'audit.
          </p>
          <Link href="/">
            <Button>Refaire un audit</Button>
          </Link>
        </Card>
      </div>
    )
  }

  const { company, audit, roi, pdp } = results

  // Vérification supplémentaire pour score_conformite
  const scoreConformite = audit?.score_conformite ?? 0

  const scoreColor =
    scoreConformite >= 80
      ? 'text-success-600'
      : scoreConformite >= 60
      ? 'text-warning-600'
      : 'text-danger-600'

  const riskColor = {
    'CRITIQUE': 'bg-danger-100 text-danger-700 border-danger-300',
    'ÉLEVÉ': 'bg-orange-100 text-orange-700 border-orange-300',
    'MODÉRÉ': 'bg-warning-100 text-warning-700 border-warning-300',
    'FAIBLE': 'bg-success-100 text-success-700 border-success-300',
  }

  const riskIcon = {
    'CRITIQUE': 'dangerous',
    'ÉLEVÉ': 'warning',
    'MODÉRÉ': 'info',
    'FAIBLE': 'check_circle',
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-gradient-dreamnova rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">D</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">DreamNova Compta</h1>
                  <p className="text-sm text-slate-500">Rapport d'Audit Conformité 2026</p>
                </div>
              </div>
            </Link>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                <span className="material-symbols-outlined text-lg">print</span>
              </Button>
              <Button size="sm">
                <span className="material-symbols-outlined text-lg">picture_as_pdf</span>
                <span className="ml-2">Générer PDF (40 pages)</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Company Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-2">{company.nom_entreprise || company.companyName || 'Entreprise'}</h2>
          <p className="text-slate-600">
            {company.secteur_activite || company.sector || 'Secteur'} • {company.taille_entreprise || 'Taille'} • {company.nombre_employes || company.employees || 0} employés • {company.ca_annuel ? (company.ca_annuel / 1000000).toFixed(1) + 'M€' : 'CA'} CA
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Key Metrics */}
          <div className="lg:col-span-1 space-y-6">
            {/* Overall Score */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-2">Score de Conformité</p>
                    <div className="flex items-baseline gap-2">
                      <p className={`text-5xl font-bold ${scoreColor}`}>{scoreConformite}%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="relative w-32 h-32">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          stroke="#e2e8f0"
                          strokeWidth="3"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          stroke={scoreConformite >= 80 ? '#10b981' : scoreConformite >= 60 ? '#f59e0b' : '#ef4444'}
                          strokeWidth="3"
                          strokeDasharray={`${scoreConformite}, 100`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-slate-900">
                          {scoreConformite}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 p-3 rounded-lg border ${riskColor[audit.niveau_risque || 'MODÉRÉ']}`}>
                    <span className="material-symbols-outlined">{riskIcon[audit.niveau_risque || 'MODÉRÉ']}</span>
                    <span className="font-bold">Risque {audit.niveau_risque || 'MODÉRÉ'}</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Penalties */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 border-2 border-danger-300 bg-danger-50/50">
                <h3 className="text-lg font-bold text-danger-700 mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined">error</span>
                  Amendes Potentielles
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-600">Mensuelle</p>
                    <p className="text-2xl font-bold text-danger-600">
                      {(audit.amendes_potentielles?.mensuelle || 0).toLocaleString('fr-FR')}€
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Annuelle (factures)</p>
                    <p className="text-3xl font-bold text-danger-700">
                      {(audit.amendes_potentielles?.annuelle || 0).toLocaleString('fr-FR')}€
                    </p>
                  </div>
                  {(audit.amendes_potentielles?.pa_manquante || 0) > 0 && (
                    <div className="pt-3 border-t border-danger-200">
                      <p className="text-sm text-slate-600">PA manquante (an 1)</p>
                      <p className="text-xl font-bold text-danger-600">
                        +{(audit.amendes_potentielles?.pa_manquante || 0).toLocaleString('fr-FR')}€
                      </p>
                    </div>
                  )}
                  <div className="pt-3 border-t border-danger-200">
                    <p className="text-sm font-medium text-slate-700">Total An 1</p>
                    <p className="text-4xl font-bold text-danger-900">
                      {((audit.amendes_potentielles?.annuelle || 0) + (audit.amendes_potentielles?.pa_manquante || 0)).toLocaleString('fr-FR')}€
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* ROI Summary */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 border-2 border-success-300 bg-success-50/50">
                <h3 className="text-lg font-bold text-success-700 mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined">trending_up</span>
                  ROI de la Conformité
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-600">ROI Annuel</p>
                    <p className="text-4xl font-bold text-success-700">
                      {roi.roi.annuel.toFixed(0)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Économies An 1</p>
                    <p className="text-2xl font-bold text-success-600">
                      {(roi.economies_amendes.annuelle + roi.gains_productivite.annuel).toLocaleString('fr-FR')}€
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">ROI 3 Ans</p>
                    <p className="text-3xl font-bold text-success-700">
                      {roi.roi.trois_ans.toFixed(0)}%
                    </p>
                  </div>
                  <div className="pt-3 border-t border-success-200">
                    <p className="text-sm font-medium text-slate-700">Breakeven</p>
                    <p className="text-2xl font-bold text-success-900">
                      {roi.breakeven_mois} mois
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Right Column: Detailed Analysis */}
          <div className="lg:col-span-2 space-y-6">
            {/* PDP Recommendation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 border-2 border-primary-300">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Plateforme Recommandée</h3>
                    <p className="text-sm text-slate-600">Analyse par Agent IA #3 - Recommandations PDP</p>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-lg">
                    <span className="material-symbols-outlined">stars</span>
                    <span className="font-bold text-lg">{pdp.score_match}%</span>
                  </div>
                </div>

                <div className="bg-gradient-dreamnova text-white p-6 rounded-xl mb-6">
                  <h4 className="text-3xl font-bold mb-2">{pdp.provider}</h4>
                  <div className="flex items-center gap-4 text-white/90">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">euro</span>
                      {pdp.prix_mensuel}€/mois
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      {pdp.delai_integration}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h5 className="font-bold text-slate-900 mb-3">Pourquoi {pdp.provider} ?</h5>
                    <ul className="space-y-2">
                      {pdp.raisons.map((raison, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                          <span className="material-symbols-outlined text-success-600 text-lg mt-0.5">
                            check_circle
                          </span>
                          <span>{raison}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 mb-3">Fonctionnalités Clés</h5>
                    <ul className="space-y-2">
                      {pdp.fonctionnalites_cles.map((fonc, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                          <span className="material-symbols-outlined text-primary-600 text-lg mt-0.5">
                            verified
                          </span>
                          <span>{fonc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Critical Points */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-danger-600">priority_high</span>
                  Points Critiques à Corriger
                </h3>
                <div className="space-y-3">
                  {audit.points_critiques.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-danger-50 rounded-lg border border-danger-200">
                      <span className="material-symbols-outlined text-danger-600 mt-0.5">error</span>
                      <span className="text-sm text-slate-700">{point}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-600">lightbulb</span>
                  Recommandations
                </h3>
                <div className="space-y-3">
                  {audit.recommandations.map((reco, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-primary-50 rounded-lg border border-primary-200">
                      <span className="material-symbols-outlined text-primary-600 mt-0.5">check_circle</span>
                      <span className="text-sm text-slate-700">{reco}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Migration Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-6 border-2 border-primary-300 bg-primary-50/50">
                <h3 className="text-xl font-bold text-primary-700 mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined">map</span>
                  Plan de Migration
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-lg border border-primary-200">
                    <p className="text-sm text-slate-600 mb-1">Durée Estimée</p>
                    <p className="text-2xl font-bold text-primary-700">{audit.plan_migration.duree_estimee}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-primary-200">
                    <p className="text-sm text-slate-600 mb-1">Coût Total</p>
                    <p className="text-2xl font-bold text-primary-700">
                      {audit.plan_migration.cout_total.toLocaleString('fr-FR')}€
                    </p>
                  </div>
                </div>

                <h4 className="font-bold text-slate-900 mb-3">Étapes de Migration</h4>
                <div className="space-y-3 mb-6">
                  {audit.plan_migration.etapes.map((etape, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-600 text-white font-bold text-sm flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div className="flex-1 bg-white p-3 rounded-lg border border-primary-200">
                        <span className="text-sm text-slate-700">{etape}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-primary-200">
                  <Link href="/pricing">
                    <Button className="w-full" size="lg">
                      <span className="material-symbols-outlined mr-2">rocket_launch</span>
                      Découvrir nos Solutions de Conformité
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>

            {/* ROI Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Détail du ROI</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <span className="material-symbols-outlined text-danger-600">block</span>
                      Économies sur Amendes
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
                        <span className="text-sm text-slate-600">An 1</span>
                        <span className="font-bold text-slate-900">
                          {roi.economies_amendes.annuelle.toLocaleString('fr-FR')}€
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
                        <span className="text-sm text-slate-600">3 Ans</span>
                        <span className="font-bold text-success-600">
                          {roi.economies_amendes.trois_ans.toLocaleString('fr-FR')}€
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <span className="material-symbols-outlined text-success-600">speed</span>
                      Gains de Productivité
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
                        <span className="text-sm text-slate-600">An 1</span>
                        <span className="font-bold text-slate-900">
                          {roi.gains_productivite.annuel.toLocaleString('fr-FR')}€
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
                        <span className="text-sm text-slate-600">3 Ans</span>
                        <span className="font-bold text-success-600">
                          {roi.gains_productivite.trois_ans.toLocaleString('fr-FR')}€
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200">
                  <div className="bg-success-50 p-4 rounded-lg border border-success-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600 mb-1">ROI Total sur 3 Ans</p>
                        <p className="text-3xl font-bold text-success-700">
                          {roi.roi.trois_ans.toFixed(0)}%
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-600 mb-1">Économies Totales</p>
                        <p className="text-2xl font-bold text-success-600">
                          {(roi.economies_amendes.trois_ans + roi.gains_productivite.trois_ans).toLocaleString('fr-FR')}€
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AuditResultsPage
