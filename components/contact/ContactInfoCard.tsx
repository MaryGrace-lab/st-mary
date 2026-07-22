"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Your actual images
const images = [
  { src: "/altar.png", alt: "Church altar" },
  { src: "/at-mass3.jpeg", alt: "Mass" },
  { src: "/at-mass2.jpeg", alt: "Mass" },
  { src: "/at-mass1.jpeg", alt: "Mass" },
  { src: "/holy-mass.jpeg", alt: "Holy Mass" },
];

const AUTO_SCROLL_INTERVAL = 5000; // 5 seconds

export default function ContactInfoCard() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isProgrammaticScroll = useRef(false); // flag to ignore onScroll when auto‑scrolling

  // Scroll to a specific image
  const scrollToIndex = useCallback(
    (index: number) => {
      if (!scrollRef.current) return;
      const container = scrollRef.current;
      const childWidth = container.clientWidth; // each image is 100% width of the container
      isProgrammaticScroll.current = true; // mark as programmatic
      container.scrollTo({
        left: index * childWidth,
        behavior: "smooth",
      });
      // Reset the flag after the scroll animation finishes (roughly 500ms)
      setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 600);
    },
    []
  );

  // Start auto‑scroll timer
  const startAutoScroll = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, AUTO_SCROLL_INTERVAL);
  }, []);

  // Stop auto‑scroll timer
  const stopAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Update scroll position when currentIndex changes
  useEffect(() => {
    scrollToIndex(currentIndex);
  }, [currentIndex, scrollToIndex]);

  // Start auto‑scroll on mount, clean up on unmount
  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [startAutoScroll, stopAutoScroll]);

  // Pause on hover, resume on leave
  const handleMouseEnter = () => {
    setIsHovered(true);
    stopAutoScroll();
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
    startAutoScroll();
  };

  // Manual scroll (arrows) – reset timer
  const scroll = (direction: "left" | "right") => {
    const newIndex =
      direction === "left"
        ? (currentIndex - 1 + images.length) % images.length
        : (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    stopAutoScroll();
    startAutoScroll();
  };

  // Sync currentIndex when user swipes manually (ignoring programmatic scrolls)
  const handleScroll = () => {
    if (isProgrammaticScroll.current) return; // ignore auto‑scroll events
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const childWidth = container.clientWidth;
    if (childWidth === 0) return;
    const newIndex = Math.round(scrollLeft / childWidth);
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < images.length) {
      setCurrentIndex(newIndex);
    }
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100"
    >
      {/* Image Gallery – auto‑scroll and manual swipe */}
      <div
        className="relative group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth"
          onScroll={handleScroll}
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="relative h-64 md:h-80 min-w-full snap-center shrink-0"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>

        {/* Scroll arrows (desktop) */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5 text-blue-900" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5 text-blue-900" />
        </button>

        {/* Gradient overlay and text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
        <div className="absolute bottom-5 left-5 right-5 text-white pointer-events-none">
          <p className="text-sm font-semibold tracking-widest uppercase text-orange-400">
            Our Parish
          </p>
          <p className="text-lg md:text-xl font-bold mt-1">
            St. Mary Catholic Church
          </p>
          <p className="text-sm text-gray-200">
            Obe Quarter, Sapele Road, Benin City
          </p>
        </div>

        {/* Dot indicators – active dot highlighted */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 md:hidden">
          {images.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === currentIndex ? "bg-orange-500" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom half: Contact details */}
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-blue-900" />
          </div>
          <div>
            <p className="font-semibold text-blue-900">Parish Address</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Obe Quarter, Sapele Road, Benin City, Edo State, Nigeria
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5 text-blue-900" />
          </div>
          <div>
            <p className="font-semibold text-blue-900">Phone</p>
            <a
              href="tel:+2340000000000"
              className="text-gray-600 text-sm hover:text-orange-600 transition-colors"
            >
              +234 000 000 0000
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5 text-blue-900" />
          </div>
          <div>
            <p className="font-semibold text-blue-900">Email</p>
            <a
              href="mailto:stmarychurch@gmail.com"
              className="text-gray-600 text-sm hover:text-orange-600 transition-colors"
            >
              stmarychurch@gmail.com
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-blue-900" />
          </div>
          <div>
            <p className="font-semibold text-blue-900">Office Hours</p>
            <p className="text-gray-600 text-sm">Monday – Friday: 9:00 AM – 4:00 PM</p>
            <p className="text-gray-600 text-sm">Saturday: 9:00 AM – 12:00 PM</p>
            <p className="text-gray-600 text-sm">Sunday: Closed</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}