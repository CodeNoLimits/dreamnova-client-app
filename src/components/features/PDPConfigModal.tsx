'use client'

import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

const PDP_OPTIONS = [
  {
    id: 'pennylane',
    name: 'Pennylane',
    description: 'Comptabilité moderne et intuitive',
    icon: '💰',
  },
  {
    id: 'qonto',
    name: 'Qonto',
    description: 'Banque en ligne pour entreprises',
    icon: '🏦',
  },
  {
    id: 'sellsy',
    name: 'Sellsy',
    description: 'CRM et facturation tout-en-un',
    icon: '📊',
  },
  {
    id: 'tiime',
    name: 'Tiime',
    description: 'Gestion comptable simplifiée',
    icon: '⏰',
  },
  {
    id: 'chorus-pro',
    name: 'Chorus Pro',
    description: 'Plateforme officielle facturation publique',
    icon: '🏛️',
  },
  {
    id: 'sage',
    name: 'Sage',
    description: 'Solution comptable intégrée',
    icon: '📈',
  },
]

export default function PDPConfigModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [selectedPDP, setSelectedPDP] = useState<string | null>(null)
  const [apiKey, setApiKey] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleConnect = async () => {
    if (!selectedPDP || !apiKey.trim()) {
      setError('Veuillez sélectionner un PDP et entrer votre clé API')
      return
    }

    setIsConnecting(true)
    setError(null)

    try {
      const response = await fetch('/api/pdp/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pdp: selectedPDP, apiKey: apiKey.trim() }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || result.details || 'Erreur lors de la connexion')
      }

      setSuccess(true)
      setTimeout(() => {
        onClose()
        // Recharger la page pour mettre à jour la checklist
        window.location.reload()
      }, 1500)
    } catch (err: any) {
      console.error('Erreur connexion PDP:', err)
      setError(err.message || 'Erreur lors de la connexion. Veuillez réessayer.')
    } finally {
      setIsConnecting(false)
    }
  }

  const handleClose = () => {
    setSelectedPDP(null)
    setApiKey('')
    setError(null)
    setSuccess(false)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Configurer votre PDP" size="lg">
      <div className="space-y-6">
        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-success-600 text-4xl">check_circle</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Connexion réussie !</h3>
            <p className="text-slate-600">Votre PDP a été configuré avec succès.</p>
          </div>
        ) : (
          <>
            <p className="text-slate-600">
              Sélectionnez votre Plateforme de Dématérialisation Partenaire et entrez votre clé API.
            </p>

            {error && (
              <div className="p-4 bg-danger-50 border border-danger-200 rounded-lg text-danger-700 text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              {PDP_OPTIONS.map((pdp) => (
                <div
                  key={pdp.id}
                  onClick={() => {
                    setSelectedPDP(pdp.id)
                    setError(null)
                  }}
                  className="cursor-pointer"
                >
                  <Card
                    className={`p-4 transition-all ${
                      selectedPDP === pdp.id
                        ? 'border-2 border-primary-600 bg-primary-50'
                        : 'border-2 border-slate-200 hover:border-primary-300'
                    }`}
                  >
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-4xl mb-2">{pdp.icon}</div>
                    <h3 className="font-semibold text-slate-900">{pdp.name}</h3>
                    <p className="text-xs text-slate-600 text-center">{pdp.description}</p>
                    {selectedPDP === pdp.id && (
                      <span className="material-symbols-outlined text-primary-600 text-sm mt-1">
                        check_circle
                      </span>
                    )}
                  </div>
                  </Card>
                </div>
              ))}
            </div>

            {selectedPDP && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-900">
                  Clé API {PDP_OPTIONS.find((p) => p.id === selectedPDP)?.name}
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => {
                    setApiKey(e.target.value)
                    setError(null)
                  }}
                  placeholder="Entrez votre clé API"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <p className="text-xs text-slate-500">
                  Votre clé API est stockée de manière sécurisée et ne sera jamais partagée.
                </p>
              </div>
            )}

            <div className="flex gap-3 justify-end pt-4 border-t border-slate-200">
              <Button variant="ghost" onClick={handleClose} disabled={isConnecting}>
                Annuler
              </Button>
              <Button
                variant="primary"
                onClick={handleConnect}
                disabled={!selectedPDP || !apiKey.trim() || isConnecting}
                isLoading={isConnecting}
              >
                {isConnecting ? 'Connexion...' : 'Connecter'}
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}

