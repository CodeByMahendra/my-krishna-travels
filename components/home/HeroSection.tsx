import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ShieldCheck, Clock, Heart, Compass } from "lucide-react";
import QuickLeadForm from "./QuickLeadForm";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { siteConfig } from "@/lib/config";

export default function HeroSection() {
  return (
    <section className="relative bg-slate-900 min-h-[85vh] lg:min-h-[88vh] flex items-center pt-6 pb-14 lg:py-16 overflow-hidden">
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

      <div className="relative z-10 max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-white text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-white text-xs sm:text-sm font-semibold shadow-md">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{siteConfig.name} • Tours & Travel Specialist</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-[30px] sm:text-[48px] lg:text-[60px] font-black tracking-tight leading-[1.15] sm:leading-[1.1] text-white drop-shadow-md">
                Your Journey, <br />
                <span className="text-amber-400">
                  Our Responsibility.
                </span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl font-semibold text-slate-100 leading-snug drop-shadow-sm">
                Discover unforgettable journeys, thoughtfully planned just for you.
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal drop-shadow-xs">
              From weekend getaways to complete family holidays, we create customized travel experiences designed around your destination, budget and preferences.
            </p>

            {/* CTAs matching screenshot */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <Link
                href="/customize"
                className="w-full sm:w-auto bg-brand-red hover:bg-brand-red-dark text-white text-base font-extrabold h-[50px] px-8 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]"
              >
                <Compass className="w-5 h-5" />
                <span>Plan My Trip</span>
              </Link>

              <WhatsAppButton
                variant="accent"
                text="WhatsApp Us"
                source="HeroSection"
                className="w-full sm:w-auto h-[50px] px-7 text-base rounded-2xl font-bold shadow-lg"
              />
            </div>

            {/* Trust Badges Bar at Bottom */}
            <div className="pt-6 border-t border-white/20 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-200 font-semibold drop-shadow-xs">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Customized Tours
              </span>
              <span className="hidden sm:inline text-white/40">•</span>
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-brand-red fill-brand-red stroke-none" />
                Best Travel Assistance
              </span>
              <span className="hidden sm:inline text-white/40">•</span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                Personal Support 24x7
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

