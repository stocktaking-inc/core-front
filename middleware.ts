import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || ''

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl

  const publicPaths = ['/', '/login', '/register', '/favicon.ico']
  const isPublic =
    publicPaths.includes(pathname) || pathname.startsWith('/_next') || pathname.startsWith('/api')

  if (isPublic) return NextResponse.next()

  const accessToken = searchParams.get('accessToken')
  const refreshToken = searchParams.get('refreshToken')

  const cleanUrl = req.nextUrl.clone()
  cleanUrl.searchParams.delete('accessToken')
  cleanUrl.searchParams.delete('refreshToken')

  // Попытка верификации accessToken
  if (accessToken) {
    const isValid = await verifyAccessToken(accessToken)
    if (isValid) {
      const res = NextResponse.redirect(cleanUrl)
      res.cookies.set('AccessToken', accessToken, { httpOnly: true, path: '/' })
      if (refreshToken) {
        res.cookies.set('RefreshToken', refreshToken, { httpOnly: true, path: '/' })
      }
      return res
    }

    // Попытка refresh
    if (refreshToken) {
      const refreshResult = await fetch(`${BACKEND_URL}/api/auth/refresh`, {
        method: 'POST',
        headers: {
          cookie: `AccessToken=${accessToken}; RefreshToken=${refreshToken}`
        }
      })

      if (refreshResult.ok) {
        const { AccessToken, RefreshToken } = await refreshResult.json()
        const res = NextResponse.redirect(cleanUrl)
        res.cookies.set('AccessToken', AccessToken, { httpOnly: true, path: '/' })
        res.cookies.set('RefreshToken', RefreshToken, { httpOnly: true, path: '/' })
        return res
      }
    }
  }

  const cookieAccessToken = req.cookies.get('AccessToken')?.value
  if (cookieAccessToken) {
    const isValid = await verifyAccessToken(cookieAccessToken)
    if (isValid) return NextResponse.next()
  }

  // Всё плохо → редирект на /login
  const loginUrl = new URL('/login', req.url)
  return NextResponse.redirect(loginUrl)
}

async function verifyAccessToken(token: string): Promise<boolean> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/verify`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return res.ok
  } catch {
    return false
  }
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)']
}
