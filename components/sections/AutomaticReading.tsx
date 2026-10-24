"use client";

import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";

interface ReadingData {
  date: string;
  celebration: string;
  firstReadingTitle: string;
  firstReadingText: string;
  psalmTitle: string;
  psalmText: string;
  secondReadingTitle?: string;
  secondReadingText?: string;
  gospelTitle: string;
  gospelText: string;
}

// Helper function to strip HTML tags and decode entities
function cleanText(html: string | undefined): string {
  if (!html) return "";
  const withNewlines = html.replace(/<\/(div|p)>/gi, "\n");
  const doc = new DOMParser().parseFromString(withNewlines, "text/html");
  return doc.body.textContent?.trim() || "";
}

export default function AutomaticReading() {
  const [reading, setReading] = useState<ReadingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (window as any).universalisCallback = (data: any) => {
      try {
        setReading({
          date: cleanText(data.date) || new Date().toLocaleDateString(),
          celebration: cleanText(data.day) || "Daily Reading",
          firstReadingTitle: cleanText(data.Mass_R1?.source) || "",
          firstReadingText: cleanText(data.Mass_R1?.text) || "",
          psalmTitle: cleanText(data.Mass_Ps?.source) || "",
          psalmText: cleanText(data.Mass_Ps?.text) || "",
          secondReadingTitle: cleanText(data.Mass_R2?.source),
          secondReadingText: cleanText(data.Mass_R2?.text),
          gospelTitle: cleanText(data.Mass_G?.source) || "",
          gospelText: cleanText(data.Mass_G?.text) || "",
        });
        setLoading(false);
      } catch (err) {
        console.error("Error parsing Universalis JSONP:", err);
        setError(true);
        setLoading(false);
      }
    };

    const now = new Date();
    const yyyymmdd = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
    const url = `https://universalis.com/Africa.Nigeria/${yyyymmdd}/jsonpmass.js?callback=universalisCallback`;

    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.onerror = () => {
      setError(true);
      setLoading(false);
    };
    document.body.appendChild(script);

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
    <div className="card-premium p-6 md:p-8 flex flex-col h-full overflow-hidden">
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
      <span className="inline-block px-3 py-1 rounded-full bg-gold-500/10 text-gold-600 text-xs font-semibold uppercase tracking-wider mb-6">
        {reading.celebration}
      </span>

      {/* Scrollable Readings Container */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-8 max-h-[400px]">
        
        {/* First Reading */}
        <div>
          <h3 className="text-sm font-black text-blue-900 uppercase tracking-widest border-b border-blue-100 pb-1 mb-2">
            First Reading
          </h3>
          {reading.firstReadingTitle && (
             <p className="text-xs text-gray-500 italic mb-2">{reading.firstReadingTitle}</p>
          )}
          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
            {reading.firstReadingText}
          </p>
        </div>

        {/* Psalm */}
        <div>
          <h3 className="text-sm font-black text-blue-900 uppercase tracking-widest border-b border-blue-100 pb-1 mb-2">
            Responsorial Psalm
          </h3>
          {reading.psalmTitle && (
             <p className="text-xs text-gray-500 italic mb-2">{reading.psalmTitle}</p>
          )}
          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
            {reading.psalmText}
          </p>
        </div>

        {/* Second Reading (if applicable) */}
        {reading.secondReadingText && (
          <div>
            <h3 className="text-sm font-black text-blue-900 uppercase tracking-widest border-b border-blue-100 pb-1 mb-2">
              Second Reading
            </h3>
            {reading.secondReadingTitle && (
               <p className="text-xs text-gray-500 italic mb-2">{reading.secondReadingTitle}</p>
            )}
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
              {reading.secondReadingText}
            </p>
          </div>
        )}

        {/* Gospel */}
        <div>
          <h3 className="text-sm font-black text-blue-900 uppercase tracking-widest border-b border-blue-100 pb-1 mb-2">
            Gospel
          </h3>
          {reading.gospelTitle && (
             <p className="text-xs text-gray-500 italic mb-2">{reading.gospelTitle}</p>
          )}
          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
            {reading.gospelText}
          </p>
        </div>

      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100 mt-6 shrink-0">
        <a
          href={`https://universalis.com/Africa.Nigeria/${new Date().toISOString().slice(0, 10).replace(/-/g, "")}/mass.htm`}
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