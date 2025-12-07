'use client';

import React, { useState } from 'react';
import {
    Brain,
    Activity,
    MessageCircle,
    Mic,
    Video,
    Globe,
    Cpu,
    Music,
    Play,
    Pause,
    Radio,
    Heart,
    Zap,
    Users,
    Flame,
    BookOpen,
    Smile
} from 'lucide-react';

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl hover:bg-white/10 transition-all duration-500 ${className}`}>
        {children}
    </div>
);

const DCSGauge = ({ label, value, color }: { label: string, value: number, color: string }) => (
    <div className="mb-4">
        <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">{label}</span>
            <span className={`font-bold text-${color}-400`}>{value}%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-1.5">
            <div className={`h-full rounded-full bg-${color}-500`} style={{ width: `${value}%` }}></div>
        </div>
    </div>
);

export default function SocialSpiritModule() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeTab, setActiveTab] = useState<'chat' | 'coach'>('chat');

    return (
        <div className="w-full space-y-20 text-gray-100 font-sans">

            {/* SECTION 1: TERA MIND (SOCIAL & COACHING) */}
            <div className="flex flex-col lg:flex-row gap-12">

                {/* LEFT: CONTEXT & DCS */}
                <div className="lg:w-1/3 space-y-8">
                    <div>
                        <h2 className="text-4xl font-black text-white mb-4">L'Arche de Noé <span className="text-pink-400">Spirituelle</span></h2>
                        <p className="text-gray-400 leading-relaxed">
                            Un réseau social où la valeur n'est pas le like, mais l'élévation.
                        </p>
                    </div>

                    <GlassCard className="p-6">
                        <h3 className="font-bold text-white mb-4 flex items-center">
                            <Activity className="w-5 h-5 mr-2 text-pink-400" /> Votre DCS (Score)
                        </h3>
                        <DCSGauge label="Cohérence" value={92} color="pink" />
                        <DCSGauge label="Effort" value={85} color="purple" />
                        <DCSGauge label="Empathie" value={78} color="blue" />
                        <DCSGauge label="Responsabilité" value={95} color="green" />
                    </GlassCard>

                    {/* REALISTIC FEED */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Activité Récente</h4>
                        <div className="flex items-start space-x-3 p-3 bg-white/5 rounded-xl border border-white/5">
                            <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-bold text-xs">S</div>
                            <div>
                                <p className="text-sm text-gray-300"><span className="font-bold text-white">Sophie</span> a ouvert son café-librairie.</p>
                                <span className="text-xs text-green-400 flex items-center mt-1"><Heart className="w-3 h-3 mr-1" /> Soutien Financier reçu</span>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-white/5 rounded-xl border border-white/5">
                            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xs">T</div>
                            <div>
                                <p className="text-sm text-gray-300"><span className="font-bold text-white">Thomas</span> a fini son prototype VR.</p>
                                <span className="text-xs text-blue-400 flex items-center mt-1"><Zap className="w-3 h-3 mr-1" /> Soutien Technique reçu</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: SANDY AI INTERFACE */}
                <div className="lg:w-2/3">
                    <GlassCard className="h-full flex flex-col relative overflow-hidden p-0 border-pink-500/20">
                        {/* TABS */}
                        <div className="flex border-b border-white/10">
                            <button
                                onClick={() => setActiveTab('chat')}
                                className={`flex-1 py-4 text-sm font-bold transition-colors ${activeTab === 'chat' ? 'bg-pink-500/10 text-pink-400 border-b-2 border-pink-500' : 'text-gray-400 hover:text-white'}`}
                            >
                                Discussion
                            </button>
                            <button
                                onClick={() => setActiveTab('coach')}
                                className={`flex-1 py-4 text-sm font-bold transition-colors ${activeTab === 'coach' ? 'bg-purple-500/10 text-purple-400 border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'}`}
                            >
                                Coaching IA 4 Couches
                            </button>
                        </div>

                        {/* CONTENT */}
                        <div className="flex-1 p-6 bg-black/40 min-h-[400px]">
                            {activeTab === 'chat' ? (
                                <div className="space-y-6">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center border border-pink-500/30 flex-shrink-0">
                                            <Brain className="w-4 h-4 text-pink-400" />
                                        </div>
                                        <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-4 text-sm text-gray-300 leading-relaxed max-w-[90%]">
                                            Bonjour David. Je sens que la journée a été intense. Veux-tu qu'on fasse un exercice de décompression ou préfères-tu simplement parler de ce qui te pèse ?
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3 justify-end">
                                        <div className="bg-pink-500/20 border border-pink-500/30 rounded-2xl rounded-tr-none p-4 text-sm text-white leading-relaxed max-w-[90%]">
                                            C'est la pression des investisseurs... J'ai besoin de clarifier mes idées.
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                                            <div className="w-4 h-4 text-white font-bold text-xs">YOU</div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 opacity-50">
                                        <h4 className="font-bold text-white text-sm">Niveau 1: Haiku (Gratuit)</h4>
                                        <p className="text-xs text-gray-400">Réponses rapides, surface.</p>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 opacity-75">
                                        <h4 className="font-bold text-white text-sm">Niveau 2: Sonnet</h4>
                                        <p className="text-xs text-gray-400">Analyse émotionnelle basique.</p>
                                    </div>
                                    <div className="p-4 bg-purple-500/20 rounded-xl border border-purple-500/50 shadow-lg shadow-purple-900/20">
                                        <div className="flex justify-between items-center mb-1">
                                            <h4 className="font-bold text-white text-sm">Niveau 3: Opus (Pro)</h4>
                                            <span className="text-[10px] bg-purple-500 text-white px-2 py-0.5 rounded-full">ACTIF</span>
                                        </div>
                                        <p className="text-xs text-purple-200">Raisonnement profond, mémoire long terme, stratégie psychologique complète.</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* INPUT */}
                        <div className="p-4 border-t border-white/5 bg-black/20 flex items-center justify-center space-x-6">
                            <button className="p-3 rounded-full bg-pink-500 hover:bg-pink-400 text-white shadow-lg shadow-pink-500/30 transition-all transform hover:scale-105">
                                <Mic className="w-6 h-6" />
                            </button>
                        </div>
                    </GlassCard>
                </div>
            </div>

            {/* SECTION 2: TETRABRAME (MUSIC) */}
            <div className="pt-20 border-t border-white/10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-black text-white mb-2">Tetra<span className="text-purple-400">Brame</span></h2>
                        <p className="text-xl text-gray-400 italic">"Quand la Sagesse Devient Mélodie"</p>
                    </div>
                    <div className="flex space-x-2 mt-4 md:mt-0">
                        <button className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-orange-500/20 hover:border-orange-500 hover:text-orange-400 transition-all text-sm font-bold flex items-center"><Flame className="w-4 h-4 mr-2" /> Joie</button>
                        <button className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-blue-500/20 hover:border-blue-500 hover:text-blue-400 transition-all text-sm font-bold flex items-center"><BookOpen className="w-4 h-4 mr-2" /> Étude</button>
                        <button className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-purple-500/20 hover:border-purple-500 hover:text-purple-400 transition-all text-sm font-bold flex items-center"><Smile className="w-4 h-4 mr-2" /> Techouva</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* PLAYER */}
                    <div className="md:col-span-2 bg-gradient-to-br from-purple-900/40 to-black border border-purple-500/30 rounded-3xl p-8 flex flex-col justify-center items-center text-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/sound-waves.png')] opacity-10"></div>
                        <div className="w-32 h-32 bg-black rounded-full border-4 border-purple-500 flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(168,85,247,0.4)] relative z-10">
                            <Music className="w-12 h-12 text-purple-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1 relative z-10">Likoutey Moharan - Torah 282</h3>
                        <p className="text-purple-300 text-sm mb-8 relative z-10">Azamra (I Will Sing)</p>

                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-xl relative z-10"
                        >
                            {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                        </button>

                        <div className="mt-8 text-xs text-gray-500 relative z-10">
                            Credits: Dan Levy (Direction Créative) • Moshé Meira (Mastering)
                        </div>
                    </div>

                    {/* IMPACT STATS */}
                    <div className="space-y-4">
                        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
                            <div className="text-3xl font-black text-white mb-1">400+</div>
                            <div className="text-xs text-gray-500 uppercase">Chansons Produites</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
                            <div className="text-3xl font-black text-white mb-1">7,000</div>
                            <div className="text-xs text-gray-500 uppercase">Livres Objectif</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
                            <div className="text-3xl font-black text-white mb-1">Global</div>
                            <div className="text-xs text-gray-500 uppercase">Portée Mondiale</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
