"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Search, Trash2, Loader2, CheckCircle } from "lucide-react";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import Pagination from "@/components/admin/Pagination";
import { deleteDonation, acknowledgeDonation } from "@/lib/actions/donations";

interface Donation {
  id: string;
  name: string;
  email: string | null;
  amount: number;
  purpose: string | null;
  message: string | null;
  status: string;
  createdAt: Date;
}

const ITEMS_PER_PAGE = 10;

export default function DonationsList({ donations }: { donations: Donation[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState<Donation | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return donations;
    const lower = search.toLowerCase();
    return donations.filter(
      (d) =>
        d.name.toLowerCase().includes(lower) ||
        (d.email && d.email.toLowerCase().includes(lower)) ||
        (d.purpose && d.purpose.toLowerCase().includes(lower)) ||
        d.amount.toString().includes(lower)
    );
  }, [donations, search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  async function handleAcknowledge(id: string) {
    setUpdatingId(id);
    try {
      await acknowledgeDonation(id);
      toast.success("Donation acknowledged.");
      router.refresh();
    } catch {
      toast.error("Failed to acknowledge.");
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleDelete() {
    if (!confirmDelete) return;
    setUpdatingId(confirmDelete.id);
    try {
      await deleteDonation(confirmDelete.id);
      toast.success("Donation deleted.");
      router.refresh();
    } catch {
      toast.error("Failed to delete.");
    } finally {
      setUpdatingId(null);
      setConfirmDelete(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search donations (name, email, purpose, amount)…"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-blue-200 bg-white shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
        />
      </div>

      {paginated.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-8 text-center text-gray-500">
          {search ? "No donations match your search." : "No donations yet."}
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {paginated.map((donation) => (
                <div key={donation.id} className="p-4 md:p-6 hover:bg-blue-50/50 transition">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-blue-900">{donation.name}</h3>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          donation.status === "ACKNOWLEDGED" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {donation.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        ₦{donation.amount.toLocaleString()} {donation.purpose && `• ${donation.purpose}`}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {donation.email && `${donation.email} • `}
                        {new Date(donation.createdAt).toLocaleDateString("en-NG", {
                          weekday: "long", year: "numeric", month: "long", day: "numeric"
                        })}
                      </div>
                      {donation.message && <p className="text-sm text-gray-500 mt-2">{donation.message}</p>}
                    </div>

                    <div className="flex items-center gap-2">
                      {donation.status !== "ACKNOWLEDGED" && (
                        <button
                          onClick={() => handleAcknowledge(donation.id)}
                          disabled={updatingId === donation.id}
                          className="p-2 rounded-lg text-green-600 hover:bg-green-50 transition disabled:opacity-50"
                          title="Acknowledge donation"
                        >
                          {updatingId === donation.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                        </button>
                      )}
                      <button
                        onClick={() => setConfirmDelete(donation)}
                        disabled={updatingId === donation.id}
                        className="p-2 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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

      {confirmDelete && (
        <ConfirmDialog
          title="Delete Donation?"
          message={`Are you sure you want to delete the donation from "${confirmDelete.name}"?`}
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(null)}
          loading={updatingId === confirmDelete.id}
        />
      )}
    </div>
  );
}