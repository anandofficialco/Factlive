import { IntelligenceReport } from "../types";

export const CURATED_INTELLIGENCE_REPORTS: IntelligenceReport[] = [
  {
    id: "report-q1-2025",
    title: "Q1 2025 Global Disinformation Threat Landscape & Truth Velocity Audit",
    period: "January - March 2025",
    publishedDate: "2025-04-05",
    quarter: "Q1",
    year: 2025,
    summary:
      "A comprehensive quarterly intelligence audit tracking 28,450 verified claims, cross-border coordinated inauthentic behavior, and the expanding prevalence of low-latency AI-generated media across major communication platforms.",
    highlights: [
      "Total audited claims reached 28,450, a 22% increase over Q4 2024 driven primarily by electoral cycles.",
      "False and misleading claims accounted for 64.2% of viral submissions.",
      "Scientific and health claims exhibited the highest sensationalism risk (74% high/extreme risk).",
      "Average debunk turnaround time improved to 18 minutes using FactLive automated source grounding.",
    ],
    keyMetrics: {
      totalClaimsAudited: 28450,
      falsehoodPercentage: 64.2,
      avgConfidence: 94.6,
      topCirculatingTopic: "AI Deepfakes & Electoral Rumors",
      velocityRiskScore: 82,
    },
    categoryBreakdown: [
      { category: "Science & Space", trueCount: 2100, falseCount: 1850, misleadingCount: 2400, total: 6350 },
      { category: "Health & Medicine", trueCount: 950, falseCount: 4200, misleadingCount: 2100, total: 7250 },
      { category: "Politics & World", trueCount: 1800, falseCount: 3900, misleadingCount: 3100, total: 8800 },
      { category: "Technology & AI", trueCount: 1400, falseCount: 1800, misleadingCount: 1650, total: 4850 },
      { category: "Environment", trueCount: 450, falseCount: 420, misleadingCount: 330, total: 1200 },
    ],
    topDebunks: [
      {
        claim: "WHO declared a mandatory global climate lockdown protocol for municipal zones.",
        verdict: "FALSE",
        reachEstimate: "4.2M views across 12 countries",
        keyTakeaway: "Fabricated rumor misrepresenting voluntary urban sustainability benchmarking guidelines.",
      },
      {
        claim: "NASA James Webb confirmed intelligent alien signals from K2-18b.",
        verdict: "MISLEADING",
        reachEstimate: "8.1M views across social platforms",
        keyTakeaway: "Spectroscopic biosignature candidates remain statistically marginal and require years of study.",
      },
      {
        claim: "Drinking raw celery juice cures rheumatoid arthritis.",
        verdict: "FALSE",
        reachEstimate: "2.9M views on short-form video",
        keyTakeaway: "Zero clinical trial support; dietary fads cannot replace disease-modifying pharmacotherapy.",
      },
    ],
    threatVectors: [
      {
        name: "Voice Clone Impersonation in Elections",
        riskLevel: "Critical",
        trend: "Rising",
        description: "Low-resource acoustic cloning deployed in 48-hour pre-vote blackout windows.",
      },
      {
        name: "Monetized Health Pseudoscience & Concealed Affiliates",
        riskLevel: "High",
        trend: "Rising",
        description: "Short-form video influencers promoting miracle detoxes with hidden commission links.",
      },
      {
        name: "Astroturfed Climate Conspiracies",
        riskLevel: "Moderate",
        trend: "Stable",
        description: "Weaponization of standard urban planning policies into totalitarian conspiracy narratives.",
      },
    ],
  },
  {
    id: "report-annual-2024",
    title: "2024 Annual State of Global Fact-Checking & Information Integrity",
    period: "Full Year 2024",
    publishedDate: "2025-01-15",
    quarter: "Annual",
    year: 2024,
    summary:
      "The definitive annual retrospective analyzing 114,000 truth claims across 42 countries, evaluating the efficacy of real-time automated verification, and cataloging the evolving taxonomy of digital rumors.",
    highlights: [
      "Over 114,000 claims evaluated by FactLive and partner organizations worldwide.",
      "58.8% of viral claims contained factual distortions, fabricated quotes, or missing chronological context.",
      "Adoption of IFCN non-partisan standards grew by 35% among independent digital newsrooms.",
    ],
    keyMetrics: {
      totalClaimsAudited: 114000,
      falsehoodPercentage: 58.8,
      avgConfidence: 93.1,
      topCirculatingTopic: "Geopolitical Elections & Public Health",
      velocityRiskScore: 78,
    },
    categoryBreakdown: [
      { category: "Politics & World", trueCount: 12500, falseCount: 18900, misleadingCount: 15400, total: 46800 },
      { category: "Health & Medicine", trueCount: 6200, falseCount: 14800, misleadingCount: 9400, total: 30400 },
      { category: "Science & Space", trueCount: 8400, falseCount: 5200, misleadingCount: 6100, total: 19700 },
      { category: "Technology & AI", trueCount: 5800, falseCount: 6400, misleadingCount: 4900, total: 17100 },
    ],
    topDebunks: [
      {
        claim: "European Union banned all internal combustion engine repairs starting 2025.",
        verdict: "FALSE",
        reachEstimate: "14.5M impressions",
        keyTakeaway: "Regulations apply exclusively to new vehicle manufacturing sales in 2035.",
      },
      {
        claim: "Synthetic DNA found in regular municipal drinking water.",
        verdict: "FALSE",
        reachEstimate: "6.2M impressions",
        keyTakeaway: "Conflation of harmless biological environmental DNA sampling with synthetic genetic modification.",
      },
    ],
    threatVectors: [
      {
        name: "Coordinated Bot Amplification on Microblogging Platforms",
        riskLevel: "Critical",
        trend: "Stable",
        description: "Automated account clusters engineered to force synthetic hashtags into trending algorithms.",
      },
      {
        name: "Cheapfake Image Re-contextualization",
        riskLevel: "High",
        trend: "Stable",
        description: "Authentic crisis imagery from past years recirculated with false contemporary datelines.",
      },
    ],
  },
];
