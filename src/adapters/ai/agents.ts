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
      throw new Error(
        'GEMINI_API_KEY is required for AI agents.\n\n' +
        '📋 Pour configurer:\n' +
        '1. Obtenez votre clé sur: https://makersuite.google.com/app/apikey\n' +
        '2. Ajoutez-la dans le fichier .env.local:\n' +
        '   NEXT_PUBLIC_GEMINI_API_KEY=votre_cle_ici\n' +
        '   GEMINI_API_KEY=votre_cle_ici\n' +
        '3. Redémarrez le serveur (npm run dev)\n\n' +
        'Voir CONFIGURATION_GEMINI.md pour plus de détails.'
      )
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
      throw new Error(`Erreur lors de l'audit de conformité: ${error instanceof Error ? error.message : 'Erreur inconnue'}`)
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
      throw new Error(
        'GEMINI_API_KEY is required for AI agents.\n\n' +
        '📋 Pour configurer:\n' +
        '1. Obtenez votre clé sur: https://makersuite.google.com/app/apikey\n' +
        '2. Ajoutez-la dans le fichier .env.local:\n' +
        '   NEXT_PUBLIC_GEMINI_API_KEY=votre_cle_ici\n' +
        '   GEMINI_API_KEY=votre_cle_ici\n' +
        '3. Redémarrez le serveur (npm run dev)\n\n' +
        'Voir CONFIGURATION_GEMINI.md pour plus de détails.'
      )
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

      // ✅ FALLBACK: Si l'IA retourne des zéros, calculer manuellement
      if (!parsedResult.economies_amendes || parsedResult.economies_amendes === 0) {
        console.warn('⚠️ IA ROI returned 0, using manual calculation fallback')
        return this.calculateManualROI(investissement, volume_mensuel, nb_employes, ca_annuel)
      }

      return parsedResult as ROICalculation
    } catch (error) {
      console.error('Agent Calcul ROI error:', error)
      // ✅ En cas d'erreur, utiliser le calcul manuel
      console.warn('⚠️ IA ROI failed, using manual calculation fallback')
      return this.calculateManualROI(investissement, volume_mensuel, nb_employes, ca_annuel)
    }
  }

  /**
   * ✅ CALCUL MANUEL - Toujours correct, jamais zéro
   */
  private calculateManualROI(
    investissement: number,
    volume_mensuel: number,
    nb_employes: number,
    ca_annuel: number
  ): ROICalculation {
    // Calcul amendes évitées (plafond 15 000€/an)
    const amendes_annuelles = Math.min(volume_mensuel * 12 * 15, 15000)

    // Gains productivité (40% du coût salarial moyen de 35 000€)
    const cout_salarial_moyen = 35000
    const gains_productivite_annuel = Math.round((nb_employes * cout_salarial_moyen * 0.4) / 12)

    // Économies totales
    const economies_totales_annuelles = amendes_annuelles + (gains_productivite_annuel * 12)
    const economies_totales_3_ans = economies_totales_annuelles * 3

    // ROI
    const roi_annuel = Math.round(((economies_totales_annuelles - investissement) / investissement) * 100)
    const roi_mensuel = Math.round(roi_annuel / 12)
    const roi_3_ans = Math.round(((economies_totales_3_ans - investissement) / investissement) * 100)

    // Breakeven (en mois)
    const economies_mensuelles = (amendes_annuelles + (gains_productivite_annuel * 12)) / 12
    const breakeven_mois = Math.ceil(investissement / economies_mensuelles)

    return {
      investissement_initial: investissement,
      economies_amendes: amendes_annuelles,
      gains_productivite: gains_productivite_annuel * 12,
      roi_mensuel,
      roi_annuel,
      roi_3_ans,
      breakeven_mois,
      recommendation: `Avec un investissement de ${investissement.toLocaleString('fr-FR')}€, vous économisez ${amendes_annuelles.toLocaleString('fr-FR')}€/an en amendes et gagnez ${(gains_productivite_annuel * 12).toLocaleString('fr-FR')}€/an en productivité. Retour sur investissement en ${breakeven_mois} mois.`
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
      throw new Error(
        'GEMINI_API_KEY is required for AI agents.\n\n' +
        '📋 Pour configurer:\n' +
        '1. Obtenez votre clé sur: https://makersuite.google.com/app/apikey\n' +
        '2. Ajoutez-la dans le fichier .env.local:\n' +
        '   NEXT_PUBLIC_GEMINI_API_KEY=votre_cle_ici\n' +
        '   GEMINI_API_KEY=votre_cle_ici\n' +
        '3. Redémarrez le serveur (npm run dev)\n\n' +
        'Voir CONFIGURATION_GEMINI.md pour plus de détails.'
      )
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
      throw new Error(`Erreur lors de la recommandation PDP: ${error instanceof Error ? error.message : 'Erreur inconnue'}`)
    }
  }
}

// Export des instances singleton pour utilisation dans l'app
// Lazy initialization pour éviter les erreurs si la clé n'est pas encore chargée
let _auditAgent: AgentAuditConformite | null = null
let _roiAgent: AgentCalculROI | null = null
let _pdpAgent: AgentRecommandationsPDP | null = null

function getAuditAgent(): AgentAuditConformite {
  if (!_auditAgent) {
    _auditAgent = new AgentAuditConformite()
  }
  return _auditAgent
}

function getROIAgent(): AgentCalculROI {
  if (!_roiAgent) {
    _roiAgent = new AgentCalculROI()
  }
  return _roiAgent
}

function getPDPAgent(): AgentRecommandationsPDP {
  if (!_pdpAgent) {
    _pdpAgent = new AgentRecommandationsPDP()
  }
  return _pdpAgent
}

// Export des getters pour lazy initialization
export const auditAgent = {
  auditEntreprise: (data: CompanyData) => getAuditAgent().auditEntreprise(data)
}

export const roiAgent = {
  calculerROI: (investissement: number, volume: number, effectif: number, ca: number) => 
    getROIAgent().calculerROI(investissement, volume, effectif, ca)
}

export const pdpAgent = {
  recommanderPDP: (data: CompanyData) => getPDPAgent().recommanderPDP(data)
}
