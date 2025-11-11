import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-cal',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'DreamNova - Facturation Électronique 2026',
  description: 'Plateforme de conformité et facturation électronique pour les entreprises françaises. Préparez-vous aux obligations 2026.',
  keywords: ['facturation électronique', 'conformité', 'e-invoicing', 'PPF', 'PDP', '2026'],
  authors: [{ name: 'DreamNova' }],
  openGraph: {
    title: 'DreamNova - Facturation Électronique 2026',
    description: 'Plateforme de conformité et facturation électronique pour les entreprises françaises.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
