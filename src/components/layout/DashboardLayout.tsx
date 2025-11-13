'use client'

import Sidebar from './Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      {/* Main content avec padding pour la sidebar */}
      <main className="ml-64 min-h-screen transition-all duration-300">
        {children}
      </main>
    </div>
  )
}
