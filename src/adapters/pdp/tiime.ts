/**
 * Adapter Tiime API
 * Documentation: https://developers.tiime.fr/
 *
 * Tiime = Simplicité avant tout
 * - Interface ultra-simple pour TPE/PME
 * - Facturation + Compta simplifiée
 * - Scanner de factures mobile
 * - Excellent pour débutants
 * - API en cours de développement (roadmap Q2 2026)
 *
 * ⚠️ NOTE IMPORTANTE:
 * L'API Tiime est en développement.
 * Ce fichier est une ANTICIPATION basée sur les fonctionnalités annoncées.
 * Vérifier la documentation officielle une fois l'API disponible.
 */

import axios, { AxiosInstance } from 'axios'

const TIIME_API_BASE = 'https://api.tiime.fr/v1'

/**
 * Client Tiime configuré
 * ⚠️ API pas encore disponible publiquement
 */
class TiimeClient {
  private client: AxiosInstance

  constructor(apiKey: string) {
    this.client = axios.create({
      baseURL: TIIME_API_BASE,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    })
  }

  /**
   * Créer une facture client
   */
  async createInvoice(invoice: {
    customer_name: string
    customer_email?: string
    invoice_number: string
    invoice_date: string // YYYY-MM-DD
    due_date: string // YYYY-MM-DD
    items: Array<{
      description: string
      quantity: number
      unit_price: number // En centimes
      vat_rate: number
    }>
    notes?: string
  }): Promise<any> {
    const response = await this.client.post('/invoices', invoice)
    return response.data
  }

  /**
   * Scanner une facture (mobile)
   * 🔥 FONCTIONNALITÉ CLÉ Tiime
   */
  async scanInvoice(imageBase64: string): Promise<any> {
    const response = await this.client.post('/invoices/scan', {
      image: imageBase64,
    })
    return response.data
  }

  /**
   * Importer une facture électronique
   */
  async importEInvoice(file: Buffer): Promise<any> {
    const formData = new FormData()
    formData.append('file', new Blob([new Uint8Array(file)]), 'invoice.pdf')

    const response = await this.client.post('/invoices/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  }

  /**
   * Exporter une facture en Factur-X
   * (Fonctionnalité prévue selon roadmap)
   */
  async exportToFacturX(invoiceId: string): Promise<Buffer> {
    const response = await this.client.get(`/invoices/${invoiceId}/factur_x`, {
      responseType: 'arraybuffer',
    })
    return Buffer.from(response.data)
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
    page?: number
    per_page?: number
  }): Promise<any> {
    const response = await this.client.get('/invoices', {
      params: filters,
    })
    return response.data
  }

  /**
   * Créer un client
   */
  async createCustomer(customer: {
    name: string
    email?: string
    phone?: string
    address?: string
    siret?: string
  }): Promise<any> {
    const response = await this.client.post('/customers', customer)
    return response.data
  }

  /**
   * Récupérer les statistiques
   */
  async getStats(): Promise<any> {
    const response = await this.client.get('/stats')
    return response.data
  }
}

/**
 * Factory pour créer un client Tiime
 */
export function createTiimeClient(apiKey?: string): TiimeClient {
  const key = apiKey || process.env.TIIME_API_KEY

  if (!key) {
    throw new Error('TIIME_API_KEY manquante')
  }

  return new TiimeClient(key)
}

/**
 * Export du client
 */
export { TiimeClient }

/**
 * Notes pour l'intégration Tiime:
 *
 * ⚠️ STATUT API: EN DÉVELOPPEMENT (Q2 2026 selon roadmap)
 *
 * Configuration (future):
 * 1. Créer un compte Tiime
 * 2. Dashboard → Paramètres → API → Générer une clé
 * 3. Ajouter TIIME_API_KEY dans .env.local
 *
 * Prix Tiime:
 * - Starter: 19€/mois (facturation basique)
 * - Premium: 39€/mois (facturation + compta simplifiée)
 * - Expert: 59€/mois (facturation + compta complète + API)
 * - API: prévu avec plan Expert (à confirmer)
 *
 * Avantages:
 * - Interface ultra-simple (parfait débutants)
 * - Scanner mobile puissant (OCR factures)
 * - Prix abordables
 * - Conformité 2026 prévue
 * - Support français
 * - Intégration bancaire simple
 *
 * Inconvénients:
 * - API pas encore disponible publiquement
 * - Fonctionnalités moins avancées que Pennylane
 * - Pas de webhooks (pour l'instant)
 * - Certification PDP à venir
 *
 * Cas d'usage DreamNova:
 * - TPE/PME débutantes en comptabilité
 * - Besoin de simplicité avant tout
 * - Budget limité (<50€/mois)
 * - Facturation électronique basique
 *
 * Fonctionnalités clés conformité 2026:
 * - ⚠️ API en développement
 * - ⚠️ Factur-X prévu (roadmap)
 * - ✅ Interface conforme e-invoicing
 * - ⚠️ Certification PDP à venir
 *
 * Recommandation DreamNova:
 * - **ATTENDRE Q2 2026** pour API complète
 * - En attendant, utiliser Pennylane (priorité #1)
 * - Tiime excellent pour clients débutants une fois API disponible
 *
 * Différence avec autres PDP:
 * - Tiime = Simplicité-first, débutants
 * - Pennylane = Fonctionnalités-first, professionnels
 * - Qonto = Banking-first
 * - Sellsy = CRM-first
 *
 * Roadmap Tiime (annoncée):
 * - Q1 2026: API beta privée
 * - Q2 2026: API publique REST
 * - Q3 2026: Webhooks
 * - Q4 2026: Certification PDP partenaire
 *
 * Documentation:
 * - https://developers.tiime.fr/ (à venir)
 * - https://www.tiime.fr/fonctionnalites/
 *
 * Alternative en attendant:
 * - Utiliser l'interface web Tiime manuellement
 * - Scraping (non recommandé, contre TOS)
 * - Utiliser Pennylane pour API + Tiime pour interface
 */
