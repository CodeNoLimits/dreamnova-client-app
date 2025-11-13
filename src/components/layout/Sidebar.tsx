'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface NavItem {
  label: string
  icon: string
  href: string
  badge?: number
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', icon: 'dashboard', href: '/dashboard' },
  { label: 'Mes Documents', icon: 'description', href: '/documents' },
  { label: 'Audits', icon: 'assessment', href: '/audit' },
  { label: 'Convertisseur', icon: 'transform', href: '/convertisseur' },
  { label: 'Tarifs', icon: 'credit_card', href: '/pricing' },
  { label: 'Formation', icon: 'school', href: '/formation' },
  { label: 'Réglementation', icon: 'gavel', href: '/reglementation' },
]

// Onglet développeur (uniquement mode testeur)
const DEV_NAV_ITEM: NavItem = {
  label: 'Développeur',
  icon: 'code',
  href: '/dev-tools',
}

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [user, setUser] = useState<any>(null)

  // Charger user au mount
  useEffect(() => {
    const loadUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    loadUser()
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-slate-900 text-white transition-all duration-300 z-50 flex flex-col ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Header avec logo */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h2 className="text-xl font-bold text-white">DreamNova</h2>
              <p className="text-xs text-slate-400">Compta Conforme</p>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            title={isCollapsed ? 'Expand' : 'Collapse'}
          >
            <span className="material-symbols-outlined text-slate-400">
              {isCollapsed ? 'menu' : 'menu_open'}
            </span>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <span className="material-symbols-outlined text-xl flex-shrink-0">
                    {item.icon}
                  </span>
                  {!isCollapsed && (
                    <>
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="px-2 py-0.5 bg-danger-500 text-white text-xs rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              </li>
            )
          })}

          {/* Onglet Développeur (uniquement mode testeur) */}
          {user?.email === 'alex@test.com' && (
            <>
              <li className="px-3 py-2">
                <div className="border-t border-slate-700"></div>
              </li>
              <li key={DEV_NAV_ITEM.href}>
                <Link
                  href={DEV_NAV_ITEM.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    pathname === DEV_NAV_ITEM.href || pathname.startsWith(DEV_NAV_ITEM.href + '/')
                      ? 'bg-yellow-600 text-white'
                      : 'text-yellow-400 hover:bg-slate-800 hover:text-yellow-300'
                  }`}
                  title={isCollapsed ? DEV_NAV_ITEM.label : undefined}
                >
                  <span className="material-symbols-outlined text-xl flex-shrink-0">
                    {DEV_NAV_ITEM.icon}
                  </span>
                  {!isCollapsed && (
                    <>
                      <span className="flex-1">{DEV_NAV_ITEM.label}</span>
                      <span className="px-2 py-0.5 bg-yellow-500 text-yellow-900 text-xs rounded-full font-bold">
                        DEV
                      </span>
                    </>
                  )}
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Footer avec user info */}
      <div className="border-t border-slate-700 p-4">
        {user && !isCollapsed && (
          <div className="mb-3 px-2">
            <p className="text-sm font-medium text-white truncate">{user.email}</p>
            <p className="text-xs text-slate-400">Compte actif</p>
          </div>
        )}

        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}
          title={isCollapsed ? 'Déconnexion' : undefined}
        >
          <span className="material-symbols-outlined text-xl">logout</span>
          {!isCollapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </aside>
  )
}
