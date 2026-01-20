import React from 'react';
import { Lock, Search, Filter } from 'lucide-react';
import { CandidateProfile } from '../types';

const CANDIDATES: CandidateProfile[] = [
  { id: 1, role: 'CTO / Fullstack', dcs: 96, alignment: 92, price: 500 },
  { id: 2, role: 'Growth Lead', dcs: 91, alignment: 88, price: 350 },
  { id: 3, role: 'Solidity Dev', dcs: 98, alignment: 95, price: 800 },
];

const ReverseRecruiting: React.FC = () => {
  return (
    <div className="mt-8 border-t border-white/10 pt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-tech text-white font-bold">Marché Caché (B2B)</h3>
        <div className="flex gap-2">
            <button className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-gray-400"><Filter className="w-3 h-3" /></button>
            <button className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-gray-400"><Search className="w-3 h-3" /></button>
        </div>
      </div>
      
      <p className="text-xs text-gray-500 mb-4">
        N'achetez pas des promesses. Achetez des preuves.
        <br />Profils anonymisés jusqu'au paiement.
      </p>

      <div className="space-y-3">
        {CANDIDATES.map((c) => (
          <div key={c.id} className="bg-white/5 border border-white/5 hover:border-gold/30 rounded-lg p-3 transition-colors group">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-gray-800 relative overflow-hidden">
                    {/* Blurred Avatar */}
                    <img 
                        src={`https://picsum.photos/40/40?random=${c.id}`} 
                        alt="Hidden" 
                        className="w-full h-full object-cover blur-sm opacity-50"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Lock className="w-3 h-3 text-white/70" />
                    </div>
                </div>
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-gold transition-colors">{c.role}</div>
                  <div className="flex gap-2 text-[10px] text-gray-400 mt-0.5">
                    <span className="text-blue-400">DCS: {c.dcs}</span>
                    <span>Align: {c.alignment}%</span>
                  </div>
                </div>
              </div>
              <button className="bg-gold/10 text-gold hover:bg-gold hover:text-black text-[10px] font-bold py-1 px-3 rounded transition-all border border-gold/20">
                {c.price}€
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReverseRecruiting;