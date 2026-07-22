"use client";

// components/ui/FadeInSection.tsx
// Wraps content with a fade‑in + slide‑up animation when it enters the viewport.

import { motion } from "framer-motion";
import { ReactNode } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function FadeInSection({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}