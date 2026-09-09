import React, { useState } from "react";
import {
  BookOpen,
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Search,
  Sparkles,
  Send,
  Check,
  X,
  ThumbsUp,
  Tag,
  Feather,
} from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { MethodologyModal } from "../components/MethodologyModal";
import { SubmitClaimModal } from "../components/SubmitClaimModal";
import { BlogPost } from "../types";
import { CURATED_BLOG_POSTS } from "../data/blogData";

export const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>(CURATED_BLOG_POSTS);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});
  const [userLikedMap, setUserLikedMap] = useState<Record<string, boolean>>({});
  const [commentsMap, setCommentsMap] = useState<Record<string, { id: string; author: string; text: string; time: string }[]>>({
    "blog-osint-deepfakes-audio": [
      { id: "c1", author: "Dr. Arthur Vance", text: "The point regarding phase inversion on dental fricatives is spot on. We use Audacity's spectrogram view for rapid triage.", time: "2 days ago" },
      { id: "c2", author: "Maya Lin", text: "Brilliant explanation of the Liar's Dividend. We're seeing candidates claim authentic gaffes are AI fabrications every single week.", time: "Yesterday" }
    ]
  });
  const [newCommentText, setNewCommentText] = useState("");
  const [newCommentAuthor, setNewCommentAuthor] = useState("");
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      !searchQuery.trim() ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const handleLike = (postId: string) => {
    const isCurrentlyLiked = userLikedMap[postId];
    setUserLikedMap((prev) => ({ ...prev, [postId]: !isCurrentlyLiked }));
    setLikesMap((prev) => {
      const current = prev[postId] !== undefined ? prev[postId] : (posts.find((p) => p.id === postId)?.likesCount || 0);
      return { ...prev, [postId]: isCurrentlyLiked ? current - 1 : current + 1 };
    });
  };

  const handleAddComment = (postId: string) => {
    if (!newCommentText.trim()) return;
    const newComment = {
      id: `comm-${Date.now()}`,
      author: newCommentAuthor.trim() || "Independent Researcher",
      text: newCommentText.trim(),
      time: "Just now",
    };

    setCommentsMap((prev) => ({
      ...prev,
      [postId]: [newComment, ...(prev[postId] || [])],
    }));
    setNewCommentText("");
    setNewCommentAuthor("");
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
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
                <span>ESSAYS, OSINT FIELD DISPATCHES & EDITORIALS</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight text-stone-900 dark:text-stone-100">
                The FactLive Gazette & Essays
              </h1>
              <p className="text-base sm:text-lg font-serif text-stone-700 dark:text-stone-300 leading-relaxed">
                Firsthand OSINT field notes, cognitive bias forensic deconstructions, and longform investigative journalism exploring non-partisan truth in an era of automated deception.
              </p>
            </div>

            {/* Editorial Newsletter Subscription Box */}
            <div className="border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1A1817] p-4 max-w-sm w-full shadow-sm space-y-2">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                Subscribe to Weekly Gazette
              </div>
              <p className="text-xs font-serif text-stone-600 dark:text-stone-400">
                Receive our latest investigative debunks and evidentiary methodology guides.
              </p>
              {newsletterSubscribed ? (
                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold py-1">
                  <Check className="h-4 w-4" />
                  <span>Subscribed to FactLive Gazette!</span>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newsletterEmail) setNewsletterSubscribed(true);
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="editor@gazette.org"
                    className="flex-1 border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#141312] px-3 py-1.5 text-xs font-serif text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-stone-900"
                  />
                  <button
                    type="submit"
                    className="bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Search & Category Filter */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search essays by title, author, topic, or tag..."
                className="w-full border border-stone-400 dark:border-stone-700 bg-white dark:bg-[#1A1817] py-2.5 pl-10 pr-4 text-sm font-serif text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-stone-900"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              {[
                { id: "all", label: "All Essays" },
                { id: "osint", label: "OSINT Field Notes" },
                { id: "behind", label: "Behind the Debunk" },
                { id: "algorithms", label: "Algorithms & Synthetic Media" },
                { id: "editor", label: "Editor's Ledger" },
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

      {/* Main Articles Grid */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => {
            const currentLikes =
              likesMap[post.id] !== undefined ? likesMap[post.id] : post.likesCount;
            const isLiked = userLikedMap[post.id];
            const commentsCount =
              commentsMap[post.id]?.length !== undefined
                ? commentsMap[post.id].length
                : post.commentsCount;

            return (
              <article
                key={post.id}
                className="flex flex-col justify-between border-2 border-stone-800 dark:border-stone-700 bg-white dark:bg-[#1A1817] p-6 sm:p-8 hover:border-stone-600 transition-all shadow-sm space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs border-b border-stone-200 dark:border-stone-800 pb-2">
                    <span className="border border-stone-800 dark:border-stone-300 bg-stone-900 dark:bg-stone-100 px-2.5 py-0.5 font-mono text-[10px] font-bold text-stone-100 dark:text-stone-900 uppercase">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-2 font-mono text-stone-500 text-[11px]">
                      <span>{post.publishedDate}</span>
                      <span>•</span>
                      <span>{post.readTimeMinutes} min read</span>
                    </div>
                  </div>

                  <h2
                    onClick={() => setActiveArticle(post)}
                    className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 hover:underline transition-colors cursor-pointer leading-tight"
                  >
                    {post.title}
                  </h2>

                  <p className="text-sm font-serif text-stone-700 dark:text-stone-300 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Author & Actions Footer */}
                <div className="space-y-3 pt-3 border-t border-stone-200 dark:border-stone-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center border border-stone-800 dark:border-stone-300 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 font-bold text-xs font-mono">
                        {post.author.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs font-serif font-bold text-stone-900 dark:text-stone-100">{post.author.name}</div>
                        <div className="text-[10px] text-stone-500 font-mono">{post.author.role}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveArticle(post)}
                      className="flex items-center gap-1 text-xs font-mono font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 hover:underline transition-colors cursor-pointer"
                    >
                      <span>Read Essay</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Likes & Comments Counters */}
                  <div className="flex items-center justify-between text-xs text-stone-600 dark:text-stone-400 font-mono pt-1">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                          isLiked ? "text-rose-700 dark:text-rose-400 font-bold" : "hover:text-stone-900 dark:hover:text-stone-100"
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${isLiked ? "fill-rose-700 text-rose-700 dark:fill-rose-400 dark:text-rose-400" : ""}`} />
                        <span>{currentLikes}</span>
                      </button>

                      <button
                        onClick={() => setActiveArticle(post)}
                        className="flex items-center gap-1.5 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>{commentsCount}</span>
                      </button>
                    </div>

                    <div className="flex gap-1.5">
                      {post.tags.slice(0, 2).map((t, i) => (
                        <span key={i} className="text-[10px] text-stone-500">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </main>

      {/* Interactive Article Reader Modal */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm overflow-y-auto"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="relative w-full max-w-3xl my-8 border-2 border-stone-800 dark:border-stone-700 bg-[#FAF7F2] dark:bg-[#181715] p-6 sm:p-10 text-[#1C1917] dark:text-[#F5F2EB] shadow-2xl space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute right-4 top-4 border border-stone-800 bg-stone-900 text-stone-100 p-1.5 hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Article Header */}
            <div className="space-y-3 border-b-2 border-stone-800 dark:border-stone-700 pb-5">
              <div className="flex items-center gap-2 text-xs">
                <span className="border border-stone-800 dark:border-stone-300 bg-stone-900 dark:bg-stone-100 px-2.5 py-0.5 font-mono text-xs font-bold text-stone-100 dark:text-stone-900 uppercase">
                  {activeArticle.category}
                </span>
                <span className="text-stone-500 font-mono">
                  Published: {activeArticle.publishedDate}
                </span>
                <span className="text-stone-400">•</span>
                <span className="text-stone-500 font-mono">
                  {activeArticle.readTimeMinutes} min read
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-serif font-black text-stone-900 dark:text-stone-100 leading-tight">
                {activeArticle.title}
              </h1>

              {/* Author Bio Box */}
              <div className="flex items-center gap-3 border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1A1817] p-3.5">
                <div className="flex h-10 w-10 items-center justify-center border border-stone-800 bg-stone-900 text-stone-100 font-bold text-sm font-mono">
                  {activeArticle.author.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-sm text-stone-900 dark:text-stone-100">{activeArticle.author.name}</div>
                  <div className="text-xs text-stone-600 dark:text-stone-400 font-mono">{activeArticle.author.role}</div>
                  <p className="text-[11px] text-stone-500 mt-0.5">{activeArticle.author.bio}</p>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="space-y-4 text-stone-800 dark:text-stone-200 leading-relaxed text-base sm:text-lg font-serif">
              {activeArticle.content.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}

              {activeArticle.keyQuotes && activeArticle.keyQuotes.length > 0 && (
                <div className="space-y-3 pt-2">
                  {activeArticle.keyQuotes.map((quote, i) => (
                    <blockquote
                      key={i}
                      className="border-l-4 border-stone-800 dark:border-stone-200 bg-stone-100 dark:bg-stone-900 p-4 font-serif italic text-stone-900 dark:text-stone-100 text-base"
                    >
                      "{quote}"
                    </blockquote>
                  ))}
                </div>
              )}
            </div>

            {/* Interactive Engagement Row */}
            <div className="flex items-center justify-between border-y-2 border-stone-800 dark:border-stone-700 py-3">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleLike(activeArticle.id)}
                  className={`flex items-center gap-1.5 border px-3 py-1.5 text-xs font-mono font-bold transition-all cursor-pointer ${
                    userLikedMap[activeArticle.id]
                      ? "border-rose-700 bg-rose-50 dark:bg-rose-950 text-rose-900 dark:text-rose-200"
                      : "border-stone-300 dark:border-stone-700 bg-white dark:bg-[#141312] text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800"
                  }`}
                >
                  <Heart className={`h-4 w-4 ${userLikedMap[activeArticle.id] ? "fill-rose-700 text-rose-700 dark:fill-rose-400 dark:text-rose-400" : ""}`} />
                  <span>
                    {likesMap[activeArticle.id] !== undefined
                      ? likesMap[activeArticle.id]
                      : activeArticle.likesCount}{" "}
                    Endorsements
                  </span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1.5 border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#141312] px-3 py-1.5 text-xs font-mono text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800 transition-all cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                      <span>Link Copied</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="h-4 w-4" />
                      <span>Share Story</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-1">
                {activeArticle.tags.map((t, i) => (
                  <span
                    key={i}
                    className="border border-stone-300 dark:border-stone-800 bg-white dark:bg-[#141312] px-2 py-0.5 text-[10px] font-mono text-stone-600 dark:text-stone-400"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Comments / Reader Responses Section */}
            <div className="space-y-4 pt-2">
              <h3 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100">
                Reader Correspondence & Responses ({(commentsMap[activeArticle.id] || []).length})
              </h3>

              {/* Add Comment Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddComment(activeArticle.id);
                }}
                className="border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1A1817] p-4 space-y-2.5 font-serif"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={newCommentAuthor}
                    onChange={(e) => setNewCommentAuthor(e.target.value)}
                    placeholder="Your Name or Institution (optional)"
                    className="border border-stone-300 dark:border-stone-700 bg-[#FAF7F2] dark:bg-[#141312] px-3 py-1.5 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-stone-900"
                  />
                </div>
                <textarea
                  required
                  rows={2}
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Contribute verified evidentiary insight, OSINT context, or feedback..."
                  className="w-full border border-stone-300 dark:border-stone-700 bg-[#FAF7F2] dark:bg-[#141312] p-2.5 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-stone-900"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-1 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider cursor-pointer"
                  >
                    <Send className="h-3 w-3" />
                    <span>Post Response</span>
                  </button>
                </div>
              </form>

              {/* Comment Feed */}
              <div className="space-y-2.5 font-serif">
                {(commentsMap[activeArticle.id] || []).map((comm) => (
                  <div
                    key={comm.id}
                    className="border border-stone-300 dark:border-stone-800 bg-white dark:bg-[#141312] p-3 space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between font-mono text-[11px] text-stone-500">
                      <span className="font-bold text-stone-900 dark:text-stone-100">{comm.author}</span>
                      <span>{comm.time}</span>
                    </div>
                    <p className="text-stone-800 dark:text-stone-200">{comm.text}</p>
                  </div>
                ))}
              </div>
            </div>
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
