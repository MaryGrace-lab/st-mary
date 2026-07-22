"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  updateBookingStatus,
  deleteMassBooking,
} from "@/lib/actions/mass-booking";
import {
  Search,
  Trash2,
  Loader2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import Pagination from "@/components/admin/Pagination";

interface Booking {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  intentionType: string;
  location: string;
  bookDate: Date;
  massTime: string | null;
  amount: number;
  status: string;
  reference: string;
  namesToPrayFor: string | null;
  additionalInfo: string | null;
  createdAt: Date;
}

const ITEMS_PER_PAGE = 10;

export default function BookingsList({ bookings }: { bookings: Booking[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState<Booking | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return bookings;
    const lower = search.toLowerCase();
    return bookings.filter(
      (b) =>
        b.name.toLowerCase().includes(lower) ||
        (b.email && b.email.toLowerCase().includes(lower)) ||
        b.phone.includes(lower) ||
        b.reference.toLowerCase().includes(lower) ||
        b.intentionType.toLowerCase().includes(lower) ||
        b.location.toLowerCase().includes(lower)
    );
  }, [bookings, search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  async function handleStatusUpdate(
    id: string,
    status: "PENDING" | "CONFIRMED" | "CANCELLED"
  ) {
    setUpdatingId(id);
    try {
      await updateBookingStatus(id, status);
      toast.success(
        status === "CONFIRMED"
          ? "Booking confirmed."
          : status === "CANCELLED"
          ? "Booking cancelled."
          : "Booking reset to pending."
      );
      router.refresh();
    } catch {
      toast.error("Failed to update booking.");
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleDelete() {
    if (!confirmDelete) return;
    setUpdatingId(confirmDelete.id);
    try {
      await deleteMassBooking(confirmDelete.id);
      toast.success("Booking deleted.");
      router.refresh();
    } catch {
      toast.error("Failed to delete booking.");
    } finally {
      setUpdatingId(null);
      setConfirmDelete(null);
    }
  }

  const intentionLabels: Record<string, string> = {
    THANKSGIVING: "Thanksgiving",
    ANNIVERSARY: "Anniversary",
    BIRTHDAY: "Birthday",
    SPECIAL_INTENTIONS: "Special Intentions",
    MEMORIAL: "Memorial Mass",
    SOULS_DEPARTED: "Souls of the Faithful Departed",
    CHILD_DEDICATION: "Child Dedication",
    HEALING: "Healing",
    OTHER: "Other",
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search bookings (name, phone, reference, intention…)"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-blue-200 bg-white shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
        />
      </div>

      {paginated.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-8 text-center text-gray-500">
          {search ? "No bookings match your search." : "No mass bookings yet."}
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {paginated.map((b) => (
                <div
                  key={b.id}
                  className="p-4 md:p-6 hover:bg-blue-50/50 transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-blue-900">{b.name}</h3>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            b.status === "CONFIRMED"
                              ? "bg-green-100 text-green-700"
                              : b.status === "CANCELLED"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        <span className="font-medium">
                          {intentionLabels[b.intentionType] || b.intentionType}
                        </span>{" "}
                        – {b.location}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {new Date(b.bookDate).toLocaleDateString("en-NG", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                        {b.massTime && ` at ${b.massTime}`}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Ref: {b.reference} • ₦{b.amount.toLocaleString()} •{" "}
                        {b.phone}
                        {b.email && ` • ${b.email}`}
                      </div>
                      {b.namesToPrayFor && (
                        <p className="text-xs text-gray-500 mt-1 italic">
                          Pray for: {b.namesToPrayFor}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {b.status === "PENDING" && (
                        <>
                          <button
                            onClick={() =>
                              handleStatusUpdate(b.id, "CONFIRMED")
                            }
                            disabled={updatingId === b.id}
                            className="p-2 rounded-lg text-green-600 hover:bg-green-50 transition disabled:opacity-50"
                            title="Confirm booking"
                          >
                            {updatingId === b.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <CheckCircle className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() =>
                              handleStatusUpdate(b.id, "CANCELLED")
                            }
                            disabled={updatingId === b.id}
                            className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition disabled:opacity-50"
                            title="Cancel booking"
                          >
                            {updatingId === b.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <XCircle className="w-4 h-4" />
                            )}
                          </button>
                        </>
                      )}
                      {b.status !== "PENDING" && (
                        <button
                          onClick={() => handleStatusUpdate(b.id, "PENDING")}
                          disabled={updatingId === b.id}
                          className="p-2 rounded-lg text-yellow-600 hover:bg-yellow-50 transition disabled:opacity-50"
                          title="Reset to pending"
                        >
                          <Loader2
                            className={`w-4 h-4 ${
                              updatingId === b.id ? "animate-spin" : "hidden"
                            }`}
                          />
                          Reset
                        </button>
                      )}
                      <button
                        onClick={() => setConfirmDelete(b)}
                        disabled={updatingId === b.id}
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
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}

      {confirmDelete && (
        <ConfirmDialog
          title="Delete Booking?"
          message={`Are you sure you want to delete the booking for "${confirmDelete.name}"?`}
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(null)}
          loading={updatingId === confirmDelete.id}
        />
      )}
    </div>
  );
}