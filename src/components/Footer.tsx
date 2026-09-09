import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Scale, Globe, ExternalLink, Heart, Feather, LayoutGrid, Newspaper, Moon } from "lucide-react";
import { FactLiveLogo } from "./FactLiveLogo";
import { useTheme } from "../utils/theme";

interface FooterProps {
  onOpenMethodology: () => void;
  onOpenSubmit: () => void;
  onSelectTab?: (tab: "verify" | "feed" | "compare") => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenMethodology,
  onOpenSubmit,
  onSelectTab,
}) => {
  const { theme, setTheme } = useTheme();
  return (
    <footer className="w-full border-t-2 border-stone-800 dark:border-stone-700 bg-[#FAF7F2] dark:bg-[#141312] py-12 text-xs text-stone-700 dark:text-stone-300 font-serif transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1 Masthead & Ethos */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="rounded-full overflow-hidden border border-stone-800 dark:border-stone-300">
                <FactLiveLogo size={32} />
              </div>
              <span className="text-lg font-black font-serif tracking-tight text-stone-900 dark:text-stone-100">FactLive</span>
              <span className="border border-stone-800 dark:border-stone-400 bg-[#F4EFE6] dark:bg-[#22201D] px-1.5 py-0.2 font-mono text-[9px] font-bold text-stone-900 dark:text-stone-100 uppercase tracking-widest">
                .IN
              </span>
            </div>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-xs">
              FactLive (<a href="https://www.factlive.in" className="font-mono text-stone-800 dark:text-stone-200 underline font-semibold">www.factlive.in</a>) is an independent, non-partisan evidentiary verification consortium. We empower citizens, researchers, and global newsrooms to dismantle disinformation through primary-source forensic auditing.
            </p>
          </div>

          {/* Col 2 Intelligence Portals */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 border-b border-stone-300 dark:border-stone-800 pb-1">
              Desks & Portals
            </h4>
            <ul className="space-y-2 text-xs font-serif">
              <li>
                <Link to="/" className="hover:underline text-stone-800 dark:text-stone-200">
                  Instant Fact Verifier
                </Link>
              </li>
              <li>
                <Link to="/deep-research" className="hover:underline text-stone-800 dark:text-stone-200">
                  Deep Research & Synthesis
                </Link>
              </li>
              <li>
                <Link to="/publications" className="hover:underline text-stone-800 dark:text-stone-200">
                  Academic Whitepapers & Repositories
                </Link>
              </li>
              <li>
                <Link to="/reports" className="hover:underline text-stone-800 dark:text-stone-200">
                  Quarterly Threat Intelligence
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:underline text-stone-800 dark:text-stone-200">
                  The Editorial Gazette & Essays
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 Evidentiary Standards */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 border-b border-stone-300 dark:border-stone-800 pb-1">
              Standards & Integrity
            </h4>
            <ul className="space-y-2 text-xs font-serif">
              <li>
                <button
                  onClick={onOpenMethodology}
                  className="hover:underline text-stone-800 dark:text-stone-200 text-left cursor-pointer"
                >
                  IFCN Code of Principles
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenMethodology}
                  className="hover:underline text-stone-800 dark:text-stone-200 text-left cursor-pointer"
                >
                  Primary Source Transparency
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenMethodology}
                  className="hover:underline text-stone-800 dark:text-stone-200 text-left cursor-pointer"
                >
                  Non-Partisan Audit Pledge
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenMethodology}
                  className="hover:underline text-stone-800 dark:text-stone-200 text-left cursor-pointer"
                >
                  Open Corrections Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4 Community & Actions */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 border-b border-stone-300 dark:border-stone-800 pb-1">
              Reader Submissions
            </h4>
            <ul className="space-y-2 text-xs font-serif">
              <li>
                <button
                  onClick={onOpenSubmit}
                  className="hover:underline text-stone-800 dark:text-stone-200 text-left cursor-pointer"
                >
                  Submit a Rumor for Investigation
                </button>
              </li>
              {onSelectTab && (
                <>
                  <li>
                    <button
                      onClick={() => onSelectTab("verify")}
                      className="hover:underline text-stone-800 dark:text-stone-200 text-left cursor-pointer"
                    >
                      Real-Time Claim Auditor
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onSelectTab("feed")}
                      className="hover:underline text-stone-800 dark:text-stone-200 text-left cursor-pointer"
                    >
                      Global Wire Feed
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onSelectTab("compare")}
                      className="hover:underline text-stone-800 dark:text-stone-200 text-left cursor-pointer"
                    >
                      Matrix Dialectic Compare
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-stone-300 dark:border-stone-800 pt-6 text-stone-600 dark:text-stone-400 font-mono text-[11px]">
          <p>© {new Date().getFullYear()} FactLive (<a href="https://www.factlive.in" className="hover:underline font-bold text-stone-800 dark:text-stone-200">www.factlive.in</a>) & Research Foundation. All rights reserved.</p>
          
          <div className="flex flex-wrap items-center gap-4">
            {/* Footer Editorial Theme Switcher */}
            <div className="inline-flex items-center border border-stone-400 dark:border-stone-700 bg-white dark:bg-stone-900 p-0.5" role="group" aria-label="Footer Theme Selector">
              <button
                type="button"
                id="btn-footer-theme-light"
                onClick={() => setTheme("paper")}
                className={`px-2.5 py-0.5 text-[10px] font-serif font-bold cursor-pointer transition-colors ${
                  theme !== "dark" ? "bg-stone-900 text-white dark:bg-white dark:text-stone-950" : "text-stone-600 dark:text-stone-400 hover:text-stone-900"
                }`}
                title="Editorial Aesthetic Light (Broadsheet Paper)"
              >
                Editorial Light
              </button>
              <button
                type="button"
                id="btn-footer-theme-dark"
                onClick={() => setTheme("dark")}
                className={`px-2.5 py-0.5 text-[10px] font-serif font-bold cursor-pointer transition-colors ${
                  theme === "dark" ? "bg-stone-900 text-amber-300 border border-amber-400/40 dark:bg-amber-400 dark:text-stone-950" : "text-stone-600 dark:text-stone-400 hover:text-stone-900"
                }`}
                title="Editorial Aesthetic Dark (Night Edition)"
              >
                Editorial Dark
              </button>
            </div>

            <span>•</span>
            <span className="font-bold text-stone-800 dark:text-stone-200">WWW.FACTLIVE.IN</span>
            <span>•</span>
            <span>IFCN ACCREDITED</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
