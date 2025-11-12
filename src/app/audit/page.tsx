'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import AuditWizardComplete from '@/components/features/AuditWizardComplete'

const AuditPage = () => {
  const router = useRouter()

  return <AuditWizardComplete onBack={() => router.push('/')} />
}

export default AuditPage

