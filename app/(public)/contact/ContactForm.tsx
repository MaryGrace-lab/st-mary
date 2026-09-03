"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { sendContactMessage } from "@/lib/actions/contact";
import { User, Mail, Phone, BookOpen, MessageSquare, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to be contacted",
  }),
  honeypot: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    try {
      const result = await sendContactMessage(data);
      if (result.success) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-blue-100">
      <h2 className="text-2xl font-bold text-blue-900 mb-8 flex items-center gap-2">
        <MessageSquare className="w-6 h-6 text-orange-600" />
        Send us a message
      </h2>

      {status === "success" && (
        <div className="bg-green-50 text-green-800 p-4 rounded-lg mb-6 flex items-start gap-2">
          <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Thank you!</p>
            <p className="text-sm">Your message has been sent. We’ll get back to you soon.</p>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="bg-red-50 text-red-800 p-4 rounded-lg mb-6 flex items-start gap-2">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Oops!</p>
            <p className="text-sm">Something went wrong. Please try again.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Honeypot field */}
        <input
          type="text"
          {...register("honeypot")}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        {/* Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                {...register("name")}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none transition bg-white"
                placeholder="Your name"
              />
            </div>
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                {...register("email")}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none transition bg-white"
                placeholder="you@example.com"
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
        </div>

        {/* Phone & Subject */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Phone <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                {...register("phone")}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none transition bg-white"
                placeholder="+234 805 300 1379"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Subject <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                {...register("subject")}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none transition bg-white"
                placeholder="What is this about?"
              />
            </div>
            {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Message <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <textarea
              rows={5}
              {...register("message")}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none transition resize-none bg-white"
              placeholder="Your message..."
            />
          </div>
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
        </div>

        {/* Consent */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="consent"
            {...register("consent")}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500 cursor-pointer"
          />
          <label htmlFor="consent" className="text-sm text-gray-600 cursor-pointer">
            I consent to St. Mary Catholic Church contacting me about my enquiry.{" "}
            <span className="text-red-500">*</span>
          </label>
        </div>
        {errors.consent && <p className="text-red-500 text-xs -mt-3">{errors.consent.message}</p>}

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === "loading" && <Loader2 className="w-5 h-5 animate-spin" />}
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}