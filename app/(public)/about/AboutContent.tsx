"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Church,
  Heart,
  Users,
  BookOpen,
  Cross,
  MapPin,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function AboutContent() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* ── Hero Banner ── */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-800 pt-40 pb-20 md:pt-44 md:pb-28">
        <div className="max-w-7xl mx-auto px-5 md:px-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight"
          >
            About Our Parish
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-blue-100/90 font-medium"
          >
            A community rooted in faith, growing in love, and serving the Lord
            in Obe Quarter, Benin City.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 w-20 h-1 bg-orange-500 mx-auto rounded-full origin-center"
          />
        </div>
      </section>

      {/* ── Priest's Welcome Message ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14 lg:gap-20">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="w-full md:w-[42%]"
            >
              <div className="relative h-[320px] sm:h-[400px] md:h-[540px] w-full rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/priest-portrait.jpeg"
                  alt="Parish Priest of St. Mary Catholic Church, Obe Quarter, Benin City"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 42vw"
                />
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="w-full md:w-[58%] space-y-5"
            >
              <span className="text-blue-700 text-xs md:text-sm font-bold uppercase tracking-[0.25em]">
                A Message from Our Priest
              </span>
              <h2 className="text-gray-900 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15]">
                Welcome to St. Mary Catholic Church
              </h2>
              <p className="text-gray-600 text-[15px] md:text-base leading-relaxed">
                In the name of the clergy, religious, and lay faithful of the
                Catholic Archdiocese of Benin City, I welcome you to St. Mary
                Catholic Church, Obe Quarter. As your shepherd, I encourage
                every parishioner to remain steadfast in faith, devoted to the
                sacraments, and committed to the mission of spreading the
                Gospel of our Lord Jesus Christ through love and service to one
                another.
              </p>
              <p className="text-gray-600 text-[15px] md:text-base leading-relaxed">
                Whether you are a long‑time member or visiting for the first
                time, we are delighted to have you with us. Our parish is a
                place where you can encounter Christ, grow in your faith, and
                find a family of believers who will walk with you on your
                spiritual journey.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Mission & Values ── */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-5xl font-black text-blue-900">
              Our Mission & Values
            </h2>
            <div className="mt-4 w-20 h-1 bg-orange-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Church,
                title: "Worship",
                desc: "We gather to celebrate the Holy Mass and the sacraments, giving glory to God as a united parish family.",
                color: "text-blue-900",
              },
              {
                icon: Heart,
                title: "Service",
                desc: "Inspired by Christ’s love, we reach out to the poor, the sick, and the marginalised in our community.",
                color: "text-orange-600",
              },
              {
                icon: BookOpen,
                title: "Formation",
                desc: "We nurture lifelong faith through catechesis, Bible study, and spiritual retreats for all ages.",
                color: "text-blue-900",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="bg-white rounded-2xl p-8 shadow-md border border-blue-100 text-center hover:shadow-lg transition"
              >
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Parish History ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="flex-1 space-y-6 text-center lg:text-left"
            >
              <h2 className="text-3xl md:text-5xl font-black text-blue-900 leading-tight">
                Our History
              </h2>
              <div className="w-20 h-1 bg-orange-500 rounded-full mx-auto lg:mx-0" />
              <p className="text-gray-600 text-[15px] md:text-base leading-relaxed max-w-2xl">
                St. Mary Catholic Church was founded to serve the spiritual
                needs of the faithful in Obe Quarter and its surrounding
                communities. Over the years, through the dedication of our
                priests and the generosity of our parishioners, we have grown
                from a small mission station into a vibrant parish with three
                Mass centres: All Saints, St. Mary, and St. Joseph.
              </p>
              <p className="text-gray-600 text-[15px] md:text-base leading-relaxed max-w-2xl">
                Today, our parish continues to be a beacon of faith, offering
                the sacraments, religious education, and charitable outreach
                programmes that touch countless lives. We remain committed to
                the evangelising mission entrusted to us by the Catholic
                Archdiocese of Benin City.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="w-full max-w-[450px] aspect-square rounded-full overflow-hidden relative shadow-lg border-4 border-blue-100 shrink-0"
            >
              <Image
                src="/altar.png"
                alt="St. Mary Catholic Church altar"
                fill
                className="object-cover"
                sizes="450px"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Call to Action ── */}
      <section className="py-16 md:py-24 bg-blue-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-5">
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-3xl md:text-5xl font-black mb-6"
          >
            Come and Worship With Us
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto"
          >
            We invite you to join us for Mass, participate in our ministries,
            and become part of our growing parish family. Everyone is welcome.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/mass-booking"
              className="px-8 py-3.5 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-bold transition"
            >
              Book a Mass
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 border-2 border-white/80 text-white rounded-full font-bold hover:bg-white hover:text-blue-900 transition"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}