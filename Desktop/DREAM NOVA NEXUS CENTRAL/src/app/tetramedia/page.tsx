'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Video,
    Film,
    Scissors,
    Play,
    Upload,
    ChevronDown,
    Clapperboard,
    MonitorPlay
} from 'lucide-react';
import Link from 'next/link';

// --- NANO BANANA PRO COMPONENTS ---

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl ${className}`}>
        {children}
    </div>
);

const NeonButton = ({ children, onClick, variant = 'red', className = "" }: { children: React.ReactNode, onClick?: () => void, variant?: 'red' | 'purple', className?: string }) => {
    const gradients = {
        red: 'from-red-600 to-rose-600 shadow-red-500/30',
        purple: 'from-purple-600 to-indigo-600 shadow-purple-500/30'
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

// --- VIDEO SLICER SIMULATION ---
const VideoSlicer = () => {
    const [slicing, setSlicing] = useState(false);

    return (
        <div className="relative h-64 bg-black/40 rounded-xl border border-white/10 overflow-hidden flex flex-col">
            {/* Timeline */}
            <div className="flex-1 flex items-center justify-center relative">
                <div className="absolute inset-0 flex items-center px-4 space-x-1 opacity-50">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="h-12 w-full bg-gray-800 rounded-sm"></div>
                    ))}
                </div>
                {slicing && (
                    <motion.div
                        className="absolute inset-y-0 w-1 bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)] z-10"
                        animate={{ left: ["0%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                )}
                {!slicing ? (
                    <button
                        onClick={() => setSlicing(true)}
                        className="z-20 px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg flex items-center transition-colors"
                    >
                        <Scissors className="w-5 h-5 mr-2" /> Start Slicing
                    </button>
                ) : (
                    <div className="z-20 bg-black/80 px-4 py-2 rounded text-red-500 font-mono text-sm animate-pulse border border-red-500/30">
                        PROCESSING...
                    </div>
                )}
            </div>

            {/* Tracks */}
            <div className="h-16 bg-gray-900 border-t border-white/5 flex flex-col justify-center px-2 space-y-1">
                <div className="h-2 bg-blue-500/30 rounded-full w-full"></div>
                <div className="h-2 bg-green-500/30 rounded-full w-3/4"></div>
            </div>
        </div>
    );
};

export default function TetramediaPage() {
    const [showAppLayer, setShowAppLayer] = useState(false);

    return (
        <div className="h-screen overflow-y-auto bg-[#05050A] text-gray-100 font-sans selection:bg-red-500/30 pb-40">

            {/* HEADER */}
            <nav className="relative z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto border-b border-white/5 bg-[#05050A]/90 backdrop-blur-md sticky top-0">
                <div className="flex items-center space-x-2">
                    <Film className="w-6 h-6 text-red-500" />
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
                                <Clapperboard className="w-3 h-3 mr-2" />
                                Netflix-Quality Production
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tight leading-tight">
                                VOTRE HISTOIRE.<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 animate-pulse">QUALITÉ CINÉMA.</span>
                            </h1>
                            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed mb-12">
                                Production vidéo augmentée par IA. Montage automatique.<br />
                                Du script à l&apos;écran en un temps record.
                            </p>

                            <div className="flex justify-center">
                                <NeonButton onClick={() => setShowAppLayer(true)}>
                                    Entrer en Salle de Montage <ChevronDown className="ml-2 w-5 h-5 animate-bounce" />
                                </NeonButton>
                            </div>
                        </motion.div>
                    </div>

                    {/* HERO IMAGE PLACEHOLDER */}
                    {/* PROMPT: Cinematic shot of a film set with robotic camera arms and holographic screens displaying video timelines, red and orange lighting. */}
                    <div className="relative w-full h-[400px] rounded-3xl overflow-hidden border border-white/10 group">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#05050A] z-10"></div>
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579165466741-7f35a4755657?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-1000"></div>
                        <div className="absolute bottom-10 left-10 z-20">
                            <h3 className="text-2xl font-bold text-white mb-2">OpusClip & Premiere Pro AI.</h3>
                            <p className="text-gray-400">Le montage n&apos;est plus une corvée.</p>
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

                                {/* SLICER TOOL */}
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                                        <Scissors className="w-8 h-8 mr-4 text-red-500" />
                                        AI Slicer
                                    </h2>
                                    <GlassCard className="border-red-500/30">
                                        <div className="mb-6 flex justify-between items-center">
                                            <h3 className="text-xl font-bold text-white">Auto-Cut Engine</h3>
                                            <div className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded-full">BETA</div>
                                        </div>
                                        <p className="text-sm text-gray-400 mb-6">
                                            Transformez 1h de podcast en 10 clips viraux (Shorts/Reels/TikTok) automatiquement.
                                            Détection des temps forts, recadrage intelligent, sous-titres auto.
                                        </p>

                                        <VideoSlicer />

                                        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                                            <div className="bg-black/40 p-3 rounded-lg border border-white/10">
                                                <div className="text-red-500 font-bold">9:16</div>
                                                <div className="text-xs text-gray-500">Vertical</div>
                                            </div>
                                            <div className="bg-black/40 p-3 rounded-lg border border-white/10">
                                                <div className="text-red-500 font-bold">4K</div>
                                                <div className="text-xs text-gray-500">Quality</div>
                                            </div>
                                            <div className="bg-black/40 p-3 rounded-lg border border-white/10">
                                                <div className="text-red-500 font-bold">SRT</div>
                                                <div className="text-xs text-gray-500">Subs</div>
                                            </div>
                                        </div>
                                    </GlassCard>
                                </div>

                                {/* UPLOAD & MANAGE */}
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                                        <MonitorPlay className="w-8 h-8 mr-4 text-red-500" />
                                        Media Center
                                    </h2>
                                    <GlassCard>
                                        <div className="border-2 border-dashed border-white/20 rounded-xl h-48 flex flex-col items-center justify-center mb-6 hover:border-red-500/50 hover:bg-white/5 transition-all cursor-pointer">
                                            <Upload className="w-10 h-10 text-gray-500 mb-4" />
                                            <span className="text-gray-400 font-bold">Drop RAW Files Here</span>
                                            <span className="text-xs text-gray-600 mt-2">.MP4, .MOV, .WAV (Max 5GB)</span>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                                                <div className="flex items-center">
                                                    <Video className="w-5 h-5 text-red-500 mr-3" />
                                                    <span className="text-sm text-white">Interview_CEO_V1.mp4</span>
                                                </div>
                                                <span className="text-xs text-green-500">Ready</span>
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                                                <div className="flex items-center">
                                                    <Video className="w-5 h-5 text-gray-500 mr-3" />
                                                    <span className="text-sm text-gray-400">Event_Recap_2024.mov</span>
                                                </div>
                                                <span className="text-xs text-yellow-500">Processing (45%)</span>
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
