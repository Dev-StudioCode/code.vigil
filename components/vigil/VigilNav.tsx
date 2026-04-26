"use client";

import { Upload, Cpu, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export type VigilTab = "upload" | "audit" | "verify";

const TABS: {
  id: VigilTab;
  label: string;
  index: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "upload", label: "Dev Upload", index: "01", icon: Upload },
  { id: "audit", label: "Agent Audit", index: "02", icon: Cpu },
  { id: "verify", label: "Client Verify", index: "03", icon: ShieldCheck },
];

interface VigilNavProps {
  active: VigilTab;
  onChange: (tab: VigilTab) => void;
}

export function VigilNav({ active, onChange }: VigilNavProps) {
  return (
    <nav
      aria-label="Vigil workflow stages"
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
    >
      <div className="vigil-glass relative flex items-center gap-1 rounded-full px-2 py-2 shadow-[0_20px_60px_-20px_rgba(0,240,255,0.35)]">
        {/* hairline accents */}
        <span className="absolute -left-px top-1/2 h-6 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-[#00f0ff]/60 to-transparent" />
        <span className="absolute -right-px top-1/2 h-6 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-[#7c3aed]/60 to-transparent" />

        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={cn(
                "group relative flex items-center gap-3 rounded-full px-4 py-2.5 text-sm transition-all duration-300",
                isActive
                  ? "bg-white/[0.06] text-white"
                  : "text-white/55 hover:text-white"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {/* index */}
              <span
                className={cn(
                  "font-mono text-[10px] tracking-[0.2em] transition-colors",
                  isActive ? "text-[#00f0ff]" : "text-white/35"
                )}
              >
                {tab.index}
              </span>

              <Icon
                className={cn(
                  "h-4 w-4 transition-transform duration-300",
                  isActive ? "scale-110" : "group-hover:scale-105"
                )}
              />

              <span className="font-display text-[13px] font-medium tracking-wide">
                {tab.label}
              </span>

              {isActive && (
                <span className="ml-1 h-1.5 w-1.5 rounded-full bg-[#00f0ff] shadow-[0_0_12px_#00f0ff]" />
              )}
            </button>
          );
        })}
      </div>

      {/* status caption */}
      <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.4em] text-white/30">
        Vigil Workflow // Stage {TABS.findIndex((t) => t.id === active) + 1} of 3
      </p>
    </nav>
  );
}
