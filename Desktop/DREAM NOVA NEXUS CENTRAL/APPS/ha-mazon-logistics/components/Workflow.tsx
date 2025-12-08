import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Truck, Package, Bike } from 'lucide-react';
import { TimelineEvent } from '../types';

const events: TimelineEvent[] = [
  {
    time: "04:00",
    label: "Night Shift",
    description: "Approvisionnement Silencieux. Camions Électriques Partenaires (Urby/STEF) descendent dans les hubs.",
    shift: 'night',
    icon: 'truck'
  },
  {
    time: "08:00",
    label: "Stocking",
    description: "Mise en rayon & Préparation des Kits de survie restaurateur.",
    shift: 'day',
    icon: 'package'
  },
  {
    time: "12:00",
    label: "Service Rescue",
    description: "Coup de feu en cuisine. Livraison dépannage en <15 min via Cargo-Bike.",
    shift: 'day',
    icon: 'bike'
  }
];

export const Workflow: React.FC = () => {
  return (
    <div className="py-8">
      <div className="flex items-center justify-between border-b border-urban-border pb-2 mb-8">
        <h2 className="text-2xl font-bold text-white">LE WORKFLOW</h2>
        <span className="font-mono text-safety-orange text-xs">// RUPTURE_DE_CHARGE</span>
      </div>

      <div className="relative border-l-2 border-urban-border ml-4 space-y-12">
        {events.map((event, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="relative pl-8"
          >
            {/* Timeline Dot */}
            <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 ${event.shift === 'night' ? 'bg-asphalt border-white' : 'bg-safety-orange border-white'} z-10`}></div>
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                 <span className="font-mono text-xl font-bold text-white">{event.time}</span>
                 {event.shift === 'night' ? <Moon size={16} className="text-asphalt"/> : <Sun size={16} className="text-safety-orange"/>}
              </div>
              
              <h3 className="text-lg font-bold text-urban-text">{event.label}</h3>
              
              <div className="bg-urban-card border border-urban-border p-4 rounded-r-lg border-l-4 border-l-safety-orange">
                <p className="text-sm text-gray-300">
                  {event.description}
                </p>
                <div className="mt-3 flex justify-end">
                  {event.icon === 'truck' && <Truck size={20} className="text-urban-text"/>}
                  {event.icon === 'package' && <Package size={20} className="text-urban-text"/>}
                  {event.icon === 'bike' && <Bike size={20} className="text-urban-text"/>}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};