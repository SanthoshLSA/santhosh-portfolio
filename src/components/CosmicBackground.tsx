"use client";

import * as React from "react";

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

    // Star Count
    const starCount = Math.floor((window.innerWidth * docHeight) / 18000);
    const stars: Star[] = [];
    for (let i = 0; i < Math.min(starCount, 450); i++) {
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

    // Track scroll speed and direction
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollYRef.current;
    lastScrollYRef.current = currentScrollY;

    // Smoothly decay scroll velocity toward 0
    scrollVelocityRef.current = scrollVelocityRef.current * 0.85 + scrollDelta * 0.15;
    const v = scrollVelocityRef.current;

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
        ctx.strokeStyle = `rgba(168, 85, 247, ${Math.min(Math.abs(v) * 0.035, 0.45)})`;
        ctx.lineWidth = star.size * 0.95;
        ctx.stroke();
      }

      // Draw standard star core
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(168, 85, 247, ${0.12 + star.size * 0.18})`;
      ctx.fill();
    }

    // Connect stars close to each other
    ctx.strokeStyle = "rgba(168, 85, 247, 0.06)";
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
    if (Math.random() < 0.005 && shootingStars.length < 3) {
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

        ctx.save();
        const trailX = s.x - s.vx * (s.len / s.speed);
        const trailY = s.y - s.vy * (s.len / s.speed);

        const gradient = ctx.createLinearGradient(s.x, s.y, trailX, trailY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${s.alpha})`);
        gradient.addColorStop(0.2, `rgba(192, 132, 252, ${s.alpha * 0.8})`);
        gradient.addColorStop(1, "rgba(168, 85, 247, 0)");

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(trailX, trailY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.8;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#c084fc";
        ctx.stroke();
        ctx.restore();
      }
    }
    shootingStarsRef.current = nextShootingStars;

    requestRef.current = requestAnimationFrame(updateRef.current);
  }, []);

  React.useEffect(() => {
    updateRef.current = updateAndDraw;
  }, [updateAndDraw]);

  React.useEffect(() => {
    if (window.innerWidth < 768) return;

    resizeCanvas();
    initStars();

    // Initialize scroll coords on mount
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

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 hidden md:block"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
