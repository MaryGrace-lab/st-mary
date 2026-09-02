// components/sections/HeroSection.tsx

import VideoHero from "@/components/ui/VideoHero";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

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
              className={`relative px-3 xl:px-4 py-2 rounded-full text-[11px] xl:text-xs font-bold transition-all duration-300 whitespace-nowrap group ${
                link.active
                  ? "bg-blue-900 text-white shadow-sm"
                  : "text-blue-900 hover:bg-blue-50"
              }`}
            >
              {link.label}
              {/* Gold underline that appears on hover for non‑active links */}
              {!link.active && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gold-500 rounded-full transition-all duration-300 group-hover:w-1/2" />
              )}
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

      {/* Hero Content – Cinematic & Staggered */}
      <div className="absolute inset-0 z-10 flex items-center lg:items-start lg:pt-[152px] xl:pt-[164px] px-5 md:px-10 lg:px-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-4 md:space-y-6 max-w-3xl w-full"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-white text-[2.75rem] sm:text-[3.5rem] md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.05] tracking-tight drop-shadow-lg"
          >
            St. Mary
            <br />
            Catholic Church
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-white/90 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold drop-shadow-md"
          >
            Obe Quarter, Sapele Road, Benin City, Edo State, Nigeria
          </motion.p>
          <motion.p
            variants={fadeInUp}
            className="text-white/60 text-sm sm:text-base md:text-lg max-w-lg drop-shadow-sm"
          >
            A parish of the Catholic Archdiocese of Benin City
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            {/* Primary CTA – filled */}
            <a
              href="#mass-times"
              className="w-full sm:w-auto px-10 py-4 bg-blue-900 text-white rounded-full text-base font-bold text-center hover:bg-blue-800 hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl shadow-blue-900/40"
            >
              Mass Times
            </a>
            {/* Secondary CTA – outlined */}
            <a
              href="#daily-homily"
              className="w-full sm:w-auto px-10 py-4 border-2 border-white/70 text-white rounded-full text-base font-bold text-center hover:bg-white/10 hover:border-white active:scale-95 transition-all duration-300"
            >
              Watch Today&apos;s Homily
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Premium Scroll Indicator – gold dot, subtle bounce */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-white/40"
        aria-hidden="true"
      >
        <span className="text-[11px] uppercase tracking-[0.3em] font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-white/30 flex justify-center pt-1"
        >
          <div className="w-1 h-2 rounded-full bg-gold-500" />
        </motion.div>
      </div>
    </section>
  );
}