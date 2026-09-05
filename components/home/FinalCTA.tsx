import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Compass } from "lucide-react";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { siteConfig } from "@/lib/config";

export default function FinalCTA() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-navy text-white relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1 rounded-full border border-white/15 text-xs sm:text-sm font-semibold tracking-wide">
          <Sparkles className="w-4 h-4 text-bright-blue" />
          <span>{siteConfig.name} • Customized Tour Experts</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold tracking-tight leading-tight max-w-3xl mx-auto">
          Ready to Start Your Journey?
        </h2>

        <p className="text-sm sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed font-normal">
          Tell us where you want to go. We&apos;ll help you plan the rest with personalized itineraries, transparent pricing, and 24/7 dedicated travel support.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <Link
            href="/customize"
            className="group relative overflow-hidden w-full sm:w-auto bg-gradient-to-r from-primary-blue via-[#1070e3] to-indigo-600 hover:from-primary-hover hover:to-indigo-700 text-white font-bold text-base h-[50px] px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-2.5 shadow-[0_4px_16px_rgba(11,99,206,0.35)] active:scale-[0.98]"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />
            <Compass className="w-5 h-5 text-amber-300 group-hover:rotate-45 transition-transform duration-300" />
            <span>Plan My Trip</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <WhatsAppButton
            variant="accent"
            text="WhatsApp Us"
            source="FinalCTA"
            className="w-full sm:w-auto text-base h-[50px] px-8 rounded-xl font-bold shadow-[0_4px_16px_rgba(37,211,102,0.35)] active:scale-[0.98]"
          />
        </div>

        <div className="pt-8 border-t border-white/10 text-xs sm:text-sm text-slate-300 flex flex-wrap items-center justify-center gap-4 sm:gap-8 font-medium">
          <span>✓ Instant Quotation Support</span>
          <span>✓ 100% Tailored Itineraries</span>
          <span>✓ Direct WhatsApp & Call Assistance</span>
        </div>
      </div>
    </section>
  );
}

