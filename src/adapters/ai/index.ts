import { AIProvider } from '@/types'
import { GeminiAdapter } from './gemini'

// AI Adapter interface
export interface AIAdapter {
  generateText(prompt: string, context?: Record<string, any>): Promise<string>
  generatePriorityActions(auditData: any): Promise<string[]>
  analyzeSupplierRisk(suppliers: any[]): Promise<any>
  chatCompletion(messages: any[]): Promise<string>
}

// Factory function to get AI adapter
export function getAIAdapter(provider: AIProvider = 'gemini'): AIAdapter {
  switch (provider) {
    case 'gemini':
      return new GeminiAdapter()
    // Future: Add OpenAI, Anthropic adapters
    default:
      return new GeminiAdapter()
  }
}

export default getAIAdapter
