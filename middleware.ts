import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const publicPages = ['/signup', '/login']
const baseRoutes = ['/', '/en', '/ar']

const intlMiddleware = createMiddleware(routing)

const authMiddleware = withAuth((req) => intlMiddleware(req), {
  callbacks: {
    authorized: ({ token }) => token != null,
  },
  pages: {
    signIn: '/login',
  },
})

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = new RegExp(
    `^(/(${routing.locales.join('|')}))?(${publicPages.flatMap((p) => (p === '/' ? ['', '/'] : p)).join('|')})/?$`,
    'i'
  )
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname)

  // Check if user is authenticated
  const token = req.cookies.get('next-auth.session-token') || req.cookies.get('__Secure-next-auth.session-token')

  // Redirect authenticated users away from login/signup pages or root to /dashboard
  if (token) {
    if (isPublicPage || baseRoutes.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  // Continue with normal intl or auth middleware
  if (isPublicPage) {
    return intlMiddleware(req)
  } else {
    return (authMiddleware as any)(req)
  }
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
