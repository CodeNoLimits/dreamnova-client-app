'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import DocumentUpload from '@/components/features/DocumentUpload'
import { createClient } from '@/lib/supabase/client'

interface ConversionStats {
  thisMonth: number
  total: number
  byFormat: Record<string, number>
}

interface ConversionLimit {
  allowed: boolean
  remaining: number
  total: number
  isPaid: boolean
}

export default function ConvertisseurPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<ConversionStats | null>(null)
  const [limit, setLimit] = useState<ConversionLimit | null>(null)
  const [documents, setDocuments] = useState<any[]>([])

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      router.push('/login')
      return
    }

    setUser(session.user)
    await loadData(session.user.id)
    setLoading(false)
  }

  const loadData = async (userId: string) => {
    const supabase = createClient()

    // Charger stats
    try {
      const response = await fetch('/api/documents/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data.stats)
        setLimit(data.limit)
      }
    } catch (error) {
      console.error('Erreur chargement stats:', error)
    }

    // Charger documents
    const { data: docs } = await supabase
      .from('documents')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(10)

    if (docs) {
      setDocuments(docs)
    }
  }

  const handleUploadComplete = async () => {
    if (user) {
      await loadData(user.id)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Convertisseur de Documents
              </h1>
              <p className="text-slate-600">
                Convertissez vos PDF et images aux formats conformes pour la facturation électronique 2026
              </p>
            </div>
            <Button
              variant="ghost"
              onClick={() => router.push('/dashboard')}
              className="flex items-center gap-2"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Retour
            </Button>
          </div>

          {/* Stats et limites */}
          {(stats || limit) && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {limit && (
                <Card className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary-600">
                        {limit.isPaid ? 'all_inclusive' : 'counter_' + limit.remaining}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600">Disponibles ce mois</div>
                      <div className="text-2xl font-bold text-slate-900">
                        {limit.isPaid ? 'Illimité' : `${limit.remaining}/${limit.total}`}
                      </div>
                    </div>
                  </div>
                  {!limit.isPaid && limit.remaining === 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-200">
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => router.push('/pricing')}
                        className="w-full"
                      >
                        Passer à un plan payant
                      </Button>
                    </div>
                  )}
                </Card>
              )}

              {stats && (
                <>
                  <Card className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-success-600">description</span>
                      </div>
                      <div>
                        <div className="text-sm text-slate-600">Ce mois</div>
                        <div className="text-2xl font-bold text-slate-900">{stats.thisMonth}</div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-blue-600">cloud_done</span>
                      </div>
                      <div>
                        <div className="text-sm text-slate-600">Total</div>
                        <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-amber-600">verified</span>
                      </div>
                      <div>
                        <div className="text-sm text-slate-600">Factur-X</div>
                        <div className="text-2xl font-bold text-slate-900">
                          {stats.byFormat['factur-x'] || 0}
                        </div>
                      </div>
                    </div>
                  </Card>
                </>
              )}
            </div>
          )}
        </div>

        {/* Zone upload */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <DocumentUpload onUploadComplete={handleUploadComplete} />

            {/* Formats supportés */}
            <Card className="p-6 mt-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Formats de sortie conformes 2026</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary-600 text-xl">picture_as_pdf</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Factur-X</h4>
                    <p className="text-xs text-slate-600">PDF/A-3 + XML EN 16931</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-success-100 text-success-700 text-xs rounded-full">
                      Recommandé
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-blue-600 text-xl">code</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">UBL</h4>
                    <p className="text-xs text-slate-600">Universal Business Language</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                      Compatible
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-purple-600 text-xl">data_object</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">CII</h4>
                    <p className="text-xs text-slate-600">Cross Industry Invoice</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">
                      Supporté
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Documents récents */}
          <div>
            <Card className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-600">history</span>
                Documents récents
              </h3>

              {documents.length === 0 ? (
                <div className="text-center py-8">
                  <span className="material-symbols-outlined text-slate-300 text-5xl mb-2">folder_open</span>
                  <p className="text-sm text-slate-500">Aucun document</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-slate-400 text-lg mt-0.5">
                          {doc.file_type.startsWith('image/') ? 'image' : 'description'}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 truncate">
                            {doc.file_name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-slate-500">
                              {new Date(doc.created_at).toLocaleDateString('fr-FR')}
                            </span>
                            {doc.converted_format && (
                              <span className="px-2 py-0.5 bg-success-100 text-success-700 text-xs rounded-full">
                                {doc.converted_format.toUpperCase()}
                              </span>
                            )}
                          </div>
                        </div>
                        {doc.file_url && (
                          <a
                            href={doc.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:text-primary-700"
                          >
                            <span className="material-symbols-outlined text-lg">download</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
