'use client';

import React, { useState } from 'react';
import {
    BookOpen,
    Search,
    Sparkles,
    Library,
    Globe,
    MessageCircle,
    X,
    Info
} from 'lucide-react';
import Link from 'next/link';

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl hover:bg-white/10 transition-all duration-300 ${className}`}>
        {children}
    </div>
);

export default function BreslevBooksPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '' });

    const handleAction = (title: string, message: string) => {
        setModalContent({ title, message });
        setShowModal(true);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSearching(true);
        // Simulate RAG search delay
        setTimeout(() => {
            setIsSearching(false);
            handleAction("Résultats de Recherche", `Recherche sémantique pour "${searchQuery}" simulée. Le moteur RAG est en cours d'indexation.`);
        }, 1500);
    };

    return (
        <div className="h-screen overflow-y-auto bg-[#05050A] text-gray-100 font-sans selection:bg-amber-500/30 pb-40">

            {/* BACKGROUND FX */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-amber-600/10 rounded-full blur-[150px] opacity-20"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-yellow-600/10 rounded-full blur-[120px] opacity-20"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-5"></div>
            </div>

            {/* HEADER */}
            <nav className="relative z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center space-x-2">
                    <BookOpen className="w-6 h-6 text-amber-400" />
                    <span className="text-xl font-bold tracking-tight">Breslev <span className="font-light text-amber-200">Books AI</span></span>
                </div>
                <Link href="/" className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">Retour au Hub</Link>
            </nav>

            <main className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-10">

                {/* HERO SECTION */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-bold tracking-widest uppercase mb-6">
                        <Sparkles className="w-3 h-3 mr-2 fill-current" />
                        Sagesse Ancienne × Intelligence Artificielle
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
                        LA SAGESSE UNIVERSELLE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">ACCESSIBLE À TOUS.</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed mb-10">
                        Une plateforme RAG (Retrieval-Augmented Generation) qui rend les enseignements de Rabbi Nachman instantanément accessibles, traduits et contextualisés.
                    </p>

                    {/* SEARCH DEMO */}
                    <div className="max-w-2xl mx-auto relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                        <form onSubmit={handleSearch} className="relative flex items-center bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl p-2 shadow-2xl">
                            <Search className="w-6 h-6 text-gray-400 ml-3" />
                            <input
                                type="text"
                                placeholder="Posez une question (ex: Comment trouver la joie ?)"
                                className="w-full bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 px-4 py-3 text-lg"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button
                                type="submit"
                                disabled={isSearching}
                                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg transition-colors flex items-center"
                            >
                                {isSearching ? (
                                    <span className="animate-spin mr-2">⏳</span>
                                ) : (
                                    <Sparkles className="w-5 h-5" />
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* FEATURES / KNOWLEDGE GRAPH */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-white">Le &quot;Knowledge Graph&quot; <span className="text-amber-400">Vivant</span>.</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Nous ne faisons pas que numériser des livres. Nous créons un graphe de connaissances interconnecté. Chaque concept (Joie, Foi, Simplicité) est lié à ses sources, ses paraboles et ses applications pratiques.
                        </p>

                        <div className="space-y-4">
                            <GlassCard className="flex items-start space-x-4">
                                <div className="p-2 bg-amber-500/20 rounded-lg"><Globe className="w-6 h-6 text-amber-400" /></div>
                                <div>
                                    <h3 className="font-bold text-white">Diffusion Virale</h3>
                                    <p className="text-sm text-gray-400">Génération automatique de shorts/reels à partir des meilleurs enseignements pour inonder les réseaux sociaux.</p>
                                </div>
                            </GlassCard>

                            <GlassCard className="flex items-start space-x-4">
                                <div className="p-2 bg-amber-500/20 rounded-lg"><MessageCircle className="w-6 h-6 text-amber-400" /></div>
                                <div>
                                    <h3 className="font-bold text-white">Avatar &quot;Sabba Yisroel&quot;</h3>
                                    <p className="text-sm text-gray-400">Un guide interactif bienveillant pour explorer les textes sans barrière de langue.</p>
                                </div>
                            </GlassCard>
                        </div>
                    </div>

                    {/* GRAPH VISUALIZATION (Abstract) */}
                    <div className="relative h-[400px] w-full">
                        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-yellow-500/10 rounded-3xl blur-3xl"></div>
                        <GlassCard className="h-full flex items-center justify-center relative overflow-hidden border-amber-500/20">
                            <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                            {/* Central Node */}
                            <div className="relative z-10 flex flex-col items-center animate-pulse">
                                <div className="w-20 h-20 rounded-full bg-amber-500/20 border border-amber-500 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                                    <BookOpen className="w-10 h-10 text-amber-400" />
                                </div>
                                <div className="mt-4 px-4 py-2 bg-black/60 rounded-full border border-amber-500/30 text-amber-200 text-sm font-mono">
                                    Likoutey Moharan
                                </div>
                            </div>

                            {/* Orbiting Nodes */}
                            <div className="absolute top-10 left-10 animate-bounce duration-[3000ms]">
                                <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-xs text-gray-300">Simcha (Joie)</div>
                            </div>
                            <div className="absolute bottom-20 right-10 animate-bounce duration-[4000ms]">
                                <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-xs text-gray-300">Emouna (Foi)</div>
                            </div>
                            <div className="absolute top-1/2 right-10 animate-bounce duration-[5000ms]">
                                <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-xs text-gray-300">Hitbodedout</div>
                            </div>

                            {/* Connection Lines */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                                <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="orange" strokeWidth="1" />
                                <line x1="50%" y1="50%" x2="80%" y2="80%" stroke="orange" strokeWidth="1" />
                                <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="orange" strokeWidth="1" />
                            </svg>
                        </GlassCard>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center pb-20">
                    <button
                        onClick={() => handleAction("Bibliothèque", "Accès à la bibliothèque numérique complète (Abonnement requis).")}
                        className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-all backdrop-blur-md flex items-center mx-auto"
                    >
                        <Library className="mr-2 w-5 h-5" /> Explorer la Bibliothèque
                    </button>
                </div>

            </main>

            {/* MODAL SYSTEM */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#0a0a0f] border border-white/10 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl relative animate-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-500/20">
                            <Info className="w-8 h-8 text-amber-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{modalContent.title}</h3>
                        <p className="text-gray-400 mb-6 text-sm">
                            {modalContent.message}
                        </p>
                        <button
                            onClick={() => setShowModal(false)}
                            className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
