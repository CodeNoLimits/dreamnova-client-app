'use client';

import React from 'react';
import VentureOS_Canvas from './Canvas';
import { useAdminStore } from '@/lib/store';
import AdminToolbar from '@/components/admin/AdminToolbar';
import AdminModule from '@/components/modules/AdminModule';
import ConsultModule from '@/components/modules/ConsultModule';
import LeadsModule from '@/components/modules/LeadsModule';
import DNBCModule from '@/components/modules/DNBCModule';
import SocialSpiritModule from '@/components/modules/SocialSpiritModule';

export default function Home() {
  const { isAdmin } = useAdminStore();

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* ADMIN OVERLAY */}
      {isAdmin && (
        <div className="fixed top-0 left-0 w-full z-[100]">
          <AdminToolbar />
          <div className="p-4 bg-black/90 backdrop-blur-xl border-b border-green-500/30">
            <AdminModule />
          </div>
        </div>
      )}

      {/* DESKTOP: INFINITE CANVAS */}
      <div className="hidden md:block h-screen w-screen">
        <VentureOS_Canvas />
      </div>

      {/* MOBILE: STACK VIEW */}
      <div className="md:hidden flex flex-col space-y-20 pb-32 px-4 pt-20">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black tracking-tighter mb-2">DREAMNOVA</h1>
          <p className="text-gray-500 text-sm uppercase tracking-widest">Nexus Central OS</p>
        </div>

        {/* MODULE 1: CONSULT */}
        <section id="consult">
          <ConsultModule />
        </section>

        {/* MODULE 2: LEADS (HA-MAZON) */}
        <section id="leads">
          <LeadsModule />
        </section>

        {/* MODULE 3: DNBC (GLOBAL) */}
        <section id="dnbc">
          <DNBCModule />
        </section>

        {/* MODULE 4: SOCIAL SPIRIT (TERA/MUSIC) */}
        <section id="social">
          <SocialSpiritModule />
        </section>

      </div>
    </main>
  );
}
