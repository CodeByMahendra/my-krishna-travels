import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Compass } from "lucide-react";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { siteConfig } from "@/lib/config";

export default function FinalCTA() {
  return (
    <section className="py-10 sm:py-16 md:py-20 lg:py-24 bg-navy text-white relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4 sm:space-y-8">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-1 rounded-full border border-white/15 text-[11px] sm:text-sm font-semibold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-bright-blue" />
          <span>{siteConfig.name} • Customized Tour Experts</span>
        </div>

        <h2 className="text-2xl sm:text-4xl lg:text-[48px] font-extrabold tracking-tight leading-tight max-w-3xl mx-auto">
          Ready to Start Your Journey?
        </h2>

        <p className="text-xs sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed font-normal">
          Tell us where you want to go. We&apos;ll help you plan the rest with personalized itineraries, transparent pricing, and 24/7 dedicated travel support.
        </p>

        <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-row items-center justify-center pt-1 sm:pt-2">
          <Link
            href="/customize"
            className="group relative overflow-hidden w-full sm:w-auto bg-gradient-to-r from-primary-blue via-[#1070e3] to-indigo-600 hover:from-primary-hover hover:to-indigo-700 text-white font-bold text-xs sm:text-base h-[42px] sm:h-[50px] px-3 sm:px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2.5 shadow-[0_4px_16px_rgba(11,99,206,0.35)] active:scale-[0.98]"
          >
            <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 group-hover:rotate-45 transition-transform duration-300 shrink-0" />
            <span className="whitespace-nowrap">Plan Trip</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform shrink-0" />
          </Link>

          <WhatsAppButton
            variant="accent"
            text="WhatsApp"
            source="FinalCTA"
            className="w-full sm:w-auto text-xs sm:text-base h-[42px] sm:h-[50px] px-3 sm:px-8 rounded-xl font-bold shadow-[0_4px_16px_rgba(37,211,102,0.35)] active:scale-[0.98] whitespace-nowrap"
          />
        </div>

        <div className="pt-4 sm:pt-8 border-t border-white/10 text-[11px] sm:text-sm text-slate-300 flex flex-wrap items-center justify-center gap-2.5 sm:gap-8 font-medium">
          <span>✓ Instant Quotation Support</span>
          <span>✓ 100% Tailored Itineraries</span>
          <span>✓ Direct WhatsApp & Call Assistance</span>
        </div>
      </div>
    </section>
  );
}

