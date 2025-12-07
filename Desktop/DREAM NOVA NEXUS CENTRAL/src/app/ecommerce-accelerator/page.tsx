'use client';

import React from 'react';
import {
    ShoppingBag,
    Zap,
    Bot,
    BarChart3,
    GraduationCap,
    Briefcase,
    Layers
} from 'lucide-react';
import Link from 'next/link';

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
        <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-400">{desc}</p>
    </div>
);

export default function EcommerceModulePage() {
    return (
        <div className="h-screen overflow-y-auto bg-[#05050A] text-gray-100 font-sans pb-40">

            {/* Nav */}
            <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center space-x-2">
                    <ShoppingBag className="w-6 h-6 text-emerald-400" />
                    <span className="text-xl font-bold">E-Com <span className="font-light text-emerald-200">Velocity</span></span>
                </div>
                <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">Retour au Hub</Link>
            </nav>

            <main className="max-w-7xl mx-auto px-4 mt-10">

                {/* HERO */}
                <div className="text-center mb-20 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none"></div>

                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 relative z-10 tracking-tight">
                        L&apos;E-COMMERCE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">AUTONOME.</span>
                    </h1>

                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 relative z-10">
                        Fini le travail manuel. Nous appliquons notre méthodologie &quot;DreamNova&quot; (Agents IA + Automatisation) pour créer des boutiques qui vendent 24/7 sans intervention humaine.
                    </p>
                </div>

                {/* THE METHODOLOGY (Common to Course & Agency) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                    <FeatureCard
                        icon={<Bot className="w-6 h-6" />}
                        title="Service Client IA"
                        desc="Un agent entraîné sur votre catalogue répond aux clients, gère les retours et upsell en temps réel (Chat & Email)."
                    />
                    <FeatureCard
                        icon={<Layers className="w-6 h-6" />}
                        title="Fiches Produits Auto"
                        desc="Génération massive de descriptions SEO, titres et images produits via Vision AI et LLMs. 100 fiches en 5 min."
                    />
                    <FeatureCard
                        icon={<BarChart3 className="w-6 h-6" />}
                        title="Ads Automation"
                        desc="Création automatique de créas publicitaires (Midjourney) et pilotage des campagnes Meta/Google par algorithme."
                    />
                </div>

                {/* THE DUAL OFFER (Fork in the road) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">

                    {/* OPTION A: DO IT YOURSELF (Academy) */}
                    <div className="p-8 rounded-3xl border border-yellow-500/30 bg-gradient-to-b from-yellow-500/5 to-black relative overflow-hidden group hover:border-yellow-500/60 transition-all">
                        <div className="absolute top-0 right-0 p-4 bg-yellow-500 text-black font-bold text-xs uppercase rounded-bl-2xl">
                            Pour les Entrepreneurs
                        </div>
                        <div className="mb-6 w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-400">
                            <GraduationCap className="w-8 h-8" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2">J&apos;apprends la Méthode</h3>
                        <p className="text-gray-400 mb-8 min-h-[60px]">
                            Formez-vous à nos outils. Copiez-collez nos workflows Make.com et nos prompts pour automatiser votre boutique vous-même.
                        </p>
                        <ul className="space-y-3 mb-8 text-sm text-gray-300">
                            <li className="flex items-center"><Zap className="w-4 h-4 mr-2 text-yellow-500" /> Accès Module &quot;E-Com AI&quot;</li>
                            <li className="flex items-center"><Zap className="w-4 h-4 mr-2 text-yellow-500" /> Templates Notion & Make</li>
                            <li className="flex items-center"><Zap className="w-4 h-4 mr-2 text-yellow-500" /> Certification &quot;DreamNova E-com&quot;</li>
                        </ul>
                        <Link href="/academy" className="block w-full py-4 bg-white/10 hover:bg-white/20 text-white text-center font-bold rounded-xl transition-colors">
                            Rejoindre l&apos;Academy (Dès 97€)
                        </Link>
                    </div>

                    {/* OPTION B: DONE FOR YOU (Agency) */}
                    <div className="p-8 rounded-3xl border border-purple-500/30 bg-gradient-to-b from-purple-500/5 to-black relative overflow-hidden group hover:border-purple-500/60 transition-all">
                        <div className="absolute top-0 right-0 p-4 bg-purple-500 text-white font-bold text-xs uppercase rounded-bl-2xl">
                            Pour les Marques
                        </div>
                        <div className="mb-6 w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400">
                            <Briefcase className="w-8 h-8" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2">Vous le faites pour moi</h3>
                        <p className="text-gray-400 mb-8 min-h-[60px]">
                            Déléguez la complexité technique. Notre équipe déploie votre infrastructure E-commerce autonome clé en main.
                        </p>
                        <ul className="space-y-3 mb-8 text-sm text-gray-300">
                            <li className="flex items-center"><Zap className="w-4 h-4 mr-2 text-purple-500" /> Audit & Setup Complet</li>
                            <li className="flex items-center"><Zap className="w-4 h-4 mr-2 text-purple-500" /> Agents IA Personnalisés</li>
                            <li className="flex items-center"><Zap className="w-4 h-4 mr-2 text-purple-500" /> Maintenance & Scaling</li>
                        </ul>
                        <Link href="/dreamnova-consult" className="block w-full py-4 bg-white text-black hover:bg-gray-200 text-center font-bold rounded-xl transition-colors">
                            Contacter l&apos;Agence
                        </Link>
                    </div>

                </div>

            </main>
        </div>
    );
}
