// ──────────────────────────────────────────────
// Public Layout — Server Component
// Wraps all public pages (everything inside (public))
// with a shared Footer. The Header is kept on the
// homepage only for simplicity (static approach).
// ──────────────────────────────────────────────
// app/(public)/layout.tsx
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster position="top-right" richColors />
      {children}
      <Footer />
    </>
  );
}