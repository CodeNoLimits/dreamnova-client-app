import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Leaf, ArrowRight } from 'lucide-react';

export const GreenDiscount: React.FC = () => {
  const [activated, setActivated] = useState(false);

  return (
    <div className="py-8 sticky top-4">
      <div className="bg-[#0f111a] border border-urban-border rounded-xl overflow-hidden shadow-2xl">
        <div className="bg-asphalt/20 p-4 border-b border-urban-border flex justify-between items-center">
          <h2 className="font-bold text-white flex items-center gap-2">
            <Users size={18} className="text-safety-orange"/>
            NEIGHBORHOOD PULSE
          </h2>
          <div className="w-2 h-2 bg-signal-green rounded-full animate-pulse"></div>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-3">
            <p className="text-sm text-urban-text font-mono">ACTIVITY DETECTED (PARIS 10e):</p>
            <ul className="space-y-2">
              <li className="flex items-center justify-between text-sm bg-urban-bg p-2 rounded border border-urban-border/50">
                <span className="text-white">Le Petit Cambodge</span>
                <span className="text-xs text-asphalt font-mono">ORDER PENDING...</span>
              </li>
              <li className="flex items-center justify-between text-sm bg-urban-bg p-2 rounded border border-urban-border/50">
                <span className="text-white">Ober Mamma</span>
                <span className="text-xs text-asphalt font-mono">ORDER PENDING...</span>
              </li>
            </ul>
          </div>

          <div className="bg-signal-green/10 border border-signal-green/30 p-4 rounded-lg">
             <div className="flex items-start gap-3">
                <Leaf className="text-signal-green mt-1" size={20} />
                <div>
                   <h4 className="text-signal-green font-bold text-sm uppercase">Optimisation Logistique</h4>
                   <p className="text-xs text-urban-text mt-1">
                      En groupant votre commande avec vos voisins pour 10h00, vous économisez un trajet.
                   </p>
                </div>
             </div>
          </div>

          <AnimatePresence>
            {!activated ? (
              <motion.button
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActivated(true)}
                className="w-full py-4 bg-white text-urban-bg font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                Activer Green Discount (-15%)
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="w-full py-4 bg-signal-green text-urban-bg font-bold uppercase tracking-wider text-center rounded flex flex-col items-center justify-center"
              >
                <span>DISCOUNT APPLIED</span>
                <span className="text-xs font-mono mt-1">GROUP ID: #HM-992-X</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Footer Widget */}
        <div className="bg-urban-bg p-3 border-t border-urban-border flex justify-between items-center text-xs font-mono text-urban-text">
           <span>CO2 SAVED: 1.2kg</span>
           <span className="flex items-center gap-1 cursor-pointer hover:text-white">DETAILS <ArrowRight size={10}/></span>
        </div>
      </div>
    </div>
  );
};