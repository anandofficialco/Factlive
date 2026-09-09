export type VerdictType =
  | "VERIFIED_TRUE"
  | "MOSTLY_TRUE"
  | "HALF_TRUE"
  | "MOSTLY_FALSE"
  | "FALSE"
  | "MISLEADING"
  | "UNVERIFIED";

export interface EvidenceItem {
  statement: string;
  type: "support" | "refute" | "context";
}

export interface GroundingSource {
  title: string;
  source: string;
  url?: string;
  snippet?: string;
}

export interface VerifiedClaim {
  id: string;
  claim: string;
  category: string;
  verdict: VerdictType;
  truthScore: number; // 0 - 100
  confidenceScore: number; // 0 - 100
  verdictTitle: string;
  executiveSummary: string;
  claimOrigin: string;
  keyEvidence: EvidenceItem[];
  omittedContext: string;
  sensationalismRisk: "Low" | "Moderate" | "High" | "Extreme";
  logicalFallacies: string[];
  groundingSources: GroundingSource[];
  timestamp: string;
  viewsCount: number;
  agreedCount: number;
  debunkedCount: number;
  tags: string[];
}

export interface CompareResult {
  claimAVerdict: VerdictType;
  claimBVerdict: VerdictType;
  claimATruthScore: number;
  claimBTruthScore: number;
  synthesis: string;
  whereClaimARights: string;
  whereClaimAFails: string;
  whereClaimBRights: string;
  whereClaimBFails: string;
  objectiveConsensus: string;
}

// Deep Research Interfaces
export interface TimelineEvent {
  dateOrPeriod: string;
  event: string;
  significance: string;
  sourceRef?: string;
}

export interface DeepResearchEntity {
  name: string;
  role: string;
  affiliation: string;
  impact: "High" | "Moderate" | "Low";
}

export interface DeepResearchDossier {
  id: string;
  topic: string;
  depth: "Rapid" | "Investigative" | "Scholarly";
  generatedAt: string;
  executiveHypothesis: string;
  truthPlausibilityScore: number; // 0 - 100
  plausibilityRationale: string;
  timeline: TimelineEvent[];
  keyEntities: DeepResearchEntity[];
  counterNarrativeMatrix: {
    viralHypothesis: string;
    verifiedReality: string;
    consensusVerdict: string;
  }[];
  concludingAssessment: string;
  methodologyNotes: string;
  citations: GroundingSource[];
  tags: string[];
}

// Publication Interfaces
export interface PublicationAuthor {
  name: string;
  title: string;
  affiliation: string;
  avatar?: string;
}

export interface PublicationSection {
  heading: string;
  text: string;
  callout?: string;
  dataPoints?: { label: string; value: string }[];
}

export interface Publication {
  id: string;
  title: string;
  subtitle: string;
  authors: PublicationAuthor[];
  publishedDate: string;
  doi: string;
  category: "AI & Synthetic Media" | "Geopolitics" | "Health & Medicine" | "Science & Space" | "Media Literacy";
  peerReviewStatus: "Peer-Reviewed" | "Editorial Review" | "Open Preprint" | "IFCN Certified";
  abstract: string;
  keyTakeaways: string[];
  contentSections: PublicationSection[];
  citations: string[];
  tags: string[];
  readTimeMinutes: number;
}

// Intelligence Report Interfaces
export interface CategoryMetric {
  category: string;
  trueCount: number;
  falseCount: number;
  misleadingCount: number;
  total: number;
}

export interface TopDebunkItem {
  claim: string;
  verdict: VerdictType;
  reachEstimate: string;
  keyTakeaway: string;
}

export interface ThreatVector {
  name: string;
  riskLevel: "Critical" | "High" | "Moderate";
  trend: "Rising" | "Stable" | "Declining";
  description: string;
}

export interface IntelligenceReport {
  id: string;
  title: string;
  period: string;
  publishedDate: string;
  quarter: string;
  year: number;
  summary: string;
  highlights: string[];
  keyMetrics: {
    totalClaimsAudited: number;
    falsehoodPercentage: number;
    avgConfidence: number;
    topCirculatingTopic: string;
    velocityRiskScore: number;
  };
  categoryBreakdown: CategoryMetric[];
  topDebunks: TopDebunkItem[];
  threatVectors: ThreatVector[];
}

// Personal Blog Post Interfaces
export interface BlogAuthor {
  name: string;
  role: string;
  avatar?: string;
  bio: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: BlogAuthor;
  publishedDate: string;
  category: "OSINT Field Notes" | "Behind the Debunk" | "Algorithms & AI" | "Media Literacy" | "Editor's Notebook";
  readTimeMinutes: number;
  coverGradient: string;
  content: string[]; // array of markdown paragraphs or sections
  keyQuotes?: string[];
  relatedClaims?: string[];
  likesCount: number;
  commentsCount: number;
  tags: string[];
}

