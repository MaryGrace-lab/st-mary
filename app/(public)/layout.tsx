// ──────────────────────────────────────────────
// Public Layout — Server Component
// Wraps all public pages (everything inside (public))
// with a shared Footer. The Header is kept on the
// homepage only for simplicity (static approach).
// ──────────────────────────────────────────────

import Footer from "@/components/layout/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Main content of each page */}
      {children}
      {/* Footer appears on every public page */}
      <Footer />
    </>
  );
}