import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const calSans = localFont({
  src: '../fonts/CalSans-SemiBold.woff2',
  variable: '--font-cal',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
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
    <html lang="fr" className={`${inter.variable} ${calSans.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
