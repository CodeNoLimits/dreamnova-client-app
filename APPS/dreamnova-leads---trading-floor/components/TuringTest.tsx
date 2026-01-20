import React, { useState } from 'react';
import { Play, Pause, User, Bot, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const TuringTest: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [selection, setSelection] = useState<'HUMAN' | 'AI' | null>(null);

  const handleSelection = (type: 'HUMAN' | 'AI') => {
    setSelection(type);
    setRevealed(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-16 px-4">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">L'IA INDÉTECTABLE</h2>
        <p className="text-gray-400 font-mono text-sm">TEST DE TURING // SÉQUENCE #9021</p>
      </div>

      <div className="bg-trading-card border border-trading-border rounded-2xl p-8 backdrop-blur-xl relative overflow-hidden">
        {/* Background Grid Decoration */}
        <div className="absolute inset-0 grid grid-cols-12 gap-1 opacity-10 pointer-events-none">
           {Array.from({ length: 12 }).map((_, i) => (
             <div key={i} className="h-full border-r border-emerald-500/30"></div>
           ))}
        </div>

        {/* Audio Visualizer */}
        <div className="relative h-24 flex items-center justify-center space-x-1 mb-8">
            {Array.from({ length: 40 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="w-1.5 bg-emerald-500/80 rounded-full"
                    animate={{
                        height: isPlaying ? [10, Math.random() * 60 + 20, 10] : 4,
                        opacity: isPlaying ? 1 : 0.3
                    }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: i * 0.05
                    }}
                />
            ))}
            
            <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute inset-0 flex items-center justify-center z-10 group"
            >
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                    {isPlaying ? <Pause className="text-white fill-white" /> : <Play className="text-white fill-white ml-1" />}
                </div>
            </button>
        </div>

        {/* Controls */}
        {!revealed ? (
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto relative z-20">
                <button 
                    onClick={() => handleSelection('HUMAN')}
                    className="flex flex-col items-center justify-center p-6 border border-trading-border rounded-xl bg-white/5 hover:bg-white/10 hover:border-emerald-500/50 transition-all group"
                >
                    <User size={32} className="text-gray-400 mb-2 group-hover:text-emerald-400" />
                    <span className="font-mono text-sm text-gray-300">AGENT HUMAIN</span>
                </button>
                <button 
                    onClick={() => handleSelection('AI')}
                    className="flex flex-col items-center justify-center p-6 border border-trading-border rounded-xl bg-white/5 hover:bg-white/10 hover:border-emerald-500/50 transition-all group"
                >
                    <Bot size={32} className="text-gray-400 mb-2 group-hover:text-emerald-400" />
                    <span className="font-mono text-sm text-gray-300">AGENT IA KAVCOM</span>
                </button>
            </div>
        ) : (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center relative z-20"
            >
                <div className="inline-flex items-center justify-center p-3 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 mb-4">
                    <Activity size={20} className="mr-2" />
                    <span className="font-mono font-bold">RÉSULTAT DE L'ANALYSE</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                    C'était l'IA. <span className="text-emerald-400">Taux de confusion : 95%</span>
                </h3>
                <p className="text-gray-400 max-w-lg mx-auto">
                    La technologie KavCom module l'intonation, les pauses de respiration et l'hésitation naturelle pour créer une interaction indiscernable d'un humain.
                </p>
                
                <button 
                    onClick={() => { setRevealed(false); setIsPlaying(false); }}
                    className="mt-6 text-sm text-gray-500 underline hover:text-white transition-colors"
                >
                    Réinitialiser le test
                </button>
            </motion.div>
        )}
      </div>
    </div>
  );
};

export default TuringTest;