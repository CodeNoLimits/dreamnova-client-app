import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DreamNova Nexus",
  description: "Venture Studio OS",
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
