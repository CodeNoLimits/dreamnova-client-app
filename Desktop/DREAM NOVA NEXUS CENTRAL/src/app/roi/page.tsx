'use client';

import React from 'react';
import {
    PieChart,
    TrendingUp,
    DollarSign,
    Activity,
    BarChart3,
    ArrowUpRight,
    ArrowDownRight,
    Wallet,
    Target
} from 'lucide-react';
import Link from 'next/link';

const MetricCard = ({ title, value, change, trend, icon, color }: any) => (
    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl bg-${color}-500/10 text-${color}-400`}>
                {icon}
            </div>
            <div className={`flex items-center text-sm font-bold ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {trend === 'up' ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                {change}
            </div>
        </div>
        <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
        <div className="text-3xl font-bold text-white">{value}</div>
    </div>
);

const VentureRow = ({ name, revenue, margin, growth, status }: any) => (
    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
        <td className="py-4 px-4 font-bold text-white">{name}</td>
        <td className="py-4 px-4 text-gray-300">{revenue}</td>
        <td className="py-4 px-4 text-green-400">{margin}</td>
        <td className="py-4 px-4 text-cyan-400">{growth}</td>
        <td className="py-4 px-4">
            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${status === 'Live' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                {status}
            </span>
        </td>
    </tr>
);

export default function ROIPage() {
    return (
        <div className="min-h-screen bg-[#05050A] text-gray-100 font-sans pb-40">

            {/* HEADER */}
            <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto border-b border-white/5">
                <div className="flex items-center space-x-2">
                    <PieChart className="w-6 h-6 text-green-500" />
                    <span className="text-xl font-bold">Investor <span className="text-green-500">Intelligence</span></span>
                </div>
                <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">Retour au Hub</Link>
            </nav>

            <main className="max-w-7xl mx-auto px-4 mt-12">

                <div className="text-center mb-16">
                    <h1 className="text-5xl font-black text-white mb-6">REAL-TIME ROI</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Tableau de bord financier consolidé du Venture Studio.
                        <br />Suivi de la performance des actifs et du cashflow.
                    </p>
                </div>

                {/* KPI CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <MetricCard
                        title="Total ARR (Est.)"
                        value="€2.5M"
                        change="+12%"
                        trend="up"
                        icon={<DollarSign className="w-6 h-6" />}
                        color="green"
                    />
                    <MetricCard
                        title="Active Users"
                        value="12,450"
                        change="+8.5%"
                        trend="up"
                        icon={<Users className="w-6 h-6" />}
                        color="blue"
                    />
                    <MetricCard
                        title="Burn Rate"
                        value="€45k/mo"
                        change="-2%"
                        trend="up"
                        icon={<Wallet className="w-6 h-6" />}
                        color="orange"
                    />
                    <MetricCard
                        title="Valuation (Seed)"
                        value="€15M"
                        change="Flat"
                        trend="neutral"
                        icon={<Target className="w-6 h-6" />}
                        color="purple"
                    />
                </div>

                {/* VENTURE PERFORMANCE TABLE */}
                <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden mb-12">
                    <div className="p-6 border-b border-white/10 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-white flex items-center">
                            <Activity className="w-5 h-5 mr-2 text-cyan-500" /> Venture Performance
                        </h2>
                        <button className="text-xs text-cyan-400 hover:text-cyan-300 font-bold uppercase">Download Report</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-black/20 text-gray-500 uppercase font-mono">
                                <tr>
                                    <th className="py-3 px-4">Venture</th>
                                    <th className="py-3 px-4">Revenue (MRR)</th>
                                    <th className="py-3 px-4">Margin</th>
                                    <th className="py-3 px-4">MoM Growth</th>
                                    <th className="py-3 px-4">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <VentureRow name="DreamNova Consult" revenue="€50k" margin="85%" growth="+15%" status="Live" />
                                <VentureRow name="Ha-Mazon" revenue="€12k" margin="30%" growth="+8%" status="Live" />
                                <VentureRow name="Tera Mind" revenue="€5k" margin="90%" growth="+25%" status="Beta" />
                                <VentureRow name="DreamNova Global" revenue="€0" margin="N/A" growth="N/A" status="Dev" />
                                <VentureRow name="TetraBrame" revenue="€2k" margin="95%" growth="+5%" status="Live" />
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* WHY WE WIN */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Why We Win</h2>
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="p-2 bg-green-500/10 rounded-lg mr-4 text-green-400 mt-1"><CheckCircle2 className="w-5 h-5" /></div>
                                <div>
                                    <h3 className="font-bold text-white text-lg">Unfair Advantage: Data</h3>
                                    <p className="text-gray-400 text-sm">We own the data from Consult (B2B) and Tera (B2C), creating a feedback loop that no competitor can match.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="p-2 bg-green-500/10 rounded-lg mr-4 text-green-400 mt-1"><CheckCircle2 className="w-5 h-5" /></div>
                                <div>
                                    <h3 className="font-bold text-white text-lg">Zero CAC Strategy</h3>
                                    <p className="text-gray-400 text-sm">Our "Content Factory" (TetraMedia) generates organic traffic, reducing Customer Acquisition Cost to near zero.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="p-2 bg-green-500/10 rounded-lg mr-4 text-green-400 mt-1"><CheckCircle2 className="w-5 h-5" /></div>
                                <div>
                                    <h3 className="font-bold text-white text-lg">Regulatory Moat</h3>
                                    <p className="text-gray-400 text-sm">Ha-Mazon is built specifically for ZFE (Low Emission Zones) regulations, locking out traditional logistics players.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CHART PLACEHOLDER */}
                    <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-white/10 p-8 flex flex-col justify-center items-center text-center">
                        <BarChart3 className="w-16 h-16 text-gray-700 mb-4" />
                        <h3 className="text-xl font-bold text-gray-500">Revenue Projection Chart</h3>
                        <p className="text-sm text-gray-600">Interactive visualization coming in V2</p>
                    </div>
                </div>

            </main>
        </div>
    );
}

function CheckCircle2({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}

function Users({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
    );
}
