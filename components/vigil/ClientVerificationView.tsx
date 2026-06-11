"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Fingerprint,
  Hash,
  ChevronRight,
  AlertTriangle,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ClientVerificationViewProps {
  onApproved: () => void;
}

const FINDINGS = [
  {
    id: "01",
    title: "Hardcoded credentials detected",
    severity: "CRITICAL" as const,
    summary:
      "AWS access keys committed in config/settings.py — anyone with repo access can drain your cloud bill.",
  },
  {
    id: "02",
    title: "Architectural debt — AuthService",
    severity: "HIGH" as const,
    summary:
      "Circular import between AuthService and SessionStore. Estimated cost to refactor: $2,500.",
  },
  {
    id: "03",
    title: "Test coverage below threshold",
    severity: "MEDIUM" as const,
    summary:
      "62.4% coverage. Industry safe-zone is ≥70%. Consider withholding 15% until coverage is raised.",
  },
];

export function ClientVerificationView({
  onApproved,
}: ClientVerificationViewProps) {
  const [approved, setApproved] = useState(false);

  return (
    <section className="relative mx-auto grid w-full max-w-7xl grid-cols-12 gap-6 px-6 pt-24 pb-40">
      {/* === HEADER === */}
      <header className="col-span-12">
        <div className="vigil-rise flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] tracking-[0.4em] text-[#00f0ff]">
                STAGE_03
              </span>
              <span className="h-px w-12 bg-[#00f0ff]/50" />
              <span className="font-mono text-[11px] tracking-[0.3em] text-white/40">
                CLIENT_VERIFICATION
              </span>
            </div>
            <h1 className="mt-5 font-display text-[clamp(2.2rem,4.6vw,3.8rem)] font-bold leading-[1] tracking-tight">
              Trust the report.
              <br />
              <span className="text-white/45">Then,</span>{" "}
              <span className="text-[#00f0ff]">release the funds.</span>
            </h1>
          </div>

          <div className="vigil-glass rounded-sm px-5 py-4">
            <div className="font-mono text-[10px] tracking-[0.3em] text-white/45">
              ESCROW_BALANCE
            </div>
            <div className="mt-1 font-display text-3xl font-bold text-white">
              $14,500
              <span className="ml-2 text-base text-white/35">.00 USD</span>
            </div>
            <div className="mt-1 font-mono text-[10px] tracking-[0.3em] text-[#ff2d55]">
              STATUS // LOCKED
            </div>
          </div>
        </div>
      </header>

      {/* === LEFT: Proof of Work card === */}
      <div className="col-span-12 lg:col-span-7">
        <ProofOfWorkCard />

        {/* Findings list */}
        <div className="vigil-rise vigil-delay-300 mt-8 space-y-3">
          <h3 className="mb-2 font-mono text-[10px] tracking-[0.3em] text-white/40">
            AGENT_FINDINGS // 03
          </h3>
          {FINDINGS.map((f, i) => (
            <article
              key={f.id}
              className="vigil-glass vigil-rise group relative flex gap-5 rounded-sm p-5 transition hover:border-white/15"
              style={{ animationDelay: `${400 + i * 90}ms` }}
            >
              <span className="font-mono text-[10px] tracking-widest text-white/35">
                {f.id}
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="font-display text-base font-semibold text-white">
                    {f.title}
                  </h4>
                  <SeverityPill severity={f.severity} />
                </div>
                <p className="mt-2 font-mono text-[12px] leading-relaxed text-white/55">
                  {f.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* === RIGHT: Approve action panel === */}
      <aside className="col-span-12 lg:col-span-5">
        <div className="vigil-rise vigil-delay-200 sticky top-8 space-y-5">
          {/* signature card */}
          <div className="vigil-glass rounded-sm p-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-[0.3em] text-white/40">
                CLIENT_SIGNATURE
              </span>
              <Fingerprint className="h-4 w-4 text-[#00f0ff]" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 font-mono text-[11px]">
              <span className="text-white/40">milestone</span>
              <span className="text-right text-white/85">02 / 04</span>
              <span className="text-white/40">vault_id</span>
              <span className="text-right text-white/85">CV-8829-XJ</span>
              <span className="text-white/40">commit_sha</span>
              <span className="text-right text-[#00f0ff]">a91f3c7</span>
              <span className="text-white/40">audit_score</span>
              <span className="text-right text-white/85">68 / 100</span>
              <span className="text-white/40">recommendation</span>
              <span className="text-right text-yellow-400">RELEASE_W/_HOLDBACK</span>
            </div>
          </div>

          {/* === MASSIVE APPROVE BUTTON === */}
          <button
            onClick={() => {
              setApproved(true);
              setTimeout(onApproved, 600);
            }}
            disabled={approved}
            className={cn(
              "vigil-cta-shine group relative w-full overflow-hidden rounded-sm border-2 px-7 py-7 text-left transition-all duration-500",
              approved
                ? "border-[#00f0ff] bg-[#00f0ff] text-[#07070b]"
                : "border-[#00f0ff] bg-gradient-to-br from-[#00f0ff]/15 via-[#7c3aed]/10 to-[#00f0ff]/5 text-white hover:bg-[#00f0ff] hover:text-[#07070b] hover:vigil-glow-cyan"
            )}
          >
            {/* texture grid */}
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            <div className="relative z-10 flex items-center justify-between gap-6">
              <div>
                <div
                  className={cn(
                    "font-mono text-[10px] tracking-[0.4em]",
                    approved ? "text-[#07070b]/70" : "text-[#00f0ff] group-hover:text-[#07070b]/70"
                  )}
                >
                  {approved ? "RELEASING" : "ACTION_REQUIRED"}
                </div>
                <div className="mt-1 font-display text-[1.7rem] font-bold leading-[1.05] tracking-tight">
                  {approved ? "Funds released." : "Approve milestone &"}
                  <br />
                  {approved ? "Vault closed." : "release $14,500"}
                </div>
              </div>
              <div
                className={cn(
                  "flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 transition-transform duration-500",
                  approved
                    ? "border-[#07070b] bg-[#07070b] text-[#00f0ff] rotate-90"
                    : "border-current group-hover:translate-x-1"
                )}
              >
                {approved ? (
                  <Check className="h-6 w-6" />
                ) : (
                  <ChevronRight className="h-7 w-7" />
                )}
              </div>
            </div>
          </button>

          {/* hold-back option */}
          <button className="w-full border border-white/10 bg-transparent px-5 py-4 text-left font-mono text-[11px] tracking-[0.2em] text-white/55 transition hover:border-yellow-400/40 hover:text-yellow-400">
            <span className="block text-[10px] text-white/30">SECONDARY</span>
            HOLD 15% PENDING TEST_COVERAGE_FIX
          </button>

          {/* fine print */}
          <p className="px-1 font-mono text-[10px] leading-relaxed text-white/35">
            By approving, you authorize Vigil to release funds from the sealed
            escrow vault to the developer&apos;s wallet. The audit report and
            chain-of-custody hash will be permanently logged.
          </p>
        </div>
      </aside>
    </section>
  );
}

function ProofOfWorkCard() {
  return (
    <div className="vigil-rise vigil-delay-100 relative">
      <div className="vigil-glass relative overflow-hidden rounded-sm">
        {/* watermark */}
        <div className="vigil-watermark absolute inset-0" />
        {/* huge ghost label */}
        <div className="pointer-events-none absolute -right-6 -top-2 select-none font-display text-[7rem] font-extrabold leading-none tracking-tighter text-white/[0.04]">
          PROOF
        </div>

        {/* content */}
        <div className="relative z-10 grid grid-cols-2 gap-6 p-7">
          {/* left: meta */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-white/40">
              <ShieldCheck className="h-3.5 w-3.5 text-[#00f0ff]" />
              VISUAL_PROOF_OF_WORK
            </div>

            <h2 className="mt-5 font-display text-3xl font-bold leading-[1.05] tracking-tight">
              Milestone 02
              <br />
              <span className="text-white/50">Auth + Dashboard</span>
            </h2>

            <dl className="mt-6 space-y-2 font-mono text-[11px]">
              <Row k="delivered_by" v="agency.studio" />
              <Row k="commit" v="a91f3c7" highlight />
              <Row k="lines_changed" v="+ 4,218 / − 612" />
              <Row k="passes_contract" v="YES" />
              <Row k="audit_hash" v="0x4f…b9c3" />
            </dl>
          </div>

          {/* right: stylized "screenshot" */}
          <div className="col-span-2 sm:col-span-1 relative aspect-[4/3] rounded-sm border border-white/10 bg-gradient-to-br from-[#0c0c14] to-[#14141f] overflow-hidden">
            {/* fake browser chrome */}
            <div className="flex items-center gap-1.5 border-b border-white/8 bg-black/40 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="ml-3 font-mono text-[9px] tracking-widest text-white/30">
                proof://CV-8829-XJ
              </span>
            </div>

            {/* abstract dashboard mock */}
            <div className="grid h-full grid-cols-3 gap-2 p-3">
              <div className="col-span-1 space-y-2">
                <div className="h-3 w-3/4 bg-white/15" />
                <div className="h-12 rounded-sm bg-[#00f0ff]/15 border border-[#00f0ff]/30" />
                <div className="h-12 rounded-sm bg-white/5" />
                <div className="h-3 w-1/2 bg-white/10" />
              </div>
              <div className="col-span-2 space-y-2">
                <div className="flex justify-between">
                  <div className="h-3 w-1/3 bg-white/15" />
                  <div className="h-3 w-1/4 bg-[#7c3aed]/40" />
                </div>
                <div className="flex h-16 items-end gap-1">
                  {[6, 9, 4, 11, 7, 14, 8, 12, 5, 13].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-gradient-to-t from-[#00f0ff]/30 to-[#7c3aed]/30"
                      style={{ height: `${h * 6}%` }}
                    />
                  ))}
                </div>
                <div className="h-3 w-2/3 bg-white/8" />
                <div className="h-3 w-1/2 bg-white/8" />
              </div>
            </div>

            {/* WATERMARKED diagonal */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="-rotate-[24deg] font-mono text-xs tracking-[0.5em] text-[#00f0ff]/30">
                VIGIL · VERIFIED
              </span>
            </div>
          </div>
        </div>

        {/* bottom strip */}
        <div className="relative z-10 flex items-center justify-between border-t border-white/8 bg-black/30 px-7 py-3 font-mono text-[10px] tracking-[0.3em] text-white/40">
          <span className="flex items-center gap-2">
            <Hash className="h-3 w-3" /> SEALED 04.26.26 · 14:08 UTC
          </span>
          <span>NOT_TRANSFERABLE</span>
        </div>

        {/* diagonal accent rule */}
        <div className="vigil-rule absolute -bottom-px left-0 h-px w-full" />
      </div>
    </div>
  );
}

function Row({
  k,
  v,
  highlight,
}: {
  k: string;
  v: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 py-1.5">
      <dt className="text-white/40">{k}</dt>
      <dd className={cn("text-right", highlight ? "text-[#00f0ff]" : "text-white/85")}>
        {v}
      </dd>
    </div>
  );
}

function SeverityPill({
  severity,
}: {
  severity: "CRITICAL" | "HIGH" | "MEDIUM";
}) {
  const map = {
    CRITICAL: "border-[#ff2d55]/50 text-[#ff2d55] bg-[#ff2d55]/8",
    HIGH: "border-yellow-400/50 text-yellow-400 bg-yellow-400/8",
    MEDIUM: "border-[#7c3aed]/50 text-[#a78bfa] bg-[#7c3aed]/10",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border px-2 py-0.5 font-mono text-[10px] tracking-[0.25em]",
        map[severity]
      )}
    >
      <AlertTriangle className="h-3 w-3" />
      {severity}
    </span>
  );
}
