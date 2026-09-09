import React, { useState } from "react";
import { X, Send, Loader2, CheckCircle2, AlertCircle, FileText, Feather } from "lucide-react";
import { VerifiedClaim } from "../types";
import { FactLiveLogo } from "./FactLiveLogo";

interface SubmitClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: (claim: VerifiedClaim) => void;
}

export const SubmitClaimModal: React.FC<SubmitClaimModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  const [claimText, setClaimText] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [category, setCategory] = useState("General News");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimText.trim()) {
      setError("Please describe the claim you would like verified.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/fact-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          claim: claimText.trim(),
          context: sourceUrl ? `Source link / platform: ${sourceUrl}` : undefined,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to submit claim for verification.");
      }

      if (onSubmitSuccess) {
        onSubmitSuccess(data.result);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to process claim submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg border-2 border-stone-800 dark:border-stone-700 bg-[#FAF7F2] dark:bg-[#181715] p-6 sm:p-7 text-[#1C1917] dark:text-[#F5F2EB] shadow-2xl font-serif space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 border border-stone-800 bg-stone-900 text-stone-100 p-1.5 hover:bg-stone-800 transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 border-b-2 border-stone-800 dark:border-stone-700 pb-3">
          <div className="rounded-full overflow-hidden border border-stone-800 dark:border-stone-300">
            <FactLiveLogo size={36} />
          </div>
          <div>
            <h3 className="text-xl font-serif font-black text-stone-900 dark:text-stone-100">
              Submit Dispatch for Evidentiary Audit
            </h3>
            <p className="text-xs font-serif text-stone-600 dark:text-stone-400">
              Refer a public rumor, audio artifact, or statistical assertion to our research desk at www.factlive.in
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs font-serif">
          <div>
            <label className="block font-mono font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 mb-1">
              The Statement or Viral Assertion: *
            </label>
            <textarea
              rows={3}
              value={claimText}
              onChange={(e) => setClaimText(e.target.value)}
              placeholder="e.g. 'Viral video claims drinking boiled garlic water cures 100% of lung viruses.'"
              className="w-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#141312] p-3 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-stone-900"
              required
            />
          </div>

          <div>
            <label className="block font-mono font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 mb-1">
              Source Link / Origin Platform: (Optional)
            </label>
            <input
              type="text"
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              placeholder="e.g. https://x.com/... or Broadcast Transcript"
              className="w-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#141312] p-2.5 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-stone-900"
            />
          </div>

          <div>
            <label className="block font-mono font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 mb-1">
              Reporting Desk / Subject Beat:
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#141312] p-2.5 text-xs text-stone-900 dark:text-stone-100 focus:outline-none font-mono"
            >
              <option value="General News">General News</option>
              <option value="Health & Medicine">Health & Medicine</option>
              <option value="Science & Space">Science & Space</option>
              <option value="Technology & AI">Technology & AI</option>
              <option value="History & Culture">History & Culture</option>
              <option value="Politics & World">Politics & World</option>
              <option value="Economy & Finance">Economy & Finance</option>
            </select>
          </div>

          {error && (
            <div className="flex items-center gap-2 border border-rose-700 bg-rose-50 dark:bg-rose-950 p-2.5 text-rose-900 dark:text-rose-200">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-300 dark:border-stone-800">
            <button
              type="button"
              onClick={onClose}
              className="border border-stone-400 dark:border-stone-700 px-4 py-2 font-mono text-xs text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !claimText.trim()}
              className="flex items-center gap-1.5 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 disabled:opacity-50 px-5 py-2 font-mono text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Auditing in Real Time...</span>
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" />
                  <span>Dispatch for Verification</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
