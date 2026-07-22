"use client";

import { useState } from "react";
import { createHomily } from "@/lib/actions/homilies";
import { PlusCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AddHomilyForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const result = await createHomily(formData);
    if (result?.error) toast.error(result.error);
    else if (result?.success) {
      toast.success("Homily added!");
      (event.target as HTMLFormElement).reset();
    }
    setLoading(false);
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 md:p-8 mb-8">
      <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
        <PlusCircle className="w-5 h-5 text-orange-600" /> Add New Homily
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="add-title" className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
          <input
            id="add-title"
            name="title"
            type="text"
            required
            placeholder="e.g., Homily for Sunday July 12, 2026"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none"
          />
        </div>
        <div>
          <label htmlFor="add-description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            id="add-description"
            name="description"
            rows={2}
            placeholder="Brief summary of the homily (optional)"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none resize-none"
          />
        </div>
        <div>
          <label htmlFor="add-youtubeId" className="block text-sm font-medium text-gray-700 mb-1">YouTube Link/Video ID *</label>
          <input
            id="add-youtubeId"
            name="youtubeId"
            type="text"
            required
            placeholder="e.g., https://youtu.be/ikiFqIeAWeY"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none"
          />
          <p className="text-xs text-gray-400 mt-1">Paste the full YouTube link or just the video ID.</p>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2.5 px-6 rounded-lg transition disabled:opacity-50 flex items-center gap-2"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? "Adding..." : "Add Homily"}
        </button>
      </form>
    </div>
  );
}