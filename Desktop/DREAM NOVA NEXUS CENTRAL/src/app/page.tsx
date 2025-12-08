// ==========================================
// FILE: src/app/page.tsx
// ==========================================
// Import direct car les deux fichiers sont dans src/app/
'use client';

import { useState, useEffect } from 'react';
import VentureOS_Canvas from './Canvas';
import { AdminToolbar } from '@/components/admin/AdminToolbar';
import { useAdminStore } from '@/lib/store';

import { Dock } from "@/components/ui/Dock";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isAdmin } = useAdminStore();

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!mounted) return null;

  return (
    <main className="relative w-full h-screen overflow-hidden">
      {isAdmin && (
        <div className="absolute top-0 left-0 right-0 z-[60]">
          <AdminToolbar actions={[
            { label: 'System Status', onClick: () => alert('All Systems Operational') },
            { label: 'Deployments', href: 'https://vercel.com' }
          ]} />
        </div>
      )}

      {/* Strict Split: Canvas on Desktop, Stack on Mobile */}
      {isMobile ? (
        <MobileStackView />
      ) : (
        <VentureOS_Canvas />
      )}

      <Dock />
    </main>
  );
}

// Mobile Stack View Component
const MobileStackView = () => {
  return (
    <div className="w-full h-full overflow-y-auto bg-[#05050A] pb-32 pt-20 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-white tracking-tight">
          Venture Studio <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">OS</span>
        </h1>
        <p className="text-xs text-gray-400 uppercase tracking-widest mt-2">Mobile Command Center</p>
      </div>

      <div className="space-y-3">
        {/* We will reuse the list view logic from Canvas but simplified here if needed, 
                    or ideally we export ListView from Canvas.tsx. 
                    For now, let's render the Canvas component in 'list' mode prop if we modify Canvas.tsx,
                    BUT the requirement says "Canvas infini interdit sur mobile".
                    So we should force the list view.
                */}
        <VentureOS_Canvas forceList={true} />
      </div>
    </div>
  );
};
