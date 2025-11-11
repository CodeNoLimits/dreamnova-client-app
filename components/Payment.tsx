import React from 'react';
import { Header } from './ui';

interface PaymentProps {
  onBack: () => void;
}

const Payment: React.FC<PaymentProps> = ({ onBack }) => {
  return (
    <div className="flex h-full flex-col bg-violet-600 text-white">
      <Header title="Paiement" onBack={onBack} />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="rounded-xl bg-red-500 p-4 text-center">
            <h2 className="font-bold">Réservez avant l'augmentation de prix !</h2>
            <p className="text-sm">L'offre se termine bientôt.</p>
        </div>
        
        <div className="mt-8">
            <h3 className="text-lg font-bold text-violet-200">Résumé de la commande</h3>
            <div className="mt-4 space-y-2 rounded-lg bg-violet-700/50 p-4">
                <div className="flex justify-between">
                    <p>Acompte - Accès DreamNova Conformité 2026</p>
                    <p className="font-bold">2,400.00€</p>
                </div>
                <div className="flex justify-between border-t border-violet-500 pt-2 text-lg font-bold">
                    <p>Total</p>
                    <p>2,400.00€</p>
                </div>
            </div>
        </div>

        <div className="mt-8">
            <h3 className="text-lg font-bold text-violet-200">Paiement sécurisé</h3>
            <div className="mt-4 space-y-4">
                <div>
                    <label htmlFor="cardNumber" className="text-sm text-violet-200">Numéro de carte</label>
                    <input type="text" id="cardNumber" placeholder="•••• •••• •••• ••••" className="mt-1 w-full rounded-lg border-violet-400 bg-violet-500 p-3 text-white placeholder-violet-300 focus:border-white focus:ring-white" />
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                         <label htmlFor="expiry" className="text-sm text-violet-200">MM/AA</label>
                        <input type="text" id="expiry" placeholder="MM/AA" className="mt-1 w-full rounded-lg border-violet-400 bg-violet-500 p-3 text-white placeholder-violet-300 focus:border-white focus:ring-white" />
                    </div>
                    <div>
                         <label htmlFor="cvc" className="text-sm text-violet-200">CVC</label>
                        <input type="text" id="cvc" placeholder="CVC" className="mt-1 w-full rounded-lg border-violet-400 bg-violet-500 p-3 text-white placeholder-violet-300 focus:border-white focus:ring-white" />
                    </div>
                 </div>
            </div>
        </div>
      </main>
      <footer className="p-4">
        <button onClick={onBack} className="w-full rounded-xl bg-white p-4 text-lg font-bold text-violet-600 shadow-lg transition-all hover:bg-slate-100">
            Valider le paiement de 2,400.00€
        </button>
         <p className="mt-2 text-center text-xs text-violet-300">Transactions 100% sécurisées via Stripe.</p>
      </footer>
    </div>
  );
};

export default Payment;
