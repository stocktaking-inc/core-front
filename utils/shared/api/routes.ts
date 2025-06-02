export const BASE_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL ?? ''

export const BASE_AUTH_URL = process.env.NEXT_PUBLIC_FRONTEND_AUTH_URL ?? ''
export const BASE_POLICY_URL = process.env.NEXT_PUBLIC_FRONTEND_POLICY_URL ?? ''

export const routes = {
  LOGIN: `${BASE_AUTH_URL}/login`,
  REGISTER: `${BASE_AUTH_URL}/register`,
  OFFER: `${BASE_POLICY_URL}/offer/`,
  POLICY: `${BASE_POLICY_URL}/policy/`,
  TERMS: `${BASE_POLICY_URL}/terms/`
}
