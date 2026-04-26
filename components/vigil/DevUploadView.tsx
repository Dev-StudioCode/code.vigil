"use client";

import { useState, useRef } from "react";
import {
  GitBranch,
  FileCode2,
  Hash,
  ArrowUpRight,
  Lock,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DevUploadViewProps {
  onSubmit: () => void;
}

export function DevUploadView({ onSubmit }: DevUploadViewProps) {
  const [isOver, setIsOver] = useState(false);
  const [repo, setRepo] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <section className="relative mx-auto grid w-full max-w-7xl grid-cols-12 gap-6 px-6 pt-28 pb-40">
      {/* === LEFT: Header & meta === */}
      <header className="col-span-12 lg:col-span-5">
        <div className="vigil-rise flex items-center gap-3">
          <span className="font-mono text-[11px] tracking-[0.4em] text-[#00f0ff]/80">
            STAGE_01
          </span>
          <span className="h-px w-12 bg-[#00f0ff]/40" />
          <span className="font-mono text-[11px] tracking-[0.3em] text-white/40">
            DEV_INGEST
          </span>
        </div>

        <h1 className="vigil-rise vigil-delay-100 mt-6 font-display text-[clamp(2.5rem,5.4vw,4.75rem)] font-bold leading-[0.95] tracking-tight">
          Push the code.
          <br />
          <span className="text-white/45">Lock the funds.</span>
          <br />
          <span className="text-[#00f0ff]">Trust nothing.</span>
        </h1>

        <p className="vigil-rise vigil-delay-200 mt-8 max-w-md font-mono text-[13px] leading-relaxed text-white/55">
          Drop a repository or paste a Git URL. Vigil will clone into a sealed
          vault, run a forensic audit, and hold the client&apos;s escrow until
          every check passes.
        </p>

        {/* Vault meta panel — diagonal/asymmetric */}
        <div className="vigil-rise vigil-delay-300 mt-12 ml-8 max-w-sm">
          <div className="vigil-glass relative -rotate-[0.6deg] rounded-sm p-5">
            <div className="absolute -top-2 left-4 bg-[#07070b] px-2 font-mono text-[10px] tracking-[0.3em] text-white/40">
              VAULT_META
            </div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 font-mono text-[11px]">
              <dt className="text-white/40">vault_id</dt>
              <dd className="text-right text-white/85">CV-8829-XJ</dd>
              <dt className="text-white/40">escrow_locked</dt>
              <dd className="text-right text-[#00f0ff]">$ 14,500.00</dd>
              <dt className="text-white/40">milestone</dt>
              <dd className="text-right text-white/85">02 / 04</dd>
              <dt className="text-white/40">status</dt>
              <dd className="text-right text-white/85 flex items-center justify-end gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
                AWAITING_INGEST
              </dd>
            </dl>
          </div>
        </div>
      </header>

      {/* === RIGHT: Drop zone === */}
      <div className="col-span-12 lg:col-span-7">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsOver(true);
          }}
          onDragLeave={() => setIsOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsOver(false);
            onSubmit();
          }}
          className={cn(
            "vigil-rise vigil-delay-200 relative aspect-square w-full overflow-hidden rounded-sm transition-all duration-500",
            "vigil-glass",
            isOver && "vigil-glow-cyan"
          )}
        >
          {/* glowing corner brackets */}
          {[
            "top-3 left-3 border-l border-t",
            "top-3 right-3 border-r border-t",
            "bottom-3 left-3 border-l border-b",
            "bottom-3 right-3 border-r border-b",
          ].map((pos, i) => (
            <span
              key={i}
              className={cn(
                "vigil-bracket pointer-events-none",
                pos,
                isOver
                  ? "border-[#00f0ff] shadow-[0_0_18px_rgba(0,240,255,0.7)]"
                  : "border-white/35"
              )}
            />
          ))}

          {/* internal grid */}
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* corner labels */}
          <div className="absolute top-4 left-12 font-mono text-[9px] tracking-[0.3em] text-white/40">
            INGEST::ZONE
          </div>
          <div className="absolute top-4 right-12 font-mono text-[9px] tracking-[0.3em] text-white/40">
            AES-256
          </div>
          <div className="absolute bottom-4 left-12 font-mono text-[9px] tracking-[0.3em] text-white/40">
            SHA-512_VERIFIED
          </div>
          <div className="absolute bottom-4 right-12 font-mono text-[9px] tracking-[0.3em] text-white/40">
            v.4.2.1
          </div>

          {/* scanline */}
          <div className="vigil-scanline absolute inset-0 overflow-hidden" />

          {/* center content */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-10 text-center">
            <div className="relative mb-8 flex h-20 w-20 items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-white/15" />
              <div
                className={cn(
                  "absolute inset-2 rounded-full border transition-all duration-500",
                  isOver
                    ? "border-[#00f0ff] vigil-pulse"
                    : "border-white/25"
                )}
              />
              <FileCode2
                className={cn(
                  "h-7 w-7 transition-colors duration-300",
                  isOver ? "text-[#00f0ff]" : "text-white/70"
                )}
              />
            </div>

            <h2 className="font-display text-2xl font-semibold tracking-tight text-white">
              {isOver ? "Release to seal" : "Drop repository"}
            </h2>
            <p className="mt-2 max-w-xs font-mono text-[12px] text-white/45">
              .zip · .tar.gz · folder · or paste a Git URL below
            </p>

            <button
              onClick={() => inputRef.current?.focus()}
              className="mt-7 inline-flex items-center gap-2 border border-white/15 bg-white/[0.03] px-5 py-2 font-mono text-[11px] tracking-[0.2em] text-white/80 transition hover:border-[#00f0ff]/60 hover:text-white"
            >
              SELECT_FILES
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* === Git URL input + submit === */}
        <div className="vigil-rise vigil-delay-400 mt-6 flex items-stretch gap-3">
          <div className="vigil-glass relative flex flex-1 items-center gap-3 rounded-sm px-4">
            <GitBranch className="h-4 w-4 text-white/45" />
            <input
              ref={inputRef}
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              placeholder="git@github.com:agency/repo.git"
              className="h-12 flex-1 bg-transparent font-mono text-[13px] text-white outline-none placeholder:text-white/30"
              onKeyDown={(e) => e.key === "Enter" && onSubmit()}
            />
            <span className="hidden font-mono text-[10px] tracking-[0.3em] text-white/30 sm:block">
              ENTER ↵
            </span>
          </div>
          <button
            onClick={onSubmit}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-sm bg-[#00f0ff] px-6 font-display text-[13px] font-semibold tracking-wide text-[#07070b] transition hover:bg-white"
          >
            Seal &amp; Audit
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* === Sealed checks rail === */}
        <ul className="vigil-rise vigil-delay-500 mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] tracking-[0.25em] text-white/40">
          <li className="flex items-center gap-2">
            <Lock className="h-3 w-3 text-[#00f0ff]/70" /> ZERO_KNOWLEDGE_VAULT
          </li>
          <li className="flex items-center gap-2">
            <Hash className="h-3 w-3 text-[#00f0ff]/70" /> CHAIN_OF_CUSTODY
          </li>
          <li className="flex items-center gap-2">
            <Lock className="h-3 w-3 text-[#00f0ff]/70" /> ESCROW_BACKED
          </li>
        </ul>
      </div>
    </section>
  );
}
