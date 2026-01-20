'use client';

import React, { useState } from 'react';
import {
    Briefcase,
    Zap,
    Users,
    CheckCircle2,
    ArrowRight,
    Rocket,
    Globe,
    Cpu,
    ExternalLink,
    Sparkles
} from 'lucide-react';
import Link from 'next/link';

// --- COMPONENTS ---
const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl ${className}`}>
        {children}
    </div>
);

const NeonButton = ({ children, onClick, variant = 'purple', className = "" }: { children: React.ReactNode, onClick?: () => void, variant?: 'purple' | 'cyan', className?: string }) => {
    const gradients = {
        purple: 'from-purple-600 to-indigo-600 shadow-purple-500/30',
        cyan: 'from-cyan-500 to-blue-600 shadow-cyan-500/30'
    };
    return (
        <button
            onClick={onClick}
            className={`px-8 py-4 bg-gradient-to-r ${gradients[variant]} text-white font-bold rounded-xl shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95 ${className}`}
        >
            {children}
        </button>
    );
};

import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { LeadCaptureForm } from '@/components/forms/LeadCaptureForm';
import { AIServicesGrid } from '@/components/services/AIServicesGrid';

export default function DreamNovaConsultPage() {
    const [showAuditForm, setShowAuditForm] = useState(false);
    const { lang } = useLanguage();
    const t = translations[lang].consult;
    const common = translations[lang].common;

    return (
        <div className="min-h-screen bg-[#05050A] text-gray-100 font-sans selection:bg-purple-500/30 pb-40">

            {/* HEADER */}
            <nav className="relative z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto border-b border-white/5 bg-[#05050A]/90 backdrop-blur-md sticky top-0">
                <div className="flex items-center space-x-2">
                    <Briefcase className="w-6 h-6 text-purple-500" />
                    <span className="text-xl font-bold tracking-tight">DreamNova <span className="text-purple-500">Consult</span></span>
                </div>
                <div className="flex items-center space-x-4">
                    <LanguageSelector />
                    <Link href="/" className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest">{common.backToHub}</Link>
                </div>
            </nav>

            <main className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-10">

                {/* HERO SECTION */}
                <div className="text-center mb-24">
                    <div className="inline-flex items-center px-3 py-1 border border-purple-500/30 bg-purple-900/10 text-purple-400 text-xs font-bold tracking-[0.2em] uppercase mb-8 animate-pulse">
                        <Zap className="w-3 h-3 mr-2" />
                        {t.tagline}
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tight leading-tight">
                        {t.heroTitle}
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed mb-12">
                        {t.heroSubtitle}
                    </p>

                    <div className="flex flex-col items-center gap-6 max-w-2xl mx-auto">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
                            <a
                                href="https://dreamnova-consult-module-1-640844031185.us-west1.run.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto flex-1"
                            >
                                <NeonButton className="w-full">
                                    <ExternalLink className="mr-2 w-5 h-5" /> {t.buttons.launch}
                                </NeonButton>
                            </a>
                            <button className="w-full sm:w-auto flex-1 px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center">
                                <Users className="mr-2 w-5 h-5" /> {t.buttons.book}
                            </button>
                        </div>
                        <a
                            href="https://tmptroeq.gensparkspace.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full"
                        >
                            <NeonButton variant="cyan" className="w-full group relative overflow-hidden">
                                <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                                <Sparkles className="mr-2 w-5 h-5 inline-block" /> {t.buttons.explore}
                            </NeonButton>
                        </a>

                        <div className="flex flex-wrap justify-center gap-4 mt-4">
                            <a href="https://dreamnova-client.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 border border-white/10 px-4 py-2 rounded-full hover:bg-white/5">
                                <Globe className="w-3 h-3" /> {t.buttons.clientExamples}
                            </a>
                            <a href="https://shouk-app.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 border border-white/10 px-4 py-2 rounded-full hover:bg-white/5">
                                <ExternalLink className="w-3 h-3" /> Shouk App Demo
                            </a>
                            <a href="https://repair-portal-70044307.figma.site/" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 border border-white/10 px-4 py-2 rounded-full hover:bg-white/5">
                                <Globe className="w-3 h-3" /> {t.buttons.france}
                            </a>
                            <a href="/documents/AI_PME_Growth_Acceleration.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-purple-400 hover:text-white transition-colors flex items-center gap-2 border border-purple-500/30 bg-purple-500/10 px-4 py-2 rounded-full hover:bg-purple-500/20">
                                <Rocket className="w-3 h-3" /> Download Growth Strategy (PDF)
                            </a>
                        </div>
                    </div>
                </div>

                {/* VALUE PROPOSITION */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                    <GlassCard className="border-purple-500/20">
                        <div className="p-3 bg-purple-500/10 rounded-xl w-fit mb-6">
                            <Cpu className="w-8 h-8 text-purple-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">{t.cards.automation.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {t.cards.automation.desc}
                        </p>
                    </GlassCard>
                    <GlassCard className="border-pink-500/20">
                        <div className="p-3 bg-pink-500/10 rounded-xl w-fit mb-6">
                            <Rocket className="w-8 h-8 text-pink-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">{t.cards.growth.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {t.cards.growth.desc}
                        </p>
                    </GlassCard>
                    <GlassCard className="border-cyan-500/20">
                        <div className="p-3 bg-cyan-500/10 rounded-xl w-fit mb-6">
                            <Globe className="w-8 h-8 text-cyan-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">{t.cards.strategy.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {t.cards.strategy.desc}
                        </p>
                    </GlassCard>
                </div>

                {/* SOCIAL PROOF / METRICS */}
                <div className="border-y border-white/10 py-16 mb-32">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-black text-white mb-2">€50k+</div>
                            <div className="text-xs text-gray-500 uppercase tracking-widest">{t.metrics.revenue}</div>
                        </div>
                        <div>
                            <div className="text-4xl font-black text-white mb-2">15</div>
                            <div className="text-xs text-gray-500 uppercase tracking-widest">{t.metrics.agents}</div>
                        </div>
                        <div>
                            <div className="text-4xl font-black text-white mb-2">300%</div>
                            <div className="text-xs text-gray-500 uppercase tracking-widest">{t.metrics.roi}</div>
                        </div>
                        <div>
                            <div className="text-4xl font-black text-white mb-2">24/7</div>
                            <div className="text-xs text-gray-500 uppercase tracking-widest">{t.metrics.support}</div>
                        </div>
                    </div>
                </div>

                {/* THE OFFER */}
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-12 text-center">{t.offers.title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* STARTER */}
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                            <h3 className="text-xl font-bold text-white mb-2">{t.offers.starter.title}</h3>
                            <div className="text-3xl font-black text-purple-400 mb-6">{t.offers.starter.price} <span className="text-sm text-gray-500 font-normal">{t.offers.starter.unit}</span></div>
                            <ul className="space-y-4 mb-8">
                                {t.offers.starter.features.map((feature: string, i: number) => (
                                    <li key={i} className="flex items-center text-gray-300 text-sm"><CheckCircle2 className="w-4 h-4 mr-3 text-purple-500" /> {feature}</li>
                                ))}
                            </ul>
                            <button className="w-full py-3 rounded-xl border border-white/20 text-white font-bold hover:bg-white/10 transition-colors">{t.offers.starter.button}</button>
                        </div>

                        {/* GROWTH */}
                        <div className="p-8 rounded-3xl bg-gradient-to-b from-purple-900/20 to-black border border-purple-500/30 relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
                            <h3 className="text-xl font-bold text-white mb-2">{t.offers.growth.title}</h3>
                            <div className="text-3xl font-black text-purple-400 mb-6">{t.offers.growth.price} <span className="text-sm text-gray-500 font-normal">{t.offers.growth.unit}</span></div>
                            <ul className="space-y-4 mb-8">
                                {t.offers.growth.features.map((feature: string, i: number) => (
                                    <li key={i} className="flex items-center text-gray-300 text-sm"><CheckCircle2 className="w-4 h-4 mr-3 text-purple-500" /> {feature}</li>
                                ))}
                            </ul>
                            <NeonButton className="w-full">{t.offers.growth.button}</NeonButton>
                        </div>
                    </div>
                </div>

                {/* AI SERVICES GRID */}
                <div className="max-w-6xl mx-auto mt-24">
                    <AIServicesGrid translations={t.aiServices} />
                </div>

                {/* LEAD CAPTURE FORM SECTION */}
                <div className="max-w-3xl mx-auto mt-32 mb-16">
                    <div className="p-8 rounded-3xl bg-gradient-to-b from-purple-900/20 to-black border border-purple-500/30">
                        <LeadCaptureForm
                            translations={t.leadForm}
                        />
                    </div>
                </div>

            </main>
        </div>
    );
}
