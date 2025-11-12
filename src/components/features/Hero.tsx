'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

interface HeroProps {
  onStartAudit: () => void
}

const Hero: React.FC<HeroProps> = ({ onStartAudit }) => {
  const deadline = new Date('2026-09-01')
  const today = new Date()
  const daysRemaining = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-5 -z-10" />

      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link href="/">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-gradient-dreamnova rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="text-2xl font-display font-bold text-slate-900">
                DreamNova Compta
              </span>
            </motion.div>
          </Link>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Connexion
              </Button>
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Hero content */}
      <div className="container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Countdown badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-danger-50 text-danger-700 rounded-full text-sm font-semibold mb-8"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span>Plus que {daysRemaining} jours avant septembre 2026</span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-5xl md:text-7xl font-display font-bold text-slate-900 mb-6 text-balance"
          >
            Votre entreprise est-elle prête pour la{' '}
            <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              facturation électronique 2026
            </span>
            ?
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto text-balance"
          >
            Évaluez votre niveau de conformité en 2 minutes et découvrez les risques d'amendes auxquels vous êtes exposé.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button onClick={onStartAudit} size="lg" className="w-full sm:w-auto">
              <span>Démarrer l'audit gratuit</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
            <Link href="#calculator">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                En savoir plus
              </Button>
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 flex flex-wrap gap-6 justify-center items-center"
          >
            {[
              { icon: 'verified', text: '100% conforme RGPD', color: 'text-success-600' },
              { icon: 'schedule', text: 'Audit en 2 minutes', color: 'text-primary-600' },
              { icon: 'cancel', text: 'Sans engagement', color: 'text-slate-600' },
              { icon: 'lock', text: 'Données sécurisées', color: 'text-slate-600' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-200"
              >
                <span className={`material-symbols-outlined text-lg ${item.color}`}>
                  {item.icon}
                </span>
                <span className="text-sm font-medium text-slate-700">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Stats section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="container mx-auto px-6 pb-20"
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: '15 000€', label: 'Amende maximale par entreprise' },
              { value: '100%', label: 'Entreprises concernées en 2026' },
              { value: '2 min', label: 'Pour connaître votre niveau de risque' },
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 text-center">
                <div className="text-4xl font-display font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Hero
