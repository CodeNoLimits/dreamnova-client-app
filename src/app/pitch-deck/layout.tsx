import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DreamNova Pitch Deck | Investor Relations",
  description: "The First Spirit-Tech Venture Studio. Discover our integrated ecosystem: AI Consulting (Cash Engine), Ha-Mazon Logistics (Infrastructure), and Therapeutic AI (Mission). Seed Round opportunity.",
  keywords: ["Investor Relations", "Pitch Deck", "Venture Studio", "Spirit-Tech", "Seed Round", "Startup Investment", "DreamNova"],
  openGraph: {
    title: "DreamNova Pitch Deck | Investor Relations",
    description: "The First Spirit-Tech Venture Studio. Merging AI, Logistics, and Wisdom. Discover our integrated ecosystem and seed round opportunity.",
    type: "website",
    siteName: "DreamNova Nexus",
  },
  twitter: {
    card: "summary_large_image",
    title: "DreamNova Pitch Deck | Investor Relations",
    description: "The First Spirit-Tech Venture Studio. Merging AI, Logistics, and Wisdom.",
  },
};

export default function PitchDeckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
