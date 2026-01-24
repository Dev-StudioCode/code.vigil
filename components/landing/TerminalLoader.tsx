"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Terminal } from "lucide-react";

interface TerminalLoaderProps {
    onComplete: () => void;
}

const STEPS = [
    "Resolving repository...",
    "Cloning source code...",
    "Analyzing dependency tree...",
    "Scanning for hardcoded secrets...",
    "Checking architectural patterns...",
    "Evaluating code quality metrics...",
    "Generating Trust Score...",
    "Finalizing audit report...",
];

export function TerminalLoader({ onComplete }: TerminalLoaderProps) {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (currentStep < STEPS.length) {
            const timeout = setTimeout(() => {
                setCurrentStep((prev) => prev + 1);
            }, 400); // 400ms per step * 8 steps = ~3.2 seconds
            return () => clearTimeout(timeout);
        } else {
            // Small delay after last step before completing
            const timeout = setTimeout(() => {
                onComplete();
            }, 800);
            return () => clearTimeout(timeout);
        }
    }, [currentStep, onComplete]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg rounded-lg border border-border bg-card shadow-2xl overflow-hidden"
            >
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50">
                    <div className="flex items-center gap-2">
                        <Terminal className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs font-mono text-muted-foreground">
                            Code.Vigil Security Audit Protocol
                        </span>
                    </div>
                    <div className="flex gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/50" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                        <div className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/50" />
                    </div>
                </div>

                {/* Terminal Body */}
                <div className="p-6 font-mono text-sm h-64 flex flex-col justify-end bg-black/90">
                    <div className="space-y-2">
                        {STEPS.slice(0, currentStep).map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2 text-green-400"
                            >
                                <span>✓</span>
                                <span>{step}</span>
                            </motion.div>
                        ))}

                        {currentStep < STEPS.length && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center gap-2 text-primary"
                            >
                                <Loader2 className="h-3 w-3 animate-spin" />
                                <span className="animate-pulse">{STEPS[currentStep]}</span>
                            </motion.div>
                        )}

                        <div className="h-4" /> {/* Spacer */}

                        <div className="flex items-center gap-2 text-muted-foreground">
                            <span>root@codevigil:~$</span>
                            <span className="w-2 h-4 bg-primary animate-pulse inline-block" />
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
