import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname


  if (
    path === '/' ||
    path === '/main' ||
    path === '/main/' ||
    path.startsWith('/auth') ||
    path.startsWith('/_next') ||
    path.includes('favicon.ico')
  ) {
    return NextResponse.next()
  }

  const accessToken = request.cookies.get('AccessToken')?.value
  const refreshToken = request.cookies.get('RefreshToken')?.value

  if (!accessToken || !refreshToken) {
    const loginUrl = new URL('/auth/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL
  if (!backendUrl) {
    console.error('NEXT_PUBLIC_BACKEND_API_URL is not defined in .env')
  }

  try {
    const verifyResponse = await fetch(`${backendUrl}/api/auth/verify`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (verifyResponse.ok) {
      console.log('Verify successful, proceeding')
      return NextResponse.next()
    }

    const refreshResponse = await fetch(`${backendUrl}/api/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    const setCookieHeader = refreshResponse.headers.get('set-cookie')
    if (setCookieHeader) {
      console.log('AccessToken updated via Set-Cookie')
      const response = NextResponse.next()
      response.headers.set('set-cookie', setCookieHeader)
      return response
    } else {
      console.warn('No Set-Cookie header in refresh response, redirecting to login')
    }
  } catch (error: any) {
    console.error('Middleware fetch error:', {
      message: error.message,
      stack: error.stack,
    })
  }
}

export const config = {
  matcher: [
    '/((?!$|auth|_next|favicon|main.*).*)',
  ],
}
