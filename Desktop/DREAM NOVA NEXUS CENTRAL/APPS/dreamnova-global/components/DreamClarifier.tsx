import React, { useState } from 'react';
import { Sparkles, ArrowRight, Loader2 } from 'lucide-react';

const DreamClarifier: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{ goal: string; step: string; deadline: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClarify = () => {
    if (!input) return;
    setLoading(true);
    
    // Simulate AI Latency
    setTimeout(() => {
      setLoading(false);
      setResult({
        goal: "Lancer un Side-Business à 1k€/mois",
        step: "Lister 3 compétences monétisables immédiates",
        deadline: "48h"
      });
    }, 2000);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900/20 to-space border border-indigo-500/20 rounded-xl p-6 relative overflow-hidden">
       {/* Decorative */}
       <div className="absolute top-0 right-0 w-20 h-20 bg-electric/10 rounded-full blur-2xl"></div>

      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-gold" />
        <h3 className="text-lg font-tech font-bold text-white">Dream Clarifier v2.0</h3>
      </div>

      {!result ? (
        <div className="space-y-4">
          <p className="text-sm text-gray-400">Transformez une envie vague en plan d'action binaire.</p>
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ex: Je veux être riche..."
              className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white placeholder-gray-600 focus:outline-none focus:border-electric transition-colors text-sm font-mono"
            />
          </div>
          <button 
            onClick={handleClarify}
            disabled={loading || !input}
            className="w-full bg-electric hover:bg-blue-600 text-white py-2 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Initialiser le Protocole'}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-3">
            <div className="bg-white/5 rounded border-l-2 border-gold p-3">
              <div className="text-[10px] uppercase text-gray-500 mb-1">Objectif Clarifié</div>
              <div className="text-white font-medium text-sm">{result.goal}</div>
            </div>
            <div className="bg-white/5 rounded border-l-2 border-electric p-3">
              <div className="text-[10px] uppercase text-gray-500 mb-1">Première Action</div>
              <div className="text-white font-medium text-sm">{result.step}</div>
            </div>
            <div className="flex justify-between items-center bg-red-900/10 rounded p-2 border border-red-500/20">
              <span className="text-[10px] text-red-400 font-bold">DEADLINE</span>
              <span className="text-xs font-mono text-red-300">{result.deadline}</span>
            </div>
            <button 
              onClick={() => { setResult(null); setInput(''); }}
              className="text-xs text-gray-500 hover:text-white underline w-full text-center mt-2"
            >
              Nouvelle simulation
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DreamClarifier;