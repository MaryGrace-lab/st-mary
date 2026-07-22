// components/ui/ScrollToTop.tsx
// ──────────────────────────────────────────────
"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 w-12 h-12 bg-blue-900 text-white rounded-xl flex items-center justify-center shadow-2xl hover:bg-blue-800 hover:scale-110 transition-all duration-300 z-50 animate-in fade-in slide-in-from-bottom-4"
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} />
    </button>
  );
}