
import React, { useState } from 'react';
import Card from './common/Card';
import { OBJECTIONS } from '../constants';

const ObjectionHandler: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(OBJECTIONS[0].id);

  const toggleObjection = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <Card title="Gestion des Objections" icon="🗣️" className="w-full">
      <p className="mb-4">Tu as des doutes ? C'est normal. Voici les réponses aux questions les plus fréquentes.</p>
      <div className="space-y-2">
        {OBJECTIONS.map((objection) => (
          <div key={objection.id} className="border border-gray-200 rounded-lg">
            <h2>
              <button
                type="button"
                className="flex items-center justify-between w-full p-4 font-medium text-left text-gray-700 hover:bg-gray-100"
                onClick={() => toggleObjection(objection.id)}
              >
                <span>{objection.question}</span>
                <svg className={`w-6 h-6 transform transition-transform ${openId === objection.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
            </h2>
            {openId === objection.id && (
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <p className="text-gray-600">{objection.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ObjectionHandler;
