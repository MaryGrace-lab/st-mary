// app/(public)/daily-reading/page.tsx
import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/layout/PageHeader";
import { Calendar, BookOpen } from "lucide-react";

interface PageProps {
  searchParams: Promise<{ date?: string }>;
}

export default async function DailyReadingPage({ searchParams }: PageProps) {
  const params = await searchParams;

  // Use the requested date or today's date
  let targetDate: Date;
  if (params?.date) {
    targetDate = new Date(params.date);
  } else {
    targetDate = new Date();
  }
  targetDate.setHours(0, 0, 0, 0);

  const nextDay = new Date(targetDate);
  nextDay.setDate(nextDay.getDate() + 1);

  const reading = await prisma.dailyReading.findFirst({
    where: {
      date: {
        gte: targetDate,
        lt: nextDay,
      },
    },
  });

  return (
    <>
      <PageHeader />
      <main className="min-h-screen bg-gray-50 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-5 md:px-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-blue-900">
              Daily Reading & Reflection
            </h1>
            <p className="text-gray-600 mt-4">
              {targetDate.toLocaleDateString("en-NG", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <div className="mt-6 w-20 h-1 bg-orange-500 mx-auto rounded-full" />
          </div>

          {!reading ? (
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8 text-center text-gray-500">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-lg font-medium">No reading available for this date.</p>
              <p className="text-sm mt-2">Please check back later or select another date.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Liturgical Day */}
              {reading.liturgicalDay && (
                <p className="text-center text-lg text-gray-500 italic">
                  {reading.liturgicalDay}
                </p>
              )}

              {/* First Reading */}
              <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 md:p-8">
                <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-orange-600" />
                  First Reading
                </h2>
                <p className="text-sm text-gray-500 mb-4 italic">
                  {reading.firstReadingTitle}
                </p>
                <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                  {reading.firstReading}
                </div>
              </div>

              {/* Responsorial Psalm */}
              <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 md:p-8">
                <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-orange-600" />
                  Responsorial Psalm
                </h2>
                <p className="text-sm text-gray-500 mb-4 italic">
                  {reading.responsorialTitle}
                </p>
                <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                  {reading.responsorialPsalm}
                </div>
              </div>

              {/* Second Reading (optional) */}
              {reading.secondReading && (
                <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 md:p-8">
                  <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-orange-600" />
                    Second Reading
                  </h2>
                  {reading.secondReadingTitle && (
                    <p className="text-sm text-gray-500 mb-4 italic">
                      {reading.secondReadingTitle}
                    </p>
                  )}
                  <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                    {reading.secondReading}
                  </div>
                </div>
              )}

              {/* Gospel Acclamation */}
              <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 md:p-8">
                <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-orange-600" />
                  Gospel Acclamation
                </h2>
                <p className="text-lg text-gray-700 font-semibold mb-2">
                  {reading.gospelAcclamation}
                </p>
                {reading.gospelAcclamationVerse && (
                  <p className="text-sm text-gray-500 italic">
                    {reading.gospelAcclamationVerse}
                  </p>
                )}
              </div>

              {/* Gospel */}
              <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 md:p-8">
                <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-orange-600" />
                  Gospel
                </h2>
                <p className="text-sm text-gray-500 mb-4 italic">
                  {reading.gospelTitle}
                </p>
                <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                  {reading.gospel}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}