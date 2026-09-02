import React from "react";
import Link from "next/link";
import { Sparkles, Compass } from "lucide-react";
import WhatsAppButton from "@/components/common/WhatsAppButton";

export default function CustomizedTravelCTA() {
  return (
    <section className="py-16 md:py-20 bg-navy text-white relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3.5 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 bg-white/10 text-bright-blue border border-white/15 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Tailored Travel Planning
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug">
              Looking for a Specific Destination or Customized Itinerary?
            </h2>
            <p className="text-sm sm:text-base text-slate-200 max-w-2xl font-normal leading-relaxed">
              Whether it&apos;s a romantic honeymoon, a family holiday, or a friends group trip, we build custom tour packages to fit your exact budget and style.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <Link
              href="/customize"
              className="w-full bg-primary-blue hover:bg-primary-hover text-white font-semibold h-[48px] px-6 rounded-[8px] transition-colors text-center flex items-center justify-center gap-2 text-sm sm:text-base shadow-xs active:scale-[0.98]"
            >
              <Compass className="w-5 h-5" />
              <span>Create Custom Trip</span>
            </Link>
            <WhatsAppButton
              variant="accent"
              text="WhatsApp Travel Expert"
              source="CustomizedCTA"
              className="w-full h-[48px] rounded-[8px] text-sm sm:text-base active:scale-[0.98]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

