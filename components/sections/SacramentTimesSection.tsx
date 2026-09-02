// components/sections/SacramentTimesSection.tsx
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Clock, MapPin, Church } from "lucide-react";

export default function SacramentTimesSection() {
  return (
    <section id="mass-times" className="bg-white section-padding">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        {/* Section heading */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-blue-900 tracking-tight">
            Sacrament Times
          </h2>
          <div className="gold-divider mt-4" />
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10"
        >
          {/* ── Mass Schedule ── */}
          <motion.div
            variants={fadeInUp}
            className="card-premium overflow-hidden flex flex-col group"
          >
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
              <Image
                src="/holy-mass.jpeg"
                alt="Holy Mass"
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 text-white">
                  <Church className="w-5 h-5 text-gold-500" />
                  <h3 className="text-xl font-black tracking-tight">Mass Schedule</h3>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1">
              <div className="mb-4">
                <p className="text-sm font-bold text-blue-900 mb-2">Sunday</p>
                <div className="space-y-2 text-sm text-gray-700">
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                    <strong className="text-red-500">All Saints:</strong>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      6:00am
                    </span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                    <strong className="text-red-500">St. Mary:</strong>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      8:00am
                    </span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                    <strong className="text-red-500">St. Joseph:</strong>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      11:00am
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-blue-900 mb-2">Monday – Saturday</p>
                <p className="text-sm text-gray-700 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  6:30am at St. Mary
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Adoration Schedule ── */}
          <motion.div
            variants={fadeInUp}
            className="card-premium overflow-hidden flex flex-col group"
          >
            <div className="relative h-56 overflow-hidden">
              <Image
                src="/adoration.jpg"
                alt="Eucharistic Adoration"
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 text-white">
                  <Church className="w-5 h-5 text-gold-500" />
                  <h3 className="text-xl font-black tracking-tight">Adoration Schedule</h3>
                </div>
              </div>
            </div>

            <div className="p-6 flex-1">
              <div className="space-y-2 text-sm text-gray-700 font-medium">
                <p className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <strong className="text-blue-900">Monday-Thursday:</strong> 6:00am
                </p>
                <p className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <strong className="text-blue-900">Friday:</strong> 5:00pm
                </p>
                <p className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <strong className="text-blue-900">Saturday:</strong> 6:00am
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Spend quiet time before the Blessed Sacrament.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Confession Schedule ── */}
          <motion.div
            variants={fadeInUp}
            className="card-premium overflow-hidden flex flex-col group"
          >
            <div className="relative h-56 overflow-hidden">
              <Image
                src="/confession.jpg"
                alt="Confession"
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 text-white">
                  <Church className="w-5 h-5 text-gold-500" />
                  <h3 className="text-xl font-black tracking-tight">Confession Schedule</h3>
                </div>
              </div>
            </div>

            <div className="p-6 flex-1">
              <div className="space-y-2 text-sm text-gray-700 font-medium">
                <p className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <strong className="text-blue-900">Monday-Saturday:</strong> After Weekday Masses
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Also available by appointment. Contact the parish office.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}