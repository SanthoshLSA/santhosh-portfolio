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
  history?: { x: number; y: number }[]; // Pos history for trails
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
        // Log position history for trails
        if (!p.history) p.history = [];
        p.history.push({ x: p.x, y: p.y });
        if (p.history.length > 12) {
          p.history.shift();
        }

        // Apply velocities
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97; // Slightly less friction for longer spread
        p.vy = p.vy * 0.97 + 0.06; // Gravity arcs down faster
        p.alpha -= 0.009; // Slower decay so trails stretch longer
      }

      if (p.alpha > 0) {
        nextParticles.push(p);

        ctx.save();
        ctx.globalAlpha = p.alpha;

        if (p.type === "explosion" && p.history && p.history.length > 1) {
          // Draw classic long firework trail
          ctx.beginPath();
          ctx.moveTo(p.history[0].x, p.history[0].y);
          for (let h = 1; h < p.history.length; h++) {
            ctx.lineTo(p.history[h].x, p.history[h].y);
          }
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size * 0.45;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
          ctx.stroke();
        }

        // Draw particle core
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
    // Disable all calculations completely on mobile viewports
    if (window.innerWidth < 768) return;

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseDown = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      const target = e.target as HTMLElement;

      const svg = target.closest("svg");
      if (svg) {
        svg.classList.remove("svg-flare-active");
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
      if (window.innerWidth < 768 || !isMouseDownRef.current) return;

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
      if (window.innerWidth < 768 || !isMouseDownRef.current) return;
      isMouseDownRef.current = false;

      const colors = ["#a855f7", "#c084fc", "#d8b4fe", "#ffffff", "#f5d0fe"];
      const particles = particlesRef.current;
      const count = 70 + Math.floor(Math.random() * 20);

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.8 + Math.random() * 4.2;
        particles.push({
          type: "explosion",
          x: e.clientX,
          y: e.clientY + window.scrollY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 5 + Math.random() * 7,
          alpha: 1,
          history: [],
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
      className="pointer-events-none absolute inset-0 z-50 hidden md:block"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
