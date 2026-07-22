"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import MobileMenu from "@/components/ui/MobileMenu";

export default function PageHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-30 bg-white shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-10 py-3">
          {/* Left side: circular logo + church name */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Circular Logo */}
            <Link
              href="/"
              className="shrink-0 block w-[44px] h-[44px] sm:w-[56px] sm:h-[56px] md:w-[64px] md:h-[64px] lg:w-[80px] lg:h-[80px] xl:w-[96px] xl:h-[96px] relative rounded-full overflow-hidden bg-white border-2 border-blue-100 shadow-sm hover:scale-105 transition-transform"
            >
              <Image
                src="/logo.png"
                alt="St. Mary Catholic Church Logo"
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 44px, (max-width: 768px) 56px, (max-width: 1024px) 64px, (max-width: 1280px) 80px, 96px"
                priority
              />
            </Link>

            {/* Church Name – always visible, responsive font size */}
            <div className="leading-tight">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-blue-900 whitespace-nowrap">
                St. Mary Catholic Church
              </p>
              <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 whitespace-nowrap">
                Obe Quarter, Sapele Road, Benin City
              </p>
            </div>
          </div>

          {/* Desktop nav – only visible on lg (laptop) and above */}
          <nav className="hidden lg:flex items-center gap-0.5 bg-blue-900/5 backdrop-blur-sm rounded-full px-3 py-2.5 shadow whitespace-nowrap">
            {[
              { label: "Home", href: "/" },
              { label: "About Us", href: "/about" },
              { label: "Catechism", href: "/catechism" },
              { label: "Ministries", href: "/ministries" },
              { label: "Daily Homilies", href: "/#daily-homily" },
              { label: "Mass Booking", href: "/mass-booking" },
              { label: "Give", href: "/give" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3 xl:px-4 py-2 rounded-full text-[11px] xl:text-xs font-bold text-blue-900 hover:bg-blue-50 transition-all duration-300 whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu toggle – visible on all screens smaller than lg */}
          <button
            className="lg:hidden w-10 h-10 rounded-full bg-blue-900/10 flex items-center justify-center text-blue-900 hover:bg-blue-900/20 transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            title="Open navigation menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}