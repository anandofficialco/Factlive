import React from "react";
import { VerdictType } from "../types";
import { getVerdictConfig } from "./VerdictBadge";

interface TruthMeterProps {
  score: number; // 0 - 100
  verdict: VerdictType;
  confidenceScore: number;
}

export const TruthMeter: React.FC<TruthMeterProps> = ({
  score,
  verdict,
  confidenceScore,
}) => {
  const config = getVerdictConfig(verdict);
  const clampedScore = Math.min(100, Math.max(0, score));

  return (
    <div className="rounded-none border border-stone-300 dark:border-stone-800 bg-[#FAF7F2] dark:bg-[#181715] p-4 shadow-sm">
      <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-stone-700 dark:text-stone-300 font-bold">
            TRUTH BAROMETER
          </span>
          <span className="border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-900 px-1.5 py-0.5 text-[9px] font-mono uppercase text-stone-600 dark:text-stone-400">
            AUDITED INDEX
          </span>
        </div>
        <div className="text-right flex items-baseline gap-1">
          <span className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100">
            {clampedScore}
          </span>
          <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">/ 100</span>
        </div>
      </div>

      {/* Main Gauge Progress */}
      <div className="space-y-1.5">
        <div className="relative h-3.5 w-full overflow-hidden bg-stone-200 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 p-[1px]">
          <div
            className={`h-full transition-all duration-700 ease-out ${config.barColor}`}
            style={{ width: `${clampedScore}%` }}
          />
        </div>

        {/* Scale indicators with ticks */}
        <div className="flex justify-between text-[10px] font-mono text-stone-500 dark:text-stone-400 border-t border-dotted border-stone-300 dark:border-stone-800 pt-1">
          <span className="text-rose-700 dark:text-rose-400 font-semibold">0% False</span>
          <span className="text-amber-700 dark:text-amber-400 font-semibold">50% Mixed Context</span>
          <span className="text-emerald-700 dark:text-emerald-400 font-semibold">100% Verified</span>
        </div>
      </div>

      {/* Confidence footer */}
      <div className="mt-3 pt-2.5 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs text-stone-600 dark:text-stone-400 font-mono">
        <span className="text-[11px]">Evidentiary Confidence:</span>
        <span className="font-bold text-stone-800 dark:text-stone-200">
          {confidenceScore}% Reliability
        </span>
      </div>
    </div>
  );
};
