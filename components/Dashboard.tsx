import React, { useState, useEffect } from 'react';
import { COMPLIANCE_DEADLINE } from '../constants';
import type { RiskResult, AppView } from '../types';
import { RadialProgress, MarkdownRenderer } from './ui';

interface DashboardProps {
  result: RiskResult;
  onNavigate: (view: AppView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ result, onNavigate }) => {
    const [daysLeft, setDaysLeft] = useState(0);

    useEffect(() => {
        const now = new Date();
        const difference = COMPLIANCE_DEADLINE.getTime() - now.getTime();
        setDaysLeft(Math.floor(difference / (1000 * 60 * 60 * 24)));
    }, []);

    const checklistItems = [
        "Connecter le logiciel de facturation",
        "Valider le format des factures",
        "Paramétrer la connexion à la plateforme publique",
        "Former les équipes comptables",
    ];

    return (
        <div className="flex h-full flex-col bg-slate-50">
            <header className="p-4 text-center text-sm font-bold text-white bg-red-500">
                ⚠️ {daysLeft} jours avant l'amende !
            </header>
            <main className="flex-1 overflow-y-auto p-4">
                <h1 className="text-2xl font-bold text-slate-800">Tableau de bord</h1>
                <div className="mt-4 rounded-2xl bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-slate-600">Ton score de conformité</p>
                            <p className="mt-4 font-semibold text-slate-600">Économise en évitant l'amende</p>
                            <p className="text-3xl font-bold text-slate-800">
                                {result.estimatedPenalty.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 })}/an
                            </p>
                        </div>
                        <RadialProgress percentage={result.riskPercentage} />
                    </div>
                </div>

                <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
                    <h2 className="font-bold text-slate-800">Prochaines étapes pour la conformité</h2>
                    <ul className="mt-4 space-y-3">
                        {checklistItems.map((item, index) => (
                            <li key={index} className="flex items-center">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-slate-300"></div>
                                <span className="ml-3 text-slate-600">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                 <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
                    <h2 className="font-bold text-slate-800">✅ Tes actions prioritaires (par David)</h2>
                    <div className="mt-2">
                        <MarkdownRenderer content={result.priorityActions} />
                    </div>
                </div>
            </main>
            <footer className="sticky bottom-0 border-t border-slate-200 bg-white p-4">
                 <button onClick={() => onNavigate('payment')} className="w-full rounded-xl bg-violet-600 p-4 text-lg font-bold text-white shadow-lg shadow-violet-500/30 transition-all hover:bg-violet-700">
                    Demander mon Audit Gratuit
                </button>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <button onClick={() => onNavigate('analyzer')} className="text-sm font-semibold text-slate-600 hover:text-violet-600">Fournisseurs</button>
                    <button onClick={() => onNavigate('calculator')} className="text-sm font-semibold text-slate-600 hover:text-violet-600">Calculateur</button>
                    <button onClick={() => onNavigate('assistant')} className="text-sm font-semibold text-slate-600 hover:text-violet-600">Assistant IA</button>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;
