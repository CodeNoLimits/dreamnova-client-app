import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Truck, Bike, AlertTriangle } from 'lucide-react';
import { MicroHub } from '../types';

interface ZFEMapProps {
  hubs: MicroHub[];
}

export const ZFEMap: React.FC<ZFEMapProps> = ({ hubs }) => {
  return (
    <div className="relative w-full h-[400px] lg:h-full bg-urban-card border-2 border-urban-border overflow-hidden rounded-lg shadow-2xl">
      {/* Map Background Grid */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* Map Header Overlay */}
      <div className="absolute top-4 left-4 z-10 bg-urban-bg/90 border border-urban-border p-3 backdrop-blur-sm">
        <h3 className="text-safety-orange font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2">
          <AlertTriangle size={14} />
          ZFE Monitor System
        </h3>
        <div className="mt-2 space-y-1">
          <div className="flex items-center gap-2 text-xs text-urban-text">
            <span className="w-2 h-2 rounded-full bg-signal-red animate-pulse"></span>
            Crit'Air 3 (Ban)
          </div>
          <div className="flex items-center gap-2 text-xs text-urban-text">
            <span className="w-2 h-2 rounded-full bg-signal-green"></span>
            Ha-Mazon Access
          </div>
        </div>
      </div>

      {/* Interactive SVG Map */}
      <svg viewBox="0 0 800 600" className="w-full h-full object-cover">
        {/* River Seine */}
        <path 
          d="M0,300 Q200,350 400,300 T800,300" 
          fill="none" 
          stroke="#334155" 
          strokeWidth="20" 
          className="opacity-50"
        />

        {/* Layer 1: Périphérique / Exclusion Zone (Red) */}
        <motion.circle
          cx="400"
          cy="300"
          r="250"
          fill="rgba(239, 68, 68, 0.05)"
          stroke="#ef4444"
          strokeWidth="2"
          strokeDasharray="10 10"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        {/* Layer 2: Inner City / Green Access (Green) */}
        <motion.path
          d="M400,300 m-200,0 a200,200 0 1,0 400,0 a200,200 0 1,0 -400,0"
          fill="rgba(34, 197, 94, 0.05)"
          stroke="#22c55e"
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />

        {/* Layer 3: Micro Hubs */}
        {hubs.map((hub, index) => (
          <g key={hub.id}>
            <motion.circle
              cx={hub.coordinates.x}
              cy={hub.coordinates.y}
              r="6"
              fill="#f97316"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1 + (index * 0.2), type: "spring" }}
            />
            <motion.circle
              cx={hub.coordinates.x}
              cy={hub.coordinates.y}
              r="20"
              stroke="#f97316"
              strokeWidth="1"
              fill="none"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 1, 0], scale: [1, 2, 2.5] }}
              transition={{ repeat: Infinity, duration: 2, delay: index * 0.5 }}
            />
          </g>
        ))}

        {/* Animated Flux Lines (Bikes) */}
        <motion.path
          d="M400,300 L500,200 L550,250"
          stroke="#22c55e"
          strokeWidth="2"
          fill="none"
          strokeDasharray="5 5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1, strokeDashoffset: -100 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
         <motion.path
          d="M400,300 L300,400 L250,350"
          stroke="#22c55e"
          strokeWidth="2"
          fill="none"
          strokeDasharray="5 5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1, strokeDashoffset: -100 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* Legend / Status Footer */}
      <div className="absolute bottom-4 right-4 bg-urban-bg/90 p-2 border border-urban-border text-xs font-mono text-urban-text backdrop-blur-sm">
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1"><Truck size={12} className="text-signal-red"/> DIESEL: BLOCKED</span>
          <span className="flex items-center gap-1"><Bike size={12} className="text-signal-green"/> CARGO: ACTIVE</span>
        </div>
      </div>
    </div>
  );
};