"use client";

import * as React from "react";

export default function MagneticCursor() {
  const dotRef = React.useRef<HTMLDivElement | null>(null);
  const ringRef = React.useRef<HTMLDivElement | null>(null);

  const mouseCoords = React.useRef({ x: 0, y: 0 });
  const ringCoords = React.useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    // Disable on mobile/touch screens
    if (window.innerWidth < 768) return;

    // Suppress system cursor
    document.documentElement.classList.add("custom-cursor-active");

    const handleMouseMove = (e: MouseEvent) => {
      mouseCoords.current.x = e.clientX;
      mouseCoords.current.y = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = target.closest(
          "a, button, [role='button'], input, textarea, select, svg, .cursor-pointer, .frosted-glass-hover"
        );
        setIsHovered(!!isInteractive);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Anim loop for smooth ring lag interpolation (lerp)
    let animId: number;
    const animate = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;

      if (dot && ring) {
        // Move core dot instantly
        dot.style.transform = `translate3d(${mouseCoords.current.x}px, ${mouseCoords.current.y}px, 0) translate(-50%, -50%)`;

        // Lerp ring with lag coefficient
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
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null;
  }

  return (
    <>
      {/* Central Core Micro-Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-50 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Trailing Ambient Glow Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-50 transition-all duration-300 ease-out mix-blend-screen ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${
          isHovered
            ? "w-10 h-10 bg-primary/10 border-2 border-primary shadow-[0_0_20px_rgba(168,85,247,0.4)]"
            : "w-7 h-7 border border-primary/50 shadow-[0_0_8px_rgba(168,85,247,0.15)]"
        }`}
        style={{
          marginLeft: "0px",
          marginTop: "0px",
        }}
      />
    </>
  );
}
