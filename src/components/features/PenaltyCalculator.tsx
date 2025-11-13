'use client'

import React, { useState } from 'react'
import Card from '@/components/ui/Card'

interface PenaltyCalculatorProps {
  onCalculate?: (result: PenaltyResult) => void
}

export interface PenaltyResult {
  monthlyInvoices: number
  annualPenalties: number
  monthlyPenalties: number
  threeYearPenalties: number
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL'
}

const PenaltyCalculator: React.FC<PenaltyCalculatorProps> = ({ onCalculate }) => {
  const [monthlyInvoices, setMonthlyInvoices] = useState<number>(500)
  const [hasPAPlatform, setHasPAPlatform] = useState<boolean>(false)

  // ✅ CALCUL DIRECT INLINE - Garantit le re-render à chaque changement
  const baseAnnualPenalties = Math.min(monthlyInvoices * 12 * 15, 15000)
  const paPenalties = hasPAPlatform ? 0 : 500 + (1000 * 4)
  const annualPenalties = baseAnnualPenalties + paPenalties
  const monthlyPenalties = Math.round(annualPenalties / 12)
  const threeYearPenalties = annualPenalties * 3

  // Déterminer le niveau de risque
  let riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL' = 'LOW'
  if (annualPenalties >= 10000) riskLevel = 'CRITICAL'
  else if (annualPenalties >= 5000) riskLevel = 'HIGH'
  else if (annualPenalties >= 2000) riskLevel = 'MODERATE'

  const result: PenaltyResult = {
    monthlyInvoices,
    annualPenalties,
    monthlyPenalties,
    threeYearPenalties,
    riskLevel,
  }

  // Callback pour parent component
  React.useEffect(() => {
    if (onCalculate) {
      onCalculate(result)
    }
  }, [annualPenalties, monthlyPenalties, threeYearPenalties, riskLevel, onCalculate])

  const riskColors = {
    LOW: 'bg-success-500 text-white',
    MODERATE: 'bg-warning-500 text-white',
    HIGH: 'bg-orange-500 text-white',
    CRITICAL: 'bg-danger-500 text-white',
  }

  const riskLabels = {
    LOW: 'Faible',
    MODERATE: 'Modéré',
    HIGH: 'Élevé',
    CRITICAL: 'Critique',
  }

  return (
    <Card className="p-8 bg-white border border-slate-200 shadow-lg">
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">
            Calculez vos amendes potentielles
          </h3>
          <p className="text-slate-600">
            Estimation basée sur le nombre de factures B2B que vous émettez par mois
          </p>
        </div>

        {/* Input */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Nombre de factures B2B par mois
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                max="10000"
                value={monthlyInvoices}
                onChange={(e) => setMonthlyInvoices(Number(e.target.value) || 0)}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg text-lg font-semibold text-slate-900 bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
                factures/mois
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="2000"
              step="1"
              value={monthlyInvoices}
              onChange={(e) => setMonthlyInvoices(Number(e.target.value))}
              className="w-full mt-4 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary-600 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <input
              type="checkbox"
              id="hasPA"
              checked={hasPAPlatform}
              onChange={(e) => setHasPAPlatform(e.target.checked)}
              className="w-5 h-5 text-primary-600 rounded border-slate-300 focus:ring-primary-500"
            />
            <label htmlFor="hasPA" className="text-sm text-slate-700 cursor-pointer">
              J'ai déjà une Plateforme d'Agrément (PA) configurée
            </label>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl border-2 border-primary-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-primary-800">Risque annuel</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${riskColors[result.riskLevel]}`}>
                {riskLabels[result.riskLevel]}
              </span>
            </div>
            <div className="text-4xl font-bold text-primary-700 mb-2">
              {result.annualPenalties.toLocaleString('fr-FR')}€
            </div>
            <p className="text-sm text-primary-700">
              Amendes potentielles par an si vous n'êtes pas conforme
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-sm text-slate-600 mb-1">Par mois</div>
              <div className="text-2xl font-bold text-slate-900">
                {result.monthlyPenalties.toLocaleString('fr-FR', { maximumFractionDigits: 0 })}€
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-sm text-slate-600 mb-1">Sur 3 ans</div>
              <div className="text-2xl font-bold text-slate-900">
                {result.threeYearPenalties.toLocaleString('fr-FR')}€
              </div>
            </div>
          </div>

          {result.annualPenalties > 0 && (
            <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
              <p className="text-sm text-primary-800">
                <strong>💡 ROI potentiel:</strong> Notre offre URGENCE à 8,000€ vous fait économiser{' '}
                <strong>{result.annualPenalties.toLocaleString('fr-FR')}€/an</strong> en amendes.
                Retour sur investissement en{' '}
                <strong>
                  {result.annualPenalties / 12 > 0
                    ? Math.ceil(8000 / (result.annualPenalties / 12))
                    : 'N/A'}{' '}
                  mois
                </strong>
                .
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

export default PenaltyCalculator
