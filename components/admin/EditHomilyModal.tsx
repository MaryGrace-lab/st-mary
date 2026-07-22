"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

interface HomilyData {
  id: string;
  title: string;
  description: string | null;
  youtubeId: string;
}

interface EditHomilyModalProps {
  homily: HomilyData;
  onSave: (data: { id: string; title: string; description: string; youtubeId: string }) => Promise<void>;
  onClose: () => void;
}

export default function EditHomilyModal({ homily, onSave, onClose }: EditHomilyModalProps) {
  const [title, setTitle] = useState(homily.title);
  const [description, setDescription] = useState(homily.description ?? "");
  const [youtubeInput, setYoutubeInput] = useState(homily.youtubeId);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await onSave({ id: homily.id, title, description, youtubeId: youtubeInput });
    setLoading(false);
    onClose();
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-2xl p-6 shadow-2xl max-w-lg w-full mx-4"
        >
          <h2 className="text-xl font-bold text-blue-900 mb-4">Edit Homily</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                id="edit-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Homily for Sunday July 12, 2026"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none"
              />
            </div>
            <div>
              <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                id="edit-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Brief summary of the homily (optional)"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none resize-none"
              />
            </div>
            <div>
              <label htmlFor="edit-youtubeId" className="block text-sm font-medium text-gray-700 mb-1">YouTube Link/ID</label>
              <input
                id="edit-youtubeId"
                type="text"
                value={youtubeInput}
                onChange={(e) => setYoutubeInput(e.target.value)}
                placeholder="e.g., https://youtu.be/ikiFqIeAWeY"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-blue-900 text-white hover:bg-blue-800 transition flex items-center gap-2 disabled:opacity-50"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}