"use client";

import { useState } from "react";
import { createDailyReading } from "@/lib/actions/readings";
import { PlusCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AddReadingForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const result = await createDailyReading(formData);
    if (result?.error) toast.error(result.error);
    else if (result?.success) {
      toast.success("Daily reading saved!");
      (event.target as HTMLFormElement).reset();
    }
    setLoading(false);
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 md:p-8 mb-8">
      <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
        <PlusCircle className="w-5 h-5 text-orange-600" /> Add / Update Daily Reading
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
            <input id="date" name="date" type="date" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none" />
          </div>
          <div>
            <label htmlFor="liturgicalDay" className="block text-sm font-medium text-gray-700 mb-1">Liturgical Day</label>
            <input id="liturgicalDay" name="liturgicalDay" type="text" placeholder="e.g., 15th Sunday in Ordinary Time" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none" />
          </div>
        </div>

        {/* First Reading */}
        <div>
          <label htmlFor="firstReadingTitle" className="block text-sm font-medium text-gray-700 mb-1">First Reading Title *</label>
          <input id="firstReadingTitle" name="firstReadingTitle" type="text" required placeholder="e.g., A reading from the Book of Isaiah (Isaiah 55:10-11)" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none" />
        </div>
        <div>
          <label htmlFor="firstReading" className="block text-sm font-medium text-gray-700 mb-1">First Reading *</label>
          <textarea id="firstReading" name="firstReading" rows={4} required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none resize-none" />
        </div>

        {/* Responsorial Psalm */}
        <div>
          <label htmlFor="responsorialTitle" className="block text-sm font-medium text-gray-700 mb-1">Responsorial Psalm Title *</label>
          <input id="responsorialTitle" name="responsorialTitle" type="text" required placeholder="e.g., Ps 65:9-13 (R. Lk 8:8a)" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none" />
        </div>
        <div>
          <label htmlFor="responsorialPsalm" className="block text-sm font-medium text-gray-700 mb-1">Responsorial Psalm *</label>
          <textarea id="responsorialPsalm" name="responsorialPsalm" rows={4} required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none resize-none" />
        </div>

        {/* Second Reading (optional) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="secondReadingTitle" className="block text-sm font-medium text-gray-700 mb-1">Second Reading Title (optional)</label>
            <input id="secondReadingTitle" name="secondReadingTitle" type="text" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none" />
          </div>
          <div>
            <label htmlFor="secondReading" className="block text-sm font-medium text-gray-700 mb-1">Second Reading (optional)</label>
            <textarea id="secondReading" name="secondReading" rows={3} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none resize-none" />
          </div>
        </div>

        {/* Gospel Acclamation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="gospelAcclamation" className="block text-sm font-medium text-gray-700 mb-1">Gospel Acclamation *</label>
            <input id="gospelAcclamation" name="gospelAcclamation" type="text" required placeholder="e.g., Alleluia" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none" />
          </div>
          <div>
            <label htmlFor="gospelAcclamationVerse" className="block text-sm font-medium text-gray-700 mb-1">Acclamation Verse (optional)</label>
            <input id="gospelAcclamationVerse" name="gospelAcclamationVerse" type="text" placeholder="e.g., The seed is the word of God..." className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none" />
          </div>
        </div>

        {/* Gospel */}
        <div>
          <label htmlFor="gospelTitle" className="block text-sm font-medium text-gray-700 mb-1">Gospel Title *</label>
          <input id="gospelTitle" name="gospelTitle" type="text" required placeholder="e.g., A reading from the holy Gospel according to Matthew (Matthew 13:1-23)" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none" />
        </div>
        <div>
          <label htmlFor="gospel" className="block text-sm font-medium text-gray-700 mb-1">Gospel *</label>
          <textarea id="gospel" name="gospel" rows={5} required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none resize-none" />
        </div>

        <button type="submit" disabled={loading} className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2.5 px-6 rounded-lg transition disabled:opacity-50 flex items-center gap-2">
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? "Saving..." : "Save Reading"}
        </button>
      </form>
    </div>
  );
}