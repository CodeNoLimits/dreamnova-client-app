'use client'

import React, { useState, useEffect, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface QRCodePairingProps {
  onPaired?: (sessionId: string) => void
  onUploadComplete?: (file: File) => void
}

export default function QRCodePairing({ onPaired, onUploadComplete }: QRCodePairingProps) {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [isPaired, setIsPaired] = useState(false)
  const [isPolling, setIsPolling] = useState(false)
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Générer une session de pairing
  const generateSession = async () => {
    try {
      const response = await fetch('/api/pairing/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) throw new Error('Erreur lors de la création de la session')

      const data = await response.json()
      setSessionId(data.sessionId)
      
      // Générer l'URL du QR code
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
      const pairingUrl = `${baseUrl}/mobile-scan?session=${data.sessionId}`
      setQrCode(pairingUrl)
      setIsPolling(true)

      // Démarrer le polling pour vérifier si le mobile est connecté
      startPolling(data.sessionId)
    } catch (error) {
      console.error('Erreur génération session:', error)
    }
  }

  // Polling pour vérifier l'état de la session
  const startPolling = (session: string) => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current)
    }

    pollingIntervalRef.current = setInterval(async () => {
      try {
        const response = await fetch(`/api/pairing/check-session?session=${session}`)
        const data = await response.json()

        if (data.isPaired) {
          setIsPaired(true)
          setIsPolling(false)
          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current)
          }
          if (onPaired) {
            onPaired(session)
          }

          // Écouter les nouveaux uploads
          startListeningForUploads(session)
        }
      } catch (error) {
        console.error('Erreur polling:', error)
      }
    }, 2000) // Vérifier toutes les 2 secondes
  }

  // Écouter les uploads depuis le mobile
  const startListeningForUploads = (session: string) => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current)
    }

    pollingIntervalRef.current = setInterval(async () => {
      try {
        const response = await fetch(`/api/pairing/get-uploads?session=${session}`)
        const data = await response.json()

        if (data.uploads && data.uploads.length > 0) {
          // Traiter les nouveaux uploads
          data.uploads.forEach((upload: any) => {
            if (onUploadComplete && upload.file) {
              // Convertir l'upload en File object si nécessaire
              fetch(upload.fileUrl)
                .then(res => res.blob())
                .then(blob => {
                  const file = new File([blob], upload.fileName, { type: upload.fileType })
                  onUploadComplete(file)
                })
            }
          })
        }
      } catch (error) {
        console.error('Erreur écoute uploads:', error)
      }
    }, 3000) // Vérifier toutes les 3 secondes
  }

  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current)
      }
    }
  }, [])

  if (isPaired) {
    return (
      <Card className="p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-success-600 text-4xl">check_circle</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">Téléphone connecté</h3>
          <p className="text-slate-600">
            Votre téléphone est connecté. Vous pouvez maintenant scanner des documents depuis votre téléphone.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
            <span className="material-symbols-outlined text-lg animate-pulse">phone_android</span>
            <span>En attente de scan...</span>
          </div>
        </motion.div>
      </Card>
    )
  }

  if (!qrCode) {
    return (
      <Card className="p-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-primary-600 text-4xl">qr_code_scanner</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">Scanner depuis votre téléphone</h3>
          <p className="text-slate-600">
            Générez un QR code pour connecter votre téléphone et scanner des documents directement depuis votre appareil mobile.
          </p>
          <Button onClick={generateSession} size="lg" className="mt-4">
            <span className="material-symbols-outlined mr-2">qr_code</span>
            Générer le QR code
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="text-center space-y-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Scannez avec votre téléphone</h3>
          <p className="text-slate-600 text-sm">
            Ouvrez l'appareil photo de votre téléphone et scannez ce QR code
          </p>
        </div>

        {/* QR Code */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex justify-center p-6 bg-white rounded-xl border-2 border-primary-200"
        >
          <QRCodeSVG
            value={qrCode}
            size={256}
            level="H"
            includeMargin={true}
            fgColor="#6366F1"
            bgColor="#FFFFFF"
          />
        </motion.div>

        {/* Instructions */}
        <div className="space-y-2 text-sm text-slate-600">
          <div className="flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-lg">phone_android</span>
            <span>1. Ouvrez l'appareil photo de votre téléphone</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-lg">qr_code_scanner</span>
            <span>2. Scannez ce QR code</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-lg">camera</span>
            <span>3. Autorisez l'accès à la caméra</span>
          </div>
        </div>

        {/* État de connexion */}
        {isPolling && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-2 text-primary-600"
          >
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
            <span className="text-sm font-medium">En attente de connexion...</span>
          </motion.div>
        )}

        <Button
          variant="ghost"
          onClick={() => {
            setQrCode(null)
            setSessionId(null)
            setIsPaired(false)
            setIsPolling(false)
            if (pollingIntervalRef.current) {
              clearInterval(pollingIntervalRef.current)
            }
          }}
          size="sm"
        >
          Annuler
        </Button>
      </div>
    </Card>
  )
}

