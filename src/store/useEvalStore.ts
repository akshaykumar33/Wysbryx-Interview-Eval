import { create } from "zustand";
import { CandidateProfile } from "@/types/candidate";
import { StateMap, EvaluationReport, SavedRecord } from "@/types/evaluation";
import { ALL_CATS } from "@/utils/constants";
import { generateEvaluationReport } from "@/utils/engine";

// ─── Helpers ──────────────────────────────────────────────────

export type ViewType = "intake" | "scorecard" | "profile" | "analytics" | "directory";

function initialStates(): StateMap {
  const s: StateMap = {};
  ALL_CATS.forEach((c) => {
    s[c] = { score: 0, covered: null, notes: "" };
  });
  return s;
}

function freshCandidate(): CandidateProfile {
  return {
    id: "cand-new-" + Date.now(),
    name: "",
    role: "Full Stack Engineer",
    experience: "",
    email: "",
    phone: "",
    location: "",
    currentCompany: "",
    skills: [],
    evaluationStatus: "Pending",
    interviewerName: "",
    interviewDate: new Date().toISOString().split("T")[0],
    state: initialStates(),
  };
}



// ─── Non-Blocking Server API Sync Helpers ──────────────────────

let candidateSyncTimer: ReturnType<typeof setTimeout> | null = null;

function syncCandidateToServer(candidate: CandidateProfile) {
  if (!candidate.name || candidate.name.trim().length === 0) return;
  if (candidateSyncTimer) clearTimeout(candidateSyncTimer);
  candidateSyncTimer = setTimeout(() => {
    fetch("/api/candidates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(candidate),
    }).catch((e) => console.error("Failed to sync candidate to server DB:", e));
  }, 200);
}

// ─── Store Interface ──────────────────────────────────────────

interface EvalStore {
  // ── Navigation ──
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  activeGroupIndex: number;
  setActiveGroupIndex: (idx: number) => void;

  // ── Candidate Profile ──
  currentCandidate: CandidateProfile;
  setCurrentCandidate: (cand: CandidateProfile) => void;
  updateCandidateField: (field: keyof CandidateProfile, value: string) => void;

  // ── Interview Metadata ──
  interviewerName: string;
  setInterviewerName: (name: string) => void;
  interviewDate: string;
  setInterviewDate: (date: string) => void;

  // ── Evaluation State (scores, notes, covered) ──
  evaluationState: StateMap;
  setEvaluationState: (state: StateMap) => void;
  setScore: (cat: string, score: number) => void;
  setCovered: (cat: string, covered: boolean) => void;
  setNotes: (cat: string, notes: string) => void;

  // ── Report ──
  report: EvaluationReport | null;
  setReport: (report: EvaluationReport | null) => void;
  reportDate: string;
  setReportDate: (date: string) => void;

  // ── Directory ──
  directory: CandidateProfile[];
  setDirectory: (dir: CandidateProfile[]) => void;
  syncCurrentToDirectory: () => void;
  initDirectoryFromStorage: () => Promise<void>;
  deleteCandidateFromDirectory: (id: string) => Promise<void>;

  // ── Saved Records ──
  savedRecords: SavedRecord[];
  setSavedRecords: (records: SavedRecord[]) => void;
  refreshSavedRecords: () => Promise<void>;

  // ── UI State ──
  isGenerating: boolean;
  setIsGenerating: (val: boolean) => void;
  savedOpen: boolean;
  setSavedOpen: (val: boolean) => void;
  activeRubric: string | null;
  setActiveRubric: (cat: string | null) => void;

  // ── Computed ──
  isProfileComplete: () => boolean;
  isEditingExisting: () => boolean;
  ratedCount: () => number;
  progressPct: () => number;

  // ── Actions ──
  resetForNewCandidate: () => void;
  startEvaluation: () => void;
  selectCandidate: (cand: CandidateProfile) => void;
  loadAyushData: () => void;
  generateReport: () => void;
}

// ─── Store Implementation ─────────────────────────────────────

export const useEvalStore = create<EvalStore>((set, get) => ({
  // ── Navigation ──
  activeView: "directory",
  setActiveView: (view) => set({ activeView: view }),
  activeGroupIndex: 0,
  setActiveGroupIndex: (idx) => set({ activeGroupIndex: idx }),

  // ── Candidate Profile ──
  currentCandidate: freshCandidate(),
  setCurrentCandidate: (cand) => set({ currentCandidate: cand }),
  updateCandidateField: (field, value) => {
    const { currentCandidate, directory } = get();
    const updated = { ...currentCandidate, [field]: value as never };

    // Sync directory list if candidate is already in directory
    const exists = directory.some((c) => c.id === currentCandidate.id);
    const updatedDir = exists
      ? directory.map((c) => (c.id === currentCandidate.id ? updated : c))
      : directory;

    if (exists && updated.name && updated.name.trim().length > 0) {
      syncCandidateToServer(updated);
    }

    set({
      currentCandidate: updated,
      directory: updatedDir,
    });
  },

  // ── Interview Metadata ──
  interviewerName: "",
  setInterviewerName: (name) => {
    const { updateCandidateField } = get();
    set({ interviewerName: name });
    updateCandidateField("interviewerName" as never, name);
  },
  interviewDate: new Date().toISOString().split("T")[0],
  setInterviewDate: (date) => {
    const { updateCandidateField } = get();
    set({ interviewDate: date });
    updateCandidateField("interviewDate" as never, date);
  },

  // ── Evaluation State ──
  evaluationState: initialStates(),
  setEvaluationState: (state) => {
    set({ evaluationState: state });
    const { currentCandidate, directory, isEditingExisting } = get();
    if (isEditingExisting()) {
      const updatedCand = { ...currentCandidate, state };
      const updatedDir = directory.map((c) => (c.id === currentCandidate.id ? updatedCand : c));
      set({ currentCandidate: updatedCand, directory: updatedDir });
      syncCandidateToServer(updatedCand);
    }
  },
  setScore: (cat, score) => {
    const { evaluationState } = get();
    const current = evaluationState[cat];
    const newState = {
      ...evaluationState,
      [cat]: { ...current, score: current.score === score ? 0 : score },
    };
    get().setEvaluationState(newState);
  },
  setCovered: (cat, covered) => {
    const { evaluationState } = get();
    const current = evaluationState[cat];
    const newState = {
      ...evaluationState,
      [cat]: { ...current, covered: current.covered === covered ? null : covered },
    };
    get().setEvaluationState(newState);
  },
  setNotes: (cat, notes) => {
    const { evaluationState } = get();
    const newState = {
      ...evaluationState,
      [cat]: { ...evaluationState[cat], notes },
    };
    get().setEvaluationState(newState);
  },

  // ── Report ──
  report: null,
  setReport: (report) => set({ report }),
  reportDate: "",
  setReportDate: (date) => set({ reportDate: date }),

  // ── Directory ──
  directory: [],
  setDirectory: (dir) => set({ directory: dir }),
  initDirectoryFromStorage: async () => {
    try {
      const res = await fetch("/api/candidates");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.candidates) && data.candidates.length > 0) {
          const valid = data.candidates.filter((c: CandidateProfile) => c.name && c.name.trim().length > 0);
          if (valid.length > 0) {
            set({ directory: valid });
            return;
          }
        }
      }
    } catch (e) {
      console.error("Failed to load candidates from server API:", e);
    }
    set({ directory: [] });
  },
  syncCurrentToDirectory: () => {
    const { currentCandidate, directory, evaluationState, interviewerName, interviewDate } = get();
    if (!currentCandidate.name || currentCandidate.name.trim().length === 0) return;

    const candToSync = {
      ...currentCandidate,
      state: evaluationState,
      interviewerName,
      interviewDate,
    };

    const normEmail = candToSync.email ? candToSync.email.trim().toLowerCase() : "";

    const existingIndex = directory.findIndex(
      (c) => c.id === candToSync.id || (normEmail.length > 0 && c.email && c.email.trim().toLowerCase() === normEmail)
    );

    let updatedDir: CandidateProfile[];
    if (existingIndex >= 0) {
      const matchedId = directory[existingIndex].id;
      const mergedCand = { ...candToSync, id: matchedId };
      updatedDir = directory.map((c, idx) => (idx === existingIndex ? mergedCand : c));
    } else {
      updatedDir = [candToSync, ...directory];
    }

    // Deduplicate by email
    const emailSeen = new Set<string>();
    const cleanDir = updatedDir.filter((c) => {
      if (!c.name || c.name.trim().length === 0) return false;
      const e = c.email ? c.email.trim().toLowerCase() : "";
      if (e) {
        if (emailSeen.has(e)) return false;
        emailSeen.add(e);
      }
      return true;
    });

    set({ currentCandidate: candToSync, directory: cleanDir });
    syncCandidateToServer(candToSync);
  },

  deleteCandidateFromDirectory: async (id: string) => {
    try {
      await fetch(`/api/candidates?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    } catch (e) {
      console.error("Failed to delete candidate on server:", e);
    }
    const { directory } = get();
    const updatedDir = directory.filter((c) => c.id !== id);
    set({ directory: updatedDir });
    get().refreshSavedRecords();
  },

  // ── Saved Records ──
  savedRecords: [],
  setSavedRecords: (records) => set({ savedRecords: records }),
  refreshSavedRecords: async () => {
    try {
      let loaded: SavedRecord[] = [];
      try {
        const res = await fetch("/api/evaluations");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.evaluations)) loaded = data.evaluations;
        }
      } catch (e) {
        console.error("Failed to fetch evaluations from API:", e);
      }

      const { directory } = get();
      const dirRecords: SavedRecord[] = directory
        .filter((c) => c.name && c.name.trim().length > 0 && c.report)
        .map((c) => ({
          id: c.id,
          candidate: c.name,
          role: c.role,
          experience: c.experience,
          currentCompany: c.currentCompany,
          date: c.interviewDate || new Date().toISOString(),
          interviewerName: c.interviewerName || "Technical Hiring Manager",
          candidateEmail: c.email,
          overallScore: c.report!.overallScore,
          hiringDecision: c.report!.hiringDecision,
          categories: c.state || {},
          report: c.report!,
        }));

      const map = new Map<string, SavedRecord>();
      loaded.forEach((r) => map.set(r.id, r));
      dirRecords.forEach((r) => {
        if (!map.has(r.id)) map.set(r.id, r);
      });

      const nextRecords = Array.from(map.values());
      const currentRecords = get().savedRecords;
      if (
        currentRecords.length !== nextRecords.length ||
        JSON.stringify(currentRecords.map((r) => r.id)) !== JSON.stringify(nextRecords.map((r) => r.id))
      ) {
        set({ savedRecords: nextRecords });
      }
    } catch {
      // ignore
    }
  },

  // ── UI State ──
  isGenerating: false,
  setIsGenerating: (val) => set({ isGenerating: val }),
  savedOpen: false,
  setSavedOpen: (val) => set({ savedOpen: val }),
  activeRubric: null,
  setActiveRubric: (cat) => set({ activeRubric: cat }),

  // ── Computed ──
  isProfileComplete: () => {
    const { currentCandidate } = get();
    return currentCandidate.name.trim().length > 0 && currentCandidate.email.trim().length > 0;
  },
  isEditingExisting: () => {
    const { currentCandidate, directory } = get();
    return directory.some((c) => c.id === currentCandidate.id);
  },
  ratedCount: () => {
    const { evaluationState } = get();
    return Object.values(evaluationState).filter(
      (s) => s.score > 0 || s.covered !== null || s.notes.trim() !== ""
    ).length;
  },
  progressPct: () => {
    return Math.round((get().ratedCount() / ALL_CATS.length) * 100);
  },

  // ── Actions ──
  resetForNewCandidate: () => {
    const newCand = freshCandidate();
    set({
      currentCandidate: newCand,
      interviewerName: "",
      interviewDate: new Date().toISOString().split("T")[0],
      evaluationState: initialStates(),
      report: null,
      reportDate: "",
      activeView: "intake",
      activeGroupIndex: 0,
    });
  },

  startEvaluation: () => {
    const store = get();
    if (!store.isProfileComplete()) return;
    store.syncCurrentToDirectory();
    set({ activeView: "scorecard", activeGroupIndex: 0 });
  },

  selectCandidate: (cand) => {
    if (!cand) return;
    const candState =
      cand.state && Object.keys(cand.state).length > 0 ? cand.state : initialStates();
    const fullReport =
      cand.report ||
      generateEvaluationReport(
        cand.name || "Candidate",
        cand.role || "Full Stack Engineer",
        candState
      );
    const updatedCand = { ...cand, state: candState, report: fullReport };

    set({
      currentCandidate: updatedCand,
      interviewerName: cand.interviewerName || "Technical Hiring Manager",
      interviewDate: cand.interviewDate || new Date().toISOString().split("T")[0],
      evaluationState: candState,
      report: fullReport,
      activeView: "profile",
    });
    syncCandidateToServer(updatedCand);
  },

  loadAyushData: async () => {
    // Load Ayush from server API
    try {
      const res = await fetch("/api/candidates");
      if (res.ok) {
        const data = await res.json();
        const ayush = (data.candidates || []).find((c: CandidateProfile) => c.id === "cand-ayush");
        if (ayush) {
          get().selectCandidate(ayush);
          return;
        }
      }
    } catch (e) {
      console.error("Failed to load Ayush data from API:", e);
    }
  },

  generateReport: () => {
    const {
      currentCandidate,
      evaluationState,
      interviewerName,
      interviewDate,
      directory,
    } = get();

    set({ isGenerating: true });

    setTimeout(() => {
      const candidateName = currentCandidate.name.trim() || "Candidate";
      const generated = generateEvaluationReport(candidateName, currentCandidate.role, evaluationState);
      const fullReport = {
        ...generated,
        interviewerName,
        interviewDate,
        candidateEmail: currentCandidate.email,
        experience: currentCandidate.experience,
        currentCompany: currentCandidate.currentCompany,
      };

      const updatedCandidate: CandidateProfile = {
        ...currentCandidate,
        report: fullReport,
        evaluationStatus: "Completed",
        interviewerName,
        interviewDate,
        state: evaluationState,
      };

      const normEmail = updatedCandidate.email ? updatedCandidate.email.trim().toLowerCase() : "";
      const existingIndex = directory.findIndex(
        (c) => c.id === updatedCandidate.id || (normEmail.length > 0 && c.email && c.email.trim().toLowerCase() === normEmail)
      );

      let updatedDir: CandidateProfile[];
      if (existingIndex >= 0) {
        const matchedId = directory[existingIndex].id;
        const mergedCand = { ...updatedCandidate, id: matchedId };
        updatedDir = directory.map((c, idx) => (idx === existingIndex ? mergedCand : c));
      } else {
        updatedDir = [updatedCandidate, ...directory];
      }

      set({
        report: fullReport,
        reportDate: new Date().toISOString(),
        currentCandidate: updatedCandidate,
        directory: updatedDir,
        isGenerating: false,
        activeView: "analytics",
      });
      syncCandidateToServer(updatedCandidate);

      // Save evaluation record to server DB
      const record: SavedRecord = {
        id: updatedCandidate.id,
        candidate: updatedCandidate.name,
        role: updatedCandidate.role,
        experience: updatedCandidate.experience,
        currentCompany: updatedCandidate.currentCompany,
        date: interviewDate ? new Date(interviewDate).toISOString() : new Date().toISOString(),
        interviewerName,
        candidateEmail: updatedCandidate.email,
        overallScore: fullReport.overallScore,
        hiringDecision: fullReport.hiringDecision,
        categories: evaluationState,
        report: fullReport,
      };

      fetch("/api/evaluations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      }).catch((e) => console.error("Failed to save evaluation to server DB:", e));
    }, 300);
  },
}));
