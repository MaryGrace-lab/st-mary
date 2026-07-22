// app/(public)/about/page.tsx
import PageHeader from "@/components/layout/PageHeader";
import AboutContent from "./AboutContent";

export default function AboutPage() {
  return (
    <>
      <PageHeader />
      <AboutContent />
    </>
  );
}