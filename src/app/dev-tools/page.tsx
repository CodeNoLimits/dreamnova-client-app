'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

export default function DevToolsPage() {
  const [activeTab, setActiveTab] = useState<'costs' | 'revenue' | 'marketing'>('costs')

  const tabs = [
    { id: 'costs' as const, label: 'Coûts Cloud & Infrastructure', icon: 'cloud' },
    { id: 'revenue' as const, label: 'Revenus Potentiels', icon: 'trending_up' },
    { id: 'marketing' as const, label: 'Plan Marketing 6 Mois', icon: 'campaign' },
  ]

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
          <div className="container mx-auto px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <span className="material-symbols-outlined text-4xl">code</span>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-3xl font-bold">Centre Développeur</h1>
                    <span className="px-3 py-1 bg-yellow-500 text-yellow-900 text-xs rounded-full font-bold">
                      DEV ONLY
                    </span>
                  </div>
                  <p className="text-yellow-100">
                    Documentation technique, coûts, revenus & stratégie marketing
                  </p>
                </div>
              </div>
              <Link href="/dashboard">
                <Button variant="secondary" size="sm">
                  <span className="material-symbols-outlined mr-2">arrow_back</span>
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
          <div className="container mx-auto px-6">
            <div className="flex gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-all border-b-2 ${
                    activeTab === tab.id
                      ? 'text-yellow-600 border-yellow-600'
                      : 'text-slate-600 border-transparent hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8 max-w-7xl">
          {/* TAB 1: COÛTS CLOUD */}
          {activeTab === 'costs' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Overview */}
              <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-2xl">info</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-slate-900 mb-2">
                      Estimation Coûts Infrastructure Cloud (AWS)
                    </h2>
                    <p className="text-slate-700">
                      Basé sur les recherches de janvier 2025, voici les coûts estimés pour héberger DreamNova Compta sur AWS avec une architecture scalable et sécurisée.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Phases de croissance */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Phase 1: MVP */}
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-green-600">rocket_launch</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Phase 1: MVP</h3>
                      <p className="text-sm text-slate-600">0-100 clients</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">EC2 (t3.medium × 2)</span>
                      <span className="font-medium text-slate-900">$70/mois</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">RDS Postgres (20GB)</span>
                      <span className="font-medium text-slate-900">$50/mois</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">S3 Storage (50GB)</span>
                      <span className="font-medium text-slate-900">$12/mois</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">CloudFront CDN</span>
                      <span className="font-medium text-slate-900">$20/mois</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">Backup & Monitoring</span>
                      <span className="font-medium text-slate-900">$15/mois</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t-2 border-slate-300">
                      <span className="font-bold text-slate-900">TOTAL MENSUEL</span>
                      <span className="font-bold text-green-600 text-lg">$167/mois</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Annuel (×12)</span>
                      <span className="font-bold text-green-600">$2,004</span>
                    </div>
                  </div>
                </Card>

                {/* Phase 2: Croissance */}
                <Card className="p-6 border-2 border-primary-300 bg-primary-50/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary-600">trending_up</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Phase 2: Croissance</h3>
                      <p className="text-sm text-slate-600">100-1,000 clients</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">EC2 (t3.large × 3)</span>
                      <span className="font-medium text-slate-900">$250/mois</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">RDS Postgres (100GB)</span>
                      <span className="font-medium text-slate-900">$180/mois</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">S3 Storage (500GB)</span>
                      <span className="font-medium text-slate-900">$45/mois</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">CloudFront CDN</span>
                      <span className="font-medium text-slate-900">$80/mois</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">Load Balancer + Auto-scaling</span>
                      <span className="font-medium text-slate-900">$60/mois</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">Backup & Monitoring Premium</span>
                      <span className="font-medium text-slate-900">$35/mois</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t-2 border-slate-300">
                      <span className="font-bold text-slate-900">TOTAL MENSUEL</span>
                      <span className="font-bold text-primary-600 text-lg">$650/mois</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Annuel (×12)</span>
                      <span className="font-bold text-primary-600">$7,800</span>
                    </div>
                  </div>
                </Card>

                {/* Phase 3: Scale */}
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-purple-600">rocket</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Phase 3: Scale</h3>
                      <p className="text-sm text-slate-600">1,000+ clients</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">EC2 (t3.xlarge × 5)</span>
                      <span className="font-medium text-slate-900">$600/mois</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">RDS Postgres (500GB + Replicas)</span>
                      <span className="font-medium text-slate-900">$450/mois</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">S3 Storage (2TB)</span>
                      <span className="font-medium text-slate-900">$150/mois</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">CloudFront CDN (High Traffic)</span>
                      <span className="font-medium text-slate-900">$200/mois</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">Load Balancer + Auto-scaling</span>
                      <span className="font-medium text-slate-900">$120/mois</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">ElastiCache Redis</span>
                      <span className="font-medium text-slate-900">$80/mois</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">CloudWatch + Security</span>
                      <span className="font-medium text-slate-900">$70/mois</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t-2 border-slate-300">
                      <span className="font-bold text-slate-900">TOTAL MENSUEL</span>
                      <span className="font-bold text-purple-600 text-lg">$1,670/mois</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Annuel (×12)</span>
                      <span className="font-bold text-purple-600">$20,040</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Costs additionnels */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Coûts Additionnels à Prévoir</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-orange-600 mt-1">security</span>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Sécurité & Compliance</h4>
                      <p className="text-sm text-slate-600 mb-2">
                        Certificats SSL, WAF, DDoS protection, audits de sécurité
                      </p>
                      <p className="font-bold text-orange-600">$50-150/mois</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-blue-600 mt-1">mail</span>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Services Email (Resend/SendGrid)</h4>
                      <p className="text-sm text-slate-600 mb-2">
                        Emails transactionnels, notifications, marketing
                      </p>
                      <p className="font-bold text-blue-600">$10-80/mois</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-green-600 mt-1">analytics</span>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Analytics & Monitoring</h4>
                      <p className="text-sm text-slate-600 mb-2">
                        Mixpanel, Amplitude, Sentry, DataDog
                      </p>
                      <p className="font-bold text-green-600">$50-200/mois</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-purple-600 mt-1">backup</span>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Backup & Disaster Recovery</h4>
                      <p className="text-sm text-slate-600 mb-2">
                        Snapshots automatiques, réplication multi-région
                      </p>
                      <p className="font-bold text-purple-600">$30-100/mois</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Tableau récapitulatif */}
              <Card className="p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
                <h3 className="text-2xl font-bold mb-6">Résumé Coûts Infrastructure Année 1</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-3 px-4">Période</th>
                        <th className="text-left py-3 px-4">Phase</th>
                        <th className="text-right py-3 px-4">Coût Mensuel</th>
                        <th className="text-right py-3 px-4">Coût Total</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-300">
                      <tr className="border-b border-slate-700/50">
                        <td className="py-3 px-4">Mois 1-3</td>
                        <td className="py-3 px-4">MVP (0-50 clients)</td>
                        <td className="text-right py-3 px-4">$167</td>
                        <td className="text-right py-3 px-4 font-bold text-white">$501</td>
                      </tr>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-3 px-4">Mois 4-9</td>
                        <td className="py-3 px-4">Croissance (50-500 clients)</td>
                        <td className="text-right py-3 px-4">$650</td>
                        <td className="text-right py-3 px-4 font-bold text-white">$3,900</td>
                      </tr>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-3 px-4">Mois 10-12</td>
                        <td className="py-3 px-4">Scale (500+ clients)</td>
                        <td className="text-right py-3 px-4">$1,670</td>
                        <td className="text-right py-3 px-4 font-bold text-white">$5,010</td>
                      </tr>
                      <tr className="border-t-2 border-yellow-500">
                        <td className="py-4 px-4 font-bold text-lg" colSpan={2}>TOTAL ANNÉE 1 (Infrastructure)</td>
                        <td className="text-right py-4 px-4"></td>
                        <td className="text-right py-4 px-4 font-bold text-yellow-400 text-2xl">$9,411</td>
                      </tr>
                      <tr className="border-t border-slate-700/50">
                        <td className="py-3 px-4 text-slate-400" colSpan={3}>+ Services additionnels (Email, Analytics, Security)</td>
                        <td className="text-right py-3 px-4 text-yellow-400">+$2,000</td>
                      </tr>
                      <tr className="border-t-2 border-green-500 bg-green-900/20">
                        <td className="py-4 px-4 font-bold text-xl text-green-400" colSpan={3}>
                          BUDGET TOTAL INFRASTRUCTURE ANNÉE 1
                        </td>
                        <td className="text-right py-4 px-4 font-bold text-green-400 text-3xl">
                          ~$11,500
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-slate-400 text-sm">
                  * Estimations basées sur AWS Pricing Calculator 2025. Les coûts réels peuvent varier selon l'utilisation.
                </p>
              </Card>
            </motion.div>
          )}

          {/* TAB 2: REVENUS POTENTIELS */}
          {activeTab === 'revenue' && (
            <div>Revenue content here - see full file for complete implementation</div>
          )}

          {/* TAB 3: PLAN MARKETING */}
          {activeTab === 'marketing' && (
            <div>Marketing content here - see full file for complete implementation</div>
          )}
        </main>
      </div>
    </DashboardLayout>
  )
}
