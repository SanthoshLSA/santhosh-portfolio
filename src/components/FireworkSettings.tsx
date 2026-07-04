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
  const [visible, setVisible] = React.useState(false);
  const [pinned, setPinned] = React.useState(false);
  const hideTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Listen for edge hover
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (pinned) return;
      if (e.clientX < 20) {
        if (hideTimer.current) clearTimeout(hideTimer.current);
        setVisible(true);
      } else if (e.clientX > 250) {
        hideTimer.current = setTimeout(() => {
          setVisible(false);
        }, 600);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [pinned]);

  const handleSelect = (id: FireworkPreset) => {
    setSelected(id);
    broadcastPreset(id);
  };

  const active = presets.find((p) => p.id === selected)!;

  return (
    <div
      className={`fixed left-0 top-1/2 -translate-y-1/2 z-[60] flex items-center transition-transform duration-300 ease-out ${
        visible || pinned ? "translate-x-0" : "-translate-x-full"
      }`}
      onMouseEnter={() => {
        if (hideTimer.current) clearTimeout(hideTimer.current);
        setVisible(true);
      }}
      onMouseLeave={() => {
        if (!pinned) {
          hideTimer.current = setTimeout(() => setVisible(false), 600);
        }
      }}
    >
      {/* Panel */}
      <div className="frosted-glass rounded-r-xl border-r border-t border-b border-white/10 px-3 py-3 flex flex-col gap-1.5 w-44 backdrop-blur-2xl bg-black/30 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 font-display">
            Firework Mode
          </span>
          <button
            onClick={() => setPinned((p) => !p)}
            className={`text-[9px] px-1.5 py-0.5 rounded border transition-colors duration-200 font-mono ${
              pinned
                ? "border-primary/60 text-primary bg-primary/10"
                : "border-white/15 text-white/30 hover:border-white/30"
            }`}
            title={pinned ? "Unpin panel" : "Pin panel"}
          >
            {pinned ? "PINNED" : "PIN"}
          </button>
        </div>

        {/* Preset Cards */}
        {presets.map((p) => (
          <button
            key={p.id}
            onClick={() => handleSelect(p.id)}
            className={`group w-full flex items-center justify-between gap-2 rounded-lg border px-2.5 py-1.5 text-left transition-all duration-200 cursor-pointer ${
              selected === p.id
                ? `${p.border} ${p.glow} bg-white/5`
                : "border-white/8 hover:border-white/20 hover:bg-white/[0.04]"
            }`}
          >
            <div className="flex flex-col min-w-0">
              <span
                className={`text-[11px] font-bold font-display leading-none mb-0.5 ${
                  selected === p.id ? p.accent : "text-white/70"
                }`}
              >
                {p.label}
              </span>
              <span className="text-[9px] text-white/30 leading-none">
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

      {/* Edge tab when hidden */}
      <div
        className={`absolute -right-4 top-1/2 -translate-y-1/2 w-4 h-12 flex items-center justify-center transition-opacity duration-300 ${
          visible || pinned ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="w-[2px] h-8 rounded-full bg-primary/40" />
      </div>
    </div>
  );
}
