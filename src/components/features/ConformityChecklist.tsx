'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import PDPConfigModal from './PDPConfigModal'

interface ChecklistItem {
  id: string
  label: string
  description: string
  status: 'done' | 'pending' | 'blocked'
  actionUrl?: string
  actionLabel?: string
}

export default function ConformityChecklist() {
  const [items, setItems] = useState<ChecklistItem[]>([])
  const [progress, setProgress] = useState(0)
  const [user, setUser] = useState<any>(null)
  const [showPDPModal, setShowPDPModal] = useState(false)

  useEffect(() => {
    const loadChecklist = async () => {
      const supabase = createClient()
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      setUser(currentUser)

      if (!currentUser) return

      // Vérifier l'état de chaque item
      const { data: audits } = await supabase
        .from('audits')
        .select('id, created_at')
        .eq('user_id', currentUser.id)
        .order('created_at', { ascending: false })
        .limit(1)

      // Vérifier si c'est testeur ou manubousky (toujours abonnés)
      const isTester = currentUser.email === 'tester@example.com'
      const isManubousky = currentUser.email?.toLowerCase() === 'manubousky@gmail.com'

      const { data: subscription } = await supabase
        .from('subscriptions')
        .select('plan_type, status')
        .eq('user_id', currentUser.id)
        .eq('status', 'active')
        .single()

      // Vérifier si un PDP est configuré
      const { data: pdpConnection } = await supabase
        .from('pdp_connections')
        .select('id, pdp_name, status')
        .eq('user_id', currentUser.id)
        .eq('status', 'active')
        .maybeSingle()

      const hasAudit = audits && audits.length > 0
      // Testeur et manubousky sont TOUJOURS considérés comme abonnés
      const hasSubscription = isTester || isManubousky || (subscription && subscription.status === 'active')
      const hasPDP = pdpConnection && pdpConnection.status === 'active'

      const checklistItems: ChecklistItem[] = [
        {
          id: 'audit',
          label: 'Audit de conformité effectué',
          description: 'Effectuez votre premier audit pour connaître votre niveau de conformité',
          status: hasAudit ? 'done' : 'pending',
          actionUrl: '/audit',
          actionLabel: 'Faire un audit',
        },
        {
          id: 'subscription',
          label: 'Abonnement activé',
          description: 'Souscrivez à un plan pour accéder à toutes les fonctionnalités',
          status: hasSubscription ? 'done' : hasAudit ? 'pending' : 'blocked',
          actionUrl: '/pricing',
          actionLabel: 'Voir les offres',
        },
        {
          id: 'pdp',
          label: 'PDP configuré',
          description: 'Connectez votre Plateforme de Dématérialisation Partenaire',
          status: hasPDP ? 'done' : hasSubscription ? 'pending' : 'blocked',
          actionUrl: undefined, // Utiliser le modal au lieu du lien
          actionLabel: 'Configurer PDP',
        },
        {
          id: 'facturx',
          label: 'Factur-X configuré',
          description: 'Configurez la conversion automatique en format Factur-X',
          status: hasSubscription ? 'pending' : 'blocked',
          actionUrl: hasSubscription ? '/dashboard#document-upload' : undefined,
          actionLabel: 'Configurer Factur-X',
        },
        {
          id: 'formation',
          label: 'Formation équipe effectuée',
          description: 'Formez votre équipe aux nouvelles obligations 2026',
          status: 'pending',
          actionUrl: '/formation',
          actionLabel: 'Accéder à la formation',
        },
        {
          id: 'tests',
          label: 'Tests de facturation effectués',
          description: 'Testez votre processus de facturation avant la deadline',
          status: hasSubscription ? 'pending' : 'blocked',
          actionUrl: hasSubscription ? '/dashboard#test-flow' : undefined,
          actionLabel: 'Tester',
        },
        {
          id: 'archivage',
          label: 'Archivage configuré',
          description: 'Configurez l\'archivage sécurisé de vos factures',
          status: hasSubscription ? 'pending' : 'blocked',
          actionUrl: hasSubscription ? '/dashboard#archivage' : undefined,
          actionLabel: 'Configurer',
        },
        {
          id: 'ereporting',
          label: 'E-reporting configuré',
          description: 'Configurez la transmission automatique à la DGFIP',
          status: hasSubscription ? 'pending' : 'blocked',
          actionUrl: hasSubscription ? '/dashboard#e-reporting' : undefined,
          actionLabel: 'Configurer',
        },
      ]

      setItems(checklistItems)

      // Calculer le pourcentage de progression
      const doneCount = checklistItems.filter(item => item.status === 'done').length
      const totalCount = checklistItems.length
      setProgress(Math.round((doneCount / totalCount) * 100))
    }

    loadChecklist()
  }, [])

  return (
    <Card className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-600">
              checklist
            </span>
            Checklist de Conformité
          </h2>
          <div className="text-2xl font-bold text-primary-600">{progress}%</div>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3 mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-primary-600 to-primary-400 h-3 rounded-full"
          />
        </div>
        <p className="text-sm text-slate-600">
          {progress === 100
            ? '🎉 Félicitations ! Vous êtes 100% conforme !'
            : `${items.filter(i => i.status === 'done').length} sur ${items.length} étapes complétées`}
        </p>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-colors ${
              item.status === 'done'
                ? 'bg-success-50 border-success-200'
                : item.status === 'blocked'
                  ? 'bg-slate-50 border-slate-200 opacity-60'
                  : 'bg-primary-50 border-primary-200'
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {item.status === 'done' ? (
                <div className="w-6 h-6 bg-success-600 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-sm">check</span>
                </div>
              ) : (
                <div className="w-6 h-6 border-2 border-slate-300 rounded-full" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-900 mb-1">{item.label}</h3>
              <p className="text-sm text-slate-600 mb-2">{item.description}</p>
              {item.status !== 'done' && (
                <>
                  {item.id === 'pdp' ? (
                    <Button
                      size="sm"
                      variant={item.status === 'blocked' ? 'ghost' : 'primary'}
                      disabled={item.status === 'blocked'}
                      onClick={() => {
                        if (!item.status === 'blocked') {
                          setShowPDPModal(true)
                        }
                      }}
                    >
                      {item.actionLabel || 'Configurer PDP'}
                    </Button>
                  ) : item.actionUrl ? (
                    <Link href={item.actionUrl} className="inline-block">
                      <Button
                        size="sm"
                        variant={item.status === 'blocked' ? 'ghost' : 'primary'}
                        disabled={item.status === 'blocked'}
                        onClick={(e) => {
                          if (item.status === 'blocked') {
                            e.preventDefault()
                          }
                        }}
                      >
                        {item.actionLabel || 'Commencer'}
                      </Button>
                    </Link>
                  ) : null}
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {progress < 100 && (
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800">
            <strong>💡 Astuce:</strong> Complétez les étapes dans l'ordre pour une migration en douceur.
          </p>
        </div>
      )}

      {/* Modal PDP */}
      <PDPConfigModal isOpen={showPDPModal} onClose={() => setShowPDPModal(false)} />
    </Card>
  )
}

