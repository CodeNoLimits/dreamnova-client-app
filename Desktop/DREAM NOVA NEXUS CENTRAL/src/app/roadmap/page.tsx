'use client';

import React from 'react';
import {
    Map,
    Flag,
    CheckCircle2,
    Circle,
    ArrowRight,
    Milestone,
    CalendarClock,
    Trophy,
    Users,
    Globe
} from 'lucide-react';
import Link from 'next/link';

const Phase = ({ number, title, date, status, items, color }: any) => {
    const isCompleted = status === 'completed';
    const isActive = status === 'active';

    return (
        <div className={`relative pl-12 pb-16 border-l-2 ${isCompleted ? 'border-green-500' : isActive ? 'border-cyan-500' : 'border-white/10'} last:border-0`}>
            {/* Dot */}
            <div className={`absolute left-[-11px] top-0 w-6 h-6 rounded-full border-4 border-[#05050A] ${isCompleted ? 'bg-green-500' : isActive ? 'bg-cyan-500 animate-pulse' : 'bg-gray-700'}`}></div>

            <div className="mb-6">
                <span className={`inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-2 ${isCompleted ? 'bg-green-500/20 text-green-400' : isActive ? 'bg-cyan-500/20 text-cyan-400' : 'bg-gray-800 text-gray-500'}`}>
                    {date} • {status}
                </span>
                <h3 className={`text-3xl font-bold ${isCompleted ? 'text-white' : isActive ? 'text-cyan-400' : 'text-gray-500'}`}>
                    Phase {number}: {title}
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map((item: any, i: number) => (
                    <div key={i} className={`p-4 rounded-xl border ${isCompleted ? 'bg-green-900/5 border-green-500/20' : isActive ? 'bg-cyan-900/5 border-cyan-500/20' : 'bg-white/5 border-white/5'}`}>
                        <div className="flex items-start">
                            {item.done ? (
                                <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            ) : (
                                <Circle className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${isActive ? 'text-cyan-500' : 'text-gray-600'}`} />
                            )}
                            <div>
                                <h4 className={`font-bold mb-1 ${item.done ? 'text-gray-300 line-through' : 'text-white'}`}>{item.title}</h4>
                                <p className="text-xs text-gray-500">{item.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function RoadmapPage() {
    return (
        <div className="min-h-screen bg-[#05050A] text-gray-100 font-sans pb-40">

            {/* HEADER */}
            <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto border-b border-white/5 sticky top-0 bg-[#05050A]/90 backdrop-blur z-50">
                <div className="flex items-center space-x-2">
                    <Map className="w-6 h-6 text-cyan-500" />
                    <span className="text-xl font-bold">Strategic <span className="text-cyan-500">Roadmap</span></span>
                </div>
                <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">Retour au Hub</Link>
            </nav>

            <main className="max-w-5xl mx-auto px-4 mt-12">

                <div className="text-center mb-20">
                    <h1 className="text-5xl font-black text-white mb-6">PLAN 2025-2027</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        De l'agence locale à l'empire global.
                        <br />Chaque étape est financée par la précédente.
                    </p>
                </div>

                <div className="mt-12">
                    <Phase
                        number="1"
                        title="THE CASH ENGINE"
                        date="Q4 2024 - Q1 2025"
                        status="active"
                        color="cyan"
                        items={[
                            { title: "DreamNova Consult Launch", desc: "Agency model to generate initial cashflow.", done: true },
                            { title: "Academy Pre-Sales", desc: "Validate the 'Speed Protocol' method.", done: true },
                            { title: "TetraBrame V1", desc: "First 50 tracks on Spotify/Apple Music.", done: true },
                            { title: "KavCom Integration", desc: "Automated prospecting for Consult.", done: false }
                        ]}
                    />

                    <Phase
                        number="2"
                        title="THE INFRASTRUCTURE"
                        date="Q2 2025 - Q3 2025"
                        status="pending"
                        color="orange"
                        items={[
                            { title: "Ha-Mazon Hub #1", desc: "Opening first logistics hub in Paris 11.", done: false },
                            { title: "Tera Mind App Store", desc: "Public release of the AI therapy app.", done: false },
                            { title: "Breslev RAG Complete", desc: "Full indexation of 400+ books.", done: false },
                            { title: "Core Team Hiring", desc: "Onboarding full-time backend devs.", done: false }
                        ]}
                    />

                    <Phase
                        number="3"
                        title="THE SCALE"
                        date="Q4 2025 - Q2 2026"
                        status="pending"
                        color="purple"
                        items={[
                            { title: "DreamNova Global Beta", desc: "Social network limited release (10k users).", done: false },
                            { title: "Ha-Mazon Fleet", desc: "10 Cargo Bikes + 3 Hubs in Paris.", done: false },
                            { title: "TetraMedia Factory", desc: "100 videos/day output capacity.", done: false },
                            { title: "Series A Funding", desc: "Raising €5M-€10M for global expansion.", done: false }
                        ]}
                    />

                    <Phase
                        number="4"
                        title="THE EMPIRE"
                        date="2026 - 2027"
                        status="pending"
                        color="gold"
                        items={[
                            { title: "US Expansion", desc: "Opening Miami HQ for North American market.", done: false },
                            { title: "Tera Mind Medical", desc: "FDA/CE Certification as Digital Therapeutic.", done: false },
                            { title: "Nova Foundation", desc: "Deploying $63M into philanthropic projects.", done: false },
                            { title: "IPO Preparation", desc: "Structuring for public listing.", done: false }
                        ]}
                    />
                </div>

                {/* TARGETS */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10 text-center">
                        <Trophy className="w-10 h-10 text-yellow-500 mx-auto mb-4" />
                        <div className="text-4xl font-bold text-white mb-2">€2.5M</div>
                        <div className="text-sm text-gray-400">ARR Target 2025</div>
                    </div>
                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10 text-center">
                        <Users className="w-10 h-10 text-blue-500 mx-auto mb-4" />
                        <div className="text-4xl font-bold text-white mb-2">100k</div>
                        <div className="text-sm text-gray-400">Active Users</div>
                    </div>
                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10 text-center">
                        <Globe className="w-10 h-10 text-green-500 mx-auto mb-4" />
                        <div className="text-4xl font-bold text-white mb-2">3</div>
                        <div className="text-sm text-gray-400">Countries</div>
                    </div>
                </div>

            </main>
        </div>
    );
}
