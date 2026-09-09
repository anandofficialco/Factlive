import React, { useState } from "react";
import {
  BookOpen,
  Search,
  Filter,
  Download,
  Copy,
  Check,
  ExternalLink,
  Award,
  Users,
  FileText,
  Calendar,
  X,
  Upload,
  Send,
  Bookmark,
  Share2,
  Feather,
} from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { MethodologyModal } from "../components/MethodologyModal";
import { SubmitClaimModal } from "../components/SubmitClaimModal";
import { Publication } from "../types";
import { CURATED_PUBLICATIONS } from "../data/publicationsData";

export const Publications: React.FC = () => {
  const [publications] = useState<Publication[]>(CURATED_PUBLICATIONS);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePaper, setActivePaper] = useState<Publication | null>(null);
  const [isSubmitPaperModalOpen, setIsSubmitPaperModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [paperSubmitted, setPaperSubmitted] = useState(false);

  // Filter publications
  const filteredPublications = publications.filter((pub) => {
    const matchesCategory =
      selectedCategory === "all" || pub.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      !searchQuery.trim() ||
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.doi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.authors.some((a) => a.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      pub.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const handleCopyCitation = (pub: Publication) => {
    const authorsStr = pub.authors.map((a) => a.name).join(", ");
    const citation = `${authorsStr} (${new Date(pub.publishedDate).getFullYear()}). ${pub.title}. FactLive Research Publications, DOI: ${pub.doi}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(citation);
    }
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  const handleDownloadPaper = (pub: Publication) => {
    const text = `# ${pub.title}
## ${pub.subtitle}

**Authors:** ${pub.authors.map((a) => `${a.name} (${a.title}, ${a.affiliation})`).join("; ")}
**DOI:** ${pub.doi} | **Published:** ${pub.publishedDate} | **Status:** ${pub.peerReviewStatus}
**Category:** ${pub.category}

---

### Abstract
${pub.abstract}

### Key Findings & Takeaways
${pub.keyTakeaways.map((k) => `- ${k}`).join("\n")}

---

${pub.contentSections
  .map(
    (sec) => `### ${sec.heading}
${sec.text}
${sec.callout ? `\n> **Key Principle:** ${sec.callout}\n` : ""}
${
  sec.dataPoints
    ? sec.dataPoints.map((dp) => `- **${dp.label}:** ${dp.value}`).join("\n")
    : ""
}
`
  )
  .join("\n\n")}

---

### Citations & References
${pub.citations.map((c, i) => `${i + 1}. ${c}`).join("\n")}
`;

    const blob = new Blob([text], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `FactLive-Paper-${pub.id}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] dark:bg-[#121110] text-[#1C1917] dark:text-[#F5F2EB] flex flex-col font-serif transition-colors">
      <Header
        activeTab="verify"
        setActiveTab={() => {}}
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
        onOpenMethodology={() => setIsMethodologyOpen(true)}
        totalVerifiedCount={142}
      />

      {/* Hero Header Masthead */}
      <section className="border-b-2 border-stone-800 dark:border-stone-700 bg-[#FAF7F2] dark:bg-[#181715] py-10 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 border border-stone-800 dark:border-stone-300 bg-[#F4EFE6] dark:bg-[#22201D] px-3.5 py-1 text-xs font-mono font-bold tracking-widest text-stone-900 dark:text-stone-100 uppercase">
                <Feather className="h-3.5 w-3.5" />
                <span>OPEN-ACCESS EVIDENTIARY REPOSITORY</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight text-stone-900 dark:text-stone-100">
                Academic Publications & Whitepapers
              </h1>
              <p className="text-base sm:text-lg font-serif text-stone-700 dark:text-stone-300 leading-relaxed">
                Peer-reviewed methodologies, preprints, and forensic algorithmic studies authored by FactLive Integrity Fellows and university research partners.
              </p>
            </div>

            <button
              onClick={() => setIsSubmitPaperModalOpen(true)}
              className="flex items-center gap-2 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-stone-100 dark:text-stone-900 border border-stone-900 dark:border-stone-100 px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer self-start md:self-auto shadow-sm"
            >
              <Upload className="h-4 w-4" />
              <span>Submit Research Manuscript</span>
            </button>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search publications by title, author, DOI, or keyword..."
                className="w-full border border-stone-400 dark:border-stone-700 bg-white dark:bg-[#1A1817] py-2.5 pl-10 pr-4 text-sm font-serif text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-stone-900"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              {[
                { id: "all", label: "All Papers" },
                { id: "ai", label: "AI & Synthetic Media" },
                { id: "health", label: "Health & Medicine" },
                { id: "science", label: "Science & Tech" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 font-bold"
                      : "bg-[#F4EFE6] dark:bg-[#141312] text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-800"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Publications List */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 py-8">
        <div className="space-y-6">
          {filteredPublications.map((pub) => (
            <article
              key={pub.id}
              className="border-2 border-stone-800 dark:border-stone-700 bg-white dark:bg-[#1A1817] p-6 sm:p-8 shadow-sm space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 dark:border-stone-800 pb-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="border border-stone-800 dark:border-stone-300 bg-stone-900 dark:bg-stone-100 px-2.5 py-0.5 font-mono text-[10px] font-bold text-stone-100 dark:text-stone-900 uppercase">
                    {pub.peerReviewStatus}
                  </span>
                  <span className="border border-stone-300 dark:border-stone-700 bg-[#FAF7F2] dark:bg-[#141312] px-2 py-0.5 font-mono text-[10px] text-stone-700 dark:text-stone-300 uppercase">
                    {pub.category}
                  </span>
                  <span className="text-stone-400">•</span>
                  <span className="font-mono text-stone-600 dark:text-stone-400">DOI: {pub.doi}</span>
                </div>
                <div className="flex items-center gap-3 text-stone-600 dark:text-stone-400 font-mono text-[11px]">
                  <span>{new Date(pub.publishedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  <span>•</span>
                  <span>{pub.readTimeMinutes} min read</span>
                </div>
              </div>

              <div>
                <h2
                  className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 hover:underline transition-colors cursor-pointer leading-tight"
                  onClick={() => setActivePaper(pub)}
                >
                  {pub.title}
                </h2>
                <p className="mt-1 text-sm font-serif italic text-stone-600 dark:text-stone-400">{pub.subtitle}</p>
              </div>

              {/* Authors Row */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-stone-700 dark:text-stone-300">
                <div className="flex items-center gap-1 font-mono text-stone-500 font-bold uppercase">
                  <Users className="h-3.5 w-3.5" />
                  <span>Authors:</span>
                </div>
                {pub.authors.map((author, idx) => (
                  <div key={idx} className="flex items-center gap-1">
                    <span className="font-semibold text-stone-900 dark:text-stone-100">{author.name}</span>
                    <span className="text-stone-500 text-[11px]">({author.affiliation})</span>
                    {idx < pub.authors.length - 1 && <span className="text-stone-400">;</span>}
                  </div>
                ))}
              </div>

              {/* Abstract Preview */}
              <p className="text-sm font-serif text-stone-800 dark:text-stone-200 line-clamp-3 leading-relaxed">
                {pub.abstract}
              </p>

              {/* Key Takeaways */}
              <div className="border border-stone-300 dark:border-stone-700 bg-[#FAF7F2] dark:bg-[#181715] p-4 space-y-1.5">
                <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                  Core Evidentiary Takeaways:
                </div>
                <ul className="space-y-1 text-xs font-serif text-stone-800 dark:text-stone-200">
                  {pub.keyTakeaways.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-stone-500 font-mono font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-200 dark:border-stone-800">
                <div className="flex flex-wrap gap-1.5">
                  {pub.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="border border-stone-300 dark:border-stone-800 bg-[#FAF7F2] dark:bg-[#141312] px-2 py-0.5 text-[10px] text-stone-600 dark:text-stone-400 font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyCitation(pub)}
                    className="flex items-center gap-1 border border-stone-300 dark:border-stone-700 bg-[#FAF7F2] dark:bg-[#141312] px-3 py-1.5 text-xs font-mono text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                  >
                    <Copy className="h-3 w-3" />
                    <span>Cite Paper</span>
                  </button>

                  <button
                    onClick={() => handleDownloadPaper(pub)}
                    className="flex items-center gap-1 border border-stone-300 dark:border-stone-700 bg-[#FAF7F2] dark:bg-[#141312] px-3 py-1.5 text-xs font-mono text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                  >
                    <Download className="h-3 w-3" />
                    <span>Download</span>
                  </button>

                  <button
                    onClick={() => setActivePaper(pub)}
                    className="flex items-center gap-1 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span>Read Full Paper</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Interactive Paper Reader Modal */}
      {activePaper && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm overflow-y-auto"
          onClick={() => setActivePaper(null)}
        >
          <div
            className="relative w-full max-w-4xl my-8 border-2 border-stone-800 dark:border-stone-700 bg-[#FAF7F2] dark:bg-[#181715] p-6 sm:p-10 text-[#1C1917] dark:text-[#F5F2EB] shadow-2xl space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePaper(null)}
              className="absolute right-4 top-4 border border-stone-800 bg-stone-900 text-stone-100 p-1.5 hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Paper Header */}
            <div className="space-y-3 border-b-2 border-stone-800 dark:border-stone-700 pb-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="border border-stone-800 dark:border-stone-300 bg-stone-900 dark:bg-stone-100 px-2.5 py-0.5 font-mono text-xs font-bold text-stone-100 dark:text-stone-900 uppercase">
                  {activePaper.peerReviewStatus}
                </span>
                <span className="border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#141312] px-2.5 py-0.5 font-mono text-xs text-stone-800 dark:text-stone-200 uppercase">
                  {activePaper.category}
                </span>
                <span className="text-stone-500 font-mono text-xs">
                  DOI: {activePaper.doi}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-stone-100 leading-tight">
                {activePaper.title}
              </h2>
              <p className="text-base text-stone-700 dark:text-stone-300 font-serif italic">{activePaper.subtitle}</p>

              {/* Authors List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-serif">
                {activePaper.authors.map((author, idx) => (
                  <div key={idx} className="border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1A1817] p-3">
                    <div className="font-bold text-stone-900 dark:text-stone-100">{author.name}</div>
                    <div className="text-[11px] text-stone-600 dark:text-stone-400 font-mono">{author.title}</div>
                    <div className="text-[11px] text-stone-500">{author.affiliation}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Abstract Box */}
            <div className="border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1A1817] p-5 space-y-2">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                Abstract & Executive Premise
              </h3>
              <p className="text-sm sm:text-base font-serif text-stone-800 dark:text-stone-200 leading-relaxed">
                {activePaper.abstract}
              </p>
            </div>

            {/* Full Content Sections */}
            <div className="space-y-6">
              {activePaper.contentSections.map((sec, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 border-b border-stone-300 dark:border-stone-700 pb-2">
                    {sec.heading}
                  </h3>
                  <p className="text-sm font-serif text-stone-800 dark:text-stone-200 leading-relaxed">{sec.text}</p>

                  {sec.callout && (
                    <blockquote className="border-l-4 border-stone-800 dark:border-stone-200 bg-stone-100 dark:bg-stone-900 p-4 font-serif italic text-xs text-stone-800 dark:text-stone-200">
                      "{sec.callout}"
                    </blockquote>
                  )}

                  {sec.dataPoints && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      {sec.dataPoints.map((dp, i) => (
                        <div
                          key={i}
                          className="border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1A1817] p-3 text-center"
                        >
                          <div className="font-mono text-[11px] text-stone-600 dark:text-stone-400 uppercase">{dp.label}</div>
                          <div className="text-lg font-bold font-serif text-stone-900 dark:text-stone-100 mt-0.5">{dp.value}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Citations & Reference List */}
            <div className="border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1A1817] p-5 space-y-3">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                References & Primary Citations
              </h3>
              <ol className="space-y-2 text-xs font-serif text-stone-700 dark:text-stone-300 list-decimal pl-4">
                {activePaper.citations.map((cite, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {cite}
                  </li>
                ))}
              </ol>
            </div>

            {/* Modal Footer Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-stone-800 dark:border-stone-700 pt-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyCitation(activePaper)}
                  className="flex items-center gap-1.5 border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1A1817] px-4 py-2 text-xs font-mono font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  {copiedCitation ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                      <span>Citation Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-stone-600 dark:text-stone-400" />
                      <span>Copy Citation (APA)</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleDownloadPaper(activePaper)}
                  className="flex items-center gap-1.5 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 px-5 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Monograph (.md)</span>
                </button>
              </div>

              <button
                onClick={() => setActivePaper(null)}
                className="border border-stone-400 dark:border-stone-700 px-4 py-2 text-xs font-mono text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 cursor-pointer"
              >
                Close Monograph
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Manuscript Modal */}
      {isSubmitPaperModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setIsSubmitPaperModalOpen(false)}
        >
          <div
            className="relative w-full max-w-xl border-2 border-stone-800 dark:border-stone-700 bg-[#FAF7F2] dark:bg-[#181715] p-6 sm:p-7 text-[#1C1917] dark:text-[#F5F2EB] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsSubmitPaperModalOpen(false)}
              className="absolute right-4 top-4 border border-stone-800 bg-stone-900 text-stone-100 p-1.5 hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 border-b-2 border-stone-800 dark:border-stone-700 pb-4 mb-4">
              <div className="flex h-10 w-10 items-center justify-center border border-stone-800 dark:border-stone-300 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900">
                <Upload className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-black text-stone-900 dark:text-stone-100">Submit Research Manuscript</h3>
                <p className="text-xs font-serif text-stone-600 dark:text-stone-400">For academic researchers, OSINT investigative units, and integrity fellows</p>
              </div>
            </div>

            {paperSubmitted ? (
              <div className="space-y-4 text-center py-6">
                <div className="mx-auto flex h-12 w-12 items-center justify-center border border-emerald-700 bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300">
                  <Check className="h-6 w-6" />
                </div>
                <h4 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100">Manuscript Registered in Archival Queue</h4>
                <p className="text-xs font-serif text-stone-700 dark:text-stone-300 max-w-sm mx-auto">
                  Thank you for submitting to FactLive Research. Our peer-review editorial board will evaluate your preprint within 5-7 business days.
                </p>
                <button
                  onClick={() => {
                    setPaperSubmitted(false);
                    setIsSubmitPaperModalOpen(false);
                  }}
                  className="bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 px-5 py-2 text-xs font-mono font-bold uppercase tracking-wider"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setPaperSubmitted(true);
                }}
                className="space-y-3.5 font-serif"
              >
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 mb-1">Paper Title</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Empirical Detection of Acoustic Deepfakes..."
                    className="w-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1A1817] p-2.5 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 mb-1">Primary Author & Affiliation</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Dr. Jane Doe (MIT)"
                      className="w-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1A1817] p-2.5 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 mb-1">Category</label>
                    <select className="w-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1A1817] p-2.5 text-xs text-stone-900 dark:text-stone-100 focus:outline-none font-mono">
                      <option>AI & Synthetic Media</option>
                      <option>Health & Medicine</option>
                      <option>Geopolitics & Law</option>
                      <option>Science & Space</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 mb-1">Abstract & Methodology Summary</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide a concise 150-250 word abstract highlighting evidentiary datasets and primary findings..."
                    className="w-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1A1817] p-2.5 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div className="border border-stone-300 dark:border-stone-800 bg-white dark:bg-[#1A1817] p-3 text-[11px] text-stone-600 dark:text-stone-400 space-y-1">
                  <div className="font-mono font-bold uppercase text-stone-800 dark:text-stone-200">Open Science & Integrity Pledge:</div>
                  <p>All FactLive publications require public reproducible datasets and non-partisan funding disclosure.</p>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSubmitPaperModalOpen(false)}
                    className="border border-stone-400 dark:border-stone-700 px-4 py-2 text-xs font-mono text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 px-5 py-2 text-xs font-mono font-bold uppercase tracking-wider cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Submit for Peer Review</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer
        onOpenMethodology={() => setIsMethodologyOpen(true)}
        onOpenSubmit={() => setIsSubmitModalOpen(true)}
      />

      <MethodologyModal
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
      />
      <SubmitClaimModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
      />
    </div>
  );
};
