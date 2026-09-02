"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Loader2, CheckCircle, AlertCircle, Heart, Banknote, Home, Cross } from "lucide-react";
import { notifyDonation } from "@/lib/actions/give";
import { toast } from "sonner";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// ⚠️ Replace with the real church bank details
const BANK_DETAILS = {
  bankName: "Zenith Bank",
  accountName: "St. Mary Catholic Church, Obe",
  accountNumber: "1015256219",
};

export default function GiveContent() {
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [purpose, setPurpose] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const copyToClipboard = async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      toast.success("Copied!");
    } catch {
      toast.error("Could not copy. Please copy manually.");
    }
  };

  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount) {
      toast.error("Please fill your name and amount.");
      return;
    }
    setFormStatus("loading");
    try {
      await notifyDonation({ name, email, amount: Number(amount), purpose, message });
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-800 pt-40 pb-20 md:pt-44 md:pb-28">
        <div className="max-w-7xl mx-auto px-5 md:px-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight"
          >
            Give
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-blue-100/90 font-medium"
          >
            Your generosity fuels the mission of the Church. Support our parish
            through your tithes, offerings, and donations.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 w-20 h-1 bg-orange-500 mx-auto rounded-full origin-center"
          />
        </div>
      </section>

      {/* Bank Details + Notify Us (side by side) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Bank Transfer Details (left) */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="bg-gray-50 rounded-2xl p-6 md:p-8 shadow-md border border-blue-100"
            >
              <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Banknote className="w-6 h-6 text-orange-600" />
                Bank Transfer Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Bank</span>
                  <span className="font-medium text-blue-900">{BANK_DETAILS.bankName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Account Name</span>
                  <span className="font-medium text-blue-900">{BANK_DETAILS.accountName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Account Number</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-blue-900 text-lg break-all">
                      {BANK_DETAILS.accountNumber}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(BANK_DETAILS.accountNumber)}
                      className="text-orange-600 hover:text-orange-800"
                      title="Copy account number"
                      aria-label="Copy account number"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Please use your name and the purpose of the donation as the
                narration. After transferring, you can notify us using the form.
              </p>
            </motion.div>

            {/* Notify Us Form (right) */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
                <Cross className="w-6 h-6 text-orange-600" />
                Notify Us of Your Donation
              </h2>

              {formStatus === "success" && (
                <div className="bg-green-50 text-green-800 p-4 rounded-lg mb-6 flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Thank You!</p>
                    <p className="text-sm">The parish office will acknowledge your donation. God bless you.</p>
                  </div>
                </div>
              )}
              {formStatus === "error" && (
                <div className="bg-red-50 text-red-800 p-4 rounded-lg mb-6 flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p className="text-sm">Something went wrong. Please try again later.</p>
                </div>
              )}

              <form onSubmit={handleNotify} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="e.g., John Omoregie"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-gray-400">(optional)</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount (₦) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min={100}
                      step={100}
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                      placeholder="5000"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Purpose
                    </label>
                    <select
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none bg-white"
                    >
                      <option value="">Select purpose…</option>
                      <option value="Sunday Offertory">Sunday Offertory</option>
                      <option value="Tithe">Tithe</option>
                      <option value="Building Project">Building Project</option>
                      <option value="Thanksgiving Offering">Thanksgiving Offering</option>
                      <option value="Mission Appeal">Mission Appeal</option>
                      <option value="Charity Donation">Charity Donation</option>
                      <option value="Parish Development Fund">Parish Development Fund</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-gray-400">(optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Any additional information…"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {formStatus === "loading" && <Loader2 className="w-5 h-5 animate-spin" />}
                  {formStatus === "loading" ? "Sending…" : "I've Made This Donation"}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why We Give (full width below) */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-5xl font-black text-blue-900 text-center">
              Why We Give
            </h2>
            <div className="w-20 h-1 bg-orange-500 rounded-full mx-auto" />
            <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-center">
              Giving is an act of worship and trust in God. Your contributions
              help maintain our church buildings, support our priests, fund
              charitable outreach, and spread the Gospel. Every naira given in
              faith returns a hundredfold in grace.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              {[
                { icon: Heart, label: "Sunday Offertory" },
                { icon: Banknote, label: "Tithes & Offerings" },
                { icon: Home, label: "Building Fund" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-center gap-2 text-blue-900 font-medium bg-white rounded-2xl p-4 shadow-sm border border-blue-50">
                  <item.icon className="w-5 h-5 text-orange-600" />
                  {item.label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}