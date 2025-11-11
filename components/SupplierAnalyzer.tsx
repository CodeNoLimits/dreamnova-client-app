import React, { useState } from 'react';
import { MOCK_SUPPLIERS } from '../constants';
import type { Supplier } from '../types';
import { Header, Loader, MarkdownRenderer } from './ui';
import { analyzeSuppliers } from '../services/geminiService';

interface SupplierAnalyzerProps {
  onBack: () => void;
}

const getRiskClasses = (risk: Supplier['risk']) => {
  switch (risk) {
    case 'Élevé': return 'bg-red-100 text-red-700';
    case 'Moyen': return 'bg-orange-100 text-orange-700';
    case 'Faible': return 'bg-green-100 text-green-700';
  }
};

const SupplierAnalyzer: React.FC<SupplierAnalyzerProps> = ({ onBack }) => {
  const [search, setSearch] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState('');

  const filteredSuppliers = MOCK_SUPPLIERS.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase())
  );
  
  const handleAnalyze = async () => {
      if(filteredSuppliers.length === 0) return;
      setIsAnalyzing(true);
      setAnalysisResult('');
      const supplierNames = filteredSuppliers.map(s => s.name).join(', ');
      const result = await analyzeSuppliers(supplierNames);
      setAnalysisResult(result);
      setIsAnalyzing(false);
  }

  return (
    <div className="flex h-full flex-col">
      <Header title="Analyse des Fournisseurs" onBack={onBack} />
      <main className="flex-1 overflow-y-auto p-4">
        <input type="search" placeholder="Rechercher un fournisseur..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-lg border-slate-200 bg-slate-100 p-3 text-slate-800 focus:border-violet-500 focus:ring-violet-500" />
        
        <ul className="mt-4 space-y-3">
          {filteredSuppliers.map(supplier => (
            <li key={supplier.id} className="flex items-center justify-between rounded-lg bg-white p-3 shadow-sm">
              <div>
                <p className="font-bold text-slate-800">{supplier.name}</p>
                <p className="text-sm text-slate-500">{supplier.volume}</p>
              </div>
              <div className={`rounded-full px-3 py-1 text-xs font-bold ${getRiskClasses(supplier.risk)}`}>
                Risque : {supplier.risk}
              </div>
            </li>
          ))}
        </ul>

        {analysisResult && (
            <div className="mt-6 rounded-lg bg-white p-4 shadow-sm">
                <h3 className="font-bold text-slate-800">Analyse de David :</h3>
                <MarkdownRenderer content={analysisResult} />
            </div>
        )}
      </main>
      <footer className="border-t border-slate-200 p-4">
        <button onClick={handleAnalyze} disabled={isAnalyzing} className="w-full rounded-xl bg-violet-600 p-4 text-lg font-bold text-white shadow-lg shadow-violet-500/30 transition-all hover:bg-violet-700 disabled:bg-slate-400">
          {isAnalyzing ? <Loader text="Analyse en cours..." /> : 'Lancer l\'analyse IA'}
        </button>
      </footer>
    </div>
  );
};

export default SupplierAnalyzer;
