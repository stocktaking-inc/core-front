const BASE_AUTH_URL = process.env.NEXT_PUBLIC_FRONTEND_AUTH_URL || ''

export const routes = {
  LOGIN: `${BASE_AUTH_URL}/login`,
  REGISTER: `${BASE_AUTH_URL}/register`
}
