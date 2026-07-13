"use client";

import * as React from "react";
import { useTheme } from "next-themes";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  speed: number;
}

export default function LightModeBackground() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const particlesRef = React.useRef<Particle[]>([]);
  const requestRef = React.useRef<number | null>(null);
  const { resolvedTheme } = useTheme();

  const isLight = resolvedTheme === "light";

  const initParticles = React.useCallback(() => {
    if (window.innerWidth < 768) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      window.innerHeight
    );

    const count = Math.floor((window.innerWidth * canvas.height) / 30000);
    const particles: Particle[] = [];
    
    for (let i = 0; i < Math.min(count, 100); i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15 - 0.2, // Drift upwards slightly
        size: Math.random() * 3.5 + 1.5,
        alpha: Math.random() * 0.6 + 0.3,
        speed: Math.random() * 0.01 + 0.005,
      });
    }
    particlesRef.current = particles;
  }, []);

  const updateAndDraw = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const particles = particlesRef.current;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.x += p.vx;
      p.y += p.vy;
      
      // Wobble effect
      p.x += Math.sin(Date.now() * p.speed) * 0.2;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(168, 85, 247, ${p.alpha})`; // Light purple dust
      ctx.fill();
    }

    requestRef.current = requestAnimationFrame(updateAndDraw);
  }, []);

  React.useEffect(() => {
    if (window.innerWidth < 768) return;

    initParticles();
    requestRef.current = requestAnimationFrame(updateAndDraw);

    const handleResize = () => {
      initParticles();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [initParticles, updateAndDraw]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-0 hidden md:block mix-blend-multiply transition-opacity duration-1000 ${isLight ? 'opacity-100' : 'opacity-0'}`}
    />
  );
}
