// app/(public)/homilies/page.tsx
import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/layout/PageHeader";
import HomiliesClient from "./HomiliesClient";

export default async function HomiliesPage() {
  // Calculate the date 30 days ago from today
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Fetch only homilies published in the last 30 days
  const homilies = await prisma.homily.findMany({
    where: {
      publishedAt: {
        gte: thirtyDaysAgo,
      },
    },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <PageHeader />
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-800 pt-40 pb-20 md:pt-44 md:pb-28">
        <div className="max-w-7xl mx-auto px-5 md:px-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight">
            Daily Homilies
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-blue-100/90 font-medium">
            Listen to the Word of God through the teachings of our parish
            priest. New homilies are added regularly.
          </p>
          <div className="mt-6 w-20 h-1 bg-orange-500 mx-auto rounded-full" />
        </div>
      </section>

      {/* Pass homilies to client component, plus a note */}
      <HomiliesClient homilies={homilies} />
    </>
  );
}