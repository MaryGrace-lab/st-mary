// ──────────────────────────────────────────────
// PriestMessageSection — Displays a welcome
// message from the parish priest with a photo.
// ──────────────────────────────────────────────

import Image from "next/image";
import Link from "next/link";

export default function PriestMessageSection() {
  return (
    <section className="bg-white py-14 md:py-24">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14 lg:gap-20">
          
          {/* Priest image */}
          <div className="w-full md:w-[42%]">
            <div className="relative h-[320px] sm:h-[400px] md:h-[540px] w-full rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/priest-portrait.jpeg"  // ✅ updated to actual priest photo
                alt="Parish Priest of St. Mary Catholic Church, Obe Quarter, Benin City"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 42vw"
                // ✅ removed unoptimized for performance
              />
            </div>
          </div>
          
          {/* Message text */}
          <div className="w-full md:w-[58%] space-y-5">
            <span className="text-blue-700 text-xs md:text-sm font-bold uppercase tracking-[0.25em]">
              Welcome
            </span>
            <h2 className="text-gray-900 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15]">
              A Charge from the Priest
            </h2>
            <p className="text-gray-600 text-[15px] md:text-base leading-relaxed">
              In the name of the clergy, religious and lay faithful of the Catholic Archdiocese of Benin
              City, I welcome you to St. Mary Catholic Church, Obe Quarter. As your shepherd, I encourage
              every parishioner to remain steadfast in faith, devoted to the sacraments, and committed to
              the mission of spreading the Gospel of our Lord Jesus Christ through love and service to one
              another.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-1 text-blue-700 font-bold text-sm uppercase tracking-wider hover:text-blue-900 hover:gap-2 transition-all"
            >
              Read Full Message <span className="text-lg">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}