// app/admin/(protected)/dashboard/page.tsx
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  Video,
  Star,
  Clock,
  BookOpen,
  PlusCircle,
  ExternalLink,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const [totalHomilies, featuredHomily, lastHomily, totalReadings, recentReadings] =
    await Promise.all([
      prisma.homily.count(),
      prisma.homily.findFirst({
        where: { featured: true },
        select: { title: true },
      }),
      prisma.homily.findFirst({
        orderBy: { createdAt: "desc" },
        select: { title: true, createdAt: true },
      }),
      prisma.dailyReading.count(),
      prisma.dailyReading.findMany({
        orderBy: { date: "desc" },
        take: 5,
        select: { date: true, liturgicalDay: true },
      }),
    ]);

  return (
    <div className="space-y-8">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-blue-900">
            Welcome back, {session.user?.name ?? "Admin"}
          </h1>
          <p className="text-gray-500 mt-1">
            {new Date().toLocaleDateString("en-NG", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/homilies"
            className="flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition"
          >
            <PlusCircle className="w-4 h-4" />
            Add Homily
          </Link>
          <Link
            href="/admin/readings"
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition"
          >
            <BookOpen className="w-4 h-4" />
            Add Reading
          </Link>
        </div>
      </div>

      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Homilies */}
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <Video className="w-8 h-8 text-blue-200 mb-4" />
          <p className="text-4xl font-black">{totalHomilies}</p>
          <p className="text-blue-200 text-sm mt-1">Total Homilies</p>
        </div>

        {/* Total Readings */}
        <div className="bg-gradient-to-br from-orange-600 to-orange-500 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <BookOpen className="w-8 h-8 text-orange-200 mb-4" />
          <p className="text-4xl font-black">{totalReadings}</p>
          <p className="text-orange-200 text-sm mt-1">Daily Readings</p>
        </div>

        {/* Featured Homily */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-600" fill="currentColor" />
            </div>
            <p className="text-sm font-medium text-gray-500">Featured Homily</p>
          </div>
          <p className="text-lg font-bold text-blue-900 line-clamp-2">
            {featuredHomily?.title ?? "None selected"}
          </p>
        </div>

        {/* Last Added */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-900" />
            </div>
            <p className="text-sm font-medium text-gray-500">Last Added</p>
          </div>
          {lastHomily ? (
            <>
              <p className="text-lg font-bold text-blue-900 line-clamp-2">
                {lastHomily.title}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {lastHomily.createdAt.toLocaleDateString()}
              </p>
            </>
          ) : (
            <p className="text-lg font-bold text-blue-900">No homilies yet</p>
          )}
        </div>
      </div>

      {/* ── Recent Readings ── */}
      <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-blue-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            Recent Readings
          </h2>
          <Link
            href="/admin/readings"
            className="text-sm text-blue-900 hover:text-orange-600 transition font-medium flex items-center gap-1"
          >
            View All
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
        {recentReadings.length === 0 ? (
          <p className="text-gray-500 text-sm">No readings recorded yet.</p>
        ) : (
          <div className="space-y-3">
            {recentReadings.map((r) => (
              <div
                key={r.date.toISOString()}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition"
              >
                <div>
                  <p className="font-semibold text-blue-900">
                    {r.liturgicalDay ?? "Daily Reading"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {r.date.toLocaleDateString("en-NG", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <Link
                  href={`/daily-reading?date=${r.date.toISOString().split("T")[0]}`}
                  target="_blank"
                  className="text-sm text-blue-900 hover:text-orange-600 transition"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}