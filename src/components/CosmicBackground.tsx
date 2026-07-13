"use client";

import * as React from "react";
import { useTheme } from "next-themes";

interface Star {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  len: number;
  speed: number;
  alpha: number;
}

export default function CosmicBackground() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const starsRef = React.useRef<Star[]>([]);
  const shootingStarsRef = React.useRef<ShootingStar[]>([]);
  const mouseRef = React.useRef({ x: -1000, y: -1000 });
  const lastScrollYRef = React.useRef(0);
  const scrollVelocityRef = React.useRef(0);
  const requestRef = React.useRef<number | null>(null);
  const updateRef = React.useRef<() => void>(() => {});
  const { resolvedTheme } = useTheme();

  const isLight = resolvedTheme === "light";

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

  const initStars = React.useCallback(() => {
    if (window.innerWidth < 768) return; // Skip mobile
    const canvas = canvasRef.current;
    const docHeight = canvas
      ? canvas.height
      : Math.max(
          document.documentElement.scrollHeight,
          document.body.scrollHeight,
          window.innerHeight
        );

    // OPTIMIZATION: Reduced max stars from 450 to 180 for low-power GPUs
    const starCount = Math.floor((window.innerWidth * docHeight) / 25000);
    const stars: Star[] = [];
    for (let i = 0; i < Math.min(starCount, 180); i++) {
      const rx = Math.random() * window.innerWidth;
      const ry = Math.random() * docHeight;
      stars.push({
        x: rx,
        y: ry,
        baseX: rx,
        baseY: ry,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        size: 1 + Math.random() * 1.5,
      });
    }
    starsRef.current = stars;
  }, []);

  const updateAndDraw = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const stars = starsRef.current;
    const shootingStars = shootingStarsRef.current;
    const mouse = mouseRef.current;

    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollYRef.current;
    lastScrollYRef.current = currentScrollY;

    scrollVelocityRef.current = scrollVelocityRef.current * 0.85 + scrollDelta * 0.15;
    const v = scrollVelocityRef.current;

    // Theme dependent alphas
    const baseAlpha = isLight ? 0.35 : 0.15;
    const connAlpha = isLight ? 0.12 : 0.06;

    // OPTIMIZATION: Set global styles once instead of save/restore in loops
    ctx.lineCap = "round";

    // --- Render constellations stars ---
    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];

      star.baseX += star.vx;
      star.baseY += star.vy;

      if (star.baseX < 0) star.baseX = canvas.width;
      if (star.baseX > canvas.width) star.baseX = 0;
      if (star.baseY < 0) star.baseY = canvas.height;
      if (star.baseY > canvas.height) star.baseY = 0;

      let targetX = star.baseX;
      let targetY = star.baseY;

      const dx = mouse.x - targetX;
      const dy = (mouse.y + window.scrollY) - targetY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const repulseDist = 120;

      if (dist < repulseDist) {
        const force = (repulseDist - dist) / repulseDist;
        const angle = Math.atan2(dy, dx);
        targetX -= Math.cos(angle) * force * 15;
        targetY -= Math.sin(angle) * force * 15;
      }

      star.x += (targetX - star.x) * 0.08;
      star.y += (targetY - star.y) * 0.08;

      // Draw star trail if scrolling
      if (Math.abs(v) > 0.4) {
        const maxTrailLen = 18;
        const trailLength = Math.max(Math.min(v * 0.8, maxTrailLen), -maxTrailLen);
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x, star.y + trailLength);
        ctx.strokeStyle = `rgba(168, 85, 247, ${Math.min(Math.abs(v) * 0.035, baseAlpha + 0.2)})`;
        ctx.lineWidth = star.size * 0.95;
        ctx.stroke();
      }

      // Draw standard star core
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(168, 85, 247, ${baseAlpha + star.size * 0.15})`;
      ctx.fill();
    }

    // Connect stars close to each other
    ctx.strokeStyle = `rgba(168, 85, 247, ${connAlpha})`;
    ctx.lineWidth = 0.8;
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const s1 = stars[i];
        const s2 = stars[j];
        const dx = s1.x - s2.x;
        const dy = s1.y - s2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(s1.x, s1.y);
          ctx.lineTo(s2.x, s2.y);
          ctx.stroke();
        }
      }
    }

    // --- Spawn Shooting Stars ---
    if (Math.random() < 0.018 && shootingStars.length < 3) {
      const startX = Math.random() * canvas.width;
      const startY = Math.random() * (canvas.height * 0.85);
      const speed = 10 + Math.random() * 8;
      const angle = Math.PI / 6 + Math.random() * (Math.PI / 10);
      shootingStars.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len: 70 + Math.random() * 90,
        speed: speed,
        alpha: 1.0,
      });
    }

    // --- Render Shooting Stars ---
    const nextShootingStars: ShootingStar[] = [];
    for (let i = 0; i < shootingStars.length; i++) {
      const s = shootingStars[i];
      s.x += s.vx;
      s.y += s.vy;
      s.alpha -= 0.025;

      if (s.alpha > 0 && s.x < canvas.width && s.y < canvas.height) {
        nextShootingStars.push(s);

        const trailX = s.x - s.vx * (s.len / s.speed);
        const trailY = s.y - s.vy * (s.len / s.speed);

        // OPTIMIZATION: Replace expensive linearGradient and shadowBlur with simple path stroking
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(trailX, trailY);
        // Use a simpler solid color with dynamic alpha instead of a heavy gradient calculation per frame
        ctx.strokeStyle = `rgba(168, 85, 247, ${s.alpha * (isLight ? 0.8 : 0.6)})`;
        ctx.lineWidth = 2.0;
        ctx.stroke();
      }
    }
    shootingStarsRef.current = nextShootingStars;

    requestRef.current = requestAnimationFrame(updateRef.current);
  }, [isLight]);

  React.useEffect(() => {
    updateRef.current = updateAndDraw;
  }, [updateAndDraw]);

  React.useEffect(() => {
    if (window.innerWidth < 768) return;

    resizeCanvas();
    initStars();

    lastScrollYRef.current = window.scrollY;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const handleResize = () => {
      resizeCanvas();
      initStars();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    requestRef.current = requestAnimationFrame(updateRef.current);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [resizeCanvas, initStars]);

  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null;
  }

  // OPTIMIZATION: Removed mixBlendMode: "screen" which causes severe GPU composition lag.
  // The dark purple canvas alpha math was adjusted to natively simulate the overlap without needing the blend mode.
  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-0 hidden md:block transition-opacity duration-1000 ${isLight ? 'opacity-0' : 'opacity-60'}`}
    />
  );
}
