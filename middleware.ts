import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // Admin routes - require ADMIN or SUPER_ADMIN role
    if (path.startsWith('/admin') || path.startsWith('/api/admin')) {
      if (!token || (token.role !== 'ADMIN' && token.role !== 'SUPER_ADMIN')) {
        if (path.startsWith('/api/admin')) {
          return NextResponse.json(
            {
              success: false,
              error: {
                code: 'UNAUTHORIZED',
                message: 'Admin access required',
              },
            },
            { status: 401 }
          )
        }

        return NextResponse.redirect(new URL('/auth/signin?error=unauthorized', req.url))
      }
    }

    // Profile routes - require authentication
    if (path.startsWith('/profile') || path.startsWith('/api/me')) {
      if (!token) {
        return NextResponse.redirect(new URL('/auth/signin', req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
)

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/profile/:path*',
    '/api/me/:path*',
  ],
}
