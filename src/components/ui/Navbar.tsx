"use client";

import { CandidateProfile } from "@/types/candidate";

interface FloatingLogoHeaderProps {
  activeView: "intake" | "scorecard" | "profile" | "analytics" | "directory";
  onViewChange: (view: "intake" | "scorecard" | "profile" | "analytics" | "directory") => void;
  currentCandidate: CandidateProfile;
}

export function Navbar({ onViewChange }: FloatingLogoHeaderProps) {
  return (
    /* ONLY FLOATING LOGO ICON ON TOP-LEFT */
    <div className="fixed top-6 left-8 z-50">
      <div
        onClick={() => onViewChange("directory")}
        className="flex items-center gap-3 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800/90 bg-white/90 dark:bg-[#0B0F19]/90 backdrop-blur-2xl shadow-2xl cursor-pointer hover:border-slate-300 dark:hover:border-slate-700 transition-all select-none group"
      >
        <img
          src="https://www.wysbryx.com/wysbryx_v.png"
          alt="wysbryx logo"
          className="w-7 h-7 object-contain transition-transform group-hover:scale-105"
        />
        <div className="font-bold text-lg text-slate-900 dark:text-slate-100 tracking-tight">
          wys<span className="text-amber-500">bryx</span>
        </div>
      </div>
    </div>
  );
}
