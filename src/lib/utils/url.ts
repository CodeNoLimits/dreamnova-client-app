/**
 * Helper pour obtenir l'URL de base de l'application
 * Fonctionne en développement (localhost) et en production (Vercel)
 */
export function getBaseUrl(): string {
  // Priorité 1: Variable d'environnement explicite
  if (process.env.NEXT_PUBLIC_URL) {
    return process.env.NEXT_PUBLIC_URL
  }

  // Priorité 2: Côté client (browser)
  if (typeof window !== 'undefined') {
    return window.location.origin
  }

  // Priorité 3: Vercel URL (côté serveur)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  // Priorité 4: Vercel Preview URL
  if (process.env.VERCEL) {
    return `https://${process.env.VERCEL_URL || 'localhost:3000'}`
  }

  // Fallback: développement local
  return 'http://localhost:3000'
}

