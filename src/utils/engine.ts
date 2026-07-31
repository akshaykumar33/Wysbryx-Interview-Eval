import { StateMap, EvaluationReport } from "@/types/evaluation";
import { ALL_CATS, GROUPS } from "./constants";

export function generateEvaluationReport(candidate: string, role: string, state: StateMap): EvaluationReport {
  const ratedCats = ALL_CATS.map((c) => ({ name: c, ...(state[c] || { score: 0, covered: null, notes: "" }) }));
  const nonZero = ratedCats.filter((c) => c.score > 0);
  const avgScore = nonZero.length > 0 ? (nonZero.reduce((a, b) => a + b.score, 0) / nonZero.length) * 10 : 0;
  const overallScore = Math.round(avgScore);

  let hiringDecision: "Strong Hire" | "Hire" | "Lean Hire" | "Lean No Hire" | "No Hire" = "Lean No Hire";
  if (overallScore >= 80) hiringDecision = "Strong Hire";
  else if (overallScore >= 68) hiringDecision = "Hire";
  else if (overallScore >= 54) hiringDecision = "Lean Hire";
  else if (overallScore >= 40) hiringDecision = "Lean No Hire";
  else hiringDecision = "No Hire";

  // Calculate Group Scores properly scaled out of 100 (0 to 100)
  const groupScores = GROUPS.map((g) => {
    const scores = g.cats.map((c) => state[c]?.score || 0).filter((s) => s > 0);
    const avg = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 5;
    return { title: g.title, score: Math.round(avg * 10) }; // e.g. 45, 47, 44, 77, 76
  });

  const categories = ratedCats.map((c) => ({
    name: c.name,
    score: c.score,
    evidence: c.notes || (c.score > 0 ? `Demonstrated baseline understanding.` : "Not directly observed in depth."),
    strengths: c.score >= 8 ? `Exceptional execution & depth in ${c.name}.` : c.score >= 6 ? `Competent capability.` : ``,
    suggestions: c.score < 6 ? `Requires further strengthening in ${c.name}.` : `Continue driving standards.`,
  }));

  // Identify Dynamic Strengths and Growth Areas
  const strongCats = ratedCats.filter((c) => c.score >= 7).map((c) => c.name);
  const weakCats = ratedCats.filter((c) => c.score > 0 && c.score < 6).map((c) => c.name);

  const strongStr = strongCats.length > 0 ? strongCats.join(", ") : "core development & debugging";
  const weakStr = weakCats.length > 0 ? weakCats.slice(0, 4).join(", ") : "system architecture & security";

  let summary = "";
  if (overallScore >= 78) {
    summary = `${candidate} demonstrated exceptional technical depth for the ${role} position. Showed strong capabilities in ${strongStr}, articulate communication, and proactive problem solving. Recommended for next steps.`;
  } else if (overallScore >= 54) {
    summary = `${candidate} demonstrated strong practical capabilities in ${strongStr} for the ${role} role. However, key growth areas were identified in ${weakStr}. Recommended for a Lean Hire / Growth plan with targeted architectural mentoring.`;
  } else {
    summary = `${candidate} demonstrated positive potential in ${strongStr}, but showed key architectural and security gaps in ${weakStr} for the ${role} position. Further strengthening in high-level design and security protocols is required before senior responsibilities.`;
  }

  // Dynamic Operational Risks
  const risks: string[] = [];
  if (weakCats.includes("Security") || (state["Security"]?.score || 0) < 5) {
    risks.push("Security & OWASP: Lacks demonstrated awareness of authentication, authorization, and secure API practices.");
  }
  if (weakCats.includes("Scalability") || (state["Scalability"]?.score || 0) < 5) {
    risks.push("Scalability & Distributed Systems: Limited discussion of horizontal scaling, queue lag, and caching strategies.");
  }
  if (weakCats.includes("System Design") || weakCats.includes("HLD") || (state["System Design"]?.score || 0) < 6) {
    risks.push("System Architecture: Needs technical mentoring on high-level architecture decisions and trade-off analysis.");
  }
  if (weakCats.includes("Product Thinking") || (state["Product Thinking"]?.score || 0) < 5) {
    risks.push("Product Mindset: Tends to jump straight into code implementation before deeply understanding business context and user requirements.");
  }
  if (risks.length === 0) {
    risks.push("No critical operational risks identified.");
  }

  const technicalBreakdown = [
    { area: "Architecture Quality", note: state["System Design"]?.notes || "System design concepts discussed." },
    { area: "Database Design", note: state["Database Design"]?.notes || "Database schema & relationship knowledge." },
    { area: "Security", note: state["Security"]?.notes || "Security protocols & validation techniques." },
    { area: "RBAC", note: state["RBAC"]?.notes || "Role-based access control setup." },
    { area: "Multi Tenancy", note: state["Multi Tenancy"]?.notes || "Multi-tenant architecture concepts." },
    { area: "API Design", note: state["API Design"]?.notes || "API endpoints & contract definitions." },
    { area: "Scalability", note: state["Scalability"]?.notes || "Scalability & queue management." },
    { area: "Fault Tolerance", note: "Resilient error handling and retry mechanisms." },
    { area: "Cost Awareness", note: "Infrastructure resource optimization." },
  ];

  const softSkills = [
    { area: "Communication", note: state["Communication"]?.notes || "Clear and articulate communication." },
    { area: "Leadership", note: state["Leadership"]?.notes || "Demonstrated initiative in problem solving." },
    { area: "Ownership", note: state["Ownership"]?.notes || "Receptive to feedback & open to growth." },
    { area: "Problem Solving", note: "Structured analytical approach." },
  ];

  return {
    overallScore,
    hiringDecision,
    confidence: "High",
    summary,
    groupScores,
    categories,
    technicalBreakdown,
    softSkills,
    risks,
    roadmap: {
      immediate: ["Onboard into core service codebase", "Review architecture decision records"],
      oneMonth: ["Participate in design reviews", "Shadow on-call rotation"],
      threeMonths: ["Drive feature development"],
    },
  };
}
