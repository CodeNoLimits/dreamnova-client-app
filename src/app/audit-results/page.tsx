'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface AuditResult {
  overallScore: number
  criticalIssues: number
  warnings: number
  compliant: number
  competitorAverage: number
  issues: Array<{
    id: string
    requirement: string
    status: 'critical' | 'warning' | 'compliant'
    costBenefit: string
  }>
}

const AuditResultsPage = () => {
  const [results, setResults] = useState<AuditResult | null>(null)
  const [isGenerating, setIsGenerating] = useState(true)

  useEffect(() => {
    // Get audit results from sessionStorage
    const storedResults = sessionStorage.getItem('auditResults')
    
    if (storedResults) {
      try {
        const data = JSON.parse(storedResults)
        
        // Calculate issues based on score and penalties
        const score = data.score || 68
        const criticalCount = score < 50 ? 12 : score < 70 ? 8 : 4
        const warningCount = score < 50 ? 29 : score < 70 ? 20 : 10
        const compliantCount = 127 - criticalCount - warningCount

        setResults({
          overallScore: score,
          criticalIssues: criticalCount,
          warnings: warningCount,
          compliant: compliantCount,
          competitorAverage: 73,
          issues: [
            {
              id: '1',
              requirement: 'Absence de format de facture conforme EN 16931',
              status: 'critical',
              costBenefit: `€2,500 implémentation vs ${data.penalties?.annual?.toLocaleString('fr-FR') || '15,000'}€ amendes annuelles`,
            },
            {
              id: '2',
              requirement: 'Aucune Plateforme d\'Agrément (PA) configurée',
              status: 'critical',
              costBenefit: '€500 setup + €1,000/trimestre vs €4,500 amendes annuelles',
            },
            {
              id: '3',
              requirement: 'Capacité de génération Factur-X PDF manquante',
              status: 'warning',
              costBenefit: '€1,200 intégration vs €3,000 risque annuel',
            },
            {
              id: '4',
              requirement: 'Format UBL 2.1 XML non supporté',
              status: 'warning',
              costBenefit: '€800 développement vs €2,000 risque annuel',
            },
          ],
        })
        setIsGenerating(false)
      } catch (error) {
        console.error('Failed to parse stored results:', error)
        setIsGenerating(false)
      }
    } else {
      // Fallback if no stored results
      setTimeout(() => {
        setResults({
          overallScore: 68,
          criticalIssues: 12,
          warnings: 29,
          compliant: 86,
          competitorAverage: 73,
          issues: [
            {
              id: '1',
              requirement: 'Absence de format de facture conforme EN 16931',
              status: 'critical',
              costBenefit: '€2,500 implémentation vs €15,000 amendes annuelles',
            },
            {
              id: '2',
              requirement: 'Aucune Plateforme d\'Agrément (PA) configurée',
              status: 'critical',
              costBenefit: '€500 setup + €1,000/trimestre vs €4,500 amendes annuelles',
            },
            {
              id: '3',
              requirement: 'Capacité de génération Factur-X PDF manquante',
              status: 'warning',
              costBenefit: '€1,200 intégration vs €3,000 risque annuel',
            },
            {
              id: '4',
              requirement: 'Format UBL 2.1 XML non supporté',
              status: 'warning',
              costBenefit: '€800 développement vs €2,000 risque annuel',
            },
          ],
        })
        setIsGenerating(false)
      }, 1000)
    }
  }, [])

  if (isGenerating || !results) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Génération de votre rapport d'audit...</p>
        </div>
      </div>
    )
  }

  const scoreColor =
    results.overallScore >= 80
      ? 'text-success-600'
      : results.overallScore >= 60
      ? 'text-warning-600'
      : 'text-danger-600'

  const statusColors = {
    critical: 'bg-danger-100 text-danger-700 dark:bg-danger-900/50 dark:text-danger-300',
    warning: 'bg-warning-100 text-warning-700 dark:bg-warning-900/50 dark:text-warning-300',
    compliant: 'bg-success-100 text-success-700 dark:bg-success-900/50 dark:text-success-300',
  }

  const statusLabels = {
    critical: 'Critique',
    warning: 'Avertissement',
    compliant: 'Conforme',
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
                  <p className="text-sm text-slate-500">Résultats de l'audit</p>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Overall Score */}
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-2">Score Global</p>
                  <div className="flex items-baseline gap-2">
                    <p className={`text-4xl font-bold ${scoreColor}`}>{results.overallScore}%</p>
                    <span className="text-sm font-medium text-danger-600">
                      -15% depuis dernier audit
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-24">
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
                        stroke={results.overallScore >= 60 ? '#f59e0b' : '#ef4444'}
                        strokeWidth="3"
                        strokeDasharray={`${results.overallScore}, 100`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold text-slate-900">
                        {results.criticalIssues}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-danger-500"></span>
                      <span className="font-medium text-slate-900">
                        {results.criticalIssues} Critiques
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-warning-500"></span>
                      <span className="font-medium text-slate-900">
                        {results.warnings} Avertissements
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-success-500"></span>
                      <span className="font-medium text-slate-900">
                        {results.compliant} Conformes
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Competitor Comparison */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Comparaison Secteur</h3>
              <div className="flex items-center gap-4 mb-4">
                <span className="material-symbols-outlined text-4xl text-primary-600">
                  shield_with_house
                </span>
                <div>
                  <p className="text-sm text-slate-600">Vos concurrents sont</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {results.competitorAverage}% conformes en moyenne
                  </p>
                </div>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5 mb-2">
                <div
                  className="bg-success-500 h-2.5 rounded-full"
                  style={{ width: `${results.competitorAverage}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-500">
                Votre score est {results.competitorAverage - results.overallScore}% en dessous de la
                moyenne du secteur.
              </p>
            </Card>

            {/* Priority Matrix */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Priorités d'Action</h3>
              <p className="text-xs text-slate-500 mb-4">
                Problèmes classés par urgence et impact business.
              </p>
              <div className="relative w-full aspect-square bg-slate-50 rounded-lg p-4 flex flex-col">
                <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-px bg-slate-200">
                  <div className="bg-white p-2 flex items-center justify-center text-center text-xs text-slate-500">
                    <span>
                      Impact Faible
                      <br />
                      Urgence Faible
                    </span>
                  </div>
                  <div className="bg-white p-2 flex items-center justify-center text-center text-xs text-slate-500">
                    <span>
                      Impact Élevé
                      <br />
                      Urgence Faible
                    </span>
                  </div>
                  <div className="bg-white p-2 flex items-center justify-center text-center text-xs text-slate-500">
                    <span>
                      Impact Faible
                      <br />
                      Urgence Élevée
                    </span>
                  </div>
                  <div className="bg-white p-2 flex items-center justify-center text-center text-xs text-slate-500">
                    <span>
                      Impact Élevé
                      <br />
                      Urgence Élevée
                    </span>
                  </div>
                </div>
                {/* Data points */}
                <div className="absolute w-3 h-3 rounded-full bg-danger-500" style={{ top: '15%', right: '15%' }}></div>
                <div className="absolute w-3 h-3 rounded-full bg-danger-500" style={{ top: '20%', right: '25%' }}></div>
                <div className="absolute w-3 h-3 rounded-full bg-warning-500" style={{ top: '30%', right: '60%' }}></div>
                <div className="absolute w-3 h-3 rounded-full bg-warning-500" style={{ bottom: '35%', left: '30%' }}></div>
              </div>
            </Card>
          </div>

          {/* Right Column: Detailed Breakdown */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900 mb-1">
                  Analyse Détaillée (127 Points)
                </h2>
                <p className="text-sm text-slate-500">
                  Analyse détaillée de chaque exigence de conformité.
                </p>
              </div>

              <div className="space-y-4">
                {results.issues.map((issue) => (
                  <div
                    key={issue.id}
                    className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg hover:bg-slate-50 border border-slate-200"
                  >
                    <div className="col-span-6">
                      <p className="font-medium text-sm text-slate-800">{issue.requirement}</p>
                    </div>
                    <div className="col-span-2 text-center">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium ${statusColors[issue.status]}`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {statusLabels[issue.status]}
                      </span>
                    </div>
                    <div className="col-span-3">
                      <p className="text-xs text-slate-600">{issue.costBenefit}</p>
                    </div>
                    <div className="col-span-1 text-right">
                      <button className="text-slate-400 hover:text-slate-600">
                        <span className="material-symbols-outlined text-lg">chevron_right</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Action Plan */}
            <Card className="p-6 border-2 border-primary-500 bg-primary-50/50">
              <h3 className="text-xl font-bold text-primary-700 mb-4">Plan d'Action Recommandé</h3>
              <div className="space-y-3">
                {[
                  'Configurer une Plateforme d\'Agrément (PA) dans les 30 jours',
                  'Migrer vers le format Factur-X pour toutes les factures B2B',
                  'Former l\'équipe aux nouvelles obligations réglementaires',
                ].map((action, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary-600 mt-0.5">
                      check_circle
                    </span>
                    <span className="text-slate-700">{action}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-primary-200">
                <Link href="/pricing">
                  <Button className="w-full" size="lg">
                    Découvrir nos solutions de conformité
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AuditResultsPage

