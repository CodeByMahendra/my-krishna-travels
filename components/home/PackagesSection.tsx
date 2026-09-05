"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Check, ArrowRight, Sparkles } from "lucide-react";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import { tourPackagesData } from "@/data/packages";
import { getPackageWhatsAppLink } from "@/lib/whatsapp";
import { trackWhatsAppClick, trackQuoteRequest } from "@/lib/tracking";

export default function PackagesSection() {
  return (
    <section className="py-10 sm:py-16 md:py-20 lg:py-24 bg-white border-b border-brand-border">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-2 bg-light-blue text-primary-blue px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-primary-blue/10">
            <Sparkles className="w-3.5 h-3.5 text-bright-blue" />
            <span>Handcrafted Itineraries</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-[40px] font-extrabold text-navy tracking-tight">
            Popular Tour Packages
          </h2>
          <p className="text-xs sm:text-base text-brand-muted font-normal">
            Thoughtfully planned travel packages tailored to your preferences and duration.
          </p>
        </div>

        {/* Packages Cards Grid - Horizontal cards on mobile, 3-col vertical on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {tourPackagesData.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-xl sm:rounded-[14px] overflow-hidden border border-brand-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 flex flex-row sm:flex-col justify-between group"
            >
              {/* Image Header: Left thumbnail on mobile (125px), full width on desktop */}
              <div className="relative w-[125px] min-h-[145px] sm:w-full sm:min-h-0 sm:h-56 shrink-0 bg-slate-100 overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  sizes="(max-width: 768px) 130px, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-transparent to-transparent sm:block hidden" />

                {/* Top Badges */}
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex gap-1 sm:gap-2">
                  <span className="bg-primary-blue text-white text-[9px] sm:text-xs font-semibold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-xs">
                    {pkg.duration}
                  </span>
                </div>

                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/95 text-navy text-[9px] sm:text-xs font-semibold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-xs hidden xs:inline-block">
                  {pkg.category}
                </div>

                {/* Destination Tag on bottom image */}
                <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-4 text-white flex items-center gap-1 text-[10px] sm:text-xs font-medium bg-navy/70 backdrop-blur-md px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded sm:rounded-md hidden sm:flex">
                  <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-bright-blue" />
                  <span>{pkg.destination}</span>
                </div>
              </div>

              {/* Package Content & Footer Container */}
              <div className="p-2.5 sm:p-5 flex flex-col justify-between flex-1 min-w-0">
                <div className="space-y-1 sm:space-y-3.5">
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-primary-blue sm:hidden">
                    <MapPin className="w-2.5 h-2.5 shrink-0" />
                    <span className="truncate">{pkg.destination}</span>
                  </div>

                  <h3 className="text-sm sm:text-lg font-bold text-navy group-hover:text-primary-blue transition-colors line-clamp-1">
                    {pkg.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-muted line-clamp-2 leading-relaxed font-normal hidden sm:block">
                    {pkg.description}
                  </p>

                  {/* Highlights Checklist */}
                  <div className="space-y-0.5 sm:space-y-1.5 pt-1 sm:pt-3 sm:border-t sm:border-brand-border">
                    <span className="text-[10px] sm:text-[11px] font-bold text-brand-muted uppercase tracking-wider hidden sm:block">
                      Package Highlights:
                    </span>
                    {pkg.highlights.slice(0, 1).map((hl, idx) => (
                      <div key={idx} className="flex items-start gap-1 text-[10px] sm:hidden text-brand-dark font-medium">
                        <Check className="w-3 h-3 text-primary-blue shrink-0 mt-0.5" />
                        <span className="truncate">{hl}</span>
                      </div>
                    ))}
                    {pkg.highlights.slice(0, 2).map((hl, idx) => (
                      <div key={idx} className="items-start gap-1.5 text-xs text-brand-dark font-medium hidden sm:flex">
                        <Check className="w-3.5 h-3.5 text-primary-blue mt-0.5 shrink-0" />
                        <span className="line-clamp-1">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Package Footer / Actions - Clean without Price on Request */}
                <div className="pt-2 sm:pt-3 sm:border-t sm:border-brand-border/60 space-y-1.5 sm:space-y-2 mt-1 sm:mt-0">
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                    <Link
                      href={`/packages/${pkg.slug}`}
                      className="w-full text-center bg-white border border-slate-200 hover:border-primary-blue text-navy hover:text-primary-blue text-[10px] sm:text-xs font-semibold py-1.5 sm:py-2 rounded-lg transition-colors"
                    >
                      View Details
                    </Link>

                    <Link
                      href={`/customize?package=${encodeURIComponent(pkg.name)}`}
                      onClick={() => trackQuoteRequest(pkg.name, pkg.destination)}
                      className="w-full text-center bg-primary-blue hover:bg-primary-hover text-white text-[10px] sm:text-xs font-bold py-1.5 sm:py-2 rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1 active:scale-[0.98]"
                    >
                      <span>Get Quote</span>
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </Link>
                  </div>

                  <a
                    href={getPackageWhatsAppLink(pkg.name, pkg.destination)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick(`PackageCard-${pkg.slug}`)}
                    className="w-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Inquire on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Packages */}
        <div className="mt-12 text-center">
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 border border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white font-semibold h-[48px] px-7 rounded-[8px] transition-colors text-sm sm:text-base"
          >
            <span>Explore All Tour Packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

