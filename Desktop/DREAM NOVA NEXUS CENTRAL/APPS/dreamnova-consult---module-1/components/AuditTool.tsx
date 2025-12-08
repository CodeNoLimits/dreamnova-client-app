import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';
import { AuditState, AuditStep } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export const AuditTool: React.FC = () => {
  const [step, setStep] = useState<AuditStep>('team');
  const [answers, setAnswers] = useState<AuditState>({
    teamSize: '',
    stackType: '',
    wasteBudget: '',
  });
  const [velocityScore, setVelocityScore] = useState<number>(0);

  // Scoring Logic
  useEffect(() => {
    if (step === 'result') {
      let score = 100;
      
      // Penalties based on answers
      if (answers.stackType === 'excel') score -= 55; // Huge penalty for Excel
      if (answers.stackType === 'saas') score -= 20; // Moderate penalty for fragmented SaaS
      
      if (answers.teamSize === 'large') score -= 15; // Complexity penalty
      
      if (answers.wasteBudget === 'high') score -= 10;

      // Normalize
      score = Math.max(10, Math.min(95, score));
      
      // Animation for score
      let current = 0;
      const interval = setInterval(() => {
        if (current >= score) {
          clearInterval(interval);
          setVelocityScore(score);
        } else {
          current += 1;
          setVelocityScore(current);
        }
      }, 20);
      
      return () => clearInterval(interval);
    }
  }, [step, answers]);

  const handleNext = (key: keyof AuditState, value: string, nextStep: AuditStep) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    setStep(nextStep);
  };

  const resetAudit = () => {
    setStep('team');
    setAnswers({ teamSize: '', stackType: '', wasteBudget: '' });
    setVelocityScore(0);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  // Gauge Data
  const data = [
    { name: 'Velocity', value: velocityScore },
    { name: 'Gap', value: 100 - velocityScore },
  ];
  const COLORS = velocityScore < 50 ? ['#ef4444', '#333'] : ['#06b6d4', '#333'];

  return (
    <div className="w-full max-w-4xl mx-auto my-12 relative z-10">
      <div className="glass-card rounded-2xl p-1 border-t border-violet-500/20 shadow-2xl shadow-violet-900/10 overflow-hidden">
        <div className="bg-[#05050A]/80 backdrop-blur-md rounded-xl p-6 md:p-12 min-h-[400px] flex flex-col justify-center">
          
          <AnimatePresence mode="wait">
            
            {/* STEP 1: TEAM */}
            {step === 'team' && (
              <motion.div 
                key="step1"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-8"
              >
                <div className="space-y-2">
                  <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase">Phase 1 / 3</span>
                  <h3 className="text-3xl font-bold text-white">Quelle est la taille de votre équipe ?</h3>
                  <p className="text-gray-400">La friction organisationnelle augmente exponentiellement avec la taille.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: "1 - 5 Personnes", val: "small" },
                    { label: "5 - 20 Personnes", val: "medium" },
                    { label: "20+ Personnes", val: "large" }
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => handleNext('teamSize', opt.val, 'stack')}
                      className="p-6 rounded-lg glass-card hover:bg-white/10 transition-all border border-white/5 hover:border-violet-500/50 text-left group"
                    >
                      <span className="block text-xl font-semibold group-hover:text-violet-400 transition-colors">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2: STACK */}
            {step === 'stack' && (
              <motion.div 
                key="step2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-8"
              >
                <div className="space-y-2">
                  <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase">Phase 2 / 3</span>
                  <h3 className="text-3xl font-bold text-white">Quelle est votre stack opérationnelle ?</h3>
                  <p className="text-gray-400">L'architecture de vos outils détermine votre plafond de verre.</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <button onClick={() => handleNext('stackType', 'excel', 'budget')} className="p-5 flex items-center justify-between rounded-lg glass-card hover:bg-white/10 hover:border-red-500/50 transition-all group">
                    <span className="text-lg">Excel / Papier / E-mails dispersés</span>
                    <AlertTriangle className="text-gray-600 group-hover:text-red-500" />
                  </button>
                  <button onClick={() => handleNext('stackType', 'saas', 'budget')} className="p-5 flex items-center justify-between rounded-lg glass-card hover:bg-white/10 hover:border-yellow-500/50 transition-all group">
                    <span className="text-lg">SaaS Standards (Non connectés)</span>
                    <div className="h-2 w-2 rounded-full bg-yellow-500 opacity-50 group-hover:opacity-100" />
                  </button>
                  <button onClick={() => handleNext('stackType', 'custom', 'budget')} className="p-5 flex items-center justify-between rounded-lg glass-card hover:bg-white/10 hover:border-cyan-500/50 transition-all group">
                    <span className="text-lg">Ecosystème Custom / Low-Code</span>
                    <CheckCircle2 className="text-gray-600 group-hover:text-cyan-500" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: BUDGET */}
            {step === 'budget' && (
              <motion.div 
                key="step3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-8"
              >
                <div className="space-y-2">
                  <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase">Phase 3 / 3</span>
                  <h3 className="text-3xl font-bold text-white">Budget "Perte de Temps" Estimé ?</h3>
                  <p className="text-gray-400">Combien d'heures sont brûlées chaque semaine dans des tâches répétitives ?</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button onClick={() => handleNext('wasteBudget', 'low', 'result')} className="p-8 rounded-lg glass-card hover:bg-white/10 hover:border-cyan-500/50 transition-all text-center">
                    <span className="text-2xl font-bold block mb-2">&lt; 10h / semaine</span>
                    <span className="text-sm text-gray-400">Perte acceptable</span>
                  </button>
                  <button onClick={() => handleNext('wasteBudget', 'high', 'result')} className="p-8 rounded-lg glass-card hover:bg-white/10 hover:border-red-500/50 transition-all text-center">
                    <span className="text-2xl font-bold block mb-2">20h+ / semaine</span>
                    <span className="text-sm text-red-400">Hémorragie financière</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* RESULT */}
            {step === 'result' && (
              <motion.div 
                key="result"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col md:flex-row items-center gap-12"
              >
                <div className="w-full md:w-1/2 flex flex-col items-center relative">
                   <div className="w-64 h-64 relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            startAngle={180}
                            endAngle={0}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                          >
                            {data.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
                        <span className={`text-4xl font-bold ${velocityScore < 50 ? 'text-red-500' : 'text-cyan-500'}`}>
                          {velocityScore}%
                        </span>
                        <span className="text-xs text-gray-500 uppercase tracking-widest">Score Vélocité</span>
                      </div>
                   </div>
                </div>

                <div className="w-full md:w-1/2 space-y-6">
                  {velocityScore < 50 ? (
                    <div className="p-4 border-l-4 border-red-500 bg-red-500/5">
                      <h4 className="text-xl font-bold text-red-500 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" /> URGENCE CRITIQUE
                      </h4>
                      <p className="text-gray-300 mb-4">
                        Vos concurrents équipés d'IA vont vous écraser d'ici 6 mois. Votre structure est trop lente pour le marché actuel.
                      </p>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-bold w-full transition-colors shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                        RÉSERVER UN SAUVETAGE
                      </button>
                    </div>
                  ) : (
                    <div className="p-4 border-l-4 border-cyan-500 bg-cyan-500/5">
                       <h4 className="text-xl font-bold text-cyan-400 mb-2">Potentiel Détecté</h4>
                       <p className="text-gray-300 mb-4">
                         Vous avez les bases, mais vous manquez de levier. Nous pouvons multiplier votre output par 10.
                       </p>
                       <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded font-bold w-full transition-colors shadow-[0_0_20px_rgba(8,145,178,0.4)]">
                        ACTIVER LE TURBO
                      </button>
                    </div>
                  )}
                  
                  <button 
                    onClick={resetAudit}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mx-auto"
                  >
                    <RefreshCw className="w-4 h-4" /> Recalculer
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};