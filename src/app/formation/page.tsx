'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

export default function FormationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-6 py-20 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-primary-600 text-4xl">
                  school
                </span>
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-4">
                Formation en cours de développement
              </h1>
              <p className="text-lg text-slate-600 mb-6">
                Nous préparons actuellement une formation complète pour vous accompagner dans la mise en
                conformité avec les obligations 2026.
              </p>
            </div>

            <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-primary-900 mb-3">
                Ce qui sera disponible prochainement :
              </h2>
              <ul className="text-left space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary-600 text-sm mt-0.5">
                    check_circle
                  </span>
                  <span>Modules vidéo interactifs sur la facturation électronique</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary-600 text-sm mt-0.5">
                    check_circle
                  </span>
                  <span>Guides pratiques étape par étape</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary-600 text-sm mt-0.5">
                    check_circle
                  </span>
                  <span>Formation pour votre équipe comptable</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary-600 text-sm mt-0.5">
                    check_circle
                  </span>
                  <span>Webinaires avec nos experts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary-600 text-sm mt-0.5">
                    check_circle
                  </span>
                  <span>Certificats de formation</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button variant="primary" size="lg">
                  Retour au dashboard
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="secondary" size="lg">
                  Voir nos offres
                </Button>
              </Link>
            </div>

            <p className="mt-6 text-sm text-slate-500">
              Vous serez notifié dès que la formation sera disponible.
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

