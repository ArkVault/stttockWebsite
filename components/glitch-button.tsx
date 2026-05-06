"use client";

import type React from "react";

interface GlitchButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function GlitchButton({ href, children, className = "" }: GlitchButtonProps) {
  return (
    <a
      href={href}
      className={`neon-pill relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm tracking-widest font-medium ${className}`}
    >
      {/* Neon border trace — mask-composite: exclude shows only the 1.5px border strip */}
      <span aria-hidden="true" className="neon-trace absolute inset-0 rounded-full pointer-events-none" />

      <span className="neon-label relative z-10 text-white">{children}</span>

      <style jsx>{`
        @keyframes neon-orbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* ── Rest state ─────────────────────────────────────────── */
        .neon-pill {
          background: rgba(255, 255, 255, 0.09);
          backdrop-filter: blur(10px) saturate(130%);
          -webkit-backdrop-filter: blur(10px) saturate(130%);
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.15);
          transition:
            background 0.4s ease,
            box-shadow 0.4s ease,
            transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* ── Border strip via mask-composite ───────────────────── */
        /*
          padding: 1.5px defines the border width.
          The two-layer mask XORs content-box against border-box,
          leaving only the 1.5px strip visible — the spinning gradient
          inside ::before shows through nowhere except that strip.
        */
        .neon-trace {
          padding: 1.5px;
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        /* Oversized conic gradient that spins inside the masked strip */
        .neon-trace::before {
          content: "";
          position: absolute;
          inset: -60%;
          width: 220%;
          height: 220%;
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            transparent 316deg,
            rgba(134, 239, 172, 0.3)  336deg,
            rgba(210, 255, 235, 0.88) 347deg,
            rgba(255, 255, 255, 1)    351deg,
            rgba(210, 255, 235, 0.88) 355deg,
            rgba(134, 239, 172, 0.3)  359deg,
            transparent 360deg
          );
          animation: neon-orbit 2.4s linear infinite;
          will-change: transform;
        }

        /* ── Hover ──────────────────────────────────────────────── */
        .neon-pill:hover {
          background: rgba(255, 255, 255, 0.03);
          box-shadow:
            0 0 12px rgba(134, 239, 172, 0.2),
            0 0 28px rgba(134, 239, 172, 0.09);
          transform: translateY(-1px);
        }

        .neon-pill:hover .neon-trace {
          opacity: 1;
        }

        .neon-pill:hover .neon-label {
          color: #f0fdf4;
          text-shadow: 0 0 10px rgba(134, 239, 172, 0.38);
        }

        /* ── Label ──────────────────────────────────────────────── */
        .neon-label {
          transition: color 0.4s ease, text-shadow 0.4s ease;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
        }

        .neon-pill:active {
          transform: translateY(0px);
          transition-duration: 0.1s;
        }
      `}</style>
    </a>
  );
}
