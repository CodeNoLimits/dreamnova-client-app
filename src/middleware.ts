import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Protected routes that require authentication
const PROTECTED_ROUTES = ['/admin', '/api/admin', '/dashboard']
const PUBLIC_ROUTES = ['/', '/login', '/api/auth']

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Check if route is protected
    const isProtectedRoute = PROTECTED_ROUTES.some(route =>
        pathname.startsWith(route)
    )

    if (isProtectedRoute) {
        // Check for auth token (supports multiple auth methods)
        const authToken = request.cookies.get('auth-token')?.value
            || request.cookies.get('next-auth.session-token')?.value
            || request.cookies.get('__Secure-next-auth.session-token')?.value

        // Check Authorization header for API routes
        const authHeader = request.headers.get('authorization')

        if (!authToken && !authHeader) {
            // Redirect to login for page routes
            if (!pathname.startsWith('/api/')) {
                const loginUrl = new URL('/login', request.url)
                loginUrl.searchParams.set('callbackUrl', pathname)
                return NextResponse.redirect(loginUrl)
            }

            // Return 401 for API routes
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            )
        }
    }

    // Security headers for all responses
    const response = NextResponse.next()

    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

    return response
}

export const config = {
    matcher: [
        // Match all routes except static files and _next
        '/((?!_next/static|_next/image|favicon.ico|public/).*)',
    ],
}
