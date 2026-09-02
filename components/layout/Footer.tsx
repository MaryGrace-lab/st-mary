// components/layout/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, ChevronRight } from "lucide-react";

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/catechism", label: "Catechism" },
  { href: "/ministries", label: "Ministries" },
  { href: "/homilies", label: "Daily Homilies" },
  { href: "/mass-booking", label: "Mass Booking" },
  { href: "/give", label: "Give Online" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-20 md:pt-24 pb-6">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-14">
          
          {/* Church Info – 4 cols */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <Image
                src="/altar-contrast.png"
                alt="St. Mary Logo"
                width={44}
                height={44}
                className="rounded-full bg-white p-0.5"
              />
              <div>
                <p className="text-white font-bold text-base">St. Mary Catholic Church</p>
                <p className="text-xs text-gray-400">Obe Quarter, Sapele Road, Benin City</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              A parish of the Catholic Archdiocese of Benin City — serving God and community through
              faith, worship, sacraments, and charity.
            </p>
            {/* Gold divider */}
            <div className="w-12 h-0.5 bg-gold-500/60 rounded-full" />
          </div>

          {/* Quick Links – 2 cols */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-gold-500 transition-colors flex items-center gap-1 group"
                  >
                    <ChevronRight className="w-3 h-3 text-gold-500/0 group-hover:text-gold-500 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact – 3 cols */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-5">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" />
                <span>Obe Quarter, Sapele Road, Benin City, Edo State, Nigeria</span>
              </li>
              <li>
                <a href="tel:+2340000000000" className="flex items-center gap-3 hover:text-gold-500 transition-colors">
                  <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                  +234 805 300 1379
                </a>
              </li>
              <li>
                <a href="mailto:stmarycatholicchurchobe@gmail.com" className="flex items-center gap-3 hover:text-gold-500 transition-colors">
                  <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                  stmarycatholicchurchobe@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Mass & Sacrament Schedule – 3 cols */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-5">Mass & Sacrament Schedule</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span className="break-words">
                  <strong className="text-white">Sunday:</strong>{" "}
                  <span className="text-red-400">All Saints:</span> 6:00am,{" "}
                  <span className="text-red-400">St. Mary:</span> 8:00am,{" "}
                  <span className="text-red-400">St. Joseph:</span> 11:00am
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gold-500 shrink-0" />
                <span><strong className="text-white">Weekdays:</strong> 6:30am (Mon-Sat)</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Adoration:</strong>{" "}
                  Mon-Thu: 6:00am, Fri: 5:00pm, Sat: 6:00am
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Confession:</strong>{" "}
                  After Weekday Masses (Mon-Sat)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Gold separator line */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} St. Mary Catholic Church, Obe Quarter. All rights reserved.</p>
          <p>
            Built by{" "}
            <a
              href="https://wa.me/2348109421176"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-500 hover:text-gold-400 transition-colors font-medium"
            >
              Mary
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}