"use client";

// ──────────────────────────────────────────────
// DailyHomily — Displays a YouTube video preview
// with title, description, and a watch link.
// ⚠️ Uses a regular <img> for the thumbnail;
// consider switching to next/Image with remote
// patterns configured for better performance.
// ──────────────────────────────────────────────

import Link from "next/link";
import { Play, ExternalLink } from "lucide-react";

type Props = {
  title: string;
  description: string;
  youtubeId: string;
};

export default function DailyHomily({ title, description, youtubeId }: Props) {
  const homilyUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

  return (
    <section className="bg-gray-50 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          
          {/* Left: YouTube thumbnail with play button */}
          <div className="w-full lg:w-[55%]">
            <Link
              href={homilyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative aspect-video w-full rounded-2xl overflow-hidden shadow-xl group cursor-pointer"
            >
              <img
                src={thumbnailUrl}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Center play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-900/90 flex items-center justify-center group-hover:bg-blue-900 group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <div className="w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-l-[20px] border-l-white ml-1" />
                </div>
              </div>
              {/* "Video" badge */}
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                <Play size={14} className="text-red-500" fill="currentColor" />
                <span className="text-white text-[10px] font-bold uppercase">Video</span>
              </div>
            </Link>
          </div>

          {/* Right: Text content */}
          <div className="w-full lg:w-[45%] space-y-4">
            <span className="text-red-600 text-xs md:text-sm font-bold uppercase tracking-[0.2em] flex items-center gap-2">
              <Play size={16} className="text-red-600" fill="currentColor" /> Daily Homily
            </span>
            <h2 className="text-gray-900 text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
              {title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              {description}
            </p>
            <Link
              href={homilyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-full text-sm font-bold hover:bg-red-700 transition-all duration-300 shadow-lg shadow-red-600/25"
            >
              <Play size={18} fill="currentColor" />
              Watch on YouTube
              <ExternalLink size={14} />
            </Link>

            {/* View past homilies button */}
            <Link
              href="/homilies"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-900 text-blue-900 rounded-full text-sm font-bold hover:bg-blue-900 hover:text-white transition-all duration-300"
            >
              View Past Homilies
              <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}