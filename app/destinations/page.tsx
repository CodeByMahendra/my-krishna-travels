import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { destinationsData } from "@/data/destinations";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata = {
  title: "Explore Popular Travel Destinations | Domestic & International",
  description: "Browse curated travel destinations including Kashmir, Manali, Goa, Kerala, Dubai, Bali, and Maldives with My Krishna Travels.",
};

export default function DestinationsPage() {
  return (
    <div className="bg-light-bg min-h-screen py-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Destinations" }]} />

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

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {destinationsData.map((dest) => (
            <div
              key={dest.id}
              className="bg-white rounded-[14px] overflow-hidden border border-brand-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />

                  <span className="absolute top-4 left-4 bg-primary-blue text-white text-xs font-semibold px-3 py-1 rounded-full shadow-xs">
                    {dest.category}
                  </span>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-[20px] sm:text-[22px] font-extrabold text-white">{dest.name}</h3>
                    <p className="text-xs text-slate-200 font-medium">{dest.subtitle}</p>
                  </div>
                </div>

                <div className="p-5 space-y-3.5">
                  <p className="text-xs sm:text-sm text-brand-muted line-clamp-3 leading-relaxed font-normal">
                    {dest.fullDescription}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <span className="text-[11px] font-bold text-brand-muted uppercase tracking-wider block">
                      Key Highlights:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {dest.keyAttractions.map((att, i) => (
                        <span
                          key={i}
                          className="bg-light-blue text-navy text-[11px] px-2.5 py-1 rounded-md font-semibold border border-primary-blue/10"
                        >
                          • {att}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-brand-border/60 flex items-center justify-between gap-3 mt-3">
                <div>
                  <span className="text-[11px] text-brand-muted block font-medium">Starting from</span>
                  <span className="text-lg sm:text-xl font-extrabold text-navy">{dest.startingPrice}</span>
                </div>

                <Link
                  href={`/destinations/${dest.slug}`}
                  className="bg-primary-blue hover:bg-primary-hover text-white font-semibold text-xs h-[40px] px-4 rounded-[8px] shadow-xs transition-colors flex items-center gap-1.5 active:scale-[0.98]"
                >
                  <span>Explore Packages</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FinalCTA />
    </div>
  );
}

