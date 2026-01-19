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
    Info,
    MessageCircle
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

// --- DATA: DCS METRICS (Validé par NotebookLM) ---
const dcsMetrics = [
    {
        id: 'conscientiousness',
        title: "Conscience Professionnelle",
        score: 94,
        description: "Mesure de la régularité des micro-actions. Analyse le delta entre l'intention déclarée et les logs d'activité réels.",
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
        id: 'social',
        title: "Dynamique Sociale (VELA)",
        score: 91,
        description: "Analyse de la qualité du leadership et de l'empathie dans les 'Dream Teams'. Ignore la popularité (vanity metrics).",
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

import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { LanguageSelector } from '@/components/ui/LanguageSelector';

// ... (keep existing imports and components)

export default function DreamNovaGlobalPage() {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '' });
    const { lang } = useLanguage();
    const t = translations[lang].global;
    const common = translations[lang].common;

    const handleAction = (title: string, message: string) => {
        setModalContent({ title, message });
        setShowModal(true);
    };

    return (
        <div className="min-h-screen bg-[#05050A] text-gray-100 font-sans selection:bg-cyan-500/30 overflow-x-hidden pb-20">

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
                <div className="flex items-center space-x-4">
                    <LanguageSelector />
                    <a href="/" className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">{common.backToHub}</a>
                </div>
            </nav>

            <main className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-10">

                {/* HERO SECTION */}
                <div className="text-center mb-24">
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold tracking-widest uppercase mb-6 animate-pulse">
                        {t.tagline}
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600 mb-6 tracking-tighter">
                        {t.heroTitle}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
                        {t.heroSubtitle}
                    </p>

                    <div className="mt-10 flex flex-col items-center gap-6 max-w-2xl mx-auto">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                            <button
                                onClick={() => handleAction(t.modals.beta.title, t.modals.beta.message)}
                                className="w-full sm:w-auto flex-1 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition-all shadow-[0_0_40px_-10px_rgba(6,182,212,0.5)] flex items-center justify-center"
                            >
                                {t.buttons.beta} <ArrowRight className="ml-2 w-5 h-5" />
                            </button>
                            <button
                                onClick={() => handleAction(t.modals.demo.title, t.modals.demo.message)}
                                className="w-full sm:w-auto flex-1 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl transition-all flex items-center justify-center backdrop-blur-md"
                            >
                                <Play className="ml-2 w-5 h-5 mr-2 fill-current" /> {t.buttons.demo}
                            </button>
                        </div>

                        <button
                            onClick={() => handleAction(t.modals.reputation.title, t.modals.reputation.message)}
                            className="w-full sm:w-auto px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center mb-4"
                        >
                            <MessageCircle className="mr-2 w-5 h-5" /> {t.buttons.reputation}
                        </button>



                        <a
                            href="https://keeunzii.gensparkspace.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full"
                        >
                            <button className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center group">
                                <Users className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" /> {t.buttons.b2c}
                            </button>
                        </a>

                        <a
                            href="https://wyctohkc.gensparkspace.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full"
                        >
                            <button className="w-full px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white font-medium rounded-xl transition-all flex items-center justify-center backdrop-blur-md text-sm uppercase tracking-widest">
                                <Lock className="mr-2 w-4 h-4" /> {t.buttons.noTech}
                            </button>
                        </a>

                        <a
                            href="/documents/Dream_Nova_L_Écosystème_IA_Bâtisseur_de_Marché.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full"
                        >
                            <button className="w-full px-8 py-4 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 font-bold rounded-xl transition-all flex items-center justify-center">
                                <Globe className="mr-2 w-5 h-5" /> Download Whitepaper (PDF)
                            </button>
                        </a>
                    </div>
                </div >

                {/* VIDEO PLAYER */}
                < div className="mt-16 relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-blue-500/20 mb-12 group" >
                    <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-transparent transition-colors pointer-events-none z-10"></div>
                    <video
                        src="/videos/The_DreamNova_OS.mp4"
                        className="w-full h-auto"
                        controls
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                </div >

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32 items-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl font-bold text-white">{t.problem.title}</h2>
                        <div className="space-y-4">
                            <div className="flex items-start p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                                <div className="mt-1 mr-4 bg-red-500/20 p-2 rounded-lg"><Users className="w-5 h-5 text-red-400" /></div>
                                <div>
                                    <h3 className="font-bold text-red-200">{t.problem.ego.title}</h3>
                                    <p className="text-sm text-gray-400">{t.problem.ego.desc}</p>
                                </div>
                            </div>
                            <div className="flex items-start p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                                <div className="mt-1 mr-4 bg-red-500/20 p-2 rounded-lg"><Briefcase className="w-5 h-5 text-red-400" /></div>
                                <div>
                                    <h3 className="font-bold text-red-200">{t.problem.hiring.title}</h3>
                                    <p className="text-sm text-gray-400">{t.problem.hiring.desc}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
                        <GlassCard className="relative border-cyan-500/30">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                                <Globe className="w-6 h-6 mr-3 text-cyan-400" /> {t.solution.title}
                            </h3>
                            <ul className="space-y-4">
                                {t.solution.points.map((point: string, i: number) => (
                                    <li key={i} className="flex items-center text-gray-300">
                                        <CheckCircle2 className="w-5 h-5 text-cyan-400 mr-3" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </GlassCard>
                    </div>
                </div>

                {/* THE CORE TECH: DCS (SECTION CRITIQUE POUR INVESTISSEURS) */}
                <section className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{t.dcs.title}</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            {t.dcs.desc}
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
                                <h3 className="text-xl font-bold text-white mb-2">{t.dcs.metrics[metric.id as keyof typeof t.dcs.metrics].title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed mb-4 min-h-[80px]">
                                    {t.dcs.metrics[metric.id as keyof typeof t.dcs.metrics].desc}
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
                </section>

                {/* MODAL (Placeholder pour interactivité) */}
                {
                    showModal && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                            <div className="bg-[#0A0A12] border border-white/10 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="absolute top-4 right-4 text-gray-500 hover:text-white"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                                <h3 className="text-xl font-bold text-white mb-2">{modalContent.title}</h3>
                                <p className="text-gray-400 mb-6">{modalContent.message}</p>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
                                >
                                    {common.understood}
                                </button>
                            </div>
                        </div>
                    )
                }

            </main >
        </div >
    );
}
