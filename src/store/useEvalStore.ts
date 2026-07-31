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

// ─── Ayush Demo Seed ──────────────────────────────────────────

const AYUSH_EVALUATION_DATA: StateMap = {
  "Product Thinking": { score: 4, covered: false, notes: "Missed. Limited product-thinking approach. Needs to explore the problem space more deeply before jumping into implementation and think from an end-user and business perspective." },
  "Requirement Analysis": { score: 4, covered: false, notes: "Missed. Requirement gathering was not structured enough. Needs better analysis of business requirements before designing the solution." },
  "Clarification Questions": { score: 6, covered: true, notes: "Average. Asked some questions but should ask more clarifying questions around edge cases, business rules, constraints, assumptions, and success criteria." },
  "MVP Thinking": { score: 4, covered: false, notes: "Missed. Focused more on implementation rather than identifying the minimum viable solution and iterative delivery approach." },
  "System Design": { score: 5, covered: true, notes: "Needs Improvement. Overall system design knowledge requires strengthening from HLD to implementation." },
  HLD: { score: 5, covered: true, notes: "Needs Improvement. High-level architecture discussions lacked depth, scalability considerations, and architectural reasoning." },
  LLD: { score: 5, covered: true, notes: "Needs Improvement. LLD concepts, component interactions, and detailed design decisions need improvement." },
  "Database Design": { score: 6, covered: true, notes: "Average. Database design was acceptable, but normalization, relationships, indexing, and optimization can be improved." },
  "API Design": { score: 4, covered: true, notes: "Weak. API design fundamentals need improvement. Appeared to have limited backend-oriented thinking while designing APIs." },
  "Design Patterns": { score: 3, covered: true, notes: "Weak. Limited understanding and practical usage of software design patterns." },
  RBAC: { score: 5, covered: true, notes: "Partially Implemented. RBAC implementation was incomplete for the given task and lacked fine-grained permission handling." },
  "Multi Tenancy": { score: 3, covered: false, notes: "Weak. Multi-tenant architecture concepts were not demonstrated." },
  Security: { score: 3, covered: false, notes: "Weak. Security aspects such as authentication, authorization, validation, OWASP concerns, and secure design were largely missing." },
  Scalability: { score: 4, covered: false, notes: "Weak. Did not sufficiently discuss scalability strategies such as horizontal scaling, caching, queues, partitioning, or distributed architecture." },
  Performance: { score: 7, covered: true, notes: "Good. Demonstrated awareness of code structuring and performance optimization during implementation." },
  "AI Usage": { score: 7, covered: true, notes: "Good but Limited. Uses AI tools like ChatGPT and Gemini effectively but has not yet leveraged AI-assisted IDEs, coding agents, or workflow automation tools." },
  "Prompt Engineering": { score: 8, covered: true, notes: "Strong. Capable of writing effective single-shot prompts and understands AI-generated logic before implementing it rather than blindly copying code." },
  "Debugging Ability": { score: 8, covered: true, notes: "Good. Demonstrates strong debugging skills and effectively researches issues to identify solutions." },
  Communication: { score: 8, covered: true, notes: "Good. Has experience collaborating with cross-cultural teams and demonstrates good communication and collaborative working style. Shows a contractual/ownership mindset while working with teams." },
  "Tradeoff Analysis": { score: 5, covered: true, notes: "Needs Improvement. Did not sufficiently discuss design trade-offs, alternatives, advantages, disadvantages, or decision rationale." },
  Leadership: { score: 8, covered: true, notes: "Good Potential. Demonstrates leadership qualities and shows potential to take ownership of teams and technical decisions." },
  Ownership: { score: 8, covered: true, notes: "Good. Openly accepts mistakes, acknowledges knowledge gaps, and is willing to improve." },
  "Learning Mindset": { score: 9, covered: true, notes: "Strong. Shows a positive learning attitude, focuses on requirement gathering, planning, execution, and understanding end-user needs before improving solutions." },
};

const AYUSH_PROFILE: CandidateProfile = {
  id: "cand-ayush",
  name: "Ayush Jaiswal",
  role: "Full Stack Engineer",
  experience: "5+ Years",
  email: "ayush60000@gmail.com",
  phone: "+91 98765 43210",
  location: "India",
  currentCompany: "Tech Corp",
  skills: ["React", "Node.js", "AI Prompts", "Debugging", "Communication"],
  evaluationStatus: "Completed",
  interviewerName: "Technical Hiring Manager",
  interviewDate: new Date().toISOString().split("T")[0],
  state: AYUSH_EVALUATION_DATA,
};

// ─── Persistence Helpers ──────────────────────────────────────

function loadDirectoryFromStorage(): CandidateProfile[] {
  if (typeof window === "undefined") return [AYUSH_PROFILE];
  try {
    const raw = localStorage.getItem("eval-directory");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const valid = parsed.filter((c: CandidateProfile) => c.name && c.name.trim().length > 0);
        if (valid.length > 0) return valid;
      }
    }
  } catch (e) {
    console.error("Failed to load candidate directory from localStorage:", e);
  }
  return [AYUSH_PROFILE];
}

function saveDirectoryToStorage(directory: CandidateProfile[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("eval-directory", JSON.stringify(directory));
  } catch (e) {
    console.error("Failed to save candidate directory to localStorage:", e);
  }
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
  initDirectoryFromStorage: () => void;

  // ── Saved Records ──
  savedRecords: SavedRecord[];
  setSavedRecords: (records: SavedRecord[]) => void;

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
    const { currentCandidate, directory, report, evaluationState } = get();
    const updated = { ...currentCandidate, [field]: value as never };

    // Sync directory list if candidate is already in directory
    const exists = directory.some((c) => c.id === currentCandidate.id);
    const updatedDir = exists
      ? directory.map((c) => (c.id === currentCandidate.id ? updated : c))
      : directory;

    if (exists) {
      saveDirectoryToStorage(updatedDir);
    }

    // Re-generate report if name or role changed and report exists
    let updatedReport = report;
    if (report) {
      if (field === "name") {
        updatedReport = generateEvaluationReport(value, currentCandidate.role, evaluationState);
      } else if (field === "role") {
        updatedReport = generateEvaluationReport(currentCandidate.name, value, evaluationState);
      }
    }

    set({
      currentCandidate: updated,
      directory: updatedDir,
      report: updatedReport,
    });
  },

  // ── Interview Metadata ──
  interviewerName: "",
  setInterviewerName: (name) => {
    const { currentCandidate, updateCandidateField } = get();
    set({ interviewerName: name });
    updateCandidateField("interviewerName" as never, name);
  },
  interviewDate: new Date().toISOString().split("T")[0],
  setInterviewDate: (date) => {
    const { currentCandidate, updateCandidateField } = get();
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
      saveDirectoryToStorage(updatedDir);
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
  directory: [AYUSH_PROFILE],
  setDirectory: (dir) => {
    set({ directory: dir });
    saveDirectoryToStorage(dir);
  },
  initDirectoryFromStorage: () => {
    const loaded = loadDirectoryFromStorage();
    set({ directory: loaded });
  },
  syncCurrentToDirectory: () => {
    const { currentCandidate, directory, evaluationState, interviewerName, interviewDate } = get();
    // Ignore syncing if name is blank
    if (!currentCandidate.name || currentCandidate.name.trim().length === 0) return;

    const candToSync = {
      ...currentCandidate,
      state: evaluationState,
      interviewerName,
      interviewDate,
    };
    const exists = directory.some((c) => c.id === currentCandidate.id);
    const updatedDir = exists
      ? directory.map((c) => (c.id === currentCandidate.id ? candToSync : c))
      : [candToSync, ...directory];

    const cleanDir = updatedDir.filter((c) => c.name && c.name.trim().length > 0);

    set({ currentCandidate: candToSync, directory: cleanDir });
    saveDirectoryToStorage(cleanDir);
  },

  // ── Saved Records ──
  savedRecords: [],
  setSavedRecords: (records) => set({ savedRecords: records }),

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
    const candState =
      cand.state && Object.keys(cand.state).length > 0 ? cand.state : AYUSH_EVALUATION_DATA;
    const fullReport = cand.report || generateEvaluationReport(cand.name, cand.role, candState);
    set({
      currentCandidate: cand,
      interviewerName: cand.interviewerName || "Technical Hiring Manager",
      interviewDate: cand.interviewDate || new Date().toISOString().split("T")[0],
      evaluationState: candState,
      report: fullReport,
      activeView: "profile",
    });
  },

  loadAyushData: () => {
    const generated = generateEvaluationReport(
      "Ayush Jaiswal",
      "Full Stack Engineer",
      AYUSH_EVALUATION_DATA
    );
    const fullReport = {
      ...generated,
      interviewerName: "Technical Hiring Manager",
      interviewDate: new Date().toISOString().split("T")[0],
      candidateEmail: "ayush60000@gmail.com",
    };

    const ayushProf: CandidateProfile = {
      ...AYUSH_PROFILE,
      report: fullReport,
    };

    const { directory } = get();
    const exists = directory.some((c) => c.id === ayushProf.id);
    const updatedDir = exists
      ? directory.map((c) => (c.id === ayushProf.id ? ayushProf : c))
      : [ayushProf, ...directory];

    set({
      currentCandidate: ayushProf,
      evaluationState: AYUSH_EVALUATION_DATA,
      report: fullReport,
      reportDate: new Date().toISOString(),
      interviewerName: "Technical Hiring Manager",
      directory: updatedDir,
      activeView: "profile",
    });
    saveDirectoryToStorage(updatedDir);
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
      };

      const updatedCandidate: CandidateProfile = {
        ...currentCandidate,
        report: fullReport,
        evaluationStatus: "Completed",
        interviewerName,
        interviewDate,
        state: evaluationState,
      };

      const exists = directory.some((c) => c.id === updatedCandidate.id);
      const updatedDir = exists
        ? directory.map((c) => (c.id === updatedCandidate.id ? updatedCandidate : c))
        : [updatedCandidate, ...directory];

      set({
        report: fullReport,
        reportDate: new Date().toISOString(),
        currentCandidate: updatedCandidate,
        directory: updatedDir,
        isGenerating: false,
        activeView: "analytics",
      });
      saveDirectoryToStorage(updatedDir);
    }, 400);
  },
}));
