"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { destinationsData } from "@/data/destinations";

export default function DestinationsSection() {
  const [activeTab, setActiveTab] = useState<string>("All");

  const categories = ["All", "Domestic", "International", "Honeymoon"];

  const filteredDestinations = destinationsData.filter((item) => {
    if (activeTab === "All") return true;
    if (activeTab === "Honeymoon") return item.tags.includes("Honeymoon");
    return item.category === activeTab;
  });

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-light-bg border-b border-brand-border">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-light-blue text-primary-blue px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-primary-blue/10">
            <MapPin className="w-3.5 h-3.5" />
            <span>Handpicked Destinations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-navy tracking-tight">
            Explore Popular Destinations
          </h2>
          <p className="text-sm sm:text-base text-brand-muted font-normal">
            Choose your dream destination and let us curate the perfect trip for you.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-2 pt-4 overflow-x-auto pb-1 max-w-full no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold shrink-0 transition-all duration-200 ${
                  activeTab === cat
                    ? "bg-primary-blue text-white shadow-xs"
                    : "bg-white text-brand-dark hover:bg-slate-100 border border-brand-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredDestinations.slice(0, 6).map((dest) => (
            <div
              key={dest.id}
              className="group bg-white rounded-[14px] overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 border border-brand-border flex flex-col justify-between"
            >
              <div>
                {/* Card Image (Aspect Ratio 4:3) */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />

                  <span className="absolute top-4 left-4 bg-primary-blue/90 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-xs">
                    {dest.category}
                  </span>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-[20px] sm:text-[22px] font-extrabold tracking-tight text-white">{dest.name}</h3>
                    <p className="text-xs text-slate-200 font-medium">{dest.subtitle}</p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-3">
                  <p className="text-xs sm:text-sm text-brand-muted line-clamp-2 leading-relaxed font-normal">
                    {dest.shortDescription}
                  </p>

                  {/* Highlights tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {dest.keyAttractions.slice(0, 2).map((att, idx) => (
                      <span
                        key={idx}
                        className="bg-light-blue text-navy text-[11px] font-semibold px-2.5 py-1 rounded-md border border-primary-blue/10"
                      >
                        ✓ {att}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 pt-0 border-t border-brand-border/60 flex items-center justify-between gap-3 mt-3">
                <div>
                  <span className="text-[11px] text-brand-muted block font-medium">Starting from</span>
                  <span className="text-lg sm:text-xl font-bold text-navy">{dest.startingPrice}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/destinations/${dest.slug}`}
                    className="text-xs font-semibold text-brand-dark hover:text-primary-blue px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Explore
                  </Link>
                  <Link
                    href={`/customize?destination=${encodeURIComponent(dest.name)}`}
                    className="text-xs font-semibold bg-primary-blue hover:bg-primary-hover text-white px-3.5 py-2 rounded-[8px] shadow-xs transition-colors flex items-center gap-1 active:scale-[0.98]"
                  >
                    <span>Plan Trip</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 bg-primary-blue hover:bg-primary-hover text-white font-semibold h-[48px] px-7 rounded-[8px] shadow-xs transition-colors text-sm sm:text-base"
          >
            <span>Explore All Destinations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

