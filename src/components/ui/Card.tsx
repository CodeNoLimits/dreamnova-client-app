import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { CardProps } from '@/types'

const Card: React.FC<CardProps> = ({ title, description, children, className, footer }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        'bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow duration-300',
        className
      )}
    >
      {(title || description) && (
        <div className="p-6 border-b border-slate-100">
          {title && (
            <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
          )}
          {description && (
            <p className="text-slate-600 text-sm">{description}</p>
          )}
        </div>
      )}
      <div className="p-6">{children}</div>
      {footer && (
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
          {footer}
        </div>
      )}
    </motion.div>
  )
}

export default Card
