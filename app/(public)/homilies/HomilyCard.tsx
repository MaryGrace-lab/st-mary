"use client";

// ──────────────────────────────────────────────
// DailyHomily — Displays a YouTube video preview
// with title, description, and a watch link.
// Now uses next/image for better performance.
// ──────────────────────────────────────────────

import Link from "next/link";
import { Play } from "lucide-react";
import Image from "next/image";

// Must define the Homily interface
interface Homily {
  id: string;
  title: string;
  description: string | null;
  youtubeId: string;
  publishedAt: Date;
  featured?: boolean; // optional extra fields
}

// Use proper destructuring with type annotation
export default function HomilyCard({ homily }: { homily: Homily }) {
  const thumbnailUrl = `https://img.youtube.com/vi/${homily.youtubeId}/maxresdefault.jpg`;
  const homilyUrl = `https://www.youtube.com/watch?v=${homily.youtubeId}`;

  return (
    <div className="bg-white rounded-2xl shadow-md border border-blue-100 overflow-hidden hover:shadow-lg transition-shadow">
      <Link
        href={homilyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative aspect-video group"
      >
        <Image
          src={thumbnailUrl}
          alt={homily.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
          unoptimized
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-900/90 flex items-center justify-center group-hover:bg-blue-900 group-hover:scale-110 transition-all duration-300 shadow-lg">
            <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
          </div>
        </div>

        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
          <Play size={14} className="text-red-500" fill="currentColor" />
          <span className="text-white text-[10px] font-bold uppercase">Video</span>
        </div>
      </Link>

      <div className="p-4">
        <h2 className="font-bold text-blue-900 leading-tight mb-1 line-clamp-2">
          {homily.title}
        </h2>
        {homily.description && (
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {homily.description}
          </p>
        )}
        <p className="text-xs text-gray-400">
          {new Date(homily.publishedAt).toLocaleDateString("en-NG", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}