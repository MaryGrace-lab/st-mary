"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Search, X } from "lucide-react";
import { ministries, groups } from "@/data/ministries";
import FeaturedMinistries from "@/components/ministries/FeaturedMinistries";
import MinistryGroup from "@/components/ministries/MinistryGroup";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
} as const;

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.max(1, Math.floor(end / (duration / 16)));
    const timer = setInterval(() => {
      const next = start + step;
      if (next >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(next);
        start = next;
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function MinistriesContent() {
  const [search, setSearch] = useState("");

  const featuredMinistries = useMemo(
    () => ministries.filter((m) => m.featured),
    []
  );

  const filteredMinistries = useMemo(() => {
    if (!search.trim()) return ministries;
    const lower = search.toLowerCase();
    return ministries.filter(
      (m) =>
        m.name.toLowerCase().includes(lower) ||
        m.description.toLowerCase().includes(lower)
    );
  }, [search]);

  const groupedMinistries = useMemo(() => {
    return groups.map((group) => ({
      group,
      ministries: filteredMinistries.filter((m) => m.group === group),
    }));
  }, [filteredMinistries]);

  const scrollToCTA = () => {
    document.getElementById("ministries-cta")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToGroup = (groupId: string) => {
    document.getElementById(groupId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="bg-white">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FAF9F7] via-white to-[#FCFBF8] pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-blue-900 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-blue-900 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-blue-900 rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 md:px-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-5 md:space-y-6"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-gold-600"
            >
              Serve with Joy
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-blue-900 leading-[1.1]"
            >
              Ministries & Societies
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="max-w-2xl mx-auto text-base md:text-lg text-gray-600 font-medium"
            >
              Discover the many ways you can grow in faith, serve others, and become part of our parish family. Every member has a place.
            </motion.p>
            <motion.div variants={fadeInUp} className="pt-4 flex justify-center">
              <div className="w-20 h-0.5 bg-gold-500 rounded-full" />
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button
                onClick={() => scrollToGroup("group-Liturgical-and-Parish-Ministries")}
                className="px-8 py-3.5 bg-blue-900 text-white rounded-full font-bold hover:bg-blue-800 transition shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
              >
                Explore Ministries
              </button>
              <button
                onClick={scrollToCTA}
                className="px-8 py-3.5 border-2 border-blue-900 text-blue-900 rounded-full font-bold hover:bg-blue-50 transition hover:-translate-y-0.5 active:scale-95"
              >
                Join a Ministry
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── STATISTICS ── */}
      <section className="bg-[#FCFBF8] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          >
            {[
              { label: "Ministries", value: 25, suffix: "+" },
              { label: "Active Members", value: 500, suffix: "+" },
              { label: "Weekly Meetings", value: 12, suffix: "" },
              { label: "Open for All Ages", value: 100, suffix: "%" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="bg-white rounded-3xl p-6 shadow-sm border border-blue-50 hover:shadow-md transition-shadow"
              >
                <div className="text-3xl md:text-4xl font-black text-blue-900 mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── INTRODUCTION ── */}
      <section className="bg-white py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <h2 className="text-2xl md:text-4xl font-black text-blue-900">
              Find Where God Is Calling You
            </h2>
            <div className="w-20 h-0.5 bg-gold-500 mx-auto rounded-full my-5" />
            <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
              Whether you enjoy serving at the altar, teaching children, singing in the choir, helping the poor, or growing in prayer, there is a ministry waiting for you. Your gifts, offered in love, enrich our entire community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED MINISTRIES ── */}
      <FeaturedMinistries
        ministries={featuredMinistries}
        onScrollToCTA={scrollToCTA}
      />

      {/* ── SEARCH ── */}
      <section className="bg-white pt-20 pb-8 md:pt-28 md:pb-12">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search ministries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-10 py-3 rounded-full border border-gray-200 bg-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── GROUPED MINISTRIES ── */}
      {groupedMinistries.map(({ group, ministries: groupMinistries }) => (
        <MinistryGroup
          key={group}
          group={group}
          ministries={groupMinistries}
          onScrollToCTA={scrollToCTA}
        />
      ))}

      {/* ── CTA ── */}
      <section id="ministries-cta" className="relative bg-[#FCFBF8] py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-5xl font-black text-blue-900 mb-4">
              Ready to Serve?
            </h2>
            <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              God has given each of us unique gifts. Find where you belong and become part of our parish family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = "/contact"}
                className="px-8 py-4 border-2 border-blue-900 text-blue-900 rounded-full font-bold hover:bg-blue-50 transition hover:-translate-y-0.5 active:scale-95"
              >
                Contact Parish Office
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}