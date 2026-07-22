// app/(public)/ministries/page.tsx
import PageHeader from "@/components/layout/PageHeader";
import MinistriesContent from "./MinistriesContent";

export default function MinistriesPage() {
  return (
    <>
      <PageHeader />
      <MinistriesContent />
    </>
  );
}