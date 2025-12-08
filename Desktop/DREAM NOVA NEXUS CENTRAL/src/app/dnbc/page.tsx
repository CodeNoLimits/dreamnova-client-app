'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Compass,
    Target,
    Globe,
    Zap,
    Layers,
    Search,
    ArrowRight,
    BarChart2,
    PieChart,
    Share2,
    Cpu,
    Database
} from 'lucide-react';
import Link from 'next/link';
import { AdminToolbar } from '@/components/admin/AdminToolbar';
import { useAdminStore } from '@/lib/store';

// --- NANO BANANA PRO COMPONENTS - DEEP TECH EDITION ---

const GlassCard = ({ children, className = "", hoverEffect = true }: { children: React.ReactNode, className?: string, hoverEffect?: boolean }) => (
    <motion.div
        whileHover={hoverEffect ? { scale: 1.01, borderColor: "rgba(139, 92, 246, 0.5)" } : {}}
        className={`backdrop-blur-xl bg-black/60 border border-white/10 rounded-none p-8 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-300 relative overflow-hidden ${className}`}
    >
        {/* Tech Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-10 pointer-events-none"></div>
        {children}
    </motion.div>
);

const NeonButton = ({ children, onClick, className = "" }: { children: React.ReactNode, onClick?: () => void, className?: string }) => (
    <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)" }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`px-8 py-4 bg-violet-600/20 border border-violet-500 text-violet-300 font-mono text-sm tracking-widest uppercase rounded-sm hover:bg-violet-600/40 transition-all flex items-center justify-center ${className}`}
    >
        {children}
    </motion.button>
);

// --- 4D RADAR COMPONENT ---
const Radar4D = () => {
    const [activePoint, setActivePoint] = useState<number | null>(null);

    const points = [
        { id: 1, x: 20, y: 20, type: 'threat', label: 'Competitor A', data: 'Disruption Risk: High' },
        { id: 2, x: 80, y: 20, type: 'target', label: 'Startup B', data: 'Acquisition: Ready' },
        { id: 3, x: 20, y: 80, type: 'lever', label: 'Supplier C', data: 'Negotiation: Open' },
        { id: 4, x: 80, y: 80, type: 'ally', label: 'Partner D', data: 'Synergy: 98%' },
    ];

    return (
        <div className="relative w-full aspect-square bg-black border border-white/20 rounded-full overflow-hidden flex items-center justify-center group">
            {/* Radar Grid */}
            <div className="absolute inset-0 border border-white/10 rounded-full scale-75"></div>
            <div className="absolute inset-0 border border-white/10 rounded-full scale-50"></div>
            <div className="absolute inset-0 border border-white/10 rounded-full scale-25"></div>
            <div className="absolute w-full h-[1px] bg-white/10 top-1/2"></div>
            <div className="absolute h-full w-[1px] bg-white/10 left-1/2"></div>

            {/* Scanning Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/10 to-transparent w-1/2 h-full animate-[spin_4s_linear_infinite] origin-right left-0 top-0 border-r border-violet-500/30"></div>

            {/* Quadrant Labels */}
            <div className="absolute top-4 left-4 text-red-500 text-xs font-mono">MENACES</div>
            <div className="absolute top-4 right-4 text-amber-500 text-xs font-mono">CIBLES</div>
            <div className="absolute bottom-4 left-4 text-cyan-500 text-xs font-mono">LEVIERS</div>
            <div className="absolute bottom-4 right-4 text-emerald-500 text-xs font-mono">ALLIÉS</div>

            {/* Data Points */}
            {points.map((p) => (
                <motion.div
                    key={p.id}
                    className={`absolute w-3 h-3 rounded-full cursor-pointer z-20 ${p.type === 'threat' ? 'bg-red-500 shadow-[0_0_10px_red]' :
                        p.type === 'target' ? 'bg-amber-500 shadow-[0_0_10px_amber]' :
                            p.type === 'lever' ? 'bg-cyan-500 shadow-[0_0_10px_cyan]' :
                                'bg-emerald-500 shadow-[0_0_10px_emerald]'
                        }`}
                    style={{ top: `${p.y}%`, left: `${p.x}%` }}
                    whileHover={{ scale: 1.5 }}
                    onHoverStart={() => setActivePoint(p.id)}
                    onHoverEnd={() => setActivePoint(null)}
                />
            ))}

            {/* Intel Card Overlay */}
            <AnimatePresence>
                {activePoint && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute z-30 bg-black/90 border border-violet-500 p-4 w-48 text-xs font-mono text-violet-300 backdrop-blur-md"
                        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                    >
                        <div className="font-bold text-white mb-1">{points.find(p => p.id === activePoint)?.label}</div>
                        <div>{points.find(p => p.id === activePoint)?.data}</div>
                        <div className="mt-2 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-violet-500 w-[80%]"></div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function DNBC() {
    const { isAdmin } = useAdminStore();

    return (
        <div className="h-screen overflow-y-auto bg-black text-gray-100 font-mono selection:bg-violet-500/30 pb-40">
            {isAdmin && (
                <div className="sticky top-0 z-[60]">
                    <AdminToolbar actions={[
                        { label: 'Run 4D Scan', onClick: () => console.log('Scan') },
                        { label: 'Export Data', onClick: () => console.log('Export') }
                    ]} />
                </div>
            )}

            {/* BACKGROUND FX */}
            {/* IMAGE PROMPT: Futuristic holographic command center, 3D data visualization floating in mid-air, complex network nodes connecting companies, dark room, cyan and purple lighting, cinematic depth of field, 8k render */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-violet-900/20 rounded-full blur-[100px] opacity-20"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-cyan-900/20 rounded-full blur-[100px] opacity-20"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,0)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>
            </div>

            {/* HEADER */}
            <nav className="relative z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto border-b border-white/10 bg-black/50 backdrop-blur-md">
                <div className="flex items-center space-x-2">
                    <Compass className="w-6 h-6 text-violet-500" />
                    <span className="text-xl font-bold tracking-widest">DNBC <span className="text-xs text-violet-500 align-top">PRO</span></span>
                </div>
                <Link href="/" className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest">Retour Nexus</Link>
            </nav>

            <main className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-10">

                {/* 1. HERO SECTION */}
                <div className="text-center mb-32 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center px-2 py-1 border border-violet-500/50 bg-violet-900/10 text-violet-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
                            <Cpu className="w-3 h-3 mr-2" />
                            Intelligence Stratégique
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight leading-tight uppercase">
                            Pilotez votre Écosystème<br />
                            en <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-cyan-500 animate-pulse">4 Dimensions</span>.
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light leading-relaxed mb-12 font-sans">
                            L&apos;Intelligence Artificielle qui transforme vos concurrents en cibles et vos voisins en alliés.
                            <br />
                            <span className="text-violet-500 font-mono text-xs mt-2 block">SYSTEM STATUS: ONLINE // LATENCY: 12ms</span>
                        </p>

                        <div className="flex justify-center gap-6">
                            <NeonButton onClick={() => document.getElementById('radar')?.scrollIntoView({ behavior: 'smooth' })}>
                                Lancer l&apos;Analyse 4D <Target className="ml-2 w-4 h-4" />
                            </NeonButton>
                        </div>
                    </motion.div>
                </div>

                {/* 2. RADAR 4D */}
                <div id="radar" className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32 items-center">
                    <div className="order-2 lg:order-1">
                        <Radar4D />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold text-white mb-6 uppercase tracking-widest">L&apos;Échiquier 4D</h2>
                        <p className="text-gray-400 mb-8 text-sm font-sans leading-relaxed">
                            Notre moteur Graph-RAG analyse des millions de points de données pour cartographier votre environnement concurrentiel en temps réel.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 border border-emerald-500/30 bg-emerald-900/10">
                                <div className="text-emerald-500 font-bold text-xs mb-1">ALLIÉS</div>
                                <div className="text-gray-400 text-[10px]">Partenaires de Co-Selling identifiés.</div>
                            </div>
                            <div className="p-4 border border-red-500/30 bg-red-900/10">
                                <div className="text-red-500 font-bold text-xs mb-1">MENACES</div>
                                <div className="text-gray-400 text-[10px]">Disruption détectée.</div>
                            </div>
                            <div className="p-4 border border-cyan-500/30 bg-cyan-900/10">
                                <div className="text-cyan-500 font-bold text-xs mb-1">LEVIERS</div>
                                <div className="text-gray-400 text-[10px]">Fournisseurs & Régulateurs.</div>
                            </div>
                            <div className="p-4 border border-amber-500/30 bg-amber-900/10">
                                <div className="text-amber-500 font-bold text-xs mb-1">CIBLES</div>
                                <div className="text-gray-400 text-[10px]">Opportunités d&apos;Acquisition.</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. TUNNEL GENERATOR */}
                <div className="mb-32">
                    <GlassCard className="border-cyan-500/30">
                        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-widest">Tunnel Generator</h2>
                                <p className="text-gray-400 text-xs">De l&apos;Insight au Contrat en 1 Clic.</p>
                            </div>
                            <NeonButton className="mt-4 md:mt-0 border-cyan-500 text-cyan-300 bg-cyan-900/20">
                                Auto-Execute <Zap className="ml-2 w-4 h-4" />
                            </NeonButton>
                        </div>

                        {/* Workflow Viz */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
                            {/* Connector Lines */}
                            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-cyan-500/30 -z-10"></div>

                            <div className="bg-black border border-white/10 p-6 text-center relative">
                                <div className="w-10 h-10 bg-black border border-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 text-cyan-500 font-bold">1</div>
                                <h3 className="text-white font-bold text-sm mb-2">DÉTECTION</h3>
                                <p className="text-gray-500 text-[10px]">Partenaire Potentiel identifié par IA.</p>
                            </div>
                            <div className="bg-black border border-white/10 p-6 text-center relative">
                                <div className="w-10 h-10 bg-black border border-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 text-cyan-500 font-bold">2</div>
                                <h3 className="text-white font-bold text-sm mb-2">GÉNÉRATION</h3>
                                <p className="text-gray-500 text-[10px]">Email Intro + Contrat + Pitch Deck créés.</p>
                            </div>
                            <div className="bg-black border border-white/10 p-6 text-center relative">
                                <div className="w-10 h-10 bg-black border border-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 text-cyan-500 font-bold">3</div>
                                <h3 className="text-white font-bold text-sm mb-2">EXÉCUTION</h3>
                                <p className="text-gray-500 text-[10px]">Envoi via API & Signature.</p>
                            </div>
                        </div>
                    </GlassCard>
                </div>

                {/* 4. DASHBOARD ROI */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                    <GlassCard className="col-span-2">
                        <h3 className="text-white font-bold text-sm mb-6 flex items-center"><BarChart2 className="w-4 h-4 mr-2 text-violet-500" /> IMPACT REVENU</h3>
                        <div className="h-48 flex items-end justify-between gap-2 px-4">
                            {[20, 35, 45, 30, 55, 65, 50, 75, 85, 90, 80, 100].map((h, i) => (
                                <div key={i} className="w-full bg-violet-500/20 border-t border-violet-500 hover:bg-violet-500/40 transition-colors" style={{ height: `${h}%` }}></div>
                            ))}
                        </div>
                    </GlassCard>
                    <div className="space-y-8">
                        <GlassCard className="text-center">
                            <div className="text-4xl font-bold text-white mb-2">98%</div>
                            <div className="text-xs text-gray-500 uppercase tracking-widest">Temps gagné (Due Diligence)</div>
                        </GlassCard>
                        <GlassCard className="text-center">
                            <div className="text-4xl font-bold text-cyan-400 mb-2">x12</div>
                            <div className="text-xs text-gray-500 uppercase tracking-widest">ROI / Deal</div>
                        </GlassCard>
                    </div>
                </div>

                {/* 5. PRICING */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-white mb-12 text-center uppercase tracking-widest">Accès Terminal</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="border border-white/10 bg-black/40 p-8 hover:border-white/30 transition-colors">
                            <h3 className="text-lg font-bold text-white mb-2">EXPLORER</h3>
                            <div className="text-3xl font-bold text-gray-300 mb-6">499€<span className="text-sm font-normal">/mo</span></div>
                            <ul className="space-y-3 text-xs text-gray-500 mb-8 font-mono">
                                <li className="flex items-center"><div className="w-1 h-1 bg-gray-500 mr-2"></div> Monitoring Passif</li>
                                <li className="flex items-center"><div className="w-1 h-1 bg-gray-500 mr-2"></div> 5 Scans / mois</li>
                            </ul>
                            <button className="w-full py-3 border border-white/20 text-gray-300 text-xs font-bold uppercase hover:bg-white/5">Select</button>
                        </div>

                        <div className="border border-violet-500 bg-violet-900/10 p-8 relative">
                            <div className="absolute top-0 right-0 bg-violet-500 text-black text-[10px] font-bold px-2 py-1">BEST VALUE</div>
                            <h3 className="text-lg font-bold text-white mb-2">GROWTH</h3>
                            <div className="text-3xl font-bold text-violet-400 mb-6">2,499€<span className="text-sm font-normal">/mo</span></div>
                            <ul className="space-y-3 text-xs text-gray-400 mb-8 font-mono">
                                <li className="flex items-center"><div className="w-1 h-1 bg-violet-500 mr-2"></div> Tunnels Illimités</li>
                                <li className="flex items-center"><div className="w-1 h-1 bg-violet-500 mr-2"></div> Graph-RAG Access</li>
                                <li className="flex items-center"><div className="w-1 h-1 bg-violet-500 mr-2"></div> API Key</li>
                            </ul>
                            <button className="w-full py-3 bg-violet-600 text-white text-xs font-bold uppercase hover:bg-violet-500">Select</button>
                        </div>

                        <div className="border border-white/10 bg-black/40 p-8 hover:border-white/30 transition-colors">
                            <h3 className="text-lg font-bold text-white mb-2">ENTERPRISE</h3>
                            <div className="text-3xl font-bold text-gray-300 mb-6">CUSTOM</div>
                            <ul className="space-y-3 text-xs text-gray-500 mb-8 font-mono">
                                <li className="flex items-center"><div className="w-1 h-1 bg-gray-500 mr-2"></div> White Label</li>
                                <li className="flex items-center"><div className="w-1 h-1 bg-gray-500 mr-2"></div> Dedicated Instance</li>
                            </ul>
                            <button className="w-full py-3 border border-white/20 text-gray-300 text-xs font-bold uppercase hover:bg-white/5">Contact</button>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
