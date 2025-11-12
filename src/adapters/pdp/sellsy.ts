/**
 * Adapter Sellsy API REST v2
 * Documentation: https://api.sellsy.com/doc/v2/
 *
 * Sellsy = CRM + Facturation + Devis
 * - Gestion commerciale complète
 * - Facturation électronique
 * - CRM intégré
 * - Excellent pour PME/ETI avec besoins commerciaux
 */

import axios, { AxiosInstance } from 'axios'

const SELLSY_API_BASE = 'https://api.sellsy.com/v2'

/**
 * Client Sellsy configuré
 */
class SellsyClient {
  private client: AxiosInstance

  constructor(clientId: string, clientSecret: string, accessToken?: string) {
    this.client = axios.create({
      baseURL: SELLSY_API_BASE,
      headers: {
        Authorization: `Bearer ${accessToken || ''}`,
        'Content-Type': 'application/json',
      },
    })

    // Si pas d'accessToken, il faudra faire OAuth2
    if (!accessToken) {
      console.warn('⚠️ Sellsy: Access token manquant, utiliser getAccessToken() d\'abord')
    }
  }

  /**
   * Obtenir un access token OAuth2
   */
  static async getAccessToken(clientId: string, clientSecret: string): Promise<string> {
    const response = await axios.post(
      'https://login.sellsy.com/oauth2/access_tokens',
      {
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    return response.data.access_token
  }

  /**
   * Créer un client
   */
  async createCompany(company: {
    name: string
    email?: string
    phone?: string
    address?: {
      street: string
      postal_code: string
      city: string
      country: string // FR, BE, etc.
    }
    siret?: string
    vat_number?: string
  }): Promise<any> {
    const response = await this.client.post('/companies', company)
    return response.data
  }

  /**
   * Récupérer un client
   */
  async getCompany(companyId: string): Promise<any> {
    const response = await this.client.get(`/companies/${companyId}`)
    return response.data
  }

  /**
   * Lister les clients
   */
  async listCompanies(filters?: {
    search?: string
    limit?: number
    offset?: number
  }): Promise<any> {
    const response = await this.client.get('/companies', {
      params: filters,
    })
    return response.data
  }

  /**
   * Créer une facture
   * 🔥 FONCTIONNALITÉ CLÉ pour conformité 2026
   */
  async createInvoice(invoice: {
    company_id: string
    date: string // YYYY-MM-DD
    due_date: string // YYYY-MM-DD
    currency: 'EUR'
    rows: Array<{
      label: string
      quantity: number
      unit_price: number // En centimes
      vat_rate: number // 20, 10, 5.5, 2.1, 0
    }>
    payment_terms?: string
    notes?: string
  }): Promise<any> {
    const response = await this.client.post('/invoices', invoice)
    return response.data
  }

  /**
   * Récupérer une facture
   */
  async getInvoice(invoiceId: string): Promise<any> {
    const response = await this.client.get(`/invoices/${invoiceId}`)
    return response.data
  }

  /**
   * Lister les factures
   */
  async listInvoices(filters?: {
    status?: string
    start_date?: string
    end_date?: string
    limit?: number
    offset?: number
  }): Promise<any> {
    const response = await this.client.get('/invoices', {
      params: filters,
    })
    return response.data
  }

  /**
   * Créer un devis
   */
  async createEstimate(estimate: {
    company_id: string
    date: string
    validity_date: string
    currency: 'EUR'
    rows: Array<{
      label: string
      quantity: number
      unit_price: number
      vat_rate: number
    }>
  }): Promise<any> {
    const response = await this.client.post('/estimates', estimate)
    return response.data
  }

  /**
   * Convertir un devis en facture
   */
  async convertEstimateToInvoice(estimateId: string): Promise<any> {
    const response = await this.client.post(`/estimates/${estimateId}/convert_to_invoice`)
    return response.data
  }

  /**
   * Créer une opportunité CRM
   */
  async createOpportunity(opportunity: {
    company_id: string
    name: string
    amount: number
    probability: number // 0-100
    expected_close_date: string // YYYY-MM-DD
    stage: string
  }): Promise<any> {
    const response = await this.client.post('/opportunities', opportunity)
    return response.data
  }

  /**
   * Exporter une facture en PDF
   */
  async exportInvoicePDF(invoiceId: string): Promise<Buffer> {
    const response = await this.client.get(`/invoices/${invoiceId}/pdf`, {
      responseType: 'arraybuffer',
    })
    return Buffer.from(response.data)
  }

  /**
   * Exporter une facture en Factur-X
   * (Vérifier disponibilité dans l'API Sellsy)
   */
  async exportInvoiceToFacturX(invoiceId: string): Promise<Buffer> {
    // À vérifier si disponible dans API Sellsy
    const response = await this.client.get(`/invoices/${invoiceId}/factur_x`, {
      responseType: 'arraybuffer',
    })
    return Buffer.from(response.data)
  }

  /**
   * Lister les produits/services
   */
  async listItems(filters?: {
    search?: string
    type?: 'product' | 'service'
    limit?: number
  }): Promise<any> {
    const response = await this.client.get('/items', {
      params: filters,
    })
    return response.data
  }

  /**
   * Créer un produit/service
   */
  async createItem(item: {
    name: string
    type: 'product' | 'service'
    unit_price: number
    vat_rate: number
    description?: string
    reference?: string
  }): Promise<any> {
    const response = await this.client.post('/items', item)
    return response.data
  }
}

/**
 * Factory pour créer un client Sellsy
 */
export async function createSellsyClient(
  clientId?: string,
  clientSecret?: string,
  accessToken?: string
): Promise<SellsyClient> {
  const id = clientId || process.env.SELLSY_CLIENT_ID
  const secret = clientSecret || process.env.SELLSY_CLIENT_SECRET

  if (!id || !secret) {
    throw new Error('SELLSY_CLIENT_ID et SELLSY_CLIENT_SECRET manquants')
  }

  // Si pas d'accessToken fourni, en obtenir un
  let token = accessToken
  if (!token) {
    token = await SellsyClient.getAccessToken(id, secret)
  }

  return new SellsyClient(id, secret, token)
}

/**
 * Export du client
 */
export { SellsyClient }

/**
 * Notes pour l'intégration Sellsy:
 *
 * Configuration:
 * 1. Créer un compte Sellsy
 * 2. Dashboard → Paramètres → API → Créer une app OAuth2
 * 3. Ajouter SELLSY_CLIENT_ID et SELLSY_CLIENT_SECRET dans .env.local
 * 4. Implémenter OAuth2 flow pour obtenir access_token
 *
 * Prix Sellsy:
 * - Starter: 29€/mois (CRM basique + facturation)
 * - Business: 59€/mois (CRM avancé + API)
 * - Premium: 99€/mois (CRM complet + API + support dédié)
 * - API: disponible à partir du plan Business
 *
 * Avantages:
 * - CRM + Facturation + Devis dans 1 seul outil
 * - Gestion commerciale complète
 * - Pipeline de ventes
 * - Factur-X (à vérifier disponibilité)
 * - Interface intuitive
 * - Support français
 *
 * Cas d'usage DreamNova:
 * - PME/ETI avec besoins CRM + facturation
 * - Gestion devis → factures
 * - Suivi commercial + conformité 2026
 * - Export Factur-X des factures
 *
 * Fonctionnalités clés conformité 2026:
 * - ✅ Facturation électronique
 * - ⚠️ Factur-X (vérifier disponibilité API)
 * - ✅ Export PDF factures
 * - ✅ Archivage
 * - ⚠️ Vérifier certification PDP partenaire
 *
 * Différence avec autres PDP:
 * - Sellsy = CRM-first, facturation secondaire
 * - Pennylane = Compta-first, meilleur pour factures
 * - Qonto = Banking-first
 * - Tiime = Simplicité-first
 *
 * OAuth2 Flow:
 * 1. Client ID + Secret → Access Token
 * 2. Access Token expire (refresh nécessaire)
 * 3. Stocker le token en base de données
 * 4. Renouveler automatiquement avant expiration
 *
 * Documentation:
 * - https://api.sellsy.com/doc/v2/
 * - https://www.sellsy.com/fr/fonctionnalites/
 */
