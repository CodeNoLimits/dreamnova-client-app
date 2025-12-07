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
    Code2,
    Smartphone,
    MessageSquare,
    Rocket,
    X,
    Calendar,
    Users,
    Bot
} from 'lucide-react';
import Link from 'next/link';
import { AdminToolbar } from '@/components/admin/AdminToolbar';
import { useAdminStore } from '@/lib/store';

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

export default function DreamNovaConsult() {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '' });
    const { isAdmin } = useAdminStore();

    const handleAction = (title: string, message: string) => {
        setModalContent({ title, message });
        setShowModal(true);
    };

    return (
        <div className="h-screen overflow-y-auto bg-[#05050A] text-gray-100 font-sans selection:bg-purple-500/30 pb-40">
            {isAdmin && (
                <div className="sticky top-0 z-[60]">
                    <AdminToolbar actions={[
                        { label: 'Lancer Agent Scout', onClick: () => handleAction('Agent Scout', 'Lancement du scan de marché...') },
                        { label: 'Voir Revenus Stripe', href: 'https://dashboard.stripe.com' },
                        { label: 'Deployer MVP', onClick: () => handleAction('Deploy', 'Déploiement du MVP en cours...') }
                    ]} />
                </div>
            )}

            {/* BACKGROUND FX */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[900px] h-[900px] bg-indigo-600/10 rounded-full blur-[150px] opacity-30"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-fuchsia-600/10 rounded-full blur-[150px] opacity-20"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            </div>

            {/* HEADER */}
            <nav className="relative z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center space-x-2">
                    <Briefcase className="w-6 h-6 text-purple-400" />
                    <span className="text-xl font-bold tracking-tight">DreamNova <span className="font-light text-gray-400">Consult</span></span>
                </div>
                <Link href="/" className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">Retour au Hub</Link>
            </nav>

            <main className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-10">

                {/* HERO SECTION */}
                <div className="text-center mb-24">
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-bold tracking-widest uppercase mb-6">
                        <Zap className="w-3 h-3 mr-2 fill-current" />
                        Agence IA & Automation
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
                        N&apos;ACHETEZ PLUS DE DEV.<br />
                        ACHETEZ DE LA <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">VÉLOCITÉ</span>.
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed mb-10">
                        Nous transformons vos entreprises grâce à une stack IA propriétaire.
                        <br />
                        <span className="text-white font-medium">Automatisation. Développement Instantané. Domination Sociale.</span>
                    </p>

                    <button
                        onClick={() => handleAction("Transformation Initiée", "Un expert DreamNova va analyser votre stack actuelle. Redirection vers le calendrier...")}
                        className="px-10 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all shadow-[0_0_50px_-10px_rgba(147,51,234,0.5)] flex items-center mx-auto text-lg"
                    >
                        Démarrer la Transformation <Rocket className="ml-3 w-6 h-6" />
                    </button>
                </div>

                {/* 15 AGENTS MATAT OS */}
                <div className="mb-32">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">La Force de Frappe : <span className="text-purple-400">15 Agents Matat OS</span></h2>
                        <p className="text-gray-400">Une armée digitale qui travaille 24/7 pour votre croissance.</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {[
                            { name: "Architect", role: "System Design", icon: <Cpu className="w-5 h-5" /> },
                            { name: "Codeweaver", role: "Fullstack Dev", icon: <Code2 className="w-5 h-5" /> },
                            { name: "Monetizer", role: "Revenue Ops", icon: <TrendingUp className="w-5 h-5" /> },
                            { name: "Scout", role: "Lead Gen", icon: <Users className="w-5 h-5" /> },
                            { name: "Guardian", role: "Security", icon: <Bot className="w-5 h-5" /> },
                            { name: "Scribe", role: "Content Gen", icon: <MessageSquare className="w-5 h-5" /> },
                            { name: "Analyst", role: "Data Viz", icon: <Layers className="w-5 h-5" /> },
                            { name: "Closer", role: "Sales Auto", icon: <Zap className="w-5 h-5" /> },
                            { name: "Support", role: "24/7 CS", icon: <Smartphone className="w-5 h-5" /> },
                            { name: "Legal", role: "Compliance", icon: <Briefcase className="w-5 h-5" /> },
                            { name: "Creative", role: "Design V0", icon: <Zap className="w-5 h-5" /> },
                            { name: "SEO", role: "Ranking", icon: <Globe className="w-5 h-5" /> },
                            { name: "Emailer", role: "Outreach", icon: <MessageSquare className="w-5 h-5" /> },
                            { name: "Social", role: "Viral Ops", icon: <Smartphone className="w-5 h-5" /> },
                            { name: "Manager", role: "Orchestration", icon: <Cpu className="w-5 h-5" /> }
                        ].map((agent, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-xl text-center hover:bg-white/10 transition-colors group">
                                <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3 text-purple-400 group-hover:scale-110 transition-transform">
                                    {agent.icon}
                                </div>
                                <div className="font-bold text-white text-sm">{agent.name}</div>
                                <div className="text-xs text-gray-500">{agent.role}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* VALUE PROPOSITION: THE STACK */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">

                    {/* OFFER 1: SOCIAL DOMINATION */}
                    <GlassCard className="border-t-4 border-t-pink-500 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <MessageSquare className="w-32 h-32" />
                        </div>
                        <div className="p-3 bg-pink-500/10 w-fit rounded-xl mb-6 border border-pink-500/20">
                            <TrendingUp className="w-8 h-8 text-pink-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Social Domination</h3>
                        <div className="mb-2"><span className="text-xs font-mono text-pink-300 border border-pink-500/30 px-2 py-0.5 rounded">Marge 93%</span></div>
                        <div className="text-3xl font-black text-white mb-4">3k€ <span className="text-sm font-normal text-gray-500">/ mois</span></div>
                        <p className="text-gray-400 text-sm mb-6 h-10">Inondez le marché. Contenu omnicanal géré par IA.</p>
                        <div className="h-px w-full bg-white/10 mb-6"></div>
                        <ul className="space-y-3 mb-8">
                            <FeatureItem text="Metricool Piloté par IA" />
                            <FeatureItem text="100+ Posts/Mois générés" />
                            <FeatureItem text="Présence TikTok, LinkedIn, Insta" />
                            <FeatureItem text="Setup Fee: 3000€" />
                        </ul>
                        <div className="mt-auto">
                            <button className="w-full py-3 bg-pink-500/20 text-pink-300 font-bold rounded-xl border border-pink-500/30 hover:bg-pink-500/30 transition-colors">
                                Dominer
                            </button>
                        </div>
                    </GlassCard>

                    {/* OFFER 2: HYPER-DEVELOPMENT (HERO PRODUCT) */}
                    <GlassCard className="border-t-4 border-t-purple-500 relative overflow-hidden transform md:-translate-y-4 shadow-[0_0_60px_-15px_rgba(168,85,247,0.3)]">
                        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none"></div>
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <Code2 className="w-32 h-32" />
                        </div>
                        <div className="p-3 bg-purple-500/10 w-fit rounded-xl mb-6 border border-purple-500/20">
                            <Cpu className="w-8 h-8 text-purple-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Hyper-Development</h3>
                        <div className="mb-2"><span className="text-xs font-mono text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded">SaaS Factory</span></div>
                        <div className="text-3xl font-black text-white mb-4">15k€ <span className="text-sm font-normal text-gray-500">/ sprint</span></div>
                        <p className="text-gray-400 text-sm mb-6 h-10">Votre SaaS ou App Mobile en 1 semaine. Pas 6 mois.</p>
                        <div className="h-px w-full bg-white/10 mb-6"></div>
                        <ul className="space-y-3 mb-8">
                            <FeatureItem text="Stack: Antigravity + Stitch" />
                            <FeatureItem text="Agents de Code Autonomes" />
                            <FeatureItem text="UI/UX Générative (V0/Stitch)" />
                        </ul>
                        <div className="mt-auto">
                            <button className="w-full py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-500 transition-colors shadow-lg shadow-purple-900/50">
                                Construire
                            </button>
                        </div>
                    </GlassCard>

                    {/* OFFER 3: INVISIBLE OPS */}
                    <GlassCard className="border-t-4 border-t-indigo-500 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Layers className="w-32 h-32" />
                        </div>
                        <div className="p-3 bg-indigo-500/10 w-fit rounded-xl mb-6 border border-indigo-500/20">
                            <Smartphone className="w-8 h-8 text-indigo-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Invisible Ops</h3>
                        <div className="text-3xl font-black text-white mb-4">5k€ <span className="text-sm font-normal text-gray-500">/ mois</span></div>
                        <p className="text-gray-400 text-sm mb-6 h-10">Automatisez 80% de vos processus internes.</p>
                        <div className="h-px w-full bg-white/10 mb-6"></div>
                        <ul className="space-y-3 mb-8">
                            <FeatureItem text="Opal Automation" />
                            <FeatureItem text="CRM Autonome" />
                            <FeatureItem text="Prospection IA (KavCom)" />
                        </ul>
                        <div className="mt-auto">
                            <button className="w-full py-3 bg-indigo-500/20 text-indigo-300 font-bold rounded-xl border border-indigo-500/30 hover:bg-indigo-500/30 transition-colors">
                                Automatiser
                            </button>
                        </div>
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

// Helper for icon
function Globe(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" x2="22" y1="12" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    )
}
