<<<<<<< HEAD
const BASE_AUTH_URL = process.env.NEXT_PUBLIC_FRONTEND_AUTH_URL ?? ''
const BASE_POLICY_URL = process.env.NEXT_PUBLIC_FRONTEND_POLICY_URL ?? ''
=======
const BASE_AUTH_URL = process.env.NEXT_PUBLIC_FRONTEND_AUTH_URL || ''
const BASE_POLICIES_URL = process.env.NEXT_PUBLIC_FRONTEND_POLICIES_URL || ''
>>>>>>> a87d37d9e16ea4ab15be09fb917f68e488a3e8b5

export const routes = {
  LOGIN: `${BASE_AUTH_URL}/login`,
  REGISTER: `${BASE_AUTH_URL}/register`,
<<<<<<< HEAD
  OFFER: `${BASE_POLICY_URL}/offer`,
  POLICY: `${BASE_POLICY_URL}/policy`,
  TERMS: `${BASE_POLICY_URL}/terms`
=======
  OFFER: `${BASE_POLICIES_URL}/offer`,
  POLICY: `${BASE_POLICIES_URL}/policy`,
  TERMS: `${BASE_POLICIES_URL}/terms`
>>>>>>> a87d37d9e16ea4ab15be09fb917f68e488a3e8b5
}
