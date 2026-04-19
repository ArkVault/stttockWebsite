"use client"

import { useState } from "react"
import { crmLogin } from "@/app/actions/crm-auth"

export default function CrmLoginPage() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const formData = new FormData(e.currentTarget)
    const result = await crmLogin(formData)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0d0f] px-4">
      <div
        className="w-full max-w-sm rounded-2xl p-8"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
        }}
      >
        <div className="mb-8">
          <p className="text-[10px] tracking-[0.25em] text-white/25 uppercase mb-2">Stttock</p>
          <h1 className="text-xl font-light text-white">CRM Interno</h1>
          <p className="text-sm text-white/35 mt-1">Acceso restringido</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[11px] tracking-widest text-white/30 uppercase">Correo</label>
            <input
              name="email"
              type="email"
              required
              autoFocus
              placeholder="admin@stttock.com"
              className="w-full px-0 py-2.5 bg-transparent border-b border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] tracking-widest text-white/30 uppercase">Contraseña</label>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-0 py-2.5 bg-transparent border-b border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors text-sm"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 rounded-xl bg-white text-black text-sm tracking-widest hover:bg-white/90 transition-colors disabled:opacity-40"
          >
            {loading ? "ENTRANDO..." : "ENTRAR"}
          </button>
        </form>
      </div>
    </div>
  )
}
