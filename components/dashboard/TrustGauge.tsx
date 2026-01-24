"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TrustGaugeProps {
    score: number;
}

export function TrustGauge({ score }: TrustGaugeProps) {
    const [animatedScore, setAnimatedScore] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAnimatedScore(score);
        }, 500); // Delay start
        return () => clearTimeout(timeout);
    }, [score]);

    // Determine color based on score
    const getColor = (s: number) => {
        if (s < 50) return "text-red-500 border-red-500";
        if (s < 80) return "text-yellow-500 border-yellow-500";
        return "text-green-500 border-green-500";
    };

    const getLabel = (s: number) => {
        if (s < 50) return "HIGH RISK";
        if (s < 80) return "CAUTION";
        return "TRUSTED";
    };

    return (
        <div className="relative flex flex-col items-center justify-center p-6">
            {/* Gauge Background */}
            <div className="relative h-48 w-48">
                {/* SVG Circle */}
                <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                    <circle
                        className="text-muted stroke-current"
                        strokeWidth="10"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                    />
                    <motion.circle
                        className={cn("stroke-current", getColor(score).split(" ")[0])}
                        strokeWidth="10"
                        strokeLinecap="round"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: animatedScore / 100 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                    />
                </svg>

                {/* Score Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                        className="text-5xl font-bold font-mono tracking-tighter"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {Math.round(animatedScore)}
                    </motion.span>
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-1">
                        Trust Score
                    </span>
                </div>
            </div>

            {/* Label Badge */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className={cn(
                    "mt-4 rounded-full border px-4 py-1 text-sm font-bold tracking-wider",
                    getColor(score)
                )}
            >
                {getLabel(score)}
            </motion.div>
        </div>
    );
}
