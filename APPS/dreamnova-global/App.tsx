import React from 'react';
import ParticleBackground from './components/ParticleBackground';
import DreamCreditScore from './components/DreamCreditScore';
import TruthFeed from './components/TruthFeed';
import DreamClarifier from './components/DreamClarifier';
import ReverseRecruiting from './components/ReverseRecruiting';
import { Play } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen font-sans text-gray-200 selection:bg-electric selection:text-white relative">
      <ParticleBackground />

      {/* Main Container */}
      <main className="relative z-10 max-w-[1400px] mx-auto px-4 py-6 md:px-8">
        
        {/* Header / Hero Section */}
        <section className="mb-12 text-center md:text-left relative">
          <div className="absolute top-0 right-0 hidden md:block w-[300px] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric/10 border border-electric/20 text-electric text-[10px] uppercase tracking-widest font-bold mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse"></span>
                DreamNova Global OS
              </div>
              <h1 className="text-4xl md:text-6xl font-tech font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 leading-tight">
                Le CV est mort.<br />
                Vive la <span className="text-electric">Preuve.</span>
              </h1>
              <p className="text-gray-400 max-w-lg text-sm md:text-base leading-relaxed">
                LinkedIn vend votre image. DreamNova vend votre réalité.
                Bienvenue dans la première méritocratie pilotée par la Data.
              </p>
            </div>
            
            {/* Video Container */}
            <div className="relative group rounded-xl overflow-hidden border border-white/10 bg-black shadow-2xl shadow-blue-900/20">
               <div className="aspect-video w-full bg-gray-900 flex items-center justify-center relative">
                  {/* Placeholder for video file requested */}
                  <video 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                    poster="https://picsum.photos/800/450?grayscale"
                    muted
                    loop
                    playsInline
                  >
                     <source src="L_OS_de_la_Dream_Economy.mp4" type="video/mp4" />
                     Your browser does not support the video tag.
                  </video>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-white fill-current" />
                    </button>
                  </div>
               </div>
               <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800">
                  <div className="h-full bg-electric w-[35%]"></div>
               </div>
            </div>
          </div>
        </section>

        {/* 3-Column Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Profile & DCS (Sticky) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="lg:sticky lg:top-8">
              <DreamCreditScore />
              
              <div className="mt-6 p-4 rounded-xl border border-dashed border-white/10 text-center">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Status du Réseau</p>
                <div className="flex items-center justify-center gap-2 text-emerald-400 text-xs font-mono">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  Opérationnel
                </div>
              </div>
            </div>
          </div>

          {/* Center Column: Feed of Truth */}
          <div className="lg:col-span-5 relative">
            {/* Visual connector lines */}
            <div className="hidden lg:block absolute -left-6 top-0 bottom-0 w-px border-l border-dashed border-white/5"></div>
            <div className="hidden lg:block absolute -right-6 top-0 bottom-0 w-px border-l border-dashed border-white/5"></div>
            
            <TruthFeed />
          </div>

          {/* Right Column: Tools & B2B */}
          <div className="lg:col-span-4 space-y-6">
            <DreamClarifier />
            <ReverseRecruiting />
            
            {/* Additional "Ad" or Context */}
            <div className="bg-gradient-to-r from-gold/10 to-transparent p-4 rounded-lg border border-gold/20 mt-8">
              <h4 className="text-gold font-bold text-sm mb-1 font-tech">Premium Access</h4>
              <p className="text-xs text-gray-400">
                Les recruteurs paient pour voir vos data. <br/>
                Vous ne cherchez plus. Vous êtes chassé.
              </p>
            </div>
          </div>

        </div>
      </main>
      
      {/* Footer minimal */}
      <footer className="mt-20 border-t border-white/5 py-8 text-center">
         <p className="text-[10px] text-gray-600 font-mono">
            DREAMNOVA GLOBAL © 2025 // SYSTEM VERSION 4.2.0 // PARIS - TOKYO - NY
         </p>
      </footer>
    </div>
  );
};

export default App;