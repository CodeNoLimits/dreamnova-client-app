'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShoppingCart,
    TrendingUp,
    Zap,
    Globe,
    Search,
    BarChart,
    ChevronDown,
    Package,
    RefreshCw
} from 'lucide-react';
import Link from 'next/link';

// --- NANO BANANA PRO COMPONENTS ---

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl ${className}`}>
        {children}
    </div>
);

const NeonButton = ({ children, onClick, variant = 'blue', className = "" }: { children: React.ReactNode, onClick?: () => void, variant?: 'blue' | 'cyan', className?: string }) => {
    const gradients = {
        blue: 'from-blue-600 to-indigo-600 shadow-blue-500/30',
        cyan: 'from-cyan-500 to-teal-500 shadow-cyan-500/30'
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

// --- REAL-TIME SALES GRAPH (SIMULATED) ---
const SalesGraph = () => {
    const [bars, setBars] = useState<number[]>(Array(20).fill(10));

    useEffect(() => {
        const interval = setInterval(() => {
            setBars(prev => {
                const newBars = [...prev.slice(1), Math.random() * 80 + 20];
                return newBars;
            });
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-64 flex items-end justify-between space-x-1 bg-black/40 p-4 rounded-xl border border-white/10">
            {bars.map((height, i) => (
                <motion.div
                    key={i}
                    className="w-full bg-blue-500 rounded-t-sm opacity-80"
                    animate={{ height: `${height}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
            ))}
        </div>
    );
};

export default function EComVelocityPage() {
    const [showAppLayer, setShowAppLayer] = useState(false);

    return (
        <div className="h-screen overflow-y-auto bg-[#05050A] text-gray-100 font-sans selection:bg-blue-500/30 pb-40">

            {/* HEADER */}
            <nav className="relative z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto border-b border-white/5 bg-[#05050A]/90 backdrop-blur-md sticky top-0">
                <div className="flex items-center space-x-2">
                    <ShoppingCart className="w-6 h-6 text-blue-500" />
                    <span className="text-xl font-bold tracking-tight">E-Com <span className="text-blue-500">Velocity</span></span>
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
                            <div className="inline-flex items-center px-3 py-1 border border-blue-500/30 bg-blue-900/10 text-blue-400 text-xs font-bold tracking-[0.2em] uppercase mb-8">
                                <Globe className="w-3 h-3 mr-2" />
                                Autonomous Retail
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tight leading-tight">
                                LE COMMERCE QUI <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-500 animate-pulse">S&apos;ADAPTE SEUL</span>.
                            </h1>
                            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed mb-12">
                                L&apos;e-commerce qui s&apos;adapte aux tendances avant les humains.<br />
                                Détection de trends. Sourcing automatique. Vente instantanée.
                            </p>

                            <div className="flex justify-center">
                                <NeonButton onClick={() => setShowAppLayer(true)}>
                                    Voir le Dashboard <ChevronDown className="ml-2 w-5 h-5 animate-bounce" />
                                </NeonButton>
                            </div>
                        </motion.div>
                    </div>

                    {/* HERO IMAGE PLACEHOLDER */}
                    {/* PROMPT: Futuristic automated warehouse with drones and robots moving packages at high speed, blue neon lighting. */}
                    <div className="relative w-full h-[400px] rounded-3xl overflow-hidden border border-white/10 group">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#05050A] z-10"></div>
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-1000"></div>
                        <div className="absolute bottom-10 left-10 z-20">
                            <h3 className="text-2xl font-bold text-white mb-2">Zero-Touch Retail.</h3>
                            <p className="text-gray-400">De l&apos;usine au client, sans intervention humaine.</p>
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

                                {/* TECH STACK */}
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                                        <Zap className="w-8 h-8 mr-4 text-blue-500" />
                                        Agent Swarm
                                    </h2>
                                    <GlassCard className="border-blue-500/30">
                                        <div className="space-y-6">
                                            <div className="flex items-start">
                                                <div className="p-3 bg-blue-900/20 rounded-lg mr-4">
                                                    <Search className="w-6 h-6 text-blue-400" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-white">TrendHunter Agent</h3>
                                                    <p className="text-gray-400 text-sm">Scanne TikTok/Instagram pour détecter les produits viraux émergents.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start">
                                                <div className="p-3 bg-blue-900/20 rounded-lg mr-4">
                                                    <RefreshCw className="w-6 h-6 text-blue-400" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-white">Sourcing Bot</h3>
                                                    <p className="text-gray-400 text-sm">Connecte Alibaba/CJ Dropshipping pour trouver le fournisseur le moins cher.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start">
                                                <div className="p-3 bg-blue-900/20 rounded-lg mr-4">
                                                    <ShoppingCart className="w-6 h-6 text-blue-400" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-white">Shopify API</h3>
                                                    <p className="text-gray-400 text-sm">Crée la fiche produit, génère la description (GPT-4) et lance les ads.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </GlassCard>
                                </div>

                                {/* DASHBOARD */}
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                                        <BarChart className="w-8 h-8 mr-4 text-blue-500" />
                                        Performance Live
                                    </h2>
                                    <GlassCard>
                                        <div className="flex justify-between items-end mb-6">
                                            <div>
                                                <div className="text-sm text-gray-400 uppercase tracking-widest">Revenu (24h)</div>
                                                <div className="text-4xl font-black text-white">$12,450</div>
                                            </div>
                                            <div className="text-green-500 font-bold flex items-center">
                                                <TrendingUp className="w-4 h-4 mr-1" /> +18%
                                            </div>
                                        </div>
                                        <SalesGraph />
                                        <div className="mt-6 flex justify-between text-xs text-gray-500 font-mono">
                                            <span>00:00</span>
                                            <span>06:00</span>
                                            <span>12:00</span>
                                            <span>18:00</span>
                                            <span>23:59</span>
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
