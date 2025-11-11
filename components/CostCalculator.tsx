
import React from 'react';
import Card from './common/Card';

const CostCalculator: React.FC = () => {
  const costs = [
    {
      name: 'Ne rien faire',
      cost: '15 000 € / an',
      details: 'Pénalités maximales + temps perdu à gérer les problèmes',
      color: 'bg-red-500',
      highlight: false,
    },
    {
      name: 'Grands Cabinets',
      cost: '30 000 - 50 000 €',
      details: 'Solution complète mais souvent surdimensionnée et coûteuse',
      color: 'bg-amber-500',
      highlight: false,
    },
    {
      name: 'DreamNova (Nous)',
      cost: '8 000 - 15 000 €',
      details: 'Solution sur-mesure, rapide, efficace avec un ROI en < 12 mois',
      color: 'bg-green-500',
      highlight: true,
    },
  ];

  return (
    <Card title="Calculateur de Coûts" icon="💰" className="w-full">
        <p className="mb-6">Visualise la différence. L'inaction est l'option la plus chère.</p>
        <div className="space-y-4">
            {costs.map((item) => (
                <div key={item.name} className={`p-4 rounded-lg shadow-md border-l-8 ${item.highlight ? 'ring-4 ring-indigo-400 scale-105' : ''}`} style={{borderColor: item.color.replace('bg-', '').slice(0,-4)}}>
                    <div className="flex justify-between items-center">
                        <h4 className="text-lg font-bold text-gray-800">{item.name}</h4>
                        <span className={`text-xl font-bold ${item.color.replace('bg', 'text')}`}>{item.cost}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{item.details}</p>
                </div>
            ))}
        </div>
        <div className="mt-6 text-center p-4 bg-indigo-50 rounded-lg">
            <h4 className="font-bold text-indigo-800">Retour sur Investissement Garanti</h4>
            <p className="text-indigo-700">Notre solution est rentabilisée dès la première année, simplement en évitant les amendes.</p>
        </div>
    </Card>
  );
};

export default CostCalculator;
