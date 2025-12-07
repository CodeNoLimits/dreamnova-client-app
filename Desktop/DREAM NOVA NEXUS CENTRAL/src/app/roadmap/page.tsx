'use client';

import React from 'react';
import {
    Map,
    Rocket,
    Target,
    Briefcase
} from 'lucide-react';
import Link from 'next/link';

const TimelineItem = ({ date, title, desc, status }: { date: string, title: string, desc: string, status: string }) => (
    <div className="relative pl-8 pb-12 border-l border-white/10 last:border-0">
        <div className={`absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full ${status === 'done' ? 'bg-green-500' : status === 'current' ? 'bg-cyan-500 animate-pulse' : 'bg-gray-700'}`}></div>
        <span className="text-xs font-mono text-gray-500 mb-1 block">{date}</span>
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-400">{desc}</p>
    </div>
);

const InvestorCard = ({ name, focus, location, type }: { name: string, focus: string, location: string, type: string }) => (
    <div className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
        <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-white">{name}</h4>
            <span className="text-[10px] uppercase bg-white/10 px-2 py-1 rounded text-gray-300">{type}</span>
        </div>
        <p className="text-xs text-cyan-400 mb-1">{focus}</p>
        <p className="text-[10px] text-gray-500">{location}</p>
    </div>
);

export default function RoadmapPage() {
    return (
        <div className="h-screen overflow-y-auto bg-[#05050A] text-gray-100 font-sans pb-40">

            {/* Nav */}
            <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center space-x-2">
                    <Map className="w-6 h-6 text-cyan-400" />
                    <span className="text-xl font-bold">Strategic <span className="font-light text-cyan-200">Roadmap</span></span>
                </div>
                <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">Retour au Hub</Link>
            </nav>

            <main className="max-w-7xl mx-auto px-4 mt-10 grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* LEFT: EXECUTION ROADMAP */}
                <div>
                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                        <Rocket className="w-6 h-6 mr-3 text-green-400" /> Plan d&apos;Exécution
                    </h2>
                    <div className="space-y-2">
                        <TimelineItem
                            date="Q1 2025 (Actuel)"
                            title="Lancement & Cashflow"
                            desc="Activation de DreamNova Consult (SaaS Factory + KavCom). Objectif: 50k€ MRR pour autofinancer la R&D."
                            status="current"
                        />
                        <TimelineItem
                            date="Q2 2025"
                            title="Déploiement Infrastructure"
                            desc="Ouverture du 1er Micro-Hub Ha-Mazon (Paris 11e). Lancement Beta Tera Mind (Mode Wellness)."
                            status="pending"
                        />
                        <TimelineItem
                            date="Q3 2025"
                            title="Scale & Influence"
                            desc="TetraBrame atteint 1M streams. Lancement de l&apos;Academy B2C. Préparation du Seed Round."
                            status="pending"
                        />
                        <TimelineItem
                            date="Q4 2025"
                            title="Seed Round (Investisseurs)"
                            desc="Levée de fonds ciblée (500k-1M€) pour accélérer la logistique et la certification DTx de Tera Mind."
                            status="pending"
                        />
                    </div>
                </div>

                {/* RIGHT: INVESTOR TARGETS */}
                <div>
                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                        <Target className="w-6 h-6 mr-3 text-red-400" /> Cibles Investisseurs
                    </h2>
                    <p className="text-gray-400 text-sm mb-6">
                        Liste qualifiée basée sur la thèse &quot;Tech for Good&quot;, &quot;PropTech&quot; et &quot;Deep Tech&quot; (France/Israël).
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InvestorCard
                            name="Jérémie Berrebi"
                            type="Super Angel"
                            focus="SaaS, Marketplaces, Torah-Tech"
                            location="🇮🇱 Israël / 🇫🇷 France"
                        />
                        <InvestorCard
                            name="Kima Ventures"
                            type="VC (Xavier Niel)"
                            focus="High Velocity, Volume, Agnostic"
                            location="🇫🇷 Paris"
                        />
                        <InvestorCard
                            name="83North"
                            type="VC Tier 1"
                            focus="Data, Enterprise Software"
                            location="🇮🇱 Tel Aviv / 🇬🇧 London"
                        />
                        <InvestorCard
                            name="Aleph"
                            type="VC"
                            focus="Impact, Big Ideas"
                            location="🇮🇱 Tel Aviv"
                        />
                        <InvestorCard
                            name="Elaia Partners"
                            type="VC Deep Tech"
                            focus="Digital Health, AI"
                            location="🇫🇷 Paris"
                        />
                        <InvestorCard
                            name="Gigi Levy-Weiss"
                            type="Angel / NFX"
                            focus="Network Effects, Gaming/Consumer"
                            location="🇮🇱 Israël"
                        />
                    </div>

                    <div className="mt-8 p-6 bg-cyan-900/20 border border-cyan-500/30 rounded-2xl">
                        <h4 className="font-bold text-white mb-2 flex items-center">
                            <Briefcase className="w-4 h-4 mr-2 text-cyan-400" /> Stratégie de Pitch
                        </h4>
                        <ul className="text-sm text-gray-300 space-y-2 list-disc list-inside">
                            <li>Approche : &quot;Venture Studio&quot; (Risque dilué sur 4 verticales).</li>
                            <li>Preuve : Cashflow existant via Consult (Pas de &quot;Burn rate&quot; infini).</li>
                            <li>Vision : La convergence Tech/Logistique/Sens.</li>
                        </ul>
                    </div>
                </div>

            </main>
        </div>
    );
}
