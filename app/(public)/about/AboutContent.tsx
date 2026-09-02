"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Church,
  Heart,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
} as const;

// ── Animated Counter for "Parish By The Numbers" ──
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

// ── Gallery images ──
const galleryImages = [
  { src: "/father.jpeg", alt: "Parish Priest" },
  { src: "/altar.png", alt: "Church altar" },
  { src: "/altar-server.jpeg", alt: "Altar-server"},
  { src: "/choir.jpg", alt: "choir"},
  { src: "/lector.jpg", alt: "Mass celebration" },
  { src: "/at-mass3.jpeg", alt: "Mass celebration" },
  { src: "/at-mass2.jpeg", alt: "Mass celebration" },
  { src: "/at-mass1.jpeg", alt: "Mass celebration" },
  { src: "/holy-mass.jpeg", alt: "Holy Mass" },
];

export default function AboutContent() {
  // Gallery state
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isHovered) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered]);

  useEffect(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const target = container.children[currentIndex] as HTMLElement;
    if (!target) return;
    container.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
  }, [currentIndex]);

  const scroll = (direction: "left" | "right") => {
    const newIndex =
      direction === "left"
        ? (currentIndex - 1 + galleryImages.length) % galleryImages.length
        : (currentIndex + 1) % galleryImages.length;
    setCurrentIndex(newIndex);
  };

  return (
    <main className="bg-white">
      {/* ── HERO SECTION ── */}
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <Image
          src="/altar.png"
          alt="St. Mary Catholic Church interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center px-5 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl space-y-5 md:space-y-6"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-gold-500"
            >
              ABOUT ST. MARY
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[1.05]"
            >
              About Our Parish
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="max-w-2xl mx-auto text-lg md:text-xl text-white/80 font-medium"
            >
              A community rooted in faith, growing in love, and serving the Lord
              in Obe Quarter, Benin City.
            </motion.p>
            <motion.div variants={fadeInUp} className="pt-4 flex justify-center">
              <div className="w-20 h-0.5 bg-gold-500 rounded-full" />
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/40">
          <span className="text-[11px] uppercase tracking-[0.3em] font-medium">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border-2 border-white/30 flex justify-center pt-1"
          >
            <div className="w-1 h-2 rounded-full bg-gold-500" />
          </motion.div>
        </div>
      </section>

      {/* ── PRIEST WELCOME (editorial layout with scrollable gallery) ── */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="w-full lg:w-[48%]"
            >
              <div
                className="relative -mt-10 lg:-mt-20 z-10"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div
                  ref={scrollRef}
                  className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pb-4"
                >
                  {galleryImages.map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-[4/3] h-[320px] sm:h-[400px] md:h-[540px] rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 snap-center shrink-0 w-[85%] sm:w-[70%] md:w-[60%]"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        loading="lazy"
                        sizes="(max-width: 768px) 85vw, (max-width: 1024px) 40vw, 35vw"
                      />
                      <div className="absolute bottom-5 left-5 right-5 h-0.5 bg-gold-500/40 rounded-full" />
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => scroll("left")}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition hidden md:block"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 text-blue-900" />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition hidden md:block"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 text-blue-900" />
                </button>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="w-full lg:w-[52%] space-y-6"
            >
              <div className="flex justify-center lg:justify-start">
                <svg width="18" height="26" viewBox="0 0 18 26" fill="none" className="text-gold-500">
                  <path d="M9 0V10M9 16V26M0 13H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-blue-700 text-xs md:text-sm font-bold uppercase tracking-[0.25em]">
                A Message from Our Priest
              </span>
              <h2 className="text-gray-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15]">
                Welcome to St. Mary Catholic Church
              </h2>
              <div className="w-16 h-0.5 bg-gold-500 rounded-full" />
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                In the name of the clergy, religious, and lay faithful of the
                Catholic Archdiocese of Benin City, I welcome you to St. Mary
                Catholic Church, Obe Quarter. As your shepherd, I encourage
                every parishioner to remain steadfast in faith, devoted to the
                sacraments, and committed to the mission of spreading the
                Gospel of our Lord Jesus Christ through love and service to one
                another.
              </p>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Whether you are a long‑time member or visiting for the first
                time, we are delighted to have you with us. Our parish is a
                place where you can encounter Christ, grow in your faith, and
                find a family of believers who will walk with you on your
                spiritual journey.
              </p>
              <div className="pt-2">
                <div className="inline-block border-b-2 border-blue-900 pb-1">
                  <span className="text-sm text-gray-500 italic">Rev. Fr. Alphonsus Eromosele Ahiaegbe</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Parish Priest</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VALUES (soft cream background) ── */}
      <section className="bg-[#FCFBF8] py-20 md:py-28">
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
            <div className="mt-4 w-20 h-0.5 bg-gold-500 mx-auto rounded-full" />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Church,
                title: "Worship",
                desc: "We gather to celebrate the Holy Mass and the sacraments, giving glory to God as a united parish family.",
              },
              {
                icon: Heart,
                title: "Service",
                desc: "Inspired by Christ’s love, we reach out to the poor, the sick, and the marginalised in our community.",
              },
              {
                icon: BookOpen,
                title: "Formation",
                desc: "We nurture lifelong faith through catechesis, Bible study, and spiritual retreats for all ages.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-white rounded-3xl p-8 shadow-md border border-blue-50 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-8 h-8 text-blue-900" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── OUR HISTORY (storytelling layout) ── */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
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
              <div className="w-20 h-0.5 bg-gold-500 rounded-full mx-auto lg:mx-0" />
              <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl">
                St. Mary Catholic Church was founded to serve the spiritual
                needs of the faithful in Obe Quarter and its surrounding
                communities. Over the years, through the dedication of our
                priests and the generosity of our parishioners, we have grown
                from a small mission station into a vibrant parish with three
                Mass centres: All Saints, St. Mary, and St. Joseph.
              </p>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl">
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
              className="w-full max-w-[480px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 relative"
            >
              <Image
                src="/altar.png"
                alt="St. Mary Catholic Church altar"
                fill
                className="object-cover"
                loading="lazy"
                sizes="480px"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PARISH BY THE NUMBERS ── */}
      <section className="bg-[#FCFBF8] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-5xl font-black text-blue-900">
              Parish By The Numbers
            </h2>
            <div className="mt-4 w-20 h-0.5 bg-gold-500 mx-auto rounded-full" />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center"
          >
            {[
              { label: "Parishioners", value: 1200, suffix: "+" },
              { label: "Mass Centres", value: 3 },
              { label: "Ministries", value: 25, suffix: "+"  },
              { label: "Volunteers", value: 150, suffix: "+" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="bg-white rounded-3xl p-6 shadow-sm border border-blue-50"
              >
                <div className="text-4xl md:text-5xl font-black text-blue-900 mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix || ""} />
                </div>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SCRIPTURE QUOTE ── */}
      <section className="relative py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="mx-auto mb-6 text-gold-500">
              <path d="M12 2L15 9H22L16 14L18 21L12 16L6 21L8 14L2 9H9L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <blockquote className="text-2xl md:text-4xl font-black text-blue-900 leading-snug italic">
              “Unless the Lord builds the house, the builders labour in vain.”
            </blockquote>
            <p className="mt-4 text-sm text-gray-500">Psalm 127:1</p>
          </motion.div>
        </div>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('/altar.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
      </section>

      {/* ── FINAL CTA (image background) ── */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <Image
          src="/altar.png"
          alt="Church interior"
          fill
          className="object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-4xl mx-auto px-5 text-center text-white">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2 className="text-3xl md:text-5xl font-black mb-4">Come Worship With Us</h2>
            <p className="text-lg md:text-xl text-white/80 mb-8">
              Join us this Sunday and become part of our parish family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/mass-booking"
                className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-bold transition shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
              >
                Book a Mass
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 border-2 border-white/70 text-white rounded-full font-bold hover:bg-white/10 transition hover:-translate-y-0.5 active:scale-95"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}