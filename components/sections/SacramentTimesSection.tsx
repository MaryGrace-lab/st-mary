// ──────────────────────────────────────────────
// SacramentTimesSection — Displays Mass,
// Adoration, and Confession schedules in a
// three‑column grid with circular images.
// ──────────────────────────────────────────────

import Image from "next/image";

export default function SacramentTimesSection() {
  return (
    <section id="mass-times" className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        
        {/* Section heading */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-blue-900 text-center mb-12 sm:mb-16 tracking-tight">
          Sacrament Times
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-12 pb-8">
          
          {/* ── Mass Schedule ── */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="aspect-square w-full max-w-[280px] rounded-full overflow-hidden relative border-4 border-blue-100 shadow-md">
              <Image
                src="/holy-mass.jpeg"
                alt="Holy Mass"
                fill
                className="object-cover"
                sizes="450px"
              />
            </div>
            <h3 className="text-blue-900 font-black text-xl md:text-2xl mt-2 tracking-tight">
              Mass Schedule
            </h3>
            <div className="text-sm text-gray-700 font-medium space-y-1">
              {/* Content preserved exactly as provided */}
              <p><strong className="text-blue-900">Sunday:</strong> <strong className="text-red-500">All Saints: </strong> 6:00am, <strong className="text-red-500">St. Mary: </strong> 8:00am, <strong className="text-red-500">St. Joseph: </strong> 11:00am</p>
              <p><strong className="text-blue-900">Monday:</strong> 6:30am</p>
              <p><strong className="text-blue-900">Tuesday:</strong> 6:30am</p>
              <p><strong className="text-blue-900">Wednesday:</strong> 6:30am</p>
              <p><strong className="text-blue-900">Thursday:</strong> 6:30am</p>
              <p><strong className="text-blue-900">Friday:</strong> 6:30am</p>
              <p><strong className="text-blue-900">Saturday:</strong> 6:30am</p>
            </div>
          </div>

          {/* ── Adoration Schedule ── */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="aspect-square w-full max-w-[280px] rounded-full overflow-hidden relative border-4 border-blue-100 shadow-md">
              <Image
                src="/adoration.jpg"
                alt="Eucharistic Adoration"
                fill
                className="object-cover"
                sizes="450px"
              />
            </div>
            <h3 className="text-blue-900 font-black text-xl md:text-2xl mt-2 tracking-tight">
              Adoration Schedule
            </h3>
            <div className="text-sm text-gray-700 font-medium space-y-1">
              <p><strong className="text-blue-900">Monday-Thursday:</strong> 6:00am</p>
              <p><strong className="text-blue-900">Friday:</strong> 5:00pm</p>
              <p><strong className="text-blue-900">Saturday:</strong> 6:00am</p>
              <p className="text-xs text-gray-400 mt-2">
                Spend quiet time before the Blessed Sacrament.
              </p>
            </div>
          </div>

          {/* ── Confession Schedule ── */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="aspect-square w-full max-w-[280px] rounded-full overflow-hidden relative border-4 border-blue-100 shadow-md">
              <Image
                src="/confession.jpg"
                alt="Confession"
                fill
                className="object-cover"
                sizes="450px"
              />
            </div>
            <h3 className="text-blue-900 font-black text-xl md:text-2xl mt-2 tracking-tight">
              Confession Schedule
            </h3>
            <div className="text-sm text-gray-700 font-medium space-y-1">
              <p><strong className="text-blue-900">Monday-Saturday:</strong> After Weekday Masses</p>
              <p className="text-xs text-gray-400 mt-2">
                Also available by appointment. Contact the parish office.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}