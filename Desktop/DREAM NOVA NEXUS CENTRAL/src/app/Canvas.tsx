'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useRouter } from 'next/navigation';

// --- TRANSLATIONS ---
const translations = {
    en: {
        hub: { label: 'Nexus Hub', description: 'Central Command' },
        roadmap: { label: 'Roadmap & Targets', description: 'Strategic Agenda' },
        masterplan: { label: 'The Masterplan', description: 'Recruitment & Strategy' },
        pitch: { label: 'Pitch Deck', description: 'For Investors Only' },
        global: { label: 'DreamNova Global', description: 'The Anti-Facebook' },
        consult: { label: 'DreamNova Consult', description: 'AI Agency & Velocity' },
        tera: { label: 'Tera Mind', description: 'Spirit-Tech & AI Therapy' },
        academy: { label: 'DreamNova Academy', description: 'Learn the Method' },
        ecom: { label: 'E-Com Velocity', description: 'Autonomous Retail' },
        amazon: { label: 'Ha-Mazon', description: 'Distributed Logistics' },
        breslev: { label: 'Breslev Books', description: 'AI RAG & Wisdom' },
        music: { label: 'TetraBrame', description: 'AI Music & Hafatsa' },
        media: { label: 'TetraMedia', description: 'Content Factory' },
        roi: { label: 'ROI Dashboard', description: 'Investment Thesis' },
        kolel: { label: 'Kolel AI', description: 'Torah Study & RAG' },
        soulbond: { label: 'SoulBond', description: 'Chesed Network' },
        bezalel: { label: 'Project Bezalel', description: 'Generative Art' },
        foundation: { label: 'The Nova Foundation', description: 'Philanthropy' },
        kotel: { label: 'Kotel Connection', description: 'Daily Alignment' },
        hok: { label: 'Hok Breslev', description: 'Spiritual R&D' },
        sport: { label: 'Performance', description: 'Body Maintenance' },
        mobileTitle: 'Mobile Command Center',
        investorMode: 'Investor View (Confidential)',
        navTitle: 'Infinite Canvas Navigation'
    },
    fr: {
        hub: { label: 'Nexus Hub', description: 'Commandement Central' },
        roadmap: { label: 'Feuille de Route', description: 'Agenda Stratégique' },
        masterplan: { label: 'Le Masterplan', description: 'Recrutement & Stratégie' },
        pitch: { label: 'Pitch Deck', description: 'Pour Investisseurs' },
        global: { label: 'DreamNova Global', description: "L'Anti-Facebook" },
        consult: { label: 'DreamNova Consult', description: 'Agence IA & Vélocité' },
        tera: { label: 'Tera Mind', description: 'Spirit-Tech & Thérapie IA' },
        academy: { label: 'DreamNova Academy', description: 'Apprendre la Méthode' },
        ecom: { label: 'E-Com Velocity', description: 'Retail Autonome' },
        amazon: { label: 'Ha-Mazon', description: 'Logistique Distribuée' },
        breslev: { label: 'Livres Breslev', description: 'IA RAG & Sagesse' },
        music: { label: 'TetraBrame', description: 'Musique IA & Hafatsa' },
        media: { label: 'TetraMedia', description: 'Usine de Contenu' },
        roi: { label: 'Tableau de Bord ROI', description: "Thèse d'Investissement" },
        kolel: { label: 'Kolel AI', description: 'Étude Torah & RAG' },
        soulbond: { label: 'SoulBond', description: 'Réseau de Chesed' },
        bezalel: { label: 'Projet Bezalel', description: 'Art Génératif' },
        foundation: { label: 'La Fondation Nova', description: 'Philanthropie' },
        kotel: { label: 'Connexion Kotel', description: 'Alignement Quotidien' },
        hok: { label: 'Hok Breslev', description: 'R&D Spirituelle' },
        sport: { label: 'Performance', description: 'Maintenance Physique' },
        mobileTitle: 'Centre de Commandement Mobile',
        investorMode: 'Vue Investisseur (Confidentiel)',
        navTitle: 'Navigation Canvas Infini'
    },
    he: {
        hub: { label: 'מרכז נקסוס', description: 'פיקוד מרכזי' },
        roadmap: { label: 'מפת דרכים ויעדים', description: 'אג׳נדה אסטרטגית' },
        masterplan: { label: 'תוכנית העל', description: 'גיוס ואסטרטגיה' },
        pitch: { label: 'מצגת למשקיעים', description: 'למשקיעים בלבד' },
        global: { label: 'דרים-נובה גלובל', description: 'האנטי-פייסבוק' },
        consult: { label: 'דרים-נובה ייעוץ', description: 'סוכנות AI ומהירות' },
        tera: { label: 'תרה מיינד', description: 'טכנולוגיה רוחנית וטיפול AI' },
        academy: { label: 'אקדמיית דרים-נובה', description: 'למד את השיטה' },
        ecom: { label: 'אי-קום ולוסיטי', description: 'קמעונאות אוטונומית' },
        amazon: { label: 'ה-מזון', description: 'לוגיסטיקה מבוזרת' },
        breslev: { label: 'ברסלב ספרים', description: 'AI RAG וחוכמה' },
        music: { label: 'טטרה-בראם', description: 'מוזיקת AI והפצה' },
        media: { label: 'טטרה-מדיה', description: 'מפעל תוכן' },
        roi: { label: 'לוח בקרה ROI', description: 'תזה השקעה' },
        kolel: { label: 'כולל AI', description: 'לימוד תורה ו-RAG' },
        soulbond: { label: 'סול-בונד', description: 'רשת חסד' },
        bezalel: { label: 'פרויקט בצלאל', description: 'אומנות יוצרת' },
        foundation: { label: 'קרן נובה', description: 'פילנתרופיה' },
        kotel: { label: 'חיבור לכותל', description: 'התבודדות יומית' },
        hok: { label: 'חוק ברסלב', description: 'מו״פ רוחני' },
        sport: { label: 'ביצועים', description: 'תחזוקת הגוף' },
        mobileTitle: 'מרכז פיקוד נייד',
        investorMode: 'מבט משקיעים (חסוי)',
        navTitle: 'ניווט קנבס אינסופי'
    }
};

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    Globe,
    Briefcase,
    Brain,
    ShoppingCart,
    Hexagon,
    BookOpen,
    List,
    Grid,
    TrendingUp,
    Lock,
    X,
    GraduationCap,
    Presentation,
    Music,
    Video,
    Map,
    Flag,
    ShoppingBag,
    ArrowRight,
    PieChart,
    Scroll,
    Heart,
    Palette,
    Gift,
    Activity, // Added
    Sun, // Added
    Anchor // Added
} from 'lucide-react';

// --- TYPES ---
type NodeType = {
    id: string;
    position: { x: number; y: number };
    data: {
        label: string;
        description: string;
        icon: React.ReactNode;
        gradient: string;
        href: string;
        traction: string;
        dcs: string;
        investorMode?: boolean;
        size?: 'large' | 'medium' | 'small'; // Added size prop
    };
};

type EdgeType = {
    id: string;
    source: string;
    target: string;
    style: {
        stroke: string;
        strokeWidth?: string;
        strokeDasharray?: string;
    };
};

// --- DATA ---
// Note: Labels/Descriptions will be overridden by translations
const initialNodes: NodeType[] = [
    // --- ROW 1: STRATEGY (Y = -220) ---
    {
        id: 'roadmap', position: { x: -330, y: -220 },
        data: { label: 'Roadmap & Targets', description: 'Strategic Agenda', icon: <Map className="w-8 h-8 text-white" />, gradient: 'from-cyan-600 to-blue-700', href: '/roadmap', traction: 'Planning', dcs: 'N/A', size: 'small' },
    },
    {
        id: 'masterplan', position: { x: -110, y: -220 },
        data: { label: 'The Masterplan', description: 'Recruitment & Strategy', icon: <Flag className="w-8 h-8 text-white" />, gradient: 'from-gray-600 to-gray-800', href: '/masterplan', traction: 'Internal', dcs: 'N/A', size: 'small' },
    },
    {
        id: 'pitch', position: { x: 110, y: -220 },
        data: { label: 'Pitch Deck', description: 'For Investors Only', icon: <Presentation className="w-8 h-8 text-white" />, gradient: 'from-green-500 to-emerald-700', href: '/pitch-deck', traction: 'Seed Open', dcs: 'N/A', size: 'small' },
    },
    {
        id: 'roi', position: { x: 330, y: -220 },
        data: { label: 'ROI Dashboard', description: 'Investment Thesis', icon: <PieChart className="w-6 h-6 text-white" />, gradient: 'from-green-600 to-emerald-800', href: '/roi', traction: 'Alpha', dcs: 'N/A', size: 'small' },
    },

    // --- ROW 2: CORE (Y = 0) ---
    {
        id: 'global', position: { x: -440, y: 0 },
        data: { label: 'DreamNova Global', description: 'The Anti-Facebook', icon: <Globe className="w-8 h-8 text-white" />, gradient: 'from-blue-500 to-cyan-500', href: '/dreamnova-global', traction: 'Beta Closed', dcs: '94/100', size: 'small' },
    },
    {
        id: 'consult', position: { x: -220, y: 0 },
        data: { label: 'DreamNova Consult', description: 'AI Agency & Velocity', icon: <Briefcase className="w-8 h-8 text-white" />, gradient: 'from-purple-500 to-pink-500', href: '/dreamnova-consult', traction: '$50k MRR', dcs: '98/100', size: 'small' },
    },
    // CENTER HUB
    {
        id: 'hub', position: { x: 0, y: 0 },
        data: { label: 'Nexus Hub', description: 'Central Command', icon: <Hexagon className="w-10 h-10 text-white" />, gradient: 'from-gray-700 to-black', href: '/', traction: 'N/A', dcs: 'N/A', size: 'medium' },
    },
    {
        id: 'tera', position: { x: 220, y: 0 },
        data: { label: 'Tera Mind', description: 'Spirit-Tech & AI Therapy', icon: <Brain className="w-8 h-8 text-white" />, gradient: 'from-pink-500 to-rose-500', href: '/tera-mind', traction: 'Proto v1', dcs: '88/100', size: 'small' },
    },
    {
        id: 'academy', position: { x: 440, y: 0 },
        data: { label: 'DreamNova Academy', description: 'Learn the Method', icon: <GraduationCap className="w-8 h-8 text-white" />, gradient: 'from-yellow-400 to-orange-500', href: '/academy', traction: 'Pre-launch', dcs: 'N/A', size: 'small' },
    },

    // --- ROW 3: VENTURES (Y = 220) ---
    {
        id: 'e-com', position: { x: -330, y: 220 },
        data: { label: 'E-Com Velocity', description: 'Autonomous Retail', icon: <ShoppingBag className="w-6 h-6 text-white" />, gradient: 'from-emerald-500 to-teal-600', href: '/ecommerce-accelerator', traction: 'High Demand', dcs: '96/100', size: 'small' },
    },
    {
        id: 'amazon', position: { x: -110, y: 220 },
        data: { label: 'Ha-Mazon', description: 'Distributed Logistics', icon: <ShoppingCart className="w-6 h-6 text-white" />, gradient: 'from-orange-500 to-red-500', href: '/ha-mazon', traction: '3 Hubs', dcs: '91/100', size: 'small' },
    },
    {
        id: 'breslev', position: { x: 110, y: 220 },
        data: { label: 'Breslev Books', description: 'AI RAG & Wisdom', icon: <BookOpen className="w-6 h-6 text-white" />, gradient: 'from-amber-500 to-yellow-600', href: '/breslev-books', traction: 'Live', dcs: '95/100', size: 'small' },
    },
    {
        id: 'tetra-music', position: { x: 330, y: 220 },
        data: { label: 'TetraBrame', description: 'AI Music & Hafatsa', icon: <Music className="w-5 h-5 text-white" />, gradient: 'from-purple-600 to-indigo-600', href: '/tetrabrame', traction: '400+ Songs', dcs: '92/100', size: 'small' },
    },

    // --- ROW 4: SATELLITES (Y = 440) ---
    {
        id: 'tetra-media', position: { x: -440, y: 440 },
        data: { label: 'TetraMedia', description: 'Content Factory', icon: <Video className="w-5 h-5 text-white" />, gradient: 'from-red-500 to-pink-600', href: '/tetrabrame/media', traction: 'New', dcs: 'N/A', size: 'small' },
    },
    {
        id: 'kolel', position: { x: -220, y: 440 },
        data: { label: 'Kolel AI', description: 'Torah Study & RAG', icon: <Scroll className="w-5 h-5 text-white" />, gradient: 'from-blue-600 to-indigo-700', href: '#', traction: 'Concept', dcs: 'N/A', size: 'small' },
    },
    {
        id: 'soulbond', position: { x: 0, y: 440 },
        data: { label: 'SoulBond', description: 'Chesed Network', icon: <Heart className="w-5 h-5 text-white" />, gradient: 'from-rose-500 to-red-600', href: '#', traction: 'Concept', dcs: 'N/A', size: 'small' },
    },
    {
        id: 'bezalel', position: { x: 220, y: 440 },
        data: { label: 'Project Bezalel', description: 'Generative Art', icon: <Palette className="w-5 h-5 text-white" />, gradient: 'from-fuchsia-500 to-purple-600', href: '#', traction: 'Concept', dcs: 'N/A', size: 'small' },
    },
    {
        id: 'foundation', position: { x: 440, y: 440 },
        data: { label: 'The Nova Foundation', description: 'Philanthropy', icon: <Gift className="w-5 h-5 text-white" />, gradient: 'from-teal-500 to-emerald-600', href: '#', traction: 'Planned', dcs: 'N/A', size: 'small' },
    },
];

const initialEdges: EdgeType[] = [
    // HUB CONNECTIONS (STARBURST)
    { id: 'e-hub-roadmap', source: 'hub', target: 'roadmap', style: { stroke: 'rgba(255, 255, 255, 0.1)' } },
    { id: 'e-hub-masterplan', source: 'hub', target: 'masterplan', style: { stroke: 'rgba(255, 255, 255, 0.1)' } },
    { id: 'e-hub-pitch', source: 'hub', target: 'pitch', style: { stroke: 'rgba(255, 255, 255, 0.1)' } },
    { id: 'e-hub-roi', source: 'hub', target: 'roi', style: { stroke: 'rgba(255, 255, 255, 0.1)' } },
    { id: 'e-hub-global', source: 'hub', target: 'global', style: { stroke: 'rgba(255, 255, 255, 0.1)' } },
    { id: 'e-hub-consult', source: 'hub', target: 'consult', style: { stroke: 'rgba(255, 255, 255, 0.1)' } },
    { id: 'e-hub-tera', source: 'hub', target: 'tera', style: { stroke: 'rgba(255, 255, 255, 0.1)' } },
    { id: 'e-hub-academy', source: 'hub', target: 'academy', style: { stroke: 'rgba(255, 255, 255, 0.1)' } },

    // VERTICAL FLOWS
    { id: 'e-consult-ecom', source: 'consult', target: 'e-com', style: { stroke: 'rgba(255, 255, 255, 0.05)' } },
    { id: 'e-ecom-amazon', source: 'e-com', target: 'amazon', style: { stroke: 'rgba(255, 255, 255, 0.05)' } },
    { id: 'e-tera-breslev', source: 'tera', target: 'breslev', style: { stroke: 'rgba(255, 255, 255, 0.05)' } },
    { id: 'e-breslev-music', source: 'breslev', target: 'tetra-music', style: { stroke: 'rgba(255, 255, 255, 0.05)' } },
];

// --- COMPOSANT NOEUD (GLASS NODE) ---
const GlassNode = ({ node, onClick, index, lang }: { node: NodeType; onClick: () => void; index: number; lang: 'en' | 'fr' | 'he' }) => {
    // Size configuration - SQUARES
    const sizeConfig = {
        large: { w: 'w-56', h: 'h-56', p: 'p-6', icon: 'w-16 h-16', title: 'text-xl', desc: 'text-sm' },
        medium: { w: 'w-48', h: 'h-48', p: 'p-5', icon: 'w-12 h-12', title: 'text-lg', desc: 'text-xs' },
        small: { w: 'w-40', h: 'h-40', p: 'p-4', icon: 'w-10 h-10', title: 'text-sm', desc: 'text-[10px]' },
    };

    const s = sizeConfig[node.data.size || 'small'];

    // Get translation
    const translationKey = node.id === 'e-com' ? 'ecom' : node.id === 'tetra-music' ? 'music' : node.id === 'tetra-media' ? 'media' : node.id;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const t: any = translations[lang][translationKey as keyof typeof translations['en']] || node.data;

    return (
        <motion.div
            onClick={onClick}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: index * 0.05
            }}
            whileHover={{
                scale: 1.05,
                boxShadow: "0 0 60px -10px rgba(255,255,255,0.1)",
                borderColor: "rgba(255,255,255,0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            className={`
                absolute transform -translate-x-1/2 -translate-y-1/2
                backdrop-blur-xl bg-black/40 border border-white/10
                rounded-2xl ${s.p} ${s.w} ${s.h} text-center flex flex-col items-center justify-center
                shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)]
                cursor-pointer z-10 group
                ${lang === 'he' ? 'rtl' : 'ltr'}
            `}
            style={{ left: node.position.x, top: node.position.y }}
        >
            {/* Pulse Effect for Hub */}
            {node.id === 'hub' && (
                <motion.div
                    className="absolute inset-0 rounded-2xl bg-cyan-500/20 -z-10"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
            )}

            <motion.div
                className={`
                    ${s.icon} mb-3 rounded-xl
                    flex items-center justify-center
                    bg-gradient-to-br ${node.data.gradient}
                    shadow-lg group-hover:shadow-2xl transition-shadow
                `}
                whileHover={{ rotate: [0, -5, 5, 0] }}
            >
                {React.cloneElement(node.data.icon as React.ReactElement<{ className?: string }>, { className: "w-1/2 h-1/2 text-white" })}
            </motion.div>

            <h3 className={`${s.title} font-bold text-white mb-1 leading-tight group-hover:text-cyan-300 transition-colors`}>{t.label}</h3>
            <p className={`${s.desc} text-gray-400 font-medium tracking-wide leading-tight`}>{t.description}</p>

            {node.data.investorMode && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-2 pt-2 border-t border-white/10 w-full"
                >
                    <div className="flex justify-between text-[9px] mb-1">
                        <span className="text-gray-500">Traction</span>
                        <span className="text-green-400 font-bold">{node.data.traction}</span>
                    </div>
                    <div className="flex justify-between text-[9px]">
                        <span className="text-gray-500">DCS</span>
                        <span className="text-cyan-400 font-bold">{node.data.dcs}</span>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default function VentureOS_Canvas({ forceList = false }: { forceList?: boolean }) {
    const [isMobile, setIsMobile] = useState(false);
    const [viewMode, setViewMode] = useState<'canvas' | 'list'>(forceList ? 'list' : 'canvas');
    const [investorMode, setInvestorMode] = useState(false);
    const [showComingSoon, setShowComingSoon] = useState(false);
    const { lang, setLang } = useLanguage(); // Language State
    const router = useRouter();

    // Custom Canvas State
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    // Initial Center
    useEffect(() => {
        if (containerRef.current) {
            const { width, height } = containerRef.current.getBoundingClientRect();
            setPan({ x: width / 2, y: height / 2 });
        }
    }, []);

    // Navigation Helper
    const handleNavigation = (href: string) => {
        router.push(href);
    };

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (mobile || forceList) setViewMode('list');
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Custom Drag Handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setLastMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        const dx = e.clientX - lastMousePos.x;
        const dy = e.clientY - lastMousePos.y;
        setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
        setLastMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => setIsDragging(false);

    const handleNodeClick = (e: React.MouseEvent, node: NodeType) => {
        e.stopPropagation(); // Prevent drag start
        if (node.data.href) {
            handleNavigation(node.data.href);
        } else {
            setShowComingSoon(true);
        }
    };

    return (
        <div className={`w-full h-screen bg-[#05050A] relative overflow-hidden ${lang === 'he' ? 'font-sans' : ''}`}>
            {/* Controls */}
            <div className="absolute top-6 right-6 z-50 flex items-center space-x-3">
                {/* Language Switcher */}
                <button
                    onClick={() => setLang(lang === 'en' ? 'fr' : lang === 'fr' ? 'he' : 'en')}
                    className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs hover:bg-white/10 transition-colors"
                >
                    {lang === 'en' ? 'EN' : lang === 'fr' ? 'FR' : 'HE'}
                </button>

                <button
                    onClick={() => setInvestorMode(!investorMode)}
                    className={`p-3 rounded-full border transition-all ${investorMode ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'bg-white/5 border-white/10 text-gray-400'}`}
                    title="Investor Mode"
                >
                    <TrendingUp className="w-5 h-5" />
                </button>
                {isMobile && (
                    <button
                        onClick={() => setViewMode(viewMode === 'canvas' ? 'list' : 'canvas')}
                        className="p-3 rounded-full bg-white/5 border border-white/10 text-white"
                    >
                        {viewMode === 'canvas' ? <List className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
                    </button>
                )}
            </div>

            {viewMode === 'canvas' ? (
                <div
                    ref={containerRef}
                    className="w-full h-full cursor-grab active:cursor-grabbing relative overflow-hidden"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    {/* Background Grid */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-20"
                        style={{
                            backgroundPosition: `${pan.x}px ${pan.y}px`,
                            backgroundImage: 'radial-gradient(#333 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }}
                    />

                    {/* Container for content that moves */}
                    <div style={{ transform: `translate(${pan.x}px, ${pan.y}px)`, transition: isDragging ? 'none' : 'transform 0.1s ease-out' }}>

                        {/* EDGES (SVG Layer) */}
                        <svg className="absolute top-0 left-0 overflow-visible pointer-events-none" style={{ top: 0, left: 0 }}>
                            {initialEdges.map(edge => {
                                const sourceNode = initialNodes.find(n => n.id === edge.source);
                                const targetNode = initialNodes.find(n => n.id === edge.target);
                                if (!sourceNode || !targetNode) return null;

                                return (
                                    <motion.line
                                        key={edge.id}
                                        x1={sourceNode.position.x}
                                        y1={sourceNode.position.y}
                                        x2={targetNode.position.x}
                                        y2={targetNode.position.y}
                                        stroke={edge.style.stroke}
                                        strokeWidth="2"
                                        strokeDasharray="5,5"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        transition={{ duration: 1.5, delay: 0.5 }}
                                    />
                                );
                            })}
                        </svg>

                        {/* NODES */}
                        {initialNodes.map((node, i) => (
                            <GlassNode
                                key={node.id}
                                node={{ ...node, data: { ...node.data, investorMode } }}
                                index={i}
                                lang={lang}
                                onClick={() => handleNodeClick({ stopPropagation: () => { } } as React.MouseEvent, node)}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <ListView lang={lang} handleNavigation={handleNavigation} setShowComingSoon={setShowComingSoon} />
            )}

            {/* Overlay Text */}
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 pointer-events-none z-10 text-center w-full px-4">
                <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
                    Venture Studio <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">OS</span>
                </h1>
                <p className="text-gray-400 text-xs md:text-sm uppercase tracking-widest">
                    {translations[lang][investorMode ? 'investorMode' : 'navTitle']}
                </p>
            </div>

            {/* Coming Soon Modal */}
            {showComingSoon && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#0a0a0f] border border-white/10 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl relative">
                        <button onClick={() => setShowComingSoon(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white">
                            <X className="w-6 h-6" />
                        </button>
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Lock className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Coming Soon</h3>
                        <p className="text-gray-400 mb-6">This module is currently under development.</p>
                        <button onClick={() => setShowComingSoon(false)} className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors">
                            Understood
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

const ListView = ({ lang, handleNavigation, setShowComingSoon }: { lang: 'en' | 'fr' | 'he', handleNavigation: (href: string) => void, setShowComingSoon: (show: boolean) => void }) => (
    <div className={`min-h-screen bg-[#05050A] pb-40 ${lang === 'he' ? 'rtl' : 'ltr'}`}>
        <div className="sticky top-0 z-20 bg-[#05050A]/90 backdrop-blur-xl p-6 border-b border-white/5 shadow-2xl">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center"
            >
                <div>
                    <h1 className="text-2xl font-black text-white tracking-tight">
                        Venture Studio <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">OS</span>
                    </h1>
                    <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">{translations[lang].mobileTitle}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 animate-pulse">
                    <Hexagon className="w-5 h-5 text-white" />
                </div>
            </motion.div>
        </div>

        <div className="px-4 py-6 space-y-4">
            {initialNodes.filter(n => n.id !== 'hub').map((node, i) => {
                const translationKey = node.id === 'e-com' ? 'ecom' : node.id === 'tetra-music' ? 'music' : node.id === 'tetra-media' ? 'media' : node.id;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const t: any = translations[lang][translationKey as keyof typeof translations['en']] || node.data;
                return (
                    <motion.div
                        key={node.id}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => node.data.href ? handleNavigation(node.data.href) : setShowComingSoon(true)}
                        className="bg-white/5 border border-white/10 rounded-3xl p-5 flex items-center space-x-5 active:scale-95 transition-all cursor-pointer hover:bg-white/10 relative overflow-hidden group shadow-lg"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-r ${node.data.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />

                        <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center bg-gradient-to-br ${node.data.gradient} shadow-lg z-10`}>
                            {React.cloneElement(node.data.icon as React.ReactElement<{ className?: string }>, { className: "w-6 h-6 text-white" })}
                        </div>
                        <div className="flex-1 min-w-0 z-10">
                            <h3 className="font-bold text-white text-lg truncate tracking-tight">{t.label}</h3>
                            <p className="text-xs text-gray-400 truncate font-medium">{t.description}</p>
                        </div>
                        <div className="text-gray-600 group-hover:text-white transition-colors z-10">
                            <ArrowRight className="w-5 h-5" />
                        </div>
                    </motion.div>
                )
            })}
        </div>
    </div>
);
