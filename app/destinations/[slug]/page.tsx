import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import { destinationsData } from "@/data/destinations";
import { tourPackagesData } from "@/data/packages";
import QuickLeadForm from "@/components/home/QuickLeadForm";
import FinalCTA from "@/components/home/FinalCTA";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const dest = destinationsData.find((d) => d.slug === slug);
  if (!dest) return { title: "Destination Not Found" };

  return {
    title: `${dest.name} Tour Packages & Customized Itineraries`,
    description: dest.shortDescription,
  };
}

export default async function DestinationDetailPage({ params }: Props) {
  const { slug } = await params;
  const dest = destinationsData.find((d) => d.slug === slug);

  if (!dest) {
    notFound();
  }

  const relatedPackages = tourPackagesData.filter(
    (p) => p.destinationSlug === slug || p.destination.toLowerCase().includes(slug.toLowerCase())
  );

  return (
    <div className="bg-light-bg min-h-screen py-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header Banner */}
        <div className="relative rounded-[14px] overflow-hidden shadow-card mb-12 bg-navy text-white min-h-[360px] flex items-end p-6 sm:p-12">
          <Image
            src={dest.image}
            alt={dest.name}
            fill
            priority
            className="object-cover opacity-50 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/40 to-transparent" />

          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-primary-blue text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                {dest.category}
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full border border-white/20">
                {dest.idealDuration}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight">
              {dest.name} Tour Packages
            </h1>
            <p className="text-base sm:text-lg text-slate-200 font-normal">{dest.subtitle}</p>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mb-16">
          {/* Left Column: Details & Packages */}
          <div className="lg:col-span-7 space-y-8 sm:space-y-10">
            {/* Overview */}
            <div className="bg-white p-6 sm:p-8 rounded-[14px] border border-brand-border shadow-card space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-navy border-l-4 border-primary-blue pl-3">
                About {dest.name}
              </h2>
              <p className="text-brand-muted leading-relaxed text-xs sm:text-base font-normal">
                {dest.fullDescription}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-brand-border/60">
                <div className="bg-light-bg p-4 rounded-[8px] border border-brand-border">
                  <span className="text-[11px] font-bold text-brand-muted uppercase tracking-wider block mb-1">
                    Best Time to Visit
                  </span>
                  <p className="text-xs sm:text-sm font-extrabold text-navy">{dest.bestTimeToVisit}</p>
                </div>
                <div className="bg-light-bg p-4 rounded-[8px] border border-brand-border">
                  <span className="text-[11px] font-bold text-brand-muted uppercase tracking-wider block mb-1">
                    Ideal Trip Duration
                  </span>
                  <p className="text-xs sm:text-sm font-extrabold text-navy">{dest.idealDuration}</p>
                </div>
              </div>
            </div>

            {/* Key Attractions */}
            <div className="bg-white p-6 sm:p-8 rounded-[14px] border border-brand-border shadow-card space-y-4">
              <h2 className="text-xl font-bold text-navy border-l-4 border-primary-blue pl-3">
                Top Attractions in {dest.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {dest.keyAttractions.map((att, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-light-bg rounded-[8px] border border-brand-border flex items-center gap-3 text-xs sm:text-sm font-bold text-navy"
                  >
                    <Check className="w-4 h-4 text-primary-blue shrink-0" />
                    <span>{att}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Packages for this Destination */}
            {relatedPackages.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-xl sm:text-2xl font-bold text-navy">
                  Recommended {dest.name} Packages
                </h2>
                <div className="space-y-6">
                  {relatedPackages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="bg-white rounded-[14px] overflow-hidden border border-brand-border shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-center group"
                    >
                      <div className="relative w-full sm:w-48 aspect-[4/3] rounded-[8px] overflow-hidden shrink-0 bg-slate-100">
                        <Image
                          src={pkg.image}
                          alt={pkg.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="space-y-2 flex-1 w-full">
                        <span className="text-xs font-semibold bg-light-blue text-primary-blue px-3 py-1 rounded-full border border-primary-blue/15">
                          {pkg.duration}
                        </span>
                        <h3 className="text-lg font-bold text-navy group-hover:text-primary-blue transition-colors">{pkg.name}</h3>
                        <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed font-normal">{pkg.description}</p>
                        <div className="pt-2 flex items-center justify-between">
                          <span className="text-xs font-semibold text-brand-muted">
                            100% Customized Itinerary
                          </span>
                          <Link
                            href={`/packages/${pkg.slug}`}
                            className="bg-primary-blue hover:bg-primary-hover text-white text-xs font-semibold h-[38px] px-4 rounded-[8px] shadow-xs transition-colors flex items-center justify-center active:scale-[0.98]"
                          >
                            View Details & Itinerary
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Quick Lead Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="sticky top-28">
              <QuickLeadForm />
            </div>
          </div>
        </div>
      </div>

      <FinalCTA />
    </div>
  );
}

