'use client';

import React, { useState } from 'react';
import {
    Video,
    Scissors,
    Upload,
    Zap,
    Youtube,
    Instagram,
    Share2,
    ChevronDown,
    Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// --- COMPONENTS ---
const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl ${className}`}>
        {children}
    </div>
);

const NeonButton = ({ children, onClick, variant = 'red', className = "" }: { children: React.ReactNode, onClick?: () => void, variant?: 'red' | 'pink', className?: string }) => {
    const gradients = {
        red: 'from-red-600 to-orange-600 shadow-red-500/30',
        pink: 'from-pink-500 to-rose-600 shadow-pink-500/30'
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

export default function TetraMediaPage() {
    const [showAppLayer, setShowAppLayer] = useState(false);

    return (
        <div className="h-screen overflow-y-auto bg-[#05050A] text-gray-100 font-sans selection:bg-red-500/30 pb-40">

            {/* HEADER */}
            <nav className="relative z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto border-b border-white/5 bg-[#05050A]/90 backdrop-blur-md sticky top-0">
                <div className="flex items-center space-x-2">
                    <Video className="w-6 h-6 text-red-500" />
                    <span className="text-xl font-bold tracking-tight">Tetra<span className="text-red-500">Media</span></span>
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
                            <div className="inline-flex items-center px-3 py-1 border border-red-500/30 bg-red-900/10 text-red-400 text-xs font-bold tracking-[0.2em] uppercase mb-8">
                                <Scissors className="w-3 h-3 mr-2" />
                                The Content Factory
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tight leading-tight">
                                L'USINE À <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 animate-pulse">ATTENTION</span>.
                            </h1>
                            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed mb-12">
                                Transformez 1 heure de contenu long en 30 clips viraux.
                                <br />Sous-titrage, recadrage et publication automatique par IA.
                            </p>

                            <div className="flex justify-center">
                                <NeonButton onClick={() => setShowAppLayer(true)}>
                                    Démarrer la Production <ChevronDown className="ml-2 w-5 h-5 animate-bounce" />
                                </NeonButton>
                            </div>
                        </motion.div>
                    </div>

                    {/* HERO IMAGE PLACEHOLDER */}
                    <div className="relative w-full h-[400px] rounded-3xl overflow-hidden border border-white/10 group">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#05050A] z-10"></div>
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574717024653-61fd2cf4d44c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-1000"></div>
                        <div className="absolute bottom-10 left-10 z-20">
                            <h3 className="text-2xl font-bold text-white mb-2">Viralité Industrielle.</h3>
                            <p className="text-gray-400">Inondez les réseaux sans y passer vos nuits.</p>
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

                                {/* UPLOAD & SLICE */}
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                                        <Upload className="w-8 h-8 mr-4 text-red-500" />
                                        Upload & Slice
                                    </h2>
                                    <GlassCard className="border-red-500/30 border-dashed">
                                        <div className="flex flex-col items-center justify-center py-12 text-center">
                                            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                                                <Youtube className="w-8 h-8 text-red-500" />
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2">Collez un lien YouTube</h3>
                                            <p className="text-gray-400 text-sm mb-6">ou uploadez un fichier MP4 / MOV</p>
                                            <input
                                                type="text"
                                                placeholder="https://youtube.com/watch?v=..."
                                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors mb-4"
                                            />
                                            <NeonButton className="w-full">
                                                <Zap className="mr-2 w-5 h-5" /> Générer les Clips
                                            </NeonButton>
                                        </div>
                                    </GlassCard>
                                </div>

                                {/* OUTPUT & DISTRIBUTION */}
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                                        <Share2 className="w-8 h-8 mr-4 text-red-500" />
                                        Distribution Multi-Canal
                                    </h2>
                                    <GlassCard>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between bg-black/40 p-4 rounded-xl border border-white/10">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center mr-4"><Youtube className="w-6 h-6 text-white" /></div>
                                                    <div>
                                                        <div className="font-bold text-white">YouTube Shorts</div>
                                                        <div className="text-xs text-gray-500">Connecté • @DreamNova</div>
                                                    </div>
                                                </div>
                                                <div className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">READY</div>
                                            </div>
                                            <div className="flex items-center justify-between bg-black/40 p-4 rounded-xl border border-white/10">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center mr-4"><Instagram className="w-6 h-6 text-white" /></div>
                                                    <div>
                                                        <div className="font-bold text-white">Instagram Reels</div>
                                                        <div className="text-xs text-gray-500">Connecté • @DreamNova_Off</div>
                                                    </div>
                                                </div>
                                                <div className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">READY</div>
                                            </div>
                                            <div className="flex items-center justify-between bg-black/40 p-4 rounded-xl border border-white/10">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 bg-black border border-white/20 rounded-lg flex items-center justify-center mr-4"><span className="font-bold text-white">Tk</span></div>
                                                    <div>
                                                        <div className="font-bold text-white">TikTok</div>
                                                        <div className="text-xs text-gray-500">Connecté • @DreamNova_Tok</div>
                                                    </div>
                                                </div>
                                                <div className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">READY</div>
                                            </div>
                                        </div>
                                        <div className="mt-6 pt-6 border-t border-white/10 text-center">
                                            <p className="text-sm text-gray-400 mb-4">Estimation de portée organique : <span className="text-white font-bold">150k vues / semaine</span></p>
                                            <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-colors">
                                                Programmer la Campagne
                                            </button>
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
