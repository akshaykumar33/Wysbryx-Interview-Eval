import { CategoryGroup } from "@/types/evaluation";

export const GROUPS: CategoryGroup[] = [
  {
    title: "Product & Requirements",
    icon: "Compass",
    sub: "Problem framing, scoping, requirement clarification & MVP prioritization",
    cats: ["Product Thinking", "Requirement Analysis", "Clarification Questions", "MVP Thinking"],
  },
  {
    title: "System & Architecture",
    icon: "Network",
    sub: "High-level & low-level design, DB choices, APIs, and design patterns",
    cats: ["System Design", "HLD", "LLD", "Database Design", "API Design", "Design Patterns"],
  },
  {
    title: "Security, Scale & Multi-Tenancy",
    icon: "Shield",
    sub: "RBAC, data isolation, caching strategies, and performance limits",
    cats: ["RBAC", "Multi Tenancy", "Security", "Scalability", "Performance"],
  },
  {
    title: "AI & Debugging",
    icon: "Cpu",
    sub: "Effective AI utilization, prompt constraints, and root cause analysis",
    cats: ["AI Usage", "Prompt Engineering", "Debugging Ability"],
  },
  {
    title: "Human Skills & Leadership",
    icon: "Users",
    sub: "Communication, tradeoff analysis, leadership, and ownership under pressure",
    cats: ["Communication", "Tradeoff Analysis", "Leadership", "Ownership", "Learning Mindset"],
  },
];

export const ALL_CATS = GROUPS.flatMap((g) => g.cats);

export const QUICK_TAGS: Record<string, string[]> = {
  "Product Thinking": ["+ Scoped edge cases", "+ Identified user personas", "- Jumped to code too fast"],
  "System Design": ["+ Scalable pub/sub model", "+ Decoupled services", "- Single point of failure"],
  "Database Design": ["+ Appropriate indexing", "+ Schema normalization", "- Ignored read/write ratio"],
  "Security": ["+ OAuth2 / RBAC clarity", "+ Token refresh handling", "- Plaintext secrets risk"],
  "Communication": ["+ Structured thoughts", "+ Proactive check-ins", "- Overly verbose"],
};

export const RUBRICS: Record<string, string> = {
  "System Design": `
    <b>1 - 3 (Needs Improvement):</b> Struggles to outline system components; overlooks scaling bottlenecks.<br>
    <b>4 - 6 (Competent):</b> Proposes working architecture; understands basic load balancing & caching.<br>
    <b>7 - 8 (Strong):</b> Clearly articulates HLD/LLD trade-offs, fault isolation, and queue-based decoupling.<br>
    <b>9 - 10 (Exemplary):</b> World-class architect; handles multi-region failover, CAP theorem bounds, and data partitioning effortlessly.
  `,
  "Database Design": `
    <b>1 - 3:</b> Confuses SQL vs NoSQL suitability; ignores indexing.<br>
    <b>4 - 6:</b> Correct relational or document schema with primary keys.<br>
    <b>7 - 8:</b> Designs query-optimized composite indexes and sharding keys.<br>
    <b>9 - 10:</b> Master of storage engines, write amplification, ACID guarantees, and zero-downtime schema migrations.
  `,
};
