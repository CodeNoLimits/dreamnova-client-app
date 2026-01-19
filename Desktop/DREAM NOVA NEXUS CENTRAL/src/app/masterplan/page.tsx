'use client';

import React, { useState } from 'react';
import {
    Flag,
    Users,
    Target,
    Calendar,
    Trophy,
    Briefcase,
    Globe,
    Cpu,
    ArrowRight,
    CheckCircle2,
    DollarSign,
    Rocket
} from 'lucide-react';
import Link from 'next/link';

const Section = ({ title, icon, children }: any) => (
    <div className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center border-b border-white/10 pb-4">
            <div className="p-2 bg-white/5 rounded-lg mr-4 text-cyan-400">
                {icon}
            </div>
            {title}
        </h2>
        {children}
    </div>
);

const StrategyCard = ({ title, subtitle, points, color = "blue" }: any) => (
    <div className={`p-6 rounded-2xl bg-gradient-to-b from-white/5 to-black border border-white/10 hover:border-${color}-500/50 transition-all`}>
        <h3 className={`text-xl font-bold text-${color}-400 mb-1`}>{title}</h3>
        <p className="text-sm text-gray-400 mb-6 font-mono uppercase tracking-wider">{subtitle}</p>
        <ul className="space-y-3">
            {points.map((point: string, i: number) => (
                <li key={i} className="flex items-start text-sm text-gray-300">
                    <CheckCircle2 className={`w-4 h-4 mr-3 text-${color}-500 mt-0.5 flex-shrink-0`} />
                    {point}
                </li>
            ))}
        </ul>
    </div>
);

const TimelinePhase = ({ phase, title, date, goals, projects }: any) => (
    <div className="relative pl-8 pb-12 border-l-2 border-white/10 last:border-0 group">
        <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)] group-hover:scale-125 transition-transform"></div>
        <span className="inline-block px-3 py-1 rounded bg-white/5 text-xs text-cyan-400 font-mono mb-2">{phase} • {date}</span>
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                <h4 className="font-bold text-gray-300 mb-2 flex items-center"><Target className="w-4 h-4 mr-2" /> Objectifs Stratégiques</h4>
                <ul className="space-y-2">
                    {goals.map((g: string, i: number) => (
                        <li key={i} className="text-sm text-gray-400">• {g}</li>
                    ))}
                </ul>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                <h4 className="font-bold text-gray-300 mb-2 flex items-center"><Rocket className="w-4 h-4 mr-2" /> Focus Projets</h4>
                <div className="flex flex-wrap gap-2">
                    {projects.map((p: string, i: number) => (
                        <span key={i} className="px-2 py-1 bg-black rounded border border-white/10 text-xs text-white">{p}</span>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export default function MasterplanPage() {
    return (
        <div className="min-h-screen bg-[#05050A] text-gray-100 font-sans pb-40">

            {/* HEADER */}
            <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto border-b border-white/5">
                <div className="flex items-center space-x-2">
                    <Flag className="w-6 h-6 text-green-500" />
                    <span className="text-xl font-bold">DreamNova <span className="text-green-500">Masterplan</span></span>
                </div>
                <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">Retour au Hub</Link>
            </nav>

            <main className="max-w-6xl mx-auto px-4 mt-12">

                <div className="text-center mb-20">
                    <h1 className="text-5xl font-black text-white mb-6">L'ORDRE DE BATAILLE 2025-2026</h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
                        Feuille de route opérationnelle, stratégie de recrutement "Win-Win" et déploiement des 12 projets.
                        <br />Ce document est la boussole interne du Venture Studio.
                    </p>

                    {/* VIDEO: Le Plan Directeur */}
                    <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                        <video
                            src="/videos/Le_Plan_Directeur_du_Visionnaire.mp4"
                            controls
                            className="w-full"
                            poster="/images/masterplan_poster.jpg" // Optional if we had one, but browser default is fine
                        >
                            Votre navigateur ne supporte pas la lecture de vidéos.
                        </video>
                    </div>
                </div>

                {/* 1. STRATÉGIE RH & RECRUTEMENT */}
                <Section title="La Meute : Stratégie de Recrutement Hybride" icon={<Users className="w-6 h-6" />}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* CORE TEAM */}
                        <StrategyCard
                            title="Le Noyau Dur (Equity)"
                            subtitle="Founders & Partners"
                            color="cyan"
                            points={[
                                "Profils : David, Ariel, Moshe M., Avraham G.",
                                "Modèle : Equity (Parts) + Salaire différé.",
                                "Rôle : Vision, Architecture, Décision.",
                                "Engagement : Total (Full-time)."
                            ]}
                        />

                        {/* SALES HUNTERS */}
                        <StrategyCard
                            title="Les Chasseurs (Win-Win)"
                            subtitle="Sales & Growth (Ran)"
                            color="green"
                            points={[
                                "Modèle 'Eat what you kill' : 0€ Fixe / 20-30% Commission.",
                                "Outil : On leur fournit KavCom + Leads qualifiés (AI Prospecting).",
                                "Offre : Ils vendent 'Consult' & 'Academy'.",
                                "Avantage : Risque zéro pour nous, gain illimité pour eux."
                            ]}
                        />

                        {/* BUILDERS & GIGS */}
                        <StrategyCard
                            title="Les Bâtisseurs (Flex)"
                            subtitle="Fiverr, Upwork & Houlon Team"
                            color="purple"
                            points={[
                                "Backend Robuste : Équipe Famille Gozlan (Houlon).",
                                "Assets Créatifs : Délégation sur Fiverr (Logos, 3D, Clips).",
                                "Modèle Pro-Bono : Étudiants Tech contre Mentorship + CV.",
                                "Agilité : On scale les ressources selon le Cashflow."
                            ]}
                        />
                    </div>

                    <div className="mt-8 p-6 bg-green-900/10 border border-green-500/30 rounded-2xl flex items-center">
                        <DollarSign className="w-8 h-8 text-green-400 mr-4" />
                        <div>
                            <h4 className="font-bold text-white">La Règle d'Or du Recrutement Win-Win</h4>
                            <p className="text-sm text-gray-400">
                                "Nous ne payons pas pour du temps. Nous partageons la valeur créée.
                                Apportez un client, prenez 30%. Construisez un module critique, prenez de l'equity."
                            </p>
                        </div>
                    </div>
                </Section>

                {/* 1.5 HYBRID ECONOMIC MODEL */}
                <Section title="The Financial Engine (Hybrid Model)" icon={<Briefcase className="w-6 h-6" />}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-4">1. The Agency (Cash Cow)</h3>
                            <p className="text-gray-400 text-sm mb-4">
                                Generates immediate cashflow to fund the studio without dilution.
                            </p>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> Margin: 60-85%</li>
                                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> Role: R&D Self-Funding</li>
                                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> Offer: Consult & Academy</li>
                            </ul>
                        </div>
                        <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-4">2. The Venture Studio (Equity)</h3>
                            <p className="text-gray-400 text-sm mb-4">
                                Creating long-term valuable assets (J-Curve).
                            </p>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-purple-500" /> Exit Goal: 5-7 Years</li>
                                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-purple-500" /> Valuation: €100-200M</li>
                                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-purple-500" /> Asset: IP & Tech Stack (Matat OS)</li>
                            </ul>
                        </div>
                    </div>
                </Section>

                {/* 2. ROADMAP DÉTAILLÉE */}
                <Section title="Calendrier d'Exécution (The Curriculum)" icon={<Calendar className="w-6 h-6" />}>
                    <div className="space-y-2">

                        <TimelinePhase
                            phase="PHASE 1"
                            date="Mois 1-3 (L'Amorçage)"
                            title="Génération de Cashflow Immédiat"
                            projects={["Consult", "Academy", "TetraBrame"]}
                            goals={[
                                "Lancer l'offre 'Social Domination' (Metricool) pour 10 premiers clients.",
                                "Vendre le cours 'Academy Ignition' (97€) via webinaires/TikTok.",
                                "Ran active la prospection téléphonique avec KavCom.",
                                "Objectif : 15k€ - 30k€ de revenus cumulés."
                            ]}
                        />

                        <TimelinePhase
                            phase="PHASE 2"
                            date="Mois 3-6 (La Structure)"
                            title="Infrastructure Physique & Mentale"
                            projects={["Ha-Mazon", "Tera Mind (B2C)", "Breslev RAG"]}
                            goals={[
                                "Signature du 1er Micro-Hub Ha-Mazon (Paris 11e).",
                                "Lancement de Tera Mind en mode 'Wellness' (App Store).",
                                "Breslev Books : Indexation complète du Likoutey Moharan.",
                                "Recrutement de l'équipe Backend (Gozlan) financé par la Phase 1."
                            ]}
                        />

                        <TimelinePhase
                            phase="PHASE 3"
                            date="Mois 6-12 (L'Expansion)"
                            title="Scale & Venture Capital"
                            projects={["DreamNova Global", "Pitch Deck", "Roadmap"]}
                            goals={[
                                "Roadshow Investisseurs : Présentation à Berrebi & Kima.",
                                "Ha-Mazon : Flotte de 10 vélos cargos active.",
                                "TetraBrame : 1 Million de streams cumulés (Revenus passifs).",
                                "DreamNova Global : Ouverture de la Beta du réseau social."
                            ]}
                        />

                        <TimelinePhase
                            phase="PHASE 4"
                            date="Année 2 (L'Empire)"
                            title="Consolidation & Spirit-Tech"
                            projects={["Ecosystème Complet", "Foundation"]}
                            goals={[
                                "Fusion des datas : Le DCS (Global) nourrit le recrutement (Consult).",
                                "Tera Mind : Certification médicale (DTx).",
                                "Ouverture de la branche US (Miami) pour la distribution.",
                                "Réinvestissement massif dans la Hafatsa (Diffusion)."
                            ]}
                        />

                    </div>
                </Section>

                {/* 3. SYNERGIE DES 12 PROJETS */}
                <Section title="La Matrice de Synergie" icon={<Cpu className="w-6 h-6" />}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-4">Comment l'argent circule ?</h3>
                            <ul className="space-y-4 text-sm text-gray-300">
                                <li className="flex items-center"><ArrowRight className="w-4 h-4 mr-2 text-green-500" /> Consult & Academy génèrent le Cashflow court terme.</li>
                                <li className="flex items-center"><ArrowRight className="w-4 h-4 mr-2 text-green-500" /> Ce cash finance le stock Ha-Mazon et les serveurs Tera Mind.</li>
                                <li className="flex items-center"><ArrowRight className="w-4 h-4 mr-2 text-green-500" /> TetraBrame réinvestit ses royalties dans la pub pour Breslev Books.</li>
                            </ul>
                        </div>
                        <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-4">Comment la Data circule ?</h3>
                            <ul className="space-y-4 text-sm text-gray-300">
                                <li className="flex items-center"><ArrowRight className="w-4 h-4 mr-2 text-blue-500" /> Les utilisateurs de l'Academy deviennent les beta-testeurs de Consult.</li>
                                <li className="flex items-center"><ArrowRight className="w-4 h-4 mr-2 text-blue-500" /> Le DCS (Score) de Global est utilisé pour filtrer les candidats RH.</li>
                                <li className="flex items-center"><ArrowRight className="w-4 h-4 mr-2 text-blue-500" /> Le RAG de Breslev entraîne l'éthique de Tera Mind.</li>
                            </ul>
                        </div>
                    </div>
                </Section>

                {/* CTA FINAL */}
                <div className="text-center py-20 border-t border-white/10 mt-20">
                    <h2 className="text-4xl font-black text-white mb-8">PRÊT À EXÉCUTER ?</h2>
                    <div className="flex justify-center gap-4">
                        <a href="https://vercel.com" target="_blank" className="bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-gray-200 transition-colors flex items-center">
                            <Rocket className="w-5 h-5 mr-2" /> Déployer sur Vercel
                        </a>
                        <Link href="/" className="bg-white/5 border border-white/10 px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors">
                            Retour au QG
                        </Link>
                    </div>
                </div>

            </main>
        </div>
    );
}
