import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Filter,
  Eye,
  Radio,
  ExternalLink,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  FileText,
  Bookmark,
  BookmarkCheck,
  History,
  Clock,
  Sparkles,
  Trash2,
  CheckCircle2,
  X,
  RotateCcw,
  Check,
} from "lucide-react";
import { VerifiedClaim, VerdictType } from "../types";
import { VerdictBadge } from "./VerdictBadge";
import {
  getRecentViewedClaims,
  recordFeedClaimView,
  clearRecentViewedClaims,
  getSavedClaimIds,
  toggleSaveClaim,
  clearSavedClaims,
  getRecentSearches,
  recordFeedSearch,
  removeRecentSearch,
  clearRecentSearches,
  getFeedPreferences,
  saveFeedPreferences,
  RecentViewedClaim,
} from "../utils/feedStorage";

interface LiveRadarFeedProps {
  claims: VerifiedClaim[];
  onSelectClaim: (claim: VerifiedClaim) => void;
  onOpenSubmit: () => void;
}

const CATEGORIES = [
  "All Desks",
  "Science & Space",
  "Health & Medicine",
  "History & Culture",
  "Technology & AI",
  "Sports & Law",
];

const VERDICTS: { label: string; value: string }[] = [
  { label: "All Rulings", value: "all" },
  { label: "Verified True", value: "VERIFIED_TRUE" },
  { label: "Documented Falsehood", value: "FALSE" },
  { label: "Misleading Context", value: "MISLEADING" },
  { label: "Mostly True", value: "MOSTLY_TRUE" },
];

function formatTimeAgo(isoDate: string): string {
  try {
    const diffMs = Date.now() - new Date(isoDate).getTime();
    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 60) return "Just now";
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  } catch {
    return "Recently";
  }
}

export const LiveRadarFeed: React.FC<LiveRadarFeedProps> = ({
  claims,
  onSelectClaim,
  onOpenSubmit,
}) => {
  // Initialize state from persisted feed preferences
  const initialPrefs = useMemo(() => getFeedPreferences(), []);

  const [feedFilterMode, setFeedFilterMode] = useState<"all" | "recent" | "saved">(
    initialPrefs.feedFilterMode || "all"
  );
  const [selectedCategory, setSelectedCategory] = useState(initialPrefs.category || "All Desks");
  const [selectedVerdict, setSelectedVerdict] = useState(initialPrefs.verdict || "all");
  const [sortBy, setSortBy] = useState<"recent" | "score" | "views">(initialPrefs.sortBy || "recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  // Storage states
  const [recentViewed, setRecentViewed] = useState<RecentViewedClaim[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [lastSavedNotice, setLastSavedNotice] = useState<string | null>(null);

  // Load storage data on mount and listen to global changes
  const reloadStorage = () => {
    setRecentViewed(getRecentViewedClaims());
    setSavedIds(getSavedClaimIds());
    setRecentSearches(getRecentSearches());
  };

  useEffect(() => {
    reloadStorage();

    const handleStorageUpdate = () => {
      reloadStorage();
    };

    window.addEventListener("factlive_feed_storage_updated", handleStorageUpdate);
    return () => {
      window.removeEventListener("factlive_feed_storage_updated", handleStorageUpdate);
    };
  }, []);

  // Save preferences automatically when changed
  useEffect(() => {
    saveFeedPreferences({
      category: selectedCategory,
      verdict: selectedVerdict,
      sortBy,
      feedFilterMode,
    });
  }, [selectedCategory, selectedVerdict, sortBy, feedFilterMode]);

  // Set of recently viewed claim IDs for quick lookup badge
  const recentViewedIdSet = useMemo(() => {
    return new Set(recentViewed.map((item) => item.id));
  }, [recentViewed]);

  const savedIdSet = useMemo(() => {
    return new Set(savedIds);
  }, [savedIds]);

  // Handle Search Execution
  const handleExecuteSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      recordFeedSearch(query.trim());
      setRecentSearches(getRecentSearches());
    }
    setShowSearchDropdown(false);
  };

  const handleKeyDownSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleExecuteSearch(searchQuery);
    }
  };

  const handleToggleBookmark = (e: React.MouseEvent, claimId: string, claimTitle: string) => {
    e.stopPropagation();
    const isSavedNow = toggleSaveClaim(claimId);
    setSavedIds(getSavedClaimIds());
    setLastSavedNotice(isSavedNow ? `Saved "${claimTitle.slice(0, 30)}..." to your feed ledger` : `Removed from saved`);
    setTimeout(() => setLastSavedNotice(null), 2500);
  };

  const handleSelectAndRecordClaim = (claim: VerifiedClaim) => {
    recordFeedClaimView(claim);
    setRecentViewed(getRecentViewedClaims());
    onSelectClaim(claim);
  };

  const handleClearHistory = () => {
    if (window.confirm("Clear your auto-saved feed viewing history?")) {
      clearRecentViewedClaims();
      setRecentViewed([]);
    }
  };

  const handleClearSaved = () => {
    if (window.confirm("Clear all auto-saved bookmarks from your feed ledger?")) {
      clearSavedClaims();
      setSavedIds([]);
    }
  };

  // Filter and sort claims
  const filteredClaims = useMemo(() => {
    return claims
      .filter((c) => {
        // Mode filter: All vs Recently Viewed vs Saved
        if (feedFilterMode === "recent") {
          if (!recentViewedIdSet.has(c.id)) return false;
        } else if (feedFilterMode === "saved") {
          if (!savedIdSet.has(c.id)) return false;
        }

        const matchCat =
          selectedCategory === "All Desks" ||
          c.category.toLowerCase() === selectedCategory.toLowerCase();

        const matchVer =
          selectedVerdict === "all" ||
          c.verdict.toLowerCase() === selectedVerdict.toLowerCase();

        const matchQuery =
          !searchQuery ||
          c.claim.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.executiveSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchCat && matchVer && matchQuery;
      })
      .sort((a, b) => {
        // If sorting by recent in 'recent' view mode, sort by actual user view timestamp
        if (feedFilterMode === "recent" && sortBy === "recent") {
          const aViewed = recentViewed.find((r) => r.id === a.id)?.viewedAt || a.timestamp;
          const bViewed = recentViewed.find((r) => r.id === b.id)?.viewedAt || b.timestamp;
          return new Date(bViewed).getTime() - new Date(aViewed).getTime();
        }

        if (sortBy === "recent") {
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        }
        if (sortBy === "score") {
          return b.truthScore - a.truthScore;
        }
        if (sortBy === "views") {
          return (b.viewsCount || 0) - (a.viewsCount || 0);
        }
        return 0;
      });
  }, [claims, feedFilterMode, selectedCategory, selectedVerdict, searchQuery, sortBy, recentViewedIdSet, savedIdSet, recentViewed]);

  return (
    <div className="space-y-6">
      {/* Editorial Feed Header & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b-2 border-stone-800 dark:border-stone-700 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-2 w-2 rounded-full bg-red-600 animate-ping" />
            <h2 className="text-2xl font-serif font-black tracking-tight text-stone-900 dark:text-stone-100">
              The Wire Radar & Live Dispatches
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-serif text-stone-600 dark:text-stone-400">
            <span>Chronological register of circulating rumors and public claims audited by FactLive journalists.</span>
            <span className="hidden md:inline text-stone-400">•</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 border border-emerald-300 dark:border-emerald-800">
              <Check className="h-3 w-3" />
              <span>Feed Activity Auto-Saved</span>
            </span>
          </div>
        </div>

        {/* Search Bar with Auto-Saved Search Dropdown */}
        <div className="relative">
          <div className="relative flex items-center">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-stone-500" />
            <input
              id="feed-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSearchDropdown(true)}
              onKeyDown={handleKeyDownSearch}
              placeholder="Search wire archives or rumors..."
              className="w-full sm:w-72 border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1A1817] pl-8 pr-8 py-1.5 text-xs font-serif text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-stone-800"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setShowSearchDropdown(false);
                }}
                className="absolute right-2.5 top-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
                title="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Auto-Saved Recent Searches Dropdown / Tray */}
          {showSearchDropdown && recentSearches.length > 0 && !searchQuery && (
            <div className="absolute right-0 top-full mt-1 z-30 w-full sm:w-72 border border-stone-800 dark:border-stone-700 bg-white dark:bg-[#1A1817] p-2.5 shadow-lg">
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-1.5 mb-2 text-[10px] font-mono uppercase text-stone-500 font-bold">
                <span className="flex items-center gap-1">
                  <History className="h-3 w-3" />
                  <span>Recent Searches</span>
                </span>
                <button
                  onClick={() => {
                    clearRecentSearches();
                    setRecentSearches([]);
                  }}
                  className="hover:underline hover:text-rose-600 cursor-pointer"
                >
                  Clear All
                </button>
              </div>
              <div className="space-y-1">
                {recentSearches.map((query, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-1 px-2 py-1 text-xs font-serif text-stone-800 dark:text-stone-200 hover:bg-[#FAF7F2] dark:hover:bg-[#22201D] cursor-pointer"
                    onClick={() => handleExecuteSearch(query)}
                  >
                    <span className="truncate">"{query}"</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeRecentSearch(query);
                        setRecentSearches(getRecentSearches());
                      }}
                      className="text-stone-400 hover:text-rose-600 p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Auto-Saved Notification Toast */}
      {lastSavedNotice && (
        <div className="flex items-center justify-between border border-stone-800 dark:border-stone-600 bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 px-4 py-2 text-xs font-mono shadow-md animate-fade-in">
          <div className="flex items-center gap-2">
            <BookmarkCheck className="h-4 w-4 text-amber-400 dark:text-amber-600" />
            <span>{lastSavedNotice}</span>
          </div>
          <span className="text-[10px] opacity-70">Auto-saved</span>
        </div>
      )}

      {/* Auto-Saved "Recently Used in Feed" Carousel / Quick History Bar */}
      {recentViewed.length > 0 && (
        <div className="border border-stone-300 dark:border-stone-800 bg-[#FAF7F2] dark:bg-[#161514] p-3 sm:p-4">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <History className="h-3.5 w-3.5 text-stone-700 dark:text-stone-300" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                Recently Used In Your Feed ({recentViewed.length})
              </span>
              <span className="text-[10px] font-mono text-stone-500 hidden sm:inline">
                Auto-saved reading history
              </span>
            </div>
            <button
              onClick={handleClearHistory}
              className="flex items-center gap-1 text-[11px] font-mono text-stone-500 hover:text-rose-700 dark:hover:text-rose-400 transition-colors cursor-pointer"
              title="Clear recently viewed history"
            >
              <Trash2 className="h-3 w-3" />
              <span>Clear History</span>
            </button>
          </div>

          <div className="flex gap-2.5 overflow-x-auto pb-1.5 scrollbar-thin">
            {recentViewed.slice(0, 6).map((item) => {
              const fullClaim = claims.find((c) => c.id === item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (fullClaim) {
                      handleSelectAndRecordClaim(fullClaim);
                    }
                  }}
                  className="shrink-0 w-64 sm:w-72 border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1F1D1B] p-2.5 hover:border-stone-800 dark:hover:border-stone-400 transition-all cursor-pointer group shadow-2xs"
                >
                  <div className="flex items-center justify-between gap-1 text-[10px] font-mono text-stone-500 mb-1">
                    <span className="uppercase truncate font-bold text-stone-700 dark:text-stone-300">
                      {item.category}
                    </span>
                    <span className="shrink-0">{formatTimeAgo(item.viewedAt)}</span>
                  </div>
                  <p className="text-xs font-serif font-bold text-stone-900 dark:text-stone-100 line-clamp-2 group-hover:underline">
                    "{item.claim}"
                  </p>
                  <div className="mt-2 flex items-center justify-between pt-1 border-t border-stone-100 dark:border-stone-800 text-[10px] font-mono">
                    <VerdictBadge verdict={item.verdict} size="sm" />
                    <span className="text-stone-600 dark:text-stone-400">
                      Truth: {item.truthScore}/100
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Mode Tabs: All Dispatches, Recently Viewed, Saved Dossiers */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-stone-800 dark:border-stone-700 pb-2">
        <div className="flex items-center gap-2">
          {/* All Dispatches */}
          <button
            type="button"
            id="feed-tab-all"
            onClick={() => setFeedFilterMode("all")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              feedFilterMode === "all"
                ? "bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 border border-stone-900 dark:border-stone-100 shadow-xs"
                : "bg-[#F4EFE6] dark:bg-[#1A1817] text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-700"
            }`}
          >
            <Radio className="h-3.5 w-3.5" />
            <span>All Wire Dispatches</span>
            <span className="ml-1 px-1.5 py-0.2 text-[10px] bg-stone-700 text-stone-200 dark:bg-stone-300 dark:text-stone-900">
              {claims.length}
            </span>
          </button>

          {/* Recently Used / Viewed */}
          <button
            type="button"
            id="feed-tab-recent"
            onClick={() => setFeedFilterMode("recent")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              feedFilterMode === "recent"
                ? "bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 border border-stone-900 dark:border-stone-100 shadow-xs"
                : "bg-[#F4EFE6] dark:bg-[#1A1817] text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-700"
            }`}
          >
            <History className="h-3.5 w-3.5" />
            <span>Recently Used</span>
            <span className="ml-1 px-1.5 py-0.2 text-[10px] bg-stone-700 text-stone-200 dark:bg-stone-300 dark:text-stone-900">
              {recentViewed.length}
            </span>
          </button>

          {/* Saved Dossiers */}
          <button
            type="button"
            id="feed-tab-saved"
            onClick={() => setFeedFilterMode("saved")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              feedFilterMode === "saved"
                ? "bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 border border-stone-900 dark:border-stone-100 shadow-xs"
                : "bg-[#F4EFE6] dark:bg-[#1A1817] text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-700"
            }`}
          >
            <Bookmark className={`h-3.5 w-3.5 ${savedIds.length > 0 ? "text-amber-500 fill-amber-500" : ""}`} />
            <span>Saved Dossiers</span>
            <span className="ml-1 px-1.5 py-0.2 text-[10px] bg-stone-700 text-stone-200 dark:bg-stone-300 dark:text-stone-900">
              {savedIds.length}
            </span>
          </button>
        </div>

        {/* Clear saved action if on saved view */}
        {feedFilterMode === "saved" && savedIds.length > 0 && (
          <button
            onClick={handleClearSaved}
            className="text-[11px] font-mono text-stone-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
          >
            <Trash2 className="h-3 w-3" />
            <span>Clear Saved Ledger</span>
          </button>
        )}
      </div>

      {/* Editorial Category Desks & Sort */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 dark:border-stone-800 pb-3">
        {/* Editorial Desk Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? "bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 font-bold"
                  : "bg-[#F4EFE6] dark:bg-[#181715] text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort & Verdict Controls */}
        <div className="flex items-center gap-2">
          <select
            value={selectedVerdict}
            onChange={(e) => setSelectedVerdict(e.target.value)}
            className="border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1A1817] px-2.5 py-1 text-xs font-mono text-stone-800 dark:text-stone-200 focus:outline-none cursor-pointer"
            title="Filter by official ruling verdict"
          >
            {VERDICTS.map((v) => (
              <option key={v.value} value={v.value}>
                {v.label}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1A1817] px-2.5 py-1 text-xs font-mono text-stone-800 dark:text-stone-200 focus:outline-none cursor-pointer"
            title="Sort wire claims"
          >
            <option value="recent">
              {feedFilterMode === "recent" ? "Recently Viewed First" : "Latest Dispatches"}
            </option>
            <option value="score">Truth Index Score</option>
            <option value="views">Most Circulated</option>
          </select>
        </div>
      </div>

      {/* Claims List */}
      {filteredClaims.length === 0 ? (
        <div className="border border-dashed border-stone-400 dark:border-stone-700 bg-[#FAF7F2] dark:bg-[#181715] p-12 text-center space-y-3">
          {feedFilterMode === "saved" ? (
            <>
              <Bookmark className="mx-auto h-8 w-8 text-stone-400" />
              <h3 className="text-base font-serif font-bold text-stone-800 dark:text-stone-200">
                No saved claims in your personal ledger
              </h3>
              <p className="text-xs font-serif text-stone-500 max-w-sm mx-auto">
                Click the bookmark star icon on any wire dispatch to auto-save and reference it at any time.
              </p>
              <button
                onClick={() => setFeedFilterMode("all")}
                className="mt-2 inline-flex items-center gap-1.5 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Browse All Dispatches
              </button>
            </>
          ) : feedFilterMode === "recent" ? (
            <>
              <History className="mx-auto h-8 w-8 text-stone-400" />
              <h3 className="text-base font-serif font-bold text-stone-800 dark:text-stone-200">
                No recently viewed claims yet
              </h3>
              <p className="text-xs font-serif text-stone-500 max-w-sm mx-auto">
                Claims and rumors you examine in the feed or submit for inquest are automatically saved here.
              </p>
              <button
                onClick={() => setFeedFilterMode("all")}
                className="mt-2 inline-flex items-center gap-1.5 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Explore Live Wire
              </button>
            </>
          ) : (
            <>
              <Radio className="mx-auto h-8 w-8 text-stone-400" />
              <h3 className="text-base font-serif font-bold text-stone-800 dark:text-stone-200">
                No claims matched your search parameters
              </h3>
              <p className="text-xs font-serif text-stone-500 max-w-sm mx-auto">
                Submit this claim directly to the FactLive editorial newsroom for empirical inquest.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All Desks");
                    setSelectedVerdict("all");
                  }}
                  className="inline-flex items-center gap-1.5 border border-stone-400 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3" />
                  Reset Filters
                </button>
                <button
                  onClick={onOpenSubmit}
                  className="inline-flex items-center gap-1.5 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Submit for Investigation
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredClaims.map((claim) => {
            const isSaved = savedIdSet.has(claim.id);
            const isRecentlyRead = recentViewedIdSet.has(claim.id);

            return (
              <article
                key={claim.id}
                onClick={() => handleSelectAndRecordClaim(claim)}
                className="group relative cursor-pointer border border-stone-300 dark:border-stone-800 bg-white dark:bg-[#1A1817] p-5 sm:p-6 hover:border-stone-800 dark:hover:border-stone-400 transition-all shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3 border-b border-stone-200 dark:border-stone-800 pb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <VerdictBadge verdict={claim.verdict} size="sm" />
                    <span className="border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-900 px-2 py-0.5 text-[10px] font-mono font-semibold text-stone-700 dark:text-stone-300 uppercase">
                      {claim.category}
                    </span>
                    <span className="text-[11px] text-stone-600 dark:text-stone-400 font-mono">
                      Truth: <strong>{claim.truthScore}/100</strong>
                    </span>

                    {/* Recently Viewed Badge */}
                    {isRecentlyRead && (
                      <span className="inline-flex items-center gap-1 border border-stone-300 dark:border-stone-700 bg-[#FAF7F2] dark:bg-[#141312] px-2 py-0.5 text-[10px] font-mono text-stone-600 dark:text-stone-400">
                        <History className="h-2.5 w-2.5" />
                        <span>Recently Read</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {(claim.viewsCount || 0).toLocaleString()} readers
                    </span>
                    <span>•</span>
                    <span>
                      {new Date(claim.timestamp).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>

                    {/* Bookmark Toggle Button */}
                    <button
                      type="button"
                      id={`bookmark-claim-${claim.id}`}
                      onClick={(e) => handleToggleBookmark(e, claim.id, claim.claim)}
                      className={`p-1.5 border transition-colors cursor-pointer ${
                        isSaved
                          ? "border-amber-600 bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400"
                          : "border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
                      }`}
                      title={isSaved ? "Saved to your feed ledger (Click to unsave)" : "Auto-save to your feed ledger"}
                    >
                      <Bookmark className={`h-3.5 w-3.5 ${isSaved ? "fill-amber-500 text-amber-600" : ""}`} />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 dark:text-stone-100 group-hover:underline leading-snug">
                  "{claim.claim}"
                </h3>

                <p className="mt-2 text-sm font-serif text-stone-700 dark:text-stone-300 line-clamp-2 leading-relaxed">
                  {claim.executiveSummary}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-stone-200 dark:border-stone-800 pt-2.5 text-xs text-stone-500 font-mono">
                  <span className="truncate max-w-xs sm:max-w-md">
                    Sources: {claim.groundingSources?.map((s) => s.source).join(", ") || "Statutory Wire"}
                  </span>
                  <span className="flex items-center gap-1 text-stone-900 dark:text-stone-100 font-bold uppercase tracking-wider text-[11px] group-hover:translate-x-1 transition-transform">
                    Read Dossier <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
