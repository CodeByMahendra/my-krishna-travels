import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Check, X, Hotel, Car, Sparkles } from "lucide-react";
import { tourPackagesData } from "@/data/packages";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import QuickLeadForm from "@/components/home/QuickLeadForm";
import FinalCTA from "@/components/home/FinalCTA";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const pkg = tourPackagesData.find((p) => p.slug === slug);
  if (!pkg) return { title: "Package Not Found" };

  return {
    title: `${pkg.name} | ${pkg.duration} Detailed Itinerary`,
    description: pkg.description,
  };
}

export default async function PackageDetailPage({ params }: Props) {
  const { slug } = await params;
  const pkg = tourPackagesData.find((p) => p.slug === slug);

  if (!pkg) {
    notFound();
  }

  return (
    <div className="bg-light-bg min-h-screen py-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Tour Packages", href: "/packages" },
            { label: pkg.name },
          ]}
        />

        {/* Hero Section of Package Detail */}
        <div className="bg-white rounded-[14px] overflow-hidden shadow-card border border-brand-border p-6 sm:p-10 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-primary-blue text-white text-xs font-semibold px-3 py-1 rounded-full shadow-xs">
                  {pkg.duration}
                </span>
                <span className="bg-light-blue text-primary-blue text-xs font-bold px-3 py-1 rounded-full border border-primary-blue/15">
                  {pkg.destination}
                </span>
                <span className="bg-slate-100 text-brand-dark text-xs font-medium px-3 py-1 rounded-full border border-brand-border">
                  {pkg.category}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy tracking-tight">
                {pkg.name}
              </h1>

              <p className="text-xs sm:text-base text-brand-muted leading-relaxed font-normal">
                {pkg.description}
              </p>

              <div className="pt-2 flex items-baseline gap-3">
                <span className="text-xs text-brand-muted font-medium">Starting Price:</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-navy">{pkg.startingPrice}</span>
                <span className="text-xs text-brand-muted font-normal">/ person (100% Customizable)</span>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/customize?package=${encodeURIComponent(pkg.name)}`}
                  className="bg-primary-blue hover:bg-primary-hover text-white font-semibold h-[48px] px-7 rounded-[8px] shadow-xs flex items-center justify-center gap-2 text-sm sm:text-base transition-colors active:scale-[0.98]"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Get Free Quote</span>
                </Link>

                <WhatsAppButton
                  variant="accent"
                  text="WhatsApp Us"
                  message={`Hi My Krishna Travels, I am interested in the "${pkg.name}" package. Please share itinerary & price.`}
                  source={`PackageDetail-${pkg.slug}`}
                  className="h-[48px] px-6 rounded-[8px] text-xs sm:text-sm active:scale-[0.98]"
                />
              </div>
            </div>

            <div className="lg:col-span-5 relative aspect-[4/3] rounded-[14px] overflow-hidden shadow-card bg-slate-100">
              <Image
                src={pkg.image}
                alt={pkg.name}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Detailed Tabs & Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mb-16">
          {/* Main Content (Itinerary, Inclusions, Hotels) */}
          <div className="lg:col-span-8 space-y-8 sm:space-y-10">
            {/* Package Highlights */}
            <div className="bg-white p-6 sm:p-8 rounded-[14px] border border-brand-border shadow-card space-y-4">
              <h2 className="text-xl font-bold text-navy border-l-4 border-primary-blue pl-3">
                Trip Highlights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pkg.highlights.map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-brand-dark font-medium">
                    <Check className="w-4 h-4 text-primary-blue mt-1 shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Day-Wise Detailed Itinerary */}
            <div className="bg-white p-6 sm:p-8 rounded-[14px] border border-brand-border shadow-card space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-navy border-l-4 border-primary-blue pl-3">
                Day-by-Day Itinerary
              </h2>

              <div className="space-y-5">
                {pkg.itinerary.map((day) => (
                  <div
                    key={day.day}
                    className="p-5 sm:p-6 rounded-[14px] bg-light-bg border border-brand-border space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-[8px] bg-primary-blue text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                        {day.day}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-navy">
                        Day {day.day}: {day.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-brand-muted leading-relaxed pl-11 font-normal">
                      {day.description}
                    </p>

                    {day.activities.length > 0 && (
                      <div className="pl-11 flex flex-wrap gap-2 pt-1">
                        {day.activities.map((act, i) => (
                          <span
                            key={i}
                            className="bg-white text-navy text-[11px] font-semibold px-2.5 py-1 rounded-md border border-brand-border"
                          >
                            ✓ {act}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Inclusions */}
              <div className="bg-white p-6 rounded-[14px] border border-brand-border shadow-card space-y-4">
                <h3 className="text-lg font-bold text-navy flex items-center gap-2 border-b border-brand-border/60 pb-3">
                  <Check className="w-5 h-5 text-emerald-600" />
                  What&apos;s Included
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-brand-dark font-medium">
                  {pkg.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div className="bg-white p-6 rounded-[14px] border border-brand-border shadow-card space-y-4">
                <h3 className="text-lg font-bold text-navy flex items-center gap-2 border-b border-brand-border/60 pb-3">
                  <X className="w-5 h-5 text-brand-red" />
                  What&apos;s Excluded
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-brand-dark font-medium">
                  {pkg.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <X className="w-4 h-4 text-brand-red mt-0.5 shrink-0" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Hotels & Transport */}
            <div className="bg-white p-6 sm:p-8 rounded-[14px] border border-brand-border shadow-card space-y-6">
              <h2 className="text-xl font-bold text-navy">Hotel & Transportation Details</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-5 bg-light-bg rounded-[8px] border border-brand-border">
                  <div className="p-2.5 rounded-[8px] bg-light-blue text-primary-blue shrink-0">
                    <Hotel className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-xs sm:text-sm text-navy">Hotel Accommodation</h4>
                    <p className="text-xs text-brand-muted leading-relaxed font-normal">{pkg.hotelInfo}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-light-bg rounded-[8px] border border-brand-border">
                  <div className="p-2.5 rounded-[8px] bg-light-blue text-primary-blue shrink-0">
                    <Car className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-xs sm:text-sm text-navy">Private Vehicle Transfer</h4>
                    <p className="text-xs text-brand-muted leading-relaxed font-normal">{pkg.transportInfo}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Quick Lead Form */}
          <div className="lg:col-span-4 space-y-6">
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

