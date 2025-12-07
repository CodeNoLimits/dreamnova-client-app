'use client';

import React from 'react';
import Link from 'next/link';
import { Music } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { useAdminStore } from '@/lib/store';
import AdminToolbar from '@/components/admin/AdminToolbar';
import SocialSpiritModule from '@/components/modules/SocialSpiritModule';

export default function TetraBramePage() {
    const { lang } = useLanguage();
    const t = translations[lang];
    const { isAdmin } = useAdminStore();

    return (
        <div className={`min-h-screen bg-[#05050A] text-gray-100 font-sans pb-20 overflow-x-hidden ${lang === 'he' ? 'rtl' : 'ltr'}`}>

            {/* ADMIN HUD */}
            {isAdmin && <AdminToolbar />}

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
                <SocialSpiritModule />
            </main>
        </div>
    );
}
