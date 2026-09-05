import React, { Suspense } from "react";
import CustomizeTripForm from "@/components/forms/CustomizeTripForm";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata = {
  title: "Customize Your Trip | Personal Tour Planning",
  description: "Build your personalized domestic or international travel plan with My Krishna Travels. Tailored hotels, itineraries, and budget planning.",
};

export default function CustomizePage() {
  return (
    <div className="bg-light-bg min-h-screen py-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Suspense fallback={<div className="p-8 text-center text-brand-muted">Loading planner...</div>}>
            <CustomizeTripForm />
          </Suspense>
        </div>
      </div>

      <FinalCTA />
    </div>
  );
}
