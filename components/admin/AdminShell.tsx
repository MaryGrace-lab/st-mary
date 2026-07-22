"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile header – only on small screens */}
      <div className="lg:hidden sticky top-0 z-30 bg-white shadow-sm border-b border-blue-100 flex items-center justify-between px-4 py-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg bg-blue-50 text-blue-900"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <span className="font-bold text-blue-900">Admin</span>
        <div className="w-8" /> {/* spacer */}
      </div>

      <div className="flex">
        {/* Sidebar – hidden on mobile, overlay when open */}
        <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main content */}
        <main className="flex-1 pt-6 md:pt-8 pb-16 px-5 md:px-10 lg:pl-20">
          {children}
        </main>
      </div>
    </div>
  );
}