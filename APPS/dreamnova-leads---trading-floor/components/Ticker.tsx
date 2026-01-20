import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, RefreshCcw } from 'lucide-react';
import { TICKER_DATA } from '../constants';
import { TickerItem } from '../types';

const Ticker: React.FC = () => {
  // Duplicate data to ensure seamless loop
  const tickerContent = [...TICKER_DATA, ...TICKER_DATA, ...TICKER_DATA];

  return (
    <div className="w-full bg-trading-bg border-b border-trading-border overflow-hidden h-10 flex items-center sticky top-0 z-50 shadow-lg shadow-emerald-900/10">
      <div className="flex items-center absolute left-0 bg-trading-bg z-10 px-3 h-full border-r border-trading-border">
         <span className="text-emerald-500 font-mono text-xs font-bold animate-pulse">LIVE FEED ●</span>
      </div>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30, // Adjust speed here
        }}
      >
        {tickerContent.map((item, index) => (
          <div key={`${item.id}-${index}`} className="flex items-center mx-6 space-x-2 font-mono text-xs text-gray-400">
            <span className="text-white font-semibold">{item.text}</span>
            <span className={item.trend === 'up' ? 'text-emerald-400' : item.trend === 'down' ? 'text-red-400' : 'text-amber-400'}>
              ({item.value})
            </span>
            {item.trend === 'up' && <ArrowUpRight size={12} className="text-emerald-400" />}
            {item.trend === 'down' && <ArrowDownRight size={12} className="text-red-400" />}
            {item.trend === 'neutral' && <RefreshCcw size={12} className="text-amber-400" />}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Ticker;