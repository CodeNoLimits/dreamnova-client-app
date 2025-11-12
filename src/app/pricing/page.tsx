'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

const PricingPage = () => {
  // Plans mensuels (PRIORITAIRES - plus importants que one-shot)
  const monthlyPlans = [
    {
      id: 'starter',
      name: 'STARTER',
      subtitle: 'Conformité Basique',
      price: 50,
      priceLabel: '/mois',
      features: [
        'Conformité basique (50 factures/mois)',
        'Support email 48h',
        '1 formation vidéo/mois',
        'Templates conformité',
        'Dashboard de base',
      ],
      upsell: 'Après 3 mois → Offre URGENCE 8K€ (- 150€ déjà payés)',
      target: 'TPE qui veulent tester avant one-shot',
      color: 'primary',
      cta: 'Commencer maintenant',
      popular: false,
    },
    {
      id: 'growth',
      name: 'GROWTH',
      subtitle: 'PME en Croissance',
      price: 80,
      priceLabel: '/mois',
      features: [
        'Tout STARTER inclus',
        '200 factures/mois',
        'Support prioritaire 24h',
        '2 workflows IA automatisés',
        'Dashboard analytics avancé',
        'Formations mensuelles',
      ],
      upsell: 'Après 6 mois → Offre TRANSFORMATION 15K€ (- 480€)',
      target: 'PME en croissance continue',
      color: 'primary',
      cta: 'Démarrer la croissance',
      popular: true,
    },
    {
      id: 'premium-monthly',
      name: 'PREMIUM',
      subtitle: 'Enterprise Excellence',
      price: 180,
      priceLabel: '/mois',
      features: [
        'Factures illimitées',
        'Consultant dédié 2h/mois',
        'Tous workflows IA',
        'Audit trimestriel',
        'Formations équipe illimitées',
        'Support prioritaire 24/7',
        'API custom',
      ],
      upsell: 'Bundle avec PREMIUM 25K€ = only 100€/mois après',
      target: 'ETI qui veulent du consulting permanent',
      color: 'purple',
      cta: 'Consultation VIP',
      popular: false,
    },
  ]

  // Plans one-shot
  const oneShotPlans = [
    {
      id: 'urgence',
      name: 'URGENCE',
      subtitle: 'OpenBee Rescue / Conformité Express',
      price: 8000,
      priceLabel: 'HT one-shot',
      features: [
        'Audit complet en 48h',
        'Calcul amendes potentielles',
        'Migration OpenBee → PA agréée',
        'Formation équipe (2h)',
        '100 premières factures offertes',
        'Hotline 30 jours',
        'Certificat conformité DGFIP',
      ],
      roi: "Évite 90K€ d'amendes/an",
      target: 'TPE <50 salariés paniquées',
      volume: '500K entreprises OpenBee',
      color: 'danger',
      cta: 'JE SUIS EN DANGER →',
    },
    {
      id: 'transformation',
      name: 'TRANSFORMATION',
      subtitle: "Osez l'IA - Package Complet",
      price: 15000,
      priceLabel: 'HT one-shot',
      features: [
        'Tout URGENCE inclus',
        '+ Automatisation comptable IA',
        '+ 3 workflows métier automatisés',
        '+ Site web pro + SEO',
        '+ CRM intégré (HubSpot/Notion)',
        '+ Formation IA équipe (8h)',
        '+ 6 mois accompagnement',
        '+ Dashboard analytics temps réel',
      ],
      roi: '+40% productivité = 150K€/an',
      target: 'PME 50-250 salariés ambitieuses',
      usp: 'Seuls à bundler conformité + IA',
      color: 'primary',
      cta: "TRANSFORMER MON ENTREPRISE →",
      recommended: true,
    },
    {
      id: 'premium',
      name: 'PREMIUM',
      subtitle: 'Enterprise Excellence',
      price: 25000,
      priceLabel: 'HT + 500€/mois',
      features: [
        'Tout TRANSFORMATION inclus',
        '+ Consultant dédié permanent',
        '+ Intégration ERP complet',
        '+ CSRD reporting ESG',
        '+ Cybersécurité audit + SOC',
        '+ BI & Predictive Analytics',
        '+ API custom développement',
        '+ Board reporting mensuel',
      ],
      roi: '500K€/an optimisations',
      target: 'ETI 250-1000 salariés',
      exit: 'Rachat par Big 4 possible',
      color: 'purple',
      cta: 'CONSULTATION VIP →',
    },
  ]

  const handleSelectPlan = (planId: string) => {
    // Rediriger vers la page de checkout avec le plan sélectionné
    window.location.href = `/checkout?plan=${planId}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-lg sticky top-0 z-50">
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
            <Link href="/">
              <Button variant="ghost" size="sm">
                Retour
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold text-slate-900 mb-6">
              Choisissez Votre Formule
            </h1>
            <p className="text-xl text-slate-600 mb-4">
              <strong>Plans mensuels</strong> pour démarrer facilement ou <strong>one-shot</strong> pour régler définitivement
            </p>
            <p className="text-sm text-slate-500">
              Sans engagement • Paiement flexible • Upgrade possible à tout moment
            </p>
          </motion.div>
        </div>
      </section>

      {/* Monthly Plans Section - PRIORITAIRE */}
      <section className="pb-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              💎 Plans Mensuels (Recommandé)
            </h2>
            <p className="text-slate-600">
              Commencez dès aujourd'hui, sans engagement. Upgrade vers one-shot avec crédit.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {monthlyPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-primary-600 to-primary-400 text-white px-4 py-1 rounded-full text-xs font-bold">
                      POPULAIRE
                    </span>
                  </div>
                )}
                <Card
                  className={`h-full p-8 ${
                    plan.popular
                      ? 'border-2 border-primary-500 shadow-xl scale-105'
                      : 'border border-slate-200'
                  }`}
                >
                  <div className="space-y-6">
                    {/* Header */}
                    <div>
                      <h3 className="text-2xl font-bold text-primary-600 mb-2">{plan.name}</h3>
                      <p className="text-sm text-slate-600">{plan.subtitle}</p>
                    </div>

                    {/* Price */}
                    <div>
                      <div className="text-4xl font-bold text-slate-900 mb-1">
                        {plan.price}€
                      </div>
                      <p className="text-sm text-slate-500">{plan.priceLabel}</p>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <svg
                            className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-sm text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Upsell Box */}
                    <div className="p-4 rounded-lg bg-primary-50 border border-primary-200">
                      <p className="text-xs font-semibold mb-1">💡 Upgrade Path:</p>
                      <p className="text-xs">{plan.upsell}</p>
                    </div>

                    {/* CTA */}
                    <Button
                      onClick={() => handleSelectPlan(plan.id)}
                      className="w-full"
                      size="lg"
                      variant={plan.popular ? 'primary' : 'secondary'}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* One-Shot Plans Section */}
      <section className="pb-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              🚀 Solutions One-Shot
            </h2>
            <p className="text-slate-600">
              Réglez définitivement votre conformité. Paiement en 3-4x sans frais via Alma.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {oneShotPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-primary-600 to-primary-400 text-white px-4 py-1 rounded-full text-xs font-bold">
                      BEST-SELLER
                    </span>
                  </div>
                )}
                <Card
                  className={`h-full p-8 ${
                    plan.recommended
                      ? 'border-2 border-primary-500 shadow-xl scale-105'
                      : 'border border-slate-200'
                  }`}
                >
                  <div className="space-y-6">
                    {/* Header */}
                    <div>
                      <h3
                        className={`text-2xl font-bold mb-2 ${
                          plan.color === 'danger'
                            ? 'text-danger-600'
                            : plan.color === 'purple'
                            ? 'text-purple-600'
                            : 'text-primary-600'
                        }`}
                      >
                        {plan.name}
                      </h3>
                      <p className="text-sm text-slate-600">{plan.subtitle}</p>
                    </div>

                    {/* Price */}
                    <div>
                      <div className="text-4xl font-bold text-slate-900 mb-1">
                        {plan.price.toLocaleString('fr-FR')}€
                      </div>
                      <p className="text-sm text-slate-500">{plan.priceLabel}</p>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <svg
                            className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-sm text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* ROI Box */}
                    <div
                      className={`p-4 rounded-lg ${
                        plan.color === 'danger'
                          ? 'bg-danger-50 border border-danger-200'
                          : plan.color === 'purple'
                          ? 'bg-purple-50 border border-purple-200'
                          : 'bg-primary-50 border border-primary-200'
                      }`}
                    >
                      <p className="text-xs font-semibold mb-1">ROI:</p>
                      <p className="text-sm">{plan.roi}</p>
                      <p className="text-xs mt-2 opacity-75">Cible: {plan.target}</p>
                    </div>

                    {/* CTA */}
                    <Button
                      onClick={() => handleSelectPlan(plan.id)}
                      className="w-full"
                      size="lg"
                      variant={plan.recommended ? 'primary' : 'secondary'}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Options */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Options de Paiement Flexibles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { name: 'ALMA', icon: '💜', desc: '3x ou 4x sans frais', payout: '97% immédiat' },
              { name: 'KLARNA', icon: '🔵', desc: 'Jusqu\'à 12x', payout: '95% immédiat' },
              { name: 'PLEDG', icon: '🟢', desc: 'B2B spécialisé', payout: '98% immédiat' },
              { name: 'STRIPE', icon: '⚡', desc: 'Virement/CB instant', payout: '100% J+2' },
            ].map((option) => (
              <Card key={option.name} className="p-6 text-center">
                <div className="text-4xl mb-3">{option.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{option.name}</h3>
                <p className="text-sm text-slate-600 mb-2">{option.desc}</p>
                <p className="text-xs text-primary-600 font-semibold">{option.payout}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default PricingPage

