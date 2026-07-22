"use client";

import { useState } from "react";
import { deleteDailyReading } from "@/lib/actions/readings";
import { Trash2, ExternalLink, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

interface DailyReading {
  id: string;
  date: Date;
  firstReadingTitle: string;
  gospelTitle: string;
}

export default function ReadingsList({ readings }: { readings: DailyReading[] }) {
  const router = useRouter();
  const [deletingDate, setDeletingDate] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  async function handleDelete() {
    if (!confirmDelete) return;
    setDeletingDate(confirmDelete);
    try {
      await deleteDailyReading(confirmDelete);
      toast.success("Reading deleted.");
      router.refresh();
    } catch {
      toast.error("Failed to delete reading.");
    } finally {
      setDeletingDate(null);
      setConfirmDelete(null);
    }
  }

  if (readings.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-8 text-center text-gray-500">
        No daily readings added yet. Use the form above to add the first one.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
        <div className="p-4 border-b border-blue-50">
          <h2 className="text-xl font-bold text-blue-900">All Readings</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {readings.map((reading) => (
            <div
              key={reading.id}
              className="p-4 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-blue-50/50 transition"
            >
              <div className="flex-1">
                <h3 className="font-bold text-blue-900">
                  {new Date(reading.date).toLocaleDateString("en-NG", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h3>
                <div className="text-sm text-gray-600 mt-1">
                  <p><strong>First Reading:</strong> {reading.firstReadingTitle}</p>
                  <p><strong>Gospel:</strong> {reading.gospelTitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`/daily-reading?date=${new Date(reading.date).toISOString().split("T")[0]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition"
                >
                  <ExternalLink className="w-4 h-4" />
                  View
                </a>
                <button
                  onClick={() => setConfirmDelete(new Date(reading.date).toISOString().split("T")[0])}
                  disabled={deletingDate === new Date(reading.date).toISOString().split("T")[0]}
                  className="flex items-center gap-1 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition disabled:opacity-50"
                >
                  {deletingDate === new Date(reading.date).toISOString().split("T")[0] ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {confirmDelete && (
        <ConfirmDialog
          title="Delete Reading?"
          message={`Are you sure you want to delete the reading for ${new Date(confirmDelete).toLocaleDateString()}? This action cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(null)}
          loading={deletingDate === confirmDelete}
        />
      )}
    </div>
  );
}