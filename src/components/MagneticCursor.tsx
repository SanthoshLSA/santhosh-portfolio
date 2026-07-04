"use client";

import * as React from "react";
import type { FireworkPreset } from "./FireworkSettings";

export default function MagneticCursor() {
  const dotRef = React.useRef<HTMLDivElement | null>(null);
  const ringRef = React.useRef<HTMLDivElement | null>(null);

  const mouseCoords = React.useRef({ x: 0, y: 0 });
  const ringCoords = React.useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const isHoveredRef = React.useRef(false);
  const [preset, setPreset] = React.useState<FireworkPreset>("cosmic");

  // Preset color/ring config
  const presetConfig: Record<
    FireworkPreset,
    {
      ringIdle: string;
      ringHover: string;
      dotColor: string;
      glow: string;
      glowHover: string;
    }
  > = {
    cosmic: {
      ringIdle: "border-purple-400/50 shadow-[0_0_8px_rgba(168,85,247,0.15)]",
      ringHover: "border-purple-400 bg-purple-400/10 shadow-[0_0_20px_rgba(168,85,247,0.4)]",
      dotColor: "bg-purple-400",
      glow: "shadow-[0_0_4px_rgba(168,85,247,0.8)]",
      glowHover: "shadow-[0_0_8px_rgba(168,85,247,1)]",
    },
    inferno: {
      ringIdle: "border-orange-400/50 shadow-[0_0_8px_rgba(249,115,22,0.15)]",
      ringHover: "border-orange-400 bg-orange-400/10 shadow-[0_0_20px_rgba(249,115,22,0.4)]",
      dotColor: "bg-orange-400",
      glow: "shadow-[0_0_4px_rgba(249,115,22,0.8)]",
      glowHover: "shadow-[0_0_8px_rgba(249,115,22,1)]",
    },
    matrix: {
      ringIdle: "border-green-400/50 shadow-[0_0_8px_rgba(34,197,94,0.15)]",
      ringHover: "border-green-400 bg-green-400/10 shadow-[0_0_20px_rgba(34,197,94,0.4)]",
      dotColor: "bg-green-400",
      glow: "shadow-[0_0_4px_rgba(34,197,94,0.8)]",
      glowHover: "shadow-[0_0_8px_rgba(34,197,94,1)]",
    },
  };

  React.useEffect(() => {
    if (window.innerWidth < 768) return;
    document.documentElement.classList.add("custom-cursor-active");

    const handleMouseMove = (e: MouseEvent) => {
      mouseCoords.current.x = e.clientX;
      mouseCoords.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = target.closest(
          "a, button, [role='button'], input, textarea, select, svg, .cursor-pointer"
        );
        const hovered = !!isInteractive;
        setIsHovered(hovered);
        isHoveredRef.current = hovered;
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    const handlePresetChange = (e: Event) => {
      setPreset((e as CustomEvent<FireworkPreset>).detail);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("firework-preset", handlePresetChange);

    let animId: number;
    const animate = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (dot && ring) {
        const scaleVal = isHoveredRef.current ? 1.3 : 1.0;
        dot.style.transform = `translate3d(${mouseCoords.current.x}px, ${mouseCoords.current.y}px, 0) translate(-50%, -50%) scale(${scaleVal})`;

        const ease = 0.15;
        ringCoords.current.x += (mouseCoords.current.x - ringCoords.current.x) * ease;
        ringCoords.current.y += (mouseCoords.current.y - ringCoords.current.y) * ease;
        ring.style.transform = `translate3d(${ringCoords.current.x}px, ${ringCoords.current.y}px, 0) translate(-50%, -50%)`;
      }
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("firework-preset", handlePresetChange);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (typeof window !== "undefined" && window.innerWidth < 768) return null;

  const cfg = presetConfig[preset];

  return (
    <>
      {/* Crosshair reticle — shape changes per preset */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[55] transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ width: "20px", height: "20px" }}
      >
        {/* ── COSMIC: classic 4-tick crosshair ── */}
        {preset === "cosmic" && (
          <>
            <div className={`absolute top-0 left-1/2 w-[1.5px] h-[5px] ${cfg.dotColor} -translate-x-1/2`} />
            <div className={`absolute bottom-0 left-1/2 w-[1.5px] h-[5px] ${cfg.dotColor} -translate-x-1/2`} />
            <div className={`absolute left-0 top-1/2 h-[1.5px] w-[5px] ${cfg.dotColor} -translate-y-1/2`} />
            <div className={`absolute right-0 top-1/2 h-[1.5px] w-[5px] ${cfg.dotColor} -translate-y-1/2`} />
            <div className={`absolute top-1/2 left-1/2 w-[2px] h-[2px] ${cfg.dotColor} rounded-full -translate-x-1/2 -translate-y-1/2 ${isHovered ? cfg.glowHover : cfg.glow}`} />
          </>
        )}

        {/* ── INFERNO: diagonal × cross ── */}
        {preset === "inferno" && (
          <>
            <div
              className={`absolute top-1/2 left-1/2 w-[16px] h-[1.5px] ${cfg.dotColor} -translate-x-1/2 -translate-y-1/2`}
              style={{ transform: "translate(-50%,-50%) rotate(45deg)" }}
            />
            <div
              className={`absolute top-1/2 left-1/2 w-[16px] h-[1.5px] ${cfg.dotColor} -translate-x-1/2 -translate-y-1/2`}
              style={{ transform: "translate(-50%,-50%) rotate(-45deg)" }}
            />
            <div className={`absolute top-1/2 left-1/2 w-[3px] h-[3px] ${cfg.dotColor} rounded-full -translate-x-1/2 -translate-y-1/2 ${isHovered ? cfg.glowHover : cfg.glow}`} />
          </>
        )}

        {/* ── MATRIX: square bracket corners ── */}
        {preset === "matrix" && (
          <>
            {/* Top-left */}
            <div className={`absolute top-0 left-0 w-[5px] h-[1.5px] ${cfg.dotColor}`} />
            <div className={`absolute top-0 left-0 w-[1.5px] h-[5px] ${cfg.dotColor}`} />
            {/* Top-right */}
            <div className={`absolute top-0 right-0 w-[5px] h-[1.5px] ${cfg.dotColor}`} />
            <div className={`absolute top-0 right-0 w-[1.5px] h-[5px] ${cfg.dotColor}`} />
            {/* Bottom-left */}
            <div className={`absolute bottom-0 left-0 w-[5px] h-[1.5px] ${cfg.dotColor}`} />
            <div className={`absolute bottom-0 left-0 w-[1.5px] h-[5px] ${cfg.dotColor}`} />
            {/* Bottom-right */}
            <div className={`absolute bottom-0 right-0 w-[5px] h-[1.5px] ${cfg.dotColor}`} />
            <div className={`absolute bottom-0 right-0 w-[1.5px] h-[5px] ${cfg.dotColor}`} />
            <div className={`absolute top-1/2 left-1/2 w-[2px] h-[2px] ${cfg.dotColor} -translate-x-1/2 -translate-y-1/2 ${isHovered ? cfg.glowHover : cfg.glow}`} />
          </>
        )}
      </div>

      {/* Trailing ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[55] transition-all duration-300 ease-out mix-blend-screen ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${
          isHovered
            ? `w-10 h-10 border-2 ${cfg.ringHover}`
            : `w-7 h-7 border ${cfg.ringIdle}`
        }`}
      />
    </>
  );
}
