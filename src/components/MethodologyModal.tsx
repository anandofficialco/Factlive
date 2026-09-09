import React from "react";
import { X, Shield, BookOpen, CheckCircle, Scale, RefreshCw, Feather } from "lucide-react";
import { FactLiveLogo } from "./FactLiveLogo";

interface MethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MethodologyModal: React.FC<MethodologyModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto border-2 border-stone-800 dark:border-stone-700 bg-[#FAF7F2] dark:bg-[#181715] p-6 sm:p-8 text-[#1C1917] dark:text-[#F5F2EB] shadow-2xl font-serif space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 border border-stone-800 bg-stone-900 text-stone-100 p-1.5 hover:bg-stone-800 transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 border-b-2 border-stone-800 dark:border-stone-700 pb-4">
          <div className="rounded-full overflow-hidden border border-stone-800 dark:border-stone-300">
            <FactLiveLogo size={36} />
          </div>
          <div>
            <h3 className="text-2xl font-serif font-black text-stone-900 dark:text-stone-100">FactLive Evidentiary Charter</h3>
            <p className="text-xs font-serif text-stone-600 dark:text-stone-400">
              Codified Standards of Independent Fact-Checking & Primary Source Auditing (www.factlive.in)
            </p>
          </div>
        </div>

        <div className="space-y-6 text-sm">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-stone-900 dark:text-stone-100 font-serif">
              <Scale className="h-4 w-4 text-stone-700 dark:text-stone-300" />
              <h4 className="text-base">1. Non-Partisanship & Equal Evidentiary Scrutiny</h4>
            </div>
            <p className="text-stone-700 dark:text-stone-300 text-xs sm:text-sm leading-relaxed pl-6">
              FactLive applies an identical empirical rubric to public statements regardless of ideological, commercial, or partisan affiliation. We do not concentrate audits on any single faction or political organization.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-stone-900 dark:text-stone-100 font-serif">
              <BookOpen className="h-4 w-4 text-stone-700 dark:text-stone-300" />
              <h4 className="text-base">2. Primary Source Transparency & Replicability</h4>
            </div>
            <p className="text-stone-700 dark:text-stone-300 text-xs sm:text-sm leading-relaxed pl-6">
              Every verification report grounds its findings directly in publicly verifiable primary sources—peer-reviewed literature, statutory registries, high-resolution audio spectrograms, and unedited video archives—allowing readers to independently replicate findings.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-stone-900 dark:text-stone-100 font-serif">
              <CheckCircle className="h-4 w-4 text-stone-700 dark:text-stone-300" />
              <h4 className="text-base">3. The FactLive Truth Scale</h4>
            </div>
            <div className="pl-6 space-y-2 text-xs border-l-2 border-stone-300 dark:border-stone-800 ml-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="font-mono text-emerald-800 dark:text-emerald-400 font-bold w-28 uppercase">VERIFIED TRUE</span>
                <span className="text-stone-700 dark:text-stone-300">Supported by conclusive primary data without material omitted context.</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="font-mono text-teal-800 dark:text-teal-400 font-bold w-28 uppercase">MOSTLY TRUE</span>
                <span className="text-stone-700 dark:text-stone-300">Accurate in all material points with minor qualifiers.</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="font-mono text-amber-800 dark:text-amber-400 font-bold w-28 uppercase">HALF TRUE</span>
                <span className="text-stone-700 dark:text-stone-300">Partially accurate but omits significant contextual realities.</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="font-mono text-orange-800 dark:text-orange-400 font-bold w-28 uppercase">MOSTLY FALSE</span>
                <span className="text-stone-700 dark:text-stone-300">Contains an element of truth but ignores critical counter-evidence.</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="font-mono text-rose-800 dark:text-rose-400 font-bold w-28 uppercase">FALSE</span>
                <span className="text-stone-700 dark:text-stone-300">The core premise is entirely refuted by verifiable empirical evidence.</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="font-mono text-purple-800 dark:text-purple-400 font-bold w-28 uppercase">MISLEADING</span>
                <span className="text-stone-700 dark:text-stone-300">Authentic materials weaponized out of chronological or geographic context.</span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-stone-900 dark:text-stone-100 font-serif">
              <RefreshCw className="h-4 w-4 text-stone-700 dark:text-stone-300" />
              <h4 className="text-base">4. Open & Transparent Corrections Ledger</h4>
            </div>
            <p className="text-stone-700 dark:text-stone-300 text-xs sm:text-sm leading-relaxed pl-6">
              When new empirical discoveries emerge altering a dossier's status, FactLive updates the entry with an explicit revision timestamp, editor's note, and context delta.
            </p>
          </div>
        </div>

        <div className="border-t-2 border-stone-800 dark:border-stone-700 pt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 px-5 py-2 text-xs font-mono font-bold uppercase tracking-wider cursor-pointer"
          >
            Acknowledge Charter
          </button>
        </div>
      </div>
    </div>
  );
};
