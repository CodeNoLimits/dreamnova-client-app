'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/client'

// Type pour les audits
interface Audit {
  id: string
  created_at: string
  company_name: string
  sector: string // ✅ Corrigé: sector au lieu de secteur_activite
  ca_annuel: string
  employees: string
  score_conformite: number
  niveau_risque: string
  amendes_annuelles: number
  pdp_recommandé: string | null
  duree_migration_estimee: string | null
  cout_estime: string | null // ✅ Corrigé: string au lieu de number
  audit_data?: any // ✅ Ajouté: pour le JSON complet
}

const AuditsPage = () => {
  const router = useRouter()
  const [audits, setAudits] = useState<Audit[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRisk, setFilterRisk] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'date' | 'score' | 'amendes'>('date')
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()

    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.push('/login')
        return
      }

      setUser(session.user)
      await chargerAudits(session.user.id)
    }

    checkAuth()
  }, [router])

  const chargerAudits = async (userId: string) => {
    setLoading(true)
    setErrorMessage(null)
    setDebugInfo(null)
    const supabase = createClient()

    console.log('🔍 [Audits] ========== DÉBUT CHARGEMENT ==========')
    console.log('🔍 [Audits] User ID:', userId)
    console.log('🔍 [Audits] Supabase client créé')

    try {
      // Test 1: Vérifier la session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      console.log('🔍 [Audits] Session:', session ? 'OK' : 'AUCUNE')
      if (sessionError) {
        console.error('❌ [Audits] Erreur session:', sessionError)
      }

      // Test 2: Vérifier l'utilisateur
      const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser()
      console.log('🔍 [Audits] User:', currentUser ? currentUser.email : 'AUCUN')
      if (userError) {
        console.error('❌ [Audits] Erreur user:', userError)
      }

      // Test 3: Tester la connexion à la table
      console.log('🔍 [Audits] Tentative de requête Supabase...')
      const { data, error, count } = await supabase
        .from('audits')
        .select('*', { count: 'exact' })
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      console.log('🔍 [Audits] Résultat requête:')
      console.log('  - Error:', error)
      console.log('  - Data length:', data?.length || 0)
      console.log('  - Count:', count)
      console.log('  - Data:', data)

      // Stocker les infos de debug
      setDebugInfo({
        userId,
        userEmail: currentUser?.email,
        hasSession: !!session,
        error: error ? {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        } : null,
        dataCount: data?.length || 0,
        rawData: data
      })

      if (error) {
        console.error('❌ [Audits] Erreur chargement audits:', error)
        const errorMsg = `Erreur: ${error.message}${error.hint ? ` (${error.hint})` : ''}`
        setErrorMessage(errorMsg)
        setAudits([])
      } else {
        console.log('✅ [Audits] Audits chargés:', data?.length || 0, 'audits')
        
        if (!data || data.length === 0) {
          console.warn('⚠️ [Audits] Aucun audit trouvé pour cet utilisateur')
          setAudits([])
        } else {
          console.log('📊 [Audits] Données brutes:', data)
          
          // Normaliser les données pour s'assurer que tout est au bon format
          const auditsNormalises = data.map((audit: any) => ({
            ...audit,
            company_name: audit.company_name || 'Entreprise sans nom',
            sector: audit.sector || 'Non spécifié',
            employees: audit.employees?.toString() || 'Non spécifié',
            ca_annuel: audit.ca_annuel?.toString() || 'Non spécifié',
            score_conformite: audit.score_conformite || 0,
            niveau_risque: audit.niveau_risque || 'MODÉRÉ',
            amendes_annuelles: audit.amendes_annuelles || 0,
            pdp_recommandé: audit.pdp_recommandé || null,
            duree_migration_estimee: audit.duree_migration_estimee || null,
            cout_estime: audit.cout_estime || null,
            audit_data: audit.audit_data || null,
          }))
          
          console.log('📊 [Audits] Données normalisées:', auditsNormalises)
          setAudits(auditsNormalises)
        }
      }
    } catch (err: any) {
      console.error('❌ [Audits] Erreur inattendue:', err)
      setErrorMessage(`Erreur inattendue: ${err.message}`)
      setAudits([])
    } finally {
      setLoading(false)
      console.log('🔍 [Audits] ========== FIN CHARGEMENT ==========')
    }
  }

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  // Filtrer et trier les audits
  const auditsFiltres = audits
    .filter((audit) => {
      // Recherche textuelle
      const matchSearch =
        !searchTerm || // Si searchTerm est vide/null/undefined, tout passe
        searchTerm.trim() === '' || // Si searchTerm est juste des espaces, tout passe
        audit.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        audit.sector?.toLowerCase().includes(searchTerm.toLowerCase())

      // Filtre par niveau de risque - ULTRA PERMISSIF
      const matchRisk =
        !filterRisk || // Si pas de filtre
        filterRisk === 'all' || // Si "tous"
        filterRisk === '' || // Si vide
        !audit.niveau_risque || // Si pas de niveau_risque dans l'audit, on l'affiche quand même
        audit.niveau_risque === filterRisk // Sinon, match exact

      // Logs ultra-détaillés
      console.log('🔍 [Filter Debug]', {
        company: audit.company_name,
        id: audit.id,
        searchTerm: `"${searchTerm}"`,
        searchTermLength: searchTerm?.length || 0,
        matchSearch,
        filterRisk: `"${filterRisk}"`,
        audit_niveau_risque: `"${audit.niveau_risque}"`,
        niveau_risque_type: typeof audit.niveau_risque,
        matchRisk,
        FINAL_RESULT: matchSearch && matchRisk
      })

      return matchSearch && matchRisk
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      } else if (sortBy === 'score') {
        return b.score_conformite - a.score_conformite
      } else {
        return (b.amendes_annuelles || 0) - (a.amendes_annuelles || 0)
      }
    })

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

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Chargement de vos audits...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link href="/dashboard">
                <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                  <div className="w-10 h-10 bg-gradient-dreamnova rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">D</span>
                  </div>
                  <span className="text-2xl font-display font-bold text-slate-900">
                    DreamNova Compta
                  </span>
                </div>
              </Link>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-900">{user?.email}</span>
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">
                    <span className="material-symbols-outlined mr-2">dashboard</span>
                    Dashboard
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  Déconnexion
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8 max-w-7xl">
          {/* Debug Info (développement seulement) */}
          {debugInfo && process.env.NODE_ENV === 'development' && (
            <Card className="p-4 mb-6 bg-yellow-50 border-yellow-200">
              <details>
                <summary className="cursor-pointer font-bold text-sm text-yellow-800">
                  🔍 Debug Info (cliquez pour voir)
                </summary>
                <pre className="mt-2 text-xs overflow-auto max-h-64 bg-white p-3 rounded border">
                  {JSON.stringify(debugInfo, null, 2)}
                </pre>
              </details>
            </Card>
          )}

          {/* Message d'erreur */}
          {errorMessage && (
            <Card className="p-4 mb-6 bg-red-50 border-red-200">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-red-600">error</span>
                <p className="text-red-800 font-medium">{errorMessage}</p>
              </div>
            </Card>
          )}

          {/* En-tête avec stats */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Mes Audits de Conformité</h1>
                <p className="text-slate-600">
                  Historique complet de tous vos audits e-facture 2026
                </p>
              </div>
              <div className="flex gap-3">
                <Link href="/dashboard">
                  <Button variant="ghost" size="lg">
                    <span className="material-symbols-outlined mr-2">arrow_back</span>
                    Retour Dashboard
                  </Button>
                </Link>
                <Link href="/audit">
                  <Button size="lg">
                    <span className="material-symbols-outlined mr-2">add_circle</span>
                    Nouvel audit
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats rapides */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary-600">assessment</span>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Total audits</p>
                    <p className="text-2xl font-bold text-slate-900">{audits.length}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-success-600">trending_up</span>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Score moyen</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {audits.length > 0
                        ? Math.round(audits.reduce((acc, a) => acc + a.score_conformite, 0) / audits.length)
                        : 0}%
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-danger-100 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-danger-600">warning</span>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Audits critiques</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {audits.filter(a => a.niveau_risque === 'CRITIQUE').length}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-warning-600">euro</span>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Amendes totales</p>
                    <p className="text-xl font-bold text-slate-900">
                      {audits.reduce((acc, a) => acc + (a.amendes_annuelles || 0), 0).toLocaleString('fr-FR')}€
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Filtres et recherche */}
          <Card className="p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Recherche */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Rechercher
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    search
                  </span>
                  <input
                    type="text"
                    placeholder="Nom entreprise, secteur..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Filtre risque */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Niveau de risque
                </label>
                <select
                  value={filterRisk}
                  onChange={(e) => setFilterRisk(e.target.value)}
                  aria-label="Filtrer par niveau de risque"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">Tous les niveaux</option>
                  <option value="CRITIQUE">Critique</option>
                  <option value="ÉLEVÉ">Élevé</option>
                  <option value="MODÉRÉ">Modéré</option>
                  <option value="FAIBLE">Faible</option>
                </select>
              </div>

              {/* Tri */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Trier par
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  aria-label="Trier les audits"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="date">Date (plus récent)</option>
                  <option value="score">Score conformité</option>
                  <option value="amendes">Amendes potentielles</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-slate-600">
                {auditsFiltres.length} audit{auditsFiltres.length > 1 ? 's' : ''} trouvé{auditsFiltres.length > 1 ? 's' : ''}
              </p>
              {(searchTerm || filterRisk !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setFilterRisk('all')
                  }}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Réinitialiser les filtres
                </button>
              )}
            </div>
          </Card>

          {/* Liste des audits */}
          {auditsFiltres.length > 0 ? (
            <div className="space-y-4">
              {auditsFiltres.map((audit, index) => (
                <motion.div
                  key={audit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6 flex-1">
                        {/* Score */}
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 rounded-full border-4 border-slate-200 flex items-center justify-center">
                            <div className="text-center">
                              <p className={`text-2xl font-bold ${scoreColor(audit.score_conformite)}`}>
                                {audit.score_conformite}
                              </p>
                              <p className="text-xs text-slate-500">%</p>
                            </div>
                          </div>
                        </div>

                        {/* Infos entreprise */}
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-900 mb-1">
                            {audit.company_name || 'Entreprise'}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-slate-600 mb-2">
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-sm">business</span>
                              {audit.sector || 'Non spécifié'}
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-sm">people</span>
                              {audit.employees || 'Non spécifié'} employés
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-sm">euro</span>
                              {audit.ca_annuel || 'Non spécifié'} CA
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className={`px-3 py-1 rounded-full text-xs font-bold border ${couleurRisque[audit.niveau_risque as keyof typeof couleurRisque]}`}>
                              Risque {audit.niveau_risque}
                            </div>
                            {audit.pdp_recommandé && (
                              <div className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                                PDP: {audit.pdp_recommandé}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Amendes */}
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm text-slate-600 mb-1">Amendes potentielles</p>
                          <p className="text-2xl font-bold text-danger-600">
                            {(audit.amendes_annuelles || 0).toLocaleString('fr-FR')}€
                          </p>
                          <p className="text-xs text-slate-500 mt-1">par an</p>
                        </div>

                        {/* Date */}
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm text-slate-600 mb-1">Date audit</p>
                          <p className="text-sm font-medium text-slate-900">
                            {new Date(audit.created_at).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </p>
                          <p className="text-xs text-slate-500">
                            {new Date(audit.created_at).toLocaleTimeString('fr-FR', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex-shrink-0">
                          <Link href={`/audits/${audit.id}`}>
                            <Button variant="ghost" size="sm">
                              <span className="material-symbols-outlined mr-2">visibility</span>
                              Voir détails
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Infos supplémentaires (collapsable) */}
                    {(audit.duree_migration_estimee || audit.cout_estime) && (
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          {audit.duree_migration_estimee && (
                            <div>
                              <p className="text-slate-600">Durée migration estimée</p>
                              <p className="font-medium text-slate-900">{audit.duree_migration_estimee}</p>
                            </div>
                          )}
                          {audit.cout_estime && (
                            <div>
                              <p className="text-slate-600">Coût estimé</p>
                              <p className="font-medium text-slate-900">
                                {typeof audit.cout_estime === 'string' 
                                  ? audit.cout_estime 
                                  : (typeof audit.cout_estime === 'number' 
                                    ? (audit.cout_estime as number).toLocaleString('fr-FR') + '€'
                                    : String(audit.cout_estime || ''))}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">
                {searchTerm || filterRisk !== 'all' ? 'search_off' : 'assessment'}
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {searchTerm || filterRisk !== 'all'
                  ? 'Aucun audit trouvé'
                  : 'Aucun audit disponible'}
              </h3>
              <p className="text-slate-600 mb-6">
                {searchTerm || filterRisk !== 'all'
                  ? 'Essayez de modifier vos critères de recherche'
                  : 'Commencez par effectuer votre premier audit de conformité'}
              </p>
              {!(searchTerm || filterRisk !== 'all') && (
                <Link href="/audit">
                  <Button>
                    <span className="material-symbols-outlined mr-2">add_circle</span>
                    Démarrer un audit
                  </Button>
                </Link>
              )}
            </Card>
          )}
        </main>
      </div>
    </DashboardLayout>
  )
}

export default AuditsPage
