'use client';

import React from 'react';
import {
    Heart,
    Globe,
    BookOpen,
    ArrowRight,
    Gift
} from 'lucide-react';
import Link from 'next/link';
import { AdminToolbar } from '@/components/admin/AdminToolbar';
import { useAdminStore } from '@/lib/store';

export default function NovaFoundationPage() {
    const { isAdmin } = useAdminStore();

    return (
        <div className="h-screen overflow-y-auto bg-[#05050A] text-gray-100 font-sans pb-40">
            {isAdmin && (
                <div className="sticky top-0 z-[60]">
                    <AdminToolbar actions={[
                        { label: 'Donation Ledger', href: '#' },
                        { label: 'Impact Report', href: '#' }
                    ]} />
                </div>
            )}

            {/* Navigation */}
            <nav className="p-6 flex justify-between items-center border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0 z-40">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center">
                        <Heart className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-lg tracking-tight">The Nova Foundation</span>
                </div>
                <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Back to Hub
                </Link>
            </nav>

            {/* Hero Section */}
            <section className="relative py-20 px-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] -z-10" />

                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <Gift className="w-4 h-4" />
                        <span>Philanthropic Engine</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                        Le Cœur du <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-600">Réacteur</span>
                    </h1>
                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                        Une structure dédiée à la réception et à la redistribution des profits du Venture Studio
                        pour la Hafatsa mondiale.
                    </p>
                </div>
            </section>

            {/* Impact Metrics */}
            <section className="py-10 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#0f0f13] border border-white/10 rounded-3xl p-8 flex items-center space-x-4">
                        <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-teal-400" />
                        </div>
                        <div>
                            <div className="text-3xl font-black text-white">1M+</div>
                            <div className="text-xs text-gray-400 uppercase">Livres Imprimés</div>
                        </div>
                    </div>
                    <div className="bg-[#0f0f13] border border-white/10 rounded-3xl p-8 flex items-center space-x-4">
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                            <Globe className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div>
                            <div className="text-3xl font-black text-white">12</div>
                            <div className="text-xs text-gray-400 uppercase">Pays Touchés</div>
                        </div>
                    </div>
                    <div className="bg-[#0f0f13] border border-white/10 rounded-3xl p-8 flex items-center space-x-4">
                        <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center">
                            <Heart className="w-6 h-6 text-cyan-400" />
                        </div>
                        <div>
                            <div className="text-3xl font-black text-white">100%</div>
                            <div className="text-xs text-gray-400 uppercase">Non-Profit</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Statement */}
            <section className="py-20 px-6 bg-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">Notre Mission</h2>
                    <p className="text-xl text-gray-300 leading-relaxed mb-12">
                        "Nous utilisons la technologie et l'entrepreneuriat non pas pour accumuler des richesses,
                        mais pour générer les ressources nécessaires à la diffusion de la sagesse qui guérit le monde."
                    </p>
                    <div className="inline-block p-6 border border-white/10 rounded-2xl bg-black/40">
                        <p className="font-mono text-sm text-teal-400">DAF (Donor Advised Fund) Structure</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
