'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Target,
    Phone,
    ShieldCheck,
    TrendingUp,
    Users,
    Play,
    Pause,
    BarChart2,
    Lock,
    ChevronDown,
    Zap,
    CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

// --- NANO BANANA PRO COMPONENTS ---

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl ${className}`}>
        {children}
    </div>
);

const NeonButton = ({ children, onClick, variant = 'green', className = "" }: { children: React.ReactNode, onClick?: () => void, variant?: 'green' | 'red', className?: string }) => {
    const gradients = {
        green: 'from-emerald-500 to-green-600 shadow-emerald-500/30',
        red: 'from-red-500 to-orange-600 shadow-red-500/30'
    };
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`px-8 py-4 bg-gradient-to-r ${gradients[variant]} text-white font-bold rounded-xl shadow-lg flex items-center justify-center transition-all ${className}`}
        >
            {children}
        </motion.button>
    );
};

// --- TICKER COMPONENT ---
const Ticker = () => (
    <div className="w-full bg-black border-y border-white/10 overflow-hidden py-2 mb-8">
        <motion.div
            className="whitespace-nowrap flex space-x-8 text-xs font-mono text-green-500"
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
            {[...Array(10)].map((_, i) => (
                <span key={i} className="flex items-center">
                    <span className="text-white mr-2">PAC LEADS</span> +12.5% <span className="mx-4 text-gray-600">|</span>
                    <span className="text-white mr-2">SOLAR QUALIFIED</span> +8.2% <span className="mx-4 text-gray-600">|</span>
                    <span className="text-white mr-2">CPF DATA</span> -2.1% <span className="mx-4 text-gray-600">|</span>
                </span>
            ))}
        </motion.div>
    </div>
);

// --- AUDIO PLAYER COMPONENT ---
const AudioPlayer = () => {
    const [playing, setPlaying] = useState(false);
    return (
        <div className="bg-black/40 rounded-xl p-4 border border-white/10 flex items-center space-x-4">
            <button
                onClick={() => setPlaying(!playing)}
                className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-400 transition-colors"
            >
                {playing ? <Pause className="w-5 h-5 text-black" /> : <Play className="w-5 h-5 text-black ml-1" />}
            </button>
            <div className="flex-1">
                <div className="text-xs text-gray-400 mb-1">KavKom AI Agent vs Human Prospect</div>
                <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-green-500"
                        initial={{ width: "0%" }}
                        animate={{ width: playing ? "100%" : "0%" }}
                        transition={{ duration: 30, ease: "linear" }}
                    />
                </div>
            </div>
            <div className="text-xs font-mono text-green-400">Turing Test: PASS</div>
        </div>
    );
};

export default function DreamNovaLeads() {
    const [showAppLayer, setShowAppLayer] = useState(false);

    return (
        <div className="h-screen overflow-y-auto bg-[#05050A] text-gray-100 font-sans selection:bg-green-500/30 pb-40">

            {/* HEADER */}
            <nav className="relative z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto border-b border-white/5 bg-[#05050A]/90 backdrop-blur-md sticky top-0">
                <div className="flex items-center space-x-2">
                    <Target className="w-6 h-6 text-green-500" />
                    <span className="text-xl font-bold tracking-tight">DreamNova <span className="text-green-500">Leads</span></span>
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
                            <div className="inline-flex items-center px-3 py-1 border border-green-500/30 bg-green-900/10 text-green-400 text-xs font-bold tracking-[0.2em] uppercase mb-8">
                                <TrendingUp className="w-3 h-3 mr-2" />
                                High-Frequency Lead Trading
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tight leading-tight">
                                LE WALL STREET DU <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 animate-pulse">COLD CALLING</span>.
                            </h1>
                            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed mb-12">
                                Transformation légale du Cold Calling en Inbound.<br />
                                Risque juridique zéro. Performance maximale.
                            </p>

                            <div className="flex justify-center">
                                <NeonButton onClick={() => setShowAppLayer(true)}>
                                    Entrer dans la War Room <ChevronDown className="ml-2 w-5 h-5 animate-bounce" />
                                </NeonButton>
                            </div>
                        </motion.div>
                    </div>

                    {/* HERO IMAGE PLACEHOLDER */}
                    {/* PROMPT: Futuristic trading floor with green holographic streams of data representing leads, dark aggressive aesthetic. */}
                    <div className="relative w-full h-[400px] rounded-3xl overflow-hidden border border-white/10 group">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#05050A] z-10"></div>
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=2064&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-1000"></div>
                        <div className="absolute bottom-10 left-10 z-20">
                            <h3 className="text-2xl font-bold text-white mb-2">Data is the New Oil.</h3>
                            <p className="text-gray-400">Nous raffinons la donnée brute en or liquide.</p>
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
                            <Ticker />

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                                {/* COMPLIANCE ENGINE */}
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                                        <ShieldCheck className="w-8 h-8 mr-4 text-green-500" />
                                        Moteur de Conformité
                                    </h2>
                                    <GlassCard className="border-green-500/30">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-xl font-bold text-white">Protocole E-Cybèle</h3>
                                            <div className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full border border-green-500/30">ACTIVE</div>
                                        </div>
                                        <p className="text-gray-400 text-sm mb-6">
                                            Le démarchage téléphonique classique est mort (Loi Naegelen).
                                            Notre système transforme le "Push" en "Pull" via des funnels d&apos;acquisition propriétaires.
                                        </p>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between bg-black/40 p-4 rounded-xl border border-white/10">
                                                <span className="text-gray-300">Consentement Opt-in</span>
                                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                            </div>
                                            <div className="flex items-center justify-between bg-black/40 p-4 rounded-xl border border-white/10">
                                                <span className="text-gray-300">Bloctel Scrubbing</span>
                                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                            </div>
                                            <div className="flex items-center justify-between bg-black/40 p-4 rounded-xl border border-white/10">
                                                <span className="text-gray-300">Traçabilité IP</span>
                                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                            </div>
                                        </div>
                                    </GlassCard>
                                </div>

                                {/* TECH DEMO */}
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                                        <Zap className="w-8 h-8 mr-4 text-green-500" />
                                        Technologie Vocale
                                    </h2>
                                    <GlassCard>
                                        <h3 className="text-xl font-bold text-white mb-4">KavKom AI Agent</h3>
                                        <p className="text-gray-400 text-sm mb-6">
                                            Nos agents vocaux qualifient les leads en temps réel, 24/7, avec une latence humaine (&lt;500ms).
                                        </p>
                                        <AudioPlayer />
                                        <div className="mt-8 grid grid-cols-2 gap-4">
                                            <div className="bg-black/40 p-4 rounded-xl border border-white/10 text-center">
                                                <div className="text-2xl font-bold text-white">10k+</div>
                                                <div className="text-xs text-gray-500">Appels / Jour</div>
                                            </div>
                                            <div className="bg-black/40 p-4 rounded-xl border border-white/10 text-center">
                                                <div className="text-2xl font-bold text-white">4.8/5</div>
                                                <div className="text-xs text-gray-500">Satisfaction</div>
                                            </div>
                                        </div>
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
