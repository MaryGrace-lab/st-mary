"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Lock, LogIn, Church, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid username or password");
      setLoading(false);
    } else {
      router.push("/admin/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left decorative panel – hidden on small screens */}
      <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800">
        {/* Abstract geometric overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl" />
        </div>

        {/* Ornamental circle pattern */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-80 h-80 border border-white/10 rounded-full flex items-center justify-center">
            <div className="w-64 h-64 border border-white/10 rounded-full flex items-center justify-center">
              <div className="w-48 h-48 border border-white/10 rounded-full flex items-center justify-center">
                <Church className="w-20 h-20 text-white/80" strokeWidth={1} />
              </div>
            </div>
          </div>
        </div>

        {/* Welcome text */}
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl font-black tracking-tight mb-4"
          >
            St. Mary
            <br />
            Catholic Church
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-blue-200 text-sm font-medium leading-relaxed"
          >
            Secure access for parish administrators. Manage homilies, readings,
            and content with care.
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "5rem" }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="h-0.5 bg-orange-500 mt-8"
          />
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-5 py-12 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo – visible only on small screens */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <Church className="w-8 h-8 text-blue-900" />
            <span className="text-xl font-black text-blue-900">
              St. Mary Catholic Church
            </span>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl border border-blue-50 p-8 md:p-10">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-black text-blue-900">Welcome Back</h1>
              <p className="text-gray-500 text-sm mt-2">
                Sign in to your admin account
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 text-red-700 p-3 rounded-xl mb-6 text-sm border border-red-100"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  name="username"
                  type="text"
                  required
                  placeholder="Username"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-600 focus:ring-2 focus:ring-orange-100 outline-none transition bg-gray-50 hover:bg-white"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Password"
                  className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 focus:border-orange-600 focus:ring-2 focus:ring-orange-100 outline-none transition bg-gray-50 hover:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 hover:shadow-blue-900/30"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Signing in…
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Sign In
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-400">
                Protected by 256‑bit encryption • Secure parish admin panel
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}