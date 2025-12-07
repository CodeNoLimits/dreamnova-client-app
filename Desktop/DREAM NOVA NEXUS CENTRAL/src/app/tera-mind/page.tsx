'use client';

import React, { useState } from 'react';
import {
    Brain,
    Heart,
    ShieldCheck,
    Activity,
    MessageCircle,
    Lock,
    Cpu,
    Mic,
    Video,
    Globe,
    Check,
    ArrowRight,
    X,
    Info
} from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl hover:bg-white/10 transition-all duration-500 ${className}`}>
        {children}
    </div>
);

export default function TeraMindPage() {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '' });
    const { lang } = useLanguage();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const t = (translations[lang] as any).tera;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const common = (translations[lang] as any).common;

    const handleAction = (title: string, message: string) => {
        setModalContent({ title, message });
        setShowModal(true);
    };

    return (
        <div className={`h-screen overflow-y-auto bg-[#05050A] text-gray-100 font-sans selection:bg-pink-500/30 pb-40 ${lang === 'he' ? 'rtl' : 'ltr'}`}>

            {/* BACKGROUND AMBIENCE (Calm & Tech) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-rose-900/10 rounded-full blur-[180px] opacity-40"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[150px] opacity-30"></div>
                {/* Subtle grid for tech feel */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"></div>
            </div>

            {/* HEADER */}
            <nav className="relative z-50 px-6 py-8 flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-pink-500/20 rounded-xl border border-pink-500/30">
                        <Brain className="w-6 h-6 text-pink-400" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">Tera <span className="font-light text-pink-200">Mind</span></span>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex items-center space-x-2 text-xs font-mono text-gray-500 border border-white/10 px-3 py-1 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span>{common.allSystemsOperational}</span>
                    </div>
                    <Link href="/" className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">{common.backToHub}</Link>
                </div>
            </nav>

            <main className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-6">

                {/* HERO SECTION */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16 mb-32">
                    <div className="lg:w-1/2 space-y-8">
                        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-pink-500/30 bg-pink-500/5 backdrop-blur-md">
                            <Heart className="w-4 h-4 text-pink-400 fill-current" />
                            <span className="text-pink-300 text-xs font-bold tracking-widest uppercase">{t.tagline}</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight">
                            {t.heroTitle} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-indigo-400">
                                {t.heroSubtitle}
                            </span>
                        </h1>

                        <p className="text-xl text-gray-400 font-light leading-relaxed max-w-xl">
                            {t.heroDesc}
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => handleAction("Demo Sandy", "Lancement de l'environnement de démo sécurisé. Connexion à l'avatar...")}
                                className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] flex items-center"
                            >
                                {t.cta} <ArrowRight className={`w-5 h-5 ${lang === 'he' ? 'mr-2' : 'ml-2'}`} />
                            </button>
                            <button
                                onClick={() => handleAction("Sécurité", "Téléchargement du Whitepaper sur les protocoles de sécurité et l'éthique IA.")}
                                className="px-8 py-4 border border-white/10 hover:bg-white/5 text-white font-medium rounded-2xl transition-all backdrop-blur-md flex items-center"
                            >
                                <ShieldCheck className={`w-5 h-5 text-gray-400 ${lang === 'he' ? 'ml-2' : 'mr-2'}`} /> {t.safetyTitle}
                            </button>
                        </div>
                    </div>

                    {/* AVATAR INTERFACE SIMULATION */}
                    <div className="lg:w-1/2 relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-indigo-500/20 rounded-[40px] blur-3xl"></div>
                        <GlassCard className="relative border-white/20 p-0 overflow-hidden min-h-[500px] flex flex-col">

                            {/* Header Avatar */}
                            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/20">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-indigo-500 p-[2px]">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src="/api/placeholder/40/40" alt="Sandy Avatar" className="rounded-full bg-black" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-sm">Sandy AI</h3>
                                        <p className="text-xs text-green-400 flex items-center">
                                            <Activity className="w-3 h-3 mr-1" /> En ligne • Latence 300ms
                                        </p>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <span className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400 font-mono">Wellness Mode</span>
                                </div>
                            </div>

                            {/* Chat Area */}
                            <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-black/40">
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center border border-pink-500/30 flex-shrink-0">
                                        <Brain className="w-4 h-4 text-pink-400" />
                                    </div>
                                    <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-4 text-sm text-gray-300 leading-relaxed max-w-[90%]">
                                        Bonjour David. Je sens que la journée a été intense. Veux-tu qu&apos;on fasse un exercice de décompression ou préfères-tu simplement parler de ce qui te pèse ?
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3 justify-end">
                                    <div className="bg-indigo-500/20 border border-indigo-500/30 rounded-2xl rounded-tr-none p-4 text-sm text-white leading-relaxed max-w-[90%]">
                                        C&apos;est la pression des investisseurs... J&apos;ai besoin de clarifier mes idées.
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 flex-shrink-0">
                                        <div className="w-4 h-4 text-indigo-400 font-bold text-xs">YOU</div>
                                    </div>
                                </div>

                                {/* Real-time processing indicator */}

                                <div className="flex items-center space-x-2 text-xs text-gray-500 ml-12 animate-pulse">
                                    <Cpu className="w-3 h-3" />
                                    <span>Sandy réfléchit (RAG Psychologique)...</span>
                                </div>
                            </div>

                            {/* Voice Input */}
                            <div className="p-4 border-t border-white/5 bg-black/20 flex items-center justify-center space-x-6">
                                <button className="p-3 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                                    <MessageCircle className="w-5 h-5" />
                                </button>
                                <button className="p-6 rounded-full bg-pink-500 hover:bg-pink-400 text-white shadow-lg shadow-pink-500/30 transition-all transform hover:scale-105">
                                    <Mic className="w-6 h-6" />
                                </button>
                                <button className="p-3 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                                    <Video className="w-5 h-5" />
                                </button>
                            </div>
                        </GlassCard>

                        {/* Technical Note */}
                        <div className="absolute -right-8 top-20 bg-black/80 backdrop-blur border border-gray-800 p-3 rounded-xl shadow-xl max-w-[200px] text-xs text-gray-400 transform rotate-2 hidden lg:block">
                            <div className="font-bold text-white mb-1 flex items-center"><Globe className="w-3 h-3 mr-1 text-blue-400" /> Architecture Hébreu</div>
                            DictaLM-2.0 + ElevenLabs. <br />Zéro hallucination.
                        </div>
                    </div>
                </div>

                {/* TECH STACK & SAFETY (POUR INVESTISSEURS) */}
                <div className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">L&apos;Architecture <span className="text-pink-400">Spirit-Tech</span></h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Nous ne sommes pas une simple &quot;app&quot;. Nous avons construit un pipeline technologique souverain pour garantir l&apos;éthique et la performance, même en hébreu.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <GlassCard className="hover:border-pink-500/50">
                            <Cpu className="w-8 h-8 text-pink-400 mb-4" />
                            <h3 className="font-bold text-white mb-2">DictaLM-2.0</h3>
                            <p className="text-sm text-gray-400">Cerveau LLM Fine-tuné pour l&apos;hébreu moderne et les concepts psychologiques.</p>
                        </GlassCard>

                        <GlassCard className="hover:border-indigo-500/50">
                            <Video className="w-8 h-8 text-indigo-400 mb-4" />
                            <h3 className="font-bold text-white mb-2">Simli / Live2D</h3>
                            <p className="text-sm text-gray-400">Rendu Avatar temps réel low-latency (300ms). Évite l&apos;effet &quot;Uncanny Valley&quot;.</p>
                        </GlassCard>

                        <GlassCard className="hover:border-green-500/50">
                            <ShieldCheck className="w-8 h-8 text-green-400 mb-4" />
                            <h3 className="font-bold text-white mb-2">{t.safetyTitle}</h3>
                            <p className="text-sm text-gray-400">{t.safetyDesc}</p>
                        </GlassCard>

                        <GlassCard className="hover:border-amber-500/50">
                            <Lock className="w-8 h-8 text-amber-400 mb-4" />
                            <h3 className="font-bold text-white mb-2">Privacy-by-Design</h3>
                            <p className="text-sm text-gray-400">Anonymisation des données. Conforme RGPD et normes médicales futures.</p>
                        </GlassCard>
                    </div>
                </div>

                {/* THE REGULATORY STRATEGY */}
                <div className="bg-gradient-to-r from-gray-900 to-black border border-white/10 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px]"></div>

                    <div className="relative z-10 flex flex-col md:flex-row gap-12">
                        <div className="md:w-1/3">
                            <h3 className="text-2xl font-bold text-white mb-4">Stratégie Go-to-Market</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                Pour pénétrer le marché sans attendre 3 ans de certification FDA/CE, nous suivons une approche par étapes validée par nos conseillers légaux.
                            </p>
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">Statut Actuel</div>
                                <div className="text-green-400 font-bold flex items-center">
                                    <Check className="w-4 h-4 mr-2" /> Classifié &quot;Wellness &amp; Coaching&quot;
                                </div>
                            </div>
                        </div>

                        <div className="md:w-2/3 grid gap-6">
                            {/* Step 1 */}
                            <div className="flex items-start">
                                <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center font-bold text-black mr-4 flex-shrink-0">1</div>
                                <div>
                                    <h4 className="text-white font-bold">Phase 1 : L&apos;Assistant de Résilience (Mois 1-6)</h4>
                                    <p className="text-sm text-gray-400">Lancement B2C. Disclaimer légal fort : &quot;Non-Medical&quot;. Focus sur la gestion du stress et l&apos;insomnie.</p>
                                </div>
                            </div>
                            {/* Step 2 */}
                            <div className="flex items-start">
                                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center font-bold text-white mr-4 flex-shrink-0">2</div>
                                <div>
                                    <h4 className="text-white font-bold">Phase 2 : B2B Corporate (Mois 6-12)</h4>
                                    <p className="text-sm text-gray-400">Vente aux entreprises comme avantage employé (EAP). Réduction de l&apos;absentéisme.</p>
                                </div>
                            </div>
                            {/* Step 3 */}
                            <div className="flex items-start opacity-50">
                                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center font-bold text-gray-400 mr-4 flex-shrink-0">3</div>
                                <div>
                                    <h4 className="text-gray-300 font-bold">Phase 3 : Certification DTx (Mois 18+)</h4>
                                    <p className="text-sm text-gray-500">Validation clinique (essais randomisés) pour devenir un Digital Therapeutic remboursable.</p>
                                </div>
                            </div>
                        </div>
                    </div>
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
                        <div className="w-16 h-16 bg-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-pink-500/20">
                            <Info className="w-8 h-8 text-pink-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{modalContent.title}</h3>
                        <p className="text-gray-400 mb-6 text-sm">
                            {modalContent.message}
                        </p>
                        <button
                            onClick={() => setShowModal(false)}
                            className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
                        >
                            {common.close}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
