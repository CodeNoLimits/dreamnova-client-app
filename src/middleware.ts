import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, {
              ...options,
              // CRITIQUE: Augmenter la durée de vie des cookies
              maxAge: options?.maxAge || 60 * 60 * 24 * 30, // 30 jours au lieu de 7
              sameSite: 'lax', // Toujours 'lax' pour la persistance
              secure: process.env.NODE_ENV === 'production',
              httpOnly: options?.httpOnly !== false,
              path: '/', // CRITIQUE: Cookie accessible partout
            })
          )
        },
      },
    }
  )

  // CRITIQUE: Rafraîchir la session à chaque requête
  const { data: { user } } = await supabase.auth.getUser()

  // Si l'utilisateur est connecté, s'assurer que la session est valide
  if (user) {
    // Vérifier que les cookies de session sont bien présents
    const sessionCookie = request.cookies.get('sb-access-token')
    if (!sessionCookie) {
      // Si pas de cookie, essayer de rafraîchir la session
      await supabase.auth.refreshSession()
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

