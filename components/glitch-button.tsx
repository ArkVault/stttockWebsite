"use client";

import type React from "react";

interface GlitchButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function GlitchButton({
  href,
  children,
  className = "",
}: GlitchButtonProps) {
  return (
    <a
      href={href}
      className={`glass-cta group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm tracking-widest font-medium overflow-hidden isolate ${className}`}
    >
      {/* Border trace layer — only the 1.5px edge is visible (glass-base sits inset on hover) */}
      <span
        aria-hidden="true"
        className="glass-border-trace absolute inset-0 rounded-full pointer-events-none"
      />

      {/* Base fill */}
      <span
        aria-hidden="true"
        className="glass-base absolute inset-0 rounded-full"
      />

      {/* Top-edge specular highlight */}
      <span
        aria-hidden="true"
        className="glass-specular absolute inset-x-0 top-0 h-1/2 rounded-t-full pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 40%, transparent 100%)",
        }}
      />

      {/* Diagonal sheen on hover */}
      <span
        aria-hidden="true"
        className="glass-sheen absolute inset-0 rounded-full pointer-events-none opacity-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(187,247,208,0.28) 0%, rgba(74,222,128,0.08) 40%, transparent 65%)",
        }}
      />

      {/* Label */}
      <span className="glass-label relative z-10 text-white">{children}</span>

      <style jsx>{`
        /* Light flare travels along the border perimeter */
        @keyframes border-trace {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

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

        /* ── Border trace ──────────────────────────────────────── */
        /* overflow:hidden clips the oversized spinning ::before to the pill shape */
        .glass-border-trace {
          overflow: hidden;
          opacity: 0;
          transition: opacity 0.4s ease-out;
        }

        /*
          Spinning element — 220% so it always covers the pill as it rotates.
          Conic gradient: almost entirely transparent with one tight bright flare.
          The inset on glass-base exposes only the 1.5px edge, so only the flare
          (and the static green base below) is visible at the border.
        */
        .glass-border-trace::before {
          content: "";
          position: absolute;
          inset: -60%;
          width: 220%;
          height: 220%;
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            transparent 320deg,
            rgba(134, 239, 172, 0.55) 340deg,
            rgba(255, 255, 255, 0.95) 352deg,
            rgba(187, 247, 208, 0.7) 357deg,
            transparent 360deg
          );
          animation: border-trace 2.4s linear infinite;
          will-change: transform;
        }

        /* Static green tint fills the border channel beneath the flare */
        .glass-border-trace::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: rgba(34, 197, 94, 0.55);
        }

        /* ── Base fill ─────────────────────────────────────────── */
        .glass-base {
          background: radial-gradient(
            120% 180% at 50% -30%,
            #2a2a2a 0%,
            #141414 45%,
            #050505 100%
          );
          transition:
            background 0.5s ease-out,
            inset 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .glass-sheen {
          transition: opacity 0.5s ease-out;
        }

        .glass-label {
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
          transition:
            text-shadow 0.5s ease-out,
            color 0.4s ease-out;
        }

        /* ── Hover ─────────────────────────────────────────────── */
        .glass-cta:hover {
          transform: translateY(-1px);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          backdrop-filter: blur(16px) saturate(180%);
          box-shadow:
            0 2px 6px rgba(0, 0, 0, 0.08),
            0 8px 20px -8px rgba(34, 197, 94, 0.28),
            0 20px 36px -16px rgba(34, 197, 94, 0.18);
        }

        /* Green glass fill — inset 1.5px exposes the border channel */
        .glass-cta:hover .glass-base {
          inset: 1.5px;
          background: radial-gradient(
            130% 200% at 50% -10%,
            rgba(74, 222, 128, 0.32) 0%,
            rgba(21, 128, 61, 0.22) 50%,
            rgba(5, 46, 22, 0.26) 100%
          );
        }

        .glass-cta:hover .glass-border-trace {
          opacity: 1;
        }

        .glass-cta:hover .glass-sheen {
          opacity: 1;
        }

        .glass-cta:hover .glass-label {
          text-shadow:
            0 1px 2px rgba(0, 0, 0, 0.3),
            0 0 10px rgba(134, 239, 172, 0.4);
          color: #f0fdf4;
        }

        .glass-cta:active {
          transform: translateY(0);
          transition-duration: 0.15s;
        }
      `}</style>
    </a>
  );
}
