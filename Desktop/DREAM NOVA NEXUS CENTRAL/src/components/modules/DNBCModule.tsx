'use client';

import React, { useState } from 'react';
import {
    Activity,
    Target,
    Users,
    BarChart3,
    Lock,
    Globe,
    Calculator,
    X,
    CheckCircle2,
    AlertTriangle,
    TrendingUp,
    DollarSign
} from 'lucide-react';

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl hover:bg-white/10 transition-all duration-300 ${className}`}>
        {children}
    </div>
);

export default function DNBCModule() {
    const [showCalculator, setShowCalculator] = useState(false);
    const [roiResult, setRoiResult] = useState<number | null>(null);

    const calculateROI = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulation logic
        setRoiResult(450000); // Example result
    };

    return (
        <div className="w-full space-y-12 text-gray-100 font-sans">

            <div className="text-center mb-8">
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-bold tracking-widest uppercase mb-4">
                    Strategic Intelligence
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">L'Échiquier <span className="text-green-400">4D</span></h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Visualisez votre écosystème. Identifiez vos alliés. Neutralisez les menaces.
                </p>
            </div>

            {/* 4D CHESS VISUALIZATION */}
            <div className="relative bg-black/50 border border-green-500/20 rounded-3xl p-8 overflow-hidden min-h-[400px] flex items-center justify-center">
                {/* Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f2015_1px,transparent_1px),linear-gradient(to_bottom,#0f2015_1px,transparent_1px)] bg-[size:40px_40px] opacity-50"></div>

                {/* Legend Overlay */}
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur border border-white/10 p-4 rounded-xl z-10">
                    <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Légende Tactique</h4>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-center"><span className="w-3 h-3 rounded-full bg-green-500 mr-2 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span> Alliés Stratégiques</li>
                        <li className="flex items-center"><span className="w-3 h-3 rounded-full bg-red-500 mr-2 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span> Menaces Actives</li>
                        <li className="flex items-center"><span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span> Supérieurs (Fournisseurs)</li>
                        <li className="flex items-center"><span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span> Inférieurs (Clients)</li>
                    </ul>
                </div>

                {/* Central Node (You) */}
                <div className="relative z-0">
                    <div className="w-24 h-24 bg-white/10 rounded-full border-2 border-white/50 flex items-center justify-center backdrop-blur-md shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                        <span className="font-bold text-white">VOUS</span>
                    </div>
                    {/* Orbiting Nodes (Simulation) */}
                    <div className="absolute top-[-80px] left-[-60px] w-12 h-12 bg-green-500/20 border border-green-500 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-[-50px] right-[-80px] w-16 h-16 bg-red-500/20 border border-red-500 rounded-full animate-pulse delay-75"></div>
                    <div className="absolute top-[50px] right-[-100px] w-10 h-10 bg-blue-500/20 border border-blue-500 rounded-full"></div>
                </div>
            </div>

            {/* VALUE PROPOSITION */}
            <div className="bg-gradient-to-r from-green-900/20 to-black border border-green-500/20 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Pourquoi payer McKinsey ?</h3>
                    <p className="text-gray-400 max-w-lg">
                        90% des partenariats échouent par manque d'alignement. Notre algorithme DCS prédit la compatibilité avant même la première réunion.
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-4xl font-black text-green-400 mb-1">17x</div>
                    <div className="text-sm text-gray-500 uppercase tracking-widest">Moins cher que le Consulting</div>
                </div>
            </div>

            {/* ROI CALCULATOR CTA */}
            <div className="text-center">
                <button
                    onClick={() => setShowCalculator(true)}
                    className="px-8 py-4 bg-white/5 border border-green-500/50 text-green-400 font-bold rounded-xl hover:bg-green-500/10 transition-all flex items-center mx-auto shadow-[0_0_30px_-10px_rgba(34,197,94,0.3)]"
                >
                    <Calculator className="w-5 h-5 mr-2" /> Calculer mon ROI Partnership
                </button>
            </div>

            {/* CALCULATOR MODAL */}
            {showCalculator && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
                    <div className="bg-[#0a0f0c] border border-green-500/30 rounded-3xl p-8 max-w-md w-full relative shadow-2xl">
                        <button
                            onClick={() => setShowCalculator(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                            <TrendingUp className="w-6 h-6 mr-3 text-green-500" /> Simulateur de Gain
                        </h3>

                        {!roiResult ? (
                            <form onSubmit={calculateROI} className="space-y-4">
                                <div>
                                    <label className="block text-xs text-gray-500 uppercase mb-1">Chiffre d'Affaires Annuel</label>
                                    <input type="number" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-green-500 outline-none" placeholder="ex: 1000000" required />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 uppercase mb-1">Secteur d'Activité</label>
                                    <select className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-green-500 outline-none">
                                        <option>SaaS / Tech</option>
                                        <option>E-commerce</option>
                                        <option>Services</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 uppercase mb-1">Nombre de Partenaires Actuels</label>
                                    <input type="number" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-green-500 outline-none" placeholder="ex: 5" required />
                                </div>
                                <button type="submit" className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-colors mt-4">
                                    Calculer le Potentiel
                                </button>
                            </form>
                        ) : (
                            <div className="text-center py-8 animate-in zoom-in-95">
                                <p className="text-gray-400 mb-2">Gain Annuel Estimé</p>
                                <div className="text-5xl font-black text-green-400 mb-6">
                                    {roiResult.toLocaleString()}€
                                </div>
                                <p className="text-sm text-gray-500 mb-8">
                                    Basé sur une optimisation de 15% de vos synergies actuelles.
                                </p>
                                <button
                                    onClick={() => setShowCalculator(false)}
                                    className="w-full py-3 bg-white/10 border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-colors"
                                >
                                    Fermer
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
