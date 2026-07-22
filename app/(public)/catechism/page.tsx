// app/(public)/catechism/page.tsx
import PageHeader from "@/components/layout/PageHeader";
import CatechismContent from "./CatechismContent";

export default function CatechismPage() {
  return (
    <>
      <PageHeader />
      <main className="min-h-screen bg-gray-50 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          {/* Hero Heading */}
          <div className="text-center mb-12 pt-5">
            <h1 className="text-4xl md:text-5xl font-black text-blue-900">Catechism</h1>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              The teachings of the Catholic faith — from the Sacraments to the Commandments,
              Virtues, and Holy Mysteries. Click any section to learn more.
            </p>
            <div className="mt-6 w-20 h-1 bg-orange-500 mx-auto rounded-full" />
          </div>

          {/* Interactive Tabbed Content */}
          <CatechismContent />
        </div>
      </main>
    </>
  );
}