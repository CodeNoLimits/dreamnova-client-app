'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/client'

const DashboardPage = () => {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    // Vérifier la session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/login')
      } else {
        setUser(session.user)
        setLoading(false)
      }
    })

    // Écouter les changements d'auth
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push('/login')
      } else {
        setUser(session.user)
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

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
          <p className="text-slate-600">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
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
              <span className="text-sm text-slate-600">{user?.email}</span>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Tableau de bord</h1>
          <p className="text-slate-600">
            Bienvenue dans votre espace de gestion de conformité
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="text-sm text-slate-600 mb-2">Score de conformité</div>
            <div className="text-4xl font-bold text-primary-600 mb-2">--</div>
            <p className="text-xs text-slate-500">Effectuez un audit pour voir votre score</p>
          </Card>

          <Card className="p-6">
            <div className="text-sm text-slate-600 mb-2">Amendes évitées</div>
            <div className="text-4xl font-bold text-success-600 mb-2">--</div>
            <p className="text-xs text-slate-500">Calculé après votre audit</p>
          </Card>

          <Card className="p-6">
            <div className="text-sm text-slate-600 mb-2">Factures converties</div>
            <div className="text-4xl font-bold text-warning-600 mb-2">0</div>
            <p className="text-xs text-slate-500">Sur 0 factures totales</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Actions rapides</h2>
            <div className="space-y-3">
              <Link href="/">
                <Button className="w-full" variant="primary">
                  Effectuer un audit de conformité
                </Button>
              </Link>
              <Link href="/pricing">
                <Button className="w-full" variant="secondary">
                  Voir les offres
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Vos audits récents</h2>
            <p className="text-slate-600 text-sm">
              Aucun audit effectué pour le moment. Commencez par effectuer votre premier audit.
            </p>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default DashboardPage

