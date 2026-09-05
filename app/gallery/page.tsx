import React from "react";
import GallerySection from "@/components/home/GallerySection";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata = {
  title: "Travel Photo Gallery",
  description: "Browse scenic travel photos, mountains, beaches, and luxury houseboats captured during My Krishna Travels trips.",
};

export default function GalleryPage() {
  return (
    <div className="bg-light-bg min-h-screen py-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center max-w-3xl mx-auto space-y-3">
          <span className="bg-light-blue text-primary-blue px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-primary-blue/15">
            Visual Inspiration
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-navy tracking-tight">
            Moments Worth Travelling For
          </h1>
          <p className="text-brand-muted text-sm sm:text-base font-normal">
            Explore scenic views, mountain landscapes, pristine beaches, and cultural landmarks.
          </p>
        </div>

        <GallerySection />
      </div>

      <FinalCTA />
    </div>
  );
}

