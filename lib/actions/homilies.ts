"use server";

// lib/actions/homilies.ts
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { sendEmail } from "@/lib/email";

// ── Helper: extracts YouTube video ID from a URL or plain ID ──
function extractYouTubeId(input: string): string | null {
  if (/^[a-zA-Z0-9_-]{11}$/.test(input.trim())) {
    return input.trim();
  }
  try {
    const url = new URL(input.trim());
    if (url.hostname === "youtu.be") {
      return url.pathname.slice(1).split("?")[0] || null;
    }
    if (url.hostname.includes("youtube.com")) {
      return url.searchParams.get("v");
    }
    if (url.pathname.startsWith("/embed/")) {
      return url.pathname.split("/embed/")[1]?.split("?")[0] || null;
    }
  } catch {
    const match = input.match(/[a-zA-Z0-9_-]{11}/);
    return match ? match[0] : null;
  }
  return null;
}

// ── Admin guard ──
async function requireAdmin() {
  const session = await auth();
  if (!session || session.user?.role !== "admin") {
    redirect("/admin/login");
  }
}

// ── Add a new homily ──
export async function createHomily(formData: FormData) {
  await requireAdmin();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const rawInput = formData.get("youtubeId") as string;

  if (!title || !rawInput) {
    return { error: "Title and YouTube link/ID are required." };
  }

  const youtubeId = extractYouTubeId(rawInput);
  if (!youtubeId) {
    return { error: "Invalid YouTube link or video ID." };
  }

  await prisma.homily.create({
    data: { title, description, youtubeId },
  });

  await sendEmail({
  subject: `New Homily Posted – ${title}`,
  html: `
    <h2 style="color:#1e3a8a;">New Homily Added</h2>
    <p><strong>Title:</strong> ${title}</p>
    <p><strong>Description:</strong> ${description || "No description"}</p>
    <p><a href="https://youtube.com/watch?v=${youtubeId}" style="display:inline-block;padding:10px 20px;background:#1e3a8a;color:white;border-radius:8px;text-decoration:none;">Watch on YouTube</a></p>
  `,
});

  revalidatePath("/admin/dashboard");
  revalidatePath("/");
  return { success: true };
}

// ── Set a homily as featured for the homepage ──
export async function setFeaturedHomily(id: string) {
  await requireAdmin();

  await prisma.homily.updateMany({
    where: { featured: true },
    data: { featured: false },
  });

  await prisma.homily.update({
    where: { id },
    data: { featured: true },
  });

  revalidatePath("/");
  revalidatePath("/admin/dashboard");
}

// ── Delete a homily ──
export async function deleteHomily(id: string) {
  await requireAdmin();
  await prisma.homily.delete({ where: { id } });

  revalidatePath("/admin/dashboard");
  revalidatePath("/");
  return { success: true };
}

// ── Update an existing homily ──
export async function updateHomily(id: string, formData: FormData) {
  await requireAdmin();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const rawInput = formData.get("youtubeId") as string;

  if (!title || !rawInput) {
    return { error: "Title and YouTube link/ID are required." };
  }

  const youtubeId = extractYouTubeId(rawInput);
  if (!youtubeId) {
    return { error: "Invalid YouTube link or video ID." };
  }

  await prisma.homily.update({
    where: { id },
    data: { title, description, youtubeId },
  });

  revalidatePath("/admin/dashboard");
  revalidatePath("/");
  return { success: true };
}