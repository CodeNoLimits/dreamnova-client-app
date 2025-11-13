'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { auditAgent, roiAgent, pdpAgent } from '@/adapters/ai/agents'
import type { CompanyData } from '@/adapters/ai/agents'
import { createClient } from '@/lib/supabase/client'

interface AuditWizardProps {
  onBack: () => void
}

export default function AuditWizardComplete({ onBack }: AuditWizardProps) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  // Données formulaire
  const [formData, setFormData] = useState<Partial<CompanyData>>({
    nom: '',
    effectif: 75,
    secteur: '',
    ca_annuel: 5000000,
    volume_b2b_mensuel: 500,
    volume_b2c_mensuel: 0,
    solution_actuelle: '',
    format_actuel: 'pdf'
  })

  const handleChange = (field: keyof CompanyData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      onBack()
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      const companyData = formData as CompanyData

      // AGENT 1: Audit de conformité
      const auditResult = await auditAgent.auditEntreprise(companyData)

      // AGENT 2: Calcul ROI
      const investissement = auditResult.migration.coût_estimé === '8,000€' ? 8000 :
                            auditResult.migration.coût_estimé === '15,000€' ? 15000 : 25000

      const roiResult = await roiAgent.calculerROI(
        investissement,
        companyData.volume_b2b_mensuel,
        companyData.effectif,
        companyData.ca_annuel
      )

      // AGENT 3: Recommandation PDP
      const pdpResult = await pdpAgent.recommanderPDP(companyData)

      // Sauvegarder dans sessionStorage pour la page de résultats
      const completeResults = {
        company: companyData,
        audit: auditResult,
        roi: roiResult,
        pdp: pdpResult,
        timestamp: new Date().toISOString()
      }

      sessionStorage.setItem('auditResults', JSON.stringify(completeResults))

      // ✅ Sauvegarder dans Supabase si authentifié
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (user) {
          // Mapper les données vers la structure de la table audits
          const auditData = {
            user_id: user.id,
            company_name: companyData.nom,

            // Données entreprise (TEXT dans Supabase)
            employees: String(companyData.effectif), // Convertir en string
            sector: companyData.secteur,
            ca_annuel: String(companyData.ca_annuel), // Convertir en string

            // Données facturation
            volume_b2b_mensuel: companyData.volume_b2b_mensuel,
            volume_b2c_mensuel: companyData.volume_b2c_mensuel || null,
            solution_actuelle: companyData.solution_actuelle || null,
            format_actuel: companyData.format_actuel || null,

            // Résultats audit
            score_conformite: auditResult.score_conformite,
            niveau_risque: auditResult.niveau_risque,
            amendes_annuelles: auditResult.amendes_potentielles.annuel,
            amendes_mensuelles: auditResult.amendes_potentielles.mensuel,
            amendes_3_ans: auditResult.amendes_potentielles.sur_3_ans,

            // Recommandations
            pdp_recommandé: pdpResult.provider || null,
            duree_migration_estimee: auditResult.migration.durée_estimée || null,
            cout_estime: auditResult.migration.coût_estimé || null
          }

          const { error } = await supabase.from('audits').insert(auditData)

          if (error) {
            console.error('Erreur sauvegarde Supabase:', error)
            // On continue même si la sauvegarde échoue (l'audit est dans sessionStorage)
          } else {
            console.log('✅ Audit sauvegardé dans Supabase')
          }
        } else {
          console.log('ℹ️ Utilisateur non authentifié - audit sauvegardé en sessionStorage uniquement')
        }
      } catch (supabaseError) {
        console.error('Erreur lors de la sauvegarde Supabase:', supabaseError)
        // On continue même si la sauvegarde échoue
      }

      // Naviguer vers les résultats
      router.push('/audit-results')
    } catch (error) {
      console.error('Erreur audit:', error)

      // Fallback avec données basiques
      sessionStorage.setItem('auditResults', JSON.stringify({
        company: formData,
        audit: {
          score_conformite: 65,
          niveau_risque: 'MODÉRÉ',
          amendes_potentielles: {
            mensuel: 625,
            annuel: 7500,
            sur_3_ans: 22500
          }
        },
        error: 'Impossible de contacter les agents IA. Résultats approximatifs.'
      }))

      router.push('/audit-results')
    } finally {
      setIsLoading(false)
    }
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.nom && formData.secteur && formData.effectif && formData.ca_annuel
      case 2:
        return formData.volume_b2b_mensuel !== undefined && formData.solution_actuelle
      case 3:
        return formData.format_actuel
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
      {/* Header avec progress bar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">Retour</span>
            </button>

            <div className="text-center">
              <h1 className="text-xl font-bold text-slate-900">Audit de Conformité 2026</h1>
              <p className="text-sm text-slate-500">Étape {step} sur 3</p>
            </div>

            <div className="w-20" />
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 to-green-600"
              initial={{ width: '33%' }}
              animate={{ width: `${(step / 3) * 100}%` }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </header>

      {/* Main content avec AnimatePresence pour transitions fluides */}
      <main className="flex-1 overflow-y-auto py-12">
        <div className="container mx-auto px-6 max-w-3xl">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-3">
                    👋 Parlez-nous de votre entreprise
                  </h2>
                  <p className="text-lg text-slate-600">
                    Ces informations nous permettent de calculer précisément vos risques
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Nom entreprise */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Nom de l'entreprise *
                    </label>
                    <input
                      type="text"
                      value={formData.nom}
                      onChange={(e) => handleChange('nom', e.target.value)}
                      placeholder="Ex: Ma Super Entreprise SAS"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-lg"
                    />
                  </div>

                  {/* Secteur */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Secteur d'activité *
                    </label>
                    <select
                      value={formData.secteur}
                      onChange={(e) => handleChange('secteur', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-lg"
                    >
                      <option value="">Choisissez un secteur</option>
                      <option value="Commerce">Commerce</option>
                      <option value="Services">Services</option>
                      <option value="Industrie">Industrie</option>
                      <option value="BTP">BTP</option>
                      <option value="Tech">Tech / Digital</option>
                      <option value="Restauration">Restauration</option>
                      <option value="Santé">Santé</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>

                  {/* Effectif */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Nombre d'employés *
                    </label>
                    <input
                      type="number"
                      value={formData.effectif}
                      onChange={(e) => handleChange('effectif', Number(e.target.value))}
                      min="1"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-lg"
                    />
                  </div>

                  {/* CA annuel */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Chiffre d'affaires annuel (€) *
                    </label>
                    <input
                      type="number"
                      value={formData.ca_annuel}
                      onChange={(e) => handleChange('ca_annuel', Number(e.target.value))}
                      min="0"
                      step="100000"
                      placeholder="Ex: 5000000"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-lg"
                    />
                    <p className="text-sm text-slate-500 mt-2">
                      Valeur actuelle: {formData.ca_annuel?.toLocaleString('fr-FR')}€
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-3">
                    📊 Votre facturation actuelle
                  </h2>
                  <p className="text-lg text-slate-600">
                    Comprenons votre volume et vos outils actuels
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Volume B2B */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Factures B2B par mois *
                    </label>
                    <input
                      type="number"
                      value={formData.volume_b2b_mensuel}
                      onChange={(e) => handleChange('volume_b2b_mensuel', Number(e.target.value))}
                      min="0"
                      placeholder="Ex: 500"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-lg"
                    />
                    <p className="text-sm text-slate-500 mt-2">
                      💡 Les factures B2B sont concernées par l'obligation 2026
                    </p>
                  </div>

                  {/* Volume B2C */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Factures B2C par mois (optionnel)
                    </label>
                    <input
                      type="number"
                      value={formData.volume_b2c_mensuel}
                      onChange={(e) => handleChange('volume_b2c_mensuel', Number(e.target.value))}
                      min="0"
                      placeholder="Ex: 200"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-lg"
                    />
                  </div>

                  {/* Solution actuelle */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Solution comptable actuelle *
                    </label>
                    <select
                      value={formData.solution_actuelle}
                      onChange={(e) => handleChange('solution_actuelle', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-lg"
                    >
                      <option value="">Sélectionnez votre solution</option>
                      <option value="Excel">Excel / Word</option>
                      <option value="Sage">Sage</option>
                      <option value="Cegid">Cegid</option>
                      <option value="Pennylane">Pennylane</option>
                      <option value="Tiime">Tiime</option>
                      <option value="Qonto">Qonto</option>
                      <option value="QuickBooks">QuickBooks</option>
                      <option value="Autre">Autre / Ne sais pas</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-3">
                    ⚙️ Format de vos factures
                  </h2>
                  <p className="text-lg text-slate-600">
                    Quel format utilisez-vous actuellement ?
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { value: 'papier', label: '📄 Papier', desc: 'Factures imprimées et envoyées par courrier' },
                    { value: 'pdf', label: '📧 PDF simple', desc: 'PDF envoyé par email (non conforme 2026)' },
                    { value: 'xml', label: '💻 XML / EDI', desc: 'Format structuré électronique' },
                    { value: 'edi', label: '🔗 EDI complet', desc: 'Échange de données informatisé' }
                  ].map((format) => {
                    const isSelected = formData.format_actuel === format.value
                    return (
                      <label
                        key={format.value}
                        className={`block cursor-pointer rounded-2xl border-2 p-6 transition-all ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                            : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                        }`}
                      >
                        <input
                          type="radio"
                          name="format"
                          value={format.value}
                          checked={isSelected}
                          onChange={() => handleChange('format_actuel', format.value as any)}
                          className="sr-only"
                        />
                        <div className="flex items-start gap-4">
                          <div className="text-3xl">{format.label.split(' ')[0]}</div>
                          <div className="flex-1">
                            <div className={`font-bold text-lg mb-1 ${isSelected ? 'text-blue-700' : 'text-slate-900'}`}>
                              {format.label.split(' ').slice(1).join(' ')}
                            </div>
                            <div className="text-sm text-slate-600">{format.desc}</div>
                          </div>
                          {isSelected && (
                            <div className="text-blue-600">
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </label>
                    )
                  })}
                </div>

                <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">⚠️</div>
                    <div>
                      <div className="font-bold text-amber-900 mb-1">Obligation septembre 2026</div>
                      <div className="text-sm text-amber-800">
                        Tous les formats non-conformes (papier, PDF simple) seront sanctionnés à 15€/facture.
                        Notre audit vous dira exactement comment vous mettre en conformité.
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer avec CTA */}
      <footer className="sticky bottom-0 bg-white border-t border-slate-200 py-6">
        <div className="container mx-auto px-6 max-w-3xl">
          <button
            onClick={handleNext}
            disabled={!canProceed() || isLoading}
            className={`w-full py-4 px-8 rounded-xl font-bold text-lg transition-all ${
              !canProceed() || isLoading
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-green-600 text-white hover:scale-105 hover:shadow-xl'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Analyse en cours...
              </span>
            ) : step === 3 ? (
              '🎯 Obtenir mon audit gratuit →'
            ) : (
              `Continuer (${step}/3) →`
            )}
          </button>

          {step < 3 && (
            <p className="text-center text-sm text-slate-500 mt-3">
              Encore {3 - step} étape{3 - step > 1 ? 's' : ''} • 100% gratuit • Sans engagement
            </p>
          )}
        </div>
      </footer>
    </div>
  )
}
