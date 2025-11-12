import { GoogleGenerativeAI } from '@google/generative-ai'

// Types pour les agents
export interface CompanyData {
  nom: string
  effectif: number
  secteur: string
  ca_annuel: number
  volume_b2b_mensuel: number
  volume_b2c_mensuel: number
  solution_actuelle: string
  format_actuel: 'papier' | 'pdf' | 'xml' | 'edi'
}

export interface AuditResult {
  score_conformite: number
  niveau_risque: 'CRITIQUE' | 'ÉLEVÉ' | 'MODÉRÉ' | 'FAIBLE'
  amendes_potentielles: {
    mensuel: number
    annuel: number
    sur_3_ans: number
  }
  actions_urgentes: Array<{
    action: string
    délai: string
    priorité: number
  }>
  migration: {
    durée_estimée: string
    coût_estimé: string
    pdp_recommandé: string
    roi_mois: number
  }
}

export interface ROICalculation {
  investissement_initial: number
  economies_amendes: number
  gains_productivite: number
  roi_mensuel: number
  roi_annuel: number
  roi_3_ans: number
  breakeven_mois: number
  recommendation: string
}

export interface PDPRecommendation {
  provider: 'Pennylane' | 'Tiime' | 'Qonto' | 'Sellsy'
  score_match: number
  raisons: string[]
  pricing: string
  delai_integration: string
  features_cles: string[]
  alternative: string
}

/**
 * AGENT 1: AUDIT_CONFORMITE_2026
 * Expert en facturation électronique française (loi finances 2024)
 */
export class AgentAuditConformite {
  private model: any

  constructor() {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is required for AI agents')
    }
    const genAI = new GoogleGenerativeAI(apiKey)
    this.model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
  }

  async auditEntreprise(data: CompanyData): Promise<AuditResult> {
    const systemPrompt = `Tu es un expert en facturation électronique française (loi finances 2024).
Contexte: Obligation septembre 2026/2027, amendes 15€/facture non-conforme.
Formats obligatoires: Factur-X, UBL 2.1, CII

Tu dois analyser les données d'entreprise et retourner un audit complet au format JSON.

RÈGLES DE CALCUL:
- Amendes = min(volume_mensuel * 12 * 15€, 15000€)
- Score conformité (0-100):
  * Solution moderne (Pennylane, Tiime) = -30 points risque
  * Format XML/EDI = -40 points risque
  * Volume < 50 factures = -10 points risque
  * Base = 100, soustraire les points selon profil

NIVEAUX DE RISQUE:
- Score 0-30: FAIBLE
- Score 31-60: MODÉRÉ
- Score 61-85: ÉLEVÉ
- Score 86-100: CRITIQUE

RETOURNE uniquement un JSON valide, aucun texte avant ou après.`

    try {
      const prompt = `${systemPrompt}

DONNÉES ENTREPRISE:
${JSON.stringify(data, null, 2)}

Analyse et retourne le résultat au format JSON suivant:
{
  "score_conformite": number (0-100),
  "niveau_risque": "CRITIQUE" | "ÉLEVÉ" | "MODÉRÉ" | "FAIBLE",
  "amendes_potentielles": {
    "mensuel": number,
    "annuel": number,
    "sur_3_ans": number
  },
  "actions_urgentes": [
    {
      "action": string,
      "délai": string,
      "priorité": number (1-5)
    }
  ],
  "migration": {
    "durée_estimée": string,
    "coût_estimé": string,
    "pdp_recommandé": string,
    "roi_mois": number
  }
}`

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      // Nettoyer la réponse (enlever les ```json et autres)
      const cleanedText = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim()
      const parsedResult = JSON.parse(cleanedText)

      return parsedResult as AuditResult
    } catch (error) {
      console.error('Agent Audit Conformité error:', error)

      // Fallback avec calcul manuel
      const amendes_annuel = Math.min(data.volume_b2b_mensuel * 12 * 15, 15000)
      const amendes_mensuel = amendes_annuel / 12

      let score = 100
      if (data.solution_actuelle.toLowerCase().includes('pennylane') ||
          data.solution_actuelle.toLowerCase().includes('tiime')) {
        score -= 30
      }
      if (data.format_actuel === 'xml' || data.format_actuel === 'edi') {
        score -= 40
      }
      if (data.volume_b2b_mensuel < 50) {
        score -= 10
      }

      const niveau_risque = score >= 86 ? 'CRITIQUE' :
                           score >= 61 ? 'ÉLEVÉ' :
                           score >= 31 ? 'MODÉRÉ' : 'FAIBLE'

      return {
        score_conformite: Math.max(0, Math.min(100, score)),
        niveau_risque,
        amendes_potentielles: {
          mensuel: amendes_mensuel,
          annuel: amendes_annuel,
          sur_3_ans: amendes_annuel * 3
        },
        actions_urgentes: [
          {
            action: "Migrer vers une plateforme de dématérialisation agréée",
            délai: "Immédiat (< 2 semaines)",
            priorité: 5
          },
          {
            action: "Former l'équipe aux nouveaux formats obligatoires",
            délai: "Court terme (< 1 mois)",
            priorité: 4
          },
          {
            action: "Tester l'envoi de factures conformes",
            délai: "Moyen terme (< 3 mois)",
            priorité: 3
          }
        ],
        migration: {
          durée_estimée: data.volume_b2b_mensuel < 100 ? "2-4 semaines" :
                        data.volume_b2b_mensuel < 500 ? "1-2 mois" : "2-3 mois",
          coût_estimé: data.volume_b2b_mensuel < 100 ? "8,000€" :
                      data.volume_b2b_mensuel < 500 ? "15,000€" : "25,000€",
          pdp_recommandé: "Tiime",
          roi_mois: Math.round(8000 / amendes_mensuel)
        }
      }
    }
  }
}

/**
 * AGENT 2: CALCUL_ROI_MIGRATION
 * Calcule le ROI et justifie les prix vs amendes
 */
export class AgentCalculROI {
  private model: any

  constructor() {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is required for AI agents')
    }
    const genAI = new GoogleGenerativeAI(apiKey)
    this.model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
  }

  async calculerROI(
    investissement: number,
    volume_mensuel: number,
    nb_employes: number,
    ca_annuel: number
  ): Promise<ROICalculation> {
    const systemPrompt = `Tu es un expert-comptable spécialisé en analyse ROI pour transformations digitales.

CALCULS:
- Amendes évitées: min(volume_mensuel * 12 * 15€, 15000€)
- Gains productivité: 40% du coût salarial (35000€/employé en moyenne)
- ROI = (Économies totales - Investissement) / Investissement * 100

Retourne uniquement un JSON valide.`

    try {
      const prompt = `${systemPrompt}

DONNÉES:
- Investissement initial: ${investissement}€
- Volume factures B2B/mois: ${volume_mensuel}
- Nombre d'employés: ${nb_employes}
- CA annuel: ${ca_annuel}€

Calcule le ROI complet et retourne au format JSON:
{
  "investissement_initial": number,
  "economies_amendes": number,
  "gains_productivite": number,
  "roi_mensuel": number,
  "roi_annuel": number,
  "roi_3_ans": number,
  "breakeven_mois": number,
  "recommendation": string (analyse narrative)
}`

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      const cleanedText = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim()
      const parsedResult = JSON.parse(cleanedText)

      return parsedResult as ROICalculation
    } catch (error) {
      console.error('Agent Calcul ROI error:', error)

      // Fallback avec calcul manuel
      const amendes_annuel = Math.min(volume_mensuel * 12 * 15, 15000)
      const salaires_total = nb_employes * 35000
      const gains_productivite = salaires_total * 0.4
      const economies_totales = amendes_annuel + gains_productivite

      return {
        investissement_initial: investissement,
        economies_amendes: amendes_annuel,
        gains_productivite: gains_productivite,
        roi_mensuel: Math.round((economies_totales / 12 - investissement / 12) / (investissement / 12) * 100),
        roi_annuel: Math.round((economies_totales - investissement) / investissement * 100),
        roi_3_ans: Math.round((economies_totales * 3 - investissement) / investissement * 100),
        breakeven_mois: Math.round(investissement / (economies_totales / 12)),
        recommendation: `Avec ${amendes_annuel.toLocaleString()}€ d'amendes évitées et ${gains_productivite.toLocaleString()}€ de gains de productivité, votre investissement de ${investissement.toLocaleString()}€ sera rentabilisé en ${Math.round(investissement / (economies_totales / 12))} mois. ROI sur 3 ans: ${Math.round((economies_totales * 3 - investissement) / investissement * 100)}%.`
      }
    }
  }
}

/**
 * AGENT 3: RECOMMANDATIONS_PDP
 * Recommande le meilleur partenaire selon le profil
 */
export class AgentRecommandationsPDP {
  private model: any

  constructor() {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is required for AI agents')
    }
    const genAI = new GoogleGenerativeAI(apiKey)
    this.model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
  }

  async recommanderPDP(data: CompanyData): Promise<PDPRecommendation> {
    const systemPrompt = `Tu es un expert des Plateformes de Dématérialisation Partenaires (PDP) françaises.

CRITÈRES DE SÉLECTION:
- Pennylane: 4500 cabinets, PME 50-250 salariés, excellent pour automatisation
- Tiime: Gratuit <10 factures/mois, idéal TPE <50 salariés, simple
- Qonto: 500K PME clientes, bon si déjà compte Qonto, intégration bancaire
- Sellsy: CRM intégré, bon pour commerce/services, factures + CRM

SCORING (0-100):
- Volume correspond à la cible du provider: +30
- Secteur correspond aux forces: +25
- Budget correspond au pricing: +25
- Intégrations existantes: +20

Retourne uniquement un JSON valide.`

    try {
      const prompt = `${systemPrompt}

DONNÉES ENTREPRISE:
${JSON.stringify(data, null, 2)}

Recommande le meilleur PDP au format JSON:
{
  "provider": "Pennylane" | "Tiime" | "Qonto" | "Sellsy",
  "score_match": number (0-100),
  "raisons": [string],
  "pricing": string,
  "delai_integration": string,
  "features_cles": [string],
  "alternative": string (nom du 2ème choix)
}`

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      const cleanedText = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim()
      const parsedResult = JSON.parse(cleanedText)

      return parsedResult as PDPRecommendation
    } catch (error) {
      console.error('Agent Recommandations PDP error:', error)

      // Fallback avec logique simple
      let provider: 'Pennylane' | 'Tiime' | 'Qonto' | 'Sellsy' = 'Tiime'
      let score = 70
      let raisons = []
      let pricing = "Gratuit jusqu'à 10 factures/mois"
      let delai = "1-2 semaines"

      if (data.volume_b2b_mensuel < 50) {
        provider = 'Tiime'
        score = 85
        raisons = [
          'Volume faible parfaitement adapté',
          'Gratuit pour commencer',
          'Interface simple et intuitive'
        ]
      } else if (data.effectif >= 50 && data.effectif < 250) {
        provider = 'Pennylane'
        score = 90
        raisons = [
          'Idéal pour PME de votre taille',
          'Automatisation avancée incluse',
          '4500 cabinets partenaires'
        ]
        pricing = "À partir de 49€/mois"
        delai = "2-4 semaines"
      } else if (data.effectif >= 250) {
        provider = 'Sellsy'
        score = 88
        raisons = [
          'Solution complète pour ETI',
          'CRM intégré pour suivi commercial',
          'Support dédié'
        ]
        pricing = "Sur devis (estimé 100-200€/mois)"
        delai = "4-6 semaines"
      }

      return {
        provider,
        score_match: score,
        raisons,
        pricing,
        delai_integration: delai,
        features_cles: [
          'Facturation conforme Factur-X',
          'Envoi automatique au PPF',
          'Dashboard temps réel',
          'Support client dédié'
        ],
        alternative: provider === 'Tiime' ? 'Pennylane' : 'Tiime'
      }
    }
  }
}

// Export des instances singleton pour utilisation dans l'app
export const auditAgent = new AgentAuditConformite()
export const roiAgent = new AgentCalculROI()
export const pdpAgent = new AgentRecommandationsPDP()
