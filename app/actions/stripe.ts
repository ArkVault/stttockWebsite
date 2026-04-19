'use server'

import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import { STRIPE_PRICE_IDS, type PlanKey, type BillingCycle } from '@/lib/plans'

export async function createCheckoutSession(plan: PlanKey, billing: BillingCycle) {
  const priceId = STRIPE_PRICE_IDS[plan][billing]
  if (!priceId) throw new Error(`No price found for plan="${plan}" billing="${billing}"`)

  const headersList = await headers()
  const origin = headersList.get('origin') ?? 'http://localhost:3000'

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/?checkout=success`,
    cancel_url:  `${origin}/#precios`,
    locale: 'es',
  })

  return session.url
}
