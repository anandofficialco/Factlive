import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Radio,
  Scale,
  Info,
  PlusCircle,
  CheckCircle2,
  Compass,
  BookOpen,
  BarChart3,
  Feather,
  Sun,
  Moon,
  Search,
  Bookmark,
  Globe,
  LayoutGrid,
  Newspaper,
} from "lucide-react";
import { useTheme } from "../utils/theme";
import { FactLiveLogo } from "./FactLiveLogo";
import { DeviceToggle } from "./DeviceToggle";

interface HeaderProps {
  activeTab?: "verify" | "feed" | "compare";
  setActiveTab?: (tab: "verify" | "feed" | "compare") => void;
  onOpenSubmitModal: () => void;
  onOpenMethodology: () => void;
  totalVerifiedCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab = "verify",
  setActiveTab,
  onOpenSubmitModal,
  onOpenMethodology,
  totalVerifiedCount = 142,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const { theme, toggleTheme, setTheme } = useTheme();

  const handleHomeTabClick = (tab: "verify" | "feed" | "compare") => {
    if (pathname !== "/") {
      navigate("/");
    }
    if (setActiveTab) {
      setActiveTab(tab);
    }
  };

  const currentDateStr = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FBF9F5] dark:bg-[#121110] border-b-2 border-stone-800 dark:border-stone-700 transition-colors">
      {/* Topmost Broadsheet Dateline & Edition Banner */}
      <div className="border-b border-stone-300 dark:border-stone-800 bg-[#F4EFE6] dark:bg-[#181715] py-1 px-4 sm:px-6 text-[11px] font-mono text-stone-600 dark:text-stone-400">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold uppercase tracking-wider text-stone-900 dark:text-stone-200">
              The FactLive Dispatch
            </span>
            <span className="hidden sm:inline text-stone-400 dark:text-stone-600">•</span>
            <span className="hidden sm:inline font-semibold text-stone-800 dark:text-stone-200">
              {theme === "dark"
                ? "Editorial Aesthetic Night Edition"
                : "Editorial Aesthetic Light Edition"}
            </span>
            <span className="hidden md:inline text-stone-400 dark:text-stone-600">•</span>
            <span className="hidden md:inline">Global Evidence & Truth Telemetry</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="hidden sm:inline font-medium">{currentDateStr}</span>
            <span className="hidden md:inline text-stone-400 dark:text-stone-600">•</span>
            <div className="hidden lg:flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-bold text-stone-500">View:</span>
              <DeviceToggle size="sm" showLabels={true} />
            </div>
            <span className="text-stone-400 dark:text-stone-600">•</span>
            <span className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-400 font-semibold">
              <span className="h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
              <span>{totalVerifiedCount} AUDITED DOSSIERS</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Masthead Banner */}
      <div className="mx-auto max-w-7xl px-4 py-3.5 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          {/* Masthead Title / Crest */}
          <Link
            to="/"
            onClick={() => setActiveTab && setActiveTab("verify")}
            className="flex items-center gap-3.5 text-left group"
            id="brand-logo-btn"
          >
            <div className="transition-transform group-hover:scale-105 shrink-0">
              <FactLiveLogo size={46} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-stone-900 dark:text-stone-100">
                  FACTLIVE
                </span>
                <span className="border border-stone-800 dark:border-stone-300 bg-[#F4EFE6] dark:bg-[#22201D] px-1.5 py-0.2 text-[9px] font-mono font-bold tracking-widest text-stone-900 dark:text-stone-100 uppercase">
                  .IN
                </span>
                <span className="hidden sm:inline border border-stone-400 dark:border-stone-700 px-1.5 py-0.2 text-[9px] font-mono font-bold text-stone-600 dark:text-stone-400 uppercase">
                  www.factlive.in
                </span>
              </div>
              <p className="text-[11px] font-serif italic text-stone-600 dark:text-stone-400 -mt-0.5">
                Veritas sine studio et ira — Empirical Truth Grounded in Evidence
              </p>
            </div>
          </Link>

          {/* Quick Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Phone / Tab / PC Viewport Toggle */}
            <div className="flex items-center">
              <DeviceToggle size="md" showLabels={true} />
            </div>

            {/* Two-Theme Toggle Navigation: Editorial Aesthetic Light & Dark */}
            <div
              id="editorial-theme-toggle-nav"
              className="inline-flex items-center border-2 border-stone-900 dark:border-stone-500 bg-[#F4EFE6] dark:bg-[#1A1817] p-0.5 rounded-none shadow-xs transition-colors"
              role="group"
              aria-label="Editorial Aesthetic Theme Navigation"
            >
              <button
                type="button"
                id="btn-theme-editorial-light"
                onClick={() => setTheme("paper")}
                aria-pressed={theme !== "dark"}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-serif font-bold transition-all cursor-pointer select-none ${
                  theme !== "dark"
                    ? "bg-stone-900 text-[#FAF7F2] dark:bg-[#FAF7F2] dark:text-stone-950 shadow-xs"
                    : "text-stone-700 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100"
                }`}
                title="Editorial Aesthetic Light (Broadsheet Paper Edition)"
              >
                <Sun className={`h-3.5 w-3.5 transition-transform ${theme !== "dark" ? "text-amber-400 dark:text-amber-600 scale-110" : "text-stone-500"}`} />
                <span className="hidden sm:inline">Editorial Light</span>
                <span className="sm:hidden">Light</span>
              </button>

              <button
                type="button"
                id="btn-theme-editorial-dark"
                onClick={() => setTheme("dark")}
                aria-pressed={theme === "dark"}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-serif font-bold transition-all cursor-pointer select-none ${
                  theme === "dark"
                    ? "bg-stone-900 text-amber-300 border border-amber-400/40 dark:bg-stone-100 dark:text-stone-950 dark:border-transparent shadow-xs"
                    : "text-stone-700 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100"
                }`}
                title="Editorial Aesthetic Dark (Night Edition)"
              >
                <Moon className={`h-3.5 w-3.5 transition-transform ${theme === "dark" ? "text-amber-300 dark:text-amber-600 scale-110" : "text-stone-500"}`} />
                <span className="hidden sm:inline">Editorial Dark</span>
                <span className="sm:hidden">Dark</span>
              </button>
            </div>

            {/* Standards & Code of Principles */}
            <button
              id="btn-methodology"
              onClick={onOpenMethodology}
              className="hidden sm:inline-flex items-center gap-1.5 border border-stone-300 dark:border-stone-700 bg-[#FAF7F2] dark:bg-[#1A1817] px-3 py-1.5 text-xs font-serif font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer"
              title="IFCN Standards & Verification Methodology"
            >
              <Info className="h-3.5 w-3.5 text-stone-600 dark:text-stone-400" />
              <span>Standards</span>
            </button>

            {/* Submit Claim Action */}
            <button
              id="btn-submit-claim"
              onClick={onOpenSubmitModal}
              className="inline-flex items-center gap-1.5 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-stone-100 dark:text-stone-900 border border-stone-900 dark:border-stone-100 px-3.5 py-1.5 text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-sm cursor-pointer"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span>Submit Rumor</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Newspaper Navigation Row */}
      <nav className="border-t border-b border-stone-300 dark:border-stone-800 bg-[#FAF7F2] dark:bg-[#161514]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 overflow-x-auto no-scrollbar">
          <div className="flex items-center font-serif text-sm">
            <button
              id="nav-verify-tab"
              onClick={() => handleHomeTabClick("verify")}
              className={`px-4 py-2 font-medium tracking-tight border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                pathname === "/" && activeTab === "verify"
                  ? "border-stone-900 dark:border-stone-100 font-bold text-stone-900 dark:text-stone-100 bg-[#F4EFE6] dark:bg-[#1F1D1B]"
                  : "border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
              }`}
            >
              Fact Verifier
            </button>

            <button
              id="nav-feed-tab"
              onClick={() => handleHomeTabClick("feed")}
              className={`px-4 py-2 font-medium tracking-tight border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                pathname === "/" && activeTab === "feed"
                  ? "border-stone-900 dark:border-stone-100 font-bold text-stone-900 dark:text-stone-100 bg-[#F4EFE6] dark:bg-[#1F1D1B]"
                  : "border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
              }`}
            >
              The Wire Radar
            </button>

            <button
              id="nav-compare-tab"
              onClick={() => handleHomeTabClick("compare")}
              className={`px-4 py-2 font-medium tracking-tight border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                pathname === "/" && activeTab === "compare"
                  ? "border-stone-900 dark:border-stone-100 font-bold text-stone-900 dark:text-stone-100 bg-[#F4EFE6] dark:bg-[#1F1D1B]"
                  : "border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
              }`}
            >
              Truth Matrix
            </button>

            <span className="text-stone-300 dark:text-stone-700 mx-1">|</span>

            <Link
              to="/deep-research"
              id="nav-deep-research"
              className={`px-4 py-2 font-medium tracking-tight border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                pathname === "/deep-research"
                  ? "border-stone-900 dark:border-stone-100 font-bold text-stone-900 dark:text-stone-100 bg-[#F4EFE6] dark:bg-[#1F1D1B]"
                  : "border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
              }`}
            >
              Deep Research
            </Link>

            <Link
              to="/publications"
              id="nav-publications"
              className={`px-4 py-2 font-medium tracking-tight border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                pathname === "/publications"
                  ? "border-stone-900 dark:border-stone-100 font-bold text-stone-900 dark:text-stone-100 bg-[#F4EFE6] dark:bg-[#1F1D1B]"
                  : "border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
              }`}
            >
              Publications
            </Link>

            <Link
              to="/reports"
              id="nav-reports"
              className={`px-4 py-2 font-medium tracking-tight border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                pathname === "/reports"
                  ? "border-stone-900 dark:border-stone-100 font-bold text-stone-900 dark:text-stone-100 bg-[#F4EFE6] dark:bg-[#1F1D1B]"
                  : "border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
              }`}
            >
              Intelligence Reports
            </Link>

            <Link
              to="/blog"
              id="nav-blog"
              className={`px-4 py-2 font-medium tracking-tight border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                pathname === "/blog"
                  ? "border-stone-900 dark:border-stone-100 font-bold text-stone-900 dark:text-stone-100 bg-[#F4EFE6] dark:bg-[#1F1D1B]"
                  : "border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
              }`}
            >
              Editorial Essays
            </Link>
          </div>

          <div className="hidden xl:flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-stone-400">
            <span>PRESS BUREAU • GMT+0</span>
          </div>
        </div>
      </nav>
    </header>
  );
};
