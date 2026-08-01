"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  Compass,
  Network,
  Shield,
  Cpu,
  Users,
  Zap,
  RotateCcw,
  Sparkles,
  Award,
  PieChart,
  ListChecks,
  LayoutGrid,
  Search,
  Table as TableIcon,
  User,
  CheckCircle2,
  Lightbulb,
  FileText,
  Calendar,
  Mail,
  UserCheck,
  Folder,
  ChevronLeft,
  ChevronRight,
  Terminal,
  Clock,
  Building2,
  ArrowLeft,
  Edit3,
} from "lucide-react";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import { SavedRecord } from "@/types/evaluation";
import { GROUPS, ALL_CATS, QUICK_TAGS } from "@/utils/constants";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import RubricModal from "@/components/RubricModal";
import SavedModal from "@/components/SavedModal";
import { CommandMenu } from "@/components/CommandMenu";
import { ExecutiveProfileHeader } from "@/components/candidate/ExecutiveProfileHeader";
import { CandidateDataTable } from "@/components/candidate/CandidateDataTable";
import { ExecutiveAnalyticsDashboard } from "@/components/analytics/ExecutiveAnalyticsDashboard";
import { InteractiveEvaluationCard } from "@/components/candidate/InteractiveEvaluationCard";
import { Navbar } from "@/components/ui/Navbar";
import { FloatingRightActionDock } from "@/components/ui/FloatingRightActionDock";
import { Select } from "@/components/ui/Select";
import { useEvalStore } from "@/store/useEvalStore";

const ICON_MAP: Record<string, React.ElementType> = {
  Compass,
  Network,
  Shield,
  Cpu,
  Users,
};

const ROLE_OPTIONS = [
  { value: "Full Stack Engineer", label: "Full Stack Engineer" },
  { value: "Staff / Sr Backend Eng", label: "Staff / Sr Backend Eng" },
  { value: "Staff / Sr Frontend Eng", label: "Staff / Sr Frontend Eng" },
  { value: "Engineering Manager / Lead", label: "Engineering Manager / Lead" },
  { value: "AI / ML Engineer", label: "AI / ML Engineer" },
];

export default function Home() {
  // ── Atomic Zustand Store Selectors (0ms re-render overhead) ──
  const activeView = useEvalStore((s) => s.activeView);
  const setActiveView = useEvalStore((s) => s.setActiveView);
  const activeGroupIndex = useEvalStore((s) => s.activeGroupIndex);
  const setActiveGroupIndex = useEvalStore((s) => s.setActiveGroupIndex);
  const currentCandidate = useEvalStore((s) => s.currentCandidate);
  const updateCandidateField = useEvalStore((s) => s.updateCandidateField);
  const interviewerName = useEvalStore((s) => s.interviewerName);
  const setInterviewerName = useEvalStore((s) => s.setInterviewerName);
  const interviewDate = useEvalStore((s) => s.interviewDate);
  const setInterviewDate = useEvalStore((s) => s.setInterviewDate);
  const evaluationState = useEvalStore((s) => s.evaluationState);
  const setScore = useEvalStore((s) => s.setScore);
  const setCovered = useEvalStore((s) => s.setCovered);
  const setNotes = useEvalStore((s) => s.setNotes);
  const report = useEvalStore((s) => s.report);
  const directory = useEvalStore((s) => s.directory);
  const savedRecords = useEvalStore((s) => s.savedRecords);
  const setSavedRecords = useEvalStore((s) => s.setSavedRecords);
  const isGenerating = useEvalStore((s) => s.isGenerating);
  const savedOpen = useEvalStore((s) => s.savedOpen);
  const setSavedOpen = useEvalStore((s) => s.setSavedOpen);
  const activeRubric = useEvalStore((s) => s.activeRubric);
  const setActiveRubric = useEvalStore((s) => s.setActiveRubric);

  const resetForNewCandidate = useEvalStore((s) => s.resetForNewCandidate);
  const startEvaluation = useEvalStore((s) => s.startEvaluation);
  const selectCandidate = useEvalStore((s) => s.selectCandidate);
  const loadAyushData = useEvalStore((s) => s.loadAyushData);
  const generateReport = useEvalStore((s) => s.generateReport);
  const syncCurrentToDirectory = useEvalStore((s) => s.syncCurrentToDirectory);
  const initDirectoryFromStorage = useEvalStore((s) => s.initDirectoryFromStorage);

  const isProfileComplete = currentCandidate.name.trim().length > 0 && currentCandidate.email.trim().length > 0;
  const isEditingExisting = directory.some((c) => c.id === currentCandidate.id);
  const ratedCount = Object.values(evaluationState).filter(
    (s) => s.score > 0 || s.covered !== null || s.notes.trim() !== ""
  ).length;
  const progressPct = Math.round((ratedCount / ALL_CATS.length) * 100);

  // ── Theme ──
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const refreshSavedRecords = useEvalStore((s) => s.refreshSavedRecords);

  useEffect(() => {
    setMounted(true);
    initDirectoryFromStorage();
    refreshSavedRecords();
  }, []);

  const deleteSavedRecord = (id: string) => {
    fetch(`/api/candidates?id=${encodeURIComponent(id)}`, { method: "DELETE" })
      .then(() => {
        refreshSavedRecords();
        toast.success("Scorecard deleted");
      })
      .catch((e) => console.error("Failed to delete record:", e));
  };

  const loadSavedRecord = (id: string) => {
    const data = savedRecords.find((r) => r.id === id);
    if (!data) return;
    const s = useEvalStore.getState();
    s.setCurrentCandidate({ ...s.currentCandidate, name: data.candidate, role: data.role, email: data.candidateEmail || s.currentCandidate.email });
    if (data.interviewerName) s.setInterviewerName(data.interviewerName);
    s.setEvaluationState(data.categories);
    s.setReport(data.report);
    s.setReportDate(data.date);
    s.setActiveView("profile");
    toast.success(`Loaded saved evaluation profile for ${data.candidate}`);
  };

  // ── Handlers ──
  const handleReset = () => {
    resetForNewCandidate();
    toast.info("Ready for a new candidate!");
  };

  const handleStartEvaluation = () => {
    startEvaluation();
    if (isProfileComplete) {
      toast.success(`Starting evaluation for ${currentCandidate.name}!`);
    }
  };

  const handleToggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    toast.success(`Theme switched to ${nextTheme} mode`);
  };

  const handleGenerate = () => {
    generateReport();
    setTimeout(() => {
      const s = useEvalStore.getState();
      if (s.report && s.report.overallScore >= 80) {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      }
      toast.success(`Generated evaluation report for ${s.currentCandidate.name}!`);
    }, 400);
  };

  const handleSelectCandidate = (cand: import("@/types/candidate").CandidateProfile) => {
    selectCandidate(cand);
    toast.success(`Opened Profile page for ${cand.name}`);
  };

  const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  const currentGroup = GROUPS[activeGroupIndex];
  const IconComp = ICON_MAP[currentGroup.icon] || Compass;

  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#080B11] text-slate-900 dark:text-slate-100 flex flex-col font-sans relative pr-16 md:pr-20 pt-20">
      {/* FLOATING HEARTBEAT ACTION DOCK ON RIGHT SIDE */}
      <FloatingRightActionDock
        activeView={activeView}
        onViewChange={setActiveView}
        savedCount={savedRecords.length}
        onOpenSaved={() => setSavedOpen(true)}
        onLoadSample={loadAyushData}
        onReset={handleReset}
        onGenerate={handleGenerate}
        onOpenSearch={() => setSearchOpen(true)}
        isGenerating={isGenerating}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        mounted={mounted}
      />

      {/* FLOATING LOGO ICON (TOP-LEFT) */}
      <Navbar
        activeView={activeView}
        onViewChange={setActiveView}
        currentCandidate={currentCandidate}
      />

      {/* Main Workspace View */}
      <main className="max-w-7xl mx-auto w-full px-8 py-8 flex-1">
        {/* VIEW 1: TABBED CATEGORY GROUP EVALUATION WORKSPACE */}
        {/* VIEW 0: CANDIDATE INTAKE FORM — THE ROOT PAGE */}
        {activeView === "intake" && (
          <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-300">
            {/* Heading */}
            <div className="text-center space-y-2 pt-4">
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                {isEditingExisting ? "Edit Candidate Profile" : "New Candidate Intake"}
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                {isEditingExisting
                  ? `Update profile details for ${currentCandidate.name}. Changes are saved automatically.`
                  : "Fill in the candidate's profile details to begin the technical evaluation."
                }
              </p>
            </div>

            {/* Profile Form Card */}
            <Card glass className="p-8 space-y-6">
              <div className="space-y-5">
                {/* Candidate Name */}
                <div>
                  <label className="block text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-2 uppercase font-semibold tracking-wider">CANDIDATE NAME *</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={currentCandidate.name}
                      onChange={(e) => updateCandidateField("name", e.target.value)}
                      placeholder="e.g. Ayush Jaiswal"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/80 pl-10 pr-4 py-3 text-sm text-slate-900 dark:text-slate-100 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none font-semibold transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Target Position / Role */}
                <div>
                  <label className="block text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-2 uppercase font-semibold tracking-wider">TARGET POSITION *</label>
                  <Select
                    value={currentCandidate.role}
                    options={ROLE_OPTIONS}
                    onChange={(role) => updateCandidateField("role", role)}
                  />
                </div>

                {/* Candidate Email */}
                <div>
                  <label className="block text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-2 uppercase font-semibold tracking-wider">CANDIDATE EMAIL *</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="email"
                      value={currentCandidate.email}
                      onChange={(e) => updateCandidateField("email", e.target.value)}
                      placeholder="candidate@example.com"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/80 pl-10 pr-4 py-3 text-sm text-slate-900 dark:text-slate-100 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none font-medium transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Experience */}
                  <div>
                    <label className="block text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-2 uppercase font-semibold tracking-wider">EXPERIENCE</label>
                    <div className="relative">
                      <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        value={currentCandidate.experience}
                        onChange={(e) => updateCandidateField("experience", e.target.value)}
                        placeholder="e.g. 5+ Years"
                        className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/80 pl-10 pr-4 py-3 text-sm text-slate-900 dark:text-slate-100 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none font-medium transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Current Company */}
                  <div>
                    <label className="block text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-2 uppercase font-semibold tracking-wider">CURRENT COMPANY</label>
                    <div className="relative">
                      <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        value={currentCandidate.currentCompany}
                        onChange={(e) => updateCandidateField("currentCompany", e.target.value)}
                        placeholder="e.g. Tech Corp"
                        className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/80 pl-10 pr-4 py-3 text-sm text-slate-900 dark:text-slate-100 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none font-medium transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-slate-200 dark:border-slate-800" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Interviewer Name */}
                  <div>
                    <label className="block text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-2 uppercase font-semibold tracking-wider">INTERVIEWER NAME</label>
                    <div className="relative">
                      <UserCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        value={interviewerName}
                        onChange={(e) => setInterviewerName(e.target.value)}
                        placeholder="Your name"
                        className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/80 pl-10 pr-4 py-3 text-sm text-slate-900 dark:text-slate-100 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none font-medium transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Interview Date */}
                  <div>
                    <label className="block text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-2 uppercase font-semibold tracking-wider">INTERVIEW DATE</label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="date"
                        value={interviewDate}
                        onChange={(e) => setInterviewDate(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/80 pl-10 pr-4 py-3 text-sm text-slate-900 dark:text-slate-100 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none font-medium transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className={`transition-all duration-500 ${isProfileComplete ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full py-4 text-base font-bold"
                  onClick={() => {
                    // Sync to directory
                    syncCurrentToDirectory();
                    if (isEditingExisting) {
                      setActiveView("scorecard");
                      toast.success(`Profile updated for ${currentCandidate.name}!`);
                    } else {
                      handleStartEvaluation();
                    }
                  }}
                  leftIcon={<Sparkles className="h-5 w-5" />}
                >
                  {isEditingExisting ? "Save & Return to Evaluation →" : "Start Evaluation →"}
                </Button>
              </div>
            </Card>

            {/* Existing Directory Quick Access */}
            {directory.length > 0 && (
              <div className="text-center">
                <button
                  onClick={() => setActiveView("directory")}
                  className="text-xs text-slate-500 dark:text-slate-400 hover:text-amber-500 transition-colors font-mono underline underline-offset-4 cursor-pointer"
                >
                  or browse {directory.length} existing candidate{directory.length !== 1 ? "s" : ""} in the directory →
                </button>
              </div>
            )}
          </div>
        )}

        {/* VIEW 1: TABBED CATEGORY GROUP EVALUATION WORKSPACE */}
        {activeView === "scorecard" && (
          <div className="space-y-6">
            {/* BACK TO INTAKE HEADER */}
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveView("intake")}
                leftIcon={<ArrowLeft className="h-4 w-4" />}
              >
                Back to Profile Form
              </Button>
              <div className="text-xs text-slate-500 font-mono font-semibold">
                Evaluating <b className="text-amber-500">{currentCandidate.name || "New Candidate"}</b>
              </div>
            </div>

            {/* DYNAMIC INTERVIEW AUDIT METADATA ENTRY BANNER */}
            {/* READ-ONLY CANDIDATE METADATA SUMMARY BAR */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/40 p-5 backdrop-blur-xl shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-mono font-semibold text-amber-500 uppercase tracking-wider flex items-center gap-2">
                  <UserCheck className="h-4 w-4" /> Candidate Profile Summary
                </div>
                <button
                  onClick={() => setActiveView("intake")}
                  className="text-[11px] text-slate-500 hover:text-amber-500 font-mono underline underline-offset-2 cursor-pointer transition-colors flex items-center gap-1"
                >
                  <Edit3 className="h-3 w-3" /> Edit Profile
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                <div className="space-y-0.5">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Name</div>
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">{currentCandidate.name || "—"}</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Role</div>
                  <div className="text-xs font-semibold text-purple-600 dark:text-purple-400 truncate">{currentCandidate.role}</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Email</div>
                  <div className="text-xs text-slate-700 dark:text-slate-300 font-mono truncate">{currentCandidate.email || "—"}</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Experience</div>
                  <div className="text-xs text-slate-700 dark:text-slate-300 truncate">{currentCandidate.experience || "—"}</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Company</div>
                  <div className="text-xs text-slate-700 dark:text-slate-300 truncate">{currentCandidate.currentCompany || "—"}</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Interviewer</div>
                  <div className="text-xs text-slate-700 dark:text-slate-300 truncate">{interviewerName || "—"}</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Date</div>
                  <div className="text-xs text-slate-700 dark:text-slate-300 font-mono">{interviewDate}</div>
                </div>
              </div>
            </div>

            {/* TABBED CATEGORY GROUP SWITCHER BAR */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800/80">
              {GROUPS.map((g, idx) => {
                const GroupIcon = ICON_MAP[g.icon] || Compass;
                const isSelected = activeGroupIndex === idx;

                const groupRatedCount = g.cats.filter((c) => (evaluationState[c]?.score || 0) > 0 || evaluationState[c]?.covered !== null).length;

                return (
                  <button
                    key={g.title}
                    onClick={() => setActiveGroupIndex(idx)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20 border border-amber-400"
                        : "bg-white dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    <GroupIcon className="h-4 w-4" />
                    <span>{g.title}</span>
                    <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? "bg-amber-600 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-400"}`}>
                      {groupRatedCount}/{g.cats.length}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Focused Section Content */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-3">
                <div>
                  <h3 className="flex items-center gap-2.5 text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                    <IconComp className="h-5 w-5 text-amber-500" /> {currentGroup.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{currentGroup.sub}</p>
                </div>

                {/* Section Navigation Prev/Next */}
                <div className="flex items-center gap-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled={activeGroupIndex === 0}
                    onClick={() => setActiveGroupIndex(Math.max(0, activeGroupIndex - 1))}
                    leftIcon={<ChevronLeft className="h-4 w-4 text-amber-500" />}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    disabled={activeGroupIndex === GROUPS.length - 1}
                    onClick={() => setActiveGroupIndex(Math.min(GROUPS.length - 1, activeGroupIndex + 1))}
                    rightIcon={<ChevronRight className="h-4 w-4" />}
                  >
                    Next Section
                  </Button>
                </div>
              </div>

              {/* Render Current Group's Topics with Interactive Apple Evaluation Cards */}
              <div className="space-y-6">
                {currentGroup.cats.map((c) => {
                  const catState = evaluationState[c] || { score: 0, covered: null, notes: "" };
                  const chips = QUICK_TAGS[c] || ["+ Strong reasoning", "+ Handled trade-offs", "- Needs improvement"];

                  return (
                    <InteractiveEvaluationCard
                      key={c}
                      id={"cat-" + slug(c)}
                      category={c}
                      score={catState.score}
                      covered={catState.covered}
                      notes={catState.notes}
                      chips={chips}
                      onScoreChange={(score) => setScore(c, score)}
                      onCoveredChange={(cov) => setCovered(c, cov)}
                      onNotesChange={(text) => setNotes(c, text)}
                      onOpenRubric={() => setActiveRubric(c)}
                    />
                  );
                })}
              </div>

              {/* Bottom Section Navigation */}
              <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800/80 pt-5">
                <Button
                  variant="secondary"
                  size="md"
                  disabled={activeGroupIndex === 0}
                  onClick={() => setActiveGroupIndex(Math.max(0, activeGroupIndex - 1))}
                  leftIcon={<ChevronLeft className="h-4 w-4 text-amber-500" />}
                >
                  Previous Section
                </Button>

                {activeGroupIndex < GROUPS.length - 1 ? (
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => setActiveGroupIndex(Math.min(GROUPS.length - 1, activeGroupIndex + 1))}
                    rightIcon={<ChevronRight className="h-4 w-4" />}
                  >
                    Next Section
                  </Button>
                ) : (
                  <Button variant="primary" size="md" onClick={handleGenerate} leftIcon={<Sparkles className="h-4 w-4" />}>
                    Complete & Generate Evaluation
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: PROPER CANDIDATE PROFILE HUB */}
        {activeView === "profile" && (
          <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveView("directory")}
                leftIcon={<ArrowLeft className="h-4 w-4" />}
              >
                Back to Candidate Directory
              </Button>
              <Badge variant="brand">Candidate Profile & Evaluation Hub</Badge>
            </div>

            {/* Editable Profile Header */}
            <ExecutiveProfileHeader
              profile={currentCandidate}
              onCandidateNameChange={(name) => updateCandidateField("name", name)}
              onRoleChange={(role) => updateCandidateField("role", role)}
              onEmailChange={(email) => updateCandidateField("email", email)}
              onExperienceChange={(experience) => updateCandidateField("experience", experience)}
              onCompanyChange={(currentCompany) => updateCandidateField("currentCompany", currentCompany)}
            />

            {/* Candidate Review & Evaluation Action Hub */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Interactive Scorecard Flow */}
              <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white/90 dark:bg-[#0E131F]/90 p-6 space-y-4 hover:border-amber-500/60 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 w-fit group-hover:scale-110 transition-transform">
                    <Edit3 className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Interactive Evaluation Flow</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    Rate candidate across 23 technical, architectural, product, and leadership topics using Apple-grade segment dials.
                  </p>

                  <div className="pt-2">
                    <div className="flex justify-between text-xs text-slate-700 dark:text-slate-300 font-mono mb-1.5 font-semibold">
                      <span>Evaluated Topics</span>
                      <span className="text-amber-600 dark:text-amber-400 font-bold">{ratedCount} / {ALL_CATS.length}</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden border border-slate-200/60 dark:border-slate-700/60 p-0.5">
                      <div className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-300 shadow-sm" style={{ width: `${progressPct}%` }} />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveView("scorecard")}
                  className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-xs shadow-md shadow-amber-500/25 hover:shadow-lg hover:shadow-amber-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer border border-amber-400/50"
                >
                  <ListChecks className="h-4 w-4" />
                  <span>{ratedCount > 0 ? "Edit / Continue Evaluation" : "Start Evaluation"}</span>
                </button>
              </div>

              {/* Card 2: Executive Analytics & Synthesis */}
              <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white/90 dark:bg-[#0E131F]/90 p-6 space-y-4 hover:border-purple-500/60 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 w-fit group-hover:scale-110 transition-transform">
                    <PieChart className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Analytics & Synthesis Report</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    View intelligence-driven radar contour charts, senior baseline benchmarks, observed strengths, and risk analysis.
                  </p>

                  {report ? (
                    <div className="pt-2 p-3 rounded-xl bg-purple-50/80 dark:bg-purple-950/30 border border-purple-200/80 dark:border-purple-800/40 space-y-2 text-xs">
                      <div className="flex justify-between border-b border-purple-200/60 dark:border-purple-800/40 pb-1.5">
                        <span className="text-slate-600 dark:text-slate-400 font-medium">Overall Score:</span>
                        <span className="font-mono font-bold text-purple-700 dark:text-purple-300">{report.overallScore} / 100</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-400 font-medium">Verdict:</span>
                        <Badge variant={report.hiringDecision.includes("Hire") ? "good" : "risk"}>{report.hiringDecision}</Badge>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-4 text-xs text-slate-400 italic">No report generated yet</div>
                  )}
                </div>

                <button
                  onClick={() => setActiveView("analytics")}
                  className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-md shadow-purple-500/25 hover:shadow-lg hover:shadow-purple-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer border border-purple-400/50"
                >
                  <PieChart className="h-4 w-4" />
                  <span>View Executive Analytics</span>
                </button>
              </div>

              {/* Card 3: Directory Pipeline & Candidates */}
              <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white/90 dark:bg-[#0E131F]/90 p-6 space-y-4 hover:border-blue-500/60 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 w-fit group-hover:scale-110 transition-transform">
                    <TableIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Candidate Pipeline Directory</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    Manage candidate applications, filter by role or status, and export evaluation data to CSV format.
                  </p>
                  <div className="pt-2 p-3 rounded-xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-800/40 text-xs text-slate-600 dark:text-slate-400 font-mono font-medium flex justify-between items-center">
                    <span>Active Candidates:</span>
                    <b className="text-blue-700 dark:text-blue-300 font-bold text-sm">{directory.length}</b>
                  </div>
                </div>

                <button
                  onClick={() => setActiveView("directory")}
                  className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer border border-blue-400/50"
                >
                  <TableIcon className="h-4 w-4" />
                  <span>Open Candidate Pipeline</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: ANALYTICS & REPORTS */}
        {activeView === "analytics" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveView("profile")}
                leftIcon={<ArrowLeft className="h-4 w-4" />}
              >
                Back to Candidate Profile
              </Button>
              <div className="text-xs text-slate-500 font-mono font-semibold">
                Analytics Report for <b className="text-amber-500">{currentCandidate.name || "Candidate"}</b>
              </div>
            </div>

            <ExecutiveAnalyticsDashboard report={report} totalEvaluated={savedRecords.length || 1} />

            {report && (
              <div className="space-y-8">
                {/* Category Evaluation Breakdown */}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-[#0B0F17]/80 p-7 backdrop-blur-xl shadow-xl space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-4">
                    <h3 className="flex items-center gap-2.5 text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                      <ListChecks className="h-5 w-5 text-amber-500" /> Topic Evaluation & Evidence Breakdown
                    </h3>
                    <span className="font-mono text-xs text-slate-500 dark:text-slate-400 font-semibold">
                      {report.categories.length} Categories Audited
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {report.categories.map((c) => (
                      <div key={c.name} className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/50 p-5 space-y-3.5 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                        <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800/80 pb-2.5">
                          <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">{c.name}</span>
                          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/50 flex items-center justify-center font-mono font-extrabold text-amber-500 dark:text-amber-400 text-sm">
                            {c.score}/10
                          </div>
                        </div>

                        {c.evidence && (
                          <div className="rounded-xl bg-slate-100 dark:bg-[#080B11] p-3.5 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-300 font-mono leading-relaxed space-y-1">
                            <div className="font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 text-[10px] uppercase tracking-wider">
                              <Terminal className="h-3 w-3 text-amber-500" /> Evidence & Notes:
                            </div>
                            <div className="text-slate-900 dark:text-slate-200">{c.evidence}</div>
                          </div>
                        )}

                        {c.strengths && (
                          <div className="flex items-start gap-2.5 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/25 border border-emerald-200 dark:border-emerald-500/20 p-3 rounded-xl font-sans">
                            <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-emerald-500 dark:text-emerald-400" />
                            <div>
                              <b className="font-semibold">Observed Strength:</b> {c.strengths}
                            </div>
                          </div>
                        )}

                        {c.suggestions && (
                          <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-3 rounded-xl font-sans">
                            <Lightbulb className="h-4 w-4 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
                            <div>
                              <b className="font-semibold text-slate-900 dark:text-slate-200">Recommendation:</b> {c.suggestions}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical & Soft Skill Matrices */}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-[#0B0F17]/80 p-7 backdrop-blur-xl shadow-xl space-y-6">
                  <div className="flex items-center gap-2.5 text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight border-b border-slate-200 dark:border-slate-800/80 pb-4">
                    <LayoutGrid className="h-5 w-5 text-amber-500" /> Technical & Soft Skill Evaluation Matrices
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-mono text-xs font-semibold text-amber-500 uppercase mb-4 tracking-wider">Technical Competencies</h4>
                      <table className="w-full text-xs text-left">
                        <tbody>
                          {report.technicalBreakdown.map((t) => (
                            <tr key={t.area} className="border-b border-slate-200 dark:border-slate-800/80 last:border-0">
                              <td className="py-3.5 pr-4 text-slate-500 dark:text-slate-400 font-mono text-xs font-semibold w-48">{t.area}</td>
                              <td className="py-3.5 text-slate-800 dark:text-slate-200 leading-relaxed font-sans">{t.note}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <h4 className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-4 tracking-wider">Soft Skills & Leadership</h4>
                      <table className="w-full text-xs text-left">
                        <tbody>
                          {report.softSkills.map((t) => (
                            <tr key={t.area} className="border-b border-slate-200 dark:border-slate-800/80 last:border-0">
                              <td className="py-3.5 pr-4 text-slate-500 dark:text-slate-400 font-mono text-xs font-semibold w-48">{t.area}</td>
                              <td className="py-3.5 text-slate-800 dark:text-slate-200 leading-relaxed font-sans">{t.note}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 4: DEDICATED CANDIDATE DIRECTORY PAGE */}
        {activeView === "directory" && (
          <div className="space-y-6">
            <Card glass className="p-6 space-y-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TableIcon className="h-5 w-5 text-amber-500" /> Candidate Directory & Pipeline
                </CardTitle>
              </CardHeader>
              <CandidateDataTable
                candidates={directory}
                onSelectCandidate={handleSelectCandidate}
              />
            </Card>
          </div>
        )}
      </main>

      <RubricModal category={activeRubric} onClose={() => setActiveRubric(null)} />
      <SavedModal
        isOpen={savedOpen}
        records={savedRecords}
        onClose={() => setSavedOpen(false)}
        onSelect={loadSavedRecord}
        onDelete={deleteSavedRecord}
      />
      <CommandMenu
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onLoadSample={loadAyushData}
        onReset={handleReset}
        onGenerate={handleGenerate}
        onOpenSaved={() => setSavedOpen(true)}
      />
    </div>
  );
}
