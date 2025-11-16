'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

export default function ReglementationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-6 py-20 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Réglementation Facturation Électronique 2026
            </h1>
            <p className="text-xl text-slate-600">
              Tout ce que vous devez savoir sur les nouvelles obligations
            </p>
          </div>

          {/* Contenu principal */}
          <div className="space-y-8">
            {/* Section 1: Obligation */}
            <Card className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-danger-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-danger-600 text-2xl">gavel</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Obligation Légale au 1er Septembre 2026
                  </h2>
                  <p className="text-slate-600">
                    À partir du 1er septembre 2026, <strong>toutes les entreprises françaises</strong> devront
                    transmettre leurs factures électroniques à la Direction Générale des Finances Publiques (DGFIP)
                    via une Plateforme de Dématérialisation Partenaire (PDP) ou le Portail Public de Facturation (PPF).
                  </p>
                </div>
              </div>

              <div className="bg-danger-50 border-l-4 border-danger-600 p-4 rounded-r-lg">
                <p className="text-danger-800 font-semibold">
                  ⚠️ Cette obligation s'applique à TOUTES les factures B2B (Business-to-Business), sans exception.
                </p>
              </div>
            </Card>

            {/* Section 2: Amendes */}
            <Card className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-warning-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-warning-600 text-2xl">warning</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Amendes et Pénalités
                  </h2>
                  <p className="text-slate-600 mb-4">
                    Le non-respect de cette obligation entraîne des sanctions financières importantes :
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <h3 className="font-bold text-slate-900 mb-2">💰 Amendes par facture non conforme</h3>
                  <p className="text-slate-700">
                    <strong>15€ par facture B2B</strong> non transmise ou non conforme aux normes Factur-X.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <h3 className="font-bold text-slate-900 mb-2">📊 Plafond annuel</h3>
                  <p className="text-slate-700">
                    <strong>15,000€ par an maximum</strong> d'amendes pour non-conformité.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <h3 className="font-bold text-slate-900 mb-2">🏢 Pénalité Plateforme d'Agrément (PA)</h3>
                  <p className="text-slate-700">
                    Si vous n'avez pas configuré de Plateforme d'Agrément : <strong>500€ + 1,000€ par trimestre</strong> = 
                    <strong> 4,500€/an</strong> supplémentaires.
                  </p>
                </div>
              </div>
            </Card>

            {/* Section 3: Format Factur-X */}
            <Card className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary-600 text-2xl">description</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Format Factur-X Obligatoire
                  </h2>
                  <p className="text-slate-600 mb-4">
                    Toutes les factures doivent être au format <strong>Factur-X</strong>, qui combine :
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                  <h3 className="font-bold text-primary-900 mb-2">📄 PDF/A-3</h3>
                  <p className="text-primary-800 text-sm">
                    Format PDF standardisé pour l'archivage long terme (10 ans minimum).
                  </p>
                </div>
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                  <h3 className="font-bold text-primary-900 mb-2">📋 XML EN 16931</h3>
                  <p className="text-primary-800 text-sm">
                    Métadonnées structurées selon la norme européenne de facturation électronique.
                  </p>
                </div>
              </div>
            </Card>

            {/* Section 4: PDP */}
            <Card className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-success-600 text-2xl">link</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Plateformes de Dématérialisation Partenaires (PDP)
                  </h2>
                  <p className="text-slate-600 mb-4">
                    Vous devez choisir une PDP certifiée pour transmettre vos factures. Les principales options :
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <h3 className="font-bold text-slate-900 mb-2">💼 Pennylane</h3>
                  <p className="text-slate-700 text-sm">
                    Idéal pour les PME avec besoin de comptabilité intégrée. Interface simple et intuitive.
                  </p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <h3 className="font-bold text-slate-900 mb-2">🏦 Qonto</h3>
                  <p className="text-slate-700 text-sm">
                    Parfait pour les entreprises avec besoins bancaires et facturation combinés.
                  </p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <h3 className="font-bold text-slate-900 mb-2">📊 Sellsy</h3>
                  <p className="text-slate-700 text-sm">
                    Solution complète pour entreprises avec besoin de CRM et facturation.
                  </p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <h3 className="font-bold text-slate-900 mb-2">⚡ Tiime</h3>
                  <p className="text-slate-700 text-sm">
                    Plateforme moderne pour entreprises en croissance (API disponible Q2 2026).
                  </p>
                </div>
              </div>
            </Card>

            {/* Section 5: E-Reporting */}
            <Card className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary-600 text-2xl">send</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    E-Reporting Automatique
                  </h2>
                  <p className="text-slate-600 mb-4">
                    L'e-reporting consiste à transmettre automatiquement vos factures à la DGFIP. Cette transmission
                    doit être effectuée <strong>dans les 7 jours</strong> suivant l'émission de la facture.
                  </p>
                </div>
              </div>

              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                <p className="text-primary-800">
                  <strong>✅ Avec DreamNova :</strong> L'e-reporting est automatique. Vos factures sont converties en
                  Factur-X et transmises à la DGFIP via votre PDP, sans intervention manuelle.
                </p>
              </div>
            </Card>

            {/* Section 6: Archivage */}
            <Card className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-slate-600 text-2xl">archive</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Archivage Obligatoire (10 ans)
                  </h2>
                  <p className="text-slate-600 mb-4">
                    Toutes les factures doivent être archivées de manière sécurisée pendant <strong>10 ans minimum</strong>,
                    conformément aux obligations légales françaises.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <p className="text-slate-800">
                  <strong>✅ Avec DreamNova :</strong> Archivage automatique dans Supabase Storage avec durée de
                  conservation conforme aux obligations légales.
                </p>
              </div>
            </Card>

            {/* Section 7: Deadline */}
            <Card className="p-8 bg-gradient-to-br from-danger-50 to-danger-100 border-2 border-danger-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-danger-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-white text-3xl">schedule</span>
                </div>
                <h2 className="text-3xl font-bold text-danger-900 mb-4">
                  Deadline : 1er Septembre 2026
                </h2>
                <p className="text-lg text-danger-800 mb-6">
                  Il est temps d'agir ! Ne laissez pas les deadlines devenir des urgences.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/audit">
                    <Button size="lg" variant="primary" className="bg-danger-600 hover:bg-danger-700">
                      Faire un audit gratuit
                    </Button>
                  </Link>
                  <Link href="/pricing">
                    <Button size="lg" variant="secondary">
                      Voir nos solutions
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center">
            <Link href="/">
              <Button variant="ghost" size="lg">
                <span className="material-symbols-outlined mr-2">arrow_back</span>
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

