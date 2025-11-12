'use client'

import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/client'

interface DocumentUploadProps {
  onUploadComplete?: (file: File, convertedFormat?: string) => void
  maxSizeMB?: number
  acceptedFormats?: string[]
}

export default function DocumentUpload({
  onUploadComplete,
  maxSizeMB = 25,
  acceptedFormats = ['pdf', 'docx', 'jpg', 'jpeg', 'png'],
}: DocumentUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const validateFile = (file: File): boolean => {
    // Vérifier la taille
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`Le fichier est trop volumineux. Maximum: ${maxSizeMB}MB`)
      return false
    }

    // Vérifier le format
    const extension = file.name.split('.').pop()?.toLowerCase()
    if (!extension || !acceptedFormats.includes(extension)) {
      setError(`Format non supporté. Formats acceptés: ${acceptedFormats.join(', ')}`)
      return false
    }

    return true
  }

  const processFile = async (file: File) => {
    setIsUploading(true)
    setError(null)
    setUploadProgress(0)

    try {
      // Simuler la progression
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      // Créer un preview pour les images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setPreview(e.target?.result as string)
        }
        reader.readAsDataURL(file)
      }

      // ✅ Appeler l'API de conversion vers Factur-X (RÉEL)
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch('/api/documents/convert', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur lors de la conversion')
      }

      const result = await response.json()
      
      clearInterval(progressInterval)
      setUploadProgress(100)

      // ✅ Le document est déjà sauvegardé dans Supabase par l'API
      // L'API a fait :
      // - Upload vers Supabase Storage
      // - Conversion Factur-X (si PDF)
      // - Insertion dans la table documents
      
      if (onUploadComplete) {
        onUploadComplete(file, result.document?.converted_format || null)
      }
      
      // Afficher un message de succès
      setError(null)

      // Reset après 2 secondes
      setTimeout(() => {
        setUploadProgress(0)
        setIsUploading(false)
        setPreview(null)
      }, 2000)
    } catch (err) {
      console.error('Erreur upload:', err)
      setError('Erreur lors du téléchargement. Veuillez réessayer.')
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (!file) return

    if (validateFile(file)) {
      await processFile(file)
    }
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (validateFile(file)) {
      await processFile(file)
    }
  }

  const handleCameraCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (validateFile(file)) {
      await processFile(file)
    }
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  const openCamera = () => {
    cameraInputRef.current?.click()
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Titre */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Ajouter un document</h3>
          <p className="text-slate-600 text-sm">
            Scannez ou téléchargez vos factures pour conversion automatique
          </p>
        </div>

        {/* Zone de caméra (mobile) */}
        <div className="relative flex items-center justify-center bg-gray-900 rounded-xl p-4 aspect-video flex-col gap-4">
          <div className="absolute inset-4 border-2 border-dashed border-primary-400 rounded-lg flex items-center justify-center">
            <p className="text-white text-sm font-semibold bg-black/40 px-3 py-1 rounded-full">
              Alignez le document dans le cadre
            </p>
          </div>
          <div className="absolute top-4 right-4 flex flex-col gap-4">
            <button
              type="button"
              className="flex shrink-0 items-center justify-center rounded-full size-10 bg-black/40 text-white hover:bg-black/60 transition-colors"
              title="Flash"
            >
              <span className="material-symbols-outlined text-xl">flash_on</span>
            </button>
            <button
              type="button"
              className="flex shrink-0 items-center justify-center rounded-full size-10 bg-black/40 text-white hover:bg-black/60 transition-colors"
              title="Inverser caméra"
            >
              <span className="material-symbols-outlined text-xl">flip_camera_android</span>
            </button>
          </div>
        </div>

        {/* Contrôles caméra */}
        <div className="flex items-center justify-center gap-6 -mt-14 relative z-10">
          <div className="flex shrink-0 items-center justify-center rounded-full size-10"></div>
          <button
            type="button"
            onClick={openCamera}
            className="flex shrink-0 items-center justify-center rounded-full size-20 bg-white text-primary-600 shadow-lg border-4 border-primary-600 hover:bg-primary-50 transition-colors"
            title="Prendre une photo"
          >
            <span className="material-symbols-outlined !text-4xl">camera</span>
          </button>
          <button
            type="button"
            onClick={openFileDialog}
            className="flex shrink-0 items-center justify-center rounded-full size-10 bg-white/80 backdrop-blur-sm text-primary-600 shadow-md hover:bg-white transition-colors"
            title="Choisir depuis la galerie"
          >
            <span className="material-symbols-outlined text-xl">add_a_photo</span>
          </button>
        </div>

        {/* Zone de drop */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex flex-col items-center gap-6 rounded-lg border-2 border-dashed transition-colors ${
            isDragging
              ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
              : 'border-primary-300 dark:border-primary-700 bg-slate-50 dark:bg-slate-800/50'
          } px-6 py-10`}
        >
          <div className="flex max-w-[480px] flex-col items-center gap-2">
            <p className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight text-center">
              Ou téléchargez depuis votre appareil
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-sm font-normal leading-normal text-center">
              Formats supportés: {acceptedFormats.map(f => f.toUpperCase()).join(', ')}. Maximum {maxSizeMB}MB.
            </p>
          </div>
          <Button onClick={openFileDialog} className="w-full max-w-[480px]">
            <span className="truncate">Parcourir les fichiers</span>
          </Button>
        </div>

        {/* Inputs cachés */}
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFormats.map(f => `.${f}`).join(',')}
          onChange={handleFileSelect}
          className="hidden"
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleCameraCapture}
          className="hidden"
        />

        {/* Preview */}
        {preview && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-lg overflow-hidden border-2 border-primary-200"
          >
            <img src={preview} alt="Preview" className="w-full h-auto max-h-64 object-contain" />
            <button
              type="button"
              onClick={() => setPreview(null)}
              className="absolute top-2 right-2 bg-danger-600 text-white rounded-full p-2 hover:bg-danger-700 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </motion.div>
        )}

        {/* Barre de progression */}
        {isUploading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-3 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg"
          >
            <div className="flex gap-6 justify-between items-center">
              <p className="text-slate-900 dark:text-slate-100 text-base font-medium leading-normal">
                Téléchargement du document...
              </p>
              <p className="text-primary-600 text-sm font-bold leading-normal">{uploadProgress}%</p>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
              <motion.div
                className="bg-primary-600 h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            {uploadProgress === 100 && (
              <p className="text-sm text-success-600 font-medium">
                ✓ Document converti en Factur-X avec succès
              </p>
            )}
          </motion.div>
        )}

        {/* Message d'erreur */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-lg"
          >
            <p className="text-danger-700 dark:text-danger-400 text-sm font-medium">{error}</p>
          </motion.div>
        )}
      </div>
    </Card>
  )
}

