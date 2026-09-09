import React, { useState } from "react";
import {
  Search,
  Sparkles,
  Compass,
  FileText,
  Download,
  Copy,
  Check,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Layers,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Loader2,
  Share2,
  Calendar,
  Building,
  Target,
  BookOpen,
  Feather,
} from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { MethodologyModal } from "../components/MethodologyModal";
import { SubmitClaimModal } from "../components/SubmitClaimModal";
import { DeepResearchDossier } from "../types";
import { CURATED_DEEP_RESEARCH_DOSSIERS } from "../data/deepResearchData";

export const DeepResearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepth, setSelectedDepth] = useState<"Rapid" | "Investigative" | "Scholarly">("Investigative");
  const [activeDossier, setActiveDossier] = useState<DeepResearchDossier>(
    CURATED_DEEP_RESEARCH_DOSSIERS[0]
  );
  const [isLoading, setIsLoading] = useState(false);
  const [progressStep, setProgressStep] = useState<string>("");
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRunInvestigation = async (topicToRun?: string) => {
    const targetTopic = topicToRun || searchQuery;
    if (!targetTopic.trim()) return;

    setIsLoading(true);
    setProgressStep("Initializing multi-vector evidentiary scan...");

    const steps = [
      "Parsing narrative structure & historical wire origins...",
      "Querying global statutory registries & primary scientific archives...",
      "Cross-referencing timeline anomalies & acoustic/textual markers...",
      "Synthesizing counter-narrative matrix & delivering consensus monograph...",
    ];

    let stepIndex = 0;
    const interval = setInterval(() => {
      stepIndex++;
      if (stepIndex < steps.length) {
        setProgressStep(steps[stepIndex]);
      }
    }, 600);

    try {
      const res = await fetch("/api/deep-research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: targetTopic.trim(),
          depth: selectedDepth,
        }),
      });

      const data = await res.json();
      clearInterval(interval);

      if (data.success && data.dossier) {
        setActiveDossier(data.dossier);
      }
    } catch (err) {
      console.error("Deep research query failed:", err);
    } finally {
      clearInterval(interval);
      setIsLoading(false);
      setProgressStep("");
    }
  };

  const handleCopyDossier = async () => {
    if (!activeDossier) return;
    const text = `# FactLive Deep Research Monograph: ${activeDossier.topic}
Depth: ${activeDossier.depth} | Truth Plausibility: ${activeDossier.truthPlausibilityScore}%
Date: ${new Date(activeDossier.generatedAt).toLocaleDateString()}

EXECUTIVE HYPOTHESIS:
${activeDossier.executiveHypothesis}

CHRONOLOGICAL TIMELINE:
${activeDossier.timeline.map((t) => `• [${t.dateOrPeriod}] ${t.event} (${t.significance})`).join("\n")}

COUNTER-NARRATIVE MATRIX:
${activeDossier.counterNarrativeMatrix.map((m) => `• Viral Claim: ${m.viralHypothesis}\n  Verified Reality: ${m.verifiedReality}\n  Consensus: ${m.consensusVerdict}`).join("\n\n")}

CONCLUDING ASSESSMENT:
${activeDossier.concludingAssessment}

Audited via FactLive Non-Partisan Investigative Archives (www.factlive.in).`;

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn("Failed to copy", err);
    }
  };

  const handleDownloadDossier = () => {
    if (!activeDossier) return;
    const text = `# FactLive Deep Research Monograph: ${activeDossier.topic}
Depth: ${activeDossier.depth}
Plausibility Index: ${activeDossier.truthPlausibilityScore}/100 (${activeDossier.plausibilityRationale})
Generated: ${activeDossier.generatedAt}

## 1. Executive Hypothesis & Evidentiary Findings
${activeDossier.executiveHypothesis}

## 2. Chronological Investigation Timeline
${activeDossier.timeline.map((t) => `### ${t.dateOrPeriod}: ${t.event}\n**Significance:** ${t.significance}\n${t.sourceRef ? `**Primary Source:** ${t.sourceRef}\n` : ""}`).join("\n")}

## 3. Key Entities & Impact Mapping
${activeDossier.keyEntities.map((e) => `- **${e.name}** (${e.role}, ${e.affiliation}) — Impact: ${e.impact}`).join("\n")}

## 4. Counter-Narrative Examination Matrix
${activeDossier.counterNarrativeMatrix.map((m) => `#### Viral Claim
"${m.viralHypothesis}"
**Verified Empirical Reality:** ${m.verifiedReality}
**Consensus Ruling:** ${m.consensusVerdict}
`).join("\n")}

## 5. Concluding Assessment
${activeDossier.concludingAssessment}

## 6. Methodology & Sources
${activeDossier.methodologyNotes}

### Primary Citations:
${activeDossier.citations.map((c, idx) => `${idx + 1}. **${c.title}** — ${c.source}${c.url ? ` (${c.url})` : ""}`).join("\n")}
`;

    const blob = new Blob([text], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `FactLive-Monograph-${activeDossier.id}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] dark:bg-[#121110] text-[#1C1917] dark:text-[#F5F2EB] flex flex-col font-serif transition-colors">
      <Header
        activeTab="verify"
        setActiveTab={() => {}}
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
        onOpenMethodology={() => setIsMethodologyOpen(true)}
        totalVerifiedCount={142}
      />

      {/* Hero Header Masthead */}
      <section className="border-b-2 border-stone-800 dark:border-stone-700 bg-[#FAF7F2] dark:bg-[#181715] py-10 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 border border-stone-800 dark:border-stone-300 bg-[#F4EFE6] dark:bg-[#22201D] px-3.5 py-1 text-xs font-mono font-bold tracking-widest text-stone-900 dark:text-stone-100 uppercase">
                <Feather className="h-3.5 w-3.5" />
                <span>INVESTIGATIVE MONOGRAPHS & FORENSIC INQUESTS</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight text-stone-900 dark:text-stone-100">
                Deep Forensic Dossiers
              </h1>
              <p className="text-base sm:text-lg font-serif text-stone-700 dark:text-stone-300 leading-relaxed">
                Full-spectrum investigative monographs deconstructing complex institutional conspiracies, deepfake media provenance, and historical historical disinformation.
              </p>
            </div>

            {/* Depth Selection Pill */}
            <div className="border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1A1817] p-3 max-w-sm w-full space-y-2 shadow-sm">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                Inquest Scope Level
              </div>
              <div className="grid grid-cols-3 gap-1">
                {(["Rapid", "Investigative", "Scholarly"] as const).map((depth) => (
                  <button
                    key={depth}
                    onClick={() => setSelectedDepth(depth)}
                    className={`py-1.5 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                      selectedDepth === depth
                        ? "bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 font-bold"
                        : "bg-[#F4EFE6] dark:bg-[#141312] text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-800"
                    }`}
                  >
                    {depth}
                  </button>
                ))}
              </div>
              <div className="text-[11px] font-mono text-stone-500">
                {selectedDepth === "Rapid" && "1-page fast triage for breaking news rumors"}
                {selectedDepth === "Investigative" && "Multi-vector timeline, entity mapping & counter-claims"}
                {selectedDepth === "Scholarly" && "Academic citations, primary archives & forensic matrix"}
              </div>
            </div>
          </div>

          {/* Search / Inquest Launch Form */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleRunInvestigation()}
                placeholder="Enter investigation topic (e.g., '1947 Roswell weather balloon vs project mogul archives')..."
                className="w-full border border-stone-400 dark:border-stone-700 bg-white dark:bg-[#1A1817] py-2.5 pl-10 pr-4 text-sm font-serif text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-stone-900"
              />
            </div>
            <button
              onClick={() => handleRunInvestigation()}
              disabled={isLoading || !searchQuery.trim()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-stone-100 dark:text-stone-900 disabled:opacity-50 border border-stone-900 dark:border-stone-100 px-6 py-2.5 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Launch Deep Inquest</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Curated Investigation Dossier Selectors */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-stone-600 dark:text-stone-400 mr-1 font-bold">
              Archival Monographs:
            </span>
            {CURATED_DEEP_RESEARCH_DOSSIERS.map((dossier) => (
              <button
                key={dossier.id}
                onClick={() => setActiveDossier(dossier)}
                className={`border px-3 py-1 text-xs font-serif transition-colors cursor-pointer ${
                  activeDossier.id === dossier.id
                    ? "border-stone-900 dark:border-stone-100 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 font-bold"
                    : "border-stone-300 dark:border-stone-800 bg-[#FAF7F2] dark:bg-[#141312] text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800"
                }`}
              >
                {dossier.topic}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Dossier Content Body */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 py-8">
        {isLoading ? (
          <div className="my-16 border-2 border-stone-800 dark:border-stone-600 bg-white dark:bg-[#181715] p-12 text-center max-w-xl mx-auto shadow-lg">
            <div className="mx-auto flex h-12 w-12 items-center justify-center border border-stone-800 dark:border-stone-200 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 mb-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
            <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
              Conducting Multi-Vector Evidentiary Inquest
            </h3>
            <p className="mt-2 font-mono text-xs text-stone-600 dark:text-stone-400">
              {progressStep}
            </p>
          </div>
        ) : activeDossier ? (
          <article className="border-2 border-stone-800 dark:border-stone-700 bg-white dark:bg-[#1A1817] p-6 sm:p-10 shadow-md space-y-8">
            {/* Monograph Masthead & Metadata */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-stone-800 dark:border-stone-700 pb-6">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="border border-stone-800 dark:border-stone-300 bg-stone-900 dark:bg-stone-100 px-2.5 py-0.5 text-xs font-mono font-bold tracking-wider text-stone-100 dark:text-stone-900 uppercase">
                    DOSSIER #{activeDossier.id}
                  </span>
                  <span className="border border-stone-300 dark:border-stone-700 bg-[#FAF7F2] dark:bg-[#141312] px-2 py-0.5 text-xs font-mono text-stone-700 dark:text-stone-300 uppercase">
                    SCOPE: {activeDossier.depth}
                  </span>
                  <span className="text-xs font-mono text-stone-500">
                    {new Date(activeDossier.generatedAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-serif font-black text-stone-900 dark:text-stone-100 leading-tight">
                  {activeDossier.topic}
                </h2>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyDossier}
                  className="flex items-center gap-1.5 border border-stone-300 dark:border-stone-700 bg-[#FAF7F2] dark:bg-[#141312] px-3 py-1.5 text-xs font-mono font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-700 dark:text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-stone-600 dark:text-stone-400" />
                      <span>Copy Markdown</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDownloadDossier}
                  className="flex items-center gap-1.5 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 border border-stone-900 dark:border-stone-100 px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download File</span>
                </button>
              </div>
            </div>

            {/* Plausibility Score & Executive Summary Callout */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
              <div className="md:col-span-1 border border-stone-300 dark:border-stone-700 bg-[#FAF7F2] dark:bg-[#181715] p-5 text-center">
                <div className="text-[11px] font-mono uppercase tracking-widest text-stone-600 dark:text-stone-400 font-bold mb-1">
                  TRUTH PLAUSIBILITY
                </div>
                <div className="text-4xl font-serif font-black text-stone-900 dark:text-stone-100 my-1">
                  {activeDossier.truthPlausibilityScore}%
                </div>
                <div className="text-xs font-mono font-bold text-stone-700 dark:text-stone-300">
                  {activeDossier.plausibilityRationale}
                </div>
              </div>

              <div className="md:col-span-3 border border-stone-300 dark:border-stone-700 bg-[#FAF7F2] dark:bg-[#181715] p-6 space-y-2">
                <div className="text-xs font-mono uppercase tracking-widest text-stone-900 dark:text-stone-100 font-bold flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>EXECUTIVE HYPOTHESIS & EVIDENTIARY FINDINGS</span>
                </div>
                <p className="text-base sm:text-lg font-serif text-stone-800 dark:text-stone-200 leading-relaxed">
                  {activeDossier.executiveHypothesis}
                </p>
              </div>
            </div>

            {/* Chronological Investigation Timeline */}
            <div className="space-y-4 border-t-2 border-stone-800 dark:border-stone-700 pt-6">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-stone-800 dark:text-stone-200" />
                <h3 className="text-lg font-serif font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                  Chronological Evidentiary Timeline
                </h3>
              </div>

              <div className="space-y-3">
                {activeDossier.timeline.map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-stone-300 dark:border-stone-800 bg-[#FAF7F2] dark:bg-[#141312] p-4 flex flex-col sm:flex-row sm:items-start gap-4"
                  >
                    <div className="sm:w-36 shrink-0 font-mono text-xs font-bold text-stone-900 dark:text-stone-100 border-b sm:border-b-0 sm:border-r border-stone-200 dark:border-stone-800 pb-1 sm:pb-0 sm:pr-3">
                      {item.dateOrPeriod}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-serif text-sm sm:text-base font-semibold text-stone-900 dark:text-stone-100">
                        {item.event}
                      </p>
                      <p className="font-serif text-xs text-stone-600 dark:text-stone-400">
                        <strong>Significance:</strong> {item.significance}
                      </p>
                      {item.sourceRef && (
                        <div className="text-[11px] font-mono text-stone-500">
                          Primary Record: {item.sourceRef}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Entities & Institutional Roles */}
            <div className="space-y-4 border-t border-stone-300 dark:border-stone-800 pt-6">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-stone-800 dark:text-stone-200" />
                <h3 className="text-lg font-serif font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                  Key Entities & Institutional Impact
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeDossier.keyEntities.map((ent, idx) => (
                  <div
                    key={idx}
                    className="border border-stone-300 dark:border-stone-800 bg-[#FAF7F2] dark:bg-[#141312] p-4 space-y-1.5"
                  >
                    <div className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                      {ent.name}
                    </div>
                    <div className="font-mono text-[11px] text-stone-600 dark:text-stone-400">
                      {ent.role} • {ent.affiliation}
                    </div>
                    <p className="font-serif text-xs text-stone-700 dark:text-stone-300">
                      {ent.impact}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Counter-Narrative Examination Matrix */}
            <div className="space-y-4 border-t-2 border-stone-800 dark:border-stone-700 pt-6">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-stone-800 dark:text-stone-200" />
                <h3 className="text-lg font-serif font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                  Counter-Narrative Cross-Examination Matrix
                </h3>
              </div>

              <div className="space-y-4">
                {activeDossier.counterNarrativeMatrix.map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-stone-300 dark:border-stone-800 bg-[#FAF7F2] dark:bg-[#141312] p-5 space-y-3"
                  >
                    <div className="space-y-1">
                      <div className="font-mono text-[11px] font-bold text-rose-800 dark:text-rose-400 uppercase">
                        VIRAL HYPOTHESIS / PUBLIC RUMOR:
                      </div>
                      <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                        "{item.viralHypothesis}"
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-stone-200 dark:border-stone-800">
                      <div className="space-y-1">
                        <span className="font-mono text-[11px] font-bold text-stone-700 dark:text-stone-300 uppercase">
                          VERIFIED EMPIRICAL REALITY:
                        </span>
                        <p className="font-serif text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
                          {item.verifiedReality}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <span className="font-mono text-[11px] font-bold text-stone-700 dark:text-stone-300 uppercase">
                          CONSENSUS RULING:
                        </span>
                        <p className="font-serif text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
                          {item.consensusVerdict}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Concluding Assessment */}
            <div className="border border-stone-800 dark:border-stone-700 bg-[#F4EFE6] dark:bg-[#181715] p-6 space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-900 dark:text-stone-100">
                FINAL EDITORIAL ASSESSMENT
              </h4>
              <p className="text-base sm:text-lg font-serif text-stone-800 dark:text-stone-200 leading-relaxed">
                {activeDossier.concludingAssessment}
              </p>
            </div>

            {/* Citations & Primary Sources Bibliography */}
            <div className="border-t border-stone-300 dark:border-stone-800 pt-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                  PRIMARY CITATIONS & BIBLIOGRAPHY ({activeDossier.citations.length})
                </span>
                <span className="font-mono text-xs text-stone-500">
                  Archival Audit Standard
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-serif">
                {activeDossier.citations.map((c, i) => (
                  <div
                    key={i}
                    className="border border-stone-300 dark:border-stone-800 bg-[#FAF7F2] dark:bg-[#141312] p-3 flex items-start justify-between gap-2"
                  >
                    <div>
                      <div className="font-bold text-stone-900 dark:text-stone-100">{c.title}</div>
                      <div className="font-mono text-[10px] text-stone-500">{c.source}</div>
                    </div>
                    {c.url && (
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-stone-700 dark:text-stone-300 hover:text-stone-950 font-mono text-[10px]"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </article>
        ) : null}
      </main>

      <Footer
        onOpenMethodology={() => setIsMethodologyOpen(true)}
        onOpenSubmit={() => setIsSubmitModalOpen(true)}
      />

      <MethodologyModal
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
      />
      <SubmitClaimModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
      />
    </div>
  );
};
