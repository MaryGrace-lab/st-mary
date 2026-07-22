// app/(public)/HomePageContent.tsx
import DailyHomily from "@/components/ui/DailyHomily";
import ScrollToTop from "@/components/ui/ScrollToTop";
import HeroSection from "@/components/sections/HeroSection";
import WelcomeSection from "@/components/sections/WelcomeSection";
import DailyReadingSection from "@/components/sections/DailyReadingSection";
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
      <DailyReadingSection readingData={readingData} />
      <section id="daily-homily">
        {homilyData ? (
          <DailyHomily {...homilyData} />
        ) : (
          <div className="bg-gray-50 py-16 md:py-24 text-center">
            <h2 className="text-2xl font-bold text-blue-900 mb-2">Daily Homily</h2>
            <p className="text-gray-500">The latest homily will appear here once it is posted.</p>
          </div>
        )}
      </section>
      <SacramentTimesSection />
      <PriestMessageSection />
      <ScrollToTop />
    </main>
  );
}