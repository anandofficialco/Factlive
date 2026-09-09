import React, { useState } from "react";
import {
  X,
  Download,
  Copy,
  Check,
  FileText,
  FileCode,
  Share2,
  BarChart3,
  Loader2,
  Sparkles,
} from "lucide-react";
import { VerifiedClaim } from "../types";
import { generateClaimPdf } from "../utils/exportPdf";
import {
  generateMarkdownReport,
  generatePlainTextSnippet,
  generateSocialDebunkSnippet,
  generateJsonReport,
} from "../utils/exportTextSnippets";
import { computeSourceReliability } from "../utils/sourceReliability";

interface ExportReportModalProps {
  claim: VerifiedClaim;
  isOpen: boolean;
  onClose: () => void;
}

type ExportTab = "pdf" | "markdown" | "plaintext" | "social" | "json";

export const ExportReportModal: React.FC<ExportReportModalProps> = ({
  claim,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<ExportTab>("pdf");
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const dist = computeSourceReliability(claim);

  const getSnippetContent = (): string => {
    switch (activeTab) {
      case "markdown":
        return generateMarkdownReport(claim);
      case "plaintext":
        return generatePlainTextSnippet(claim);
      case "social":
        return generateSocialDebunkSnippet(claim);
      case "json":
        return generateJsonReport(claim);
      default:
        return generateMarkdownReport(claim);
    }
  };

  const handleCopyText = async () => {
    const text = getSnippetContent();
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
        console.warn("Failed to copy snippet:", err);
      }
    }
  };

  const handleDownloadFile = (ext: "md" | "txt" | "json") => {
    const content = getSnippetContent();
    const mime = ext === "json" ? "application/json" : "text/plain";
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `FactLive-Audit-${claim.id}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const handleDownloadPdf = () => {
    setIsGeneratingPdf(true);
    try {
      setTimeout(() => {
        generateClaimPdf(claim);
        setIsGeneratingPdf(false);
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 2500);
      }, 150);
    } catch (err) {
      console.error("PDF generation failed:", err);
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl my-8 rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-7 text-slate-200 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-3 border-b border-slate-800 pb-4 mb-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-400">
            <Download className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Export Claim Analysis Report
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Download a publication-grade PDF dossier with embedded charts and findings, or copy formatted text snippets.
            </p>
          </div>
        </div>

        {/* Format Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3 mb-4">
          <button
            onClick={() => setActiveTab("pdf")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === "pdf"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-950"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            <Download className="h-3.5 w-3.5" />
            <span>Downloadable PDF Dossier</span>
          </button>

          <button
            onClick={() => setActiveTab("markdown")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === "markdown"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-950"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Formatted Markdown</span>
          </button>

          <button
            onClick={() => setActiveTab("plaintext")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === "plaintext"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-950"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Plain Text Briefing</span>
          </button>

          <button
            onClick={() => setActiveTab("social")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === "social"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-950"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>Social Debunk Snippet</span>
          </button>

          <button
            onClick={() => setActiveTab("json")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === "json"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-950"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            <FileCode className="h-3.5 w-3.5" />
            <span>Raw JSON Data</span>
          </button>
        </div>

        {/* Tab 1: PDF Download Preview */}
        {activeTab === "pdf" && (
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[11px] text-slate-300">
                    PDF Document Preview
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    Format: A4 Vector PDF
                  </span>
                </div>
                <span className="rounded border border-emerald-900/60 bg-emerald-950/40 px-2 py-0.5 text-[11px] font-mono text-emerald-400">
                  Ready for Download
                </span>
              </div>

              {/* Mini Preview Mockup */}
              <div className="space-y-3 text-xs">
                <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
                  <div className="text-[11px] font-mono text-slate-500 uppercase">Target Claim</div>
                  <p className="mt-1 font-semibold text-white sm:text-sm">"{claim.claim}"</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2 font-mono text-[11px]">
                    <span className="rounded bg-emerald-950/80 border border-emerald-700/50 px-2 py-0.5 text-emerald-300 font-bold">
                      {claim.verdict}
                    </span>
                    <span className="text-slate-400">Truth Score: {claim.truthScore}/100</span>
                    <span className="text-slate-400">Confidence: {claim.confidenceScore}%</span>
                  </div>
                </div>

                {/* Embedded Chart Preview */}
                <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
                  <div className="flex items-center justify-between mb-1 text-[11px] font-mono">
                    <span className="flex items-center gap-1 text-slate-300">
                      <BarChart3 className="h-3 w-3 text-emerald-400" />
                      Embedded Source Reliability Vector Chart
                    </span>
                    <span className="text-emerald-400 font-bold">{dist.reliabilityScore}% Credibility</span>
                  </div>
                  <div className="flex h-3 w-full overflow-hidden rounded-full bg-slate-800 my-2">
                    <div style={{ width: `${dist.reliablePct}%` }} className="bg-emerald-500" />
                    <div style={{ width: `${dist.contextualPct}%` }} className="bg-amber-500" />
                    <div style={{ width: `${dist.unreliablePct}%` }} className="bg-rose-500" />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span className="text-emerald-400">{dist.reliablePct}% Reliable</span>
                    <span className="text-amber-400">{dist.contextualPct}% Context</span>
                    <span className="text-rose-400">{dist.unreliablePct}% Unreliable</span>
                  </div>
                </div>

                {/* Document Sections Included */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px] text-slate-400">
                  <div className="flex items-center gap-1">
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span>Executive Summary</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span>Key Evidence Items</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span>Omitted Context</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span>Primary Citations</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar for PDF */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <span className="text-xs text-slate-400">
                Self-contained vector PDF generated in real-time.
              </span>
              <button
                id="btn-download-pdf-report"
                type="button"
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-950 transition-all cursor-pointer disabled:opacity-50"
              >
                {isGeneratingPdf ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Compiling PDF Document...</span>
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    <span>Download PDF Report</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Tab 2-5: Formatted Text Snippets */}
        {activeTab !== "pdf" && (
          <div className="space-y-4">
            <div className="relative">
              <div className="flex items-center justify-between bg-slate-950 px-3 py-1.5 rounded-t-xl border border-b-0 border-slate-800 text-[11px] font-mono text-slate-400">
                <span>
                  {activeTab === "markdown"
                    ? "Markdown Document (.md)"
                    : activeTab === "plaintext"
                    ? "Newsroom Plain Text Dispatch"
                    : activeTab === "social"
                    ? "Social Debunk Format"
                    : "JSON Payload (.json)"}
                </span>
                <span>{getSnippetContent().length} characters</span>
              </div>
              <textarea
                readOnly
                rows={11}
                value={getSnippetContent()}
                className="w-full rounded-b-xl border border-slate-800 bg-slate-950/90 p-3 font-mono text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-700"
              />
            </div>

            {/* Snippet Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <span className="text-xs text-slate-400">
                Use formatted snippets for publications, fact-check wire reports, or social debunking.
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyText}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span className="text-emerald-300">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy Formatted Snippet</span>
                    </>
                  )}
                </button>

                {activeTab === "markdown" && (
                  <button
                    type="button"
                    onClick={() => handleDownloadFile("md")}
                    className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-emerald-950 transition-colors cursor-pointer"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download .md</span>
                  </button>
                )}

                {activeTab === "plaintext" && (
                  <button
                    type="button"
                    onClick={() => handleDownloadFile("txt")}
                    className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-emerald-950 transition-colors cursor-pointer"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download .txt</span>
                  </button>
                )}

                {activeTab === "json" && (
                  <button
                    type="button"
                    onClick={() => handleDownloadFile("json")}
                    className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-emerald-950 transition-colors cursor-pointer"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download .json</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Download Success Confirmation Toast */}
        {downloadSuccess && (
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-950/80 border border-emerald-500/40 p-2.5 text-xs text-emerald-200 animate-in fade-in">
            <Check className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>File exported successfully to your downloads!</span>
          </div>
        )}
      </div>
    </div>
  );
};
