'use client';

import React, { useState } from 'react';
import {
    BookOpen,
    Search,
    Library,
    Sparkles,
    ChevronDown,
    Brain,
    Scroll,
    ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '@ai-sdk/react';
import Link from 'next/link';

// --- COMPONENTS ---
const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl ${className}`}>
        {children}
    </div>
);

const NeonButton = ({ children, onClick, variant = 'amber', className = "" }: { children: React.ReactNode, onClick?: () => void, variant?: 'amber' | 'gold', className?: string }) => {
    const gradients = {
        amber: 'from-amber-600 to-orange-600 shadow-amber-500/30',
        gold: 'from-yellow-500 to-amber-600 shadow-yellow-500/30'
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

// --- RAG SEARCH COMPONENT ---
const RagSearch = () => {
    const chatHelpers = useChat({
        api: '/api/breslev-rag',
    } as any);
    const { messages, input, handleInputChange, handleSubmit, isLoading } = chatHelpers as any;

    return (
        <div className="h-[600px] flex flex-col bg-black/40 border border-white/10 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
                <div className="flex items-center">
                    <Brain className="w-5 h-5 text-amber-500 mr-2" />
                    <span className="font-bold text-white">Breslev AI Librarian</span>
                </div>
                <div className="text-xs text-gray-400">Index: 400+ Livres</div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.length === 0 && (
                    <div className="text-center text-gray-500 mt-20">
                        <Library className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Posez une question existentielle.</p>
                        <p className="text-xs mt-2">Ex: "Comment trouver la joie dans l'épreuve ?"</p>
                    </div>
                )}
                {messages.map((m: any) => (
                    <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-4 rounded-2xl ${m.role === 'user' ? 'bg-amber-600 text-white' : 'bg-white/10 text-gray-200'}`}>
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white/10 p-4 rounded-2xl">
                            <Sparkles className="w-5 h-5 text-amber-500 animate-spin" />
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-white/5">
                <div className="relative">
                    <input
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Interrogez la Sagesse..."
                        className="w-full bg-black/50 border border-white/10 rounded-xl pl-4 pr-12 py-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                    />
                    <button type="submit" className="absolute right-2 top-2 p-2 bg-amber-500 rounded-lg hover:bg-amber-400 transition-colors">
                        <ArrowRight className="w-5 h-5 text-black" />
                    </button>
                </div>
            </form>
        </div>
    );
};

import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { LanguageSelector } from '@/components/ui/LanguageSelector';

// ... (keep existing imports)

export default function BreslevBooksPage() {
    const [showAppLayer, setShowAppLayer] = useState(false);
    const { lang } = useLanguage();
    const t = translations[lang].breslev;
    const common = translations[lang].common;

    return (
        <div className="h-screen overflow-y-auto bg-[#05050A] text-gray-100 font-sans selection:bg-amber-500/30 pb-40">

            {/* HEADER */}
            <nav className="relative z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto border-b border-white/5 bg-[#05050A]/90 backdrop-blur-md sticky top-0">
                <div className="flex items-center space-x-2">
                    <BookOpen className="w-6 h-6 text-amber-500" />
                    <span className="text-xl font-bold tracking-tight">Breslev <span className="text-amber-500">Books</span></span>
                </div>
                <div className="flex items-center space-x-4">
                    <LanguageSelector />
                    <Link href="/" className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest">{common.backToHub}</Link>
                </div>
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
                            <div className="inline-flex items-center px-3 py-1 border border-amber-500/30 bg-amber-900/10 text-amber-400 text-xs font-bold tracking-[0.2em] uppercase mb-8">
                                <Scroll className="w-3 h-3 mr-2" />
                                Universal Wisdom
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tight leading-tight">
                                L'INTELLIGENCE <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 animate-pulse">DE LA FOI</span>.
                            </h1>
                            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed mb-12">
                                Une bibliothèque vivante. 400 ans de sagesse accessibles en une seconde.
                                <br />Le "Google de l'Âme" pour la génération en quête de sens.
                            </p>

                            <div className="flex flex-col items-center gap-4">
                                <NeonButton onClick={() => setShowAppLayer(true)}>
                                    Ouvrir la Bibliothèque <ChevronDown className="ml-2 w-5 h-5 animate-bounce" />
                                </NeonButton>

                                <a href="https://chayei-moharan-ai-640844031185.us-west1.run.app" target="_blank" rel="noopener noreferrer">
                                    <button className="px-6 py-2 bg-white/5 hover:bg-white/10 text-amber-400 text-xs font-bold rounded-full transition-colors border border-amber-500/20 uppercase tracking-widest">
                                        {t.testApp}
                                    </button>
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* VIDEO: Sagesse & Startup */}
                    <div className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                        <video
                            src="/videos/DreamNova___Sagesse_&_Startup.mp4"
                            controls
                            className="w-full"
                        >
                            Votre navigateur ne supporte pas la lecture de vidéos.
                        </video>
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

                                {/* RAG SEARCH */}
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                                        <Search className="w-8 h-8 mr-4 text-amber-500" />
                                        Moteur de Recherche Sémantique
                                    </h2>
                                    <RagSearch />
                                </div>

                                {/* LIBRARY & SHOP */}
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                                        <Library className="w-8 h-8 mr-4 text-amber-500" />
                                        Librairie Digitale
                                    </h2>
                                    <GlassCard>
                                        <div className="space-y-6">
                                            <div className="flex items-center p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                                                <div className="w-16 h-20 bg-amber-900/50 rounded-lg mr-4 flex items-center justify-center border border-amber-500/30 group-hover:scale-105 transition-transform">
                                                    <BookOpen className="w-8 h-8 text-amber-500" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-white text-lg">Likoutey Moharan</h3>
                                                    <p className="text-sm text-gray-400">L'ouvrage fondamental de Rabbi Nahman.</p>
                                                </div>
                                                <div className="text-amber-400 font-bold">25€</div>
                                            </div>

                                            <div className="flex items-center p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                                                <div className="w-16 h-20 bg-blue-900/50 rounded-lg mr-4 flex items-center justify-center border border-blue-500/30 group-hover:scale-105 transition-transform">
                                                    <BookOpen className="w-8 h-8 text-blue-500" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-white text-lg">Sippourey Maassiot</h3>
                                                    <p className="text-sm text-gray-400">Les contes des temps anciens.</p>
                                                </div>
                                                <div className="text-blue-400 font-bold">18€</div>
                                            </div>

                                            <div className="flex items-center p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                                                <div className="w-16 h-20 bg-green-900/50 rounded-lg mr-4 flex items-center justify-center border border-green-500/30 group-hover:scale-105 transition-transform">
                                                    <BookOpen className="w-8 h-8 text-green-500" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-white text-lg">Conseils (Likutey Etzot)</h3>
                                                    <p className="text-sm text-gray-400">Guide pratique pour la vie quotidienne.</p>
                                                </div>
                                                <div className="text-green-400 font-bold">15€</div>
                                            </div>
                                        </div>
                                        <div className="mt-8 pt-6 border-t border-white/10 text-center">
                                            <NeonButton className="w-full">Accéder à la Boutique Complète</NeonButton>
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
