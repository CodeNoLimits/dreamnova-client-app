'use client';

import React, { useState } from 'react';
import {
    ChevronRight,
    ChevronLeft,
    TrendingUp,
    Rocket,
    Sparkles
} from 'lucide-react';
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
    const { lang } = useLanguage();
    const t = translations[lang].pitchDeck;

    // SLIDE 1: TITLE
    const Slide1 = () => (
        <div className="text-center">
            <div className="inline-block px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-mono text-sm mb-8">
                {t.slide1.tag}
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">
                {t.slide1.title}<span className="text-cyan-400">{t.slide1.titleSuffix}</span>
            </h1>
            <p className="text-2xl text-gray-400 max-w-2xl mx-auto font-light">
                {t.slide1.subtitle}<br />
                <span className="text-white font-medium">{t.slide1.subtitle2}</span>
            </p>
        </div>
    );

    // SLIDE 2: THE PROBLEM
    const Slide2 = () => (
        <div className="max-w-4xl w-full">
            <h2 className="text-4xl font-bold text-white mb-12 flex items-center">
                <span className="text-red-500 mr-4">01.</span> {t.slide2.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-red-500/5 border border-red-500/20 p-8 rounded-3xl">
                    <h3 className="text-xl font-bold text-red-400 mb-4">{t.slide2.cards.void.title}</h3>
                    <p className="text-gray-400 text-sm">{t.slide2.cards.void.desc}</p>
                </div>
                <div className="bg-red-500/5 border border-red-500/20 p-8 rounded-3xl">
                    <h3 className="text-xl font-bold text-red-400 mb-4">{t.slide2.cards.logistics.title}</h3>
                    <p className="text-gray-400 text-sm">{t.slide2.cards.logistics.desc}</p>
                </div>
                <div className="bg-red-500/5 border border-red-500/20 p-8 rounded-3xl">
                    <h3 className="text-xl font-bold text-red-400 mb-4">{t.slide2.cards.b2b.title}</h3>
                    <p className="text-gray-400 text-sm">{t.slide2.cards.b2b.desc}</p>
                </div>
            </div>
        </div>
    );

    // SLIDE 3: THE SOLUTION (ECOSYSTEM)
    const Slide3 = () => (
        <div className="max-w-5xl w-full text-center">
            <h2 className="text-4xl font-bold text-white mb-12">
                <span className="text-cyan-500 mr-4">02.</span> {t.slide3.title}
            </h2>
            <div className="relative">
                {/* Central Hub */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl"></div>
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                        <div className="text-purple-400 font-bold mb-2">{t.slide3.nodes.consult.role}</div>
                        <div className="text-2xl font-bold text-white mb-1">{t.slide3.nodes.consult.title}</div>
                        <div className="text-xs text-gray-500">{t.slide3.nodes.consult.desc}</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                        <div className="text-orange-400 font-bold mb-2">{t.slide3.nodes.amazon.role}</div>
                        <div className="text-2xl font-bold text-white mb-1">{t.slide3.nodes.amazon.title}</div>
                        <div className="text-xs text-gray-500">{t.slide3.nodes.amazon.desc}</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                        <div className="text-pink-400 font-bold mb-2">{t.slide3.nodes.tera.role}</div>
                        <div className="text-2xl font-bold text-white mb-1">{t.slide3.nodes.tera.title}</div>
                        <div className="text-xs text-gray-500">{t.slide3.nodes.tera.desc}</div>
                    </div>
                </div>
            </div>
        </div>
    );

    // SLIDE 4: THE TEAM
    const Slide4 = () => (
        <div className="max-w-6xl w-full">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">
                <span className="text-green-500 mr-4">03.</span> {t.slide4.title}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {/* Founders */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center">
                    <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-3 flex items-center justify-center text-xl font-bold text-gray-500">D</div>
                    <h3 className="font-bold text-white">David</h3>
                    <p className="text-xs text-cyan-400">{t.slide4.roles.founder}</p>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center">
                    <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-3 flex items-center justify-center text-xl font-bold text-gray-500">A</div>
                    <h3 className="font-bold text-white">Ariel</h3>
                    <p className="text-xs text-purple-400">{t.slide4.roles.ops}</p>
                </div>

                {/* Key Partners */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center opacity-80">
                    <div className="w-16 h-16 bg-gray-800 rounded-full mx-auto mb-3 flex items-center justify-center text-xl font-bold text-gray-600">M</div>
                    <h3 className="font-bold text-white">Moshe Mayara</h3>
                    <p className="text-xs text-orange-400">{t.slide4.roles.logistics}</p>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center opacity-80">
                    <div className="w-16 h-16 bg-gray-800 rounded-full mx-auto mb-3 flex items-center justify-center text-xl font-bold text-gray-600">A</div>
                    <h3 className="font-bold text-white">Avraham Ghezi</h3>
                    <p className="text-xs text-amber-400">{t.slide4.roles.content}</p>
                </div>

                {/* Tech & Growth */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center opacity-80">
                    <div className="w-16 h-16 bg-gray-800 rounded-full mx-auto mb-3 flex items-center justify-center text-xl font-bold text-gray-600">FG</div>
                    <h3 className="font-bold text-white">Famille Gozlan</h3>
                    <p className="text-xs text-blue-400">{t.slide4.roles.backend}</p>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center opacity-80">
                    <div className="w-16 h-16 bg-gray-800 rounded-full mx-auto mb-3 flex items-center justify-center text-xl font-bold text-gray-600">R</div>
                    <h3 className="font-bold text-white">Ran</h3>
                    <p className="text-xs text-green-400">{t.slide4.roles.sales}</p>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center opacity-80">
                    <div className="w-16 h-16 bg-pink-900/20 rounded-full mx-auto mb-3 border border-pink-500/50 flex items-center justify-center text-xl font-bold text-pink-500">S</div>
                    <h3 className="font-bold text-white">Sandy</h3>
                    <p className="text-xs text-pink-400">{t.slide4.roles.ai}</p>
                </div>
            </div>
        </div>
    );

    // SLIDE 5: THE ASK
    const Slide5 = () => (
        <div className="text-center max-w-3xl w-full">
            <h2 className="text-4xl font-bold text-white mb-8">
                <span className="text-amber-500 mr-4">04.</span> {t.slide5.title}
            </h2>
            <div className="bg-gradient-to-br from-gray-900 to-black p-10 rounded-3xl border border-white/10 shadow-2xl">
                <div className="mb-8">
                    <p className="text-gray-400 mb-2">{t.slide5.seeking}</p>
                    <h3 className="text-5xl font-black text-white tracking-tight">{t.slide5.seed}</h3>
                </div>
                {/* VENTURE STUDIO DATA */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                        <h3 className="text-2xl font-bold text-white mb-4">{t.slide5.why.title}</h3>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-sm text-gray-400 mb-1">
                                    <span>{t.slide5.why.irr}</span>
                                    <span className="text-green-400 font-bold">53%</span>
                                </div>
                                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-[53%]"></div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{t.slide5.why.traditional}</p>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm text-gray-400 mb-1">
                                    <span>{t.slide5.why.time}</span>
                                    <span className="text-cyan-400 font-bold">25 Months</span>
                                </div>
                                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                                    <div className="h-full bg-cyan-500 w-[40%]"></div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{t.slide5.why.traditional}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                        <h3 className="text-2xl font-bold text-white mb-4">{t.slide5.portfolio.title}</h3>
                        <table className="w-full text-sm text-left">
                            <thead>
                                <tr className="text-gray-500 border-b border-white/10">
                                    {t.slide5.portfolio.headers.map((h: string, i: number) => (
                                        <th key={i} className="pb-2">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="text-gray-300">
                                {t.slide5.portfolio.rows.map((row: any, i: number) => (
                                    <tr key={i} className="border-b border-white/5">
                                        <td className="py-3 font-bold text-white">{row.venture}</td>
                                        <td className="py-3">{row.market}</td>
                                        <td className={`py-3 ${i === 0 ? 'text-green-400' : i === 1 ? 'text-purple-400' : 'text-cyan-400'}`}>{row.advantage}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* TEAM STRUCTURE */}
                <div className="mb-24 text-center">
                    <h2 className="text-3xl font-bold text-white mb-8">{t.slide5.squad.title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-2">{t.slide5.squad.core.title}</h3>
                            <p className="text-gray-400 text-sm">{t.slide5.squad.core.names}</p>
                            <p className="text-xs text-gray-500 mt-2">{t.slide5.squad.core.desc}</p>
                        </div>
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-2">{t.slide5.squad.flex.title}</h3>
                            <p className="text-gray-400 text-sm">{t.slide5.squad.flex.names}</p>
                            <p className="text-xs text-gray-500 mt-2">{t.slide5.squad.flex.desc}</p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center flex flex-col md:flex-row justify-center gap-6">
                    <a href="/documents/DreamNova_Venture_Blueprint.pdf" target="_blank" className="px-8 py-4 bg-white text-black font-bold rounded-full text-lg hover:bg-gray-200 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.3)] flex items-center justify-center">
                        <Rocket className="w-5 h-5 mr-2" /> {t.slide5.buttons.blueprint}
                    </a>
                    <a href="/documents/Sacred_Tech_Unicorn.pdf" target="_blank" className="px-8 py-4 bg-transparent border border-white/30 text-white font-bold rounded-full text-lg hover:bg-white/10 transition-colors flex items-center justify-center">
                        <Sparkles className="w-5 h-5 mr-2" /> {t.slide5.buttons.thesis}
                    </a>
                </div>
            </div>
        </div>
    );

    const slides = [
        <Slide1 key="1" />,
        <Slide2 key="2" />,
        <Slide3 key="3" />,
        <Slide4 key="4" />,
        <Slide5 key="5" />
    ];

    return (
        <div className="h-screen w-full bg-[#05050A] text-white overflow-hidden relative">
            {/* Navigation */}
            <nav className="absolute top-0 left-0 w-full p-6 z-50 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <TrendingUp className="w-6 h-6 text-cyan-400" />
                    <span className="font-bold tracking-widest text-sm">{t.navTitle}</span>
                </div>
                <a href="/" className="text-sm text-gray-500 hover:text-white transition-colors">{t.quit}</a>
            </nav>

            {/* Slide Content */}
            <main className="h-full w-full relative">
                {slides.map((slide, index) => (
                    <div key={index} className={index === currentSlide ? 'block' : 'hidden'}>
                        <Slide active={index === currentSlide}>{slide}</Slide>
                    </div>
                ))}
            </main>

            {/* Controls */}
            <div className="absolute bottom-0 left-0 w-full p-8 flex justify-between items-end z-50">
                <div className="text-gray-600 font-mono text-xs">
                    {currentSlide + 1} / {slides.length}
                </div>
                <div className="flex space-x-4">
                    <button
                        onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                        disabled={currentSlide === 0}
                        className="p-4 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 border border-white/10 transition-all"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
                        disabled={currentSlide === slides.length - 1}
                        className="p-4 rounded-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-30 disabled:bg-gray-800 text-black transition-all"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
}
