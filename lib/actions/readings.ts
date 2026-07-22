"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

async function requireAdmin() {
  const session = await auth();
  if (!session || session.user?.role !== "admin") {
    redirect("/admin/login");
  }
}

export async function createDailyReading(formData: FormData) {
  await requireAdmin();

  const date = formData.get("date") as string;
  const liturgicalDay = (formData.get("liturgicalDay") as string) || null;
  const firstReading = formData.get("firstReading") as string;
  const firstReadingTitle = formData.get("firstReadingTitle") as string;
  const responsorialPsalm = formData.get("responsorialPsalm") as string;
  const responsorialTitle = formData.get("responsorialTitle") as string;
  const secondReading = (formData.get("secondReading") as string) || null;
  const secondReadingTitle = (formData.get("secondReadingTitle") as string) || null;
  const gospelAcclamation = formData.get("gospelAcclamation") as string;
  const gospelAcclamationVerse = (formData.get("gospelAcclamationVerse") as string) || null;
  const gospel = formData.get("gospel") as string;
  const gospelTitle = formData.get("gospelTitle") as string;

  if (!date || !firstReading || !responsorialPsalm || !gospel) {
    return { error: "Date, First Reading, Responsorial Psalm, and Gospel are required." };
  }

  await prisma.dailyReading.upsert({
    where: { date: new Date(date) },
    update: {
      liturgicalDay,
      firstReading, firstReadingTitle,
      responsorialPsalm, responsorialTitle,
      secondReading, secondReadingTitle,
      gospelAcclamation, gospelAcclamationVerse,
      gospel, gospelTitle,
    },
    create: {
      date: new Date(date),
      liturgicalDay,
      firstReading, firstReadingTitle,
      responsorialPsalm, responsorialTitle,
      secondReading, secondReadingTitle,
      gospelAcclamation, gospelAcclamationVerse,
      gospel, gospelTitle,
    },
  });

  revalidatePath("/admin/readings");
  revalidatePath("/daily-reading");
  revalidatePath("/");
  return { success: true };
}

export async function deleteDailyReading(date: string) {
  await requireAdmin();
  await prisma.dailyReading.deleteMany({ where: { date: new Date(date) } });
  revalidatePath("/admin/readings");
  revalidatePath("/daily-reading");
  revalidatePath("/");
  return { success: true };
}