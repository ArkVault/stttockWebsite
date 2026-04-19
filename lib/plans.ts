// Map each plan + billing cycle to its Stripe Price ID.
// Replace these with the price IDs from YOUR Stripe dashboard.
// Dashboard > Products > select product > copy the price ID (price_xxx)

export const STRIPE_PRICE_IDS = {
  starter: {
    monthly: "price_1TNnVPGVivqH3Bo8c0MxbxoL", // $1,899 MXN/mes
    annual:  "price_1TNnVOGVivqH3Bo86xOWqten",  // $1,499 MXN/mes
  },
  business: {
    monthly: "price_1TNnVOGVivqH3Bo85IqgsaGa",  // $3,499 MXN/mes
    annual:  "price_1TNnVPGVivqH3Bo8iUGDwNRx",  // $2,999 MXN/mes
  },
} as const

export type PlanKey = keyof typeof STRIPE_PRICE_IDS
export type BillingCycle = "monthly" | "annual"
