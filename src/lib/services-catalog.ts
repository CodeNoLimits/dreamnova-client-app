// DreamNova Complete Services Catalog
// All AI-powered services for rapid scaling and maximum profit

export interface Service {
  id: string;
  name: string;
  nameHe: string;
  nameFr: string;
  description: string;
  descriptionFr: string;
  descriptionHe: string;
  tools: string[];
  pricing: {
    starter: number;
    pro: number;
    enterprise: string;
  };
  deliveryTime: string;
  scalable: boolean;
  aiAutomated: boolean;
}

export const DREAMNOVA_SERVICES: Service[] = [
  // === CONTENT & VIDEO CREATION ===
  {
    id: 'video-creation',
    name: 'AI Video Production',
    nameFr: 'Production Vidéo IA',
    nameHe: 'הפקת וידאו AI',
    description: 'Professional videos for businesses using Google Flow, Vo3, and Gemini',
    descriptionFr: 'Vidéos professionnelles pour entreprises avec Google Flow, Vo3 et Gemini',
    descriptionHe: 'סרטונים מקצועיים לעסקים עם Google Flow, Vo3 ו-Gemini',
    tools: ['Google Flow', 'Vo3', 'Google Gemini Flow', 'Runway ML'],
    pricing: { starter: 97, pro: 297, enterprise: 'Custom' },
    deliveryTime: '24-48h',
    scalable: true,
    aiAutomated: true
  },
  {
    id: 'dj-suno',
    name: 'DJ Suno - Live AI Music',
    nameFr: 'DJ Suno - Musique IA en Direct',
    nameHe: 'DJ Suno - מוזיקה חיה AI',
    description: 'Real-time AI song creation for weddings and events',
    descriptionFr: 'Création de chansons IA en temps réel pour mariages et événements',
    descriptionHe: 'יצירת שירים AI בזמן אמת לחתונות ואירועים',
    tools: ['Suno AI', 'Custom Prompts', 'Live Mixing'],
    pricing: { starter: 500, pro: 1500, enterprise: 'Custom' },
    deliveryTime: 'Live Event',
    scalable: true,
    aiAutomated: true
  },
  {
    id: 'content-forge',
    name: 'AI Content Factory',
    nameFr: 'Usine à Contenu IA',
    nameHe: 'מפעל תוכן AI',
    description: 'Unlimited content creation with AI: blogs, social posts, ads',
    descriptionFr: 'Création de contenu illimité avec IA: blogs, posts, publicités',
    descriptionHe: 'יצירת תוכן ללא הגבלה עם AI: בלוגים, פוסטים, פרסומות',
    tools: ['Claude AI', 'GPT-4', 'Gemini Pro', 'ContentForge AI'],
    pricing: { starter: 49, pro: 149, enterprise: 'Custom' },
    deliveryTime: 'Instant',
    scalable: true,
    aiAutomated: true
  },

  // === SOCIAL MEDIA AUTOMATION ===
  {
    id: 'social-automation',
    name: 'Social Media Automation',
    nameFr: 'Automation Réseaux Sociaux',
    nameHe: 'אוטומציה לרשתות חברתיות',
    description: 'Complete social media management with Metricool & SocialPulse AI',
    descriptionFr: 'Gestion complète des réseaux sociaux avec Metricool & SocialPulse AI',
    descriptionHe: 'ניהול מלא של רשתות חברתיות עם Metricool ו-SocialPulse AI',
    tools: ['Metricool', 'SocialPulse AI', 'Buffer', 'Hootsuite'],
    pricing: { starter: 29, pro: 99, enterprise: 'Custom' },
    deliveryTime: 'Setup: 2h',
    scalable: true,
    aiAutomated: true
  },

  // === WEB DEVELOPMENT ===
  {
    id: 'web-development',
    name: 'AI-Powered Web Development',
    nameFr: 'Développement Web IA',
    nameHe: 'פיתוח אתרים AI',
    description: 'Full-stack websites built with AI acceleration',
    descriptionFr: 'Sites web full-stack construits avec accélération IA',
    descriptionHe: 'אתרים מלאים שנבנו עם האצת AI',
    tools: ['Claude Code', 'Cursor AI', 'Vercel', 'Next.js', 'Supabase'],
    pricing: { starter: 497, pro: 1997, enterprise: 'Custom' },
    deliveryTime: '3-7 days',
    scalable: true,
    aiAutomated: true
  },
  {
    id: 'saas-development',
    name: 'SaaS App Development',
    nameFr: 'Développement App SaaS',
    nameHe: 'פיתוח אפליקציות SaaS',
    description: 'Complete SaaS applications with payments and auth',
    descriptionFr: 'Applications SaaS complètes avec paiements et authentification',
    descriptionHe: 'אפליקציות SaaS מלאות עם תשלומים ואימות',
    tools: ['Next.js', 'Supabase', 'LemonSqueezy', 'Stripe'],
    pricing: { starter: 997, pro: 4997, enterprise: 'Custom' },
    deliveryTime: '1-2 weeks',
    scalable: true,
    aiAutomated: true
  },

  // === AI BUSINESS TOOLS ===
  {
    id: 'ai-chatbot',
    name: 'Custom AI Chatbot',
    nameFr: 'Chatbot IA Personnalisé',
    nameHe: 'צ\'אטבוט AI מותאם אישית',
    description: 'AI chatbots trained on your business data',
    descriptionFr: 'Chatbots IA entraînés sur vos données business',
    descriptionHe: 'צ\'אטבוטים AI מאומנים על נתוני העסק שלך',
    tools: ['OpenAI', 'Claude', 'RAG', 'Vector DB'],
    pricing: { starter: 297, pro: 997, enterprise: 'Custom' },
    deliveryTime: '3-5 days',
    scalable: true,
    aiAutomated: true
  },
  {
    id: 'business-automation',
    name: 'Business Process Automation',
    nameFr: 'Automatisation Processus Business',
    nameHe: 'אוטומציה של תהליכים עסקיים',
    description: 'End-to-end automation with AI agents',
    descriptionFr: 'Automatisation de bout en bout avec agents IA',
    descriptionHe: 'אוטומציה מקצה לקצה עם סוכני AI',
    tools: ['n8n', 'Make', 'Zapier', 'Custom AI Agents'],
    pricing: { starter: 197, pro: 597, enterprise: 'Custom' },
    deliveryTime: '2-5 days',
    scalable: true,
    aiAutomated: true
  },

  // === DESIGN & MEDIA ===
  {
    id: 'ai-design',
    name: 'AI Graphic Design',
    nameFr: 'Design Graphique IA',
    nameHe: 'עיצוב גרפי AI',
    description: 'Logos, branding, marketing materials with AI',
    descriptionFr: 'Logos, branding, supports marketing avec IA',
    descriptionHe: 'לוגואים, מיתוג, חומרי שיווק עם AI',
    tools: ['Midjourney', 'DALL-E', 'Canva AI', 'Figma AI'],
    pricing: { starter: 97, pro: 297, enterprise: 'Custom' },
    deliveryTime: '24-48h',
    scalable: true,
    aiAutomated: true
  },
  {
    id: 'bg-remove',
    name: 'Image Processing',
    nameFr: 'Traitement d\'Images',
    nameHe: 'עיבוד תמונות',
    description: 'Background removal, enhancement, bulk processing',
    descriptionFr: 'Suppression de fond, amélioration, traitement en lot',
    descriptionHe: 'הסרת רקע, שיפור, עיבוד בכמויות',
    tools: ['BGRemove AI', 'Rembg', 'Upscale AI'],
    pricing: { starter: 19, pro: 49, enterprise: 'Custom' },
    deliveryTime: 'Instant',
    scalable: true,
    aiAutomated: true
  },

  // === VOICE & AUDIO ===
  {
    id: 'voice-ai',
    name: 'Voice AI Services',
    nameFr: 'Services Voix IA',
    nameHe: 'שירותי קול AI',
    description: 'Transcription, voiceover, podcasts with AI',
    descriptionFr: 'Transcription, voix-off, podcasts avec IA',
    descriptionHe: 'תמלול, קריינות, פודקאסטים עם AI',
    tools: ['ElevenLabs', 'Whisper', 'VoiceNote Pro'],
    pricing: { starter: 29, pro: 99, enterprise: 'Custom' },
    deliveryTime: 'Instant-24h',
    scalable: true,
    aiAutomated: true
  },

  // === DOCUMENT & DATA ===
  {
    id: 'document-ai',
    name: 'Document Intelligence',
    nameFr: 'Intelligence Documentaire',
    nameHe: 'אינטליגנציה מסמכים',
    description: 'PDF analysis, contract review, data extraction',
    descriptionFr: 'Analyse PDF, revue contrats, extraction données',
    descriptionHe: 'ניתוח PDF, סקירת חוזים, חילוץ נתונים',
    tools: ['PDF2Insights', 'LeaseGuard AI', 'Claude'],
    pricing: { starter: 49, pro: 149, enterprise: 'Custom' },
    deliveryTime: 'Instant',
    scalable: true,
    aiAutomated: true
  }
];

// Tools we use for outsourcing and scaling
export const AI_TOOLS = {
  // Video & Media
  video: ['Google Flow', 'Vo3', 'Google Gemini Flow', 'Runway ML', 'Pika Labs', 'HeyGen'],

  // Music & Audio
  music: ['Suno AI', 'Udio', 'ElevenLabs', 'Whisper'],

  // Social Media
  social: ['Metricool', 'SocialPulse AI', 'Buffer', 'Hootsuite', 'Later'],

  // Content Creation
  content: ['Claude AI', 'GPT-4', 'Gemini Pro', 'Perplexity'],

  // Image & Design
  design: ['Midjourney', 'DALL-E 3', 'Stable Diffusion', 'Canva AI', 'Figma AI'],

  // Development
  dev: ['Claude Code', 'Cursor AI', 'GitHub Copilot', 'Replit AI'],

  // Automation
  automation: ['n8n', 'Make', 'Zapier', 'Custom Agents']
};

// Outsourcing regions for global scaling
export const OUTSOURCING_REGIONS = [
  { region: 'Eastern Europe', skills: ['Development', 'Design'], costMultiplier: 0.3 },
  { region: 'South Asia', skills: ['Development', 'Support', 'Content'], costMultiplier: 0.2 },
  { region: 'Latin America', skills: ['Design', 'Marketing', 'Support'], costMultiplier: 0.35 },
  { region: 'Southeast Asia', skills: ['Development', 'Design', 'Video'], costMultiplier: 0.25 },
];

// Revenue projections per service (monthly recurring)
export const REVENUE_PROJECTIONS = {
  'video-creation': { clientsNeeded: 10, avgRevenue: 297, monthlyPotential: 2970 },
  'dj-suno': { clientsNeeded: 4, avgRevenue: 1000, monthlyPotential: 4000 },
  'social-automation': { clientsNeeded: 50, avgRevenue: 49, monthlyPotential: 2450 },
  'web-development': { clientsNeeded: 5, avgRevenue: 1500, monthlyPotential: 7500 },
  'saas-development': { clientsNeeded: 2, avgRevenue: 3000, monthlyPotential: 6000 },
  'ai-chatbot': { clientsNeeded: 10, avgRevenue: 500, monthlyPotential: 5000 },
};

export const calculateMonthlyPotential = (): number => {
  return Object.values(REVENUE_PROJECTIONS).reduce((sum, item) => sum + item.monthlyPotential, 0);
};

// Total monthly potential: ~€28,000+
