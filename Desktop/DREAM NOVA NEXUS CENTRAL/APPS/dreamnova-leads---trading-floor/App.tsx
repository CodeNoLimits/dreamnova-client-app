import React from 'react';
import Ticker from './components/Ticker';
import TradingFloor from './components/TradingFloor';
import TuringTest from './components/TuringTest';
import { ShieldCheck, Lock, Activity, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-trading-bg text-trading-text font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      <Ticker />

      <main className="pb-24">
        {/* HERO SECTION */}
        <section className="pt-20 pb-16 px-4 text-center max-w-5xl mx-auto relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
            
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono mb-6">
                <Activity size={12} className="mr-2 animate-pulse" />
                SYSTÈME OPÉRATIONNEL B2B V2.4
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                Votre Pipeline de Vente. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Automatisé.</span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                Génération de Demande B2B qualifiée par IA. Transformez le Cold Calling en flux d'Inbound constant et prévisible.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center">
                    COMMENCER LE TRADING <ArrowRight size={20} className="ml-2" />
                </button>
                <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded transition-all backdrop-blur-sm">
                    VOIR LA DÉMO
                </button>
            </div>
        </section>

        {/* LEGAL FORTRESS */}
        <section className="mb-20 px-4">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
                
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-emerald-900/20 flex items-center justify-center border border-emerald-500/30">
                    <ShieldCheck size={32} className="text-emerald-400" />
                </div>
                
                <div className="flex-1 text-left">
                    <h3 className="text-xl font-bold text-white mb-2 flex items-center">
                        FORTERESSE JURIDIQUE E-CYBÈLE
                        <Lock size={16} className="ml-2 text-gray-500" />
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        Conformité totale <strong className="text-gray-200">Loi Naegelen & Bloctel</strong>. 
                        Mécanisme Opt-In strict : L'appel KavCom n'est déclenché que sur demande explicite du prospect via formulaire web.
                    </p>
                    <div className="flex gap-4">
                        <span className="text-xs font-mono text-emerald-500/80 bg-emerald-500/10 px-2 py-1 rounded">0% COLD CALLING</span>
                        <span className="text-xs font-mono text-emerald-500/80 bg-emerald-500/10 px-2 py-1 rounded">100% LEAD DEMANDEUR</span>
                    </div>
                </div>
            </div>
        </section>

        {/* TRADING FLOOR APP */}
        <section className="mb-24">
            <TradingFloor />
        </section>

        {/* TURING TEST */}
        <section className="mb-24 bg-gradient-to-b from-transparent to-black/50">
            <TuringTest />
        </section>

        {/* PARTNERSHIP FOOTER */}
        <footer className="border-t border-trading-border pt-12 pb-8 px-4 text-center">
            <p className="text-gray-500 text-sm mb-4">TECHNOLOGIE PROPULSÉE PAR</p>
            <div className="inline-flex items-center justify-center space-x-2 mb-8 opacity-70 hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                    <span className="text-black font-bold text-xs">K</span>
                </div>
                <span className="text-xl font-bold text-white tracking-widest">KAVCOM</span>
            </div>
            <div className="max-w-md mx-auto text-xs text-gray-600 font-mono">
                <p>© 2025 DREAMNOVA LEADS. TOUS DROITS RÉSERVÉS.</p>
                <p className="mt-2">DONNÉES DE MARCHÉ EN DIFFÉRÉ DE 15 MINUTES.</p>
            </div>
        </footer>
      </main>
    </div>
  );
};

export default App;