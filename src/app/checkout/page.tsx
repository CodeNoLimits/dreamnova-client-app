'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { createClient } from '@/lib/supabase/client'

// Plans disponibles
const allPlans = {
  // Mensuels
  starter: {
    id: 'starter',
    name: 'STARTER',
    subtitle: 'Conformité Basique',
    price: 50,
    priceLabel: '/mois',
    type: 'monthly',
    features: [
      'Conformité basique (50 factures/mois)',
      'Support email 48h',
      '1 formation vidéo/mois',
      'Templates conformité',
      'Dashboard de base',
    ],
  },
  growth: {
    id: 'growth',
    name: 'GROWTH',
    subtitle: 'PME en Croissance',
    price: 80,
    priceLabel: '/mois',
    type: 'monthly',
    features: [
      'Tout STARTER inclus',
      '200 factures/mois',
      'Support prioritaire 24h',
      '2 workflows IA automatisés',
      'Dashboard analytics avancé',
      'Formations mensuelles',
    ],
  },
  'premium-monthly': {
    id: 'premium-monthly',
    name: 'PREMIUM',
    subtitle: 'Enterprise Excellence',
    price: 180,
    priceLabel: '/mois',
    type: 'monthly',
    features: [
      'Factures illimitées',
      'Consultant dédié 2h/mois',
      'Tous workflows IA',
      'Audit trimestriel',
      'Formations équipe illimitées',
      'Support prioritaire 24/7',
      'API custom',
    ],
  },
  // One-shot
  urgence: {
    id: 'urgence',
    name: 'URGENCE',
    subtitle: 'OpenBee Rescue / Conformité Express',
    price: 8000,
    priceLabel: 'HT one-shot',
    type: 'one-shot',
    features: [
      'Audit complet en 48h',
      'Calcul amendes potentielles',
      'Migration OpenBee → PA agréée',
      'Formation équipe (2h)',
      '100 premières factures offertes',
      'Hotline 30 jours',
      'Certificat conformité DGFIP',
    ],
  },
  transformation: {
    id: 'transformation',
    name: 'TRANSFORMATION',
    subtitle: "Osez l'IA - Package Complet",
    price: 15000,
    priceLabel: 'HT one-shot',
    type: 'one-shot',
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
  },
  premium: {
    id: 'premium',
    name: 'PREMIUM',
    subtitle: 'Enterprise Excellence',
    price: 25000,
    priceLabel: 'HT + 500€/mois',
    type: 'one-shot',
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
  },
}

const CheckoutPageContent = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const planId = searchParams.get('plan')
  const [plan, setPlan] = useState<any>(null)
  const [step, setStep] = useState(1) // 1: Plan selection, 2: Payment, 3: Confirmation
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
  })
  const [paymentMethod, setPaymentMethod] = useState<'alma' | 'stripe' | 'klarna' | 'simulate' | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user)
        setFormData((prev) => ({ ...prev, email: session.user.email || '' }))
      }
    })

    if (planId && allPlans[planId as keyof typeof allPlans]) {
      setPlan(allPlans[planId as keyof typeof allPlans])
    } else {
      // Si pas de plan, rediriger vers pricing
      router.push('/pricing')
    }
  }, [planId, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePayment = async () => {
    if (!plan || !paymentMethod) return

    setIsLoading(true)

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        alert('Veuillez vous connecter pour continuer')
        router.push('/login')
        setIsLoading(false)
        return
      }

      // Simulation de paiement (pour tests)
      if (paymentMethod === 'simulate') {
        const planType = plan.type === 'monthly' ? plan.id : plan.id
        const expiresAt = plan.type === 'monthly' 
          ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 jours
          : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 an pour one-shot

        // Créer l'abonnement simulé
        const { error: subError } = await supabase.from('subscriptions').upsert({
          user_id: user.id,
          plan_type: planType,
          plan_name: plan.name,
          amount: plan.price * 100,
          currency: 'EUR',
          payment_method: plan.type,
          payment_provider: 'simulate',
          status: 'active',
          started_at: new Date().toISOString(),
          expires_at: expiresAt,
        }, { onConflict: 'user_id' })

        if (subError) {
          console.error('Error creating simulated subscription:', subError)
          alert('Erreur lors de la simulation. Veuillez réessayer.')
          setIsLoading(false)
          return
        }

        // Envoyer email de confirmation
        try {
          await fetch('/api/emails/subscription-confirmation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: user.email,
              planName: plan.name,
              planPrice: plan.price,
              planType: plan.type,
            }),
          })
        } catch (emailError) {
          console.error('Error sending email:', emailError)
          // Ne pas bloquer si l'email échoue
        }

        // Passer à l'étape de confirmation
        setStep(3)
        setIsLoading(false)
        return
      }

      // Pour les plans mensuels, utiliser Stripe Checkout
      if (plan.type === 'monthly' && paymentMethod === 'stripe') {
        const planId = plan.id === 'starter' ? 'starter-monthly' :
                      plan.id === 'growth' ? 'growth-monthly' :
                      'premium-monthly'

        const response = await fetch('/api/checkout/stripe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            planId,
            trialDays: 7, // 7 jours d'essai gratuit
          }),
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || 'Erreur lors de la création de la session Stripe')
        }

        const { url } = await response.json()
        
        // Rediriger vers Stripe Checkout
        if (url) {
          window.location.href = url
          return
        }
      }

      // Pour les plans one-shot avec Alma/Klarna ou paiement direct
      // Note: 'simulate' est déjà géré plus haut (ligne 177)
      if (plan.type === 'one-shot') {
        // Pour l'instant, simuler le paiement (à remplacer par Alma/Klarna réel)
        const expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 an
        
        const { error } = await supabase.from('subscriptions').upsert({
          user_id: user.id,
          plan_type: plan.id,
          plan_name: plan.name,
          amount: plan.price * 100, // En centimes
          currency: 'EUR',
          payment_method: plan.type,
          payment_provider: paymentMethod,
          status: 'paid',
          started_at: new Date().toISOString(),
          expires_at: expiresAt,
        }, { onConflict: 'user_id' })

        if (error) {
          console.error('Error creating subscription:', error)
          alert('Erreur lors de la création de l\'abonnement. Veuillez réessayer.')
          setIsLoading(false)
          return
        }

        // Envoyer email de confirmation
        try {
          await fetch('/api/emails/subscription-confirmation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: user.email,
              planName: plan.name,
              planPrice: plan.price,
              planType: plan.type,
            }),
          })
        } catch (emailError) {
          console.error('Error sending email:', emailError)
          // Ne pas bloquer si l'email échoue
        }

        // Passer à l'étape de confirmation
        setStep(3)
      }
    } catch (error: any) {
      console.error('Payment error:', error)
      alert(error.message || 'Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!plan) {
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
            <Link href="/pricing">
              <Button variant="ghost" size="sm">
                Retour
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      step >= s
                        ? 'bg-primary-600 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {s}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      step >= s ? 'text-primary-600' : 'text-slate-600'
                    }`}
                  >
                    {s === 1 ? 'Plan' : s === 2 ? 'Paiement' : 'Confirmation'}
                  </span>
                </div>
                {s < 3 && (
                  <div
                    className={`w-16 h-1 ${
                      step > s ? 'bg-primary-600' : 'bg-slate-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Plan Summary */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Récapitulatif de votre commande</h2>
                <div className="space-y-4">
                  <div className="flex items-start justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <h3 className="font-bold text-slate-900">{plan.name}</h3>
                      <p className="text-sm text-slate-600">{plan.subtitle}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary-600">
                        {plan.price.toLocaleString('fr-FR')}€
                      </p>
                      <p className="text-sm text-slate-500">{plan.priceLabel}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Inclus dans cette formule :</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-success-600 text-lg">
                            check_circle
                          </span>
                          <span className="text-sm text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <Button onClick={() => setStep(2)} className="w-full" size="lg">
                    Continuer vers le paiement
                  </Button>
                </div>
              </Card>
            </div>

            {/* Order Summary Sidebar */}
            <div>
              <Card className="p-6 sticky top-24">
                <h3 className="font-bold text-slate-900 mb-4">Résumé</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Formule</span>
                    <span className="font-semibold">{plan.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Prix</span>
                    <span className="font-semibold">
                      {plan.price.toLocaleString('fr-FR')}€
                    </span>
                  </div>
                  {plan.type === 'one-shot' && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Paiement en 3-4x</span>
                      <span className="font-semibold text-primary-600">Sans frais</span>
                    </div>
                  )}
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">Total</span>
                    <span className="text-2xl font-bold text-primary-600">
                      {plan.price.toLocaleString('fr-FR')}€
                    </span>
                  </div>
                  {plan.type === 'monthly' && (
                    <p className="text-xs text-slate-500 mt-1">Facturé mensuellement</p>
                  )}
                </div>
              </Card>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Informations de facturation</h2>
                <div className="space-y-4">
                  <Input
                    label="Nom de l'entreprise"
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Téléphone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Adresse"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Code postal"
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      label="Ville"
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Méthode de paiement</h2>
                <div className={`grid gap-4 ${plan.type === 'one-shot' ? 'grid-cols-3' : 'grid-cols-2'}`}>
                  {plan.type === 'one-shot' ? (
                    <>
                      <button
                        onClick={() => setPaymentMethod('alma')}
                        className={`p-6 rounded-lg border-2 transition-all ${
                          paymentMethod === 'alma'
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-slate-200 hover:border-primary-300'
                        }`}
                      >
                        <div className="text-3xl mb-2">💜</div>
                        <div className="font-bold text-slate-900">ALMA</div>
                        <div className="text-sm text-slate-600">3-4x sans frais</div>
                      </button>
                      <button
                        onClick={() => setPaymentMethod('stripe')}
                        className={`p-6 rounded-lg border-2 transition-all ${
                          paymentMethod === 'stripe'
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-slate-200 hover:border-primary-300'
                        }`}
                      >
                        <div className="text-3xl mb-2">⚡</div>
                        <div className="font-bold text-slate-900">STRIPE</div>
                        <div className="text-sm text-slate-600">Paiement unique</div>
                      </button>
                      <button
                        onClick={() => setPaymentMethod('simulate')}
                        className={`p-6 rounded-lg border-2 transition-all ${
                          paymentMethod === 'simulate'
                            ? 'border-success-500 bg-success-50'
                            : 'border-slate-200 hover:border-success-300'
                        }`}
                      >
                        <div className="text-3xl mb-2">🧪</div>
                        <div className="font-bold text-slate-900">SIMULER</div>
                        <div className="text-sm text-slate-600">Test uniquement</div>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setPaymentMethod('stripe')}
                        className={`p-6 rounded-lg border-2 transition-all ${
                          paymentMethod === 'stripe'
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-slate-200 hover:border-primary-300'
                        }`}
                      >
                        <div className="text-3xl mb-2">⚡</div>
                        <div className="font-bold text-slate-900">STRIPE</div>
                        <div className="text-sm text-slate-600">Carte bancaire</div>
                      </button>
                      <button
                        onClick={() => setPaymentMethod('simulate')}
                        className={`p-6 rounded-lg border-2 transition-all ${
                          paymentMethod === 'simulate'
                            ? 'border-success-500 bg-success-50'
                            : 'border-slate-200 hover:border-success-300'
                        }`}
                      >
                        <div className="text-3xl mb-2">🧪</div>
                        <div className="font-bold text-slate-900">SIMULER</div>
                        <div className="text-sm text-slate-600">Test uniquement</div>
                      </button>
                    </>
                  )}
                </div>
              </Card>

              <div className="flex gap-4">
                <Button variant="ghost" onClick={() => setStep(1)} className="flex-1">
                  Retour
                </Button>
                <Button
                  onClick={handlePayment}
                  disabled={!paymentMethod || isLoading}
                  isLoading={isLoading}
                  className="flex-1"
                  size="lg"
                >
                  {isLoading ? 'Traitement...' : 'Confirmer et payer'}
                </Button>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div>
              <Card className="p-6 sticky top-24">
                <h3 className="font-bold text-slate-900 mb-4">Résumé</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Formule</span>
                    <span className="font-semibold">{plan.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Prix</span>
                    <span className="font-semibold">
                      {plan.price.toLocaleString('fr-FR')}€
                    </span>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">Total</span>
                    <span className="text-2xl font-bold text-primary-600">
                      {plan.price.toLocaleString('fr-FR')}€
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="max-w-2xl mx-auto">
            <Card className="p-12 text-center">
              <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-success-600 text-5xl">check_circle</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Commande confirmée !
              </h2>
              <p className="text-slate-600 mb-8">
                Votre abonnement <strong>{plan.name}</strong> a été créé avec succès.
                {user ? (
                  <>
                    <br />
                    Vous recevrez un email de confirmation sous peu.
                    <br />
                    Vous pouvez maintenant accéder à votre dashboard.
                  </>
                ) : (
                  <>
                    <br />
                    Veuillez vous connecter pour accéder à votre espace client.
                  </>
                )}
              </p>
              <div className="flex gap-4 justify-center">
                {user ? (
                  <Link href="/dashboard">
                    <Button size="lg">Accéder au dashboard</Button>
                  </Link>
                ) : (
                  <Link href="/login">
                    <Button size="lg">Se connecter</Button>
                  </Link>
                )}
                <Link href="/">
                  <Button variant="ghost" size="lg">
                    Retour à l'accueil
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
          <p className="text-slate-600">Chargement...</p>
        </div>
      </div>
    }>
      <CheckoutPageContent />
    </Suspense>
  )
}

