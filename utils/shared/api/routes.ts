const BASE_AUTH_URL = process.env.NEXT_PUBLIC_FRONTEND_AUTH_URL || ''
const BASE_POLICIES_URL = process.env.NEXT_PUBLIC_FRONTEND_POLICIES_URL || ''

export const routes = {
  LOGIN: `${BASE_AUTH_URL}/login`,
  REGISTER: `${BASE_AUTH_URL}/register`,
  OFFER: `${BASE_POLICIES_URL}/offer`,
  POLICY: `${BASE_POLICIES_URL}/policy`,
  TERMS: `${BASE_POLICIES_URL}/terms`
}
