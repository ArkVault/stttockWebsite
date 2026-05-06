"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  hue: number; // 200–230 = blue range, 0 = gray
}

export function FeatureBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = 0;
    let H = 0;
    const particles: Particle[] = [];
    const COUNT = 72;
    const MAX_DIST = 130;

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
    };

    const spawn = (): Particle => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.6,
      alpha: Math.random() * 0.5 + 0.2,
      hue: Math.random() > 0.4 ? Math.random() * 30 + 200 : -1, // blue or gray
    });

    resize();
    for (let i = 0; i < COUNT; i++) particles.push(spawn());

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Update + draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle =
          p.hue >= 0
            ? `hsla(${p.hue}, 80%, 68%, ${p.alpha})`
            : `rgba(148, 163, 184, ${p.alpha})`;
        ctx.fill();
      }

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const t = 1 - dist / MAX_DIST;
            // Blend color toward blue when both particles are blue-hued
            const bothBlue = a.hue >= 0 && b.hue >= 0;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = bothBlue
              ? `rgba(125, 211, 252, ${t * 0.18})`
              : `rgba(148, 163, 184, ${t * 0.1})`;
            ctx.lineWidth = t * 0.8;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    const ro = new ResizeObserver(() => { resize(); });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
    />
  );
}
