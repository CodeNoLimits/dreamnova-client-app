import React, { useState } from 'react';
import { INITIAL_LEADS } from '../constants';
import { Lead } from '../types';
import { ShoppingCart, Zap, TrendingUp, CheckCircle, Clock } from 'lucide-react';

const TradingFloor: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [cartCount, setCartCount] = useState(0);

  const handleBuyLead = (id: string) => {
    setLeads(prev => prev.map(lead => 
      lead.id === id ? { ...lead, isSold: true } : lead
    ));
    setCartCount(prev => prev + 1);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'HOT':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"><Zap size={10} className="mr-1" /> CHAUD</span>;
      case 'WARM':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20"><TrendingUp size={10} className="mr-1" /> TIÈDE</span>;
      default:
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-500/10 text-gray-400 border border-gray-500/20"><Clock size={10} className="mr-1" /> EN ATTENTE</span>;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* LEFT COLUMN: DATA GRID (8 cols) */}
      <div className="lg:col-span-8 space-y-4">
        <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-white flex items-center">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                MARKET DATA
            </h2>
            <span className="text-xs font-mono text-emerald-500/70">REFRESH RATE: 50ms</span>
        </div>

        {/* Desktop Table View (Hidden on Mobile) */}
        <div className="hidden md:block bg-trading-card border border-trading-border rounded-lg overflow-hidden backdrop-blur-xl">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/5 text-gray-400 font-mono text-xs uppercase sticky top-0">
              <tr>
                <th className="p-4 border-b border-trading-border">ID</th>
                <th className="p-4 border-b border-trading-border">Secteur</th>
                <th className="p-4 border-b border-trading-border">Code Postal</th>
                <th className="p-4 border-b border-trading-border">Time</th>
                <th className="p-4 border-b border-trading-border">Statut</th>
                <th className="p-4 border-b border-trading-border text-right">Prix</th>
                <th className="p-4 border-b border-trading-border text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-trading-border">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-white/5 transition-colors group">
                  <td className="p-4 font-mono text-sm text-gray-400 group-hover:text-white transition-colors">{lead.id}</td>
                  <td className="p-4 text-sm font-medium text-white">{lead.sector}</td>
                  <td className="p-4 font-mono text-sm text-gray-400">{lead.zip}</td>
                  <td className="p-4 font-mono text-xs text-gray-500">{lead.timestamp}</td>
                  <td className="p-4">{getStatusBadge(lead.status)}</td>
                  <td className="p-4 font-mono text-sm text-white text-right">{lead.price}€</td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => !lead.isSold && handleBuyLead(lead.id)}
                      disabled={lead.isSold}
                      className={`px-3 py-1.5 rounded text-xs font-bold font-mono transition-all duration-200 
                        ${lead.isSold 
                          ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-transparent' 
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500 hover:text-black hover:shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                        }`}
                    >
                      {lead.isSold ? 'VENDU' : 'ACHETER'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View (Visible only on Mobile) */}
        <div className="md:hidden space-y-3">
          {leads.map((lead) => (
             <div key={lead.id} className="bg-trading-card border border-trading-border rounded-lg p-4 backdrop-blur-xl">
                <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-xs text-gray-500">{lead.id} • {lead.timestamp}</span>
                    {getStatusBadge(lead.status)}
                </div>
                <h3 className="text-white font-medium mb-1">{lead.sector}</h3>
                <div className="flex justify-between items-center text-sm text-gray-400 font-mono mb-4">
                    <span>CP: {lead.zip}</span>
                    <span className="text-white font-bold text-base">{lead.price}€</span>
                </div>
                <button 
                    onClick={() => !lead.isSold && handleBuyLead(lead.id)}
                    disabled={lead.isSold}
                    className={`w-full py-2 rounded text-sm font-bold font-mono transition-all duration-200 
                    ${lead.isSold 
                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700' 
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500 hover:text-black'
                    }`}
                >
                    {lead.isSold ? 'VENDU' : 'ACHETER LE LEAD'}
                </button>
             </div>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN: BUY BOX (4 cols) */}
      <div className="lg:col-span-4 relative">
        <div className="sticky top-16 space-y-6">
            
            {/* Cart Summary */}
            <div className="bg-trading-card border border-trading-border p-6 rounded-lg backdrop-blur-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none"></div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white font-mono">PORTFOLIO</h3>
                    <ShoppingCart className="text-emerald-400" size={20} />
                </div>
                <div className="flex justify-between items-end mb-2">
                    <span className="text-gray-400 text-sm">Positions ouvertes</span>
                    <span className="text-2xl font-bold text-white font-mono">{cartCount}</span>
                </div>
                <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden mb-4">
                    <div 
                        className="bg-emerald-500 h-full transition-all duration-500 ease-out" 
                        style={{ width: `${Math.min((cartCount / 10) * 100, 100)}%` }}
                    ></div>
                </div>
                <button className="w-full py-3 bg-white text-black font-bold font-mono text-sm rounded hover:bg-emerald-400 transition-colors uppercase flex items-center justify-center">
                    Exécuter l'ordre <CheckCircle size={16} className="ml-2" />
                </button>
            </div>

            {/* Packs */}
            <div className="space-y-4">
                <div className="bg-trading-card border border-trading-border p-5 rounded-lg hover:border-emerald-500/50 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-emerald-400 font-mono text-xs border border-emerald-500/30 px-2 py-0.5 rounded">POPULAIRE</span>
                        <span className="text-white font-bold font-mono">350€</span>
                    </div>
                    <h4 className="text-white font-bold text-lg mb-1">Pack Découverte</h4>
                    <p className="text-gray-400 text-sm mb-3">10 Leads Qualifiés (35€/u)</p>
                    <div className="text-xs text-gray-500 font-mono flex items-center">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span>
                        Livraison instantanée
                    </div>
                </div>

                <div className="bg-trading-card border border-trading-border p-5 rounded-lg hover:border-amber-500/50 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-amber-400 font-mono text-xs border border-amber-500/30 px-2 py-0.5 rounded">GROWTH</span>
                        <span className="text-white font-bold font-mono">1500€</span>
                    </div>
                    <h4 className="text-white font-bold text-lg mb-1">Pack Croissance</h4>
                    <p className="text-gray-400 text-sm mb-3">50 Leads Qualifiés (30€/u)</p>
                    <div className="text-xs text-gray-500 font-mono flex items-center">
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></span>
                        Accès API dédié
                    </div>
                </div>
            </div>

        </div>
      </div>

    </div>
  );
};

export default TradingFloor;