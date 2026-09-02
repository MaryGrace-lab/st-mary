// ──────────────────────────────────────────────
// WelcomeSection — Mission statement and circular
// image introducing the church's purpose.
// ──────────────────────────────────────────────
// components/sections/WelcomeSection.tsx
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export default function WelcomeSection() {
  return (
    <section className="bg-white section-padding">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
          
          {/* Premium rounded rectangle image */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="w-full max-w-[480px] shrink-0"
          >
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10">
              <Image
                src="/altar.png"
                alt="Altar of the church"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
              {/* Subtle gold accent line */}
              <div className="absolute bottom-6 left-6 right-6 h-0.5 bg-gold-500/40 rounded-full" />
            </div>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex-1 text-center lg:text-left space-y-6"
          >
            {/* Small decorative cross */}
            <div className="flex justify-center lg:justify-start">
              <svg
                width="20"
                height="28"
                viewBox="0 0 20 28"
                fill="none"
                className="text-gold-500"
              >
                <path
                  d="M10 0V10M10 18V28M0 14H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-blue-900 tracking-tight leading-tight">
              Seeking to{" "}
              <span className="text-orange-600">know</span>
              ,{" "}
              <span className="text-orange-600">follow</span>
              , and{" "}
              <span className="text-orange-600">adore</span>
              <br />
              Jesus Christ
            </h2>

            {/* Gold divider */}
            <div className="w-16 h-0.5 bg-gold-500 rounded-full mx-auto lg:mx-0" />

            <p className="text-gray-600 font-medium text-base md:text-lg max-w-xl leading-relaxed">
              Through the Sacraments, Bible studies, and fellowship, we strive
              to provide the community with the eternal truth of our Catholic
              faith.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}