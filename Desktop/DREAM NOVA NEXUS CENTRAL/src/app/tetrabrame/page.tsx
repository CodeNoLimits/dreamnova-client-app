'use client';

import React from 'react';
import {
    Music,
    Radio,
    Video,
    Globe,
    DollarSign,
    Users,
    TrendingUp,
    Mic2
} from 'lucide-react';
import Link from 'next/link';
import { AdminToolbar } from '@/components/admin/AdminToolbar';
import { useAdminStore } from '@/lib/store';

export default function TetraBramePage() {
    const { isAdmin } = useAdminStore();

    return (
        <div className="h-screen overflow-y-auto bg-[#05050A] text-gray-100 font-sans pb-40 overflow-x-hidden">
            {isAdmin && (
                <div className="sticky top-0 z-[60]">
                    <AdminToolbar actions={[
                        { label: 'Suno Dashboard', href: 'https://suno.com' },
                        { label: 'DistroKid', href: 'https://distrokid.com' }
                    ]} />
                </div>
            )}

            {/* Background FX */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px] opacity-40"></div>
                <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[150px] opacity-30"></div>
                {/* Sound Wave Pattern */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/sound-waves.png')] opacity-10"></div>
            </div>

            {/* Nav */}
            <nav className="relative z-50 p-6 flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center space-x-2">
                    <Music className="w-6 h-6 text-purple-400" />
                    <span className="text-xl font-bold">Tetra<span className="font-light text-purple-300">Brame</span></span>
                </div>
                <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">Retour au Hub</Link>
            </nav>

            <main className="relative z-10 max-w-7xl mx-auto px-4 mt-10">

                {/* HERO SECTION */}
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <Mic2 className="w-4 h-4" />
                        <span>AI Music Factory</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-white">
                        L&apos;Usine Musicale <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">Automatisée</span>
                    </h1>
                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                        Production industrielle de musique spirituelle assistée par IA.
                        Une machine à Hafatsa qui génère des revenus passifs perpétuels.
                    </p>
                </div>

                {/* Stats Grid */}
                <section className="py-10 px-6">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-[#0f0f13] border border-white/10 rounded-3xl p-8 flex items-center space-x-4">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                                <Music className="w-6 h-6 text-purple-400" />
                            </div>
                            <div>
                                <div className="text-3xl font-black text-white">400+</div>
                                <div className="text-xs text-gray-400 uppercase">Titres Prêts</div>
                            </div>
                        </div>
                        <div className="bg-[#0f0f13] border border-white/10 rounded-3xl p-8 flex items-center space-x-4">
                            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-green-400" />
                            </div>
                            <div>
                                <div className="text-3xl font-black text-white">100%</div>
                                <div className="text-xs text-gray-400 uppercase">Marge (Digital)</div>
                            </div>
                        </div>
                        <div className="bg-[#0f0f13] border border-white/10 rounded-3xl p-8 flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                                <Globe className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <div className="text-3xl font-black text-white">Global</div>
                                <div className="text-xs text-gray-400 uppercase">Distribution</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tech Stack */}
                <section className="py-20 px-6 bg-white/5 rounded-3xl border border-white/5 mt-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-12 text-white">La Technologie</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-8 bg-black/40 rounded-3xl border border-white/10">
                                <h3 className="text-xl font-bold text-white mb-2">Suno Pro AI</h3>
                                <p className="text-gray-400">Génération instrumentale et vocale de haute fidélité.</p>
                            </div>
                            <div className="p-8 bg-black/40 rounded-3xl border border-white/10">
                                <h3 className="text-xl font-bold text-white mb-2">Human Lyrics</h3>
                                <p className="text-gray-400">Paroles écrites par des humains pour garantir la profondeur spirituelle et le Copyright.</p>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}
