import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { destinationsData } from "@/data/destinations";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata = {
  title: "Explore Popular Travel Destinations | Domestic & International",
  description: "Browse curated travel destinations including Kashmir, Manali, Goa, Kerala, Dubai, Bali, and Maldives with My Krishna Travels.",
};

export default function DestinationsPage() {
  return (
    <div className="bg-light-bg min-h-screen py-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Banner */}
        <div className="bg-navy text-white rounded-[14px] p-8 sm:p-12 mb-12 relative overflow-hidden shadow-card">
          <div className="absolute inset-0 opacity-30">
            <Image
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
              alt="Destinations Banner"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="bg-white/15 text-bright-blue text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
              Explore The World
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight">
              Popular Travel Destinations
            </h1>
            <p className="text-sm sm:text-base text-slate-200 font-normal">
              Select your favorite destination and let our travel experts curate a 100% customized tour package for you.
            </p>
          </div>
        </div>

        {/* Destinations Grid - Horizontal on mobile, 3-col on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8 mb-16">
          {destinationsData.map((dest) => (
            <div
              key={dest.id}
              className="bg-white rounded-xl sm:rounded-[14px] overflow-hidden border border-brand-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 flex flex-row sm:flex-col justify-between group"
            >
              {/* Image thumbnail on mobile (125px), full width on desktop */}
              <div className="relative w-[125px] min-h-[140px] sm:w-full sm:min-h-0 sm:aspect-[4/3] shrink-0 bg-slate-100 overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  sizes="(max-width: 768px) 130px, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent sm:block hidden" />

                <span className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-primary-blue text-white text-[9px] sm:text-xs font-semibold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-xs">
                  {dest.category}
                </span>

                <div className="absolute bottom-4 left-4 right-4 text-white hidden sm:block">
                  <h3 className="text-[20px] sm:text-[22px] font-extrabold text-white">{dest.name}</h3>
                  <p className="text-xs text-slate-200 font-medium">{dest.subtitle}</p>
                </div>
              </div>

              {/* Body */}
              <div className="p-2.5 sm:p-5 flex flex-col justify-between flex-1 min-w-0">
                <div className="space-y-1 sm:space-y-3.5">
                  <div className="sm:hidden">
                    <h3 className="text-sm font-black text-navy leading-snug truncate">{dest.name}</h3>
                    <p className="text-[10px] text-brand-muted font-medium truncate">{dest.subtitle}</p>
                  </div>

                  <p className="text-xs sm:text-sm text-brand-muted line-clamp-2 leading-relaxed font-normal hidden sm:block">
                    {dest.fullDescription}
                  </p>

                  <div className="space-y-1 sm:space-y-1.5 pt-0.5 sm:pt-2">
                    <span className="text-[10px] sm:text-[11px] font-bold text-brand-muted uppercase tracking-wider hidden sm:block">
                      Key Highlights:
                    </span>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5">
                      {dest.keyAttractions.slice(0, 1).map((att, i) => (
                        <span
                          key={i}
                          className="bg-light-blue text-navy text-[10px] sm:hidden px-1.5 py-0.5 rounded font-semibold border border-primary-blue/10 truncate max-w-full"
                        >
                          • {att}
                        </span>
                      ))}
                      {dest.keyAttractions.slice(0, 3).map((att, i) => (
                        <span
                          key={i}
                          className="bg-light-blue text-navy text-[11px] px-2.5 py-1 rounded-md font-semibold border border-primary-blue/10 hidden sm:inline-block"
                        >
                          • {att}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 sm:pt-3 sm:border-t sm:border-brand-border/60 flex items-center justify-between gap-2 mt-1 sm:mt-3">
                  <span className="text-[10px] sm:text-xs text-brand-muted font-medium">
                    100% Customized Tour
                  </span>

                  <Link
                    href={`/destinations/${dest.slug}`}
                    className="bg-primary-blue hover:bg-primary-hover text-white font-semibold text-[10px] sm:text-xs h-[30px] sm:h-[38px] px-3 sm:px-4 rounded-lg shadow-xs transition-colors flex items-center gap-1 active:scale-[0.98] whitespace-nowrap"
                  >
                    <span>Explore Packages</span>
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FinalCTA />
    </div>
  );
}

