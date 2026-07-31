"use client";

import { CandidateProfile } from "@/types/candidate";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { Mail, User, Clock, Building2 } from "lucide-react";

interface ExecutiveProfileHeaderProps {
  profile: CandidateProfile;
  onCandidateNameChange?: (name: string) => void;
  onRoleChange?: (role: string) => void;
  onEmailChange?: (email: string) => void;
  onExperienceChange?: (experience: string) => void;
  onCompanyChange?: (company: string) => void;
}

const ROLE_OPTIONS = [
  { value: "Full Stack Engineer", label: "Full Stack Engineer" },
  { value: "Staff / Sr Backend Eng", label: "Staff / Sr Backend Eng" },
  { value: "Staff / Sr Frontend Eng", label: "Staff / Sr Frontend Eng" },
  { value: "Engineering Manager / Lead", label: "Engineering Manager / Lead" },
  { value: "AI / ML Engineer", label: "AI / ML Engineer" },
];

export function ExecutiveProfileHeader({
  profile,
  onCandidateNameChange,
  onRoleChange,
  onEmailChange,
  onExperienceChange,
  onCompanyChange,
}: ExecutiveProfileHeaderProps) {
  const report = profile.report;

  const getDecisionVariant = (decision?: string) => {
    if (!decision) return "neutral";
    if (decision === "Strong Hire" || decision === "Hire") return "good";
    if (decision === "Lean Hire") return "signal";
    return "risk";
  };

  return (
    <Card glass className="p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Dynamic Candidate Header Inputs */}
        <div className="flex items-center gap-4 flex-1">
          <Avatar name={profile.name || "Candidate"} size="lg" />
          <div className="space-y-3 flex-1 max-w-2xl">
            <div className="flex items-center gap-3 flex-wrap">
              {onCandidateNameChange ? (
                <div className="relative flex-1 min-w-[200px]">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => onCandidateNameChange(e.target.value)}
                    placeholder="Enter Candidate Name..."
                    className="w-full text-base font-bold text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-800 rounded-xl pl-9 pr-3 py-1.5 focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>
              ) : (
                <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">{profile.name}</h1>
              )}

              {onRoleChange ? (
                <Select value={profile.role} options={ROLE_OPTIONS} onChange={onRoleChange} />
              ) : (
                <Badge variant="brand">{profile.role}</Badge>
              )}

              <Badge variant={profile.evaluationStatus === "Completed" ? "good" : "neutral"}>
                {profile.evaluationStatus}
              </Badge>
            </div>

            {/* Email, Experience & Current Company Live Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
              {onEmailChange ? (
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => onEmailChange(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full bg-slate-100 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-slate-800 dark:text-slate-200 focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>
              ) : (
                <span className="text-slate-800 dark:text-slate-300">{profile.email}</span>
              )}

              {onExperienceChange ? (
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={profile.experience}
                    onChange={(e) => onExperienceChange(e.target.value)}
                    placeholder="Experience (e.g. 5+ Years)"
                    className="w-full bg-slate-100 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-slate-800 dark:text-slate-200 focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>
              ) : (
                <span className="text-slate-800 dark:text-slate-300">{profile.experience}</span>
              )}

              {onCompanyChange ? (
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={profile.currentCompany}
                    onChange={(e) => onCompanyChange(e.target.value)}
                    placeholder="Current Company"
                    className="w-full bg-slate-100 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-slate-800 dark:text-slate-200 focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>
              ) : (
                <span className="text-slate-800 dark:text-slate-300">{profile.currentCompany}</span>
              )}
            </div>
          </div>
        </div>

        {/* Score Ring Badge */}
        {report && (
          <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800 pt-4 md:pt-0 md:pl-6">
            <div className="text-right">
              <Badge variant={getDecisionVariant(report.hiringDecision)} className="text-xs px-3 py-1 font-bold">
                {report.hiringDecision}
              </Badge>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">
                Confidence: {report.confidence}
              </div>
            </div>

            <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500 flex flex-col items-center justify-center shadow-lg">
              <span className="text-lg font-extrabold text-amber-500 font-mono leading-none">{report.overallScore}</span>
              <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">/ 100</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
