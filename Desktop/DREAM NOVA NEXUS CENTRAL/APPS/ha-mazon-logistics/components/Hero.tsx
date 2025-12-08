import React from 'react';
import { ArrowRight, Box } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full py-20 px-4 md:px-8 overflow-hidden border-b border-urban-border">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/1920/1080?grayscale&blur=2" 
          alt="Blurred urban logistics background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-urban-bg via-urban-bg/80 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-asphalt/30 border border-asphalt rounded text-safety-orange font-mono text-xs uppercase tracking-wider">
              <Box size={14} />
              Module 3: Ha-Mazon
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
              LOGISTIQUE <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-asphalt to-white">
                DÉCENTRALISÉE.
              </span>
            </h1>
            
            <p className="text-xl text-urban-text max-w-lg border-l-2 border-safety-orange pl-4">
              Livraison H+2 pour les restaurateurs parisiens. Contournez la congestion. Zéro Friction.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="px-6 py-3 bg-safety-orange hover:bg-orange-600 text-white font-bold rounded flex items-center gap-2 transition-all">
                VOIR LA CARTE DES HUBS
                <ArrowRight size={18} />
              </button>
              <button className="px-6 py-3 border border-urban-border bg-urban-card hover:bg-urban-border text-white font-mono rounded transition-all">
                SIMULATION COÛT
              </button>
            </div>
          </div>
          
          <div className="flex-1 w-full relative group">
             {/* Nano Banana Placeholder Style */}
            <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-urban-border group-hover:border-safety-orange transition-colors duration-500">
               <img 
                src="https://picsum.photos/800/600" 
                alt="Futuristic electric cargo bike" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <div className="font-mono text-xs text-safety-orange">
                  // ASSET_ID: PROTO_BIKE_V4<br/>
                  // STATUS: OPERATIONAL
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};