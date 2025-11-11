import type { Supplier } from './types';

export const COMPLIANCE_DEADLINE = new Date('2026-09-01T00:00:00');

export const MOCK_SUPPLIERS: Supplier[] = [
  { id: '1', name: 'Transgourmet', volume: '1,500 factures/mois', risk: 'Élevé' },
  { id: '2', name: 'Brake', volume: '850 factures/mois', risk: 'Moyen' },
  { id: '3', name: 'Metro France', volume: '1,200 factures/mois', risk: 'Faible' },
  { id: '4', name: 'Davigel', volume: '400 factures/mois', risk: 'Moyen' },
];

// Fix: Added missing OBJECTIONS constant used by the ObjectionHandler component.
export const OBJECTIONS = [
  {
    id: '1',
    question: "Je suis une petite entreprise, suis-je vraiment concerné ?",
    answer: "Oui, absolument. Toutes les entreprises assujetties à la TVA en France sont concernées, quelle que soit leur taille. L'obligation de recevoir des factures électroniques commence le 1er septembre 2026 pour tout le monde.",
  },
  {
    id: '2',
    question: "Mon comptable s'en occupe, non ?",
    answer: "Votre expert-comptable est un partenaire clé, mais la mise en conformité est de votre responsabilité. Vous devez adapter vos processus internes de facturation. C'est le moment idéal pour discuter avec lui de la meilleure solution pour votre entreprise.",
  },
  {
    id: '3',
    question: "Ça a l'air compliqué et cher...",
    answer: "C'est un changement important, mais pas insurmontable ! Des solutions comme la nôtre sont conçues pour être simples et abordables pour les PME. Pensez-y comme un investissement qui vous fera gagner du temps et évitera des amendes coûteuses à l'avenir.",
  },
  {
    id: '4',
    question: "Je n'ai pas le temps de m'en occuper maintenant.",
    answer: "Nous comprenons que votre temps est précieux. Cependant, attendre la dernière minute risque de créer du stress et des erreurs. Commencer maintenant permet une transition en douceur et sans pression. Notre audit gratuit ne prend que 5 minutes !",
  },
];