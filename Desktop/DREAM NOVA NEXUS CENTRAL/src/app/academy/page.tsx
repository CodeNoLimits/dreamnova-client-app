'use client';

import React from 'react';
import {
    CheckCircle2,
    Zap,
    GraduationCap,
    ArrowRight,
    Shield,
    Code2,
    Palette
} from 'lucide-react';
import Link from 'next/link';
import AdminToolbar from '@/components/admin/AdminToolbar';
import { useAdminStore } from '@/lib/store';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

export default function AcademyPage() {
    const { isAdmin } = useAdminStore();
    const { lang } = useLanguage();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const t = (translations[lang] as any).academy;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const common = (translations[lang] as any).common;

    return (
        <div className={`h-screen overflow-y-auto bg-[#05050A] text-white font-sans pb-40 ${lang === 'he' ? 'rtl' : 'ltr'}`}>
            {isAdmin && (
                <div className="sticky top-0 z-[60]">
                    <AdminToolbar actions={[
                        { label: t.admin.students, href: '#' },
                        { label: t.admin.course, href: '#' }
                    ]} />
                </div>
            )}

            {/* Navigation */}
            <nav className="p-6 flex justify-between items-center border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0 z-40">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-lg tracking-tight">DreamNova Academy</span>
                </div>
                <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
                    {common.backToHub}
                </Link>
            </nav>

            {/* Hero Section */}
            <section className="relative py-20 px-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] -z-10" />

                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <Shield className="w-4 h-4" />
                        <span>{t.tagline}</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                        {t.heroTitle} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600">{t.heroSubtitle}</span>
                    </h1>
                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                        {t.heroDesc}
                    </p>
                </div>

                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                    {/* STARTER */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all">
                        <h3 className="text-xl font-bold text-white mb-2">Starter / Protection</h3>
                        <div className="text-4xl font-black text-white mb-4">97€ <span className="text-sm font-normal text-gray-500">/ mois</span></div>
                        <p className="text-sm text-gray-400 mb-6">Les bases du code et de la cybersécurité pour les 10-14 ans.</p>
                        <ul className="space-y-3 mb-8 text-sm text-gray-300">
                            <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> Python & Logic</li>
                            <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> Cyber-Hygiene</li>
                            <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> Community Access</li>
                        </ul>
                        <button className="w-full py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors">
                            {t.cta}
                        </button>
                    </div>

                    {/* AGENCY / VENTURE */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-gradient-to-bl from-orange-500/20 to-transparent w-32 h-32 rounded-bl-full -mr-10 -mt-10" />
                        <h3 className="text-xl font-bold text-white mb-2">Agency / Venture</h3>
                        <div className="text-4xl font-black text-white mb-4">2997€ <span className="text-sm font-normal text-gray-500">/ one-shot</span></div>
                        <p className="text-sm text-gray-400 mb-6">Complete Business-in-a-Box (Antigravity Stack).</p>
                        <ul className="space-y-3 mb-8 text-sm text-gray-300">
                            <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> Full Tech Stack</li>
                            <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> White Label Rights</li>
                            <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> 1-on-1 Mentorship</li>
                        </ul>
                        <button className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors">
                            {t.cta}
                        </button>
                    </div>
                </div>
            </section>

            {/* SOCIAL PROOF / CURRICULUM TEASER */}
            <section className="py-12 px-6">
                <div className="max-w-5xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-12 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold text-white mb-8">Ce que vous allez construire</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
                            {[
                                "Agents de Support 24/7",
                                "Clones Vocaux (ElevenLabs)",
                                "Systèmes CRM Autonomes",
                                "Funnels de Vente Automatisés"
                            ].map((item, i) => (
                                <div key={i} className="p-4 bg-black/40 rounded-xl border border-white/5 flex items-center">
                                    <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center mr-3">
                                        <Zap className="w-4 h-4 text-yellow-400" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-200">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
