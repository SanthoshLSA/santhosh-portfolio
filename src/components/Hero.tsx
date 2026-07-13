"use client";

import * as React from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import LeetCodeIcon from "./LeetCodeIcon";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";

export default function Hero() {
  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);

  const getTranslation = (idx: number) => {
    if (hoveredIdx === null) return "translateY(0)";
    const distance = Math.abs(idx - hoveredIdx);
    if (distance === 0) return "translateY(-24px)"; // Raised full
    if (distance === 1) return "translateY(-12px)"; // Neighbors raise half
    if (distance === 2) return "translateY(-6px)";  // Next neighbors raise quarter
    return "translateY(0)";
  };

  const getTextColor = (idx: number) => {
    if (hoveredIdx !== null) {
      const distance = Math.abs(idx - hoveredIdx);
      if (distance === 0) return "text-purple-600 dark:text-purple-400";
      if (distance === 1) return "text-purple-500 dark:text-purple-300";
      if (distance === 2) return "text-purple-400 dark:text-purple-200";
    }
    const colors = [
      "text-purple-600 dark:text-purple-400", // S
      "text-purple-600/90 dark:text-purple-400/90", // A
      "text-purple-600/80 dark:text-purple-400/80", // N
      "text-purple-600/70 dark:text-purple-400/70", // T
      "text-purple-600/60 dark:text-purple-400/60", // H
      "text-foreground", // O
      "text-foreground", // S
      "text-foreground", // H
      "text-foreground", // [space]
      "text-foreground", // A
      "text-purple-600/60 dark:text-purple-400/60", // N
      "text-purple-600/70 dark:text-purple-400/70", // A
      "text-purple-600/80 dark:text-purple-400/80", // N
      "text-purple-600/90 dark:text-purple-400/90", // T
      "text-purple-600 dark:text-purple-400"  // H
    ];
    return colors[idx] || "text-foreground";
  };

  return (
    <section className="relative flex min-h-[calc(100vh-3.5rem)] items-center justify-center overflow-hidden py-24 grid-bg">
      {/* Ambient Cosmic Glow Spheres */}
      <div className="absolute top-1/4 left-1/4 h-[400px] w-[400px] rounded-full bg-primary/10 glow-blur -z-10 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 h-[450px] w-[450px] rounded-full bg-primary/8 glow-blur -z-10 animate-pulse-slow duration-[10s]" />

      <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <h1 className="text-6xl font-bold tracking-tight sm:text-7xl md:text-8xl lg:text-9xl font-display">
          <span className="block text-muted-foreground font-semibold text-xl sm:text-2xl uppercase tracking-widest mb-10">
            SYSTEM.INIT // HELLO WORLD
          </span>
          <span 
            className="block pb-4 font-extrabold leading-none cursor-default select-none"
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {["SANTHOSH", "ANANTH"].map((word, wIdx) => {
              const wordStartIdx = wIdx === 0 ? 0 : 9; // "SANTHOSH " is length 9 (with space)
              return (
                <span key={wIdx} className="inline-block whitespace-nowrap">
                  {word.split("").map((char, charIdx) => {
                    const idx = wordStartIdx + charIdx;
                    return (
                      <span
                        key={idx}
                        onMouseEnter={() => setHoveredIdx(idx)}
                        className={`inline-block transition-all duration-300 ease-out font-display tracking-tight ${getTextColor(
                          idx
                        )}`}
                        style={{
                          transform: getTranslation(idx),
                        }}
                      >
                        {char}
                      </span>
                    );
                  })}
                  {wIdx === 0 && (
                    <span
                      onMouseEnter={() => setHoveredIdx(8)}
                      className="inline-block text-foreground"
                      style={{
                        transform: getTranslation(8),
                        minWidth: "0.25em",
                      }}
                    >
                      {" "}
                    </span>
                  )}
                </span>
              );
            })}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-8 max-w-3xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
          Aspiring AI & Data Science undergraduate at Shiv Nadar University. Crafting high-performance intelligent systems, full-stack web applications, and resolving complex algorithms.
        </p>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-5 font-display">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/85 text-background font-bold tracking-widest uppercase text-sm px-8 py-6 rounded-xl transition-all duration-300 hover:scale-[1.02] border-0"
            asChild
          >
            <a href="#projects">Explore Projects</a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-primary/20 hover:border-primary/50 hover:bg-primary/5 text-foreground font-bold tracking-widest uppercase text-sm px-8 py-6 rounded-xl transition-all duration-300 hover:scale-[1.02]"
            asChild
          >
            <a href="#contact">Get In Touch</a>
          </Button>
        </div>

        {/* Social Badges Grid */}
        <div className="mt-16 flex justify-center items-center gap-6">
          <a
            href="https://github.com/SanthoshLSA/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-foreground/[0.02] border border-foreground/5 text-muted-foreground hover:text-primary hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 hover:scale-110 shadow-sm"
            title="GitHub"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/santhosh-ananth-0a2602403/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-foreground/[0.02] border border-foreground/5 text-muted-foreground hover:text-primary hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 hover:scale-110 shadow-sm"
            title="LinkedIn"
          >
            <LinkedinIcon size={20} />
          </a>
          <a
            href="https://leetcode.com/SanthoshLegendSA/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-foreground/[0.02] border border-foreground/5 text-muted-foreground hover:text-primary hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 hover:scale-110 shadow-sm"
            title="LeetCode"
          >
            <LeetCodeIcon className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Floating Scroll indicator */}
      <div
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/60 hover:text-primary transition-colors cursor-pointer"
      >
        <span className="text-[10px] uppercase font-display tracking-widest font-semibold">Scroll Down</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </div>
    </section>
  );
}
