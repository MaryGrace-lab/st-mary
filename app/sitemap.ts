import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://stmaryobe.org", lastModified: new Date(), priority: 1.0 },
    { url: "https://stmaryobe.org/about", lastModified: new Date(), priority: 0.8 },
    { url: "https://stmaryobe.org/catechism", lastModified: new Date(), priority: 0.7 },
    { url: "https://stmaryobe.org/ministries", lastModified: new Date(), priority: 0.7 },
    { url: "https://stmaryobe.org/contact", lastModified: new Date(), priority: 0.5 },
    { url: "https://stmaryobe.org/mass-booking", lastModified: new Date(), priority: 0.8 },
    { url: "https://stmaryobe.org/give", lastModified: new Date(), priority: 0.6 },
    { url: "https://stmaryobe.org/homilies", lastModified: new Date(), priority: 0.6 },
    { url: "https://stmaryobe.org/daily-reading", lastModified: new Date(), priority: 0.6 },
  ];
}