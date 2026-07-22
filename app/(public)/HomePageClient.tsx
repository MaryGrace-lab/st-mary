"use client";

import { useState } from "react";
import HomePage from "./HomePageContent";
import MobileMenu from "@/components/ui/MobileMenu";

interface HomePageClientProps {
  homilyData: { title: string; description: string; youtubeId: string } | null;
  readingData: {
    date: string;
    liturgicalDay: string | null;
    firstReadingTitle: string;
    firstReadingExcerpt: string;
    gospelTitle: string;
  } | null;
}

export default function HomePageClient({ homilyData, readingData }: HomePageClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <HomePage
        homilyData={homilyData}
        readingData={readingData}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}