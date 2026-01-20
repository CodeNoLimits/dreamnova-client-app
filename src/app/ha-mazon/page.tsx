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
    Info,
    ShieldCheck,
    Clock,
    Leaf,
    Building2,
    Timer
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const NeonButton = ({ children, onClick, variant = 'orange', className = "" }: { children: React.ReactNode, onClick?: () => void, variant?: 'orange' | 'green', className?: string }) => {
    const styles = {
        orange: 'bg-orange-500 hover:bg-orange-400 text-black shadow-orange-500/30',
        green: 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/30'
    };
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`px-8 py-4 font-bold rounded-xl shadow-lg flex items-center transition-all ${styles[variant]} ${className}`}
        >
            {children}
        </motion.button>
    );
};

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl hover:bg-white/10 transition-all duration-300 ${className}`}>
        {children}
    </div>
);

const ZfeMap = () => (
    <div className="relative h-[400px] w-full bg-gray-900 rounded-2xl overflow-hidden border border-white/10">
        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Paris_Night.jpg/1200px-Paris_Night.jpg')] bg-cover bg-center opacity-30 grayscale"></div>
        <div className="absolute inset-0 bg-red-900/20 mix-blend-overlay"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-red-500/50 bg-red-500/10 animate-pulse flex items-center justify-center">
            <span className="text-red-500 font-bold text-xs tracking-widest">ZONE EXCLUSION</span>
        </div>
    </div>
);

import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { LanguageSelector } from '@/components/ui/LanguageSelector';

// ... (keep existing imports)

export default function HaMazonPage() {
    const [serviceMode, setServiceMode] = useState<'standard' | 'emergency'>('standard');
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '' });
    const { lang } = useLanguage();
    const t = translations[lang].amazon;
    const common = translations[lang].common;

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
                    <LanguageSelector />
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
                    <Link href="/" className="px-4 py-2 text-sm font-medium opacity-60 hover:opacity-100 transition-opacity">{common.backToHub}</Link>
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
                        <div className="flex flex-col gap-4 pt-4">
                            <div className="flex gap-4">
                                <NeonButton
                                    onClick={() => handleAction("Commande", "Redirection vers l'interface de commande B2B/B2C (Simulation).")}
                                    className={`${serviceMode === 'emergency' ? 'bg-red-500 hover:bg-red-400' : 'bg-white hover:bg-gray-200'}`}
                                >
                                    Commander Maintenant <ArrowRight className="ml-2 w-5 h-5" />
                                </NeonButton>
                                <button
                                    onClick={() => handleAction("Carte", "Affichage de la carte des Micro-Hubs en temps réel (Données sensibles).")}
                                    className="px-8 py-4 border border-white/10 hover:bg-white/5 font-medium rounded-xl backdrop-blur-md transition-colors"
                                >
                                    Voir la Carte
                                </button>
                            </div>

                            <a href="https://shouk-app.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2">
                                <Info className="w-4 h-4" />
                                {t.testClientApp}
                            </a>
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

                {/* TAGLINE */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed mb-12">
                        Livraison H+2 pour les restaurateurs parisiens. Zéro Friction.
                        <br />
                        <span className="text-orange-400 font-bold">L&apos;Anti-Metro.</span>
                    </p>

                    <div className="flex justify-center gap-6">
                        <NeonButton onClick={() => document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' })}>
                            Voir la Carte des Hubs <ArrowRight className="ml-2 w-5 h-5" />
                        </NeonButton>
                    </div>
                </motion.div>

                {/* 2. ZFE PROBLEM (DATA VIZ) */}
                <div id="map" className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32 items-center">
                    <div>
                        <h2 className="text-4xl font-bold text-white mb-6">Le Mur de 2025</h2>
                        <p className="text-gray-400 mb-8 text-lg">
                            Les camions diesel sont bannis de Paris. Metro et les grossistes classiques sont bloqués aux portes de la ville.
                            <br /><br />
                            <strong className="text-white">Notre flotte de Cargo-Bikes passe partout. 24/7.</strong>
                        </p>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center text-gray-300"><ShieldCheck className="w-5 h-5 mr-3 text-emerald-500" /> Compatible ZFE (Crit&apos;Air 0)</li>
                            <li className="flex items-center text-gray-300"><Clock className="w-5 h-5 mr-3 text-emerald-500" /> Livraison en 15 minutes (Service Rescue)</li>
                            <li className="flex items-center text-gray-300"><Leaf className="w-5 h-5 mr-3 text-emerald-500" /> -90% d&apos;Empreinte Carbone</li>
                        </ul>
                    </div>
                    <ZfeMap />
                </div>

                {/* 3. INFRASTRUCTURE (MICRO-HUBS) */}
                <div className="mb-32">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">L&apos;Immobilier Invisible</h2>
                        <p className="text-gray-400">Des micro-entrepôts cachés au cœur de la ville.</p>
                    </div>

                    <GlassCard className="relative overflow-hidden border-orange-500/30">
                        {/* IMAGE PROMPT: Interior of a futuristic underground micro-warehouse, clean white modular cold storage units, LED lighting strips on the floor, organized shelving, industrial sci-fi aesthetic, wide angle */}
                        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-orange-900/10 to-transparent pointer-events-none"></div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                            <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
                                <MapPin className="w-10 h-10 text-orange-400 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">Paris 10e, 11e, 9e</h3>
                                <p className="text-gray-400 text-sm">Au plus près des restaurants. Zones ultra-denses.</p>
                            </div>
                            <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
                                <Building2 className="w-10 h-10 text-orange-400 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">Parkings R-1</h3>
                                <p className="text-gray-400 text-sm">Réhabilitation d&apos;espaces urbains abandonnés. 100-200m².</p>
                            </div>
                            <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
                                <Zap className="w-10 h-10 text-orange-400 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">Chambres Froides</h3>
                                <p className="text-gray-400 text-sm">Modulaires haute performance. Stockage tampon.</p>
                            </div>
                        </div>
                    </GlassCard>
                </div>

                {/* 4. WORKFLOW TIMELINE */}
                <div className="mb-32">
                    <h2 className="text-3xl font-bold text-white mb-12 text-center">Rupture de Charge</h2>
                    <div className="relative border-l-2 border-white/10 ml-6 md:ml-auto md:mr-auto md:w-2/3 space-y-12 pl-8 md:pl-0">

                        <div className="relative md:flex items-center justify-between group">
                            <div className="absolute -left-[41px] md:left-1/2 md:-ml-[9px] w-5 h-5 rounded-full bg-gray-800 border-4 border-orange-500"></div>
                            <div className="md:w-[45%] md:text-right mb-4 md:mb-0 md:pr-8">
                                <div className="text-orange-400 font-mono font-bold text-lg mb-1">04:00 AM</div>
                                <h3 className="text-xl font-bold text-white">Approvisionnement Silencieux</h3>
                                <p className="text-gray-400 text-sm">Camions électriques partenaires (Urby/STEF) livrent les Hubs pendant que la ville dort.</p>
                            </div>
                            <div className="md:w-[45%] md:pl-8">
                                <Truck className="w-8 h-8 text-gray-600 group-hover:text-white transition-colors" />
                            </div>
                        </div>

                        <div className="relative md:flex items-center justify-between group flex-row-reverse">
                            <div className="absolute -left-[41px] md:left-1/2 md:-ml-[9px] w-5 h-5 rounded-full bg-gray-800 border-4 border-orange-500"></div>
                            <div className="md:w-[45%] md:text-left mb-4 md:mb-0 md:pl-8">
                                <div className="text-orange-400 font-mono font-bold text-lg mb-1">08:00 AM</div>
                                <h3 className="text-xl font-bold text-white">Mise en Rayon & Kits</h3>
                                <p className="text-gray-400 text-sm">Préparation des commandes prévisionnelles. Kitting par IA.</p>
                            </div>
                            <div className="md:w-[45%] md:text-right md:pr-8">
                                <Package className="w-8 h-8 text-gray-600 group-hover:text-white transition-colors ml-auto" />
                            </div>
                        </div>

                        <div className="relative md:flex items-center justify-between group">
                            <div className="absolute -left-[41px] md:left-1/2 md:-ml-[9px] w-5 h-5 rounded-full bg-gray-800 border-4 border-orange-500"></div>
                            <div className="md:w-[45%] md:text-right mb-4 md:mb-0 md:pr-8">
                                <div className="text-orange-400 font-mono font-bold text-lg mb-1">12:00 PM</div>
                                <h3 className="text-xl font-bold text-white">Service Rescue</h3>
                                <p className="text-gray-400 text-sm">Le coup de feu. Livraison de dépannage en moins de 15 minutes.</p>
                            </div>
                            <div className="md:w-[45%] md:pl-8">
                                <Timer className="w-8 h-8 text-gray-600 group-hover:text-white transition-colors" />
                            </div>
                        </div>

                    </div>
                </div>

                {/* 5. GREEN DISCOUNT */}
                <div className="mb-20">
                    <GlassCard className="bg-gradient-to-br from-emerald-900/20 to-black border-emerald-500/30">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div>
                                <div className="inline-flex items-center px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-bold mb-6">
                                    <Leaf className="w-3 h-3 mr-2" />
                                    ALGORITHME DE MUTUALISATION
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-4">Le Green Discount</h2>
                                <p className="text-gray-400 mb-6">
                                    Vos voisins (Le Petit Cambodge, Ober Mamma) commandent à 10h00.
                                    Groupez votre commande avec eux.
                                </p>
                                <div className="text-4xl font-black text-emerald-400 mb-8">-15% <span className="text-lg font-normal text-white">immédiat</span></div>
                                <NeonButton variant="green">
                                    Activer la Mutualisation
                                </NeonButton>
                            </div>
                            <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
                                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center font-bold text-black mr-3">V</div>
                                        <div className="text-white font-bold">Vous</div>
                                    </div>
                                    <div className="text-orange-400">En attente</div>
                                </div>
                                <div className="flex items-center justify-between mb-4 opacity-50">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center font-bold text-white mr-3">P</div>
                                        <div className="text-white">Petit Cambodge</div>
                                    </div>
                                    <div className="text-emerald-400">Validé (10:00)</div>
                                </div>
                                <div className="flex items-center justify-between opacity-50">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center font-bold text-white mr-3">O</div>
                                        <div className="text-white">Ober Mamma</div>
                                    </div>
                                    <div className="text-emerald-400">Validé (10:05)</div>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </div>

                {/* 6. TEAM */}
                <div className="text-center mb-20">
                    <div className="inline-block p-1 rounded-full bg-white/5 border border-white/10 mb-4">
                        <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-2xl font-bold text-white mx-auto">M</div>
                    </div>
                    <h3 className="text-xl font-bold text-white">Moshé Mayara</h3>
                    <p className="text-orange-400 font-mono text-sm">Opérations & Réseau</p>
                </div>

            </main>
        </div>
    );
}
