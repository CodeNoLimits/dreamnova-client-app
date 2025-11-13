'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { pdf } from '@react-pdf/renderer'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import RapportPDFComplet from '@/components/features/RapportPDFComplet'
import { createClient } from '@/lib/supabase/client'

interface Audit {
  id: string
  created_at: string
  company_name: string
  sector: string
  employees: string
  ca_annuel: string
  volume_b2b_mensuel: number
  volume_b2c_mensuel: number | null
  solution_actuelle: string | null
  format_actuel: string | null
  score_conformite: number
  niveau_risque: string
  amendes_annuelles: number
  amendes_mensuelles: number
  amendes_3_ans: number
  pdp_recommandé: string | null
  duree_migration_estimee: string | null
  cout_estime: string | null
  audit_data: any // JSON complet de l'audit
}

export default function AuditDetailPage() {
  const params = useParams()
  const router = useRouter()
  const auditId = params.id as string

  const [audit, setAudit] = useState<Audit | null>(null)
  const [loading, setLoading] = useState(true)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  useEffect(() => {
    const loadAudit = async () => {
      setLoading(true)
      const supabase = createClient()

      // Vérifier l'authentification
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      // Charger l'audit
      console.log('🔍 [Audit Detail] Chargement audit:', auditId, 'pour user:', user.id)
      
      const { data, error } = await supabase
        .from('audits')
        .select('*')
        .eq('id', auditId)
        .eq('user_id', user.id) // Sécurité: vérifier que l'audit appartient à l'utilisateur
        .single()

      if (error) {
        console.error('❌ [Audit Detail] Erreur chargement audit:', error)
        console.error('❌ [Audit Detail] Détails:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        })
        alert(`Erreur lors du chargement de l'audit: ${error.message}`)
        router.push('/audits')
        return
      }

      if (!data) {
        console.error('❌ [Audit Detail] Aucune donnée retournée')
        alert('Audit introuvable')
        router.push('/audits')
        return
      }

      console.log('✅ [Audit Detail] Audit chargé:', data)
      
      // Normaliser les données
      const auditNormalise = {
        ...data,
        company_name: data.company_name || 'Entreprise sans nom',
        sector: data.sector || 'Non spécifié',
        employees: data.employees?.toString() || 'Non spécifié',
        ca_annuel: data.ca_annuel?.toString() || 'Non spécifié',
        score_conformite: data.score_conformite || 0,
        niveau_risque: data.niveau_risque || 'MODÉRÉ',
        amendes_annuelles: data.amendes_annuelles || 0,
        amendes_mensuelles: data.amendes_mensuelles || 0,
        amendes_3_ans: data.amendes_3_ans || 0,
        pdp_recommandé: data.pdp_recommandé || null,
        duree_migration_estimee: data.duree_migration_estimee || null,
        cout_estime: data.cout_estime || null,
        audit_data: data.audit_data || null,
      }
      
      setAudit(auditNormalise)
      setLoading(false)
    }

    loadAudit()
  }, [auditId, router])

  const handleGeneratePDF = async () => {
    if (!audit) {
      alert('Aucun audit à télécharger')
      return
    }

    if (!audit.audit_data) {
      alert('Les données complètes de l\'audit ne sont pas disponibles. Cet audit a été créé avant la mise à jour du système.')
      return
    }

    setIsGeneratingPDF(true)

    try {
      console.log('📄 [PDF] Génération PDF pour audit:', audit.id)
      console.log('📄 [PDF] Données audit:', audit.audit_data)

      // Déconstruire les données de l'audit pour passer aux props du PDF
      const { company, audit: auditData, roi, pdp } = audit.audit_data

      // Générer le PDF avec les données complètes de l'audit
      const pdfDoc = (
        <RapportPDFComplet
          company={company}
          audit={auditData}
          roi={roi}
          pdp={pdp}
        />
      )
      const blob = await pdf(pdfDoc).toBlob()

      console.log('✅ [PDF] PDF généré, taille:', blob.size, 'bytes')

      // Télécharger le PDF
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      const fileName = `audit-${audit.company_name.replace(/\s/g, '-')}-${new Date(audit.created_at).toLocaleDateString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')}.pdf`
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      console.log('✅ [PDF] Téléchargement déclenché:', fileName)
    } catch (error: any) {
      console.error('❌ [PDF] Erreur génération PDF:', error)
      alert(`Erreur lors de la génération du PDF: ${error.message || 'Erreur inconnue'}`)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Chargement de l'audit...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!audit) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <Card className="p-12 text-center max-w-md">
            <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">
              error_outline
            </span>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Audit introuvable</h1>
            <p className="text-slate-600 mb-6">Cet audit n'existe pas ou vous n'y avez pas accès.</p>
            <Link href="/audits">
              <Button>
                <span className="material-symbols-outlined mr-2">arrow_back</span>
                Retour aux audits
              </Button>
            </Link>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  const couleurRisque = {
    'CRITIQUE': 'bg-danger-100 text-danger-700 border-danger-300',
    'ÉLEVÉ': 'bg-orange-100 text-orange-700 border-orange-300',
    'MODÉRÉ': 'bg-warning-100 text-warning-700 border-warning-300',
    'FAIBLE': 'bg-success-100 text-success-700 border-success-300',
  }

  const scoreColor = (score: number) => {
    if (score >= 80) return 'text-success-600'
    if (score >= 60) return 'text-warning-600'
    return 'text-danger-600'
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/audits">
                  <Button variant="ghost" size="sm">
                    <span className="material-symbols-outlined">arrow_back</span>
                    <span className="ml-2 hidden sm:inline">Retour</span>
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                    <div className="w-10 h-10 bg-gradient-dreamnova rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-xl">D</span>
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-slate-900">DreamNova Compta</h1>
                      <p className="text-sm text-slate-500">
                        Audit du {new Date(audit.created_at).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={handlePrint}>
                  <span className="material-symbols-outlined text-lg">print</span>
                  <span className="ml-2 hidden sm:inline">Imprimer</span>
                </Button>
                <Button
                  size="sm"
                  onClick={handleGeneratePDF}
                  isLoading={isGeneratingPDF}
                  disabled={isGeneratingPDF || !audit.audit_data}
                >
                  <span className="material-symbols-outlined text-lg">picture_as_pdf</span>
                  <span className="ml-2">
                    {isGeneratingPDF ? 'Génération...' : 'Télécharger PDF'}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8 max-w-7xl">
          {/* En-tête de l'audit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">
                    {audit.company_name}
                  </h1>
                  <div className="flex items-center gap-4 text-slate-600">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">business</span>
                      {audit.sector}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">people</span>
                      {audit.employees} employés
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">euro</span>
                      {audit.ca_annuel} CA annuel
                    </span>
                  </div>
                </div>

                {/* Score */}
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full border-8 border-slate-200 flex items-center justify-center bg-white">
                    <div>
                      <p className={`text-5xl font-bold ${scoreColor(audit.score_conformite)}`}>
                        {audit.score_conformite}
                      </p>
                      <p className="text-sm text-slate-500">% conforme</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Risque et PDP */}
              <div className="flex items-center gap-4">
                <div className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${couleurRisque[audit.niveau_risque as keyof typeof couleurRisque]}`}>
                  Risque {audit.niveau_risque}
                </div>
                {audit.pdp_recommandé && (
                  <div className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium border border-primary-300">
                    PDP Recommandé: {audit.pdp_recommandé}
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Grille des métriques principales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Amendes potentielles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-danger-100 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-danger-600">warning</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Amendes Potentielles</h3>
                    <p className="text-sm text-slate-600">Si non-conforme</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Mensuel:</span>
                    <span className="font-bold text-danger-600">
                      {audit.amendes_mensuelles?.toLocaleString('fr-FR')}€
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Annuel:</span>
                    <span className="font-bold text-danger-600">
                      {audit.amendes_annuelles?.toLocaleString('fr-FR')}€
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200">
                    <span className="text-slate-900 font-medium">Sur 3 ans:</span>
                    <span className="font-bold text-danger-700 text-lg">
                      {audit.amendes_3_ans?.toLocaleString('fr-FR')}€
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Migration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary-600">schedule</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Migration Estimée</h3>
                    <p className="text-sm text-slate-600">Durée & coût</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {audit.duree_migration_estimee && (
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Durée</p>
                      <p className="font-bold text-slate-900">{audit.duree_migration_estimee}</p>
                    </div>
                  )}
                  {audit.cout_estime && (
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Coût estimé</p>
                      <p className="font-bold text-primary-600 text-lg">
                        {audit.cout_estime}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Volumes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-success-600">receipt_long</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Volumes Mensuels</h3>
                    <p className="text-sm text-slate-600">Factures</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-600">B2B:</span>
                    <span className="font-bold text-slate-900">
                      {audit.volume_b2b_mensuel?.toLocaleString('fr-FR')} factures
                    </span>
                  </div>
                  {audit.volume_b2c_mensuel && audit.volume_b2c_mensuel > 0 && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">B2C:</span>
                      <span className="font-bold text-slate-900">
                        {audit.volume_b2c_mensuel.toLocaleString('fr-FR')} factures
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Solution actuelle */}
          {(audit.solution_actuelle || audit.format_actuel) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <Card className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Solution Actuelle</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {audit.solution_actuelle && (
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Logiciel</p>
                      <p className="font-medium text-slate-900">{audit.solution_actuelle}</p>
                    </div>
                  )}
                  {audit.format_actuel && (
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Format actuel</p>
                      <p className="font-medium text-slate-900">{audit.format_actuel.toUpperCase()}</p>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          )}

          {/* Message si pas de données détaillées */}
          {!audit.audit_data && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-8 text-center bg-blue-50 border-blue-200">
                <span className="material-symbols-outlined text-5xl text-blue-400 mb-3">
                  info
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Données complètes non disponibles
                </h3>
                <p className="text-slate-600 mb-4">
                  Cet audit a été créé avant la mise à jour du système. Seules les informations résumées sont disponibles.
                </p>
                <Link href="/audit">
                  <Button>
                    <span className="material-symbols-outlined mr-2">refresh</span>
                    Effectuer un nouvel audit
                  </Button>
                </Link>
              </Card>
            </motion.div>
          )}

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8"
          >
            <Card className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Actions Recommandées</h3>
              <div className="flex flex-wrap gap-3">
                <Link href="/audit">
                  <Button variant="primary">
                    <span className="material-symbols-outlined mr-2">refresh</span>
                    Nouvel audit
                  </Button>
                </Link>
                <Link href="/convertisseur">
                  <Button variant="secondary">
                    <span className="material-symbols-outlined mr-2">transform</span>
                    Convertir des documents
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="ghost">
                    <span className="material-symbols-outlined mr-2">shopping_cart</span>
                    Voir les tarifs PDP
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </main>
      </div>
    </DashboardLayout>
  )
}
