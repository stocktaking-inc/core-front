import { PLAN_PRICES } from '../constants'

export const getPlanPrice = (planName: string): string => {
  return PLAN_PRICES[planName] || PLAN_PRICES.default
}
