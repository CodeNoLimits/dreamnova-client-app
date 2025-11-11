
import React, { useState } from 'react';
import Card from './common/Card';
import Loader from './common/Loader';
import MarkdownRenderer from './common/MarkdownRenderer';
import { generateActionPlan } from '../services/geminiService';

const ActionPlanGenerator: React.FC = () => {
  const [companyInfo, setCompanyInfo] = useState('');
  const [plan, setPlan] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setPlan('');
    const result = await generateActionPlan(companyInfo);
    setPlan(result);
    setIsLoading(false);
  };

  return (
    <Card title="Générateur de Plan d'Action" icon="🗺️" className="w-full">
      <p className="mb-4">Décris-moi ton entreprise en une phrase et je te crée une feuille de route sur-mesure pour être prêt en 2026.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="companyInfo" className="block text-sm font-medium text-gray-700">Description de ton entreprise</label>
          <input
            type="text"
            name="companyInfo"
            id="companyInfo"
            value={companyInfo}
            onChange={(e) => setCompanyInfo(e.target.value)}
            placeholder="Ex: Restaurant de 20 salariés à Lyon, utilisant Excel"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
          />
        </div>
        <button type="submit" disabled={isLoading} className="mt-4 w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400">
          {isLoading ? 'Génération du plan...' : '🚀 Créer mon Plan Personnalisé'}
        </button>
      </form>
      {isLoading && <Loader />}
      {plan && !isLoading && (
        <div className="mt-6 p-4 border-l-4 border-indigo-500 rounded-r-lg bg-indigo-50">
          <h4 className="text-lg font-bold">Ta Feuille de Route Personnalisée :</h4>
          <div className="mt-2 text-gray-700">
            <MarkdownRenderer content={plan} />
          </div>
        </div>
      )}
    </Card>
  );
};

export default ActionPlanGenerator;
