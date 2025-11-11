import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SegmentedControlOption<T extends string> {
  value: T
  label: string
  icon?: React.ReactNode
}

interface SegmentedControlProps<T extends string> {
  options: SegmentedControlOption<T>[]
  value: T
  onChange: (value: T) => void
  name: string
  className?: string
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  name,
  className,
}: SegmentedControlProps<T>) {
  return (
    <div className={cn('grid grid-cols-2 gap-3', className)}>
      {options.map((option, index) => {
        const isSelected = value === option.value

        return (
          <motion.label
            key={option.value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={cn(
              'cursor-pointer rounded-xl border p-4 text-center transition-all duration-200',
              isSelected
                ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-500 shadow-md'
                : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300'
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={isSelected}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.icon && (
              <div className={cn(
                'mx-auto mb-2 w-8 h-8',
                isSelected ? 'text-primary-600' : 'text-slate-600'
              )}>
                {option.icon}
              </div>
            )}
            <span
              className={cn(
                'font-semibold text-sm',
                isSelected ? 'text-primary-700' : 'text-slate-700'
              )}
            >
              {option.label}
            </span>
          </motion.label>
        )
      })}
    </div>
  )
}

export default SegmentedControl
