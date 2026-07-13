"use client";

import * as React from "react";

export type FireworkPreset = "cosmic" | "inferno" | "matrix" | "stardust" | "quantum";

// Global preset broadcast
export function broadcastPreset(preset: FireworkPreset) {
  window.dispatchEvent(new CustomEvent("firework-preset", { detail: preset }));
}

const presets: {
  id: FireworkPreset;
  label: string;
  colors: string[];
  description: string;
  accent: string;
  border: string;
  glow: string;
}[] = [
  {
    id: "cosmic",
    label: "Cosmic",
    colors: ["#a855f7", "#c084fc", "#d8b4fe", "#ffffff"],
    description: "Purple starbursts",
    accent: "text-purple-400",
    border: "border-purple-500/40",
    glow: "shadow-[0_0_12px_rgba(168,85,247,0.4)]",
  },
  {
    id: "inferno",
    label: "Inferno",
    colors: ["#ef4444", "#f97316", "#fbbf24", "#fef08a"],
    description: "Fiery burst trails",
    accent: "text-orange-400",
    border: "border-orange-500/40",
    glow: "shadow-[0_0_12px_rgba(249,115,22,0.4)]",
  },
  {
    id: "matrix",
    label: "Matrix",
    colors: ["#22c55e", "#4ade80", "#86efac", "#00ffcc"],
    description: "Digital pixel rain",
    accent: "text-green-400",
    border: "border-green-500/40",
    glow: "shadow-[0_0_12px_rgba(34,197,94,0.4)]",
  },
  {
    id: "stardust",
    label: "Stardust",
    colors: ["#fef08a", "#fde047", "#eab308", "#ffffff"],
    description: "Golden sparkles",
    accent: "text-yellow-400",
    border: "border-yellow-500/40",
    glow: "shadow-[0_0_12px_rgba(234,179,8,0.4)]",
  },
  {
    id: "quantum",
    label: "Quantum",
    colors: ["#0ea5e9", "#38bdf8", "#d946ef", "#f0abfc"],
    description: "Geometric chaos",
    accent: "text-cyan-400",
    border: "border-cyan-500/40",
    glow: "shadow-[0_0_12px_rgba(14,165,233,0.4)]",
  }
];

export default function FireworkSettings() {
  const [selected, setSelected] = React.useState<FireworkPreset>("cosmic");
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelect = (id: FireworkPreset) => {
    setSelected(id);
    broadcastPreset(id);
  };

  const active = presets.find((p) => p.id === selected)!;

  return (
    <div
      className={`fixed left-0 top-1/2 -translate-y-1/2 z-[60] flex items-center transition-transform duration-300 ease-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Panel */}
      <div className="frosted-glass rounded-r-xl border-r border-t border-b border-foreground/10 px-3 py-3 flex flex-col gap-1.5 w-44 backdrop-blur-2xl bg-black/30 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 font-display">
            Firework Mode
          </span>
        </div>

        {/* Preset Cards */}
        {presets.map((p) => (
          <button
            key={p.id}
            onClick={() => handleSelect(p.id)}
            className={`group w-full flex items-center justify-between gap-2 rounded-lg border px-2.5 py-1.5 text-left transition-all duration-200 cursor-pointer ${
              selected === p.id
                ? `${p.border} ${p.glow} bg-foreground/[5]`
                : "border-foreground/8 hover:border-foreground/20 hover:bg-foreground/[0.04]"
            }`}
          >
            <div className="flex flex-col min-w-0">
              <span
                className={`text-[11px] font-bold font-display leading-none mb-0.5 ${
                  selected === p.id ? p.accent : "text-foreground/70"
                }`}
              >
                {p.label}
              </span>
              <span className="text-[9px] text-foreground/30 leading-none">
                {p.description}
              </span>
            </div>
            {/* Color swatches */}
            <div className="flex gap-0.5">
              {p.colors.slice(0, 3).map((c, i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: c }}
                />
              ))}
            </div>
          </button>
        ))}

        {/* Active mode label */}
        <div className={`text-center text-[9px] font-mono ${active.accent} opacity-60 mt-1`}>
          ● {active.label.toUpperCase()} ACTIVE
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-8 top-1/2 -translate-y-1/2 w-8 h-12 flex items-center justify-center frosted-glass rounded-r-lg border-r border-t border-b border-foreground/10 backdrop-blur-2xl bg-black/40 text-foreground/50 hover:text-foreground transition-colors cursor-pointer"
        aria-label="Toggle Firework Settings"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}
