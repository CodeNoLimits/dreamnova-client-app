'use client'

import React, { useState, useRef, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import DocumentUpload from '@/components/features/DocumentUpload'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

function MobileScanPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get('sessionId') || searchParams.get('session') || null
  const [isPaired, setIsPaired] = useState(false)
  const [deviceInfo, setDeviceInfo] = useState<string>('')

  useEffect(() => {
    if (!sessionId) {
      router.push('/')
      return
    }

    // Détecter les informations du device
    const userAgent = navigator.userAgent
    const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent)
    setDeviceInfo(isMobile ? 'Mobile Device' : 'Desktop Device')

    // Pairer automatiquement avec la session
    const pairWithSession = async () => {
      try {
        const response = await fetch('/api/pairing/pair-mobile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            deviceInfo: userAgent,
          }),
        })

        if (response.ok) {
          setIsPaired(true)
        }
      } catch (error) {
        console.error('Erreur pairing:', error)
      }
    }

    pairWithSession()
  }, [sessionId, router])

  const handleUploadComplete = async (file: File, convertedFormat?: string) => {
    if (!sessionId) return

    try {
      // Uploader le fichier
      const formData = new FormData()
      formData.append('file', file)

      const uploadResponse = await fetch('/api/documents/convert', {
        method: 'POST',
        body: formData,
      })

      if (!uploadResponse.ok) throw new Error('Erreur upload')

      const uploadData = await uploadResponse.json()

      // Enregistrer l'upload dans la table mobile_uploads pour synchronisation
      const syncResponse = await fetch('/api/pairing/save-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          documentId: uploadData.document.id,
          fileName: file.name,
          fileType: file.type,
          fileUrl: uploadData.document.file_url,
        }),
      })

      if (syncResponse.ok) {
        // Afficher un message de succès
        alert('Document scanné et synchronisé avec succès !')
      }
    } catch (error) {
      console.error('Erreur synchronisation:', error)
      alert('Erreur lors de la synchronisation')
    }
  }

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-slate-600">Session invalide</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Scanner un document</h1>
          <p className="text-slate-600 text-sm">
            {isPaired
              ? 'Connecté - Scannez votre document'
              : 'Connexion en cours...'}
          </p>
        </div>

        {/* Composant d'upload mobile */}
        <DocumentUpload
          onUploadComplete={handleUploadComplete}
          maxSizeMB={25}
          acceptedFormats={['pdf', 'jpg', 'jpeg', 'png']}
        />

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200"
        >
          <h3 className="font-bold text-slate-900 mb-2 text-sm">💡 Astuce</h3>
          <p className="text-xs text-slate-600">
            Utilisez le bouton caméra pour scanner directement une facture ou un document.
            Le fichier sera automatiquement converti et synchronisé avec votre compte.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default function MobileScanPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
          <p className="text-slate-600">Chargement...</p>
        </div>
      </div>
    }>
      <MobileScanPageContent />
    </Suspense>
  )
}

