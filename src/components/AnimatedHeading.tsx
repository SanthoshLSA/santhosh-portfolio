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
    if (hoveredIdx === null) return "text-foreground";
    const distance = Math.abs(idx - hoveredIdx);
    if (distance === 0) return "text-primary";
    if (distance === 1) return "text-purple-300";
    if (distance === 2) return "text-purple-100/90";
    return "text-foreground";
  };

  // Pre-calculate indices in a functionally pure way to satisfy immutability rules
  const words = text.split(" ");
  const wordBlocks = words.map((word, wIdx) => {
    const startIdx = words
      .slice(0, wIdx)
      .reduce((sum, prevWord) => sum + prevWord.length + 1, 0);
    return { word, startIdx };
  });

  return (
    <h2
      className={`text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-foreground font-display uppercase cursor-default select-none pb-2 ${className}`}
      onMouseLeave={() => setHoveredIdx(null)}
    >
      {wordBlocks.map(({ word, startIdx }, wIdx) => {
        return (
          <span key={wIdx} className="inline-block whitespace-nowrap">
            {word.split("").map((char, charIdx) => {
              const idx = startIdx + charIdx;
              return (
                <span
                  key={idx}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  className={`inline-block transition-all duration-300 ease-out ${getTextColor(idx)}`}
                  style={{
                    transform: getTranslation(idx),
                  }}
                >
                  {char}
                </span>
              );
            })}
            {/* Draw a space at the end of the word (except the last word) */}
            {wIdx < wordBlocks.length - 1 && (
              <span
                onMouseEnter={() => setHoveredIdx(startIdx + word.length)}
                className="inline-block text-foreground"
                style={{
                  transform: getTranslation(startIdx + word.length),
                  minWidth: "0.28em",
                }}
              >
                {" "}
              </span>
            )}
          </span>
        );
      })}
    </h2>
  );
}
