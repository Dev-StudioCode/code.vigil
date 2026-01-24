'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useScroll, useTransform, motion } from 'framer-motion';
import { ArrowRight, Eye, Lock, FileWarning, Cpu, Terminal, Shield, AlertTriangle, CheckCircle, Server, UploadCloud, FileCode, BarChart3, Users, DollarSign, Bug } from 'lucide-react';
import HeroScroll from '../components/HeroScroll';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Initializing scan...");

  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // === SCROLLYTELLING ANIMATION VALUES ===
  const opacity1 = useTransform(scrollYProgress, [0, 0.1], [0.3, 1]);
  const y1 = useTransform(scrollYProgress, [0, 0.1], [20, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
  const y2 = useTransform(scrollYProgress, [0.1, 0.2], [40, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  const y3 = useTransform(scrollYProgress, [0.2, 0.3], [40, 0]);
  const opacity4 = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);
  const scale4 = useTransform(scrollYProgress, [0.3, 0.45], [0.5, 1]);
  const opacityInput = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);
  const yInput = useTransform(scrollYProgress, [0.45, 0.55], [50, 0]);

  const handleScan = () => {
    setIsLoading(true);
    const logs = [
      "Connecting to GitHub API...",
      "Cloning repository...",
      "Scanning app/auth.ts...",
      "Detecting hardcoded secrets...",
      "WARNING: 3 Critical Issues Found.",
      "Generating Risk Report..."
    ];
    let step = 0;
    const interval = setInterval(() => {
      if (step < logs.length) {
        setLoadingText(logs[step]);
        step++;
      } else {
        clearInterval(interval);
        router.push('/dashboard');
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white selection:bg-blue-500/30 font-sans">

      {/* === FIXED LOGO HEADER === */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center p-6 backdrop-blur-sm bg-[#0f172a]/30">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-blue-500" strokeWidth={2.5} />
          <span className="text-2xl font-bold text-white tracking-tight">Code.Vigil</span>
        </div>
      </header>

      {/* === TERMINAL OVERLAY === */}
      {isLoading && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-950 border border-green-500/30 rounded-lg shadow-[0_0_50px_rgba(34,197,94,0.2)] font-mono text-sm overflow-hidden">
            <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center gap-2">
              <span className="ml-2 text-slate-400">code_vigil_auditor loading...</span>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-green-400 animate-pulse">
                <Terminal className="w-5 h-5" />
                <span>{loadingText}</span>
              </div>
              <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 animate-[progress_4s_ease-in-out_infinite] w-full origin-left" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* === SCROLL HERO (Text & Background) === */}
      <div ref={targetRef} className="relative h-[400vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Background Video Component */}
          <div className="absolute inset-0 z-0">
            <HeroScroll scrollYProgress={scrollYProgress} />
          </div>

          {/* Sticky Text Layer */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6">
            <div className="max-w-6xl mx-auto text-center mt-20">

              <motion.div
                style={{ opacity: opacity1 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-sm font-medium mb-12 backdrop-blur-md"
              >
                <Cpu className="w-4 h-4" />
                <span>AI-Powered Due Diligence</span>
              </motion.div>

              <h1 className="text-6xl md:text-9xl font-extrabold tracking-tight mb-12 flex flex-col md:block gap-4 leading-tight">
                <motion.span style={{ opacity: opacity1, y: y1 }} className="inline-block mr-4">Don't</motion.span>
                <motion.span style={{ opacity: opacity2, y: y2 }} className="inline-block mr-4 text-slate-300">Pay</motion.span>
                <motion.span style={{ opacity: opacity3, y: y3 }} className="inline-block mr-4 text-slate-500">for</motion.span>
                <br className="hidden md:block" />
                <motion.span
                  style={{ opacity: opacity4, scale: scale4 }}
                  className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-600 drop-shadow-[0_0_30px_rgba(239,68,68,0.6)]"
                >
                  Bad Code.
                </motion.span>
              </h1>

              <motion.div
                style={{ opacity: opacityInput, y: yInput }}
                className="pointer-events-auto max-w-lg mx-auto p-2 rounded-2xl bg-slate-800/60 border border-slate-700/50 backdrop-blur-xl shadow-2xl flex gap-2"
              >
                <input
                  type="text"
                  placeholder="https://github.com/agency/repo-name"
                  className="flex-1 bg-transparent border-none outline-none text-white px-4 placeholder:text-slate-400 font-mono text-sm"
                />
                <button
                  onClick={handleScan}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2"
                >
                  Audit <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>

            </div>
          </div>
        </div>
      </div>

      {/* === REST OF PAGE === */}
      <div className="relative z-20 bg-[#0f172a]">

        {/* SECTION 1: THE PROBLEM */}
        <section className="py-24 relative">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">The "Outsourcing" Trap</h2>
              <p className="text-slate-400">Why 25% of software projects fail before launch.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md hover:border-red-500/50 hover:bg-slate-900/60 transition-all group">
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-500/20 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all">
                  <Eye className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">The "Black Box"</h3>
                <p className="text-slate-400 leading-relaxed">
                  You pay for code you can't read. Agencies know this. They cut corners, skip security, and deliver spaghetti code.
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md hover:border-red-500/50 hover:bg-slate-900/60 transition-all group">
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-500/20 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all">
                  <Lock className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">The IP Hostage</h3>
                <p className="text-slate-400 leading-relaxed">
                  If the agency holds the repo, they hold your business. We verify that <strong>YOU</strong> own the code commits.
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md hover:border-red-500/50 hover:bg-slate-900/60 transition-all group">
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-500/20 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all">
                  <FileWarning className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Silent Technical Debt</h3>
                <p className="text-slate-400 leading-relaxed">
                  It works on their laptop, but is it scalable? We detect lazy coding patterns that cost thousands later.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: THE SOLUTION */}
        <section className="py-24 px-6 relative z-10 bg-slate-900/30 backdrop-blur-sm border-y border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-4">Your Automated CTO</h2>
              <p className="text-slate-400">We replace "Trust" with "Verification".</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 backdrop-blur-md shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <Shield className="w-8 h-8 text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.4)]" />
                  <h3 className="text-2xl font-bold">Smart Escrow Protection</h3>
                </div>
                <p className="text-slate-300 mb-6">
                  Funds are locked. If our AI detects critical vulnerabilities, the "Release Payment" button is disabled.
                </p>
                <div className="flex items-center gap-2 text-sm text-green-400 bg-green-950/50 border border-green-500/20 px-3 py-2 rounded-lg w-fit font-mono">
                  <CheckCircle className="w-4 h-4" /> Active_Protection: ENABLED
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 backdrop-blur-md shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <AlertTriangle className="w-8 h-8 text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.4)]" />
                  <h3 className="text-2xl font-bold">Plain English Reports</h3>
                </div>
                <p className="text-slate-300 mb-6">
                  No technical jargon. Our AI translates code issues into business risks.
                  <br /><br />
                  <em className="text-white">"Found hardcoded AWS keys in app.py. High Risk."</em>
                </p>
                <div className="flex items-center gap-2 text-sm text-blue-400 bg-blue-950/50 border border-blue-500/20 px-3 py-2 rounded-lg w-fit font-mono">
                  <Server className="w-4 h-4" /> Model: Gemini-1.5-Pro
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === NEW: STATISTICS SECTION === */}
        <section className="py-16 px-6 bg-[#0f172a]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Stat 1 */}
              <div className="flex flex-col items-center text-center p-4 border-r border-slate-800 last:border-none">
                <DollarSign className="w-8 h-8 text-green-500 mb-2 opacity-80" />
                <h3 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 mb-1">$1.2M+</h3>
                <p className="text-sm text-slate-400 font-medium">Investment Protected</p>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col items-center text-center p-4 border-r border-slate-800 last:border-none">
                <BarChart3 className="w-8 h-8 text-blue-500 mb-2 opacity-80" />
                <h3 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600 mb-1">98+</h3>
                <p className="text-sm text-slate-400 font-medium">Audits Conducted</p>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col items-center text-center p-4 border-r border-slate-800 last:border-none">
                <Bug className="w-8 h-8 text-red-500 mb-2 opacity-80" />
                <h3 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-600 mb-1">99.9%</h3>
                <p className="text-sm text-slate-400 font-medium">Risk Detection Rate</p>
              </div>

              {/* Stat 4 */}
              <div className="flex flex-col items-center text-center p-4">
                <Users className="w-8 h-8 text-purple-500 mb-2 opacity-80" />
                <h3 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-600 mb-1">100%</h3>
                <p className="text-sm text-slate-400 font-medium">Founder Ownership</p>
              </div>
            </div>
          </div>
        </section>

        {/* === FINAL CTA & DRAG-DROP SECTION === */}
        <section className="py-24 px-6 border-t border-slate-800 bg-gradient-to-b from-[#0f172a] to-blue-950/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Secure Your Investment?</h2>
            <p className="text-slate-400 mb-12 text-lg">
              Don't leave your project's fate to chance. Verify the code before you sign the check.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Option 1: URL */}
              <div className="p-8 rounded-2xl bg-slate-900 border border-slate-700 flex flex-col items-center justify-center gap-4 hover:border-blue-500 transition-colors cursor-pointer" onClick={handleScan}>
                <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold">Paste Repository</h3>
                <p className="text-sm text-slate-500">For GitHub, GitLab, or BitBucket URLs.</p>
                <button className="mt-2 text-blue-400 font-semibold text-sm flex items-center gap-1">
                  Scan URL <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Option 2: Drag & Drop */}
              <div className="p-8 rounded-2xl bg-slate-900 border-2 border-dashed border-slate-700 flex flex-col items-center justify-center gap-4 hover:border-blue-500 hover:bg-slate-800/50 transition-all cursor-pointer group" onClick={handleScan}>
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-blue-500" />
                </div>
                <h3 className="text-xl font-bold">Drag & Drop Code</h3>
                <p className="text-sm text-slate-500">Upload .zip, .js, .py, or .tsx files.</p>
                <div className="flex gap-2">
                  <FileCode className="w-4 h-4 text-slate-600" />
                  <span className="text-xs text-slate-600">Encrypted Upload</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-12 border-t border-white/10 text-center text-slate-500 text-sm relative z-10 bg-[#0f172a]">
          <p className="mb-4">© 2026 Code.Vigil Inc. Built for GDG TechSprint.</p>
          <div className="flex justify-center gap-6">
            <Link href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-blue-400 transition-colors">Twitter</Link>
          </div>
          <p className="mb-4">MVP by Code.Vigil</p>
        </footer>

      </div>
    </div>
  );
}