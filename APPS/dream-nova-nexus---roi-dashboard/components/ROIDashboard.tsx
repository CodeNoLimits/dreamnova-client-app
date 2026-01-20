import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { motion } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, DollarSign, BookOpen, Flame, 
  ArrowUpRight, ArrowDownRight, ShieldCheck, Lock, ChevronLeft 
} from 'lucide-react';
import { EFFICIENCY_DATA, ALLOCATION_DATA, PROJECTIONS_DATA, COLORS } from '../constants';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-700 p-3 rounded shadow-xl backdrop-blur-md">
        <p className="text-slate-300 font-mono mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm font-bold">
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ROIDashboard: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 font-sans selection:bg-emerald-500/30">
      
      {/* Decorative Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
         <img 
            src="https://picsum.photos/1920/1080?grayscale&blur=2" 
            alt="Data stream background" 
            className="w-full h-full object-cover mix-blend-overlay"
         />
         <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-800 pb-6"
        >
          <div>
            <div className="flex items-center gap-2 text-emerald-500 mb-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-mono uppercase tracking-widest">Live Market Data</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
              DASHBOARD <span className="text-amber-400">INVESTISSEUR</span>
            </h1>
            <p className="text-slate-400 max-w-xl">
              Suivi de l'impact, transparence radicale et allocation des ressources en temps réel.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 text-sm font-mono text-slate-400 hover:text-white border border-slate-800 hover:border-slate-600 rounded bg-slate-900/50 transition-colors">
                <ChevronLeft size={16} />
                NEXUS
             </button>
             <div className="flex items-center gap-2 px-4 py-2 text-sm font-mono text-emerald-400 border border-emerald-900/50 bg-emerald-950/20 rounded">
                <ShieldCheck size={16} />
                AUDIT: CLEAN
             </div>
          </div>
        </motion.div>

        {/* KPIs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { 
              title: "LEVÉE TOTALE", 
              value: "$1,250,000", 
              color: "text-amber-400", 
              icon: DollarSign,
              sub: "+12% vs M-1",
              trend: "up"
            },
            { 
              title: "COÛT PAR LIVRE", 
              value: "$1.20", 
              color: "text-white", 
              icon: TrendingDown,
              sub: "Optimisé de -30%",
              trend: "good-down"
            },
            { 
              title: "LIVRES DISTRIBUÉS", 
              value: "45,000", 
              color: "text-white", 
              icon: BookOpen,
              sub: "Objectif Q4 atteint",
              trend: "up"
            },
            { 
              title: "ROI SPIRITUEL", 
              value: "∞", 
              color: "text-emerald-400", 
              icon: Flame,
              sub: "Inestimable",
              trend: "neutral"
            },
          ].map((kpi, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-900/50 backdrop-blur border border-slate-800 p-6 rounded-lg hover:border-slate-600 transition-colors group"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">{kpi.title}</span>
                <kpi.icon className={`w-5 h-5 ${kpi.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
              </div>
              <div className={`text-3xl font-mono font-bold ${kpi.color} mb-2`}>
                {kpi.value}
              </div>
              <div className="flex items-center gap-1 text-xs font-mono">
                {kpi.trend === 'up' && <ArrowUpRight className="w-3 h-3 text-emerald-500" />}
                {kpi.trend === 'good-down' && <ArrowDownRight className="w-3 h-3 text-emerald-500" />}
                <span className={kpi.trend === 'neutral' ? 'text-amber-400' : 'text-emerald-500'}>
                  {kpi.sub}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Chart: Efficiency Curve */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6 relative overflow-hidden"
          >
             {/* Subtle background glow for chart */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -z-10"></div>

            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                OPTIMISATION DU CAPITAL (YTD)
              </h3>
              <div className="flex gap-4 text-xs font-mono">
                <div className="flex items-center gap-1">
                   <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                   <span className="text-slate-400">Dons Reçus</span>
                </div>
                <div className="flex items-center gap-1">
                   <div className="w-2 h-2 rounded-full bg-red-500"></div>
                   <span className="text-slate-400">Coûts Ops</span>
                </div>
              </div>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={EFFICIENCY_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.gold} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={COLORS.gold} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorCosts" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.red} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={COLORS.red} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    stroke="#94a3b8" 
                    tick={{ fill: '#94a3b8', fontSize: 12, fontFamily: 'monospace' }} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    tick={{ fill: '#94a3b8', fontSize: 12, fontFamily: 'monospace' }} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#475569', strokeWidth: 1 }} />
                  <Area 
                    type="monotone" 
                    dataKey="donations" 
                    stroke={COLORS.gold} 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorDonations)" 
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="costs" 
                    stroke={COLORS.red} 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorCosts)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Secondary Chart: Allocation */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6 flex flex-col"
          >
            <h3 className="text-lg font-bold text-slate-100 mb-4">ALLOCATION DES FONDS</h3>
            
            <div className="flex-1 min-h-[200px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ALLOCATION_DATA}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                  >
                    {ALLOCATION_DATA.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color} 
                        stroke="rgba(0,0,0,0)"
                        opacity={activeIndex === index ? 1 : 0.6}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              
              {/* Center Text in Donut */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="text-center">
                    <span className="block text-2xl font-bold font-mono text-white">
                      {ALLOCATION_DATA[activeIndex].value}%
                    </span>
                 </div>
              </div>
            </div>

            {/* Dynamic Legend / Description */}
            <div className="mt-4 p-4 bg-slate-950/50 rounded border border-slate-800 min-h-[100px]">
               <h4 className="font-bold text-sm mb-1" style={{ color: ALLOCATION_DATA[activeIndex].color }}>
                  {ALLOCATION_DATA[activeIndex].name}
               </h4>
               <p className="text-xs text-slate-400 leading-relaxed">
                  {ALLOCATION_DATA[activeIndex].description}
               </p>
            </div>
          </motion.div>
        </div>

        {/* Projections Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg overflow-hidden"
        >
          <div className="p-6 border-b border-slate-800 flex justify-between items-center">
             <h3 className="text-lg font-bold text-slate-100">PROJECTIONS 2025-2030</h3>
             <span className="px-2 py-1 rounded bg-slate-800 text-xs text-slate-400 border border-slate-700 font-mono">ESTIMATIONS CONSERVATRICES</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-mono">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-semibold">Année</th>
                  <th className="px-6 py-4 font-semibold">Objectif Financier</th>
                  <th className="px-6 py-4 font-semibold">Livres Prévus</th>
                  <th className="px-6 py-4 font-semibold">Pays Cibles</th>
                  <th className="px-6 py-4 text-right">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {PROJECTIONS_DATA.map((row, idx) => {
                  const is2030 = row.year === '2030';
                  return (
                    <tr 
                      key={idx} 
                      className={`
                        transition-colors hover:bg-slate-800/30
                        ${is2030 ? 'bg-amber-950/10' : ''}
                      `}
                    >
                      <td className={`px-6 py-4 font-bold ${is2030 ? 'text-amber-400' : 'text-slate-300'}`}>
                        {row.year}
                      </td>
                      <td className={`px-6 py-4 ${is2030 ? 'text-amber-400 font-bold' : 'text-slate-400'}`}>
                        {row.target}
                      </td>
                      <td className="px-6 py-4 text-emerald-400">
                        {row.books}
                      </td>
                      <td className="px-6 py-4 text-slate-400">
                        {row.countries}
                      </td>
                      <td className="px-6 py-4 text-right">
                         {is2030 ? (
                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-900/30 text-amber-400 border border-amber-700/50">
                             VISION ULTIME
                           </span>
                         ) : (
                           <span className="text-slate-600">--</span>
                         )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Bottom Line / CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="border-t border-slate-800 pt-8 pb-12 text-center space-y-6"
        >
          <p className="text-xl md:text-2xl font-light text-slate-300 italic">
            "Les chiffres ne mentent pas. <span className="text-emerald-400 font-normal">L'éternité</span> est le meilleur investissement."
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-slate-400 border border-slate-700 rounded hover:bg-slate-800 hover:text-white transition-all group">
                <Lock size={16} />
                <span>ACCÉDER AU DATA ROOM (SECURE)</span>
             </button>
             
             <button className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold rounded shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:scale-105 transition-all">
                <span>INVESTIR MAINTENANT</span>
                <ArrowUpRight size={18} />
             </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default ROIDashboard;