"use client"

import type React from "react"

interface GlitchButtonProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function GlitchButton({ href, children, className = "" }: GlitchButtonProps) {
  return (
    <a
      href={href}
      className={`glass-cta group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm tracking-widest font-medium overflow-hidden isolate ${className}`}
    >
      {/* Base fill — deep gradient gives a subtle convex depth at rest */}
      <span aria-hidden="true" className="glass-base absolute inset-0 rounded-full" />

      {/* Inner depth shadow — darker well at the bottom to suggest 3D volume */}
      <span
        aria-hidden="true"
        className="glass-depth absolute inset-0 rounded-full pointer-events-none"
        style={{
          boxShadow:
            "inset 0 -10px 20px -10px rgba(0,0,0,0.55), inset 0 8px 16px -8px rgba(255,255,255,0.06)",
        }}
      />

      {/* Top-edge specular highlight — the "catching light" reflection */}
      <span
        aria-hidden="true"
        className="glass-specular absolute inset-x-0 top-0 h-1/2 rounded-t-full pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0) 100%)",
        }}
      />

      {/* Diagonal sheen — wet-glass reflection, intensifies on hover */}
      <span
        aria-hidden="true"
        className="glass-sheen absolute inset-0 rounded-full pointer-events-none opacity-0 transition-opacity duration-500 ease-out"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.10) 38%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.16) 100%)",
        }}
      />

      {/* Inner ring — crisp glass edge, visible on hover */}
      <span
        aria-hidden="true"
        className="glass-ring absolute inset-0 rounded-full pointer-events-none opacity-0 transition-opacity duration-500 ease-out"
        style={{
          boxShadow:
            "inset 0 1.5px 0 0 rgba(255,255,255,0.55), inset 0 -1.5px 0 0 rgba(255,255,255,0.12), inset 0 0 0 1px rgba(255,255,255,0.18)",
        }}
      />

      {/* Label */}
      <span className="glass-label relative z-10 text-white">{children}</span>

      <style jsx>{`
        .glass-cta {
          -webkit-backdrop-filter: blur(0px) saturate(100%);
          backdrop-filter: blur(0px) saturate(100%);
          box-shadow:
            0 1px 2px rgba(0, 0, 0, 0.12),
            0 6px 14px -8px rgba(0, 0, 0, 0.28),
            0 18px 30px -18px rgba(0, 0, 0, 0.35);
          transition:
            backdrop-filter 0.5s ease-out,
            -webkit-backdrop-filter 0.5s ease-out,
            box-shadow 0.5s ease-out,
            transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform, box-shadow;
        }

        .glass-base {
          background:
            radial-gradient(120% 180% at 50% -30%, #2a2a2a 0%, #141414 45%, #050505 100%);
          transition: background 0.5s ease-out, opacity 0.5s ease-out;
        }

        .glass-label {
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
          transition: text-shadow 0.5s ease-out;
        }

        .glass-cta:hover {
          transform: translateY(-1px);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          backdrop-filter: blur(16px) saturate(180%);
          box-shadow:
            0 2px 4px rgba(0, 0, 0, 0.10),
            0 14px 28px -10px rgba(0, 0, 0, 0.32),
            0 28px 44px -20px rgba(0, 0, 0, 0.40);
        }

        .glass-cta:hover .glass-base {
          background:
            radial-gradient(120% 180% at 50% -30%, rgba(60, 60, 60, 0.38) 0%, rgba(20, 20, 20, 0.34) 45%, rgba(5, 5, 5, 0.32) 100%);
        }

        .glass-cta:hover .glass-sheen {
          opacity: 1;
        }

        .glass-cta:hover .glass-ring {
          opacity: 1;
        }

        .glass-cta:hover .glass-label {
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35), 0 0 12px rgba(255, 255, 255, 0.25);
        }

        .glass-cta:active {
          transform: translateY(0);
          transition-duration: 0.15s;
        }
      `}</style>
    </a>
  )
}
