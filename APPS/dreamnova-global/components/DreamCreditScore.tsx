import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { ShieldCheck, Fingerprint } from 'lucide-react';
import { DCSMetric } from '../types';

const data: DCSMetric[] = [
  { subject: 'Grit (Conscience)', A: 90, fullMark: 100 },
  { subject: 'VELA (Social)', A: 95, fullMark: 100 },
  { subject: 'Soul (Align)', A: 85, fullMark: 100 },
];

const DreamCreditScore: React.FC = () => {
  return (
    <div className="bg-glass backdrop-blur-md border border-white/5 rounded-xl p-6 relative overflow-hidden group">
      {/* Holographic Scan Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent h-[20%] w-full animate-scan pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-sm font-tech text-gray-400 uppercase tracking-widest">Dream ID</h2>
          <div className="flex items-center gap-2 mt-1">
            <Fingerprint className="w-4 h-4 text-electric" />
            <span className="text-white font-mono text-xs opacity-70">U-2938-XJ</span>
          </div>
        </div>
        <ShieldCheck className="w-5 h-5 text-gold animate-pulse-slow" />
      </div>

      <div className="h-[250px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#334155" strokeDasharray="3 3" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'Exo 2' }} />
            <Radar
              name="DreamScore"
              dataKey="A"
              stroke="#2563eb"
              strokeWidth={2}
              fill="#2563eb"
              fillOpacity={0.3}
            />
          </RadarChart>
        </ResponsiveContainer>
        
        {/* Score Overlay */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold font-tech text-white drop-shadow-[0_0_10px_rgba(37,99,235,0.5)]">94</span>
          <span className="text-[9px] uppercase tracking-wider text-blue-300">Score Global</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="bg-white/5 rounded p-2 border border-white/5">
          <div className="text-[10px] text-gray-400">Grit</div>
          <div className="text-electric font-bold">90</div>
        </div>
        <div className="bg-white/5 rounded p-2 border border-white/5">
          <div className="text-[10px] text-gray-400">Soul</div>
          <div className="text-gold font-bold">85</div>
        </div>
        <div className="bg-white/5 rounded p-2 border border-white/5">
          <div className="text-[10px] text-gray-400">Social</div>
          <div className="text-emerald-400 font-bold">95</div>
        </div>
      </div>
    </div>
  );
};

export default DreamCreditScore;