import React, { useState, useMemo } from 'react';
import { Header } from './ui';

interface RiskCalculatorProps {
  onBack: () => void;
}

const RiskCalculator: React.FC<RiskCalculatorProps> = ({ onBack }) => {
  const [invoicesPerMonth, setInvoicesPerMonth] = useState(100);
  const [nonComplianceRate, setNonComplianceRate] = useState(10);

  const potentialPenalty = useMemo(() => {
    const nonCompliantInvoices = (invoicesPerMonth * 12 * (nonComplianceRate / 100));
    return Math.min(nonCompliantInvoices * 15, 15000);
  }, [invoicesPerMonth, nonComplianceRate]);

  return (
    <div className="flex h-full flex-col">
      <Header title="Calculateur de Risque" onBack={onBack} />
      <main className="flex-1 overflow-y-auto p-6 text-center">
        <h2 className="text-xl font-bold text-slate-800">Calculez vos pénalités potentielles</h2>
        <p className="mt-2 text-slate-500">Entrez votre nombre moyen de factures par mois pour voir le coût du risque.</p>

        <div className="mt-8">
          <label htmlFor="invoices" className="font-semibold text-slate-700">Nombre moyen de factures / mois</label>
          <p className="text-3xl font-bold text-violet-600">{invoicesPerMonth}</p>
          <input type="range" id="invoices" min="10" max="1000" step="10" value={invoicesPerMonth} onChange={(e) => setInvoicesPerMonth(Number(e.target.value))} className="w-full mt-2 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-violet-600"/>
        </div>

        <div className="mt-8">
          <label htmlFor="compliance" className="font-semibold text-slate-700">% de factures non conformes (estimé)</label>
           <p className="text-3xl font-bold text-violet-600">{nonComplianceRate}%</p>
          <input type="range" id="compliance" min="1" max="100" step="1" value={nonComplianceRate} onChange={(e) => setNonComplianceRate(Number(e.target.value))} className="w-full mt-2 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-violet-600" />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4">
            <div className="rounded-xl bg-red-50 p-6">
                <p className="font-semibold text-red-700">Sans DreamNova</p>
                <p className="text-sm text-red-600">Pénalités potentielles / an</p>
                <p className="text-5xl font-extrabold text-red-600 mt-2">
                    {potentialPenalty.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 })}
                </p>
            </div>
            <div className="rounded-xl bg-green-50 p-6">
                <p className="font-semibold text-green-700">Avec DreamNova</p>
                 <p className="text-sm text-green-600">0€ de pénalités</p>
                <p className="text-5xl font-extrabold text-green-600 mt-2">Économies réalisées</p>
            </div>
        </div>

      </main>
      <footer className="border-t border-slate-200 p-4">
        <button onClick={onBack} className="w-full rounded-xl bg-violet-600 p-4 text-lg font-bold text-white shadow-lg shadow-violet-500/30 transition-all hover:bg-violet-700">
            Sécuriser ma conformité
        </button>
      </footer>
    </div>
  );
};

export default RiskCalculator;
