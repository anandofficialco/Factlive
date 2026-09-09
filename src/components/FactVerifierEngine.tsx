import React, { useState, useEffect } from "react";
import {
  Search,
  Sparkles,
  Loader2,
  AlertCircle,
  RotateCcw,
  TrendingUp,
  FileText,
  Clock,
  Feather,
} from "lucide-react";
import { VerifiedClaim } from "../types";
import { VerificationCard } from "./VerificationCard";

interface FactVerifierEngineProps {
  currentClaim: VerifiedClaim | null;
  setCurrentClaim: (claim: VerifiedClaim | null) => void;
  onClaimVerified: (claim: VerifiedClaim) => void;
  onVote?: (id: string, type: "believed" | "debunked") => void;
}

const SAMPLE_CLAIMS = [
  "Did NASA discover alien life on exoplanet K2-18b?",
  "Can raw celery juice cure rheumatoid arthritis and detox liver metals?",
  "Are bananas radioactive enough to set off port security radiation monitors?",
  "Was the Eiffel Tower sold for scrap metal by a con artist twice?",
  "Did caffeine get banned for Olympic athletes in 2024?",
  "Does swallowed chewing gum actually take 7 years to digest in your stomach?",
];

const LOADING_STAGES = [
  "Auditing wire registries, statutory archives & primary scientific databases...",
  "Cross-referencing witness transcripts, original press footage & official records...",
  "Dissecting rhetorical fallacies, selective quotes & chronological distortions...",
  "Calibrating empirical Truth Barometer & preparing official editorial ruling...",
];

export const FactVerifierEngine: React.FC<FactVerifierEngineProps> = ({
  currentClaim,
  setCurrentClaim,
  onClaimVerified,
  onVote,
}) => {
  const [inputClaim, setInputClaim] = useState("");
  const [context, setContext] = useState("");
  const [showContextInput, setShowContextInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStageIndex, setLoadingStageIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      if (!isLoading && inputClaim.trim()) {
        handleVerify();
      }
    }
  };

  // Animate loading stages
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      setLoadingStageIndex(0);
      interval = setInterval(() => {
        setLoadingStageIndex((prev) => (prev + 1) % LOADING_STAGES.length);
      }, 1600);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleVerify = async (claimToVerify?: string) => {
    const claim = (claimToVerify || inputClaim).trim();
    if (!claim) {
      setErrorMessage("Please enter a claim, statement, or rumor to audit.");
      return;
    }

    setErrorMessage(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/fact-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claim, context }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to audit claim. Please try again.");
      }

      setCurrentClaim(data.result);
      onClaimVerified(data.result);
    } catch (err: any) {
      console.error("Verification error:", err);
      setErrorMessage(err.message || "An unexpected error occurred during verification.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSampleClick = (sample: string) => {
    setInputClaim(sample);
    handleVerify(sample);
  };

  const handleReset = () => {
    setInputClaim("");
    setContext("");
    setCurrentClaim(null);
    setErrorMessage(null);
  };

  return (
    <section className="space-y-8">
      {/* Editorial Inquest Terminal / Hero Section */}
      <div className="border-2 border-stone-800 dark:border-stone-700 bg-[#FAF7F2] dark:bg-[#181715] p-6 sm:p-10 shadow-md">
        <div className="mx-auto max-w-3xl text-center space-y-3">
          <div className="inline-flex items-center gap-2 border border-stone-800 dark:border-stone-300 bg-[#F4EFE6] dark:bg-[#22201D] px-3.5 py-1 text-xs font-mono font-bold tracking-widest text-stone-900 dark:text-stone-100 uppercase">
            <Feather className="h-3.5 w-3.5 text-stone-700 dark:text-stone-300" />
            <span>INVESTIGATIVE INQUEST TERMINAL</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight text-stone-900 dark:text-stone-100 leading-tight">
            Audit Any Public Statement, Rumor, or Breaking Wire Claim.
          </h1>

          <p className="text-base sm:text-lg font-serif text-stone-700 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Submit a viral screenshot, medical claim, political statistic, or social rumor for rigorous evidentiary dissection grounded in primary historical and scientific archives.
          </p>
        </div>

        {/* Input Form Box */}
        <div className="mx-auto mt-8 max-w-3xl space-y-4">
          <div className="border border-stone-400 dark:border-stone-700 bg-white dark:bg-[#1F1D1B] p-3 shadow-inner">
            <textarea
              id="claim-input-box"
              rows={3}
              value={inputClaim}
              onChange={(e) => {
                setInputClaim(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Type or paste a viral headline, transcript excerpt, or statement... (e.g. 'NASA discovered alien biomarkers on exoplanet K2-18b')"
              className="w-full resize-none bg-transparent px-3 py-2 text-base font-serif text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none"
              disabled={isLoading}
            />

            {showContextInput && (
              <div className="mt-2 border-t border-stone-200 dark:border-stone-800 pt-2 px-1">
                <input
                  type="text"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="Additional context: Source URL, platform, speaker byline, or date..."
                  className="w-full bg-[#FAF7F2] dark:bg-[#141312] border border-stone-300 dark:border-stone-700 px-3 py-1.5 text-xs font-mono text-stone-800 dark:text-stone-200 placeholder-stone-400 focus:outline-none focus:border-stone-600"
                  disabled={isLoading}
                />
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-stone-200 dark:border-stone-800 pt-2.5 px-2">
              <button
                type="button"
                onClick={() => setShowContextInput(!showContextInput)}
                className="text-xs font-mono text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
              >
                {showContextInput ? "- Remove secondary context" : "+ Add primary source URL or speaker"}
              </button>

              <div className="flex items-center gap-2">
                {inputClaim && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex items-center gap-1 border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 px-2.5 py-1.5 text-xs font-mono text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Reset
                  </button>
                )}

                <button
                  id="btn-verify-claim"
                  type="button"
                  onClick={() => handleVerify()}
                  disabled={isLoading || !inputClaim.trim()}
                  className="flex items-center gap-2 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-stone-100 dark:text-stone-900 disabled:opacity-50 border border-stone-900 dark:border-stone-100 px-5 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all shadow cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Auditing Evidence...</span>
                    </>
                  ) : (
                    <>
                      <Search className="h-3.5 w-3.5" />
                      <span>Deliver Evidentiary Audit</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Error notice if any */}
          {errorMessage && (
            <div className="flex items-center gap-2 border border-rose-700 bg-rose-50 dark:bg-rose-950/60 p-3 text-xs font-mono text-rose-900 dark:text-rose-200">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-700 dark:text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Trending Inquests Section */}
          <div className="pt-2 border-t border-stone-300 dark:border-stone-800">
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-2.5 font-bold">
              <TrendingUp className="h-3.5 w-3.5 text-stone-700 dark:text-stone-300" />
              <span>Trending Inquests in Circulation</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SAMPLE_CLAIMS.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSampleClick(sample)}
                  disabled={isLoading}
                  className="border border-stone-300 dark:border-stone-800 bg-[#F4EFE6] dark:bg-[#1A1817] hover:bg-stone-200 dark:hover:bg-stone-800 p-2.5 text-xs font-serif text-stone-800 dark:text-stone-200 text-left transition-colors cursor-pointer"
                >
                  <span className="italic">"{sample}"</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading Progress State */}
        {isLoading && (
          <div className="mt-8 border-2 border-stone-800 dark:border-stone-600 bg-white dark:bg-[#141312] p-6 text-center shadow-lg max-w-xl mx-auto">
            <div className="mx-auto flex h-10 w-10 items-center justify-center border border-stone-800 dark:border-stone-200 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 mb-3">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
            <p className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
              Conducting Forensic Evidentiary Inquest
            </p>
            <p className="mt-1 font-mono text-xs text-stone-600 dark:text-stone-400">
              {LOADING_STAGES[loadingStageIndex]}
            </p>
            <div className="mx-auto mt-4 max-w-xs h-1 w-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
              <div
                className="h-full bg-stone-900 dark:bg-stone-100 transition-all duration-500"
                style={{
                  width: `${((loadingStageIndex + 1) / LOADING_STAGES.length) * 100}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Active Verification Result Card */}
      {currentClaim && !isLoading && (
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-stone-300 dark:border-stone-800 pb-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-stone-900 dark:text-stone-100">
                OFFICIAL EDITORIAL DOSSIER
              </span>
              <span className="font-mono text-[10px] text-stone-500">#{currentClaim.id}</span>
            </div>
            <button
              onClick={handleReset}
              className="text-xs font-mono text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Audit another statement</span>
            </button>
          </div>
          <VerificationCard claim={currentClaim} onVote={onVote} />
        </div>
      )}
    </section>
  );
};
