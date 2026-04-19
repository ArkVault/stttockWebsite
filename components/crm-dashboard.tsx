"use client"

import { useState, useTransition } from "react"
import { crmLogout } from "@/app/actions/crm-auth"
import { updateLeadStatus, updateLeadNotes } from "@/app/actions/crm-leads"

type Lead = {
  id: string
  created_at: string
  nombre: string
  negocio: string
  correo: string
  telefono: string
  plan: "cadena" | "enterprise"
  sucursales: number
  meseros: number
  jefes_barra: number
  managers: number
  admins: number
  status: "nuevo" | "contactado" | "demo" | "cerrado" | "perdido"
  notas: string | null
}

const STATUS_LABELS: Record<Lead["status"], string> = {
  nuevo: "Nuevo",
  contactado: "Contactado",
  demo: "Demo agendada",
  cerrado: "Cerrado",
  perdido: "Perdido",
}

const STATUS_COLORS: Record<Lead["status"], string> = {
  nuevo: "bg-blue-50 text-blue-700 border-blue-100",
  contactado: "bg-amber-50 text-amber-700 border-amber-100",
  demo: "bg-purple-50 text-purple-700 border-purple-100",
  cerrado: "bg-green-50 text-green-700 border-green-100",
  perdido: "bg-red-50 text-red-600 border-red-100",
}

const STATUSES = Object.keys(STATUS_LABELS) as Lead["status"][]

export function CrmDashboard({ leads: initialLeads }: { leads: Lead[] }) {
  const [leads, setLeads] = useState(initialLeads)
  const [selected, setSelected] = useState<Lead | null>(null)
  const [filter, setFilter] = useState<Lead["status"] | "todos">("todos")
  const [notes, setNotes] = useState("")
  const [savingNotes, setSavingNotes] = useState(false)
  const [, startTransition] = useTransition()

  const filtered = filter === "todos" ? leads : leads.filter(l => l.status === filter)

  const counts: Record<string, number> = { todos: leads.length }
  STATUSES.forEach(s => { counts[s] = leads.filter(l => l.status === s).length })

  function openLead(lead: Lead) {
    setSelected(lead)
    setNotes(lead.notas ?? "")
  }

  function handleStatusChange(id: string, status: Lead["status"]) {
    startTransition(async () => {
      await updateLeadStatus(id, status)
      setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l))
      if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null)
    })
  }

  async function handleSaveNotes() {
    if (!selected) return
    setSavingNotes(true)
    await updateLeadNotes(selected.id, notes)
    setLeads(prev => prev.map(l => l.id === selected.id ? { ...l, notas: notes } : l))
    setSelected(prev => prev ? { ...prev, notas: notes } : null)
    setSavingNotes(false)
  }

  return (
    <div className="min-h-screen bg-[#f8f7f4] flex flex-col">
      {/* topbar */}
      <header className="h-14 border-b border-black/[0.06] bg-white flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-pixel text-[11px] tracking-[0.2em] text-black/40">STTTOCK</span>
          <span className="text-black/15">/</span>
          <span className="text-sm text-black/50">CRM</span>
        </div>
        <form action={crmLogout}>
          <button type="submit" className="text-xs text-black/35 hover:text-black/60 transition-colors tracking-widest">
            SALIR
          </button>
        </form>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* sidebar — lead list */}
        <aside className="w-80 shrink-0 border-r border-black/[0.06] bg-white flex flex-col overflow-hidden">
          {/* filter tabs */}
          <div className="p-4 border-b border-black/[0.06] space-y-1">
            <p className="text-[10px] tracking-widest text-black/30 uppercase mb-2">Filtrar por estado</p>
            {(["todos", ...STATUSES] as const).map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  filter === s ? "bg-black/[0.06] text-black" : "text-black/45 hover:bg-black/[0.03]"
                }`}
              >
                <span>{s === "todos" ? "Todos" : STATUS_LABELS[s]}</span>
                <span className="text-xs text-black/30">{counts[s]}</span>
              </button>
            ))}
          </div>

          {/* lead list */}
          <div className="flex-1 overflow-y-auto divide-y divide-black/[0.04]">
            {filtered.length === 0 && (
              <p className="text-sm text-black/30 text-center py-12">Sin prospectos</p>
            )}
            {filtered.map(lead => (
              <button
                key={lead.id}
                onClick={() => openLead(lead)}
                className={`w-full text-left px-4 py-3.5 hover:bg-black/[0.02] transition-colors ${
                  selected?.id === lead.id ? "bg-black/[0.03]" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#111] truncate">{lead.nombre}</p>
                    <p className="text-xs text-black/40 truncate">{lead.negocio}</p>
                  </div>
                  <span className={`shrink-0 text-[10px] px-2 py-0.5 rounded-full border ${STATUS_COLORS[lead.status]}`}>
                    {STATUS_LABELS[lead.status]}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] tracking-wide text-black/25 uppercase">{lead.plan}</span>
                  <span className="text-black/15">·</span>
                  <span className="text-[10px] text-black/25">
                    {new Date(lead.created_at).toLocaleDateString("es-MX", { day: "numeric", month: "short" })}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* main — detail panel */}
        <main className="flex-1 overflow-y-auto">
          {!selected ? (
            <div className="h-full flex items-center justify-center text-black/25 text-sm">
              Selecciona un prospecto para ver el detalle
            </div>
          ) : (
            <div className="max-w-2xl mx-auto p-8 space-y-8">
              {/* header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-light text-[#111]">{selected.nombre}</h2>
                  <p className="text-sm text-black/45 mt-0.5">{selected.negocio}</p>
                </div>
                <select
                  value={selected.status}
                  onChange={e => handleStatusChange(selected.id, e.target.value as Lead["status"])}
                  className={`text-xs px-3 py-1.5 rounded-full border cursor-pointer focus:outline-none ${STATUS_COLORS[selected.status]}`}
                >
                  {STATUSES.map(s => (
                    <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                  ))}
                </select>
              </div>

              {/* contact info */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Correo", value: selected.correo, href: `mailto:${selected.correo}` },
                  { label: "Teléfono", value: selected.telefono, href: `tel:${selected.telefono}` },
                  { label: "Plan", value: selected.plan.charAt(0).toUpperCase() + selected.plan.slice(1) },
                  { label: "Sucursales", value: String(selected.sucursales) },
                  { label: "Registro", value: new Date(selected.created_at).toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" }) },
                ].map(({ label, value, href }) => (
                  <div key={label} className="bg-white rounded-xl p-4 border border-black/[0.06]">
                    <p className="text-[10px] tracking-widest text-black/30 uppercase mb-1">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm text-black/70 hover:text-black transition-colors underline underline-offset-2">{value}</a>
                    ) : (
                      <p className="text-sm text-black/70">{value}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* staff breakdown */}
              <div className="bg-white rounded-xl p-5 border border-black/[0.06]">
                <p className="text-[10px] tracking-widest text-black/30 uppercase mb-4">Staff por rol</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Meseros", value: selected.meseros },
                    { label: "Jefes de barra", value: selected.jefes_barra },
                    { label: "Managers", value: selected.managers },
                    { label: "Admins", value: selected.admins },
                  ].map(({ label, value }) => (
                    <div key={label} className="text-center">
                      <p className="text-2xl font-light text-[#111]">{value}</p>
                      <p className="text-[11px] text-black/35 mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* notes */}
              <div className="bg-white rounded-xl p-5 border border-black/[0.06]">
                <p className="text-[10px] tracking-widest text-black/30 uppercase mb-3">Notas internas</p>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Agrega notas sobre este prospecto..."
                  rows={4}
                  className="w-full text-sm text-black/70 bg-transparent focus:outline-none resize-none placeholder:text-black/20 leading-relaxed"
                />
                <div className="flex justify-end mt-3 pt-3 border-t border-black/[0.06]">
                  <button
                    onClick={handleSaveNotes}
                    disabled={savingNotes || notes === (selected.notas ?? "")}
                    className="text-xs px-4 py-1.5 rounded-lg bg-[#111] text-white hover:bg-[#333] transition-colors disabled:opacity-30 tracking-widest"
                  >
                    {savingNotes ? "GUARDANDO..." : "GUARDAR"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
