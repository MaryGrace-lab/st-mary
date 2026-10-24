// app/api/cron/youtube/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

const PLAYLIST_ID = "PLUsemNkpz7tmdzSvlEkcqpRpNsGWpfGxr";
const API_KEY = process.env.YOUTUBE_API_KEY;

export async function GET(request: Request) {
  // 1. Security: Only allow Vercel Cron
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!API_KEY) {
    console.error("YOUTUBE_API_KEY is not set.");
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  try {
    // 2. Fetch the latest video from the playlist
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=1&key=${API_KEY}`,
      { next: { revalidate: 0 } }
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.statusText}`);
    }

    const data = await response.json();
    const items = data.items;

    if (!items || items.length === 0) {
      return NextResponse.json({ message: "No videos found in playlist." });
    }

    const latestVideo = items[0].snippet;
    const videoId = latestVideo.resourceId.videoId;
    const title = latestVideo.title;

    // 3. Deduplication: Check if this video already exists
    const existingHomily = await prisma.homily.findUnique({
      where: { youtubeId: videoId },
    });

    if (existingHomily) {
      return NextResponse.json({ message: "Video already imported." });
    }

    // 4. Save the new homily
    await prisma.homily.create({
      data: {
        title: title,
        description: "Listen and be blessed.",
        youtubeId: videoId,
        source: "AUTOMATIC",
        publishedAt: new Date(), // Use current time for the website's 30-day filter
      },
    });

    // 5. Revalidate public pages
    revalidatePath("/homilies");
    revalidatePath("/");
    revalidatePath("/admin/homilies");

    return NextResponse.json({ success: true, imported: title });
  } catch (error) {
    console.error("YouTube Cron Error:", error);
    return NextResponse.json({ error: "Failed to sync YouTube" }, { status: 500 });
  }
}