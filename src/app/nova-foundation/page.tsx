'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Landmark,
    TrendingUp,
    Heart,
    ShieldCheck,
    ArrowRight,
    PieChart,
    Coins,
    Globe,
    Users,
    Building2,
    ArrowDown
} from 'lucide-react';
import Link from 'next/link';
import { AdminToolbar } from '@/components/admin/AdminToolbar';
import { useAdminStore } from '@/lib/store';

// --- NANO BANANA PRO COMPONENTS - LEGACY GOLD ---

const GlassCard = ({ children, className = "", hoverEffect = true }: { children: React.ReactNode, className?: string, hoverEffect?: boolean }) => (
    <motion.div
        whileHover={hoverEffect ? { scale: 1.01, borderColor: "rgba(234, 179, 8, 0.6)" } : {}}
        className={`backdrop-blur-xl bg-black/80 border border-yellow-600/20 rounded-xl p-8 shadow-[0_0_40px_-10px_rgba(234,179,8,0.1)] transition-all duration-500 relative overflow-hidden ${className}`}
    >
        {/* Gold Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/gold-scale.png')] opacity-5 pointer-events-none mix-blend-overlay"></div>
        {children}
    </motion.div>
);

const GoldButton = ({ children, onClick, className = "" }: { children: React.ReactNode, onClick?: () => void, className?: string }) => (
    <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(234, 179, 8, 0.4)" }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`px-8 py-4 bg-gradient-to-r from-yellow-600 to-amber-700 text-white font-bold uppercase tracking-widest rounded-sm flex items-center justify-center transition-all border border-yellow-500/50 shadow-lg ${className}`}
    >
        {children}
    </motion.button>
);

import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { LanguageSelector } from '@/components/ui/LanguageSelector';

// ... (keep existing imports and components)

// --- FINANCIAL FLOW DIAGRAM (ANIMATED) ---
const FinancialFlow = () => {
    const { lang } = useLanguage();
    const t = translations[lang].foundation;

    return (
        <div className="relative w-full max-w-4xl mx-auto py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative z-10">
                {/* Source */}
                <div className="text-center">
                    <div className="w-20 h-20 mx-auto bg-gray-900 border border-gray-700 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                        <Building2 className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-white font-bold uppercase text-sm">{t.financial.flow.source}</h3>
                    <p className="text-gray-500 text-xs mt-1">Profits</p>
                </div>

                {/* Transit (DAF) */}
                <div className="text-center relative">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-900 to-amber-900 border border-yellow-500 rounded-full flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(234,179,8,0.3)] z-20 relative">
                        <Landmark className="w-12 h-12 text-yellow-400" />
                    </div>
                    <h3 className="text-yellow-500 font-bold uppercase text-sm">{t.financial.flow.transit}</h3>
                    <p className="text-gray-400 text-xs mt-1">Tax Deduction</p>

                    {/* Flow Particles */}
                    <div className="absolute top-1/2 left-[-50%] right-[-50%] h-1 -translate-y-1/2 -z-10 hidden md:block">
                        <div className="w-full h-full bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                                className="w-1/3 h-full bg-yellow-500 blur-sm"
                                animate={{ x: ["-100%", "300%"] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                        </div>
                    </div>
                </div>

                {/* Destination */}
                <div className="text-center">
                    <div className="w-20 h-20 mx-auto bg-white border border-gray-200 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                        <Heart className="w-10 h-10 text-red-500" />
                    </div>
                    <h3 className="text-white font-bold uppercase text-sm">{t.financial.flow.dest}</h3>
                    <p className="text-gray-500 text-xs mt-1">501c3 Non-Profit</p>
                </div>
            </div>

            {/* Mobile Arrow */}
            <div className="md:hidden flex flex-col items-center justify-center space-y-8 absolute inset-0 pointer-events-none opacity-20">
                <ArrowDown className="w-12 h-12 text-yellow-500" />
                <ArrowDown className="w-12 h-12 text-yellow-500 mt-32" />
            </div>
        </div>
    );
};

// --- IMPACT CALCULATOR ---
const ImpactCalculator = () => {
    const [donation, setDonation] = useState(1200000);
    const taxRate = 0.37; // Approx high bracket
    const cost = donation * (1 - taxRate);
    const { lang } = useLanguage();
    const t = translations[lang].foundation;

    return (
        <GlassCard className="border-yellow-500/30 bg-gradient-to-br from-gray-900 to-black">
            <h3 className="text-xl font-bold text-white mb-6 text-center uppercase tracking-widest">{t.calculator.title}</h3>
            <div className="space-y-6">
                <div>
                    <label className="text-gray-400 text-xs uppercase font-bold mb-2 block">{t.calculator.amount}</label>
                    <input
                        type="range"
                        min="10000"
                        max="5000000"
                        step="10000"
                        value={donation}
                        onChange={(e) => setDonation(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                    />
                    <div className="text-right text-yellow-400 font-mono font-bold mt-2 text-xl">
                        ${donation.toLocaleString()}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div>
                        <div className="text-gray-500 text-xs uppercase">{t.calculator.cost}</div>
                        <div className="text-white font-bold font-mono text-lg">${Math.round(cost).toLocaleString()}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-gray-500 text-xs uppercase">{t.calculator.savings}</div>
                        <div className="text-green-400 font-bold font-mono text-lg">${Math.round(donation * taxRate).toLocaleString()}</div>
                    </div>
                </div>
            </div>
        </GlassCard>
    );
};

// --- PROGRESS TRACKER ---
const ProgressTracker = () => {
    const target = 63000000;
    const current = 1250000;
    const percentage = (current / target) * 100;
    const { lang } = useLanguage();
    const t = translations[lang].foundation;

    return (
        <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
            {/* Background Circle */}
            <svg className="w-full h-full transform -rotate-90">
                <circle
                    cx="128"
                    cy="128"
                    r="120"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="8"
                    fill="transparent"
                />
                <motion.circle
                    cx="128"
                    cy="128"
                    r="120"
                    stroke="#EAB308"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 120}
                    strokeDashoffset={2 * Math.PI * 120 * (1 - percentage / 100)}
                    initial={{ strokeDashoffset: 2 * Math.PI * 120 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 120 * (1 - percentage / 100) }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute text-center">
                <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">{t.tracker.raised}</div>
                <div className="text-3xl font-black text-white font-mono">${(current / 1000000).toFixed(2)}M</div>
                <div className="text-yellow-500 text-xs font-bold mt-1">{percentage.toFixed(2)}%</div>
            </div>
        </div>
    );
};

export default function NovaFoundation() {
    const { isAdmin } = useAdminStore();
    const { lang } = useLanguage();
    const t = translations[lang].foundation;
    const common = translations[lang].common;

    return (
        <div className="h-screen overflow-y-auto bg-[#050505] text-gray-100 font-sans selection:bg-yellow-500/30 pb-40">
            {isAdmin && (
                <div className="sticky top-0 z-[60]">
                    <AdminToolbar actions={[
                        { label: 'Fidelity Login', onClick: () => console.log('Fidelity') },
                        { label: 'Donation Log', onClick: () => console.log('Log') }
                    ]} />
                </div>
            )}

            {/* BACKGROUND FX */}
            {/* IMAGE PROMPT: Cinematic visualization of a golden bridge connecting a modern city to a spiritual light source, representing the $63M mission, dark background, particles of gold dust, epic scale */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-yellow-900/10 rounded-full blur-[150px] opacity-20"></div>
                <div className="absolute bottom-0 left-0 w-[1000px] h-[600px] bg-amber-950/20 rounded-full blur-[150px] opacity-20"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
            </div>

            {/* HEADER */}
            <nav className="relative z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0">
                <div className="flex items-center space-x-2">
                    <Landmark className="w-6 h-6 text-yellow-500" />
                    <span className="text-xl font-bold tracking-tight uppercase">The Nova <span className="text-yellow-500">Foundation</span></span>
                </div>
                <div className="flex items-center space-x-4">
                    <LanguageSelector />
                    <Link href="/" className="px-4 py-2 text-sm font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">{common.backToHub}</Link>
                </div>
            </nav>

            <main className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-10">

                {/* 1. HERO SECTION */}
                <div className="text-center mb-32 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="inline-flex items-center px-3 py-1 border border-yellow-500/30 bg-yellow-900/10 text-yellow-400 text-xs font-bold tracking-[0.2em] uppercase mb-8">
                            <Globe className="w-3 h-3 mr-2" />
                            {t.tagline}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight leading-tight uppercase font-serif whitespace-pre-line">
                            {t.heroTitle}
                        </h1>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed mb-12">
                            {t.heroSubtitle}
                        </p>

                        {/* VIDEO PLAYER */}
                        <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-yellow-500/20 mb-12 group">
                            <div className="absolute inset-0 bg-yellow-500/10 group-hover:bg-transparent transition-colors pointer-events-none z-10"></div>
                            <video
                                src="/videos/foundation.mp4"
                                className="w-full h-auto"
                                controls
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                        </div>


                    </motion.div>
                </div>

                {/* 2. LEGACY (SABBA) */}
                <div className="mb-32">
                    <div className="max-w-4xl mx-auto bg-gradient-to-r from-gray-900 to-black border border-white/10 rounded-3xl p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                            <div className="md:w-1/3 text-center">
                                <div className="w-40 h-40 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-4 border-4 border-gray-700 shadow-2xl">
                                    <Users className="w-20 h-20 text-gray-500" />
                                </div>
                                <div className="text-white font-bold text-lg">{t.legacy.name}</div>
                                <div className="text-gray-500 text-sm">{t.legacy.title}</div>
                            </div>
                            <div className="md:w-2/3">
                                <h2 className="text-3xl font-bold text-white mb-6 font-serif">{t.legacy.quote}</h2>
                                <div className="space-y-4 text-gray-400">
                                    <p>
                                        {t.legacy.desc1}
                                    </p>
                                    <p>
                                        {t.legacy.desc2}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. FINANCIAL FLOW & CALCULATOR */}
                <div className="mb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6 uppercase tracking-widest">{t.financial.title}</h2>
                        <p className="text-gray-400 mb-8">
                            {t.financial.desc}
                        </p>
                        <FinancialFlow />
                    </div>
                    <div>
                        <ImpactCalculator />
                    </div>
                </div>

                {/* 4. TRACKER */}
                <div className="mb-32 text-center">
                    <h2 className="text-3xl font-bold text-white mb-12 uppercase tracking-widest">{t.tracker.title}</h2>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-16">
                        <ProgressTracker />
                        <div className="text-left space-y-6">
                            <div>
                                <div className="text-gray-500 text-xs uppercase tracking-widest">{t.tracker.target}</div>
                                <div className="text-4xl font-black text-white font-mono">$63,000,000</div>
                            </div>
                            <div>
                                <div className="text-gray-500 text-xs uppercase tracking-widest">{t.tracker.impact}</div>
                                <div className="text-2xl font-bold text-yellow-500 flex items-center">
                                    <TrendingUp className="w-6 h-6 mr-2" /> 450 Livres / Mois
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. CALL TO ACTION */}
                <div className="text-center pb-20">
                    <GoldButton className="text-lg px-12 py-6">
                        {t.buttons.partner} <ArrowRight className="ml-2 w-6 h-6" />
                    </GoldButton>
                    <p className="text-gray-500 text-xs mt-6 uppercase tracking-widest">{t.footer}</p>
                </div>

            </main>
        </div>
    );
}
