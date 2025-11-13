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
  secteur_activite: string
  ca_annuel: string
  employees: string
  score_conformite: number
  niveau_risque: string
  amendes_annuelles: number
  pdp_recommandé: string | null
  duree_migration_estimee: string | null
  cout_estime: number | null
}

const AuditsPage = () => {
  const router = useRouter()
  const [audits, setAudits] = useState<Audit[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRisk, setFilterRisk] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'date' | 'score' | 'amendes'>('date')

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
    const supabase = createClient()

    const { data, error } = await supabase
      .from('audits')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erreur chargement audits:', error)
    } else {
      setAudits(data || [])
    }

    setLoading(false)
  }

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  // Filtrer et trier les audits
  const auditsFiltres = audits
    .filter((audit) => {
      const matchSearch =
        audit.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        audit.secteur_activite?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchRisk =
        filterRisk === 'all' || audit.niveau_risque === filterRisk

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
                              {audit.secteur_activite || 'Non spécifié'}
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
                                {audit.cout_estime.toLocaleString('fr-FR')}€
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
