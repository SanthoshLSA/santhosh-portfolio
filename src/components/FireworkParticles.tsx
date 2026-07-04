"use client";

import * as React from "react";
import type { FireworkPreset } from "./FireworkSettings";

interface Particle {
  type: "sparkle" | "explosion";
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  shape: "circle" | "square" | "teardrop";
  history?: { x: number; y: number }[];
}

const PRESETS: Record<
  FireworkPreset,
  {
    colors: string[];
    sparkColors: string[];
    count: () => number;
    speed: () => number;
    size: () => number;
    shape: "circle" | "square" | "teardrop";
    decayRate: number;
    friction: number;
    gravity: number;
    trailLen: number;
  }
> = {
  cosmic: {
    colors: ["#a855f7", "#c084fc", "#d8b4fe", "#ffffff", "#f5d0fe"],
    sparkColors: ["#a855f7", "#c084fc", "#ffffff"],
    count: () => 50 + Math.floor(Math.random() * 15),
    speed: () => 1.8 + Math.random() * 4.2,
    size: () => 4 + Math.random() * 6,
    shape: "circle",
    decayRate: 0.009,
    friction: 0.97,
    gravity: 0.06,
    trailLen: 12,
  },
  inferno: {
    colors: ["#ef4444", "#f97316", "#fbbf24", "#fef08a", "#dc2626"],
    sparkColors: ["#f97316", "#fbbf24", "#ef4444"],
    count: () => 70 + Math.floor(Math.random() * 20),
    speed: () => 2.5 + Math.random() * 5.5,
    size: () => 3 + Math.random() * 5,
    shape: "teardrop",
    decayRate: 0.013,
    friction: 0.96,
    gravity: 0.1,
    trailLen: 9,
  },
  matrix: {
    colors: ["#22c55e", "#4ade80", "#86efac", "#00ffcc", "#d9f99d"],
    sparkColors: ["#22c55e", "#4ade80", "#00ffcc"],
    count: () => 40 + Math.floor(Math.random() * 10),
    speed: () => 1.2 + Math.random() * 2.8,
    size: () => 5 + Math.random() * 7,
    shape: "square",
    decayRate: 0.007,
    friction: 0.985,
    gravity: 0.025,
    trailLen: 16,
  },
};

export default function FireworkParticles() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const particlesRef = React.useRef<Particle[]>([]);
  const requestRef = React.useRef<number | null>(null);
  const isMouseDownRef = React.useRef(false);
  const updateRef = React.useRef<() => void>(() => {});
  const presetRef = React.useRef<FireworkPreset>("cosmic");

  const resizeCanvas = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      window.innerHeight
    );
  }, []);

  const drawParticle = React.useCallback(
    (ctx: CanvasRenderingContext2D, p: Particle) => {
      if (p.shape === "square") {
        const s = p.size;
        ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    },
    []
  );

  const updateAndDraw = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const particles = particlesRef.current;
    if (particles.length === 0 && !isMouseDownRef.current) {
      requestRef.current = null;
      return;
    }

    const nextParticles: Particle[] = [];
    const preset = PRESETS[presetRef.current];

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      if (p.type === "sparkle") {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.05;
      } else {
        if (!p.history) p.history = [];
        p.history.push({ x: p.x, y: p.y });
        if (p.history.length > preset.trailLen) p.history.shift();

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= preset.friction;
        p.vy = p.vy * preset.friction + preset.gravity;
        p.alpha -= preset.decayRate;
      }

      if (p.alpha > 0) {
        nextParticles.push(p);

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.strokeStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;

        // Draw trail
        if (p.type === "explosion" && p.history && p.history.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.history[0].x, p.history[0].y);
          for (let h = 1; h < p.history.length; h++) {
            ctx.lineTo(p.history[h].x, p.history[h].y);
          }
          ctx.lineWidth = p.shape === "square" ? p.size * 0.3 : p.size * 0.45;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.stroke();
        }

        // Draw core
        drawParticle(ctx, p);
        ctx.restore();
      }
    }

    particlesRef.current = nextParticles;
    requestRef.current = requestAnimationFrame(updateRef.current);
  }, [drawParticle]);

  React.useEffect(() => {
    updateRef.current = updateAndDraw;
  }, [updateAndDraw]);

  React.useEffect(() => {
    if (window.innerWidth < 768) return;

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Listen for preset changes
    const handlePresetChange = (e: Event) => {
      presetRef.current = (e as CustomEvent<FireworkPreset>).detail;
    };
    window.addEventListener("firework-preset", handlePresetChange);

    const handleMouseDown = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      const target = e.target as HTMLElement;

      const svg = target.closest("svg");
      if (svg) {
        svg.classList.remove("svg-flare-active");
        void svg.getBoundingClientRect();
        svg.classList.add("svg-flare-active");
        svg.addEventListener("animationend", () => svg.classList.remove("svg-flare-active"), { once: true });
      }

      if (target.closest("a, button, input, textarea, select, iframe, [role='button'], .cursor-pointer, .frosted-glass-hover")) return;

      isMouseDownRef.current = true;
      if (requestRef.current === null) {
        requestRef.current = requestAnimationFrame(updateRef.current);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768 || !isMouseDownRef.current) return;
      const preset = PRESETS[presetRef.current];

      for (let i = 0; i < 2; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.2 + Math.random() * 0.5;
        particlesRef.current.push({
          type: "sparkle",
          x: e.clientX,
          y: e.clientY + window.scrollY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: preset.sparkColors[Math.floor(Math.random() * preset.sparkColors.length)],
          size: 2.5 + Math.random() * 2,
          alpha: 0.8,
          shape: preset.shape,
        });
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (window.innerWidth < 768 || !isMouseDownRef.current) return;
      isMouseDownRef.current = false;

      const preset = PRESETS[presetRef.current];
      const count = preset.count();
      const maxAllowedParticles = 200;

      if (particlesRef.current.length + count > maxAllowedParticles) {
        const excess = particlesRef.current.length + count - maxAllowedParticles;
        particlesRef.current = particlesRef.current.slice(excess);
      }

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = preset.speed();
        particlesRef.current.push({
          type: "explosion",
          x: e.clientX,
          y: e.clientY + window.scrollY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: preset.colors[Math.floor(Math.random() * preset.colors.length)],
          size: preset.size(),
          alpha: 1,
          shape: preset.shape,
          history: [],
        });
      }
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("firework-preset", handlePresetChange);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [resizeCanvas]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-50 hidden md:block"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
