// app/(public)/mass-booking/page.tsx
import PageHeader from "@/components/layout/PageHeader";
import MassBookingForm from "./MassBookingForm";

export default function MassBookingPage() {
  return (
    <>
      <PageHeader />
      <main className="min-h-screen bg-gray-50 pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-5 md:px-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-blue-900">
              Mass Booking
            </h1>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Request a Mass to be celebrated for your special intention. Fill in
              the details below and our parish office will confirm the date.
            </p>
            <div className="mt-6 w-20 h-1 bg-orange-500 mx-auto rounded-full" />
          </div>
          <MassBookingForm />
        </div>
      </main>
    </>
  );
}