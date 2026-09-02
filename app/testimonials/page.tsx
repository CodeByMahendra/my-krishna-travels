import React from "react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata = {
  title: "Traveller Testimonials & Reviews",
  description: "Read genuine feedback and experiences from travellers who planned their trips with My Krishna Travels.",
};

export default function TestimonialsPage() {
  return (
    <div className="bg-light-bg min-h-screen py-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Testimonials" }]} />

        <div className="mb-12 text-center max-w-3xl mx-auto space-y-3">
          <span className="bg-light-blue text-primary-blue px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-primary-blue/15">
            Verified Feedback
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-navy tracking-tight">
            Traveller Stories & Reviews
          </h1>
          <p className="text-brand-muted text-sm sm:text-base font-normal">
            See how we helped couples, families, and groups create unforgettable travel memories.
          </p>
        </div>

        <TestimonialsSection />
      </div>

      <FinalCTA />
    </div>
  );
}

