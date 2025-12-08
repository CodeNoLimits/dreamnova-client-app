'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Heart,
    Globe,
    TrendingUp,
    Shield,
    Users,
    ChevronDown,
    Landmark,
    Coins,
    ArrowRight
} from 'lucide-react';
import Link from 'next/link';

// --- NANO BANANA PRO COMPONENTS ---

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl ${className}`}>
        {children}
    </div>
);

const NeonButton = ({ children, onClick, variant = 'gold', className = "" }: { children: React.ReactNode, onClick?: () => void, variant?: 'gold' | 'white', className?: string }) => {
    const gradients = {
        gold: 'from-yellow-500 to-amber-600 shadow-yellow-500/30',
        white: 'from-gray-100 to-gray-300 shadow-white/30 text-black'
    };
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`px-8 py-4 bg-gradient-to-r ${gradients[variant]} ${variant === 'white' ? 'text-black' : 'text-white'} font-bold rounded-xl shadow-lg flex items-center justify-center transition-all ${className}`}
        >
            {children}
        </motion.button>
    );
};

// --- IMPACT DASHBOARD ---
const ImpactStat = ({ label, value }: { label: string, value: string }) => (
    <div className="text-center">
        <div className="text-3xl font-bold text-white mb-1">{value}</div>
        <div className="text-xs text-yellow-500 uppercase tracking-widest">{label}</div>
    </div>
);

export default function NovaFoundationPage() {
    const [showAppLayer, setShowAppLayer] = useState(false);

    return (
        <div className="h-screen overflow-y-auto bg-[#05050A] text-gray-100 font-sans selection:bg-yellow-500/30 pb-40">

            {/* HEADER */}
            <nav className="relative z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto border-b border-white/5 bg-[#05050A]/90 backdrop-blur-md sticky top-0">
                <div className="flex items-center space-x-2">
                    <Landmark className="w-6 h-6 text-yellow-500" />
                    <span className="text-xl font-bold tracking-tight">Nova <span className="text-yellow-500">Foundation</span></span>
                </div>
                <Link href="/" className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest">Retour Nexus</Link>
            </nav>

            <main className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-10">

                {/* --- LEVEL 1: THE PITCH --- */}
                <section className="mb-32">
                    <div className="text-center mb-16 relative">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center px-3 py-1 border border-yellow-500/30 bg-yellow-900/10 text-yellow-400 text-xs font-bold tracking-[0.2em] uppercase mb-8">
                                <Heart className="w-3 h-3 mr-2" />
                                Ethical Finance & Philanthropy
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tight leading-tight">
                                LE CAPITALISME <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-500 to-orange-500 animate-pulse">CONSCIENT</span>.
                            </h1>
                            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed mb-12">
                                Financer l&apos;avenir sans détruire le présent.<br />
                                10% des profits de l&apos;écosystème DreamNova sont redistribués.
                            </p>

                            <div className="flex justify-center">
                                <NeonButton onClick={() => setShowAppLayer(true)}>
                                    Voir l&apos;Impact <ChevronDown className="ml-2 w-5 h-5 animate-bounce" />
                                </NeonButton>
                            </div>
                        </motion.div>
                    </div>

                    {/* HERO IMAGE PLACEHOLDER */}
                    {/* PROMPT: Golden tree growing out of a circuit board, representing organic growth from technology, dark background with gold particles. */}
                    <div className="relative w-full h-[400px] rounded-3xl overflow-hidden border border-white/10 group">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#05050A] z-10"></div>
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-1000"></div>
                        <div className="absolute bottom-10 left-10 z-20">
                            <h3 className="text-2xl font-bold text-white mb-2">Tzedaka 2.0</h3>
                            <p className="text-gray-400">La charité automatisée par Smart Contracts.</p>
                        </div>
                    </div>
                </section>

                {/* --- LEVEL 2: THE APP (REVEAL) --- */}
                <AnimatePresence>
                    {showAppLayer && (
                        <motion.section
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-t border-white/10 pt-20"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                                {/* IMPACT DASHBOARD */}
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                                        <Globe className="w-8 h-8 mr-4 text-yellow-500" />
                                        Transparence Totale
                                    </h2>
                                    <GlassCard className="border-yellow-500/30">
                                        <div className="grid grid-cols-2 gap-8 mb-8">
                                            <ImpactStat label="Fonds Collectés" value="1.2M€" />
                                            <ImpactStat label="Projets Financés" value="42" />
                                            <ImpactStat label="Vies Impactées" value="15k+" />
                                            <ImpactStat label="Frais de Gestion" value="0%" />
                                        </div>
                                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-yellow-500 w-[75%]"></div>
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                                            <span>Objectif 2025</span>
                                            <span>75%</span>
                                        </div>
                                    </GlassCard>
                                </div>

                                {/* DONATION FLOW */}
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                                        <Coins className="w-8 h-8 mr-4 text-yellow-500" />
                                        Investir
                                    </h2>
                                    <GlassCard>
                                        <h3 className="text-xl font-bold text-white mb-4">Choisissez votre cause</h3>
                                        <div className="space-y-4 mb-8">
                                            <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-yellow-500/50 cursor-pointer transition-colors flex justify-between items-center">
                                                <span className="text-white">Education (Yeshivas)</span>
                                                <ArrowRight className="w-4 h-4 text-gray-500" />
                                            </div>
                                            <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-yellow-500/50 cursor-pointer transition-colors flex justify-between items-center">
                                                <span className="text-white">Pauvreté (Paniers Repas)</span>
                                                <ArrowRight className="w-4 h-4 text-gray-500" />
                                            </div>
                                            <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-yellow-500/50 cursor-pointer transition-colors flex justify-between items-center">
                                                <span className="text-white">Innovation (Startups)</span>
                                                <ArrowRight className="w-4 h-4 text-gray-500" />
                                            </div>
                                        </div>
                                        <NeonButton variant="gold" className="w-full">
                                            Faire un Don (Crypto/Fiat)
                                        </NeonButton>
                                    </GlassCard>
                                </div>

                            </div>
                        </motion.section>
                    )}
                </AnimatePresence>

            </main>
        </div>
    );
}
