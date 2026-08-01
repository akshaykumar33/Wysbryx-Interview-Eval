"use client";

import { Award, AlertTriangle, CheckCircle2, Target, Percent } from "lucide-react";
import { EvaluationReport } from "@/types/evaluation";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface KPICardsProps {
  report: EvaluationReport;
  ratedCount: number;
  totalCats: number;
}

export function KPICards({ report, ratedCount, totalCats }: KPICardsProps) {
  const completionPct = Math.round((ratedCount / totalCats) * 100);

  const getDecisionVariant = (decision: string) => {
    if (decision === "Strong Hire" || decision === "Hire") return "good";
    if (decision === "Lean Hire") return "signal";
    return "risk";
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      {/* Overall Score Card */}
      <Card glass className="p-4">
        <div className="flex items-center justify-between text-xs font-mono font-medium text-[var(--text-muted)]">
          <span>OVERALL SCORE</span>
          <Target className="h-4 w-4 text-[var(--brand-primary)]" />
        </div>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-3xl font-extrabold text-[var(--text-contrast)] tracking-tight">{report.overallScore}</span>
          <span className="text-xs text-[var(--text-muted)] font-mono">/ 100</span>
        </div>
        <div className="mt-2 text-[11px] text-[var(--text-body)]">
          Weighted average across categories
        </div>
      </Card>

      {/* Recommendation Card */}
      <Card glass className="p-4">
        <div className="flex items-center justify-between text-xs font-mono font-medium text-[var(--text-muted)]">
          <span>RECOMMENDATION</span>
          <Award className="h-4 w-4 text-emerald-400" />
        </div>
        <div className="mt-2">
          <Badge variant={getDecisionVariant(report.hiringDecision)}>
            {report.hiringDecision}
          </Badge>
        </div>
        <div className="mt-2 text-[11px] text-[var(--text-body)] flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Confidence: {report.confidence}
        </div>
      </Card>

      {/* Completion Card */}
      <Card glass className="p-4">
        <div className="flex items-center justify-between text-xs font-mono font-medium text-[var(--text-muted)]">
          <span>COMPLETION</span>
          <Percent className="h-4 w-4 text-blue-400" />
        </div>
        <div className="mt-2 text-3xl font-extrabold text-[var(--text-contrast)] tracking-tight">{completionPct}%</div>
        <div className="mt-2 text-[11px] text-[var(--text-body)]">
          {ratedCount} of {totalCats} topics rated
        </div>
      </Card>

      {/* Risks Card */}
      <Card glass className="p-4">
        <div className="flex items-center justify-between text-xs font-mono font-medium text-[var(--text-muted)]">
          <span>RISKS FLAGGED</span>
          <AlertTriangle className="h-4 w-4 text-rose-400" />
        </div>
        <div className="mt-2 text-3xl font-extrabold text-[var(--text-contrast)] tracking-tight">{report.risks.length}</div>
        <div className="mt-2 text-[11px] text-[var(--text-body)]">
          {report.risks.length === 0 ? "No critical risks" : "Flagged for management review"}
        </div>
      </Card>
    </div>
  );
}
