"use client"

import { useEffect, useMemo, useState, type ReactNode } from "react"

type Segment = string | { text: string; type: "skip" } | { type: "break" }

type TypewriterTextProps = {
  /**
   * Segments that make up the sentence. Each segment can be:
   *  - a plain string: typed character-by-character
   *  - { text, type: "skip" }: inserted instantly
   *  - { type: "break" }: inserts a real <br />
   */
  segments: Segment[]
  /** Delay (ms) before the very first character is typed. */
  startDelay?: number
  /** Milliseconds per character while typing. */
  speed?: number
  /** Milliseconds per character while erasing (faster feels natural). */
  eraseSpeed?: number
  /** Pause after fully typed, before erasing starts. */
  holdAfterType?: number
  /** Pause after fully erased, before typing starts again. */
  holdAfterErase?: number
  /** Loop forever — type → hold → erase → hold → type … */
  loop?: boolean
  /** Show a blinking cursor at the current typing position. */
  showCursor?: boolean
  className?: string
  style?: React.CSSProperties
  onComplete?: () => void
}

type Token =
  | { kind: "char"; char: string }
  | { kind: "instant"; node: ReactNode }

/**
 * Typewriter effect that appends characters one at a time to simulate
 * a sentence being written in real time. When `loop` is true the content
 * is erased (right → left) and re-typed continuously.
 */
export function TypewriterText({
  segments,
  startDelay = 300,
  speed = 55,
  eraseSpeed = 28,
  holdAfterType = 1600,
  holdAfterErase = 500,
  loop = false,
  showCursor = true,
  className,
  style,
  onComplete,
}: TypewriterTextProps) {
  // Flatten segments → ordered token list (memoized so we don't recompute every render).
  const tokens: Token[] = useMemo(() => {
    const out: Token[] = []
    segments.forEach((seg, i) => {
      if (typeof seg === "string") {
        for (const ch of seg) out.push({ kind: "char", char: ch })
        return
      }
      if ("type" in seg && seg.type === "break") {
        out.push({ kind: "instant", node: <br key={`br-${i}`} /> })
        return
      }
      if ("type" in seg && seg.type === "skip") {
        out.push({ kind: "instant", node: <span key={`skip-${i}`}>{seg.text}</span> })
      }
    })
    return out
  }, [segments])

  // `count` = how many leading tokens are currently visible.
  const [count, setCount] = useState(0)
  const [phase, setPhase] = useState<"idle" | "typing" | "holdType" | "erasing" | "holdErase">("idle")

  // Kick off after the initial delay.
  useEffect(() => {
    const t = setTimeout(() => setPhase("typing"), startDelay)
    return () => clearTimeout(t)
  }, [startDelay])

  // Drive the animation based on the current phase.
  useEffect(() => {
    if (phase === "idle") return

    if (phase === "typing") {
      if (count >= tokens.length) {
        if (loop) {
          const t = setTimeout(() => setPhase("holdType"), 0)
          return () => clearTimeout(t)
        }
        onComplete?.()
        return
      }
      const token = tokens[count]
      const delay =
        token.kind === "instant"
          ? 30
          : Math.max(10, speed + (token.char === " " ? 0 : Math.random() * 30 - 15))
      const t = setTimeout(() => setCount((c) => c + 1), delay)
      return () => clearTimeout(t)
    }

    if (phase === "holdType") {
      const t = setTimeout(() => setPhase("erasing"), holdAfterType)
      return () => clearTimeout(t)
    }

    if (phase === "erasing") {
      if (count <= 0) {
        const t = setTimeout(() => setPhase("holdErase"), 0)
        return () => clearTimeout(t)
      }
      const token = tokens[count - 1]
      const delay = token.kind === "instant" ? 20 : eraseSpeed
      const t = setTimeout(() => setCount((c) => c - 1), delay)
      return () => clearTimeout(t)
    }

    if (phase === "holdErase") {
      const t = setTimeout(() => setPhase("typing"), holdAfterErase)
      return () => clearTimeout(t)
    }
  }, [phase, count, tokens, speed, eraseSpeed, holdAfterType, holdAfterErase, loop, onComplete])

  // Render only the leading `count` tokens.
  const visible = tokens.slice(0, count).map((tok, i) =>
    tok.kind === "instant" ? tok.node : <span key={`c-${i}`}>{tok.char}</span>
  )

  const ariaLabel = segments
    .map((s) => (typeof s === "string" ? s : "text" in s ? s.text : " "))
    .join("")

  return (
    <span className={className} style={style} aria-label={ariaLabel}>
      <span aria-hidden>{visible}</span>
      {showCursor && (
        <span
          aria-hidden
          className="inline-block w-[0.08em] align-[-0.08em] ml-[0.04em]"
          style={{
            height: "0.9em",
            background: "currentColor",
            animation: "tw-caret 0.9s steps(1) infinite",
            verticalAlign: "baseline",
          }}
        />
      )}
      <style jsx>{`
        @keyframes tw-caret {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </span>
  )
}
