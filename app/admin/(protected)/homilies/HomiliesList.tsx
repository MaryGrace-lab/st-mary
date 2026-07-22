"use client";

import { useState, useMemo } from "react";
import { deleteHomily, setFeaturedHomily, updateHomily } from "@/lib/actions/homilies";
import { Star, Trash2, ExternalLink, Loader2, Pencil, Eye, Copy, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import EditHomilyModal from "@/components/admin/EditHomilyModal";
import Pagination from "@/components/admin/Pagination";

interface Homily {
  id: string;
  title: string;
  description: string | null;
  youtubeId: string;
  publishedAt: Date;
  featured: boolean;
}

const ITEMS_PER_PAGE = 10;

export default function HomiliesList({ homilies }: { homilies: Homily[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [featuringId, setFeaturingId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Homily | null>(null);
  const [editingHomily, setEditingHomily] = useState<Homily | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return homilies;
    const lower = search.toLowerCase();
    return homilies.filter(
      (h) =>
        h.title.toLowerCase().includes(lower) ||
        (h.description && h.description.toLowerCase().includes(lower))
    );
  }, [homilies, search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  async function handleDelete() {
    if (!confirmDelete) return;
    setDeletingId(confirmDelete.id);
    try {
      await deleteHomily(confirmDelete.id);
      toast.success("Homily deleted.");
      router.refresh();
    } catch {
      toast.error("Failed to delete homily.");
    } finally {
      setDeletingId(null);
      setConfirmDelete(null);
    }
  }

  async function handleFeature(id: string) {
    setFeaturingId(id);
    try {
      await setFeaturedHomily(id);
      toast.success("Homepage homily updated.");
      router.refresh();
    } catch {
      toast.error("Update failed.");
    } finally {
      setFeaturingId(null);
    }
  }

  async function handleEdit(data: { id: string; title: string; description: string; youtubeId: string }) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("youtubeId", data.youtubeId);
    try {
      const result = await updateHomily(data.id, formData);
      if (result?.error) toast.error(result.error);
      else {
        toast.success("Homily updated.");
        setEditingHomily(null);
        router.refresh();
      }
    } catch {
      toast.error("Update failed.");
    }
  }

  function copyYouTubeLink(youtubeId: string) {
    navigator.clipboard.writeText(`https://youtu.be/${youtubeId}`);
    toast.success("YouTube link copied!");
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search homilies..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-blue-200 bg-white shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
        />
      </div>

      {paginated.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-8 text-center text-gray-500">
          {search ? "No homilies match your search." : "No homilies added yet."}
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {paginated.map((homily) => (
                <div key={homily.id} className="p-4 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-blue-50/50 transition">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-blue-900">{homily.title}</h3>
                      {homily.featured && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 text-xs font-medium">
                          <Star className="w-3 h-3" fill="currentColor" /> Featured
                        </span>
                      )}
                    </div>
                    {homily.description && (
                      <p className="text-sm text-gray-600 mt-1">{homily.description}</p>
                    )}
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-400 flex-wrap">
                      <span>Published: {new Date(homily.publishedAt).toLocaleDateString()}</span>
                      <a
                        href={`https://youtube.com/watch?v=${homily.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-orange-600 hover:text-orange-800"
                      >
                        <ExternalLink className="w-3 h-3" /> View on YouTube
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Preview */}
                    <a
                      href={`https://youtube.com/watch?v=${homily.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-gray-500 hover:bg-blue-50 hover:text-blue-700 transition"
                      title="Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </a>
                    {/* Copy link */}
                    <button
                      onClick={() => copyYouTubeLink(homily.youtubeId)}
                      className="p-2 rounded-lg text-gray-500 hover:bg-blue-50 hover:text-blue-700 transition"
                      title="Copy YouTube link"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    {/* Edit */}
                    <button
                      onClick={() => setEditingHomily(homily)}
                      className="p-2 rounded-lg text-gray-500 hover:bg-blue-50 hover:text-blue-700 transition"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    {/* Feature */}
                    <button
                      onClick={() => handleFeature(homily.id)}
                      disabled={featuringId === homily.id}
                      className={`p-2 rounded-lg transition ${
                        homily.featured
                          ? "bg-orange-50 text-orange-600"
                          : "text-gray-500 hover:bg-blue-50 hover:text-blue-700"
                      } disabled:opacity-50`}
                      title="Set as homepage homily"
                    >
                      {featuringId === homily.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Star className={`w-4 h-4 ${homily.featured ? "fill-orange-500 text-orange-500" : ""}`} />
                      )}
                    </button>
                    {/* Delete */}
                    <button
                      onClick={() => setConfirmDelete(homily)}
                      disabled={deletingId === homily.id}
                      className="p-2 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition disabled:opacity-50"
                      title="Delete"
                    >
                      {deletingId === homily.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {totalPages > 1 && (
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          )}
        </>
      )}

      {/* Modals */}
      {confirmDelete && (
        <ConfirmDialog
          title="Delete Homily?"
          message={`Are you sure you want to delete "${confirmDelete.title}"? This action cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(null)}
          loading={deletingId === confirmDelete.id}
        />
      )}

      {editingHomily && (
        <EditHomilyModal
          homily={editingHomily}
          onSave={handleEdit}
          onClose={() => setEditingHomily(null)}
        />
      )}
    </div>
  );
}