// Application types
export type AppView =
  | 'hero'
  | 'onboarding'
  | 'dashboard'
  | 'analyzer'
  | 'calculator'
  | 'assistant'
  | 'payment'

// Onboarding data
export interface OnboardingData {
  companyName: string
  email: string
  employees: string
  suppliersRange: '0-10' | '10-50' | '50+'
  invoicingMethod: 'software' | 'platform' | 'manual' | 'other'
}

// Audit data
export interface AuditData {
  suppliers: number
  invoices: number
  system: string
  size: string
}

// Risk calculation result
export interface RiskResult {
  riskPercentage: number
  estimatedPenalty: number
  priorityActions: string[]
}

// AI Provider types
export type AIProvider = 'gemini' | 'openai' | 'anthropic'

// Database Provider types
export type DatabaseProvider = 'supabase' | 'mongodb' | 'vercel-postgres' | 'none'

// Storage Provider types
export type StorageProvider = 'cloudinary' | 's3' | 'vercel-blob' | 'none'

// Platform configuration
export interface PlatformConfig {
  deployment: 'vercel' | 'netlify' | 'render'
  ai: AIProvider
  database: DatabaseProvider
  storage: StorageProvider
}

// Component props
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export interface CardProps {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
  footer?: React.ReactNode
}
