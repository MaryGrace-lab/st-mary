"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Video, LogOut, X } from "lucide-react";
import { signOut } from "next-auth/react";
import { BookOpen } from "lucide-react"; // add this import
import { BookOpenCheck } from "lucide-react";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/homilies", label: "Homilies", icon: Video },
  { href: "/admin/readings", label: "Readings", icon: BookOpen },
  { href: "/admin/mass-bookings", label: "Mass Bookings", icon: BookOpenCheck },
];

interface AdminSidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 h-full w-64 bg-white shadow-lg border-r border-blue-100 z-50 transform transition-transform duration-300 flex flex-col
          lg:translate-x-0 lg:z-auto
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo / close button area */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <span className="font-bold text-blue-900 text-lg">Admin Panel</span>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-blue-50 text-blue-900 hover:bg-blue-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-900"
                    : "text-gray-600 hover:bg-blue-50/50 hover:text-blue-900"
                }`}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition w-full px-4 py-2 rounded-lg hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}