import React from "react";
import FAQSection from "@/components/home/FAQSection";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata = {
  title: "Frequently Asked Questions | My Krishna Travels",
  description: "Find answers to common questions regarding customized trip planning, quotations, payments, and cancellation policies.",
};

export default function FAQPage() {
  return (
    <div className="bg-light-bg min-h-screen py-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center max-w-3xl mx-auto space-y-3">
          <span className="bg-light-blue text-primary-blue px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-primary-blue/15">
            Help & Answers
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-navy tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-brand-muted text-sm sm:text-base font-normal">
            Everything you need to know about customizing your trip, hotel stays, cabs, and booking processes.
          </p>
        </div>

        <FAQSection />
      </div>

      <FinalCTA />
    </div>
  );
}

