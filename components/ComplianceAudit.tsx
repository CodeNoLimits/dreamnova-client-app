
import React, { useState, useCallback } from 'react';
import Card from './common/Card';
import Loader from './common/Loader';
import MarkdownRenderer from './common/MarkdownRenderer';
import { generatePriorityActions } from '../services/geminiService';
// Fix: Replaced non-existent 'AuditFormData' with 'AuditData' as suggested by the error message.
import type { AuditData, RiskResult } from '../types';

const ComplianceAudit: React.FC = () => {
  // Fix: Using 'AuditData' type for the form state, which is now compatible due to changes in types.ts.
  const [formData, setFormData] = useState<AuditData>({
    suppliers: 10,
    invoices: 50,
    system: 'Excel et factures papier',
    industry: 'Restauration',
    size: '10-49 salariés',
  });
  const [result, setResult] = useState<RiskResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const calculateRisk = useCallback((data: AuditData): RiskResult => {
    let score = 0;
    score += Math.min(data.suppliers / 5, 20); // max 20 points
    score += Math.min(data.invoices / 20, 20); // max 20 points
    if (data.system.toLowerCase().includes('excel') || data.system.toLowerCase().includes('papier')) {
      score += 30;
    }
    if (data.industry === 'BTP' || data.industry === 'Commerce de détail') {
      score += 15;
    }
    score += 10; // base risk

    const riskPercentage = Math.min(Math.round(score), 100);
    const estimatedPenalty = Math.min(Math.round(data.invoices * 12 * 0.1 * 15), 15000); // 10% non-compliant invoices for estimation

    return {
      riskPercentage,
      estimatedPenalty,
      priorityActions: '', // will be filled by Gemini
    };
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    const calculatedResult = calculateRisk(formData);
    const actions = await generatePriorityActions(formData);
    
    setResult({ ...calculatedResult, priorityActions: actions });
    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'suppliers' || name === 'invoices' ? Number(value) : value }));
  };

  return (
    <Card title="Audit de Conformité Gratuit" icon="🔍" className="w-full">
      <p className="mb-4">Réponds à ces quelques questions pour calculer ton score de risque et obtenir tes actions prioritaires immédiates.</p>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label htmlFor="suppliers" className="block text-sm font-medium text-gray-700">Nombre de fournisseurs</label>
                <input type="number" name="suppliers" id="suppliers" value={formData.suppliers} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" />
            </div>
            <div>
                <label htmlFor="invoices" className="block text-sm font-medium text-gray-700">Volume de factures / mois</label>
                <input type="number" name="invoices" id="invoices" value={formData.invoices} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" />
            </div>
            <div>
                <label htmlFor="system" className="block text-sm font-medium text-gray-700">Système actuel</label>
                <input type="text" name="system" id="system" value={formData.system} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" />
            </div>
            <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Secteur d'activité</label>
                <select name="industry" id="industry" value={formData.industry} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2">
                    <option>Restauration</option>
                    <option>BTP</option>
                    <option>Commerce de détail</option>
                    <option>Services</option>
                    <option>Autre</option>
                </select>
            </div>
             <div className="col-span-1 md:col-span-2">
                <label htmlFor="size" className="block text-sm font-medium text-gray-700">Taille de l'entreprise</label>
                <select name="size" id="size" value={formData.size} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2">
                    <option>1-9 salariés</option>
                    <option>10-49 salariés</option>
                    <option>50-249 salariés</option>
                </select>
            </div>
        </div>
        <button type="submit" disabled={isLoading} className="mt-6 w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400">
            {isLoading ? 'Calcul en cours...' : '📊 Lancer mon Audit'}
        </button>
      </form>
      {isLoading && <Loader />}
      {result && !isLoading && (
        <div className="mt-6 p-4 border-l-4 rounded-r-lg bg-indigo-50" style={{borderColor: result.riskPercentage > 70 ? '#ef4444' : result.riskPercentage > 40 ? '#f97316' : '#22c55e'}}>
            <h4 className="text-lg font-bold">Résultats de ton Audit :</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="text-center p-4 bg-white rounded-lg shadow">
                    <div className="text-4xl font-bold" style={{color: result.riskPercentage > 70 ? '#ef4444' : result.riskPercentage > 40 ? '#f97316' : '#22c55e'}}>{result.riskPercentage}%</div>
                    <div className="text-sm text-gray-600">Score de Risque</div>
                </div>
                 <div className="text-center p-4 bg-white rounded-lg shadow">
                    <div className="text-4xl font-bold text-red-600">{result.estimatedPenalty.toLocaleString('fr-FR')} €</div>
                    <div className="text-sm text-gray-600">Amende Annuelle Potentielle</div>
                </div>
            </div>
            <div className="mt-4 p-4 bg-white rounded-lg shadow">
                <h5 className="font-bold text-gray-800">✅ Tes actions prioritaires :</h5>
                <div className="mt-2 text-gray-700">
                  <MarkdownRenderer content={result.priorityActions} />
                </div>
            </div>
        </div>
      )}
    </Card>
  );
};

export default ComplianceAudit;