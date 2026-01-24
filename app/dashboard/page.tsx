'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, AlertTriangle, Lock, XCircle, CheckCircle, ChevronRight, Terminal, Activity, ArrowLeft } from 'lucide-react';

export default function Dashboard() {
    const [score, setScore] = useState(0);

    useEffect(() => {
        // Animate score from 0 to 42
        const interval = setInterval(() => {
            setScore((prev) => {
                if (prev >= 42) {
                    clearInterval(interval);
                    return 42;
                }
                return prev + 1;
            });
        }, 20);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-[#0f172a] text-white font-sans selection:bg-red-500/30">

            {/* === FIXED HEADER (MATCHING HOME) === */}
            <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 backdrop-blur-sm bg-[#0f172a]/80 border-b border-slate-800">
                <div className="flex items-center gap-3">
                    <Shield className="w-8 h-8 text-blue-500" strokeWidth={2.5} />
                    <span className="text-2xl font-bold text-white tracking-tight">Code.Vigil</span>
                    <span className="text-xs bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-0.5 rounded ml-2 font-mono">AUDIT_MODE</span>
                </div>
                <Link href="/" className="text-sm text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
            </header>

            {/* MAIN CONTENT */}
            <main className="max-w-7xl mx-auto px-6 py-32">

                {/* STATUS BAR */}
                <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Audit Report: <span className="text-slate-400 font-mono text-xl">universal_ai_architect</span></h1>
                        <p className="text-slate-400 text-sm flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                            Live Analysis • Transaction ID: #CV-8829-XJ
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-6 py-3 rounded-xl bg-slate-800/50 text-slate-500 cursor-not-allowed flex items-center gap-2 text-sm font-bold border border-slate-700">
                            <Lock className="w-4 h-4" /> Release Funds Locked
                        </button>
                    </div>
                </div>

                {/* GRID LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT COLUMN: THE SCORE */}
                    <div className="lg:col-span-1 space-y-6">

                        {/* SCORE CARD */}
                        <div className="bg-slate-900/50 rounded-2xl border border-red-500/30 p-8 relative overflow-hidden shadow-[0_0_50px_rgba(239,68,68,0.1)]">
                            <div className="absolute top-0 left-0 w-full h-1 bg-red-500 animate-pulse" />

                            <h3 className="text-slate-400 font-medium mb-8 flex items-center gap-2">
                                <Activity className="w-4 h-4" /> Trust Score
                            </h3>

                            <div className="flex items-center justify-center py-4">
                                <div className="relative w-48 h-48 flex items-center justify-center">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle cx="96" cy="96" r="88" stroke="#1e293b" strokeWidth="12" fill="transparent" />
                                        <circle
                                            cx="96" cy="96" r="88"
                                            stroke="#ef4444"
                                            strokeWidth="12"
                                            fill="transparent"
                                            strokeDasharray={552}
                                            strokeDashoffset={552 - (552 * score) / 100}
                                            className="transition-all duration-1000 ease-out"
                                        />
                                    </svg>
                                    <div className="absolute flex flex-col items-center">
                                        <span className="text-6xl font-bold text-white">{score}</span>
                                        <span className="text-red-500 font-bold text-sm mt-2 tracking-widest">CRITICAL</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 p-4 bg-red-950/30 rounded-xl border border-red-500/20 flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="text-red-400 font-bold text-sm">PAYMENT LOCKED</h4>
                                    <p className="text-xs text-red-200/60 mt-1 leading-relaxed">
                                        Escrow protocols activated. 3 Critical vulnerabilities detected in core architecture.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: THE AI REPORT */}
                    <div className="lg:col-span-2 bg-slate-900/50 rounded-2xl border border-slate-800 p-8 flex flex-col">
                        <h3 className="text-slate-400 font-medium mb-6 flex items-center gap-2">
                            <Terminal className="w-4 h-4" /> AI Auditor Report (Gemini 1.5 Pro)
                        </h3>

                        <div className="flex-1 space-y-4">
                            {/* Report Item 1 */}
                            <div className="flex gap-4 p-5 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-red-500/30 transition-colors group">
                                <div className="mt-1">
                                    <XCircle className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">Hardcoded Secrets Detected</h4>
                                    <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                                        Found AWS Access Keys and Database passwords hardcoded in <code className="bg-slate-800 px-1.5 py-0.5 rounded text-xs text-blue-300 font-mono">config/settings.py</code>. This allows anyone with repo access to steal your data.
                                    </p>
                                    <div className="mt-3 inline-flex items-center gap-1 text-xs text-red-400 bg-red-950/30 px-2 py-1 rounded border border-red-500/20 font-mono">
                                        Severity: CRITICAL
                                    </div>
                                </div>
                            </div>

                            {/* Report Item 2 */}
                            <div className="flex gap-4 p-5 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-yellow-500/30 transition-colors group">
                                <div className="mt-1">
                                    <AlertTriangle className="w-6 h-6 text-yellow-500 group-hover:scale-110 transition-transform" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">Spaghetti Code Architecture</h4>
                                    <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                                        The logic in <code className="bg-slate-800 px-1.5 py-0.5 rounded text-xs text-blue-300 font-mono">AuthService</code> is circular and unscalable. Rewriting this module will cost approx $2,500 in future dev time.
                                    </p>
                                    <div className="mt-3 inline-flex items-center gap-1 text-xs text-yellow-400 bg-yellow-950/30 px-2 py-1 rounded border border-yellow-500/20 font-mono">
                                        Severity: HIGH
                                    </div>
                                </div>
                            </div>

                            {/* Report Item 3 */}
                            <div className="flex gap-4 p-5 rounded-xl bg-slate-950/50 border border-slate-800/50 opacity-75">
                                <div className="mt-1">
                                    <CheckCircle className="w-6 h-6 text-green-500" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">Licensing & IP Ownership</h4>
                                    <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                                        All commits are signed by authorized contributors. No copy-left (GPL) libraries detected.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-800 flex justify-end">
                            <button className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold transition-colors">
                                Download Full PDF Report <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}