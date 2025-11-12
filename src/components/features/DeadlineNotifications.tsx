'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Link from 'next/link'

const DEADLINE_DATE = new Date('2026-09-01')

export default function DeadlineNotifications() {
  const [daysRemaining, setDaysRemaining] = useState(0)
  const [showAlert, setShowAlert] = useState(false)
  const [alertLevel, setAlertLevel] = useState<'info' | 'warning' | 'urgent'>('info')

  useEffect(() => {
    const calculateDays = () => {
      const today = new Date()
      const diff = DEADLINE_DATE.getTime() - today.getTime()
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
      setDaysRemaining(days)

      // Déterminer le niveau d'alerte
      if (days <= 30) {
        setAlertLevel('urgent')
        setShowAlert(true)
      } else if (days <= 90) {
        setAlertLevel('warning')
        setShowAlert(true)
      } else if (days <= 180) {
        setAlertLevel('info')
        setShowAlert(true)
      } else {
        setShowAlert(false)
      }
    }

    calculateDays()
    const interval = setInterval(calculateDays, 24 * 60 * 60 * 1000) // Mise à jour quotidienne

    return () => clearInterval(interval)
  }, [])

  if (!showAlert) return null

  const alertConfig = {
    info: {
      bg: 'bg-primary-50',
      border: 'border-primary-200',
      text: 'text-primary-800',
      icon: 'info',
      title: 'Deadline approche',
    },
    warning: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-800',
      icon: 'warning',
      title: 'Action requise',
    },
    urgent: {
      bg: 'bg-danger-50',
      border: 'border-danger-200',
      text: 'text-danger-800',
      icon: 'error',
      title: 'URGENT - Deadline imminente',
    },
  }

  const config = alertConfig[alertLevel]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="mb-6"
      >
        <Card className={`p-6 ${config.bg} ${config.border} border-2`}>
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-full ${config.bg} flex items-center justify-center flex-shrink-0`}>
              <span className={`material-symbols-outlined text-2xl ${config.text}`}>
                {config.icon}
              </span>
            </div>
            <div className="flex-1">
              <h3 className={`font-bold text-lg mb-2 ${config.text}`}>
                {config.title} - {daysRemaining} jours restants
              </h3>
              <p className={`text-sm mb-4 ${config.text}`}>
                {daysRemaining <= 30
                  ? '🚨 La deadline du 1er septembre 2026 approche rapidement ! Assurez-vous d\'être conforme avant cette date pour éviter les amendes.'
                  : daysRemaining <= 90
                    ? '⚠️ Plus que 3 mois avant l\'obligation de facturation électronique. Il est temps d\'agir !'
                    : 'ℹ️ L\'obligation de facturation électronique entre en vigueur le 1er septembre 2026. Préparez-vous dès maintenant.'}
              </p>
              <div className="flex gap-3">
                <Link href="/audit">
                  <Button variant={alertLevel === 'urgent' ? 'primary' : 'secondary'} size="sm">
                    <span className="material-symbols-outlined mr-2">assessment</span>
                    Faire un audit
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="ghost" size="sm">
                    <span className="material-symbols-outlined mr-2">rocket_launch</span>
                    Voir les offres
                  </Button>
                </Link>
              </div>
            </div>
            <button
              onClick={() => setShowAlert(false)}
              className={`text-slate-400 hover:${config.text} transition-colors`}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}

