"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, ArrowRight, Github } from "lucide-react";
import { TerminalLoader } from "./TerminalLoader";

export function Hero() {
    const [repoUrl, setRepoUrl] = useState("");
    const [isAuditing, setIsAuditing] = useState(false);
    const router = useRouter();

    const handleAudit = () => {
        if (!repoUrl) return; // Simple validation
        setIsAuditing(true);
    };

    const handleAuditComplete = () => {
        // Navigate to dashboard with the repo URL as a query param
        // In a real app, we might start the server action here or pass data differently
        const encodedUrl = encodeURIComponent(repoUrl);
        router.push(`/dashboard?repo=${encodedUrl}`);
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-[80vh] px-4 py-16 text-center">
            {isAuditing && <TerminalLoader onComplete={handleAuditComplete} />}

            <div className="mx-auto max-w-4xl space-y-8">
                {/* Badge */}
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    <span>AI-Powered Due Diligence for Founders</span>
                </div>

                {/* Headline */}
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                    Don&apos;t Pay for <span className="text-red-500">Bad Code</span>.
                </h1>

                {/* Subhead */}
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
                    Secure your investment. Paste a GitHub repository URL to instantly audit code quality,
                    security risks, and developer performance before you release funds.
                </p>

                {/* Action Form */}
                <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4 sm:flex-row">
                    <div className="relative w-full">
                        <Github className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="e.g. https://github.com/username/repo"
                            className="pl-9 h-12 bg-background/50 border-input transition-all focus:border-primary focus:ring-primary/20"
                            value={repoUrl}
                            onChange={(e) => setRepoUrl(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAudit()}
                        />
                    </div>
                    <Button
                        size="lg"
                        className="h-12 w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)]"
                        onClick={handleAudit}
                        disabled={!repoUrl}
                    >
                        Run Security Audit
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>

                {/* Social Proof / Trust */}
                <div className="pt-8 text-sm text-muted-foreground">
                    <p>Trusted by non-technical founders managing over $10M in dev contracts.</p>
                </div>
            </div>

            {/* Background Decor */}
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#3b82f6] to-[#0f172a] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
            </div>
        </div>
    );
}
