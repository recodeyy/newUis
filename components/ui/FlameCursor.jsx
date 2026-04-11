"use client";
import { useEffect, useRef } from "react";

export function FlameCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use willReadFrequently: false + alpha: true for best GPU path
    const ctx = canvas.getContext("2d", { alpha: true });

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
    };
    window.addEventListener("resize", onResize);

    const particles = [];
    const MAX_PARTICLES = 40; // hard cap — prevents unbounded growth
    let mouseX = W / 2, mouseY = H / 2;
    let lastSpawn = 0;

    // Throttled mousemove — spawn max once per 40ms (25fps spawn rate)
    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Only spawn outside hero (hero = first 100vh when scrolled near top)
      const heroHeight = window.innerHeight;
      const inHero = (window.scrollY + e.clientY) < heroHeight;
      if (inHero) return;

      const now = performance.now();
      if (now - lastSpawn < 40) return; // throttle to 25 spawns/sec max
      lastSpawn = now;

      if (particles.length >= MAX_PARTICLES) return; // hard cap

      // Spawn only 2 particles per event (was 4)
      for (let i = 0; i < 2; i++) {
        particles.push({
          x:     mouseX + (Math.random() - 0.5) * 10,
          y:     mouseY + (Math.random() - 0.5) * 10,
          vx:    (Math.random() - 0.5) * 0.8,
          vy:    -(Math.random() * 1.8 + 0.8),
          life:  1,
          decay: Math.random() * 0.03 + 0.02,
          size:  Math.random() * 10 + 5,
          // Pre-compute color strings to avoid per-frame string building
          hue:   Math.floor(Math.random() * 60 + 200),
        });
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x    += p.vx;
        p.y    += p.vy;
        p.vy   -= 0.03;
        p.vx   *= 0.97;
        p.life -= p.decay;
        p.size *= 0.985;

        if (p.life <= 0) { particles.splice(i, 1); continue; }

        // Single-stop radial gradient (2 stops instead of 3) — 33% fewer GPU ops per particle
        const alpha = Math.min(p.life * 0.65, 0.65);
        const grad  = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        grad.addColorStop(0, `hsla(${p.hue}, 80%, 65%, ${alpha.toFixed(2)})`);
        grad.addColorStop(1, `hsla(${p.hue + 40}, 60%, 40%, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Skip rAF if no particles — don't burn GPU when idle
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      // Removed mixBlendMode:screen — it forces a full GPU composite layer on a full-page canvas
    />
  );
}
