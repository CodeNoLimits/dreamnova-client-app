'use client';

import React, { useState } from 'react';
import {
    ShoppingCart,
    Truck,
    MapPin,
    Package,
    Zap,
    Shield,
    X,
    AlertTriangle,
    CheckCircle,
    ArrowRight,
    Info
} from 'lucide-react';
import Link from 'next/link';

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl hover:bg-white/10 transition-all duration-300 ${className}`}>
        {children}
    </div>
);

export default function HaMazonPage() {
    const [serviceMode, setServiceMode] = useState<'standard' | 'emergency'>('standard');
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '' });

    const handleAction = (title: string, message: string) => {
        setModalContent({ title, message });
        setShowModal(true);
    };

    return (
        <div className={`h-screen overflow-y-auto font-sans transition-colors duration-700 ${serviceMode === 'emergency' ? 'bg-[#1a0505] text-red-50' : 'bg-[#05050A] text-gray-100'} pb-40`}>

            {/* HEADER */}
            <nav className="relative z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto border-b border-white/5">
                <div className="flex items-center space-x-2">
                    <ShoppingCart className={`w-6 h-6 ${serviceMode === 'emergency' ? 'text-red-500' : 'text-orange-500'}`} />
                    <span className="text-xl font-bold tracking-tight">Ha-Mazon <span className="font-light opacity-50">Logistics</span></span>
                </div>
                <div className="flex items-center space-x-4">
                    {/* MODE TOGGLE */}
                    <button
                        onClick={() => setServiceMode(serviceMode === 'standard' ? 'emergency' : 'standard')}
                        className={`px-3 py-1 rounded-full text-xs font-bold border transition-all flex items-center ${serviceMode === 'standard'
                            ? 'border-green-500/30 bg-green-500/10 text-green-400 hover:bg-green-500/20'
                            : 'border-red-500/50 bg-red-500/20 text-red-400 hover:bg-red-500/30 animate-pulse'
                            }`}
                    >
                        {serviceMode === 'standard' ? (
                            <><CheckCircle className="w-3 h-3 mr-2" /> STANDARD OPS</>
                        ) : (
                            <><AlertTriangle className="w-3 h-3 mr-2" /> EMERGENCY MODE</>
                        )}
                    </button>
                    <Link href="/" className="px-4 py-2 text-sm font-medium opacity-60 hover:opacity-100 transition-opacity">Retour au Hub</Link>
                </div>
            </nav>

            <main className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-10">

                {/* HERO SECTION */}
                <div className="flex flex-col lg:flex-row items-center gap-12 mb-24">
                    <div className="lg:w-1/2 space-y-6">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase ${serviceMode === 'emergency' ? 'border-red-500/30 text-red-400' : 'border-orange-500/30 text-orange-400'}`}>
                            {serviceMode === 'emergency' ? 'Protocole de Crise Activé' : 'Logistique Urbaine Décentralisée'}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
                            LIVRER L&apos;ESSENTIEL. <br />
                            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${serviceMode === 'emergency' ? 'from-red-500 to-orange-600' : 'from-orange-400 to-amber-500'}`}>
                                QUOI QU&apos;IL ARRIVE.
                            </span>
                        </h1>
                        <p className="text-xl opacity-60 max-w-lg leading-relaxed">
                            {serviceMode === 'emergency'
                                ? "En temps de crise, les supermarchés sont vides en 48h. Ha-Mazon bascule instantanément en réseau de distribution de survie."
                                : "Une infrastructure logistique invisible, intégrée au tissu urbain. Micro-Hubs, Flotte Électrique, Zéro Friction."}
                        </p>
                        <div className="flex gap-4 pt-4">
                            <button
                                onClick={() => handleAction("Commande", "Redirection vers l'interface de commande B2B/B2C (Simulation).")}
                                className={`px-8 py-4 font-bold rounded-xl text-black shadow-lg flex items-center transition-transform hover:scale-105 ${serviceMode === 'emergency' ? 'bg-red-500 hover:bg-red-400' : 'bg-white hover:bg-gray-200'}`}
                            >
                                Commander Maintenant <ArrowRight className="ml-2 w-5 h-5" />
                            </button>
                            <button
                                onClick={() => handleAction("Carte", "Affichage de la carte des Micro-Hubs en temps réel (Données sensibles).")}
                                className="px-8 py-4 border border-white/10 hover:bg-white/5 font-medium rounded-xl backdrop-blur-md transition-colors"
                            >
                                Voir la Carte
                            </button>
                        </div>
                    </div>

                    {/* VISUALIZATION: THE MICRO-HUB NETWORK */}
                    <div className="lg:w-1/2 relative h-[500px] w-full">
                        <div className={`absolute inset-0 bg-gradient-to-br rounded-3xl blur-3xl opacity-20 ${serviceMode === 'emergency' ? 'from-red-600 to-orange-900' : 'from-orange-500 to-amber-500'}`}></div>
                        <GlassCard className="h-full relative overflow-hidden flex flex-col p-0 border-white/10">
                            {/* Map Background (Abstract) */}
                            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                            {/* Overlay Grid */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

                            {/* Nodes */}
                            <div className="relative z-10 h-full w-full p-8">
                                <div className="absolute top-1/4 left-1/4">
                                    <div className={`w-4 h-4 rounded-full animate-ping absolute ${serviceMode === 'emergency' ? 'bg-red-500' : 'bg-green-500'}`}></div>
                                    <div className={`w-4 h-4 rounded-full relative z-10 ${serviceMode === 'emergency' ? 'bg-red-500' : 'bg-green-500'}`}></div>
                                    <div className="mt-2 text-xs font-mono bg-black/50 px-2 py-1 rounded border border-white/10">Hub Nord</div>
                                </div>
                                <div className="absolute bottom-1/3 right-1/4">
                                    <div className={`w-4 h-4 rounded-full animate-ping absolute delay-300 ${serviceMode === 'emergency' ? 'bg-red-500' : 'bg-green-500'}`}></div>
                                    <div className={`w-4 h-4 rounded-full relative z-10 ${serviceMode === 'emergency' ? 'bg-red-500' : 'bg-green-500'}`}></div>
                                    <div className="mt-2 text-xs font-mono bg-black/50 px-2 py-1 rounded border border-white/10">Hub Sud</div>
                                </div>
                                <div className="absolute top-1/2 right-1/2">
                                    <div className={`w-6 h-6 rounded-full animate-pulse absolute ${serviceMode === 'emergency' ? 'bg-red-500' : 'bg-orange-500'}`}></div>
                                    <div className={`w-6 h-6 rounded-full relative z-10 border-2 border-white ${serviceMode === 'emergency' ? 'bg-red-600' : 'bg-orange-500'}`}></div>
                                    <div className="mt-2 text-xs font-bold font-mono bg-black/80 px-2 py-1 rounded border border-white/20">CENTRAL</div>
                                </div>

                                {/* Connection Lines (SVG) */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                                    <line x1="25%" y1="25%" x2="50%" y2="50%" stroke="white" strokeWidth="1" strokeDasharray="5,5" />
                                    <line x1="75%" y1="66%" x2="50%" y2="50%" stroke="white" strokeWidth="1" strokeDasharray="5,5" />
                                </svg>
                            </div>

                            {/* Status Bar */}
                            <div className="mt-auto p-4 bg-black/40 backdrop-blur border-t border-white/10 flex justify-between items-center text-xs font-mono">
                                <div className="flex items-center space-x-4">
                                    <span className="flex items-center"><Package className="w-3 h-3 mr-1" /> STOCK: {serviceMode === 'emergency' ? 'CRITICAL' : '98%'}</span>
                                    <span className="flex items-center"><Truck className="w-3 h-3 mr-1" /> FLEET: {serviceMode === 'emergency' ? 'DEPLOYED' : 'IDLE'}</span>
                                </div>
                                <div className={serviceMode === 'emergency' ? 'text-red-400 animate-pulse' : 'text-green-400'}>
                                    {serviceMode === 'emergency' ? '⚠ DEFCON 1' : '● NORMAL'}
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>

                {/* ZFE ARGUMENT */}
                <div className="mb-24 bg-red-900/20 border border-red-500/30 rounded-3xl p-8 flex items-start space-x-6">
                    <div className="p-4 bg-red-500/20 rounded-2xl">
                        <AlertTriangle className="w-8 h-8 text-red-500" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">The Regulatory Moat: ZFE Paris 2025</h3>
                        <p className="text-gray-300">
                            Starting January 1st, 2025, Paris bans <strong>Crit&apos;Air 3</strong> vehicles.
                            Diesel vans are effectively locked out between 8am and 8pm.
                            <br /><span className="text-white font-bold mt-2 block">Our electric cargo-bikes are the ONLY viable solution for last-mile delivery.</span>
                        </p>
                    </div>
                </div>

                {/* FEATURES GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                    <GlassCard className="group hover:border-orange-500/50">
                        <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <MapPin className="w-6 h-6 text-orange-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Micro-Hubs Urbains</h3>
                        <p className="text-sm opacity-60">
                            Des espaces de stockage de 50m² dissimulés en centre-ville (parkings, arrière-boutiques). Livraison en 15 min à vélo.
                        </p>
                    </GlassCard>

                    <GlassCard className="group hover:border-green-500/50">
                        <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Zap className="w-6 h-6 text-green-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">ZFE Ready</h3>
                        <p className="text-sm opacity-60">
                            Flotte 100% électrique et cargo-bikes. Immunisé contre les restrictions de circulation et les pénuries de carburant.
                        </p>
                    </GlassCard>

                    <GlassCard className="group hover:border-blue-500/50">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Shield className="w-6 h-6 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Résilience Totale</h3>
                        <p className="text-sm opacity-60">
                            Architecture décentralisée. Si un hub tombe, les autres prennent le relais. Stock stratégique de survie (eau, conserves).
                        </p>
                    </GlassCard>
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
                        <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-orange-500/20">
                            <Info className="w-8 h-8 text-orange-400" />
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
