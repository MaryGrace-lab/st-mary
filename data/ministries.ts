// data/ministries.ts
export interface Ministry {
  name: string;
  description: string;
  group: string;
  meetingTime?: string;
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  image?: string;
  featured?: boolean;
}

export const ministries: Ministry[] = [
  // ── Liturgical and Parish Ministries ──
  {
    name: "Altar Servers",
    description:
      "Assist the celebrant at the altar during liturgical services. They are needed for all Masses and occasional extra liturgies. Training and coaching are provided.",
    group: "Liturgical and Parish Ministries",
    contactPerson: "Parish Priest",
    contactPhone: "+234 805 300 1379",
    contactEmail: "stmarycatholicchurchobe@gmail.com",
    image: "/altar-server.jpeg",
    featured: true,
  },
  {
    name: "Lectors / Readers",
    description:
      "Proclaim the Word of God during the Liturgy of the Word. Lectors are trained to speak clearly and reverently.",
    group: "Liturgical and Parish Ministries",
    contactPerson: "Parish Priest",
    contactEmail: "stmarycatholicchurchobe@gmail.com",
    contactPhone: "+234 805 300 1379",
    image: "/lector.jpg",
  },
  {
    name: "Extraordinary Ministers of Holy Communion",
    description:
      "Assist in distributing the Eucharist during Mass and to the sick and homebound.",
    group: "Liturgical and Parish Ministries",
    meetingTime: "As scheduled",
    contactPerson: "Parish Priest",
    contactPhone: "+234 805 300 1379",
    contactEmail: "stmarycatholicchurchobe@gmail.com",
    image: "/emhc.png",
  },
  {
    name: "Music Ministry / Choir",
    description:
      "Lead the congregation in sacred hymns and liturgical singing. Choirs are present at every Mass.",
    group: "Liturgical and Parish Ministries",
    meetingTime: "Wednesdays at 6:30 PM & Saturdays at 5:00 PM",
    contactPerson: "Parish Priest",
    contactPhone: "+234 805 300 1379",
    contactEmail: "stmarycatholicchurchobe@gmail.com",
    image: "/choir.jpg",
    featured: true,
  },
  {
    name: "Ministers of Hospitality / Church Wardens / Ushers",
    description:
      "Welcome parishioners, assist with seating, and manage collections during Mass. Also responsible for maintaining the physical cleanliness and aesthetic decoration of the sanctuary.",
    group: "Liturgical and Parish Ministries",
    meetingTime: "Second Sundays of the month after Mass",
    contactPerson: "Parish Priest",
    contactPhone: "+234 805 300 1379",
    contactEmail: "stmarycatholicchurchobe@gmail.com",
    image: "/ushers.jpg",
  },
  {
    name: "Catechists",
    description:
      "Teach religious education and formation to children and adults.",
    group: "Liturgical and Parish Ministries",
    meetingTime: "Sundays at 8:00 AM (classes)",
    contactPerson: "Parish Priest",
    contactPhone: "+234 805 300 1379",
    contactEmail: "stmarycatholicchurchobe@gmail.com",
    image: "/catechist.jpg",
  },

  // ── Core Parish Organizations ──
  {
    name: "Catholic Women Organization (CWO)",
    description:
      "Unites women for spiritual growth, family guidance, and parish development.",
    group: "Core Parish Organizations",
    meetingTime: "First Saturdays at 10:00 AM",
    contactPerson: "Parish Priest",
    contactPhone: "+234 805 300 1379",
    contactEmail: "stmarycatholicchurchobe@gmail.com",
    image: "/CWO.png",
  },
  {
    name: "Catholic Men Organization (CMO)",
    description:
      "Focuses on building strong Christian fathers and supporting parish infrastructure.",
    group: "Core Parish Organizations",
    meetingTime: "Second Sundays after 11:00 AM Mass",
    contactPerson: "Parish Priest",
    contactPhone: "+234 805 300 1379",
    contactEmail: "stmarycatholicchurchobe@gmail.com",
    image: "/CMO.jpg",
  },
  {
    name: "Catholic Youth Organization (CYON)",
    description:
      "Coordinates spiritual and social activities for young people, including Bible study, sports, and outreach.",
    group: "Core Parish Organizations",
    meetingTime: "Fridays at 4:00 PM",
    contactPerson: "Parish Priest",
    contactPhone: "+234 805 300 1379",
    contactEmail: "stmarycatholicchurchobe@gmail.com",
    image: "/CYON.jpg",
  },
  {
    name: "Holy Childhood Association (MCA)",
    description:
      "Engages children early in prayer and global missionary support.",
    group: "Core Parish Organizations",
    meetingTime: "Sundays during 8:00 AM Mass (children's liturgy)",
    contactPerson: "Parish Priest",
    contactPhone: "+234 805 300 1379",
    contactEmail: "stmarycatholicchurchobe@gmail.com",
    image: "/HCA.jpg",
  },

  // ── Pious Societies and Devotional Groups ──
  {
    name: "Legion of Mary",
    description:
      "Focuses on spiritual development and active apostolic service under the patronage of Our Lady.",
    group: "Pious Societies and Devotional Groups",
    meetingTime: "Tuesdays at 5:00 PM",
    contactPerson: "Parish Priest",
    contactPhone: "+234 805 300 1379",
    contactEmail: "stmarycatholicchurchobe@gmail.com",
    image: "/legion.jpg",
  },
  {
    name: "Society of Saint Vincent de Paul",
    description:
      "Dedicated to direct, person-to-person charity work helping the poor and vulnerable.",
    group: "Pious Societies and Devotional Groups",
    meetingTime: "Sundays after 8:00 AM Mass",
    contactPerson: "Parish Priest",
    contactPhone: "+234 805 300 1379",
    contactEmail: "stmarycatholicchurchobe@gmail.com",
    image: "/svdp.jpeg",
    featured: true,
  },
  {
    name: "Catholic Charismatic Renewal",
    description:
      "Emphasizes personal encounters with Jesus and charismatic prayer.",
    group: "Pious Societies and Devotional Groups",
    meetingTime: "Thursdays at 6:00 PM",
    contactPerson: "Parish Priest",
    contactPhone: "+234 805 300 1379",
    contactEmail: "stmarycatholicchurchobe@gmail.com",
    image: "/charismatic.png",
  },
  {
    name: "Divine Mercy Society",
    description:
      "Promotes the devotion to the Divine Mercy message.",
    group: "Pious Societies and Devotional Groups",
    meetingTime: "First Fridays at 3:00 PM",
    contactPerson: "Parish Priest",
    contactPhone: "+234 805 300 1379",
    contactEmail: "stmarycatholicchurchobe@gmail.com",
    image: "/divine-mercy.jpg",
  },
  {
    name: "Sacred Heart of Jesus / Immaculate Heart of Mary",
    description:
      "Centers on devotion to Christ's Sacred Heart and the Immaculate Heart of Mary.",
    group: "Pious Societies and Devotional Groups",
    meetingTime: "First Fridays after morning Mass",
    contactPerson: "Parish Priest",
    contactPhone: "+234 805 300 1379",
    contactEmail: "stmarycatholicchurchobe@gmail.com",
    image: "/sacred-heart.jpg",
  },
  {
    name: "Block Rosary Crusade",
    description:
      "Encourages family and group recitation of the Rosary.",
    group: "Pious Societies and Devotional Groups",
    meetingTime: "Saturdays at 5:00 PM in various homes",
    contactPerson: "Parish Priest",
    contactPhone: "+234 805 300 1379",
    contactEmail: "stmarycatholicchurchobe@gmail.com",
    image: "/images.jpg",
  },
  ];

export const groups = [
  "Liturgical and Parish Ministries",
  "Core Parish Organizations",
  "Pious Societies and Devotional Groups",

];