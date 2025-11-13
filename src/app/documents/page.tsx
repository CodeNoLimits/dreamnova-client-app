'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/client'

interface Document {
  id: string
  file_name: string
  file_type: string
  file_size: number
  file_url: string
  converted_format: string | null
  status: string
  created_at: string
}

export default function DocumentsPage() {
  const router = useRouter()
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'pdf' | 'image'>('all')

  useEffect(() => {
    checkAuthAndLoadDocuments()
  }, [])

  const checkAuthAndLoadDocuments = async () => {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      router.push('/login')
      return
    }

    await loadDocuments(session.user.id)
  }

  const loadDocuments = async (userId: string) => {
    setLoading(true)
    const supabase = createClient()

    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erreur chargement documents:', error)
    } else {
      setDocuments(data || [])
    }

    setLoading(false)
  }

  const handleDelete = async (docId: string, fileName: string) => {
    if (!confirm(`Supprimer "${fileName}" ?`)) return

    const supabase = createClient()

    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', docId)

    if (error) {
      alert('Erreur suppression: ' + error.message)
    } else {
      setDocuments(documents.filter((d) => d.id !== docId))
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.file_name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType =
      filterType === 'all' ||
      (filterType === 'pdf' && doc.file_type === 'application/pdf') ||
      (filterType === 'image' && doc.file_type.startsWith('image/'))

    return matchesSearch && matchesType
  })

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-600">Chargement des documents...</p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">📄 Mes Documents</h1>
          <p className="text-slate-600">
            {documents.length} document{documents.length !== 1 ? 's' : ''} au total
          </p>
        </div>

        {/* Actions + Recherche */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Recherche */}
            <div className="flex-1 w-full md:w-auto">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Rechercher un document..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Filtres */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterType === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Tous
              </button>
              <button
                onClick={() => setFilterType('pdf')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterType === 'pdf'
                    ? 'bg-primary-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                PDF
              </button>
              <button
                onClick={() => setFilterType('image')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterType === 'image'
                    ? 'bg-primary-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Images
              </button>
            </div>

            {/* Bouton upload */}
            <Button variant="primary" onClick={() => router.push('/convertisseur')}>
              <span className="material-symbols-outlined mr-2">upload_file</span>
              Nouveau document
            </Button>
          </div>
        </Card>

        {/* Liste documents */}
        {filteredDocuments.length === 0 ? (
          <Card className="p-12 text-center">
            <span className="material-symbols-outlined text-slate-300 text-6xl mb-4">
              folder_open
            </span>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {searchQuery || filterType !== 'all' ? 'Aucun résultat' : 'Aucun document'}
            </h3>
            <p className="text-slate-600 mb-6">
              {searchQuery || filterType !== 'all'
                ? 'Essayez de modifier vos filtres ou votre recherche'
                : 'Commencez par uploader votre premier document'}
            </p>
            {!searchQuery && filterType === 'all' && (
              <Button variant="primary" onClick={() => router.push('/convertisseur')}>
                <span className="material-symbols-outlined mr-2">upload_file</span>
                Upload un document
              </Button>
            )}
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredDocuments.map((doc, index) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    {/* Icône */}
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        doc.file_type === 'application/pdf' ? 'bg-red-100' : 'bg-blue-100'
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined text-2xl ${
                          doc.file_type === 'application/pdf' ? 'text-red-600' : 'text-blue-600'
                        }`}
                      >
                        {doc.file_type === 'application/pdf' ? 'picture_as_pdf' : 'image'}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 truncate">{doc.file_name}</h3>
                      <div className="flex items-center gap-3 mt-1 text-sm text-slate-600">
                        <span>{formatFileSize(doc.file_size)}</span>
                        <span>•</span>
                        <span>{new Date(doc.created_at).toLocaleDateString('fr-FR')}</span>
                        {doc.converted_format && (
                          <>
                            <span>•</span>
                            <span className="px-2 py-0.5 bg-success-100 text-success-700 rounded-full text-xs font-medium">
                              {doc.converted_format.toUpperCase()}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <a
                        href={doc.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Télécharger"
                      >
                        <span className="material-symbols-outlined text-slate-600">download</span>
                      </a>
                      <button
                        onClick={() => handleDelete(doc.id, doc.file_name)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Supprimer"
                      >
                        <span className="material-symbols-outlined text-red-600">delete</span>
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
