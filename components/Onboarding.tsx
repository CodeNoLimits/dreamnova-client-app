import React, { useState } from 'react';
import type { OnboardingData } from '../types';
import { SegmentedControl } from './ui';

interface OnboardingProps {
  onComplete: (data: OnboardingData) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState<OnboardingData>({
    companyName: '',
    siren: '',
    employees: '10-50',
    suppliersRange: '10-50',
    invoicingMethod: 'manual',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: keyof OnboardingData, value: any) => {
      setFormData(prev => ({...prev, [name]: value}));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
        onComplete(formData);
        setIsLoading(false);
    }, 1500)
  };

  const isFormValid = formData.companyName.trim() !== '' && formData.siren.trim().length >= 9;

  return (
    <div className="flex h-full flex-col">
        <header className="p-6">
            <h1 className="text-2xl font-bold text-slate-800">DreamNova Conformité 2026</h1>
            <p className="text-slate-500">Étape 1 sur 3</p>
        </header>
        <main className="flex-1 overflow-y-auto px-6 pb-6">
            <h2 className="text-xl font-bold text-slate-800">Parle-nous de ton entreprise</h2>
            <p className="mt-1 text-slate-500">Cela nous aidera à personnaliser ton expérience.</p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                    <label htmlFor="companyName" className="font-semibold text-slate-700">Nom de l'entreprise</label>
                    <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} required className="mt-2 w-full rounded-lg border-slate-200 bg-slate-100 p-3 text-slate-800 focus:border-violet-500 focus:ring-violet-500" />
                </div>
                 <div>
                    <label htmlFor="siren" className="font-semibold text-slate-700">Numéro de SIREN</label>
                    <input type="text" id="siren" name="siren" value={formData.siren} onChange={handleChange} required minLength={9} maxLength={9} className="mt-2 w-full rounded-lg border-slate-200 bg-slate-100 p-3 text-slate-800 focus:border-violet-500 focus:ring-violet-500" />
                </div>
                 <div>
                    <label className="font-semibold text-slate-700">Nombre de salariés</label>
                    <div className="mt-2">
                        <SegmentedControl name="employees" value={formData.employees} onChange={(v) => handleSelectChange('employees', v)}
                        options={[
                            { value: '0-10', label: 'Moins de 10' },
                            { value: '10-50', label: '10-50' },
                            { value: '50+', label: '50+' },
                        ]} />
                    </div>
                </div>
                 <div>
                    <label className="font-semibold text-slate-700">Combien de fournisseurs gères-tu ?</label>
                     <div className="mt-2">
                        <SegmentedControl name="suppliersRange" value={formData.suppliersRange} onChange={(v) => handleSelectChange('suppliersRange', v)}
                        options={[
                            { value: '0-10', label: 'Moins de 10' },
                            { value: '10-50', label: '10-50' },
                            { value: '50+', label: '50+' },
                        ]} />
                    </div>
                </div>
                 <div>
                    <label className="font-semibold text-slate-700">Comment factures-tu tes clients aujourd'hui ?</label>
                    <div className="mt-2">
                        <SegmentedControl name="invoicingMethod" value={formData.invoicingMethod} onChange={(v) => handleSelectChange('invoicingMethod', v)}
                        options={[
                            { value: 'software', label: 'Logiciel de compta' },
                            { value: 'platform', label: 'Plateforme externe' },
                            { value: 'manual', label: 'Factures manuelles' },
                            { value: 'other', label: 'Autre / Je ne sais pas' },
                        ]} />
                    </div>
                </div>
            </form>
        </main>
        <footer className="border-t border-slate-200 p-4">
            <button onClick={handleSubmit} disabled={!isFormValid || isLoading} className="w-full rounded-xl bg-violet-600 p-4 text-lg font-bold text-white shadow-lg shadow-violet-500/30 transition-all hover:bg-violet-700 disabled:bg-slate-400 disabled:shadow-none">
                {isLoading ? 'Analyse en cours...' : 'Continuer'}
            </button>
        </footer>
    </div>
  );
};

export default Onboarding;
