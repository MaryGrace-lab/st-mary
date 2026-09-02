// app/(public)/HomePageContent.tsx
import SectionSeparator from "@/components/ui/SectionSeparator";
import ScrollToTop from "@/components/ui/ScrollToTop";
import HeroSection from "@/components/sections/HeroSection";
import WelcomeSection from "@/components/sections/WelcomeSection";
import DailyFeed from "@/components/sections/DailyFeed";
import SacramentTimesSection from "@/components/sections/SacramentTimesSection";
import PriestMessageSection from "@/components/sections/PriestMessageSection";

interface HomePageProps {
  homilyData: { title: string; description: string; youtubeId: string } | null;
  readingData: {
    date: string;
    liturgicalDay: string | null;
    firstReadingTitle: string;
    firstReadingExcerpt: string;
    gospelTitle: string;
  } | null;
  setIsMobileMenuOpen: (value: boolean) => void;
}

export default function HomePage({ homilyData, readingData, setIsMobileMenuOpen }: HomePageProps) {
  return (
    <main id="main-content" className="relative min-h-screen overflow-hidden">
      <HeroSection onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
      <WelcomeSection />
      <SectionSeparator />
      <DailyFeed readingData={readingData} homilyData={homilyData} />
      <SectionSeparator />
      <SacramentTimesSection />
      <SectionSeparator />
      <PriestMessageSection />
      <ScrollToTop />
    </main>
  );
}