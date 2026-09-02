// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://stmaryobe.org"),   // change to your domain
  title: {
    default: "St. Mary Catholic Church – Obe Quarter, Benin City",
    template: "%s | St. Mary Catholic Church",
  },
  description:
    "St. Mary Catholic Church, Obe Quarter, Sapele Road, Benin City. Join us for Mass, sacraments, ministries, and daily homilies. A parish of the Catholic Archdiocese of Benin City.",
  keywords: [
    "St. Mary Catholic Church",
    "Catholic Church Benin City",
    "Obe Quarter Catholic Church",
    "Catholic parish Benin City",
    "Mass times Benin City",
    "Edo State Catholic",
    "Nigeria Catholic",
    "Daily homilies",
    "Catechism",
    "Sacraments",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://stmaryobe.org",
    siteName: "St. Mary Catholic Church",
    title: "St. Mary Catholic Church – Obe Quarter, Benin City",
    description:
      "A parish of the Catholic Archdiocese of Benin City. Join us for Mass, sacraments, and community.",
    images: [
      {
        url: "/og-image.jpg",         // create an image 1200×630 px in public/
        width: 1200,
        height: 630,
        alt: "St. Mary Catholic Church",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "St. Mary Catholic Church – Obe Quarter, Benin City",
    description:
      "A parish of the Catholic Archdiocese of Benin City. Join us for Mass, sacraments, and community.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#1e3a8a",   // blue-900
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} antialiased`}>
      <body className="min-h-screen font-sans bg-white text-gray-900">
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