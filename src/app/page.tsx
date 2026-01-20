// ==========================================
// FILE: src/app/page.tsx
// ==========================================
'use client';

import { useState, useEffect } from 'react';
import VentureOS_Canvas from './Canvas';
import { AdminToolbar } from '@/components/admin/AdminToolbar';
import { useAdminStore } from '@/lib/store';
import { Dock } from "@/components/ui/Dock";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { isAdmin } = useAdminStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="relative w-full min-h-screen bg-[#05050A]">
      {isAdmin && (
        <div className="absolute top-0 left-0 right-0 z-[60]">
          <AdminToolbar actions={[
            { label: 'System Status', onClick: () => alert('All Systems Operational') },
            { label: 'Deployments', href: 'https://vercel.com' }
          ]} />
        </div>
      )}

      {/* Canvas handles its own mobile/desktop state */}
      <VentureOS_Canvas />

      <Dock />
    </main>
  );
}
