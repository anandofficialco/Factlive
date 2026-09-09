import React from "react";
import { ShieldCheck, AlertOctagon, HelpCircle, BarChart3 } from "lucide-react";
import { VerifiedClaim } from "../types";
import { computeSourceReliability } from "../utils/sourceReliability";

interface SourceReliabilityChartProps {
  claim: VerifiedClaim;
  compact?: boolean;
}

export const SourceReliabilityChart: React.FC<SourceReliabilityChartProps> = ({
  claim,
  compact = false,
}) => {
  const dist = computeSourceReliability(claim);

  return (
    <div
      id="source-reliability-chart"
      className={`border border-stone-300 dark:border-stone-800 bg-[#FAF7F2] dark:bg-[#181715] p-4 sm:p-5 ${
        compact ? "text-xs" : ""
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 dark:border-stone-800 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-stone-700 dark:text-stone-300" />
          <h4 className="text-xs sm:text-sm font-mono uppercase tracking-wider font-bold text-stone-900 dark:text-stone-100">
            Source Reliability Ledger
          </h4>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-xs">
          <span className="text-stone-500 dark:text-stone-400">Credibility Index:</span>
          <span
            className={`font-bold px-2 py-0.5 border ${
              dist.reliabilityScore >= 75
                ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-600/40"
                : dist.reliabilityScore >= 50
                ? "bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border-amber-600/40"
                : "bg-rose-50 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border-rose-600/40"
            }`}
          >
            {dist.reliabilityScore}% ({dist.verdictLabel})
          </span>
        </div>
      </div>

      {/* Stacked Distribution Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px] font-mono text-stone-600 dark:text-stone-400 mb-1">
          <span>Evaluated Citations & Origin Records: {dist.totalEvaluated}</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-800 dark:text-emerald-400 font-semibold">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-600"></span>
              {dist.reliablePct}% Verified
            </span>
            <span className="flex items-center gap-1 text-rose-800 dark:text-rose-400 font-semibold">
              <span className="inline-block h-2 w-2 rounded-full bg-rose-600"></span>
              {dist.unreliablePct}% Unreliable
            </span>
            {dist.contextualPct > 0 && (
              <span className="flex items-center gap-1 text-amber-800 dark:text-amber-400 font-semibold">
                <span className="inline-block h-2 w-2 rounded-full bg-amber-600"></span>
                {dist.contextualPct}% Context
              </span>
            )}
          </div>
        </div>

        {/* Visual Progress Track */}
        <div className="flex h-3.5 w-full overflow-hidden bg-stone-200 dark:bg-stone-800 border border-stone-300 dark:border-stone-700">
          <div
            style={{ width: `${dist.reliablePct}%` }}
            className="h-full bg-emerald-700 dark:bg-emerald-600 transition-all duration-500"
            title={`Verified & Authoritative: ${dist.reliableCount} sources (${dist.reliablePct}%)`}
          />
          <div
            style={{ width: `${dist.contextualPct}%` }}
            className="h-full bg-amber-600 dark:bg-amber-500 transition-all duration-500"
            title={`Contextual / Observational: ${dist.contextualCount} sources (${dist.contextualPct}%)`}
          />
          <div
            style={{ width: `${dist.unreliablePct}%` }}
            className="h-full bg-rose-700 dark:bg-rose-600 transition-all duration-500"
            title={`Unverified / Questionable: ${dist.unreliableCount} sources (${dist.unreliablePct}%)`}
          />
        </div>
      </div>

      {/* Granular Breakdown Cards */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <div className="border border-stone-300 dark:border-stone-800 bg-[#F5F1E8] dark:bg-[#141312] p-3">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-stone-900 dark:text-stone-100">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-700 dark:text-emerald-400" />
              <span>Primary / Verified</span>
            </div>
            <span className="font-mono text-xs font-bold text-emerald-800 dark:text-emerald-400">
              {dist.reliableCount} ({dist.reliablePct}%)
            </span>
          </div>
          <p className="text-[11px] font-serif text-stone-600 dark:text-stone-400 leading-tight">
            Peer-reviewed journals, statutory wire archives, official transcript records
          </p>
        </div>

        <div className="border border-stone-300 dark:border-stone-800 bg-[#F5F1E8] dark:bg-[#141312] p-3">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-stone-900 dark:text-stone-100">
              <AlertOctagon className="h-3.5 w-3.5 text-rose-700 dark:text-rose-400" />
              <span>Unverified / Rumor</span>
            </div>
            <span className="font-mono text-xs font-bold text-rose-800 dark:text-rose-400">
              {dist.unreliableCount} ({dist.unreliablePct}%)
            </span>
          </div>
          <p className="text-[11px] font-serif text-stone-600 dark:text-stone-400 leading-tight">
            Anonymous social posts, decontextualized clips, promotional releases
          </p>
        </div>

        <div className="border border-stone-300 dark:border-stone-800 bg-[#F5F1E8] dark:bg-[#141312] p-3">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-stone-900 dark:text-stone-100">
              <HelpCircle className="h-3.5 w-3.5 text-amber-700 dark:text-amber-400" />
              <span>Contextual Sources</span>
            </div>
            <span className="font-mono text-xs font-bold text-amber-800 dark:text-amber-400">
              {dist.contextualCount} ({dist.contextualPct}%)
            </span>
          </div>
          <p className="text-[11px] font-serif text-stone-600 dark:text-stone-400 leading-tight">
            Historical precedent, expert commentary, secondary media reports
          </p>
        </div>
      </div>
    </div>
  );
};
