import React from "react";
import { Radio, ArrowRight } from "lucide-react";
import { VerifiedClaim } from "../types";

interface LiveTruthTickerProps {
  claims: VerifiedClaim[];
  onSelectClaim: (claim: VerifiedClaim) => void;
}

export const LiveTruthTicker: React.FC<LiveTruthTickerProps> = ({
  claims,
  onSelectClaim,
}) => {
  if (!claims || claims.length === 0) return null;

  return (
    <div className="w-full border-b border-stone-300 dark:border-stone-800 bg-[#F4EFE6] dark:bg-[#181715] py-2">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 sm:px-6">
        <div className="flex shrink-0 items-center gap-1.5 border border-stone-800 dark:border-stone-200 bg-stone-900 dark:bg-stone-100 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-stone-100 dark:text-stone-900 uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
          <span>WIRE DISPATCH</span>
        </div>

        <div className="flex overflow-x-auto no-scrollbar items-center gap-5 text-xs font-serif">
          {claims.slice(0, 5).map((c) => {
            const isFalse = c.verdict === "FALSE" || c.verdict === "MOSTLY_FALSE";
            const isTrue = c.verdict === "VERIFIED_TRUE" || c.verdict === "MOSTLY_TRUE";
            return (
              <button
                key={c.id}
                onClick={() => onSelectClaim(c)}
                className="group flex shrink-0 items-center gap-2 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white transition-colors cursor-pointer text-left"
              >
                <span
                  className={`inline-block h-2 w-2 rounded-full ${
                    isFalse
                      ? "bg-rose-700 dark:bg-rose-500"
                      : isTrue
                      ? "bg-emerald-700 dark:bg-emerald-500"
                      : "bg-amber-600 dark:bg-amber-400"
                  }`}
                />
                <span className="font-semibold text-stone-900 dark:text-stone-100 group-hover:underline max-w-[280px] sm:max-w-md truncate">
                  "{c.claim}"
                </span>
                <span className="border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-900 px-1.5 py-0.2 font-mono text-[10px] text-stone-600 dark:text-stone-400 uppercase">
                  {c.verdict.replace("_", " ")}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
