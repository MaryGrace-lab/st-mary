"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Users, Clock, Mail, Phone } from "lucide-react";

// ── STATIC MINISTRY DATA (edit freely) ──
interface Ministry {
  name: string;
  description: string;
  category: string;
  meetingTime?: string;
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  image?: string; // path to image in /public, e.g., "/ministries/choir.jpg"
}

const ministries: Ministry[] = [
  {
    name: "Altar Servers",
    description:
      "Altar servers are children and youth who have received their First Communion and have a relative maturity and understanding of the Mass.  They are needed for all Masses and occasional extra liturgies.  Training and coaching are provided. ",
    image: "/altar-server.jpeg",
    category: "LITURGICAL",
    meetingTime: "Saturdays at 4:00 PM (practice)",
    contactPerson: "Mr. John Ogbeide",
    contactPhone: "+234 000 000 0001",
  },
  {
    name: "Catholic Lectors Association",
    description:
      "Lectors are parishioners trained in “Professing the Word of the Lord” at Mass. You will be trained to speak clearly from the Ambo, with some projection and the correct emphasis to enhance your reading. Lectors are needed at all Masses.",
    image: "/lector.jpg",
    category: "LITURGICAL",
    meetingTime: "Monthly training on first Sundays",
    contactPerson: "Mrs. Grace Osagie",
    contactEmail: "lectors@stmaryobe.org",
  },
  {
    name: "Choir / Music Ministry",
    description:
      "Music during Mass or other liturgies is meant to create a meditative and reverent atmosphere for prayer as well as encourage congregational participation in giving thanks and praise to God.  Join us in supporting the song of the assembly!  Choirs are present at every Mass. ",
    category: "LITURGICAL",
    meetingTime: "Wednesdays at 6:30 PM & Saturdays at 5:00 PM",
    contactPerson: "Mr. Peter Edeghare",
    contactPhone: "+234 000 000 0002",
    image: "/choir.jpg", // optional
  },
  {
    name: " Ministers of Hospitality",
    description:
      "Ushers are often referred to as the Ministry of Hospitality welcome parishioners, assist with seating, and coordinate the offertory collection during Mass.",
    category: "LITURGICAL",
    meetingTime: "Second Sundays of the month after Mass",
    contactPerson: "Mrs. Agnes Omoregie",
    contactPhone: "+234 000 000 0003",
  },
  {
    name: "Legion of Mary",
    image: "/legion.jpg",
    description:
      "A worldwide association of Catholics who pray and serve the parish through spiritual works. They visit the sick, pray the Rosary, and support the pastor.",
    category: "DEVOTIONAL",
    meetingTime: "Tuesdays at 5:00 PM",
    contactPerson: "Mrs. Philomena Okojie",
    contactPhone: "+234 000 000 0004",
  },
  {
    name: "Sacred Heart of Jesus",
    image: "/sacred-heart.jpg",
    description:
      "Promotes devotion to the Sacred Heart of Jesus through First Friday devotions, holy hours, and charitable activities.",
    category: "DEVOTIONAL",
    meetingTime: "First Fridays after morning Mass",
    contactPerson: "Mr. Anthony Osawe",
    contactPhone: "+234 000 000 0005",
  },
  {
    name: "St. Vincent de Paul Society",
    image: "/st-vincent.jpg",
    description:
      "Serves the poor, the sick, and those in need within the parish community through food drives, hospital visits, and material assistance.",
    category: "CHARITABLE",
    meetingTime: "Sundays after 8:00 AM Mass",
    contactPerson: "Mr. Francis Idahosa",
    contactPhone: "+234 000 000 0006",
  },
  {
    name: "Catechist",
    description:
      "Instruct children and adults in the Catholic faith, prepare them for the sacraments, and run Sunday morning religious education.",
    category: "FAITH_FORMATION",
    meetingTime: "Sundays at 8:00 AM (classes)",
    contactPerson: "Mrs. Roseline Eghosa",
    contactPhone: "+234 000 000 0007",
  },
  {
    name: "Catholic Youth Organisation ",
    description:
      "Engages teenagers and young adults through Bible study, sports, outreach, and social events. A vibrant community for the next generation.",
    category: "CHILDREN_YOUTH",
    meetingTime: "Fridays at 4:00 PM",
    contactPerson: "Mr. Emmanuel Akenzua",
    contactPhone: "+234 000 000 0008",
  },
];

const categories = [
  { value: "ALL", label: "All" },
  { value: "LITURGICAL", label: "Liturgical" },
  { value: "DEVOTIONAL", label: "Devotional" },
  { value: "CHARITABLE", label: "Charitable" },
  { value: "FAITH_FORMATION", label: "Faith Formation" },
  { value: "SOCIAL", label: "Social" },
  { value: "CHILDREN_YOUTH", label: "Children & Youth" },
];

export default function MinistriesContent() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filtered = useMemo(() => {
    return ministries.filter((m) => {
      const matchesSearch =
        !search.trim() ||
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === "ALL" || m.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-800 pt-40 pb-20 md:pt-44 md:pb-28">
        <div className="max-w-7xl mx-auto px-5 md:px-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight">
            Our Ministries & Societies
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-blue-100/90 font-medium">
            Discover how you can serve God and the community through our vibrant
            parish ministries. There is a place for everyone.
          </p>
          <div className="mt-6 w-20 h-1 bg-orange-500 mx-auto rounded-full" />
        </div>
      </section>

      {/* Ministries Grid */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          {/* Search */}
          <div className="relative mb-8 max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search ministries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-blue-200 bg-white shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeCategory === cat.value
                    ? "bg-blue-900 text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-blue-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-lg font-medium">No ministries found.</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filtered.map((ministry, index) => (
                  <motion.div
                    key={ministry.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden hover:shadow-xl transition group"
                  >
                    {ministry.image ? (
                      <div className="h-48 w-full relative overflow-hidden">
                        <img
                          src={ministry.image}
                          alt={ministry.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                      </div>
                    ) : (
                      <div className="h-48 w-full bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center">
                        <Users className="w-16 h-16 text-blue-300" />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-blue-900 mb-2">{ministry.name}</h3>
                      <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-700 mb-3">
                        {categories.find((c) => c.value === ministry.category)?.label}
                      </span>
                      <p className="text-gray-600 text-sm mb-4">{ministry.description}</p>
                      {ministry.meetingTime && (
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                          <Clock className="w-4 h-4 text-blue-900" />
                          {ministry.meetingTime}
                        </div>
                      )}
                      {ministry.contactPerson && (
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                          <Users className="w-4 h-4 text-blue-900" />
                          {ministry.contactPerson}
                        </div>
                      )}
                      {ministry.contactEmail && (
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                          <Mail className="w-4 h-4 text-blue-900" />
                          <a href={`mailto:${ministry.contactEmail}`} className="hover:text-orange-600">
                            {ministry.contactEmail}
                          </a>
                        </div>
                      )}
                      {ministry.contactPhone && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Phone className="w-4 h-4 text-blue-900" />
                          <a href={`tel:${ministry.contactPhone}`} className="hover:text-orange-600">
                            {ministry.contactPhone}
                          </a>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}