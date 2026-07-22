// ──────────────────────────────────────────────
// Footer — St. Mary Catholic Church
// Shows church info, quick links, contact details,
// and a summary of the Mass & Sacrament schedule.
// Uses Lucide icons for visual clarity.
// ──────────────────────────────────────────────

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

// Centralised list of quick links; easy to update
const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/sacraments", label: "Sacraments" },
  { href: "/ministries", label: "Ministries" },
  { href: "/events", label: "Events" },
  { href: "/mass-booking", label: "Mass Booking" },
  { href: "/give", label: "Give Online" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Main footer grid: Church info, Quick Links, Contact, Schedule */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          
          {/* ── Church Info (4 columns) ── */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/altar-contrast.png"
                alt="St. Mary Logo"
                width={40}
                height={40}
                className="rounded-full bg-white p-0.5"
              />
              <div>
                <p className="text-white font-bold text-sm">St. Mary Catholic Church</p>
                <p className="text-xs text-gray-400">Obe Quarter, Benin City</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              A parish of the Catholic Archdiocese of Benin City — serving God and community through
              faith, worship, sacraments, and charity.
            </p>
          </div>

          {/* ── Quick Links (2 columns) ── */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact (3 columns) ── */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-blue-400 mt-0.5 shrink-0" />
                <span>Obe Quarter, Sapele Road, Benin City, Edo State, Nigeria</span>
              </li>
              <li>
                <a href="tel:+2340000000000" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                  <Phone size={16} className="text-blue-400 shrink-0" />
                  +234 000 000 0000
                </a>
              </li>
              <li>
                <a href="mailto:stmarychurch@gmail.com" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                  <Mail size={16} className="text-blue-400 shrink-0" />
                  stmarychurch@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* ── Mass & Sacrament Schedule (3 columns) ── */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Mass & Sacrament Schedule</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {/* Sunday Masses */}
              <li className="flex items-start gap-2">
                <Clock size={16} className="text-blue-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Sunday:</strong>{" "}
                  <span className="text-red-400">All Saints:</span> 6:00am,{" "}
                  <span className="text-red-400">St. Mary:</span> 8:00am,{" "}
                  <span className="text-red-400">St. Joseph:</span> 11:00am
                </span>
              </li>
              {/* Weekday Masses */}
              <li className="flex items-center gap-2">
                <Clock size={16} className="text-blue-400 shrink-0" />
                <span><strong className="text-white">Weekdays:</strong> 6:30am (Mon-Sat)</span>
              </li>
              {/* Adoration */}
              <li className="flex items-start gap-2">
                <Clock size={16} className="text-blue-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Adoration:</strong>{" "}
                  Mon-Thu: 6:00am, Fri: 5:00pm, Sat: 6:00am
                </span>
              </li>
              {/* Confession */}
              <li className="flex items-start gap-2">
                <Clock size={16} className="text-blue-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Confession:</strong>{" "}
                  After Weekday Masses (Mon-Sat)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with copyright and creator credit */}
        <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} St. Mary Catholic Church. All rights reserved.</p>
          <p>
            Built by{" "}
            <a
              href="https://wa.me/2348109421176"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              Mary
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}