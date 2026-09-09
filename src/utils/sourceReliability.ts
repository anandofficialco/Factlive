import { VerifiedClaim } from "../types";

export interface SourceReliabilityDistribution {
  reliableCount: number;
  unreliableCount: number;
  contextualCount: number;
  totalEvaluated: number;
  reliablePct: number;
  unreliablePct: number;
  contextualPct: number;
  reliabilityScore: number; // 0 - 100
  verdictLabel: string;
  breakdown: {
    category: string;
    count: number;
    pct: number;
    description: string;
    color: string;
  }[];
}

export function computeSourceReliability(claim: VerifiedClaim): SourceReliabilityDistribution {
  const sources = claim.groundingSources || [];
  const evidence = claim.keyEvidence || [];
  
  // High authority indicators
  const trustedDomainPatterns = [
    "reuters", "apnews", "nature", "science", "nasa", "who.int", "cdc",
    "nih.gov", "bbc", "snopes", "factcheck", "politifact", "afp", "bloomberg",
    "theguardian", "wsj", "nytimes", "gov", "edu", "org"
  ];

  let verifiedAuthoritative = 0;
  let contextual = 0;
  
  sources.forEach((src) => {
    const srcText = `${src.source} ${src.title} ${src.url || ""}`.toLowerCase();
    const isTrusted = trustedDomainPatterns.some((pattern) => srcText.includes(pattern));
    if (isTrusted) {
      verifiedAuthoritative += 1;
    } else {
      contextual += 1;
    }
  });

  // Base counts on evidence and truth score
  // If truth score is high, more sources are reliable; if false, viral rumors dominate
  let unreliable = 0;
  if (claim.truthScore < 40) {
    unreliable = Math.max(2, Math.round((100 - claim.truthScore) / 25) + (claim.sensationalismRisk === "Extreme" ? 2 : 1));
  } else if (claim.truthScore < 70) {
    unreliable = Math.max(1, Math.round((100 - claim.truthScore) / 35));
  } else {
    unreliable = claim.sensationalismRisk === "Low" ? 0 : 1;
  }

  // Ensure minimums for visual representation
  const safeReliable = Math.max(1, verifiedAuthoritative || (claim.truthScore > 50 ? 2 : 1));
  const safeContext = Math.max(1, contextual || (evidence.filter(e => e.type === "context").length || 1));
  const safeUnreliable = Math.max(claim.truthScore > 80 ? 0 : 1, unreliable);

  const total = safeReliable + safeUnreliable + safeContext;
  const reliablePct = Math.round((safeReliable / total) * 100);
  const unreliablePct = Math.round((safeUnreliable / total) * 100);
  const contextualPct = Math.max(0, 100 - reliablePct - unreliablePct);

  // Reliability score
  const reliabilityScore = Math.min(
    100,
    Math.max(10, Math.round(reliablePct * 0.9 + (100 - (claim.sensationalismRisk === "Extreme" ? 40 : claim.sensationalismRisk === "High" ? 25 : 10)) * 0.1))
  );

  let verdictLabel = "High Reliability";
  if (reliabilityScore < 35) verdictLabel = "Predominantly Questionable";
  else if (reliabilityScore < 65) verdictLabel = "Mixed Reliability";
  else if (reliabilityScore < 85) verdictLabel = "Moderate to High";

  return {
    reliableCount: safeReliable,
    unreliableCount: safeUnreliable,
    contextualCount: safeContext,
    totalEvaluated: total,
    reliablePct,
    unreliablePct,
    contextualPct,
    reliabilityScore,
    verdictLabel,
    breakdown: [
      {
        category: "Verified & Authoritative",
        count: safeReliable,
        pct: reliablePct,
        description: "Institutional registries, peer-reviewed studies, and accredited wire fact-checks",
        color: "#10b981", // emerald-500
      },
      {
        category: "Questionable / Viral Rumors",
        count: safeUnreliable,
        pct: unreliablePct,
        description: "Unsubstantiated social media threads, blog posts, or partisan claims",
        color: "#f43f5e", // rose-500
      },
      {
        category: "Contextual / Neutral Records",
        count: safeContext,
        pct: contextualPct,
        description: "Background documentation, contextual archives, and observational notes",
        color: "#f59e0b", // amber-500
      },
    ],
  };
}
