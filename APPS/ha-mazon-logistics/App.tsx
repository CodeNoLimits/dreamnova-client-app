import React from 'react';
import { Hero } from './components/Hero';
import { ZFEMap } from './components/ZFEMap';
import { Infrastructure } from './components/Infrastructure';
import { Workflow } from './components/Workflow';
import { GreenDiscount } from './components/GreenDiscount';
import { MicroHub } from './types';
import { ShieldCheck } from 'lucide-react';

const mockHubs: MicroHub[] = [
  { id: '1', name: 'Hub Paradis', district: '10e', capacity: '80%', status: 'active', coordinates: { x: 450, y: 280 } },
  { id: '2', name: 'Hub Voltaire', district: '11e', capacity: '45%', status: 'active', coordinates: { x: 520, y: 320 } },
  { id: '3', name: 'Hub Pigalle', district: '9e', capacity: '90%', status: 'full', coordinates: { x: 380, y: 220 } },
];

function App() {
  return (
    <div className="min-h-screen bg-urban-bg text-gray-200 selection:bg-safety-orange selection:text-white">
      {/* Navigation simplified */}
      <nav className="fixed w-full z-50 bg-urban-bg/80 backdrop-blur-md border-b border-urban-border px-6 py-4 flex justify-between items-center">
        <div className="font-black text-xl tracking-tighter text-white">
          HA-<span className="text-safety-orange">MAZON</span>
        </div>
        <div className="hidden md:flex gap-6 font-mono text-xs text-urban-text">
          <span className="hover:text-white cursor-pointer">MODULE 1</span>
          <span className="hover:text-white cursor-pointer">MODULE 2</span>
          <span className="text-safety-orange cursor-pointer">[ MODULE 3: HA-MAZON ]</span>
        </div>
      </nav>

      <main className="pt-16">
        <Hero />
        
        {/* Split View Layout */}
        <div className="relative flex flex-col lg:flex-row-reverse max-w-[1600px] mx-auto">
          
          {/* Sticky Map Container (Right on Desktop) */}
          <div className="w-full lg:w-1/2 lg:h-[calc(100vh-4rem)] lg:sticky lg:top-16 p-4 lg:p-8 z-20">
             <div className="h-full flex flex-col gap-4">
                <ZFEMap hubs={mockHubs} />
                {/* Desktop only widget moved here for tactical view */}
                <div className="hidden lg:block">
                   <GreenDiscount />
                </div>
             </div>
          </div>

          {/* Scrolling Content (Left on Desktop) */}
          <div className="w-full lg:w-1/2 p-4 lg:p-12 space-y-24">
            
            {/* Section B: Context */}
            <section id="problem">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-white mb-4">LE MUR DU DIESEL</h2>
                <p className="text-lg text-urban-text leading-relaxed">
                  Septembre 2025. La ZFE (Zone à Faibles Émissions) se ferme hermétiquement aux Crit'Air 3. 
                  C'est la fin du modèle "Metro" centralisé. Les camions de 19 tonnes ne passeront plus le périphérique.
                </p>
                <div className="mt-6 flex items-center gap-4 p-4 bg-signal-red/10 border border-signal-red/30 rounded">
                   <ShieldCheck className="text-signal-red" size={32} />
                   <div>
                      <p className="text-sm font-bold text-white uppercase">Impact Immédiat</p>
                      <p className="text-xs text-urban-text">Interdiction de circuler de 8h à 20h pour 45% de la flotte actuelle.</p>
                   </div>
                </div>
              </div>
            </section>

            {/* Section C: Infrastructure */}
            <section id="infrastructure">
               <Infrastructure />
            </section>

            {/* Section D: Workflow */}
            <section id="workflow">
               <Workflow />
            </section>

             {/* Mobile only widget */}
             <div className="lg:hidden">
                <GreenDiscount />
             </div>

            {/* Section F: Partner */}
            <section id="partner" className="border-t border-urban-border pt-12 pb-24">
              <div className="flex items-center gap-6">
                <img 
                   src="https://picsum.photos/100/100" 
                   alt="Moshé Mayara" 
                   className="w-20 h-20 rounded-full grayscale border-2 border-safety-orange"
                />
                <div>
                   <h3 className="text-xl font-bold text-white">Moshé Mayara</h3>
                   <p className="text-safety-orange font-mono text-sm">HEAD OF OPERATIONS & FOOD NETWORK</p>
                   <p className="text-urban-text text-sm mt-2 max-w-md">
                     "L'immobilier logistique est la nouvelle bataille. Celui qui contrôle les m² en sous-sol contrôle le dernier kilomètre."
                   </p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}

export default App;