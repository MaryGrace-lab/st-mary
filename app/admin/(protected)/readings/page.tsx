// app/admin/(protected)/readings/page.tsx
import { prisma } from "@/lib/prisma";
import AddReadingForm from "./AddReadingForm";
import ReadingsList from "./ReadingsList";

export default async function AdminReadingsPage() {
  const readings = await prisma.dailyReading.findMany({
    orderBy: { date: "desc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-black text-blue-900 mb-8">Manage Daily Readings</h1>
      <AddReadingForm />
      <ReadingsList readings={readings} />
    </div>
  );
}