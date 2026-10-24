"use client";

import { useEffect, useState } from "react";
import { BookOpen, Clock } from "lucide-react";

interface ReadingData {
  date: string;
  celebration: string;
  firstReadingTitle: string;
  firstReadingText: string;
  psalmTitle: string;
  psalmText: string;
  secondReadingTitle?: string;
  secondReadingText?: string;
  gospelAcclamation?: string;
  gospelTitle: string;
  gospelText: string;
}

export default function AutomaticReading() {
  const [reading, setReading] = useState<ReadingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // 1. Set up the global callback function for Universalis
    (window as any).universalisCallback = (data: any) => {
      try {
        setReading({
          date: data.Universalis_date || new Date().toLocaleDateString(),
          celebration: data.Universalis_celebration || "Daily Reading",
          firstReadingTitle: data["Universalis_mass.FirstReading.source"] || "First Reading",
          firstReadingText: data["Universalis_mass.FirstReading.text"] || "",
          psalmTitle: data["Universalis_mass.Psalm.source"] || "Responsorial Psalm",
          psalmText: data["Universalis_mass.Psalm.text"] || "",
          secondReadingTitle: data["Universalis_mass.SecondReading.source"],
          secondReadingText: data["Universalis_mass.SecondReading.text"],
          gospelAcclamation: data["Universalis_mass.GospelAcclamation.text"],
          gospelTitle: data["Universalis_mass.Gospel.source"] || "Gospel",
          gospelText: data["Universalis_mass.Gospel.text"] || "",
        });
        setLoading(false);
      } catch (err) {
        console.error("Error parsing Universalis JSONP:", err);
        setError(true);
        setLoading(false);
      }
    };

    // 2. Generate the dynamic URL for today's date and Nigeria calendar
    const now = new Date();
    const yyyymmdd = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
    const url = `https://universalis.com/Africa.Nigeria/${yyyymmdd}/jsonpmass.js?callback=universalisCallback`;

    // 3. Inject the script
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.onerror = () => {
      setError(true);
      setLoading(false);
    };
    document.body.appendChild(script);

    // 4. Cleanup
    return () => {
      document.body.removeChild(script);
      delete (window as any).universalisCallback;
    };
  }, []);

  if (loading) {
    return (
      <div className="card-premium p-6 md:p-8 flex flex-col h-full animate-pulse">
        <div className="h-6 w-1/3 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (error || !reading) {
    return (
      <div className="card-premium p-6 md:p-8 flex flex-col justify-center items-center h-full text-center">
        <BookOpen className="w-10 h-10 text-gray-300 mb-3" />
        <p className="text-gray-500 text-sm">
          Readings temporarily unavailable. Please check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="card-premium p-6 md:p-8 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 text-blue-900 mb-4">
        <BookOpen className="w-5 h-5 text-gold-500" />
        <span className="text-xs font-bold uppercase tracking-widest">
          Today&apos;s Reading
        </span>
      </div>

      {/* Date and Celebration */}
      <p className="text-lg md:text-xl font-bold text-blue-900 mb-1">
        {reading.date}
      </p>
      <span className="inline-block px-3 py-1 rounded-full bg-gold-500/10 text-gold-600 text-xs font-semibold uppercase tracking-wider mb-4">
        {reading.celebration}
      </span>

      {/* First Reading */}
      <div className="bg-blue-50/60 rounded-xl p-4 mb-4 border-l-4 border-blue-200 flex-1 overflow-y-auto max-h-40">
        <p className="text-sm font-semibold text-blue-900 mb-1">
          {reading.firstReadingTitle}
        </p>
        <p className="text-gray-700 text-sm italic leading-relaxed line-clamp-4">
          {reading.firstReadingText}
        </p>
      </div>

      {/* Psalm */}
      <div className="bg-blue-50/60 rounded-xl p-4 mb-4 border-l-4 border-blue-200 flex-1 overflow-y-auto max-h-40">
        <p className="text-sm font-semibold text-blue-900 mb-1">
          {reading.psalmTitle}
        </p>
        <p className="text-gray-700 text-sm italic leading-relaxed line-clamp-4">
          {reading.psalmText}
        </p>
      </div>

      {/* Gospel */}
      <div className="bg-blue-50/60 rounded-xl p-4 mb-4 border-l-4 border-blue-200 flex-1 overflow-y-auto max-h-40">
        <p className="text-sm font-semibold text-blue-900 mb-1">
          {reading.gospelTitle}
        </p>
        <p className="text-gray-700 text-sm italic leading-relaxed line-clamp-4">
          {reading.gospelText}
        </p>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100 mt-auto">
        <a
          href={`https://universalis.com/africa.nigeria/${new Date().toISOString().slice(0, 10).replace(/-/g, "")}/mass.htm`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-900 font-semibold text-sm hover:text-gold-500 transition-colors group"
        >
          Continue Reading
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </a>
        <p className="text-[10px] text-gray-400">Source: Universalis</p>
      </div>
    </div>
  );
}