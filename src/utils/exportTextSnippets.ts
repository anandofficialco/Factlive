import { VerifiedClaim } from "../types";
import { computeSourceReliability } from "./sourceReliability";

export function generateMarkdownReport(claim: VerifiedClaim): string {
  const dist = computeSourceReliability(claim);
  const dateStr = new Date(claim.timestamp).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  // ASCII bar for source reliability: e.g. [███████░░░]
  const totalBlocks = 20;
  const reliableBlocks = Math.round((dist.reliablePct / 100) * totalBlocks);
  const contextBlocks = Math.round((dist.contextualPct / 100) * totalBlocks);
  const unreliableBlocks = Math.max(0, totalBlocks - reliableBlocks - contextBlocks);
  const asciiBar = "█".repeat(reliableBlocks) + "▒".repeat(contextBlocks) + "░".repeat(unreliableBlocks);

  return `# FactLive Verification Dossier: ${claim.verdictTitle}

**Claim Analyzed:** "${claim.claim}"
**Official Verdict:** ${claim.verdict}
**Truth Index:** ${claim.truthScore}/100 | **Model Confidence:** ${claim.confidenceScore}%
**Audit Date:** ${dateStr} | **Category:** ${claim.category}
**Record ID:** \`${claim.id}\`

---

## 1. Executive Summary & Bottom-Line Assessment
${claim.executiveSummary}

*Origin of Claim:* ${claim.claimOrigin}

---

## 2. Source Reliability Distribution Chart
\`\`\`
[${asciiBar}]
🟢 Reliable / Authoritative Sources : ${dist.reliableCount} (${dist.reliablePct}%)
🟡 Contextual Records             : ${dist.contextualCount} (${dist.contextualPct}%)
🔴 Questionable / Viral Rumors    : ${dist.unreliableCount} (${dist.unreliablePct}%)
Credibility Index: ${dist.reliabilityScore}/100 (${dist.verdictLabel})
\`\`\`

---

## 3. Key Evidence & Cross-Examination
${claim.keyEvidence.map((ev, i) => `- **[${ev.type.toUpperCase()}]** ${ev.statement}`).join("\n")}

---

## 4. Omitted & Missing Context
${claim.omittedContext || "None noted in primary evidentiary records."}

**Sensationalism Assessment:** ${claim.sensationalismRisk}
${claim.logicalFallacies && claim.logicalFallacies.length > 0 ? `**Detected Fallacies:** ${claim.logicalFallacies.join(", ")}` : ""}

---

## 5. Primary Citations & Grounding Sources
${claim.groundingSources.map((s, i) => `${i + 1}. **${s.title}** (${s.source})${s.url ? `\n   Link: ${s.url}` : ""}${s.snippet ? `\n   Note: "${s.snippet}"` : ""}`).join("\n\n")}

---
*Report generated via FactLive Evidence Intelligence Engine — www.factlive.in (Powered by Google Gemini).*
`;
}

export function generatePlainTextSnippet(claim: VerifiedClaim): string {
  const dist = computeSourceReliability(claim);
  const dateStr = new Date(claim.timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return `FACT CHECK [www.factlive.in] - ${claim.verdictTitle.toUpperCase()}
CLAIM: "${claim.claim}"
VERDICT: ${claim.verdict} (Truth Score: ${claim.truthScore}/100)
DATE: ${dateStr} | CATEGORY: ${claim.category}

SUMMARY:
${claim.executiveSummary}

SOURCE RELIABILITY BREAKDOWN:
- ${dist.reliablePct}% Verified Authoritative (${dist.reliableCount} sources)
- ${dist.unreliablePct}% Viral Rumor / Unreliable (${dist.unreliableCount} sources)
- Overall Credibility Index: ${dist.reliabilityScore}/100

KEY FINDINGS:
${claim.keyEvidence.map((e) => `• [${e.type.toUpperCase()}] ${e.statement}`).join("\n")}

CRUCIAL CONTEXT:
${claim.omittedContext || "Standard verification qualifiers apply."}

PRIMARY CITATIONS:
${claim.groundingSources.map((s) => `• ${s.source}: ${s.title}`).join("\n")}

Verified via FactLive (www.factlive.in | Record ID: ${claim.id})`;
}

export function generateSocialDebunkSnippet(claim: VerifiedClaim): string {
  const verdictEmoji =
    claim.verdict === "VERIFIED_TRUE"
      ? "✅ TRUE"
      : claim.verdict === "FALSE"
      ? "❌ FALSE"
      : claim.verdict === "MISLEADING"
      ? "⚠️ MISLEADING"
      : "🔍 PARTIALLY TRUE";

  return `${verdictEmoji}: "${claim.claim}"

FactLive truth score: ${claim.truthScore}/100.
Summary: ${claim.executiveSummary.slice(0, 240)}${claim.executiveSummary.length > 240 ? "..." : ""}

Missing Context: ${claim.omittedContext.slice(0, 150)}...
Full breakdown & source audit: https://www.factlive.in`;
}

export function generateJsonReport(claim: VerifiedClaim): string {
  const dist = computeSourceReliability(claim);
  return JSON.stringify(
    {
      reportMetadata: {
        engine: "FactLive Evidentiary Verification System",
        domain: "https://www.factlive.in",
        generatedAt: new Date().toISOString(),
        version: "1.0",
        sourceReliabilityDistribution: dist,
      },
      claimAudit: claim,
    },
    null,
    2
  );
}
