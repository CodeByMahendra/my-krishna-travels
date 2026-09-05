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
    <section className="py-16 md:py-20 lg:py-24 bg-white border-b border-brand-border">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-light-blue text-primary-blue px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-primary-blue/10">
            <Sparkles className="w-3.5 h-3.5 text-bright-blue" />
            <span>Handcrafted Itineraries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-navy tracking-tight">
            Popular Tour Packages
          </h2>
          <p className="text-sm sm:text-base text-brand-muted font-normal">
            Thoughtfully planned travel packages tailored to your budget and preferences.
          </p>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {tourPackagesData.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-[14px] overflow-hidden border border-brand-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Image Header */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-primary-blue text-white text-xs font-semibold px-3 py-1 rounded-full shadow-xs">
                      {pkg.duration}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 bg-white/95 text-navy text-xs font-semibold px-3 py-1 rounded-full shadow-xs">
                    {pkg.category}
                  </div>

                  {/* Destination Tag on bottom image */}
                  <div className="absolute bottom-3 left-4 text-white flex items-center gap-1.5 text-xs font-medium bg-navy/60 backdrop-blur-md px-2.5 py-1 rounded-md">
                    <MapPin className="w-3.5 h-3.5 text-bright-blue" />
                    <span>{pkg.destination}</span>
                  </div>
                </div>

                {/* Package Content */}
                <div className="p-5 space-y-3.5">
                  <h3 className="text-lg font-bold text-navy group-hover:text-primary-blue transition-colors line-clamp-1">
                    {pkg.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-muted line-clamp-2 leading-relaxed font-normal">
                    {pkg.description}
                  </p>

                  {/* Highlights Checklist */}
                  <div className="space-y-1.5 pt-3 border-t border-brand-border">
                    <span className="text-[11px] font-bold text-brand-muted uppercase tracking-wider block">
                      Package Highlights:
                    </span>
                    {pkg.highlights.slice(0, 3).map((hl, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-brand-dark font-medium">
                        <Check className="w-3.5 h-3.5 text-primary-blue mt-0.5 shrink-0" />
                        <span className="line-clamp-1">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Package Footer / Pricing & Actions */}
              <div className="p-5 pt-0 space-y-3.5">
                <div className="bg-light-bg p-3 rounded-lg border border-brand-border flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-brand-muted font-medium block">Starting from</span>
                    <span className="text-lg font-extrabold text-navy">{pkg.startingPrice}</span>
                    <span className="text-[10px] text-brand-muted font-normal"> / person</span>
                  </div>
                  <a
                    href={getPackageWhatsAppLink(pkg.name, pkg.destination)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick(`PackageCard-${pkg.slug}`)}
                    className="bg-brand-whatsapp hover:bg-brand-whatsappHover text-white px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <Link
                    href={`/packages/${pkg.slug}`}
                    className="w-full text-center bg-white border border-primary-blue text-navy hover:bg-light-blue text-xs font-semibold py-2.5 rounded-[8px] transition-colors"
                  >
                    View Details
                  </Link>

                  <Link
                    href={`/customize?package=${encodeURIComponent(pkg.name)}`}
                    onClick={() => trackQuoteRequest(pkg.name, pkg.destination)}
                    className="w-full text-center bg-primary-blue hover:bg-primary-hover text-white text-xs font-semibold py-2.5 rounded-[8px] shadow-xs transition-colors flex items-center justify-center gap-1 active:scale-[0.98]"
                  >
                    <span>Get Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
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

