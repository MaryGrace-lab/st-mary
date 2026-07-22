"use client";

// components/contact/AnimatedHero.tsx
// Animated hero section for the contact page.

import { motion } from "framer-motion";

export default function AnimatedHero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 to-blue-800 pt-40 pb-16 md:pt-44 md:pb-20">
      <div className="max-w-7xl mx-auto px-5 md:px-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight"
        >
          Get in Touch
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-blue-100/90 font-medium"
        >
          We welcome your inquiries, prayer requests, and visits. Reach out to our parish office
          or send us a message below — we would be honoured to hear from you.
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-6 w-20 h-1 bg-orange-500 mx-auto rounded-full origin-center"
        />
      </div>
    </section>
  );
}