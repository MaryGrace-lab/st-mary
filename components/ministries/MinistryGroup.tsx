"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import MinistryCard from "./MinistryCard";
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

const INITIAL_VISIBLE = 6;

export default function MinistryGroup({
  group,
  ministries,
  onScrollToCTA,
}: {
  group: string;
  ministries: Ministry[];
  onScrollToCTA: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  const visibleMinistries = expanded
    ? ministries
    : ministries.slice(0, INITIAL_VISIBLE);
  const hasMore = ministries.length > INITIAL_VISIBLE;

  return (
    <section
      id={`group-${group.replace(/\s+/g, "-")}`}
      className="bg-white pb-16 md:pb-24"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          className="mb-10"
        >
          <h2 className="text-3xl md:text-5xl font-black text-blue-900 text-center">{group}</h2>
          <div className="w-20 h-0.5 bg-gold-500 mx-auto rounded-full mt-4" />
        </motion.div>

        {ministries.length === 0 ? (
          <p className="text-center text-gray-500">No ministries match your search in this group.</p>
        ) : (
          <>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {visibleMinistries.map((ministry) => (
                <MinistryCard
                  key={ministry.name}
                  ministry={ministry}
                  onLearnMore={onScrollToCTA}
                />
              ))}
            </motion.div>

            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  type="button"
                  onClick={() => setExpanded((prev) => !prev)}
                  className="flex items-center gap-2 px-6 py-3 border-2 border-blue-900 text-blue-900 rounded-full font-bold hover:bg-blue-50 transition hover:-translate-y-0.5 active:scale-95"
                >
                  {expanded ? "Show Less" : "Load More"}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}