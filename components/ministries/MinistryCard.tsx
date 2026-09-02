"use client";

import Image from "next/image";
import { Users, Clock, Mail, Phone, ArrowRight } from "lucide-react";
import type { Ministry } from "@/data/ministries";

export default function MinistryCard({
  ministry,
  onLearnMore,
}: {
  ministry: Ministry;
  onLearnMore: () => void;
}) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-blue-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div className="relative h-48 overflow-hidden">
        {ministry.image ? (
          <Image
            src={ministry.image}
            alt={ministry.name}
            fill
            className="object-cover group-hover:scale-105 transition duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center">
            <Users className="w-16 h-16 text-blue-300" />
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-white/90 text-blue-900 shadow-sm">
            {ministry.group}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-blue-900 mb-2">{ministry.name}</h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">{ministry.description}</p>

        <div className="space-y-2 text-sm text-gray-500 mb-5">
          {ministry.meetingTime && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-900" />
              {ministry.meetingTime}
            </div>
          )}
          {ministry.contactPerson && (
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-900" />
              {ministry.contactPerson}
            </div>
          )}
          {ministry.contactEmail && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-900" />
              <a href={`mailto:${ministry.contactEmail}`} className="hover:text-orange-600 transition">
                {ministry.contactEmail}
              </a>
            </div>
          )}
          {ministry.contactPhone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-900" />
              <a href={`tel:${ministry.contactPhone}`} className="hover:text-orange-600 transition">
                {ministry.contactPhone}
              </a>
            </div>
          )}
        </div>

        <button
          onClick={onLearnMore}
          className="inline-flex items-center gap-2 text-blue-900 font-medium text-sm hover:text-gold-600 transition group/btn"
        >
          Learn More
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>
    </div>
  );
}