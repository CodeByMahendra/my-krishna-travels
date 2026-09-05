import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ShieldCheck, Clock, Heart, Compass } from "lucide-react";
import QuickLeadForm from "./QuickLeadForm";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { siteConfig } from "@/lib/config";

export default function HeroSection() {
  return (
    <section className="relative bg-slate-900 min-h-[80vh] lg:min-h-[88vh] flex items-center pt-3 pb-8 lg:py-16 overflow-hidden">
      {/* Background Image - Clear Bright Mountain Lake */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/home.png"
          alt="Scenic Alpine Mountain Lake & Travel Destination"
          fill
          priority
          className="object-cover object-center scale-105"
        />
        {/* Soft, readable gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/25" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1250px] mx-auto px-3.5 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 lg:gap-10 items-center">
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-6 text-white text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-black/40 backdrop-blur-md px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-white/20 text-white text-[11px] sm:text-sm font-semibold shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{siteConfig.name} • Tours & Travel Specialist</span>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-[58px] font-black tracking-tight leading-tight sm:leading-[1.1] text-white drop-shadow-md">
                Your Journey, <br />
                <span className="text-amber-400">
                  Our Responsibility.
                </span>
              </h1>
              <p className="text-sm sm:text-lg lg:text-xl font-semibold text-slate-100 leading-snug drop-shadow-sm">
                Discover unforgettable journeys, thoughtfully planned just for you.
              </p>
            </div>

            <p className="text-xs sm:text-base text-slate-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal drop-shadow-xs">
              From weekend getaways to complete family holidays, we create customized travel experiences designed around your destination and preferences.
            </p>

            {/* Quick Trending Pills on Mobile & Desktop */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2 pt-1">
              <Link
                href="/packages?theme=pilgrimage"
                className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-white/15 hover:bg-white/25 backdrop-blur-md text-amber-300 border border-white/20 transition-all hover:scale-105 active:scale-95"
              >
                🛕 Mathura-Vrindavan
              </Link>
              <Link
                href="/packages?theme=pilgrimage"
                className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-white/15 hover:bg-white/25 backdrop-blur-md text-amber-300 border border-white/20 transition-all hover:scale-105 active:scale-95"
              >
                🚩 Kashi-Ayodhya
              </Link>
              <Link
                href="/packages/kashmir-escape"
                className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-white/15 hover:bg-white/25 backdrop-blur-md text-slate-100 border border-white/20 transition-all hover:scale-105 active:scale-95"
              >
                🏔️ Kashmir
              </Link>
              <Link
                href="/packages/goa-beach-delight"
                className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-white/15 hover:bg-white/25 backdrop-blur-md text-slate-100 border border-white/20 transition-all hover:scale-105 active:scale-95"
              >
                🏖️ Goa
              </Link>
            </div>

            {/* CTAs - Side-by-side on mobile, horizontal row on desktop */}
            <div className="pt-1 grid grid-cols-2 gap-2.5 sm:flex sm:flex-row items-center justify-center lg:justify-start">
              <Link
                href="/customize"
                className="group relative overflow-hidden bg-gradient-to-r from-brand-red to-red-600 hover:from-brand-red-dark hover:to-brand-red text-white text-xs sm:text-base font-extrabold h-[44px] sm:h-[50px] px-3 sm:px-8 rounded-xl sm:rounded-2xl transition-all flex items-center justify-center gap-1.5 sm:gap-2.5 shadow-[0_4px_16px_rgba(227,38,46,0.38)] active:scale-[0.98]"
              >
                <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 group-hover:rotate-45 transition-transform duration-300 shrink-0" />
                <span className="whitespace-nowrap">Plan Trip</span>
              </Link>

              <WhatsAppButton
                variant="accent"
                text="WhatsApp"
                source="HeroSection"
                className="h-[44px] sm:h-[50px] px-3 sm:px-7 text-xs sm:text-base rounded-xl sm:rounded-2xl font-bold shadow-[0_4px_16px_rgba(37,211,102,0.38)] whitespace-nowrap"
              />
            </div>

            {/* Trust Badges Bar at Bottom */}
            <div className="pt-4 border-t border-white/15 flex flex-wrap items-center justify-center lg:justify-start gap-y-1.5 gap-x-4 sm:gap-x-6 text-[11px] sm:text-sm text-slate-200 font-semibold drop-shadow-xs">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                Customized Tours
              </span>
              <span className="hidden sm:inline text-white/40">•</span>
              <span className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-red fill-brand-red stroke-none shrink-0" />
                Best Assistance
              </span>
              <span className="hidden sm:inline text-white/40">•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
                24x7 Support
              </span>
            </div>
          </div>

          {/* Right Column: Hero Floating Lead Enquiry Card */}
          <div className="lg:col-span-5 w-full">
            <QuickLeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}

