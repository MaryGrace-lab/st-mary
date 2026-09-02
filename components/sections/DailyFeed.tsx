"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import {
  BookOpen,
  Play,
  ExternalLink,
  Clock,
  Share2,
  Bookmark,
  X,
  Link as LinkIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DailyReadingData {
  date: string;
  liturgicalDay: string | null;
  firstReadingTitle: string;
  firstReadingExcerpt: string;
}

interface HomilyData {
  title: string;
  description: string;
  youtubeId: string;
}

export default function DailyFeed({
  readingData,
  homilyData,
}: {
  readingData: DailyReadingData | null;
  homilyData: HomilyData | null;
}) {
  const [bookmarked, setBookmarked] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const readingUrl =
    typeof window !== "undefined"
      ? window.location.origin + "/daily-reading"
      : "/daily-reading";

  const shareText = "Today's Reading from St. Mary Catholic Church";

  // ── Share handlers ──
  const shareWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareText + " " + readingUrl)}`,
      "_blank"
    );
    setShareOpen(false);
  };

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(readingUrl)}`,
      "_blank"
    );
    setShareOpen(false);
  };

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(readingUrl)}&text=${encodeURIComponent(shareText)}`,
      "_blank"
    );
    setShareOpen(false);
  };

  const shareInstagram = () => {
    if (navigator.share) {
      navigator
        .share({ title: shareText, url: readingUrl })
        .catch(() => toast.error("Could not open share sheet."));
    } else {
      toast.info("Open Instagram and paste the link manually.");
    }
    setShareOpen(false);
  };

  const shareTikTok = () => {
    if (navigator.share) {
      navigator
        .share({ title: shareText, url: readingUrl })
        .catch(() => toast.error("Could not open share sheet."));
    } else {
      toast.info("Open TikTok and paste the link manually.");
    }
    setShareOpen(false);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(readingUrl);
      toast.success("Reading link copied to clipboard!");
    } catch {
      toast.error("Failed to copy link.");
    }
    setShareOpen(false);
  };

  // Calculate approximate reading time (words per minute = 200)
  const wordCount = readingData?.firstReadingExcerpt?.split(/\s+/).length ?? 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <section className="bg-gray-50 section-padding">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* ── Today's Reading Card (Redesigned) ── */}
          <motion.div
            variants={fadeInUp}
            className="card-premium overflow-hidden flex flex-col"
          >
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              {/* Header */}
              <div className="flex items-center gap-2 text-blue-900 mb-4">
                <BookOpen className="w-5 h-5 text-gold-500" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  Today&apos;s Reading
                </span>
              </div>

              {readingData ? (
                <>
                  {/* Date and Liturgical Day */}
                  <p className="text-lg md:text-xl font-bold text-blue-900 mb-1">
                    {new Date(readingData.date).toLocaleDateString("en-NG", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  {readingData.liturgicalDay && (
                    <span className="inline-block px-3 py-1 rounded-full bg-gold-500/10 text-gold-600 text-xs font-semibold uppercase tracking-wider mb-4">
                      {readingData.liturgicalDay}
                    </span>
                  )}

                  {/* Reading title and excerpt */}
                  <p className="text-sm text-gray-600 font-medium mb-2">
                    <strong>First Reading:</strong> {readingData.firstReadingTitle}
                  </p>

                  {/* Highlighted Quote Block */}
                  <div className="bg-blue-50/60 rounded-xl p-4 mb-4 border-l-4 border-blue-200 flex-1">
                    <p className="text-gray-700 text-sm italic leading-relaxed line-clamp-4">
                      “{readingData.firstReadingExcerpt}”
                    </p>
                  </div>

                  {/* Metadata row: reading time + decorative progress */}
                  <div className="flex items-center gap-4 mb-6 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {readingTime} min read
                    </span>
                    <div className="flex-1 h-0.5 bg-gray-200 rounded-full">
                      <div className="h-full w-2/5 bg-blue-200 rounded-full" />
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-gray-500 text-sm mb-6 flex-1">
                  Today&apos;s readings have not been posted yet.
                </p>
              )}

              {/* Footer actions */}
              <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100">
                <Link
                  href="/daily-reading"
                  className="inline-flex items-center gap-2 text-blue-900 font-semibold text-sm hover:text-gold-500 transition-colors group"
                >
                  Continue Reading
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>

                <div className="flex items-center gap-2 relative">
                  {/* Bookmark button */}
                  <button
                    className={`p-2 rounded-lg transition ${
                      bookmarked
                        ? "text-gold-500 bg-gold-50"
                        : "text-gray-400 hover:text-gold-500 hover:bg-gold-50"
                    }`}
                    title="Bookmark"
                    onClick={() => setBookmarked(!bookmarked)}
                  >
                    <Bookmark
                      className="w-4 h-4"
                      fill={bookmarked ? "currentColor" : "none"}
                    />
                  </button>

                  {/* Share button (opens popover) */}
                  <button
                    className="p-2 rounded-lg text-gray-400 hover:text-gold-500 hover:bg-gold-50 transition"
                    title="Share reading"
                    onClick={() => setShareOpen(true)}
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Today's Homily Card ── */}
          <motion.div
            variants={fadeInUp}
            className="card-premium overflow-hidden flex flex-col"
            id="daily-homily"
          >
            <div className="relative aspect-video w-full">
              {homilyData ? (
                <Link
                  href={`https://youtube.com/watch?v=${homilyData.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full group"
                >
                  <Image
                    src={`https://img.youtube.com/vi/${homilyData.youtubeId}/maxresdefault.jpg`}
                    alt={homilyData.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-blue-900/80 flex items-center justify-center group-hover:bg-blue-900 group-hover:scale-110 transition-all shadow-lg">
                      <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="w-full h-full bg-blue-50 flex items-center justify-center text-gray-400">
                  <Play className="w-12 h-12" />
                </div>
              )}
            </div>

            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="flex items-center gap-2 text-blue-900 mb-4">
                <Play className="w-5 h-5 text-gold-500" fill="currentColor" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  Today&apos;s Homily
                </span>
              </div>

              {homilyData ? (
                <>
                  <h3 className="text-lg font-bold text-blue-900 mb-2 line-clamp-2">
                    {homilyData.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {homilyData.description}
                  </p>
                </>
              ) : (
                <p className="text-gray-500 text-sm mb-4">
                  The latest homily will appear here once it is posted.
                </p>
              )}

              <div className="mt-auto flex flex-wrap gap-3">
                {homilyData && (
                  <Link
                    href={`https://youtube.com/watch?v=${homilyData.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-900 text-white rounded-full text-sm font-bold hover:bg-blue-800 transition shadow-md"
                  >
                    <Play className="w-4 h-4" fill="white" />
                    Watch Now
                  </Link>
                )}
                <Link
                  href="/homilies"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-blue-900 text-blue-900 rounded-full text-sm font-bold hover:bg-blue-50 transition"
                >
                  View Past Homilies
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Share Popover (fixed bottom sheet) ── */}
      {shareOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setShareOpen(false)}
          />
          {/* Popover – centred on all screens */}
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 pb-8 pt-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-blue-100 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-blue-900 uppercase tracking-wider">
                  Share via
                </span>
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => setShareOpen(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* WhatsApp */}
              <button
                onClick={shareWhatsApp}
                aria-label="Share via WhatsApp"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="currentColor">
                  <path d="M12.04 2C6.58 2 2.1 6.48 2.1 11.94c0 1.82.5 3.58 1.44 5.12L2 22l5.12-1.44c1.44.86 3.12 1.32 4.84 1.32 5.46 0 9.94-4.48 9.94-9.94S17.5 2 12.04 2zm5.06 14.06c-.22.64-.74 1.16-1.38 1.38-.36.12-3.44.86-4.56-.3-1.12-1.16-1.72-2.6-1.72-4.06 0-1.46.9-2.72 2.3-3.36.22-.08.44-.12.64-.12.22 0 .36.02.48.02.16 0 .32.02.52.16.2.14.4.48.56.82.16.34.28.74.32.88.04.14.04.26-.04.38-.08.12-.16.22-.26.3-.1.08-.22.18-.32.26-.1.1-.2.2-.22.28-.04.1-.02.22.04.34.06.12.3.52.56.88.28.36.54.6.74.82.2.22.38.3.56.36.18.06.28.04.4-.02.12-.06.26-.22.4-.38.14-.16.22-.36.3-.48.08-.12.2-.12.34-.06.14.04.46.24.7.38.24.14.44.3.52.42.08.12.08.26.04.4z" />
                </svg>
                WhatsApp
              </button>

              {/* Facebook */}
              <button
                onClick={shareFacebook}
                aria-label="Share via Facebook"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>

              {/* X (Twitter) */}
              <button
                onClick={shareTwitter}
                aria-label="Share via X (Twitter)"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-sky-50 hover:text-sky-700 transition"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                X (Twitter)
              </button>

              {/* Instagram */}
              <button
                onClick={shareInstagram}
                aria-label="Share via Instagram"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-700 transition"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Instagram
              </button>

              {/* TikTok */}
              <button
                onClick={shareTikTok}
                aria-label="Share via TikTok"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-slate-50 hover:text-slate-700 transition"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
                TikTok
              </button>

              {/* Copy Link */}
              <button
                onClick={copyLink}
                aria-label="Copy reading link to clipboard"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
              >
                <LinkIcon className="w-4 h-4 shrink-0" />
                Copy Link
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}