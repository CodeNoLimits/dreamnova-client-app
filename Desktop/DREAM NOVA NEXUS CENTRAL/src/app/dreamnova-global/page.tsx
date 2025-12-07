'use client';

import React, { useState } from 'react';
import {
    Globe,
    Activity,
    Users,
    Target,
    Lock,
    ArrowRight,
    BarChart3,
    CheckCircle2,
    Play,
    X,
    Info
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import Link from 'next/link';

// --- DATA: DCS METRICS (Validé par NotebookLM) ---
const dcsMetrics = [
    {
        id: 'conscientiousness',
        title: "Conscience Professionnelle",
        score: 94,
        description: "Mesure de la régularité des micro-actions. Analyse le delta entre l&apos;intention déclarée et les logs d&apos;activité réels.",
        icon: <Activity className="w-6 h-6 text-blue-400" />,
        color: "from-blue-500 to-cyan-400"
    },
    {
        id: 'alignment',
        title: "Quotient d'Alignement",
        score: 88,
        description: "Cohérence Action-Valeur. Prouve la résilience du fondateur et sa capacité à ne pas pivoter au premier obstacle.",
        icon: <Target className="w-6 h-6 text-purple-400" />,
        color: "from-purple-500 to-pink-400"
    },
    {
        id: 'social-dynamic',
        title: "Dynamique Sociale (VELA)",
        score: 91,
        description: "Analyse de la qualité du leadership et de l&apos;empathie dans les 'Dream Teams'. Ignore la popularité (vanity metrics).",
        icon: <Users className="w-6 h-6 text-amber-400" />,
        color: "from-amber-500 to-orange-400"
    }
];

// Icon helper
function Briefcase({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
    );
}

export default function DreamNovaGlobalPage() {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '' });

    const handleAction = (title: string, message: string) => {
        setModalContent({ title, message });
        setShowModal(true);
    };

    return (
        <div className="h-screen overflow-y-auto bg-[#05050A] text-gray-100 font-sans selection:bg-cyan-500/30 pb-40">

            {/* BACKGROUND FX */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] opacity-30"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] opacity-20"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-5"></div>
            </div>

            {/* HEADER / NAVIGATION SIMPLIFIÉE */}
            <nav className="relative z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center space-x-2">
                    <Globe className="w-6 h-6 text-cyan-400" />
                    <span className="text-xl font-bold tracking-tight">DreamNova <span className="font-light text-gray-400">Global</span></span>
                </div>
                <Link href="/" className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">Retour au Hub</Link>
            </nav>

            <main className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-10">

                {/* HERO SECTION */}
                <div className="text-center mb-24">
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold tracking-widest uppercase mb-6 animate-pulse">
                        Réseau Social Nouvelle Génération
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600 mb-6 tracking-tighter">
                        THE DREAM <br /> ECONOMY.
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
                        Fini le paraître. Bienvenue dans l&apos;ère de la <span className="text-cyan-400 font-medium">Compétence Vérifiée</span>.
                        <br />Postez vos rêves, prouvez votre valeur, soyez recruté pour ce que vous êtes vraiment.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => handleAction("Beta Fermée", "Les inscriptions sont sur liste d'attente. Votre demande a été enregistrée.")}
                            className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition-all shadow-[0_0_40px_-10px_rgba(6,182,212,0.5)] flex items-center"
                        >
                            Rejoindre la Beta <ArrowRight className="ml-2 w-5 h-5" />
                        </button>
                        <button
                            onClick={() => handleAction("Démo DCS", "Lancement de la simulation du Dream Consistency Score...")}
                            className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl transition-all flex items-center backdrop-blur-md"
                        >
                            <Play className="ml-2 w-5 h-5 mr-2 fill-current" /> Voir la Démo DCS
                        </button>
                    </div>
                </div>

                {/* THE PROBLEM VS SOLUTION */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32 items-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl font-bold text-white">L&apos;Ancien Monde est <span className="text-red-500 line-through decoration-red-500/50">Cassé</span>.</h2>
                        <div className="space-y-4">
                            <div className="flex items-start p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                                <div className="mt-1 mr-4 bg-red-500/20 p-2 rounded-lg"><Users className="w-5 h-5 text-red-400" /></div>
                                <div>
                                    <h3 className="font-bold text-red-200">Ego & Vanité</h3>
                                    <p className="text-sm text-gray-400">Facebook et Instagram optimisent pour le narcissisme, pas pour la réalisation de soi.</p>
                                </div>
                            </div>
                            <div className="flex items-start p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                                <div className="mt-1 mr-4 bg-red-500/20 p-2 rounded-lg"><Briefcase className="w-5 h-5 text-red-400" /></div>
                                <div>
                                    <h3 className="font-bold text-red-200">Recrutement Obsolète</h3>
                                    <p className="text-sm text-gray-400">Le CV ment. Les diplômes expirent. Les recruteurs naviguent à l&apos;aveugle.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
                        <GlassCard className="relative border-cyan-500/30">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                                <Globe className="w-6 h-6 mr-3 text-cyan-400" /> La Solution DreamNova
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-center text-gray-300">
                                    <CheckCircle2 className="w-5 h-5 text-cyan-400 mr-3" />
                                    <span>On poste des <strong>Rêves</strong> (Projets), pas des photos.</span>
                                </li>
                                <li className="flex items-center text-gray-300">
                                    <CheckCircle2 className="w-5 h-5 text-cyan-400 mr-3" />
                                    <span>Collaboration en <strong>Dream Teams</strong> réelles.</span>
                                </li>
                                <li className="flex items-center text-gray-300">
                                    <CheckCircle2 className="w-5 h-5 text-cyan-400 mr-3" />
                                    <span><strong>Recrutement Inversé</strong> basé sur la Data pure.</span>
                                </li>
                            </ul>
                        </GlassCard>
                    </div>
                </div>

                {/* THE CORE TECH: DCS (SECTION CRITIQUE POUR INVESTISSEURS) */}
                <section className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Le Cœur du Réacteur : <span className="text-cyan-400">DCS</span></h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Dream Consistency Score. L&apos;algorithme qui transforme le comportement en indice de prédictibilité pour les investisseurs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {dcsMetrics.map((metric) => (
                            <GlassCard key={metric.id} className="relative overflow-hidden group hover:bg-white/10 transition-all duration-500">
                                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${metric.color}`}></div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:scale-110 transition-transform duration-300">
                                        {metric.icon}
                                    </div>
                                    <span className="text-3xl font-bold text-white font-mono">{metric.score}<span className="text-sm text-gray-500">/100</span></span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{metric.title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed mb-4 min-h-[80px]">
                                    {metric.description}
                                </p>
                                <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                                    <div
                                        className={`h-full rounded-full bg-gradient-to-r ${metric.color}`}
                                        style={{ width: `${metric.score}%` }}
                                    ></div>
                                </div>
                            </GlassCard>
                        ))}
                    </div>

                    {/* SIMULATION INVESTISSEUR */}
                    <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-900 border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <BarChart3 className="w-64 h-64 text-white" />
                        </div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
                            <div className="mb-6 md:mb-0">
                                <h4 className="text-white font-bold text-xl mb-2 flex items-center">
                                    <Lock className="w-5 h-5 text-amber-400 mr-2" /> Vue Investisseur (Business Angels)
                                </h4>
                                <p className="text-gray-400 text-sm max-w-md">
                                    Les profils utilisateurs sont confidentiels (Privacy First), mais leur Score DCS est public et vérifiable via Blockchain. Cela permet un recrutement sans biais et sans risque.
                                </p>
                            </div>
                            <div className="flex space-x-4">
                                <div className="text-center px-6 py-3 bg-black/40 rounded-xl border border-white/5 backdrop-blur-md">
                                    <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Risque</div>
                                    <div className="text-green-400 font-bold">FAIBLE</div>
                                </div>
                                <div className="text-center px-6 py-3 bg-black/40 rounded-xl border border-white/5 backdrop-blur-md">
                                    <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Potentiel</div>
                                    <div className="text-cyan-400 font-bold">A+</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CALL TO ACTION */}
                <div className="text-center pb-20">
                    <h2 className="text-2xl font-bold text-white mb-8">Prêt à changer la donne ?</h2>
                    <button
                        onClick={() => handleAction("Contact", "Merci de votre intérêt. Un membre de l'équipe fondatrice vous recontactera.")}
                        className="px-10 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors shadow-2xl hover:scale-105 transform duration-200"
                    >
                        Contacter l&apos;équipe DreamNova
                    </button>
                </div>

            </main>

            {/* MODAL SYSTEM */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#0a0a0f] border border-white/10 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl relative animate-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-500/20">
                            <Info className="w-8 h-8 text-cyan-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{modalContent.title}</h3>
                        <p className="text-gray-400 mb-6 text-sm">
                            {modalContent.message}
                        </p>
                        <button
                            onClick={() => setShowModal(false)}
                            className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
