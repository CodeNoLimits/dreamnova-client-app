'use client';

import React, { useState } from 'react';
import {
    Music,
    Play,
    Mic2,
    Radio,
    Globe,
    Headphones,
    BarChart2,
    Zap,
    ChevronDown,
    Pause,
    ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { LanguageSelector } from '@/components/ui/LanguageSelector';

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

const MusicPlayer = () => {
    const [playing, setPlaying] = useState(false);
    return (
        <div className="bg-black/40 rounded-xl p-4 border border-white/10 flex items-center space-x-4">
            <button
                onClick={() => setPlaying(!playing)}
                className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center hover:bg-purple-400 transition-colors"
            >
                {playing ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-1" />}
            </button>
            <div className="flex-1">
                <div className="text-xs text-gray-400 mb-1">Now Playing: Nanach Frequency (AI Gen)</div>
                <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-purple-500"
                        initial={{ width: "0%" }}
                        animate={{ width: playing ? "100%" : "0%" }}
                        transition={{ duration: 30, ease: "linear" }}
                    />
                </div>
            </div>
            <div className="text-xs font-mono text-purple-400">0:42 / 3:15</div>
        </div>
    );
};

export default function TetraBramePage() {
    const { lang } = useLanguage();
    const t = translations[lang].music;
    const common = translations[lang].common;

    return (
        <div className="min-h-screen bg-[#05050A] text-gray-100 font-sans selection:bg-cyan-500/30 pb-40">

            {/* HEADER */}
            <nav className="relative z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto border-b border-white/5 bg-[#05050A]/90 backdrop-blur-md sticky top-0">
                <div className="flex items-center space-x-2">
                    <Music className="w-6 h-6 text-cyan-500" />
                    <span className="text-xl font-bold tracking-tight">Tetra<span className="text-cyan-500">Brame</span></span>
                </div>
                <div className="flex items-center space-x-4">
                    <LanguageSelector />
                    <Link href="/" className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest">{common.backToHub}</Link>
                </div>
            </nav>

            <main className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-10">

                {/* HERO SECTION */}
                <div className="text-center mb-24 relative">
                    <div className="inline-flex items-center px-3 py-1 border border-cyan-500/30 bg-cyan-900/10 text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-8 animate-pulse">
                        <Radio className="w-3 h-3 mr-2" />
                        {t.tagline}
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tight leading-tight uppercase font-serif">
                        {t.heroTitle}
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed mb-12">
                        {t.heroSubtitle}
                    </p>

                    <div className="flex flex-col items-center gap-6 max-w-xl mx-auto">
                        <NeonButton className="w-full sm:w-auto px-12 py-4 text-lg">
                            <Play className="mr-2 w-6 h-6 fill-current" /> {t.buttons.studio}
                        </NeonButton>
                        <a
                            href="https://bucolic-twilight-0349cd.netlify.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto"
                        >
                            <NeonButton variant="cyan" className="w-full px-12 py-4 text-lg">
                                <ExternalLink className="mr-2 w-6 h-6" /> {t.buttons.explore}
                            </NeonButton>
                        </a>
                    </div>
                </div>

                {/* VISUALIZER / HERO IMAGE */}
                <div className="relative max-w-5xl mx-auto mb-32 group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black aspect-video flex items-center justify-center">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-screen"></div>
                        <div className="relative z-10 text-center">
                            <h2 className="text-4xl font-bold text-white mb-2 tracking-widest uppercase">{t.heroImage.title}</h2>
                            <p className="text-cyan-400 font-mono text-sm">{t.heroImage.subtitle}</p>
                        </div>
                        {/* Fake Visualizer Bars */}
                        <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-center gap-1 px-8 pb-8 opacity-50">
                            {[...Array(40)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-2 bg-cyan-500 rounded-t-sm"
                                    animate={{ height: [20, Math.random() * 100 + 20, 20] }}
                                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", delay: i * 0.05 }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* FEATURES GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                    {/* STUDIO */}
                    <GlassCard className="border-cyan-500/20">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-bold text-white flex items-center">
                                <Mic2 className="w-6 h-6 mr-3 text-cyan-500" /> {t.studio.title}
                            </h3>
                            <div className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-bold rounded-full uppercase">Beta</div>
                        </div>
                        <div className="space-y-6">
                            <div className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-colors cursor-pointer group">
                                <div className="font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{t.studio.generator.title}</div>
                                <p className="text-xs text-gray-400">{t.studio.generator.desc}</p>
                            </div>
                            <div className="h-16 bg-black rounded-lg border border-white/10 flex items-center px-4 justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                    <span className="text-xs font-mono text-gray-400">{t.studio.player}</span>
                                </div>
                                <div className="flex space-x-2">
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer"><Play className="w-3 h-3 fill-white" /></div>
                                </div>
                            </div>
                            <a href="/documents/Content_Multiplication_Engine.pdf" target="_blank" className="block text-center text-xs text-cyan-500 hover:text-cyan-400 transition-colors border-t border-white/5 pt-4">
                                Download Engine Architecture (PDF)
                            </a>
                        </div>
                    </GlassCard>

                    {/* DISTRIBUTION */}
                    <GlassCard className="border-purple-500/20">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-bold text-white flex items-center">
                                <Globe className="w-6 h-6 mr-3 text-purple-500" /> {t.distribution.title}
                            </h3>
                            <div className="px-3 py-1 bg-purple-500/10 text-purple-400 text-xs font-bold rounded-full uppercase">Live</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="text-center p-4 bg-white/5 rounded-xl">
                                <div className="text-2xl font-bold text-white">1,240</div>
                                <div className="text-[10px] text-gray-500 uppercase mt-1">{t.distribution.stats.tracks}</div>
                            </div>
                            <div className="text-center p-4 bg-white/5 rounded-xl">
                                <div className="text-2xl font-bold text-white">8.5M</div>
                                <div className="text-[10px] text-gray-500 uppercase mt-1">{t.distribution.stats.streams}</div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-xs text-gray-500 uppercase font-bold mb-2">{t.distribution.channels}</div>
                            <div className="flex flex-wrap gap-2">
                                {['Spotify', 'Apple Music', 'YouTube', 'TikTok', 'Instagram'].map((platform) => (
                                    <span key={platform} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-300">{platform}</span>
                                ))}
                            </div>
                        </div>
                    </GlassCard>
                </div>

            </main>
        </div>
    );
}
