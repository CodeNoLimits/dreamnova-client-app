'use client';

import React, { useState } from 'react';
import {
    Briefcase,
    Zap,
    Cpu,
    Layers,
    TrendingUp,
    Clock,
    CheckCircle,
    ArrowRight,
    Code2,
    Smartphone,
    MessageSquare,
    Rocket,
    X,
    Calendar,
    Search,
    Scale,
    Hammer,
    Repeat
} from 'lucide-react';

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl hover:bg-white/10 transition-all duration-300 ${className}`}>
        {children}
    </div>
);

const FeatureItem = ({ text }: { text: string }) => (
    <li className="flex items-center space-x-3 text-gray-300">
        <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
        <span>{text}</span>
    </li>
);

export default function ConsultModule() {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '' });

    const handleAction = (title: string, message: string) => {
        setModalContent({ title, message });
        setShowModal(true);
    };

    return (
        <div className="w-full text-gray-100 font-sans selection:bg-purple-500/30">

            {/* HERO SECTION */}
            <div className="text-center mb-24">
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-bold tracking-widest uppercase mb-6">
                    <Zap className="w-3 h-3 mr-2 fill-current" />
                    Agence IA & Automation
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
                    N'ACHETEZ PLUS DE DEV.<br />
                    ACHETEZ DE LA <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">VÉLOCITÉ</span>.
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed mb-10">
                    Nous transformons vos entreprises grâce à notre méthodologie propriétaire <strong>RAPID-IA™</strong>.
                    <br />
                    <span className="text-white font-medium">Révéler. Arbitrer. Protyper. Implémenter. Démultiplier.</span>
                </p>

                <button
                    onClick={() => handleAction("Transformation Initiée", "Un expert DreamNova va analyser votre stack actuelle. Redirection vers le calendrier...")}
                    className="px-10 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all shadow-[0_0_50px_-10px_rgba(147,51,234,0.5)] flex items-center mx-auto text-lg"
                >
                    Démarrer la Transformation <Rocket className="ml-3 w-6 h-6" />
                </button>
            </div>

            {/* METHODOLOGY: RAPID-IA */}
            <div className="mb-32">
                <h2 className="text-3xl font-bold text-white text-center mb-12">Le Framework <span className="text-purple-400">RAPID-IA™</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {[
                        { icon: <Search />, title: "Révéler", desc: "Audit profond des processus manuels et goulots d'étranglement." },
                        { icon: <Scale />, title: "Arbitrer", desc: "Sélection des batailles à fort ROI. On ne digitalise pas le chaos." },
                        { icon: <Code2 />, title: "Protyper", desc: "MVP fonctionnel en 72h grâce à nos agents de code." },
                        { icon: <Hammer />, title: "Implémenter", desc: "Déploiement robuste et sécurisé sur votre infrastructure." },
                        { icon: <Repeat />, title: "Démultiplier", desc: "Scaling horizontal via l'automatisation autonome." }
                    ].map((step, i) => (
                        <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-xl text-center hover:bg-white/10 transition-colors">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-400">
                                {step.icon}
                            </div>
                            <h3 className="font-bold text-white mb-2">{step.title}</h3>
                            <p className="text-xs text-gray-400">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* PRICING CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">

                {/* OFFER 1: DIAGNOSTIC */}
                <GlassCard className="border-t-4 border-t-blue-500 relative overflow-hidden group">
                    <div className="p-3 bg-blue-500/10 w-fit rounded-xl mb-6 border border-blue-500/20">
                        <Search className="w-8 h-8 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Diagnostic IA</h3>
                    <div className="text-3xl font-black text-white mb-1">1,500€</div>
                    <p className="text-gray-400 text-sm mb-6">Durée : 2 Semaines</p>
                    <div className="h-px w-full bg-white/10 mb-6"></div>
                    <ul className="space-y-3 mb-8">
                        <FeatureItem text="Audit complet des workflows" />
                        <FeatureItem text="Cartographie des opportunités IA" />
                        <FeatureItem text="Roadmap d'implémentation" />
                    </ul>
                    <button className="w-full py-3 bg-blue-600/20 border border-blue-500/50 text-blue-300 font-bold rounded-lg hover:bg-blue-600/40 transition-colors">
                        Réserver l'Audit
                    </button>
                </GlassCard>

                {/* OFFER 2: POC QUICK WIN (HERO) */}
                <GlassCard className="border-t-4 border-t-purple-500 relative overflow-hidden transform md:-translate-y-4 shadow-[0_0_60px_-15px_rgba(168,85,247,0.3)]">
                    <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAIRE</div>
                    <div className="p-3 bg-purple-500/10 w-fit rounded-xl mb-6 border border-purple-500/20">
                        <Zap className="w-8 h-8 text-purple-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">POC Quick Win</h3>
                    <div className="text-3xl font-black text-white mb-1">15,000€</div>
                    <p className="text-gray-400 text-sm mb-6">Durée : 4-8 Semaines</p>
                    <div className="h-px w-full bg-white/10 mb-6"></div>
                    <ul className="space-y-3 mb-8">
                        <FeatureItem text="Développement d'un MVP complet" />
                        <FeatureItem text="Intégration Stack Antigravity" />
                        <FeatureItem text="Test utilisateur réel" />
                    </ul>
                    <button className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-colors shadow-lg shadow-purple-500/25">
                        Lancer le POC
                    </button>
                </GlassCard>

                {/* OFFER 3: IMPLEMENTATION */}
                <GlassCard className="border-t-4 border-t-indigo-500 relative overflow-hidden group">
                    <div className="p-3 bg-indigo-500/10 w-fit rounded-xl mb-6 border border-indigo-500/20">
                        <Layers className="w-8 h-8 text-indigo-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Implémentation</h3>
                    <div className="text-3xl font-black text-white mb-1">50,000€</div>
                    <p className="text-gray-400 text-sm mb-6">Durée : 3-6 Mois</p>
                    <div className="h-px w-full bg-white/10 mb-6"></div>
                    <ul className="space-y-3 mb-8">
                        <FeatureItem text="Transformation digitale totale" />
                        <FeatureItem text="Formation des équipes" />
                        <FeatureItem text="Support & Maintenance 1 an" />
                    </ul>
                    <button className="w-full py-3 bg-indigo-600/20 border border-indigo-500/50 text-indigo-300 font-bold rounded-lg hover:bg-indigo-600/40 transition-colors">
                        Contacter Sales
                    </button>
                </GlassCard>

            </div>

            {/* SOCIAL PROOF */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 mb-24 relative overflow-hidden">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-20 h-20 bg-gray-700 rounded-full flex-shrink-0 overflow-hidden">
                        {/* Placeholder for avatar */}
                        <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-500"></div>
                    </div>
                    <div>
                        <p className="text-xl md:text-2xl text-gray-200 italic mb-4">
                            "Nous avons réduit nos coûts opérationnels de 40% tout en multipliant notre vélocité de sortie de produits par 3. L'approche RAPID-IA est chirurgicale."
                        </p>
                        <div>
                            <span className="font-bold text-white block">Claire M.</span>
                            <span className="text-purple-400 text-sm">CEO, E-Commerce Leader (ROI 8.4x)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA SECTION */}
            <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-8">Votre entreprise est prête pour l'Upgrade ?</h2>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                        onClick={() => handleAction("Audit Gratuit", "Nos créneaux sont limités. Veuillez choisir une date dans le calendrier (Simulation).")}
                        className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors shadow-xl"
                    >
                        Réserver un Audit Gratuit
                    </button>
                </div>
                <p className="mt-6 text-sm text-gray-500">Places limitées par mois pour garantir la qualité.</p>
            </div>

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
                        <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-purple-500/20">
                            <Calendar className="w-8 h-8 text-purple-400" />
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
