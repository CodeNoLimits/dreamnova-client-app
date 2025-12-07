'use client';

import React, { useState } from 'react';
import {
    TrendingUp,
    PieChart,
    DollarSign,
    ArrowUpRight,
    Activity,
    Briefcase,
    ShoppingCart,
    Brain,
    Globe,
    Music,
    ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

// --- TRANSLATIONS ---
const translations = {
    en: {
        title: "THE INVESTMENT THESIS",
        subtitle: "A diversified portfolio (Venture Studio) designed to balance immediate cashflow and exponential valuation.",
        successRate: "Studio Success Rate: 84% (vs 42% Classic VC)",
        risk: "Risk",
        exitMultiple: "Exit Multiple",
        horizon: "Horizon",
        viewPL: "View P&L",
        whyWins: "Why the Venture Studio model wins?",
        riskDiluted: "Risk Diluted",
        riskDilutedDesc: "If a project fails, resources and tech are recycled into others. 0% IP loss.",
        velocity: "Velocity",
        velocityDesc: "We go from idea to market in 3 months thanks to our common stack (Antigravity).",
        capitalEfficiency: "Capital Efficiency",
        capitalEfficiencyDesc: "We spend 40% less than a classic startup to reach the same maturity stage.",
        nav: "Investor Intelligence",
        back: "Back to Hub",
        cards: {
            consult: { title: "DreamNova Consult", timeline: "Dividends (Immediate)", data: [{ l: "Net Margin", v: "35% - 45%" }, { l: "Model", v: "Productized Service" }, { l: "Role", v: "R&D Self-Funding" }, { l: "Valuation", v: "1x-2x Revenue" }] },
            amazon: { title: "Ha-Mazon Logistics", timeline: "5 Years (Acquisition)", data: [{ l: "Target Market", v: "Urban Logistics" }, { l: "Advantage", v: "ZFE Paris Monopoly" }, { l: "Unit Eco", v: "Positive from Hub #2" }, { l: "Exit", v: "Buyout by Metro/Uber" }] },
            tera: { title: "Tera Mind AI", timeline: "7 Years (IPO/Exit)", data: [{ l: "Market", v: "Digital Health ($400B)" }, { l: "SaaS Margin", v: "85%+" }, { l: "Barrier", v: "DTx Certification" }, { l: "Valuation", v: "15x-20x ARR" }] },
            global: { title: "DreamNova Global", timeline: "7-10 Years", data: [{ l: "Model", v: "HR Tech / Social" }, { l: "Virality", v: "K-Factor > 1.5" }, { l: "Data Asset", v: "DCS (Scoring)" }, { l: "Exit", v: "LinkedIn / Microsoft" }] },
            tetra: { title: "TetraBrame", timeline: "Perpetual", data: [{ l: "Type", v: "Music Royalties (IP)" }, { l: "Margin", v: "95% (Digital)" }, { l: "Volume", v: "140 Songs/Month" }, { l: "Yield", v: "12-15% Annual" }] }
        }
    },
    he: {
        title: "תזה ההשקעה",
        subtitle: "תיק מגוון (סטודיו להון סיכון) שנועד לאזן תזרים מזומנים מיידי ושווי אקספוננציאלי.",
        successRate: "שיעור הצלחה של הסטודיו: 84% (לעומת 42% ב-VC קלאסי)",
        risk: "סיכון",
        exitMultiple: "מכפיל אקזיט",
        horizon: "אופק",
        viewPL: "צפה ב-P&L",
        whyWins: "למה מודל הסטודיו להון סיכון מנצח?",
        riskDiluted: "סיכון מדולל",
        riskDilutedDesc: "אם פרויקט נכשל, המשאבים והטכנולוגיה ממוחזרים לאחרים. 0% אובדן IP.",
        velocity: "מהירות",
        velocityDesc: "אנו עוברים מרעיון לשוק תוך 3 חודשים הודות לסטאק המשותף שלנו (Antigravity).",
        capitalEfficiency: "יעילות הון",
        capitalEfficiencyDesc: "אנו מוציאים 40% פחות מסטארט-אפ קלאסי כדי להגיע לאותו שלב בגרות.",
        nav: "מודיעין משקיעים",
        back: "חזרה להאב",
        cards: {
            consult: { title: "דרים-נובה ייעוץ", timeline: "דיבידנדים (מיידי)", data: [{ l: "מרווח נקי", v: "35% - 45%" }, { l: "מודל", v: "שירות ממוצר" }, { l: "תפקיד", v: "מימון עצמי למו״פ" }, { l: "שווי", v: "1x-2x הכנסות" }] },
            amazon: { title: "ה-מזון לוגיסטיקה", timeline: "5 שנים (רכישה)", data: [{ l: "שוק יעד", v: "לוגיסטיקה עירונית" }, { l: "יתרון", v: "מונופול ZFE פריז" }, { l: "כלכלה יחידתית", v: "חיובי מהאב #2" }, { l: "אקזיט", v: "רכישה ע״י מטרו/אובר" }] },
            tera: { title: "תרה מיינד AI", timeline: "7 שנים (הנפקה/אקזיט)", data: [{ l: "שוק", v: "בריאות דיגיטלית ($400B)" }, { l: "מרווח SaaS", v: "85%+" }, { l: "חסם", v: "הסמכת DTx" }, { l: "שווי", v: "15x-20x ARR" }] },
            global: { title: "דרים-נובה גלובל", timeline: "7-10 שנים", data: [{ l: "מודל", v: "HR טק / חברתי" }, { l: "ויראליות", v: "K-Factor > 1.5" }, { l: "נכס דאטה", v: "DCS (ניקוד)" }, { l: "אקזיט", v: "לינקדאין / מיקרוסופט" }] },
            tetra: { title: "טטרה-בראם", timeline: "נצחי", data: [{ l: "סוג", v: "תמלוגי מוזיקה (IP)" }, { l: "מרווח", v: "95% (דיגיטלי)" }, { l: "נפח", v: "140 שירים/חודש" }, { l: "תשואה", v: "12-15% שנתי" }] }
        }
    }
};

type Translation = typeof translations.en;

const ROICard = ({ icon, title, multiple, timeline, risk, data, t }: { icon: React.ReactNode, title: string, multiple: string, timeline: string, risk: string, data: { l: string, v: string }[], t: Translation }) => (
    <div className="bg-[#0f0f13] border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-all group">
        <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-3">
                <div className="p-3 bg-white/5 rounded-xl text-cyan-400 group-hover:scale-110 transition-transform">
                    {icon}
                </div>
                <div>
                    <h3 className="font-bold text-white text-lg">{title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded ${risk === 'Low' ? 'bg-green-500/20 text-green-400' : risk === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                        {t.risk} : {risk}
                    </span>
                </div>
            </div>
            <div className="text-right">
                <div className="text-2xl font-black text-white">{multiple}x</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">{t.exitMultiple}</div>
            </div>
        </div>

        <div className="space-y-3 mb-6">
            {data.map((item: { l: string, v: string }, i: number) => (
                <div key={i} className="flex justify-between text-sm border-b border-white/5 pb-2 last:border-0">
                    <span className="text-gray-400">{item.l}</span>
                    <span className="text-white font-mono">{item.v}</span>
                </div>
            ))}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-4 border-t border-white/10">
            <span className="flex items-center"><Activity className="w-3 h-3 mr-1" /> {t.horizon}: {timeline}</span>
            <span className="text-cyan-500 font-bold flex items-center">{t.viewPL} <ArrowUpRight className="w-3 h-3 ml-1" /></span>
        </div>
    </div>
);

export default function ROIDashboard() {
    const [lang, setLang] = useState<'en' | 'he'>('en');
    const t = translations[lang as keyof typeof translations];

    return (
        <div className={`h-screen overflow-y-auto bg-[#05050A] text-gray-100 font-sans pb-40 ${lang === 'he' ? 'rtl' : 'ltr'}`}>
            <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto border-b border-white/5">
                <div className="flex items-center space-x-2">
                    <PieChart className="w-6 h-6 text-green-500" />
                    <span className="text-xl font-bold">Investor <span className="font-light text-green-200">Intelligence</span></span>
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setLang(lang === 'en' ? 'he' : 'en')}
                        className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs hover:bg-white/10 transition-colors"
                    >
                        {lang === 'en' ? 'HE' : 'EN'}
                    </button>
                    <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">{t.back}</Link>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 mt-12">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
                        {t.title}
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        {t.subtitle}
                        <br /><span className="text-green-400 font-bold">{t.successRate}</span>
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* 1. CONSULT (CASH COW) */}
                    <ROICard
                        title={t.cards.consult.title}
                        icon={<Briefcase />}
                        multiple="3-5"
                        timeline={t.cards.consult.timeline}
                        risk="Low"
                        data={t.cards.consult.data}
                        t={t}
                    />

                    {/* 2. HA-MAZON (ASSET HEAVY) */}
                    <ROICard
                        title={t.cards.amazon.title}
                        icon={<ShoppingCart />}
                        multiple="8-12"
                        timeline={t.cards.amazon.timeline}
                        risk="Medium"
                        data={t.cards.amazon.data}
                        t={t}
                    />

                    {/* 3. TERA MIND (MOONSHOT) */}
                    <ROICard
                        title={t.cards.tera.title}
                        icon={<Brain />}
                        multiple="20-50"
                        timeline={t.cards.tera.timeline}
                        risk="High"
                        data={t.cards.tera.data}
                        t={t}
                    />

                    {/* 4. GLOBAL (NETWORK EFFECT) */}
                    <ROICard
                        title={t.cards.global.title}
                        icon={<Globe />}
                        multiple="50+"
                        timeline={t.cards.global.timeline}
                        risk="High"
                        data={t.cards.global.data}
                        t={t}
                    />

                    {/* 5. TETRABRAME (PASSIVE IP) */}
                    <ROICard
                        title={t.cards.tetra.title}
                        icon={<Music />}
                        multiple="10-15"
                        timeline={t.cards.tetra.timeline}
                        risk="Low"
                        data={t.cards.tetra.data}
                        t={t}
                    />

                </div>

                <div className="mt-16 p-8 bg-gradient-to-r from-green-900/20 to-black border border-green-500/20 rounded-3xl text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">{t.whyWins}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-8">
                        <div>
                            <h4 className="font-bold text-green-400 mb-2 flex items-center"><ShieldCheck className="w-4 h-4 mr-2" /> {t.riskDiluted}</h4>
                            <p className="text-sm text-gray-400">{t.riskDilutedDesc}</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-green-400 mb-2 flex items-center"><TrendingUp className="w-4 h-4 mr-2" /> {t.velocity}</h4>
                            <p className="text-sm text-gray-400">{t.velocityDesc}</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-green-400 mb-2 flex items-center"><DollarSign className="w-4 h-4 mr-2" /> {t.capitalEfficiency}</h4>
                            <p className="text-sm text-gray-400">{t.capitalEfficiencyDesc}</p>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
