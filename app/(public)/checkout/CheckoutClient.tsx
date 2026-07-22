"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Copy, CheckCircle } from "lucide-react";
import { markPaymentInitiated } from "@/lib/actions/mass-booking";

interface Booking {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  intentionType: string;
  location: string;
  bookDate: Date;
  massTime: string | null;
  amount: number;
  reference: string;
}

// ⚠️ Replace with the real church bank details before going live
const CHURCH_BANK_DETAILS = {
  bankName: "First Bank",
  accountName: "St. Mary Catholic Church, Obe Quarter",
  accountNumber: "1234567890",
};

export default function CheckoutClient({ booking }: { booking: Booking }) {
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirmPayment = async () => {
    setLoading(true);
    try {
      await markPaymentInitiated(booking.id);
      setConfirmed(true);
      toast.success("Thank you! The parish office will confirm your booking shortly.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied!");
  };

  // After confirmation, show a simple success message
  if (confirmed) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-16">
        <div className="max-w-2xl mx-auto px-5">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-blue-900 mb-4">
              Payment Information Received
            </h1>
            <p className="text-gray-600 mb-6">
              The parish office will verify your transfer and confirm your booking.
              You will receive a notification once confirmed.
            </p>
            <a
              href="/"
              className="inline-block bg-blue-900 text-white px-6 py-2 rounded-lg font-medium"
            >
              Return Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-16">
      <div className="max-w-2xl mx-auto px-5">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <h1 className="text-2xl font-bold text-blue-900 mb-6">
            Complete Your Payment
          </h1>

          {/* Booking Summary */}
          <div className="space-y-4 border-b pb-6 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Name</span>
              <span className="font-medium text-blue-900">{booking.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Intention</span>
              <span className="font-medium text-blue-900">
                {booking.intentionType}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Location</span>
              <span className="font-medium text-blue-900">
                {booking.location}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date</span>
              <span className="font-medium text-blue-900">
                {new Date(booking.bookDate).toLocaleDateString("en-NG", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Mass Time</span>
              <span className="font-medium text-blue-900">
                {booking.massTime || "Not specified"}
              </span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span className="text-gray-800">Total Amount</span>
              <span className="text-blue-900">
                ₦{booking.amount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Reference</span>
              <span className="font-medium text-blue-900">
                {booking.reference}
              </span>
            </div>
          </div>

          {/* Bank Transfer Details */}
          <div className="bg-blue-50 rounded-xl p-6 mb-6">
            <h3 className="font-bold text-blue-900 mb-4">
              Bank Transfer Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Bank</span>
                <span className="font-medium text-blue-900">
                  {CHURCH_BANK_DETAILS.bankName}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Account Name</span>
                <span className="font-medium text-blue-900">
                  {CHURCH_BANK_DETAILS.accountName}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Account Number</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-blue-900 text-lg">
                    {CHURCH_BANK_DETAILS.accountNumber}
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(CHURCH_BANK_DETAILS.accountNumber)
                    }
                    className="text-orange-600 hover:text-orange-800"
                    title="Copy account number"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Amount to Pay</span>
                <span className="font-bold text-blue-900 text-lg">
                  ₦{booking.amount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Reference (use as narration)
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-blue-900 text-sm">
                    {booking.reference}
                  </span>
                  <button
                    onClick={() => copyToClipboard(booking.reference)}
                    className="text-orange-600 hover:text-orange-800"
                    title="Copy reference"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleConfirmPayment}
            disabled={loading}
            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            {loading ? "Processing..." : "I've Made This Payment"}
          </button>

          <p className="text-xs text-gray-500 mt-4 text-center">
            After clicking, the parish office will verify your transfer and
            confirm your booking. This usually takes a few hours.
          </p>
        </div>
      </div>
    </div>
  );
}