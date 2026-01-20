export interface ServiceCardProps {
  title: string;
  price: string;
  priceType?: string;
  badge?: string;
  description: string;
  stack: string;
  features: string[];
}

export type AuditStep = 'team' | 'stack' | 'budget' | 'result';

export interface AuditState {
  teamSize: string;
  stackType: string;
  wasteBudget: string;
}

export interface TeamMember {
  name: string;
  role: string;
  initials: string;
}