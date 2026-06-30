"use client";

import * as React from "react";

interface Props {
  text: string;
  className?: string;
}

export default function AnimatedHeading({ text, className = "" }: Props) {
  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);

  const getTranslation = (idx: number) => {
    if (hoveredIdx === null) return "translateY(0)";
    const distance = Math.abs(idx - hoveredIdx);
    if (distance === 0) return "translateY(-14px)"; // Raised full
    if (distance === 1) return "translateY(-7px)";  // Neighbors raise half
    if (distance === 2) return "translateY(-3px)";  // Next neighbors raise quarter
    return "translateY(0)";
  };

  const getTextColor = (idx: number) => {
    if (hoveredIdx === null) return "text-white";
    const distance = Math.abs(idx - hoveredIdx);
    if (distance === 0) return "text-primary";
    if (distance === 1) return "text-purple-300";
    if (distance === 2) return "text-purple-100/90";
    return "text-white";
  };

  return (
    <h2
      className={`text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white font-display uppercase cursor-default select-none pb-2 ${className}`}
      onMouseLeave={() => setHoveredIdx(null)}
    >
      {text.split("").map((char, idx) => (
        <span
          key={idx}
          onMouseEnter={() => setHoveredIdx(idx)}
          className={`inline-block transition-all duration-300 ease-out ${getTextColor(idx)}`}
          style={{
            transform: getTranslation(idx),
            minWidth: char === " " ? "0.3em" : "auto",
          }}
        >
          {char}
        </span>
      ))}
    </h2>
  );
}
