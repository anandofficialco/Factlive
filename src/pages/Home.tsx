import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { LiveTruthTicker } from "../components/LiveTruthTicker";
import { FactVerifierEngine } from "../components/FactVerifierEngine";
import { LiveRadarFeed } from "../components/LiveRadarFeed";
import { ClaimMatrixCompare } from "../components/ClaimMatrixCompare";
import { MethodologyModal } from "../components/MethodologyModal";
import { SubmitClaimModal } from "../components/SubmitClaimModal";
import { VerificationCard } from "../components/VerificationCard";
import { VerifiedClaim } from "../types";
import { recordFeedClaimView } from "../utils/feedStorage";
import {
  ShieldCheck,
  Zap,
  TrendingDown,
  CheckCircle2,
  X,
  Radio,
  FileCheck2,
  BookOpen,
} from "lucide-react";

export function Home() {
  const [activeTab, setActiveTab] = useState<"verify" | "feed" | "compare">("verify");
  const [claims, setClaims] = useState<VerifiedClaim[]>([]);
  const [activeClaim, setActiveClaim] = useState<VerifiedClaim | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);
  const [modalInspectClaim, setModalInspectClaim] = useState<VerifiedClaim | null>(null);

  // Load claims on mount
  useEffect(() => {
    fetchClaims();

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalInspectClaim(null);
        setIsSubmitModalOpen(false);
        setIsMethodologyOpen(false);
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  const fetchClaims = async () => {
    try {
      const res = await fetch("/api/claims");
      const data = await res.json();
      if (data.success && Array.isArray(data.claims)) {
        setClaims(data.claims);
        // Set the first verified claim as default dossier if none selected
        if (!activeClaim && data.claims.length > 0) {
          setActiveClaim(data.claims[0]);
        }
      }
    } catch (e) {
      console.error("Failed to fetch claims:", e);
    }
  };

  const handleClaimVerified = (newClaim: VerifiedClaim) => {
    recordFeedClaimView(newClaim);
    setClaims((prev) => [newClaim, ...prev.filter((c) => c.id !== newClaim.id)]);
    setActiveClaim(newClaim);
    setActiveTab("verify");
  };

  const handleSelectClaimFromFeed = (claim: VerifiedClaim) => {
    recordFeedClaimView(claim);
    setActiveClaim(claim);
    setModalInspectClaim(claim);
  };

  const handleVote = async (id: string, type: "believed" | "debunked") => {
    try {
      const res = await fetch(`/api/claims/${id}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voteType: type }),
      });
      const data = await res.json();
      if (data.success) {
        setClaims((prev) =>
          prev.map((c) =>
            c.id === id
              ? {
                  ...c,
                  agreedCount: data.agreedCount,
                  debunkedCount: data.debunkedCount,
                  viewsCount: data.viewsCount,
                }
              : c
          )
        );
        if (activeClaim && activeClaim.id === id) {
          setActiveClaim((prev) =>
            prev
              ? {
                  ...prev,
                  agreedCount: data.agreedCount,
                  debunkedCount: data.debunkedCount,
                  viewsCount: data.viewsCount,
                }
              : null
          );
        }
      }
    } catch (err) {
      console.error("Failed to vote:", err);
    }
  };

  // Quick stats
  const totalClaims = claims.length;
  const debunkedCount = claims.filter(
    (c) => c.verdict === "FALSE" || c.verdict === "MOSTLY_FALSE"
  ).length;
  const verifiedTrueCount = claims.filter(
    (c) => c.verdict === "VERIFIED_TRUE" || c.verdict === "MOSTLY_TRUE"
  ).length;

  return (
    <div className="flex min-h-screen flex-col bg-[#FBF9F5] dark:bg-[#121110] text-[#1C1917] dark:text-[#F5F2EB] font-serif transition-colors">
      {/* Editorial Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
        onOpenMethodology={() => setIsMethodologyOpen(true)}
        totalVerifiedCount={totalClaims}
      />

      {/* Wire Service Live Ticker */}
      <LiveTruthTicker
        claims={claims}
        onSelectClaim={(c) => {
          recordFeedClaimView(c);
          setActiveClaim(c);
          setActiveTab("verify");
        }}
      />

      {/* Main Content Broadsheet Area */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 space-y-10">
        {/* Editorial Ledger Metric Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 border-y-2 border-stone-800 dark:border-stone-700 py-3 bg-[#FAF7F2] dark:bg-[#181715]">
          <div className="p-3 border-r border-stone-300 dark:border-stone-800 last:border-r-0">
            <div className="flex items-center justify-between text-xs font-mono text-stone-600 dark:text-stone-400 mb-1">
              <span className="uppercase tracking-wider font-bold">Audited Dossiers</span>
              <FileCheck2 className="h-3.5 w-3.5 text-stone-700 dark:text-stone-300" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 dark:text-stone-100">
              {totalClaims}+
            </div>
            <span className="text-[10px] font-mono text-stone-500">Live indexed registry</span>
          </div>

          <div className="p-3 border-r border-stone-300 dark:border-stone-800 last:border-r-0">
            <div className="flex items-center justify-between text-xs font-mono text-stone-600 dark:text-stone-400 mb-1">
              <span className="uppercase tracking-wider font-bold">Debunked Rumors</span>
              <TrendingDown className="h-3.5 w-3.5 text-rose-700 dark:text-rose-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-serif text-rose-800 dark:text-rose-400">
              {debunkedCount}
            </div>
            <span className="text-[10px] font-mono text-stone-500">Documented fabrications</span>
          </div>

          <div className="p-3 border-r border-stone-300 dark:border-stone-800 last:border-r-0">
            <div className="flex items-center justify-between text-xs font-mono text-stone-600 dark:text-stone-400 mb-1">
              <span className="uppercase tracking-wider font-bold">Verified Facts</span>
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700 dark:text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-serif text-emerald-800 dark:text-emerald-400">
              {verifiedTrueCount}
            </div>
            <span className="text-[10px] font-mono text-stone-500">Primary proof established</span>
          </div>

          <div className="p-3">
            <div className="flex items-center justify-between text-xs font-mono text-stone-600 dark:text-stone-400 mb-1">
              <span className="uppercase tracking-wider font-bold">Evidentiary Velocity</span>
              <Zap className="h-3.5 w-3.5 text-amber-700 dark:text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-serif text-amber-800 dark:text-amber-400">
              &lt; 2.2s
            </div>
            <span className="text-[10px] font-mono text-stone-500">Real-time source audit</span>
          </div>
        </div>

        {/* Tab View Switching */}
        {activeTab === "verify" && (
          <FactVerifierEngine
            currentClaim={activeClaim}
            setCurrentClaim={setActiveClaim}
            onClaimVerified={handleClaimVerified}
            onVote={handleVote}
          />
        )}

        {activeTab === "feed" && (
          <LiveRadarFeed
            claims={claims}
            onSelectClaim={handleSelectClaimFromFeed}
            onOpenSubmit={() => setIsSubmitModalOpen(true)}
          />
        )}

        {activeTab === "compare" && <ClaimMatrixCompare />}
      </main>

      {/* Editorial Footer */}
      <Footer
        onOpenMethodology={() => setIsMethodologyOpen(true)}
        onOpenSubmit={() => setIsSubmitModalOpen(true)}
        onSelectTab={setActiveTab}
      />

      {/* Submit Claim Modal */}
      <SubmitClaimModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmitSuccess={handleClaimVerified}
      />

      {/* Standards & Methodology Modal */}
      <MethodologyModal
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
      />

      {/* Inspection Modal for claims selected from feed */}
      {modalInspectClaim && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm overflow-y-auto"
          onClick={() => setModalInspectClaim(null)}
        >
          <div
            className="relative w-full max-w-4xl my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalInspectClaim(null)}
              className="absolute -top-3 -right-3 z-10 border border-stone-800 bg-stone-900 text-stone-100 p-2 hover:bg-stone-800 transition-colors shadow-lg cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
            <VerificationCard
              claim={modalInspectClaim}
              onVote={handleVote}
            />
          </div>
        </div>
      )}
    </div>
  );
}
