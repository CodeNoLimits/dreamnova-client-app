'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import type { OnboardingData } from '@/types'
import { getAIAdapter } from '@/adapters/ai'

interface OnboardingFlowProps {
  onBack: () => void
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onBack }) => {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<OnboardingData>({
    companyName: '',
    email: '',
    employees: '10-50',
    suppliersRange: '10-50',
    invoicingMethod: 'manual',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: keyof OnboardingData, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    // Calculate risk
    const suppliers = { '0-10': 5, '10-50': 30, '50+': 100 }[formData.suppliersRange]
    const invoices = suppliers * 5
    const system = {
      'software': 'Logiciel de comptabilité',
      'platform': 'Plateforme externe',
      'manual': 'Factures manuelles',
      'other': 'Autre / Ne sait pas'
    }[formData.invoicingMethod]

    const auditData = {
      suppliers,
      invoices,
      system,
      size: formData.employees,
      companyName: formData.companyName,
      email: formData.email,
    }

    try {
      // Generate priority actions with AI
      const aiAdapter = getAIAdapter('gemini')
      const actions = await aiAdapter.generatePriorityActions(auditData)

      // Calculate penalties
      const monthlyInvoices = invoices
      const annualPenalties = Math.min(monthlyInvoices * 12 * 15, 15000)
      const hasPA = formData.invoicingMethod === 'platform'
      const paPenalties = hasPA ? 0 : 500 + (1000 * 4)
      const totalPenalties = annualPenalties + paPenalties

      // Calculate compliance score (0-100)
      let score = 100
      if (formData.invoicingMethod === 'manual') score -= 40
      if (formData.invoicingMethod === 'other') score -= 30
      if (formData.employees === '0-10') score -= 10
      if (formData.suppliersRange === '50+') score -= 20

      // Calculer le niveau de risque basé sur le score
      const niveauRisque = score >= 80 ? 'FAIBLE' : score >= 60 ? 'MODÉRÉ' : score >= 40 ? 'ÉLEVÉ' : 'CRITIQUE'

      // Transformer les données au format attendu par audit-results
      const formattedResults = {
        company: {
          nom_entreprise: formData.companyName,
          secteur_activite: 'Non spécifié',
          taille_entreprise: formData.employees,
          nombre_employes: { '0-10': 5, '10-50': 30, '50+': 100 }[formData.employees] || 30,
          ca_annuel: 0,
          volume_factures_b2b: invoices,
          volume_factures_b2c: 0,
          logiciel_actuel: system,
          format_actuel: 'PDF',
        },
        audit: {
          score_conformite: Math.max(0, Math.min(100, score)),
          niveau_risque: niveauRisque as 'CRITIQUE' | 'ÉLEVÉ' | 'MODÉRÉ' | 'FAIBLE',
          amendes_potentielles: {
            mensuelle: totalPenalties / 12,
            annuelle: totalPenalties,
            pa_manquante: paPenalties,
          },
          plan_migration: {
            duree_estimee: '3-6 mois',
            cout_total: 8000,
            etapes: actions || ['Analyse des besoins', 'Intégration PDP', 'Formation équipe', 'Mise en production'],
          },
          points_critiques: [
            formData.invoicingMethod === 'manual' ? 'Facturation manuelle non conforme' : '',
            !hasPA ? 'Plateforme d\'archivage (PA) manquante' : '',
            formData.invoicingMethod === 'other' ? 'Solution actuelle non identifiée' : '',
          ].filter(Boolean),
          recommandations: actions || ['Mettre en place une solution de facturation électronique', 'Choisir un PDP conforme', 'Former les équipes'],
        },
        roi: {
          economies_amendes: {
            annuelle: totalPenalties,
            trois_ans: totalPenalties * 3,
          },
          gains_productivite: {
            annuel: invoices * 12 * 2, // Estimation: 2€ par facture économisés
            trois_ans: invoices * 12 * 2 * 3,
          },
          roi: {
            mensuel: 0,
            annuel: ((totalPenalties + invoices * 12 * 2) / 8000) * 100,
            trois_ans: ((totalPenalties * 3 + invoices * 12 * 2 * 3) / 8000) * 100,
          },
          breakeven_mois: Math.ceil(8000 / ((totalPenalties + invoices * 12 * 2) / 12)),
        },
        pdp: {
          provider: 'Pennylane',
          score_match: 85,
          raisons: ['Intégration facile', 'Prix compétitif', 'Support français'],
          prix_mensuel: 49,
          delai_integration: '2-4 semaines',
          fonctionnalites_cles: ['Facturation électronique', 'Archivage conforme', 'Export comptable'],
        },
      }

      // Store results in sessionStorage for results page
      sessionStorage.setItem('auditResults', JSON.stringify(formattedResults))

      // Navigate to results page
      router.push('/audit-results')
    } catch (error) {
      console.error('Failed to complete audit:', error)
      
      // Fallback avec format correct même en cas d'erreur
      const score = Math.max(0, Math.min(100, 
        100 - (formData.invoicingMethod === 'manual' ? 40 : formData.invoicingMethod === 'other' ? 30 : 0)
        - (formData.employees === '0-10' ? 10 : 0)
        - (formData.suppliersRange === '50+' ? 20 : 0)
      ))
      const niveauRisque = score >= 80 ? 'FAIBLE' : score >= 60 ? 'MODÉRÉ' : score >= 40 ? 'ÉLEVÉ' : 'CRITIQUE'
      const annualPenalties = Math.min(invoices * 12 * 15, 15000)
      const paPenalties = formData.invoicingMethod === 'platform' ? 0 : 500 + (1000 * 4)
      const totalPenalties = annualPenalties + paPenalties
      
      const fallbackResults = {
        company: {
          nom_entreprise: formData.companyName,
          secteur_activite: 'Non spécifié',
          taille_entreprise: formData.employees,
          nombre_employes: { '0-10': 5, '10-50': 30, '50+': 100 }[formData.employees] || 30,
          ca_annuel: 0,
          volume_factures_b2b: invoices,
          volume_factures_b2c: 0,
          logiciel_actuel: system,
          format_actuel: 'PDF',
        },
        audit: {
          score_conformite: score,
          niveau_risque: niveauRisque as 'CRITIQUE' | 'ÉLEVÉ' | 'MODÉRÉ' | 'FAIBLE',
          amendes_potentielles: {
            mensuelle: totalPenalties / 12,
            annuelle: totalPenalties,
            pa_manquante: paPenalties,
          },
          plan_migration: {
            duree_estimee: '3-6 mois',
            cout_total: 8000,
            etapes: ['Analyse des besoins', 'Intégration PDP', 'Formation équipe', 'Mise en production'],
          },
          points_critiques: [
            formData.invoicingMethod === 'manual' ? 'Facturation manuelle non conforme' : '',
            formData.invoicingMethod !== 'platform' ? 'Plateforme d\'archivage (PA) manquante' : '',
          ].filter(Boolean),
          recommandations: ['Mettre en place une solution de facturation électronique', 'Choisir un PDP conforme', 'Former les équipes'],
        },
        roi: {
          economies_amendes: {
            annuelle: totalPenalties,
            trois_ans: totalPenalties * 3,
          },
          gains_productivite: {
            annuel: invoices * 12 * 2,
            trois_ans: invoices * 12 * 2 * 3,
          },
          roi: {
            mensuel: 0,
            annuel: ((totalPenalties + invoices * 12 * 2) / 8000) * 100,
            trois_ans: ((totalPenalties * 3 + invoices * 12 * 2 * 3) / 8000) * 100,
          },
          breakeven_mois: Math.ceil(8000 / ((totalPenalties + invoices * 12 * 2) / 12)),
        },
        pdp: {
          provider: 'Pennylane',
          score_match: 85,
          raisons: ['Intégration facile', 'Prix compétitif', 'Support français'],
          prix_mensuel: 49,
          delai_integration: '2-4 semaines',
          fonctionnalites_cles: ['Facturation électronique', 'Archivage conforme', 'Export comptable'],
        },
      }
      
      // Still navigate to results with fallback data
      sessionStorage.setItem('auditResults', JSON.stringify(fallbackResults))
      router.push('/audit-results')
    } finally {
      setIsLoading(false)
    }
  }

  const isStep1Valid = formData.companyName.trim() !== '' && formData.email.trim() !== ''
  const isStep2Valid = true
  const isStep3Valid = true

  const canProceed = () => {
    switch (step) {
      case 1:
        return isStep1Valid
      case 2:
        return isStep2Valid
      case 3:
        return isStep3Valid
      default:
        return false
    }
  }

  return (
    <div className="flex h-screen flex-col bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-lg px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="text-center">
            <h1 className="text-lg font-bold text-slate-800">Audit de conformité</h1>
            <p className="text-sm text-slate-500">Étape {step} sur 3</p>
          </div>
          <div className="w-10" />
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-600 to-primary-400"
            initial={{ width: '33%' }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  Parlez-nous de votre entreprise
                </h2>
                <p className="text-slate-600">
                  Ces informations nous permettront de personnaliser votre audit.
                </p>
              </div>

              <Input
                label="Nom de l'entreprise"
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Ex: Ma Super Entreprise SAS"
                required
              />

              <Input
                label="Email professionnel"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="vous@entreprise.fr"
                helperText="Nous vous enverrons votre rapport d'audit détaillé"
                required
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  Votre structure actuelle
                </h2>
                <p className="text-slate-600">
                  Comprenons mieux votre organisation.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Nombre de salariés
                </label>
                <SegmentedControl
                  name="employees"
                  value={formData.employees}
                  onChange={(v) => handleSelectChange('employees', v)}
                  options={[
                    { value: '0-10', label: 'Moins de 10' },
                    { value: '10-50', label: '10-50' },
                    { value: '50+', label: '50+' },
                  ]}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Nombre de fournisseurs
                </label>
                <SegmentedControl
                  name="suppliersRange"
                  value={formData.suppliersRange}
                  onChange={(v) => handleSelectChange('suppliersRange', v)}
                  options={[
                    { value: '0-10', label: 'Moins de 10' },
                    { value: '10-50', label: '10-50' },
                    { value: '50+', label: '50+' },
                  ]}
                />
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  Votre système de facturation
                </h2>
                <p className="text-slate-600">
                  Comment gérez-vous vos factures aujourd'hui ?
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Méthode de facturation actuelle
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { value: 'software', label: 'Logiciel de comptabilité' },
                    { value: 'platform', label: 'Plateforme externe' },
                    { value: 'manual', label: 'Factures manuelles (Word/Excel)' },
                    { value: 'other', label: 'Autre / Je ne sais pas' },
                  ].map((option) => {
                    const isSelected = formData.invoicingMethod === option.value

                    return (
                      <label
                        key={option.value}
                        className={`cursor-pointer rounded-xl border p-4 transition-all duration-200 ${
                          isSelected
                            ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-500 shadow-md'
                            : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="invoicingMethod"
                          value={option.value}
                          checked={isSelected}
                          onChange={() => handleSelectChange('invoicingMethod', option.value as any)}
                          className="sr-only"
                        />
                        <span className={`font-semibold ${isSelected ? 'text-primary-700' : 'text-slate-700'}`}>
                          {option.label}
                        </span>
                      </label>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <Button
            onClick={handleNext}
            disabled={!canProceed() || isLoading}
            isLoading={isLoading}
            className="w-full"
            size="lg"
          >
            {step === 3 ? 'Obtenir mon audit' : 'Continuer'}
          </Button>
        </div>
      </footer>
    </div>
  )
}

export default OnboardingFlow
