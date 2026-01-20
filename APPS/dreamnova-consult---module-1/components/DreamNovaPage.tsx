import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Cpu, Globe, Lock, Code2, Layers, Zap } from 'lucide-react';
import { AuditTool } from './AuditTool';
import { ServiceCardProps } from '../types';

const ServiceCard: React.FC<ServiceCardProps> = ({ title, price, priceType, badge, description, stack, features }) => (
  <motion.div 
    whileHover={{ scale: 1.02, y: -5 }}
    className="glass-card rounded-xl p-6 md:p-8 flex flex-col h-full relative overflow-hidden group"
  >
    {badge && (
      <div className="absolute top-4 right-4 bg-gradient-to-r from-violet-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
        {badge}
      </div>
    )}
    
    <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
    <div className="mb-6">
      <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{price}</span>
      {priceType && <span className="text-sm text-gray-400 ml-2">{priceType}</span>}
    </div>

    <p className="text-gray-300 mb-6 flex-grow">{description}</p>

    <div className="bg-black/30 rounded-lg p-3 mb-6 border border-white/5">
      <span className="text-xs text-violet-400 font-mono uppercase block mb-1">Stack Technique</span>
      <span className="text-sm font-mono text-gray-300">{stack}</span>
    </div>

    <ul className="space-y-2 mb-8">
      {features.map((feat, idx) => (
        <li key={idx} className="flex items-start text-sm text-gray-400">
          <Zap className="w-4 h-4 text-cyan-500 mr-2 mt-0.5 flex-shrink-0" />
          {feat}
        </li>
      ))}
    </ul>

    <button className="w-full mt-auto py-3 rounded-lg border border-white/10 hover:bg-white/5 hover:border-violet-500/50 transition-all text-white font-semibold flex items-center justify-center gap-2 group-hover:shadow-[0_0_15px_rgba(124,58,237,0.2)]">
      Configurer
      <ArrowUpRight className="w-4 h-4" />
    </button>
  </motion.div>
);

const DreamNovaPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#05050A] text-white selection:bg-violet-500/30">
      {/* Sticky Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/5 h-16 flex items-center justify-between px-6 md:px-12 backdrop-blur-md">
        <div className="font-bold text-xl tracking-tighter">
          DREAMNOVA <span className="text-violet-500">CONSULT</span>
        </div>
        <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden md:inline">Retour au Nexus</span>
        </button>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <div className="flex-1 text-center lg:text-left z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
            >
              N'achetez plus du Temps. Achetez de la <span className="neon-text-gradient">Vélocité</span>.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xl md:text-2xl text-gray-400 mb-8 font-light max-w-2xl mx-auto lg:mx-0"
            >
              L'Agence IA qui transforme vos 6 mois de développement en 7 jours de déploiement.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 0.4 }}
              className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              onClick={() => document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Démarrer l'Audit (Gratuit)
            </motion.button>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex-1 w-full max-w-lg lg:max-w-none relative"
          >
             {/* Abstract 3D Representation */}
             <div className="relative aspect-square glass-card rounded-2xl border border-white/10 flex items-center justify-center p-8 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent opacity-50" />
                <div className="relative z-10 grid grid-cols-2 gap-4 w-full h-full animate-pulse">
                   <div className="bg-violet-500/20 rounded-lg h-32 w-full animate-bounce delay-75" />
                   <div className="bg-cyan-500/20 rounded-lg h-48 w-full translate-y-8 animate-bounce delay-150" />
                   <div className="bg-fuchsia-500/20 rounded-lg h-40 w-full -translate-y-8 animate-bounce delay-300" />
                   <div className="bg-white/10 rounded-lg h-24 w-full animate-bounce" />
                </div>
                {/* Overlay Text */}
                <div className="absolute bottom-8 left-8 bg-black/80 backdrop-blur border border-white/20 px-4 py-2 rounded text-xs font-mono text-cyan-400">
                  SYSTEM STATUS: OPTIMAL
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:flex justify-between items-end">
             <div>
               <h2 className="text-3xl md:text-4xl font-bold mb-2">Catalogue de Puissance</h2>
               <p className="text-gray-400">Sélectionnez votre vecteur d'accélération.</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard 
              title="Social Domination"
              price="2 900 € HT"
              priceType="/ mois"
              badge="Best Seller"
              description="Inondez LinkedIn, TikTok & Instagram sans aucune intervention humaine."
              stack="Orchestration Metricool + Workflow n8n + Analyse Gemini"
              features={[
                "30 Posts/mois générés & planifiés",
                "Vidéos H.264 optimisées algorithmes",
                "Scripts audio IA clonés",
                "Veille concurrentielle automatisée"
              ]}
            />
             <ServiceCard 
              title="Hyper-Development"
              price="10 000 €"
              priceType="(POC départ)"
              description="De l'idée au MVP fonctionnel en 14 jours. Ne codez plus, assemblez."
              stack="Framework Antigravity + Cursor + Google Stitch"
              features={[
                "SaaS B2B complets",
                "Outils Internes sur-mesure",
                "Dashboards analytiques temps réel",
                "Documentation technique auto-générée"
              ]}
            />
             <ServiceCard 
              title="Invisible Ops"
              price="1 500 €"
              priceType="/ mois"
              description="Automatisation complète de votre Back-Office. Faites disparaître l'administratif."
              stack="Opal + n8n + OCR Vision"
              features={[
                "Facturation & Relance auto",
                "Tri & réponse Support N1",
                "Enrichissement CRM passif",
                "Onboarding client zéro-touch"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Audit Tool Section */}
      <section id="audit" className="py-24 px-6 bg-gradient-to-b from-[#05050A] to-[#0a0a12] relative">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
         <div className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Audit de Vélocité <span className="text-violet-500">Live</span></h2>
            <p className="text-gray-400">Algorithme prédictif d'obsolescence. Où vous situez-vous ?</p>
         </div>
         <AuditTool />
      </section>

      {/* Team / Credibility */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
           <h2 className="text-3xl font-bold mb-12 text-center md:text-left">Le Noyau</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* David */}
              <div className="glass-card p-8 rounded-xl flex items-center gap-6 group hover:bg-white/5 transition-colors">
                 <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center border border-white/20">
                    <span className="text-2xl font-bold">DA</span>
                 </div>
                 <div>
                    <h3 className="text-xl font-bold text-white">David Amor</h3>
                    <p className="text-violet-400 text-sm mb-2">Architecte Système & Vision</p>
                    <p className="text-gray-500 text-sm">"L'efficacité n'est pas une option, c'est une survie."</p>
                 </div>
              </div>

              {/* Ariel */}
              <div className="glass-card p-8 rounded-xl flex items-center gap-6 group hover:bg-white/5 transition-colors">
                 <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center border border-white/20">
                    <span className="text-2xl font-bold">AR</span>
                 </div>
                 <div>
                    <h3 className="text-xl font-bold text-white">Ariel</h3>
                    <p className="text-cyan-400 text-sm mb-2">Opérations & Scaling</p>
                    <p className="text-gray-500 text-sm">"On ne gère pas la croissance, on la fabrique."</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center text-gray-600 text-sm">
         <p>© 2024 DreamNova Consult. Powered by Nano Banana Pro.</p>
      </footer>
    </div>
  );
};

export default DreamNovaPage;