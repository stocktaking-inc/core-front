import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // TODO: /main
  if (path === '/main') {
    return NextResponse.next()
  }

  const cookieStore = await cookies()
  const accessToken = cookieStore.get('AccessToken')?.value
  const refreshToken = cookieStore.get('RefreshToken')?.value
  console.log('Cookies:', {
    accessToken: request.cookies.get('AccessToken')?.value,
    refreshToken: request.cookies.get('RefreshToken')?.value,
    allCookies: request.cookies.getAll()
  })
  if (!accessToken || !refreshToken) {
    // TODO: /main
    return NextResponse.redirect(new URL('/main', request.url))
  }

  try {
    const verifyResponse = await fetch(`${process.env.BACKEND_URL}/api/auth/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ "refreshToken": refreshToken })
    })

    if (!verifyResponse.ok) {
      throw new Error('Token verification failed')
    }

    return NextResponse.next()
  } catch (error) {
    // TODO: /main
    return NextResponse.redirect(new URL('/main', request.url))
  }
}

export const config = {
  matcher: [
    /*
     * Исключаем:
     * - API routes
     * - Статические файлы (_next/static)
     * - Главную страницу (/main)
     */
    // TODO: /main
    '/((?!api|_next/static|_next/image|favicon.ico|/main).*)'
  ]
}
