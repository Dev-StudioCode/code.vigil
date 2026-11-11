"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { VigilBackground } from "@/components/vigil/VigilBackground";
import { VigilNav, type VigilTab } from "@/components/vigil/VigilNav";
import { DevUploadView } from "@/components/vigil/DevUploadView";
import { AgentAuditView } from "@/components/vigil/AgentAuditView";
import { ClientVerificationView } from "@/components/vigil/ClientVerificationView";

export default function DashboardPage() {
  const [tab, setTab] = useState<VigilTab>("upload");

  return (
    <div className="relative min-h-screen overflow-hidden font-sans text-white">
      <VigilBackground />

      {/* === HEADER === */}
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-white/5 bg-[#07070b]/40 px-6 py-4 backdrop-blur-md">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-8 w-8 items-center justify-center">
            {/* glyph */}
            <svg viewBox="0 0 32 32" className="h-8 w-8">
              <defs>
                <linearGradient id="vigilGlyph" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#00f0ff" />
                  <stop offset="1" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
              <path
                d="M16 2 L29 8 V18 C29 24 23 29 16 30 C9 29 3 24 3 18 V8 Z"
                fill="none"
                stroke="url(#vigilGlyph)"
                strokeWidth="1.5"
              />
              <path
                d="M16 9 V21 M11 14 H21"
                stroke="#00f0ff"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-xl font-bold tracking-tight text-white">
              Vigil
            </span>
            <span className="font-mono text-[10px] tracking-[0.3em] text-white/40">
              // BLIND_VAULT
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-white/45 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff] animate-pulse" />
            VAULT_CV-8829-XJ · ONLINE
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-white/55 transition hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            EXIT
          </Link>
        </div>
      </header>

      {/* === STAGE === */}
      <main className="relative z-0">
        {tab === "upload" && (
          <DevUploadView onSubmit={() => setTab("audit")} />
        )}
        {tab === "audit" && (
          <AgentAuditView onComplete={() => setTab("verify")} />
        )}
        {tab === "verify" && (
          <ClientVerificationView onApproved={() => setTab("upload")} />
        )}
      </main>

      {/* === FLOATING NAV === */}
      <VigilNav active={tab} onChange={setTab} />
    </div>
  );
}
