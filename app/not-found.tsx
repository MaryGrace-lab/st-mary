// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-5">
      <div className="text-center max-w-md">
        {/* Large 404 */}
        <p className="text-8xl md:text-9xl font-black text-blue-900">404</p>

        {/* Decorative line */}
        <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full my-6" />

        <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The page you are looking for does not exist or has been moved.
          Please check the URL or return to the homepage.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 transition"
          >
            Return Home
          </Link>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 border border-blue-900 text-blue-900 rounded-lg font-medium hover:bg-blue-50 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}