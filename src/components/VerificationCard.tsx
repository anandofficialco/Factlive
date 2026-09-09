import React, { useState, useEffect } from "react";
import {
  ExternalLink,
  Share2,
  Copy,
  Check,
  AlertTriangle,
  FileText,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  Layers,
  Flag,
  Download,
  BookOpen,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import { VerifiedClaim } from "../types";
import { VerdictBadge } from "./VerdictBadge";
import { TruthMeter } from "./TruthMeter";
import { SourceReliabilityChart } from "./SourceReliabilityChart";
import { ExportReportModal } from "./ExportReportModal";
import { recordFeedClaimView, isClaimSaved, toggleSaveClaim } from "../utils/feedStorage";

interface VerificationCardProps {
  claim: VerifiedClaim;
  onVote?: (id: string, type: "believed" | "debunked") => void;
}

export const VerificationCard: React.FC<VerificationCardProps> = ({
  claim,
  onVote,
}) => {
  const [copied, setCopied] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [hasVoted, setHasVoted] = useState<"believed" | "debunked" | null>(null);
  const [isSaved, setIsSaved] = useState(() => isClaimSaved(claim.id));

  // Auto-record to user's recent feed history
  useEffect(() => {
    recordFeedClaimView(claim);
    setIsSaved(isClaimSaved(claim.id));
  }, [claim.id]);

  const handleToggleSave = () => {
    const nextSaved = toggleSaveClaim(claim.id);
    setIsSaved(nextSaved);
  };

  const handleCopy = async () => {
    const text = `FactLive Evidentiary Ruling:\nClaim: "${claim.claim}"\nVerdict: ${claim.verdict} (${claim.truthScore}/100)\nRuling: ${claim.executiveSummary}\nAudited via FactLive Non-Partisan Dispatch.`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.warn("Clipboard copy fallback failed:", err);
      }
    }
  };

  const handleVote = (type: "believed" | "debunked") => {
    if (hasVoted) return;
    setHasVoted(type);
    if (onVote) {
      onVote(claim.id, type);
    }
  };

  return (
    <div
      id={`claim-card-${claim.id}`}
      className="border-2 border-stone-800 dark:border-stone-700 bg-[#FFFFFF] dark:bg-[#1A1817] p-5 sm:p-8 shadow-md"
    >
      {/* Editorial Header Dateline & Metadata */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-stone-800 dark:border-stone-700 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="border border-stone-800 dark:border-stone-300 bg-stone-900 dark:bg-stone-100 px-2.5 py-0.5 text-xs font-mono font-bold tracking-wider text-stone-100 dark:text-stone-900 uppercase">
            {claim.category}
          </span>
          <span className="text-xs font-mono text-stone-600 dark:text-stone-400">
            {new Date(claim.timestamp).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="text-stone-400 dark:text-stone-600">•</span>
          <span className="text-xs font-mono text-stone-700 dark:text-stone-300">
            Circulation Origin: <strong className="text-stone-900 dark:text-stone-100 font-serif">{claim.claimOrigin}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Auto-saved bookmark button */}
          <button
            onClick={handleToggleSave}
            className={`flex items-center gap-1.5 border px-3 py-1 text-xs font-mono font-medium transition-colors cursor-pointer ${
              isSaved
                ? "border-amber-600 bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold"
                : "border-stone-300 dark:border-stone-700 bg-[#FAF7F2] dark:bg-[#141312] text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800"
            }`}
            title={isSaved ? "Saved to your feed ledger (Click to unsave)" : "Auto-save to your feed ledger"}
          >
            <Bookmark className={`h-3.5 w-3.5 ${isSaved ? "fill-amber-500 text-amber-600" : "text-stone-600 dark:text-stone-400"}`} />
            <span>{isSaved ? "Saved in Feed" : "Save Claim"}</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 border border-stone-300 dark:border-stone-700 bg-[#FAF7F2] dark:bg-[#141312] px-3 py-1 text-xs font-mono font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            title="Copy verification summary"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-700 dark:text-emerald-400" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-stone-600 dark:text-stone-400" />
                <span>Copy Summary</span>
              </>
            )}
          </button>

          <button
            id={`btn-export-claim-${claim.id}`}
            onClick={() => setIsExportModalOpen(true)}
            className="flex items-center gap-1.5 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-stone-100 dark:text-stone-900 border border-stone-900 dark:border-stone-100 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer"
            title="Export full editorial report as PDF or formatted Markdown snippet"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export Monograph</span>
          </button>
        </div>
      </div>

      {/* Headline & Ruling Layout */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-5">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-stone-600 dark:text-stone-400 font-bold">
              AUDITED STATEMENT / VIRAL HEADLINE
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-stone-100 leading-snug">
              "{claim.claim}"
            </h2>
          </div>

          {/* Stamped Verdict & Subhead */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1 border-t border-stone-200 dark:border-stone-800">
            <VerdictBadge verdict={claim.verdict} size="lg" />
            <span className="text-sm font-serif font-bold text-stone-800 dark:text-stone-200 italic">
              — {claim.verdictTitle}
            </span>
          </div>

          {/* Editorial Bottom-Line Assessment Callout Box */}
          <div className="border border-stone-300 dark:border-stone-700 bg-[#FAF7F2] dark:bg-[#181715] p-5">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
              <BookOpen className="h-4 w-4 text-stone-700 dark:text-stone-300" />
              <span>THE EDITORIAL RULING & FINDINGS</span>
            </div>
            <p className="text-base sm:text-lg font-serif text-stone-800 dark:text-stone-200 leading-relaxed">
              {claim.executiveSummary}
            </p>
          </div>
        </div>

        {/* Truth Barometer Column */}
        <div className="lg:col-span-1 space-y-4">
          <TruthMeter
            score={claim.truthScore}
            verdict={claim.verdict}
            confidenceScore={claim.confidenceScore}
          />

          {/* Sensationalism & Fallacy Audit Box */}
          <div className="border border-stone-300 dark:border-stone-800 bg-[#F4EFE6] dark:bg-[#141312] p-4 text-xs font-mono space-y-2.5">
            <div className="flex items-center justify-between text-stone-700 dark:text-stone-300">
              <span className="font-semibold">Sensationalism Index:</span>
              <span
                className={`font-bold border px-1.5 py-0.2 ${
                  claim.sensationalismRisk === "Extreme" || claim.sensationalismRisk === "High"
                    ? "border-rose-700 text-rose-800 dark:text-rose-300 bg-rose-50 dark:bg-rose-950"
                    : claim.sensationalismRisk === "Moderate"
                    ? "border-amber-700 text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950"
                    : "border-emerald-700 text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950"
                }`}
              >
                {claim.sensationalismRisk} Risk
              </span>
            </div>
            {claim.logicalFallacies && claim.logicalFallacies.length > 0 && (
              <div className="pt-2 border-t border-stone-300 dark:border-stone-800">
                <span className="text-stone-600 dark:text-stone-400 block mb-1.5 font-semibold">
                  Detected Rhetorical Distortions:
                </span>
                <div className="flex flex-wrap gap-1">
                  {claim.logicalFallacies.map((fallacy, idx) => (
                    <span
                      key={idx}
                      className="border border-stone-400 dark:border-stone-700 bg-stone-100 dark:bg-stone-900 px-1.5 py-0.5 text-[10px] text-stone-800 dark:text-stone-200"
                    >
                      {fallacy}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Evidentiary Cross-Examination Ledger */}
      {claim.keyEvidence && claim.keyEvidence.length > 0 && (
        <div className="mt-8 border-t-2 border-stone-800 dark:border-stone-700 pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="h-4 w-4 text-stone-800 dark:text-stone-200" />
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
              Evidentiary Cross-Examination Ledger
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {claim.keyEvidence.map((item, index) => {
              const typeStr = (item.type || "context").toLowerCase();
              const isSupport = typeStr === "support";
              const isRefute = typeStr === "refute";
              return (
                <div
                  key={index}
                  className={`flex items-start gap-3 border p-4 text-sm font-serif ${
                    isSupport
                      ? "border-emerald-700/40 bg-emerald-50/50 dark:bg-emerald-950/20 text-stone-900 dark:text-emerald-100"
                      : isRefute
                      ? "border-rose-700/40 bg-rose-50/50 dark:bg-rose-950/20 text-stone-900 dark:text-rose-100"
                      : "border-stone-300 dark:border-stone-800 bg-[#FAF7F2] dark:bg-[#141312] text-stone-800 dark:text-stone-300"
                  }`}
                >
                  <span
                    className={`mt-0.5 shrink-0 border px-2 py-0.5 font-mono text-[10px] uppercase font-bold tracking-wider ${
                      isSupport
                        ? "border-emerald-700 text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900"
                        : isRefute
                        ? "border-rose-700 text-rose-800 dark:text-rose-300 bg-rose-100 dark:bg-rose-900"
                        : "border-stone-400 text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800"
                    }`}
                  >
                    {item.type}
                  </span>
                  <p className="leading-relaxed text-stone-900 dark:text-stone-100">{item.statement}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Omitted Context Notice */}
      {claim.omittedContext && (
        <div className="mt-5 border-l-4 border-amber-600 bg-amber-50 dark:bg-amber-950/30 p-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 mb-1">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span>CRITICAL CONTEXT STRIPPED FROM VIRAL DISPATCHES</span>
          </div>
          <p className="text-sm font-serif text-stone-800 dark:text-amber-100 leading-relaxed">
            {claim.omittedContext}
          </p>
        </div>
      )}

      {/* Source Reliability Chart */}
      <div className="mt-8 border-t border-stone-300 dark:border-stone-800 pt-6">
        <SourceReliabilityChart claim={claim} />
      </div>

      {/* Grounding Sources & Citations Table */}
      {claim.groundingSources && claim.groundingSources.length > 0 && (
        <div className="mt-8 border-t border-stone-300 dark:border-stone-800 pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-stone-800 dark:text-stone-200" />
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                Primary Citations & Archival Registry
              </h3>
            </div>
            <span className="text-xs text-stone-500 font-mono">
              Independent Verification Records
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {claim.groundingSources.map((src, index) => (
              <div
                key={index}
                className="flex flex-col justify-between border border-stone-300 dark:border-stone-800 bg-[#FAF7F2] dark:bg-[#141312] p-3.5 hover:border-stone-500 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 text-[11px] font-mono text-stone-700 dark:text-stone-300 mb-1 font-bold">
                    <span className="truncate">{src.source}</span>
                    {src.url && (
                      <ExternalLink className="h-3 w-3 shrink-0 opacity-70" />
                    )}
                  </div>
                  <h4 className="text-xs font-serif font-bold text-stone-900 dark:text-stone-100 line-clamp-2 leading-snug">
                    {src.title}
                  </h4>
                  {src.snippet && (
                    <p className="mt-1 text-[11px] font-serif text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed">
                      "{src.snippet}"
                    </p>
                  )}
                </div>
                {src.url && (
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-[11px] font-mono font-bold text-stone-900 dark:text-stone-200 hover:underline underline-offset-2"
                  >
                    Examine Statutory Record
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Community Perception Ledger */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t-2 border-stone-800 dark:border-stone-700 pt-4 text-xs font-mono text-stone-600 dark:text-stone-400">
        <div className="flex items-center gap-3">
          <span className="font-bold text-stone-800 dark:text-stone-200 uppercase">Reader Perception Tally:</span>
          <button
            onClick={() => handleVote("believed")}
            disabled={hasVoted !== null}
            className={`flex items-center gap-1.5 border px-2.5 py-1 transition-colors cursor-pointer ${
              hasVoted === "believed"
                ? "bg-amber-100 dark:bg-amber-950 border-amber-700 text-amber-900 dark:text-amber-200 font-bold"
                : "border-stone-300 dark:border-stone-700 hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200"
            }`}
          >
            <ThumbsUp className="h-3 w-3" />
            <span>I Believed It ({claim.agreedCount || 0})</span>
          </button>
          <button
            onClick={() => handleVote("debunked")}
            disabled={hasVoted !== null}
            className={`flex items-center gap-1.5 border px-2.5 py-1 transition-colors cursor-pointer ${
              hasVoted === "debunked"
                ? "bg-emerald-100 dark:bg-emerald-950 border-emerald-700 text-emerald-900 dark:text-emerald-200 font-bold"
                : "border-stone-300 dark:border-stone-700 hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200"
            }`}
          >
            <ThumbsDown className="h-3 w-3" />
            <span>Recognized Falsehood ({claim.debunkedCount || 0})</span>
          </button>
        </div>

        {claim.tags && claim.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {claim.tags.map((t, idx) => (
              <span
                key={idx}
                className="border border-stone-300 dark:border-stone-800 bg-[#FAF7F2] dark:bg-[#141312] px-2 py-0.5 text-[10px] text-stone-600 dark:text-stone-400 font-mono"
              >
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Export Report Modal */}
      <ExportReportModal
        claim={claim}
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
};
