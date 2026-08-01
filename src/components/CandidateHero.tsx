"use client";

import React from "react";
import { Avatar } from "./ui/Avatar";
import { Badge } from "./ui/Badge";
import { Card } from "./ui/Card";
import { Award, Clock, Sparkles } from "lucide-react";
import { EvaluationReport } from "@/types/evaluation";

interface CandidateHeroProps {
  candidate: string;
  role: string;
  onCandidateChange: (val: string) => void;
  onRoleChange: (val: string) => void;
  report: EvaluationReport | null;
  reportDate: string;
}

export function CandidateHero({
  candidate,
  role,
  onCandidateChange,
  onRoleChange,
  report,
  reportDate,
}: CandidateHeroProps) {
  const getDecisionVariant = (decision: string) => {
    if (decision === "Strong Hire" || decision === "Hire") return "good";
    if (decision === "Lean Hire") return "signal";
    return "risk";
  };

  return (
    <Card glass className="p-6 mb-6">
      <div className="flex items-center justify-between gap-6 flex-wrap">
        <div className="flex items-center gap-4">
          <Avatar name={candidate || "Candidate"} size="lg" />
          <div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={candidate}
                onChange={(e) => onCandidateChange(e.target.value)}
                placeholder="Enter Candidate Name..."
                className="text-2xl font-extrabold text-[var(--text-contrast)] bg-transparent border-b border-transparent hover:border-[var(--border-subtle)] focus:border-[var(--brand-primary)] focus:outline-none transition-colors"
              />
            </div>

            <div className="flex items-center gap-3 mt-1.5 flex-wrap">
              <select
                value={role}
                onChange={(e) => onRoleChange(e.target.value)}
                className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface-subtle)] px-2.5 py-1 text-xs text-[var(--brand-primary)] font-semibold focus:outline-none cursor-pointer"
              >
                <option value="Staff / Sr Backend Eng">Staff / Sr Backend Eng</option>
                <option value="Staff / Sr Frontend Eng">Staff / Sr Frontend Eng</option>
                <option value="Full Stack Engineer">Full Stack Engineer</option>
                <option value="Engineering Manager / Lead">Engineering Manager / Lead</option>
                <option value="AI / ML Engineer">AI / ML Engineer</option>
              </select>

              {reportDate && (
                <div className="flex items-center gap-1 text-xs text-[var(--text-muted)] font-mono">
                  <Clock className="h-3.5 w-3.5" />
                  {new Date(reportDate).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        </div>

        {report && (
          <div className="flex items-center gap-4">
            <div className="text-right">
              <Badge variant={getDecisionVariant(report.hiringDecision)} className="text-xs px-3.5 py-1 font-bold">
                {report.hiringDecision}
              </Badge>
              <div className="text-xs text-[var(--text-body)] font-mono mt-1">
                Confidence: {report.confidence}
              </div>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-[var(--brand-primary-glow)] border border-[var(--brand-primary)] flex flex-col items-center justify-center shadow-lg">
              <span className="text-xl font-extrabold text-[var(--brand-primary)] leading-none">{report.overallScore}</span>
              <span className="text-[9px] font-mono text-[var(--text-muted)] mt-0.5">/ 100</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
