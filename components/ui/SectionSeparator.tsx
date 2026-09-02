// components/ui/SectionSeparator.tsx
export default function SectionSeparator() {
  return (
    <div className="relative py-6 md:py-10 bg-white" aria-hidden="true">
      <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-center gap-4">
        {/* Left line */}
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
        {/* Gold cross icon */}
        <svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          className="text-gold-500 shrink-0"
        >
          <path
            d="M8 0V10M8 14V24M0 12H16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        {/* Right line */}
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
      </div>
    </div>
  );
}