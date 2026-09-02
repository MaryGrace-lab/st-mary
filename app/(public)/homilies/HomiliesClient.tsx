"use client";

import { useState, useMemo } from "react";
import HomilyCard from "./HomilyCard";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ExternalLink } from "lucide-react";

interface Homily {
  id: string;
  title: string;
  description: string | null;
  youtubeId: string;
  publishedAt: Date;
  featured: boolean;
}

export default function HomiliesClient({ homilies }: { homilies: Homily[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHomilies = useMemo(() => {
    if (!searchQuery.trim()) return homilies;
    const lower = searchQuery.toLowerCase();
    return homilies.filter(
      (h) =>
        h.title.toLowerCase().includes(lower) ||
        (h.description && h.description.toLowerCase().includes(lower))
    );
  }, [homilies, searchQuery]);

  return (
    <section className="bg-gray-50 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        {/* Search Bar */}
        <div className="relative mb-12 max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recent homilies..."
            className="block w-full pl-12 pr-4 py-3 rounded-xl border border-blue-200 bg-white shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition text-gray-700 placeholder-gray-400"
          />
        </div>

        {filteredHomilies.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 text-blue-900 mb-6">
              <Search className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-blue-900 mb-2">
              No recent homilies found
            </h3>
            <p className="text-gray-500">
              {searchQuery
                ? "Try adjusting your search or browse all recent homilies below."
                : "No homilies have been published in the last 30 days."}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 text-orange-600 font-medium hover:underline"
              >
                Clear search
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredHomilies.map((homily, index) => (
                <motion.div
                  key={homily.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <HomilyCard homily={homily} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Note about older homilies and YouTube link */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm mb-4">
            Looking for older homilies? Visit the priest’s YouTube channel
            where all past homilies are permanently archived.
          </p>
          <a
            href="https://www.youtube.com/@alphonsuseromoseleahiaegbe3968"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-900 text-white rounded-full font-bold hover:bg-blue-800 transition shadow-md"
          >
            <ExternalLink className="w-4 h-4" />
            Visit YouTube Channel
          </a>
        </div>
      </div>
    </section>
  );
}