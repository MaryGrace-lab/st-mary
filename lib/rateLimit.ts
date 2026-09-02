// lib/rateLimit.ts
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

type RateLimitOptions = {
  endpoint: string;
  limit: number;
  windowSeconds: number;
};

export async function checkRateLimit(
  ip: string,
  { endpoint, limit, windowSeconds }: RateLimitOptions
): Promise<{ success: boolean; remaining: number }> {
  const now = new Date();
  const windowStart = new Date(now.getTime() - windowSeconds * 1000);

  const attempts = await prisma.rateLimit.count({
    where: {
      ip,
      endpoint,
      timestamp: { gte: windowStart },
    },
  });

  if (attempts >= limit) {
    return { success: false, remaining: 0 };
  }

  await prisma.rateLimit.create({
    data: { ip, endpoint },
  });

  return { success: true, remaining: limit - attempts - 1 };
}

export async function getClientIp() {
  const headersList = await headers();
  return (
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "anonymous"
  );
}