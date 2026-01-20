import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Breslev Books | AI-Powered Wisdom Library",
  description: "A living library with 400 years of wisdom accessible in seconds. The 'Google of the Soul' for the generation seeking meaning. AI RAG search through Rabbi Nachman's teachings.",
  keywords: ["Breslev", "Rabbi Nachman", "Jewish Wisdom", "Torah", "AI RAG", "Spiritual Library", "Likutey Moharan", "Hassidic Books"],
  openGraph: {
    title: "Breslev Books | AI-Powered Wisdom Library",
    description: "A living library with 400 years of wisdom accessible in seconds. The 'Google of the Soul' for the generation seeking meaning.",
    type: "website",
    siteName: "DreamNova Nexus",
  },
  twitter: {
    card: "summary_large_image",
    title: "Breslev Books | AI-Powered Wisdom Library",
    description: "A living library with 400 years of wisdom accessible in seconds. AI RAG search through Rabbi Nachman's teachings.",
  },
};

export default function BreslevBooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
