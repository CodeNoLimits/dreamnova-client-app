'use client';

import React, { useState } from 'react';
import {
    ChevronRight,
    ChevronLeft,
    TrendingUp,
    Target,
    ShieldCheck,
    Globe,
    Briefcase,
    FileText,
    Users,
    Lock
} from 'lucide-react';
import Link from 'next/link';
import AdminToolbar from '@/components/admin/AdminToolbar';
import { useAdminStore } from '@/lib/store';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

// Composant Slide pour les transitions fluides
const Slide = ({ children, active }: { children: React.ReactNode, active: boolean }) => (
    <div className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${active ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-full scale-95 pointer-events-none'}`}>
        <div className="h-full w-full flex items-center justify-center p-8 md:p-20">
            {children}
        </div>
    </div>
);

export default function PitchDeckPage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = 4;
    const { isAdmin } = useAdminStore();
    const { lang } = useLanguage();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const t = (translations[lang] as any).pitch;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const common = (translations[lang] as any).common;

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

    const handleAction = (title: string, message: string) => {
        // Simple alert for now, or could use a modal if we added state for it
        alert(`${title}: ${message}`);
    };

    return (
        <div className={`min-h-screen bg-[#05050A] text-white overflow-hidden relative font-sans ${lang === 'he' ? 'rtl' : 'ltr'}`}>
            {isAdmin && (
                <div className="absolute top-0 left-0 right-0 z-[60]">
                    <AdminToolbar actions={[
                        { label: 'Data Room', onClick: () => handleAction('Data Room', 'Accès sécurisé ouvert.') },
                        { label: 'Cap Table', onClick: () => handleAction('Cap Table', 'Saba: 51%, David: 49%') },
                        { label: 'Contacter Berrebi', onClick: () => handleAction('Contact', 'Appel en cours...') }
                    ]} />
                </div>
            )}

            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
            </div>

            {/* Navigation */}
            <div className="absolute top-8 left-8 z-50">
                <Link href="/" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                    <ChevronLeft className={`w-5 h-5 ${lang === 'he' ? 'rotate-180' : ''}`} />
                    <span className="text-sm font-medium tracking-widest uppercase">{common.backToHub}</span>
                </Link>
            </div>

            {/* Slides Container */}
            <div className="relative w-full h-screen">

                {/* SLIDE 1: THE MISSION (SABA VS DAVID) */}
                <Slide active={currentSlide === 0}>
                    <div className="max-w-4xl w-full text-center">
                        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-widest mb-8">
                            <Target className="w-4 h-4" />
                            <span>{t.slide1.tagline}</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                            {t.slide1.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">$63M</span> {t.slide1.vision}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                            {t.slide1.subtitle}
                            <br /><span className="text-white font-bold">{t.slide1.goal}</span>
                        </p>

                        {/* Video Placeholder */}
                        <div className="w-full aspect-video bg-black/40 border border-white/10 rounded-3xl flex items-center justify-center relative overflow-hidden group cursor-pointer">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="text-center">
                                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md border border-white/20 group-hover:scale-110 transition-transform">
                                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                                </div>
                                <p className="text-sm text-gray-400 font-mono uppercase tracking-widest">{t.slide1.watchVideo}</p>
                            </div>
                        </div>
                    </div>
                </Slide>

                {/* SLIDE 2: STRUCTURE DAF */}
                <Slide active={currentSlide === 1}>
                    <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-6">{t.slide2.title}</h2>
                            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                {t.slide2.desc}
                            </p>
                            <ul className="space-y-6">
                                <li className="flex items-start space-x-4">
                                    <div className="p-2 bg-blue-500/20 rounded-lg"><Briefcase className="w-6 h-6 text-blue-400" /></div>
                                    <div>
                                        <h4 className="font-bold text-white">{t.slide2.holding}</h4>
                                        <p className="text-sm text-gray-400">{t.slide2.holdingDesc}</p>
                                    </div>
                                </li>
                                <li className="flex items-start space-x-4">
                                    <div className="p-2 bg-green-500/20 rounded-lg"><Globe className="w-6 h-6 text-green-400" /></div>
                                    <div>
                                        <h4 className="font-bold text-white">{t.slide2.foundation}</h4>
                                        <p className="text-sm text-gray-400">{t.slide2.foundationDesc}</p>
                                    </div>
                                </li>
                                <li className="flex items-start space-x-4">
                                    <div className="p-2 bg-red-500/20 rounded-lg"><Lock className="w-6 h-6 text-red-400" /></div>
                                    <div>
                                        <h4 className="font-bold text-white">{t.slide2.trust}</h4>
                                        <p className="text-sm text-gray-400">{t.slide2.trustDesc}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 relative h-full flex flex-col justify-center">
                            {/* Visual representation of the flow */}
                            <div className="flex flex-col items-center space-y-4">
                                <div className="w-48 p-4 bg-blue-900/40 border border-blue-500/50 rounded-xl text-center font-bold text-blue-300">
                                    HOLDING (Profits)
                                </div>
                                <div className="h-8 w-px bg-white/20"></div>
                                <div className="flex w-full justify-between px-4">
                                    <div className="w-px h-8 bg-white/20"></div>
                                    <div className="w-px h-8 bg-white/20"></div>
                                </div>
                                <div className="flex w-full justify-between gap-4">
                                    <div className="w-1/2 p-4 bg-green-900/40 border border-green-500/50 rounded-xl text-center font-bold text-green-300">
                                        FONDATION (51%)
                                    </div>
                                    <div className="w-1/2 p-4 bg-red-900/40 border border-red-500/50 rounded-xl text-center font-bold text-red-300">
                                        TRUST (49%)
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Slide>

                {/* SLIDE 3: THE ENGINE (VENTURE STUDIO) */}
                <Slide active={currentSlide === 2}>
                    <div className="max-w-6xl w-full">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold mb-4">{t.slide3.title}</h2>
                            <p className="text-gray-400">{t.slide3.subtitle}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* ENGINE */}
                            <div className="bg-[#0f0f13] border border-purple-500/30 rounded-3xl p-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-20"><TrendingUp className="w-24 h-24 text-purple-500" /></div>
                                <h3 className="text-2xl font-bold text-purple-400 mb-2">{t.slide3.engine}</h3>
                                <p className="text-white font-bold text-lg mb-4">DreamNova Consult</p>
                                <p className="text-gray-400 text-sm mb-6">{t.slide3.engineDesc}</p>
                                <div className="text-3xl font-black text-white">70% <span className="text-sm font-normal text-gray-500">Profits</span></div>
                            </div>

                            {/* FLOW */}
                            <div className="flex items-center justify-center">
                                <div className="w-full h-2 bg-gradient-to-r from-purple-500 to-green-500 rounded-full relative">
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#05050A] p-2 rounded-full border border-white/20">
                                        <ChevronRight className={`w-6 h-6 text-white ${lang === 'he' ? 'rotate-180' : ''}`} />
                                    </div>
                                </div>
                            </div>

                            {/* IMPACT */}
                            <div className="bg-[#0f0f13] border border-green-500/30 rounded-3xl p-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-20"><Globe className="w-24 h-24 text-green-500" /></div>
                                <h3 className="text-2xl font-bold text-green-400 mb-2">{t.slide3.impact}</h3>
                                <p className="text-white font-bold text-lg mb-4">The Nova Foundation</p>
                                <p className="text-gray-400 text-sm mb-6">{t.slide3.impactDesc}</p>
                                <div className="text-3xl font-black text-white">$63M <span className="text-sm font-normal text-gray-500">Target</span></div>
                            </div>
                        </div>
                    </div>
                </Slide>

                {/* SLIDE 4: CALL TO ACTION */}
                <Slide active={currentSlide === 3}>
                    <div className="max-w-3xl w-full text-center">
                        <h2 className="text-5xl font-black mb-8">{t.slide4.title}</h2>
                        <p className="text-xl text-gray-400 mb-12">
                            {t.slide4.subtitle}
                        </p>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                            <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors w-full md:w-auto">
                                {t.slide4.cta1}
                            </button>
                            <button className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-colors w-full md:w-auto">
                                {t.slide4.cta2}
                            </button>
                        </div>
                    </div>
                </Slide>

            </div>

            {/* Controls */}
            <div className="absolute bottom-24 left-0 w-full p-8 flex justify-between items-end z-50">
                <div className="text-gray-600 font-mono text-xs">
                    {currentSlide + 1} / {totalSlides}
                </div>
                <div className="flex space-x-4">
                    <button
                        onClick={prevSlide}
                        disabled={currentSlide === 0}
                        className="p-4 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 border border-white/10 transition-all"
                    >
                        <ChevronLeft className={`w-6 h-6 ${lang === 'he' ? 'rotate-180' : ''}`} />
                    </button>
                    <button
                        onClick={nextSlide}
                        disabled={currentSlide === totalSlides - 1}
                        className="p-4 rounded-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-30 disabled:bg-gray-800 text-black transition-all"
                    >
                        <ChevronRight className={`w-6 h-6 ${lang === 'he' ? 'rotate-180' : ''}`} />
                    </button>
                </div>
            </div>
        </div>
    );
}
