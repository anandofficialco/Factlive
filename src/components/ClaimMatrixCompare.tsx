import React, { useState } from "react";
import { Scale, Loader2, Sparkles, AlertCircle, ArrowRight, Check, X, BookOpen } from "lucide-react";
import { CompareResult } from "../types";
import { VerdictBadge } from "./VerdictBadge";

const SAMPLE_COMPARISONS = [
  {
    title: "Electric Vehicles Carbon Footprint",
    claimA: "Electric cars create more lifetime carbon emissions than gasoline cars due to battery manufacturing.",
    claimB: "Electric vehicles have zero emissions and zero environmental impact compared to internal combustion.",
  },
  {
    title: "Artificial Sweeteners Safety",
    claimA: "Aspartame is extremely toxic and directly causes brain cancer in humans.",
    claimB: "Aspartame has zero health risks at any dosage level consumed by humans.",
  },
  {
    title: "AI Energy Consumption",
    claimA: "A single AI prompt consumes a gallon of fresh water and enough electricity to power an apartment for an hour.",
    claimB: "AI data center energy usage is negligible and has zero impact on global power grids.",
  },
  {
    title: "Organic Food Nutrition",
    claimA: "Organic produce contains significantly more vitamins and prevents diseases compared to standard produce.",
    claimB: "There is zero nutritional or safety difference between certified organic and conventional food.",
  },
];

export const ClaimMatrixCompare: React.FC = () => {
  const [claimA, setClaimA] = useState("");
  const [claimB, setClaimB] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CompareResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCompare = async (a?: string, b?: string) => {
    const textA = (a || claimA).trim();
    const textB = (b || claimB).trim();

    if (!textA || !textB) {
      setError("Please provide both conflicting claims to cross-examine.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/compare-claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claimA: textA, claimB: textB }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to compare claims.");
      }

      setResult(data.comparison);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during comparison.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadSample = (sample: { claimA: string; claimB: string }) => {
    setClaimA(sample.claimA);
    setClaimB(sample.claimB);
    handleCompare(sample.claimA, sample.claimB);
  };

  return (
    <div className="space-y-8">
      {/* Editorial Compare Header */}
      <div className="border-2 border-stone-800 dark:border-stone-700 bg-[#FAF7F2] dark:bg-[#181715] p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-stone-900 dark:text-stone-100 font-bold">
            <Scale className="h-4 w-4" />
            <span>THE EVIDENTIARY TRIBUNAL & TRUTH MATRIX</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-stone-100">
            Cross-Examine Contradictory Narratives
          </h2>
          <p className="text-sm font-serif text-stone-700 dark:text-stone-300 leading-relaxed">
            Polarizing rumors thrive when opposing factions cherry-pick conflicting half-truths. Compare both claims side-by-side to extract verified empirical consensus.
          </p>
        </div>

        {/* Inputs Split Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
              NARRATIVE / PERSPECTIVE A:
            </label>
            <textarea
              rows={3}
              value={claimA}
              onChange={(e) => setClaimA(e.target.value)}
              placeholder="e.g. 'Electric cars create more lifetime carbon emissions than gasoline cars due to battery manufacturing.'"
              className="w-full resize-none border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1A1817] p-3 text-sm font-serif text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-stone-900"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
              NARRATIVE / PERSPECTIVE B:
            </label>
            <textarea
              rows={3}
              value={claimB}
              onChange={(e) => setClaimB(e.target.value)}
              placeholder="e.g. 'EVs are 100% clean and have zero environmental impact from day one.'"
              className="w-full resize-none border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1A1817] p-3 text-sm font-serif text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-stone-900"
            />
          </div>
        </div>

        {/* Comparison Actions */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-stone-200 dark:border-stone-800 pt-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-mono text-stone-500 mr-1">Precedent Cases:</span>
            {SAMPLE_COMPARISONS.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => handleLoadSample(sample)}
                className="border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1A1817] px-2.5 py-1 text-xs font-serif text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer"
              >
                {sample.title}
              </button>
            ))}
          </div>

          <button
            onClick={() => handleCompare()}
            disabled={isLoading || !claimA.trim() || !claimB.trim()}
            className="flex items-center gap-2 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 disabled:opacity-50 px-5 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Auditing Contradictions...</span>
              </>
            ) : (
              <>
                <Scale className="h-4 w-4" />
                <span>Cross-Examine Claims</span>
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mt-4 flex items-center gap-2 border border-rose-700 bg-rose-50 dark:bg-rose-950/50 p-3 text-xs font-mono text-rose-900 dark:text-rose-200">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-700" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Comparison Results Card */}
      {result && (
        <div className="border-2 border-stone-800 dark:border-stone-700 bg-white dark:bg-[#1A1817] p-6 sm:p-8 space-y-6 shadow-md">
          <div className="border-b-2 border-stone-800 dark:border-stone-700 pb-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-stone-900 dark:text-stone-100 font-bold mb-1">
              <BookOpen className="h-3.5 w-3.5" />
              <span>EDITORIAL SYNTHESIS & RULING</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-black text-stone-900 dark:text-stone-100 leading-snug">
              {result.synthesis}
            </h3>
          </div>

          {/* Side by Side Claim Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Claim A Analysis */}
            <div className="border border-stone-300 dark:border-stone-800 bg-[#FAF7F2] dark:bg-[#141312] p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
                <span className="text-xs font-mono uppercase tracking-widest text-stone-800 dark:text-stone-200 font-bold">
                  PERSPECTIVE A
                </span>
                <VerdictBadge verdict={result.claimAVerdict} size="sm" />
              </div>
              <p className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100">
                "{claimA}"
              </p>
              <div className="space-y-2 text-xs font-serif">
                <div className="border border-emerald-700/40 bg-emerald-50 dark:bg-emerald-950/30 p-3 text-stone-900 dark:text-emerald-100">
                  <div className="flex items-center gap-1 text-emerald-800 dark:text-emerald-300 font-bold font-mono text-[11px] mb-1">
                    <Check className="h-3.5 w-3.5" />
                    <span>VERIFIABLE TRUTH:</span>
                  </div>
                  <p>{result.whereClaimARights}</p>
                </div>
                <div className="border border-rose-700/40 bg-rose-50 dark:bg-rose-950/30 p-3 text-stone-900 dark:text-rose-100">
                  <div className="flex items-center gap-1 text-rose-800 dark:text-rose-300 font-bold font-mono text-[11px] mb-1">
                    <X className="h-3.5 w-3.5" />
                    <span>DISTORTION OR OMISSION:</span>
                  </div>
                  <p>{result.whereClaimAFails}</p>
                </div>
              </div>
            </div>

            {/* Claim B Analysis */}
            <div className="border border-stone-300 dark:border-stone-800 bg-[#FAF7F2] dark:bg-[#141312] p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
                <span className="text-xs font-mono uppercase tracking-widest text-stone-800 dark:text-stone-200 font-bold">
                  PERSPECTIVE B
                </span>
                <VerdictBadge verdict={result.claimBVerdict} size="sm" />
              </div>
              <p className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100">
                "{claimB}"
              </p>
              <div className="space-y-2 text-xs font-serif">
                <div className="border border-emerald-700/40 bg-emerald-50 dark:bg-emerald-950/30 p-3 text-stone-900 dark:text-emerald-100">
                  <div className="flex items-center gap-1 text-emerald-800 dark:text-emerald-300 font-bold font-mono text-[11px] mb-1">
                    <Check className="h-3.5 w-3.5" />
                    <span>VERIFIABLE TRUTH:</span>
                  </div>
                  <p>{result.whereClaimBRights}</p>
                </div>
                <div className="border border-rose-700/40 bg-rose-50 dark:bg-rose-950/30 p-3 text-stone-900 dark:text-rose-100">
                  <div className="flex items-center gap-1 text-rose-800 dark:text-rose-300 font-bold font-mono text-[11px] mb-1">
                    <X className="h-3.5 w-3.5" />
                    <span>DISTORTION OR OMISSION:</span>
                  </div>
                  <p>{result.whereClaimBFails}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Objective Scientific Consensus Footer */}
          <div className="border border-stone-800 dark:border-stone-700 bg-[#F4EFE6] dark:bg-[#141312] p-5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-900 dark:text-stone-100 mb-1.5">
              ESTABLISHED EMPIRICAL & SCIENTIFIC CONSENSUS
            </h4>
            <p className="text-sm sm:text-base font-serif text-stone-800 dark:text-stone-200 leading-relaxed">
              {result.objectiveConsensus}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
