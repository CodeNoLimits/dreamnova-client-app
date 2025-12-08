'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Share2,
    Instagram,
    Linkedin,
    Youtube,
    TrendingUp,
    Users,
    BarChart2,
    ChevronDown,
    Zap,
    Repeat
} from 'lucide-react';
import Link from 'next/link';

// --- NANO BANANA PRO COMPONENTS ---

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl ${className}`}>
        {children}
    </div>
);

const NeonButton = ({ children, onClick, variant = 'pink', className = "" }: { children: React.ReactNode, onClick?: () => void, variant?: 'pink' | 'purple', className?: string }) => {
    const gradients = {
        pink: 'from-pink-500 to-rose-600 shadow-pink-500/30',
        purple: 'from-purple-500 to-indigo-600 shadow-purple-500/30'
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

// --- SOCIAL DASHBOARD WIDGETS ---
const StatCard = ({ icon: Icon, label, value, trend }: { icon: any, label: string, value: string, trend: string }) => (
    <div className="bg-black/40 p-4 rounded-xl border border-white/10 flex items-center justify-between">
        <div className="flex items-center">
            <div className="p-2 bg-white/5 rounded-lg mr-3">
                <Icon className="w-5 h-5 text-gray-300" />
            </div>
            <div>
                <div className="text-xs text-gray-500 uppercase">{label}</div>
                <div className="text-xl font-bold text-white">{value}</div>
            </div>
        </div>
        <div className="text-green-500 text-xs font-bold bg-green-500/10 px-2 py-1 rounded-full">
            {trend}
        </div>
    </div>
);

export default function DreamNovaSocial() {
    const [showAppLayer, setShowAppLayer] = useState(false);

    return (
        <div className="h-screen overflow-y-auto bg-[#05050A] text-gray-100 font-sans selection:bg-pink-500/30 pb-40">

            {/* HEADER */}
            <nav className="relative z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto border-b border-white/5 bg-[#05050A]/90 backdrop-blur-md sticky top-0">
                <div className="flex items-center space-x-2">
                    <Share2 className="w-6 h-6 text-pink-500" />
                    <span className="text-xl font-bold tracking-tight">DreamNova <span className="text-pink-500">Social</span></span>
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
                            <div className="inline-flex items-center px-3 py-1 border border-pink-500/30 bg-pink-900/10 text-pink-400 text-xs font-bold tracking-[0.2em] uppercase mb-8">
                                <TrendingUp className="w-3 h-3 mr-2" />
                                Social Media Automation
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tight leading-tight">
                                SOYEZ PARTOUT.<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-pulse">TOUT LE TEMPS.</span>
                            </h1>
                            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed mb-12">
                                Une seule vidéo source. 30 pièces de contenu.<br />
                                Distribution omnicanale automatisée par IA.
                            </p>

                            <div className="flex justify-center">
                                <NeonButton onClick={() => setShowAppLayer(true)}>
                                    Voir la Matrice <ChevronDown className="ml-2 w-5 h-5 animate-bounce" />
                                </NeonButton>
                            </div>
                        </motion.div>
                    </div>

                    {/* HERO IMAGE PLACEHOLDER */}
                    {/* PROMPT: A central glowing orb representing a core message, shooting out beams of light to various social media icons (Instagram, LinkedIn, TikTok) in a dark void. */}
                    <div className="relative w-full h-[400px] rounded-3xl overflow-hidden border border-white/10 group">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#05050A] z-10"></div>
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-1000"></div>
                        <div className="absolute bottom-10 left-10 z-20">
                            <h3 className="text-2xl font-bold text-white mb-2">Omniprésence Radicale.</h3>
                            <p className="text-gray-400">Ne laissez aucun canal inexploité.</p>
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

                                {/* CONTENT FACTORY */}
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                                        <Zap className="w-8 h-8 mr-4 text-pink-500" />
                                        Content Factory
                                    </h2>
                                    <GlassCard className="border-pink-500/30">
                                        <div className="flex items-center justify-between mb-8">
                                            <div className="flex items-center">
                                                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mr-4">
                                                    <Youtube className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-white">Source: YouTube Long Form</h3>
                                                    <p className="text-xs text-gray-400">Video ID: #8Xj9L2m</p>
                                                </div>
                                            </div>
                                            <div className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">PROCESSED</div>
                                        </div>

                                        <div className="space-y-4 relative">
                                            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-white/10"></div>

                                            <div className="relative flex items-center pl-12">
                                                <div className="absolute left-4 w-4 h-4 rounded-full bg-pink-500 border-4 border-black"></div>
                                                <div className="flex-1 bg-black/40 p-3 rounded-lg border border-white/10 flex justify-between items-center">
                                                    <span className="text-sm text-gray-300">OpusClip: 5 Shorts Generated</span>
                                                    <Zap className="w-4 h-4 text-yellow-500" />
                                                </div>
                                            </div>
                                            <div className="relative flex items-center pl-12">
                                                <div className="absolute left-4 w-4 h-4 rounded-full bg-pink-500 border-4 border-black"></div>
                                                <div className="flex-1 bg-black/40 p-3 rounded-lg border border-white/10 flex justify-between items-center">
                                                    <span className="text-sm text-gray-300">Claude: LinkedIn Post Drafted</span>
                                                    <Zap className="w-4 h-4 text-yellow-500" />
                                                </div>
                                            </div>
                                            <div className="relative flex items-center pl-12">
                                                <div className="absolute left-4 w-4 h-4 rounded-full bg-pink-500 border-4 border-black"></div>
                                                <div className="flex-1 bg-black/40 p-3 rounded-lg border border-white/10 flex justify-between items-center">
                                                    <span className="text-sm text-gray-300">Midjourney: Thumbnail Created</span>
                                                    <Zap className="w-4 h-4 text-yellow-500" />
                                                </div>
                                            </div>
                                        </div>
                                    </GlassCard>
                                </div>

                                {/* ANALYTICS DASHBOARD */}
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                                        <BarChart2 className="w-8 h-8 mr-4 text-pink-500" />
                                        Performance Live
                                    </h2>
                                    <GlassCard>
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <StatCard icon={Users} label="Total Reach" value="1.2M" trend="+24%" />
                                            <StatCard icon={Repeat} label="Engagement" value="8.5%" trend="+1.2%" />
                                            <StatCard icon={Linkedin} label="LinkedIn" value="45k" trend="+5%" />
                                            <StatCard icon={Instagram} label="Instagram" value="120k" trend="+12%" />
                                        </div>
                                        <div className="h-40 bg-black/40 rounded-xl border border-white/10 flex items-center justify-center text-gray-500 text-xs">
                                            [Live Metricool Graph Integration]
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
