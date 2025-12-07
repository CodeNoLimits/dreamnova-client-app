'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { useAdminStore } from '@/lib/store';
import AdminToolbar from '@/components/admin/AdminToolbar';
import LeadsModule from '@/components/modules/LeadsModule';

export default function HaMazonPage() {
    const { lang } = useLanguage();
    const t = translations[lang];
    const { isAdmin } = useAdminStore();

    return (
        <div className={`min-h-screen bg-[#05050A] text-gray-100 font-sans pb-20 overflow-x-hidden ${lang === 'he' ? 'rtl' : 'ltr'}`}>

            {/* ADMIN HUD */}
            {isAdmin && <AdminToolbar />}

            {/* Background FX */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-1/2 w-[600px] h-[600px] bg-yellow-600/20 rounded-full blur-[150px] opacity-40"></div>
                <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-orange-900/10 rounded-full blur-[150px] opacity-30"></div>
            </div>

            {/* Nav */}
            <nav className="relative z-50 p-6 flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center space-x-2">
                    <ShoppingCart className="w-6 h-6 text-yellow-500" />
                    <span className="text-xl font-bold">Ha-<span className="text-yellow-500">Mazon</span></span>
                </div>
                <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">Retour au Hub</Link>
            </nav>

            <main className="relative z-10 max-w-7xl mx-auto px-4 mt-10">

                {/* HERO */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-300 text-xs font-bold tracking-widest uppercase mb-6">
                        Urban Logistics Infrastructure
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                        LA LOGISTIQUE DE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">GUERRE URBAINE.</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                        Micro-Hubs autonomes. Flotte électrique. Domination du dernier kilomètre.
                    </p>
                </div>

                {/* LEADS MODULE (ZFE / TICKER) */}
                <LeadsModule />

            </main>
        </div>
    );
}
