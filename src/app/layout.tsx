import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DreamNova Nexus | Spirit-Tech Venture Studio",
  description: "The First Spirit-Tech Venture Studio. Merging AI, Logistics, and Wisdom. Build your dreams with DreamNova - AI Consulting, Therapeutic AI, Distributed Logistics, and Sacred Tech.",
  keywords: ["DreamNova", "Venture Studio", "Spirit-Tech", "AI Consulting", "Therapeutic AI", "Ha-Mazon", "Breslev", "Startup"],
  authors: [{ name: "DreamNova Team" }],
  openGraph: {
    title: "DreamNova Nexus | Spirit-Tech Venture Studio",
    description: "The First Spirit-Tech Venture Studio. Merging AI, Logistics, and Wisdom.",
    type: "website",
    siteName: "DreamNova Nexus",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "DreamNova Nexus | Spirit-Tech Venture Studio",
    description: "The First Spirit-Tech Venture Studio. Merging AI, Logistics, and Wisdom.",
  },
  robots: {
    index: true,
    follow: true,
  },
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#05050A] text-white`} suppressHydrationWarning>

        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html >
  )
}
