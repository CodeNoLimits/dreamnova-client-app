'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function BetaBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-white py-3 px-6 relative z-50 shadow-lg"
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined animate-pulse">science</span>
              <span className="font-bold text-lg">VERSION BETA</span>
            </div>
            <span className="hidden sm:inline text-sm opacity-90">
              Application en cours de finalisation légale. Les mentions légales complètes seront ajoutées sous 7 jours.
            </span>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Fermer le bandeau"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
