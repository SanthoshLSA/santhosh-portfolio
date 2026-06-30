"use client";

import * as React from "react";

interface Particle {
  type: "sparkle" | "explosion";
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
}

export default function FireworkParticles() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const particlesRef = React.useRef<Particle[]>([]);
  const requestRef = React.useRef<number | null>(null);
  const isMouseDownRef = React.useRef(false);
  const updateRef = React.useRef<() => void>(() => {});

  // Sync canvas size to document height & window width
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

  const updateAndDraw = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const particles = particlesRef.current;
    if (particles.length === 0 && !isMouseDownRef.current) {
      requestRef.current = null;
      return; // Stop loop when idle
    }

    const nextParticles: Particle[] = [];

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      if (p.type === "sparkle") {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.05;
      } else {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96; // Friction
        p.vy = p.vy * 0.96 + 0.03; // Gravity + friction
        p.alpha -= 0.012;
      }

      if (p.alpha > 0) {
        nextParticles.push(p);

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      }
    }

    particlesRef.current = nextParticles;
    requestRef.current = requestAnimationFrame(updateRef.current);
  }, []);

  React.useEffect(() => {
    updateRef.current = updateAndDraw;
  }, [updateAndDraw]);

  React.useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Locate closest SVG symbol/icon
      const svg = target.closest("svg");
      if (svg) {
        // Toggle the outline glow flare class
        svg.classList.remove("svg-flare-active");
        // Force reflow to re-trigger animation
        void svg.getBoundingClientRect();
        svg.classList.add("svg-flare-active");
        
        svg.addEventListener(
          "animationend",
          () => {
            svg.classList.remove("svg-flare-active");
          },
          { once: true }
        );
      }

      // Skip normal firework initialization if hitting interactive blocks
      if (
        target.closest(
          "a, button, input, textarea, select, iframe, [role='button'], .cursor-pointer, .frosted-glass-hover"
        )
      ) {
        return;
      }

      isMouseDownRef.current = true;

      if (requestRef.current === null) {
        requestRef.current = requestAnimationFrame(updateRef.current);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDownRef.current) return;

      const colors = ["#a855f7", "#c084fc", "#d8b4fe", "#ffffff", "#f5d0fe"];
      const particles = particlesRef.current;

      for (let i = 0; i < 2; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.2 + Math.random() * 0.5;
        particles.push({
          type: "sparkle",
          x: e.clientX,
          y: e.clientY + window.scrollY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 2.5 + Math.random() * 2,
          alpha: 0.8,
        });
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!isMouseDownRef.current) return;
      isMouseDownRef.current = false;

      const colors = ["#a855f7", "#c084fc", "#d8b4fe", "#ffffff", "#f5d0fe"];
      const particles = particlesRef.current;
      const count = 70 + Math.floor(Math.random() * 20);

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 3.5;
        particles.push({
          type: "explosion",
          x: e.clientX,
          y: e.clientY + window.scrollY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 6 + Math.random() * 8,
          alpha: 1,
        });
      }
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [resizeCanvas]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-50"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
