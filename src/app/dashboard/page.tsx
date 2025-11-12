'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import DocumentUpload from '@/components/features/DocumentUpload'
import QRCodePairing from '@/components/features/QRCodePairing'
import ConformityChecklist from '@/components/features/ConformityChecklist'
import DeadlineNotifications from '@/components/features/DeadlineNotifications'
import { createClient } from '@/lib/supabase/client'
import { getPlanFeatures, type PlanType, isTrialPlan } from '@/lib/subscription'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

// Types pour les audits sauvegardés
interface AuditSauvegarde {
  id: string
  created_at: string
  nom_entreprise: string
  score_conformite: number
  niveau_risque: string
  amendes_potentielles: number
  roi_annuel: number
  pdp_recommande: string
}

const DashboardPage = () => {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [audits, setAudits] = useState<AuditSauvegarde[]>([])
  const [subscription, setSubscription] = useState<{ plan_type: PlanType | null; status: string; expires_at?: string | null; started_at?: string | null } | null>(null)

  useEffect(() => {
    const supabase = createClient()
    let isMounted = true

    // Timeout de sécurité (10 secondes max)
    const timeoutId = setTimeout(() => {
      if (isMounted) {
        console.warn('Dashboard: Timeout lors du chargement de la session')
        setLoading(false)
      }
    }, 10000)

    // Vérifier la session avec retry
    const checkSession = async () => {
      try {
        // Essayer getSession d'abord
        let { data: { session }, error } = await supabase.auth.getSession()

        if (!isMounted) return

        if (error) {
          console.error('Dashboard: Erreur getSession:', error)
        }

        // Si pas de session, essayer refreshSession (peut récupérer depuis cookies)
        if (!session) {
          console.log('Dashboard: Pas de session, tentative de refresh...')
          const refreshResult = await supabase.auth.refreshSession()
          if (!isMounted) return

          session = refreshResult.data.session
          if (refreshResult.error) {
            console.error('Dashboard: Erreur refreshSession:', refreshResult.error)
          }
        }

        clearTimeout(timeoutId)

        // Si toujours pas de session après refresh, rediriger vers login
        if (!session) {
          console.warn('Dashboard: Aucune session trouvée après refresh, redirection login')
          router.push('/login')
          return
        }

        console.log('Dashboard: Session valide pour', session.user.email)
        setUser(session.user)

        // Charger les données en parallèle
        Promise.all([
          chargerAudits(session.user.id),
          chargerAbonnement(session.user.id)
        ]).finally(() => {
          if (isMounted) {
            setLoading(false)
          }
        })
      } catch (error) {
        if (!isMounted) return
        clearTimeout(timeoutId)
        console.error('Dashboard: Erreur lors de checkSession:', error)
        setLoading(false)
        router.push('/login')
      }
    }

    checkSession()

    // Écouter les changements d'auth
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return

      if (!session) {
        router.push('/login')
      } else {
        setUser(session.user)
        chargerAudits(session.user.id)
        chargerAbonnement(session.user.id)
      }
    })

    return () => {
      isMounted = false
      clearTimeout(timeoutId)
      subscription.unsubscribe()
    }
  }, [router])

  const chargerAbonnement = async (userId: string) => {
    const supabase = createClient()
    
    // Vérifier d'abord si c'est le compte testeur ou manubousky
    const { data: { user } } = await supabase.auth.getUser()
    const isTester = user?.email === 'tester@example.com'
    const isManubousky = user?.email?.toLowerCase() === 'manubousky@gmail.com'
    
    // Pour manubousky, forcer Premium MAX
    if (isManubousky) {
      const { error: subError } = await supabase.from('subscriptions').upsert({
        user_id: userId,
        plan_type: 'premium',
        plan_name: 'PREMIUM MAX',
        status: 'active',
        started_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      }, { onConflict: 'user_id' })
      
      if (subError) {
        console.error('Erreur mise à jour Premium MAX:', subError)
      }
    }
    
    // Pour le testeur, s'assurer qu'il a Growth
    if (isTester) {
      const { error: subError } = await supabase.from('subscriptions').upsert({
        user_id: userId,
        plan_type: 'growth',
        plan_name: 'GROWTH',
        status: 'active',
        started_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      }, { onConflict: 'user_id' })
      
      if (subError) {
        console.error('Erreur mise à jour Growth:', subError)
      }
    }
    
    // Récupérer l'abonnement
    const { data, error } = await supabase
      .from('subscriptions')
      .select('plan_type, status, started_at, expires_at')
      .eq('user_id', userId)
      .in('status', ['active', 'trialing', 'pending', 'paid'])
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (!error && data) {
      // Vérifier si c'est une période d'essai (7 jours après started_at)
      // JAMAIS pour testeur ou manubousky
      const startedAt = data.started_at ? new Date(data.started_at) : null
      const now = new Date()
      const daysSinceStart = startedAt ? (now.getTime() - startedAt.getTime()) / (1000 * 60 * 60 * 24) : 0
      const isTrial = !isTester && !isManubousky && (
        data.status === 'trialing' ||
        (startedAt && daysSinceStart < 7 && daysSinceStart >= 0)
      )

      setSubscription({
        plan_type: data.plan_type as PlanType,
        status: isTrial ? 'trialing' : 'active', // Toujours 'active' pour testeur/manubousky
        expires_at: data.expires_at,
        started_at: data.started_at
      })
    } else {
      // Si pas d'abonnement trouvé, vérifier si c'est manubousky (Premium MAX) ou testeur (Growth)
      if (isManubousky) {
        setSubscription({ 
          plan_type: 'premium' as PlanType, 
          status: 'active',
          expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
          started_at: new Date().toISOString()
        })
      } else if (isTester) {
        setSubscription({ 
          plan_type: 'growth' as PlanType, 
          status: 'active',
          expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
          started_at: new Date().toISOString()
        })
      } else {
        setSubscription({ plan_type: null, status: 'none', expires_at: null, started_at: null })
      }
    }
  }

  const chargerAudits = async (userId: string) => {
    // TODO: Récupérer les audits depuis Supabase
    // Pour l'instant, utiliser des données de démo
    const auditsDemo: AuditSauvegarde[] = [
      {
        id: '1',
        created_at: '2025-11-10T10:00:00',
        nom_entreprise: 'Ma Société',
        score_conformite: 68,
        niveau_risque: 'MODÉRÉ',
        amendes_potentielles: 12500,
        roi_annuel: 245,
        pdp_recommande: 'Pennylane',
      },
      {
        id: '2',
        created_at: '2025-11-05T14:30:00',
        nom_entreprise: 'Ma Société',
        score_conformite: 55,
        niveau_risque: 'ÉLEVÉ',
        amendes_potentielles: 15000,
        roi_annuel: 180,
        pdp_recommande: 'Tiime',
      },
      {
        id: '3',
        created_at: '2025-10-28T09:15:00',
        nom_entreprise: 'Ma Société',
        score_conformite: 42,
        niveau_risque: 'CRITIQUE',
        amendes_potentielles: 15000,
        roi_annuel: 150,
        pdp_recommande: 'Qonto',
      },
    ]
    setAudits(auditsDemo)
  }

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Chargement de votre tableau de bord...</p>
        </div>
      </div>
    )
  }

  // Calculs des statistiques
  const dernierAudit = audits.length > 0 ? audits[0] : null
  const scoreActuel = dernierAudit?.score_conformite || 0
  const amendesEvitees = dernierAudit
    ? Math.round(dernierAudit.amendes_potentielles * 0.7)
    : 0
  const tendanceScore =
    audits.length >= 2
      ? audits[0].score_conformite - audits[1].score_conformite
      : 0

  // Données pour graphique d'évolution du score
  const donneesEvolution = audits
    .slice()
    .reverse()
    .map((audit) => ({
      date: new Date(audit.created_at).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
      }),
      score: audit.score_conformite,
      objectif: 80,
    }))

  // Données pour graphique des amendes
  const donneesAmendes = audits
    .slice()
    .reverse()
    .map((audit) => ({
      date: new Date(audit.created_at).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
      }),
      amendes: audit.amendes_potentielles,
    }))

  // Données pour graphique ROI
  const donneesROI = [
    { mois: 'Jan', roi: 150 },
    { mois: 'Fév', roi: 180 },
    { mois: 'Mar', roi: 210 },
    { mois: 'Avr', roi: 245 },
    { mois: 'Mai', roi: 280 },
    { mois: 'Juin', roi: 320 },
  ]

  // Données pour répartition des risques
  const donneesRisques = [
    { name: 'Conforme', value: scoreActuel, color: '#10b981' },
    { name: 'Non conforme', value: 100 - scoreActuel, color: '#ef4444' },
  ]

  const couleurRisque = {
    CRITIQUE: 'text-danger-700 bg-danger-100',
    ÉLEVÉ: 'text-orange-700 bg-orange-100',
    MODÉRÉ: 'text-warning-700 bg-warning-100',
    FAIBLE: 'text-success-700 bg-success-100',
  }

  // Récupérer les fonctionnalités selon l'abonnement
  const isTrial = subscription ? isTrialPlan(subscription.plan_type, subscription.started_at || null, user?.email) : false
  const features = subscription
    ? getPlanFeatures(subscription.plan_type, isTrial, user?.email)
    : getPlanFeatures(null, false, user?.email)
  const hasSubscription = subscription && (subscription.status === 'active' || subscription.status === 'trialing')
  
  // Afficher "PREMIUM MAX" pour manubousky@gmail.com
  const isMaxAccess = user?.email?.toLowerCase() === 'manubousky@gmail.com'

  return (
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
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-900">{user?.email}</span>
                {(hasSubscription && subscription?.plan_type) || isMaxAccess ? (
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    isMaxAccess
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : isTrial 
                        ? 'bg-amber-100 text-amber-700' 
                        : subscription?.plan_type === 'growth' 
                          ? 'bg-primary-100 text-primary-700'
                          : subscription?.plan_type === 'premium-monthly'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-slate-100 text-slate-700'
                  }`}>
                    {isMaxAccess ? 'PREMIUM MAX' :
                     isTrial ? 'ESSAI GRATUIT' :
                     subscription?.plan_type === 'growth' ? 'GROWTH' :
                     subscription?.plan_type === 'premium-monthly' ? 'PREMIUM' :
                     subscription?.plan_type === 'starter' ? 'STARTER' :
                     subscription?.plan_type?.toUpperCase() || 'PREMIUM MAX'}
                  </div>
                ) : null}
                {!hasSubscription && (
                  <div className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                    Sans abonnement
                  </div>
                )}
              </div>
              {!hasSubscription && (
                <Link href="/pricing">
                  <Button variant="ghost" size="sm">
                    S'abonner
                  </Button>
                </Link>
              )}
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Notifications Deadline */}
        <DeadlineNotifications />

        {/* En-tête avec actions */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Tableau de bord</h1>
            <p className="text-slate-600">
              Vue d'ensemble de votre conformité e-facture 2026
            </p>
          </div>
          <Link href="/audit">
            <Button size="lg">
              <span className="material-symbols-outlined mr-2">add_circle</span>
              Nouvel audit
            </Button>
          </Link>
        </div>

        {/* Stats principales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-slate-600">Score de conformité</div>
                <span className="material-symbols-outlined text-primary-600">
                  shield_with_house
                </span>
              </div>
              <div className="text-4xl font-bold text-primary-600 mb-2">{scoreActuel}%</div>
              {tendanceScore !== 0 && (
                <div
                  className={`flex items-center gap-1 text-xs ${
                    tendanceScore > 0 ? 'text-success-600' : 'text-danger-600'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">
                    {tendanceScore > 0 ? 'trending_up' : 'trending_down'}
                  </span>
                  <span>
                    {tendanceScore > 0 ? '+' : ''}
                    {tendanceScore} points vs dernier audit
                  </span>
                </div>
              )}
              {!dernierAudit && (
                <p className="text-xs text-slate-500">Effectuez un audit pour voir votre score</p>
              )}
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-slate-600">Amendes évitées</div>
                <span className="material-symbols-outlined text-success-600">
                  savings
                </span>
              </div>
              <div className="text-4xl font-bold text-success-600 mb-2">
                {amendesEvitees.toLocaleString('fr-FR')}€
              </div>
              <p className="text-xs text-slate-500">Économies potentielles An 1</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-slate-600">Audits effectués</div>
                <span className="material-symbols-outlined text-warning-600">
                  monitoring
                </span>
              </div>
              <div className="text-4xl font-bold text-warning-600 mb-2">{audits.length}</div>
              <p className="text-xs text-slate-500">Depuis votre inscription</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-slate-600">Niveau de risque</div>
                <span className="material-symbols-outlined text-danger-600">
                  warning
                </span>
              </div>
              {dernierAudit ? (
                <>
                  <div
                    className={`inline-flex px-3 py-1 rounded-full text-sm font-bold ${
                      couleurRisque[dernierAudit.niveau_risque as keyof typeof couleurRisque]
                    }`}
                  >
                    {dernierAudit.niveau_risque}
                  </div>
                  <p className="text-xs text-slate-500 mt-2">D'après votre dernier audit</p>
                </>
              ) : (
                <p className="text-xs text-slate-500">Aucun audit disponible</p>
              )}
            </Card>
          </motion.div>
        </div>

        {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Évolution du score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-600">
                  show_chart
                </span>
                Évolution du score de conformité
              </h2>
              {donneesEvolution.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={donneesEvolution}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" stroke="#64748b" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#64748b" style={{ fontSize: '12px' }} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="#6366f1"
                      strokeWidth={2}
                      fill="url(#colorScore)"
                      name="Score"
                    />
                    <Line
                      type="monotone"
                      dataKey="objectif"
                      stroke="#10b981"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Objectif"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-64 flex items-center justify-center text-slate-500">
                  <div className="text-center">
                    <span className="material-symbols-outlined text-6xl mb-2">bar_chart</span>
                    <p>Effectuez plusieurs audits pour voir l'évolution</p>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>

          {/* Répartition conformité */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-600">
                  donut_large
                </span>
                Répartition de la conformité
              </h2>
              {dernierAudit ? (
                <div className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={donneesRisques}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {donneesRisques.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#fff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                        }}
                        formatter={(value: number) => `${value}%`}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-slate-500">
                  <div className="text-center">
                    <span className="material-symbols-outlined text-6xl mb-2">pie_chart</span>
                    <p>Effectuez un audit pour voir la répartition</p>
                  </div>
                </div>
              )}
              {dernierAudit && (
                <div className="flex items-center justify-center gap-8 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-success-500"></div>
                    <span className="text-sm text-slate-600">Conforme: {scoreActuel}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-danger-500"></div>
                    <span className="text-sm text-slate-600">
                      Non conforme: {100 - scoreActuel}%
                    </span>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>

          {/* Évolution amendes potentielles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-danger-600">
                  trending_down
                </span>
                Réduction des amendes potentielles
              </h2>
              {donneesAmendes.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={donneesAmendes}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" stroke="#64748b" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                      }}
                      formatter={(value: number) => `${value.toLocaleString('fr-FR')}€`}
                    />
                    <Bar dataKey="amendes" fill="#ef4444" radius={[8, 8, 0, 0]} name="Amendes" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-64 flex items-center justify-center text-slate-500">
                  <div className="text-center">
                    <span className="material-symbols-outlined text-6xl mb-2">bar_chart</span>
                    <p>Historique des amendes potentielles</p>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>

          {/* Projection ROI */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-success-600">
                  trending_up
                </span>
                Projection ROI (6 mois)
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={donneesROI}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="mois" stroke="#64748b" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Line
                    type="monotone"
                    dataKey="roi"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    name="ROI"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>

        {/* Checklist de Conformité */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-8"
        >
          <ConformityChecklist />
        </motion.div>
        
        {/* Section E-Reporting */}
        <motion.div
          id="e-reporting"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-8 scroll-mt-20"
        >
          <Card className="p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-600">send</span>
              E-Reporting automatique
            </h2>
            <p className="text-slate-600 mb-4">
              Configurez la transmission automatique de vos factures à la DGFIP via votre Plateforme de Dématérialisation Partenaire (PDP).
            </p>
            {hasSubscription ? (
              <div className="space-y-4">
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                  <p className="text-sm text-primary-800 mb-3">
                    <strong>✅ E-Reporting disponible</strong>
                    <br />
                    Connectez votre PDP pour activer la transmission automatique.
                  </p>
                  <Link href="/dashboard#pdp-integration">
                    <Button size="sm" variant="primary">
                      Configurer PDP
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <p className="text-sm text-slate-600 mb-3">
                  Cette fonctionnalité nécessite un abonnement actif.
                </p>
                <Link href="/pricing">
                  <Button size="sm" variant="secondary">
                    Voir les offres
                  </Button>
                </Link>
              </div>
            )}
          </Card>
        </motion.div>
        
        {/* Section Archivage */}
        <motion.div
          id="archivage"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mb-8 scroll-mt-20"
        >
          <Card className="p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-600">archive</span>
              Archivage sécurisé
            </h2>
            <p className="text-slate-600 mb-4">
              Tous vos documents convertis sont automatiquement archivés dans Supabase Storage avec une durée de conservation conforme aux obligations légales (10 ans).
            </p>
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <p className="text-sm text-primary-800">
                <strong>✅ Archivage automatique activé</strong>
                <br />
                Vos factures sont stockées de manière sécurisée et accessible depuis votre dashboard.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Historique des audits et actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Historique */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="lg:col-span-2"
          >
            <Card className="p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-600">history</span>
                Historique des audits
              </h2>
              {audits.length > 0 ? (
                <div className="space-y-3">
                  {audits.map((audit, index) => (
                    <div
                      key={audit.id}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-xl font-bold text-primary-600">
                            {audit.score_conformite}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{audit.nom_entreprise}</p>
                          <p className="text-sm text-slate-600">
                            {new Date(audit.created_at).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            couleurRisque[audit.niveau_risque as keyof typeof couleurRisque]
                          }`}
                        >
                          {audit.niveau_risque}
                        </div>
                        <Button variant="ghost" size="sm">
                          <span className="material-symbols-outlined">visibility</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">
                    assessment
                  </span>
                  <p className="text-slate-600 mb-4">
                    Aucun audit effectué pour le moment. Commencez par effectuer votre premier
                    audit.
                  </p>
                  <Link href="/audit">
                    <Button>
                      <span className="material-symbols-outlined mr-2">add_circle</span>
                      Démarrer un audit
                    </Button>
                  </Link>
                </div>
              )}
            </Card>
          </motion.div>

          {/* Actions rapides */}
          <motion.div
            id="test-flow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="scroll-mt-20"
          >
            <Card className="p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-600">bolt</span>
                Actions rapides
              </h2>
              <div className="space-y-3">
                <Link href="/audit">
                  <Button className="w-full" variant="primary">
                    <span className="material-symbols-outlined mr-2">add_circle</span>
                    Nouvel audit
                  </Button>
                </Link>
                <Link href="/audit-results">
                  <Button className="w-full" variant="secondary">
                    <span className="material-symbols-outlined mr-2">description</span>
                    Voir dernier rapport
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button className="w-full" variant="ghost">
                    <span className="material-symbols-outlined mr-2">shopping_cart</span>
                    Voir les offres
                  </Button>
                </Link>
                {features.hasPDFReports ? (
                  <Link href="/audit-results">
                    <Button className="w-full" variant="ghost">
                      <span className="material-symbols-outlined mr-2">picture_as_pdf</span>
                      Télécharger PDF
                    </Button>
                  </Link>
                ) : (
                  <Link href="/pricing">
                    <Button className="w-full" variant="ghost" disabled={false}>
                      <span className="material-symbols-outlined mr-2">lock</span>
                      PDF (Growth+)
                    </Button>
                  </Link>
                )}
              </div>

              {dernierAudit && (
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-3 text-sm">
                    Plateforme recommandée
                  </h3>
                  <div className="bg-gradient-dreamnova text-white p-4 rounded-lg">
                    <p className="text-2xl font-bold mb-1">{dernierAudit.pdp_recommande}</p>
                    <p className="text-sm text-white/80">
                      Basé sur votre profil d'entreprise
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-slate-200">
                <h3 className="font-bold text-slate-900 mb-3 text-sm">Deadline e-facture</h3>
                <div className="bg-danger-50 border border-danger-200 p-4 rounded-lg">
                  <p className="text-danger-700 font-bold text-lg mb-1">
                    {Math.ceil(
                      (new Date('2026-09-01').getTime() - new Date().getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}{' '}
                    jours
                  </p>
                  <p className="text-sm text-danger-600">Jusqu'au 1er septembre 2026</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* QR Code Pairing pour mobile - PDP Integration */}
          {features.hasFacturXConversion && (
            <motion.div
              id="pdp-integration"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="col-span-1 scroll-mt-20"
            >
              <Card className="p-6 mb-6">
                <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-600">link</span>
                  Configuration PDP
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  Connectez votre Plateforme de Dématérialisation Partenaire (Pennylane, Qonto, Sellsy, Tiime) pour activer l'e-reporting automatique.
                </p>
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-primary-800">
                    <strong>📋 PDP recommandé:</strong> {dernierAudit?.pdp_recommande || 'À déterminer via audit'}
                  </p>
                </div>
                <Button variant="primary" size="sm" className="w-full">
                  <span className="material-symbols-outlined mr-2">settings</span>
                  Configurer PDP
                </Button>
              </Card>
              <QRCodePairing
                onPaired={(sessionId) => {
                  console.log('Mobile appairé:', sessionId)
                }}
                onUploadComplete={(file) => {
                  console.log('Document uploadé depuis mobile:', file.name)
                  // Rafraîchir la liste des documents
                  chargerAudits(user?.id || '')
                }}
              />
            </motion.div>
          )}

          {/* Upload de documents (desktop) */}
          {features.hasFacturXConversion ? (
            <motion.div
              id="document-upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="col-span-1 scroll-mt-20"
            >
              <DocumentUpload
                onUploadComplete={async (file, format) => {
                  console.log('✅ Document uploadé:', file.name, 'Format:', format)
                  // Rafraîchir les données du dashboard
                  if (user) {
                    await chargerAudits(user.id)
                  }
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="col-span-1"
            >
              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-slate-400 text-4xl">lock</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Conversion Factur-X</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Disponible avec le plan Growth ou supérieur
                </p>
                <Link href="/pricing">
                  <Button size="sm">Voir les offres</Button>
                </Link>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}

export default DashboardPage
