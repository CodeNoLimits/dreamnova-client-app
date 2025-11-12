/**
 * Adapter Pennylane API v2
 * Documentation: https://pennylane.readme.io/reference/introduction
 *
 * Priorité #1 pour DreamNova Compta:
 * - API complète et stable
 * - Factur-X natif (génération automatique)
 * - Multi-formats (Factur-X, UBL, CII)
 * - Webhooks en temps réel
 * - Excellent pour PME/ETI françaises
 */

import axios, { AxiosInstance } from 'axios'

const PENNYLANE_API_BASE = 'https://api.pennylane.com/api/v2'

/**
 * Client Pennylane configuré
 */
class PennylaneClient {
  private client: AxiosInstance

  constructor(apiKey: string) {
    this.client = axios.create({
      baseURL: PENNYLANE_API_BASE,
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
    customer_id: string
    date: string // YYYY-MM-DD
    deadline: string // YYYY-MM-DD
    currency: 'EUR'
    line_items: Array<{
      label: string
      quantity: number
      unit_price: number // En centimes
      vat_rate: number // 20, 10, 5.5, 2.1, 0
    }>
    payment_conditions?: string
    special_mention?: string
  }): Promise<any> {
    const response = await this.client.post('/customer_invoices', invoice)
    return response.data
  }

  /**
   * Créer une facture fournisseur
   */
  async createSupplierInvoice(invoice: {
    supplier_id: string
    invoice_number: string
    invoice_date: string // YYYY-MM-DD
    deadline: string // YYYY-MM-DD
    currency: 'EUR'
    amount: number // En centimes
    file?: string // Base64 du PDF
  }): Promise<any> {
    const response = await this.client.post('/supplier_invoices', invoice)
    return response.data
  }

  /**
   * Importer une facture électronique (Factur-X, UBL, CII)
   * 🔥 FONCTIONNALITÉ CLÉ pour conformité 2026
   */
  async importEInvoice(file: Buffer, format: 'factur-x' | 'ubl' | 'cii'): Promise<any> {
    const formData = new FormData()
    formData.append('file', new Blob([new Uint8Array(file)]), 'invoice.pdf')
    formData.append('format', format)

    const response = await this.client.post('/e-invoice-import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  }

  /**
   * Exporter une facture en Factur-X
   * 🔥 GÉNÉRATION AUTOMATIQUE Factur-X
   */
  async exportToFacturX(invoiceId: string): Promise<Buffer> {
    const response = await this.client.get(`/customer_invoices/${invoiceId}/factur_x`, {
      responseType: 'arraybuffer',
    })

    return Buffer.from(response.data)
  }

  /**
   * Récupérer une facture
   */
  async getInvoice(invoiceId: string): Promise<any> {
    const response = await this.client.get(`/customer_invoices/${invoiceId}`)
    return response.data
  }

  /**
   * Lister les factures
   */
  async listInvoices(filters?: {
    status?: 'draft' | 'finalized' | 'sent' | 'paid'
    start_date?: string // YYYY-MM-DD
    end_date?: string // YYYY-MM-DD
    page?: number
    per_page?: number
  }): Promise<any> {
    const response = await this.client.get('/customer_invoices', {
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
    address?: string
    postal_code?: string
    city?: string
    country_code?: string // FR, BE, etc.
    vat_number?: string // SIRET/TVA
    payment_conditions?: string
  }): Promise<any> {
    const response = await this.client.post('/customers', customer)
    return response.data
  }

  /**
   * Récupérer un client
   */
  async getCustomer(customerId: string): Promise<any> {
    const response = await this.client.get(`/customers/${customerId}`)
    return response.data
  }

  /**
   * Créer un fournisseur
   */
  async createSupplier(supplier: {
    name: string
    email?: string
    address?: string
    postal_code?: string
    city?: string
    country_code?: string
    vat_number?: string
  }): Promise<any> {
    const response = await this.client.post('/suppliers', supplier)
    return response.data
  }

  /**
   * Webhooks Pennylane - Configuration
   * POST /webhooks
   */
  async createWebhook(webhook: {
    url: string
    events: Array<
      | 'customer_invoice.created'
      | 'customer_invoice.updated'
      | 'customer_invoice.paid'
      | 'supplier_invoice.created'
      | 'supplier_invoice.updated'
      | 'customer.created'
      | 'customer.updated'
    >
  }): Promise<any> {
    const response = await this.client.post('/webhooks', webhook)
    return response.data
  }

  /**
   * Récupérer les informations du compte
   */
  async getAccount(): Promise<any> {
    const response = await this.client.get('/account')
    return response.data
  }
}

/**
 * Factory pour créer un client Pennylane
 */
export function createPennylaneClient(apiKey?: string): PennylaneClient {
  const key = apiKey || process.env.PENNYLANE_API_KEY
  if (!key) {
    throw new Error('PENNYLANE_API_KEY manquante')
  }
  return new PennylaneClient(key)
}

/**
 * Export du client
 */
export { PennylaneClient }

/**
 * Notes pour l'intégration Pennylane:
 *
 * Configuration:
 * 1. Créer un compte Pennylane Pro
 * 2. Dashboard → Paramètres → API → Générer une clé
 * 3. Ajouter PENNYLANE_API_KEY dans .env.local
 *
 * Prix Pennylane:
 * - Starter: 50€/mois (100 factures)
 * - Business: 150€/mois (500 factures)
 * - Premium: 300€/mois (factures illimitées)
 * - API: gratuit avec abonnement Business+
 *
 * Avantages:
 * - Factur-X natif (génération auto)
 * - API v2 stable et complète
 * - Multi-formats (Factur-X, UBL, CII)
 * - Webhooks en temps réel
 * - Interface moderne et intuitive
 * - Support français réactif
 * - Conformité 2026 garantie
 *
 * Cas d'usage DreamNova:
 * - Import factures fournisseurs (PDF → Factur-X)
 * - Export factures clients (Factur-X auto)
 * - Connexion PDP certifiée
 * - Audit conformité
 *
 * Fonctionnalités clés conformité 2026:
 * - ✅ Factur-X (génération + import)
 * - ✅ UBL 2.1
 * - ✅ CII (Cross Industry Invoice)
 * - ✅ Archivage électronique (10 ans)
 * - ✅ Signature électronique
 * - ✅ Piste d'audit fiable (PAF)
 * - ✅ Connexion PDP partenaire (101 plateformes certifiées)
 *
 * Documentation:
 * - https://pennylane.readme.io/reference/introduction
 * - https://pennylane.com/fr/fonctionnalites/facturation-electronique
 */
