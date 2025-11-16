import { GoogleGenerativeAI } from '@google/generative-ai'
import { AIAdapter } from './index'

export class GeminiAdapter implements AIAdapter {
  private genAI: GoogleGenerativeAI
  private model: any

  constructor() {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY
    if (!apiKey) {
      console.warn('⚠️ GEMINI_API_KEY not found. AI features will be disabled.')
    }
    this.genAI = new GoogleGenerativeAI(apiKey || '')
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' })
  }

  async generateText(prompt: string, context?: Record<string, any>): Promise<string> {
    try {
      const fullPrompt = context
        ? `${prompt}\n\nContext: ${JSON.stringify(context, null, 2)}`
        : prompt

      const result = await this.model.generateContent(fullPrompt)
      const response = await result.response
      return response.text()
    } catch (error) {
      console.error('Gemini generateText error:', error)
      throw new Error('Failed to generate text with Gemini')
    }
  }

  async generatePriorityActions(auditData: any): Promise<string[]> {
    try {
      const prompt = `Tu es un expert en facturation électronique française. Analyse ces données d'audit et génère exactement 3 actions prioritaires concrètes pour se préparer à la facturation électronique obligatoire en 2026.

Données d'audit:
- Fournisseurs: ${auditData.suppliers}
- Factures mensuelles estimées: ${auditData.invoices}
- Système actuel: ${auditData.system}
- Taille entreprise: ${auditData.size} employés

Format de réponse: Liste à puces, 3 actions maximum, chacune en une phrase courte et actionnable.`

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      // Parse response to array
      const actions = text
        .split('\n')
        .filter((line: string) => line.trim().startsWith('-') || line.trim().startsWith('•') || line.trim().match(/^\d+\./))
        .map((line: string) => line.replace(/^[-•]\s*/, '').replace(/^\d+\.\s*/, '').trim())
        .filter((action: string) => action.length > 0)
        .slice(0, 3)

      return actions.length > 0 ? actions : [
        'Inventorier tous vos fournisseurs actuels',
        'Évaluer votre logiciel de comptabilité actuel',
        'Former votre équipe aux nouvelles obligations'
      ]
    } catch (error) {
      console.error('Gemini generatePriorityActions error:', error)
      // Fallback actions
      return [
        'Inventorier tous vos fournisseurs actuels',
        'Évaluer votre logiciel de comptabilité actuel',
        'Former votre équipe aux nouvelles obligations'
      ]
    }
  }

  async analyzeSupplierRisk(suppliers: any[]): Promise<any> {
    try {
      const prompt = `Analyse ces fournisseurs et identifie les risques potentiels pour la conformité à la facturation électronique 2026:

${JSON.stringify(suppliers, null, 2)}

Retourne une analyse structurée avec le niveau de risque (faible/moyen/élevé) et les recommandations.`

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      return {
        analysis: response.text(),
        riskLevel: 'moyen',
        recommendations: []
      }
    } catch (error) {
      console.error('Gemini analyzeSupplierRisk error:', error)
      throw new Error('Failed to analyze supplier risk')
    }
  }

  async chatCompletion(messages: any[]): Promise<string> {
    try {
      const chat = this.model.startChat({
        history: messages.slice(0, -1).map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        }))
      })

      const lastMessage = messages[messages.length - 1]
      const result = await chat.sendMessage(lastMessage.content)
      const response = await result.response
      return response.text()
    } catch (error) {
      console.error('Gemini chatCompletion error:', error)
      throw new Error('Failed to complete chat with Gemini')
    }
  }
}
