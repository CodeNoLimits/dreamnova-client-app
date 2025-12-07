'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'fr' | 'he';

interface LanguageContextType {
    lang: Language;
    setLang: (lang: Language) => void;
    dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState<Language>('en');

    useEffect(() => {
        // Try to get from localStorage
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('dreamnova-lang') as Language;
            // eslint-disable-next-line react-hooks/set-state-in-effect
            if (saved) setLang(saved);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('dreamnova-lang', lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
    }, [lang]);

    const dir = lang === 'he' ? 'rtl' : 'ltr';

    return (
        <LanguageContext.Provider value={{ lang, setLang, dir }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
