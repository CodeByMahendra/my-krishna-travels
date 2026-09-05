import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Check, ArrowRight } from "lucide-react";
import { tourPackagesData } from "@/data/packages";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata = {
  title: "Tour Packages & Customized Holiday Trips",
  description: "Explore customized domestic and international tour packages for Kashmir, Manali, Goa, Kerala, Dubai, Bali, and Maldives.",
};

interface Props {
  searchParams?: Promise<{ theme?: string }>;
}

export default async function PackagesPage({ searchParams }: Props) {
  const resolvedParams = searchParams ? await searchParams : {};
  const isSpiritual = resolvedParams.theme?.toLowerCase() === "pilgrimage";

  const spiritualPackages = tourPackagesData.filter(
    (p) => p.tripType.includes("Pilgrimage") || p.tripType.includes("Spiritual")
  );
  const displayPackages = isSpiritual ? spiritualPackages : tourPackagesData;

  return (
    <div className="bg-light-bg min-h-screen py-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Banner */}
        <div className="bg-navy text-white rounded-2xl sm:rounded-[14px] p-5 sm:p-10 lg:p-12 mb-6 sm:mb-8 relative overflow-hidden shadow-card">
          <div className="absolute inset-0 opacity-30">
            <Image
              src={
                isSpiritual
                  ? "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1600&q=80"
                  : "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1600&q=80"
              }
              alt="Packages Banner"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10 max-w-2xl space-y-2.5 sm:space-y-3">
            <span className="bg-white/15 text-bright-blue text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {isSpiritual ? "🛕 Sacred Pilgrimage & Darshan" : "Popular Tour Packages"}
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight">
              {isSpiritual ? "Spiritual Yatra Packages" : "Handcrafted Travel Packages"}
            </h1>
            <p className="text-xs sm:text-base text-slate-200 font-normal">
              {isSpiritual
                ? "Experience divine blessings with VIP darshan assistance, comfortable stays, and dedicated private cabs for Mathura-Vrindavan, Mahakal, Omkareshwar, Kashi, Ayodhya, Dwarka, and Kedarnath."
                : "Thoughtfully curated itineraries designed for families, couples, honeymooners, and groups. Every package can be 100% customized."}
            </p>
          </div>
        </div>

        {/* Filter Navigation Chips */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 mb-8 scrollbar-none">
          <Link
            href="/packages"
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              !isSpiritual
                ? "bg-primary-blue text-white shadow-xs"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-brand-border"
            }`}
          >
            All Tour Packages ({tourPackagesData.length})
          </Link>

          <Link
            href="/packages?theme=pilgrimage"
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              isSpiritual
                ? "bg-primary-blue text-white shadow-xs ring-2 ring-primary-blue/20"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-brand-border"
            }`}
          >
            <span>🛕 Spiritual Yatra ({spiritualPackages.length})</span>
            <span className="bg-amber-400 text-slate-900 text-[10px] px-1.5 py-0.2 rounded-full font-extrabold">
              Popular
            </span>
          </Link>
        </div>

        {/* Packages Grid - Horizontal on mobile, 3-col on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8 mb-16">
          {displayPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-xl sm:rounded-[14px] overflow-hidden border border-brand-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 flex flex-row sm:flex-col justify-between group"
            >
              {/* Thumbnail on mobile (125px), full width on desktop */}
              <div className="relative w-[125px] min-h-[145px] sm:w-full sm:min-h-0 sm:aspect-[4/3] shrink-0 bg-slate-100 overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  sizes="(max-width: 768px) 130px, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent sm:block hidden" />

                <span className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-primary-blue text-white text-[9px] sm:text-xs font-semibold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-xs">
                  {pkg.duration}
                </span>

                <span className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/95 backdrop-blur-md text-navy text-[9px] sm:text-xs font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-xs hidden xs:inline-block">
                  {pkg.category}
                </span>

                <div className="absolute bottom-3 left-4 text-white items-center gap-1.5 text-xs font-semibold bg-navy/60 backdrop-blur-md px-3 py-1 rounded-md hidden sm:flex">
                  <MapPin className="w-3.5 h-3.5 text-bright-blue" />
                  <span>{pkg.destination}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-2.5 sm:p-5 flex flex-col justify-between flex-1 min-w-0">
                <div className="space-y-1 sm:space-y-3.5">
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-primary-blue sm:hidden">
                    <MapPin className="w-2.5 h-2.5 shrink-0" />
                    <span className="truncate">{pkg.destination}</span>
                  </div>

                  <h3 className="text-sm sm:text-xl font-bold text-navy group-hover:text-primary-blue transition-colors line-clamp-1">
                    {pkg.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-muted line-clamp-2 leading-relaxed font-normal hidden sm:block">
                    {pkg.description}
                  </p>

                  <div className="space-y-0.5 sm:space-y-1.5 pt-0.5 sm:pt-3 sm:border-t sm:border-brand-border/60">
                    <span className="text-[10px] sm:text-[11px] font-bold text-brand-muted uppercase tracking-wider hidden sm:block">
                      Highlights:
                    </span>
                    {pkg.highlights.slice(0, 1).map((hl, idx) => (
                      <div key={idx} className="flex items-start gap-1 text-[10px] sm:hidden text-brand-dark font-medium">
                        <Check className="w-3 h-3 text-primary-blue mt-0.5 shrink-0" />
                        <span className="truncate">{hl}</span>
                      </div>
                    ))}
                    {pkg.highlights.slice(0, 2).map((hl, idx) => (
                      <div key={idx} className="items-start gap-2 text-xs text-brand-dark font-medium hidden sm:flex">
                        <Check className="w-4 h-4 text-primary-blue mt-0.5 shrink-0" />
                        <span className="line-clamp-1">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 sm:pt-3 sm:border-t sm:border-brand-border/60 space-y-1.5 sm:space-y-2.5 mt-1 sm:mt-0">
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2.5">
                    <Link
                      href={`/packages/${pkg.slug}`}
                      className="w-full text-center bg-white border border-slate-200 hover:border-primary-blue text-navy hover:text-primary-blue text-[10px] sm:text-xs font-semibold py-1.5 sm:h-[38px] rounded-lg flex items-center justify-center transition-colors"
                    >
                      View Details
                    </Link>

                    <Link
                      href={`/customize?package=${encodeURIComponent(pkg.name)}`}
                      className="w-full text-center bg-primary-blue hover:bg-primary-hover text-white text-[10px] sm:text-xs font-bold py-1.5 sm:h-[38px] rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1 active:scale-[0.98]"
                    >
                      <span>Get Quote</span>
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </Link>
                  </div>

                  <WhatsAppButton
                    variant="compact"
                    text="Inquire on WhatsApp"
                    message={`Hi My Krishna Travels, I am interested in ${pkg.name}. Please share itinerary and quote.`}
                    className="w-full justify-center text-[11px] sm:text-xs py-1.5 sm:py-2"
                  />
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

