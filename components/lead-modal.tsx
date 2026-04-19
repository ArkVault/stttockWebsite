"use client"

import { useState, useEffect } from "react"
import { submitLead, type LeadFormData } from "@/app/actions/leads"

type Props = {
  plan: "cadena" | "enterprise"
  open: boolean
  onClose: () => void
}

const STEPS = [
  "contact",
  "business",
  "staff",
  "done",
] as const

type Step = typeof STEPS[number]

const PLAN_LABEL: Record<Props["plan"], string> = {
  cadena: "Plan Cadena",
  enterprise: "Plan Enterprise",
}

export function LeadModal({ plan, open, onClose }: Props) {
  const [step, setStep] = useState<Step>("contact")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState<LeadFormData>({
    nombre: "",
    negocio: "",
    correo: "",
    telefono: "",
    plan,
    sucursales: 1,
    meseros: 0,
    jefes_barra: 0,
    managers: 0,
    admins: 0,
  })

  // reset when re-opened
  useEffect(() => {
    if (open) {
      setStep("contact")
      setError("")
      setForm(f => ({ ...f, plan }))
    }
  }, [open, plan])

  // close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  if (!open) return null

  const set = (key: keyof LeadFormData, value: string | number) =>
    setForm(f => ({ ...f, [key]: value }))

  const canNext = () => {
    if (step === "contact") return form.nombre.trim() && form.correo.trim() && form.telefono.trim()
    if (step === "business") return form.negocio.trim() && form.sucursales > 0
    if (step === "staff") return true
    return false
  }

  const next = () => {
    setError("")
    if (step === "contact") setStep("business")
    else if (step === "business") setStep("staff")
    else if (step === "staff") handleSubmit()
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await submitLead(form)
      setStep("done")
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Algo salió mal, intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  const stepIndex = STEPS.indexOf(step)
  const totalSteps = 3

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden"
        style={{
          background: "#faf9f6",
          boxShadow: "0 32px 80px rgba(0,0,0,0.22)",
        }}
      >
        {/* top bar */}
        <div className="flex items-center justify-between px-8 pt-7 pb-0">
          <span className="font-pixel text-[10px] tracking-[0.2em] text-black/30 uppercase">
            {PLAN_LABEL[plan]}
          </span>
          <button
            onClick={onClose}
            className="text-black/30 hover:text-black/60 transition-colors text-lg leading-none"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {/* progress bar */}
        {step !== "done" && (
          <div className="px-8 pt-5">
            <div className="h-0.5 w-full bg-black/6 rounded-full overflow-hidden">
              <div
                className="h-full bg-black/30 rounded-full transition-all duration-500"
                style={{ width: `${((stepIndex + 1) / totalSteps) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-black/25 mt-1.5 tracking-wide">
              {stepIndex + 1} / {totalSteps}
            </p>
          </div>
        )}

        <div className="px-8 py-8">

          {/* STEP 1 — Contact */}
          {step === "contact" && (
            <div className="space-y-5">
              <div>
                <h2 className="text-2xl font-light text-[#1a1a1a] mb-1">Cuéntanos sobre ti</h2>
                <p className="text-sm text-black/40">Te contactaremos para agendar una demo personalizada.</p>
              </div>
              <Field label="Nombre completo" required>
                <input
                  autoFocus
                  value={form.nombre}
                  onChange={e => set("nombre", e.target.value)}
                  placeholder="Ej. Carlos Mendoza"
                  className={inputCls}
                  onKeyDown={e => { if (e.key === "Enter" && canNext()) next() }}
                />
              </Field>
              <Field label="Correo electrónico" required>
                <input
                  type="email"
                  value={form.correo}
                  onChange={e => set("correo", e.target.value)}
                  placeholder="carlos@mirestaurante.com"
                  className={inputCls}
                  onKeyDown={e => { if (e.key === "Enter" && canNext()) next() }}
                />
              </Field>
              <Field label="Teléfono" required>
                <input
                  type="tel"
                  value={form.telefono}
                  onChange={e => set("telefono", e.target.value)}
                  placeholder="+52 55 1234 5678"
                  className={inputCls}
                  onKeyDown={e => { if (e.key === "Enter" && canNext()) next() }}
                />
              </Field>
            </div>
          )}

          {/* STEP 2 — Business */}
          {step === "business" && (
            <div className="space-y-5">
              <div>
                <h2 className="text-2xl font-light text-[#1a1a1a] mb-1">Tu negocio</h2>
                <p className="text-sm text-black/40">Cuéntanos la escala de tu operación.</p>
              </div>
              <Field label="Nombre del negocio" required>
                <input
                  autoFocus
                  value={form.negocio}
                  onChange={e => set("negocio", e.target.value)}
                  placeholder="Ej. Grupo Restaurantero La Palma"
                  className={inputCls}
                  onKeyDown={e => { if (e.key === "Enter" && canNext()) next() }}
                />
              </Field>
              <Field label="Cantidad de sucursales" required>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => set("sucursales", Math.max(1, form.sucursales - 1))}
                    className={stepperBtn}
                  >−</button>
                  <span className="w-12 text-center text-xl font-light">{form.sucursales}</span>
                  <button
                    type="button"
                    onClick={() => set("sucursales", form.sucursales + 1)}
                    className={stepperBtn}
                  >+</button>
                </div>
              </Field>
            </div>
          )}

          {/* STEP 3 — Staff */}
          {step === "staff" && (
            <div className="space-y-5">
              <div>
                <h2 className="text-2xl font-light text-[#1a1a1a] mb-1">Tu equipo</h2>
                <p className="text-sm text-black/40">Staff aproximado por rol (por sucursal).</p>
              </div>
              {([
                { key: "meseros",     label: "Meseros" },
                { key: "jefes_barra", label: "Jefes de barra" },
                { key: "managers",    label: "Managers" },
                { key: "admins",      label: "Admins" },
              ] as const).map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-black/60">{label}</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => set(key, Math.max(0, (form[key] as number) - 1))}
                      className={stepperBtn}
                    >−</button>
                    <span className="w-8 text-center text-base font-light">{form[key]}</span>
                    <button
                      type="button"
                      onClick={() => set(key, (form[key] as number) + 1)}
                      className={stepperBtn}
                    >+</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* DONE */}
          {step === "done" && (
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-black/5 flex items-center justify-center mx-auto text-2xl">
                ✓
              </div>
              <h2 className="text-2xl font-light text-[#1a1a1a]">¡Listo!</h2>
              <p className="text-sm text-black/50 leading-relaxed max-w-xs mx-auto">
                Recibimos tu solicitud. Un especialista de Stttock te contactará en menos de 24 horas.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-8 py-2.5 rounded-xl bg-[#111] text-white text-sm tracking-widest hover:bg-[#333] transition-colors"
              >
                CERRAR
              </button>
            </div>
          )}

          {/* error */}
          {error && (
            <p className="mt-3 text-sm text-red-500">{error}</p>
          )}

          {/* nav */}
          {step !== "done" && (
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={() => {
                  if (step === "contact") onClose()
                  else if (step === "business") setStep("contact")
                  else if (step === "staff") setStep("business")
                }}
                className="text-sm text-black/35 hover:text-black/60 transition-colors tracking-wide"
              >
                {step === "contact" ? "Cancelar" : "← Atrás"}
              </button>
              <button
                onClick={next}
                disabled={!canNext() || loading}
                className="px-7 py-2.5 rounded-xl bg-[#111] text-white text-sm tracking-widest hover:bg-[#333] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {loading ? "Enviando..." : step === "staff" ? "ENVIAR" : "SIGUIENTE →"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-medium tracking-widest text-black/40 uppercase">
        {label}{required && <span className="text-black/25 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputCls = "w-full px-0 py-2 bg-transparent border-b border-black/12 text-[#1a1a1a] text-base placeholder:text-black/20 focus:outline-none focus:border-black/40 transition-colors"
const stepperBtn = "w-8 h-8 rounded-lg border border-black/10 text-black/50 hover:border-black/25 hover:text-black transition-all text-lg leading-none flex items-center justify-center"
