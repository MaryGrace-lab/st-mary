// app/(public)/contact/page.tsx
// Server component – uses smaller client components for animations and gallery.

import PageHeader from "@/components/layout/PageHeader";
import HeroBanner from "@/components/contact/HeroBanner";
import ContactForm from "./ContactForm";
import ContactInfoCard from "@/components/contact/ContactInfoCard";
import Image from "next/image";
import { MapPin, ExternalLink } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <PageHeader />

      <HeroBanner />

      {/* ── Main Contact Section ── */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* ContactForm is already a client component */}
            <ContactForm />

            {/* Animated info card with gallery */}
            <ContactInfoCard />
          </div>
        </div>
      </section>

      {/* ── Map & Directions (static) ── */}
      <section className="relative bg-white py-0">
        <div className="relative h-[400px] md:h-[500px] w-full">
          <Image
            src="/altar.png"
            alt="Church location"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white px-5">
            <MapPin className="w-12 h-12 text-orange-500 mb-4" />
            <h2 className="text-3xl md:text-4xl font-black mb-2">Find Us</h2>
            <p className="text-center text-sm md:text-base text-gray-200 max-w-md mb-6">
              We are located at Obe Quarter, Sapele Road, Benin City. Join us for Mass
              or stop by the parish office.
            </p>
            <a
              href="https://maps.google.com/?q=St+Mary+Catholic+Church+Obe+Quarter+Sapele+Road+Benin+City"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-full transition-colors"
            >
              Get Directions
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}