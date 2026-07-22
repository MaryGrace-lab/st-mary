// components/sections/HeroSection.tsx

import VideoHero from "@/components/ui/VideoHero";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, fadeIn } from "@/lib/animations";

interface HeroSectionProps {
  onOpenMobileMenu: () => void;
}

export default function HeroSection({ onOpenMobileMenu }: HeroSectionProps) {
  return (
    <section className="relative h-[100dvh] w-full overflow-hidden">
      <VideoHero />

      {/* Header */}
      <header className="absolute top-5 md:top-8 left-0 w-full px-5 md:px-10 z-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="shrink-0 hover:scale-105 transition-transform">
          <Image
            src="/logo.png"
            alt="St. Mary Catholic Church Logo"
            width={88}
            height={88}
            className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px] xl:w-[150px] xl:h-[150px] object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation Pill */}
        <nav className="hidden md:flex items-center gap-0.5 bg-white/95 backdrop-blur-sm rounded-full px-3 py-2.5 shadow-lg shadow-black/10 whitespace-nowrap">
          {[
            { label: "Home", href: "/", active: true },
            { label: "About Us", href: "/about", active: false },
            { label: "Catechism", href: "/catechism", active: false },
            { label: "Ministries", href: "/ministries", active: false },
            { label: "Daily Homilies", href: "#daily-homily", active: false },
            { label: "Mass Booking", href: "/mass-booking", active: false },
            { label: "Give", href: "/give", active: false },
            { label: "Contact", href: "/contact", active: false },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`px-3 xl:px-4 py-2 rounded-full text-[11px] xl:text-xs font-bold transition-all duration-300 whitespace-nowrap ${
                link.active
                  ? "bg-blue-900 text-white shadow-sm"
                  : "text-blue-900 hover:bg-blue-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm shadow-lg flex items-center justify-center text-blue-900 hover:scale-105 transition-transform"
          onClick={onOpenMobileMenu}
          aria-label="Open navigation menu"
          title="Open navigation menu"
        >
          <Menu size={20} />
        </button>
      </header>

      {/* Hero Content */}
      {/* lg:pt-[152px] xl:pt-[164px] – shifts the text down on laptops/desktops to clear the logo */}
      <div className="absolute inset-0 z-10 flex items-center lg:items-start lg:pt-[152px] xl:pt-[164px] px-5 md:px-10 lg:px-16">
        <div className="space-y-3 md:space-y-6 max-w-3xl w-full">
          <h1 className="text-white text-[2.5rem] sm:text-[3rem] md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.08] tracking-tight">
            St. Mary
            <br />
            Catholic Church
          </h1>
          <p className="text-white/90 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
            Obe Quarter, Sapele Road, Benin City, Edo State, Nigeria
          </p>
          <p className="text-white/50 text-sm sm:text-base md:text-lg max-w-lg">
            A parish of the Catholic Archdiocese of Benin City
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href="#mass-times"
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-900 text-white rounded-full text-[15px] md:text-base font-bold text-center hover:bg-blue-800 hover:scale-[1.03] active:scale-95 transition-all duration-300 shadow-lg shadow-blue-900/25"
            >
              Mass Times
            </a>
            <a
              href="#daily-homily"
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-900 text-white rounded-full text-[15px] md:text-base font-bold text-center hover:bg-blue-800 hover:scale-[1.03] active:scale-95 transition-all duration-300 shadow-lg shadow-blue-900/25"
            >
              Daily Homilies
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-white/50"
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-5 h-8 rounded-full border-2 border-white/30 flex justify-center pt-1">
          <div className="w-1 h-2 rounded-full bg-white/50 animate-bounce" />
        </div>
      </div>
    </section>
  );
}