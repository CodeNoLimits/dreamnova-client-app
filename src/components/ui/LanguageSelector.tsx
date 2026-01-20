'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LanguageSelector = () => {
    const { lang, setLang } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: 'en', label: 'English', flag: '🇺🇸' },
        { code: 'fr', label: 'Français', flag: '🇫🇷' },
        { code: 'he', label: 'עברית', flag: '🇮🇱' }
    ];

    const currentLang = languages.find(l => l.code === lang);

    return (
        <div className="relative z-[100]">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
                <span className="text-lg">{currentLang?.flag}</span>
                <span className="text-sm font-bold text-gray-300 uppercase">{lang}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-40 bg-[#0A0A0F] border border-white/10 rounded-xl shadow-xl overflow-hidden"
                    >
                        {languages.map((l) => (
                            <button
                                key={l.code}
                                onClick={() => {
                                    setLang(l.code as 'en' | 'fr' | 'he');
                                    setIsOpen(false);
                                }}
                                className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors text-left"
                            >
                                <span className="flex items-center">
                                    <span className="mr-3 text-lg">{l.flag}</span>
                                    <span className={`text-sm ${lang === l.code ? 'text-white font-bold' : 'text-gray-400'}`}>
                                        {l.label}
                                    </span>
                                </span>
                                {lang === l.code && <Check className="w-4 h-4 text-cyan-500" />}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
