'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Brain,
    Heart,
    Sparkles,
    MessageCircle,
    ArrowRight,
    ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '@ai-sdk/react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { LanguageSelector } from '@/components/ui/LanguageSelector';

// --- COMPONENTS ---
const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl ${className}`}>
        {children}
    </div>
);

const NeonButton = ({ children, onClick, variant = 'pink', className = "", size = 'md' }: { children: React.ReactNode, onClick?: () => void, variant?: 'pink' | 'purple' | 'cyan', className?: string, size?: 'sm' | 'md' | 'lg' }) => {
    const gradients = {
        pink: 'from-pink-500 to-rose-600 shadow-pink-500/30',
        purple: 'from-purple-600 to-indigo-600 shadow-purple-500/30',
        cyan: 'from-cyan-500 to-blue-600 shadow-cyan-500/30'
    };
    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-8 py-4 text-lg',
        lg: 'px-10 py-5 text-xl'
    };
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`relative group overflow-hidden rounded-xl font-bold text-white shadow-lg transition-all duration-300 bg-gradient-to-r ${gradients[variant]} ${sizes[size]} ${className}`}
        >
            {children}
        </motion.button>
    );
};

// --- CHAT INTERFACE ---
const ChatInterface = () => {
    const chatHelpers = useChat({
        api: '/api/tera-chat',
        initialMessages: [
            {
                id: 'welcome',
                role: 'assistant',
                content: "Shalom. Je suis Sandy, ton sanctuaire de résilience. Comment te sens-tu aujourd'hui ?"
            }
        ]
    } as any);
    const { messages, input, handleInputChange, handleSubmit, isLoading } = chatHelpers as any;
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="h-[600px] flex flex-col bg-black/40 border border-white/10 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
                <div className="flex items-center">
                    <Heart className="w-5 h-5 text-pink-500 mr-2" />
                    <span className="font-bold text-white">Sandy AI Therapist</span>
                </div>
                <div className="text-xs text-gray-400">Mode: Empathie Radicale</div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((m: any) => (
                    <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-4 rounded-2xl ${m.role === 'user' ? 'bg-pink-600 text-white' : 'bg-white/10 text-gray-200'}`}>
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white/10 p-4 rounded-2xl">
                            <Sparkles className="w-5 h-5 text-pink-500 animate-spin" />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-white/5">
                <div className="relative">
                    <input
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Parle-moi..."
                        className="w-full bg-black/50 border border-white/10 rounded-xl pl-4 pr-12 py-4 text-white focus:outline-none focus:border-pink-500 transition-colors"
                    />
                    <button type="submit" className="absolute right-2 top-2 p-2 bg-pink-500 rounded-lg hover:bg-pink-400 transition-colors">
                        <ArrowRight className="w-5 h-5 text-white" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default function TeraMindPage() {
    const { lang } = useLanguage();
    const t = translations[lang].teraMind;
    const common = translations[lang].common;
    const [showAppLayer, setShowAppLayer] = useState(false);

    return (
        <div className="min-h-screen bg-[#05050A] text-white selection:bg-purple-500/30">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#05050A]/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                            <Brain className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">Tera<span className="text-purple-400">Mind</span></span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <LanguageSelector />
                        <Link href="/">
                            <NeonButton variant="cyan" size="sm">
                                <ArrowRight className="mr-2 w-4 h-4 rotate-180" /> {common.backToHub}
                            </NeonButton>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-6">
                            <Sparkles className="w-3 h-3 mr-2" /> Spirit-Tech Revolution
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
                            {t.title}
                        </h1>
                        <p className="text-xl text-gray-400 mb-8 leading-relaxed max-w-lg">
                            {t.subtitle}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href="https://tera-mind-sanctuaire-de-r-silience-640844031185.us-west1.run.app" target="_blank" rel="noopener noreferrer">
                                <NeonButton variant="cyan" size="lg" className="w-full sm:w-auto">
                                    <ExternalLink className="mr-2 w-5 h-5" /> {common.launchApp}
                                </NeonButton>
                            </a>
                            <a href="https://devpost.com/software/dream-ai-rip6hw" target="_blank" rel="noopener noreferrer">
                                <NeonButton variant="purple" size="lg" className="w-full sm:w-auto">
                                    <ExternalLink className="mr-2 w-5 h-5" /> {t.buttons.reputation}
                                </NeonButton>
                            </a>
                        </div>
                    </motion.div>

                    {/* HERO IMAGE */}
                    <div className="relative w-full h-[400px] rounded-3xl overflow-hidden border border-white/10 group">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#05050A] z-10"></div>
                        <div className="absolute inset-0 bg-[url('/images/tera-mind-hero.png')] bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-1000"></div>
                        <div className="absolute bottom-10 left-10 z-20">
                            <h3 className="text-2xl font-bold text-white mb-2">{t.tagline}</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features / App Layer */}
            <section className="py-20 px-6 bg-[#05050A]">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* CHATBOT */}
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                            <MessageCircle className="w-8 h-8 mr-4 text-pink-500" />
                            {common.liveSession}
                        </h2>
                        <ChatInterface />
                    </div>

                    {/* FEATURES */}
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                            <Sparkles className="w-8 h-8 mr-4 text-pink-500" />
                            {common.features}
                        </h2>
                        <GlassCard>
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="p-2 bg-pink-500/10 rounded-lg mr-4 text-pink-400 mt-1"><Brain className="w-6 h-6" /></div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg">{t.features.cognitive.title}</h3>
                                        <p className="text-gray-400 text-sm">{t.features.cognitive.desc}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="p-2 bg-purple-500/10 rounded-lg mr-4 text-purple-400 mt-1"><Heart className="w-6 h-6" /></div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg">{t.features.emotional.title}</h3>
                                        <p className="text-gray-400 text-sm">{t.features.emotional.desc}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="p-2 bg-indigo-500/10 rounded-lg mr-4 text-indigo-400 mt-1"><Sparkles className="w-6 h-6" /></div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg">{t.features.exercises.title}</h3>
                                        <p className="text-gray-400 text-sm">{t.features.exercises.desc}</p>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </section>
        </div>
    );
}

