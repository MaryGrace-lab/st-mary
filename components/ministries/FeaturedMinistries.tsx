"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users, ArrowRight } from "lucide-react";
import type { Ministry } from "@/data/ministries";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
} as const;

export default function FeaturedMinistries({
  ministries,
  onScrollToCTA,
}: {
  ministries: Ministry[];
  onScrollToCTA: () => void;
}) {
  if (ministries.length === 0) return null;

  return (
    <section className="bg-[#FCFBF8] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-black text-blue-900">
            Featured Ministries
          </h2>
          <div className="w-20 h-0.5 bg-gold-500 mx-auto rounded-full mt-4" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {ministries.map((ministry) => (
            <motion.div
              key={ministry.name}
              variants={fadeInUp}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-blue-50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="relative h-56 overflow-hidden">
                {ministry.image ? (
                  <Image
                    src={ministry.image}
                    alt={ministry.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center">
                    <Users className="w-16 h-16 text-blue-300" />
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-white/90 text-blue-900 shadow-sm">
                    {ministry.group}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-2">{ministry.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">{ministry.description}</p>
                <button
                  onClick={onScrollToCTA}
                  className="inline-flex items-center gap-2 text-blue-900 font-medium text-sm hover:text-gold-600 transition group/btn"
                >
                  Join this Ministry
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}