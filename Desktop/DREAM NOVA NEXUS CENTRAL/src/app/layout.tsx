import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { Dock } from "@/components/ui/Dock";

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
    <html lang="en">
      <body className={`${inter.className} bg-[#05050A] text-white overflow-hidden`}>

        <LanguageProvider>
          {children}
          <Dock />
        </LanguageProvider>
      </body>
    </html >
  )
}
