import React from 'react';
import { Warehouse, Thermometer, Box, Database } from 'lucide-react';

export const Infrastructure: React.FC = () => {
  return (
    <div className="space-y-6 py-8">
      <div className="flex items-center justify-between border-b border-urban-border pb-2">
        <h2 className="text-2xl font-bold text-white">L'IMMOBILIER INVISIBLE</h2>
        <span className="font-mono text-safety-orange text-xs">// INFRA_V2</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Spec Card 1 */}
        <div className="bg-urban-card border border-urban-border p-5 rounded hover:border-asphalt transition-colors">
          <Warehouse className="text-urban-text mb-4" size={24} />
          <h3 className="text-lg font-bold text-white mb-2">Configuration R-1</h3>
          <p className="text-sm text-urban-text mb-4">
            Réhabilitation de parkings souterrains. 100-200m² optimisés pour le flux rapide.
          </p>
          <div className="h-1 w-full bg-asphalt rounded-full overflow-hidden">
            <div className="h-full bg-safety-orange w-3/4"></div>
          </div>
          <div className="flex justify-between mt-1 text-xs font-mono text-urban-text">
            <span>Occupancy</span>
            <span>75%</span>
          </div>
        </div>

        {/* Spec Card 2 */}
        <div className="bg-urban-card border border-urban-border p-5 rounded hover:border-asphalt transition-colors">
          <Thermometer className="text-signal-green mb-4" size={24} />
          <h3 className="text-lg font-bold text-white mb-2">Chaine Froid Modulaire</h3>
          <p className="text-sm text-urban-text mb-4">
            Caissons isothermes autonomes. Monitoring température temps réel via IoT.
          </p>
          <div className="flex gap-2 font-mono text-xs">
            <span className="bg-urban-bg border border-signal-green text-signal-green px-2 py-1 rounded">
              -18°C
            </span>
            <span className="bg-urban-bg border border-signal-green text-signal-green px-2 py-1 rounded">
              +4°C
            </span>
          </div>
        </div>
      </div>

      {/* Visual Context */}
      <div className="relative w-full h-48 rounded-lg overflow-hidden border border-urban-border">
        <img 
          src="https://picsum.photos/800/400" 
          alt="Underground warehouse interior" 
          className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
        />
        <div className="absolute bottom-0 left-0 bg-black/70 p-2 font-mono text-xs text-white">
          FIG 3.1: STOCKAGE PRÉ-DOSÉ
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
         <div className="border border-urban-border p-3 flex items-center gap-3 bg-urban-bg">
            <Box size={20} className="text-safety-orange" />
            <div>
               <div className="text-xs text-urban-text uppercase">Stockage</div>
               <div className="font-bold text-white">Kits Pré-dosés</div>
            </div>
         </div>
         <div className="border border-urban-border p-3 flex items-center gap-3 bg-urban-bg">
            <Database size={20} className="text-safety-orange" />
            <div>
               <div className="text-xs text-urban-text uppercase">Rotation</div>
               <div className="font-bold text-white">H+2 Max</div>
            </div>
         </div>
      </div>
    </div>
  );
};