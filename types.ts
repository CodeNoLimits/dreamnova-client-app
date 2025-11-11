export interface OnboardingData {
  companyName: string;
  siren: string;
  employees: string;
  suppliersRange: '0-10' | '10-50' | '50+';
  invoicingMethod: 'software' | 'platform' | 'manual' | 'other';
}

export interface AuditData {
    suppliers: number;
    invoices: number;
    system: string;
    size: string;
    // Fix: Added optional 'industry' property to support its use in the ComplianceAudit component's form state.
    industry?: string;
}

export interface RiskResult {
  riskPercentage: number;
  estimatedPenalty: number;
  priorityActions: string;
}

export interface ChatMessage {
    role: 'user' | 'model' | 'thinking';
    content: string;
}

export type AppView = 'onboarding' | 'dashboard' | 'analyzer' | 'calculator' | 'assistant' | 'payment';

export interface Supplier {
  id: string;
  name: string;
  volume: string;
  risk: 'Élevé' | 'Moyen' | 'Faible';
}