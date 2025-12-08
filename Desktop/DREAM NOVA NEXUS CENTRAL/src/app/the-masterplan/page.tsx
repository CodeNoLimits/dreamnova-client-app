'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    Crown,
    Briefcase,
    ChevronDown,
    Star,
    Shield,
    Sword
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
        gold: 'from-amber-400 to-yellow-600 shadow-amber-500/30',
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

// --- TEAM MEMBER CARD ---
const TeamMember = ({ name, role, image, icon: Icon }: { name: string, role: string, image: string, icon: any }) => (
    <GlassCard className="text-center group hover:bg-white/10 transition-colors">
        <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-amber-500/50 group-hover:border-amber-400 transition-colors">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}></div>
        </div>
        <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
        <p className="text-amber-500 text-sm uppercase tracking-widest mb-4">{role}</p>
        <div className="flex justify-center space-x-2 opacity-50 group-hover:opacity-100 transition-opacity">
            <Icon className="w-5 h-5 text-gray-400" />
        </div>
    </GlassCard>
);

export default function TheMasterplanPage() {
    const [showAppLayer, setShowAppLayer] = useState(false);

    return (
        <div className="h-screen overflow-y-auto bg-[#05050A] text-gray-100 font-sans selection:bg-amber-500/30 pb-40">

            {/* HEADER */}
            <nav className="relative z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto border-b border-white/5 bg-[#05050A]/90 backdrop-blur-md sticky top-0">
                <div className="flex items-center space-x-2">
                    <Crown className="w-6 h-6 text-amber-500" />
                    <span className="text-xl font-bold tracking-tight">The <span className="text-amber-500">Masterplan</span></span>
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
                            <div className="inline-flex items-center px-3 py-1 border border-amber-500/30 bg-amber-900/10 text-amber-400 text-xs font-bold tracking-[0.2em] uppercase mb-8">
                                <Users className="w-3 h-3 mr-2" />
                                The Council
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tight leading-tight">
                                LE NOYAU <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-500 to-orange-500 animate-pulse">DUR</span>.
                            </h1>
                            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed mb-12">
                                Une alliance d&apos;élite. Visionnaires, Technologues, Stratèges.<br />
                                Nous ne construisons pas une entreprise. Nous construisons un empire.
                            </p>

                            <div className="flex justify-center">
                                <NeonButton onClick={() => setShowAppLayer(true)}>
                                    Rencontrer le Conseil <ChevronDown className="ml-2 w-5 h-5 animate-bounce" />
                                </NeonButton>
                            </div>
                        </motion.div>
                    </div>

                    {/* HERO IMAGE PLACEHOLDER */}
                    {/* PROMPT: A round table of futuristic silhouettes in a high-tech war room, overlooking a holographic map of the world, golden lighting. */}
                    <div className="relative w-full h-[400px] rounded-3xl overflow-hidden border border-white/10 group">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#05050A] z-10"></div>
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-1000"></div>
                        <div className="absolute bottom-10 left-10 z-20">
                            <h3 className="text-2xl font-bold text-white mb-2">Meritocratie Absolue.</h3>
                            <p className="text-gray-400">Seuls les résultats comptent.</p>
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
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                                <TeamMember
                                    name="Dan Benamran"
                                    role="Architecte Suprême"
                                    image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop"
                                    icon={Crown}
                                />
                                <TeamMember
                                    name="Sarah Cohen"
                                    role="Head of Growth"
                                    image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop"
                                    icon={TrendingUp}
                                />
                                <TeamMember
                                    name="David Levy"
                                    role="CTO & AI Lead"
                                    image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop"
                                    icon={Code}
                                />
                                <TeamMember
                                    name="Rachel Azoulay"
                                    role="Chief Legal Officer"
                                    image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop"
                                    icon={Shield}
                                />
                            </div>

                            <div className="text-center">
                                <h2 className="text-3xl font-bold text-white mb-8">Rejoignez la Légion</h2>
                                <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                                    Nous recrutons les 1% des meilleurs talents. Développeurs, Designers, Marketers.<br />
                                    Si vous êtes prêt à travailler plus dur que jamais pour construire quelque chose de grand.
                                </p>
                                <NeonButton variant="white">
                                    Postuler (Top Secret)
                                </NeonButton>
                            </div>

                        </motion.section>
                    )}
                </AnimatePresence>

            </main>
        </div>
    );
}

function TrendingUp({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
    );
}

function Code({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
    );
}
