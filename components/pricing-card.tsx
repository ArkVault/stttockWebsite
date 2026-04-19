'use client'

import { useState, useTransition } from 'react'
import { createCheckoutSession } from '@/app/actions/stripe'
import { LeadModal } from '@/components/lead-modal'
import type { PlanKey, BillingCycle } from '@/lib/plans'

interface PricingCardProps {
  plan: {
    name: string
    badge?: string
    monthly: string
    annual: string
    period: string
    sub: string
    features: string[]
    cta: string
    stripeKey?: PlanKey
    leadPlan?: "cadena" | "enterprise"   // opens lead modal instead
    contactHref?: string
    highlight: boolean
    delay: number
  }
  billingAnnual: boolean
}

export function PricingCard({ plan, billingAnnual }: PricingCardProps) {
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const billing: BillingCycle = billingAnnual ? 'annual' : 'monthly'
  const price = billingAnnual ? plan.annual : plan.monthly

  function handleClick() {
    if (!plan.stripeKey) return // handled by <a> fallback

    setError(null)
    startTransition(async () => {
      try {
        const url = await createCheckoutSession(plan.stripeKey!, billing)
        if (url) window.location.href = url
      } catch (e) {
        setError('Algo salió mal. Intenta de nuevo.')
      }
    })
  }

  return (
    <div
      className={`relative flex flex-col p-8 rounded-2xl transition-all duration-300 ${
        plan.highlight
          ? 'bg-[#111] text-white ring-1 ring-black/10 shadow-2xl scale-[1.02]'
          : 'bg-white/60 backdrop-blur-sm border border-black/[0.07] shadow-sm hover:shadow-md hover:-translate-y-0.5'
      }`}
    >
      {plan.badge && (
        <span className="absolute -top-3 left-6 inline-block text-[10px] tracking-widest px-3 py-1 rounded-full bg-[#111] text-white font-pixel">
          {plan.badge.toUpperCase()}
        </span>
      )}

      <div className="mb-6">
        <p className={`font-pixel text-[10px] tracking-[0.2em] mb-3 ${plan.highlight ? 'text-white/40' : 'text-black/35'}`}>
          {plan.name.toUpperCase()}
        </p>
        <div className="flex items-end gap-1">
          <span className={`text-4xl font-light ${plan.highlight ? 'text-white' : 'text-black'}`}>{price}</span>
          <span className={`text-xs mb-1 ${plan.highlight ? 'text-white/40' : 'text-black/35'}`}>{plan.period}</span>
        </div>
        <p className={`text-xs mt-1 ${plan.highlight ? 'text-white/40' : 'text-black/35'}`}>{plan.sub}</p>
      </div>

      <ul className="space-y-2.5 mb-8 flex-1">
        {plan.features.map((f) => (
          <li key={f} className={`flex items-start gap-2.5 text-sm ${plan.highlight ? 'text-white/70' : 'text-black/55'}`}>
            <span className={`mt-0.5 text-xs ${plan.highlight ? 'text-white/40' : 'text-black/30'}`}>✓</span>
            {f}
          </li>
        ))}
      </ul>

      {/* Stripe CTA */}
      {plan.stripeKey ? (
        <button
          onClick={handleClick}
          disabled={pending}
          className={`w-full py-3 rounded-xl text-sm tracking-widest transition-all duration-200 disabled:opacity-60 ${
            plan.highlight
              ? 'bg-white text-black hover:bg-white/90'
              : 'border border-black/10 text-black/60 hover:border-black/25 hover:text-black hover:bg-black/[0.04]'
          }`}
        >
          {pending ? 'REDIRIGIENDO...' : plan.cta.toUpperCase()}
        </button>
      ) : (
        <button
          onClick={() => setModalOpen(true)}
          className={`w-full py-3 rounded-xl text-sm tracking-widest transition-all duration-200 ${
            plan.highlight
              ? 'bg-white text-black hover:bg-white/90'
              : 'border border-black/10 text-black/60 hover:border-black/25 hover:text-black hover:bg-black/[0.04]'
          }`}
        >
          {plan.cta.toUpperCase()}
        </button>
      )}

      {error && <p className="mt-2 text-xs text-red-500 text-center">{error}</p>}

      {plan.leadPlan && (
        <LeadModal
          plan={plan.leadPlan}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  )
}
