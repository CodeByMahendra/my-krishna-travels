"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { destinationsData } from "@/data/destinations";

export default function DestinationsSection() {
  const [activeTab, setActiveTab] = useState<string>("All");

  const categories = [
    { label: "All", icon: "✨" },
    { label: "Spiritual", icon: "🛕" },
    { label: "Domestic", icon: "🇮🇳" },
    { label: "International", icon: "✈️" },
    { label: "Honeymoon", icon: "💍" },
  ];

  const filteredDestinations = destinationsData.filter((item) => {
    if (activeTab === "All") return true;
    if (activeTab === "Spiritual") return item.tags.includes("Spiritual") || item.tags.includes("Pilgrimage");
    if (activeTab === "Honeymoon") return item.tags.includes("Honeymoon");
    return item.category === activeTab;
  });

  return (
    <section className="py-10 sm:py-16 md:py-20 lg:py-24 bg-light-bg border-b border-brand-border">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-2 bg-light-blue text-primary-blue px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-primary-blue/10">
            <MapPin className="w-3.5 h-3.5" />
            <span>Handpicked Destinations</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-[40px] font-extrabold text-navy tracking-tight">
            Explore Popular Destinations
          </h2>
          <p className="text-xs sm:text-base text-brand-muted font-normal">
            Choose your dream destination and let us curate the perfect trip for you.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-2 pt-3 overflow-x-auto pb-1 max-w-full scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setActiveTab(cat.label)}
                className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shrink-0 transition-all duration-200 flex items-center gap-1.5 ${
                  activeTab === cat.label
                    ? "bg-primary-blue text-white shadow-xs"
                    : "bg-white text-brand-dark hover:bg-slate-100 border border-brand-border"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Destination Cards Grid - Horizontal cards on mobile, 3-col vertical on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {filteredDestinations.slice(0, 6).map((dest) => (
            <div
              key={dest.id}
              className="group bg-white rounded-xl sm:rounded-[14px] overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 border border-brand-border flex flex-row sm:flex-col justify-between"
            >
              {/* Card Image: Left thumbnail on mobile (120px-135px), Full width on desktop */}
              <div className="relative w-[125px] min-h-[135px] sm:w-full sm:min-h-0 sm:aspect-[4/3] shrink-0 bg-slate-100 overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  sizes="(max-width: 640px) 130px, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent sm:block hidden" />

                <span className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-primary-blue/95 text-white text-[9px] sm:text-xs font-semibold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-xs">
                  {dest.category}
                </span>

                {/* Visible on desktop over image */}
                <div className="absolute bottom-4 left-4 right-4 text-white hidden sm:block">
                  <h3 className="text-[20px] sm:text-[22px] font-extrabold tracking-tight text-white leading-snug">{dest.name}</h3>
                  <p className="text-xs text-slate-200 font-medium line-clamp-1">{dest.subtitle}</p>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-2.5 sm:p-5 flex flex-col justify-between flex-1 min-w-0">
                <div className="space-y-1 sm:space-y-3">
                  {/* Visible on mobile inside content body */}
                  <div className="sm:hidden">
                    <h3 className="text-sm font-black text-navy leading-snug truncate">{dest.name}</h3>
                    <p className="text-[10px] text-brand-muted font-medium truncate">{dest.subtitle}</p>
                  </div>

                  <p className="text-xs sm:text-sm text-brand-muted line-clamp-2 leading-relaxed font-normal hidden sm:block">
                    {dest.shortDescription}
                  </p>

                  {/* Highlights tags */}
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-0.5 sm:pt-1">
                    {dest.keyAttractions.slice(0, 1).map((att, idx) => (
                      <span
                        key={idx}
                        className="bg-light-blue text-navy text-[10px] sm:hidden font-semibold px-1.5 py-0.5 rounded border border-primary-blue/10 truncate max-w-full"
                      >
                        ✓ {att}
                      </span>
                    ))}
                    {dest.keyAttractions.slice(0, 2).map((att, idx) => (
                      <span
                        key={idx}
                        className="bg-light-blue text-navy text-[11px] font-semibold px-2.5 py-1 rounded-md border border-primary-blue/10 hidden sm:inline-block"
                      >
                        ✓ {att}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer - Clean Action Buttons without Price on Request */}
                <div className="pt-2 sm:pt-3 sm:border-t sm:border-brand-border/60 flex items-center justify-between gap-1.5 sm:gap-2 mt-1 sm:mt-3">
                  <Link
                    href={`/destinations/${dest.slug}`}
                    className="text-[11px] sm:text-xs font-semibold text-brand-dark hover:text-primary-blue px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Explore Guide
                  </Link>
                  <Link
                    href={`/customize?destination=${encodeURIComponent(dest.name)}`}
                    className="text-[11px] sm:text-xs font-bold bg-primary-blue hover:bg-primary-hover text-white px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg shadow-xs transition-colors flex items-center gap-1 active:scale-[0.98] whitespace-nowrap"
                  >
                    <span>Plan Trip</span>
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
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

