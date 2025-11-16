import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format currency to EUR
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format percentage
 */
export function formatPercentage(value: number): string {
  return `${value}%`
}

/**
 * Calculate deadline from today
 */
export function calculateDeadline(targetDate: Date): {
  days: number
  months: number
  years: number
} {
  const today = new Date()
  const diffTime = targetDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return {
    days: diffDays,
    months: Math.floor(diffDays / 30),
    years: Math.floor(diffDays / 365),
  }
}

/**
 * Get risk level color
 */
export function getRiskColor(percentage: number): string {
  if (percentage < 30) return 'text-success-600'
  if (percentage < 60) return 'text-warning-600'
  return 'text-danger-600'
}

/**
 * Get risk level background
 */
export function getRiskBgColor(percentage: number): string {
  if (percentage < 30) return 'bg-success-50'
  if (percentage < 60) return 'bg-warning-50'
  return 'bg-danger-50'
}
