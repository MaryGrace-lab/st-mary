// components/sections/PriestMessageSection.tsx
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export default function PriestMessageSection() {
  return (
    <section className="bg-white section-padding">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Landscape image */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="w-full lg:w-[48%]"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10">
              <Image
                src="/father.jpeg"
                alt="Parish Priest of St. Mary Catholic Church, Obe Quarter, Benin City"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 48vw"
              />
              {/* Subtle gold accent at bottom */}
              <div className="absolute bottom-5 left-5 right-5 h-0.5 bg-gold-500/40 rounded-full" />
            </div>
          </motion.div>

          {/* Message text */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="w-full lg:w-[52%] space-y-6"
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

            <span className="text-blue-700 text-xs md:text-sm font-bold uppercase tracking-[0.25em]">
              Welcome
            </span>
            <h2 className="text-gray-900 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15]">
              A Charge from the Priest
            </h2>

            {/* Gold divider */}
            <div className="w-16 h-0.5 bg-gold-500 rounded-full" />

            <p className="text-gray-600 text-[15px] md:text-base leading-relaxed max-w-xl">
              In the name of the clergy, religious and royal faithful of the Catholic
              Archdiocese of Benin City, I welcome you to St. Mary Catholic Church,
              Obe Quarter. As your shepherd, I encourage every parishioner to remain
              steadfast in faith, devoted to the sacraments, and committed to the
              mission of spreading the Gospel of our Lord Jesus Christ through love
              and service to one another.
            </p>

            {/* Signature placeholder */}
            <div className="pt-2">
              <div className="inline-block border-b-2 border-blue-900 pb-1">
                <span className="text-sm text-gray-500 italic">Rev. Fr. Alphonsus Eromosele Ahiaegbe</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Parish Priest</p>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-blue-900 font-bold text-sm uppercase tracking-wider hover:text-gold-500 transition-colors group"
            >
              Read Full Message
              <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}