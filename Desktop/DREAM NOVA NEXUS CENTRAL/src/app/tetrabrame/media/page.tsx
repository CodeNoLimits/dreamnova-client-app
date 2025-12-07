'use client';

import React from 'react';
import {
    Youtube,
    Instagram,
    Video,
    Users,
    Zap,
    PlayCircle,
    ArrowLeft,
    Layers,
    Wand2,
    Aperture,
    TrendingUp
} from 'lucide-react';
import Link from 'next/link';

const ChannelCard = ({ icon, title, strategy, color }: { icon: React.ReactNode, title: string, strategy: string, color: string }) => (
    <div className={`p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-${color}-500/50 transition-all group`}>
        <div className={`w-12 h-12 rounded-full bg-${color}-500/20 flex items-center justify-center mb-4 text-${color}-400 group-hover:scale-110 transition-transform`}>
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed">{strategy}</p>
    </div>
);

const TechBadge = ({ label }: { label: string }) => (
    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300 font-mono">
        {label}
    </span>
);

export default function TetraMediaPage() {
    return (
        <div className="h-screen overflow-y-auto bg-[#05050A] text-gray-100 font-sans pb-40">

            {/* Nav */}
            <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center space-x-2">
                    <Video className="w-6 h-6 text-red-500" />
                    <span className="text-xl font-bold">Tetra<span className="text-red-500">Media</span></span>
                </div>
                <Link href="/tetrabrame" className="text-sm text-gray-400 hover:text-white flex items-center transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Retour Musique
                </Link>
            </nav>

            <main className="max-w-7xl mx-auto px-4 mt-10">

                {/* HERO - PIVOT "UNIVERSAL CREATOR" */}
                <div className="text-center mb-24 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none"></div>

                    <div className="inline-flex items-center px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-bold tracking-widest uppercase mb-6 animate-in fade-in slide-in-from-bottom-4">
                        <Zap className="w-3 h-3 mr-2" /> Pour Tous les Créateurs & Entrepreneurs
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 relative z-10 tracking-tight">
                        L&apos;ÉCOLE DE LA <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">VIRALITÉ IA.</span>
                    </h1>

                    <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 relative z-10 leading-relaxed">
                        Ce n&apos;est pas juste pour nous. C&apos;est pour <strong>VOUS</strong>.
                        <br />
                        Nous ouvrons notre &quot;Black Box&quot; : les workflows Flow, l&apos;IA Générative et les stratégies d&apos;automatisation qui font exploser n&apos;importe quelle chaîne YouTube ou compte TikTok aujourd&apos;hui.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 relative z-10">
                        <button className="bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-gray-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center">
                            <PlayCircle className="w-5 h-5 mr-2" /> Voir la Masterclass Gratuite
                        </button>
                        <button className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all backdrop-blur-md">
                            Explorer les Outils
                        </button>
                    </div>
                </div>

                {/* THE TECH STACK (FLOW & VIDEO GEN) */}
                <div className="mb-32">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">La Stack Technique &quot;Insider&quot;</h2>
                        <p className="text-gray-400">Les outils que les top 1% des créateurs utilisent (et que nous enseignons).</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-8 bg-gradient-to-b from-[#1a1a20] to-black border border-white/10 rounded-3xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Layers className="w-24 h-24 text-blue-500" />
                            </div>
                            <div className="mb-6 w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                                <Wand2 className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Video Gen & Flow</h3>
                            <p className="text-sm text-gray-400 mb-6">
                                Maîtrisez les workflows nodaux (ComfyUI, Flow) pour générer des vidéos uniques sans caméra. Transformez du texte en scènes cinématographiques.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <TechBadge label="ComfyUI" />
                                <TechBadge label="Runway Gen-3" />
                                <TechBadge label="Luma" />
                            </div>
                        </div>

                        <div className="p-8 bg-gradient-to-b from-[#1a1a20] to-black border border-white/10 rounded-3xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Aperture className="w-24 h-24 text-purple-500" />
                            </div>
                            <div className="mb-6 w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Avatar & Cloning</h3>
                            <p className="text-sm text-gray-400 mb-6">
                                Créez votre double numérique ou des présentateurs IA indétectables. Clonez votre voix pour produire du contenu en 10 langues simultanément.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <TechBadge label="HeyGen" />
                                <TechBadge label="ElevenLabs" />
                                <TechBadge label="Sync Labs" />
                            </div>
                        </div>

                        <div className="p-8 bg-gradient-to-b from-[#1a1a20] to-black border border-white/10 rounded-3xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <TrendingUp className="w-24 h-24 text-green-500" />
                            </div>
                            <div className="mb-6 w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center text-green-400">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Viral Automation</h3>
                            <p className="text-sm text-gray-400 mb-6">
                                Automatisez le montage (Opus Clip) et la publication. Détectez les tendances avant qu&apos;elles n&apos;explosent. Le &quot;Growth Hacking&quot; appliqué à YouTube.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <TechBadge label="Opus Clip" />
                                <TechBadge label="Make.com" />
                                <TechBadge label="TrendOS" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* CHANNEL STRATEGY (UNIVERSAL) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                    <ChannelCard
                        icon={<Youtube className="w-6 h-6" />}
                        title="YouTube Empire"
                        color="red"
                        strategy="Le Moteur de Recherche : Comment ranker sur des mots-clés compétitifs (ex: 'Investissement', 'Méditation', 'Tech') sans montrer son visage (Faceless Channels)."
                    />
                    <ChannelCard
                        icon={<span className="font-bold text-xl">Tk</span>}
                        title="TikTok Velocity"
                        color="pink"
                        strategy="L&apos;Algorithme de Découverte : Créer des hooks visuels irrésistibles en 3 secondes grâce aux générations Midjourney animées."
                    />
                    <ChannelCard
                        icon={<Instagram className="w-6 h-6" />}
                        title="Insta Authority"
                        color="purple"
                        strategy="La Preuve Sociale : Transformer votre expertise en Carrousels IA et Reels haute qualité pour vendre du High-Ticket."
                    />
                </div>

                {/* INFLUENCER / PARTNER PROGRAM */}
                <div className="bg-gradient-to-r from-gray-900 to-black border border-white/10 rounded-3xl p-12 flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <div className="inline-block px-3 py-1 mb-4 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-bold uppercase">
                            DreamNova Partner Program
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Monétisez votre Influence</h2>
                        <p className="text-gray-400 mb-6">
                            Vous avez une audience ? Utilisez nos outils pour créer mieux, et vendez nos formations à votre communauté.
                            <br /><br />
                            Nous vous fournissons les <strong>scripts</strong>, les <strong>assets vidéos</strong> et la <strong>technologie</strong>.
                        </p>
                        <button className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors flex items-center shadow-lg shadow-white/10">
                            <Zap className="w-4 h-4 mr-2" /> Devenir Partenaire
                        </button>
                    </div>
                    <div className="md:w-1/2 grid grid-cols-2 gap-4">
                        <div className="bg-white/5 p-4 rounded-xl text-center border border-white/5 hover:border-yellow-500/30 transition-colors">
                            <div className="text-2xl font-bold text-white mb-1">30-50%</div>
                            <div className="text-xs text-gray-500 uppercase">RevShare Généreux</div>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl text-center border border-white/5 hover:border-yellow-500/30 transition-colors">
                            <div className="text-2xl font-bold text-white mb-1">White Label</div>
                            <div className="text-xs text-gray-500 uppercase">Vendez sous votre marque</div>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl text-center col-span-2 border border-white/5 hover:border-yellow-500/30 transition-colors">
                            <div className="text-2xl font-bold text-white mb-1">Access to Flow</div>
                            <div className="text-xs text-gray-500 uppercase">Nos Workflows ComfyUI Privés Offerts</div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
