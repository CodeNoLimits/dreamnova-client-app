import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DreamNova Consult | AI Agency & Business Velocity",
  description: "Scale your business at light speed. AI Automation, Growth Hacking, and Domination Strategy. We don't sell time, we sell velocity. Get your free AI audit today.",
  keywords: ["AI Consulting", "Business Automation", "Growth Hacking", "AI Agents", "Digital Transformation", "DreamNova Consult"],
  openGraph: {
    title: "DreamNova Consult | AI Agency & Business Velocity",
    description: "Scale your business at light speed. AI Automation, Growth Hacking, and Domination Strategy. We don't sell time, we sell velocity.",
    type: "website",
    siteName: "DreamNova Nexus",
  },
  twitter: {
    card: "summary_large_image",
    title: "DreamNova Consult | AI Agency & Business Velocity",
    description: "Scale your business at light speed. AI Automation, Growth Hacking, and Domination Strategy.",
  },
};

export default function DreamNovaConsultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
