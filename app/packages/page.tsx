import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Check, ArrowRight } from "lucide-react";
import { tourPackagesData } from "@/data/packages";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata = {
  title: "Tour Packages & Customized Holiday Trips",
  description: "Explore customized domestic and international tour packages for Kashmir, Manali, Goa, Kerala, Dubai, Bali, and Maldives.",
};

export default function PackagesPage() {
  return (
    <div className="bg-light-bg min-h-screen py-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Tour Packages" }]} />

        {/* Header Banner */}
        <div className="bg-navy text-white rounded-[14px] p-8 sm:p-12 mb-12 relative overflow-hidden shadow-card">
          <div className="absolute inset-0 opacity-30">
            <Image
              src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1600&q=80"
              alt="Packages Banner"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="bg-white/15 text-bright-blue text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
              Popular Tour Packages
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight">
              Handcrafted Travel Packages
            </h1>
            <p className="text-sm sm:text-base text-slate-200 font-normal">
              Thoughtfully curated itineraries designed for families, couples, honeymooners, and groups. Every package can be 100% customized.
            </p>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {tourPackagesData.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-[14px] overflow-hidden border border-brand-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />

                  <span className="absolute top-4 left-4 bg-primary-blue text-white text-xs font-semibold px-3 py-1 rounded-full shadow-xs">
                    {pkg.duration}
                  </span>

                  <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-md text-navy text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                    {pkg.category}
                  </span>

                  <div className="absolute bottom-3 left-4 text-white flex items-center gap-1.5 text-xs font-semibold bg-navy/60 backdrop-blur-md px-3 py-1 rounded-md">
                    <MapPin className="w-3.5 h-3.5 text-bright-blue" />
                    <span>{pkg.destination}</span>
                  </div>
                </div>

                <div className="p-5 space-y-3.5">
                  <h3 className="text-lg sm:text-xl font-bold text-navy group-hover:text-primary-blue transition-colors">
                    {pkg.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-muted line-clamp-2 leading-relaxed font-normal">
                    {pkg.description}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-brand-border/60">
                    <span className="text-[11px] font-bold text-brand-muted uppercase tracking-wider block">
                      Highlights:
                    </span>
                    {pkg.highlights.slice(0, 3).map((hl, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-brand-dark font-medium">
                        <Check className="w-4 h-4 text-primary-blue mt-0.5 shrink-0" />
                        <span className="line-clamp-1">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-3.5">
                <div className="bg-light-bg p-3.5 rounded-[8px] border border-brand-border flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-brand-muted font-medium block">Starting Price</span>
                    <span className="text-xl font-extrabold text-navy">{pkg.startingPrice}</span>
                  </div>
                  <WhatsAppButton
                    variant="compact"
                    text="WhatsApp"
                    message={`Hi My Krishna Travels, I am interested in ${pkg.name}. Please share details.`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <Link
                    href={`/packages/${pkg.slug}`}
                    className="w-full text-center bg-white border border-primary-blue text-navy hover:bg-light-blue text-xs font-semibold h-[40px] rounded-[8px] flex items-center justify-center transition-colors"
                  >
                    View Details
                  </Link>

                  <Link
                    href={`/customize?package=${encodeURIComponent(pkg.name)}`}
                    className="w-full text-center bg-primary-blue hover:bg-primary-hover text-white text-xs font-semibold h-[40px] rounded-[8px] shadow-xs transition-colors flex items-center justify-center gap-1 active:scale-[0.98]"
                  >
                    <span>Get Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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

