/**
 * Adapter Qonto API
 * Documentation: https://api-doc.qonto.com/
 *
 * Qonto = Banking + Facturation intégrée
 * - Compte pro + cartes bancaires
 * - Facturation électronique
 * - Paiements instantanés
 * - API REST complète
 * - Webhooks temps réel
 * - Excellent pour startups/PME
 */

import axios, { AxiosInstance } from 'axios'

const QONTO_API_BASE = 'https://thirdparty.qonto.com/v2'

/**
 * Client Qonto configuré
 */
class QontoClient {
  private client: AxiosInstance

  constructor(login: string, secretKey: string) {
    this.client = axios.create({
      baseURL: QONTO_API_BASE,
      headers: {
        Authorization: `${login}:${secretKey}`,
        'Content-Type': 'application/json',
      },
    })
  }

  /**
   * Récupérer l'organisation
   */
  async getOrganization(): Promise<any> {
    const response = await this.client.get('/organization')
    return response.data.organization
  }

  /**
   * Récupérer le compte bancaire
   */
  async getBankAccounts(): Promise<any> {
    const response = await this.client.get('/bank_accounts')
    return response.data.bank_accounts
  }

  /**
   * Lister les transactions
   */
  async listTransactions(filters?: {
    status?: string[]
    updated_at_from?: string // ISO 8601
    updated_at_to?: string
    settled_at_from?: string
    settled_at_to?: string
    per_page?: number
    current_page?: number
  }): Promise<any> {
    const response = await this.client.get('/transactions', {
      params: filters,
    })
    return response.data
  }

  /**
   * Récupérer une transaction
   */
  async getTransaction(transactionId: string): Promise<any> {
    const response = await this.client.get(`/transactions/${transactionId}`)
    return response.data.transaction
  }

  /**
   * Créer un virement
   */
  async createTransfer(transfer: {
    amount: number // En centimes
    currency: 'EUR'
    bank_account_id: string
    beneficiary: {
      name: string
      iban: string
      bic?: string
    }
    reference?: string
    scheduled_date?: string // YYYY-MM-DD
  }): Promise<any> {
    const response = await this.client.post('/transfers', transfer)
    return response.data
  }

  /**
   * Lister les membres de l'organisation
   */
  async listMembers(): Promise<any> {
    const response = await this.client.get('/memberships')
    return response.data.memberships
  }

  /**
   * Créer une facture client
   * 🔥 FONCTIONNALITÉ CLÉ pour conformité 2026
   */
  async createInvoice(invoice: {
    customer_name: string
    customer_email?: string
    customer_address?: string
    invoice_number: string
    invoice_date: string // YYYY-MM-DD
    due_date: string // YYYY-MM-DD
    currency: 'EUR'
    items: Array<{
      description: string
      quantity: number
      unit_price: number // En centimes
      vat_rate: number // 20, 10, 5.5, 2.1, 0
    }>
    payment_terms?: string
    notes?: string
  }): Promise<any> {
    // Note: Qonto API pour factures peut nécessiter un endpoint spécifique
    // Vérifier la documentation pour la dernière version
    const response = await this.client.post('/invoices', invoice)
    return response.data
  }

  /**
   * Exporter une facture en Factur-X
   * (Vérifier disponibilité dans l'API Qonto)
   */
  async exportInvoiceToFacturX(invoiceId: string): Promise<Buffer> {
    const response = await this.client.get(`/invoices/${invoiceId}/factur_x`, {
      responseType: 'arraybuffer',
    })
    return Buffer.from(response.data)
  }

  /**
   * Créer un webhook
   */
  async createWebhook(webhook: {
    url: string
    events: Array<
      | 'transaction.created'
      | 'transaction.updated'
      | 'transfer.created'
      | 'transfer.updated'
      | 'invoice.created'
      | 'invoice.paid'
    >
  }): Promise<any> {
    const response = await this.client.post('/webhooks', webhook)
    return response.data
  }

  /**
   * Lister les cartes bancaires
   */
  async listCards(): Promise<any> {
    const response = await this.client.get('/cards')
    return response.data.cards
  }

  /**
   * Récupérer les pièces jointes d'une transaction
   */
  async getAttachments(transactionId: string): Promise<any> {
    const response = await this.client.get(`/transactions/${transactionId}/attachments`)
    return response.data.attachments
  }
}

/**
 * Factory pour créer un client Qonto
 */
export function createQontoClient(login?: string, secretKey?: string): QontoClient {
  const qontoLogin = login || process.env.QONTO_LOGIN
  const qontoSecret = secretKey || process.env.QONTO_SECRET_KEY

  if (!qontoLogin || !qontoSecret) {
    throw new Error('QONTO_LOGIN et QONTO_SECRET_KEY manquants')
  }

  return new QontoClient(qontoLogin, qontoSecret)
}

/**
 * Export du client
 */
export { QontoClient }

/**
 * Notes pour l'intégration Qonto:
 *
 * Configuration:
 * 1. Créer un compte Qonto Business
 * 2. Dashboard → Intégrations → API → Créer une clé
 * 3. Ajouter QONTO_LOGIN et QONTO_SECRET_KEY dans .env.local
 *
 * Prix Qonto:
 * - Solo: 9€/mois (compte + 1 carte)
 * - Basic: 19€/mois (compte + 2 cartes)
 * - Smart: 49€/mois (compte + 5 cartes + API)
 * - Premium: 99€/mois (compte + cartes illimitées + API + support dédié)
 * - API: gratuit avec Smart/Premium
 *
 * Avantages:
 * - Banking + Facturation dans 1 seul outil
 * - Paiements instantanés
 * - Cartes virtuelles illimitées
 * - Webhooks temps réel
 * - Interface ultra-moderne
 * - Support français réactif
 * - Conformité bancaire + conformité 2026
 *
 * Cas d'usage DreamNova:
 * - Connecter compte bancaire client
 * - Réconciliation automatique transactions/factures
 * - Génération factures Factur-X
 * - Paiements fournisseurs automatisés
 * - Audit flux bancaires + factures
 *
 * Fonctionnalités clés conformité 2026:
 * - ✅ Facturation électronique
 * - ✅ Export Factur-X (à vérifier disponibilité)
 * - ✅ Archivage automatique
 * - ✅ Piste d'audit bancaire
 * - ✅ Webhooks temps réel
 * - ⚠️ Vérifier certification PDP partenaire
 *
 * Différence avec Pennylane:
 * - Qonto = Banking-first, facturation secondaire
 * - Pennylane = Compta-first, facturation principale
 * - Qonto excellent pour startups/PME avec besoins bancaires
 * - Pennylane excellent pour ETI avec volume factures élevé
 *
 * Documentation:
 * - https://api-doc.qonto.com/
 * - https://qonto.com/fr/fonctionnalites
 */
