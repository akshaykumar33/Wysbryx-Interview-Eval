"use client";

import { Users, TrendingUp, Award, AlertTriangle, Target, CheckCircle2, ShieldAlert, Sparkles, BarChart3 } from "lucide-react";
import { EvaluationReport } from "@/types/evaluation";
import { SkillRadarChart } from "@/components/SkillRadarChart";

interface ExecutiveAnalyticsDashboardProps {
  report: EvaluationReport | null;
  totalEvaluated: number;
}

export function ExecutiveAnalyticsDashboard({ report, totalEvaluated }: ExecutiveAnalyticsDashboardProps) {
  // Extract dynamic top strengths
  const topStrengths = report
    ? report.categories
        .filter((c) => c.score >= 7)
        .slice(0, 3)
    : [];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Executive KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-[#0B0F17]/80 p-6 backdrop-blur-xl shadow-xl shadow-slate-200/50 dark:shadow-none space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase text-slate-500 dark:text-slate-400 font-semibold tracking-wider">
            <span>TOTAL EVALUATED</span>
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-slate-100 font-mono tracking-tight">{totalEvaluated}</div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1">
            <TrendingUp className="h-3.5 w-3.5" /> Synchronized with Directory
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-[#0B0F17]/80 p-6 backdrop-blur-xl shadow-xl shadow-slate-200/50 dark:shadow-none space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase text-slate-500 dark:text-slate-400 font-semibold tracking-wider">
            <span>DECISION RESULT</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 dark:text-emerald-400">
              <Award className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 font-mono tracking-tight">
            {report ? report.hiringDecision : "Lean No Hire"}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Evaluation hiring verdict</div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-[#0B0F17]/80 p-6 backdrop-blur-xl shadow-xl shadow-slate-200/50 dark:shadow-none space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase text-slate-500 dark:text-slate-400 font-semibold tracking-wider">
            <span>OVERALL SCORE</span>
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500">
              <Target className="h-4 w-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-500 font-mono tracking-tight">
            {report ? report.overallScore : 0} <span className="text-xs text-slate-400 dark:text-slate-500 font-normal">/ 100</span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Weighted competency score</div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-[#0B0F17]/80 p-6 backdrop-blur-xl shadow-xl shadow-slate-200/50 dark:shadow-none space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase text-slate-500 dark:text-slate-400 font-semibold tracking-wider">
            <span>RISKS FLAGGED</span>
            <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 dark:text-rose-400">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-slate-100 font-mono tracking-tight">{report ? report.risks.length : 0}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Operational concerns identified</div>
        </div>
      </div>

      {/* Skill Contour & Synthesis Grid */}
      {report && (
        <div className="grid grid-cols-1 lg:grid-cols-[440px_1fr] gap-8">
          {/* Radar Chart Card */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-[#0B0F17]/80 p-6 backdrop-blur-xl shadow-xl space-y-4">
            <div className="font-mono text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-full flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-3">
              <span>COMPETENCY CONTOUR RADAR</span>
              <Target className="h-4 w-4 text-amber-500" />
            </div>
            <div className="w-full flex items-center justify-center py-2">
              <SkillRadarChart groupScores={report.groupScores} />
            </div>
          </div>

          {/* Executive Synthesis Card */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-[#0B0F17]/80 p-7 backdrop-blur-xl shadow-xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="font-mono text-xs font-semibold text-amber-500 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> Executive Synthesis Report
              </div>
              <div className="text-sm leading-relaxed text-slate-900 dark:text-slate-100 border-l-4 border-amber-500 bg-amber-500/10 dark:bg-amber-500/5 p-5 rounded-r-2xl border border-slate-200 dark:border-slate-800/80 font-sans shadow-inner">
                {report.summary}
              </div>
            </div>

            {/* Senior Baseline Comparison Bars */}
            <div className="space-y-3.5 pt-4 border-t border-slate-200 dark:border-slate-800/80">
              <div className="font-mono text-[11px] uppercase text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-amber-500" /> Competency vs Senior Team Baseline (80%)
              </div>
              <div className="space-y-3">
                {report.groupScores.map((g) => (
                  <div key={g.title} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-800 dark:text-slate-200">{g.title}</span>
                      <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">{g.score} / 100</span>
                    </div>
                    <div className="w-full h-3 bg-slate-200 dark:bg-slate-950 rounded-full overflow-hidden relative border border-slate-300 dark:border-slate-800/90 shadow-inner">
                      <div
                        className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 rounded-full transition-all duration-700 shadow-lg shadow-amber-500/20"
                        style={{ width: `${Math.min(100, Math.max(5, g.score))}%` }}
                      />
                      <div className="absolute top-0 bottom-0 left-[80%] w-0.5 bg-slate-400 dark:bg-slate-300 opacity-70" title="Senior Target Benchmark (80%)" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Key Strengths & Risk Radar Grid */}
      {report && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-[#0B0F17]/80 p-7 backdrop-blur-xl shadow-xl space-y-4">
            <h4 className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 font-sans tracking-tight">
              <Sparkles className="h-4.5 w-4.5" /> Key Observed Strengths
            </h4>
            <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
              {topStrengths.length > 0 ? (
                topStrengths.map((s) => (
                  <div key={s.name} className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/20 leading-relaxed font-sans space-y-1">
                    <b className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs">{s.name} ({s.score}/10):</b>
                    <p className="text-slate-900 dark:text-slate-200">{s.evidence}</p>
                  </div>
                ))
              ) : (
                <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                  No high-scoring categories (&gt;= 7/10) observed.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-[#0B0F17]/80 p-7 backdrop-blur-xl shadow-xl space-y-4">
            <h4 className="flex items-center gap-2 text-sm font-bold text-rose-600 dark:text-rose-400 font-sans tracking-tight">
              <ShieldAlert className="h-4.5 w-4.5" /> Operational Risk Radar
            </h4>
            <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
              {report.risks.map((r, i) => (
                <div key={i} className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-500/20 flex items-start gap-2.5 leading-relaxed font-sans">
                  <AlertTriangle className="h-4 w-4 text-rose-500 dark:text-rose-400 shrink-0 mt-0.5" />
                  <div>{r}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
