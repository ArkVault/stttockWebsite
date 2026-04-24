"use client";

import React, { useRef, useEffect, useState } from "react";

import { RevealText } from "@/components/reveal-text";
import { MobileNav } from "@/components/mobile-nav";
import { GlitchButton } from "@/components/glitch-button";
import { TypewriterText } from "@/components/typewriter-text";
import { PricingCard } from "@/components/pricing-card";
import { useLang } from "@/lib/language-context";

// ─── Feature organic 3-D shapes ──────────────────────────────────────────────
function FeatureShape({ icon }: { icon: string }) {
  const map: Record<string, React.ReactElement> = {

    // pos — coral wavy tube
    pos: (
      <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
        <defs>
          <radialGradient id="g-pos" cx="170" cy="85" r="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFCAC3" /><stop offset="50%" stopColor="#FF6B57" /><stop offset="100%" stopColor="#B83020" />
          </radialGradient>
          <filter id="f-pos"><feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#B83020" floodOpacity="0.22" /></filter>
        </defs>
        <rect width="400" height="240" fill="#FFF3F1" />
        <path filter="url(#f-pos)" fill="url(#g-pos)"
          d="M 65,108 C 78,56 116,44 142,88 C 162,124 184,148 212,108 C 236,70 272,52 300,90 C 314,110 314,136 300,156 C 278,186 242,184 220,152 C 200,122 182,106 158,140 C 136,172 102,180 76,156 C 58,140 54,125 65,108 Z" />
      </svg>
    ),

    // brain — violet bumpy blob
    brain: (
      <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
        <defs>
          <radialGradient id="g-brain" cx="160" cy="80" r="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#DDD0FF" /><stop offset="48%" stopColor="#8B5CF6" /><stop offset="100%" stopColor="#4C1D95" />
          </radialGradient>
          <filter id="f-brain"><feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#4C1D95" floodOpacity="0.22" /></filter>
        </defs>
        <rect width="400" height="240" fill="#F5F0FF" />
        <path filter="url(#f-brain)" fill="url(#g-brain)"
          d="M 200,44 C 238,40 272,58 292,88 C 310,56 332,72 328,104 C 348,118 348,148 328,162 C 330,192 308,210 280,208 C 260,228 228,228 208,210 C 192,224 168,222 154,208 C 124,212 102,192 106,164 C 84,148 84,116 106,100 C 104,68 130,50 160,56 C 172,48 186,44 200,44 Z" />
      </svg>
    ),

    // bell — blue parallel inflated tubes
    bell: (
      <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
        <defs>
          <radialGradient id="g-bell" cx="150" cy="70" r="220" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#BFDBFE" /><stop offset="48%" stopColor="#3B82F6" /><stop offset="100%" stopColor="#1E3A8A" />
          </radialGradient>
          <filter id="f-bell"><feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#1E3A8A" floodOpacity="0.22" /></filter>
        </defs>
        <rect width="400" height="240" fill="#EFF6FF" />
        <g filter="url(#f-bell)" fill="url(#g-bell)">
          <rect x="68" y="52" width="264" height="40" rx="20" />
          <rect x="80" y="104" width="240" height="40" rx="20" />
          <rect x="68" y="156" width="258" height="40" rx="20" />
        </g>
      </svg>
    ),

    // calendar — green 6-point asterisk
    calendar: (
      <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
        <defs>
          <radialGradient id="g-cal" cx="185" cy="75" r="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#86EFAC" /><stop offset="48%" stopColor="#16A34A" /><stop offset="100%" stopColor="#14532D" />
          </radialGradient>
          <filter id="f-cal"><feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#14532D" floodOpacity="0.22" /></filter>
        </defs>
        <rect width="400" height="240" fill="#F0FFF4" />
        <g filter="url(#f-cal)" fill="url(#g-cal)">
          <rect x="116" y="100" width="168" height="40" rx="20" />
          <rect x="116" y="100" width="168" height="40" rx="20" transform="rotate(60 200 120)" />
          <rect x="116" y="100" width="168" height="40" rx="20" transform="rotate(120 200 120)" />
        </g>
      </svg>
    ),

    // chart — orange coral cluster
    chart: (
      <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
        <defs>
          <radialGradient id="g-chart" cx="170" cy="80" r="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FED7AA" /><stop offset="48%" stopColor="#F97316" /><stop offset="100%" stopColor="#9A3412" />
          </radialGradient>
          <filter id="f-chart"><feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#9A3412" floodOpacity="0.22" /></filter>
        </defs>
        <rect width="400" height="240" fill="#FFF7ED" />
        <g filter="url(#f-chart)" fill="url(#g-chart)">
          <circle cx="200" cy="120" r="52" />
          <circle cx="152" cy="84" r="36" />
          <circle cx="250" cy="82" r="34" />
          <circle cx="252" cy="158" r="36" />
          <circle cx="150" cy="158" r="34" />
          <circle cx="200" cy="56" r="28" />
          <circle cx="200" cy="184" r="28" />
        </g>
      </svg>
    ),

    // building — teal smooth pillow
    building: (
      <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
        <defs>
          <radialGradient id="g-bld" cx="155" cy="80" r="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#99F6E4" /><stop offset="48%" stopColor="#0D9488" /><stop offset="100%" stopColor="#134E4A" />
          </radialGradient>
          <filter id="f-bld"><feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#134E4A" floodOpacity="0.22" /></filter>
        </defs>
        <rect width="400" height="240" fill="#F0FDFA" />
        <path filter="url(#f-bld)" fill="url(#g-bld)"
          d="M 200,62 C 262,62 322,82 322,120 C 322,158 262,178 200,178 C 138,178 78,158 78,120 C 78,82 138,62 200,62 Z" />
      </svg>
    ),

    // percent — rose donut ring
    percent: (
      <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
        <defs>
          <radialGradient id="g-pct" cx="165" cy="75" r="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FBCFE8" /><stop offset="48%" stopColor="#EC4899" /><stop offset="100%" stopColor="#831843" />
          </radialGradient>
          <filter id="f-pct"><feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#831843" floodOpacity="0.22" /></filter>
          <mask id="m-pct">
            <rect width="400" height="240" fill="white" />
            <circle cx="200" cy="120" r="38" fill="black" />
          </mask>
        </defs>
        <rect width="400" height="240" fill="#FDF2F8" />
        <circle cx="200" cy="120" r="82" fill="url(#g-pct)" filter="url(#f-pct)" mask="url(#m-pct)" />
      </svg>
    ),

    // webhook — indigo figure-8
    webhook: (
      <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
        <defs>
          <radialGradient id="g-hook" cx="160" cy="80" r="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C7D2FE" /><stop offset="48%" stopColor="#6366F1" /><stop offset="100%" stopColor="#312E81" />
          </radialGradient>
          <filter id="f-hook"><feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#312E81" floodOpacity="0.22" /></filter>
        </defs>
        <rect width="400" height="240" fill="#EEF2FF" />
        <path filter="url(#f-hook)" fill="url(#g-hook)"
          d="M 130,120 C 130,80 155,52 195,68 C 228,82 228,158 262,172 C 302,186 330,160 330,120 C 330,80 305,52 265,68 C 232,82 232,158 198,172 C 158,186 130,160 130,120 Z" />
      </svg>
    ),
  };

  return <div style={{ width: "100%", height: "100%" }}>{map[icon] ?? map["pos"]}</div>;
}

// ─── Intersection Observer hook ──────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Bento card ──────────────────────────────────────────────────────────────
function BentoCard({
  children,
  className = "",
  delay = 0,
  accent,
  sharp = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  accent?: string;
  sharp?: boolean;
}) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`group relative ${sharp ? "rounded-none" : "rounded-2xl"} border border-black/[0.07] bg-white overflow-hidden transition-all duration-700 hover:border-black/[0.15] hover:bg-[#fafaf8] ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms, border-color 0.3s ease, background-color 0.3s ease`,
      }}
    >
      {accent && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at top right, ${accent}18, transparent 65%)`,
          }}
        />
      )}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,0,0,0.03), transparent 60%)",
        }}
      />
      {children}
    </div>
  );
}

// ─── Pill tag ─────────────────────────────────────────────────────────────────
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] tracking-widest font-sans text-black/40 bg-black/[0.04]">
      {children}
    </span>
  );
}

// ─── Workflow Steps ───────────────────────────────────────────────────────────
const STEP_IMAGES = [
  "/images/step-01.jpg",
  "/images/step-02.jpg",
  "/images/step-03.jpg",
  "/images/step-04.jpg",
  "/images/step-05.jpg",
];

const STEP_DURATION = 3000; // ms per step

function WorkflowSteps({
  steps,
}: {
  steps: { n: string; title: string; desc: string }[];
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    if (paused) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    const tick = (now: number) => {
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current;
      const pct = Math.min(elapsed / STEP_DURATION, 1);
      setProgress(pct);
      if (pct >= 1) {
        startRef.current = null;
        setProgress(0);
        setActive((prev) => (prev + 1) % steps.length);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [paused, steps.length]);

  // Reset timer when active changes (e.g. manual click)
  const goTo = (i: number) => {
    startRef.current = null;
    setProgress(0);
    setActive(i);
  };

  return (
    <>
      {/* ── Desktop: Linear-style left list + right image ─────── */}
      <div
        className="hidden md:flex gap-16 items-stretch"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Left: step list */}
        <div className="flex flex-col w-[340px] flex-shrink-0 relative">
          {/* Vertical track line */}
          <div className="absolute left-[15px] top-4 bottom-4 w-px bg-black/[0.07]" />

          {steps.map((step, i) => {
            const isActive = active === i;
            const isDone = i < active;
            return (
              <button
                key={step.n}
                onClick={() => goTo(i)}
                className="relative flex gap-5 items-start text-left py-6 pr-4 group transition-all duration-300"
              >
                {/* Node */}
                <div className="relative flex-shrink-0 mt-0.5">
                  {/* Animated fill segment on the track above this node */}
                  {isActive && (
                    <div
                      className="absolute bottom-full left-1/2 -translate-x-1/2 w-px bg-black/40 origin-bottom"
                      style={{
                        height: "48px",
                        transform: `scaleY(${progress}) translateX(-50%)`,
                        transformOrigin: "bottom",
                        transition: "none",
                      }}
                    />
                  )}
                  {isDone && (
                    <div
                      className="absolute bottom-full left-1/2 -translate-x-1/2 w-px bg-black/30"
                      style={{ height: "48px" }}
                    />
                  )}
                  {/* Circle node */}
                  <div
                    className="w-[30px] h-[30px] rounded-full border-2 flex items-center justify-center transition-all duration-400"
                    style={{
                      borderColor: isActive
                        ? "rgba(0,0,0,0.55)"
                        : isDone
                        ? "rgba(0,0,0,0.20)"
                        : "rgba(0,0,0,0.10)",
                      background: isActive
                        ? "rgba(0,0,0,0.06)"
                        : "transparent",
                    }}
                  >
                    {isDone ? (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path
                          d="M1 4L3.5 6.5L9 1"
                          stroke="rgba(0,0,0,0.35)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <span
                        className="font-pixel text-[8px] tracking-widest"
                        style={{
                          color: isActive
                            ? "rgba(0,0,0,0.6)"
                            : "rgba(0,0,0,0.25)",
                        }}
                      >
                        {step.n}
                      </span>
                    )}
                  </div>
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0 pt-1">
                  <div
                    className="flex items-center gap-2 mb-1 transition-all duration-300"
                    style={{
                      color: isActive
                        ? "rgba(0,0,0,0.85)"
                        : "rgba(0,0,0,0.35)",
                    }}
                  >
                    <h3 className="text-[15px] font-medium leading-snug">
                      {step.title}
                    </h3>
                  </div>

                  {/* Description — only shown when active */}
                  <div
                    className="overflow-hidden transition-all duration-500"
                    style={{
                      maxHeight: isActive ? "100px" : "0px",
                      opacity: isActive ? 1 : 0,
                    }}
                  >
                    <p className="text-[13px] text-black/45 leading-relaxed pt-0.5">
                      {step.desc}
                    </p>
                    {/* Timer bar */}
                    <div className="mt-3 h-[2px] rounded-full bg-black/06 overflow-hidden w-full">
                      <div
                        className="h-full rounded-full bg-black/30 origin-left"
                        style={{
                          width: `${progress * 100}%`,
                          transition: paused ? "none" : "none",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: image panel */}
        <div className="flex-1 relative rounded-2xl overflow-hidden bg-black/[0.03] border border-black/[0.06] min-h-[440px]">
          {steps.map((step, i) => (
            <div
              key={step.n}
              className="absolute inset-0 transition-all duration-700"
              style={{
                opacity: active === i ? 1 : 0,
                transform: active === i ? "scale(1)" : "scale(1.02)",
                pointerEvents: active === i ? "auto" : "none",
              }}
            >
              <img
                src={STEP_IMAGES[i]}
                alt={step.title}
                className="w-full h-full object-cover"
              />
              {/* Bottom text overlay */}
              <div
                className="absolute bottom-0 left-0 right-0 p-8"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)",
                }}
              >
                <p className="text-white/90 text-[13px] font-light tracking-wide">
                  {step.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile: vertical stack with dotted line ──────────── */}
      <div className="flex md:hidden flex-col relative pl-10">
        <div className="absolute left-[15px] top-0 bottom-0 w-px bg-black/[0.07]" />

        {steps.map((step, i) => (
          <div key={step.n} className="relative mb-5 last:mb-0">
            {/* Node */}
            <div className="absolute -left-[34px] top-4 w-[30px] h-[30px] rounded-full border-2 border-black/15 bg-white flex items-center justify-center z-10">
              <span className="font-pixel text-[8px] text-black/35 tracking-widest">
                {step.n}
              </span>
            </div>

            <div className="rounded-2xl overflow-hidden border border-black/[0.07] bg-white">
              <div className="h-40 overflow-hidden">
                <img
                  src={STEP_IMAGES[i]}
                  alt={step.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-[15px] font-medium mb-1.5 leading-snug text-black/80">
                  {step.title}
                </h3>
                <p className="text-[12px] text-black/40 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── SVG icons ────────────────────────────────────────────────────────────────
function Icon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    trending_down: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
        <polyline points="17 18 23 18 23 12" />
      </svg>
    ),
    users: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    package: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="m16.5 9.4-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.29 7 12 12 20.71 7" />
        <line x1="12" y1="22" x2="12" y2="12" />
      </svg>
    ),
    clipboard: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <line x1="9" y1="12" x2="15" y2="12" />
        <line x1="9" y1="16" x2="13" y2="16" />
      </svg>
    ),
    pos: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    brain: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
      </svg>
    ),
    bell: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    calendar: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    chart: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    building: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
      </svg>
    ),
    percent: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <line x1="19" y1="5" x2="5" y2="19" />
        <circle cx="6.5" cy="6.5" r="2.5" />
        <circle cx="17.5" cy="17.5" r="2.5" />
      </svg>
    ),
    webhook: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2" />
        <path d="m6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06" />
        <path d="m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8" />
      </svg>
    ),
    check: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    quote: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
      </svg>
    ),
    sun: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    ),
    moon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  };
  return <>{icons[type] ?? null}</>;
}

// ─── Accordion item ──────────────────�����───��───────────────────────────────────
function AccordionItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-black/[0.06]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="text-sm font-light text-[#111] leading-relaxed group-hover:text-black transition-colors">
          {question}
        </span>
        <span
          className="shrink-0 w-5 h-5 rounded-full border border-black/10 flex items-center justify-center text-black/30 transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <line x1="5" y1="1" x2="5" y2="9" />
            <line x1="1" y1="5" x2="9" y2="5" />
          </svg>
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? "200px" : "0px", opacity: open ? 1 : 0 }}
      >
        <p className="pb-5 text-sm text-black/45 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

// ─── Translations ─────────────────────────────────────────────────────────────
const copy = {
  es: {
    heroLines: [
      "Gestión inteligente",
      { type: "break" as const },
      "para bares y",
      { type: "break" as const },
      "restaurantes.",
    ],
    heroSub:
      "Control de inventario, POS, reservas y proyecciones inteligentes en un solo lugar.",
    heroCta: "21 días gratis",
    heroDemo: "¿Cómo funciona?",
    problemTag: "EL PROBLEMA",
    problemTitle: "Lo que ya conoces.",
    problems: [
      {
        icon: "trending_down",
        title: "Mermas que nadie explica",
        desc: "Pérdidas de inventario sin rastro ni responsables claros.",
      },
      {
        icon: "users",
        title: "Staff sin cuentas claras",
        desc: "Turnos desorganizados y sin control de operaciones por rol.",
      },
      {
        icon: "package",
        title: "Inventario que nunca cuadra",
        desc: "Conteos manuales que no coinciden con las ventas reales.",
      },
      {
        icon: "clipboard",
        title: "Cotejar a mano",
        desc: "Cuadrar cuentas entre excel, notas a mano y sistemas de ventas.",
      },
    ],
    stepsTag: "FLUJO",
    stepsTitle: "Cómo funciona.",
    steps: [
      {
        n: "01",
        title: "Sube tu menú",
        desc: "La IA detecta y mapea tus insumos automáticamente. Sin perder horas en migraciones. Te lo ponemos fácil.",
      },
      {
        n: "02",
        title: "Tu equipo opera con roles y PIN",
        desc: "Control de acceso por nivel de responsabilidad.",
      },
      {
        n: "03",
        title: "Monitoreo de stock y merma de alta precisión",
        desc: "Notificaciones en tiempo real cuando algo no cuadra.",
      },
      {
        n: "04",
        title: "Tu POS se unifica con tu inventario",
        desc: "Cada venta descuenta insumos automáticamente. Sin doble captura, sin errores.",
      },
      {
        n: "05",
        title: "Ves proyecciones y ROI real",
        desc: "Datos accionables para tomar mejores decisiones.",
      },
    ],
    featuresTag: "FUNCIONALIDADES",
    featuresTitle: "Todo lo que necesitas.",
    featuresSub:
      "Una sola plataforma para inventario, ventas, reservas y análisis — diseñada para la operación real de bares y restaurantes.",
    features: [
      {
        icon: "pos",
        title: "POS con control por rol",
        desc: "Admin, jefe de piso, jefe de barra, mesero.",
      },
      {
        icon: "brain",
        title: "Menú con parser IA",
        desc: "Extrae insumos automáticamente de tu carta.",
      },
      {
        icon: "bell",
        title: "Alertas de stock",
        desc: "Sugerencias de pedido basadas en consumo.",
      },
      {
        icon: "calendar",
        title: "Reservaciones",
        desc: "Sync con OpenTable y otras plataformas.",
      },
      {
        icon: "chart",
        title: "Proyecciones y ROI",
        desc: "Calculadora de retorno de inversión real.",
      },
      {
        icon: "building",
        title: "Multi-sucursal",
        desc: "Consolidación para cadenas de restaurantes.",
      },
      {
        icon: "percent",
        title: "Sistema holístico",
        desc: "POS, Inventario automatizado, Diseñador de menus, Proyecciones inteligentes",
      },
      {
        icon: "webhook",
        title: "Webhooks seguros",
        desc: "Replay protection para integraciones de pago.",
      },
    ],
    stats: [
      { value: "-30%", label: "merma en 90 días" },
      { value: "+2 hrs", label: "al día libres para el dueño" },
      { value: "ROI+", label: "positivo desde mes 2" },
    ],
    statsCaveat: "*basado en casos piloto",
    pricingTag: "PRECIOS",
    pricingTitle: "Sin sorpresas.",
    pricingSub: "Cancela cuando quieras.",
    billingMonthly: "Mensual",
    billingAnnual: "Anual",
    plans: [
      {
        name: "Starter",
        monthly: "$1,899",
        annual: "$1,499",
        period: "MXN/mes",
        sub: "1 sucursal, 5 usuarios",
        features: [
          "Inventario básico",
          "POS básico",
          "Reportes estándar",
          "Soporte por email",
        ],
        cta: "Empezar gratis",
        stripeKey: "starter" as const,
        highlight: false,
        delay: 0,
      },
      {
        name: "Business",
        badge: "Más popular",
        monthly: "$3,499",
        annual: "$2,999",
        period: "MXN/mes",
        sub: "1 sucursal, 10 usuarios",
        features: [
          "Todo en Starter",
          "IA menú parser",
          "Reservaciones",
          "Alertas avanzadas",
          "Soporte prioritario",
        ],
        cta: "Empezar gratis",
        stripeKey: "business" as const,
        highlight: true,
        delay: 80,
      },
      {
        name: "Cadena",
        monthly: "desde $2,399",
        annual: "desde $2,399",
        period: "/sucursal/mes",
        sub: "2–5 sucursales",
        features: [
          "Todo en Business",
          "Consolidación multi-sucursal",
          "Reportes comparativos",
          "Account manager",
        ],
        cta: "Solicitar cotización",
        leadPlan: "cadena" as const,
        highlight: false,
        delay: 140,
      },
      {
        name: "Enterprise",
        monthly: "desde $4,500",
        annual: "desde $4,500",
        period: "base/mes",
        sub: "6+ sucursales, SLA",
        features: [
          "Todo en Cadena",
          "SLA garantizado",
          "Integraciones custom",
          "Onboarding dedicado",
        ],
        cta: "Contactar",
        leadPlan: "enterprise" as const,
        highlight: false,
        delay: 200,
      },
    ],
    testimonialsTag: "CLIENTES",
    testimonialsTitle: "Lo que dicen nuestros\nclientes.",
    testimonials: [
      {
        quote:
          "Redujimos las mermas un 35% en los primeros 3 meses. Ahora sé exactamente qué pasa en mi inventario.",
        name: "Ricardo Mendoza",
        role: "Operador",
        place: "Cantina La Reforma, CDMX",
      },
      {
        quote:
          "El parser de menú nos ahorró semanas de trabajo. La IA detectó todos los insumos de nuestra carta en minutos.",
        name: "María Elena Ruiz",
        role: "Gerente General",
        place: "Mariscos El Puerto, Monterrey",
      },
      {
        quote:
          "Por fin puedo irme tranquilo a casa. Las alertas me avisan si algo no cuadra en cualquiera de mis 4 sucursales.",
        name: "Carlos Vega",
        role: "Dueño",
        place: "Tacos Don Carlos, Guadalajara",
      },
    ],
    faqTag: "FAQ",
    faqTitle: "Preguntas frecuentes.",
    faqs: [
      {
        q: "¿Qué pasa tras los 21 días?",
        a: "Tu prueba gratuita se convierte automáticamente en el plan que elijas. Te avisamos 3 días antes para que decidas si continuar. Sin compromisos.",
      },
      {
        q: "¿Puedo cancelar cuando quiera?",
        a: "Sí, puedes cancelar en cualquier momento desde tu panel de control. No hay penalizaciones ni cargos ocultos.",
      },
      {
        q: "¿Funciona sin internet?",
        a: "Stttock tiene modo offline para el POS. Las ventas se sincronizan automáticamente cuando vuelve la conexión.",
      },
      {
        q: "¿Qué tan rápido se implementa?",
        a: "Con nuestra IA, la implementación toma minutos — lo que antes tomaba días o semanas. Solo importas el menú que ya tienes operando, confirmas y ajustas, y listo. Reducimos el tiempo de este proceso en un 95%, haciendo que la transición desde sistemas legacy sea rápida y sin fricciones.",
      },
      {
        q: "¿Cómo migro de mi sistema actual?",
        a: "Tan sencillo como importar el Excel con el que controlabas tu stock. Nuestro sistema se encarga de mapearlo y hacer el trabajo más pesado por ti.",
      },
      {
        q: "¿Facturan CFDI?",
        a: "Sí, emitimos facturas CFDI 4.0 con todos los requisitos fiscales mexicanos. Puedes solicitarlas desde tu panel.",
      },
      {
        q: "¿Necesito conocimientos técnicos para usarlo?",
        a: "No. La plataforma está diseñada para operadores de bares y restaurantes, no para técnicos. Desde el POS hasta las proyecciones, todo es visual e intuitivo. Si tienes dudas, nuestro equipo te acompaña.",
      },
      {
        q: "¿El soporte es en español?",
        a: "100% en español. Nuestro equipo de soporte está en México y entiende las necesidades locales del sector.",
      },
    ],
    ctaTitle: "Empieza hoy.",
    ctaSub: "21 días gratis, sin tarjeta.",
    ctaBtn: "CREAR CUENTA →",
    footerTagline: "Gestión inteligente para bares y restaurantes en México.",
    footerProduct: "Producto",
    footerProductLinks: ["Features", "Precios"],
    footerCompany: "Empresa",
    footerCompanyLinks: ["Sobre nosotros", "Contacto"],
    footerLegal: "Legal",
    footerLegalLinks: ["Términos", "Privacidad"],
    footerCopy: "© 2025 Stttock. Todos los derechos reservados.",
  },
  en: {
    heroLines: [
      "Intelligent management",
      { type: "break" as const },
      "for bars and",
      { type: "break" as const },
      "restaurants.",
    ],
    heroSub:
      "Inventory control, POS, reservations, and smart projections — all in one place.",
    heroCta: "30 days free",
    heroDemo: "See demo",
    problemTag: "THE PROBLEM",
    problemTitle: "What you already know.",
    problems: [
      {
        icon: "trending_down",
        title: "Unexplained shrinkage",
        desc: "Inventory losses with no trail and no accountability.",
      },
      {
        icon: "users",
        title: "Staff without clear accountability",
        desc: "Disorganized shifts with no role-based operation control.",
      },
      {
        icon: "package",
        title: "Inventory that never adds up",
        desc: "Manual counts that never match actual sales.",
      },
      {
        icon: "clipboard",
        title: "Manual reconciliation",
        desc: "Balancing accounts across Excel, handwritten notes, and sales systems.",
      },
    ],
    stepsTag: "FLOW",
    stepsTitle: "How it works.",
    steps: [
      {
        n: "01",
        title: "Upload your menu",
        desc: "AI automatically detects ingredients.",
      },
      {
        n: "02",
        title: "Your team operates with roles & PIN",
        desc: "Access control by responsibility level.",
      },
      {
        n: "03",
        title: "High-precision stock & shrinkage monitoring",
        desc: "Real-time notifications when something is off.",
      },
      {
        n: "04",
        title: "Your POS unifies with your inventory",
        desc: "Every sale automatically deducts ingredients. No double entry, no errors.",
      },
      {
        n: "05",
        title: "View projections and real ROI",
        desc: "Actionable data to make better decisions.",
      },
    ],
    featuresTag: "FEATURES",
    featuresTitle: "Everything you need.",
    featuresSub:
      "One platform for inventory, sales, reservations, and analytics — built for the real operation of bars and restaurants.",
    features: [
      {
        icon: "pos",
        title: "Role-based POS",
        desc: "Admin, floor manager, bar manager, waiter.",
      },
      {
        icon: "brain",
        title: "AI menu parser",
        desc: "Automatically extracts ingredients from your menu.",
      },
      {
        icon: "bell",
        title: "Stock alerts",
        desc: "Order suggestions based on consumption.",
      },
      {
        icon: "calendar",
        title: "Reservations",
        desc: "Sync with OpenTable and other platforms.",
      },
      {
        icon: "chart",
        title: "Projections & ROI",
        desc: "Real return-on-investment calculator.",
      },
      {
        icon: "building",
        title: "Multi-location",
        desc: "Consolidation for restaurant chains.",
      },
      {
        icon: "percent",
        title: "Holistic system",
        desc: "POS, automated inventory, menu designer, smart projections",
      },
      {
        icon: "webhook",
        title: "Secure webhooks",
        desc: "Replay protection for payment integrations.",
      },
    ],
    stats: [
      { value: "-30%", label: "shrinkage in 90 days" },
      { value: "+2 hrs", label: "freed per day for the owner" },
      { value: "ROI+", label: "positive from month 2" },
    ],
    statsCaveat: "*based on pilot cases",
    pricingTag: "PRICING",
    pricingTitle: "No surprises.",
    pricingSub: "Cancel anytime.",
    billingMonthly: "Monthly",
    billingAnnual: "Annual",
    plans: [
      {
        name: "Starter",
        monthly: "$1,899",
        annual: "$1,499",
        period: "MXN/mo",
        sub: "1 location, 5 users",
        features: [
          "Basic inventory",
          "Basic POS",
          "Standard reports",
          "Email support",
        ],
        cta: "Start free",
        stripeKey: "starter" as const,
        highlight: false,
        delay: 0,
      },
      {
        name: "Business",
        badge: "Most popular",
        monthly: "$3,499",
        annual: "$2,999",
        period: "MXN/mo",
        sub: "1 location, 10 users",
        features: [
          "Everything in Starter",
          "AI menu parser",
          "Reservations",
          "Advanced alerts",
          "Priority support",
        ],
        cta: "Start free",
        stripeKey: "business" as const,
        highlight: true,
        delay: 80,
      },
      {
        name: "Chain",
        monthly: "from $2,399",
        annual: "from $2,399",
        period: "/location/mo",
        sub: "2–5 locations",
        features: [
          "Everything in Business",
          "Multi-location consolidation",
          "Comparative reports",
          "Account manager",
        ],
        cta: "Request quote",
        leadPlan: "cadena" as const,
        highlight: false,
        delay: 140,
      },
      {
        name: "Enterprise",
        monthly: "from $4,500",
        annual: "from $4,500",
        period: "base/mo",
        sub: "6+ locations, SLA",
        features: [
          "Everything in Chain",
          "Guaranteed SLA",
          "Custom integrations",
          "Dedicated onboarding",
        ],
        cta: "Contact us",
        leadPlan: "enterprise" as const,
        highlight: false,
        delay: 200,
      },
    ],
    testimonialsTag: "CLIENTS",
    testimonialsTitle: "What our clients say.",
    testimonials: [
      {
        quote:
          "We reduced shrinkage by 35% in the first 3 months. Now I know exactly what's happening in my inventory.",
        name: "Ricardo Mendoza",
        role: "Operator",
        place: "Cantina La Reforma, CDMX",
      },
      {
        quote:
          "The menu parser saved us weeks of work. The AI detected all the ingredients from our menu in minutes.",
        name: "María Elena Ruiz",
        role: "General Manager",
        place: "Mariscos El Puerto, Monterrey",
      },
      {
        quote:
          "I can finally leave work at ease. Alerts notify me if anything is off at any of my 4 locations.",
        name: "Carlos Vega",
        role: "Owner",
        place: "Tacos Don Carlos, Guadalajara",
      },
    ],
    faqTag: "FAQ",
    faqTitle: "Frequently asked questions.",
    faqs: [
      {
        q: "What happens after 30 days?",
        a: "Your free trial automatically converts to the plan you choose. We notify you 3 days in advance. No commitments.",
      },
      {
        q: "Can I cancel anytime?",
        a: "Yes, you can cancel at any time from your dashboard. No penalties or hidden charges.",
      },
      {
        q: "Does it work offline?",
        a: "Stttock has an offline mode for the POS. Sales sync automatically when the connection is restored.",
      },
      {
        q: "How fast is the setup?",
        a: "Most of our clients are up and running in under 48 hours. Includes data migration and team training.",
      },
      {
        q: "How do I migrate from my current system?",
        a: "As simple as importing the Excel spreadsheet you used to track your stock. Our system maps it and does the heavy lifting for you.",
      },
      {
        q: "Do you issue invoices?",
        a: "Yes, we issue CFDI 4.0 invoices with all Mexican tax requirements. You can request them from your dashboard.",
      },
      {
        q: "Do I need technical knowledge to use it?",
        a: "No. The platform is built for bar and restaurant operators, not tech experts. From the POS to projections, everything is visual and intuitive. If you have questions, our team is here to help.",
      },
      {
        q: "Is support available in English?",
        a: "Our support team speaks both Spanish and English and understands the needs of the F&B industry.",
      },
    ],
    ctaTitle: "Start today.",
    ctaSub: "30 days free, no card required.",
    ctaBtn: "CREATE ACCOUNT →",
    footerTagline: "Intelligent management for bars and restaurants in Mexico.",
    footerProduct: "Product",
    footerProductLinks: ["Features", "Pricing"],
    footerCompany: "Company",
    footerCompanyLinks: ["About us", "Contact"],
    footerLegal: "Legal",
    footerLegalLinks: ["Terms", "Privacy"],
    footerCopy: "© 2025 Stttock. All rights reserved.",
  },
};

// ─── Main page ────────────────────────────────────────────────────────────────
export default function StttockPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const heroReady = true;
  const videoReady = true;
  const [billingAnnual, setBillingAnnual] = useState(false);
  const { lang } = useLang();
  const t = lang === "es" ? copy.es : copy.en;

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  // ─── Data from translations ────────────────────────────────────────────────
  const { problems, steps, features, stats, plans, testimonials, faqs } = t;

  return (
    <div className="bg-[#F5F4F0] text-[#111] min-h-screen font-sans antialiased">
      {/* ── STICKY NAV ────────────────────────────────────────────────────── */}
      <MobileNav />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative h-screen overflow-hidden">
        {/* Video background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9150545-hd_1920_1080_24fps-XUizsTD4O2M8GD1bjGYiFDNA2rMHD7.mp4"
          style={{
            transform: videoReady ? "scale(1.05)" : "scale(0.85)",
            transition: "transform 2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />

        {/* Progressive blur + gradient from bottom */}
        <div
          className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
          style={{
            height: "65%",
            background:
              "linear-gradient(to top, #F5F4F0 0%, #F5F4F0 18%, rgba(245,244,240,0.85) 35%, rgba(245,244,240,0.5) 55%, rgba(245,244,240,0.15) 75%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
          style={{
            height: "20%",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to top, black 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
          style={{
            height: "38%",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to top, black 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
          style={{
            height: "55%",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
            maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to top, black 0%, transparent 100%)",
          }}
        />

        <div className="h-20" />

        {/* Hero copy — bottom-left anchored */}
        <div className="absolute inset-x-0 bottom-0 z-30 flex flex-col px-6 md:px-12 pb-12 max-w-4xl">
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-white leading-[1.0] tracking-tight mb-6 min-h-[3em]"
            style={{
              fontFamily: "var(--font-outfit), system-ui, sans-serif",
              opacity: heroReady ? 1 : 0,
              transition: "opacity 600ms cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <TypewriterText
              startDelay={450}
              speed={55}
              eraseSpeed={25}
              holdAfterType={2200}
              holdAfterErase={500}
              loop
              segments={t.heroLines}
            />
          </h1>

          <p
            className="text-base text-black/50 leading-relaxed max-w-md mb-10"
            style={{
              fontFamily: '"IBM Plex Sans", sans-serif',
              opacity: heroReady ? 1 : 0,
              filter: heroReady ? "blur(0px)" : "blur(12px)",
              transform: heroReady ? "translateY(0px)" : "translateY(20px)",
              transition:
                "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 80ms, filter 0.9s cubic-bezier(0.16,1,0.3,1) 80ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) 80ms",
            }}
          >
            {t.heroSub}
          </p>

          <div
            className="flex flex-col sm:flex-row gap-3"
            style={{
              opacity: heroReady ? 1 : 0,
              transform: heroReady ? "translateY(0px)" : "translateY(20px)",
              transition:
                "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 160ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) 160ms",
            }}
          >
            <GlitchButton href="https://app.stttock.com/auth/login">
              {t.heroCta} <span className="ml-0.5">→</span>
            </GlitchButton>
            <a
              href="#como-funciona"
              className="inline-flex items-center justify-center px-7 py-3.5 border border-black/10 text-black/60 text-sm rounded-xl hover:border-black/25 hover:text-black hover:bg-black/[0.04] transition-all tracking-widest"
            >
              {t.heroDemo}
            </a>
          </div>
        </div>
      </section>

      {/* ── PROBLEM SECTION ───────────────────────────────────────────────── */}
      <section
        id="problema"
        className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0d0d0f 0%, #131318 60%, #0f0f14 100%)",
        }}
      >
        {/* ambient glow blobs */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          <div
            className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle, rgba(120,80,255,0.35) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-24 right-0 w-[500px] h-[500px] rounded-full opacity-15"
            style={{
              background:
                "radial-gradient(circle, rgba(60,180,255,0.3) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* header */}
          <div className="mb-16">
            <div className="mb-4">
              <span className="inline-block font-pixel text-[10px] tracking-[0.22em] text-white/30 px-3 py-1.5 rounded-full border border-white/10 uppercase">
                {t.problemTag}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05] text-white">
              {t.problemTitle}
            </h2>
          </div>

          {/* glass cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {problems.map((p, i) => (
              <div
                key={p.title}
                className={`group relative flex flex-col min-h-[240px] p-8 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1${i === problems.length - 1 && problems.length % 3 === 1 ? " md:col-start-2" : ""}`}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  boxShadow:
                    "0 4px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.07)",
                }}
              >
                {/* top highlight line */}
                <div
                  className="absolute inset-x-0 top-0 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
                  }}
                />

                {/* hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 0%, rgba(150,100,255,0.08) 0%, transparent 60%)",
                  }}
                />

                {/* icon */}
                <div
                  className="relative w-11 h-11 rounded-xl flex items-center justify-center mb-7 text-white/50"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
                  }}
                >
                  <Icon type={p.icon} />
                </div>

                <h3 className="text-xl font-light mb-3 leading-snug text-white/90">
                  {p.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mt-auto"
                  style={{ color: "rgba(255,255,255,0.38)" }}
                >
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section
        id="como-funciona"
        className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="mb-4">
              <Tag>{t.stepsTag}</Tag>
            </div>
            <RevealText className="text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              {t.stepsTitle}
            </RevealText>
          </div>

          <WorkflowSteps steps={steps} />
        </div>
      </section>

      {/* ── FEATURES GRID ─────────────────────────────────────────────────── */}
      <section
        id="features"
        className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
            <div>
              <div className="mb-4">
                <Tag>{t.featuresTag}</Tag>
              </div>
              <RevealText className="text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
                {t.featuresTitle}
              </RevealText>
            </div>
            <p className="text-sm text-black/45 leading-relaxed max-w-xs">
              {t.featuresSub}
            </p>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
            onMouseMove={handleMouse}
          >
            {features.map((f, i) => (
              <BentoCard
                key={f.title}
                sharp
                className="flex flex-col"
                delay={i * 50}
              >
                {/* 3D organic shape */}
                <div className="mx-3 mt-3 rounded-2xl overflow-hidden flex-shrink-0" style={{ height: "190px" }}>
                  <FeatureShape icon={f.icon} />
                </div>
                {/* Text */}
                <div className="px-5 py-4 flex flex-col flex-1">
                  <h3 className="text-base font-light mb-1.5 leading-snug">
                    {f.title}
                  </h3>
                  <p className="text-sm text-black/40 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAND ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-black/[0.06]">
        {/* Same hero video replayed as background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9150545-hd_1920_1080_24fps-XUizsTD4O2M8GD1bjGYiFDNA2rMHD7.mp4"
        />
        {/* Apple-style glass layer */}
        <div
          className="relative"
          style={{
            backdropFilter: "blur(48px) saturate(160%) brightness(1.08)",
            WebkitBackdropFilter: "blur(48px) saturate(160%) brightness(1.08)",
            background: "rgba(255,255,255,0.52)",
            borderTop: "1px solid rgba(255,255,255,0.65)",
            borderBottom: "1px solid rgba(255,255,255,0.40)",
          }}
        >
          <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              {stats.map((s, i) => {
                const { ref, inView } = useInView(0.2);
                return (
                  <div
                    key={s.value}
                    ref={ref}
                    className="flex flex-col items-center md:items-start text-center md:text-left"
                    style={{
                      opacity: inView ? 1 : 0,
                      transform: inView ? "translateY(0)" : "translateY(24px)",
                      transition: `opacity 0.7s ease ${i * 100}ms, transform 0.7s ease ${i * 100}ms`,
                    }}
                  >
                    <div
                      className="text-5xl md:text-6xl font-light text-[#111] tracking-tight mb-3"
                      style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
                    >
                      {s.value}
                    </div>
                    <div className="text-sm text-black/55 tracking-widest uppercase">
                      {s.label}
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-12 text-xs text-black/30 tracking-widest">
              {t.statsCaveat}
            </p>
          </div>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────────���───────── */}
      <section
        id="precios"
        className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-4 flex flex-col items-center">
            <div className="mb-4">
              <Tag>{t.pricingTag}</Tag>
            </div>
            <RevealText className="text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              {t.pricingTitle}
            </RevealText>
            <p className="mt-3 text-sm text-black/40 tracking-wide">
              {t.pricingSub}
            </p>
          </div>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-4 mt-10 mb-12">
            <span
              className={`text-sm transition-colors ${!billingAnnual ? "text-[#111]" : "text-black/35"}`}
            >
              {t.billingMonthly}
            </span>
            <button
              onClick={() => setBillingAnnual((v) => !v)}
              className="relative w-12 h-6 rounded-full border border-black/10 bg-white transition-colors"
            >
              <span
                className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-[#111] transition-transform duration-200"
                style={{
                  transform: billingAnnual
                    ? "translateX(24px)"
                    : "translateX(0)",
                }}
              />
            </button>
            <span
              className={`text-sm transition-colors ${billingAnnual ? "text-[#111]" : "text-black/35"}`}
            >
              Anual{" "}
              <span className="text-xs text-emerald-600 font-normal ml-1">
                –17%
              </span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {plans.map((plan) => (
              <PricingCard
                key={plan.name}
                plan={plan}
                billingAnnual={billingAnnual}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section
        id="testimonios"
        className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="mb-4">
              <Tag>CLIENTES</Tag>
            </div>
            <RevealText className="text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              {"Lo que dicen nuestros\nclientes."}
            </RevealText>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-3"
            onMouseMove={handleMouse}
          >
            {testimonials.map((t, i) => (
              <BentoCard
                key={t.name}
                className="p-8 flex flex-col"
                delay={i * 80}
              >
                <div className="mb-6 text-black/20">
                  <Icon type="quote" />
                </div>
                <p className="text-sm text-black/60 leading-relaxed flex-1 mb-8 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <div className="text-sm font-light text-[#111]">{t.name}</div>
                  <div className="text-xs text-black/35 mt-0.5">
                    {t.role} — {t.place}
                  </div>
                </div>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section
        id="faq"
        className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]"
      >
        <div className="max-w-3xl mx-auto">
          <div className="mb-16">
            <div className="mb-4">
              <Tag>FAQ</Tag>
            </div>
            <RevealText className="text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              {"Preguntas frecuentes."}
            </RevealText>
          </div>

          <div>
            {faqs.map((item, i) => (
              <AccordionItem
                key={i}
                index={i}
                question={item.q}
                answer={item.a}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="relative py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] overflow-hidden">
        <img
          src="/images/footer.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-full object-cover object-bottom pointer-events-none select-none"
          style={{ opacity: 0.85 }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            maskImage: "linear-gradient(to top, transparent 0%, black 55%)",
            WebkitMaskImage:
              "linear-gradient(to top, transparent 0%, black 55%)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgb(245,244,240) 0%, rgba(245,244,240,0.92) 18%, rgba(245,244,240,0.55) 35%, transparent 55%)",
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05] mb-4">
            Empieza hoy.
          </h2>
          <p className="text-sm text-black/45 leading-relaxed mb-10">
            21 días gratis, sin tarjeta.
          </p>
          <a
            href="https://app.stttock.com/auth/login"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#111] text-white text-sm rounded-xl hover:bg-[#333] transition-colors tracking-widest font-medium"
          >
            CREAR CUENTA →
          </a>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="py-12 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <img
              src="/logo-light.png"
              alt="Stttock"
              className="h-6 w-auto mb-5"
            />
            <p className="text-xs text-black/35 leading-relaxed">
              Gestión inteligente para bares y restaurantes en México.
            </p>
          </div>
          <div>
            <div className="text-[11px] tracking-widest text-black/25 uppercase mb-4">
              Producto
            </div>
            <ul className="space-y-2.5">
              {["Features", "Precios"].map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-xs text-black/45 hover:text-black transition-colors tracking-wide"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[11px] tracking-widest text-black/25 uppercase mb-4">
              Empresa
            </div>
            <ul className="space-y-2.5">
              {["Sobre nosotros", "Contacto"].map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-xs text-black/45 hover:text-black transition-colors tracking-wide"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[11px] tracking-widest text-black/25 uppercase mb-4">
              Legal
            </div>
            <ul className="space-y-2.5">
              {["Términos", "Privacidad"].map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-xs text-black/45 hover:text-black transition-colors tracking-wide"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-black/[0.04] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="text-xs text-black/20">
            © 2025 Stttock. Todos los derechos reservados.
          </span>
          <div className="flex items-center gap-1 text-xs text-black/25">
            <span>ES</span>
            <span className="mx-1 text-black/15">/</span>
            <span>EN</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
