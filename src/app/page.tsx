'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Hero from '@/components/features/Hero'
import OnboardingFlow from '@/components/features/OnboardingFlow'

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(false)

  if (showOnboarding) {
    return <OnboardingFlow onBack={() => setShowOnboarding(false)} />
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Hero onStartAudit={() => setShowOnboarding(true)} />
    </main>
  )
}
