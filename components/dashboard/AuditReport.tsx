"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AuditReportProps {
    summary: string;
    details: string[];
    status: string;
}

export function AuditReport({ summary, details, status }: AuditReportProps) {
    return (
        <Card className="h-full border-border bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <Search className="h-5 w-5 text-primary" />
                    AI Auditor Report
                </CardTitle>
                <Badge variant={status === "LOCKED" ? "destructive" : "outline"}>
                    {status === "LOCKED" ? "PAYMENT LOCKED" : "FUNDS RELEASED"}
                </Badge>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
                {/* CTO Comments */}
                <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                        Executive Summary
                    </h3>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="p-4 rounded-lg bg-muted/50 border border-border font-mono text-sm leading-relaxed"
                    >
                        <span className="text-primary mr-2">&gt;</span>
                        {summary}
                    </motion.div>
                </div>

                {/* Key Findings */}
                <div className="space-y-3">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                        Key Findings
                    </h3>
                    <ul className="space-y-2">
                        {details.map((item, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + i * 0.2 }}
                                className="flex items-start gap-3 p-3 rounded-md hover:bg-muted/30 transition-colors"
                            >
                                {status === "LOCKED" ? (
                                    <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                                ) : (
                                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                )}
                                <span className="text-sm">{item}</span>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
}
