"use client"

import { useState } from "react"
import { useLang } from "@/lib/language-context"

const NAV_LINKS_ES = [
  { label: "Problema",      href: "#problema" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Features",      href: "#features" },
  { label: "Precios",       href: "#precios" },
  { label: "FAQ",           href: "#faq" },
]

const NAV_LINKS_EN = [
  { label: "Problem",    href: "#problema" },
  { label: "How it works", href: "#como-funciona" },
  { label: "Features",   href: "#features" },
  { label: "Pricing",    href: "#precios" },
  { label: "FAQ",        href: "#faq" },
]

const NAV_STYLE = {
  backdropFilter: "blur(22px) saturate(160%)",
  WebkitBackdropFilter: "blur(22px) saturate(160%)",
  background: "rgba(245,244,240,0.05)",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.35), 0 10px 30px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)",
} as const

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const { lang, toggle } = useLang()

  const close = () => setOpen(false)
  const NAV_LINKS = lang === "es" ? NAV_LINKS_ES : NAV_LINKS_EN
  const contactLabel = lang === "es" ? "CONTACTO" : "CONTACT"

  return (
    <div className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-3xl">

        {/* Main bar */}
        <nav
          className="flex items-center justify-between px-5 py-3 rounded-2xl border border-black/[0.06]"
          style={NAV_STYLE}
        >
          <a href="#" aria-label="Ir al inicio" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }) }}>
            <img src="/logo-light.png" alt="Stttock" className="h-5 w-auto" />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
            {NAV_LINKS.map(l => (
              <a
                key={l.label}
                href={l.href}
                className="text-[11px] text-black/60 hover:text-black transition-colors duration-200 tracking-wide"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Language toggle — desktop */}
            <button
              onClick={toggle}
              aria-label="Cambiar idioma"
              className="hidden md:flex items-center gap-1 text-[11px] px-3 py-2 rounded-xl border border-black/10 text-black/50 hover:text-black hover:border-black/20 hover:bg-black/[0.03] transition-all duration-200 tracking-widest"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              <span className={lang === "es" ? "text-black" : "text-black/30"}>ES</span>
              <span className="text-black/15 mx-0.5">/</span>
              <span className={lang === "en" ? "text-black" : "text-black/30"}>EN</span>
            </button>

            <a href="#precios" className="text-[11px] px-4 py-2 rounded-xl border border-black/10 text-black/60 hover:text-black hover:border-black/20 hover:bg-black/[0.03] transition-all duration-200 tracking-wide hidden md:block" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
              {contactLabel}
            </a>

            {/* Burger — mobile only */}
            <button
              onClick={() => setOpen(v => !v)}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] rounded-lg hover:bg-black/[0.04] transition-colors"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span
                className="block h-px bg-black/60 transition-all duration-300 origin-center"
                style={{
                  width: "18px",
                  transform: open ? "translateY(6px) rotate(45deg)" : "none",
                }}
              />
              <span
                className="block h-px bg-black/60 transition-all duration-300"
                style={{
                  width: "18px",
                  opacity: open ? 0 : 1,
                  transform: open ? "scaleX(0)" : "none",
                }}
              />
              <span
                className="block h-px bg-black/60 transition-all duration-300 origin-center"
                style={{
                  width: "18px",
                  transform: open ? "translateY(-6px) rotate(-45deg)" : "none",
                }}
              />
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        <div
          className="md:hidden mt-2 overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: open ? "380px" : "0px", opacity: open ? 1 : 0 }}
        >
          <div
            className="rounded-2xl border border-black/[0.06] px-2 py-2 flex flex-col"
            style={NAV_STYLE}
          >
            {NAV_LINKS.map(l => (
              <a
                key={l.label}
                href={l.href}
                onClick={close}
                className="px-4 py-3 text-sm text-black/60 hover:text-black hover:bg-black/[0.03] rounded-xl transition-colors tracking-wide"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              >
                {l.label}
              </a>
            ))}
            <div className="mt-1 px-2 pb-1 flex gap-2">
              <a href="#precios" className="flex-1 block text-center text-[11px] px-4 py-2.5 rounded-xl border border-black/10 text-black/60 hover:text-black hover:border-black/20 hover:bg-black/[0.03] transition-all duration-200 tracking-wide" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
                {contactLabel}
              </a>
              {/* Language toggle — mobile */}
              <button
                onClick={toggle}
                aria-label="Cambiar idioma"
                className="flex items-center gap-1 text-[11px] px-4 py-2.5 rounded-xl border border-black/10 text-black/60 hover:text-black hover:border-black/20 hover:bg-black/[0.03] transition-all duration-200 tracking-widest"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              >
                <span className={lang === "es" ? "text-black" : "text-black/30"}>ES</span>
                <span className="text-black/15 mx-0.5">/</span>
                <span className={lang === "en" ? "text-black" : "text-black/30"}>EN</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
