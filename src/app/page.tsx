'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Hero from '@/components/features/Hero'
import OnboardingFlow from '@/components/features/OnboardingFlow'
import PenaltyCalculator from '@/components/features/PenaltyCalculator'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(false)

  if (showOnboarding) {
    return <OnboardingFlow onBack={() => setShowOnboarding(false)} />
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Hero onStartAudit={() => setShowOnboarding(true)} />

      {/* Calculator Section */}
      <section id="calculator" className="py-20 bg-white scroll-mt-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <PenaltyCalculator />
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Stop Overpaying for Compliance
            </h2>
            <p className="text-lg text-slate-600">
              Contrast the slow, costly 'old way' of manual consultants with the smart, efficient
              'DreamNova way' of AI automation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6">The Old Way: Manual & Costly</h3>
              <ul className="space-y-4">
                {[
                  'High hourly rates for consultants and endless meetings.',
                  'Slow, manual processes prone to human error and delays.',
                  'Fragmented data and lack of real-time visibility.',
                  'Static reports that are outdated the moment they\'re printed.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-danger-500 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-8 border-2 border-primary-500 bg-primary-50/50">
              <h3 className="text-2xl font-bold text-primary-700 mb-6">
                The DreamNova Way: Automated & Efficient
              </h3>
              <ul className="space-y-4">
                {[
                  'Predictable, transparent pricing with up to 70% cost reduction.',
                  'AI-powered automation for speed, accuracy, and efficiency.',
                  'Centralized dashboard with real-time compliance status.',
                  'Dynamic, print-friendly, board-ready reports on demand.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-success-600 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Compliance in 3 Simple Steps
            </h2>
            <p className="text-lg text-slate-600">
              Our platform simplifies complexity. Get up and running in minutes, not months.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: 'link',
                title: '1. Connect',
                desc: 'Securely connect your existing ERP, accounting, and IT systems with our pre-built integrations.',
              },
              {
                icon: 'analytics',
                title: '2. Analyze',
                desc: 'Our AI engine automatically analyzes your data and identifies compliance gaps in real-time.',
              },
              {
                icon: 'settings',
                title: '3. Automate',
                desc: 'Generate compliant e-invoices, CSRD reports, and NIS2 documentation automatically.',
              },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary-600 text-3xl">
                    {step.icon}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                <p className="text-slate-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4">Secure Your Compliance Future Today</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Don't wait for deadlines to become emergencies. Partner with DreamNova to automate
            compliance, reduce costs, and focus on what you do best—growing your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing">
              <Button size="lg" variant="secondary" className="bg-white text-primary-600">
                Voir nos offres
              </Button>
            </Link>
            <Button
              size="lg"
              variant="ghost"
              className="border-2 border-white text-white hover:bg-white/10"
              onClick={() => setShowOnboarding(true)}
            >
              Audit gratuit
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
