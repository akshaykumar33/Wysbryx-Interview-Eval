import { CandidateProfile } from "@/types/candidate";
import { SavedRecord, StateMap } from "@/types/evaluation";

// ─── Seed Data: Dhaval Prasad ─────────────────────────────────

const DHAVAL_EVALUATION_DATA: StateMap = {
  "Product Thinking": { score: 8, covered: true, notes: "• Scoped edge cases \n• Identified user personas\n • Built his own application with a unique fashion-focused purpose. Demonstrated strong product thinking." },
  "Requirement Analysis": { score: 7, covered: true, notes: "• Good enough understanding of requirements and reasoning." },
  "Clarification Questions": { score: 7, covered: true, notes: "• Asked relevant clarification questions before implementation." },
  "MVP Thinking": { score: 7, covered: true, notes: "• Good understanding of MVP prioritization and feature scoping." },
  "System Design": { score: 7, covered: true, notes: "• Shared  practical DB migration knowledge instead of relying solely on the Strangler Pattern." },
  HLD: { score: 6, covered: true, notes: "• Knowledge of Pinecone and gamification experience for CMS systems.\n" },
  LLD: { score: 5, covered: false, notes: "• No detailed observations provided." },
  "Database Design": { score: 5, covered: true, notes: "• No additional evaluation." },
  "API Design": { score: 5, covered: true, notes: "• Fair enough." },
  "Design Patterns": { score: 1, covered: false, notes: "• Indicates weak explicit use of design patterns." },
  RBAC: { score: 5, covered: true, notes: "• Have info but not much to explain difference between Authentication and Authoization." },
  "Multi Tenancy": { score: 1, covered: false, notes: "" },
  Security: { score: 8, covered: true, notes: "• Good awareness of AI-related security edge cases and security concepts." },
  Scalability: { score: 1, covered: false, notes: "" },
  Performance: { score: 4, covered: false, notes: "" },
  "AI Usage": { score: 9, covered: true, notes: "• Good understanding of AI guardrails, safety, production AI workflows, and capable of building AI applications for fashion. Experience with AI IDEs." },
  "Prompt Engineering": { score: 8, covered: true, notes: "• Demonstrated prompt chaining and strong role-based prompting rather than hardcoded prompts." },
  "Debugging Ability": { score: 6, covered: true, notes: "• Average" },
  Communication: { score: 0, covered: true, notes: "• Strong product engineering mindset, AI workflow understanding, Full-Stack knowledge, and DB migration experience." },
  "Tradeoff Analysis": { score: 0, covered: true, notes: "• Good HLD thinking for AI workflows, strong attention to edge cases, niche scenarios, and scraper-related design. Thought process is good and practical." },
  Leadership: { score: 0, covered: true, notes: "" },
  Ownership: { score: 0, covered: true, notes: "" },
  "Learning Mindset": { score: 7, covered: true, notes: "• Demonstrated a product-oriented learning mindset and willingness to learn continuously." },
};

const DHAVAL_PROFILE: CandidateProfile = {
  id: "cand-new-1785843546638",
  name: "Dhaval Prasad",
  role: "AI / ML Engineer",
  experience: "3 Years",
  email: "dhavaljprasad@gmail.com",
  phone: "",
  location: "",
  currentCompany: "Moon Kind",
  skills: [],
  evaluationStatus: "Completed",
  interviewerName: "Akshaykumar Patil",
  interviewDate: "2026-08-04",
  state: DHAVAL_EVALUATION_DATA,
  report: {
    overallScore: 56,
    hiringDecision: "Lean Hire",
    confidence: "High",
    summary: "Dhaval Prasad demonstrated strong practical capabilities in Product Thinking, Requirement Analysis, Clarification Questions, MVP Thinking, System Design, Security, AI Usage, Prompt Engineering, Learning Mindset for the AI / ML Engineer role. However, key growth areas were identified in LLD, Database Design, API Design, Design Patterns. Recommended for a Lean Hire / Growth plan with targeted architectural mentoring.",
    groupScores: [
      { title: "Product & Requirements", score: 73 },
      { title: "System & Architecture", score: 48 },
      { title: "Security, Scale & Multi-Tenancy", score: 38 },
      { title: "AI & Debugging", score: 77 },
      { title: "Human Skills & Leadership", score: 70 },
    ],
    categories: [
      { name: "Product Thinking", score: 8, evidence: "• Scoped edge cases \n• Identified user personas\n • Built his own application with a unique fashion-focused purpose. Demonstrated strong product thinking.", strengths: "Exceptional execution & depth in Product Thinking.", suggestions: "Continue driving standards." },
      { name: "Requirement Analysis", score: 7, evidence: "• Good enough understanding of requirements and reasoning.", strengths: "Competent capability.", suggestions: "Continue driving standards." },
      { name: "Clarification Questions", score: 7, evidence: "• Asked relevant clarification questions before implementation.", strengths: "Competent capability.", suggestions: "Continue driving standards." },
      { name: "MVP Thinking", score: 7, evidence: "• Good understanding of MVP prioritization and feature scoping.", strengths: "Competent capability.", suggestions: "Continue driving standards." },
      { name: "System Design", score: 7, evidence: "• Shared  practical DB migration knowledge instead of relying solely on the Strangler Pattern.", strengths: "Competent capability.", suggestions: "Continue driving standards." },
      { name: "HLD", score: 6, evidence: "• Knowledge of Pinecone and gamification experience for CMS systems.\n", strengths: "Competent capability.", suggestions: "Continue driving standards." },
      { name: "LLD", score: 5, evidence: "• No detailed observations provided.", strengths: "", suggestions: "Requires further strengthening in LLD." },
      { name: "Database Design", score: 5, evidence: "• No additional evaluation.", strengths: "", suggestions: "Requires further strengthening in Database Design." },
      { name: "API Design", score: 5, evidence: "• Fair enough.", strengths: "", suggestions: "Requires further strengthening in API Design." },
      { name: "Design Patterns", score: 1, evidence: "• Indicates weak explicit use of design patterns.", strengths: "", suggestions: "Requires further strengthening in Design Patterns." },
      { name: "RBAC", score: 5, evidence: "• Have info but not much to explain difference between Authentication and Authoization.", strengths: "", suggestions: "Requires further strengthening in RBAC." },
      { name: "Multi Tenancy", score: 1, evidence: "Demonstrated baseline understanding.", strengths: "", suggestions: "Requires further strengthening in Multi Tenancy." },
      { name: "Security", score: 8, evidence: "• Good awareness of AI-related security edge cases and security concepts.", strengths: "Exceptional execution & depth in Security.", suggestions: "Continue driving standards." },
      { name: "Scalability", score: 1, evidence: "Demonstrated baseline understanding.", strengths: "", suggestions: "Requires further strengthening in Scalability." },
      { name: "Performance", score: 4, evidence: "Demonstrated baseline understanding.", strengths: "", suggestions: "Requires further strengthening in Performance." },
      { name: "AI Usage", score: 9, evidence: "• Good understanding of AI guardrails, safety, production AI workflows, and capable of building AI applications for fashion. Experience with AI IDEs.", strengths: "Exceptional execution & depth in AI Usage.", suggestions: "Continue driving standards." },
      { name: "Prompt Engineering", score: 8, evidence: "• Demonstrated prompt chaining and strong role-based prompting rather than hardcoded prompts.", strengths: "Exceptional execution & depth in Prompt Engineering.", suggestions: "Continue driving standards." },
      { name: "Debugging Ability", score: 6, evidence: "• Average", strengths: "Competent capability.", suggestions: "Continue driving standards." },
      { name: "Communication", score: 0, evidence: "• Strong product engineering mindset, AI workflow understanding, Full-Stack knowledge, and DB migration experience.", strengths: "", suggestions: "Requires further strengthening in Communication." },
      { name: "Tradeoff Analysis", score: 0, evidence: "• Good HLD thinking for AI workflows, strong attention to edge cases, niche scenarios, and scraper-related design. Thought process is good and practical.", strengths: "", suggestions: "Requires further strengthening in Tradeoff Analysis." },
      { name: "Leadership", score: 0, evidence: "Not directly observed in depth.", strengths: "", suggestions: "Requires further strengthening in Leadership." },
      { name: "Ownership", score: 0, evidence: "Not directly observed in depth.", strengths: "", suggestions: "Requires further strengthening in Ownership." },
      { name: "Learning Mindset", score: 7, evidence: "• Demonstrated a product-oriented learning mindset and willingness to learn continuously.", strengths: "Competent capability.", suggestions: "Continue driving standards." },
    ],
    technicalBreakdown: [
      { area: "Architecture Quality", note: "• Shared  practical DB migration knowledge instead of relying solely on the Strangler Pattern." },
      { area: "Database Design", note: "• No additional evaluation." },
      { area: "Security", note: "• Good awareness of AI-related security edge cases and security concepts." },
      { area: "RBAC", note: "• Have info but not much to explain difference between Authentication and Authoization." },
      { area: "Multi Tenancy", note: "Multi-tenant architecture concepts." },
      { area: "API Design", note: "• Fair enough." },
      { area: "Scalability", note: "Scalability & queue management." },
      { area: "Fault Tolerance", note: "Resilient error handling and retry mechanisms." },
      { area: "Cost Awareness", note: "Infrastructure resource optimization." },
    ],
    softSkills: [
      { area: "Communication", note: "• Strong product engineering mindset, AI workflow understanding, Full-Stack knowledge, and DB migration experience." },
      { area: "Leadership", note: "Demonstrated initiative in problem solving." },
      { area: "Ownership", note: "Receptive to feedback & open to growth." },
      { area: "Problem Solving", note: "Structured analytical approach." },
    ],
    risks: ["Scalability & Distributed Systems: Limited discussion of horizontal scaling, queue lag, and caching strategies."],
    roadmap: {
      immediate: ["Onboard into core service codebase", "Review architecture decision records"],
      oneMonth: ["Participate in design reviews", "Shadow on-call rotation"],
      threeMonths: ["Drive feature development"],
    },
    interviewerName: "Akshaykumar Patil",
    interviewDate: "2026-08-04",
    candidateEmail: "dhavaljprasad@gmail.com",
  },
};

// ─── Seed Data: Ayush Jaiswal ─────────────────────────────────

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
  experience: "2 Years",
  email: "ayush60000@gmail.com",
  phone: "+91 98765 43210",
  location: "India",
  currentCompany: "NA",
  skills: ["React", "Node.js", "AI Prompts", "Debugging", "Communication"],
  evaluationStatus: "Completed",
  interviewerName: "Akshaykumar Patil",
  interviewDate: "2026-08-01",
  state: AYUSH_EVALUATION_DATA,
  report: {
    overallScore: 56,
    hiringDecision: "Lean Hire",
    confidence: "High",
    summary: "Ayush Jaiswal demonstrated strong practical capabilities in Performance, AI Usage, Prompt Engineering, Debugging Ability, Communication, Leadership, Ownership, Learning Mindset for the Full Stack Engineer role. However, key growth areas were identified in Product Thinking, Requirement Analysis, MVP Thinking, System Design. Recommended for a Lean Hire / Growth plan with targeted architectural mentoring.",
    groupScores: [
      { title: "Product & Requirements", score: 45 },
      { title: "System & Architecture", score: 47 },
      { title: "Security, Scale & Multi-Tenancy", score: 44 },
      { title: "AI & Debugging", score: 77 },
      { title: "Human Skills & Leadership", score: 76 },
    ],
    categories: [
      { name: "Product Thinking", score: 4, evidence: "Missed. Limited product-thinking approach. Needs to explore the problem space more deeply before jumping into implementation and think from an end-user and business perspective.", strengths: "", suggestions: "Requires further strengthening in Product Thinking." },
      { name: "Requirement Analysis", score: 4, evidence: "Missed. Requirement gathering was not structured enough. Needs better analysis of business requirements before designing the solution.", strengths: "", suggestions: "Requires further strengthening in Requirement Analysis." },
      { name: "Clarification Questions", score: 6, evidence: "Average. Asked some questions but should ask more clarifying questions around edge cases, business rules, constraints, assumptions, and success criteria.", strengths: "Competent capability.", suggestions: "Continue driving standards." },
      { name: "MVP Thinking", score: 4, evidence: "Missed. Focused more on implementation rather than identifying the minimum viable solution and iterative delivery approach.", strengths: "", suggestions: "Requires further strengthening in MVP Thinking." },
      { name: "System Design", score: 5, evidence: "Needs Improvement. Overall system design knowledge requires strengthening from HLD to implementation.", strengths: "", suggestions: "Requires further strengthening in System Design." },
      { name: "HLD", score: 5, evidence: "Needs Improvement. High-level architecture discussions lacked depth, scalability considerations, and architectural reasoning.", strengths: "", suggestions: "Requires further strengthening in HLD." },
      { name: "LLD", score: 5, evidence: "Needs Improvement. LLD concepts, component interactions, and detailed design decisions need improvement.", strengths: "", suggestions: "Requires further strengthening in LLD." },
      { name: "Database Design", score: 6, evidence: "Average. Database design was acceptable, but normalization, relationships, indexing, and optimization can be improved.", strengths: "Competent capability.", suggestions: "Continue driving standards." },
      { name: "API Design", score: 4, evidence: "Weak. API design fundamentals need improvement. Appeared to have limited backend-oriented thinking while designing APIs.", strengths: "", suggestions: "Requires further strengthening in API Design." },
      { name: "Design Patterns", score: 3, evidence: "Weak. Limited understanding and practical usage of software design patterns.", strengths: "", suggestions: "Requires further strengthening in Design Patterns." },
      { name: "RBAC", score: 5, evidence: "Partially Implemented. RBAC implementation was incomplete for the given task and lacked fine-grained permission handling.", strengths: "", suggestions: "Requires further strengthening in RBAC." },
      { name: "Multi Tenancy", score: 3, evidence: "Weak. Multi-tenant architecture concepts were not demonstrated.", strengths: "", suggestions: "Requires further strengthening in Multi Tenancy." },
      { name: "Security", score: 3, evidence: "Weak. Security aspects such as authentication, authorization, validation, OWASP concerns, and secure design were largely missing.", strengths: "", suggestions: "Requires further strengthening in Security." },
      { name: "Scalability", score: 4, evidence: "Weak. Did not sufficiently discuss scalability strategies such as horizontal scaling, caching, queues, partitioning, or distributed architecture.", strengths: "", suggestions: "Requires further strengthening in Scalability." },
      { name: "Performance", score: 7, evidence: "Good. Demonstrated awareness of code structuring and performance optimization during implementation.", strengths: "Competent capability.", suggestions: "Continue driving standards." },
      { name: "AI Usage", score: 7, evidence: "Good but Limited. Uses AI tools like ChatGPT and Gemini effectively but has not yet leveraged AI-assisted IDEs, coding agents, or workflow automation tools.", strengths: "Competent capability.", suggestions: "Continue driving standards." },
      { name: "Prompt Engineering", score: 8, evidence: "Strong. Capable of writing effective single-shot prompts and understands AI-generated logic before implementing it rather than blindly copying code.", strengths: "Exceptional execution & depth in Prompt Engineering.", suggestions: "Continue driving standards." },
      { name: "Debugging Ability", score: 8, evidence: "Good. Demonstrates strong debugging skills and effectively researches issues to identify solutions.", strengths: "Exceptional execution & depth in Debugging Ability.", suggestions: "Continue driving standards." },
      { name: "Communication", score: 8, evidence: "Good. Has experience collaborating with cross-cultural teams and demonstrates good communication and collaborative working style. Shows a contractual/ownership mindset while working with teams.", strengths: "Exceptional execution & depth in Communication.", suggestions: "Continue driving standards." },
      { name: "Tradeoff Analysis", score: 5, evidence: "Needs Improvement. Did not sufficiently discuss design trade-offs, alternatives, advantages, disadvantages, or decision rationale.", strengths: "", suggestions: "Requires further strengthening in Tradeoff Analysis." },
      { name: "Leadership", score: 8, evidence: "Good Potential. Demonstrates leadership qualities and shows potential to take ownership of teams and technical decisions.", strengths: "Exceptional execution & depth in Leadership.", suggestions: "Continue driving standards." },
      { name: "Ownership", score: 8, evidence: "Good. Openly accepts mistakes, acknowledges knowledge gaps, and is willing to improve.", strengths: "Exceptional execution & depth in Ownership.", suggestions: "Continue driving standards." },
      { name: "Learning Mindset", score: 9, evidence: "Strong. Shows a positive learning attitude, focuses on requirement gathering, planning, execution, and understanding end-user needs before improving solutions.", strengths: "Exceptional execution & depth in Learning Mindset.", suggestions: "Continue driving standards." },
    ],
    technicalBreakdown: [
      { area: "Architecture Quality", note: "Needs Improvement. Overall system design knowledge requires strengthening from HLD to implementation." },
      { area: "Database Design", note: "Average. Database design was acceptable, but normalization, relationships, indexing, and optimization can be improved." },
      { area: "Security", note: "Weak. Security aspects such as authentication, authorization, validation, OWASP concerns, and secure design were largely missing." },
      { area: "RBAC", note: "Partially Implemented. RBAC implementation was incomplete for the given task and lacked fine-grained permission handling." },
      { area: "Multi Tenancy", note: "Weak. Multi-tenant architecture concepts were not demonstrated." },
      { area: "API Design", note: "Weak. API design fundamentals need improvement. Appeared to have limited backend-oriented thinking while designing APIs." },
      { area: "Scalability", note: "Weak. Did not sufficiently discuss scalability strategies such as horizontal scaling, caching, queues, partitioning, or distributed architecture." },
      { area: "Fault Tolerance", note: "Resilient error handling and retry mechanisms." },
      { area: "Cost Awareness", note: "Infrastructure resource optimization." },
    ],
    softSkills: [
      { area: "Communication", note: "Good. Has experience collaborating with cross-cultural teams and demonstrates good communication and collaborative working style. Shows a contractual/ownership mindset while working with teams." },
      { area: "Leadership", note: "Good Potential. Demonstrates leadership qualities and shows potential to take ownership of teams and technical decisions." },
      { area: "Ownership", note: "Good. Openly accepts mistakes, acknowledges knowledge gaps, and is willing to improve." },
      { area: "Problem Solving", note: "Structured analytical approach." },
    ],
    risks: [
      "Security & OWASP: Lacks demonstrated awareness of authentication, authorization, and secure API practices.",
      "Scalability & Distributed Systems: Limited discussion of horizontal scaling, queue lag, and caching strategies.",
      "System Architecture: Needs technical mentoring on high-level architecture decisions and trade-off analysis.",
      "Product Mindset: Tends to jump straight into code implementation before deeply understanding business context and user requirements.",
    ],
    roadmap: {
      immediate: ["Onboard into core service codebase", "Review architecture decision records"],
      oneMonth: ["Participate in design reviews", "Shadow on-call rotation"],
      threeMonths: ["Drive feature development"],
    },
    interviewerName: "Akshaykumar Patil",
    interviewDate: "2026-08-01",
    candidateEmail: "ayush60000@gmail.com",
  },
};

// ─── Seed Evaluation Records ──────────────────────────────────

const AYUSH_EVAL_RECORD: SavedRecord = {
  id: "eval-1785850022765",
  candidate: "Ayush Jaiswal",
  role: "Full Stack Engineer",
  experience: "2 Years",
  currentCompany: "NA",
  date: "2026-08-01T00:00:00.000Z",
  interviewerName: "Akshaykumar Patil",
  candidateEmail: "ayush60000@gmail.com",
  overallScore: 56,
  hiringDecision: "Lean Hire",
  categories: AYUSH_EVALUATION_DATA,
  report: AYUSH_PROFILE.report!,
};

const DHAVAL_EVAL_RECORD: SavedRecord = {
  id: "eval-1785850102990",
  candidate: "Dhaval Prasad",
  role: "AI / ML Engineer",
  experience: "3 Years",
  currentCompany: "Moon Kind",
  date: "2026-08-04T00:00:00.000Z",
  interviewerName: "Akshaykumar Patil",
  candidateEmail: "dhavaljprasad@gmail.com",
  overallScore: 56,
  hiringDecision: "Lean Hire",
  categories: DHAVAL_EVALUATION_DATA,
  report: DHAVAL_PROFILE.report!,
};

// ─── In-Memory Store (Global Singleton) ───────────────────────

const globalForStore = globalThis as unknown as {
  candidatesMap: Map<string, CandidateProfile> | undefined;
  evaluationsMap: Map<string, SavedRecord> | undefined;
};

function getCandidatesMap(): Map<string, CandidateProfile> {
  if (!globalForStore.candidatesMap) {
    globalForStore.candidatesMap = new Map<string, CandidateProfile>();
    // Seed with both candidate profiles
    globalForStore.candidatesMap.set(DHAVAL_PROFILE.id, { ...DHAVAL_PROFILE });
    globalForStore.candidatesMap.set(AYUSH_PROFILE.id, { ...AYUSH_PROFILE });
  }
  return globalForStore.candidatesMap;
}

function getEvaluationsMap(): Map<string, SavedRecord> {
  if (!globalForStore.evaluationsMap) {
    globalForStore.evaluationsMap = new Map<string, SavedRecord>();
    // Seed with both evaluation records
    globalForStore.evaluationsMap.set(AYUSH_EVAL_RECORD.id, { ...AYUSH_EVAL_RECORD });
    globalForStore.evaluationsMap.set(DHAVAL_EVAL_RECORD.id, { ...DHAVAL_EVAL_RECORD });
  }
  return globalForStore.evaluationsMap;
}

// ─── DB Operations (In-Memory) ───────────────────────────────

export function getAllCandidatesFromDb(): CandidateProfile[] {
  const map = getCandidatesMap();
  const list = Array.from(map.values());

  // Deduplicate by normalized email
  const emailSeen = new Set<string>();
  const deduped: CandidateProfile[] = [];

  for (const item of list) {
    const normEmail = item.email ? item.email.trim().toLowerCase() : "";
    if (normEmail) {
      if (emailSeen.has(normEmail)) {
        map.delete(item.id);
        continue;
      }
      emailSeen.add(normEmail);
    }
    deduped.push(item);
  }

  return deduped;
}

export function upsertCandidateInDb(candidate: CandidateProfile): CandidateProfile {
  const map = getCandidatesMap();
  const normEmail = candidate.email ? candidate.email.trim().toLowerCase() : "";

  // Check for duplicate email under another ID and remove it
  if (normEmail) {
    for (const [id, existing] of map) {
      if (
        id !== candidate.id &&
        existing.email &&
        existing.email.trim().toLowerCase() === normEmail
      ) {
        map.delete(id);
        break;
      }
    }
  }

  map.set(candidate.id, { ...candidate });
  return candidate;
}

export function deleteCandidateFromDb(id: string): void {
  const map = getCandidatesMap();
  map.delete(id);
}

export function getAllEvaluationsFromDb(): SavedRecord[] {
  const map = getEvaluationsMap();
  return Array.from(map.values());
}

export function upsertEvaluationInDb(record: SavedRecord): SavedRecord {
  const map = getEvaluationsMap();
  map.set(record.id, { ...record });
  return record;
}
