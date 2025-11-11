import React, { useState, useCallback } from 'react';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import SupplierAnalyzer from './components/SupplierAnalyzer';
import RiskCalculator from './components/RiskCalculator';
import Assistant from './components/Assistant';
import Payment from './components/Payment';
import type { AppView, OnboardingData, RiskResult, AuditData } from './types';
import { generatePriorityActions } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('onboarding');
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const [riskResult, setRiskResult] = useState<RiskResult | null>(null);

  const calculateRisk = useCallback((data: OnboardingData): { auditData: AuditData, riskResult: Omit<RiskResult, 'priorityActions'> } => {
    const suppliers = { '0-10': 5, '10-50': 30, '50+': 100 }[data.suppliersRange];
    const invoices = suppliers * 5; // Estimate invoices based on suppliers
    const system = {
      'software': 'Logiciel de comptabilité',
      'platform': 'Plateforme externe',
      'manual': 'Factures manuelles',
      'other': 'Autre / Ne sait pas'
    }[data.invoicingMethod];
    const size = data.employees;

    const auditData: AuditData = { suppliers, invoices, system, size };
    
    let score = 0;
    score += Math.min(suppliers / 5, 20);
    score += Math.min(invoices / 20, 20);
    if (system.toLowerCase().includes('manual') || system.toLowerCase().includes('excel')) {
      score += 30;
    }
    score += 10; // base risk

    const riskPercentage = Math.min(Math.round(score), 100);
    const estimatedPenalty = Math.min(Math.round(invoices * 12 * 0.1 * 15), 15000);

    return {
      auditData,
      riskResult: { riskPercentage, estimatedPenalty }
    };
  }, []);

  const handleOnboardingComplete = async (data: OnboardingData) => {
    setOnboardingData(data);
    const { auditData, riskResult: calculatedResult } = calculateRisk(data);
    const actions = await generatePriorityActions(auditData);
    setRiskResult({ ...calculatedResult, priorityActions: actions });
    setView('dashboard');
  };

  const renderView = () => {
    switch (view) {
      case 'onboarding':
        return <Onboarding onComplete={handleOnboardingComplete} />;
      case 'dashboard':
        return <Dashboard result={riskResult!} onNavigate={setView} />;
      case 'analyzer':
        return <SupplierAnalyzer onBack={() => setView('dashboard')} />;
      case 'calculator':
        return <RiskCalculator onBack={() => setView('dashboard')} />;
      case 'assistant':
        return <Assistant onBack={() => setView('dashboard')} />;
      case 'payment':
        return <Payment onBack={() => setView('dashboard')} />;
      default:
        return <Onboarding onComplete={handleOnboardingComplete} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 md:flex md:items-center md:justify-center">
        <div className="relative mx-auto h-screen w-full max-w-md overflow-y-auto bg-white shadow-2xl md:h-[800px] md:rounded-3xl">
            {renderView()}
        </div>
    </div>
  );
};

export default App;