"use client";

import Link from "next/link";

interface DailyReadingData {
  date: string;
  liturgicalDay: string | null;
  firstReadingTitle: string;
  firstReadingExcerpt: string;
}

export default function DailyReadingSection({ readingData }: { readingData: DailyReadingData | null }) {
  return (
    <section className="bg-blue-900 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16">
          <div className="flex-1 space-y-4">
            <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
              Daily Reading and Reflection
            </h2>

            {readingData ? (
              <>
                <p className="text-white/90 text-base md:text-xl lg:text-2xl font-semibold">
                  {new Date(readingData.date).toLocaleDateString("en-NG", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                {readingData.liturgicalDay && (
                  <p className="text-white/70 text-sm md:text-base italic">{readingData.liturgicalDay}</p>
                )}
                <p className="text-white/65 text-sm md:text-base leading-relaxed max-w-2xl">
                  <strong>First Reading:</strong> {readingData.firstReadingTitle}
                </p>
                <p className="text-white/50 text-sm italic line-clamp-3 max-w-2xl">
                  {readingData.firstReadingExcerpt}
                </p>
              </>
            ) : (
              <p className="text-white/65 text-sm md:text-base leading-relaxed max-w-2xl">
                Today's readings have not been posted yet. Please check back later.
              </p>
            )}
          </div>

          <div className="w-full sm:w-auto shrink-0">
            <Link
              href="/daily-reading"
              className="block w-full sm:w-auto text-center px-8 py-3.5 border-2 border-white/80 text-white font-bold text-sm uppercase tracking-wider rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-300"
              aria-label="Continue reading full daily reading"
            >
              Continue Reading
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}