import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          // ✅ Vérifier que nous sommes côté client
          if (typeof document === 'undefined') return []

          return document.cookie.split('; ').map(cookie => {
            const [name, ...rest] = cookie.split('=')
            return { name, value: rest.join('=') }
          })
        },
        setAll(cookiesToSet) {
          // ✅ Vérifier que nous sommes côté client
          if (typeof document === 'undefined') return

          cookiesToSet.forEach(({ name, value, options }) => {
            // CRITIQUE: S'assurer que les cookies sont persistants
            const cookieString = `${name}=${value}; path=/; max-age=${options?.maxAge || 60 * 60 * 24 * 30}; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
            document.cookie = cookieString
          })
        },
      },
    }
  )
}

