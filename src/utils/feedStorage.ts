import { VerifiedClaim, VerdictType } from "../types";

export interface RecentViewedClaim {
  id: string;
  claim: string;
  category: string;
  verdict: VerdictType;
  truthScore: number;
  viewedAt: string;
}

export interface FeedPreferences {
  category: string;
  verdict: string;
  sortBy: "recent" | "score" | "views";
  feedFilterMode: "all" | "recent" | "saved";
}

const STORAGE_KEYS = {
  RECENT_VIEWED: "factlive_recent_viewed_claims",
  SAVED_CLAIMS: "factlive_saved_feed_claims",
  RECENT_SEARCHES: "factlive_recent_feed_searches",
  FEED_PREFERENCES: "factlive_feed_preferences",
};

const MAX_RECENT_VIEWED = 30;
const MAX_RECENT_SEARCHES = 10;

// Helper to notify other components on the page
function notifyStorageChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("factlive_feed_storage_updated"));
  }
}

// 1. RECENTLY VIEWED / USED CLAIMS
export function getRecentViewedClaims(): RecentViewedClaim[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RECENT_VIEWED);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn("Failed to load recent viewed claims from localStorage:", e);
    return [];
  }
}

export function recordFeedClaimView(claim: VerifiedClaim | RecentViewedClaim): void {
  if (typeof window === "undefined" || !claim || !claim.id) return;
  try {
    const current = getRecentViewedClaims();
    const filtered = current.filter((item) => item.id !== claim.id);
    const updatedItem: RecentViewedClaim = {
      id: claim.id,
      claim: claim.claim,
      category: claim.category,
      verdict: claim.verdict,
      truthScore: claim.truthScore,
      viewedAt: new Date().toISOString(),
    };
    const nextList = [updatedItem, ...filtered].slice(0, MAX_RECENT_VIEWED);
    localStorage.setItem(STORAGE_KEYS.RECENT_VIEWED, JSON.stringify(nextList));
    notifyStorageChange();
  } catch (e) {
    console.warn("Failed to save recent viewed claim:", e);
  }
}

export function clearRecentViewedClaims(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEYS.RECENT_VIEWED);
    notifyStorageChange();
  } catch (e) {
    console.warn("Failed to clear recent viewed claims:", e);
  }
}

// 2. SAVED / BOOKMARKED FEED CLAIMS
export function getSavedClaimIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_CLAIMS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn("Failed to load saved claims:", e);
    return [];
  }
}

export function isClaimSaved(id: string): boolean {
  if (!id) return false;
  const saved = getSavedClaimIds();
  return saved.includes(id);
}

export function toggleSaveClaim(id: string): boolean {
  if (typeof window === "undefined" || !id) return false;
  try {
    const saved = getSavedClaimIds();
    let nextSaved: string[];
    let isNowSaved = false;

    if (saved.includes(id)) {
      nextSaved = saved.filter((savedId) => savedId !== id);
      isNowSaved = false;
    } else {
      nextSaved = [id, ...saved];
      isNowSaved = true;
    }

    localStorage.setItem(STORAGE_KEYS.SAVED_CLAIMS, JSON.stringify(nextSaved));
    notifyStorageChange();
    return isNowSaved;
  } catch (e) {
    console.warn("Failed to toggle save claim:", e);
    return false;
  }
}

export function clearSavedClaims(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEYS.SAVED_CLAIMS);
    notifyStorageChange();
  } catch (e) {
    console.warn("Failed to clear saved claims:", e);
  }
}

// 3. RECENT FEED SEARCHES
export function getRecentSearches(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RECENT_SEARCHES);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn("Failed to load recent searches:", e);
    return [];
  }
}

export function recordFeedSearch(query: string): void {
  if (typeof window === "undefined") return;
  const trimmed = query.trim();
  if (!trimmed || trimmed.length < 2) return;
  try {
    const current = getRecentSearches();
    const filtered = current.filter((s) => s.toLowerCase() !== trimmed.toLowerCase());
    const nextList = [trimmed, ...filtered].slice(0, MAX_RECENT_SEARCHES);
    localStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(nextList));
    notifyStorageChange();
  } catch (e) {
    console.warn("Failed to record recent search:", e);
  }
}

export function removeRecentSearch(query: string): void {
  if (typeof window === "undefined") return;
  try {
    const current = getRecentSearches();
    const filtered = current.filter((s) => s.toLowerCase() !== query.trim().toLowerCase());
    localStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(filtered));
    notifyStorageChange();
  } catch (e) {
    console.warn("Failed to remove recent search:", e);
  }
}

export function clearRecentSearches(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEYS.RECENT_SEARCHES);
    notifyStorageChange();
  } catch (e) {
    console.warn("Failed to clear recent searches:", e);
  }
}

// 4. FEED PREFERENCES (Category, Verdict, Sort, View mode)
const DEFAULT_PREFERENCES: FeedPreferences = {
  category: "All Desks",
  verdict: "all",
  sortBy: "recent",
  feedFilterMode: "all",
};

export function getFeedPreferences(): FeedPreferences {
  if (typeof window === "undefined") return DEFAULT_PREFERENCES;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FEED_PREFERENCES);
    if (!raw) return DEFAULT_PREFERENCES;
    const parsed = JSON.parse(raw);
    return {
      category: typeof parsed.category === "string" ? parsed.category : DEFAULT_PREFERENCES.category,
      verdict: typeof parsed.verdict === "string" ? parsed.verdict : DEFAULT_PREFERENCES.verdict,
      sortBy: ["recent", "score", "views"].includes(parsed.sortBy) ? parsed.sortBy : DEFAULT_PREFERENCES.sortBy,
      feedFilterMode: ["all", "recent", "saved"].includes(parsed.feedFilterMode) ? parsed.feedFilterMode : DEFAULT_PREFERENCES.feedFilterMode,
    };
  } catch (e) {
    console.warn("Failed to load feed preferences:", e);
    return DEFAULT_PREFERENCES;
  }
}

export function saveFeedPreferences(prefs: Partial<FeedPreferences>): void {
  if (typeof window === "undefined") return;
  try {
    const current = getFeedPreferences();
    const updated = { ...current, ...prefs };
    localStorage.setItem(STORAGE_KEYS.FEED_PREFERENCES, JSON.stringify(updated));
  } catch (e) {
    console.warn("Failed to save feed preferences:", e);
  }
}
