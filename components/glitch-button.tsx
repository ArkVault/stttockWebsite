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
      {/* Spinning border glow — conic gradient that rotates on hover */}
      <span
        aria-hidden="true"
        className="glass-border-glow absolute inset-0 rounded-full pointer-events-none"
      />

      {/* Base fill — transitions to green glass on hover */}
      <span
        aria-hidden="true"
        className="glass-base absolute inset-0 rounded-full"
      />

      {/* Inner depth shadow */}
      <span
        aria-hidden="true"
        className="glass-depth absolute inset-0 rounded-full pointer-events-none"
        style={{
          boxShadow:
            "inset 0 -10px 20px -10px rgba(0,0,0,0.55), inset 0 8px 16px -8px rgba(255,255,255,0.06)",
        }}
      />

      {/* Top-edge specular highlight */}
      <span
        aria-hidden="true"
        className="glass-specular absolute inset-x-0 top-0 h-1/2 rounded-t-full pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0) 100%)",
        }}
      />

      {/* Diagonal sheen */}
      <span
        aria-hidden="true"
        className="glass-sheen absolute inset-0 rounded-full pointer-events-none opacity-0 transition-opacity duration-500 ease-out"
        style={{
          background:
            "linear-gradient(135deg, rgba(134,239,172,0.35) 0%, rgba(74,222,128,0.12) 38%, rgba(255,255,255,0) 60%, rgba(134,239,172,0.18) 100%)",
        }}
      />

      {/* Inner ring */}
      <span
        aria-hidden="true"
        className="glass-ring absolute inset-0 rounded-full pointer-events-none opacity-0 transition-opacity duration-500 ease-out"
        style={{
          boxShadow:
            "inset 0 1.5px 0 0 rgba(134,239,172,0.65), inset 0 -1.5px 0 0 rgba(74,222,128,0.18), inset 0 0 0 1px rgba(74,222,128,0.28)",
        }}
      />

      {/* Label */}
      <span className="glass-label relative z-10 text-white">{children}</span>

      <style jsx>{`
        @keyframes border-spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes glow-pulse {
          0%,
          100% {
            opacity: 0.85;
          }
          50% {
            opacity: 1;
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
            backdrop-filter 0.55s ease-out,
            -webkit-backdrop-filter 0.55s ease-out,
            box-shadow 0.55s ease-out,
            transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform, box-shadow;
        }

        /* ── Spinning border glow layer ────────────────────────── */
        .glass-border-glow {
          overflow: hidden;
          opacity: 0;
          transition: opacity 0.45s ease-out;
        }

        /* The actual spinning conic gradient — 200% so it fills as it rotates */
        .glass-border-glow::before {
          content: "";
          position: absolute;
          inset: -60%;
          width: 220%;
          height: 220%;
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            rgba(34, 197, 94, 0) 50deg,
            rgba(74, 222, 128, 0.95) 80deg,
            rgba(187, 247, 208, 1) 95deg,
            rgba(255, 255, 255, 0.95) 105deg,
            rgba(134, 239, 172, 0.7) 120deg,
            transparent 160deg,
            transparent 310deg,
            rgba(34, 197, 94, 0.35) 345deg,
            transparent 360deg
          );
          animation: border-spin 2.8s linear infinite;
          will-change: transform;
        }

        /* Outer glow halo that pulses behind the button */
        .glass-border-glow::after {
          content: "";
          position: absolute;
          inset: 3px;
          border-radius: inherit;
          background: rgba(34, 197, 94, 0.18);
          filter: blur(6px);
          opacity: 0;
          transition: opacity 0.45s ease-out;
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

        .glass-label {
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
          transition:
            text-shadow 0.5s ease-out,
            color 0.4s ease-out;
        }

        /* ── Hover state ───────────────────────────────────────── */
        .glass-cta:hover {
          transform: translateY(-1px);
          -webkit-backdrop-filter: blur(18px) saturate(200%);
          backdrop-filter: blur(18px) saturate(200%);
          box-shadow:
            0 2px 4px rgba(0, 0, 0, 0.08),
            0 10px 24px -8px rgba(34, 197, 94, 0.3),
            0 24px 44px -18px rgba(34, 197, 94, 0.2),
            0 0 0 1px rgba(74, 222, 128, 0.15);
        }

        /* Expose 1.5px border channel so spinning layer bleeds through */
        .glass-cta:hover .glass-base {
          inset: 1.5px;
          background: radial-gradient(
            130% 180% at 50% -20%,
            rgba(34, 197, 94, 0.38) 0%,
            rgba(21, 128, 61, 0.28) 40%,
            rgba(5, 46, 22, 0.32) 100%
          );
        }

        .glass-cta:hover .glass-border-glow {
          opacity: 1;
          animation: glow-pulse 2.2s ease-in-out infinite;
        }

        .glass-cta:hover .glass-border-glow::after {
          opacity: 1;
        }

        .glass-cta:hover .glass-sheen {
          opacity: 1;
        }

        .glass-cta:hover .glass-ring {
          opacity: 1;
        }

        .glass-cta:hover .glass-label {
          text-shadow:
            0 1px 2px rgba(0, 0, 0, 0.3),
            0 0 14px rgba(134, 239, 172, 0.45);
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
