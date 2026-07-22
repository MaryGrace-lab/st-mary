// ──────────────────────────────────────────────
// Root Layout — St. Mary Catholic Church
// Obe Quarter, Benin City, Edo State, Nigeria
// Applies global fonts, metadata, and the skip-to-content link.
// ──────────────────────────────────────────────

import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

// Headings use a serif font for a reverent feel
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

// Body text uses a clean sans-serif
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// SEO and social sharing metadata
export const metadata: Metadata = {
  title: {
    default: "St. Mary Catholic Church, Obe Quarters, Benin City, Edo State, Nigeria",
    template: "%s — St. Mary Catholic Church", // allows child pages to add a custom title
  },
  description:
    "St. Mary Catholic Church, Obe Quarter, Benin City, Edo State, Nigeria. A parish of the Catholic Archdiocese of Benin City. Join us for Mass, sacraments, and community.",
  keywords: [
    "St. Mary Catholic Church",
    "Catholic Church Benin City",
    "Obe Quarter Sapele Road",
    "Catholic church Sapele Road",
    "Catholic parish Benin City",
    "Mass times Benin City",
    "Edo State Catholic",
    "Nigeria Catholic",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Apply font CSS variables and font-smoothing
    <html lang="en" className={`${playfair.variable} ${inter.variable} antialiased`}>
      <body className="min-h-screen font-sans bg-white text-gray-900">
        {/* Accessibility: skip navigation link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-900 focus:text-white focus:rounded-md"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}