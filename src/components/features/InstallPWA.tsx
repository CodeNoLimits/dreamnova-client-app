'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Vérifier que window existe (SSR)
    if (typeof window === 'undefined') return

    // Vérifier si déjà installé
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    // Écouter l'événement beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      
      // Afficher le prompt après 3 secondes
      setTimeout(() => {
        setShowInstallPrompt(true)
      }, 3000)
    }

    if (window.addEventListener) {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

      // Vérifier si installé après installation
      const handleAppInstalled = () => {
        setIsInstalled(true)
        setShowInstallPrompt(false)
      }

      window.addEventListener('appinstalled', handleAppInstalled)

      return () => {
        if (window.removeEventListener) {
          window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
          window.removeEventListener('appinstalled', handleAppInstalled)
        }
      }
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    // Afficher le prompt d'installation
    await deferredPrompt.prompt()

    // Attendre la réponse de l'utilisateur
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      setShowInstallPrompt(false)
      setIsInstalled(true)
    }

    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    setShowInstallPrompt(false)
    // Ne plus afficher pendant cette session
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem('pwa-install-dismissed', 'true')
    }
  }

  // Ne pas afficher si déjà installé ou si dismissé
  if (isInstalled || !showInstallPrompt || !deferredPrompt) {
    return null
  }

  // Vérifier sessionStorage côté client uniquement
  if (typeof window !== 'undefined' && window.sessionStorage && sessionStorage.getItem('pwa-install-dismissed') === 'true') {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50"
      >
        <div className="bg-white rounded-xl shadow-2xl border border-slate-200 p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-400 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 mb-1">Installer DreamNova</h3>
              <p className="text-sm text-slate-600 mb-4">
                Installez l'application pour un accès rapide et une meilleure expérience.
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleInstallClick}
                  className="flex-1"
                >
                  Installer
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDismiss}
                >
                  Plus tard
                </Button>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

