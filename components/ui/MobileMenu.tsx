"use client";

// ──────────────────────────────────────────────
// MobileMenu — Slide-in drawer from the right
// (original, no Framer Motion dependency)
// Prevents body scroll when open.
// ──────────────────────────────────────────────

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/catechism", label: "Catechism" },
  { href: "/ministries", label: "Ministries" },
  { href: "/#daily-homily", label: "Daily Homilies" },
  { href: "/mass-booking", label: "Mass Booking" },
  { href: "/give", label: "Give" },
  { href: "/contact", label: "Contact" },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop overlay (closes on click) */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-2xl z-50 flex flex-col justify-between w-[75vw] max-w-[340px] sm:w-[320px] transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex justify-end p-6">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
            aria-label="Close menu"
            title="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-col items-center justify-center space-y-6 pt-12 px-6 flex-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`text-center w-full text-xl sm:text-2xl font-semibold tracking-tight transition-colors ${
                  isActive
                    ? "text-orange-600"
                    : "text-blue-900 hover:text-orange-600"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer info */}
        <div className="p-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">St. Mary Catholic Church</p>
          <p className="text-[10px] text-gray-300">
            Obe Quarter, Benin City
          </p>
        </div>
      </div>
    </>
  );
}