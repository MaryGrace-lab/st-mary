"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, BookOpen, Search } from "lucide-react";
import Image from "next/image";
import { catechismTopics } from "@/data/catechism";

export default function CatechismContent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter topics based on search query (case‑insensitive)
  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) return catechismTopics;
    const lower = searchQuery.toLowerCase();
    return catechismTopics.filter(
      (topic) =>
        topic.title.toLowerCase().includes(lower) ||
        topic.items.some((item) => item.toLowerCase().includes(lower))
    );
  }, [searchQuery]);

  // Ensure activeIndex stays within bounds after filtering
  const safeIndex =
    filteredTopics.length === 0
      ? 0
      : activeIndex >= filteredTopics.length
      ? 0
      : activeIndex;

  // If filtering removed the active topic, reset to first
  if (safeIndex !== activeIndex) {
    setActiveIndex(safeIndex);
  }

  const activeTopic = filteredTopics[safeIndex] || catechismTopics[0];

  return (
    <div>
      {/* Search bar */}
      <div className="relative mb-8 max-w-xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search teachings…"
          className="block w-full pl-12 pr-4 py-3 rounded-xl border border-blue-200 bg-white shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Main layout: sidebar + content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* ── Mobile dropdown ── */}
        <div className="lg:hidden w-full">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-full flex items-center justify-between bg-white rounded-xl shadow-md p-4 border border-blue-100 text-left"
          >
            <span className="font-bold text-blue-900 truncate">
              {activeTopic.title}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-orange-600 transition-transform ${
                mobileOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {mobileOpen && (
            <div className="mt-2 bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden max-h-64 overflow-y-auto">
              {filteredTopics.map((topic, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveIndex(idx);
                    setMobileOpen(false);
                  }}
                  className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors ${
                    idx === safeIndex
                      ? "bg-blue-50 text-orange-600"
                      : "text-gray-700 hover:bg-blue-50/50"
                  }`}
                >
                  {topic.title}
                </button>
              ))}
              {filteredTopics.length === 0 && (
                <p className="text-center text-sm text-gray-400 py-4">
                  No matching topics found.
                </p>
              )}
            </div>
          )}
        </div>

        {/* ── Desktop sidebar ── */}
        <aside className="hidden lg:block w-80 shrink-0">
          <nav className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden sticky top-28">
            <div className="p-4 border-b border-blue-50">
              <h2 className="text-sm font-bold uppercase tracking-widest text-blue-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Topics
              </h2>
            </div>
            <div className="max-h-[70vh] overflow-y-auto">
              {filteredTopics.map((topic, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-full text-left px-5 py-3 text-sm transition-colors border-l-4 ${
                    idx === safeIndex
                      ? "border-orange-600 bg-blue-50 text-orange-700 font-semibold"
                      : "border-transparent text-gray-700 hover:bg-blue-50/50"
                  }`}
                >
                  {topic.title}
                </button>
              ))}
              {filteredTopics.length === 0 && (
                <p className="text-center text-sm text-gray-400 py-4">
                  No matching topics.
                </p>
              )}
            </div>
          </nav>
        </aside>

        {/* ── Content area (now with image) ── */}
        <section className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={safeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden"
            >
              {/* Topic image – always fully visible (16:9 container, object-contain) */}
              <div className="relative w-full aspect-video">
                <Image
                  src={activeTopic.image}
                  alt={activeTopic.title}
                  fill
                  className="object-contain"   // show full image, no cropping
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
                {/* Subtle gradient overlay at the bottom for title readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
              </div>

              {/* Title and list */}
              <div className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-black text-blue-900 mb-6">
                  {activeTopic.title}
                </h2>
                <ul className="space-y-3">
                  {activeTopic.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-gray-700 text-sm md:text-base"
                    >
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">
                        {i + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
}