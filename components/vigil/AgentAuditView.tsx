"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Check,
  AlertTriangle,
  XCircle,
  Loader2,
  Cpu,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AgentAuditViewProps {
  onComplete: () => void;
}

type CheckState = "pending" | "running" | "pass" | "warn" | "fail";

const CHECKS: {
  id: string;
  label: string;
  detail: string;
  result: Exclude<CheckState, "pending" | "running">;
}[] = [
  {
    id: "01",
    label: "Repository integrity",
    detail: "1,284 files · 47 commits · signed",
    result: "pass",
  },
  {
    id: "02",
    label: "Dependency manifest",
    detail: "184 packages · 0 unresolved",
    result: "pass",
  },
  {
    id: "03",
    label: "Hardcoded secrets scan",
    detail: "AWS keys detected in config/settings.py",
    result: "fail",
  },
  {
    id: "04",
    label: "Architectural soundness",
    detail: "Circular dependency in AuthService",
    result: "warn",
  },
  {
    id: "05",
    label: "Test coverage",
    detail: "62.4% — below 70% threshold",
    result: "warn",
  },
  {
    id: "06",
    label: "License & IP compliance",
    detail: "MIT only · no copy-left taint",
    result: "pass",
  },
  {
    id: "07",
    label: "Performance budget",
    detail: "TTFB 412ms · LCP 1.8s",
    result: "pass",
  },
  {
    id: "08",
    label: "Contract milestone match",
    detail: "Auth + Dashboard delivered as scoped",
    result: "pass",
  },
];

const LOG_LINES = [
  "$ vigil ingest --vault CV-8829-XJ",
  ">> cloning agency/repo @ HEAD",
  ">> sealing 1,284 objects",
  ">> running detector::secrets",
  "!! match: AWS_ACCESS_KEY in config/settings.py:42",
  ">> running detector::architecture",
  "?? circular import: AuthService -> SessionStore -> AuthService",
  ">> compiling risk delta",
  ">> generating plain-english report",
];

export function AgentAuditView({ onComplete }: AgentAuditViewProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  // staggered checks
  useEffect(() => {
    if (stepIndex >= CHECKS.length) {
      const t = setTimeout(onComplete, 1100);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStepIndex((i) => i + 1), 520);
    return () => clearTimeout(t);
  }, [stepIndex, onComplete]);

  // log stream
  useEffect(() => {
    if (logIndex >= LOG_LINES.length) return;
    const t = setTimeout(() => setLogIndex((i) => i + 1), 380);
    return () => clearTimeout(t);
  }, [logIndex]);

  // pre-generate stream column timings (deterministic for SSR safety)
  const streamCols = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        delay: (i * 0.37) % 4,
        duration: 3 + ((i * 0.6) % 3),
        chars: Array.from({ length: 18 }, (_, j) =>
          ((i + j * 7) % 16).toString(16).toUpperCase()
        ).join(""),
      })),
    []
  );

  const stateOf = (i: number): CheckState => {
    if (i < stepIndex) return CHECKS[i].result;
    if (i === stepIndex) return "running";
    return "pending";
  };

  const progress = Math.round((stepIndex / CHECKS.length) * 100);

  return (
    <section className="relative mx-auto grid w-full max-w-7xl grid-cols-12 gap-6 px-6 pt-24 pb-40">
      {/* === LEFT: Hero animation === */}
      <div className="col-span-12 lg:col-span-7">
        <div className="vigil-rise flex items-center gap-3">
          <span className="font-mono text-[11px] tracking-[0.4em] text-[#7c3aed]">
            STAGE_02
          </span>
          <span className="h-px w-12 bg-[#7c3aed]/50" />
          <span className="font-mono text-[11px] tracking-[0.3em] text-white/40">
            AGENT_AUDIT
          </span>
          <span className="ml-auto inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-white/55">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00f0ff] animate-pulse shadow-[0_0_8px_#00f0ff]" />
            LIVE
          </span>
        </div>

        <h1 className="vigil-rise vigil-delay-100 mt-6 font-display text-[clamp(2rem,4.4vw,3.6rem)] font-bold leading-[1] tracking-tight">
          The agent is reading
          <br />
          <span className="text-[#7c3aed]">every line</span>
          <span className="text-white/40"> so you don&apos;t have to.</span>
        </h1>

        {/* === Hero geometric animation === */}
        <div className="vigil-rise vigil-delay-200 relative mt-10 aspect-[16/11] overflow-hidden rounded-sm vigil-glass">
          {/* code-stream rain background */}
          <div className="absolute inset-0 overflow-hidden">
            {streamCols.map((c, i) => (
              <div
                key={i}
                className="vigil-stream-col absolute top-0 font-mono text-[10px] leading-[1.4] tracking-widest text-[#00f0ff]/60"
                style={{
                  left: `${(i / streamCols.length) * 100}%`,
                  animationDelay: `${c.delay}s`,
                  animationDuration: `${c.duration}s`,
                  writingMode: "vertical-rl",
                }}
              >
                {c.chars}
              </div>
            ))}
          </div>

          {/* dimming layer */}
          <div className="absolute inset-0 bg-[#07070b]/55" />

          {/* orbital rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="vigil-orbit absolute h-[78%] w-[78%] rounded-full border border-dashed border-white/10" />
            <div className="vigil-orbit-rev absolute h-[58%] w-[58%] rounded-full border border-[#00f0ff]/15" />
            <div className="vigil-orbit absolute h-[40%] w-[40%] rounded-full border border-[#7c3aed]/25" />

            {/* orbit dots */}
            <div className="vigil-orbit absolute h-[78%] w-[78%]">
              <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#00f0ff] shadow-[0_0_12px_#00f0ff]" />
            </div>
            <div className="vigil-orbit-rev absolute h-[58%] w-[58%]">
              <span className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#7c3aed] shadow-[0_0_12px_#7c3aed]" />
            </div>

            {/* core hexagon */}
            <div className="vigil-pulse relative flex h-32 w-32 items-center justify-center">
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                <defs>
                  <linearGradient id="hexgrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#00f0ff" />
                    <stop offset="1" stopColor="#7c3aed" />
                  </linearGradient>
                </defs>
                <polygon
                  points="50,4 92,27 92,73 50,96 8,73 8,27"
                  fill="none"
                  stroke="url(#hexgrad)"
                  strokeWidth="1.4"
                />
                <polygon
                  points="50,18 80,34 80,66 50,82 20,66 20,34"
                  fill="rgba(0,240,255,0.05)"
                  stroke="rgba(0,240,255,0.4)"
                  strokeWidth="1"
                />
              </svg>
              <Cpu className="relative z-10 h-8 w-8 text-white" />
            </div>
          </div>

          {/* sweeping highlight */}
          <div className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-[#00f0ff]/10 to-transparent vigil-sweep" />

          {/* corner readouts */}
          <div className="absolute left-4 top-4 font-mono text-[10px] tracking-[0.3em] text-white/40">
            AGENT::GEMINI_2.0
          </div>
          <div className="absolute right-4 top-4 font-mono text-[10px] tracking-[0.3em] text-white/40">
            CYCLES {String(stepIndex * 1244).padStart(7, "0")}
          </div>
          <div className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.3em] text-white/40">
            {progress}% COMPLETE
          </div>
          <div className="absolute bottom-4 right-4 font-mono text-[10px] tracking-[0.3em] text-white/40">
            VAULT_SEALED
          </div>
        </div>

        {/* === Live log stream === */}
        <div className="vigil-rise vigil-delay-300 mt-6 rounded-sm border border-white/8 bg-black/60 p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-[0.3em] text-white/40">
              audit.log
            </span>
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#ff2d55]/60" />
              <span className="h-2 w-2 rounded-full bg-yellow-400/60" />
              <span className="h-2 w-2 rounded-full bg-[#00f0ff]/60" />
            </div>
          </div>
          <pre className="font-mono text-[12px] leading-[1.7] text-white/80">
            {LOG_LINES.slice(0, logIndex).map((l, i) => (
              <div
                key={i}
                className={cn(
                  "vigil-rise",
                  l.startsWith("!!") && "text-[#ff2d55]",
                  l.startsWith("??") && "text-yellow-400",
                  l.startsWith(">>") && "text-white/55",
                  l.startsWith("$") && "text-[#00f0ff]"
                )}
              >
                {l}
              </div>
            ))}
            {logIndex < LOG_LINES.length && (
              <span className="inline-block h-3.5 w-2 translate-y-0.5 bg-[#00f0ff] animate-pulse" />
            )}
          </pre>
        </div>
      </div>

      {/* === RIGHT: Audit checks === */}
      <aside className="col-span-12 lg:col-span-5">
        <div className="vigil-glass relative ml-0 lg:ml-6 mt-0 lg:mt-12 rounded-sm p-6">
          {/* sticker label */}
          <div className="absolute -top-2 left-4 bg-[#07070b] px-2 font-mono text-[10px] tracking-[0.3em] text-white/40">
            CHECK_MATRIX
          </div>

          {/* progress bar */}
          <div className="mb-5 flex items-center gap-4">
            <span className="font-display text-3xl font-bold text-white">
              {String(progress).padStart(2, "0")}
              <span className="text-white/35 text-lg">%</span>
            </span>
            <div className="relative h-1 flex-1 overflow-hidden bg-white/8">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#00f0ff] to-[#7c3aed] transition-[width] duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <ul className="space-y-1">
            {CHECKS.map((c, i) => {
              const s = stateOf(i);
              return (
                <li
                  key={c.id}
                  className={cn(
                    "group relative flex items-start gap-4 border-l-2 px-4 py-3 transition-all duration-300",
                    s === "pending" && "border-white/8 opacity-40",
                    s === "running" &&
                      "border-[#00f0ff] bg-[#00f0ff]/5 vigil-rise",
                    s === "pass" && "border-[#00f0ff]/40 vigil-rise",
                    s === "warn" && "border-yellow-400/60 vigil-rise",
                    s === "fail" && "border-[#ff2d55]/70 vigil-rise"
                  )}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <span className="mt-0.5 font-mono text-[10px] tracking-widest text-white/35">
                    {c.id}
                  </span>

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={cn(
                          "font-display text-[14px] font-medium",
                          s === "pending" ? "text-white/50" : "text-white"
                        )}
                      >
                        {c.label}
                      </span>
                      <StateBadge state={s} />
                    </div>
                    {(s === "running" ||
                      s === "pass" ||
                      s === "warn" ||
                      s === "fail") && (
                      <p
                        className={cn(
                          "mt-1 font-mono text-[11px]",
                          s === "fail"
                            ? "text-[#ff2d55]/80"
                            : s === "warn"
                              ? "text-yellow-400/80"
                              : "text-white/45"
                        )}
                      >
                        {s === "running" ? "running detector…" : c.detail}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          {/* skip / advance */}
          <button
            onClick={onComplete}
            className="group mt-6 flex w-full items-center justify-between border-t border-white/8 pt-4 font-mono text-[11px] tracking-[0.25em] text-white/45 transition hover:text-white"
          >
            <span>SKIP_TO_VERIFICATION</span>
            <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </aside>
    </section>
  );
}

function StateBadge({ state }: { state: CheckState }) {
  if (state === "pending")
    return (
      <span className="font-mono text-[10px] tracking-[0.3em] text-white/30">
        QUEUED
      </span>
    );
  if (state === "running")
    return (
      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.3em] text-[#00f0ff]">
        <Loader2 className="h-3 w-3 animate-spin" />
        SCANNING
      </span>
    );
  if (state === "pass")
    return (
      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.3em] text-[#00f0ff]">
        <Check className="h-3 w-3" />
        PASS
      </span>
    );
  if (state === "warn")
    return (
      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.3em] text-yellow-400">
        <AlertTriangle className="h-3 w-3" />
        WARN
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.3em] text-[#ff2d55]">
      <XCircle className="h-3 w-3" />
      FAIL
    </span>
  );
}
