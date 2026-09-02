"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendMassBooking } from "@/lib/actions/mass-booking";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  BookOpen,
  MessageSquare,
  AlertCircle,
  Loader2,
  MapPin,
} from "lucide-react";

const massBookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().min(10, "Phone number is required (at least 10 digits)"),
  intentionType: z.enum(
    [
      "THANKSGIVING",
      "ANNIVERSARY",
      "BIRTHDAY",
      "SPECIAL_INTENTIONS",
      "MEMORIAL",
      "SOULS_DEPARTED",
      "CHILD_DEDICATION",
      "HEALING",
      "OTHER",
    ],
    { message: "Please select an intention type" }
  ),
  location: z.enum(
    ["All Saints: 6:00am", "St. Mary: 8:00am", "St. Joseph: 11:00am"],
    { message: "Please select a parish location" }
  ),
  bookDate: z
    .string()
    .refine((val) => new Date(val) > new Date(), {
      message: "Date must be in the future",
    }),
  massTime: z.string().optional(),
  namesToPrayFor: z.string().optional(),
  additionalInfo: z.string().optional(),
  amount: z.number().min(500, "Minimum amount is ₦500"),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to be contacted",
  }),
  honeypot: z.string().optional(),
});

type MassBookingFormData = z.infer<typeof massBookingSchema>;

const intentionTypes = [
  { value: "THANKSGIVING", label: "Thanksgiving" },
  { value: "ANNIVERSARY", label: "Anniversary" },
  { value: "BIRTHDAY", label: "Birthday" },
  { value: "SPECIAL_INTENTIONS", label: "Special Intentions" },
  { value: "MEMORIAL", label: "Memorial Mass" },
  { value: "SOULS_DEPARTED", label: "Souls of the Faithful Departed" },
  { value: "CHILD_DEDICATION", label: "Child Dedication" },
  { value: "HEALING", label: "Healing" },
  { value: "OTHER", label: "Other" },
];

const locations = [
  { value: "All Saints: 6:00am", label: "All Saints – 6:00 AM" },
  { value: "St. Mary: 8:00am", label: "St. Mary – 8:00 AM" },
  { value: "St. Joseph: 11:00am", label: "St. Joseph – 11:00 AM" },
];

export default function MassBookingForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MassBookingFormData>({
    resolver: zodResolver(massBookingSchema),
    defaultValues: { amount: 500 },
  });

  const onSubmit = async (data: MassBookingFormData) => {
    setStatus("loading");
    try {
      const result = await sendMassBooking(data);
      if (result.success && result.bookingId) {
        router.push(`/checkout?bookingId=${result.bookingId}`);
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
        <BookOpen className="w-6 h-6 text-orange-600" />
        Request a Mass
      </h2>

      {status === "error" && (
        <div className="bg-red-50 text-red-800 p-4 rounded-lg mb-6 flex items-start gap-2">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-sm">Something went wrong. Please try again later.</p>
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

        {/* Name & Phone */}
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
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email Address <span className="text-gray-400">(optional)</span>
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

        {/* Intention Type & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Mass Intention <span className="text-red-500">*</span>
            </label>
            <select
              {...register("intentionType")}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none bg-white"
            >
              <option value="">Select intention...</option>
              {intentionTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.intentionType && <p className="text-red-500 text-xs mt-1">{errors.intentionType.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Location <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                {...register("location")}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none bg-white appearance-none"
              >
                <option value="">Select parish...</option>
                {locations.map((loc) => (
                  <option key={loc.value} value={loc.value}>
                    {loc.label}
                  </option>
                ))}
              </select>
            </div>
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
          </div>
        </div>

        {/* Book Date & Mass Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Book Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                {...register("bookDate")}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none bg-white"
              />
            </div>
            {errors.bookDate && <p className="text-red-500 text-xs mt-1">{errors.bookDate.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Mass Time <span className="text-gray-400">(optional)</span>
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="time"
                {...register("massTime")}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none bg-white"
              />
            </div>
            {errors.massTime && <p className="text-red-500 text-xs mt-1">{errors.massTime.message}</p>}
          </div>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Amount <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
              ₦
            </span>
            <input
              type="number"
              min={500}
              step={100}
              {...register("amount", { valueAsNumber: true })}
              className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none transition bg-white"
              placeholder="500"
            />
          </div>
          {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>}
          <p className="text-xs text-gray-400 mt-1">
            Minimum ₦500. You can increase if you wish.
          </p>
        </div>

        {/* Names to Pray For */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Names to Pray For <span className="text-gray-400">(optional)</span>
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <textarea
              rows={2}
              {...register("namesToPrayFor")}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none transition resize-none bg-white"
              placeholder="List the names of those you want prayed for"
            />
          </div>
        </div>

        {/* Additional Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Additional Information{" "}
            <span className="text-gray-400">(optional)</span>
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <textarea
              rows={3}
              {...register("additionalInfo")}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none transition resize-none bg-white"
              placeholder="Any other details..."
            />
          </div>
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
            I consent to the parish office contacting me about this Mass
            booking. <span className="text-red-500">*</span>
          </label>
        </div>
        {errors.consent && <p className="text-red-500 text-xs -mt-3">{errors.consent.message}</p>}

        {/* Submit & Pay */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === "loading" && <Loader2 className="w-5 h-5 animate-spin" />}
          {status === "loading" ? "Submitting..." : "Submit & Pay"}
        </button>
      </form>
    </div>
  );
}