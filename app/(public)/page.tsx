// app/(public)/page.tsx
import { prisma } from "@/lib/prisma";
import HomePageClient from "./HomePageClient";

export default async function Page() {
  // Fetch the featured/latest homily
  let homily = await prisma.homily.findFirst({
    where: { featured: true },
    orderBy: { publishedAt: "desc" },
  });
  if (!homily) {
    homily = await prisma.homily.findFirst({
      orderBy: { publishedAt: "desc" },
    });
  }
  const homilyData = homily
    ? { title: homily.title, description: homily.description ?? "", youtubeId: homily.youtubeId }
    : null;

  // Fetch today's daily reading
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const reading = await prisma.dailyReading.findFirst({
    where: { date: { gte: today, lt: tomorrow } },
    orderBy: { date: "desc" },
  });
  const readingData = reading
    ? {
        date: reading.date.toISOString(),
        liturgicalDay: reading.liturgicalDay ?? null,
        firstReadingTitle: reading.firstReadingTitle,
        firstReadingExcerpt:
          reading.firstReading.length > 100
            ? reading.firstReading.substring(0, 100) + "..."
            : reading.firstReading,
        gospelTitle: reading.gospelTitle,
      }
    : null;

  return <HomePageClient homilyData={homilyData} readingData={readingData} />;
}