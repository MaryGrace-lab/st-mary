// ──────────────────────────────────────────────
// WelcomeSection — Mission statement and circular
// image introducing the church's purpose.
// ──────────────────────────────────────────────

import Image from "next/image";

export default function WelcomeSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-5 md:px-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        
        {/* Circular image */}
        <div className="w-full max-w-[450px] aspect-square rounded-full overflow-hidden relative shadow-lg border-4 border-blue-100 shrink-0">
          <Image
            src="/altar.png"
            alt="Altar of the church"
            fill
            className="object-cover"
            sizes="450px"
          />
        </div>

        {/* Mission statement */}
        <div className="flex-1 text-center lg:text-left">
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
          <p className="text-gray-700 font-semibold text-base md:text-lg max-w-2xl mt-6">
            Through the Sacraments, Bible studies, and fellowship, we strive to provide
            the community with the eternal truth of our Catholic faith.
          </p>
        </div>
      </div>
    </section>
  );
}